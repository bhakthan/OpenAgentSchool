import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

/**
 * Agent Ops Concept: Operational excellence & reliability practices for agent systems
 */
export default function AgentOpsConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Agent Operations & Reliability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Sustain agent quality under real traffic by instrumenting golden signals, enforcing graceful degradation,
            and designing failure containment patterns (circuit breakers, bulkheads, adaptive retry, backpressure).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Golden Signals for Agents:</strong> tool call success, cascade depth, context inflation, tail latency, confidence drift.</li>
            <li><strong>Failure Containment:</strong> circuit breakers on external tools, timeout budgets, fallbacks & capability downgrades.</li>
            <li><strong>Retry Hygiene:</strong> jitter + exponential backoff, idempotency guards, retry storms prevention.</li>
            <li><strong>Confidence & Quality Guardrails:</strong> trigger audits when confidence high but correction rate spikes.</li>
            <li><strong>Progressive Hardening:</strong> shadow → canary → progressive rollout with structured rollback levers.</li>
          </ul>
          <p className="text-muted-foreground text-xs">
            See the scenario “Tool Failure Cascade During Peak Traffic” for applied decision sequencing and recovery metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
