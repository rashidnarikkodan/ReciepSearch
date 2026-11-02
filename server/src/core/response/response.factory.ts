import type { Response } from 'express';
import { HTTP_STATUS } from '../../constants/index.js';
import type { PaginationMeta } from '../../types/recipe.types.js';

export interface IApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  count?: number;
  pagination?: PaginationMeta;
  timestamp: string;
}

export class ResponseFactory {
  public static success<T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode: number = HTTP_STATUS.OK,
    count?: number
  ): void {
    const payload: IApiResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
      ...(count !== undefined ? { count } : {}),
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(payload);
  }

  public static created<T>(res: Response, data?: T, message?: string): void {
    this.success(res, data, message, HTTP_STATUS.CREATED);
  }

  public static paginated<T>(
    res: Response,
    data: T[],
    pagination: PaginationMeta,
    message?: string,
    statusCode: number = HTTP_STATUS.OK
  ): void {
    const payload: IApiResponse<T[]> = {
      success: true,
      statusCode,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(payload);
  }

  public static noContent(res: Response): void {
    res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}
