// src/lib/data/quizzes/adoption-playbook.ts
import { QuizQuestion } from './types';

export const adoptionPlaybookQuestions: QuizQuestion[] = [
  {
    id: 'adoption-i1',
    text: 'Your executive team is excited about agentic AI but hasn\'t defined what success looks like. According to the Adoption Playbook, what should be the first step?',
    question: 'What is the first critical step when executives are interested in agentic AI adoption?',
    options: [
      'Immediately hire a team of AI engineers and start building agents.',
      'Ground the leadership team in a shared ambition using the Mission Brief to define value narratives, outcomes, and success criteria.',
      'Purchase the most expensive AI platform available in the market.',
      'Deploy a pilot agent to production without evaluation frameworks.'
    ],
    correctAnswer: 1,
    explanation: 'The Mission Brief phase is designed to create executive alignment around "why" agentic adoption matters. This includes defining value narratives (customer, employee, regulator), identifying high-friction workflows, and establishing risk posture before any technical work begins.',
    difficulty: 'intermediate',
    category: 'adoption-playbook',
    subCategory: 'mission-brief',
    relatedTopics: ['executive-alignment', 'value-narratives', 'strategic-planning'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 45
  },
  {
    id: 'adoption-a1',
    text: 'You\'re leading the "Learn & Align" phase of adoption. Which combination of deliverables best demonstrates readiness to move to "Architect & Roadmap"?',
    question: 'Which deliverables signal readiness to progress from Learn & Align to Architect & Roadmap phase?',
    options: [
      'A completed agent already deployed to production with full automation.',
      'Executive charter with value narratives + portfolio heatmap of 3-5 workflows + risk posture brief covering compliance.',
      'A single proof-of-concept without stakeholder buy-in or metrics.',
      'A detailed technical architecture without any business case or executive sponsorship.'
    ],
    correctAnswer: 1,
    explanation: 'The Learn & Align phase (Weeks 0-3) focuses on business signals: executive charter, portfolio heatmap of candidate workflows, and risk/compliance alignment. Technical signals include capability baseline and architecture primer, but strategic alignment comes first.',
    difficulty: 'advanced',
    category: 'adoption-playbook',
    subCategory: 'transformation-journey',
    relatedTopics: ['transformation-phases', 'business-alignment', 'risk-management'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'adoption-i2',
    text: 'Which of these questions from the Status Quo Discovery framework addresses the agentic AI\'s unique capability for compound learning?',
    question: 'Which discovery question targets compound learning—a key differentiator of agentic systems?',
    options: [
      'What products and services do customers want today?',
      'How can you offer more for less with GenAI?',
      'What organizational knowledge and decision-making processes can agents augment to create compound learning effects over time?',
      'What measures of productivity can be improved?'
    ],
    correctAnswer: 2,
    explanation: 'Unlike static automation, agentic AI can continuously improve through compound learning. This question surfaces opportunities where agents can capture institutional knowledge, learn from every interaction, and accelerate decision quality over time—the transformational aspect of agents vs. traditional automation.',
    difficulty: 'advanced',
    category: 'adoption-playbook',
    subCategory: 'status-quo-discovery',
    relatedTopics: ['compound-learning', 'knowledge-augmentation', 'organizational-intelligence'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'adoption-i3',
    text: 'Your organization operates with quarterly steering committees and manual approvals. According to the Legacy → Agentic Shift framework, what would the agentic pattern look like?',
    question: 'How does decision velocity shift from legacy to agentic operating models?',
    options: [
      'Continue quarterly steering with additional meetings for agent oversight.',
      'Replace all human decision-making with fully autonomous agents.',
      'Implement live scorecards with automated evaluation loops and executive guardrails for faster, data-driven decisions.',
      'Eliminate all governance processes to move faster.'
    ],
    correctAnswer: 2,
    explanation: 'The agentic shift in Decision Velocity replaces "quarterly steering, manual approvals, and inconsistent telemetry" with "live scorecards with automated evaluation loops and executive guardrails." This enables faster decisions while maintaining appropriate oversight.',
    difficulty: 'intermediate',
    category: 'adoption-playbook',
    subCategory: 'legacy-shift',
    relatedTopics: ['decision-velocity', 'governance', 'telemetry'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'adoption-a2',
    text: 'You\'re designing the Agentic Operating System. Which pillar ensures that agents don\'t become black boxes to regulators and auditors?',
    question: 'Which operating pillar addresses regulatory transparency and audit requirements?',
    options: [
      'Value Governance - focusing only on P&L metrics',
      'Platform Excellence - optimizing for performance',
      'Trust & Safety - with embedded policy checks, incident drills, and transparent audit packs with lineage and decision explanations',
      'People & Culture - training programs for employees'
    ],
    correctAnswer: 2,
    explanation: 'The Trust & Safety pillar operationalizes responsible AI policies with embedded policy checks (pre-flight, in-flight, post-flight), incident drills pairing legal/security/product teams, and transparent audit packs including lineage, evaluations, and decision explanations—critical for regulatory compliance.',
    difficulty: 'advanced',
    category: 'adoption-playbook',
    subCategory: 'operating-system',
    relatedTopics: ['trust-safety', 'audit-trails', 'regulatory-compliance', 'responsible-ai'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 55
  },
  {
    id: 'adoption-i4',
    text: 'During the "Pilot & Build" phase (Weeks 5-9), your team ships an agent but users report confusing failures. What should have been instrumented earlier?',
    question: 'What instrumentation prevents confusing agent failures during pilot deployment?',
    options: [
      'Marketing campaigns to promote the agent',
      'Dashboards covering containment, satisfaction, and run-cost metrics established during the "Design & Roadmap" phase',
      'Additional training data without evaluation metrics',
      'More LLM parameters to make the agent "smarter"'
    ],
    correctAnswer: 1,
    explanation: 'The "Architect & Roadmap" phase (Weeks 3-6) should establish telemetry and evaluation harness on sandbox data. The "Pilot & Build" phase then instruments dashboards for containment (did agent handle it?), satisfaction (user feedback), and run-cost—making failures visible and actionable.',
    difficulty: 'intermediate',
    category: 'adoption-playbook',
    subCategory: 'transformation-journey',
    relatedTopics: ['telemetry', 'evaluation', 'observability', 'pilot-deployment'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'adoption-a3',
    text: 'Your organization wants to differentiate through agentic AI. According to the Status Quo Discovery framework, what question helps identify unique competitive advantage?',
    question: 'Which discovery question surfaces unique organizational differentiation opportunities?',
    options: [
      'Can it offer more cost-efficient services? (generic efficiency)',
      'What value drivers differentiate your organization from others?',
      'What should you automate in existing processes? (basic automation)',
      'How can you offer more for less? (generic cost reduction)'
    ],
    correctAnswer: 1,
    explanation: 'While efficiency and cost reduction are important, "What value drivers differentiate your organization from others?" directly addresses competitive differentiation. This question helps identify unique organizational strengths that agents can amplify—turning competitive advantages into sustainable, AI-augmented moats.',
    difficulty: 'advanced',
    category: 'adoption-playbook',
    subCategory: 'status-quo-discovery',
    relatedTopics: ['competitive-advantage', 'differentiation', 'value-creation'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'adoption-i5',
    text: 'The Activation Plan recommends a 90-day timeline. What is the primary focus of Stage 1 (Weeks 0-2): Orientation & Alignment?',
    question: 'What is the main goal of the first stage in the 90-day Activation Plan?',
    options: [
      'Deploy agents to production immediately to show quick wins.',
      'Run executive literacy workshop, select 2 workflows with baseline metrics, and draft joint charter with value hypotheses and success criteria.',
      'Build the complete agent platform infrastructure.',
      'Hire external consultants to manage the entire adoption process.'
    ],
    correctAnswer: 1,
    explanation: 'Stage 1 (Orientation & Alignment) focuses on foundational alignment: run the executive literacy workshop, select 2 mission-critical workflows, capture baseline metrics, and draft a charter outlining value hypotheses, risks, and success criteria. This creates the shared foundation before any technical build.',
    difficulty: 'intermediate',
    category: 'adoption-playbook',
    subCategory: 'activation-plan',
    relatedTopics: ['activation-timeline', 'executive-alignment', 'baseline-metrics'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'adoption-a4',
    text: 'Your team is transitioning from legacy "rigid processes with single-threaded handoffs" to an agentic model. What workflow design pattern should replace this?',
    question: 'How should workflow design evolve from legacy to agentic patterns?',
    options: [
      'Keep rigid processes but add an AI chatbot at the end.',
      'Composable journeys with human-in-the-loop checkpoints and rich context windows.',
      'Fully automate all processes without any human oversight.',
      'Create more rigid processes with additional approval layers.'
    ],
    correctAnswer: 1,
    explanation: 'The Legacy → Agentic Shift in Workflow Design moves from "rigid processes with single-threaded handoffs and opaque data" to "composable journeys with human-in-the-loop checkpoints and rich context windows." This enables flexibility while maintaining appropriate human control points.',
    difficulty: 'advanced',
    category: 'adoption-playbook',
    subCategory: 'legacy-shift',
    relatedTopics: ['workflow-design', 'human-in-loop', 'composability'],
    persona: ['agent-architect', 'ai-engineer', 'business-leader'],
    timeEstimate: 55
  },
  {
    id: 'adoption-i6',
    text: 'According to the Readiness Checklist, which of these is NOT a critical requirement before broader agent rollout?',
    question: 'Which item is NOT on the critical Readiness Checklist for agent rollout?',
    options: [
      'Executive sponsor owns a success metric tied to the agentic journey.',
      'Responsible AI policy translated into actionable, enforceable controls.',
      'Perfect 100% agent accuracy on all possible inputs.',
      'Cross-functional adoption squad established with defined operating cadence.'
    ],
    correctAnswer: 2,
    explanation: 'Perfect accuracy is unrealistic and not on the checklist. The readiness items focus on governance (executive sponsor, success metrics), responsible AI controls, telemetry/evaluation harness, cross-functional teams, knowledge freshness, and change management—realistic, measurable foundations for scaling.',
    difficulty: 'intermediate',
    category: 'adoption-playbook',
    subCategory: 'activation-plan',
    relatedTopics: ['readiness-criteria', 'governance', 'evaluation'],
    persona: ['business-leader', 'agent-architect', 'ai-engineer'],
    timeEstimate: 45
  }
];
