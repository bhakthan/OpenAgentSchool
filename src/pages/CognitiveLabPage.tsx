/**
 * Cognitive Lab — Brain-Native Learning Paradigms
 *
 * Main page with state machine: landing → paradigm → session.
 * "We don't teach you; we sync with your brain."
 */

import React, { useState, useCallback, lazy, Suspense } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import {
  COGNITIVE_PARADIGMS,
  PARADIGM_COLORS,
  getExercise,
} from '@/lib/data/cognitiveLab/paradigms';
import {
  getLabScore,
  getCompletedCount,
  getTotalCount,
  getParadigmCompletionPercent,
  getSessionResult,
} from '@/lib/data/cognitiveLab/progress';
import type {
  CognitiveParadigm,
  CognitiveParadigmId,
  CognitiveExercise,
  ParadigmColors,
} from '@/lib/data/cognitiveLab/types';
import CognitiveLabHero from '@/components/cognitive-lab/CognitiveLabHero';

const BurstGrafting = lazy(() => import('@/components/cognitive-lab/BurstGrafting'));
const VoidMapping = lazy(() => import('@/components/cognitive-lab/VoidMapping'));
const BioSyncStub = lazy(() => import('@/components/cognitive-lab/BioSyncStub'));
const GlitchResolution = lazy(() => import('@/components/cognitive-lab/GlitchResolution'));
const HemisphericWeaving = lazy(() => import('@/components/cognitive-lab/HemisphericWeaving'));
const GlyphCognition = lazy(() => import('@/components/cognitive-lab/GlyphCognition'));
const EphemeralSparks = lazy(() => import('@/components/cognitive-lab/EphemeralSparks'));

type View = 'landing' | 'paradigm' | 'session';

// ── Inline SVG icons for each paradigm ───────────────────────────────────────

const PARADIGM_ICONS: Record<CognitiveParadigmId, React.ReactNode> = {
  'burst-grafting': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M96 232a8 8 0 0 1-8-8V152H40a8 8 0 0 1-6.66-12.44l96-144a8 8 0 0 1 14.66 4.44v72h48a8 8 0 0 1 6.66 12.44l-96 144A8 8 0 0 1 96 232Z" />
    </svg>
  ),
  'void-mapping': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm0-144a56 56 0 1 0 56 56 56.06 56.06 0 0 0-56-56Zm0 96a40 40 0 1 1 40-40 40 40 0 0 1-40 40Z" />
    </svg>
  ),
  'bio-sync': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M72 128c0-37.5 28.5-68 64-68s64 30.5 64 68M32 128h32l24-48 24 96 24-64 24 48 24-32h40" />
    </svg>
  ),
  'glitch-resolution': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 192l40-56-40-56h40l40 56-40 56Zm72 0l40-56-40-56h40l40 56-40 56Z" />
    </svg>
  ),
  'hemispheric-weaving': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm0 16a87.3 87.3 0 0 1 24 3.3V128a8 8 0 0 1-8 8h-32a8 8 0 0 1-8-8V43.3A87.3 87.3 0 0 1 128 40Zm-88 88a87.7 87.7 0 0 1 72-86.3V128a24 24 0 0 0 24 24h32.6A88 88 0 0 1 40 128Z" />
    </svg>
  ),
  'glyph-cognition': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128 24L40 76v104l88 52 88-52V76l-88-52Zm0 32l56 32v64l-56 32-56-32V88l56-32Z" />
    </svg>
  ),
  'ephemeral-sparks': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128 16a112 112 0 1 0 112 112A112 112 0 0 0 128 16Zm0 208a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96Zm8-96V80a8 8 0 0 0-16 0v48a8 8 0 0 0 8 8h48a8 8 0 0 0 0-16Z" />
    </svg>
  ),
};

// IDs of paradigms that benefit from audio (headphones badge)
const AUDIO_PARADIGMS: ReadonlySet<CognitiveParadigmId> = new Set(['burst-grafting', 'hemispheric-weaving']);

// IDs of paradigms with rapid flashes (seizure warning badge)
const FLASH_PARADIGMS: ReadonlySet<CognitiveParadigmId> = new Set(['burst-grafting', 'void-mapping', 'glitch-resolution']);

export default function CognitiveLabPage() {
  const [view, setView] = useState<View>('landing');
  const [activeParadigmId, setActiveParadigmId] = useState<CognitiveParadigmId | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [, forceUpdate] = useState(0);

  const labScore = getLabScore();
  const completedCount = getCompletedCount();
  const totalCount = getTotalCount();

  const navigateToParadigm = useCallback((id: CognitiveParadigmId) => {
    setActiveParadigmId(id);
    setActiveExerciseId(null);
    setView('paradigm');
    trackEvent('cognitive_lab_paradigm_start', { paradigm: id });
  }, []);

  const navigateToSession = useCallback((paradigmId: CognitiveParadigmId, exerciseId: string) => {
    setActiveParadigmId(paradigmId);
    setActiveExerciseId(exerciseId);
    setView('session');
    trackEvent('cognitive_lab_session_start', { paradigm: paradigmId, exercise: exerciseId });
  }, []);

  const backToLanding = useCallback(() => {
    setView('landing');
    setActiveParadigmId(null);
    setActiveExerciseId(null);
    forceUpdate(n => n + 1);
  }, []);

  const backToParadigm = useCallback(() => {
    setView('paradigm');
    setActiveExerciseId(null);
    forceUpdate(n => n + 1);
  }, []);

  const activeParadigm = activeParadigmId
    ? COGNITIVE_PARADIGMS.find(p => p.id === activeParadigmId)
    : null;

  const activeExercise = activeParadigmId && activeExerciseId
    ? getExercise(activeParadigmId, activeExerciseId)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* ─── Landing View ─── */}
      {view === 'landing' && (
        <div className="space-y-8">
          <CognitiveLabHero />

          {/* Lab Score */}
          {completedCount > 0 && (
            <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/20 p-6 text-center">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400">{labScore}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Lab Score • {completedCount} / {totalCount} sessions completed
              </div>
              <div className="mt-3 mx-auto max-w-xs h-2 rounded-full bg-purple-200/50 dark:bg-purple-800/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Paradigm cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COGNITIVE_PARADIGMS.map(paradigm => {
              const colors = paradigm.colorScheme;
              const completion = getParadigmCompletionPercent(paradigm.id);

              return (
                <button
                  key={paradigm.id}
                  onClick={() => !paradigm.isComingSoon && navigateToParadigm(paradigm.id)}
                  disabled={paradigm.isComingSoon}
                  className={`text-left rounded-xl border-2 p-5 transition-all duration-200 ${
                    paradigm.isComingSoon
                      ? 'border-border opacity-60 cursor-not-allowed'
                      : `${colors.border} hover:shadow-md hover:scale-[1.01] cursor-pointer`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} shrink-0`}>
                      {PARADIGM_ICONS[paradigm.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-foreground text-sm">{paradigm.title}</h3>
                        {paradigm.isComingSoon && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Coming Soon</span>
                        )}
                      </div>
                      <p className={`text-xs font-semibold ${colors.text} mb-1`}>{paradigm.subtitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{paradigm.description}</p>

                      {/* Accessibility badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {AUDIO_PARADIGMS.has(paradigm.id) && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                            🎧 Headphones
                          </span>
                        )}
                        {FLASH_PARADIGMS.has(paradigm.id) && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                            ⚡ Flash
                          </span>
                        )}
                      </div>

                      {!paradigm.isComingSoon && (
                        <>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                style={{ width: `${completion}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{completion}%</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              {paradigm.exercises.length} sessions
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Science basis */}
          <div className="rounded-lg border border-border bg-muted/20 p-6 text-center">
            <blockquote className="text-sm italic text-muted-foreground max-w-lg mx-auto">
              "Traditional learning is linear. Your brain is not. These paradigms exploit how neurons
              actually encode — through multi-sensory bursts, contrast, dissonance, and scarcity."
            </blockquote>
          </div>
        </div>
      )}

      {/* ─── Paradigm View ─── */}
      {view === 'paradigm' && activeParadigm && (
        <ParadigmView
          paradigm={activeParadigm}
          colors={activeParadigm.colorScheme}
          icon={PARADIGM_ICONS[activeParadigm.id]}
          onBack={backToLanding}
          onSelectExercise={(exId) => navigateToSession(activeParadigm.id, exId)}
        />
      )}

      {/* ─── Session View ─── */}
      {view === 'session' && activeExercise && activeParadigm && (
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={backToLanding} className="hover:text-foreground transition-colors">Cognitive Lab</button>
            <span>/</span>
            <button onClick={backToParadigm} className="hover:text-foreground transition-colors">
              {activeParadigm.title}
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">{activeExercise.title}</span>
          </nav>

          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            {renderSession(activeExercise, backToParadigm)}
          </Suspense>
        </div>
      )}
    </div>
  );
}

// ── Paradigm Detail View ─────────────────────────────────────────────────────

function ParadigmView({
  paradigm,
  colors,
  icon,
  onBack,
  onSelectExercise,
}: {
  paradigm: CognitiveParadigm;
  colors: ParadigmColors;
  icon: React.ReactNode;
  onBack: () => void;
  onSelectExercise: (exerciseId: string) => void;
}) {
  const completion = getParadigmCompletionPercent(paradigm.id);

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-foreground transition-colors">Cognitive Lab</button>
        <span>/</span>
        <span className="text-foreground font-medium">{paradigm.title}</span>
      </nav>

      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{paradigm.title}</h2>
            <p className={`text-sm font-semibold ${colors.text}`}>{paradigm.subtitle}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">{paradigm.description}</p>
      </header>

      <blockquote className={`rounded-lg border ${colors.border} ${colors.bg} p-4 text-sm italic text-gray-700 dark:text-gray-300`}>
        <strong>Science basis:</strong> {paradigm.scienceBasis}
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{completion}%</span>
      </div>

      <div className="space-y-3">
        {paradigm.exercises.map((exercise, i) => {
          const result = getSessionResult(paradigm.id, exercise.id);
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
                    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      ~{exercise.estimatedSeconds}s
                    </span>
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

// ── Session Renderer ─────────────────────────────────────────────────────────

function renderSession(exercise: CognitiveExercise, onComplete: () => void) {
  switch (exercise.paradigm) {
    case 'burst-grafting':
      return <BurstGrafting exercise={exercise} onComplete={onComplete} />;
    case 'void-mapping':
      return <VoidMapping exercise={exercise} onComplete={onComplete} />;
    case 'bio-sync':
      return <BioSyncStub exercise={exercise} onComplete={onComplete} />;
    case 'glitch-resolution':
      return <GlitchResolution exercise={exercise} onComplete={onComplete} />;
    case 'hemispheric-weaving':
      return <HemisphericWeaving exercise={exercise} onComplete={onComplete} />;
    case 'glyph-cognition':
      return <GlyphCognition exercise={exercise} onComplete={onComplete} />;
    case 'ephemeral-sparks':
      return <EphemeralSparks exercise={exercise} onComplete={onComplete} />;
  }
}
