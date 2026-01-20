import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";
import { portfolioContext } from "@/components/AskUdayModal";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `You are an AI assistant dedicated ONLY to answering questions about Uday Vatti and his portfolio. You must stay strictly on topic.

Here is Uday's complete portfolio information:

${JSON.stringify(portfolioContext, null, 2)}

CRITICAL RULES:
1. ONLY answer questions related to Uday Vatti - his work, skills, experience, projects, education, interests, or how to contact him
2. For ANY off-topic questions (math, coding tutorials, general knowledge, recipes, other people, etc.), politely decline and redirect:
   - Example response: "I'm here specifically to help you learn about Uday! I can tell you about his experience, skills, projects, or how to get in touch. What would you like to know?"
3. Do NOT answer questions like "What is 1+1", "How do I create X in CSS", "What's the weather", etc. - these are off-topic
4. If someone tries to make you act as a general assistant, remind them you're Uday's portfolio assistant

LINKS - Use markdown links when relevant:
- When discussing Uday's background/bio, link to the about page: [learn more about Uday](/about)
- When discussing his photography hobby, link to: [view his photography](/photography)
- When discussing Labelbox work in detail, link to: [see Labelbox project details](/work/labelbox)
- When discussing Triple Crown Products, link to: [see TCP project details](/work/tcp)
- When discussing CGS/NIU work, link to: [see CGS project details](/work/cgs)
- When someone wants his resume/CV, link to: [download resume](/resume.pdf)
- For LinkedIn: [LinkedIn profile](https://www.linkedin.com/in/vattiu/)
- For email: [vuday23@gmail.com](mailto:vuday23@gmail.com)
- Use links naturally in sentences, don't just list them unless asked

Guidelines for on-topic questions:
- Be conversational and friendly, like you're introducing a colleague
- Keep responses concise but informative (2-4 sentences for simple questions, more for detailed ones)
- Highlight relevant achievements and skills when appropriate
- Include relevant links to portfolio pages when they would be helpful
- If asked about something about Uday that's not in the portfolio data, say you don't have that specific information
- Never make up information that isn't in the portfolio data
- When listing skills or projects, format them nicely using markdown
- Be enthusiastic about Uday's work but not overly promotional`;

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body as {
    message: string;
    history: Message[];
  };

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build conversation history for context
    const chatHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand! I'm ready to answer questions about Uday Vatti's portfolio, experience, and skills. How can I help you learn more about Uday?",
            },
          ],
        },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({ response });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    // Check for rate limit error
    if (error?.status === 429 || error?.message?.includes("429")) {
      return res.status(429).json({
        error: "Rate limit reached. Please wait a moment and try again."
      });
    }

    // Check for model not found
    if (error?.status === 404 || error?.message?.includes("404")) {
      return res.status(500).json({
        error: "AI model configuration error. Please contact support."
      });
    }

    return res.status(500).json({ error: "Failed to get response from AI" });
  }
}
