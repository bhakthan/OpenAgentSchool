import { lazy, Suspense } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "@/components/references/ReferenceSection"
import { MagnifyingGlass, ArrowsClockwise, Lightning, BookOpen } from "@phosphor-icons/react"
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles"

const MermaidDiagram = lazy(() => import("@/components/ui/MermaidDiagram"))

const Mermaid = ({ chart, className = "" }: { chart: string; className?: string }) => (
  <Suspense fallback={<div className="animate-pulse h-32 rounded bg-muted" />}>
    <MermaidDiagram chart={chart} className={className} />
  </Suspense>
)

/* ─── Mermaid chart definitions ─── */

const CHART_RAG_OVERVIEW = `graph LR
    Q["❓ User Question"]
    Search["🔍 Search\nKnowledge Base"]
    Docs["📄 Retrieved\nDocuments"]
    Prompt["📝 Build Prompt\nQuestion + Context"]
    LLM["🧠 LLM"]
    Answer["✅ Grounded\nAnswer"]

    Q --> Search
    Search --> Docs
    Docs --> Prompt
    Q --> Prompt
    Prompt --> LLM
    LLM --> Answer

    style Q fill:#3b82f6,stroke:#2563eb,color:#fff
    style Search fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Docs fill:#f59e0b,stroke:#d97706,color:#fff
    style LLM fill:#6366f1,stroke:#4f46e5,color:#fff
    style Answer fill:#22c55e,stroke:#16a34a,color:#fff`

const CHART_RAG_PIPELINE = `graph TD
    subgraph Indexing["📥 Phase 1: Indexing  —  one-time setup"]
        direction LR
        D["📄 Documents"]
        Ch["✂️ Split into\nChunks"]
        Em["🔢 Create\nEmbeddings"]
        DB["💾 Store in\nVector DB"]
        D --> Ch --> Em --> DB
    end

    subgraph Querying["🔎 Phase 2: Querying  —  every question"]
        direction LR
        QQ["❓ Question"]
        QE["🔢 Embed\nQuestion"]
        VS["🔍 Vector\nSearch"]
        Inj["📋 Inject into\nPrompt"]
        Gen["🧠 LLM\nGenerates"]
        A["✅ Answer"]
        QQ --> QE --> VS --> Inj --> Gen --> A
    end

    Indexing --> Querying

    style D fill:#3b82f6,stroke:#2563eb,color:#fff
    style DB fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style A fill:#22c55e,stroke:#16a34a,color:#fff`

const CHART_RAG_DECISION = `graph TD
    Start(["🤔 Should I use RAG?"])
    HasDocs{"Do you have\nreference documents?"}
    Changes{"Does the info\nchange over time?"}
    Yes["✅ RAG is a great fit\nGround answers in your data"]
    Maybe["🤔 Consider RAG\nHelps reduce hallucinations"]
    No["❌ Probably not needed\nFine-tuning or plain prompting\nmay be simpler"]

    Start --> HasDocs
    HasDocs -- "Yes" --> Changes
    HasDocs -- "No" --> No
    Changes -- "Yes" --> Yes
    Changes -- "Rarely" --> Maybe

    style Yes fill:#22c55e,stroke:#16a34a,color:#fff
    style Maybe fill:#f59e0b,stroke:#d97706,color:#fff
    style No fill:#6b7280,stroke:#4b5563,color:#fff`

interface RAGBasicsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function RAGBasicsConcept({ onMarkComplete, onNavigateToNext }: RAGBasicsConceptProps) {
  const tabs = [
    {
      id: 'what-is-rag',
      title: 'What Is RAG?',
      description: 'Understand Retrieval-Augmented Generation in plain language',
      icon: <MagnifyingGlass className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagnifyingGlass className="w-5 h-5" />
                RAG in One Sentence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>Retrieval-Augmented Generation (RAG)</strong> means: before the LLM answers a
                question, first <em>search</em> your documents for relevant information, then paste
                that information into the prompt so the model can base its answer on real data.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold mb-2">The Three Steps of RAG</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { step: "1. Retrieve", color: "bg-blue-500", desc: "Search your knowledge base for passages related to the user's question." },
                    { step: "2. Augment", color: "bg-purple-500", desc: "Insert the retrieved passages into the prompt as context for the model." },
                    { step: "3. Generate", color: "bg-green-500", desc: "The LLM reads the context and generates an answer grounded in your data." },
                  ].map((s) => (
                    <div key={s.step} className={conceptSurfaceSoft("p-4 text-center")}>
                      <div className={`w-8 h-8 rounded-full ${s.color}/20 flex items-center justify-center mx-auto mb-2`}>
                        <span className="font-bold text-sm">{s.step.charAt(0)}</span>
                      </div>
                      <h4 className="font-semibold text-sm">{s.step}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-4 border border-blue-200/60 dark:border-blue-500/40")}>
                <h4 className="font-semibold mb-2">💡 Why Not Just Fine-Tune?</h4>
                <p className="text-lg">
                  Fine-tuning bakes knowledge into the model permanently (slow, expensive, hard to update).
                  RAG keeps the model general-purpose and looks up information on the fly—like the
                  difference between memorizing an encyclopedia vs. knowing how to Google.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3">RAG at a Glance</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The question flows left-to-right through each stage — notice how your documents meet the question in the middle:
                </p>
                <Mermaid chart={CHART_RAG_OVERVIEW} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When Should You Use RAG?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">✅ Great For</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Q&A over company documents</li>
                    <li>• Customer support with a knowledge base</li>
                    <li>• Research assistants working with papers</li>
                    <li>• Any task where facts change frequently</li>
                  </ul>
                </div>
                <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">⚠️ Less Ideal For</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Creative writing or brainstorming</li>
                    <li>• Tasks where you don't have reference docs</li>
                    <li>• Simple questions the model already knows</li>
                    <li>• Style or tone changes (fine-tuning is better)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'how-it-works',
      title: 'How RAG Works',
      description: 'Embeddings, vector search, and the retrieval pipeline',
      icon: <ArrowsClockwise className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                The RAG Pipeline (Simplified)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                A RAG system has two phases: <strong>indexing</strong> (done once) and
                <strong> querying</strong> (done every time a user asks a question).
              </p>

              <div className="mb-4">
                <h4 className="font-semibold mb-3">Two-Phase Pipeline</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  First you prepare your data (top), then you answer questions (bottom):
                </p>
                <Mermaid chart={CHART_RAG_PIPELINE} />
              </div>

              <div className={conceptSurfaceSoft("p-5 space-y-4")}>
                <h4 className="font-semibold">Phase 1: Indexing (Prepare Your Data)</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { step: "Split", desc: "Break documents into small chunks (e.g., 500-word paragraphs)." },
                    { step: "Embed", desc: "Convert each chunk into a vector (a list of numbers) that captures its meaning." },
                    { step: "Store", desc: "Save the vectors in a vector database (like Pinecone, Qdrant, or ChromaDB)." },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 mt-0.5">{s.step}</Badge>
                      <span>{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-5 space-y-4")}>
                <h4 className="font-semibold">Phase 2: Querying (Answer a Question)</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { step: "Embed query", desc: "Convert the user's question into a vector using the same embedding model." },
                    { step: "Search", desc: "Find the document chunks whose vectors are most similar to the question's vector." },
                    { step: "Inject", desc: "Paste the top matching chunks into the LLM's prompt as context." },
                    { step: "Generate", desc: "The LLM answers based on the retrieved context (not from memory alone)." },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 mt-0.5">{s.step}</Badge>
                      <span>{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Are Embeddings?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg leading-relaxed">
                An <strong>embedding</strong> is a way to represent text as a list of numbers (a vector)
                so that similar meanings get similar numbers. This lets the computer find text
                that is <em>semantically</em> related, not just text that contains the exact same words.
              </p>

              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold mb-2">Example</h4>
                <pre className={conceptCodeBlock("p-3 text-sm")}>
{`"How do I reset my password?"
→ [0.12, -0.45, 0.78, 0.33, ...]  (1536 numbers)

"I forgot my login credentials"
→ [0.11, -0.43, 0.76, 0.35, ...]  (very similar numbers!)

"What's the weather today?"
→ [-0.67, 0.22, -0.15, 0.89, ...] (very different numbers)`}
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  Because the first two sentences mean similar things, their vectors are close
                  together—even though they share very few words.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'The simplest way to build your first RAG system',
      icon: <Lightning className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Your First RAG System in 4 Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Is RAG Right for My Use Case?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Walk through this quick decision tree before you start building:
                </p>
                <Mermaid chart={CHART_RAG_DECISION} />
              </div>

              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Pick a vector database",
                    desc: "ChromaDB (free, local) is great for learning. Pinecone or Qdrant for production.",
                    tip: "Start with ChromaDB—it's a pip install and zero config."
                  },
                  {
                    num: "2",
                    title: "Choose an embedding model",
                    desc: "OpenAI's text-embedding-3-small is cheap and good. Free alternatives: Sentence Transformers.",
                    tip: "Use the same embedding model for indexing and querying!"
                  },
                  {
                    num: "3",
                    title: "Chunk and index your documents",
                    desc: "Split each document into ~500-word chunks with some overlap between chunks.",
                    tip: "Overlap prevents losing context at chunk boundaries."
                  },
                  {
                    num: "4",
                    title: "Build the query loop",
                    desc: "Embed the question → search for top 3-5 chunks → inject into prompt → call LLM.",
                    tip: "Start with just 3 retrieved chunks and adjust from there."
                  },
                ].map((s) => (
                  <div key={s.num} className={conceptSurfaceSoft("p-4")}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">{s.num}</div>
                      <div>
                        <h4 className="font-semibold">{s.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1 italic">💡 {s.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Beginner Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-red-200/60 dark:border-red-500/40")}>
                  <h4 className="font-semibold text-foreground mb-2">❌ Avoid These</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Chunks that are too large (model ignores most of it) or too small (lose context)</li>
                    <li>• Using different embedding models for indexing vs. querying</li>
                    <li>• Not telling the model to "only use the provided context"</li>
                    <li>• Skipping overlap between chunks</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-green-200/60 dark:border-green-500/40")}>
                  <h4 className="font-semibold text-foreground mb-2">✅ Do This Instead</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Start with 300-500 word chunks and 50-word overlap</li>
                    <li>• Always use the same embedding model end-to-end</li>
                    <li>• Include "answer only from the context" in your system prompt</li>
                    <li>• Test with real questions your users would actually ask</li>
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
      description: 'Further reading on RAG patterns and best practices',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <ReferenceSection
          references={[
            {
              title: "Microsoft – RAG with Azure AI Search",
              url: "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
              description: "Microsoft's guide to building RAG solutions with Azure AI Search."
            },
            {
              title: "LangChain – RAG Tutorial",
              url: "https://python.langchain.com/docs/tutorials/rag/",
              description: "Step-by-step tutorial for building a RAG pipeline with LangChain."
            },
            {
              title: "Pinecone – What is RAG?",
              url: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
              description: "Beginner-friendly explainer of RAG concepts from Pinecone."
            },
          ]}
        />
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="rag-basics"
      title="RAG Basics"
      description="Retrieval-Augmented Generation: search your data first, then let the model answer—the most popular way to ground AI in facts."
      tabs={tabs}
      nextConcept={{
        id: 'agentic-prompting-fundamentals',
        title: 'Agentic Prompting Fundamentals',
        description: 'Learn the prompting moves that make agents reliable'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
