import { PatternData } from './types';
import { StrategyMemoryReplayVisual } from '@/components/visualization/business-use-cases/StrategyMemoryReplayVisual';

export const strategyMemoryReplayPattern: PatternData = {
  id: 'strategy-memory-replay',
  name: 'Strategy Memory Replay',
  description: 'Retrieves & adapts historical execution strategies to guide current decomposition & execution for efficiency.',
  category: 'Data Autonomy',
  relatedPatterns: ['schema-aware-decomposition', 'budget-constrained-execution', 'perception-normalization'],
  businessUseCase: {
    industry: 'Financial Research Automation',
    description: 'Recurring VaR anomaly investigations reuse prior validated feature extraction + residual diagnostics strategy, accelerating new case turnaround and lowering token cost.',
    visualization: StrategyMemoryReplayVisual,
    enlightenMePrompt: 'Explain how strategy similarity embedding improves replay relevance.'
  },
  nodes: [
    { id: 'task', type: 'input', data: { label: 'Task Signature', nodeType: 'input' }, position: { x: 60, y: 180 } },
    { id: 'retrieve', type: 'default', data: { label: 'Strategy Retrieve', nodeType: 'tool' }, position: { x: 260, y: 120 } },
    { id: 'embed', type: 'default', data: { label: 'Similarity Embed', nodeType: 'evaluator' }, position: { x: 260, y: 240 } },
    { id: 'adapt', type: 'default', data: { label: 'Adapt & Merge', nodeType: 'planner' }, position: { x: 480, y: 180 } },
    { id: 'score', type: 'default', data: { label: 'Score & Select', nodeType: 'evaluator' }, position: { x: 700, y: 180 } },
    { id: 'output', type: 'output', data: { label: 'Replay Strategy', nodeType: 'output' }, position: { x: 920, y: 180 } }
  ],
  edges: [
    { id: 's1', source: 'task', target: 'retrieve', animated: true },
    { id: 's2', source: 'task', target: 'embed', animated: true },
    { id: 's3', source: 'retrieve', target: 'adapt', animated: true },
    { id: 's4', source: 'embed', target: 'adapt', animated: true },
    { id: 's5', source: 'adapt', target: 'score', animated: true },
    { id: 's6', source: 'score', target: 'output', animated: true },
    { id: 's7', source: 'score', target: 'retrieve', label: 'Explore', animated: true }
  ],
  useCases: [
    'Accelerate recurring analytical investigations',
    'Reduce cost of plan generation for similar tasks',
    'Improve consistency of remediation playbooks'
  ],
  whenToUse: 'Use when tasks exhibit structural recurrence and prior strategies are auditable.',
  advantages: [
    'Lowers token & latency cost',
    'Improves plan quality via proven patterns',
    'Enables meta-learning without fine-tuning'
  ],
  limitations: [
    'Cold start (no history)',
    'Risk of stale strategy reuse',
    'Requires embedding + storage infra'
  ],
  implementation: [
    'Step 1: Compute task signature embedding (intent + entities + constraints).',
    'Step 2: Retrieve top-k prior strategies (plan graphs + metrics).',
    'Step 3: Adapt by merging overlapping subgraphs & mutating outdated nodes.',
    'Step 4: Score candidates (coverage uplift, cost reduction estimate).',
    'Step 5: Select replay strategy & annotate provenance for traceability.'
  ],
  codeExample: `// TypeScript strategy memory replay skeleton\ninterface Strategy { id: string; plan: any; metrics: { coverage: number; cost: number }; }\n\nexport async function replayStrategy(task: string, embed: any, store: any, scorer: any): Promise<Strategy | null> {\n  const sig = embed.vector(task);\n  const prior: Strategy[] = await store.similar(sig, { k: 5 });\n  if (!prior.length) return null;\n  const adapted = prior.map(p => ({ ...p, plan: mutate(p.plan, task) }));\n  return scorer.best(adapted);\n}\nfunction mutate(plan: any, task: string) { /* domain-specific merge/mutation */ return plan; }\n`,
  pythonCodeExample: `# Python strategy memory replay skeleton\ndef replay_strategy(task, embed, store, scorer):\n    sig = embed.vector(task)\n    prior = store.similar(sig, k=5)\n    if not prior:\n        return None\n    adapted = []\n    for p in prior:\n        p['plan'] = mutate(p['plan'], task)\n        adapted.append(p)\n    return scorer.best(adapted)\n\ndef mutate(plan, task):\n    return plan\n`,
  completeCode: ''
};
