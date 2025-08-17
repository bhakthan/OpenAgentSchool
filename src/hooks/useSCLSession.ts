/**
 * SCL Session Management Hook
 * Handles LLM orchestration and session state
 */

import { useState, useCallback, useRef } from 'react';
import type { 
  SCLSession, 
  SCLMode, 
  SCLObjective, 
  SCLContextSummary,
  SCLEffectNode,
  SCLEdge,
  SCLLeap,
  SCLSynthesis
} from '@/types/supercritical';
import { createSCLOrchestrator } from '@/lib/scl-orchestrator';
import { knowledgeService } from '@/lib/knowledge-integration';

interface UseSCLSessionOptions {
  apiKey?: string;
  onProgress?: (step: string, progress: number) => void;
  onError?: (error: Error) => void;
}

interface SCLSessionState {
  session: SCLSession | null;
  isGenerating: boolean;
  progress: { step: string; progress: number } | null;
  error: string | null;
}

export function useSCLSession(options: UseSCLSessionOptions = {}) {
  const [state, setState] = useState<SCLSessionState>({
    session: null,
    isGenerating: false,
    progress: null,
    error: null,
  });

  const orchestratorRef = useRef<ReturnType<typeof createSCLOrchestrator> | null>(null);

  // Initialize orchestrator
  const getOrchestrator = useCallback(() => {
    if (!orchestratorRef.current) {
      try {
        orchestratorRef.current = createSCLOrchestrator(options.apiKey);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to initialize SCL orchestrator';
        setState(prev => ({ ...prev, error: errorMsg }));
        options.onError?.(new Error(errorMsg));
        return null;
      }
    }
    return orchestratorRef.current;
  }, [options.apiKey, options.onError]);

  // Create new session
  const createSession = useCallback((
    mode: SCLMode,
    objectives: SCLObjective[],
    seeds: {
      conceptIds: string[];
      patternIds: string[];
      practices: string[];
    }
  ): SCLSession => {
    const sessionId = `scl-${Date.now()}`;
    
    const newSession: SCLSession = {
      id: sessionId,
      mode,
      seeds,
      objectives,
      constraints: {
        budget: 'medium',
        timeHorizon: '3months',
        complianceProfile: 'basic',
      },
      effectGraph: {
        nodes: [],
        edges: [],
      },
      leaps: [],
      synthesis: {
        risks: [],
        opportunities: [],
        recommendedPractices: [],
        kpis: [],
        actionPlan: [],
        implementationOrder: [],
        successMetrics: [],
      },
      score: {
        completeness: 0,
        secondOrderDepth: 0,
        thirdOrderDepth: 0,
        novelty: 0,
        feasibility: 0,
        leapDetection: 0,
      },
      audit: {
        sources: [...seeds.conceptIds, ...seeds.patternIds],
        model: 'gpt-4',
        version: '1.0.0',
        timestamp: Date.now(),
        promptTokens: 0,
        responseTokens: 0,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'draft',
    };

    setState(prev => ({ ...prev, session: newSession, error: null }));
    return newSession;
  }, []);

  // Generate effects using LLM
  const generateEffects = useCallback(async (
    session: SCLSession,
    contextSummary: SCLContextSummary
  ) => {
    const orchestrator = getOrchestrator();
    if (!orchestrator || !session) return;

    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      error: null,
      progress: { step: 'Initializing...', progress: 0 }
    }));

    try {
      const handleProgress = (step: string, progress: number) => {
        setState(prev => ({ ...prev, progress: { step, progress } }));
        options.onProgress?.(step, progress);
      };

      const result = await orchestrator.generateCompleteSCL(
        session,
        contextSummary,
        handleProgress
      );

      // Calculate scores
      const score = calculateScore(result.effects, result.leaps, result.synthesis);

      const updatedSession: SCLSession = {
        ...session,
        effectGraph: {
          nodes: result.effects,
          edges: result.edges,
        },
        leaps: result.leaps,
        synthesis: result.synthesis,
        score,
        status: 'complete',
        updatedAt: Date.now(),
      };

      setState(prev => ({
        ...prev,
        session: updatedSession,
        isGenerating: false,
        progress: null,
      }));

      return updatedSession;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Generation failed';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMsg,
        progress: null,
        session: session ? { ...session, status: 'error' } : null,
      }));
      options.onError?.(new Error(errorMsg));
    }
  }, [getOrchestrator, options.onProgress, options.onError]);

  // Generate effects using LLM with automatic context building
  const generateEffectsWithContext = useCallback(async (session: SCLSession) => {
    try {
      // Build context summary from knowledge service
      const contextSummary = knowledgeService.buildContextSummary(session);
      
      // Generate effects with the built context
      await generateEffects(session, contextSummary);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to generate effects with context';
      setState(prev => ({ ...prev, error: errorMsg, isGenerating: false }));
      options.onError?.(new Error(errorMsg));
    }
  }, [generateEffects, options.onError]);

  // Update session constraints
  const updateConstraints = useCallback((
    constraints: Partial<SCLSession['constraints']>
  ) => {
    setState(prev => {
      if (!prev.session) return prev;
      
      return {
        ...prev,
        session: {
          ...prev.session,
          constraints: { ...prev.session.constraints, ...constraints },
          updatedAt: Date.now(),
        }
      };
    });
  }, []);

  // Add manual effect
  const addEffect = useCallback((effect: Omit<SCLEffectNode, 'id'>) => {
    setState(prev => {
      if (!prev.session) return prev;

      const newEffect: SCLEffectNode = {
        ...effect,
        id: `manual-${Date.now()}`,
      };

      return {
        ...prev,
        session: {
          ...prev.session,
          effectGraph: {
            ...prev.session.effectGraph,
            nodes: [...prev.session.effectGraph.nodes, newEffect],
          },
          updatedAt: Date.now(),
        }
      };
    });
  }, []);

  // Remove effect
  const removeEffect = useCallback((effectId: string) => {
    setState(prev => {
      if (!prev.session) return prev;

      return {
        ...prev,
        session: {
          ...prev.session,
          effectGraph: {
            nodes: prev.session.effectGraph.nodes.filter(n => n.id !== effectId),
            edges: prev.session.effectGraph.edges.filter(e => 
              e.from !== effectId && e.to !== effectId
            ),
          },
          updatedAt: Date.now(),
        }
      };
    });
  }, []);

  // Clear session
  const clearSession = useCallback(() => {
    setState({
      session: null,
      isGenerating: false,
      progress: null,
      error: null,
    });
  }, []);

  return {
    // State
    session: state.session,
    isGenerating: state.isGenerating,
    progress: state.progress,
    error: state.error,

    // Actions
    createSession,
    generateEffects,
    generateEffectsWithContext,
    updateConstraints,
    addEffect,
    removeEffect,
    clearSession,
  };
}

// Helper function to calculate session scores
function calculateScore(
  effects: SCLEffectNode[], 
  leaps: SCLLeap[], 
  synthesis: SCLSynthesis
) {
  const firstOrderCount = effects.filter(e => e.order === 1).length;
  const secondOrderCount = effects.filter(e => e.order === 2).length;
  const thirdOrderCount = effects.filter(e => e.order === 3).length;

  // Completeness based on effect depth and breadth
  const completeness = Math.min(1.0, 
    (firstOrderCount * 0.2 + secondOrderCount * 0.3 + thirdOrderCount * 0.5) / 5
  );

  // Novelty based on confidence distribution
  const avgConfidence = effects.reduce((sum, e) => sum + e.confidence, 0) / effects.length;
  const novelty = 1 - avgConfidence; // Lower confidence = higher novelty

  // Feasibility based on positive impacts and actionable recommendations
  const positiveImpacts = effects.filter(e => e.impact > 0).length;
  const actionableItems = synthesis.actionPlan.length + synthesis.recommendedPractices.length;
  const feasibility = Math.min(1.0, (positiveImpacts * 0.1 + actionableItems * 0.1));

  // Leap detection quality
  const leapDetection = leaps.length > 0 ? 
    leaps.reduce((sum, l) => sum + l.confidence, 0) / leaps.length : 0;

  return {
    completeness,
    secondOrderDepth: secondOrderCount,
    thirdOrderDepth: thirdOrderCount,
    novelty,
    feasibility,
    leapDetection,
  };
}
