export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number; // 1-based inclusive relative to the provided code string
  endLine: number;   // 1-based inclusive
}

export const reactAgentExecutionSteps: ExecutionStep[] = [
  {
    id: 'init',
    title: 'Initialize State',
    description: 'Set counters, termination flags, context history and final answer placeholders; seed analyst request.',
    startLine: 1,
    endLine: 11
  },
  {
    id: 'tools',
    title: 'Define Domain Tools',
    description: 'Declare earnings report, stock performance, KPI extraction and summarization tools.',
    startLine: 12,
    endLine: 26
  },
  {
    id: 'loop-start',
    title: 'Enter Reasoning Loop',
    description: 'Check termination, increment cycle counter.',
    startLine: 28,
    endLine: 30
  },
  {
    id: 'prompt',
    title: 'Build Reasoning Prompt',
    description: 'Construct structured ReAct prompt with tools list, instructions, and previous steps scratchpad.',
    startLine: 31,
    endLine: 53
  },
  {
    id: 'llm-call',
    title: 'LLM Call & Scratchpad Update',
    description: 'Invoke LLM with reasoning prompt and append raw response to context history.',
    startLine: 55,
    endLine: 56
  },
  {
    id: 'parse-final-check',
    title: 'Parse For Final Answer',
    description: 'Detect a Final Answer block; capture and terminate if present.',
    startLine: 58,
    endLine: 63
  },
  {
    id: 'parse-action',
    title: 'Parse Action & Execute Tool',
    description: 'Extract Action and Action Input; dispatch tool; push Observation or error.',
    startLine: 65,
    endLine: 79
  },
  {
    id: 'return',
    title: 'Return Result',
    description: 'Assemble status, cycles executed, final answer (or fallback) and full history.',
    startLine: 83,
    endLine: 91
  }
];
