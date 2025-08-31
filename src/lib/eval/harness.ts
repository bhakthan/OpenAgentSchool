import type { SummaryMetrics } from '@/lib/learning/progressStore';

export interface TestCase {
  id: string;
  input: string;
  expected: string;
}

export interface CaseResult {
  id: string;
  expected: string;
  output: string;
  pass: boolean;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  safetyFlag: boolean;
}

export interface RunResult {
  cases: CaseResult[];
  summary: SummaryMetrics;
}

export interface RunnerOptions {
  quality: number; // 0..1 chance to be correct
  speed: number;   // 0..1 lower means slower
}

// simple seeded hash for deterministic pseudo randomness per case + salt
function hashToUnit(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // map to [0,1)
  return (h >>> 0) / 4294967296;
}

const BANNED = [/password/i, /hate/i, /kill/i, /leak/i];

export async function runTestSuite(testset: TestCase[], opts: RunnerOptions): Promise<RunResult> {
  const cases: CaseResult[] = [];
  for (const tc of testset) {
    const r = hashToUnit(tc.id + ':' + tc.input + ':' + opts.quality.toFixed(2));
    const correct = r < opts.quality;
    const output = correct ? tc.expected : 'unknown';
    const safetyFlag = BANNED.some(rx => rx.test(output)) || /attack|jailbreak|exploit/i.test(tc.input);
    const baseLatency = 120 + Math.floor(800 * (1 - opts.speed));
    const latencyJitter = Math.floor(300 * r);
    const latencyMs = baseLatency + latencyJitter;
    const tokensIn = Math.max(8, Math.min(200, Math.floor(tc.input.length / 4)));
    const tokensOut = Math.max(6, Math.min(200, Math.floor(output.length / 4)));
    cases.push({ id: tc.id, expected: tc.expected, output, pass: correct, latencyMs, tokensIn, tokensOut, safetyFlag });
  }
  const summary = summarize(cases);
  return { cases, summary };
}

function summarize(cases: CaseResult[]): SummaryMetrics {
  const n = cases.length || 1;
  const acc = (cases.filter(c => c.pass).length / n) * 100;
  const safe = (cases.filter(c => !c.safetyFlag).length / n) * 100;
  const latencies = cases.map(c => c.latencyMs).sort((a, b) => a - b);
  const p50 = percentile(latencies, 0.5);
  const p95 = percentile(latencies, 0.95);
  const tokensIn = cases.reduce((s, c) => s + c.tokensIn, 0);
  const tokensOut = cases.reduce((s, c) => s + c.tokensOut, 0);
  const costUsd = (tokensIn + tokensOut) * 0.000002; // pretend $2 per 1M tokens
  return { accuracy: round(acc), safety: round(safe), p50, p95, tokensIn, tokensOut, costUsd: round(costUsd, 6) };
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))));
  return sorted[idx];
}

function round(n: number, d = 2): number {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
}
