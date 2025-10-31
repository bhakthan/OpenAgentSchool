import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Robot, 
  Atom, 
  Compass, 
  Scan, 
  MagnifyingGlass,
  ArrowRight,
  Lightbulb,
  ChartLineUp
} from '@phosphor-icons/react';

interface FrontierPattern {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  businessValue: string;
  industryApplications: string[];
  readinessSignals: string[];
  technicalPrerequisites: string[];
  expectedGains: string;
  timeToValue: string;
  complexity: 'High' | 'Very High';
}

const frontierPatterns: FrontierPattern[] = [
  {
    id: 'quantum-enhanced-navigator',
    name: 'Quantum-Enhanced Robot Navigator',
    icon: Atom,
    description: 'Combines quantum optimization (QAOA) with classical motion planning for fleet routing and path optimization in dynamic environments.',
    businessValue: 'Solve NP-hard routing problems orders of magnitude faster than classical methods, enabling real-time re-optimization as conditions change.',
    industryApplications: [
      'Warehouse fleet optimization with 50+ autonomous robots',
      'Urban delivery routing across changing traffic patterns',
      'Manufacturing facility multi-robot coordination',
      'Agricultural robot path planning across variable terrain'
    ],
    readinessSignals: [
      'Fleet size exceeds 10 robots (quantum advantage threshold)',
      'Dynamic re-optimization needed multiple times per hour',
      'Classical solvers hit performance limits on routing complexity'
    ],
    technicalPrerequisites: [
      'Access to quantum computing cloud (D-Wave, IBM Quantum, or simulator)',
      'ROS2 / Nav2 navigation stack for classical planning',
      'QUBO problem formulation expertise',
      'Hybrid quantum-classical orchestration pipeline'
    ],
    expectedGains: '15-40% reduction in total travel distance, 60% fewer collision conflicts',
    timeToValue: '3-6 months',
    complexity: 'Very High'
  },
  {
    id: 'embodied-perception-action',
    name: 'Embodied Perception-Action Loop',
    icon: Robot,
    description: 'Tight integration of vision-language models with physical robot control for manipulation tasks in unstructured environments.',
    businessValue: 'Enable robots to handle novel objects and adapt to changing conditions without explicit programming or retraining.',
    industryApplications: [
      'Warehouse picking of variable SKUs without pre-defined object models',
      'Assembly operations with part variation tolerance',
      'Household robotics adapting to diverse home environments',
      'Food service automation handling irregular produce'
    ],
    readinessSignals: [
      'High object variability makes classical vision brittle',
      'Task success rate <70% with traditional programmed approaches',
      'Environment changes faster than model retraining cycles'
    ],
    technicalPrerequisites: [
      'Vision-language models (Gemini Pro, GPT-4V) with vision APIs',
      'ROS2 + MoveIt motion planning stack',
      'RGB-D camera suite with real-time streaming',
      'Sub-200ms perception-to-action latency budget'
    ],
    expectedGains: '85-95% success rate on manipulation tasks, zero-shot generalization to novel objects',
    timeToValue: '2-4 months',
    complexity: 'High'
  },
  {
    id: 'human-robot-collaboration',
    name: 'Human-Robot Collaboration Orchestrator',
    icon: Compass,
    description: 'Dynamic autonomy level adjustment between human operators and robot systems with mixed-initiative interaction.',
    businessValue: 'Optimize task allocation between humans and robots based on context, building trust while maintaining safety and efficiency.',
    industryApplications: [
      'Manufacturing assembly with variable complexity tasks',
      'Surgical robotics with surgeon-in-the-loop oversight',
      'Construction site equipment operation with safety monitoring',
      'Warehouse operations mixing routine and exception handling'
    ],
    readinessSignals: [
      'Tasks vary significantly in complexity and risk',
      'Human cognitive load or fatigue impacts quality',
      'Regulatory requirements mandate human oversight for certain operations'
    ],
    technicalPrerequisites: [
      'Multimodal human state monitoring (gaze, gesture, voice)',
      'Bayesian arbitration or learned policy for autonomy allocation',
      'Variable impedance control for shared manipulation',
      'Real-time safety validation and override capabilities'
    ],
    expectedGains: '30-45% productivity improvement, reduced operator fatigue, improved safety compliance',
    timeToValue: '4-6 months',
    complexity: 'Very High'
  },
  {
    id: 'hybrid-quantum-classical-agent',
    name: 'Hybrid Quantum-Classical Agent',
    icon: Cpu,
    description: 'LLM-based agent that delegates optimization problems to quantum processors (QAOA, VQE) for exponential speedup on specific workloads.',
    businessValue: 'Solve combinatorial optimization problems that are intractable for classical computers, enabling new business capabilities.',
    industryApplications: [
      'Portfolio optimization with 500+ assets and complex constraints',
      'Supply chain network design with thousands of decision variables',
      'Drug discovery molecular simulation (20-40 qubit systems)',
      'Financial derivatives pricing with Monte Carlo acceleration'
    ],
    readinessSignals: [
      'Classical optimization runtimes exceed business decision cycles',
      'Problem size exceeds 50 variables with non-linear constraints',
      'Quality of solutions directly impacts P&L or mission outcomes'
    ],
    technicalPrerequisites: [
      'Quantum cloud access (AWS Braket, Azure Quantum, IBM Quantum)',
      'QUBO/Ising formulation expertise for problem encoding',
      'Quantum error mitigation techniques',
      'Classical fallback solvers for validation'
    ],
    expectedGains: '2-10x speedup on optimization, ability to solve previously intractable problems',
    timeToValue: '6-9 months',
    complexity: 'Very High'
  },
  {
    id: 'quantum-sensing-agent',
    name: 'Quantum Sensing Agent',
    icon: Scan,
    description: 'AI-powered interpretation of ultra-precise quantum sensor measurements for applications requiring beyond-classical sensitivity.',
    businessValue: 'Achieve measurement precision impossible with classical sensors, enabling new diagnostic and detection capabilities.',
    industryApplications: [
      'Medical imaging (quantum MEG for brain activity mapping)',
      'Mineral exploration (quantum gravimeters for subsurface detection)',
      'GPS-free navigation (quantum inertial sensors)',
      'Infrastructure inspection (quantum magnetometry for defect detection)'
    ],
    readinessSignals: [
      'Classical sensors lack required sensitivity or spatial resolution',
      'Application requires field measurements <1 femtotesla (magnetometry)',
      'GPS denial or jamming creates navigation vulnerability'
    ],
    technicalPrerequisites: [
      'Quantum sensor hardware (NV centers, SQUIDs, trapped ions)',
      'Quantum-aware signal processing (state tomography, decoherence filtering)',
      'Physics-informed neural networks for interpretation',
      'Cryogenic or laser infrastructure for sensor operation'
    ],
    expectedGains: '5-10x spatial resolution in MEG, 2-3x deeper mineral detection, <10m drift in GPS-free navigation',
    timeToValue: '9-12 months',
    complexity: 'Very High'
  },
  {
    id: 'quantum-accelerated-search',
    name: 'Quantum-Accelerated Search Agent',
    icon: MagnifyingGlass,
    description: 'Integration of Grover\'s quantum search algorithm into agent tool-calling frameworks for quadratic speedup on unstructured search.',
    businessValue: 'Search massive knowledge graphs and databases exponentially faster, enabling real-time insights on previously prohibitive dataset sizes.',
    industryApplications: [
      'Healthcare knowledge graphs (50M+ entities for drug repurposing)',
      'Scientific literature search across millions of publications',
      'Legal case database search with complex multi-criteria queries',
      'Cybersecurity threat intelligence correlation across massive logs'
    ],
    readinessSignals: [
      'Search datasets exceed 10M unstructured entries',
      'Classical search latency impacts user experience or decision speed',
      'Complex search predicates defeat traditional indexing'
    ],
    technicalPrerequisites: [
      'Quantum circuit synthesis for oracle compilation',
      'Gate-based quantum processor access (20-50 qubits)',
      'Grover\'s algorithm implementation (Qiskit/Cirq)',
      'Classical pre-filtering and dataset partitioning strategies'
    ],
    expectedGains: '√N speedup (20x faster on 50M entity graphs), ability to search previously prohibitive dataset sizes',
    timeToValue: '6-9 months',
    complexity: 'Very High'
  }
];

interface FrontierAgentPatternsProps {
  onComplete?: () => void;
}

const FrontierAgentPatterns: React.FC<FrontierAgentPatternsProps> = ({ onComplete }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Atom className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Frontier Agent Patterns</h2>
            <p className="text-muted-foreground">
              Quantum computing, robotics, and advanced sensing for next-generation agentic systems
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                When to Consider Frontier Patterns
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>Your organization has mature agent operations and seeks competitive differentiation</li>
                <li>Classical approaches hit fundamental limits (NP-hard problems, sensor sensitivity, search complexity)</li>
                <li>You're preparing for quantum computing availability or robotics integration</li>
                <li>ROI justifies 6-12 month development timelines and specialized infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {frontierPatterns.map((pattern) => {
          const IconComponent = pattern.icon;
          return (
            <Card key={pattern.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{pattern.name}</CardTitle>
                      <CardDescription className="mt-1">{pattern.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={pattern.complexity === 'Very High' ? 'destructive' : 'secondary'}>
                    {pattern.complexity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Business Value */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <ChartLineUp className="w-4 h-4" />
                    Business Value
                  </h4>
                  <p className="text-sm text-muted-foreground">{pattern.businessValue}</p>
                </div>

                {/* Expected Gains */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                    Expected Gains
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">{pattern.expectedGains}</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Time to value: {pattern.timeToValue}
                  </p>
                </div>

                {/* Industry Applications */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Industry Applications</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {pattern.industryApplications.slice(0, 2).map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">→</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/patterns?selected=${pattern.id}`}>
                    View Pattern Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Explore All 64 Agent Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Browse the complete pattern library including core workflows, multi-agent orchestration, 
                evaluation strategies, and these frontier capabilities.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/patterns">
                Pattern Explorer <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Button */}
      {onComplete && (
        <div className="flex justify-center pt-4">
          <Button onClick={onComplete} size="lg" variant="outline">
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default FrontierAgentPatterns;
