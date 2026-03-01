/**
 * Admin Feedback Tab
 *
 * Task-board view of user feedback with stats bar, filtering,
 * inline triage (status / priority / assignee / admin notes).
 */

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFeedbackList,
  getFeedbackStats,
  updateFeedback,
  type FeedbackItem,
  type FeedbackStats,
  type FeedbackUpdateData,
} from '@/lib/api/feedback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  DotsThreeVertical,
  ChatDots,
  Bug,
  Lightbulb,
  HandsClapping,
  ArrowClockwise,
  CheckCircle,
  XCircle,
  Clock,
  Funnel,
} from '@phosphor-icons/react';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STATUS_OPTIONS = ['new', 'in_progress', 'resolved', 'dismissed'] as const;
const PRIORITY_OPTIONS = ['P1', 'P2', 'P3'] as const;

function statusBadge(status: string) {
  switch (status) {
    case 'new':
      return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">New</Badge>;
    case 'in_progress':
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">In Progress</Badge>;
    case 'resolved':
      return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Resolved</Badge>;
    case 'dismissed':
      return <Badge className="bg-muted text-muted-foreground border-border">Dismissed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function priorityBadge(priority: string | null) {
  if (!priority) return <span className="text-muted-foreground text-xs">—</span>;
  switch (priority) {
    case 'P1':
      return <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">P1</Badge>;
    case 'P2':
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">P2</Badge>;
    case 'P3':
      return <Badge className="bg-muted text-muted-foreground border-border">P3</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

function categoryIcon(cat: string | null) {
  switch (cat) {
    case 'bug':
      return <span title="Bug"><Bug className="w-4 h-4 text-red-500" weight="duotone" /></span>;
    case 'idea':
      return <span title="Idea"><Lightbulb className="w-4 h-4 text-amber-500" weight="duotone" /></span>;
    case 'praise':
      return <span title="Praise"><HandsClapping className="w-4 h-4 text-green-500" weight="duotone" /></span>;
    default:
      return <span title="Other"><ChatDots className="w-4 h-4 text-muted-foreground" weight="duotone" /></span>;
  }
}

function relativeTime(iso: string | null): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/* ------------------------------------------------------------------ */
/*  Stats Cards                                                        */
/* ------------------------------------------------------------------ */

function StatsBar({ stats }: { stats: FeedbackStats | undefined }) {
  const cards = [
    { label: 'New', value: stats?.new ?? 0, icon: Clock, color: 'text-blue-500' },
    { label: 'In Progress', value: stats?.in_progress ?? 0, icon: ArrowClockwise, color: 'text-amber-500' },
    { label: 'Resolved', value: stats?.resolved ?? 0, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Dismissed', value: stats?.dismissed ?? 0, icon: XCircle, color: 'text-muted-foreground' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {cards.map((c) => (
        <Card key={c.label} className="p-3">
          <div className="flex items-center gap-2">
            <c.icon className={`w-5 h-5 ${c.color}`} weight="duotone" />
            <div>
              <p className="text-2xl font-bold leading-tight">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Admin Notes Dialog (inline)                                        */
/* ------------------------------------------------------------------ */

function AdminNotesCell({
  item,
  onSave,
}: {
  item: FeedbackItem;
  onSave: (id: string, notes: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.admin_notes ?? '');

  const handleSave = useCallback(() => {
    onSave(item.id, value);
    setEditing(false);
  }, [item.id, value, onSave]);

  if (editing) {
    return (
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          className="text-xs resize-none"
          maxLength={1000}
        />
        <div className="flex gap-1">
          <Button size="sm" variant="default" className="h-6 text-xs px-2" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="ghost" className="h-6 text-xs px-2" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer max-w-[180px] truncate"
      onClick={() => setEditing(true)}
      title={item.admin_notes || 'Click to add notes'}
    >
      {item.admin_notes || '+ add notes'}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Tab                                                           */
/* ------------------------------------------------------------------ */

export function FeedbackTab() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const perPage = 20;

  // ── Data fetching ───────────────────────────────────────────────
  const { data: stats } = useQuery({
    queryKey: ['admin', 'feedback', 'stats'],
    queryFn: getFeedbackStats,
    refetchInterval: 30_000,
  });

  const { data: feedbackData, isLoading, error } = useQuery({
    queryKey: ['admin', 'feedback', statusFilter, priorityFilter, page],
    queryFn: () =>
      getFeedbackList({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        page,
        per_page: perPage,
      }),
    refetchInterval: 30_000,
  });

  // ── Mutations ───────────────────────────────────────────────────
  const patchMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FeedbackUpdateData }) =>
      updateFeedback(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'feedback'] });
      toast.success('Feedback updated');
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to update feedback');
    },
  });

  const handlePatch = useCallback(
    (id: string, data: FeedbackUpdateData) => patchMutation.mutate({ id, data }),
    [patchMutation],
  );

  const handleNoteSave = useCallback(
    (id: string, notes: string) => handlePatch(id, { admin_notes: notes }),
    [handlePatch],
  );

  // ── Loading / Error ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Failed to load feedback. Check backend connectivity.
        </CardContent>
      </Card>
    );
  }

  const items = feedbackData?.items ?? [];
  const total = feedbackData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ChatDots className="w-5 h-5" weight="duotone" />
          Feedback
        </CardTitle>
        <CardDescription>
          {total} feedback item{total !== 1 ? 's' : ''} total
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ── Stats ────────────────────────────────────────────── */}
        <StatsBar stats={stats} />

        {/* ── Filters ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 items-center">
          <Funnel className="w-4 h-4 text-muted-foreground" />

          <select
            className="h-8 rounded-md border border-border bg-background text-sm px-2"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>

          <select
            className="h-8 rounded-md border border-border bg-background text-sm px-2"
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All priorities</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {(statusFilter || priorityFilter) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                setStatusFilter('');
                setPriorityFilter('');
                setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {/* ── Table ────────────────────────────────────────────── */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">When</TableHead>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>User</TableHead>
                <TableHead className="max-w-[200px]">Page</TableHead>
                <TableHead className="max-w-[260px]">Content</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="min-w-[180px]">Admin Notes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                    No feedback yet.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((fb) => (
                  <TableRow key={fb.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {relativeTime(fb.created_at)}
                    </TableCell>
                    <TableCell>{categoryIcon(fb.category)}</TableCell>
                    <TableCell className="text-sm truncate max-w-[140px]" title={fb.user_email || undefined}>
                      {fb.user_email ?? `User #${fb.user_id}`}
                    </TableCell>
                    <TableCell
                      className="text-xs text-muted-foreground truncate max-w-[200px]"
                      title={fb.page_url}
                    >
                      {fb.page_url.replace(/^https?:\/\/[^/]+/, '')}
                    </TableCell>
                    <TableCell className="text-sm max-w-[260px]">
                      <p className="line-clamp-2">{fb.content}</p>
                    </TableCell>
                    <TableCell>{priorityBadge(fb.priority)}</TableCell>
                    <TableCell>{statusBadge(fb.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {fb.assignee || '—'}
                    </TableCell>
                    <TableCell>
                      <AdminNotesCell item={fb} onSave={handleNoteSave} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <DotsThreeVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* Status */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {STATUS_OPTIONS.map((s) => (
                                <DropdownMenuItem
                                  key={s}
                                  disabled={fb.status === s}
                                  onClick={() => handlePatch(fb.id, { status: s })}
                                >
                                  {s.replace('_', ' ')}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>

                          {/* Priority */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Set Priority</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {PRIORITY_OPTIONS.map((p) => (
                                <DropdownMenuItem
                                  key={p}
                                  disabled={fb.priority === p}
                                  onClick={() => handlePatch(fb.id, { priority: p })}
                                >
                                  {p}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />

                          {/* Quick assign to Copilot */}
                          <DropdownMenuItem
                            onClick={() => handlePatch(fb.id, { assignee: 'copilot' })}
                          >
                            Assign to Copilot
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination ───────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-muted-foreground">
              Page {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
