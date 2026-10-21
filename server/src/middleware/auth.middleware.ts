import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import type { JwtUserPayload } from '../services/auth.service.js';

export interface AuthenticatedUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
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
      res.status(401).json({
        success: false,
        message: 'Authentication required. Token missing from Authorization header and cookies.',
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_recipe_search_app_2026';
    let decoded: JwtUserPayload;

    try {
      decoded = jwt.verify(token, secret) as JwtUserPayload;
    } catch (err: unknown) {
      const isExpired = err instanceof jwt.TokenExpiredError;
      res.status(401).json({
        success: false,
        message: isExpired ? 'Token has expired. Please login again.' : 'Invalid authentication token.',
      });
      return;
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    next();
  } catch (error) {
    next(error);
  }
}
