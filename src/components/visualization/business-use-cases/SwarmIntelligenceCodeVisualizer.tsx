import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  ArrowClockwise, 
  Drone,
  MapPin,
  Target,
  Lightning,
  Database
} from '@phosphor-icons/react';

interface Agent {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  status: string;
  discoveries: string[];
  memorySize: number;
}

export const SwarmIntelligenceCodeVisualizer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize agents
  useEffect(() => {
    const initialAgents: Agent[] = [
      { id: 1, x: 50, y: 100, targetX: 200, targetY: 150, color: 'bg-blue-500', status: 'Searching', discoveries: [], memorySize: 0 },
      { id: 2, x: 100, y: 50, targetX: 250, targetY: 100, color: 'bg-green-500', status: 'Searching', discoveries: [], memorySize: 0 },
      { id: 3, x: 150, y: 120, targetX: 180, targetY: 200, color: 'bg-purple-500', status: 'Searching', discoveries: [], memorySize: 0 },
      { id: 4, x: 80, y: 150, targetX: 220, targetY: 120, color: 'bg-orange-500', status: 'Searching', discoveries: [], memorySize: 0 },
    ];
    setAgents(initialAgents);
  }, []);

  const steps = [
    "Initialize swarm with 4 agents + shared memory (Context Provider)",
    "Agents perceive local environment and read collective memory",
    "Apply local rules + deposit discoveries to shared memory",
    "Memory-enhanced stigmergy: agents follow pheromone trails",
    "Redis persistence maintains swarm knowledge across sessions",
    "Emergent optimization: collective learning from shared memory"
  ];

  const codeSteps = [
    `# Agent Framework with Memory
from azure.ai.agents import Agent, ContextProvider
from azure.ai.agents.stores import RedisChatMessageStore

class SwarmMemory(ContextProvider):
  def __init__(self):
    self.discovered_routes = {}
    self.obstacle_locations = set()`,
    `async def invoking(self, messages, **kwargs):
  # Inject collective memory before agent acts
  context = {
    "best_route": self.get_best_route(),
    "known_obstacles": list(self.obstacle_locations),
    "swarm_discoveries": self.discovered_routes
  }
  return Context(context)`,
    `def share_discovery(self, agent_id, route, quality):
  # Deposit discovery to collective memory
  if route not in self.discovered_routes:
    self.discovered_routes[route] = {
      "quality": quality,
      "discovered_by": agent_id,
      "pheromone_strength": 1.0
    }`,
    `# Create swarm agents with Redis persistence
swarm_memory = SwarmMemory()
agents = [
  Agent(
    name=f"drone_{i}",
    memory=RedisChatMessageStore(
      thread_id=f"swarm_{i}"
    ),
    context_providers=[swarm_memory]
  ) for i in range(5)
]`,
    `# Run swarm coordination with memory
for round in range(2):
  for agent in agents:
    response = await agent.run(
      "Explore and optimize delivery route"
    )
    # Memory automatically shared via Context Provider`,
    `# Emergent collective intelligence achieved
# - Agents learn from each other's discoveries
# - Redis maintains knowledge across sessions
# - Pheromone trails guide optimization
# - No central coordinator needed`
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setStep(prev => {
          const nextStep = (prev + 1) % steps.length;
          
          // Simulate agent movement and behavior with memory
          setAgents(prevAgents => 
            prevAgents.map(agent => {
              const progress = nextStep / steps.length;
              const newX = agent.x + (agent.targetX - agent.x) * 0.1;
              const newY = agent.y + (agent.targetY - agent.y) * 0.1;
              
              let status = 'Searching';
              let memorySize = 0;
              let discoveries: string[] = [];
              
              if (progress > 0.15) {
                status = 'Reading Memory';
                memorySize = 1;
              }
              if (progress > 0.3) {
                status = 'Coordinating';
                memorySize = 2;
                discoveries = ['Route A'];
              }
              if (progress > 0.5) {
                status = 'Learning';
                memorySize = 3;
                discoveries = ['Route A', 'Obstacle B'];
              }
              if (progress > 0.7) {
                status = 'Optimizing';
                memorySize = 5;
                discoveries = ['Route A', 'Obstacle B', 'Best Path'];
              }
              if (progress > 0.85) {
                status = 'Target Reached';
                memorySize = 7;
                discoveries = ['Route A', 'Obstacle B', 'Best Path', 'Saved to Redis'];
              }
              
              return {
                ...agent,
                x: newX,
                y: newY,
                status,
                memorySize,
                discoveries
              };
            })
          );
          
          // Add logs
          setLogs(prev => [...prev, `Step ${nextStep + 1}: ${steps[nextStep]}`].slice(-6));
          
          return nextStep;
        });
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, steps.length]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setStep(0);
    setLogs([]);
    // Reset agent positions
    setAgents(prev => prev.map((agent, i) => ({
      ...agent,
      x: [50, 100, 150, 80][i],
      y: [100, 50, 120, 150][i],
      status: 'Searching',
      discoveries: [],
      memorySize: 0
    })));
  };

  return (
    <div className="w-full space-y-4">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightning className="text-yellow-500" size={20} />
            Swarm Intelligence Live Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={toggleSimulation} variant={isRunning ? "destructive" : "default"}>
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Watch autonomous agents coordinate using Agent Framework Context Providers for shared memory and Redis for persistence. Observe how collective learning emerges through stigmergy (pheromone trails) without central control.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Visualization Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Swarm Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed">
              {/* Target zones */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-red-200 dark:bg-red-800 rounded-full flex items-center justify-center">
                <Target size={16} className="text-red-600" />
              </div>
              <div className="absolute bottom-4 right-8 w-8 h-8 bg-red-200 dark:bg-red-800 rounded-full flex items-center justify-center">
                <Target size={16} className="text-red-600" />
              </div>
              
              {/* Agents */}
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`absolute w-6 h-6 ${agent.color} rounded-full flex items-center justify-center transition-all duration-500 shadow-lg`}
                  style={{
                    left: `${agent.x}px`,
                    top: `${agent.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Drone size={12} className="text-white" />
                </div>
              ))}
              
              {/* Pheromone trails (environmental signals) */}
              {step > 2 && (
                <div className="absolute inset-0 opacity-30">
                  {agents.map((agent) => (
                    <div
                      key={`trail-${agent.id}`}
                      className="absolute w-2 h-2 bg-blue-300 rounded-full"
                      style={{
                        left: `${agent.x - 10}px`,
                        top: `${agent.y - 10}px`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm">Agent Status & Memory:</h4>
              <div className="grid grid-cols-1 gap-2">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-2 text-xs p-2 bg-muted/40 rounded">
                    <div className={`w-3 h-3 ${agent.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="font-medium">Agent {agent.id}: {agent.status}</div>
                      <div className="text-muted-foreground">
                        Memory: {agent.memorySize} items
                        {agent.discoveries.length > 0 && (
                          <span className="ml-2">| Discoveries: {agent.discoveries.slice(0, 2).join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Code Execution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-auto">
              <pre className="whitespace-pre-wrap">{codeSteps[step] || codeSteps[0]}</pre>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Execution Log:</h4>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg h-20 overflow-auto text-xs">
                {logs.map((log, i) => (
                  <div key={i} className="text-muted-foreground">{log}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collective Memory Pool */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database size={20} className="text-purple-500" />
            Collective Memory Pool (SwarmMemory Context Provider)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">Shared Discoveries</div>
                <div className="text-xs text-muted-foreground">
                  Total memory items: {Math.max(...agents.map(a => a.memorySize))}
                  {step > 2 && <span className="ml-2">| Active pheromone trails: {agents.filter(a => a.discoveries.length > 0).length}</span>}
                </div>
              </div>
            </div>
            
            {step > 1 && (
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <div className="text-xs font-medium mb-1">Best Routes</div>
                  <div className="text-xs text-muted-foreground">
                    {step > 2 ? '3 routes discovered' : 'Learning...'}
                  </div>
                </div>
                <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded border border-orange-200 dark:border-orange-800">
                  <div className="text-xs font-medium mb-1">Known Obstacles</div>
                  <div className="text-xs text-muted-foreground">
                    {step > 3 ? '2 obstacles mapped' : 'Scanning...'}
                  </div>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                  <div className="text-xs font-medium mb-1">Redis Persistence</div>
                  <div className="text-xs text-muted-foreground">
                    {step > 4 ? 'Active (4 threads)' : 'Standby'}
                  </div>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800">
                  <div className="text-xs font-medium mb-1">Pheromone Trails</div>
                  <div className="text-xs text-muted-foreground">
                    {step > 3 ? 'Evaporating (0.95)' : 'Inactive'}
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground italic">
              💡 Context Providers inject this shared memory before each agent action, enabling stigmergy-based coordination without direct communication.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-blue-500" />
            <span className="font-semibold">Step {step + 1}: {steps[step]}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {step === 0 && "Four autonomous agents are created with Agent Framework. Each agent has a Context Provider for shared memory and Redis persistence for long-term storage."}
            {step === 1 && "Each agent reads from the SwarmMemory Context Provider to access collective discoveries (routes, obstacles, best paths) made by other agents."}
            {step === 2 && "Agents apply local rules AND deposit their discoveries into shared memory using the share_discovery() method, enabling indirect coordination."}
            {step === 3 && "Memory-enhanced stigmergy: agents follow pheromone trails stored in collective memory. Trail strength decays over time (evaporation pattern)."}
            {step === 4 && "Redis persistence ensures swarm knowledge survives across sessions. Each agent has its own thread (swarm_0, swarm_1, etc.) for conversation history."}
            {step === 5 && "Emergent collective intelligence achieved: agents optimize routes by learning from shared discoveries, demonstrating swarm intelligence with memory."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
