/**
 * CostOptimizationAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for Agent Economics / Cost Optimization.
 *
 * Exports:
 *  1. TokenCostCalculator     – Real-time cost calculator with model pricing tiers
 *  2. CachingROISimulator     – Estimate savings from prompt caching strategies
 *  3. ModelRoutingOptimizer   – Route queries to optimal model tier by complexity
 *  4. UnitEconomicsExplorer   – Build per-task unit economics from first principles
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
// 1. Token Cost Calculator
// ══════════════════════════════════════════════════════════════════════════

interface ModelPricing {
  name: string; inputPer1M: number; outputPer1M: number; cachedPer1M: number
}

const models: ModelPricing[] = [
  { name: 'GPT-4o', inputPer1M: 2.50, outputPer1M: 10.00, cachedPer1M: 1.25 },
  { name: 'GPT-4o mini', inputPer1M: 0.15, outputPer1M: 0.60, cachedPer1M: 0.075 },
  { name: 'Claude Sonnet 4', inputPer1M: 3.00, outputPer1M: 15.00, cachedPer1M: 0.30 },
  { name: 'Claude Haiku 3.5', inputPer1M: 0.80, outputPer1M: 4.00, cachedPer1M: 0.08 },
  { name: 'Gemini 2.5 Flash', inputPer1M: 0.15, outputPer1M: 0.60, cachedPer1M: 0.0375 },
]

export function TokenCostCalculator() {
  const c = useDiagramColors()
  const [selectedModel, setSelectedModel] = useState(0)
  const [inputTokens, setInputTokens] = useState(1500)
  const [outputTokens, setOutputTokens] = useState(500)
  const [requestsPerDay, setRequestsPerDay] = useState(1000)
  const [cacheHitRate, setCacheHitRate] = useState(30)

  const m = models[selectedModel]
  const uncachedInput = inputTokens * (1 - cacheHitRate / 100)
  const cachedInput = inputTokens * (cacheHitRate / 100)

  const costPerRequest = (uncachedInput / 1e6 * m.inputPer1M) + (cachedInput / 1e6 * m.cachedPer1M) + (outputTokens / 1e6 * m.outputPer1M)
  const dailyCost = costPerRequest * requestsPerDay
  const monthlyCost = dailyCost * 30

  return (
    <DiagramBox title="💰 Token Cost Calculator — Real-Time Pricing">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Calculate the exact cost of your agent's LLM calls. Adjust tokens, model, volume,
        and cache hit rate to see how costs scale.
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {models.map((mod, i) => (
          <button key={mod.name} onClick={() => setSelectedModel(i)} style={{
            padding: '4px 12px', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer',
            border: selectedModel === i ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
            background: selectedModel === i ? `${c.blue}15` : 'transparent',
            color: selectedModel === i ? c.blue : c.textMuted,
          }}>{mod.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Input tokens/req', val: inputTokens, set: setInputTokens, min: 100, max: 10000, step: 100 },
          { label: 'Output tokens/req', val: outputTokens, set: setOutputTokens, min: 50, max: 4000, step: 50 },
          { label: 'Requests/day', val: requestsPerDay, set: setRequestsPerDay, min: 10, max: 100000, step: 10 },
          { label: 'Cache hit rate %', val: cacheHitRate, set: setCacheHitRate, min: 0, max: 90, step: 5 },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 130 }}>{s.label}</span>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(+e.target.value)} style={{ flex: 1 }} />
            <span style={{ fontSize: 11, width: 55, textAlign: 'right', color: c.text, fontFamily: 'monospace' }}>{s.val.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <MathBlock>{`Cost/req = input×$${m.inputPer1M}/M + cached×$${m.cachedPer1M}/M + output×$${m.outputPer1M}/M = $${costPerRequest.toFixed(6)}`}</MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Per request" value={`$${costPerRequest.toFixed(5)}`} color={c.blue} />
        <InfoPill label="Daily" value={`$${dailyCost.toFixed(2)}`} color={c.amber} />
        <InfoPill label="Monthly" value={`$${monthlyCost.toFixed(0)}`} color={monthlyCost > 1000 ? c.rose : c.emerald} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Caching ROI Simulator
// ══════════════════════════════════════════════════════════════════════════

export function CachingROISimulator() {
  const c = useDiagramColors()
  const [dailyRequests, setDailyRequests] = useState(5000)
  const [avgInputTokens, setAvgInputTokens] = useState(2000)
  const [cacheHit, setCacheHit] = useState(40)
  const [cacheCostPerGB, setCacheCostPerGB] = useState(0.10)

  const inputPricePerToken = 3 / 1e6  // ~$3/1M
  const cachedPricePerToken = 0.3 / 1e6  // ~$0.30/1M

  const noCacheCost = dailyRequests * avgInputTokens * inputPricePerToken
  const withCacheCost = dailyRequests * avgInputTokens * (
    (1 - cacheHit / 100) * inputPricePerToken +
    (cacheHit / 100) * cachedPricePerToken
  )
  const cacheStorageCost = (dailyRequests * avgInputTokens * 4) / 1e9 * cacheCostPerGB  // ~4 bytes per token estimate
  const totalWithCache = withCacheCost + cacheStorageCost
  const savings = noCacheCost - totalWithCache
  const savingsPercent = noCacheCost > 0 ? (savings / noCacheCost) * 100 : 0

  return (
    <DiagramBox title="💾 Caching ROI — Prompt Cache Savings">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Prompt caching lets you save on repeated prefixes. Adjust cache hit rate and
        volume to see the daily savings vs cache storage costs.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Daily requests', val: dailyRequests, set: setDailyRequests, min: 100, max: 50000, step: 100 },
          { label: 'Avg input tokens', val: avgInputTokens, set: setAvgInputTokens, min: 500, max: 8000, step: 100 },
          { label: 'Cache hit rate %', val: cacheHit, set: setCacheHit, min: 0, max: 90, step: 5 },
          { label: 'Cache $/GB', val: cacheCostPerGB, set: setCacheCostPerGB, min: 0.01, max: 1, step: 0.01 },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 130 }}>{s.label}</span>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(+e.target.value)} style={{ flex: 1 }} />
            <span style={{ fontSize: 11, width: 55, textAlign: 'right', color: c.text, fontFamily: 'monospace' }}>
              {typeof s.val === 'number' && s.val < 1 ? s.val.toFixed(2) : s.val.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Comparison bars */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 90, fontSize: 10, fontWeight: 600, color: c.rose }}>No cache</div>
        <div style={{ flex: 1, height: 16, borderRadius: 4, background: c.surfaceAlt, position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            width: `${Math.min(100, (noCacheCost / Math.max(noCacheCost, 0.01)) * 100)}%`,
            background: c.rose,
          }} />
        </div>
        <span style={{ fontSize: 10, fontFamily: 'monospace', width: 60, textAlign: 'right', color: c.text }}>${noCacheCost.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 90, fontSize: 10, fontWeight: 600, color: c.emerald }}>With cache</div>
        <div style={{ flex: 1, height: 16, borderRadius: 4, background: c.surfaceAlt, position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            width: `${Math.min(100, (totalWithCache / Math.max(noCacheCost, 0.01)) * 100)}%`,
            background: c.emerald,
          }} />
        </div>
        <span style={{ fontSize: 10, fontFamily: 'monospace', width: 60, textAlign: 'right', color: c.text }}>${totalWithCache.toFixed(2)}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Daily savings" value={`$${savings.toFixed(2)}`} color={savings > 0 ? c.emerald : c.rose} />
        <InfoPill label="Savings %" value={`${savingsPercent.toFixed(1)}%`} color={savingsPercent > 20 ? c.emerald : c.amber} />
        <InfoPill label="Monthly" value={`$${(savings * 30).toFixed(0)}`} color={c.blue} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Model Routing Optimizer
// ══════════════════════════════════════════════════════════════════════════

interface RoutingTier {
  name: string; model: string; costPer1K: number; qualityScore: number; maxComplexity: number
}

const tiers: RoutingTier[] = [
  { name: 'Simple', model: 'GPT-4o mini', costPer1K: 0.00045, qualityScore: 70, maxComplexity: 30 },
  { name: 'Standard', model: 'GPT-4o', costPer1K: 0.0075, qualityScore: 88, maxComplexity: 70 },
  { name: 'Complex', model: 'Claude Sonnet', costPer1K: 0.0105, qualityScore: 95, maxComplexity: 100 },
]

export function ModelRoutingOptimizer() {
  const c = useDiagramColors()
  const [simplePercent, setSimplePercent] = useState(60)
  const [standardPercent, setStandardPercent] = useState(30)

  const complexPercent = Math.max(0, 100 - simplePercent - standardPercent)

  const blendedCost = (
    (simplePercent / 100) * tiers[0].costPer1K +
    (standardPercent / 100) * tiers[1].costPer1K +
    (complexPercent / 100) * tiers[2].costPer1K
  )
  const blendedQuality = (
    (simplePercent / 100) * tiers[0].qualityScore +
    (standardPercent / 100) * tiers[1].qualityScore +
    (complexPercent / 100) * tiers[2].qualityScore
  )
  const maxCost = tiers[2].costPer1K

  return (
    <DiagramBox title="🔀 Model Routing — Complexity-Based Tier Selection">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Smart routing sends simple queries to cheap models and complex ones to frontier models.
        Adjust the traffic distribution to see blended cost and quality.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.stageColors[0], width: 120 }}>Simple ({simplePercent}%)</span>
          <input type="range" min={0} max={100} step={5} value={simplePercent}
            onChange={e => {
              const v = +e.target.value
              setSimplePercent(v)
              if (v + standardPercent > 100) setStandardPercent(100 - v)
            }} style={{ flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.stageColors[1], width: 120 }}>Standard ({standardPercent}%)</span>
          <input type="range" min={0} max={100 - simplePercent} step={5} value={standardPercent}
            onChange={e => setStandardPercent(+e.target.value)} style={{ flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.stageColors[2], width: 120 }}>Complex ({complexPercent}%)</span>
          <div style={{
            flex: 1, height: 6, borderRadius: 3, background: c.surfaceAlt,
          }}>
            <div style={{
              height: '100%', borderRadius: 3, width: `${complexPercent}%`,
              background: c.stageColors[2],
            }} />
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tiers.map((tier, i) => {
          const pct = i === 0 ? simplePercent : i === 1 ? standardPercent : complexPercent
          return (
            <div key={tier.name} style={{
              flex: 1, minWidth: 140, padding: 10, borderRadius: 8,
              background: c.surfaceAlt, border: `1px solid ${c.stageColors[i]}30`,
              opacity: pct > 0 ? 1 : 0.4,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.stageColors[i] }}>{tier.name}</div>
              <div style={{ fontSize: 10, color: c.textMuted }}>{tier.model}</div>
              <div style={{ fontSize: 10, color: c.text }}>Cost: ${tier.costPer1K.toFixed(4)}/1K</div>
              <div style={{ fontSize: 10, color: c.text }}>Quality: {tier.qualityScore}%</div>
            </div>
          )
        })}
      </div>

      <MathBlock>{`Blended cost = Σ(tier_% × cost_i) = $${blendedCost.toFixed(5)}/1K req  (vs $${maxCost.toFixed(4)} all-frontier)`}</MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Blended cost" value={`$${blendedCost.toFixed(5)}/1K`} color={c.blue} />
        <InfoPill label="Quality" value={`${blendedQuality.toFixed(0)}%`} color={blendedQuality > 85 ? c.emerald : c.amber} />
        <InfoPill label="Savings" value={`${((1 - blendedCost / maxCost) * 100).toFixed(0)}% vs frontier`} color={c.emerald} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Unit Economics Explorer
// ══════════════════════════════════════════════════════════════════════════

export function UnitEconomicsExplorer() {
  const c = useDiagramColors()
  const [revenuePerTask, setRevenuePerTask] = useState(0.50)
  const [llmCost, setLlmCost] = useState(0.015)
  const [toolCost, setToolCost] = useState(0.005)
  const [infraCost, setInfraCost] = useState(0.002)
  const [humanReviewRate, setHumanReviewRate] = useState(5)
  const [humanCostPerReview, setHumanCostPerReview] = useState(2.0)

  const humanCostPerTask = (humanReviewRate / 100) * humanCostPerReview
  const totalCostPerTask = llmCost + toolCost + infraCost + humanCostPerTask
  const grossMargin = revenuePerTask - totalCostPerTask
  const marginPercent = revenuePerTask > 0 ? (grossMargin / revenuePerTask) * 100 : 0

  const costBreakdown = [
    { label: 'LLM Inference', value: llmCost, color: c.stageColors[0] },
    { label: 'Tool/API', value: toolCost, color: c.stageColors[1] },
    { label: 'Infrastructure', value: infraCost, color: c.stageColors[2] },
    { label: 'Human review', value: humanCostPerTask, color: c.stageColors[3] },
  ]

  return (
    <DiagramBox title="📊 Unit Economics — Per-Task P&L">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        Build per-task economics from first principles. Adjust revenue and cost levers to
        find your break-even point and target margin.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Revenue/task ($)', val: revenuePerTask, set: setRevenuePerTask, min: 0.01, max: 5.0, step: 0.01 },
          { label: 'LLM cost ($)', val: llmCost, set: setLlmCost, min: 0.001, max: 0.50, step: 0.001 },
          { label: 'Tool/API cost ($)', val: toolCost, set: setToolCost, min: 0, max: 0.10, step: 0.001 },
          { label: 'Infra cost ($)', val: infraCost, set: setInfraCost, min: 0, max: 0.05, step: 0.001 },
          { label: 'Human review %', val: humanReviewRate, set: setHumanReviewRate, min: 0, max: 100, step: 1 },
          { label: 'Review cost ($)', val: humanCostPerReview, set: setHumanCostPerReview, min: 0.5, max: 10, step: 0.5 },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.text, width: 120 }}>{s.label}</span>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(+e.target.value)} style={{ flex: 1 }} />
            <span style={{ fontSize: 11, width: 48, textAlign: 'right', color: c.text, fontFamily: 'monospace' }}>
              {s.val < 1 ? `$${s.val.toFixed(3)}` : s.val < 10 ? `$${s.val.toFixed(2)}` : `${s.val}%`}
            </span>
          </div>
        ))}
      </div>

      {/* Cost breakdown bars */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: c.textLight, marginBottom: 6 }}>Cost Breakdown</div>
        {costBreakdown.map(item => (
          <div key={item.label} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
            <span style={{ fontSize: 10, width: 80, color: item.color, fontWeight: 600 }}>{item.label}</span>
            <div style={{ flex: 1, height: 10, borderRadius: 3, background: c.surfaceAlt }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${Math.min(100, (item.value / Math.max(totalCostPerTask, 0.001)) * 100)}%`,
                background: item.color, transition: 'width 0.2s ease',
              }} />
            </div>
            <span style={{ fontSize: 9, width: 48, textAlign: 'right', color: c.text, fontFamily: 'monospace' }}>${item.value.toFixed(4)}</span>
          </div>
        ))}
      </div>

      <MathBlock>{`Margin = Revenue - Costs = $${revenuePerTask.toFixed(3)} - $${totalCostPerTask.toFixed(4)} = $${grossMargin.toFixed(4)} (${marginPercent.toFixed(1)}%)`}</MathBlock>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Cost/task" value={`$${totalCostPerTask.toFixed(4)}`} color={c.blue} />
        <InfoPill label="Margin" value={`${marginPercent.toFixed(1)}%`} color={marginPercent > 50 ? c.emerald : marginPercent > 0 ? c.amber : c.rose} />
        <InfoPill label="Break-even" value={marginPercent > 0 ? 'Profitable' : 'Unprofitable'} color={marginPercent > 0 ? c.emerald : c.rose} />
      </div>
    </DiagramBox>
  )
}
