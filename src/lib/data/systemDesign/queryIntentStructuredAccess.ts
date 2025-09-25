import { SystemDesignPattern } from './types';

export const queryIntentStructuredAccessSystemDesign: SystemDesignPattern = {
  id: 'query-intent-structured-access',
  name: 'Query Intent → Structured Access System Design',
  overview: 'NL query → structured access plan with entity binding & policy enforcement.',
  problemStatement: 'Direct NL → SQL mapping causes hallucinated joins & policy violations.',
  solution: 'Introduce intermediate structured plan artifact validated before generation.',
  steps: [
  { id: 'bind', title: 'Entity Binding', category: 'context', description: 'Map text spans to schema synonyms', details: 'Embedding + lexical', considerations: ['Ambiguous homonyms'], bestPractices: ['Confidence thresholds'], patterns: ['query-intent-structured-access'], examples: ['bind("conversions by channel")'] }
  ],
  architecture: {
    components: [
      { name: 'Intent Classifier', type: 'processing', description: 'Determines query archetype' },
      { name: 'Entity Binder', type: 'processing', description: 'Resolves entities' },
      { name: 'Parameter Validator', type: 'processing', description: 'Validates ranges & groupings' },
      { name: 'Access Policy Engine', type: 'processing', description: 'Applies governance filters' },
      { name: 'Plan Emitter', type: 'processing', description: 'Builds structured plan JSON' }
    ],
    flows: [
      { from: 'Intent Classifier', to: 'Entity Binder', description: 'Intent context' },
      { from: 'Entity Binder', to: 'Parameter Validator', description: 'Bound entities' },
      { from: 'Parameter Validator', to: 'Access Policy Engine', description: 'Validated params' }
    ]
  }
};
