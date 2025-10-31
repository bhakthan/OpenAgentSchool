import { useEffect, useState } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Robot, MapPin, ShieldCheck, FlowArrow, ChartBar, Lightning, Eye, GearSix, ArrowsClockwise, Notebook, ArrowRight, Play, Pause, ArrowCounterClockwise } from "@phosphor-icons/react"
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock, conceptPill } from "./conceptStyles"
import ReferenceSection from "@/components/references/ReferenceSection"
import { motion, AnimatePresence } from "framer-motion"

interface AgenticRoboticsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const capabilityPill = (label: string) => (
  <span className={conceptPill("text-xs font-semibold uppercase tracking-wide")}>{label}</span>
)

export default function AgenticRoboticsConcept({ onMarkComplete, onNavigateToNext }: AgenticRoboticsConceptProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const animationSteps = [
    { id: 'multimodal', label: 'Multimodal Grounding', duration: 3000 },
    { id: 'task-seq', label: 'Task Sequencing', duration: 3000 },
    { id: 'telepresence', label: 'Interactive Telepresence', duration: 3000 },
    { id: 'safety', label: 'Safety Guardrails', duration: 3500 },
  ]

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < animationSteps.length - 1) {
          setCurrentStep(currentStep + 1)
        } else {
          setIsPlaying(false)
          setCurrentStep(0)
        }
      }, animationSteps[currentStep].duration)
      
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  const handlePlayPause = () => setIsPlaying(!isPlaying)
  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const tabs = [
    {
      id: "foundation",
      title: "Foundation & Capabilities",
      description: "Understand what Gemini Robotics unlocks for embodied agents",
      icon: <Brain className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Animation Controls */}
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5 text-yellow-500" />
                Step-by-Step Animation Controls
              </CardTitle>
              <CardDescription>
                Watch the embodied agent capabilities unfold sequentially
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handlePlayPause} 
                  variant="default"
                  size="sm"
                  className="gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Play
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowCounterClockwise className="w-4 h-4" />
                  Reset
                </Button>
                <div className="flex-1" />
                <Badge variant={isPlaying ? "default" : "secondary"}>
                  {isPlaying ? "Playing" : "Paused"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {animationSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      currentStep === idx
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-muted bg-muted/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-muted-foreground">
                      Step {idx + 1}
                    </div>
                    <div className="text-sm font-medium mt-1">{step.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
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
                    <div className={conceptSurface(`p-4 space-y-2 ${currentStep === 0 ? 'ring-2 ring-blue-500' : ''}`)}
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
                    <div className={conceptSurface(`p-4 space-y-2 ${currentStep === 1 ? 'ring-2 ring-purple-500' : ''}`)}
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
                    <div className={conceptSurface(`p-4 space-y-2 ${currentStep === 2 ? 'ring-2 ring-pink-500' : ''}`)}
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
                    <div className={conceptSurface(`p-4 space-y-2 ${currentStep === 3 ? 'ring-2 ring-green-500' : ''}`)}
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
            </motion.div>
          </AnimatePresence>

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
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FlowArrow className="w-5 h-5 text-primary" />
                Control Loop at a Glance
              </CardTitle>
              <CardDescription>
                Observe → Reason → Act → Reflect, with safety overlays baked into every transition.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[{
                  id: "observe",
                  title: "Observe",
                  copy: "Gemini ingests RGB-D, force, and audio frames every 60–120 ms.",
                  icon: <Eye className="w-5 h-5" />, color: "bg-sky-600/10 text-sky-700 dark:text-sky-300"
                }, {
                  id: "reason",
                  title: "Reason",
                  copy: "Intent planner queries memory, selects skill graphs, and checks policy gates.",
                  icon: <Brain className="w-5 h-5" />, color: "bg-violet-600/10 text-violet-700 dark:text-violet-300"
                }, {
                  id: "act",
                  title: "Act",
                  copy: "Trajectory planners stream commands to navigation + manipulator controllers.",
                  icon: <GearSix className="w-5 h-5" />, color: "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                }, {
                  id: "reflect",
                  title: "Reflect",
                  copy: "Telemetry, video snippets, and narrations feed evaluation + humans-in-the-loop.",
                  icon: <Notebook className="w-5 h-5" />, color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                }].map((stage) => (
                  <div key={stage.id} className={conceptSurfaceSoft("p-4 space-y-3 border border-border/60")}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center rounded-full p-2 ${stage.color}`}>
                        {stage.icon}
                      </span>
                      <h4 className="font-semibold text-lg">{stage.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">{stage.copy}</p>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex items-center justify-between px-6 py-3 rounded-lg bg-muted/40 border border-muted/60">
                {['Observe', 'Reason', 'Act', 'Reflect'].map((label, idx, arr) => (
                  <div key={label} className="flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    <span>{label}</span>
                    {idx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-primary/70" />}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{
                  title: "Safety Overlays",
                  items: ["Policy: Gemini Guard robotics", "Runtime: torque + proximity envelopes", "Fallback: watchdog teleop lane"]
                }, {
                  title: "Loop Cadence",
                  items: ["Perception frame: 90 ms", "Planner refresh: 1.5 s or on event", "Halt budget: &lt; 250 ms"]
                }, {
                  title: "Evidence Trail",
                  items: ["Mission narration + timestamps", "Telemetry snapshots to AIOps", "Incident dossier with replay"]
                }].map((bucket) => (
                  <div key={bucket.title} className={conceptSurface("p-4 space-y-2")}
                  >
                    <h4 className="font-semibold flex items-center gap-2 text-base">
                      <ArrowsClockwise className="w-4 h-4 text-primary" />
                      {bucket.title}
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {bucket.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
