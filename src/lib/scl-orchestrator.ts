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
import { callLlmWithMessages, type LlmProvider, type LlmMessage, type LlmCallOptions } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { loadSettings } from '@/lib/userSettings';
import { SCL_SYSTEM_FIRST_ORDER, SCL_SYSTEM_HIGHER_ORDER, SCL_SYSTEM_SYNTHESIS, buildSCL_USER_FIRST_ORDER, buildSCL_USER_HIGHER_ORDER, buildSCL_USER_SYNTHESIS } from '@/prompts/sclPrompts';

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

  // Private methods for prompt building

  // LLM API call — routes through the unified multi-provider layer
  private async callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
    const messages: LlmMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];
    const opts: LlmCallOptions = { temperature: 0.7, maxTokens: 2000, responseFormat: 'json' };
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
    throw new Error('No LLM provider configured for SCL. Configure an API key in Settings.');
  }
}
