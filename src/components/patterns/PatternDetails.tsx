import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PatternData } from '@/lib/data/patterns/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks, Info, Code, Briefcase, PuzzlePiece, ArrowsOut, ArrowsIn } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PatternDemoSVG } from '../interactive-demos';
import { EnlightenMeButton } from '@/components/enlighten/EnlightenMeButton';
import AutoGenPatternVisualizer from '../visualization/AutoGenPatternVisualizer';
import LivePatternRunner from './LivePatternRunner';
import { pageSEOConfigs } from '@/components/seo/SEO';
import { reactAgentExecutionSteps } from '@/lib/data/execution/reactAgentExecutionSteps';
import { agenticRAGExecutionSteps } from '@/lib/data/execution/agenticRAGExecutionSteps';
import { selfReflectionExecutionSteps } from '@/lib/data/execution/selfReflectionExecutionSteps';
import { agentEvaluationExecutionSteps } from '@/lib/data/execution/agentEvaluationExecutionSteps';
import { deepResearcherExecutionSteps } from '@/lib/data/execution/deepResearcherExecutionSteps';
import { modernToolUseExecutionSteps } from '@/lib/data/execution/modernToolUseExecutionSteps';
import { autogenMultiAgentExecutionSteps } from '@/lib/data/execution/autogenMultiAgentExecutionSteps';
import { parallelizationExecutionSteps } from '@/lib/data/execution/parallelizationExecutionSteps';
import { deepAgentsExecutionSteps } from '@/lib/data/execution/deepAgentsExecutionSteps';
import { modelContextProtocolExecutionSteps } from '@/lib/data/execution/modelContextProtocolExecutionSteps';
import { modelContextProtocolPythonExecutionSteps } from '@/lib/data/execution/modelContextProtocolPythonExecutionSteps';
import { agentEvaluationPythonExecutionSteps } from '@/lib/data/execution/agentEvaluationPythonExecutionSteps';
import { conceptToProjectExecutionSteps } from '@/lib/data/execution/conceptToProjectExecutionSteps';
import { errorWhispererExecutionSteps } from '@/lib/data/execution/errorWhispererExecutionSteps';
import { knowledgeMapNavigatorExecutionSteps } from '@/lib/data/execution/knowledgeMapNavigatorExecutionSteps';
import { peerReviewSimulatorExecutionSteps } from '@/lib/data/execution/peerReviewSimulatorExecutionSteps';
import { socraticCoachExecutionSteps } from '@/lib/data/execution/socraticCoachExecutionSteps';
import { toolUseCoachExecutionSteps } from '@/lib/data/execution/toolUseCoachExecutionSteps';
import { challengeLadderGeneratorExecutionSteps } from '@/lib/data/execution/challengeLadderGeneratorExecutionSteps';
import { misconceptionDetectorExecutionSteps } from '@/lib/data/execution/misconceptionDetectorExecutionSteps';
import { timeboxPairProgrammerExecutionSteps } from '@/lib/data/execution/timeboxPairProgrammerExecutionSteps';
import { dataQualityFeedbackLoopExecutionSteps } from '@/lib/data/execution/dataQualityFeedbackLoopExecutionSteps';
import { queryIntentStructuredAccessExecutionSteps } from '@/lib/data/execution/queryIntentStructuredAccessExecutionSteps';
import { strategyMemoryReplayExecutionSteps } from '@/lib/data/execution/strategyMemoryReplayExecutionSteps';
import { getAlgorithmVisualization } from '@/lib/utils/algorithmVisualization';

interface PatternDetailsProps {
  pattern: PatternData;
}

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  if (!pattern) return null;

  const hasBusinessUseCase = !!pattern.businessUseCase;

  const enlightenMePrompt = pattern.businessUseCase?.enlightenMePrompt ||
    `Explain the ${pattern.name} agent pattern in comprehensive detail. Cover its core concept, architecture, implementation, real-world use cases, and evaluation strategies.`;

  // Get the Agent Patterns context description for proper Ask AI context
  const agentPatternsContext = pageSEOConfigs['/patterns']?.description || 
    'Comprehensive collection of proven AI agent design patterns with detailed implementation guides, architectural templates, and best practices for building robust, scalable agent systems.';

  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader className="bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Info size={24} className="text-primary" />
              {pattern.name}
            </CardTitle>
            <CardDescription>
              {pattern.description}
            </CardDescription>
          </div>
          <div className="flex-shrink-0 ml-4">
            <EnlightenMeButton
              title={`${pattern.name} Pattern`}
              contextDescription={`${pattern.description}. ${agentPatternsContext}`}
            />
          </div>
        </div>
      </CardHeader>
    <CardContent className="pt-6">
  <Tabs defaultValue={hasBusinessUseCase ? "business-use-case" : "details"} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {hasBusinessUseCase && (
              <TabsTrigger value="business-use-case" className="flex items-center gap-2">
                <Briefcase size={16} /> Business Use Case
              </TabsTrigger>
            )}
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info size={16} /> Pattern Details
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code size={16} /> Implementation
            </TabsTrigger>
            {pattern.id === 'react-agent' && (
              <TabsTrigger value="live-runner" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'agentic-rag' && (
              <TabsTrigger value="live-runner-rag" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'self-reflection' && (
              <TabsTrigger value="live-runner-self" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'agent-evaluation' && (
              <TabsTrigger value="live-runner-eval" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'deep-researcher' && (
              <TabsTrigger value="live-runner-deep" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'modern-tool-use' && (
              <TabsTrigger value="live-runner-modern" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'autogen-multi-agent' && (
              <TabsTrigger value="live-runner-autogen-multi" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'parallelization' && (
              <TabsTrigger value="live-runner-parallelization" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'deep-agents' && (
              <TabsTrigger value="live-runner-deep-agents" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'model-context-protocol' && (
              <TabsTrigger value="live-runner-mcp" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'swarm-intelligence' && (
              <TabsTrigger value="live-runner-swarm" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'sensory-reasoning-enhancement' && (
              <TabsTrigger value="live-runner-sensory" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'concept-to-project' && (
              <TabsTrigger value="live-runner-concept" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'error-whisperer' && (
              <TabsTrigger value="live-runner-error" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'knowledge-map-navigator' && (
              <TabsTrigger value="live-runner-knowledge" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'peer-review-simulator' && (
              <TabsTrigger value="live-runner-peer-review" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'socratic-coach' && (
              <TabsTrigger value="live-runner-socratic" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'tool-use-coach' && (
              <TabsTrigger value="live-runner-tool-use-coach" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'challenge-ladder-generator' && (
              <TabsTrigger value="live-runner-challenge-ladder" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'misconception-detector' && (
              <TabsTrigger value="live-runner-misconception" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'timebox-pair-programmer' && (
              <TabsTrigger value="live-runner-timebox" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'data-quality-feedback-repair-loop' && (
              <TabsTrigger value="live-runner-data-quality-feedback" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'query-intent-structured-access' && (
              <TabsTrigger value="live-runner-query-intent" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'strategy-memory-replay' && (
              <TabsTrigger value="live-runner-strategy-memory" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
          </TabsList>

          {hasBusinessUseCase && (
            <TabsContent value="business-use-case" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{pattern.businessUseCase.industry}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-base">{pattern.businessUseCase.description}</p>
                  </div>
                  <div>
                    {pattern.businessUseCase.visualization ? (() => {
                      const Vis = pattern.businessUseCase!.visualization as any;
                      // Provide helpful defaults to any visualization
                      const baseProps: any = {
                        title: `${pattern.name} — Business Flow`,
                        description: pattern.businessUseCase!.description,
                      };
                      // If this is the AlgorithmVisualizer, pass contextual steps
                      if (Vis?.name === 'AlgorithmVisualizer') {
                        const { steps } = getAlgorithmVisualization(pattern.id, pattern.id);
                        baseProps.steps = steps;
                      }
                      return React.createElement(Vis, baseProps);
                    })() : null}
                  </div>
                </CardContent>
                {/* Move the dynamic visualization below, full width */}
                {pattern.id === 'autogen-multi-agent' && (
                  <div className="w-full mt-6">
                    <DynamicAutoGenBusinessVisualization />
                  </div>
                )}
              </Card>
            </TabsContent>
          )}

          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">When to Use</h3>
                    <p className="text-base text-muted-foreground">{pattern.whenToUse}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-1"><ArrowsOut size={16} /> Advantages</h3>
                        <ul className="list-disc list-inside space-y-1 text-base">
                            {pattern.advantages?.map((adv, i) => <li key={i}>{adv}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-1"><ArrowsIn size={16} /> Limitations</h3>
                         <ul className="list-disc list-inside space-y-1 text-base">
                            {pattern.limitations?.map((lim, i) => <li key={i}>{lim}</li>)}
                        </ul>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-1"><PuzzlePiece size={16} /> Related Patterns</h3>
                    <div className="flex flex-wrap gap-2">
                        {pattern.relatedPatterns?.map((p, i) => (
                          <Badge key={i} variant="secondary" className="text-base">
                            {p}
                          </Badge>
                        ))}
                    </div>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="pt-4">
             <Accordion type="multiple" className="w-full" defaultValue={["steps", "diagram"]}>
              <AccordionItem value="steps">
                <AccordionTrigger>Implementation Steps</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-base">
                    {pattern.implementation.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="diagram">
                 <AccordionTrigger>Interactive Diagram</AccordionTrigger>
                 <AccordionContent>
                    <PatternDemoSVG patternData={pattern} className="mt-2" />
                 </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {pattern.id === 'react-agent' && (
            <TabsContent value="live-runner" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={reactAgentExecutionSteps}
              />
            </TabsContent>
          )}
          {pattern.id === 'agentic-rag' && (
            <TabsContent value="live-runner-rag" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={agenticRAGExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'self-reflection' && (
            <TabsContent value="live-runner-self" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={selfReflectionExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'agent-evaluation' && (
            <TabsContent value="live-runner-eval" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={agentEvaluationExecutionSteps as any}
                pythonSteps={agentEvaluationPythonExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'deep-researcher' && (
            <TabsContent value="live-runner-deep" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={deepResearcherExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'modern-tool-use' && (
            <TabsContent value="live-runner-modern" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={modernToolUseExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'autogen-multi-agent' && (
            <TabsContent value="live-runner-autogen-multi" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={autogenMultiAgentExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'parallelization' && (
            <TabsContent value="live-runner-parallelization" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={parallelizationExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'deep-agents' && (
            <TabsContent value="live-runner-deep-agents" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={deepAgentsExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'model-context-protocol' && (
            <TabsContent value="live-runner-mcp" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={modelContextProtocolExecutionSteps as any}
                pythonSteps={modelContextProtocolPythonExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'swarm-intelligence' && (
            <TabsContent value="live-runner-swarm" className="pt-4">
              {pattern.codeVisualizer && React.createElement(pattern.codeVisualizer)}
            </TabsContent>
          )}
          {pattern.id === 'sensory-reasoning-enhancement' && (
            <TabsContent value="live-runner-sensory" className="pt-4">
              {pattern.codeVisualizer && React.createElement(pattern.codeVisualizer)}
            </TabsContent>
          )}
          {pattern.id === 'concept-to-project' && (
            <TabsContent value="live-runner-concept" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={conceptToProjectExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'error-whisperer' && (
            <TabsContent value="live-runner-error" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={errorWhispererExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'knowledge-map-navigator' && (
            <TabsContent value="live-runner-knowledge" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={knowledgeMapNavigatorExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'peer-review-simulator' && (
            <TabsContent value="live-runner-peer-review" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={peerReviewSimulatorExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'socratic-coach' && (
            <TabsContent value="live-runner-socratic" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={socraticCoachExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'tool-use-coach' && (
            <TabsContent value="live-runner-tool-use-coach" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={toolUseCoachExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'challenge-ladder-generator' && (
            <TabsContent value="live-runner-challenge-ladder" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={challengeLadderGeneratorExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'misconception-detector' && (
            <TabsContent value="live-runner-misconception" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={misconceptionDetectorExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'timebox-pair-programmer' && (
            <TabsContent value="live-runner-timebox" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={timeboxPairProgrammerExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'data-quality-feedback-repair-loop' && (
            <TabsContent value="live-runner-data-quality-feedback" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={dataQualityFeedbackLoopExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'query-intent-structured-access' && (
            <TabsContent value="live-runner-query-intent" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={queryIntentStructuredAccessExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'strategy-memory-replay' && (
            <TabsContent value="live-runner-strategy-memory" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={strategyMemoryReplayExecutionSteps as any}
              />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatternDetails;

const parseAgentsAndInteractions = (input: string) => {
  // Very simple parser: expects lines like "Agent A assigns task to Agent B"
  const agents: { id: string; name: string; role: string }[] = [];
  const interactions: { source: string; target: string; type: string }[] = [];
  const agentMap: Record<string, string> = {};
  let agentId = 1;
  input.split('\n').forEach(line => {
    const match = line.match(/(Agent \w+) (.+) to (Agent \w+)/i);
    if (match) {
      const [_, from, action, to] = match;
      if (!agentMap[from]) {
        agentMap[from] = String(agentId++);
        agents.push({ id: agentMap[from], name: from, role: 'Unknown' });
      }
      if (!agentMap[to]) {
        agentMap[to] = String(agentId++);
        agents.push({ id: agentMap[to], name: to, role: 'Unknown' });
      }
      interactions.push({ source: agentMap[from], target: agentMap[to], type: action });
    }
  });
  return { agents, interactions };
};

const DynamicAutoGenBusinessVisualization: React.FC = () => {
  const [input, setInput] = React.useState('Agent A assigns task to Agent B\nAgent B shares data with Agent C');
  const [agents, setAgents] = React.useState<any[]>([]);
  const [interactions, setInteractions] = React.useState<any[]>([]);
  const [showVis, setShowVis] = React.useState(false);

  const handleGenerate = () => {
    const { agents, interactions } = parseAgentsAndInteractions(input);
    setAgents(agents);
    setInteractions(interactions);
    setShowVis(true);
  };

  return (
    <div className="mt-4 p-3 border rounded bg-muted/30">
      <label className="block mb-2 font-semibold">Enter agent interactions (e.g., "Agent A assigns task to Agent B"):</label>
      <textarea
        className="w-full border rounded p-2 mb-2 text-base"
        rows={3}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        onClick={handleGenerate}
        type="button"
      >
        Generate Visualization
      </button>
      {showVis && (
        agents.length > 0 && interactions.length > 0 ? (
          <div className="mt-4">
            <AutoGenPatternVisualizer agents={agents} interactions={interactions} />
          </div>
        ) : (
          <div className="mt-4 text-red-600 font-semibold">
            No valid agent interactions found. Please use the format: "Agent A assigns task to Agent B".
          </div>
        )
      )}
    </div>
  );
};
