/**
 * Domain Management API client (Phase 9 – Custom Domain Mapping)
 *
 * Communicates with `/api/v1/domains/…` on core-api.
 */

import axios from 'axios';
import { API_CONFIG, withApiV1 } from './config';

const domainsApi = axios.create({
  baseURL: `${withApiV1(API_CONFIG.core)}/domains`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth + tenant headers
domainsApi.interceptors.request.use((config) => {
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

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
}

export interface DomainMapping {
  id: string;
  domain: string;
  verification_token: string;
  verification_status: 'pending' | 'verified' | 'failed';
  verification_attempts: number;
  last_verification_at: string | null;
  ssl_status: 'pending' | 'provisioning' | 'active' | 'error';
  ssl_expires_at: string | null;
  is_active: boolean;
  dns_record: DnsRecord;
  created_at: string | null;
  updated_at: string | null;
}

export interface DomainVerifyResult {
  id: string;
  domain: string;
  verification_status: string;
  verification_attempts: number;
  is_active: boolean;
  message: string;
}

export interface SSLStatus {
  id: string;
  domain: string;
  ssl_status: string;
  ssl_expires_at: string | null;
}

export interface SSLProvisionResult {
  id: string;
  domain: string;
  ssl_status: string;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

/** List all domain mappings for the current tenant. */
export async function listDomains(): Promise<DomainMapping[]> {
  const { data } = await domainsApi.get<DomainMapping[]>('/');
  return data;
}

/** Add a new custom domain. */
export async function addDomain(domain: string): Promise<DomainMapping> {
  const { data } = await domainsApi.post<DomainMapping>('/', { domain });
  return data;
}

/** Trigger DNS TXT verification. */
export async function verifyDomain(id: string): Promise<DomainVerifyResult> {
  const { data } = await domainsApi.post<DomainVerifyResult>(`/${id}/verify`);
  return data;
}

/** Remove a domain mapping. */
export async function removeDomain(id: string): Promise<void> {
  await domainsApi.delete(`/${id}`);
}

/** Fetch current SSL provisioning status. */
export async function getSSLStatus(id: string): Promise<SSLStatus> {
  const { data } = await domainsApi.get<SSLStatus>(`/${id}/ssl-status`);
  return data;
}

/** Trigger SSL provisioning for a verified domain. */
export async function provisionSSL(id: string): Promise<SSLProvisionResult> {
  const { data } = await domainsApi.post<SSLProvisionResult>(`/${id}/ssl-provision`);
  return data;
}
