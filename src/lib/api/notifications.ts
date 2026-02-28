/**
 * Notifications API client (Phase 10 – Multi-Channel Notifications)
 *
 * Communicates with `/api/v1/notifications/…` on core-api.
 * Supports: in-app, email, SMS, WhatsApp, Telegram, Slack, Discord, push.
 */

import { API_CONFIG, withApiV1 } from './config';

const baseUrl = `${withApiV1(API_CONFIG.core)}/notifications`;

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
  // Skip network request when not authenticated — avoids 401/403 console noise
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${baseUrl}${path}`, {
    headers: authHeaders(),
    ...init,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`Notifications API ${res.status}: ${detail}`);
  }
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown>;
  channel: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string | null;
}

export interface NotificationListResponse {
  items: Notification[];
  total: number;
  page: number;
  per_page: number;
}

export interface UnreadCountResponse {
  count: number;
}

export interface NotificationPreference {
  channel: string;
  event_type: string;
  is_enabled: boolean;
}

export interface ChannelInfo {
  id: string;
  label: string;
  description: string;
  icon: string;
  requires_setup: boolean;
  is_configured: boolean;
}

export interface ContactInfo {
  phone_number: string | null;
  phone_verified: boolean;
  whatsapp_number: string | null;
  whatsapp_opted_in: boolean;
  telegram_chat_id: string | null;
  telegram_verified: boolean;
  slack_webhook_url: string | null;
  discord_webhook_url: string | null;
}

export interface ContactInfoUpdate {
  phone_number?: string | null;
  whatsapp_number?: string | null;
  telegram_chat_id?: string | null;
  slack_webhook_url?: string | null;
  discord_webhook_url?: string | null;
}

export interface OtpStatus {
  enabled: boolean;
  verifiable_channels: string[];
  verified: Record<string, boolean>;
}

export interface OtpSendResponse {
  status: string;
  channel: string;
  destination_hint: string;
  expires_in: number;
}

export interface OtpVerifyResponse {
  status: string;
  channel: string;
}

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

export interface GetNotificationsParams {
  unread_only?: boolean;
  type?: string;
  page?: number;
  per_page?: number;
}

/** Fetch paginated notifications for the current user. */
export async function getNotifications(
  params: GetNotificationsParams = {},
): Promise<NotificationListResponse> {
  const qs = new URLSearchParams();
  if (params.unread_only) qs.set('unread_only', 'true');
  if (params.type) qs.set('type', params.type);
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  const query = qs.toString();
  return apiFetch<NotificationListResponse>(`/${query ? `?${query}` : ''}`);
}

/** Get count of unread notifications (for bell badge). */
export async function getUnreadCount(): Promise<UnreadCountResponse> {
  return apiFetch<UnreadCountResponse>('/unread-count');
}

/** Mark a single notification as read. */
export async function markAsRead(notificationId: string): Promise<Notification> {
  return apiFetch<Notification>(`/${notificationId}/read`, { method: 'PATCH' });
}

/** Mark all notifications as read. */
export async function markAllAsRead(): Promise<{ updated: number }> {
  return apiFetch<{ updated: number }>('/mark-all-read', { method: 'POST' });
}

/** Get the current user's notification preferences. */
export async function getPreferences(): Promise<NotificationPreference[]> {
  return apiFetch<NotificationPreference[]>('/preferences');
}

/** Update notification preferences. */
export async function updatePreferences(
  prefs: NotificationPreference[],
): Promise<NotificationPreference[]> {
  return apiFetch<NotificationPreference[]>('/preferences', {
    method: 'PUT',
    body: JSON.stringify(prefs),
  });
}

/** Get available channels with user-specific configuration status. */
export async function getChannels(): Promise<ChannelInfo[]> {
  return apiFetch<ChannelInfo[]>('/channels');
}

/** Get the current user's contact info for messaging channels. */
export async function getContactInfo(): Promise<ContactInfo> {
  return apiFetch<ContactInfo>('/contact-info');
}

/** Update user contact info (phone, Telegram, Slack/Discord webhooks). */
export async function updateContactInfo(info: ContactInfoUpdate): Promise<ContactInfo> {
  return apiFetch<ContactInfo>('/contact-info', {
    method: 'PUT',
    body: JSON.stringify(info),
  });
}

/** Check whether OTP verification is enabled and current verification status. */
export async function getOtpStatus(): Promise<OtpStatus> {
  return apiFetch<OtpStatus>('/otp/status');
}

/** Send an OTP code to verify a channel address. */
export async function sendOtp(channel: string): Promise<OtpSendResponse> {
  return apiFetch<OtpSendResponse>('/otp/send', {
    method: 'POST',
    body: JSON.stringify({ channel }),
  });
}

/** Verify a user-entered OTP code. On success, marks the channel as verified. */
export async function verifyOtp(channel: string, code: string): Promise<OtpVerifyResponse> {
  return apiFetch<OtpVerifyResponse>('/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ channel, code }),
  });
}
