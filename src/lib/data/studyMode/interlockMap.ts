// Pattern Interlock Map data scaffold (#10)
export interface PatternInterlockEdge { from: string; to: string; type: 'enables'|'constrains'|'amplifies'; note?: string; }
export const patternInterlockEdges: PatternInterlockEdge[] = [
  { from: 'perception-normalization', to: 'schema-aware-decomposition', type: 'enables', note: 'Stable normalized signals allow reliable structural planning.' },
  { from: 'policy-gated-tool-invocation', to: 'action-grounding-verification', type: 'constrains', note: 'Policy filters restrict executable action set.' },
  { from: 'strategy-memory-replay', to: 'query-intent-structured-access', type: 'amplifies', note: 'Historical successful queries accelerate intent structuring.' }
];
