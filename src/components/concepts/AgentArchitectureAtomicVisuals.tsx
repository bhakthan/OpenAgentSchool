/**
 * AgentArchitectureAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Architecture & Lifecycle.
 *
 * Exports:
 *  1. ReActLoopSimulator    – Step-through Reason → Act → Observe loop with live state
 *  2. ToolCallFlowViz       – Animated tool-call pipeline (plan → parse → execute → integrate)
 *  3. AgentStateExplorer    – Interactive finite-state machine with transitions
 *  4. LatencyBudgetCalc     – Token budget / latency allocator across architecture components
 */

import { useState, useMemo, useCallback, type ReactNode } from 'react'
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
      fontFamily: "'Cambria Math', Georgia, serif",
      fontSize: 14, color: c.text, background: c.surfaceAlt,
      border: `1px solid ${c.border}`, borderRadius: 8,
      padding: '12px 16px', textAlign: 'center', overflowX: 'auto',
      lineHeight: 1.6,
    }}>{children}</div>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 1. ReAct Loop Simulator
// ══════════════════════════════════════════════════════════════════════════

interface ReActStep {
  phase: 'thought' | 'action' | 'observation'
  content: string
}

const reactScenarios: Record<string, ReActStep[]> = {
  weather: [
    { phase: 'thought', content: 'User wants weather in Paris. I need to call the weather API.' },
    { phase: 'action', content: 'CALL get_weather(city="Paris")' },
    { phase: 'observation', content: '{"temp": 18, "condition": "partly cloudy", "humidity": 65}' },
    { phase: 'thought', content: 'Got weather data. Temperature is 18°C, partly cloudy. I can answer now.' },
    { phase: 'action', content: 'RESPOND "It\'s 18°C and partly cloudy in Paris with 65% humidity."' },
    { phase: 'observation', content: '[Task complete — response delivered]' },
  ],
  research: [
    { phase: 'thought', content: 'User wants to compare React vs Vue. Need to search for recent benchmarks.' },
    { phase: 'action', content: 'CALL web_search(query="React vs Vue 2024 benchmark comparison")' },
    { phase: 'observation', content: '{"results": [{"title":"React 19 vs Vue 3.4 Perf...","url":"..."}]}' },
    { phase: 'thought', content: 'Found comparison. But I should also check bundle size data for completeness.' },
    { phase: 'action', content: 'CALL web_search(query="React Vue bundle size overhead 2024")' },
    { phase: 'observation', content: '{"results": [{"title":"Framework Bundle Analysis...","snippet":"React 42kb, Vue 33kb"}]}' },
    { phase: 'thought', content: 'Now I have both performance and bundle size data. Can compose a thorough answer.' },
    { phase: 'action', content: 'RESPOND "Here\'s a comparison: ..."' },
    { phase: 'observation', content: '[Task complete — multi-source synthesis delivered]' },
  ],
}

export function ReActLoopSimulator() {
  const c = useDiagramColors()
  const [scenario, setScenario] = useState<string>('weather')
  const [step, setStep] = useState(0)

  const steps = reactScenarios[scenario]
  const currentStep = steps[Math.min(step, steps.length - 1)]
  const isComplete = step >= steps.length - 1

  const phaseColor: Record<string, string> = {
    thought: c.purple,
    action: c.blue,
    observation: c.emerald,
  }

  const advanceStep = useCallback(() => {
    if (step < steps.length - 1) setStep(s => s + 1)
    else setStep(0)
  }, [step, steps.length])

  return (
    <DiagramBox title="🔁 ReAct Loop — Reason → Act → Observe">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        The ReAct pattern interleaves <strong>reasoning</strong> (what should I do?),
        <strong> acting</strong> (calling tools or responding), and <strong>observing</strong> (processing results).
        Step through to see each phase.
      </p>

      <MathBlock>{'ReAct: T₁ → A₁ → O₁ → T₂ → A₂ → O₂ → ... → Aₙ (response)'}</MathBlock>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {Object.keys(reactScenarios).map(s => (
          <button key={s} onClick={() => { setScenario(s); setStep(0) }} style={{
            padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            textTransform: 'capitalize',
            border: scenario === s ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
            background: scenario === s ? c.blueBg : 'transparent',
            color: scenario === s ? c.blue : c.textLight,
          }}>{s}</button>
        ))}
        <button onClick={advanceStep} style={{
          padding: '6px 18px', borderRadius: 6, cursor: 'pointer',
          fontSize: 12, fontWeight: 700, marginLeft: 8,
          border: `2px solid ${isComplete ? c.amber : c.emerald}`,
          background: `${isComplete ? c.amber : c.emerald}20`,
          color: isComplete ? c.amber : c.emerald,
        }}>
          {isComplete ? '🔄 Restart' : `Step ${step + 1}/${steps.length} → Next`}
        </button>
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, padding: '6px 10px', borderRadius: 6,
            opacity: i <= step ? 1 : 0.3,
            background: i === step ? `${phaseColor[s.phase]}12` : c.surfaceAlt,
            border: `1px solid ${i === step ? phaseColor[s.phase] : c.border}`,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              width: 72, fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              color: phaseColor[s.phase], paddingTop: 2,
            }}>{s.phase}</div>
            <div style={{ fontSize: 12, color: c.text, fontFamily: s.phase === 'action' || s.phase === 'observation' ? 'monospace' : 'inherit' }}>
              {s.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Phase" value={currentStep.phase} color={phaseColor[currentStep.phase]} />
        <InfoPill label="Step" value={`${step + 1}/${steps.length}`} color={c.amber} />
        <InfoPill label="Loops" value={String(Math.ceil(steps.length / 3))} color={c.purple} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Tool Call Flow Visualizer
// ══════════════════════════════════════════════════════════════════════════

const toolCallStages = [
  { name: 'Plan', desc: 'LLM decides which tool to call and with what parameters', icon: '🧠', color: '#c084fc' },
  { name: 'Parse', desc: 'Extract structured tool call from LLM output (JSON schema validation)', icon: '📋', color: '#60a5fa' },
  { name: 'Execute', desc: 'Invoke the tool with validated parameters', icon: '⚡', color: '#fbbf24' },
  { name: 'Integrate', desc: 'Inject tool result back into LLM context for next reasoning step', icon: '🔗', color: '#34d399' },
]

export function ToolCallFlowViz() {
  const c = useDiagramColors()
  const [activeStage, setActiveStage] = useState(0)
  const [showErrors, setShowErrors] = useState(false)

  const errorPoints = [
    { stage: 1, error: 'Parse failure: malformed JSON', mitigation: 'Retry with stricter schema prompt' },
    { stage: 2, error: 'Tool timeout / rate limit', mitigation: 'Exponential backoff + fallback tool' },
    { stage: 3, error: 'Result too large for context', mitigation: 'Summarize/truncate before injection' },
  ]

  return (
    <DiagramBox title="🔧 Tool Call Pipeline — Plan → Parse → Execute → Integrate">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Every tool call follows a 4-stage pipeline. Each stage has failure modes that robust agents must handle.
        Click stages to explore; toggle error overlay to see what can go wrong.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {toolCallStages.map((s, i) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={() => setActiveStage(i)} style={{
              padding: '12px 18px', borderRadius: 10, cursor: 'pointer',
              textAlign: 'center', minWidth: 90, transition: 'all 0.3s ease',
              background: activeStage === i ? `${s.color}20` : c.surfaceAlt,
              border: `2px solid ${activeStage === i ? s.color : c.border}`,
            }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: activeStage === i ? s.color : c.text }}>{s.name}</div>
            </div>
            {i < toolCallStages.length - 1 && (
              <div style={{ fontSize: 18, color: c.textMuted, margin: '0 4px' }}>→</div>
            )}
          </div>
        ))}
      </div>

      {/* Stage description */}
      <div style={{
        padding: 12, borderRadius: 8,
        background: `${toolCallStages[activeStage].color}10`,
        border: `1px solid ${toolCallStages[activeStage].color}30`,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: toolCallStages[activeStage].color }}>
          {toolCallStages[activeStage].name}
        </div>
        <div style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>
          {toolCallStages[activeStage].desc}
        </div>
      </div>

      {/* Error toggle */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: c.textLight, cursor: 'pointer' }}>
        <input type="checkbox" checked={showErrors} onChange={e => setShowErrors(e.target.checked)} />
        <span>Show failure modes & mitigations</span>
      </label>

      {showErrors && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {errorPoints.map((ep, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, padding: '8px 12px', borderRadius: 6,
              background: c.roseBg, border: `1px solid ${c.rose}30`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.rose, width: 60 }}>
                Stage {ep.stage + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.rose }}>{ep.error}</div>
                <div style={{ fontSize: 11, color: c.emerald, marginTop: 2 }}>→ {ep.mitigation}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Agent State Machine Explorer
// ══════════════════════════════════════════════════════════════════════════

type AgentState = 'idle' | 'planning' | 'executing' | 'waiting' | 'reflecting' | 'complete' | 'error'

const stateTransitions: Record<AgentState, Array<{ to: AgentState; trigger: string }>> = {
  idle:       [{ to: 'planning', trigger: 'new_task' }],
  planning:   [{ to: 'executing', trigger: 'plan_ready' }, { to: 'error', trigger: 'plan_fail' }],
  executing:  [{ to: 'waiting', trigger: 'tool_call' }, { to: 'reflecting', trigger: 'step_done' }, { to: 'error', trigger: 'exec_fail' }],
  waiting:    [{ to: 'executing', trigger: 'tool_result' }, { to: 'error', trigger: 'timeout' }],
  reflecting: [{ to: 'planning', trigger: 'needs_replan' }, { to: 'complete', trigger: 'goal_met' }],
  complete:   [{ to: 'idle', trigger: 'reset' }],
  error:      [{ to: 'idle', trigger: 'reset' }, { to: 'planning', trigger: 'retry' }],
}

const statePositions: Record<AgentState, { x: number; y: number }> = {
  idle:       { x: 60, y: 80 },
  planning:   { x: 180, y: 30 },
  executing:  { x: 320, y: 80 },
  waiting:    { x: 320, y: 200 },
  reflecting: { x: 180, y: 240 },
  complete:   { x: 60, y: 200 },
  error:      { x: 440, y: 150 },
}

const stateColors: Record<AgentState, string> = {
  idle: '#94a3b8', planning: '#c084fc', executing: '#60a5fa',
  waiting: '#fbbf24', reflecting: '#2dd4bf', complete: '#34d399', error: '#fb7185',
}

export function AgentStateExplorer() {
  const c = useDiagramColors()
  const [currentState, setCurrentState] = useState<AgentState>('idle')

  const transitions = stateTransitions[currentState]

  return (
    <DiagramBox title="🔄 Agent State Machine — Lifecycle Transitions">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        An agent transitions through discrete states. Click available transitions to walk through
        the lifecycle. Notice how error recovery loops back to planning.
      </p>

      {/* SVG state diagram */}
      <div style={{ overflowX: 'auto' }}>
        <svg width={500} height={280} viewBox="0 0 500 280"
          style={{ background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.border}`, maxWidth: '100%' }}>
          {/* Edges */}
          {Object.entries(stateTransitions).map(([from, trans]) =>
            trans.map((t, ti) => {
              const p1 = statePositions[from as AgentState]
              const p2 = statePositions[t.to]
              return (
                <line key={`${from}-${t.to}-${ti}`}
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={from === currentState ? stateColors[t.to] : `${c.border}`}
                  strokeWidth={from === currentState ? 2 : 0.8}
                  strokeDasharray={from === currentState ? undefined : '4,4'}
                  opacity={from === currentState ? 0.8 : 0.3}
                />
              )
            })
          )}
          {/* Nodes */}
          {Object.entries(statePositions).map(([name, pos]) => {
            const isCurrent = name === currentState
            return (
              <g key={name}>
                <circle cx={pos.x} cy={pos.y} r={isCurrent ? 26 : 20}
                  fill={isCurrent ? `${stateColors[name as AgentState]}30` : c.dark ? '#2a2a4e' : '#fff'}
                  stroke={stateColors[name as AgentState]}
                  strokeWidth={isCurrent ? 3 : 1.5} />
                <text x={pos.x} y={pos.y + 4} textAnchor="middle"
                  fontSize={isCurrent ? 10 : 9} fontWeight={isCurrent ? 800 : 500}
                  fill={stateColors[name as AgentState]}
                  style={{ textTransform: 'capitalize' }}>
                  {name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Transitions */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: c.textMuted, alignSelf: 'center' }}>Transitions:</span>
        {transitions.map(t => (
          <button key={t.trigger} onClick={() => setCurrentState(t.to)} style={{
            padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            border: `1.5px solid ${stateColors[t.to]}`,
            background: `${stateColors[t.to]}15`,
            color: stateColors[t.to],
          }}>
            {t.trigger} → {t.to}
          </button>
        ))}
      </div>

      <InfoPill label="Current" value={currentState} color={stateColors[currentState]} />
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Latency Budget Calculator
// ══════════════════════════════════════════════════════════════════════════

export function LatencyBudgetCalc() {
  const c = useDiagramColors()
  const [llmLatency, setLlmLatency] = useState(800)    // ms
  const [toolLatency, setToolLatency] = useState(300)   // ms
  const [iterations, setIterations] = useState(3)
  const [contextTokens, setContextTokens] = useState(4000)

  const totalLatency = iterations * (llmLatency + toolLatency)
  const tokensPerIteration = Math.round(contextTokens / iterations)
  const estimatedCost = (contextTokens / 1000 * 0.003 * iterations).toFixed(3)

  const budget = 5000 // 5s target
  const withinBudget = totalLatency <= budget
  const budgetRatio = Math.min(totalLatency / budget * 100, 100)

  return (
    <DiagramBox title="⏱ Latency & Token Budget — Architecture Planning">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Agent latency = iterations × (LLM inference + tool calls). Plan your architecture to hit
        latency targets. Adjust parameters to see budget impact.
      </p>

      <MathBlock>{'Total latency = N_iterations × (t_LLM + t_tool)  |  Token budget = context_window / N_iterations'}</MathBlock>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          LLM inference (ms)
          <input type="range" min={100} max={3000} step={50} value={llmLatency}
            onChange={e => setLlmLatency(Number(e.target.value))} />
          <span style={{ fontWeight: 700, color: c.purple }}>{llmLatency}ms</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Tool call (ms)
          <input type="range" min={50} max={2000} step={50} value={toolLatency}
            onChange={e => setToolLatency(Number(e.target.value))} />
          <span style={{ fontWeight: 700, color: c.blue }}>{toolLatency}ms</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Iterations
          <input type="range" min={1} max={10} value={iterations}
            onChange={e => setIterations(Number(e.target.value))} />
          <span style={{ fontWeight: 700, color: c.amber }}>{iterations}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Context tokens
          <input type="range" min={1000} max={32000} step={500} value={contextTokens}
            onChange={e => setContextTokens(Number(e.target.value))} />
          <span style={{ fontWeight: 700, color: c.emerald }}>{contextTokens.toLocaleString()}</span>
        </label>
      </div>

      {/* Budget bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: c.textLight, width: 100 }}>5s budget:</div>
        <div style={{ flex: 1, height: 16, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 8,
            width: `${budgetRatio}%`,
            background: withinBudget ? c.emerald : c.rose,
            transition: 'all 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: withinBudget ? c.emerald : c.rose }}>
          {(totalLatency / 1000).toFixed(1)}s
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Total" value={`${(totalLatency / 1000).toFixed(1)}s`} color={withinBudget ? c.emerald : c.rose} />
        <InfoPill label="Tokens/iter" value={tokensPerIteration.toLocaleString()} color={c.blue} />
        <InfoPill label="Est. cost" value={`$${estimatedCost}`} color={c.amber} />
        <InfoPill label="Status" value={withinBudget ? 'Within budget' : 'Over budget!'} color={withinBudget ? c.emerald : c.rose} />
      </div>
    </DiagramBox>
  )
}
