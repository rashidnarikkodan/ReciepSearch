import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodError, type ZodTypeAny } from 'zod';
import { BadRequestError } from '../errors/index.js';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

interface ValidationSchema {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

export function validate(schema: ValidationSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.query) {
        const parsed = schema.query.parse(req.query);
        Object.defineProperty(req, 'query', {
          value: parsed,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      if (schema.params) {
        const parsed = schema.params.parse(req.params);
        Object.defineProperty(req, 'params', {
          value: parsed,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0]?.message || ERROR_MESSAGES.VALIDATION.INVALID_INPUT;
        const details = error.issues.map((issue) => issue.message);
        return next(new BadRequestError(message, ERROR_CODES.INVALID_INPUT, details));
      }
      next(error);
    }
  };
}

export default validate;
