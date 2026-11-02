import type { Response } from 'express';
import { HTTP_STATUS } from '../constants/index.js';
import type { PaginationMeta } from '../types/recipe.types.js';

export default function success<T>(
  res: Response,
  message?: string,
  statusCode: number = HTTP_STATUS.OK,
  data?: T
): void {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

export function paginatedSuccess<T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message?: string,
  statusCode: number = HTTP_STATUS.OK
): void {
  res.status(statusCode).json({
    success: true,
    data,
    pagination,
    ...(message ? { message } : {}),
  });
}
