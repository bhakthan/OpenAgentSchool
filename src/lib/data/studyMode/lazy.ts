// Dynamic (code-split) loaders for heavy Study Mode content libraries.
// This defers loading of large static question banks until Study Mode is actually visited.

import type { StudyModeQuestion, StudyModeSession, StudyModeType } from './types';

export interface StudyModeDataBundle {
  socratic: Record<string, StudyModeQuestion[]>;
  scenarios: Record<string, StudyModeQuestion[]>;
  debug: Record<string, StudyModeQuestion[]>;
}

// Load all heavy libraries in parallel (still one network turn, but deferred)
export async function loadStudyModeData(): Promise<StudyModeDataBundle> {
  const [socraticMod, scenarioMod, debugMod] = await Promise.all([
    import('./socraticQuestions' /* webpackChunkName: "sm-socratic" */),
    import('./interactiveScenarios' /* webpackChunkName: "sm-scenarios" */),
    import('./debugChallenges' /* webpackChunkName: "sm-debug" */)
  ]);
  return {
    socratic: (socraticMod as any).socraticQuestionLibrary || {},
    scenarios: (scenarioMod as any).scenarioLibrary || {},
    debug: (debugMod as any).debugChallengeLibrary || {}
  };
}

export function flattenQuestions(bundle: StudyModeDataBundle): StudyModeQuestion[] {
  return [
    ...Object.values(bundle.socratic).flat(),
    ...Object.values(bundle.scenarios).flat(),
    ...Object.values(bundle.debug).flat()
  ];
}

export function filterQuestionsByConcept(bundle: StudyModeDataBundle, conceptId: string): StudyModeQuestion[] {
  return flattenQuestions(bundle).filter(q => q.conceptId === conceptId);
}

export function getRecommendedQuestion(bundle: StudyModeDataBundle, completedIds: string[]): StudyModeQuestion | null {
  return flattenQuestions(bundle).find(q => !completedIds.includes(q.id)) || null;
}

// Utility to derive categories on the fly (lightweight clone of previous static array)
export function deriveCategories(bundle: StudyModeDataBundle) {
  return [
    {
      id: 'socratic-thinking',
      name: 'Socratic Discovery',
      description: 'Learn through guided questioning that helps you discover concepts yourself',
      icon: 'LadderIcon',
      questions: Object.values(bundle.socratic).flat(),
      prerequisites: []
    },
    {
      id: 'interactive-scenarios',
      name: 'Hands-On Scenarios',
      description: 'Build systems step-by-step through realistic implementation challenges',
      icon: 'PuzzlePiece',
      questions: Object.values(bundle.scenarios).flat(),
      prerequisites: ['socratic-thinking']
    },
    {
      id: 'debug-challenges',
      name: 'Debug & Fix',
      description: 'Analyze broken systems and learn by fixing real-world problems',
      icon: 'Bug',
      questions: Object.values(bundle.debug).flat(),
      prerequisites: ['interactive-scenarios']
    },
    {
      id: 'super-critical-learning',
      name: 'Super Critical Learning',
      description: 'Explore second and third-order effects in complex agentic systems',
      icon: 'Brain',
      questions: [],
      prerequisites: ['debug-challenges']
    }
  ];
}
