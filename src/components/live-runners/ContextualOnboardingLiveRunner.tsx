import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ArrowRight, Wrench } from '@phosphor-icons/react';

const ContextualOnboardingLiveRunner: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench size={24} className="text-primary" />
          Contextual Onboarding Orchestrator - Live Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This pattern uses <strong>Microsoft Agent Framework</strong> (announced Oct 2025) with hybrid memory management. 
            Full implementation requires Azure OpenAI deployment and Agent Framework installation.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <ArrowRight size={16} />
            Quick Start Implementation Steps
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <div>
                <p className="font-medium">Install Microsoft Agent Framework</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">
                  pip install agent-framework --prerelease=allow
                </code>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <div>
                <p className="font-medium">Set up Azure OpenAI and authentication</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">
                  az login # Azure CLI authentication
                </code>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <div>
                <p className="font-medium">Implement Hybrid Memory Session</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use SummarizingSession class (based on OpenAI Agents SDK patterns) with keep_last_n_turns=3 and context_limit=5
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <div>
                <p className="font-medium">Create specialized agents (HR, DevOps, Project, Culture)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Each agent optimized for its domain with specific instructions and RAG retrieval
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <div>
                <p className="font-medium">Design graph workflow with routing logic</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Agent Framework's workflow engine handles conditional routing, checkpointing, and human-in-the-loop nodes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">6</Badge>
              <div>
                <p className="font-medium">Add checkpoint stores (Redis) for session persistence</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enable resumption across days with full context restoration
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">7</Badge>
              <div>
                <p className="font-medium">Configure OpenTelemetry for observability</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Track routing accuracy, agent latency, and identify onboarding bottlenecks
                </p>
              </div>
            </div>
          </div>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 dark:text-blue-100">
            <strong>See the full code example</strong> in the pattern details above for complete implementation including:
            memory management, specialized agents, workflow orchestration, and checkpoint/resume logic.
          </AlertDescription>
        </Alert>

        <div className="pt-2 border-t">
          <h4 className="font-semibold text-sm mb-2">Key References:</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• OpenAI Cookbook: <a href="https://cookbook.openai.com/examples/agents_sdk/session_memory" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Context Engineering with Session Memory</a></li>
            <li>• Microsoft: <a href="https://github.com/microsoft/agent-framework" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Agent Framework GitHub</a></li>
            <li>• Docs: <a href="https://learn.microsoft.com/en-us/agent-framework/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Agent Framework Documentation</a></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextualOnboardingLiveRunner;
