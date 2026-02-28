import { API_CONFIG, withApiV1 } from './config';

const baseV1 = withApiV1(API_CONFIG.core);

/* ------------------------------------------------------------------ */
/*  Tenant ID interceptor                                              */
/* ------------------------------------------------------------------ */

/** Module-level tenant ID — set by TenantProvider once resolved. */
let _currentTenantId: string | null = null;

/** Called by TenantProvider to propagate the tenant ID to all outgoing requests. */
export function setCurrentTenantId(id: string | null) {
  _currentTenantId = id;
  // Also persist so other modules / tabs can read it
  if (typeof window !== 'undefined') {
    if (id) localStorage.setItem('tenant_id', id);
    else localStorage.removeItem('tenant_id');
  }
}

/** Read the current tenant ID (memory-first, fallback to localStorage). */
export function getCurrentTenantId(): string | null {
  if (_currentTenantId) return _currentTenantId;
  if (typeof window !== 'undefined') return localStorage.getItem('tenant_id');
  return null;
}

/* ------------------------------------------------------------------ */
/*  Header builder                                                     */
/* ------------------------------------------------------------------ */

/** Build headers including Authorization bearer token and X-Tenant-ID. */
function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const tenantId = getCurrentTenantId();
  if (tenantId) {
    headers['X-Tenant-ID'] = tenantId;
  }
  return headers;
}

export async function getQuizPatterns(signal?: AbortSignal) {
  const res = await fetch(`${baseV1}/quiz/patterns`, { headers: authHeaders(), signal });
  if (!res.ok) throw new Error(`Core API error ${res.status}`);
  return res.json();
}

export async function submitQuiz(body: unknown, signal?: AbortSignal) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
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
