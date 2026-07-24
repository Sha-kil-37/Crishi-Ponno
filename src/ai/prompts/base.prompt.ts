import type { AIMessage } from "@/ai/types/ai.types";

export interface PromptContext {
  language?: "en" | "bn";
  persona?: string;
}

export function buildSystemPrompt(context: PromptContext = {}): AIMessage {
  const persona = context.persona ?? "Crishi Ponno agriculture assistant";
  const language = context.language === "bn" ? "Bangla" : "English";
  return {
    role: "system",
    content: `You are ${persona}. Answer user queries with concise, accessible advice for agriculture and e-commerce. Use ${language} when requested and keep responses user-friendly, secure, and helpful.`,
  };
}

export function buildUserPrompt(userQuery: string): AIMessage {
  return {
    role: "user",
    content: userQuery.trim(),
  };
}

export function buildProductSearchPrompt(userQuery: string): AIMessage {
  return {
    role: "user",
    content: `Convert the following natural language request into structured filters for a MongoDB product search schema: "${userQuery}". Return only the JSON object representing query values, category tags, price ranges, and product attributes.`,
  };
}
