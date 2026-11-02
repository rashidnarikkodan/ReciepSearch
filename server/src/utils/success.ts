import type { Response } from 'express';
import { ResponseFactory } from '../core/response/response.factory.js';

export default function success<T>(
  res: Response,
  message?: string,
  statusCode?: number,
  data?: T
): void {
  ResponseFactory.success(res, data, message, statusCode);
}
