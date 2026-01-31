import { StudyModeQuestion } from './types';

export const compositeScenarioQuestions: StudyModeQuestion[] = [
  {
    id: 'fusion-replay-perception',
    type: 'scenario',
    conceptId: 'strategy-memory-replay',
    title: 'Replay Decision Under Partial Perception Drift',
    level: 'advanced',
    scenario: {
      id: 'fusion-replay-perception-s',
      title: 'Selective Adaptation Challenge',
      description: 'Evaluate which sub-plan segments to adapt when 2/6 perception hashes changed.',
      context: 'Historical plan segments: ingestion, normalization, join, aggregate, summarize, export. Hash deltas on normalization & join due to upstream format tweak.',
      stakeholders: ['platform','analytics'],
      challenges: [
        {
          id: 'segment-identification',
          title: 'Identify Impacted Segments',
          description: 'Choose which segments require adaptation.',
          question: 'Which segments MUST be adapted?',
          type: 'multiple-choice',
          options: [
            'Only normalization',
            'Normalization and join',
            'All segments',
            'Aggregate only'
          ],
          correctAnswer: 1,
          feedback: 'Normalization and join depend on changed upstream formats; others remain stable.',
          hints: ['Look at direct data shape dependencies.']
        },
        {
          id: 'reuse-vs-rebuild',
          title: 'Reuse Strategy',
          description: 'Decide reuse scope.',
          question: 'Best approach for plan reuse?',
          type: 'multiple-choice',
          options: [
            'Full rebuild to be safe',
            'Selective adaptation of changed segments',
            'Blind reuse of full plan',
            'Discard history and start new baseline'
          ],
          correctAnswer: 1,
          feedback: 'Selective adaptation preserves efficiency while managing drift.',
          hints: ['Avoid unnecessary rebuild cost.']
        }
      ],
      outcomes: [
        { id: 'optimal', condition: 'All challenges correct', result: 'Efficient targeted adaptation chosen', explanation: 'You minimized cost while ensuring correctness.' },
        { id: 'suboptimal', condition: 'Any incorrect', result: 'Over- or under-adaptation risk', explanation: 'Review which segments depend on drifted data.' }
      ],
      conceptId: 'strategy-memory-replay',
      difficulty: 'advanced',
      estimatedTime: '7 minutes',
      learningOutcomes: ['Assess drift impact', 'Optimize reuse vs rebuild']
    },
    explanation: 'Evaluates combining perception drift analysis with strategic reuse decisions.',
    relatedConcepts: ['perception-normalization','strategy-memory-replay'],
    successCriteria: ['Correct impacted segment identification','Selective adaptation chosen']
  },
  // Client Coding Agents SCL
  {
    id: 'scl-cli-agent-workflow-orchestration',
    type: 'scenario',
    conceptId: 'client-coding-agents',
    title: 'Orchestrating CLI Agents Across Development Lifecycle',
    level: 'advanced',
    scenario: {
      id: 'cli-agent-orchestration-scl',
      title: 'Multi-Agent Development Pipeline',
      description: 'Design a workflow that combines multiple CLI coding agents to handle different stages of a feature implementation.',
      context: 'Your team has access to Copilot CLI for quick commands, Claude Code for complex refactoring, and Gemini CLI for documentation. A feature request requires code changes, tests, and documentation updates.',
      stakeholders: ['developer', 'tech-lead', 'documentation-team'],
      challenges: [
        {
          id: 'agent-task-assignment',
          title: 'Assign Agents to Tasks',
          description: 'Match each agent to appropriate tasks based on strengths.',
          question: 'Which assignment best leverages each agent\'s capabilities?',
          type: 'multiple-choice',
          options: [
            'Use only Claude Code for everything since it is the most powerful',
            'Copilot CLI for shell commands, Claude Code for code refactoring, Gemini CLI for documentation generation',
            'Use random assignment since all agents are equivalent',
            'Use Gemini CLI for code since it has the largest context window'
          ],
          correctAnswer: 1,
          feedback: 'Each agent has unique strengths: Copilot CLI excels at shell operations, Claude Code at multi-file refactoring, Gemini at documentation with visual elements.',
          hints: ['Consider what each agent is optimized for.', 'Think about context requirements for each task.']
        },
        {
          id: 'context-handoff',
          title: 'Context Handoff Strategy',
          description: 'Plan how to transfer context between agents.',
          question: 'How should you transfer context between CLI agents working on the same feature?',
          type: 'multiple-choice',
          options: [
            'Let each agent figure it out independently',
            'Use AGENTS.md and git commits as shared context, plus explicit handoff summaries',
            'Copy paste entire conversation histories between terminals',
            'Only use one agent at a time with complete restarts'
          ],
          correctAnswer: 1,
          feedback: 'Project files like AGENTS.md provide persistent context, git commits track changes, and handoff summaries capture intent and decisions.',
          hints: ['What persists across agent sessions?', 'How do humans hand off work?']
        }
      ],
      outcomes: [
        { id: 'optimal', condition: 'All challenges correct', result: 'Efficient multi-agent workflow designed', explanation: 'You leveraged agent specializations and maintained context continuity.' },
        { id: 'suboptimal', condition: 'Any incorrect', result: 'Inefficient or context-losing workflow', explanation: 'Review agent capabilities and context transfer mechanisms.' }
      ],
      conceptId: 'client-coding-agents',
      difficulty: 'advanced',
      estimatedTime: '10 minutes',
      learningOutcomes: ['Match agents to task types', 'Design context handoff strategies', 'Orchestrate multi-agent workflows']
    },
    explanation: 'Combines understanding of different CLI coding agents with workflow design and context management.',
    relatedConcepts: ['workflow-orchestration', 'context-management', 'agent-specialization'],
    successCriteria: ['Optimal agent-task matching', 'Effective context handoff planned']
  },
  // Agent Skills SCL
  {
    id: 'scl-skill-ecosystem-design',
    type: 'scenario',
    conceptId: 'agent-skills',
    title: 'Designing a Secure Enterprise Skill Ecosystem',
    level: 'advanced',
    scenario: {
      id: 'skill-ecosystem-scl',
      title: 'Enterprise Skill Governance',
      description: 'Design the governance structure for a corporate skill repository that balances innovation with security.',
      context: 'Your organization wants to enable teams to create and share skills internally, but recent security concerns require a review process. Currently 50+ skills exist with no formal governance.',
      stakeholders: ['security-team', 'platform-team', 'skill-authors', 'end-users'],
      challenges: [
        {
          id: 'skill-review-process',
          title: 'Skill Review Process',
          description: 'Design the approval workflow for new skills.',
          question: 'What review process balances security with author friction?',
          type: 'multiple-choice',
          options: [
            'No review - trust all internal authors',
            'Automated scanning plus security team review for skills with tool invocations or external references',
            'Full security team review for every skill regardless of content',
            'Block all new skills until a perfect review system exists'
          ],
          correctAnswer: 1,
          feedback: 'Risk-based review focuses security resources on high-risk skills while allowing low-risk skills to move quickly through automated checks.',
          hints: ['What makes a skill high-risk?', 'How do you scale security review?']
        },
        {
          id: 'progressive-disclosure-enforcement',
          title: 'Context Efficiency Enforcement',
          description: 'Ensure skills follow progressive disclosure patterns.',
          question: 'How should you enforce context-efficient skill design?',
          type: 'multiple-choice',
          options: [
            'Let authors decide their own structure',
            'Linting rules that validate SKILL.md size limits and reference structure, plus templates',
            'Reject any skill over 500 tokens',
            'Manual review of every skill for context efficiency'
          ],
          correctAnswer: 1,
          feedback: 'Automated linting catches common issues while templates guide authors toward good patterns. Arbitrary size limits may reject valid complex skills.',
          hints: ['How do you scale design review?', 'What patterns should be enforced?']
        }
      ],
      outcomes: [
        { id: 'optimal', condition: 'All challenges correct', result: 'Balanced ecosystem governance designed', explanation: 'Your approach enables innovation while maintaining security and quality.' },
        { id: 'suboptimal', condition: 'Any incorrect', result: 'Governance gaps or excessive friction', explanation: 'Review how to balance security, quality, and author experience.' }
      ],
      conceptId: 'agent-skills',
      difficulty: 'advanced',
      estimatedTime: '12 minutes',
      learningOutcomes: ['Design risk-based review processes', 'Automate quality enforcement', 'Balance security with developer experience']
    },
    explanation: 'Combines skill security concepts with progressive disclosure patterns and enterprise governance requirements.',
    relatedConcepts: ['skill-security', 'progressive-disclosure', 'governance'],
    successCriteria: ['Risk-based review designed', 'Automated enforcement planned']
  },
  // Agent Red Teaming SCL
  {
    id: 'scl-red-team-pipeline-integration',
    type: 'scenario',
    conceptId: 'agent-red-teaming',
    title: 'Integrating Red Teaming into CI/CD Pipeline',
    level: 'advanced',
    scenario: {
      id: 'red-team-cicd-scl',
      title: 'Continuous Security Testing Pipeline',
      description: 'Design a red teaming integration that runs automatically on every deployment while balancing test coverage with pipeline speed.',
      context: 'Your team deploys daily. Full PyRIT attack suite takes 2 hours. PR builds need to complete in 15 minutes. Production requires comprehensive testing.',
      stakeholders: ['security-team', 'devops', 'developers', 'product-manager'],
      challenges: [
        {
          id: 'tiered-testing-strategy',
          title: 'Tiered Testing Strategy',
          description: 'Design appropriate test scopes for different pipeline stages.',
          question: 'How should you tier red team testing across pipeline stages?',
          type: 'multiple-choice',
          options: [
            'Run full suite on every PR to catch issues early',
            'Smoke tests on PRs (5 min), core attacks on main merge (30 min), full suite nightly',
            'Only run full suite before production releases',
            'Skip automated testing and rely on periodic manual assessments'
          ],
          correctAnswer: 1,
          feedback: 'Tiered approach balances fast feedback with comprehensive coverage. PRs get quick validation, main branch gets deeper testing, and nightly runs catch subtle issues.',
          hints: ['What feedback speed do developers need?', 'What is the risk window between tests?']
        },
        {
          id: 'regression-detection',
          title: 'Regression Detection',
          description: 'Design alerting for security regressions.',
          question: 'How should you detect and respond to ASR regressions?',
          type: 'multiple-choice',
          options: [
            'Review metrics manually at quarterly security reviews',
            'Automated comparison to baseline with threshold alerts and automatic deployment blocking',
            'Only alert on 100% failure of safety tests',
            'Send weekly reports to security team for review'
          ],
          correctAnswer: 1,
          feedback: 'Automated comparison with deployment blocking creates a safety gate that prevents regressions from reaching production.',
          hints: ['How quickly must you catch regressions?', 'What action should trigger from alerts?']
        }
      ],
      outcomes: [
        { id: 'optimal', condition: 'All challenges correct', result: 'Robust continuous red teaming pipeline designed', explanation: 'Your approach provides fast feedback while maintaining security gates.' },
        { id: 'suboptimal', condition: 'Any incorrect', result: 'Coverage gaps or pipeline bottlenecks', explanation: 'Review how to balance speed with security coverage.' }
      ],
      conceptId: 'agent-red-teaming',
      difficulty: 'advanced',
      estimatedTime: '14 minutes',
      learningOutcomes: ['Design tiered testing strategies', 'Implement automated regression detection', 'Balance speed with coverage']
    },
    explanation: 'Combines red teaming concepts with DevOps practices to create practical continuous security testing.',
    relatedConcepts: ['ci-cd-integration', 'asr-monitoring', 'deployment-gates'],
    successCriteria: ['Tiered strategy designed', 'Automated regression detection planned']
  }
];
