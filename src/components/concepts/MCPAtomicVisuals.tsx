/**
 * MCPAtomicVisuals.tsx
 *
 * Interactive atomic-level visualizers for MCP (Model Context Protocol).
 *
 * Exports:
 *  1. ProtocolMessageDissector  – Step through JSON-RPC request/response lifecycle
 *  2. CapabilityNegotiationViz  – Client-server capability negotiation simulator
 *  3. TransportLayerExplorer    – Compare stdio vs SSE vs HTTP transport mechanisms
 *  4. ServerRegistrySimulator   – Interactive server registry with tool discovery
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


// ══════════════════════════════════════════════════════════════════════════
// 1. Protocol Message Dissector
// ══════════════════════════════════════════════════════════════════════════

interface ProtocolMessage {
  direction: 'client→server' | 'server→client'
  type: 'request' | 'response' | 'notification'
  method: string
  payload: string
  annotation: string
}

const mcpHandshake: ProtocolMessage[] = [
  { direction: 'client→server', type: 'request', method: 'initialize',
    payload: '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{"roots":{}},"clientInfo":{"name":"VSCode","version":"1.90"}}}',
    annotation: 'Client announces protocol version, capabilities, and identity' },
  { direction: 'server→client', type: 'response', method: 'initialize (response)',
    payload: '{"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{"tools":{}},"serverInfo":{"name":"weather-server","version":"0.1.0"}}}',
    annotation: 'Server responds with its own capabilities and identity' },
  { direction: 'client→server', type: 'notification', method: 'notifications/initialized',
    payload: '{"jsonrpc":"2.0","method":"notifications/initialized"}',
    annotation: 'Client confirms initialization complete — session is now active' },
  { direction: 'client→server', type: 'request', method: 'tools/list',
    payload: '{"jsonrpc":"2.0","id":2,"method":"tools/list"}',
    annotation: 'Client discovers available tools from the server' },
  { direction: 'server→client', type: 'response', method: 'tools/list (response)',
    payload: '{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"get_weather","description":"Get current weather","inputSchema":{"type":"object","properties":{"city":{"type":"string"}},"required":["city"]}}]}}',
    annotation: 'Server provides tool manifest with JSON Schema for each tool' },
  { direction: 'client→server', type: 'request', method: 'tools/call',
    payload: '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_weather","arguments":{"city":"Paris"}}}',
    annotation: 'Client invokes tool with validated arguments' },
  { direction: 'server→client', type: 'response', method: 'tools/call (response)',
    payload: '{"jsonrpc":"2.0","id":3,"result":{"content":[{"type":"text","text":"18°C, partly cloudy"}]}}',
    annotation: 'Server returns tool result as structured content' },
]

export function ProtocolMessageDissector() {
  const c = useDiagramColors()
  const [step, setStep] = useState(0)

  const msg = mcpHandshake[Math.min(step, mcpHandshake.length - 1)]
  const dirColor = msg.direction === 'client→server' ? c.blue : c.emerald
  const typeColor: Record<string, string> = { request: c.purple, response: c.emerald, notification: c.amber }

  return (
    <DiagramBox title="📨 MCP Protocol Dissector — JSON-RPC Lifecycle">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        MCP uses JSON-RPC 2.0 over various transports. Step through a complete handshake
        and tool-call sequence to see every message exchanged.
      </p>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {mcpHandshake.map((_, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            width: 28, height: 28, borderRadius: 6, cursor: 'pointer',
            fontSize: 11, fontWeight: 700,
            border: step === i ? `2px solid ${c.purple}` : `1px solid ${c.border}`,
            background: step === i ? c.purpleBg : i <= step ? `${c.emerald}15` : 'transparent',
            color: step === i ? c.purple : i <= step ? c.emerald : c.textMuted,
          }}>{i + 1}</button>
        ))}
      </div>

      {/* Message view */}
      <div style={{
        padding: 14, borderRadius: 8,
        background: `${dirColor}08`, border: `1px solid ${dirColor}25`,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: dirColor, textTransform: 'uppercase' }}>{msg.direction}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
            background: `${typeColor[msg.type]}20`, color: typeColor[msg.type],
          }}>{msg.type}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{msg.method}</span>
        </div>
        <pre style={{
          fontSize: 10, fontFamily: 'monospace', color: c.text,
          background: c.surfaceAlt, padding: 10, borderRadius: 6,
          overflow: 'auto', maxHeight: 120, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
          border: `1px solid ${c.border}`,
        }}>{JSON.stringify(JSON.parse(msg.payload), null, 2)}</pre>
        <div style={{ fontSize: 11, color: c.textLight, marginTop: 8, fontStyle: 'italic' }}>
          💡 {msg.annotation}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Step" value={`${step + 1}/${mcpHandshake.length}`} color={c.purple} />
        <InfoPill label="Phase" value={step < 3 ? 'Handshake' : step < 5 ? 'Discovery' : 'Invocation'} color={c.blue} />
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 2. Capability Negotiation Visualizer
// ══════════════════════════════════════════════════════════════════════════

interface Capability {
  name: string; desc: string
}

const clientCaps: Capability[] = [
  { name: 'roots', desc: 'Expose filesystem roots to server' },
  { name: 'sampling', desc: 'Allow server to request LLM completions' },
  { name: 'experimental', desc: 'Enable experimental protocol features' },
]

const serverCaps: Capability[] = [
  { name: 'tools', desc: 'Server provides callable tools' },
  { name: 'resources', desc: 'Server exposes readable resources' },
  { name: 'prompts', desc: 'Server provides prompt templates' },
  { name: 'logging', desc: 'Server can send log messages' },
]

export function CapabilityNegotiationViz() {
  const c = useDiagramColors()
  const [clientEnabled, setClientEnabled] = useState<boolean[]>(clientCaps.map(() => true))
  const [serverEnabled, setServerEnabled] = useState<boolean[]>(serverCaps.map(() => true))

  const toggleClient = (i: number) => { const n = [...clientEnabled]; n[i] = !n[i]; setClientEnabled(n) }
  const toggleServer = (i: number) => { const n = [...serverEnabled]; n[i] = !n[i]; setServerEnabled(n) }

  const activeClientCaps = clientCaps.filter((_, i) => clientEnabled[i]).map(c2 => c2.name)
  const activeServerCaps = serverCaps.filter((_, i) => serverEnabled[i]).map(c2 => c2.name)

  // What features are actually available
  const canUseSampling = activeClientCaps.includes('sampling')
  const hasTools = activeServerCaps.includes('tools')
  const hasResources = activeServerCaps.includes('resources')

  return (
    <DiagramBox title="🤝 Capability Negotiation — Client ↔ Server Contract">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        MCP clients and servers negotiate capabilities during initialization. Toggle capabilities
        to see how the available feature set changes.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Client capabilities */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.blue, marginBottom: 8 }}>CLIENT CAPABILITIES</div>
          {clientCaps.map((cap, i) => (
            <label key={cap.name} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0', cursor: 'pointer',
            }}>
              <input type="checkbox" checked={clientEnabled[i]} onChange={() => toggleClient(i)} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: clientEnabled[i] ? c.text : c.textMuted }}>{cap.name}</div>
                <div style={{ fontSize: 10, color: c.textMuted }}>{cap.desc}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: c.textMuted }}>⇄</div>

        {/* Server capabilities */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.emerald, marginBottom: 8 }}>SERVER CAPABILITIES</div>
          {serverCaps.map((cap, i) => (
            <label key={cap.name} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0', cursor: 'pointer',
            }}>
              <input type="checkbox" checked={serverEnabled[i]} onChange={() => toggleServer(i)} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: serverEnabled[i] ? c.text : c.textMuted }}>{cap.name}</div>
                <div style={{ fontSize: 10, color: c.textMuted }}>{cap.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Negotiated result */}
      <div style={{
        padding: 12, borderRadius: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: c.amber, marginBottom: 6 }}>NEGOTIATED SESSION</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <InfoPill label="Tools" value={hasTools ? 'Available' : 'Disabled'} color={hasTools ? c.emerald : c.rose} />
          <InfoPill label="Resources" value={hasResources ? 'Available' : 'Disabled'} color={hasResources ? c.emerald : c.rose} />
          <InfoPill label="Sampling" value={canUseSampling ? 'Enabled' : 'Disabled'} color={canUseSampling ? c.emerald : c.rose} />
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 3. Transport Layer Explorer
// ══════════════════════════════════════════════════════════════════════════

interface Transport {
  name: string; protocol: string; direction: string
  latency: string; useCase: string; pros: string[]; cons: string[]
}

const transports: Transport[] = [
  {
    name: 'stdio', protocol: 'stdin/stdout', direction: 'Bidirectional',
    latency: 'Lowest (~0ms)', useCase: 'Local subprocess servers',
    pros: ['Zero network overhead', 'Simple process management', 'Works offline'],
    cons: ['Local only', 'One client per server process', 'No web support'],
  },
  {
    name: 'SSE (Streamable HTTP)', protocol: 'HTTP POST + Server-Sent Events', direction: 'Bidirectional (SSE for server → client)',
    latency: 'Low (~1-5ms)', useCase: 'Remote servers, web integrations',
    pros: ['Works over network', 'Streaming support', 'Firewall-friendly'],
    cons: ['Higher latency than stdio', 'Connection management', 'SSE limitations'],
  },
  {
    name: 'Custom HTTP', protocol: 'HTTP POST/GET', direction: 'Request-response',
    latency: 'Medium (~5-50ms)', useCase: 'Cloud-hosted tool services',
    pros: ['Standard web infrastructure', 'Easy to scale', 'Auth integration'],
    cons: ['No built-in streaming', 'Higher overhead', 'Polling for notifications'],
  },
]

export function TransportLayerExplorer() {
  const c = useDiagramColors()
  const [selected, setSelected] = useState(0)
  const t = transports[selected]

  return (
    <DiagramBox title="🔌 Transport Layer — stdio vs SSE vs HTTP">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        MCP is transport-agnostic. Choose a transport based on deployment context. Compare
        latency, bidirectionality, and scaling characteristics.
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        {transports.map((tr, i) => (
          <button key={tr.name} onClick={() => setSelected(i)} style={{
            padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: selected === i ? `2px solid ${c.stageColors[i]}` : `1px solid ${c.border}`,
            background: selected === i ? `${c.stageColors[i]}20` : 'transparent',
            color: selected === i ? c.stageColors[i] : c.textLight,
          }}>{tr.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <InfoPill label="Protocol" value={t.protocol} color={c.blue} />
            <InfoPill label="Direction" value={t.direction} color={c.purple} />
            <InfoPill label="Latency" value={t.latency} color={c.amber} />
            <InfoPill label="Use case" value={t.useCase} color={c.emerald} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 140, padding: 10, borderRadius: 8, background: c.emeraldBg, border: `1px solid ${c.emerald}30` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.emerald, marginBottom: 4 }}>✓ Pros</div>
            {t.pros.map(p => <div key={p} style={{ fontSize: 11, color: c.text }}>• {p}</div>)}
          </div>
          <div style={{ minWidth: 140, padding: 10, borderRadius: 8, background: c.roseBg, border: `1px solid ${c.rose}30` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.rose, marginBottom: 4 }}>✕ Cons</div>
            {t.cons.map(cn => <div key={cn} style={{ fontSize: 11, color: c.text }}>• {cn}</div>)}
          </div>
        </div>
      </div>
    </DiagramBox>
  )
}


// ══════════════════════════════════════════════════════════════════════════
// 4. Server Registry Simulator
// ══════════════════════════════════════════════════════════════════════════

interface MCPServer {
  name: string; transport: string; tools: Array<{ name: string; desc: string }>
  status: 'connected' | 'disconnected' | 'error'
}

const mockRegistry: MCPServer[] = [
  { name: 'weather-server', transport: 'stdio', status: 'connected',
    tools: [
      { name: 'get_weather', desc: 'Get current weather for a city' },
      { name: 'get_forecast', desc: 'Get 5-day weather forecast' },
    ] },
  { name: 'postgres-server', transport: 'stdio', status: 'connected',
    tools: [
      { name: 'query', desc: 'Execute read-only SQL query' },
      { name: 'list_tables', desc: 'List all database tables' },
      { name: 'describe_table', desc: 'Get table schema' },
    ] },
  { name: 'github-server', transport: 'SSE', status: 'connected',
    tools: [
      { name: 'search_repos', desc: 'Search GitHub repositories' },
      { name: 'get_issues', desc: 'List issues for a repo' },
      { name: 'create_issue', desc: 'Create a new issue' },
      { name: 'get_pull_requests', desc: 'List pull requests' },
    ] },
  { name: 'slack-server', transport: 'SSE', status: 'disconnected',
    tools: [
      { name: 'send_message', desc: 'Send message to a channel' },
      { name: 'search_messages', desc: 'Search message history' },
    ] },
]

export function ServerRegistrySimulator() {
  const c = useDiagramColors()
  const [selectedServer, setSelectedServer] = useState(0)
  const [servers, setServers] = useState(mockRegistry)

  const server = servers[selectedServer]
  const totalTools = servers.filter(s => s.status === 'connected').reduce((sum, s) => sum + s.tools.length, 0)

  const toggleStatus = (i: number) => {
    const next = [...servers]
    next[i] = { ...next[i], status: next[i].status === 'connected' ? 'disconnected' : 'connected' }
    setServers(next)
  }

  const statusColor: Record<string, string> = { connected: c.emerald, disconnected: c.textMuted, error: c.rose }

  return (
    <DiagramBox title="📂 MCP Server Registry — Tool Discovery">
      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
        An MCP host connects to multiple servers, each exposing tools. Toggle server connections
        to see how the available tool surface changes.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Server list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 200 }}>
          {servers.map((s, i) => (
            <div key={s.name} onClick={() => setSelectedServer(i)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
              borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s ease',
              background: selectedServer === i ? `${c.blue}15` : c.surfaceAlt,
              border: `1.5px solid ${selectedServer === i ? c.blue : c.border}`,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: statusColor[s.status],
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{s.name}</div>
                <div style={{ fontSize: 9, color: c.textMuted }}>{s.transport} · {s.tools.length} tools</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleStatus(i) }} style={{
                fontSize: 9, padding: '2px 6px', borderRadius: 4, cursor: 'pointer',
                border: `1px solid ${statusColor[s.status]}`,
                background: 'transparent', color: statusColor[s.status],
              }}>
                {s.status === 'connected' ? 'disconnect' : 'connect'}
              </button>
            </div>
          ))}
        </div>

        {/* Tool list for selected server */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.purple, marginBottom: 8 }}>
            {server.name} — Tools {server.status !== 'connected' && '(offline)'}
          </div>
          {server.tools.map(tool => (
            <div key={tool.name} style={{
              padding: '6px 10px', borderRadius: 6, marginBottom: 4,
              opacity: server.status === 'connected' ? 1 : 0.4,
              background: c.surfaceAlt, border: `1px solid ${c.border}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.blue, fontFamily: 'monospace' }}>{tool.name}</div>
              <div style={{ fontSize: 10, color: c.textMuted }}>{tool.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InfoPill label="Servers" value={`${servers.filter(s => s.status === 'connected').length}/${servers.length}`} color={c.emerald} />
        <InfoPill label="Available tools" value={String(totalTools)} color={c.blue} />
      </div>
    </DiagramBox>
  )
}
