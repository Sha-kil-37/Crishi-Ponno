import { z } from "zod";

export const aiMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant", "tool"]),
  content: z.string().min(1),
});

export const aiCompletionRequestSchema = z.object({
  model: z.enum(["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "gpt-4o-mini"]),
  messages: z.array(aiMessageSchema).min(1),
  maxTokens: z.number().int().positive().optional(),
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  stream: z.boolean().optional(),
});

export type AICompletionRequestSchema = z.infer<
  typeof aiCompletionRequestSchema
>;

export const openAIStandardResponseSchema = z.object({
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
  choices: z
    .array(
      z.object({
        index: z.number(),
        message: z
          .object({ role: z.string(), content: z.string().optional() })
          .optional(),
        finish_reason: z.string().nullable(),
      }),
    )
    .nonempty(),
});

export type OpenAIStandardResponse = z.infer<
  typeof openAIStandardResponseSchema
>;
