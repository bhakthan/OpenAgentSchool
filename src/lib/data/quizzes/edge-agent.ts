import { QuizQuestion } from './types';

export const edgeAgentQuestions: QuizQuestion[] = [
  // Beginner questions
  {
    id: 'edge-b1',
    text: 'What is the primary advantage of edge AI over cloud-only AI for robotics applications?',
    question: 'What is the primary advantage of edge AI over cloud-only AI for robotics applications?',
    options: [
      'Edge devices are always cheaper than cloud',
      'Lower latency for real-time control (sub-10ms response)',
      'Edge AI never needs model updates',
      'Cloud AI cannot process sensor data'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'edge-agent',
    subCategory: 'edge-fundamentals',
    explanation: 'Edge AI enables sub-10ms inference latency which is essential for safety-critical robotics control loops. Cloud round-trips typically add 50-200ms latency which is unacceptable for real-time control.',
    relatedConcepts: ['edge-agent', 'agentic-robotics-integration', 'agent-deployment'],
    timeEstimate: 30,
    persona: ['robotics-lead', 'ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand edge vs cloud latency tradeoffs']
  },
  {
    id: 'edge-b2',
    text: 'Which scenario would be best suited for cloud AI rather than edge AI?',
    question: 'Which scenario would be best suited for cloud AI rather than edge AI?',
    options: [
      'Emergency stop detection on a robot arm',
      'Training a model on data from 1000 robots fleet-wide',
      'Real-time quality inspection at 30fps',
      'Collision avoidance in a warehouse AGV'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'edge-agent',
    subCategory: 'edge-fundamentals',
    explanation: 'Fleet-wide model training requires aggregating data from many sources and running compute-intensive workloads. This is ideal for cloud, while real-time control tasks need edge deployment.',
    relatedConcepts: ['edge-agent', 'agent-learning'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'ml-engineer'],
    learningObjectives: ['Identify cloud vs edge use cases']
  },
  {
    id: 'edge-b3',
    text: 'What does IT/OT convergence mean in the context of industrial edge AI?',
    question: 'What does IT/OT convergence mean in the context of industrial edge AI?',
    options: [
      'Replacing all IT systems with OT systems',
      'Bridging information technology (REST APIs, cloud) with operational technology (PLCs, SCADA)',
      'Using only OT protocols for all communication',
      'Eliminating the need for OT systems entirely'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'edge-agent',
    subCategory: 'industrial-integration',
    explanation: 'IT/OT convergence bridges the gap between enterprise IT systems (cloud, APIs, databases) and industrial OT systems (PLCs, SCADA, sensors) to enable AI-driven automation.',
    relatedConcepts: ['edge-agent', 'industry-agents'],
    timeEstimate: 35,
    persona: ['agent-architect', 'operations-manager'],
    learningObjectives: ['Define IT/OT convergence']
  },
  {
    id: 'edge-b4',
    text: 'Which industrial protocol is most commonly used for modern edge-to-PLC communication due to its rich semantic model?',
    question: 'Which industrial protocol is most commonly used for modern edge-to-PLC communication due to its rich semantic model?',
    options: [
      'HTTP REST',
      'OPC-UA',
      'FTP',
      'SMTP'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'edge-agent',
    subCategory: 'industrial-integration',
    explanation: 'OPC-UA provides a rich information model with semantic typing, publish-subscribe capabilities, and security features, making it the preferred protocol for modern industrial edge deployments.',
    relatedConcepts: ['edge-agent', 'industry-agents'],
    timeEstimate: 30,
    persona: ['robotics-lead', 'agent-architect'],
    learningObjectives: ['Identify key industrial protocols']
  },
  {
    id: 'edge-b5',
    text: 'What is the typical latency tier for real-time vision inspection in manufacturing?',
    question: 'What is the typical latency tier for real-time vision inspection in manufacturing?',
    options: [
      'Ultra-Low: < 1ms',
      'Real-Time: 1-10ms',
      'Batch/Async: 100ms-1s',
      'Cloud-Tolerable: > 1s'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'edge-agent',
    subCategory: 'edge-fundamentals',
    explanation: 'Vision inspection typically requires 1-10ms inference latency to keep up with production line speeds. This is achievable with edge GPUs like NVIDIA Jetson or TensorRT acceleration.',
    relatedConcepts: ['edge-agent', 'agent-observability'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'robotics-lead'],
    learningObjectives: ['Match use cases to latency tiers']
  },
  
  // Intermediate questions
  {
    id: 'edge-i1',
    text: 'In the Microsoft Rho-Alpha VLA+ architecture, what differentiates it from standard VLA models?',
    question: 'In the Microsoft Rho-Alpha VLA+ architecture, what differentiates it from standard VLA models?',
    options: [
      'It only supports single-arm manipulation',
      'It adds tactile sensing and force feedback for bimanual manipulation',
      'It removes the language component for faster inference',
      'It only works with cloud inference'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'physical-ai-models',
    explanation: 'VLA+ extends Vision-Language-Action with tactile sensing and force feedback, enabling robots to "feel" what they\'re manipulating. This is essential for delicate bimanual tasks.',
    relatedConcepts: ['edge-agent', 'agentic-robotics-integration'],
    timeEstimate: 45,
    persona: ['robotics-lead', 'ai-engineer', 'ml-engineer'],
    learningObjectives: ['Understand VLA+ architecture extensions']
  },
  {
    id: 'edge-i2',
    text: 'Google Gemini ER 1.5 uses a "thinking budget" parameter. What is its purpose?',
    question: 'Google Gemini ER 1.5 uses a "thinking budget" parameter. What is its purpose?',
    options: [
      'To limit the number of API calls per day',
      'To trade latency for accuracy by controlling reasoning depth',
      'To set the maximum token count in responses',
      'To configure the model temperature'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'physical-ai-models',
    explanation: 'The thinking budget lets you control how long the model spends reasoning. Low budget (<50ms) for quick decisions, high budget (500ms+) for complex error recovery.',
    relatedConcepts: ['edge-agent', 'agent-reasoning-patterns'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'robotics-lead'],
    learningObjectives: ['Configure thinking budget tradeoffs']
  },
  {
    id: 'edge-i3',
    text: 'Which edge deployment pattern is best suited for environments with intermittent connectivity?',
    question: 'Which edge deployment pattern is best suited for environments with intermittent connectivity?',
    options: [
      'Cloud-Primary with Edge Cache',
      'Edge-Primary with Cloud Sync',
      'Cloud-Only deployment',
      'Real-time cloud streaming'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'hardware-deployment',
    explanation: 'Edge-Primary with Cloud Sync runs inference locally and syncs to cloud when connectivity is available. This provides graceful degradation when offline.',
    relatedConcepts: ['edge-agent', 'agent-deployment', 'agent-ops'],
    timeEstimate: 40,
    persona: ['agent-architect', 'operations-manager'],
    learningObjectives: ['Select appropriate deployment patterns']
  },
  {
    id: 'edge-i4',
    text: 'What is the primary purpose of model quantization (INT8/FP16) in edge deployment?',
    question: 'What is the primary purpose of model quantization (INT8/FP16) in edge deployment?',
    options: [
      'To improve model accuracy',
      'To reduce model size and increase inference speed on edge hardware',
      'To enable cloud training',
      'To add new model capabilities'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'hardware-deployment',
    explanation: 'Quantization reduces model precision from FP32 to INT8/FP16, shrinking model size 4-8x and speeding inference 2-4x with minimal accuracy loss. Essential for edge deployment.',
    relatedConcepts: ['edge-agent', 'fine-tuning', 'agent-cost-optimization'],
    timeEstimate: 45,
    persona: ['ml-engineer', 'ai-engineer'],
    learningObjectives: ['Apply quantization for edge deployment']
  },
  {
    id: 'edge-i5',
    text: 'In a hybrid edge-cloud architecture, what should happen when the cloud becomes unavailable?',
    question: 'In a hybrid edge-cloud architecture, what should happen when the cloud becomes unavailable?',
    options: [
      'The edge agent should immediately shut down',
      'The edge agent should fall back to local models and queue data for later sync',
      'All inference should stop until cloud reconnects',
      'The edge agent should switch to a different cloud provider'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'hybrid-architectures',
    explanation: 'Graceful degradation means falling back to cached local models, continuing operation, and queuing telemetry/results for upload when connectivity returns.',
    relatedConcepts: ['edge-agent', 'agent-ops', 'agent-deployment'],
    timeEstimate: 45,
    persona: ['agent-architect', 'operations-manager'],
    learningObjectives: ['Design graceful degradation patterns']
  },
  {
    id: 'edge-i6',
    text: 'Which TWO safety features should be implemented at the hardware level rather than in the AI agent software? (multi-select)',
    question: 'Which TWO safety features should be implemented at the hardware level rather than in the AI agent software? (multi-select)',
    options: [
      'Emergency stop (E-stop) circuits',
      'Task planning optimization',
      'Watchdog timers for agent hang detection',
      'Model confidence thresholds'
    ],
    correctAnswer: -1,
    correctAnswers: [0, 2],
    difficulty: 'intermediate',
    category: 'edge-agent',
    subCategory: 'production-patterns',
    explanation: 'E-stop circuits and watchdog timers must be hardware-level safeguards that cannot be bypassed by software. Task planning and confidence thresholds are software controls.',
    relatedConcepts: ['edge-agent', 'agentic-robotics-integration', 'agent-security'],
    timeEstimate: 50,
    persona: ['robotics-lead', 'safety-engineer'],
    learningObjectives: ['Differentiate hardware vs software safety']
  },
  
  // Advanced questions
  {
    id: 'edge-a1',
    text: 'A manufacturing plant needs sub-5ms inference for closed-loop servo control. Which hardware acceleration approach is most appropriate?',
    question: 'A manufacturing plant needs sub-5ms inference for closed-loop servo control. Which hardware acceleration approach is most appropriate?',
    options: [
      'Cloud GPU with 5G connection',
      'Local FPGA or ASIC with optimized model',
      'Standard CPU inference',
      'Edge server with batch processing'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'hardware-deployment',
    explanation: 'Sub-5ms latency for servo control requires dedicated hardware like FPGAs or ASICs with models compiled to silicon. Even edge GPUs introduce kernel launch overhead.',
    relatedConcepts: ['edge-agent', 'agentic-robotics-integration'],
    timeEstimate: 60,
    persona: ['robotics-lead', 'hardware-engineer'],
    learningObjectives: ['Select hardware for ultra-low latency']
  },
  {
    id: 'edge-a2',
    text: 'In federated learning for edge agents, what data is shared with the central cloud server?',
    question: 'In federated learning for edge agents, what data is shared with the central cloud server?',
    options: [
      'Raw sensor data and images',
      'Complete training datasets',
      'Model gradients or weight updates only',
      'User credentials and API keys'
    ],
    correctAnswer: 2,
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'hybrid-architectures',
    explanation: 'Federated learning trains locally on each edge device and shares only gradients/weight deltas with the cloud for aggregation. Raw data never leaves the premises.',
    relatedConcepts: ['edge-agent', 'agent-learning', 'agent-security'],
    timeEstimate: 55,
    persona: ['ml-engineer', 'privacy-engineer'],
    learningObjectives: ['Implement privacy-preserving edge learning']
  },
  {
    id: 'edge-a3',
    text: 'When designing an OPC-UA bridge for edge AI agents, which subscription pattern minimizes latency for real-time control?',
    question: 'When designing an OPC-UA bridge for edge AI agents, which subscription pattern minimizes latency for real-time control?',
    options: [
      'Polling every 1 second',
      'Change-based subscriptions with sampling interval matching control loop frequency',
      'HTTP GET requests to REST API wrapper',
      'Batch querying every 5 minutes'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'industrial-integration',
    explanation: 'OPC-UA change-based subscriptions with sampling intervals matching the control loop (e.g., 10-100ms) push data only when values change, minimizing latency and bandwidth.',
    relatedConcepts: ['edge-agent', 'industry-agents'],
    timeEstimate: 60,
    persona: ['robotics-lead', 'agent-architect'],
    learningObjectives: ['Optimize OPC-UA for real-time']
  },
  {
    id: 'edge-a4',
    text: 'A fleet of 500 edge agents needs OTA model updates. Which rollout strategy minimizes risk of fleet-wide failures?',
    question: 'A fleet of 500 edge agents needs OTA model updates. Which rollout strategy minimizes risk of fleet-wide failures?',
    options: [
      'Push to all 500 devices simultaneously',
      'Canary rollout: 1% → 10% → 50% → 100% with health gate checks',
      'Manual update of each device individually',
      'No updates, keep original model forever'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'production-patterns',
    explanation: 'Canary rollouts start with a small subset, verify health metrics, then progressively expand. This catches issues early before fleet-wide impact.',
    relatedConcepts: ['edge-agent', 'agent-ops', 'agent-deployment'],
    timeEstimate: 55,
    persona: ['operations-manager', 'devops-engineer'],
    learningObjectives: ['Design safe fleet update strategies']
  },
  {
    id: 'edge-a5',
    text: 'Which metrics are most critical for edge agent observability? (select the THREE most important)',
    question: 'Which metrics are most critical for edge agent observability? (select the THREE most important)',
    options: [
      'Inference latency P50/P99',
      'Office temperature',
      'Model confidence scores',
      'Offline queue depth',
      'Email notification count'
    ],
    correctAnswer: -1,
    correctAnswers: [0, 2, 3],
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'production-patterns',
    explanation: 'Latency percentiles show performance health, confidence scores indicate model reliability, and queue depth reveals connectivity issues. These are the key edge-specific metrics.',
    relatedConcepts: ['edge-agent', 'agent-observability', 'agent-ops'],
    timeEstimate: 60,
    persona: ['operations-manager', 'sre'],
    learningObjectives: ['Define edge observability metrics']
  },
  {
    id: 'edge-a6',
    text: 'In a safety-critical edge robotics system, what is the correct order of precedence for safety controls?',
    question: 'In a safety-critical edge robotics system, what is the correct order of precedence for safety controls?',
    options: [
      'Cloud policy → Edge agent → PLC → E-stop',
      'E-stop → PLC limits → Edge agent guardrails → Cloud policy',
      'Edge agent → E-stop → Cloud → PLC',
      'Cloud → Edge → E-stop → PLC'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'edge-agent',
    subCategory: 'production-patterns',
    explanation: 'Safety precedence goes from hardware-level (E-stop, PLC limits) to software (edge guardrails) to remote (cloud policy). Lower layers override higher layers for safety.',
    relatedConcepts: ['edge-agent', 'agentic-robotics-integration', 'agent-security'],
    timeEstimate: 60,
    persona: ['safety-engineer', 'robotics-lead'],
    learningObjectives: ['Design layered safety architecture']
  }
];

export const edgeAgentTime = edgeAgentQuestions.reduce((total, q) => total + (q.timeEstimate || 45), 0);
