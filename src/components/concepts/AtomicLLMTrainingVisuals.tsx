/**
 * AtomicLLMTrainingVisuals.tsx
 *
 * Interactive animated diagrams for the Atomic LLM Training concept page.
 * Adapted from Claude-generated educational artifact and converted to
 * the codebase's conventions (useTheme + inline CSS for SVG reliability).
 *
 * Each export is a self-contained visual embedded into a specific tab
 * of AtomicLLMTrainingConcept.tsx.
 */

import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

// ── Theme-aware color palette ───────────────────────────────────────────

function useDiagramColors() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return useMemo(() => ({
    dark,
    // Surfaces
    bg:          dark ? '#1a1a2e' : '#ffffff',
    surface:     dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
    surfaceAlt:  dark ? 'rgba(255,255,255,0.06)' : '#f8f9fb',
    border:      dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    borderLight: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    shadow:      dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)',
    // Text
    text:        dark ? '#e2e8f0' : '#1e293b',
    textMuted:   dark ? 'rgba(226,232,240,0.5)' : 'rgba(30,41,59,0.45)',
    textLight:   dark ? 'rgba(226,232,240,0.7)' : 'rgba(30,41,59,0.6)',
    // Accent colors
    amber:       dark ? '#fbbf24' : '#d97706',
    amberBg:     dark ? 'rgba(251,191,36,0.12)' : 'rgba(217,119,6,0.08)',
    amberBorder: dark ? 'rgba(251,191,36,0.25)' : 'rgba(217,119,6,0.20)',
    blue:        dark ? '#60a5fa' : '#2563eb',
    blueBg:      dark ? 'rgba(96,165,250,0.15)' : '#dbeafe',
    purple:      dark ? '#c084fc' : '#7c3aed',
    purpleBg:    dark ? 'rgba(192,132,252,0.15)' : '#ede9fe',
    emerald:     dark ? '#34d399' : '#059669',
    emeraldBg:   dark ? 'rgba(52,211,153,0.12)' : '#d1fae5',
    teal:        dark ? '#2dd4bf' : '#0d9488',
    tealBg:      dark ? 'rgba(45,212,191,0.15)' : '#ccfbf1',
    violet:      dark ? '#a78bfa' : '#7c3aed',
    violetBg:    dark ? 'rgba(167,139,250,0.15)' : '#ede9fe',
    rose:        dark ? '#fb7185' : '#e11d48',
    roseBg:      dark ? 'rgba(251,113,133,0.12)' : '#ffe4e6',
    sky:         dark ? '#38bdf8' : '#0284c7',
    skyBg:       dark ? 'rgba(56,189,248,0.15)' : '#e0f2fe',
    slate:       dark ? '#94a3b8' : '#475569',
    white:       '#ffffff',
    // Pipeline stage colors (solid)
    stageColors: [
      dark ? '#38bdf8' : '#0ea5e9',  // sky
      dark ? '#60a5fa' : '#3b82f6',  // blue
      dark ? '#2dd4bf' : '#14b8a6',  // teal
      dark ? '#a78bfa' : '#8b5cf6',  // violet
      dark ? '#fb7185' : '#f43f5e',  // rose
      dark ? '#34d399' : '#10b981',  // emerald
    ],
  }), [dark])
}

// ── Shared wrapper ──────────────────────────────────────────────────────

function DiagramBox({ title, children, className = '' }: {
  title: string; children: ReactNode; className?: string
}) {
  const c = useDiagramColors()

  return (
    <div
      className={className}
      style={{
        marginTop: 24,
        borderRadius: 12,
        border: `1px solid ${c.amberBorder}`,
        background: c.dark
          ? `linear-gradient(180deg, rgba(251,191,36,0.04) 0%, ${c.bg} 100%)`
          : `linear-gradient(180deg, rgba(251,191,36,0.06) 0%, #fff 100%)`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: `0 1px 3px ${c.shadow}`,
      }}
    >
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: c.amber,
        opacity: 0.7,
      }}>
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

const pipelineLabels = [
  { icon: '📝', label: 'Raw Text', sub: '"emma"' },
  { icon: '🔤', label: 'Tokenize', sub: 'chars → IDs' },
  { icon: '📐', label: 'Embed', sub: 'IDs → vectors' },
  { icon: '⚡', label: 'Attention', sub: 'tokens talk' },
  { icon: '🎯', label: 'Predict', sub: 'next char' },
  { icon: '🧠', label: 'Learn', sub: 'adjust weights' },
]

export function PipelineFlowchart() {
  const c = useDiagramColors()
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible < pipelineLabels.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 180)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <DiagramBox title="🎬 Complete Pipeline — How a GPT Processes Text">
      <style>{flowKeyframes}</style>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        {pipelineLabels.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                backgroundColor: c.stageColors[i],
                color: c.white,
                borderRadius: 8,
                padding: '10px 12px',
                textAlign: 'center',
                minWidth: 84,
                boxShadow: `0 4px 12px ${c.stageColors[i]}40`,
                transition: 'all 0.5s ease',
                cursor: 'default',
                userSelect: 'none',
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <div style={{ fontSize: 20, lineHeight: 1, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 9, opacity: 0.75, marginTop: 2, fontWeight: 500 }}>{s.sub}</div>
            </div>
            {i < pipelineLabels.length - 1 && (
              <svg width="28" height="20" viewBox="0 0 28 20" style={{ flexShrink: 0 }}>
                <path d="M2 10 L20 10" stroke={c.textMuted} strokeWidth="2" fill="none"
                  strokeDasharray="4,4" className="flow-arrow" />
                <polygon points="18,6 26,10 18,14" fill={c.textMuted} />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          background: c.emeraldBg,
          border: `1px solid ${c.dark ? 'rgba(52,211,153,0.2)' : 'rgba(5,150,105,0.15)'}`,
          fontSize: 11, fontWeight: 600, color: c.emerald,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
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
  const col = useDiagramColors()
  const [a, setA] = useState(3)
  const [b, setB] = useState(2)

  const c = a * b
  const d = c + 5
  const gradA = b  // ∂d/∂a = b
  const gradB = a  // ∂d/∂b = a

  const edgeColor = col.textMuted
  const gradEdge = col.dark ? 'rgba(52,211,153,0.6)' : 'rgba(5,150,105,0.5)'
  const constFill = col.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  return (
    <DiagramBox title="⚙️ Interactive Compute Graph — Drag Sliders to See Gradients">
      <p style={{ fontSize: 14, color: col.textLight, lineHeight: 1.6 }}>
        Every number in microGPT is a <strong style={{ color: col.amber }}>Value</strong> that
        tracks how it was computed. Drag <span style={{ color: col.blue, fontWeight: 600 }}>a</span> and{' '}
        <span style={{ color: col.purple, fontWeight: 600 }}>b</span> to see how gradients update
        in real-time via the chain rule.
      </p>

      {/* Sliders */}
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: col.blue }}>a = {a}</span>
          <input type="range" min={-5} max={5} step={1} value={a}
            onChange={e => setA(+e.target.value)}
            className="w-32 h-2 rounded-full accent-blue-500 cursor-pointer" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: col.purple }}>b = {b}</span>
          <input type="range" min={-5} max={5} step={1} value={b}
            onChange={e => setB(+e.target.value)}
            className="w-32 h-2 rounded-full accent-purple-500 cursor-pointer" />
        </label>
      </div>

      {/* SVG Graph */}
      <svg viewBox="0 0 520 220" style={{ width: '100%', maxWidth: 512, margin: '0 auto', display: 'block' }} role="img"
        aria-label="Computational graph showing forward and backward pass"
      >
        {/* Forward edges */}
        <line x1="100" y1="60" x2="215" y2="95" stroke={edgeColor} strokeWidth="2.5" />
        <line x1="100" y1="160" x2="215" y2="115" stroke={edgeColor} strokeWidth="2.5" />
        <line x1="305" y1="105" x2="395" y2="105" stroke={edgeColor} strokeWidth="2.5" />
        <line x1="225" y1="165" x2="395" y2="120" stroke={edgeColor} strokeWidth="2" />

        {/* Backward gradient arrows (green dashed) */}
        <line x1="395" y1="90" x2="305" y2="90"
          stroke={gradEdge} strokeWidth="2" strokeDasharray="5,3" />
        <line x1="295" y1="85" x2="110" y2="50"
          stroke={gradEdge} strokeWidth="2" strokeDasharray="5,3" />
        <line x1="295" y1="120" x2="110" y2="152"
          stroke={gradEdge} strokeWidth="2" strokeDasharray="5,3" />

        {/* Node a */}
        <circle cx="70" cy="60" r="30" fill={col.blueBg} stroke={col.blue} strokeWidth="2" />
        <text x="70" y="57" textAnchor="middle" fontSize="14" fontWeight="700"
          fill={col.blue}>a={a}</text>
        <text x="70" y="75" textAnchor="middle" fontSize="10" fontWeight="700"
          fill={col.emerald}>grad={gradA}</text>

        {/* Node b */}
        <circle cx="70" cy="160" r="30" fill={col.purpleBg} stroke={col.purple} strokeWidth="2" />
        <text x="70" y="157" textAnchor="middle" fontSize="14" fontWeight="700"
          fill={col.purple}>b={b}</text>
        <text x="70" y="175" textAnchor="middle" fontSize="10" fontWeight="700"
          fill={col.emerald}>grad={gradB}</text>

        {/* Node c = a×b */}
        <circle cx="260" cy="105" r="32" fill={col.amberBg} stroke={col.amber} strokeWidth="2" />
        <text x="260" y="98" textAnchor="middle" fontSize="13" fontWeight="700"
          fill={col.amber}>c = {c}</text>
        <text x="260" y="116" textAnchor="middle" fontSize="12"
          fill={col.textMuted}>a × b</text>
        <text x="260" y="80" textAnchor="middle" fontSize="10" fontWeight="700"
          fill={col.emerald}>grad=1</text>

        {/* Node: constant 5 */}
        <circle cx="220" cy="165" r="18" fill={constFill} stroke={edgeColor} strokeWidth="1.5" />
        <text x="220" y="170" textAnchor="middle" fontSize="14" fontWeight="700"
          fill={col.textMuted}>5</text>

        {/* Node d = c+5 */}
        <circle cx="430" cy="105" r="32" fill={col.emeraldBg} stroke={col.emerald} strokeWidth="2" />
        <text x="430" y="98" textAnchor="middle" fontSize="13" fontWeight="700"
          fill={col.emerald}>d = {d}</text>
        <text x="430" y="116" textAnchor="middle" fontSize="12"
          fill={col.textMuted}>c + 5</text>
        <text x="430" y="80" textAnchor="middle" fontSize="10" fontWeight="700"
          fill={col.emerald}>grad=1</text>
      </svg>

      {/* Explanation bar */}
      <div style={{
        fontSize: 14, textAlign: 'center', borderRadius: 8,
        background: col.surface, padding: 12, color: col.textLight,
      }}>
        <span style={{ color: col.emerald, fontWeight: 700 }}>Backward pass:</span>{' '}
        d = a×b + 5 → ∂d/∂a = b = <span style={{ fontWeight: 700, color: col.blue }}>{gradA}</span>
        ,{' '} ∂d/∂b = a = <span style={{ fontWeight: 700, color: col.purple }}>{gradB}</span>
        <br />
        <span style={{ fontSize: 12, opacity: 0.7 }}>Green dashed lines show gradients flowing backward through the graph</span>
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
  const c = useDiagramColors()
  const [text, setText] = useState('emma')

  const tokens = [
    { ch: '<BOS>', id: 0 },
    ...text.split('').map(ch => ({ ch, id: charToId[ch] ?? -1 })),
    { ch: '<BOS>', id: 0 },
  ]

  return (
    <DiagramBox title="🔤 Interactive Tokenizer — Type a Name to See Tokens">
      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
        microGPT uses <strong style={{ color: c.amber }}>character-level tokenization</strong> — each
        letter gets a unique number. A special <code style={{
          fontSize: 12, background: c.amberBg, borderRadius: 4, padding: '1px 5px',
          color: c.amber,
        }}>&lt;BOS&gt;</code> (Beginning Of Sequence) token wraps every name. Try typing below!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12))}
          placeholder="type a name..."
          style={{
            width: 224, padding: '10px 16px', textAlign: 'center', fontSize: 16, fontWeight: 600,
            borderRadius: 8, border: `2px solid ${c.amberBorder}`,
            background: c.bg, color: c.text, outline: 'none',
          }}
        />
      </div>

      {/* Token display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
        {tokens.map((tok, i) => {
          const isBOS = tok.ch === '<BOS>'
          return (
            <div key={`${i}-${tok.ch}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                animation: `fadeSlideIn 0.3s ease ${i * 60}ms both` }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, fontWeight: 700, boxShadow: `0 2px 8px ${c.shadow}`,
                transition: 'all 0.2s',
                width: isBOS ? 56 : 48, height: 48,
                fontSize: isBOS ? 10 : 18,
                background: isBOS ? c.amberBg : c.skyBg,
                color: isBOS ? c.amber : c.sky,
                border: `2px solid ${isBOS ? c.amberBorder : (c.dark ? 'rgba(56,189,248,0.3)' : 'rgba(2,132,199,0.25)')}`,
              }}>
                {isBOS ? 'BOS' : tok.ch}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.emerald }}>
                {tok.id}
              </div>
              <div style={{ fontSize: 9, color: c.textMuted }}>
                pos {i}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{
        fontSize: 12, textAlign: 'center', color: c.textMuted,
        background: c.surface, borderRadius: 6, padding: '6px 12px',
      }}>
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
  const c = useDiagramColors()
  const [selected, setSelected] = useState(3)

  return (
    <DiagramBox title="👀 Causal Self-Attention — Click a Token">
      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
        Each token can only attend to itself and <em>previous</em> tokens (never the future).
        Click a token to see which positions it pays attention to. Blocked positions show 🚫.
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {ATTN_TOKENS.map((tok, i) => {
          const canAttend = i <= selected
          const isSelected = i === selected
          const weight = isSelected ? 0.4 : canAttend ? 0.6 / Math.max(selected, 1) : 0

          return (
            <div key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                cursor: 'pointer', userSelect: 'none' }}
              onClick={() => setSelected(i)}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700,
                transition: 'all 0.2s', border: '2px solid',
                ...(isSelected
                  ? { background: c.violet, color: c.white, borderColor: c.violet,
                      boxShadow: `0 4px 12px ${c.dark ? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.25)'}`,
                      transform: 'scale(1.1)' }
                  : canAttend
                    ? { background: c.violetBg, color: c.violet, borderColor: c.dark ? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.2)',
                        opacity: 0.5 + weight }
                    : { background: c.surface, color: c.textMuted, borderColor: c.border, opacity: 0.5 }
                ),
              }}>
                {tok}
              </div>
              <span style={{ fontSize: 10, color: c.textMuted }}>pos {i}</span>
              {canAttend ? (
                <span style={{ fontSize: 12, fontWeight: 700, color: c.teal }}>
                  {(weight * 100).toFixed(0)}%
                </span>
              ) : (
                <span style={{ fontSize: 14 }}>🚫</span>
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        fontSize: 14, textAlign: 'center', borderRadius: 8,
        background: c.surface, padding: 12, color: c.textLight,
      }}>
        Token <span style={{ fontWeight: 700, color: c.violet }}>"{ATTN_TOKENS[selected]}"</span> at
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
  const c = useDiagramColors()
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

  const points = fakeLoss.slice(0, step + 1).map((l, i) => `${toX(i)},${toY(l)}`).join(' ')

  const axisColor = c.textMuted
  const gridColor = c.dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'

  return (
    <DiagramBox title="📊 Training Simulation — Watch the Model Learn">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
        <button
          onClick={() => { if (step >= TOTAL_STEPS - 1) setStep(0); setRunning(!running) }}
          style={{
            padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, color: c.white,
            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            background: running ? c.rose : c.emerald,
            boxShadow: `0 2px 8px ${running ? c.roseBg : c.emeraldBg}`,
          }}
        >
          {running ? '⏸ Pause' : '▶ Start Training'}
        </button>
        <button
          onClick={() => { setRunning(false); setStep(0) }}
          style={{
            padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14,
            background: c.surface, color: c.textLight, border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          ↺ Reset
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: c.textLight }}>
          Step <span style={{ color: c.text }}>{step + 1}/{TOTAL_STEPS}</span>
          {' · '}Loss: <span style={{ color: c.amber, fontWeight: 700 }}>{fakeLoss[step].toFixed(3)}</span>
        </span>
      </div>

      <div style={{ background: c.surface, borderRadius: 8, padding: 12, border: `1px solid ${c.border}` }}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', maxWidth: 576, margin: '0 auto', display: 'block' }}>
          {/* Y-axis */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH}
            stroke={axisColor} strokeWidth="1" />
          {/* X-axis */}
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH}
            stroke={axisColor} strokeWidth="1" />
          {/* Y labels */}
          <text x={padL - 4} y={toY(3.5)} textAnchor="end" fontSize="9"
            fill={c.textMuted} dominantBaseline="middle">3.5</text>
          <text x={padL - 4} y={toY(2.0)} textAnchor="end" fontSize="9"
            fill={c.textMuted} dominantBaseline="middle">2.0</text>
          <text x={padL - 4} y={toY(0.5)} textAnchor="end" fontSize="9"
            fill={c.textMuted} dominantBaseline="middle">0.5</text>
          {/* Grid lines */}
          {[3.5, 2.0, 0.5].map(v => (
            <line key={v} x1={padL} y1={toY(v)} x2={padL + plotW} y2={toY(v)}
              stroke={gridColor} strokeWidth="1" strokeDasharray="3,3" />
          ))}
          {/* X label */}
          <text x={padL + plotW / 2} y={chartH - 2} textAnchor="middle" fontSize="9"
            fill={c.textMuted}>Training Steps →</text>

          {/* The loss curve */}
          <polyline points={points} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            stroke={c.amber} />
          {/* Current point */}
          <circle cx={toX(step)} cy={toY(fakeLoss[step])} r="4"
            fill={c.amber} stroke={c.bg} strokeWidth="2" />
        </svg>
      </div>

      <div style={{ fontSize: 12, textAlign: 'center', color: c.textMuted, lineHeight: 1.6 }}>
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
  const c = useDiagramColors()
  const examples = [
    { prob: 0.9, label: 'Confident & right', emoji: '🎯' },
    { prob: 0.5, label: 'Uncertain', emoji: '🤔' },
    { prob: 0.01, label: 'Very wrong', emoji: '😬' },
  ]

  return (
    <DiagramBox title="🎯 Cross-Entropy Loss — How Wrong Is the Model?">
      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
        Loss = <code style={{ fontSize: 12, background: c.surface, borderRadius: 4, padding: '1px 5px' }}>-log(P(correct))</code>.
        High confidence in the right answer = low loss. Low confidence = high loss.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {examples.map(ex => {
          const loss = -Math.log(ex.prob)
          return (
            <div key={ex.prob}
              style={{
                borderRadius: 8, border: `1px solid ${c.border}`,
                background: c.bg, padding: 16, textAlign: 'center',
                boxShadow: `0 1px 3px ${c.shadow}`,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{ex.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: c.amber }}>
                {(ex.prob * 100).toFixed(0)}%
              </div>
              <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 500, marginBottom: 8 }}>{ex.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: c.rose }}>
                loss = {loss.toFixed(2)}
              </div>
              {/* Visual bar */}
              <div style={{ height: 8, borderRadius: 999, background: c.surface, marginTop: 8, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%', borderRadius: 999, transition: 'all 0.5s',
                    background: `linear-gradient(90deg, ${c.amber}, ${c.rose})`,
                    width: `${Math.min((loss / 5) * 100, 100)}%`,
                  }}
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
  const c = useDiagramColors()
  const [temp, setTemp] = useState(0.5)

  // Snap to closest key
  const closest = Object.keys(tempNames).reduce((a, b) =>
    Math.abs(+b - temp) < Math.abs(+a - temp) ? b : a
  )
  const names = tempNames[closest] ?? tempNames['0.5']

  return (
    <DiagramBox title="🌡️ Temperature Explorer — Control Creativity">
      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
        After training, the model generates names by sampling. <strong style={{ color: c.violet }}>Temperature</strong> scales
        the logits before softmax — low = conservative (common names), high = creative (wild names).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <label style={{ fontSize: 14, fontWeight: 700, color: c.violet }}>
          Temperature: {temp.toFixed(1)}
        </label>
        <input
          type="range" min={0.1} max={1.0} step={0.1} value={temp}
          onChange={e => setTemp(+e.target.value)}
          className="w-64 h-2 rounded-full accent-violet-500 cursor-pointer"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 256, fontSize: 10, color: c.textMuted, fontWeight: 600 }}>
          <span>🧊 Conservative</span>
          <span>🔥 Creative</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {names.map((name, i) => (
          <span key={`${closest}-${i}`}
            style={{
              padding: '8px 16px', borderRadius: 8,
              background: c.violet, color: c.white,
              fontSize: 16, fontWeight: 700,
              boxShadow: `0 2px 8px ${c.dark ? 'rgba(167,139,250,0.2)' : 'rgba(124,58,237,0.2)'}`,
              animation: `fadeSlideIn 0.3s ease ${i * 80}ms both`,
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <div style={{
        fontSize: 12, textAlign: 'center', color: c.textMuted,
        background: c.surface, borderRadius: 6, padding: 8,
      }}>
        Generation stops when <code style={{ fontSize: 12, background: c.surface, borderRadius: 4, padding: '0 4px' }}>BOS</code> is sampled
        (end of name) · <code style={{ fontSize: 12 }}>logits / temperature → softmax → sample</code>
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
  const c = useDiagramColors()
  const [hovIdx, setHovIdx] = useState(1)

  // Fake embedding values for visualization
  const fakeEmb = (tokenId: number, dim: number) =>
    +((Math.sin(tokenId * 1.7 + dim * 0.8) * 50) / 100).toFixed(2)
  const fakePosEmb = (pos: number, dim: number) =>
    +((Math.cos(pos * 2.1 + dim * 0.6) * 40) / 100).toFixed(2)

  return (
    <DiagramBox title="📐 Embedding Lookup — Hover a Token">
      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
        Each token ID looks up a row in the <strong style={{ color: c.teal }}>token embedding table (wte)</strong>,
        then adds a <strong style={{ color: c.teal }}>position embedding (wpe)</strong>.
        The result is a 16-dimensional vector the model can work with.
      </p>

      {/* Token selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {EMB_CHARS.map((ch, i) => {
          const isBOS = ch === 'BOS'
          return (
            <div
              key={i}
              onMouseEnter={() => setHovIdx(i)}
              style={{
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', border: '2px solid',
                fontSize: isBOS ? 9 : 16,
                ...(i === hovIdx
                  ? { background: c.teal, color: c.white, borderColor: c.teal,
                      boxShadow: `0 2px 8px ${c.dark ? 'rgba(45,212,191,0.3)' : 'rgba(13,148,136,0.25)'}`,
                      transform: 'scale(1.1)' }
                  : { background: c.tealBg, color: c.teal,
                      borderColor: c.dark ? 'rgba(45,212,191,0.2)' : 'rgba(13,148,136,0.2)' }),
              }}
            >
              {ch}
            </div>
          )
        })}
      </div>

      {/* Embedding display */}
      <div style={{ background: c.surface, borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, border: `1px solid ${c.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: c.textLight }}>
          Token <span style={{ color: c.teal }}>"{EMB_CHARS[hovIdx]}"</span>
          {' '}(id={EMB_IDS[hovIdx]}) → Token Embedding (wte):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j}
              style={{
                width: 32, height: 32, borderRadius: 4, fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.white, boxShadow: `0 1px 3px ${c.shadow}`,
                backgroundColor: `hsl(${(EMB_IDS[hovIdx] * 37 + j * 23) % 360}, 55%, 50%)`,
              }}
            >
              {fakeEmb(EMB_IDS[hovIdx], j)}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: c.textLight }}>
          + Position Embedding (wpe) for position {hovIdx}:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j}
              style={{
                width: 32, height: 32, borderRadius: 4, fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.white, boxShadow: `0 1px 3px ${c.shadow}`,
                backgroundColor: `hsl(${(hovIdx * 50 + j * 19) % 360}, 50%, 48%)`,
              }}
            >
              {fakePosEmb(hovIdx, j)}
            </div>
          ))}
        </div>

        <div style={{
          fontSize: 12, fontWeight: 700, textAlign: 'center', color: c.teal,
          background: c.dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)',
          borderRadius: 6, padding: 8,
        }}>
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
  const c = useDiagramColors()
  const steps = [
    { label: 'Input', detail: '16d', bg: c.slate },
    { label: 'fc1', detail: '16→64', bg: c.blue },
    { label: 'ReLU²', detail: 'relu(x)²', bg: c.amber },
    { label: 'fc2', detail: '64→16', bg: c.blue },
    { label: 'Output', detail: '16d', bg: c.emerald },
  ]

  return (
    <DiagramBox title="🧮 MLP Block — Expand, Activate, Contract">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              background: s.bg, color: c.white, borderRadius: 8,
              padding: '8px 12px', textAlign: 'center', minWidth: 70,
              boxShadow: `0 2px 8px ${c.shadow}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{s.label}</div>
              <div style={{ fontSize: 10, opacity: 0.75 }}>{s.detail}</div>
            </div>
            {i < steps.length - 1 && (
              <span style={{ color: c.textMuted, fontWeight: 700 }}>→</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, textAlign: 'center', color: c.textMuted }}>
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
  const c = useDiagramColors()
  const ops = [
    { op: '+', name: 'Add', rule: '∂/∂a = 1', accent: c.blue, borderColor: `${c.blue}40` },
    { op: '×', name: 'Multiply', rule: '∂/∂a = b', accent: c.purple, borderColor: `${c.purple}40` },
    { op: '**n', name: 'Power', rule: '∂/∂a = n·aⁿ⁻¹', accent: c.amber, borderColor: `${c.amber}40` },
    { op: 'exp', name: 'Exp', rule: '∂/∂a = exp(a)', accent: c.emerald, borderColor: `${c.emerald}40` },
    { op: 'log', name: 'Log', rule: '∂/∂a = 1/a', accent: c.teal, borderColor: `${c.teal}40` },
    { op: 'relu', name: 'ReLU', rule: '∂/∂a = (a>0)', accent: c.rose, borderColor: `${c.rose}40` },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
      {ops.map(o => (
        <div key={o.op}
          style={{
            padding: 12, borderRadius: 8, border: `2px solid ${o.borderColor}`,
            background: c.dark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
            textAlign: 'center', boxShadow: `0 1px 3px ${c.shadow}`,
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{o.op}</div>
          <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>{o.name}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.emerald, marginTop: 4 }}>{o.rule}</div>
        </div>
      ))}
    </div>
  )
}
