import { PatternData } from './types';
import { PolicyGatedInvocationVisual } from '@/components/visualization/business-use-cases/PolicyGatedInvocationVisual';

// Pattern: Policy-Gated Tool Invocation
// Purpose: Prevent unsafe / non-compliant tool or API usage by inserting an intent → capability → risk → policy
// evaluation layer before execution. Complements Action Grounding (Pattern 4) by focusing specifically on runtime tool gatekeeping.

export const policyGatedInvocationPattern: PatternData = {
  id: 'policy-gated-tool-invocation',
  name: 'Policy-Gated Tool Invocation',
  description: 'Mediates tool/API calls through intent parsing, capability mapping, risk scoring, and policy lattice evaluation before signed execution.',
  category: 'Data Autonomy',
  relatedPatterns: ['action-grounding-verification', 'budget-constrained-execution', 'perception-normalization'],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 days',
    complexityReduction: 'High - Eliminates manual approval workflows for tool invocations, reduces risk via automated policy evaluation',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Security pattern for enterprise integrations, API orchestration, multi-tenant SaaS, regulated industries',
      'Architecture Templates - Azure Policy + Microsoft Agent Framework provide intent parsing and policy lattice evaluation',
      'Failure Scenario Libraries - Policy false positives, capability mapping errors, risk scoring edge cases documented',
      'Evaluation Automation - Policy enforcement accuracy, false positive/negative rates, approval latency metrics standard'
    ]
  },

  businessUseCase: {
    industry: 'Enterprise Integrations',
    description: 'Before an agent calls a downstream CRM bulk update API, the invocation request is parsed, mapped to allowed capability surfaces, risk scored, evaluated through policy lattice, and only then signed for execution.',
    visualization: PolicyGatedInvocationVisual,
    enlightenMePrompt: 'Explain how layered risk scoring reduces false positives in a policy‑gated invocation system.'
  },
  nodes: [
    { id: 'intent', type: 'input', data: { label: 'Intent', nodeType: 'input' }, position: { x: 60, y: 180 } },
    { id: 'map', type: 'default', data: { label: 'Capability Map', nodeType: 'planner' }, position: { x: 240, y: 140 } },
    { id: 'risk', type: 'default', data: { label: 'Risk Scoring', nodeType: 'evaluator' }, position: { x: 240, y: 240 } },
    { id: 'policy', type: 'default', data: { label: 'Policy Lattice', nodeType: 'evaluator' }, position: { x: 460, y: 180 } },
    { id: 'sign', type: 'default', data: { label: 'Sign & Log', nodeType: 'tool' }, position: { x: 680, y: 180 } },
    { id: 'exec', type: 'output', data: { label: 'Approved Call', nodeType: 'output' }, position: { x: 900, y: 180 } }
  ],
  edges: [
    { id: 'p1', source: 'intent', target: 'map', animated: true },
    { id: 'p2', source: 'intent', target: 'risk', animated: true },
    { id: 'p3', source: 'map', target: 'policy', animated: true },
    { id: 'p4', source: 'risk', target: 'policy', animated: true },
    { id: 'p5', source: 'policy', target: 'sign', animated: true },
    { id: 'p6', source: 'sign', target: 'exec', animated: true },
    { id: 'p7', source: 'policy', target: 'map', label: 'Refine', animated: true }
  ],
  useCases: [
    'Prevent over-broad data export API calls',
    'Throttle high-risk mutation operations',
    'Enforce per-tenant capability restrictions'
  ],
  whenToUse: 'Use whenever agent tool invocations must respect governance, rate limits, or scoped capability boundaries.',
  advantages: [
    'Reduces unsafe or over-broad actions',
    'Provides auditable decision trace',
    'Supports adaptive risk thresholds'
  ],
  limitations: [
    'Adds latency to invocation path',
    'Complex policy lattice authoring',
    'Requires consistent capability taxonomy'
  ],
  implementation: [
    'Step 1: Parse intent & extract structured action candidates.',
    'Step 2: Map to canonical capability surfaces (CRUD, bulk_update, export).',
    'Step 3: Compute risk score (scope size, sensitivity tags, historical error rate).',
    'Step 4: Evaluate policy lattice (allow/deny/escalate).',
    'Step 5: Sign approved call with hash + context snapshot.',
    'Step 6: Emit telemetry + structured log for audit.'
  ],
  codeExample: `// TypeScript policy-gated invocation skeleton\ninterface Invocation { intent: string; params: any; capability?: string; risk?: number; allowed?: boolean; }\ninterface PolicyDecision { allowed: boolean; reason: string; escalate?: boolean; }\n\nexport async function gateInvocation(raw: Invocation, taxonomy: any, riskFn: any, lattice: any, signer: any): Promise<Invocation> {\n  raw.capability = taxonomy.map(raw.intent, raw.params);\n  raw.risk = riskFn.score(raw.capability, raw.params);\n  const decision: PolicyDecision = lattice.evaluate({ capability: raw.capability, risk: raw.risk });\n  if (!decision.allowed) return { ...raw, allowed: false };\n  const signature = signer.sign({ cap: raw.capability, params: raw.params, ts: Date.now() });\n  return { ...raw, allowed: true, params: { ...raw.params, __sig: signature } };\n}\n`,
  pythonCodeExample: `# Python policy-gated invocation skeleton\ndef gate_invocation(raw, taxonomy, risk_fn, lattice, signer):\n    raw['capability'] = taxonomy.map(raw['intent'], raw.get('params'))\n    raw['risk'] = risk_fn.score(raw['capability'], raw.get('params'))\n    decision = lattice.evaluate({'capability': raw['capability'], 'risk': raw['risk']})\n    if not decision['allowed']:\n        raw['allowed'] = False\n        return raw\n    signature = signer.sign({'cap': raw['capability'], 'params': raw.get('params'), 'ts': __import__('time').time()})\n    raw['allowed'] = True\n    raw['params']['__sig'] = signature\n    return raw\n`,
  completeCode: ''
};
