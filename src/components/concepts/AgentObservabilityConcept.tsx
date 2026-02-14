import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Activity, Search, AlertTriangle, LineChart, Clock, Code, Layers, Zap, Bug, Database, Terminal, Atom } from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ObservabilityViz from "@/components/visualization/ObservabilityViz";
import { SLICalculator, TraceWaterfallSim, AlertThresholdTuner, LogStructureExplorer } from './ObservabilityAtomicVisuals';

interface ObservabilityPillar {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tools: string[];
  keyMetrics: string[];
  codeExample: string;
}

const observabilityPillars: ObservabilityPillar[] = [
  {
    id: "tracing",
    name: "Distributed Tracing",
    icon: <Activity className="w-6 h-6" />,
    description: "Follow a request through every LLM call, tool execution, and agent step. Understand exactly what happened and why.",
    tools: ["LangSmith", "Langfuse", "Phoenix", "OpenTelemetry", "Weights & Biases"],
    keyMetrics: [
      "End-to-end latency",
      "LLM call duration",
      "Tool execution time",
      "Error rate by step",
      "Token consumption per trace"
    ],
    codeExample: `from langsmith import traceable
from opentelemetry import trace

tracer = trace.get_tracer("agent-service")

@traceable(name="agent_run")
def run_agent(user_input: str) -> str:
    """Traced agent execution with nested spans"""
    
    with tracer.start_as_current_span("planning") as span:
        span.set_attribute("user_input", user_input)
        plan = planner.create_plan(user_input)
        span.set_attribute("steps_planned", len(plan.steps))
    
    results = []
    for i, step in enumerate(plan.steps):
        with tracer.start_as_current_span(f"step_{i}") as step_span:
            step_span.set_attribute("step_type", step.type)
            step_span.set_attribute("tool", step.tool or "none")
            
            try:
                if step.tool:
                    with tracer.start_as_current_span("tool_call"):
                        result = execute_tool(step.tool, step.args)
                else:
                    with tracer.start_as_current_span("llm_call") as llm_span:
                        result = llm.generate(step.prompt)
                        llm_span.set_attribute("tokens_in", result.usage.input)
                        llm_span.set_attribute("tokens_out", result.usage.output)
                
                results.append(result)
                step_span.set_attribute("status", "success")
                
            except Exception as e:
                step_span.set_attribute("status", "error")
                step_span.record_exception(e)
                raise
    
    return synthesize_results(results)

# Trace visualization in LangSmith/Langfuse shows:
# agent_run (5.2s)
# ├── planning (0.3s)
# ├── step_0 (1.2s)
# │   └── tool_call: search (1.1s)
# ├── step_1 (2.1s)
# │   └── llm_call (2.0s) tokens: 1500
# └── step_2 (1.5s)
#     └── llm_call (1.4s) tokens: 800`
  },
  {
    id: "logging",
    name: "Structured Logging",
    icon: <Terminal className="w-6 h-6" />,
    description: "JSON-structured logs with consistent fields for filtering, alerting, and debugging agent behavior.",
    tools: ["Structured Logging", "Datadog", "Elastic", "Loki", "CloudWatch"],
    keyMetrics: [
      "Log volume per agent",
      "Error frequency",
      "Warning patterns",
      "User action correlation",
      "Session replay data"
    ],
    codeExample: `import structlog
from typing import Any

# Configure structured logging
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.JSONRenderer()
    ]
)

logger = structlog.get_logger()

class AgentLogger:
    """Consistent structured logging for agent operations"""
    
    def __init__(self, agent_id: str, session_id: str):
        self.base_context = {
            "agent_id": agent_id,
            "session_id": session_id,
            "service": "agent-orchestrator"
        }
        self.log = logger.bind(**self.base_context)
    
    def llm_call(self, model: str, prompt_tokens: int, 
                 completion_tokens: int, latency_ms: float,
                 status: str = "success"):
        self.log.info(
            "llm_call",
            event_type="llm_call",
            model=model,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=prompt_tokens + completion_tokens,
            latency_ms=latency_ms,
            status=status,
            cost_usd=self._calculate_cost(model, prompt_tokens, completion_tokens)
        )
    
    def tool_execution(self, tool_name: str, args: dict,
                       result_size: int, latency_ms: float,
                       status: str = "success", error: str = None):
        self.log.info(
            "tool_execution",
            event_type="tool_execution",
            tool_name=tool_name,
            args_keys=list(args.keys()),  # Don't log values (PII risk)
            result_size_bytes=result_size,
            latency_ms=latency_ms,
            status=status,
            error=error
        )
    
    def agent_decision(self, decision_type: str, 
                       options: list, chosen: str, reasoning: str):
        self.log.info(
            "agent_decision",
            event_type="decision",
            decision_type=decision_type,
            options_count=len(options),
            chosen=chosen,
            reasoning_length=len(reasoning)
            # Don't log full reasoning (context window cost)
        )

# Log output (JSON):
# {
#   "timestamp": "2026-01-31T10:30:00Z",
#   "level": "info",
#   "event": "llm_call",
#   "agent_id": "agent-123",
#   "session_id": "sess-456",
#   "model": "gpt-4o",
#   "prompt_tokens": 1500,
#   "completion_tokens": 500,
#   "latency_ms": 2100,
#   "cost_usd": 0.035
# }`
  },
  {
    id: "metrics",
    name: "Metrics & Dashboards",
    icon: <LineChart className="w-6 h-6" />,
    description: "Real-time metrics on latency, token usage, costs, success rates, and SLA compliance.",
    tools: ["Prometheus", "Grafana", "Datadog", "New Relic", "Custom dashboards"],
    keyMetrics: [
      "P50/P95/P99 latency",
      "Tokens per request",
      "Cost per request",
      "Success rate",
      "Cache hit rate"
    ],
    codeExample: `from prometheus_client import Counter, Histogram, Gauge
import time

# Define metrics
agent_requests = Counter(
    'agent_requests_total',
    'Total agent requests',
    ['agent_type', 'status']
)

request_latency = Histogram(
    'agent_request_latency_seconds',
    'Agent request latency',
    ['agent_type'],
    buckets=[0.5, 1, 2, 5, 10, 30, 60]
)

tokens_used = Counter(
    'agent_tokens_total',
    'Tokens consumed',
    ['agent_type', 'model', 'token_type']  # input/output
)

active_sessions = Gauge(
    'agent_active_sessions',
    'Currently active agent sessions',
    ['agent_type']
)

cost_total = Counter(
    'agent_cost_usd_total',
    'Total cost in USD',
    ['agent_type', 'model']
)

class MetricsMiddleware:
    """Automatic metrics collection for agent calls"""
    
    def __init__(self, agent_type: str):
        self.agent_type = agent_type
    
    def __call__(self, func):
        def wrapper(*args, **kwargs):
            active_sessions.labels(agent_type=self.agent_type).inc()
            start = time.time()
            
            try:
                result = func(*args, **kwargs)
                agent_requests.labels(
                    agent_type=self.agent_type,
                    status="success"
                ).inc()
                return result
                
            except Exception as e:
                agent_requests.labels(
                    agent_type=self.agent_type,
                    status="error"
                ).inc()
                raise
                
            finally:
                duration = time.time() - start
                request_latency.labels(
                    agent_type=self.agent_type
                ).observe(duration)
                active_sessions.labels(agent_type=self.agent_type).dec()
        
        return wrapper

# Usage
@MetricsMiddleware(agent_type="research_agent")
def run_research_agent(query: str):
    # Agent logic here
    pass

# Grafana dashboard queries:
# - Request rate: rate(agent_requests_total[5m])
# - P95 latency: histogram_quantile(0.95, agent_request_latency_seconds)
# - Cost per hour: rate(agent_cost_usd_total[1h]) * 3600`
  },
  {
    id: "debugging",
    name: "Debug & Replay",
    icon: <Bug className="w-6 h-6" />,
    description: "Capture full execution state for debugging failures and replaying agent runs with modified inputs.",
    tools: ["LangSmith Playground", "Langfuse Sessions", "Custom replay tools"],
    keyMetrics: [
      "Failure replay rate",
      "Debug session duration",
      "Root cause identification time",
      "Regression detection"
    ],
    codeExample: `import json
from dataclasses import dataclass, asdict
from typing import List, Optional

@dataclass
class ExecutionSnapshot:
    """Full state capture for debugging and replay"""
    run_id: str
    timestamp: str
    input: dict
    steps: List[dict]
    output: Optional[dict]
    error: Optional[str]
    
    # Full context for replay
    system_prompt: str
    model_config: dict
    tool_configs: dict

class DebugCapture:
    """Capture and replay agent executions"""
    
    def __init__(self, storage):
        self.storage = storage
        self.current_run = None
    
    def start_capture(self, run_id: str, input: dict, 
                      system_prompt: str, model_config: dict):
        self.current_run = ExecutionSnapshot(
            run_id=run_id,
            timestamp=datetime.now().isoformat(),
            input=input,
            steps=[],
            output=None,
            error=None,
            system_prompt=system_prompt,
            model_config=model_config,
            tool_configs={}
        )
    
    def capture_step(self, step_type: str, input: dict, 
                     output: dict, latency_ms: float):
        self.current_run.steps.append({
            "step_type": step_type,
            "input": input,
            "output": output,
            "latency_ms": latency_ms,
            "timestamp": datetime.now().isoformat()
        })
    
    def finish_capture(self, output: dict = None, error: str = None):
        self.current_run.output = output
        self.current_run.error = error
        
        # Store for later analysis
        self.storage.save(
            f"runs/{self.current_run.run_id}.json",
            asdict(self.current_run)
        )
    
    def replay(self, run_id: str, modified_input: dict = None) -> dict:
        """Replay a captured run with optional modifications"""
        snapshot = self.storage.load(f"runs/{run_id}.json")
        
        # Reconstruct agent state
        agent = Agent(
            system_prompt=snapshot["system_prompt"],
            model_config=snapshot["model_config"]
        )
        
        # Run with original or modified input
        input_data = modified_input or snapshot["input"]
        
        return agent.run(input_data)
    
    def diff_runs(self, run_id_a: str, run_id_b: str) -> dict:
        """Compare two runs to identify behavioral differences"""
        a = self.storage.load(f"runs/{run_id_a}.json")
        b = self.storage.load(f"runs/{run_id_b}.json")
        
        return {
            "input_diff": diff_dicts(a["input"], b["input"]),
            "output_diff": diff_dicts(a["output"], b["output"]),
            "step_count_diff": len(a["steps"]) - len(b["steps"]),
            "latency_diff_ms": sum(s["latency_ms"] for s in a["steps"]) - 
                              sum(s["latency_ms"] for s in b["steps"])
        }`
  },
  {
    id: "cost-tracking",
    name: "Cost Tracking",
    icon: <Zap className="w-6 h-6" />,
    description: "Track token costs per model, user, and task type. Set budgets and alerts.",
    tools: ["OpenAI Usage API", "Custom cost tracker", "LangSmith Analytics"],
    keyMetrics: [
      "Cost per request",
      "Cost per user/session",
      "Model cost breakdown",
      "Budget utilization",
      "Cost trend"
    ],
    codeExample: `from decimal import Decimal
from datetime import datetime, timedelta

# Token pricing (per 1M tokens, as of 2026)
MODEL_PRICING = {
    "gpt-4o": {"input": Decimal("2.50"), "output": Decimal("10.00")},
    "gpt-4o-mini": {"input": Decimal("0.15"), "output": Decimal("0.60")},
    "claude-3-5-sonnet": {"input": Decimal("3.00"), "output": Decimal("15.00")},
    "claude-3-5-haiku": {"input": Decimal("0.25"), "output": Decimal("1.25")},
    "gemini-2.0-flash": {"input": Decimal("0.075"), "output": Decimal("0.30")},
}

class CostTracker:
    """Track and control agent costs"""
    
    def __init__(self, db, budget_usd: Decimal = None):
        self.db = db
        self.daily_budget = budget_usd
    
    def record_usage(self, user_id: str, model: str,
                     input_tokens: int, output_tokens: int,
                     metadata: dict = None):
        
        pricing = MODEL_PRICING.get(model, {"input": Decimal("5"), "output": Decimal("15")})
        
        cost = (
            (Decimal(input_tokens) / 1_000_000 * pricing["input"]) +
            (Decimal(output_tokens) / 1_000_000 * pricing["output"])
        )
        
        self.db.insert("usage", {
            "user_id": user_id,
            "model": model,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "cost_usd": float(cost),
            "timestamp": datetime.now(),
            **(metadata or {})
        })
        
        return cost
    
    def get_daily_spend(self, user_id: str = None) -> Decimal:
        today = datetime.now().date()
        query = {"timestamp": {"$gte": today}}
        if user_id:
            query["user_id"] = user_id
        
        records = self.db.query("usage", query)
        return sum(Decimal(str(r["cost_usd"])) for r in records)
    
    def check_budget(self, user_id: str) -> dict:
        """Check if user is within budget"""
        spent = self.get_daily_spend(user_id)
        
        return {
            "spent_usd": float(spent),
            "budget_usd": float(self.daily_budget) if self.daily_budget else None,
            "remaining_usd": float(self.daily_budget - spent) if self.daily_budget else None,
            "over_budget": spent > self.daily_budget if self.daily_budget else False,
            "utilization_pct": float(spent / self.daily_budget * 100) if self.daily_budget else 0
        }
    
    def get_cost_breakdown(self, days: int = 7) -> dict:
        """Breakdown costs by model and task type"""
        since = datetime.now() - timedelta(days=days)
        records = self.db.query("usage", {"timestamp": {"$gte": since}})
        
        by_model = {}
        by_task = {}
        
        for r in records:
            model = r["model"]
            task = r.get("task_type", "unknown")
            cost = Decimal(str(r["cost_usd"]))
            
            by_model[model] = by_model.get(model, Decimal(0)) + cost
            by_task[task] = by_task.get(task, Decimal(0)) + cost
        
        return {
            "by_model": {k: float(v) for k, v in by_model.items()},
            "by_task": {k: float(v) for k, v in by_task.items()},
            "total_usd": float(sum(by_model.values()))
        }`
  }
];

const observabilityStack = `
┌────────────────────────────────────────────────────────────┐
│                    Agent Application                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Planning │→│ LLM Call │→│ Tool Use │→│ Response │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │             │          │
└───────┼─────────────┼─────────────┼─────────────┼──────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
  ┌─────────────────────────────────────────────────────┐
  │              OpenTelemetry Collector                 │
  │  (Traces, Logs, Metrics - unified collection)       │
  └──────────────────────┬──────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │LangSmith │   │ Grafana  │   │ Datadog  │
   │Langfuse  │   │Prometheus│   │ Elastic  │
   └──────────┘   └──────────┘   └──────────┘
     Tracing       Metrics         Logs
`;

const alertRules = [
  {
    name: "High Latency",
    condition: "P95 latency > 10s for 5 minutes",
    severity: "warning",
    action: "Page on-call, check LLM provider status"
  },
  {
    name: "Error Spike",
    condition: "Error rate > 5% for 2 minutes",
    severity: "critical",
    action: "Immediate investigation, consider circuit breaker"
  },
  {
    name: "Cost Anomaly",
    condition: "Hourly cost > 2x daily average",
    severity: "warning",
    action: "Check for runaway loops, review heavy users"
  },
  {
    name: "Token Budget Exceeded",
    condition: "Daily tokens > budget threshold",
    severity: "critical",
    action: "Throttle requests, notify stakeholders"
  }
];

export default function AgentObservabilityConcept() {
  const [selectedPillar, setSelectedPillar] = useState<ObservabilityPillar>(observabilityPillars[0]);

  return (
    <ConceptLayout
      conceptId="agent-observability"
      title="Agent Observability"
      description="See everything your agents do: distributed tracing, structured logging, metrics, debugging, and cost tracking"
      icon={<Eye className="w-8 h-8" />}
      concepts={["Distributed Tracing", "Structured Logging", "Metrics", "Debugging", "Cost Tracking"]}
      estimatedTime="40-50 min"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Eye className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Observability is Non-Negotiable</h3>
                <p className="text-muted-foreground">
                  Agents are black boxes without observability. When a user reports "the agent gave a wrong answer," 
                  you need to see exactly what happened—every LLM call, tool invocation, and decision point. 
                  Production agents require the same observability rigor as any distributed system.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-green-500/10">LangSmith</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Langfuse</Badge>
                  <Badge variant="outline" className="bg-orange-500/10">OpenTelemetry</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Prometheus</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Visualization */}
        <ObservabilityViz autoPlay={true} />

        {/* Observability Dashboard Infographic */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Agent Observability Dashboard
          </h3>
          <img 
            src="/images/Agent_Observability_Dashboard.webp" 
            alt="Agent Observability Dashboard: Traces, Metrics, Logs, and Alerts in a unified view" 
            className="w-full rounded-lg shadow-sm border"
            loading="lazy"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            The four pillars of observability: Traces → Metrics → Logs → Alerts
          </p>
        </div>

        <Tabs defaultValue="pillars" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="atomic"><Atom className="w-4 h-4 mr-1" /> ⚛ Atomic</TabsTrigger>
            <TabsTrigger value="pillars">Observability Pillars</TabsTrigger>
            <TabsTrigger value="stack">Full Stack</TabsTrigger>
            <TabsTrigger value="alerts">Alerting</TabsTrigger>
            <TabsTrigger value="implementation">Quick Start</TabsTrigger>
          </TabsList>

          <TabsContent value="atomic" className="space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">⚛ Atomic Deep Dive — Observability Internals</h3>
              <p className="text-muted-foreground">SLI/SLO budgets, trace waterfalls, alert tuning, and structured logging explored interactively.</p>
            </div>
            <SLICalculator />
            <TraceWaterfallSim />
            <AlertThresholdTuner />
            <LogStructureExplorer />
            {/* Challenge Ladder */}
            <div className="mt-10 p-6 rounded-xl border bg-muted/40">
              <h3 className="text-lg font-bold mb-3">🧗 Challenge Ladder</h3>
              <div className="space-y-2 text-sm">
                <div><Badge variant="outline" className="mr-2">Beginner</Badge> Set a 99.5% SLO and find the maximum failed requests allowed for 10,000 total requests without burning the budget.</div>
                <div><Badge variant="outline" className="mr-2">Intermediate</Badge> Click each span in the trace waterfall. Which service consumes the most latency? How would you optimize it?</div>
                <div><Badge variant="outline" className="mr-2">Advanced</Badge> Tune alert thresholds to keep noise ratio below 15% while catching all error-rate spikes above 5%. What window size works best?</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pillars" className="space-y-6">
            {/* Pillar Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {observabilityPillars.map((pillar) => (
                <Card
                  key={pillar.id}
                  className={`cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedPillar.id === pillar.id ? 'border-green-500 bg-green-500/5' : ''
                  }`}
                  onClick={() => setSelectedPillar(pillar)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-green-400">
                      {pillar.icon}
                    </div>
                    <h4 className="font-medium text-xs">{pillar.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pillar Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    {selectedPillar.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedPillar.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPillar.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" /> Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPillar.tools.map((tool, i) => (
                        <Badge key={i} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-green-400" /> Key Metrics
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedPillar.keyMetrics.map((metric, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> Implementation
                  </h4>
                  <CodeBlock language="python">
                    {selectedPillar.codeExample}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stack">
            <Card>
              <CardHeader>
                <CardTitle>Production Observability Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-black/50 p-4 rounded-lg overflow-x-auto font-mono text-green-400">
                  {observabilityStack}
                </pre>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <h4 className="font-medium mb-2">🔍 Tracing Layer</h4>
                    <p className="text-sm text-muted-foreground">
                      LangSmith or Langfuse for LLM-specific tracing with prompt/completion visibility.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-medium mb-2">📊 Metrics Layer</h4>
                    <p className="text-sm text-muted-foreground">
                      Prometheus + Grafana for real-time dashboards and SLA monitoring.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                    <h4 className="font-medium mb-2">📝 Logs Layer</h4>
                    <p className="text-sm text-muted-foreground">
                      Elasticsearch or Loki for searchable structured logs with correlation IDs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Critical Alert Rules</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Essential alerts for production agent monitoring
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertRules.map((rule, i) => (
                    <div key={i} className="p-4 rounded-lg border flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${rule.severity === 'critical' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                        <AlertTriangle className={`w-5 h-5 ${rule.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{rule.name}</h4>
                          <Badge variant={rule.severity === 'critical' ? 'destructive' : 'secondary'}>
                            {rule.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Condition:</strong> {rule.condition}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Action:</strong> {rule.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>🚀 5-Minute Observability Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">Step 1: Add LangSmith/Langfuse</h4>
                    <CodeBlock language="bash">
{`# Install
pip install langsmith  # or langfuse

# Set environment variables
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=your-key

# That's it! All LangChain/LangGraph calls are now traced.`}
                    </CodeBlock>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">Step 2: Add Basic Metrics</h4>
                    <CodeBlock language="python">
{`from prometheus_client import start_http_server, Counter

requests = Counter('agent_requests', 'Agent requests', ['status'])

# Start metrics server
start_http_server(8000)

# Increment in your code
requests.labels(status='success').inc()`}
                    </CodeBlock>
                  </div>
                  <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">Step 3: Structured Logging</h4>
                    <CodeBlock language="python">
{`import structlog
structlog.configure(processors=[structlog.processors.JSONRenderer()])
log = structlog.get_logger()

log.info("agent_call", user_id="123", tokens=500, cost_usd=0.02)`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}









