import type { ReactNode } from 'react';
import {
  Brain, Cpu, ShieldCheck, Rocket, TreeStructure, Sparkle, Flask, Factory,
  GraduationCap, Lightning, ChartLineUp, Scales, UsersThree, Binoculars,
  Headphones, Blueprint, Strategy,
} from '@phosphor-icons/react';
import type { ListeningSeries, SeriesCategory } from '@/lib/data/microListening/types';

/** Maps Phosphor icon name strings from series data to React elements. */
const ICON_MAP: Record<string, ReactNode> = {
  Brain: <Brain size={20} weight="duotone" />,
  Cpu: <Cpu size={20} weight="duotone" />,
  ShieldCheck: <ShieldCheck size={20} weight="duotone" />,
  Rocket: <Rocket size={20} weight="duotone" />,
  Blueprint: <Blueprint size={20} weight="duotone" />,
  TreeStructure: <TreeStructure size={20} weight="duotone" />,
  Sparkle: <Sparkle size={20} weight="duotone" />,
  Flask: <Flask size={20} weight="duotone" />,
  Factory: <Factory size={20} weight="duotone" />,
  Strategy: <Strategy size={20} weight="duotone" />,
  GraduationCap: <GraduationCap size={20} weight="duotone" />,
  Lightning: <Lightning size={20} weight="duotone" />,
  ChartLine: <ChartLineUp size={20} weight="duotone" />,
  Scales: <Scales size={20} weight="duotone" />,
  UsersThree: <UsersThree size={20} weight="duotone" />,
  Binoculars: <Binoculars size={20} weight="duotone" />,
  Headphones: <Headphones size={20} weight="duotone" />,
};

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
  beginner: 'border border-emerald-500/20 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
  intermediate: 'border border-blue-500/20 bg-blue-500/12 text-blue-700 dark:text-blue-300',
  advanced: 'border border-violet-500/20 bg-violet-500/12 text-violet-700 dark:text-violet-300',
  expert: 'border border-amber-500/20 bg-amber-500/12 text-amber-700 dark:text-amber-300',
};

export function SeriesCard({ series, completionPercent, onSelect }: SeriesCardProps) {
  const completionLabel =
    completionPercent > 0 ? `${Math.round(completionPercent)}% complete` : 'Not started';

  return (
    <button
      type="button"
      onClick={() => onSelect(series.id)}
      className="listening-series-card feature-card-enter group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-200 hover:scale-[1.02] hover:border-violet-300 hover:shadow-xl hover:shadow-black/10 dark:hover:border-white/20 dark:hover:shadow-black/20"
    >
      {/* Gradient top section */}
      <div
        className="listening-series-card__hero flex items-center gap-3 px-5 py-5"
        style={{
          background: series.gradient || `linear-gradient(135deg, ${series.color}33, ${series.color}11)`,
        }}
      >
        {/* Series icon */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: series.color || '#6366f1' }}
        >
          {ICON_MAP[series.icon] ?? <Headphones size={20} weight="duotone" />}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-balance truncate text-base font-bold text-foreground">{series.title}</h3>
          <p className="text-pretty line-clamp-2 text-xs feature-secondary dark:text-muted-foreground">{series.description}</p>
        </div>
      </div>

      {/* Meta section */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="listening-series-card__meta flex flex-wrap items-center gap-2">
          <span className="feature-chip rounded-full px-2.5 py-0.5 text-[10px] font-semibold dark:text-muted-foreground">
            {series.episodes.length} episodes
          </span>
          <span className="feature-chip rounded-full px-2.5 py-0.5 text-[10px] font-semibold dark:text-muted-foreground">
            {categoryDisplay[series.category] ?? series.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
              difficultyColor[series.difficulty] ?? 'border border-slate-500/20 bg-slate-500/12 text-slate-700 dark:text-slate-300'
            }`}
          >
            {series.difficulty}
          </span>
        </div>

        <span className="feature-secondary text-xs dark:text-muted-foreground">{completionLabel}</span>
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
