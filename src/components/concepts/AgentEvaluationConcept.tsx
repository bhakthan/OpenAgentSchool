import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { Lightbulb, ChartBar, UserCheck, ListChecks } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const TAB_ORDER = [
  'architecture',
  'implementation',
  'business-use-case',
  'best-practices'
];

const AgentEvaluationConcept = ({ onNextConcept }: { onNextConcept?: () => void }) => {
  const [activeTab, setActiveTab] = React.useState('architecture');
  const [completedTabs, setCompletedTabs] = React.useState<string[]>([]);

  const currentIndex = TAB_ORDER.indexOf(activeTab);
  const isLastTab = currentIndex === TAB_ORDER.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(TAB_ORDER[currentIndex + 1]);
    } else {
      if (onNextConcept) {
        onNextConcept();
      } else {
        // Fallback: navigate to Agent Communication Protocol concept
        window.location.href = '/concepts/agent-communication-protocol';
      }
    }
  };

  const handleMarkComplete = () => {
    if (!completedTabs.includes(activeTab)) {
      setCompletedTabs([...completedTabs, activeTab]);
    }
  };

  const renderTabActions = () => (
    <div className="flex gap-2 mt-6 justify-end">
      <Button size="sm" variant="secondary" onClick={handleMarkComplete} disabled={completedTabs.includes(activeTab)}>
        {completedTabs.includes(activeTab) ? 'Completed' : 'Mark as Complete'}
      </Button>
      <Button size="sm" variant="default" onClick={handleNext}>
        {isLastTab ? 'Next Concept' : 'Next'}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Agent Evaluation Module</CardTitle>
          <CardDescription>
            Systematic assessment of agent performance, reliability, safety, and alignment using automated frameworks and benchmarks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="architecture">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="business-use-case">Business Use Case</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            </TabsList>
            <TabsContent value="architecture" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Evaluation Architecture</h3>
              <div className="mb-4">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Automated agent benchmarking</li>
                  <li>Multi-metric evaluation (accuracy, robustness, safety, alignment)</li>
                  <li>Continuous performance monitoring</li>
                  <li>Human-in-the-loop validation</li>
                  <li>Scenario-based testing</li>
                </ul>
              </div>
              <AdvancedArchitectureSimulation />
              {renderTabActions()}
            </TabsContent>
            <TabsContent value="implementation" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Implementation Examples</h3>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Azure AI Evaluation SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`# Install Azure AI Evaluation SDK
!pip install azure-ai-evaluation

from azure.ai.evaluation import AgentEvaluator, BenchmarkSuite

class MyAgent:
    def respond(self, prompt):
        return "Hello, I am your agent!"

suite = BenchmarkSuite([
    {"prompt": "What is the capital of France?", "expected": "Paris"},
    {"prompt": "Who wrote Hamlet?", "expected": "Shakespeare"},
])

agent = MyAgent()
evaluator = AgentEvaluator(agent)
results = evaluator.run(suite)
for r in results:
    print(f"Prompt: {r['prompt']}, Response: {r['response']}, Score: {r['score']}")
`}
                  </pre>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>EvalLM (Open Source)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`# Install EvalLM
!pip install evallm

from evallm import evaluate_agent

def my_agent(prompt):
    return "Sample response"

tasks = [
    {"input": "Translate 'hello' to French", "expected": "bonjour"},
    {"input": "Sum 2 and 3", "expected": "5"},
]

results = evaluate_agent(my_agent, tasks)
print(results)
`}
                  </pre>
                </CardContent>
              </Card>
              <div className="mt-2 text-xs text-muted-foreground">
                Other frameworks: OpenAGI, RAGAS, HumanEval, AgentBench
              </div>
              {renderTabActions()}
            </TabsContent>
            <TabsContent value="business-use-case" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Business Use Case Example</h3>
              <div className="mb-2">
                <strong>Industry:</strong> Retail
              </div>
              <div className="mb-2">
                <strong>Scenario:</strong> Evaluating a personalized shopping assistant agent for accuracy, safety, and customer satisfaction.
              </div>
              <div className="mb-2">
                <strong>Value:</strong> Ensures reliable recommendations, safe interactions, and improved conversion rates.
              </div>
              <div className="border rounded-md p-4 bg-muted/30">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Define evaluation scenarios (e.g., product recommendation accuracy, safety checks)</li>
                  <li>Run automated and human-in-the-loop tests</li>
                  <li>Aggregate results for continuous improvement</li>
                  <li>Monitor with dashboards and alerts</li>
                </ul>
              </div>
              {renderTabActions()}
            </TabsContent>
            <TabsContent value="best-practices" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Define clear evaluation scenarios (task completion, safety, alignment)</li>
                <li>Use both automated and human-in-the-loop tests</li>
                <li>Aggregate results for continuous improvement</li>
                <li>Monitor with dashboards and alerts</li>
                <li>Leverage open source and enterprise frameworks for benchmarking</li>
              </ul>
              <div className="mt-2 text-xs text-muted-foreground">
                References: Azure AI Evaluation SDK, EvalLM, AgentBench, RAGAS, HumanEval
              </div>
              {renderTabActions()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const ARCHITECTURE_STEPS = [
  {
    id: 'agent',
    label: 'Agent',
    description: 'The AI agent being evaluated for performance, safety, and reliability.',
    icon: <Lightbulb size={24} className="text-green-600" />
  },
  {
    id: 'suite',
    label: 'Evaluation Suite',
    description: 'Automated test cases and benchmarks that assess the agent.',
    icon: <ListChecks size={24} className="text-blue-600" />
  },
  {
    id: 'dashboard',
    label: 'Metrics Dashboard',
    description: 'Visualizes evaluation results, scores, and alerts.',
    icon: <ChartBar size={24} className="text-yellow-600" />
  },
  {
    id: 'review',
    label: 'Human Review',
    description: 'Human-in-the-loop validation for edge cases and ethical checks.',
    icon: <UserCheck size={24} className="text-pink-600" />
  }
];

function AdvancedArchitectureSimulation() {
  const [active, setActive] = React.useState('agent');
  const [step, setStep] = React.useState(0);
  const [autoMode, setAutoMode] = React.useState(false);
  const [isDark, setIsDark] = React.useState(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  );

  React.useEffect(() => {
    if (autoMode && step < ARCHITECTURE_STEPS.length) {
      const timer = setTimeout(() => {
        setActive(ARCHITECTURE_STEPS[step].id);
        setStep(s => s + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (autoMode && step >= ARCHITECTURE_STEPS.length) {
      setAutoMode(false);
      setStep(0);
    }
  }, [autoMode, step]);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    setIsDark(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Layout settings
  const nodeRadius = 40;
  const nodeY = 100;
  const nodeSpacing = 180;
  const nodePositions = [60, 60 + nodeSpacing, 60 + nodeSpacing * 2, 60 + nodeSpacing * 3];

  // Theme colors
  const theme = isDark
    ? {
        agent: ['#059669', '#34d399'],
        suite: ['#2563eb', '#60a5fa'],
        dashboard: ['#b45309', '#fbbf24'],
        review: ['#be185d', '#f472b6'],
        bg: '#18181b',
        text: '#f3f4f6',
        muted: '#27272a',
      }
    : {
        agent: ['#34d399', '#059669'],
        suite: ['#60a5fa', '#2563eb'],
        dashboard: ['#fbbf24', '#b45309'],
        review: ['#f472b6', '#be185d'],
        bg: '#f3f4f6',
        text: '#18181b',
        muted: '#e5e7eb',
      };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full">
        <svg width="800" height="220" viewBox="0 0 800 220" className="mb-2" style={{background: theme.bg}}>
          {/* Arrows */}
          {nodePositions.slice(0, -1).map((x, i) => (
            <AnimatedArrow
              key={i}
              active={active === ARCHITECTURE_STEPS[i + 1].id}
              x1={x + nodeRadius}
              y1={nodeY}
              x2={nodePositions[i + 1] - nodeRadius}
              y2={nodeY}
              color={theme[ARCHITECTURE_STEPS[i].id][0]}
            />
          ))}
          {/* Nodes */}
          {ARCHITECTURE_STEPS.map((step, i) => (
            <g key={step.id}>
              <circle
                cx={nodePositions[i]}
                cy={nodeY}
                r={nodeRadius}
                fill={active === step.id ? `url(#${step.id}Grad)` : theme.muted}
                stroke={theme[step.id][0]}
                strokeWidth={active === step.id ? 5 : 2}
                style={{cursor: 'pointer', transition: 'all 0.3s'}}
                onClick={() => { setActive(step.id); setAutoMode(false); }}
                onMouseEnter={() => setActive(step.id)}
              />
              <foreignObject x={nodePositions[i] - 18} y={nodeY - 18} width="36" height="36">
                {step.icon}
              </foreignObject>
              <text
                x={nodePositions[i]}
                y={nodeY + nodeRadius + 24}
                textAnchor="middle"
                fontSize="18"
                fill={theme.text}
                style={{fontWeight: active === step.id ? 'bold' : 'normal', transition: 'all 0.3s'}}
              >
                {step.label}
              </text>
            </g>
          ))}
          {/* Gradients */}
          <defs>
            <linearGradient id="agentGrad" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor={theme.agent[0]} />
              <stop offset="100%" stopColor={theme.agent[1]} />
            </linearGradient>
            <linearGradient id="suiteGrad" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor={theme.suite[0]} />
              <stop offset="100%" stopColor={theme.suite[1]} />
            </linearGradient>
            <linearGradient id="dashboardGrad" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor={theme.dashboard[0]} />
              <stop offset="100%" stopColor={theme.dashboard[1]} />
            </linearGradient>
            <linearGradient id="reviewGrad" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor={theme.review[0]} />
              <stop offset="100%" stopColor={theme.review[1]} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="w-full max-w-lg p-3 rounded bg-muted/40 border text-sm text-center" style={{background: theme.muted, color: theme.text}}>
        <strong>{ARCHITECTURE_STEPS.find(s => s.id === active)?.label}</strong>: {ARCHITECTURE_STEPS.find(s => s.id === active)?.description}
      </div>
      <div className="mt-4 flex gap-2 items-center">
        <Button size="sm" variant="default" onClick={() => {setAutoMode(true); setStep(0);}}>Start Simulation</Button>
        <Button size="sm" variant="outline" onClick={() => setActive('agent')}>Reset</Button>
        <span className="text-xs text-muted-foreground">Click nodes or use Start Simulation for animated walkthrough.</span>
      </div>
    </div>
  );
}

function AnimatedArrow({active, x1, y1, x2, y2, color}: {active:boolean, x1:number, y1:number, x2:number, y2:number, color:string}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={active ? 5 : 2} markerEnd="url(#arrow)" opacity={active ? 1 : 0.5} />
  );
}

export default AgentEvaluationConcept;
