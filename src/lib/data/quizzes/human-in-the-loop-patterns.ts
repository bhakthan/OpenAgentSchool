// Quiz questions for Human-in-the-Loop Patterns concept
// Covers: Approval workflows, escalation, oversight, hybrid autonomy

import type { QuizQuestion } from '../quizzes';

export const humanInTheLoopPatternsQuestions: QuizQuestion[] = [
  {
    id: 'hitl-1',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is the primary purpose of human-in-the-loop (HITL) patterns?',
    options: [
      'Replacing human workers',
      'Adding human oversight and approval for agent actions',
      'Training AI models',
      'Reducing computational costs'
    ],
    correctAnswer: 1,
    explanation: 'HITL patterns ensure humans can review, approve, or override agent decisions—especially for high-stakes, irreversible, or sensitive actions.',
    difficulty: 'beginner',
    category: 'patterns'
  },
  {
    id: 'hitl-2',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is "tiered approval" in HITL workflows?',
    options: [
      'All actions need CEO approval',
      'Different risk levels trigger different approval requirements',
      'Only first-tier actions are allowed',
      'Approval from multiple tiers simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Tiered approval matches approval requirements to risk: low-risk actions auto-approve, medium-risk needs team lead approval, high-risk needs senior approval.',
    difficulty: 'intermediate',
    category: 'patterns'
  },
  {
    id: 'hitl-3',
    conceptId: 'human-in-the-loop-patterns',
    question: 'When should an agent escalate to a human?',
    options: [
      'Never—agents should be fully autonomous',
      'When confidence is low, stakes are high, or explicit user request',
      'Only when errors occur',
      'Every single action'
    ],
    correctAnswer: 1,
    explanation: 'Escalation triggers include: low confidence scores, high-stakes decisions, ambiguous situations, policy violations, and explicit user requests for human review.',
    difficulty: 'intermediate',
    category: 'patterns'
  },
  {
    id: 'hitl-4',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is "supervision level" in agent autonomy?',
    options: [
      'The rank of the supervisor',
      'The degree of human oversight required for different agent actions',
      'The number of supervisors',
      'The AI model size'
    ],
    correctAnswer: 1,
    explanation: 'Supervision levels range from full autonomy (no approval) to human-in-the-loop (approval before action) to human-on-the-loop (monitoring with veto power).',
    difficulty: 'intermediate',
    category: 'patterns'
  },
  {
    id: 'hitl-5',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is the "approval queue" problem?',
    options: [
      'Too few items need approval',
      'Approval requests pile up faster than humans can process them',
      'Approvals are too fast',
      'The queue is empty'
    ],
    correctAnswer: 1,
    explanation: 'If too many actions require approval and reviewer capacity is limited, queues grow, SLAs break, and the system becomes a bottleneck.',
    difficulty: 'intermediate',
    category: 'patterns'
  },
  {
    id: 'hitl-6',
    conceptId: 'human-in-the-loop-patterns',
    question: 'How can "approval patterns" reduce human workload?',
    options: [
      'By removing all approvals',
      'By auto-approving actions that match previously approved patterns',
      'By hiring more reviewers',
      'By slowing down agents'
    ],
    correctAnswer: 1,
    explanation: 'If the same action type was approved N times by the same reviewer, it can be auto-approved going forward. This learns from human decisions to reduce repetitive work.',
    difficulty: 'advanced',
    category: 'patterns'
  },
  {
    id: 'hitl-7',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is "human-on-the-loop" vs "human-in-the-loop"?',
    options: [
      'They are the same thing',
      'On-the-loop: human monitors with veto power; In-the-loop: human approves before action',
      'On-the-loop is for robots only',
      'In-the-loop is outdated'
    ],
    correctAnswer: 1,
    explanation: 'In-the-loop requires pre-approval. On-the-loop allows the agent to act but a human monitors and can intervene/rollback if needed. On-the-loop is less friction.',
    difficulty: 'advanced',
    category: 'patterns'
  },
  {
    id: 'hitl-8',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What makes a good HITL user interface?',
    options: [
      'As much information as possible',
      'Clear action summary, risk level, recommended decision, and one-click approve/reject',
      'Only technical details',
      'No context, just approve button'
    ],
    correctAnswer: 1,
    explanation: 'Good HITL UIs show what the agent wants to do, why (context), risk assessment, and clear approve/reject/modify options. Reduce cognitive load for reviewers.',
    difficulty: 'intermediate',
    category: 'patterns'
  },
  {
    id: 'hitl-9',
    conceptId: 'human-in-the-loop-patterns',
    question: 'What is "graceful degradation" in HITL systems?',
    options: [
      'The system gets worse over time',
      'The agent continues safely if human reviewers are unavailable',
      'Reducing system quality intentionally',
      'Removing HITL features'
    ],
    correctAnswer: 1,
    explanation: 'Graceful degradation means having fallback behavior when humans are unavailable: queue actions, use conservative defaults, or pause non-urgent work.',
    difficulty: 'advanced',
    category: 'patterns'
  },
  {
    id: 'hitl-10',
    conceptId: 'human-in-the-loop-patterns',
    question: 'How should HITL systems handle time-sensitive approvals?',
    options: [
      'Ignore time constraints',
      'Use priority queues, SLA tracking, auto-escalation, and timeout policies',
      'Always auto-approve urgent items',
      'Reject anything time-sensitive'
    ],
    correctAnswer: 1,
    explanation: 'Time-sensitive items need priority routing, SLA monitoring, escalation if not reviewed in time, and clear timeout policies (approve, reject, or escalate on timeout).',
    difficulty: 'intermediate',
    category: 'patterns'
  }
];

export const humanInTheLoopPatternsTimeEstimate = 12; // minutes
