/**
 * MultiAgentAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Multi-Agent Systems.
 *
 * Exports:
 *  1. ContractNetSimulator     – Animated task-announce / bid / award protocol
 *  2. NashEquilibriumExplorer  – 2×2 payoff matrix with interactive strategy selection
 *  3. MessagePassingViz        – Live message flow between agents with topology toggle
 *  4. TaskAllocationOptimizer  – Multi-agent task allocation with capability matching
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
// 1. Contract Net Protocol Simulator
// ══════════════════════════════════════════════════════════════════════════

type CNPPhase = 'announce' | 'bid' | 'evaluate' | 'award'
const cnpPhases: CNPPhase[] = ['announce', 'bid', 'evaluate', 'award']

interface AgentBid {
  agent: string; cost: number; quality: number; score: number
}

export function ContractNetSimulator() {
  const c = useDiagramColors()
  const [phase, setPhase] = useState<CNPPhase>('announce')
  const [taskComplexity, setTaskComplexity] = useState(5)

  const agents: AgentBid[] = useMemo(() => {
    const base = [
      { agent: 'Agent A', cost: 3 + taskComplexity * 0.8, quality: 7 + Math.sin(taskComplexity) * 2 },
      { agent: 'Agent B', cost: 5 + taskComplexity * 0.4, quality: 8 + Math.cos(taskComplexity) },
      { agent: 'Agent C', cost: 2 + taskComplexity * 1.1, quality: 5 + taskComplexity * 0.3 },
      { agent: 'Agent D', cost: 4 + taskComplexity * 0.6, quality: 6 + Math.sin(taskComplexity + 1) * 1.5 },
    ]
    return base.map(a => ({
      ...a,
      cost: Math.round(a.cost * 10) / 10,
      quality: Math.round(Math.min(10, Math.max(1, a.quality)) * 10) / 10,
      score: Math.round((Math.min(10, Math.max(1, a.quality)) / Math.max(0.1, a.cost)) * 100) / 100,
    }))
  }, [taskComplexity])

  const winner = useMemo(() => agents.reduce((best, a) => a.score > best.score ? a : best, agents[0]), [agents])
  const phaseIdx = cnpPhases.indexOf(phase)
  const phaseColors = [c.blue, c.amber, c.purple, c.emerald]

  const nextPhase = useCallback(() => {
    const next = cnpPhases[(phaseIdx + 1) % 4]
    setPhase(next)
  }, [phaseIdx])

  return (
    <DiagramBox title="📋 Contract Net Protocol — Task Allocation Simulation">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        The Contract Net Protocol (CNP) is a foundational multi-agent coordination mechanism.
        A <strong>manager</strong> announces tasks, agents <strong>bid</strong>, bids are <strong>evaluated</strong>,
        and the best agent is <strong>awarded</strong> the contract.
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: c.textLight }}>
          Task complexity:
          <input type="range" min={1} max={10} value={taskComplexity}
            onChange={e => setTaskComplexity(Number(e.target.value))} style={{ width: 100 }} />
          <span style={{ fontWeight: 700, color: c.purple }}>{taskComplexity}</span>
        </label>
        <button onClick={nextPhase} style={{
          padding: '6px 16px', borderRadius: 6, cursor: 'pointer',
          fontSize: 12, fontWeight: 700,
          border: `2px solid ${phaseColors[phaseIdx]}`,
          background: `${phaseColors[phaseIdx]}20`,
          color: phaseColors[phaseIdx],
        }}>
          {phaseIdx < 3 ? `Next: ${cnpPhases[phaseIdx + 1].toUpperCase()}` : '🔄 Restart'}
        </button>
      </div>

      {/* Phase indicator */}
      <div style={{ display: 'flex', gap: 4 }}>
        {cnpPhases.map((p, i) => (
          <div key={p} style={{
            flex: 1, padding: '6px 8px', borderRadius: 6, textAlign: 'center',
            fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            background: i <= phaseIdx ? `${phaseColors[i]}20` : c.surfaceAlt,
            border: `1.5px solid ${i <= phaseIdx ? phaseColors[i] : c.border}`,
            color: i <= phaseIdx ? phaseColors[i] : c.textMuted,
            transition: 'all 0.3s ease',
          }}>
            {i <= phaseIdx ? '✓ ' : ''}{p}
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {agents.map(a => {
          const isWinner = a.agent === winner.agent && phase === 'award'
          return (
            <div key={a.agent} style={{
              padding: 12, borderRadius: 8,
              background: isWinner ? `${c.emerald}15` : c.surfaceAlt,
              border: `1.5px solid ${isWinner ? c.emerald : c.border}`,
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: isWinner ? c.emerald : c.text }}>
                {a.agent} {isWinner ? '🏆' : ''}
              </div>
              {phaseIdx >= 1 && (
                <div style={{ marginTop: 6, fontSize: 11, color: c.textLight }}>
                  <div>Cost: <span style={{ fontWeight: 700, color: c.rose }}>{a.cost}</span></div>
                  <div>Quality: <span style={{ fontWeight: 700, color: c.blue }}>{a.quality}</span></div>
                </div>
              )}
              {phaseIdx >= 2 && (
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 800, color: c.purple }}>
                  Score: {a.score}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ fontSize: 11, color: c.textMuted, fontStyle: 'italic' }}>
        Score = quality / cost — higher is better. Adjust complexity to see how bids change.
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Nash Equilibrium Explorer — 2×2 Game Theory Matrix
// ══════════════════════════════════════════════════════════════════════════

type Strategy = 'cooperate' | 'defect'
const strategies: Strategy[] = ['cooperate', 'defect']

const gamePresets: Record<string, { name: string; matrix: number[][][][] }> = {
  prisoners: {
    name: "Prisoner's Dilemma",
    matrix: [
      [[[3, 3]], [[0, 5]]],
      [[[5, 0]], [[1, 1]]],
    ] as unknown as number[][][][],
  },
  stag: {
    name: "Stag Hunt",
    matrix: [
      [[[4, 4]], [[0, 3]]],
      [[[3, 0]], [[2, 2]]],
    ] as unknown as number[][][][],
  },
  chicken: {
    name: "Chicken",
    matrix: [
      [[[3, 3]], [[1, 5]]],
      [[[5, 1]], [[0, 0]]],
    ] as unknown as number[][][][],
  },
}

// Flatten to simple [row][col] = [payoffA, payoffB]
function getPayoff(game: string, r: number, cIdx: number): [number, number] {
  const presets: Record<string, [number, number][][]> = {
    prisoners: [[[3,3],[0,5]],[[5,0],[1,1]]],
    stag:      [[[4,4],[0,3]],[[3,0],[2,2]]],
    chicken:   [[[3,3],[1,5]],[[5,1],[0,0]]],
  }
  return presets[game]?.[r]?.[cIdx] ?? [0,0]
}

export function NashEquilibriumExplorer() {
  const c = useDiagramColors()
  const [game, setGame] = useState<string>('prisoners')
  const [agentAStrat, setAgentAStrat] = useState<Strategy>('cooperate')
  const [agentBStrat, setAgentBStrat] = useState<Strategy>('cooperate')

  const aRow = agentAStrat === 'cooperate' ? 0 : 1
  const bCol = agentBStrat === 'cooperate' ? 0 : 1
  const [payA, payB] = getPayoff(game, aRow, bCol)

  // Find Nash equilibria
  const nashCells: string[] = useMemo(() => {
    const eq: string[] = []
    for (let r = 0; r < 2; r++) {
      for (let cc = 0; cc < 2; cc++) {
        const [pA] = getPayoff(game, r, cc)
        const otherRow = 1 - r
        const [pAother] = getPayoff(game, otherRow, cc)
        const [, pB] = getPayoff(game, r, cc)
        const [, pBother] = getPayoff(game, r, 1 - cc)
        if (pA >= pAother && pB >= pBother) {
          eq.push(`${r}-${cc}`)
        }
      }
    }
    return eq
  }, [game])

  const isNash = nashCells.includes(`${aRow}-${bCol}`)

  return (
    <DiagramBox title="🎲 Nash Equilibrium — Game Theory for Agents">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Multi-agent coordination can be modeled as games. A <strong>Nash Equilibrium</strong> is a
        strategy profile where no agent benefits from unilaterally changing their strategy. Click cells
        or strategies to explore outcomes.
      </p>

      {/* Game selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {Object.entries(gamePresets).map(([key, val]) => (
          <button key={key} onClick={() => setGame(key)} style={{
            padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: game === key ? `2px solid ${c.purple}` : `1px solid ${c.border}`,
            background: game === key ? c.purpleBg : 'transparent',
            color: game === key ? c.purple : c.textLight,
          }}>{val.name}</button>
        ))}
      </div>

      {/* Payoff matrix */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, marginBottom: 8, textAlign: 'center' }}>
            Agent B →
          </div>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 6, fontSize: 10, color: c.textMuted }}>A ↓ / B →</th>
                {strategies.map(s => (
                  <th key={s} style={{
                    padding: '6px 16px', fontSize: 11, textTransform: 'capitalize',
                    color: agentBStrat === s ? c.blue : c.textLight,
                    fontWeight: agentBStrat === s ? 800 : 500,
                    cursor: 'pointer',
                  }} onClick={() => setAgentBStrat(s)}>
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {strategies.map((sA, ri) => (
                <tr key={sA}>
                  <td style={{
                    padding: '6px 12px', fontSize: 11, textTransform: 'capitalize',
                    color: agentAStrat === sA ? c.purple : c.textLight,
                    fontWeight: agentAStrat === sA ? 800 : 500,
                    cursor: 'pointer',
                  }} onClick={() => setAgentAStrat(sA)}>
                    {sA}
                  </td>
                  {strategies.map((sB, ci) => {
                    const [pA, pB] = getPayoff(game, ri, ci)
                    const selected = ri === aRow && ci === bCol
                    const nash = nashCells.includes(`${ri}-${ci}`)
                    return (
                      <td key={`${ri}-${ci}`} onClick={() => { setAgentAStrat(sA); setAgentBStrat(sB) }}
                        style={{
                          padding: '10px 18px', textAlign: 'center', cursor: 'pointer',
                          borderRadius: 6, transition: 'all 0.2s ease',
                          background: selected ? `${c.purple}20` : nash ? `${c.emerald}10` : c.surfaceAlt,
                          border: `2px solid ${selected ? c.purple : nash ? c.emerald : c.border}`,
                          margin: 2,
                        }}>
                        <span style={{ color: c.purple, fontWeight: 700, fontSize: 14 }}>{pA}</span>
                        <span style={{ color: c.textMuted, margin: '0 4px' }}>,</span>
                        <span style={{ color: c.blue, fontWeight: 700, fontSize: 14 }}>{pB}</span>
                        {nash && <div style={{ fontSize: 8, color: c.emerald, fontWeight: 700 }}>NE</div>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Result panel */}
        <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, color: c.textLight }}>
            <strong style={{ color: c.purple }}>Agent A</strong>: {agentAStrat}
          </div>
          <div style={{ fontSize: 12, color: c.textLight }}>
            <strong style={{ color: c.blue }}>Agent B</strong>: {agentBStrat}
          </div>
          <div style={{
            display: 'flex', gap: 8, marginTop: 4,
          }}>
            <InfoPill label="A gets" value={String(payA)} color={c.purple} />
            <InfoPill label="B gets" value={String(payB)} color={c.blue} />
          </div>
          <div style={{
            padding: 8, borderRadius: 6, fontSize: 12, fontWeight: 700, textAlign: 'center',
            background: isNash ? c.emeraldBg : c.roseBg,
            color: isNash ? c.emerald : c.rose,
            border: `1px solid ${isNash ? c.emerald : c.rose}30`,
          }}>
            {isNash ? '✓ Nash Equilibrium' : '✕ Not a Nash Equilibrium'}
          </div>
          <div style={{ fontSize: 10, color: c.textMuted }}>
            {isNash
              ? 'Neither agent benefits from unilaterally switching.'
              : 'At least one agent can improve by switching strategy.'}
          </div>
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Message Passing Visualizer — Topology-aware agent communication
// ══════════════════════════════════════════════════════════════════════════

type Topology = 'ring' | 'star' | 'mesh' | 'hierarchy'

const topologyPositions: Record<Topology, Array<{ x: number; y: number; label: string }>> = {
  ring: [
    { x: 200, y: 30, label: 'A' },
    { x: 340, y: 120, label: 'B' },
    { x: 300, y: 260, label: 'C' },
    { x: 100, y: 260, label: 'D' },
    { x: 60, y: 120, label: 'E' },
  ],
  star: [
    { x: 200, y: 150, label: 'Hub' },
    { x: 200, y: 30, label: 'A' },
    { x: 340, y: 120, label: 'B' },
    { x: 300, y: 270, label: 'C' },
    { x: 100, y: 270, label: 'D' },
    { x: 60, y: 120, label: 'E' },
  ],
  mesh: [
    { x: 100, y: 50, label: 'A' },
    { x: 300, y: 50, label: 'B' },
    { x: 100, y: 250, label: 'C' },
    { x: 300, y: 250, label: 'D' },
  ],
  hierarchy: [
    { x: 200, y: 30, label: 'Leader' },
    { x: 100, y: 140, label: 'Mgr-1' },
    { x: 300, y: 140, label: 'Mgr-2' },
    { x: 50, y: 250, label: 'W-1' },
    { x: 150, y: 250, label: 'W-2' },
    { x: 250, y: 250, label: 'W-3' },
    { x: 350, y: 250, label: 'W-4' },
  ],
}

function getEdges(topo: Topology): Array<[number, number]> {
  switch (topo) {
    case 'ring': return [[0,1],[1,2],[2,3],[3,4],[4,0]]
    case 'star': return [[0,1],[0,2],[0,3],[0,4],[0,5]]
    case 'mesh': return [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
    case 'hierarchy': return [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
  }
}

export function MessagePassingViz() {
  const c = useDiagramColors()
  const [topo, setTopo] = useState<Topology>('ring')
  const [activeMsg, setActiveMsg] = useState<number | null>(null)

  const nodes = topologyPositions[topo]
  const edges = getEdges(topo)

  const topoInfo: Record<Topology, { desc: string; latency: string; fault: string }> = {
    ring: { desc: 'Messages pass sequentially around the ring', latency: 'O(n/2) avg', fault: 'Single failure breaks ring' },
    star: { desc: 'Hub routes all messages centrally', latency: 'O(2) hops', fault: 'Hub is SPOF' },
    mesh: { desc: 'Every agent connects to every other', latency: 'O(1) direct', fault: 'Most resilient (redundant paths)' },
    hierarchy: { desc: 'Tree structure with delegation layers', latency: 'O(log n)', fault: 'Leader failure cascades' },
  }

  return (
    <DiagramBox title="📡 Message Passing — Agent Communication Topologies">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        How agents are connected determines message latency, fault tolerance, and coordination overhead.
        Click an edge to simulate a message passing between agents.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['ring', 'star', 'mesh', 'hierarchy'] as Topology[]).map(t => (
          <button key={t} onClick={() => { setTopo(t); setActiveMsg(null) }} style={{
            padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            textTransform: 'capitalize',
            border: topo === t ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
            background: topo === t ? c.blueBg : 'transparent',
            color: topo === t ? c.blue : c.textLight,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <svg width={400} height={300} viewBox="0 0 400 300"
          style={{ background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.border}`, maxWidth: '100%' }}>
          {/* Edges */}
          {edges.map(([from, to], ei) => (
            <line key={`e-${ei}`}
              x1={nodes[from].x} y1={nodes[from].y}
              x2={nodes[to].x} y2={nodes[to].y}
              stroke={activeMsg === ei ? c.amber : c.border}
              strokeWidth={activeMsg === ei ? 3 : 1.5}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => setActiveMsg(activeMsg === ei ? null : ei)}
            />
          ))}
          {/* Animated message dot */}
          {activeMsg !== null && edges[activeMsg] && (
            <circle r={6} fill={c.amber}>
              <animateMotion dur="1s" repeatCount="indefinite"
                path={`M ${nodes[edges[activeMsg][0]].x} ${nodes[edges[activeMsg][0]].y} L ${nodes[edges[activeMsg][1]].x} ${nodes[edges[activeMsg][1]].y}`}
              />
            </circle>
          )}
          {/* Nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={22}
                fill={c.dark ? '#2a2a4e' : '#fff'}
                stroke={c.stageColors[i % c.stageColors.length]}
                strokeWidth={2.5} />
              <text x={n.x} y={n.y + 4} textAnchor="middle"
                fontSize={11} fontWeight={700}
                fill={c.stageColors[i % c.stageColors.length]}>
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text, textTransform: 'capitalize' }}>{topo}</div>
          <div style={{ fontSize: 12, color: c.textLight }}>{topoInfo[topo].desc}</div>
          <InfoPill label="Latency" value={topoInfo[topo].latency} color={c.blue} />
          <InfoPill label="Fault tolerance" value={topoInfo[topo].fault} color={c.rose} />
          <InfoPill label="Edges" value={String(edges.length)} color={c.purple} />
          <InfoPill label="Nodes" value={String(nodes.length)} color={c.emerald} />
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Task Allocation Optimizer
// ══════════════════════════════════════════════════════════════════════════

interface AgentCap { name: string; skills: Record<string, number> }
interface Task { name: string; requires: string; difficulty: number }

const agentPool: AgentCap[] = [
  { name: 'Researcher', skills: { search: 9, code: 3, write: 7, reason: 8 } },
  { name: 'Coder',      skills: { search: 4, code: 9, write: 4, reason: 6 } },
  { name: 'Writer',     skills: { search: 5, code: 2, write: 9, reason: 5 } },
  { name: 'Analyst',    skills: { search: 7, code: 5, write: 6, reason: 9 } },
]

const taskQueue: Task[] = [
  { name: 'Web search', requires: 'search', difficulty: 4 },
  { name: 'Code review', requires: 'code', difficulty: 7 },
  { name: 'Write report', requires: 'write', difficulty: 6 },
  { name: 'Data analysis', requires: 'reason', difficulty: 8 },
  { name: 'Build API', requires: 'code', difficulty: 9 },
  { name: 'Draft proposal', requires: 'write', difficulty: 5 },
]

export function TaskAllocationOptimizer() {
  const c = useDiagramColors()
  const [selectedTask, setSelectedTask] = useState(0)
  const task = taskQueue[selectedTask]

  const rankings = useMemo(() => {
    return agentPool
      .map(a => {
        const skill = a.skills[task.requires] || 0
        const fit = (skill / 10) * 100
        const canHandle = skill >= task.difficulty
        return { agent: a.name, skill, fit, canHandle }
      })
      .sort((a, b) => b.skill - a.skill)
  }, [task])

  const bestAgent = rankings[0]

  return (
    <DiagramBox title="🎯 Task Allocation — Capability-Based Assignment">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Optimal task allocation matches each task to the agent with the highest capability score for
        the required skill. Click tasks to see how agents are ranked.
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {taskQueue.map((t, i) => (
          <button key={t.name} onClick={() => setSelectedTask(i)} style={{
            padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            border: selectedTask === i ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
            background: selectedTask === i ? c.blueBg : 'transparent',
            color: selectedTask === i ? c.blue : c.textLight,
          }}>
            {t.name} <span style={{ fontSize: 9, opacity: 0.6 }}>({t.requires}:{t.difficulty})</span>
          </button>
        ))}
      </div>

      {/* Agent ranking bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rankings.map((r, i) => (
          <div key={r.agent} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 8,
            background: i === 0 ? `${c.emerald}10` : c.surfaceAlt,
            border: `1px solid ${i === 0 ? c.emerald : c.border}`,
          }}>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: i === 0 ? c.emerald : c.text }}>
              {r.agent} {i === 0 ? '🏆' : ''}
            </div>
            <div style={{ flex: 1, height: 16, borderRadius: 8, background: c.surface, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 8, transition: 'width 0.4s ease',
                width: `${r.fit}%`,
                background: r.canHandle ? c.emerald : c.amber,
              }} />
            </div>
            <div style={{ width: 40, fontSize: 12, fontWeight: 700, color: r.canHandle ? c.emerald : c.amber, textAlign: 'right' }}>
              {r.skill}/10
            </div>
            <div style={{
              fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
              background: r.canHandle ? c.emeraldBg : c.roseBg,
              color: r.canHandle ? c.emerald : c.rose,
            }}>
              {r.canHandle ? 'CAN' : 'STRETCH'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Task" value={task.name} color={c.blue} />
        <InfoPill label="Requires" value={`${task.requires} ≥ ${task.difficulty}`} color={c.purple} />
        <InfoPill label="Best fit" value={bestAgent.agent} color={c.emerald} />
      </div>
    </DiagramBox>
  )
}
