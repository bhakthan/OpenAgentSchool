import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "../references/ReferenceSection"
import { Brain, Database, Funnel, Stack, ArrowsClockwise, Lightning, ShieldCheck, Robot, Graph, Lightbulb, Code, BookOpen, ArrowRight, MagnifyingGlass, Clock, Users } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete'
import CodeBlock from "@/components/ui/CodeBlock"
import { Link } from "react-router-dom"
import { MermaidDiagram } from "@/components/ui/MermaidDiagram"
import { ReflectionPrompt } from "@/components/ui/ReflectionPrompt"

interface ContextEngineeringConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

/* ──────────────────────────── helpers ──────────────────────────── */

const EraCard = ({ era, period, color, description, exemplars }: {
  era: string; period: string; color: string; description: string; exemplars: string[]
}) => (
  <div className={`p-4 rounded-lg border-l-4 ${color} bg-muted/50`}>
    <div className="flex items-center gap-2 mb-1">
      <Badge variant="outline" className="text-xs">{period}</Badge>
      <h4 className="font-bold text-sm">{era}</h4>
    </div>
    <p className="text-sm text-muted-foreground mb-2">{description}</p>
    <div className="flex flex-wrap gap-1">
      {exemplars.map(e => <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>)}
    </div>
  </div>
)

const PipelineNode = ({ title, icon, principles, details }: {
  title: string; icon: React.ReactNode; principles: string[]; details: string
}) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-base">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-muted-foreground">{details}</p>
      <ul className="space-y-1">
        {principles.map(p => (
          <li key={p} className="flex items-start gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

/* ──────────────────────────── main component ──────────────────────────── */

export default function ContextEngineeringConcept({ onMarkComplete, onNavigateToNext }: ContextEngineeringConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('context-engineering')
    if (onMarkComplete) onMarkComplete()
  }

  const tabs = [
    /* ─── Tab 1: Overview ─── */
    {
      id: 'overview',
      title: 'Overview',
      description: 'What is Context Engineering and why does it matter?',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Context Engineering 2.0
              </CardTitle>
              <CardDescription>Reducing Information Entropy between Human Intent and Machine Action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Context Engineering is the discipline of building dynamic systems that provide the <strong>right information, 
                in the right format, at the right time</strong> in a model's context window. It supersedes "prompt engineering" 
                by treating context as a first-class engineering artifact—collected, compressed, organized, and selected 
                to minimize entropy between what users mean and what agents do.
              </p>

              {/* Hero image */}
              <div className="my-4">
                <img 
                  src="/images/Context_Engineering_2.webp" 
                  alt="Context Engineering 2.0 infographic showing the 4 eras of evolution, pipeline nodes, and usage patterns" 
                  className="w-full rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2">Core Definition</h4>
                <p className="text-sm italic">
                  <strong>Context (C)</strong> = Union of Characterization Char(s) over all entities. 
                  <strong> Context Engineering (CE)</strong> maps (C, T) → f<sub>context</sub> to optimize Task T.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-3">Why Context Engineering matters more than Prompt Engineering</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
                    <span><strong>Prompt Engineering</strong> optimizes a static string. <strong>Context Engineering</strong> optimizes the entire information supply chain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                    <span>Every tool call, RAG retrieval, and memory access is a context engineering decision.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                    <span>Bad context = bad results, no matter how good the model or the prompt.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* The 4 Eras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                The 4 Eras of Context Evolution
              </CardTitle>
              <CardDescription>From sensor fusion to proactive context construction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EraCard
                  era="Era 1.0: Primitive Computation"
                  period="1990s–2020"
                  color="border-slate-400"
                  description="Sensor fusion, rule triggers. Designers as intention translators."
                  exemplars={["Context Toolkit", "Rule Triggers", "Sensor Fusion"]}
                />
                <EraCard
                  era="Era 2.0: Agent-Centric"
                  period="Present"
                  color="border-blue-500"
                  description="Prompts, RAG, Tool use. From Context-Aware to Context-Cooperative. Interface cost falls."
                  exemplars={["RAG", "Tool Use", "Prompt Engineering", "Self-Baking"]}
                />
                <EraCard
                  era="Era 3.0: Human-Level"
                  period="Future"
                  color="border-emerald-500"
                  description="Social cues, emotion, tacit knowledge. Personal digital memory with human-like forgetting."
                  exemplars={["Tacit Knowledge", "Digital Memory", "Emotion Sensing"]}
                />
                <EraCard
                  era="Era 4.0: Superhuman"
                  period="Speculative"
                  color="border-purple-500"
                  description="God's-eye view. Machines proactively construct context and reveal latent needs."
                  exemplars={["Proactive Context", "Latent Need Detection"]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Prompt Engineering vs Context Engineering — visual juxtaposition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Graph className="w-5 h-5" />
                Prompt Engineering vs. Context Engineering
              </CardTitle>
              <CardDescription>Side-by-side: how the paradigm shifts from static strings to dynamic pipelines</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram
                chart={`graph LR
  subgraph PE["Prompt Engineering"]
    U1[User Query] --> P1[Static Prompt Template]
    P1 --> LLM1[LLM]
    LLM1 --> R1[Response]
  end
  subgraph CE["Context Engineering"]
    U2[User Query] --> C1[Collect]
    C1 --> C2[Compress]
    C2 --> C3[Organize]
    C3 --> C4[Select]
    C4 --> LLM2[LLM]
    DB[(RAG / Tools / Memory)] --> C1
    LLM2 --> R2[Response]
    R2 --> FB[Feedback Loop]
    FB --> C1
  end`}
                title="Prompt Engineering vs. Context Engineering"
              />
            </CardContent>
          </Card>

          {/* Context Pipeline Flowchart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Funnel className="w-5 h-5" />
                The Context Engineering Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram
                chart={`flowchart TD
  A[Raw Sources] -->|Ingest| B[Collect]
  B -->|Token budget| C[Compress]
  C -->|Structure| D[Organize]
  D -->|Relevance filter| E[Select]
  E --> F[Context Window]
  F --> G[LLM Inference]
  G -->|Observe quality| H{Good enough?}
  H -->|Yes| I[Return to User]
  H -->|No| J[Feedback / Re-rank]
  J --> B`}
                title="Four-Stage Context Engineering Pipeline"
              />
            </CardContent>
          </Card>

          <ReflectionPrompt
            question="Think about a recent AI interaction where the response was off-target. Was the problem the prompt itself, or was it missing context (e.g., your preferences, relevant documents, conversation history)?"
            hint="This distinction is the core of why Context Engineering supersedes Prompt Engineering."
          />
        </div>
      )
    },

    /* ─── Tab 2: Pipeline ─── */
    {
      id: 'pipeline',
      title: 'Pipeline Nodes',
      description: 'The four-stage context engineering pipeline',
      icon: <Funnel className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* High-level flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                The Context Pipeline: High Entropy → Low Entropy
              </CardTitle>
              <CardDescription>
                Four nodes transform raw, noisy data into precise, task-ready context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm font-medium">
                <Badge variant="outline" className="px-3 py-1">Raw Data</Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1">Collection</Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-3 py-1">Management</Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-3 py-1">Organization</Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1">Selection</Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className="px-3 py-1">Task-Ready Context</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 4 Pipeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PipelineNode
              title="Node A: Collection & Storage"
              icon={<Database className="w-5 h-5 text-blue-500" />}
              details="Gather the right raw material with minimal sufficiency—avoid context bloat from day one."
              principles={[
                "Minimal Sufficiency: collect only what the task needs",
                "Layered Continuity: cache for short-lived, embedded DB for medium, cloud/enclaves for long-term",
                "Distributed sensors → Layered Storage architecture",
                "Multimodal: text, images, structured data, sensor streams"
              ]}
            />
            <PipelineNode
              title='Node B: Management & Abstraction ("Self-Baking")'
              icon={<Stack className="w-5 h-5 text-emerald-500" />}
              details="Compress, summarize, and embed raw data into reusable knowledge artifacts."
              principles={[
                "Shared Vector Space & Joint Self-Attention for multimodal fusion",
                "Semantic Vectors (Embeddings) for similarity-based retrieval",
                "QA Pairs/Summaries generated from raw stream (Self-Baking)",
                "Fixed Schemas for structured knowledge extraction"
              ]}
            />
            <PipelineNode
              title="Node C: Organization & Isolation"
              icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
              details="Structure memory by time horizon and prevent context pollution between tasks."
              principles={[
                "Layered Memory (OS Analogy): short-term and long-term tiers",
                "Context Isolation: sandboxes and sub-agents prevent cross-contamination",
                "Session boundaries enforce clean context per task",
                "Sub-agents get scoped context, not the full window"
              ]}
            />
            <PipelineNode
              title="Node D: Selection"
              icon={<Funnel className="w-5 h-5 text-purple-500" />}
              details="Choose the final context that enters the prompt—every token must earn its place."
              principles={[
                "Criteria: Semantic Relevance, Logical Dependency, Recency, Deduplication",
                "Reranking (LLM): re-score candidates with a language model",
                "Segmentation: AST vs Fixed Windows for code context",
                "Token budget enforcement—fit the best content to the window"
              ]}
            />
          </div>

          {/* Self-Baking detail */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Deep Dive: Self-Baking
              </CardTitle>
              <CardDescription>
                Agents that pre-process their own context before it's needed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                "Self-Baking" is a pattern where agents proactively transform raw data into 
                optimized context artifacts <em>before query time</em>. Instead of running RAG against 
                raw documents at inference, the agent pre-generates QA pairs, summaries, fixed schemas, 
                and semantic embeddings that are cheaper and faster to retrieve.
              </p>
              <CodeBlock
                language="python"
                styleVariant="flat-ui-2"
              >{`class SelfBakingPipeline:
    """Pre-process raw context into retrieval-optimized forms."""

    async def bake(self, raw_stream: AsyncIterator[Document]) -> BakedContext:
        qa_pairs = []
        summaries = []
        embeddings = []

        async for doc in raw_stream:
            # 1. Generate QA pairs for direct retrieval
            qa_pairs.extend(await self.extract_qa(doc))

            # 2. Create layered summaries (detail → abstract)
            summaries.append(await self.summarize(doc, levels=[1, 2, 3]))

            # 3. Embed into shared vector space
            embeddings.append(await self.embed(doc))

        return BakedContext(
            qa_pairs=qa_pairs,          # Fast exact matches
            summaries=summaries,        # Compressed context
            vectors=np.stack(embeddings) # Similarity search
        )

    async def select(self, query: str, budget_tokens: int) -> str:
        """Token-budgeted context selection with reranking."""
        candidates = await self.retrieve(query, top_k=20)
        reranked = await self.rerank(query, candidates)
        return self.pack_to_budget(reranked, budget_tokens)`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      )
    },

    /* ─── Tab 3: Usage Patterns ─── */
    {
      id: 'patterns',
      title: 'Usage Patterns',
      description: 'Sharing, proactive inference, and engineering tricks',
      icon: <Graph className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Card 1: Sharing & Interoperability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Card 1: Sharing & Interoperability
              </CardTitle>
              <CardDescription>
                How agents share context within and across systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Intra-System</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">Embedded</Badge>
                      Shared prompt context injected at runtime
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">Blackboard</Badge>
                      Shared mutable state visible to all agents
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">Semantic Graphs</Badge>
                      Knowledge graphs for relationship-aware sharing
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Cross-System</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">Adapters</Badge>
                      Protocol translation layers between agent frameworks
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">JSON/API Schemas</Badge>
                      Standardized context exchange formats
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Proactive Inference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Card 2: Proactive Inference
              </CardTitle>
              <CardDescription>
                Inferring what context will be needed before the user asks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-md border border-purple-200 dark:border-purple-800 space-y-2">
                  <div className="flex items-start gap-2">
                    <Lightning className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span className="text-sm"><strong>Infer latent goals</strong> via Chain-of-Thought reasoning about user behavior patterns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MagnifyingGlass className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span className="text-sm"><strong>Detect "struggle signatures"</strong> to proactively offer tools and context before failure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span className="text-sm"><strong>Learn profiles from history</strong> to personalize context selection over time</span>
                  </div>
                </div>
              </div>

              <CodeBlock
                language="python"
                styleVariant="flat-ui-2"
              >{`class ProactiveContextEngine:
    """Anticipate context needs from behavioral signals."""

    async def detect_struggle(self, session: Session) -> Optional[Intervention]:
        signals = self.analyze_patterns(session.recent_actions)

        if signals.repeated_failures > 2:
            return Intervention(
                type="offer_tool",
                context=await self.select_relevant_tool(signals.failure_pattern)
            )
        if signals.semantic_drift > 0.7:
            return Intervention(
                type="refocus",
                context=await self.retrieve_original_goal(session)
            )
        return None

    async def prefetch_context(self, user_profile: Profile, task: Task) -> List[str]:
        """Pre-load context based on user history + task type."""
        similar_sessions = await self.find_similar(user_profile, task)
        frequently_needed = self.extract_common_context(similar_sessions)
        return await self.warm_cache(frequently_needed)`}
              </CodeBlock>
            </CardContent>
          </Card>

          {/* Card 3: Emerging Engineering Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Card 3: Emerging Engineering Practices
              </CardTitle>
              <CardDescription>
                Practical tricks for production context engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Lightning className="w-4 h-4 text-amber-500" />
                    KV Caching
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Keep prefixes stable</li>
                    <li>• Deterministic, append-only updates</li>
                    <li>• Avoid cache-busting reorderings</li>
                  </ul>
                </div>
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Stack className="w-4 h-4 text-blue-500" />
                    Tooling
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Small, stable toolsets</li>
                    <li>• No dynamic loading (breaks cache)</li>
                    <li>• Consistent tool schemas</li>
                  </ul>
                </div>
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    Orchestration
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• "Todo.md" trick (recite goals in context)</li>
                    <li>• Lead agent decomposes tasks</li>
                    <li>• Don't hide errors—use them for correction</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-md border border-rose-200 dark:border-rose-800">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  The Road Ahead
                </h4>
                <p className="text-xs text-muted-foreground">
                  Key challenges remain: <strong>Storage Bottlenecks</strong>, <strong>Processing Degradation</strong> (Quadratic Attention), 
                  <strong> System Instability</strong>, and <strong>Evaluation Difficulty</strong>. 
                  The destination: a <em>Semantic Operating System</em> where context flows as naturally as memory in a human brain.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    /* ─── Tab 4: Hands-On ─── */
    {
      id: 'hands-on',
      title: 'Hands-On',
      description: 'Build a context engineering pipeline',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Build a Mini Context Pipeline
              </CardTitle>
              <CardDescription>
                A complete end-to-end example: collect → manage → organize → select
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="python"
                styleVariant="flat-ui-2"
              >{`"""
Context Engineering Pipeline — Minimal Working Example
Implements all 4 nodes: Collection → Management → Organization → Selection
"""
import numpy as np
from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class ContextChunk:
    text: str
    source: str
    embedding: Optional[np.ndarray] = None
    summary: Optional[str] = None
    recency_score: float = 1.0


# ─── Node A: Collection & Storage ──────────────────────────────────
class ContextCollector:
    """Minimal-sufficiency collector with layered storage."""

    def __init__(self, max_short_term: int = 50):
        self.short_term: List[ContextChunk] = []   # Session cache
        self.long_term: List[ContextChunk] = []     # Persistent store
        self.max_short_term = max_short_term

    def collect(self, text: str, source: str) -> ContextChunk:
        chunk = ContextChunk(text=text, source=source)
        self.short_term.append(chunk)
        if len(self.short_term) > self.max_short_term:
            overflow = self.short_term.pop(0)
            self.long_term.append(overflow)  # Promote to long-term
        return chunk


# ─── Node B: Management & Abstraction ──────────────────────────────
class ContextManager:
    """Self-Baking: embed + summarize for retrieval-optimized forms."""

    def embed(self, chunk: ContextChunk) -> ContextChunk:
        # In production: call embedding model (e.g., text-embedding-3-small)
        words = chunk.text.lower().split()
        vec = np.random.randn(256)  # Placeholder
        chunk.embedding = vec / np.linalg.norm(vec)
        return chunk

    def summarize(self, chunk: ContextChunk) -> ContextChunk:
        # In production: call an LLM to summarize
        chunk.summary = chunk.text[:100] + "..."
        return chunk

    def bake(self, chunk: ContextChunk) -> ContextChunk:
        """Full self-baking: embed + summarize."""
        chunk = self.embed(chunk)
        chunk = self.summarize(chunk)
        return chunk


# ─── Node C: Organization & Isolation ──────────────────────────────
class ContextOrganizer:
    """Layered memory with sandboxed isolation per sub-task."""

    def __init__(self):
        self.sandboxes: dict[str, List[ContextChunk]] = {}

    def assign_to_sandbox(self, task_id: str, chunks: List[ContextChunk]):
        """Isolate context per sub-agent / sub-task."""
        self.sandboxes[task_id] = chunks

    def get_sandbox(self, task_id: str) -> List[ContextChunk]:
        return self.sandboxes.get(task_id, [])


# ─── Node D: Selection ─────────────────────────────────────────────
class ContextSelector:
    """Score, rank, and pack context into a token budget."""

    def score(self, query_vec: np.ndarray, chunk: ContextChunk) -> float:
        if chunk.embedding is None:
            return 0.0
        similarity = float(np.dot(query_vec, chunk.embedding))
        return 0.7 * similarity + 0.3 * chunk.recency_score

    def select(
        self,
        query_vec: np.ndarray,
        candidates: List[ContextChunk],
        budget_tokens: int = 4000
    ) -> List[ContextChunk]:
        scored = [(self.score(query_vec, c), c) for c in candidates]
        scored.sort(key=lambda x: x[0], reverse=True)

        selected, used = [], 0
        for _score, chunk in scored:
            est_tokens = len(chunk.text.split()) * 1.3  # rough estimate
            if used + est_tokens > budget_tokens:
                break
            selected.append(chunk)
            used += est_tokens
        return selected


# ─── Putting it together ───────────────────────────────────────────
def run_pipeline():
    collector = ContextCollector()
    manager = ContextManager()
    organizer = ContextOrganizer()
    selector = ContextSelector()

    # 1. Collect
    docs = [
        ("Agent memory uses vector stores for retrieval.", "docs/memory.md"),
        ("Context windows have quadratic attention cost.", "docs/attention.md"),
        ("Self-baking pre-computes QA pairs and summaries.", "docs/baking.md"),
    ]
    chunks = [collector.collect(text, src) for text, src in docs]

    # 2. Manage (self-bake)
    baked = [manager.bake(c) for c in chunks]

    # 3. Organize (isolate per task)
    organizer.assign_to_sandbox("task-1", baked[:2])
    organizer.assign_to_sandbox("task-2", baked[2:])

    # 4. Select (token-budgeted)
    query_vec = np.random.randn(256)
    query_vec /= np.linalg.norm(query_vec)
    selected = selector.select(query_vec, baked, budget_tokens=200)

    print(f"Selected {len(selected)} of {len(baked)} chunks for context window")`}
              </CodeBlock>
            </CardContent>
          </Card>

          {/* Connection to other concepts */}
          <Card>
            <CardHeader>
              <CardTitle>Related Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <Link to="/concepts/agent-memory-systems" className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors block">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-cyan-500" />
                    Agent Memory Systems
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Working, episodic, semantic memory—the storage layer context engineering relies on.</p>
                </Link>
                <Link to="/concepts/data-knowledge-operations" className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors block">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-sky-500" />
                    Data & Knowledge Ops
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Trustworthy data supply chains and governance for durable agent context.</p>
                </Link>
                <Link to="/concepts/agentic-prompting-fundamentals" className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors block">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-blue-500" />
                    Prompting Fundamentals
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Where prompt engineering ends and context engineering begins.</p>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Ladder */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" /> Challenge Yourself
              </h3>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                  <span className="inline-block px-2 py-0.5 text-xs border border-green-500/30 rounded bg-green-500/10 mb-2">Beginner</span>
                  <p className="text-sm text-muted-foreground">
                    Take the mini pipeline above, swap the random embedding with a real one (e.g., OpenAI or sentence-transformers), and
                    observe how relevance ranking changes when you query "How does attention work?"
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <span className="inline-block px-2 py-0.5 text-xs border border-blue-500/30 rounded bg-blue-500/10 mb-2">Intermediate</span>
                  <p className="text-sm text-muted-foreground">
                    Add a self-baking summarization step that uses an LLM to generate a one-sentence summary for each chunk.
                    Measure whether searching on summaries improves recall compared to searching on raw text.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-500/5">
                  <span className="inline-block px-2 py-0.5 text-xs border border-purple-500/30 rounded bg-purple-500/10 mb-2">Advanced</span>
                  <p className="text-sm text-muted-foreground">
                    Design a token-budget optimizer that dynamically allocates context window space across system prompt, user history,
                    RAG chunks, and tool results. Define a priority function and demonstrate how it adapts when the context window shrinks from 128K to 8K.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    /* ─── Tab 5: References ─── */
    {
      id: 'references',
      title: 'References',
      description: 'Papers, talks, and further reading',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <ReferenceSection type="concept" itemId="context-engineering" />
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="context-engineering"
      title="Context Engineering"
      description="Reduce information entropy between human intent and machine action—collect, compress, organize, and select the right context at the right time."
      tabs={tabs}
      estimatedTime="40-50 min"
      concepts={['Context Pipeline', 'Self-Baking', 'Proactive Inference', 'KV Caching', 'Context Isolation']}
      nextConcept={{
        id: 'agent-memory-systems',
        title: 'Agent Memory Systems',
        description: 'Working, short-term, long-term, episodic, semantic—build agents that remember across sessions.'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
