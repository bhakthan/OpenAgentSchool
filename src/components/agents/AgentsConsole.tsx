import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type AgentInfo = {
  id: string
  name: string
  description: string
  inputs: string[]
  outputs: string[]
  tools?: string[]
}

const getBaseUrl = () => import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL as string | undefined
const getKnowledgeUrl = () => import.meta.env.VITE_KNOWLEDGE_SERVICE_URL as string | undefined
const getKnowledgeIngestPath = () => (import.meta.env.VITE_KNOWLEDGE_INGEST_PATH as string | undefined) || '/api/v1/documents/upload'
const getKnowledgeBaseId = () => (import.meta.env.VITE_KNOWLEDGE_BASE_ID as string | undefined)

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

export default function AgentsConsole() {
  const baseUrl = useMemo(() => getBaseUrl(), [])
  const [agents, setAgents] = useState<AgentInfo[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>('')
  const [payload, setPayload] = useState<string>(JSON.stringify({ goal: 'learn agents', context: { topic: 'agent patterns' } }, null, 2))
  const [result, setResult] = useState<string>('')
  const enabled = !!baseUrl
  const selectedAgent: AgentInfo | undefined = useMemo(() => agents?.find(a => a.id === selected), [agents, selected])
  const [speak, setSpeak] = useState<boolean>(false)
  const knowledgeBase = useMemo(() => getKnowledgeUrl(), [])
  const knowledgeIngestPath = useMemo(() => getKnowledgeIngestPath(), [])
  const knowledgeBaseId = useMemo(() => getKnowledgeBaseId(), [])

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
        // If it looks like numeric agents (objects with numeric id), fall back to registry catalog
        const numeric = Array.isArray(data) && data.length > 0 && (typeof data[0]?.id === 'number')
        if (numeric) throw new Error('numeric-agents')
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

  const onAct = async () => {
    if (!enabled || !selected) return
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
  const r = await fetch(actUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  if (!enabled) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Agents Console</h1>
        <p className="text-sm text-muted-foreground">Orchestrator not configured. Set VITE_ORCHESTRATOR_SERVICE_URL to enable this page. The rest of the app continues to work without it.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Agents Console</h1>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="md:w-1/3 space-y-2">
          <label className="text-sm font-medium">Agents</label>
          <div className="border rounded p-2 min-h-56 max-h-[75vh] overflow-auto resize-y">
            {agents?.length ? (
              <ul className="space-y-2">
                {agents.map(a => (
                  <li key={a.id} className={`p-2 rounded cursor-pointer ${selected === a.id ? 'bg-muted' : ''}`} onClick={() => setSelected(a.id)}>
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
            <div className="border rounded p-2 text-xs space-y-1 bg-accent/20">
              <div className="font-medium">Selected: {selectedAgent.name}</div>
              <div className="text-muted-foreground">{selectedAgent.description}</div>
              <div>inputs: {selectedAgent.inputs?.join(', ') || '-'}</div>
              <div>outputs: {selectedAgent.outputs?.join(', ') || '-'}</div>
              {selectedAgent.tools?.length ? <div>tools: {selectedAgent.tools.join(', ')}</div> : null}
            </div>
          )}
          <label className="text-sm font-medium">Payload (JSON)</label>
          <textarea className="w-full h-48 border rounded p-2 font-mono text-sm" value={payload} onChange={(e) => setPayload(e.target.value)} />
          <div>
            <div className="flex items-center gap-2">
              <Button onClick={onAct} disabled={!selected}>Act with {selected || '...'}</Button>
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
          <pre className="w-full min-h-24 border rounded p-2 bg-muted overflow-auto text-sm">{result}</pre>
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
