import { PatternData } from './types';
import { DataQualityRepairVisual } from '@/components/visualization/business-use-cases/DataQualityRepairVisual';

export const dataQualityFeedbackLoopPattern: PatternData = {
  id: 'data-quality-feedback-repair-loop',
  name: 'Data Quality Feedback & Repair Loop',
  description: 'Closed-loop anomaly detection → profiling → candidate repair → validation cycle to restore data reliability.',
  category: 'Data Autonomy',
  relatedPatterns: ['perception-normalization', 'action-grounding-verification', 'budget-constrained-execution'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '1-2 weeks',
    complexityReduction: 'Medium - Automates data quality repair workflows but requires domain-specific profiling and validation logic',
    reusabilityScore: 7,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Data quality pattern for supply chain analytics, ETL pipelines, data warehouse maintenance',
      'Architecture Templates - Azure Data Factory + Azure OpenAI provide anomaly detection and repair strategy generation',
      'Failure Scenario Libraries - False positive repairs, downstream KPI impact, validation failures documented',
      'Evaluation Automation - Anomaly detection precision/recall, repair strategy success rate, data quality improvement metrics'
    ]
  },

  businessUseCase: {
    industry: 'Supply Chain Analytics',
    description: 'Daily inbound SKU feed develops spike in null weights. Loop detects anomaly, profiles impacted columns, synthesizes conditional fill strategy, validates downstream KPI stability, and records repair artifact.',
    visualization: DataQualityRepairVisual,
    enlightenMePrompt: 'Describe how targeted profiling reduces cost in a data quality repair loop.'
  },
  nodes: [
    { id: 'monitor', type: 'input', data: { label: 'Metric Monitor', nodeType: 'input' }, position: { x: 60, y: 180 } },
    { id: 'detect', type: 'default', data: { label: 'Anomaly Detect', nodeType: 'evaluator' }, position: { x: 240, y: 140 } },
    { id: 'profile', type: 'default', data: { label: 'Targeted Profiling', nodeType: 'tool' }, position: { x: 240, y: 240 } },
    { id: 'propose', type: 'default', data: { label: 'Repair Proposer', nodeType: 'planner' }, position: { x: 460, y: 180 } },
    { id: 'ground', type: 'default', data: { label: 'Ground & Verify', nodeType: 'evaluator' }, position: { x: 680, y: 180 } },
    { id: 'validate', type: 'default', data: { label: 'Post-Fix Validate', nodeType: 'evaluator' }, position: { x: 900, y: 180 } },
    { id: 'stable', type: 'output', data: { label: 'Stabilized KPI', nodeType: 'output' }, position: { x: 1120, y: 180 } }
  ],
  edges: [
    { id: 'd1', source: 'monitor', target: 'detect', animated: true },
    { id: 'd2', source: 'detect', target: 'profile', animated: true },
    { id: 'd3', source: 'profile', target: 'propose', animated: true },
    { id: 'd4', source: 'propose', target: 'ground', animated: true },
    { id: 'd5', source: 'ground', target: 'validate', animated: true },
    { id: 'd6', source: 'validate', target: 'monitor', label: 'Re-evaluate', animated: true },
    { id: 'd7', source: 'validate', target: 'stable', animated: true }
  ],
  useCases: [
    'Detect and repair sudden null / outlier spikes',
    'Auto-mitigate schema drift impacts',
    'Stabilize SLA dashboards with minimal latency'
  ],
  whenToUse: 'Use when production analytical pipelines require autonomous resilience against data quality regressions.',
  advantages: [
    'Minimizes manual firefighting',
    'Focuses profiling on impacted segments',
    'Creates auditable repair artifacts'
  ],
  limitations: [
    'Risk of incorrect automated fixes',
    'Requires robust anomaly detection baselines',
    'May oscillate if validation thresholds unstable'
  ],
  implementation: [
    'Step 1: Continuously monitor KPIs & quality metrics (null %, freshness, distribution drift).',
    'Step 2: On anomaly, localize impacted columns/entities.',
    'Step 3: Perform targeted deep profiling (sample expansion, conditional segment analysis).',
    'Step 4: Propose repair candidates (imputation, rollback, conditional transformation).',
    'Step 5: Ground & verify repair (Pattern 4) in sandbox.',
    'Step 6: Validate post-fix metrics; loop until stability or max iterations.'
  ],
  codeExample: `// TypeScript quality loop skeleton\ninterface Anomaly { metric: string; severity: number; columns: string[]; }\ninterface Repair { id: string; code: string; score: number; }\n\nexport async function qualityLoop(detector: any, profiler: any, proposer: any, ground: any, validate: any) {\n  const anomaly: Anomaly | null = await detector.next();\n  if (!anomaly) return 'no-op';\n  const deep = await profiler.profile(anomaly.columns, { mode: 'targeted' });\n  const repairs: Repair[] = await proposer.generate(deep);\n  for (const r of repairs.slice(0,3)) {\n    const grounded = await ground(r.code);\n    if (!grounded.valid) continue;\n    const ok = await validate(grounded);\n    if (ok.stable) return { applied: r.id };\n  }\n  return { status: 'unresolved' };\n}\n`,
  pythonCodeExample: `# Python quality loop skeleton\ndef quality_loop(detector, profiler, proposer, ground, validate):\n    anomaly = detector.next()\n    if not anomaly:\n        return 'no-op'\n    deep = profiler.profile(anomaly['columns'], mode='targeted')\n    repairs = proposer.generate(deep)\n    for r in repairs[:3]:\n        grounded = ground(r['code'])\n        if not grounded['valid']:\n            continue\n        ok = validate(grounded)\n        if ok.get('stable'):\n            return {'applied': r['id']}\n    return {'status': 'unresolved'}\n`,
  completeCode: ''
};
