import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowsHorizontal, Shield, Stack, ArrowRight, CheckCircle, BookOpen, LinkSimple, Graph, ChartBar, Clock, Lock, Users, Question, Robot, Target, Atom } from "@phosphor-icons/react"
import { ShareButton } from "@/components/ui/ShareButton"
import AIAgentsConcept from "./AIAgentsConcept"
import A2ACommunicationConcept from "./A2ACommunicationConcept"
import MCPConcept from "./MCPConcept"
import ACPConcept from "./ACPConcept"
import MCPxA2AIntegrationConcept from "./MCPxA2AIntegrationConcept"
import FlowVisualizationConcept from "./FlowVisualizationConcept"
import DataVisualizationConcept from "./DataVisualizationConcept"
import AgentArchitectureConcept from "./AgentArchitectureConcept"
import AgentSecurityConcept from "./AgentSecurityConcept"
import MultiAgentSystemsConcept from "./MultiAgentSystemsConcept"
import AgentDeploymentConcept from "./AgentDeploymentConcept"
import AgentEthicsConcept from "./AgentEthicsConcept"
import AgentLearningConcept from "./AgentLearningConcept"
import AgentIntegrationConcept from "./AgentIntegrationConcept"
import AgentEvaluationConcept from "./AgentEvaluationConcept"
import FineTuningConcept from "./FineTuningConcept"
import AgenticCommerceAP2Concept from "./AgenticCommerceAP2Concept"
import ProductManagementConcept from "./ProductManagementConcept"
import AgentOpsConcept from "./AgentOpsConcept"
import AgenticRoboticsConcept from "./AgenticRoboticsConcept"
import QuantumAIRoboticsConcept from "./QuantumAIRoboticsConcept"
import { CriticalThinkingModal } from "../common/CriticalThinkingModal"
import { getConceptCue } from "@/lib/data/conceptCues"
import AzureAISafetyAndGovernance from "./AzureAISafetyAndGovernance"
import AgenticPromptingFundamentals from "./AgenticPromptingFundamentals"
import PromptOptimizationPatterns from "./PromptOptimizationPatterns"
import AgentInstructionDesign from "./AgentInstructionDesign"
import AgenticWorkflowControl from "./AgenticWorkflowControl"
import AgentEvaluationMethodologies from "./AgentEvaluationMethodologies"
import AgenticAIDesignTaxonomy from "./AgenticAIDesignTaxonomy"
import ProgramSetupNorthStarConcept from "./ProgramSetupNorthStarConcept"
import ResponsibleAIGovernanceConcept from "./ResponsibleAIGovernanceConcept"
import StrategyPortfolioManagementConcept from "./StrategyPortfolioManagementConcept"
import DataKnowledgeOperationsConcept from "./DataKnowledgeOperationsConcept"
import ArchitecturePlatformOperationsConcept from "./ArchitecturePlatformOperationsConcept"
import ExperimentationContinuousImprovementConcept from "./ExperimentationContinuousImprovementConcept"
import EcosystemPartnershipsConcept from "./EcosystemPartnershipsConcept"
import OrganizationalEnablementConcept from "./OrganizationalEnablementConcept"
import AIProductFrameworkConcept from "./AIProductFrameworkConcept"
import ClientCodingAgentsConcept from "./ClientCodingAgentsConcept"
import AgentSkillsConcept from "./AgentSkillsConcept"
import AgentRedTeamingConcept from "./AgentRedTeamingConcept"
import AgentTroubleshootingPlaybook from "./AgentTroubleshootingPlaybook"
import AgentEconomicsConcept from "./AgentEconomicsConcept"
import AgentCareerPathsConcept from "./AgentCareerPathsConcept"
import IndustryAgentsConcept from "./IndustryAgentsConcept"
import AgentTemplatesHub from "./AgentTemplatesHub"
import AgentReasoningPatternsConcept from "./AgentReasoningPatternsConcept"
import AgentMemorySystemsConcept from "./AgentMemorySystemsConcept"
import AgentObservabilityConcept from "./AgentObservabilityConcept"
import AgentTestingBenchmarksConcept from "./AgentTestingBenchmarksConcept"
import PromptInjectionDefenseConcept from "./PromptInjectionDefenseConcept"
import HumanInTheLoopPatternsConcept from "./HumanInTheLoopPatternsConcept"
import AgentCostOptimizationConcept from "./AgentCostOptimizationConcept"

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
    title: 'Data Visualization',
  description: 'Turn raw telemetry into decision stories—spot drift, dead branches, and latent potential.',
    level: 'implementation',
    icon: <ChartBar className="w-6 h-6" />,
  color: 'bg-background text-foreground/80 dark:bg-indigo-900/20 dark:text-indigo-300',
    estimatedTime: '35-45 min',
    prerequisites: ['flow-visualization'],
    component: DataVisualizationConcept
  },
  {
    id: 'data-knowledge-operations',
    title: 'Data & Knowledge Operations',
    description: 'Engineer trustworthy data supply chains and knowledge governance for durable agent context.',
    level: 'implementation',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-background text-foreground/80 dark:bg-sky-900/20 dark:text-sky-300',
    estimatedTime: '40-50 min',
    prerequisites: ['data-visualization'],
    component: DataKnowledgeOperationsConcept
  },
  // Tier 4: Advanced Concepts
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
    title: 'Agentic Commerce & AP2',
    description: 'Chained mandate credentials (Intent → Cart → Payment) enabling trustworthy agent-led purchases.',
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
  return 'ring-1 bg-purple-100 ring-purple-300 text-purple-900 dark:bg-purple-900/30 dark:ring-purple-600 dark:text-purple-200';
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
}

export default function ConceptsHub({ onSelectConcept, initialConcept }: ConceptsHubProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(initialConcept || null)
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set())
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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
            <ConceptComponent 
              onMarkComplete={() => markConceptComplete(selectedConcept)}
              onNavigateToNext={handleNextConcept}
            />
            
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Question size={20} weight="bold" />
              Critical Thinking Challenge
            </Button>
            
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
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-8 h-8" />
                Core Concepts Learning Path
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Master the fundamental concepts of AI agents through a structured, progressive learning experience
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Overall Progress</div>
              <Progress value={progressPercentage} className="w-32" />
              <div className="text-base text-muted-foreground mt-1">
                {completedConcepts.size} of {concepts.length} concepts completed
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept, index) => {
          const isCompleted = completedConcepts.has(concept.id)
          // All concepts are now enabled by default for users familiar with AI Agents
          const isLocked = false

          return (
            <Card 
              key={concept.id}
              className={`group relative transition-all hover:shadow-lg cursor-pointer`}
              onClick={() => handleConceptSelect(concept.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-secondary-foreground border border-border">
                      <span className={getIconColorClass(concept.level)}>{concept.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {concept.title}
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium ${getLevelBadgeClass(concept.level)}`}
                        >
                          {concept.level}
                        </span>
                        <span className="text-base text-muted-foreground">
                          {concept.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!isLocked && (
                      <>
                        <div onClick={(e) => e.stopPropagation()}>
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
                        <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground mb-0 pr-6">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Learning Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium">Follow the Path</h4>
                <p className="text-base text-muted-foreground">
                  Complete concepts in order for the best learning experience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium">Hands-on Practice</h4>
                <p className="text-base text-muted-foreground">
                  Try the interactive demos and examples in each section
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium">Apply Knowledge</h4>
                <p className="text-base text-muted-foreground">
                  Build your own projects using the patterns you've learned
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}








