import React, { useState, useMemo } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { BYTE_CATEGORIES, getConceptsForCategory } from '@/lib/data/byteSized';
import type { ByteCategory } from '@/lib/data/byteSized/types';
import { getByteCategoryProgress, getByteConceptProgress } from '@/lib/data/microLearning/progress';

interface CategoryBrowserProps {
  onSelectConcept: (conceptId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  activeCategoryId?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  fundamentals: '🧱',
  prompting: '✏️',
  architecture: '🏗️',
  patterns: '🔀',
  protocols: '🔌',
  'multi-agent': '👥',
  security: '🛡️',
  evaluation: '📊',
  operations: '⚙️',
  strategy: '📐',
  advanced: '🚀',
  applied: '🎯',
};

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  onSelectConcept,
  onSelectCategory,
  activeCategoryId,
}) => {
  const [search, setSearch] = useState('');

  // Category-level progress (each concept has 5 cards)
  const CARDS_PER_CONCEPT = 5;
  const categoryStats = useMemo(() => {
    const stats: Record<string, { completed: number; total: number }> = {};
    for (const cat of BYTE_CATEGORIES) {
      const conceptIds = getConceptsForCategory(cat.id);
      stats[cat.id] = getByteCategoryProgress(conceptIds, CARDS_PER_CONCEPT);
    }
    return stats;
  }, []);

  // When a category is selected, show its concepts
  const activeCategory = BYTE_CATEGORIES.find((c) => c.id === activeCategoryId);
  const activeConcepts = activeCategoryId ? getConceptsForCategory(activeCategoryId) : [];

  // Search filter
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return BYTE_CATEGORIES;
    const q = search.toLowerCase();
    return BYTE_CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.conceptIds.some((id) => id.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* ─── Search ───────────────────────────────────────────── */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search categories or concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="feature-panel w-full rounded-xl border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
      </div>

      {/* ─── Active Category Detail ───────────────────────────── */}
      {activeCategory && (
        <div className="space-y-3">
          <button
            onClick={() => onSelectCategory('')}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← All Categories
          </button>
          <h3 className="text-lg font-bold text-foreground">
            {CATEGORY_ICONS[activeCategory.id] || '📦'} {activeCategory.title}
          </h3>
          <p className="feature-secondary text-pretty text-sm dark:text-muted-foreground">{activeCategory.description}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {activeConcepts.map((conceptId) => {
              const progress = getByteConceptProgress(conceptId, CARDS_PER_CONCEPT);
              const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
              return (
                <button
                  key={conceptId}
                  type="button"
                  onClick={() => {
                    trackEvent({ action: 'byte_concept_select', category: 'byte_sized', label: conceptId });
                    onSelectConcept(conceptId);
                  }}
                  className="feature-card-enter feature-panel group flex items-center gap-3 rounded-xl border p-4 text-left transition-all hover:border-violet-300 hover:shadow-md dark:hover:border-white/20"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {conceptId.replace(/-/g, ' ')}
                    </span>
                    <span className="feature-secondary ml-2 text-xs dark:text-muted-foreground">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  {/* Mini progress */}
                  <div className="h-1.5 w-12 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Category Grid ────────────────────────────────────── */}
      {!activeCategory && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              stats={categoryStats[cat.id]}
              onClick={() => {
                trackEvent({ action: 'byte_category_view', category: 'byte_sized', label: cat.id });
                onSelectCategory(cat.id);
              }}
            />
          ))}
        </div>
      )}

      {!activeCategory && filteredCategories.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No categories match "{search}"
        </p>
      )}
    </div>
  );
};

// ─── Category Card ───────────────────────────────────────────────────────────

function CategoryCard({
  category,
  stats,
  onClick,
}: {
  category: ByteCategory;
  stats: { completed: number; total: number };
  onClick: () => void;
}) {
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const icon = CATEGORY_ICONS[category.id] || '📦';

  return (
    <button
      type="button"
      onClick={onClick}
      className="byte-category-card feature-card-enter feature-panel group flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200 hover:scale-[1.02] hover:border-violet-300 hover:shadow-xl hover:shadow-black/10 dark:hover:border-white/20 dark:hover:shadow-black/20"
    >
      {/* Gradient header */}
      <div
        className="byte-category-card__header flex items-center gap-3 px-5 py-5"
        style={{ background: category.gradient }}
      >
        <span className="text-3xl">{icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-balance truncate text-base font-bold text-foreground">{category.title}</h3>
          <p className="text-pretty line-clamp-2 text-xs feature-secondary dark:text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="byte-category-card__meta flex flex-wrap items-center gap-2">
          <span className="feature-chip rounded-full px-2.5 py-0.5 text-[10px] font-semibold dark:text-muted-foreground">
            {category.conceptIds.length} concepts
          </span>
          <span className="feature-chip rounded-full px-2.5 py-0.5 text-[10px] font-semibold dark:text-muted-foreground">
            {stats.total} cards
          </span>
          {pct > 0 && (
            <span className="rounded-full border border-violet-500/20 bg-violet-500/12 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
              {pct}% done
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full rounded-r-full bg-violet-500 transition-all duration-500"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </button>
  );
}

export default CategoryBrowser;
