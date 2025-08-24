import { SystemDesignPattern } from './types';

export const handoffSummarizerSystemDesign: SystemDesignPattern = {
  id: 'handoff-summarizer',
  name: 'Handoff Summarizer System Design',
  overview: 'Compresses conversation context into structured, lossless briefs for agent or human handoffs.',
  problemStatement: 'Context loss during handoffs causes repetition and errors.',
  solution: 'Generate audience-tailored brief with decisions, open threads, and next actions.',
  steps: [
    { id: 'ingest', title: 'Ingest Context', category: 'knowledge', description: 'Collect messages, files, and state.', details: 'Apply filters and redaction.', considerations: ['PII leakage'], bestPractices: ['PII scrub'] },
  { id: 'structure', title: 'Structure Summary', category: 'architecture', description: 'Organize into Decisions, Rationale, Risks, Next Actions.', details: 'Use schema.', considerations: ['Overcompression'], bestPractices: ['Section caps'] },
    { id: 'tailor', title: 'Tailor to Audience', category: 'instruction', description: 'Adjust tone/detail for next agent or human.', details: 'Include capability map.', considerations: ['Mismatched tone'], bestPractices: ['Persona prompts'] }
  ],
  architecture: {
    components: [
      { name: 'Context Collector', type: 'input', description: 'Gathers sources and metadata' },
      { name: 'Redaction Service', type: 'processing', description: 'Removes secrets/PII' },
      { name: 'Summarizer LLM', type: 'processing', description: 'Builds structured brief' },
      { name: 'Brief Store', type: 'storage', description: 'Saves handoff briefs' }
    ],
    flows: [
      { from: 'Context Collector', to: 'Redaction Service', description: 'Sanitize content' },
      { from: 'Redaction Service', to: 'Summarizer LLM', description: 'Create brief' },
      { from: 'Summarizer LLM', to: 'Brief Store', description: 'Persist final brief' }
    ]
  }
};
