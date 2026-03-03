import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trackEvent } from '@/lib/analytics/ga';
import {
  loadProgress,
  getTrackProgress,
  getDailyProgress,
  getRoleProfile,
  getStats,
  setDailyGoal,
} from '@/lib/data/microLearning/progress';
import { getTrackById, TRACKS } from '@/lib/data/microLearning/tracks';
import {
  getAllAchievementsWithStatus,
  type MicroAchievement,
} from '@/lib/hooks/microLearningAchievements';
import { ReviewQueue } from './ReviewQueue';

interface DashboardProps {
  onOpenRoleSorter: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenRoleSorter }) => {
  const progress = useMemo(() => loadProgress(), []);
  const daily = useMemo(() => getDailyProgress(), []);
  const stats = useMemo(() => getStats(), []);
  const role = useMemo(() => getRoleProfile(), []);

  // Achievements
  const achievements = useMemo(() => getAllAchievementsWithStatus(), []);
  const unlocked = achievements.filter((a) => a.unlocked);
  const nextUp = achievements.filter((a) => !a.unlocked).slice(0, 3);

  // Daily goal editing
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState(daily.goal);

  // Determine active tracks (any with ≥1 completion)
  const activeTracks = useMemo(() => {
    return TRACKS.map((t) => ({
      track: t,
      progress: getTrackProgress(t.id),
    }))
      .filter((tp) => tp.progress.completed > 0)
      .sort((a, b) => {
        // Most-recently-worked-on first
        const aLast = progress.completions
          .filter((c) => c.capsuleId.startsWith(a.track.id) || a.track.conceptIds.some((cid) => c.capsuleId.includes(cid)))
          .at(-1)?.timestamp ?? 0;
        const bLast = progress.completions
          .filter((c) => c.capsuleId.startsWith(b.track.id) || b.track.conceptIds.some((cid) => c.capsuleId.includes(cid)))
          .at(-1)?.timestamp ?? 0;
        return bLast - aLast;
      });
  }, [progress]);

  // Find the "continue" track & capsule — the most recently active track's next incomplete capsule
  const continueTrack = activeTracks[0];

  return (
    <div className="space-y-8">
      {/* ─── Welcome / Streak Banner ──────────────────────────── */}
      <div className="rounded-2xl border bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 p-6 text-foreground">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {stats.streak > 0 ? `🔥 ${stats.streak}-day streak!` : '👋 Welcome back!'}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {stats.totalCapsules === 0
                ? 'Ready to start your AI agent mastery journey?'
                : `${stats.totalCapsules} capsules completed · ${stats.totalXP} XP earned`}
            </p>
          </div>

          {/* Daily goal ring */}
          <DailyGoalRing completed={daily.completed} goal={daily.goal} />
        </div>
      </div>

      {/* ─── Continue Learning ────────────────────────────────── */}
      {continueTrack && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Continue Learning</h3>
          <Link
            to={`/micro-learning/${continueTrack.track.id}`}
            className="block rounded-2xl border bg-card text-card-foreground hover:shadow-md transition-shadow p-5"
            onClick={() => trackEvent({ action: 'micro_dashboard_continue', category: 'micro_learning', label: continueTrack.track.id })}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{continueTrack.track.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate text-foreground">{continueTrack.track.title}</h4>
                <p className="text-xs text-muted-foreground">{continueTrack.progress.completed}/{continueTrack.progress.total} capsules</p>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500 transition-all"
                    style={{ width: `${continueTrack.progress.percentage}%` }}
                  />
                </div>
              </div>
              <Button size="sm">Resume →</Button>
            </div>
          </Link>
        </div>
      )}

      {/* ─── Active Tracks ────────────────────────────────────── */}
      {activeTracks.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Your Tracks</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {activeTracks.slice(1).map(({ track, progress: tp }) => (
              <Link
                key={track.id}
                to={`/micro-learning/${track.id}`}
                className="rounded-xl border bg-card text-card-foreground p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{track.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate text-foreground">{track.title}</h4>
                    <p className="text-xs text-muted-foreground">{tp.percentage}% complete</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ─── Quick Actions ────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Link
          to="/micro-learning"
          className="rounded-xl border bg-card text-card-foreground p-4 hover:shadow-sm text-center transition-shadow"
        >
          <div className="text-2xl mb-1">🗺️</div>
          <p className="text-sm font-medium">Browse All Tracks</p>
        </Link>
        <button
          onClick={onOpenRoleSorter}
          className="rounded-xl border bg-card text-card-foreground p-4 hover:shadow-sm text-center transition-shadow"
        >
          <div className="text-2xl mb-1">🧭</div>
          <p className="text-sm font-medium">{role ? 'Retake Sorter' : 'Find Your Path'}</p>
        </button>
        <Link
          to="/study-mode"
          className="rounded-xl border bg-card text-card-foreground p-4 hover:shadow-sm text-center transition-shadow"
        >
          <div className="text-2xl mb-1">🧠</div>
          <p className="text-sm font-medium">Quick Review</p>
        </Link>
      </div>

      {/* ─── Stats Row ────────────────────────────────────────── */}
      <div className="rounded-xl border bg-card text-card-foreground p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <StatCell label="Total XP" value={stats.totalXP.toLocaleString()} />
          <StatCell label="Capsules" value={String(stats.totalCapsules)} />
          <StatCell label="Best Streak" value={`${stats.streak}d`} />
          <StatCell label="Tracks Active" value={String(activeTracks.length)} />
        </div>
      </div>

      {/* ─── Reviews & Recommendations (Phase 5) ─────────────── */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Smart Review</h3>
        <ReviewQueue progress={progress} />
      </div>

      {/* ─── Achievements Showcase ────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <span className="text-xs text-muted-foreground">
            {unlocked.length}/{achievements.length} unlocked
          </span>
        </div>

        {/* Unlocked achievements */}
        {unlocked.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.slice(0, 6).map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-3 flex items-center gap-3 text-foreground ${
                  a.rarity === 'legendary' ? 'bg-amber-500/5 border-amber-500/20' :
                  a.rarity === 'epic' ? 'bg-violet-500/5 border-violet-500/20' :
                  a.rarity === 'rare' ? 'bg-blue-500/5 border-blue-500/20' :
                  'bg-card'
                }`}
              >
                <span className="text-2xl">{a.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate text-foreground">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{a.description}</p>
                </div>
                <Badge
                  className={`ml-auto text-[9px] flex-shrink-0 ${
                    a.rarity === 'legendary' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                    a.rarity === 'epic' ? 'bg-violet-500/10 text-violet-700 dark:text-violet-400' :
                    a.rarity === 'rare' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                    'bg-muted text-muted-foreground'
                  }`}
                >
                  {a.rarity}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center">
            <p className="text-2xl mb-2">🏆</p>
            <p className="text-sm text-muted-foreground">Complete capsules to unlock achievements!</p>
          </div>
        )}

        {/* Next achievements to unlock */}
        {nextUp.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Next to unlock</p>
            <div className="flex flex-wrap gap-2">
              {nextUp.map((a) => (
                <div
                  key={a.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <span className="opacity-40">{a.icon}</span>
                  <span>{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Daily Goal Adjustment ────────────────────────────── */}
      <div className="rounded-xl border bg-card text-card-foreground p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Daily Goal</p>
            <p className="text-xs text-muted-foreground">
              {daily.completed >= daily.goal
                ? "✅ You've hit today's goal!"
                : `${daily.goal - daily.completed} more capsule${daily.goal - daily.completed !== 1 ? 's' : ''} to go`}
            </p>
          </div>
          {editingGoal ? (
            <div className="flex items-center gap-2">
              {[3, 5, 7, 10].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    trackEvent({ action: 'micro_daily_goal_change', category: 'micro_learning', value: g });
                    setDailyGoal(g);
                    setGoalDraft(g);
                    setEditingGoal(false);
                  }}
                  className={`w-8 h-8 rounded-full text-xs font-bold border transition-colors ${
                    g === goalDraft
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setEditingGoal(true)}
              className="text-xs text-primary hover:underline"
            >
              {daily.goal}/day · Change
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Sub-components ─────────────────────────────────────────── */

const DailyGoalRing: React.FC<{ completed: number; goal: number }> = ({ completed, goal }) => {
  const pct = Math.min(100, (completed / goal) * 100);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="5" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="url(#dailyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="dailyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xs font-bold">{completed}/{goal}</span>
    </div>
  );
};

const StatCell: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default Dashboard;
