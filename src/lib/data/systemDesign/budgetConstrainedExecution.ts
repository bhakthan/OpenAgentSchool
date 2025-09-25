import { SystemDesignPattern } from './types';

export const budgetConstrainedExecutionSystemDesign: SystemDesignPattern = {
  id: 'budget-constrained-execution',
  name: 'Budget-Constrained Execution System Design',
  overview: 'Executes validated plan graphs with strict token, attempt, and latency budgets while monitoring progress metrics.',
  problemStatement: 'Without explicit budgets, autonomous workflows can spiral cost or time with diminishing returns.',
  solution: 'Introduce a loop controller that tracks usage, enforces ceilings, and supports adaptive early stopping.',
  steps: [
    { id: 'init-budgets', title: 'Initialize Budgets', category: 'architecture', description: 'Set ceilings', details: 'Tokens, attempts, latency', considerations: ['Underestimation'], bestPractices: ['Telemetry baselines'], patterns: ['budget-constrained-execution'], examples: ['budgets={maxTokens:50k}'] },
    { id: 'schedule-executable', title: 'Schedule Executable Steps', category: 'context', description: 'Topological readiness', details: 'Track dependencies', considerations: ['Cycle detection'], bestPractices: ['Maintain in-degree map'], patterns: ['budget-constrained-execution'], examples: ['queue.push(root)'] },
    { id: 'enforce-budgets', title: 'Budget Enforcement', category: 'evaluation', description: 'Check remaining limits', details: 'Stop when violated', considerations: ['Grace margin'], bestPractices: ['Centralize counters'], patterns: ['budget-constrained-execution'], examples: ['if(tokens>max) break'] }
  ],
  architecture: {
    components: [
      { name: 'Execution Controller', type: 'control', description: 'Main loop & scheduling' },
      { name: 'Budget Tracker', type: 'control', description: 'Aggregates resource usage' },
      { name: 'Grounding Adapter', type: 'processing', description: 'Invokes grounding pattern' },
      { name: 'Evaluator', type: 'processing', description: 'Result success criteria' },
      { name: 'Metrics Store', type: 'storage', description: 'Usage & outcomes' }
    ],
    flows: [
      { from: 'Execution Controller', to: 'Grounding Adapter', description: 'Plan step' },
      { from: 'Grounding Adapter', to: 'Evaluator', description: 'Executed result' },
      { from: 'Evaluator', to: 'Budget Tracker', description: 'Cost metrics' },
      { from: 'Budget Tracker', to: 'Execution Controller', description: 'Budget status' }
    ]
  }
};
