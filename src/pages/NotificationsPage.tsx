/**
 * NotificationsPage — full-page notification center with multi-channel preferences.
 *
 * Supports: in-app, email, SMS, WhatsApp, Telegram, Slack, Discord, push.
 * Includes contact info setup for channels that require it.
 */

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getPreferences,
  updatePreferences,
  getChannels,
  getContactInfo,
  updateContactInfo,
  getOtpStatus,
  sendOtp,
  verifyOtp,
  type Notification,
  type NotificationPreference,
  type ChannelInfo,
  type ContactInfo,
  type ContactInfoUpdate,
  type OtpStatus,
} from '@/lib/api/notifications';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EVENT_TYPES = [
  'achievement_earned',
  'quiz_completed',
  'community_reply',
  'cohort_invite',
  'weekly_digest',
  'system_alert',
] as const;

const EVENT_TYPE_LABELS: Record<string, string> = {
  achievement_earned: 'Achievement Earned',
  quiz_completed: 'Quiz Completed',
  community_reply: 'Community Reply',
  cohort_invite: 'Cohort Invite',
  weekly_digest: 'Weekly Digest',
  system_alert: 'System Alert',
};

const EVENT_TYPE_ICONS: Record<string, string> = {
  achievement_earned: '🏆',
  quiz_completed: '📝',
  community_reply: '💬',
  cohort_invite: '👥',
  weekly_digest: '📊',
  system_alert: '⚙️',
};

const CHANNEL_ICONS: Record<string, string> = {
  in_app: '🔔',
  email: '📧',
  sms: '📱',
  whatsapp: '💬',
  telegram: '✈️',
  slack: '#️⃣',
  discord: '🎮',
  push: '🔔',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NotificationsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences' | 'channels'>('notifications');

  // Notifications list
  const { data: listData, isLoading } = useQuery({
    queryKey: ['notifications', 'list', page, unreadOnly, typeFilter],
    queryFn: () =>
      getNotifications({
        page,
        per_page: 20,
        unread_only: unreadOnly,
        type: typeFilter || undefined,
      }),
    staleTime: 10_000,
  });

  // Available channels
  const { data: channels } = useQuery({
    queryKey: ['notifications', 'channels'],
    queryFn: getChannels,
    staleTime: 60_000,
  });

  // Preferences
  const { data: prefs } = useQuery({
    queryKey: ['notifications', 'preferences'],
    queryFn: getPreferences,
    enabled: activeTab === 'preferences',
    staleTime: 30_000,
  });

  // Contact info
  const { data: contactInfo } = useQuery({
    queryKey: ['notifications', 'contact-info'],
    queryFn: getContactInfo,
    enabled: activeTab === 'channels',
    staleTime: 30_000,
  });

  // OTP status
  const { data: otpStatus } = useQuery({
    queryKey: ['notifications', 'otp-status'],
    queryFn: getOtpStatus,
    enabled: activeTab === 'channels',
    staleTime: 60_000,
  });

  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const updatePrefsMutation = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications', 'preferences'] }),
  });

  const updateContactMutation = useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'contact-info'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'channels'] });
    },
  });

  const handleNotificationClick = (notif: Notification) => {
    if (!notif.is_read) markReadMutation.mutate(notif.id);
    const link = (notif.data as Record<string, unknown>)?.link;
    if (typeof link === 'string') navigate(link);
  };

  const handlePrefToggle = (channel: string, event_type: string, current: boolean) => {
    const updated: NotificationPreference[] = [
      { channel, event_type, is_enabled: !current },
    ];
    updatePrefsMutation.mutate(updated);
  };

  const notifications = listData?.items ?? [];
  const total = listData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 20));

  // Build preference lookup
  const prefMap = new Map<string, boolean>();
  (prefs ?? []).forEach((p) => prefMap.set(`${p.channel}:${p.event_type}`, p.is_enabled));

  // Determine which channels are from API or use defaults
  const channelList: ChannelInfo[] = channels ?? [
    { id: 'in_app', label: 'In-App', description: 'Notifications in the app', icon: 'bell', requires_setup: false, is_configured: true },
    { id: 'email', label: 'Email', description: 'Email notifications', icon: 'mail', requires_setup: false, is_configured: true },
    { id: 'sms', label: 'SMS', description: 'Text messages', icon: 'smartphone', requires_setup: true, is_configured: false },
    { id: 'whatsapp', label: 'WhatsApp', description: 'WhatsApp messages', icon: 'message-circle', requires_setup: true, is_configured: false },
    { id: 'telegram', label: 'Telegram', description: 'Telegram bot messages', icon: 'send', requires_setup: true, is_configured: false },
    { id: 'slack', label: 'Slack', description: 'Slack notifications', icon: 'hash', requires_setup: true, is_configured: false },
    { id: 'discord', label: 'Discord', description: 'Discord notifications', icon: 'message-square', requires_setup: true, is_configured: false },
    { id: 'push', label: 'Push', description: 'Browser push notifications', icon: 'bell-ring', requires_setup: true, is_configured: false },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        {activeTab === 'notifications' && (
          <button
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="text-sm text-primary hover:underline disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-border">
        {(['notifications', 'preferences', 'channels'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px
              ${activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab === 'notifications' ? '🔔 Notifications' : tab === 'preferences' ? '⚙️ Preferences' : '📡 Channels'}
          </button>
        ))}
      </div>

      {/* ── TAB: Notifications ─────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => {
                  setUnreadOnly(e.target.checked);
                  setPage(1);
                }}
                className="rounded border-border"
              />
              Unread only
            </label>

            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
            >
              <option value="">All types</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {EVENT_TYPE_LABELS[t] ?? t}
                </option>
              ))}
            </select>
          </div>

          {/* Notification List */}
          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {isLoading ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                {unreadOnly ? 'No unread notifications' : 'No notifications yet'}
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`w-full text-left px-4 py-4 hover:bg-accent/50 transition-colors
                             flex gap-3 items-start ${!notif.is_read ? 'bg-primary/5' : ''}`}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {EVENT_TYPE_ICONS[notif.type] ?? '🔔'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          notif.is_read ? 'text-muted-foreground' : 'text-foreground font-semibold'
                        }`}
                      >
                        {notif.title}
                      </span>
                      {!notif.is_read && (
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    {notif.body && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notif.body}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground/70">
                        {timeAgo(notif.created_at)}
                      </span>
                      {notif.channel && notif.channel !== 'in_app' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                          via {notif.channel}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="text-sm px-3 py-1.5 rounded border border-border disabled:opacity-40
                           hover:bg-accent transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="text-sm px-3 py-1.5 rounded border border-border disabled:opacity-40
                           hover:bg-accent transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ── TAB: Preferences ─────────────────────────────────── */}
      {activeTab === 'preferences' && (
        <div className="border border-border rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose how you want to be notified for each event type.  Channels marked with ⚠️ need setup in the Channels tab first.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Event</th>
                  {channelList.map((ch) => (
                    <th key={ch.id} className="text-center py-2 px-2 font-medium text-muted-foreground">
                      <div className="flex flex-col items-center gap-0.5">
                        <span>{CHANNEL_ICONS[ch.id] ?? '📨'}</span>
                        <span className="text-[11px]">{ch.label}</span>
                        {ch.requires_setup && !ch.is_configured && (
                          <span className="text-[9px] text-amber-500">⚠️</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVENT_TYPES.map((evt) => (
                  <tr key={evt} className="border-b border-border/50 last:border-b-0">
                    <td className="py-3 pr-4 text-foreground">
                      <span className="mr-2">{EVENT_TYPE_ICONS[evt]}</span>
                      {EVENT_TYPE_LABELS[evt]}
                    </td>
                    {channelList.map((ch) => {
                      const key = `${ch.id}:${evt}`;
                      // Default: email + in_app on, others off
                      const defaultOn = ch.id === 'email' || ch.id === 'in_app';
                      const isEnabled = prefMap.has(key) ? prefMap.get(key)! : defaultOn;
                      const isDisabled = ch.requires_setup && !ch.is_configured;
                      return (
                        <td key={ch.id} className="text-center py-3 px-2">
                          <button
                            onClick={() => handlePrefToggle(ch.id, evt, isEnabled)}
                            disabled={isDisabled}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full
                                       transition-colors focus-visible:outline-none focus-visible:ring-2
                                       focus-visible:ring-ring
                                       ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}
                                       ${isEnabled && !isDisabled ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                            role="switch"
                            aria-checked={isEnabled}
                            aria-label={`${ch.label} for ${EVENT_TYPE_LABELS[evt]}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white shadow
                                         transform transition-transform ${
                                           isEnabled ? 'translate-x-[18px]' : 'translate-x-[2px]'
                                         }`}
                            />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB: Channels ─────────────────────────────────── */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          {/* Channel status cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelList.map((ch) => (
              <div
                key={ch.id}
                className={`border rounded-lg p-4 transition-colors ${
                  ch.is_configured
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{CHANNEL_ICONS[ch.id] ?? '📨'}</span>
                  <span className="font-medium text-foreground">{ch.label}</span>
                  {ch.is_configured ? (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  ) : ch.requires_setup ? (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      Setup needed
                    </span>
                  ) : (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Always on
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{ch.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Info Setup */}
          <ContactInfoForm
            contactInfo={contactInfo ?? null}
            otpStatus={otpStatus ?? null}
            onSave={(update) => updateContactMutation.mutate(update)}
            isSaving={updateContactMutation.isPending}
            onOtpVerified={() => {
              queryClient.invalidateQueries({ queryKey: ['notifications', 'contact-info'] });
              queryClient.invalidateQueries({ queryKey: ['notifications', 'channels'] });
              queryClient.invalidateQueries({ queryKey: ['notifications', 'otp-status'] });
            }}
          />
        </div>
      )}
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  Contact Info Form Sub-component                                    */
/* ------------------------------------------------------------------ */

function ContactInfoForm({
  contactInfo,
  otpStatus,
  onSave,
  isSaving,
  onOtpVerified,
}: {
  contactInfo: ContactInfo | null;
  otpStatus: OtpStatus | null;
  onSave: (update: ContactInfoUpdate) => void;
  isSaving: boolean;
  onOtpVerified: () => void;
}) {
  const [phone, setPhone] = useState(contactInfo?.phone_number ?? '');
  const [whatsapp, setWhatsapp] = useState(contactInfo?.whatsapp_number ?? '');
  const [telegram, setTelegram] = useState(contactInfo?.telegram_chat_id ?? '');
  const [slackUrl, setSlackUrl] = useState(contactInfo?.slack_webhook_url ?? '');
  const [discordUrl, setDiscordUrl] = useState(contactInfo?.discord_webhook_url ?? '');

  // Sync form when data loads
  React.useEffect(() => {
    if (contactInfo) {
      setPhone(contactInfo.phone_number ?? '');
      setWhatsapp(contactInfo.whatsapp_number ?? '');
      setTelegram(contactInfo.telegram_chat_id ?? '');
      setSlackUrl(contactInfo.slack_webhook_url ?? '');
      setDiscordUrl(contactInfo.discord_webhook_url ?? '');
    }
  }, [contactInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      phone_number: phone || null,
      whatsapp_number: whatsapp || null,
      telegram_chat_id: telegram || null,
      slack_webhook_url: slackUrl || null,
      discord_webhook_url: discordUrl || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Channel Setup</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your contact details for each channel you want to enable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone / SMS */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            📱 Phone Number (SMS)
            {contactInfo?.phone_verified && (
              <span className="text-xs text-green-600 dark:text-green-400">✓ verified</span>
            )}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground">E.164 format. Used for SMS text alerts.</p>
          {otpStatus?.enabled && contactInfo?.phone_number && (
            <OtpVerifyInline
              channel="sms"
              isVerified={contactInfo?.phone_verified ?? false}
              onVerified={onOtpVerified}
            />
          )}
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            💬 WhatsApp Number
            {contactInfo?.whatsapp_opted_in && (
              <span className="text-xs text-green-600 dark:text-green-400">✓ opted in</span>
            )}
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+1 555 123 4567 (or leave blank to use SMS number)"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground">Defaults to your phone number if blank.</p>
          {otpStatus?.enabled && (contactInfo?.whatsapp_number || contactInfo?.phone_number) && (
            <OtpVerifyInline
              channel="whatsapp"
              isVerified={contactInfo?.whatsapp_opted_in ?? false}
              onVerified={onOtpVerified}
            />
          )}
        </div>

        {/* Telegram */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            ✈️ Telegram Chat ID
            {contactInfo?.telegram_verified && (
              <span className="text-xs text-green-600 dark:text-green-400">✓ verified</span>
            )}
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Your Telegram chat ID or @username"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground">
            Start the bot <span className="font-mono">@OpenAgentSchoolBot</span> to get your chat ID.
          </p>
          {otpStatus?.enabled && contactInfo?.telegram_chat_id && (
            <OtpVerifyInline
              channel="telegram"
              isVerified={contactInfo?.telegram_verified ?? false}
              onVerified={onOtpVerified}
            />
          )}
        </div>

        {/* Slack Webhook */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">#️⃣ Slack Incoming Webhook</label>
          <input
            type="url"
            value={slackUrl}
            onChange={(e) => setSlackUrl(e.target.value)}
            placeholder="https://hooks.slack.com/services/T.../B.../..."
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground">
            Create a webhook at{' '}
            <a
              href="https://api.slack.com/messaging/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Slack API
            </a>.
          </p>
        </div>

        {/* Discord Webhook */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-foreground">🎮 Discord Webhook</label>
          <input
            type="url"
            value={discordUrl}
            onChange={(e) => setDiscordUrl(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground">
            Channel Settings → Integrations → Webhooks in Discord.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md
                     hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Contact Info'}
        </button>
        <span className="text-xs text-muted-foreground">
          Some channels require verification before notifications are sent.
        </span>
      </div>
    </form>
  );
}


/* ------------------------------------------------------------------ */
/*  OTP Inline Verify Sub-component                                    */
/* ------------------------------------------------------------------ */

function OtpVerifyInline({
  channel,
  isVerified,
  onVerified,
}: {
  channel: string;
  isVerified: boolean;
  onVerified: () => void;
}) {
  const [step, setStep] = useState<'idle' | 'sent' | 'verifying'>('idle');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (isVerified) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
        ✅ Verified
      </span>
    );
  }

  const handleSend = async () => {
    setIsSending(true);
    setError('');
    try {
      const res = await sendOtp(channel);
      setHint(res.destination_hint);
      setStep('sent');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send code');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async () => {
    setStep('verifying');
    setError('');
    try {
      await verifyOtp(channel, code);
      setStep('idle');
      setCode('');
      onVerified();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setStep('sent');
    }
  };

  if (step === 'idle') {
    return (
      <div className="mt-1 space-y-1">
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="text-xs text-primary hover:underline disabled:opacity-50"
        >
          {isSending ? 'Sending...' : '🔑 Send verification code'}
        </button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-2">
      <span className="text-[11px] text-muted-foreground">
        Code sent to {hint || channel}
      </span>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
        placeholder="Enter code"
        className="w-24 px-2 py-1 text-sm border border-border rounded bg-background text-foreground
                   placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        type="button"
        onClick={handleVerify}
        disabled={code.length < 4 || step === 'verifying'}
        className="px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground rounded
                   hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {step === 'verifying' ? '...' : 'Verify'}
      </button>
      <button
        type="button"
        onClick={handleSend}
        disabled={isSending}
        className="text-[11px] text-muted-foreground hover:text-foreground"
      >
        Resend
      </button>
      {error && <p className="w-full text-xs text-destructive">{error}</p>}
    </div>
  );
}
