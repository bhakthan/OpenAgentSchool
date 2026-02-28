import React, { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { runTestSuite, type TestCase } from '@/lib/eval/harness';
import { progressStore, type ModuleId, type SummaryMetrics, type StudioRunRecord } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';
import sample from '@/data/studios/eval-harness-sample.json';

interface Props { moduleId: ModuleId; studioId: string; }

const HitlStudio: React.FC<Props> = ({ moduleId, studioId }) => {
  const testset = useMemo(() => sample as TestCase[], []);
  const [base, setBase] = useState<SummaryMetrics | undefined>();
  const [after, setAfter] = useState<SummaryMetrics | undefined>();
  const [busy, setBusy] = useState(false);

  // Controls
  const [reviewRate, setReviewRate] = useState(30); // % of cases sent to human
  const [effectiveness, setEffectiveness] = useState(70); // % of incorrect corrected by reviewer
  const [reviewLatencyMs, setReviewLatencyMs] = useState(400); // added per reviewed case

  const runWithoutHitl = async () => {
    setBusy(true);
    try {
      const res = await runTestSuite(testset, { quality: 0.82, speed: 0.85 });
      setBase(res.summary);
    } finally { setBusy(false); }
  };

  const runWithHitl = async () => {
    trackEvent({ action: 'submit_decision', category: 'learning_studio', label: 'hitl' });
    setBusy(true);
    try {
      const res = await runTestSuite(testset, { quality: 0.82, speed: 0.85 });
      // Apply sampling and corrections
      const rate = Math.max(0, Math.min(100, reviewRate)) / 100;
      const eff = Math.max(0, Math.min(100, effectiveness)) / 100;
      const cases = res.cases.map((c, idx) => {
        const reviewed = (idx / res.cases.length) < rate;
        let pass = c.pass;
        if (reviewed && !c.pass) {
          // reviewer corrects some incorrect cases
          pass = Math.random() < eff ? true : false;
        }
        const latencyMs = c.latencyMs + (reviewed ? reviewLatencyMs : 0);
        return { ...c, pass, latencyMs };
      });
      const summary = summarize(cases);
      setAfter(summary);
    } finally { setBusy(false); }
  };

  const save = () => {
    if (!after) return;
    const id = `${studioId}-${Date.now()}`;
    const rec: StudioRunRecord = { id, at: Date.now(), before: base, after, delta: base ? diff(after, base) : undefined };
    progressStore.addStudioRun(moduleId, studioId, rec);
    if (base) {
      const qualityUplift = Math.max(0, after.accuracy - base.accuracy); // percent points
      const latencyPenalty = Math.max(0, after.p95 - base.p95);
      const qScore = Math.min(100, qualityUplift) * 0.8;
      const lScore = Math.max(0, 100 - Math.min(100, latencyPenalty / 10)) * 0.2; // 10ms -> 1pt penalty
      progressStore.setStudioScore(moduleId, studioId, Math.round(qScore + lScore));
    }
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">HITL Studio</div>
        <div className="text-xs text-muted-foreground">Add review step; measure error reduction vs latency.</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-3 text-sm">
        <div className="rounded border p-2">
          <div className="text-xs text-muted-foreground">Review sampling</div>
          <div className="flex items-center gap-2">
            <input type="range" min={0} max={100} value={reviewRate} onChange={e => setReviewRate(parseInt(e.target.value))} />
            <span className="text-xs">{reviewRate}%</span>
          </div>
        </div>
        <div className="rounded border p-2">
          <div className="text-xs text-muted-foreground">Reviewer effectiveness</div>
          <div className="flex items-center gap-2">
            <input type="range" min={0} max={100} value={effectiveness} onChange={e => setEffectiveness(parseInt(e.target.value))} />
            <span className="text-xs">{effectiveness}%</span>
          </div>
        </div>
        <div className="rounded border p-2">
          <div className="text-xs text-muted-foreground">Review latency per case</div>
          <div className="flex items-center gap-2">
            <input type="range" min={0} max={1000} step={50} value={reviewLatencyMs} onChange={e => setReviewLatencyMs(parseInt(e.target.value))} />
            <span className="text-xs">{reviewLatencyMs} ms</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" onClick={runWithoutHitl} disabled={busy}>Run Without HITL</Button>
        <Button size="sm" variant="secondary" onClick={runWithHitl} disabled={busy}>Run With HITL</Button>
        <Button size="sm" variant="outline" onClick={save} disabled={!after}>Save Results</Button>
      </div>

      {base && <Cards title="No HITL" m={base} />}
      {after && <Cards title="With HITL" m={after} before={base} />}
      {!base && !after && <div className="text-sm text-muted-foreground">Run a baseline, then add HITL to see quality uplift and latency overhead.</div>}
      <RunHistory moduleId={moduleId} studioId={studioId} />
    </div>
  );
};

const Cards: React.FC<{ title: string; m: SummaryMetrics; before?: SummaryMetrics }> = ({ title, m, before }) => {
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
            <div key={r.id} className="p-2 text-sm grid grid-cols-4 gap-2">
              <HistoryMetric label="Acc%" before={r.before?.accuracy} after={r.after?.accuracy} />
              <HistoryMetric label="p95" before={r.before?.p95} after={r.after?.p95} invert />
              <HistoryMetric label="Tokens" before={r.before?.tokensIn} after={r.after?.tokensIn} invert />
              <HistoryMetric label="Cost$" before={r.before?.costUsd} after={r.after?.costUsd} invert />
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

function summarize(cases: Array<{ pass: boolean; latencyMs: number; tokensIn: number; tokensOut: number }>): SummaryMetrics {
  const n = cases.length || 1;
  const acc = (cases.filter(c => c.pass).length / n) * 100;
  const latencies = cases.map(c => c.latencyMs).sort((a, b) => a - b);
  const p50 = latencies[Math.floor((latencies.length - 1) * 0.5)] || 0;
  const p95 = latencies[Math.floor((latencies.length - 1) * 0.95)] || 0;
  const tokensIn = cases.reduce((s, c) => s + c.tokensIn, 0);
  const tokensOut = cases.reduce((s, c) => s + c.tokensOut, 0);
  const costUsd = (tokensIn + tokensOut) * 0.000002;
  return { accuracy: round(acc), safety: 100, p50, p95, tokensIn, tokensOut, costUsd: round(costUsd, 6) };
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

function round(n: number, d = 2): number { const f = Math.pow(10, d); return Math.round(n * f) / f; }

export default HitlStudio;
