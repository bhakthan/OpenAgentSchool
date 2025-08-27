import type { SCLContextSummary } from '@/types/supercritical';
import { API_CONFIG, withApiV1 } from './config';

type Seeds = {
  conceptIds: string[];
  patternIds: string[];
  practices: string[];
};

/**
 * Fetch SCL context summary from the Knowledge Service
 * Falls back to throwing on non-2xx so callers can decide how to handle.
 */
export async function fetchContextSummary(seeds: Seeds, signal?: AbortSignal): Promise<SCLContextSummary> {
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
  return data;
}
