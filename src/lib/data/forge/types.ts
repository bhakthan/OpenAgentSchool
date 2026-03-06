/**
 * The Forge — Cognitive Friction Lab
 * Core type definitions for disciplines, exercises, and scoring.
 */

export type ForgeDisciplineId =
  | 'socratic-defense'
  | 'prompt-autopsies'
  | 'epistemic-gym'
  | 'trust-calibration';

export type ForgeDifficulty = 'beginner' | 'intermediate' | 'advanced';

// ── Discipline ───────────────────────────────────────────────────────────────

export interface ForgeDiscipline {
  id: ForgeDisciplineId;
  title: string;
  subtitle: string;
  icon: string; // Phosphor icon name reference
  philosophy: string;
  description: string;
  exercises: ForgeExercise[];
}

// ── Exercise (discriminated union on discipline) ─────────────────────────────

export interface ForgeExerciseBase {
  id: string;
  title: string;
  description: string;
  discipline: ForgeDisciplineId;
  difficulty: ForgeDifficulty;
  estimatedMinutes: number;
  aiRequired: boolean;
  /** Optional cross-link to a concept page (e.g. 'agentic-rag', 'agent-security') */
  conceptId?: string;
}

export interface SocraticDefenseExercise extends ForgeExerciseBase {
  discipline: 'socratic-defense';
  content: SocraticDefenseContent;
}

export interface PromptAutopsyExercise extends ForgeExerciseBase {
  discipline: 'prompt-autopsies';
  content: PromptAutopsyContent;
}

export interface EpistemicGymExercise extends ForgeExerciseBase {
  discipline: 'epistemic-gym';
  content: EpistemicGymContent;
}

export interface TrustCalibrationExercise extends ForgeExerciseBase {
  discipline: 'trust-calibration';
  content: TrustCalibrationContent;
}

export type ForgeExercise =
  | SocraticDefenseExercise
  | PromptAutopsyExercise
  | EpistemicGymExercise
  | TrustCalibrationExercise;

// ── Content types per discipline ─────────────────────────────────────────────

export interface SocraticDefenseContent {
  topic: string;
  context: string;
  /** System prompt that instructs the LLM to act as a Socratic examiner */
  systemPromptForExaminer: string;
  /** Static fallback questions when no LLM is available */
  fallbackQuestions: string[];
  rubric: SocraticRubric;
}

export interface SocraticRubric {
  criteria: string[];
  maxScore: number;
}

export interface PromptAutopsyContent {
  /** The flawed AI-generated output to dissect */
  flawedOutput: string;
  /** Domain context (e.g. "Python code", "Security analysis") */
  domain: string;
  /** Errors deliberately embedded */
  embeddedErrors: EmbeddedError[];
  /** Hints shown progressively */
  hints: string[];
}

export interface EmbeddedError {
  id: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  explanation: string;
  location?: string;
}

export interface EpistemicGymContent {
  question: string;
  /** Time limit in seconds */
  timeLimit: number;
  hints: string[];
  correctAnswer: string;
  explanation: string;
  /** Key reasoning steps the learner should demonstrate */
  reasoningSteps: string[];
}

export interface TrustCalibrationContent {
  scenario: string;
  agents: AgentProfile[];
  decisions: TrustDecision[];
  scoringCriteria: TrustScoringCriteria;
}

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface TrustDecision {
  id: string;
  description: string;
  options: TrustOption[];
}

export interface TrustOption {
  id: string;
  label: string;
  autonomyLevel: 'full-auto' | 'supervised' | 'human-in-loop' | 'manual';
  score: number;
  feedback: string;
}

export interface TrustScoringCriteria {
  maxScore: number;
  idealRange: string;
  overTrustPenalty: string;
  underTrustPenalty: string;
}

// ── Scoring / Progress ───────────────────────────────────────────────────────

export interface ForgeExerciseResult {
  exerciseId: string;
  disciplineId: ForgeDisciplineId;
  score: number;
  maxScore: number;
  completedAt: string;
  feedback?: string;
}

export interface ForgeDisciplineProgress {
  disciplineId: ForgeDisciplineId;
  completedExercises: Record<string, ForgeExerciseResult>;
  lastActivityAt: string;
}
