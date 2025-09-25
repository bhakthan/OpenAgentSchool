// Misconception Refutation Blocks scaffold (#15)
export interface MisconceptionRefutation { patternId: string; misconception: string; whyFails: string; correctModel: string; }
export const misconceptionRefutations: MisconceptionRefutation[] = [
  {
    patternId: 'policy-gated-tool-invocation',
    misconception: 'Adding more policy checks always increases safety.',
    whyFails: 'Over-blocking can degrade capability, encourage unsafe workarounds, and create alert fatigue.',
    correctModel: 'Calibrate checks to risk surfaces; measure false positive/negative ratio and adapt gating thresholds.'
  }
];
