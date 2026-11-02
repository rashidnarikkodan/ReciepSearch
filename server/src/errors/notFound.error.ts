import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class NotFoundError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.SYSTEM.NOT_FOUND,
    code: string = ERROR_CODES.NOT_FOUND
  ) {
    super(message, HTTP_STATUS.NOT_FOUND, code);
  }
}
