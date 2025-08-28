import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, FlowArrow, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function MultiAgentOrchestration({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Multi‑Agent Orchestration</CardTitle>
          <CardDescription className="text-base">
            Coordinating specialist agents with tools, memory, and goals
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Design resilient, auditable agent systems</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="Supervisor routing"
              steps={['Goal', 'Planner', 'Specialist A', 'Specialist B', 'Arbitrate', 'Finalize']}
              highlightIndices={[1, 4, 5]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Roles & Protocols</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Clear capabilities and tool scopes per agent</li>
              <li>Supervisor/committee patterns for arbitration</li>
              <li>Typed messages and schemas for interactions</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Memory & State</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Short/long-term memory separation</li>
              <li>Task-local context with expiry</li>
              <li>Auditable state transitions</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Failure Handling</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Deadlock detection; max turns and timeouts</li>
              <li>Fallback to human-in-the-loop</li>
              <li>Idempotent tool calls; retry policies</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Observability</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Trace graph of conversations and tools</li>
              <li>Safety guardrails per agent</li>
              <li>Metrics for coordination efficiency</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FlowArrow className="w-5 h-5" />
            <CardTitle>Studio Lab: Supervisor + Specialists</CardTitle>
          </div>
          <CardDescription>Build a supervisor orchestrating two specialist agents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Define specialist roles and tools</li>
            <li>Implement supervisor routing and arbitration</li>
            <li>Add timeouts, retries, and HITL fallback</li>
            <li>Trace and evaluate coordination quality</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Higher quality vs single-agent baseline</li>
                <li>Bounded turns and stable completion rates</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Agent loops or conflicting tool usage</li>
                <li>State inconsistency after retries</li>
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
          <CardDescription>Coordination that adds value, not chaos</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Turns to completion</li>
              <li>Supervisor intervention rate</li>
              <li>Tool success vs retry ratio</li>
              <li>Quality Score vs single-agent baseline</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Too many agents without clear roles</li>
              <li>No limits on steps/turns</li>
              <li>Shared mutable state without isolation</li>
              <li>Orchestration that hides poor prompt design</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=multi-agent-orchestration&type=socratic')}
            aria-label="Start micro-assessment for Multi‑Agent Orchestration">
            Micro‑assessment
          </Button>
          <Button variant="outline" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=multi-agent-systems&type=debug')}
            aria-label="Try a debug challenge for Multi‑Agent Systems">
            Try Debug Challenge
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: Org Playbooks & Change Mgmt
          </Button>
        </div>
      </div>
    </div>
  )
}
