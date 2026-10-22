export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}

export interface ApiError {
  success: false;
  message: string;
}
