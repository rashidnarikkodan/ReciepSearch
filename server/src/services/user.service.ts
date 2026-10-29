import bcrypt from 'bcryptjs';
import {
  ERROR_MESSAGES,
  AUTH_CONSTANTS,
} from '../constants/index.js';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from '../errors/index.js';
import type {
  RegisterDTO,
  LoginDTO,
  AuthUserPayload,
} from '../types/index.js';
import type {
  IUserService,
  IUserRepository,
} from '../interfaces/index.js';

export class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  public async register(data: RegisterDTO): Promise<AuthUserPayload> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const existingUser = await this.userRepo.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, AUTH_CONSTANTS.SALT_ROUNDS);

    const newUser = await this.userRepo.create({
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
    });

    return {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: 'user',
      createdAt: newUser.createdAt,
    };
  }

  public async login(credentials: LoginDTO): Promise<AuthUserPayload> {
    const normalizedEmail = credentials.email.toLowerCase().trim();

    const user = await this.userRepo.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: 'user',
      createdAt: user.createdAt,
    };
  }

  public async getMe(userId: string): Promise<AuthUserPayload> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: 'user',
      createdAt: user.createdAt,
    };
  }
}