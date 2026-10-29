import type { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  APP_CONFIG,
} from '../constants/index.js';
import { TooManyRequestsError } from '../errors/index.js';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface RateLimiterOptions {
  windowMs: number;
  max: number;
  message: string;
  code?: string;
}

export function createRateLimiter(options: RateLimiterOptions): RequestHandler {
  const ipMap = new Map<string, RateLimitRecord>();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      if (now > record.resetTime) {
        ipMap.delete(ip);
      }
    }
  }, APP_CONFIG.RATE_LIMIT_CLEANUP_INTERVAL_MS).unref();

  return (req: Request, _res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-client';
    const now = Date.now();
    let record = ipMap.get(ip);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + options.windowMs,
      };
      ipMap.set(ip, record);
      next();
      return;
    }

    record.count += 1;

    if (record.count > options.max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      throw new TooManyRequestsError(options.message, retryAfterSeconds, options.code || ERROR_CODES.RATE_LIMIT_EXCEEDED);
    }

    next();
  };
}

export const authRateLimiter = createRateLimiter({
  windowMs: APP_CONFIG.AUTH_RATE_LIMIT_WINDOW_MS,
  max: APP_CONFIG.AUTH_RATE_LIMIT_MAX,
  message: ERROR_MESSAGES.RATE_LIMIT.AUTH_LIMIT_EXCEEDED,
  code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
});

export const recipeRateLimiter = createRateLimiter({
  windowMs: APP_CONFIG.RECIPE_RATE_LIMIT_WINDOW_MS,
  max: APP_CONFIG.RECIPE_RATE_LIMIT_MAX,
  message: ERROR_MESSAGES.RATE_LIMIT.RECIPE_LIMIT_EXCEEDED,
  code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
});
