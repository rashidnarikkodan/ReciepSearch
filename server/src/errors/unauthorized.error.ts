import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class UnauthorizedError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.AUTH.UNAUTHORIZED,
    code: string = ERROR_CODES.UNAUTHORIZED
  ) {
    super(message, HTTP_STATUS.UNAUTHORIZED, code);
  }
}
