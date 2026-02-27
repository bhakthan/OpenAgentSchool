import { preferences } from '@/lib/db';

const QUEUE_KEY = 'offline.progress.sync.queue.v1';

export interface ProgressSyncEvent {
  id: string;
  type: 'quiz_completed' | 'study_session' | 'achievement_unlocked';
  payload: Record<string, unknown>;
  createdAt: number;
}

export async function getPendingProgressEvents(): Promise<ProgressSyncEvent[]> {
  const raw = await preferences.get(QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as ProgressSyncEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveQueue(events: ProgressSyncEvent[]): Promise<void> {
  await preferences.set(QUEUE_KEY, JSON.stringify(events));
}

export async function enqueueProgressEvent(
  event: Omit<ProgressSyncEvent, 'id' | 'createdAt'>
): Promise<ProgressSyncEvent> {
  const next: ProgressSyncEvent = {
    ...event,
    id: `progress_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: Date.now(),
  };
  const current = await getPendingProgressEvents();
  current.push(next);
  await saveQueue(current);
  return next;
}

export async function clearProgressQueue(): Promise<void> {
  await saveQueue([]);
}

export async function flushProgressQueue(
  syncHandler: (event: ProgressSyncEvent) => Promise<void>
): Promise<{ synced: number; failed: number }> {
  const queue = await getPendingProgressEvents();
  if (queue.length === 0) return { synced: 0, failed: 0 };

  const remaining: ProgressSyncEvent[] = [];
  let synced = 0;
  let failed = 0;

  for (const event of queue) {
    try {
      await syncHandler(event);
      synced += 1;
    } catch {
      remaining.push(event);
      failed += 1;
    }
  }

  await saveQueue(remaining);
  return { synced, failed };
}

