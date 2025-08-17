/**
 * Perturbation Generator for SCL Extrapolate Mode
 * Generates systematic perturbations to explore alternative scenarios and edge cases
 */

import { SCLEffect } from '../components/SuperCriticalLearning/SCLGraph';

export interface Perturbation {
  id: string;
  type: 'parameter' | 'assumption' | 'context' | 'constraint' | 'temporal';
  description: string;
  targetEffectId: string;
  originalValue: any;
  perturbedValue: any;
  magnitude: number; // 0-1, how much change
  likelihood: number; // 0-1, how likely this perturbation
  impact: 'low' | 'medium' | 'high' | 'critical';
  rationale: string;
}

export interface PerturbationResult {
  perturbation: Perturbation;
  modifiedEffects: SCLEffect[];
  newEffects: SCLEffect[];
  removedEffectIds: string[];
  confidenceChange: number;
  scenarioDescription: string;
}

export interface PerturbationConfig {
  maxPerturbations: number;
  perturbationTypes: Perturbation['type'][];
  magnitudeRange: [number, number];
  focusAreas?: string[];
  constraintRelaxation: boolean;
}

export class PerturbationGenerator {
  private effects: SCLEffect[];
  private config: PerturbationConfig;

  constructor(effects: SCLEffect[], config: PerturbationConfig) {
    this.effects = effects;
    this.config = config;
  }

  // Generate systematic perturbations
  generatePerturbations(): Perturbation[] {
    const perturbations: Perturbation[] = [];
    
    for (const effect of this.effects) {
      // Generate perturbations for each configured type
      for (const perturbationType of this.config.perturbationTypes) {
        const typePerturbations = this.generatePerturbationsForType(effect, perturbationType);
        perturbations.push(...typePerturbations);
      }
    }

    // Sort by potential impact and limit to max count
    return perturbations
      .sort((a, b) => this.calculatePerturbationScore(b) - this.calculatePerturbationScore(a))
      .slice(0, this.config.maxPerturbations);
  }

  // Generate perturbations for a specific type
  private generatePerturbationsForType(effect: SCLEffect, type: Perturbation['type']): Perturbation[] {
    switch (type) {
      case 'parameter':
        return this.generateParameterPerturbations(effect);
      case 'assumption':
        return this.generateAssumptionPerturbations(effect);
      case 'context':
        return this.generateContextPerturbations(effect);
      case 'constraint':
        return this.generateConstraintPerturbations(effect);
      case 'temporal':
        return this.generateTemporalPerturbations(effect);
      default:
        return [];
    }
  }

  // Parameter perturbations (confidence, magnitude, scope)
  private generateParameterPerturbations(effect: SCLEffect): Perturbation[] {
    const perturbations: Perturbation[] = [];
    const [minMag, maxMag] = this.config.magnitudeRange;

    // Confidence perturbations
    if (effect.confidence > 0.1) {
      perturbations.push({
        id: `param-conf-${effect.id}-lower`,
        type: 'parameter',
        description: `Reduce confidence in "${effect.text}"`,
        targetEffectId: effect.id,
        originalValue: effect.confidence,
        perturbedValue: Math.max(0.1, effect.confidence * (1 - Math.random() * maxMag)),
        magnitude: Math.random() * (maxMag - minMag) + minMag,
        likelihood: 0.3 + Math.random() * 0.4,
        impact: effect.confidence > 0.8 ? 'high' : 'medium',
        rationale: 'Exploring uncertainty in high-confidence effects',
      });
    }

    if (effect.confidence < 0.9) {
      perturbations.push({
        id: `param-conf-${effect.id}-higher`,
        type: 'parameter',
        description: `Increase confidence in "${effect.text}"`,
        targetEffectId: effect.id,
        originalValue: effect.confidence,
        perturbedValue: Math.min(0.9, effect.confidence * (1 + Math.random() * maxMag)),
        magnitude: Math.random() * (maxMag - minMag) + minMag,
        likelihood: 0.2 + Math.random() * 0.3,
        impact: effect.confidence < 0.5 ? 'medium' : 'low',
        rationale: 'Testing impact of increased certainty',
      });
    }

    return perturbations;
  }

  // Assumption perturbations (underlying premises)
  private generateAssumptionPerturbations(effect: SCLEffect): Perturbation[] {
    const perturbations: Perturbation[] = [];
    const assumptions = this.extractAssumptions(effect);

    for (const assumption of assumptions) {
      perturbations.push({
        id: `assume-${effect.id}-${assumption.id}`,
        type: 'assumption',
        description: `Challenge assumption: ${assumption.description}`,
        targetEffectId: effect.id,
        originalValue: assumption.valid,
        perturbedValue: !assumption.valid,
        magnitude: assumption.importance,
        likelihood: 0.1 + Math.random() * 0.3,
        impact: assumption.impact,
        rationale: `What if ${assumption.description} is not true?`,
      });
    }

    return perturbations;
  }

  // Context perturbations (environmental changes)
  private generateContextPerturbations(effect: SCLEffect): Perturbation[] {
    const perturbations: Perturbation[] = [];
    const contexts = this.generateContextScenarios(effect);

    for (const context of contexts) {
      perturbations.push({
        id: `context-${effect.id}-${context.id}`,
        type: 'context',
        description: `Context shift: ${context.description}`,
        targetEffectId: effect.id,
        originalValue: 'baseline',
        perturbedValue: context.scenario,
        magnitude: context.severity,
        likelihood: context.probability,
        impact: context.impact,
        rationale: context.reasoning,
      });
    }

    return perturbations;
  }

  // Constraint perturbations (relaxing or tightening limits)
  private generateConstraintPerturbations(effect: SCLEffect): Perturbation[] {
    const perturbations: Perturbation[] = [];
    
    if (effect.constraints && effect.constraints.length > 0) {
      for (const constraint of effect.constraints) {
        // Relaxation
        perturbations.push({
          id: `constraint-relax-${effect.id}-${constraint}`,
          type: 'constraint',
          description: `Relax constraint: ${constraint}`,
          targetEffectId: effect.id,
          originalValue: constraint,
          perturbedValue: null,
          magnitude: 0.5 + Math.random() * 0.3,
          likelihood: 0.4 + Math.random() * 0.3,
          impact: 'medium',
          rationale: 'Exploring unconstrained scenarios',
        });

        // Tightening
        perturbations.push({
          id: `constraint-tighten-${effect.id}-${constraint}`,
          type: 'constraint',
          description: `Strengthen constraint: ${constraint}`,
          targetEffectId: effect.id,
          originalValue: constraint,
          perturbedValue: `${constraint} (strict)`,
          magnitude: 0.3 + Math.random() * 0.4,
          likelihood: 0.3 + Math.random() * 0.2,
          impact: 'high',
          rationale: 'Testing robustness under stricter conditions',
        });
      }
    }

    return perturbations;
  }

  // Temporal perturbations (timing changes)
  private generateTemporalPerturbations(effect: SCLEffect): Perturbation[] {
    const perturbations: Perturbation[] = [];
    const timeScales = ['immediate', 'weeks', 'months', 'years', 'decades'];

    for (const timeScale of timeScales) {
      perturbations.push({
        id: `temporal-${effect.id}-${timeScale}`,
        type: 'temporal',
        description: `Effect occurs on ${timeScale} timescale`,
        targetEffectId: effect.id,
        originalValue: 'baseline timing',
        perturbedValue: timeScale,
        magnitude: this.getTemporalMagnitude(timeScale),
        likelihood: this.getTemporalLikelihood(effect, timeScale),
        impact: this.getTemporalImpact(timeScale),
        rationale: `Exploring different temporal dynamics`,
      });
    }

    return perturbations;
  }

  // Apply perturbation and generate results
  applyPerturbation(perturbation: Perturbation): PerturbationResult {
    const modifiedEffects: SCLEffect[] = [];
    const newEffects: SCLEffect[] = [];
    const removedEffectIds: string[] = [];

    // Find target effect
    const targetEffect = this.effects.find(e => e.id === perturbation.targetEffectId);
    if (!targetEffect) {
      throw new Error(`Target effect ${perturbation.targetEffectId} not found`);
    }

    // Apply perturbation based on type
    switch (perturbation.type) {
      case 'parameter':
        modifiedEffects.push(this.applyParameterPerturbation(targetEffect, perturbation));
        break;
      case 'assumption':
        const assumptionResult = this.applyAssumptionPerturbation(targetEffect, perturbation);
        modifiedEffects.push(...assumptionResult.modified);
        newEffects.push(...assumptionResult.new);
        removedEffectIds.push(...assumptionResult.removed);
        break;
      case 'context':
        const contextResult = this.applyContextPerturbation(targetEffect, perturbation);
        modifiedEffects.push(...contextResult.modified);
        newEffects.push(...contextResult.new);
        break;
      case 'constraint':
        modifiedEffects.push(this.applyConstraintPerturbation(targetEffect, perturbation));
        break;
      case 'temporal':
        modifiedEffects.push(this.applyTemporalPerturbation(targetEffect, perturbation));
        break;
    }

    // Calculate confidence change
    const originalConfidence = targetEffect.confidence;
    const newConfidence = modifiedEffects.find(e => e.id === targetEffect.id)?.confidence || originalConfidence;
    const confidenceChange = newConfidence - originalConfidence;

    // Generate scenario description
    const scenarioDescription = this.generateScenarioDescription(perturbation, modifiedEffects, newEffects);

    return {
      perturbation,
      modifiedEffects,
      newEffects,
      removedEffectIds,
      confidenceChange,
      scenarioDescription,
    };
  }

  // Helper methods for perturbation application
  private applyParameterPerturbation(effect: SCLEffect, perturbation: Perturbation): SCLEffect {
    return {
      ...effect,
      confidence: perturbation.perturbedValue,
    };
  }

  private applyAssumptionPerturbation(effect: SCLEffect, perturbation: Perturbation): {
    modified: SCLEffect[];
    new: SCLEffect[];
    removed: string[];
  } {
    // This would involve complex logic to modify effects based on changed assumptions
    const modified = [{
      ...effect,
      confidence: effect.confidence * (1 - perturbation.magnitude * 0.5),
      text: `${effect.text} (assumption challenged)`,
    }];

    return { modified, new: [], removed: [] };
  }

  private applyContextPerturbation(effect: SCLEffect, perturbation: Perturbation): {
    modified: SCLEffect[];
    new: SCLEffect[];
  } {
    const modified = [{
      ...effect,
      text: `${effect.text} (in ${perturbation.perturbedValue} context)`,
      confidence: effect.confidence * (1 + (Math.random() - 0.5) * perturbation.magnitude),
    }];

    return { modified, new: [] };
  }

  private applyConstraintPerturbation(effect: SCLEffect, perturbation: Perturbation): SCLEffect {
    const newConstraints = perturbation.perturbedValue === null ?
      effect.constraints?.filter(c => c !== perturbation.originalValue) || [] :
      [...(effect.constraints || []), perturbation.perturbedValue];

    return {
      ...effect,
      constraints: newConstraints,
      confidence: effect.confidence * (perturbation.magnitude > 0.5 ? 0.8 : 1.2),
    };
  }

  private applyTemporalPerturbation(effect: SCLEffect, perturbation: Perturbation): SCLEffect {
    return {
      ...effect,
      text: `${effect.text} (${perturbation.perturbedValue} timeline)`,
      confidence: effect.confidence * this.getTemporalConfidenceMultiplier(perturbation.perturbedValue),
    };
  }

  // Helper methods for scoring and extraction
  private calculatePerturbationScore(perturbation: Perturbation): number {
    const impactScore = this.getImpactScore(perturbation.impact);
    return perturbation.likelihood * impactScore * perturbation.magnitude;
  }

  private getImpactScore(impact: Perturbation['impact']): number {
    switch (impact) {
      case 'critical': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 1;
    }
  }

  private extractAssumptions(effect: SCLEffect): Array<{
    id: string;
    description: string;
    valid: boolean;
    importance: number;
    impact: Perturbation['impact'];
  }> {
    // In a real implementation, this would use NLP to extract assumptions
    return [
      {
        id: 'linear-growth',
        description: 'Growth follows linear pattern',
        valid: true,
        importance: 0.7,
        impact: 'medium',
      },
      {
        id: 'stable-environment',
        description: 'Environment remains stable',
        valid: true,
        importance: 0.8,
        impact: 'high',
      },
    ];
  }

  private generateContextScenarios(effect: SCLEffect): Array<{
    id: string;
    description: string;
    scenario: string;
    severity: number;
    probability: number;
    impact: Perturbation['impact'];
    reasoning: string;
  }> {
    return [
      {
        id: 'economic-downturn',
        description: 'Economic recession',
        scenario: 'recession',
        severity: 0.8,
        probability: 0.3,
        impact: 'high',
        reasoning: 'Economic conditions significantly affect resource availability',
      },
      {
        id: 'tech-breakthrough',
        description: 'Major technological advancement',
        scenario: 'tech-disruption',
        severity: 0.9,
        probability: 0.2,
        impact: 'critical',
        reasoning: 'Disruptive technology can invalidate existing assumptions',
      },
    ];
  }

  private getTemporalMagnitude(timeScale: string): number {
    const magnitudes: Record<string, number> = {
      'immediate': 0.9,
      'weeks': 0.7,
      'months': 0.5,
      'years': 0.3,
      'decades': 0.8,
    };
    return magnitudes[timeScale] || 0.5;
  }

  private getTemporalLikelihood(effect: SCLEffect, timeScale: string): number {
    // Effects with higher confidence are more likely to have predictable timelines
    const baseProb = effect.confidence * 0.5 + 0.2;
    const timeFactors: Record<string, number> = {
      'immediate': 0.8,
      'weeks': 0.9,
      'months': 0.7,
      'years': 0.5,
      'decades': 0.3,
    };
    return baseProb * (timeFactors[timeScale] || 0.5);
  }

  private getTemporalImpact(timeScale: string): Perturbation['impact'] {
    const impacts: Record<string, Perturbation['impact']> = {
      'immediate': 'high',
      'weeks': 'medium',
      'months': 'medium',
      'years': 'low',
      'decades': 'high',
    };
    return impacts[timeScale] || 'medium';
  }

  private getTemporalConfidenceMultiplier(timeScale: string): number {
    const multipliers: Record<string, number> = {
      'immediate': 1.2,
      'weeks': 1.1,
      'months': 1.0,
      'years': 0.8,
      'decades': 0.6,
    };
    return multipliers[timeScale] || 1.0;
  }

  private generateScenarioDescription(
    perturbation: Perturbation,
    modifiedEffects: SCLEffect[],
    newEffects: SCLEffect[]
  ): string {
    const base = `Scenario: ${perturbation.description}`;
    const changes = modifiedEffects.length > 0 ? `Modified ${modifiedEffects.length} effects. ` : '';
    const additions = newEffects.length > 0 ? `Added ${newEffects.length} new effects. ` : '';
    const rationale = `Rationale: ${perturbation.rationale}`;
    
    return `${base}\n\n${changes}${additions}\n${rationale}`;
  }
}

export default PerturbationGenerator;
