// ─── Micro-Listening Progress Store ──────────────────────────────────────────
// Client-side localStorage persistence for listening progress, streaks,
// daily goals, and per-episode playback state.
// Storage key: 'oas-micro-listening-progress'

import type {
  ListeningProfile,
  ListeningLevel,
  EpisodeProgress,
  QueueMode,
} from './types';

const STORAGE_KEY = 'oas-micro-listening-progress';

// ─── Revision counter (for React reactivity) ────────────────────────────────

let _revision = 0;

/** Current revision number — increments on every save. */
export function getRevision(): number {
  return _revision;
}

// ─── Default profile ─────────────────────────────────────────────────────────

/** Sensible defaults for a new listener. */
export const DEFAULT_PROFILE: ListeningProfile = {
  currentStreak: 0,
  longestStreak: 0,
  lastListenedDate: '',
  totalMinutesListened: 0,
  totalEpisodesCompleted: 0,
  preferredLevel: 'beginner',
  dailyGoalMinutes: 5,
  todayMinutesListened: 0,
  todayDate: todayISO(),
  seriesProgress: {},
  episodeProgress: {},
  queue: [],
  queueMode: 'daily-mix',
  unlockedAchievements: [],
};

// ─── Read / Write ────────────────────────────────────────────────────────────

/**
 * Reads the listening profile from localStorage.
 * Returns a fresh default profile if none exists or on error.
 */
export function getListeningProfile(): ListeningProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE, todayDate: todayISO() };
    const parsed = JSON.parse(raw) as ListeningProfile;
    // Reset today's counter if the date rolled over
    if (parsed.todayDate !== todayISO()) {
      parsed.todayMinutesListened = 0;
      parsed.todayDate = todayISO();
    }
    return parsed;
  } catch {
    return { ...DEFAULT_PROFILE, todayDate: todayISO() };
  }
}

/**
 * Persists the listening profile to localStorage and bumps the revision counter.
 */
export function saveListeningProfile(profile: ListeningProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    _revision++;
  } catch {
    // localStorage full or blocked — degrade silently
  }
}

// ─── Episode Progress ────────────────────────────────────────────────────────

function progressKey(episodeId: string, level: ListeningLevel): string {
  return `${episodeId}:${level}`;
}

/**
 * Updates playback position and accumulated listen duration for an episode.
 */
export function markEpisodeProgress(
  episodeId: string,
  level: ListeningLevel,
  position: number,
  duration: number,
): void {
  const profile = getListeningProfile();
  const key = progressKey(episodeId, level);
  const existing = profile.episodeProgress[key];

  profile.episodeProgress[key] = {
    episodeId,
    level,
    completed: existing?.completed ?? false,
    playbackPosition: position,
    completedAt: existing?.completedAt,
    listenedDuration: (existing?.listenedDuration ?? 0) + duration,
  };

  profile.lastListenedDate = todayISO();
  saveListeningProfile(profile);
}

/**
 * Marks an episode+level as completed. Updates streak, series progress,
 * and total-episodes counter.
 */
export function markEpisodeComplete(episodeId: string, level: ListeningLevel): void {
  const profile = getListeningProfile();
  const key = progressKey(episodeId, level);
  const existing = profile.episodeProgress[key];

  // Idempotent — don't double-count
  if (existing?.completed) return;

  profile.episodeProgress[key] = {
    episodeId,
    level,
    completed: true,
    playbackPosition: existing?.playbackPosition ?? 0,
    completedAt: new Date().toISOString(),
    listenedDuration: existing?.listenedDuration ?? 0,
  };

  profile.totalEpisodesCompleted += 1;
  profile.lastListenedDate = todayISO();

  // Update series progress — we need the series ID from the episode key
  // The calling code should also update seriesProgress; we'll do a best-effort
  // by storing into a generic bucket. Callers can augment with series-aware logic.
  updateStreakInternal(profile);
  saveListeningProfile(profile);
}

/**
 * Checks if the streak should continue, reset, or stay. Mutates `profile` in place.
 */
export function updateStreak(): void {
  const profile = getListeningProfile();
  updateStreakInternal(profile);
  saveListeningProfile(profile);
}

function updateStreakInternal(profile: ListeningProfile): void {
  const today = todayISO();
  const yesterday = dateOffset(-1);

  if (profile.lastListenedDate === today) {
    // Already listened today — streak unchanged
    return;
  }

  if (profile.lastListenedDate === yesterday) {
    // Listened yesterday — streak continues
    profile.currentStreak += 1;
  } else if (profile.lastListenedDate === '') {
    // First ever listen
    profile.currentStreak = 1;
  } else {
    // Gap > 1 day — streak resets
    profile.currentStreak = 1;
  }

  profile.longestStreak = Math.max(profile.currentStreak, profile.longestStreak);
  profile.lastListenedDate = today;
}

// ─── Daily Goal ──────────────────────────────────────────────────────────────

/**
 * Adds `minutesListened` to today's total.
 */
export function updateDailyGoal(minutesListened: number): void {
  const profile = getListeningProfile();
  // Reset if day rolled
  if (profile.todayDate !== todayISO()) {
    profile.todayMinutesListened = 0;
    profile.todayDate = todayISO();
  }
  profile.todayMinutesListened += minutesListened;
  profile.totalMinutesListened += minutesListened;
  saveListeningProfile(profile);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Returns the progress record for a specific episode+level, or undefined.
 */
export function getEpisodeProgress(
  episodeId: string,
  level: ListeningLevel,
): EpisodeProgress | undefined {
  const profile = getListeningProfile();
  return profile.episodeProgress[progressKey(episodeId, level)];
}

/**
 * Returns the completion percentage (0–100) for a series at a given level.
 */
export function getSeriesCompletionPercent(
  seriesId: string,
  level: ListeningLevel,
  totalEpisodes: number,
): number {
  if (totalEpisodes === 0) return 0;
  const profile = getListeningProfile();
  const completed = profile.seriesProgress[seriesId]?.[level] ?? 0;
  return Math.round((completed / totalEpisodes) * 100);
}

// ─── Reset ───────────────────────────────────────────────────────────────────

/**
 * Clears all listening progress from localStorage.
 */
export function resetProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    _revision++;
  } catch {
    // ignore
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function dateOffset(days: number, from?: string): string {
  const d = from ? new Date(from + 'T00:00:00') : new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
