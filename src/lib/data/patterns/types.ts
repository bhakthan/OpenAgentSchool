export type EvaluationCohortId =
  | 'education'
  | 'multi-agent'
  | 'advanced-automation'
  | 'communication-interface'
  | 'cognitive-sensing'

export type VelocityImpact = 'high' | 'medium' | 'low'

export interface VelocityProfile {
  impact: VelocityImpact
  timeToImplement: string // e.g., "1-2 hours", "1-2 days"
  complexityReduction: string // e.g., "High - reduces 200 LOC to 20 LOC"
  reusabilityScore: number // 1-10
  learningCurve: 'gentle' | 'moderate' | 'steep'
  velocityPractices: string[] // Which AVE practices this pattern exemplifies
}

export interface PatternEvaluationProfile {
  scenarioFocus: string
  criticalMetrics: string[]
  evaluationNotes: string[]
  cohort?: EvaluationCohortId
  readinessSignals?: string[]
  dataNeeds?: string[]
}

export interface PatternNode {
  id: string
  type: string
  data: {
    label: string
    description?: string
    nodeType?: 'input' | 'llm' | 'output' | 'router' | 'tool' | 'aggregator' | 'evaluator' | 'planner' | 'executor'
  }
  position: { x: number; y: number }
}

export interface PatternEdge {
  id: string
  source: string
  target: string
  type?: string
  label?: string
  animated?: boolean
  style?: {
    stroke?: string
    strokeWidth?: number
    strokeDasharray?: string
  }
}

export interface PatternData {
  id: string
  name: string
  description: string
  category?: string
  nodes: PatternNode[]
  edges: PatternEdge[]
  useCases: string[]
  codeExample: string
  pythonCodeExample?: string
  implementation: string[]
  whenToUse?: string
  advantages?: string[]
  limitations?: string[]
  relatedPatterns?: string[]
  businessUseCase?: {
    industry: string;
    description: string;
    visualization?: React.ComponentType | {
      type: string;
      layout?: string;
      steps?: string[];
    };
    enlightenMePrompt: string;
  }
  completeCode?: string;
  codeVisualizer?: React.ComponentType;
  evaluation?: string;
  evaluationProfile?: PatternEvaluationProfile;
  velocityProfile?: VelocityProfile;
}

export type PatternType = 
  | 'react'
  | 'prompt-chaining'
  | 'parallelization'
  | 'orchestrator-worker'
  | 'evaluator-optimizer'
  | 'routing'
  | 'autonomous-workflow'
  | 'deep-researcher'
  | 'deep-agents'
  | 'voice-agent'
  | 'agent-evaluation'
  | 'codeact-agent'
  | 'self-reflection'
  | 'agentic-rag'
  | 'modern-tool-use'
  | 'mcp'
  | 'agent-to-agent'
  | 'quantum-enhanced-navigator'
  | 'embodied-perception-action'
  | 'human-robot-collaboration'
  | 'hybrid-quantum-classical-agent'
  | 'quantum-sensing-agent'
  | 'quantum-accelerated-search'
  | 'deep-research-agent'
  | 'ignition-stack';
