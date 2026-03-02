// ─── Micro-Learning Sync API Client ──────────────────────────────────────────
// Communicates with POST /api/v1/micro-learning/sync and GET /api/v1/micro-learning/progress
// Used by the sync queue, NOT called directly by components.

import axios from 'axios';
import type { MicroLearningProgress, CapsuleCompletion } from '@/lib/data/microLearning/types';

const API_BASE_URL = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';

// ─── Auth helper ─────────────────────────────────────────────────────────────

function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

function createAuthClient() {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 15_000,
  });
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// ─── Payload types (match backend schemas) ───────────────────────────────────

interface CompletionPayload {
  capsule_id: string;
  completed_at: string;
  xp_earned: number;
  quiz_score?: number | null;
}

interface SyncRequest {
  completions: CompletionPayload[];
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  daily_goal: number;
  achievement_ids: string[];
}

export interface SyncResponse {
  merged_completions: CompletionPayload[];
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  daily_goal: number;
  achievement_ids: string[];
  new_from_server: number;
  accepted_from_client: number;
}

export interface RemoteProgress {
  completions: CompletionPayload[];
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  daily_goal: number;
  achievement_ids: string[];
}

// ─── API calls ───────────────────────────────────────────────────────────────

/**
 * Push local progress to server, receive merged canonical state.
 */
export async function syncMicroLearningProgress(
  localProgress: MicroLearningProgress,
  achievementIds: string[],
): Promise<SyncResponse> {
  const client = createAuthClient();

  const payload: SyncRequest = {
    completions: localProgress.completions.map(toPayload),
    total_xp: localProgress.totalXP,
    current_streak: localProgress.currentStreak,
    longest_streak: localProgress.longestStreak,
    last_activity_date: localProgress.lastActivityDate,
    daily_goal: localProgress.dailyGoal,
    achievement_ids: achievementIds,
  };

  const { data } = await client.post<SyncResponse>(
    '/api/v1/micro-learning/sync',
    payload,
  );
  return data;
}

/**
 * Fetch server-side progress (used on login to merge).
 */
export async function fetchMicroLearningProgress(): Promise<RemoteProgress> {
  const client = createAuthClient();
  const { data } = await client.get<RemoteProgress>(
    '/api/v1/micro-learning/progress',
  );
  return data;
}

// ─── Converters ──────────────────────────────────────────────────────────────

function toPayload(c: CapsuleCompletion): CompletionPayload {
  return {
    capsule_id: c.capsuleId,
    completed_at: c.completedAt,
    xp_earned: c.xpEarned,
    quiz_score: c.quizScore ?? null,
  };
}

/** Convert server payload back to client-side CapsuleCompletion */
export function fromPayload(p: CompletionPayload): CapsuleCompletion {
  return {
    capsuleId: p.capsule_id,
    completedAt: p.completed_at,
    xpEarned: p.xp_earned,
    quizScore: p.quiz_score ?? undefined,
  };
}
