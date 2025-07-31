export { default as StudyMode } from './StudyMode.tsx';
export { default as SocraticQuestionMode } from './SocraticQuestionMode.tsx';
export { default as InteractiveScenarioMode } from './InteractiveScenarioMode.tsx';
export { default as DebugChallengeMode } from './DebugChallengeMode.tsx';

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
  generateStudySession,
  calculateStudyModeProgress,
  saveStudyModeProgress
} from '@/lib/data/studyMode';
