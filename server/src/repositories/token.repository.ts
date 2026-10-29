import { Token } from '../models/token.model.js';
import type { ITokenDocument } from '../types/index.js';
import type { ITokenRepository, CreateTokenData } from '../interfaces/index.js';

export class TokenRepository implements ITokenRepository {
  public async create(data: CreateTokenData): Promise<ITokenDocument> {
    return Token.create(data);
  }

  public async findByToken(token: string): Promise<ITokenDocument | null> {
    return Token.findOne({ token });
  }

  public async deleteByToken(token: string): Promise<boolean> {
    const result = await Token.deleteOne({ token });
    return (result.deletedCount || 0) > 0;
  }

  public async deleteById(id: string): Promise<boolean> {
    const result = await Token.deleteOne({ _id: id });
    return (result.deletedCount || 0) > 0;
  }
}

export const tokenRepository = new TokenRepository();
