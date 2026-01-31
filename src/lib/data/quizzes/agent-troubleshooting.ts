// @ts-nocheck
// Agent Troubleshooting Playbook quiz questions
import { QuizQuestion } from './types';

export const agentTroubleshootingQuestions: QuizQuestion[] = [
  {
    id: 'troubleshoot-b1',
    question: 'What is Context Collapse in agent systems?',
    text: 'What is Context Collapse in agent systems?',
    options: [
      'When the agent runs out of memory',
      'When critical information is lost due to context window overflow, causing degraded or incoherent responses',
      'When the user interface crashes',
      'When the agent stops responding entirely'
    ],
    correctAnswer: 1,
    explanation: 'Context Collapse occurs when the agent\'s context window fills up, pushing out earlier critical information. This causes the agent to lose track of earlier instructions, user preferences, or conversation history.',
    difficulty: 'beginner',
    category: 'agent-troubleshooting',
    subCategory: 'failure-taxonomy',
    learningObjectives: ['Define Context Collapse', 'Understand context window limitations'],
    relatedConcepts: ['agent-architecture', 'memory-systems', 'context-management'],
    persona: ['agent-developer', 'ai-ops-engineer'],
    timeEstimate: 35
  },
  {
    id: 'troubleshoot-b2',
    question: 'What is the Circuit Breaker pattern in agent systems?',
    text: 'What is the Circuit Breaker pattern in agent systems?',
    options: [
      'A hardware component that prevents electrical overload',
      'A pattern that stops calling a failing service after threshold failures, allowing recovery time',
      'A debugging technique for finding code errors',
      'A method for encrypting agent communications'
    ],
    correctAnswer: 1,
    explanation: 'The Circuit Breaker pattern prevents cascade failures by tracking consecutive failures and "opening" the circuit to stop requests when a threshold is reached. After a timeout, it allows a test request to see if the service has recovered.',
    difficulty: 'beginner',
    category: 'agent-troubleshooting',
    subCategory: 'production-patterns',
    learningObjectives: ['Understand Circuit Breaker pattern', 'Apply fault tolerance patterns'],
    relatedConcepts: ['agent-ops', 'reliability', 'fault-tolerance'],
    persona: ['agent-developer', 'ai-ops-engineer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'troubleshoot-i1',
    question: 'Which diagnostic signal most directly indicates an infinite reasoning loop?',
    text: 'Which diagnostic signal most directly indicates an infinite reasoning loop?',
    options: [
      'High memory usage',
      'Repeated identical tool calls or self-similar LLM outputs exceeding 3-5 iterations',
      'Slow response times',
      'Authentication errors'
    ],
    correctAnswer: 1,
    explanation: 'Infinite reasoning loops are characterized by the agent making the same tool calls repeatedly or producing nearly identical outputs. A healthy agent should make progress; repetition beyond 3-5 cycles signals a loop.',
    difficulty: 'intermediate',
    category: 'agent-troubleshooting',
    subCategory: 'diagnostic-trees',
    learningObjectives: ['Diagnose reasoning loops', 'Set appropriate loop detection thresholds'],
    relatedConcepts: ['agent-evaluation', 'observability', 'loop-detection'],
    persona: ['ai-ops-engineer', 'agent-developer'],
    timeEstimate: 45
  },
  {
    id: 'troubleshoot-i2',
    question: 'What is the Bulkhead pattern in agent reliability?',
    text: 'What is the Bulkhead pattern in agent reliability?',
    options: [
      'Isolating different agent components so failures in one area don\'t cascade to others',
      'Storing agent data in multiple locations',
      'Using multiple LLM providers simultaneously',
      'Encrypting agent communications between components'
    ],
    correctAnswer: 0,
    explanation: 'The Bulkhead pattern (named after ship compartments) isolates components so that a failure in one area doesn\'t sink the entire system. For agents, this means running risky tools in separate processes with their own resource limits.',
    difficulty: 'intermediate',
    category: 'agent-troubleshooting',
    subCategory: 'production-patterns',
    learningObjectives: ['Apply Bulkhead isolation', 'Design for fault containment'],
    relatedConcepts: ['agent-architecture', 'reliability', 'fault-isolation'],
    persona: ['agent-architect', 'ai-ops-engineer'],
    timeEstimate: 45
  },
  {
    id: 'troubleshoot-a1',
    question: 'During an agent outage, what is the correct order of the emergency response protocol?',
    text: 'During an agent outage, what is the correct order of the emergency response protocol?',
    options: [
      'Fix root cause → Notify stakeholders → Restore service → Document',
      'Restore service → Notify stakeholders → Investigate root cause → Prevention',
      'Investigate root cause → Restore service → Notify stakeholders → Fix',
      'Notify stakeholders → Document incident → Restore service → Investigate'
    ],
    correctAnswer: 1,
    explanation: 'Emergency response prioritizes: 1) Restore service (user impact first), 2) Notify stakeholders (communication), 3) Investigate root cause (understand why), 4) Implement prevention (avoid recurrence). Don\'t waste time investigating while users are down.',
    difficulty: 'advanced',
    category: 'agent-troubleshooting',
    subCategory: 'emergency-runbook',
    learningObjectives: ['Follow incident response protocol', 'Prioritize service restoration'],
    relatedConcepts: ['agent-ops', 'incident-management', 'on-call'],
    persona: ['ai-ops-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'troubleshoot-a2',
    question: 'What is the recommended approach when an agent exhibits data exfiltration behavior?',
    text: 'What is the recommended approach when an agent exhibits data exfiltration behavior?',
    options: [
      'Monitor the behavior for 24 hours to gather more data',
      'Immediately isolate the agent, preserve logs, escalate to security team',
      'Restart the agent and clear its memory',
      'Add rate limiting to slow down the data transfer'
    ],
    correctAnswer: 1,
    explanation: 'Data exfiltration is a critical security incident. The correct response: 1) Immediate isolation (stop the bleeding), 2) Preserve all logs and evidence for forensics, 3) Escalate to security team. Never destroy evidence by restarting.',
    difficulty: 'advanced',
    category: 'agent-troubleshooting',
    subCategory: 'security-violations',
    learningObjectives: ['Handle security incidents', 'Follow security escalation protocol'],
    relatedConcepts: ['agent-security', 'incident-response', 'data-protection'],
    persona: ['ai-ops-engineer', 'agent-architect', 'security-engineer'],
    timeEstimate: 50
  },
  {
    id: 'troubleshoot-i3',
    question: 'What observability metric is most important for detecting Context Collapse?',
    text: 'What observability metric is most important for detecting Context Collapse?',
    options: [
      'CPU utilization',
      'Network latency',
      'Context window utilization percentage and token counts per request',
      'Disk I/O operations'
    ],
    correctAnswer: 2,
    explanation: 'Context Collapse is directly related to context window usage. Monitoring token counts per request and context utilization percentage helps detect when you\'re approaching limits. Set alerts at 70-80% utilization to take action before collapse.',
    difficulty: 'intermediate',
    category: 'agent-troubleshooting',
    subCategory: 'observability',
    learningObjectives: ['Monitor context window usage', 'Set proactive alerts'],
    relatedConcepts: ['agent-evaluation', 'observability', 'monitoring'],
    persona: ['ai-ops-engineer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'troubleshoot-b3',
    question: 'What is a Fallback Chain in agent reliability?',
    text: 'What is a Fallback Chain in agent reliability?',
    options: [
      'A blockchain-based backup system',
      'A sequence of progressively simpler alternative responses when the primary approach fails',
      'A chain of agents that each try the same task',
      'A hardware redundancy system'
    ],
    correctAnswer: 1,
    explanation: 'A Fallback Chain provides graceful degradation: if the primary approach fails, try a simpler one. Example: Full agent response → Cached response → Generic acknowledgment → Error message. Users get something useful rather than a crash.',
    difficulty: 'beginner',
    category: 'agent-troubleshooting',
    subCategory: 'production-patterns',
    learningObjectives: ['Implement graceful degradation', 'Design fallback strategies'],
    relatedConcepts: ['agent-ops', 'reliability', 'user-experience'],
    persona: ['agent-developer', 'product-manager'],
    timeEstimate: 35
  }
];

export const agentTroubleshootingTime = agentTroubleshootingQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
