import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CATEGORIES = ["Marketing", "Documentation", "Company", "Legal", "Product/App", "Other"];
const CHUNK_SIZE = 25;

// Rate limiter: 5 classify calls per IP per 10 minutes
const classifyRequests = new Map<string, number[]>();
const CLASSIFY_LIMIT = 5;
const CLASSIFY_WINDOW_MS = 10 * 60 * 1000;

function getClientIp(req: NextApiRequest): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (classifyRequests.get(ip) || []).filter((t) => now - t < CLASSIFY_WINDOW_MS);
  if (prev.length >= CLASSIFY_LIMIT) return false;
  prev.push(now);
  classifyRequests.set(ip, prev);
  return true;
}

async function classifyChunk(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  urls: string[]
): Promise<Record<string, string>> {
  const prompt = `
You are an expert Information Architect. Classify each URL into EXACTLY ONE of these categories:
${CATEGORIES.join(", ")}

Respond ONLY with a valid JSON object. Keys are the exact URLs, values are category strings. No markdown.

URLs:
${JSON.stringify(urls)}
  `;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();
  if (text.startsWith("```json")) text = text.slice(7);
  if (text.startsWith("```")) text = text.slice(3);
  if (text.endsWith("```")) text = text.slice(0, -3);

  try {
    const parsed = JSON.parse(text);
    // Validate all values are known categories, default to "Other"
    const clean: Record<string, string> = {};
    for (const url of urls) {
      const cat = parsed[url];
      clean[url] = CATEGORIES.includes(cat) ? cat : "Other";
    }
    return clean;
  } catch {
    const fallback: Record<string, string> = {};
    for (const url of urls) fallback[url] = "Other";
    return fallback;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many classification requests. Please wait." });
  }

  const { urls } = req.body;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).end("Missing or invalid urls array");
  }

  // Cap total URLs to prevent abuse
  const safeUrls = (urls as unknown[])
    .filter((u): u is string => typeof u === "string")
    .slice(0, 500);

  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Process in sequential chunks of CHUNK_SIZE to respect token limits
    const allClassifications: Record<string, string> = {};
    for (let i = 0; i < safeUrls.length; i += CHUNK_SIZE) {
      const chunk = safeUrls.slice(i, i + CHUNK_SIZE);
      const result = await classifyChunk(model, chunk);
      Object.assign(allClassifications, result);
    }

    return res.status(200).json(allClassifications);
  } catch (error) {
    console.error("AI Classification error:", error);
    return res.status(500).json({ error: "Failed to classify URLs" });
  }
}
