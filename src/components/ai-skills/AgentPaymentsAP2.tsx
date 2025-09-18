import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, GitBranch, Shield, KeyRound, Layers3, Timer, Workflow, Lock, Link as LinkIcon } from 'lucide-react'
import { trackEvent } from '@/lib/analytics/ga'

interface Props {
  onNavigate?: () => void
}

/*
  Agentic Commerce & AP2 Module
  Purpose: Teach learners how AP2 extends A2A & MCP to enable trusted agent-led payments using a chain of cryptographically signed Mandates (Intent, Cart, Payment).
  NOTE: All explanations are original synthesis (no verbatim copying of source material).
*/

const Section: React.FC<{title: string; children: React.ReactNode; icon?: React.ReactNode; subtle?: boolean}> = ({title, children, icon, subtle}) => (
  <div className={`rounded-md border p-4 space-y-2 ${subtle ? 'bg-muted/30' : 'bg-card/40'}`}> 
    <h4 className="font-semibold flex items-center gap-2 text-sm tracking-tight">{icon}{title}</h4>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </div>
)

const CodeBlock: React.FC<{code: string; caption?: string}> = ({code, caption}) => (
  <div className="mt-3">
    {caption && <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{caption}</div>}
    <pre className="text-xs bg-neutral-900 text-neutral-200 p-3 rounded-md overflow-x-auto leading-relaxed"><code>{code}</code></pre>
  </div>
)

export default function AgentPaymentsAP2({ onNavigate }: Props) {
  // Telemetry: fire once on mount
  useEffect(() => {
    trackEvent({ action: 'module_view', category: 'ai_skills', label: 'agent-payments-ap2' })
  }, [])

  const Gloss: React.FC<{term: string; def: string}> = ({term, def}) => (
    <span className="underline decoration-dotted cursor-help" title={def}>{term}</span>
  )
  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2">Agentic Commerce & AP2 <Badge variant="outline" className="text-[10px]">Advanced</Badge></CardTitle>
              <p className="text-sm text-muted-foreground max-w-2xl">AP2 establishes cryptographically verifiable trust for agent‑initiated payments by chaining <Gloss term="Intent Mandate" def="Signed constraints + scope the user delegates to an agent." />, <Gloss term="Cart Mandate" def="Immutable snapshot of items & price user approved (or agent assembled within constraints)." /> and <Gloss term="Payment Mandate" def="Context credential signaling presence mode & agent involvement to networks." /> across the A2A + MCP + commerce stack.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <Section title="Quick Sequence (ASCII)" icon={<GitBranch className="w-4 h-4 text-primary"/>}>
            <pre className="text-[11px] leading-snug bg-neutral-900 text-neutral-200 p-3 rounded-md overflow-x-auto">
{`User            Agent                Merchant Agent        Payment Network
 |  express need   |                      |                     |
 |---------------> |                      |                     |
 |   sign Intent Mandate (VC #1)          |                     |
 |---------------- VC #1 ---------------->| (optional discovery)|
 |                  |--- A2A negotiate -->|                     |
 |                  |<-- offers / data ---|                     |
 |  approve cart?   |                      |                     |
 |----------------->| build Cart Mandate  |                     |
 |   (sign VC #2)   |---- VC #2 ---------->| validate/pricing    |
 |                  |                      |                     |
 |                  | create Payment Mandate (VC #3)             |
 |                  |--------- VC #3 --------------------------->|
 |                  |                      |  auth/settle        |
 |<---- status -----|<----- result --------|<------- result -----|
`}</pre>
            <p className="text-xs text-muted-foreground">Delegated flow: steps 1–4 can occur asynchronously; Cart Mandate generated only when constraints satisfied.</p>
          </Section>
          <div className="grid gap-4 md:grid-cols-2">
            <Section title="Why It Matters" icon={<Shield className="w-4 h-4 text-primary"/>}>
              <p>Once autonomous agents can place orders, traditional assumptions (“human clicked buy now”) collapse. AP2 defines shared evidence so ecosystems can accept agent‑led transactions without fragmenting into proprietary silos.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Authorization</strong>: Explicit, scoped user delegation.</li>
                <li><strong>Authenticity</strong>: Merchant confidence that the cart reflects real intent—not hallucination.</li>
                <li><strong>Accountability</strong>: Cryptographic audit trail for dispute resolution.</li>
              </ul>
            </Section>
            <Section title="Stack Context" icon={<Layers3 className="w-4 h-4 text-primary"/>}>
              <p>Think in layers:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li><strong>MCP</strong>: Agents invoke tools, fetch context, enrich product & pricing knowledge.</li>
                <li><strong>A2A</strong>: Agents negotiate capabilities & commerce session semantics.</li>
                <li><strong>AP2</strong>: Generates & verifies Mandates (verifiable credentials) to formalize intent → cart → payment trust chain.</li>
              </ol>
              <p className="mt-1">Extensions (e.g. x402) plug into AP2 for stablecoin / crypto rails.</p>
            </Section>
          </div>

          <Section title="Mandate Chain (Core Mechanism)" icon={<GitBranch className="w-4 h-4 text-primary"/>}>
            <p>AP2 encodes payment authority & correctness as signed Verifiable Credentials (VCs):</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong><Gloss term="Intent Mandate" def="User-authorized constraints + guardrails governing a purchase scope." /></strong>: Scope + constraints (price caps, timing, categories); basis for delegated autonomy.</li>
              <li><strong><Gloss term="Cart Mandate" def="Immutable, signed list of items & total bound to the originating Intent." /></strong>: Canonical snapshot of items, quantity, price; user confirms (human‑present) or agent assembles within constraints (delegated).</li>
              <li><strong><Gloss term="Payment Mandate" def="Credential delivered to payment rails conveying presence + agent context." /></strong>: Signals transaction context (agent involvement, presence mode) to networks & issuers.</li>
            </ul>
            <p className="text-xs text-muted-foreground">Chain gives non‑repudiation: each downstream mandate is cryptographically linked to upstream intent context.</p>
          </Section>

          <div className="grid gap-4 md:grid-cols-2">
            <Section title="Human-Present Flow" icon={<Workflow className="w-4 h-4 text-primary"/>} subtle>
              <ol className="list-decimal pl-4 space-y-1">
                <li>User expresses need (natural language) → lightweight Intent Mandate created.</li>
                <li>Agent explores offers (MCP tools, A2A merchant sessions).</li>
                <li>Proposed cart surfaced to user.</li>
                <li>User approves → Cart Mandate signed.</li>
                <li>Payment Mandate issued → rails process with enriched context.</li>
              </ol>
            </Section>
            <Section title="Delegated / Scheduled Flow" icon={<Timer className="w-4 h-4 text-primary"/>} subtle>
              <ol className="list-decimal pl-4 space-y-1">
                <li>User signs rich Intent Mandate (constraints & guardrails).</li>
                <li>Agent monitors or awaits trigger (inventory, price, time window).</li>
                <li>Conditions satisfied → agent constructs compliant Cart Mandate.</li>
                <li>Payment Mandate dispatched automatically.</li>
                <li>Audit chain available for post‑facto review / disputes.</li>
              </ol>
            </Section>
          </div>

          <Section title="Security & Privacy Dimensions" icon={<Lock className="w-4 h-4 text-primary"/>}>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Least Authority Delegation</strong>: Intent Mandate defines boundaries; avoid blanket unlimited spend.</li>
              <li><strong>Deterministic Cart</strong>: Prevents post‑approval mutations (WYSIWYP: what you see is what you pay).</li>
              <li><strong>Presence Signaling</strong>: Distinguishes risk posture (human‑present vs autonomous execution).</li>
              <li><strong>Selective Disclosure</strong>: Role-based data partitioning across merchant, payment network, issuer.</li>
              <li><strong>Auditability</strong>: Cryptographic linkage → streamlined dispute triage.</li>
            </ul>
          </Section>

          <Section title="Adoption Checklist" icon={<CheckCircle2 className="w-4 h-4 text-primary"/>}>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Model user delegation UX (capture explicit constraints early).</li>
              <li>Represent Intent Mandate as a signed VC (library / SDK or custom impl).</li>
              <li>Integrate merchant agent discovery via A2A; define capability envelope.</li>
              <li>Enforce price & category constraints before Cart Mandate issuance.</li>
              <li>Emit Payment Mandate with presence + agent metadata.</li>
              <li>Persist mandate chain for audit / analytics (hash linking).</li>
              <li>Extend to x402 / alternative rails if crypto or push payments required.</li>
            </ol>
          </Section>

          <Section title="Pseudocode (Conceptual Only)" icon={<KeyRound className="w-4 h-4 text-primary"/>}>
            <CodeBlock caption="Mandate lifecycle (simplified pseudo)" code={`// 1. Capture user delegation\nconst intent = signIntentMandate({\n  userId,\n  constraints: { maxTotal: '250.00', currency: 'USD', categories:['footwear'], expiresAt },\n  mode: 'DELEGATED'\n})\n\n// 2. Merchant / offer exploration (A2A negotiated)\nconst candidate = agent.searchOffers(intent) // uses MCP tools + merchant agents\n\n// 3. Validate against constraints\nif(!withinConstraints(candidate, intent.constraints)) throw new Error('Out of bounds')\n\n// 4. Cart mandate (delegated path auto-generated)\nconst cart = signCartMandate({ intentRef: intent.id, items: candidate.items, total: candidate.total })\n\n// 5. Payment mandate for network / issuer\nconst payment = signPaymentMandate({\n  cartRef: cart.id,\n  presence: 'HUMAN_NOT_PRESENT',\n  agentMeta: { model: 'gpt-xyz', version: '2025-09' }\n})\n\n// 6. Submit to payment rails (abstract)\nsubmitPayment(payment)\n\n// 7. Persist linkage for audit\npersistChain(intent, cart, payment)`} />
          </Section>

          <Section title="Comparison" icon={<Shield className="w-4 h-4 text-primary"/>} subtle>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-1 pr-2 font-medium">Aspect</th>
                  <th className="py-1 pr-2 font-medium">Ad-hoc Agent Payment</th>
                  <th className="py-1 pr-2 font-medium">AP2 Approach</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b last:border-b-0">
                  <td className="py-1 pr-2">Delegation Proof</td>
                  <td className="py-1 pr-2">Implicit / logs</td>
                  <td className="py-1 pr-2">Signed Intent Mandate (VC)</td>
                </tr>
                <tr className="border-b last:border-b-0">
                  <td className="py-1 pr-2">Cart Integrity</td>
                  <td className="py-1 pr-2">Mutable request payload</td>
                  <td className="py-1 pr-2">Immutable Cart Mandate snapshot</td>
                </tr>
                <tr className="border-b last:border-b-0">
                  <td className="py-1 pr-2">Presence Signaling</td>
                  <td className="py-1 pr-2">Not standardized</td>
                  <td className="py-1 pr-2">Payment Mandate presence flag</td>
                </tr>
                <tr className="border-b last:border-b-0">
                  <td className="py-1 pr-2">Risk / Dispute Trace</td>
                  <td className="py-1 pr-2">Heuristic reconstruction</td>
                  <td className="py-1 pr-2">Cryptographically linked chain</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2">Multi-Rail Extensibility</td>
                  <td className="py-1 pr-2">Custom adapters</td>
                  <td className="py-1 pr-2">Protocol extensions (e.g. x402)</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="Where This Plugs Into Your Architecture" icon={<Workflow className="w-4 h-4 text-primary"/>}>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Tool Invocation (MCP)</strong>: Product / inventory / pricing retrieval before Cart assembly.</li>
              <li><strong>Agent Negotiation (A2A)</strong>: Merchant capability discovery & offer session creation.</li>
              <li><strong>Governance (Safety & Security Modules)</strong>: Constraint validation & spend policy checks pre Cart Mandate.</li>
              <li><strong>Multi-Agent Orchestration</strong>: Supervisor agent decides when delegated conditions are satisfied.</li>
              <li><strong>Observability & EvalOps</strong>: Store mandate chain hashes for replay / anomaly detection.</li>
              <li><strong>Cost & Performance</strong>: Evaluate long-lived delegated monitoring cost vs conversion lift.</li>
            </ul>
          </Section>
          <Section title="Cross-References" icon={<LinkIcon className="w-4 h-4 text-primary"/>} subtle>
            <p className="text-xs">Explore related modules to reinforce AP2 context:</p>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li><button onClick={() => document.getElementById('safety')?.scrollIntoView({behavior:'smooth'})} className="underline decoration-dotted">Safety & Governance</button> – policy & adversarial testing before delegation.</li>
              <li><button onClick={() => document.getElementById('security-data-boundaries')?.scrollIntoView({behavior:'smooth'})} className="underline decoration-dotted">Security & Data Boundaries</button> – data isolation for mandate generation context.</li>
              <li><button onClick={() => document.getElementById('multi-agent-orchestration')?.scrollIntoView({behavior:'smooth'})} className="underline decoration-dotted">Multi-Agent Orchestration</button> – supervisor patterns that trigger Cart formation.</li>
            </ul>
          </Section>
          <Section title="References" icon={<Shield className="w-4 h-4 text-primary"/>} subtle>
            <ol className="list-decimal pl-4 space-y-1 text-xs">
              <li><a href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" target="_blank" rel="noopener noreferrer" className="underline">AP2 Announcement Blog</a></li>
              <li><a href="https://ap2-protocol.org/" target="_blank" rel="noopener noreferrer" className="underline">AP2 Protocol Documentation</a></li>
              <li><a href="https://github.com/google-agentic-commerce/AP2" target="_blank" rel="noopener noreferrer" className="underline">AP2 GitHub Repository</a></li>
            </ol>
          </Section>
          <Section title="Next Steps" icon={<Workflow className="w-4 h-4 text-primary"/>}>
            <p>Run a reference scenario (human-present & delegated). Map current flows to mandate lifecycle; introduce signing stubs, then replace with real VC primitives. Add telemetry for mandate creation latency, and simulate dispute trace with hash chain reconstruction.</p>
          </Section>
        </CardContent>
      </Card>
    </div>
  )
}
