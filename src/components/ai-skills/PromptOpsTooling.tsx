import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, GitCommit, GitBranch, ArrowsLeftRight, ShieldCheck, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function PromptOpsTooling({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">PromptOps & Tooling</CardTitle>
          <CardDescription className="text-base">
            Prompt repos, versioning, canary prompts, guardrails, and golden datasets
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Systematize prompts like code</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="PromptOps rollout"
              steps={["Edit", "Eval", "Canary", "A/B", "Promote"]}
              highlightIndices={[1,2,3]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><GitCommit className="w-4 h-4"/> Versioning & Releases</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Semantic versioning (MAJOR.MINOR.PATCH) for prompts</li>
              <li>Changelogs including eval diffs and safety notes</li>
              <li>Pin versions in code; progressive rollouts</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><ArrowsLeftRight className="w-4 h-4"/> Experimentation</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Canary prompts on 1–5% traffic; automatic rollback</li>
              <li>A/B testing on golden sets and live slices</li>
              <li>Experiment registry with metrics and decisions</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><ShieldCheck className="w-4 h-4"/> Guardrails</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Policy templates per domain; negative instructions lists</li>
              <li>Content filters + tool constraints + output schemas</li>
              <li>Safety evals integrated into CI and runtime</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><GitBranch className="w-4 h-4"/> Golden Sets & Drift</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Task-family golden sets; rotate 10–20% monthly</li>
              <li>Embedding-based drift detection on inputs/outputs</li>
              <li>Auto-suggest new goldens from incident samples</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            <CardTitle>Studio Lab: Canary + A/B Pipeline</CardTitle>
          </div>
          <CardDescription>Safely roll out a new prompt version with measurable impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Package the new prompt as vX.Y.Z with a changelog</li>
            <li>Run evals vs golden; record Quality Score deltas</li>
            <li>Deploy to 5% traffic with safety guardrails tightened</li>
            <li>Run live A/B for 24–72h; collect quality/latency/cost</li>
            <li>Promote to 100% if thresholds are met; else rollback</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>+2–5% Quality Score; ≤ baseline safety/latency/cost</li>
                <li>No regression on critical golden cases</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Input distribution shift; partial rollout behavior</li>
                <li>Guardrail false positives blocking good outputs</li>
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
          <CardDescription>Make improvements safe, measurable, and reversible</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Quality Score delta vs baseline</li>
              <li>Safety violation delta vs baseline</li>
              <li>p95 latency and cost deltas</li>
              <li>Rollback frequency and time to rollback</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Unpinned prompts; untracked edits in chat tools</li>
              <li>Ship-and-pray without canaries or guardrails</li>
              <li>Eval gating only on accuracy; ignoring safety/cost</li>
              <li>One-off experiments; no registry or learnings</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=promptops-tooling&type=socratic')}
            aria-label="Start micro-assessment for PromptOps & Tooling">
            Micro‑assessment
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: Safety, Risk & Governance
          </Button>
        </div>
      </div>
    </div>
  )
}
