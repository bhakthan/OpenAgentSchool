/**
 * ObservabilityAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Observability.
 *
 * Exports:
 *  1. SLICalculator         – Define SLIs & SLOs, compute error budget burn rate
 *  2. TraceWaterfallSim      – Explore trace spans in a waterfall diagram
 *  3. AlertThresholdTuner    – Tune alert thresholds against noise/miss trade-off
 *  4. LogStructureExplorer   – Compare unstructured vs structured logging
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
// 1. SLI / SLO Calculator
// ══════════════════════════════════════════════════════════════════════════

export function SLICalculator() {
  const c = useDiagramColors()
  const [sloTarget, setSloTarget] = useState(99.5)
  const [totalRequests, setTotalRequests] = useState(10000)
  const [failedRequests, setFailedRequests] = useState(30)

  const sli = ((totalRequests - failedRequests) / totalRequests) * 100
  const errorBudget = sloTarget > 0 ? (100 - sloTarget) : 0
  const errorBudgetUsed = sli < sloTarget ? 100 : ((100 - sli) / errorBudget) * 100
  const budgetRemaining = Math.max(0, errorBudget - (100 - sli))
  const minutesRemaining = Math.round(budgetRemaining / 100 * 30 * 24 * 60)

  const sliColor = sli >= sloTarget ? c.emerald : c.rose

  return (
    <DiagramBox title="📐 SLI / SLO Calculator — Error Budget">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Service Level Indicators (SLIs) measure real behavior. Service Level Objectives (SLOs)
        set the target. The error budget is the gap. Adjust values to see how quickly your budget burns.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 130 }}>SLO Target (%)</span>
          <input type="range" min={90} max={99.99} step={0.1} value={sloTarget}
            onChange={e => setSloTarget(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{sloTarget}%</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 130 }}>Total Requests</span>
          <input type="range" min={100} max={100000} step={100} value={totalRequests}
            onChange={e => setTotalRequests(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{totalRequests.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 130 }}>Failed Requests</span>
          <input type="range" min={0} max={Math.min(totalRequests, 5000)} step={1} value={failedRequests}
            onChange={e => setFailedRequests(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{failedRequests}</span>
        </div>
      </div>

      <MathBlock>{`SLI = (total - failed) / total = (${totalRequests} - ${failedRequests}) / ${totalRequests} = ${sli.toFixed(3)}%`}</MathBlock>

      {/* Budget bar */}
      <div style={{ position: 'relative', height: 28, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${Math.min(100, errorBudgetUsed)}%`,
          background: errorBudgetUsed >= 100 ? c.rose : errorBudgetUsed > 75 ? c.amber : c.emerald,
          transition: 'width 0.3s ease, background 0.3s ease',
        }} />
        <div style={{
          position: 'absolute', left: `${sloTarget > 90 ? ((sloTarget - 90) / 10) * 100 : 0}%`, top: 0,
          width: 2, height: '100%', background: c.purple,
        }} />
        <div style={{ position: 'absolute', width: '100%', textAlign: 'center', lineHeight: '28px', fontSize: 10, fontWeight: 700, color: c.text }}>
          Error Budget: {errorBudgetUsed.toFixed(1)}% used
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="SLI" value={`${sli.toFixed(3)}%`} color={sliColor} />
        <InfoPill label="SLO" value={`${sloTarget}%`} color={c.purple} />
        <InfoPill label="Budget left" value={`${budgetRemaining.toFixed(3)}% (~${minutesRemaining} min/month)`} color={errorBudgetUsed > 75 ? c.rose : c.emerald} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Trace Waterfall Simulator
// ══════════════════════════════════════════════════════════════════════════

interface TraceSpan {
  name: string; service: string; depth: number
  startMs: number; durationMs: number
  status: 'ok' | 'error'; tags: string[]
}

const sampleTrace: TraceSpan[] = [
  { name: 'POST /agent/chat', service: 'gateway', depth: 0, startMs: 0, durationMs: 1250, status: 'ok', tags: ['http'] },
  { name: 'plan_steps', service: 'planner', depth: 1, startMs: 20, durationMs: 180, status: 'ok', tags: ['llm', 'gpt-4o'] },
  { name: 'tool:search_docs', service: 'tools', depth: 1, startMs: 210, durationMs: 350, status: 'ok', tags: ['vector-db'] },
  { name: 'embed_query', service: 'embeddings', depth: 2, startMs: 220, durationMs: 60, status: 'ok', tags: ['ada-002'] },
  { name: 'vector_search', service: 'chroma', depth: 2, startMs: 290, durationMs: 250, status: 'ok', tags: ['top-5'] },
  { name: 'generate_response', service: 'llm', depth: 1, startMs: 580, durationMs: 620, status: 'ok', tags: ['llm', 'gpt-4o', 'stream'] },
  { name: 'guardrail_check', service: 'safety', depth: 1, startMs: 1210, durationMs: 30, status: 'ok', tags: ['safety'] },
]

export function TraceWaterfallSim() {
  const c = useDiagramColors()
  const [selectedSpan, setSelectedSpan] = useState<number | null>(null)

  const totalDuration = sampleTrace[0].durationMs
  const serviceColors: Record<string, string> = {
    gateway: c.stageColors[0], planner: c.stageColors[1], tools: c.stageColors[2],
    embeddings: c.stageColors[3], chroma: c.stageColors[4], llm: c.stageColors[5], safety: c.amber,
  }

  return (
    <DiagramBox title="🔍 Trace Waterfall — Span-Level Inspection">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Every agent request produces a trace tree. Click a span to inspect its metadata —
        see how latency distributes across planning, retrieval, generation, and safety steps.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {sampleTrace.map((span, i) => {
          const left = (span.startMs / totalDuration) * 100
          const width = Math.max((span.durationMs / totalDuration) * 100, 2)
          const color = serviceColors[span.service] || c.blue
          return (
            <div key={i} onClick={() => setSelectedSpan(selectedSpan === i ? null : i)} style={{
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              padding: '4px 0', borderBottom: selectedSpan === i ? `1px solid ${color}` : 'none',
            }}>
              <div style={{
                width: 120, fontSize: 10, fontWeight: 600, color: c.text,
                paddingLeft: span.depth * 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{span.name}</div>
              <div style={{ flex: 1, position: 'relative', height: 18 }}>
                <div style={{
                  position: 'absolute', left: `${left}%`, width: `${width}%`,
                  height: '100%', borderRadius: 3,
                  background: `${color}${selectedSpan === i ? 'cc' : '80'}`,
                  border: selectedSpan === i ? `1px solid ${color}` : 'none',
                  transition: 'all 0.15s ease',
                }} />
              </div>
              <div style={{ width: 50, fontSize: 9, color: c.textMuted, textAlign: 'right' }}>{span.durationMs}ms</div>
            </div>
          )
        })}
      </div>

      {/* Span detail */}
      {selectedSpan !== null && (
        <div style={{
          padding: 12, borderRadius: 8,
          background: c.surfaceAlt, border: `1px solid ${c.border}`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: serviceColors[sampleTrace[selectedSpan].service] || c.blue, marginBottom: 4 }}>
            {sampleTrace[selectedSpan].name}
          </div>
          <div style={{ fontSize: 10, color: c.textLight, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>Service: <strong>{sampleTrace[selectedSpan].service}</strong></span>
            <span>Duration: <strong>{sampleTrace[selectedSpan].durationMs}ms</strong></span>
            <span>Start: <strong>{sampleTrace[selectedSpan].startMs}ms</strong></span>
            <span>Status: <strong style={{ color: sampleTrace[selectedSpan].status === 'ok' ? c.emerald : c.rose }}>{sampleTrace[selectedSpan].status}</strong></span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            {sampleTrace[selectedSpan].tags.map(tag => (
              <span key={tag} style={{
                fontSize: 9, padding: '1px 6px', borderRadius: 4,
                background: `${c.purple}15`, color: c.purple, fontWeight: 600,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Total" value={`${totalDuration}ms`} color={c.blue} />
        <InfoPill label="Spans" value={String(sampleTrace.length)} color={c.purple} />
        <InfoPill label="LLM time" value={`${sampleTrace.filter(s => s.tags.includes('llm')).reduce((a, s) => a + s.durationMs, 0)}ms`} color={c.amber} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Alert Threshold Tuner
// ══════════════════════════════════════════════════════════════════════════

export function AlertThresholdTuner() {
  const c = useDiagramColors()
  const [latencyThreshold, setLatencyThreshold] = useState(500)
  const [errorRateThreshold, setErrorRateThreshold] = useState(5)
  const [windowMinutes, setWindowMinutes] = useState(5)

  // Simulated data
  const latencyValues = [120, 180, 250, 300, 280, 450, 520, 380, 600, 350, 290, 480, 550, 200, 310]
  const errorRateValues = [1, 2, 1, 3, 4, 6, 2, 1, 8, 3, 2, 5, 7, 1, 3]

  const latencyAlerts = latencyValues.filter(v => v > latencyThreshold).length
  const errorAlerts = errorRateValues.filter(v => v > errorRateThreshold).length
  const totalSamples = latencyValues.length
  const noiseRatio = Math.round(((latencyAlerts + errorAlerts) / (totalSamples * 2)) * 100)

  return (
    <DiagramBox title="🔔 Alert Threshold Tuner — Signal vs Noise">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Tune alert thresholds to balance between missing real incidents (too loose) and
        alert fatigue (too tight). The bars show sample values — red bars breach the threshold.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 120 }}>Latency (ms)</span>
          <input type="range" min={100} max={1000} step={10} value={latencyThreshold}
            onChange={e => setLatencyThreshold(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{latencyThreshold}ms</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 120 }}>Error Rate (%)</span>
          <input type="range" min={1} max={20} step={1} value={errorRateThreshold}
            onChange={e => setErrorRateThreshold(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{errorRateThreshold}%</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 120 }}>Window (min)</span>
          <input type="range" min={1} max={30} step={1} value={windowMinutes}
            onChange={e => setWindowMinutes(+e.target.value)} style={{ flex: 1 }} />
          <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text }}>{windowMinutes}m</span>
        </div>
      </div>

      {/* Latency bar chart */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: c.blue, marginBottom: 4 }}>Latency Samples</div>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 60 }}>
          {latencyValues.map((v, i) => (
            <div key={i} style={{
              flex: 1, height: `${(v / 700) * 100}%`,
              borderRadius: 2,
              background: v > latencyThreshold ? c.rose : c.emerald,
              transition: 'background 0.2s ease',
            }} />
          ))}
        </div>
        <div style={{ height: 1, background: c.border, marginTop: 2, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, bottom: 0,
            width: '100%', borderTop: `1.5px dashed ${c.rose}`,
            transform: `translateY(-${(latencyThreshold / 700) * 60}px)`,
          }} />
        </div>
      </div>

      <MathBlock>{`Alert Rule: IF p95_latency > ${latencyThreshold}ms OR error_rate > ${errorRateThreshold}% OVER ${windowMinutes}min → PAGE`}</MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Latency alerts" value={`${latencyAlerts}/${totalSamples}`} color={latencyAlerts > 3 ? c.rose : c.emerald} />
        <InfoPill label="Error alerts" value={`${errorAlerts}/${totalSamples}`} color={errorAlerts > 3 ? c.rose : c.emerald} />
        <InfoPill label="Noise ratio" value={`${noiseRatio}%`} color={noiseRatio > 30 ? c.rose : noiseRatio > 15 ? c.amber : c.emerald} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Log Structure Explorer
// ══════════════════════════════════════════════════════════════════════════

export function LogStructureExplorer() {
  const c = useDiagramColors()
  const [structured, setStructured] = useState(true)

  const unstructuredLogs = [
    'INFO 2025-01-15 10:30:01 Agent completed task for user 123 in 850ms',
    'WARN 2025-01-15 10:30:02 Tool "search_docs" returned 0 results. Retrying...',
    'ERROR 2025-01-15 10:30:03 LLM call failed: rate limit exceeded (429)',
    'INFO 2025-01-15 10:30:04 Fallback to cached response for query "revenue Q4"',
    'DEBUG 2025-01-15 10:30:05 Token usage: prompt=350, completion=180, total=530',
  ]

  const structuredLogs = [
    { level: 'info', ts: '2025-01-15T10:30:01Z', msg: 'agent_complete', user_id: '123', duration_ms: 850, tokens: 530 },
    { level: 'warn', ts: '2025-01-15T10:30:02Z', msg: 'tool_empty_result', tool: 'search_docs', retry: true },
    { level: 'error', ts: '2025-01-15T10:30:03Z', msg: 'llm_call_failed', error: 'rate_limit', status: 429 },
    { level: 'info', ts: '2025-01-15T10:30:04Z', msg: 'fallback_used', query: 'revenue Q4', source: 'cache' },
    { level: 'debug', ts: '2025-01-15T10:30:05Z', msg: 'token_usage', prompt: 350, completion: 180, total: 530 },
  ]

  const levelColor: Record<string, string> = { info: c.blue, warn: c.amber, error: c.rose, debug: c.textMuted }

  return (
    <DiagramBox title="📝 Log Structure Explorer — Plain Text vs Structured JSON">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Structured logs are machine-parseable and queryable. Toggle between plain text and
        JSON to see the difference in searchability and analysis potential.
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setStructured(false)} style={{
          padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
          border: !structured ? `2px solid ${c.rose}` : `1px solid ${c.border}`,
          background: !structured ? `${c.rose}15` : 'transparent',
          color: !structured ? c.rose : c.textMuted,
        }}>Unstructured</button>
        <button onClick={() => setStructured(true)} style={{
          padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
          border: structured ? `2px solid ${c.emerald}` : `1px solid ${c.border}`,
          background: structured ? `${c.emerald}15` : 'transparent',
          color: structured ? c.emerald : c.textMuted,
        }}>Structured JSON</button>
      </div>

      <div style={{
        fontFamily: 'monospace', fontSize: 10, padding: 12, borderRadius: 8,
        background: c.surfaceAlt, border: `1px solid ${c.border}`,
        maxHeight: 220, overflow: 'auto',
      }}>
        {structured ? (
          structuredLogs.map((log, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <span style={{ color: levelColor[log.level], fontWeight: 700 }}>[{log.level.toUpperCase()}]</span>{' '}
              <span style={{ color: c.text }}>{JSON.stringify(log, null, 0)}</span>
            </div>
          ))
        ) : (
          unstructuredLogs.map((line, i) => {
            const lvl = line.startsWith('ERROR') ? 'error' : line.startsWith('WARN') ? 'warn' : line.startsWith('DEBUG') ? 'debug' : 'info'
            return (
              <div key={i} style={{ marginBottom: 4, color: levelColor[lvl] }}>{line}</div>
            )
          })
        )}
      </div>

      <div style={{
        padding: 10, borderRadius: 8, fontSize: 11, color: c.textLight,
        background: c.surfaceAlt, border: `1px solid ${c.border}`,
      }}>
        {structured
          ? '✅ Structured: Queryable (e.g., WHERE level="error" AND status=429), auto-indexed, dashboard-ready'
          : '⚠️ Unstructured: Requires regex parsing, error-prone extraction, no native filtering'}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Format" value={structured ? 'JSON (queryable)' : 'Plain text'} color={structured ? c.emerald : c.rose} />
        <InfoPill label="Logs" value={String(structuredLogs.length)} color={c.blue} />
      </div>
    </DiagramBox>
  )
}
