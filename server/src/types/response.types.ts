import type { PaginationMeta } from './recipe.types.js';

export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  pagination?: PaginationMeta;
  error?: IApiErrorPayload;
}

export interface IApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
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
}
