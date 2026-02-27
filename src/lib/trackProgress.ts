/**
 * Project Track Progress — localStorage-backed milestone completion tracking
 */

const STORAGE_KEY = 'oas.trackProgress.v1';

export interface TrackProgressData {
  [trackId: string]: {
    completedMilestones: string[];
    startedAt: string;
    lastActivityAt: string;
  };
}

function loadProgress(): TrackProgressData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: TrackProgressData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTrackProgress(trackId: string): string[] {
  const data = loadProgress();
  return data[trackId]?.completedMilestones ?? [];
}

export function completeMilestone(trackId: string, milestoneId: string): string[] {
  const data = loadProgress();
  const now = new Date().toISOString();
  if (!data[trackId]) {
    data[trackId] = { completedMilestones: [], startedAt: now, lastActivityAt: now };
  }
  if (!data[trackId].completedMilestones.includes(milestoneId)) {
    data[trackId].completedMilestones.push(milestoneId);
  }
  data[trackId].lastActivityAt = now;
  saveProgress(data);
  return data[trackId].completedMilestones;
}

export function uncompleteMilestone(trackId: string, milestoneId: string): string[] {
  const data = loadProgress();
  if (!data[trackId]) return [];
  data[trackId].completedMilestones = data[trackId].completedMilestones.filter(id => id !== milestoneId);
  data[trackId].lastActivityAt = new Date().toISOString();
  saveProgress(data);
  return data[trackId].completedMilestones;
}

export function getCompletedTracks(allTrackIds: { id: string; milestoneCount: number }[]): string[] {
  const data = loadProgress();
  return allTrackIds
    .filter(t => (data[t.id]?.completedMilestones.length ?? 0) >= t.milestoneCount)
    .map(t => t.id);
}

export function resetTrackProgress(trackId: string): void {
  const data = loadProgress();
  delete data[trackId];
  saveProgress(data);
}

export function getAllTrackProgress(): TrackProgressData {
  return loadProgress();
}
