/**
 * SCL Session Management Hook
 * Handles LLM orchestration and session state
 */

import { useState, useCallback } from 'react';
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
import { fetchContextSummary } from '@/lib/api/knowledge';
import { executeTemplateWorkflow, getWorkflow, OrchestratorWorkflow, cancelWorkflow } from '@/lib/api/orchestrator';

interface UseSCLSessionOptions {
  onProgress?: (step: string, progress: number) => void;
  onError?: (error: Error) => void;
  backendTimeoutMs?: number; // max time to wait for backend before falling back
}

interface SCLSessionState {
  session: SCLSession | null;
  isGenerating: boolean;
  progress: { step: string; progress: number } | null;
  error: string | null;
  activeWorkflowId?: number | null;
}

export function useSCLSession(options: UseSCLSessionOptions = {}) {
  const [state, setState] = useState<SCLSessionState>({
    session: null,
    isGenerating: false,
    progress: null,
    error: null,
  activeWorkflowId: null,
  });

  // Always create a fresh orchestrator so we pick up the latest user settings.
  // Previously this was cached in a useRef, which meant changing provider in
  // Settings had no effect until a full page reload.
  const getOrchestrator = useCallback(() => {
    try {
      return createSCLOrchestrator();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to initialize SCL orchestrator';
      setState(prev => ({ ...prev, error: errorMsg }));
      options.onError?.(new Error(errorMsg));
      return null;
    }
  }, [options.onError]);

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
      // Prefer backend context summary; fallback to local static builder if unavailable
      let contextSummary: SCLContextSummary;
      try {
        contextSummary = await fetchContextSummary(session.seeds);
      } catch (e) {
        // Fallback: local builder
        contextSummary = knowledgeService.buildContextSummary(session);
      }

      // Indicate backend orchestration attempt
      setState(prev => ({
        ...prev,
        isGenerating: true,
        progress: { step: 'Backend: starting', progress: 0.05 }
      }));

      // Attempt to trigger orchestrator SCL workflow, pass seeds and constraints as override_input
    let startedWorkflowId: number | null = null;
      try {
        const start = await executeTemplateWorkflow({
          template: 'scl',
          execution_context: { sessionId: session.id, mode: session.mode },
          override_input: { seeds: session.seeds, constraints: session.constraints, contextSummary },
          created_by: 'frontend',
        });
        if (start && typeof start.workflow_id === 'number') {
          startedWorkflowId = start.workflow_id;
      setState(prev => ({ ...prev, activeWorkflowId: startedWorkflowId }));
        }
  } catch {
        // Non-fatal: continue with local generation
      }

      // If orchestrator started, poll briefly for a completed result to hydrate UI, else fall back to local path
      if (startedWorkflowId) {
        const controller = new AbortController();
        const timeoutMs = options.backendTimeoutMs ?? 15000;
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
          // Poll every 1.5s up to ~10 attempts
          for (let i = 0; i < 10; i++) {
            const wf: OrchestratorWorkflow = await getWorkflow(startedWorkflowId, controller.signal);
            if (wf.status === 'completed') {
              // Try to assemble outputs from task outputs
              const aggregated = aggregateWorkflowOutputs(wf);
        if (aggregated) {
                const score = calculateScore(aggregated.effects, aggregated.leaps, aggregated.synthesis);
                const updatedSession: SCLSession = {
                  ...session,
                  effectGraph: { nodes: aggregated.effects, edges: aggregated.edges },
                  leaps: aggregated.leaps,
                  synthesis: aggregated.synthesis,
                  score,
          source: 'backend',
                  status: 'complete',
                  updatedAt: Date.now(),
                };
    setState(prev => ({ ...prev, session: updatedSession, isGenerating: false, progress: null, activeWorkflowId: null }));
                return updatedSession;
              }
              break; // Completed but no parseable outputs; use local fallback
            }
            // Update progress hint
            setState(prev => ({ ...prev, progress: { step: `Backend: ${wf.status}`, progress: Math.min(0.8, (i + 1) / 12) } }));
            await new Promise(r => setTimeout(r, 1500));
          }
        } catch {
          // Ignore polling errors and fall back
        } finally {
          clearTimeout(timeout);
        }
      }

      // Fallback: Generate effects with the built context (local path)
      const updated = await generateEffects(session, contextSummary);
      if (updated) {
  setState(prev => ({ ...prev, session: { ...updated, source: 'local' }, isGenerating: false, progress: null, activeWorkflowId: null }));
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to generate effects with context';
      setState(prev => ({ ...prev, error: errorMsg, isGenerating: false }));
      options.onError?.(new Error(errorMsg));
    }
  }, [generateEffects, options.onError]);

  // Cancel any running backend workflow
  const cancelBackend = useCallback(async () => {
    const wfId = state.activeWorkflowId;
    if (!wfId) return;
    try {
      await cancelWorkflow(wfId);
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: null,
        activeWorkflowId: null,
        session: prev.session ? { ...prev.session, status: 'error', updatedAt: Date.now() } : prev.session,
      }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to cancel workflow';
      setState(prev => ({ ...prev, error: msg }));
    }
  }, [state.activeWorkflowId]);

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
  activeWorkflowId: state.activeWorkflowId,

    // Actions
    createSession,
    generateEffects,
    generateEffectsWithContext,
  cancelBackend,
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

// Try to map orchestrator workflow task outputs to SCL structures
function aggregateWorkflowOutputs(wf: OrchestratorWorkflow): null | {
  effects: SCLEffectNode[];
  edges: SCLEdge[];
  leaps: SCLLeap[];
  synthesis: SCLSynthesis;
} {
  try {
    const outputs: any[] = (wf.tasks || [])
      .map(t => (t as any).output_data)
      .filter(Boolean);

    // Helper to extract structures from a single output variant
    const pick = (o: any) => {
      if (!o) return { effects: [], edges: [], leaps: [], synthesis: null as SCLSynthesis | null };
      // common nests
      const candidate = o.result || o;
      const graph = candidate.graph || candidate.effectGraph || candidate;
      const effects = candidate.effects || graph.nodes || candidate.nodes || [];
      const edges = candidate.edges || graph.edges || candidate.links || [];
      const leaps = candidate.leaps || candidate.discontinuities || [];
      const synthesis = candidate.synthesis || candidate.summary || null;
      return { effects, edges, leaps, synthesis };
    };

    // Merge across tasks: take union of arrays and prefer latest non-empty synthesis
    const seenEffectIds = new Set<string>();
    const seenEdgePairs = new Set<string>();
    const mergedEffects: SCLEffectNode[] = [];
    const mergedEdges: SCLEdge[] = [];
    const mergedLeaps: SCLLeap[] = [];
    let finalSynthesis: SCLSynthesis | null = null;

    for (const out of outputs) {
      const { effects, edges, leaps, synthesis } = pick(out);
      for (const e of effects || []) {
        const id = (e as any).id || `${(e as any).title}-${(e as any).order}`;
        if (!seenEffectIds.has(id)) {
          seenEffectIds.add(id);
          mergedEffects.push(e as SCLEffectNode);
        }
      }
      for (const ed of edges || []) {
        const key = `${(ed as any).from}|${(ed as any).to}`;
        if (!seenEdgePairs.has(key)) {
          seenEdgePairs.add(key);
          mergedEdges.push(ed as SCLEdge);
        }
      }
      for (const l of leaps || []) {
        mergedLeaps.push(l as SCLLeap);
      }
      if (synthesis && (!finalSynthesis || Object.values(synthesis).some(arr => Array.isArray(arr) && arr.length))) {
        finalSynthesis = synthesis as SCLSynthesis;
      }
    }

    const synthesis: SCLSynthesis = finalSynthesis || {
      risks: [], opportunities: [], recommendedPractices: [], kpis: [], actionPlan: [], implementationOrder: [], successMetrics: []
    };

    if (mergedEffects.length || mergedEdges.length || mergedLeaps.length || (synthesis && (synthesis.actionPlan?.length || synthesis.risks?.length))) {
      return { effects: mergedEffects, edges: mergedEdges, leaps: mergedLeaps, synthesis };
    }
  } catch {
    // ignore
  }
  return null;
}
