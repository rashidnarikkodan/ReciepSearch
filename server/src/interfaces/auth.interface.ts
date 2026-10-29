import type {
  RegisterDTO,
  LoginDTO,
  AuthUserPayload,
} from '../types/index.js';

export interface IUserService {
  register(data: RegisterDTO): Promise<AuthUserPayload>;
  login(credentials: LoginDTO): Promise<AuthUserPayload>;
  getMe(userId: string): Promise<AuthUserPayload>;
}

export interface ITokenService {
  createToken(userId: string): Promise<string>;
  revokeToken(token: string): Promise<void>;
}
