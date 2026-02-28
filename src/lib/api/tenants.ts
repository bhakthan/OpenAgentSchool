/**
 * Tenant API module
 *
 * Wraps the backend tenant endpoints introduced in Phase 2-3.
 * Uses the same base URL / header pattern as `core.ts`.
 */

import { API_CONFIG, withApiV1 } from './config';

const baseV1 = withApiV1(API_CONFIG.core);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string | null;
  accentColor: string | null;
  themeOverrides: Record<string, string>;
  isActive: boolean;
}

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                    */
/* ------------------------------------------------------------------ */

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Convert a snake_case API response into the camelCase `TenantConfig` shape.
 */
function mapTenantResponse(raw: Record<string, unknown>): TenantConfig {
  return {
    id: String(raw.id ?? ''),
    slug: String(raw.slug ?? ''),
    name: String(raw.name ?? ''),
    displayName: String(raw.display_name ?? raw.name ?? ''),
    logoUrl: (raw.logo_url as string) ?? null,
    faviconUrl: (raw.favicon_url as string) ?? null,
    primaryColor: (raw.primary_color as string) ?? null,
    accentColor: (raw.accent_color as string) ?? null,
    themeOverrides: (raw.theme_overrides as Record<string, string>) ?? {},
    isActive: raw.is_active !== false,
  };
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Fetch public (unauthenticated) tenant configuration by slug.
 * `GET /api/v1/tenants/{slug}`
 */
export async function getPublicTenantConfig(
  slug: string,
  signal?: AbortSignal,
): Promise<TenantConfig> {
  const res = await fetch(`${baseV1}/tenants/${encodeURIComponent(slug)}`, {
    headers: { 'Content-Type': 'application/json' },
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Tenant API error ${res.status}: ${text || res.statusText}`);
  }
  const raw = await res.json();
  return mapTenantResponse(raw);
}

/**
 * Fetch the authenticated user's current tenant configuration.
 * `GET /api/v1/tenants/current`
 */
export async function getCurrentTenantConfig(
  signal?: AbortSignal,
): Promise<TenantConfig> {
  const res = await fetch(`${baseV1}/tenants/current`, {
    headers: authHeaders(),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Tenant API error ${res.status}: ${text || res.statusText}`);
  }
  const raw = await res.json();
  return mapTenantResponse(raw);
}

/**
 * Update the current tenant's configuration (admin only).
 * `PATCH /api/v1/tenants/current`
 */
export async function updateTenantConfig(
  data: Partial<TenantConfig>,
  signal?: AbortSignal,
): Promise<TenantConfig> {
  // Convert camelCase fields to snake_case for the API
  const body: Record<string, unknown> = {};
  if (data.name !== undefined) body.name = data.name;
  if (data.displayName !== undefined) body.display_name = data.displayName;
  if (data.logoUrl !== undefined) body.logo_url = data.logoUrl;
  if (data.faviconUrl !== undefined) body.favicon_url = data.faviconUrl;
  if (data.primaryColor !== undefined) body.primary_color = data.primaryColor;
  if (data.accentColor !== undefined) body.accent_color = data.accentColor;
  if (data.themeOverrides !== undefined) body.theme_overrides = data.themeOverrides;

  const res = await fetch(`${baseV1}/tenants/current`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Tenant API error ${res.status}: ${text || res.statusText}`);
  }
  const raw = await res.json();
  return mapTenantResponse(raw);
}

/**
 * Upload a logo for the current tenant (admin only).
 * `POST /api/v1/tenants/current/logo`
 */
export async function uploadTenantLogo(
  file: File,
  signal?: AbortSignal,
): Promise<{ logo_url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const headers: Record<string, string> = {};
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${baseV1}/tenants/current/logo`, {
    method: 'POST',
    headers,
    body: formData,
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Tenant API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
