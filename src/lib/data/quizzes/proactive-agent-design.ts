// Quiz questions for Proactive Agent Design concept
// Covers: Reactive-to-proactive paradigm, authority delegation, intent inference, risk governance

import type { QuizQuestion } from './types';

export const proactiveAgentDesignQuestions: QuizQuestion[] = [
  {
    id: 'proactive-1',
    question: 'What is the fundamental difference between a reactive copilot and a proactive agent?',
    options: [
      'Proactive agents are more expensive to run',
      'Reactive agents wait for explicit instructions; proactive agents anticipate needs and act autonomously',
      'Proactive agents use larger language models',
      'Reactive agents cannot use tools'
    ],
    correctAnswer: 1,
    explanation: 'The core paradigm shift is from instruction-following (reactive) to need-anticipation (proactive). Proactive agents monitor context, detect patterns, and initiate actions before being asked.',
    difficulty: 'beginner',
    category: 'architecture'
  },
  {
    id: 'proactive-2',
    question: 'What does "authority delegation" mean in proactive agent design?',
    options: [
      'Giving the agent full admin access',
      'Defining bounded scopes of autonomous action with escalation policies for edge cases',
      'Delegating all decisions to the user',
      'Assigning agent tasks to other agents'
    ],
    correctAnswer: 1,
    explanation: 'Authority delegation defines what an agent can do autonomously (e.g., block a suspicious login), what requires confirmation (e.g., revoking access), and what must be escalated to a human (e.g., policy changes).',
    difficulty: 'intermediate',
    category: 'architecture'
  },
  {
    id: 'proactive-3',
    question: 'Which is NOT a typical proactive agent trigger pattern?',
    options: [
      'Anomaly detection (drift from baseline)',
      'Time-based scheduling (cron-like triggers)',
      'Waiting for a user to type a prompt',
      'Event-driven signals (new data arrival, threshold breach)'
    ],
    correctAnswer: 2,
    explanation: 'Waiting for user prompts is the hallmark of reactive systems. Proactive agents use anomaly detection, scheduled monitoring, event streams, and predictive signals to initiate action autonomously.',
    difficulty: 'beginner',
    category: 'architecture'
  },
  {
    id: 'proactive-4',
    question: 'What is "authority creep" in proactive agent systems?',
    options: [
      'When an agent gradually acquires more autonomous privileges than originally intended',
      'When an agent slows down over time',
      'When users forget how to use the system',
      'When the agent uses too many tokens'
    ],
    correctAnswer: 0,
    explanation: 'Authority creep occurs when convenience leads to progressively expanding an agent\'s autonomous scope without formal review, creating unmonitored risk. Regular authority audits prevent this.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'proactive-5',
    question: 'In the proactive maturity evolution, what typically comes AFTER "Reactive Copilot" but BEFORE "Autonomous Sentinel"?',
    options: [
      'Manual Processing',
      'Proactive Advisor â€” the agent suggests actions but the human decides',
      'Full AGI',
      'Rule-based automation'
    ],
    correctAnswer: 1,
    explanation: 'The maturity ladder is: Manual â†’ Reactive Copilot â†’ Proactive Advisor (suggests, human confirms) â†’ Autonomous Sentinel (acts within authority). Each stage progressively shifts initiative from human to agent.',
    difficulty: 'intermediate',
    category: 'architecture'
  },
  {
    id: 'proactive-6',
    question: 'Why do proactive agents need a "confidence threshold" before taking autonomous action?',
    options: [
      'To reduce API costs',
      'To prevent the agent from acting on low-confidence predictions that could cause harm',
      'To slow down the agent',
      'To improve model training'
    ],
    correctAnswer: 1,
    explanation: 'Unlike reactive systems where the user validates intent, proactive agents must self-regulate. A confidence threshold ensures the agent only acts autonomously when its assessment is reliable, escalating uncertain situations.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'proactive-7',
    question: 'What is "cascade failure" in a proactive multi-agent system?',
    options: [
      'Multiple agents using the same model',
      'One agent\'s autonomous action triggering other agents to act, amplifying an incorrect response across the system',
      'Agents running out of memory',
      'A waterfall development process'
    ],
    correctAnswer: 1,
    explanation: 'When proactive agents observe each other\'s outputs, one agent\'s incorrect autonomous action can trigger others to react, creating a chain reaction. Circuit breakers and blast-radius limits prevent cascades.',
    difficulty: 'advanced',
    category: 'architecture'
  },
  {
    id: 'proactive-8',
    question: 'Which enterprise scenario benefits MOST from proactive agent design?',
    options: [
      'Generating a one-time report',
      'Security incident response â€” detecting and containing threats before they escalate',
      'Formatting a document',
      'Answering a single FAQ'
    ],
    correctAnswer: 1,
    explanation: 'Security operations have a direct ROI for proactive design: every minute of faster detection and containment reduces blast radius. The agent monitors signals 24/7 and can isolate threats autonomously.',
    difficulty: 'beginner',
    category: 'architecture'
  },
  {
    id: 'proactive-9',
    question: 'What is a "blast-radius governor" in proactive agent architecture?',
    options: [
      'A component that limits how many resources an agent can affect in a single autonomous action',
      'A UI component that shows explosion animations',
      'A load balancer',
      'A cost monitoring dashboard'
    ],
    correctAnswer: 0,
    explanation: 'Blast-radius governors limit the scope of any single autonomous action (e.g., "can block 1 IP, not an entire subnet") so that even incorrect proactive actions have bounded impact.',
    difficulty: 'advanced',
    category: 'security'
  },
  {
    id: 'proactive-10',
    question: 'What is the recommended approach when transitioning a team from reactive to proactive agents?',
    options: [
      'Deploy fully autonomous agents immediately',
      'Start with a shadow/advisory mode where the agent suggests actions, measure accuracy, then gradually delegate authority',
      'Remove all human oversight at once',
      'Wait until AI is perfect'
    ],
    correctAnswer: 1,
    explanation: 'A phased rollout â€” shadow mode â†’ advisory â†’ supervised autonomy â†’ full autonomy â€” lets teams build trust through measurement, establish rollback procedures, and identify edge cases before granting real authority.',
    difficulty: 'intermediate',
    category: 'architecture'
  }
];

export const proactiveAgentDesignTimeEstimate = 12; // minutes
