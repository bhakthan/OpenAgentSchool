import { useEffect, useState } from 'react';

export interface FineTuningMetricPoint {
  step: number;
  winRate?: number;      // DPO win rate
  kl?: number;           // KL divergence vs ref
  reward?: number;       // RFT reward mean
  styleLoss?: number;    // SFT validation loss proxy
}

interface UseFineTuningMetricsOptions {
  simulate?: boolean; // deprecated alias for enabled
  enabled?: boolean;  // new canonical flag
  intervalMs?: number;
  maxPoints?: number;
  resetOnDisable?: boolean;
}

export function useFineTuningMetrics({ simulate = true, enabled, intervalMs = 1500, maxPoints = 40, resetOnDisable = true }: UseFineTuningMetricsOptions = {}) {
  const active = enabled !== undefined ? enabled : simulate;
  const [data, setData] = useState<FineTuningMetricPoint[]>([]);

  useEffect(() => {
    if (!active) {
      if (resetOnDisable) setData([]);
      return;
    }
    const start = Date.now();
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setData(prev => {
        const baseWin = Math.min(0.55 + step * 0.005 + Math.random() * 0.02, 0.9);
        const baseKL = Math.max(0.02 + Math.sin(step / 9) * 0.01 + Math.random() * 0.002, 0.005);
        const baseReward = Math.min(0.2 + step * 0.01 + Math.random() * 0.05, 2.5);
        const styleLoss = Math.max(1.2 - step * 0.02 + Math.random() * 0.03, 0.15);
        const next: FineTuningMetricPoint = {
          step,
          winRate: Number(baseWin.toFixed(3)),
          kl: Number(baseKL.toFixed(4)),
          reward: Number(baseReward.toFixed(3)),
          styleLoss: Number(styleLoss.toFixed(3))
        };
        const updated = [...prev, next];
        if (updated.length > maxPoints) updated.shift();
        return updated;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs, maxPoints, resetOnDisable]);

  return { data, running: active };
}
