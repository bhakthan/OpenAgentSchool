// Execution steps for Modern Tool Use pattern (TypeScript codeExample line mappings)
export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

export const modernToolUseExecutionSteps: ExecutionStep[] = [
  {
    id: 'header-context',
    title: 'Header & Business Context',
    description: 'Introduces financial advisory multi-tool workflow and objectives.',
    startLine: 1,
    endLine: 7
  },
  {
    id: 'tool-interfaces',
    title: 'Tool Interface & Domain Tools',
    description: 'Define Tool contract and register market, portfolio, risk, and outlook tools.',
    startLine: 9,
    endLine: 59
  },
  {
    id: 'default-tool-registry',
    title: 'Default Tool Registry',
    description: 'Aggregate default domain tools for dynamic planner selection.',
    startLine: 61,
    endLine: 68
  },
  {
    id: 'llm-stub',
    title: 'LLM Stub & Deterministic Plan',
    description: 'Simulated llm() returning planning, validation, and recovery responses.',
    startLine: 70,
    endLine: 93
  },
  {
    id: 'types-exec-records',
    title: 'Execution Record & Result Types',
    description: 'Structures for step tracking, final report, validation, and recovery notes.',
    startLine: 95,
    endLine: 112
  },
  {
    id: 'orchestrator-loop',
    title: 'Core Orchestration Loop',
    description: 'Retry bounded planning, dynamic tool execution with dependency substitution & error recovery.',
    startLine: 114,
    endLine: 165
  },
  {
    id: 'validation-phase',
    title: 'Validation Phase',
    description: 'Model validates completeness & coherence of intermediate execution results.',
    startLine: 167,
    endLine: 174
  },
  {
    id: 'report-synthesis',
    title: 'Investment Report Synthesis',
    description: 'Assemble holdings, pricing, risk, outlook, validation, and recovery notes into markdown.',
    startLine: 176,
    endLine: 211
  },
  {
    id: 'retry-fallback',
    title: 'Retry Exhaustion Fallback',
    description: 'Return failure after all retry attempts exhausted.',
    startLine: 213,
    endLine: 218
  }
];
