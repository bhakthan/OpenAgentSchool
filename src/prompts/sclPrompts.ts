import type { SCLSession, SCLEffectNode, SCLSynthesis, SCLLeap, DeepDiveLevel } from '@/types/supercritical';
import { perspectivesRegistry } from '@/data/perspectivesRegistry';

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
  const perspectiveHints = seeds.conceptIds.map(id => {
    const p = perspectivesRegistry.find(p => p.id === id);
    return p?.firstOrderHint ? `\n${p.label.toUpperCase()} FOCUS: ${p.firstOrderHint}` : '';
  }).join('');
  return `Analyze first-order effects for this agentic AI implementation:

CONCEPT SEEDS: ${seeds.conceptIds.join(', ')}
PATTERN SEEDS: ${seeds.patternIds.join(', ')} 
PRACTICE SEEDS: ${seeds.practices.join(', ')}

OBJECTIVES: ${objectives}
CONSTRAINTS: ${constraints}

CONTEXT SUMMARY:
${contextSummary}

Generate 3-5 first-order effects that would occur immediately when implementing these concepts/patterns in a production environment.

Focus on the most likely and impactful direct consequences.${perspectiveHints}`;
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
      case 'red-team':
        return '- Adopt an adversarial mindset: how could a malicious actor exploit each effect?\n- Surface prompt-injection chains, data-exfiltration paths, privilege-escalation cascades\n- For each attack vector, note likelihood, blast radius, and mitigation cost';
      case 'temporal-sim':
        return '- Simulate effects week-by-week across a realistic timeline\n- At each time-step, note which effects have materialized and which are pending\n- Identify critical decision gates where intervention is cheapest';
      case 'compose':
        return '- Layer the outputs of two analysis modes and find reinforcing/conflicting effects\n- Highlight synergies (effects that amplify each other) and tensions (effects that cancel out)\n- Produce a merged graph with composite confidence scores';
      case 'regulatory-impact':
        return '- Map every effect through relevant regulatory frameworks (EU AI Act, NIST AI RMF, ISO 42001)\n- For each regulation, note compliance status: compliant / at-risk / non-compliant\n- Identify documentation gaps, audit trail requirements, and mandatory human-oversight points';
      default:
        return '';
    }
  })();

  const extras = session.constraints?.extras ? `\nEXTRAS: ${JSON.stringify(session.constraints.extras)}` : '';

  const cascadeHints = session.seeds.conceptIds.map(id => {
    const p = perspectivesRegistry.find(p => p.id === id);
    return p?.cascadeHint ? `\n${p.label.toUpperCase()} CASCADE GUIDANCE: ${p.cascadeHint}` : '';
  }).join('');
  return `Given these first-order effects from an agentic AI implementation:

${effectsDescription}

CONSTRAINTS: ${JSON.stringify(session.constraints)}
MODE: ${session.mode}
${extras}

Generate second and third-order effects that would cascade from these first-order effects.

For ${session.mode} mode:
${modeGuidance}

Also identify any LEAPS where threshold effects cause qualitative changes in system behavior.${cascadeHints}`;
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

  const synthesisHints = session.seeds.conceptIds.map(id => {
    const p = perspectivesRegistry.find(p => p.id === id);
    return p?.synthesisHint ? `\n${p.label.toUpperCase()} SYNTHESIS: ${p.synthesisHint}` : '';
  }).join('');
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

Generate a strategic synthesis with actionable recommendations, implementation priorities, and success metrics.${synthesisHints}`;
}

// ── Deep Dive Prompts ───────────────────────────────────────────────────────

export const SCL_SYSTEM_DEEP_DIVE_SECONDARY = `You are an expert systems analyst performing a SECONDARY deep dive.

You have been given specific effect nodes from a completed first-pass analysis.
Your job is to break each selected effect into 3-5 MORE GRANULAR sub-effects,
discover hidden cross-connections, and produce implementation-level insights.

Think like a senior SRE or staff engineer who just received the executive summary
and needs to turn it into an actionable implementation plan.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Return valid JSON with this structure:
{
  "subEffects": [
    {
      "id": "deep_2_1",
      "parentEffectId": "effect_X",
      "title": "Granular sub-effect title",
      "order": 2,
      "domain": "ops|product|security|org|cost|perf",
      "likelihood": 0.0-1.0,
      "impact": -5 to +5,
      "justification": "Specific, actionable detail about why this sub-effect occurs",
      "confidence": 0.0-1.0
    }
  ],
  "connections": [
    {
      "from": "deep_2_1",
      "to": "deep_2_2",
      "mechanism": "How these sub-effects interact",
      "confidence": 0.0-1.0,
      "delay": "1-2 weeks"
    }
  ],
  "leaps": [],
  "findings": {
    "kind": "secondary",
    "hiddenRisks": ["Risk not visible in top-level analysis"],
    "crossConnections": ["Connection between effects A and B that wasn't obvious"],
    "implementationSteps": ["Concrete step 1", "Concrete step 2"],
    "revisedKPIs": ["More precise KPI replacing a top-level one"],
    "openQuestions": ["Question that a tertiary dive could answer"]
  }
}

Guidelines:
- Each sub-effect should be MORE SPECIFIC than its parent (e.g., "increased latency" → "P99 latency spikes from 200ms to 800ms during embedding re-index")
- Cross-connections should reveal non-obvious dependencies between the selected effects
- Implementation steps should be concrete enough to create a Jira ticket from
- Open questions should be genuinely hard problems that need deeper investigation`;

export const SCL_SYSTEM_DEEP_DIVE_TERTIARY = `You are an expert systems analyst performing a TERTIARY deep dive.

You are given specific effects from a secondary deep dive. Your job is to produce
OPERATIONAL-LEVEL output: runbooks, tool recommendations, failure mode analysis
(FMEA), quantitative projections, and mitigation strategy comparisons.

Think like a principal engineer writing the production readiness review.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Return valid JSON with this structure:
{
  "subEffects": [
    {
      "id": "deep_3_1",
      "parentEffectId": "deep_2_X",
      "title": "Operational-level detail",
      "order": 3,
      "domain": "ops|product|security|org|cost|perf",
      "likelihood": 0.0-1.0,
      "impact": -5 to +5,
      "justification": "Production-specific justification",
      "confidence": 0.0-1.0
    }
  ],
  "connections": [],
  "leaps": [],
  "findings": {
    "kind": "tertiary",
    "runbook": [
      "Step 1: Pre-deployment checks...",
      "Step 2: Canary rollout to 5% traffic...",
      "Step 3: Monitor metric X for 24 hours..."
    ],
    "toolRecommendations": [
      {
        "tool": "Tool name",
        "purpose": "What it solves",
        "tradeoffs": "Cost, complexity, alternatives"
      }
    ],
    "fmeaEntries": [
      {
        "failureMode": "What can go wrong",
        "cause": "Root cause",
        "effect": "User/system impact",
        "severity": 1-10,
        "likelihood": 1-10,
        "detection": 1-10,
        "rpn": "severity × likelihood × detection",
        "mitigation": "How to prevent or detect"
      }
    ],
    "projections": [
      {
        "metric": "Metric name",
        "baseline": "Current value",
        "projected": "Expected value after implementation",
        "timeframe": "3 months",
        "confidence": 0.0-1.0
      }
    ],
    "mitigationComparison": [
      {
        "strategy": "Strategy name",
        "effort": "low|medium|high",
        "impact": "low|medium|high",
        "timeToValue": "2 weeks",
        "risks": "What could go wrong with this mitigation"
      }
    ]
  }
}

Guidelines:
- Runbook steps should be copy-pasteable into an ops playbook
- FMEA severity/likelihood/detection use a 1-10 scale; RPN = severity × likelihood × detection
- Tool recommendations should include real tools (not generic categories)
- Projections should have honest confidence levels — don't over-promise
- Mitigation comparison should help a team pick between 2-4 realistic options`;

export function buildSCL_USER_DEEP_DIVE(
  session: SCLSession,
  selectedEffects: SCLEffectNode[],
  level: DeepDiveLevel,
  userQuestion?: string,
  previousDiveFindings?: string
): string {
  const effectsDescription = selectedEffects.map(e =>
    `• ${e.id}: "${e.title}" (domain: ${e.domain}, order: ${e.order}, impact: ${e.impact}, likelihood: ${e.likelihood})\n  Justification: ${e.justification}`
  ).join('\n\n');

  const modeContext = `Analysis mode: ${session.mode}`;
  const constraintsContext = `Constraints: ${JSON.stringify(session.constraints)}`;
  const seedsContext = `Original seeds:\n  Concept: ${session.seeds.conceptIds.join(', ')}\n  Pattern: ${session.seeds.patternIds.join(', ')}\n  Practices: ${session.seeds.practices.join('; ')}`;

  const topLevelSynthesis = session.synthesis.risks.length > 0
    ? `\nTOP-LEVEL SYNTHESIS (for context):\n  Risks: ${session.synthesis.risks.slice(0, 3).join('; ')}\n  Opportunities: ${session.synthesis.opportunities.slice(0, 3).join('; ')}`
    : '';

  const previousContext = previousDiveFindings
    ? `\nPREVIOUS DEEP DIVE FINDINGS (build on these, don't repeat):\n${previousDiveFindings}`
    : '';

  const userFocus = userQuestion
    ? `\nUSER'S SPECIFIC QUESTION FOR THIS DEEP DIVE:\n"${userQuestion}"\nPrioritize findings that address this question.`
    : '';

  if (level === 'secondary') {
    return `SECONDARY DEEP DIVE — Break these ${selectedEffects.length} effects into implementation-level detail:

${effectsDescription}

${modeContext}
${constraintsContext}
${seedsContext}
${topLevelSynthesis}
${userFocus}

For each selected effect, generate 3-5 granular sub-effects that a team would actually encounter during implementation.

Focus on:
- Hidden risks that only surface when you start building
- Cross-connections between the selected effects that aren't obvious at the top level
- Concrete implementation steps (specific enough to create a work ticket)
- Revised KPIs that are more precise than the top-level ones
- Open questions that would need a tertiary deep dive to answer`;
  }

  return `TERTIARY DEEP DIVE — Generate operational playbooks for these effects:

${effectsDescription}
${previousContext}

${modeContext}
${constraintsContext}
${seedsContext}
${topLevelSynthesis}
${userFocus}

Generate production-grade operational output:

1. RUNBOOK: Step-by-step operational playbook that an on-call engineer could follow
2. TOOL RECOMMENDATIONS: Specific tools with tradeoffs (not generic categories — name real tools)
3. FMEA: Failure Mode and Effects Analysis for each significant risk (severity × likelihood × detection = RPN)
4. PROJECTIONS: Quantitative forecasts with honest confidence levels
5. MITIGATION COMPARISON: 2-4 realistic strategies compared by effort, impact, and time-to-value`;
}
