// Structured AI Skills taxonomy for Phase 1 navigation refactor.
// Provides categories and module metadata to render sequential sections instead of tab sprawl.

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  moduleIds: string[]; // ordered
}

export interface SkillModuleMeta {
  id: string;
  title: string;
  summary?: string;
  category: string; // category id reference
  order?: number;
  keywords?: string[];
}

// Category ordering defines page section order
export const skillCategories: SkillCategory[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Core mental models & baseline visual literacy',
    moduleIds: ['fundamentals','thinking-modes','interactive-visualizations']
  },
  {
    id: 'build',
    title: 'Build Acceleration',
    description: 'Understanding code & shipping faster with confidence',
    moduleIds: ['code-understanding','development-velocity']
  },
  {
    id: 'operate',
    title: 'Operate & Quality',
    description: 'Observe, evaluate, and continuously refine agents',
    moduleIds: ['observability','promptops']
  },
  {
    id: 'govern-optimize',
    title: 'Govern & Optimize',
    description: 'Risk, safety, performance economics & compliance',
    moduleIds: ['safety','cost-perf','security-data-boundaries']
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent & Retrieval',
    description: 'Coordination, orchestration, and knowledge grounding',
    moduleIds: ['rag-systems','multi-agent-orchestration']
  },
  {
    id: 'strategy-future',
    title: 'Strategy & Future States',
    description: 'Org design, emerging patterns, and frontier readiness',
    moduleIds: ['org-playbooks','frontier-firm-assessment','novel-organizational-patterns','future-state-trends']
  }
];

// Flat module metadata (progress mapping uses these ids)
export const skillModules: SkillModuleMeta[] = [
  { id: 'fundamentals', title: 'Fundamentals', category: 'foundations' },
  { id: 'thinking-modes', title: 'Thinking Modes', category: 'foundations' },
  { id: 'interactive-visualizations', title: 'Interactive Visualizations', category: 'foundations' },
  { id: 'code-understanding', title: 'Code Understanding', category: 'build' },
  { id: 'development-velocity', title: 'Development Velocity', category: 'build' },
  { id: 'observability', title: 'Observability & EvalOps', category: 'operate' },
  { id: 'promptops', title: 'PromptOps & Tooling', category: 'operate' },
  { id: 'safety', title: 'Safety & Governance', category: 'govern-optimize' },
  { id: 'cost-perf', title: 'Cost & Performance', category: 'govern-optimize' },
  { id: 'security-data-boundaries', title: 'Security & Data Boundaries', category: 'govern-optimize' },
  { id: 'rag-systems', title: 'RAG Systems', category: 'multi-agent' },
  { id: 'multi-agent-orchestration', title: 'Multi-Agent Orchestration', category: 'multi-agent' },
  { id: 'org-playbooks', title: 'Org Playbooks', category: 'strategy-future' },
  { id: 'frontier-firm-assessment', title: 'Frontier Firm Assessment', category: 'strategy-future' },
  { id: 'novel-organizational-patterns', title: 'Novel Organizational Patterns', category: 'strategy-future' },
  { id: 'future-state-trends', title: 'Future State Trends', category: 'strategy-future' }
];

export const moduleIdSet = new Set(skillModules.map(m => m.id));
