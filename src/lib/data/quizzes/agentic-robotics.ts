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
  },
  {
    id: 'ar-alt-i1',
    text: 'What readiness gate must the Adaptive Lab Technician satisfy before launching an overnight assay run?',
    question: 'What readiness gate must the Adaptive Lab Technician satisfy before launching an overnight assay run?',
    options: [
      'Confirm only that the LIMS queue is non-empty',
      'Verify calibrations are within freshness window, reagents are valid, and QA sign-off is recorded in the ledger',
      'Ask the supervising scientist via chat after the run starts',
      'Assume instrumentation is ready if no alarms fired in the last hour'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'adaptive-lab-technician',
    explanation: 'Lights-out runs require evidence that calibrations, reagents, and approvals are all current before execution begins.',
    relatedConcepts: ['adaptive-lab-technician', 'quality-guardian', 'policy-gated-invocation'],
    timeEstimate: 65,
    persona: ['robotics-lead', 'operations-manager', 'safety-engineer']
  },
  {
    id: 'ar-alt-a1',
    text: 'Which telemetry bundle should trigger an automatic pause for the Adaptive Lab Technician during a run?',
    question: 'Which telemetry bundle should trigger an automatic pause for the Adaptive Lab Technician during a run?',
    options: [
      'Only the incubator door sensor toggling',
      'Temperature drift beyond tolerance combined with vibration spike and reagent timer overrun',
      'A single log warning emitted by the LLM planner',
      'Any human message posted in the operations channel'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agentic-robotics',
    subCategory: 'adaptive-lab-technician',
    explanation: 'The technician pauses when fused telemetry indicates quality risk, not just a single signal in isolation.',
    relatedConcepts: ['adaptive-lab-technician', 'failure-modes', 'telemetry'],
    timeEstimate: 80,
    persona: ['agent-architect', 'robotics-lead', 'safety-engineer']
  },
  {
    id: 'ar-ig-i1',
    text: 'How should Inventory Guardian estimate stock when primary RFID coverage drops for a zone?',
    question: 'How should Inventory Guardian estimate stock when primary RFID coverage drops for a zone?',
    options: [
      'Freeze all shipments indefinitely until manual count finishes',
      'Blend weight pad deltas, recent WMS events, and confidence decay to approximate stock until sensors return',
      'Assume the previous count is still accurate',
      'Trigger a full distribution center shutdown'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'inventory-guardian',
    explanation: 'Fallback telemetry plus confidence modeling keeps the digital twin trustworthy during outages.',
    relatedConcepts: ['inventory-guardian', 'telemetry', 'data-quality-feedback-loop'],
    timeEstimate: 60,
    persona: ['operations-manager', 'agent-architect', 'robotics-lead']
  },
  {
    id: 'ar-ig-a1',
    text: 'Which evidence package best supports a replenishment auto-action initiated by Inventory Guardian?',
    question: 'Which evidence package best supports a replenishment auto-action initiated by Inventory Guardian?',
    options: [
      'A one-line Slack message stating “reorder triggered”',
      'Telemetry snapshots, variance hypothesis ranking, financial exposure estimate, and approval routing',
      'An email describing the shortage in plain text only',
      'A manual spreadsheet uploaded after the fact'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agentic-robotics',
    subCategory: 'inventory-guardian',
    explanation: 'Auditability and trust require structured evidence tying telemetry to financial impact and approvals.',
    relatedConcepts: ['inventory-guardian', 'agent-ops', 'responsible-ai-governance'],
    timeEstimate: 85,
    persona: ['operations-manager', 'agent-architect', 'safety-engineer']
  },
  {
    id: 'ar-erm-i1',
    text: 'How should Emergency Response Mate treat acknowledgements across mixed communication channels?',
    question: 'How should Emergency Response Mate treat acknowledgements across mixed communication channels?',
    options: [
      'Assume radio responders heard instructions if SMS responders acknowledged',
      'Require explicit per-channel acknowledgements with escalation timers for silence',
      'Mark tasks complete immediately after broadcasting once',
      'Wait for manual dispatcher confirmation hours later'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-robotics',
    subCategory: 'emergency-response-mate',
    explanation: 'Channel-aware acknowledgements ensure no responder is silently out of loop.',
    relatedConcepts: ['emergency-response-mate', 'routing', 'agent-ops'],
    timeEstimate: 55,
    persona: ['agent-architect', 'operations-manager', 'safety-engineer']
  },
  {
    id: 'ar-erm-a1',
    text: 'What should the after-action packet generated by Emergency Response Mate always include for compliance review?',
    question: 'What should the after-action packet generated by Emergency Response Mate always include for compliance review?',
    options: [
      'Only a short incident summary paragraph',
      'Timestamped task acknowledgements, escalation decisions, communication transcripts, and recommended playbook updates',
      'A marketing press release about the incident',
      'Raw social media screenshots without context'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agentic-robotics',
    subCategory: 'emergency-response-mate',
    explanation: 'Structured after-action evidence feeds compliance, training, and playbook refinement loops.',
    relatedConcepts: ['emergency-response-mate', 'strategy-memory-replay', 'responsible-ai-governance'],
    timeEstimate: 90,
    persona: ['operations-manager', 'safety-engineer', 'agent-architect']
  }
];
