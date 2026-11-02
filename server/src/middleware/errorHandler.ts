import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';
import { AppError, NotFoundError, TooManyRequestsError } from '../errors/index.js';
import type { IApiErrorResponse } from '../types/response.types.js';

export function notFoundHandler(req: Request, _res: Response, _next: NextFunction): void {
  throw new NotFoundError(
    ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND(req.method, req.originalUrl),
    ERROR_CODES.ROUTE_NOT_FOUND
  );
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const timestamp = new Date().toISOString();
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // 1. Custom Application Errors (Domain & Operational)
  if (err instanceof AppError) {
    if (err instanceof TooManyRequestsError && err.retryAfter) {
      res.setHeader('Retry-After', err.retryAfter.toString());
    }

    const payload: IApiErrorResponse & { message: string } = {
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined && { details: err.details }),
      },
      timestamp,
    };

    res.status(err.statusCode).json(payload);
    return;
  }

  // 2. Zod Validation Errors
  if (err instanceof ZodError || (typeof err === 'object' && err !== null && 'issues' in err)) {
    const zodErr = err as ZodError;
    const formattedErrors = zodErr.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    const message = formattedErrors[0]?.message || ERROR_MESSAGES.VALIDATION.INVALID_INPUT;
    const payload: IApiErrorResponse & { message: string } = {
      success: false,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message,
        details: formattedErrors,
      },
      timestamp,
    };

    res.status(HTTP_STATUS.BAD_REQUEST).json(payload);
    return;
  }

  // 3. Mongoose Duplicate Key Error (Code 11000)
  if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: number }).code === 11000
  ) {
    const keyVal = (err as { keyValue?: Record<string, unknown> }).keyValue;
    const field = keyVal ? Object.keys(keyVal)[0] : 'resource';
    const message = `${field} already exists.`;

    const payload: IApiErrorResponse & { message: string } = {
      success: false,
      statusCode: HTTP_STATUS.CONFLICT,
      message,
      error: {
        code: ERROR_CODES.ALREADY_EXISTS,
        message,
        details: keyVal,
      },
      timestamp,
    };

    res.status(HTTP_STATUS.CONFLICT).json(payload);
    return;
  }

  // 4. Mongoose Cast Error (Invalid ObjectId)
  if (
    typeof err === 'object' &&
    err !== null &&
    'name' in err &&
    (err as { name: string }).name === 'CastError'
  ) {
    const castErr = err as { path?: string; value?: unknown };
    const message = `Invalid value for ${castErr.path || 'identifier'}.`;

    const payload: IApiErrorResponse & { message: string } = {
      success: false,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      error: {
        code: ERROR_CODES.INVALID_ID,
        message,
      },
      timestamp,
    };

    res.status(HTTP_STATUS.BAD_REQUEST).json(payload);
    return;
  }

  // 5. Default Internal Server Error (Fallback)
  const isProduction = process.env.NODE_ENV === 'production';
  const errorMessage =
    !isProduction && err instanceof Error
      ? err.message
      : ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR;

  const payload: IApiErrorResponse & { message: string } = {
    success: false,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      ...(!isProduction && err instanceof Error && { stack: err.stack }),
    },
    timestamp,
  };

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(payload);
}
