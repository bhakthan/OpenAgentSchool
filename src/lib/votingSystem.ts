/**
 * Community Voting System — localStorage-backed voting with rate limiting
 */

const VOTES_KEY = 'oas.communityVotes.v1';
const VOTE_LOG_KEY = 'oas.voteLog.v1';
const REPUTATION_KEY = 'oas.reputation.v1';
const MAX_VOTES_PER_DAY = 10;

export type VoteDirection = 'up' | 'down';

interface VoteStore {
  [postId: string]: { up: number; down: number };
}

interface UserVoteStore {
  [postId: string]: VoteDirection;
}

interface VoteLogEntry {
  date: string;
  count: number;
}

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, data: unknown): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getVotesToday(): number {
  const log = loadJson<VoteLogEntry>(VOTE_LOG_KEY, { date: '', count: 0 });
  return log.date === todayKey() ? log.count : 0;
}

function incrementVoteLog(): void {
  const today = todayKey();
  const log = loadJson<VoteLogEntry>(VOTE_LOG_KEY, { date: today, count: 0 });
  if (log.date !== today) {
    saveJson(VOTE_LOG_KEY, { date: today, count: 1 });
  } else {
    saveJson(VOTE_LOG_KEY, { date: today, count: log.count + 1 });
  }
}

export function isRateLimited(): boolean {
  return getVotesToday() >= MAX_VOTES_PER_DAY;
}

export function getRemainingVotes(): number {
  return Math.max(0, MAX_VOTES_PER_DAY - getVotesToday());
}

export function castVote(
  postId: string,
  direction: VoteDirection
): { success: boolean; reason?: string } {
  if (isRateLimited()) {
    return { success: false, reason: 'Daily vote limit reached (max 10).' };
  }

  const votes = loadJson<VoteStore>(VOTES_KEY, {});
  const userVotes = loadJson<UserVoteStore>(`${VOTES_KEY}.user`, {});

  if (!votes[postId]) votes[postId] = { up: 0, down: 0 };

  const existing = userVotes[postId];

  if (existing === direction) {
    // Toggle off
    votes[postId][direction] = Math.max(0, votes[postId][direction] - 1);
    delete userVotes[postId];
  } else {
    // Remove previous vote if switching
    if (existing) {
      votes[postId][existing] = Math.max(0, votes[postId][existing] - 1);
    }
    votes[postId][direction]++;
    userVotes[postId] = direction;
    incrementVoteLog();
  }

  saveJson(VOTES_KEY, votes);
  saveJson(`${VOTES_KEY}.user`, userVotes);
  return { success: true };
}

export function getVotes(postId: string): { up: number; down: number; net: number } {
  const votes = loadJson<VoteStore>(VOTES_KEY, {});
  const v = votes[postId] ?? { up: 0, down: 0 };
  return { ...v, net: v.up - v.down };
}

export function getUserVote(postId: string): VoteDirection | null {
  const userVotes = loadJson<UserVoteStore>(`${VOTES_KEY}.user`, {});
  return userVotes[postId] ?? null;
}

export function getUserReputation(): number {
  return loadJson<number>(REPUTATION_KEY, 0);
}

export function addReputation(points: number): number {
  const current = getUserReputation();
  const next = current + points;
  saveJson(REPUTATION_KEY, next);
  return next;
}
