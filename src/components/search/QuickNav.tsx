import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  MagnifyingGlass,
  ArrowSquareOut,
  ArrowElbowDownLeft,
  X,
  House,
  BookOpen,
  Brain,
  Lightbulb,
  Tree,
  Gear,
  ChartBar,
  Users,
  GraduationCap,
  Robot,
  ShieldCheck,
  Globe,
  Notebook,
  Star,
  Lightning,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics/ga';

/* ────────────────────────────────────────────────────────
 * Navigable page index
 * ──────────────────────────────────────────────────────── */

interface NavItem {
  id: string;
  title: string;
  path: string;
  keywords: string;          // extra search terms
  section: string;           // grouping label
  icon?: React.ReactNode;
}

const ICON_SIZE = 16;

const NAV_ITEMS: NavItem[] = [
  // ── Top-level pages ──
  { id: 'home',            title: 'Home — Concepts Explorer',       path: '/',                    keywords: 'home concepts explore hub',                   section: 'Pages',     icon: <House size={ICON_SIZE} /> },
  { id: 'ai-skills',       title: 'AI Skills Explorer',             path: '/ai-skills',           keywords: 'skills applied',                              section: 'Pages',     icon: <Lightning size={ICON_SIZE} /> },
  { id: 'ai-product',      title: 'AI Product Framework',           path: '/ai-product-framework',keywords: 'product framework',                           section: 'Pages',     icon: <Lightbulb size={ICON_SIZE} /> },
  { id: 'study-mode',      title: 'Study Mode',                     path: '/study-mode',          keywords: 'study socratic quiz evaluate learn',          section: 'Pages',     icon: <GraduationCap size={ICON_SIZE} /> },
  { id: 'patterns',        title: 'Agent Patterns',                 path: '/patterns',            keywords: 'pattern design architecture',                 section: 'Pages',     icon: <Brain size={ICON_SIZE} /> },
  { id: 'tree-view',       title: 'Learning Atlas (Tree View)',     path: '/tree-view',           keywords: 'tree atlas taxonomy visualization',           section: 'Pages',     icon: <Tree size={ICON_SIZE} /> },
  { id: 'value-map',       title: 'Value Map',                      path: '/value-map',           keywords: 'value map business',                          section: 'Pages',     icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'azure-services',  title: 'Azure Services',                 path: '/azure-services',      keywords: 'azure cloud services',                        section: 'Pages',     icon: <Globe size={ICON_SIZE} /> },
  { id: 'quiz',            title: 'Quiz',                           path: '/quiz',                keywords: 'quiz test assessment',                        section: 'Pages',     icon: <Notebook size={ICON_SIZE} /> },
  { id: 'references',      title: 'References',                     path: '/references',          keywords: 'references resources links',                  section: 'Pages',     icon: <BookOpen size={ICON_SIZE} /> },
  { id: 'community',       title: 'Community',                      path: '/community',           keywords: 'community share forum',                       section: 'Pages',     icon: <Users size={ICON_SIZE} /> },
  { id: 'deep-dive',       title: 'Deep Dive Taxonomy',             path: '/deep-dive-taxonomy',  keywords: 'deep dive taxonomy advanced',                 section: 'Pages',     icon: <Brain size={ICON_SIZE} /> },
  { id: 'bookmarks',       title: 'Bookmarks',                      path: '/bookmarks',           keywords: 'saved bookmarks favorites',                   section: 'Pages',     icon: <Star size={ICON_SIZE} /> },
  { id: 'achievements',    title: 'Achievements',                   path: '/achievements',        keywords: 'achievements badges progress',                section: 'Pages',     icon: <Star size={ICON_SIZE} /> },
  { id: 'settings',        title: 'Settings',                       path: '/settings',            keywords: 'settings preferences config',                 section: 'Pages',     icon: <Gear size={ICON_SIZE} /> },
  { id: 'about',           title: 'About',                          path: '/about',               keywords: 'about info',                                  section: 'Pages',     icon: <House size={ICON_SIZE} /> },

  // ── Velocity ──
  { id: 'vel-dashboard',   title: 'Velocity Dashboard',             path: '/velocity/dashboard',  keywords: 'velocity score dashboard',                    section: 'Velocity',  icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'vel-tracker',     title: 'Pattern Mastery Tracker',        path: '/velocity/tracker',    keywords: 'mastery tracker patterns progress',           section: 'Velocity',  icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'vel-cases',       title: 'Case Studies',                   path: '/velocity/case-studies',keywords: 'case studies velocity examples',              section: 'Velocity',  icon: <BookOpen size={ICON_SIZE} /> },
  { id: 'vel-workshop',    title: 'Velocity Workshop',              path: '/velocity/workshop',   keywords: 'workshop curriculum AVE',                     section: 'Velocity',  icon: <GraduationCap size={ICON_SIZE} /> },

  // ── Adoption ──
  { id: 'adopt-playbook',  title: 'Adoption Playbook',              path: '/adoption-playbook',   keywords: 'adoption playbook enterprise strategy',       section: 'Adoption',  icon: <Lightning size={ICON_SIZE} /> },
  { id: 'adopt-charter',   title: 'Executive Alignment Charter',    path: '/adoption/charter',    keywords: 'charter executive alignment form',            section: 'Adoption',  icon: <Notebook size={ICON_SIZE} /> },
  { id: 'adopt-canvas',    title: 'Portfolio Heatmap Canvas',       path: '/adoption/canvas',     keywords: 'canvas portfolio heatmap',                    section: 'Adoption',  icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'adopt-briefing',  title: 'Board Ready Briefing',           path: '/adoption/briefing',   keywords: 'briefing board ready pack',                   section: 'Adoption',  icon: <Notebook size={ICON_SIZE} /> },

  // ── Science ──
  { id: 'agents-science',  title: 'Agents for Science',             path: '/agents-for-science',  keywords: 'science research domain agents',              section: 'Pages',     icon: <Robot size={ICON_SIZE} /> },

  // ── Concepts (auto-navigate to /concepts/{id}) ──
  { id: 'c-learning-how-to-learn',            title: 'Learning How to Learn',            path: '/concepts/learning-how-to-learn',            keywords: 'meta-learning brain fundamentals',               section: 'Concepts', icon: <Lightbulb size={ICON_SIZE} /> },
  { id: 'c-agentic-ai-design-taxonomy',       title: 'Agentic AI Design Taxonomy',       path: '/concepts/agentic-ai-design-taxonomy',       keywords: 'taxonomy design patterns map',                   section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agentic-prompting-fundamentals',   title: 'Agentic Prompting Fundamentals',   path: '/concepts/agentic-prompting-fundamentals',   keywords: 'prompting prompt fundamentals',                  section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-prompt-optimization-patterns',     title: 'Prompt Optimization Patterns',     path: '/concepts/prompt-optimization-patterns',     keywords: 'optimization prompt chain of thought',           section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-instruction-design',         title: 'Agent Instruction Design',         path: '/concepts/agent-instruction-design',         keywords: 'instruction system prompt design',               section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agentic-workflow-control',         title: 'Agentic Workflow Control',         path: '/concepts/agentic-workflow-control',         keywords: 'workflow orchestration control flow',            section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-evaluation-methodologies',   title: 'Agent Evaluation Methodologies',   path: '/concepts/agent-evaluation-methodologies',   keywords: 'evaluation testing methodology benchmark',       section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-architecture',              title: 'Agent Architecture',               path: '/concepts/agent-architecture',               keywords: 'architecture ReAct tool loop',                   section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-agent-security',                  title: 'Agent Security',                   path: '/concepts/agent-security',                   keywords: 'security guardrails injection defense',          section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-multi-agent-systems',             title: 'Multi-Agent Systems',              path: '/concepts/multi-agent-systems',              keywords: 'multi agent collaboration swarm',                section: 'Concepts', icon: <Users size={ICON_SIZE} /> },
  { id: 'c-xyz-claw',                        title: 'XYZ Claw Framework',               path: '/concepts/xyz-claw',                        keywords: 'xyz claw framework',                             section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-ethics',                    title: 'Agent Ethics',                     path: '/concepts/agent-ethics',                    keywords: 'ethics responsible bias fairness',                section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-ai-agents',                       title: 'AI Agents Overview',               path: '/concepts/ai-agents',                       keywords: 'agents overview introduction what is',            section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-ai-safety-governance',            title: 'AI Safety & Governance',           path: '/concepts/ai-safety-governance',            keywords: 'safety governance regulation compliance',         section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-atomic-llm-training',             title: 'Atomic LLM Training',              path: '/concepts/atomic-llm-training',             keywords: 'training llm fine-tune atomic',                   section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-program-setup-north-star',        title: 'Program Setup & North Star',       path: '/concepts/program-setup-north-star',        keywords: 'program setup north star goal strategy',          section: 'Concepts', icon: <Lightbulb size={ICON_SIZE} /> },
  { id: 'c-responsible-ai-governance',       title: 'Responsible AI Governance',         path: '/concepts/responsible-ai-governance',       keywords: 'responsible AI governance policy',                section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-ai-product-framework',            title: 'AI Product Framework (Concept)',    path: '/concepts/ai-product-framework',            keywords: 'product framework concept',                       section: 'Concepts', icon: <Lightbulb size={ICON_SIZE} /> },
  { id: 'c-a2a-communication',               title: 'A2A Communication',                path: '/concepts/a2a-communication',               keywords: 'a2a agent-to-agent communication protocol',       section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-mcp',                             title: 'Model Context Protocol (MCP)',      path: '/concepts/mcp',                             keywords: 'mcp model context protocol tools',                section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-client-coding-agents',            title: 'Client Coding Agents',             path: '/concepts/client-coding-agents',            keywords: 'coding agent copilot cursor IDE',                 section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-agent-skills',                    title: 'Agent Skills',                     path: '/concepts/agent-skills',                    keywords: 'skills capabilities actions',                     section: 'Concepts', icon: <Lightning size={ICON_SIZE} /> },
  { id: 'c-flow-visualization',              title: 'Flow Visualization',               path: '/concepts/flow-visualization',              keywords: 'flow visualization diagram',                      section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-agent-evaluation',                title: 'Agent Evaluation',                 path: '/concepts/agent-evaluation',                keywords: 'evaluation metrics scoring',                      section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-strategy-portfolio-management',   title: 'Strategy & Portfolio Management',  path: '/concepts/strategy-portfolio-management',   keywords: 'strategy portfolio management enterprise',        section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-ai-ready-data',                   title: 'AI-Ready Data',                    path: '/concepts/ai-ready-data',                   keywords: 'data readiness quality preparation',              section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-context-engineering',             title: 'Context Engineering',              path: '/concepts/context-engineering',             keywords: 'context window engineering RAG',                  section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-acp',                             title: 'Agent Communication Protocol',     path: '/concepts/acp',                             keywords: 'acp agent communication protocol',                section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-mcp-a2a-integration',             title: 'MCP + A2A Integration',            path: '/concepts/mcp-a2a-integration',             keywords: 'mcp a2a integration interop',                     section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-data-visualization',              title: 'Data Visualization',               path: '/concepts/data-visualization',              keywords: 'data visualization charts d3',                    section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-data-knowledge-operations',       title: 'Data & Knowledge Operations',      path: '/concepts/data-knowledge-operations',       keywords: 'dataops knowledge ops pipeline',                  section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-tri-system-paradigm',             title: 'Tri-System Paradigm',              path: '/concepts/tri-system-paradigm',             keywords: 'tri system paradigm architecture',                section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-deployment',                title: 'Agent Deployment',                 path: '/concepts/agent-deployment',                keywords: 'deployment production ci cd devops',              section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-agent-learning',                  title: 'Agent Learning',                   path: '/concepts/agent-learning',                  keywords: 'learning reinforcement RLHF adaptation',         section: 'Concepts', icon: <GraduationCap size={ICON_SIZE} /> },
  { id: 'c-agent-integration',               title: 'Agent Integration',                path: '/concepts/agent-integration',               keywords: 'integration API connect enterprise',              section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-fine-tuning',                     title: 'Fine-Tuning',                      path: '/concepts/fine-tuning',                     keywords: 'fine tuning SFT DPO RFT lora',                   section: 'Concepts', icon: <Gear size={ICON_SIZE} /> },
  { id: 'c-agentic-commerce-ap2',            title: 'Agentic Commerce (AP²)',           path: '/concepts/agentic-commerce-ap2',            keywords: 'commerce agentic purchasing ap2',                 section: 'Concepts', icon: <Lightning size={ICON_SIZE} /> },
  { id: 'c-product-management',              title: 'Product Management',               path: '/concepts/product-management',              keywords: 'product management pm roadmap',                   section: 'Concepts', icon: <Lightbulb size={ICON_SIZE} /> },
  { id: 'c-agent-red-teaming',               title: 'Agent Red Teaming',                path: '/concepts/agent-red-teaming',               keywords: 'red teaming adversarial testing',                 section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-agent-ops',                       title: 'Agent Ops',                        path: '/concepts/agent-ops',                       keywords: 'agentops operations monitoring observability',    section: 'Concepts', icon: <Gear size={ICON_SIZE} /> },
  { id: 'c-agentic-robotics-integration',    title: 'Agentic Robotics Integration',     path: '/concepts/agentic-robotics-integration',    keywords: 'robotics integration physical agents',            section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-quantum-ai-robotics',             title: 'Quantum AI & Robotics',            path: '/concepts/quantum-ai-robotics',             keywords: 'quantum computing AI robotics',                   section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-edge-agent',                      title: 'Edge Agents',                      path: '/concepts/edge-agent',                      keywords: 'edge agent local on-device',                      section: 'Concepts', icon: <Robot size={ICON_SIZE} /> },
  { id: 'c-architecture-platform-operations',title: 'Architecture & Platform Ops',      path: '/concepts/architecture-platform-operations',keywords: 'architecture platform operations infrastructure', section: 'Concepts', icon: <Gear size={ICON_SIZE} /> },
  { id: 'c-experimentation-continuous',      title: 'Experimentation & Continuous Improvement', path: '/concepts/experimentation-continuous-improvement', keywords: 'experimentation AB testing iteration', section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-ecosystem-partnerships',          title: 'Ecosystem & Partnerships',         path: '/concepts/ecosystem-partnerships',          keywords: 'ecosystem partnerships vendors',                  section: 'Concepts', icon: <Users size={ICON_SIZE} /> },
  { id: 'c-organizational-enablement',       title: 'Organizational Enablement',        path: '/concepts/organizational-enablement',       keywords: 'organizational enablement change culture',        section: 'Concepts', icon: <Users size={ICON_SIZE} /> },
  { id: 'c-agent-reasoning-patterns',        title: 'Agent Reasoning Patterns',         path: '/concepts/agent-reasoning-patterns',        keywords: 'reasoning chain thought ReAct CoT',               section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-memory-systems',            title: 'Agent Memory Systems',             path: '/concepts/agent-memory-systems',            keywords: 'memory short long term vector store',             section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-agent-observability',             title: 'Agent Observability',              path: '/concepts/agent-observability',             keywords: 'observability tracing logging monitoring',        section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-agent-testing-benchmarks',        title: 'Agent Testing & Benchmarks',       path: '/concepts/agent-testing-benchmarks',        keywords: 'testing benchmark suite eval',                    section: 'Concepts', icon: <Brain size={ICON_SIZE} /> },
  { id: 'c-prompt-injection-defense',        title: 'Prompt Injection Defense',         path: '/concepts/prompt-injection-defense',        keywords: 'prompt injection jailbreak defense',              section: 'Concepts', icon: <ShieldCheck size={ICON_SIZE} /> },
  { id: 'c-human-in-the-loop-patterns',      title: 'Human-in-the-Loop Patterns',      path: '/concepts/human-in-the-loop-patterns',      keywords: 'human loop approval review oversight',            section: 'Concepts', icon: <Users size={ICON_SIZE} /> },
  { id: 'c-agent-cost-optimization',         title: 'Agent Cost Optimization',          path: '/concepts/agent-cost-optimization',         keywords: 'cost optimization budget tokens',                 section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-agent-troubleshooting',           title: 'Agent Troubleshooting',            path: '/concepts/agent-troubleshooting',           keywords: 'troubleshooting debugging errors fix',            section: 'Concepts', icon: <Gear size={ICON_SIZE} /> },
  { id: 'c-agent-economics',                 title: 'Agent Economics',                  path: '/concepts/agent-economics',                 keywords: 'economics ROI business value cost',               section: 'Concepts', icon: <ChartBar size={ICON_SIZE} /> },
  { id: 'c-agent-career-paths',              title: 'Agent Career Paths',               path: '/concepts/agent-career-paths',              keywords: 'career path job role hiring',                     section: 'Concepts', icon: <GraduationCap size={ICON_SIZE} /> },
  { id: 'c-industry-agents',                 title: 'Industry Agents',                  path: '/concepts/industry-agents',                 keywords: 'industry vertical healthcare finance',            section: 'Concepts', icon: <Globe size={ICON_SIZE} /> },
  { id: 'c-agent-templates-hub',             title: 'Agent Templates Hub',              path: '/concepts/agent-templates-hub',             keywords: 'templates hub starter boilerplate',               section: 'Concepts', icon: <Notebook size={ICON_SIZE} /> },
];

/* ────────────────────────────────────────────────────────
 * Fuzzy match helper
 * ──────────────────────────────────────────────────────── */

function matchItem(item: NavItem, terms: string[]): boolean {
  const hay = `${item.title} ${item.keywords} ${item.section}`.toLowerCase();
  return terms.every((t) => hay.includes(t));
}

/* ────────────────────────────────────────────────────────
 * QuickNav Component
 * ──────────────────────────────────────────────────────── */

interface QuickNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEARCH_SITE = 'openagentschool.org';

export const QuickNav: React.FC<QuickNavProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filtered results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ITEMS;
    const terms = q.split(/\s+/);
    return NAV_ITEMS.filter((item) => matchItem(item, terms));
  }, [query]);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keep selection in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Scroll selected item into view
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const el = container.querySelector('[data-selected="true"]') as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const goTo = useCallback(
    (path: string) => {
      trackEvent({ action: 'search', category: 'search', label: path, search_term: path });
      onOpenChange(false);
      navigate(path);
    },
    [navigate, onOpenChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            goTo(results[selectedIndex].path);
          }
          break;
        case 'Escape':
          onOpenChange(false);
          break;
      }
    },
    [results, selectedIndex, goTo, onOpenChange],
  );

  // Group results by section for better readability
  const grouped = useMemo(() => {
    const map = new Map<string, NavItem[]>();
    for (const item of results) {
      const arr = map.get(item.section) ?? [];
      arr.push(item);
      map.set(item.section, arr);
    }
    return map;
  }, [results]);

  // Flat index for keyboard navigation across groups
  let flatIdx = -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 dark:bg-black/60" />
        <DialogContent
          className={cn(
            'sm:max-w-[560px] p-0 gap-0 overflow-hidden rounded-2xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          {/* ── Search input ── */}
          <div className="flex items-center border-b px-3">
            <MagnifyingGlass size={18} className="shrink-0 text-muted-foreground" aria-hidden />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Go to page…"
              className="h-11 border-0 shadow-none focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
              aria-label="Quick navigation"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Clear"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* ── Results list ── */}
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-1" role="listbox">
            {results.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No matching pages. Try different keywords.
              </div>
            ) : (
              Array.from(grouped.entries()).map(([section, items]) => (
                <div key={section}>
                  <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                    {section}
                  </div>
                  {items.map((item) => {
                    flatIdx++;
                    const idx = flatIdx;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        data-selected={isSelected}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => goTo(item.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'flex w-full items-center gap-3 px-3 py-2 text-sm text-left transition-colors cursor-pointer',
                          isSelected
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/50',
                        )}
                      >
                        <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                        <span className="truncate font-medium">{item.title}</span>
                        {isSelected && (
                          <ArrowElbowDownLeft size={14} className="ml-auto shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* ── Footer ── */}
          <div className="border-t px-3 py-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2">
              <kbd className="px-1 py-0.5 rounded border bg-muted font-mono text-[10px]">↑↓</kbd>
              navigate
              <kbd className="px-1 py-0.5 rounded border bg-muted font-mono text-[10px]">⏎</kbd>
              open
              <kbd className="px-1 py-0.5 rounded border bg-muted font-mono text-[10px]">esc</kbd>
              close
            </span>
            {query.trim() && (
              <a
                href={`https://www.google.com/search?q=site%3A${SEARCH_SITE}+${encodeURIComponent(query.trim())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Google <ArrowSquareOut size={12} />
              </a>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

/**
 * Hook to manage QuickNav open state with Ctrl+K keyboard shortcut
 */
export function useQuickNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { open, setOpen };
}

export default QuickNav;
