import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles"
import { Users, ArrowsIn, Handshake, Crown, Target, Network, CirclesThreePlus, FlowArrow } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import ReferenceSection from "@/components/references/ReferenceSection";

interface MultiAgentSystemsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const CoordinationTopologyVisual = () => (
  <Card className="border-dashed">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CirclesThreePlus className="w-5 h-5 text-primary" />
        Coordination Topologies Cheat Sheet
      </CardTitle>
      <CardDescription>
        Spot how communication patterns shift across consensus, auctions, mediation, and shared blackboards
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid lg:grid-cols-4 gap-4">
        {[
          {
            name: "Consensus Ring",
            edges: "Bidirectional peering",
            icon: <ArrowsIn className="w-6 h-6" />, 
            summary: "Each node votes, rounds continue until thresholds align.",
            signals: ["BFT chains", "Raft-like flows"],
            headerBorder: "border-b-blue-400 dark:border-b-blue-500",
            iconBg: "bg-blue-100 dark:bg-blue-900/50",
            iconText: "text-blue-600 dark:text-blue-300"
          },
          {
            name: "Auction Hub",
            edges: "Hub broadcast",
            icon: <Handshake className="w-6 h-6" />, 
            summary: "Coordinator posts tasks, bidders respond with cost + capability.",
            signals: ["Contract net", "Market incentives"],
            headerBorder: "border-b-emerald-400 dark:border-b-emerald-500",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
            iconText: "text-emerald-600 dark:text-emerald-300"
          },
          {
            name: "Mediation Star",
            edges: "Broker routing",
            icon: <Users className="w-6 h-6" />, 
            summary: "Neutral mediator aggregates preferences and proposes compromise.",
            signals: ["Policy hand-offs", "Escalation lanes"],
            headerBorder: "border-b-purple-400 dark:border-b-purple-500",
            iconBg: "bg-purple-100 dark:bg-purple-900/50",
            iconText: "text-purple-600 dark:text-purple-300"
          },
          {
            name: "Blackboard Mesh",
            edges: "Shared state",
            icon: <Network className="w-6 h-6" />, 
            summary: "Agents read/write to shared knowledge store with locks + watchers.",
            signals: ["RAG scratchpad", "Fact caches"],
            headerBorder: "border-b-amber-400 dark:border-b-amber-500",
            iconBg: "bg-amber-100 dark:bg-amber-900/50",
            iconText: "text-amber-600 dark:text-amber-300"
          }
        ].map(topology => (
          <div key={topology.name} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className={`px-4 py-3 border-b bg-muted/40 dark:bg-muted/20 flex items-center gap-3 ${topology.headerBorder}`}
              aria-label={`${topology.name} coordination topology`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${topology.iconBg} ${topology.iconText}`}>
                {topology.icon}
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{topology.name}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Edges: {topology.edges}</div>
              </div>
            </div>
            <div className="p-4 text-sm space-y-3">
              <p className="text-muted-foreground">{topology.summary}</p>
              <div className="flex flex-wrap gap-2">
                {topology.signals.map(signal => (
                  <Badge key={signal} variant="outline" className="border-dashed text-xs">
                    {signal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-dashed border-muted bg-muted/30 p-4 text-sm text-muted-foreground flex items-start gap-3">
        <FlowArrow className="w-5 h-5 text-primary mt-0.5" />
        <span>Choose topology per phase: consensus for plan agreement, auctions for task hand-off, blackboard for persistent context, mediation when human override is required.</span>
      </div>
    </CardContent>
  </Card>
)

export default function MultiAgentSystemsConcept({ onMarkComplete, onNavigateToNext }: MultiAgentSystemsConceptProps) {
  const tabs = [
    {
      id: 'coordination',
      title: 'Coordination Mechanisms',
      description: 'How agents coordinate their actions and decisions',
      icon: <ArrowsIn className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <CoordinationTopologyVisual />

          {/* Coordination Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsIn className="w-5 h-5" />
                Agent Coordination Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Coordination mechanisms enable multiple agents to work together effectively, 
                avoiding conflicts and maximizing collective performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Consensus Algorithms</h4>
                  <p className="text-base text-muted-foreground">
                    Mechanisms for agents to agree on decisions or shared state
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Task Allocation</h4>
                  <p className="text-base text-muted-foreground">
                    Distributing work among agents based on capabilities and availability
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Load Balancing</h4>
                  <p className="text-base text-muted-foreground">
                    Distributing workload evenly across available agents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔐 Resource Locking</h4>
                  <p className="text-base text-muted-foreground">
                    Preventing conflicts when agents access shared resources
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border/60 bg-muted/60">
                <pre className="text-sm leading-relaxed text-foreground font-mono overflow-x-auto">
{`// Agent Coordination Example
class AgentCoordinator {
  async coordinateTask(task, availableAgents) {
    // 1. Analyze task requirements
    const requirements = this.analyzeTask(task)
    
    // 2. Find suitable agents
    const suitableAgents = availableAgents.filter(
      agent => this.meetsRequirements(agent, requirements)
    )
    
    // 3. Allocate task using consensus
    const allocation = await this.consensusAllocate(task, suitableAgents)
    
    // 4. Monitor execution
    return this.monitorExecution(allocation)
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="multiagents" />
        </div>
      )
    },
    {
      id: 'negotiation',
      title: 'Agent Negotiation',
      description: 'How agents negotiate and reach agreements',
      icon: <Handshake className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Negotiation Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                Negotiation Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent negotiation enables autonomous systems to reach agreements about resource 
                allocation, task distribution, and conflict resolution without human intervention.
              </p>
              
              <div className="p-4 rounded-md border border-border/60 bg-muted/60">
                <h4 className="font-semibold mb-3">Common Negotiation Strategies:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500/70 dark:bg-blue-400/70 mt-2"></span>
                    <span><strong>Auction-Based:</strong> Agents bid for resources or tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500/70 dark:bg-green-400/70 mt-2"></span>
                    <span><strong>Contract Net:</strong> Structured proposal and acceptance process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500/70 dark:bg-purple-400/70 mt-2"></span>
                    <span><strong>Bargaining:</strong> Back-and-forth negotiation to reach compromise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500/70 dark:bg-orange-400/70 mt-2"></span>
                    <span><strong>Mediation:</strong> Third-party agent facilitates agreement</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-border/60 bg-muted/60">
                <pre className="text-sm leading-relaxed text-foreground font-mono overflow-x-auto">
{`// Auction-Based Negotiation
class AgentAuction {
  async conductAuction(task, participants) {
    // 1. Announce task and requirements
    const announcement = await this.announceTask(task)
    
    // 2. Collect bids from agents
    const bids = await this.collectBids(participants, announcement)
    
    // 3. Evaluate bids
    const evaluation = this.evaluateBids(bids, task.criteria)
    
    // 4. Select winner and notify participants
    const winner = this.selectWinner(evaluation)
    await this.notifyParticipants(winner, bids)
    
    return winner
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'emergent-behavior',
      title: 'Emergent Behavior',
      description: 'How complex behaviors emerge from simple agent interactions',
      icon: <Network className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Emergent Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Emergence in Multi-Agent Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Emergent behavior occurs when simple local interactions between agents lead to 
                complex global patterns and capabilities that weren't explicitly programmed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🌊 Swarm Intelligence</h4>
                  <p className="text-base text-muted-foreground">
                    Collective behavior patterns inspired by biological systems
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Self-Organization</h4>
                  <p className="text-base text-muted-foreground">
                    Agents automatically organize into efficient structures
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Collective Intelligence</h4>
                  <p className="text-base text-muted-foreground">
                    Group problem-solving capabilities exceeding individual agents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Adaptive Systems</h4>
                  <p className="text-base text-muted-foreground">
                    System-wide adaptation to changing conditions
                  </p>
                </div>
              </div>

              <div className="bg-muted text-foreground p-4 rounded-md">
                <h4 className="font-semibold mb-3">Examples of Emergent Behavior:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Flocking:</strong> Agents naturally form groups with aligned movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Market Dynamics:</strong> Price discovery through agent interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Knowledge Networks:</strong> Spontaneous information sharing patterns</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'collaboration-models',
      title: 'Collaboration Models',
      description: 'Different ways agents can work together',
      icon: <Users className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Collaboration Models */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agent Collaboration Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Different collaboration models suit different types of tasks and organizational structures.
              </p>
              
              <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground">
                    <Crown className="w-5 h-5 text-[var(--badge-blue-ring)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Hierarchical Model</h4>
                    <p className="text-base text-muted-foreground mt-1">
                      Clear command structure with supervisor and worker agents
                    </p>
                    <div className="mt-2">
                      <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Centralized Control</Badge>
                      <Badge className="ml-2 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Clear Authority</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground">
                    <Network className="w-5 h-5 text-[var(--badge-green-ring)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Peer-to-Peer Model</h4>
                    <p className="text-base text-muted-foreground mt-1">
                      Agents collaborate as equals without central authority
                    </p>
                    <div className="mt-2">
                      <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Decentralized</Badge>
                      <Badge className="ml-2 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Flexible</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground">
                    <Target className="w-5 h-5 text-[var(--badge-purple-ring)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Market-Based Model</h4>
                    <p className="text-base text-muted-foreground mt-1">
                      Agents compete and cooperate based on economic incentives
                    </p>
                    <div className="mt-2">
                      <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Competitive</Badge>
                      <Badge className="ml-2 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Efficient</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'agent-framework',
      title: 'Microsoft Agent Framework',
      description: 'Unified framework combining Semantic Kernel and AutoGen',
      icon: <Users className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Agent Framework Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <a 
                  href="https://aka.ms/agentframework" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Microsoft Agent Framework
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Microsoft Agent Framework is a unified framework that combines the strengths of Semantic Kernel 
                (production workloads) and AutoGen (rapid prototyping). It enables creation of multi-agent 
                applications with graph-based workflows, built-in observability, and enterprise-ready features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Key Features</h4>
                  <ul className="space-y-1 text-base">
                    <li>• Graph-based workflow orchestration</li>
                    <li>• Python & .NET support</li>
                    <li>• Built-in observability & tracing</li>
                    <li>• Human-in-the-loop capabilities</li>
                    <li>• Agent memory management</li>
                    <li>• Middleware system for custom pipelines</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Use Cases</h4>
                  <ul className="space-y-1 text-base">
                    <li>• Enterprise multi-agent systems</li>
                    <li>• Complex workflow automation</li>
                    <li>• Rapid prototyping & production</li>
                    <li>• Research and analysis tasks</li>
                    <li>• Code generation and validation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Framework Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Framework Architecture Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-600 text-lg">AI Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Core agent abstraction with chat capabilities</p>
                    <ul className="text-base space-y-1">
                      <li>• Multiple provider support</li>
                      <li>• Tool integration</li>
                      <li>• Streaming responses</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-600 text-lg">Workflows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Graph-based orchestration of agent workflows</p>
                    <ul className="text-base space-y-1">
                      <li>• Deterministic execution</li>
                      <li>• Checkpointing</li>
                      <li>• Time-travel debugging</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-600 text-lg">Agent Thread</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Unified memory management for agents</p>
                    <ul className="text-base space-y-1">
                      <li>• Short-term (chat history)</li>
                      <li>• Long-term (preferences)</li>
                      <li>• External storage support</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}
              >
                <h4 className="font-semibold">Basic Agent Framework Implementation</h4>
                <pre className={conceptCodeBlock("text-base p-4 overflow-x-auto")}>{`from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential

# Create agent with Azure OpenAI
agent = AzureOpenAIResponsesClient(
    credential=AzureCliCredential()
).create_agent(
    name="assistant",
    instructions="You are a helpful AI assistant."
)

# Run agent
result = await agent.run("Help me solve this problem step by step")

# Multi-agent workflow
from agent_framework.workflows import Workflow

workflow = Workflow()
researcher = workflow.add_agent("researcher", instructions="Research specialist")
analyst = workflow.add_agent("analyst", instructions="Data analyst")

# Connect agents in graph
workflow.connect(researcher, analyst)
result = await workflow.run("Analyze market trends")`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Agent Framework vs Other Frameworks */}
          <Card>
            <CardHeader>
              <CardTitle>Microsoft Agent Framework vs Other Multi-Agent Frameworks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border/60 text-sm">
                  <thead>
                    <tr className="bg-muted/70 text-foreground">
                      <th className="border border-border/60 p-2 text-left font-semibold">Feature</th>
                      <th className="border border-border/60 p-2 text-center font-semibold">Agent Framework</th>
                      <th className="border border-border/60 p-2 text-center font-semibold">CrewAI</th>
                      <th className="border border-border/60 p-2 text-center font-semibold">LangGraph</th>
                    </tr>
                  </thead>
                  <tbody className="text-base">
                    <tr>
                      <td className="border border-border/60 p-2 font-medium">Graph Workflows</td>
                      <td className="border border-border/60 p-2 text-center">✅ Native</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Limited</td>
                      <td className="border border-border/60 p-2 text-center">✅ Native</td>
                    </tr>
                    <tr>
                      <td className="border border-border/60 p-2 font-medium">Built-in Observability</td>
                      <td className="border border-border/60 p-2 text-center">✅ OpenTelemetry</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Custom</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Custom</td>
                    </tr>
                    <tr>
                      <td className="border border-border/60 p-2 font-medium">Human-in-Loop</td>
                      <td className="border border-border/60 p-2 text-center">✅ Native</td>
                      <td className="border border-border/60 p-2 text-center">❌ Limited</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Custom</td>
                    </tr>
                    <tr>
                      <td className="border border-border/60 p-2 font-medium">Multi-Language</td>
                      <td className="border border-border/60 p-2 text-center">✅ Python & .NET</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Python only</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Python only</td>
                    </tr>
                    <tr>
                      <td className="border border-border/60 p-2 font-medium">Microsoft Integration</td>
                      <td className="border border-border/60 p-2 text-center">✅ Excellent</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Good</td>
                      <td className="border border-border/60 p-2 text-center">🔶 Good</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Agent Framework Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Framework Workflow Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-600 text-lg">Sequential Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Agents execute in deterministic order</p>
                    <ul className="text-base space-y-1">
                      <li>• Step-by-step processing</li>
                      <li>• Data passing between agents</li>
                      <li>• Checkpointing support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-orange-600 text-lg">Group Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Multiple agents collaborating in a group</p>
                    <ul className="text-base space-y-1">
                      <li>• Moderated discussions</li>
                      <li>• Specialized expert agents</li>
                      <li>• Consensus building</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-teal-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-teal-600 text-lg">Sequential Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Agents working in a predefined sequence</p>
                    <ul className="text-base space-y-1">
                      <li>• Pipeline processing</li>
                      <li>• Step-by-step workflows</li>
                      <li>• Quality gates</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-pink-600 text-lg">Nested Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3">Hierarchical conversations with sub-groups</p>
                    <ul className="text-base space-y-1">
                      <li>• Complex problem decomposition</li>
                      <li>• Parallel workstreams</li>
                      <li>• Result synthesis</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <ConceptLayout
        conceptId="multi-agent-systems"
        title="Multi-Agent Systems"
        description="Understanding how multiple AI agents coordinate, negotiate, and collaborate"
        tabs={tabs}
        onMarkComplete={onMarkComplete}
        onNavigateToNext={onNavigateToNext}
      />
      <div className="mt-4 border-t pt-6 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Related</h4>
        <a
          href="#agentic-commerce-ap2"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          <span className="font-medium">Agentic Commerce & AP2</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">mandate chain coordination & delegation</span>
        </a>
      </div>
    </div>
  )
}

// Related: Agentic Commerce & AP2 cross-link inserted (mandate chain is an advanced
// coordination specialization bridging secure delegation with transactional integrity.)








