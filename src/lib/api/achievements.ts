/**
 * Achievement API Client
 * 
 * Handles communication with backend achievement endpoints.
 */

import axios from 'axios';
import type { Achievement, UserAchievement, AchievementProgress } from '../data/achievements';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8010';

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

/**
 * Create axios instance with auth header
 */
function createAuthClient() {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/**
 * List all available achievements (public)
 */
export async function listAllAchievements(): Promise<Achievement[]> {
  const response = await axios.get(`${API_BASE_URL}/api/v1/achievements`);
  return response.data;
}

/**
 * Get user's unlocked achievements (requires auth)
 */
export async function getUserAchievements(): Promise<UserAchievement[]> {
  const client = createAuthClient();
  const response = await client.get('/api/v1/achievements/user');
  
  return response.data.map((item: any) => ({
    id: item.id,
    achievement_id: item.achievement_id,
    unlocked_at: new Date(item.unlocked_at),
    metadata: item.metadata,
    achievement: item.achievement,
  }));
}

/**
 * Get user's progress toward achievements (requires auth)
 */
export async function getAchievementProgress(): Promise<AchievementProgress[]> {
  const client = createAuthClient();
  const response = await client.get('/api/v1/achievements/progress');
  return response.data;
}

/**
 * Check if achievements should unlock based on action (requires auth)
 */
export async function checkAchievements(
  trigger: string,
  metadata?: Record<string, any>
): Promise<{ newly_unlocked: UserAchievement[]; count: number }> {
  const client = createAuthClient();
  const response = await client.post('/api/v1/achievements/check', {
    trigger,
    metadata: metadata || {},
  });
  
  return {
    newly_unlocked: response.data.newly_unlocked,
    count: response.data.count,
  };
}

/**
 * Get certificate-eligible achievements user has unlocked (requires auth)
 */
export async function getCertificateAchievements(): Promise<any[]> {
  const client = createAuthClient();
  const response = await client.get('/api/v1/achievements/certificates');
  return response.data;
}

/**
 * Generate certificate URL for achievement
 */
export function getCertificateUrl(achievementId: string): string {
  const token = getAuthToken();
  return `${API_BASE_URL}/api/v1/certificates/${achievementId}?token=${token}`;
}

/**
 * Generate LinkedIn share URL for achievement
 */
export function getLinkedInShareUrl(achievement: Achievement): string {
  const text = encodeURIComponent(
    `I earned the "${achievement.title}" achievement at Open Agent School! ${achievement.description}`
  );
  const url = encodeURIComponent('https://openagentschool.org/achievements');
  
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;
}
