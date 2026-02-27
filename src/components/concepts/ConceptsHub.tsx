import { useState, useMemo, useEffect, lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowsHorizontal, Shield, Stack, ArrowRight, CheckCircle, BookOpen, LinkSimple, Graph, ChartBar, Clock, Lock, Users, Question, Robot, Target, Atom, Database, Lightbulb, MagnifyingGlass, CaretRight, Funnel, Eye } from "@phosphor-icons/react"
import { ShareButton } from "@/components/ui/ShareButton"
import { CriticalThinkingModal } from "../common/CriticalThinkingModal"
import { getConceptCue } from "@/lib/data/conceptCues"
import { registerConceptsForVoice } from "@/lib/voiceNavigation"
import InlineMicButton from "@/components/voice/InlineMicButton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// ── Lazy-loaded concept components (code-split per concept) ──────────────
const LearningHowToLearnConcept = lazy(() => import("./LearningHowToLearnConcept"))
const AIAgentsConcept = lazy(() => import("./AIAgentsConcept"))
const A2ACommunicationConcept = lazy(() => import("./A2ACommunicationConcept"))
const MCPConcept = lazy(() => import("./MCPConcept"))
const ACPConcept = lazy(() => import("./ACPConcept"))
const MCPxA2AIntegrationConcept = lazy(() => import("./MCPxA2AIntegrationConcept"))
const FlowVisualizationConcept = lazy(() => import("./FlowVisualizationConcept"))
const DataVisualizationConcept = lazy(() => import("./DataVisualizationConcept"))
const AgentArchitectureConcept = lazy(() => import("./AgentArchitectureConcept"))
const AgentSecurityConcept = lazy(() => import("./AgentSecurityConcept"))
const MultiAgentSystemsConcept = lazy(() => import("./MultiAgentSystemsConcept"))
const AgentDeploymentConcept = lazy(() => import("./AgentDeploymentConcept"))
const AgentEthicsConcept = lazy(() => import("./AgentEthicsConcept"))
const AgentLearningConcept = lazy(() => import("./AgentLearningConcept"))
const AgentIntegrationConcept = lazy(() => import("./AgentIntegrationConcept"))
const AgentEvaluationConcept = lazy(() => import("./AgentEvaluationConcept"))
const FineTuningConcept = lazy(() => import("./FineTuningConcept"))
const AgenticCommerceAP2Concept = lazy(() => import("./AgenticCommerceAP2Concept"))
const ProductManagementConcept = lazy(() => import("./ProductManagementConcept"))
const AgentOpsConcept = lazy(() => import("./AgentOpsConcept"))
const AgenticRoboticsConcept = lazy(() => import("./AgenticRoboticsConcept"))
const QuantumAIRoboticsConcept = lazy(() => import("./QuantumAIRoboticsConcept"))
const AzureAISafetyAndGovernance = lazy(() => import("./AzureAISafetyAndGovernance"))
const AgenticPromptingFundamentals = lazy(() => import("./AgenticPromptingFundamentals"))
const PromptOptimizationPatterns = lazy(() => import("./PromptOptimizationPatterns"))
const AgentInstructionDesign = lazy(() => import("./AgentInstructionDesign"))
const AgenticWorkflowControl = lazy(() => import("./AgenticWorkflowControl"))
const AgentEvaluationMethodologies = lazy(() => import("./AgentEvaluationMethodologies"))
const AgenticAIDesignTaxonomy = lazy(() => import("./AgenticAIDesignTaxonomy"))
const ProgramSetupNorthStarConcept = lazy(() => import("./ProgramSetupNorthStarConcept"))
const ResponsibleAIGovernanceConcept = lazy(() => import("./ResponsibleAIGovernanceConcept"))
const StrategyPortfolioManagementConcept = lazy(() => import("./StrategyPortfolioManagementConcept"))
const DataKnowledgeOperationsConcept = lazy(() => import("./DataKnowledgeOperationsConcept"))
const AIReadyDataConcept = lazy(() => import("./AIReadyDataConcept"))
const ArchitecturePlatformOperationsConcept = lazy(() => import("./ArchitecturePlatformOperationsConcept"))
const ExperimentationContinuousImprovementConcept = lazy(() => import("./ExperimentationContinuousImprovementConcept"))
const EcosystemPartnershipsConcept = lazy(() => import("./EcosystemPartnershipsConcept"))
const OrganizationalEnablementConcept = lazy(() => import("./OrganizationalEnablementConcept"))
const AIProductFrameworkConcept = lazy(() => import("./AIProductFrameworkConcept"))
const ClientCodingAgentsConcept = lazy(() => import("./ClientCodingAgentsConcept"))
const AgentSkillsConcept = lazy(() => import("./AgentSkillsConcept"))
const AgentRedTeamingConcept = lazy(() => import("./AgentRedTeamingConcept"))
const AgentTroubleshootingPlaybook = lazy(() => import("./AgentTroubleshootingPlaybook"))
const AgentEconomicsConcept = lazy(() => import("./AgentEconomicsConcept"))
const AgentCareerPathsConcept = lazy(() => import("./AgentCareerPathsConcept"))
const IndustryAgentsConcept = lazy(() => import("./IndustryAgentsConcept"))
const AgentTemplatesHub = lazy(() => import("./AgentTemplatesHub"))
const AgentReasoningPatternsConcept = lazy(() => import("./AgentReasoningPatternsConcept"))
const AgentMemorySystemsConcept = lazy(() => import("./AgentMemorySystemsConcept"))
const AgentObservabilityConcept = lazy(() => import("./AgentObservabilityConcept"))
const AgentTestingBenchmarksConcept = lazy(() => import("./AgentTestingBenchmarksConcept"))
const PromptInjectionDefenseConcept = lazy(() => import("./PromptInjectionDefenseConcept"))
const HumanInTheLoopPatternsConcept = lazy(() => import("./HumanInTheLoopPatternsConcept"))
const AgentCostOptimizationConcept = lazy(() => import("./AgentCostOptimizationConcept"))
const EdgeAgentConcept = lazy(() => import("./EdgeAgentConcept"))
const AtomicLLMTrainingConcept = lazy(() => import("./AtomicLLMTrainingConcept"))
const XYZClawConcept = lazy(() => import("./XYZClawConcept"))
const TriSystemParadigmConcept = lazy(() => import("./TriSystemParadigmConcept"))
const ContextEngineeringConcept = lazy(() => import("./ContextEngineeringConcept"))
const ProactiveAgentDesignConcept = lazy(() => import("./ProactiveAgentDesignConcept"))

// Loading fallback for lazy concept components
const ConceptLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

interface ConceptInfo {
  id: string
  title: string
  description: string
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced' | 'applied'
  icon: React.ReactNode
  color: string
  estimatedTime: string
  prerequisites: string[]
  component?: React.ComponentType<{ onMarkComplete?: () => void; onNavigateToNext?: (nextConceptId: string) => void }>
  externalPath?: string
}

const concepts: ConceptInfo[] = [
  // Tier 0: Meta-Learning Foundation
  {
    id: 'learning-how-to-learn',
    title: 'Learning How to Learn',
    description: 'The one skill that makes every other skill easier—master how your brain actually learns.',
    level: 'fundamentals',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-amber-900/20 dark:text-amber-300',
    estimatedTime: '20-30 min',
    prerequisites: [],
    component: LearningHowToLearnConcept
  },
  // Tier 0: Foundation - Design Taxonomy
  {
    id: 'agentic-ai-design-taxonomy',
    title: 'Agentic AI Design Taxonomy',
  description: 'A mental map of every major agent pattern—so you always know what you\'re building, why, and what\'s next.',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '45-60 min',
    prerequisites: [],
    component: AgenticAIDesignTaxonomy
  },
  // Tier 1: Core Concepts (Prompting & Optimization)
  {
    id: 'agentic-prompting-fundamentals',
    title: 'Agentic Prompting Fundamentals',
  description: 'Learn the 20% prompting moves that unlock 80% of agent reliability and control.',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-blue-900/20 dark:text-blue-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agentic-ai-design-taxonomy'],
    component: AgenticPromptingFundamentals
  },
  {
    id: 'prompt-optimization-patterns',
    title: 'Prompt Optimization Patterns',
  description: 'Turn brittle prompts into stable systems using repeatable refactor patterns—not guesswork.',
    level: 'fundamentals',
    icon: <ChartBar className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-green-900/20 dark:text-green-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agentic-prompting-fundamentals'],
    component: PromptOptimizationPatterns
  },
  {
    id: 'agent-instruction-design',
    title: 'Agent Instruction Design',
  description: 'Shape agent behavior with layered instruction scaffolds that stay steerable under real-world drift.',
    level: 'fundamentals',
    icon: <BookOpen className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-purple-900/20 dark:text-purple-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agentic-prompting-fundamentals'],
    component: AgentInstructionDesign
  },
  {
    id: 'agentic-workflow-control',
    title: 'Agentic Workflow Control',
  description: 'Orchestrate multi-step, multi-tool flows without timing chaos or context bleed.',
    level: 'fundamentals',
    icon: <ArrowsHorizontal className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-orange-900/20 dark:text-orange-300',
    estimatedTime: '40-50 min',
    prerequisites: ['prompt-optimization-patterns', 'agent-instruction-design'],
    component: AgenticWorkflowControl
  },
  {
    id: 'agent-evaluation-methodologies',
    title: 'Agent Evaluation Methodologies',
  description: 'Know when your agent is actually improving—quant + LLM-as-judge + failure pattern surfacing.',
    level: 'fundamentals',
    icon: <ChartBar className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-cyan-900/20 dark:text-cyan-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agentic-workflow-control'],
    component: AgentEvaluationMethodologies
  },
  // Tier 1: Foundational Concepts
  {
    id: 'agent-architecture',
    title: 'Agent Architecture & Lifecycle',
  description: 'See how perception, reasoning, memory, and action really fit—and where failures usually emerge.',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-blue-900/20 dark:text-blue-300',
    estimatedTime: '25-35 min',
    prerequisites: [],
    component: (props) => {
      const [isModalOpen, setModalOpen] = useState(false)

      return (
        <>
          <AgentArchitectureConcept {...props} />
        </>
      )
    }
  },
  {
    id: 'agent-security',
    title: 'Agent Security & Trust',
  description: 'Build agents that can’t silently exfiltrate, escalate, or hallucinate authority.',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-architecture'],
    component: AgentSecurityConcept
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
  description: 'Design agent teams that collaborate intentionally—no emergent spaghetti.',
    level: 'fundamentals',
    icon: <Users className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-green-900/20 dark:text-green-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: MultiAgentSystemsConcept
  },
  {
    id: 'xyz-claw',
    title: 'XYZ-Claw: Multi-Agent Orchestration',
    description: 'Build a production multi-agent backend end-to-end—queues, isolation, team collaboration, and real-world scenarios.',
    level: 'implementation',
    icon: <Robot className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-emerald-900/20 dark:text-emerald-300',
    estimatedTime: '60-90 min',
    prerequisites: ['multi-agent-systems', 'agent-architecture'],
    component: XYZClawConcept
  },
  {
    id: 'agent-ethics',
    title: 'Agent Ethics & Governance',
  description: 'Embed guardrails that adapt across contexts without freezing innovation.',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-yellow-900/20 dark:text-yellow-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: AgentEthicsConcept
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
  description: 'What truly separates an “agent” from a chat wrapper—and how to cross that line.',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-purple-900/20 dark:text-purple-300',
    estimatedTime: '20-30 min',
    prerequisites: ['agentic-ai-design-taxonomy'],
    component: AIAgentsConcept
  },
  {
    id: 'ai-safety-governance',
    title: 'AI Safety and Governance',
  description: 'Shift from reactive patching to proactive tracing, containment, and escalation design.',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-cyan-900/20 dark:text-cyan-300',
    estimatedTime: '40-60 min',
    prerequisites: [],
    component: AzureAISafetyAndGovernance
  },
  {
    id: 'atomic-llm-training',
    title: 'Atomic LLM Training (microGPT)',
    description: 'See every line of a working GPT — 200 lines of pure Python, zero dependencies, full understanding.',
    level: 'fundamentals',
    icon: <Atom className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-amber-900/20 dark:text-amber-300',
    estimatedTime: '50-70 min',
    prerequisites: [],
    component: AtomicLLMTrainingConcept
  },
  {
    id: 'program-setup-north-star',
    title: 'Program Setup & North Star',
    description: 'Align mission, metrics, and maturity before scaling agent initiatives across the organization.',
    level: 'fundamentals',
    icon: <ArrowRight className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-amber-900/20 dark:text-amber-300',
    estimatedTime: '30-40 min',
    prerequisites: [],
    component: ProgramSetupNorthStarConcept
  },
  {
    id: 'responsible-ai-governance',
    title: 'Responsible AI Governance Playbooks',
    description: 'Operationalize policies, risk reviews, and escalation paths that keep agents compliant day-to-day.',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '35-45 min',
    prerequisites: ['ai-safety-governance', 'agent-ethics'],
    component: ResponsibleAIGovernanceConcept
  },
  {
    id: 'ai-product-framework',
    title: 'AI Product Framework (8 Pillars)',
    description: 'Trust-centric design from PM lens—turn ethics into KPIs with interactive visualization.',
    level: 'applied',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-purple-900/20 dark:text-purple-300',
    estimatedTime: '40-50 min',
    prerequisites: ['responsible-ai-governance'],
    component: AIProductFrameworkConcept
  },
  // Tier 2: Architecture Concepts
  {
    id: 'a2a-communication',
    title: 'A2A Communication',
  description: 'Move from message passing to meaningful shared intent and negotiated roles.',
    level: 'architecture',
    icon: <ArrowsHorizontal className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-blue-900/20 dark:text-blue-300',
    estimatedTime: '25-35 min',
    prerequisites: ['multi-agent-systems'],
    component: A2ACommunicationConcept
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
  description: 'Standardize tool access so adding capability doesn’t add fragility.',
    level: 'architecture',
    icon: <Shield className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-orange-900/20 dark:text-orange-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-security'],
    component: MCPConcept
  },
  {
    id: 'client-coding-agents',
    title: 'Client Coding Agents',
    description: 'Master CLI-native AI agents—Copilot CLI, Claude Code, Codex CLI, Gemini CLI—the 2026 shift from vibe coding to terminal-first development.',
    level: 'architecture',
    icon: <Robot className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-purple-900/20 dark:text-purple-300',
    estimatedTime: '45-55 min',
    prerequisites: ['mcp', 'agent-architecture'],
    component: ClientCodingAgentsConcept
  },
  {
    id: 'agent-skills',
    title: 'Agent Skills',
    description: 'Extend agents with modular SKILL.md files—reusable expertise that loads on demand without bloating context.',
    level: 'architecture',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-cyan-900/20 dark:text-cyan-300',
    estimatedTime: '40-50 min',
    prerequisites: ['client-coding-agents', 'mcp'],
    component: AgentSkillsConcept
  },
  {
    id: 'flow-visualization',
    title: 'Flow Visualization',
  description: 'Make invisible reasoning paths and coordination bottlenecks obvious at a glance.',
    level: 'architecture',
    icon: <Graph className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-teal-900/20 dark:text-teal-300',
    estimatedTime: '30-40 min',
    prerequisites: ['a2a-communication'],
    component: FlowVisualizationConcept
  },
  {
    id: 'agent-evaluation',
    title: 'Agent Evaluation',
  description: 'Instrument architecture-level signals before user complaints become your metrics.',
    level: 'architecture',
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  color: 'bg-background text-foreground/80 dark:bg-green-900/20 dark:text-green-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-architecture'],
    component: AgentEvaluationConcept
  },
  {
    id: 'strategy-portfolio-management',
    title: 'Strategy & Portfolio Management',
    description: 'Prioritize the right agent investments with living roadmaps and defensible ROI models.',
    level: 'architecture',
    icon: <Graph className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-lime-900/20 dark:text-lime-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture', 'agentic-ai-design-taxonomy'],
    component: StrategyPortfolioManagementConcept
  },
  {
    id: 'ai-ready-data',
    title: 'AI-Ready Data',
    description: 'Build decision-grade data foundations that AI can trust—address constraints, earn organizational trust, and transform raw data into automation-ready assets.',
    level: 'architecture',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-emerald-900/20 dark:text-emerald-300',
    estimatedTime: '60-75 min',
    prerequisites: ['agent-architecture', 'strategy-portfolio-management'],
    component: AIReadyDataConcept
  },
  {
    id: 'context-engineering',
    title: 'Context Engineering',
    description: 'Reduce entropy between intent and action—collect, compress, organize, and select the right context at the right time.',
    level: 'architecture',
    icon: <Funnel className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-sky-900/20 dark:text-sky-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-architecture', 'agentic-prompting-fundamentals'],
    component: ContextEngineeringConcept
  },
  // Tier 3: Implementation Concepts
  {
    id: 'acp',
    title: 'Agent Communication Protocol',
  description: 'A resilient contract so heterogeneous agents interoperate without version drama.',
    level: 'implementation',
    icon: <Stack className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-purple-900/20 dark:text-purple-300',
    estimatedTime: '35-45 min',
    prerequisites: ['a2a-communication'],
    component: ACPConcept
  },
  {
    id: 'mcp-a2a-integration',
    title: 'MCP x A2A Integration',
  description: 'Fuse tool invocation and agent dialogue into one coherent capability fabric.',
    level: 'implementation',
    icon: <LinkSimple className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-cyan-900/20 dark:text-cyan-300',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp', 'a2a-communication'],
    component: MCPxA2AIntegrationConcept
  },
  {
    id: 'data-visualization',
    title: 'MCP Apps & Agent UI',
    description: 'Build interactive UIs agents can render in chat—the 2026 standard for human-AI collaboration.',
    level: 'implementation',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '35-45 min',
    prerequisites: ['flow-visualization'],
    component: DataVisualizationConcept,
    isNew: true
  },
  {
    id: 'data-knowledge-operations',
    title: 'Data & Knowledge Operations',
    description: 'Engineer trustworthy data supply chains and knowledge governance for durable agent context.',
    level: 'implementation',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-sky-900/20 dark:text-sky-300',
    estimatedTime: '40-50 min',
    prerequisites: ['ai-ready-data', 'data-visualization'],
    component: DataKnowledgeOperationsConcept
  },
  // Tier 4: Advanced Concepts
  {
    id: 'tri-system-paradigm',
    title: 'The Tri-System Paradigm',
    description: "Kahneman's dual-process theory extended to AI—understand cognitive surrender, epistemic dependence, and the centaur model of human-AI collaboration.",
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-violet-900/20 dark:text-violet-300',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-ethics'],
    component: TriSystemParadigmConcept
  },
  {
    id: 'agent-deployment',
    title: 'Agent Deployment & Operations',
  description: 'Ship agents like services: reproducible, observable, roll-forward safe.',
    level: 'advanced',
    icon: <Lock className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '40-50 min',
    prerequisites: ['acp'],
    component: AgentDeploymentConcept
  },
  {
    id: 'agent-learning',
    title: 'Agent Learning & Adaptation',
  description: 'Improve behavior without catastrophic forgetting or runaway drift.',
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '45-55 min',
    prerequisites: ['ai-agents'],
    component: AgentLearningConcept
  },
  {
    id: 'agent-integration',
    title: 'Agent Integration Patterns',
  description: 'Thread agents into legacy and event-driven stacks without creating hidden coupling.',
    level: 'advanced',
    icon: <LinkSimple className="w-6 h-6" />,
    color: 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp-a2a-integration'],
    component: AgentIntegrationConcept
  }
  ,
  {
    id: 'fine-tuning',
    title: 'Fine-Tuning Methods (SFT, DPO, RFT)',
  description: 'Stop overtraining—choose the lowest intervention (SFT → DPO → RFT) that proves incremental lift.',
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '45-55 min',
    prerequisites: ['agent-learning'],
  component: FineTuningConcept
  }
  ,
  {
    id: 'agentic-commerce-ap2',
    title: 'Agentic Commerce: UCP & AP2',
    description: 'Universal Commerce Protocol + Agent Payments for discovery, checkout, and trusted transactions.',
    level: 'advanced',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-pink-900/20 dark:text-pink-300',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp-a2a-integration', 'agent-security'],
    component: AgenticCommerceAP2Concept
  }
  ,
  {
    id: 'product-management',
    title: 'AI Product Management',
    description: 'Design metrics, experiments & calibrated confidence signals that compound user trust and retention.',
    level: 'advanced',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-teal-900/20 dark:text-teal-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agentic-ai-design-taxonomy'],
    component: ProductManagementConcept
  }
  ,
  {
    id: 'agent-red-teaming',
    title: 'Agent Red Teaming',
    description: 'Proactive security testing: simulate adversarial attacks to find AI vulnerabilities before they\'re exploited.',
    level: 'advanced',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '50-60 min',
    prerequisites: ['agent-evaluation', 'agent-security', 'ai-safety-governance'],
    component: AgentRedTeamingConcept
  }
  ,
  {
    id: 'agent-ops',
    title: 'Agent Ops & Reliability',
    description: 'Operational excellence: golden signals, graceful degradation, failure containment & resilience patterns.',
    level: 'advanced',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-orange-900/20 dark:text-orange-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-deployment','agent-security'],
    component: AgentOpsConcept
  }
  ,
  {
    id: 'agentic-robotics-integration',
    title: 'Agentic Robotics Integration',
    description: 'Fuse Gemini Robotics perception, planning, and safety pipelines into embodied agent programs.',
    level: 'advanced',
    icon: <Robot className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-emerald-900/20 dark:text-emerald-300',
    estimatedTime: '45-60 min',
    prerequisites: ['agent-architecture', 'agent-integration'],
    component: AgenticRoboticsConcept
  }
  ,
  {
    id: 'quantum-ai-robotics',
    title: 'Quantum-Enhanced AI & Robotics',
    description: 'Harness quantum phenomena for next-gen perception, planning, and learning in embodied AI systems.',
    level: 'advanced',
    icon: <Atom className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-violet-900/20 dark:text-violet-300',
    estimatedTime: '60-75 min',
    prerequisites: ['agent-learning', 'agentic-robotics-integration', 'agent-architecture'],
    component: QuantumAIRoboticsConcept
  }
  ,
  {
    id: 'edge-agent',
    title: 'Edge Agent',
    description: 'Move agents from cloud to factory floor—master edge inference, IT/OT bridging, and real-time guarantees for physical AI.',
    level: 'advanced',
    icon: <Robot className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-orange-900/20 dark:text-orange-300',
    estimatedTime: '50-65 min',
    prerequisites: ['agent-deployment', 'agentic-robotics-integration', 'agent-ops'],
    component: EdgeAgentConcept
  }
  ,
  {
    id: 'architecture-platform-operations',
    title: 'Architecture & Platform Operations',
    description: 'Scale shared platform services, guardrails, and reference architectures for enterprise-grade agents.',
    level: 'advanced',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-slate-900/20 dark:text-slate-300',
    estimatedTime: '40-60 min',
    prerequisites: ['agent-deployment', 'agent-ops'],
    component: ArchitecturePlatformOperationsConcept
  }
  ,
  {
    id: 'experimentation-continuous-improvement',
    title: 'Experimentation & Continuous Improvement',
    description: 'Stand up evaluation pipelines and feedback loops that keep agents improving after launch.',
    level: 'advanced',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-rose-900/20 dark:text-rose-300',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-ops', 'agentic-commerce-ap2'],
    component: ExperimentationContinuousImprovementConcept
  }
  ,
  {
    id: 'ecosystem-partnerships',
    title: 'Ecosystem & Partnerships',
    description: 'Evaluate vendors and community alliances with shared value, compliance, and interoperability in mind.',
    level: 'advanced',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-emerald-900/20 dark:text-emerald-300',
    estimatedTime: '30-40 min',
    prerequisites: ['strategy-portfolio-management'],
    component: EcosystemPartnershipsConcept
  }
  ,
  {
    id: 'organizational-enablement',
    title: 'Organizational Enablement',
    description: 'Design operating models, talent pathways, and incentives that make agent adoption stick.',
    level: 'advanced',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-yellow-900/20 dark:text-yellow-300',
    estimatedTime: '35-45 min',
    prerequisites: ['program-setup-north-star'],
    component: OrganizationalEnablementConcept
  },
  // New 2026 Production Foundations
  {
    id: 'agent-reasoning-patterns',
    title: 'Agent Reasoning Patterns',
    description: 'Chain-of-Thought, Tree-of-Thought, Graph-of-Thought, Reflexion—teach agents to think, not just respond.',
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-violet-900/20 dark:text-violet-300',
    estimatedTime: '45-55 min',
    prerequisites: ['agent-architecture', 'agentic-prompting-fundamentals'],
    component: AgentReasoningPatternsConcept
  },
  {
    id: 'agent-memory-systems',
    title: 'Agent Memory Systems',
    description: 'Working, short-term, long-term, episodic, semantic—build agents that remember across sessions.',
    level: 'advanced',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-cyan-900/20 dark:text-cyan-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-architecture', 'data-knowledge-operations'],
    component: AgentMemorySystemsConcept
  },
  {
    id: 'agent-observability',
    title: 'Agent Observability',
    description: 'Tracing, logging, metrics, debugging, cost tracking—see everything your agents do in production.',
    level: 'advanced',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-emerald-900/20 dark:text-emerald-300',
    estimatedTime: '45-55 min',
    prerequisites: ['agent-ops', 'agent-deployment'],
    component: AgentObservabilityConcept
  },
  {
    id: 'agent-testing-benchmarks',
    title: 'Agent Testing & Benchmarks',
    description: 'Unit evals, LLM-as-judge, regression testing, benchmark suites—measure agent quality systematically.',
    level: 'advanced',
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    color: 'bg-background text-foreground/80 dark:bg-lime-900/20 dark:text-lime-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-evaluation', 'agent-evaluation-methodologies'],
    component: AgentTestingBenchmarksConcept
  },
  {
    id: 'prompt-injection-defense',
    title: 'Prompt Injection Defense',
    description: 'Direct injection, indirect injection, data exfiltration, jailbreaking—protect agents from attacks.',
    level: 'advanced',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-security', 'agent-red-teaming'],
    component: PromptInjectionDefenseConcept
  },
  {
    id: 'human-in-the-loop-patterns',
    title: 'Human-in-the-Loop Patterns',
    description: 'Approval workflows, escalation paths, feedback loops, oversight dashboards—keep humans in control.',
    level: 'advanced',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '45-55 min',
    prerequisites: ['agent-ops', 'agent-ethics'],
    component: HumanInTheLoopPatternsConcept
  },
  {
    id: 'agent-cost-optimization',
    title: 'Agent Cost Optimization',
    description: 'Token budgets, caching, model routing, batch processing—reduce LLM costs by 50-90%.',
    level: 'advanced',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-green-900/20 dark:text-green-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-deployment', 'agent-observability'],
    component: AgentCostOptimizationConcept
  },
  {
    id: 'proactive-agent-design',
    title: 'Proactive Agent Design',
    description: 'From reactive copilots to autonomous sentinels—design agents that act before you ask.',
    level: 'advanced',
    icon: <Eye className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-violet-900/20 dark:text-violet-300',
    estimatedTime: '45-60 min',
    prerequisites: ['agent-architecture', 'multi-agent-systems', 'human-in-the-loop-patterns'],
    component: ProactiveAgentDesignConcept
  },
  // Tier 5: Applied (Enterprise Adoption & Career Growth)
  {
    id: 'agent-troubleshooting',
    title: 'Agent Troubleshooting Playbook',
    description: 'Systematic debugging when production agents fail—from context collapse to tool timeouts.',
    level: 'applied',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-red-900/20 dark:text-red-300',
    estimatedTime: '40-50 min',
    prerequisites: ['agent-ops', 'agent-deployment'],
    component: AgentTroubleshootingPlaybook
  },
  {
    id: 'agent-economics',
    title: 'Agent Economics',
    description: 'Build business cases: cost models, pricing strategies, ROI frameworks that secure budgets.',
    level: 'applied',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-green-900/20 dark:text-green-300',
    estimatedTime: '35-45 min',
    prerequisites: ['strategy-portfolio-management'],
    component: AgentEconomicsConcept
  },
  {
    id: 'agent-career-paths',
    title: 'Agent Career Paths',
    description: 'Navigate AI agent roles—skills, certifications, salaries, and growth trajectories.',
    level: 'applied',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-blue-900/20 dark:text-blue-300',
    estimatedTime: '30-40 min',
    prerequisites: [],
    component: AgentCareerPathsConcept
  },
  {
    id: 'industry-agents',
    title: 'Industry-Specific Agents',
    description: 'Patterns for Healthcare, Finance, Legal, Education, Manufacturing—regulations and use cases.',
    level: 'applied',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-teal-900/20 dark:text-teal-300',
    estimatedTime: '45-55 min',
    prerequisites: ['agent-architecture', 'agent-security'],
    component: IndustryAgentsConcept
  },
  {
    id: 'agent-templates-hub',
    title: 'Agent Templates Hub',
    description: 'Ready-to-use starters, boilerplates, and quickstart guides—ship your first agent today.',
    level: 'applied',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '20-30 min',
    prerequisites: [],
    component: AgentTemplatesHub
  }
]

// ── Tier metadata for masonry overview ──────────────────────────────────────
const tierOrder: ConceptInfo['level'][] = ['fundamentals', 'architecture', 'implementation', 'advanced', 'applied'];

const tierMeta: Record<string, {
  title: string; description: string;
  accent: string;          // Tailwind bg class for the accent bar
  iconBg: string;          // CSS var key (maps to --tier-{key}-icon-bg)
  chipBg: string;          // CSS var key (maps to --tier-{key}-chip-bg / chip-fg)
}> = {
  fundamentals: {
    title: 'Fundamentals',
    description: 'Core building blocks \u2014 prompting, architecture, security, ethics, and the mental models every builder needs.',
    accent: 'bg-blue-500',
    iconBg: 'blue',
    chipBg: 'blue',
  },
  architecture: {
    title: 'Architecture',
    description: 'Protocols, communication patterns, and system design \u2014 A2A, MCP, evaluation, data readiness.',
    accent: 'bg-emerald-500',
    iconBg: 'emerald',
    chipBg: 'emerald',
  },
  implementation: {
    title: 'Implementation',
    description: 'Hands-on integration \u2014 protocol bridging, knowledge ops, UI rendering, multi-agent backends.',
    accent: 'bg-amber-500',
    iconBg: 'amber',
    chipBg: 'amber',
  },
  advanced: {
    title: 'Advanced',
    description: 'Production-grade depth \u2014 deployment, memory, observability, cost optimization, robotics, cognitive science.',
    accent: 'bg-purple-500',
    iconBg: 'purple',
    chipBg: 'purple',
  },
  applied: {
    title: 'Applied & Career',
    description: 'Real-world application \u2014 troubleshooting, economics, career growth, industry patterns, ready-to-use templates.',
    accent: 'bg-rose-500',
    iconBg: 'rose',
    chipBg: 'rose',
  },
};

function getTierIcon(level: string) {
  switch (level) {
    case 'fundamentals': return <BookOpen className="w-5 h-5" />;
    case 'architecture': return <Stack className="w-5 h-5" />;
    case 'implementation': return <ArrowsHorizontal className="w-5 h-5" />;
    case 'advanced': return <Brain className="w-5 h-5" />;
    case 'applied': return <Target className="w-5 h-5" />;
    default: return <BookOpen className="w-5 h-5" />;
  }
}

// Accessible badge styles per level (light + dark mode)
function getLevelBadgeClass(level: ConceptInfo['level']): string {
  switch (level) {
    case 'fundamentals':
  return 'ring-1 bg-[var(--badge-fundamentals-bg)] ring-[var(--badge-fundamentals-ring)] text-[var(--badge-fundamentals-text)] dark:text-[var(--badge-fundamentals-text)]';
    case 'architecture':
  return 'ring-1 bg-[var(--badge-architecture-bg)] ring-[var(--badge-architecture-ring)] text-[var(--badge-architecture-text)] dark:text-[var(--badge-architecture-text)]';
    case 'implementation':
  return 'ring-1 bg-[var(--badge-implementation-bg)] ring-[var(--badge-implementation-ring)] text-[var(--badge-implementation-text)] dark:text-[var(--badge-implementation-text)]';
    case 'advanced':
  return 'ring-1 bg-[var(--badge-advanced-bg)] ring-[var(--badge-advanced-ring)] text-[var(--badge-advanced-text)] dark:text-[var(--badge-advanced-text)]';
    case 'applied':
  return 'ring-1 bg-[var(--tier-rose-chip-bg)] text-[var(--tier-rose-chip-fg)] ring-rose-300/70 dark:bg-rose-900/30 dark:ring-rose-600 dark:text-rose-200';
    default:
  return 'ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)] dark:text-[var(--badge-gray-text)]';
  }
}

// Theme-aware icon color per level (keeps labels/badges readable)
function getIconColorClass(level: ConceptInfo['level']): string {
  switch (level) {
    case 'fundamentals':
      return 'text-blue-600 dark:text-blue-300'
    case 'architecture':
      return 'text-emerald-600 dark:text-emerald-300'
    case 'implementation':
      return 'text-amber-600 dark:text-amber-300'
    case 'advanced':
      return 'text-purple-600 dark:text-purple-300'
    case 'applied':
      return 'text-purple-600 dark:text-purple-300'
    default:
      return 'text-foreground'
  }
}

interface ConceptsHubProps {
  onSelectConcept: (conceptId: string | null) => void;
  initialConcept?: string | null;
  flatUi20Preview: boolean;
  onFlatUi20PreviewChange: (value: boolean) => void;
}

export default function ConceptsHub({
  onSelectConcept,
  initialConcept,
  flatUi20Preview,
  onFlatUi20PreviewChange,
}: ConceptsHubProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(initialConcept || null)
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set())
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTier, setActiveTier] = useState<ConceptInfo['level'] | null>(null);
  const navigate = useNavigate();

  // Register concepts for voice navigation (idempotent)
  useEffect(() => {
    registerConceptsForVoice(concepts.map(c => ({ id: c.id, title: c.title, description: c.description })));
  }, []);

  // Group concepts by level tier
  const conceptsByTier = useMemo(() => {
    const grouped: Record<string, ConceptInfo[]> = {};
    for (const c of concepts) {
      (grouped[c.level] ??= []).push(c);
    }
    return grouped;
  }, []);

  // Search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return concepts.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleConceptSelect = (conceptId: string) => {
    const concept = concepts.find(c => c.id === conceptId)
    
    // If concept has an external path, navigate there instead
    if (concept?.externalPath) {
      navigate(concept.externalPath)
      return
    }
    
    setSelectedConcept(conceptId);
    onSelectConcept(conceptId);
    
    // Scroll to top when navigating to a new concept
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  const handleBackToHub = () => {
    setSelectedConcept(null)
    onSelectConcept(null)
    
    // Scroll to top when going back to hub
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  const handleNextConcept = (nextConceptId: string) => {
    setSelectedConcept(nextConceptId)
    
    // Scroll to top when navigating to next concept
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  const markConceptComplete = (conceptId: string) => {
    setCompletedConcepts(prev => new Set([...prev, conceptId]))
  }

  const getNextConcept = (currentConceptId: string) => {
    const currentIndex = concepts.findIndex(c => c.id === currentConceptId)
    if (currentIndex >= 0 && currentIndex < concepts.length - 1) {
      return concepts[currentIndex + 1]
    }
    return null
  }

  const getPreviousConcept = (currentConceptId: string) => {
    const currentIndex = concepts.findIndex(c => c.id === currentConceptId)
    if (currentIndex > 0) {
      return concepts[currentIndex - 1]
    }
    return null
  }

  // Reusable Navigation Component
  const ConceptNavigation = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 pt-6 border-t gap-4">
      <div>
        {getPreviousConcept(selectedConcept!) && (
          <Button
            variant="outline"
            onClick={() => handleConceptSelect(getPreviousConcept(selectedConcept!)!.id)}
            className="flex items-center gap-2 text-sm"
          >
            ← Previous: {getPreviousConcept(selectedConcept!)!.title}
          </Button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 text-sm w-full sm:w-auto"
        >
          <Question size={16} weight="bold" />
          Challenge
        </Button>
        <Button variant="outline" onClick={handleBackToHub} className="w-full sm:w-auto">
          Back to Concepts
        </Button>
        {getNextConcept(selectedConcept!) && (
          <Button
            onClick={() => handleConceptSelect(getNextConcept(selectedConcept!)!.id)}
            className="flex items-center gap-2 text-sm w-full sm:w-auto"
          >
            Next: {getNextConcept(selectedConcept!)!.title} →
          </Button>
        )}
      </div>
    </div>
  )

  if (selectedConcept) {
    const concept = concepts.find(c => c.id === selectedConcept)
    if (concept && concept.component) {
      const ConceptComponent = concept.component
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToHub}>
              ← Back to Concepts
            </Button>
            <div className="flex items-center gap-2">
              <span className={getIconColorClass(concept.level)}>{concept.icon}</span>
              <h2 className="text-xl font-semibold">{concept.title}</h2>
              <span
                className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-sm font-medium ${getLevelBadgeClass(concept.level)}`}
              >
                {concept.level}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <Suspense fallback={<ConceptLoader />}>
              <ConceptComponent 
                onMarkComplete={() => markConceptComplete(selectedConcept)}
                onNavigateToNext={handleNextConcept}
              />
            </Suspense>
            
            {/* Navigation Buttons */}
            <ConceptNavigation />
            
            <CriticalThinkingModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              question={getConceptCue(selectedConcept)?.criticalThinkingQuestion || 
                "What are the fundamental principles and real-world applications of this concept?"}
              contextTitle={concept.title}
              contextCue={getConceptCue(selectedConcept)?.cue}
              conceptArea={concept.title}
              source="core-concepts"
              context={{
                difficulty: concept.level === 'fundamentals' ? 'beginner' : 
                          concept.level === 'architecture' ? 'intermediate' : 
                          concept.level === 'implementation' ? 'advanced' : 'expert',
                evaluationCriteria: [
                  "Understanding of fundamental concepts",
                  "Ability to apply knowledge in practical scenarios",
                  "Recognition of real-world implications",
                  "Demonstration of critical thinking skills"
                ]
              }}
            />
          </div>
        </div>
      )
    }
  }

  const progressPercentage = (completedConcepts.size / concepts.length) * 100

  return (
    <div className="space-y-6">
      {/* ── Header & Search ────────────────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <BookOpen className="w-7 h-7" />
              Core Concepts
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {concepts.length} concepts across {tierOrder.length} tiers
              {completedConcepts.size > 0 && <span> &middot; {completedConcepts.size} completed</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
              <Label htmlFor="core-concepts-flat-ui-toggle" className="text-xs text-muted-foreground">
                Flat UI 2.0
              </Label>
              <Switch
                id="core-concepts-flat-ui-toggle"
                checked={flatUi20Preview}
                onCheckedChange={onFlatUi20PreviewChange}
              />
            </div>
            <Progress value={progressPercentage} className="w-28 h-2" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveTier(null); }}
            placeholder="Search concepts by name, keyword, or topic…"
            className="w-full rounded-lg border border-input bg-background pl-10 pr-20 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <InlineMicButton
            onTranscript={(text) => { setSearchQuery(text); setActiveTier(null); }}
            className="right-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Search Results ─────────────────────────────────────── */}
      {searchQuery.trim() ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{searchQuery.trim()}&rdquo;
          </p>
          {searchResults.length === 0 ? (
            <Card className="py-12 text-center">
              <CardContent>
                <MagnifyingGlass className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground">No concepts match your search. Try different keywords.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:1.5rem]">
              {searchResults.map(concept => {
                const isCompleted = completedConcepts.has(concept.id)
                return (
                  <div key={concept.id} className="break-inside-avoid mb-5">
                    <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleConceptSelect(concept.id)}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary border border-border">
                              <span className={getIconColorClass(concept.level)}>{concept.icon}</span>
                            </div>
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {concept.title}
                                {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ${getLevelBadgeClass(concept.level)}`}>
                                  {concept.level}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />{concept.estimatedTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 shrink-0 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{concept.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      /* ── Drill-in: Concepts within a Tier ───────────────────── */
      ) : activeTier ? (
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-3">
            <button onClick={() => setActiveTier(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              All Tiers
            </button>
            <CaretRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">{tierMeta[activeTier]?.title}</span>
          </div>

          {/* Tier description banner */}
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-border bg-card px-3.5 py-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
              <span>{getTierIcon(activeTier)}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{tierMeta[activeTier]?.title}</h2>
              <p className="text-base text-muted-foreground mt-0.5">
                {tierMeta[activeTier]?.description}
                <span className="ml-2 font-medium">{(conceptsByTier[activeTier] || []).length} concepts</span>
              </p>
            </div>
          </div>

          {/* Concept cards — masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(conceptsByTier[activeTier] || []).map(concept => {
              const isCompleted = completedConcepts.has(concept.id)
              return (
                <div key={concept.id}>
                  <Card className="group border border-border bg-card shadow-none hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => handleConceptSelect(concept.id)}>
                    <CardHeader className="pb-1.5 pt-3.5 px-3.5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-muted border border-border/60 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:text-foreground/70">
                            <span>{concept.icon}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg leading-tight flex items-center gap-2">
                              {concept.title}
                              {isCompleted && <CheckCircle className="w-4 h-4 text-foreground/70" />}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />{concept.estimatedTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <div onClick={e => e.stopPropagation()}>
                            <ShareButton
                              url={`${window.location.origin}/concepts/${concept.id}`}
                              title={concept.title}
                              description={concept.description}
                              variant="ghost"
                              size="sm"
                              iconOnly
                              analyticsCategory="Concept Share"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3.5 px-3.5">
                      <p className="text-base leading-relaxed text-muted-foreground">{concept.description}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

      /* ── Tier Overview — Masonry ────────────────────────────── */
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tierOrder.map(tier => {
            const meta = tierMeta[tier];
            if (!meta) return null;
            const tierConcepts = conceptsByTier[tier] || [];
            const completed = tierConcepts.filter(c => completedConcepts.has(c.id)).length;
            const pct = tierConcepts.length > 0 ? Math.round((completed / tierConcepts.length) * 100) : 0;

            return (
              <div key={tier}>
                <div
                  className="rounded-lg border border-border bg-card text-card-foreground shadow-none overflow-hidden hover:bg-muted/10 transition-colors cursor-pointer group"
                  onClick={() => setActiveTier(tier)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTier(tier); } }}
                >
                  <div className="p-3.5">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md flex items-center justify-center bg-muted text-muted-foreground">
                          <span>{getTierIcon(tier)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base leading-tight tracking-tight">{meta.title}</h3>
                          <span className="text-xs text-muted-foreground">{tierConcepts.length} concepts</span>
                        </div>
                      </div>
                      <CaretRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground mb-3">{meta.description}</p>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{completed} / {tierConcepts.length} completed</span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5 bg-muted [&>div]:bg-foreground/25" />
                    </div>

                    {/* Concept chips — creates natural height variation = masonry */}
                    <div className="flex flex-wrap gap-1">
                      {tierConcepts.map(c => (
                        <span
                          key={c.id}
                          className="inline-flex items-center gap-1 text-[10px] leading-tight px-1.5 py-0.5 rounded-sm transition-colors bg-background text-foreground/85 border border-border/60"
                        >
                          {completedConcepts.has(c.id) && <CheckCircle className="w-3 h-3 text-foreground/70 shrink-0" />}
                          <span className="truncate max-w-[150px]">{c.title}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

















