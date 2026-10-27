import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export function notFoundHandler(req: Request, res: Response, _next: NextFunction): void {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND(req.method, req.originalUrl),
    error: {
      code: ERROR_CODES.ROUTE_NOT_FOUND,
      message: ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND(req.method, req.originalUrl),
    },
  });
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.code
      ? {
          error: {
            code: err.code,
            message,
            ...(err.details ? { details: err.details } : {}),
          },
        }
      : {}),
  });
}
