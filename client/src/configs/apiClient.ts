import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import { getErrorMessage } from '../utils/error';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('recipe_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      error.message = getErrorMessage(error, error.message);
    }
    return Promise.reject(error);
  }
);

export async function request<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = getErrorMessage(error, error.message || 'Request failed');
      throw new Error(errorMsg, { cause: error });
    }
    throw error;
  }
}

export default apiClient;
