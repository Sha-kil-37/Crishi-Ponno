

//  ai error
export class AIError extends Error {
  public override name = "AIError";
  public readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
    Object.setPrototypeOf(this, AIError.prototype);
  }
}

// ai provider error
export class ProviderError extends AIError {
  public override name = "ProviderError";

  constructor(message: string, cause?: unknown) {
    super(message, cause);
    Object.setPrototypeOf(this, ProviderError.prototype);
  }
}

//  
export class ValidationError extends AIError {
  public override name = "ValidationError";

  constructor(message: string, cause?: unknown) {
    super(message, cause);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class TimeoutError extends AIError {
  public override name = "TimeoutError";

  constructor(message: string, cause?: unknown) {
    super(message, cause);
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class RateLimitError extends AIError {
  public override name = "RateLimitError";

  constructor(message: string, cause?: unknown) {
    super(message, cause);
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}
