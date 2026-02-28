import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Atom, Flask, Graph, CheckCircle, Clock } from '@phosphor-icons/react';
import { trackEvent } from '@/lib/analytics/ga';

interface Agent {
  name: string;
  icon: React.ReactNode;
  color: string;
  status: 'idle' | 'working' | 'complete';
  task: string;
  progress: number;
}

interface Paper {
  title: string;
  citations: number;
  relevance: number;
}

export function LiteratureSynthesisDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [insights, setInsights] = useState<string[]>([]);

  const [agents, setAgents] = useState<Agent[]>([
    {
      name: 'Retriever',
      icon: <Graph size={20} weight="duotone" />,
      color: 'blue',
      status: 'idle',
      task: 'Search scientific databases',
      progress: 0
    },
    {
      name: 'Analyzer',
      icon: <Flask size={20} weight="duotone" />,
      color: 'purple',
      status: 'idle',
      task: 'Extract key findings',
      progress: 0
    },
    {
      name: 'Synthesizer',
      icon: <Atom size={20} weight="duotone" />,
      color: 'green',
      status: 'idle',
      task: 'Combine insights',
      progress: 0
    },
    {
      name: 'Critic',
      icon: <CheckCircle size={20} weight="duotone" />,
      color: 'orange',
      status: 'idle',
      task: 'Validate synthesis',
      progress: 0
    }
  ]);

  const samplePapers: Paper[] = [
    { title: 'High-Tc Superconductivity in Hydrides under Pressure', citations: 342, relevance: 0.95 },
    { title: 'Crystal Structure Prediction of LaH₁₀', citations: 187, relevance: 0.89 },
    { title: 'Room Temperature Superconductivity: Mechanisms', citations: 521, relevance: 0.92 },
    { title: 'Hydrogen-rich Compounds at Extreme Conditions', citations: 234, relevance: 0.87 },
    { title: 'Computational Design of Superconducting Materials', citations: 156, relevance: 0.83 }
  ];

  const sampleInsights: string[] = [
    'Hydrogen-rich materials under high pressure show promising Tc values',
    'LaH₁₀ achieves superconductivity at ~250K near 175 GPa',
    'Yttrium doping may further enhance critical temperature',
    'Computational predictions align with recent experimental results',
    'Synthesis challenges: pressure maintenance and material stability'
  ];

  const runSimulation = async () => {
    trackEvent({ action: 'run_literature_synthesis', category: 'science_demo' });
    setIsRunning(true);
    setStep(0);
    setPapers([]);
    setInsights([]);

    // Reset agents
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' as const, progress: 0 })));

    // Step 1: Retriever searches
    await simulateAgentWork(0, 'working', async (progress) => {
      setAgents(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: 'working', progress };
        return updated;
      });

      if (progress === 100) {
        setPapers(samplePapers);
        setAgents(prev => {
          const updated = [...prev];
          updated[0] = { ...updated[0], status: 'complete' };
          return updated;
        });
      }
    });
    setStep(1);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Analyzer extracts
    await simulateAgentWork(1, 'working', async (progress) => {
      setAgents(prev => {
        const updated = [...prev];
        updated[1] = { ...updated[1], status: 'working', progress };
        return updated;
      });

      if (progress === 100) {
        setAgents(prev => {
          const updated = [...prev];
          updated[1] = { ...updated[1], status: 'complete' };
          return updated;
        });
      }
    });
    setStep(2);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: Synthesizer combines
    await simulateAgentWork(2, 'working', async (progress) => {
      setAgents(prev => {
        const updated = [...prev];
        updated[2] = { ...updated[2], status: 'working', progress };
        return updated;
      });

      // Add insights progressively
      if (progress === 20) setInsights([sampleInsights[0]]);
      if (progress === 40) setInsights(prev => [...prev, sampleInsights[1]]);
      if (progress === 60) setInsights(prev => [...prev, sampleInsights[2]]);
      if (progress === 80) setInsights(prev => [...prev, sampleInsights[3]]);
      if (progress === 100) {
        setInsights(prev => [...prev, sampleInsights[4]]);
        setAgents(prev => {
          const updated = [...prev];
          updated[2] = { ...updated[2], status: 'complete' };
          return updated;
        });
      }
    });
    setStep(3);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: Critic validates
    await simulateAgentWork(3, 'working', async (progress) => {
      setAgents(prev => {
        const updated = [...prev];
        updated[3] = { ...updated[3], status: 'working', progress };
        return updated;
      });

      if (progress === 100) {
        setAgents(prev => {
          const updated = [...prev];
          updated[3] = { ...updated[3], status: 'complete' };
          return updated;
        });
      }
    });
    setStep(4);

    setIsRunning(false);
  };

  const simulateAgentWork = async (
    agentIndex: number,
    status: 'working' | 'complete',
    onProgress: (progress: number) => Promise<void>
  ) => {
    for (let i = 0; i <= 100; i += 20) {
      await onProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const reset = () => {
    setStep(0);
    setPapers([]);
    setInsights([]);
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' as const, progress: 0 })));
    setIsRunning(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flask size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
          Interactive: Deep Research Agents
        </CardTitle>
        <CardDescription>
          Watch multi-agent literature synthesis in action - from paper retrieval to insight generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Status Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className={`p-4 rounded-lg border-2 ${
                agent.status === 'working' 
                  ? `border-${agent.color}-500 bg-${agent.color}-50 dark:bg-${agent.color}-950/30` 
                  : agent.status === 'complete'
                  ? `border-green-500 bg-green-50 dark:bg-green-950/30`
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-${agent.color}-600 dark:text-${agent.color}-400`}>
                  {agent.icon}
                </div>
                <h4 className="font-semibold text-sm">{agent.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{agent.task}</p>
              
              {agent.status === 'working' && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-${agent.color}-600 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${agent.progress}%` }}
                  ></div>
                </div>
              )}
              
              {agent.status === 'complete' && (
                <Badge variant="default" className="bg-green-600 text-white">
                  <CheckCircle size={14} weight="fill" className="mr-1" />
                  Complete
                </Badge>
              )}
              
              {agent.status === 'idle' && (
                <Badge variant="outline">
                  <Clock size={14} className="mr-1" />
                  Idle
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Papers Retrieved */}
        {papers.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
              <Graph size={16} className="text-blue-600 dark:text-blue-400" weight="duotone" />
              Retrieved Papers ({papers.length})
            </h4>
            <div className="space-y-2">
              {papers.map((paper, i) => (
                <div key={i} className="text-xs bg-white dark:bg-gray-800 p-2 rounded border border-blue-300 dark:border-blue-700">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex-1 font-medium text-slate-900 dark:text-white">{paper.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {paper.relevance.toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{paper.citations} citations</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Synthesized Insights */}
        {insights.length > 0 && (
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
              <Atom size={16} className="text-green-600 dark:text-green-400" weight="duotone" />
              Synthesized Insights ({insights.length})
            </h4>
            <ul className="space-y-2">
              {insights.map((insight, i) => (
                <li key={i} className="text-xs flex items-start gap-2 bg-white dark:bg-gray-800 p-2 rounded border border-green-300 dark:border-green-700">
                  <CheckCircle size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" weight="fill" />
                  <span className="text-slate-900 dark:text-white">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-2">
          <Button 
            onClick={runSimulation} 
            disabled={isRunning}
            variant="default" 
            size="sm"
          >
            <Play size={16} weight="fill" className="mr-2" />
            {isRunning ? 'Running...' : 'Run Simulation'}
          </Button>
          <Button onClick={reset} variant="outline" size="sm" disabled={isRunning}>
            Reset
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          This simulation demonstrates Deep Research agents collaborating to synthesize insights 
          from scientific literature. The Retriever finds relevant papers, Analyzer extracts findings, 
          Synthesizer combines insights, and Critic validates the results.
        </p>
      </CardContent>
    </Card>
  );
}
