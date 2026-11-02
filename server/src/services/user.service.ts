import bcrypt from 'bcryptjs';
import { ERROR_MESSAGES, AUTH_CONSTANTS } from '../constants/index.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../errors/index.js';
import type { RegisterRequestDto, LoginRequestDto, UserResponseDto } from '../dtos/auth.dto.js';
import type { IUserService, IUserRepository } from '../interfaces/index.js';
import { UserMapper } from '../mappers/user.mapper.js';

export class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  public async register(data: RegisterRequestDto): Promise<UserResponseDto> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const existingUser = await this.userRepo.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const rawPassword = data.password || '';
    const hashedPassword = await bcrypt.hash(rawPassword, AUTH_CONSTANTS.SALT_ROUNDS);

    const newUser = await this.userRepo.create({
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
    });

    return UserMapper.toResponseDto(newUser);
  }

  public async login(credentials: LoginRequestDto): Promise<UserResponseDto> {
    const normalizedEmail = credentials.email.toLowerCase().trim();

    const user = await this.userRepo.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const rawPassword = credentials.password || '';
    const isPasswordValid = await bcrypt.compare(rawPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    return UserMapper.toResponseDto(user);
  }

  public async getMe(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    }

    return UserMapper.toResponseDto(user);
  }
}