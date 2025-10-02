import { PatternData } from './types';
import { QueryIntentAccessVisual } from '@/components/visualization/business-use-cases/QueryIntentAccessVisual';

export const queryIntentStructuredAccessPattern: PatternData = {
  id: 'query-intent-structured-access',
  name: 'Query Intent → Structured Access',
  description: 'Maps NL analytical queries to canonical structured access plans with entity binding, parameter validation, and policy checks.',
  category: 'Data Autonomy',
  relatedPatterns: ['perception-normalization', 'schema-aware-decomposition', 'action-grounding-verification'],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 days',
    complexityReduction: 'High - Eliminates SQL hallucination errors, reduces query debugging time by 70-80% via entity binding',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Data access pattern for analytics platforms, BI tools, data warehouses, self-service analytics',
      'Architecture Templates - Azure OpenAI + semantic layer provide NL-to-SQL with entity resolution',
      'Failure Scenario Libraries - Join hallucinations, metric misalignment, filter logic errors documented',
      'Evaluation Automation - Query correctness rate, execution success rate, result accuracy metrics standard'
    ]
  },

  businessUseCase: {
    industry: 'Marketing Analytics',
    description: 'User asks: “Compare last quarter conversion lift by channel excluding trial-only cohorts.” Pattern produces structured plan with validated entities, metrics, and filters before generation.',
    visualization: QueryIntentAccessVisual,
    enlightenMePrompt: 'Explain how binding entities before SQL generation reduces hallucinated join errors.'
  },
  nodes: [
    { id: 'nlq', type: 'input', data: { label: 'NL Query', nodeType: 'input' }, position: { x: 60, y: 180 } },
    { id: 'class', type: 'default', data: { label: 'Intent Classifier', nodeType: 'planner' }, position: { x: 240, y: 120 } },
    { id: 'bind', type: 'default', data: { label: 'Entity Binder', nodeType: 'tool' }, position: { x: 240, y: 240 } },
    { id: 'params', type: 'default', data: { label: 'Param Validator', nodeType: 'evaluator' }, position: { x: 460, y: 180 } },
    { id: 'policy', type: 'default', data: { label: 'Access Policy', nodeType: 'evaluator' }, position: { x: 680, y: 180 } },
    { id: 'plan', type: 'output', data: { label: 'Structured Plan', nodeType: 'output' }, position: { x: 900, y: 180 } }
  ],
  edges: [
    { id: 'q1', source: 'nlq', target: 'class', animated: true },
    { id: 'q2', source: 'nlq', target: 'bind', animated: true },
    { id: 'q3', source: 'class', target: 'params', animated: true },
    { id: 'q4', source: 'bind', target: 'params', animated: true },
    { id: 'q5', source: 'params', target: 'policy', animated: true },
    { id: 'q6', source: 'policy', target: 'plan', animated: true },
    { id: 'q7', source: 'policy', target: 'bind', label: 'Refine', animated: true }
  ],
  useCases: [
    'Text-to-SQL staging with pre-validation',
    'Semantic BI query structuring',
    'Adaptive query templating for dashboards'
  ],
  whenToUse: 'Use when natural language queries risk ambiguous entity mapping or unauthorized data exposure.',
  advantages: [
    'Reduces downstream SQL regeneration',
    'Improves access governance compliance',
    'Creates reusable structured query artifacts'
  ],
  limitations: [
    'Classifier drift may misroute intent',
    'Requires maintained entity dictionary',
    'Adds staging latency'
  ],
  implementation: [
    'Step 1: Classify query intent category (trend, compare, distribution).',
    'Step 2: Bind referenced entities using schema synonyms + embeddings.',
    'Step 3: Validate parameters (date ranges, metric types, groupings).',
    'Step 4: Enforce access policies (row-level filters, sensitive joins).',
    'Step 5: Emit structured plan JSON to feed generation / decomposition.'
  ],
  codeExample: `// TypeScript structured access skeleton\ninterface AccessPlan { entities: string[]; metrics: string[]; filters: any[]; intent: string; authorized: boolean; }\n\nexport function buildAccessPlan(nl: string, classifier: any, binder: any, validator: any, policy: any): AccessPlan {\n  const intent = classifier.classify(nl);\n  const entities = binder.bind(nl);\n  const { metrics, filters } = validator.validate(nl, entities, intent);\n  const auth = policy.check({ entities, filters, metrics });\n  return { entities, metrics, filters, intent, authorized: auth.allowed };\n}\n`,
  pythonCodeExample: `# Python structured access skeleton\ndef build_access_plan(nl, classifier, binder, validator, policy):\n    intent = classifier.classify(nl)\n    entities = binder.bind(nl)\n    metrics, filters = validator.validate(nl, entities, intent)\n    auth = policy.check({'entities': entities, 'filters': filters, 'metrics': metrics})\n    return {'entities': entities, 'metrics': metrics, 'filters': filters, 'intent': intent, 'authorized': auth['allowed']}\n`,
  completeCode: ''
};
