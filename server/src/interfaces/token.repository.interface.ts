import type { ITokenDocument } from '../models/token.model.js';
import type { IBaseRepository } from './base.repository.interface.js';

export interface CreateTokenData {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface ITokenRepository extends IBaseRepository<ITokenDocument, CreateTokenData> {
  findByToken(token: string): Promise<ITokenDocument | null>;
  deleteByToken(token: string): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}
