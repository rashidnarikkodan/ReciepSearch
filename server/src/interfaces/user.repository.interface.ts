import type { IUserDocument, UserRole } from '../types/index.js';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserDocument | null>;
  findById(id: string): Promise<IUserDocument | null>;
  create(data: CreateUserData): Promise<IUserDocument>;
}
