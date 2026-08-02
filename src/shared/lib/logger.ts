import pino from 'pino';
import { env, isDevelopment } from '@/shared/config/env';

/**
 * Pino logger instance
 * Development: pretty print ke console
 * Production: JSON structured log
 */
export const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      }
    : {}),
  base: {
    env: env.NODE_ENV,
  },
});

/**
 * Helper untuk log error dengan context
 */
export function logError(error: unknown, context?: Record<string, unknown>) {
  if (error instanceof Error) {
    logger.error(
      {
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack,
        },
        ...context,
      },
      'Error occurred',
    );
  } else {
    logger.error({ error, ...context }, 'Unknown error occurred');
  }
}

/**
 * Helper untuk log HTTP request
 */
export function logRequest(
  method: string,
  url: string,
  statusCode: number,
  duration: number,
  context?: Record<string, unknown>,
) {
  logger.info(
    {
      http: {
        method,
        url,
        statusCode,
        duration,
      },
      ...context,
    },
    'HTTP request',
  );
}
