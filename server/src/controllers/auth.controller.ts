import type { Request, Response, CookieOptions } from 'express';
import { AuthService } from '../services/auth.service.js';

const COOKIE_NAME = 'token';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ success: false, message: 'Name is required' });
      return;
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      res.status(400).json({ success: false, message: 'Email is required' });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
      return;
    }

    const result = await AuthService.register({ name, email, password, role });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const result = await AuthService.login({ email, password });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  }

  public static async getMe(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const profile = await AuthService.getProfile(userId);

    res.status(200).json({
      success: true,
      data: {
        user: profile,
      },
    });
  }

  public static async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }
}
