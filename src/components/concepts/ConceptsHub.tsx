import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
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
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
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
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
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
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
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
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
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
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
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
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
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
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
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
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
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
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
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
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
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
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
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
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
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
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
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
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
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
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
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
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false);

  const handleConceptSelect = (conceptId: string) => {
    setSelectedConcept(conceptId);
    setActiveTab('lifecycle'); // Set default tab to 'lifecycle'
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

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
              <Badge className={concept.color}>{concept.level}</Badge>
            </div>
          </div>
          <Tabs value={activeTab || 'lifecycle'} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="lifecycle">Agent Lifecycle</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="business">Business Use Case</TabsTrigger>
            </TabsList>
            <TabsContent value="lifecycle">
              <ConceptComponent 
                onMarkComplete={() => markConceptComplete(selectedConcept)}
                onNavigateToNext={handleNextConcept}
              />
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                🧠 Critical Thinking Challenge
              </Button>
              <CriticalThinkingModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                question={getConceptCue(selectedConcept)?.criticalThinkingQuestion || 
                  (activeTab === "lifecycle"
                    ? "What are the fundamental principles of agent lifecycle?"
                    : activeTab === "details"
                    ? "What are the key details of this concept?"
                    : activeTab === "implementation"
                    ? "How can this concept be implemented effectively?"
                    : "What are the business use cases for this concept?")}
                contextTitle={concept.title}
                contextCue={getConceptCue(selectedConcept)?.cue}
              />
            </TabsContent>
            <TabsContent value="details">
              <div>
                {selectedConcept === "agent-architecture" && (
                  <p>Agent Architecture involves defining the structure, components, and interactions of AI agents. It includes lifecycle management, modular design, and scalability considerations.</p>
                )}
                {selectedConcept === "agent-security" && (
                  <p>Agent Security focuses on safeguarding AI systems against threats. It includes authentication, encryption, and trust models to ensure data integrity and system reliability.</p>
                )}
                {selectedConcept === "multi-agent-systems" && (
                  <p>Multi-Agent Systems explore the dynamics of agent collaboration, coordination, and emergent behavior. It includes protocols for communication and conflict resolution.</p>
                )}
                {selectedConcept === "agent-ethics" && (
                  <p>Agent Ethics addresses the moral and regulatory aspects of AI systems. It includes bias mitigation, transparency, and compliance with ethical standards.</p>
                )}
                {selectedConcept === "ai-agents" && (
                  <p>AI Agents are autonomous systems capable of perceiving, deciding, and acting. They are designed to perform tasks with minimal human intervention.</p>
                )}
                {selectedConcept === "a2a-communication" && (
                  <p>A2A Communication involves protocols and mechanisms for seamless interaction between AI agents. It ensures effective coordination and data exchange.</p>
                )}
                {selectedConcept === "mcp" && (
                  <p>Model Context Protocol standardizes the integration of tools and models, enabling consistent communication and interoperability in AI systems.</p>
                )}
                {selectedConcept === "flow-visualization" && (
                  <p>Flow Visualization provides graphical representations of agent interactions, helping to identify bottlenecks and optimize workflows.</p>
                )}
                {selectedConcept === "agent-evaluation" && (
                  <p>Agent Evaluation involves assessing the performance, reliability, and safety of AI systems using benchmarks and automated frameworks.</p>
                )}
                {selectedConcept === "acp" && (
                  <p>Agent Communication Protocol defines advanced methods for agent coordination, ensuring efficient and reliable communication in complex systems.</p>
                )}
                {selectedConcept === "mcp-a2a-integration" && (
                  <p>MCP x A2A Integration combines standardized protocols with agent communication, enhancing interoperability and collaboration.</p>
                )}
                {selectedConcept === "data-visualization" && (
                  <p>Data Visualization focuses on presenting complex data in an understandable format, aiding decision-making and analysis.</p>
                )}
                {selectedConcept === "agent-deployment" && (
                  <p>Agent Deployment covers the processes of deploying, monitoring, and scaling AI systems in production environments.</p>
                )}
                {selectedConcept === "agent-learning" && (
                  <p>Agent Learning involves techniques like reinforcement learning and transfer learning to enable agents to adapt and improve over time.</p>
                )}
                {selectedConcept === "agent-integration" && (
                  <p>Agent Integration Patterns provide strategies for incorporating AI agents into existing systems, ensuring seamless operation and compatibility.</p>
                )}
                {selectedConcept === "ai-safety-governance" && (
                  <p>AI Safety & Governance covers the responsible AI pillars, safety, risk monitoring, guardrails, tracing, and governance using Azure Foundry.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="implementation">
              <div>
                {selectedConcept === "agent-architecture" && (
                  <p>Implementing Agent Architecture involves designing modular components, defining agent roles, and ensuring scalability through distributed systems.</p>
                )}
                {selectedConcept === "agent-security" && (
                  <p>Agent Security implementation includes setting up secure communication channels, enforcing access controls, and integrating threat detection mechanisms.</p>
                )}
                {selectedConcept === "multi-agent-systems" && (
                  <p>Multi-Agent Systems implementation requires developing communication protocols, conflict resolution strategies, and collaborative algorithms.</p>
                )}
                {selectedConcept === "agent-ethics" && (
                  <p>Implementing Agent Ethics involves embedding ethical guidelines into AI systems, ensuring transparency, and conducting regular audits for compliance.</p>
                )}
                {selectedConcept === "ai-agents" && (
                  <p>AI Agents implementation includes training models, defining decision-making frameworks, and integrating sensors for perception.</p>
                )}
                {selectedConcept === "a2a-communication" && (
                  <p>Implementing A2A Communication involves setting up APIs, defining message formats, and ensuring low-latency data exchange.</p>
                )}
                {selectedConcept === "mcp" && (
                  <p>Model Context Protocol implementation includes defining standard interfaces, integrating tools, and ensuring compatibility across systems.</p>
                )}
                {selectedConcept === "flow-visualization" && (
                  <p>Flow Visualization implementation involves creating dashboards, integrating visualization libraries, and ensuring real-time updates.</p>
                )}
                {selectedConcept === "agent-evaluation" && (
                  <p>Agent Evaluation implementation includes setting up test environments, defining metrics, and automating performance assessments.</p>
                )}
                {selectedConcept === "acp" && (
                  <p>Agent Communication Protocol implementation involves developing robust communication frameworks and ensuring fault tolerance.</p>
                )}
                {selectedConcept === "mcp-a2a-integration" && (
                  <p>Implementing MCP x A2A Integration requires aligning protocol standards with communication mechanisms for seamless operation.</p>
                )}
                {selectedConcept === "data-visualization" && (
                  <p>Data Visualization implementation includes selecting appropriate visualization tools, designing user-friendly interfaces, and ensuring data accuracy.</p>
                )}
                {selectedConcept === "agent-deployment" && (
                  <p>Agent Deployment implementation involves containerization, setting up CI/CD pipelines, and monitoring system performance.</p>
                )}
                {selectedConcept === "agent-learning" && (
                  <p>Agent Learning implementation includes designing training environments, selecting learning algorithms, and evaluating model performance.</p>
                )}
                {selectedConcept === "agent-integration" && (
                  <p>Agent Integration implementation involves developing middleware, ensuring API compatibility, and conducting integration testing.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="business">
              <div>
                {selectedConcept === "agent-architecture" && (
                  <p>Agent Architecture is crucial for designing scalable and efficient AI systems that can adapt to dynamic environments. Businesses can leverage this to build robust AI solutions for automation and decision-making.</p>
                )}
                {selectedConcept === "agent-security" && (
                  <p>Agent Security ensures the protection of sensitive data and trust in AI systems. It is vital for industries like finance, healthcare, and government where data integrity is paramount.</p>
                )}
                {selectedConcept === "multi-agent-systems" && (
                  <p>Multi-Agent Systems enable collaboration and coordination among AI agents, making them ideal for logistics, supply chain management, and smart city applications.</p>
                )}
                {selectedConcept === "agent-ethics" && (
                  <p>Agent Ethics helps businesses ensure compliance with regulations and build trust with users by addressing bias and ethical concerns in AI systems.</p>
                )}
                {selectedConcept === "ai-agents" && (
                  <p>AI Agents can automate complex tasks, improve operational efficiency, and drive innovation in industries like customer service, manufacturing, and retail.</p>
                )}
                {selectedConcept === "a2a-communication" && (
                  <p>A2A Communication facilitates seamless interaction between AI agents, enabling applications in IoT, autonomous vehicles, and distributed systems.</p>
                )}
                {selectedConcept === "mcp" && (
                  <p>Model Context Protocol provides a standardized approach for integrating tools and models, making it essential for enterprises adopting AI at scale.</p>
                )}
                {selectedConcept === "flow-visualization" && (
                  <p>Flow Visualization aids in understanding and optimizing agent interactions, which is valuable for process improvement and system diagnostics.</p>
                )}
                {selectedConcept === "agent-evaluation" && (
                  <p>Agent Evaluation ensures the reliability and safety of AI systems, which is critical for high-stakes applications like autonomous driving and healthcare.</p>
                )}
                {selectedConcept === "acp" && (
                  <p>Agent Communication Protocol enables advanced coordination in enterprise-scale systems, supporting applications in telecommunications and distributed computing.</p>
                )}
                {selectedConcept === "mcp-a2a-integration" && (
                  <p>MCP x A2A Integration combines the strengths of Model Context Protocol and A2A Communication, enabling seamless tool integration and agent collaboration.</p>
                )}
                {selectedConcept === "data-visualization" && (
                  <p>Data Visualization provides actionable insights from complex datasets, empowering businesses to make data-driven decisions.</p>
                )}
                {selectedConcept === "agent-deployment" && (
                  <p>Agent Deployment focuses on scaling and monitoring AI systems, which is essential for maintaining performance in production environments.</p>
                )}
                {selectedConcept === "agent-learning" && (
                  <p>Agent Learning enables continuous improvement and adaptation, making it ideal for dynamic industries like e-commerce and personalized marketing.</p>
                )}
                {selectedConcept === "agent-integration" && (
                  <p>Agent Integration Patterns streamline the incorporation of AI into existing systems, reducing costs and accelerating digital transformation.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
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
                Master AI agent concepts through a structured, progressive learning experience
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
                        <Badge className={concept.color}>
                          {concept.level}
                        </Badge>
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
