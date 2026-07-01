// --- SSRF Protection ---

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^169\.254\./,
  /^0\.0\.0\.0/,
  /^::1$/,
  /^fc[0-9a-f]{2}:/i,
  /^fd[0-9a-f]{2}:/i,
  /^fe80:/i,
];

export function isPrivateHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return true;
  return PRIVATE_IP_PATTERNS.some((p) => p.test(h));
}

export function isValidCrawlUrl(urlString: string): { valid: boolean; reason?: string } {
  try {
    const url = new URL(urlString);
    if (url.protocol !== "https:") {
      return { valid: false, reason: "Only HTTPS URLs are supported." };
    }
    if (isPrivateHostname(url.hostname)) {
      return { valid: false, reason: "Private, local, or reserved hostnames are not allowed." };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "Invalid URL format." };
  }
}

// --- Tracking params ---

const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "ref",
]);

const SKIP_EXTENSIONS = /\.(pdf|zip|tar|gz|rar|7z|mp3|mp4|webm|avi|mov|wmv|flv|png|jpe?g|gif|svg|webp|ico|css|js|json|xml|woff2?|ttf|eot|csv|xlsx?|docx?|pptx?)($|\?)/i;

export function getCategoryForUrl(urlString: string): string {
  try {
    const path = new URL(urlString).pathname.toLowerCase();

    if (path.match(/^\/(docs|guide|manual|api|reference|help|support|learn|resources\/)/)) return "Documentation";
    if (path.match(/^\/(blog|news|press|features|pricing|customers|case-studies|webinars|marketing|solutions|product)/)) return "Marketing";
    if (path.match(/^\/(legal|terms|privacy|security|dpa|sla|cookies|compliance)/)) return "Legal";
    if (path.match(/^\/(company|about|careers|team|culture|contact|jobs|people)/)) return "Company";
    if (path.match(/^\/(app|dashboard|login|signup|register|auth|account|console)/)) return "Product/App";

    return "Other";
  } catch {
    return "Other";
  }
}

export function normalizeUrl(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    if (!["http:", "https:"].includes(url.protocol)) return null;

    url.hash = "";
    url.hostname = url.hostname.toLowerCase();

    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(key.toLowerCase())) {
        url.searchParams.delete(key);
      }
    }

    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }

    // Homepage: canonicalize to origin so node IDs match crawl updates
    if (url.pathname === "/" || url.pathname === "") {
      return url.origin;
    }

    return url.toString();
  } catch {
    return null;
  }
}

/** Stable node ID for a crawled page (matches path-tree IDs). */
export function getPageKey(url: string): string {
  return normalizeUrl(url, url) || url;
}

export function isSameOrigin(url: string, origin: URL): boolean {
  try {
    const parsed = new URL(url);
    return parsed.origin === origin.origin;
  } catch {
    return false;
  }
}

export function shouldSkipUrl(url: string): boolean {
  try {
    const { pathname, search } = new URL(url);
    return SKIP_EXTENSIONS.test(`${pathname}${search}`);
  } catch {
    return true;
  }
}

export function toPathKey(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname === "" ? "/" : parsed.pathname;
  } catch {
    return url;
  }
}

export function getPathDepth(url: string): number {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments.length;
  } catch {
    return 0;
  }
}
