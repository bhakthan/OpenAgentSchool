import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Network,
  Eye,
  Funnel,
  MagnifyingGlass,
  ArrowsOut,
  CheckSquare,
  Square,
  CaretDown,
  CaretUp,
  Lightning,
  Warning,
  Spinner,
} from '@phosphor-icons/react';
import type {
  SCLSession as SCLSessionType,
  SCLUIState,
  SCLEffectNode,
  SCLDeepDive,
  DeepDiveLevel,
} from '@/types/supercritical';

// ── Domain colour map ───────────────────────────────────────────────────────
const DOMAIN_COLORS: Record<string, string> = {
  ops: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
  product: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700',
  security: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700',
  org: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700',
  cost: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
  perf: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-700',
};

const ORDER_LABELS: Record<number, string> = { 1: '1st', 2: '2nd', 3: '3rd' };

// ── Props ───────────────────────────────────────────────────────────────────

interface SCLEffectGraphProps {
  session: SCLSessionType;
  uiState: SCLUIState;
  onUIStateChange: (state: SCLUIState) => void;
  /** Trigger a deep dive on selected nodes */
  onDeepDive?: (
    selectedNodeIds: string[],
    level: DeepDiveLevel,
    question?: string
  ) => void;
  /** True while a deep dive LLM call is in-flight */
  isDeepDiving?: boolean;
}

export function SCLEffectGraph({
  session,
  uiState,
  onUIStateChange,
  onDeepDive,
  isDeepDiving,
}: SCLEffectGraphProps) {
  // ── Local state ─────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [diveQuestion, setDiveQuestion] = useState('');
  const [filterText, setFilterText] = useState('');
  const [expandedDiveId, setExpandedDiveId] = useState<string | null>(null);
  const [domainFilter, setDomainFilter] = useState<string | null>(null);

  // ── Derived data ────────────────────────────────────────────────────────
  const nodes = session.effectGraph.nodes;

  const filteredNodes = useMemo(() => {
    let list = nodes;
    if (domainFilter) list = list.filter(n => n.domain === domainFilter);
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      list = list.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.justification.toLowerCase().includes(q)
      );
    }
    return list;
  }, [nodes, domainFilter, filterText]);

  const domainCounts = useMemo(() => {
    const map: Record<string, number> = {};
    nodes.forEach(n => {
      map[n.domain] = (map[n.domain] || 0) + 1;
    });
    return map;
  }, [nodes]);

  const canDive = selectedIds.size > 0 && selectedIds.size <= 5 && onDeepDive;
  const hasSecondary = (session.deepDives ?? []).some(d => d.level === 'secondary');

  // ── Handlers ────────────────────────────────────────────────────────────
  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 5) next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredNodes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNodes.slice(0, 5).map(n => n.id)));
    }
  };

  const fireDive = (level: DeepDiveLevel) => {
    if (!canDive) return;
    onDeepDive!(
      Array.from(selectedIds),
      level,
      diveQuestion.trim() || undefined
    );
  };

  // ── Render helpers ──────────────────────────────────────────────────────
  const renderEffectNode = (node: SCLEffectNode) => {
    const isSelected = selectedIds.has(node.id);
    const domainClass =
      DOMAIN_COLORS[node.domain] ?? 'bg-muted text-muted-foreground border-border';

    return (
      <div
        key={node.id}
        onClick={() => toggle(node.id)}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle(node.id);
          }
        }}
        className={`
          flex items-start gap-3 p-3 rounded-lg border cursor-pointer select-none transition-colors
          ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-border hover:bg-muted/40'}
        `}
      >
        {/* Checkbox */}
        <span className="mt-0.5 flex-shrink-0">
          {isSelected ? (
            <CheckSquare weight="fill" className="h-5 w-5 text-primary" />
          ) : (
            <Square className="h-5 w-5 text-muted-foreground" />
          )}
        </span>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium text-sm leading-tight truncate">
              {node.title}
            </span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${domainClass}`}>
              {node.domain}
            </Badge>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {ORDER_LABELS[node.order] ?? `${node.order}th`} order
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {node.justification}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
            <span>
              Impact{' '}
              <strong className={node.impact > 0 ? 'text-emerald-600' : node.impact < 0 ? 'text-red-500' : ''}>
                {node.impact > 0 ? '+' : ''}
                {node.impact}
              </strong>
            </span>
            <span>
              Likelihood <strong>{Math.round(node.likelihood * 100)}%</strong>
            </span>
            <span>
              Confidence <strong>{Math.round(node.confidence * 100)}%</strong>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ── Render deep dive history ────────────────────────────────────────────
  const renderDiveHistory = (dive: SCLDeepDive) => {
    const isExpanded = expandedDiveId === dive.id;
    return (
      <div key={dive.id} className="border border-border rounded-lg">
        <button
          className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/40 transition-colors"
          onClick={() => setExpandedDiveId(isExpanded ? null : dive.id)}
        >
          <div className="flex items-center gap-2">
            <Lightning weight="fill" className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium capitalize">{dive.level} Deep Dive</span>
            <Badge variant="outline" className="text-[10px]">
              {dive.effects.length} sub-effects
            </Badge>
            {dive.userQuestion && (
              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                — "{dive.userQuestion}"
              </span>
            )}
          </div>
          {isExpanded ? (
            <CaretUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <CaretDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
            <p className="text-xs text-muted-foreground mb-1">
              Selected nodes:{' '}
              {dive.selectedNodes.map(n => n.title).join(', ')}
            </p>
            {dive.effects.map(eff => (
              <div
                key={eff.id}
                className="flex items-center gap-2 p-2 rounded border border-border/50 bg-muted/20 text-sm"
              >
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1 py-0 ${DOMAIN_COLORS[eff.domain] ?? ''}`}
                >
                  {eff.domain}
                </Badge>
                <span className="truncate">{eff.title}</span>
                <span className="ml-auto text-[11px] text-muted-foreground whitespace-nowrap">
                  Impact {eff.impact > 0 ? '+' : ''}
                  {eff.impact}
                </span>
              </div>
            ))}
            {dive.leaps.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-1">
                  <Warning className="h-3.5 w-3.5" /> {dive.leaps.length} new leaps
                </p>
                {dive.leaps.map((l, i) => (
                  <p key={i} className="text-xs text-muted-foreground pl-4">
                    {l.trigger} → {l.result}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────── RENDER ──

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top bar: counts + filter */}
      <div className="flex-shrink-0 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline">{nodes.length} Effects</Badge>
            <Badge variant="outline">{session.effectGraph.edges.length} Connections</Badge>
            {session.leaps.length > 0 && (
              <Badge variant="destructive">{session.leaps.length} Leaps</Badge>
            )}
            {(session.deepDives ?? []).length > 0 && (
              <Badge variant="secondary">
                {(session.deepDives ?? []).length} Deep Dive
                {(session.deepDives ?? []).length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <MagnifyingGlass className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                placeholder="Filter effects…"
                className="pl-7 h-8 text-xs w-40"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDomainFilter(domainFilter ? null : 'ops')}
            >
              <Funnel className="h-4 w-4 mr-1" />
              {domainFilter ?? 'All'}
            </Button>
          </div>
        </div>

        {/* Domain quick-filter chips */}
        {Object.keys(domainCounts).length > 1 && (
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <button
              className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                !domainFilter ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'
              }`}
              onClick={() => setDomainFilter(null)}
            >
              All ({nodes.length})
            </button>
            {Object.entries(domainCounts).map(([d, count]) => (
              <button
                key={d}
                className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                  domainFilter === d
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
                onClick={() => setDomainFilter(domainFilter === d ? null : d)}
              >
                {d} ({count})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Two-column layout: effect list + deep dive panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Effect node list */}
        <Card className="lg:col-span-2 flex flex-col min-h-0">
          <CardHeader className="flex-shrink-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Network className="h-4 w-4" />
                Select Effects for Deep Dive
                {selectedIds.size > 0 && (
                  <Badge className="ml-1">{selectedIds.size} / 5</Badge>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs" onClick={selectAll}>
                {selectedIds.size === Math.min(filteredNodes.length, 5) ? 'Deselect All' : 'Select All (max 5)'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 pt-0">
            <ScrollArea className="h-full max-h-[500px]">
              <div className="space-y-2 pr-2">
                {filteredNodes.length > 0 ? (
                  filteredNodes.map(renderEffectNode)
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No effects match the current filter.
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Deep dive controls + history */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Deep dive trigger */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ArrowsOut className="h-4 w-4" />
                Deep Dive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Select 1–5 effect nodes, then run a secondary (implementation-level) or
                tertiary (operational playbook) analysis.
              </p>
              <Input
                value={diveQuestion}
                onChange={e => setDiveQuestion(e.target.value)}
                placeholder="Optional: steer the analysis…"
                className="h-8 text-xs"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={!canDive || isDeepDiving}
                  onClick={() => fireDive('secondary')}
                  className="flex-1"
                >
                  {isDeepDiving ? (
                    <Spinner className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <MagnifyingGlass weight="bold" className="h-4 w-4 mr-1" />
                  )}
                  Secondary
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={!canDive || isDeepDiving || !hasSecondary}
                  onClick={() => fireDive('tertiary')}
                  className="flex-1"
                  title={
                    !hasSecondary
                      ? 'Run a secondary dive first'
                      : undefined
                  }
                >
                  {isDeepDiving ? (
                    <Spinner className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4 mr-1" />
                  )}
                  Tertiary
                </Button>
              </div>
              {!canDive && selectedIds.size === 0 && (
                <p className="text-[11px] text-muted-foreground">
                  Click effect nodes on the left to select them.
                </p>
              )}
              {selectedIds.size > 5 && (
                <p className="text-[11px] text-destructive">Max 5 nodes per dive.</p>
              )}
            </CardContent>
          </Card>

          {/* Dive history */}
          {(session.deepDives ?? []).length > 0 && (
            <Card className="flex-1 min-h-0 flex flex-col">
              <CardHeader className="pb-2 flex-shrink-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightning className="h-4 w-4" />
                  Dive History
                  <Badge variant="outline" className="ml-auto text-[10px]">
                    {(session.deepDives ?? []).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 pt-0">
                <ScrollArea className="h-full max-h-[300px]">
                  <div className="space-y-2 pr-2">
                    {(session.deepDives ?? []).map(renderDiveHistory)}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default SCLEffectGraph;
