import React from 'react';
import { describe, it, expect } from 'vitest';

// Simple bitmask helpers mirroring quiz logic (avoid importing heavy component tree)
function encodeSelections(indices: number[]): number {
  return indices.reduce((mask, idx) => mask | (1 << idx), 0);
}
function decodeSelections(mask: number, optionCount: number): number[] {
  const res: number[] = [];
  for (let i = 0; i < optionCount; i++) {
    if (mask & (1 << i)) res.push(i);
  }
  return res;
}

describe('Multi-select bitmask encoding/decoding', () => {
  it('encodes unique indices correctly', () => {
    expect(encodeSelections([0,2,3])).toBe((1<<0)|(1<<2)|(1<<3));
  });
  it('decodes mask back to indices', () => {
    const mask = (1<<1)|(1<<4);
    expect(decodeSelections(mask, 6)).toEqual([1,4]);
  });
  it('round trip symmetry', () => {
    const original = [0,3,5];
    const mask = encodeSelections(original);
    expect(decodeSelections(mask, 8)).toEqual(original);
  });
  it('empty selection yields mask 0 and decodes to []', () => {
    expect(encodeSelections([])).toBe(0);
    expect(decodeSelections(0,5)).toEqual([]);
  });
  it('extra selection changes mask value', () => {
    const base = encodeSelections([1,2]);
    const withExtra = encodeSelections([1,2,4]);
    expect(withExtra).not.toBe(base);
  });
});
