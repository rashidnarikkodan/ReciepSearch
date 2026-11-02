import { z } from 'zod';
import { AUTH_CONSTANTS, ERROR_MESSAGES } from '../constants/index.js';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(AUTH_CONSTANTS.MIN_NAME_LENGTH, ERROR_MESSAGES.AUTH.NAME_REQUIRED)
    .max(AUTH_CONSTANTS.MAX_NAME_LENGTH, ERROR_MESSAGES.AUTH.NAME_REQUIRED),
  email: z
    .string()
    .trim()
    .email(ERROR_MESSAGES.AUTH.EMAIL_INVALID)
    .toLowerCase(),
  password: z
    .string()
    .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH)
    .max(AUTH_CONSTANTS.MAX_PASSWORD_LENGTH, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email(ERROR_MESSAGES.AUTH.EMAIL_INVALID)
    .toLowerCase(),
  password: z
    .string()
    .min(1, ERROR_MESSAGES.AUTH.CREDENTIALS_REQUIRED),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
