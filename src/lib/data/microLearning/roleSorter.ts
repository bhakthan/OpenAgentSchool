// ─── Micro-Learning Role Sorter Data ─────────────────────────────────────────
// 3-question flow that maps learners to recommended tracks.

import type { SorterQuestion, LearnerRole, ExperienceLevel, LearnerGoal, RoleProfile } from './types';

export const SORTER_QUESTIONS: SorterQuestion[] = [
  {
    id: 'role',
    question: 'What best describes your primary role?',
    options: [
      { label: 'Developer', value: 'developer', description: 'I write code and build systems', icon: 'Code' },
      { label: 'Product Manager', value: 'product-manager', description: 'I define what we build and why', icon: 'Lightbulb' },
      { label: 'Business Leader', value: 'business-leader', description: 'I make strategic decisions and lead teams', icon: 'Briefcase' },
      { label: 'AI Engineer', value: 'ai-engineer', description: 'I specialize in ML/AI infrastructure', icon: 'Brain' },
    ],
  },
  {
    id: 'experience',
    question: 'What\'s your experience with AI agents?',
    options: [
      { label: 'Completely New', value: 'new', description: 'I\'m just getting started', icon: 'Seedling' },
      { label: 'Some Experience', value: 'some-experience', description: 'I\'ve tried a few tools or tutorials', icon: 'TrendUp' },
      { label: 'Building in Production', value: 'building-in-production', description: 'I have agents running in real systems', icon: 'Rocket' },
    ],
  },
  {
    id: 'goal',
    question: 'What do you want to achieve first?',
    options: [
      { label: 'Build My First Agent', value: 'build-first-agent', description: 'Go from zero to a working agent', icon: 'RocketLaunch' },
      { label: 'Master Prompt Engineering', value: 'improve-prompts', description: 'Craft prompts that actually work', icon: 'PencilLine' },
      { label: 'Secure My Deployments', value: 'secure-deployments', description: 'Ship agents my security team approves', icon: 'ShieldCheck' },
      { label: 'Lead AI Strategy', value: 'lead-ai-strategy', description: 'Drive organizational AI transformation', icon: 'Strategy' },
      { label: 'Go Deeper', value: 'go-deeper', description: 'Advanced patterns, multi-agent, edge/frontier', icon: 'ArrowDown' },
    ],
  },
];

// ─── Scoring Matrix ──────────────────────────────────────────────────────────
// Maps (role × experience × goal) → ordered list of recommended track IDs.
// Tracks listed first = highest relevance.

interface ScoreEntry {
  trackId: string;
  /** Base relevance score (1–10) */
  score: number;
}

const ROLE_WEIGHTS: Record<string, Record<string, number>> = {
  developer:         { 'zero-to-agent': 8, 'prompt-engineering-mastery': 7, 'multi-agent-architect': 6, 'deploy-and-operate': 7, 'secure-and-govern': 5, 'ai-product-leader': 2, 'edge-and-frontier': 4 },
  'product-manager': { 'zero-to-agent': 7, 'prompt-engineering-mastery': 4, 'multi-agent-architect': 2, 'deploy-and-operate': 3, 'secure-and-govern': 5, 'ai-product-leader': 9, 'edge-and-frontier': 1 },
  'business-leader': { 'zero-to-agent': 6, 'prompt-engineering-mastery': 3, 'multi-agent-architect': 1, 'deploy-and-operate': 2, 'secure-and-govern': 6, 'ai-product-leader': 9, 'edge-and-frontier': 1 },
  'ai-engineer':     { 'zero-to-agent': 5, 'prompt-engineering-mastery': 7, 'multi-agent-architect': 8, 'deploy-and-operate': 8, 'secure-and-govern': 5, 'ai-product-leader': 2, 'edge-and-frontier': 9 },
};

const EXPERIENCE_WEIGHTS: Record<string, Record<string, number>> = {
  'new':                    { 'zero-to-agent': 5, 'prompt-engineering-mastery': 2, 'multi-agent-architect': 0, 'deploy-and-operate': 0, 'secure-and-govern': 1, 'ai-product-leader': 2, 'edge-and-frontier': 0 },
  'some-experience':        { 'zero-to-agent': 3, 'prompt-engineering-mastery': 4, 'multi-agent-architect': 3, 'deploy-and-operate': 3, 'secure-and-govern': 3, 'ai-product-leader': 3, 'edge-and-frontier': 2 },
  'building-in-production': { 'zero-to-agent': 0, 'prompt-engineering-mastery': 3, 'multi-agent-architect': 5, 'deploy-and-operate': 5, 'secure-and-govern': 4, 'ai-product-leader': 3, 'edge-and-frontier': 5 },
};

const GOAL_WEIGHTS: Record<string, Record<string, number>> = {
  'build-first-agent':  { 'zero-to-agent': 10, 'prompt-engineering-mastery': 3, 'multi-agent-architect': 0, 'deploy-and-operate': 0, 'secure-and-govern': 0, 'ai-product-leader': 0, 'edge-and-frontier': 0 },
  'improve-prompts':    { 'zero-to-agent': 2, 'prompt-engineering-mastery': 10, 'multi-agent-architect': 0, 'deploy-and-operate': 0, 'secure-and-govern': 0, 'ai-product-leader': 0, 'edge-and-frontier': 0 },
  'secure-deployments': { 'zero-to-agent': 0, 'prompt-engineering-mastery': 0, 'multi-agent-architect': 0, 'deploy-and-operate': 3, 'secure-and-govern': 10, 'ai-product-leader': 0, 'edge-and-frontier': 0 },
  'lead-ai-strategy':   { 'zero-to-agent': 2, 'prompt-engineering-mastery': 0, 'multi-agent-architect': 0, 'deploy-and-operate': 0, 'secure-and-govern': 3, 'ai-product-leader': 10, 'edge-and-frontier': 0 },
  'go-deeper':          { 'zero-to-agent': 0, 'prompt-engineering-mastery': 2, 'multi-agent-architect': 5, 'deploy-and-operate': 3, 'secure-and-govern': 2, 'ai-product-leader': 0, 'edge-and-frontier': 8 },
};

const ALL_TRACK_IDS = [
  'zero-to-agent',
  'prompt-engineering-mastery',
  'secure-and-govern',
  'multi-agent-architect',
  'deploy-and-operate',
  'ai-product-leader',
  'edge-and-frontier',
];

/**
 * Compute recommended tracks for the given learner profile.
 * Returns track IDs ordered by composite score (descending), top 3.
 */
export function computeRecommendedTracks(
  role: LearnerRole,
  experience: ExperienceLevel,
  goal: LearnerGoal,
): string[] {
  const scores: ScoreEntry[] = ALL_TRACK_IDS.map((trackId) => {
    const r = ROLE_WEIGHTS[role]?.[trackId] ?? 3;
    const e = EXPERIENCE_WEIGHTS[experience]?.[trackId] ?? 2;
    const g = GOAL_WEIGHTS[goal]?.[trackId] ?? 0;
    // Weighted composite: goal matters most, then role, then experience
    const score = g * 3 + r * 2 + e * 1;
    return { trackId, score };
  });

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 3).map((s) => s.trackId);
}

/**
 * Build a full RoleProfile from sorter answers.
 */
export function buildRoleProfile(
  role: LearnerRole,
  experience: ExperienceLevel,
  goal: LearnerGoal,
): RoleProfile {
  return {
    role,
    experience,
    goal,
    recommendedTrackIds: computeRecommendedTracks(role, experience, goal),
    completedAt: new Date().toISOString(),
  };
}
