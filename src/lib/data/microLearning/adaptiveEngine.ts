// ─── Adaptive Difficulty Engine ──────────────────────────────────────────────
// Analyses learner behaviour and quiz performance to dynamically adjust which
// capsules and tracks are recommended, and at what difficulty.
//
// Three responsibility areas:
//  1.  Performance profiling — rolling averages of quiz scores, completion speed.
//  2.  Difficulty adjustment — suggest easier / harder capsules based on profile.
//  3.  Smart recommendations — next-best capsule/track prioritization.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  CapsuleCompletion,
  MicroLearningProgress,
  TrackDifficulty,
} from './types';
import { ALL_CAPSULES } from './capsules';
import { TRACKS } from './tracks';
import { getDueReviews, type ReviewCard } from './spacedRepetition';

// ─── Performance Profile ─────────────────────────────────────────────────────

export interface PerformanceProfile {
  /** Rolling average quiz score (0 – 100) over last N quiz completions */
  avgQuizScore: number;
  /** Number of quiz-checkpoint capsules completed */
  quizCount: number;
  /** Completion velocity — capsules per day (7-day rolling avg) */
  velocity: number;
  /** Derived difficulty comfort zone */
  comfortZone: TrackDifficulty;
  /** Derived stretch zone (next tier up from comfort) */
  stretchZone: TrackDifficulty;
}

const ROLLING_WINDOW = 10; // last 10 quizzes for average
const VELOCITY_DAYS = 7;   // rolling window for velocity

/**
 * Compute performance profile from current progress.
 */
export function computePerformanceProfile(
  progress: MicroLearningProgress,
): PerformanceProfile {
  const quizCompletions = progress.completions.filter((c) => c.quizScore != null);
  const recentQuizzes = quizCompletions.slice(-ROLLING_WINDOW);
  const avgQuizScore =
    recentQuizzes.length > 0
      ? recentQuizzes.reduce((s, c) => s + (c.quizScore ?? 0), 0) / recentQuizzes.length
      : 0;

  const velocity = computeVelocity(progress.completions);

  const comfortZone = inferComfortZone(avgQuizScore, progress.completions.length);
  const stretchZone = nextDifficulty(comfortZone);

  return {
    avgQuizScore: Math.round(avgQuizScore * 10) / 10,
    quizCount: quizCompletions.length,
    velocity: Math.round(velocity * 10) / 10,
    comfortZone,
    stretchZone,
  };
}

// ─── Smart Capsule Recommendations ──────────────────────────────────────────

export interface CapsuleRecommendation {
  capsuleId: string;
  /** Why this capsule is recommended */
  reason: RecommendationReason;
  /** Priority score 0 – 100 (higher = more urgent) */
  priority: number;
}

export type RecommendationReason =
  | 'review-due'      // Spaced repetition review scheduled
  | 'next-in-track'   // Logical next step in an active track
  | 'comfort-zone'    // Matches current difficulty comfort zone
  | 'stretch-challenge' // One tier above comfort to promote growth
  | 'struggling-retry' // Low quiz score — retry encouraged
  | 'fresh-start';    // New track/concept with no progress

/**
 * Produce a prioritised list of recommended capsules.
 * Factors: spaced repetition due > continue active track > comfort match > stretch.
 */
export function getRecommendations(
  progress: MicroLearningProgress,
  limit = 5,
): CapsuleRecommendation[] {
  const completed = new Set(progress.completions.map((c) => c.capsuleId));
  const profile = computePerformanceProfile(progress);
  const dueReviews = getDueReviews();
  const results: CapsuleRecommendation[] = [];

  // 1. Spaced repetition reviews (highest priority)
  for (const card of dueReviews.slice(0, 3)) {
    results.push({
      capsuleId: card.capsuleId,
      reason: 'review-due',
      priority: 95 - results.length, // slight decay for ordering
    });
  }

  // 2. Low-score retries (scored < 60% on last attempt)
  const retryTargets = getStrugglingCapsules(progress);
  for (const capsuleId of retryTargets.slice(0, 2)) {
    if (!results.some((r) => r.capsuleId === capsuleId)) {
      results.push({
        capsuleId,
        reason: 'struggling-retry',
        priority: 80,
      });
    }
  }

  // 3. Next capsule in each active track
  for (const track of TRACKS) {
    const trackCapsules = ALL_CAPSULES.filter((c) =>
      c.conceptId && track.conceptIds.includes(c.conceptId),
    ).sort((a, b) => a.order - b.order);

    const nextIncomplete = trackCapsules.find((c) => !completed.has(c.id));
    if (nextIncomplete && !results.some((r) => r.capsuleId === nextIncomplete.id)) {
      const isActive = trackCapsules.some((c) => completed.has(c.id));
      results.push({
        capsuleId: nextIncomplete.id,
        reason: isActive ? 'next-in-track' : 'fresh-start',
        priority: isActive ? 70 : 30,
      });
    }
  }

  // 4. Difficulty-matched capsules from untouched tracks
  const untouchedComfort = ALL_CAPSULES.filter(
    (c) =>
      !completed.has(c.id) &&
      !results.some((r) => r.capsuleId === c.id) &&
      getDifficultyForCapsule(c.conceptId) === profile.comfortZone,
  );
  for (const cap of untouchedComfort.slice(0, 2)) {
    results.push({
      capsuleId: cap.id,
      reason: 'comfort-zone',
      priority: 50,
    });
  }

  // 5. Stretch challenges
  const stretchCapsules = ALL_CAPSULES.filter(
    (c) =>
      !completed.has(c.id) &&
      !results.some((r) => r.capsuleId === c.id) &&
      getDifficultyForCapsule(c.conceptId) === profile.stretchZone,
  );
  for (const cap of stretchCapsules.slice(0, 2)) {
    results.push({
      capsuleId: cap.id,
      reason: 'stretch-challenge',
      priority: 40,
    });
  }

  // Sort by priority descending and trim
  return results.sort((a, b) => b.priority - a.priority).slice(0, limit);
}

// ─── Track Recommendations ──────────────────────────────────────────────────

export interface TrackRecommendation {
  trackId: string;
  reason: string;
  match: 'perfect' | 'stretch' | 'foundation';
}

/**
 * Rank tracks by fit for the learner's current performance profile.
 */
export function getTrackRecommendations(
  progress: MicroLearningProgress,
): TrackRecommendation[] {
  const profile = computePerformanceProfile(progress);
  const completed = new Set(progress.completions.map((c) => c.capsuleId));

  return TRACKS.map((track) => {
    const trackCaps = ALL_CAPSULES.filter(
      (c) => c.conceptId && track.conceptIds.includes(c.conceptId),
    );
    const completionRatio = trackCaps.filter((c) => completed.has(c.id)).length / Math.max(trackCaps.length, 1);

    let match: TrackRecommendation['match'];
    let reason: string;

    if (track.difficulty === profile.comfortZone) {
      match = 'perfect';
      reason =
        completionRatio > 0
          ? `Continue your progress (${Math.round(completionRatio * 100)}% done)`
          : 'Matches your current skill level perfectly';
    } else if (track.difficulty === profile.stretchZone) {
      match = 'stretch';
      reason = 'Ready for a challenge — push to the next level';
    } else if (DIFFICULTY_ORDER.indexOf(track.difficulty) < DIFFICULTY_ORDER.indexOf(profile.comfortZone)) {
      match = 'foundation';
      reason = 'Strengthen fundamentals — quick win';
    } else {
      match = 'stretch';
      reason = 'Ambitious — great for long-term growth';
    }

    return { trackId: track.id, reason, match };
  }).sort((a, b) => {
    const order = { perfect: 0, stretch: 1, foundation: 2 };
    return order[a.match] - order[b.match];
  });
}

// ─── Difficulty Inference ────────────────────────────────────────────────────

const DIFFICULTY_ORDER: TrackDifficulty[] = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
];

function inferComfortZone(
  avgQuiz: number,
  totalCompletions: number,
): TrackDifficulty {
  if (totalCompletions < 5) return 'beginner'; // not enough data
  if (avgQuiz >= 85) return 'advanced';
  if (avgQuiz >= 70) return 'intermediate';
  return 'beginner';
}

function nextDifficulty(current: TrackDifficulty): TrackDifficulty {
  const idx = DIFFICULTY_ORDER.indexOf(current);
  return DIFFICULTY_ORDER[Math.min(idx + 1, DIFFICULTY_ORDER.length - 1)];
}

function getDifficultyForCapsule(conceptId: string): TrackDifficulty {
  const track = TRACKS.find((t) => t.conceptIds.includes(conceptId));
  return track?.difficulty ?? 'intermediate';
}

// ─── Struggling Capsules ─────────────────────────────────────────────────────

/**
 * Capsules where the most recent quiz score was < 60.
 */
function getStrugglingCapsules(progress: MicroLearningProgress): string[] {
  const latestScores = new Map<string, number>();
  for (const c of progress.completions) {
    if (c.quizScore != null) {
      latestScores.set(c.capsuleId, c.quizScore);
    }
  }
  return [...latestScores.entries()]
    .filter(([, score]) => score < 60)
    .map(([id]) => id);
}

// ─── Velocity Computation ────────────────────────────────────────────────────

function computeVelocity(completions: CapsuleCompletion[]): number {
  if (completions.length === 0) return 0;
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - VELOCITY_DAYS);
  const recentCount = completions.filter(
    (c) => c.completedAt >= cutoff.toISOString(),
  ).length;
  return recentCount / VELOCITY_DAYS;
}
