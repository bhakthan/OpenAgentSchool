import { API_CONFIG, withApiV1 } from './config';

const baseV1 = withApiV1(API_CONFIG.core);

export async function getQuizPatterns(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/patterns`, { signal });
  if (!res.ok) throw new Error(`Core API error ${res.status}`);
  return res.json();
}

export async function submitQuiz(body: unknown, signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Core API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function getProgressSummary(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/progress/summary`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Core API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function getQuizResults(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/results`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Core API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
