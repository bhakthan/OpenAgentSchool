import React, { useState, useEffect } from 'react';

const Pill: React.FC<{label:string; tone?:'raw'|'clean'|'split'|'risk'|'pref'|'reward'|'final'; small?:boolean}> = ({label, tone='raw', small}) => {
  const color: Record<string,string> = {
    raw: 'bg-card text-card-foreground border-border/70 dark:border-border/50',
    clean: 'bg-card text-card-foreground border-sky-400/60 dark:border-sky-300/60 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]',
    split: 'bg-card text-card-foreground border-cyan-400/60 dark:border-cyan-300/60 shadow-[0_0_0_1px_rgba(34,211,238,0.12)]',
    risk: 'bg-card text-card-foreground border-rose-400/60 dark:border-rose-300/60 shadow-[0_0_0_1px_rgba(244,63,94,0.12)]',
    pref: 'bg-card text-card-foreground border-amber-400/60 dark:border-amber-300/60 shadow-[0_0_0_1px_rgba(251,191,36,0.16)]',
    reward: 'bg-card text-card-foreground border-emerald-400/60 dark:border-emerald-300/60 shadow-[0_0_0_1px_rgba(16,185,129,0.14)]',
    final: 'bg-card text-card-foreground border-primary/60 shadow-[0_8px_16px_-12px_rgba(16,163,127,0.35)]'
  };
  return <div className={`px-3 py-2 rounded-md border text-[11px] md:text-sm font-medium tracking-tight shadow-sm transition-colors ${color[tone]} ${small?'opacity-90':''}`}>{label}</div>;
};

// Arrow components (kept lightweight to differentiate possible future styling per mode)
const SimpleArrow: React.FC<{id:string; animate:boolean}> = ({id, animate}) => (
  <div className="hidden lg:flex items-center" aria-hidden="true">
    <svg width="60" height="46" viewBox="0 0 60 46">
      <defs><marker id={`arrow-${id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker></defs>
      <line className={animate? 'ft-anim-arrow':''} x1="8" y1="23" x2="52" y2="23" stroke="currentColor" strokeWidth="3" markerEnd={`url(#arrow-${id})`} />
    </svg>
  </div>
);

const TechArrow: React.FC<{id:string; animate:boolean}> = ({id, animate}) => (
  <div className="hidden lg:flex items-center" aria-hidden="true">
    <svg width="70" height="50" viewBox="0 0 70 50">
      <defs><marker id={`tarrow-${id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker></defs>
      <line className={animate? 'ft-anim-arrow':''} x1="10" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="3" markerEnd={`url(#tarrow-${id})`} />
    </svg>
  </div>
);

export const DataStrategyVisual: React.FC = () => {
  const [mode,setMode] = useState<'simple'|'technical'>('simple');
  const [animate,setAnimate] = useState(false);
  const [step,setStep] = useState(0);

  // total steps differ by mode (simple collapses preference + reward into one 'feedback' column and merges cleaning steps)
  const totalSteps = mode === 'simple' ? 5 : 6; // simple indexes: 0 raw,1 clean,2 splits,3 feedback,4 final; technical adds separate preference & reward before final
  useEffect(()=>{
    if(step >= totalSteps) setStep(0); // clamp when switching modes
  },[mode,totalSteps,step]);
  useEffect(()=>{ if(!animate) return; const id=setInterval(()=>setStep(s=> (s+1)%totalSteps ),1400); return ()=>clearInterval(id); },[animate,totalSteps]);
  const hl = (idx:number) => step===idx? 'ring-2 ring-primary shadow-md':'opacity-95';
  return (
  <div className="w-full border rounded-lg p-4 md:p-6 bg-gradient-to-br from-background to-muted/40 space-y-4 overflow-hidden" aria-label="Data strategy visual">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h5 className="text-sm md:text-base font-semibold tracking-tight">Fine-Tuning Data Strategy – {mode==='simple'? 'Clean → Split → Use':'Technical View'}</h5>
        <div className="flex items-center gap-2 text-[11px] md:text-xs">
          <div className="flex rounded-md overflow-hidden border">
            <button onClick={()=>setMode('simple')} className={`px-2 py-1 ${mode==='simple'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Simple</button>
            <button onClick={()=>setMode('technical')} className={`px-2 py-1 ${mode==='technical'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Technical</button>
          </div>
          <button onClick={()=>setAnimate(a=>!a)} className="px-2 py-1 border rounded-md hover:bg-muted/50">{animate? 'Stop':'Animate'}</button>
        </div>
      </div>
      <div className="overflow-x-auto pb-1">
        {mode==='simple' ? (
          <div className="flex min-w-max flex-col lg:flex-row gap-6 lg:gap-10 items-stretch pr-2">
            {/* Step 0: Raw */}
            <div className={`flex flex-col gap-2 transition ${hl(0)}`} aria-label="Raw sources (simple)">
              <Pill label="Raw Human" tone="raw" />
              <Pill label="Synthetic" tone="raw" />
              <Pill label="Filtered Web" tone="raw" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Collect diverse</div>
            </div>
            <SimpleArrow id="s-a1" animate={animate} />
            {/* Step 1: Clean (collapsed) */}
            <div className={`flex flex-col gap-2 transition ${hl(1)}`} aria-label="Cleaning (simple)">
              <Pill label="Clean" tone="clean" />
              <Pill label="De-dup" tone="clean" />
              <Pill label="PII Strip" tone="clean" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Quality + safety</div>
            </div>
            <SimpleArrow id="s-a2" animate={animate} />
            {/* Step 2: Splits (collapsed) */}
            <div className={`flex flex-col gap-2 transition ${hl(2)}`} aria-label="Splits (simple)">
              <Pill label="Train" tone="split" />
              <Pill label="Val" tone="split" />
              <Pill label="Test" tone="split" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">No leakage</div>
            </div>
            <SimpleArrow id="s-a3" animate={animate} />
            {/* Step 3: Feedback (merged pref + reward) */}
            <div className={`flex flex-col gap-2 transition ${hl(3)}`} aria-label="Feedback sets (simple)">
              <Pill label="Pref Pairs" tone="pref" />
              <Pill label="Scores" tone="reward" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">DPO + RFT inputs</div>
            </div>
            <SimpleArrow id="s-a4" animate={animate} />
            {/* Step 4: Model */}
            <div className={`flex flex-col gap-2 transition ${hl(4)}`} aria-label="Result model (simple)">
              <Pill label="Aligned" tone="final" />
              <Pill label="Preferred" tone="final" />
              <Pill label="Reasoning" tone="final" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Eval gates pass</div>
            </div>
          </div>
        ) : (
          <div className="flex min-w-max flex-col lg:flex-row gap-6 lg:gap-10 items-stretch pr-2">
            {/* Technical detailed columns */}
            <div className={`flex flex-col gap-2 transition ${hl(0)}`} aria-label="Raw sources">
              <Pill label="Raw Human" tone="raw" />
              <Pill label="Raw Synthetic" tone="raw" />
              <Pill label="Raw Web" tone="raw" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Mixed sources</div>
            </div>
            <TechArrow id="t-a1" animate={animate} />
            <div className={`flex flex-col gap-2 transition ${hl(1)}`} aria-label="Cleaning">
              <Pill label="PII Filter" tone="clean" />
              <Pill label="Deduplicate" tone="clean" />
              <Pill label="Quality Check" tone="clean" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Remove risky & repeat data</div>
            </div>
            <TechArrow id="t-a2" animate={animate} />
            <div className={`flex flex-col gap-2 transition ${hl(2)}`} aria-label="Splits">
              <Pill label="Train" tone="split" />
              <Pill label="Val" tone="split" />
              <Pill label="Red-Team" tone="risk" />
              <Pill label="Regression" tone="split" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Strict separation</div>
            </div>
            <TechArrow id="t-a3" animate={animate} />
            <div className={`flex flex-col gap-2 transition ${hl(3)}`} aria-label="Preference pairs">
              <Pill label="Chosen vs Rejected" tone="pref" />
              <Pill label="Edge Cases" tone="pref" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Used for DPO</div>
            </div>
            <TechArrow id="t-a4" animate={animate} />
            <div className={`flex flex-col gap-2 transition ${hl(4)}`} aria-label="Reward inputs">
              <Pill label="Reward Signals" tone="reward" />
              <Pill label="Programmatic Rules" tone="reward" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Used for RFT</div>
            </div>
            <TechArrow id="t-a5" animate={animate} />
            <div className={`flex flex-col gap-2 transition ${hl(5)}`} aria-label="Resulting model benefits">
              <Pill label="Consistent Style" tone="final" />
              <Pill label="Preferred Answers" tone="final" />
              <Pill label="Better Reasoning" tone="final" />
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">All splits monitored</div>
            </div>
          </div>
        )}
      </div>
      {mode==='simple' ? (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Collect diverse data → clean & de-dup → make basic splits → add feedback sets → fine-tuned model. Toggle Technical for deeper governance detail.</p>
      ) : (
        <div className="text-[11px] md:text-sm leading-relaxed text-muted-foreground space-y-2">
          <p><strong className="font-semibold">Technical:</strong> Deterministic pipeline: ingest → filter (PII, toxicity, near-dup) → stratified partition (train/val/red-team/regression) → construct preference pairs → derive composite reward signals. Hash lineage + version every artifact.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Red-team & regression slices immutable</li>
            <li>Preference diversity {'>'} raw count</li>
            <li>Reward drift alerts (moving mean ± σ)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataStrategyVisual;
