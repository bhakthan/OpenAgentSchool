/**
 * EvaluationAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Evaluation.
 *
 * Exports:
 *  1. MetricCorrelationExplorer – Visualize trade-offs between evaluation metrics
 *  2. LLMJudgeCalibrationSim   – Calibrate LLM-as-Judge scoring with bias controls
 *  3. BenchmarkRadarBuilder     – Build and compare radar charts across benchmarks
 *  4. EvalPipelineStepper       – Step through a complete evaluation pipeline
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

function MathBlock({ children }: { children: string }) {
  const c = useDiagramColors()
  return (
    <div style={{
      fontFamily: 'monospace', fontSize: 12, padding: '8px 14px',
      borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`,
      color: c.text, overflowX: 'auto',
    }}>{children}</div>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 1. Metric Correlation Explorer
// ══════════════════════════════════════════════════════════════════════════

interface MetricPair {
  metricA: string; metricB: string
  relationship: string; tradeoff: string
}

const metricPairs: MetricPair[] = [
  { metricA: 'Accuracy', metricB: 'Safety', relationship: 'Negative', tradeoff: 'Strict safety filters may reject correct but edgy responses' },
  { metricA: 'Helpfulness', metricB: 'Conciseness', relationship: 'Negative', tradeoff: 'More helpful answers tend to be longer, less concise' },
  { metricA: 'Factuality', metricB: 'Creativity', relationship: 'Negative', tradeoff: 'Strict factual grounding limits creative generation' },
  { metricA: 'Latency', metricB: 'Quality', relationship: 'Negative', tradeoff: 'More reasoning steps improve quality but increase latency' },
  { metricA: 'Coverage', metricB: 'Precision', relationship: 'Negative', tradeoff: 'Broader tool coverage may dilute per-tool quality' },
]

export function MetricCorrelationExplorer() {
  const c = useDiagramColors()
  const [weights, setWeights] = useState<number[]>([80, 60, 70, 50, 65])

  const compositeScore = Math.round(weights.reduce((s, w) => s + w, 0) / weights.length)

  return (
    <DiagramBox title="📊 Metric Correlation Explorer — Multi-Dimensional Evaluation">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Real agent evaluation requires balancing competing metrics. Adjust each metric's
        weight to see how composite scores change and where trade-offs bite.
      </p>

      {metricPairs.map((pair, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 100, fontSize: 11, fontWeight: 700, color: c.stageColors[i % 6] }}>
            {pair.metricA}
          </div>
          <input type="range" min={0} max={100} value={weights[i]}
            onChange={e => { const n = [...weights]; n[i] = +e.target.value; setWeights(n) }}
            style={{ flex: 1, minWidth: 120 }} />
          <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: c.text, textAlign: 'right' }}>{weights[i]}%</div>
          <div style={{ fontSize: 10, color: c.textMuted, flex: '0 0 180px' }}>
            ↔ {pair.metricB}: {pair.relationship}
          </div>
        </div>
      ))}

      <MathBlock>{`Composite = Σ(weight_i × score_i) / n = ${compositeScore}%`}</MathBlock>

      <div style={{
        padding: 10, borderRadius: 8, fontSize: 11, color: c.textLight,
        background: c.surfaceAlt, border: `1px solid ${c.border}`,
      }}>
        💡 Note the trade-off: {metricPairs[weights.indexOf(Math.max(...weights))]?.tradeoff}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Composite" value={`${compositeScore}%`} color={compositeScore > 70 ? c.emerald : c.amber} />
        <InfoPill label="Metrics" value={`${weights.filter(w => w > 50).length}/5 active`} color={c.blue} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. LLM-as-Judge Calibration Simulator
// ══════════════════════════════════════════════════════════════════════════

interface JudgeTrial {
  prompt: string; response: string; humanScore: number
}

const trials: JudgeTrial[] = [
  { prompt: 'Explain quantum entanglement', response: 'Two particles share a state such that measuring one instantly affects the other.', humanScore: 4 },
  { prompt: 'Write a haiku about code', response: 'Bugs crawl through the night / Semicolons stand their guard / Dawn brings a green build', humanScore: 5 },
  { prompt: 'What is 2+2?', response: '2+2 equals 4.', humanScore: 5 },
  { prompt: 'How do you feel today?', response: 'As an AI, I don\'t have feelings, but I\'m ready to help!', humanScore: 3 },
  { prompt: 'Summarize the French Revolution', response: 'A period of radical change in France starting in 1789, leading to the end of the monarchy.', humanScore: 3 },
]

export function LLMJudgeCalibrationSim() {
  const c = useDiagramColors()
  const [positionBias, setPositionBias] = useState(0)
  const [lengthBias, setLengthBias] = useState(0)
  const [strictness, setStrictness] = useState(50)

  const judgeScores = trials.map((t) => {
    const base = t.humanScore
    const lenFactor = t.response.length > 80 ? lengthBias * 0.02 : -lengthBias * 0.01
    const posFactor = positionBias * 0.01
    const strictFactor = (50 - strictness) * 0.02
    const score = Math.max(1, Math.min(5, base + lenFactor + posFactor + strictFactor))
    return Math.round(score * 10) / 10
  })

  const agreement = trials.filter((t, i) => Math.abs(t.humanScore - judgeScores[i]) <= 0.5).length
  const kappa = Math.round((agreement / trials.length) * 100)

  return (
    <DiagramBox title="⚖️ LLM-as-Judge Calibration — Bias Explorer">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        LLM judges can exhibit biases: position bias, verbosity bias, and strictness shifts.
        Adjust these parameters and observe how judge scores diverge from human ground truth.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Position Bias', val: positionBias, set: setPositionBias, range: [-50, 50] },
          { label: 'Length/Verbosity Bias', val: lengthBias, set: setLengthBias, range: [-50, 50] },
          { label: 'Strictness', val: strictness, set: setStrictness, range: [0, 100] },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 140 }}>{s.label}</span>
            <input type="range" min={s.range[0]} max={s.range[1]} value={s.val}
              onChange={e => s.set(+e.target.value)} style={{ flex: 1 }} />
            <span style={{ fontSize: 11, width: 32, textAlign: 'right', color: c.text }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Score comparison table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Prompt', 'Human', 'Judge', 'Δ'].map(h => (
                <th key={h} style={{ padding: '6px 8px', textAlign: 'left', borderBottom: `1px solid ${c.border}`, color: c.textLight, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trials.map((t, i) => {
              const delta = Math.round((judgeScores[i] - t.humanScore) * 10) / 10
              const deltaColor = Math.abs(delta) <= 0.5 ? c.emerald : c.rose
              return (
                <tr key={i}>
                  <td style={{ padding: '6px 8px', color: c.text, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.prompt}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700, color: c.blue }}>{t.humanScore}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700, color: c.purple }}>{judgeScores[i]}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700, color: deltaColor }}>{delta > 0 ? '+' : ''}{delta}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <MathBlock>{`Cohen's κ (approx) = agreement/total = ${agreement}/${trials.length} ≈ ${kappa}%`}</MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Agreement" value={`${kappa}%`} color={kappa >= 80 ? c.emerald : kappa >= 60 ? c.amber : c.rose} />
        <InfoPill label="Calibration" value={kappa >= 80 ? 'Well calibrated' : kappa >= 60 ? 'Moderate drift' : 'Significant bias'} color={kappa >= 80 ? c.emerald : c.rose} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Benchmark Radar Builder
// ══════════════════════════════════════════════════════════════════════════

interface BenchmarkProfile {
  name: string; scores: number[]
}

const dimensions = ['Accuracy', 'Safety', 'Helpfulness', 'Reasoning', 'Speed', 'Cost']
const presets: BenchmarkProfile[] = [
  { name: 'GPT-4o', scores: [92, 88, 94, 90, 75, 60] },
  { name: 'Claude 3.5', scores: [90, 95, 91, 93, 70, 55] },
  { name: 'Local 7B', scores: [68, 72, 65, 55, 95, 95] },
]

export function BenchmarkRadarBuilder() {
  const c = useDiagramColors()
  const [activeProfiles, setActiveProfiles] = useState<boolean[]>([true, true, false])

  const w = 280; const h = 280
  const cx = w / 2; const cy = h / 2; const r = 100

  const angleStep = (2 * Math.PI) / dimensions.length

  const polarToCart = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle - Math.PI / 2),
    y: cy + radius * Math.sin(angle - Math.PI / 2),
  })

  const gridLevels = [0.25, 0.5, 0.75, 1]
  const profileColors = [c.blue, c.purple, c.emerald]

  return (
    <DiagramBox title="🎯 Benchmark Radar — Model Comparison">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Compare agent/model profiles across key evaluation dimensions using a radar chart.
        Toggle profiles to overlay and compare.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {presets.map((p, i) => (
          <button key={p.name} onClick={() => {
            const n = [...activeProfiles]; n[i] = !n[i]; setActiveProfiles(n)
          }} style={{
            padding: '4px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700,
            cursor: 'pointer',
            border: `2px solid ${activeProfiles[i] ? profileColors[i] : c.border}`,
            background: activeProfiles[i] ? `${profileColors[i]}18` : 'transparent',
            color: activeProfiles[i] ? profileColors[i] : c.textMuted,
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          {/* Grid circles */}
          {gridLevels.map(level => {
            const points = dimensions.map((_, i) => {
              const p = polarToCart(i * angleStep, r * level)
              return `${p.x},${p.y}`
            }).join(' ')
            return <polygon key={level} points={points} fill="none" stroke={c.border} strokeWidth={0.5} />
          })}

          {/* Axes */}
          {dimensions.map((dim, i) => {
            const end = polarToCart(i * angleStep, r)
            const labelPos = polarToCart(i * angleStep, r + 18)
            return (
              <g key={dim}>
                <line x1={cx} y1={cy} x2={end.x} y2={end.y} stroke={c.border} strokeWidth={0.5} />
                <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="central"
                  fontSize={9} fill={c.textLight} fontWeight={600}>{dim}</text>
              </g>
            )
          })}

          {/* Profile polygons */}
          {presets.map((profile, pi) => {
            if (!activeProfiles[pi]) return null
            const points = profile.scores.map((score, si) => {
              const p = polarToCart(si * angleStep, (score / 100) * r)
              return `${p.x},${p.y}`
            }).join(' ')
            return <polygon key={pi} points={points}
              fill={`${profileColors[pi]}20`} stroke={profileColors[pi]} strokeWidth={1.5} />
          })}

          {/* Score dots */}
          {presets.map((profile, pi) => {
            if (!activeProfiles[pi]) return null
            return profile.scores.map((score, si) => {
              const p = polarToCart(si * angleStep, (score / 100) * r)
              return <circle key={`${pi}-${si}`} cx={p.x} cy={p.y} r={3}
                fill={profileColors[pi]} stroke={c.bg} strokeWidth={1} />
            })
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {presets.map((p, i) => activeProfiles[i] && (
          <InfoPill key={p.name} label={p.name} value={`avg ${Math.round(p.scores.reduce((a, b) => a + b, 0) / p.scores.length)}%`} color={profileColors[i]} />
        ))}
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Evaluation Pipeline Stepper
// ══════════════════════════════════════════════════════════════════════════

interface PipelineStage {
  label: string; detail: string; output: string; icon: string
}

const pipelineStages: PipelineStage[] = [
  { label: 'Define Tasks', detail: 'Create test scenarios with expected outputs and edge cases', output: '50 test cases × 5 categories', icon: '📋' },
  { label: 'Run Agent', detail: 'Execute agent against each test case in a sandboxed environment', output: '50 responses (avg 350ms)', icon: '🤖' },
  { label: 'Score', detail: 'Apply automated metrics: BLEU, ROUGE, exact match, LLM-judge', output: '200 metric values', icon: '📏' },
  { label: 'Aggregate', detail: 'Compute per-category and overall scores, confidence intervals', output: 'Category scores + CI', icon: '📊' },
  { label: 'Human Review', detail: 'Sample 10% for human annotation, compute inter-annotator agreement', output: 'κ = 0.82 agreement', icon: '👤' },
  { label: 'Report', detail: 'Generate eval report with pass/fail gates and recommendations', output: 'Pass ✓ (score ≥ 85%)', icon: '📝' },
]

export function EvalPipelineStepper() {
  const c = useDiagramColors()
  const [step, setStep] = useState(0)

  return (
    <DiagramBox title="🔄 Evaluation Pipeline — End-to-End Walkthrough">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        A production evaluation pipeline has multiple stages from task definition to reporting.
        Step through each stage to understand the data flow.
      </p>

      {/* Stage progress bar */}
      <div style={{ display: 'flex', gap: 2 }}>
        {pipelineStages.map((stage, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 6, cursor: 'pointer',
            border: step === i ? `2px solid ${c.stageColors[i]}` : `1px solid ${c.border}`,
            background: i <= step ? `${c.stageColors[i]}15` : 'transparent',
            fontSize: 10, fontWeight: 700,
            color: step === i ? c.stageColors[i] : i <= step ? c.stageColors[i] : c.textMuted,
            textAlign: 'center', lineHeight: 1.2,
          }}>
            <div style={{ fontSize: 16 }}>{stage.icon}</div>
            {stage.label}
          </button>
        ))}
      </div>

      {/* Current stage detail */}
      <div style={{
        padding: 14, borderRadius: 8,
        background: `${c.stageColors[step]}08`, border: `1px solid ${c.stageColors[step]}25`,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: c.stageColors[step], marginBottom: 6 }}>
          {pipelineStages[step].icon} Stage {step + 1}: {pipelineStages[step].label}
        </div>
        <div style={{ fontSize: 12, color: c.text, marginBottom: 8 }}>{pipelineStages[step].detail}</div>
        <div style={{
          fontSize: 11, fontFamily: 'monospace', padding: '6px 10px',
          borderRadius: 4, background: c.surfaceAlt, color: c.text,
          border: `1px solid ${c.border}`,
        }}>
          → Output: {pipelineStages[step].output}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Stage" value={`${step + 1}/${pipelineStages.length}`} color={c.purple} />
        <InfoPill label="Phase" value={step < 2 ? 'Setup' : step < 4 ? 'Scoring' : 'Validation'} color={c.blue} />
      </div>
    </DiagramBox>
  )
}
