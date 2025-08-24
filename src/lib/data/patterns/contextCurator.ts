import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import { SupportRouterVisual } from '@/components/visualization/business-use-cases/SupportRouterVisual';

export const contextCuratorPattern: PatternData = {
  id: 'context-curator',
  name: 'Context Curator',
  description: 'Selects only the most relevant docs/examples for a task and trims noise to reduce search churn.',
  category: 'Education',
  useCases: ['Doc triage', 'API example curation', 'Repo onboarding'],
  whenToUse: 'Use when learners drown in docs or hallucinate APIs. Ideal before deep implementation work.',
  nodes: [
    { id: 'task', type: 'input', data: { label: 'Task + Corpus', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'retriever', type: 'default', data: { label: 'Retriever + Ranker', nodeType: 'tool' }, position: { x: 320, y: 100 } },
    { id: 'curator', type: 'default', data: { label: 'Curator (LLM)', nodeType: 'llm' }, position: { x: 620, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Top 5 Artifacts + Why', nodeType: 'output' }, position: { x: 920, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'task', target: 'retriever', animated: true },
    { id: 'e2', source: 'retriever', target: 'curator', animated: true },
    { id: 'e3', source: 'curator', target: 'output', animated: true },
  ],
  implementation: [
    'Parse task to derive key signals (APIs, frameworks, versions)',
    'Retrieve candidates from repo/docs; score and de-duplicate',
    'Ask LLM to pick top 5 with a one-line "why" for each',
    'Return links/snippets + rationale to guide first pass',
  ],
  advantages: ['Cuts noise', 'Accelerates first pass', 'Reduces hallucination risk'],
  limitations: ['Retriever quality sensitive', 'Outdated docs risk'],
  relatedPatterns: ['Agentic RAG', 'Modern Tool Use'],
  businessUseCase: {
    industry: 'EdTech',
    description: 'LMS and internal enablement portals use Context Curator to present only the top 3–5 relevant documents, code examples, and policy excerpts for a learner’s task. This reduces onboarding time for new engineers and improves compliance learning by removing noise and focusing attention on authoritative sources.',
    visualization: SupportRouterVisual,
    enlightenMePrompt: `Design a "Context Curator" microservice for an enterprise learning portal.

Include:
- Retrieval strategy (BM25 + semantic rerank) and deduplication rules
- Trust scoring (freshness, source authority, policy tags)
- Prompting template that asks the LLM to pick top-5 artifacts with one-line rationale each
- Telemetry: clickthrough, dwell time, downstream success
- Guardrails: block low-trust or outdated content; log rationale for audit
Provide a concise architecture diagram and a TypeScript interface for the core curate(task, corpus) API.`
  },
  codeExample: `// Curate 5 artifacts (TypeScript)
type Artifact = { title: string; url: string; why: string };
export async function curate(task: string, corpus: string[]): Promise<Artifact[]> {
  const candidates = corpus.slice(0, 20); // placeholder retrieval
  const ranked = candidates.slice(0, 5);
  return ranked.map((c, i) => ({ title: 'Doc ' + (i+1), url: c, why: 'Relevant to key API in task.' }));
}
`,
  pythonCodeExample: `# Curate 5 artifacts (Python)
from typing import List, Dict
def curate(task: str, corpus: List[str]) -> List[Dict[str, str]]:
    candidates = corpus[:20]
    ranked = candidates[:5]
    return [{ 'title': f'Doc {i+1}', 'url': url, 'why': 'Relevant to key API in task.' } for i, url in enumerate(ranked)]
`,
};
