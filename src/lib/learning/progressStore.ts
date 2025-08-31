// Lightweight client-side progress storage for AI-Native Skills
// Persists: completed modules, last active tab per module, studio scores

export type ModuleId =
  | 'observability-evalops'
  | 'safety-governance'
  | 'promptops-tooling'
  | 'cost-performance'
  | 'security-data-boundaries'
  | 'ai-product-management'
  | 'hitl-operations'
  | 'knowledge-rag'
  | 'multi-agent-orchestration'
  | 'org-change-playbooks';

export interface StudioScore {
  id: string;
  score: number; // 0-100
  updatedAt: number;
}

interface ModuleProgress {
  completed: boolean;
  lastTab?: string;
  studios?: Record<string, StudioScore>;
  microAssessments?: Record<string, StudioScore>;
  outcomesReviewed?: boolean;
  studioRuns?: Record<string, Array<StudioRunRecord>>;
}

interface ProgressState {
  modules: Record<ModuleId, ModuleProgress>;
}

const KEY = 'aiNativeSkills.progress.v1';

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { modules: {} as any };
    const parsed = JSON.parse(raw) as ProgressState;
    return parsed || { modules: {} as any };
  } catch {
    return { modules: {} as any };
  }
}

function save(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota or private mode errors
  }
}

export const progressStore = {
  getModule(moduleId: ModuleId): ModuleProgress {
    const state = load();
    return state.modules[moduleId] || { completed: false };
  },
  setCompleted(moduleId: ModuleId, completed = true) {
    const state = load();
    state.modules[moduleId] = { ...state.modules[moduleId], completed } as ModuleProgress;
    save(state);
  },
  getLastTab(moduleId: ModuleId): string | undefined {
    return this.getModule(moduleId).lastTab;
  },
  setLastTab(moduleId: ModuleId, tab: string) {
    const state = load();
    state.modules[moduleId] = { ...state.modules[moduleId], lastTab: tab } as ModuleProgress;
    save(state);
  },
  setStudioScore(moduleId: ModuleId, studioId: string, score: number) {
    const state = load();
    const mod = state.modules[moduleId] || { completed: false };
    const studios = { ...(mod.studios || {}) } as Record<string, StudioScore>;
    studios[studioId] = { id: studioId, score, updatedAt: Date.now() };
    state.modules[moduleId] = { ...mod, studios } as ModuleProgress;
    save(state);
  },
  getStudioScore(moduleId: ModuleId, studioId: string): StudioScore | undefined {
    return this.getModule(moduleId).studios?.[studioId];
  },
  addStudioRun(moduleId: ModuleId, studioId: string, run: StudioRunRecord) {
    const state = load();
    const mod = state.modules[moduleId] || { completed: false };
    const runs: Record<string, Array<StudioRunRecord>> = { ...(mod.studioRuns || {}) };
    const arr = runs[studioId] ? [...runs[studioId]] : [];
    arr.unshift(run);
    // cap history to last 10
    runs[studioId] = arr.slice(0, 10);
    state.modules[moduleId] = { ...mod, studioRuns: runs } as ModuleProgress;
    save(state);
  },
  getStudioRuns(moduleId: ModuleId, studioId: string): Array<StudioRunRecord> {
    return this.getModule(moduleId).studioRuns?.[studioId] || [];
  },
  setMicroAssessmentScore(moduleId: ModuleId, assessmentId: string, score: number) {
    const state = load();
    const mod = state.modules[moduleId] || { completed: false };
    const micro = { ...(mod.microAssessments || {}) } as Record<string, StudioScore>;
    micro[assessmentId] = { id: assessmentId, score, updatedAt: Date.now() };
    state.modules[moduleId] = { ...mod, microAssessments: micro } as ModuleProgress;
    save(state);
  },
  getMicroAssessmentScore(moduleId: ModuleId, assessmentId: string): StudioScore | undefined {
    return this.getModule(moduleId).microAssessments?.[assessmentId];
  },
  setOutcomesReviewed(moduleId: ModuleId, reviewed: boolean) {
    const state = load();
    const mod = state.modules[moduleId] || { completed: false };
    state.modules[moduleId] = { ...mod, outcomesReviewed: reviewed } as ModuleProgress;
    save(state);
  },
  getOutcomesReviewed(moduleId: ModuleId): boolean {
    return !!this.getModule(moduleId).outcomesReviewed;
  },
  getSubitemCount(moduleId: ModuleId): { done: number; total: number } {
    const m = this.getModule(moduleId);
    const total = 3; // outcomes, studio, assessment
    const doneOutcomes = m.outcomesReviewed ? 1 : 0;
    const doneStudio = m.studios && Object.keys(m.studios).length > 0 ? 1 : 0;
    const doneAssess = m.microAssessments && Object.keys(m.microAssessments).length > 0 ? 1 : 0;
    return { done: doneOutcomes + doneStudio + doneAssess, total };
  },
  getCompletedCount(): number {
    const state = load();
    return Object.values(state.modules).filter(m => m.completed).length;
  }
};

// Types for studio runs
export interface SummaryMetrics {
  accuracy: number; // 0-100
  safety: number;   // 0-100 (percent unflagged)
  p50: number;      // ms
  p95: number;      // ms
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
}

export interface StudioRunRecord {
  id: string;
  at: number;
  before?: SummaryMetrics;
  after?: SummaryMetrics;
  delta?: Partial<Record<keyof SummaryMetrics, number>>;
  notes?: string;
}
