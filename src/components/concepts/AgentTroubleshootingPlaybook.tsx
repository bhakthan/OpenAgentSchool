import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bug, Warning, Wrench, TreeStructure, FirstAid, Lightning, ArrowRight, CheckCircle, Brain, Clock, Target, Shield, ChartLine, CaretRight, Lightbulb } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/ui/CodeBlock";

interface AgentTroubleshootingPlaybookProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const FAILURE_TAXONOMY = [
  {
    category: "Reasoning Failures",
    severity: "high",
    symptoms: ["Wrong conclusions from correct data", "Circular reasoning loops", "Missing context connections"],
    rootCauses: ["Insufficient context window", "Poor prompt structure", "Model capability mismatch"],
    quickFixes: ["Add chain-of-thought scaffolding", "Increase context budget", "Upgrade model tier"],
    deepFixes: ["Implement reasoning traces", "Add intermediate validation steps", "Deploy ensemble verification"]
  },
  {
    category: "Tool Calling Failures",
    severity: "high",
    symptoms: ["Malformed tool arguments", "Wrong tool selection", "Tool timeout cascades"],
    rootCauses: ["Unclear tool descriptions", "Schema mismatches", "Rate limiting"],
    quickFixes: ["Improve tool docstrings", "Add argument validation", "Implement retry with backoff"],
    deepFixes: ["Tool selection fine-tuning", "Schema versioning", "Circuit breaker patterns"]
  },
  {
    category: "Memory & Context Failures",
    severity: "medium",
    symptoms: ["Forgetting earlier context", "Contradicting previous statements", "Repetitive responses"],
    rootCauses: ["Context window overflow", "Poor summarization", "RAG retrieval misses"],
    quickFixes: ["Implement sliding window", "Add conversation summaries", "Tune retrieval thresholds"],
    deepFixes: ["Hierarchical memory architecture", "Episodic memory systems", "Semantic compression"]
  },
  {
    category: "Hallucination & Confabulation",
    severity: "critical",
    symptoms: ["Fabricated facts", "Non-existent references", "Confident wrong answers"],
    rootCauses: ["Knowledge cutoff gaps", "Overconfident model behavior", "Insufficient grounding"],
    quickFixes: ["Add citation requirements", "Implement confidence thresholds", "RAG grounding"],
    deepFixes: ["Retrieval-augmented verification", "Multi-source cross-validation", "Calibration training"]
  },
  {
    category: "Latency & Performance",
    severity: "medium",
    symptoms: ["Slow response times", "Timeout errors", "User abandonment"],
    rootCauses: ["Sequential tool calls", "Large context payloads", "Cold start overhead"],
    quickFixes: ["Parallel tool execution", "Context pruning", "Connection pooling"],
    deepFixes: ["Speculative execution", "Response streaming", "Edge deployment"]
  },
  {
    category: "Security & Safety Violations",
    severity: "critical",
    symptoms: ["Jailbreak success", "Data leakage", "Unauthorized actions"],
    rootCauses: ["Weak guardrails", "Prompt injection", "Privilege escalation"],
    quickFixes: ["Input sanitization", "Output filtering", "Action scope limits"],
    deepFixes: ["Defense-in-depth layers", "Red teaming automation", "Zero-trust tool access"]
  }
];

const DIAGNOSTIC_TREES = [
  {
    id: "agent-not-responding",
    title: "Agent Not Responding",
    steps: [
      { question: "Is the LLM API reachable?", yes: "Check rate limits & quotas", no: "Check API key & network" },
      { question: "Are tools timing out?", yes: "Implement circuit breakers", no: "Check context size" },
      { question: "Is context window exceeded?", yes: "Implement context compression", no: "Check for infinite loops" },
      { question: "Is there a reasoning loop?", yes: "Add loop detection & max iterations", no: "Enable verbose logging" }
    ]
  },
  {
    id: "wrong-tool-selected",
    title: "Wrong Tool Selected",
    steps: [
      { question: "Are tool descriptions clear?", yes: "Check for ambiguous queries", no: "Improve tool docstrings" },
      { question: "Are there overlapping tool capabilities?", yes: "Add disambiguation logic", no: "Check query reformulation" },
      { question: "Is the model seeing all available tools?", yes: "Check tool selection prompt", no: "Increase tool context budget" },
      { question: "Is tool selection consistent?", yes: "Likely edge case - add to test suite", no: "Consider tool selection fine-tuning" }
    ]
  },
  {
    id: "hallucination-detected",
    title: "Hallucination Detected",
    steps: [
      { question: "Was RAG retrieval triggered?", yes: "Check retrieval quality", no: "Add retrieval for this query type" },
      { question: "Did retrieval return relevant docs?", yes: "Check grounding in response", no: "Tune retrieval thresholds & embeddings" },
      { question: "Was the claim verifiable?", yes: "Add citation extraction", no: "Add confidence calibration" },
      { question: "Is this a knowledge cutoff issue?", yes: "Add fresh data sources", no: "Flag for model evaluation" }
    ]
  }
];

const PRODUCTION_PATTERNS = [
  {
    pattern: "Circuit Breaker",
    useCase: "Prevent cascade failures when downstream services fail",
    implementation: `class CircuitBreaker:
    def __init__(self, failure_threshold=5, reset_timeout=60):
        self.failures = 0
        self.threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self.state = "closed"  # closed, open, half-open
        self.last_failure = None
    
    async def call(self, func, *args, **kwargs):
        if self.state == "open":
            if time.time() - self.last_failure > self.reset_timeout:
                self.state = "half-open"
            else:
                raise CircuitOpenError("Service unavailable")
        
        try:
            result = await func(*args, **kwargs)
            if self.state == "half-open":
                self.state = "closed"
                self.failures = 0
            return result
        except Exception as e:
            self.failures += 1
            self.last_failure = time.time()
            if self.failures >= self.threshold:
                self.state = "open"
            raise`,
    benefits: ["Fail fast under load", "Automatic recovery", "Protects downstream services"]
  },
  {
    pattern: "Retry with Exponential Backoff",
    useCase: "Handle transient failures gracefully",
    implementation: `async def retry_with_backoff(
    func, 
    max_retries=3, 
    base_delay=1.0,
    max_delay=60.0,
    jitter=True
):
    for attempt in range(max_retries):
        try:
            return await func()
        except TransientError as e:
            if attempt == max_retries - 1:
                raise
            
            delay = min(base_delay * (2 ** attempt), max_delay)
            if jitter:
                delay *= (0.5 + random.random())
            
            logger.warning(f"Retry {attempt + 1}/{max_retries} after {delay:.1f}s")
            await asyncio.sleep(delay)`,
    benefits: ["Handles rate limits", "Reduces thundering herd", "Graceful degradation"]
  },
  {
    pattern: "Fallback Chain",
    useCase: "Degrade gracefully when primary approach fails",
    implementation: `async def execute_with_fallback(query: str) -> str:
    strategies = [
        ("primary", lambda: agent.run(query)),
        ("simplified", lambda: agent.run(simplify_query(query))),
        ("cached", lambda: cache.get_similar(query)),
        ("static", lambda: get_static_response(query))
    ]
    
    for name, strategy in strategies:
        try:
            result = await strategy()
            metrics.record(f"fallback.{name}.success")
            return result
        except Exception as e:
            metrics.record(f"fallback.{name}.failure")
            logger.warning(f"{name} failed: {e}")
    
    return "I'm unable to help with that right now. Please try again later."`,
    benefits: ["Always responds", "User experience preserved", "Measurable degradation"]
  },
  {
    pattern: "Bulkhead Isolation",
    useCase: "Isolate failures to prevent total system failure",
    implementation: `class BulkheadExecutor:
    def __init__(self, max_concurrent=10, queue_size=100):
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.queue = asyncio.Queue(maxsize=queue_size)
    
    async def execute(self, func, timeout=30.0):
        try:
            await asyncio.wait_for(
                self.queue.put(func),
                timeout=1.0
            )
        except asyncio.TimeoutError:
            raise BulkheadFullError("Queue capacity exceeded")
        
        async with self.semaphore:
            return await asyncio.wait_for(func(), timeout=timeout)

# Separate bulkheads per service
tool_executor = BulkheadExecutor(max_concurrent=20)
llm_executor = BulkheadExecutor(max_concurrent=5)`,
    benefits: ["Failure isolation", "Resource protection", "Predictable capacity"]
  }
];

const OBSERVABILITY_CHECKLIST = [
  {
    category: "Golden Signals",
    items: [
      { signal: "Latency", metric: "p50, p95, p99 response time", alert: "p99 > 5s for 5 min" },
      { signal: "Error Rate", metric: "% of failed requests", alert: "> 1% for 5 min" },
      { signal: "Throughput", metric: "Requests per second", alert: "< 50% baseline for 10 min" },
      { signal: "Saturation", metric: "Queue depth, connection pool usage", alert: "> 80% capacity" }
    ]
  },
  {
    category: "Agent-Specific Metrics",
    items: [
      { signal: "Tool Success Rate", metric: "% of successful tool calls", alert: "< 95% for 15 min" },
      { signal: "Reasoning Steps", metric: "Avg steps per task", alert: "> 2x baseline" },
      { signal: "Token Usage", metric: "Input/output tokens per request", alert: "Sudden 3x spike" },
      { signal: "Hallucination Rate", metric: "% of ungrounded claims", alert: "> 5% verified" }
    ]
  },
  {
    category: "Business Impact",
    items: [
      { signal: "Task Completion", metric: "% of tasks fully completed", alert: "< 80% for 1 hour" },
      { signal: "User Satisfaction", metric: "CSAT, thumbs up/down ratio", alert: "< 4.0 rating" },
      { signal: "Escalation Rate", metric: "% requiring human intervention", alert: "> 20%" },
      { signal: "Cost per Task", metric: "$ spent per successful task", alert: "> budget threshold" }
    ]
  }
];

const EMERGENCY_RUNBOOK = [
  {
    scenario: "Agent producing harmful outputs",
    severity: "P0 - Critical",
    steps: [
      "Enable kill switch / disable agent endpoint immediately",
      "Capture full request/response logs for forensics",
      "Notify security team and stakeholders",
      "Analyze attack vector (prompt injection? jailbreak?)",
      "Deploy hardened guardrails before re-enabling",
      "Post-incident review within 24 hours"
    ],
    prevention: "Red team testing, layered guardrails, output scanning"
  },
  {
    scenario: "Cost runaway (unexpected spend spike)",
    severity: "P1 - High",
    steps: [
      "Enable rate limiting / usage caps",
      "Identify source (loop? expensive model? large contexts?)",
      "Switch to cheaper model fallback",
      "Review and terminate stuck sessions",
      "Audit recent deployments for cost regressions"
    ],
    prevention: "Usage budgets, cost alerts, model tiering"
  },
  {
    scenario: "Agent stuck in infinite loop",
    severity: "P1 - High",
    steps: [
      "Set max iterations limit (if not present)",
      "Kill affected sessions",
      "Analyze loop trigger condition",
      "Add loop detection (repeated tool calls, circular reasoning)",
      "Deploy with iteration guards"
    ],
    prevention: "Max iteration limits, loop detection, timeout enforcement"
  },
  {
    scenario: "Mass hallucination outbreak",
    severity: "P2 - Medium",
    steps: [
      "Enable stricter grounding requirements",
      "Increase RAG retrieval confidence thresholds",
      "Audit recent knowledge base updates",
      "Check for model API behavior changes",
      "Deploy ensemble verification for critical paths"
    ],
    prevention: "Citation requirements, confidence calibration, fresh data sources"
  }
];

export default function AgentTroubleshootingPlaybook({ onMarkComplete, onNavigateToNext }: AgentTroubleshootingPlaybookProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTree, setExpandedTree] = useState<string | null>("agent-not-responding");

  const tabs = [
    { id: "overview", label: "Overview", icon: <FirstAid className="w-4 h-4" /> },
    { id: "failure-taxonomy", label: "Failure Taxonomy", icon: <Bug className="w-4 h-4" /> },
    { id: "diagnostic-trees", label: "Diagnostic Trees", icon: <TreeStructure className="w-4 h-4" /> },
    { id: "production-patterns", label: "Production Patterns", icon: <Wrench className="w-4 h-4" /> },
    { id: "observability", label: "Observability", icon: <ChartLine className="w-4 h-4" /> },
    { id: "emergency-runbook", label: "Emergency Runbook", icon: <Warning className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FirstAid className="w-6 h-6" />
            Agent Troubleshooting Playbook
          </CardTitle>
          <CardDescription>
            Systematic debugging for production agent failures—from symptom to root cause to fix.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FirstAid className="w-5 h-5 text-red-500" />
                When Agents Break: A Practitioner's Guide
              </CardTitle>
              <CardDescription>
                The difference between a 10-minute fix and a 10-hour outage is systematic debugging.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Real-World Analogy */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Think: Emergency Room Triage
                </h4>
                <p className="text-sm text-foreground">
                  Just as ER doctors follow systematic protocols—vital signs first, then symptoms, then diagnostics—
                  agent debugging requires a structured approach. You don't run an MRI for every headache, 
                  and you don't fine-tune a model for every wrong answer.
                </p>
              </div>

              {/* The 5-Step Protocol */}
              <div>
                <h4 className="font-semibold mb-4">The 5-Step Triage Protocol</h4>
                <div className="grid gap-3">
                  {[
                    { step: 1, title: "Identify Symptoms", desc: "What's the observable behavior? Logs, user reports, metrics anomalies." },
                    { step: 2, title: "Categorize Failure", desc: "Reasoning? Tool? Memory? Security? Use the taxonomy to narrow scope." },
                    { step: 3, title: "Walk Diagnostic Tree", desc: "Follow yes/no questions to isolate root cause systematically." },
                    { step: 4, title: "Apply Quick Fix", desc: "Use proven patterns to restore service fast (circuit breakers, fallbacks)." },
                    { step: 5, title: "Schedule Deep Fix", desc: "Add to backlog: proper solution, test coverage, monitoring." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Failure Categories", value: "6", icon: <Bug className="w-4 h-4" /> },
                  { label: "Diagnostic Trees", value: "3", icon: <TreeStructure className="w-4 h-4" /> },
                  { label: "Production Patterns", value: "4", icon: <Wrench className="w-4 h-4" /> },
                  { label: "Emergency Scenarios", value: "4", icon: <Warning className="w-4 h-4" /> }
                ].map((stat) => (
                  <div key={stat.label} className="p-4 border rounded-lg text-center">
                    <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Failure Taxonomy Tab */}
        <TabsContent value="failure-taxonomy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Agent Failure Taxonomy
              </CardTitle>
              <CardDescription>
                Six categories of failures with symptoms, causes, and proven fixes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {FAILURE_TAXONOMY.map((failure, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold flex items-center gap-2">
                        {failure.category}
                      </h4>
                      <Badge variant={
                        failure.severity === "critical" ? "destructive" :
                        failure.severity === "high" ? "default" : "secondary"
                      }>
                        {failure.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-red-600 dark:text-red-400">Symptoms</h5>
                      <ul className="text-sm space-y-1">
                        {failure.symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Warning className="w-3 h-3 mt-1 text-red-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-orange-600 dark:text-orange-400">Root Causes</h5>
                      <ul className="text-sm space-y-1">
                        {failure.rootCauses.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Target className="w-3 h-3 mt-1 text-orange-500" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-yellow-600 dark:text-yellow-400">Quick Fixes</h5>
                      <ul className="text-sm space-y-1">
                        {failure.quickFixes.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Lightning className="w-3 h-3 mt-1 text-yellow-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-green-600 dark:text-green-400">Deep Fixes</h5>
                      <ul className="text-sm space-y-1">
                        {failure.deepFixes.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Wrench className="w-3 h-3 mt-1 text-green-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagnostic Trees Tab */}
        <TabsContent value="diagnostic-trees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeStructure className="w-5 h-5" />
                Interactive Diagnostic Trees
              </CardTitle>
              <CardDescription>
                Follow yes/no questions to isolate the root cause systematically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {DIAGNOSTIC_TREES.map((tree) => (
                <div key={tree.id} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedTree(expandedTree === tree.id ? null : tree.id)}
                    className="w-full p-4 bg-muted/50 flex items-center justify-between hover:bg-muted transition-colors"
                  >
                    <h4 className="font-semibold">{tree.title}</h4>
                    <CaretRight className={cn(
                      "w-5 h-5 transition-transform",
                      expandedTree === tree.id && "rotate-90"
                    )} />
                  </button>
                  {expandedTree === tree.id && (
                    <div className="p-4 space-y-4">
                      {tree.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-2">{step.question}</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                                <span className="font-medium text-green-700 dark:text-green-300">Yes → </span>
                                {step.yes}
                              </div>
                              <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                                <span className="font-medium text-red-700 dark:text-red-300">No → </span>
                                {step.no}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Production Patterns Tab */}
        <TabsContent value="production-patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Production-Grade Resilience Patterns
              </CardTitle>
              <CardDescription>
                Battle-tested patterns for building fault-tolerant agent systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {PRODUCTION_PATTERNS.map((pattern, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <h4 className="font-semibold">{pattern.pattern}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pattern.useCase}</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <CodeBlock language="python" showLineNumbers>{pattern.implementation}</CodeBlock>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Benefits</h5>
                      <div className="flex flex-wrap gap-2">
                        {pattern.benefits.map((b, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Observability Tab */}
        <TabsContent value="observability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Observability Checklist
              </CardTitle>
              <CardDescription>
                What to monitor, measure, and alert on for production agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {OBSERVABILITY_CHECKLIST.map((category, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-3">{category.category}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Signal</th>
                          <th className="text-left p-2">Metric</th>
                          <th className="text-left p-2">Alert Threshold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 font-medium">{item.signal}</td>
                            <td className="p-2 text-muted-foreground">{item.metric}</td>
                            <td className="p-2">
                              <Badge variant="outline" className="text-xs font-mono">
                                {item.alert}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Runbook Tab */}
        <TabsContent value="emergency-runbook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-red-500" />
                Emergency Runbook
              </CardTitle>
              <CardDescription>
                Step-by-step responses for critical production incidents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {EMERGENCY_RUNBOOK.map((scenario, idx) => (
                <div key={idx} className="border rounded-lg border-red-200 dark:border-red-900 overflow-hidden">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-red-900 dark:text-red-100">{scenario.scenario}</h4>
                      <Badge variant="destructive">{scenario.severity}</Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Response Steps</h5>
                      <ol className="space-y-2">
                        {scenario.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <h5 className="text-sm font-medium text-foreground mb-1">Prevention</h5>
                      <p className="text-sm text-green-700 dark:text-green-300">{scenario.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}









