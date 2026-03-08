/**
 * Cognitive Lab — localStorage-backed progress tracking
 * Scoped under oas.cognitivelab.v1
 */

import type { CognitiveParadigmId, CognitiveParadigmProgress, CognitiveSessionResult } from './types';
import { COGNITIVE_PARADIGMS } from './paradigms';

const STORAGE_KEY = 'oas.cognitivelab.v1';

interface CognitiveLabProgressData {
  paradigms: Record<string, CognitiveParadigmProgress>;
  /** Ephemeral exercise IDs that have been burned (no re-attempt) */
  burnedEphemerals: string[];
}

function load(): CognitiveLabProgressData {
  if (typeof window === 'undefined') return { paradigms: {}, burnedEphemerals: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { paradigms: {}, burnedEphemerals: [] };
  } catch {
    return { paradigms: {}, burnedEphemerals: [] };
  }
}

function save(data: CognitiveLabProgressData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Read ─────────────────────────────────────────────────────────────────────

export function getParadigmProgress(paradigmId: CognitiveParadigmId): CognitiveParadigmProgress | null {
  const data = load();
  return data.paradigms[paradigmId] ?? null;
}

export function getSessionResult(paradigmId: CognitiveParadigmId, exerciseId: string): CognitiveSessionResult | null {
  const prog = getParadigmProgress(paradigmId);
  return prog?.completedExercises[exerciseId] ?? null;
}

export function getLabScore(): number {
  const data = load();
  let totalPercent = 0;
  let count = 0;
  for (const pp of Object.values(data.paradigms)) {
    for (const result of Object.values(pp.completedExercises)) {
      if (result.maxScore > 0) {
        totalPercent += (result.score / result.maxScore) * 100;
        count++;
      }
    }
  }
  return count === 0 ? 0 : Math.round(totalPercent / count);
}

export function getCompletedCount(): number {
  const data = load();
  let count = 0;
  for (const pp of Object.values(data.paradigms)) {
    count += Object.keys(pp.completedExercises).length;
  }
  return count;
}

export function getTotalCount(): number {
  return COGNITIVE_PARADIGMS
    .filter(p => !p.isComingSoon)
    .reduce((sum, p) => sum + p.exercises.length, 0);
}

export function getParadigmCompletionPercent(paradigmId: CognitiveParadigmId): number {
  const paradigm = COGNITIVE_PARADIGMS.find(p => p.id === paradigmId);
  if (!paradigm || paradigm.isComingSoon) return 0;
  const prog = getParadigmProgress(paradigmId);
  if (!prog) return 0;
  const done = Object.keys(prog.completedExercises).length;
  return Math.round((done / paradigm.exercises.length) * 100);
}

export function isEphemeralBurned(exerciseId: string): boolean {
  const data = load();
  return data.burnedEphemerals.includes(exerciseId);
}

// ── Write ────────────────────────────────────────────────────────────────────

export function completeSession(
  paradigmId: CognitiveParadigmId,
  exerciseId: string,
  score: number,
  maxScore: number,
): CognitiveSessionResult {
  const data = load();
  const now = new Date().toISOString();

  if (!data.paradigms[paradigmId]) {
    data.paradigms[paradigmId] = { completedExercises: {} };
  }

  const result: CognitiveSessionResult = {
    exerciseId,
    paradigmId,
    score,
    maxScore,
    completedAt: now,
  };

  data.paradigms[paradigmId].completedExercises[exerciseId] = result;
  save(data);
  return result;
}

export function burnEphemeral(exerciseId: string): void {
  const data = load();
  if (!data.burnedEphemerals.includes(exerciseId)) {
    data.burnedEphemerals.push(exerciseId);
    save(data);
  }
}

export function resetLabProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
