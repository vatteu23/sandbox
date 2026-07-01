import { NextApiRequest, NextApiResponse } from "next";
import { runSiteCrawl } from "@/tools/site-atlas/lib/crawler/runCrawl";
import { isValidCrawlUrl } from "@/tools/site-atlas/lib/crawler/urlUtils";

export const config = {
  api: { responseLimit: false },
};

// Allow long-running SSE streams (Vercel Pro)
export const maxDuration = 300;

// In-memory rate limiter: 5 crawls per IP per hour
const crawlRequests = new Map<string, number[]>();
const CRAWL_LIMIT = 5;
const CRAWL_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(req: NextApiRequest): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (crawlRequests.get(ip) || []).filter((t) => now - t < CRAWL_WINDOW_MS);
  if (prev.length >= CRAWL_LIMIT) return false;
  prev.push(now);
  crawlRequests.set(ip, prev);
  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please wait before starting another crawl." });
  }

  const startUrl = req.query.url as string;
  if (!startUrl) {
    return res.status(400).end("Missing url parameter");
  }

  const validation = isValidCrawlUrl(startUrl);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.reason });
  }

  const rawMax = parseInt((req.query.maxPages as string) || "100", 10);
  const maxPages = Math.min(Math.max(isNaN(rawMax) ? 100 : rawMax, 1), 500);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");

  const sendEvent = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    if (typeof (res as any).flush === "function") {
      (res as any).flush();
    }
  };

  try {
    await runSiteCrawl({ startUrl, maxPages, onEvent: sendEvent });
  } catch (err) {
    console.error("Crawl failed:", err);
    sendEvent("error", { message: err instanceof Error ? err.message : "Crawl failed" });
  }

  res.end();
}
