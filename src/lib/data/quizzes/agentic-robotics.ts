import { QuizQuestion } from './types';

export const agenticRoboticsIntegrationQuestions: QuizQuestion[] = [
  {
    id: 'ar-b1',
    text: 'Why do agentic robotics stacks separate high-level intent planners from low-level joint controllers?',
    question: 'Why do agentic robotics stacks separate high-level intent planners from low-level joint controllers?',
    options: [
      'To reduce telemetry requirements',
      'To let symbolic planners stay model-agnostic while motor controllers enforce hardware-safe execution',
      'So that perception can be skipped for repetitive tasks',
      'Because joint controllers cannot process safety rules'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agentic-robotics',
    subCategory: 'agentic-robotics-integration',
    explanation: 'Separating planners from controllers keeps deliberate task reasoning independent from hardware-specific torque profiles while the controller enforces velocity, torque, and collision limits.',
    relatedConcepts: ['agentic-robotics-integration', 'policy-gated-invocation', 'safety-overrides'],
    timeEstimate: 40,
    persona: ['agent-architect', 'robotics-lead', 'ai-engineer'],
    learningObjectives: ['Differentiate planning and control layers']
  },
  {
    id: 'ar-b2',
    text: 'What telemetry stream is most critical for detecting a mobile manipulator “dragging payload” hazard in near real-time?',
    question: 'What telemetry stream is most critical for detecting a mobile manipulator “dragging payload” hazard in near real-time?',
    options: [
      'Ambient temperature sensors',
      'Wheel odometry slip ratio combined with arm torque residuals',
      'Wi-Fi signal strength',
      'Upstream LLM token usage'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agentic-robotics',
    subCategory: 'agentic-robotics-integration',
    explanation: 'The hazard is surfaced by abnormal wheel slip and unexpected torque residuals in the arm, indicating the payload is snagged while the base continues moving.',
    relatedConcepts: ['telemetry', 'agentic-robotics-integration'],
    timeEstimate: 35,
    persona: ['robotics-lead', 'operations-manager']
  },
  {
    id: 'ar-b3',
    text: 'Which safeguard should be LOCAL to the robot runtime rather than delegated to a remote LLM agent?',
    question: 'Which safeguard should be LOCAL to the robot runtime rather than delegated to a remote LLM agent?',
    options: [
      'Automatic emergency-stop when force/torque exceeds a safe threshold',
      'Explaining the task plan to a supervisor',
      'Selecting a toolhead attachment based on SKU',
      'Re-ranking pick locations from a warehouse map'
    ],
    correctAnswer: 0,
    difficulty: 'beginner',
    category: 'agentic-robotics',
    subCategory: 'agentic-robotics-integration',
    explanation: 'Emergency-stop thresholds must run at the lowest latency layer. Relying on remote policy models would introduce unacceptable delays.',
    relatedConcepts: ['safety-overrides', 'agentic-robotics-integration'],
    timeEstimate: 30,
    persona: ['robotics-lead', 'safety-engineer']
  },
  {
    id: 'ar-i1',
    text: 'Mobile Manipulator Steward default guardrails require which TWO conditions before executing an autonomous pickup? (multi-select)',
    question: 'Mobile Manipulator Steward default guardrails require which TWO conditions before executing an autonomous pickup? (multi-select)',
    options: [
      'Valid semantic grasp pose from vision stack',
      'Operator heartbeat signal within last 5 seconds',
      'LLM intent confidence above threshold and RAG confirming SKU policy',
      'Warehouse temperature below 25°C'
    ],
    correctAnswer: -1,
    correctAnswers: [0, 2],
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'mobile-manipulator-steward',
    explanation: 'The steward pattern cross-checks perception-derived grasp poses and policy gating via RAG + intent confidence before permitting execution.',
    relatedConcepts: ['mobile-manipulator-steward', 'policy-gated-invocation', 'retrieval-augmented-guardrails'],
    timeEstimate: 70,
    persona: ['robotics-lead', 'agent-architect']
  },
  {
    id: 'ar-i2',
    text: 'Why does the mobile manipulator steward maintain a “presence lane” toggling between human-supervised and autonomous modes?',
    question: 'Why does the mobile manipulator steward maintain a “presence lane” toggling between human-supervised and autonomous modes?',
    options: [
      'To save power when humans are nearby',
      'To drive different policy + logging requirements depending on whether a human is actively supervising',
      'To ensure the robot can request firmware updates',
      'To reduce bandwidth consumption on telemetry streams'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'mobile-manipulator-steward',
    explanation: 'Presence awareness changes risk, logging, and escalation thresholds—delegated mode records richer telemetry and enforces stricter policy checks.',
    relatedConcepts: ['mobile-manipulator-steward', 'presence-modes', 'governance'],
    timeEstimate: 55,
    persona: ['agent-architect', 'operations-manager']
  },
  {
    id: 'ar-i3',
    text: 'Which signal SHOULD trigger an immediate fall-back to watchdog teleoperation channel?',
    question: 'Which signal SHOULD trigger an immediate fall-back to watchdog teleoperation channel?',
    options: [
      'Vision stack latency spikes beyond 250 ms sustained',
      'LLM agent returns a low-confidence plan for the 3rd time in a row',
      'Battery level dropping below 40%',
      'A new shift of operators clocks in'
    ],
    correctAnswer: 0,
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'agentic-robotics-integration',
    explanation: 'Perception latency spikes reduce situational awareness; the steward pattern hands control back to supervised mode to avoid blind maneuvers.',
    relatedConcepts: ['mobile-manipulator-steward', 'failure-handling'],
    timeEstimate: 50,
    persona: ['robotics-lead', 'ai-engineer']
  },
  {
    id: 'ar-a1',
    text: 'When composing retrieval corpora for robotics guardrails, which strategy best prevents unsafe tool usage regression?',
    question: 'When composing retrieval corpora for robotics guardrails, which strategy best prevents unsafe tool usage regression?',
    options: [
      'Store recent operator chat logs only',
      'Create structured policy manifests tagging tool, workspace, posture constraints, and include failure retrospectives',
      'Rely on manufacturer spec sheets alone',
      'Allow the LLM to summarize ad-hoc safety rules on the fly with no retrieval'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agentic-robotics',
    subCategory: 'agentic-robotics-integration',
    explanation: 'Guardrail retrieval needs structured manifests linked to retrospectives so new plans reinforce correct tool policies and highlight prior incidents.',
    relatedConcepts: ['retrieval-augmented-guardrails', 'responsible-ai-governance'],
    timeEstimate: 85,
    persona: ['agent-architect', 'safety-engineer']
  },
  {
    id: 'ar-a2',
    text: 'What governance artifact closes the loop between robotics incidents and LLM policy prompts?',
    question: 'What governance artifact closes the loop between robotics incidents and LLM policy prompts?',
    options: [
      'Token usage invoice',
      'End-of-day productivity summary',
      'Failure review dossier that updates retrieval corpora and modifies delegated authority thresholds',
      'Firmware changelog'
    ],
    correctAnswer: 2,
    difficulty: 'advanced',
    category: 'agentic-robotics',
    subCategory: 'mobile-manipulator-steward',
    explanation: 'Incident dossiers should feed new retrieval entries and tighten delegation thresholds so lessons learned immediately influence future prompts.',
    relatedConcepts: ['mobile-manipulator-steward', 'agent-ops', 'responsible-ai-governance'],
    timeEstimate: 90,
    persona: ['agent-architect', 'operations-manager', 'safety-engineer']
  }
];
