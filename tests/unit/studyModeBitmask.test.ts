import { describe, it, expect } from 'vitest';

// Bitmask helpers (mirrors quiz multi-select logic)
function encodeSelections(indices: number[]): number {
  return indices.reduce((mask, idx) => mask | (1 << idx), 0);
}
function decodeSelections(mask: number, optionCount: number): number[] {
  const res: number[] = [];
  for (let i = 0; i < optionCount; i++) if (mask & (1 << i)) res.push(i);
  return res;
}

// Unlock logic replica (kept pure for test):
// scenario: >=2 socratic complete, debug: >=1 scenario, scl: >=1 debug & avgScore >=60
interface Session { type: 'socratic'|'scenario'|'debug'|'guided'|'scl'; isComplete: boolean; }
function isTypeUnlocked(type: Session['type'], sessions: Session[], averageScore: number) {
  if (type === 'socratic' || type === 'guided') return true;
  const completed = sessions.filter(s => s.isComplete);
  const byType = (t: Session['type']) => completed.filter(s => s.type === t);
  switch (type) {
    case 'scenario': return byType('socratic').length >= 2;
    case 'debug': return byType('scenario').length >= 1;
    case 'scl': return byType('debug').length >= 1 && averageScore >= 60;
    default: return true;
  }
}

describe('Study Mode multi-select bitmask', () => {
  it('encodes & decodes round trip', () => {
    const indices = [0,2,5];
    const mask = encodeSelections(indices);
    expect(decodeSelections(mask, 8)).toEqual(indices);
  });
  it('empty selection', () => {
    expect(encodeSelections([])).toBe(0);
    expect(decodeSelections(0, 5)).toEqual([]);
  });
  it('bit difference when adding selection', () => {
    const base = encodeSelections([1,3]);
    const more = encodeSelections([1,3,4]);
    expect(base).not.toBe(more);
  });
});

describe('Study Mode unlock gating logic', () => {
  it('locks scenario until two socratic complete', () => {
    const sessions: Session[] = [
      { type: 'socratic', isComplete: true },
      { type: 'socratic', isComplete: false }
    ];
    expect(isTypeUnlocked('scenario', sessions, 0)).toBe(false);
    sessions.push({ type: 'socratic', isComplete: true });
    expect(isTypeUnlocked('scenario', sessions, 0)).toBe(true);
  });
  it('locks debug until one scenario complete', () => {
    const sessions: Session[] = [ { type: 'socratic', isComplete: true }, { type: 'socratic', isComplete: true } ];
    expect(isTypeUnlocked('debug', sessions, 0)).toBe(false);
    sessions.push({ type: 'scenario', isComplete: true });
    expect(isTypeUnlocked('debug', sessions, 0)).toBe(true);
  });
  it('locks scl until debug + avg score threshold', () => {
    const sessions: Session[] = [ { type: 'socratic', isComplete: true }, { type: 'scenario', isComplete: true }, { type: 'debug', isComplete: true } ];
    expect(isTypeUnlocked('scl', sessions, 55)).toBe(false);
    expect(isTypeUnlocked('scl', sessions, 60)).toBe(true);
  });
});
