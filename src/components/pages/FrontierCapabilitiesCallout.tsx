import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Atom, Robot, Cpu, Scan, MagnifyingGlass, Compass, ArrowRight, Lightbulb } from '@phosphor-icons/react';

interface FrontierCapability {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; weight?: string }>;
  gain: string;
  useCase: string;
  readinessSignal: string;
}

const frontierCapabilities: FrontierCapability[] = [
  {
    id: 'quantum-enhanced-navigator',
    name: 'Quantum Fleet Routing',
    icon: Atom,
    gain: '15-40% efficiency improvement',
    useCase: 'Warehouse operations with 50+ robots',
    readinessSignal: 'Classical solvers hit performance limits'
  },
  {
    id: 'embodied-perception-action',
    name: 'Vision-Guided Manipulation',
    icon: Robot,
    gain: '85-95% success on novel objects',
    useCase: 'Unstructured picking & assembly',
    readinessSignal: 'High SKU variability defeats pre-programmed vision'
  },
  {
    id: 'human-robot-collaboration',
    name: 'Adaptive Autonomy',
    icon: Compass,
    gain: '30-45% productivity boost',
    useCase: 'Mixed complexity manufacturing tasks',
    readinessSignal: 'Tasks vary in complexity and risk'
  },
  {
    id: 'hybrid-quantum-classical-agent',
    name: 'Quantum Optimization',
    icon: Cpu,
    gain: '2-10x speedup on NP-hard problems',
    useCase: 'Portfolio optimization, supply chain',
    readinessSignal: 'Classical runtimes exceed decision cycles'
  },
  {
    id: 'quantum-sensing-agent',
    name: 'Ultra-Precise Sensing',
    icon: Scan,
    gain: '5-10x spatial resolution',
    useCase: 'Medical imaging, mineral exploration',
    readinessSignal: 'Classical sensors lack required sensitivity'
  },
  {
    id: 'quantum-accelerated-search',
    name: 'Quantum Knowledge Search',
    icon: MagnifyingGlass,
    gain: '20x faster on 50M entity graphs',
    useCase: 'Healthcare, legal, scientific databases',
    readinessSignal: 'Search latency impacts decision speed'
  }
];

const FrontierCapabilitiesCallout: React.FC = () => {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Atom className="w-6 h-6 text-primary" weight="duotone" />
          </div>
          <div>
            <CardTitle className="text-xl">Frontier Capabilities</CardTitle>
            <CardDescription>
              Advanced patterns for organizations with mature agent operations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Intro */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-1">When to Consider</p>
              <p>
                These patterns address problems where classical approaches hit fundamental limits. 
                Suitable for frontier firms with quantum computing access, robotics integration roadmaps, 
                or requirements for beyond-classical performance.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {frontierCapabilities.map((capability) => {
            const IconComponent = capability.icon;
            return (
              <div
                key={capability.id}
                className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Frontier
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{capability.name}</h4>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">
                    {capability.gain}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium">Use case:</span> {capability.useCase}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Signal:</span> {capability.readinessSignal}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild variant="default" className="flex-1">
            <Link to="/patterns?filter=advanced">
              Explore Frontier Patterns <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/ai-skills#frontier-agent-patterns">
              Learn Implementation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          Part of the 64-pattern library · Time to value: 6-12 months · Requires specialized infrastructure
        </p>
      </CardContent>
    </Card>
  );
};

export default FrontierCapabilitiesCallout;
