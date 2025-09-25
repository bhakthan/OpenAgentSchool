import { describe, test, expect } from 'vitest';
import { agentPatterns } from '@/lib/data/patterns';
import { systemDesignPatterns } from '@/lib/data/systemDesign';

// Use Vitest globals (configured via environment); if not available, this file will be ignored in build.

// Lightweight integrity test ensuring new Data Autonomy patterns are wired everywhere.
describe('Data Autonomy pattern registry integrity', () => {
  const expectedIds = [
    'perception-normalization',
    'schema-aware-decomposition',
    'action-grounding-verification',
    'budget-constrained-execution',
    'policy-gated-tool-invocation',
    'data-quality-feedback-repair-loop',
    'query-intent-structured-access',
    'strategy-memory-replay'
  ];

  test('all expected pattern IDs exist in agentPatterns', () => {
    const present = agentPatterns.map(p => p.id);
    for (const id of expectedIds) {
      expect(present).toContain(id);
    }
  });

  test('system design registry contains entries for all expected IDs', () => {
    for (const id of expectedIds) {
      expect(systemDesignPatterns[id]).toBeTruthy();
    }
  });
});
