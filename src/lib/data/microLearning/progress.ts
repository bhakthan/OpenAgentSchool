// ─── Micro-Learning Progress Store ───────────────────────────────────────────
// Client-side progress persistence with streak, XP, and daily goal tracking.
// Mirrors the localStorage + optional backend sync pattern used by Study Mode.

import type {
  CapsuleCompletion,
  CapsuleType,
  MicroLearningProgress,
  RoleProfile,
} from './types';
import { XP_VALUES, QUIZ_PERFECT_BONUS, DEFAULT_DAILY_GOAL } from './types';
import { CAPSULES_BY_TRACK } from './capsules';
import { BYTE_XP } from '../byteSized/types';

const STORAGE_KEY = 'micro-learning-progress';

// ─── Read / Write ────────────────────────────────────────────────────────────

function defaultProgress(): MicroLearningProgress {
  return {
    completions: [],
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: '',
    dailyGoal: DEFAULT_DAILY_GOAL,
  };
}

export function loadProgress(): MicroLearningProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as MicroLearningProgress;
    // Re-derive streak on load in case days passed since last visit
    return recalculateStreak(parsed);
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: MicroLearningProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or blocked — degrade silently
  }
}

// ─── Capsule Completion ──────────────────────────────────────────────────────

export function completeCapsule(
  capsuleId: string,
  capsuleType: CapsuleType,
  quizScore?: number,
): MicroLearningProgress {
  const progress = loadProgress();

  // Idempotent — don't double-award
  if (progress.completions.some((c) => c.capsuleId === capsuleId)) {
    return progress;
  }

  let xp = XP_VALUES[capsuleType];
  if (capsuleType === 'quiz-checkpoint' && quizScore === 100) {
    xp += QUIZ_PERFECT_BONUS;
  }

  const completion: CapsuleCompletion = {
    capsuleId,
    completedAt: new Date().toISOString(),
    xpEarned: xp,
    quizScore,
  };

  progress.completions.push(completion);
  progress.totalXP += xp;
  progress.lastActivityDate = todayISO();

  // Update streak
  const updated = recalculateStreak(progress);
  saveProgress(updated);
  return updated;
}

// ─── Track Progress ──────────────────────────────────────────────────────────

export function getTrackProgress(trackId: string): {
  completed: number;
  total: number;
  percent: number;
} {
  const capsules = CAPSULES_BY_TRACK[trackId] ?? [];
  const progress = loadProgress();
  const completedIds = new Set(progress.completions.map((c) => c.capsuleId));
  const completed = capsules.filter((c) => completedIds.has(c.id)).length;
  const total = capsules.length;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function isCapsuleCompleted(capsuleId: string): boolean {
  const progress = loadProgress();
  return progress.completions.some((c) => c.capsuleId === capsuleId);
}

// ─── Daily Goal ──────────────────────────────────────────────────────────────

export function getDailyProgress(): { completed: number; goal: number } {
  const progress = loadProgress();
  const today = todayISO();
  const completed = progress.completions.filter(
    (c) => c.completedAt.slice(0, 10) === today,
  ).length;
  return { completed, goal: progress.dailyGoal };
}

export function setDailyGoal(goal: number): void {
  const progress = loadProgress();
  progress.dailyGoal = Math.max(1, Math.min(20, goal));
  saveProgress(progress);
}

// ─── Streak ──────────────────────────────────────────────────────────────────

function recalculateStreak(progress: MicroLearningProgress): MicroLearningProgress {
  if (progress.completions.length === 0) {
    return { ...progress, currentStreak: 0 };
  }

  // Build a set of unique activity dates (YYYY-MM-DD)
  const activityDates = new Set(
    progress.completions.map((c) => c.completedAt.slice(0, 10)),
  );

  const today = todayISO();
  const yesterday = dateOffset(-1);

  // If no activity today or yesterday, streak is broken
  if (!activityDates.has(today) && !activityDates.has(yesterday)) {
    return { ...progress, currentStreak: 0 };
  }

  // Count consecutive days backward from today (or yesterday if not yet today)
  let streak = 0;
  let cursor = activityDates.has(today) ? today : yesterday;

  while (activityDates.has(cursor)) {
    streak++;
    cursor = dateOffset(-1, cursor);
  }

  const longestStreak = Math.max(progress.longestStreak, streak);
  return { ...progress, currentStreak: streak, longestStreak };
}

// ─── Role Profile ────────────────────────────────────────────────────────────

export function saveRoleProfile(profile: RoleProfile): void {
  const progress = loadProgress();
  progress.roleProfile = profile;
  saveProgress(progress);
}

export function getRoleProfile(): RoleProfile | undefined {
  return loadProgress().roleProfile;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getStats() {
  const progress = loadProgress();
  return {
    totalCapsules: progress.completions.length,
    totalXP: progress.totalXP,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    averageQuizScore: averageQuizScore(progress),
  };
}

function averageQuizScore(progress: MicroLearningProgress): number {
  const quizzes = progress.completions.filter((c) => c.quizScore !== undefined);
  if (quizzes.length === 0) return 0;
  const sum = quizzes.reduce((s, c) => s + (c.quizScore ?? 0), 0);
  return Math.round(sum / quizzes.length);
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

// ─── Byte-Sized Card Progress ────────────────────────────────────────────────
// Shares the same XP/streak system; byte completions stored separately.

const BYTE_STORAGE_KEY = 'byte-sized-progress';

export interface ByteSizedProgress {
  completedCards: Record<string, string>; // cardId → ISO date
  totalCards: number;
}

function defaultByteProgress(): ByteSizedProgress {
  return { completedCards: {}, totalCards: 0 };
}

export function loadByteProgress(): ByteSizedProgress {
  try {
    const raw = localStorage.getItem(BYTE_STORAGE_KEY);
    if (!raw) return defaultByteProgress();
    return JSON.parse(raw) as ByteSizedProgress;
  } catch {
    return defaultByteProgress();
  }
}

export function saveByteProgress(bp: ByteSizedProgress): void {
  try {
    localStorage.setItem(BYTE_STORAGE_KEY, JSON.stringify(bp));
  } catch { /* degrade silently */ }
}

export function completeByteCard(cardId: string): { xpEarned: number } {
  const bp = loadByteProgress();
  if (bp.completedCards[cardId]) return { xpEarned: 0 }; // already completed

  bp.completedCards[cardId] = new Date().toISOString();
  bp.totalCards = Object.keys(bp.completedCards).length;
  saveByteProgress(bp);

  // Award XP + contribute to streak via the shared progress store
  const progress = loadProgress();
  progress.totalXP += BYTE_XP;
  progress.lastActivityDate = todayISO();
  const updated = recalculateStreak(progress);
  saveProgress(updated);

  return { xpEarned: BYTE_XP };
}

export function isByteCardCompleted(cardId: string): boolean {
  return !!loadByteProgress().completedCards[cardId];
}

export function getByteConceptProgress(conceptId: string, totalCards: number): {
  completed: number;
  total: number;
  percent: number;
} {
  const bp = loadByteProgress();
  const prefix = `${conceptId}--`;
  const completed = Object.keys(bp.completedCards).filter(k => k.startsWith(prefix)).length;
  return {
    completed,
    total: totalCards,
    percent: totalCards > 0 ? Math.round((completed / totalCards) * 100) : 0,
  };
}

export function getByteCategoryProgress(conceptIds: string[], cardsPerConcept: number): {
  completed: number;
  total: number;
  percent: number;
} {
  const bp = loadByteProgress();
  let completed = 0;
  for (const cid of conceptIds) {
    const prefix = `${cid}--`;
    completed += Object.keys(bp.completedCards).filter(k => k.startsWith(prefix)).length;
  }
  const total = conceptIds.length * cardsPerConcept;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
