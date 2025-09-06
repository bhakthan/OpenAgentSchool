import React, { useState, useEffect } from 'react';

// Simple box component reused across visuals
const Box: React.FC<{label: string; tone?: 'input'|'model'|'data'|'output'|'improved'|'hint'; small?: boolean}> = ({label, tone='data', small}) => {
  const color: Record<string,string> = {
    input: 'bg-green-50 dark:bg-green-900/30 border-green-400/60 text-green-900 dark:text-green-100',
    model: 'bg-sky-50 dark:bg-sky-900/30 border-sky-400/60 text-sky-900 dark:text-sky-100',
    data: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-400/60 text-indigo-900 dark:text-indigo-100',
    output: 'bg-gray-50 dark:bg-gray-800 border-gray-400/60 text-gray-900 dark:text-gray-100',
    improved: 'bg-amber-50 dark:bg-amber-900/40 border-amber-400/70 text-amber-900 dark:text-amber-100',
    hint: 'bg-muted/40 border-muted-foreground/20 text-muted-foreground'
  };
  return (
    <div className={`px-3 py-2 rounded-md border text-[11px] md:text-sm font-medium shadow-sm tracking-tight ${color[tone]} ${small?'opacity-90':''}`}>{label}</div>
  );
};

/**
 * SFTProcessVisual
 * Goal: Explain supervised fine-tuning in plain language for a high‑school learner.
 * Story: We collect example Q & ideal A pairs. The model reads many pairs and learns to pattern‑match.
 */
export const SFTProcessVisual: React.FC = () => {
  const [mode, setMode] = useState<'simple'|'technical'>('simple');
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(0); // 0:data,1:model,2:outputs

  useEffect(() => {
    if (!animate) return; 
    const id = setInterval(() => setStep(s => (s+1)%3), 1600);
    return () => clearInterval(id);
  }, [animate]);

  const highlight = (idx:number) => step===idx ? 'ring-2 ring-primary shadow-md' : 'opacity-95';

  return (
    <div className="w-full border rounded-lg p-4 md:p-6 bg-gradient-to-br from-background to-muted/40 space-y-4" aria-label="Supervised Fine-Tuning simple explanation">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h5 className="text-sm md:text-base font-semibold tracking-tight flex items-center gap-2">Supervised Fine-Tuning (SFT) – {mode==='simple'? 'Show & Imitate':'Technical View'}</h5>
        <div className="flex items-center gap-2 text-[11px] md:text-xs">
          <div className="flex rounded-md overflow-hidden border">
            <button onClick={()=>setMode('simple')} className={`px-2 py-1 ${mode==='simple'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Simple</button>
            <button onClick={()=>setMode('technical')} className={`px-2 py-1 ${mode==='technical'?'bg-primary text-primary-foreground':'bg-background hover:bg-muted/60'}`}>Technical</button>
          </div>
          <button onClick={()=>setAnimate(a=>!a)} className="px-2 py-1 border rounded-md hover:bg-muted/50">{animate? 'Stop':'Animate'}</button>
        </div>
      </div>
      {/* Steps */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
        {/* Left: data pairs */}
        <div className={`flex flex-col gap-2 flex-shrink-0 transition ${highlight(0)}`} aria-label="Example pairs">
          <Box label="Prompt → Ideal Answer" tone="data" />
          <Box label="Prompt → Ideal Answer" tone="data" />
          <Box label="Prompt → Ideal Answer" tone="data" />
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Many clean examples</div>
        </div>
        {/* Arrow */}
        <div className="hidden lg:flex items-center" aria-hidden="true">
          <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible">
            <defs>
              <marker id="arrow-sft" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
            </defs>
            <line className={animate? 'ft-anim-arrow':''} x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-sft)" />
          </svg>
        </div>
        {/* Middle: model reading */}
        <div className={`flex flex-col items-center gap-3 flex-shrink-0 transition ${highlight(1)}`} aria-label="Model learns pattern">
          <Box label="Model" tone="model" />
          <div className="text-[11px] md:text-sm text-muted-foreground text-center max-w-[150px] leading-snug">Reads many pairs and adjusts inside weights to mimic answers.</div>
          <div className="flex gap-2">
            <Box small label="format" tone="hint" />
            <Box small label="tone" tone="hint" />
            <Box small label="structure" tone="hint" />
          </div>
        </div>
        {/* Arrow */}
        <div className="hidden lg:flex items-center" aria-hidden="true">
          <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible">
            <defs>
              <marker id="arrow-sft2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="currentColor"/></marker>
            </defs>
            <line className={animate? 'ft-anim-arrow':''} x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-sft2)" />
          </svg>
        </div>
        {/* Right: improved outputs */}
        <div className={`flex flex-col gap-2 transition ${highlight(2)}`} aria-label="Better outputs after training">
          <Box label="Prompt → Clear Answer" tone="improved" />
          <Box label="Prompt → Clear Answer" tone="improved" />
          <Box label="Prompt → Clear Answer" tone="improved" />
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">More consistent & formatted</div>
        </div>
      </div>
      {/* Plain sentence summary */}
      {mode==='simple' ? (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">We simply show the model lots of good examples. It begins to answer in the same clear style.</p>
      ) : (
        <div className="text-[11px] md:text-sm leading-relaxed text-muted-foreground space-y-2">
          <p><strong className="font-semibold">Technical:</strong> Minimize cross-entropy over curated instruction pairs; early stop on validation loss flattening.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Curriculum ordering (broad → specific)</li>
            <li>Length normalization keeps style stable</li>
            <li>Overfit signs: validation loss up while train ↓</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SFTProcessVisual;
