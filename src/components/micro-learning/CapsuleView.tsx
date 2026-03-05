import React, { useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trackEvent } from '@/lib/analytics/ga';
import {
  getCapsuleById,
  completeCapsule,
  isCapsuleCompleted,
  CAPSULES_BY_TRACK,
} from '@/lib/data/microLearning';
import type { CapsuleType } from '@/lib/data/microLearning';
import { saveMicroLearningReturnSession } from '@/lib/hooks/useMicroLearningReturn';
import { ConceptSphere } from './ConceptSphere';
import { useTranslatedText } from '@/lib/hooks/useTranslatedText';
import type { LanguageCode } from '@/lib/languages';

interface CapsuleViewProps {
  capsuleId: string;
  trackId: string;
  onComplete: (xpEarned: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  contentLanguage?: LanguageCode;
}

const TYPE_CONFIG: Record<CapsuleType, { icon: string; label: string; color: string; action: string }> = {
  read: { icon: '📖', label: 'Core Idea', color: 'from-blue-500 to-cyan-500', action: 'Read & Understand' },
  visualize: { icon: '👁️', label: 'See It Work', color: 'from-emerald-500 to-teal-500', action: 'Explore the Visualization' },
  'quiz-checkpoint': { icon: '✅', label: 'Quick Check', color: 'from-amber-500 to-orange-500', action: 'Test Your Knowledge' },
  apply: { icon: '🧠', label: 'Think Deeper', color: 'from-violet-500 to-purple-500', action: 'Practice in Study Mode' },
  'pattern-connect': { icon: '🔗', label: 'Pattern Connect', color: 'from-rose-500 to-pink-500', action: 'Explore the Pattern' },
};

export const CapsuleView: React.FC<CapsuleViewProps> = ({
  capsuleId,
  trackId,
  onComplete,
  onNext,
  onPrevious,
  onBack,
  hasNext,
  hasPrevious,
  contentLanguage = 'en',
}) => {
  const capsule = getCapsuleById(capsuleId);
  const [completed, setCompleted] = useState(() => isCapsuleCompleted(capsuleId));
  const [showSphere, setShowSphere] = useState(false);

  /** Build an outbound link path with micro-learning return context params. */
  const withReturnContext = useCallback(
    (basePath: string) => {
      const separator = basePath.includes('?') ? '&' : '?';
      return `${basePath}${separator}from=micro&track=${encodeURIComponent(trackId)}&capsule=${encodeURIComponent(capsuleId)}`;
    },
    [trackId, capsuleId],
  );

  /** Save return session to sessionStorage before navigating away. */
  const saveReturnSession = useCallback(() => {
    if (!capsule) return;
    saveMicroLearningReturnSession({
      trackId,
      capsuleId,
      capsuleType: capsule.type,
      capsuleTitle: capsule.title,
      timestamp: Date.now(),
    });
  }, [trackId, capsuleId, capsule]);

  const handleMarkComplete = useCallback(() => {
    if (completed) return;
    const progress = completeCapsule(capsuleId, capsule!.type);
    const lastCompletion = progress.completions[progress.completions.length - 1];
    setCompleted(true);
    onComplete(lastCompletion?.xpEarned ?? 0);

    trackEvent({ action: 'micro_capsule_complete', category: 'micro_learning', label: `${trackId}/${capsuleId}`, value: lastCompletion?.xpEarned ?? 0 });

    // Analytics
    try {
      window.dispatchEvent(
        new CustomEvent('analytics:microLearning:capsuleComplete', {
          detail: { capsuleId, trackId, type: capsule!.type },
        }),
      );
    } catch {}
  }, [capsuleId, trackId, capsule, completed, onComplete]);

  if (!capsule) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Capsule not found.</p>
        <Button variant="ghost" onClick={onBack} className="mt-4">← Back to track</Button>
      </div>
    );
  }

  const config = TYPE_CONFIG[capsule.type];

  // Build the English description for this capsule type, then translate
  const conceptName = capsule.conceptId.replace(/-/g, ' ');
  const englishDescription = useMemo(() => {
    switch (capsule.type) {
      case 'read':
        return `Dive into the core mental model behind ${conceptName}. Read the concept page, absorb the key takeaways, then mark this capsule complete.`;
      case 'visualize':
        return `Explore the interactive visualization for ${conceptName}.${capsule.patternId ? ' See how this concept maps to a real agent pattern.' : ''}`;
      case 'quiz-checkpoint':
        return `Test your understanding of ${conceptName} with a quick quiz. 3–5 targeted questions with instant feedback.`;
      case 'apply':
        return `Go deeper with guided Socratic questioning on ${conceptName}. Reflect, explain, and connect ideas to build lasting understanding.`;
      case 'pattern-connect':
        return `See how ${conceptName} connects to a real-world agent pattern. Explore the pattern's flow diagram, use cases, and implementation notes.`;
      default:
        return '';
    }
  }, [capsule.type, conceptName, capsule.patternId]);

  const { translated: translatedDescription, isTranslating } = useTranslatedText(englishDescription, contentLanguage);
  const { translated: translatedTitle } = useTranslatedText(capsule.title, contentLanguage);
  const { translated: translatedSubtitle } = useTranslatedText(capsule.subtitle, contentLanguage);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ─── Capsule Header ─────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>← Track</Button>
        <span className="text-xs text-muted-foreground">Capsule {capsule.order}</span>
      </div>

      <div className="rounded-2xl border bg-card text-card-foreground overflow-hidden">
        {/* Type banner */}
        <div className={`bg-gradient-to-r ${config.color} px-6 py-4 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <Badge className="bg-white/20 text-white text-[10px] mb-1">{config.label}</Badge>
              <h2 className="text-lg font-bold">{translatedTitle}</h2>
            </div>
          </div>
          <p className="text-sm text-white/80 mt-1">{translatedSubtitle}</p>
        </div>

        {/* ─── Content Area ─────────────────────────────────────── */}
        <div className="p-6 space-y-6">
          {/* Translated description for capsule type */}
          <div className="space-y-4">
            <div className="rounded-xl bg-muted/50 p-6 border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isTranslating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-pulse">⏳</span> Translating…
                  </span>
                ) : translatedDescription}
              </p>
            </div>

            {/* Action links per type (not translated — they're navigation) */}
            {capsule.type === 'read' && (
              <Link
                to={withReturnContext(`/concepts/${capsule.conceptId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                📖 Open Concept Page →
              </Link>
            )}

            {capsule.type === 'visualize' && capsule.patternId && (
              <Link
                to={withReturnContext(`/patterns/${capsule.patternId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                👁️ View Pattern Diagram →
              </Link>
            )}
            {capsule.type === 'visualize' && !capsule.patternId && (
              <Link
                to={withReturnContext(`/concepts/${capsule.conceptId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                👁️ View Concept Diagram →
              </Link>
            )}

            {capsule.type === 'quiz-checkpoint' && (
              <Link
                to={withReturnContext(`/quiz/${capsule.quizCategoryId ?? capsule.conceptId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                ✅ Take the Quiz →
              </Link>
            )}

            {capsule.type === 'apply' && (
              <Link
                to={withReturnContext(`/study-mode?concept=${capsule.conceptId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                🧠 Enter Study Mode →
              </Link>
            )}

            {capsule.type === 'pattern-connect' && capsule.patternId && (
              <Link
                to={withReturnContext(`/patterns/${capsule.patternId}`)}
                onClick={saveReturnSession}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                🔗 Explore {capsule.patternId.replace(/-/g, ' ')} Pattern →
              </Link>
            )}
          </div>

          {/* Estimated time */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>⏱️ ~{capsule.estimatedMinutes} min</span>
          </div>

          {/* ─── Concept Sphere Toggle ────────────────────────── */}
          <div className="pt-2">
            <button
              onClick={() => {
                const next = !showSphere;
                trackEvent({ action: next ? 'concept_sphere_open' : 'concept_sphere_close', category: 'micro_learning', label: capsule.conceptId });
                setShowSphere(next);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-500/10 transition-colors"
            >
              🔮 {showSphere ? 'Close Sphere' : 'Explore Deeper'}
              <span className="text-[10px] text-muted-foreground">(AI-powered)</span>
            </button>
          </div>

          {/* ─── Concept Sphere Panel ─────────────────────────── */}
          {showSphere && (
            <ConceptSphere
              conceptId={capsule.conceptId}
              conceptTitle={capsule.conceptId.replace(/-/g, ' ')}
              onClose={() => setShowSphere(false)}
            />
          )}

          {/* ─── Byte-Sized Cross-Link ────────────────────────── */}
          <Link
            to={`/byte-sized/${capsule.conceptId}`}
            className="flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-2.5 text-sm font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-500/10 transition-colors"
          >
            ⚡ Want the 60-second version? <span className="text-xs text-muted-foreground">5 byte-sized cards</span>
          </Link>
        </div>

        {/* ─── Actions Footer ───────────────────────────────────── */}
        <div className="border-t px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            {hasPrevious && (
              <Button variant="ghost" size="sm" onClick={onPrevious}>← Previous</Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {completed ? (
              <>
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                  ✓ Completed
                </Badge>
                {hasNext && (
                  <Button onClick={onNext} size="sm">
                    Next Capsule →
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => { trackEvent({ action: 'micro_mark_complete_click', category: 'micro_learning', label: capsuleId }); handleMarkComplete(); }}
                className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white"
                size="sm"
              >
                ✓ Mark Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleView;
