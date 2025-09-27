export interface ComputerUseExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

export const computerUseExecutionSteps: ComputerUseExecutionStep[] = [
  {
    id: 'setup-imports',
    title: 'Imports and action contract',
    description: 'Bring in child_process spawn helper and define the ScreenAction interface with supported action types.',
    startLine: 1,
    endLine: 18
  },
  {
    id: 'agent-constructor',
    title: 'Agent initialization',
    description: 'Compute default screen size and prepare internal state inside the ComputerUseAgent constructor.',
    startLine: 20,
    endLine: 32
  },
  {
    id: 'task-orchestrator',
    title: 'Task orchestration loop',
    description: 'executeTask coordinates capture, analysis, planning, and action execution with retry logic and error handling.',
    startLine: 34,
    endLine: 96
  },
  {
    id: 'screen-capture-routing',
    title: 'Screen capture routing',
    description: 'captureScreen delegates to macOS, Windows, or Linux capture helpers.',
    startLine: 98,
    endLine: 122
  },
  {
    id: 'platform-capture',
    title: 'Platform capture helpers',
    description: 'Platform-specific screencapture implementation for macOS (others ready for extension).',
    startLine: 124,
    endLine: 153
  },
  {
    id: 'vision-analysis',
    title: 'Vision powered screen analysis',
    description: 'Construct the structured prompt for the vision model and parse the JSON response describing UI state.',
    startLine: 155,
    endLine: 192
  },
  {
    id: 'action-planning',
    title: 'Plan the next action',
    description: 'Compose the follow-up LLM prompt that recommends the next click, type, or keyboard action.',
    startLine: 194,
    endLine: 222
  },
  {
    id: 'execute-action',
    title: 'Execute planned action',
    description: 'Dispatch click, typing, keyboard, scroll, or drag commands based on the chosen ScreenAction.',
    startLine: 224,
    endLine: 253
  },
  {
    id: 'interaction-helpers',
    title: 'Interaction helpers',
    description: 'Implement click, type, key press, scroll, delay, and vision model invocation helpers.',
    startLine: 255,
    endLine: 322
  }
];
