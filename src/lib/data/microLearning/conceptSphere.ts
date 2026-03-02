// ─── Concept Sphere — Just-in-Time LLM Learning ─────────────────────────────
// Lets learners "hone in" on any concept mid-capsule, using their configured
// LLM provider to quickly:
//   • Explain the concept in simple terms
//   • Expand on uncovered areas
//   • Get the latest on fast-evolving AI agent topics (with live web search!)
//   • Generate quick examples
//
// The LLM is called client-side using the learner's own API key (BYOK).
// When a web search provider is configured, "latest" mode performs a live web
// search first and feeds the results as grounding context to the LLM — this is
// Search-Augmented Generation (SAG).
//
// Results are cached in localStorage so repeated queries are instant.

import { callLlmWithMessages, type LlmProvider, type LlmMessage } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { loadSettings } from '@/lib/userSettings';
import {
  webSearch,
  isSearchConfigured,
  formatSearchResultsForLLM,
  getFirstAvailableSearchProvider,
  type SearchResult,
} from '@/lib/search/searchProviders';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SphereMode =
  | 'explain'         // Explain this concept to me simply
  | 'expand'          // Go deeper on an aspect I haven't covered
  | 'latest'          // What's new / latest developments
  | 'example'         // Give me a concrete example
  | 'compare'         // Compare with another concept
  | 'custom';         // Custom free-text question

export interface SphereQuery {
  conceptId: string;
  conceptTitle: string;
  mode: SphereMode;
  /** Optional custom question text (for 'custom' mode or refinement) */
  customPrompt?: string;
  /** Optional concept to compare against (for 'compare' mode) */
  compareWith?: string;
}

export interface SphereResult {
  query: SphereQuery;
  content: string;
  provider: string;
  timestamp: string;
  cached: boolean;
  /** True when live web search results were used as grounding context */
  searchAugmented: boolean;
  /** The search provider used (if any) */
  searchProvider?: string;
  /** Number of web results injected into context */
  searchResultCount?: number;
}

// ─── System Prompts ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a world-class AI educator embedded inside Open Agent School, a micro-learning platform for AI agent development. Your tone is clear, engaging, and concise. Always use practical examples when possible. Format answers in markdown. Keep responses under 500 words unless the learner asks for more depth. The current date is ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.`;

const SYSTEM_PROMPT_WITH_SEARCH = `You are a world-class AI educator embedded inside Open Agent School, a micro-learning platform for AI agent development. Your tone is clear, engaging, and concise. Always use practical examples when possible. Format answers in markdown. Keep responses under 500 words unless the learner asks for more depth. The current date is ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.

IMPORTANT: You have been provided with live web search results below the learner's question. Use these results as grounding context to provide up-to-date, factual information. Cite sources by referencing the numbered results (e.g. [1], [2]) when presenting specific facts or claims. If the search results are insufficient, supplement with your training knowledge but clearly indicate which information comes from search vs your knowledge.`;

/** Modes that benefit from live web search context */
const SEARCH_AUGMENTED_MODES: SphereMode[] = ['latest', 'expand', 'custom'];

function buildSearchQuery(query: SphereQuery): string {
  const concept = query.conceptTitle.replace(/-/g, ' ');
  switch (query.mode) {
    case 'latest':
      return `${concept} AI agents latest developments 2024 2025`;
    case 'expand':
      return `${concept} AI agents advanced techniques best practices`;
    case 'custom':
      return `${concept} AI agents ${query.customPrompt ?? ''}`;
    default:
      return `${concept} AI agents`;
  }
}

function buildUserPrompt(query: SphereQuery): string {
  const concept = query.conceptTitle.replace(/-/g, ' ');
  
  switch (query.mode) {
    case 'explain':
      return `Explain the concept "${concept}" in simple, learner-friendly terms. What is it, why does it matter for AI agents, and what's the key mental model to remember? Use a brief analogy if helpful.`;
    
    case 'expand':
      return `The learner is studying "${concept}" in the context of AI agents. Go deeper on aspects that a micro-learning capsule might not cover — advanced nuances, edge cases, or architectural implications. What should an intermediate-to-advanced practitioner know?`;
    
    case 'latest':
      return `What are the latest developments, trends, and emerging best practices around "${concept}" in the AI agents ecosystem? Focus on what has changed or is evolving rapidly. Include any notable framework updates, research papers, or industry shifts if relevant.`;
    
    case 'example':
      return `Give me a concrete, practical example of "${concept}" applied to building AI agents. Include a brief code snippet or architecture diagram description if appropriate. Make it realistic and production-relevant.`;
    
    case 'compare':
      return `Compare and contrast "${concept}" with "${query.compareWith?.replace(/-/g, ' ') ?? 'a related approach'}". When would you choose one over the other? What are the trade-offs in the context of AI agent development?`;
    
    case 'custom':
      return query.customPrompt ?? `Tell me more about "${concept}" in the context of AI agents.`;
    
    default:
      return `Tell me about "${concept}" in the context of AI agent development.`;
  }
}

// ─── LLM Cache ───────────────────────────────────────────────────────────────

const CACHE_KEY = 'concept-sphere-cache';
const MAX_CACHE_ENTRIES = 100;

interface CacheEntry {
  key: string;
  content: string;
  provider: string;
  timestamp: string;
  /** Whether this entry was augmented with web search results */
  searchAugmented?: boolean;
  searchProvider?: string;
  searchResultCount?: number;
}

function cacheKey(query: SphereQuery): string {
  return `${query.conceptId}::${query.mode}::${query.customPrompt ?? ''}::${query.compareWith ?? ''}`;
}

function loadCache(): CacheEntry[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCache(entries: CacheEntry[]): void {
  try {
    // Keep only the most recent entries
    const trimmed = entries.slice(-MAX_CACHE_ENTRIES);
    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
  } catch {}
}

function getCachedResult(query: SphereQuery): CacheEntry | undefined {
  const key = cacheKey(query);
  const entries = loadCache();
  const entry = entries.find((e) => e.key === key);
  if (!entry) return undefined;
  const age = Date.now() - new Date(entry.timestamp).getTime();
  // Search-augmented "latest" results: 1h TTL (web content changes fast)
  if (query.mode === 'latest' && entry.searchAugmented && age > 1 * 60 * 60 * 1000) return undefined;
  // Non-search "latest": 4h TTL
  if (query.mode === 'latest' && age > 4 * 60 * 60 * 1000) return undefined;
  // Everything else: 24h
  if (age > 24 * 60 * 60 * 1000) return undefined;
  return entry;
}

function addToCache(
  query: SphereQuery,
  content: string,
  provider: string,
  searchAugmented = false,
  searchProvider?: string,
  searchResultCount?: number,
): void {
  const entries = loadCache();
  const key = cacheKey(query);
  // Remove existing entry for this key
  const filtered = entries.filter((e) => e.key !== key);
  filtered.push({
    key,
    content,
    provider,
    timestamp: new Date().toISOString(),
    searchAugmented,
    searchProvider,
    searchResultCount,
  });
  saveCache(filtered);
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Check if the learner has an LLM provider configured (needed for ConceptSphere).
 */
export function isLLMConfigured(): boolean {
  try {
    const settings = loadSettings();
    // Check if any provider has an API key
    const providers = settings.providers;
    for (const [_key, config] of Object.entries(providers)) {
      if (config?.apiKey && config.apiKey.trim() !== '') return true;
      // Custom providers might not need a key (local runners)
      if (_key === 'custom' && config?.apiUrl && config?.model) return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Query the Concept Sphere — LLM-powered just-in-time learning.
 * Uses the learner's configured provider. Results are cached.
 *
 * When a web search provider is configured, modes in SEARCH_AUGMENTED_MODES
 * perform a live search first and inject results as grounding context (SAG).
 */
export async function querySphere(query: SphereQuery): Promise<SphereResult> {
  // 1. Check cache first
  const cached = getCachedResult(query);
  if (cached) {
    return {
      query,
      content: cached.content,
      provider: cached.provider,
      timestamp: cached.timestamp,
      cached: true,
      searchAugmented: cached.searchAugmented ?? false,
      searchProvider: cached.searchProvider,
      searchResultCount: cached.searchResultCount,
    };
  }

  // 2. Resolve LLM provider
  const providerName = getFirstAvailableProvider();
  const provider = providerName as LlmProvider;

  // 3. Web search (if configured + mode benefits from it)
  let searchResults: SearchResult[] = [];
  let searchProvider: string | undefined;

  const shouldSearch = SEARCH_AUGMENTED_MODES.includes(query.mode) && isSearchConfigured();
  if (shouldSearch) {
    try {
      const searchQuery = buildSearchQuery(query);
      searchResults = await webSearch(searchQuery, {
        maxResults: 5,
        freshness: query.mode === 'latest',
      });
      searchProvider = getFirstAvailableSearchProvider() ?? undefined;
    } catch (err) {
      console.warn('[ConceptSphere] Web search failed, proceeding with LLM only:', err);
    }
  }

  // 4. Build messages — inject search context if available
  const hasSearchContext = searchResults.length > 0;
  const systemPrompt = hasSearchContext ? SYSTEM_PROMPT_WITH_SEARCH : SYSTEM_PROMPT;
  const userPrompt = hasSearchContext
    ? `${buildUserPrompt(query)}\n\n${formatSearchResultsForLLM(searchResults)}`
    : buildUserPrompt(query);

  const messages: LlmMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  // 5. Call LLM
  const result = await callLlmWithMessages(messages, provider, {
    temperature: query.mode === 'latest' ? 0.8 : 0.6,
    maxTokens: hasSearchContext ? 1500 : 1200, // More tokens when synthesizing search results
  });

  // 6. Cache result
  addToCache(query, result.content, providerName, hasSearchContext, searchProvider, searchResults.length);

  return {
    query,
    content: result.content,
    provider: providerName,
    timestamp: new Date().toISOString(),
    cached: false,
    searchAugmented: hasSearchContext,
    searchProvider,
    searchResultCount: searchResults.length,
  };
}

/**
 * Quick-fire preset queries for the Concept Sphere UI.
 */
export const SPHERE_PRESETS: { mode: SphereMode; label: string; icon: string; description: string; searchEligible: boolean }[] = [
  { mode: 'explain', label: 'Explain Simply', icon: '💡', description: 'Break it down for me', searchEligible: false },
  { mode: 'latest', label: 'What\'s New?', icon: '📡', description: 'Latest developments & trends', searchEligible: true },
  { mode: 'expand', label: 'Go Deeper', icon: '🔬', description: 'Advanced nuances & implications', searchEligible: true },
  { mode: 'example', label: 'Show Example', icon: '💻', description: 'Concrete code or architecture', searchEligible: false },
  { mode: 'compare', label: 'Compare', icon: '⚖️', description: 'Compare with another concept', searchEligible: false },
];

/**
 * Clear ConceptSphere cache.
 */
export function clearSphereCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {}
}

/** Re-export search config check for UI convenience */
export { isSearchConfigured } from '@/lib/search/searchProviders';
