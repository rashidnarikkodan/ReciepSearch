import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';
import { AppError, NotFoundError, TooManyRequestsError } from '../errors/index.js';

export function notFoundHandler(req: Request, _res: Response, _next: NextFunction): void {
  throw new NotFoundError(
    ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND(req.method, req.originalUrl),
    ERROR_CODES.ROUTE_NOT_FOUND
  );
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  if (err instanceof AppError) {
    if (err instanceof TooManyRequestsError && err.retryAfter) {
      res.setHeader('Retry-After', err.retryAfter);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined && { details: err.details }),
      },
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR,
    },
  });
}
