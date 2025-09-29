import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Robot, MapPin, ShieldCheck, FlowArrow, ChartBar, Lightning } from "@phosphor-icons/react"
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock, conceptPill } from "./conceptStyles"
import ReferenceSection from "@/components/references/ReferenceSection"

interface AgenticRoboticsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const capabilityPill = (label: string) => (
  <span className={conceptPill("text-xs font-semibold uppercase tracking-wide")}>{label}</span>
)

export default function AgenticRoboticsConcept({ onMarkComplete, onNavigateToNext }: AgenticRoboticsConceptProps) {
  const tabs = [
    {
      id: "foundation",
      title: "Foundation & Capabilities",
      description: "Understand what Gemini Robotics unlocks for embodied agents",
      icon: <Brain className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="w-5 h-5" />
                Embodied Agent Fundamentals
              </CardTitle>
              <CardDescription>
                Gemini Robotics 1.5 fuses multimodal understanding, grounded reasoning, and motion primitives into one stack.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-2")}
                >
                  <h4 className="font-semibold">Multimodal Grounding</h4>
                  <p className="text-muted-foreground text-lg">
                    Native perception over RGB, depth, language, and force signals—understands a scene, not just text prompts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capabilityPill("Visual QA")}
                    {capabilityPill("Spatial Reasoning")}
                    {capabilityPill("Scene Memory")}
                  </div>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}
                >
                  <h4 className="font-semibold">Task Sequencing</h4>
                  <p className="text-muted-foreground text-lg">
                    Language-to-action models translate high-level goals into kinesthetic plans and tool invocations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capabilityPill("Policy Distillation")}
                    {capabilityPill("Skill Libraries")}
                    {capabilityPill("Closed-loop Control")}
                  </div>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}
                >
                  <h4 className="font-semibold">Interactive Telepresence</h4>
                  <p className="text-muted-foreground text-lg">
                    Natural-language teleoperation lets humans hand off intent, audit execution, and request live summaries.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capabilityPill("Mixed Initiative")}
                    {capabilityPill("Realtime QA")}
                  </div>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}
                >
                  <h4 className="font-semibold">Safety Guardrails</h4>
                  <p className="text-muted-foreground text-lg">
                    Gemini Guard plus ER-15 sandboxing enforce no-go zones, object verification, and fail-safe motions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capabilityPill("Geo-fencing")}
                    {capabilityPill("Risk Scoring")}
                    {capabilityPill("Self-halt")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>High-Value Sectors</CardTitle>
              <CardDescription>
                Where embodied agent patterns deliver 10× leverage first.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Logistics & Warehousing",
                  insights: [
                    "Dynamic picking across cluttered bins",
                    "Nav-mesh aware path planning in live facilities",
                    "Cycle counting + anomaly reporting at night"
                  ]
                },
                {
                  title: "Retail & Hospitality",
                  insights: [
                    "Shelf restocking with planogram validation",
                    "Point-of-sale support with natural-language handoff",
                    "Guest amenity delivery in constrained spaces"
                  ]
                },
                {
                  title: "Labs & Field Service",
                  insights: [
                    "Micropipette task suites with compliance logs",
                    "Valve inspection plus digital twin updates",
                    "Swarm coordination for outdoor infrastructure"
                  ]
                }
              ].map((sector) => (
                <div key={sector.title} className={conceptSurfaceSoft("p-4 space-y-3 border border-primary/20")}
                >
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {sector.title}
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-lg">
                    {sector.insights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="agentic-robotics-integration" />
        </div>
      )
    },
    {
      id: "systems",
      title: "Systems Design Stack",
      description: "Blueprint the perception → planning → actuation loop",
      icon: <FlowArrow className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gemini Robotics Control Stack</CardTitle>
              <CardDescription>
                Layer the model family with motion policies, real-time feedback, and fleet operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="loop" className="w-full">
                <TabsList className="grid grid-cols-1 md:grid-cols-3">
                  <TabsTrigger value="loop">Perception → Action Loop</TabsTrigger>
                  <TabsTrigger value="telemetry">Telemetry & Guardrails</TabsTrigger>
                  <TabsTrigger value="ops">Ops & Toolchain</TabsTrigger>
                </TabsList>
                <TabsContent value="loop" className="space-y-3">
                  <div className={conceptSurfaceSoft("p-4 space-y-2")}
                  >
                    <h4 className="font-semibold">Closed-Loop Lifecycle</h4>
                    <ol className="space-y-2 text-muted-foreground text-lg list-decimal list-inside">
                      <li>Observe: Gemini captures RGB-D frames, tactile signals, and context prompts</li>
                      <li>Reason: Language model grounds intent, queries memory, and selects skill graphs</li>
                      <li>Act: Motion planner parameters go to low-level controllers with safety overlays</li>
                      <li>Reflect: Execution traces feed evaluation tasks and adapt future prompts</li>
                    </ol>
                  </div>
                </TabsContent>
                <TabsContent value="telemetry" className="space-y-3">
                  <div className={conceptSurfaceSoft("p-4 space-y-2")}
                  >
                    <h4 className="font-semibold">Operational Guardrails</h4>
                    <ul className="space-y-2 text-muted-foreground text-lg">
                      <li><strong>Gemini Guard:</strong> textual + visual policy filters before actuation</li>
                      <li><strong>Safety Bubble:</strong> learned proximity envelope triggers safe stop</li>
                      <li><strong>Action Audits:</strong> clipped video + narration for human override</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="ops" className="space-y-3">
                  <div className={conceptSurfaceSoft("p-4 space-y-2")}
                  >
                    <h4 className="font-semibold">Engineering Toolchain</h4>
                    <p className="text-muted-foreground text-lg">
                      ER-15 provides a synthetic, physics-consistent sandbox to test policies before release. Connect telemetry streams to AIOps pipelines for alerting, and use Gemini Live Sessions for rapid iteration.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">{capabilityPill("ER-15 Env")}<span>Update skills safely</span></div>
                      <div className="flex items-center gap-2">{capabilityPill("Fleet APIs")}<span>Deploy & rollback robots</span></div>
                      <div className="flex items-center gap-2">{capabilityPill("Live Sessions")}<span>Human-in-the-loop refinement</span></div>
                      <div className="flex items-center gap-2">{capabilityPill("Digital Twins")}<span>Sync plant state</span></div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reference Architecture Sketch</CardTitle>
              <CardDescription>
                Minimal scaffolding for enterprise-grade embodied agents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className={conceptCodeBlock("text-xs md:text-sm lg:text-base p-4")}
              >{`// Pseudo-architecture for a Gemini Robotics deployment
const roboticsAgent = createEmbodiedAgent({
  perception: {
    sensors: ['rgb_cam', 'depth_cam', 'force_torque'],
    fusionGateway: 'vertex-vision-multimodal',
  },
  cognition: {
    planner: 'gemini-1.5-pro',
    memory: {
      episodic: 'vertex-vector-store',
      spatial: 'warehouse-digital-twin'
    },
    policyHead: 'trajectory-diffusion-controller'
  },
  skills: loadSkillGraph([
    'pick_place_dynamic',
    'drawer_open_close',
    'nav_dynamic_obstacle',
    'inventory_scan'
  ]),
  safety: {
    policy: 'gemini-guard-robotics',
    runtimeChecks: ['proximity_envelope', 'torque_limits', 'human_in_zone'],
    haltActions: ['gripper_release', 'zero_velocity']
  },
  ops: {
    telemetry: publishTo('pubsub://robotics/fleet'),
    observability: useMetrics(['task_success', 'cycle_time', 'interventions']),
    operatorUI: GeminiLiveSession()
  }
})

await roboticsAgent.executeGoal("Replenish aisle 7 endcap and verify pricing labels")`}</pre>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "patterns",
      title: "High-Value Patterns",
      description: "Turn capabilities into repeatable robotics playbooks",
      icon: <Lightning className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Play Cards</CardTitle>
              <CardDescription>
                Jump-start your robotics agent backlog with proven templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{
                title: "Mobile Manipulator Steward",
                summary: "Semi-autonomous service robot handles deliveries, environmental checks, and guest interaction in hotels.",
                signals: [
                  "Gemini Live for concierge fallbacks",
                  "Skill graph: nav → elevator → delivery",
                  "Guardrails: human proximity + voice tone"
                ]
              }, {
                title: "Adaptive Lab Technician",
                summary: "Performs sample prep across instruments with digital SOP enforcement and auto-logging.",
                signals: [
                  "Vision QA for reagent recognition",
                  "Workflow integration with LIMS",
                  "Risk gating for bio-safety levels"
                ]
              }, {
                title: "Inventory Guardian",
                summary: "Nightly warehouse cycle counts with anomaly alerts and predictive restock triggers.",
                signals: [
                  "Structured anomaly messaging to Ops",
                  "Planogram diffs stored in vector memory",
                  "Fallback autopark routine"
                ]
              }, {
                title: "Emergency Response Mate",
                summary: "Supports human teams with tool fetching, scene documentation, and victim triage triage packs.",
                signals: [
                  "Live teleoperation handshake",
                  "Thermal + visual sensor fusion",
                  "Power budget awareness"
                ]
              }].map((pattern) => (
                <div key={pattern.title} className={conceptSurfaceSoft("p-4 space-y-3 border border-secondary/30")}
                >
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    {pattern.title}
                  </h4>
                  <p className="text-muted-foreground text-base">{pattern.summary}</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {pattern.signals.map((signal) => (
                      <li key={signal}>• {signal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Snapshot</CardTitle>
              <CardDescription>
                Recommended metrics when piloting robotics-native agents.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className={conceptSurfaceSoft("p-4 space-y-3")}
              >
                <h4 className="font-semibold">Reliability</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Task Success Rate (first-pass vs assisted)</li>
                  <li>• Mean Intervention Time</li>
                  <li>• Safety Stop Frequency</li>
                </ul>
              </div>
              <div className={conceptSurfaceSoft("p-4 space-y-3")}
              >
                <h4 className="font-semibold">Productivity</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Cycle Time Delta vs Manual</li>
                  <li>• Coverage (% tasks automated)</li>
                  <li>• Fleet Utilization</li>
                </ul>
              </div>
              <div className={conceptSurfaceSoft("p-4 space-y-3")}
              >
                <h4 className="font-semibold">Experience & Trust</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Operator Confidence Score</li>
                  <li>• Teleop-to-Autonomy Ratio</li>
                  <li>• Incident Report Closure Time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agentic-robotics-integration"
      title="Agentic Robotics Integration"
      description="Design embodied AI agents that fuse Gemini Robotics perception, planning, and safety into production-ready workflows."
      tabs={tabs}
      nextConcept={{
        id: "agent-ops",
        title: "Agent Ops & Reliability",
        description: "Keep embodied agents observable, resilient, and audit-ready."
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
