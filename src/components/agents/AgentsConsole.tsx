import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics/ga'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/AuthContext'
import { useUserSettings } from '@/contexts/UserSettingsContext'
import { useEffectivePolicy } from '@/contexts/EffectivePolicyContext'
import { Plugs } from '@phosphor-icons/react/dist/ssr/Plugs'

type AgentInfo = {
  id: string
  name: string
  description: string
  inputs: string[]
  outputs: string[]
  tools?: string[]
}

type ScenarioTemplate = {
  id: string
  title: string
  agentId: string
  domain: 'executive' | 'architect' | 'data' | 'operations'
  description: string
  payload: any
}

// Direct assignment so Vite can statically analyze and bundle the env vars
const ORCHESTRATOR_BASE_URL = import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL as string | undefined
const KNOWLEDGE_BASE_URL = import.meta.env.VITE_KNOWLEDGE_SERVICE_URL as string | undefined
const KNOWLEDGE_INGEST_PATH = (import.meta.env.VITE_KNOWLEDGE_INGEST_PATH as string | undefined) || '/api/v1/documents/upload'
const KNOWLEDGE_BASE_ID = import.meta.env.VITE_KNOWLEDGE_BASE_ID as string | undefined

// Example payloads for common agents to speed up testing
const EXAMPLES: Record<string, any> = {
  'tutor.socratic': {
    goal: 'Explain the Pythagorean theorem in simple terms',
    context: { topic: 'Pythagorean theorem' },
  },
  'sequencer.lesson': {
    // LessonSequencerAgent reads profile.level and returns nextActivity
    profile: { level: 'beginner' },
    context: { recentScores: [0.6, 0.7] },
  },
  'retrieval.knowledge': {
    // KnowledgeRetrievalAgent uses goal or input as the query
    goal: 'What is the Pythagorean theorem?',
  },
  'profile.learner': {
    context: {
      events: [{ modality: 'audio' }],
      scores: [{ score: 0.55 }, { score: 0.92 }],
    },
  },
  'narration.voice': {
    input: 'Hello world from Open Agent School',
    context: { voicePrefs: { voice: 'en-US-JennyNeural', rate: '+0%' } },
  },
  'tool.mcp.runner': {
    context: { schema: { name: 'my.tool' }, call: { args: [1, 2, 3] } },
  },
  'critic.system-design': {
    input: 'Retry with backoff; avoid single point of failure; limit sync coupling',
  },
  'guide.visualization': {
    context: { vizId: 'scatterplot', userState: { step: 1 } },
  },
  'debug.challenge': {
    goal: 'Fix failing unit test in sorting module',
  },
  'ingest.kb': {
    input: ['Doc A content goes here...', 'Doc B content goes here...'],
  },
}

const SCENARIOS: ScenarioTemplate[] = [
  {
    id: 'incident-p0',
    title: 'P0 Incident Triage (Production Outage)',
    agentId: 'critic.system-design',
    domain: 'operations',
    description: 'Analyze architecture notes and produce risks plus immediate mitigation actions.',
    payload: {
      goal: 'Triaging payment API outage affecting checkout in two regions',
      input: 'Single point on primary DB, synchronous retries, no queue, failed deployment rollback',
      use_case: 'incident-response',
      success_criteria: ['Identify top 3 risks', 'Provide mitigation actions in priority order'],
      context: { system: 'checkout-platform', severity: 'P0' },
    },
  },
  {
    id: 'compliance-rollout',
    title: 'Compliance Rollout (Policy + Audit)',
    agentId: 'critic.system-design',
    domain: 'executive',
    description: 'Assess controls for policy enforcement and operational audit-readiness.',
    payload: {
      goal: 'Prepare architecture for GDPR + internal audit readiness',
      input: 'No data retention policy, logs missing trace IDs, shared admin account usage',
      use_case: 'compliance-governance',
      success_criteria: ['Map risks to controls', 'List policy and technical remediations'],
      context: { domain: 'knowledge-service', regulation: ['GDPR', 'SOC2'] },
    },
  },
  {
    id: 'debug-release',
    title: 'Release Regression Debug Runbook',
    agentId: 'debug.challenge',
    domain: 'operations',
    description: 'Generate practical debug runbook and next actions for a failing release.',
    payload: {
      goal: 'Release candidate fails smoke tests only in staging',
      use_case: 'release-debug',
      success_criteria: ['Reproduce fast', 'Isolate root cause', 'Patch safely'],
      context: { service: 'agent-orchestrator', environment: 'staging' },
    },
  },
  {
    id: 'onboarding-architect',
    title: 'Architect Onboarding Plan',
    agentId: 'sequencer.lesson',
    domain: 'architect',
    description: 'Build practical onboarding sequence for an AI architect persona.',
    payload: {
      profile: { level: 'intermediate', role: 'architect' },
      use_case: 'onboarding',
      success_criteria: ['Hands-on first week plan', 'Pattern progression by complexity'],
      context: { recentScores: [0.71, 0.77], domain: 'multi-agent systems' },
    },
  },
  {
    id: 'board-readiness',
    title: 'Board Readiness Briefing Pack',
    agentId: 'critic.system-design',
    domain: 'executive',
    description: 'Create a concise executive runbook focused on risk, controls, and business impact.',
    payload: {
      goal: 'Prepare board briefing for AI adoption risk posture',
      input: 'Pilot launches next month, model monitoring partial, no incident comms playbook',
      use_case: 'board-briefing',
      success_criteria: ['Summarize risk in business terms', 'Give 30-60-90 day actions'],
      context: { audience: 'board', horizon: 'quarterly' },
    },
  },
  {
    id: 'architecture-modernization',
    title: 'Architecture Modernization Plan',
    agentId: 'critic.system-design',
    domain: 'architect',
    description: 'Map target patterns and technical debt cleanup steps for agent platform scale-up.',
    payload: {
      goal: 'Modernize orchestration architecture for multi-team scale',
      input: 'Monolithic orchestrator, weak service boundaries, missing async event backbone',
      use_case: 'architecture-modernization',
      success_criteria: ['Pattern roadmap', 'Migration slices with low risk'],
      context: { current_state: 'single-cluster', target_state: 'multi-service' },
    },
  },
  {
    id: 'data-quality-guardrails',
    title: 'Data Quality Guardrails',
    agentId: 'critic.system-design',
    domain: 'data',
    description: 'Design data quality runbook for ingestion, lineage, and retrieval confidence.',
    payload: {
      goal: 'Improve knowledge retrieval accuracy and traceability',
      input: 'No lineage tags, stale chunks, inconsistent metadata schema',
      use_case: 'data-governance',
      success_criteria: ['Define quality checks', 'Set monitoring metrics and thresholds'],
      context: { pipeline: 'knowledge-ingest', datasource: 'mixed-docs' },
    },
  },
  {
    id: 'data-onboarding',
    title: 'Data Engineer Onboarding Sprint',
    agentId: 'sequencer.lesson',
    domain: 'data',
    description: 'Generate a practical onboarding sequence for data-focused engineering work.',
    payload: {
      profile: { level: 'intermediate', role: 'data-engineer' },
      use_case: 'onboarding-data',
      success_criteria: ['Hands-on ingestion tasks', 'Quality + eval checkpoints'],
      context: { recentScores: [0.65, 0.74], domain: 'data quality and RAG' },
    },
  },
]

export default function AgentsConsole() {
  const { isAuthenticated } = useAuth()
  const { settings } = useUserSettings()
  const { policy } = useEffectivePolicy()
  const baseUrl = ORCHESTRATOR_BASE_URL
  const [agents, setAgents] = useState<AgentInfo[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>('')
  const [payload, setPayload] = useState<string>(JSON.stringify({ goal: 'learn agents', context: { topic: 'agent patterns' } }, null, 2))
  const [result, setResult] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<'all' | ScenarioTemplate['domain']>('all')
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('')
  const enabled = !!baseUrl
  const selectedAgent: AgentInfo | undefined = useMemo(() => agents?.find(a => a.id === selected), [agents, selected])
  const visibleScenarios = useMemo(
    () => selectedDomain === 'all' ? SCENARIOS : SCENARIOS.filter(s => s.domain === selectedDomain),
    [selectedDomain]
  )
  const selectedScenario = useMemo(
    () => SCENARIOS.find(s => s.id === selectedScenarioId),
    [selectedScenarioId]
  )
  const [speak, setSpeak] = useState<boolean>(false)
  const knowledgeBase = KNOWLEDGE_BASE_URL
  const knowledgeIngestPath = KNOWLEDGE_INGEST_PATH
  const knowledgeBaseId = KNOWLEDGE_BASE_ID

  // TTS helpers
  const stripSSML = (s: string) => s.replace(/<[^>]+>/g, ' ')
  const percentToRate = (rate?: string) => {
    if (!rate) return 1
    const m = rate.match(/([+-]?\d+)%/)
    if (!m) return 1
    const pct = parseInt(m[1], 10) || 0
    return Math.max(0.5, Math.min(2, 1 + pct / 100))
  }
  const speakFromResponse = (json: any) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      const out = json?.output
      let text: string | null = null
      let voiceName: string | undefined
      let rate = 1
      // Prefer SSML if present; else common fields; fallback stringify
      if (out?.ssml) {
        text = stripSSML(String(out.ssml))
        voiceName = out?.hints?.voice
        rate = percentToRate(out?.hints?.rate)
      } else if (typeof out === 'string') {
        text = out
      } else if (out?.explanation) {
        text = String(out.explanation)
      } else if (out?.question) {
        text = String(out.question)
      } else if (out?.items && Array.isArray(out.items)) {
        text = out.items.map((it: any) => it.q || it.question || '').filter(Boolean).join('\n') || null
      } else if (out) {
        text = JSON.stringify(out)
      }
      if (!text) return
      // Cancel any ongoing
      try { window.speechSynthesis.cancel() } catch {}
      const utt = new SpeechSynthesisUtterance(text)
      if (voiceName) {
        const vs = window.speechSynthesis.getVoices() || []
        const v = vs.find(v => v.name === voiceName)
        if (v) utt.voice = v
      }
      utt.rate = rate
      window.speechSynthesis.speak(utt)
    } catch {}
  }
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      try { if (typeof window !== 'undefined') window.speechSynthesis.cancel() } catch {}
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const abort = new AbortController()
  const load = async () => {
      const urlBase = baseUrl!.replace(/\/$/, '')
      // Try primary numeric/DB route first
      try {
        const r = await fetch(`${urlBase}/api/v1/agents/`, { signal: abort.signal })
        if (!r.ok) throw new Error(String(r.status))
        const data = await r.json()
        // If empty or looks like numeric agents (objects with numeric id), fall back to registry catalog
        const numeric = Array.isArray(data) && data.length > 0 && (typeof data[0]?.id === 'number')
        const empty = Array.isArray(data) && data.length === 0
        if (numeric || empty) throw new Error('numeric-agents-or-empty')
        setAgents(data as AgentInfo[])
    setError(null)
        if (data.length && !selected) {
          const withExample = (data as AgentInfo[]).find(a => EXAMPLES[a.id])
          setSelected((withExample?.id) || (data as AgentInfo[])[0].id)
        }
        return
      } catch (e: any) {
        // Fallback to string-id registry under /agents-catalog
      }
      try {
        const r2 = await fetch(`${urlBase}/api/v1/agents-catalog/`, { signal: abort.signal })
        if (!r2.ok) throw new Error(`HTTP ${r2.status}`)
        const data2: AgentInfo[] = await r2.json()
        setAgents(data2)
    setError(null)
        if (data2.length && !selected) {
          const withExample = data2.find(a => EXAMPLES[a.id])
          setSelected((withExample?.id) || data2[0].id)
        }
      } catch (e: any) {
    // Ignore intentional/cleanup aborts to avoid noisy UI message
    if (e?.name === 'AbortError' || /aborted/i.test(String(e?.message))) return
    setError(e.message || String(e))
      }
    }
    load()
    return () => abort.abort()
  }, [enabled, baseUrl])

  useEffect(() => {
    if (!selectedScenarioId) return
    const found = visibleScenarios.some(s => s.id === selectedScenarioId)
    if (!found) setSelectedScenarioId('')
  }, [selectedDomain, selectedScenarioId, visibleScenarios])

  const onAct = async () => {
    if (!enabled || !selected) return
    trackEvent({ action: 'agent_act', category: 'agents_console', label: selected })
    setResult('')
    setError(null)
    let body: any
    try {
      body = JSON.parse(payload)
    } catch (e: any) {
      setError('Invalid JSON payload')
      return
    }
    try {
  // Prefer registry endpoint when a string-id agent is selected and the catalog exists
  const urlBase = baseUrl!.replace(/\/$/, '')
  const catalogAct = `${urlBase}/api/v1/agents-catalog/${encodeURIComponent(selected)}/act`
  const primaryAct = `${urlBase}/api/v1/agents/${encodeURIComponent(selected)}/act`
  // Heuristic: if selected contains a dot, it's a registry agent
  const actUrl = selected.includes('.') ? catalogAct : primaryAct
  const policyContext = policy
    ? {
        bundle_id: policy.bundle.bundle_id,
        bundle_version: policy.bundle.version,
        modules: policy.modules,
        learning_profile: settings.learningProfile,
      }
    : {
        learning_profile: settings.learningProfile,
      }
  const finalBody = {
    ...body,
    ...(selectedScenario
      ? {
          scenario_id: body.scenario_id ?? selectedScenario.id,
          use_case: body.use_case ?? selectedScenario.id,
        }
      : {}),
    policy_context: body.policy_context ?? policyContext,
  }
  const r = await fetch(actUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalBody),
      })
      const txt = await r.text()
      if (!r.ok) throw new Error(txt || `HTTP ${r.status}`)
      setResult(txt)
      if (speak) {
        try { const json = JSON.parse(txt); speakFromResponse(json) } catch {}
      }
    } catch (e: any) {
      setError(e.message || String(e))
    }
  }

  const runbook = useMemo(() => {
    if (!result) return null
    try {
      const parsed = JSON.parse(result)
      const output = parsed?.output ?? parsed
      const risks = output?.risks ?? []
      const patterns = output?.patterns ?? []
      const improvements = output?.improvements ?? []
      const unlockSteps = output?.unlockSteps ?? []
      const nextAction = parsed?.nextAction ?? output?.nextAction ?? null
      const summary = output?.runbook?.summary ?? output?.summary ?? null
      const immediate = output?.runbook?.immediate_actions ?? []
      const metrics = output?.runbook?.metrics_to_watch ?? []
      if (!summary && !risks.length && !patterns.length && !improvements.length && !unlockSteps.length && !immediate.length && !metrics.length && !nextAction) return null
      return {
        summary,
        risks,
        patterns,
        improvements,
        unlockSteps,
        immediate,
        metrics,
        nextAction,
      }
    } catch {
      return null
    }
  }, [result])

  // Optional helper to call knowledge-service ingest endpoint for `ingest.kb`
  const onIngestToKnowledgeService = async () => {
    if (!knowledgeBase) {
      setError('VITE_KNOWLEDGE_SERVICE_URL not set');
      return;
    }
    let body: any
    try {
      body = JSON.parse(payload)
    } catch {
      setError('Invalid JSON payload');
      return
    }
    const docs = Array.isArray(body?.input) ? body.input : (body?.input != null ? [body.input] : [])
    if (!docs.length) {
      setError('Provide input as string or array of strings for ingestion')
      return
    }
    try {
      const base = knowledgeBase.replace(/\/$/, '')
      const path = knowledgeIngestPath.startsWith('/') ? knowledgeIngestPath : `/${knowledgeIngestPath}`

      // If targeting the documents upload route, send multipart form with one file per doc (sequential uploads)
      if (/\/documents\/upload$/.test(path)) {
        if (!knowledgeBaseId) {
          setError('Set VITE_KNOWLEDGE_BASE_ID in .env.local for documents/upload')
          return
        }
        const results: any[] = []
        for (let i = 0; i < docs.length; i++) {
          const d = String(docs[i] ?? '')
          const blob = new Blob([d], { type: 'text/plain' })
          const file = new File([blob], `doc-${i + 1}.txt`, { type: 'text/plain' })
          const form = new FormData()
          form.append('knowledge_base_id', String(knowledgeBaseId))
          form.append('file', file)
          // Optional metadata
          try { form.append('metadata', JSON.stringify({ source: 'agents-console', index: i })) } catch {}
          const res = await fetch(`${base}${path}`, { method: 'POST', body: form })
          const txt = await res.text()
          if (!res.ok) throw new Error(`Upload ${i + 1} failed: ${txt || `HTTP ${res.status}`}`)
          try { results.push(JSON.parse(txt)) } catch { results.push({ ok: true, index: i, raw: txt }) }
        }
        setResult(JSON.stringify(results, null, 2))
        return
      }

      // Default: JSON docs array to a custom ingest path
      const res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docs }),
      })
      const txt = await res.text()
      if (!res.ok) throw new Error(txt || `HTTP ${res.status}`)
      setResult(txt)
    } catch (e: any) {
      setError(e.message || String(e))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="agent-console-flat-ui container mx-auto px-4 py-12 max-w-4xl">
        <Card className="text-center p-12">
          <Plugs size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Sign In to Access Agents Console</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The Agents Console provides access to multi-agent orchestration and API testing. Sign in to continue.
          </p>
          <Link to="/auth">
            <Button size="lg">Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!enabled) {
    return (
      <div className="agent-console-flat-ui space-y-4">
        <h1 className="text-2xl font-semibold">Agents Console</h1>
        <p className="text-sm text-muted-foreground">Orchestrator not configured. Set VITE_ORCHESTRATOR_SERVICE_URL to enable this page. The rest of the app continues to work without it.</p>
      </div>
    )
  }

  return (
    <div className="agent-console-flat-ui space-y-4">
      <h1 className="text-2xl font-semibold">Agents Console</h1>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="md:w-1/3 space-y-2">
          <label className="text-sm font-medium">Agents</label>
          <div className="border rounded p-2 min-h-56 max-h-[75vh] overflow-auto resize-y bg-card">
            {agents?.length ? (
              <ul className="space-y-2">
                {agents.map(a => (
                  <li key={a.id} className={`p-2 rounded cursor-pointer border border-transparent ${selected === a.id ? 'bg-muted border-border' : 'hover:bg-muted/40'}`} onClick={() => setSelected(a.id)}>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.id}</div>
                    <div className="text-xs mt-1">{a.description}</div>
                    {(a.tools && a.tools.length) ? (
                      <div className="text-[11px] mt-1 text-muted-foreground">tools: {a.tools.join(', ')}</div>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">{error ? 'Failed to load agents' : 'Loading agents...'}</div>
            )}
          </div>
        </div>
        <div className="md:w-2/3 space-y-2">
          {selectedAgent && (
            <div className="border rounded p-2 text-xs space-y-1 bg-muted/40">
              <div className="font-medium">Selected: {selectedAgent.name}</div>
              <div className="text-muted-foreground">{selectedAgent.description}</div>
              <div>inputs: {selectedAgent.inputs?.join(', ') || '-'}</div>
              <div>outputs: {selectedAgent.outputs?.join(', ') || '-'}</div>
              {selectedAgent.tools?.length ? <div>tools: {selectedAgent.tools.join(', ')}</div> : null}
            </div>
          )}
          <label className="text-sm font-medium">Payload (JSON)</label>
          <div className="border rounded p-2 bg-muted/30 space-y-2">
            <label className="text-xs font-medium">Scenario Templates</label>
            <select
              className="w-full border rounded px-2 py-1.5 text-sm bg-card"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value as 'all' | ScenarioTemplate['domain'])}
            >
              <option value="all">All domains</option>
              <option value="executive">Executive</option>
              <option value="architect">Architect</option>
              <option value="data">Data</option>
              <option value="operations">Operations</option>
            </select>
            <select
              className="w-full border rounded px-2 py-1.5 text-sm bg-card"
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
            >
              <option value="">Select a real-world scenario...</option>
              {visibleScenarios.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
            {selectedScenario && (
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground">{selectedScenario.description}</div>
                <div>Recommended agent: {selectedScenario.agentId}</div>
                <div>Domain pack: {selectedScenario.domain}</div>
              </div>
            )}
          </div>
          <textarea className="w-full h-48 border rounded p-2 font-mono text-sm bg-card" value={payload} onChange={(e) => setPayload(e.target.value)} />
          <div>
            <div className="flex items-center gap-2">
              <Button onClick={onAct} disabled={!selected}>Act with {selected || '...'}</Button>
              <Button variant="outline" onClick={() => {
                if (!selectedScenario) return
                setSelected(selectedScenario.agentId)
                setPayload(JSON.stringify(selectedScenario.payload, null, 2))
              }} disabled={!selectedScenario}>
                Load scenario
              </Button>
              <Button variant="secondary" disabled={!selected} onClick={() => {
                const ex = selected ? EXAMPLES[selected] : undefined
                if (ex) {
                  setPayload(JSON.stringify(ex, null, 2))
                } else {
                  // Generic fallback example without nulls
                  const fallback = { goal: 'try action', context: { topic: 'agent patterns' } }
                  setPayload(JSON.stringify(fallback, null, 2))
                }
              }}>Load example</Button>
              <label className="ml-2 text-sm inline-flex items-center gap-1 select-none">
                <input type="checkbox" checked={speak} onChange={(e) => setSpeak(e.target.checked)} />
                Speak result (browser TTS)
              </label>
              <Button variant="ghost" onClick={() => { try { if (typeof window !== 'undefined') window.speechSynthesis.cancel() } catch {} }}>Stop</Button>
              {selected === 'ingest.kb' && (
                <Button variant="outline" onClick={onIngestToKnowledgeService} title={knowledgeBase ? `POST ${knowledgeBase}/api/v1/ingest` : 'Set VITE_KNOWLEDGE_SERVICE_URL'}>
                  Send to Knowledge Service
                </Button>
              )}
            </div>
          </div>
          <label className="text-sm font-medium">Result</label>
          <pre className="w-full min-h-24 border rounded p-2 bg-muted/50 overflow-auto text-sm">{result}</pre>
          {runbook && (
            <div className="border rounded p-3 bg-card space-y-2">
              <div className="text-sm font-semibold">Runbook Summary</div>
              {runbook.summary && <div className="text-sm">{runbook.summary}</div>}
              {!!runbook.risks.length && <div className="text-xs"><strong>Risks:</strong> {runbook.risks.join(' | ')}</div>}
              {!!runbook.immediate.length && <div className="text-xs"><strong>Immediate Actions:</strong> {runbook.immediate.join(' | ')}</div>}
              {!!runbook.patterns.length && <div className="text-xs"><strong>Recommended Patterns:</strong> {runbook.patterns.join(' | ')}</div>}
              {!!runbook.improvements.length && <div className="text-xs"><strong>Improvements:</strong> {runbook.improvements.join(' | ')}</div>}
              {!!runbook.unlockSteps.length && <div className="text-xs"><strong>Step Checklist:</strong> {runbook.unlockSteps.join(' -> ')}</div>}
              {!!runbook.metrics.length && <div className="text-xs"><strong>Metrics to watch:</strong> {runbook.metrics.join(' | ')}</div>}
              {runbook.nextAction && <div className="text-xs"><strong>Next Action:</strong> {runbook.nextAction}</div>}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            <div>orchestrator: {baseUrl}</div>
            <div>agents loaded: {agents?.length ?? 0}</div>
            <div>tip: This UI auto-falls back to /api/v1/agents-catalog for built-in string-id agents. If you see numeric IDs, your primary /agents API is DB-backed.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
