import { User } from '../models/user.model.js';
import type { IUserDocument } from '../types/index.js';
import type { IUserRepository, CreateUserData } from '../interfaces/index.js';
import { BaseMongoRepository } from './base/base.mongo.repository.js';

export class UserRepository extends BaseMongoRepository<IUserDocument, CreateUserData> implements IUserRepository {
  constructor() {
    super(User);
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  public override async findById(id: string): Promise<IUserDocument | null> {
    return this.model.findById(id).select('-password').exec();
  }
}

export const userRepository = new UserRepository();
