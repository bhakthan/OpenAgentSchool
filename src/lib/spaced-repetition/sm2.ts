export interface SM2CardState {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  dueAt: number;
}

export interface ReviewOutcome {
  quality: 0 | 1 | 2 | 3 | 4 | 5;
  reviewedAt?: number;
}

export const DEFAULT_SM2_STATE: SM2CardState = {
  repetitions: 0,
  intervalDays: 0,
  easeFactor: 2.5,
  dueAt: Date.now(),
};

export function applySM2Review(
  state: SM2CardState,
  outcome: ReviewOutcome
): SM2CardState {
  const now = outcome.reviewedAt ?? Date.now();
  const quality = outcome.quality;
  const next = { ...state };

  if (quality < 3) {
    next.repetitions = 0;
    next.intervalDays = 1;
  } else {
    if (next.repetitions === 0) next.intervalDays = 1;
    else if (next.repetitions === 1) next.intervalDays = 6;
    else next.intervalDays = Math.max(1, Math.round(next.intervalDays * next.easeFactor));
    next.repetitions += 1;
  }

  const newEase = next.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  next.easeFactor = Math.max(1.3, Number(newEase.toFixed(2)));
  next.dueAt = now + (next.intervalDays * 24 * 60 * 60 * 1000);
  return next;
}

export function shouldReviewNow(state: SM2CardState, now = Date.now()): boolean {
  return state.dueAt <= now;
}

