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
    description: 'Set counters, termination flags, context history and final answer placeholders.',
    startLine: 1,
    endLine: 13
  },
  {
    id: 'tools',
    title: 'Define Tools',
    description: 'Declare the available tool functions (search, calculate, lookup).',
    startLine: 14,
    endLine: 27
  },
  {
    id: 'loop-start',
    title: 'Enter Reasoning Loop',
    description: 'Increment cycle counter and begin a new reasoning phase.',
    startLine: 29,
    endLine: 33
  },
  {
    id: 'prompt',
    title: 'Build Reasoning Prompt',
    description: 'Construct structured prompt instructing the agent to either act with a tool or produce a final answer.',
    startLine: 35,
    endLine: 52
  },
  {
    id: 'llm-call',
    title: 'LLM Call & Scratchpad Update',
    description: 'Call the LLM with the reasoning prompt and append its raw response to the context history.',
    startLine: 54,
    endLine: 56
  },
  {
    id: 'parse-final-check',
    title: 'Parse For Final Answer',
    description: 'Check if the reasoning response contains a Final Answer block.',
    startLine: 57,
    endLine: 65
  },
  {
    id: 'parse-action',
    title: 'Parse Action & Execute Tool',
    description: 'If no final answer, extract Action / Action Input, invoke tool, and record Observation.',
    startLine: 66,
    endLine: 83
  },
  {
    id: 'return',
    title: 'Return Result',
    description: 'Provide status, cycles executed, final answer (if any), and full history.',
    startLine: 87,
    endLine: 95
  }
];
