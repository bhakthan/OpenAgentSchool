import { describe, expect, it } from 'vitest';
import { applySM2Review, DEFAULT_SM2_STATE, shouldReviewNow } from '@/lib/spaced-repetition/sm2';

describe('SM-2 engine', () => {
  it('advances interval on strong recall', () => {
    const reviewedAt = 1_700_000_000_000;
    const first = applySM2Review(DEFAULT_SM2_STATE, { quality: 5, reviewedAt });
    const second = applySM2Review(first, { quality: 5, reviewedAt: reviewedAt + 1000 });
    expect(first.intervalDays).toBe(1);
    expect(second.intervalDays).toBe(6);
  });

  it('resets repetitions on failed recall', () => {
    const state = {
      repetitions: 3,
      intervalDays: 12,
      easeFactor: 2.4,
      dueAt: Date.now(),
    };
    const next = applySM2Review(state, { quality: 2 });
    expect(next.repetitions).toBe(0);
    expect(next.intervalDays).toBe(1);
  });

  it('detects due cards', () => {
    expect(shouldReviewNow({ ...DEFAULT_SM2_STATE, dueAt: Date.now() - 1000 })).toBe(true);
    expect(shouldReviewNow({ ...DEFAULT_SM2_STATE, dueAt: Date.now() + 60_000 })).toBe(false);
  });
});

