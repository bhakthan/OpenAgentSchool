/**
 * Feedback API client
 *
 * Communicates with `/api/v1/feedback/…` on core-api.
 */

import { API_CONFIG, withApiV1 } from './config';

const baseUrl = `${withApiV1(API_CONFIG.core)}/feedback`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const tenantId = typeof window !== 'undefined' ? localStorage.getItem('tenant_id') : null;
  if (tenantId) headers['X-Tenant-ID'] = tenantId;
  return headers;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${baseUrl}${path}`, {
    headers: authHeaders(),
    ...init,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`Feedback API ${res.status}: ${detail}`);
  }
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Client-side sanitisation                                           */
/* ------------------------------------------------------------------ */

/**
 * Strip HTML, JS, SQL-injection patterns and dangerous characters
 * from user-submitted text before sending to the backend.
 */
export function sanitiseInput(raw: string): string {
  let text = raw;

  // Strip HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Remove dangerous characters: < > " ' ` ; ( ) { } [ ] backslash
  text = text.replace(/[<>"'`;(){}\[\]\\]/g, '');

  // Remove common SQL injection fragments
  text = text.replace(
    /(--|;|\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|EXECUTE|CREATE|xp_)\b)/gi,
    '',
  );

  // Remove script / event-handler patterns
  text = text.replace(/(javascript\s*:|on\w+\s*=)/gi, '');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text.slice(0, 500);
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface FeedbackSubmitData {
  content: string;
  page_url: string;
  category?: 'bug' | 'idea' | 'praise' | 'other';
}

export interface FeedbackSubmitResponse {
  id: string;
  status: string;
  created_at: string;
}

export interface FeedbackItem {
  id: string;
  user_id: number;
  user_email: string | null;
  page_url: string;
  content: string;
  category: string | null;
  status: string;
  priority: string | null;
  assignee: string | null;
  admin_notes: string | null;
  resolved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface FeedbackListResponse {
  items: FeedbackItem[];
  total: number;
  page: number;
  per_page: number;
}

export interface FeedbackStats {
  new: number;
  in_progress: number;
  resolved: number;
  dismissed: number;
  total: number;
}

export interface FeedbackUpdateData {
  status?: string;
  priority?: string;
  assignee?: string;
  admin_notes?: string;
}

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

/** Submit feedback from authenticated user. Content is sanitised client-side. */
export async function submitFeedback(
  data: FeedbackSubmitData,
): Promise<FeedbackSubmitResponse> {
  const sanitised = sanitiseInput(data.content);
  if (!sanitised) throw new Error('Feedback content is empty after cleaning');

  return apiFetch<FeedbackSubmitResponse>('/', {
    method: 'POST',
    body: JSON.stringify({
      content: sanitised,
      page_url: data.page_url,
      category: data.category,
    }),
  });
}

/** Get paginated feedback list (admin). */
export async function getFeedbackList(params?: {
  status?: string;
  priority?: string;
  page?: number;
  per_page?: number;
}): Promise<FeedbackListResponse> {
  const qs = new URLSearchParams();
  if (params?.status) qs.set('status', params.status);
  if (params?.priority) qs.set('priority', params.priority);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.per_page) qs.set('per_page', String(params.per_page));
  const query = qs.toString();
  return apiFetch<FeedbackListResponse>(`/${query ? `?${query}` : ''}`);
}

/** Get feedback counts by status (admin). */
export async function getFeedbackStats(): Promise<FeedbackStats> {
  return apiFetch<FeedbackStats>('/stats');
}

/** Update feedback triage fields (admin). */
export async function updateFeedback(
  id: string,
  data: FeedbackUpdateData,
): Promise<{ ok: boolean; id: string }> {
  return apiFetch<{ ok: boolean; id: string }>(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
