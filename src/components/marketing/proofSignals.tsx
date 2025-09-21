import React, { ReactNode } from 'react';
import { ShieldCheck, Target, ChartLineUp } from '@phosphor-icons/react';

export interface ProofSignal {
  metric: string;
  desc: string;
  icon?: ReactNode;
}

// Primary (long form) proof signals used on /cta
export const PROOF_SIGNALS: ProofSignal[] = [
  {
    metric: '14 Days',
    desc: 'to eliminate core architecture ambiguity for a platform team (shared capability map + evaluation harness scaffolds)',
    icon: <Target size={22} className="text-primary" />
  },
  {
    metric: '28% Lift',
    desc: 'in iteration velocity after introducing structured failure drills & gating evaluation criteria',
    icon: <ChartLineUp size={22} className="text-primary" />
  },
  {
    metric: 'Sev1-Free',
    desc: 'stabilization window after embedding failure drills & guardrail instrumentation—focus shifted to optimization over firefighting',
    icon: <ShieldCheck size={22} className="text-primary" />
  }
];

// Compact metrics (mini badges) for variant hero metrics grid
export const PROOF_SIGNALS_COMPACT: { k: string; v: string }[] = [
  { k: '14d', v: 'Architecture Clarity Baseline' },
  { k: '28%', v: 'Velocity Lift Realized' },
  { k: 'Sev1-Free', v: 'Stabilization Window (post-drills)' },
  { k: '6w', v: 'Exec Confidence Horizon' }
];

