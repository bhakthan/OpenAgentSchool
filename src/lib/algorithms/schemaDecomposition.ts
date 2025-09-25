import { PlanGraph, Subtask, PlanGraphEdge } from '@/lib/types/planGraph';

/**
 * Deterministic stub LLM interface to allow testing without network
 */
export interface DraftSubtask { goal: string; inputs?: string[]; outputs?: string[]; entities?: string[] }
export interface DecompositionLLM { generateSubtasks(task: string, infoBox: any): Promise<DraftSubtask[]> }

export interface DecompositionOptions {
  maxSubtasks?: number;
}

export async function decomposeTask(
  task: string,
  infoBox: any,
  llm: DecompositionLLM,
  schemaIndex: Set<string>,
  opts: DecompositionOptions = {}
): Promise<PlanGraph> {
  const draft = await llm.generateSubtasks(task, infoBox);
  const limited = opts.maxSubtasks ? draft.slice(0, opts.maxSubtasks) : draft;
  const validated: Subtask[] = limited.map((s, i) => ({
    id: 'st_' + (i + 1),
    goal: s.goal,
    inputs: s.inputs || [],
    outputs: s.outputs || [],
    entities: (s.entities || []).filter(e => schemaIndex.has(e)),
    valid: (s.entities || []).every(e => schemaIndex.has(e))
  }));

  const edges: PlanGraphEdge[] = [];
  for (const a of validated) {
    for (const b of validated) {
      if (a.id !== b.id && a.outputs.some(o => b.inputs.includes(o))) {
        edges.push({ from: a.id, to: b.id, reason: 'output->input' });
      }
    }
  }

  const quality = { coverage: validated.filter(v => v.valid).length / (validated.length || 1), total: validated.length };
  return { nodes: validated, edges, quality };
}
