import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export function createRateLimiter(options: { windowMs: number; max: number; message: string; code?: string }) {
  const ipMap = new Map<string, RateLimitRecord>();

  // Periodically clean up expired entries every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      if (now > record.resetTime) {
        ipMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
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
      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: options.message,
        error: {
          code: options.code || ERROR_CODES.RATE_LIMIT_EXCEEDED,
          message: options.message,
        },
      });
      return;
    }

    next();
  };
}

// 15-minute window, max 20 attempts for login & registration
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: ERROR_MESSAGES.RATE_LIMIT.AUTH_LIMIT_EXCEEDED,
  code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
});

// 1-minute window, max 60 requests for recipe search & details
export const recipeRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  message: ERROR_MESSAGES.RATE_LIMIT.RECIPE_LIMIT_EXCEEDED,
  code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
});
