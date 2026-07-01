import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { LinkGroup, ParsedPage } from "./types";
import { EMPTY_PAGE_LINKS } from "./types";
import { getPageKey, normalizeUrl, shouldSkipUrl } from "./urlUtils";

const IGNORED_HREF_PREFIXES = ["mailto:", "tel:", "javascript:", "data:", "#"];

const NAV_SELECTORS =
  "header, nav, footer, [role='navigation'], [role='banner'], [role='contentinfo']";

function isIgnoredHref(href: string): boolean {
  return IGNORED_HREF_PREFIXES.some((prefix) => href.startsWith(prefix));
}

function collectAnchorHrefs($: CheerioAPI, root: cheerio.Cheerio<Element>): string[] {
  const hrefs: string[] = [];
  root.find("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (href && !isIgnoredHref(href)) hrefs.push(href);
  });
  return hrefs;
}

function getContentRoot($: CheerioAPI): cheerio.Cheerio<Element> {
  const semantic = $("main, article, [role='main']").first();
  if (semantic.length) return semantic;

  const body = $("body").clone();
  body.find(NAV_SELECTORS).remove();
  body.find("script, style, noscript").remove();
  return body;
}

function getNavigationRoot($: CheerioAPI): cheerio.Cheerio<Element> {
  return $(NAV_SELECTORS);
}

function classifyHrefs(
  hrefs: string[],
  baseHref: string,
  origin: string,
  pageKey: string
): LinkGroup {
  const internal = new Set<string>();
  const external = new Set<string>();

  for (const href of hrefs) {
    const resolved = normalizeUrl(href, baseHref);
    if (!resolved || shouldSkipUrl(resolved)) continue;
    if (getPageKey(resolved) === pageKey) continue;

    try {
      const parsed = new URL(resolved);
      if (parsed.origin === origin) {
        internal.add(resolved);
      } else {
        external.add(resolved);
      }
    } catch {
      // ignore invalid URLs
    }
  }

  return {
    internal: [...internal].sort(),
    external: [...external].sort(),
  };
}

function extractNextDataLinks(html: string, baseUrl: string): string[] {
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
  if (!match?.[1]) return [];

  try {
    const data = JSON.parse(match[1]);
    const urls = new Set<string>();

    if (typeof data?.page === "string") {
      urls.add(data.page.startsWith("/") ? data.page : `/${data.page}`);
    }

    const queries = data?.props?.pageProps?.sitemap || data?.props?.pageProps?.pages;
    if (Array.isArray(queries)) {
      for (const item of queries) {
        if (typeof item === "string") urls.add(item.startsWith("/") ? item : `/${item}`);
        if (item?.url) urls.add(String(item.url));
        if (item?.loc) urls.add(String(item.loc));
      }
    }

    if (data?.props?.pageProps?.paths) {
      for (const path of data.props.pageProps.paths) {
        if (typeof path === "string") urls.add(path.startsWith("/") ? path : `/${path}`);
      }
    }

    return [...urls]
      .map((href) => normalizeUrl(href, baseUrl))
      .filter((url): url is string => Boolean(url));
  } catch {
    return [];
  }
}

function collectCrawlHrefs(
  $: CheerioAPI,
  baseHref: string,
  nextDataLinks: string[],
  canonical?: string
): string[] {
  const hrefs = new Set<string>();

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (!href || isIgnoredHref(href)) return;
    const resolved = normalizeUrl(href, baseHref);
    if (resolved && !shouldSkipUrl(resolved)) hrefs.add(resolved);
  });

  for (const link of nextDataLinks) {
    if (!shouldSkipUrl(link)) hrefs.add(link);
  }

  if (canonical) hrefs.add(canonical);

  return [...hrefs];
}

export function parseHtmlPage(html: string, pageUrl: string, origin: string): ParsedPage {
  const $ = cheerio.load(html);
  const baseHref = $("base").attr("href") || pageUrl;
  const pageKey = getPageKey(pageUrl);

  const title = $("title").first().text().trim() || $("h1").first().text().trim() || "Untitled";
  const description = $("meta[name='description']").attr("content")?.trim();
  const canonicalRaw = $("link[rel='canonical']").attr("href")?.trim();
  const ogUrlRaw = $("meta[property='og:url']").attr("content")?.trim();
  const canonical =
    (canonicalRaw ? normalizeUrl(canonicalRaw, baseHref) : null) ||
    (ogUrlRaw ? normalizeUrl(ogUrlRaw, baseHref) : null) ||
    undefined;
  const ogImage = $("meta[property='og:image']").attr("content")?.trim();

  const headings = {
    h1: $("h1").length || $('[role="heading"][aria-level="1"]').length,
    h2: $("h2").length,
    h3: $("h3").length,
  };

  let missingAltText = 0;
  $("img").each((_, img) => {
    const alt = $(img).attr("alt");
    if (alt === undefined || alt === null) missingAltText++;
  });
  const ariaLabels = $("[aria-label]").length;

  $("script, style, noscript").remove();
  const textContent = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = textContent ? textContent.split(" ").filter(Boolean).length : 0;

  const contentHrefs = collectAnchorHrefs($, getContentRoot($));
  const navigationHrefs = collectAnchorHrefs($, getNavigationRoot($));
  const nextDataLinks = extractNextDataLinks(html, baseHref);

  const links = {
    content: classifyHrefs(contentHrefs, baseHref, origin, pageKey),
    navigation: classifyHrefs(navigationHrefs, baseHref, origin, pageKey),
  };

  const linkHrefs = collectCrawlHrefs($, baseHref, nextDataLinks, canonical);

  return {
    title,
    description,
    canonical,
    ogImage,
    wordCount,
    headings,
    accessibility: { missingAltText, ariaLabels },
    links,
    linkHrefs,
  };
}

export { EMPTY_PAGE_LINKS };
