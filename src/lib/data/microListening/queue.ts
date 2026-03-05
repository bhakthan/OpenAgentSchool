// ─── Micro-Listening Queue Engine ────────────────────────────────────────────
// Smart queue generation: daily mixes, deep-series progression, review replays,
// and recommendation logic.

import type {
  ListeningProfile,
  ListeningLevel,
  ListeningEpisode,
  DailyPlaylist,
  SeriesCategory,
} from './types';
import { getListeningProfile } from './progress';
import { getAllEpisodes, getAllSeries, getSeries } from './series';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Simple deterministic hash for strings. */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysAgo(isoDate: string): number {
  const now = new Date();
  const then = new Date(isoDate + 'T00:00:00');
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

const ALL_CATEGORIES: SeriesCategory[] = [
  'core-concepts',
  'agent-patterns',
  'agents-for-science',
  'ai-science-factory',
  'adoption-playbook',
  'applied-ai-skills',
];

// ─── Concept of the Day ─────────────────────────────────────────────────────

/**
 * Returns a deterministic "concept of the day" episode based on the date string.
 * @param date — YYYY-MM-DD, defaults to today
 */
export function getConceptOfTheDay(date?: string): ListeningEpisode | undefined {
  const dateStr = date ?? todayISO();
  const episodes = getAllEpisodes();
  if (episodes.length === 0) return undefined;
  const index = simpleHash(dateStr) % episodes.length;
  return episodes[index];
}

// ─── Daily Mix ──────────────────────────────────────────────────────────────

/**
 * Creates a ~5-minute daily playlist:
 * 1. Concept of the day
 * 2. An unfinished episode from the user's most recent series
 * 3. An episode from an underexplored category
 * 4. A review episode (completed >7 days ago) if space remains
 */
export function generateDailyMix(profile: ListeningProfile): DailyPlaylist {
  const date = todayISO();
  const level = profile.preferredLevel;
  const targetSeconds = (profile.dailyGoalMinutes || 5) * 60;

  const conceptOfTheDay = getConceptOfTheDay(date);
  const selected: { episodeId: string; level: ListeningLevel }[] = [];
  const usedIds = new Set<string>();
  let totalSeconds = 0;

  // Helper: try to add an episode
  const tryAdd = (ep: ListeningEpisode | undefined) => {
    if (!ep || usedIds.has(ep.id) || totalSeconds >= targetSeconds) return;
    usedIds.add(ep.id);
    selected.push({ episodeId: ep.id, level });
    totalSeconds += ep.durationEstimate;
  };

  // 1. Concept of the day
  tryAdd(conceptOfTheDay);

  // 2. Unfinished episode from most recent series
  const recentSeries = findMostRecentSeries(profile);
  if (recentSeries) {
    const series = getSeries(recentSeries);
    if (series) {
      const unfinished = series.episodes.find((ep) => {
        const key = `${ep.id}:${level}`;
        return !profile.episodeProgress[key]?.completed;
      });
      tryAdd(unfinished);
    }
  }

  // 3. Episode from underexplored category
  const underexplored = findUnderexploredCategory(profile);
  if (underexplored) {
    const categorySeries = getAllSeries().filter((s) => s.category === underexplored);
    for (const series of categorySeries) {
      const unfinished = series.episodes.find((ep) => {
        const key = `${ep.id}:${level}`;
        return !profile.episodeProgress[key]?.completed && !usedIds.has(ep.id);
      });
      if (unfinished) {
        tryAdd(unfinished);
        break;
      }
    }
  }

  // 4. Review episode if space remains
  if (totalSeconds < targetSeconds) {
    const reviewEps = getReviewCandidates(profile);
    for (const ep of reviewEps) {
      if (totalSeconds >= targetSeconds) break;
      tryAdd(ep);
    }
  }

  const themeParts: string[] = [];
  if (conceptOfTheDay) themeParts.push(conceptOfTheDay.title);
  if (underexplored) themeParts.push(`${underexplored} exploration`);
  const theme = themeParts.length > 0
    ? `Today: ${themeParts.join(' + ')}`
    : 'Your daily listening mix';

  return {
    date,
    episodes: selected,
    theme,
    estimatedMinutes: Math.round(totalSeconds / 60),
    conceptOfTheDay: conceptOfTheDay?.id,
  };
}

// ─── Deep Series Queue ──────────────────────────────────────────────────────

/**
 * Returns ordered episode IDs for sequential listening through a series,
 * starting from the first uncompleted episode at the given level.
 */
export function generateDeepSeriesQueue(
  seriesId: string,
  level: ListeningLevel,
  profile: ListeningProfile,
): string[] {
  const series = getSeries(seriesId);
  if (!series) return [];

  const sorted = [...series.episodes].sort((a, b) => a.seriesOrder - b.seriesOrder);
  const firstUncompleted = sorted.findIndex((ep) => {
    const key = `${ep.id}:${level}`;
    return !profile.episodeProgress[key]?.completed;
  });

  // If all completed, return entire series (for re-listen)
  const startIndex = firstUncompleted >= 0 ? firstUncompleted : 0;
  return sorted.slice(startIndex).map((ep) => ep.id);
}

// ─── Review Queue ───────────────────────────────────────────────────────────

/**
 * Returns episodes completed more than 7 days ago, sorted oldest-first
 * (spaced repetition priority).
 */
export function generateReviewQueue(profile: ListeningProfile): string[] {
  return getReviewCandidates(profile).map((ep) => ep.id);
}

function getReviewCandidates(profile: ListeningProfile): ListeningEpisode[] {
  const candidates: { episode: ListeningEpisode; completedAt: string }[] = [];

  for (const [, progress] of Object.entries(profile.episodeProgress)) {
    if (progress.completed && progress.completedAt) {
      const age = daysAgo(progress.completedAt.slice(0, 10));
      if (age >= 7) {
        const episode = getAllEpisodes().find((e) => e.id === progress.episodeId);
        if (episode) {
          candidates.push({ episode, completedAt: progress.completedAt });
        }
      }
    }
  }

  // Sort oldest first
  candidates.sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  return candidates.map((c) => c.episode);
}

// ─── Next Episode ───────────────────────────────────────────────────────────

/**
 * Gets the next episode to play based on queue mode.
 * - deep-series: next in the current series
 * - daily-mix: next in today's playlist
 * - review-replay: next review candidate
 */
export function getNextEpisode(
  currentEpisodeId: string,
  profile: ListeningProfile,
): string | undefined {
  if (profile.queueMode === 'deep-series') {
    // Find the series containing the current episode, then return the next one
    for (const series of getAllSeries()) {
      const sorted = [...series.episodes].sort((a, b) => a.seriesOrder - b.seriesOrder);
      const currentIndex = sorted.findIndex((ep) => ep.id === currentEpisodeId);
      if (currentIndex >= 0 && currentIndex < sorted.length - 1) {
        return sorted[currentIndex + 1].id;
      }
    }
    return undefined;
  }

  if (profile.queueMode === 'daily-mix') {
    const playlist = generateDailyMix(profile);
    const idx = playlist.episodes.findIndex((e) => e.episodeId === currentEpisodeId);
    if (idx >= 0 && idx < playlist.episodes.length - 1) {
      return playlist.episodes[idx + 1].episodeId;
    }
    return undefined;
  }

  if (profile.queueMode === 'review-replay') {
    const reviewQueue = generateReviewQueue(profile);
    const idx = reviewQueue.indexOf(currentEpisodeId);
    if (idx >= 0 && idx < reviewQueue.length - 1) {
      return reviewQueue[idx + 1];
    }
    return undefined;
  }

  // Fallback: use explicit queue
  const queueIdx = profile.queue.indexOf(currentEpisodeId);
  if (queueIdx >= 0 && queueIdx < profile.queue.length - 1) {
    return profile.queue[queueIdx + 1];
  }
  return undefined;
}

// ─── Smart Recommendations ──────────────────────────────────────────────────

/**
 * Returns recommended episodes based on:
 * 1. Uncompleted episodes in started series
 * 2. Episodes from underexplored categories
 * 3. Level-appropriate content
 */
export function getSmartRecommendations(
  profile: ListeningProfile,
  count: number = 5,
): ListeningEpisode[] {
  const level = profile.preferredLevel;
  const results: ListeningEpisode[] = [];
  const usedIds = new Set<string>();

  // 1. Uncompleted episodes in started series
  for (const seriesId of Object.keys(profile.seriesProgress)) {
    const series = getSeries(seriesId);
    if (!series) continue;
    for (const ep of series.episodes) {
      if (usedIds.has(ep.id)) continue;
      const key = `${ep.id}:${level}`;
      if (!profile.episodeProgress[key]?.completed) {
        results.push(ep);
        usedIds.add(ep.id);
        if (results.length >= count) return results;
      }
    }
  }

  // 2. Episodes from underexplored categories
  const categoryCounts = getCategoryCounts(profile);
  const sortedCategories = ALL_CATEGORIES.slice().sort(
    (a, b) => (categoryCounts[a] ?? 0) - (categoryCounts[b] ?? 0),
  );

  for (const cat of sortedCategories) {
    const series = getAllSeries().filter((s) => s.category === cat);
    for (const s of series) {
      for (const ep of s.episodes) {
        if (usedIds.has(ep.id)) continue;
        const key = `${ep.id}:${level}`;
        if (!profile.episodeProgress[key]?.completed && ep.levels.includes(level)) {
          results.push(ep);
          usedIds.add(ep.id);
          if (results.length >= count) return results;
        }
      }
    }
  }

  // 3. Any remaining uncompleted level-appropriate episodes
  for (const ep of getAllEpisodes()) {
    if (usedIds.has(ep.id)) continue;
    const key = `${ep.id}:${level}`;
    if (!profile.episodeProgress[key]?.completed && ep.levels.includes(level)) {
      results.push(ep);
      usedIds.add(ep.id);
      if (results.length >= count) return results;
    }
  }

  return results;
}

// ─── Internal Helpers ───────────────────────────────────────────────────────

function findMostRecentSeries(profile: ListeningProfile): string | undefined {
  let mostRecent: string | undefined;
  let mostRecentDate = '';

  for (const [key, progress] of Object.entries(profile.episodeProgress)) {
    if (progress.completedAt && progress.completedAt > mostRecentDate) {
      mostRecentDate = progress.completedAt;
      // Find the series this episode belongs to
      const episodeId = key.split(':')[0];
      for (const series of getAllSeries()) {
        if (series.episodes.some((ep) => ep.id === episodeId)) {
          mostRecent = series.id;
          break;
        }
      }
    }
  }

  return mostRecent;
}

function getCategoryCounts(profile: ListeningProfile): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const cat of ALL_CATEGORIES) counts[cat] = 0;

  for (const [key, progress] of Object.entries(profile.episodeProgress)) {
    if (!progress.completed) continue;
    const episodeId = key.split(':')[0];
    for (const series of getAllSeries()) {
      if (series.episodes.some((ep) => ep.id === episodeId)) {
        counts[series.category] = (counts[series.category] ?? 0) + 1;
        break;
      }
    }
  }
  return counts;
}

function findUnderexploredCategory(profile: ListeningProfile): SeriesCategory | undefined {
  const counts = getCategoryCounts(profile);
  let minCount = Infinity;
  let minCat: SeriesCategory | undefined;

  for (const cat of ALL_CATEGORIES) {
    const count = counts[cat] ?? 0;
    if (count < minCount) {
      minCount = count;
      minCat = cat;
    }
  }
  return minCat;
}
