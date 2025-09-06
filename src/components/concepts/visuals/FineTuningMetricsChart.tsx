import React, { useState } from 'react';
import { useFineTuningMetrics } from '../hooks/useFineTuningMetrics';
import { Play, Pause } from '@phosphor-icons/react';

interface Props { height?: number; autostart?: boolean; }

// Lightweight SVG line chart (no external dep) for winRate & reward vs step
export const FineTuningMetricsChart: React.FC<Props> = ({ height = 220, autostart = false }) => {
  const [started, setStarted] = useState(autostart);
  const { data, running } = useFineTuningMetrics({ enabled: started, intervalMs: 1200 });
  const w = 640; // bigger visual
  const h = height;
  const pad = 32;
  const steps = data.map(d => d.step);
  const maxStep = steps.length ? Math.max(...steps) : 1;
  const winVals = data.map(d => d.winRate || 0);
  const rewardVals = data.map(d => d.reward || 0);
  const klVals = data.map(d => d.kl || 0);
  const lossVals = data.map(d => d.styleLoss || 0);
  const maxReward = Math.max(...rewardVals, 1);
  const maxWin = 1;
  const maxKL = Math.max(...klVals, 0.05);
  const maxLoss = Math.max(...lossVals, 1.2);
  const scaleX = (s: number) => pad + (s / maxStep) * (w - pad * 2);
  const linePath = (vals: number[], max: number) => vals.map((v, i) => `${i===0 ? 'M':'L'}${scaleX(steps[i])},${h - pad - (v / max) * (h - pad * 2)}`).join(' ');

  return (
    <div className="border rounded-xl p-6 bg-background/60 backdrop-blur-sm max-w-[1000px] mx-auto relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid-small dark:bg-grid-small-dark" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h4 className="text-sm md:text-base font-semibold tracking-wide">Evaluation Metrics Simulation</h4>
            <button onClick={() => setStarted(s => !s)} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border bg-background/70 hover:bg-background transition">
              {started ? <><Pause className="w-3 h-3"/>Pause</> : <><Play className="w-3 h-3"/>Start</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] leading-tight">
            <span className="flex items-center gap-1" title="Preference win-rate"><span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>Win-Rate</span>
            <span className="flex items-center gap-1" title="Average scalar reward"><span className="w-3 h-3 bg-indigo-500 rounded-sm"></span>Reward</span>
            <span className="flex items-center gap-1" title="KL divergence to reference model"><span className="w-3 h-3 bg-amber-500 rounded-sm"></span>KL</span>
            <span className="flex items-center gap-1" title="Supervised validation loss"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span>SFT Loss</span>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <svg width={w} height={h} className="min-w-[640px]">
            <rect x={0} y={0} width={w} height={h} rx={8} className="fill-transparent" />
            {data.length > 1 && <>
              <path d={linePath(winVals, maxWin)} stroke="#10b981" strokeWidth={2} fill="none" />
              <path d={linePath(rewardVals, maxReward)} stroke="#6366f1" strokeWidth={1.8} fill="none" />
              <path d={linePath(klVals, maxKL)} stroke="#f59e0b" strokeWidth={1.4} fill="none" strokeDasharray="4 3" />
              <path d={linePath(lossVals, maxLoss)} stroke="#f43f5e" strokeWidth={1.4} fill="none" strokeDasharray="5 3" />
            </>}
            {/* axes */}
            <line x1={pad} y1={h-pad} x2={w-pad} y2={h-pad} stroke="currentColor" strokeWidth={0.5} className="opacity-40" />
            <line x1={pad} y1={pad} x2={pad} y2={h-pad} stroke="currentColor" strokeWidth={0.5} className="opacity-40" />
          </svg>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-[12px]">
          <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/30"><span className="font-semibold">Win-Rate</span><div>{winVals.length ? (winVals[winVals.length-1]*100).toFixed(1) : '--'}%</div></div>
          <div className="p-2 rounded-md bg-indigo-500/10 border border-indigo-500/30"><span className="font-semibold">Reward</span><div>{rewardVals.length ? rewardVals[rewardVals.length-1].toFixed(2) : '--'}</div></div>
            <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/30"><span className="font-semibold">KL</span><div>{klVals.length ? klVals[klVals.length-1].toFixed(3) : '--'}</div></div>
          <div className="p-2 rounded-md bg-rose-500/10 border border-rose-500/30"><span className="font-semibold">SFT Loss</span><div>{lossVals.length ? lossVals[lossVals.length-1].toFixed(2) : '--'}</div></div>
        </div>
        <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground">
          <p><span className="font-semibold text-emerald-600">Win-Rate</span> – % of preference comparisons where this policy beats the reference. Rising from ~50% toward ~70%+ indicates substantive alignment gains.</p>
          <p><span className="font-semibold text-indigo-500">Reward</span> – Mean scalar objective (learned or rule-based). Should climb while KL stays bounded.</p>
          <p><span className="font-semibold text-amber-500">KL Divergence</span> – Distance from reference distribution. Too high → drift/regression risk; too low → under-learning. Keep within target band.</p>
          <p><span className="font-semibold text-rose-500">SFT Loss</span> – Held‑out supervised loss to detect forgetting. Spike upward? Re-mix SFT data or raise KL penalty.</p>
          <p className="italic text-[12px]">Simulated values for pedagogy only.</p>
        </div>
        {!started && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
            <button onClick={() => setStarted(true)} className="px-6 py-3 text-sm font-semibold rounded-md bg-primary text-primary-foreground shadow hover:shadow-md transition">Start Simulation</button>
          </div>
        )}
      </div>
    </div>
  );
};
