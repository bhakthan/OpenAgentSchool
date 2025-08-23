export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number; // relative to the TypeScript codeExample string
  endLine: number;
}

export const socraticCoachExecutionSteps: ExecutionStep[] = [
  {
    id: 'setup',
    title: 'Define Types & Function',
    description: 'Declare CoachTurn type and socraticCoach() signature.',
    startLine: 1,
    endLine: 3
  },
  {
    id: 'prompting',
    title: 'Build Prompt & Call LLM',
    description: 'Construct Socratic coaching prompt and call llm() to get candidate questions.',
    startLine: 4,
    endLine: 10
  },
  {
    id: 'parse-return',
    title: 'Parse Questions & Return',
    description: 'Split on newlines, take up to 3 questions, and return.',
    startLine: 11,
    endLine: 13
  },
  {
    id: 'stub',
    title: 'LLM Stub',
    description: 'Placeholder llm() implementation returning 3 example questions.',
    startLine: 14,
    endLine: 18
  }
];
