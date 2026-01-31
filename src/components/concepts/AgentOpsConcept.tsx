import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Zap,
  Target,
  AlertCircle,
  Timer,
  Layers,
  Database,
  Shield,
  GitBranch,
  BarChart3
} from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";

interface GoldenSignal {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  metric: string;
  threshold: string;
  alertExample: string;
}

interface FailurePattern {
  id: string;
  name: string;
  description: string;
  implementation: string;
  codeExample: string;
}

interface RolloutStage {
  name: string;
  traffic: string;
  duration: string;
  criteria: string[];
  rollback: string;
}

const goldenSignals: GoldenSignal[] = [
  {
    id: "tool-success",
    name: "Tool Call Success Rate",
    icon: <CheckCircle className="w-6 h-6" />,
    description: "Percentage of tool calls that complete successfully without errors or timeouts.",
    metric: "tool_call_success_rate",
    threshold: "> 99.5%",
    alertExample: "ALERT: Tool 'web_search' success rate dropped to 94.2% (threshold: 99.5%)"
  },
  {
    id: "cascade-depth",
    name: "Cascade Depth",
    icon: <Layers className="w-6 h-6" />,
    description: "Number of sequential agent-to-agent calls in a single request. Deep cascades indicate complexity risk.",
    metric: "max_cascade_depth",
    threshold: "< 5 levels",
    alertExample: "WARN: Cascade depth exceeded 7 for request_id=abc123 (threshold: 5)"
  },
  {
    id: "context-inflation",
    name: "Context Inflation",
    icon: <Database className="w-6 h-6" />,
    description: "Growth of context window usage over conversation turns. Indicates memory management issues.",
    metric: "context_tokens_per_turn",
    threshold: "< 10% growth/turn",
    alertExample: "WARN: Context inflation 23% over last 5 turns (threshold: 10%)"
  },
  {
    id: "tail-latency",
    name: "Tail Latency (P99)",
    icon: <Timer className="w-6 h-6" />,
    description: "99th percentile response time. Critical for user experience and timeout budgets.",
    metric: "response_latency_p99",
    threshold: "< 10s for complex, < 3s for simple",
    alertExample: "ALERT: P99 latency at 15.2s exceeds 10s threshold"
  }
];

const failurePatterns: FailurePattern[] = [
  {
    id: "circuit-breaker",
    name: "Circuit Breaker",
    description: "Stop calling a failing service to prevent cascade failures and allow recovery.",
    implementation: "Track failure rate per tool. Open circuit after threshold. Half-open to test recovery.",
    codeExample: `from circuitbreaker import CircuitBreaker, CircuitBreakerError

# Configure circuit breaker for external tool
tool_breaker = CircuitBreaker(
    failure_threshold=5,      # Open after 5 failures
    recovery_timeout=30,      # Try again after 30s
    expected_exception=ToolTimeoutError
)

@tool_breaker
async def call_external_tool(tool_name: str, params: dict) -> ToolResult:
    """Protected tool call with circuit breaker"""
    try:
        result = await tools.execute(tool_name, params, timeout=5.0)
        return result
    except asyncio.TimeoutError:
        raise ToolTimeoutError(f"{tool_name} timed out")

# Usage in agent
async def agent_step(action: Action) -> StepResult:
    try:
        return await call_external_tool(action.tool, action.params)
    except CircuitBreakerError:
        # Circuit is open - use fallback
        logger.warning(f"Circuit open for {action.tool}, using fallback")
        return await get_fallback_response(action)`
  },
  {
    id: "timeout-budget",
    name: "Timeout Budget",
    description: "Allocate time budgets across operations to ensure overall request completes within SLA.",
    implementation: "Distribute total timeout across steps. Track remaining budget. Fail fast when exhausted.",
    codeExample: `from dataclasses import dataclass
import time

@dataclass
class TimeoutBudget:
    """Distribute timeout across agent operations"""
    total_seconds: float
    started_at: float = None
    
    def start(self):
        self.started_at = time.monotonic()
    
    @property
    def remaining(self) -> float:
        if not self.started_at:
            return self.total_seconds
        elapsed = time.monotonic() - self.started_at
        return max(0, self.total_seconds - elapsed)
    
    def allocate(self, fraction: float) -> float:
        """Allocate fraction of remaining budget"""
        return self.remaining * fraction

# Usage
async def run_agent_with_budget(request: Request) -> Response:
    budget = TimeoutBudget(total_seconds=30.0)  # 30s total SLA
    budget.start()
    
    # Planning: 20% of budget
    plan = await planner.plan(request, timeout=budget.allocate(0.2))
    
    for step in plan.steps:
        if budget.remaining <= 0:
            return Response.partial(completed_steps=completed)
        result = await execute_step(step, timeout=budget.remaining / len(remaining_steps))`
  },
  {
    id: "bulkhead",
    name: "Bulkhead Isolation",
    description: "Isolate resources (connections, threads) per tool to prevent one failure from exhausting shared resources.",
    implementation: "Separate connection pools per tool. Limit concurrent calls. Queue with backpressure.",
    codeExample: `import asyncio
from collections import defaultdict

class BulkheadManager:
    """Isolate resources per tool to prevent cascade failures"""
    
    def __init__(self, default_limit: int = 10):
        self.semaphores: dict[str, asyncio.Semaphore] = {}
        self.limits = {
            "web_search": 20,      # High capacity
            "code_execution": 5,   # Resource intensive
            "database_query": 15,  # Medium capacity
        }
    
    def get_semaphore(self, tool_name: str) -> asyncio.Semaphore:
        if tool_name not in self.semaphores:
            limit = self.limits.get(tool_name, 10)
            self.semaphores[tool_name] = asyncio.Semaphore(limit)
        return self.semaphores[tool_name]
    
    async def execute_isolated(self, tool_name: str, func, *args):
        semaphore = self.get_semaphore(tool_name)
        async with semaphore:
            return await func(*args)`
  },
  {
    id: "retry-jitter",
    name: "Retry with Jitter",
    description: "Exponential backoff with random jitter prevents thundering herd and retry storms.",
    implementation: "Base delay * 2^attempt + random jitter. Cap max delay. Limit total attempts.",
    codeExample: `import random
import asyncio
from functools import wraps

def retry_with_jitter(max_attempts: int = 3, base_delay: float = 1.0):
    """Exponential backoff with jitter to prevent thundering herd"""
    
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except (TimeoutError, ConnectionError) as e:
                    if attempt == max_attempts - 1:
                        raise
                    delay = base_delay * (2 ** attempt)
                    jitter = delay * 0.5 * (2 * random.random() - 1)
                    await asyncio.sleep(delay + jitter)
        return wrapper
    return decorator

@retry_with_jitter(max_attempts=3, base_delay=1.0)
async def call_llm(prompt: str) -> str:
    return await llm.generate(prompt)`
  }
];

const rolloutStages: RolloutStage[] = [
  {
    name: "Shadow",
    traffic: "0% (parallel)",
    duration: "1-2 weeks",
    criteria: ["Response parity with baseline", "No error rate increase", "Latency within 10%"],
    rollback: "N/A - no user impact"
  },
  {
    name: "Canary",
    traffic: "1-5%",
    duration: "24-48 hours",
    criteria: ["Error rate < 0.1%", "P99 latency < SLA", "No critical alerts"],
    rollback: "Automatic on threshold breach"
  },
  {
    name: "Progressive",
    traffic: "5% → 25% → 50%",
    duration: "1-3 days per stage",
    criteria: ["Stable metrics at each stage", "User satisfaction maintained"],
    rollback: "Manual with 5-min SLA"
  },
  {
    name: "Full Rollout",
    traffic: "100%",
    duration: "Ongoing",
    criteria: ["All previous criteria met", "Stakeholder sign-off"],
    rollback: "Feature flag instant rollback"
  }
];

const sloExamples = [
  { name: "Availability", sli: "Successful requests / Total requests", slo: "> 99.9%", errorBudget: "43 min/month" },
  { name: "Latency", sli: "P95 response time", slo: "< 5 seconds", errorBudget: "2.5% can exceed" },
  { name: "Quality", sli: "User satisfaction (thumbs up)", slo: "> 85%", errorBudget: "15% can be unsatisfied" },
  { name: "Correctness", sli: "Human-verified accuracy", slo: "> 95%", errorBudget: "5% error rate allowed" }
];

/**
 * Agent Ops Concept: Operational excellence & reliability practices for agent systems (2026 Edition)
 */
export default function AgentOpsConcept() {
  const [selectedSignal, setSelectedSignal] = useState(goldenSignals[0]);
  const [selectedPattern, setSelectedPattern] = useState(failurePatterns[0]);

  return (
    <ConceptLayout
      conceptId="agent-ops"
      title="Agent Operations & Reliability"
      description="Sustain agent quality under real traffic: golden signals, failure containment, progressive rollout, and SRE practices for 2026."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">SRE for Agents</Badge>
                </div>
                <h3 className="text-2xl font-bold">Production-Grade Agent Reliability</h3>
                <p className="text-muted-foreground">
                  Agents in production face unique reliability challenges: tool failures cascade, context windows explode, 
                  and confidence drifts silently. Master the patterns that keep agents running smoothly at scale.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-green-500/10">Golden Signals</Badge>
                  <Badge variant="outline" className="bg-red-500/10">Failure Containment</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Progressive Rollout</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">SLOs & Error Budgets</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-xs text-muted-foreground">Target availability SLO</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">&lt; 5s</div>
                  <div className="text-xs text-muted-foreground">P95 latency target</div>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-2xl font-bold text-red-400">0</div>
                  <div className="text-xs text-muted-foreground">Critical incidents/month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="signals" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="signals">Golden Signals</TabsTrigger>
            <TabsTrigger value="failures">Failure Patterns</TabsTrigger>
            <TabsTrigger value="rollout">Rollout Strategy</TabsTrigger>
            <TabsTrigger value="slos">SLOs & Budgets</TabsTrigger>
          </TabsList>

          {/* Golden Signals Tab */}
          <TabsContent value="signals" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {goldenSignals.map((signal) => (
                <Card
                  key={signal.id}
                  className={`cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedSignal.id === signal.id ? 'border-green-500 bg-green-500/5' : ''
                  }`}
                  onClick={() => setSelectedSignal(signal)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-green-400">{signal.icon}</div>
                    <h4 className="font-medium text-xs">{signal.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">{selectedSignal.icon}</div>
                  <div>
                    <CardTitle>{selectedSignal.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSignal.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Metric Name</h4>
                    <code className="text-sm font-mono text-green-400">{selectedSignal.metric}</code>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Healthy Threshold</h4>
                    <Badge variant="outline" className="bg-green-500/10">{selectedSignal.threshold}</Badge>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="text-xs font-medium text-red-400 mb-1">Example Alert</h4>
                  <code className="text-xs font-mono">{selectedSignal.alertExample}</code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" /> Observability Stack (2026)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium mb-2">Tracing</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• LangSmith / Langfuse</li>
                      <li>• OpenTelemetry</li>
                      <li>• Weights & Biases</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium mb-2">Metrics</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Prometheus + Grafana</li>
                      <li>• Datadog</li>
                      <li>• Azure Monitor</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium mb-2">Logging</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Structured logs (JSON)</li>
                      <li>• Elastic / Loki</li>
                      <li>• Request correlation</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <h4 className="font-medium mb-2">Alerting</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• PagerDuty / OpsGenie</li>
                      <li>• Slack integration</li>
                      <li>• Runbook automation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Failure Patterns Tab */}
          <TabsContent value="failures" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {failurePatterns.map((pattern) => (
                <Card
                  key={pattern.id}
                  className={`cursor-pointer transition-all hover:border-red-500/50 ${
                    selectedPattern.id === pattern.id ? 'border-red-500 bg-red-500/5' : ''
                  }`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <CardContent className="pt-4 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-red-400" />
                    <h4 className="font-medium text-sm">{pattern.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{selectedPattern.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPattern.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Implementation Strategy</h4>
                  <p className="text-sm">{selectedPattern.implementation}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Code Example</h4>
                  <CodeBlock language="python">{selectedPattern.codeExample}</CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rollout Strategy Tab */}
          <TabsContent value="rollout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-blue-400" /> Progressive Rollout Stages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rolloutStages.map((stage, i) => (
                    <div key={stage.name} className="flex gap-4 p-4 rounded-lg border bg-background/50">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{stage.name}</h4>
                          <Badge variant="outline">{stage.traffic}</Badge>
                          <Badge variant="outline" className="bg-muted">{stage.duration}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Success Criteria:</p>
                            <ul className="space-y-1">
                              {stage.criteria.map((c, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <CheckCircle className="w-3 h-3 text-green-400" /> {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Rollback:</p>
                            <p className="text-sm text-muted-foreground">{stage.rollback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Flag Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Feature flag config for agent rollout
feature_flags:
  agent_v2:
    enabled: true
    rollout:
      strategy: percentage
      percentage: 25  # Current rollout stage
      
    # Automatic rollback triggers
    rollback_triggers:
      - metric: error_rate
        threshold: 0.01  # 1% error rate
        window: 5m
      - metric: p99_latency
        threshold: 10000  # 10s in ms
        window: 5m
    
    # Sticky assignment for consistency
    sticky: true
    sticky_key: user_id`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SLOs Tab */}
          <TabsContent value="slos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" /> SLOs & Error Budgets for Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">SLO Name</th>
                        <th className="text-left py-2 px-3">SLI (Indicator)</th>
                        <th className="text-left py-2 px-3">Target</th>
                        <th className="text-left py-2 px-3">Error Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sloExamples.map((slo, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-2 px-3 font-medium">{slo.name}</td>
                          <td className="py-2 px-3 text-muted-foreground">{slo.sli}</td>
                          <td className="py-2 px-3">
                            <Badge variant="outline" className="bg-green-500/10">{slo.slo}</Badge>
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">{slo.errorBudget}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> Error Budget Healthy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Ship new features aggressively</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Run experiments and A/B tests</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Refactor and pay down tech debt</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Onboard new tools and integrations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" /> Error Budget Exhausted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Freeze non-critical deploys</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Focus on reliability fixes only</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Conduct incident reviews</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Add monitoring and alerts</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Response Runbook</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Agent Incident Response Runbook

## Severity Levels
- **SEV1**: Complete agent outage, all users affected
- **SEV2**: Partial outage or degraded performance (>50% users)
- **SEV3**: Minor issues, workarounds available

## SEV1 Response (15 min SLA to acknowledge)
1. [ ] Page on-call engineer
2. [ ] Open incident channel (#incident-YYYYMMDD)
3. [ ] Identify blast radius
4. [ ] Check recent deployments (rollback if <1hr ago)
5. [ ] Check external dependencies (LLM API status)
6. [ ] Enable fallback mode if available
7. [ ] Communicate status to stakeholders (15 min intervals)

## Post-Incident
- [ ] Write incident report within 48h
- [ ] Schedule blameless retrospective
- [ ] Create action items with owners`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
