// Narrative capsules per mastery tier (#9 Curriculum Narrative Thread)
export interface NarrativeCapsule { tier: 'fundamentals'|'architecture'|'implementation'|'governance'; message: string; }
export const narrativeCapsules: NarrativeCapsule[] = [
  { tier: 'fundamentals', message: 'Establish a trustworthy perceptual substrate and data hygiene baseline.' },
  { tier: 'architecture', message: 'Compose reliable pattern interlocks that reduce ambiguity propagation.' },
  { tier: 'implementation', message: 'Optimize feedback loops and adaptive memory for compounding leverage.' },
  { tier: 'governance', message: 'Shift from reactive gating to proactive, policy–intent co-design and continuous risk calibration.' }
];
