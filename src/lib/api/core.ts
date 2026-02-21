import { API_CONFIG, withApiV1 } from './config';

const baseV1 = withApiV1(API_CONFIG.core);

/** Build headers including Authorization bearer token when the user is logged in. */
function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function getQuizPatterns(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/patterns`, { headers: authHeaders(), signal });
  if (!res.ok) throw new Error(`Core API error ${res.status}`);
  return res.json();
}

export async function submitQuiz(body: unknown, signal?: AbortSignal) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (!token) {
    throw new Error('Not authenticated – sign in to submit quizzes');
  }
  const res = await fetch(`${baseV1}/quiz/submit`, {
    method: 'POST',
    headers: authHeaders(),
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
  const res = await fetch(`${baseV1}/progress/summary`, { headers: authHeaders(), signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Core API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function getQuizResults(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/results`, { headers: authHeaders(), signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Core API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
