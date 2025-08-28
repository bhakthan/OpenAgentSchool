import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gauge, ChartLine, Waves, Cube, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function ObservabilityEvalOps({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Agent Observability & EvalOps</CardTitle>
          <CardDescription className="text-base">
            Traces, metrics, prompt tests, regression gates, and runbooks for reliable agents
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Outcomes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            <CardTitle>What you’ll learn</CardTitle>
          </div>
          <CardDescription>Instrumentation, evaluation harnesses, and quality gates</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="md:col-span-3">
            <MiniFlowMap
              title="EvalOps pipeline"
              steps={["Trace", "Golden eval", "Quality gate", "Canary", "Monitor & rollback"]}
              highlightIndices={[1,2]}
            />
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold mb-1">End-to-end tracing</div>
            <p className="text-muted-foreground">Correlate prompts, tool calls, model responses, and user sessions</p>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold mb-1">Eval harnesses</div>
            <p className="text-muted-foreground">Golden sets, graded metrics, and regression thresholds in CI</p>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold mb-1">Quality gates</div>
            <p className="text-muted-foreground">Block unsafe or degraded releases with objective thresholds</p>
          </div>
        </CardContent>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ChartLine className="w-5 h-5" />
            <CardTitle>Practices that stick</CardTitle>
          </div>
          <CardDescription>Concrete patterns used by high-performing teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-semibold mb-1">Structured tracing</div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Span per prompt, tool call, and output with correlation IDs</li>
                <li>Session IDs for user flows; request IDs for retries</li>
                <li>PII scrubbing at ingestion; sampling with heat-up on errors</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="font-semibold mb-1">Evaluation harness</div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Golden dataset per task family; periodic refresh</li>
                <li>Graded metrics: accuracy, grounding, safety, determinism proxy</li>
                <li>Pre-merge and pre-prod regression suites with diff reports</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="font-semibold mb-1">Quality bars and SLOs</div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Composite Quality Score (weight accuracy, safety, grounding)</li>
                <li>Latency p95/p99 and cost/1k tokens budgets</li>
                <li>Drift monitors comparing live vs golden distributions</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="font-semibold mb-1">Runbooks and rollback</div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Prompt freeze + model pin + cache fallback</li>
                <li>Guardrail tighten → canary disable → full rollback ladder</li>
                <li>Incident postmortems feeding new evals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cube className="w-5 h-5" />
            <CardTitle>Studio Lab: Build an Eval Harness</CardTitle>
          </div>
          <CardDescription>Ship a reproducible evaluation suite for one workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Pick a task family (e.g., summarize, extract, generate code)</li>
            <li>Create 25–50 golden examples with expected outputs</li>
            <li>Implement scorers (exact/semantic match, safety flags, latency, cost)</li>
            <li>Wire a CLI/CI job that runs the suite and outputs a diff report</li>
            <li>Set thresholds and make the job required for merging</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>≥ 95% Quality Score on golden set</li>
                <li>p95 latency ≤ target; cost within budget</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Long inputs; empty/ambiguous cases</li>
                <li>Tool failure and retry behavior</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Artifacts</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Golden set, scorers, CI config, thresholds</li>
                <li>Runbook with rollback ladder</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs & Anti‑patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            <CardTitle>KPIs and Anti‑patterns</CardTitle>
          </div>
          <CardDescription>Measure what matters and avoid common traps</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><CheckCircle className="w-4 h-4 text-green-600"/> KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Composite Quality Score (Q) trend</li>
              <li>Safety violation rate per 1k requests</li>
              <li>p95/p99 latency and cost/1k tokens</li>
              <li>Drift delta vs golden; rollback mean time</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>No golden sets; only ad‑hoc manual tests</li>
              <li>Single metric optimization; ignoring safety/cost</li>
              <li>Disabling sampling entirely; losing signal</li>
              <li>Runbooks without actionable rollback steps</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=observability-evalops&type=socratic')}
            aria-label="Start micro-assessment for Observability & EvalOps">
            Micro‑assessment
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: PromptOps & Tooling
          </Button>
        </div>
      </div>
    </div>
  )
}
