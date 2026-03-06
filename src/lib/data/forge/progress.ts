/**
 * The Forge — localStorage-backed progress tracking
 *
 * Parallel to src/lib/trackProgress.ts but scoped to Forge exercises.
 * Supports: discipline-level progress, exercise completion with scoring,
 * aggregate Forge Score, and unlock progression.
 */

import type { ForgeDisciplineId, ForgeDisciplineProgress, ForgeExerciseResult } from './types';
import { FORGE_DISCIPLINES } from './disciplines';

const STORAGE_KEY = 'oas.forge.v1';

interface ForgeProgressData {
  disciplines: Record<string, ForgeDisciplineProgress>;
}

function load(): ForgeProgressData {
  if (typeof window === 'undefined') return { disciplines: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { disciplines: {} };
  } catch {
    return { disciplines: {} };
  }
}

function save(data: ForgeProgressData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Read ─────────────────────────────────────────────────────────────────────

export function getForgeProgress(disciplineId: ForgeDisciplineId): ForgeDisciplineProgress | null {
  const data = load();
  return data.disciplines[disciplineId] ?? null;
}

export function getExerciseResult(disciplineId: ForgeDisciplineId, exerciseId: string): ForgeExerciseResult | null {
  const prog = getForgeProgress(disciplineId);
  return prog?.completedExercises[exerciseId] ?? null;
}

/**
 * Aggregate Forge Score: average of all completed exercise scores (0-100 scale).
 */
export function getForgeScore(): number {
  const data = load();
  let totalPercent = 0;
  let count = 0;
  for (const dp of Object.values(data.disciplines)) {
    for (const result of Object.values(dp.completedExercises)) {
      if (result.maxScore > 0) {
        totalPercent += (result.score / result.maxScore) * 100;
        count++;
      }
    }
  }
  return count === 0 ? 0 : Math.round(totalPercent / count);
}

/**
 * Count of completed exercises across all disciplines.
 */
export function getForgeCompletedCount(): number {
  const data = load();
  let count = 0;
  for (const dp of Object.values(data.disciplines)) {
    count += Object.keys(dp.completedExercises).length;
  }
  return count;
}

/**
 * Total exercises across all disciplines.
 */
export function getForgeTotalCount(): number {
  return FORGE_DISCIPLINES.reduce((sum, d) => sum + d.exercises.length, 0);
}

/**
 * Discipline-level completion percentage (0-100).
 */
export function getDisciplineCompletionPercent(disciplineId: ForgeDisciplineId): number {
  const discipline = FORGE_DISCIPLINES.find(d => d.id === disciplineId);
  if (!discipline) return 0;
  const prog = getForgeProgress(disciplineId);
  if (!prog) return 0;
  const done = Object.keys(prog.completedExercises).length;
  return Math.round((done / discipline.exercises.length) * 100);
}

/**
 * Unlock progression: Epistemic Gym must have ≥1 completed exercise
 * before other disciplines are "unlocked". Returns all disciplines
 * that are accessible.
 */
export function getUnlockedDisciplines(): ForgeDisciplineId[] {
  const unlocked: ForgeDisciplineId[] = ['epistemic-gym']; // always available
  const gymProg = getForgeProgress('epistemic-gym');
  const gymDone = gymProg ? Object.keys(gymProg.completedExercises).length : 0;
  if (gymDone >= 1) {
    unlocked.push('socratic-defense', 'prompt-autopsies', 'trust-calibration');
  }
  return unlocked;
}

// ── Write ────────────────────────────────────────────────────────────────────

export function completeExercise(
  disciplineId: ForgeDisciplineId,
  exerciseId: string,
  score: number,
  maxScore: number,
  feedback?: string,
): ForgeExerciseResult {
  const data = load();
  const now = new Date().toISOString();

  if (!data.disciplines[disciplineId]) {
    data.disciplines[disciplineId] = {
      disciplineId,
      completedExercises: {},
      lastActivityAt: now,
    };
  }

  const result: ForgeExerciseResult = {
    exerciseId,
    disciplineId,
    score,
    maxScore,
    completedAt: now,
    feedback,
  };

  data.disciplines[disciplineId].completedExercises[exerciseId] = result;
  data.disciplines[disciplineId].lastActivityAt = now;
  save(data);
  return result;
}

export function resetForgeProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function resetDisciplineProgress(disciplineId: ForgeDisciplineId): void {
  const data = load();
  delete data.disciplines[disciplineId];
  save(data);
}
