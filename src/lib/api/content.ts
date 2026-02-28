/**
 * Content API client (Phase 6 – DB-driven content system)
 *
 * Communicates with `GET/POST/PATCH/DELETE /api/v1/content/…` on core-api.
 */

import axios from 'axios';
import { API_CONFIG, withApiV1 } from './config';

const api = axios.create({
  baseURL: `${withApiV1(API_CONFIG.core)}/content`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ContentBlock {
  type: string; // markdown | code | tabs | interactive
  content?: string;
  language?: string;
  tabs?: { label: string; content: string }[];
}

export interface ContentItem {
  id: string;
  tenant_id: string | null;
  type: string;
  slug: string;
  title: string;
  description: string | null;
  body: ContentBlock[];
  metadata: Record<string, unknown>;
  status: string;
  version: number;
  author_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContentItemCreate {
  type: string;
  slug: string;
  title: string;
  description?: string;
  body: ContentBlock[];
  metadata?: Record<string, unknown>;
  status?: string;
}

export interface ContentListParams {
  type?: string;
  status?: string;
  search?: string;
  skip?: number;
  limit?: number;
}

/* ------------------------------------------------------------------ */
/*  API methods                                                        */
/* ------------------------------------------------------------------ */

export async function getContentItem(
  slug: string,
  type = 'concept',
): Promise<ContentItem> {
  const { data } = await api.get<ContentItem>(`/${slug}`, {
    params: { type },
  });
  return data;
}

export async function listContent(
  params: ContentListParams = {},
): Promise<ContentItem[]> {
  const { data } = await api.get<ContentItem[]>('/', { params });
  return data;
}

export async function createContent(
  payload: ContentItemCreate,
): Promise<ContentItem> {
  const { data } = await api.post<ContentItem>('/', payload);
  return data;
}

export async function updateContent(
  id: string,
  payload: Partial<ContentItemCreate>,
): Promise<ContentItem> {
  const { data } = await api.patch<ContentItem>(`/${id}`, payload);
  return data;
}

export async function deleteContent(id: string): Promise<void> {
  await api.delete(`/${id}`);
}

export async function publishContent(id: string): Promise<ContentItem> {
  const { data } = await api.post<ContentItem>(`/${id}/publish`);
  return data;
}

export async function createVersion(id: string): Promise<ContentItem> {
  const { data } = await api.post<ContentItem>(`/${id}/versions`);
  return data;
}
