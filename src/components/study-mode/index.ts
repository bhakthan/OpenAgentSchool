export { default as StudyMode } from './StudyMode.tsx';
export { default as SocraticQuestionMode } from './SocraticQuestionMode.tsx';
export { default as InteractiveScenarioMode } from './InteractiveScenarioMode.tsx';
export { default as DebugChallengeMode } from './DebugChallengeMode.tsx';
export { default as MasteryPanel } from './MasteryPanel';
export { default as FailureModesPanel } from './FailureModesPanel';
export { default as TransferChallengesView } from './TransferChallengesView';

// Utilities
export { emitTelemetry, registerTelemetrySink } from '@/lib/data/studyMode/telemetry';
export { computeMasteryTier } from '@/lib/data/studyMode/patternMastery';

// Re-export types for external use
export type {
  StudyModeQuestion,
  StudyModeSession,
  StudyModeResponse,
  StudyScenario,
  DebugChallenge,
  StudyModeType,
  StudyModeLevel
} from '@/lib/data/studyMode/types';

export {
  calculateStudyModeProgress,
  saveStudyModeProgress
} from '@/lib/data/studyMode';
