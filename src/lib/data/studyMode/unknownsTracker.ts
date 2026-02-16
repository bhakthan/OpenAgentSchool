// Unknowns Tracker — localStorage-backed data layer for "What I Don't Know Yet"
// Flips the typical progress narrative: identifying unknowns is the achievement.

export interface LearningUnknown {
  id: string;
  conceptId: string;
  question: string;
  addedAt: string;          // ISO timestamp
  resolvedAt?: string;      // ISO timestamp when resolved
  confusionLevel: 1 | 2 | 3 | 4;  // 1=got-it, 2=processing, 3=confused, 4=don't-know-what-I-don't-know
}

export interface ConfusionCheckpointEntry {
  id: string;
  conceptId: string;
  level: 1 | 2 | 3 | 4;
  timestamp: string;
  studyModeType?: string;
}

const UNKNOWNS_KEY = 'learning-unknowns';
const CHECKPOINTS_KEY = 'confusion-checkpoints';

// ── Unknowns CRUD ──────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getUnknowns(): LearningUnknown[] {
  try {
    const raw = localStorage.getItem(UNKNOWNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addUnknown(conceptId: string, question: string, confusionLevel: 1 | 2 | 3 | 4 = 3): LearningUnknown {
  const unknowns = getUnknowns();
  const entry: LearningUnknown = {
    id: generateId(),
    conceptId,
    question,
    addedAt: new Date().toISOString(),
    confusionLevel,
  };
  unknowns.push(entry);
  localStorage.setItem(UNKNOWNS_KEY, JSON.stringify(unknowns));
  return entry;
}

export function resolveUnknown(id: string): void {
  const unknowns = getUnknowns();
  const idx = unknowns.findIndex(u => u.id === id);
  if (idx !== -1) {
    unknowns[idx].resolvedAt = new Date().toISOString();
    localStorage.setItem(UNKNOWNS_KEY, JSON.stringify(unknowns));
  }
}

export function removeUnknown(id: string): void {
  const unknowns = getUnknowns().filter(u => u.id !== id);
  localStorage.setItem(UNKNOWNS_KEY, JSON.stringify(unknowns));
}

export function getUnresolved(): LearningUnknown[] {
  return getUnknowns().filter(u => !u.resolvedAt);
}

export function getResolved(): LearningUnknown[] {
  return getUnknowns().filter(u => !!u.resolvedAt);
}

export interface UnknownsStats {
  totalIdentified: number;
  activeEdges: number;
  breakthroughs: number;
  /** Ratio of resolved to total — higher means more breakthroughs */
  resolutionRate: number;
}

export function getUnknownsStats(): UnknownsStats {
  const all = getUnknowns();
  const resolved = all.filter(u => !!u.resolvedAt);
  return {
    totalIdentified: all.length,
    activeEdges: all.length - resolved.length,
    breakthroughs: resolved.length,
    resolutionRate: all.length > 0 ? resolved.length / all.length : 0,
  };
}

// ── Confusion Checkpoints ──────────────────────────────────────────────

export function getCheckpoints(): ConfusionCheckpointEntry[] {
  try {
    const raw = localStorage.getItem(CHECKPOINTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCheckpoint(
  conceptId: string,
  level: 1 | 2 | 3 | 4,
  studyModeType?: string
): ConfusionCheckpointEntry {
  const checkpoints = getCheckpoints();
  const entry: ConfusionCheckpointEntry = {
    id: generateId(),
    conceptId,
    level,
    timestamp: new Date().toISOString(),
    studyModeType,
  };
  checkpoints.push(entry);
  localStorage.setItem(CHECKPOINTS_KEY, JSON.stringify(checkpoints));
  return entry;
}

export function getCheckpointsSummary(conceptId?: string): {
  total: number;
  averageLevel: number;
  distribution: Record<1 | 2 | 3 | 4, number>;
} {
  let cps = getCheckpoints();
  if (conceptId) cps = cps.filter(c => c.conceptId === conceptId);
  
  const distribution: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  cps.forEach(c => { distribution[c.level]++; });
  
  const total = cps.length;
  const avgLevel = total > 0 ? cps.reduce((s, c) => s + c.level, 0) / total : 0;
  
  return { total, averageLevel: avgLevel, distribution };
}
