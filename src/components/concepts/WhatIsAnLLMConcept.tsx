import { lazy, Suspense } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "@/components/references/ReferenceSection"
import { Brain, Lightning, CurrencyDollar, ChatCircle } from "@phosphor-icons/react"
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles"

const MermaidDiagram = lazy(() => import("@/components/ui/MermaidDiagram"))

const Mermaid = ({ chart, className = "" }: { chart: string; className?: string }) => (
  <Suspense fallback={<div className="animate-pulse h-32 rounded bg-muted" />}>
    <MermaidDiagram chart={chart} className={className} />
  </Suspense>
)

/* ─── Mermaid chart definitions ─── */

const CHART_PREDICTION_LOOP = `graph TD
    Input["📝 Your Prompt"]
    Tokenize["🔤 Break into Tokens"]
    Process["🧠 Calculate Probabilities\nfor every possible next token"]
    Pick["🎯 Pick Most Likely Token"]
    Append["➕ Add Token to Output"]
    Check{"Response\ncomplete?"}
    Output["✅ Final Response"]

    Input --> Tokenize --> Process --> Pick --> Append --> Check
    Check -- "Not yet" --> Process
    Check -- "Yes" --> Output

    style Input fill:#3b82f6,stroke:#2563eb,color:#fff
    style Output fill:#22c55e,stroke:#16a34a,color:#fff
    style Check fill:#f59e0b,stroke:#d97706,color:#fff`

const CHART_CONTEXT_WINDOW = `graph TD
    subgraph Window["Context Window — e.g. 128K tokens"]
        direction TB
        System["🔧 System Prompt\n~200 tokens"]
        History["💬 Past Messages\n~2,000 tokens"]
        User["👤 Your New Message\n~500 tokens"]
        Available["📝 Space for Response\n~125,300 tokens remaining"]
    end

    System --> History --> User --> Available

    style System fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style History fill:#3b82f6,stroke:#2563eb,color:#fff
    style User fill:#22c55e,stroke:#16a34a,color:#fff
    style Available fill:#6b7280,stroke:#4b5563,color:#fff`

const CHART_MODEL_DECISION = `graph TD
    Start(["🤔 Which model should I use?"])
    Simple{"Simple task?\nclassify · extract\nsummarize"}
    Complex{"Need deep\nreasoning?"}
    Budget["💰 Budget Tier\nGPT-4o mini · Haiku\n~$0.15 per 1M tokens"]
    Mid["💎 Mid Tier\nGPT-4o · Sonnet\n~$3 per 1M tokens"]
    Frontier["🚀 Frontier Tier\nGPT-4.1 · Opus\n~$12 per 1M tokens"]

    Start --> Simple
    Simple -- "Yes" --> Budget
    Simple -- "No" --> Complex
    Complex -- "Moderate" --> Mid
    Complex -- "Very complex" --> Frontier

    style Budget fill:#22c55e,stroke:#16a34a,color:#fff
    style Mid fill:#3b82f6,stroke:#2563eb,color:#fff
    style Frontier fill:#8b5cf6,stroke:#7c3aed,color:#fff`

interface WhatIsAnLLMConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function WhatIsAnLLMConcept({ onMarkComplete, onNavigateToNext }: WhatIsAnLLMConceptProps) {
  const tabs = [
    {
      id: 'what-is-an-llm',
      title: 'What Is an LLM?',
      description: 'Understand what a large language model actually is and how it works at a high level',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Large Language Models Explained Simply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                A <strong>Large Language Model (LLM)</strong> is a type of AI trained on massive amounts of text.
                Given some input text (called a <strong>prompt</strong>), it predicts what words come next—one
                word (or <em>token</em>) at a time. That's really all it does, yet this simple mechanism
                produces surprisingly useful results.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">How It Works (The 30-Second Version)</h4>
                <ol className="space-y-2 list-decimal list-inside text-lg">
                  <li>You type a prompt—a question, instruction, or partial sentence.</li>
                  <li>The model breaks your text into <strong>tokens</strong> (roughly word-pieces).</li>
                  <li>It calculates probabilities for every possible next token.</li>
                  <li>It picks one token, appends it, and repeats until it decides to stop.</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-2">
                  Think of autocomplete on your phone—but trained on billions of documents and
                  much better at understanding context.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">How Token Prediction Works</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow the flow below — the model repeats this loop for every single token it generates:
                </p>
                <Mermaid chart={CHART_PREDICTION_LOOP} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular LLMs You Might Have Heard Of</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "GPT-4o / GPT-4.1", maker: "OpenAI", note: "Powers ChatGPT and many APIs" },
                  { name: "Claude", maker: "Anthropic", note: "Known for helpfulness and safety focus" },
                  { name: "Gemini", maker: "Google", note: "Multimodal—handles text, images, and code" },
                  { name: "Llama 4", maker: "Meta", note: "Open-weight model anyone can download" },
                ].map((m) => (
                  <div key={m.name} className={conceptSurfaceSoft("p-4")}>
                    <h4 className="font-semibold">{m.name}</h4>
                    <p className="text-sm text-muted-foreground">{m.maker}</p>
                    <p className="text-sm mt-1">{m.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'tokens',
      title: 'Tokens & Context Windows',
      description: 'What tokens are and why context windows matter',
      icon: <Lightning className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                What Are Tokens?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                LLMs don't read whole words—they break text into smaller pieces called <strong>tokens</strong>.
                A token is roughly ¾ of a word on average.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">Tokenization Examples</h4>
                <div className="space-y-2 text-sm font-mono">
                  <p>"Hello world" → <Badge variant="outline">Hello</Badge> <Badge variant="outline">world</Badge> (2 tokens)</p>
                  <p>"Unbelievable" → <Badge variant="outline">Un</Badge><Badge variant="outline">believ</Badge><Badge variant="outline">able</Badge> (3 tokens)</p>
                  <p>"ChatGPT is great!" → <Badge variant="outline">Chat</Badge><Badge variant="outline">GPT</Badge> <Badge variant="outline">is</Badge> <Badge variant="outline">great</Badge><Badge variant="outline">!</Badge> (5 tokens)</p>
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">What Is a Context Window?</h4>
                <p className="text-lg">
                  The <strong>context window</strong> is the maximum number of tokens the model can see at once—your
                  prompt <em>plus</em> its response must fit inside this window.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {[
                    { model: "GPT-4o", window: "128K tokens", pages: "~300 pages" },
                    { model: "Claude Opus 4", window: "200K tokens", pages: "~500 pages" },
                    { model: "Gemini 2.5", window: "1M tokens", pages: "~2,500 pages" },
                  ].map((m) => (
                    <div key={m.model} className="border border-border/40 rounded-lg p-3 text-center">
                      <p className="font-semibold">{m.model}</p>
                      <p className="text-sm text-muted-foreground">{m.window}</p>
                      <p className="text-xs text-muted-foreground">{m.pages}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">Visualising the Context Window</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Everything — your prompt, past messages, <em>and</em> the model's reply — must fit inside one window:
                </p>
                <Mermaid chart={CHART_CONTEXT_WINDOW} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Does This Matter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-lg">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                  <span><strong>Pricing:</strong> Most APIs charge per token—more tokens = higher cost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  <span><strong>Memory limits:</strong> Once the context window fills up, old information gets dropped.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                  <span><strong>Speed:</strong> Longer inputs take longer to process and cost more compute.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'costs',
      title: 'Costs & Practical Tips',
      description: 'How pricing works and how to use LLMs wisely',
      icon: <CurrencyDollar className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="w-5 h-5" />
                How LLM Pricing Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Most LLM providers charge per <strong>1,000 tokens</strong> (or per million).
                There are usually two rates: one for <em>input tokens</em> (your prompt) and a
                higher rate for <em>output tokens</em> (the model's response).
              </p>

              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold mb-3">Typical Cost Ranges (as of 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left py-2 pr-4">Tier</th>
                        <th className="text-left py-2 pr-4">Example Models</th>
                        <th className="text-left py-2">Cost per 1M Input Tokens</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr><td className="py-2 pr-4 font-medium">Budget</td><td className="py-2 pr-4">GPT-4o mini, Claude Haiku</td><td className="py-2">$0.10–$0.25</td></tr>
                      <tr><td className="py-2 pr-4 font-medium">Mid-tier</td><td className="py-2 pr-4">GPT-4o, Claude Sonnet</td><td className="py-2">$2–$5</td></tr>
                      <tr><td className="py-2 pr-4 font-medium">Frontier</td><td className="py-2 pr-4">GPT-4.1, Claude Opus</td><td className="py-2">$10–$15</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Which Model Should I Pick?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Use this decision tree as a starting point — you can always switch later:
              </p>
              <Mermaid chart={CHART_MODEL_DECISION} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practical Tips for Beginners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-green-200/60 dark:border-green-500/40")}>
                  <h4 className="font-semibold text-foreground mb-2">✅ Smart Habits</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Start with a cheaper model and upgrade only if quality isn't enough</li>
                    <li>• Keep prompts focused—only include information the model actually needs</li>
                    <li>• Set spending limits on your API dashboard</li>
                    <li>• Use playgrounds (ChatGPT, Claude.ai) to prototype before writing code</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-amber-200/60 dark:border-amber-500/40")}>
                  <h4 className="font-semibold text-foreground mb-2">⚠️ Common Pitfalls</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Sending an entire document when you only need a paragraph summarized</li>
                    <li>• Choosing the most expensive model "just to be safe"</li>
                    <li>• Forgetting that the model doesn't have access to the internet by default</li>
                    <li>• Assuming the model will always give the same answer (it's probabilistic!)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'references',
      title: 'References',
      description: 'Further reading and official documentation',
      icon: <ChatCircle className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <ReferenceSection
          references={[
            {
              title: "OpenAI – What are tokens and how to count them",
              url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
              description: "Official OpenAI guide on tokenization and counting."
            },
            {
              title: "Anthropic – Introduction to LLMs",
              url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
              description: "Anthropic's prompt engineering overview, great for understanding LLM interaction basics."
            },
            {
              title: "Google – Introduction to Large Language Models",
              url: "https://cloud.google.com/ai/llms",
              description: "Google Cloud's beginner-friendly explainer on LLMs."
            },
          ]}
        />
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="what-is-an-llm"
      title="What Is an LLM?"
      description="Large language models predict the next token—understand that and you understand the foundation of every AI agent."
      tabs={tabs}
      nextConcept={{
        id: 'ai-agents',
        title: 'AI Agents',
        description: 'Learn what makes an AI agent different from a chatbot'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
