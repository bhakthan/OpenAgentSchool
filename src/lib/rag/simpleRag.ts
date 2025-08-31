import type { SummaryMetrics } from '@/lib/learning/progressStore';

export interface RagDoc { id: string; text: string }
export interface RagQuery { id: string; question: string; expected: string }
export interface RagConfig { chunkSize: number; overlap: number; topK: number; name: string }

export interface RagRunResult {
  accuracy: number;
  p50: number;
  p95: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
}

export function runRag(corpus: RagDoc[], queries: RagQuery[], cfg: RagConfig): RagRunResult {
  const chunks = chunkCorpus(corpus, cfg.chunkSize, cfg.overlap);
  const vocab = buildVocab([...chunks.map(c => c.text), ...queries.map(q => q.question)]);
  const chunkVecs = chunks.map(c => ({ id: c.id, vec: vectorize(c.text, vocab), len: tokenCount(c.text) }));

  const caseStats = queries.map(q => {
    const qVec = vectorize(q.question, vocab);
    const sims = chunkVecs.map(cv => ({ id: cv.id, score: cosine(qVec, cv.vec), len: cv.len }));
    sims.sort((a, b) => b.score - a.score);
    const top = sims.slice(0, cfg.topK);
    const contextTokens = top.reduce((s, t) => s + t.len, 0);
    const answer = synthesize(top, chunks);
    const pass = includesAnswer(answer, q.expected);
    // simple latency model
    const latency = 80 + Math.round(0.05 * chunks.length + 0.01 * contextTokens);
    const tokensIn = tokenCount(q.question) + contextTokens;
    const tokensOut = tokenCount(answer);
    return { pass, latency, tokensIn, tokensOut };
  });

  const n = caseStats.length || 1;
  const accuracy = (caseStats.filter(c => c.pass).length / n) * 100;
  const latencies = caseStats.map(c => c.latency).sort((a, b) => a - b);
  const p50 = percentile(latencies, 0.5);
  const p95 = percentile(latencies, 0.95);
  const tokensIn = caseStats.reduce((s, c) => s + c.tokensIn, 0);
  const tokensOut = caseStats.reduce((s, c) => s + c.tokensOut, 0);
  const costUsd = (tokensIn + tokensOut) * 0.000002;
  return { accuracy: round(accuracy), p50, p95, tokensIn, tokensOut, costUsd: round(costUsd, 6) };
}

function chunkCorpus(corpus: RagDoc[], chunkSize: number, overlap: number) {
  const res: Array<{ id: string; text: string }> = [];
  for (const d of corpus) {
    const words = tokenize(d.text);
    let i = 0;
    while (i < words.length) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      res.push({ id: `${d.id}-${i}`, text: chunk });
      if (i + chunkSize >= words.length) break;
      i += Math.max(1, chunkSize - overlap);
    }
  }
  return res;
}

function buildVocab(texts: string[]) {
  const set = new Set<string>();
  for (const t of texts) tokenize(t).forEach(w => set.add(w));
  return Array.from(set.values());
}

function vectorize(text: string, vocab: string[]): Float32Array {
  const vec = new Float32Array(vocab.length);
  const counts = new Map<string, number>();
  tokenize(text).forEach(w => counts.set(w, (counts.get(w) || 0) + 1));
  vocab.forEach((w, i) => { const c = counts.get(w) || 0; vec[i] = c; });
  return vec;
}

function cosine(a: Float32Array, b: Float32Array): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  const denom = Math.sqrt(na) * Math.sqrt(nb) || 1;
  return dot / denom;
}

function synthesize(top: Array<{ id: string }>, chunks: Array<{ id: string; text: string }>): string {
  const texts = top.map(t => chunks.find(c => c.id === t.id)?.text || '').join(' ');
  return texts.slice(0, 120);
}

function includesAnswer(answer: string, expected: string): boolean {
  const a = normalize(answer);
  const e = normalize(expected);
  return a.includes(e);
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ');
}

function tokenize(s: string): string[] {
  return normalize(s).split(' ').filter(Boolean);
}

function tokenCount(s: string): number { return tokenize(s).length; }

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))));
  return sorted[idx];
}

function round(n: number, d = 2): number { const f = Math.pow(10, d); return Math.round(n * f) / f; }

export function toSummary(r: RagRunResult): SummaryMetrics {
  return { accuracy: r.accuracy, safety: 100, p50: r.p50, p95: r.p95, tokensIn: r.tokensIn, tokensOut: r.tokensOut, costUsd: r.costUsd };
}
