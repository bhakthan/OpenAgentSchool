import { describe, it, expect } from 'vitest';
import { getNodeFill, type MinimalTreeNode } from '../../src/lib/visualization/utils';

describe('visualization utils - getNodeFill', () => {
  const base: Omit<MinimalTreeNode, 'type'> = { id: 'x' };

  it('returns transparent variant for root', () => {
    expect(getNodeFill({ ...base, type: 'root' })).toMatch(/3b82f6/);
  });

  it('returns category purple', () => {
    expect(getNodeFill({ ...base, type: 'category' })).toBe('#8b5cf6');
  });

  it('returns pattern educational override for special IDs', () => {
    expect(getNodeFill({ id: 'socratic-coach', type: 'pattern' })).toBe('#d97706');
  });

  it('returns default pattern color for non-educational patterns', () => {
    expect(getNodeFill({ id: 'regular-pattern', type: 'pattern' })).toBe('#f59e0b');
  });

  it('falls back to gray for unknown type (cast)', () => {
    expect(getNodeFill({ id: 'weird', type: 'unknown' as any })).toBe('#6b7280');
  });
});
