import { SystemDesignPattern } from './types';

export const toolUseCoachSystemDesign: SystemDesignPattern = {
  id: 'tool-use-coach',
  name: 'Tool‑Use Coach System Design',
  overview: 'Teaches disciplined CLI/API/SDK usage with exemplars, gotchas, and validation checklists.',
  problemStatement: 'Learners guess API syntax and misuse tools. How to instill reliable usage patterns fast?',
  solution: 'Generate exemplars with comments, list pitfalls, and provide validation for provided commands/requests.',
  steps: [
    { id: 'task', title: 'Task Intake', category: 'context', description: 'Capture task and selected tool.', details: 'Resolve version/docs info.', considerations: ['Version drift'], bestPractices: ['Pin versions'] },
    { id: 'exemplars', title: 'Exemplar Generation', category: 'prompt', description: 'Produce commented calls covering happy path and errors.', details: 'Include retries/timeouts.', considerations: ['Copy‑paste risk'], bestPractices: ['Explain flags'] },
    { id: 'validation', title: 'Command/Request Validation', category: 'evaluation', description: 'Validate user‑provided input against checklist.', details: 'Return pass/fail with tips.', considerations: ['False negatives'], bestPractices: ['Be specific'] }
  ],
  architecture: {
    components: [
      { name: 'Task Intake', type: 'input', description: 'Collects task and tool' },
      { name: 'Coach LLM', type: 'processing', description: 'Generates exemplars and checklist' },
      { name: 'Validator', type: 'processing', description: 'Validates provided input' },
      { name: 'Output Panel', type: 'output', description: 'Shows tips and examples' }
    ],
    flows: [
      { from: 'Task Intake', to: 'Coach LLM', description: 'Provide task/tool context' },
      { from: 'Coach LLM', to: 'Output Panel', description: 'Show exemplars + gotchas + checklist' },
      { from: 'Output Panel', to: 'Validator', description: 'Validate user input as needed' }
    ]
  }
};
