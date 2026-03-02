// ─── Micro-Learning Background Sync ──────────────────────────────────────────
// Debounced, online-aware sync between localStorage and the backend.
// Pattern: every mutation → mark dirty → debounced flush.
//
// Usage:
//   import { scheduleMicroLearningSync, mergeOnLogin } from './microLearningSync';
//   // After each capsule completion:
//   scheduleMicroLearningSync();
//   // On login:
//   await mergeOnLogin();

import {
  syncMicroLearningProgress,
  fetchMicroLearningProgress,
  fromPayload,
  isAuthenticated,
  type SyncResponse,
  type RemoteProgress,
} from '@/lib/api/microLearningSync';
import { loadProgress, saveProgress } from '@/lib/data/microLearning/progress';
import { getUnlockedAchievementIds } from '@/lib/hooks/microLearningAchievements';
import type { MicroLearningProgress, CapsuleCompletion } from '@/lib/data/microLearning/types';

// ─── Sync status (in-memory, not persisted) ─────────────────────────────────

let dirty = false;
let syncing = false;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let lastSyncAt = 0;

const DEBOUNCE_MS = 30_000; // 30 s after last mutation
const MIN_INTERVAL_MS = 60_000; // never more often than once per minute

// ─── Mark dirty & schedule ───────────────────────────────────────────────────

/**
 * Call after every local mutation (capsule complete, goal change, etc.).
 * Batches syncs to avoid back-to-back network calls.
 */
export function scheduleMicroLearningSync(): void {
  dirty = true;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(flushSync, DEBOUNCE_MS);
}

// ─── Flush (internal) ────────────────────────────────────────────────────────

async function flushSync(): Promise<void> {
  if (!dirty || syncing) return;
  if (!navigator.onLine || !isAuthenticated()) return;
  if (Date.now() - lastSyncAt < MIN_INTERVAL_MS) {
    // Too soon — reschedule
    debounceTimer = setTimeout(flushSync, MIN_INTERVAL_MS);
    return;
  }

  syncing = true;
  try {
    const local = loadProgress();
    const achievementIds = [...getUnlockedAchievementIds()];
    const response = await syncMicroLearningProgress(local, achievementIds);
    applyServerMerge(response);
    dirty = false;
    lastSyncAt = Date.now();
    console.log(
      `[micro-sync] Synced ✓ — server accepted ${response.accepted_from_client} / added ${response.new_from_server}`,
    );
  } catch (err) {
    console.warn('[micro-sync] Sync failed, will retry:', err);
    // Retry later
    debounceTimer = setTimeout(flushSync, DEBOUNCE_MS * 2);
  } finally {
    syncing = false;
  }
}

// ─── Merge On Login ──────────────────────────────────────────────────────────

/**
 * Called once when the user logs in. Fetches the server's state, merges with
 * the local state, and pushes the union back up.
 */
export async function mergeOnLogin(): Promise<void> {
  if (!navigator.onLine || !isAuthenticated()) return;

  try {
    const remote = await fetchMicroLearningProgress();
    if (remote.completions.length === 0 && loadProgress().completions.length === 0) {
      // Nothing to merge on either side
      return;
    }

    // Merge remote into local
    const merged = mergeRemoteIntoLocal(remote);
    saveProgress(merged);

    // Push merged result back (ensures server has local-only entries)
    const achievementIds = [...getUnlockedAchievementIds()];
    const response = await syncMicroLearningProgress(merged, achievementIds);
    applyServerMerge(response);

    dirty = false;
    lastSyncAt = Date.now();
    console.log('[micro-sync] Login merge complete');
  } catch (err) {
    console.warn('[micro-sync] Login merge failed — operating on local state:', err);
  }
}

// ─── Merge Helpers ───────────────────────────────────────────────────────────

/**
 * Merge remote completions into local progress. Result favours the union of
 * both completion lists and the higher of each scalar metric.
 */
function mergeRemoteIntoLocal(remote: RemoteProgress): MicroLearningProgress {
  const local = loadProgress();

  // Union completions (deduplicate by capsuleId, keep earliest completedAt)
  const map = new Map<string, CapsuleCompletion>();

  for (const c of local.completions) {
    map.set(c.capsuleId, c);
  }
  for (const rp of remote.completions) {
    const c = fromPayload(rp);
    const existing = map.get(c.capsuleId);
    if (!existing || c.completedAt < existing.completedAt) {
      map.set(c.capsuleId, c);
    }
  }

  const mergedCompletions = [...map.values()].sort(
    (a, b) => a.completedAt.localeCompare(b.completedAt),
  );

  // Re-derive XP from completions
  const totalXP = mergedCompletions.reduce((sum, c) => sum + c.xpEarned, 0);

  return {
    ...local,
    completions: mergedCompletions,
    totalXP,
    currentStreak: Math.max(local.currentStreak, remote.current_streak),
    longestStreak: Math.max(local.longestStreak, remote.longest_streak),
    lastActivityDate:
      local.lastActivityDate > remote.last_activity_date
        ? local.lastActivityDate
        : remote.last_activity_date,
    dailyGoal: local.dailyGoal, // client preference
  };
}

/**
 * After a push sync, apply the server's merged canonical state to localStorage.
 */
function applyServerMerge(response: SyncResponse): void {
  const local = loadProgress();

  const serverCompletions = response.merged_completions.map(fromPayload);

  // Rebuild from server canonical (keeps locally derived fields like roleProfile)
  const merged: MicroLearningProgress = {
    ...local,
    completions: serverCompletions,
    totalXP: response.total_xp,
    currentStreak: response.current_streak,
    longestStreak: response.longest_streak,
    lastActivityDate: response.last_activity_date,
    dailyGoal: response.daily_goal,
  };

  saveProgress(merged);
}

// ─── Online / Interval listeners ─────────────────────────────────────────────

let initialized = false;

/**
 * Register event listeners for automatic sync.
 * Call once at app startup (e.g., from backgroundSync.ts).
 */
export function registerMicroLearningSync(): void {
  if (initialized) return;
  initialized = true;

  // Flush on coming back online
  window.addEventListener('online', () => {
    if (dirty) {
      console.log('[micro-sync] Back online — flushing');
      flushSync();
    }
  });

  // Periodic fallback (5 min)
  setInterval(() => {
    if (dirty && navigator.onLine) {
      flushSync();
    }
  }, 5 * 60 * 1000);

  // Flush before unload (best-effort)
  window.addEventListener('beforeunload', () => {
    if (dirty && navigator.onLine && isAuthenticated()) {
      // Use sendBeacon for reliability
      try {
        const local = loadProgress();
        const achievementIds = [...getUnlockedAchievementIds()];
        const payload = JSON.stringify({
          completions: local.completions.map((c) => ({
            capsule_id: c.capsuleId,
            completed_at: c.completedAt,
            xp_earned: c.xpEarned,
            quiz_score: c.quizScore ?? null,
          })),
          total_xp: local.totalXP,
          current_streak: local.currentStreak,
          longest_streak: local.longestStreak,
          last_activity_date: local.lastActivityDate,
          daily_goal: local.dailyGoal,
          achievement_ids: achievementIds,
        });
        const apiBase = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';
        navigator.sendBeacon(
          `${apiBase}/api/v1/micro-learning/sync`,
          new Blob([payload], { type: 'application/json' }),
        );
      } catch {
        // Best effort — can't guarantee delivery
      }
    }
  });
}
