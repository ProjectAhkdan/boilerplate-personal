/**
 * Base application error
 * Semua custom error extend dari ini
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly isOperational: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error (user input invalid)
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields?: Record<string, string[]>,
  ) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

/**
 * Authentication error (login gagal, token invalid)
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

/**
 * Authorization error (tidak punya akses)
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

/**
 * Not found error (resource tidak ditemukan)
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

/**
 * Conflict error (duplicate data)
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 'CONFLICT', 409);
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
  }
}

/**
 * External API error (Supabase, third-party API)
 */
export class ExternalApiError extends AppError {
  constructor(
    service: string,
    message: string,
    public readonly originalError?: unknown,
  ) {
    super(`${service} error: ${message}`, 'EXTERNAL_API_ERROR', 502);
  }
}

/**
 * Database error
 */
export class DatabaseError extends AppError {
  constructor(
    message: string,
    public readonly originalError?: unknown,
  ) {
    super(message, 'DATABASE_ERROR', 500);
  }
}

/**
 * Helper untuk cek apakah error adalah AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Helper untuk sanitize error message sebelum dikirim ke client
 * Hanya kirim detail error kalau isOperational = true
 */
export function sanitizeError(error: unknown): {
  message: string;
  code: string;
  statusCode: number;
  fields?: Record<string, string[]>;
} {
  if (isAppError(error)) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...(error instanceof ValidationError && error.fields ? { fields: error.fields } : {}),
    };
  }

  // Unknown error - jangan expose detail ke client
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  };
}
