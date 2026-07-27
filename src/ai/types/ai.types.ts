export type AIProviderName = "openai";

export type AIModelName = "gpt-4.1" | "gpt-4.1-mini" | "gpt-4o" | "gpt-4o-mini";

export type AIMessageRole = "system" | "user" | "assistant" | "tool";

export interface AIMessage {
  role: AIMessageRole;
  content: string;
}

export interface AICompletionRequest {
  model: AIModelName;
  messages: AIMessage[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stream?: boolean;
}

export interface AIChoice {
  index: number;
  message: AIMessage;
  finishReason: string | null;
}

export interface AIOpenAIUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface AICompletionResponse {
  provider: AIProviderName;
  model: AIModelName;
  id: string;
  createdAt: string;
  text: string;
  raw: unknown;
  usage?: AIOpenAIUsage;
  choices: AIChoice[];
}

export interface AIHealthStatus {
  provider: AIProviderName;
  healthy: boolean;
  details: string;
}

export interface AIStreamHandler {
  onMessage: (delta: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}
