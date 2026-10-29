import type { Response } from 'express';
import { HTTP_STATUS } from '../constants/index.js';

export default function success<T>(
  res: Response,
  message?: string,
  statusCode: number = HTTP_STATUS.OK,
  data?: T
): void {
  res.status(statusCode).json({
    success: true,
    data,
    message
  });
}
