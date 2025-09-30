/**
 * Authentication API Client
 * Handles login, signup, token management
 */

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class AuthAPIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.core || 'http://localhost:8001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't retried yet, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const refreshData = await this.refreshToken(refreshToken);
              this.setTokens(refreshData.access_token, refreshToken);
              originalRequest.headers.Authorization = `Bearer ${refreshData.access_token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            this.clearTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await this.client.post<{ access_token: string; token_type: string }>(
      '/api/v1/users/login',
      {
        username: credentials.email, // Backend uses username field
        password: credentials.password,
      }
    );
    
    const response: AuthResponse = {
      access_token: data.access_token,
      refresh_token: data.access_token, // No separate refresh token
      token_type: data.token_type,
      expires_in: 3600, // 60 minutes
      user: {
        id: credentials.email,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        created_at: new Date().toISOString(),
      },
    };
    
    this.setTokens(response.access_token, response.refresh_token);
    return response;
  }

  /**
   * Signup new user
   */
  async signup(signupData: SignupData): Promise<AuthResponse> {
    // First create the user
    await this.client.post('/api/v1/users/register', {
      username: signupData.email,
      email: signupData.email,
      password: signupData.password,
    });
    
    // Then login
    return this.login({
      email: signupData.email,
      password: signupData.password,
    });
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    const { data } = await this.client.post<RefreshResponse>('/api/auth/refresh', {
      refresh_token: refreshToken,
    });
    return data;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    // For now, decode user from token since backend doesn't have /me endpoint
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    try {
      // Decode JWT payload (without verification - just for display)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub || 'user';
      
      return {
        id: username,
        email: username,
        name: username.split('@')[0],
        created_at: new Date().toISOString(),
      };
    } catch {
      throw new Error('Invalid token');
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.client.post('/api/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Token management helpers
   */
  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

// Export singleton instance
export const authAPI = new AuthAPIClient();
