// Lightweight progress & session utilities decoupled from heavy question banks
import { StudyModeSession, StudyModeType, StudyModeProgress } from './types';

export function calculateStudyModeProgress(sessions: StudyModeSession[]): StudyModeProgress {
  const completedSessions = sessions.filter(s => s.isComplete);
  const totalScore = completedSessions.reduce((sum, s) => sum + (s.score || 0), 0);
  const averageScore = completedSessions.length > 0 ? totalScore / completedSessions.length : 0;

  const conceptProgress: Record<string, number> = {};
  const conceptCounts: Record<string, { total: number; completed: number }> = {};
  sessions.forEach(session => {
    if (!conceptCounts[session.conceptId]) {
      conceptCounts[session.conceptId] = { total: 0, completed: 0 };
    }
    conceptCounts[session.conceptId].total++;
    if (session.isComplete) conceptCounts[session.conceptId].completed++;
  });
  Object.keys(conceptCounts).forEach(conceptId => {
    const { total, completed } = conceptCounts[conceptId];
    conceptProgress[conceptId] = (completed / total) * 100;
  });

  const typeProgress: Record<StudyModeType, number> = {
    socratic: 0, scenario: 0, debug: 0, guided: 0, scl: 0
  };
  const typeCounts: Record<StudyModeType, { total: number; completed: number }> = {
    socratic: { total: 0, completed: 0 },
    scenario: { total: 0, completed: 0 },
    debug: { total: 0, completed: 0 },
    guided: { total: 0, completed: 0 },
    scl: { total: 0, completed: 0 }
  };
  sessions.forEach(session => {
    typeCounts[session.type].total++;
    if (session.isComplete) typeCounts[session.type].completed++;
  });
  Object.keys(typeCounts).forEach(type => {
    const { total, completed } = typeCounts[type as StudyModeType];
    if (total > 0) typeProgress[type as StudyModeType] = (completed / total) * 100;
  });

  const insights = sessions
    .filter(s => s.isComplete)
    .flatMap(s => s.insights)
    .filter((insight, idx, arr) => arr.indexOf(insight) === idx);

  return {
    totalSessions: sessions.length,
    completedSessions: completedSessions.length,
    averageScore,
    conceptProgress,
    typeProgress,
    insights,
    achievements: []
  };
}

export function saveStudyModeProgress(session: StudyModeSession): void {
  const existing = getStudyModeProgress();
  const updated = [...existing, session];
  localStorage.setItem('study-mode-sessions', JSON.stringify(updated));
}

export function getStudyModeProgress(): StudyModeSession[] {
  try {
    const raw = localStorage.getItem('study-mode-sessions');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((s: any) => ({
      ...s,
      startTime: new Date(s.startTime),
      endTime: s.endTime ? new Date(s.endTime) : undefined
    }));
  } catch {
    return [];
  }
}

export function clearTypeProgress(type: StudyModeType): void {
  try {
    const existing = JSON.parse(localStorage.getItem('study-mode-sessions') || '[]');
    const filtered = existing.filter((s: any) => s.type !== type);
    localStorage.setItem('study-mode-sessions', JSON.stringify(filtered));
  } catch {}
}

export function clearAllProgress(): void {
  try {
    localStorage.removeItem('study-mode-sessions');
    localStorage.removeItem('studyModeProgress');
    sessionStorage.removeItem('studyModeProgress');
  } catch {}
}

// Placeholder for future unlock logic; currently all unlocked
export function hasUnlockedStudyModeType(): boolean { return true; }
