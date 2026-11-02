export interface RegisterRequestDto {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface LoginRequestDto {
  email: string;
  password?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}
