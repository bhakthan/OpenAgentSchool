import { StudyModeQuestion, StudyModeType, StudyModeLevel } from './types';

// Socratic Questions for A2A Communication
export const a2aSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'a2a-socratic-1',
    type: 'socratic',
    conceptId: 'a2a-communication',
    title: 'Discovering the Need for Agent Communication',
    level: 'beginner',
    socratiQuestion: "Imagine two AI agents need to work together on a task. What is the most fundamental thing they would need to do first? How might they achieve that?",
    followUpQuestions: [
      "What happens if one agent doesn't know what the other is doing?",
      "How would they coordinate who does what?",
      "What if they both try to do the same thing at the same time?"
    ],
    expectedInsights: [
      "Agents need to communicate to avoid duplication of work",
      "Clear protocols prevent confusion and conflicts",
      "Coordination is essential for efficient collaboration"
    ],
    hints: [
      "Think about how humans coordinate on team projects",
      "Consider what happens when there's no communication plan",
      "Reflect on the challenges of distributed systems"
    ],
    explanation: "This exploration leads students to discover that communication protocols like A2A are not just technical requirements, but fundamental necessities for any collaborative system.",
    relatedConcepts: ['multi-agent-systems', 'coordination', 'protocols'],
    timeEstimate: 15,
    successCriteria: [
      "Identifies communication as the fundamental need",
      "Recognizes coordination challenges",
      "Understands the purpose of protocols"
    ]
  },
  {
    id: 'a2a-socratic-2',
    type: 'socratic',
    conceptId: 'a2a-communication',
    title: 'Protocol Design Thinking',
    level: 'intermediate',
    socratiQuestion: "If you were designing a language for agents to talk to each other, what essential elements would you include? What could go wrong if you missed something?",
    followUpQuestions: [
      "How would an agent identify itself to another agent?",
      "What if the message gets corrupted or lost in transit?",
      "How would you handle different types of requests and responses?"
    ],
    expectedInsights: [
      "Message format standardization is crucial",
      "Error handling and retries are necessary",
      "Authentication and identification prevent confusion",
      "Different message types serve different purposes"
    ],
    hints: [
      "Consider the elements of human conversation",
      "Think about what makes communication reliable",
      "Reflect on different conversation purposes"
    ],
    explanation: "This helps students understand why A2A protocols have specific components like message formatting, routing, and error handling.",
    relatedConcepts: ['message-formatting', 'error-handling', 'authentication'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies key protocol components",
      "Understands the importance of reliability",
      "Recognizes security considerations"
    ]
  }
];

// Socratic Questions for MCP
export const mcpSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'mcp-socratic-1',
    type: 'socratic',
    conceptId: 'mcp',
    title: 'Understanding Context in AI Communication',
    level: 'beginner',
    socratiQuestion: "When you're having a long conversation with a friend, how do you both remember what you've talked about? What would happen if you lost track of the conversation context?",
    followUpQuestions: [
      "How would this apply to AI agents working on complex tasks?",
      "What if an agent needed to hand off a conversation to another agent?",
      "How could you preserve the 'memory' of what happened?"
    ],
    expectedInsights: [
      "Context preservation is essential for meaningful conversations",
      "Handoffs require transferring conversation state",
      "Memory and history enable continuity"
    ],
    hints: [
      "Think about conversations that span multiple days",
      "Consider what happens when someone joins a conversation midway",
      "Reflect on how you remember conversation history"
    ],
    explanation: "This exploration helps students understand why MCP focuses on context management and state preservation in agent interactions.",
    relatedConcepts: ['context-management', 'conversation-state', 'handoffs'],
    timeEstimate: 12,
    successCriteria: [
      "Understands the importance of context",
      "Recognizes handoff challenges",
      "Sees the need for state management"
    ]
  }
];

// Socratic Questions for Multi-Agent Systems
export const multiAgentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'mas-socratic-1',
    type: 'socratic',
    conceptId: 'multi-agent-systems',
    title: 'Discovering Specialization Benefits',
    level: 'beginner',
    socratiQuestion: "Why don't companies hire one person to do everything - sales, engineering, marketing, and accounting? What are the benefits of having specialists?",
    followUpQuestions: [
      "How would this principle apply to AI agents?",
      "What challenges arise when specialists need to work together?",
      "How would you organize a team of specialist agents?"
    ],
    expectedInsights: [
      "Specialization leads to better expertise and efficiency",
      "Coordination becomes more important with specialists",
      "Clear roles and responsibilities are essential"
    ],
    hints: [
      "Consider the advantages of expertise vs. generalization",
      "Think about team organization in complex projects",
      "Reflect on communication challenges in large teams"
    ],
    explanation: "This leads students to understand why multi-agent systems with specialized roles often outperform single-agent solutions.",
    relatedConcepts: ['specialization', 'coordination', 'role-definition'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes benefits of specialization",
      "Understands coordination challenges",
      "Sees parallels between human and AI teams"
    ]
  }
];

// Socratic Questions for Learner Patterns
export const socraticCoachQuestions: StudyModeQuestion[] = [
  {
    id: 'socratic-coach-q1',
    type: 'socratic',
    conceptId: 'socratic-coach',
    title: 'Leading Without Spoiling',
    level: 'beginner',
    socratiQuestion: 'If you wanted someone to discover the base case in recursion on their own, what single question would you ask?',
    followUpQuestions: [
      'How would your question change if they confused the base case with the recursive step?',
      'What signal tells you they are ready for a follow-up?',
      'How do you prevent giving away the answer?'
    ],
    expectedInsights: [
      'Good Socratic questions surface gaps rather than give solutions',
      'One precise question is often better than many vague ones',
      'Listening for misconceptions guides the next probe'
    ],
    hints: ['Focus on a single missing concept', 'Avoid multi-part questions', 'Prefer concrete anchors over abstractions'],
    explanation: 'Socratic coaching works best when questions are minimal, targeted, and timed based on learner signals.',
    relatedConcepts: ['prompt-design', 'metacognition'],
    timeEstimate: 8,
    successCriteria: ['Proposes a single precise question', 'Explains why it avoids spoilers']
  }
];

export const conceptToProjectQuestions: StudyModeQuestion[] = [
  {
    id: 'concept-to-project-q1',
    type: 'socratic',
    conceptId: 'concept-to-project',
    title: 'Right-Sizing a Project',
    level: 'intermediate',
    socratiQuestion: 'When turning a concept into a project, how can you tell the scope is too large for one week?',
    followUpQuestions: ['What are signs your milestones are too coarse?', 'What evidence shows a milestone is achievable?'],
    expectedInsights: ['Timeboxed milestones prevent over-scoping', 'Acceptance criteria make scope testable'],
    hints: ['Use end-to-end thin slice thinking', 'Define demo checkpoints'],
    explanation: 'Right-sized projects have small milestones with clear acceptance criteria and demos.',
    relatedConcepts: ['plan-and-execute', 'acceptance-criteria'],
    timeEstimate: 10,
    successCriteria: ['Identifies anti-patterns like vague milestones']
  }
];

// Socratic Questions for Observability & EvalOps
export const observabilityEvalOpsSocratic: StudyModeQuestion[] = [
  {
    id: 'observability-evalops-socratic-1',
    type: 'socratic',
    conceptId: 'observability-evalops',
    title: 'Why eval harnesses before canaries?',
    level: 'beginner',
    socratiQuestion: 'If your team wants to ship a prompt change quickly, why might you build a small evaluation harness first instead of jumping straight to a canary rollout?',
    followUpQuestions: [
      'What risks do canaries miss if you lack stable goldens?',
      'How do thresholds and quality bars change team behavior?',
      'When would you still proceed to a canary first?'
    ],
    expectedInsights: [
      'Goldens catch regressions deterministically before live traffic',
      'Quality gates create predictable release discipline',
      'Canaries complement—not replace—offline evaluation'
    ],
    hints: [
      'Think: repeatability and diff reports',
      'Consider composite Quality Score vs. single metrics'
    ],
    explanation: 'Eval harnesses provide fast, reproducible signal and prevent avoidable regressions from reaching users.',
    relatedConcepts: ['golden-sets', 'quality-gates', 'drift-monitoring'],
    timeEstimate: 8,
    successCriteria: ['Names at least two risks avoided by offline evals', 'Explains role of thresholds/gates']
  }
];

// Socratic Questions for PromptOps & Tooling
export const promptOpsToolingSocratic: StudyModeQuestion[] = [
  {
    id: 'promptops-socratic-1',
    type: 'socratic',
    conceptId: 'promptops-tooling',
    title: 'Versioning prompts like code',
    level: 'beginner',
    socratiQuestion: 'Why should prompts be versioned with semantic versions and changelogs rather than edited ad‑hoc in a shared doc?',
    followUpQuestions: [
      'What goes into a useful prompt changelog entry?',
      'How do pinned versions reduce rollback risk?'
    ],
    expectedInsights: [
      'Traceability and safe rollbacks require pinning and history',
      'Changelogs tie changes to eval results and decisions'
    ],
    hints: ['Think: reproducibility, DIFFs, auditability'],
    explanation: 'Treating prompts like code enables safe experimentation and compliance.',
    relatedConcepts: ['semantic-versioning', 'canary-rollouts', 'eval-diffs'],
    timeEstimate: 6,
    successCriteria: ['Mentions pinning/rollback', 'Connects changelogs to eval evidence']
  }
];

// Socratic Questions for Safety, Risk & Governance
export const safetyRiskGovSocratic: StudyModeQuestion[] = [
  {
    id: 'safety-risk-gov-socratic-1',
    type: 'socratic',
    conceptId: 'safety-risk-governance',
    title: 'Tight vs loose guardrails',
    level: 'beginner',
    socratiQuestion: 'How can overly tight guardrails harm product usefulness, and what signals tell you to adjust policy sensitivity?',
    followUpQuestions: ['Which violations matter most to reduce?', 'How do you measure false positives?'],
    expectedInsights: ['Balance risk reduction with task utility', 'Track violation and false‑positive rates'],
    hints: ['Think: policy tuning cycles, SLOs for safety'],
    explanation: 'Safety is a control system—measure and tune, do not freeze.',
    relatedConcepts: ['policy-tuning', 'approval-workflows', 'auditability'],
    timeEstimate: 7,
    successCriteria: ['Identifies tradeoff and measurement signals']
  }
];

// Socratic Questions for Cost & Performance
export const costPerformanceSocratic: StudyModeQuestion[] = [
  {
    id: 'cost-performance-socratic-1',
    type: 'socratic',
    conceptId: 'cost-performance',
    title: 'When to route to smaller models?',
    level: 'beginner',
    socratiQuestion: 'If a task family has predictable easy and hard cases, how could you decide when to route to a smaller model without hurting quality?',
    followUpQuestions: ['What proxies predict hardness?', 'How do you guard against silent quality loss?'],
    expectedInsights: ['Use confidence/heuristics to route', 'Protect with goldens and quality SLOs'],
    hints: ['Think: classifier/gatings, token budgets'],
    explanation: 'Cost‑aware routing preserves quality while reducing spend.',
    relatedConcepts: ['routing', 'token-budgets', 'quality-slo'],
    timeEstimate: 6,
    successCriteria: ['Proposes at least one safe routing signal']
  }
];

// Socratic Questions for Security & Data Boundaries
export const securityDataBoundariesSocratic: StudyModeQuestion[] = [
  {
    id: 'security-data-boundaries-socratic-1',
    type: 'socratic',
    conceptId: 'security-data-boundaries',
    title: 'Tenant isolation in RAG',
    level: 'beginner',
    socratiQuestion: 'In a multi‑tenant RAG system, what could go wrong if you only filter results by user ID at query time?',
    followUpQuestions: ['What about embeddings and caches?', 'Where else can data leak?'],
    expectedInsights: ['Isolation must cover storage, indexes, caches and tools', 'Defense‑in‑depth beats single checks'],
    hints: ['Consider pre‑compute and runtime paths'],
    explanation: 'Boundary enforcement needs multiple controls across the pipeline.',
    relatedConcepts: ['rbac', 'data-isolation', 'tool-sandboxing'],
    timeEstimate: 7,
    successCriteria: ['Lists ≥2 isolation failure modes']
  }
];

// Socratic Questions for RAG Systems
export const ragSystemsSocratic: StudyModeQuestion[] = [
  {
    id: 'rag-systems-socratic-1',
    type: 'socratic',
    conceptId: 'rag-systems',
    title: 'Why citations matter',
    level: 'beginner',
    socratiQuestion: 'Why do citations/change‑logs increase user trust in RAG answers even if the answer text looks correct?',
    followUpQuestions: ['How do you detect hallucinated citations?', 'When should you refuse rather than guess?'],
    expectedInsights: ['Grounding reduces hallucination risk', 'Users trust verifiable evidence paths'],
    hints: ['Think: provenance, re‑rankers'],
    explanation: 'Citations and evidence are core to reliable RAG.',
    relatedConcepts: ['grounding', 're-ranking', 'freshness'],
    timeEstimate: 6,
    successCriteria: ['Connects trust to verifiability']
  }
];

// Socratic Questions for Multi‑Agent Orchestration
export const multiAgentOrchestrationSocratic: StudyModeQuestion[] = [
  {
    id: 'multi-agent-orch-socratic-1',
    type: 'socratic',
    conceptId: 'multi-agent-orchestration',
    title: 'Supervisor vs free‑for‑all',
    level: 'beginner',
    socratiQuestion: 'When coordinating specialist agents, why might a supervisor decide who speaks next instead of round‑robin?',
    followUpQuestions: ['What signals would it use?', 'What failure happens without it?'],
    expectedInsights: ['Context‑aware turn‑taking improves relevance', 'Prevents loops and topic drift'],
    hints: ['Consider speaker‑selection heuristics'],
    explanation: 'Lightweight orchestration reduces chaos and improves outcomes.',
    relatedConcepts: ['speaker-selection', 'shared-state', 'termination'],
    timeEstimate: 6,
    successCriteria: ['Names at least one benefit over round‑robin']
  }
];

// Socratic Questions for Org Playbooks
export const orgPlaybooksSocratic: StudyModeQuestion[] = [
  {
    id: 'org-playbooks-socratic-1',
    type: 'socratic',
    conceptId: 'org-playbooks',
    title: 'Why playbooks beat one‑offs',
    level: 'beginner',
    socratiQuestion: 'What problems arise when teams ship AI features as one‑offs without shared playbooks?',
    followUpQuestions: ['How do playbooks speed approvals?', 'What makes a playbook credible?'],
    expectedInsights: ['Standardization reduces risk and cycle time', 'Examples + metrics make playbooks actionable'],
    hints: ['Think: reuse, governance, onboarding'],
    explanation: 'Playbooks codify proven patterns, reducing variance and risk.',
    relatedConcepts: ['enablement', 'governance', 'adoption'],
    timeEstimate: 6,
    successCriteria: ['Identifies at least two benefits of playbooks']
  }
];

export const errorWhispererQuestions: StudyModeQuestion[] = [
  {
    id: 'error-whisperer-q1',
    type: 'socratic',
    conceptId: 'error-whisperer',
    title: 'Minimum Diff Mindset',
    level: 'beginner',
    socratiQuestion: 'Why might a minimal change be preferable to a broader refactor when fixing an error?',
    followUpQuestions: ['When is a refactor warranted instead?', 'How do you validate a minimal fix?'],
    expectedInsights: ['Smaller diffs reduce risk', 'Validation confirms impact'],
    hints: ['Think rollback risk', 'Consider test scope'],
    explanation: 'Minimal, validated changes unblock quickly and teach root causes effectively.',
    relatedConcepts: ['root-cause', 'testing'],
    timeEstimate: 6,
    successCriteria: ['Lists risks minimized by small diffs']
  },
  {
    id: 'error-whisperer-q2',
    type: 'socratic',
    conceptId: 'error-whisperer',
    title: 'Teaching Through Diagnosis',
    level: 'intermediate',
    socratiQuestion: 'How can you help someone understand the "why" behind an error fix without just giving them the answer?',
    followUpQuestions: [
      'What makes an error explanation stick versus being forgotten?',
      'How do you know if they truly understand the root cause?',
      'What prevention tip would help them avoid this error family?'
    ],
    expectedInsights: [
      'Understanding root causes prevents similar errors',
      'Good explanations connect symptoms to underlying principles',
      'Prevention tips generalize beyond the specific error'
    ],
    hints: ['Focus on the mental model gap', 'Use analogies to familiar concepts', 'Connect to broader patterns'],
    explanation: 'Error Whisperer succeeds when learners can explain the cause and prevent similar issues.',
    relatedConcepts: ['debugging', 'mental-models', 'transfer-learning'],
    timeEstimate: 12,
    successCriteria: ['Describes teaching approach that builds understanding', 'Identifies transferable insights']
  }
];

export const knowledgeMapNavigatorQuestions: StudyModeQuestion[] = [
  {
    id: 'knowledge-map-navigator-q1',
    type: 'socratic',
    conceptId: 'knowledge-map-navigator',
    title: 'Prerequisite Dependencies',
    level: 'beginner',
    socratiQuestion: 'When learning a new skill, how do you identify which concepts must come first versus which can be learned in parallel?',
    followUpQuestions: [
      'What happens when you skip a fundamental prerequisite?',
      'How do you know if two skills can be learned simultaneously?',
      'What signs indicate you need to backtrack to fill a gap?'
    ],
    expectedInsights: [
      'Some knowledge forms strict dependencies while other pieces are independent',
      'Skipping prerequisites leads to confusion and false understanding',
      'Good maps show both required paths and optional branches'
    ],
    hints: ['Think about building foundations', 'Consider cognitive load', 'Look for blocking vs non-blocking dependencies'],
    explanation: 'Knowledge Map Navigator helps learners understand learning sequences and avoid frustrating detours.',
    relatedConcepts: ['curriculum-design', 'learning-paths', 'prerequisite-mapping'],
    timeEstimate: 15,
    successCriteria: ['Identifies dependency types', 'Explains consequences of wrong sequencing']
  },
  {
    id: 'knowledge-map-navigator-q2',
    type: 'socratic',
    conceptId: 'knowledge-map-navigator',
    title: 'Visual Learning Paths',
    level: 'intermediate',
    socratiQuestion: 'What makes a visual curriculum map more helpful than a simple ordered list of topics?',
    followUpQuestions: [
      'How do you represent optional versus required learning paths?',
      'What visual cues help learners see their progress?',
      'How do you handle different learning speeds and preferences?'
    ],
    expectedInsights: [
      'Visual maps show relationships and alternatives that lists miss',
      'Progress indicators motivate and guide learners',
      'Multiple paths accommodate different learning styles'
    ],
    hints: ['Think about graph vs linear structures', 'Consider learner motivation', 'Plan for individual differences'],
    explanation: 'Effective knowledge maps balance structure with flexibility, showing both requirements and choices.',
    relatedConcepts: ['visualization', 'learner-agency', 'adaptive-learning'],
    timeEstimate: 18,
    successCriteria: ['Explains advantages of visual representation', 'Describes how to handle learner variability']
  }
];

// Socratic Questions for Data Autonomy Patterns
export const dataAutonomySocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'data-autonomy-perception-q1',
    type: 'socratic',
    conceptId: 'perception-normalization',
    title: 'Why Normalize Perception First?',
    level: 'beginner',
    socratiQuestion: 'If an agent skips building a compact InfoBox and goes straight to planning, what subtle failures might appear later?',
    followUpQuestions: [
      'How could missing null distribution insight distort decomposition?',
      'What governance signals might be ignored?',
      'How does token noise affect planning determinism?'
    ],
    expectedInsights: [
      'Unnormalized context leads to hallucinated or brittle plan assumptions',
      'Governance / sensitivity gaps risk policy violations',
      'High‑entropy raw dumps increase token cost & reduce reproducibility'
    ],
    hints: ['Think: schema drift, PHI redaction, compression effects'],
    explanation: 'Perception normalization front‑loads reliable structure and safety signals that stabilize all downstream patterns.',
    relatedConcepts: ['schema-grounding', 'governance-tags', 'cost-optimization'],
    timeEstimate: 8,
    successCriteria: ['Names at least two downstream failure modes', 'Connects normalization to determinism']
  },
  {
    id: 'data-autonomy-decomposition-q1',
    type: 'socratic',
    conceptId: 'schema-aware-decomposition',
    title: 'Detecting Over vs Under Decomposition',
    level: 'intermediate',
    socratiQuestion: 'What evidence would show a decomposition created too many subtasks versus too few?',
    followUpQuestions: [
      'How do redundant subtasks manifest in metrics?',
      'Which signals imply hidden coupled goals?',
      'How would you instrument coverage?'
    ],
    expectedInsights: [
      'Over decomposition: low incremental value per subtask, repeated entity sets',
      'Under decomposition: large subtasks with mixed intents and ambiguous dependencies',
      'Coverage metrics align subtasks to referenced entities and requirements'
    ],
    hints: ['Consider token per subtask variance', 'Look at dependency graph density'],
    explanation: 'Balanced decomposition maximizes clarity while minimizing orchestration overhead.',
    relatedConcepts: ['plan-graph', 'dependency-ordering', 'cost-metrics'],
    timeEstimate: 10,
    successCriteria: ['Defines both over and under signals', 'Proposes at least one coverage metric']
  },
  {
    id: 'data-autonomy-grounding-q1',
    type: 'socratic',
    conceptId: 'action-grounding-verification',
    title: 'Layered Verification Logic',
    level: 'intermediate',
    socratiQuestion: 'Why separate schema validation from policy gating before a dry run rather than combining them into one mega check?',
    followUpQuestions: [
      'How does error specificity improve regeneration?',
      'What ordering reduces wasted sandbox executions?',
      'When might you short‑circuit early?'
    ],
    expectedInsights: [
      'Layered checks give precise feedback loops',
      'Early cheap failures save cost and latency',
      'Policy rules often depend on already schema‑validated form'
    ],
    hints: ['Think: progressive narrowing', 'Cost of dry run vs static parse'],
    explanation: 'Layer sequencing optimizes both safety and efficiency.',
    relatedConcepts: ['progressive-validation', 'retry-loops', 'sandboxing'],
    timeEstimate: 9,
    successCriteria: ['States at least two benefits of layering', 'Identifies an early short‑circuit condition']
  },
  {
    id: 'data-autonomy-execution-q1',
    type: 'socratic',
    conceptId: 'budget-constrained-execution',
    title: 'Deciding to Early Stop',
    level: 'advanced',
    socratiQuestion: 'What composite signals could justify halting the execution loop before all subtasks finish?',
    followUpQuestions: [
      'How does diminishing marginal utility appear in metrics?',
      'What guard prevents premature success?',
      'How do you persist partial artifacts safely?'
    ],
    expectedInsights: [
      'Use multi-signal gating: confidence, coverage %, cost burn rate',
      'Require stability across recent steps to avoid flukes',
      'Checkpointing preserves partial progress for resumability'
    ],
    hints: ['Graph completion ratio vs value accrual', 'Quality delta thresholds'],
    explanation: 'Early stopping maintains ROI by ceasing low-yield refinements while ensuring safe recoverability.',
    relatedConcepts: ['adaptive-heuristics', 'checkpointing', 'quality-metrics'],
    timeEstimate: 11,
    successCriteria: ['Lists at least two composite signals', 'Mentions a safeguard against premature stop']
  }
  ,
  {
    id: 'data-autonomy-policy-gate-q1',
    type: 'socratic',
    conceptId: 'policy-gated-tool-invocation',
    title: 'Why Gate Before Invocation?',
    level: 'intermediate',
    socratiQuestion: 'If an agent calls tools directly after decomposition without intent → capability mapping, what compounded risks emerge?',
    followUpQuestions: [
      'How does ambiguous intent inflate false positives or misses in policy checks?',
      'What telemetry gaps appear without explicit risk scoring?',
      'How would you prove gating reduced near-miss incidents?'
    ],
    expectedInsights: [
      'Unmapped intents lead to brittle string policy filters',
      'Risk scoring produces ranked mitigation focus',
      'Structured gating yields measurable reduction in violations'
    ],
    hints: ['Think: capability registry, policy lattice layering', 'Consider audit trails & signed invocations'],
    explanation: 'Policy gating mediates semantic ambiguity and enforces consistent preconditions before side effects.',
    relatedConcepts: ['action-grounding-verification', 'governance-tags'],
    timeEstimate: 9,
    successCriteria: ['Names at least two compounded risks', 'Links mapping to measurable mitigation']
  },
  {
    id: 'data-autonomy-quality-loop-q1',
    type: 'socratic',
    conceptId: 'data-quality-feedback-repair-loop',
    title: 'From Detection to Stable Repair',
    level: 'intermediate',
    socratiQuestion: 'Why is a naive “detect → fix” pipeline insufficient for durable data quality remediation?',
    followUpQuestions: [
      'What metrics confirm a repair improved rather than overfitted?',
      'How do you prioritize among multiple candidate repairs?',
      'When do you roll back a deployed repair?'
    ],
    expectedInsights: [
      'Closed-loop validation prevents regressions',
      'Ranking repairs via impact + reversibility',
      'Post-repair monitoring ensures stability'
    ],
    hints: ['Consider shadow validation windows', 'Think KPI variance stabilization'],
    explanation: 'A feedback loop with validation + monitoring avoids oscillating or overfitted fixes.',
    relatedConcepts: ['anomaly-detection', 'governance'],
    timeEstimate: 10,
    successCriteria: ['Identifies overfitting or unstable repair risk']
  },
  {
    id: 'data-autonomy-query-intent-q1',
    type: 'socratic',
    conceptId: 'query-intent-structured-access',
    title: 'Binding Intent Safely',
    level: 'beginner',
    socratiQuestion: 'What subtle security & correctness issues arise if natural language query terms are interpolated directly into SQL templates?',
    followUpQuestions: [
      'How does entity ambiguity propagate to wrong joins?',
      'What prevents unauthorized table leakage?',
      'How do confidence thresholds change plan generation?'
    ],
    expectedInsights: [
      'Direct interpolation risks injection & hallucinated entities',
      'Binding enforces whitelist & policy scopes',
      'Low-confidence bindings trigger clarification or fallback'
    ],
    hints: ['Think: entity resolution vs raw tokens', 'Consider policy evaluation points'],
    explanation: 'Structured binding plus policy evaluation lowers both leakage and hallucination probability.',
    relatedConcepts: ['schema-aware-decomposition', 'perception-normalization'],
    timeEstimate: 7,
    successCriteria: ['Mentions both security and correctness risks']
  },
  {
    id: 'data-autonomy-strategy-replay-q1',
    type: 'socratic',
    conceptId: 'strategy-memory-replay',
    title: 'When to Replay vs Rebuild',
    level: 'advanced',
    socratiQuestion: 'How do you decide between reusing an historical execution strategy and generating a fresh plan?',
    followUpQuestions: [
      'What freshness or drift signals invalidate reuse?',
      'How do adaptation heuristics avoid stale dependencies?',
      'What is the cost trade-off vs potential bias?'
    ],
    expectedInsights: [
      'Similarity + freshness thresholds gate replay',
      'Adaptive mutation prunes stale nodes',
      'Reuse accelerates planning with measured bias risk'
    ],
    hints: ['Consider embedding versioning', 'Think about plan graph structural distance'],
    explanation: 'Strategy replay accelerates planning when validated for relevance & freshness.',
    relatedConcepts: ['budget-constrained-execution', 'memory-retrieval'],
    timeEstimate: 9,
    successCriteria: ['Names reuse gating signals', 'Addresses bias or drift risk']
  }
];

export const contextCuratorQuestions: StudyModeQuestion[] = [
  {
    id: 'context-curator-q1',
    type: 'socratic',
    conceptId: 'context-curator',
    title: 'Signal vs Noise',
    level: 'beginner',
    socratiQuestion: 'When someone says "I checked the docs but I\'m still confused," what might have gone wrong in their search process?',
    followUpQuestions: [
      'How can too much information be worse than too little?',
      'What makes documentation relevant versus just accurate?',
      'How do you know when you have the right amount of context?'
    ],
    expectedInsights: [
      'Information overload prevents understanding as much as information scarcity',
      'Relevance matters more than completeness for focused tasks',
      'Good curation reduces cognitive load and search time'
    ],
    hints: ['Think about attention and working memory limits', 'Consider task-specific relevance', 'Focus on actionable information'],
    explanation: 'Context Curator solves the paradox where more information can make tasks harder, not easier.',
    relatedConcepts: ['information-retrieval', 'cognitive-load', 'search-optimization'],
    timeEstimate: 12,
    successCriteria: ['Identifies information overload problems', 'Explains relevance vs accuracy distinction']
  },
  {
    id: 'context-curator-q2',
    type: 'socratic',
    conceptId: 'context-curator',
    title: 'Trust and Freshness',
    level: 'intermediate',
    socratiQuestion: 'How do you balance using trusted but older documentation versus newer but unverified examples?',
    followUpQuestions: [
      'What signals indicate when information might be outdated?',
      'How do you verify the reliability of a code example?',
      'What\'s the cost of using stale guidance versus experimental approaches?'
    ],
    expectedInsights: [
      'Trust and freshness often trade off against each other',
      'Version mismatches are a common source of confusion',
      'Good curation includes quality signals beyond just content'
    ],
    hints: ['Consider API evolution', 'Look for community validation', 'Check for deprecation warnings'],
    explanation: 'Context Curator must weigh multiple quality factors to select truly helpful resources.',
    relatedConcepts: ['information-quality', 'source-evaluation', 'version-management'],
    timeEstimate: 15,
    successCriteria: ['Describes trust vs freshness tradeoffs', 'Lists quality evaluation criteria']
  }
];

export const rubricRaterQuestions: StudyModeQuestion[] = [
  {
    id: 'rubric-rater-q1',
    type: 'socratic',
    conceptId: 'rubric-rater',
    title: 'Transparent Criteria',
    level: 'beginner',
    socratiQuestion: 'Why might students perform better when they know exactly how they\'ll be evaluated before starting work?',
    followUpQuestions: [
      'What happens when grading criteria are vague or hidden?',
      'How do clear rubrics change how students approach tasks?',
      'What makes feedback more actionable than just a score?'
    ],
    expectedInsights: [
      'Transparent criteria help students self-assess and improve',
      'Clear rubrics reduce grading inconsistency and bias',
      'Specific feedback enables targeted improvement'
    ],
    hints: ['Think about goal clarity', 'Consider self-regulation', 'Focus on improvement opportunities'],
    explanation: 'Rubric Rater works best when criteria are transparent and feedback is specific and actionable.',
    relatedConcepts: ['assessment-design', 'feedback-loops', 'self-regulation'],
    timeEstimate: 10,
    successCriteria: ['Explains benefits of transparent criteria', 'Distinguishes scores from actionable feedback']
  },
  {
    id: 'rubric-rater-q2',
    type: 'socratic',
    conceptId: 'rubric-rater',
    title: 'Evidence-Based Scoring',
    level: 'intermediate',
    socratiQuestion: 'How can you make grading more consistent when different evaluators might interpret the same rubric differently?',
    followUpQuestions: [
      'What role do concrete examples play in rubric reliability?',
      'How do you balance detailed criteria with flexibility?',
      'What evidence should a grade decision cite?'
    ],
    expectedInsights: [
      'Rubrics with examples and anchor points increase consistency',
      'Good grades cite specific evidence from the work',
      'Calibration across evaluators improves fairness'
    ],
    hints: ['Think about inter-rater reliability', 'Consider concrete anchors', 'Plan for edge cases'],
    explanation: 'Effective rubrics combine clear criteria with concrete examples and evidence requirements.',
    relatedConcepts: ['assessment-reliability', 'evidence-based-evaluation', 'calibration'],
    timeEstimate: 14,
    successCriteria: ['Describes consistency challenges', 'Explains role of evidence in grading']
  }
];

export const selfRemediationLoopQuestions: StudyModeQuestion[] = [
  {
    id: 'self-remediation-loop-q1',
    type: 'socratic',
    conceptId: 'self-remediation-loop',
    title: 'Works on My Machine Problem',
    level: 'beginner',
    socratiQuestion: 'When code "works on my machine" but fails elsewhere, what kinds of assumptions might the developer have made?',
    followUpQuestions: [
      'How can you systematically discover these hidden assumptions?',
      'What makes some environment differences more dangerous than others?',
      'How do you design tests that catch environment-specific issues?'
    ],
    expectedInsights: [
      'Hidden environment assumptions cause deployment failures',
      'Systematic testing reveals unstated dependencies',
      'Good tests verify behavior across different conditions'
    ],
    hints: ['Think about implicit dependencies', 'Consider environment variations', 'Focus on boundary conditions'],
    explanation: 'Self-Remediation Loop helps catch and fix the gap between local development and real deployment.',
    relatedConcepts: ['environment-management', 'testing-strategies', 'deployment-validation'],
    timeEstimate: 12,
    successCriteria: ['Identifies common hidden assumptions', 'Explains systematic discovery approaches']
  },
  {
    id: 'self-remediation-loop-q2',
    type: 'socratic',
    conceptId: 'self-remediation-loop',
    title: 'Minimal Safe Changes',
    level: 'intermediate',
    socratiQuestion: 'When fixing a failing test, how do you decide between a quick patch and a broader refactor?',
    followUpQuestions: [
      'What risks does each approach carry?',
      'How do you validate that a minimal change actually solves the problem?',
      'When does technical debt become worth addressing?'
    ],
    expectedInsights: [
      'Minimal changes reduce risk but may not address root causes',
      'Good fixes include validation that they solve the right problem',
      'Sometimes quick fixes are appropriate, sometimes deeper changes are needed'
    ],
    hints: ['Consider scope of impact', 'Think about validation strategies', 'Balance urgency with quality'],
    explanation: 'Self-Remediation Loop must balance quick fixes with sustainable solutions.',
    relatedConcepts: ['technical-debt', 'risk-management', 'validation-strategies'],
    timeEstimate: 16,
    successCriteria: ['Explains tradeoffs between approaches', 'Describes validation methods']
  }
];

export const spacedRepetitionPlannerQuestions: StudyModeQuestion[] = [
  {
    id: 'spaced-repetition-planner-q1',
    type: 'socratic',
    conceptId: 'spaced-repetition-planner',
    title: 'Forgetting Curve Insights',
    level: 'beginner',
    socratiQuestion: 'Why do you think reviewing something right before you\'re about to forget it works better than reviewing it while you still remember it clearly?',
    followUpQuestions: [
      'What happens to memory strength when recall requires effort versus when it\'s easy?',
      'How can you tell when someone is about to forget something they learned?',
      'What\'s the difference between recognition and recall in learning?'
    ],
    expectedInsights: [
      'Effortful recall strengthens memory more than easy review',
      'Optimal timing happens just before forgetting occurs',
      'Active recall is more effective than passive recognition'
    ],
    hints: ['Think about muscle memory and exercise', 'Consider the "use it or lose it" principle', 'Focus on retrieval practice'],
    explanation: 'Spaced Repetition Planner leverages the science of memory consolidation and forgetting curves.',
    relatedConcepts: ['memory-consolidation', 'retrieval-practice', 'learning-science'],
    timeEstimate: 14,
    successCriteria: ['Explains effortful recall benefits', 'Understands timing principles']
  },
  {
    id: 'spaced-repetition-planner-q2',
    type: 'socratic',
    conceptId: 'spaced-repetition-planner',
    title: 'Adaptive Scheduling',
    level: 'intermediate',
    socratiQuestion: 'How should a spaced repetition system adjust when someone consistently gets an item wrong versus when they get it right easily?',
    followUpQuestions: [
      'What does repeated failure suggest about the learning material or method?',
      'How do you balance review frequency with overall study load?',
      'What role should learner confidence play in scheduling decisions?'
    ],
    expectedInsights: [
      'Repeated failures may indicate need for different approach, not just more practice',
      'Successful recalls can extend intervals, but failures should shorten them',
      'Individual differences require personalized scheduling algorithms'
    ],
    hints: ['Consider individual learning curves', 'Think about cognitive load management', 'Plan for different difficulty levels'],
    explanation: 'Effective spaced repetition adapts to individual performance and manages overall study burden.',
    relatedConcepts: ['adaptive-learning', 'personalization', 'cognitive-load-theory'],
    timeEstimate: 18,
    successCriteria: ['Describes adaptive scheduling principles', 'Explains individual difference handling']
  }
];

export const challengeLadderGeneratorQuestions: StudyModeQuestion[] = [
  {
    id: 'challenge-ladder-generator-q1',
    type: 'socratic',
    conceptId: 'challenge-ladder-generator',
    title: 'Just Right Difficulty',
    level: 'beginner',
    socratiQuestion: 'How can you tell if a practice challenge is too easy, too hard, or just right for building a specific skill?',
    followUpQuestions: [
      'What signs indicate a learner is ready for the next difficulty level?',
      'How big should the jump be between consecutive challenges?',
      'What happens when challenges have uneven difficulty progression?'
    ],
    expectedInsights: [
      'Optimal challenge creates struggle without overwhelming',
      'Small consistent steps build confidence and skill',
      'Difficulty should increase gradually and predictably'
    ],
    hints: ['Think about flow state and zone of proximal development', 'Consider skill building vs skill proving', 'Focus on sustainable progression'],
    explanation: 'Challenge Ladder Generator creates optimal learning progressions that build mastery incrementally.',
    relatedConcepts: ['zone-of-proximal-development', 'deliberate-practice', 'skill-building'],
    timeEstimate: 13,
    successCriteria: ['Identifies optimal challenge characteristics', 'Explains progression principles']
  },
  {
    id: 'challenge-ladder-generator-q2',
    type: 'socratic',
    conceptId: 'challenge-ladder-generator',
    title: 'Production-Like Progression',
    level: 'intermediate',
    socratiQuestion: 'What\'s the difference between toy problems and production-like challenges, and why does this progression matter?',
    followUpQuestions: [
      'How do you gradually introduce real-world complexity without overwhelming beginners?',
      'What aspects of production systems are most important to simulate?',
      'How do you maintain learning focus while adding realistic constraints?'
    ],
    expectedInsights: [
      'Toy problems isolate concepts but lack realistic complexity',
      'Production-like challenges prepare learners for real work',
      'Gradual complexity introduction prevents cognitive overload'
    ],
    hints: ['Consider real-world constraints and edge cases', 'Think about system integration challenges', 'Plan for messiness and ambiguity'],
    explanation: 'Effective challenge ladders bridge the gap between clean examples and messy reality.',
    relatedConcepts: ['transfer-learning', 'real-world-complexity', 'authentic-assessment'],
    timeEstimate: 16,
    successCriteria: ['Contrasts toy vs production challenges', 'Describes complexity introduction strategies']
  }
];

export const peerReviewSimulatorQuestions: StudyModeQuestion[] = [
  {
    id: 'peer-review-simulator-q1',
    type: 'socratic',
    conceptId: 'peer-review-simulator',
    title: 'Code Review Culture',
    level: 'beginner',
    socratiQuestion: 'Why might a team\'s code quality improve even when their review process catches obvious issues that linters could find?',
    followUpQuestions: [
      'What does the review process teach beyond finding bugs?',
      'How does knowing your code will be reviewed change how you write it?',
      'What makes feedback constructive versus demoralizing?'
    ],
    expectedInsights: [
      'Review process creates accountability and learning opportunities',
      'Anticipating review improves initial code quality',
      'Good reviews teach principles, not just catch errors'
    ],
    hints: ['Think about psychological effects', 'Consider knowledge sharing', 'Focus on team learning'],
    explanation: 'Peer Review Simulator helps establish review culture that improves both code and developer skills.',
    relatedConcepts: ['code-quality', 'team-learning', 'feedback-culture'],
    timeEstimate: 12,
    successCriteria: ['Explains cultural benefits beyond bug catching', 'Describes constructive feedback principles']
  },
  {
    id: 'peer-review-simulator-q2',
    type: 'socratic',
    conceptId: 'peer-review-simulator',
    title: 'Standards and Consistency',
    level: 'intermediate',
    socratiQuestion: 'How can a team maintain consistent code review standards when different reviewers have different experience levels and preferences?',
    followUpQuestions: [
      'What should be automated versus requiring human judgment?',
      'How do you handle disagreements about code style or approach?',
      'What makes review feedback actionable versus just opinions?'
    ],
    expectedInsights: [
      'Clear standards reduce reviewer variability and bias',
      'Automation handles mechanical issues, humans focus on design',
      'Good standards distinguish requirements from preferences'
    ],
    hints: ['Consider automation boundaries', 'Think about team agreement processes', 'Focus on objective criteria'],
    explanation: 'Effective peer review balances standards with human judgment and team dynamics.',
    relatedConcepts: ['code-standards', 'automation-boundaries', 'team-consensus'],
    timeEstimate: 15,
    successCriteria: ['Describes consistency challenges', 'Explains automation vs human review division']
  }
];

export const reflectionJournalerQuestions: StudyModeQuestion[] = [
  {
    id: 'reflection-journaler-q1',
    type: 'socratic',
    conceptId: 'reflection-journaler',
    title: 'Learning from Experience',
    level: 'beginner',
    socratiQuestion: 'Why do two people often learn different things from the same experience, and how can structured reflection help?',
    followUpQuestions: [
      'What makes some experiences more educational than others?',
      'How do you capture insights while they\'re still fresh?',
      'What questions help extract the most learning from an experience?'
    ],
    expectedInsights: [
      'Active reflection transforms experience into learning',
      'Different people notice different patterns and lessons',
      'Structured questions improve insight extraction'
    ],
    hints: ['Think about attention and interpretation', 'Consider metacognitive awareness', 'Focus on pattern recognition'],
    explanation: 'Reflection Journaler helps learners systematically extract insights and identify patterns.',
    relatedConcepts: ['metacognition', 'experiential-learning', 'pattern-recognition'],
    timeEstimate: 11,
    successCriteria: ['Explains value of structured reflection', 'Identifies effective reflection questions']
  },
  {
    id: 'reflection-journaler-q2',
    type: 'socratic',
    conceptId: 'reflection-journaler',
    title: 'Transfer Learning',
    level: 'intermediate',
    socratiQuestion: 'How can reflection help someone apply lessons from one context to completely different situations?',
    followUpQuestions: [
      'What makes some insights more transferable than others?',
      'How do you recognize patterns across different domains?',
      'What role do tags and categories play in connecting experiences?'
    ],
    expectedInsights: [
      'Abstract principles transfer better than specific solutions',
      'Good reflection identifies underlying patterns and principles',
      'Organization systems help connect related insights'
    ],
    hints: ['Think about abstraction levels', 'Consider analogical reasoning', 'Focus on general principles'],
    explanation: 'Effective reflection captures transferable insights that apply beyond the original context.',
    relatedConcepts: ['transfer-learning', 'abstraction', 'analogical-reasoning'],
    timeEstimate: 14,
    successCriteria: ['Describes transferability factors', 'Explains pattern recognition across domains']
  }
];

export const handoffSummarizerQuestions: StudyModeQuestion[] = [
  {
    id: 'handoff-summarizer-q1',
    type: 'socratic',
    conceptId: 'handoff-summarizer',
    title: 'Context Preservation',
    level: 'beginner',
    socratiQuestion: 'When you hand off work to someone else, what information is most critical to include versus what can be safely omitted?',
    followUpQuestions: [
      'How do you balance completeness with brevity in handoff summaries?',
      'What happens when important context gets lost during transitions?',
      'How can you test if your handoff summary is effective?'
    ],
    expectedInsights: [
      'Critical context includes decisions made, alternatives considered, and current state',
      'Too much detail overwhelms, too little creates confusion',
      'Good handoffs enable smooth continuation without rework'
    ],
    hints: ['Think about decision rationale', 'Consider what the next person needs to know', 'Focus on actionable information'],
    explanation: 'Handoff Summarizer captures essential context while filtering out noise for effective transitions.',
    relatedConcepts: ['knowledge-transfer', 'decision-documentation', 'communication-efficiency'],
    timeEstimate: 13,
    successCriteria: ['Identifies critical vs optional information', 'Explains testing handoff effectiveness']
  },
  {
    id: 'handoff-summarizer-q2',
    type: 'socratic',
    conceptId: 'handoff-summarizer',
    title: 'Multi-Agent Coordination',
    level: 'intermediate',
    socratiQuestion: 'In a multi-agent system, how do different types of agents need different styles of handoff information?',
    followUpQuestions: [
      'What does a code-writing agent need to know that a testing agent doesn\'t?',
      'How do you handle handoffs when agents have different capabilities?',
      'What common handoff mistakes cause agent workflows to break down?'
    ],
    expectedInsights: [
      'Different agent types need different information formats and detail levels',
      'Agent capabilities determine what handoff information is actionable',
      'Failed handoffs often result from capability mismatches'
    ],
    hints: ['Consider agent specializations', 'Think about capability boundaries', 'Focus on actionable vs informational content'],
    explanation: 'Effective agent handoffs match information style and content to recipient capabilities.',
    relatedConcepts: ['multi-agent-systems', 'agent-capabilities', 'workflow-orchestration'],
    timeEstimate: 17,
    successCriteria: ['Describes agent-specific handoff needs', 'Explains capability-information matching']
  }
];

export const misconceptionDetectorQuestions: StudyModeQuestion[] = [
  {
    id: 'misconception-detector-q1',
    type: 'socratic',
    conceptId: 'misconception-detector',
    title: 'Mental Model Bugs',
    level: 'beginner',
    socratiQuestion: 'Why do some programming errors keep happening even after students are corrected multiple times?',
    followUpQuestions: [
      'What\'s the difference between not knowing something and having a wrong mental model?',
      'How can you tell if someone has a misconception versus just making a careless mistake?',
      'What makes some misconceptions harder to correct than others?'
    ],
    expectedInsights: [
      'Misconceptions are systematic errors from wrong mental models',
      'Strong misconceptions resist simple correction',
      'Recurring errors often indicate underlying misconceptions'
    ],
    hints: ['Think about mental models vs surface knowledge', 'Consider pattern in errors', 'Focus on systematic vs random mistakes'],
    explanation: 'Misconception Detector identifies and corrects systematic errors caused by wrong mental models.',
    relatedConcepts: ['mental-models', 'conceptual-change', 'error-patterns'],
    timeEstimate: 12,
    successCriteria: ['Distinguishes misconceptions from mistakes', 'Explains why misconceptions persist']
  },
  {
    id: 'misconception-detector-q2',
    type: 'socratic',
    conceptId: 'misconception-detector',
    title: 'Targeted Correction',
    level: 'intermediate',
    socratiQuestion: 'How do you design a correction that replaces a wrong mental model rather than just adding more information?',
    followUpQuestions: [
      'What makes some explanations more effective at changing minds than others?',
      'How do you address the emotional aspect of being wrong about something you were confident in?',
      'What role do concrete examples play in mental model correction?'
    ],
    expectedInsights: [
      'Effective corrections directly address the wrong model, not just add facts',
      'Conceptual change can be emotionally challenging',
      'Good examples highlight the difference between old and new models'
    ],
    hints: ['Think about cognitive dissonance', 'Consider direct confrontation vs gradual change', 'Focus on model replacement'],
    explanation: 'Successful misconception correction requires targeted interventions that replace wrong models.',
    relatedConcepts: ['conceptual-change', 'cognitive-dissonance', 'model-replacement'],
    timeEstimate: 16,
    successCriteria: ['Describes model replacement strategies', 'Explains emotional aspects of correction']
  }
];

export const timeboxPairProgrammerQuestions: StudyModeQuestion[] = [
  {
    id: 'timebox-pair-programmer-q1',
    type: 'socratic',
    conceptId: 'timebox-pair-programmer',
    title: 'Breaking Analysis Paralysis',
    level: 'beginner',
    socratiQuestion: 'When someone is stuck overthinking a coding problem, how can forcing them to commit to something small help them make progress?',
    followUpQuestions: [
      'What\'s the psychological effect of having a strict time limit?',
      'Why might an imperfect solution be better than no solution?',
      'How do small demos help build momentum?'
    ],
    expectedInsights: [
      'Time constraints force decision-making and reduce overthinking',
      'Small concrete progress beats large theoretical plans',
      'Demos provide feedback and motivation'
    ],
    hints: ['Think about perfectionism vs progress', 'Consider feedback loops', 'Focus on momentum building'],
    explanation: 'Timebox Pair Programmer uses time pressure and small deliverables to overcome analysis paralysis.',
    relatedConcepts: ['analysis-paralysis', 'timeboxing', 'iterative-development'],
    timeEstimate: 10,
    successCriteria: ['Explains time pressure benefits', 'Describes momentum building through small wins']
  },
  {
    id: 'timebox-pair-programmer-q2',
    type: 'socratic',
    conceptId: 'timebox-pair-programmer',
    title: 'Effective Pairing Cycles',
    level: 'intermediate',
    socratiQuestion: 'How do you structure a 25-minute pairing session to maximize learning and progress?',
    followUpQuestions: [
      'What should happen in the first 5 minutes versus the last 5 minutes?',
      'How do you balance exploration with concrete deliverables?',
      'What makes a good stopping point for a timebox?'
    ],
    expectedInsights: [
      'Good timeboxes have clear goals and scope from the start',
      'Sessions should end with something demonstrable',
      'Regular cycles build skills through repetition'
    ],
    hints: ['Think about session structure', 'Consider goal setting and scoping', 'Focus on completion criteria'],
    explanation: 'Effective timeboxed pairing balances learning goals with concrete progress in short cycles.',
    relatedConcepts: ['pair-programming', 'session-planning', 'goal-setting'],
    timeEstimate: 14,
    successCriteria: ['Describes effective session structure', 'Explains completion criteria']
  }
];

export const toolUseCoachQuestions: StudyModeQuestion[] = [
  {
    id: 'tool-use-coach-q1',
    type: 'socratic',
    conceptId: 'tool-use-coach',
    title: 'API Misuse Patterns',
    level: 'beginner',
    socratiQuestion: 'Why do developers often struggle with APIs even when the documentation seems clear and complete?',
    followUpQuestions: [
      'What\'s the difference between knowing an API exists and knowing how to use it properly?',
      'How do common usage patterns differ from edge cases in APIs?',
      'What makes some APIs more error-prone than others?'
    ],
    expectedInsights: [
      'Documentation often shows isolated examples, not real usage patterns',
      'APIs have implicit assumptions and gotchas not obvious from signatures',
      'Good tool coaching includes common patterns and failure modes'
    ],
    hints: ['Think about examples vs real usage', 'Consider implicit assumptions', 'Focus on common failure modes'],
    explanation: 'Tool Use Coach bridges the gap between API documentation and effective real-world usage.',
    relatedConcepts: ['api-design', 'documentation-gaps', 'usage-patterns'],
    timeEstimate: 11,
    successCriteria: ['Identifies documentation vs usage gaps', 'Explains common API struggles']
  },
  {
    id: 'tool-use-coach-q2',
    type: 'socratic',
    conceptId: 'tool-use-coach',
    title: 'Disciplined Tool Usage',
    level: 'intermediate',
    socratiQuestion: 'How can you help someone develop better judgment about when to use a powerful tool versus when to avoid it?',
    followUpQuestions: [
      'What are signs that someone is over-using or under-using a tool?',
      'How do you balance following best practices with situational needs?',
      'What role do validation checklists play in tool usage?'
    ],
    expectedInsights: [
      'Good tool usage requires understanding both capabilities and limitations',
      'Best practices provide guidelines but need situational judgment',
      'Validation helps catch misuse before it causes problems'
    ],
    hints: ['Think about tool appropriateness', 'Consider context-dependent decisions', 'Focus on judgment development'],
    explanation: 'Tool Use Coach develops discriminating judgment about appropriate tool usage and validation.',
    relatedConcepts: ['tool-selection', 'best-practices', 'validation-strategies'],
    timeEstimate: 15,
    successCriteria: ['Describes judgment development approaches', 'Explains validation role in tool usage']
  }
];


// Socratic Questions for Agentic RAG
export const agenticRAGSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-rag-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-rag',
    title: 'Understanding the Limits of Memory',
    level: 'beginner',
    socratiQuestion: "Imagine you're a librarian helping someone find information. You have an excellent memory but the library has millions of books. What's the fundamental challenge you face, and how might you solve it?",
    followUpQuestions: [
      "What if the person asks about something very specific that you've never encountered?",
      "How would you verify that the information you found is relevant and accurate?",
      "What if you need to combine information from multiple sources?"
    ],
    expectedInsights: [
      "Even with good memory, you can't remember everything",
      "You need a systematic way to search and retrieve information",
      "Verification and relevance checking are crucial",
      "Combining multiple sources requires careful synthesis"
    ],
    hints: [
      "Think about the difference between what you know and what you can find",
      "Consider how librarians actually help people find information",
      "Reflect on the challenges of information quality and relevance"
    ],
    explanation: "This exploration helps students understand why RAG (Retrieval-Augmented Generation) systems are needed and how adding 'agentic' behavior makes them more intelligent.",
    relatedConcepts: ['information-retrieval', 'knowledge-management', 'verification'],
    timeEstimate: 12,
    successCriteria: [
      "Understands the limitations of memory alone",
      "Recognizes the need for systematic retrieval",
      "Sees the importance of verification and synthesis"
    ]
  },
  {
    id: 'agentic-rag-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-rag',
    title: 'The Art of Asking Better Questions',
    level: 'intermediate',
    socratiQuestion: "When someone asks you a vague question like 'Tell me about dogs,' how do you decide what specific information to provide? What makes some follow-up questions better than others?",
    followUpQuestions: [
      "How would you refine a search query to get more precise results?",
      "What if your first search doesn't yield good results - what would you do differently?",
      "How do you decide when you have enough information to give a complete answer?"
    ],
    expectedInsights: [
      "Good questions are specific and contextual",
      "Query refinement is an iterative process",
      "Multiple search strategies may be needed",
      "Knowing when to stop searching is important"
    ],
    hints: [
      "Think about how you naturally clarify ambiguous requests",
      "Consider the difference between broad and targeted searches",
      "Reflect on how expert researchers approach information gathering"
    ],
    explanation: "This helps students understand the 'agentic' part of Agentic RAG - how an agent can intelligently plan and refine its information retrieval strategy.",
    relatedConcepts: ['query-refinement', 'search-strategy', 'information-planning'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the importance of query refinement",
      "Recognizes iterative search strategies",
      "Sees the value of intelligent planning in information retrieval"
    ]
  }
];

// Socratic Questions for Agentic Commerce & AP2
export const agenticCommerceAp2SocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-commerce-ap2-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-commerce-ap2',
    title: 'Why Split Mandates?',
    level: 'intermediate',
    socratiQuestion: 'What risk is reduced by splitting delegated purchasing into Intent, Cart, and Payment mandates instead of a single combined authorization? What emerges when you separate them?',
    expectedInsights: [
      'Limits blast radius of misuse',
      'Improves auditability & non-repudiation',
      'Prevents silent mutation of cart contents'
    ],
    hints: [ 'Consider post-hoc dispute investigation', 'Think about tampering vs binding' ],
    explanation: 'Isolation + cryptographic linkage localizes compromise and yields strong forensic evidence.',
    relatedConcepts: ['agent-security','mcp-a2a-integration','agentic-commerce-ap2'],
    timeEstimate: 60
  },
  {
    id: 'agentic-commerce-ap2-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-commerce-ap2',
    title: 'Expiry & Presence Mode',
    level: 'beginner',
    socratiQuestion: 'Why does the Intent Mandate carry an expiry and presence mode, and what failures emerge if either is omitted?',
    expectedInsights: [ 'Prevents indefinite reuse', 'Supports risk-tiered payment routing', 'Enables escalation gating' ],
    hints: [ 'Replay risk', 'Risk scoring engines rely on mode' ],
    explanation: 'Without expiry authority persists; without presence mode networks mis-price risk or block flows.',
    relatedConcepts: ['agent-security','agentic-commerce-ap2'],
    timeEstimate: 55
  },
  {
    id: 'agentic-commerce-ap2-socratic-3',
    type: 'socratic',
    conceptId: 'agentic-commerce-ap2',
    title: 'Hash Linking & Disputes',
    level: 'intermediate',
    socratiQuestion: 'How does cryptographic hash-linking between mandates improve customer dispute resolution latency?',
    expectedInsights: [ 'Deterministic lineage', 'Tamper evidence', 'Fast automated reconstruction' ],
    hints: [ 'Hash chain = O(n) verification', 'Immutable snapshot vs dynamic cart' ],
    explanation: 'Chain enables immediate integrity check and root cause mapping without heuristic correlation.',
    relatedConcepts: ['agent-security','observability','agentic-commerce-ap2'],
    timeEstimate: 65
  },
  {
    id: 'agentic-commerce-ap2-socratic-4',
    type: 'socratic',
    conceptId: 'agentic-commerce-ap2',
    title: 'Adaptive Revocation Triggers',
    level: 'advanced',
    socratiQuestion: 'What governance signal would trigger revocation of an existing Intent Mandate before expiry?',
    expectedInsights: [ 'Anomalous vendor pattern', 'Budget threshold breach', 'Fraud / risk escalation event' ],
    hints: [ 'Dynamic risk scoring', 'Spend velocity anomaly' ],
    explanation: 'Adaptive governance shrinks attack window by revoking at detection time rather than waiting for expiry.',
    relatedConcepts: ['agent-security','agent-ops','governance','agentic-commerce-ap2'],
    timeEstimate: 75
  }
];

// Socratic Questions for Modern Tool Use
export const modernToolUseSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'tool-use-socratic-1',
    type: 'socratic',
    conceptId: 'modern-tool-use',
    title: 'Tools as Extensions of Intelligence',
    level: 'beginner',
    socratiQuestion: "Think about how a chef uses different tools in a kitchen. Why doesn't a chef use just one tool for everything? How do they decide which tool to use when?",
    followUpQuestions: [
      "What happens when a tool breaks or isn't available?",
      "How would you teach someone to use multiple tools in the right sequence?",
      "What if you needed to use a tool you've never seen before?"
    ],
    expectedInsights: [
      "Different tools are optimized for different tasks",
      "Tool selection requires understanding the task and tool capabilities",
      "Backup plans are needed when tools fail",
      "Learning to use new tools is an ongoing skill"
    ],
    hints: [
      "Consider how experts become efficient with their tools",
      "Think about the relationship between task complexity and tool selection",
      "Reflect on how you learn to use new software or apps"
    ],
    explanation: "This exploration helps students understand why AI agents need sophisticated tool use capabilities and how to design systems that can dynamically select and use appropriate tools.",
    relatedConcepts: ['tool-selection', 'task-optimization', 'adaptability'],
    timeEstimate: 15,
    successCriteria: [
      "Understands the relationship between tasks and tools",
      "Recognizes the need for intelligent tool selection",
      "Sees the importance of adaptability and fallback strategies"
    ]
  }
];

// Socratic Questions for Computer Use
export const computerUseSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'computer-use-socratic-1',
    type: 'socratic',
    conceptId: 'computer-use',
    title: 'Seeing Through Digital Eyes',
    level: 'intermediate',
    socratiQuestion: "Imagine you had to teach someone to use a computer, but they could only see what's on the screen and move the mouse - they can't feel the keyboard or see you. How would you describe what to do?",
    followUpQuestions: [
      "How would you help them find a specific button or menu item?",
      "What if the screen changes unexpectedly or an error appears?",
      "How would you verify they completed the task correctly?"
    ],
    expectedInsights: [
      "Computer interaction requires precise visual interpretation",
      "Instructions must be specific and context-aware",
      "Error handling and verification are essential",
      "Visual feedback is crucial for navigation"
    ],
    hints: [
      "Think about how you describe computer tasks to someone over the phone",
      "Consider what makes interface elements easy or hard to find",
      "Reflect on how you recover when something unexpected happens"
    ],
    explanation: "This helps students understand the challenges AI agents face when interacting with computer interfaces and why computer use patterns need sophisticated visual processing and error handling.",
    relatedConcepts: ['visual-interpretation', 'interface-navigation', 'error-recovery'],
    timeEstimate: 20,
    successCriteria: [
      "Understands the complexity of visual interface interpretation",
      "Recognizes the need for precise and adaptable instructions",
      "Sees the importance of error handling in automated interactions"
    ]
  }
];

// Socratic Questions for Voice Agents
export const voiceAgentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'voice-agent-socratic-1',
    type: 'socratic',
    conceptId: 'voice-agent',
    title: 'The Nuances of Spoken Communication',
    level: 'beginner',
    socratiQuestion: "Think about how you communicate differently when speaking versus writing. What additional information do you get from someone's voice that you miss in text?",
    followUpQuestions: [
      "How do you handle interruptions or when someone speaks over you?",
      "What happens when you can't hear clearly or there's background noise?",
      "How do you know when someone is finished speaking and it's your turn?"
    ],
    expectedInsights: [
      "Voice communication includes tone, pace, and emotional context",
      "Real-time conversation requires managing interruptions and turns",
      "Audio quality and noise affect understanding",
      "Non-verbal cues help with conversation flow"
    ],
    hints: [
      "Consider the difference between phone calls and in-person conversations",
      "Think about how you handle unclear audio in calls",
      "Reflect on natural conversation patterns and timing"
    ],
    explanation: "This exploration helps students understand the unique challenges of voice-based AI agents and why they need specialized capabilities for audio processing, conversation management, and natural interaction.",
    relatedConcepts: ['speech-processing', 'conversation-management', 'natural-interaction'],
    timeEstimate: 12,
    successCriteria: [
      "Recognizes the richness of voice communication",
      "Understands the challenges of real-time audio interaction",
      "Sees the need for sophisticated conversation management"
    ]
  }
];

// Socratic Questions for Deep Agents
export const deepAgentsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'deep-agents-socratic-1',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'Understanding Complex Task Complexity',
    level: 'beginner',
    socratiQuestion: "Think about a complex project you've worked on that took several days or weeks. What made it complex? How did you organize your approach?",
    followUpQuestions: [
      "How did you know if your initial approach was working?",
      "What did you do when you discovered gaps or errors in your work?",
      "How did you coordinate if others were helping you?"
    ],
    expectedInsights: [
      "Complex tasks require planning and organization",
      "Multiple revision cycles are often necessary",
      "Quality checks prevent compounding errors",
      "Coordination becomes critical with multiple contributors"
    ],
    hints: [
      "Consider research projects, business proposals, or software development",
      "Think about how you break down large tasks into smaller pieces",
      "Reflect on the importance of review and feedback cycles"
    ],
    explanation: "This exploration helps students understand why simple AI agents aren't sufficient for complex tasks and introduces the need for sophisticated orchestration, planning, and quality assurance mechanisms.",
    relatedConcepts: ['complex-reasoning', 'task-planning', 'quality-assurance'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the multi-faceted nature of complex tasks",
      "Understands the need for iterative refinement",
      "Sees the value of systematic organization and review"
    ]
  },
  {
    id: 'deep-agents-socratic-2',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'The Virtual File System Insight',
    level: 'intermediate',
    socratiQuestion: "Imagine you're working on a complex research report with a team, but you can only communicate through notes left in a shared folder. How would you organize this folder to ensure smooth collaboration?",
    followUpQuestions: [
      "How would you avoid team members overwriting each other's work?",
      "What happens if someone needs to reference earlier versions of work?",
      "How would you track what's been completed versus what still needs work?"
    ],
    expectedInsights: [
      "Persistent state storage enables continuation across sessions",
      "Version control prevents loss of work and enables iteration",
      "Clear organization prevents confusion and conflicts",
      "Status tracking ensures nothing falls through the cracks"
    ],
    hints: [
      "Think about collaborative document editing tools",
      "Consider how software developers manage code versions",
      "Reflect on project management and work tracking systems"
    ],
    explanation: "This thought experiment reveals why the Virtual File System is crucial for Deep Agents - it provides the persistent memory and organization needed for complex, multi-session workflows.",
    relatedConcepts: ['state-management', 'version-control', 'collaborative-systems'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the need for persistent state management",
      "Recognizes version control and conflict resolution challenges",
      "Sees the importance of systematic organization"
    ]
  },
  {
    id: 'deep-agents-socratic-3',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'The Power of Specialized Expertise',
    level: 'advanced',
    socratiQuestion: "Why do successful companies have specialized departments (HR, Finance, Marketing) rather than having everyone do everything? How does this principle apply to AI agent design?",
    followUpQuestions: [
      "What are the advantages and disadvantages of specialization?",
      "How do you ensure specialized teams work together effectively?",
      "When might having generalists be better than specialists?"
    ],
    expectedInsights: [
      "Specialization enables deeper expertise and efficiency",
      "Context isolation prevents contamination between different types of work",
      "Coordination mechanisms are essential for specialized teams",
      "Different tasks require different skills and approaches"
    ],
    hints: [
      "Consider why lawyers don't typically do accounting",
      "Think about how specialized medical teams work in hospitals",
      "Reflect on the coordination challenges in large organizations"
    ],
    explanation: "This exploration reveals the architectural principle behind sub-agents in Deep Agents systems - specialization enables better quality and efficiency, but requires sophisticated coordination.",
    relatedConcepts: ['specialization', 'agent-coordination', 'system-architecture'],
    timeEstimate: 20,
    successCriteria: [
      "Understands the benefits of specialized sub-agents",
      "Recognizes the need for coordination mechanisms",
      "Sees the parallel between organizational and agent design"
    ]
  }
];

// Socratic Questions for Agentic Prompting Fundamentals
export const agenticPromptingFundamentalsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-prompting-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'Discovering the Need for Agent Control',
    level: 'beginner',
    socratiQuestion: "Imagine you're instructing an AI agent to help with a task. What would happen if you gave it a very general instruction like 'help me with my work' versus a specific one? Why might control over the agent's behavior be important?",
    followUpQuestions: [
      "What if the agent starts doing things you didn't want it to do?",
      "How would you guide an agent to think step-by-step rather than rushing to an answer?",
      "What's the difference between an agent that can access tools and one that cannot?"
    ],
    expectedInsights: [
      "Specific instructions lead to more predictable and useful outcomes",
      "Agent behavior needs to be controlled and guided",
      "Tool access fundamentally changes what an agent can accomplish"
    ],
    hints: [
      "Think about how you would instruct a human assistant",
      "Consider what happens when instructions are ambiguous",
      "Reflect on the difference between thinking and acting"
    ],
    explanation: "This exploration helps students discover that agentic prompting is about creating precise, controllable interactions that guide AI behavior toward desired outcomes.",
    relatedConcepts: ['prompt-optimization-patterns', 'agent-instruction-design'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the importance of specific instructions",
      "Understands the need for behavioral control",
      "Grasps the significance of tool integration"
    ]
  },
  {
    id: 'agentic-prompting-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'Eagerness vs Thoughtfulness Trade-off',
    level: 'intermediate',
    socratiQuestion: "If an AI agent is very 'eager' to help and immediately tries to solve your problem versus one that asks clarifying questions first, which approach would be better in different situations? What are the trade-offs?",
    followUpQuestions: [
      "When might you want an agent to act quickly versus think carefully?",
      "How could you control this behavior through your instructions?",
      "What happens if an agent is too eager to use tools when simple reasoning would suffice?"
    ],
    expectedInsights: [
      "Eagerness control allows matching agent behavior to task requirements",
      "Some tasks benefit from immediate action, others from careful consideration",
      "Prompting can influence the reasoning-to-action ratio"
    ],
    hints: [
      "Consider emergency vs planning scenarios",
      "Think about tool usage costs and complexity",
      "Reflect on when you want human assistants to be eager vs cautious"
    ],
    explanation: "Students discover that agentic prompting involves sophisticated control over agent decision-making patterns and tool usage strategies.",
    relatedConcepts: ['agentic-workflow-control', 'agent-evaluation-methodologies'],
    timeEstimate: 20,
    successCriteria: [
      "Understands eagerness as a controllable parameter",
      "Recognizes situational appropriateness of different approaches",
      "Grasps the concept of reasoning-action balance"
    ]
  }
];

// Socratic Questions for Prompt Optimization Patterns
export const promptOptimizationPatternsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'prompt-optimization-socratic-1',
    type: 'socratic',
    conceptId: 'prompt-optimization-patterns',
    title: 'The Hidden Cost of Inefficient Prompts',
    level: 'beginner',
    socratiQuestion: "If a prompt produces the right answer but uses 10x more tokens than necessary, or takes 5x longer to execute, what's the real cost? Why might optimization matter even when the answer is correct?",
    followUpQuestions: [
      "What happens when you scale this inefficiency across thousands of interactions?",
      "How might prompt length affect the agent's ability to focus on what's important?",
      "What if two prompts give the same accuracy but one is much more efficient?"
    ],
    expectedInsights: [
      "Efficiency matters at scale - costs and performance compound",
      "Clarity helps agents focus on essential information",
      "Optimization is about achieving the same quality with fewer resources"
    ],
    hints: [
      "Think about scalability and real-world usage patterns",
      "Consider the cognitive load analogy for humans",
      "Reflect on the difference between 'works' and 'works well'"
    ],
    explanation: "This exploration reveals that prompt optimization is not just about correctness but about efficiency, clarity, and scalability in production systems.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'agent-evaluation-methodologies'],
    timeEstimate: 18,
    successCriteria: [
      "Recognizes efficiency as distinct from accuracy",
      "Understands scalability implications",
      "Values optimization beyond just getting correct answers"
    ]
  },
  {
    id: 'prompt-optimization-socratic-2',
    type: 'socratic',
    conceptId: 'prompt-optimization-patterns',
    title: 'Discovering Contradiction Elimination',
    level: 'intermediate',
    socratiQuestion: "Imagine you give an agent instructions that say both 'be creative and innovative' and 'follow the exact template provided.' What happens when instructions contradict each other? How would you systematically find and fix such conflicts?",
    followUpQuestions: [
      "What patterns might help you identify contradictory requirements?",
      "How would you prioritize when multiple instructions conflict?",
      "What systematic approach could prevent contradictions in the first place?"
    ],
    expectedInsights: [
      "Contradictory instructions create unpredictable agent behavior",
      "Systematic analysis can identify conflicting requirements",
      "Clear hierarchies and priorities prevent contradiction problems"
    ],
    hints: [
      "Think about how conflicting goals affect human performance",
      "Consider creating a checklist or framework for review",
      "Reflect on the importance of internal consistency"
    ],
    explanation: "Students discover that prompt optimization involves systematic identification and elimination of contradictions that can undermine agent performance.",
    relatedConcepts: ['agent-instruction-design', 'agentic-workflow-control'],
    timeEstimate: 22,
    successCriteria: [
      "Identifies contradiction as a source of problems",
      "Understands systematic approaches to conflict detection",
      "Grasps the importance of instruction hierarchy"
    ]
  }
];

// Socratic Questions for Agent Instruction Design
export const agentInstructionDesignSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-instruction-socratic-1',
    type: 'socratic',
    conceptId: 'agent-instruction-design',
    title: 'The Hierarchy of Agent Priorities',
    level: 'beginner',
    socratiQuestion: "If you tell an agent to 'be helpful, be accurate, and be fast,' but these goals conflict in a specific situation, how should the agent decide what to prioritize? What system would you design to handle such conflicts?",
    followUpQuestions: [
      "What happens if there's no clear priority system?",
      "How would you communicate priority levels to an agent?",
      "What if user instructions conflict with safety instructions?"
    ],
    expectedInsights: [
      "Agents need explicit priority hierarchies to resolve conflicts",
      "Instruction design must anticipate conflicting requirements",
      "Safety and core principles should typically override user preferences"
    ],
    hints: [
      "Think about how humans handle conflicting instructions",
      "Consider emergency protocols and safety overrides",
      "Reflect on the need for explicit vs implicit priorities"
    ],
    explanation: "This exploration leads to understanding that effective agent instruction design requires explicit hierarchies and conflict resolution mechanisms.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Recognizes the need for priority hierarchies",
      "Understands conflict resolution mechanisms",
      "Grasps the importance of safety overrides"
    ]
  },
  {
    id: 'agent-instruction-socratic-2',
    type: 'socratic',
    conceptId: 'agent-instruction-design',
    title: 'Steerability in Action',
    level: 'intermediate',
    socratiQuestion: "If you want an agent to adjust its communication style based on the audience (technical expert vs beginner), how would you design instructions that allow this flexibility while maintaining consistency? What mechanisms would enable real-time adjustment?",
    followUpQuestions: [
      "How would the agent detect what type of audience it's addressing?",
      "What core principles should remain constant regardless of the audience?",
      "How would you validate that the agent is adjusting appropriately?"
    ],
    expectedInsights: [
      "Steerability requires both detection mechanisms and adaptation rules",
      "Core principles should remain stable while style adapts",
      "Validation mechanisms ensure appropriate adaptation"
    ],
    hints: [
      "Think about how skilled human communicators adapt their style",
      "Consider what indicators reveal audience expertise level",
      "Reflect on the balance between flexibility and consistency"
    ],
    explanation: "Students discover that instruction design for steerability involves creating adaptive systems that maintain core integrity while allowing contextual adjustment.",
    relatedConcepts: ['prompt-optimization-patterns', 'agent-evaluation-methodologies'],
    timeEstimate: 25,
    successCriteria: [
      "Understands steerability as controlled adaptation",
      "Recognizes the need for detection and response mechanisms",
      "Grasps the balance between flexibility and consistency"
    ]
  }
];

// Socratic Questions for Agentic Workflow Control
export const agenticWorkflowControlSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-workflow-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-workflow-control',
    title: 'Sequential vs Parallel Workflow Discovery',
    level: 'intermediate',
    socratiQuestion: "Imagine an agent needs to research a topic, write a summary, and create a presentation. Which of these tasks could happen at the same time, and which must happen in sequence? How would you design a system to coordinate this efficiently?",
    followUpQuestions: [
      "What information dependencies exist between these tasks?",
      "How would you handle failures in a parallel workflow?",
      "What if one task takes much longer than expected?"
    ],
    expectedInsights: [
      "Task dependencies determine workflow structure",
      "Parallel execution can improve efficiency but adds complexity",
      "Failure handling and timing management are crucial design considerations"
    ],
    hints: [
      "Think about which tasks require outputs from other tasks",
      "Consider how project managers coordinate team work",
      "Reflect on the trade-offs between speed and complexity"
    ],
    explanation: "This exploration helps students understand that workflow control involves analyzing dependencies and choosing appropriate execution patterns.",
    relatedConcepts: ['agent-instruction-design', 'agent-evaluation-methodologies'],
    timeEstimate: 25,
    successCriteria: [
      "Identifies task dependencies accurately",
      "Understands parallel vs sequential trade-offs",
      "Recognizes the importance of failure handling"
    ]
  },
  {
    id: 'agentic-workflow-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-workflow-control',
    title: 'Multi-Tool Coordination Challenges',
    level: 'advanced',
    socratiQuestion: "If an agent has access to a calculator, a web search tool, and a document editor, and needs to create a financial report, how would you ensure these tools are used in the right order and with appropriate data sharing? What could go wrong?",
    followUpQuestions: [
      "How would you prevent the agent from using the wrong tool for a task?",
      "What if one tool's output needs to be processed before use by another tool?",
      "How would you handle situations where a tool fails or is unavailable?"
    ],
    expectedInsights: [
      "Tool coordination requires careful planning and error handling",
      "Data flow between tools must be managed explicitly",
      "Fallback strategies are essential for robust workflows"
    ],
    hints: [
      "Think about how humans coordinate multiple tools and resources",
      "Consider the importance of data validation between steps",
      "Reflect on what happens when any component in a chain fails"
    ],
    explanation: "Students discover that advanced workflow control involves sophisticated coordination between multiple tools with proper error handling and data flow management.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'prompt-optimization-patterns'],
    timeEstimate: 30,
    successCriteria: [
      "Understands multi-tool coordination complexity",
      "Recognizes the importance of data flow management",
      "Grasps the need for robust error handling strategies"
    ]
  }
];

// Socratic Questions for Agent Evaluation Methodologies
export const agentEvaluationMethodologiesSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-evaluation-socratic-1',
    type: 'socratic',
    conceptId: 'agent-evaluation-methodologies',
    title: 'Beyond Simple Accuracy Metrics',
    level: 'beginner',
    socratiQuestion: "If an agent gets 100% of answers correct but takes 10 minutes per response, costs $50 per query, and gives unhelpful responses that technically answer the question, is this a good agent? What other factors should we measure?",
    followUpQuestions: [
      "How would you measure the 'helpfulness' of an agent's response?",
      "What about consistency - should an agent give different answers to the same question?",
      "How would you evaluate an agent's reasoning process, not just its final answer?"
    ],
    expectedInsights: [
      "Evaluation requires multiple dimensions beyond just accuracy",
      "Performance includes efficiency, cost, and user satisfaction",
      "Process quality matters as much as outcome quality"
    ],
    hints: [
      "Think about how you'd evaluate a human assistant",
      "Consider the full user experience, not just correctness",
      "Reflect on the importance of explanations and reasoning"
    ],
    explanation: "This exploration reveals that comprehensive agent evaluation requires multidimensional assessment frameworks that consider the full spectrum of performance factors.",
    relatedConcepts: ['prompt-optimization-patterns', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Recognizes limitations of single-metric evaluation",
      "Understands the importance of multidimensional assessment",
      "Values process quality alongside outcome quality"
    ]
  },
  {
    id: 'agent-evaluation-socratic-2',
    type: 'socratic',
    conceptId: 'agent-evaluation-methodologies',
    title: 'The LLM-as-Judge Paradigm',
    level: 'advanced',
    socratiQuestion: "If you want to evaluate whether an agent's response is 'creative,' 'professional,' or 'age-appropriate,' how would you create an objective measurement system? What if you used another AI agent as the judge - what could go well or poorly?",
    followUpQuestions: [
      "How would you ensure the judge AI is unbiased and consistent?",
      "What if the judge AI has different values or perspectives than humans?",
      "How would you validate that the judge AI is making good evaluations?"
    ],
    expectedInsights: [
      "Subjective qualities require sophisticated evaluation approaches",
      "LLM judges can provide scalable evaluation but need careful design",
      "Judge validation is crucial to ensure evaluation quality"
    ],
    hints: [
      "Think about how human judges are trained and validated",
      "Consider the challenge of measuring subjective qualities objectively",
      "Reflect on the meta-problem: how do you evaluate the evaluator?"
    ],
    explanation: "Students discover that advanced evaluation methodologies leverage AI systems to assess complex, subjective qualities while addressing the inherent challenges of automated judgment.",
    relatedConcepts: ['agent-instruction-design', 'agentic-prompting-fundamentals'],
    timeEstimate: 28,
    successCriteria: [
      "Understands the challenge of evaluating subjective qualities",
      "Grasps the potential and limitations of LLM judges",
      "Recognizes the importance of judge validation mechanisms"
    ]
  }
];

// Socratic Questions for Swarm Intelligence
export const swarmIntelligenceSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'swarm-socratic-1',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'The Power of Simple Rules',
    level: 'beginner',
    socratiQuestion: "How can a colony of ants, where each ant has very simple instincts, collectively find the shortest path to a food source without any single ant knowing the whole map?",
    followUpQuestions: [
      "What if each ant leaves a small, invisible clue for the others?",
      "How would the strength of these clues change over time?",
      "What does this suggest about solving complex problems with simple, local actions?"
    ],
    expectedInsights: [
      "Complex global behavior can emerge from simple local rules.",
      "Indirect communication (stigmergy) can be very powerful.",
      "Decentralized systems can be highly effective at optimization."
    ],
    hints: [
      "Think about how a trail of breadcrumbs works.",
      "Consider the concept of positive feedback loops.",
      "Reflect on how large-scale patterns can form from small interactions."
    ],
    explanation: "This leads students to understand the core principle of Swarm Intelligence: complex, intelligent, and adaptive behavior can emerge from a population of simple agents following basic rules.",
    relatedConcepts: ['emergent-behavior', 'stigmergy', 'decentralization'],
    timeEstimate: 15,
    successCriteria: [
      "Articulates the concept of emergent behavior.",
      "Explains how simple rules can lead to complex outcomes.",
      "Understands the basics of indirect communication."
    ]
  },
  {
    id: 'swarm-socratic-2',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'Designing for Resilience',
    level: 'intermediate',
    socratiQuestion: "If you have a swarm of delivery drones and a few of them suddenly fail or are taken offline, how does the system continue to function effectively without a central manager re-assigning tasks?",
    followUpQuestions: [
      "What kind of information would the remaining drones need to adapt?",
      "How can the system be designed so that the loss of a few agents is not catastrophic?",
      "What are the trade-offs between a centrally controlled system and a decentralized one in this scenario?"
    ],
    expectedInsights: [
      "Decentralized systems are inherently more robust and fault-tolerant.",
      "Agents must be able to adapt based on local information and the actions of their neighbors.",
      "There is a trade-off between the predictability of central control and the resilience of decentralization."
    ],
    hints: [
      "Think about how a flock of birds reacts if one bird leaves.",
      "Consider the concept of redundancy in system design.",
      "Reflect on the single point of failure problem in centralized systems."
    ],
    explanation: "This helps students grasp one of the key engineering advantages of Swarm Intelligence: its inherent resilience and ability to adapt to unexpected changes or failures.",
    relatedConcepts: ['robustness', 'fault-tolerance', 'decentralized-control'],
    timeEstimate: 20,
    successCriteria: [
      "Explains the link between decentralization and robustness.",
      "Identifies adaptation mechanisms for agents.",
      "Compares the pros and cons of centralized vs. decentralized systems."
    ]
  },
  {
    id: 'swarm-socratic-3',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'The Challenge of Control',
    level: 'advanced',
    socratiQuestion: "The emergent behavior of a swarm is powerful but can also be unpredictable. If you are designing a swarm for a critical task, how would you balance letting the desired behavior 'emerge' with the need to guarantee safety and prevent undesirable outcomes?",
    followUpQuestions: [
      "How could you set 'boundaries' or 'rules of engagement' for the swarm without resorting to full central control?",
      "What kind of simulation and testing would be necessary before deploying such a system?",
      "How might you use a 'monitor' or 'guardian' agent to oversee the swarm without directly controlling it?"
    ],
    expectedInsights: [
      "Controlling emergent behavior is a key challenge in swarm engineering.",
      "Hybrid approaches, combining local rules with global constraints, are often necessary.",
      "Extensive simulation is critical for validating the behavior of swarm systems.",
      "Hierarchical or layered control systems can provide safety without sacrificing all the benefits of decentralization."
    ],
    hints: [
      "Think about how traffic laws guide the 'swarm' of cars on a highway.",
      "Consider the role of a referee in a sports game.",
      "Reflect on the concept of 'sandboxing' in software testing."
    ],
    explanation: "This advanced question pushes students to think about the practical engineering challenges of harnessing swarm intelligence, moving from pure theory to the complexities of real-world application and safety.",
    relatedConcepts: ['emergent-behavior-control', 'hybrid-control-systems', 'system-validation'],
    timeEstimate: 25,
    successCriteria: [
      "Articulates the tension between emergence and control.",
      "Proposes methods for constraining swarm behavior.",
      "Recognizes the critical role of simulation and validation."
    ]
  }
];

// Socratic Questions for Agent Deployment (GenAIOps)
export const agentDeploymentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-deployment-socratic-1',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'From Development to Production Reality',
    level: 'beginner',
    socratiQuestion: "You've built an amazing AI agent that works perfectly on your laptop. When you deploy it to production, suddenly users are reporting inconsistent responses and strange behaviors. What could be different between your development environment and the real world?",
    followUpQuestions: [
      "Why might the same agent behave differently with different users?",
      "What happens when thousands of people use your agent simultaneously instead of just you?",
      "How could external factors like time of day or user location affect your agent?"
    ],
    expectedInsights: [
      "Production environments have unpredictable variability",
      "Scale introduces new challenges not present in development",
      "Agent behavior can be influenced by external context",
      "Traditional software deployment practices may not account for AI-specific issues"
    ],
    hints: [
      "Think about the difference between a conversation with one person vs. managing a party",
      "Consider how models might behave with diverse, real-world inputs",
      "Reflect on what makes AI systems different from traditional applications"
    ],
    explanation: "This exploration helps students discover why specialized operational practices (GenAIOps) are needed for AI systems beyond traditional DevOps approaches.",
    relatedConcepts: ['containerization', 'observability', 'genaiopsl'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the unpredictability of production environments",
      "Understands that scale changes system behavior",
      "Sees the need for AI-specific operational practices"
    ]
  },
  {
    id: 'agent-deployment-socratic-2',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'The Three Pillars of GenAIOps',
    level: 'intermediate',
    socratiQuestion: "If you were organizing a large hospital, you'd need specialists: doctors for patients, pharmacists for medications, and administrators for operations. How might this specialization principle apply to managing different aspects of AI systems in production?",
    followUpQuestions: [
      "What are the different 'moving parts' of an AI system that need specialized attention?",
      "How would you organize operational responsibilities for agents, prompts, and data retrieval?",
      "What unique challenges does each component bring that might require specialized expertise?"
    ],
    expectedInsights: [
      "AI systems have distinct operational domains requiring specialized practices",
      "Agents, prompts, and RAG systems each have unique operational challenges",
      "Specialization enables deeper expertise and better outcomes",
      "Coordination between specialized domains is crucial"
    ],
    hints: [
      "Consider the different types of problems that arise with agent behavior vs. prompt management",
      "Think about what makes managing a knowledge base different from managing code",
      "Reflect on why you might need different tools and processes for different AI components"
    ],
    explanation: "Students discover the rationale behind GenAIOps' three specialized domains: AgentOps, PromptOps, and RAGOps, each addressing distinct operational challenges.",
    relatedConcepts: ['agentops', 'promptops', 'ragops'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies distinct operational domains in AI systems",
      "Understands the need for specialized practices",
      "Recognizes coordination challenges between domains"
    ]
  },
  {
    id: 'agent-deployment-socratic-3',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'The Feedback Loop Challenge',
    level: 'advanced',
    socratiQuestion: "Traditional software either works or crashes - it's usually obvious when something is wrong. But what if your AI agent gives plausible but subtly incorrect answers, or gradually degrades in quality over time? How would you detect and address these 'silent failures' that users might not even report?",
    followUpQuestions: [
      "How could you measure whether an agent's responses are getting better or worse over time?",
      "What would you need to track to detect when a RAG system starts retrieving less relevant information?",
      "How might you automatically detect when prompts are becoming less effective?"
    ],
    expectedInsights: [
      "AI systems can fail silently in ways traditional monitoring doesn't catch",
      "Quality degradation over time requires continuous evaluation systems",
      "Each AI component needs specialized monitoring and evaluation approaches",
      "Automated detection of subtle quality issues is crucial for production AI"
    ],
    hints: [
      "Think about how you'd notice if a helpful assistant was gradually becoming less helpful",
      "Consider what metrics capture 'helpfulness' vs. just 'functionality'",
      "Reflect on the challenge of measuring subjective quality at scale"
    ],
    explanation: "This exploration reveals why GenAIOps requires sophisticated evaluation and monitoring systems that go beyond traditional application monitoring to detect quality degradation and silent failures.",
    relatedConcepts: ['observability', 'evaluation-methodologies', 'continuous-monitoring'],
    timeEstimate: 25,
    successCriteria: [
      "Understands the concept of silent failures in AI systems",
      "Recognizes the need for quality-focused monitoring",
      "Grasps the complexity of measuring AI system performance"
    ]
  }
];

// Socratic Questions for Agentic AI Design Taxonomy
export const agenticAIDesignTaxonomySocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-ai-design-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Discovering Agentic vs Traditional AI',
    level: 'beginner',
    socratiQuestion: "Consider a chatbot that always asks for your order versus an AI assistant that remembers you like coffee and suggests your usual. What's the fundamental difference in how they approach helping you?",
    followUpQuestions: [
      "What does the assistant need to 'remember' you beyond just storing data?",
      "How does context change the way it interacts with you?",
      "What would happen if it could also learn your preferences from your behavior?"
    ],
    expectedInsights: [
      "Agentic AI systems demonstrate autonomy and goal-oriented behavior",
      "Context and memory enable more personalized interactions",
      "Learning and adaptation distinguish agents from reactive systems"
    ],
    hints: [
      "Think about the difference between following instructions and making decisions",
      "Consider how humans adapt their behavior based on context",
      "Reflect on what makes an interaction feel intelligent vs scripted"
    ],
    explanation: "This exploration reveals that agentic AI systems are characterized by autonomy, contextual understanding, and adaptive behavior rather than just sophisticated pattern matching.",
    relatedConcepts: ['ai-agents', 'autonomy', 'context-management'],
    timeEstimate: 12,
    successCriteria: [
      "Identifies autonomy as a key differentiator",
      "Recognizes the importance of contextual understanding",
      "Understands adaptive behavior in AI systems"
    ]
  },
  {
    id: 'agentic-ai-design-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Framework Selection Reasoning',
    level: 'intermediate',
    socratiQuestion: "You need to build an AI system where multiple specialists collaborate to solve complex problems. One framework excels at conversations, another at workflows, and a third at enterprise integration. How would you decide which to choose?",
    followUpQuestions: [
      "What if your specialists need to have extended back-and-forth discussions?",
      "What if you need complex decision trees with conditional branching?",
      "What if you need to integrate with existing enterprise systems and security policies?"
    ],
    expectedInsights: [
      "Framework choice depends on architectural requirements",
      "Conversational frameworks suit collaborative problem-solving",
      "Workflow frameworks excel at structured decision processes",
      "Enterprise frameworks prioritize integration and compliance"
    ],
    hints: [
      "Think about AutoGen's strength in multi-agent conversations",
      "Consider LangGraph's graph-based workflow capabilities", 
      "Reflect on Semantic Kernel's enterprise plugin architecture"
    ],
    explanation: "This exploration demonstrates how different frameworks serve different architectural patterns, and the choice should align with your specific use case requirements.",
    relatedConcepts: ['framework-selection', 'multi-agent-systems', 'enterprise-integration'],
    timeEstimate: 15,
    successCriteria: [
      "Maps framework strengths to use cases",
      "Understands architectural implications of choices",
      "Recognizes trade-offs between different approaches"
    ]
  },
  {
    id: 'agentic-ai-design-socratic-3',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Scaling and Interoperability Challenges',
    level: 'advanced',
    socratiQuestion: "Imagine you have 1000 AI agents running across different frameworks and they need to discover and collaborate with each other dynamically. What fundamental problems would you encounter?",
    followUpQuestions: [
      "How would an agent from Framework A communicate with an agent from Framework B?",
      "How would agents find other agents with the capabilities they need?",
      "What happens when the system grows to 10,000 or 100,000 agents?"
    ],
    expectedInsights: [
      "Interoperability requires standardized communication protocols",
      "Discovery mechanisms are essential for dynamic collaboration",
      "Scalability demands hierarchical organization and load balancing",
      "Performance and resource management become critical at scale"
    ],
    hints: [
      "Consider the role of protocols like MCP and A2A",
      "Think about service discovery patterns in distributed systems",
      "Reflect on how the internet scales through hierarchical organization"
    ],
    explanation: "This exploration reveals the critical challenges of building large-scale agentic systems and why standardization, discovery protocols, and scalable architectures are essential for the future of AI.",
    relatedConcepts: ['scalability', 'interoperability', 'distributed-systems', 'communication-protocols'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies interoperability as a fundamental challenge",
      "Understands the need for discovery mechanisms",
      "Recognizes scalability implications and solutions"
    ]
  }
];

// Socratic Questions for Sensory Reasoning Enhancement
export const sensoryReasoningEnhancementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'sensory-reasoning-socratic-1',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Discovering Multi-Sensory Intelligence',
    level: 'beginner',
    socratiQuestion: "When a doctor examines a patient, they look at visual symptoms, listen to breathing sounds, ask about pain levels, and review test results. Why is this multi-sensory approach more effective than relying on just one type of information?",
    followUpQuestions: [
      "What could the doctor miss if they only looked at one type of evidence?",
      "How do different types of sensory information complement each other?",
      "What happens when different sources of information contradict each other?"
    ],
    expectedInsights: [
      "Multiple information sources reduce the risk of missing important details",
      "Different modalities provide unique perspectives on the same situation",
      "Cross-validation between sources improves decision accuracy",
      "Contradictory information reveals complexity that needs investigation"
    ],
    hints: [
      "Think about how your senses work together to understand your environment",
      "Consider what happens when you lose one sense - how do the others compensate?",
      "Reflect on how experienced professionals use multiple information sources"
    ],
    explanation: "This exploration helps students understand why multi-modal AI systems that process visual, auditory, and textual information simultaneously can make more accurate and comprehensive decisions than single-modality systems.",
    relatedConcepts: ['multi-modal-processing', 'evidence-integration', 'decision-making'],
    timeEstimate: 15,
    successCriteria: [
      "Understands the value of multiple information sources",
      "Recognizes how different modalities complement each other",
      "Sees the importance of cross-validation between sources"
    ]
  },
  {
    id: 'sensory-reasoning-socratic-2',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Attention and Focus in Multi-Modal Systems',
    level: 'intermediate',
    socratiQuestion: "Imagine you're at a busy restaurant trying to have a conversation. Your brain automatically focuses on your friend's voice while filtering out background noise and movement. How does this selective attention help you understand the conversation better?",
    followUpQuestions: [
      "What would happen if you couldn't filter out irrelevant information?",
      "How does your brain decide what to pay attention to?",
      "What if multiple important things were happening at the same time?"
    ],
    expectedInsights: [
      "Attention mechanisms help focus on relevant information",
      "Filtering irrelevant information prevents cognitive overload",
      "Context and goals influence what gets attention",
      "Dynamic attention allocation improves processing efficiency"
    ],
    hints: [
      "Think about how you naturally focus during conversations",
      "Consider what happens when you're distracted or overwhelmed",
      "Reflect on how experts quickly identify what's important in their field"
    ],
    explanation: "Students discover that attention mechanisms in AI systems serve a similar function to human selective attention, helping focus computational resources on the most relevant features across different sensory modalities.",
    relatedConcepts: ['attention-mechanisms', 'feature-selection', 'cognitive-processing'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the role of attention in processing multiple inputs",
      "Recognizes the need for relevance filtering",
      "Grasps the concept of dynamic attention allocation"
    ]
  },
  {
    id: 'sensory-reasoning-socratic-3',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Handling Conflicting Evidence',
    level: 'advanced',
    socratiQuestion: "A security system gets conflicting signals: the camera shows someone entering, the motion sensor doesn't detect movement, and the access card shows a valid entry. How would you design a system to handle these contradictory pieces of evidence and make a reliable decision?",
    followUpQuestions: [
      "Which piece of evidence should carry more weight and why?",
      "How would you account for the possibility that one sensor is malfunctioning?",
      "What additional information would help resolve the contradiction?"
    ],
    expectedInsights: [
      "Evidence reliability varies and must be weighted appropriately",
      "Sensor failures and environmental factors can create false readings",
      "Confidence levels help quantify uncertainty in decisions",
      "Additional context can resolve apparent contradictions"
    ],
    hints: [
      "Think about how judges weigh different types of evidence in court",
      "Consider how weather might affect different types of sensors",
      "Reflect on how you resolve conflicting information in daily life"
    ],
    explanation: "This exploration reveals the complexity of evidence integration in multi-modal systems and the need for sophisticated reasoning about uncertainty, reliability, and confidence in decision-making.",
    relatedConcepts: ['evidence-integration', 'uncertainty-handling', 'confidence-scoring'],
    timeEstimate: 22,
    successCriteria: [
      "Understands the challenge of conflicting evidence",
      "Recognizes the importance of reliability weighting",
      "Grasps the role of uncertainty quantification in robust systems"
    ]
  }
];
// Socratic Questions for Product Management
export const productManagementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'product-mgmt-socratic-1',
    type: 'socratic',
    conceptId: 'product-management',
    title: 'Trust Engineering as Product Strategy',
    level: 'beginner',
    socratiQuestion: "Your AI agent claims '85% confidence' in its answers, but user retention drops after the first complex task. What might be wrong, and how would you measure it?",
    followUpQuestions: [
      "How would you design an experiment to test if confidence scores match actual accuracy?",
      "What user behavior signals indicate trust is breaking down?",
      "How could you turn this into a measurable KPI that drives product decisions?"
    ],
    expectedInsights: [
      "Confidence calibration requires empirical validation, not just model outputs",
      "User behavior (task complexity avoidance) reveals trust issues",
      "Trust becomes actionable when measured as retention and escalation rates"
    ],
    hints: [
      "Think about A/B testing confidence display vs. actual accuracy",
      "Consider user journey analysis for drop-off points",
      "Focus on behavioral metrics over satisfaction surveys"
    ],
    explanation: "This explores how Product Managers can operationalize trust through measurement systems rather than treating it as a vague concept.",
    relatedConcepts: ['trust-engineering', 'confidence-calibration', 'user-retention'],
    timeEstimate: 15,
    successCriteria: [
      "Identifies the confidence-accuracy gap as measurable",
      "Connects user behavior to trust metrics",
      "Proposes specific experiments or measurements"
    ]
  },
  {
    id: 'product-mgmt-socratic-2',
    type: 'socratic',
    conceptId: 'product-management',
    title: 'Memory vs Privacy Balance',
    level: 'intermediate',
    socratiQuestion: "Users complain that your AI 'forgets' them, but privacy regulations require data expiration. How do you balance memory value with compliance costs?",
    followUpQuestions: [
      "What types of memory provide the most user value per compliance risk?",
      "How would you implement user-controlled memory without creating a confusing UX?",
      "What metrics would tell you if your memory governance is working?"
    ],
    expectedInsights: [
      "Not all memory is equally valuable - prioritize high-impact, low-risk data",
      "User control can increase trust if implemented simply",
      "Success metrics include both compliance (zero violations) and user satisfaction"
    ],
    hints: [
      "Consider task context vs. personal data retention",
      "Think about transparency and user agency in memory controls",
      "Focus on automated expiration with user override options"
    ],
    explanation: "This examines how Product Managers can design memory governance that satisfies both regulatory requirements and user experience needs.",
    relatedConcepts: ['memory-governance', 'privacy-compliance', 'user-control'],
    timeEstimate: 18,
    successCriteria: [
      "Identifies high-value, low-risk memory categories",
      "Describes user-friendly control mechanisms",
      "Proposes balanced success metrics"
    ]
  },
  {
    id: 'product-mgmt-socratic-3',
    type: 'socratic',
    conceptId: 'product-management',
    title: 'Integration ROI Assessment',
    level: 'advanced',
    socratiQuestion: "Your team wants to integrate with 12 different tools, but each integration costs $15k/month to maintain. How do you decide which ones actually drive business value?",
    followUpQuestions: [
      "What metrics would prove an integration pays for itself?",
      "How do you handle requests for integrations that seem important but lack clear ROI?",
      "What's your framework for deprecating integrations that aren't delivering value?"
    ],
    expectedInsights: [
      "Integration value should be measured in user task completion and support cost reduction",
      "Clear ROI thresholds (e.g., 3x cost) create objective decision criteria",
      "Deprecation processes need user migration plans and timeline discipline"
    ],
    hints: [
      "Consider support ticket reduction, user task success rates, and retention impact",
      "Think about pilot programs with success criteria before full integration",
      "Focus on end-to-end user workflows rather than feature completeness"
    ],
    explanation: "This challenges Product Managers to think systematically about integration value and create disciplined processes for investment decisions.",
    relatedConcepts: ['integration-stewardship', 'roi-analysis', 'feature-deprecation'],
    timeEstimate: 22,
    successCriteria: [
      "Proposes specific ROI measurement methods",
      "Describes objective decision-making criteria",
      "Outlines systematic deprecation processes"
    ]
  },
  {
    id: 'product-mgmt-socratic-4',
    type: 'socratic',
    conceptId: 'product-management',
    title: 'Failure Communication as Trust Building',
    level: 'advanced',
    socratiQuestion: "When your AI agent fails, users currently abandon the task. How could you redesign failure responses to actually increase user trust and engagement?",
    followUpQuestions: [
      "What information should failure messages include to be helpful rather than frustrating?",
      "How do you prevent failures from becoming viral negative incidents on social media?",
      "What would make users more likely to retry after a failure rather than switching to competitors?"
    ],
    expectedInsights: [
      "Good failure messages provide clear next steps and context, not just error codes",
      "Transparency about limitations can increase trust more than trying to hide problems",
      "Recovery assistance and follow-up can turn failures into positive experiences"
    ],
    hints: [
      "Consider failure messages that explain what went wrong and what to try next",
      "Think about proactive communication when issues are detected",
      "Focus on making failures feel temporary and recoverable rather than systemic"
    ],
    explanation: "This explores how Product Managers can transform failures from retention killers into trust-building opportunities through better communication design.",
    relatedConcepts: ['failure-resilience', 'trust-building', 'user-communication'],
    timeEstimate: 20,
    successCriteria: [
      "Describes helpful failure message components",
      "Explains how transparency builds trust",
      "Proposes recovery and follow-up strategies"
    ]
  }
];
// Socratic Questions for Program Setup & North Star
export const programSetupNorthStarSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'program-setup-socratic-1',
    type: 'socratic',
    conceptId: 'program-setup-north-star',
    title: 'Defining the AI Program North Star',
    level: 'beginner',
    socratiQuestion: 'If every stakeholder described the AI agent program in one sentence, what would you expect them all to repeat, and what happens if those sentences diverge?',
    followUpQuestions: [
      'How would you surface mismatched definitions of success early?',
      'Which metrics or signals prove the north star is more than an inspirational slogan?',
      'What trade-offs do you make when combining ambition with feasibility?'
    ],
    expectedInsights: [
      'Shared language around mission, users, and value prevents fragmentation',
      'Success indicators must combine outcome, quality, and guardrail metrics',
      'Ambition needs explicit constraints to remain believable and actionable'
    ],
    hints: [
      'Start from user impact statements, not technical features',
      'Think about how OKRs or scorecards create evidence of progress',
      'Consider how you would defend the charter to an exec sponsor'
    ],
    explanation: 'Learners realize a durable north star translates vision into measurable outcomes that align teams before scaling builds.',
    relatedConcepts: ['strategy-portfolio-management', 'organizational-enablement', 'agent-architecture'],
    timeEstimate: 12,
    successCriteria: [
      'Articulates why shared language matters',
      'Proposes verifiable success signals',
      'Balances ambition with constraints'
    ]
  },
  {
    id: 'program-setup-socratic-2',
    type: 'socratic',
    conceptId: 'program-setup-north-star',
    title: 'Sequencing the Maturity Ladder',
    level: 'intermediate',
    socratiQuestion: 'You mapped a maturity ladder from pilots to scaled automation. How do you decide which capabilities must exist before funding the next rung?',
    followUpQuestions: [
      'What signals show a rung is stable enough to build upon?',
      'How do you prevent skipping steps because an executive is impatient?',
      'Which governance or operating rhythms need to evolve between rungs?'
    ],
    expectedInsights: [
      'Exit criteria turn ladders into investment gates',
      'Staged evidence (quality, adoption, risk posture) protects against overreach',
      'Operating rhythms mature with capability depth (e.g., review cadences, risk boards)'
    ],
    hints: [
      'List artifacts or metrics you would collect at each stage',
      'Remember people/process readiness, not just tech readiness',
      'Consider who must sign off before advancing'
    ],
    explanation: 'Encourages tying maturity progression to tangible evidence and readiness signals rather than aspirational timelines.',
    relatedConcepts: ['responsible-ai-governance', 'architecture-platform-operations', 'experimentation-continuous-improvement'],
    timeEstimate: 14,
    successCriteria: [
      'Defines clear exit criteria',
      'Links progression to risk and readiness',
      'Identifies safeguards against skipping steps'
    ]
  },
  {
    id: 'program-setup-socratic-3',
    type: 'socratic',
    conceptId: 'program-setup-north-star',
    title: 'Balancing Portfolio Appetite and Capacity',
    level: 'advanced',
    socratiQuestion: 'Two business units both claim their agent initiative is strategic. Your platform capacity can only support one this quarter. How do you make the call without eroding trust?',
    followUpQuestions: [
      'What evidence distinguishes strategic impact from loud lobbying?',
      'How do you communicate the trade-off while preserving alignment?',
      'What commitments can you make to the deferred team to maintain momentum?'
    ],
    expectedInsights: [
      'Portfolio scoring frameworks anchor prioritization in value, risk, and readiness',
      'Transparent criteria and review rhythms build credibility',
      'Deferred teams need tangible support plans (enablers, prep work, pilot sandboxes)'
    ],
    hints: [
      'Reference weighted scoring models used in portfolio management',
      'Think about publishing decision memos or dashboards',
      'Consider staggered enablement to keep deferred teams warm'
    ],
    explanation: 'Highlights how program leaders use transparent decision frameworks to balance ambition with capacity without fracturing stakeholder trust.',
    relatedConcepts: ['strategy-portfolio-management', 'organizational-enablement', 'ecosystem-partnerships'],
    timeEstimate: 16,
    successCriteria: [
      'Applies objective prioritization criteria',
      'Explains communication approach',
      'Offers mitigation for deferred stakeholders'
    ]
  }
];

// Socratic Questions for Responsible AI Governance
export const responsibleAIGovernanceSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'responsible-gov-socratic-1',
    type: 'socratic',
    conceptId: 'responsible-ai-governance',
    title: 'Operationalizing Guardrails',
    level: 'beginner',
    socratiQuestion: 'A policy document lists dozens of guardrails, but teams still ask “what does this mean for our sprint?” How would you translate written policy into daily workflows?',
    followUpQuestions: [
      'Which policy elements must show up in templates, checklists, or tooling?',
      'Who owns verification and when does it happen?',
      'How do you keep the controls lightweight enough that teams actually follow them?'
    ],
    expectedInsights: [
      'Policies need embedded checkpoints in delivery rituals',
      'Clear ownership and evidence expectations prevent last-minute fire drills',
      'Automation and templates lower compliance friction'
    ],
    hints: [
      'Map guardrails to the build-measure-learn loop',
      'Think of evidence artifacts: decision logs, eval reports, red-team summaries',
      'Aim for checklists that fit sprint rhythms'
    ],
    explanation: 'Shows how governance succeeds when controls become part of the standard delivery muscle, not external bureaucracy.',
    relatedConcepts: ['ai-safety-governance', 'agent-ops', 'experimentation-continuous-improvement'],
    timeEstimate: 12,
    successCriteria: [
      'Links policy to delivery artifacts',
      'Defines ownership/timing',
      'Keeps controls proportional to risk'
    ]
  },
  {
    id: 'responsible-gov-socratic-2',
    type: 'socratic',
    conceptId: 'responsible-ai-governance',
    title: 'Adaptive Governance Cadences',
    level: 'intermediate',
    socratiQuestion: 'Your review board cadence is monthly, but high-risk experiments launch weekly. How do you redesign governance to stay ahead without stalling delivery?',
    followUpQuestions: [
      'What criteria determine which work items get fast-track vs full review?',
      'How can automation or tooling surface anomalies for rapid attention?',
      'What feedback loops keep policies current with new failure modes?'
    ],
    expectedInsights: [
      'Risk-tiering enables differential oversight',
      'Telemetry and dashboards should feed governance triggers',
      'Governance must iterate based on incident postmortems and evaluation data'
    ],
    hints: [
      'Consider RACI across risk tiers',
      'Think about policy-as-code or automated controls',
      'Look for ways to close the loop with experimentation teams'
    ],
    explanation: 'Encourages learners to design governance as a living system that evolves with delivery velocity and empirical risk.',
    relatedConcepts: ['agent-ops', 'agent-deployment', 'cost-performance'],
    timeEstimate: 15,
    successCriteria: [
      'Describes tiered oversight model',
      'Introduces automation/telemetry hooks',
      'Builds iterative feedback into governance'
    ]
  },
  {
    id: 'responsible-gov-socratic-3',
    type: 'socratic',
    conceptId: 'responsible-ai-governance',
    title: 'Evidence That Stands Up to Scrutiny',
    level: 'advanced',
    socratiQuestion: 'A regulator asks for traceability across data lineage, model behavior, and human overrides. What evidence package would you prepare and how would you keep it continuously up to date?',
    followUpQuestions: [
      'Which repositories or systems become the source of truth for each evidence type?',
      'How do you detect when evidence is stale or incomplete?',
      'What process ensures humans actually review and sign off on the evidence?'
    ],
    expectedInsights: [
      'Evidence should be auto-generated where possible but curated for readability',
      'Freshness and completeness checks prevent audit surprises',
      'Human accountability is explicit through attestation and escalation paths'
    ],
    hints: [
      'Think in layers: data, model, operations, outcomes',
      'Consider dashboards or notebooks that regenerate as code changes',
      'Plan sign-offs tied to release trains or evaluation gates'
    ],
    explanation: 'Prepares leaders to build defensible, continuously refreshed evidence chains that satisfy regulators and exec sponsors alike.',
    relatedConcepts: ['data-knowledge-operations', 'agent-deployment', 'security-data-boundaries'],
    timeEstimate: 18,
    successCriteria: [
      'Outlines comprehensive evidence package',
      'Includes freshness/quality checks',
      'Clarifies accountable roles'
    ]
  }
];

// Socratic Questions for Strategy & Portfolio Management
export const strategyPortfolioManagementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'strategy-portfolio-socratic-1',
    type: 'socratic',
    conceptId: 'strategy-portfolio-management',
    title: 'Deciding What Belongs in the Portfolio',
    level: 'beginner',
    socratiQuestion: 'How do you tell the difference between a shiny AI idea and a portfolio-worthy initiative that compounds value?',
    followUpQuestions: [
      'What signals prove the problem is material enough to solve?',
      'How would you detect whether a concept can scale beyond a single team?',
      'Which risks disqualify an idea even if value seems high?'
    ],
    expectedInsights: [
      'Portfolio entries need clear user outcomes and measurable impact',
      'Scalability and reuse potential matter as much as initial value',
      'Risk appetite and compliance constraints prune the backlog'
    ],
    hints: [
      'Start from value hypotheses and measurable KPIs',
      'Assess common assets or platforms needed for reuse',
      'Map risks to mitigation cost and velocity impact'
    ],
    explanation: 'Grounds learners in disciplined portfolio intake that filters hype from durable investments.',
    relatedConcepts: ['program-setup-north-star', 'ecosystem-partnerships', 'cost-performance'],
    timeEstimate: 12,
    successCriteria: [
      'Defines tangible intake criteria',
      'Evaluates scalability and reuse',
      'Acknowledges risk-based disqualifiers'
    ]
  },
  {
    id: 'strategy-portfolio-socratic-2',
    type: 'socratic',
    conceptId: 'strategy-portfolio-management',
    title: 'Maintaining a Living Roadmap',
    level: 'intermediate',
    socratiQuestion: 'Your roadmap review shows several stalled initiatives and new market signals emerging. How do you rebalance the portfolio without destabilizing delivery teams?',
    followUpQuestions: [
      'Which metrics or dashboards tell you when to pivot vs persevere?',
      'How do you create optionality in the roadmap so reprioritization is graceful?',
      'What communication keeps teams aligned even when priorities shift?'
    ],
    expectedInsights: [
      'Lead/lag indicators (value, risk, capacity) inform rebalancing',
      'Structured review cadences and kill criteria prevent zombie projects',
      'Transparent narrative and decision logs protect trust during pivots'
    ],
    hints: [
      'Think about portfolio kanban or heatmaps',
      'Consider pre-approved contingency initiatives',
      'Use communication artifacts like decision memos or town halls'
    ],
    explanation: 'Illustrates how strategic roadmaps stay dynamic through metrics-driven reviews and narrative alignment.',
    relatedConcepts: ['experimentation-continuous-improvement', 'organizational-enablement', 'agent-ops'],
    timeEstimate: 14,
    successCriteria: [
      'Identifies review metrics',
      'Suggests mechanisms for optionality',
      'Plans alignment communication'
    ]
  },
  {
    id: 'strategy-portfolio-socratic-3',
    type: 'socratic',
    conceptId: 'strategy-portfolio-management',
    title: 'Invest or Partner?',
    level: 'advanced',
    socratiQuestion: 'A partner offers a prebuilt capability that overlaps with your roadmap. It accelerates launch but introduces dependency risk. How do you evaluate build vs partner?',
    followUpQuestions: [
      'What criteria determine whether external leverage strengthens or weakens the portfolio?',
      'How do you factor in exit costs or the ability to switch vendors later?',
      'What governance ensures the partnership aligns with your north star and risk posture?'
    ],
    expectedInsights: [
      'Portfolio leaders weigh speed, differentiation, and control',
      'Exit and contingency planning protect long-term autonomy',
      'Partner governance must mirror internal risk controls'
    ],
    hints: [
      'Use a weighted scorecard comparing build vs buy',
      'Consider data residency, integration complexity, and legal exposure',
      'Document service-level expectations and escalation paths'
    ],
    explanation: 'Encourages objective partner evaluation within the broader portfolio strategy.',
    relatedConcepts: ['ecosystem-partnerships', 'architecture-platform-operations', 'responsible-ai-governance'],
    timeEstimate: 16,
    successCriteria: [
      'Applies build-partner evaluation criteria',
      'Considers exit/contingency plan',
      'Aligns partnership with governance requirements'
    ]
  }
];

// Socratic Questions for Data & Knowledge Operations
export const dataKnowledgeOperationsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'data-knowledge-socratic-1',
    type: 'socratic',
    conceptId: 'data-knowledge-operations',
    title: 'Designing a Living Knowledge Base',
    level: 'beginner',
    socratiQuestion: 'Your RAG answers drift because product policies change weekly. How would you keep knowledge fresher without burning out curators?',
    followUpQuestions: [
      'Which data sources should drive automatic updates versus human review?',
      'How would you set freshness SLAs without overpromising?',
      'What signals show the knowledge base is getting stale before users complain?'
    ],
    expectedInsights: [
      'Blend automated ingestion with human validation for critical content',
      'Set freshness policies by content risk and usage frequency',
      'Monitoring question drift and refusal spikes surfaces staleness early'
    ],
    hints: [
      'Segment content by volatility and risk',
      'Use telemetry to detect outdated answers',
      'Think about curator workflows and tooling support'
    ],
    explanation: 'Demonstrates how resilient knowledge operations combine process, automation, and telemetry to stay current.',
    relatedConcepts: ['rag-systems', 'observability-evalops', 'responsible-ai-governance'],
    timeEstimate: 13,
    successCriteria: [
      'Differentiates automated vs human refresh',
      'Sets pragmatic freshness expectations',
      'Monitors early drift indicators'
    ]
  },
  {
    id: 'data-knowledge-socratic-2',
    type: 'socratic',
    conceptId: 'data-knowledge-operations',
    title: 'Guarding Context Integrity',
    level: 'intermediate',
    socratiQuestion: 'A new data feed increases context richness but introduces compliance risk. What controls ensure agents use it responsibly while keeping delivery velocity high?',
    followUpQuestions: [
      'How do you detect and quarantine bad documents or PII leaks?',
      'Which tooling or policies keep usage auditable?',
      'How do you prevent shadow pipelines from bypassing controls?'
    ],
    expectedInsights: [
      'Ingestion must include classification, lineage, and quarantine workflows',
      'Access should be mediated with policy-aware connectors and audit trails',
      'Enablement requires golden paths so teams avoid shadow work'
    ],
    hints: [
      'Map ingestion steps from source to vector store',
      'Consider policy-as-code guardrails',
      'Provide self-service patterns that stay compliant'
    ],
    explanation: 'Stresses that data richness is only valuable when coupled with disciplined access and governance practices.',
    relatedConcepts: ['security-data-boundaries', 'architecture-platform-operations', 'agent-ops'],
    timeEstimate: 15,
    successCriteria: [
      'Specifies ingestion controls',
      'Maintains auditability',
      'Discourages shadow pipelines'
    ]
  },
  {
    id: 'data-knowledge-socratic-3',
    type: 'socratic',
    conceptId: 'data-knowledge-operations',
    title: 'Measuring Knowledge ROI',
    level: 'advanced',
    socratiQuestion: 'Finance asks why you are spending heavily on labeling and knowledge curation. How do you quantify the return and defend the investment?',
    followUpQuestions: [
      'What downstream metrics shift when knowledge quality improves?',
      'How do you isolate knowledge impact from other improvements?',
      'What narrative convinces non-technical executives?'
    ],
    expectedInsights: [
      'Better knowledge reduces hallucinations, escalations, and cycle time',
      'Use controlled rollouts or A/B tests to attribute impact',
      'Translate improvements into dollars saved or revenue unlocked'
    ],
    hints: [
      'Tie knowledge quality to evaluation results and support costs',
      'Leverage before/after metrics on task success',
      'Frame ROI in business language and risk avoidance'
    ],
    explanation: 'Drives home that knowledge operations investments require business storytelling backed by measurable impact.',
    relatedConcepts: ['cost-performance', 'strategy-portfolio-management', 'organizational-enablement'],
    timeEstimate: 16,
    successCriteria: [
      'Connects knowledge quality to measurable outcomes',
      'Describes attribution strategy',
      'Frames ROI in executive language'
    ]
  }
];

// Socratic Questions for Architecture & Platform Operations
export const architecturePlatformOperationsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'architecture-platform-socratic-1',
    type: 'socratic',
    conceptId: 'architecture-platform-operations',
    title: 'Deciding What to Centralize',
    level: 'beginner',
    socratiQuestion: 'Platform teams are overwhelmed. Which agent capabilities belong on the shared platform versus leaving them to product teams?',
    followUpQuestions: [
      'What criteria make a capability a good shared service?',
      'How do you avoid the platform becoming a bottleneck?',
      'What incentives encourage product teams to adopt platform components?'
    ],
    expectedInsights: [
      'Shared services should be high-leverage, compliance-heavy, or cross-cutting',
      'Platform SLAs and paved roads prevent bottlenecks',
      'Adoption increases when platform value is clear and integration is simple'
    ],
    hints: [
      'Compare differentiating vs commodity capabilities',
      'Think about golden paths and SDKs',
      'Consider funding or governance levers for adoption'
    ],
    explanation: 'Encourages strategic centralization based on leverage rather than empire building.',
    relatedConcepts: ['agent-ops', 'program-setup-north-star', 'strategy-portfolio-management'],
    timeEstimate: 12,
    successCriteria: [
      'Defines centralization criteria',
      'Prevents platform bottlenecks',
      'Aligns incentives for adoption'
    ]
  },
  {
    id: 'architecture-platform-socratic-2',
    type: 'socratic',
    conceptId: 'architecture-platform-operations',
    title: 'Designing Guardrails that Scale',
    level: 'intermediate',
    socratiQuestion: 'As more teams onboard, variance in agent quality increases. What guardrails do you implement to provide autonomy with safety?',
    followUpQuestions: [
      'Which interfaces or contracts define how teams plug into the platform?',
      'How do you instrument platform services to detect misuse or degradation?',
      'What self-service tooling accelerates onboarding without exposing risk?'
    ],
    expectedInsights: [
      'Contracts, SDKs, and reference implementations set expectations',
      'Telemetry and anomaly detection maintain platform health',
      'Self-service sandboxes and scaffolding enable safe empowerment'
    ],
    hints: [
      'Consider policy-as-code, quotas, and evaluation gates',
      'Think about platform dashboards and alerts',
      'Design onboarding kits that encode best practices'
    ],
    explanation: 'Highlights how platform teams maintain consistency through contracts, instrumentation, and enablement.',
    relatedConcepts: ['responsible-ai-governance', 'agent-deployment', 'experimentation-continuous-improvement'],
    timeEstimate: 15,
    successCriteria: [
      'Specifies platform contracts/SDKs',
      'Includes instrumentation strategy',
      'Provides safe self-service tooling'
    ]
  },
  {
    id: 'architecture-platform-socratic-3',
    type: 'socratic',
    conceptId: 'architecture-platform-operations',
    title: 'Funding the Platform Sustainably',
    level: 'advanced',
    socratiQuestion: 'Leadership questions why the platform budget keeps growing as more teams onboard. How do you create a sustainable funding and operating model?',
    followUpQuestions: [
      'What cost allocation or recharge models incentivize responsible usage?',
      'How do you measure platform value beyond uptime?',
      'What roadmap governance keeps the platform focused on leverage?'
    ],
    expectedInsights: [
      'Usage-based or tiered funding models create transparency',
      'Value metrics include time-to-launch, risk reduction, and reuse rates',
      'Platform roadmap should be triaged with customer councils and portfolio input'
    ],
    hints: [
      'Think about internal marketplace or chargeback mechanisms',
      'Tie platform KPIs to product velocity and incident reduction',
      'Establish governance forums with consuming teams'
    ],
    explanation: 'Equips platform leaders to justify investment through measurable leverage and shared accountability.',
    relatedConcepts: ['organizational-enablement', 'cost-performance', 'ecosystem-partnerships'],
    timeEstimate: 16,
    successCriteria: [
      'Proposes transparent funding models',
      'Defines platform value metrics',
      'Aligns roadmap governance with stakeholders'
    ]
  }
];

// Socratic Questions for Experimentation & Continuous Improvement
export const experimentationContinuousImprovementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'experimentation-socratic-1',
    type: 'socratic',
    conceptId: 'experimentation-continuous-improvement',
    title: 'Choosing the Right Experiment Signal',
    level: 'beginner',
    socratiQuestion: 'Your team wants to ship fast, but each experiment only tracks overall accuracy. How do you decide which signals prove an improvement is real and safe?',
    followUpQuestions: [
      'Which leading indicators catch regressions before users do?',
      'How do you segment results to avoid hiding harm in aggregates?',
      'What guardrails prevent experimentation from bypassing governance?'
    ],
    expectedInsights: [
      'Multi-metric dashboards capture quality, safety, and cost',
      'Segmentation by user cohort or task uncovers hidden regressions',
      'Experiments should integrate with governance: pre-checklists, shadow tests, canaries'
    ],
    hints: [
      'Look at typical EvalOps ladders',
      'Consider protected cohorts or high-risk flows',
      'Align experiment stages with review cadences'
    ],
    explanation: 'Teaches disciplined experiment design that balances velocity with risk awareness.',
    relatedConcepts: ['observability-evalops', 'responsible-ai-governance', 'agent-ops'],
    timeEstimate: 12,
    successCriteria: [
      'Identifies multi-signal evaluation',
      'Emphasizes segmentation',
      'Connects experiments to governance'
    ]
  },
  {
    id: 'experimentation-socratic-2',
    type: 'socratic',
    conceptId: 'experimentation-continuous-improvement',
    title: 'From Insight to Backlog',
    level: 'intermediate',
    socratiQuestion: 'Telemetry reveals recurring friction points, but product backlog stays dominated by feature requests. How do you convert insight streams into prioritized improvements?',
    followUpQuestions: [
      'Who triages experiment learnings and how often?',
      'How do you quantify opportunity size to justify backlog slots?',
      'What prevents teams from treating insights as “nice to have” reports?'
    ],
    expectedInsights: [
      'Dedicated triage rituals (eval review, failure clinics) turn data into decisions',
      'Sizing frameworks translate signals into ROI estimates',
      'Owning teams need accountability and incentives to act on insights'
    ],
    hints: [
      'Introduce weekly experimentation reviews',
      'Use impact vs effort matrices tied to program goals',
      'Align incentives via OKRs or service level objectives'
    ],
    explanation: 'Helps teams close the loop between evaluation data and backlog prioritization.',
    relatedConcepts: ['strategy-portfolio-management', 'organizational-enablement', 'program-setup-north-star'],
    timeEstimate: 14,
    successCriteria: [
      'Defines triage cadence/ownership',
      'Quantifies impact for backlog decisions',
      'Ensures follow-through incentives'
    ]
  },
  {
    id: 'experimentation-socratic-3',
    type: 'socratic',
    conceptId: 'experimentation-continuous-improvement',
    title: 'Designing the Feedback Flywheel',
    level: 'advanced',
    socratiQuestion: 'You want a persistent feedback flywheel that combines human judgments, production telemetry, and synthetic evals. How do you orchestrate it without overwhelming teams?',
    followUpQuestions: [
      'What automation keeps the flywheel spinning without constant manual effort?',
      'How do you prevent conflicting signals from causing analysis paralysis?',
      'Which communities or guilds sustain the flywheel culturally?'
    ],
    expectedInsights: [
      'Automated pipelines aggregate signals and surface anomalies',
      'Governance prioritizes action through thresholding and ownership',
      'Communities-of-practice maintain the discipline and share learnings'
    ],
    hints: [
      'Map data sources to ingestion cadence',
      'Define decision thresholds or playbooks',
      'Leverage guilds or enablement teams for storytelling'
    ],
    explanation: 'Explores the socio-technical systems needed for continuous improvement to thrive long term.',
    relatedConcepts: ['agent-ops', 'data-knowledge-operations', 'organizational-enablement'],
    timeEstimate: 16,
    successCriteria: [
      'Automates signal collection',
      'Resolves conflicting data with governance',
      'Builds sustaining communities'
    ]
  }
];

// Socratic Questions for Ecosystem & Partnerships
export const ecosystemPartnershipsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'ecosystem-socratic-1',
    type: 'socratic',
    conceptId: 'ecosystem-partnerships',
    title: 'Selecting the Right Partner Model',
    level: 'beginner',
    socratiQuestion: 'When does partnering accelerate value versus introduce unacceptable dependence or risk?',
    followUpQuestions: [
      'What due diligence reveals hidden operational debt?',
      'How do you judge whether the partner aligns with your responsible AI posture?',
      'What early warning signs indicate the partnership is drifting off course?'
    ],
    expectedInsights: [
      'Partner selection weighs capability fit, cultural alignment, and compliance posture',
      'Shared values on safety, data use, and customer experience are non-negotiable',
      'Monitoring mechanisms catch drift before it becomes failure'
    ],
    hints: [
      'Build a scorecard that includes ethics and supportability',
      'Ask how the partner handles incidents and transparency',
      'Plan joint QBRs with metrics and escalation paths'
    ],
    explanation: 'Teaches disciplined partner evaluation anchored in value and responsible operations.',
    relatedConcepts: ['strategy-portfolio-management', 'responsible-ai-governance', 'architecture-platform-operations'],
    timeEstimate: 12,
    successCriteria: [
      'Defines partner evaluation criteria',
      'Aligns partner vetting with governance',
      'Identifies monitoring mechanisms'
    ]
  },
  {
    id: 'ecosystem-socratic-2',
    type: 'socratic',
    conceptId: 'ecosystem-partnerships',
    title: 'Designing Joint Success Metrics',
    level: 'intermediate',
    socratiQuestion: 'A partner integration launches but adoption stalls. How do you diagnose whether the issue is product fit, go-to-market, or partnership execution?',
    followUpQuestions: [
      'What shared metrics and telemetry could you review together?',
      'Which hypotheses separate product gaps from enablement gaps?',
      'How do you structure a remediation plan without damaging the relationship?'
    ],
    expectedInsights: [
      'Joint scorecards align visibility across organizations',
      'Hypothesis-driven diagnosis avoids blame games',
      'Remediation requires shared action plan and revised incentives'
    ],
    hints: [
      'Segment adoption by customer cohort or channel',
      'Run structured post-launch retrospectives',
      'Revisit partner enablement assets and commitments'
    ],
    explanation: 'Encourages collaborative diagnostics and transparent remediation in partner ecosystems.',
    relatedConcepts: ['organizational-enablement', 'program-setup-north-star', 'experimentation-continuous-improvement'],
    timeEstimate: 14,
    successCriteria: [
      'Builds joint metrics dashboard',
      'Uses hypotheses to pinpoint issues',
      'Maintains relationship through shared plan'
    ]
  },
  {
    id: 'ecosystem-socratic-3',
    type: 'socratic',
    conceptId: 'ecosystem-partnerships',
    title: 'Governance for Co-Innovation',
    level: 'advanced',
    socratiQuestion: 'You plan to co-innovate on a new agent capability with a strategic partner. How do you govern IP, data sharing, and brand risk?',
    followUpQuestions: [
      'What legal and technical controls keep data exchanges compliant?',
      'How do you define ownership of learnings or models produced?',
      'What contingencies exist if the partner changes strategy or is acquired?'
    ],
    expectedInsights: [
      'Trust boundaries require data minimization, secure enclaves, and clear contracts',
      'Joint IP frameworks must specify ownership, licensing, and exit provisions',
      'Scenario planning prepares for strategic shifts without halting progress'
    ],
    hints: [
      'Involve legal, security, and product early',
      'Document acceptable use and escalation pathways',
      'Draft exit playbooks before you need them'
    ],
    explanation: 'Prepares leaders to co-innovate confidently while protecting enterprise interests.',
    relatedConcepts: ['security-data-boundaries', 'responsible-ai-governance', 'strategy-portfolio-management'],
    timeEstimate: 16,
    successCriteria: [
      'Defines guardrails for data/IP',
      'Plans contingencies for partner changes',
      'Aligns governance with strategic goals'
    ]
  }
];

// Socratic Questions for Organizational Enablement
export const organizationalEnablementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'org-enable-socratic-1',
    type: 'socratic',
    conceptId: 'organizational-enablement',
    title: 'Diagnosing Readiness Gaps',
    level: 'beginner',
    socratiQuestion: 'Executives love the AI vision, but frontline managers are skeptical. How do you diagnose whether the real gap is skills, incentives, or trust?',
    followUpQuestions: [
      'What qualitative and quantitative signals reveal readiness?',
      'How do you differentiate loud resistance from structural blockers?',
      'What quick wins build credibility with skeptics?'
    ],
    expectedInsights: [
      'Readiness diagnostics blend surveys, shadowing, and performance data',
      'Structural blockers (process, policy, tooling) often masquerade as attitude problems',
      'Quick wins tied to user pain convert skeptics faster than messaging campaigns'
    ],
    hints: [
      'Map roles to required capabilities',
      'Collect stories from frontline teams',
      'Look for processes that contradict desired behavior'
    ],
    explanation: 'Helps leaders ground enablement plans in observable readiness signals.',
    relatedConcepts: ['program-setup-north-star', 'organizational-enablement', 'strategy-portfolio-management'],
    timeEstimate: 12,
    successCriteria: [
      'Performs multi-source diagnostics',
      'Identifies structural vs cultural blockers',
      'Proposes meaningful quick wins'
    ]
  },
  {
    id: 'org-enable-socratic-2',
    type: 'socratic',
    conceptId: 'organizational-enablement',
    title: 'Designing Capability Pathways',
    level: 'intermediate',
    socratiQuestion: 'To scale adoption, you need new roles (prompt engineers, AI product owners). How do you design capability pathways that feel attainable and valuable?',
    followUpQuestions: [
      'What learning modalities and timelines fit busy teams?',
      'How do you recognize and reward progress to reinforce the behavior change?',
      'What happens to employees who prefer not to transition into new roles?'
    ],
    expectedInsights: [
      'Blended learning (hands-on labs, apprenticeships, peer circles) beats one-off training',
      'Recognition, career pathways, and compensation loops reinforce new behaviors',
      'Optionality and job redesign protect morale while driving adoption'
    ],
    hints: [
      'Define competency matrices',
      'Think about integrating enablement into performance reviews',
      'Plan bridging roles or dual tracks'
    ],
    explanation: 'Focuses on building sustainable talent ecosystems that support agent adoption.',
    relatedConcepts: ['experimentation-continuous-improvement', 'agent-ops', 'ecosystem-partnerships'],
    timeEstimate: 14,
    successCriteria: [
      'Builds competency-based learning plan',
      'Links recognition/incentives to pathways',
      'Plans for alternative paths or reassignment'
    ]
  },
  {
    id: 'org-enable-socratic-3',
    type: 'socratic',
    conceptId: 'organizational-enablement',
    title: 'Embedding Change into Operations',
    level: 'advanced',
    socratiQuestion: 'Six months after launch, adoption plateaus. How do you embed agent-driven ways of working into operating rhythms so it sticks?',
    followUpQuestions: [
      'Which rituals (standups, business reviews) should include agent metrics or demos?',
      'How do you surface success stories and lessons learned across teams?',
      'What governance or incentives prevent backsliding to old processes?'
    ],
    expectedInsights: [
      'Operational cadences must showcase agent impact and reinforce expectations',
      'Communities and storytelling build shared identity around the transformation',
      'Policies, incentives, and leadership modeling sustain behavior change'
    ],
    hints: [
      'Integrate agent KPIs into scorecards and reviews',
      'Facilitate cross-team demos and guilds',
      'Align incentives with desired adoption behaviors'
    ],
    explanation: 'Ensures adoption scales beyond initial hype by embedding new behaviors into the operating system of the organization.',
    relatedConcepts: ['program-setup-north-star', 'architecture-platform-operations', 'responsible-ai-governance'],
    timeEstimate: 16,
    successCriteria: [
      'Integrates agents into operating rituals',
      'Leverages storytelling/community building',
      'Aligns governance and incentives to sustain change'
    ]
  }
];
// Export all socratic questions organized by concept
export const socraticQuestionLibrary = {
  'a2a-communication': a2aSocraticQuestions,
  'mcp': mcpSocraticQuestions,
  'multi-agent-systems': multiAgentSocraticQuestions,
  'agentic-rag': agenticRAGSocraticQuestions,
  'modern-tool-use': modernToolUseSocraticQuestions,
  'computer-use': computerUseSocraticQuestions,
  'voice-agent': voiceAgentSocraticQuestions,
  'deep-agents': deepAgentsSocraticQuestions,
  'product-management': productManagementSocraticQuestions,
  'program-setup-north-star': programSetupNorthStarSocraticQuestions,
  'responsible-ai-governance': responsibleAIGovernanceSocraticQuestions,
  'strategy-portfolio-management': strategyPortfolioManagementSocraticQuestions,
  'data-knowledge-operations': dataKnowledgeOperationsSocraticQuestions,
  'architecture-platform-operations': architecturePlatformOperationsSocraticQuestions,
  'experimentation-continuous-improvement': experimentationContinuousImprovementSocraticQuestions,
  'ecosystem-partnerships': ecosystemPartnershipsSocraticQuestions,
  'organizational-enablement': organizationalEnablementSocraticQuestions,
  // New Perspectives (MVP sets)
  'agent-ops': [
    {
      id: 'agent-ops-socratic-1',
      type: 'socratic',
      conceptId: 'agent-ops',
      title: 'Metric Stack Design Failure',
      level: 'intermediate',
      socratiQuestion: 'Why is relying on a single "accuracy" metric dangerous for production agent reliability, and what layered metric stack would you propose instead?',
      followUpQuestions: [
        'How do leading vs lagging signals differ in agent observability?',
        'Which metric would surface regression earlier: hallucination rate, tool failure %, or user abandon after first response?',
        'How would you prevent metric gaming or overfitting to synthetic evals?'
      ],
      expectedInsights: [
        'Single aggregate hides failure mode distribution',
        'Layered stack: core correctness, tool success %, latency buckets, user recovery rate',
        'Include anti-gaming: random holdouts / drift monitors'
      ],
      hints: [
        'Think pyramid: infrastructure → reasoning → user value',
        'Add at least one resilience / recovery metric',
        'Consider alert routing severity tiers'
      ],
      explanation: 'Encourages designing a multi-dimensional observability stack to avoid false confidence and delayed incident detection.',
      relatedConcepts: ['observability', 'evaluation', 'reliability'],
      timeEstimate: 15,
      successCriteria: [
        'Proposes ≥4 complementary metrics',
        'Includes at least one user-centric signal',
        'Addresses gaming / drift risk'
      ]
    },
    {
      id: 'agent-ops-socratic-2',
      type: 'socratic',
      conceptId: 'agent-ops',
      title: 'Handling Latency Variance',
      level: 'intermediate',
      socratiQuestion: 'Mean latency is stable but P95 doubled. Why is this a reliability risk and how do you address it without over-provisioning?',
      followUpQuestions: [
        'What user behaviors correlate with tail latency spikes?',
        'How do retries sometimes worsen tail latency?',
        'Which mitigation do you try first: caching, decomposition, or model routing?'
      ],
      expectedInsights: [
        'Tail latency drives abandonment / cascading retries',
        'Blind retries amplify saturation',
        'Target decomposition + warm path caches before scaling infra'
      ],
      hints: [
        'Focus on tail not mean',
        'Consider concurrency control',
        'Look for expensive tool sequences'
      ],
      explanation: 'Highlights importance of tail latency management and systematic mitigation strategies over naive scaling.',
      relatedConcepts: ['latency', 'throughput', 'cost-performance'],
      timeEstimate: 12,
      successCriteria: [
        'Explains user impact of tail spikes',
        'Identifies non-infra mitigations',
        'Addresses retry amplification'
      ]
    },
    {
      id: 'agent-ops-socratic-3',
      type: 'socratic',
      conceptId: 'agent-ops',
      title: 'Silent Failure Detection',
      level: 'advanced',
      socratiQuestion: 'Your weekly eval pass rate is flat, but user-reported "unhelpful" tags are rising. What signals or probes do you add to detect silent degradation earlier?',
      followUpQuestions: [
        'How could retrieval drift manifest in stable evals?',
        'What lightweight synthetic probes could you schedule hourly?',
        'How do you separate UX friction from reasoning degradation?'
      ],
      expectedInsights: [
        'Need behavioral + retrieval freshness probes',
        'Add targeted golden set refresh & semantic diff checks',
        'Segment user tags by task type / tool path'
      ],
      hints: [
        'Think: retrieval freshness, tool path anomalies, embedding drift',
        'Introduce sentinel queries',
        'Correlate tags with internal spans'
      ],
      explanation: 'Focuses on mixed-signal detection to surface quality drift not caught by static evaluation suites.',
      relatedConcepts: ['drift', 'retrieval', 'quality'],
      timeEstimate: 18,
      successCriteria: [
        'Proposes at least 2 proactive probes',
        'Segments signals for diagnosis',
        'Explains why static evals can mask issues'
      ]
    }
  ],
  'cost-value': [
    {
      id: 'cost-value-socratic-1',
      type: 'socratic',
      conceptId: 'cost-value',
      title: 'Premature Model Upgrade',
      level: 'beginner',
      socratiQuestion: 'Your team wants to switch all traffic to a larger reasoning model after a small win on a subjective benchmark. What structured validation sequence should precede that decision?',
      followUpQuestions: [
        'What is the marginal lift threshold vs cost delta?',
        'How would an interleaving test reduce variance?',
        'When is selective routing superior to global upgrade?'
      ],
      expectedInsights: [
        'Need controlled A/B or interleaving with task-aligned metrics',
        'Assess marginal lift vs token cost per resolved task',
        'Use selective routing for complex / ambiguous queries'
      ],
      hints: [
        'Think: intervention ladder',
        'Define evaluation horizon',
        'Consider caching step before upgrade'
      ],
      explanation: 'Teaches disciplined intervention sequencing instead of headline-driven upgrades.',
      relatedConcepts: ['model-routing', 'evaluation', 'finops'],
      timeEstimate: 10,
      successCriteria: [
        'Defines validation steps',
        'References marginal lift vs cost',
        'Suggests targeted routing'
      ]
    },
    {
      id: 'cost-value-socratic-2',
      type: 'socratic',
      conceptId: 'cost-value',
      title: 'Caching Trade-offs',
      level: 'intermediate',
      socratiQuestion: 'Semantic cache hit rate improved from 15% to 55%, but correctness complaints rose. What went wrong and how do you redesign caching safely?',
      followUpQuestions: [
        'How do semantic similarity thresholds influence stale answer risk?',
        'Which metadata should you store for freshness invalidation?',
        'When should you bypass cache for high-stakes tasks?'
      ],
      expectedInsights: [
        'Aggressive similarity threshold overgeneralized',
        'Need freshness TTL + domain-specific invalidation signals',
        'Bypass logic for regulated / high-risk categories'
      ],
      hints: [
        'Consider embedding drift',
        'Add answer provenance checks',
        'Use multi-key (intent + entities)'
      ],
      explanation: 'Explores disciplined caching strategies balancing cost reduction and answer integrity.',
      relatedConcepts: ['caching', 'semantics', 'risk'],
      timeEstimate: 14,
      successCriteria: [
        'Identifies stale answer mechanism',
        'Proposes invalidation / bypass rules',
        'Balances cost with reliability'
      ]
    },
    {
      id: 'cost-value-socratic-3',
      type: 'socratic',
      conceptId: 'cost-value',
      title: 'Intervention Ladder Discipline',
      level: 'advanced',
      socratiQuestion: 'Why can skipping from prompt tweaks directly to fine-tuning inflate long-term total cost of ownership?',
      followUpQuestions: [
        'What maintenance overhead does fine-tuning introduce?',
        'How does data drift erode earlier fine-tune gains?',
        'When is retrieval optimization a cheaper alternative?'
      ],
      expectedInsights: [
        'Fine-tunes add retraining + eval overhead',
        'Drift forces repeated adjustments',
        'Retrieval / prompt layering may capture majority gains first'
      ],
      hints: [
        'List lifecycle costs',
        'Map diminishing returns curve',
        'Reference evaluation cadence'
      ],
      explanation: 'Promotes structured cost-aware intervention sequencing for sustained ROI.',
      relatedConcepts: ['fine-tuning', 'retrieval', 'optimization'],
      timeEstimate: 12,
      successCriteria: [
        'Articulates overhead sources',
        'Shows diminishing returns logic',
        'Suggests cheaper alternatives'
      ]
    }
  ],
  'trust-experience': [
    {
      id: 'trust-exp-socratic-1',
      type: 'socratic',
      conceptId: 'trust-experience',
      title: 'Confidence Signal Miscalibration',
      level: 'intermediate',
      socratiQuestion: 'Users report overconfidence in responses with weak sources. What redesign of confidence signaling and explanation structure improves calibrated trust?',
      followUpQuestions: [
        'How do you separate absence of evidence vs low retrieval quality?',
        'What UI affordances let users request more context without overload?',
        'How could partial answer gating increase trust?'
      ],
      expectedInsights: [
        'Confidence should reflect evidence quality dimensions',
        'Progressive disclosure reduces cognitive load',
        'Gated partial answers prevent hallucination commitment'
      ],
      hints: [
        'Consider multi-factor confidence (retrieval coverage + internal consistency)',
        'Add “expand reasoning” affordance',
        'Separate transparency from verbosity'
      ],
      explanation: 'Drives redesign of trust signals toward evidence-grounded calibration.',
      relatedConcepts: ['explainability', 'retrieval', 'ux'],
      timeEstimate: 13,
      successCriteria: [
        'Defines multi-factor calibration',
        'Avoids info overload design',
        'Links gating to trust preservation'
      ]
    },
    {
      id: 'trust-exp-socratic-2',
      type: 'socratic',
      conceptId: 'trust-experience',
      title: 'Designing Intervention Points',
      level: 'intermediate',
      socratiQuestion: 'Where should human intervention points be placed in a multi-step high-risk task to maximize both safety and user flow continuity?',
      followUpQuestions: [
        'What signals trigger escalation vs silent monitoring?',
        'How do you avoid interrupt fatigue?',
        'Which steps benefit from pre-commit previews?'
      ],
      expectedInsights: [
        'Intervention placement should align with irreversible actions',
        'Previews reduce need for full stoppage',
        'Escalation triggers must be precise to reduce fatigue'
      ],
      hints: [
        'Map user journey risk points',
        'Think graded interventions',
        'Differentiate high vs medium risk gating'
      ],
      explanation: 'Encourages deliberate design of human control affordances balancing flow and safety.',
      relatedConcepts: ['human-in-loop', 'risk', 'ux-flow'],
      timeEstimate: 12,
      successCriteria: [
        'Identifies irreversible steps',
        'Explains graded intervention model',
        'Addresses fatigue risk'
      ]
    },
    {
      id: 'trust-exp-socratic-3',
      type: 'socratic',
      conceptId: 'trust-experience',
      title: 'Recovery Experience Design',
      level: 'advanced',
      socratiQuestion: 'A failed reasoning chain currently produces a generic apology. How do you redesign recovery UX to increase retry likelihood and long-term trust?',
      followUpQuestions: [
        'What information must a recovery response contain?',
        'How can user action options reduce abandonment?',
        'When should the agent proactively re-attempt vs ask guidance?'
      ],
      expectedInsights: [
        'Recovery = context + reason + options + alternative path',
        'Agency increases retry probability',
        'Autonomous re-attempt only if deterministic fix exists'
      ],
      hints: [
        'Model it like transactional UX errors',
        'Include structured remediation choices',
        'Log recovery outcome for continuous tuning'
      ],
      explanation: 'Moves failure handling from apology to structured trust-preserving recovery workflow.',
      relatedConcepts: ['failure-resilience', 'ux', 'trust'],
      timeEstimate: 14,
      successCriteria: [
        'Lists key recovery components',
        'Provides user agency options',
        'Sets autonomous retry criteria'
      ]
    }
  ],
  // Fine-Tuning Core Concept
  'fine-tuning': [
    {
      id: 'fine-tuning-socratic-b1',
      type: 'socratic',
      conceptId: 'fine-tuning',
      title: 'Why Not Jump Straight to RLHF?',
      level: 'beginner',
      socratiQuestion: 'If all three stages (SFT, DPO, RFT/RLHF) can improve a model, why not skip directly to the most powerful one?',
      followUpQuestions: [
        'What does the model learn during simple supervised fine-tuning that later stages depend on?',
        'What risks appear if you optimize preferences or rewards on a poorly grounded base?',
        'How does cost & iteration speed differ across stages?'
      ],
      expectedInsights: [
        'SFT establishes baseline formatting, structure, and safe task adherence',
        'Later preference/reward optimization assumes stable instruction-following',
        'Early cheap iterations reduce expensive misalignment later'
      ],
      hints: [
        'Think of building a house: what comes before interior decoration?',
        'Consider data cleanliness vs. signal complexity',
        'Reflect on failure amplification when optimizing on weak foundations'
      ],
      explanation: 'Students realize staged progression reduces instability, improves data leverage, and lowers governance risk compared to jumping directly into reinforcement optimization.',
      relatedConcepts: ['sft', 'dpo', 'rft', 'alignment-pipeline'],
      timeEstimate: 10,
      successCriteria: [
        'Identifies layering rationale',
        'Recognizes stability & cost trade-offs',
        'Understands dependency of later stages'
      ]
    },
    {
      id: 'fine-tuning-socratic-i1',
      type: 'socratic',
      conceptId: 'fine-tuning',
      title: 'When to Add DPO After SFT',
      level: 'intermediate',
      socratiQuestion: 'After SFT you observe good structure but bland or overly cautious outputs. What criteria justify introducing DPO next instead of collecting reward signals?',
      followUpQuestions: [
        'What signals show preference modeling will unlock quality?',
        'How do evaluation benchmarks guide this escalation?',
        'What governance concerns change between SFT and DPO?'
      ],
      expectedInsights: [
        'Preference diversity gaps (style, tone, ranking) motivate DPO',
        'Offline pair data cheaper than live reward pipelines',
        'DPO adds controllable alignment without full RL infra'
      ],
      hints: [
        'Look at what is missing: creativity? ranking? nuance?',
        'Consider data collection friction vs. reward model training',
        'Think about auditability and reproducibility'
      ],
      explanation: 'Focuses learner on evidence-based escalation: use DPO when structured correctness is present but preference fidelity lags.',
      relatedConcepts: ['dpo', 'escalation-criteria', 'evaluation-benchmarks'],
      timeEstimate: 14,
      successCriteria: [
        'References measurable post-SFT gaps',
        'Distinguishes preference vs. reward regimes',
        'Addresses governance / reproducibility'
      ]
    },
    {
      id: 'fine-tuning-socratic-a1',
      type: 'socratic',
      conceptId: 'fine-tuning',
      title: 'Mitigating Catastrophic Preference Collapse in RFT',
      level: 'advanced',
      socratiQuestion: 'During reinforcement fine-tuning KL divergence spikes downward (policy drifting) while reward climbs but factual accuracy benchmarks regress. What hypotheses explain this and what interventions preserve gains without collapse?',
      followUpQuestions: [
        'How can reward misspecification create deceptive improvement?',
        'What role does reference model anchoring play?',
        'How do style regression sets surface unintended shifts?'
      ],
      expectedInsights: [
        'Reward hacking can inflate score while degrading generalization',
        'KL constraint or adaptive penalty prevents semantic drift',
        'Multi-axis evaluation (factual, style, safety) detects hidden regressions'
      ],
      hints: [
        'List what the reward is NOT measuring',
        'Consider dynamic vs static KL schedules',
        'Think about shadow deployments / canary evals'
      ],
      explanation: 'Learner connects reward shaping, KL control, and multi-metric monitoring to prevent over-optimization pathologies.',
      relatedConcepts: ['reward-hacking', 'kl-control', 'multi-metric-monitoring'],
      timeEstimate: 18,
      successCriteria: [
        'Identifies reward misspecification risk',
        'Proposes KL / constraint tuning',
        'Mentions orthogonal benchmark tracking'
      ]
    }
  ],
  // Learner patterns
  'socratic-coach': socraticCoachQuestions,
  'concept-to-project': conceptToProjectQuestions,
  'error-whisperer': errorWhispererQuestions,
  'knowledge-map-navigator': knowledgeMapNavigatorQuestions,
  'peer-review-simulator': peerReviewSimulatorQuestions,
  'tool-use-coach': toolUseCoachQuestions,
  // New modules (AI Skills Explorer)
  'observability-evalops': observabilityEvalOpsSocratic,
  'promptops-tooling': promptOpsToolingSocratic,
  'safety-risk-governance': safetyRiskGovSocratic,
  'cost-performance': costPerformanceSocratic,
  'security-data-boundaries': securityDataBoundariesSocratic,
  'rag-systems': ragSystemsSocratic,
  'multi-agent-orchestration': multiAgentOrchestrationSocratic,
  'org-playbooks': orgPlaybooksSocratic,
  // New Core Concepts
  'agentic-prompting-fundamentals': agenticPromptingFundamentalsSocraticQuestions,
  'prompt-optimization-patterns': promptOptimizationPatternsSocraticQuestions,
  'agent-instruction-design': agentInstructionDesignSocraticQuestions,
  'agentic-workflow-control': agenticWorkflowControlSocraticQuestions,
  'agent-evaluation-methodologies': agentEvaluationMethodologiesSocraticQuestions,
  'agent-deployment': agentDeploymentSocraticQuestions,
  'swarm-intelligence': swarmIntelligenceSocraticQuestions,
  'agentic-ai-design-taxonomy': agenticAIDesignTaxonomySocraticQuestions,
  'sensory-reasoning-enhancement': sensoryReasoningEnhancementSocraticQuestions
  ,
  'agentic-commerce-ap2': agenticCommerceAp2SocraticQuestions
};

// Helper function to get socratic questions by concept and level
export function getSocraticQuestions(
  conceptId: string, 
  level?: StudyModeLevel
): StudyModeQuestion[] {
  const questions = socraticQuestionLibrary[conceptId] || [];
  
  if (level) {
    return questions.filter(q => q.level === level);
  }
  
  return questions;
}

// Helper function to get next question in sequence
export function getNextSocraticQuestion(
  conceptId: string, 
  currentQuestionId: string
): StudyModeQuestion | null {
  const questions = socraticQuestionLibrary[conceptId] || [];
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  
  if (currentIndex >= 0 && currentIndex < questions.length - 1) {
    return questions[currentIndex + 1];
  }
  
  return null;
}