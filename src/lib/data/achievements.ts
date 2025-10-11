/**
 * Achievement Definitions for Open Agent School
 * 
 * Defines all available achievements, their unlock conditions,
 * and display properties for gamification system.
 */

export type AchievementCategory = 
  | 'thinking' 
  | 'problem-solving' 
  | 'debugging' 
  | 'understanding' 
  | 'engagement' 
  | 'mastery';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number;
  rarity: AchievementRarity;
  target_value: number;
  linkedin_shareable: boolean;
  certificate_eligible: boolean;
}

export interface UserAchievement extends Achievement {
  unlocked_at: Date;
  metadata?: Record<string, any>;
}

export interface AchievementProgress {
  achievement_id: string;
  current_value: number;
  target_value: number;
  percentage: number;
  is_complete: boolean;
}

/**
 * Master list of all achievements (synced with backend)
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-session',
    title: 'First Steps',
    description: 'Complete your first Study Mode session',
    icon: '🎯',
    category: 'thinking',
    points: 10,
    rarity: 'common',
    target_value: 1,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'concept-explorer',
    title: 'Concept Explorer',
    description: 'View 10 different concepts',
    icon: '🔍',
    category: 'understanding',
    points: 20,
    rarity: 'common',
    target_value: 10,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'concept-master',
    title: 'Concept Master',
    description: 'View 50 different concepts',
    icon: '📚',
    category: 'understanding',
    points: 50,
    rarity: 'rare',
    target_value: 50,
    linkedin_shareable: false,
    certificate_eligible: true,
  },
  {
    id: 'pattern-master',
    title: 'Pattern Master',
    description: 'Complete all Socratic question sessions',
    icon: '🧠',
    category: 'thinking',
    points: 100,
    rarity: 'epic',
    target_value: 15,
    linkedin_shareable: true,
    certificate_eligible: true,
  },
  {
    id: 'debugger',
    title: 'Master Debugger',
    description: 'Score 100% on any debug challenge',
    icon: '🐛',
    category: 'debugging',
    points: 75,
    rarity: 'rare',
    target_value: 1,
    linkedin_shareable: true,
    certificate_eligible: false,
  },
  {
    id: 'debug-champion',
    title: 'Debug Champion',
    description: 'Score 100% on 5 debug challenges',
    icon: '🏆',
    category: 'debugging',
    points: 200,
    rarity: 'legendary',
    target_value: 5,
    linkedin_shareable: true,
    certificate_eligible: true,
  },
  {
    id: 'template-champion',
    title: 'Template Champion',
    description: 'Download all 3 adoption templates',
    icon: '📋',
    category: 'engagement',
    points: 30,
    rarity: 'common',
    target_value: 3,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'bookmark-starter',
    title: 'Bookmark Starter',
    description: 'Save your first 5 bookmarks',
    icon: '⭐',
    category: 'engagement',
    points: 10,
    rarity: 'common',
    target_value: 5,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'bookmark-collector',
    title: 'Bookmark Collector',
    description: 'Save 20 bookmarks',
    icon: '📌',
    category: 'engagement',
    points: 40,
    rarity: 'rare',
    target_value: 20,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'study-streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    category: 'engagement',
    points: 50,
    rarity: 'rare',
    target_value: 7,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'study-streak-30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day study streak',
    icon: '💎',
    category: 'engagement',
    points: 150,
    rarity: 'legendary',
    target_value: 30,
    linkedin_shareable: true,
    certificate_eligible: true,
  },
  {
    id: 'all-modes',
    title: 'Versatile Learner',
    description: 'Complete at least one session of each Study Mode type',
    icon: '🎨',
    category: 'mastery',
    points: 60,
    rarity: 'rare',
    target_value: 4,
    linkedin_shareable: true,
    certificate_eligible: false,
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Achieve 100% on any Study Mode session',
    icon: '💯',
    category: 'mastery',
    points: 50,
    rarity: 'rare',
    target_value: 1,
    linkedin_shareable: false,
    certificate_eligible: false,
  },
  {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Join Open Agent School in its first month',
    icon: '🚀',
    category: 'engagement',
    points: 100,
    rarity: 'legendary',
    target_value: 1,
    linkedin_shareable: true,
    certificate_eligible: false,
  },
  {
    id: 'fundamentals-complete',
    title: 'AI Agent Fundamentals',
    description: 'Complete all fundamental concepts and sessions',
    icon: '🎓',
    category: 'mastery',
    points: 200,
    rarity: 'epic',
    target_value: 25,
    linkedin_shareable: true,
    certificate_eligible: true,
  },
  {
    id: 'advanced-practitioner',
    title: 'Advanced Practitioner',
    description: 'Complete 50 Study Mode sessions with 80%+ average',
    icon: '🏅',
    category: 'mastery',
    points: 300,
    rarity: 'legendary',
    target_value: 50,
    linkedin_shareable: true,
    certificate_eligible: true,
  },
];

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

/**
 * Get certificate-eligible achievements
 */
export function getCertificateAchievements(): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.certificate_eligible);
}

/**
 * Get LinkedIn-shareable achievements
 */
export function getLinkedInAchievements(): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.linkedin_shareable);
}

/**
 * Get rarity color for styling
 */
export function getRarityColor(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-600';
    case 'rare':
      return 'text-blue-600';
    case 'epic':
      return 'text-purple-600';
    case 'legendary':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
}

/**
 * Get rarity background for card styling
 */
export function getRarityBackground(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'common':
      return 'bg-gray-50 border-gray-200';
    case 'rare':
      return 'bg-blue-50 border-blue-200';
    case 'epic':
      return 'bg-purple-50 border-purple-200';
    case 'legendary':
      return 'bg-yellow-50 border-yellow-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
}
