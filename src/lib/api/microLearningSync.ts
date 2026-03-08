// ─── Micro-Learning Sync API Client ──────────────────────────────────────────
// Communicates with POST /api/v1/micro-learning/sync and GET /api/v1/micro-learning/progress
// Used by the sync queue, NOT called directly by components.

import type { MicroLearningProgress, CapsuleCompletion } from '@/lib/data/microLearning/types';
import { loadByteProgress } from '@/lib/data/microLearning/progress';
import { loadDeck, type ReviewDeck } from '@/lib/data/microLearning/spacedRepetition';

// Lazy-load axios to avoid top-level fetch during module evaluation (breaks vitest workers).
function getApiBaseUrl(): string {
  return import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';
}

// ─── Auth helper ─────────────────────────────────────────────────────────────

function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

async function createAuthClient() {
  const { default: axios } = await import('axios');
  const token = getAuthToken();
  return axios.create({
    baseURL: getApiBaseUrl(),
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

interface ByteCardPayload {
  card_id: string;
  completed_at: string;
  xp_earned: number;
}

interface SyncRequest {
  completions: CompletionPayload[];
  byte_cards: ByteCardPayload[];
  role_profile: MicroLearningProgress['roleProfile'] | null;
  review_deck: ReviewDeck;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  daily_goal: number;
  achievement_ids: string[];
}

export interface SyncResponse {
  merged_completions: CompletionPayload[];
  merged_byte_cards: ByteCardPayload[];
  role_profile: MicroLearningProgress['roleProfile'] | null;
  review_deck: ReviewDeck;
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
  byte_cards: ByteCardPayload[];
  role_profile: MicroLearningProgress['roleProfile'] | null;
  review_deck: ReviewDeck;
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
  const client = await createAuthClient();
  const byteProgress = loadByteProgress();
  const reviewDeck = loadDeck();

  const payload: SyncRequest = {
    completions: localProgress.completions.map(toPayload),
    byte_cards: Object.entries(byteProgress.completedCards).map(([cardId, completedAt]) => ({
      card_id: cardId,
      completed_at: completedAt,
      xp_earned: 2,
    })),
    role_profile: localProgress.roleProfile ?? null,
    review_deck: reviewDeck,
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
  const client = await createAuthClient();
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

export function fromBytePayload(p: ByteCardPayload): { cardId: string; completedAt: string } {
  return {
    cardId: p.card_id,
    completedAt: p.completed_at,
  };
}
