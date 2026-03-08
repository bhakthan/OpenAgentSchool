/**
 * Cognitive Lab — Brain-Native Learning Paradigms
 * Core type definitions for paradigms, exercises, and progress.
 */

export type CognitiveParadigmId =
  | 'burst-grafting'
  | 'void-mapping'
  | 'bio-sync'
  | 'glitch-resolution'
  | 'hemispheric-weaving'
  | 'glyph-cognition'
  | 'ephemeral-sparks';

// ── Paradigm ─────────────────────────────────────────────────────────────────

export interface CognitiveParadigm {
  id: CognitiveParadigmId;
  title: string;
  subtitle: string;
  description: string;
  scienceBasis: string;
  colorScheme: ParadigmColors;
  exercises: CognitiveExercise[];
  isComingSoon?: boolean;
}

export interface ParadigmColors {
  border: string;
  bg: string;
  text: string;
  badge: string;
  gradient: string;
}

// ── Exercise (discriminated union on paradigm) ───────────────────────────────

export interface CognitiveExerciseBase {
  id: string;
  title: string;
  description: string;
  paradigm: CognitiveParadigmId;
  estimatedSeconds: number;
  conceptId?: string;
}

export interface BurstGraftingExercise extends CognitiveExerciseBase {
  paradigm: 'burst-grafting';
  content: {
    conceptLabel: string;
    nanoDef: string;
    geometricShape: 'triangle' | 'hexagon' | 'circle' | 'diamond' | 'square';
    chordFrequencies: [number, number, number];
    colorFlash: string;
  };
}

export interface VoidMappingExercise extends CognitiveExerciseBase {
  paradigm: 'void-mapping';
  content: {
    concept: string;
    antiFlashes: string[];
    definition: string;
    decoyDefinitions: string[];
  };
}

export interface BioSyncExercise extends CognitiveExerciseBase {
  paradigm: 'bio-sync';
  content: {
    concept: string;
    targetBPM: number;
  };
}

export interface GlitchResolutionExercise extends CognitiveExerciseBase {
  paradigm: 'glitch-resolution';
  content: {
    concept: string;
    statementA: string;
    statementB: string;
    resolution: string;
    explanation: string;
  };
}

export interface HemisphericWeavingExercise extends CognitiveExerciseBase {
  paradigm: 'hemispheric-weaving';
  content: {
    concept: string;
    leftChannel: string;
    rightChannel: string;
    synthesis: string;
  };
}

export interface GlyphCognitionExercise extends CognitiveExerciseBase {
  paradigm: 'glyph-cognition';
  content: {
    glyphId: string;
    concept: string;
    seedSyllable: string;
    recallPrompt: string;
    correctAnswer: string;
  };
}

export interface EphemeralSparksExercise extends CognitiveExerciseBase {
  paradigm: 'ephemeral-sparks';
  content: {
    concept: string;
    flashContent: string;
    decayDurationMs: number;
    recallPrompt: string;
    correctAnswer: string;
  };
}

export type CognitiveExercise =
  | BurstGraftingExercise
  | VoidMappingExercise
  | BioSyncExercise
  | GlitchResolutionExercise
  | HemisphericWeavingExercise
  | GlyphCognitionExercise
  | EphemeralSparksExercise;

// ── Progress ─────────────────────────────────────────────────────────────────

export interface CognitiveSessionResult {
  exerciseId: string;
  paradigmId: CognitiveParadigmId;
  score: number;
  maxScore: number;
  completedAt: string;
  isEphemeralBurned?: boolean;
}

export interface CognitiveParadigmProgress {
  completedExercises: Record<string, CognitiveSessionResult>;
}
