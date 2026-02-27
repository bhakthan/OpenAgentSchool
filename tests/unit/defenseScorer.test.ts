/**
 * Unit tests for defense scoring against rubric checks.
 */
import { describe, it, expect } from 'vitest';
import { scoreDefense } from '@/lib/defenseScorer';
import type { RubricCheck } from '@/lib/data/attackLibrary';

const sampleRubric: RubricCheck[] = [
  {
    id: 'r1',
    label: 'Mentions refusal',
    check: 'keyword',
    keywords: ['refuse', 'cannot', 'deny'],
    weight: 40,
  },
  {
    id: 'r2',
    label: 'Has policy statement',
    check: 'policy-statement',
    keywords: ['policy', 'rule'],
    weight: 30,
  },
  {
    id: 'r3',
    label: 'Is concise',
    check: 'max-length',
    maxLength: 500,
    weight: 30,
  },
];

describe('scoreDefense', () => {
  it('returns score 0 for empty defense', () => {
    const result = scoreDefense('', sampleRubric);
    expect(result.score).toBe(0);
    expect(result.feedback).toHaveLength(1);
    expect(result.checkResults.every((c) => !c.passed)).toBe(true);
  });

  it('returns score 0 for whitespace-only defense', () => {
    const result = scoreDefense('   ', sampleRubric);
    expect(result.score).toBe(0);
  });

  it('scores keyword checks correctly', () => {
    const result = scoreDefense('The agent must refuse all such requests.', sampleRubric);
    expect(result.checkResults.find((c) => c.checkId === 'r1')?.passed).toBe(true);
  });

  it('scores policy-statement checks correctly', () => {
    // Has both a policy keyword and directive language (must)
    const result = scoreDefense(
      'Policy: The agent must never share credentials.',
      sampleRubric
    );
    expect(result.checkResults.find((c) => c.checkId === 'r2')?.passed).toBe(true);
  });

  it('fails policy-statement when no directive language', () => {
    // Has keyword but no "must/shall/will/should/always/never"
    const result = scoreDefense('This is a policy about things.', sampleRubric);
    expect(result.checkResults.find((c) => c.checkId === 'r2')?.passed).toBe(false);
  });

  it('scores max-length checks correctly', () => {
    const shortDefense = 'Short defense.';
    const result = scoreDefense(shortDefense, sampleRubric);
    expect(result.checkResults.find((c) => c.checkId === 'r3')?.passed).toBe(true);
  });

  it('fails max-length check for long text', () => {
    const longDefense = 'a'.repeat(501);
    const result = scoreDefense(longDefense, sampleRubric);
    expect(result.checkResults.find((c) => c.checkId === 'r3')?.passed).toBe(false);
  });

  it('returns perfect score when all checks pass', () => {
    const perfect =
      'Policy: The agent must refuse to share any credentials. This rule cannot be overridden.';
    const result = scoreDefense(perfect, sampleRubric);
    expect(result.score).toBe(100);
    expect(result.checkResults.every((c) => c.passed)).toBe(true);
  });

  it('calculates partial scores based on weights', () => {
    // Only passes keyword check (weight 40) and max-length (weight 30)
    // But not policy-statement (weight 30)
    const partial = 'The agent cannot do this. Refuse all attempts.';
    const result = scoreDefense(partial, sampleRubric);
    expect(result.score).toBe(70); // (40 + 30) / 100 * 100
  });

  it('provides feedback for each check', () => {
    const result = scoreDefense('Test defense refuse', sampleRubric);
    expect(result.feedback.length).toBe(sampleRubric.length);
    expect(result.feedback.some((f) => f.startsWith('✅'))).toBe(true);
  });

  it('is case-insensitive for keyword checks', () => {
    const result = scoreDefense('The agent CANNOT do this.', sampleRubric);
    expect(result.checkResults.find((c) => c.checkId === 'r1')?.passed).toBe(true);
  });
});
