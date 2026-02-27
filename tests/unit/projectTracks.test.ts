import { describe, expect, it, beforeEach } from 'vitest';
import {
  getTrackProgress,
  completeMilestone,
  uncompleteMilestone,
  getCompletedTracks,
  resetTrackProgress,
} from '@/lib/trackProgress';

const STORAGE_KEY = 'oas.trackProgress.v1';

describe('trackProgress', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('returns empty array for unknown track', () => {
    expect(getTrackProgress('nonexistent')).toEqual([]);
  });

  it('completes a milestone and persists it', () => {
    const result = completeMilestone('track-1', 'ms-1');
    expect(result).toEqual(['ms-1']);
    expect(getTrackProgress('track-1')).toEqual(['ms-1']);
  });

  it('does not duplicate milestone completions', () => {
    completeMilestone('track-1', 'ms-1');
    const result = completeMilestone('track-1', 'ms-1');
    expect(result).toEqual(['ms-1']);
  });

  it('completes multiple milestones', () => {
    completeMilestone('track-1', 'ms-1');
    completeMilestone('track-1', 'ms-2');
    expect(getTrackProgress('track-1')).toEqual(['ms-1', 'ms-2']);
  });

  it('uncompletes a milestone', () => {
    completeMilestone('track-1', 'ms-1');
    completeMilestone('track-1', 'ms-2');
    const result = uncompleteMilestone('track-1', 'ms-1');
    expect(result).toEqual(['ms-2']);
  });

  it('returns empty for uncomplete on unknown track', () => {
    expect(uncompleteMilestone('track-x', 'ms-1')).toEqual([]);
  });

  it('detects completed tracks', () => {
    completeMilestone('track-1', 'ms-1');
    completeMilestone('track-1', 'ms-2');
    const completed = getCompletedTracks([
      { id: 'track-1', milestoneCount: 2 },
      { id: 'track-2', milestoneCount: 3 },
    ]);
    expect(completed).toEqual(['track-1']);
  });

  it('resets track progress', () => {
    completeMilestone('track-1', 'ms-1');
    resetTrackProgress('track-1');
    expect(getTrackProgress('track-1')).toEqual([]);
  });
});
