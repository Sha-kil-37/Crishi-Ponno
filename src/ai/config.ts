import { z } from "zod";
import type { AIModelName, AIProviderName } from "@/ai/types/ai.types";
//
const aiEnvSchema = z.object({
  AI_PROVIDER: z.enum(["openai"]).default("openai"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_API_BASE_URL: z.string().url().default("https://api.openai.com"),
  AI_DEFAULT_MODEL: z
    .enum(["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "gpt-4o-mini"])
    .default("gpt-4o-mini"),
  AI_DEFAULT_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  AI_DEFAULT_MAX_TOKENS: z.coerce.number().int().positive().default(512),
});

export type AIConfig = z.infer<typeof aiEnvSchema>;

export const aiConfig: AIConfig = aiEnvSchema.parse({
  AI_PROVIDER: process.env.AI_PROVIDER,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_API_BASE_URL: process.env.OPENAI_API_BASE_URL,
  AI_DEFAULT_MODEL: process.env.AI_DEFAULT_MODEL,
  AI_DEFAULT_TEMPERATURE: process.env.AI_DEFAULT_TEMPERATURE,
  AI_DEFAULT_MAX_TOKENS: process.env.AI_DEFAULT_MAX_TOKENS,
});

export function isAIProviderEnabled(): boolean {
  return Boolean(aiConfig.OPENAI_API_KEY && aiConfig.AI_PROVIDER === "openai");
}

export function getDefaultAIModel(): AIModelName {
  return aiConfig.AI_DEFAULT_MODEL;
}

export function getDefaultAIProvider(): AIProviderName {
  return aiConfig.AI_PROVIDER;
}
