import React, { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Lightbulb, BracketsCurly, Users, GearSix, ShieldCheck, TrendUp, Brain } from "@phosphor-icons/react"
import FutureStateTree from "./FutureStateTree"
import TranslateButton from '@/components/ai/TranslateButton'

interface Props {
  onNavigate?: () => void
}

type Horizon = 'Now' | '6–12m' | '24–36m'
type Confidence = 'Low' | 'Med' | 'High'

type PracticeLink = { label: string; href: string; kind?: 'Study' | 'Playbook' }
type TrendItem = {
  title: string
  summary: string
  takeaway: string
  horizon?: Horizon
  confidence?: Confidence
  practice?: PracticeLink[]
}

const Section: React.FC<{ title: string; icon: React.ReactNode; items: TrendItem[] }>
  = ({ title, icon, items }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
      <CardDescription>
        Key shifts and what they mean for builders and leaders
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <div key={it.title} className="p-4 rounded-lg border bg-muted text-foreground">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-base">{it.title}</h4>
              <div className="flex items-center gap-2">
                {it.horizon && (
                  <Badge variant="secondary" className="ring-1 ring-border" aria-label={`Horizon ${it.horizon}`}>{it.horizon}</Badge>
                )}
                {it.confidence && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground" aria-label={`Confidence ${it.confidence}`}>
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          it.confidence === 'High' ? 'var(--primary)' :
                          it.confidence === 'Med' ? 'oklch(65% 0.12 80)' :
                          'oklch(65% 0.12 20)'
                      }}
                    />
                    {it.confidence}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{it.summary}</p>
            <div className="text-sm">
              <span className="font-medium">Learner takeaway: </span>
              <span className="text-muted-foreground">{it.takeaway}</span>
            </div>
            {it.practice && it.practice.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {it.practice.map((p) => (
                  <a
                    key={p.href + p.label}
                    href={p.href}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel={p.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border bg-card text-sm hover:bg-card/80"
                    aria-label={`${p.kind ?? 'Practice'}: ${p.label}`}
                  >
                    <span className="text-xs font-medium text-muted-foreground">{p.kind ?? 'Practice'}</span>
                    <span className="text-xs">{p.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function FutureStateTrends({ onNavigate }: Props) {
  const [fit, setFit] = useState(false)
  const overviewRef = useRef<HTMLDivElement | null>(null)

  const FitToggle = () => (
    <button
      type="button"
      onClick={() => setFit((v) => !v)}
      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border bg-muted hover:bg-muted/80"
      aria-pressed={fit}
      title={fit ? 'Disable fit to width' : 'Enable fit to width'}
    >
      <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: fit ? 'var(--primary)' : 'transparent', outline: '1px solid var(--border)' }} />
      {fit ? 'Fit: On' : 'Fit: Off'}
    </button>
  )

  const FitTree = () => <FutureStateTree fitToWidth={fit} />

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            The Future State of AI‑Native Practices
          </CardTitle>
          <CardDescription>
            A clear, practical overview of where things are heading—and what to do about it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={overviewRef}>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <li>• Products become <span className="font-medium">learning organisms</span> that adapt continuously</li>
              <li>• <span className="font-medium">Post‑training</span> on your data beats building models from scratch</li>
              <li>• Rise of an <span className="font-medium">agentic society</span> focused on throughput and work graphs</li>
              <li>• Shift from GUIs to <span className="font-medium">code‑native, composable interfaces</span></li>
              <li>• Everyone needs <span className="font-medium">AI fluency</span>; polymaths increase team velocity</li>
              <li>• Obsess over the <span className="font-medium">loop (data → reward → outcomes)</span>, not the lane</li>
              <li>• Plan in <span className="font-medium">seasons</span>, not rigid roadmaps</li>
              <li>• <span className="font-medium">Reliability, privacy, and trust</span> drive enterprise adoption</li>
              <li>• <span className="font-medium">Automated UX</span> adapts based on usage; humans review agent work</li>
              <li>• AI is already in daily workflows and will have <span className="font-medium">societal impact</span></li>
              <li>• Prefer <span className="font-medium">model diversity</span> (ensembles) over single‑model bets</li>
            </ul>
            <div className="mt-3">
              <TranslateButton
                targetRef={overviewRef}
                capture="inner"
                variant="outline"
                size="sm"
                className="text-xs"
                title="Tip: Select text first for best results, or this will translate the whole section."
              >
                Ask AI: Translate
              </TranslateButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend: Horizon & Confidence */}
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Legend: Horizon & Confidence
          </CardTitle>
          <CardDescription>How to read timing and certainty on each trend.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="ring-1 ring-border">Now</Badge>
              <Badge variant="secondary" className="ring-1 ring-border">6–12m</Badge>
              <Badge variant="secondary" className="ring-1 ring-border">24–36m</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor:'var(--primary)'}} /> High</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor:'oklch(65% 0.12 80)'}} /> Med</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor:'oklch(65% 0.12 20)'}} /> Low</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product & UX */}
      <Section
        title="Product & UX"
        icon={<Lightbulb className="w-5 h-5" />}
        items={[
          {
            title: "Product as Organism",
            summary: "Shift from static artifacts to adaptive systems that learn from telemetry and human feedback.",
            takeaway: "Instrument your product for RL-style feedback; close the data → reward → deploy loop.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Feedback Loops', href: '/study-mode', kind: 'Study' },
              { label: 'Playbook: RL-style Instrumentation', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Automated UX Evolution",
            summary: "Interfaces morph based on usage patterns rather than handcrafted redesign cycles.",
            takeaway: "Ship UX that can reconfigure via policies and AB tests tied to outcome metrics.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Scenario: Policy-Driven UX', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: AB Test Harness', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Agent-Aware UX",
            summary: "Conversational + direct manipulation + reversible actions; show agent state, intent, and provenance.",
            takeaway: "Expose agent thinking safely (summaries), add preview/apply flows, and easy rollback.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Debug: Multi-agent Orchestration', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Preview→Apply Pipeline', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
      />

      {/* Technical Strategy */}
      <Section
        title="Technical Strategy"
        icon={<BracketsCurly className="w-5 h-5" />}
        items={[
          {
            title: "Post‑Training > Pre‑Training",
            summary: "Fine‑tune and align foundation models with your proprietary data and tasks.",
            takeaway: "Prioritize retrieval, fine‑tuning, and reward modeling over bespoke pre‑training.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Post-Training vs Pre', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Fine-tune + RAG', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Code‑Native Interfaces",
            summary: "Composable, spec‑driven interfaces pair better with LLMs than rigid GUI-only surfaces.",
            takeaway: "Expose capabilities via APIs/schemas; treat UI as a thin layer over executable intents.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Scenario: Intent APIs', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Tools/Actions Contracts', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Model Diversity",
            summary: "Use ensembles of models/tools optimized per task, with routing and evaluation loops.",
            takeaway: "Adopt a model system: routers, evaluators, and canary rollouts per domain.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Socratic: Routing & Evals', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Canary Routing', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "RAG 2.0 (Plan→Retrieve→Reason)",
            summary: "Move beyond naive retrieval; structured planning, multi-hop retrieval, and tool use.",
            takeaway: "Invest in query planning, re-ranking, and evaluator-driven retrieval tests.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Scenario: Multi-hop Retrieval', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Planner + Re-ranker', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "On-Device + Edge Models",
            summary: "Privacy/latency-sensitive tasks shift partially on-device; hybrid cloud-edge orchestration emerges.",
            takeaway: "Segment workloads by privacy/latency; prefer hybrid APIs that target device + cloud.",
            horizon: '24–36m',
            confidence: 'Med',
            practice: [
              { label: 'Socratic: Edge vs Cloud', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Hybrid Orchestration', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
      />

      {/* Organization & People */}
      <Section
        title="Organization & People"
        icon={<Users className="w-5 h-5" />}
        items={[
          {
            title: "AI Fluency for All",
            summary: "Top companies train every role to use and reason about AI, not just specialists.",
            takeaway: "Create role‑based AI curricula and certify usage in core workflows.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Role-based Fluency', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: AI Curriculum', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Full‑Stack Builders (Polymaths)",
            summary: "Generalists who span PM/engineering/design accelerate iteration cycles.",
            takeaway: "Form small autonomous pods; optimize for cycle time over functional silos.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Scenario: Pod Topologies', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Pod Paved Paths', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Optimism as a Renewable Resource",
            summary: "Leaders model curiosity and momentum to align teams amidst rapid change.",
            takeaway: "Narrate wins, publish roadmaps, and celebrate shipped learning—weekly.",
            horizon: 'Now',
            confidence: 'Med',
            practice: [
              { label: 'Scenario: Narrative Cadence', href: '/study-mode', kind: 'Study' }
            ]
          },
          {
            title: "AI Platform Team Pattern",
            summary: "Central platform team provides evals, routing, data connectors, safety, and cost controls.",
            takeaway: "Stand up a small platform group; product teams self-serve via paved paths.",
            horizon: '6–12m',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Platform Scope', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Platform MVP', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
      />

      {/* Operations & Process */}
      <Section
        title="Operations & Process"
        icon={<GearSix className="w-5 h-5" />}
        items={[
          {
            title: "Loop, Not the Lane",
            summary: "Close the loop from data gathering to reward signals and deployment.",
            takeaway: "Build an evaluator → optimizer pipeline; track outcome metrics, not vanity KPIs.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Outcome Metrics', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Eval Pipeline', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Adaptive Planning (Seasons)",
            summary: "Plan around secular shifts (e.g., agents) with flexible quarterly goals.",
            takeaway: "Run 8–12 week seasons with time‑boxed bets and intentional slack.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Scenario: Season Planning', href: '/study-mode', kind: 'Study' }
            ]
          },
          {
            title: "Reviewing Agent Work",
            summary: "As agents do more, human review and auditability become mandatory.",
            takeaway: "Implement rubric‑based review, provenance logging, and spot‑checks by default.",
            horizon: '6–12m',
            confidence: 'High',
            practice: [
              { label: 'Debug: Review Rubrics', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Provenance Logging', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Reliability & Trust",
            summary: "Data residency, privacy, uptime, and safety trump feature quantity for enterprises.",
            takeaway: "Bake in guardrails, SLAs, and compliance evidence early.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Trust Signals', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: SLAs & Evidence', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Autonomy Levels (L0→L4)",
            summary: "Define autonomy tiers with gating: preview-only → supervised apply → exception-only → unsupervised.",
            takeaway: "Map tasks to autonomy levels with kill-switches and telemetry at each step.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Scenario: Gating & Kill Switch', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Level Gates', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
      />

      {/* Adoption & Impact */}
      <Section
        title="Adoption & Impact"
        icon={<ShieldCheck className="w-5 h-5" />}
        items={[
          {
            title: "Agentic Society",
            summary: "Work structures shift from org charts to work graphs centered on throughput.",
            takeaway: "Model workflows as tasks + capabilities; orchestrate with agents where valuable.",
            horizon: '24–36m',
            confidence: 'Med',
            practice: [
              { label: 'Socratic: Work Graphs', href: '/study-mode', kind: 'Study' }
            ]
          },
          {
            title: "AI in Daily Workflows",
            summary: "From meeting summaries to code drafts, AI already augments most roles.",
            takeaway: "Map top 5 workflows per role and integrate AI assists with measurable goals.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Scenario: Role Top-5', href: '/study-mode', kind: 'Study' }
            ]
          },
          {
            title: "Humanity & Health",
            summary: "AI will expand human capability across health, education, and work.",
            takeaway: "Choose impact areas; set ethical guidelines and evaluation criteria upfront.",
            horizon: '24–36m',
            confidence: 'Med',
            practice: [
              { label: 'Socratic: Ethical Evaluation', href: '/study-mode', kind: 'Study' }
            ]
          }
        ]}
      />

      {/* Autonomy & Safety */}
      <Section
        title="Autonomy & Safety"
        icon={<ShieldCheck className="w-5 h-5" />}
        items={[
          {
            title: "Evals Everywhere",
            summary: "Pre-deploy, canary, and post-deploy evals become standard; red-team automation scales.",
            takeaway: "Stand up golden tasks, synthetic + human eval sets, and track regressions in CI/CD.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Recipe: CI Evals', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Provenance & Audit",
            summary: "Signed inputs/outputs, datasets lineage, and action logs become reviewable artifacts.",
            takeaway: "Capture inputs, tool calls, and diffs; store immutable logs with retention policies.",
            horizon: '6–12m',
            confidence: 'High',
            practice: [
              { label: 'Recipe: Audit Trail', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Safety-as-Policy",
            summary: "Guardrails move from prompts to policies enforced at runtime with overrides and review.",
            takeaway: "Use policy engines to mediate actions and data access; separate safety from prompts.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Scenario: Policy Engine', href: '/study-mode', kind: 'Study' }
            ]
          }
        ]}
      />
      {/* Economics & Infra */}
      <Section
        title="Economics & Infra"
        icon={<TrendUp className="w-5 h-5" />}
        items={[
          {
            title: "Outcome-Based Pricing",
            summary: "Shift from per-token to per-outcome pricing for high-value workflows.",
            takeaway: "Define per-task unit economics; meter by outcome and share ROI with customers.",
            horizon: '24–36m',
            confidence: 'Med',
            practice: [
              { label: 'Socratic: Unit Economics', href: '/study-mode', kind: 'Study' }
            ]
          },
          {
            title: "Cost Controls via Routing",
            summary: "Speculative decoding, caching, and small-model fallbacks reduce spend.",
            takeaway: "Build a router with cost/latency targets, caching, and budget alarms.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Recipe: Cost Router', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Platform Portability",
            summary: "Multi-provider abstractions and open schemas (tools/actions/MCP) reduce lock-in.",
            takeaway: "Adopt provider-agnostic contracts; test across top-3 providers regularly.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Recipe: Provider Abstraction', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
      />

      {/* Interop & Ecosystem */}
      <Section
        title="Interop & Ecosystem"
        icon={<BracketsCurly className="w-5 h-5" />}
        items={[
          {
            title: "Open Tool Protocols",
            summary: "Convergence on action/tool schemas (e.g., MCP-like) improves agent interoperability.",
            takeaway: "Define tools with explicit contracts and auth; publish catalogs.",
            horizon: '6–12m',
            confidence: 'Med',
            practice: [
              { label: 'Recipe: Tool Catalog', href: '/playbook', kind: 'Playbook' }
            ]
          },
          {
            title: "Domain-Specific Models",
            summary: "Thin domain models and fine-tunes outperform generalists for key tasks.",
            takeaway: "Curate domain data; maintain task-specific evals and small fine-tunes.",
            horizon: 'Now',
            confidence: 'High',
            practice: [
              { label: 'Socratic: Domain Data', href: '/study-mode', kind: 'Study' },
              { label: 'Recipe: Task Evals', href: '/playbook', kind: 'Playbook' }
            ]
          }
        ]}
  />

      {/* Visual Map */}
      <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Visual Map: Building Products in the Age of AI
                </CardTitle>
                {/* Fit toggle */}
                <FitToggle />
              </div>
              <CardDescription>
                A whiteboard-style, collapsible D3 tree that ties the themes together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FitTree />
              <div className="mt-3 text-xs text-muted-foreground">
                Reference: <a
                  href="https://www.youtube.com/watch?v=J9UWaltU-7Q"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline hover:text-foreground"
                  aria-label="Open YouTube reference for tree visualization"
                >YouTube – Tree visualization</a>
              </div>
            </CardContent>
      </Card>

      {/* Autonomy Matrix (tasks vs L0–L4) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GearSix className="w-5 h-5" />
            Autonomy Matrix
          </CardTitle>
          <CardDescription>Current coverage across autonomy levels: L0 (preview-only) → L4 (unsupervised).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="p-2 font-medium">Task</th>
                  <th className="p-2">L0</th>
                  <th className="p-2">L1</th>
                  <th className="p-2">L2</th>
                  <th className="p-2">L3</th>
                  <th className="p-2">L4</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'Codegen PRs', levels: [true, true, true, false, false] },
                  { task: 'Doc Summaries', levels: [true, true, true, true, false] },
                  { task: 'Data Analysis', levels: [true, true, true, false, false] },
                  { task: 'Incident Triage', levels: [true, true, false, false, false] },
                  { task: 'Customer Replies', levels: [true, true, true, false, false] },
                  { task: 'Infra Changes', levels: [true, false, false, false, false] }
                ].map((row) => (
                  <tr key={row.task} className="border-t">
                    <td className="p-2 font-medium">{row.task}</td>
                    {row.levels.map((on, i) => (
                      <td key={i} className="p-2">
                        <div
                          role="img"
                          className="inline-block w-5 h-5 rounded-sm"
                          style={{
                            backgroundColor: on ? 'var(--primary)' : 'transparent',
                            outline: '1px solid var(--border)'
                          }}
                          aria-label={`${row.task} L${i}${on ? ' enabled' : ' disabled'}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            L0=Preview; L1=Apply w/ Review; L2=Apply w/ Exception Review; L3=Apply + Rollback; L4=Unsupervised.
          </div>
        </CardContent>
      </Card>

      {/* Invariants & Tripwires */}
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Invariants, Unknowns, and Tripwires
          </CardTitle>
          <CardDescription>What likely won’t change, what might, and what to watch in the next 24–36 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Invariants</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Data quality and coverage matter more than prompts.</li>
                <li>• Evals and telemetry are mandatory to ship safely.</li>
                <li>• Privacy, provenance, and consent are table stakes.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Unknowns</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Regulatory pace and global fragmentation.</li>
                <li>• Energy constraints and inference economics.</li>
                <li>• IP/watermarking standards and enforcement.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tripwires</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Safety incidents or data leaks—pause and review.</li>
                <li>• Cost spikes—enable stricter routing + caching.</li>
                <li>• Model regressions—roll back via canary gates.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple next step prompt */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Try this next</div>
              <div className="text-sm text-muted-foreground">Pick one product area and run a 10‑day "season": instrument → evaluate → ship learnings.</div>
            </div>
            {onNavigate && (
              <button onClick={onNavigate} className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground">
                Continue Learning Journey
              </button>
            )}
          </div>
        </CardContent>
      </Card>
  {/* Translate modal handled inside TranslateButton */}
    </div>
  )
}
