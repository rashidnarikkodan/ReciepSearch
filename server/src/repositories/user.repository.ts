import { User } from '../models/user.model.js';
import type { IUserDocument } from '../types/index.js';
import type { IUserRepository, CreateUserData } from '../interfaces/index.js';

export class UserRepository implements IUserRepository {
  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email });
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id).select('-password');
  }

  public async create(data: CreateUserData): Promise<IUserDocument> {
    return User.create(data);
  }
}

export const userRepository = new UserRepository();
