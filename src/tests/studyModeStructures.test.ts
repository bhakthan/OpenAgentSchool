import { describe, it, expect } from 'vitest';
import { patternMasteryBands, allMasteryPatternIds } from '../lib/data/studyMode/patternMastery';
import { failureModes } from '../lib/data/studyMode/failureModes';
import { transferChallenges } from '../lib/data/studyMode/transferChallenges';

describe('Study Mode structural coverage', () => {
  it('all patterns have 4 mastery tiers', () => {
    const grouped: Record<string, number> = {};
    for (const band of patternMasteryBands) {
      grouped[band.patternId] = (grouped[band.patternId] || 0) + 1;
    }
    for (const id of allMasteryPatternIds) {
      expect(grouped[id]).toBe(4);
    }
  });

  it('each pattern has at least 3 failure modes', () => {
    const map: Record<string, number> = {};
    for (const fm of failureModes) {
      map[fm.patternId] = (map[fm.patternId] || 0) + 1;
    }
    for (const id of allMasteryPatternIds) {
      expect(map[id]).toBeGreaterThanOrEqual(3);
    }
  });

  it('transfer challenges reference valid patterns', () => {
    const valid = new Set(allMasteryPatternIds);
    for (const tc of transferChallenges) {
      for (const p of tc.compositePatterns) {
        expect(valid.has(p)).toBe(true);
      }
    }
  });
});
