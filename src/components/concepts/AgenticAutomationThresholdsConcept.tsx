import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightning, Calculator, Repeat, Brain, ArrowRight, Atom, Warning, CheckCircle, Lightbulb, Factory, Code, Users, Clock, ChartLine, TrendUp, Scales } from "@phosphor-icons/react";
import CodeBlock from "@/components/ui/CodeBlock";

interface AgenticAutomationThresholdsConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

/* ─── Static data ──────────────────────────────────────────────── */

const FOUR_TIERS = [
  {
    tier: 1,
    badge: "Foundation",
    title: "The Threshold Collapses",
    subtitle: "Investment model → delegation model",
    color: "blue",
    metaphor: "A broken calculator — the old ROI formula no longer works.",
    shifts: [
      "Left side of the cost inequality destroyed — setup cost ≈ 0",
      "Direction replaces specification — you point, agent executes",
      "Recoverable state replaces projected ROI — cheap to try, cheap to undo",
    ],
    quote: "The threshold doesn't shift — it collapses entirely.",
    practicalExample: {
      label: "One-off migration script",
      before: "Engineer spends 2 hrs writing a Python script to rename 400 files. Traditional ROI: not worth automating for a one-off.",
      after: "Agent prompt: 'Rename all *.log files in /data/ to include today's ISO date prefix.' Done in 90 seconds. Cost: ~$0.02 in tokens.",
      lesson: "When setup cost → 0, frequency of the task stops being the deciding factor."
    }
  },
  {
    tier: 2,
    badge: "Blind Spots",
    title: "The Unmapped Territory",
    subtitle: "Intent replaces procedure",
    color: "teal",
    metaphor: "A filing room no script ever entered — messy, contextual, full of judgment calls.",
    shifts: [
      "The 'boring middle' finally automatable — tasks too complex to script, too simple to hire for",
      "Describe replaces decompose — natural language is the new API",
      "'I'll do it myself' bias made visible — the most expensive sentence in engineering",
    ],
    quote: "The bottleneck was never 'can this be done programmatically?' — it was 'can this be specified precisely?'",
    practicalExample: {
      label: "Code review triage",
      before: "Senior dev spends 45 min/day triaging PRs: reading diffs, checking style, flagging security. Too nuanced for a linter, too tedious to enjoy.",
      after: "Agent instruction: 'Review this PR for security antipatterns, unused imports, and missing error handling. Flag, don't fix.' Triage time → 5 min for human validation.",
      lesson: "The biggest automation surface area is tasks you can describe but never bothered to codify."
    }
  },
  {
    tier: 3,
    badge: "Hidden Costs",
    title: "The Overhead You Never Counted",
    subtitle: "Coordination is the real bottleneck",
    color: "amber",
    metaphor: "A relay station — cables connecting pods, holding state between every handoff.",
    shifts: [
      "Agent eliminates human as coordination medium — no context-switching tax",
      "Chains, not tasks — value is combinatorial across a workflow",
      "Cheap failure changes what's worth attempting — experiment freely",
    ],
    quote: "A 15-minute task actually costs 45 minutes of cognitive overhead.",
    practicalExample: {
      label: "Feature flag rollout",
      before: "Task chain: create flag in LaunchDarkly → update config → write migration → update docs → notify Slack. Each step: 10 min. Coordination overhead: 40 min of context-switching, finding docs, copy-pasting IDs.",
      after: "Agent chain: one prompt triggers all five steps sequentially. Total wall-clock: 3 minutes. No human context-switch between steps.",
      lesson: "The time between tasks exceeds the tasks themselves. Agents eliminate the glue."
    }
  },
  {
    tier: 4,
    badge: "Meta-Level",
    title: "The System Teaches You",
    subtitle: "Automation as a diagnostic for judgment",
    color: "rose",
    metaphor: "A command center whose activity reveals where humans must stand — not by telling you, but by handling everything else.",
    shifts: [
      "Environment stability assumption silently dropped — agents adapt to drift",
      "Instability becomes a runtime parameter, not a disqualifier",
      "Agent reveals the true structure of judgment in any workflow",
    ],
    quote: "What the agent can't do is the map of where you're irreplaceable.",
    practicalExample: {
      label: "Incident response",
      before: "Runbook says: check logs → identify root cause → apply fix → write postmortem. Engineers automate steps 1 and 4 but not 2 and 3 — 'too context-dependent.'",
      after: "Agent handles steps 1, 3 (known fixes), and 4. Step 2 surfaces to human only when the agent hits ambiguity. After 50 incidents, the team now has a clear map: root-cause classification is where human judgment actually lives.",
      lesson: "Using agentic automation as a diagnostic reveals where human judgment is genuinely necessary — and where it was just habit."
    }
  }
];

const MISREADINGS = [
  { title: "Still doing old ROI math", items: ["Asking 'is it worth automating?'", "Treating setup cost as the gating factor", "Skipping one-off tasks automatically"], reality: "Any task is now in-scope regardless of frequency" },
  { title: "Treating 'describe' as insufficient", items: ["Waiting to fully specify before delegating", "Ignoring the boring middle", "Underestimating their own execution bias"], reality: "The largest automation territory requires no full spec" },
  { title: "Counting task time, not overhead", items: ["Missing distributed coordination cost", "Thinking task-by-task, not in chains", "Over-valuing failure avoidance"], reality: "The overhead between tasks exceeds the tasks themselves" },
  { title: "Ignoring the feedback loop", items: ["Not using agent as workflow mirror", "Treating instability as a blocker", "Missing what edge cases reveal"], reality: "What the agent can't do maps where you're irreplaceable" },
];

const DECISION_FRAMEWORK_CODE = `# Before: Traditional automation ROI gate
def should_automate(task):
    setup_cost = estimate_scripting_hours(task) * hourly_rate
    run_cost   = manual_time(task) * frequency_per_year * hourly_rate
    return run_cost > setup_cost  # breakeven in < 1 year

# After: Agentic automation threshold
def should_delegate(task):
    # Setup cost ≈ 0 (natural-language prompt)
    # Failure cost ≈ 0 (recoverable state)
    # Coordination cost eliminated (agent chains steps)
    return can_describe_intent(task)  # That's the only gate now`;

const OVERHEAD_CALC_CODE = `# The real cost of a "15-minute task"
def true_cost_of_task(task_minutes: int) -> dict:
    """Most teams only count task_minutes. The real cost:"""
    context_switch_in  = 8   # minutes to load context
    context_switch_out = 5   # minutes to return to prior work
    tool_finding       = 3   # open right tabs, find credentials
    coordination       = 12  # Slack messages, doc lookups, handoffs
    error_recovery     = 7   # avg rework across attempts

    human_total = (task_minutes + context_switch_in +
                   context_switch_out + tool_finding +
                   coordination + error_recovery)

    agent_total = task_minutes * 0.3  # agent does the task + zero overhead

    return {
        "human_wall_clock": human_total,      # 50 min
        "agent_wall_clock": agent_total,       # 4.5 min
        "hidden_overhead":  human_total - task_minutes,  # 35 min!
        "real_speedup":     f"{human_total / agent_total:.0f}x"
    }

print(true_cost_of_task(15))
# {'human_wall_clock': 50, 'agent_wall_clock': 4.5,
#  'hidden_overhead': 35, 'real_speedup': '11x'}`;

const CHAIN_VALUE_CODE = `# Value is combinatorial: chain of 5 tasks
# Human: each task has overhead → total = Σ(task + overhead)
# Agent: chain runs end-to-end → total = Σ(task) only

def chain_cost_comparison(tasks: list[dict]) -> dict:
    human_overhead_per_task = 25  # avg minutes
    
    human_total = sum(
        t["minutes"] + human_overhead_per_task for t in tasks
    )
    agent_total = sum(t["minutes"] * 0.3 for t in tasks)
    
    return {
        "human_minutes": human_total,
        "agent_minutes": round(agent_total, 1),
        "overhead_eliminated": human_overhead_per_task * len(tasks),
        "chain_speedup": f"{human_total / agent_total:.0f}x"
    }

# Feature flag rollout: 5 steps
tasks = [
    {"name": "Create flag", "minutes": 8},
    {"name": "Update config", "minutes": 5},
    {"name": "Write migration", "minutes": 15},
    {"name": "Update docs", "minutes": 10},
    {"name": "Notify team", "minutes": 3},
]
print(chain_cost_comparison(tasks))
# {'human_minutes': 166, 'agent_minutes': 12.3,
#  'overhead_eliminated': 125, 'chain_speedup': '13x'}`;

/* ─── Atomic Visuals ───────────────────────────────────────────── */

function ThresholdCollapseVisual() {
  const [showAgent, setShowAgent] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setShowAgent(false)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!showAgent ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          Traditional ROI
        </button>
        <button
          onClick={() => setShowAgent(true)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showAgent ? 'bg-teal-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          Agentic Model
        </button>
      </div>

      <div className="relative bg-muted/30 rounded-xl p-6 border overflow-hidden">
        {/* Y axis label */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground font-medium tracking-wider">COST</div>
        {/* X axis label */}
        <div className="text-xs text-muted-foreground font-medium tracking-wider text-center mt-2">TASK FREQUENCY →</div>

        <div className="ml-8 space-y-3">
          {/* Setup cost bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium w-20 text-right text-muted-foreground">Setup</span>
            <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/50 relative">
              <div
                className={`h-full rounded-lg transition-all duration-700 flex items-center px-3 ${showAgent ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300' : 'bg-red-500/30 text-red-700 dark:text-red-300'}`}
                style={{ width: showAgent ? '5%' : '70%' }}
              >
                <span className="text-xs font-bold whitespace-nowrap">{showAgent ? '≈ $0' : 'Hours of scripting'}</span>
              </div>
            </div>
          </div>

          {/* Per-run cost bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium w-20 text-right text-muted-foreground">Per run</span>
            <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/50 relative">
              <div
                className={`h-full rounded-lg transition-all duration-700 flex items-center px-3 ${showAgent ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300' : 'bg-amber-500/30 text-amber-700 dark:text-amber-300'}`}
                style={{ width: showAgent ? '8%' : '40%' }}
              >
                <span className="text-xs font-bold whitespace-nowrap">{showAgent ? '$0.01-0.50' : 'Human time'}</span>
              </div>
            </div>
          </div>

          {/* Failure cost bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium w-20 text-right text-muted-foreground">Failure</span>
            <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/50 relative">
              <div
                className={`h-full rounded-lg transition-all duration-700 flex items-center px-3 ${showAgent ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300' : 'bg-orange-500/30 text-orange-700 dark:text-orange-300'}`}
                style={{ width: showAgent ? '10%' : '55%' }}
              >
                <span className="text-xs font-bold whitespace-nowrap">{showAgent ? 'Recoverable' : 'Rework + lost time'}</span>
              </div>
            </div>
          </div>

          {/* Breakeven threshold */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium w-20 text-right text-muted-foreground">Breakeven</span>
            <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/50 relative">
              <div
                className={`h-full rounded-lg transition-all duration-700 flex items-center px-3 ${showAgent ? 'bg-teal-500/30 text-teal-700 dark:text-teal-300' : 'bg-purple-500/30 text-purple-700 dark:text-purple-300'}`}
                style={{ width: showAgent ? '3%' : '60%' }}
              >
                <span className="text-xs font-bold whitespace-nowrap">{showAgent ? '1st run' : '10-50 runs'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground italic text-center">
        {showAgent
          ? "When every bar collapses, frequency stops being the gate. Any task is in-scope."
          : "Traditional model: high setup cost means only high-frequency tasks pass the ROI gate."}
      </p>
    </div>
  );
}

function OverheadIcebergVisual() {
  return (
    <div className="relative bg-muted/30 rounded-xl p-6 border">
      <h4 className="text-sm font-semibold mb-4 text-center">The 15-Minute Task Iceberg</h4>

      {/* Visible portion */}
      <div className="mx-auto max-w-md">
        <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-t-xl p-3 text-center relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">▲ Visible</div>
          <span className="text-lg font-bold text-blue-700 dark:text-blue-300">15 min</span>
          <p className="text-xs text-blue-600 dark:text-blue-400">The actual task</p>
        </div>

        {/* Waterline */}
        <div className="border-t-2 border-dashed border-blue-400/50 relative">
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[10px] text-blue-400 bg-background px-1">~ waterline ~</span>
        </div>

        {/* Hidden portions */}
        <div className="bg-red-500/10 border-2 border-red-500/20 border-t-0 p-3 space-y-2">
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">▼ Hidden overhead</div>
          {[
            { label: "Context switch in", min: 8 },
            { label: "Tool/doc lookup", min: 3 },
            { label: "Coordination (Slack, docs)", min: 12 },
            { label: "Context switch out", min: 5 },
            { label: "Error recovery (avg)", min: 7 },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-xs text-red-600 dark:text-red-400">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full bg-red-500/30" style={{ width: `${item.min * 4}px` }} />
                <span className="text-xs font-mono text-red-700 dark:text-red-300">{item.min}m</span>
              </div>
            </div>
          ))}
          <div className="border-t border-red-500/20 pt-2 flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 dark:text-red-300">Hidden total</span>
            <span className="text-sm font-bold text-red-700 dark:text-red-300">35 min</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground italic text-center mt-8">
        Real cost: 50 min. Agents eliminate the 35 min below the waterline.
      </p>
    </div>
  );
}

function AutomationSpectrumVisual() {
  const zones = [
    { label: "Scripted", range: "Deterministic", color: "bg-gray-400", textColor: "text-gray-700 dark:text-gray-300", desc: "If/else, cron jobs, regex", pct: 15 },
    { label: "The Boring Middle", range: "Describable", color: "bg-teal-500", textColor: "text-teal-700 dark:text-teal-300", desc: "Too nuanced for scripts, too simple for a hire", pct: 55, highlight: true },
    { label: "Human Judgment", range: "Contextual", color: "bg-purple-500", textColor: "text-purple-700 dark:text-purple-300", desc: "Ambiguity, politics, novel situations", pct: 30 },
  ];

  return (
    <div className="bg-muted/30 rounded-xl p-6 border space-y-4">
      <h4 className="text-sm font-semibold text-center">The Automation Spectrum — Where Agents Unlock New Territory</h4>

      <div className="flex rounded-lg overflow-hidden h-12">
        {zones.map((z) => (
          <div
            key={z.label}
            className={`${z.color} ${z.highlight ? 'ring-2 ring-teal-400 ring-inset animate-pulse' : 'opacity-60'} flex items-center justify-center transition-all`}
            style={{ width: `${z.pct}%` }}
          >
            <span className="text-xs font-bold text-white drop-shadow-sm">{z.pct}%</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {zones.map((z) => (
          <div key={z.label} className={`text-center p-2 rounded-lg ${z.highlight ? 'bg-teal-500/10 border border-teal-500/30' : ''}`}>
            <div className={`text-sm font-semibold ${z.textColor}`}>{z.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{z.desc}</div>
            {z.highlight && (
              <Badge variant="secondary" className="mt-2 text-[10px]">NEW: Agents unlock this</Badge>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground italic text-center">
        Traditional automation covers ~15% of work. Agents unlock the 55% "boring middle" — tasks that are describable but not scriptable.
      </p>
    </div>
  );
}

function ChainMultiplierVisual() {
  const steps = [
    { name: "Create flag", time: 8, icon: "🏁" },
    { name: "Update config", time: 5, icon: "⚙️" },
    { name: "Write migration", time: 15, icon: "📝" },
    { name: "Update docs", time: 10, icon: "📖" },
    { name: "Notify team", time: 3, icon: "📢" },
  ];
  const overheadPerStep = 25;
  const humanTotal = steps.reduce((sum, s) => sum + s.time + overheadPerStep, 0);
  const agentTotal = steps.reduce((sum, s) => sum + Math.ceil(s.time * 0.3), 0);

  return (
    <div className="bg-muted/30 rounded-xl p-6 border space-y-4">
      <h4 className="text-sm font-semibold text-center">Chain Multiplier: Feature Flag Rollout (5 steps)</h4>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={step.name} className="flex items-center gap-2">
            <span className="text-lg">{step.icon}</span>
            <span className="text-xs w-28 font-medium">{step.name}</span>

            {/* Human bar */}
            <div className="flex-1 flex items-center gap-1">
              <div className="h-5 rounded bg-blue-500/30" style={{ width: `${step.time * 2}px` }} />
              <div className="h-5 rounded bg-red-500/20 border border-dashed border-red-500/30" style={{ width: `${overheadPerStep * 1.5}px` }} />
              <span className="text-[10px] text-muted-foreground">{step.time + overheadPerStep}m</span>
            </div>

            {i < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500/30" /> Task time</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500/20 border border-dashed border-red-500/30" /> Overhead</div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
        <div className="text-center p-3 rounded-lg bg-red-500/10">
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">{humanTotal} min</div>
          <div className="text-xs text-muted-foreground">Human (task + overhead)</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-teal-500/10">
          <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">{agentTotal} min</div>
          <div className="text-xs text-muted-foreground">Agent chain (zero overhead)</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">{Math.round(humanTotal / agentTotal)}x faster</Badge>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */

export default function AgenticAutomationThresholdsConcept({
  onMarkComplete,
  onNavigateToNext,
}: AgenticAutomationThresholdsConceptProps) {
  const [activeTab, setActiveTab] = useState("atomic");

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Lightning className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold">Agentic Automation Thresholds</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Why the question "is this worth automating?" is now the wrong question — and the four structural shifts that change what's in-scope.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="atomic" className="flex items-center gap-1.5">
            <Atom className="w-4 h-4" /> Atomic
          </TabsTrigger>
          <TabsTrigger value="main" className="flex items-center gap-1.5">
            <ChartLine className="w-4 h-4" /> Deep Dive
          </TabsTrigger>
          <TabsTrigger value="challenge" className="flex items-center gap-1.5">
            <Scales className="w-4 h-4" /> Challenges
          </TabsTrigger>
        </TabsList>

        {/* ── ATOMIC TAB ────────────────────────────────────── */}
        <TabsContent value="atomic" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-500" />
                The Old Calculator Is Broken
              </CardTitle>
              <CardDescription>
                Traditional automation uses ROI math: setup cost vs. time saved × frequency. When agents make setup cost ≈ 0, that equation collapses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThresholdCollapseVisual />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="w-5 h-5 text-teal-500" />
                The Boring Middle Is Now Open
              </CardTitle>
              <CardDescription>
                55% of work sits in a zone too nuanced for scripts but too simple for a dedicated hire. Agents unlock it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationSpectrumVisual />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                The Iceberg: Hidden Overhead
              </CardTitle>
              <CardDescription>
                You think the task takes 15 minutes. It actually costs 50 — the rest is invisible context-switching and coordination.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OverheadIcebergVisual />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-rose-500" />
                Chain Multiplier Effect
              </CardTitle>
              <CardDescription>
                A 5-step workflow doesn't save 5× — it saves 13× because overhead compounds at every handoff.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChainMultiplierVisual />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── DEEP DIVE TAB ─────────────────────────────────── */}
        <TabsContent value="main" className="space-y-6 mt-6">
          {/* The Four Tiers */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">The Four Threshold Shifts</h2>
            <p className="text-sm text-muted-foreground">
              Each tier reveals a structural change in what's worth delegating to agents — and a corresponding human misreading that keeps teams stuck.
            </p>

            {FOUR_TIERS.map((tier) => (
              <Card key={tier.tier} className={`border-l-4 border-l-${tier.color}-500`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">Tier {tier.tier}</Badge>
                    <Badge className={`bg-${tier.color}-500/20 text-${tier.color}-700 dark:text-${tier.color}-300 border-0`}>{tier.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tier.title}</CardTitle>
                  <CardDescription className="italic">{tier.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <Lightning className="w-3.5 h-3.5" /> Structural Shifts
                      </h4>
                      <ul className="space-y-1.5">
                        {tier.shifts.map((s, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 border space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-1">
                        <Factory className="w-3.5 h-3.5" /> Practical: {tier.practicalExample.label}
                      </h4>
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="font-semibold text-red-600 dark:text-red-400">Before: </span>
                          <span className="text-muted-foreground">{tier.practicalExample.before}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-teal-600 dark:text-teal-400">After: </span>
                          <span className="text-muted-foreground">{tier.practicalExample.after}</span>
                        </div>
                        <div className="pt-1 border-t border-muted">
                          <span className="font-semibold text-amber-600 dark:text-amber-400">Lesson: </span>
                          <span className="text-muted-foreground">{tier.practicalExample.lesson}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-muted-foreground/30 pl-3 text-sm italic text-muted-foreground">
                    "{tier.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Four Misreadings */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Warning className="w-5 h-5 text-amber-500" />
              The Four Misreadings
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {MISREADINGS.map((m, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{m.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-3">
                      {m.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <Warning className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-teal-500/10 rounded-lg p-2 text-xs">
                      <span className="font-semibold text-teal-700 dark:text-teal-300">Reality: </span>
                      <span className="text-muted-foreground">{m.reality}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500" />
              Code: The New Decision Framework
            </h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Before vs. After: The Automation Gate</CardTitle>
                <CardDescription>The function signature that changes everything</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="python">{DECISION_FRAMEWORK_CODE}</CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quantifying Hidden Overhead</CardTitle>
                <CardDescription>Why a "15-minute task" actually costs 50 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="python">{OVERHEAD_CALC_CODE}</CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">The Chain Multiplier</CardTitle>
                <CardDescription>Value grows combinatorially when agents chain steps</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="python">{CHAIN_VALUE_CODE}</CodeBlock>
              </CardContent>
            </Card>
          </div>

          {/* The Right Sequence */}
          <Card className="bg-teal-500/5 border-teal-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                <Lightbulb className="w-5 h-5" />
                The Right Sequence — Don't Skip Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "Drop the ROI gate",
                  "Describe, don't decompose",
                  "Count the coordination, not the task",
                  "Read the edges as your map"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge className="bg-teal-600 text-white">{step}</Badge>
                    {i < 3 && <ArrowRight className="w-4 h-4 text-teal-500" />}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Stop asking "is this worth automating?" Start asking "what's my direction?" — then delegate.
                The old calculator is broken. The new one has no setup cost, no stability requirement, and a cheap failure branch.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── CHALLENGES TAB ────────────────────────────────── */}
        <TabsContent value="challenge" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Challenge Ladder</h2>

            {/* Beginner */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-0 w-fit">Beginner</Badge>
                <CardTitle className="text-base">Audit Your Automation Blind Spots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  List 5 tasks you do weekly that you've never considered automating. For each one, answer:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>Can I describe the intent in one sentence?</li>
                  <li>Is the reason I haven't automated it: "too complex to script" or "not frequent enough"?</li>
                  <li>What would the agent prompt look like?</li>
                </ol>
                <div className="bg-green-500/10 rounded-lg p-3 text-xs">
                  <span className="font-semibold text-green-700 dark:text-green-300">Success criteria: </span>
                  <span className="text-muted-foreground">At least 3 of your 5 tasks fall in the "boring middle" — describable but never scripted.</span>
                </div>
              </CardContent>
            </Card>

            {/* Intermediate */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-0 w-fit">Intermediate</Badge>
                <CardTitle className="text-base">Map Your Overhead Iceberg</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Pick one task you do regularly. Time yourself and track every minute:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>How long to load context (open files, read docs, find credentials)?</li>
                  <li>How long on the actual task?</li>
                  <li>How long on coordination (Slack, email, handoffs)?</li>
                  <li>How long to return to your previous work?</li>
                </ol>
                <div className="bg-amber-500/10 rounded-lg p-3 text-xs">
                  <span className="font-semibold text-amber-700 dark:text-amber-300">Expected finding: </span>
                  <span className="text-muted-foreground">Hidden overhead is 2-3× the task itself. Calculate your "real speedup" using the formula above.</span>
                </div>
              </CardContent>
            </Card>

            {/* Advanced */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <Badge className="bg-red-500/20 text-red-700 dark:text-red-300 border-0 w-fit">Advanced</Badge>
                <CardTitle className="text-base">Run the Diagnostic Loop</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Delegate an entire workflow to an agent (e.g., PR review → deploy → notify). Track:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>Where does the agent succeed without intervention?</li>
                  <li>Where does it pause or fail? What kind of ambiguity caused it?</li>
                  <li>After 10 runs, what pattern emerges in the failure points?</li>
                </ol>
                <div className="bg-red-500/10 rounded-lg p-3 text-xs">
                  <span className="font-semibold text-red-700 dark:text-red-300">Meta-insight: </span>
                  <span className="text-muted-foreground">The agent's failure map IS your judgment map. The places it can't handle are where your expertise genuinely lives — everything else was just habit.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {onMarkComplete && (
            <div className="flex justify-center pt-4">
              <button
                onClick={onMarkComplete}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mark Concept Complete
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
