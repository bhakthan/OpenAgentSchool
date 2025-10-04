import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PatternData, PatternEvaluationProfile } from '@/lib/data/patterns/types';
import { coreEvaluationMetrics, evaluationCohortGuidance, evaluationJourneySteps, evaluationPrinciples, supportingEvaluationMetrics } from '@/lib/data/patterns/evaluationRegistry';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ListChecks, Info, Code, Briefcase, PuzzlePiece, ArrowsOut, ArrowsIn, CopySimple, Check, Target, Gauge, Database, Sparkle } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PatternDemoSVG } from '../interactive-demos';
import { EnlightenMeButton } from '@/components/enlighten/EnlightenMeButton';
import { ShareButton } from '@/components/ui/ShareButton';
import AutoGenPatternVisualizer from '../visualization/AutoGenPatternVisualizer';
import LivePatternRunner from './LivePatternRunner';
import { pageSEOConfigs } from '@/components/seo/SEO';
import { VelocityProfile } from './VelocityProfile';
import { reactAgentExecutionSteps } from '@/lib/data/execution/reactAgentExecutionSteps';
import { agenticRAGExecutionSteps } from '@/lib/data/execution/agenticRAGExecutionSteps';
import { selfReflectionExecutionSteps } from '@/lib/data/execution/selfReflectionExecutionSteps';
import { agentToAgentExecutionSteps } from '@/lib/data/execution/agentToAgentExecutionSteps';
import { agentEvaluationExecutionSteps } from '@/lib/data/execution/agentEvaluationExecutionSteps';
import { deepResearcherExecutionSteps } from '@/lib/data/execution/deepResearcherExecutionSteps';
import { modernToolUseExecutionSteps } from '@/lib/data/execution/modernToolUseExecutionSteps';
import { autogenMultiAgentExecutionSteps } from '@/lib/data/execution/autogenMultiAgentExecutionSteps';
import { parallelizationExecutionSteps } from '@/lib/data/execution/parallelizationExecutionSteps';
import { deepAgentsExecutionSteps } from '@/lib/data/execution/deepAgentsExecutionSteps';
import { modelContextProtocolExecutionSteps } from '@/lib/data/execution/modelContextProtocolExecutionSteps';
import { modelContextProtocolPythonExecutionSteps } from '@/lib/data/execution/modelContextProtocolPythonExecutionSteps';
import { computerUseExecutionSteps } from '@/lib/data/execution/computerUseExecutionSteps';
import { computerUsePythonExecutionSteps } from '@/lib/data/execution/computerUsePythonExecutionSteps';
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
import { schemaAwareDecompositionExecutionSteps } from '@/lib/data/execution/schemaAwareDecompositionExecutionSteps';
import { policyGatedInvocationExecutionSteps } from '@/lib/data/execution/policyGatedInvocationExecutionSteps';
import { perceptionNormalizationExecutionSteps } from '@/lib/data/execution/perceptionNormalizationExecutionSteps';
import { budgetConstrainedExecutionExecutionSteps } from '@/lib/data/execution/budgetConstrainedExecutionExecutionSteps';
import { actionGroundingVerificationExecutionSteps } from '@/lib/data/execution/actionGroundingVerificationExecutionSteps';
import { hierarchicalDocumentIntelligenceExecutionSteps } from '@/lib/data/execution/hierarchicalDocumentIntelligenceExecutionSteps';
import { getAlgorithmVisualization } from '@/lib/utils/algorithmVisualization';
import { agentToAgentPythonExecutionSteps } from '@/lib/data/execution/agentToAgentPythonExecutionSteps';
import { mobileManipulatorStewardExecutionSteps } from '@/lib/data/execution/mobileManipulatorStewardExecutionSteps';
import { adaptiveLabTechnicianExecutionSteps } from '@/lib/data/execution/adaptiveLabTechnicianExecutionSteps';
import { inventoryGuardianExecutionSteps } from '@/lib/data/execution/inventoryGuardianExecutionSteps';
import { emergencyResponseMateExecutionSteps } from '@/lib/data/execution/emergencyResponseMateExecutionSteps';

const CORE_PORTFOLIO_METRICS_FOR_SNIPPET = coreEvaluationMetrics.slice(0, 3).map((metric) => metric.dimension);

const toPascalCase = (value: string) =>
  value
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((fragment) => fragment.charAt(0).toUpperCase() + fragment.slice(1))
    .join('');

const toCamelCase = (value: string) => {
  const pascal = toPascalCase(value);
  return pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : '';
};

const buildEvaluationAutomationSnippet = (pattern: PatternData): string | null => {
  const evaluationProfile = pattern.evaluationProfile;
  if (!evaluationProfile) return null;

  const scenarioNarrative = (pattern.businessUseCase?.description ?? evaluationProfile.scenarioFocus)
    .replace(/\s+/g, ' ')
    .trim();

  const plan = {
    patternId: pattern.id,
    scenario: evaluationProfile.scenarioFocus,
    businessContext: scenarioNarrative,
    metrics: {
      portfolio: CORE_PORTFOLIO_METRICS_FOR_SNIPPET,
      pattern: evaluationProfile.criticalMetrics,
    },
  };

  const probes = [
    'metricProbe.taskSuccessRate({ threshold: 0.9 })',
    'metricProbe.safetyViolations()',
    'metricProbe.latencyP95({ thresholdMs: 5000 })',
    ...evaluationProfile.criticalMetrics.map((metric) => `metricProbe.pattern(${JSON.stringify(metric)})`),
  ];

  const functionName = `run${toPascalCase(pattern.id)}Evaluation`;

  return `import { createEvaluationHarness, metricProbe } from '@openagentschool/evals';

const harness = createEvaluationHarness();

const plan = ${JSON.stringify(plan, null, 2)};

export async function ${functionName}(agentUnderTest: AgentUnderTest) {
  return harness.run({
    plan,
    dataset: await harness.loadFixtures('${pattern.id}/baseline'),
    execute: () => agentUnderTest.handle(plan.scenario),
    probes: [
${probes.map((probe) => `      ${probe}`).join(',\n')}
    ],
  });
}
`;
};

const buildMetricProbeSnippet = (pattern: PatternData): string | null => {
  const evaluationProfile = pattern.evaluationProfile;
  if (!evaluationProfile) return null;

  const camelName = toCamelCase(pattern.id);
  const metricPlanName = `${camelName}MetricPlan`;
  const functionName = `track${toPascalCase(pattern.id)}Metrics`;

  const patternMetricLines = evaluationProfile.criticalMetrics.map((metric) => `    pattern.byName(${JSON.stringify(metric)})`);
  const patternMetricBlock = patternMetricLines.length
    ? patternMetricLines.join(',\n')
    : '    // Add pattern-specific probes here';

  return `import { metrics } from '@openagentschool/evals';

const { portfolio, pattern } = metrics;

export const ${metricPlanName} = {
  portfolio: [
    portfolio.taskSuccessRate({ threshold: 0.9 }),
    portfolio.safetyViolations(),
    portfolio.latencyP95({ thresholdMs: 5000 }),
  ],
  pattern: [
${patternMetricBlock}
  ],
};

export async function ${functionName}(runLog: EvaluationRunLog) {
  return metrics.evaluate({
    runLog,
    checks: [
      ...${metricPlanName}.portfolio,
      ...${metricPlanName}.pattern,
    ],
  });
}
`;
};

interface EvaluationScenarioVisualProps {
  pattern: PatternData;
  evaluationProfile: PatternEvaluationProfile;
}

const EvaluationScenarioVisual: React.FC<EvaluationScenarioVisualProps> = ({ pattern, evaluationProfile }) => {
  const Visualization = pattern.businessUseCase?.visualization as React.ComponentType<any> | undefined;
  const scenarioDescription = pattern.businessUseCase?.description ?? evaluationProfile.scenarioFocus;
  const businessLabel = pattern.businessUseCase?.industry ?? 'Business Scenario';
  const topCriticalMetrics = evaluationProfile.criticalMetrics.slice(0, 3);
  const readinessHighlights = evaluationProfile.readinessSignals?.slice(0, 2) ?? [];
  const dataNeedsHighlights = evaluationProfile.dataNeeds?.slice(0, 2) ?? [];

  const renderVisualization = () => {
    if (!Visualization) {
      return (
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/60">
          <PatternDemoSVG patternData={pattern} className="w-full max-w-full" />
        </div>
      );
    }

    const baseProps: Record<string, unknown> = {
      title: `${pattern.name} — Evaluation Flow`,
      description: scenarioDescription,
    };

    if ((Visualization as any)?.name === 'AlgorithmVisualizer') {
      const { steps } = getAlgorithmVisualization(pattern.id, pattern.id);
      baseProps.steps = steps;
    }

    try {
      return (
        <div className="overflow-hidden rounded-lg bg-muted/40 ring-1 ring-inset ring-border/40">
          {React.createElement(Visualization, baseProps)}
        </div>
      );
    } catch (error) {
      console.error('Failed to render business visualization for evaluation tab', error);
      return (
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/60">
          <PatternDemoSVG patternData={pattern} className="w-full max-w-full" />
        </div>
      );
    }
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-background via-background to-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-primary">
          <Target size={20} /> Evaluation scenario walkthrough
        </CardTitle>
        <CardDescription>
          Shows how the business flow maps to the evaluation focus, primary metrics, and readiness signals for this pattern.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className="relative flex-1 rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm shadow-primary/5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
              <Briefcase size={16} /> {businessLabel}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scenarioDescription}</p>
            <div className="mt-4">
              {renderVisualization()}
            </div>
            <div className="absolute right-[-18px] top-1/2 hidden -translate-y-1/2 lg:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Target size={22} />
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="h-full w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 shadow-sm shadow-primary/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ListChecks size={18} /> Evaluation focus
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{evaluationProfile.scenarioFocus}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Gauge size={18} /> Primary metrics
                </div>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {(topCriticalMetrics.length ? topCriticalMetrics : ['Add critical metrics to this pattern']).map((metric, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/80" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Database size={18} /> Data & readiness
                </div>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {readinessHighlights.length ? (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Readiness signals</div>
                      <ul className="mt-1 space-y-1.5">
                        {readinessHighlights.map((signal, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/60" />
                            <span>{signal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {dataNeedsHighlights.length ? (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Data needs</div>
                      <ul className="mt-1 space-y-1.5">
                        {dataNeedsHighlights.map((need, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/60" />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {!readinessHighlights.length && !dataNeedsHighlights.length ? (
                    <p className="text-muted-foreground/80">Add readiness signals or data needs to enrich this visualization.</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PatternDetailsProps {
  pattern: PatternData;
}

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  if (!pattern) return null;

  const [copiedSnippet, setCopiedSnippet] = useState<'automation' | 'metrics' | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopySnippet = async (type: 'automation' | 'metrics', snippet: string) => {
    if (!snippet) return;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = snippet;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      setCopiedSnippet(type);
      copyTimeoutRef.current = setTimeout(() => setCopiedSnippet(null), 2000);
    } catch (error) {
      console.error('Failed to copy evaluation snippet', error);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const hasBusinessUseCase = !!pattern.businessUseCase;
  const evaluationProfile = pattern.evaluationProfile;
  const automationSnippet = buildEvaluationAutomationSnippet(pattern);
  const metricSnippet = buildMetricProbeSnippet(pattern);
  const cohortGuidance = evaluationProfile?.cohort ? evaluationCohortGuidance[evaluationProfile.cohort] : null;
  const cohortLabel = evaluationProfile?.cohort
    ? {
        education: 'Education Patterns',
        'multi-agent': 'Multi-Agent & Orchestration',
        'advanced-automation': 'Advanced Automation',
        'communication-interface': 'Communication & Interface',
        'cognitive-sensing': 'Cognitive Enhancement & Sensing',
      }[evaluationProfile.cohort]
    : null;

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
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <ShareButton
              url={`${window.location.origin}/patterns/${pattern.id}`}
              title={pattern.name}
              description={pattern.description}
              variant="outline"
              size="sm"
              analyticsCategory="Pattern Share"
            />
            <EnlightenMeButton
              title={`${pattern.name} Pattern`}
              contextDescription={`${pattern.description}. ${agentPatternsContext}`}
            />
          </div>
        </div>
      </CardHeader>
    <CardContent className="pt-6">
  <Tabs
        key={pattern.id}
        defaultValue={hasBusinessUseCase ? "business-use-case" : "details"}
        className="w-full"
      >
          <TabsList className="grid w-full grid-cols-7">
            {hasBusinessUseCase && (
              <TabsTrigger value="business-use-case" className="flex items-center gap-2">
                <Briefcase size={16} /> Business Use Case
              </TabsTrigger>
            )}
            {pattern.velocityProfile && (
              <TabsTrigger value="velocity" className="flex items-center gap-2">
                <Sparkle size={16} /> Velocity
              </TabsTrigger>
            )}
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info size={16} /> Pattern Details
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code size={16} /> Implementation
            </TabsTrigger>
            {evaluationProfile && (
              <TabsTrigger value="evaluation" className="flex items-center gap-2">
                <ListChecks size={16} /> Evaluation
              </TabsTrigger>
            )}
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
            {pattern.id === 'agent-to-agent' && (
              <TabsTrigger value="live-runner-agent-to-agent" className="flex items-center gap-2">
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
            {pattern.id === 'computer-use' && (
              <TabsTrigger value="live-runner-computer-use" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'autogen-multi-agent' && (
              <TabsTrigger value="live-runner-autogen-multi" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'autogen-multi-agent' && pattern.codeVisualizer && (
              <TabsTrigger value="code-visualizer-mem0" className="flex items-center gap-2">
                <Sparkle size={16} /> Mem0 Memory
              </TabsTrigger>
            )}
            {pattern.id === 'orchestrator-worker' && (
              <TabsTrigger value="live-runner-orchestrator-worker" className="flex items-center gap-2">
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
            {pattern.id === 'hierarchical-document-intelligence' && (
              <TabsTrigger value="live-runner-hierarchical-doc" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'contextual-onboarding-orchestrator' && (
              <TabsTrigger value="live-runner-contextual-onboarding" className="flex items-center gap-2">
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
            {pattern.id === 'schema-aware-decomposition' && (
              <TabsTrigger value="live-runner-schema-aware" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'policy-gated-tool-invocation' && (
              <TabsTrigger value="live-runner-policy-gated" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'perception-normalization' && (
              <TabsTrigger value="live-runner-perception" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'budget-constrained-execution' && (
              <TabsTrigger value="live-runner-budget" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'action-grounding-verification' && (
              <TabsTrigger value="live-runner-action-grounding" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'mobile-manipulator-steward' && (
              <TabsTrigger value="live-runner-mobile-steward" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'adaptive-lab-technician' && (
              <TabsTrigger value="live-runner-adaptive-lab" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'inventory-guardian' && (
              <TabsTrigger value="live-runner-inventory-guardian" className="flex items-center gap-2">
                <Code size={16} /> Live Runner
              </TabsTrigger>
            )}
            {pattern.id === 'emergency-response-mate' && (
              <TabsTrigger value="live-runner-emergency-response" className="flex items-center gap-2">
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

          {pattern.velocityProfile && (
            <TabsContent value="velocity" className="pt-4">
              <VelocityProfile profile={pattern.velocityProfile} />
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

          {evaluationProfile && (
            <TabsContent value="evaluation" className="pt-4">
              <div className="space-y-4">
                <EvaluationScenarioVisual pattern={pattern} evaluationProfile={evaluationProfile} />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Evaluation focus</CardTitle>
                    <CardDescription>
                      Directly maps the PRD evaluation matrix to this pattern so teams can operationalize readiness checks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Scenario focus</h4>
                      <p className="text-base text-muted-foreground">{evaluationProfile.scenarioFocus}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Critical metrics to watch</h4>
                      <ul className="list-disc list-inside space-y-1 text-base">
                        {evaluationProfile.criticalMetrics.map((metric, index) => (
                          <li key={index}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Playbook notes</h4>
                      <ul className="list-disc list-inside space-y-1 text-base">
                        {evaluationProfile.evaluationNotes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                    {evaluationProfile.readinessSignals?.length ? (
                      <div>
                        <h4 className="font-semibold mb-2">Readiness signals</h4>
                        <ul className="list-disc list-inside space-y-1 text-base">
                          {evaluationProfile.readinessSignals.map((signal, index) => (
                            <li key={index}>{signal}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {evaluationProfile.dataNeeds?.length ? (
                      <div>
                        <h4 className="font-semibold mb-2">Data needs</h4>
                        <ul className="list-disc list-inside space-y-1 text-base">
                          {evaluationProfile.dataNeeds.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>

                {automationSnippet && (
                  <Card>
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-primary">Automation harness example</CardTitle>
                        <CardDescription>
                          Wire the pattern&apos;s business scenario into a repeatable evaluation run with guardrail probes.
                        </CardDescription>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy automation harness code"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => handleCopySnippet('automation', automationSnippet)}
                      >
                        {copiedSnippet === 'automation' ? <Check size={16} /> : <CopySimple size={16} />}
                        <span className="sr-only">Copy automation harness code</span>
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="rounded-md border border-border/60 bg-muted/40">
                        <pre className="max-h-[22rem] overflow-auto whitespace-pre text-xs font-mono leading-relaxed text-muted-foreground sm:text-sm">
                          <code>{automationSnippet}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {metricSnippet && (
                  <Card>
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-primary">Core metric probes</CardTitle>
                        <CardDescription>
                          Programmatic checks that bind portfolio guardrails to this pattern&apos;s critical signals.
                        </CardDescription>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy metric probes code"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => handleCopySnippet('metrics', metricSnippet)}
                      >
                        {copiedSnippet === 'metrics' ? <Check size={16} /> : <CopySimple size={16} />}
                        <span className="sr-only">Copy metric probes code</span>
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="rounded-md border border-border/60 bg-muted/40">
                        <pre className="max-h-[22rem] overflow-auto whitespace-pre text-xs font-mono leading-relaxed text-muted-foreground sm:text-sm">
                          <code>{metricSnippet}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {cohortGuidance && cohortLabel && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">Cohort guidance — {cohortLabel}</CardTitle>
                      <CardDescription>Key considerations shared across this family of patterns.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">Primary outcome</h4>
                        <p className="text-base text-muted-foreground">{cohortGuidance.primaryOutcome}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Key metrics</h4>
                        <ul className="list-disc list-inside space-y-1 text-base">
                          {cohortGuidance.keyMetrics.map((metric, index) => (
                            <li key={index}>{metric}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Evaluation approach</h4>
                        <ul className="list-disc list-inside space-y-1 text-base">
                          {cohortGuidance.evaluationApproach.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Special checks</h4>
                        <ul className="list-disc list-inside space-y-1 text-base">
                          {cohortGuidance.specialChecks.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Accordion type="multiple" className="w-full" defaultValue={["journey", "core-metrics"]}>
                  <AccordionItem value="journey">
                    <AccordionTrigger>Evaluation journey checklist</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {evaluationJourneySteps.map((step, index) => (
                          <div
                            key={step.id}
                            className="rounded-xl border border-border/50 bg-muted/30 p-4 shadow-sm shadow-primary/5"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                  {index + 1}
                                </span>
                                <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
                              </div>
                              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                                {step.id}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground list-disc pl-5 marker:text-primary/80">
                              {step.checklist.map((item, checklistIndex) => (
                                <li key={checklistIndex}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="core-metrics">
                    <AccordionTrigger>Core portfolio metrics</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {coreEvaluationMetrics.map((metric) => (
                          <div key={metric.dimension} className="border rounded-lg p-3 bg-muted/40">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="font-semibold">{metric.dimension}</h4>
                              {metric.target && (
                                <span className="text-sm font-medium text-primary/80">Target: {metric.target}</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="supporting-metrics">
                    <AccordionTrigger>Supporting metrics & diagnostics</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {supportingEvaluationMetrics.map((metric) => (
                          <div key={metric.dimension}>
                            <h4 className="font-semibold text-sm">{metric.dimension}</h4>
                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="principles">
                    <AccordionTrigger>Evaluation principles</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {evaluationPrinciples.map((principle) => (
                          <li key={principle.title}>
                            <span className="font-semibold text-foreground">{principle.title}:</span>{' '}
                            <span className="text-muted-foreground">{principle.description}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          )}

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
          {pattern.id === 'agent-to-agent' && (
            <TabsContent value="live-runner-agent-to-agent" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={agentToAgentExecutionSteps as any}
                pythonSteps={agentToAgentPythonExecutionSteps as any}
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
          {pattern.id === 'computer-use' && (
            <TabsContent value="live-runner-computer-use" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={computerUseExecutionSteps as any}
                pythonSteps={computerUsePythonExecutionSteps as any}
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
          {pattern.id === 'autogen-multi-agent' && pattern.codeVisualizer && (
            <TabsContent value="code-visualizer-mem0" className="pt-4">
              {React.createElement(pattern.codeVisualizer)}
            </TabsContent>
          )}
          {pattern.id === 'orchestrator-worker' && (
            <TabsContent value="live-runner-orchestrator-worker" className="pt-4">
              {pattern.codeVisualizer ? React.createElement(pattern.codeVisualizer) : (
                <LivePatternRunner
                  code={pattern.codeExample}
                  pythonCode={pattern.pythonCodeExample}
                  patternId={pattern.id}
                  patternName={pattern.name}
                  steps={autogenMultiAgentExecutionSteps as any}
                />
              )}
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
          {pattern.id === 'hierarchical-document-intelligence' && (
            <TabsContent value="live-runner-hierarchical-doc" className="pt-4">
              {pattern.codeVisualizer && React.createElement(pattern.codeVisualizer)}
            </TabsContent>
          )}
          {pattern.id === 'contextual-onboarding-orchestrator' && (
            <TabsContent value="live-runner-contextual-onboarding" className="pt-4">
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
          {pattern.id === 'schema-aware-decomposition' && (
            <TabsContent value="live-runner-schema-aware" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={schemaAwareDecompositionExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'policy-gated-tool-invocation' && (
            <TabsContent value="live-runner-policy-gated" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={policyGatedInvocationExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'perception-normalization' && (
            <TabsContent value="live-runner-perception" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={perceptionNormalizationExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'budget-constrained-execution' && (
            <TabsContent value="live-runner-budget" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={budgetConstrainedExecutionExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'action-grounding-verification' && (
            <TabsContent value="live-runner-action-grounding" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                pythonCode={pattern.pythonCodeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={actionGroundingVerificationExecutionSteps as any}
              />
            </TabsContent>
          )}
          {pattern.id === 'mobile-manipulator-steward' && (
            <TabsContent value="live-runner-mobile-steward" className="pt-4">
              <LivePatternRunner
                code={pattern.codeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={mobileManipulatorStewardExecutionSteps}
              />
            </TabsContent>
          )}
          {pattern.id === 'adaptive-lab-technician' && (
            <TabsContent value="live-runner-adaptive-lab" className="pt-4">
              <LivePatternRunner
                code={pattern.completeCode || pattern.codeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={adaptiveLabTechnicianExecutionSteps}
              />
            </TabsContent>
          )}
          {pattern.id === 'inventory-guardian' && (
            <TabsContent value="live-runner-inventory-guardian" className="pt-4">
              <LivePatternRunner
                code={pattern.completeCode || pattern.codeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={inventoryGuardianExecutionSteps}
              />
            </TabsContent>
          )}
          {pattern.id === 'emergency-response-mate' && (
            <TabsContent value="live-runner-emergency-response" className="pt-4">
              <LivePatternRunner
                code={pattern.completeCode || pattern.codeExample}
                patternId={pattern.id}
                patternName={pattern.name}
                steps={emergencyResponseMateExecutionSteps}
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
