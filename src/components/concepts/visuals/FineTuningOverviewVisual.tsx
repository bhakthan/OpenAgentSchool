import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Target, Lightning } from '@phosphor-icons/react';

interface BoxProps { label: string; variant?: 'input' | 'output' | 'bad' | 'good' | 'ref' | 'cot'; }

const variantStyles: Record<NonNullable<BoxProps['variant']>, string> = {
  input: 'border-emerald-400/60 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]',
  output: 'border-border/70 dark:border-border/50 shadow-[0_0_0_1px_rgba(148,163,184,0.12)]',
  bad: 'border-destructive/60 text-destructive dark:text-destructive-foreground shadow-[0_6px_16px_-12px_rgba(248,113,113,0.35)]',
  good: 'border-emerald-400/60 shadow-[0_6px_16px_-12px_rgba(16,185,129,0.35)]',
  ref: 'border-sky-400/60 dark:border-sky-300/60 shadow-[0_0_0_1px_rgba(56,189,248,0.12)]',
  cot: 'border-amber-400/60 dark:border-amber-300/60 shadow-[0_0_0_1px_rgba(251,191,36,0.14)]'
};

const Box: React.FC<BoxProps & { active?: boolean }> = ({ label, variant='output', active }) => (
  <div className={`text-[11px] md:text-sm px-3 py-2 rounded-md border font-medium tracking-tight shadow-sm bg-card text-card-foreground transition ${variantStyles[variant]} ${active ? 'ring-2 ring-primary scale-[1.02]' : ''}`}>{label}</div>
);

const Column: React.FC<{children: React.ReactNode; gap?: string; stretch?: boolean}> = ({children, gap='gap-3', stretch=false}) => (
  <div className={`flex flex-col ${gap} ${stretch ? 'flex-1' : ''}`}>{children}</div>
);

function SFTDiagram({ highlight=false }: { highlight?: boolean }) {
  return (
  <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full h-full gap-10 lg:gap-20 justify-center flex-wrap py-6 min-h-[280px]">
      <div className="flex gap-8">
        <Column>
          <Box label="Input" variant="input" active={highlight} />
          <Box label="Input" variant="input" active={highlight} />
          <Box label="Input" variant="input" active={highlight} />
        </Column>
        <Column>
          <Box label="Output" active={highlight} />
          <Box label="Output" active={highlight} />
          <Box label="Output" active={highlight} />
        </Column>
      </div>
      <div className="text-sm md:text-base text-muted-foreground flex flex-col items-center lg:justify-center">
        <span className="font-medium">Learns a mapping</span>
  <svg width="200" height="70" viewBox="0 0 200 70" className="mt-2 max-w-full h-auto">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
          </defs>
          <rect x="10" y="20" width="60" height="30" rx="6" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="130" y="20" width="60" height="30" rx="6" fill="var(--muted)" fillOpacity="0.2" stroke="var(--border)" strokeOpacity="0.7" strokeWidth="1.5" />
          <line x1="70" y1="35" x2="130" y2="35" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow)" />
        </svg>
      </div>
    </div>
  );
}

function DPODiagram({ highlight=false }: { highlight?: boolean }) {
  return (
  <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full h-full gap-10 lg:gap-20 justify-center flex-wrap py-6 min-h-[300px]">
      <div className="flex gap-8">
        <Column>
          <Box label="Input" variant="input" />
          <Box label="Input" variant="input" />
          <Box label="Input" variant="input" />
        </Column>
        <Column>
          <Box label="Bad" variant="bad" active={highlight} />
          <Box label="Bad" variant="bad" active={highlight} />
          <Box label="Bad" variant="bad" active={highlight} />
        </Column>
        <Column>
          <Box label="Good" variant="good" active={highlight} />
          <Box label="Good" variant="good" active={highlight} />
          <Box label="Good" variant="good" active={highlight} />
        </Column>
      </div>
      <div className="text-sm md:text-base text-muted-foreground flex flex-col items-center lg:justify-center">
        <span className="font-medium">Learns a delta</span>
  <svg width="220" height="90" viewBox="0 0 220 90" className="mt-2 max-w-full h-auto">
          <defs>
            <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
          </defs>
          <rect x="10" y="35" width="60" height="30" rx="6" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="120" y="10" width="60" height="30" rx="6" fill="var(--destructive)" fillOpacity="0.14" stroke="var(--destructive)" strokeOpacity="0.7" strokeWidth="1.5" />
            <rect x="120" y="60" width="60" height="30" rx="6" fill="var(--muted)" fillOpacity="0.2" stroke="var(--border)" strokeOpacity="0.7" strokeWidth="1.5" />
          <path d="M70 50L120 24" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow2)" />
          <path d="M70 50L120 74" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow2)" />
          <path d="M150 44L150 56" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

function RFTDiagram({ highlight=false }: { highlight?: boolean }) {
  return (
  <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full h-full gap-10 lg:gap-20 justify-center flex-wrap py-6 min-h-[300px]">
      <div className="flex gap-8">
        <Column>
          <Box label="Input" variant="input" active={highlight} />
          <Box label="Input" variant="input" active={highlight} />
          <Box label="Input" variant="input" active={highlight} />
        </Column>
        <Column>
          <Box label="Reference" variant="ref" active={highlight} />
          <Box label="Reference" variant="ref" active={highlight} />
          <Box label="Reference" variant="ref" active={highlight} />
        </Column>
      </div>
      <div className="text-sm md:text-base text-muted-foreground flex flex-col items-center lg:justify-center">
        <span className="font-medium">Learns to reason</span>
  {/* Width increased + viewBox extended to prevent right-edge clipping (previous rect exceeded svg width) */}
  <svg width="250" height="90" viewBox="0 0 250 90" className="mt-2 max-w-full h-auto">
          <defs>
            <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
          </defs>
          <rect x="10" y="30" width="60" height="30" rx="6" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="95" y="30" width="60" height="30" rx="10" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="180" y="30" width="60" height="30" rx="6" fill="var(--muted)" fillOpacity="0.2" stroke="var(--border)" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="125" y="48" fontSize="14" fontWeight="600" textAnchor="middle" style={{ fill: 'var(--foreground)' }}>CoT</text>
          <line x1="70" y1="45" x2="95" y2="45" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow3)" />
          <line x1="155" y1="45" x2="180" y2="45" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow3)" />
        </svg>
      </div>
    </div>
  );
}

export const FineTuningOverviewVisual: React.FC = () => {
  const order: ('sft'|'dpo'|'rft')[] = ['sft','dpo','rft'];
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<'sft'|'dpo'|'rft'>('sft');
  const advance = () => setPhase(p => order[(order.indexOf(p)+1)%order.length]);
  const back = () => setPhase(p => order[(order.indexOf(p)-1+order.length)%order.length]);
  useEffect(() => {
    if (!running) return;
    let idx = 0;
    const id = setInterval(() => { idx = (idx+1)%order.length; setPhase(order[idx]); }, 1700);
    return () => clearInterval(id);
  }, [running]);
  return (
  <div className="border rounded-lg p-6 md:p-10 lg:p-12 bg-gradient-to-br from-background to-muted/40 w-full relative min-h-[600px] overflow-visible">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-semibold text-base md:text-lg flex items-center gap-2 text-card-foreground"><Brain className="w-5 h-5"/> Fine-Tuning Techniques</h4>
        <div className="flex items-center gap-3">
          <span className="text-[10px] md:text-xs text-muted-foreground hidden sm:inline">Interactive overview</span>
          <div className="flex items-center gap-2">
            <button onClick={back} className="text-xs px-2 py-1 rounded-md border bg-card hover:bg-muted/70 transition disabled:opacity-50" disabled={running} title="Previous stage">◀</button>
            <button onClick={advance} className="text-xs px-2 py-1 rounded-md border bg-card hover:bg-muted/70 transition disabled:opacity-50" disabled={running} title="Next stage">▶</button>
          </div>
          <button onClick={() => setRunning(r => !r)} className="text-xs px-3 py-1 rounded-md border bg-card hover:bg-muted/70 transition" title="Toggle automatic cycling">{running ? 'Pause' : 'Auto Cycle'}</button>
        </div>
      </div>
      <Tabs value={phase} onValueChange={(v) => { setPhase(v as any); setRunning(false); }} className="w-full h-full flex flex-col">
        <TabsList className="grid grid-cols-3 h-auto mb-6 bg-card border rounded-md overflow-hidden">
          <TabsTrigger value="sft" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"> <Brain className="w-4 h-4"/> SFT</TabsTrigger>
          <TabsTrigger value="dpo" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive"> <Target className="w-4 h-4"/> DPO</TabsTrigger>
          <TabsTrigger value="rft" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-amber-500/15 dark:data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-300"> <Lightning className="w-4 h-4"/> RFT</TabsTrigger>
        </TabsList>
        <div className="flex-1 relative">
      <TabsContent value="sft" className="space-y-6 h-full m-0 p-0 data-[state=active]:flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-x-auto">
        {/* Always highlight active phase even in manual step mode */}
        <SFTDiagram highlight={phase==='sft'} />
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Supervised Fine-Tuning imitates high-quality responses: learn a direct mapping from input to desired output using curated pairs. Solidifies formatting & core behavioural style.</p>
          </TabsContent>
          <TabsContent value="dpo" className="space-y-6 h-full m-0 p-0 data-[state=active]:flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-x-auto">
        <DPODiagram highlight={phase==='dpo'} />
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Direct Preference Optimization contrasts good vs bad outputs for the same prompt and adjusts probabilities to increase preference win-rate without a separate reward model.</p>
          </TabsContent>
          <TabsContent value="rft" className="space-y-6 h-full m-0 p-0 data-[state=active]:flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-x-auto">
        <RFTDiagram highlight={phase==='rft'} />
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Reinforcement Fine-Tuning introduces a reward signal (model or programmatic) possibly encouraging intermediate reasoning (e.g. CoT) before producing the final answer.</p>
          </TabsContent>
        </div>
      </Tabs>
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 dark:ring-white/5"/>
      {/* Remove overlay to allow immediate manual stepping; keep auto cycle toggle */}
    </div>
  );
};
