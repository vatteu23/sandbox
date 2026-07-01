import PQueue from "p-queue";
import robotsParser from "robots-parser";
import type { CrawlEdge, CrawlNode } from "./types";
import { EMPTY_PAGE_LINKS } from "./types";
import { parseHtmlPage } from "./parsePage";
import { discoverSitemapUrls } from "./sitemap";
import {
  getCategoryForUrl,
  getPathDepth,
  getPageKey,
  isSameOrigin,
  normalizeUrl,
  shouldSkipUrl,
} from "./urlUtils";

const USER_AGENT = "SiteAtlas/1.0 (+https://udayvatti.com/tools)";

export interface CrawlOptions {
  startUrl: string;
  maxPages?: number;
  concurrency?: number;
  onEvent: (event: string, data: unknown) => void;
}

export async function runSiteCrawl(options: CrawlOptions): Promise<{
  nodes: CrawlNode[];
  edges: CrawlEdge[];
}> {
  const { startUrl, maxPages = 250, concurrency = 6, onEvent } = options;

  const origin = new URL(startUrl);
  const normalizedStart = normalizeUrl(startUrl, startUrl);
  if (!normalizedStart) {
    throw new Error("Invalid start URL");
  }

  const queue = new PQueue({ concurrency });
  const nodes: CrawlNode[] = [];
  const edges: CrawlEdge[] = [];
  const pathNodes = new Set<string>();
  const scheduled = new Set<string>();
  const fetched = new Set<string>();

  let robots: ReturnType<typeof robotsParser> | null = null;
  let robotsTxt: string | undefined;

  try {
    const robotsUrl = new URL("/robots.txt", origin).toString();
    const robotsRes = await fetch(robotsUrl, { headers: { "User-Agent": USER_AGENT } });
    if (robotsRes.ok) {
      robotsTxt = await robotsRes.text();
      robots = robotsParser(robotsUrl, robotsTxt);
    }
  } catch {
    // robots.txt is optional
  }

  onEvent("start", { message: `Starting crawl of ${normalizedStart}` });

  const ensurePathNodesAndEdges = (url: string) => {
    try {
      const urlObj = new URL(url);
      const segments = urlObj.pathname.split("/").filter(Boolean);
      let currentPath = urlObj.origin;

      if (!pathNodes.has(currentPath)) {
        pathNodes.add(currentPath);
        const rootNode: CrawlNode = {
          id: currentPath,
          url: currentPath,
          title: urlObj.hostname,
          depth: 0,
          category: getCategoryForUrl(currentPath),
          wordCount: 0,
          headings: { h1: 0, h2: 0, h3: 0 },
          metadata: {},
          accessibility: { missingAltText: 0, ariaLabels: 0 },
          links: structuredClone(EMPTY_PAGE_LINKS),
        };
        nodes.push(rootNode);
        onEvent("node", rootNode);
      }

      for (let i = 0; i < segments.length; i++) {
        const parentPath = currentPath;
        currentPath = `${parentPath}/${segments[i]}`;

        if (!pathNodes.has(currentPath)) {
          pathNodes.add(currentPath);
          const newNode: CrawlNode = {
            id: currentPath,
            url: currentPath,
            title: currentPath,
            depth: i + 1,
            category: getCategoryForUrl(currentPath),
            wordCount: 0,
            headings: { h1: 0, h2: 0, h3: 0 },
            metadata: {},
            accessibility: { missingAltText: 0, ariaLabels: 0 },
            links: structuredClone(EMPTY_PAGE_LINKS),
          };
          nodes.push(newNode);
          onEvent("node", newNode);
        }

        const edgeId = `${parentPath}->${currentPath}`;
        if (!edges.some((e) => e.id === edgeId)) {
          edges.push({ id: edgeId, source: parentPath, target: currentPath });
          onEvent("edge", { id: edgeId, source: parentPath, target: currentPath });
        }
      }
    } catch (err) {
      console.error("Path parsing error", err);
    }
  };

  const isAllowed = (url: string) => !robots || robots.isAllowed(url, USER_AGENT);

  const schedule = (url: string, source: "seed" | "sitemap" | "link" = "link") => {
    const normalized = normalizeUrl(url, normalizedStart);
    if (!normalized) return;
    if (!isSameOrigin(normalized, origin)) return;
    if (shouldSkipUrl(normalized)) return;
    if (!isAllowed(normalized)) return;
    if (scheduled.has(normalized) || fetched.has(normalized)) return;
    if (scheduled.size >= maxPages) return;

    scheduled.add(normalized);
    ensurePathNodesAndEdges(normalized);

    queue.add(async () => {
      fetched.add(normalized);

      const controller = new AbortController();
      const fetchTimeout = setTimeout(() => controller.abort(), 10_000);

      try {
        onEvent("status", {
          message: `Fetching ${normalized}`,
          source,
          fetched: fetched.size,
          scheduled: scheduled.size,
        });

        const response = await fetch(normalized, {
          headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(fetchTimeout);

        const finalUrl = normalizeUrl(response.url, normalizedStart) || normalized;
        const statusCode = response.status;
        const redirectTo = finalUrl !== normalized ? finalUrl : undefined;
        const contentType = response.headers.get("content-type") || "";
        const existingNode = nodes.find((n) => n.id === getPageKey(normalized));

        // Skip non-HTML responses
        if (!contentType.includes("text/html")) {
          if (existingNode) {
            existingNode.statusCode = statusCode;
            existingNode.redirectTo = redirectTo;
            onEvent("node_update", existingNode);
          }
          return;
        }

        if (!response.ok) {
          if (existingNode) {
            existingNode.title = `${statusCode} — ${existingNode.title}`;
            existingNode.statusCode = statusCode;
            onEvent("node_update", existingNode);
          }
          return;
        }

        // Body size cap: skip pages > 5MB
        const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
        if (contentLength > 5_000_000) {
          if (existingNode) {
            existingNode.statusCode = statusCode;
            onEvent("node_update", existingNode);
          }
          return;
        }

        const html = await response.text();
        // Secondary size check on actual body
        if (html.length > 5_000_000) return;

        const parsed = parseHtmlPage(html, finalUrl, origin.origin);

        if (existingNode) {
          existingNode.title = parsed.title;
          existingNode.wordCount = parsed.wordCount;
          existingNode.headings = parsed.headings;
          existingNode.metadata = {
            description: parsed.description,
            canonical: parsed.canonical,
            ogImage: parsed.ogImage,
          };
          existingNode.accessibility = parsed.accessibility;
          existingNode.links = parsed.links;
          existingNode.statusCode = statusCode;
          existingNode.redirectTo = redirectTo;
          existingNode.depth = getPathDepth(normalized);
          existingNode.category = getCategoryForUrl(normalized);
          onEvent("node_update", existingNode);
        }

        for (const href of parsed.linkHrefs) {
          schedule(href, "link");
        }
      } catch (err) {
        clearTimeout(fetchTimeout);
        console.error(`Failed to crawl ${normalized}:`, err);
        const existingNode = nodes.find((n) => n.id === getPageKey(normalized));
        if (existingNode) {
          existingNode.statusCode = 0;
          onEvent("node_update", existingNode);
        }
      }
    });
  };

  // Seed: homepage first, then sitemap URLs
  schedule(normalizedStart, "seed");

  onEvent("status", { message: "Discovering sitemap URLs…" });
  const sitemapUrls = await discoverSitemapUrls(origin, robotsTxt);
  onEvent("status", {
    message: `Found ${sitemapUrls.length} URLs in sitemap`,
    sitemapCount: sitemapUrls.length,
  });

  for (const url of sitemapUrls) {
    schedule(url, "sitemap");
  }

  await queue.onIdle();

  onEvent("complete", {
    message: "Crawl completed",
    totalNodes: nodes.length,
    totalEdges: edges.length,
    pagesFetched: fetched.size,
    sitemapUrls: sitemapUrls.length,
  });

  return { nodes, edges };
}
