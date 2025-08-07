export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine?: number;
  endLine?: number;
}

// Line ranges map to the TypeScript codeExample in selfReflectionPattern
export const selfReflectionExecutionSteps: ExecutionStep[] = [
  {
    id: 'init',
    title: 'Initialize & Draft Generation',
    description: 'Define types, mock LLM, and produce the initial clinical note draft.',
    startLine: 1,
    endLine: 22
  },
  {
    id: 'critique-prompt',
    title: 'Build Critique Prompt',
    description: 'Create structured critique instruction emphasizing rubric and return format.',
    startLine: 24,
    endLine: 28
  },
  {
    id: 'parse-critique',
    title: 'Parse Critique',
    description: 'Regex extract issues, suggestions, score and approval threshold logic.',
    startLine: 30,
    endLine: 38
  },
  {
    id: 'refinement-prompt',
    title: 'Build Refinement Prompt',
    description: 'Compose refinement instructions including issues and suggestions context.',
    startLine: 40,
    endLine: 44
  },
  {
    id: 'loop-start',
    title: 'Enter Reflection Loop',
    description: 'Initialize history and begin iterative critique/refine cycles.',
    startLine: 46,
    endLine: 51
  },
  {
    id: 'iteration',
    title: 'Critique & Refine Iteration',
    description: 'Generate critique, parse it, build refinement prompt, produce refined draft, record history.',
    startLine: 52,
    endLine: 67
  },
  {
    id: 'convergence',
    title: 'Convergence Check',
    description: 'Terminate early if score threshold met or approved flag true.',
    startLine: 60,
    endLine: 63
  },
  {
    id: 'termination',
    title: 'Termination & Return',
    description: 'Return approved result or max iteration state with history and final note.',
    startLine: 68,
    endLine: 74
  }
];
