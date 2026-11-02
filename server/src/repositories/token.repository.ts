import { Token, type ITokenDocument } from '../models/token.model.js';
import type { ITokenRepository, CreateTokenData } from '../interfaces/index.js';
import { BaseMongoRepository } from './base/base.mongo.repository.js';

export class TokenRepository extends BaseMongoRepository<ITokenDocument, CreateTokenData> implements ITokenRepository {
  constructor() {
    super(Token);
  }

  public async findByToken(token: string): Promise<ITokenDocument | null> {
    return this.model.findOne({ token }).exec();
  }

  public async deleteByToken(token: string): Promise<boolean> {
    const result = await this.model.deleteOne({ token }).exec();
    return (result.deletedCount || 0) > 0;
  }

  public async deleteById(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return (result.deletedCount || 0) > 0;
  }
}

export const tokenRepository = new TokenRepository();
