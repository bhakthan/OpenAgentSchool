import { QuizQuestion } from './types';

// 3-question micro quiz for Agent Ops & Reliability
export const agentOpsQuestions: QuizQuestion[] = [
  {
    id: 'agent-ops-q1',
    text: 'Which combination best represents golden signals specific to agent operational health (beyond generic service CPU/memory)?',
    question: 'Golden signals for agent ops',
    options: [
      'CPU usage, heap size, disk throughput',
      'Tool call success %, tail latency (P95/P99), context inflation rate, confidence correction rate',
      'Number of feature flags, lines of code, open PR count',
      'Daily standup length, developer velocity, story points'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-ops',
    subCategory: 'agent-ops-core',
    explanation: 'Agent reliability focuses on capability pathways: external tool success, latency tails, context size growth (risk of truncation), and mismatch between displayed vs corrected answers (confidence drift).',
    relatedConcepts: ['agent-ops','agent-deployment','agent-security'],
    timeEstimate: 45,
    learningObjectives: ['Recognize agent-specific golden signals']
  },
  {
    id: 'agent-ops-q2',
    text: 'An upstream embedding service begins timing out intermittently. Best immediate graceful degradation action?',
    question: 'Graceful degradation choice',
    options: [
      'Retry indefinitely until success',
      'Silently drop all embedding usage',
      'Apply circuit breaker, fall back to cached / last-known vectors, surface partial quality notice',
      'Block all user requests until service stabilizes'
    ],
    correctAnswer: 2,
    difficulty: 'intermediate',
    category: 'agent-ops',
    subCategory: 'agent-ops-core',
    explanation: 'Containing the blast radius + preserving partial functionality with transparency maintains trust and avoids cascading retries.',
    relatedConcepts: ['agent-ops','graceful-degradation','trust-engineering'],
    timeEstimate: 40,
    learningObjectives: ['Apply graceful degradation with trust-preserving messaging']
  },
  {
    id: 'agent-ops-q3',
    text: 'Which rollback strategy best limits user impact after a miscalibrated confidence display caused user churn?',
    question: 'Rollback strategy',
    options: [
      'Hard disable confidence UI globally (no replacement)',
      'Gradual feature flag rollback + A/B of calibrated variant + monitor retention & complaint rate',
      'Force users to re-onboard before using agent again',
      'Purge all logs and redeploy from scratch'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-ops',
    subCategory: 'agent-ops-core',
    explanation: 'Targeted rollback with controlled experiment isolates fix impact while protecting trust signals; hard removal sacrifices learning signal.',
    relatedConcepts: ['agent-ops','product-management','confidence-calibration'],
    timeEstimate: 50,
    learningObjectives: ['Design data-informed rollback sequencing']
  }
];
