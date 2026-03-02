// ─── Micro-Learning Barrel Export ─────────────────────────────────────────────

// Types
export type {
  Capsule,
  CapsuleType,
  StudyModeTypeRef,
  Track,
  LearnerRole,
  TrackDifficulty,
  CapsuleCompletion,
  MicroLearningProgress,
  RoleProfile,
  ExperienceLevel,
  LearnerGoal,
  SorterQuestion,
  SorterOption,
} from './types';

export { XP_VALUES, QUIZ_PERFECT_BONUS, DEFAULT_DAILY_GOAL } from './types';

// Tracks
export { TRACKS, getTrackById, getTracksForRole, getTracksByDifficulty } from './tracks';

// Capsules
export {
  CAPSULES_BY_TRACK,
  ALL_CAPSULES,
  getCapsulesForConcept,
  getCapsuleById,
  getCapsulesByTrackGrouped,
} from './capsules';

// Progress
export {
  loadProgress,
  saveProgress,
  completeCapsule,
  getTrackProgress,
  isCapsuleCompleted,
  getDailyProgress,
  setDailyGoal,
  saveRoleProfile,
  getRoleProfile,
  getStats,
} from './progress';

// Role Sorter
export {
  SORTER_QUESTIONS,
  computeRecommendedTracks,
  buildRoleProfile,
} from './roleSorter';

// Concept Sphere (JIT LLM Learning)
export {
  querySphere,
  isLLMConfigured,
  SPHERE_PRESETS,
  clearSphereCache,
} from './conceptSphere';
export type { SphereMode, SphereQuery, SphereResult } from './conceptSphere';

// Spaced Repetition
export {
  registerCapsuleForReview,
  processReview,
  getDueReviews,
  getUpcomingReviews,
  getReviewCard,
  getReviewDeckSize,
  quizScoreToQuality,
} from './spacedRepetition';
export type { ReviewCard, QualityRating, ReviewDeck } from './spacedRepetition';

// Adaptive Engine
export {
  computePerformanceProfile,
  getRecommendations,
  getTrackRecommendations,
} from './adaptiveEngine';
export type {
  PerformanceProfile,
  CapsuleRecommendation,
  RecommendationReason,
  TrackRecommendation,
} from './adaptiveEngine';
