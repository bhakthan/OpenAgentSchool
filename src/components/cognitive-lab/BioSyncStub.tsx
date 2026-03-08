/**
 * Bio-Sync Stub — Biometric-Paced Learning (Phase 2)
 *
 * Displays a "Coming Soon" with heartbeat animation.
 * Webcam integration deferred to Phase 2.
 */

import type { BioSyncExercise } from '@/lib/data/cognitiveLab/types';

interface Props {
  exercise: BioSyncExercise;
  onComplete: () => void;
}

export default function BioSyncStub({ exercise, onComplete }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Heartbeat animation */}
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        <div className="absolute inset-4 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDelay: '0.3s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 256 256" fill="currentColor" className="text-emerald-500">
            <path d="M72 128c0-37.5 28.5-68 64-68s64 30.5 64 68M32 128h32l24-48 24 96 24-64 24 48 24-32h40" />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Bio-Sync</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Biometric-paced learning syncs content delivery to your cardiac rhythm.
          Information presented during specific phases of your heartbeat encodes more deeply.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/10 p-6 max-w-md text-center space-y-3">
        <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          🔬 Phase 2 — Coming Soon
        </div>
        <p className="text-xs text-muted-foreground">
          This paradigm requires webcam access for heart-rate detection via rPPG (remote photoplethysmography).
          Exercise: <strong>{exercise.title}</strong> — target {exercise.content.targetBPM} BPM.
        </p>
        <p className="text-xs text-muted-foreground italic">
          Until then, the other 6 paradigms are fully operational.
        </p>
      </div>

      <button
        onClick={onComplete}
        className="px-6 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
      >
        ← Back to Paradigm
      </button>
    </div>
  );
}
