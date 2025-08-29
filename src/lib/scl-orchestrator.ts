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
