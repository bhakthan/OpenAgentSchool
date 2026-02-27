import { describe, expect, it, beforeEach } from 'vitest';
import {
  castVote,
  getVotes,
  getUserVote,
  isRateLimited,
  getRemainingVotes,
  getUserReputation,
  addReputation,
} from '@/lib/votingSystem';

const VOTES_KEY = 'oas.communityVotes.v1';
const VOTE_LOG_KEY = 'oas.voteLog.v1';
const REPUTATION_KEY = 'oas.reputation.v1';

function clearStorage() {
  localStorage.removeItem(VOTES_KEY);
  localStorage.removeItem(`${VOTES_KEY}.user`);
  localStorage.removeItem(VOTE_LOG_KEY);
  localStorage.removeItem(REPUTATION_KEY);
}

describe('votingSystem', () => {
  beforeEach(() => {
    clearStorage();
  });

  it('starts with zero votes', () => {
    const v = getVotes('post-1');
    expect(v).toEqual({ up: 0, down: 0, net: 0 });
  });

  it('casts an upvote', () => {
    const result = castVote('post-1', 'up');
    expect(result.success).toBe(true);
    expect(getVotes('post-1')).toEqual({ up: 1, down: 0, net: 1 });
    expect(getUserVote('post-1')).toBe('up');
  });

  it('casts a downvote', () => {
    castVote('post-1', 'down');
    expect(getVotes('post-1')).toEqual({ up: 0, down: 1, net: -1 });
    expect(getUserVote('post-1')).toBe('down');
  });

  it('toggles off a vote on same direction', () => {
    castVote('post-1', 'up');
    castVote('post-1', 'up'); // toggle off
    expect(getVotes('post-1')).toEqual({ up: 0, down: 0, net: 0 });
    expect(getUserVote('post-1')).toBeNull();
  });

  it('switches vote direction', () => {
    castVote('post-1', 'up');
    castVote('post-1', 'down');
    expect(getVotes('post-1')).toEqual({ up: 0, down: 1, net: -1 });
    expect(getUserVote('post-1')).toBe('down');
  });

  it('enforces rate limit of 10 votes per day', () => {
    for (let i = 0; i < 10; i++) {
      const r = castVote(`post-${i}`, 'up');
      expect(r.success).toBe(true);
    }
    expect(isRateLimited()).toBe(true);
    expect(getRemainingVotes()).toBe(0);
    const r = castVote('post-11', 'up');
    expect(r.success).toBe(false);
    expect(r.reason).toContain('limit');
  });

  it('tracks reputation', () => {
    expect(getUserReputation()).toBe(0);
    addReputation(5);
    expect(getUserReputation()).toBe(5);
    addReputation(3);
    expect(getUserReputation()).toBe(8);
  });
});
