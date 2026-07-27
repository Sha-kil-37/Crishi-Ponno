import { z } from "zod";
import type { AIChoice, AICompletionResponse } from "@/ai/types/ai.types";

const openAIMessageSchema = z.object({
  role: z.string(),
  content: z.string().optional(),
});

const openAIChoiceSchema = z.object({
  index: z.number(),
  message: openAIMessageSchema.optional(),
  finish_reason: z.string().nullable(),
});

const openAICompletionResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  usage: z
    .object({
      prompt_tokens: z.number().optional(),
      completion_tokens: z.number().optional(),
      total_tokens: z.number().optional(),
    })
    .optional(),
  choices: z.array(openAIChoiceSchema).nonempty(),
});

export function parseOpenAICompletionResponse(
  raw: unknown,
): AICompletionResponse {
  const parsed = openAICompletionResponseSchema.parse(raw);

  const text = parsed.choices
    .map((choice) => choice.message?.content ?? "")
    .join("\n")
    .trim();

  const choices: AIChoice[] = parsed.choices.map((choice) => ({
    index: choice.index,
    message: {
      role: (choice.message?.role ??
        "assistant") as AIChoice["message"]["role"],
      content: choice.message?.content ?? "",
    },
    finishReason: choice.finish_reason,
  }));

  return {
    provider: "openai",
    model: parsed.model as AICompletionResponse["model"],
    id: parsed.id,
    createdAt: new Date(parsed.created * 1000).toISOString(),
    text,
    raw,
    usage: {
      promptTokens: parsed.usage?.prompt_tokens,
      completionTokens: parsed.usage?.completion_tokens,
      totalTokens: parsed.usage?.total_tokens,
    },
    choices,
  };
}

const openAIStreamChunkSchema = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  choices: z.array(
    z.object({
      delta: z.object({ content: z.string().optional() }).optional(),
      index: z.number(),
      finish_reason: z.string().nullable().optional(),
    }),
  ),
});

export function parseOpenAIStreamChunk(raw: unknown): string[] {
  const parsed = openAIStreamChunkSchema.parse(raw);

  return parsed.choices
    .map((choice) => choice.delta?.content)
    .filter((chunk): chunk is string => typeof chunk === "string");
}
