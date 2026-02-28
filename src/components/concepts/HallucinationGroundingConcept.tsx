import { lazy, Suspense } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "@/components/references/ReferenceSection"
import { Warning, Anchor, MagnifyingGlass, BookOpen } from "@phosphor-icons/react"
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles"

const MermaidDiagram = lazy(() => import("@/components/ui/MermaidDiagram"))

const Mermaid = ({ chart, className = "" }: { chart: string; className?: string }) => (
  <Suspense fallback={<div className="animate-pulse h-32 rounded bg-muted" />}>
    <MermaidDiagram chart={chart} className={className} />
  </Suspense>
)

/* ─── Mermaid chart definitions ─── */

const CHART_WHY_HALLUCINATE = `graph TD
    Train["📚 Trained on\nbillions of web pages"]
    NoCheck["❌ No fact-checking\nduring training"]
    Stats["📊 Learns statistical\npatterns only"]
    Predict["🎯 Predicts the most\nlikely next token"]
    Result["⚠️ Output sounds right\nbut may be completely wrong"]

    Train --> NoCheck --> Stats --> Predict --> Result

    style Train fill:#3b82f6,stroke:#2563eb,color:#fff
    style NoCheck fill:#ef4444,stroke:#dc2626,color:#fff
    style Stats fill:#f59e0b,stroke:#d97706,color:#fff
    style Predict fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Result fill:#ef4444,stroke:#dc2626,color:#fff`

const CHART_GROUNDING_LADDER = `graph LR
    L1["📋 Paste Context\ninto Prompt"]
    L2["📎 Ask for\nCitations"]
    L3["🔍 RAG: Auto\nRetrieval"]
    L4["🌐 Live Search\n& Tool Use"]
    L5["✅ Multi-step\nVerification"]

    L1 -- "harder but\nmore robust" --> L2 --> L3 --> L4 --> L5

    style L1 fill:#22c55e,stroke:#16a34a,color:#fff
    style L2 fill:#84cc16,stroke:#65a30d,color:#fff
    style L3 fill:#eab308,stroke:#ca8a04,color:#fff
    style L4 fill:#f97316,stroke:#ea580c,color:#fff
    style L5 fill:#ef4444,stroke:#dc2626,color:#fff`

const CHART_DETECTION_FLOW = `graph TD
    Claim["LLM makes a claim"]
    Source{"Did you provide\nthe source data?"}
    Cited{"Does the claim\ncite a specific source?"}
    Verify{"Can you verify\nthe source exists?"}
    Consistent{"Consistent across\nmultiple runs?"}
    Trusted["✅ Likely Grounded"]
    Suspect["⚠️ Possibly Hallucinated\nVerify independently"]

    Claim --> Source
    Source -- "Yes" --> Likely["🟢 Lower risk"]
    Source -- "No" --> Cited
    Cited -- "No" --> Suspect
    Cited -- "Yes" --> Verify
    Verify -- "No" --> Suspect
    Verify -- "Yes" --> Consistent
    Consistent -- "Yes" --> Trusted
    Consistent -- "No" --> Suspect

    style Trusted fill:#22c55e,stroke:#16a34a,color:#fff
    style Likely fill:#22c55e,stroke:#16a34a,color:#fff
    style Suspect fill:#f59e0b,stroke:#d97706,color:#fff`

interface HallucinationGroundingConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function HallucinationGroundingConcept({ onMarkComplete, onNavigateToNext }: HallucinationGroundingConceptProps) {
  const tabs = [
    {
      id: 'what-are-hallucinations',
      title: 'What Are Hallucinations?',
      description: 'Why LLMs confidently make things up and what that means for you',
      icon: <Warning className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5" />
                Why LLMs Make Things Up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                A <strong>hallucination</strong> is when an LLM generates information that sounds
                correct but is actually wrong, made up, or unsupported. This happens because
                LLMs are <em>text prediction machines</em>, not knowledge databases—they produce
                whatever text seems statistically likely to come next.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">Common Types of Hallucinations</h4>
                <div className="space-y-3">
                  {[
                    { type: "Fabricated facts", example: "Citing a research paper that doesn't exist", color: "bg-red-500" },
                    { type: "Wrong attributions", example: "\"Einstein said…\" (but he never said that)", color: "bg-orange-500" },
                    { type: "Confident nonsense", example: "Giving a precise but completely wrong date or number", color: "bg-amber-500" },
                    { type: "Plausible code bugs", example: "Calling an API function with the wrong argument types", color: "bg-purple-500" },
                  ].map((h) => (
                    <div key={h.type} className="flex items-start gap-3">
                      <span className={`w-2 h-2 rounded-full ${h.color} mt-2 shrink-0`}></span>
                      <div>
                        <span className="font-semibold">{h.type}:</span>
                        <span className="text-muted-foreground ml-1 text-sm italic">{h.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-4 border border-amber-200/60 dark:border-amber-500/40")}>
                <h4 className="font-semibold mb-2">⚠️ The Danger</h4>
                <p className="text-lg">
                  Hallucinations are dangerous precisely because they <em>look</em> just like correct
                  answers. The model doesn't signal uncertainty—it presents made-up facts with
                  the same confident tone as real ones.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">How Hallucinations Happen</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow the chain — each step makes the problem clearer:
                </p>
                <Mermaid chart={CHART_WHY_HALLUCINATE} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Does This Happen?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-lg">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                  <span><strong>Training on imperfect data:</strong> The internet has errors, contradictions, and outdated info.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  <span><strong>Predicts plausible text, not truth:</strong> The model picks likely next words, not verified facts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                  <span><strong>No knowledge cutoff awareness:</strong> The model doesn't know when its training data ended.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                  <span><strong>People-pleasing tendency:</strong> Models are trained to be helpful, which can lead to making up an answer rather than saying "I don't know."</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'grounding',
      title: 'Grounding Strategies',
      description: 'Practical techniques to keep LLM output anchored in reality',
      icon: <Anchor className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Anchor className="w-5 h-5" />
                What Is Grounding?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>Grounding</strong> means giving the model access to real, verified information
                so it bases its answers on facts rather than guessing. Think of it as giving the
                model an open-book exam instead of asking it to recall everything from memory.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Provide Context in the Prompt",
                    desc: "Paste relevant documents, data, or search results directly into your prompt so the model can reference them.",
                    badge: "Easiest",
                    color: "border-green-200 dark:border-green-800",
                  },
                  {
                    title: "Retrieval-Augmented Generation (RAG)",
                    desc: "Automatically search a knowledge base and inject relevant chunks into the prompt before the model responds.",
                    badge: "Most Popular",
                    color: "border-blue-200 dark:border-blue-800",
                  },
                  {
                    title: "Tool Use / Web Search",
                    desc: "Let the model call a search engine or database when it needs current or specific information.",
                    badge: "Real-time",
                    color: "border-purple-200 dark:border-purple-800",
                  },
                  {
                    title: "Ask for Citations",
                    desc: 'Instruct the model to quote sources and say "I don\'t know" when it can\'t find evidence.',
                    badge: "Simple",
                    color: "border-amber-200 dark:border-amber-800",
                  },
                ].map((s) => (
                  <div key={s.title} className={`border ${s.color} rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{s.title}</h4>
                      <Badge variant="outline" className="text-xs">{s.badge}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">The Grounding Ladder</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Strategies range from easy-but-basic to complex-but-robust. Start on the left and move right as needed:
                </p>
                <Mermaid chart={CHART_GROUNDING_LADDER} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prompt Techniques That Reduce Hallucination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4")}>
                  <h4 className="font-semibold mb-2">1. "Only use the provided context"</h4>
                  <pre className={conceptCodeBlock("p-3 text-sm")}>
{`Answer the question using ONLY the context below. 
If the answer is not in the context, say "I don't have 
enough information to answer that."

Context: {your documents here}
Question: {user question}`}
                  </pre>
                </div>

                <div className={conceptSurfaceSoft("p-4")}>
                  <h4 className="font-semibold mb-2">2. "Cite your sources"</h4>
                  <pre className={conceptCodeBlock("p-3 text-sm")}>
{`For each claim you make, include [Source: document name] 
at the end of the sentence. If you cannot cite a source, 
explicitly state that you are unsure.`}
                  </pre>
                </div>

                <div className={conceptSurfaceSoft("p-4")}>
                  <h4 className="font-semibold mb-2">3. "Think step by step"</h4>
                  <pre className={conceptCodeBlock("p-3 text-sm")}>
{`Before answering, list the facts you are confident about
and the facts you are uncertain about. Then answer 
based only on the confident facts.`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'detection',
      title: 'Spotting Hallucinations',
      description: 'How to tell when the model might be making things up',
      icon: <MagnifyingGlass className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagnifyingGlass className="w-5 h-5" />
                Red Flags to Watch For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { flag: "Overly specific details", tip: "If the model gives an exact date, name, or statistic without being prompted with that data, verify it independently." },
                  { flag: "Confident hedging", tip: "Phrases like \"According to research...\" or \"Studies show...\" without specific citations are often hallucinated." },
                  { flag: "Inconsistency across runs", tip: "Ask the same question twice. If you get different facts each time, at least one is likely hallucinated." },
                  { flag: "Perfect but unfindable URLs", tip: "The model often generates URLs that look real but lead to 404 pages." },
                  { flag: "Seamless filler text", tip: "When summarizing a document, the model may smoothly insert information that wasn't in the original." },
                ].map((item, i) => (
                  <div key={i} className={conceptSurfaceSoft("p-4")}>
                    <h4 className="font-semibold text-foreground">🚩 {item.flag}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Hallucination Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Decision Flow: Is This Claim Reliable?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Walk through this flowchart for any critical claim the model makes:
                </p>
                <Mermaid chart={CHART_DETECTION_FLOW} />
              </div>

              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <ul className="space-y-2 text-lg">
                  <li>✓ Did I give the model the source material it needs?</li>
                  <li>✓ Did I tell it to say "I don't know" when unsure?</li>
                  <li>✓ Did I verify any specific facts, numbers, or URLs it produced?</li>
                  <li>✓ Am I using a grounding technique (RAG, search, context injection)?</li>
                  <li>✓ For high-stakes output, did a human review the result?</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'references',
      title: 'References',
      description: 'Further reading on hallucination and grounding',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <ReferenceSection
          references={[
            {
              title: "Microsoft – Grounding LLMs",
              url: "https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/advanced-prompt-engineering",
              description: "Microsoft's guide to grounding techniques using Azure OpenAI."
            },
            {
              title: "Anthropic – Reducing Hallucinations",
              url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations",
              description: "Practical strategies for reducing hallucinations with Claude."
            },
            {
              title: "Google – Grounding with Google Search",
              url: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview",
              description: "How Google Vertex AI grounds model responses with search results."
            },
          ]}
        />
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="hallucination-grounding"
      title="Hallucination & Grounding"
      description="LLMs sometimes make things up—learn why it happens and how to keep answers anchored in reality."
      tabs={tabs}
      nextConcept={{
        id: 'rag-basics',
        title: 'RAG Basics',
        description: 'The most popular pattern for grounding LLMs with your own data'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
