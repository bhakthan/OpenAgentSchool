import React, { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { runTestSuite, type TestCase } from '@/lib/eval/harness';
import { progressStore, type ModuleId, type SummaryMetrics, type StudioRunRecord } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';

import sample from '@/data/studios/eval-harness-sample.json';

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
  const dnum = delta ? parseFloat(delta.replace(/[+−]/g, '')) : 0;
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

interface Props {
  moduleId: ModuleId;
  studioId: string;
}

const EvalHarnessStudio: React.FC<Props> = ({ moduleId, studioId }) => {
  const testset = useMemo(() => sample as TestCase[], []);
  const [before, setBefore] = useState<SummaryMetrics | undefined>();
  const [after, setAfter] = useState<SummaryMetrics | undefined>();
  const [busy, setBusy] = useState(false);

  const run = async (which: 'baseline' | 'current') => {
    trackEvent({ action: 'run_evaluation', category: 'learning_studio', label: `eval_harness_${which}` });
    setBusy(true);
    try {
      const quality = which === 'baseline' ? 0.6 : 0.86;
      const speed = which === 'baseline' ? 0.6 : 0.8;
      const result = await runTestSuite(testset, { quality, speed });
      if (which === 'baseline') setBefore(result.summary);
      else setAfter(result.summary);
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    if (!after) return;
    const id = `${studioId}-${Date.now()}`;
    const delta = before ? diff(after, before) : undefined;
    const rec: StudioRunRecord = { id, at: Date.now(), before, after, delta };
    progressStore.addStudioRun(moduleId, studioId, rec);
    // compute a simple score: weight accuracy 60, safety 20, latency 20 (p95 inverted)
    const accScore = clamp(after.accuracy, 0, 100) * 0.6;
    const safScore = clamp(after.safety, 0, 100) * 0.2;
    const latScore = Math.max(0, 100 - clamp(after.p95 / 20, 0, 100)) * 0.2; // 0..100 from p95
    const total = Math.round(accScore + safScore + latScore);
    progressStore.setStudioScore(moduleId, studioId, total);
  };

  const readyToSave = !!after;

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Eval Harness Studio</div>
        <div className="text-xs text-muted-foreground">Run baseline, then current; compare deltas.</div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" onClick={() => run('baseline')} disabled={busy}>Run Baseline</Button>
        <Button size="sm" variant="secondary" onClick={() => run('current')} disabled={busy}>Run Current</Button>
        <Button size="sm" variant="outline" onClick={save} disabled={!readyToSave}>Save Results</Button>
      </div>
      {before && <Cards title="Baseline" m={before} />}
      {after && <Cards title="Current" m={after} before={before} />}
      {!before && !after && (
        <div className="text-sm text-muted-foreground">Use the buttons above to generate metrics from the sample test set (8 cases).</div>
      )}
    </div>
  );
};

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

function clamp(n: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, n)); }

export default EvalHarnessStudio;
