// ─── Micro-Learning Achievement Definitions & Unlock Logic ───────────────────
// Extends the existing achievements system with micro-learning milestones.
// Uses client-side checking; integrates with backend via the same API contract.

import type { MicroLearningProgress } from '@/lib/data/microLearning/types';
import { CAPSULES_BY_TRACK } from '@/lib/data/microLearning/capsules';
import { TRACKS } from '@/lib/data/microLearning/tracks';

// ─── Achievement Definitions ─────────────────────────────────────────────────

export interface MicroAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** XP bonus awarded on unlock */
  bonusXP: number;
  /** Category for grouping in achievements UI */
  category: 'milestone' | 'streak' | 'track' | 'mastery' | 'explorer';
  /** Rarity for badge styling */
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  /** Check function — returns true if achievement is newly unlocked */
  check: (progress: MicroLearningProgress) => boolean;
}

export const MICRO_ACHIEVEMENTS: MicroAchievement[] = [
  // ── Milestone achievements ──────────────────────────────────────────────
  {
    id: 'ml-first-capsule',
    title: 'First Spark',
    description: 'Complete your first micro-learning capsule',
    icon: '✨',
    bonusXP: 10,
    category: 'milestone',
    rarity: 'common',
    check: (p) => p.completions.length >= 1,
  },
  {
    id: 'ml-capsule-10',
    title: 'Getting Momentum',
    description: 'Complete 10 capsules',
    icon: '🚀',
    bonusXP: 25,
    category: 'milestone',
    rarity: 'common',
    check: (p) => p.completions.length >= 10,
  },
  {
    id: 'ml-capsule-25',
    title: 'Quarter Century',
    description: 'Complete 25 capsules',
    icon: '🏅',
    bonusXP: 50,
    category: 'milestone',
    rarity: 'rare',
    check: (p) => p.completions.length >= 25,
  },
  {
    id: 'ml-capsule-50',
    title: 'Half Century',
    description: 'Complete 50 capsules — you\'re unstoppable',
    icon: '💎',
    bonusXP: 100,
    category: 'milestone',
    rarity: 'epic',
    check: (p) => p.completions.length >= 50,
  },
  {
    id: 'ml-capsule-100',
    title: 'Century of Knowledge',
    description: 'Complete 100 capsules',
    icon: '👑',
    bonusXP: 250,
    category: 'milestone',
    rarity: 'legendary',
    check: (p) => p.completions.length >= 100,
  },

  // ── Streak achievements ─────────────────────────────────────────────────
  {
    id: 'ml-streak-3',
    title: 'Consistent Learner',
    description: '3-day learning streak',
    icon: '🔥',
    bonusXP: 15,
    category: 'streak',
    rarity: 'common',
    check: (p) => p.currentStreak >= 3,
  },
  {
    id: 'ml-streak-7',
    title: 'Week Warrior',
    description: '7-day learning streak',
    icon: '🔥',
    bonusXP: 50,
    category: 'streak',
    rarity: 'rare',
    check: (p) => p.currentStreak >= 7,
  },
  {
    id: 'ml-streak-14',
    title: 'Fortnight Focus',
    description: '14-day learning streak',
    icon: '🔥',
    bonusXP: 100,
    category: 'streak',
    rarity: 'epic',
    check: (p) => p.currentStreak >= 14,
  },
  {
    id: 'ml-streak-30',
    title: 'Monthly Legend',
    description: '30-day learning streak — legendary commitment',
    icon: '🌟',
    bonusXP: 250,
    category: 'streak',
    rarity: 'legendary',
    check: (p) => p.currentStreak >= 30,
  },

  // ── Track achievements ──────────────────────────────────────────────────
  {
    id: 'ml-first-track',
    title: 'Track Pioneer',
    description: 'Complete your first learning track',
    icon: '🎯',
    bonusXP: 75,
    category: 'track',
    rarity: 'rare',
    check: (p) => {
      const completedIds = new Set(p.completions.map((c) => c.capsuleId));
      return TRACKS.some((t) => {
        const trackCapsules = CAPSULES_BY_TRACK[t.id] ?? [];
        return trackCapsules.length > 0 && trackCapsules.every((c) => completedIds.has(c.id));
      });
    },
  },
  {
    id: 'ml-three-tracks',
    title: 'Triple Threat',
    description: 'Complete 3 learning tracks',
    icon: '🏆',
    bonusXP: 200,
    category: 'track',
    rarity: 'epic',
    check: (p) => {
      const completedIds = new Set(p.completions.map((c) => c.capsuleId));
      const completedTracks = TRACKS.filter((t) => {
        const trackCapsules = CAPSULES_BY_TRACK[t.id] ?? [];
        return trackCapsules.length > 0 && trackCapsules.every((c) => completedIds.has(c.id));
      });
      return completedTracks.length >= 3;
    },
  },
  {
    id: 'ml-all-tracks',
    title: 'Complete Scholar',
    description: 'Complete ALL learning tracks',
    icon: '🎓',
    bonusXP: 500,
    category: 'track',
    rarity: 'legendary',
    check: (p) => {
      const completedIds = new Set(p.completions.map((c) => c.capsuleId));
      return TRACKS.every((t) => {
        const trackCapsules = CAPSULES_BY_TRACK[t.id] ?? [];
        return trackCapsules.length > 0 && trackCapsules.every((c) => completedIds.has(c.id));
      });
    },
  },

  // ── Explorer achievements ───────────────────────────────────────────────
  {
    id: 'ml-multi-type',
    title: 'Well-Rounded',
    description: 'Complete at least one capsule of every type',
    icon: '🎨',
    bonusXP: 30,
    category: 'explorer',
    rarity: 'rare',
    check: (p) => {
      // Check that all 5 capsule types are represented in completions
      // by looking at capsule ID patterns (type is embedded in id)
      const types = new Set<string>();
      for (const c of p.completions) {
        if (c.capsuleId.includes('--core-idea')) types.add('read');
        else if (c.capsuleId.includes('--see-it-work')) types.add('visualize');
        else if (c.capsuleId.includes('--quick-check')) types.add('quiz-checkpoint');
        else if (c.capsuleId.includes('--think-deeper')) types.add('apply');
        else if (c.capsuleId.includes('--pattern-connect')) types.add('pattern-connect');
      }
      return types.size >= 5;
    },
  },
  {
    id: 'ml-xp-500',
    title: 'XP Explorer',
    description: 'Earn 500 XP in micro-learning',
    icon: '⚡',
    bonusXP: 25,
    category: 'explorer',
    rarity: 'common',
    check: (p) => p.totalXP >= 500,
  },
  {
    id: 'ml-xp-2000',
    title: 'XP Master',
    description: 'Earn 2,000 XP in micro-learning',
    icon: '💫',
    bonusXP: 100,
    category: 'explorer',
    rarity: 'epic',
    check: (p) => p.totalXP >= 2000,
  },

  // ── Mastery achievements ────────────────────────────────────────────────
  {
    id: 'ml-quiz-perfect-5',
    title: 'Quiz Ace',
    description: 'Score 100% on 5 quiz-checkpoint capsules',
    icon: '💯',
    bonusXP: 50,
    category: 'mastery',
    rarity: 'rare',
    check: (p) => {
      const perfectQuizzes = p.completions.filter(
        (c) => c.quizScore === 100 && c.capsuleId.includes('--quick-check'),
      );
      return perfectQuizzes.length >= 5;
    },
  },
  {
    id: 'ml-daily-goal-7',
    title: 'Goal Crusher',
    description: 'Hit your daily goal 7 times',
    icon: '🎯',
    bonusXP: 40,
    category: 'mastery',
    rarity: 'rare',
    check: (p) => {
      // Count unique dates where completions >= dailyGoal
      const dailyGoal = p.dailyGoal || 3;
      const dateMap = new Map<string, number>();
      for (const c of p.completions) {
        const date = c.completedAt.slice(0, 10);
        dateMap.set(date, (dateMap.get(date) ?? 0) + 1);
      }
      const daysHitGoal = [...dateMap.values()].filter((n) => n >= dailyGoal).length;
      return daysHitGoal >= 7;
    },
  },
];

// ─── Achievement State (localStorage) ────────────────────────────────────────

const ACHIEVEMENTS_KEY = 'micro-learning-achievements';

interface AchievementState {
  unlockedIds: string[];
  unlockedAt: Record<string, string>; // id → ISO date
}

function loadAchievementState(): AchievementState {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return { unlockedIds: [], unlockedAt: {} };
    return JSON.parse(raw) as AchievementState;
  } catch {
    return { unlockedIds: [], unlockedAt: {} };
  }
}

function saveAchievementState(state: AchievementState): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(state));
  } catch {}
}

// ─── Check & Unlock ──────────────────────────────────────────────────────────

/**
 * Check all micro-learning achievements against current progress.
 * Returns an array of *newly unlocked* achievements (empty if none).
 */
export function checkAndUnlockAchievements(
  progress: MicroLearningProgress,
): MicroAchievement[] {
  const state = loadAchievementState();
  const alreadyUnlocked = new Set(state.unlockedIds);
  const newlyUnlocked: MicroAchievement[] = [];

  for (const achievement of MICRO_ACHIEVEMENTS) {
    if (alreadyUnlocked.has(achievement.id)) continue;
    if (achievement.check(progress)) {
      newlyUnlocked.push(achievement);
      state.unlockedIds.push(achievement.id);
      state.unlockedAt[achievement.id] = new Date().toISOString();
    }
  }

  if (newlyUnlocked.length > 0) {
    saveAchievementState(state);
  }

  return newlyUnlocked;
}

/**
 * Get all unlocked achievement IDs.
 */
export function getUnlockedAchievementIds(): Set<string> {
  return new Set(loadAchievementState().unlockedIds);
}

/**
 * Get all achievements with unlock status.
 */
export function getAllAchievementsWithStatus() {
  const state = loadAchievementState();
  const unlockedSet = new Set(state.unlockedIds);
  return MICRO_ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlockedSet.has(a.id),
    unlockedAt: state.unlockedAt[a.id] ?? null,
  }));
}
