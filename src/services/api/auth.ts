import { apiClient } from './client';
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  User
} from './types';

export const authAPI = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/users/register', data);
    apiClient.saveToken(response.access_token);
    return response;
  },
  
  /**
   * Login with username and password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/users/login', data);
    apiClient.saveToken(response.access_token);
    return response;
  },
  
  /**
   * Logout (clear token)
   */
  logout(): void {
    apiClient.removeToken();
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  },
  
  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/users/me');
  }
};
