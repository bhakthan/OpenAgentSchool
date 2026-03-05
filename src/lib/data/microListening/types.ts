// ─── Micro-Listening Types ────────────────────────────────────────────────────
// Core TypeScript types for the micro-listening (audio episodes) system.

/** Difficulty / depth level for a listening episode. */
export type ListeningLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/** High-level content category a series belongs to. */
export type SeriesCategory =
  | 'core-concepts'
  | 'agent-patterns'
  | 'agents-for-science'
  | 'ai-science-factory'
  | 'adoption-playbook'
  | 'applied-ai-skills';

/** Queue playback mode. */
export type QueueMode = 'daily-mix' | 'deep-series' | 'review-replay';

/** A single listening episode within a series. */
export interface ListeningEpisode {
  id: string;
  title: string;
  description: string;
  seriesId: string;
  seriesOrder: number;
  /** Estimated duration in seconds. */
  durationEstimate: number;
  levels: ListeningLevel[];
  /** Path to .txt file in /audio/ (without leading /). */
  audioSource?: string;
  /** Inline text for TTS if .txt file is missing. */
  fallbackText?: Partial<Record<ListeningLevel, string>>;
  tags: string[];
  /** Links to existing ConceptsHub concept by kebab-case ID. */
  conceptId?: string;
  /** Links to existing agent pattern by ID. */
  patternId?: string;
  relatedLinks?: { label: string; path: string }[];
}

/** A collection of episodes grouped into a browseable series. */
export interface ListeningSeries {
  id: string;
  title: string;
  description: string;
  /** Phosphor icon name. */
  icon: string;
  /** Tailwind color class (e.g., 'blue-500'). */
  color: string;
  /** Tailwind gradient classes. */
  gradient: string;
  category: SeriesCategory;
  episodes: ListeningEpisode[];
  difficulty: ListeningLevel;
}

/** Per-episode playback progress record. */
export interface EpisodeProgress {
  episodeId: string;
  level: ListeningLevel;
  completed: boolean;
  /** Playback position in seconds. */
  playbackPosition: number;
  /** ISO date string when the episode was completed. */
  completedAt?: string;
  /** Total seconds listened for this episode + level. */
  listenedDuration: number;
}

/** Aggregate listening profile persisted in localStorage. */
export interface ListeningProfile {
  currentStreak: number;
  longestStreak: number;
  /** YYYY-MM-DD of most recent listening activity. */
  lastListenedDate: string;
  totalMinutesListened: number;
  totalEpisodesCompleted: number;
  preferredLevel: ListeningLevel;
  /** Daily listening goal in minutes. */
  dailyGoalMinutes: number;
  /** Minutes listened today. */
  todayMinutesListened: number;
  /** YYYY-MM-DD of the current day (for resetting todayMinutesListened). */
  todayDate: string;
  /** seriesId → level → episodes completed count. */
  seriesProgress: Record<string, Partial<Record<ListeningLevel, number>>>;
  /** Key: `${episodeId}:${level}` → progress record. */
  episodeProgress: Record<string, EpisodeProgress>;
  /** Ordered list of episode IDs in the current queue. */
  queue: string[];
  queueMode: QueueMode;
  /** Achievement IDs the user has earned. */
  unlockedAchievements: string[];
}

/** Auto-generated daily playlist. */
export interface DailyPlaylist {
  /** YYYY-MM-DD. */
  date: string;
  episodes: { episodeId: string; level: ListeningLevel }[];
  theme: string;
  estimatedMinutes: number;
  conceptOfTheDay?: string;
}

/** A listening achievement definition. */
export interface ListeningAchievement {
  id: string;
  title: string;
  description: string;
  /** Emoji icon. */
  icon: string;
  category: 'milestone' | 'streak' | 'series' | 'explorer' | 'speed';
  /** Predicate that returns true when the achievement is earned. */
  condition: (profile: ListeningProfile) => boolean;
}
