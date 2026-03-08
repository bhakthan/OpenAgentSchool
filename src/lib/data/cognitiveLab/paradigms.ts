/**
 * Cognitive Lab — Paradigm definitions
 * 7 brain-native learning paradigms with color schemes and exercise references.
 */

import type { CognitiveParadigm, ParadigmColors } from './types';
import {
  BURST_GRAFTING_EXERCISES,
  VOID_MAPPING_EXERCISES,
  BIO_SYNC_EXERCISES,
  GLITCH_RESOLUTION_EXERCISES,
  HEMISPHERIC_WEAVING_EXERCISES,
  GLYPH_COGNITION_EXERCISES,
  EPHEMERAL_SPARKS_EXERCISES,
} from './exercises';

// ── Color schemes ────────────────────────────────────────────────────────────

export const PARADIGM_COLORS: Record<string, ParadigmColors> = {
  'burst-grafting': {
    border: 'border-rose-300/90 dark:border-rose-700',
    bg: 'bg-rose-50/85 dark:bg-rose-950/20',
    text: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-100 dark:bg-rose-900/40',
    gradient: 'from-rose-500 to-pink-500',
  },
  'void-mapping': {
    border: 'border-indigo-300/90 dark:border-indigo-700',
    bg: 'bg-indigo-50/85 dark:bg-indigo-950/20',
    text: 'text-indigo-700 dark:text-indigo-300',
    badge: 'bg-indigo-100 dark:bg-indigo-900/40',
    gradient: 'from-indigo-500 to-violet-500',
  },
  'bio-sync': {
    border: 'border-emerald-300/90 dark:border-emerald-700',
    bg: 'bg-emerald-50/85 dark:bg-emerald-950/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 dark:bg-emerald-900/40',
    gradient: 'from-emerald-500 to-teal-500',
  },
  'glitch-resolution': {
    border: 'border-amber-300/90 dark:border-amber-700',
    bg: 'bg-amber-50/85 dark:bg-amber-950/20',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-100 dark:bg-amber-900/40',
    gradient: 'from-amber-500 to-orange-500',
  },
  'hemispheric-weaving': {
    border: 'border-cyan-300/90 dark:border-cyan-700',
    bg: 'bg-cyan-50/85 dark:bg-cyan-950/20',
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'bg-cyan-100 dark:bg-cyan-900/40',
    gradient: 'from-cyan-500 to-blue-500',
  },
  'glyph-cognition': {
    border: 'border-purple-300/90 dark:border-purple-700',
    bg: 'bg-purple-50/85 dark:bg-purple-950/20',
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-100 dark:bg-purple-900/40',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  'ephemeral-sparks': {
    border: 'border-red-300/90 dark:border-red-700',
    bg: 'bg-red-50/85 dark:bg-red-950/20',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 dark:bg-red-900/40',
    gradient: 'from-red-500 to-rose-600',
  },
};

// ── Paradigm definitions ─────────────────────────────────────────────────────

export const COGNITIVE_PARADIGMS: CognitiveParadigm[] = [
  {
    id: 'burst-grafting',
    title: 'Burst Grafting',
    subtitle: '400ms Multi-Sensory Encoding',
    description: 'Flash a geometric shape, play a harmonic chord, and show a 2-word nano-definition simultaneously. Your brain encodes across visual, auditory, and linguistic channels in one burst.',
    scienceBasis: 'Multi-sensory integration theory: simultaneous cross-modal stimuli create stronger memory traces than any single channel.',
    colorScheme: PARADIGM_COLORS['burst-grafting'],
    exercises: BURST_GRAFTING_EXERCISES,
  },
  {
    id: 'void-mapping',
    title: 'Void Mapping',
    subtitle: 'Negative-Space Definitions',
    description: 'Five rapid "anti-flashes" of what a concept is NOT, then silence. From the void, you construct the definition. Understanding sharpened by absence.',
    scienceBasis: 'Contrast-based learning: defining boundaries of a concept by exclusion activates deeper semantic processing than direct definition.',
    colorScheme: PARADIGM_COLORS['void-mapping'],
    exercises: VOID_MAPPING_EXERCISES,
  },
  {
    id: 'bio-sync',
    title: 'Bio-Sync',
    subtitle: 'Biometric-Paced Learning',
    description: 'Information delivered at your heartbeat rhythm. Content pulses sync with your cardiac cycle for optimal encoding during physiological receptivity windows.',
    scienceBasis: 'Cardiac-gated cognition: memory encoding is enhanced when stimuli are presented at specific phases of the cardiac cycle.',
    colorScheme: PARADIGM_COLORS['bio-sync'],
    exercises: BIO_SYNC_EXERCISES,
    isComingSoon: true,
  },
  {
    id: 'glitch-resolution',
    title: 'Glitch Resolution',
    subtitle: 'Cognitive Dissonance Engine',
    description: 'Two contradictory statements that both seem true. Your brain glitches. Then you resolve the paradox — and the resolution cements the nuanced understanding.',
    scienceBasis: 'Cognitive dissonance theory: the discomfort of holding contradictory beliefs drives active resolution, creating stronger and more nuanced mental models.',
    colorScheme: PARADIGM_COLORS['glitch-resolution'],
    exercises: GLITCH_RESOLUTION_EXERCISES,
  },
  {
    id: 'hemispheric-weaving',
    title: 'Hemispheric Weaving',
    subtitle: 'Stereo-Split Dual Processing',
    description: 'Left ear receives a poetic metaphor. Right ear receives the technical definition. Your brain weaves them together into a unified, multi-layered understanding.',
    scienceBasis: 'Dual-coding theory: pairing verbal-analytical and visual-spatial encoding creates redundant memory traces. Dichotic listening enhances engagement.',
    colorScheme: PARADIGM_COLORS['hemispheric-weaving'],
    exercises: HEMISPHERIC_WEAVING_EXERCISES,
  },
  {
    id: 'glyph-cognition',
    title: 'Glyph Cognition',
    subtitle: 'Symbol-to-Concept Compression',
    description: 'A unique abstract glyph appears. You hear its seed syllable. The symbol becomes a compressed index for the full concept — instant recall from a single visual cue.',
    scienceBasis: 'Symbolic compression: associating abstract symbols with concepts creates rapid-access memory indices. Used in mnemonic systems for millennia.',
    colorScheme: PARADIGM_COLORS['glyph-cognition'],
    exercises: GLYPH_COGNITION_EXERCISES,
  },
  {
    id: 'ephemeral-sparks',
    title: 'Ephemeral Sparks',
    subtitle: 'One-Shot Scarcity Learning',
    description: 'Knowledge appears for 4 seconds, then is destroyed forever. No replay. No second chance. The scarcity forces your brain into maximum-attention encoding mode.',
    scienceBasis: 'Scarcity effect + testing effect: perceived rarity increases attention and encoding depth. Immediate recall after brief exposure strengthens memory consolidation.',
    colorScheme: PARADIGM_COLORS['ephemeral-sparks'],
    exercises: EPHEMERAL_SPARKS_EXERCISES,
  },
];

export function getParadigm(id: string): CognitiveParadigm | undefined {
  return COGNITIVE_PARADIGMS.find(p => p.id === id);
}

export function getExercise(paradigmId: string, exerciseId: string) {
  const paradigm = getParadigm(paradigmId);
  return paradigm?.exercises.find(e => e.id === exerciseId);
}
