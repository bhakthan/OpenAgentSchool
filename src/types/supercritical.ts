/**
 * Super Critical Learning (SCL) Types
 * Based on Turing's second/third-order effects for agentic AI learning
 */

export type SCLDomain = 'ops' | 'product' | 'security' | 'org' | 'cost' | 'perf';

export type SCLMode =
  | 'consolidate'
  | 'extrapolate'
  | 'transfer'
  | 'stress-test'
  | 'intervene'
  | 'counterfactual'
  | 'leap-focus'
  | 'mechanism-audit'
  | 'red-team'
  | 'temporal-sim'
  | 'compose'
  | 'regulatory-impact';

export type SCLObjective =
  | 'optimize'
  | 'minimizeRisk'
  | 'hitSLOs'
  | 'scaleTeam'
  | 'reduceComplexity'
  // Perspective-specific additions
  | 'latencyTailReduction'
  | 'marginalLiftValidation'
  | 'calibratedConfidenceGap';

export const OBJECTIVE_LABELS: Record<SCLObjective, string> = {
  optimize: 'Optimize Outcomes',
  minimizeRisk: 'Minimize Risk',
  hitSLOs: 'Hit SLOs',
  scaleTeam: 'Scale Team Capability',
  reduceComplexity: 'Reduce Complexity',
  latencyTailReduction: 'Latency Tail Reduction',
  marginalLiftValidation: 'Marginal Lift Validation',
  calibratedConfidenceGap: 'Calibrated Confidence Gap'
};

export interface SCLEffectNode {
  id: string;
  title: string;
  order: 1 | 2 | 3;
  domain: SCLDomain;
  likelihood: number; // 0-1
  impact: number; // -5 to +5
  justification: string;
  references: string[]; // Links to concept/pattern pages
  confidence: number; // 0-1, for filtering low-confidence nodes
}

export interface SCLEdge {
  from: string;
  to: string;
  confidence: number; // 0-1
  mechanism: string; // How the effect propagates
  delay?: string; // Time lag for the effect (e.g., "2-4 weeks", "immediate")
}

export interface SCLLeap {
  trigger: string; // What causes the discontinuity
  threshold: string; // At what point it occurs
  result: string; // What changes qualitatively
  mechanism: string; // Why it happens
  evidence: string[]; // Supporting references
  confidence: number; // 0-1
}

// ── Deep Dive Types ─────────────────────────────────────────────────────────

export type DeepDiveLevel = 'secondary' | 'tertiary';

/**
 * A deep dive round drills into selected effects from the parent analysis.
 *
 * Secondary: breaks each selected effect into 3-5 granular sub-effects,
 *   discovers cross-connections, and produces implementation-level insights.
 *
 * Tertiary: generates operational playbooks, quantitative projections,
 *   failure-mode analysis (FMEA), and mitigation comparisons.
 */
export interface SCLDeepDive {
  id: string;
  level: DeepDiveLevel;
  /** IDs of effect nodes the user selected for deeper analysis */
  selectedNodeIds: string[];
  /** The resolved nodes from the parent graph (snapshot at drill-time) */
  selectedNodes: SCLEffectNode[];
  /** Optional user prompt to steer the deep dive focus */
  userQuestion?: string;
  /** Sub-effects discovered by drilling into the selected nodes */
  effects: SCLEffectNode[];
  /** New edges among the sub-effects and back to parent effects */
  edges: SCLEdge[];
  /** New leaps discovered at this level */
  leaps: SCLLeap[];
  /** Level-specific findings */
  findings: DeepDiveFindings;
  /** Token/audit info for this round */
  promptTokens: number;
  responseTokens: number;
  createdAt: number;
}

/** Secondary deep dive findings — implementation-level detail */
export interface SecondaryFindings {
  kind: 'secondary';
  /** Granular risks not visible at the top level */
  hiddenRisks: string[];
  /** Cross-connections between selected effects */
  crossConnections: string[];
  /** Concrete implementation recommendations */
  implementationSteps: string[];
  /** Revised KPIs that replace or refine the top-level ones */
  revisedKPIs: string[];
  /** Open questions that a tertiary dive could answer */
  openQuestions: string[];
}

/** Tertiary deep dive findings — operational playbook level */
export interface TertiaryFindings {
  kind: 'tertiary';
  /** Step-by-step operational runbook */
  runbook: string[];
  /** Specific tool/technology recommendations */
  toolRecommendations: Array<{
    tool: string;
    purpose: string;
    tradeoffs: string;
  }>;
  /** Failure Mode and Effects Analysis entries */
  fmeaEntries: Array<{
    failureMode: string;
    cause: string;
    effect: string;
    severity: number;   // 1-10
    likelihood: number; // 1-10
    detection: number;  // 1-10
    rpn: number;        // severity × likelihood × detection
    mitigation: string;
  }>;
  /** Quantitative projections */
  projections: Array<{
    metric: string;
    baseline: string;
    projected: string;
    timeframe: string;
    confidence: number; // 0-1
  }>;
  /** Compared mitigation strategies */
  mitigationComparison: Array<{
    strategy: string;
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    timeToValue: string;
    risks: string;
  }>;
}

export type DeepDiveFindings = SecondaryFindings | TertiaryFindings;

export interface SCLConstraints {
  budget: 'low' | 'medium' | 'high' | 'unlimited';
  latencyP99?: number; // milliseconds
  accuracy?: number; // 0-1
  complianceProfile: 'none' | 'basic' | 'strict' | 'regulated';
  teamSize?: number;
  timeHorizon: '1month' | '3months' | '6months' | '1year' | '2years';
  extras?: Record<string, any>; // mode-specific configuration hooks
}

export interface SCLSynthesis {
  risks: string[];
  opportunities: string[];
  recommendedPractices: string[];
  kpis: string[];
  actionPlan: string[];
  implementationOrder: string[]; // Priority sequence
  successMetrics: string[];
}

export interface SCLScore {
  completeness: number; // 0-1, coverage of effect chains
  secondOrderDepth: number; // Count of valid 2nd-order nodes
  thirdOrderDepth: number; // Count of valid 3rd-order nodes
  novelty: number; // 0-1, % nodes not in canned library
  feasibility: number; // 0-1, weighted positive impact × feasibility
  leapDetection: number; // 0-1, quality of leap identification
  deepDiveDepth: number; // 0 = initial only, 1 = secondary, 2 = tertiary
  totalSubEffects: number; // Cumulative effects from all deep dives
}

export interface SCLAudit {
  sources: string[]; // Which concepts/patterns were used
  model: string; // LLM model used
  version: string; // SCL version
  timestamp: number;
  promptTokens: number;
  responseTokens: number;
}

export interface SCLSession {
  id: string;
  userId?: string;
  mode: SCLMode;
  // Indicates where the current outputs came from
  source?: 'backend' | 'local';
  
  // Inputs
  seeds: {
    conceptIds: string[];
    patternIds: string[];
    practices: string[];
  };
  objectives: SCLObjective[];
  constraints: SCLConstraints;
  
  // Outputs
  effectGraph: {
    nodes: SCLEffectNode[];
    edges: SCLEdge[];
  };
  leaps: SCLLeap[];
  synthesis: SCLSynthesis;
  
  // Deep dive rounds (secondary / tertiary)
  deepDives: SCLDeepDive[];
  
  // Scoring
  score: SCLScore;
  
  // Metadata
  audit: SCLAudit;
  createdAt: number;
  updatedAt: number;
  status: 'draft' | 'generating' | 'complete' | 'error';
}

// For LLM orchestration
export interface SCLContextSummary {
  concepts: Array<{
    id: string;
    title: string;
    keyMechanisms: string[];
    dependencies: string[];
    guarantees: string[];
  }>;
  patterns: Array<{
    id: string;
    title: string;
    components: string[];
    tradeoffs: string[];
    applicability: string[];
  }>;
  practices: Array<{
    id: string;
    title: string;
    outcomes: string[];
    prerequisites: string[];
    risks: string[];
  }>;
}

// Context Summary for LLM Generation
export interface SCLContextSummary {
  concepts: Array<{
    id: string;
    title: string;
    keyMechanisms: string[];
    dependencies: string[];
    guarantees: string[];
  }>;
  patterns: Array<{
    id: string;
    title: string;
    components: string[];
    tradeoffs: string[];
    applicability: string[];
  }>;
  practices: Array<{
    id: string;
    title: string;
    outcomes: string[];
    prerequisites: string[];
    risks: string[];
  }>;
}

// UI State Management
export interface SCLUIState {
  activeTab: 'inputs' | 'graph' | 'synthesis';
  selectedNodes: string[];
  filteredDomains: SCLDomain[];
  showOnlyHighConfidence: boolean;
  graphLayout: 'hierarchical' | 'force' | 'circular';
  expandedSections: {
    constraints: boolean;
    leaps: boolean;
    synthesis: boolean;
  };
}

// Analytics Events
export interface SCLAnalyticsEvent {
  type: 'scl_session_start' | 'scl_graph_expanded' | 'scl_leap_detected' | 
        'scl_synthesis_viewed' | 'scl_export' | 'scl_mode_switch';
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp: number;
}
