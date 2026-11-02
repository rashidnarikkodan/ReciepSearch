import type { IUserDocument } from '../models/user.model.js';
import type { UserRole } from '../types/index.js';
import type { IBaseRepository } from './base.repository.interface.js';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserRepository extends IBaseRepository<IUserDocument, CreateUserData> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}
