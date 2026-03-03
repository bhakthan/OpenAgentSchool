import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TRACKS, getTrackProgress } from '@/lib/data/microLearning';
import type { Track, LearnerRole, TrackDifficulty } from '@/lib/data/microLearning';
import { trackEvent } from '@/lib/analytics/ga';

interface TrackBrowserProps {
  recommendedTrackIds?: string[];
  /** Jump directly to a track */
  onTrackSelect?: (trackId: string) => void;
}

const ROLE_LABELS: Record<LearnerRole, string> = {
  developer: 'Developer',
  'product-manager': 'Product Manager',
  'business-leader': 'Business Leader',
  'ai-engineer': 'AI Engineer',
};

const DIFFICULTY_COLORS: Record<TrackDifficulty, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  advanced: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
  expert: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
};

type FilterTab = 'all' | 'for-you' | LearnerRole | TrackDifficulty;

export const TrackBrowser: React.FC<TrackBrowserProps> = ({ recommendedTrackIds, onTrackSelect }) => {
  const [filter, setFilter] = useState<FilterTab>(recommendedTrackIds?.length ? 'for-you' : 'all');

  const filteredTracks = useMemo(() => {
    if (filter === 'all') return TRACKS;
    if (filter === 'for-you') {
      if (!recommendedTrackIds?.length) return TRACKS;
      // Show recommended first, then the rest
      const recSet = new Set(recommendedTrackIds);
      const rec = TRACKS.filter((t) => recSet.has(t.id));
      const rest = TRACKS.filter((t) => !recSet.has(t.id));
      return [...rec, ...rest];
    }
    // Role or difficulty filter
    if (['developer', 'product-manager', 'business-leader', 'ai-engineer'].includes(filter)) {
      return TRACKS.filter((t) => t.roles.includes(filter as LearnerRole));
    }
    return TRACKS.filter((t) => t.difficulty === filter);
  }, [filter, recommendedTrackIds]);

  const filterTabs: { value: FilterTab; label: string }[] = [
    { value: 'all', label: 'All' },
    ...(recommendedTrackIds?.length ? [{ value: 'for-you' as FilterTab, label: 'For You' }] : []),
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  return (
    <section id="track-browser" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Learning Tracks</h2>
        <span className="text-sm text-muted-foreground">{filteredTracks.length} tracks</span>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter tracks">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={filter === tab.value}
            onClick={() => { trackEvent({ action: 'micro_filter_tracks', category: 'micro_learning', label: tab.value }); setFilter(tab.value); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === tab.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-foreground/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Track cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isRecommended={recommendedTrackIds?.includes(track.id) ?? false}
            onSelect={onTrackSelect}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Track Card ──────────────────────────────────────────────────────────────

interface TrackCardProps {
  track: Track;
  isRecommended: boolean;
  onSelect?: (trackId: string) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, isRecommended, onSelect }) => {
  const { completed, total, percent } = getTrackProgress(track.id);
  const isStarted = percent > 0;

  return (
    <Link
      to={`/micro-learning/${track.id}`}
      onClick={(e) => {
        trackEvent({ action: 'micro_track_card_click', category: 'micro_learning', label: track.id, value: percent });
        if (onSelect) {
          e.preventDefault();
          onSelect(track.id);
        }
      }}
      className="group relative rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Gradient left accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${track.gradient}`} />

      {/* Recommended ribbon */}
      {isRecommended && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-to-r from-primary to-violet-500 text-white text-[10px] px-2">
            Recommended
          </Badge>
        </div>
      )}

      <div className="p-5 pl-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white shrink-0`}>
            <span className="text-lg font-bold">{track.title.charAt(0)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {track.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{track.tagline}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">{track.capsuleCount} capsules</span>
          <span className="text-xs text-muted-foreground">~{track.estimatedHours}h</span>
          <Badge variant="outline" className={`text-[10px] capitalize ${DIFFICULTY_COLORS[track.difficulty]}`}>
            {track.difficulty}
          </Badge>
        </div>

        {/* Role tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {track.roles.map((role) => (
            <span key={role} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {ROLE_LABELS[role]}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        {isStarted && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{completed}/{total} capsules</span>
              <span>{percent}%</span>
            </div>
            <Progress value={percent} className="h-1.5" />
          </div>
        )}

        {/* Outcome statement on hover */}
        <p className="mt-3 text-xs text-muted-foreground/70 line-clamp-2 group-hover:text-muted-foreground transition-colors">
          {track.outcomeStatement}
        </p>
      </div>
    </Link>
  );
};

export default TrackBrowser;
