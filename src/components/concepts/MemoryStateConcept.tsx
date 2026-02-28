import { lazy, Suspense } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "@/components/references/ReferenceSection"
import { Brain, ClockCounterClockwise, Database, BookOpen } from "@phosphor-icons/react"
import { conceptSurfaceSoft } from "./conceptStyles"

const MermaidDiagram = lazy(() => import("@/components/ui/MermaidDiagram"))

const Mermaid = ({ chart, className = "" }: { chart: string; className?: string }) => (
  <Suspense fallback={<div className="animate-pulse h-32 rounded bg-muted" />}>
    <MermaidDiagram chart={chart} className={className} />
  </Suspense>
)

/* ─── Mermaid chart definitions ─── */

const CHART_STATELESS_VS_STATEFUL = `graph LR
    subgraph Stateless["❌ Stateless: No Memory"]
        direction TB
        S1["Msg 1: Edit file X"]
        S2["Msg 2: Now test it"]
        S3["🤷 Agent: Test what?"]
        S1 -.-> S2 -.-> S3
    end
    subgraph Stateful["✅ Stateful: With Memory"]
        direction TB
        M1["Msg 1: Edit file X"]
        M2["💾 Saves: edited file X"]
        M3["Msg 2: Now test it"]
        M4["✅ Agent: Testing file X..."]
        M1 --> M2 --> M3 --> M4
    end

    style S3 fill:#ef4444,stroke:#dc2626,color:#fff
    style M4 fill:#22c55e,stroke:#16a34a,color:#fff
    style M2 fill:#3b82f6,stroke:#2563eb,color:#fff`

const CHART_MEMORY_LAYERS = `graph TD
    subgraph Short["💬 Short-Term Memory"]
        ST["Conversation messages\nin the context window\n⏱ This session only"]
    end
    subgraph Long["🗄️ Long-Term Memory"]
        LT["Facts and preferences\nstored in a database\n⏱ Persists forever"]
    end
    subgraph Episodic["📖 Episodic Memory"]
        EP["Records of past tasks\nwhat worked, what failed\n⏱ Persists forever"]
    end

    Short --> Long --> Episodic

    style Short fill:#3b82f6,stroke:#2563eb,color:#fff
    style Long fill:#22c55e,stroke:#16a34a,color:#fff
    style Episodic fill:#8b5cf6,stroke:#7c3aed,color:#fff`

const CHART_STATE_LIFECYCLE = `graph TD
    Task["📋 New Task Arrives"]
    Init["Initialize State\ngoal · plan · step = 1"]
    Execute["⚡ Execute Current Step"]
    Update["📝 Update State\nresults · errors · step++"]
    Check{"All steps\ndone?"}
    Save["💾 Save important info\nto long-term memory"]
    Done["✅ Task Complete"]

    Task --> Init --> Execute --> Update --> Check
    Check -- "Not yet" --> Execute
    Check -- "Yes" --> Save --> Done

    style Task fill:#3b82f6,stroke:#2563eb,color:#fff
    style Done fill:#22c55e,stroke:#16a34a,color:#fff
    style Check fill:#f59e0b,stroke:#d97706,color:#fff`

interface MemoryStateConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function MemoryStateConcept({ onMarkComplete, onNavigateToNext }: MemoryStateConceptProps) {
  const tabs = [
    {
      id: 'why-memory',
      title: 'Why Memory Matters',
      description: 'Understand why agents forget and why that is a problem',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                The Memory Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Every time you start a new conversation with an LLM, it has <strong>no memory</strong> of
                anything you've said before. Each request is processed in isolation. For a single question,
                that's fine—but agents need to work across many steps and even many sessions.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">Without Memory, Agents Can't...</h4>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Remember what happened in step 1 when they reach step 5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Learn from past mistakes or user preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Continue a task that was paused yesterday</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Maintain a consistent personality or knowledge base over time</span>
                  </li>
                </ul>
              </div>

              <div className={conceptSurfaceSoft("p-4 border border-blue-200/60 dark:border-blue-500/40")}>
                <h4 className="font-semibold mb-2">💡 Key Insight</h4>
                <p className="text-lg">
                  "Memory" in AI agents isn't like human memory—it's <strong>information management</strong>.
                  You decide what to save, how to store it, and when to bring it back into the
                  model's context window.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">Stateless vs Stateful — Why It Matters</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Compare these two scenarios side-by-side:
                </p>
                <Mermaid chart={CHART_STATELESS_VS_STATEFUL} />
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'types',
      title: 'Types of Memory',
      description: 'Short-term, long-term, and episodic memory explained simply',
      icon: <ClockCounterClockwise className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Three Types of Agent Memory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Memory Layers at a Glance</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Each layer builds on the one above it — master short-term first, then add the others:
                </p>
                <Mermaid chart={CHART_MEMORY_LAYERS} />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    name: "Short-Term (Working) Memory",
                    badge: "Within one conversation",
                    color: "border-blue-200 dark:border-blue-800",
                    what: "The conversation history (messages) inside the current context window.",
                    how: "Automatically handled by including previous messages in each API call.",
                    limit: "Limited by the model's context window. Once full, old messages must be dropped or summarized.",
                    example: "A coding agent remembering the file you asked it to edit 3 messages ago.",
                  },
                  {
                    name: "Long-Term Memory",
                    badge: "Across conversations",
                    color: "border-green-200 dark:border-green-800",
                    what: "Facts, preferences, and knowledge stored in an external database.",
                    how: "Your code saves important information after each conversation and loads relevant parts into future ones.",
                    limit: "Requires engineering—you need a database, retrieval logic, and a strategy for what to remember.",
                    example: "Remembering that a user prefers Python over JavaScript, weeks after they mentioned it.",
                  },
                  {
                    name: "Episodic Memory",
                    badge: "Past experiences",
                    color: "border-purple-200 dark:border-purple-800",
                    what: "Records of past tasks the agent completed—what it tried, what worked, what failed.",
                    how: "Log each task's plan, actions, and outcomes. Retrieve relevant episodes when facing a similar task.",
                    limit: "Most advanced type; few production systems implement it fully today.",
                    example: "An agent recalling that last time it deployed to staging, it needed to clear the cache first.",
                  },
                ].map((mem) => (
                  <div key={mem.name} className={`border ${mem.color} rounded-lg p-5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-lg">{mem.name}</h4>
                      <Badge variant="outline">{mem.badge}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="font-medium text-foreground">What it is:</p>
                        <p className="text-muted-foreground">{mem.what}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">How it works:</p>
                        <p className="text-muted-foreground">{mem.how}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Limitations:</p>
                        <p className="text-muted-foreground">{mem.limit}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Example:</p>
                        <p className="text-muted-foreground italic">{mem.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'state',
      title: 'Managing State',
      description: 'How agents keep track of what they are doing right now',
      icon: <Database className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                State: The Agent's Scratchpad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>State</strong> is everything the agent knows <em>right now</em> about the task
                it's working on: what step it's on, what it's already done, and what it still needs
                to do. Think of it as the agent's scratchpad.
              </p>

              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold mb-3">Common State Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Task goal", desc: "What the agent is trying to accomplish" },
                    { label: "Current step", desc: "Where the agent is in a multi-step plan" },
                    { label: "Accumulated results", desc: "Outputs from previous tool calls" },
                    { label: "Error log", desc: "What went wrong so the agent doesn't repeat mistakes" },
                    { label: "User context", desc: "Who is asking and what permissions they have" },
                    { label: "Decision history", desc: "Why the agent chose each action" },
                  ].map((item) => (
                    <div key={item.label} className={conceptSurfaceSoft("p-3")}>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">The State Lifecycle</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  State flows through a predictable cycle during every task:
                </p>
                <Mermaid chart={CHART_STATE_LIFECYCLE} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory vs State: A Quick Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left py-2 pr-4"></th>
                      <th className="text-left py-2 pr-4">Memory</th>
                      <th className="text-left py-2">State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    <tr>
                      <td className="py-2 pr-4 font-medium">Scope</td>
                      <td className="py-2 pr-4">Across tasks & sessions</td>
                      <td className="py-2">Within one task</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Lifespan</td>
                      <td className="py-2 pr-4">Persistent (stored in DB)</td>
                      <td className="py-2">Temporary (lives in RAM or context)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Purpose</td>
                      <td className="py-2 pr-4">Remember past experiences</td>
                      <td className="py-2">Track current progress</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Analogy</td>
                      <td className="py-2 pr-4">A notebook on a shelf</td>
                      <td className="py-2">Sticky notes on your desk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'references',
      title: 'References',
      description: 'Further reading on agent memory and state management',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <ReferenceSection
          references={[
            {
              title: "LangChain – Memory Overview",
              url: "https://python.langchain.com/docs/concepts/memory/",
              description: "How LangChain implements different memory types for conversational agents."
            },
            {
              title: "LangGraph – State Management",
              url: "https://langchain-ai.github.io/langgraph/concepts/low_level/#state",
              description: "LangGraph's approach to managing state in multi-step agent workflows."
            },
            {
              title: "Lilian Weng – LLM Powered Autonomous Agents",
              url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
              description: "Influential blog post covering memory, planning, and tool use in LLM agents."
            },
          ]}
        />
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="memory-state"
      title="Memory & State"
      description="Agents forget everything between requests—learn how to give them short-term, long-term, and task memory."
      tabs={tabs}
      nextConcept={{
        id: 'agent-architecture',
        title: 'Agent Architecture & Lifecycle',
        description: 'See how perception, reasoning, memory, and action fit together'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
