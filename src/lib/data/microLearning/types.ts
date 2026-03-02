// ─── Micro-Learning Data Types ───────────────────────────────────────────────
// Compositional layer over existing concepts, patterns, quizzes, and study mode.

/** Micro-lesson fragment of an existing concept. */
export interface Capsule {
  /** Unique ID, e.g. "what-is-an-llm--core-idea" */
  id: string;
  /** Parent concept ID from ConceptsHub (kebab-case) */
  conceptId: string;
  /** Short learner-facing title */
  title: string;
  /** One-line summary shown on timeline nodes */
  subtitle: string;
  /** Estimated minutes (5–10 typical) */
  estimatedMinutes: number;
  /** Content interaction type */
  type: CapsuleType;
  /** Existing quiz category ID (only for quiz-checkpoint capsules) */
  quizCategoryId?: string;
  /** Study mode type to launch (only for apply capsules) */
  studyModeType?: StudyModeTypeRef;
  /** Related agent pattern ID from patterns registry */
  patternId?: string;
  /** Display order within the parent concept (1-based) */
  order: number;
}

export type CapsuleType =
  | 'read'               // Core idea — read the concept summary
  | 'visualize'          // See it work — view pattern/concept diagram
  | 'quiz-checkpoint'    // Quick check — 3–5 quiz questions
  | 'apply'              // Think deeper — Socratic/scenario study mode
  | 'pattern-connect';   // Pattern connect — link to related agent pattern

export type StudyModeTypeRef = 'socratic' | 'scenario' | 'debug' | 'scl';

/** A skill-based learning track — curated bundle of concepts. */
export interface Track {
  id: string;
  title: string;
  /** Outcome-focused tagline for marketing (≤140 chars) */
  tagline: string;
  /** Phosphor icon name (imported dynamically) */
  icon: string;
  /** Tailwind gradient classes for brand identity */
  gradient: string;
  /** Total estimated hours across all capsules */
  estimatedHours: number;
  /** Total capsule count (derived, but cached for perf) */
  capsuleCount: number;
  /** Persona roles this track is recommended for */
  roles: LearnerRole[];
  /** Difficulty tier */
  difficulty: TrackDifficulty;
  /** Ordered concept IDs composing this track */
  conceptIds: string[];
  /** Marketing outcome statement — what learners can DO after completing */
  outcomeStatement: string;
  /** Optional proof signal metric to display */
  proofSignal?: string;
}

export type LearnerRole = 'developer' | 'product-manager' | 'business-leader' | 'ai-engineer';
export type TrackDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// ─── Progress & Gamification ─────────────────────────────────────────────────

export interface CapsuleCompletion {
  capsuleId: string;
  completedAt: string; // ISO date
  xpEarned: number;
  /** Quiz score if quiz-checkpoint, 0–100 */
  quizScore?: number;
}

export interface MicroLearningProgress {
  /** All completed capsules */
  completions: CapsuleCompletion[];
  /** Total XP accumulated */
  totalXP: number;
  /** Current streak (consecutive days with ≥1 capsule) */
  currentStreak: number;
  /** Longest streak ever */
  longestStreak: number;
  /** ISO date of last capsule completion */
  lastActivityDate: string;
  /** Daily goal target (capsules/day, default 3) */
  dailyGoal: number;
  /** Saved role profile from role sorter */
  roleProfile?: RoleProfile;
}

export interface RoleProfile {
  role: LearnerRole;
  experience: ExperienceLevel;
  goal: LearnerGoal;
  recommendedTrackIds: string[];
  completedAt: string; // ISO date
}

export type ExperienceLevel = 'new' | 'some-experience' | 'building-in-production';

export type LearnerGoal =
  | 'build-first-agent'
  | 'improve-prompts'
  | 'secure-deployments'
  | 'lead-ai-strategy'
  | 'go-deeper';

// ─── Role Sorter ─────────────────────────────────────────────────────────────

export interface SorterQuestion {
  id: string;
  question: string;
  options: SorterOption[];
}

export interface SorterOption {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

// ─── XP Constants ────────────────────────────────────────────────────────────

export const XP_VALUES: Record<CapsuleType, number> = {
  read: 5,
  visualize: 5,
  'quiz-checkpoint': 10,
  apply: 15,
  'pattern-connect': 10,
} as const;

/** Bonus XP for perfect quiz score (100%) */
export const QUIZ_PERFECT_BONUS = 5;

/** Default daily capsule goal */
export const DEFAULT_DAILY_GOAL = 3;
