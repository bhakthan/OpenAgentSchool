import { lazy, Suspense } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "@/components/references/ReferenceSection"
import { Wrench, Code, ArrowRight, Lightning } from "@phosphor-icons/react"
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles"

const MermaidDiagram = lazy(() => import("@/components/ui/MermaidDiagram"))

const Mermaid = ({ chart, className = "" }: { chart: string; className?: string }) => (
  <Suspense fallback={<div className="animate-pulse h-32 rounded bg-muted" />}>
    <MermaidDiagram chart={chart} className={className} />
  </Suspense>
)

/* ─── Mermaid chart definitions ─── */

const CHART_CHATBOT_VS_AGENT = `graph LR
    subgraph Chatbot["❌ Chatbot: Text Only"]
        direction TB
        C1["User asks a question"]
        C2["🧠 LLM generates text\nfrom memory only"]
        C3["⚠️ May be wrong\nor outdated"]
        C1 --> C2 --> C3
    end
    subgraph Agent["✅ Agent: Text + Tools"]
        direction TB
        A1["User asks a question"]
        A2["🧠 LLM picks a tool"]
        A3["🔧 Tool fetches real data"]
        A4["✅ LLM answers\nwith verified info"]
        A1 --> A2 --> A3 --> A4
    end

    style C3 fill:#ef4444,stroke:#dc2626,color:#fff
    style A4 fill:#22c55e,stroke:#16a34a,color:#fff`

const CHART_FUNCTION_CALLING_CYCLE = `sequenceDiagram
    participant U as 👤 User
    participant A as 💻 Your App
    participant L as 🧠 LLM
    participant T as 🔧 Tool / API

    U->>A: "What's the weather in Paris?"
    A->>L: Prompt + list of available tools
    Note over L: Model decides it needs\nthe get_weather tool
    L->>A: tool_call: get_weather(city="Paris")
    A->>T: Execute get_weather("Paris")
    T->>A: {temp: "18\u00b0C", sky: "partly cloudy"}
    A->>L: Here's the tool result
    L->>A: "It's 18\u00b0C and partly cloudy in Paris."
    A->>U: Display final answer`

const CHART_TOOL_TAXONOMY = `graph TD
    Tools["Agent Tool Types"]
    Info["🔍 Information\nWeb search · DB query\nFile read"]
    Action["⚡ Action\nSend email · Create file\nDeploy code"]
    Compute["💻 Compute\nRun code · Math\nData transform"]
    Create["🎨 Creative\nGenerate image\nCreate chart"]

    Tools --> Info
    Tools --> Action
    Tools --> Compute
    Tools --> Create

    style Tools fill:#3b82f6,stroke:#2563eb,color:#fff
    style Info fill:#22c55e,stroke:#16a34a,color:#fff
    style Action fill:#f59e0b,stroke:#d97706,color:#fff
    style Compute fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Create fill:#ec4899,stroke:#db2777,color:#fff`

interface ToolUseFunctionCallingConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function ToolUseFunctionCallingConcept({ onMarkComplete, onNavigateToNext }: ToolUseFunctionCallingConceptProps) {
  const tabs = [
    {
      id: 'why-tools',
      title: 'Why Agents Need Tools',
      description: 'Understand why LLMs need tools to move from chat to action',
      icon: <Wrench className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                From Chat to Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                An LLM on its own can only <strong>generate text</strong>. It can't check the weather,
                send an email, or look something up in a database. <strong>Tool use</strong> (also called
                <em> function calling</em>) is what turns a chatbot into an agent—it lets the model
                ask the outside world to do things.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">The Key Idea</h4>
                <p className="text-lg">
                  You give the model a menu of <strong>tools</strong> it can use. When the model decides
                  it needs one, it outputs a structured request (like JSON). Your code runs the tool and
                  sends the result back. The model then uses that result to continue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  { step: "1", title: "Describe tools", desc: "Tell the model what tools exist and what parameters they accept." },
                  { step: "2", title: "Model picks a tool", desc: "The model decides which tool to call and fills in the parameters." },
                  { step: "3", title: "Run & return", desc: "Your code executes the tool and sends the result back for the model to use." },
                ].map((s) => (
                  <div key={s.step} className={conceptSurfaceSoft("p-4 text-center")}>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2 font-bold">{s.step}</div>
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chatbot vs Agent — The Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Tools are the boundary between a chatbot that <em>talks</em> and an agent that <em>acts</em>:
              </p>
              <Mermaid chart={CHART_CHATBOT_VS_AGENT} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Without Tools vs With Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">❌ Without Tools</h4>
                  <p className="text-sm italic text-muted-foreground mb-2">"What's the weather in Paris?"</p>
                  <p className="text-lg">"I don't have real-time access to weather data, but Paris in spring is typically..."</p>
                  <Badge variant="outline" className="mt-2">Guessing / Stale info</Badge>
                </div>
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">✅ With Tools</h4>
                  <p className="text-sm italic text-muted-foreground mb-2">"What's the weather in Paris?"</p>
                  <p className="text-lg">"Let me check... It's currently 18°C and partly cloudy in Paris."</p>
                  <Badge variant="outline" className="mt-2">Real data from weather API</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'how-it-works',
      title: 'How Function Calling Works',
      description: 'See the request–response cycle that powers tool use',
      icon: <Code className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                The Function Calling Cycle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Here's what happens under the hood when an agent uses a tool:
              </p>

              <div className="space-y-3">
                {[
                  { label: "You → Model", color: "bg-blue-500", text: "Send a prompt plus a list of available tools (as JSON schemas)." },
                  { label: "Model → You", color: "bg-purple-500", text: "Model replies with a tool_call—the tool name and arguments it wants to use." },
                  { label: "You → Tool", color: "bg-amber-500", text: "Your code runs the actual function (API call, DB query, etc.)." },
                  { label: "Tool → You → Model", color: "bg-green-500", text: "You send the tool's result back to the model as a new message." },
                  { label: "Model → User", color: "bg-emerald-500", text: "Model uses the result to form a final, informed answer." },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full ${step.color} mt-2 shrink-0`}></span>
                    <div>
                      <span className="font-semibold text-sm">{step.label}:</span>
                      <span className="text-lg ml-1">{step.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={conceptSurfaceSoft("p-4 mt-4")}>
                <h4 className="font-semibold mb-2">Example Tool Definition (Simplified)</h4>
                <pre className={conceptCodeBlock("p-4")}>
{`{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "The city name, e.g. 'Paris'"
      }
    },
    "required": ["city"]
  }
}`}
                </pre>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">The Full Cycle (Sequence Diagram)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Watch data flow left-to-right through each participant — this is exactly what happens in production:
                </p>
                <Mermaid chart={CHART_FUNCTION_CALLING_CYCLE} />
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'common-tools',
      title: 'Common Tool Types',
      description: 'Real-world examples of tools agents use every day',
      icon: <ArrowRight className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tools You'll See in the Wild</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Tools fall into four broad categories. Most agents use a mix:
              </p>
              <Mermaid chart={CHART_TOOL_TAXONOMY} className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Web Search", emoji: "🔍", desc: "Look up current information on the internet", example: "search('latest AI news')" },
                  { name: "Code Execution", emoji: "💻", desc: "Run Python or JavaScript to compute answers", example: "run_code('print(2**10)')" },
                  { name: "Database Query", emoji: "🗄️", desc: "Read or write data in a database", example: "query_db('SELECT * FROM users LIMIT 5')" },
                  { name: "File Operations", emoji: "📁", desc: "Read, write, or search files on disk", example: "read_file('/docs/readme.md')" },
                  { name: "API Calls", emoji: "🌐", desc: "Call external services (email, calendar, CRM)", example: "send_email(to='...', body='...')" },
                  { name: "Image Generation", emoji: "🎨", desc: "Create images from text descriptions", example: "generate_image('a sunset over mountains')" },
                ].map((tool) => (
                  <div key={tool.name} className={conceptSurfaceSoft("p-4")}>
                    <h4 className="font-semibold">{tool.emoji} {tool.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
                    <code className="text-xs font-mono text-muted-foreground mt-2 block">{tool.example}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MCP: A Standard for Tool Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg leading-relaxed">
                The <strong>Model Context Protocol (MCP)</strong> is an emerging open standard that lets
                any agent discover and use tools from any MCP server—like USB for AI tools.
                Instead of building custom integrations for each tool, agents can connect to
                MCP servers that expose tools in a standard format.
              </p>
              <p className="text-sm text-muted-foreground">
                You'll learn more about MCP in the dedicated MCP concept page. For now, just know
                that the industry is moving toward standard ways to share tools across agents.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'references',
      title: 'References',
      description: 'Further reading on tool use and function calling',
      icon: <Lightning className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <ReferenceSection
          references={[
            {
              title: "OpenAI – Function Calling Guide",
              url: "https://platform.openai.com/docs/guides/function-calling",
              description: "Official guide to function calling in the OpenAI API."
            },
            {
              title: "Anthropic – Tool Use (Claude)",
              url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview",
              description: "How to give Claude access to external tools."
            },
            {
              title: "Model Context Protocol",
              url: "https://modelcontextprotocol.io",
              description: "The open standard for connecting AI agents to tools and data."
            },
          ]}
        />
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="tool-use-function-calling"
      title="Tool Use & Function Calling"
      description="Tools are what turn a chatbot into an agent—learn how function calling bridges text generation and real-world action."
      tabs={tabs}
      nextConcept={{
        id: 'hallucination-grounding',
        title: 'Hallucination & Grounding',
        description: 'Why LLMs sometimes make things up and how to prevent it'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
