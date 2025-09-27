// Python execution steps for Computer Use pattern (line mapping pending refinement)
export const computerUsePythonExecutionSteps = [
  { id: 'py-imports-setup', title: 'Imports & setup', description: 'Import asyncio, typing helpers, pyautogui, OpenCV/Pillow utilities, and establish ComputerUseAgent scaffold.' },
  { id: 'py-agent-init', title: 'Agent initialization', description: 'Configure the vision client, capture screen dimensions, and set pyautogui safety defaults.' },
  { id: 'py-task-loop', title: 'Task orchestration loop', description: 'execute_task orchestrates capture, analysis, planning, execution, and retry with structured results.' },
  { id: 'py-capture-screen', title: 'Screen capture helper', description: 'capture_screen grabs a screenshot, stores it in-memory, and returns PNG bytes.' },
  { id: 'py-analyze-screen', title: 'Vision model analysis', description: 'analyze_screen builds the multimodal prompt, encodes the screenshot, and parses the JSON response.' },
  { id: 'py-plan-action', title: 'Next action planner', description: 'plan_action converts the analysis into a structured action plan, including completion detection.' },
  { id: 'py-execute-action', title: 'Execute actions', description: 'execute_action interprets click, type, key, scroll, or drag commands using pyautogui primitives.' },
  { id: 'py-helpers', title: 'Helper utilities', description: 'Utility functions for mouse movement, coordinate translation, and integrating with the vision client.' }
] as const;

export type ComputerUsePythonExecutionStep = typeof computerUsePythonExecutionSteps[number];
