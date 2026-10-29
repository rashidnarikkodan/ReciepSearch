export type UserRole = 'user';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUserPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
}

export interface AuthResponseData {
  user: AuthUserPayload;
  token: string;
}

export interface AuthenticatedUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
}
