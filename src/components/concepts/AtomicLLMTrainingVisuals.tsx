/**
 * AtomicLLMTrainingVisuals.tsx
 *
 * Interactive animated diagrams for the Atomic LLM Training concept page.
 * Adapted from Claude-generated educational artifact and converted to
 * Tailwind + Phosphor conventions matching the codebase.
 *
 * Each export is a self-contained visual embedded into a specific tab
 * of AtomicLLMTrainingConcept.tsx.
 */

import { useState, useEffect, useRef, type ReactNode } from 'react'

// ── Shared wrapper ──────────────────────────────────────────────────────

function DiagramBox({ title, children, className = '' }: {
  title: string; children: ReactNode; className?: string
}) {
  return (
    <div className={`mt-6 rounded-xl border border-amber-200/50 dark:border-amber-800/30
      bg-gradient-to-b from-amber-50/40 to-white dark:from-amber-950/15 dark:to-background
      p-5 space-y-4 shadow-sm ${className}`}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-600/70 dark:text-amber-400/50">
        {title}
      </div>
      {children}
    </div>
  )
}

/* ─── Global keyframes (injected once) ─── */
const flowKeyframes = `
@keyframes flowDash { to { stroke-dashoffset: -12; } }
@keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
@keyframes drawLine { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
.flow-arrow { animation: flowDash 0.8s linear infinite; }
`

// ══════════════════════════════════════════════════════════════════════════
// 1. Pipeline Flowchart — animated horizontal flow of the full GPT pipeline
// ══════════════════════════════════════════════════════════════════════════

const pipelineStages = [
  { icon: '📝', label: 'Raw Text', sub: '"emma"', bg: 'bg-sky-500', shadow: 'shadow-sky-500/30' },
  { icon: '🔤', label: 'Tokenize', sub: 'chars → IDs', bg: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
  { icon: '📐', label: 'Embed', sub: 'IDs → vectors', bg: 'bg-teal-500', shadow: 'shadow-teal-500/30' },
  { icon: '⚡', label: 'Attention', sub: 'tokens talk', bg: 'bg-violet-500', shadow: 'shadow-violet-500/30' },
  { icon: '🎯', label: 'Predict', sub: 'next char', bg: 'bg-rose-500', shadow: 'shadow-rose-500/30' },
  { icon: '🧠', label: 'Learn', sub: 'adjust weights', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/30' },
]

export function PipelineFlowchart() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible < pipelineStages.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 180)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <DiagramBox title="🎬 Complete Pipeline — How a GPT Processes Text">
      <style>{flowKeyframes}</style>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
        {pipelineStages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1">
            <div
              className={`${s.bg} ${s.shadow} text-white rounded-lg px-3 py-2.5 text-center
                min-w-[84px] shadow-lg transition-all duration-500 cursor-default select-none
                hover:scale-105 hover:-translate-y-0.5
                ${i < visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="text-xl leading-none mb-1">{s.icon}</div>
              <div className="text-[11px] font-extrabold tracking-wide">{s.label}</div>
              <div className="text-[9px] opacity-75 mt-0.5 font-medium">{s.sub}</div>
            </div>
            {i < pipelineStages.length - 1 && (
              <svg width="28" height="20" viewBox="0 0 28 20" className="shrink-0 hidden sm:block">
                <path d="M2 10 L20 10" stroke="currentColor" strokeWidth="2" fill="none"
                  strokeDasharray="4,4" className="text-muted-foreground/25 flow-arrow" />
                <polygon points="18,6 26,10 18,14" className="fill-muted-foreground/25" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full
          bg-emerald-50/60 dark:bg-emerald-900/15 border border-emerald-200/50 dark:border-emerald-800/30
          text-[11px] font-semibold text-emerald-700 dark:text-emerald-400"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
            <path d="M13 8 A5 5 0 1 1 8 3" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="7,1 10,3 7,5" fill="currentColor" />
          </svg>
          Repeat until loss converges — each loop improves the model
        </div>
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 2. Interactive Compute Graph — drag sliders to see gradients update live
// ══════════════════════════════════════════════════════════════════════════

export function InteractiveComputeGraph() {
  const [a, setA] = useState(3)
  const [b, setB] = useState(2)

  const c = a * b
  const d = c + 5
  const gradA = b  // ∂d/∂a = b
  const gradB = a  // ∂d/∂b = a

  return (
    <DiagramBox title="⚙️ Interactive Compute Graph — Drag Sliders to See Gradients">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Every number in microGPT is a <strong className="text-amber-600 dark:text-amber-400">Value</strong> that
        tracks how it was computed. Drag <span className="text-blue-600 dark:text-blue-400 font-semibold">a</span> and{' '}
        <span className="text-purple-600 dark:text-purple-400 font-semibold">b</span> to see how gradients update
        in real-time via the chain rule.
      </p>

      {/* Sliders */}
      <div className="flex gap-8 justify-center flex-wrap">
        <label className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">a = {a}</span>
          <input type="range" min={-5} max={5} step={1} value={a}
            onChange={e => setA(+e.target.value)}
            className="w-32 h-2 rounded-full accent-blue-500 cursor-pointer" />
        </label>
        <label className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">b = {b}</span>
          <input type="range" min={-5} max={5} step={1} value={b}
            onChange={e => setB(+e.target.value)}
            className="w-32 h-2 rounded-full accent-purple-500 cursor-pointer" />
        </label>
      </div>

      {/* SVG Graph */}
      <svg viewBox="0 0 520 220" className="w-full max-w-lg mx-auto" role="img"
        aria-label="Computational graph showing forward and backward pass"
      >
        {/* Forward edges */}
        <line x1="100" y1="60" x2="215" y2="95" className="stroke-muted-foreground/25" strokeWidth="2.5" />
        <line x1="100" y1="160" x2="215" y2="115" className="stroke-muted-foreground/25" strokeWidth="2.5" />
        <line x1="305" y1="105" x2="395" y2="105" className="stroke-muted-foreground/25" strokeWidth="2.5" />
        <line x1="225" y1="165" x2="395" y2="120" className="stroke-muted-foreground/25" strokeWidth="2" />

        {/* Backward gradient arrows (green dashed) */}
        <line x1="395" y1="90" x2="305" y2="90"
          className="stroke-emerald-500/60" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="295" y1="85" x2="110" y2="50"
          className="stroke-emerald-500/60" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="295" y1="120" x2="110" y2="152"
          className="stroke-emerald-500/60" strokeWidth="2" strokeDasharray="5,3" />

        {/* Node a */}
        <circle cx="70" cy="60" r="30" className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" />
        <text x="70" y="57" textAnchor="middle" fontSize="14" fontWeight="700"
          className="fill-blue-700 dark:fill-blue-300">a={a}</text>
        <text x="70" y="75" textAnchor="middle" fontSize="10" fontWeight="700"
          className="fill-emerald-600 dark:fill-emerald-400">grad={gradA}</text>

        {/* Node b */}
        <circle cx="70" cy="160" r="30" className="fill-purple-100 dark:fill-purple-900/30 stroke-purple-500 dark:stroke-purple-400" strokeWidth="2" />
        <text x="70" y="157" textAnchor="middle" fontSize="14" fontWeight="700"
          className="fill-purple-700 dark:fill-purple-300">b={b}</text>
        <text x="70" y="175" textAnchor="middle" fontSize="10" fontWeight="700"
          className="fill-emerald-600 dark:fill-emerald-400">grad={gradB}</text>

        {/* Node c = a×b */}
        <circle cx="260" cy="105" r="32" className="fill-amber-100 dark:fill-amber-900/30 stroke-amber-500 dark:stroke-amber-400" strokeWidth="2" />
        <text x="260" y="98" textAnchor="middle" fontSize="13" fontWeight="700"
          className="fill-amber-700 dark:fill-amber-300">c = {c}</text>
        <text x="260" y="116" textAnchor="middle" fontSize="12"
          className="fill-muted-foreground/60">a × b</text>
        <text x="260" y="80" textAnchor="middle" fontSize="10" fontWeight="700"
          className="fill-emerald-600 dark:fill-emerald-400">grad=1</text>

        {/* Node: constant 5 */}
        <circle cx="220" cy="165" r="18" className="fill-muted/40 stroke-muted-foreground/25" strokeWidth="1.5" />
        <text x="220" y="170" textAnchor="middle" fontSize="14" fontWeight="700"
          className="fill-muted-foreground/60">5</text>

        {/* Node d = c+5 */}
        <circle cx="430" cy="105" r="32" className="fill-emerald-100 dark:fill-emerald-900/30 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="2" />
        <text x="430" y="98" textAnchor="middle" fontSize="13" fontWeight="700"
          className="fill-emerald-700 dark:fill-emerald-300">d = {d}</text>
        <text x="430" y="116" textAnchor="middle" fontSize="12"
          className="fill-muted-foreground/60">c + 5</text>
        <text x="430" y="80" textAnchor="middle" fontSize="10" fontWeight="700"
          className="fill-emerald-600 dark:fill-emerald-400">grad=1</text>
      </svg>

      {/* Explanation bar */}
      <div className="text-sm text-center rounded-lg bg-muted/40 dark:bg-muted/15 p-3 text-muted-foreground">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Backward pass:</span>{' '}
        d = a×b + 5 → ∂d/∂a = b = <span className="font-bold text-blue-600 dark:text-blue-400">{gradA}</span>
        ,{' '} ∂d/∂b = a = <span className="font-bold text-purple-600 dark:text-purple-400">{gradB}</span>
        <br />
        <span className="text-xs opacity-70">Green dashed lines show gradients flowing backward through the graph</span>
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 3. Interactive Tokenizer — type a name, see character-level tokens
// ══════════════════════════════════════════════════════════════════════════

const CHAR_SET = ['<BOS>', ...('abcdefghijklmnopqrstuvwxyz'.split(''))]
const charToId: Record<string, number> = {}
CHAR_SET.forEach((ch, i) => { charToId[ch] = i })

export function InteractiveTokenizer() {
  const [text, setText] = useState('emma')

  const tokens = [
    { ch: '<BOS>', id: 0 },
    ...text.split('').map(ch => ({ ch, id: charToId[ch] ?? -1 })),
    { ch: '<BOS>', id: 0 },
  ]

  return (
    <DiagramBox title="🔤 Interactive Tokenizer — Type a Name to See Tokens">
      <p className="text-sm text-muted-foreground leading-relaxed">
        microGPT uses <strong className="text-amber-600 dark:text-amber-400">character-level tokenization</strong> — each
        letter gets a unique number. A special <code className="text-xs bg-amber-100 dark:bg-amber-900/30 rounded px-1 py-0.5">&lt;BOS&gt;</code> (Beginning
        Of Sequence) token wraps every name. Try typing below!
      </p>

      <div className="flex justify-center">
        <input
          value={text}
          onChange={e => setText(e.target.value.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12))}
          placeholder="type a name..."
          className="w-56 px-4 py-2.5 text-center text-base font-semibold rounded-lg
            border-2 border-amber-400/60 dark:border-amber-600/40
            bg-background text-foreground
            focus:outline-none focus:ring-2 focus:ring-amber-500/40
            placeholder:text-muted-foreground/40"
        />
      </div>

      {/* Token display */}
      <div className="flex flex-wrap items-end justify-center gap-2">
        {tokens.map((tok, i) => {
          const isBOS = tok.ch === '<BOS>'
          return (
            <div key={`${i}-${tok.ch}`}
              className="flex flex-col items-center gap-1"
              style={{ animation: `fadeSlideIn 0.3s ease ${i * 60}ms both` }}
            >
              <div className={`flex items-center justify-center rounded-lg font-bold
                shadow-md transition-all hover:scale-105
                ${isBOS
                  ? 'w-14 h-12 text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-2 border-amber-300 dark:border-amber-700'
                  : 'w-12 h-12 text-lg bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-2 border-sky-300 dark:border-sky-700'
                }`}
              >
                {isBOS ? 'BOS' : tok.ch}
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {tok.id}
              </div>
              <div className="text-[9px] text-muted-foreground/50">
                pos {i}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-xs text-center text-muted-foreground/60 bg-muted/30 dark:bg-muted/10 rounded-md px-3 py-2">
        Each character becomes a numbered token · BOS (id=0) marks sequence boundaries
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 4. Attention Visualizer — click a token to see causal attention weights
// ══════════════════════════════════════════════════════════════════════════

const ATTN_TOKENS = ['B', 'e', 'm', 'm', 'a']

export function AttentionVisualizer() {
  const [selected, setSelected] = useState(3)

  return (
    <DiagramBox title="👀 Causal Self-Attention — Click a Token">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Each token can only attend to itself and <em>previous</em> tokens (never the future).
        Click a token to see which positions it pays attention to. Blocked positions show 🚫.
      </p>

      <div className="flex items-end justify-center gap-3 flex-wrap">
        {ATTN_TOKENS.map((tok, i) => {
          const canAttend = i <= selected
          const isSelected = i === selected
          // Rough attention weight for visual
          const weight = isSelected ? 0.4 : canAttend ? 0.6 / Math.max(selected, 1) : 0

          return (
            <div key={i} className="flex flex-col items-center gap-1 cursor-pointer select-none"
              onClick={() => setSelected(i)}
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold
                transition-all duration-200 border-2
                ${isSelected
                  ? 'bg-violet-500 text-white border-violet-600 shadow-lg shadow-violet-500/30 scale-110'
                  : canAttend
                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700'
                    : 'bg-muted/40 text-muted-foreground/30 border-border/30'
                }`}
                style={canAttend && !isSelected ? { opacity: 0.5 + weight } : undefined}
              >
                {tok}
              </div>
              <span className="text-[10px] text-muted-foreground/50">pos {i}</span>
              {canAttend ? (
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {(weight * 100).toFixed(0)}%
                </span>
              ) : (
                <span className="text-sm">🚫</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-sm text-center rounded-lg bg-muted/40 dark:bg-muted/15 p-3 text-muted-foreground">
        Token <span className="font-bold text-violet-600 dark:text-violet-400">"{ATTN_TOKENS[selected]}"</span> at
        position {selected} attends to positions 0..{selected}
        {selected < ATTN_TOKENS.length - 1 && (
          <span> — positions {selected + 1}..{ATTN_TOKENS.length - 1} are <strong>masked</strong> (causal)</span>
        )}
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 5. Animated Training Chart — watch loss decrease with play/pause
// ══════════════════════════════════════════════════════════════════════════

const TOTAL_STEPS = 50
const fakeLoss = Array.from({ length: TOTAL_STEPS }, (_, i) =>
  3.3 * Math.exp(-i * 0.06) + 0.3 + Math.sin(i * 0.4) * 0.15 * Math.exp(-i * 0.03)
)

export function AnimatedTrainingChart() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (running && step < TOTAL_STEPS - 1) {
      timerRef.current = setTimeout(() => setStep(s => s + 1), 100)
      return () => clearTimeout(timerRef.current)
    }
    if (step >= TOTAL_STEPS - 1) setRunning(false)
  }, [running, step])

  const chartW = 440
  const chartH = 140
  const padL = 36
  const padR = 8
  const padT = 8
  const padB = 20
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toX = (i: number) => padL + (i / (TOTAL_STEPS - 1)) * plotW
  const toY = (loss: number) => padT + (1 - (loss - 0.2) / 3.5) * plotH

  // Build SVG polyline points for drawn portion
  const points = fakeLoss.slice(0, step + 1).map((l, i) => `${toX(i)},${toY(l)}`).join(' ')

  return (
    <DiagramBox title="📊 Training Simulation — Watch the Model Learn">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
        <button
          onClick={() => { if (step >= TOTAL_STEPS - 1) setStep(0); setRunning(!running) }}
          className={`px-5 py-2 rounded-lg font-bold text-sm text-white
            shadow-md transition-all hover:scale-105 active:scale-95
            ${running
              ? 'bg-rose-500 hover:bg-rose-600'
              : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {running ? '⏸ Pause' : '▶ Start Training'}
        </button>
        <button
          onClick={() => { setRunning(false); setStep(0) }}
          className="px-4 py-2 rounded-lg font-bold text-sm
            bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
        >
          ↺ Reset
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          Step <span className="text-foreground">{step + 1}/{TOTAL_STEPS}</span>
          {' · '}Loss: <span className="text-amber-600 dark:text-amber-400 font-bold">{fakeLoss[step].toFixed(3)}</span>
        </span>
      </div>

      <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-3 border border-border/30">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
          {/* Y-axis */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH}
            className="stroke-muted-foreground/20" strokeWidth="1" />
          {/* X-axis */}
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH}
            className="stroke-muted-foreground/20" strokeWidth="1" />
          {/* Y labels */}
          <text x={padL - 4} y={toY(3.5)} textAnchor="end" fontSize="9"
            className="fill-muted-foreground/40" dominantBaseline="middle">3.5</text>
          <text x={padL - 4} y={toY(2.0)} textAnchor="end" fontSize="9"
            className="fill-muted-foreground/40" dominantBaseline="middle">2.0</text>
          <text x={padL - 4} y={toY(0.5)} textAnchor="end" fontSize="9"
            className="fill-muted-foreground/40" dominantBaseline="middle">0.5</text>
          {/* Grid lines */}
          {[3.5, 2.0, 0.5].map(v => (
            <line key={v} x1={padL} y1={toY(v)} x2={padL + plotW} y2={toY(v)}
              className="stroke-muted-foreground/8" strokeWidth="1" strokeDasharray="3,3" />
          ))}
          {/* X label */}
          <text x={padL + plotW / 2} y={chartH - 2} textAnchor="middle" fontSize="9"
            className="fill-muted-foreground/40">Training Steps →</text>

          {/* The loss curve */}
          <polyline points={points} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="stroke-amber-500 dark:stroke-amber-400" />
          {/* Current point */}
          <circle cx={toX(step)} cy={toY(fakeLoss[step])} r="4"
            className="fill-amber-500 dark:fill-amber-400 stroke-background" strokeWidth="2" />
        </svg>
      </div>

      <div className="text-xs text-center text-muted-foreground/60 leading-relaxed">
        Loss starts high (random predictions) and decreases as the model learns patterns.
        <br />Each step: forward pass → compute loss → backward → Adam update.
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 6. Loss Explainer — visual cross-entropy examples
// ══════════════════════════════════════════════════════════════════════════

export function LossExplainer() {
  const examples = [
    { prob: 0.9, label: 'Confident & right', emoji: '🎯' },
    { prob: 0.5, label: 'Uncertain', emoji: '🤔' },
    { prob: 0.01, label: 'Very wrong', emoji: '😬' },
  ]

  return (
    <DiagramBox title="🎯 Cross-Entropy Loss — How Wrong Is the Model?">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Loss = <code className="text-xs bg-muted/60 rounded px-1 py-0.5">-log(P(correct))</code>.
        High confidence in the right answer = low loss. Low confidence = high loss.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {examples.map(ex => {
          const loss = -Math.log(ex.prob)
          return (
            <div key={ex.prob}
              className="rounded-lg border border-border/40 bg-background p-4 text-center shadow-sm"
            >
              <div className="text-2xl mb-1">{ex.emoji}</div>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                {(ex.prob * 100).toFixed(0)}%
              </div>
              <div className="text-[11px] text-muted-foreground/60 font-medium mb-2">{ex.label}</div>
              <div className="text-base font-bold text-rose-600 dark:text-rose-400">
                loss = {loss.toFixed(2)}
              </div>
              {/* Visual bar */}
              <div className="h-2 rounded-full bg-muted/50 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-500"
                  style={{ width: `${Math.min((loss / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 7. Temperature Explorer — slider controls creativity of generation
// ══════════════════════════════════════════════════════════════════════════

const tempNames: Record<string, string[]> = {
  '0.1': ['emma', 'anna', 'ella', 'emma', 'anna'],
  '0.3': ['emma', 'ella', 'mia', 'anna', 'emme'],
  '0.5': ['emra', 'alina', 'mava', 'enna', 'jola'],
  '0.7': ['bixen', 'zula', 'kavri', 'xenna', 'qoma'],
  '1.0': ['xzpqy', 'bvkfr', 'tmwql', 'znkcf', 'jgxp'],
}

export function TemperatureExplorer() {
  const [temp, setTemp] = useState(0.5)

  // Snap to closest key
  const closest = Object.keys(tempNames).reduce((a, b) =>
    Math.abs(+b - temp) < Math.abs(+a - temp) ? b : a
  )
  const names = tempNames[closest] ?? tempNames['0.5']

  return (
    <DiagramBox title="🌡️ Temperature Explorer — Control Creativity">
      <p className="text-sm text-muted-foreground leading-relaxed">
        After training, the model generates names by sampling. <strong className="text-violet-600 dark:text-violet-400">Temperature</strong> scales
        the logits before softmax — low = conservative (common names), high = creative (wild names).
      </p>

      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-bold text-violet-600 dark:text-violet-400">
          Temperature: {temp.toFixed(1)}
        </label>
        <input
          type="range" min={0.1} max={1.0} step={0.1} value={temp}
          onChange={e => setTemp(+e.target.value)}
          className="w-64 h-2 rounded-full accent-violet-500 cursor-pointer"
        />
        <div className="flex justify-between w-64 text-[10px] text-muted-foreground/50 font-semibold">
          <span>🧊 Conservative</span>
          <span>🔥 Creative</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {names.map((name, i) => (
          <span key={`${closest}-${i}`}
            className="px-4 py-2 rounded-lg bg-violet-500 text-white text-base font-bold
              shadow-md shadow-violet-500/20 transition-all"
            style={{ animation: `fadeSlideIn 0.3s ease ${i * 80}ms both` }}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="text-xs text-center text-muted-foreground/60 bg-muted/30 dark:bg-muted/10 rounded-md p-2">
        Generation stops when <code className="text-xs bg-muted/60 rounded px-1 py-0.5">BOS</code> is sampled
        (end of name) · <code className="text-xs">logits / temperature → softmax → sample</code>
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 8. Embedding Visualizer — hover to see how tokens become vectors
// ══════════════════════════════════════════════════════════════════════════

const EMB_CHARS = ['BOS', 'e', 'm', 'm', 'a', 'BOS']
const EMB_IDS = [0, 5, 13, 13, 1, 0]

export function EmbeddingVisualizer() {
  const [hovIdx, setHovIdx] = useState(1)

  // Fake embedding values for visualization
  const fakeEmb = (tokenId: number, dim: number) =>
    +((Math.sin(tokenId * 1.7 + dim * 0.8) * 50) / 100).toFixed(2)
  const fakePosEmb = (pos: number, dim: number) =>
    +((Math.cos(pos * 2.1 + dim * 0.6) * 40) / 100).toFixed(2)

  return (
    <DiagramBox title="📐 Embedding Lookup — Hover a Token">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Each token ID looks up a row in the <strong className="text-teal-600 dark:text-teal-400">token embedding table (wte)</strong>,
        then adds a <strong className="text-teal-600 dark:text-teal-400">position embedding (wpe)</strong>.
        The result is a 16-dimensional vector the model can work with.
      </p>

      {/* Token selector */}
      <div className="flex justify-center gap-2">
        {EMB_CHARS.map((ch, i) => {
          const isBOS = ch === 'BOS'
          return (
            <div
              key={i}
              onMouseEnter={() => setHovIdx(i)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold cursor-pointer
                transition-all duration-200 border-2
                ${i === hovIdx
                  ? 'bg-teal-500 text-white border-teal-600 shadow-md scale-110'
                  : 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 hover:border-teal-400'
                }`}
              style={{ fontSize: isBOS ? 9 : 16 }}
            >
              {ch}
            </div>
          )
        })}
      </div>

      {/* Embedding display */}
      <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 space-y-3 border border-border/30">
        <div className="text-xs font-semibold text-muted-foreground">
          Token <span className="text-teal-600 dark:text-teal-400">"{EMB_CHARS[hovIdx]}"</span>
          {' '}(id={EMB_IDS[hovIdx]}) → Token Embedding (wte):
        </div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j}
              className="w-8 h-8 rounded text-[9px] font-bold
                flex items-center justify-center text-white shadow-sm"
              style={{
                backgroundColor: `hsl(${(EMB_IDS[hovIdx] * 37 + j * 23) % 360}, 55%, 50%)`,
              }}
            >
              {fakeEmb(EMB_IDS[hovIdx], j)}
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold text-muted-foreground">
          + Position Embedding (wpe) for position {hovIdx}:
        </div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j}
              className="w-8 h-8 rounded text-[9px] font-bold
                flex items-center justify-center text-white shadow-sm"
              style={{
                backgroundColor: `hsl(${(hovIdx * 50 + j * 19) % 360}, 50%, 48%)`,
              }}
            >
              {fakePosEmb(hovIdx, j)}
            </div>
          ))}
        </div>

        <div className="text-xs font-bold text-center text-teal-600 dark:text-teal-400
          bg-background/60 dark:bg-background/30 rounded-md p-2"
        >
          Final input = wte[{EMB_IDS[hovIdx]}] + wpe[{hovIdx}] → 16-dimensional vector
        </div>
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 9. MLP Flow Diagram — shows expand → activate → contract
// ══════════════════════════════════════════════════════════════════════════

export function MLPFlowDiagram() {
  const steps = [
    { label: 'Input', detail: '16d', color: 'bg-slate-500' },
    { label: 'fc1', detail: '16→64', color: 'bg-blue-500' },
    { label: 'ReLU²', detail: 'relu(x)²', color: 'bg-amber-500' },
    { label: 'fc2', detail: '64→16', color: 'bg-blue-500' },
    { label: 'Output', detail: '16d', color: 'bg-emerald-500' },
  ]

  return (
    <DiagramBox title="🧮 MLP Block — Expand, Activate, Contract">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`${s.color} text-white rounded-lg px-3 py-2 text-center
              min-w-[70px] shadow-md`}
            >
              <div className="text-xs font-extrabold">{s.label}</div>
              <div className="text-[10px] opacity-75">{s.detail}</div>
            </div>
            {i < steps.length - 1 && (
              <span className="text-muted-foreground/30 font-bold hidden sm:inline">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-xs text-center text-muted-foreground/60">
        Squared ReLU: zero out negatives, square the rest. Simple & effective.
        + Residual connection bypasses the block.
      </div>
    </DiagramBox>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 10. Supported Operations Grid — shows all Value class operations
// ══════════════════════════════════════════════════════════════════════════

export function OperationsGrid() {
  const ops = [
    { op: '+', name: 'Add', rule: '∂/∂a = 1', color: 'border-blue-400/40' },
    { op: '×', name: 'Multiply', rule: '∂/∂a = b', color: 'border-purple-400/40' },
    { op: '**n', name: 'Power', rule: '∂/∂a = n·aⁿ⁻¹', color: 'border-amber-400/40' },
    { op: 'exp', name: 'Exp', rule: '∂/∂a = exp(a)', color: 'border-emerald-400/40' },
    { op: 'log', name: 'Log', rule: '∂/∂a = 1/a', color: 'border-teal-400/40' },
    { op: 'relu', name: 'ReLU', rule: '∂/∂a = (a>0)', color: 'border-rose-400/40' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
      {ops.map(o => (
        <div key={o.op}
          className={`p-3 rounded-lg border-2 ${o.color} bg-background/60 text-center
            shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="text-lg font-extrabold text-foreground">{o.op}</div>
          <div className="text-[10px] text-muted-foreground/60 mt-0.5">{o.name}</div>
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{o.rule}</div>
        </div>
      ))}
    </div>
  )
}
