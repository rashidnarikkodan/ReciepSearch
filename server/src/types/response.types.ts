import type { PaginationMeta } from './recipe.types.js';

export interface IApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  count?: number;
  pagination?: PaginationMeta;
  timestamp: string;
}

export interface IApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

export interface IApiErrorResponse {
  success: false;
  statusCode: number;
  error: IApiErrorPayload;
  timestamp: string;
}

export interface SuccessResponseOptions<T> {
  data?: T;
  message?: string;
  statusCode?: number;
  count?: number;
}

export interface PaginatedResponseOptions<T> {
  data: T[];
  pagination: PaginationMeta;
  statusCode?: number;
  message?: string;
}
