import type {
  RegisterRequestDto,
  LoginRequestDto,
  UserResponseDto,
} from '../dtos/auth.dto.js';

export interface IUserService {
  register(data: RegisterRequestDto): Promise<UserResponseDto>;
  login(credentials: LoginRequestDto): Promise<UserResponseDto>;
  getMe(userId: string): Promise<UserResponseDto>;
}

export interface ITokenService {
  createToken(userId: string): Promise<string>;
  revokeToken(token: string): Promise<void>;
}
