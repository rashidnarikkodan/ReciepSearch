import { AuthUserPayload, LoginDTO, RegisterDTO } from "../types/auth.types.js";

export interface IUserService {
  register(data: RegisterDTO): Promise<AuthUserPayload>;
  login(credentials: LoginDTO): Promise<AuthUserPayload>;
  getMe(userId: string): Promise<AuthUserPayload>;
}