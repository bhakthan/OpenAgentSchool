/**
 * AgentReasoningAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Reasoning Patterns.
 * Follows the same conventions as AtomicLLMTrainingVisuals.tsx:
 * useTheme + inline CSS for SVG reliability, self-contained exports.
 *
 * Exports:
 *  1. InteractiveCoTTrace        – Animated token-by-token chain-of-thought trace
 *  2. TreeOfThoughtExplorer      – Interactive branching tree with BFS/DFS/Beam toggle
 *  3. GoTGraphBuilder            – DAG builder showing merge & refine operations
 *  4. ReflexionLoopSimulator     – Self-critique loop with iteration counter
 *  5. ReasoningComplexityExplorer – Slider-driven O(b^d) branching factor visualizer
 */

import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

// ── Theme-aware palette (matches AtomicLLMTrainingVisuals) ──────────────

function useDiagramColors() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return useMemo(() => ({
    dark,
    bg:          dark ? '#1a1a2e' : '#ffffff',
    surface:     dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
    surfaceAlt:  dark ? 'rgba(255,255,255,0.06)' : '#f8f9fb',
    border:      dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    borderLight: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    shadow:      dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)',
    text:        dark ? '#e2e8f0' : '#1e293b',
    textMuted:   dark ? 'rgba(226,232,240,0.5)' : 'rgba(30,41,59,0.45)',
    textLight:   dark ? 'rgba(226,232,240,0.7)' : 'rgba(30,41,59,0.6)',
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
    rose:        dark ? '#fb7185' : '#e11d48',
    roseBg:      dark ? 'rgba(251,113,133,0.12)' : '#ffe4e6',
    sky:         dark ? '#38bdf8' : '#0284c7',
    skyBg:       dark ? 'rgba(56,189,248,0.15)' : '#e0f2fe',
    violet:      dark ? '#a78bfa' : '#7c3aed',
    violetBg:    dark ? 'rgba(167,139,250,0.15)' : '#ede9fe',
    slate:       dark ? '#94a3b8' : '#475569',
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

// ── Shared wrapper ──────────────────────────────────────────────────────

function DiagramBox({ title, children, className = '' }: {
  title: string; children: ReactNode; className?: string
}) {
  const c = useDiagramColors()
  return (
    <div
      className={className}
      style={{
        marginTop: 24, borderRadius: 12,
        border: `1px solid ${c.amberBorder}`,
        background: c.dark
          ? `linear-gradient(180deg, rgba(251,191,36,0.04) 0%, ${c.bg} 100%)`
          : `linear-gradient(180deg, rgba(251,191,36,0.06) 0%, #fff 100%)`,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
        boxShadow: `0 1px 3px ${c.shadow}`,
      }}
    >
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
      fontFamily: "'Cambria Math', 'STIX Two Math', 'Latin Modern Math', Georgia, serif",
      fontSize: 15, color: c.text, background: c.surfaceAlt,
      border: `1px solid ${c.border}`, borderRadius: 8,
      padding: '12px 16px', textAlign: 'center', lineHeight: 1.6,
      overflowX: 'auto',
    }}>
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


// ══════════════════════════════════════════════════════════════════════════
// 1. Interactive Chain-of-Thought Trace
//    Animates token-by-token reasoning, showing how each step builds linearly
// ══════════════════════════════════════════════════════════════════════════

const cotSteps = [
  { label: 'Parse problem', thought: 'A train travels 120 mi in 2 hrs, stops 30 min, then 90 mi in 1.5 hrs.', status: 'ok' as const },
  { label: 'Identify goal', thought: 'Find average speed for entire journey.', status: 'ok' as const },
  { label: 'Total distance', thought: 'Distance = 120 + 90 = 210 miles', status: 'ok' as const },
  { label: 'Total time', thought: 'Time = 2 + 0.5 + 1.5 = 4.0 hours', status: 'ok' as const },
  { label: 'Compute', thought: 'Speed = Distance / Time = 210 / 4.0 = 52.5 mph', status: 'ok' as const },
  { label: 'Verify', thought: '✓  52.5 × 4 = 210 ✓  Units: miles/hour ✓', status: 'ok' as const },
]

export function InteractiveCoTTrace() {
  const c = useDiagramColors()
  const [visibleStep, setVisibleStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    if (visibleStep >= cotSteps.length) { setIsPlaying(false); return }
    const t = setTimeout(() => setVisibleStep(s => s + 1), 900)
    return () => clearTimeout(t)
  }, [isPlaying, visibleStep])

  const reset = () => { setVisibleStep(0); setIsPlaying(false) }
  const play = () => { if (visibleStep >= cotSteps.length) setVisibleStep(0); setIsPlaying(true) }

  return (
    <DiagramBox title="🔗 Chain-of-Thought — Linear Token Trace">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        CoT proceeds as a <strong>single linked list</strong> of thoughts. Each step sees only the prior chain—no branching, no backtracking.
        Error at step <em>k</em> propagates to all steps &gt; <em>k</em>.
      </p>

      <MathBlock>
        CoT(x) = t₁ → t₂ → … → tₙ → answer,  where  tₖ = LLM(x, t₁, …, tₖ₋₁)
      </MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={play} style={{
          padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: c.emerald, color: '#fff', fontWeight: 700, fontSize: 12,
        }}>{isPlaying ? '⏸ Pause' : '▶ Play Trace'}</button>
        <button onClick={reset} style={{
          padding: '6px 16px', borderRadius: 6, border: `1px solid ${c.border}`, cursor: 'pointer',
          background: 'transparent', color: c.textLight, fontWeight: 600, fontSize: 12,
        }}>↺ Reset</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cotSteps.map((step, i) => {
          const shown = i < visibleStep
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              opacity: shown ? 1 : 0.15,
              transform: shown ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'all 0.5s ease',
            }}>
              {/* Step number badge */}
              <div style={{
                minWidth: 28, height: 28, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: shown ? c.stageColors[i % c.stageColors.length] : c.surfaceAlt,
                color: shown ? '#fff' : c.textMuted,
                fontSize: 11, fontWeight: 800,
              }}>{i + 1}</div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.stageColors[i % c.stageColors.length], marginBottom: 2 }}>
                  {step.label}
                </div>
                <div style={{
                  fontSize: 13, color: c.text, background: c.surfaceAlt,
                  border: `1px solid ${c.border}`, borderRadius: 6, padding: '6px 10px',
                }}>
                  {step.thought}
                </div>
              </div>

              {/* Connector arrow */}
              {i < cotSteps.length - 1 && (
                <svg width="20" height="28" viewBox="0 0 20 28" style={{ flexShrink: 0, marginTop: 24, opacity: shown ? 0.5 : 0.1 }}>
                  <line x1="10" y1="0" x2="10" y2="20" stroke={c.textMuted} strokeWidth="2" />
                  <polygon points="6,18 10,26 14,18" fill={c.textMuted} />
                </svg>
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4,
      }}>
        <InfoPill label="Complexity" value="O(n) — linear in steps" color={c.emerald} />
        <InfoPill label="Tokens" value="~1× base cost" color={c.blue} />
        <InfoPill label="Backtrack?" value="No" color={c.rose} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Tree-of-Thought Explorer
//    Interactive branching tree with BFS/DFS/Beam strategy toggle
// ══════════════════════════════════════════════════════════════════════════

interface TNode {
  id: string
  label: string
  score: number
  children: TNode[]
  pruned?: boolean
  depth: number
}

const sampleTree: TNode = {
  id: 'root', label: 'Problem: "24 Game" with [4,7,8,3]', score: 0, depth: 0,
  children: [
    {
      id: 'a', label: '8 - 4 = 4', score: 5, depth: 1,
      children: [
        { id: 'a1', label: '4 × 7 = 28', score: 3, depth: 2, pruned: true, children: [] },
        {
          id: 'a2', label: '7 - 4 = 3', score: 7, depth: 2,
          children: [
            { id: 'a2a', label: '3 × 3 = 9', score: 2, depth: 3, pruned: true, children: [] },
            { id: 'a2b', label: '3 × 8 = 24 ✓', score: 10, depth: 3, children: [] },
          ]
        },
      ]
    },
    {
      id: 'b', label: '7 × 3 = 21', score: 4, depth: 1,
      children: [
        { id: 'b1', label: '21 + 8 = 29', score: 1, depth: 2, pruned: true, children: [] },
        { id: 'b2', label: '21 + 4 = 25', score: 2, depth: 2, pruned: true, children: [] },
      ]
    },
    {
      id: 'c', label: '4 + 3 = 7', score: 3, depth: 1, pruned: true,
      children: []
    }
  ]
}

type SearchStrategy = 'bfs' | 'dfs' | 'beam'

function getTraversalOrder(node: TNode, strategy: SearchStrategy, beamWidth = 2): string[] {
  const order: string[] = []
  if (strategy === 'bfs') {
    const queue: TNode[] = [node]
    while (queue.length > 0) {
      const curr = queue.shift()!
      order.push(curr.id)
      queue.push(...curr.children)
    }
  } else if (strategy === 'dfs') {
    const stack: TNode[] = [node]
    while (stack.length > 0) {
      const curr = stack.pop()!
      order.push(curr.id)
      stack.push(...[...curr.children].reverse())
    }
  } else {
    // beam: level by level, keep top-k
    let level: TNode[] = [node]
    while (level.length > 0) {
      level.sort((a, b) => b.score - a.score)
      const kept = level.slice(0, beamWidth)
      kept.forEach(n => order.push(n.id))
      level = kept.flatMap(n => n.children)
    }
  }
  return order
}

export function TreeOfThoughtExplorer() {
  const c = useDiagramColors()
  const [strategy, setStrategy] = useState<SearchStrategy>('beam')
  const [beamWidth, setBeamWidth] = useState(2)
  const [exploredStep, setExploredStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const traversalOrder = useMemo(
    () => getTraversalOrder(sampleTree, strategy, beamWidth),
    [strategy, beamWidth]
  )

  const explored = useMemo(() => new Set(traversalOrder.slice(0, exploredStep)), [traversalOrder, exploredStep])

  useEffect(() => {
    if (!isPlaying) return
    if (exploredStep >= traversalOrder.length) { setIsPlaying(false); return }
    const t = setTimeout(() => setExploredStep(s => s + 1), 600)
    return () => clearTimeout(t)
  }, [isPlaying, exploredStep, traversalOrder.length])

  const play = () => {
    if (exploredStep >= traversalOrder.length) setExploredStep(0)
    setIsPlaying(true)
  }

  const branchFactor = 3
  const maxDepth = 3
  const totalNodes = Math.round((Math.pow(branchFactor, maxDepth + 1) - 1) / (branchFactor - 1))

  // Flatten tree for rendering
  function renderNode(node: TNode, x: number, y: number, width: number): ReactNode {
    const isExplored = explored.has(node.id)
    const isActive = traversalOrder[exploredStep - 1] === node.id
    const isPruned = node.pruned

    const childWidth = width / Math.max(node.children.length, 1)
    const nodeColor = isPruned ? c.rose : (node.score >= 7 ? c.emerald : c.blue)

    return (
      <g key={node.id}>
        {/* Edges to children */}
        {node.children.map((child, ci) => {
          const cx = x - width / 2 + childWidth * ci + childWidth / 2
          const cy = y + 70
          return (
            <line key={`e-${child.id}`}
              x1={x} y1={y + 18} x2={cx} y2={cy - 18}
              stroke={explored.has(child.id) ? (child.pruned ? c.rose : c.blue) : c.border}
              strokeWidth={explored.has(child.id) ? 2 : 1}
              strokeDasharray={child.pruned ? '4,4' : 'none'}
              style={{ transition: 'all 0.4s ease' }}
            />
          )
        })}

        {/* Node */}
        <g style={{
          opacity: isExplored ? 1 : 0.2,
          transition: 'opacity 0.4s ease',
        }}>
          <rect
            x={x - 54} y={y - 16} width={108} height={32} rx={6}
            fill={isActive ? `${nodeColor}30` : c.surfaceAlt}
            stroke={isExplored ? nodeColor : c.border}
            strokeWidth={isActive ? 2.5 : 1}
          />
          <text x={x} y={y + 1} textAnchor="middle" fontSize={9} fontWeight={600}
            fill={isExplored ? c.text : c.textMuted}>
            {node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label}
          </text>
          {isExplored && !isPruned && (
            <text x={x + 48} y={y - 6} fontSize={8} fontWeight={700} fill={nodeColor}>
              {node.score}/10
            </text>
          )}
          {isPruned && isExplored && (
            <text x={x + 48} y={y - 6} fontSize={10} fill={c.rose}>✕</text>
          )}
        </g>

        {/* Children */}
        {node.children.map((child, ci) => {
          const cx = x - width / 2 + childWidth * ci + childWidth / 2
          return renderNode(child, cx, y + 70, childWidth)
        })}
      </g>
    )
  }

  return (
    <DiagramBox title="🌳 Tree-of-Thought — Branching Search Explorer">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        ToT explores <strong>multiple reasoning paths</strong> simultaneously. An evaluator scores each node;
        low-scoring branches are <strong style={{ color: c.rose }}>pruned</strong>. Toggle the search strategy to see how exploration order changes.
      </p>

      <MathBlock>
        {'ToT(x, b, d) — Branching factor b, depth d  ⟹  Worst-case nodes explored = O(bᵈ)'}
      </MathBlock>

      {/* Strategy selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {(['bfs', 'dfs', 'beam'] as const).map(s => (
          <button key={s} onClick={() => { setStrategy(s); setExploredStep(0); setIsPlaying(false) }} style={{
            padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700,
            border: strategy === s ? `2px solid ${c.purple}` : `1px solid ${c.border}`,
            background: strategy === s ? c.purpleBg : 'transparent',
            color: strategy === s ? c.purple : c.textLight,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {s === 'bfs' ? '↔ BFS' : s === 'dfs' ? '↕ DFS' : '🔦 Beam'}
          </button>
        ))}

        {strategy === 'beam' && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: c.textLight }}>
            Beam width:
            <input type="range" min={1} max={3} value={beamWidth}
              onChange={e => { setBeamWidth(Number(e.target.value)); setExploredStep(0); setIsPlaying(false) }}
              style={{ width: 60 }} />
            <span style={{ fontWeight: 700, color: c.purple }}>{beamWidth}</span>
          </label>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={play} style={{
          padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: c.emerald, color: '#fff', fontWeight: 700, fontSize: 12,
        }}>{isPlaying ? '⏸ Pause' : '▶ Explore'}</button>
        <button onClick={() => { setExploredStep(0); setIsPlaying(false) }} style={{
          padding: '6px 16px', borderRadius: 6, border: `1px solid ${c.border}`, cursor: 'pointer',
          background: 'transparent', color: c.textLight, fontWeight: 600, fontSize: 12,
        }}>↺ Reset</button>
      </div>

      {/* Tree visualization */}
      <div style={{ overflowX: 'auto' }}>
        <svg width={600} height={280} viewBox="0 0 600 280" style={{
          display: 'block', margin: '0 auto', maxWidth: '100%',
        }}>
          {renderNode(sampleTree, 300, 30, 560)}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Strategy" value={strategy.toUpperCase()} color={c.purple} />
        <InfoPill label="Explored" value={`${exploredStep}/${traversalOrder.length} nodes`} color={c.blue} />
        <InfoPill label="Worst-case" value={`${totalNodes} nodes (b=${branchFactor}, d=${maxDepth})`} color={c.rose} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Graph-of-Thought DAG Builder
//    Shows merge and refine operations on a directed acyclic graph
// ══════════════════════════════════════════════════════════════════════════

interface GNode {
  id: string; label: string; type: 'initial' | 'merge' | 'refine' | 'final'
  x: number; y: number
}
interface GEdge { from: string; to: string }

const gotNodes: GNode[] = [
  { id: 'g1', label: 'Analytical\napproach', type: 'initial', x: 100, y: 40 },
  { id: 'g2', label: 'Creative\napproach', type: 'initial', x: 300, y: 40 },
  { id: 'g3', label: 'Practical\napproach', type: 'initial', x: 500, y: 40 },
  { id: 'm1', label: 'Synthesis\n(merge g1+g2)', type: 'merge', x: 200, y: 120 },
  { id: 'm2', label: 'Synthesis\n(merge m1+g3)', type: 'merge', x: 350, y: 120 },
  { id: 'r1', label: 'Critique →\nRefine', type: 'refine', x: 280, y: 200 },
  { id: 'r2', label: 'Critique →\nRefine', type: 'refine', x: 280, y: 260 },
  { id: 'f1', label: 'Final\nAnswer', type: 'final', x: 280, y: 330 },
]
const gotEdges: GEdge[] = [
  { from: 'g1', to: 'm1' }, { from: 'g2', to: 'm1' },
  { from: 'm1', to: 'm2' }, { from: 'g3', to: 'm2' },
  { from: 'm2', to: 'r1' }, { from: 'r1', to: 'r2' },
  { from: 'r2', to: 'f1' },
]

export function GoTGraphBuilder() {
  const c = useDiagramColors()
  const [visibleCount, setVisibleCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    if (visibleCount >= gotNodes.length) { setIsPlaying(false); return }
    const t = setTimeout(() => setVisibleCount(n => n + 1), 700)
    return () => clearTimeout(t)
  }, [isPlaying, visibleCount])

  const play = () => { if (visibleCount >= gotNodes.length) setVisibleCount(0); setIsPlaying(true) }
  const reset = () => { setVisibleCount(0); setIsPlaying(false) }

  const visibleIds = new Set(gotNodes.slice(0, visibleCount).map(n => n.id))

  const nodeColor = (type: GNode['type']) => {
    switch (type) {
      case 'initial': return c.blue
      case 'merge': return c.purple
      case 'refine': return c.amber
      case 'final': return c.emerald
    }
  }

  return (
    <DiagramBox title="🕸 Graph-of-Thought — DAG with Merge & Refine">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Unlike a tree, GoT allows <strong>merging</strong> multiple reasoning threads and <strong>refining</strong>
        through critique loops. The graph is a DAG (directed acyclic graph) where any node can receive edges from multiple parents.
      </p>

      <MathBlock>
        GoT = (V, E) where V = thoughts, E = dependencies.   Operations: Generate, Merge, Refine, Score.
      </MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={play} style={{
          padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: c.emerald, color: '#fff', fontWeight: 700, fontSize: 12,
        }}>{isPlaying ? '⏸ Pause' : '▶ Build Graph'}</button>
        <button onClick={reset} style={{
          padding: '6px 16px', borderRadius: 6, border: `1px solid ${c.border}`, cursor: 'pointer',
          background: 'transparent', color: c.textLight, fontWeight: 600, fontSize: 12,
        }}>↺ Reset</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg width={600} height={370} viewBox="0 0 600 370" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}>
          {/* Edges */}
          {gotEdges.map(e => {
            const from = gotNodes.find(n => n.id === e.from)!
            const to = gotNodes.find(n => n.id === e.to)!
            const visible = visibleIds.has(e.from) && visibleIds.has(e.to)
            return (
              <line key={`${e.from}-${e.to}`}
                x1={from.x} y1={from.y + 16} x2={to.x} y2={to.y - 16}
                stroke={visible ? c.textLight : c.border}
                strokeWidth={visible ? 2 : 1}
                markerEnd={visible ? undefined : undefined}
                style={{ transition: 'all 0.5s ease', opacity: visible ? 1 : 0.15 }}
              />
            )
          })}

          {/* Arrowheads for visible edges */}
          {gotEdges.map(e => {
            const from = gotNodes.find(n => n.id === e.from)!
            const to = gotNodes.find(n => n.id === e.to)!
            const visible = visibleIds.has(e.from) && visibleIds.has(e.to)
            if (!visible) return null
            const dx = to.x - from.x
            const dy = (to.y - 16) - (from.y + 16)
            const len = Math.sqrt(dx * dx + dy * dy)
            const ux = dx / len, uy = dy / len
            const ax = to.x - ux * 16, ay = to.y - 16 - uy * 16
            return (
              <polygon key={`arr-${e.from}-${e.to}`}
                points={`${ax - uy * 4},${ay + ux * 4} ${to.x - ux * 2},${to.y - 16 - uy * 2} ${ax + uy * 4},${ay - ux * 4}`}
                fill={c.textLight}
                style={{ transition: 'all 0.5s ease' }}
              />
            )
          })}

          {/* Nodes */}
          {gotNodes.map(node => {
            const visible = visibleIds.has(node.id)
            const color = nodeColor(node.type)
            const lines = node.label.split('\n')
            return (
              <g key={node.id} style={{
                opacity: visible ? 1 : 0.12,
                transition: 'opacity 0.5s ease',
              }}>
                <rect
                  x={node.x - 58} y={node.y - 16} width={116} height={32} rx={8}
                  fill={visible ? `${color}20` : c.surfaceAlt}
                  stroke={visible ? color : c.border}
                  strokeWidth={visible ? 2 : 1}
                />
                {lines.map((line, li) => (
                  <text key={li} x={node.x} y={node.y - 3 + li * 13}
                    textAnchor="middle" fontSize={9} fontWeight={600}
                    fill={visible ? c.text : c.textMuted}>
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { type: 'initial', label: 'Initial thoughts', color: c.blue },
          { type: 'merge', label: 'Merge (synthesize)', color: c.purple },
          { type: 'refine', label: 'Refine (critique)', color: c.amber },
          { type: 'final', label: 'Final answer', color: c.emerald },
        ].map(l => (
          <div key={l.type} style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: c.textLight,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Reflexion Loop Simulator
//    Shows the self-critique → improve cycle with scored iterations
// ══════════════════════════════════════════════════════════════════════════

const reflexionSteps = [
  { attempt: 'First attempt: "The population of Tokyo is 30 million."', critique: 'Inaccurate — metro area ~37M, city proper ~14M. Ambiguous scope.', score: 35 },
  { attempt: 'Revised: "Tokyo metro area has ~37.4 million people (2023)."', critique: 'Better accuracy. Should cite source and clarify metro vs. prefecture.', score: 68 },
  { attempt: 'Revised: "Greater Tokyo Area: 37.4M (UN 2023). Tokyo prefecture: 13.96M."', critique: 'Accurate, sourced, and disambiguated. Minor: should mention it\'s the world\'s largest.', score: 92 },
]

export function ReflexionLoopSimulator() {
  const c = useDiagramColors()
  const [currentIter, setCurrentIter] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    if (currentIter >= reflexionSteps.length) { setIsPlaying(false); return }
    const t = setTimeout(() => setCurrentIter(i => i + 1), 1800)
    return () => clearTimeout(t)
  }, [isPlaying, currentIter])

  const play = () => { if (currentIter >= reflexionSteps.length) setCurrentIter(0); setIsPlaying(true) }

  const barColor = (score: number) => score >= 80 ? c.emerald : score >= 50 ? c.amber : c.rose

  return (
    <DiagramBox title="🔄 Reflexion — Self-Critique Loop Simulator">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Reflexion generates an attempt, <strong>critiques</strong> its own output, stores the reflection in
        <strong> episodic memory</strong>, then produces an improved attempt. Repeats until confidence exceeds threshold.
      </p>

      <MathBlock>
        {'Reflexion: aₖ₊₁ = LLM(problem, aₖ, critiqueₖ, memory[0..k])  until  score(aₖ) ≥ θ'}
      </MathBlock>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={play} style={{
          padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: c.emerald, color: '#fff', fontWeight: 700, fontSize: 12,
        }}>▶ Run Reflexion</button>
        <button onClick={() => { setCurrentIter(0); setIsPlaying(false) }} style={{
          padding: '6px 16px', borderRadius: 6, border: `1px solid ${c.border}`, cursor: 'pointer',
          background: 'transparent', color: c.textLight, fontWeight: 600, fontSize: 12,
        }}>↺ Reset</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reflexionSteps.map((step, i) => {
          const shown = i < currentIter
          return (
            <div key={i} style={{
              opacity: shown ? 1 : 0.15,
              transform: shown ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.6s ease',
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: 12, borderRadius: 8,
              background: c.surfaceAlt, border: `1px solid ${c.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.purple }}>Iteration {i + 1}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: barColor(step.score) }}>{step.score}/100</span>
              </div>

              {/* Attempt */}
              <div style={{ fontSize: 12, color: c.text, padding: '6px 10px', borderRadius: 6, background: c.blueBg, border: `1px solid ${c.blue}30` }}>
                💭 {step.attempt}
              </div>

              {/* Critique */}
              <div style={{ fontSize: 12, color: c.text, padding: '6px 10px', borderRadius: 6, background: c.roseBg, border: `1px solid ${c.rose}30` }}>
                🔍 {step.critique}
              </div>

              {/* Score bar */}
              <div style={{ height: 6, borderRadius: 3, background: c.border, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  width: shown ? `${step.score}%` : '0%',
                  background: barColor(step.score),
                  transition: 'width 0.8s ease',
                }} />
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Iterations" value={`${Math.min(currentIter, reflexionSteps.length)}/${reflexionSteps.length}`} color={c.purple} />
        <InfoPill label="Tokens" value="2–5× base (critique + revise)" color={c.amber} />
        <InfoPill label="Memory" value="Episodic (stores past failures)" color={c.blue} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 5. Reasoning Complexity Explorer
//    Slider-driven O(b^d) branching factor calculator & visualizer
// ══════════════════════════════════════════════════════════════════════════

export function ReasoningComplexityExplorer() {
  const c = useDiagramColors()
  const [branchFactor, setBranchFactor] = useState(3)
  const [depth, setDepth] = useState(3)

  const totalNodes = Math.round((Math.pow(branchFactor, depth + 1) - 1) / (branchFactor - 1))
  const leafNodes = Math.pow(branchFactor, depth)
  const cotNodes = depth + 1
  const beamNodes = useCallback((bw: number) => {
    let sum = 1
    for (let d = 1; d <= depth; d++) sum += Math.min(bw * branchFactor, Math.pow(branchFactor, d))
    return sum
  }, [depth, branchFactor])

  const strategies = [
    { name: 'CoT (linear)', nodes: cotNodes, color: c.emerald, formula: `O(d) = ${cotNodes}` },
    { name: 'Beam (w=2)', nodes: beamNodes(2), color: c.blue, formula: `O(w·b·d) ≈ ${beamNodes(2)}` },
    { name: 'BFS full tree', nodes: totalNodes, color: c.rose, formula: `O(bᵈ⁺¹−1)/(b−1) = ${totalNodes}` },
  ]

  const maxNodes = totalNodes || 1

  return (
    <DiagramBox title="📊 Reasoning Complexity Explorer — O(bᵈ) Visualizer">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Adjust branching factor <strong>b</strong> and depth <strong>d</strong> to see how reasoning costs explode.
        This is why <strong>beam search</strong> and <strong>pruning</strong> are essential for production ToT.
      </p>

      <MathBlock>
        {'Total nodes in full tree = (bᵈ⁺¹ − 1) / (b − 1)   |   Leaf nodes = bᵈ'}
      </MathBlock>

      {/* Sliders */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Branching factor (b)
          <input type="range" min={2} max={5} value={branchFactor}
            onChange={e => setBranchFactor(Number(e.target.value))}
            style={{ width: 140 }} />
          <span style={{ fontWeight: 800, fontSize: 18, color: c.purple, textAlign: 'center' }}>{branchFactor}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: c.textLight }}>
          Depth (d)
          <input type="range" min={1} max={5} value={depth}
            onChange={e => setDepth(Number(e.target.value))}
            style={{ width: 140 }} />
          <span style={{ fontWeight: 800, fontSize: 18, color: c.purple, textAlign: 'center' }}>{depth}</span>
        </label>
      </div>

      {/* Bar chart comparison */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {strategies.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ minWidth: 100, fontSize: 11, fontWeight: 600, color: c.textLight, textAlign: 'right' }}>
              {s.name}
            </div>
            <div style={{ flex: 1, height: 24, borderRadius: 4, background: c.surfaceAlt, overflow: 'hidden', border: `1px solid ${c.border}` }}>
              <div style={{
                height: '100%', borderRadius: 4,
                width: `${Math.max((s.nodes / maxNodes) * 100, 2)}%`,
                background: s.color,
                transition: 'width 0.5s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  {s.nodes.toLocaleString()}
                </span>
              </div>
            </div>
            <div style={{ minWidth: 120, fontSize: 10, color: c.textMuted, fontFamily: 'monospace' }}>
              {s.formula}
            </div>
          </div>
        ))}
      </div>

      {/* Key stats */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Total Nodes" value={totalNodes.toLocaleString()} color={c.rose} />
        <InfoPill label="Leaf Nodes" value={leafNodes.toLocaleString()} color={c.amber} />
        <InfoPill label="Token Cost" value={`~${(totalNodes * 150).toLocaleString()} tokens (full tree)`} color={c.blue} />
        <InfoPill label="CoT Savings" value={`${Math.round((1 - cotNodes / totalNodes) * 100)}% fewer nodes`} color={c.emerald} />
      </div>
    </DiagramBox>
  )
}
