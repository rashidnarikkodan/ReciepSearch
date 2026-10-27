import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from '../constants/index.js';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUserPayload {
  id: string;
  name: string;
  email: string;
  role: 'user';
  createdAt: Date;
}

export interface AuthResponse {
  user: AuthUserPayload;
  token: string;
}

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: 'user';
}

interface ServiceError extends Error {
  statusCode?: number;
  code?: string;
}

export class AuthService {
  private static readonly SALT_ROUNDS = 10;

  public static generateToken(payload: JwtUserPayload): string {
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_recipe_search_app_2026';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
  }

  public static async register(data: RegisterDTO): Promise<AuthResponse> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const error = new Error(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS) as ServiceError;
      error.statusCode = HTTP_STATUS.CONFLICT;
      error.code = ERROR_CODES.USER_ALREADY_EXISTS;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    const newUser = await User.create({
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
    });

    const token = this.generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: 'user',
    });

    return {
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: 'user',
        createdAt: newUser.createdAt,
      },
      token,
    };
  }

  public static async login(credentials: LoginDTO): Promise<AuthResponse> {
    const normalizedEmail = credentials.email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const error = new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS) as ServiceError;
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      error.code = ERROR_CODES.UNAUTHORIZED;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      const error = new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS) as ServiceError;
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      error.code = ERROR_CODES.UNAUTHORIZED;
      throw error;
    }

    const token = this.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: 'user',
    });

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: 'user',
        createdAt: user.createdAt,
      },
      token,
    };
  }

  public static async getProfile(userId: string): Promise<AuthUserPayload> {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error(ERROR_MESSAGES.AUTH.USER_NOT_FOUND) as ServiceError;
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: 'user',
      createdAt: user.createdAt,
    };
  }
}
