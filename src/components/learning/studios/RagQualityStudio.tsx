import React, { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { runRag, toSummary, type RagConfig, type RagDoc, type RagQuery } from '@/lib/rag/simpleRag';
import { progressStore, type ModuleId, type SummaryMetrics, type StudioRunRecord } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';
import corpus from '@/data/studios/rag-corpus.json';
import queries from '@/data/studios/rag-queries.json';

const PRESETS: RagConfig[] = [
  { name: 'Small Fast', chunkSize: 20, overlap: 2, topK: 2 },
  { name: 'Balanced', chunkSize: 40, overlap: 8, topK: 3 },
  { name: 'Thorough', chunkSize: 60, overlap: 15, topK: 4 },
];

interface Props { moduleId: ModuleId; studioId: string; }

const RagQualityStudio: React.FC<Props> = ({ moduleId, studioId }) => {
  const docs = useMemo(() => corpus as RagDoc[], []);
  const qs = useMemo(() => queries as RagQuery[], []);
  const [results, setResults] = useState<Array<{ cfg: RagConfig; summary: SummaryMetrics }>>([]);
  const [bestIdx, setBestIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const runAll = () => {
    trackEvent({ action: 'run_assessment', category: 'learning_studio', label: 'rag_quality' });
    setBusy(true);
    try {
      const out = PRESETS.map(cfg => {
        const r = runRag(docs, qs, cfg);
        return { cfg, summary: toSummary(r) };
      });
      setResults(out);
      setBestIdx(selectBest(out));
    } finally { setBusy(false); }
  };

  const save = () => {
    if (bestIdx == null) return;
    const best = results[bestIdx];
    const id = `${studioId}-${Date.now()}`;
    const rec: StudioRunRecord = { id, at: Date.now(), after: best.summary, notes: `Selected ${best.cfg.name}` };
    progressStore.addStudioRun(moduleId, studioId, rec);
    // score favors accuracy (70), then p95 inverse (20), then cost (10)
    const acc = best.summary.accuracy * 0.7;
    const lat = Math.max(0, 100 - Math.min(100, best.summary.p95 / 20)) * 0.2;
    const cost = Math.max(0, 100 - Math.min(100, best.summary.costUsd * 1000)) * 0.1;
    progressStore.setStudioScore(moduleId, studioId, Math.round(acc + lat + cost));
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">RAG Quality Studio</div>
        <div className="text-xs text-muted-foreground">Compare 3 configs; select best under budget.</div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" onClick={runAll} disabled={busy}>Run 3 Configs</Button>
        <Button size="sm" variant="outline" onClick={save} disabled={bestIdx == null}>Save Selection</Button>
      </div>
      {results.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-3">
          {results.map((r, idx) => (
            <div key={idx} className={`rounded border p-3 ${bestIdx === idx ? 'ring-2 ring-green-500' : ''}`}
                 onClick={() => setBestIdx(idx)} role="button" tabIndex={0}>
              <div className="font-medium mb-1">{r.cfg.name}</div>
              <ul className="text-sm text-muted-foreground mb-2">
                <li>Chunk: {r.cfg.chunkSize}, Overlap: {r.cfg.overlap}, topK: {r.cfg.topK}</li>
              </ul>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Metric label="Accuracy %" value={r.summary.accuracy} goodHigh />
                <Metric label="p95 ms" value={r.summary.p95} />
                <Metric label="Tokens In" value={r.summary.tokensIn} />
                <Metric label="Cost $" value={r.summary.costUsd} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">Run the three presets to compare accuracy, latency, and cost.</div>
      )}
    </div>
  );
};

const Metric: React.FC<{ label: string; value: number; goodHigh?: boolean }> = ({ label, value }) => (
  <div className="rounded border p-2">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="font-semibold">{typeof value === 'number' ? value : '-'}</div>
  </div>
);

function selectBest(arr: Array<{ summary: SummaryMetrics }>): number | null {
  if (!arr.length) return null;
  let best = 0; let bestScore = -1;
  for (let i = 0; i < arr.length; i++) {
    const s = arr[i].summary;
    const score = s.accuracy * 0.7 + Math.max(0, 100 - Math.min(100, s.p95 / 20)) * 0.2 + Math.max(0, 100 - Math.min(100, s.costUsd * 1000)) * 0.1;
    if (score > bestScore) { bestScore = score; best = i; }
  }
  return best;
}

export default RagQualityStudio;
