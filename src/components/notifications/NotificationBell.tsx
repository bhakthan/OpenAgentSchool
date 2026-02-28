/**
 * NotificationBell — header dropdown for in-app notifications.
 *
 * Shows a bell icon with unread badge, a Radix Popover with recent
 * notifications, and links to the full /notifications page.
 *
 * Polls unread count every 30 seconds via React Query.
 */

import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import { Bell } from 'lucide-react';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  type Notification,
} from '@/lib/api/notifications';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const EVENT_TYPE_ICONS: Record<string, string> = {
  achievement_earned: '🏆',
  quiz_completed: '📝',
  community_reply: '💬',
  cohort_invite: '👥',
  weekly_digest: '📊',
  system_alert: '⚙️',
};

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

export function NotificationBell() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Poll unread count every 30s
  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadCount,
    refetchInterval: 30_000,
    staleTime: 10_000,
    retry: 1,
  });

  // Recent notifications (first 8) for dropdown
  const { data: recentData } = useQuery({
    queryKey: ['notifications', 'recent'],
    queryFn: () => getNotifications({ per_page: 8 }),
    staleTime: 15_000,
    retry: 1,
  });

  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleNotificationClick = useCallback(
    (notif: Notification) => {
      if (!notif.is_read) {
        markReadMutation.mutate(notif.id);
      }
      const link = (notif.data as Record<string, unknown>)?.link;
      if (typeof link === 'string') {
        navigate(link);
      }
    },
    [markReadMutation, navigate],
  );

  const unreadCount = unreadData?.count ?? 0;
  const notifications = recentData?.items ?? [];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="relative inline-flex items-center justify-center h-9 w-9 rounded-md
                     text-muted-foreground hover:text-foreground hover:bg-accent
                     transition-colors focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ring"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
          title="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center
                         min-w-[18px] h-[18px] rounded-full bg-red-500 text-white
                         text-[10px] font-bold leading-none px-1"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-80 max-h-[28rem] rounded-lg border border-border bg-popover
                     shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95"
          sideOffset={8}
          align="end"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllReadMutation.mutate()}
                className="text-xs text-primary hover:underline disabled:opacity-50"
                disabled={markAllReadMutation.isPending}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-[20rem]">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`w-full text-left px-4 py-3 border-b border-border/50 last:border-b-0
                             hover:bg-accent/50 transition-colors flex gap-3 items-start
                             ${!notif.is_read ? 'bg-primary/5' : ''}`}
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {EVENT_TYPE_ICONS[notif.type] ?? '🔔'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm leading-tight ${
                          notif.is_read ? 'text-muted-foreground' : 'text-foreground font-medium'
                        } line-clamp-1`}
                      >
                        {notif.title}
                      </span>
                      {!notif.is_read && (
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    {notif.body && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notif.body}
                      </p>
                    )}
                    <span className="text-[11px] text-muted-foreground/70 mt-1 block">
                      {timeAgo(notif.created_at)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2">
            <button
              onClick={() => navigate('/notifications')}
              className="w-full text-center text-xs text-primary hover:underline py-1"
            >
              View all notifications
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default NotificationBell;
