import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class ForbiddenError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.AUTH.FORBIDDEN,
    code: string = ERROR_CODES.FORBIDDEN
  ) {
    super(message, HTTP_STATUS.FORBIDDEN, code);
  }
}
