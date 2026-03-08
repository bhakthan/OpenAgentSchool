// ─── useMicroListeningProgress ───────────────────────────────────────────────
// React hook providing reactive micro-listening progress state.
// Follows the same mutation-bump pattern used by useMicroLearningProgress.

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  getListeningProfile,
  saveListeningProfile,
  markEpisodeProgress as rawMarkProgress,
  markEpisodeComplete as rawMarkComplete,
  updateDailyGoal as rawUpdateDailyGoal,
  getSeriesCompletionPercent as rawGetSeriesCompletion,
  resetProgress as rawResetProgress,
} from '@/lib/data/microListening/progress';
import { checkNewAchievements } from '@/lib/data/microListening/achievements';
import { mergeListeningOnLogin, scheduleMicroListeningSync } from '@/lib/sync/microListeningSync';
import type {
  ListeningProfile,
  ListeningLevel,
  QueueMode,
} from '@/lib/data/microListening/types';

/**
 * Central hook for micro-listening progress. Call once in a top-level
 * listening component and pass sub-state down via props or context.
 *
 * Every mutation bumps a revision counter to trigger re-renders.
 */
export function useMicroListeningProgress() {
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((t) => t + 1), []);

  // ── Derived state (recalculated on every tick) ─────────────────────────
  const profile: ListeningProfile = useMemo(() => getListeningProfile(), [revision]);

  useEffect(() => {
    mergeListeningOnLogin().then(() => refresh()).catch(() => {});
  }, [refresh]);

  // ── Mutations ─────────────────────────────────────────────────────────

  /** Update playback position and accumulated listen duration. */
  const markProgress = useCallback(
    (episodeId: string, level: ListeningLevel, position: number, duration: number) => {
      rawMarkProgress(episodeId, level, position, duration);
      scheduleMicroListeningSync();
      refresh();
    },
    [refresh],
  );

  /** Mark an episode+level as completed. */
  const markComplete = useCallback(
    (episodeId: string, level: ListeningLevel) => {
      rawMarkComplete(episodeId, level);
      const current = getListeningProfile();
      const newAchievements = checkNewAchievements(current);
      if (newAchievements.length > 0) {
        current.unlockedAchievements = [...new Set([...current.unlockedAchievements, ...newAchievements.map((a) => a.id)])];
        saveListeningProfile(current);
      }
      scheduleMicroListeningSync();
      refresh();
      return newAchievements;
    },
    [refresh],
  );

  /** Add minutes to today's listening goal progress. */
  const updateGoal = useCallback(
    (minutes: number) => {
      rawUpdateDailyGoal(minutes);
      scheduleMicroListeningSync();
      refresh();
    },
    [refresh],
  );

  /** Change the user's preferred listening level. */
  const setPreferredLevel = useCallback(
    (level: ListeningLevel) => {
      const current = getListeningProfile();
      current.preferredLevel = level;
      saveListeningProfile(current);
      scheduleMicroListeningSync();
      refresh();
    },
    [refresh],
  );

  /** Change the daily listening goal (in minutes). */
  const setDailyGoalMinutes = useCallback(
    (minutes: number) => {
      const current = getListeningProfile();
      current.dailyGoalMinutes = Math.max(1, Math.min(60, minutes));
      saveListeningProfile(current);
      scheduleMicroListeningSync();
      refresh();
    },
    [refresh],
  );

  /** Change the queue playback mode. */
  const setQueueMode = useCallback(
    (mode: QueueMode) => {
      const current = getListeningProfile();
      current.queueMode = mode;
      saveListeningProfile(current);
      scheduleMicroListeningSync();
      refresh();
    },
    [refresh],
  );

  /** Clear all listening progress. */
  const resetProgress = useCallback(() => {
    rawResetProgress();
    refresh();
  }, [refresh]);

  /** Get completion percentage for a series at a given level. */
  const getSeriesCompletion = useCallback(
    (seriesId: string, level: ListeningLevel, totalEpisodes: number) =>
      rawGetSeriesCompletion(seriesId, level, totalEpisodes),
    [],
  );

  return {
    profile,
    markProgress,
    markComplete,
    updateGoal,
    setPreferredLevel,
    setDailyGoalMinutes,
    setQueueMode,
    resetProgress,
    getSeriesCompletion,
  };
}

export type MicroListeningHook = ReturnType<typeof useMicroListeningProgress>;
