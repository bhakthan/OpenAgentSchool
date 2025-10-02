import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  ArrowClockwise,
  User,
  Brain,
  Shield,
  Wrench,
  Lightbulb,
  Users,
  Database,
  ChartLine,
  CheckCircle,
  Clock
} from '@phosphor-icons/react';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'complete';
  icon: React.ReactNode;
  domain: string;
}

export const ContextualOnboardingVisual: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [memorySummary, setMemorySummary] = useState({
    role: '',
    department: '',
    completedSteps: [] as string[],
    currentBlocker: '',
    recentTurns: 0
  });

  const [agents] = useState<Agent[]>([
    { id: 'router', name: 'Routing Agent', status: 'idle', icon: <Brain size={16} />, domain: 'Classification' },
    { id: 'hr', name: 'HR Policy Agent', status: 'idle', icon: <Shield size={16} />, domain: 'Benefits & Compliance' },
    { id: 'devops', name: 'DevOps Agent', status: 'idle', icon: <Wrench size={16} />, domain: 'Tool Setup' },
    { id: 'project', name: 'Project Context Agent', status: 'idle', icon: <Lightbulb size={16} />, domain: 'Team Goals' },
    { id: 'culture', name: 'Culture Agent', status: 'idle', icon: <Users size={16} />, domain: 'Company Values' }
  ]);

  const dayScenarios = [
    {
      day: 1,
      question: 'What health insurance options do I have?',
      agent: 'hr',
      response: 'You have 3 health insurance plans available...',
      memoryUpdate: {
        role: 'Software Engineer',
        department: 'Cloud Platform',
        completedSteps: ['Benefits enrollment overview'],
        currentBlocker: '',
        recentTurns: 1
      }
    },
    {
      day: 2,
      question: 'How do I set up my development environment?',
      agent: 'devops',
      response: 'Installing VS Code, Docker, and Azure CLI...',
      memoryUpdate: {
        role: 'Software Engineer',
        department: 'Cloud Platform',
        completedSteps: ['Benefits enrollment overview', 'Dev environment setup'],
        currentBlocker: 'Waiting for Git access',
        recentTurns: 2
      }
    },
    {
      day: 5,
      question: 'What is our team currently working on?',
      agent: 'project',
      response: 'Your team is building a new API gateway service...',
      memoryUpdate: {
        role: 'Software Engineer',
        department: 'Cloud Platform',
        completedSteps: ['Benefits enrollment', 'Dev setup', 'Project context review'],
        currentBlocker: '',
        recentTurns: 3
      }
    },
    {
      day: 10,
      question: 'What are the communication norms for our team?',
      agent: 'culture',
      response: 'Our team uses Slack for async communication...',
      memoryUpdate: {
        role: 'Software Engineer',
        department: 'Cloud Platform',
        completedSteps: ['Benefits', 'Dev setup', 'Project context', 'Culture overview'],
        currentBlocker: '',
        recentTurns: 1  // Trimmed older turns
      }
    }
  ];

  const simulateOnboarding = () => {
    if (currentDay >= 10) {
      setCurrentDay(1);
      setMemorySummary({
        role: '',
        department: '',
        completedSteps: [],
        currentBlocker: '',
        recentTurns: 0
      });
      return;
    }

    setIsRunning(true);
    const nextDay = currentDay === 1 ? 2 : currentDay === 2 ? 5 : currentDay === 5 ? 10 : 1;
    const scenario = dayScenarios.find(s => s.day === nextDay);
    
    if (scenario) {
      setTimeout(() => {
        setCurrentDay(scenario.day);
        setMemorySummary(scenario.memoryUpdate);
        setIsRunning(false);
      }, 1500);
    }
  };

  const currentScenario = dayScenarios.find(s => s.day === currentDay);

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User size={24} className="text-primary" />
              Contextual Onboarding Orchestrator - 2 Week Journey
            </CardTitle>
            <Badge variant="outline">Day {currentDay} of 14</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Watch how hybrid memory (summarization + trimming) preserves employee context while routing questions to specialized agents.
          </p>
          <div className="flex gap-2">
            <Button onClick={simulateOnboarding} disabled={isRunning}>
              {isRunning ? <Clock className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              {currentDay >= 10 ? 'Restart' : 'Next Day →'}
            </Button>
            <Button variant="outline" onClick={() => {
              setCurrentDay(1);
              setMemorySummary({
                role: '',
                department: '',
                completedSteps: [],
                currentBlocker: '',
                recentTurns: 0
              });
            }}>
              <ArrowClockwise className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Memory State */}
      {memorySummary.role && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database size={20} className="text-primary" />
              Memory State (Hybrid: Summarized Profile + Trimmed Q&A)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-semibold text-sm">Employee Profile:</span>
              <p className="text-sm text-muted-foreground">{memorySummary.role} • {memorySummary.department}</p>
            </div>
            <div>
              <span className="font-semibold text-sm">Completed Steps:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {memorySummary.completedSteps.map((step, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    <CheckCircle size={12} className="mr-1" />
                    {step}
                  </Badge>
                ))}
              </div>
            </div>
            {memorySummary.currentBlocker && (
              <div>
                <span className="font-semibold text-sm">Current Blocker:</span>
                <p className="text-sm text-orange-600 dark:text-orange-400">{memorySummary.currentBlocker}</p>
              </div>
            )}
            <div>
              <span className="font-semibold text-sm">Recent Q&A Turns in Context:</span>
              <p className="text-sm text-muted-foreground">{memorySummary.recentTurns} turn(s) • Older turns summarized</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Scenario */}
      {currentScenario && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-base">Day {currentScenario.day}: Employee Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <p className="text-sm"><span className="font-semibold">Question:</span> {currentScenario.question}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Routed to:</span>
              <Badge className="gap-1">
                {agents.find(a => a.id === currentScenario.agent)?.icon}
                {agents.find(a => a.id === currentScenario.agent)?.name}
              </Badge>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
              <p className="text-sm"><span className="font-semibold">Response:</span> {currentScenario.response}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specialized Agents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Specialized Agents (Microsoft Agent Framework)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {agents.slice(1).map((agent) => (
              <Card key={agent.id} className="bg-muted/20 hover:bg-muted/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {agent.icon}
                    <span className="font-semibold text-sm">{agent.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.domain}</p>
                  {currentScenario?.agent === agent.id && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      <ChartLine size={12} className="mr-1" />
                      Active
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pattern Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">🧠 Hybrid Memory Management</h4>
              <p className="text-muted-foreground text-xs">Employee profile summarized (role, steps), recent Q&A trimmed (last 3 turns)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🎯 Intelligent Routing</h4>
              <p className="text-muted-foreground text-xs">Questions classified and routed to domain specialists (HR, DevOps, Project, Culture)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">💾 Checkpoint/Resume</h4>
              <p className="text-muted-foreground text-xs">Session persists across days with full context restoration</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">👤 Human-in-the-Loop</h4>
              <p className="text-muted-foreground text-xs">Manager approvals for critical actions (PTO, access requests)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">📊 OpenTelemetry Traces</h4>
              <p className="text-muted-foreground text-xs">Analytics on routing accuracy, agent latency, bottleneck identification</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">⏪ Time-Travel Debugging</h4>
              <p className="text-muted-foreground text-xs">HR can replay entire onboarding journeys for process improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextualOnboardingVisual;
