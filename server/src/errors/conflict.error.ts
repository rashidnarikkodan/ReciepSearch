import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class ConflictError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS,
    code: string = ERROR_CODES.USER_ALREADY_EXISTS
  ) {
    super(message, HTTP_STATUS.CONFLICT, code);
  }
}
