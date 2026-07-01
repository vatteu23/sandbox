import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const FETCH_HEADERS = {
  "User-Agent": "SiteAtlas/1.0 (+https://udayvatti.com/tools)",
  Accept: "application/xml,text/xml,text/plain,*/*",
};

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

async function fetchXml(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { headers: FETCH_HEADERS, redirect: "follow" });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("xml") && !contentType.includes("text/plain")) {
      // Some servers serve sitemaps as application/octet-stream
      const text = await response.text();
      if (!text.includes("<urlset") && !text.includes("<sitemapindex")) return null;
      return text;
    }
    return response.text();
  } catch {
    return null;
  }
}

function extractLocTags(xml: string): string[] {
  const doc = parser.parse(xml);
  const urlset = doc.urlset || doc["sitemap:urlset"];
  const sitemapIndex = doc.sitemapindex || doc["sitemap:sitemapindex"];

  if (urlset) {
    return asArray(urlset.url)
      .map((entry: { loc?: string }) => entry.loc?.trim())
      .filter(Boolean) as string[];
  }

  if (sitemapIndex) {
    return asArray(sitemapIndex.sitemap)
      .map((entry: { loc?: string }) => entry.loc?.trim())
      .filter(Boolean) as string[];
  }

  return [];
}

export async function discoverSitemapUrls(origin: URL, robotsTxt?: string): Promise<string[]> {
  const candidates = new Set<string>([
    new URL("/sitemap.xml", origin).toString(),
    new URL("/sitemap_index.xml", origin).toString(),
    new URL("/sitemap-index.xml", origin).toString(),
  ]);

  if (robotsTxt) {
    for (const line of robotsTxt.split("\n")) {
      const match = line.match(/^\s*sitemap:\s*(.+)\s*$/i);
      if (match?.[1]) {
        candidates.add(match[1].trim());
      }
    }
  }

  const pageUrls = new Set<string>();
  const visitedSitemaps = new Set<string>();
  const queue = [...candidates];

  while (queue.length > 0 && visitedSitemaps.size < 20) {
    const sitemapUrl = queue.shift()!;
    if (visitedSitemaps.has(sitemapUrl)) continue;
    visitedSitemaps.add(sitemapUrl);

    const xml = await fetchXml(sitemapUrl);
    if (!xml) continue;

    const locs = extractLocTags(xml);
    const doc = parser.parse(xml);
    const isIndex = Boolean(doc.sitemapindex || doc["sitemap:sitemapindex"]);

    if (isIndex) {
      for (const loc of locs) {
        if (!visitedSitemaps.has(loc)) queue.push(loc);
      }
    } else {
      for (const loc of locs) {
        pageUrls.add(loc);
      }
    }
  }

  return [...pageUrls];
}
