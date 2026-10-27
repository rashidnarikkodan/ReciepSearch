import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import type { JwtUserPayload } from '../services/auth.service.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export interface AuthenticatedUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user';
  createdAt?: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
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

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_recipe_search_app_2026';
    let decoded: JwtUserPayload;

    try {
      decoded = jwt.verify(token, secret) as JwtUserPayload;
    } catch (err: unknown) {
      const isExpired = err instanceof jwt.TokenExpiredError;
      const message = isExpired
        ? ERROR_MESSAGES.AUTH.TOKEN_EXPIRED
        : ERROR_MESSAGES.AUTH.INVALID_TOKEN;
      const code = isExpired ? ERROR_CODES.TOKEN_EXPIRED : ERROR_CODES.INVALID_TOKEN;

      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message,
        error: {
          code,
          message,
        },
      });
      return;
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.AUTH.USER_NO_LONGER_EXISTS,
          error: {
            code: ERROR_CODES.USER_NOT_FOUND,
            message: ERROR_MESSAGES.AUTH.USER_NO_LONGER_EXISTS,
          },
        });
        return;
      }

      req.user = {
        id: user._id.toString(),
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: 'user',
        createdAt: user.createdAt,
      };
    } else {
      // Offline/Test runner fallback when MongoDB is not connected
      req.user = {
        id: decoded.userId,
        _id: decoded.userId,
        name: 'User',
        email: decoded.email,
        role: decoded.role || 'user',
        createdAt: new Date(),
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}
