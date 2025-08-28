import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Gauge, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function CostPerformance({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Cost & Performance Engineering</CardTitle>
          <CardDescription className="text-base">
            Optimize latency and spend without sacrificing quality
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Engineer for p95 latency, quality, and cost</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="Cost-aware routing path"
              steps={[
                'Classify Task',
                'Choose Model',
                'Cap Tokens',
                'Timeout + Retry',
                'Fallback (Cheaper)',
                'Cache/Log'
              ]}
              highlightIndices={[1, 2, 3, 4]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Model & Routing</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Dynamic model routing by task/complexity</li>
              <li>Distillation / re-ranking to reduce tokens</li>
              <li>Caching: semantic, tool, and retrieval caches</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Token & Latency Controls</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Strict max_tokens and truncation strategies</li>
              <li>Streaming UI to hide tail latency</li>
              <li>Timeouts, retries, fallbacks with circuit breakers</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Cost Guardrails</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Per-user and per-tenant spend limits</li>
              <li>Budget alerts and anomaly detection</li>
              <li>Batching and summarization for heavy tasks</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Perf Observability</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Trace tokens, model, latency, cost per request</li>
              <li>Sampling for expensive spans</li>
              <li>Perf regression gates in CI</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <CardTitle>Studio Lab: Cost-Aware Routing</CardTitle>
          </div>
          <CardDescription>Implement a router that chooses models by complexity and budget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Define tasks and complexity thresholds</li>
            <li>Route: small models for simple, bigger for complex</li>
            <li>Add budget guardrails and alerts</li>
            <li>Evaluate quality/latency/cost against baseline</li>
          </ol>
          <div className="mt-3">
            <MiniFlowMap
              title="Cost guardrails drill‑down"
              steps={[
                'Quota (User/Tenant)',
                'Budget Monitor',
                'Anomaly Detect',
                'Throttle/Degrade',
                'Alert + Review'
              ]}
              highlightIndices={[1, 2, 3]}
            />
          </div>
          <div className="mt-3">
            <MiniFlowMap
              title="Cache tiers flow"
              steps={['Prompt Hash', 'Semantic Cache', 'Tool Cache', 'Retrieval Cache', 'Write‑Through', 'Evict']}
              highlightIndices={[1, 2, 3]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>≥ 20% cost reduction at equal quality</li>
                <li>p95 latency improves or holds baseline</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Misclassified complexity leading to QoS drops</li>
                <li>Budget caps during peak load</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs & Anti‑patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <CardTitle>KPIs and Anti‑patterns</CardTitle>
          </div>
          <CardDescription>Balance speed, quality, and spend</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Cost per successful task</li>
              <li>p95 latency and timeout rate</li>
              <li>Quality Score at target budget</li>
              <li>Cache hit rate</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Always using the biggest model</li>
              <li>No token limits; unlimited retries</li>
              <li>Ignoring cache opportunities</li>
              <li>Optimizing cost while tanking quality</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=cost-performance&type=socratic')}
            aria-label="Start micro-assessment for Cost & Performance">
            Micro‑assessment
          </Button>
          <Button variant="outline" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=cost-performance&type=debug')}
            aria-label="Try a debug challenge for Cost & Performance">
            Try Debug Challenge
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: Security & Data Boundaries
          </Button>
        </div>
      </div>
    </div>
  )
}
