/**
 * voiceNavigation.ts – Fuzzy-match spoken transcripts to concepts, patterns,
 * or AI skills and return the best navigation target.
 *
 * Strategy:
 *   1. Strip common voice filler phrases ("tell me about", "what is", etc.)
 *   2. Normalise to lowercase
 *   3. Try exact id match
 *   4. Try title substring match
 *   5. Score keyword overlap against title + description
 *   6. If confidence < threshold → return null (caller falls back to search)
 *
 * For non-English input, callers should translate to English via the existing
 * LLM pipeline before calling `matchVoiceQuery()`.
 */

import { agentPatterns } from '@/lib/data/patterns/index';

// ── Lightweight catalog item ─────────────────────────────────────────────

export interface CatalogItem {
  type: 'concept' | 'pattern' | 'skill';
  id: string;
  title: string;
  description: string;
  path: string;
}

// ── Build the searchable catalog lazily ──────────────────────────────────

let _catalog: CatalogItem[] | null = null;

/**
 * Allow ConceptsHub (or any component that owns the concept array) to
 * register concept items for voice matching.  This avoids circular imports
 * since ConceptsHub owns the concept data with lazy component refs.
 */
const _conceptItems: CatalogItem[] = [];
let _conceptsRegistered = false;

export function registerConceptsForVoice(
  concepts: Array<{ id: string; title: string; description: string }>,
) {
  if (_conceptsRegistered) return; // idempotent
  _conceptsRegistered = true;
  _catalog = null; // invalidate cache
  _conceptItems.length = 0;
  for (const c of concepts) {
    _conceptItems.push({
      type: 'concept',
      id: c.id,
      title: c.title,
      description: c.description,
      path: `/concepts/${c.id}`,
    });
  }
}

function getCatalog(): CatalogItem[] {
  if (_catalog) return _catalog;

  const items: CatalogItem[] = [..._conceptItems];

  // ── Top-level pages (high-priority navigation targets) ────────────────
  const pages: CatalogItem[] = [
    { type: 'skill', id: 'study-mode',        title: 'Study Mode',            description: 'interactive learning exercises socratic guided questioning', path: '/study-mode' },
    { type: 'skill', id: 'agent-patterns',     title: 'Agent Patterns',        description: 'reusable design patterns for AI agents',                    path: '/patterns' },
    { type: 'skill', id: 'core-concepts',      title: 'Core Concepts',         description: 'foundational AI agent concepts explorer',                   path: '/concepts' },
    { type: 'skill', id: 'quiz',               title: 'Knowledge Quiz',        description: 'test your understanding knowledge quiz',                    path: '/quiz' },
    { type: 'skill', id: 'ai-skills',          title: 'Applied AI Skills',     description: 'practical AI implementation skills explorer',               path: '/ai-skills' },
    { type: 'skill', id: 'knowledge-search',   title: 'Knowledge Search',      description: 'search documentation knowledge base',                      path: '/knowledge-search' },
    { type: 'skill', id: 'learning-atlas',     title: 'Learning Atlas',        description: 'visual concept taxonomy tree view',                        path: '/tree-view' },
    { type: 'skill', id: 'references',         title: 'References',            description: 'papers videos and learning resources',                     path: '/references' },
    { type: 'skill', id: 'community',          title: 'Community',             description: 'share and collaborate community sharing',                  path: '/community' },
    { type: 'skill', id: 'azure-services',     title: 'Azure Services',        description: 'cloud platform services azure overview',                   path: '/azure-services' },
    { type: 'skill', id: 'scl-demo',           title: 'SCL Demo',              description: 'super critical learning demonstration',                    path: '/scl-demo' },
    { type: 'skill', id: 'agents-console',     title: 'Agents Console',        description: 'multi-agent orchestration console',                        path: '/agents' },
    { type: 'skill', id: 'bookmarks',          title: 'Bookmarks',             description: 'saved bookmarks and favorites',                            path: '/bookmarks' },
    { type: 'skill', id: 'achievements',       title: 'Achievements',          description: 'user achievements and badges',                             path: '/achievements' },
    { type: 'skill', id: 'adoption-playbook',  title: 'Adoption Playbook',     description: 'enterprise agentic adoption strategies',                   path: '/adoption-playbook' },
    { type: 'skill', id: 'agents-for-science', title: 'Agents for Science',    description: 'AI accelerated scientific discovery',                      path: '/agents-for-science' },
    { type: 'skill', id: 'velocity-dashboard', title: 'Velocity Dashboard',    description: 'agent velocity score dashboard engineering',               path: '/velocity/dashboard' },
    { type: 'skill', id: 'value-map',          title: 'Skills Universe',       description: 'discover value map skills universe',                       path: '/value-map' },
    { type: 'skill', id: 'api-docs',           title: 'API Docs',              description: 'technical API documentation',                              path: '/api-docs' },
    { type: 'skill', id: 'settings',           title: 'Settings',              description: 'API settings configuration BYOK keys providers',           path: '/settings' },
    { type: 'skill', id: 'deep-dive-taxonomy', title: 'Deep Dive Taxonomy',    description: 'deep dive taxonomy page',                                  path: '/deep-dive-taxonomy' },
  ];
  items.push(...pages);

  // Patterns
  for (const p of agentPatterns) {
    items.push({
      type: 'pattern',
      id: p.id,
      title: p.name,
      description: p.description,
      path: `/patterns/${p.id}`,
    });
  }

  _catalog = items;
  return _catalog;
}

// ── Filler phrase stripping ──────────────────────────────────────────────

const FILLER_PATTERNS = [
  /^(?:hey |ok |okay )*/i,
  /^(?:please |can you |could you |i want to |i'd like to )/i,
  /^(?:tell me about |what is |what are |show me |explain |go to |open |navigate to |take me to |search for |find |look up |talk about )/i,
  /^(?:the |a |an )/i,
  /[?.!,]$/,
];

function stripFillers(text: string): string {
  let s = text.trim().toLowerCase();
  for (const p of FILLER_PATTERNS) {
    s = s.replace(p, '').trim();
  }
  return s;
}

// ── Scoring helpers ──────────────────────────────────────────────────────

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function tokenize(s: string): string[] {
  return normalise(s).split(/\s+/).filter(Boolean);
}

/** Jaccard-like overlap ∈ [0, 1] between query tokens and item tokens */
function tokenOverlap(queryTokens: string[], itemTokens: string[]): number {
  if (queryTokens.length === 0 || itemTokens.length === 0) return 0;
  const itemSet = new Set(itemTokens);
  let hits = 0;
  for (const qt of queryTokens) {
    for (const it of itemSet) {
      if (it.includes(qt) || qt.includes(it)) {
        hits++;
        break;
      }
    }
  }
  return hits / Math.max(queryTokens.length, 1);
}

// ── Public API ───────────────────────────────────────────────────────────

export interface VoiceMatchResult {
  type: 'concept' | 'pattern' | 'skill';
  id: string;
  title: string;
  confidence: number; // 0–1
  path: string;
}

/**
 * Match a spoken transcript (in English) to the best concept, pattern, or skill.
 *
 * Returns `null` when no match exceeds the confidence threshold (0.3).
 */
export function matchVoiceQuery(rawTranscript: string): VoiceMatchResult | null {
  const stripped = stripFillers(rawTranscript);
  if (!stripped) return null;

  const catalog = getCatalog();
  const queryNorm = normalise(stripped);
  const queryTokens = tokenize(stripped);

  let bestMatch: VoiceMatchResult | null = null;
  let bestScore = 0;

  for (const item of catalog) {
    const idNorm = normalise(item.id.replace(/-/g, ' '));
    const titleNorm = normalise(item.title);
    const descNorm = normalise(item.description);

    let score = 0;

    // Exact id match (spelled out — "prompt chaining" → "prompt-chaining")
    if (queryNorm === idNorm) {
      score = 1.0;
    }
    // Title exact match
    else if (queryNorm === titleNorm) {
      score = 0.95;
    }
    // Query is a substring of title
    else if (titleNorm.includes(queryNorm)) {
      score = 0.85;
    }
    // Title is a substring of query
    else if (queryNorm.includes(titleNorm)) {
      score = 0.8;
    }
    // Token overlap scoring
    else {
      const titleTokens = tokenize(item.title);
      const descTokens = tokenize(item.description);
      const titleScore = tokenOverlap(queryTokens, titleTokens);
      const descScore = tokenOverlap(queryTokens, descTokens);
      score = titleScore * 0.7 + descScore * 0.3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = {
        type: item.type,
        id: item.id,
        title: item.title,
        confidence: score,
        path: item.path,
      };
    }
  }

  return bestMatch && bestMatch.confidence >= 0.3 ? bestMatch : null;
}
