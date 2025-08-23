/**
 * Super Critical Learning LLM Orchestration
 * Multi-step effect generation and synthesis
 */

import type { 
  SCLSession, 
  SCLEffectNode, 
  SCLEdge, 
  SCLLeap, 
  SCLSynthesis,
  SCLDomain,
  SCLObjective,
  SCLContextSummary 
} from '@/types/supercritical';
import { 
  callOpenRouter, 
  createOpenRouterConfig, 
  getOpenRouterConfigFromEnv,
  type OpenRouterConfig,
  type OpenRouterModel 
} from '@/lib/openrouter-config';

// LLM Response Types
interface EffectGenerationResponse {
  effects: Array<{
    id: string;
    title: string;
    order: 1 | 2 | 3;
    domain: SCLDomain;
    likelihood: number;
    impact: number;
    justification: string;
    confidence: number;
  }>;
  connections: Array<{
    from: string;
    to: string;
    mechanism: string;
    confidence: number;
    delay?: string;
  }>;
  leaps: Array<{
    trigger: string;
    threshold: string;
    result: string;
    mechanism: string;
    confidence: number;
  }>;
}

interface SynthesisResponse {
  risks: string[];
  opportunities: string[];
  recommendedPractices: string[];
  kpis: string[];
  actionPlan: string[];
  implementationOrder: string[];
  successMetrics: string[];
}

export class SCLOrchestrator {
  private config: OpenRouterConfig;

  constructor(apiKey: string, model: OpenRouterModel = 'openai/gpt-oss-20b:free', baseUrl?: string) {
    this.config = createOpenRouterConfig(apiKey, model);
    // Override base URL if provided (for OpenAI compatibility)
    if (baseUrl) {
      this.config.baseUrl = baseUrl;
    }
  }

  /**
   * Alternative constructor using environment variables
   * Will try OpenRouter first, then fall back to OpenAI
   */
  static fromEnvironment(): SCLOrchestrator {
    // Try OpenRouter first
    const openRouterConfig = getOpenRouterConfigFromEnv();
    if (openRouterConfig) {
      console.log('SCL using OpenRouter API');
      return new SCLOrchestrator(openRouterConfig.apiKey, openRouterConfig.model as OpenRouterModel);
    }

    // Fall back to OpenAI configuration
    const openAIKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    const openAIModel = import.meta.env.VITE_OPENAI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o';
    
    if (openAIKey) {
      console.log('SCL using OpenAI API (via OpenRouter format)');
      // Use OpenAI key but with OpenRouter-compatible configuration
      const config = {
        apiKey: openAIKey,
        model: 'openai/' + openAIModel as OpenRouterModel,
        baseUrl: 'https://api.openai.com/v1',
        siteName: 'OpenAgentSchool',
        appName: 'SCL-Analysis'
      };
      return new SCLOrchestrator(config.apiKey, config.model, config.baseUrl);
    }

    throw new Error('No API key found. Set VITE_OPENROUTER_API_KEY for OpenRouter or VITE_OPENAI_API_KEY for OpenAI');
  }

  /**
   * Generate first-order effects from seeds
   */
  async generateFirstOrderEffects(
    session: SCLSession,
    contextSummary: SCLContextSummary
  ): Promise<SCLEffectNode[]> {
    const systemPrompt = this.buildFirstOrderSystemPrompt();
    const userPrompt = this.buildFirstOrderUserPrompt(session, contextSummary);

    const response = await this.callLLM(systemPrompt, userPrompt);
    const parsed = this.parseEffectResponse(response);
    
    return parsed.effects.filter(e => e.order === 1).map(e => ({
      ...e,
      references: this.extractReferences(session, e.title)
    }));
  }

  /**
   * Generate second and third-order effects from first-order effects
   */
  async generateHigherOrderEffects(
    session: SCLSession,
    firstOrderEffects: SCLEffectNode[]
  ): Promise<{ effects: SCLEffectNode[]; edges: SCLEdge[]; leaps: SCLLeap[] }> {
    const systemPrompt = this.buildHigherOrderSystemPrompt();
    const userPrompt = this.buildHigherOrderUserPrompt(session, firstOrderEffects);

    const response = await this.callLLM(systemPrompt, userPrompt);
    const parsed = this.parseEffectResponse(response);

    const higherOrderEffects = parsed.effects.filter(e => e.order > 1).map(e => ({
      ...e,
      references: this.extractReferences(session, e.title)
    }));

    const edges = parsed.connections.map(c => ({
      from: c.from,
      to: c.to,
      confidence: c.confidence,
      mechanism: c.mechanism,
      delay: c.delay
    }));

    const leaps = parsed.leaps.map(l => ({
      ...l,
      evidence: this.extractEvidence(session, l.trigger)
    }));

    return { effects: higherOrderEffects, edges, leaps };
  }

  /**
   * Generate synthesis and recommendations
   */
  async generateSynthesis(
    session: SCLSession,
    allEffects: SCLEffectNode[],
    leaps: SCLLeap[]
  ): Promise<SCLSynthesis> {
    const systemPrompt = this.buildSynthesisSystemPrompt();
    const userPrompt = this.buildSynthesisUserPrompt(session, allEffects, leaps);

    const response = await this.callLLM(systemPrompt, userPrompt);
    return this.parseSynthesisResponse(response);
  }

  /**
   * Complete end-to-end SCL generation
   */
  async generateCompleteSCL(
    session: SCLSession,
    contextSummary: SCLContextSummary,
    onProgress?: (step: string, progress: number) => void
  ): Promise<{
    effects: SCLEffectNode[];
    edges: SCLEdge[];
    leaps: SCLLeap[];
    synthesis: SCLSynthesis;
  }> {
    try {
      onProgress?.('Generating first-order effects...', 0.2);
      const firstOrderEffects = await this.generateFirstOrderEffects(session, contextSummary);

      onProgress?.('Generating higher-order effects...', 0.5);
      const { effects: higherOrderEffects, edges, leaps } = await this.generateHigherOrderEffects(
        session, 
        firstOrderEffects
      );

      const allEffects = [...firstOrderEffects, ...higherOrderEffects];

      onProgress?.('Generating synthesis...', 0.8);
      const synthesis = await this.generateSynthesis(session, allEffects, leaps);

      onProgress?.('Complete!', 1.0);

      return {
        effects: allEffects,
        edges,
        leaps,
        synthesis
      };
    } catch (error) {
      console.error('SCL Generation Error:', error);
      throw new Error(`SCL generation failed: ${error.message}`);
    }
  }

  // Private methods for prompt building
  private buildFirstOrderSystemPrompt(): string {
    return `You are an expert systems analyst specializing in agentic AI effects analysis.

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
  }

  private buildFirstOrderUserPrompt(session: SCLSession, context: SCLContextSummary): string {
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
${this.formatContextSummary(context)}

Generate 3-5 first-order effects that would occur immediately when implementing these concepts/patterns in a production environment.

Focus on the most likely and impactful direct consequences.`;
  }

  private buildHigherOrderSystemPrompt(): string {
    return `You are an expert systems analyst specializing in cascade effect analysis.

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
  }

  private buildHigherOrderUserPrompt(session: SCLSession, firstOrderEffects: SCLEffectNode[]): string {
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

  private buildSynthesisSystemPrompt(): string {
    return `You are a strategic advisor synthesizing insights from a complex effect analysis.

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
  }

  private buildSynthesisUserPrompt(
    session: SCLSession, 
    allEffects: SCLEffectNode[], 
    leaps: SCLLeap[]
  ): string {
    const effectsByOrder = {
      1: allEffects.filter(e => e.order === 1),
      2: allEffects.filter(e => e.order === 2), 
      3: allEffects.filter(e => e.order === 3)
    };

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

  // LLM API call using OpenRouter
  private async callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
    return callOpenRouter(
      this.config,
      systemPrompt,
      userPrompt,
      {
        temperature: 0.7,
        maxTokens: 2000,
        responseFormat: 'json'
      }
    );
  }

  // Response parsing
  private parseEffectResponse(response: string): EffectGenerationResponse {
    try {
      const cleanedResponse = this.extractJsonFromResponse(response);
      return JSON.parse(cleanedResponse);
    } catch (error) {
      throw new Error(`Failed to parse effect response: ${error.message}`);
    }
  }

  private parseSynthesisResponse(response: string): SCLSynthesis {
    try {
      const cleanedResponse = this.extractJsonFromResponse(response);
      return JSON.parse(cleanedResponse);
    } catch (error) {
      throw new Error(`Failed to parse synthesis response: ${error.message}`);
    }
  }

  // Helper method to extract JSON from markdown code blocks or raw text
  private extractJsonFromResponse(response: string): string {
    console.log('Raw API Response:', response);
    
    // Remove any leading/trailing whitespace
    const trimmed = response.trim();
    
    // Try to extract JSON from markdown code blocks
    const jsonBlockMatch = trimmed.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonBlockMatch) {
      console.log('Found JSON in markdown block');
      return jsonBlockMatch[1].trim();
    }
    
    // Try to find JSON object in the response
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('Found JSON object in response');
      return jsonMatch[0].trim();
    }
    
    console.log('No JSON found, returning original response');
    // If no JSON found, return original response and let JSON.parse handle the error
    return trimmed;
  }

  // Helper methods
  private formatContextSummary(context: SCLContextSummary): string {
    const concepts = context.concepts.map(c => 
      `${c.title}: ${c.keyMechanisms.join(', ')}`
    ).join('\n');
    
    const patterns = context.patterns.map(p =>
      `${p.title}: ${p.tradeoffs.join(', ')}`
    ).join('\n');

    return `CONCEPTS:\n${concepts}\n\nPATTERNS:\n${patterns}`;
  }

  private extractReferences(session: SCLSession, effectTitle: string): string[] {
    // This would be enhanced to find actual concept/pattern references
    return session.seeds.conceptIds.slice(0, 2);
  }

  private extractEvidence(session: SCLSession, trigger: string): string[] {
    // This would be enhanced to find supporting evidence
    return [`Evidence for: ${trigger}`];
  }
}

// Factory function for easy instantiation
export function createSCLOrchestrator(apiKey?: string, model?: OpenRouterModel): SCLOrchestrator {
  if (apiKey) {
    return new SCLOrchestrator(apiKey, model);
  }
  
  // Try environment variables
  try {
    return SCLOrchestrator.fromEnvironment();
  } catch (error) {
    throw new Error('OpenRouter API key required for SCL generation. Provide apiKey parameter or set VITE_OPENROUTER_API_KEY environment variable.');
  }
}
