import apiClient from '../configs/apiClient';
import type { ApiResponse } from '../types/api.types';
import type { LoginDTO, RegisterDTO, AuthResponseData, User } from '../types/auth.types';

export const authApi = {
  async register(data: RegisterDTO): Promise<AuthResponseData> {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/register', data);
    return res.data.data;
  },

  async login(credentials: LoginDTO): Promise<AuthResponseData> {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', credentials);
    return res.data.data;
  },

  async getMe(): Promise<User> {
    const res = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    const userData = res.data.data.user;
    // Map _id to id if returned by mongoose
    return {
      ...userData,
      id: userData.id || (userData as unknown as { _id: string })._id,
    };
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
