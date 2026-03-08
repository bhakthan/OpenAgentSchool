async function loadSyncApi() {
  return import('@/lib/api/microListeningSync');
}

import { getListeningProfile, saveListeningProfile } from '@/lib/data/microListening/progress';
import type { ListeningProfile } from '@/lib/data/microListening/types';

let dirty = false;
let syncing = false;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let lastSyncAt = 0;

const DEBOUNCE_MS = 30_000;
const MIN_INTERVAL_MS = 60_000;

export function scheduleMicroListeningSync(): void {
  dirty = true;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(flushSync, DEBOUNCE_MS);
}

async function flushSync(): Promise<void> {
  if (!dirty || syncing) return;
  const api = await loadSyncApi();
  if (!navigator.onLine || !api.isAuthenticated()) return;
  if (Date.now() - lastSyncAt < MIN_INTERVAL_MS) {
    debounceTimer = setTimeout(flushSync, MIN_INTERVAL_MS);
    return;
  }

  syncing = true;
  try {
    const local = getListeningProfile();
    const response = await api.syncMicroListeningProgress(local);
    saveListeningProfile(response);
    dirty = false;
    lastSyncAt = Date.now();
  } catch {
    debounceTimer = setTimeout(flushSync, DEBOUNCE_MS * 2);
  } finally {
    syncing = false;
  }
}

export async function mergeListeningOnLogin(): Promise<void> {
  const api = await loadSyncApi();
  if (!navigator.onLine || !api.isAuthenticated()) return;

  try {
    const remote = await api.fetchMicroListeningProgress();
    const local = getListeningProfile();
    const merged = mergeRemoteIntoLocal(remote, local);
    saveListeningProfile(merged);
    const response = await api.syncMicroListeningProgress(merged);
    saveListeningProfile(response);
    dirty = false;
    lastSyncAt = Date.now();
  } catch {
    // Local-only fallback
  }
}

function mergeRemoteIntoLocal(remote: ListeningProfile, local: ListeningProfile): ListeningProfile {
  const mergedEpisodeProgress = { ...local.episodeProgress };

  for (const [key, progress] of Object.entries(remote.episodeProgress)) {
    const existing = mergedEpisodeProgress[key];
    if (!existing) {
      mergedEpisodeProgress[key] = progress;
      continue;
    }

    mergedEpisodeProgress[key] = {
      ...existing,
      completed: existing.completed || progress.completed,
      playbackPosition: Math.max(existing.playbackPosition, progress.playbackPosition),
      completedAt: [existing.completedAt, progress.completedAt].filter(Boolean).sort()[0],
      listenedDuration: Math.max(existing.listenedDuration, progress.listenedDuration),
    };
  }

  const mergedSeriesProgress: ListeningProfile['seriesProgress'] = { ...local.seriesProgress };
  for (const [seriesId, levels] of Object.entries(remote.seriesProgress)) {
    const current = mergedSeriesProgress[seriesId] ?? {};
    for (const [level, count] of Object.entries(levels)) {
      current[level as keyof typeof current] = Math.max(current[level as keyof typeof current] ?? 0, count);
    }
    mergedSeriesProgress[seriesId] = current;
  }

  return {
    ...local,
    episodeProgress: mergedEpisodeProgress,
    seriesProgress: mergedSeriesProgress,
    currentStreak: Math.max(local.currentStreak, remote.currentStreak),
    longestStreak: Math.max(local.longestStreak, remote.longestStreak),
    lastListenedDate: local.lastListenedDate > remote.lastListenedDate ? local.lastListenedDate : remote.lastListenedDate,
    totalMinutesListened: Math.max(local.totalMinutesListened, remote.totalMinutesListened),
    totalEpisodesCompleted: Math.max(local.totalEpisodesCompleted, remote.totalEpisodesCompleted),
    preferredLevel: local.preferredLevel,
    dailyGoalMinutes: local.dailyGoalMinutes,
    todayMinutesListened: Math.max(local.todayMinutesListened, remote.todayMinutesListened),
    todayDate: local.todayDate > remote.todayDate ? local.todayDate : remote.todayDate,
    queue: local.queue.length > 0 ? local.queue : remote.queue,
    queueMode: local.queueMode,
    unlockedAchievements: [...new Set([...local.unlockedAchievements, ...remote.unlockedAchievements])],
  };
}

let initialized = false;

export function registerMicroListeningSync(): void {
  if (initialized) return;
  initialized = true;

  window.addEventListener('online', () => {
    if (dirty) flushSync();
  });

  setInterval(() => {
    if (dirty && navigator.onLine) {
      flushSync();
    }
  }, 5 * 60 * 1000);

  window.addEventListener('beforeunload', () => {
    if (dirty && navigator.onLine && !!localStorage.getItem('access_token')) {
      try {
        const local = getListeningProfile();
        const apiBase = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';
        navigator.sendBeacon(
          `${apiBase}/api/v1/micro-listening/sync`,
          new Blob([JSON.stringify(local)], { type: 'application/json' }),
        );
      } catch {
        // Best effort only
      }
    }
  });
}
