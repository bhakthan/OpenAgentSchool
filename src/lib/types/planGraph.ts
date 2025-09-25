// Shared plan graph & subtask types for data autonomy patterns
export interface Subtask {
  id: string;
  goal: string;
  inputs: string[];
  outputs: string[];
  entities: string[];
  valid: boolean;
}

export interface PlanGraphEdge { from: string; to: string; reason: string }

export interface PlanGraphQuality { coverage: number; total: number }

export interface PlanGraph {
  nodes: Subtask[];
  edges: PlanGraphEdge[];
  quality: PlanGraphQuality;
}
