import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class BadRequestError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.VALIDATION.INVALID_INPUT,
    code: string = ERROR_CODES.INVALID_INPUT,
    details?: unknown
  ) {
    super(message, HTTP_STATUS.BAD_REQUEST, code, details);
  }
}
