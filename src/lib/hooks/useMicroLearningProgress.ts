// ─── useMicroLearningProgress ────────────────────────────────────────────────
// React hook providing real-time progress state with automatic re-computation
// when capsules are completed.  This is the canonical integration point for all
// components that need micro-learning progress data.

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  loadProgress,
  completeCapsule as rawCompleteCapsule,
  getTrackProgress as rawTrackProgress,
  getDailyProgress as rawDailyProgress,
  getStats as rawStats,
  setDailyGoal as rawSetDailyGoal,
  saveRoleProfile as rawSaveRoleProfile,
  getRoleProfile,
  isCapsuleCompleted,
} from '@/lib/data/microLearning/progress';
import { TRACKS } from '@/lib/data/microLearning/tracks';
import type { CapsuleType, RoleProfile, MicroLearningProgress } from '@/lib/data/microLearning/types';
import { checkAndUnlockAchievements } from './microLearningAchievements';
import { scheduleMicroLearningSync, mergeOnLogin } from '@/lib/sync/microLearningSync';
import { registerCapsuleForReview, processReview, quizScoreToQuality } from '@/lib/data/microLearning/spacedRepetition';

/**
 * Central hook — call once in <MicroLearningPage> and pass sub-state down.
 * Every mutating action bumps a revision counter to trigger re-renders.
 */
export function useMicroLearningProgress() {
  const [revision, setRevision] = useState(0);
  const bump = useCallback(() => setRevision((r) => r + 1), []);

  // ── Derived state (recalculated on every revision) ─────────────────────
  const progress = useMemo(() => loadProgress(), [revision]);
  const daily = useMemo(() => rawDailyProgress(), [revision]);
  const stats = useMemo(() => rawStats(), [revision]);
  const roleProfile = useMemo(() => getRoleProfile(), [revision]);

  const activeTracks = useMemo(() => {
    return TRACKS.map((t) => ({
      track: t,
      progress: rawTrackProgress(t.id),
    })).filter((tp) => tp.progress.completed > 0);
  }, [revision]);

  const isReturning = progress.completions.length > 0;

  // ── Mutation: complete a capsule ───────────────────────────────────────
  const completeCapsule = useCallback(
    (capsuleId: string, capsuleType: CapsuleType, quizScore?: number) => {
      const updated = rawCompleteCapsule(capsuleId, capsuleType, quizScore);
      const lastCompletion = updated.completions[updated.completions.length - 1];
      const xpEarned = lastCompletion?.xpEarned ?? 0;

      // Check for newly unlocked achievements
      const newAchievements = checkAndUnlockAchievements(updated);

      // Register capsule for spaced repetition review
      registerCapsuleForReview(capsuleId);
      // If quiz, auto-record quality from score for initial scheduling
      if (quizScore != null) {
        processReview(capsuleId, quizScoreToQuality(quizScore));
      }

      // Schedule background sync to backend
      scheduleMicroLearningSync();

      bump();
      return { xpEarned, newAchievements, progress: updated };
    },
    [bump],
  );

  // ── Mutation: set daily goal ───────────────────────────────────────────
  const setDailyGoal = useCallback(
    (goal: number) => {
      rawSetDailyGoal(goal);
      scheduleMicroLearningSync();
      bump();
    },
    [bump],
  );

  // ── Mutation: save role profile ────────────────────────────────────────
  const saveRoleProfile = useCallback(
    (profile: RoleProfile) => {
      rawSaveRoleProfile(profile);
      scheduleMicroLearningSync();
      bump();
    },
    [bump],
  );

  // ── Query: track progress ─────────────────────────────────────────────
  const getTrackProgress = useCallback(
    (trackId: string) => rawTrackProgress(trackId),
    [revision],
  );

  // ── Login merge: pull remote → merge → push ────────────────────────────
  useEffect(() => {
    mergeOnLogin().then(() => bump()).catch(() => {});
    // Run once on mount; mergeOnLogin guards against !authenticated internally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // State
    progress,
    daily,
    stats,
    roleProfile,
    activeTracks,
    isReturning,
    // Mutations
    completeCapsule,
    setDailyGoal,
    saveRoleProfile,
    // Queries
    getTrackProgress,
    isCapsuleCompleted,
  };
}

export type MicroLearningHook = ReturnType<typeof useMicroLearningProgress>;
