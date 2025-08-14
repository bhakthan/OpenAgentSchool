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
  Lightning
} from '@phosphor-icons/react';

interface Agent {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  status: string;
}

export const SwarmIntelligenceCodeVisualizer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize agents
  useEffect(() => {
    const initialAgents: Agent[] = [
      { id: 1, x: 50, y: 100, targetX: 200, targetY: 150, color: 'bg-blue-500', status: 'Searching' },
      { id: 2, x: 100, y: 50, targetX: 250, targetY: 100, color: 'bg-green-500', status: 'Searching' },
      { id: 3, x: 150, y: 120, targetX: 180, targetY: 200, color: 'bg-purple-500', status: 'Searching' },
      { id: 4, x: 80, y: 150, targetX: 220, targetY: 120, color: 'bg-orange-500', status: 'Searching' },
    ];
    setAgents(initialAgents);
  }, []);

  const steps = [
    "Initialize swarm with 4 autonomous agents",
    "Agents perceive local environment and nearby agents",
    "Apply local rules: separation, alignment, cohesion",
    "Agents communicate through stigmergy (environmental signals)",
    "Emergent flocking behavior emerges",
    "Swarm adapts to obstacles and reaches targets collectively"
  ];

  const codeSteps = [
    `class SwarmAgent {
  constructor(id, x, y) {
    this.id = id;
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.neighbors = [];
  }
}`,
    `perceiveEnvironment() {
  this.neighbors = this.swarm.agents
    .filter(agent => agent.id !== this.id)
    .filter(agent => this.distanceTo(agent) < 50);
}`,
    `applySwarmRules() {
  const separation = this.separate();
  const alignment = this.align();
  const cohesion = this.cohere();
  
  this.velocity = this.combine(separation, alignment, cohesion);
}`,
    `depositPheromone() {
  // Leave environmental signals
  this.swarm.environment.addSignal(
    this.position.x, 
    this.position.y, 
    'path_marker'
  );
}`,
    `update() {
  this.perceiveEnvironment();
  this.applySwarmRules();
  this.depositPheromone();
  this.move();
}`,
    `// Swarm coordination complete
// Emergent behavior achieved:
// - Optimal pathfinding
// - Collision avoidance  
// - Adaptive formation`
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setStep(prev => {
          const nextStep = (prev + 1) % steps.length;
          
          // Simulate agent movement and behavior
          setAgents(prevAgents => 
            prevAgents.map(agent => {
              const progress = nextStep / steps.length;
              const newX = agent.x + (agent.targetX - agent.x) * 0.1;
              const newY = agent.y + (agent.targetY - agent.y) * 0.1;
              
              let status = 'Searching';
              if (progress > 0.3) status = 'Coordinating';
              if (progress > 0.6) status = 'Converging';
              if (progress > 0.8) status = 'Target Reached';
              
              return {
                ...agent,
                x: newX,
                y: newY,
                status
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
      status: 'Searching'
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
            Watch autonomous agents coordinate without central control using local rules and environmental signals.
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
              <h4 className="font-semibold text-sm">Agent Status:</h4>
              <div className="grid grid-cols-2 gap-2">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 ${agent.color} rounded-full`}></div>
                    <span>Agent {agent.id}: {agent.status}</span>
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

      {/* Current Step Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-blue-500" />
            <span className="font-semibold">Step {step + 1}: {steps[step]}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {step === 0 && "Four autonomous agents are created, each with independent local decision-making capabilities."}
            {step === 1 && "Each agent scans its local neighborhood to detect nearby agents and environmental conditions."}
            {step === 2 && "Agents apply Craig Reynolds' three rules: separation (avoid crowding), alignment (steer towards average heading), and cohesion (steer towards average position)."}
            {step === 3 && "Agents leave environmental signals (pheromones) that other agents can detect and follow, enabling indirect coordination."}
            {step === 4 && "Without any central controller, the agents naturally form flocking behavior and coordinate their movements."}
            {step === 5 && "The swarm demonstrates emergent intelligence: optimal pathfinding, obstacle avoidance, and adaptive formations emerge from simple local rules."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
