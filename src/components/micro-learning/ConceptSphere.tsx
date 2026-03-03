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
    <div className="rounded-2xl border bg-card text-card-foreground shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔮</span>
            <div>
              <h3 className="font-bold text-sm">Concept Sphere</h3>
              <p className="text-xs text-white/80">Just-in-time learning · {conceptTitle.replace(/-/g, ' ')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* LLM not configured banner */}
        {!hasLLM && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-50 dark:bg-amber-950/30 p-4">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              🔑 LLM not configured
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              Add your API key in Settings to use Concept Sphere.
              Your key stays in your browser — never sent to our servers.
            </p>
            <Link
              to="/settings"
              className="inline-block mt-2 text-xs font-medium text-primary hover:underline"
            >
              Open Settings →
            </Link>
          </div>
        )}

        {/* Quick presets */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            What do you want to know?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SPHERE_PRESETS.map((preset) => (
              <button
                key={preset.mode}
                onClick={() => handleQuery(preset.mode)}
                disabled={!hasLLM || loading}
                className={`rounded-xl border p-3 text-left transition-all text-foreground hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeMode === preset.mode
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                    : 'hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{preset.icon}</span>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium text-foreground">{preset.label}</p>
                      {preset.searchEligible && hasSearch && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400" title="Live web search enabled">🌐</span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{preset.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Compare mode input */}
        {activeMode === 'compare' && !result && !loading && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Compare with:</label>
            <input
              type="text"
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              placeholder="e.g., RAG vs Fine-tuning"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <Button
              size="sm"
              disabled={!compareWith.trim()}
              onClick={() => handleQuery('compare')}
            >
              Compare →
            </Button>
          </div>
        )}

        {/* Custom question */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask anything about this concept…"
              disabled={!hasLLM || loading}
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customPrompt.trim()) handleQuery('custom');
              }}
            />
            <Button
              size="sm"
              disabled={!hasLLM || loading || !customPrompt.trim()}
              onClick={() => handleQuery('custom')}
            >
              Ask
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">
              {hasSearch && activeMode && ['latest', 'expand', 'custom'].includes(activeMode)
                ? 'Searching the web & thinking…'
                : 'Thinking…'}
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-950/30 p-4">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div ref={resultRef} className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              {result.cached && (
                <Badge variant="outline" className="text-[10px]">Cached</Badge>
              )}
              {result.searchAugmented && (
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                  🌐 {result.searchResultCount} web result{result.searchResultCount !== 1 ? 's' : ''} via {result.searchProvider}
                </Badge>
              )}
              <span>via {result.provider}</span>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4 prose prose-sm dark:prose-invert max-w-none">
              {/* Simple markdown rendering (paragraphs, bold, code, lists) */}
              {result.content.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (trimmed === '') return <br key={i} />;
                if (trimmed.startsWith('# '))
                  return <h3 key={i} className="font-bold text-base mt-3 mb-1">{trimmed.slice(2)}</h3>;
                if (trimmed.startsWith('## '))
                  return <h4 key={i} className="font-semibold text-sm mt-2 mb-1">{trimmed.slice(3)}</h4>;
                if (trimmed.startsWith('### '))
                  return <h5 key={i} className="font-medium text-sm mt-2 mb-1">{trimmed.slice(4)}</h5>;
                if (trimmed.startsWith('- ') || trimmed.startsWith('* '))
                  return <li key={i} className="ml-4 text-sm">{renderInlineMarkdown(trimmed.slice(2))}</li>;
                if (trimmed.startsWith('```'))
                  return <pre key={i} className="bg-muted rounded p-2 text-xs overflow-x-auto"><code>{trimmed.slice(3)}</code></pre>;
                return <p key={i} className="text-sm leading-relaxed">{renderInlineMarkdown(trimmed)}</p>;
              })}
            </div>

            {/* Quick follow-ups */}
            <div className="flex flex-wrap gap-2">
              {result.query.mode !== 'expand' && (
                <Button variant="outline" size="sm" onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::expand` }); handleQuery('expand'); }}>
                  🔬 Go Deeper
                </Button>
              )}
              {result.query.mode !== 'example' && (
                <Button variant="outline" size="sm" onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::example` }); handleQuery('example'); }}>
                  💻 Show Example
                </Button>
              )}
              {result.query.mode !== 'latest' && (
                <Button variant="outline" size="sm" onClick={() => { trackEvent({ action: 'concept_sphere_followup', category: 'micro_learning', label: `${conceptId}::latest` }); handleQuery('latest'); }}>
                  📡 What's New?
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
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
      parts.push(<strong key={key++}>{nextMatch[1]}</strong>);
    } else if (nextMatch === codeMatch) {
      parts.push(
        <code key={key++} className="bg-muted px-1 rounded text-xs">
          {nextMatch[1]}
        </code>,
      );
    }

    remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default ConceptSphere;
