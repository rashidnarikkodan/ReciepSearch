import type { ITokenDocument } from '../types/index.js';

export interface CreateTokenData {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface ITokenRepository {
  create(data: CreateTokenData): Promise<ITokenDocument>;
  findByToken(token: string): Promise<ITokenDocument | null>;
  deleteByToken(token: string): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}
