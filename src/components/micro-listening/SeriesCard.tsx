import type { ListeningSeries, SeriesCategory } from '@/lib/data/microListening/types';

interface SeriesCardProps {
  series: ListeningSeries;
  completionPercent: number;
  onSelect: (seriesId: string) => void;
}

const categoryDisplay: Record<SeriesCategory, string> = {
  'core-concepts': 'Core Concepts',
  'agent-patterns': 'Agent Patterns',
  'agents-for-science': 'Science',
  'ai-science-factory': 'Science Factory',
  'adoption-playbook': 'Adoption',
  'applied-ai-skills': 'Applied Skills',
};

const difficultyColor: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400',
  intermediate: 'bg-blue-500/20 text-blue-400',
  advanced: 'bg-purple-500/20 text-purple-400',
  expert: 'bg-amber-500/20 text-amber-400',
};

export function SeriesCard({ series, completionPercent, onSelect }: SeriesCardProps) {
  const completionLabel =
    completionPercent > 0 ? `${Math.round(completionPercent)}% complete` : 'Not started';

  return (
    <button
      type="button"
      onClick={() => onSelect(series.id)}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-200 hover:scale-[1.02] hover:border-violet-300 hover:shadow-xl hover:shadow-black/10 dark:hover:border-white/20 dark:hover:shadow-black/20"
    >
      {/* Gradient top section */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{
          background: series.gradient || `linear-gradient(135deg, ${series.color}33, ${series.color}11)`,
        }}
      >
        {/* Icon placeholder — first letter circle */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: series.color || '#6366f1' }}
        >
          {series.icon?.charAt(0)?.toUpperCase() ?? '🎧'}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-foreground">{series.title}</h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">{series.description}</p>
        </div>
      </div>

      {/* Meta section */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {series.episodes.length} episodes
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {categoryDisplay[series.category] ?? series.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
              difficultyColor[series.difficulty] ?? 'bg-slate-500/20 text-slate-400'
            }`}
          >
            {series.difficulty}
          </span>
        </div>

        <span className="text-xs text-muted-foreground">{completionLabel}</span>
      </div>

      {/* Completion progress bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full rounded-r-full transition-all duration-500"
          style={{
            width: `${Math.min(completionPercent, 100)}%`,
            backgroundColor: series.color || '#6366f1',
          }}
        />
      </div>
    </button>
  );
}
