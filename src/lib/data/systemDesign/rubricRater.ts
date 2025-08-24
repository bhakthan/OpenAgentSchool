import { SystemDesignPattern } from './types';

export const rubricRaterSystemDesign: SystemDesignPattern = {
  id: 'rubric-rater',
  name: 'Rubric Rater System Design',
  overview: 'Scores artifacts against transparent criteria and suggests concrete improvements.',
  problemStatement: 'Manual grading is slow and inconsistent; feedback often lacks actionable guidance.',
  solution: 'Normalize rubric, score per criterion with evidence, aggregate, and return three deltas with examples.',
  steps: [
    { id: 'normalize', title: 'Rubric Normalization', category: 'context', description: 'Parse criteria/weights/levels.', details: 'Enforce schema and weights sum.', considerations: ['Ambiguity'], bestPractices: ['Define exemplars'] },
    { id: 'score', title: 'Criterion Scoring', category: 'evaluation', description: 'Score with rationale and evidence links.', details: 'Reference specific lines/sections.', considerations: ['Bias'], bestPractices: ['Blind artifacts where possible'] },
    { id: 'deltas', title: 'Improvement Deltas', category: 'instruction', description: 'Suggest 3 concrete improvements.', details: 'Each with example or snippet.', considerations: ['Over-prescription'], bestPractices: ['Keep minimal and clear'] }
  ],
  architecture: {
    components: [
      { name: 'Rubric Store', type: 'storage', description: 'Stores normalized rubrics' },
      { name: 'Rater LLM', type: 'processing', description: 'Scores and explains' },
      { name: 'Evidence Extractor', type: 'processing', description: 'Finds lines/snippets' },
      { name: 'Report Output', type: 'output', description: 'Scores, rationales, deltas' }
    ],
    flows: [
      { from: 'Rubric Store', to: 'Rater LLM', description: 'Provide criteria and weights' },
      { from: 'Rater LLM', to: 'Evidence Extractor', description: 'Link evidence' },
      { from: 'Evidence Extractor', to: 'Report Output', description: 'Assemble final report' }
    ]
  }
};
