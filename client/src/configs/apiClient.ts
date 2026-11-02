import axios, { type AxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function request<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.message || error.message || 'Request failed';
      throw new Error(errorMsg, { cause: error });
    }
    throw error;
  }
}

export default apiClient;
