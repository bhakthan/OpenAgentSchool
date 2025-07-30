import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowsHorizontal, Shield, Stack, ArrowRight, CheckCircle, BookOpen, LinkSimple, Graph, ChartBar, Clock, Lock, Users } from "@phosphor-icons/react"
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
import { CriticalThinkingModal } from "../common/CriticalThinkingModal"
import { getConceptCue } from "@/lib/data/conceptCues"
import AzureAISafetyAndGovernance from "./AzureAISafetyAndGovernance"

interface ConceptInfo {
  id: string
  title: string
  description: string
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced'
  icon: React.ReactNode
  color: string
  estimatedTime: string
  prerequisites: string[]
  component: React.ComponentType<{ onMarkComplete?: () => void; onNavigateToNext?: (nextConceptId: string) => void }>
}

const concepts: ConceptInfo[] = [
  // Tier 1: Foundational Concepts
  {
    id: 'agent-architecture',
    title: 'Agent Architecture & Lifecycle',
    description: 'Understanding the fundamental building blocks and lifecycle of AI agents',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-white/80 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
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
    description: 'Security mechanisms and trust models for AI agent systems',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-white/80 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-architecture'],
    component: AgentSecurityConcept
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Coordination, collaboration, and emergent behavior in multi-agent systems',
    level: 'fundamentals',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-white/80 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: MultiAgentSystemsConcept
  },
  {
    id: 'agent-ethics',
    title: 'Agent Ethics & Governance',
    description: 'Ethical principles, bias mitigation, and regulatory compliance for AI agents',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-white/80 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: AgentEthicsConcept
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Learn about autonomous AI systems that can perceive, decide, and act',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-white/80 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    estimatedTime: '20-30 min',
    prerequisites: [],
    component: AIAgentsConcept
  },
  {
    id: 'ai-safety-governance',
    title: 'AI Safety and Governance',
    description: 'Responsible AI pillars, safety, risk monitoring, guardrails, tracing, and governance with Azure Foundry',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-white/80 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
    estimatedTime: '40-60 min',
    prerequisites: [],
    component: AzureAISafetyAndGovernance
  },
  // Tier 2: Architecture Concepts
  {
    id: 'a2a-communication',
    title: 'A2A Communication',
    description: 'How AI agents communicate and coordinate with each other',
    level: 'architecture',
    icon: <ArrowsHorizontal className="w-6 h-6" />,
    color: 'bg-white/80 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '25-35 min',
    prerequisites: ['multi-agent-systems'],
    component: A2ACommunicationConcept
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    description: 'Secure tool integration protocol for AI agents',
    level: 'architecture',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-white/80 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-security'],
    component: MCPConcept
  },
  {
    id: 'flow-visualization',
    title: 'Flow Visualization',
    description: 'Interactive visualization of agent flows and interactions',
    level: 'architecture',
    icon: <Graph className="w-6 h-6" />,
    color: 'bg-white/80 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
    estimatedTime: '30-40 min',
    prerequisites: ['a2a-communication'],
    component: FlowVisualizationConcept
  },
  {
    id: 'agent-evaluation',
    title: 'Agent Evaluation',
    description: 'Systematic assessment of agent performance, reliability, safety, and alignment using automated frameworks and benchmarks',
    level: 'architecture',
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    color: 'bg-white/80 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-architecture'],
    component: AgentEvaluationConcept
  },
  // Tier 3: Implementation Concepts
  {
    id: 'acp',
    title: 'Agent Communication Protocol',
    description: 'Advanced protocols for enterprise-scale agent coordination',
    level: 'implementation',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-white/80 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    estimatedTime: '35-45 min',
    prerequisites: ['a2a-communication'],
    component: ACPConcept
  },
  {
    id: 'mcp-a2a-integration',
    title: 'MCP x A2A Integration',
    description: 'Integrate Model Context Protocol with Agent-to-Agent communication',
    level: 'implementation',
    icon: <LinkSimple className="w-6 h-6" />,
    color: 'bg-white/80 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp', 'a2a-communication'],
    component: MCPxA2AIntegrationConcept
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Advanced data visualization techniques for AI agent systems',
    level: 'implementation',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-white/80 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    estimatedTime: '35-45 min',
    prerequisites: ['flow-visualization'],
    component: DataVisualizationConcept
  },
  // Tier 4: Advanced Concepts
  {
    id: 'agent-deployment',
    title: 'Agent Deployment & Operations',
    description: 'Containerization, monitoring, scaling, and DevOps for AI agents',
    level: 'advanced',
    icon: <Lock className="w-6 h-6" />,
    color: 'bg-white/80 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    estimatedTime: '40-50 min',
    prerequisites: ['acp'],
    component: AgentDeploymentConcept
  },
  {
    id: 'agent-learning',
    title: 'Agent Learning & Adaptation',
    description: 'Reinforcement learning, online learning, transfer learning, and meta-learning',
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-white/80 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '45-55 min',
    prerequisites: ['ai-agents'],
    component: AgentLearningConcept
  },
  {
    id: 'agent-integration',
    title: 'Agent Integration Patterns',
    description: 'API integration, event-driven architecture, microservices, and legacy systems',
    level: 'advanced',
    icon: <LinkSimple className="w-6 h-6" />,
    color: 'bg-white/80 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp-a2a-integration'],
    component: AgentIntegrationConcept
  }
]

interface ConceptsHubProps {
  onSelectConcept: (conceptId: string) => void;
}

export default function ConceptsHub({ onSelectConcept }: ConceptsHubProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set())
  const [isModalOpen, setModalOpen] = useState(false);

  const handleConceptSelect = (conceptId: string) => {
    setSelectedConcept(conceptId);
    onSelectConcept(conceptId);
  }

  const handleBackToHub = () => {
    setSelectedConcept(null)
  }

  const handleNextConcept = (nextConceptId: string) => {
    setSelectedConcept(nextConceptId)
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
    if (concept) {
      const ConceptComponent = concept.component
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToHub}>
              ← Back to Concepts
            </Button>
            <div className="flex items-center gap-2">
              {concept.icon}
              <h2 className="text-xl font-semibold">{concept.title}</h2>
              <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-sm font-medium ${concept.color}`}>{concept.level}</span>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              🧠 Critical Thinking Challenge
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
              className={`relative transition-all hover:shadow-lg cursor-pointer`}
              onClick={() => handleConceptSelect(concept.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      {concept.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {concept.title}
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium ${concept.color}`}>
                          {concept.level}
                        </span>
                        <span className="text-base text-muted-foreground">
                          {concept.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isLocked && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground mb-4">
                  {concept.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-base text-muted-foreground">
                    {isCompleted ? 'Completed' : 'Ready to start'}
                  </div>
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {isCompleted ? 'Review' : 'Start Learning'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
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
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
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
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
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
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
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
