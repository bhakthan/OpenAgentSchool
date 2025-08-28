import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MagnifyingGlass, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function RAGSystems({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Retrieval‑Augmented Generation (RAG)</CardTitle>
          <CardDescription className="text-base">
            High-precision retrieval, chunking, and ranking to ground LLMs
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MagnifyingGlass className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Build reliable RAG pipelines</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="RAG pipeline"
              steps={["Ingest", "Chunk", "Retrieve", "Re‑rank", "Synthesize", "Cite"]}
              highlightIndices={[2,3,5]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Ingestion & Chunking</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Structure-aware chunking (headings, tables, code)</li>
              <li>Store rich metadata; source and section anchors</li>
              <li>Deduplication; update and delete handling</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Retrieval & Ranking</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Hybrid search (BM25 + embeddings)</li>
              <li>Re-ranking (cross-encoder) for top‑k precision</li>
              <li>Query rewriting for recall</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Grounding & Attributions</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Inline citations with URLs/anchors</li>
              <li>Refusal on low-confidence retrieval</li>
              <li>Answer synthesis constrained to sources</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Freshness & Drift</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Incremental updates; change feeds</li>
              <li>Staleness alerts; cache invalidation</li>
              <li>Eval grounding coverage and hallucination rate</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <CardTitle>Studio Lab: Hybrid + Re‑rank RAG</CardTitle>
          </div>
          <CardDescription>Implement a pipeline with BM25 + embeddings + cross‑encoder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Ingest docs with structure-aware chunking</li>
            <li>Run hybrid retrieval; re‑rank top‑k</li>
            <li>Ground answers with citations; refuse on low confidence</li>
            <li>Evaluate grounding coverage and hallucinations</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>≥ 10–15% precision@k improvement vs baseline</li>
                <li>Hallucination rate below target</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Tables/code blocks with poor embeddings</li>
                <li>Ambiguous queries; low recall scenarios</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs & Anti‑patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <CardTitle>KPIs and Anti‑patterns</CardTitle>
          </div>
          <CardDescription>Grounded answers users can trust</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Precision@k / MRR</li>
              <li>Grounding coverage</li>
              <li>Hallucination rate</li>
              <li>Freshness SLA adherence</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Embedding-only retrieval for all cases</li>
              <li>No citations or confidence signaling</li>
              <li>Unbounded context stuffing</li>
              <li>No update pipeline; stale knowledge</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=rag-systems&type=socratic')}
            aria-label="Start micro-assessment for RAG Systems">
            Micro‑assessment
          </Button>
          <Button variant="outline" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=rag-systems&type=scenario')}
            aria-label="Try a scenario for RAG Systems">
            Try Scenario
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: Multi‑Agent Orchestration
          </Button>
        </div>
      </div>
    </div>
  )
}
