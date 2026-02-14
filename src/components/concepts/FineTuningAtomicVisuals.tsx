/**
 * FineTuningAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Fine-Tuning Methods (SFT, DPO, RFT).
 *
 * Exports:
 *  1. DPOLossExplorer        – Interactive β sweep showing DPO loss derivation
 *  2. LoRADecompositionViz   – Rank decomposition W = W₀ + BA visualizer
 *  3. TrainingLossCurvesSim  – Simulated loss curves for SFT vs DPO vs RFT
 *  4. HyperparamSensitivity  – Multi-slider showing how hyperparams affect training
 */

import { useState, useMemo, type ReactNode } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

function useDiagramColors() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return useMemo(() => ({
    dark,
    bg:          dark ? '#1a1a2e' : '#ffffff',
    surface:     dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
    surfaceAlt:  dark ? 'rgba(255,255,255,0.06)' : '#f8f9fb',
    border:      dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    shadow:      dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)',
    text:        dark ? '#e2e8f0' : '#1e293b',
    textMuted:   dark ? 'rgba(226,232,240,0.5)' : 'rgba(30,41,59,0.45)',
    textLight:   dark ? 'rgba(226,232,240,0.7)' : 'rgba(30,41,59,0.6)',
    amber:       dark ? '#fbbf24' : '#d97706',
    amberBorder: dark ? 'rgba(251,191,36,0.25)' : 'rgba(217,119,6,0.20)',
    blue:        dark ? '#60a5fa' : '#2563eb',
    blueBg:      dark ? 'rgba(96,165,250,0.15)' : '#dbeafe',
    purple:      dark ? '#c084fc' : '#7c3aed',
    purpleBg:    dark ? 'rgba(192,132,252,0.15)' : '#ede9fe',
    emerald:     dark ? '#34d399' : '#059669',
    emeraldBg:   dark ? 'rgba(52,211,153,0.12)' : '#d1fae5',
    rose:        dark ? '#fb7185' : '#e11d48',
    roseBg:      dark ? 'rgba(251,113,133,0.12)' : '#ffe4e6',
    violet:      dark ? '#a78bfa' : '#7c3aed',
    white:       '#ffffff',
    stageColors: [
      dark ? '#38bdf8' : '#0ea5e9',
      dark ? '#60a5fa' : '#3b82f6',
      dark ? '#2dd4bf' : '#14b8a6',
      dark ? '#a78bfa' : '#8b5cf6',
      dark ? '#fb7185' : '#f43f5e',
      dark ? '#34d399' : '#10b981',
    ],
  }), [dark])
}

function DiagramBox({ title, children }: { title: string; children: ReactNode }) {
  const c = useDiagramColors()
  return (
    <div style={{
      marginTop: 24, borderRadius: 12,
      border: `1px solid ${c.amberBorder}`,
      background: c.dark
        ? `linear-gradient(180deg, rgba(251,191,36,0.04) 0%, ${c.bg} 100%)`
        : `linear-gradient(180deg, rgba(251,191,36,0.06) 0%, #fff 100%)`,
      padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: `0 1px 3px ${c.shadow}`,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.14em', color: c.amber, opacity: 0.7,
      }}>{title}</div>
      {children}
    </div>
  )
}

function MathBlock({ children }: { children: string }) {
  const c = useDiagramColors()
  return (
    <div style={{
      fontFamily: "'Cambria Math', Georgia, serif",
      fontSize: 14, color: c.text, background: c.surfaceAlt,
      border: `1px solid ${c.border}`, borderRadius: 8,
      padding: '12px 16px', textAlign: 'center', overflowX: 'auto',
      lineHeight: 1.6,
    }}>{children}</div>
  )
}

function InfoPill({ label, value, color }: { label: string; value: string; color: string }) {
  const c = useDiagramColors()
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 999,
      background: `${color}15`, border: `1px solid ${color}30`,
      fontSize: 11, fontWeight: 600, color: c.text,
    }}>
      <span style={{ color, fontWeight: 800 }}>{label}</span> {value}
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 1. DPO Loss Explorer — Interactive β sweep
// ══════════════════════════════════════════════════════════════════════════

export function DPOLossExplorer() {
  const c = useDiagramColors()
  const [beta, setBeta] = useState(0.1)
  const [logRatioChosen, setLogRatioChosen] = useState(1.5)
  const [logRatioRejected, setLogRatioRejected] = useState(-0.5)

  // DPO loss = -log(σ(β * (log(π/π_ref)(chosen) - log(π/π_ref)(rejected))))
  const advantage = logRatioChosen - logRatioRejected
  const scaledAdv = beta * advantage
  const sigmoid = 1 / (1 + Math.exp(-scaledAdv))
  const loss = -Math.log(Math.max(sigmoid, 1e-10))

  // Generate curve for current β across different advantages
  const curvePoints: Array<{ x: number; y: number }> = []
  for (let adv = -4; adv <= 4; adv += 0.2) {
    const s = 1 / (1 + Math.exp(-beta * adv))
    curvePoints.push({ x: adv, y: -Math.log(Math.max(s, 1e-10)) })
  }

  const chartW = 400, chartH = 200, padL = 40, padR = 20, padT = 10, padB = 30
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const xScale = (v: number) => padL + ((v + 4) / 8) * plotW
  const yMax = 5
  const yScale = (v: number) => padT + (1 - Math.min(v, yMax) / yMax) * plotH

  const pathD = curvePoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`
  ).join(' ')

  return (
    <DiagramBox title="📉 DPO Loss — Interactive β Sweep">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        DPO directly optimizes the policy using preference pairs. The <strong>β parameter</strong> controls how
        aggressively the model shifts from the reference. Higher β = more conservative (staying closer to base model).
      </p>

      <MathBlock>
        {'ℒ_DPO = −log σ(β · [log π_θ(y_w|x)/π_ref(y_w|x) − log π_θ(y_l|x)/π_ref(y_l|x)])'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Chart */}
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}
          style={{ background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.border}` }}>
          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke={c.border} strokeWidth={1} />
          <line x1={padL} y1={chartH - padB} x2={chartW - padR} y2={chartH - padB} stroke={c.border} strokeWidth={1} />

          {/* Grid lines */}
          {[-2, 0, 2].map(v => (
            <g key={`gx-${v}`}>
              <line x1={xScale(v)} y1={padT} x2={xScale(v)} y2={chartH - padB}
                stroke={c.border} strokeWidth={0.5} strokeDasharray="3,3" />
              <text x={xScale(v)} y={chartH - padB + 14} textAnchor="middle" fontSize={9} fill={c.textMuted}>{v}</text>
            </g>
          ))}
          {[1, 2, 3, 4].map(v => (
            <g key={`gy-${v}`}>
              <line x1={padL} y1={yScale(v)} x2={chartW - padR} y2={yScale(v)}
                stroke={c.border} strokeWidth={0.5} strokeDasharray="3,3" />
              <text x={padL - 6} y={yScale(v) + 3} textAnchor="end" fontSize={9} fill={c.textMuted}>{v}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={chartW / 2} y={chartH - 2} textAnchor="middle" fontSize={10} fill={c.textLight}>advantage (chosen − rejected)</text>
          <text x={12} y={chartH / 2} textAnchor="middle" fontSize={10} fill={c.textLight}
            transform={`rotate(-90, 12, ${chartH / 2})`}>loss</text>

          {/* Loss curve */}
          <path d={pathD} fill="none" stroke={c.purple} strokeWidth={2.5} />

          {/* Current point */}
          <circle cx={xScale(advantage)} cy={yScale(loss)} r={6}
            fill={c.purple} stroke={c.white} strokeWidth={2} />
        </svg>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            β (temperature)
            <input type="range" min={1} max={50} value={beta * 100}
              onChange={e => setBeta(Number(e.target.value) / 100)} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.purple }}>{beta.toFixed(2)}</span>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            log(π/π_ref) chosen
            <input type="range" min={-30} max={30} value={logRatioChosen * 10}
              onChange={e => setLogRatioChosen(Number(e.target.value) / 10)} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.emerald }}>{logRatioChosen.toFixed(1)}</span>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            log(π/π_ref) rejected
            <input type="range" min={-30} max={30} value={logRatioRejected * 10}
              onChange={e => setLogRatioRejected(Number(e.target.value) / 10)} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.rose }}>{logRatioRejected.toFixed(1)}</span>
          </label>

          <div style={{
            padding: 12, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`,
          }}>
            <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4 }}>Current values:</div>
            <div style={{ fontSize: 11, color: c.textLight }}>advantage = {advantage.toFixed(2)}</div>
            <div style={{ fontSize: 11, color: c.textLight }}>σ(β·adv) = {sigmoid.toFixed(4)}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: loss > 2 ? c.rose : loss > 0.5 ? c.amber : c.emerald, marginTop: 4 }}>
              loss = {loss.toFixed(4)}
            </div>
            <div style={{ fontSize: 10, color: c.textMuted, marginTop: 4 }}>
              {loss < 0.3 ? '✓ Model strongly prefers chosen' : loss > 2 ? '✕ Model prefers rejected — needs training' : '~ Moderate preference'}
            </div>
          </div>
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. LoRA Rank Decomposition Visualizer
// ══════════════════════════════════════════════════════════════════════════

export function LoRADecompositionViz() {
  const c = useDiagramColors()
  const [rank, setRank] = useState(8)
  const [dModel, setDModel] = useState(768)

  const fullParams = dModel * dModel
  const loraParams = 2 * dModel * rank
  const compression = ((1 - loraParams / fullParams) * 100)
  const ratio = (fullParams / loraParams)

  // Visual matrix rectangles
  const boxScale = 0.2
  const wWidth = Math.min(dModel * boxScale, 120)
  const wHeight = Math.min(dModel * boxScale, 120)
  const bWidth = Math.min(rank * boxScale * 4, 40)
  const aHeight = Math.min(rank * boxScale * 4, 40)

  return (
    <DiagramBox title="🧮 LoRA — Low-Rank Adaptation Decomposition">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Instead of updating all weights, LoRA freezes the original matrix <strong>W₀</strong> and trains
        two small matrices <strong>B</strong> (d×r) and <strong>A</strong> (r×d). The update is W = W₀ + BA,
        reducing trainable parameters by {ratio.toFixed(0)}×.
      </p>

      <MathBlock>
        {'W = W₀ + BA,  where  W₀ ∈ ℝᵈˣᵈ (frozen),  B ∈ ℝᵈˣʳ,  A ∈ ℝʳˣᵈ  (trainable)'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Rank (r)
          <input type="range" min={1} max={64} value={rank}
            onChange={e => setRank(Number(e.target.value))} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.purple }}>{rank}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          d_model
          <input type="range" min={256} max={4096} step={256} value={dModel}
            onChange={e => setDModel(Number(e.target.value))} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.blue }}>{dModel}</span>
        </label>
      </div>

      {/* Visual decomposition */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', padding: '12px 0' }}>
        {/* W₀ (frozen, large) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: wWidth, height: wHeight, borderRadius: 6,
            background: `${c.rose}20`, border: `2px solid ${c.rose}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: c.rose,
          }}>W₀</div>
          <div style={{ fontSize: 9, color: c.textMuted, marginTop: 4 }}>{dModel}×{dModel}</div>
          <div style={{ fontSize: 9, color: c.rose }}>frozen</div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: c.textLight }}>+</div>

        {/* B matrix */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: bWidth, height: wHeight, borderRadius: 6,
            background: `${c.blue}20`, border: `2px solid ${c.blue}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: c.blue,
          }}>B</div>
          <div style={{ fontSize: 9, color: c.textMuted, marginTop: 4 }}>{dModel}×{rank}</div>
          <div style={{ fontSize: 9, color: c.emerald }}>trainable</div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: c.textLight }}>×</div>

        {/* A matrix */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: wWidth, height: aHeight, borderRadius: 6,
            background: `${c.purple}20`, border: `2px solid ${c.purple}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: c.purple,
          }}>A</div>
          <div style={{ fontSize: 9, color: c.textMuted, marginTop: 4 }}>{rank}×{dModel}</div>
          <div style={{ fontSize: 9, color: c.emerald }}>trainable</div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Full params" value={fullParams.toLocaleString()} color={c.rose} />
        <InfoPill label="LoRA params" value={loraParams.toLocaleString()} color={c.emerald} />
        <InfoPill label="Compression" value={`${compression.toFixed(1)}% fewer`} color={c.blue} />
        <InfoPill label="Ratio" value={`${ratio.toFixed(0)}× smaller`} color={c.purple} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Training Loss Curves Simulator
//    Shows stylized loss curves for SFT, DPO, RFT side by side
// ══════════════════════════════════════════════════════════════════════════

function generateCurve(epochs: number, initial: number, final: number, noise: number, shape: 'exp' | 'log' | 'step') {
  const points: Array<{ x: number; y: number }> = []
  for (let i = 0; i <= epochs; i++) {
    const t = i / epochs
    let base: number
    if (shape === 'exp') base = final + (initial - final) * Math.exp(-4 * t)
    else if (shape === 'log') base = initial - (initial - final) * (1 - 1 / (1 + 3 * t))
    else base = t < 0.3 ? initial : t < 0.6 ? (initial + final) / 2 : final
    // Deterministic "noise" based on index
    const jitter = Math.sin(i * 7.3 + initial * 2.1) * noise * (1 - t * 0.7)
    points.push({ x: i, y: Math.max(0, base + jitter) })
  }
  return points
}

export function TrainingLossCurvesSim() {
  const c = useDiagramColors()
  const [epochs, setEpochs] = useState(50)
  const [method, setMethod] = useState<'sft' | 'dpo' | 'rft' | 'all'>('all')

  const curves = useMemo(() => ({
    sft: generateCurve(epochs, 2.5, 0.4, 0.15, 'exp'),
    dpo: generateCurve(epochs, 1.2, 0.15, 0.08, 'log'),
    rft: generateCurve(epochs, 1.8, 0.25, 0.12, 'step'),
  }), [epochs])

  const chartW = 500, chartH = 220, padL = 45, padR = 20, padT = 15, padB = 30
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const xScale = (v: number) => padL + (v / epochs) * plotW
  const yMax = 3
  const yScale = (v: number) => padT + (1 - Math.min(v, yMax) / yMax) * plotH

  const makePath = (pts: Array<{ x: number; y: number }>) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`).join(' ')

  const methodInfo = {
    sft: { color: c.blue, label: 'SFT' },
    dpo: { color: c.amber, label: 'DPO' },
    rft: { color: c.purple, label: 'RFT' },
  }

  const visible = method === 'all' ? ['sft', 'dpo', 'rft'] as const : [method]

  return (
    <DiagramBox title="📈 Training Loss Curves — SFT vs DPO vs RFT">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Each fine-tuning method produces a characteristic loss curve shape. SFT converges exponentially,
        DPO has a logarithmic tail, and RFT shows step-like improvements as the policy evolves.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {(['all', 'sft', 'dpo', 'rft'] as const).map(m => (
          <button key={m} onClick={() => setMethod(m)} style={{
            padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700,
            border: method === m ? `2px solid ${c.purple}` : `1px solid ${c.border}`,
            background: method === m ? c.purpleBg : 'transparent',
            color: method === m ? c.purple : c.textLight,
            textTransform: 'uppercase',
          }}>
            {m === 'all' ? '📊 All' : m.toUpperCase()}
          </button>
        ))}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: c.textLight, marginLeft: 12 }}>
          Epochs:
          <input type="range" min={20} max={100} value={epochs}
            onChange={e => setEpochs(Number(e.target.value))} style={{ width: 80 }} />
          <span style={{ fontWeight: 700, color: c.purple }}>{epochs}</span>
        </label>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}
          style={{ background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.border}`, maxWidth: '100%' }}>
          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke={c.border} />
          <line x1={padL} y1={chartH - padB} x2={chartW - padR} y2={chartH - padB} stroke={c.border} />
          {[0.5, 1, 1.5, 2, 2.5].map(v => (
            <g key={`y-${v}`}>
              <line x1={padL} y1={yScale(v)} x2={chartW - padR} y2={yScale(v)} stroke={c.border} strokeWidth={0.5} strokeDasharray="3,3" />
              <text x={padL - 6} y={yScale(v) + 3} textAnchor="end" fontSize={9} fill={c.textMuted}>{v}</text>
            </g>
          ))}
          <text x={chartW / 2} y={chartH - 2} textAnchor="middle" fontSize={10} fill={c.textLight}>Epoch</text>
          <text x={12} y={chartH / 2} textAnchor="middle" fontSize={10} fill={c.textLight}
            transform={`rotate(-90, 12, ${chartH / 2})`}>Loss</text>

          {/* Curves */}
          {visible.map(m => (
            <path key={m} d={makePath(curves[m])} fill="none"
              stroke={methodInfo[m].color} strokeWidth={2.5} />
          ))}

          {/* Legend */}
          {visible.map((m, i) => (
            <g key={`leg-${m}`} transform={`translate(${chartW - padR - 60}, ${padT + 10 + i * 18})`}>
              <line x1={0} y1={0} x2={16} y2={0} stroke={methodInfo[m].color} strokeWidth={2.5} />
              <text x={20} y={4} fontSize={10} fontWeight={600} fill={c.text}>{methodInfo[m].label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {visible.map(m => {
          const last = curves[m][curves[m].length - 1]
          return <InfoPill key={m} label={methodInfo[m].label} value={`final loss: ${last.y.toFixed(3)}`} color={methodInfo[m].color} />
        })}
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Hyperparameter Sensitivity Explorer
// ══════════════════════════════════════════════════════════════════════════

export function HyperparamSensitivity() {
  const c = useDiagramColors()
  const [lr, setLr] = useState(5)       // 1e-{lr} → 1e-5
  const [batchSize, setBatchSize] = useState(16)
  const [warmup, setWarmup] = useState(10)  // % of training

  // Simulated outcomes based on hyperparams
  const lrVal = Math.pow(10, -lr)
  const convergeSpeed = lr >= 4 && lr <= 5 ? 'Fast' : lr < 4 ? 'Unstable' : 'Very slow'
  const stability = batchSize >= 16 ? 'Stable' : batchSize >= 8 ? 'Moderate' : 'Noisy'
  const warmupEffect = warmup >= 5 && warmup <= 15 ? 'Good' : warmup > 15 ? 'Slow start' : 'Risk of spikes'

  const overallScore = (
    (lr >= 4 && lr <= 5 ? 3 : lr < 4 ? 0.5 : 1.5) +
    (batchSize >= 16 ? 3 : batchSize >= 8 ? 2 : 1) +
    (warmup >= 5 && warmup <= 15 ? 3 : 1.5)
  ) / 9 * 100

  const scoreColor = overallScore > 80 ? c.emerald : overallScore > 50 ? c.amber : c.rose

  return (
    <DiagramBox title="🎛 Hyperparameter Sensitivity — Fine-Tuning Controls">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Fine-tuning outcomes are highly sensitive to hyperparameters. Adjust the sliders to see how
        learning rate, batch size, and warmup interact. The "sweet spot" indicator shows recommended ranges.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {/* Learning rate */}
        <div style={{ padding: 12, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.blue, marginBottom: 8 }}>Learning Rate</div>
          <input type="range" min={3} max={7} step={0.5} value={lr}
            onChange={e => setLr(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ fontSize: 18, fontWeight: 800, color: c.text, fontFamily: 'monospace' }}>
            1e-{lr}
          </div>
          <div style={{ fontSize: 11, color: c.textMuted }}>{lrVal.toExponential(0)}</div>
          <div style={{
            fontSize: 10, fontWeight: 700, marginTop: 4, padding: '2px 8px', borderRadius: 4, display: 'inline-block',
            color: convergeSpeed === 'Fast' ? c.emerald : convergeSpeed === 'Unstable' ? c.rose : c.amber,
            background: convergeSpeed === 'Fast' ? c.emeraldBg : convergeSpeed === 'Unstable' ? c.roseBg : `${c.amber}15`,
          }}>{convergeSpeed}</div>
        </div>

        {/* Batch size */}
        <div style={{ padding: 12, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.purple, marginBottom: 8 }}>Batch Size</div>
          <input type="range" min={1} max={64} step={1} value={batchSize}
            onChange={e => setBatchSize(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{batchSize}</div>
          <div style={{ fontSize: 11, color: c.textMuted }}>samples per step</div>
          <div style={{
            fontSize: 10, fontWeight: 700, marginTop: 4, padding: '2px 8px', borderRadius: 4, display: 'inline-block',
            color: stability === 'Stable' ? c.emerald : stability === 'Moderate' ? c.amber : c.rose,
            background: stability === 'Stable' ? c.emeraldBg : stability === 'Moderate' ? `${c.amber}15` : c.roseBg,
          }}>{stability}</div>
        </div>

        {/* Warmup */}
        <div style={{ padding: 12, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.emerald, marginBottom: 8 }}>Warmup</div>
          <input type="range" min={0} max={30} value={warmup}
            onChange={e => setWarmup(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{warmup}%</div>
          <div style={{ fontSize: 11, color: c.textMuted }}>of training steps</div>
          <div style={{
            fontSize: 10, fontWeight: 700, marginTop: 4, padding: '2px 8px', borderRadius: 4, display: 'inline-block',
            color: warmupEffect === 'Good' ? c.emerald : c.amber,
            background: warmupEffect === 'Good' ? c.emeraldBg : `${c.amber}15`,
          }}>{warmupEffect}</div>
        </div>
      </div>

      {/* Overall score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: c.textLight }}>Overall config quality:</div>
        <div style={{ flex: 1, height: 12, borderRadius: 6, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 6,
            width: `${overallScore}%`,
            background: scoreColor,
            transition: 'all 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: scoreColor }}>{overallScore.toFixed(0)}%</div>
      </div>

      <div style={{
        padding: 10, borderRadius: 8, fontSize: 12, color: c.textLight,
        background: `${c.emerald}08`, border: `1px solid ${c.emerald}20`,
      }}>
        💡 <strong>Sweet spot:</strong> lr=1e-5, batch=16-32, warmup=5-10%. Start conservative, increase lr only if loss plateaus early.
      </div>
    </DiagramBox>
  )
}
