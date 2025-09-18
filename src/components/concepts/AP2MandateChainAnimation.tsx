// Clean implementation after prior corruption: single component with export features and delegated-only highlighting.
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, ArrowCounterClockwise, DownloadSimple } from '@phosphor-icons/react';

interface Step { id: number; label: string; from: number; to: number; note?: string; accent?: 'intent' | 'cart' | 'payment'; }
interface Props { autoPlay?: boolean; intervalMs?: number; }

const LANES = ['User', 'Agent', 'Merchant Agent', 'Network'];
const ACCENTS: Record<string,string> = { intent:'#2563eb', cart:'#16a34a', payment:'#dc2626', diff:'#d97706' };
const FONT = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif';

const buildSteps = (mode:'human'|'delegated'):Step[] => mode==='human' ? [
  { id:1,label:'Express need',from:0,to:1,note:'User describes purchase goal' },
  { id:2,label:'Sign Intent VC',from:0,to:1,note:'Delegation constraints',accent:'intent' },
  { id:3,label:'Intent VC →',from:1,to:2,note:'Agent presents scoped mandate',accent:'intent' },
  { id:4,label:'Negotiation / Offers',from:2,to:1,note:'Merchant quotes & pricing' },
  { id:5,label:'Approve cart?',from:0,to:1,note:'Human review or policy' },
  { id:6,label:'Build Cart VC',from:1,to:2,note:'Immutable line items',accent:'cart' },
  { id:7,label:'Cart VC →',from:1,to:2,note:'Hash links Intent',accent:'cart' },
  { id:8,label:'Create Payment VC',from:1,to:3,note:'Presence + metadata',accent:'payment' },
  { id:9,label:'Payment VC →',from:1,to:3,note:'Submission to rails',accent:'payment' },
  { id:10,label:'Result / Status ←',from:3,to:1,note:'Clearing response' },
  { id:11,label:'Result ←',from:1,to:0,note:'User confirmation' }
] : [
  { id:1,label:'Express need',from:0,to:1,note:'User goal' },
  { id:2,label:'Sign Intent VC',from:0,to:1,note:'Richer constraints',accent:'intent' },
  { id:3,label:'Intent VC →',from:1,to:2,note:'Scope & bounds',accent:'intent' },
  { id:4,label:'Negotiation / Offers',from:2,to:1,note:'Autonomous explore' },
  { id:5,label:'Monitor constraints',from:1,to:1,note:'Triggers watch',accent:'cart' },
  { id:6,label:'Build Cart VC',from:1,to:2,note:'Auto snapshot',accent:'cart' },
  { id:7,label:'Cart VC →',from:1,to:2,note:'Hash links Intent',accent:'cart' },
  { id:8,label:'Create Payment VC',from:1,to:3,note:'Presence: NOT_PRESENT',accent:'payment' },
  { id:9,label:'Payment VC →',from:1,to:3,note:'Submission',accent:'payment' },
  { id:10,label:'Result / Status ←',from:3,to:1,note:'Network response' },
  { id:11,label:'Result ←',from:1,to:0,note:'Async notify' }
];

const useReduced = () => { const [r,setR]=useState(false); useEffect(()=>{ const mq=window.matchMedia('(prefers-reduced-motion: reduce)'); const h=()=>setR(mq.matches); h(); mq.addEventListener('change',h); return()=>mq.removeEventListener('change',h);},[]); return r; };
const useDark = () => { const [d,setD]=useState(false); useEffect(()=>{ const upd=()=>setD(document.documentElement.classList.contains('dark')||window.matchMedia('(prefers-color-scheme: dark)').matches); upd(); const o=new MutationObserver(upd); o.observe(document.documentElement,{attributes:true,attributeFilter:['class']}); const mq=window.matchMedia('(prefers-color-scheme: dark)'); const l=()=>upd(); mq.addEventListener('change',l); return()=>{o.disconnect(); mq.removeEventListener('change',l);};},[]); return d; };

export const AP2MandateChainAnimation:React.FC<Props>=({autoPlay=false,intervalMs=1800})=>{
  const [mode,setMode]=useState<'human'|'delegated'>('human');
  const [step,setStep]=useState(0);
  const [playing,setPlaying]=useState(autoPlay);
  const [exportTheme,setExportTheme]=useState<'light'|'dark'>('light');
  const reduced=useReduced();
  const dark=useDark();
  const svgRef=useRef<SVGSVGElement|null>(null);
  const containerRef=useRef<HTMLDivElement|null>(null);
  const steps=buildSteps(mode);
  const timerRef=useRef<number|undefined>();

  useEffect(()=>{ setStep(0); setPlaying(false); },[mode]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) clearTimeout(timerRef.current); return;} if(step>=steps.length) return; timerRef.current=window.setTimeout(()=>setStep(s=>Math.min(s+1,steps.length)),intervalMs); return()=>{ if(timerRef.current) clearTimeout(timerRef.current); }; },[playing,step,intervalMs,steps.length]);

  const reset=()=>{ setStep(0); setPlaying(false); };
  const next =()=>setStep(s=>Math.min(s+1,steps.length));
  const prev =()=>setStep(s=>Math.max(s-1,0));

  const cloneForExport=(theme:'light'|'dark')=>{ if(!svgRef.current) return null; const clone=svgRef.current.cloneNode(true) as SVGSVGElement; if(!clone.getAttribute('viewBox')){ const w=clone.getAttribute('width'); const h=clone.getAttribute('height'); if(w&&h) clone.setAttribute('viewBox',`0 0 ${w} ${h}`);} const pal=theme==='light'?{bg:'#ffffff',primary:'#0f172a',secondary:'#475569',panel:'#ffffff'}:{bg:'#0b1220',primary:'#f1f5f9',secondary:'#94a3b8',panel:'#1e293b'}; const walker=document.createTreeWalker(clone,NodeFilter.SHOW_ELEMENT); while(walker.nextNode()){ const el=walker.currentNode as HTMLElement; if(el.tagName==='text'){ const isLane = (el.textContent||'').toLowerCase() === el.textContent?.toLowerCase() && ['user','agent','merchant agent','network'].includes(el.textContent.trim()); const sec=el.textContent && /scope|hash|monitor|presence|network|confirmation|line items|snapshot|triggers|pricing/i.test(el.textContent); el.removeAttribute('class'); el.setAttribute('font-family',FONT); if(isLane){ el.setAttribute('font-size','18'); el.setAttribute('font-weight','700'); el.setAttribute('letter-spacing','.6px'); } else { el.setAttribute('font-size',sec?'10':'12'); el.setAttribute('font-weight',sec?'400':'500'); } el.setAttribute('fill',sec&&!isLane?pal.secondary:pal.primary); } else if(el.tagName==='rect' && el.getAttribute('rx')==='6'){ el.setAttribute('fill',pal.panel); el.setAttribute('opacity','1'); }} const bg=document.createElementNS('http://www.w3.org/2000/svg','rect'); bg.setAttribute('x','0'); bg.setAttribute('y','0'); bg.setAttribute('width',clone.getAttribute('width')||'100%'); bg.setAttribute('height',clone.getAttribute('height')||'100%'); bg.setAttribute('fill',pal.bg); clone.insertBefore(bg,clone.firstChild); return clone; };

  const exportSvg=()=>{ try{ const c=cloneForExport(exportTheme); if(!c) return; const ser=new XMLSerializer().serializeToString(c); const blob=new Blob([ser],{type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`ap2-sequence-${mode}-${exportTheme}.svg`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }catch(e){ console.error('SVG export failed',e); } };
  const exportPng=()=>{ try{ const c=cloneForExport(exportTheme); if(!c) return; const ser=new XMLSerializer().serializeToString(c); const blob=new Blob([ser],{type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(blob); const img=new Image(); const w=parseInt(c.getAttribute('width')||'1200',10); const h=parseInt(c.getAttribute('height')||'800',10); const scale=2; img.onload=()=>{ const canvas=document.createElement('canvas'); canvas.width=w*scale; canvas.height=h*scale; const ctx=canvas.getContext('2d'); if(ctx){ ctx.scale(scale,scale); ctx.drawImage(img,0,0); canvas.toBlob(b=>{ if(b){ const p=URL.createObjectURL(b); const a=document.createElement('a'); a.href=p; a.download=`ap2-sequence-${mode}-${exportTheme}.png`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(p);} URL.revokeObjectURL(url); },'image/png'); } }; img.onerror=()=>URL.revokeObjectURL(url); img.src=url; }catch(e){ console.error('PNG export failed',e); } };

  const laneW=180, laneGap=40, stepH=54, pad=16; const totalW=LANES.length*laneW+(LANES.length-1)*laneGap+pad*2; const totalH=steps.length*stepH+80;

  // Keyboard shortcuts: Space toggles play/pause, ArrowRight next, ArrowLeft previous
  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      const target = e.target as HTMLElement | null;
      if(target && (target.tagName==='INPUT'||target.tagName==='TEXTAREA'||target.isContentEditable)) return; // don't intercept typing
      if(!containerRef.current) return;
      // Optional: only respond if component is in viewport
      const rect=containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if(!inView) return;
      if(e.code==='Space'){ e.preventDefault(); setPlaying(p=>!p); }
      else if(e.key==='ArrowRight'){ e.preventDefault(); setStep(s=>Math.min(s+1,steps.length)); }
      else if(e.key==='ArrowLeft'){ e.preventDefault(); setStep(s=>Math.max(s-1,0)); }
    };
    window.addEventListener('keydown',handler);
    return()=>window.removeEventListener('keydown',handler);
  },[steps.length]);

  return (
    <div ref={containerRef} className="w-full border rounded-md bg-background/40 p-4 space-y-4" aria-keyshortcuts="Space ArrowLeft ArrowRight">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h4 className="font-semibold text-sm tracking-tight flex items-center gap-2">
          <span>AP2 Mandate Chain Sequence</span>
          <span className="text-xs text-muted-foreground">Intent → Cart → Payment</span>
        </h4>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs border rounded overflow-hidden" role="tablist" aria-label="Mode toggle">
            <button className={`px-2 py-1 ${mode==='human'?'bg-primary text-primary-foreground':'hover:bg-muted'}`} onClick={()=>setMode('human')} aria-pressed={mode==='human'}>Human-present</button>
            <button className={`px-2 py-1 ${mode==='delegated'?'bg-primary text-primary-foreground':'hover:bg-muted'}`} onClick={()=>setMode('delegated')} aria-pressed={mode==='delegated'}>Delegated</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted" onClick={()=>setPlaying(p=>!p)} aria-label={playing?'Pause animation':'Play animation'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button>
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted" onClick={prev} disabled={step===0} aria-label="Previous step"><SkipBack size={16}/></button>
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted" onClick={next} disabled={step>=steps.length} aria-label="Next step"><SkipForward size={16}/></button>
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted" onClick={reset} aria-label="Reset animation"><ArrowCounterClockwise size={16}/></button>
            <div className="flex items-center gap-1 text-[10px] border rounded overflow-hidden" aria-label="Export theme toggle">
              <button className={`px-2 py-1 ${exportTheme==='light'?'bg-primary text-primary-foreground':'hover:bg-muted'}`} onClick={()=>setExportTheme('light')} aria-pressed={exportTheme==='light'}>Light</button>
              <button className={`px-2 py-1 ${exportTheme==='dark'?'bg-primary text-primary-foreground':'hover:bg-muted'}`} onClick={()=>setExportTheme('dark')} aria-pressed={exportTheme==='dark'}>Dark</button>
            </div>
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted flex items-center gap-1" onClick={exportSvg} aria-label="Export SVG diagram"><DownloadSimple size={14}/> SVG</button>
            <button className="px-2 py-1 text-xs rounded border hover:bg-muted flex items-center gap-1" onClick={exportPng} aria-label="Export PNG diagram"><DownloadSimple size={14}/> PNG</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg role="img" aria-label="AP2 mandate credential sequence diagram" width={totalW} height={totalH} className="max-w-none" ref={svgRef}>
          {/* Lane banding */}
          {LANES.map((lane,i)=>{ const x0=pad+i*(laneW+laneGap); const bandColor = dark? (i%2? '#0f172a':'#132035') : (i%2? '#f8fafc':'#ffffff'); return <rect key={`band-${lane}`} x={x0-10} y={28} width={laneW+20} height={totalH-56} rx={8} fill={bandColor} opacity={dark?0.25:0.65} />; })}
          {LANES.map((lane,i)=>{ const x=pad+i*(laneW+laneGap)+laneW/2; return <g key={lane}>
            <text
              x={x}
              y={20}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={16}
              fontWeight={700}
              fill={dark?'#f8fafc':'#0f172a'}
              letterSpacing={'.55px'}
              style={{filter:'drop-shadow(0 1px 1px rgba(0,0,0,0.25))'}}
            >{lane.toUpperCase()}</text>
            <line x1={x} x2={x} y1={34} y2={totalH-20} stroke={dark?'#64748b':'#64748b'} strokeDasharray="4 4" strokeWidth={1}/>
          </g>; })}
          {steps.map((s,i)=>{ const visible=i<step; const active=step-1===i; const fromX=pad+s.from*(laneW+laneGap)+laneW/2; const toX=pad+s.to*(laneW+laneGap)+laneW/2; const y=64+i*stepH; const color=s.accent?ACCENTS[s.accent]:'#6366f1'; const len=Math.abs(toX-fromX)-16; const dir=toX>=fromX?1:-1; const start=fromX+8*dir; const end=toX-8*dir; const dash=`${len} ${len}`; const offset=active&&!reduced?len:0; const delegatedOnly=mode==='delegated' && s.label.toLowerCase().includes('monitor constraints'); return <g key={s.id} opacity={visible||active?1:0} style={{transition:'opacity 400ms ease'}}><line x1={start} y1={y} x2={end} y2={y} stroke={color} strokeWidth={2} strokeDasharray={reduced?undefined:dash} strokeDashoffset={offset} style={!reduced?{transition:'stroke-dashoffset 700ms ease'}:undefined}/><path d={`M ${end-6*dir} ${y-4} L ${end} ${y} L ${end-6*dir} ${y+4}`} fill="none" stroke={color} strokeWidth={2}/><rect x={Math.min(start,end)+2} y={y-18} rx={6} ry={6} width={Math.max(110,Math.abs(end-start)-24)} height={36} fill={dark?'#0f172a':'#ffffff'} stroke={delegatedOnly?ACCENTS.diff:color} strokeWidth={delegatedOnly?2:1.2} opacity={0.95}/><text x={(start+end)/2} y={y-2} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={500} letterSpacing={'.2px'} fill={dark?'#ffffff':'#0f172a'}>{s.label}</text>{s.note && <text x={(start+end)/2} y={y+11} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={400} fill={dark?'#cbd5e1':'#475569'}>{s.note}</text>}{delegatedOnly && <text x={(start+end)/2} y={y-24} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={500} fill={ACCENTS.diff}>Delegated-only</text>}</g>; })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-6 text-sm sm:text-[15px]" aria-label="Legend: credential colors and mode status">
        <div className="flex items-center gap-1 font-medium"><span className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{background:ACCENTS.intent}}/> <span className="opacity-90">Intent VC</span></div>
        <div className="flex items-center gap-1 font-medium"><span className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{background:ACCENTS.cart}}/> <span className="opacity-90">Cart VC</span></div>
        <div className="flex items-center gap-1 font-medium"><span className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{background:ACCENTS.payment}}/> <span className="opacity-90">Payment VC</span></div>
        {mode==='delegated' && <div className="flex items-center gap-1 font-medium"><span className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{background:ACCENTS.diff}}/> <span className="opacity-90">Delegated-only step</span></div>}
        <div className="text-muted-foreground font-medium">Mode: {mode==='human'?'Human-present':'Delegated'} • Step {Math.min(step,steps.length)} / {steps.length}</div>
      </div>
      <details className="mt-2 bg-muted/40 rounded p-2">
        <summary className="cursor-pointer text-xs font-medium">Show ASCII fallback</summary>
        <p className="mt-2 text-[10px] text-muted-foreground">Keyboard: Space play/pause • ← previous • → next</p>
        <pre className="text-[10px] leading-snug mt-2 overflow-x-auto">{`User            Agent                Merchant Agent        Network
 |  express need   |                      |                     |
 |---------------> |                      |                     |
 | sign Intent VC  |                      |                     |
 |---------------- VC ------------------->| negotiate/offers    |
 |                  |<-- data / offers -->|                     |
 | approve cart?    |                      |                     |
 |----------------->| build Cart VC       | validate/pricing    |
 |   sign Cart VC   |---- VC ------------->|                     |
 |                  | create Payment VC                        |
 |                  |--------- VC ----------------------------->|
 |<---- status -----|<----- result --------|<------- result -----|`}</pre>
      </details>
    </div>
  );
};

export default AP2MandateChainAnimation;
