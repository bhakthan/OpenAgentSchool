import React, { useState, useEffect } from 'react';

const Box: React.FC<{label: string; tone?: 'input'|'bad'|'good'|'arrow'|'model'|'better'; small?: boolean}> = ({label, tone='input', small}) => {
  const color: Record<string,string> = {
    input: 'bg-green-50 dark:bg-green-900/30 border-green-400/60 text-green-900 dark:text-green-100',
    bad: 'bg-rose-50 dark:bg-rose-900/30 border-rose-400/60 text-rose-900 dark:text-rose-100',
    good: 'bg-slate-50 dark:bg-slate-800 border-slate-400/60 text-slate-900 dark:text-slate-100',
    model: 'bg-sky-50 dark:bg-sky-900/30 border-sky-400/60 text-sky-900 dark:text-sky-100',
    better: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400/60 text-emerald-900 dark:text-emerald-100',
    arrow: 'bg-transparent border-transparent'
  };
  return <div className={`px-3 py-2 rounded-md border text-[11px] md:text-sm font-medium shadow-sm tracking-tight ${color[tone]} ${small?'opacity-90':''}`}>{label}</div>;
};

/**
 * DPOProcessVisual
 * Goal: Plain-language preference learning.
 * Story: For the same prompt we compare two answers. We tell the model which one we prefer. It shifts toward better styles.
 */
export const DPOProcessVisual: React.FC = () => {
  const [mode, setMode] = useState<'simple'|'technical'>('simple');
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(0); // 0:prompts 1:compare 2:model 3:improved
  useEffect(()=>{ if(!animate) return; const id=setInterval(()=>setStep(s=>(s+1)%4),1500); return ()=>clearInterval(id); },[animate]);
  const highlight=(idx:number)=> step===idx? 'ring-2 ring-primary shadow-md':'opacity-95';
  return (
    <div className="w-full border rounded-lg p-4 md:p-6 bg-gradient-to-br from-background to-muted/40 space-y-4" aria-label="Direct Preference Optimization simple explanation">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h5 className="text-sm md:text-base font-semibold tracking-tight flex items-center gap-2">Direct Preference Optimization (DPO) – {mode==='simple'? 'Pick the Better One':'Technical View'}</h5>
        <div className="flex items-center gap-2 text-[11px] md:text-xs">
          <div className="flex rounded-md overflow-hidden border">
            <button onClick={()=>setMode('simple')} className={`px-2 py-1 ${mode==='simple'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Simple</button>
            <button onClick={()=>setMode('technical')} className={`px-2 py-1 ${mode==='technical'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Technical</button>
          </div>
          <button onClick={()=>setAnimate(a=>!a)} className="px-2 py-1 border rounded-md hover:bg-muted/50">{animate? 'Stop':'Animate'}</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
        {/* Prompt column */}
        <div className={`flex flex-col gap-2 flex-shrink-0 transition ${highlight(0)}`} aria-label="Same prompt">
          <Box label="Prompt" />
          <Box label="Prompt" />
          <Box label="Prompt" />
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Same question repeated</div>
        </div>
        {/* Candidate answers */}
        <div className={`flex flex-col gap-2 transition ${highlight(1)}`} aria-label="Two answers compared">
          <div className="flex gap-3 items-center">
            <Box label="Answer A" tone="bad" />
            <span className="text-[10px] md:text-xs text-rose-500 font-medium">Less clear</span>
          </div>
          <div className="flex gap-3 items-center">
            <Box label="Answer B" tone="good" />
            <span className="text-[10px] md:text-xs text-emerald-600 font-medium">Preferred</span>
          </div>
          <div className="flex gap-3 items-center">
            <Box label="Answer A" tone="bad" />
            <span className="text-[10px] md:text-xs text-rose-500 font-medium">Too short</span>
          </div>
          <div className="flex gap-3 items-center">
            <Box label="Answer B" tone="good" />
            <span className="text-[10px] md:text-xs text-emerald-600 font-medium">Chosen</span>
          </div>
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">We mark the better one each time</div>
        </div>
        {/* Arrow to model */}
        <div className="hidden lg:flex items-center" aria-hidden="true">
          <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible">
            <defs>
              <marker id="arrow-dpo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
            </defs>
            <line className={animate? 'ft-anim-arrow':''} x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-dpo)" />
          </svg>
        </div>
        {/* Model adjusting */}
        <div className={`flex flex-col items-center gap-3 flex-shrink-0 transition ${highlight(2)}`} aria-label="Model shifts probability">
          <Box label="Model" tone="model" />
          <div className="text-[11px] md:text-sm text-muted-foreground text-center max-w-[150px] leading-snug">Learns: "Answers like B are better than A."</div>
          <div className="flex gap-2">
            <Box small label="clarity ↑" tone="better" />
            <Box small label="style ↑" tone="better" />
          </div>
        </div>
        {/* Arrow to improved answers */}
        <div className="hidden lg:flex items-center" aria-hidden="true">
          <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible">
            <defs>
              <marker id="arrow-dpo2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
            </defs>
            <line className={animate? 'ft-anim-arrow':''} x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-dpo2)" />
          </svg>
        </div>
        {/* Improved outputs */}
        <div className={`flex flex-col gap-2 transition ${highlight(3)}`} aria-label="Outputs after preference learning">
          <Box label="Prompt → Preferred Style" tone="better" />
          <Box label="Prompt → Preferred Style" tone="better" />
          <Box label="Prompt → Preferred Style" tone="better" />
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">More helpful answers appear more often</div>
        </div>
      </div>
      {mode==='simple' ? (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">We compare two answers for the same prompt and point to the better one. The model shifts toward what we like.</p>
      ) : (
        <div className="text-[11px] md:text-sm leading-relaxed text-muted-foreground space-y-2">
          <p><strong className="font-semibold">Technical:</strong> Optimize preference objective (log-sigmoid of relative log-prob difference) with β controlling sharpness; monitor KL to base.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Diverse negative mining beats random</li>
            <li>Early detect mode collapse via win-rate plateau</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DPOProcessVisual;
