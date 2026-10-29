export interface IAppError {
  statusCode: number;
  code: string;
  isOperational: boolean;
  details?: unknown;
}
