import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Rate limiter: 3 analysis calls per IP per 10 minutes
const analyzeRequests = new Map<string, number[]>();
const ANALYZE_LIMIT = 3;
const ANALYZE_WINDOW_MS = 10 * 60 * 1000;

function getClientIp(req: NextApiRequest): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (analyzeRequests.get(ip) || []).filter((t) => now - t < ANALYZE_WINDOW_MS);
  if (prev.length >= ANALYZE_LIMIT) return false;
  prev.push(now);
  analyzeRequests.set(ip, prev);
  return true;
}

interface HubPage {
  url: string;
  title: string;
  inboundCount: number;
}

const verdictItem = {
  type: SchemaType.OBJECT,
  properties: {
    verdict: {
      type: SchemaType.STRING,
      description: "'yes', 'partial', or 'no'",
    },
    detail: {
      type: SchemaType.STRING,
      description: "One specific, data-backed sentence answering the question.",
    },
  },
  required: ["verdict", "detail"],
};

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    siteType: {
      type: SchemaType.STRING,
      description:
        "Inferred site type, e.g. 'SaaS marketing', 'portfolio', 'documentation', 'corporate', 'e-commerce', 'news/blog'",
    },
    siteTypeConfidence: {
      type: SchemaType.STRING,
      description: "'high' or 'medium'",
    },
    narrative: {
      type: SchemaType.STRING,
      description:
        "2–3 sentence plain-language description of what the site's architecture communicates. Describe the story the structure tells — not what the site contains.",
    },
    strengths: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          detail: { type: SchemaType.STRING },
        },
        required: ["title", "detail"],
      },
    },
    issues: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          severity: {
            type: SchemaType.STRING,
            description: "'high', 'medium', or 'low'",
          },
          title: { type: SchemaType.STRING },
          detail: { type: SchemaType.STRING },
          affectedCount: { type: SchemaType.NUMBER },
        },
        required: ["severity", "title", "detail"],
      },
    },
    recommendations: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          priority: { type: SchemaType.NUMBER },
          title: { type: SchemaType.STRING },
          detail: { type: SchemaType.STRING },
          impact: {
            type: SchemaType.STRING,
            description: "'high', 'medium', or 'low'",
          },
        },
        required: ["priority", "title", "detail", "impact"],
      },
    },
    architectureIntelligence: {
      type: SchemaType.OBJECT,
      properties: {
        navigationScalable: verdictItem,
        contentFindable: verdictItem,
        overloadedSections: verdictItem,
        misfitPages: verdictItem,
        docsDiscoverable: verdictItem,
        marketingOvershadowing: verdictItem,
        redundantPaths: verdictItem,
        optimizedForGrowth: verdictItem,
      },
      required: [
        "navigationScalable",
        "contentFindable",
        "overloadedSections",
        "misfitPages",
        "docsDiscoverable",
        "marketingOvershadowing",
        "redundantPaths",
        "optimizedForGrowth",
      ],
    },
  },
  required: [
    "siteType",
    "siteTypeConfidence",
    "narrative",
    "strengths",
    "issues",
    "recommendations",
    "architectureIntelligence",
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many analysis requests. Please wait before trying again." });
  }

  const { nodes, edges } = req.body;

  if (!nodes || !edges) {
    return res.status(400).end("Missing nodes or edges data");
  }

  // Pre-compute a dense summary — sends signal, not noise
  const categories: Record<string, number> = {};
  const depthHistogram: Record<number, number> = {};
  const categoryDepthTotals: Record<string, { total: number; count: number }> = {};
  let totalDepth = 0;
  let thinPageCount = 0;
  let totalNavLinks = 0;
  let maxNavLinks = 0;

  for (const n of nodes) {
    const cat = n.category || "Other";
    categories[cat] = (categories[cat] || 0) + 1;
    depthHistogram[n.depth] = (depthHistogram[n.depth] || 0) + 1;
    totalDepth += n.depth;
    if (n.wordCount > 0 && n.wordCount < 300) thinPageCount++;

    // Nav breadth
    const navCount = n.links?.navigation?.internal?.length ?? 0;
    totalNavLinks += navCount;
    if (navCount > maxNavLinks) maxNavLinks = navCount;

    // Depth per category
    if (!categoryDepthTotals[cat]) categoryDepthTotals[cat] = { total: 0, count: 0 };
    categoryDepthTotals[cat].total += n.depth;
    categoryDepthTotals[cat].count += 1;
  }

  const maxDepth = Math.max(...nodes.map((n: any) => n.depth), 0);
  const avgDepth =
    nodes.length > 0 ? (totalDepth / nodes.length).toFixed(1) : "0";

  const linkedTargets = new Set(edges.map((e: any) => e.target));
  const orphanCount = nodes.filter(
    (n: any) => n.depth > 0 && !linkedTargets.has(n.id)
  ).length;

  const inboundCount: Record<string, number> = {};
  for (const e of edges) {
    inboundCount[e.target] = (inboundCount[e.target] || 0) + 1;
  }

  const hubPages: HubPage[] = nodes
    .map((n: any) => ({
      url: n.url,
      title: n.title || n.url,
      inboundCount: inboundCount[n.id] || 0,
    }))
    .sort((a: HubPage, b: HubPage) => b.inboundCount - a.inboundCount)
    .slice(0, 5);

  // Category depth stats: avg depth per category
  const categoryDepthStats: Record<string, { count: number; avgDepth: string }> = {};
  for (const [cat, stats] of Object.entries(categoryDepthTotals)) {
    categoryDepthStats[cat] = {
      count: stats.count,
      avgDepth: (stats.total / stats.count).toFixed(1),
    };
  }

  // Nav breadth stats
  const avgNavLinks =
    nodes.length > 0 ? (totalNavLinks / nodes.length).toFixed(1) : "0";

  // Top-level sections (depth === 1)
  const topLevelSectionCount = nodes.filter((n: any) => n.depth === 1).length;

  // Marketing vs Product/App ratio
  const marketingCount = categories["Marketing"] ?? 0;
  const productCount = categories["Product/App"] ?? 0;
  const marketingToProductRatio =
    productCount > 0
      ? `${(marketingCount / productCount).toFixed(1)}:1`
      : marketingCount > 0
      ? "marketing only (no product pages)"
      : "N/A";

  const summary = {
    totalPages: nodes.length,
    maxDepth,
    avgDepth,
    categoryDistribution: categories,
    categoryDepthStats,
    depthHistogram,
    orphanCount,
    hubPages,
    thinPageCount,
    navBreadth: { avgNavLinksPerPage: avgNavLinks, maxNavLinksOnOnePage: maxNavLinks },
    topLevelSectionCount,
    marketingToProductRatio,
    allUrls: nodes.map((n: any) => n.url),
  };

  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
      } as any,
    });

    const prompt = `
You are an expert in Information Architecture. Analyze the structural data of a website.

Your goals:
1. Infer what kind of site this is from URL patterns, category distribution, and depth structure.
2. Write a narrative: describe what the site's architecture COMMUNICATES — the structural story it tells about the organization or person behind it. Be specific, not generic.
3. Surface genuine structural strengths — things the architecture does well.
4. Identify real IA issues — e.g. orphaned pages, unbalanced content sections, excessive depth for important categories, thin content clusters.
5. Give prioritized, actionable recommendations for improving the information architecture.
6. Answer the 8 Architecture Intelligence questions with a verdict ("yes", "partial", or "no") and one specific, data-backed sentence as the detail. Use actual numbers and paths from the summary. Each detail must reference something concrete from the data.

Architecture Intelligence questions:
- navigationScalable: Is the navigation scalable? (Consider topLevelSectionCount, avgNavLinksPerPage, maxDepth)
- contentFindable: Are users likely to find content? (Consider orphanCount, avgDepth, pages buried at depth > 3)
- overloadedSections: Which sections are overloaded? (Consider categoryDepthStats counts; "yes" = at least one section has disproportionately many pages)
- misfitPages: Which pages don't belong? (Consider URL patterns that don't match their category, or pages at unusual depths for their category)
- docsDiscoverable: Is documentation discoverable? (Consider Documentation category avgDepth and count; "no" if docs are deep or absent)
- marketingOvershadowing: Is marketing overshadowing product? (Use marketingToProductRatio; "yes" = marketing pages greatly outnumber product pages)
- redundantPaths: Are there redundant paths? (Look for similar URL patterns in allUrls, e.g. /about and /company/about)
- optimizedForGrowth: Is the website optimized for growth? (Consider presence of blog/content section, clear conversion paths, thin content ratio)

Focus entirely on Information Architecture: navigation logic, content hierarchy, discoverability, structural balance.
Do NOT mention SEO rankings, performance, or technical implementation.

Website Structure Summary:
${JSON.stringify(summary, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("AI Analysis error:", error);
    return res.status(500).json({ error: "Failed to run AI analysis" });
  }
}
