import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Code, Database, Flask } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/ui/CodeBlock';
import { getScienceDomainSample } from '@/lib/data/scienceDomainSamples';

export default function ScienceDomainSamplePage() {
  const { domainId } = useParams<{ domainId: string }>();
  const sample = useMemo(() => (domainId ? getScienceDomainSample(domainId) : undefined), [domainId]);
  const [language, setLanguage] = useState<'typescript' | 'python'>('typescript');
  const isScienceFactory = sample?.id === 'science-ai-factory';

  if (!sample) {
    return (
      <div className="flat-ui-2-theme container mx-auto max-w-5xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sample not found</CardTitle>
            <CardDescription>The science starter you requested does not exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/agents-for-science">
                <ArrowLeft size={16} className="mr-2" />
                Back to Agents for Science
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flat-ui-2-theme agents-for-science-flat-ui container mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/agents-for-science">
            <ArrowLeft size={16} className="mr-2" />
            Back to Domains
          </Link>
        </Button>
        <Badge variant="outline" className="text-xs">Starter sample</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{sample.title}</CardTitle>
          <CardDescription>{sample.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border/60 bg-background p-4">
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground">Scientific goal</h3>
            <p>{sample.scientificGoal}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-background p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide">
                <Flask size={16} />
                Agent approach
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {sample.agentApproach.map(step => <li key={step}>{step}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-border/60 bg-background p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide">
                <Database size={16} />
                Suggested datasets
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {sample.datasets.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {isScienceFactory && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Science-to-Technology Architecture Map</CardTitle>
              <CardDescription>Use this diagram to translate scientific intent into an agentic platform architecture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-lg border border-amber-300/60 bg-background p-3">
                  <p className="text-xs font-semibold text-muted-foreground">1. Science intent</p>
                  <p className="text-sm font-medium">Question, hypotheses, constraints</p>
                </div>
                <div className="rounded-lg border border-blue-300/60 bg-background p-3">
                  <p className="text-xs font-semibold text-muted-foreground">2. Agent cognition</p>
                  <p className="text-sm font-medium">Ingest, retrieve, reason, critique</p>
                </div>
                <div className="rounded-lg border border-violet-300/60 bg-background p-3">
                  <p className="text-xs font-semibold text-muted-foreground">3. Platform layer</p>
                  <p className="text-sm font-medium">Memory, tools, orchestration, evals</p>
                </div>
                <div className="rounded-lg border border-emerald-300/60 bg-background p-3">
                  <p className="text-xs font-semibold text-muted-foreground">4. Lab delivery</p>
                  <p className="text-sm font-medium">Experiment plan, simulation, backlog</p>
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
                Flow: Science objective {'->'} Agent pipeline {'->'} Governed platform services {'->'} Reproducible experiment outputs
              </div>
            </CardContent>
          </Card>
          <div className="rounded-xl border border-border/60 bg-slate-50/70 p-3 dark:bg-slate-900/40">
            <img
              src="/images/Science_AI_Factory.webp"
              alt="Science AI Factory diagram showing architecture map, datasets, agent approach, and minimal workflow starter."
              className="h-auto w-full rounded-lg border border-border/60 bg-background object-contain"
              loading="lazy"
            />
          </div>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Minimal workflow starter</CardTitle>
          <CardDescription>Use this sequence to bootstrap a practical proof-of-concept.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 pl-5 text-sm text-muted-foreground">
            {sample.starterSteps.map(step => (
              <li key={step} className="list-decimal">{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Code size={20} />
            Working code scaffold
          </CardTitle>
          <CardDescription>Run locally, then replace mock scoring logic with domain models and API calls.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={language} onValueChange={(v) => setLanguage(v as 'typescript' | 'python')}>
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript" className="mt-4">
              <CodeBlock language="typescript" styleVariant="flat-ui-2">
                {sample.typescriptStarter}
              </CodeBlock>
            </TabsContent>
            <TabsContent value="python" className="mt-4">
              <CodeBlock language="python" styleVariant="flat-ui-2">
                {sample.pythonStarter}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
