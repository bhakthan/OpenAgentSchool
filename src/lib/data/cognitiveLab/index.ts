/**
 * Cognitive Lab — barrel export
 */

export type {
  CognitiveParadigmId,
  CognitiveParadigm,
  ParadigmColors,
  CognitiveExercise,
  CognitiveExerciseBase,
  BurstGraftingExercise,
  VoidMappingExercise,
  BioSyncExercise,
  GlitchResolutionExercise,
  HemisphericWeavingExercise,
  GlyphCognitionExercise,
  EphemeralSparksExercise,
  CognitiveSessionResult,
  CognitiveParadigmProgress,
} from './types';

export {
  COGNITIVE_PARADIGMS,
  PARADIGM_COLORS,
  getParadigm,
  getExercise,
} from './paradigms';

export {
  getParadigmProgress,
  getSessionResult,
  getLabScore,
  getCompletedCount,
  getTotalCount,
  getParadigmCompletionPercent,
  isEphemeralBurned,
  completeSession,
  burnEphemeral,
  resetLabProgress,
} from './progress';

export {
  GLYPHS,
  getGlyph,
  getGlyphsByCategory,
} from './glyphs';

export type { Glyph } from './glyphs';
