import React, { useMemo, useState } from 'react';
import { runTestSuite, type TestCase, type CaseResult } from '@/lib/eval/harness';
import { progressStore, type ModuleId, type SummaryMetrics, type StudioRunRecord } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';
import sample from '@/data/studios/eval-harness-sample.json';

interface Props {
  moduleId: ModuleId;
  studioId: string;
}

const CostGuardrailStudio: React.FC<Props> = ({ moduleId, studioId }) => {
  const testset = useMemo(() => sample as TestCase[], []);
  const [baseline, setBaseline] = useState<SummaryMetrics | undefined>();
  const [after, setAfter] = useState<SummaryMetrics | undefined>();
  const [busy, setBusy] = useState(false);

  // Controls
  const [useCache, setUseCache] = useState(true);
  const [cacheHit, setCacheHit] = useState(40); // %
  const [useTrunc, setUseTrunc] = useState(true);
  const [truncPct, setTruncPct] = useState(20); // % reduce tokensIn
  const [useThresh, setUseThresh] = useState(false);
  const [thresh, setThresh] = useState(0.3); // 0..1

  const runBaseline = async () => {
    setBusy(true);
    try {
      const res = await runTestSuite(testset, { quality: 0.85, speed: 0.8 });
      setBaseline(res.summary);
    } finally { setBusy(false); }
  };

  const runGuardrailed = async () => {
    setBusy(true);
    try {
      const res = await runTestSuite(testset, { quality: 0.85, speed: 0.8 });
      let cases = res.cases;
      // Apply caching: reduce tokens and latency on a portion of cases
      if (useCache && cacheHit > 0) {
        const hitRate = Math.max(0, Math.min(100, cacheHit)) / 100;
        cases = cases.map((c, idx) => {
          const hit = (idx / cases.length) < hitRate;
          if (!hit) return c;
          return {
            ...c,
            latencyMs: Math.round(c.latencyMs * 0.5),
            tokensIn: Math.round(c.tokensIn * 0.2),
            tokensOut: Math.round(c.tokensOut * 0.2),
          };
        });
      }
      // Apply truncation: reduce tokensIn, potential accuracy drop if too aggressive
      if (useTrunc && truncPct > 0) {
        const pct = Math.max(0, Math.min(90, truncPct)) / 100;
        const accPenalty = pct > 0.3 ? 0.08 : pct > 0.15 ? 0.03 : 0; // 8% or 3% hit
        cases = cases.map((c) => {
          const pass = accPenalty > 0 && c.pass ? Math.random() > accPenalty : c.pass;
          return {
            ...c,
            pass,
            tokensIn: Math.max(1, Math.round(c.tokensIn * (1 - pct))),
          };
        });
      }
      // Apply retrieval threshold: small token savings, small accuracy impact if high
      if (useThresh) {
        const tokenSave = thresh > 0.6 ? 0.15 : thresh > 0.4 ? 0.1 : 0.05;
        const accPenalty = thresh > 0.6 ? 0.05 : 0.02;
        cases = cases.map((c, idx) => {
          const pass = accPenalty > 0 && c.pass && (idx % 3 === 0) ? (Math.random() > accPenalty) : c.pass;
          return {
            ...c,
            pass,
            tokensIn: Math.max(1, Math.round(c.tokensIn * (1 - tokenSave))),
          };
        });
      }
      const summary = summarize(cases);
      setAfter(summary);
    } finally { setBusy(false); }
  };

  const save = () => {
    if (!after) return;
    const id = `${studioId}-${Date.now()}`;
    const rec: StudioRunRecord = { id, at: Date.now(), before: baseline, after, delta: baseline ? diff(after, baseline) : undefined };
    progressStore.addStudioRun(moduleId, studioId, rec);
    if (baseline) {
      const costImprove = ratioGain(baseline.costUsd, after.costUsd);
      const latencyImprove = ratioGain(baseline.p95, after.p95);
      const quality = after.accuracy * 0.5 + after.safety * 0.2; // 70% weight
      const costScore = Math.max(0, Math.min(100, Math.round(costImprove * 100))) * 0.2; // 20%
      const latScore = Math.max(0, Math.min(100, Math.round(latencyImprove * 100))) * 0.1; // 10%
      const total = Math.round(Math.min(100, quality * 0.7 + costScore + latScore));
      progressStore.setStudioScore(moduleId, studioId, total);
    }
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Cost Guardrail Studio</div>
        <div className="text-xs text-muted-foreground">Tune controls; reduce cost while keeping quality.</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-3 text-sm">
        <div className="rounded border p-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={useCache} onChange={e => setUseCache(e.target.checked)} />
            Enable caching
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Hit rate</span>
            <input type="range" min={0} max={100} value={cacheHit} onChange={e => setCacheHit(parseInt(e.target.value))} />
            <span className="text-xs">{cacheHit}%</span>
          </div>
        </div>
        <div className="rounded border p-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={useTrunc} onChange={e => setUseTrunc(e.target.checked)} />
            Enable truncation
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Reduce tokens</span>
            <input type="range" min={0} max={50} value={truncPct} onChange={e => setTruncPct(parseInt(e.target.value))} />
            <span className="text-xs">{truncPct}%</span>
          </div>
        </div>
        <div className="rounded border p-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={useThresh} onChange={e => setUseThresh(e.target.checked)} />
            Apply retrieval threshold
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Threshold</span>
            <input type="range" step={0.05} min={0} max={1} value={thresh} onChange={e => setThresh(parseFloat(e.target.value))} />
            <span className="text-xs">{thresh.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" onClick={runBaseline} disabled={busy}>Run Baseline</Button>
        <Button size="sm" variant="secondary" onClick={runGuardrailed} disabled={busy}>Run Guardrailed</Button>
        <Button size="sm" variant="outline" onClick={save} disabled={!after}>Save Results</Button>
      </div>

      {baseline && <Cards title="Baseline" m={baseline} />}
      {after && <Cards title="Guardrailed" m={after} before={baseline} />}
      {!baseline && !after && (
        <div className="text-sm text-muted-foreground">Run Baseline, then Guardrailed to compare cost/latency and quality.</div>
      )}
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
        <Metric label="Accuracy %" value={m.accuracy} delta={delta(m.accuracy, before?.accuracy)} goodHigh />
        <Metric label="Safety %" value={m.safety} delta={delta(m.safety, before?.safety)} goodHigh />
        <Metric label="p50 ms" value={m.p50} delta={delta(m.p50, before?.p50, true)} />
        <Metric label="p95 ms" value={m.p95} delta={delta(m.p95, before?.p95, true)} />
        <Metric label="Tokens In" value={m.tokensIn} delta={delta(m.tokensIn, before?.tokensIn, true)} />
        <Metric label="Tokens Out" value={m.tokensOut} delta={delta(m.tokensOut, before?.tokensOut, true)} />
        <Metric label="Cost $" value={m.costUsd} delta={delta(m.costUsd, before?.costUsd, true)} />
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: number; delta?: string | null; goodHigh?: boolean }> = ({ label, value, delta, goodHigh }) => {
  const direction = delta?.startsWith('+') ? 1 : delta?.startsWith('−') ? -1 : 0;
  const good = direction === (goodHigh ? 1 : -1);
  return (
    <div className="rounded border p-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{typeof value === 'number' ? value : '-'}</div>
      {delta && (
        <div className={`text-xs ${good ? 'text-green-600' : 'text-amber-600'}`}>Δ {delta}</div>
      )}
    </div>
  );
};

function summarize(cases: CaseResult[]): SummaryMetrics {
  const n = cases.length || 1;
  const acc = (cases.filter(c => c.pass).length / n) * 100;
  const safe = (cases.filter(c => !c.safetyFlag).length / n) * 100;
  const latencies = cases.map(c => c.latencyMs).sort((a, b) => a - b);
  const p50 = latencies[Math.floor((latencies.length - 1) * 0.5)] || 0;
  const p95 = latencies[Math.floor((latencies.length - 1) * 0.95)] || 0;
  const tokensIn = cases.reduce((s, c) => s + c.tokensIn, 0);
  const tokensOut = cases.reduce((s, c) => s + c.tokensOut, 0);
  const costUsd = (tokensIn + tokensOut) * 0.000002;
  return { accuracy: round(acc), safety: round(safe), p50, p95, tokensIn, tokensOut, costUsd: round(costUsd, 6) };
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

function ratioGain(before: number, after: number): number {
  if (before <= 0) return 0;
  const diff = before - after;
  return Math.max(0, diff / before);
}

function round(n: number, d = 2): number { const f = Math.pow(10, d); return Math.round(n * f) / f; }

export default CostGuardrailStudio;
