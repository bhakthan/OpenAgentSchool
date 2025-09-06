import React, { useState, useEffect } from 'react';

const Box: React.FC<{label: string; tone?: 'input'|'cot'|'output'|'reward'|'model'|'better'|'hint'; small?: boolean}> = ({label, tone='output', small}) => {
  const color: Record<string,string> = {
    input: 'bg-green-50 dark:bg-green-900/30 border-green-400/60 text-green-900 dark:text-green-100',
    cot: 'bg-amber-50 dark:bg-amber-900/40 border-amber-400/60 text-amber-900 dark:text-amber-100',
    output: 'bg-gray-50 dark:bg-gray-800 border-gray-400/60 text-gray-900 dark:text-gray-100',
    reward: 'bg-yellow-50 dark:bg-yellow-900/40 border-yellow-400/60 text-yellow-900 dark:text-yellow-100',
    model: 'bg-sky-50 dark:bg-sky-900/30 border-sky-400/60 text-sky-900 dark:text-sky-100',
    better: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400/60 text-emerald-900 dark:text-emerald-100',
    hint: 'bg-muted/40 border-muted-foreground/20 text-muted-foreground'
  };
  return <div className={`px-3 py-2 rounded-md border text-[11px] md:text-sm font-medium shadow-sm tracking-tight ${color[tone]} ${small?'opacity-90':''}`}>{label}</div>;
};

/**
 * RFTProcessVisual
 * Goal: Show loop of trying, scoring, improving with simple reinforcement idea.
 * Story: Model tries answers, a grader gives a small score, model tweaks itself to get higher scores.
 */
export const RFTProcessVisual: React.FC = () => {
  const [mode, setMode] = useState<'simple'|'technical'>('simple');
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(0); // 0:prompts 1:attempts 2:scores 3:update 4:better
  useEffect(()=>{ if(!animate) return; const id=setInterval(()=>setStep(s=>(s+1)%5),1500); return ()=>clearInterval(id); },[animate]);
  const highlight=(idx:number)=> step===idx? 'ring-2 ring-primary shadow-md':'opacity-95';
  return (
    <div className="w-full border rounded-lg p-4 md:p-6 bg-gradient-to-br from-background to-muted/40 space-y-4" aria-label="Reinforcement Fine-Tuning simple explanation">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h5 className="text-sm md:text-base font-semibold tracking-tight flex items-center gap-2">Reinforcement Fine-Tuning (RFT) – {mode==='simple'? 'Try, Score, Improve':'Technical View'}</h5>
        <div className="flex items-center gap-2 text-[11px] md:text-xs">
          <div className="flex rounded-md overflow-hidden border">
            <button onClick={()=>setMode('simple')} className={`px-2 py-1 ${mode==='simple'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Simple</button>
            <button onClick={()=>setMode('technical')} className={`px-2 py-1 ${mode==='technical'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Technical</button>
          </div>
          <button onClick={()=>setAnimate(a=>!a)} className="px-2 py-1 border rounded-md hover:bg-muted/50">{animate? 'Stop':'Animate'}</button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* Loop row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
          {/* Inputs */}
          <div className={`flex flex-col gap-2 transition ${highlight(0)}`} aria-label="Prompts tried">
            <Box label="Prompt" tone="input" />
            <Box label="Prompt" tone="input" />
            <Box label="Prompt" tone="input" />
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Sample tasks</div>
          </div>
          {/* Model attempts */}
          <div className={`flex flex-col gap-2 transition ${highlight(1)}`} aria-label="Model generates reasoning">
            <Box label="Model → CoT → Answer" tone="cot" />
            <Box label="Model → CoT → Answer" tone="cot" />
            <Box label="Model → CoT → Answer" tone="cot" />
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Tries reasoning steps</div>
          </div>
          {/* Scores */}
          <div className={`flex flex-col gap-2 transition ${highlight(2)}`} aria-label="Scores from grader">
            <Box label="Score 0.12" tone="reward" />
            <Box label="Score 0.72" tone="reward" />
            <Box label="Score 0.44" tone="reward" />
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Small feedback numbers</div>
          </div>
          {/* Arrow */}
          <div className="hidden lg:flex items-center" aria-hidden="true">
            <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible">
              <defs>
                <marker id="arrow-rft" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
              </defs>
              <line className={animate? 'ft-anim-arrow':''} x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-rft)" />
            </svg>
          </div>
          {/* Improvement */}
          <div className={`flex flex-col items-center gap-3 flex-shrink-0 transition ${highlight(3)}`} aria-label="Model updates">
            <Box label="Model" tone="model" />
            <div className="flex gap-2">
              <Box small label="reward ↑" tone="better" />
              <Box small label="reasoning ↑" tone="better" />
            </div>
            <div className="text-[11px] md:text-sm text-muted-foreground text-center max-w-[150px] leading-snug">Adjusts itself to get higher scores next round.</div>
          </div>
        </div>
        {/* Final better answers */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          <div className={`flex flex-col gap-2 transition ${highlight(4)}`} aria-label="Improved answers">
            <Box label="Prompt → Better Answer" tone="better" />
            <Box label="Prompt → Better Answer" tone="better" />
            <Box label="Prompt → Better Answer" tone="better" />
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Higher quality overall</div>
          </div>
          <div className="flex flex-col gap-2" aria-label="Why better">
            <Box label="Clear steps" tone="cot" />
            <Box label="Less guessing" tone="cot" />
            <Box label="More reliable" tone="cot" />
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Reasoning improved</div>
          </div>
        </div>
      </div>
      {mode==='simple' ? (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">The model tries answers, gets small scores, and adjusts itself to do a little better next time.</p>
      ) : (
        <div className="text-[11px] md:text-sm leading-relaxed text-muted-foreground space-y-2">
          <p><strong className="font-semibold">Technical:</strong> Policy gradient style updates (e.g. PPO variant) with reward = task score − KL penalty.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Adaptive KL keeps policy near base</li>
            <li>Reward shaping clarifies signal</li>
            <li>Rollback on benchmark regression</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RFTProcessVisual;
