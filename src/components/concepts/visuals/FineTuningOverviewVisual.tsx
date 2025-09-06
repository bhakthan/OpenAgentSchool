import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Target, Lightning } from '@phosphor-icons/react';

interface BoxProps { label: string; variant?: 'input' | 'output' | 'bad' | 'good' | 'ref' | 'cot'; }

// Adjusted light-mode backgrounds for better contrast; added subtle text color adjustments via utility classes
const colors: Record<string,string> = {
  input: 'bg-green-50 dark:bg-green-900/30 border-green-500/50 text-green-950 dark:text-green-100',
  output: 'bg-gray-50 dark:bg-gray-800 border-gray-400/50 text-gray-900 dark:text-gray-100',
  bad: 'bg-rose-50 dark:bg-rose-900/30 border-rose-500/60 text-rose-950 dark:text-rose-100',
  good: 'bg-slate-50 dark:bg-slate-800 border-slate-400/60 text-slate-900 dark:text-slate-100',
  ref: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500/60 text-yellow-950 dark:text-yellow-100',
  cot: 'bg-amber-50 dark:bg-amber-900/40 border-amber-500/60 text-amber-900 dark:text-amber-100'
};

const Box: React.FC<BoxProps & { active?: boolean }> = ({ label, variant='output', active }) => (
  <div className={`text-[11px] md:text-sm px-3 py-2 rounded-md border font-medium tracking-tight shadow-sm transition ${colors[variant]} ${active ? 'ring-2 ring-primary scale-[1.02]' : ''}`}>{label}</div>
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
          <rect x="10" y="20" width="60" height="30" rx="6" className="fill-green-200 dark:fill-green-900/30 stroke-green-600/70" strokeWidth="1.5" />
          <rect x="130" y="20" width="60" height="30" rx="6" className="fill-gray-200 dark:fill-gray-800 stroke-gray-500/60" strokeWidth="1.5" />
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
          <rect x="10" y="35" width="60" height="30" rx="6" className="fill-green-200 dark:fill-green-900/30 stroke-green-600/70" strokeWidth="1.5" />
          <rect x="120" y="10" width="60" height="30" rx="6" className="fill-rose-200 dark:fill-rose-900/30 stroke-rose-600/60" strokeWidth="1.5" />
            <rect x="120" y="60" width="60" height="30" rx="6" className="fill-slate-200 dark:fill-slate-800 stroke-slate-500/60" strokeWidth="1.5" />
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
          <rect x="10" y="30" width="60" height="30" rx="6" className="fill-green-200 dark:fill-green-900/30 stroke-green-600/70" strokeWidth="1.5" />
          <rect x="95" y="30" width="60" height="30" rx="10" className="fill-amber-200 dark:fill-amber-900/40 stroke-amber-600/60" strokeWidth="1.5" />
          <rect x="180" y="30" width="60" height="30" rx="6" className="fill-gray-200 dark:fill-gray-800 stroke-gray-500/60" strokeWidth="1.5" />
          <text x="125" y="48" fontSize="14" fontWeight="600" textAnchor="middle" className="fill-black dark:fill-white">CoT</text>
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
        <h4 className="font-semibold text-base md:text-lg flex items-center gap-2"><Brain className="w-5 h-5"/> Fine-Tuning Techniques</h4>
        <div className="flex items-center gap-3">
          <span className="text-[10px] md:text-xs text-muted-foreground hidden sm:inline">Interactive overview</span>
          <div className="flex items-center gap-2">
            <button onClick={back} className="text-xs px-2 py-1 rounded-md border bg-background/60 hover:bg-background transition" disabled={running} title="Previous stage">◀</button>
            <button onClick={advance} className="text-xs px-2 py-1 rounded-md border bg-background/60 hover:bg-background transition" disabled={running} title="Next stage">▶</button>
          </div>
          <button onClick={() => setRunning(r => !r)} className="text-xs px-3 py-1 rounded-md border bg-background/60 hover:bg-background transition" title="Toggle automatic cycling">{running ? 'Pause' : 'Auto Cycle'}</button>
        </div>
      </div>
      <Tabs value={phase} onValueChange={(v) => { setPhase(v as any); setRunning(false); }} className="w-full h-full flex flex-col">
        <TabsList className="grid grid-cols-3 h-auto mb-6 bg-transparent border rounded-md overflow-hidden">
          <TabsTrigger value="sft" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-green-500/10"> <Brain className="w-4 h-4"/> SFT</TabsTrigger>
          <TabsTrigger value="dpo" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-rose-500/10"> <Target className="w-4 h-4"/> DPO</TabsTrigger>
          <TabsTrigger value="rft" className="text-xs md:text-sm flex items-center gap-1 data-[state=active]:bg-amber-500/10"> <Lightning className="w-4 h-4"/> RFT</TabsTrigger>
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
