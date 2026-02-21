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
  SCLContextSummary,
  SCLDeepDive,
  DeepDiveLevel,
  DeepDiveFindings,
  SecondaryFindings,
  TertiaryFindings
} from '@/types/supercritical';
import { callLlmWithMessages, type LlmProvider, type LlmMessage, type LlmCallOptions } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { loadSettings } from '@/lib/userSettings';
import { 
  SCL_SYSTEM_FIRST_ORDER, SCL_SYSTEM_HIGHER_ORDER, SCL_SYSTEM_SYNTHESIS, 
  SCL_SYSTEM_DEEP_DIVE_SECONDARY, SCL_SYSTEM_DEEP_DIVE_TERTIARY,
  buildSCL_USER_FIRST_ORDER, buildSCL_USER_HIGHER_ORDER, buildSCL_USER_SYNTHESIS,
  buildSCL_USER_DEEP_DIVE
} from '@/prompts/sclPrompts';

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

interface DeepDiveResponse {
  subEffects: Array<{
    id: string;
    parentEffectId: string;
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
  findings: SecondaryFindings | TertiaryFindings;
}

export class SCLOrchestrator {
  private provider: LlmProvider;

  /**
   * Create an SCL orchestrator that routes through the unified LLM layer.
   * @param provider - The LlmProvider to use (azure, openai, openrouter, etc.)
   */
  constructor(provider: LlmProvider) {
    this.provider = provider;
    console.log(`SCL orchestrator using provider: ${provider}`);
  }

  /**
   * Create an orchestrator that respects user settings.
   * Resolution: user preferredProvider → first available provider → openrouter.
   */
  static fromEnvironment(): SCLOrchestrator {
    let provider: LlmProvider;
    try {
      const settings = loadSettings();
      if (settings.preferredProvider && settings.preferredProvider !== 'auto') {
        provider = settings.preferredProvider as LlmProvider;
        console.log(`SCL using user-preferred provider: ${provider}`);
      } else {
        provider = (getFirstAvailableProvider() || 'openrouter') as LlmProvider;
        console.log(`SCL auto-detected provider: ${provider}`);
      }
    } catch {
      provider = 'openrouter';
      console.log('SCL falling back to openrouter');
    }
    return new SCLOrchestrator(provider);
  }

  /**
   * Generate first-order effects from seeds
   */
  async generateFirstOrderEffects(
    session: SCLSession,
    contextSummary: SCLContextSummary
  ): Promise<SCLEffectNode[]> {
  const systemPrompt = SCL_SYSTEM_FIRST_ORDER;
  const userPrompt = buildSCL_USER_FIRST_ORDER(session, this.formatContextSummary(contextSummary));

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
  const systemPrompt = SCL_SYSTEM_HIGHER_ORDER;
  const userPrompt = buildSCL_USER_HIGHER_ORDER(session, firstOrderEffects);

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
  const systemPrompt = SCL_SYSTEM_SYNTHESIS;
  const userPrompt = buildSCL_USER_SYNTHESIS(session, allEffects, leaps);

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

  /**
   * Deep Dive: drill into selected effect nodes for secondary or tertiary analysis.
   *
   * Secondary: breaks each selected effect into 3-5 granular sub-effects,
   *   discovers cross-connections, produces implementation-level insights.
   *
   * Tertiary: generates operational runbooks, FMEA, quantitative projections,
   *   tool recommendations, and mitigation comparisons.
   */
  async generateDeepDive(
    session: SCLSession,
    selectedNodeIds: string[],
    level: DeepDiveLevel,
    userQuestion?: string,
    onProgress?: (step: string, progress: number) => void
  ): Promise<SCLDeepDive> {
    const label = level === 'secondary' ? 'Secondary' : 'Tertiary';
    onProgress?.(`Starting ${label} deep dive...`, 0.1);

    // Resolve selected nodes from the session graph + any previous deep dive effects
    const allAvailableEffects = [
      ...session.effectGraph.nodes,
      ...(session.deepDives?.flatMap(d => d.effects) ?? []),
    ];
    const selectedNodes = selectedNodeIds
      .map(id => allAvailableEffects.find(n => n.id === id))
      .filter((n): n is SCLEffectNode => n !== undefined);

    if (selectedNodes.length === 0) {
      throw new Error('No valid effect nodes selected for deep dive');
    }

    // Build previous findings context for tertiary dives
    let previousDiveFindings: string | undefined;
    if (level === 'tertiary' && session.deepDives?.length > 0) {
      const lastSecondary = [...session.deepDives]
        .reverse()
        .find(d => d.level === 'secondary');
      if (lastSecondary?.findings.kind === 'secondary') {
        const f = lastSecondary.findings;
        previousDiveFindings = [
          `Hidden risks: ${f.hiddenRisks.join('; ')}`,
          `Cross-connections: ${f.crossConnections.join('; ')}`,
          `Implementation steps: ${f.implementationSteps.join('; ')}`,
          `Open questions: ${f.openQuestions.join('; ')}`,
        ].join('\n');
      }
    }

    onProgress?.(`Generating ${label.toLowerCase()} analysis...`, 0.4);

    const systemPrompt = level === 'secondary'
      ? SCL_SYSTEM_DEEP_DIVE_SECONDARY
      : SCL_SYSTEM_DEEP_DIVE_TERTIARY;

    const userPrompt = buildSCL_USER_DEEP_DIVE(
      session,
      selectedNodes,
      level,
      userQuestion,
      previousDiveFindings
    );

    const response = await this.callLLM(systemPrompt, userPrompt, 3000);
    onProgress?.(`Parsing ${label.toLowerCase()} results...`, 0.8);

    const parsed = this.parseDeepDiveResponse(response, level);

    const deepDive: SCLDeepDive = {
      id: `dive-${level}-${Date.now()}`,
      level,
      selectedNodeIds,
      selectedNodes,
      userQuestion,
      effects: parsed.subEffects.map(e => ({
        id: e.id,
        title: e.title,
        order: e.order,
        domain: e.domain,
        likelihood: e.likelihood,
        impact: e.impact,
        justification: e.justification,
        confidence: e.confidence,
        references: [`parent:${e.parentEffectId}`],
      })),
      edges: parsed.connections.map(c => ({
        from: c.from,
        to: c.to,
        confidence: c.confidence,
        mechanism: c.mechanism,
        delay: c.delay,
      })),
      leaps: (parsed.leaps || []).map(l => ({
        ...l,
        evidence: [`deep-dive-${level}`],
      })),
      findings: parsed.findings,
      promptTokens: 0,
      responseTokens: 0,
      createdAt: Date.now(),
    };

    onProgress?.(`${label} deep dive complete!`, 1.0);
    return deepDive;
  }

  // Private methods for prompt building

  // LLM API call — routes through the unified multi-provider layer
  private async callLLM(systemPrompt: string, userPrompt: string, maxTokens = 2000): Promise<string> {
    const messages: LlmMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];
    const opts: LlmCallOptions = { temperature: 0.7, maxTokens, responseFormat: 'json' };
    const result = await callLlmWithMessages(messages, this.provider, opts);
    return result.content;
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

  private parseDeepDiveResponse(response: string, level: DeepDiveLevel): DeepDiveResponse {
    try {
      const cleanedResponse = this.extractJsonFromResponse(response);
      const parsed = JSON.parse(cleanedResponse);

      // Ensure findings has the correct kind discriminator
      if (parsed.findings) {
        parsed.findings.kind = level === 'secondary' ? 'secondary' : 'tertiary';
      } else {
        // Produce a safe empty findings object
        parsed.findings = level === 'secondary'
          ? { kind: 'secondary', hiddenRisks: [], crossConnections: [], implementationSteps: [], revisedKPIs: [], openQuestions: [] }
          : { kind: 'tertiary', runbook: [], toolRecommendations: [], fmeaEntries: [], projections: [], mitigationComparison: [] };
      }

      // Normalise: some models return "effects" instead of "subEffects"
      if (!parsed.subEffects && parsed.effects) {
        parsed.subEffects = parsed.effects;
      }
      parsed.subEffects = parsed.subEffects || [];
      parsed.connections = parsed.connections || [];
      parsed.leaps = parsed.leaps || [];

      return parsed as DeepDiveResponse;
    } catch (error) {
      throw new Error(`Failed to parse deep dive response: ${error.message}`);
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

/**
 * Factory function for easy instantiation.
 * @param provider - Explicit provider override. If omitted, uses user settings → auto-detect.
 */
export function createSCLOrchestrator(provider?: LlmProvider): SCLOrchestrator {
  if (provider) {
    return new SCLOrchestrator(provider);
  }
  // Use user settings + auto-detect
  try {
    return SCLOrchestrator.fromEnvironment();
  } catch (error) {
    throw new Error('No LLM provider configured for SCL. Open Settings (⚙ gear icon in the header) and add your API key — it takes 30 seconds! Your keys stay in your browser and are never sent to our servers.');
  }
}
