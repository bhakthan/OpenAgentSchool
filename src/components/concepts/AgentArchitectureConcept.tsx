import React from "react";
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, Gear, Clock, Memory, ArrowsClockwise, Play, Pause, Stop, Archive } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';

interface AgentArchitectureConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentArchitectureConcept({ onMarkComplete, onNavigateToNext }: AgentArchitectureConceptProps) {
  const tabs = [
    {
      id: 'architecture',
      title: 'Agent Architecture',
      description: 'Explore the core components and design principles of AI agent systems, including reasoning, memory, tools, and goals.',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="w-5 h-5" />
                Agent Architecture Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                AI agents consist of several interconnected components that work together to enable autonomous behavior. 
                Understanding these components is crucial for designing effective agent systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🧠 Reasoning Engine</h4>
                  <p className="text-lg text-muted-foreground">
                    The core LLM that processes information, makes decisions, and generates responses
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📝 Memory System</h4>
                  <p className="text-lg text-muted-foreground">
                    Stores context, experiences, and learned patterns for future use
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔧 Tool Interface</h4>
                  <p className="text-lg text-muted-foreground">
                    Connects agents to external systems, APIs, and data sources
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Goal Manager</h4>
                  <p className="text-lg text-muted-foreground">
                    Tracks objectives, plans actions, and monitors progress
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Architectural Principles:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Modularity:</strong> Components can be independently developed and tested</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Extensibility:</strong> New capabilities can be added without core changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Observability:</strong> All components provide monitoring and debugging hooks</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Azure AI Agent Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-lg">{`// Basic Agent Architecture in Azure AI SDK
class AzureAIAgent {
  constructor(config) {
    this.reasoning = new OpenAIService(config.model)
    this.memory = new ConversationMemory()
    this.tools = new ToolRegistry()
    this.goals = new GoalManager()
  }

  async process(input) {
    // 1. Load context from memory
    const context = await this.memory.getContext()
    
    // 2. Reason about the input
    const reasoning = await this.reasoning.process(input, context)
    
    // 3. Plan actions if needed
    const plan = await this.goals.createPlan(reasoning)
    
    // 4. Execute actions using tools
    const results = await this.tools.execute(plan)
    
    // 5. Update memory with new information
    await this.memory.store(input, reasoning, results)
    
    return results
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'lifecycle',
      title: 'Agent Lifecycle',
      description: 'Understand the stages of an agent’s lifecycle: perception, analysis, selection, execution, and reflection.',
      icon: <Clock className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (() => {
        const [isSimulating, setIsSimulating] = React.useState(false);
        const [currentStage, setCurrentStage] = React.useState(0);
        const stages = [
          {
            label: 'Birth & Initialization',
            color: '#3b82f6',
            icon: <Play className="w-4 h-4" />,
            note: 'Agent is created with initial configuration, capabilities, and goals',
          },
          {
            label: 'Active Execution',
            color: '#22c55e',
            icon: <Gear className="w-4 h-4" />,
            note: 'Agent processes tasks, learns from interactions, and adapts behavior',
          },
          {
            label: 'Hibernation',
            color: '#eab308',
            icon: <Pause className="w-4 h-4" />,
            note: 'Agent pauses execution while preserving state for future resumption',
          },
          {
            label: 'Termination',
            color: '#ef4444',
            icon: <Stop className="w-4 h-4" />,
            note: 'Agent completes final tasks, saves state, and releases resources',
          },
        ];

        React.useEffect(() => {
          let timer: ReturnType<typeof setTimeout>;
          if (isSimulating && currentStage < stages.length) {
            timer = setTimeout(() => {
              setCurrentStage((prev) => prev + 1);
            }, 2200); // Slower simulation: 2.2 seconds per stage
          } else if (currentStage >= stages.length) {
            setIsSimulating(false);
            setCurrentStage(0);
          }
          return () => clearTimeout(timer);
        }, [isSimulating, currentStage]);

        // SVG layout variables
        const svgWidth = 900;
        const svgHeight = 190; // Increased height for more space
        const nodeRadius = 40;
        const nodeY = 80;
        const nodeSpacing = (svgWidth - 2 * 100) / (stages.length - 1);
        // Detect dark mode
        const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const labelColor = isDark ? '#F3F4F6' : '#111';
        const noteBg = isDark ? 'bg-gray-900' : 'bg-muted/40';
        const noteText = isDark ? 'text-white' : 'text-foreground';

        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="relative pb-0">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ArrowsClockwise className="w-6 h-6" />
                  Agent Lifecycle Stages
                </CardTitle>
                <div className="absolute top-0 right-0">
                  <button
                    className="px-5 py-2 bg-primary text-white rounded shadow text-lg font-semibold hover:bg-primary/80 disabled:opacity-50 mt-2 mr-2"
                    onClick={() => { setIsSimulating(true); setCurrentStage(0); }}
                    disabled={isSimulating}
                  >
                    {isSimulating ? 'Simulating...' : 'Start Simulation'}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-muted-foreground font-medium">Lifecycle Progress</span>
                  <Progress value={isSimulating ? (currentStage / stages.length) * 100 : 0} className="w-40 h-4" />
                </div>
                <div className="flex flex-col items-center gap-8">
                  <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="my-2">
                    {/* Draw connecting line */}
                    <line x1={100} y1={nodeY} x2={svgWidth-100} y2={nodeY} stroke="#d1d5db" strokeWidth="6" />
                    {stages.map((stage, idx) => (
                      <g key={stage.label}>
                        <circle
                          cx={100 + idx * nodeSpacing}
                          cy={nodeY}
                          r={nodeRadius}
                          fill={currentStage === idx ? stage.color : '#f3f4f6'}
                          stroke={stage.color}
                          strokeWidth={currentStage === idx ? 8 : 3}
                        />
                        <text
                          x={100 + idx * nodeSpacing}
                          y={nodeY}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fontSize="28"
                          fill={currentStage === idx ? '#fff' : stage.color}
                          fontWeight="bold"
                        >{idx + 1}</text>
                        <foreignObject
                          x={100 + idx * nodeSpacing - 80}
                          y={nodeY + nodeRadius + 18}
                          width={160}
                          height={60}
                        >
                          <div style={{color: labelColor, fontWeight: 'bolder', fontSize: 20, textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.2}}>
                            {stage.label}
                          </div>
                        </foreignObject>
                      </g>
                    ))}
                  </svg>
                  {/* Compact note below SVG for current stage */}
                  <div className="w-full flex justify-center">
                    <div className={`max-w-3xl text-center text-xl font-semibold ${noteText} mt-2 mb-4`} style={{background: 'none', boxShadow: 'none', borderRadius: 0, padding: 0, minHeight: 'unset'}}>
                      {stages[currentStage]?.note || 'Click Start Simulation to begin the agent lifecycle.'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Birth & Initialization
                      </h4>
                      <p className="text-lg text-muted-foreground mt-1">
                        Agent is created with initial configuration, capabilities, and goals
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">Configuration</Badge>
                        <Badge variant="outline" className="ml-2">Capability Loading</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20">
                      <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Gear className="w-4 h-4" />
                        Active Execution
                      </h4>
                      <p className="text-lg text-muted-foreground mt-1">
                        Agent processes tasks, learns from interactions, and adapts behavior
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">Task Processing</Badge>
                        <Badge variant="outline" className="ml-2">Learning</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Pause className="w-4 h-4" />
                        Hibernation
                      </h4>
                      <p className="text-lg text-muted-foreground mt-1">
                        Agent pauses execution while preserving state for future resumption
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">State Preservation</Badge>
                        <Badge variant="outline" className="ml-2">Resource Release</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20">
                      <span className="text-red-600 dark:text-red-400 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Stop className="w-4 h-4" />
                        Termination
                      </h4>
                      <p className="text-lg text-muted-foreground mt-1">
                        Agent completes final tasks, saves state, and releases resources
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">Cleanup</Badge>
                        <Badge variant="outline" className="ml-2">State Archival</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Memory className="w-5 h-5" />
                  State Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    Proper state management is crucial for agent reliability and performance. 
                    Agents must maintain consistency across lifecycle transitions.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <pre className="text-lg">{`// Agent State Management Example
class AgentStateManager {
  async saveState(agentId, state) {
    return await this.storage.save({
      agentId,
      timestamp: Date.now(),
      memory: state.memory,
      goals: state.goals,
      capabilities: state.capabilities,
      metrics: state.metrics
    })
  }

  async loadState(agentId) {
    const state = await this.storage.load(agentId)
    return {
      memory: new ConversationMemory(state.memory),
      goals: new GoalManager(state.goals),
      capabilities: new CapabilityRegistry(state.capabilities),
      metrics: new MetricsCollector(state.metrics)
    }
  }
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })()
    },
    {
      id: 'decision-making',
      title: 'Decision Making',
      description: 'How agents process information and make decisions',
      icon: <Brain className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Decision Making Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Agent decision making involves perceiving the environment, reasoning about options, 
                and selecting appropriate actions based on goals and constraints.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Decision Making Framework:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Perception:</strong> Gather and interpret relevant information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Analysis:</strong> Evaluate options against goals and constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Selection:</strong> Choose the best action based on reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Execution:</strong> Implement the selected action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span><strong>Reflection:</strong> Evaluate outcomes and learn</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-architecture"
      title="Agent Architecture & Lifecycle"
      description="Understanding the fundamental building blocks and lifecycle of AI agents, including their reasoning, memory, and interaction with tools."
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
