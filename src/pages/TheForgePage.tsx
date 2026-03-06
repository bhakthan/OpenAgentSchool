/**
 * The Forge — Cognitive Friction Lab
 *
 * Main page with state machine: landing → discipline → exercise.
 * "Cognitive friction is the point of the exercise."
 */

import React, { useState, useCallback, lazy, Suspense } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { FORGE_DISCIPLINES, getForgeExercise } from '@/lib/data/forge/disciplines';
import {
  getForgeScore,
  getForgeCompletedCount,
  getForgeTotalCount,
  getDisciplineCompletionPercent,
  getUnlockedDisciplines,
  getExerciseResult,
} from '@/lib/data/forge/progress';
import type { ForgeDiscipline, ForgeDisciplineId, ForgeExercise } from '@/lib/data/forge/types';

const SocraticDefense = lazy(() => import('@/components/forge/SocraticDefense'));
const PromptAutopsy = lazy(() => import('@/components/forge/PromptAutopsy'));
const EpistemicGym = lazy(() => import('@/components/forge/EpistemicGym'));
const TrustCalibrationLab = lazy(() => import('@/components/forge/TrustCalibrationLab'));

type View = 'landing' | 'discipline' | 'exercise';

// Phosphor-style icon map (inline SVG to avoid heavy import in a lazy page)
const DISCIPLINE_ICONS: Record<ForgeDisciplineId, React.ReactNode> = {
  'socratic-defense': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M136,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h88A8,8,0,0,1,136,128Zm-8-56H40a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16Zm0,112H40a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM208,72H200V64a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V88h8a8,8,0,0,0,0-16Zm0,96H176a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Z" />
    </svg>
  ),
  'prompt-autopsies': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </svg>
  ),
  'epistemic-gym': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v56H96V64A16,16,0,0,0,80,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V136h64v56a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16Z" />
    </svg>
  ),
  'trust-calibration': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm80-34.91V120a8,8,0,0,0-16,0v5.09A48.08,48.08,0,0,0,168,88h-5.09a8,8,0,0,0,0,16H168a32,32,0,0,1,24,24v5.09a8,8,0,0,0,16,0Zm0,26.82V168a48.05,48.05,0,0,1-48,48h-5.09a8,8,0,0,1,0-16H160a32,32,0,0,0,32-32v-5.09a8,8,0,0,1,16,0ZM93.09,200H88a48.05,48.05,0,0,1-48-48v-5.09a8,8,0,0,0-16,0V152a64.07,64.07,0,0,0,64,64h5.09a8,8,0,0,0,0-16ZM40,125.09V120A48.05,48.05,0,0,1,88,72h5.09a8,8,0,0,0,0-16H88A64.07,64.07,0,0,0,24,120v5.09a8,8,0,0,0,16,0Z" />
    </svg>
  ),
};

const DISCIPLINE_COLORS: Record<ForgeDisciplineId, { border: string; bg: string; text: string; badge: string }> = {
  'socratic-defense': {
    border: 'border-amber-300 dark:border-amber-700',
    bg: 'bg-amber-50/50 dark:bg-amber-950/20',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-100 dark:bg-amber-900/40',
  },
  'prompt-autopsies': {
    border: 'border-red-300 dark:border-red-700',
    bg: 'bg-red-50/50 dark:bg-red-950/20',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 dark:bg-red-900/40',
  },
  'epistemic-gym': {
    border: 'border-purple-300 dark:border-purple-700',
    bg: 'bg-purple-50/50 dark:bg-purple-950/20',
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-100 dark:bg-purple-900/40',
  },
  'trust-calibration': {
    border: 'border-cyan-300 dark:border-cyan-700',
    bg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'bg-cyan-100 dark:bg-cyan-900/40',
  },
};

export default function TheForgePage() {
  const [view, setView] = useState<View>('landing');
  const [activeDisciplineId, setActiveDisciplineId] = useState<ForgeDisciplineId | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [, forceUpdate] = useState(0); // trigger re-render after exercise completion

  const forgeScore = getForgeScore();
  const completedCount = getForgeCompletedCount();
  const totalCount = getForgeTotalCount();
  const unlockedIds = getUnlockedDisciplines();

  const navigateToDiscipline = useCallback((id: ForgeDisciplineId) => {
    setActiveDisciplineId(id);
    setActiveExerciseId(null);
    setView('discipline');
    trackEvent('forge_discipline_start', { discipline: id });
  }, []);

  const navigateToExercise = useCallback((disciplineId: ForgeDisciplineId, exerciseId: string) => {
    setActiveDisciplineId(disciplineId);
    setActiveExerciseId(exerciseId);
    setView('exercise');
  }, []);

  const backToLanding = useCallback(() => {
    setView('landing');
    setActiveDisciplineId(null);
    setActiveExerciseId(null);
    forceUpdate(n => n + 1);
  }, []);

  const backToDiscipline = useCallback(() => {
    setView('discipline');
    setActiveExerciseId(null);
    forceUpdate(n => n + 1);
  }, []);

  const activeDiscipline = activeDisciplineId
    ? FORGE_DISCIPLINES.find(d => d.id === activeDisciplineId)
    : null;

  const activeExercise = activeDisciplineId && activeExerciseId
    ? getForgeExercise(activeDisciplineId, activeExerciseId)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* ─── Landing View ─── */}
      {view === 'landing' && (
        <div className="space-y-8">
          {/* Hero */}
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold">
              🔥 Practice
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">The Forge</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cognitive friction is the point of the exercise.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Study Mode teaches content. The Forge trains{' '}
              <span className="font-semibold text-foreground">judgment, wisdom, and intent</span>.
              Four disciplines that grade the process of thinking — not the output.
            </p>
          </header>

          {/* Forge Score */}
          {completedCount > 0 && (
            <div className="rounded-xl border border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 p-6 text-center">
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">{forgeScore}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Forge Score • {completedCount} / {totalCount} exercises completed
              </div>
              <div className="mt-3 mx-auto max-w-xs h-2 rounded-full bg-orange-200/50 dark:bg-orange-800/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Unlock notice */}
          {unlockedIds.length === 1 && (
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-4 text-center text-sm text-purple-700 dark:text-purple-300">
              <strong>Start here:</strong> Complete one Epistemic Gym exercise to unlock the other disciplines.
              Prove your fundamentals before reaching for AI.
            </div>
          )}

          {/* Discipline cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FORGE_DISCIPLINES.map(discipline => {
              const colors = DISCIPLINE_COLORS[discipline.id];
              const isUnlocked = unlockedIds.includes(discipline.id);
              const completion = getDisciplineCompletionPercent(discipline.id);

              return (
                <button
                  key={discipline.id}
                  onClick={() => isUnlocked && navigateToDiscipline(discipline.id)}
                  disabled={!isUnlocked}
                  className={`text-left rounded-xl border-2 p-5 transition-all duration-200 ${
                    isUnlocked
                      ? `${colors.border} hover:shadow-md hover:scale-[1.01] cursor-pointer`
                      : 'border-border opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                      {DISCIPLINE_ICONS[discipline.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-foreground">{discipline.title}</h3>
                        {!isUnlocked && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">🔒 Locked</span>
                        )}
                      </div>
                      <p className={`text-xs font-semibold ${colors.text} mb-1`}>{discipline.subtitle}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{discipline.description}</p>

                      {/* Progress bar */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{completion}%</span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {discipline.exercises.length} exercises
                        </span>
                        {discipline.exercises.some(e => e.aiRequired) && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            AI-powered
                          </span>
                        )}
                        {discipline.exercises.every(e => !e.aiRequired) && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            AI-free
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Philosophy */}
          <div className="rounded-lg border border-border bg-muted/20 p-6 text-center">
            <blockquote className="text-sm italic text-muted-foreground max-w-lg mx-auto">
              "An athlete who never trains without equipment doesn't know their true strength.
              A thinker who never reasons without AI doesn't know their true understanding."
            </blockquote>
          </div>
        </div>
      )}

      {/* ─── Discipline View ─── */}
      {view === 'discipline' && activeDiscipline && (
        <DisciplineView
          discipline={activeDiscipline}
          onBack={backToLanding}
          onSelectExercise={(exId) => navigateToExercise(activeDiscipline.id, exId)}
        />
      )}

      {/* ─── Exercise View ─── */}
      {view === 'exercise' && activeExercise && activeDiscipline && (
        <div className="space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={backToLanding} className="hover:text-foreground transition-colors">The Forge</button>
            <span>/</span>
            <button onClick={backToDiscipline} className="hover:text-foreground transition-colors">
              {activeDiscipline.title}
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">{activeExercise.title}</span>
          </nav>

          <header className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">{activeExercise.title}</h2>
            <p className="text-sm text-muted-foreground">{activeExercise.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground capitalize">
                {activeExercise.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">
                ~{activeExercise.estimatedMinutes} min
              </span>
              {activeExercise.aiRequired && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  AI-powered
                </span>
              )}
              {!activeExercise.aiRequired && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                  AI-free
                </span>
              )}
              {activeExercise.conceptId && (
                <a
                  href={`/concepts/${activeExercise.conceptId}`}
                  className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  Related: {activeExercise.conceptId}
                </a>
              )}
            </div>
          </header>

          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            {renderExercise(activeExercise, backToDiscipline)}
          </Suspense>
        </div>
      )}
    </div>
  );
}

// ── Discipline Detail View ───────────────────────────────────────────────────

function DisciplineView({
  discipline,
  onBack,
  onSelectExercise,
}: {
  discipline: ForgeDiscipline;
  onBack: () => void;
  onSelectExercise: (exerciseId: string) => void;
}) {
  const colors = DISCIPLINE_COLORS[discipline.id];
  const completion = getDisciplineCompletionPercent(discipline.id);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-foreground transition-colors">The Forge</button>
        <span>/</span>
        <span className="text-foreground font-medium">{discipline.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            {DISCIPLINE_ICONS[discipline.id]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{discipline.title}</h2>
            <p className={`text-sm font-semibold ${colors.text}`}>{discipline.subtitle}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">{discipline.description}</p>
      </header>

      {/* Philosophy */}
      <blockquote className={`rounded-lg border ${colors.border} ${colors.bg} p-4 text-sm italic text-gray-700 dark:text-gray-300`}>
        {discipline.philosophy}
      </blockquote>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{completion}%</span>
      </div>

      {/* Exercise list */}
      <div className="space-y-3">
        {discipline.exercises.map((exercise, i) => {
          const result = getExerciseResult(discipline.id, exercise.id);
          const isCompleted = !!result;

          return (
            <button
              key={exercise.id}
              onClick={() => onSelectExercise(exercise.id)}
              className={`w-full text-left rounded-lg border p-4 transition-all hover:shadow-sm hover:scale-[1.005] ${
                isCompleted
                  ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10'
                  : 'border-border bg-background hover:border-foreground/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{exercise.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{exercise.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
                      {exercise.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">~{exercise.estimatedMinutes} min</span>
                    {isCompleted && result && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {result.score}/{result.maxScore}
                      </span>
                    )}
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Exercise Renderer ────────────────────────────────────────────────────────

function renderExercise(exercise: ForgeExercise, onComplete: () => void) {
  switch (exercise.discipline) {
    case 'socratic-defense':
      return <SocraticDefense exercise={exercise} onComplete={onComplete} />;
    case 'prompt-autopsies':
      return <PromptAutopsy exercise={exercise} onComplete={onComplete} />;
    case 'epistemic-gym':
      return <EpistemicGym exercise={exercise} onComplete={onComplete} />;
    case 'trust-calibration':
      return <TrustCalibrationLab exercise={exercise} onComplete={onComplete} />;
  }
}
