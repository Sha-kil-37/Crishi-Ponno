import type {
  AICompletionRequest,
  AICompletionResponse,
  AIHealthStatus,
  AIStreamHandler,
} from "@/ai/types/ai.types";
import { AIProvider } from "@/ai/providers/AIProvider";
import { aiConfig } from "@/ai/config";
import { aiCompletionRequestSchema } from "@/ai/schemas/base.schemas";
import {
  parseOpenAICompletionResponse,
  parseOpenAIStreamChunk,
} from "@/ai/parsers/responseParser";
import { fetchWithTimeout, retryAsync } from "@/ai/tools/helpers";
import { ProviderError, TimeoutError, ValidationError } from "@/ai/errors";

interface OpenAIChatRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}

export class OpenAIProvider implements AIProvider {
  public getProviderName(): string {
    return "openai";
  }

  public async healthCheck(): Promise<AIHealthStatus> {
    if (!aiConfig.OPENAI_API_KEY) {
      return {
        provider: "openai",
        healthy: false,
        details: "AI provider configuration is missing OPENAI_API_KEY.",
      };
    }

    try {
      const response = await fetchWithTimeout(
        `${aiConfig.OPENAI_API_BASE_URL}/v1/models`,
        {
          method: "GET",
          headers: this.getHeaders(),
        },
        10_000,
      );

      if (!response.ok) {
        return {
          provider: "openai",
          healthy: false,
          details: `OpenAI health check failed with status ${response.status}.`,
        };
      }

      return {
        provider: "openai",
        healthy: true,
        details: "OpenAI is reachable.",
      };
    } catch (error) {
      return {
        provider: "openai",
        healthy: false,
        details:
          error instanceof Error
            ? error.message
            : "Unknown error during OpenAI health check.",
      };
    }
  }

  public async createCompletion(
    request: AICompletionRequest,
  ): Promise<AICompletionResponse> {
    const validatedRequest = aiCompletionRequestSchema.safeParse(request);

    if (!validatedRequest.success) {
      throw new ValidationError(
        "AI completion request validation failed.",
        validatedRequest.error,
      );
    }

    if (!aiConfig.OPENAI_API_KEY) {
      throw new ProviderError("OPENAI_API_KEY is not configured.");
    }

    const body: OpenAIChatRequest = {
      model: validatedRequest.data.model,
      messages: validatedRequest.data.messages,
      max_tokens: validatedRequest.data.maxTokens,
      temperature: validatedRequest.data.temperature,
      top_p: validatedRequest.data.topP,
      stream: validatedRequest.data.stream,
    };

    const response = await retryAsync(
      async () =>
        fetchWithTimeout(
          `${aiConfig.OPENAI_API_BASE_URL}/v1/chat/completions`,
          {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(body),
          },
          30_000,
        ),
      2,
      500,
      (error) => error instanceof TimeoutError === false,
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new ProviderError(
        `OpenAI request failed: ${response.status} ${response.statusText}. Response body: ${responseText}`,
      );
    }

    const json = await response.json();
    return parseOpenAICompletionResponse(json);
  }

  public async createCompletionStream(
    request: AICompletionRequest,
    handler: AIStreamHandler,
  ): Promise<void> {
    const validatedRequest = aiCompletionRequestSchema.safeParse(request);

    if (!validatedRequest.success) {
      throw new ValidationError(
        "AI stream request validation failed.",
        validatedRequest.error,
      );
    }

    if (!validatedRequest.data.stream) {
      throw new ValidationError("Stream requests require stream=true.");
    }

    if (!aiConfig.OPENAI_API_KEY) {
      throw new ProviderError("OPENAI_API_KEY is not configured.");
    }

    const body: OpenAIChatRequest = {
      model: validatedRequest.data.model,
      messages: validatedRequest.data.messages,
      max_tokens: validatedRequest.data.maxTokens,
      temperature: validatedRequest.data.temperature,
      top_p: validatedRequest.data.topP,
      stream: true,
    };

    const response = await fetchWithTimeout(
      `${aiConfig.OPENAI_API_BASE_URL}/v1/chat/completions`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      },
      30_000,
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new ProviderError(
        `OpenAI stream request failed: ${response.status} ${response.statusText}. Response body: ${responseText}`,
      );
    }

    if (!response.body) {
      throw new ProviderError("OpenAI stream response did not include a body.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) {
            continue;
          }

          const data = trimmed.replace(/^data:\s*/, "");

          if (data === "[DONE]") {
            handler.onDone?.();
            return;
          }

          try {
            const parsedChunk = JSON.parse(data);
            const deltas = parseOpenAIStreamChunk(parsedChunk);
            deltas.forEach((delta) => handler.onMessage(delta));
          } catch (error) {
            handler.onError?.(
              error instanceof Error
                ? error
                : new ProviderError("Failed to parse stream chunk."),
            );
          }
        }
      }

      handler.onDone?.();
    } catch (error) {
      handler.onError?.(
        error instanceof Error
          ? error
          : new ProviderError("OpenAI stream error."),
      );
      throw error;
    }
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.OPENAI_API_KEY ?? ""}`,
    };
  }
}
