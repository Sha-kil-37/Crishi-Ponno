import { ProviderError, TimeoutError } from "@/ai/errors";

export async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 10_000,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const requestInit: RequestInit = {
    ...init,
    signal: controller.signal,
  };

  try {
    const response = await fetch(input, requestInit);
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new TimeoutError(`Request timed out after ${timeoutMs}ms.`, error);
    }

    throw new ProviderError("Network error while calling AI provider.", error);
  } finally {
    clearTimeout(timeout);
  }
}

export async function retryAsync<T>(
  action: () => Promise<T>,
  retries = 2,
  delayMs = 500,
  shouldRetry: (error: unknown) => boolean = () => true,
): Promise<T> {
  let attempt = 0;
  let lastError: unknown;

  while (attempt <= retries) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      attempt += 1;

      if (attempt > retries || !shouldRetry(error)) {
        break;
      }

      await wait(delayMs);
    }
  }

  throw lastError;
}

export function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
