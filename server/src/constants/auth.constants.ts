import type { CookieOptions } from 'express';

export const AUTH_CONSTANTS = {
  COOKIE_NAME: 'token',
  SALT_ROUNDS: 10,
  OAT_BYTES: 32,
  TOKEN_TTL_MS: 7 * 24 * 60 * 60 * 1000,
  COOKIE_MAX_AGE_MS: 7 * 24 * 60 * 60 * 1000,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const getAuthCookieOptions = (isProduction: boolean): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: AUTH_CONSTANTS.COOKIE_MAX_AGE_MS,
});
