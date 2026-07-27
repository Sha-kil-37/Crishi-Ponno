import { AIProvider } from "@/ai/providers/AIProvider";
import { OpenAIProvider } from "@/ai/providers/OpenAIProvider";
import { aiConfig } from "@/ai/config";
import { buildSystemPrompt, buildUserPrompt } from "@/ai/prompts/base.prompt";
import type {
  AICompletionRequest,
  AICompletionResponse,
  AIHealthStatus,
  AIStreamHandler,
} from "@/ai/types/ai.types";

export class AIService {
  constructor(private readonly provider: AIProvider) {}

  public static create(provider?: AIProvider): AIService {
    return new AIService(provider ?? new OpenAIProvider());
  }

  public async healthCheck(): Promise<AIHealthStatus> {
    return this.provider.healthCheck();
  }

  public async generateText(
    request: AICompletionRequest,
  ): Promise<AICompletionResponse> {
    return this.provider.createCompletion(request);
  }

  public async streamText(
    request: AICompletionRequest,
    handler: AIStreamHandler,
  ): Promise<void> {
    if (!this.provider.createCompletionStream) {
      throw new Error("AI provider does not support streaming completions.");
    }

    return this.provider.createCompletionStream(request, handler);
  }

  public async createAssistantMessage(
    userInput: string,
  ): Promise<AICompletionResponse> {
    const request: AICompletionRequest = {
      model: aiConfig.AI_DEFAULT_MODEL,
      temperature: aiConfig.AI_DEFAULT_TEMPERATURE,
      maxTokens: aiConfig.AI_DEFAULT_MAX_TOKENS,
      messages: [buildSystemPrompt(), buildUserPrompt(userInput)],
    };

    return this.generateText(request);
  }
}




// 
export function createAIService(provider?: AIProvider): AIService {
  return AIService.create(provider);
}
