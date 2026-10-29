import type { Request, Response, CookieOptions } from 'express';
import { AuthService } from '../services/auth.service.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants/index.js';

const COOKIE_NAME = 'token';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.NAME_REQUIRED,
        error: {
          code: ERROR_CODES.INVALID_INPUT,
          message: ERROR_MESSAGES.AUTH.NAME_REQUIRED,
        },
      });
      return;
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.EMAIL_INVALID,
        error: {
          code: ERROR_CODES.INVALID_INPUT,
          message: ERROR_MESSAGES.AUTH.EMAIL_INVALID,
        },
      });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 6 || password.length > 128) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.PASSWORD_LENGTH,
        error: {
          code: ERROR_CODES.INVALID_INPUT,
          message: ERROR_MESSAGES.AUTH.PASSWORD_LENGTH,
        },
      });
      return;
    }

    // Role is strictly enforced as 'user'
    const result = await AuthService.register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
      data: result,
    });
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.CREDENTIALS_REQUIRED,
        error: {
          code: ERROR_CODES.INVALID_INPUT,
          message: ERROR_MESSAGES.AUTH.CREDENTIALS_REQUIRED,
        },
      });
      return;
    }

    const result = await AuthService.login({ email, password });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
      data: result,
    });
  }

  public static async getMe(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        },
      });
      return;
    }

    const profile = await AuthService.getProfile(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        user: profile,
      },
    });
  }

  public static async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS,
    });
  }
}
