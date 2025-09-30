import type { SCLContextSummary } from '@/types/supercritical';
import { API_CONFIG, withApiV1 } from './config';
import { apiCache } from '@/lib/cache';

type Seeds = {
  conceptIds: string[];
  patternIds: string[];
  practices: string[];
};

/**
 * Fetch SCL context summary from the Knowledge Service
 * Falls back to throwing on non-2xx so callers can decide how to handle.
 * Results are cached for 5 minutes to reduce redundant API calls.
 */
export async function fetchContextSummary(seeds: Seeds, signal?: AbortSignal): Promise<SCLContextSummary> {
  // Create cache key from seeds
  const cacheKey = `knowledge:context:${JSON.stringify(seeds)}`;
  
  // Check cache first
  const cached = apiCache.get<SCLContextSummary>(cacheKey);
  if (cached) {
    console.log('✅ Using cached context summary');
    return cached;
  }

  const base = withApiV1(API_CONFIG.knowledge);
  const url = `${base}/context/summary`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seeds }),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`KnowledgeService error ${res.status}: ${text || res.statusText}`);
  }

  const data = (await res.json()) as SCLContextSummary;
  
  // Cache the result for 5 minutes
  apiCache.set(cacheKey, data, 5 * 60 * 1000);
  console.log('✅ Fetched and cached context summary');
  
  return data;
}
