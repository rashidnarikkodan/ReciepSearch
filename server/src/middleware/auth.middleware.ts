import type { Request, Response, NextFunction } from 'express';
import { tokenRepository } from '../repositories/token.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  AUTH_CONSTANTS,
} from '../constants/index.js';
import { UnauthorizedError } from '../errors/index.js';

export default async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.[AUTH_CONSTANTS.COOKIE_NAME];

  if (!token) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
  }

  const tokenDoc = await tokenRepository.findByToken(token);
  if (!tokenDoc) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, ERROR_CODES.INVALID_TOKEN);
  }

  if (tokenDoc.expiresAt.getTime() < Date.now()) {
    await tokenRepository.deleteById(tokenDoc._id.toString());
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED, ERROR_CODES.TOKEN_EXPIRED);
  }

  const user = await userRepository.findById(tokenDoc.userId.toString());
  if (!user) {
    await tokenRepository.deleteById(tokenDoc._id.toString());
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.USER_NO_LONGER_EXISTS, ERROR_CODES.USER_NOT_FOUND);
  }

  req.user = {
    id: user._id.toString(),
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: 'user',
    createdAt: user.createdAt,
  };

  next();
}

export const authenticateToken = authenticate;
