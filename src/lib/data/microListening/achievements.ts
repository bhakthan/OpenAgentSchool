// ─── Micro-Listening Achievements ────────────────────────────────────────────
// Listening-specific achievement definitions and unlock logic.

import type { ListeningAchievement, ListeningProfile } from './types';
import { getAllSeries } from './series';

// ─── Achievement Definitions ─────────────────────────────────────────────────

/** All available listening achievements. */
export const LISTENING_ACHIEVEMENTS: ListeningAchievement[] = [
  {
    id: 'first-listen',
    title: 'First Listen',
    description: 'Complete your first episode',
    icon: '🎧',
    category: 'milestone',
    condition: (p) => p.totalEpisodesCompleted >= 1,
  },
  {
    id: 'streak-3',
    title: 'Getting in Rhythm',
    description: 'Listen 3 days in a row',
    icon: '🔥',
    category: 'streak',
    condition: (p) => p.currentStreak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Listen 7 days in a row',
    icon: '⚡',
    category: 'streak',
    condition: (p) => p.currentStreak >= 7,
  },
  {
    id: 'streak-14',
    title: 'Fortnight Focus',
    description: 'Listen 14 days in a row',
    icon: '💪',
    category: 'streak',
    condition: (p) => p.currentStreak >= 14,
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: 'Listen 30 days in a row',
    icon: '👑',
    category: 'streak',
    condition: (p) => p.currentStreak >= 30,
  },
  {
    id: 'series-complete',
    title: 'Series Finisher',
    description: 'Complete all episodes in a series',
    icon: '🏆',
    category: 'series',
    condition: (p) => {
      const allSeries = getAllSeries();
      return allSeries.some((series) => {
        const seriesData = p.seriesProgress[series.id];
        if (!seriesData) return false;
        // Check if any level has all episodes completed
        return Object.values(seriesData).some(
          (count) => count !== undefined && count >= series.episodes.length,
        );
      });
    },
  },
  {
    id: 'ten-episodes',
    title: 'Double Digits',
    description: 'Complete 10 episodes',
    icon: '🔟',
    category: 'milestone',
    condition: (p) => p.totalEpisodesCompleted >= 10,
  },
  {
    id: 'fifty-episodes',
    title: 'Half Century',
    description: 'Complete 50 episodes',
    icon: '🎯',
    category: 'milestone',
    condition: (p) => p.totalEpisodesCompleted >= 50,
  },
  {
    id: 'hundred-minutes',
    title: 'Hundred Minutes Club',
    description: 'Listen for 100 minutes total',
    icon: '⏱️',
    category: 'milestone',
    condition: (p) => p.totalMinutesListened >= 100,
  },
  {
    id: 'audio-polymath',
    title: 'Audio Polymath',
    description: 'Listen to episodes from all 6 categories',
    icon: '🌍',
    category: 'explorer',
    condition: (p) => {
      const allSeries = getAllSeries();
      const categoriesWithProgress = new Set<string>();

      for (const [seriesId, data] of Object.entries(p.seriesProgress)) {
        const hasAny = Object.values(data).some((count) => count !== undefined && count > 0);
        if (hasAny) {
          const series = allSeries.find((s) => s.id === seriesId);
          if (series) categoriesWithProgress.add(series.category);
        }
      }

      return categoriesWithProgress.size >= 6;
    },
  },
  {
    id: 'deep-diver',
    title: 'Deep Diver',
    description: 'Listen to all 4 levels of a single topic',
    icon: '🤿',
    category: 'explorer',
    condition: (p) => {
      // Group episode progress by episodeId
      const byEpisode: Record<string, Set<string>> = {};
      for (const [key, progress] of Object.entries(p.episodeProgress)) {
        if (!progress.completed) continue;
        const [episodeId, level] = key.split(':');
        if (!byEpisode[episodeId]) byEpisode[episodeId] = new Set();
        byEpisode[episodeId].add(level);
      }

      // Check if any episode has all 4 levels completed
      return Object.values(byEpisode).some(
        (levels) =>
          levels.has('beginner') &&
          levels.has('intermediate') &&
          levels.has('advanced') &&
          levels.has('expert'),
      );
    },
  },
  {
    id: 'speed-listener',
    title: 'Speed Listener',
    description: 'This is a speed achievement, always return false for now',
    icon: '⚡',
    category: 'speed',
    condition: () => false,
  },
];

// ─── Check for newly unlocked achievements ──────────────────────────────────

/**
 * Returns achievements whose conditions are met but that are NOT yet
 * listed in `profile.unlockedAchievements`.
 */
export function checkNewAchievements(profile: ListeningProfile): ListeningAchievement[] {
  const unlocked = new Set(profile.unlockedAchievements);
  return LISTENING_ACHIEVEMENTS.filter(
    (achievement) => !unlocked.has(achievement.id) && achievement.condition(profile),
  );
}
