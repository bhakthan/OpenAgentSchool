import React, { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { runTestSuite, type TestCase } from '@/lib/eval/harness';
import { progressStore, type ModuleId, type SummaryMetrics, type StudioRunRecord } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';
import testset from '@/data/studios/eval-harness-sample.json';

type Pattern = 'coordinator-worker' | 'debate-critique';

interface Props { moduleId: ModuleId; studioId: string; }

const MultiAgentStudio: React.FC<Props> = ({ moduleId, studioId }) => {
  const data = useMemo(() => testset as TestCase[], []);
  const [base, setBase] = useState<SummaryMetrics | undefined>();
  const [after, setAfter] = useState<SummaryMetrics | undefined>();
  const [busy, setBusy] = useState(false);

  const [pattern, setPattern] = useState<Pattern>('coordinator-worker');
  const [workers, setWorkers] = useState(3);     // for coordinator-worker
  const [rounds, setRounds] = useState(2);       // for debate-critique
  const [panel, setPanel] = useState(2);         // number of agents debating

  const runBaseline = async () => {
    setBusy(true);
    try {
      const res = await runTestSuite(data, { quality: 0.8, speed: 0.9 });
      setBase(res.summary);
    } finally { setBusy(false); }
  };

  const runPattern = async () => {
    trackEvent({ action: 'run_simulation', category: 'learning_studio', label: 'multi_agent' });
    setBusy(true);
    try {
      const res = await runTestSuite(data, { quality: 0.8, speed: 0.9 });
      const b = res.summary;
      let a: SummaryMetrics = { ...b };
      let calls = 1;
      if (pattern === 'coordinator-worker') {
        const w = clamp(workers, 1, 6);
        const accGain = Math.min(12, w * 2.5); // diminishing
        const latAdd = 35 * w; // ms
        calls = w + 1; // coordinator + workers
        a = adjust(b, {
          accuracy: b.accuracy + accGain,
          p50: b.p50 + latAdd * 0.6,
          p95: b.p95 + latAdd,
          tokensIn: b.tokensIn * calls,
          tokensOut: b.tokensOut * calls,
        });
      } else {
        const r = clamp(rounds, 1, 4);
        const p = clamp(panel, 2, 4);
        const accGain = Math.min(18, r * 4 + (p - 2) * 2); // more debate -> higher
        const latAdd = 80 * r + 40 * (p - 2);
        calls = p * (r + 1); // each round each agent speaks once, plus final
        a = adjust(b, {
          accuracy: b.accuracy + accGain,
          p50: b.p50 + latAdd * 0.6,
          p95: b.p95 + latAdd,
          tokensIn: b.tokensIn * calls,
          tokensOut: b.tokensOut * calls,
        });
      }
      setAfter(a);
    } finally { setBusy(false); }
  };

  const save = () => {
    if (!after) return;
    const id = `${studioId}-${Date.now()}`;
    const rec: StudioRunRecord = { id, at: Date.now(), before: base, after, delta: base ? diff(after, base) : undefined };
    progressStore.addStudioRun(moduleId, studioId, rec);
    if (base) {
      // Score: accuracy uplift weighted 70%, efficiency (lower p95 and lower cost) 30%
      const accUplift = Math.max(0, after.accuracy - base.accuracy);
      const p95Delta = Math.max(0, after.p95 - base.p95);
      const costDelta = Math.max(0, after.costUsd - base.costUsd);
      const effScore = Math.max(0, 100 - normalize(p95Delta, 0, 1000) * 50 - normalize(costDelta, 0, base.costUsd * 10 + 0.01) * 50);
      const score = Math.round(Math.min(100, accUplift * 0.7 + effScore * 0.3));
      progressStore.setStudioScore(moduleId, studioId, score);
    }
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Multi‑Agent Studio</div>
        <div className="text-xs text-muted-foreground">Compare collaboration patterns; balance quality vs calls/latency.</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-3 text-sm">
        <div className="rounded border p-2">
          <div className="text-xs text-muted-foreground">Pattern</div>
          <select className="w-full text-sm border rounded p-1" value={pattern} onChange={e => setPattern(e.target.value as Pattern)}>
            <option value="coordinator-worker">Coordinator / Worker</option>
            <option value="debate-critique">Debate / Critique</option>
          </select>
        </div>

        {pattern === 'coordinator-worker' && (
          <div className="rounded border p-2">
            <div className="text-xs text-muted-foreground">Workers</div>
            <div className="flex items-center gap-2">
              <input type="range" min={1} max={6} value={workers} onChange={e => setWorkers(parseInt(e.target.value))} />
              <span className="text-xs">{workers}</span>
            </div>
          </div>
        )}

        {pattern === 'debate-critique' && (
          <>
            <div className="rounded border p-2">
              <div className="text-xs text-muted-foreground">Rounds</div>
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={4} value={rounds} onChange={e => setRounds(parseInt(e.target.value))} />
                <span className="text-xs">{rounds}</span>
              </div>
            </div>
            <div className="rounded border p-2">
              <div className="text-xs text-muted-foreground">Panel size</div>
              <div className="flex items-center gap-2">
                <input type="range" min={2} max={4} value={panel} onChange={e => setPanel(parseInt(e.target.value))} />
                <span className="text-xs">{panel}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" onClick={runBaseline} disabled={busy}>Run Baseline</Button>
        <Button size="sm" variant="secondary" onClick={runPattern} disabled={busy}>Run {pattern === 'coordinator-worker' ? 'Coordinator/Worker' : 'Debate/Critique'}</Button>
        <Button size="sm" variant="outline" onClick={save} disabled={!after}>Save Results</Button>
      </div>

      {base && <Cards title="Baseline" m={base} calls={1} />}
      {after && <Cards title="Pattern" m={after} before={base} calls={estimateCalls(after, base)} beforeCalls={1} />}
      {!base && !after && <div className="text-sm text-muted-foreground">Run baseline, then compare patterns to see tradeoffs.</div>}

      <RunHistory moduleId={moduleId} studioId={studioId} />
    </div>
  );
};

const Cards: React.FC<{ title: string; m: SummaryMetrics; before?: SummaryMetrics; calls?: number; beforeCalls?: number }> = ({ title, m, before, calls, beforeCalls }) => {
  const delta = (a?: number, b?: number, invert = false) => {
    if (a == null || b == null) return null;
    const d = (a - b) * (invert ? -1 : 1);
    const sign = d > 0 ? '+' : d < 0 ? '−' : '';
    const val = Math.abs(Math.round(d * 100) / 100);
    return `${sign}${val}`;
  };
  return (
    <div className="rounded border p-3">
      <div className="font-medium mb-2">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <Metric label="Accuracy %" value={m.accuracy} prev={before?.accuracy} delta={delta(m.accuracy, before?.accuracy)} goodHigh />
        <Metric label="p95 ms" value={m.p95} prev={before?.p95} delta={delta(m.p95, before?.p95, true)} />
        <Metric label="Tokens In" value={m.tokensIn} prev={before?.tokensIn} delta={delta(m.tokensIn, before?.tokensIn, true)} />
        <Metric label="Cost $" value={m.costUsd} prev={before?.costUsd} delta={delta(m.costUsd, before?.costUsd, true)} />
        {typeof calls === 'number' && (
          <Metric label="Est. calls" value={calls} prev={beforeCalls} delta={delta(calls, beforeCalls, true)} />
        )}
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: number; prev?: number; delta?: string | null; goodHigh?: boolean }> = ({ label, value, prev, delta, goodHigh }) => {
  const direction = delta?.startsWith('+') ? 1 : delta?.startsWith('−') ? -1 : 0;
  const good = direction === (goodHigh ? 1 : -1);
  return (
    <div className="rounded border p-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{typeof value === 'number' ? value : '-'}</div>
      {delta && <div className={`text-xs ${good ? 'text-green-600' : 'text-amber-600'}`}>Δ {delta}</div>}
      {typeof prev === 'number' && <MiniDelta before={prev} after={value} />}
    </div>
  );
};

const MiniDelta: React.FC<{ before: number; after: number }> = ({ before, after }) => {
  // simple side-by-side bars
  const max = Math.max(before, after) || 1;
  const h1 = Math.max(2, (before / max) * 16);
  const h2 = Math.max(2, (after / max) * 16);
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" className="mt-1">
      <rect x="8" y={18 - h1} width="16" height={h1} fill="#94a3b8" rx="2" />
      <rect x="36" y={18 - h2} width="16" height={h2} fill="#22c55e" rx="2" />
    </svg>
  );
};

const RunHistory: React.FC<{ moduleId: ModuleId; studioId: string }> = ({ moduleId, studioId }) => {
  const [open, setOpen] = useState(false);
  const runs = progressStore.getStudioRuns(moduleId, studioId);
  return (
    <div className="mt-3">
      <button type="button" className="text-sm underline" onClick={() => setOpen(v => !v)}>
        {open ? 'Hide' : 'Show'} Run History ({runs.length})
      </button>
      {open && (
        <div className="mt-2 rounded border divide-y">
          {runs.length === 0 && <div className="p-2 text-sm text-muted-foreground">No runs saved yet.</div>}
          {runs.map(r => (
            <div key={r.id} className="p-2 text-sm flex items-center justify-between gap-2">
              <div className="text-xs text-muted-foreground">{new Date(r.at).toLocaleString()}</div>
              <div className="grid grid-cols-4 gap-2">
                <HistoryMetric label="Acc%" before={r.before?.accuracy} after={r.after?.accuracy} />
                <HistoryMetric label="p95" before={r.before?.p95} after={r.after?.p95} invert />
                <HistoryMetric label="Cost$" before={r.before?.costUsd} after={r.after?.costUsd} invert />
                <HistoryMetric label="Calls" before={estimateCalls(r.before, r.before)} after={estimateCalls(r.after, r.before)} invert />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HistoryMetric: React.FC<{ label: string; before?: number; after?: number; invert?: boolean }> = ({ label, before, after, invert }) => {
  const show = typeof before === 'number' && typeof after === 'number';
  const delta = show ? (after - before) * (invert ? -1 : 1) : 0;
  const good = delta > 0;
  return (
    <div className="rounded border p-1">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      {show ? (
        <div className={`text-xs ${good ? 'text-green-600' : 'text-amber-600'}`}>{Math.round((after - before) * 100) / 100}</div>
      ) : (
        <div className="text-xs">-</div>
      )}
    </div>
  );
};

function adjust(base: SummaryMetrics, patch: Partial<SummaryMetrics>): SummaryMetrics {
  const tokensIn = patch.tokensIn ?? base.tokensIn;
  const tokensOut = patch.tokensOut ?? base.tokensOut;
  const costUsd = (tokensIn + tokensOut) * 0.000002;
  return {
    accuracy: round(patch.accuracy ?? base.accuracy),
    safety: round(patch.safety ?? base.safety),
    p50: round(patch.p50 ?? base.p50),
    p95: round(patch.p95 ?? base.p95),
    tokensIn,
    tokensOut,
    costUsd: round(costUsd, 6),
  };
}

function diff(a: SummaryMetrics, b: SummaryMetrics): Partial<Record<keyof SummaryMetrics, number>> {
  return {
    accuracy: a.accuracy - b.accuracy,
    safety: a.safety - b.safety,
    p50: a.p50 - b.p50,
    p95: a.p95 - b.p95,
    tokensIn: a.tokensIn - b.tokensIn,
    tokensOut: a.tokensOut - b.tokensOut,
    costUsd: a.costUsd - b.costUsd,
  };
}

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
function round(n: number, d = 2): number { const f = Math.pow(10, d); return Math.round(n * f) / f; }
function normalize(n: number, a: number, b: number) { if (b === a) return 0; return Math.max(0, Math.min(1, (n - a) / (b - a))); }

function estimateCalls(a?: SummaryMetrics, base?: SummaryMetrics) {
  if (!a || !base) return undefined;
  if (!base.tokensIn) return undefined;
  const ratio = a.tokensIn / base.tokensIn;
  return Math.max(1, Math.round(ratio));
}

export default MultiAgentStudio;
