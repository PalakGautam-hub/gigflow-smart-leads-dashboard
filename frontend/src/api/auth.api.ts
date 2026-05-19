import api from './axios';
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return data.data!;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      credentials
    );
    return data.data!;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>('/auth/profile');
    return data.data!;
  },
};
