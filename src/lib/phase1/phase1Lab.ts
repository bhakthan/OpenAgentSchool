import { PatternData } from '@/lib/data/patterns';
import type { LearningProfile } from '@/lib/userSettings';
import { getStudyModeProgress } from '@/lib/data/studyMode/progress';

// ── Types ────────────────────────────────────────────────────────────────────

export interface QuizProgressSummary {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  categoriesCompleted: string[];
}

export interface ConceptLite {
  id: string;
  title: string;
  tags?: string[];
  prerequisites?: string[];
}

export interface KnowledgeGraphEdge {
  from: string;
  to: string;
  reason: 'prerequisite' | 'keyword' | 'suggested';
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'concept' | 'pattern';
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

export interface BattleWeights {
  quality: number;
  speed: number;
  simplicity: number;
}

export interface PatternBattleScore {
  patternId: string;
  patternName: string;
  quality: number;
  speed: number;
  simplicity: number;
  overall: number;
}

export interface LearnerSnapshot {
  quiz: QuizProgressSummary;
  studySessions: number;
  studyCompleted: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  streak: number;
}

// ── Quiz progress ────────────────────────────────────────────────────────────

const DEFAULT_PROGRESS: QuizProgressSummary = {
  totalQuizzes: 0,
  averageScore: 0,
  bestScore: 0,
  totalTimeSpent: 0,
  categoriesCompleted: [],
};

export function parseQuizProgressFromStorage(raw: string | null): QuizProgressSummary {
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<QuizProgressSummary>;
    return {
      totalQuizzes: Number.isFinite(parsed.totalQuizzes) ? Number(parsed.totalQuizzes) : 0,
      averageScore: Number.isFinite(parsed.averageScore) ? Number(parsed.averageScore) : 0,
      bestScore: Number.isFinite(parsed.bestScore) ? Number(parsed.bestScore) : 0,
      totalTimeSpent: Number.isFinite(parsed.totalTimeSpent) ? Number(parsed.totalTimeSpent) : 0,
      categoriesCompleted: Array.isArray(parsed.categoriesCompleted) ? parsed.categoriesCompleted.filter(Boolean) : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

// ── Learner snapshot (aggregates all local telemetry) ────────────────────────

export function buildLearnerSnapshot(): LearnerSnapshot {
  const quiz = parseQuizProgressFromStorage(
    typeof window === 'undefined' ? null : window.localStorage.getItem('quiz-progress')
  );
  const studySessions = getStudyModeProgress();
  const completed = studySessions.filter(s => s.isComplete).length;
  const level = quiz.averageScore >= 80 ? 'advanced' : quiz.averageScore >= 60 ? 'intermediate' : 'beginner';

  // Simple streak: count consecutive days with a completed quiz or study session
  const dates = new Set<string>();
  studySessions.filter(s => s.isComplete && s.endTime).forEach(s => {
    dates.add(new Date(s.endTime!).toISOString().slice(0, 10));
  });
  // quiz history doesn't have dates easily accessible, so just use study sessions
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (dates.has(d.toISOString().slice(0, 10))) {
      streak++;
    } else if (i > 0) break; // allow today to be missing
  }

  return { quiz, studySessions: studySessions.length, studyCompleted: completed, level, streak };
}

// ── Copilot weekly plan (now profile-aware) ──────────────────────────────────

export function createWeeklyPlan(
  snapshot: LearnerSnapshot,
  profile?: LearningProfile
): string[] {
  const level = snapshot.level;
  const roleHint = profile?.role && profile.role !== 'learner'
    ? ` Focus on ${profile.role}-relevant topics.`
    : '';

  const categoryStretch = snapshot.quiz.categoriesCompleted.length >= 4
    ? 'Try a niche category you have never opened.'
    : 'Complete 2 new quiz categories this week.';

  const plans = [
    `Run 3 ${level} quizzes and target +5 points over your current ${snapshot.quiz.averageScore}% average.${roleHint}`,
    'Complete one Study Mode session and write a short reflection in your notes.',
    categoryStretch,
    'Open Pattern Battle Arena and compare two patterns before your next coding task.',
  ];

  if (snapshot.streak >= 3) {
    plans.push(`🔥 ${snapshot.streak}-day streak — keep it going!`);
  } else {
    plans.push('Start a learning streak by completing at least one activity per day.');
  }

  return plans;
}

// ── Knowledge Graph (upgraded: prerequisite edges + nodes) ───────────────────

export function buildKnowledgeGraph(concepts: ConceptLite[], patterns: PatternData[]): KnowledgeGraphData {
  const nodes: KnowledgeGraphNode[] = [];
  const edges: KnowledgeGraphEdge[] = [];
  const nodeIds = new Set<string>();

  const ensureNode = (id: string, label: string, type: 'concept' | 'pattern') => {
    if (!nodeIds.has(id)) {
      nodeIds.add(id);
      nodes.push({ id, label, type });
    }
  };

  // Add concept nodes and prerequisite edges
  for (const concept of concepts) {
    ensureNode(concept.id, concept.title, 'concept');
    if (concept.prerequisites) {
      for (const prereqId of concept.prerequisites) {
        const prereq = concepts.find(c => c.id === prereqId);
        if (prereq) {
          ensureNode(prereq.id, prereq.title, 'concept');
          edges.push({ from: prereq.id, to: concept.id, reason: 'prerequisite' });
        }
      }
    }
  }

  // Add keyword-overlap edges to patterns
  for (const concept of concepts) {
    const tags = (concept.tags || []).map(tag => tag.toLowerCase()).filter(tag => tag.length > 3);
    const linked = patterns
      .filter(pattern => tags.some(tag => `${pattern.name} ${pattern.description}`.toLowerCase().includes(tag)))
      .slice(0, 4);

    if (linked.length === 0 && patterns[0]) {
      ensureNode(patterns[0].id, patterns[0].name, 'pattern');
      edges.push({ from: concept.id, to: patterns[0].id, reason: 'suggested' });
      continue;
    }

    for (const pattern of linked) {
      ensureNode(pattern.id, pattern.name, 'pattern');
      edges.push({ from: concept.id, to: pattern.id, reason: 'keyword' });
    }
  }

  return { nodes, edges };
}

// ── Battle Arena scoring ─────────────────────────────────────────────────────

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function scorePattern(pattern: PatternData, weights: BattleWeights): PatternBattleScore {
  const complexity = pattern.nodes.length + Math.floor(pattern.edges.length / 2) + pattern.implementation.length;
  const quality = clamp((pattern.evaluationProfile ? 78 : 64) + ((pattern.velocityProfile?.reusabilityScore || 5) * 2));
  const speed = clamp(100 - (complexity * 2));
  const simplicity = clamp(100 - (complexity * 2.5));
  const denominator = weights.quality + weights.speed + weights.simplicity;
  const overall = Math.round(
    ((quality * weights.quality) + (speed * weights.speed) + (simplicity * weights.simplicity)) / denominator
  );

  return {
    patternId: pattern.id,
    patternName: pattern.name,
    quality: Math.round(quality),
    speed: Math.round(speed),
    simplicity: Math.round(simplicity),
    overall: clamp(overall),
  };
}

