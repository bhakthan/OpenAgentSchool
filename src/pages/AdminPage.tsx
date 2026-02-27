/**
 * Admin Dashboard Page
 * Full admin panel with user management, platform stats, and system health.
 * Only accessible to users with role === 'admin'.
 */

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI, AdminUser, PlatformStats, SystemHealth, PendingPost } from '@/lib/api/admin';
import { useAuth } from '@/lib/auth/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  Users,
  ChartBar,
  Heartbeat,
  DotsThreeVertical,
  ShieldCheck,
  UserCircle,
  Prohibit,
  CheckCircle,
  ArrowClockwise,
  ChatText,
  Clock,
  XCircle,
} from '@phosphor-icons/react';
import { Textarea } from '@/components/ui/textarea';

// ── Stats card component ─────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" weight="duotone" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

// ── Service status badge ─────────────────────────────────────────────────

function ServiceBadge({ status }: { status: string }) {
  if (status === 'healthy') {
    return (
      <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
        <CheckCircle className="w-3 h-3 mr-1" weight="fill" />
        Healthy
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
      <Prohibit className="w-3 h-3 mr-1" weight="fill" />
      {status}
    </Badge>
  );
}

// ── User management tab ──────────────────────────────────────────────────

function UsersTab() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminAPI.listUsers(),
    refetchInterval: 30_000,
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: 'admin' | 'user' }) =>
      adminAPI.updateUserRole(userId, role),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success(`${updated.username} is now ${updated.role}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to update role');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (userId: number) => adminAPI.toggleUserActive(userId),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success(`User ${result.is_active ? 'activated' : 'deactivated'}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to toggle user');
    },
  });

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
          Failed to load users. Check backend connectivity.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">User Management</CardTitle>
        <CardDescription>
          {users.length} registered user{users.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Logins</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const isSelf = u.username === currentUser?.name || u.email === currentUser?.email;
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-mono text-xs">{u.id}</TableCell>
                    <TableCell className="font-medium">
                      {u.username}
                      {isSelf && (
                        <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0">
                          you
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                    <TableCell>
                      {u.role === 'admin' ? (
                        <Badge className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">
                          <ShieldCheck className="w-3 h-3 mr-1" weight="fill" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <UserCircle className="w-3 h-3 mr-1" weight="fill" />
                          User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {u.is_active ? (
                        <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-500/30">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-center">
                      {u.login_count ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {u.last_login_at
                        ? new Date(u.last_login_at).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isSelf}>
                            <DotsThreeVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              roleMutation.mutate({
                                userId: u.id,
                                role: u.role === 'admin' ? 'user' : 'admin',
                              })
                            }
                          >
                            {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleMutation.mutate(u.id)}
                            className={u.is_active ? 'text-red-600' : 'text-emerald-600'}
                          >
                            {u.is_active ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Platform stats tab ───────────────────────────────────────────────────

function StatsTab() {
  const { data: stats, isLoading, error } = useQuery<PlatformStats>({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminAPI.getStats(),
    refetchInterval: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Failed to load platform stats.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Total Users" value={stats.total_users} icon={Users} />
      <StatCard label="Active Users" value={stats.active_users} icon={CheckCircle} />
      <StatCard label="Admins" value={stats.admin_count} icon={ShieldCheck} />
      <StatCard label="Quiz Attempts" value={stats.total_quiz_attempts} icon={ChartBar} />
      <StatCard label="Study Sessions" value={stats.total_study_sessions} icon={ChartBar} description="Socratic study mode sessions" />
      <StatCard label="Community Posts" value={stats.total_community_posts} icon={Users} description="Forum / community posts" />
      <StatCard label="Pending Posts" value={stats.pending_community_posts} icon={Clock} description="Awaiting admin review" />
    </div>
  );
}

// ── System health tab ────────────────────────────────────────────────────

function HealthTab() {
  const { data: health, isLoading, error, refetch } = useQuery<SystemHealth>({
    queryKey: ['admin', 'health'],
    queryFn: () => adminAPI.getHealth(),
    refetchInterval: 30_000,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">System Health</h3>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <ArrowClockwise className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <Card>
          <CardContent className="py-8 text-center text-destructive">
            Unable to reach admin health endpoint.
          </CardContent>
        </Card>
      )}

      {health && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Overall Status</CardTitle>
                <ServiceBadge status={health.status} />
              </div>
              <CardDescription className="text-xs">
                Last checked: {new Date(health.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(health.services).map(([service, status]) => (
              <Card key={service}>
                <CardContent className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium capitalize">
                    {service.replace(/_/g, ' ')}
                  </span>
                  <ServiceBadge status={status} />
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Post moderation tab ──────────────────────────────────────────────────

function PostModerationTab() {
  const queryClient = useQueryClient();
  const [noteMap, setNoteMap] = useState<Record<number, string>>({});

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['admin', 'pending-posts'],
    queryFn: () => adminAPI.getPendingPosts(),
    refetchInterval: 15_000,
  });

  const approveMutation = useMutation({
    mutationFn: ({ postId, note }: { postId: number; note?: string }) =>
      adminAPI.approvePost(postId, note),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-posts'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast.success(`Post "${post.title}" approved`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to approve post');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ postId, note }: { postId: number; note?: string }) =>
      adminAPI.rejectPost(postId, note),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-posts'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast.success(`Post "${post.title}" rejected`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to reject post');
    },
  });

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
          Failed to load pending posts. Check backend connectivity.
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-3">
          <CheckCircle size={48} className="text-emerald-500" weight="duotone" />
          <h3 className="text-lg font-semibold">All Caught Up</h3>
          <p className="text-muted-foreground text-sm">No community posts pending review.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pending Community Posts</CardTitle>
          <CardDescription>
            {posts.length} post{posts.length !== 1 ? 's' : ''} awaiting review
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-amber-500/30">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{post.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      By {post.author_name || `User #${post.author_id}`}
                      {post.category && (
                        <Badge variant="secondary" className="ml-2 text-[10px]">
                          {post.category}
                        </Badge>
                      )}
                      <span className="ml-2">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    <Clock className="w-3 h-3 mr-1" weight="fill" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                  {post.content}
                </p>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Optional admin note..."
                    className="text-sm h-16"
                    value={noteMap[post.id] || ''}
                    onChange={(e) =>
                      setNoteMap((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() =>
                        approveMutation.mutate({
                          postId: post.id,
                          note: noteMap[post.id],
                        })
                      }
                      disabled={approveMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" weight="bold" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        rejectMutation.mutate({
                          postId: post.id,
                          note: noteMap[post.id],
                        })
                      }
                      disabled={rejectMutation.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-1" weight="bold" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main admin page ──────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-violet-500" weight="duotone" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage users, view platform analytics, and monitor system health.
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="posts" className="gap-2">
            <ChatText className="w-4 h-4" /> Posts
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <ChartBar className="w-4 h-4" /> Stats
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Heartbeat className="w-4 h-4" /> Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="posts">
          <PostModerationTab />
        </TabsContent>

        <TabsContent value="stats">
          <StatsTab />
        </TabsContent>

        <TabsContent value="health">
          <HealthTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
