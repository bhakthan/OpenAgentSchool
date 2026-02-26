/**
 * Admin API Client
 * Calls the admin-only endpoints on core-api (requires admin JWT).
 */

import axios from 'axios';
import { API_CONFIG } from './config';

const adminClient = axios.create({
  baseURL: API_CONFIG.core || 'http://localhost:8001',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Inject auth token on every request
adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Types ────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
}

export interface PlatformStats {
  total_users: number;
  active_users: number;
  admin_count: number;
  total_quiz_attempts: number;
  total_study_sessions: number;
  total_community_posts: number;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded';
  services: Record<string, string>;
  timestamp: string;
}

// ── API Calls ────────────────────────────────────────────────────────────

export const adminAPI = {
  /** List all users */
  async listUsers(): Promise<AdminUser[]> {
    const { data } = await adminClient.get<AdminUser[]>('/api/v1/admin/users');
    return data;
  },

  /** Change a user's role */
  async updateUserRole(userId: number, role: 'admin' | 'user'): Promise<AdminUser> {
    const { data } = await adminClient.patch<AdminUser>(
      `/api/v1/admin/users/${userId}/role`,
      { role },
    );
    return data;
  },

  /** Toggle user active status */
  async toggleUserActive(userId: number): Promise<{ id: number; is_active: boolean }> {
    const { data } = await adminClient.patch<{ id: number; is_active: boolean }>(
      `/api/v1/admin/users/${userId}/deactivate`,
    );
    return data;
  },

  /** Get platform aggregate stats */
  async getStats(): Promise<PlatformStats> {
    const { data } = await adminClient.get<PlatformStats>('/api/v1/admin/stats');
    return data;
  },

  /** Extended health check */
  async getHealth(): Promise<SystemHealth> {
    const { data } = await adminClient.get<SystemHealth>('/api/v1/admin/health');
    return data;
  },
};
