import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, ArrowClockwise } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock, conceptPill } from "./conceptStyles";

const A2ACommunicationPatterns: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<'direct' | 'broadcast' | 'hierarchical'>('direct');
  const [activeMicroLesson, setActiveMicroLesson] = useState<string | null>(null);
  const [userKnowledgeLevel, setUserKnowledgeLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const colors = {
    background: isDarkMode ? '#1f2937' : '#ffffff',
    border: isDarkMode ? '#374151' : '#d1d5db',
    text: isDarkMode ? '#f9fafb' : '#111827',
    primary: isDarkMode ? '#3b82f6' : '#2563eb',
    secondary: isDarkMode ? '#6b7280' : '#6b7280',
    active: isDarkMode ? '#10b981' : '#059669',
    coordinator: isDarkMode ? '#f59e0b' : '#d97706',
    specialist: isDarkMode ? '#8b5cf6' : '#7c3aed',
    message: isDarkMode ? '#ef4444' : '#dc2626',
    accent: isDarkMode ? '#f59e0b' : '#d97706'
  };

  const agents = {
    direct: [
      { id: 'research', name: 'Research Agent', type: 'specialist', x: 120, y: 100, icon: '🔍' },
      { id: 'writing', name: 'Writing Agent', type: 'specialist', x: 400, y: 100, icon: '✍️' },
      { id: 'analysis', name: 'Analysis Agent', type: 'specialist', x: 260, y: 200, icon: '📊' }
    ],
    broadcast: [
      { id: 'coordinator', name: 'Coordinator', type: 'coordinator', x: 260, y: 80, icon: '🎯' },
      { id: 'data', name: 'Data Agent', type: 'specialist', x: 120, y: 180, icon: '📊' },
      { id: 'nlp', name: 'NLP Agent', type: 'specialist', x: 260, y: 230, icon: '🗣️' },
      { id: 'vision', name: 'Vision Agent', type: 'specialist', x: 400, y: 180, icon: '👁️' }
    ],
    hierarchical: [
      { id: 'master', name: 'Master Agent', type: 'coordinator', x: 260, y: 60, icon: '👑' },
      { id: 'sub1', name: 'Sub-Agent 1', type: 'coordinator', x: 180, y: 140, icon: '🔧' },
      { id: 'sub2', name: 'Sub-Agent 2', type: 'coordinator', x: 340, y: 140, icon: '🔧' },
      { id: 'worker1', name: 'Worker 1', type: 'specialist', x: 100, y: 220, icon: '⚙️' },
      { id: 'worker2', name: 'Worker 2', type: 'specialist', x: 260, y: 220, icon: '⚙️' },
      { id: 'worker3', name: 'Worker 3', type: 'specialist', x: 420, y: 220, icon: '⚙️' }
    ]
  };

  const communications = {
    direct: [
      { from: 'research', to: 'writing', message: 'Research findings', color: colors.message, contextId: 'ctx-001' },
      { from: 'writing', to: 'analysis', message: 'Draft content', color: colors.message, contextId: 'ctx-001' },
      { from: 'analysis', to: 'research', message: 'Feedback request', color: colors.message, contextId: 'ctx-001' }
    ],
    broadcast: [
      { from: 'coordinator', to: 'data', message: 'Task assignment', color: colors.coordinator, contextId: 'ctx-002' },
      { from: 'coordinator', to: 'nlp', message: 'Task assignment', color: colors.coordinator, contextId: 'ctx-002' },
      { from: 'coordinator', to: 'vision', message: 'Task assignment', color: colors.coordinator, contextId: 'ctx-002' },
      { from: 'data', to: 'coordinator', message: 'Results', color: colors.specialist, contextId: 'ctx-002' },
      { from: 'nlp', to: 'coordinator', message: 'Results', color: colors.specialist, contextId: 'ctx-002' },
      { from: 'vision', to: 'coordinator', message: 'Results', color: colors.specialist, contextId: 'ctx-002' }
    ],
    hierarchical: [
      { from: 'master', to: 'sub1', message: 'Delegate task A', color: colors.coordinator, contextId: 'ctx-003' },
      { from: 'master', to: 'sub2', message: 'Delegate task B', color: colors.coordinator, contextId: 'ctx-003' },
      { from: 'sub1', to: 'worker1', message: 'Execute subtask', color: colors.primary, contextId: 'ctx-003' },
      { from: 'sub1', to: 'worker2', message: 'Execute subtask', color: colors.primary, contextId: 'ctx-003' },
      { from: 'sub2', to: 'worker3', message: 'Execute subtask', color: colors.primary, contextId: 'ctx-003' },
      { from: 'worker1', to: 'sub1', message: 'Subtask complete', color: colors.specialist, contextId: 'ctx-003' },
      { from: 'worker2', to: 'sub1', message: 'Subtask complete', color: colors.specialist, contextId: 'ctx-003' },
      { from: 'worker3', to: 'sub2', message: 'Subtask complete', color: colors.specialist, contextId: 'ctx-003' },
      { from: 'sub1', to: 'master', message: 'Task A complete', color: colors.active, contextId: 'ctx-003' },
      { from: 'sub2', to: 'master', message: 'Task B complete', color: colors.active, contextId: 'ctx-003' }
    ]
  };

  // Micro-learning content for A2A patterns (v1.0 Updated)
  const microLearningContent = {
    direct: {
      beginner: {
        title: "Direct Communication - Peer-to-Peer",
        content: "Agents communicate directly with each other as equals, like friends discussing a project. In A2A v1.0, each conversation uses a contextId to group related tasks.",
        codeExample: `// Direct agent communication (A2A v1.0)
const researchAgent = new A2AClient("Research");
const writingAgent = new A2AClient("Writing");

// Direct message passing with context
await researchAgent.sendMessage(writingAgent, {
  contextId: "ctx-project-001",
  message: {
    role: "user",
    parts: [{ text: researchResults }]
  }
});`,
        keyPoints: ["Peer-to-peer communication", "Context-aware messaging (contextId)", "Direct message passing", "Flexible interactions"],
        useCases: ["Collaborative problem solving", "Distributed decision making", "Peer review systems"]
      },
      intermediate: {
        title: "Direct Communication Protocol",
        content: "Agents use standardized A2A protocol bindings (JSON-RPC, gRPC, HTTP+JSON) to exchange information and coordinate actions.",
        codeExample: `// A2A v1.0 Protocol-based communication
class A2ADirectCommunication {
  async negotiate(agent1Card, agent2Card, proposal) {
    // Discover agent capabilities from Agent Cards
    const offer = await this.sendMessage(agent1Card.url, {
      contextId: "negotiation-001",
      message: { role: "user", parts: [{ data: proposal }] }
    });
    return this.subscribeToTask(offer.taskId);
  }
}`,
        keyPoints: ["Protocol bindings (JSON-RPC, gRPC, REST)", "Agent Card discovery", "Task lifecycle management", "Streaming support"],
        useCases: ["Resource sharing", "Task allocation", "Consensus building"]
      },
      advanced: {
        title: "Advanced Direct Communication",
        content: "Sophisticated direct communication with security schemes, push notifications, and extended agent cards.",
        codeExample: `// A2A v1.0 Advanced communication
class AdvancedA2AComm {
  constructor(agentCard) {
    this.card = agentCard;
    this.capabilities = agentCard.capabilities;
  }
  
  async secureComm(targetAgent, message) {
    // Use securitySchemes from Agent Card
    const token = await this.authenticate(
      targetAgent.securitySchemes
    );
    return this.sendMessage(targetAgent.url, message, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
  }
}`,
        keyPoints: ["Security schemes (OAuth2, API keys)", "Push notifications", "Extended Agent Cards", "Multi-turn contexts"],
        useCases: ["Enterprise systems", "Secure collaboration", "Regulated industries"]
      }
    },
    broadcast: {
      beginner: {
        title: "Broadcast Pattern - One-to-Many",
        content: "One coordinator agent sends messages to multiple specialist agents, like a team leader giving assignments.",
        codeExample: `// Broadcast communication (A2A v1.0)
const coordinator = new A2AClient(coordinatorCard);
const specialists = [dataAgent, nlpAgent, visionAgent];

// Broadcast task with shared context
const contextId = crypto.randomUUID();
for (const agent of specialists) {
  await coordinator.sendMessage(agent.url, {
    contextId,
    message: {
      role: "user",
      parts: [{ text: "Process document section" }]
    }
  });
}`,
        keyPoints: ["One-to-many communication", "Shared contextId", "Parallel task execution", "Efficient distribution"],
        useCases: ["Task distribution", "Information dissemination", "Parallel processing"]
      },
      intermediate: {
        title: "Coordinator-Specialist Architecture",
        content: "A sophisticated coordinator manages multiple specialists using A2A's task lifecycle and streaming capabilities.",
        codeExample: `// Advanced broadcast with A2A v1.0
class SmartCoordinator {
  async distributeTask(task, specialists) {
    const contextId = crypto.randomUUID();
    const tasks = await Promise.all(
      specialists.map(agent => 
        this.sendMessage(agent.url, {
          contextId,
          message: { role: "user", parts: [{ data: task }] }
        })
      )
    );
    
    // Subscribe to all task updates
    return this.subscribeToTasks(tasks.map(t => t.taskId));
  }
}`,
        keyPoints: ["Task state management", "SubscribeToTask streaming", "Result aggregation", "Fault tolerance"],
        useCases: ["Distributed computing", "Microservices", "Parallel data processing"]
      },
      advanced: {
        title: "Dynamic Broadcast Networks",
        content: "Self-organizing broadcast networks using A2A discovery and extended agent cards.",
        codeExample: `// Dynamic A2A broadcast network
class DynamicBroadcastNetwork {
  async discoverAgents(capability) {
    // Query agent registry for matching skills
    const agents = await this.registry.findBySkill(capability);
    return agents.filter(a => 
      a.capabilities.streaming === true
    );
  }
  
  async optimizedBroadcast(message, requiredSkill) {
    const agents = await this.discoverAgents(requiredSkill);
    return this.parallelSend(agents, message);
  }
}`,
        keyPoints: ["Agent discovery", "Capability-based routing", "Performance monitoring", "Network optimization"],
        useCases: ["Cloud orchestration", "Edge computing", "Resilient systems"]
      }
    },
    hierarchical: {
      beginner: {
        title: "Hierarchical Pattern - Chain of Command",
        content: "Agents are organized in levels, like a company structure with managers and employees.",
        codeExample: `// Hierarchical communication (A2A v1.0)
  }
  
  async communicateWithTrust(agent, message) {
    const trustScore = this.trustModel.evaluate(agent);
    const adaptedProtocol = this.adaptProtocol(trustScore);
    return adaptedProtocol.send(agent, message);
  }
}`,
        keyPoints: ["Trust-based communication", "Reputation systems", "Adaptive protocols", "Security mechanisms"],
        useCases: ["Autonomous trading", "Secure collaboration", "Decentralized systems"]
      }
    },
    broadcast: {
      beginner: {
        title: "Broadcast Pattern - One-to-Many",
        content: "One coordinator agent sends messages to multiple specialist agents, like a team leader giving assignments.",
        codeExample: `// Broadcast communication
const coordinator = new CoordinatorAgent();
const specialists = [dataAgent, nlpAgent, visionAgent];

// Broadcast task to all specialists
coordinator.broadcast(specialists, {
  type: "task_assignment",
  task: "process_document",
  deadline: "2024-01-15"
});`,
        keyPoints: ["One-to-many communication", "Centralized coordination", "Parallel task execution", "Efficient distribution"],
        useCases: ["Task distribution", "Information dissemination", "Parallel processing"]
      },
      intermediate: {
        title: "Coordinator-Specialist Architecture",
        content: "A sophisticated coordinator manages multiple specialists, handling load balancing and result aggregation.",
        codeExample: `// Advanced broadcast with load balancing
class SmartCoordinator {
  async distributeTask(task, specialists) {
    const loadBalanced = this.balanceLoad(specialists);
    const assignments = this.createAssignments(task, loadBalanced);
    
    const results = await Promise.all(
      assignments.map(assignment => 
        this.assignToSpecialist(assignment)
      )
    );
    
    return this.aggregateResults(results);
  }
}`,
        keyPoints: ["Load balancing", "Result aggregation", "Fault tolerance", "Performance optimization"],
        useCases: ["Distributed computing", "Microservices", "Parallel data processing"]
      },
      advanced: {
        title: "Dynamic Broadcast Networks",
        content: "Self-organizing broadcast networks that adapt topology based on performance and reliability.",
        codeExample: `// Dynamic broadcast network
class DynamicBroadcastNetwork {
  constructor() {
    this.topology = new AdaptiveTopology();
    this.performanceMonitor = new PerformanceMonitor();
  }
  
  async optimizeBroadcast(message, targets) {
    const performance = this.performanceMonitor.analyze();
    const optimizedTopology = this.topology.adapt(performance);
    return this.broadcast(message, targets, optimizedTopology);
  }
}`,
        keyPoints: ["Adaptive topology", "Self-organization", "Performance monitoring", "Network optimization"],
        useCases: ["Cloud orchestration", "Edge computing", "Resilient systems"]
      }
    },
    hierarchical: {
      beginner: {
        title: "Hierarchical Pattern - Chain of Command",
        content: "Agents are organized in levels, like a company structure with managers and employees.",
        codeExample: `// Hierarchical communication
const master = new MasterAgent();
const subAgents = [subAgent1, subAgent2];
const workers = [worker1, worker2, worker3];

// Top-down delegation
master.delegate(subAgent1, "taskA");
subAgent1.assign(worker1, "subtaskA1");
subAgent1.assign(worker2, "subtaskA2");`,
        keyPoints: ["Multi-level organization", "Top-down delegation", "Bottom-up reporting", "Clear authority"],
        useCases: ["Organizational workflows", "Project management", "Command structures"]
      },
      intermediate: {
        title: "Multi-Level Agent Hierarchy",
        content: "Complex hierarchies with multiple management levels, delegation strategies, and reporting mechanisms.",
        codeExample: `// Multi-level hierarchy
class HierarchicalOrganization {
  constructor() {
    this.levels = new Map();
    this.delegationStrategy = new DelegationStrategy();
  }
  
  async executeHierarchicalTask(task) {
    const decomposed = this.decomposeTask(task);
    const assignments = this.delegationStrategy.assign(decomposed);
    
    return this.executeWithReporting(assignments);
  }
}`,
        keyPoints: ["Task decomposition", "Delegation strategies", "Progress reporting", "Hierarchy management"],
        useCases: ["Enterprise systems", "Manufacturing", "Government processes"]
      },
      advanced: {
        title: "Adaptive Hierarchical Networks",
        content: "Dynamic hierarchies that reorganize based on task requirements, agent capabilities, and performance.",
        codeExample: `// Adaptive hierarchy
class AdaptiveHierarchy {
  constructor() {
    this.organizationManager = new OrganizationManager();
    this.capabilityMatcher = new CapabilityMatcher();
  }
  
  async adaptToTask(task) {
    const requirements = this.analyzeRequirements(task);
    const optimalStructure = this.organizationManager
      .designOptimalHierarchy(requirements);
    
    return this.reorganize(optimalStructure);
  }
}`,
        keyPoints: ["Dynamic reorganization", "Capability matching", "Performance optimization", "Adaptive structures"],
        useCases: ["Agile organizations", "Crisis response", "Adaptive systems"]
      }
    }
  };

  const showMicroLesson = (agentId: string) => {
    setActiveMicroLesson(agentId);
  };

  const hideMicroLesson = () => {
    setActiveMicroLesson(null);
  };

  useEffect(() => {
    if (isPlaying) {
      const comms = communications[selectedPattern];
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % comms.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedPattern]);

  const getAgentColor = (type: string) => {
    switch (type) {
      case 'coordinator': return colors.coordinator;
      case 'specialist': return colors.specialist;
      default: return colors.primary;
    }
  };

  const renderCommunication = () => {
    const currentAgents = agents[selectedPattern];
    const currentComms = communications[selectedPattern];
    const currentComm = currentComms[currentMessage];

    return (
      <svg width="600" height="320" viewBox="0 0 600 320" className="w-full h-auto border rounded-lg" style={{ backgroundColor: colors.background }}>
        <defs>
          <marker id="comm-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={currentComm?.color || colors.secondary} />
          </marker>
          <filter id="pulse">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Draw communication lines */}
        {currentComms.map((comm, index) => {
          const fromAgent = currentAgents.find(a => a.id === comm.from);
          const toAgent = currentAgents.find(a => a.id === comm.to);
          
          if (!fromAgent || !toAgent) return null;
          
          const isActive = index === currentMessage && isPlaying;
          
          return (
            <g key={`comm-${index}`}>
              <line
                x1={fromAgent.x + 30}
                y1={fromAgent.y + 30}
                x2={toAgent.x + 30}
                y2={toAgent.y + 30}
                stroke={isActive ? comm.color : colors.border}
                strokeWidth={isActive ? "3" : "1"}
                markerEnd="url(#comm-arrow)"
                className={isActive ? "animate-pulse" : ""}
                strokeDasharray={isActive ? "5,5" : "none"}
              />
              {isActive && (
                <text
                  x={(fromAgent.x + toAgent.x) / 2 + 30}
                  y={(fromAgent.y + toAgent.y) / 2 + 20}
                  textAnchor="middle"
                  fill={comm.color}
                  className="text-lg font-medium animate-pulse"
                >
                  {comm.message}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw agents */}
        {currentAgents.map((agent) => (
          <g key={agent.id}>
            <circle
              cx={agent.x + 30}
              cy={agent.y + 30}
              r="25"
              fill={getAgentColor(agent.type)}
              stroke={colors.border}
              strokeWidth="2"
              filter={
                (currentComm?.from === agent.id || currentComm?.to === agent.id) && isPlaying
                  ? "url(#pulse)"
                  : "none"
              }
            />
            <text
              x={agent.x + 30}
              y={agent.y + 35}
              textAnchor="middle"
              className="text-lg"
            >
              {agent.icon}
            </text>
            <text
              x={agent.x + 30}
              y={agent.y + 65}
              textAnchor="middle"
              fill={colors.text}
              className="text-lg font-medium"
            >
              {agent.name}
            </text>
            
            {/* Micro-learning trigger for pattern-level learning */}
            {agent.id === currentAgents[0].id && (
              <>
                <circle
                  cx={agent.x + 50}
                  cy={agent.y + 10}
                  r="8"
                  fill={colors.accent}
                  stroke={colors.border}
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => showMicroLesson(selectedPattern)}
                />
                <text
                  x={agent.x + 50}
                  y={agent.y + 15}
                  textAnchor="middle"
                  fill={colors.background}
                  className="text-lg font-bold pointer-events-none"
                >
                  ?
                </text>
              </>
            )}
          </g>
        ))}
        

      </svg>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Agent-to-Agent Communication Patterns</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCurrentMessage(0);
                setIsPlaying(false);
              }}
            >
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Explore different communication patterns between AI agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedPattern} onValueChange={(value) => {
          setSelectedPattern(value as 'direct' | 'broadcast' | 'hierarchical');
          setCurrentMessage(0);
          setIsPlaying(false);
        }}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="direct">Direct Communication</TabsTrigger>
            <TabsTrigger value="broadcast">Broadcast Pattern</TabsTrigger>
            <TabsTrigger value="hierarchical">Hierarchical Pattern</TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="space-y-4">
            <div className="text-lg text-muted-foreground">
              <strong>Direct Communication:</strong> Agents communicate directly with each other as peers, 
              sharing information and coordinating tasks through point-to-point messages.
            </div>
            {renderCommunication()}
          </TabsContent>
          
          <TabsContent value="broadcast" className="space-y-4">
            <div className="text-lg text-muted-foreground">
              <strong>Broadcast Pattern:</strong> A coordinator agent distributes tasks to multiple specialist agents 
              and collects their results, managing the overall workflow.
            </div>
            {renderCommunication()}
          </TabsContent>
          
          <TabsContent value="hierarchical" className="space-y-4">
            <div className="text-lg text-muted-foreground">
              <strong>Hierarchical Pattern:</strong> Multi-level organization with master agents delegating to 
              sub-agents, which in turn coordinate worker agents for complex task decomposition.
            </div>
            {renderCommunication()}
          </TabsContent>
        </Tabs>

        {/* Micro-learning display area */}
        {activeMicroLesson === selectedPattern && (
          <div
            className={conceptSurface(
              "mt-4 rounded-xl border-purple-300/50 dark:border-purple-700/70 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 shadow-lg"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/90 flex items-center justify-center text-white font-bold">
                  🤖
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {microLearningContent[selectedPattern][userKnowledgeLevel].title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {selectedPattern.charAt(0).toUpperCase() + selectedPattern.slice(1)} Communication Pattern
                  </p>
                </div>
              </div>
              <button
                onClick={hideMicroLesson}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors"
                aria-label="Close micro-learning"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Knowledge level selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Choose your knowledge level:
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setUserKnowledgeLevel(level)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      userKnowledgeLevel === level
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-background text-foreground/80 hover:bg-muted/60 border border-border/60'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {microLearningContent[selectedPattern][userKnowledgeLevel].content}
                </p>
              </div>

              {/* Code example */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Code Example</h4>
                <pre className={conceptCodeBlock("text-sm leading-relaxed text-emerald-400 overflow-x-auto p-4")}
                >
                  <code>{microLearningContent[selectedPattern][userKnowledgeLevel].codeExample}</code>
                </pre>
              </div>

              {/* Key points */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Points</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {microLearningContent[selectedPattern][userKnowledgeLevel].keyPoints.map((point, idx) => (
                    <div key={idx} className={conceptSurfaceSoft("flex items-start gap-3 p-3")}
                    >
                      <div className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 dark:text-purple-400 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use cases */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Use Cases</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {microLearningContent[selectedPattern][userKnowledgeLevel].useCases.map((useCase, idx) => (
                    <div key={idx} className={conceptSurfaceSoft("flex items-start gap-3 p-3")}
                    >
                      <div className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 dark:text-green-400 text-xs font-bold">→</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick tip */}
              <div className={conceptSurfaceSoft("border-amber-300/50 dark:border-amber-700/70 bg-amber-50/80 dark:bg-amber-950/60 p-4")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">💡</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Quick Tip</h5>
                    <p className="text-sm text-muted-foreground">
                      Switch between different communication patterns using the tabs above to see how agents can coordinate differently. 
                      Each pattern has its own strengths depending on the task complexity and team size.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check Your Understanding - Interactive Quiz */}
              <div className="mt-6 p-4 rounded-lg border-2 border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  🧠 Check Your Understanding
                </h4>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700">
                    <p className="font-medium text-sm mb-2">Q: A customer service bot needs to query a database for order history. Should it use A2A or MCP?</p>
                    <div className="flex gap-2 mt-2">
                      <button 
                        className="px-3 py-1 text-xs rounded-full border border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        onClick={() => alert('Think about it: Can a database THINK? No - it just executes queries. So use MCP!')}
                      >
                        A2A
                      </button>
                      <button 
                        className="px-3 py-1 text-xs rounded-full border border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        onClick={() => alert('✅ Correct! The database is a TOOL that executes commands. It cannot think or make decisions. Use MCP to connect to tools.')}
                      >
                        MCP ✓
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700">
                    <p className="font-medium text-sm mb-2">Q: You need a Research Agent to analyze competitor websites and summarize findings. A2A or MCP?</p>
                    <div className="flex gap-2 mt-2">
                      <button 
                        className="px-3 py-1 text-xs rounded-full border border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        onClick={() => alert('✅ Correct! The Research Agent can THINK, REASON, and make decisions about what to analyze. Use A2A for agent-to-agent collaboration.')}
                      >
                        A2A ✓
                      </button>
                      <button 
                        className="px-3 py-1 text-xs rounded-full border border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        onClick={() => alert('Think about it: The Research Agent can reason and adapt. It\'s not just executing a command - it\'s thinking. Use A2A!')}
                      >
                        MCP
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700">
                    <p className="text-sm text-muted-foreground">
                      <strong>💡 The Key Question:</strong> "Can the other party THINK?"<br/>
                      • Yes (reason, decide, adapt) → <strong className="text-orange-600">A2A</strong><br/>
                      • No (execute commands) → <strong className="text-blue-600">MCP</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className={conceptSurfaceSoft("mt-4 p-3")}
          >
            <div className="text-lg font-medium">
              Current Communication: {communications[selectedPattern][currentMessage]?.message}
            </div>
            <div className="text-lg text-muted-foreground mt-1">
              From: {communications[selectedPattern][currentMessage]?.from} → 
              To: {communications[selectedPattern][currentMessage]?.to}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default A2ACommunicationPatterns;






