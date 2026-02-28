/**
 * Marketplace API client (Phase 7 – Content Marketplace)
 *
 * Communicates with `GET/POST/PATCH/DELETE /api/v1/marketplace/…` on core-api.
 */

import axios from 'axios';
import { API_CONFIG, withApiV1 } from './config';

const api = axios.create({
  baseURL: `${withApiV1(API_CONFIG.core)}/marketplace`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth + tenant headers
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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ContentItemPreview {
  id: string;
  type: string;
  slug: string;
  title: string;
  description: string | null;
}

export interface PackageSummary {
  id: string;
  publisher_tenant_id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  price: number;
  currency: string;
  category: string | null;
  tags: string[];
  is_published: boolean;
  rating_avg: number;
  rating_count: number;
  install_count: number;
  created_at: string;
  updated_at: string;
}

export interface PackageDetail extends PackageSummary {
  items: ContentItemPreview[];
}

export interface PaginatedPackages {
  items: PackageSummary[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface Subscription {
  id: string;
  subscriber_tenant_id: string;
  package_id: string;
  subscribed_at: string;
  expires_at: string | null;
  is_active: boolean;
  package?: PackageSummary;
}

export interface Review {
  id: string;
  reviewer_tenant_id: string;
  reviewer_user_id: number;
  package_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

export interface ListPackagesParams {
  category?: string;
  search?: string;
  sort_by?: 'popular' | 'newest' | 'rating';
  page?: number;
  per_page?: number;
}

export interface CreateReviewPayload {
  rating: number;
  review_text?: string;
}

/* ------------------------------------------------------------------ */
/*  API methods                                                        */
/* ------------------------------------------------------------------ */

export async function listPackages(
  params: ListPackagesParams = {},
): Promise<PaginatedPackages> {
  const { data } = await api.get<PaginatedPackages>('/packages', { params });
  return data;
}

export async function getPackage(id: string): Promise<PackageDetail> {
  const { data } = await api.get<PackageDetail>(`/packages/${id}`);
  return data;
}

export async function subscribe(packageId: string): Promise<Subscription> {
  const { data } = await api.post<Subscription>(
    `/packages/${packageId}/subscribe`,
  );
  return data;
}

export async function unsubscribe(packageId: string): Promise<void> {
  await api.delete(`/packages/${packageId}/subscribe`);
}

export async function listSubscriptions(): Promise<Subscription[]> {
  const { data } = await api.get<Subscription[]>('/subscriptions');
  return data;
}

export async function createReview(
  packageId: string,
  payload: CreateReviewPayload,
): Promise<Review> {
  const { data } = await api.post<Review>(
    `/packages/${packageId}/reviews`,
    payload,
  );
  return data;
}

export async function listReviews(
  packageId: string,
  page = 1,
  perPage = 20,
): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/packages/${packageId}/reviews`, {
    params: { page, per_page: perPage },
  });
  return data;
}
