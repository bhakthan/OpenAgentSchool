// ─── Web Search Providers — BYOK Search-Augmented Generation ─────────────────
// Lets the ConceptSphere's "latest" (and optionally other) modes fetch real-time
// web results, then feed them as grounding context to the LLM.
//
// Same privacy model as LLM keys: stored in localStorage, never sent to OAS.
//
// Global coverage: US/EU + Russia + China + South Korea + UK + self-hosted.
// ─────────────────────────────────────────────────────────────────────────────

import { loadSettings, type UserSettings } from '@/lib/userSettings';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SearchProviderId =
  // Global / AI-native
  | 'tavily' | 'brave' | 'exa' | 'you'
  // Major search engines
  | 'google' | 'bing' | 'serpapi'
  // Premium / privacy
  | 'kagi' | 'mojeek'
  // Regional
  | 'yandex' | 'baidu' | 'naver'
  // Self-hosted
  | 'searxng';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  /** ISO date if available from the search API */
  publishedDate?: string;
}

export interface SearchOptions {
  /** Max results to return (default 5) */
  maxResults?: number;
  /** Prefer recent content (default true) */
  freshness?: boolean;
}

export interface SearchProviderMeta {
  id: SearchProviderId;
  label: string;
  hint: string;
  keyPlaceholder: string;
  signupUrl: string;
  freeTier: string;
  region: string;
  section: 'AI-Native' | 'Global' | 'Premium' | 'Regional' | 'Self-Hosted';
  /** Whether this provider requires an API key (SearXNG doesn't) */
  keyRequired?: boolean;
  /** Extra fields beyond apiKey (e.g. Google needs searchEngineId, SearXNG needs instanceUrl) */
  extraFields?: { id: string; label: string; placeholder: string }[];
}

// ─── Provider Metadata ───────────────────────────────────────────────────────

export const SEARCH_PROVIDERS: SearchProviderMeta[] = [
  // ── AI-Native (purpose-built for agent/RAG use) ──
  {
    id: 'tavily',
    label: 'Tavily',
    hint: 'Built for AI agents — returns clean, structured results optimized for LLM context. Recommended for best results.',
    keyPlaceholder: 'tvly-…',
    signupUrl: 'https://tavily.com',
    freeTier: '1,000 searches/month free',
    region: '🤖',
    section: 'AI-Native',
  },
  {
    id: 'exa',
    label: 'Exa',
    hint: 'Neural search engine built for AI. Finds semantically relevant content, not just keyword matches.',
    keyPlaceholder: 'Your Exa API key',
    signupUrl: 'https://exa.ai',
    freeTier: '1,000 searches/month free',
    region: '🤖',
    section: 'AI-Native',
  },
  {
    id: 'you',
    label: 'You.com',
    hint: 'AI-powered search with RAG-optimized API. Returns web snippets ideal for context injection.',
    keyPlaceholder: 'Your You.com API key',
    signupUrl: 'https://you.com/search-api',
    freeTier: 'Free tier available',
    region: '🤖',
    section: 'AI-Native',
  },
  // ── Global ──
  {
    id: 'brave',
    label: 'Brave Search',
    hint: 'Independent search index with strong privacy. Great for diverse results.',
    keyPlaceholder: 'BSA…',
    signupUrl: 'https://brave.com/search/api/',
    freeTier: '2,000 queries/month free',
    region: '🌐',
    section: 'Global',
  },
  {
    id: 'google',
    label: 'Google Custom Search',
    hint: 'Google-quality results via Programmable Search Engine. Requires both an API key and a Search Engine ID.',
    keyPlaceholder: 'AIza…',
    signupUrl: 'https://programmablesearchengine.google.com/',
    freeTier: '100 queries/day free',
    region: '🌐',
    section: 'Global',
    extraFields: [
      { id: 'searchEngineId', label: 'Search Engine ID (cx)', placeholder: 'Your Programmable Search Engine ID' },
    ],
  },
  {
    id: 'bing',
    label: 'Bing Web Search',
    hint: 'Microsoft Cognitive Services — enterprise-grade search with market and freshness filters.',
    keyPlaceholder: 'Your Bing Search key',
    signupUrl: 'https://www.microsoft.com/en-us/bing/apis/bing-web-search-api',
    freeTier: '1,000 transactions/month free',
    region: '🌐',
    section: 'Global',
  },
  {
    id: 'serpapi',
    label: 'SerpAPI',
    hint: 'Meta search across Google, Bing, DuckDuckGo, Yandex, Baidu, Naver, and more.',
    keyPlaceholder: 'Your SerpAPI key',
    signupUrl: 'https://serpapi.com/',
    freeTier: '100 searches/month free',
    region: '🌐',
    section: 'Global',
  },
  // ── Premium / Privacy ──
  {
    id: 'kagi',
    label: 'Kagi Search',
    hint: 'Premium ad-free search with high-quality, unbiased results. Paid plans only.',
    keyPlaceholder: 'Your Kagi API token',
    signupUrl: 'https://kagi.com',
    freeTier: 'Paid plans from $5/mo',
    region: '🔒',
    section: 'Premium',
  },
  {
    id: 'mojeek',
    label: 'Mojeek',
    hint: 'UK-based independent search engine with its own crawler. Strong privacy, no tracking.',
    keyPlaceholder: 'Your Mojeek API key',
    signupUrl: 'https://www.mojeek.com/services/api.html',
    freeTier: 'Free tier available',
    region: '🇬🇧',
    section: 'Premium',
  },
  // ── Regional ──
  {
    id: 'yandex',
    label: 'Yandex Search',
    hint: 'Russia\'s largest search engine. XML Search API with broad Cyrillic-language coverage.',
    keyPlaceholder: 'Your Yandex Search API key',
    signupUrl: 'https://yandex.com/dev/xml/',
    freeTier: '1,000 queries/day free',
    region: '🇷🇺',
    section: 'Regional',
    extraFields: [
      { id: 'searchEngineId', label: 'Yandex User (login)', placeholder: 'Your Yandex XML username' },
    ],
  },
  {
    id: 'baidu',
    label: 'Baidu Search',
    hint: 'China\'s dominant search engine. Best for Chinese-language content. Requires proxy for client-side use.',
    keyPlaceholder: 'Your Baidu API key',
    signupUrl: 'https://cloud.baidu.com/',
    freeTier: 'Free tier with Baidu Cloud account',
    region: '🇨🇳',
    section: 'Regional',
    extraFields: [
      { id: 'searchEngineId', label: 'Secret Key (SK)', placeholder: 'Your Baidu Secret Key' },
    ],
  },
  {
    id: 'naver',
    label: 'Naver Search',
    hint: 'South Korea\'s leading search platform. Best for Korean-language content.',
    keyPlaceholder: 'Your Naver Client ID',
    signupUrl: 'https://developers.naver.com/products/service-api/search/search.md',
    freeTier: '25,000 queries/day free',
    region: '🇰🇷',
    section: 'Regional',
    extraFields: [
      { id: 'searchEngineId', label: 'Client Secret', placeholder: 'Your Naver Client Secret' },
    ],
  },
  // ── Self-Hosted ──
  {
    id: 'searxng',
    label: 'SearXNG',
    hint: 'Open-source meta-search engine you host yourself. No API key needed — just your instance URL.',
    keyPlaceholder: '(optional auth token)',
    signupUrl: 'https://docs.searxng.org/',
    freeTier: 'Free & open source',
    region: '💻',
    section: 'Self-Hosted',
    keyRequired: false,
    extraFields: [
      { id: 'searchEngineId', label: 'Instance URL', placeholder: 'https://your-searxng-instance.example.com' },
    ],
  },
];

// ─── Provider Resolution ─────────────────────────────────────────────────────

/** Check whether any search provider is configured */
export function isSearchConfigured(): boolean {
  const settings = loadSettings();
  const svcs = settings.searchServices;
  if (!svcs) return false;
  for (const id of ALL_PROVIDER_IDS) {
    if (isProviderReady(svcs, id)) return true;
  }
  return false;
}

const ALL_PROVIDER_IDS: SearchProviderId[] = [
  'tavily', 'exa', 'you', 'brave', 'google', 'bing', 'serpapi',
  'kagi', 'mojeek', 'yandex', 'baidu', 'naver', 'searxng',
];

/** Get the first configured search provider (respects user's preference) */
export function getFirstAvailableSearchProvider(): SearchProviderId | null {
  const settings = loadSettings();
  const svcs = settings.searchServices;
  if (!svcs) return null;

  // Respect explicit preference
  const preferred = settings.preferredSearchProvider as SearchProviderId | undefined;
  if (preferred && isProviderReady(svcs, preferred)) return preferred;

  // Auto-detect priority: AI-native first, then global, then regional
  for (const id of ALL_PROVIDER_IDS) {
    if (isProviderReady(svcs, id)) return id;
  }
  return null;
}

function isProviderReady(svcs: NonNullable<UserSettings['searchServices']>, id: SearchProviderId): boolean {
  const cfg = svcs[id];
  if (!cfg) return false;
  switch (id) {
    // Providers that need apiKey + extra field
    case 'google':  return !!(cfg.apiKey && cfg.searchEngineId);
    case 'yandex':  return !!(cfg.apiKey && cfg.searchEngineId);
    case 'baidu':   return !!(cfg.apiKey && cfg.searchEngineId);
    case 'naver':   return !!(cfg.apiKey && cfg.searchEngineId);
    // SearXNG just needs an instance URL (key is optional)
    case 'searxng':  return !!cfg.searchEngineId;
    // Everything else just needs an API key
    default:        return !!cfg.apiKey;
  }
}

// ─── Unified Search ──────────────────────────────────────────────────────────

/**
 * Execute a web search using the first available provider.
 * Returns structured results ready to inject into an LLM prompt.
 */
export async function webSearch(
  query: string,
  options: SearchOptions = {},
): Promise<SearchResult[]> {
  const provider = getFirstAvailableSearchProvider();
  if (!provider) return [];

  const settings = loadSettings();
  const svcs = settings.searchServices!;
  const maxResults = options.maxResults ?? 5;
  const cfg = svcs[provider]!;

  try {
    switch (provider) {
      case 'tavily':   return await searchTavily(cfg.apiKey!, query, maxResults);
      case 'exa':      return await searchExa(cfg.apiKey!, query, maxResults);
      case 'you':      return await searchYou(cfg.apiKey!, query, maxResults);
      case 'brave':    return await searchBrave(cfg.apiKey!, query, maxResults, options.freshness);
      case 'google':   return await searchGoogle(cfg.apiKey!, cfg.searchEngineId!, query, maxResults);
      case 'bing':     return await searchBing(cfg.apiKey!, query, maxResults, options.freshness);
      case 'serpapi':  return await searchSerpApi(cfg.apiKey!, query, maxResults);
      case 'kagi':     return await searchKagi(cfg.apiKey!, query, maxResults);
      case 'mojeek':   return await searchMojeek(cfg.apiKey!, query, maxResults);
      case 'yandex':   return await searchYandex(cfg.apiKey!, cfg.searchEngineId!, query, maxResults);
      case 'baidu':    return await searchBaidu(cfg.apiKey!, cfg.searchEngineId!, query, maxResults);
      case 'naver':    return await searchNaver(cfg.apiKey!, cfg.searchEngineId!, query, maxResults);
      case 'searxng':  return await searchSearXNG(cfg.searchEngineId!, query, maxResults, cfg.apiKey);
      default:         return [];
    }
  } catch (err) {
    console.warn(`[WebSearch] ${provider} failed:`, err);
    return [];
  }
}

// ─── Provider Implementations ────────────────────────────────────────────────

async function searchTavily(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: maxResults,
      search_depth: 'basic',
      include_answer: false,
    }),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results ?? []).map((r: { title: string; url: string; content: string; published_date?: string }) => ({
    title: r.title,
    url: r.url,
    snippet: r.content?.slice(0, 300) ?? '',
    publishedDate: r.published_date,
  }));
}

async function searchExa(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const res = await fetch('https://api.exa.ai/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      query,
      numResults: maxResults,
      type: 'neural',
      useAutoprompt: true,
      contents: { text: { maxCharacters: 300 } },
    }),
  });
  if (!res.ok) throw new Error(`Exa ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results ?? []).map((r: { title: string; url: string; text?: string; publishedDate?: string }) => ({
    title: r.title ?? '',
    url: r.url,
    snippet: r.text?.slice(0, 300) ?? '',
    publishedDate: r.publishedDate,
  }));
}

async function searchYou(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    query,
    num_web_results: String(maxResults),
  });
  const res = await fetch(`https://api.ydc-index.io/search?${params}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) throw new Error(`You.com ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.hits ?? []).slice(0, maxResults).map((r: { title: string; url: string; description?: string; snippets?: string[] }) => ({
    title: r.title ?? '',
    url: r.url,
    snippet: (r.description ?? r.snippets?.[0] ?? '').slice(0, 300),
  }));
}

async function searchBrave(apiKey: string, query: string, maxResults: number, freshness?: boolean): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    count: String(maxResults),
  });
  if (freshness) params.set('freshness', 'pw'); // past week
  const res = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': apiKey,
    },
  });
  if (!res.ok) throw new Error(`Brave ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.web?.results ?? []).map((r: { title: string; url: string; description: string; page_age?: string }) => ({
    title: r.title,
    url: r.url,
    snippet: r.description?.slice(0, 300) ?? '',
    publishedDate: r.page_age,
  }));
}

async function searchGoogle(apiKey: string, cx: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    key: apiKey,
    cx,
    q: query,
    num: String(Math.min(maxResults, 10)),
  });
  const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
  if (!res.ok) throw new Error(`Google CSE ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.items ?? []).map((r: { title: string; link: string; snippet: string }) => ({
    title: r.title,
    url: r.link,
    snippet: r.snippet?.slice(0, 300) ?? '',
  }));
}

async function searchBing(apiKey: string, query: string, maxResults: number, freshness?: boolean): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    count: String(maxResults),
    textFormat: 'Raw',
  });
  if (freshness) params.set('freshness', 'Week');
  const res = await fetch(`https://api.bing.microsoft.com/v7.0/search?${params}`, {
    headers: { 'Ocp-Apim-Subscription-Key': apiKey },
  });
  if (!res.ok) throw new Error(`Bing ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.webPages?.value ?? []).map((r: { name: string; url: string; snippet: string; dateLastCrawled?: string }) => ({
    title: r.name,
    url: r.url,
    snippet: r.snippet?.slice(0, 300) ?? '',
    publishedDate: r.dateLastCrawled,
  }));
}

async function searchSerpApi(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    api_key: apiKey,
    q: query,
    engine: 'google',
    num: String(maxResults),
  });
  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.organic_results ?? []).map((r: { title: string; link: string; snippet: string; date?: string }) => ({
    title: r.title,
    url: r.link,
    snippet: r.snippet?.slice(0, 300) ?? '',
    publishedDate: r.date,
  }));
}

async function searchKagi(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    limit: String(maxResults),
  });
  const res = await fetch(`https://kagi.com/api/v0/search?${params}`, {
    headers: { Authorization: `Bot ${apiKey}` },
  });
  if (!res.ok) throw new Error(`Kagi ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.data ?? [])
    .filter((r: { t: number }) => r.t === 0) // t=0 is organic results
    .slice(0, maxResults)
    .map((r: { title: string; url: string; snippet: string; published?: string }) => ({
      title: r.title ?? '',
      url: r.url,
      snippet: r.snippet?.slice(0, 300) ?? '',
      publishedDate: r.published,
    }));
}

async function searchMojeek(apiKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    fmt: 'json',
    api_key: apiKey,
    t: String(maxResults),
  });
  const res = await fetch(`https://www.mojeek.com/search?${params}`);
  if (!res.ok) throw new Error(`Mojeek ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.response?.results ?? []).map((r: { title: string; url: string; desc: string }) => ({
    title: r.title ?? '',
    url: r.url,
    snippet: r.desc?.slice(0, 300) ?? '',
  }));
}

async function searchYandex(apiKey: string, user: string, query: string, maxResults: number): Promise<SearchResult[]> {
  // Yandex XML Search API — returns XML, we parse the key fields
  const params = new URLSearchParams({
    user,
    key: apiKey,
    query,
    groupby: `attr=d.mode=deep.groups-on-page=${maxResults}.docs-in-group=1`,
    l10n: 'en',
  });
  const res = await fetch(`https://yandex.com/search/xml?${params}`);
  if (!res.ok) throw new Error(`Yandex ${res.status}: ${await res.text()}`);
  const text = await res.text();
  // Simple XML extraction (no DOMParser dependency for portability)
  const results: SearchResult[] = [];
  const docRegex = /<doc>[\s\S]*?<\/doc>/g;
  let match;
  while ((match = docRegex.exec(text)) !== null && results.length < maxResults) {
    const doc = match[0];
    const title = doc.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<[^>]*>/g, '') ?? '';
    const url = doc.match(/<url>([\s\S]*?)<\/url>/)?.[1] ?? '';
    const snippet = doc.match(/<headline>([\s\S]*?)<\/headline>/)?.[1]?.replace(/<[^>]*>/g, '') ?? '';
    if (url) results.push({ title, url, snippet: snippet.slice(0, 300) });
  }
  return results;
}

async function searchBaidu(apiKey: string, secretKey: string, query: string, maxResults: number): Promise<SearchResult[]> {
  // Baidu Custom Search API (requires AK+SK auth — access token flow)
  // Step 1: Get access token
  const tokenParams = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: apiKey,
    client_secret: secretKey,
  });
  const tokenRes = await fetch(`https://aip.baidubce.com/oauth/2.0/token?${tokenParams}`, { method: 'POST' });
  if (!tokenRes.ok) throw new Error(`Baidu token ${tokenRes.status}: ${await tokenRes.text()}`);
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // Step 2: Search
  const searchParams = new URLSearchParams({
    access_token: accessToken,
    query,
    results_num: String(Math.min(maxResults, 10)),
  });
  const res = await fetch(`https://aip.baidubce.com/rest/2.0/search/v1/resource/search?${searchParams}`);
  if (!res.ok) throw new Error(`Baidu search ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results ?? []).map((r: { title: string; url: string; abstract?: string }) => ({
    title: r.title?.replace(/<[^>]*>/g, '') ?? '',
    url: r.url,
    snippet: (r.abstract ?? '').replace(/<[^>]*>/g, '').slice(0, 300),
  }));
}

async function searchNaver(clientId: string, clientSecret: string, query: string, maxResults: number): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    query,
    display: String(Math.min(maxResults, 10)),
    sort: 'date',
  });
  const res = await fetch(`https://openapi.naver.com/v1/search/webkr.json?${params}`, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  });
  if (!res.ok) throw new Error(`Naver ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.items ?? []).map((r: { title: string; link: string; description: string }) => ({
    title: r.title?.replace(/<[^>]*>/g, '') ?? '',
    url: r.link,
    snippet: r.description?.replace(/<[^>]*>/g, '').slice(0, 300) ?? '',
  }));
}

async function searchSearXNG(instanceUrl: string, query: string, maxResults: number, authToken?: string): Promise<SearchResult[]> {
  const url = instanceUrl.replace(/\/+$/, '');
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    pageno: '1',
  });
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${url}/search?${params}`, { headers });
  if (!res.ok) throw new Error(`SearXNG ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results ?? []).slice(0, maxResults).map((r: { title: string; url: string; content: string; publishedDate?: string }) => ({
    title: r.title ?? '',
    url: r.url,
    snippet: r.content?.slice(0, 300) ?? '',
    publishedDate: r.publishedDate,
  }));
}

// ─── Formatting Helpers ──────────────────────────────────────────────────────

/**
 * Format search results into a context block for LLM injection.
 * Compact format optimized for token efficiency.
 */
export function formatSearchResultsForLLM(results: SearchResult[]): string {
  if (results.length === 0) return '';

  const lines = results.map((r, i) => {
    const date = r.publishedDate ? ` (${r.publishedDate})` : '';
    return `[${i + 1}] ${r.title}${date}\n    ${r.url}\n    ${r.snippet}`;
  });

  return `──── Web Search Results (live) ────\n${lines.join('\n\n')}`;
}
