/**
 * AgentMemoryAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Memory Systems.
 * Follows AtomicLLMTrainingVisuals conventions.
 *
 * Exports:
 *  1. EmbeddingSimilarityExplorer – Cosine similarity with slider-driven 2D dot product
 *  2. MemoryRetrievalSimulator    – Precision@k / Recall with threshold slider
 *  3. SlidingWindowVisualizer     – Token budget window animation
 *  4. VectorSpaceProjection       – 2D embedding space with nearest-neighbor search
 */

import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

// ── Theme palette ───────────────────────────────────────────────────────

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
    teal:        dark ? '#2dd4bf' : '#0d9488',
    rose:        dark ? '#fb7185' : '#e11d48',
    roseBg:      dark ? 'rgba(251,113,133,0.12)' : '#ffe4e6',
    sky:         dark ? '#38bdf8' : '#0284c7',
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
      fontSize: 15, color: c.text, background: c.surfaceAlt,
      border: `1px solid ${c.border}`, borderRadius: 8,
      padding: '12px 16px', textAlign: 'center', overflowX: 'auto',
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
// 1. Cosine Similarity Explorer
//    Two 2D vectors you can rotate; shows dot product, magnitude, angle
// ══════════════════════════════════════════════════════════════════════════

export function EmbeddingSimilarityExplorer() {
  const c = useDiagramColors()
  const [angleA, setAngleA] = useState(30)   // degrees
  const [angleB, setAngleB] = useState(60)

  const rad = (deg: number) => (deg * Math.PI) / 180
  const ax = Math.cos(rad(angleA)), ay = Math.sin(rad(angleA))
  const bx = Math.cos(rad(angleB)), by = Math.sin(rad(angleB))
  const dotProduct = ax * bx + ay * by
  const cosineSim = dotProduct  // unit vectors → cos = dot
  const angleBetween = Math.abs(angleA - angleB)

  const cx = 150, cy = 150, len = 110

  const simColor = cosineSim > 0.8 ? c.emerald : cosineSim > 0.4 ? c.amber : c.rose

  return (
    <DiagramBox title="📐 Cosine Similarity — Interactive Vector Explorer">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Embeddings are high-dimensional vectors. <strong>Cosine similarity</strong> measures the angle between them,
        ignoring magnitude. Two memories are "similar" when their vectors point in the same direction.
      </p>

      <MathBlock>
        {'cos(A, B) = (A · B) / (‖A‖ · ‖B‖)  →  For unit vectors: cos(A, B) = A · B'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* SVG plane */}
        <svg width={300} height={300} viewBox="0 0 300 300" style={{
          background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.border}`,
        }}>
          {/* Grid */}
          <line x1={0} y1={cy} x2={300} y2={cy} stroke={c.border} strokeWidth={1} />
          <line x1={cx} y1={0} x2={cx} y2={300} stroke={c.border} strokeWidth={1} />

          {/* Angle arc */}
          {angleBetween > 0 && (
            <path
              d={`M ${cx + 30 * Math.cos(rad(angleA))} ${cy - 30 * Math.sin(rad(angleA))}
                  A 30 30 0 ${angleBetween > 180 ? 1 : 0} ${angleB > angleA ? 0 : 1}
                  ${cx + 30 * Math.cos(rad(angleB))} ${cy - 30 * Math.sin(rad(angleB))}`}
              fill="none" stroke={simColor} strokeWidth={2} strokeDasharray="3,3"
            />
          )}

          {/* Vector A */}
          <line x1={cx} y1={cy} x2={cx + ax * len} y2={cy - ay * len}
            stroke={c.blue} strokeWidth={3} />
          <circle cx={cx + ax * len} cy={cy - ay * len} r={5} fill={c.blue} />
          <text x={cx + ax * len + 8} y={cy - ay * len - 8}
            fontSize={12} fontWeight={700} fill={c.blue}>A</text>

          {/* Vector B */}
          <line x1={cx} y1={cy} x2={cx + bx * len} y2={cy - by * len}
            stroke={c.purple} strokeWidth={3} />
          <circle cx={cx + bx * len} cy={cy - by * len} r={5} fill={c.purple} />
          <text x={cx + bx * len + 8} y={cy - by * len - 8}
            fontSize={12} fontWeight={700} fill={c.purple}>B</text>

          {/* Angle label */}
          <text x={cx + 42} y={cy - 35} fontSize={11} fontWeight={600} fill={simColor}>
            {angleBetween.toFixed(0)}°
          </text>
        </svg>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            Vector A angle
            <input type="range" min={0} max={360} value={angleA}
              onChange={e => setAngleA(Number(e.target.value))} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.blue }}>{angleA}°</span>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            Vector B angle
            <input type="range" min={0} max={360} value={angleB}
              onChange={e => setAngleB(Number(e.target.value))} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.purple }}>{angleB}°</span>
          </label>

          {/* Results */}
          <div style={{
            padding: 12, borderRadius: 8, background: c.surfaceAlt,
            border: `1px solid ${c.border}`,
          }}>
            <div style={{ fontSize: 12, color: c.textLight, marginBottom: 8 }}>Results:</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: simColor, marginBottom: 4 }}>
              {cosineSim.toFixed(3)}
            </div>
            <div style={{ fontSize: 11, color: c.textMuted }}>cosine similarity</div>
            <div style={{ marginTop: 8, fontSize: 11, color: c.textLight }}>
              A · B = {dotProduct.toFixed(4)}
            </div>
            <div style={{ fontSize: 11, color: c.textLight }}>
              Angle = {angleBetween.toFixed(1)}°
            </div>
            <div style={{
              marginTop: 8, fontSize: 11, fontWeight: 700, padding: '4px 8px',
              borderRadius: 4, display: 'inline-block',
              color: simColor, background: `${simColor}15`,
            }}>
              {cosineSim > 0.8 ? '✓ Very similar' : cosineSim > 0.4 ? '~ Somewhat similar' : '✕ Dissimilar'}
            </div>
          </div>
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Memory Retrieval Simulator
//    Shows precision@k and recall as threshold changes
// ══════════════════════════════════════════════════════════════════════════

const sampleMemories = [
  { id: 1, text: 'User prefers dark mode', score: 0.95, relevant: true },
  { id: 2, text: 'Last order was pizza', score: 0.88, relevant: true },
  { id: 3, text: 'Weather was sunny today', score: 0.72, relevant: false },
  { id: 4, text: 'User birthday in March', score: 0.65, relevant: true },
  { id: 5, text: 'Discussed TypeScript types', score: 0.58, relevant: false },
  { id: 6, text: 'Mentioned React hooks', score: 0.52, relevant: false },
  { id: 7, text: 'Likes hiking on weekends', score: 0.45, relevant: true },
  { id: 8, text: 'Random system log entry', score: 0.30, relevant: false },
  { id: 9, text: 'Old conversation fragment', score: 0.22, relevant: false },
  { id: 10, text: 'Test memory entry', score: 0.10, relevant: false },
]

export function MemoryRetrievalSimulator() {
  const c = useDiagramColors()
  const [threshold, setThreshold] = useState(0.6)
  const [topK, setTopK] = useState(5)

  const retrieved = sampleMemories.filter(m => m.score >= threshold).slice(0, topK)
  const totalRelevant = sampleMemories.filter(m => m.relevant).length
  const truePositives = retrieved.filter(m => m.relevant).length
  const precision = retrieved.length > 0 ? truePositives / retrieved.length : 0
  const recall = totalRelevant > 0 ? truePositives / totalRelevant : 0
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0

  return (
    <DiagramBox title="🎯 Memory Retrieval Quality — Precision@k & Recall">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        When an agent retrieves memories, it uses a <strong>similarity threshold</strong> and <strong>top-k</strong> limit.
        Tune these to balance between missing relevant memories (low recall) and injecting noise (low precision).
      </p>

      <MathBlock>
        {'Precision@k = |relevant ∩ retrieved| / |retrieved|    Recall = |relevant ∩ retrieved| / |total relevant|'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Similarity threshold
          <input type="range" min={0} max={100} value={threshold * 100}
            onChange={e => setThreshold(Number(e.target.value) / 100)} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.purple }}>{threshold.toFixed(2)}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Top-k limit
          <input type="range" min={1} max={10} value={topK}
            onChange={e => setTopK(Number(e.target.value))} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.blue }}>{topK}</span>
        </label>
      </div>

      {/* Memory list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {sampleMemories.map(mem => {
          const isRetrieved = retrieved.some(r => r.id === mem.id)
          const barWidth = `${mem.score * 100}%`
          return (
            <div key={mem.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 8px', borderRadius: 6,
              background: isRetrieved ? (mem.relevant ? c.emeraldBg : c.roseBg) : c.surfaceAlt,
              border: `1px solid ${isRetrieved ? (mem.relevant ? `${c.emerald}30` : `${c.rose}30`) : c.border}`,
              opacity: isRetrieved ? 1 : 0.5,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, minWidth: 20 }}>#{mem.id}</span>
              <div style={{ flex: 1, fontSize: 12, color: c.text }}>{mem.text}</div>
              <div style={{ width: 60, height: 6, borderRadius: 3, background: c.border, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: barWidth, borderRadius: 3,
                  background: mem.relevant ? c.emerald : c.rose,
                }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.textLight, minWidth: 30 }}>
                {mem.score.toFixed(2)}
              </span>
              {mem.relevant && <span style={{ fontSize: 10 }}>✓</span>}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Precision@k" value={precision.toFixed(2)} color={c.emerald} />
        <InfoPill label="Recall" value={recall.toFixed(2)} color={c.blue} />
        <InfoPill label="F1" value={f1.toFixed(2)} color={c.purple} />
        <InfoPill label="Retrieved" value={`${retrieved.length}/${sampleMemories.length}`} color={c.amber} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Sliding Window Token Budget
//    Animated visualization of context window management
// ══════════════════════════════════════════════════════════════════════════

const windowMessages = [
  { role: 'system', tokens: 200, summary: 'System prompt (always retained)' },
  { role: 'user', tokens: 150, summary: 'Tell me about React hooks' },
  { role: 'assistant', tokens: 300, summary: 'React hooks are functions that...' },
  { role: 'user', tokens: 80, summary: 'What about useEffect?' },
  { role: 'assistant', tokens: 450, summary: 'useEffect lets you perform side...' },
  { role: 'user', tokens: 120, summary: 'Show me an example' },
  { role: 'assistant', tokens: 600, summary: 'Here is a useEffect example:...' },
  { role: 'user', tokens: 90, summary: 'How about cleanup functions?' },
  { role: 'assistant', tokens: 350, summary: 'Cleanup functions run when...' },
  { role: 'user', tokens: 100, summary: 'Thanks, now explain useMemo' },
]

export function SlidingWindowVisualizer() {
  const c = useDiagramColors()
  const [maxTokens, setMaxTokens] = useState(2000)
  const [messageCount, setMessageCount] = useState(5)

  // Build window: always keep system + most recent that fit
  const visibleMessages = useMemo(() => {
    const msgs = windowMessages.slice(0, messageCount)
    if (msgs.length === 0) return []

    const system = msgs[0]
    let budget = maxTokens - system.tokens
    const kept = [system]
    // work backward from most recent
    const rest = msgs.slice(1).reverse()
    for (const m of rest) {
      if (budget >= m.tokens) {
        kept.splice(1, 0, m) // insert after system
        budget -= m.tokens
      }
    }
    return kept
  }, [maxTokens, messageCount])

  const totalTokens = visibleMessages.reduce((s, m) => s + m.tokens, 0)
  const evictedCount = Math.max(0, messageCount - visibleMessages.length)

  return (
    <DiagramBox title="📏 Sliding Window — Token Budget Visualizer">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Working memory is bounded by the <strong>context window</strong>. When messages exceed the budget,
        oldest messages are evicted (sliding window). System prompt is always retained.
      </p>

      <MathBlock>
        {'Context = System + most_recent(msgs) where Σ tokens(msg) ≤ max_tokens'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Max tokens
          <input type="range" min={500} max={4000} step={100} value={maxTokens}
            onChange={e => setMaxTokens(Number(e.target.value))} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.purple }}>{maxTokens.toLocaleString()}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Messages sent
          <input type="range" min={1} max={10} value={messageCount}
            onChange={e => setMessageCount(Number(e.target.value))} style={{ width: 160 }} />
          <span style={{ fontWeight: 700, color: c.blue }}>{messageCount}</span>
        </label>
      </div>

      {/* Token budget bar */}
      <div>
        <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4 }}>
          Token usage: {totalTokens.toLocaleString()} / {maxTokens.toLocaleString()}
        </div>
        <div style={{ height: 12, borderRadius: 6, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 6,
            width: `${Math.min((totalTokens / maxTokens) * 100, 100)}%`,
            background: totalTokens > maxTokens * 0.9 ? c.rose : totalTokens > maxTokens * 0.7 ? c.amber : c.emerald,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Message blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {windowMessages.slice(0, messageCount).map((msg, i) => {
          const isVisible = visibleMessages.includes(msg)
          const roleColor = msg.role === 'system' ? c.amber : msg.role === 'user' ? c.blue : c.emerald
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 10px', borderRadius: 6,
              background: isVisible ? c.surfaceAlt : `${c.rose}08`,
              border: `1px solid ${isVisible ? c.border : `${c.rose}20`}`,
              opacity: isVisible ? 1 : 0.35,
              transition: 'all 0.3s ease',
              textDecoration: isVisible ? 'none' : 'line-through',
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                padding: '2px 6px', borderRadius: 4,
                background: `${roleColor}20`, color: roleColor,
              }}>{msg.role}</span>
              <span style={{ flex: 1, fontSize: 12, color: c.text }}>{msg.summary}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: c.textMuted }}>{msg.tokens} tok</span>
              {!isVisible && <span style={{ fontSize: 10, color: c.rose }}>evicted</span>}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="In context" value={`${visibleMessages.length} messages`} color={c.emerald} />
        <InfoPill label="Evicted" value={`${evictedCount} messages`} color={c.rose} />
        <InfoPill label="Utilization" value={`${Math.round((totalTokens / maxTokens) * 100)}%`} color={c.blue} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. 2D Vector Space Projection
//    Clickable points showing nearest-neighbor search
// ══════════════════════════════════════════════════════════════════════════

interface VPoint {
  x: number; y: number; label: string; category: 'food' | 'tech' | 'sports' | 'query'
}

const embeddingPoints: VPoint[] = [
  { x: 60, y: 80, label: 'pizza', category: 'food' },
  { x: 90, y: 60, label: 'pasta', category: 'food' },
  { x: 75, y: 100, label: 'sushi', category: 'food' },
  { x: 45, y: 90, label: 'burger', category: 'food' },
  { x: 280, y: 70, label: 'React', category: 'tech' },
  { x: 310, y: 50, label: 'TypeScript', category: 'tech' },
  { x: 260, y: 90, label: 'Python', category: 'tech' },
  { x: 295, y: 110, label: 'Node.js', category: 'tech' },
  { x: 170, y: 250, label: 'soccer', category: 'sports' },
  { x: 200, y: 270, label: 'basketball', category: 'sports' },
  { x: 150, y: 280, label: 'tennis', category: 'sports' },
]

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export function VectorSpaceProjection() {
  const c = useDiagramColors()
  const [queryPoint, setQueryPoint] = useState<{ x: number; y: number }>({ x: 180, y: 160 })
  const [k, setK] = useState(3)

  const withDist = embeddingPoints.map(p => ({ ...p, dist: dist(p, queryPoint) }))
  const sorted = [...withDist].sort((a, b) => a.dist - b.dist)
  const nearest = sorted.slice(0, k)
  const nearestSet = new Set(nearest.map(n => n.label))

  const catColor = (cat: string) => {
    switch (cat) {
      case 'food': return c.amber
      case 'tech': return c.blue
      case 'sports': return c.emerald
      default: return c.purple
    }
  }

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 380
    const y = ((e.clientY - rect.top) / rect.height) * 320
    setQueryPoint({ x: Math.max(10, Math.min(370, x)), y: Math.max(10, Math.min(310, y)) })
  }

  return (
    <DiagramBox title="🗺 Vector Space — k-Nearest Neighbor Search">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Memories are stored as vectors in an embedding space. <strong>Click anywhere</strong> on the plane to
        move the query point (★). The k-nearest neighbors are highlighted — this is how semantic memory retrieval works.
      </p>

      <MathBlock>
        {'dist(q, mᵢ) = √Σ(qⱼ − mᵢⱼ)²    →    Retrieve top-k with smallest distance'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <svg width={380} height={320} viewBox="0 0 380 320"
          onClick={handleSvgClick}
          style={{
            cursor: 'crosshair', background: c.surfaceAlt,
            borderRadius: 8, border: `1px solid ${c.border}`,
          }}>
          {/* Nearest-neighbor lines */}
          {nearest.map(n => (
            <line key={`line-${n.label}`}
              x1={queryPoint.x} y1={queryPoint.y} x2={n.x} y2={n.y}
              stroke={catColor(n.category)} strokeWidth={1.5} strokeDasharray="4,4"
              style={{ transition: 'all 0.3s ease' }}
            />
          ))}

          {/* Points */}
          {embeddingPoints.map(p => {
            const isNN = nearestSet.has(p.label)
            return (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r={isNN ? 8 : 5}
                  fill={isNN ? catColor(p.category) : `${catColor(p.category)}60`}
                  stroke={isNN ? c.white : 'none'} strokeWidth={isNN ? 2 : 0}
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text x={p.x + 10} y={p.y + 4} fontSize={10} fontWeight={isNN ? 700 : 400}
                  fill={isNN ? c.text : c.textMuted}>
                  {p.label}
                </text>
              </g>
            )
          })}

          {/* Query point */}
          <text x={queryPoint.x} y={queryPoint.y + 5} textAnchor="middle" fontSize={18}
            style={{ transition: 'all 0.3s ease', cursor: 'move' }}>★</text>
          <text x={queryPoint.x + 12} y={queryPoint.y - 8} fontSize={10} fontWeight={700} fill={c.purple}>
            query
          </text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 180 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
            k (neighbors)
            <input type="range" min={1} max={8} value={k}
              onChange={e => setK(Number(e.target.value))} style={{ width: '100%' }} />
            <span style={{ fontWeight: 700, color: c.purple }}>{k}</span>
          </label>

          <div style={{ fontSize: 12, fontWeight: 600, color: c.textLight, marginTop: 8 }}>Nearest neighbors:</div>
          {nearest.map((n, i) => (
            <div key={n.label} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 8px', borderRadius: 4,
              background: `${catColor(n.category)}15`,
              border: `1px solid ${catColor(n.category)}30`,
              fontSize: 11, color: c.text,
            }}>
              <span style={{ fontWeight: 800, color: catColor(n.category) }}>#{i + 1}</span>
              {n.label}
              <span style={{ marginLeft: 'auto', fontSize: 10, color: c.textMuted }}>
                d={n.dist.toFixed(0)}
              </span>
            </div>
          ))}

          {/* Legend */}
          <div style={{ marginTop: 8, fontSize: 11, color: c.textMuted }}>
            {[
              { cat: 'food', color: c.amber },
              { cat: 'tech', color: c.blue },
              { cat: 'sports', color: c.emerald },
            ].map(l => (
              <div key={l.cat} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                {l.cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramBox>
  )
}
