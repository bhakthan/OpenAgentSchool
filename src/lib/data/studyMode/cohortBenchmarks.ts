// Cohort benchmark mock aggregator (#16)
export interface CohortMetric { patternId: string; metric: 'correctness'|'riskAlignment'|'efficiency'; value: number; }
export interface CohortBenchmarks { medians: Record<string, number>; percentiles: Record<string, { p25: number; p75: number }>; }

export function computeLocalPercentile(local: number, sample: number[]): number {
  const sorted = [...sample].sort((a,b)=>a-b);
  let rank = sorted.findIndex(v => v > local);
  if (rank === -1) rank = sorted.length;
  return (rank / sorted.length) * 100;
}

export function mockBenchmark(patternId: string, localScores: number[]): { percentile: number; deltaFromMedian: number } {
  // Generate synthetic cohort distribution around 0.6–0.8
  const sample = Array.from({ length: 40 }, () => 0.55 + Math.random()*0.25);
  const local = localScores.length ? localScores.reduce((a,b)=>a+b,0)/localScores.length : 0;
  const percentile = computeLocalPercentile(local, sample);
  const median = sample.sort((a,b)=>a-b)[Math.floor(sample.length/2)];
  return { percentile, deltaFromMedian: local - median };
}
