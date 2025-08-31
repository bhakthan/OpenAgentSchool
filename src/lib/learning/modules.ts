export type CurriculumModule = {
  id: import('./progressStore').ModuleId;
  title: string;
  short: string;
};

export const curriculumModules: CurriculumModule[] = [
  { id: 'observability-evalops', title: 'Agent Observability & EvalOps', short: 'Observability' },
  { id: 'safety-governance', title: 'Safety, Risk & Governance', short: 'Safety' },
  { id: 'promptops-tooling', title: 'PromptOps & Tooling', short: 'PromptOps' },
  { id: 'cost-performance', title: 'Cost & Performance Engineering', short: 'Cost' },
  { id: 'security-data-boundaries', title: 'Agent Security & Data Boundaries', short: 'Security' },
  { id: 'ai-product-management', title: 'AI Product Management', short: 'AI PM' },
  { id: 'hitl-operations', title: 'Human‑in‑the‑Loop Operations', short: 'HITL' },
  { id: 'knowledge-rag', title: 'Knowledge & RAG Systems', short: 'RAG' },
  { id: 'multi-agent-orchestration', title: 'Multi‑Agent Orchestration Patterns', short: 'Orchestration' },
  { id: 'org-change-playbooks', title: 'Organizational Change Playbooks', short: 'Playbooks' },
];
