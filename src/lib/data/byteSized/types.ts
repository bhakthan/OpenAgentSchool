// ─── Byte-Sized Learning Data Types ──────────────────────────────────────────
// Each concept gets 5 ultra-short cards: Definition → Logic → Mini-Pattern →
// Learning Loop → Real-World Example.  Cards share XP with the micro-learning
// progress store but live in their own data module.

/** The five card types each concept is decomposed into. */
export type ByteCardType =
  | 'definition'
  | 'logic'
  | 'mini-pattern'
  | 'learning-loop'
  | 'real-world';

export type ByteDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/** A single byte-sized learning card — ≤280 chars of content. */
export interface ByteCard {
  /** Unique ID: `{conceptId}--{cardType}` */
  id: string;
  /** Parent concept ID from ConceptsHub (kebab-case) */
  conceptId: string;
  /** Short learner-facing title */
  title: string;
  /** Which of the 5 card variants this is */
  cardType: ByteCardType;
  /** 1–5 display order within the concept */
  order: number;
  /** The actual learning content (≤280 chars) */
  content: string;
  /** Optional bold callout / key takeaway */
  highlight?: string;
  /** Visual anchor emoji */
  emoji: string;
  /** Related agent pattern ID (mainly for mini-pattern cards) */
  relatedPatternId?: string;
  /** Cross-links to other concept IDs */
  relatedConceptIds?: string[];
  /** Difficulty tier */
  difficulty: ByteDifficulty;
  /** Searchable tags */
  tags: string[];
  /** XP awarded on completion (default 2) */
  xpValue: number;
}

/** A browsable category grouping concepts for the landing page. */
export interface ByteCategory {
  id: string;
  title: string;
  description: string;
  /** Phosphor icon name */
  icon: string;
  /** Tailwind gradient classes */
  gradient: string;
  /** Ordered concept IDs in this category */
  conceptIds: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** XP per byte-sized card — lighter than capsule XP (5–15). */
export const BYTE_XP = 2;

/** Card type display metadata. */
export const CARD_TYPE_META: Record<ByteCardType, { label: string; color: string; emoji: string }> = {
  definition:     { label: 'Definition',      color: 'blue',   emoji: '📖' },
  logic:          { label: 'Agentic Logic',   color: 'purple', emoji: '🧠' },
  'mini-pattern': { label: 'Mini Pattern',    color: 'amber',  emoji: '🔧' },
  'learning-loop':{ label: 'Learning Loop',   color: 'green',  emoji: '🔄' },
  'real-world':   { label: 'Real-World',      color: 'teal',   emoji: '🌍' },
};
