import type { ModuleId } from './progressStore';

export interface VisualMapSection {
  title: string;
  items: string[];
}

export interface AssessmentContent {
  passThreshold: number; // percentage 0-100
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
  }>;
  feedback?: { pass?: string; fail?: string };
}

export interface ModuleContent {
  outcomes: string[];
  visualMap: VisualMapSection[];
  assessment: AssessmentContent;
}

export const moduleContent: Record<ModuleId, ModuleContent> = {
  'observability-evalops': {
    outcomes: [
      'Instrument agents with traces, spans, and structured logs.',
      'Define metrics for quality, cost, safety, and latency; set SLO/SLA targets.',
      'Build prompt tests and regression gates to prevent quality regressions.',
      'Operationalize runbooks for triage and rollback when incidents occur.'
    ],
    visualMap: [
      { title: 'Signals', items: ['Traces & Spans', 'Structured Logs', 'Metrics (Q/C/S/L)', 'User Feedback'] },
      { title: 'EvalOps', items: ['Prompt Tests', 'Golden Datasets', 'Regression Gates', 'Dashboards & Alerts'] },
      { title: 'Runbooks', items: ['Triage Flow', 'Rollback/Disable', 'Incident Review', 'Postmortems'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: {
        pass: 'Great! You’re ready to wire dashboards and alerts to your agents.',
        fail: 'Revisit signals vs outcomes, and how regression gates block bad releases.'
      },
      questions: [
        { id: 'obs-q1', text: 'Which set best covers core agent signals?', options: ['Colors, Fonts, Icons', 'Traces, Logs, Metrics', 'Commits, Branches, Tags'], correctIndex: 1 },
        { id: 'obs-q2', text: 'A regression gate should fire when…', options: ['Latency increases slightly', 'Eval score drops below threshold vs baseline', 'UI theme changes'], correctIndex: 1 },
        { id: 'obs-q3', text: 'Golden datasets are used primarily for…', options: ['Branding', 'Stable evals across versions', 'Increasing token counts'], correctIndex: 1 },
        { id: 'obs-q4', text: 'Runbooks help you…', options: ['Scale CSS animations', 'Standardize triage and rollback', 'Pick icon packs'], correctIndex: 1 },
        { id: 'obs-q5', text: 'Quality metric that captures correctness vs reference is…', options: ['BLEU/ROUGE/BERTScore', 'Hex code count', 'Repo size'], correctIndex: 0 },
      ]
    }
  },
  'safety-governance': {
    outcomes: [
      'Create red team plans to probe jailbreaks and unsafe outputs.',
      'Define content policy layers and review workflows.',
      'Measure resilience with attack suites and safety evals.',
      'Implement escalation/appeals paths for disputed decisions.'
    ],
    visualMap: [
      { title: 'Testing', items: ['Red Teaming', 'Adversarial Prompts', 'Attack Suites'] },
      { title: 'Controls', items: ['Policies', 'Guardrails', 'Review Workflows'] },
      { title: 'Operations', items: ['Escalation', 'Appeals', 'Audit Logs'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'Solid grasp of safety ops.', fail: 'Review red teaming and governance workflows.' },
      questions: [
        { id: 'saf-q1', text: 'Red teaming primarily helps you…', options: ['Improve branding', 'Uncover safety gaps and jailbreaks', 'Reduce build times'], correctIndex: 1 },
        { id: 'saf-q2', text: 'A content policy should…', options: ['Be undocumented', 'Define allowed/blocked categories with examples', 'Only apply in dev'], correctIndex: 1 },
        { id: 'saf-q3', text: 'Escalation paths are for…', options: ['UI color approvals', 'Handling sensitive or disputed cases', 'Selecting fonts'], correctIndex: 1 },
        { id: 'saf-q4', text: 'Safety evals are…', options: ['One-time exercises', 'Ongoing, versioned, and tracked', 'Optional for prod'], correctIndex: 1 },
        { id: 'saf-q5', text: 'Jailbreak resilience means…', options: ['Short prompts only', 'Model resists policy bypass attempts', 'No logs'], correctIndex: 1 },
      ]
    }
  },
  'promptops-tooling': {
    outcomes: [
      'Organize prompts in repos with versioning and reviews.',
      'Use canaries and A/B to test changes safely in prod.',
      'Integrate guardrails and golden datasets into CI.',
      'Track lineage from prompt versions to outcomes.'
    ],
    visualMap: [
      { title: 'Lifecycle', items: ['Repo & Versioning', 'Reviews', 'CI/CD'] },
      { title: 'Testing', items: ['Canary Prompts', 'A/B Experiments', 'Golden Datasets'] },
      { title: 'Controls', items: ['Guardrails', 'Policy Checks'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'PromptOps foundation is strong.', fail: 'Brush up on canary/A-B and repo hygiene.' },
      questions: [
        { id: 'pro-q1', text: 'A canary prompt is used to…', options: ['Test changes on a small slice', 'Change UI color', 'Speed up CSS'], correctIndex: 0 },
        { id: 'pro-q2', text: 'Prompt repos should include…', options: ['Random images', 'Versioning, reviews, metadata', 'Only binaries'], correctIndex: 1 },
        { id: 'pro-q3', text: 'Golden datasets in CI enable…', options: ['Faster font rendering', 'Automated regression detection', 'Bigger token windows only'], correctIndex: 1 },
        { id: 'pro-q4', text: 'Guardrails are…', options: ['Lint rules for CSS', 'Runtime checks on inputs/outputs', 'Git hooks only'], correctIndex: 1 },
        { id: 'pro-q5', text: 'A/B helps you…', options: ['Compare variants with metrics', 'Pick brand colors', 'Reduce npm size'], correctIndex: 0 },
      ]
    }
  },
  'cost-performance': {
    outcomes: [
      'Set latency/throughput budgets and track them against SLAs.',
      'Use caching, truncation, and batching to reduce costs.',
      'Design RAG and tool calls with cost controls and backoffs.',
      'Balance quality vs cost with empirical measurements.'
    ],
    visualMap: [
      { title: 'Budgets', items: ['Latency', 'Throughput', 'SLA Targets'] },
      { title: 'Levers', items: ['Caching', 'Truncation', 'Batching', 'Streaming'] },
      { title: 'Controls', items: ['Retries/Backoff', 'Circuit Breakers', 'RAG Cost Caps'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'On track for efficient agents.', fail: 'Revisit levers like caching and truncation.' },
      questions: [
        { id: 'cpe-q1', text: 'Caching primarily reduces…', options: ['Latency and cost', 'Font size', 'Branch count'], correctIndex: 0 },
        { id: 'cpe-q2', text: 'Throughput budget ties to…', options: ['Requests/sec', 'Button colors', 'File size'], correctIndex: 0 },
        { id: 'cpe-q3', text: 'Truncation helps when…', options: ['Tokens are expensive and long', 'Too many CSS files', 'Logs are short'], correctIndex: 0 },
        { id: 'cpe-q4', text: 'A cost control for RAG is…', options: ['Chunk caps and retrieval threshold', 'Bigger images', 'More emojis'], correctIndex: 0 },
        { id: 'cpe-q5', text: 'Circuit breakers…', options: ['Stop calling failing dependencies', 'Choose fonts', 'Style tabs'], correctIndex: 0 },
      ]
    }
  },
  'security-data-boundaries': {
    outcomes: [
      'Protect secrets and identities with least privilege.',
      'Implement row- or tenant-level data boundaries.',
      'Use isolation for tools and enforce policy at edges.',
      'Audit access and interactions end-to-end.'
    ],
    visualMap: [
      { title: 'Identity', items: ['Service Principals', 'Managed Identities', 'RBAC'] },
      { title: 'Boundaries', items: ['Row/Tenant-level Security', 'Network Segmentation', 'Policy Enforcement'] },
      { title: 'Audit', items: ['Access Logs', 'Tool Invocation Logs', 'PII Handling'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'Security fundamentals are solid.', fail: 'Focus on least privilege and row-level security.' },
      questions: [
        { id: 'sec-q1', text: 'Least privilege means…', options: ['Max permissions', 'Only what is necessary', 'Public access'], correctIndex: 1 },
        { id: 'sec-q2', text: 'Row-level security…', options: ['Hides certain rows per user/tenant', 'Changes fonts', 'Improves FPS'], correctIndex: 0 },
        { id: 'sec-q3', text: 'Managed identities help…', options: ['Avoid secret sprawl', 'Pick icons', 'Render images'], correctIndex: 0 },
        { id: 'sec-q4', text: 'Policy enforcement belongs…', options: ['At edges and tools', 'Only in UI', 'Only in git'], correctIndex: 0 },
        { id: 'sec-q5', text: 'Audit logs should include…', options: ['Access and tool calls', 'Only CSS diffs', 'Commit emojis'], correctIndex: 0 },
      ]
    }
  },
  'product-management': {
    outcomes: [
      'Frame problems and define success metrics tied to outcomes.',
      'Design experiments to reduce uncertainty.',
      'Align stakeholders and pace with risk.',
      'Translate insights into roadmap changes.'
    ],
    visualMap: [
      { title: 'Framing', items: ['Jobs-to-be-done', 'Personas', 'Use Cases'] },
      { title: 'Metrics', items: ['Success Criteria', 'North-star Metrics', 'Guardrail Metrics'] },
      { title: 'Experimentation', items: ['Hypotheses', 'Design', 'Analysis'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'Strong product foundations.', fail: 'Revisit framing and metric hygiene.' },
      questions: [
        { id: 'pm-q1', text: 'Good success metrics are…', options: ['Actionable and outcome-linked', 'Random and easy', 'Only vanity'], correctIndex: 0 },
        { id: 'pm-q2', text: 'Experiments should…', options: ['Reduce uncertainty with hypotheses', 'Confuse teams', 'Pick fonts'], correctIndex: 0 },
        { id: 'pm-q3', text: 'Stakeholder alignment requires…', options: ['Shared goals and cadence', 'Secret plans', 'Endless meetings'], correctIndex: 0 },
        { id: 'pm-q4', text: 'North-star metrics…', options: ['Guide long-term value', 'Choose colors', 'Compile CSS'], correctIndex: 0 },
        { id: 'pm-q5', text: 'Guardrail metrics…', options: ['Detect adverse effects', 'Decorate PRs', 'Animate logos'], correctIndex: 0 },
      ]
    }
  },
  'hitl-operations': {
    outcomes: [
      'Design approval and rollback loops with humans-in-the-loop.',
      'Define escalation paths and incident response.',
      'Measure error reduction vs added latency.',
      'Tune thresholds for human reviews.'
    ],
    visualMap: [
      { title: 'Loops', items: ['Pre-approval', 'Post-checks', 'Rollback'] },
      { title: 'Operations', items: ['Escalation', 'Incident Response', 'On-call'] },
      { title: 'Metrics', items: ['Error Rate', 'Latency Delta', 'Quality Uplift'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'HITL ready.', fail: 'Reinforce escalation and threshold design.' },
      questions: [
        { id: 'hitl-q1', text: 'HITL adds…', options: ['Human checks to reduce error', 'Color palettes', 'Token count'], correctIndex: 0 },
        { id: 'hitl-q2', text: 'Escalation is for…', options: ['Complicated or risky cases', 'Font pairing', 'Faster CSS'], correctIndex: 0 },
        { id: 'hitl-q3', text: 'A good threshold balances…', options: ['Error reduction vs latency', 'Brand vs icon', 'NPM size'], correctIndex: 0 },
        { id: 'hitl-q4', text: 'Rollback loops allow…', options: ['Quick disable of failing paths', 'More emojis', 'Bigger images'], correctIndex: 0 },
        { id: 'hitl-q5', text: 'On-call should include…', options: ['Clear playbooks and contacts', 'CSS grids', 'Font scales'], correctIndex: 0 },
      ]
    }
  },
  'knowledge-rag': {
    outcomes: [
      'Design chunking strategies and select embedding models.',
      'Evaluate retrieval/answer quality with graded evals.',
      'Ensure freshness and fallbacks when retrieval fails.',
      'Control cost with filters and thresholds.'
    ],
    visualMap: [
      { title: 'Ingest', items: ['Chunking', 'Embeddings', 'Indexing'] },
      { title: 'Query', items: ['Retrieval', 'Re-ranking', 'Answer Synthesis'] },
      { title: 'Quality', items: ['Graded Evals', 'Freshness', 'Fallbacks'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'RAG fundamentals in place.', fail: 'Revisit chunking and eval methods.' },
      questions: [
        { id: 'rag-q1', text: 'Chunking impacts…', options: ['Retrieval quality and cost', 'CSS sizes', 'Icon count'], correctIndex: 0 },
        { id: 'rag-q2', text: 'Freshness controls include…', options: ['TTL and recrawl policies', 'Border radius', 'Theme toggle'], correctIndex: 0 },
        { id: 'rag-q3', text: 'Fallbacks are for…', options: ['Handling empty/low-confidence retrieval', 'Choosing gradients', 'Bundling icons'], correctIndex: 0 },
        { id: 'rag-q4', text: 'Graded evals measure…', options: ['Answer correctness/relevance', 'Font weight', 'SVG size'], correctIndex: 0 },
        { id: 'rag-q5', text: 'Re-ranking helps…', options: ['Order candidates by relevance', 'Animate tabs', 'Speed up CSS'], correctIndex: 0 },
      ]
    }
  },
  'multi-agent-orchestration': {
    outcomes: [
      'Implement coordinator/worker and critique/debate patterns.',
      'Route tools effectively and contain errors.',
      'Measure success rate and API call budgets.',
      'Compare orchestration strategies under constraints.'
    ],
    visualMap: [
      { title: 'Patterns', items: ['Coordinator/Worker', 'Debate', 'Critique', 'Routers'] },
      { title: 'Controls', items: ['Budgets', 'Retries', 'Timeouts'] },
      { title: 'Metrics', items: ['Success Rate', 'Calls per Task', 'Latency'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'Good grip on orchestration.', fail: 'Review patterns and routing tradeoffs.' },
      questions: [
        { id: 'orc-q1', text: 'Coordinator/worker helps…', options: ['Parallelize sub-tasks', 'Pick fonts', 'Style images'], correctIndex: 0 },
        { id: 'orc-q2', text: 'Debate/critique can…', options: ['Improve answer quality', 'Change colors', 'Resize icons'], correctIndex: 0 },
        { id: 'orc-q3', text: 'Routers…', options: ['Select tools/agents based on context', 'Sort CSS files', 'Pick emojis'], correctIndex: 0 },
        { id: 'orc-q4', text: 'Call budgets control…', options: ['Max API calls per task', 'Brand tone', 'Viewport size'], correctIndex: 0 },
        { id: 'orc-q5', text: 'Timeouts prevent…', options: ['Hangs from slow steps', 'Color clashes', 'Big images'], correctIndex: 0 },
      ]
    }
  },
  'org-change-playbooks': {
    outcomes: [
      'Define roles and operating models for AI initiatives.',
      'Establish comms and rollout plans by stage.',
      'Track value realized and risks managed.',
      'Scale governance as adoption grows.'
    ],
    visualMap: [
      { title: 'Operating Model', items: ['Roles', 'Cadences', 'Guardrails'] },
      { title: 'Rollout', items: ['Starter', 'Growth', 'Enterprise'] },
      { title: 'Value & Risk', items: ['KPI Templates', 'Uplift Tracking', 'Risk Register'] },
    ],
    assessment: {
      passThreshold: 70,
      feedback: { pass: 'You can lead the rollout.', fail: 'Reinforce operating models and KPIs.' },
      questions: [
        { id: 'org-q1', text: 'Operating models define…', options: ['Roles and cadences', 'CSS grids', 'Icon packs'], correctIndex: 0 },
        { id: 'org-q2', text: 'Rollout phases should…', options: ['Stage guardrails and comms', 'Hide plans', 'Ignore risks'], correctIndex: 0 },
        { id: 'org-q3', text: 'Value tracking includes…', options: ['Quality uplift and cost per task', 'Font sizes', 'Icon margins'], correctIndex: 0 },
        { id: 'org-q4', text: 'Risk registers track…', options: ['Known risks and mitigations', 'Hex codes', 'SVG views'], correctIndex: 0 },
        { id: 'org-q5', text: 'Guardrails help…', options: ['Keep teams within safe bounds', 'Pick themes', 'Animate buttons'], correctIndex: 0 },
      ]
    }
  },
};
