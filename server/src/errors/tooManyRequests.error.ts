import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class TooManyRequestsError extends AppError {
  public readonly retryAfter?: number;

  constructor(
    message: string = ERROR_MESSAGES.RATE_LIMIT.RECIPE_LIMIT_EXCEEDED,
    retryAfter?: number,
    code: string = ERROR_CODES.RATE_LIMIT_EXCEEDED
  ) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, code);
    this.retryAfter = retryAfter;
  }
}
