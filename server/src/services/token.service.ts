import crypto from 'crypto';
import { AUTH_CONSTANTS } from '../constants/index.js';
import type { ITokenService, ITokenRepository } from '../interfaces/index.js';

export class TokenService implements ITokenService {
  constructor(private readonly tokenRepo: ITokenRepository) {}

  public async createToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(AUTH_CONSTANTS.OAT_BYTES).toString('hex');
    const expiresAt = new Date(Date.now() + AUTH_CONSTANTS.TOKEN_TTL_MS);

    await this.tokenRepo.create({
      token,
      userId,
      expiresAt,
    });

    return token;
  }

  public async revokeToken(token: string): Promise<void> {
    await this.tokenRepo.deleteByToken(token);
  }
}
