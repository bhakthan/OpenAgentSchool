// src/lib/data/quizzes/enterprise-playbook-concepts.ts
// Dedicated quiz questions for the 8 Enterprise Playbook Concepts (2026)
import { QuizQuestion } from './types';

// ============================================================================
// Program Setup & North Star Quiz Questions
// ============================================================================
export const programSetupNorthStarQuestions: QuizQuestion[] = [
  {
    id: 'psns-q1',
    text: 'Your AI program has been running for 6 months with no clear north star metric. Teams are optimizing for different goals. What is the most critical first step to fix this?',
    question: 'What is the first step to align a directionless AI program?',
    options: [
      'Let each team continue optimizing for their own metrics to encourage innovation.',
      'Establish a unified north star metric with executive sponsorship, then cascade balanced scorecards to teams.',
      'Hire more engineers to accelerate delivery and hope alignment follows.',
      'Commission a 6-month strategy study before taking any action.'
    ],
    correctAnswer: 1,
    explanation: 'A unified north star metric with executive sponsorship creates the shared "why" that aligns all teams. Balanced scorecards then translate this into team-level metrics that collectively drive the north star. Without this, teams will continue optimizing locally rather than globally.',
    difficulty: 'intermediate',
    category: 'program-setup-north-star',
    subCategory: 'north-star-alignment',
    relatedTopics: ['executive-alignment', 'metrics', 'program-governance'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'psns-q2',
    text: 'Your maturity ladder defines "Pilot" as having no quantitative exit criteria—just "executive approval." What risk does this create?',
    question: 'What is the primary risk of subjective maturity gate criteria?',
    options: [
      'Teams will move too fast through maturity levels.',
      'Perpetual pilots: projects stay in pilot indefinitely while consuming resources without demonstrating production value.',
      'Executives will lose interest in the program.',
      'Teams will skip directly to production without any piloting.'
    ],
    correctAnswer: 1,
    explanation: 'Subjective exit criteria (like "executive approval") enable perpetual pilots. Without quantitative gates (e.g., accuracy thresholds, production traffic %, runbook completion), projects can consume budget indefinitely while citing "strategic importance" without evidence of production readiness.',
    difficulty: 'advanced',
    category: 'program-setup-north-star',
    subCategory: 'maturity-ladder',
    relatedTopics: ['maturity-gates', 'evidence-based-governance', 'pilot-management'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'psns-q3',
    text: 'Your north star scorecard includes only "agent interactions" as a metric. Teams are gaming this by deploying agents that log interactions but don\'t resolve issues. What metric combination would prevent this?',
    question: 'Which metric combination creates a balanced north star scorecard?',
    options: [
      'Total interactions + number of agents deployed + model size.',
      'Task resolution rate + customer satisfaction (CSAT ≥ 4.0) + policy incident count.',
      'Lines of code + sprint velocity + team headcount.',
      'Executive mentions + press coverage + hackathon wins.'
    ],
    correctAnswer: 1,
    explanation: 'A balanced scorecard combines outcomes (task resolution), trust (customer satisfaction), and guardrails (incident count). This prevents gaming by requiring actual value delivery with quality thresholds. Pure activity metrics like "interactions" can be gamed without delivering value.',
    difficulty: 'intermediate',
    category: 'program-setup-north-star',
    subCategory: 'balanced-scorecard',
    relatedTopics: ['metric-design', 'gaming-prevention', 'value-measurement'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];

// ============================================================================
// Responsible AI Governance Quiz Questions
// ============================================================================
export const responsibleAIGovernanceQuizQuestions: QuizQuestion[] = [
  {
    id: 'rag-q1',
    text: 'Your risk review board has a 4-week backlog. Teams are bypassing governance to meet deadlines, deploying agents without review. What is the root cause?',
    question: 'What is the root cause when teams bypass governance due to slow reviews?',
    options: [
      'Teams are malicious and want to avoid oversight.',
      'One-size-fits-all governance creates friction for low-risk agents, while lacking technical enforcement to prevent bypass.',
      'The risk review board is understaffed but otherwise functioning correctly.',
      'Governance should be eliminated to enable faster innovation.'
    ],
    correctAnswer: 1,
    explanation: 'Shadow deployments emerge when governance creates friction without differentiation by risk level, and when there\'s no technical enforcement. The solution is tiered review (auto-approve low-risk, expedite medium, full review high-risk) plus pipeline gates that block deployment without approval tokens.',
    difficulty: 'intermediate',
    category: 'responsible-ai-governance',
    subCategory: 'tiered-governance',
    relatedTopics: ['shadow-ai', 'governance-velocity', 'risk-tiering'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'rag-q2',
    text: 'Your compliance audit found that 40% of documented AI policies have no corresponding technical implementation. Policy documents describe aspirations, not reality. What approach fixes this?',
    question: 'How should organizations ensure policies match technical implementation?',
    options: [
      'Write more detailed policy documents with stricter language.',
      'Express policies as code (OPA/Rego), generate enforcement from policy definitions, and validate in CI/CD.',
      'Trust engineers to implement policies correctly based on verbal briefings.',
      'Hire external auditors to check compliance quarterly.'
    ],
    correctAnswer: 1,
    explanation: 'Policy-as-code eliminates drift by making policies machine-readable and executable. Policies expressed in structured formats (OPA/Rego) can generate enforcement code, be validated in CI/CD, and enable continuous drift detection between documented intent and deployed reality.',
    difficulty: 'advanced',
    category: 'responsible-ai-governance',
    subCategory: 'policy-as-code',
    relatedTopics: ['compliance-automation', 'policy-drift', 'governance-enforcement'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 55
  },
  {
    id: 'rag-q3',
    text: 'Your AI governance framework covers pre-deployment review but has no post-deployment monitoring. What gap does this create?',
    question: 'What is the primary gap when governance lacks post-deployment monitoring?',
    options: [
      'Agents will be too slow in production.',
      'Policy violations and model drift can occur without detection, creating regulatory exposure until users complain.',
      'Development teams will become less productive.',
      'Costs will increase during the review process.'
    ],
    correctAnswer: 1,
    explanation: 'Pre-deployment review creates a point-in-time assessment, but agents can drift, data can change, and new failure modes can emerge in production. Continuous post-deployment monitoring with escalation triggers keeps governance proactive rather than reactive to user complaints or regulatory findings.',
    difficulty: 'intermediate',
    category: 'responsible-ai-governance',
    subCategory: 'continuous-governance',
    relatedTopics: ['post-deployment-monitoring', 'model-drift', 'incident-detection'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];

// ============================================================================
// Strategy & Portfolio Management Quiz Questions
// ============================================================================
export const strategyPortfolioManagementQuizQuestions: QuizQuestion[] = [
  {
    id: 'spm-q1',
    text: 'During portfolio review, a VP insists their chatbot project (projected 1.2x ROI) gets 60% of budget, while data shows internal automation has 4.8x ROI. What governance mechanism prevents this?',
    question: 'What mechanism prevents HiPPO (Highest Paid Person\'s Opinion) bias in portfolio allocation?',
    options: [
      'Always defer to the most senior executive in the room.',
      'Evidence-based scorecard with pre-committed criteria, calculated before revealing project sponsors.',
      'Let the loudest advocate win the argument.',
      'Rotate decision-making randomly among team members.'
    ],
    correctAnswer: 1,
    explanation: 'Pre-committed, evidence-based criteria with blind scoring prevents HiPPO bias. Projects should be scored on ROI, risk, strategic alignment, and feasibility before sponsor identity is revealed. This ensures data drives decisions rather than organizational politics.',
    difficulty: 'intermediate',
    category: 'strategy-portfolio-management',
    subCategory: 'evidence-based-allocation',
    relatedTopics: ['portfolio-governance', 'bias-prevention', 'resource-allocation'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'spm-q2',
    text: 'Your portfolio has 8 projects with no progress in 6+ months, still receiving funding because "we\'ve already invested $2.4M." What cognitive bias is driving this, and how do you counter it?',
    question: 'How should portfolio governance handle zombie projects citing sunk costs?',
    options: [
      'Continue funding to recover the sunk investment.',
      'Evaluate only future value (ignore sunk costs), with pre-defined kill criteria that trigger automatic review after missed milestones.',
      'Increase funding to accelerate the stalled projects.',
      'Wait for projects to self-terminate when teams get frustrated.'
    ],
    correctAnswer: 1,
    explanation: 'Sunk cost fallacy causes organizations to throw good money after bad. Counter with: (1) evaluate only future value, not past investment, (2) pre-define kill triggers (e.g., miss 2 milestones = automatic review), and (3) celebrate "smart kills" that freed resources for better opportunities.',
    difficulty: 'advanced',
    category: 'strategy-portfolio-management',
    subCategory: 'portfolio-hygiene',
    relatedTopics: ['sunk-cost-fallacy', 'project-termination', 'resource-reallocation'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'spm-q3',
    text: 'Support telemetry reveals a high-friction workflow primed for AI automation. How should you fund exploration without destabilizing your existing portfolio?',
    question: 'How should new opportunities be evaluated against the existing portfolio?',
    options: [
      'Ignore until the next annual planning cycle.',
      'Spin up a time-boxed discovery squad with explicit success metrics and learning goals.',
      'Fully staff a product team immediately before validation.',
      'Cancel an existing project to free up resources for the new opportunity.'
    ],
    correctAnswer: 1,
    explanation: 'Discovery squads are small, time-boxed teams (e.g., 4 weeks, 2-3 people) with explicit success metrics. This "option bet" tests the hypothesis without destabilizing the portfolio. If validated, the opportunity can compete for full funding in the next portfolio cycle.',
    difficulty: 'intermediate',
    category: 'strategy-portfolio-management',
    subCategory: 'discovery-management',
    relatedTopics: ['option-bets', 'portfolio-balance', 'opportunity-validation'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 45
  }
];

// ============================================================================
// Data & Knowledge Operations Quiz Questions
// ============================================================================
export const dataKnowledgeOperationsQuizQuestions: QuizQuestion[] = [
  {
    id: 'dko-q1',
    text: 'Your RAG agent sometimes cites a 2021 policy (outdated) instead of the 2024 policy (current). Investigation shows both versions exist in the knowledge base. What knowledge operations practice would prevent this?',
    question: 'How should knowledge bases handle multiple document versions?',
    options: [
      'Let the embedding model decide which version to retrieve.',
      'Version tracking with supersedes relationships, freshness decay in retrieval scoring, and source authority hierarchy.',
      'Delete all old documents immediately when new ones are added.',
      'Trust that users will notice outdated information.'
    ],
    correctAnswer: 1,
    explanation: 'Effective knowledge operations require: (1) versioning with supersedes relationships so old versions are archived but not retrieved by default, (2) freshness decay that penalizes older content in retrieval scoring, and (3) source authority that prioritizes official sources over informal documents.',
    difficulty: 'intermediate',
    category: 'data-knowledge-operations',
    subCategory: 'knowledge-versioning',
    relatedTopics: ['rag-quality', 'document-lifecycle', 'freshness-decay'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'dko-q2',
    text: 'Your team upgraded from embedding model v1 to v2. Retrieval quality dropped 60% immediately. Investigation shows old documents embedded with v1, but queries use v2. What went wrong?',
    question: 'What causes retrieval quality collapse during embedding model migration?',
    options: [
      'The new model is fundamentally worse.',
      'Query embeddings from v2 are in a different vector space than document embeddings from v1—they\'re mathematically incompatible.',
      'Users changed their query patterns on the same day.',
      'The knowledge base was accidentally deleted.'
    ],
    correctAnswer: 1,
    explanation: 'Different embedding models produce vectors in different semantic spaces. Comparing v2 query embeddings against v1 document embeddings produces meaningless similarity scores. Migration requires: (1) re-embedding all documents with the new model, (2) parallel indexes during transition, and (3) validation before cutover.',
    difficulty: 'advanced',
    category: 'data-knowledge-operations',
    subCategory: 'embedding-migration',
    relatedTopics: ['vector-compatibility', 'model-versioning', 'migration-strategy'],
    persona: ['ai-engineer', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'dko-q3',
    text: 'Your knowledge refresh pipeline ingests every document from shared drives. Quality has degraded because curators can\'t review the volume. What sourcing strategy balances freshness with quality?',
    question: 'How should knowledge ingestion balance automation with curation?',
    options: [
      'Ingest everything and rely on the LLM to filter quality.',
      'Pull structured updates via API, flag deltas for curator review, and quarantine unverified documents.',
      'Only accept documents submitted by senior leaders.',
      'Disable automated ingestion and require manual upload for everything.'
    ],
    correctAnswer: 1,
    explanation: 'Effective knowledge pipelines combine automation for sourcing with human checkpoints for quality. API-based delta detection identifies changes, curator review validates high-risk updates, and quarantine zones hold unverified content until approved—balancing freshness with accuracy.',
    difficulty: 'intermediate',
    category: 'data-knowledge-operations',
    subCategory: 'knowledge-ingestion',
    relatedTopics: ['curation-workflows', 'quality-control', 'automated-ingestion'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];

// ============================================================================
// Architecture & Platform Operations Quiz Questions
// ============================================================================
export const architecturePlatformOperationsQuizQuestions: QuizQuestion[] = [
  {
    id: 'apo-q1',
    text: 'Your 3-person platform team has a 200-ticket backlog serving 40 product teams. Average wait time is 3 weeks. Teams are building shadow infrastructure. What operating model change addresses this?',
    question: 'How should platform teams scale beyond ticket-based support?',
    options: [
      'Hire more platform engineers to process tickets faster.',
      'Shift to self-service golden paths for 80% of use cases, with platform team building tools rather than handling tickets.',
      'Limit access to the platform to reduce demand.',
      'Outsource platform support to a third party.'
    ],
    correctAnswer: 1,
    explanation: 'Scalable platforms enable teams through self-service rather than gatekeeping. Golden paths (pre-approved architectures teams can deploy themselves) handle 80%+ of use cases. Platform engineers build tools, maintain paths, and handle only the complex 5-10% of requests that require human expertise.',
    difficulty: 'intermediate',
    category: 'architecture-platform-operations',
    subCategory: 'platform-operating-model',
    relatedTopics: ['self-service', 'golden-paths', 'platform-scaling'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'apo-q2',
    text: '70% of teams started on your golden path but forked to custom solutions. Investigation shows the path hasn\'t been updated in 18 months and lacks streaming, multi-modal, and advanced RAG features. What went wrong?',
    question: 'Why do teams fork from golden paths instead of using them?',
    options: [
      'Teams prefer building their own solutions.',
      'Golden paths stopped evolving and lacked features teams needed, with no contribution mechanism for teams to extend the path.',
      'The path was too opinionated from the start.',
      'Teams didn\'t receive enough training on the path.'
    ],
    correctAnswer: 1,
    explanation: 'Golden paths require continuous investment. When paths stop evolving, teams fork to add needed features. Prevention requires: (1) dedicated path maintenance (not a side project), (2) adopter council to prioritize features, (3) contribution model so teams can PR extensions, and (4) quarterly capability reviews.',
    difficulty: 'advanced',
    category: 'architecture-platform-operations',
    subCategory: 'golden-path-evolution',
    relatedTopics: ['path-governance', 'community-contributions', 'platform-evolution'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 55
  },
  {
    id: 'apo-q3',
    text: 'Your platform offers one tier: "full managed service." High-autonomy teams are frustrated by constraints; low-maturity teams are overwhelmed by complexity. What service model addresses both?',
    question: 'How should platforms serve teams with different autonomy levels?',
    options: [
      'Force all teams to use the same tier for consistency.',
      'Tiered services (self-serve, guided, managed) with published SLAs and feature sets matched to team maturity.',
      'Let teams build whatever they want with no platform involvement.',
      'Only serve enterprise teams; ignore smaller teams.'
    ],
    correctAnswer: 1,
    explanation: 'Tiered service models match support level to team needs. Self-serve tiers give high-autonomy teams tools without constraints. Guided tiers provide guardrails with flexibility. Managed tiers handle operations for teams without platform expertise. Published SLAs set clear expectations for each tier.',
    difficulty: 'intermediate',
    category: 'architecture-platform-operations',
    subCategory: 'service-tiering',
    relatedTopics: ['platform-adoption', 'team-maturity', 'service-levels'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];

// ============================================================================
// Experimentation & Continuous Improvement Quiz Questions
// ============================================================================
export const experimentationContinuousImprovementQuizQuestions: QuizQuestion[] = [
  {
    id: 'eci-q1',
    text: 'Your team ran 15 successful experiments last quarter. Zero shipped to production—they\'re all in a 200-item backlog. What process gap caused this?',
    question: 'Why do successful experiments fail to reach production?',
    options: [
      'Experiments weren\'t actually successful.',
      'Experimentation and production are separate workflows with no reserved capacity for experiment winners.',
      'Production systems are too complex to integrate experiments.',
      'Users don\'t want the experimental features.'
    ],
    correctAnswer: 1,
    explanation: 'Experiments create value only when shipped. Common gaps: (1) experimentation ends at validation rather than production, (2) no reserved capacity for winners (they compete with full roadmap), and (3) no handoff process. Fix with: experiment charters that include productionization, 20% reserved capacity for winners.',
    difficulty: 'intermediate',
    category: 'experimentation-continuous-improvement',
    subCategory: 'experiment-to-production',
    relatedTopics: ['productionization', 'capacity-allocation', 'experiment-lifecycle'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'eci-q2',
    text: 'Your evaluation suite shows 94% accuracy, but user satisfaction is 60%. The eval suite was created at launch 12 months ago and never updated. What went wrong?',
    question: 'What causes divergence between evaluation accuracy and user satisfaction?',
    options: [
      'Users are too demanding.',
      'Stale evaluation suites don\'t capture new failure modes, edge cases, and use patterns that emerged in production.',
      'The accuracy metric is calculated incorrectly.',
      '94% accuracy is inherently insufficient for any use case.'
    ],
    correctAnswer: 1,
    explanation: 'Evaluation suites that don\'t evolve become disconnected from reality. Teams optimize for stale evals (Goodharting) while missing production failure modes. Fix with: incident-to-eval pipeline, periodic refresh from production traffic, adversarial cases from red team, and holdout rotation to prevent overfitting.',
    difficulty: 'advanced',
    category: 'experimentation-continuous-improvement',
    subCategory: 'evaluation-evolution',
    relatedTopics: ['eval-freshness', 'production-feedback', 'goodharting'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 55
  },
  {
    id: 'eci-q3',
    text: 'Your experimentation framework allows teams to run A/B tests, but there\'s no requirement to document hypotheses or learning outcomes. What capability is missing?',
    question: 'What makes experimentation create organizational learning?',
    options: [
      'Running more experiments faster.',
      'Hypothesis documentation, structured outcome capture, and knowledge sharing so learning compounds across teams.',
      'Automated A/B test infrastructure.',
      'Executive approval for each experiment.'
    ],
    correctAnswer: 1,
    explanation: 'Experimentation without learning capture is just trial-and-error. Structured hypothesis documentation ("we believe X because Y"), outcome capture (confirmed/refuted with evidence), and cross-team knowledge sharing turn individual experiments into organizational learning that compounds over time.',
    difficulty: 'intermediate',
    category: 'experimentation-continuous-improvement',
    subCategory: 'learning-capture',
    relatedTopics: ['hypothesis-driven', 'knowledge-management', 'organizational-learning'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];

// ============================================================================
// Ecosystem & Partnerships Quiz Questions
// ============================================================================
export const ecosystemPartnershipsQuizQuestions: QuizQuestion[] = [
  {
    id: 'ep-q1',
    text: 'Your vendor announced a 300% price increase. Migration would take 18 months because all 50 agents use vendor-specific APIs with no abstraction layer. What architectural pattern would have prevented this lock-in?',
    question: 'How should organizations prevent vendor lock-in in AI infrastructure?',
    options: [
      'Always choose the cheapest vendor.',
      'Provider abstraction interfaces with pluggable implementations, plus multi-vendor capability (even if not actively used).',
      'Sign longer contracts for better pricing.',
      'Build all AI infrastructure in-house.'
    ],
    correctAnswer: 1,
    explanation: 'Vendor lock-in prevention requires: (1) provider interfaces (LLMProvider, EmbeddingProvider) that abstract vendor-specific APIs, (2) implementations for multiple vendors, and (3) regular testing against alternatives. This creates negotiating leverage and reduces catastrophic switching costs.',
    difficulty: 'intermediate',
    category: 'ecosystem-partnerships',
    subCategory: 'vendor-strategy',
    relatedTopics: ['abstraction-layers', 'multi-vendor', 'negotiating-leverage'],
    persona: ['agent-architect', 'ai-engineer', 'business-leader'],
    timeEstimate: 50
  },
  {
    id: 'ep-q2',
    text: 'A partner API changed its response format without notice. Your agents started hallucinating because they received malformed data. What defensive practices would have caught this?',
    question: 'How should organizations defend against partner API changes?',
    options: [
      'Trust partners to notify you of all changes.',
      'Schema validation on all external responses, contract tests in CI, and graceful degradation when data is invalid.',
      'Only use internal APIs, avoiding all external partners.',
      'Manually test partner integrations before each release.'
    ],
    correctAnswer: 1,
    explanation: 'Partner integrations require defensive programming: (1) schema validation rejects malformed responses, (2) contract tests in CI detect API drift before production, (3) integration health monitoring alerts on validity rate drops, and (4) graceful degradation acknowledges limitations rather than hallucinating.',
    difficulty: 'advanced',
    category: 'ecosystem-partnerships',
    subCategory: 'partner-integration',
    relatedTopics: ['schema-validation', 'contract-testing', 'graceful-degradation'],
    persona: ['agent-architect', 'ai-engineer'],
    timeEstimate: 55
  },
  {
    id: 'ep-q3',
    text: 'Your organization wants to expose agents to external partners. What governance capabilities are essential for external agent access?',
    question: 'What governance is required for external partner access to agents?',
    options: [
      'No additional governance—treat external partners like internal teams.',
      'API rate limiting, usage-based billing, audit logging, and different trust boundaries than internal access.',
      'Block all external access to agents.',
      'Require partners to build their own agents instead.'
    ],
    correctAnswer: 1,
    explanation: 'External agent access requires: (1) rate limiting to prevent abuse, (2) usage-based billing for sustainability, (3) comprehensive audit logging for compliance, and (4) different trust boundaries (external partners may need restricted tool access, data scope, or capability limits compared to internal users).',
    difficulty: 'intermediate',
    category: 'ecosystem-partnerships',
    subCategory: 'external-governance',
    relatedTopics: ['api-governance', 'trust-boundaries', 'partner-billing'],
    persona: ['agent-architect', 'business-leader'],
    timeEstimate: 45
  }
];

// ============================================================================
// Organizational Enablement Quiz Questions
// ============================================================================
export const organizationalEnablementQuizQuestions: QuizQuestion[] = [
  {
    id: 'oe-q1',
    text: 'You trained 500 employees on AI agents with 90% reporting confidence. Project reviews show only 10% are actually applying skills. What\'s missing from the training program?',
    question: 'Why does training confidence not translate to skill application?',
    options: [
      'Employees are lying about their confidence levels.',
      'Training exists in isolation—no follow-up projects, coaching, or accountability for applying skills.',
      '90% confidence is too low; aim for 100%.',
      'Training content was too theoretical.'
    ],
    correctAnswer: 1,
    explanation: 'Training without application decays rapidly (70% forgotten in 30 days). Effective programs require: (1) project deliverable due within 30 days, (2) coaching support after training, (3) peer learning cohorts, and (4) manager accountability for sponsoring application projects. Measure outcomes delivered, not certificates earned.',
    difficulty: 'intermediate',
    category: 'organizational-enablement',
    subCategory: 'applied-learning',
    relatedTopics: ['skill-transfer', 'training-effectiveness', 'learning-retention'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'oe-q2',
    text: 'Your Center of Excellence published 40 best practices documents, but only 5% of teams follow them. Teams say standards don\'t fit their reality. What went wrong?',
    question: 'Why do Center of Excellence standards fail to gain adoption?',
    options: [
      'Teams are resistant to change.',
      'Standards were created in isolation without practitioner input, piloting, or feedback mechanisms.',
      'There are too many standards.',
      'Standards should be mandatory with enforcement.'
    ],
    correctAnswer: 1,
    explanation: 'Ivory tower CoEs fail because standards don\'t reflect reality. Fix with: (1) rotating product team members join CoE 20% time, (2) standards drafted with team input and piloted before publishing, (3) office hours for questions, and (4) evolution process for teams to propose changes. Measure adoption rate, not publication count.',
    difficulty: 'advanced',
    category: 'organizational-enablement',
    subCategory: 'coe-operating-model',
    relatedTopics: ['community-of-practice', 'standard-adoption', 'practitioner-input'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'oe-q3',
    text: 'Your organization wants to build internal AI talent rather than relying on external hires. What capability-building approach accelerates this?',
    question: 'How should organizations build internal AI agent capabilities?',
    options: [
      'Send everyone to external conferences.',
      'Structured learning paths with progression milestones, internal experts as coaches, and real project assignments at each level.',
      'Wait for AI to become simpler so less training is needed.',
      'Hire a small expert team and silo AI work to them.'
    ],
    correctAnswer: 1,
    explanation: 'Internal capability building requires: (1) learning paths with clear progression (beginner → practitioner → expert), (2) internal experts as coaches and role models, (3) real project assignments (not just theory), and (4) career progression tied to demonstrated AI skills. This creates self-sustaining capability growth.',
    difficulty: 'intermediate',
    category: 'organizational-enablement',
    subCategory: 'capability-building',
    relatedTopics: ['learning-paths', 'internal-coaching', 'talent-development'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 45
  }
];

// ============================================================================
// Combined Export
// ============================================================================
export const enterprisePlaybookConceptsQuestions: QuizQuestion[] = [
  ...programSetupNorthStarQuestions,
  ...responsibleAIGovernanceQuizQuestions,
  ...strategyPortfolioManagementQuizQuestions,
  ...dataKnowledgeOperationsQuizQuestions,
  ...architecturePlatformOperationsQuizQuestions,
  ...experimentationContinuousImprovementQuizQuestions,
  ...ecosystemPartnershipsQuizQuestions,
  ...organizationalEnablementQuizQuestions
];

// Time estimates for Study Mode
export const enterprisePlaybookConceptsTimeEstimate = 50; // Average across all questions
