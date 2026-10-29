import { AppError } from './app.error.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export class BadGatewayError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.RECIPE.SEARCH_UNAVAILABLE,
    code: string = ERROR_CODES.RECIPE_PROVIDER_UNAVAILABLE,
    details?: unknown
  ) {
    super(message, HTTP_STATUS.BAD_GATEWAY, code, details);
  }
}
