import type {
  AICompletionRequest,
  AICompletionResponse,
  AIHealthStatus,
  AIStreamHandler,
} from "@/ai/types/ai.types";

export interface AIProvider {
  getProviderName(): string;
  healthCheck(): Promise<AIHealthStatus>;
  createCompletion(request: AICompletionRequest): Promise<AICompletionResponse>;
  createCompletionStream?(
    request: AICompletionRequest,
    handler: AIStreamHandler,
  ): Promise<void>;
}
