import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Lightbulb, BracketsCurly, Users, GearSix, ShieldCheck, TrendUp, Brain } from "@phosphor-icons/react"
import FutureStateTree from "./FutureStateTree"

interface Props {
  onNavigate?: () => void
}

const Section: React.FC<{ title: string; icon: React.ReactNode; items: { title: string; summary: string; takeaway: string }[] }>
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
              <Badge variant="secondary" className="ring-1 ring-border">Future</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{it.summary}</p>
            <div className="text-sm">
              <span className="font-medium">Learner takeaway: </span>
              <span className="text-muted-foreground">{it.takeaway}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function FutureStateTrends({ onNavigate }: Props) {
  const [fit, setFit] = useState(false)

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
            takeaway: "Instrument your product for RL-style feedback; close the data → reward → deploy loop."
          },
          {
            title: "Automated UX Evolution",
            summary: "Interfaces morph based on usage patterns rather than handcrafted redesign cycles.",
            takeaway: "Ship UX that can reconfigure via policies and AB tests tied to outcome metrics."
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
            takeaway: "Prioritize retrieval, fine‑tuning, and reward modeling over bespoke pre‑training."
          },
          {
            title: "Code‑Native Interfaces",
            summary: "Composable, spec‑driven interfaces pair better with LLMs than rigid GUI-only surfaces.",
            takeaway: "Expose capabilities via APIs/schemas; treat UI as a thin layer over executable intents."
          },
          {
            title: "Model Diversity",
            summary: "Use ensembles of models/tools optimized per task, with routing and evaluation loops.",
            takeaway: "Adopt a model system: routers, evaluators, and canary rollouts per domain."
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
            takeaway: "Create role‑based AI curricula and certify usage in core workflows."
          },
          {
            title: "Full‑Stack Builders (Polymaths)",
            summary: "Generalists who span PM/engineering/design accelerate iteration cycles.",
            takeaway: "Form small autonomous pods; optimize for cycle time over functional silos."
          },
          {
            title: "Optimism as a Renewable Resource",
            summary: "Leaders model curiosity and momentum to align teams amidst rapid change.",
            takeaway: "Narrate wins, publish roadmaps, and celebrate shipped learning—weekly."
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
            takeaway: "Build an evaluator → optimizer pipeline; track outcome metrics, not vanity KPIs."
          },
          {
            title: "Adaptive Planning (Seasons)",
            summary: "Plan around secular shifts (e.g., agents) with flexible quarterly goals.",
            takeaway: "Run 8–12 week seasons with time‑boxed bets and intentional slack."
          },
          {
            title: "Reviewing Agent Work",
            summary: "As agents do more, human review and auditability become mandatory.",
            takeaway: "Implement rubric‑based review, provenance logging, and spot‑checks by default."
          },
          {
            title: "Reliability & Trust",
            summary: "Data residency, privacy, uptime, and safety trump feature quantity for enterprises.",
            takeaway: "Bake in guardrails, SLAs, and compliance evidence early."
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
            takeaway: "Model workflows as tasks + capabilities; orchestrate with agents where valuable."
          },
          {
            title: "AI in Daily Workflows",
            summary: "From meeting summaries to code drafts, AI already augments most roles.",
            takeaway: "Map top 5 workflows per role and integrate AI assists with measurable goals."
          },
          {
            title: "Humanity & Health",
            summary: "AI will expand human capability across health, education, and work.",
            takeaway: "Choose impact areas; set ethical guidelines and evaluation criteria upfront."
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
    </div>
  )
}
