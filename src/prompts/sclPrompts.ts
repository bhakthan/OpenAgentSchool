import type { SCLSession, SCLEffectNode, SCLSynthesis, SCLLeap } from '@/types/supercritical';

export const SCL_SYSTEM_FIRST_ORDER = `You are an expert systems analyst specializing in agentic AI effects analysis.

Your task is to generate first-order effects from AI agent implementations in production systems.

Focus on DIRECT, IMMEDIATE effects that happen within the first few weeks of deployment.

Consider these domains:
- ops: Operations, reliability, monitoring, incidents
- product: User experience, features, performance
- security: Authentication, authorization, data protection
- org: Team structure, processes, responsibilities  
- cost: Infrastructure, development, maintenance costs
- perf: Latency, throughput, resource utilization

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Return valid JSON with this structure:
{
  "effects": [
    {
      "id": "effect_1",
      "title": "Descriptive effect title",
      "order": 1,
      "domain": "ops|product|security|org|cost|perf",
      "likelihood": 0.0-1.0,
      "impact": -5 to +5,
      "justification": "Why this effect occurs",
      "confidence": 0.0-1.0
    }
  ],
  "connections": [],
  "leaps": []
}

Be specific, actionable, and grounded in real production experience.`;

export function buildSCL_USER_FIRST_ORDER(session: SCLSession, contextSummary: string): string {
  const seeds = session.seeds;
  const objectives = session.objectives.join(', ');
  const constraints = JSON.stringify(session.constraints);
  return `Analyze first-order effects for this agentic AI implementation:

CONCEPT SEEDS: ${seeds.conceptIds.join(', ')}
PATTERN SEEDS: ${seeds.patternIds.join(', ')} 
PRACTICE SEEDS: ${seeds.practices.join(', ')}

OBJECTIVES: ${objectives}
CONSTRAINTS: ${constraints}

CONTEXT SUMMARY:
${contextSummary}

Generate 3-5 first-order effects that would occur immediately when implementing these concepts/patterns in a production environment.

Focus on the most likely and impactful direct consequences.`;
}

export const SCL_SYSTEM_HIGHER_ORDER = `You are an expert systems analyst specializing in cascade effect analysis.

Given first-order effects from an AI agent implementation, generate the second and third-order effects that would follow.

SECOND-ORDER: Effects that happen 1-3 months later as a result of first-order effects
THIRD-ORDER: Effects that happen 3-12 months later as cascades stabilize

Also identify LEAPS - discontinuous changes where small inputs cause qualitative shifts.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Return valid JSON with this structure:
{
  "effects": [
    {
      "id": "effect_2_1", 
      "title": "Second-order effect title",
      "order": 2,
      "domain": "ops|product|security|org|cost|perf",
      "likelihood": 0.0-1.0,
      "impact": -5 to +5,
      "justification": "How this emerges from first-order effects",
      "confidence": 0.0-1.0
    }
  ],
  "connections": [
    {
      "from": "effect_1",
      "to": "effect_2_1", 
      "mechanism": "How effect_1 causes effect_2_1",
      "confidence": 0.0-1.0,
      "delay": "2-4 weeks"
    }
  ],
  "leaps": [
    {
      "trigger": "What causes the discontinuity",
      "threshold": "At what point it occurs", 
      "result": "What changes qualitatively",
      "mechanism": "Why the leap happens",
      "confidence": 0.0-1.0
    }
  ]
}

Look for emergent behaviors, feedback loops, and threshold effects.`;

export function buildSCL_USER_HIGHER_ORDER(session: SCLSession, firstOrderEffects: SCLEffectNode[]): string {
  const effectsDescription = firstOrderEffects.map(e => 
    `${e.id}: ${e.title} (${e.domain}, impact: ${e.impact})`
  ).join('\n');

  const modeGuidance = (() => {
    switch (session.mode) {
      case 'consolidate':
        return '- Focus on well-understood patterns and predictable cascades\n- High confidence, documented effects';
      case 'extrapolate':
        return '- Explore novel interactions and unexpected combinations\n- Include lower-confidence but high-impact possibilities';
      case 'stress-test':
        return '- Perturb constraints (budget/latency/accuracy) and show before/after deltas\n- Surface brittle links and saturation points';
      case 'intervene':
        return '- Propose 2-3 concrete levers (rate limit, caching, rollout) and compare downstream outcomes';
      case 'counterfactual':
        return '- Toggle key assumptions (memory on/off, tool use on/off) and highlight graph divergences';
      case 'leap-focus':
        return '- Emphasize threshold triggers and discontinuities; promote leaps and their prerequisites';
      case 'mechanism-audit':
        return '- Require mechanisms and delays for edges; flag weak/low-confidence links with audit notes';
      default:
        return '';
    }
  })();

  const extras = session.constraints?.extras ? `\nEXTRAS: ${JSON.stringify(session.constraints.extras)}` : '';

  return `Given these first-order effects from an agentic AI implementation:

${effectsDescription}

CONSTRAINTS: ${JSON.stringify(session.constraints)}
MODE: ${session.mode}
${extras}

Generate second and third-order effects that would cascade from these first-order effects.

For ${session.mode} mode:
${modeGuidance}

Also identify any LEAPS where threshold effects cause qualitative changes in system behavior.`;
}

export const SCL_SYSTEM_SYNTHESIS = `You are a strategic advisor synthesizing insights from a complex effect analysis.

Given a complete effect graph with first, second, and third-order effects plus identified leaps, generate actionable synthesis.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Return valid JSON with this structure:
{
  "risks": ["Risk 1", "Risk 2"],
  "opportunities": ["Opportunity 1", "Opportunity 2"], 
  "recommendedPractices": ["Practice 1", "Practice 2"],
  "kpis": ["KPI 1", "KPI 2"],
  "actionPlan": ["Action 1", "Action 2"],
  "implementationOrder": ["First priority", "Second priority"],
  "successMetrics": ["Metric 1", "Metric 2"]
}

Focus on:
- Actionable insights that teams can implement
- Measurable outcomes and KPIs
- Risk mitigation strategies
- Implementation roadmap with priorities`;

export function buildSCL_USER_SYNTHESIS(session: SCLSession, allEffects: SCLEffectNode[], leaps: SCLLeap[]): string {
  const effectsByOrder = {
    1: allEffects.filter(e => e.order === 1),
    2: allEffects.filter(e => e.order === 2), 
    3: allEffects.filter(e => e.order === 3)
  } as const;

  const leapsSummary = leaps.map(l => 
    `${l.trigger} → ${l.result} (confidence: ${l.confidence})`
  ).join('\n');

  return `Synthesize insights from this complete effect analysis:

FIRST-ORDER EFFECTS (${effectsByOrder[1].length}):
${effectsByOrder[1].map(e => `- ${e.title} (${e.domain}, impact: ${e.impact})`).join('\n')}

SECOND-ORDER EFFECTS (${effectsByOrder[2].length}):
${effectsByOrder[2].map(e => `- ${e.title} (${e.domain}, impact: ${e.impact})`).join('\n')}

THIRD-ORDER EFFECTS (${effectsByOrder[3].length}):
${effectsByOrder[3].map(e => `- ${e.title} (${e.domain}, impact: ${e.impact})`).join('\n')}

IDENTIFIED LEAPS:
${leapsSummary}

OBJECTIVES: ${session.objectives.join(', ')}
CONSTRAINTS: ${JSON.stringify(session.constraints)}

Generate a strategic synthesis with actionable recommendations, implementation priorities, and success metrics.`;
}
