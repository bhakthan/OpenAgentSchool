/**
 * Hemispheric Weaving — Stereo-Split Dual Processing
 *
 * Left ear: poetic metaphor. Right ear: technical definition.
 * Brain weaves them into unified multi-layered understanding.
 * Uses Web Audio API for stereo panning.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { HemisphericWeavingExercise } from '@/lib/data/cognitiveLab/types';
import { completeSession } from '@/lib/data/cognitiveLab/progress';

interface Props {
  exercise: HemisphericWeavingExercise;
  onComplete: () => void;
}

type Phase = 'ready' | 'weaving' | 'synthesis-prompt' | 'result';

export default function HemisphericWeaving({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [activeChannel, setActiveChannel] = useState<'left' | 'right' | 'both'>('left');
  const [userSynthesis, setUserSynthesis] = useState('');
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [audioFailed, setAudioFailed] = useState(false);

  const playTone = useCallback((pan: number, freq: number) => {
    try {
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;

      // Safari autoplay policy: if suspended, try to resume
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => setAudioFailed(true));
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      panner.pan.value = pan;

      osc.connect(gain).connect(panner).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Web Audio not available — visual-only mode
      setAudioFailed(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const startWeaving = useCallback(() => {
    setPhase('weaving');
    setActiveChannel('left');
    playTone(-1, 220); // Left channel tone

    // After 3s, switch to right
    timerRef.current = setTimeout(() => {
      setActiveChannel('right');
      playTone(1, 330); // Right channel tone

      // After 3s more, show both
      timerRef.current = setTimeout(() => {
        setActiveChannel('both');
        playTone(0, 440); // Center tone

        // After 2s, prompt synthesis
        timerRef.current = setTimeout(() => {
          setPhase('synthesis-prompt');
        }, 2000);
      }, 3000);
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [playTone]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const submitSynthesis = useCallback(() => {
    const answer = userSynthesis.trim().toLowerCase();
    const synthesis = exercise.content.synthesis.toLowerCase();

    // Score based on thoughtfulness
    const synthWords = new Set(synthesis.split(/\s+/).filter(w => w.length > 4));
    const answerWords = new Set(answer.split(/\s+/).filter(w => w.length > 4));
    let overlap = 0;
    for (const w of answerWords) {
      if (synthWords.has(w)) overlap++;
    }
    const earned = answer.length < 10 ? 0 : Math.min(10, Math.round((overlap / Math.max(synthWords.size, 1)) * 10) + (answer.length > 20 ? 3 : 0));
    const finalScore = Math.min(10, earned);
    setScore(finalScore);
    completeSession(exercise.paradigm, exercise.id, finalScore, 10);
    setPhase('result');
  }, [exercise, userSynthesis]);

  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{exercise.title}</h2>
        <p className="text-sm feature-secondary max-w-md text-center text-pretty">{exercise.description}</p>
        <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-4 text-sm text-cyan-700 dark:text-cyan-300 max-w-md text-center">
          🎧 For best results, use headphones. Left = metaphor. Right = technical. Then you weave them together.
        </div>
        {audioFailed && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-xs text-amber-700 dark:text-amber-300 max-w-md text-center">
            🔇 Audio unavailable — running in visual-only mode. The stereo panning won't be active, but you can still read both channels.
          </div>
        )}
        <button
          onClick={startWeaving}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🎧 Begin Weaving
        </button>
      </div>
    );
  }

  if (phase === 'weaving') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-8">
        <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wide">
          {activeChannel === 'left' ? '◀ Left Hemisphere — Metaphor' :
           activeChannel === 'right' ? 'Right Hemisphere — Technical ▶' :
           '◀ Both Hemispheres — Weaving ▶'}
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Left channel */}
          <div className={`p-5 rounded-xl border-2 transition-all duration-500 ${
            activeChannel === 'left' || activeChannel === 'both'
              ? 'border-violet-400 dark:border-violet-600 bg-violet-50/50 dark:bg-violet-950/20 opacity-100 scale-100'
              : 'border-[color:var(--surface-panel-border)] bg-[color:var(--surface-panel)] opacity-45 scale-95'
          }`}>
            <div className="text-violet-600 dark:text-violet-400 font-bold text-xs mb-2">◀ LEFT — Metaphor</div>
            <p className="text-sm text-foreground italic leading-relaxed">{exercise.content.leftChannel}</p>
          </div>

          {/* Right channel */}
          <div className={`p-5 rounded-xl border-2 transition-all duration-500 ${
            activeChannel === 'right' || activeChannel === 'both'
              ? 'border-blue-400 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 opacity-100 scale-100'
              : 'border-[color:var(--surface-panel-border)] bg-[color:var(--surface-panel)] opacity-45 scale-95'
          }`}>
            <div className="text-blue-600 dark:text-blue-400 font-bold text-xs mb-2">RIGHT — Technical ▶</div>
            <p className="text-sm text-foreground leading-relaxed">{exercise.content.rightChannel}</p>
          </div>
        </div>

        {activeChannel === 'both' && (
          <div className="text-xs feature-secondary animate-pulse">Weaving hemispheres...</div>
        )}
      </div>
    );
  }

  if (phase === 'synthesis-prompt') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Synthesize</h3>
        <p className="text-sm feature-secondary max-w-md text-center text-pretty">
          You heard the metaphor and the technical definition. Now weave them into one unified understanding of <strong>{exercise.content.concept}</strong>.
        </p>
        <textarea
          value={userSynthesis}
          onChange={e => setUserSynthesis(e.target.value)}
          placeholder="Combine the metaphor and the technical definition..."
          rows={4}
          autoFocus
          className="feature-panel w-full max-w-lg px-4 py-3 rounded-lg border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        />
        <button
          onClick={submitSynthesis}
          disabled={userSynthesis.trim().length < 5}
          className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Weave Together
        </button>
      </div>
    );
  }

  // result
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className={`text-5xl font-bold ${score >= 7 ? 'text-emerald-500' : score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
        {score}/10
      </div>

      <div className="feature-panel rounded-lg p-6 max-w-lg space-y-4">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">Your Synthesis:</h4>
          <p className="text-xs feature-secondary">{userSynthesis}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">Model Synthesis:</h4>
          <p className="text-xs feature-secondary">{exercise.content.synthesis}</p>
        </div>
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
