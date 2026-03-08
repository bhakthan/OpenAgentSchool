import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  querySphere,
  isLLMConfigured,
  isSearchConfigured,
  SPHERE_PRESETS,
  type SphereMode,
  type SphereResult,
} from '@/lib/data/microLearning/conceptSphere';
import { trackEvent } from '@/lib/analytics/ga';

interface ConceptSphereProps {
  conceptId: string;
  conceptTitle: string;
  /** Called to close the sphere panel */
  onClose: () => void;
}

/* ── Preset colour mapping (icon bg gradient by mode) ─────────────────────── */
const MODE_COLORS: Record<string, { ring: string; iconBg: string; glow: string }> = {
  explain:  { ring: 'ring-amber-400/40',   iconBg: 'from-amber-400 to-orange-500',  glow: 'shadow-amber-400/20' },
  latest:   { ring: 'ring-emerald-400/40',  iconBg: 'from-emerald-400 to-teal-500',  glow: 'shadow-emerald-400/20' },
  expand:   { ring: 'ring-sky-400/40',      iconBg: 'from-sky-400 to-blue-500',      glow: 'shadow-sky-400/20' },
  example:  { ring: 'ring-violet-400/40',   iconBg: 'from-violet-400 to-purple-500', glow: 'shadow-violet-400/20' },
  compare:  { ring: 'ring-rose-400/40',     iconBg: 'from-rose-400 to-pink-500',     glow: 'shadow-rose-400/20' },
  custom:   { ring: 'ring-fuchsia-400/40',  iconBg: 'from-fuchsia-400 to-pink-500',  glow: 'shadow-fuchsia-400/20' },
};

/**
 * ConceptSphere — Just-in-Time learning slide-in panel.
 * Appears inside the CapsuleView when the learner clicks "🔮 Explore Deeper".
 * Uses their configured LLM to expand on the current concept.
 */
export const ConceptSphere: React.FC<ConceptSphereProps> = ({
  conceptId,
  conceptTitle,
  onClose,
}) => {
  const [activeMode, setActiveMode] = useState<SphereMode | null>(null);
  const [result, setResult] = useState<SphereResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [compareWith, setCompareWith] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const hasLLM = isLLMConfigured();
  const hasSearch = isSearchConfigured();

  // Scroll result into view when it arrives
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);

  const handleQuery = useCallback(
    async (mode: SphereMode) => {
      setActiveMode(mode);
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await querySphere({
          conceptId,
          conceptTitle,
          mode,
          customPrompt: mode === 'custom' ? customPrompt : undefined,
          compareWith: mode === 'compare' ? compareWith : undefined,
        });
        setResult(res);

        trackEvent({
          action: 'concept_sphere_query',
          category: 'micro-learning',
          label: `${conceptId}::${mode}`,
        });
      } catch (err: any) {
        setError(
          err?.message?.includes('API key')
            ? 'API key not configured. Go to Settings → LLM/API Config to add your key.'
            : err?.message ?? 'Something went wrong. Check your LLM settings.',
        );
      } finally {
        setLoading(false);
      }
    },
    [conceptId, conceptTitle, customPrompt, compareWith],
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xl overflow-hidden backdrop-blur-sm">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-4 text-white overflow-hidden">
        {/* Animated shimmer overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
            animation: 'sphere-shimmer 3s ease-in-out infinite',
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-lg">
              🔮
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Concept Sphere</h3>
              <p className="text-[11px] text-white/70 mt-0.5">
                Just-in-time learning · <span className="capitalize">{conceptTitle.replace(/-/g, ' ')}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all text-xs"
            aria-label="Close Concept Sphere"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* ── LLM not configured ────────────────────────────────── */}
        {!hasLLM && (
          <div className="relative rounded-xl border border-amber-400/30 bg-amber-50/80 dark:bg-amber-950/20 p-4 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-xl" />
            <div className="pl-3">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                🔑 LLM not configured
              </p>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 leading-relaxed">
                Add your API key in Settings to unlock Concept Sphere.
                Your key stays in your browser — never sent to our servers.
              </p>
              <Link
                to="/settings"
                className="inline-flex items-center gap-1 mt-2.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Open Settings <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}

        {/* ── Preset Selection Grid ─────────────────────────────── */}
        <div className="space-y-3">
          <p className="text-[11px] text-foreground/60 dark:text-muted-foreground font-semibold uppercase tracking-[0.12em]">
            What do you want to know?
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {SPHERE_PRESETS.map((preset) => {
              const isActive = activeMode === preset.mode;
              const colors = MODE_COLORS[preset.mode] ?? MODE_COLORS.custom;
              return (
                <button
                  key={preset.mode}
                  onClick={() => handleQuery(preset.mode)}
                  disabled={!hasLLM || loading}
                  className={`group relative rounded-xl border p-3 text-left text-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    isActive
                      ? `border-transparent ring-2 ${colors.ring} bg-card shadow-lg ${colors.glow}`
                      : 'border-border/50 hover:border-border hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Colour-coded icon pill */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${colors.iconBg} text-white text-sm shadow-sm transition-transform duration-200 group-hover:scale-110`}
                    >
                      {preset.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-foreground leading-tight">{preset.label}</p>
                        {preset.searchEligible && hasSearch && (
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400" title="Live web search enabled">🌐</span>
                        )}
                      </div>
                      <p className="text-[11px] text-foreground/60 dark:text-muted-foreground mt-0.5 leading-snug">{preset.description}</p>
                    </div>
                  </div>
                  {/* Active pulse dot */}
                  {isActive && loading && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Compare input ─────────────────────────────────────── */}
        {activeMode === 'compare' && !result && !loading && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="text-xs font-semibold text-foreground/60 dark:text-muted-foreground">Compare with:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={compareWith}
                onChange={(e) => setCompareWith(e.target.value)}
                placeholder="e.g., RAG vs Fine-tuning"
                className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && compareWith.trim()) handleQuery('compare');
                }}
              />
              <Button
                size="sm"
                disabled={!compareWith.trim()}
                onClick={() => handleQuery('compare')}
              >
                Compare →
              </Button>
            </div>
          </div>
        )}

        {/* ── Custom question ───────────────────────────────────── */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ask anything about this concept…"
                disabled={!hasLLM || loading}
                className="w-full rounded-xl border border-border/60 bg-background pl-3 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customPrompt.trim()) handleQuery('custom');
                }}
              />
              {/* Inline send icon */}
              <button
                onClick={() => { if (customPrompt.trim()) handleQuery('custom'); }}
                disabled={!hasLLM || loading || !customPrompt.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Send custom question"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Loading state ─────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-8 animate-in fade-in duration-300">
            {/* Gradient pulsing orb */}
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-violet-500 to-fuchsia-500 opacity-20 animate-ping" style={{ animationDuration: '1.5s' }} />
              <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-primary via-violet-500 to-fuchsia-500 opacity-30 animate-pulse" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-sm">
                <span className="text-sm">🔮</span>
              </div>
            </div>
            <p className="text-sm font-medium text-foreground/70 dark:text-muted-foreground">
              {hasSearch && activeMode && ['latest', 'expand', 'custom'].includes(activeMode)
                ? 'Searching the web & thinking…'
                : 'Thinking…'}
            </p>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Error state ───────────────────────────────────────── */}
        {error && (
          <div className="relative rounded-xl border border-red-400/30 bg-red-50/80 dark:bg-red-950/20 p-4 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-red-400 to-rose-500 rounded-l-xl" />
            <p className="pl-3 text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* ── Result ────────────────────────────────────────────── */}
        {result && (
          <div ref={resultRef} className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Meta badge row */}
            <div className="flex items-center gap-2 text-[11px] text-foreground/60 dark:text-muted-foreground flex-wrap">
              {result.cached && (
                <Badge variant="outline" className="text-[10px] bg-muted/70 dark:bg-muted/50">⚡ Cached</Badge>
              )}
              {result.searchAugmented && (
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400">
                  🌐 {result.searchResultCount} web result{result.searchResultCount !== 1 ? 's' : ''} via {result.searchProvider}
                </Badge>
              )}
              <span className="opacity-60">via {result.provider}</span>
            </div>

            {/* Response card */}
            <div className="relative rounded-xl border border-border/50 bg-gradient-to-b from-muted/20 to-muted/5 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500" />

              <div className="p-5 space-y-1">
                {result.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (trimmed === '') return <div key={i} className="h-2" />;
                  if (trimmed.startsWith('# '))
                    return (
                      <h3 key={i} className="font-bold text-base text-foreground mt-4 mb-1.5 flex items-center gap-2">
                        <span className="inline-block h-5 w-0.5 rounded-full bg-primary" />
                        {trimmed.slice(2)}
                      </h3>
                    );
                  if (trimmed.startsWith('## '))
                    return (
                      <h4 key={i} className="font-semibold text-sm text-foreground mt-3 mb-1">
                        {trimmed.slice(3)}
                      </h4>
                    );
                  if (trimmed.startsWith('### '))
                    return (
                      <h5 key={i} className="font-medium text-sm text-foreground/90 mt-2 mb-1">
                        {trimmed.slice(4)}
                      </h5>
                    );
                  if (trimmed.startsWith('- ') || trimmed.startsWith('* '))
                    return (
                      <li key={i} className="ml-4 text-sm text-foreground/85 leading-relaxed list-disc marker:text-primary">
                        {renderInlineMarkdown(trimmed.slice(2))}
                      </li>
                    );
                  if (trimmed.startsWith('```'))
                    return (
                      <pre key={i} className="bg-muted/60 dark:bg-muted/40 rounded-lg p-3 text-xs text-foreground/90 overflow-x-auto border border-border/30 font-mono">
                        <code>{trimmed.slice(3)}</code>
                      </pre>
                    );
                  return (
                    <p key={i} className="text-sm text-foreground/85 leading-relaxed">
                      {renderInlineMarkdown(trimmed)}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* ── Follow-up pills ───────────────────────────────── */}
            <div className="flex flex-wrap gap-2">
              {result.query.mode !== 'expand' && (
                <button
                  onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::expand` }); handleQuery('expand'); }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-sky-400/40 hover:bg-sky-500/5 hover:shadow-sm transition-all duration-200"
                >
                  🔬 Go Deeper
                </button>
              )}
              {result.query.mode !== 'example' && (
                <button
                  onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::example` }); handleQuery('example'); }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-violet-400/40 hover:bg-violet-500/5 hover:shadow-sm transition-all duration-200"
                >
                  💻 Show Example
                </button>
              )}
              {result.query.mode !== 'latest' && (
                <button
                  onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::latest` }); handleQuery('latest'); }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-emerald-400/40 hover:bg-emerald-500/5 hover:shadow-sm transition-all duration-200"
                >
                  📡 What's New?
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Keyframes (scoped via inline style tag) ──────────── */}
      <style>{`
        @keyframes sphere-shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

/** Basic inline markdown: **bold**, `code`, *italic* */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Code
    const codeMatch = remaining.match(/`(.+?)`/);

    const nextMatch = [boldMatch, codeMatch]
      .filter(Boolean)
      .sort((a, b) => (a!.index ?? Infinity) - (b!.index ?? Infinity))[0];

    if (!nextMatch || nextMatch.index === undefined) {
      parts.push(remaining);
      break;
    }

    // Text before match
    if (nextMatch.index > 0) {
      parts.push(remaining.slice(0, nextMatch.index));
    }

    if (nextMatch === boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-foreground">{nextMatch[1]}</strong>);
    } else if (nextMatch === codeMatch) {
      parts.push(
        <code key={key++} className="bg-muted/60 dark:bg-muted/40 px-1.5 py-0.5 rounded text-[12px] font-mono text-foreground/90 border border-border/20">
          {nextMatch[1]}
        </code>,
      );
    }

    remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default ConceptSphere;
