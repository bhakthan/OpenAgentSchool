import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Server, Cpu, FileJson, ArrowRight, Database, Users } from 'lucide-react';

const ArchitectureViz: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState<'ingest' | 'swarm'>('ingest');

  useEffect(() => {
    setActiveStep(0);
    const maxSteps = mode === 'ingest' ? 5 : 4;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, mode === 'ingest' ? 2000 : 2500);
    return () => clearInterval(timer);
  }, [mode]);

  const ingestSteps = [
    { id: 0, label: "User Input", sub: "Discord/Tele/WA", icon: MessageSquare, color: "emerald" },
    { id: 1, label: "Incoming Queue", sub: "~/.tinyclaw/queue/incoming", icon: FileJson, color: "blue" },
    { id: 2, label: "Queue Processor", sub: "Node.js Router", icon: Cpu, color: "purple" },
    { id: 3, label: "AI Agent", sub: "Isolated Context", icon: Database, color: "orange" },
    { id: 4, label: "Outgoing Queue", sub: "~/.tinyclaw/queue/outgoing", icon: ArrowRight, color: "emerald" },
  ];

  const swarmSteps = [
    { id: 0, label: "Agent A (Triage)", sub: "Writes to Queue", icon: Database, color: "orange" },
    { id: 1, label: "Processing Queue", sub: "~/.tinyclaw/agents/policy/inbox", icon: FileJson, color: "blue" },
    { id: 2, label: "Queue Processor", sub: "Routes to Policy", icon: Cpu, color: "purple" },
    { id: 3, label: "Agent B (Policy)", sub: "Executes Rules", icon: Database, color: "pink" },
  ];

  const currentSteps = mode === 'ingest' ? ingestSteps : swarmSteps;

  return (
    <div className="w-full rounded-xl border border-border bg-card p-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-30" />
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-xl font-bold text-primary font-mono tracking-tight flex items-center gap-2">
          <Server className="w-5 h-5" />
          Data Flow Pipeline
        </h3>
        
        <div className="flex bg-muted rounded-lg p-1 border border-border">
            <button 
                onClick={() => setMode('ingest')}
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all ${mode === 'ingest' ? 'bg-emerald-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <ArrowRight size={14} /> Ingestion
            </button>
            <button 
                onClick={() => setMode('swarm')}
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all ${mode === 'swarm' ? 'bg-purple-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Users size={14} /> Agent Swarm
            </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 min-h-[160px]">
        {currentSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;

          return (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4 flex-1 w-full md:w-auto">
              
              {/* Step Node */}
              <div className={`relative p-4 rounded-lg border-2 transition-all duration-500 w-full md:w-32 h-32 flex flex-col items-center justify-center text-center z-10 ${
                isActive 
                  ? `border-${step.color}-500 bg-${step.color}-500/10` 
                  : 'border-border bg-muted'
              }`}>
                <Icon className={`w-8 h-8 mb-2 transition-colors duration-300 ${isActive ? `text-${step.color}-400` : 'text-muted-foreground'}`} />
                
                <span className={`text-xs font-bold font-mono transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-tight">{step.sub}</span>

                {/* Animated Packet */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className={`absolute inset-0 border border-${step.color}-500/50 rounded-lg`}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Connector */}
              {index < currentSteps.length - 1 && (
                <div className="hidden md:flex flex-1 items-center justify-center relative">
                   <div className="h-0.5 w-full bg-border absolute"></div>
                   <motion.div 
                      animate={{
                        x: isActive ? ['0%', '100%'] : '0%',
                        opacity: isActive ? [0, 1, 0] : 0
                      }}
                      transition={{ duration: mode === 'ingest' ? 1.5 : 2.0, repeat: Infinity }}
                      className={`w-3 h-3 rounded-full bg-${step.color}-400 relative z-20`}
                   />
                </div>
              )}
              
              {/* Mobile Connector */}
              {index < currentSteps.length - 1 && (
                 <div className="md:hidden h-8 w-0.5 bg-border my-2"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-black/20 dark:bg-black/40 rounded-lg font-mono text-sm text-muted-foreground border border-border flex items-start gap-3">
        <span className={`mt-0.5 ${mode === 'ingest' ? 'text-emerald-500' : 'text-purple-500'}`}>$</span>
        <div>
            {mode === 'ingest' ? (
                <>
                    {activeStep === 0 && "User sends: '@coder fix the bug' via Discord..."}
                    {activeStep === 1 && "discord-client.ts writes `discord_msg_123.json` to incoming/..."}
                    {activeStep === 2 && "queue-processor.ts detects file, parses `@coder`, moves to processing/..."}
                    {activeStep === 3 && "Agent 'Coder' invoked in isolated `~/workspace/coder` directory..."}
                    {activeStep === 4 && "Response written to outgoing/. Discord client picks up & replies."}
                </>
            ) : (
                <>
                    {activeStep === 0 && "Agent 'Triage' decides specific expertise is needed..."}
                    {activeStep === 1 && "Triage writes task file to `~/.tinyclaw/agents/policy/inbox`..."}
                    {activeStep === 2 && "Processor detects file in Policy's inbox..."}
                    {activeStep === 3 && "Agent 'Policy' wakes up to validate the request rules."}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureViz;
