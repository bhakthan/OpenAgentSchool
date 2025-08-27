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
  | 'mechanism-audit';

export type SCLObjective = 'optimize' | 'minimizeRisk' | 'hitSLOs' | 'scaleTeam' | 'reduceComplexity';

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
