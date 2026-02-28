/**
 * Billing & Onboarding API client (Phase 8)
 *
 * Communicates with `/api/v1/billing/…` and `/api/v1/onboarding/…` on core-api.
 */

import axios from 'axios';
import { API_CONFIG, withApiV1 } from './config';

const billingApi = axios.create({
  baseURL: `${withApiV1(API_CONFIG.core)}/billing`,
  headers: { 'Content-Type': 'application/json' },
});

const onboardingApi = axios.create({
  baseURL: `${withApiV1(API_CONFIG.core)}/onboarding`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth + tenant headers
for (const api of [billingApi, onboardingApi]) {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const tenantId = localStorage.getItem('tenant_id');
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }
    return config;
  });
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Plan {
  id: string;
  name: string;
  display_name: string | null;
  description: string | null;
  price_monthly: number;
  price_annual: number;
  max_users: number;
  max_storage_gb: number;
  features: Record<string, boolean>;
  sort_order: number;
}

export interface Subscription {
  id: string;
  tenant_id: string;
  plan_id: string;
  plan_name: string | null;
  plan_display_name: string | null;
  stripe_subscription_id: string | null;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string | null;
}

export interface CheckoutResponse {
  checkout_url: string;
  session_id: string;
}

export interface UsageMetric {
  metric_type: string;
  value: number;
  recorded_at: string;
}

export interface UsageSummary {
  tenant_id: string;
  metrics: UsageMetric[];
  plan_limits: Record<string, number>;
}

export interface CreateTenantRequest {
  org_name: string;
  slug: string;
  admin_email: string;
  admin_password: string;
  plan_name?: string;
}

export interface CreateTenantResponse {
  tenant_id: string;
  slug: string;
  access_token: string;
  token_type: string;
  message: string;
}

export interface SlugCheckResponse {
  slug: string;
  available: boolean;
}

/* ------------------------------------------------------------------ */
/*  Billing endpoints                                                  */
/* ------------------------------------------------------------------ */

export async function getPlans(): Promise<Plan[]> {
  const { data } = await billingApi.get<Plan[]>('/plans');
  return data;
}

export async function getSubscription(): Promise<Subscription> {
  const { data } = await billingApi.get<Subscription>('/subscription');
  return data;
}

export async function createCheckout(body: { plan_id: string; interval: 'monthly' | 'annual' }): Promise<CheckoutResponse> {
  const { data } = await billingApi.post<CheckoutResponse>('/checkout', body);
  return data;
}

export async function getUsage(): Promise<UsageSummary> {
  const { data } = await billingApi.get<UsageSummary>('/usage');
  return data;
}

/* ------------------------------------------------------------------ */
/*  Onboarding endpoints                                               */
/* ------------------------------------------------------------------ */

export async function createTenant(body: CreateTenantRequest): Promise<CreateTenantResponse> {
  const { data } = await onboardingApi.post<CreateTenantResponse>('/create-tenant', body);
  return data;
}

export async function checkSlug(slug: string): Promise<SlugCheckResponse> {
  const { data } = await onboardingApi.get<SlugCheckResponse>(`/check-slug/${encodeURIComponent(slug)}`);
  return data;
}
