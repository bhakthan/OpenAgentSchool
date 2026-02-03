import React, { useState, useEffect } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Robot,
  Lightning,
  Cpu,
  Factory,
  Gauge,
  Network,
  ShieldCheck,
  Timer,
  ArrowRight,
  Play,
  Pause,
  ArrowCounterClockwise,
  Eye,
  GearSix,
  Wrench,
  Heartbeat,
  CloudArrowUp,
  CloudArrowDown,
  ArrowsClockwise,
  TreeStructure,
  PlugsConnected,
  Package,
  Warning,
  Books,
  ChartBar
} from "@phosphor-icons/react"
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock, conceptPill } from "./conceptStyles"
import ReferenceSection from "@/components/references/ReferenceSection"
import CodeBlock from "@/components/ui/CodeBlock"
import { motion, AnimatePresence } from "framer-motion"

interface EdgeAgentConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const capabilityPill = (label: string) => (
  <span className={conceptPill("text-xs font-semibold uppercase tracking-wide")}>{label}</span>
)

// Industrial sectors with use cases
const industrialSectors = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: <Factory className="w-5 h-5" />,
    color: 'bg-blue-500/10 border-blue-500/30',
    protocols: ['OPC-UA', 'Modbus TCP', 'EtherNet/IP', 'PROFINET'],
    latencyReq: '< 10ms',
    useCases: ['Predictive maintenance', 'Quality inspection', 'Assembly guidance', 'Robot coordination'],
    edgeDevices: ['NVIDIA Jetson AGX', 'Siemens IPC', 'Intel NUC']
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    icon: <Lightning className="w-5 h-5" />,
    color: 'bg-yellow-500/10 border-yellow-500/30',
    protocols: ['DNP3', 'IEC 61850', 'Modbus RTU', 'MQTT'],
    latencyReq: '< 100ms',
    useCases: ['Grid optimization', 'Fault detection', 'Load forecasting', 'Asset monitoring'],
    edgeDevices: ['SEL RTAC', 'GE Grid Solutions', 'ABB RTU']
  },
  {
    id: 'logistics',
    name: 'Logistics & Warehouse',
    icon: <Package className="w-5 h-5" />,
    color: 'bg-green-500/10 border-green-500/30',
    protocols: ['OPC-UA', 'MQTT', 'REST/gRPC', 'WebSockets'],
    latencyReq: '< 50ms',
    useCases: ['Autonomous robots (AMRs)', 'Pick optimization', 'Inventory tracking', 'Route planning'],
    edgeDevices: ['NVIDIA Isaac', 'AWS Outposts', 'Azure Stack Edge']
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: <Heartbeat className="w-5 h-5" />,
    color: 'bg-red-500/10 border-red-500/30',
    protocols: ['HL7 FHIR', 'DICOM', 'MQTT', 'OPC-UA'],
    latencyReq: '< 20ms',
    useCases: ['Surgical robotics', 'Patient monitoring', 'Drug compounding', 'Lab automation'],
    edgeDevices: ['Medical-grade PCs', 'NVIDIA Clara', 'Intel Medical']
  },
  {
    id: 'agriculture',
    name: 'Smart Agriculture',
    icon: <TreeStructure className="w-5 h-5" />,
    color: 'bg-emerald-500/10 border-emerald-500/30',
    protocols: ['LoRaWAN', 'MQTT', 'Modbus', 'CAN Bus'],
    latencyReq: '< 1s',
    useCases: ['Autonomous tractors', 'Crop monitoring', 'Irrigation control', 'Harvest optimization'],
    edgeDevices: ['John Deere Edge', 'AgriTech Gateways', 'Field Edge Boxes']
  }
]

// Latency tiers for the chart
const latencyTiers = [
  { tier: 'Ultra-Low', range: '< 1ms', color: 'bg-red-500', useCases: 'Motion control, safety systems, closed-loop servo', typical: 'Local FPGA/ASIC' },
  { tier: 'Real-Time', range: '1-10ms', color: 'bg-orange-500', useCases: 'Robot coordination, vision inspection, PLC integration', typical: 'Edge GPU (Jetson, TensorRT)' },
  { tier: 'Near Real-Time', range: '10-100ms', color: 'bg-yellow-500', useCases: 'Predictive maintenance, anomaly detection, process optimization', typical: 'Edge Server (Azure Stack, Outposts)' },
  { tier: 'Batch/Async', range: '100ms-1s', color: 'bg-green-500', useCases: 'Analytics aggregation, model retraining triggers, reporting', typical: 'Hybrid edge-cloud' },
  { tier: 'Cloud-Tolerable', range: '> 1s', color: 'bg-blue-500', useCases: 'Historical analysis, fleet-wide learning, dashboard updates', typical: 'Cloud with edge cache' }
]

// Edge deployment patterns
const deploymentPatterns = [
  {
    name: 'Edge-Only (Offline-First)',
    description: 'Complete inference on device, no cloud dependency',
    pros: ['Zero latency to cloud', 'Works air-gapped', 'Data sovereignty'],
    cons: ['Limited model updates', 'No fleet learning', 'Hardware constraints'],
    bestFor: 'Safety-critical, classified environments'
  },
  {
    name: 'Edge-Primary + Cloud Sync',
    description: 'Inference on edge, periodic sync to cloud for updates',
    pros: ['Best of both worlds', 'Continuous learning', 'Graceful degradation'],
    cons: ['Sync complexity', 'Version drift risk', 'Bandwidth costs'],
    bestFor: 'Manufacturing, logistics, agriculture'
  },
  {
    name: 'Hierarchical Edge (Fog)',
    description: 'Device → Gateway → Regional Edge → Cloud cascade',
    pros: ['Scalable aggregation', 'Local autonomy', 'Reduced cloud load'],
    cons: ['Network complexity', 'Multiple failure points', 'Configuration overhead'],
    bestFor: 'Large-scale IoT, smart cities, utilities'
  },
  {
    name: 'Cloud-Primary + Edge Cache',
    description: 'Cloud inference with edge caching for common queries',
    pros: ['Simplest ops', 'Always latest model', 'Centralized control'],
    cons: ['Latency dependent on connectivity', 'Cloud costs', 'Privacy concerns'],
    bestFor: 'Non-critical analytics, connected environments'
  }
]

export default function EdgeAgentConcept({ onMarkComplete, onNavigateToNext }: EdgeAgentConceptProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSector, setSelectedSector] = useState(industrialSectors[0])

  const animationSteps = [
    { id: 'sense', label: 'Sensor Input', duration: 2500 },
    { id: 'infer', label: 'Edge Inference', duration: 3000 },
    { id: 'act', label: 'Actuation', duration: 2500 },
    { id: 'sync', label: 'Cloud Sync', duration: 3000 }
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
      id: "fundamentals",
      title: "Edge Fundamentals",
      description: "Why edge AI matters and when cloud isn't enough",
      icon: <Cpu className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Edge vs Cloud Decision Framework */}
          <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-500" />
                Edge vs Cloud: The 2026 Decision Matrix
              </CardTitle>
              <CardDescription>
                When to compute locally vs. when to leverage cloud scale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Lightning className="w-4 h-4" /> Choose Edge When
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Timer className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Latency budget under 100ms (safety, real-time control)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Data can't leave premises (privacy, compliance, sovereignty)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Network className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Connectivity is intermittent or expensive (remote, mobile)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Factory className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>High volume of inference calls (cost prohibitive at cloud scale)</span>
                    </li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <CloudArrowUp className="w-4 h-4" /> Choose Cloud When
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Brain className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Model size exceeds edge capacity (LLMs, foundation models)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowsClockwise className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Frequent model updates required (daily/hourly retraining)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Cpu className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Compute-intensive batch processing (video analytics, simulation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GearSix className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span>Centralized orchestration across fleet (multi-site coordination)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latency Requirement Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Latency Tiers & Deployment Guidance
              </CardTitle>
              <CardDescription>
                Match your use case to the right compute tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {latencyTiers.map((tier, idx) => (
                  <div key={tier.tier} className={conceptSurface("p-4")}>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{tier.tier}</span>
                          <Badge variant="outline">{tier.range}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Use Cases:</span>
                        <span className="ml-2">{tier.useCases}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Typical Stack:</span>
                        <span className="ml-2">{tier.typical}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Edge Architecture Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeStructure className="w-5 h-5" />
                Edge-to-Cloud Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-6 bg-muted/30 rounded-lg">
                {/* Architecture layers */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Device Layer */}
                  <div className="text-center">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-2">
                      <Robot className="w-8 h-8 mx-auto text-red-600 dark:text-red-400 mb-2" />
                      <h4 className="font-semibold text-sm">Device Layer</h4>
                      <p className="text-xs text-muted-foreground mt-1">Sensors, Actuators, PLCs</p>
                    </div>
                    <Badge variant="outline" className="text-xs">&lt; 1ms loops</Badge>
                  </div>

                  {/* Edge Layer */}
                  <div className="text-center">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-2">
                      <Cpu className="w-8 h-8 mx-auto text-orange-600 dark:text-orange-400 mb-2" />
                      <h4 className="font-semibold text-sm">Edge Layer</h4>
                      <p className="text-xs text-muted-foreground mt-1">GPU/TPU, Local Models</p>
                    </div>
                    <Badge variant="outline" className="text-xs">1-100ms inference</Badge>
                  </div>

                  {/* Fog/Gateway Layer */}
                  <div className="text-center">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-2">
                      <Network className="w-8 h-8 mx-auto text-yellow-600 dark:text-yellow-400 mb-2" />
                      <h4 className="font-semibold text-sm">Fog/Gateway</h4>
                      <p className="text-xs text-muted-foreground mt-1">Aggregation, Routing</p>
                    </div>
                    <Badge variant="outline" className="text-xs">100ms-1s batch</Badge>
                  </div>

                  {/* Cloud Layer */}
                  <div className="text-center">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-2">
                      <CloudArrowUp className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                      <h4 className="font-semibold text-sm">Cloud Layer</h4>
                      <p className="text-xs text-muted-foreground mt-1">Training, Fleet Mgmt</p>
                    </div>
                    <Badge variant="outline" className="text-xs">&gt; 1s analytics</Badge>
                  </div>
                </div>

                {/* Arrows between layers */}
                <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-around px-20 pointer-events-none">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "physical-ai",
      title: "Physical AI Models",
      description: "Microsoft Rho-Alpha, Gemini ER 1.5, and Vision-Language-Action architectures",
      icon: <Robot className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Animation Controls */}
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-green-500" />
                Edge Agent Inference Loop
              </CardTitle>
              <CardDescription>
                Sense → Infer → Act → Sync cycle for embodied agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Button onClick={handlePlayPause} variant="default" size="sm" className="gap-2">
                  {isPlaying ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Play</>}
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
                  <ArrowCounterClockwise className="w-4 h-4" />Reset
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
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : currentStep > idx
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-muted bg-muted/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-muted-foreground">Step {idx + 1}</div>
                    <div className="text-sm font-medium mt-1">{step.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Microsoft Rho-Alpha */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Microsoft Rho-Alpha (VLA+)
              </CardTitle>
              <CardDescription>
                Vision-Language-Action+ with tactile sensing and force feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold">Key Capabilities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span>Multimodal perception (vision + tactile + force)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Robot className="w-4 h-4 text-purple-500" />
                      <span>Bimanual manipulation (dual-arm coordination)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <GearSix className="w-4 h-4 text-orange-500" />
                      <span>NVIDIA Isaac Sim integration for RL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowsClockwise className="w-4 h-4 text-green-500" />
                      <span>Human-in-the-loop correction via 3D mouse</span>
                    </li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold">Enterprise Applications</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Robotics manufacturers building next-gen arms</li>
                    <li>• System integrators deploying humanoid platforms</li>
                    <li>• End-users in manufacturing assembly lines</li>
                    <li>• Research labs pushing manipulation boundaries</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                <strong>Note:</strong> Microsoft Rho-Alpha VLA+ is in research preview. SDK access and model weights are not yet publicly available. 
                Check <a href="https://microsoft.com/research" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Microsoft Research</a> for updates on availability.
              </p>
            </CardContent>
          </Card>

          {/* Google Gemini ER 1.5 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-500" />
                Google Gemini ER 1.5 (Embodied Reasoning)
              </CardTitle>
              <CardDescription>
                Agentic robotics VLM with spatial reasoning and task orchestration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4 text-center")}>
                  <Eye className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                  <h4 className="font-semibold">Spatial Reasoning</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Object localization, 3D scene understanding, trajectory planning
                  </p>
                </div>
                <div className={conceptSurface("p-4 text-center")}>
                  <PlugsConnected className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <h4 className="font-semibold">Function Calling</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Task orchestration via structured API calls to robot primitives
                  </p>
                </div>
                <div className={conceptSurface("p-4 text-center")}>
                  <Gauge className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                  <h4 className="font-semibold">Thinking Budget</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Latency vs accuracy tradeoffs for real-time control
                  </p>
                </div>
              </div>
              <CodeBlock language="python">
{`# Gemini ER 1.5 edge deployment pattern
from google.ai import GeminiER
from robot_api import ArmController

# Load quantized model for edge
model = GeminiER.from_edge_pack("gemini-er-1.5-edge-int8")

def pick_and_place_task(target_object: str, destination: str):
    """Orchestrate multi-step task with thinking budget"""
    # Low thinking budget for quick decisions
    plan = model.plan(
        prompt=f"Pick up {target_object} and place at {destination}",
        image=camera.capture(),
        thinking_budget="low"  # < 50ms response
    )
    
    for step in plan.steps:
        # Execute each primitive with safety checks
        if step.requires_confirmation:
            await human_confirm(step)
        
        result = arm.execute(step.action)
        
        # High thinking budget for error recovery
        if not result.success:
            recovery = model.recover(
                error=result.error,
                thinking_budget="high"  # Allow 500ms for reasoning
            )
            arm.execute(recovery.action)`}
              </CodeBlock>
            </CardContent>
          </Card>

          {/* Model Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="w-5 h-5" />
                Physical AI Model Comparison (2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Model</th>
                      <th className="text-left p-2">Modalities</th>
                      <th className="text-left p-2">Edge Latency</th>
                      <th className="text-left p-2">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Rho-Alpha (VLA+)</td>
                      <td className="p-2">Vision + Tactile + Force</td>
                      <td className="p-2"><Badge variant="outline">5-10ms</Badge></td>
                      <td className="p-2">Precision manipulation, assembly</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Gemini ER 1.5</td>
                      <td className="p-2">Vision + Language + Actions</td>
                      <td className="p-2"><Badge variant="outline">20-100ms</Badge></td>
                      <td className="p-2">Complex reasoning, multi-step tasks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">RT-X (Open)</td>
                      <td className="p-2">Vision + Language</td>
                      <td className="p-2"><Badge variant="outline">50-200ms</Badge></td>
                      <td className="p-2">Research, cross-embodiment</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Qwen2.5 (0.5B-7B)</td>
                      <td className="p-2">Language + Vision (Qwen-VL)</td>
                      <td className="p-2"><Badge variant="outline">10-50ms</Badge></td>
                      <td className="p-2">Raspberry Pi, Jetson Nano, local LLM</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Gemma 2 (2B-9B)</td>
                      <td className="p-2">Language + Code</td>
                      <td className="p-2"><Badge variant="outline">15-80ms</Badge></td>
                      <td className="p-2">Edge devices, mobile, on-device agents</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Phi-3 Mini (3.8B)</td>
                      <td className="p-2">Language + Vision</td>
                      <td className="p-2"><Badge variant="outline">20-60ms</Badge></td>
                      <td className="p-2">Mobile, IoT, resource-constrained</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Custom VLA</td>
                      <td className="p-2">Domain-specific</td>
                      <td className="p-2"><Badge variant="outline">1-5ms</Badge></td>
                      <td className="p-2">Single-task optimization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Lightweight Edge Models */}
          <Card className="bg-gradient-to-r from-green-500/10 via-teal-500/10 to-cyan-500/10 border-2 border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-green-500" />
                Lightweight Models for Resource-Constrained Edge
              </CardTitle>
              <CardDescription>
                Run capable AI agents on Raspberry Pi, mobile devices, and low-power IoT hardware
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    Qwen2.5 (Alibaba)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    0.5B to 72B parameter family with excellent multilingual support
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 0.5B runs on Raspberry Pi 5 (4GB RAM)</li>
                    <li>• 3B ideal for Jetson Nano, Intel NUC</li>
                    <li>• Qwen-VL adds vision capabilities</li>
                    <li>• Apache 2.0 license for commercial use</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-500" />
                    Gemma 2 (Google)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    2B and 9B instruction-tuned models optimized for edge
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 2B fits in 4GB VRAM with quantization</li>
                    <li>• Strong coding and reasoning abilities</li>
                    <li>• Optimized for mobile via MediaPipe</li>
                    <li>• Gemma license permits most commercial uses</li>
                  </ul>
                  <a 
                    href="https://github.com/google-deepmind/gemma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    → GitHub: google-deepmind/gemma
                  </a>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Brain className="w-4 h-4 text-cyan-500" />
                    Phi-3 Mini (Microsoft)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    3.8B model with vision capabilities (Phi-3-vision)
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Runs on CPU-only edge devices</li>
                    <li>• 128K context window option</li>
                    <li>• ONNX and TensorRT optimized</li>
                    <li>• MIT license for open use</li>
                  </ul>
                </div>
              </div>
              <CodeBlock language="python">
{`# Running Qwen on Raspberry Pi 5 with llama.cpp
from llama_cpp import Llama

# Load quantized model (Q4_K_M for best quality/speed balance)
llm = Llama(
    model_path="qwen2.5-0.5b-instruct-q4_k_m.gguf",
    n_ctx=2048,
    n_threads=4,  # Pi 5 has 4 cores
    n_gpu_layers=0  # CPU-only on Pi
)

# Simple edge agent loop
def edge_agent(sensor_reading: str) -> str:
    response = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": "You are a home automation agent. Respond with JSON actions."},
            {"role": "user", "content": f"Sensor reading: {sensor_reading}. What action should I take?"}
        ],
        max_tokens=100,
        temperature=0.1
    )
    return response["choices"][0]["message"]["content"]

# Example: ~200ms inference on Pi 5 for short responses`}
              </CodeBlock>
            </CardContent>
          </Card>

          {/* Vision-Perception-Action Demo Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-500" />
                Vision-Perception-Action Pipeline Demo
              </CardTitle>
              <CardDescription>
                Complete see → perceive → reason → act loop on Raspberry Pi or Jetson
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pipeline Flow Diagram */}
              <div className={conceptSurface("p-4")}>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-center">
                    <div className="font-semibold">📷 Camera</div>
                    <div className="text-xs text-muted-foreground">USB/CSI input</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 text-center">
                    <div className="font-semibold">🎯 SAM</div>
                    <div className="text-xs text-muted-foreground">Segment masks</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-center">
                    <div className="font-semibold">🧠 Gemma</div>
                    <div className="text-xs text-muted-foreground">Reason + plan</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2 text-center">
                    <div className="font-semibold">🤖 PyBullet</div>
                    <div className="text-xs text-muted-foreground">Execute action</div>
                  </div>
                </div>
              </div>

              {/* Component Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold text-sm">Vision Stack</h4>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Camera:</strong> OpenCV capture from webcam/Pi Camera</li>
                    <li>• <strong>SAM:</strong> Segment Anything extracts object masks → polygons/centroids</li>
                    <li>• <strong>Scene encoding:</strong> JSON description of objects, positions, sizes</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold text-sm">Reasoning & Execution</h4>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>LLM:</strong> Ollama running gemma3-1b locally via CLI</li>
                    <li>• <strong>Planning:</strong> LLM outputs move/pick/place actions as JSON</li>
                    <li>• <strong>Simulator:</strong> PyBullet executes on KUKA arm model</li>
                  </ul>
                </div>
              </div>

              <CodeBlock language="python">
{`# Edge Vision-Perception-Action Loop
# Camera → SAM → Gemma (via Ollama) → PyBullet
import cv2
import subprocess
import json
import pybullet as p
from segment_anything import SamPredictor, sam_model_registry

# 1. SENSE: Capture camera frame
cap = cv2.VideoCapture(0)
ret, frame = cap.read()

# 2. PERCEIVE: Segment objects with SAM (use mobile_sam for edge)
sam = sam_model_registry["vit_b"](checkpoint="sam_vit_b.pth")
predictor = SamPredictor(sam)
predictor.set_image(frame)

# Auto-generate masks for all objects in scene
masks = predictor.generate()  # Returns list of mask dicts
objects = []
for mask in masks:
    centroid = mask["point_coords"][0]  # (x, y)
    bbox = mask["bbox"]  # [x, y, w, h]
    objects.append({
        "id": len(objects),
        "centroid": centroid.tolist(),
        "bbox": bbox,
        "area": mask["area"]
    })

scene_description = json.dumps({
    "objects": objects,
    "frame_size": frame.shape[:2]
})

# 3. REASON: Query Gemma via Ollama CLI
prompt = f'''Scene: {scene_description}
Task: Pick the largest object and place it in the bin at (0.5, 0.3, 0.1).
Output JSON: {{"action": "pick|place|move", "target_id": int, "position": [x,y,z]}}'''

result = subprocess.run(
    ["ollama", "run", "gemma3:1b", prompt],
    capture_output=True, text=True
)
action_plan = json.loads(result.stdout.strip())

# 4. ACT: Execute in PyBullet simulation
p.connect(p.GUI)
p.loadURDF("kuka_iiwa/model.urdf")

if action_plan["action"] == "pick":
    target_pos = action_plan["position"]
    # Move arm to target, close gripper
    # (simplified - real impl uses IK + trajectory)
    print(f"Picking object {action_plan['target_id']} at {target_pos}")
elif action_plan["action"] == "place":
    # Move to bin, open gripper
    print(f"Placing at {action_plan['position']}")

# 5. VISUALIZE: Composite window with OpenCV overlays
vis_frame = frame.copy()
for obj in objects:
    cv2.circle(vis_frame, tuple(map(int, obj["centroid"])), 5, (0, 255, 0), -1)
cv2.imshow("Edge Agent Vision", vis_frame)`}
              </CodeBlock>

              <div className={conceptSurface("p-3 mt-2")}>
                <p className="text-xs text-muted-foreground">
                  <strong>Hardware requirements:</strong> Raspberry Pi 5 (8GB) or Jetson Nano for inference. 
                  Use <code className="bg-muted px-1 rounded">mobile_sam</code> (~40MB) instead of full SAM for faster segmentation.
                  Gemma 3 1B runs at ~10 tok/s on Pi 5 via llama.cpp or Ollama.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "hardware",
      title: "Hardware & Deployment",
      description: "Edge devices, accelerators, and containerized deployment",
      icon: <Cpu className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Deployment Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Edge Deployment Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deploymentPatterns.map((pattern) => (
                  <div key={pattern.name} className={conceptSurface("p-4 space-y-3")}>
                    <h4 className="font-semibold">{pattern.name}</h4>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-medium">Pros:</span>
                        <ul className="mt-1 space-y-1">
                          {pattern.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-red-600 dark:text-red-400 font-medium">Cons:</span>
                        <ul className="mt-1 space-y-1">
                          {pattern.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{pattern.bestFor}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hardware Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Edge Hardware Landscape (2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Device</th>
                      <th className="text-left p-2">Compute</th>
                      <th className="text-left p-2">Power</th>
                      <th className="text-left p-2">Form Factor</th>
                      <th className="text-left p-2">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">NVIDIA Jetson AGX Orin</td>
                      <td className="p-2">275 TOPS INT8</td>
                      <td className="p-2">15-60W</td>
                      <td className="p-2">Module</td>
                      <td className="p-2">Robotics, AMRs, drones</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Azure Stack Edge Pro</td>
                      <td className="p-2">T4 GPU + CPU</td>
                      <td className="p-2">300W</td>
                      <td className="p-2">1U Server</td>
                      <td className="p-2">Factory floor, retail</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">AWS Outposts</td>
                      <td className="p-2">Full EC2</td>
                      <td className="p-2">Rack</td>
                      <td className="p-2">Rack/Server</td>
                      <td className="p-2">Hybrid cloud, large-scale</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Qualcomm Cloud AI 100</td>
                      <td className="p-2">400 TOPS INT8</td>
                      <td className="p-2">75W</td>
                      <td className="p-2">PCIe Card</td>
                      <td className="p-2">Inference servers</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Intel Xeon + Habana</td>
                      <td className="p-2">Variable</td>
                      <td className="p-2">150-350W</td>
                      <td className="p-2">Server</td>
                      <td className="p-2">Industrial PCs, gateways</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Container Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Containerized Edge Deployment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="yaml">
{`# docker-compose.edge.yml - Edge agent stack
version: '3.8'
services:
  edge-agent:
    image: myregistry/edge-agent:v2.1-arm64
    runtime: nvidia  # For Jetson/GPU
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    environment:
      - MODEL_PATH=/models/vla-quantized.onnx
      - INFERENCE_BACKEND=tensorrt
      - CLOUD_SYNC_INTERVAL=300  # seconds
      - OFFLINE_QUEUE_SIZE=1000
    volumes:
      - ./models:/models:ro
      - edge-data:/data
    networks:
      - industrial-net
    restart: always

  protocol-bridge:
    image: myregistry/opcua-bridge:latest
    environment:
      - OPCUA_SERVER=opc.tcp://plc-main:4840
      - MQTT_BROKER=mqtt://gateway:1883
    networks:
      - industrial-net

  local-inference:
    image: myregistry/triton-inference:edge
    runtime: nvidia
    ports:
      - "8001:8001"  # gRPC
    volumes:
      - ./model-repo:/models

volumes:
  edge-data:

networks:
  industrial-net:
    driver: bridge`}
              </CodeBlock>
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">Key Edge Deployment Considerations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Warning className="w-4 h-4 mt-0.5 text-yellow-500" />
                    <span><strong>Model quantization:</strong> INT8/FP16 for TensorRT, 4x-8x smaller, 2x-4x faster</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 mt-0.5 text-green-500" />
                    <span><strong>Watchdog timers:</strong> Auto-restart on hang, heartbeat to cloud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CloudArrowDown className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span><strong>OTA updates:</strong> A/B partitions, rollback on failure, staged rollout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Network className="w-4 h-4 mt-0.5 text-purple-500" />
                    <span><strong>Offline queue:</strong> Store-and-forward when connectivity lost</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "industrial",
      title: "Industrial Integration",
      description: "IT/OT convergence, protocols, and sector-specific patterns",
      icon: <Factory className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Sector Selection */}
          <Card className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-orange-500" />
                Industry Sector Deep Dive
              </CardTitle>
              <CardDescription>
                Select a sector to see specific protocols, latency requirements, and use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {industrialSectors.map((sector) => (
                  <Button
                    key={sector.id}
                    variant={selectedSector.id === sector.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSector(sector)}
                    className="gap-2"
                  >
                    {sector.icon}
                    {sector.name}
                  </Button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSector.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg border ${selectedSector.color}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Protocols & Standards</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSector.protocols.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                        ))}
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Latency Requirement: </span>
                        <Badge variant="outline">{selectedSector.latencyReq}</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Edge Use Cases</h4>
                      <ul className="space-y-1 text-sm">
                        {selectedSector.useCases.map((uc, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" />{uc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Typical Edge Devices</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSector.edgeDevices.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* IT/OT Convergence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlugsConnected className="w-5 h-5" />
                IT/OT Convergence for Agentic AI
              </CardTitle>
              <CardDescription>
                Bridging information technology and operational technology with AI agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">IT World</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• REST/gRPC APIs, JSON payloads</li>
                    <li>• Kubernetes, containers, microservices</li>
                    <li>• CI/CD, GitOps, blue-green deploys</li>
                    <li>• Cloud-native, elastic scaling</li>
                    <li>• Seconds-to-minutes latency tolerance</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">OT World</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• OPC-UA, Modbus, PROFINET, EtherNet/IP</li>
                    <li>• PLCs, SCADA, HMI, DCS systems</li>
                    <li>• Firmware updates, scheduled maintenance</li>
                    <li>• Fixed capacity, deterministic timing</li>
                    <li>• Millisecond latency requirements</li>
                  </ul>
                </div>
              </div>
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">The Bridge: Protocol Adapters</h4>
                <CodeBlock language="python">
{`# OPC-UA to Agent bridge pattern
from asyncua import Client as OPCUAClient
from agent_sdk import EdgeAgent

class OTBridge:
    """Bridge OT protocols to agentic AI"""
    
    def __init__(self, opcua_url: str, agent: EdgeAgent):
        self.opcua = OPCUAClient(opcua_url)
        self.agent = agent
    
    async def subscribe_and_infer(self, node_ids: list[str]):
        """Subscribe to PLC tags, run inference on change"""
        await self.opcua.connect()
        
        for node_id in node_ids:
            node = self.opcua.get_node(node_id)
            handler = DataChangeHandler(self.agent)
            await node.subscribe_data_change(handler)
    
    async def write_action(self, node_id: str, value: float):
        """Write agent decision back to PLC (with safety checks)"""
        if not self.agent.safety_check(value):
            raise SafetyViolation(f"Value {value} exceeds limits")
        
        node = self.opcua.get_node(node_id)
        await node.write_value(value)
        
class DataChangeHandler:
    def __init__(self, agent: EdgeAgent):
        self.agent = agent
    
    async def datachange_notification(self, node, val, data):
        # Run inference on new sensor data
        action = await self.agent.infer({"sensor": val})
        if action.should_act:
            await self.agent.execute(action)`}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Industrial Protocol Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Protocol</th>
                      <th className="text-left p-2">Layer</th>
                      <th className="text-left p-2">Data Model</th>
                      <th className="text-left p-2">Agent Integration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">OPC-UA</td>
                      <td className="p-2">Application</td>
                      <td className="p-2">Information model, nodes, subscriptions</td>
                      <td className="p-2">Best: rich semantics, pub/sub</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Modbus TCP/RTU</td>
                      <td className="p-2">Application</td>
                      <td className="p-2">Registers, coils (simple)</td>
                      <td className="p-2">Polling, legacy bridge</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">MQTT</td>
                      <td className="p-2">Application</td>
                      <td className="p-2">Pub/sub topics, JSON/binary</td>
                      <td className="p-2">Event-driven, cloud gateway</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">EtherNet/IP</td>
                      <td className="p-2">Network</td>
                      <td className="p-2">CIP objects, implicit/explicit</td>
                      <td className="p-2">Real-time I/O, Rockwell</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">PROFINET</td>
                      <td className="p-2">Network</td>
                      <td className="p-2">RT/IRT classes, GSD files</td>
                      <td className="p-2">Deterministic, Siemens</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "hybrid",
      title: "Hybrid Architectures",
      description: "Edge-cloud orchestration, model sync, and graceful degradation",
      icon: <ArrowsClockwise className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Hybrid Architecture Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudArrowUp className="w-5 h-5" />
                Hybrid Edge-Cloud Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-6 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Edge Zone */}
                  <div className="border-2 border-orange-500/30 rounded-lg p-4 bg-orange-500/5">
                    <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                      <Factory className="w-4 h-4" /> Edge Zone
                    </h4>
                    <div className="space-y-3">
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <Cpu className="w-6 h-6 mx-auto mb-1" />
                        Local Inference<br />
                        <span className="text-muted-foreground">&lt; 10ms</span>
                      </div>
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <Package className="w-6 h-6 mx-auto mb-1" />
                        Offline Queue<br />
                        <span className="text-muted-foreground">Store & Forward</span>
                      </div>
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <ShieldCheck className="w-6 h-6 mx-auto mb-1" />
                        Safety Guardrails<br />
                        <span className="text-muted-foreground">Local Enforcement</span>
                      </div>
                    </div>
                  </div>

                  {/* Sync Layer */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-purple-500/5 w-full">
                      <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                        <ArrowsClockwise className="w-4 h-4" /> Sync Layer
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <CloudArrowUp className="w-4 h-4 text-blue-500" />
                          <span>Telemetry upload (batch)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CloudArrowDown className="w-4 h-4 text-green-500" />
                          <span>Model updates (OTA)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GearSix className="w-4 h-4 text-orange-500" />
                          <span>Config sync (GitOps)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Warning className="w-4 h-4 text-yellow-500" />
                          <span>Alert escalation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Zone */}
                  <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-blue-500/5">
                    <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                      <CloudArrowUp className="w-4 h-4" /> Cloud Zone
                    </h4>
                    <div className="space-y-3">
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <Brain className="w-6 h-6 mx-auto mb-1" />
                        Model Training<br />
                        <span className="text-muted-foreground">Fleet Learning</span>
                      </div>
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <ChartBar className="w-6 h-6 mx-auto mb-1" />
                        Analytics<br />
                        <span className="text-muted-foreground">Historical Trends</span>
                      </div>
                      <div className={conceptSurface("p-3 text-center text-xs")}>
                        <Eye className="w-6 h-6 mx-auto mb-1" />
                        Observability<br />
                        <span className="text-muted-foreground">Fleet Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Sync Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                Model Synchronization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">Push (Cloud-Initiated)</h4>
                  <p className="text-sm text-muted-foreground">
                    Cloud pushes new models to edge on schedule or trigger
                  </p>
                  <Badge variant="outline" className="text-xs">Best for: Infrequent updates</Badge>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">Pull (Edge-Initiated)</h4>
                  <p className="text-sm text-muted-foreground">
                    Edge polls for updates, downloads when available
                  </p>
                  <Badge variant="outline" className="text-xs">Best for: Intermittent connectivity</Badge>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">Federated (Distributed)</h4>
                  <p className="text-sm text-muted-foreground">
                    Train locally, share gradients, aggregate in cloud
                  </p>
                  <Badge variant="outline" className="text-xs">Best for: Privacy-sensitive</Badge>
                </div>
              </div>
              <CodeBlock language="python">
{`# Graceful degradation pattern
from edge_agent import EdgeAgent, FallbackMode

class ResilientEdgeAgent(EdgeAgent):
    """Agent that degrades gracefully when cloud is unavailable"""
    
    def __init__(self):
        self.cloud_available = True
        self.offline_queue = []
        self.fallback_model = self.load_cached_model()
    
    async def infer(self, input_data: dict) -> Action:
        try:
            if self.cloud_available and self.needs_cloud_reasoning(input_data):
                # Complex reasoning via cloud
                return await self.cloud_infer(input_data, timeout=0.5)
        except (ConnectionError, TimeoutError):
            self.cloud_available = False
            self.schedule_reconnect()
        
        # Fallback to local model
        return self.local_infer(input_data)
    
    def local_infer(self, input_data: dict) -> Action:
        """Always-available local inference"""
        action = self.fallback_model.predict(input_data)
        
        # Queue for cloud sync when reconnected
        self.offline_queue.append({
            "input": input_data,
            "action": action,
            "timestamp": time.time()
        })
        
        return action
    
    async def sync_when_online(self):
        """Sync queued data when cloud reconnects"""
        if self.cloud_available and self.offline_queue:
            await self.cloud.upload_batch(self.offline_queue)
            self.offline_queue.clear()`}
              </CodeBlock>
            </CardContent>
          </Card>

          {/* Latency Budget Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Latency Budget Calculator
              </CardTitle>
              <CardDescription>
                Break down end-to-end latency for hybrid architectures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={conceptSurface("p-4")}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sensor → Edge (wired)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-24 h-2" />
                      <Badge variant="outline" className="text-xs w-16 text-right">~1ms</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edge preprocessing</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-24 h-2" />
                      <Badge variant="outline" className="text-xs w-16 text-right">~2ms</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Edge inference (GPU)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={50} className="w-24 h-2" />
                      <Badge variant="outline" className="text-xs w-16 text-right">~10ms</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edge → Actuator</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-24 h-2" />
                      <Badge variant="outline" className="text-xs w-16 text-right">~1ms</Badge>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2 flex items-center justify-between font-semibold">
                    <span className="text-sm">Total Edge Loop</span>
                    <Badge className="bg-green-500">~14ms</Badge>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-sm">+ Cloud round-trip (optional)</span>
                      <Badge variant="secondary" className="text-xs w-20 text-right">50-200ms</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "production",
      title: "Production Patterns",
      description: "Monitoring, updates, safety, and fleet management",
      icon: <ShieldCheck className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Safety & Guardrails */}
          <Card className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                Safety-Critical Edge Patterns
              </CardTitle>
              <CardDescription>
                Non-negotiable guardrails for physical AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-red-600 dark:text-red-400">Hardware Safetys</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Warning className="w-4 h-4 mt-0.5" />
                      <span><strong>E-stop circuits:</strong> Hardware override, not software-gated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Timer className="w-4 h-4 mt-0.5" />
                      <span><strong>Watchdog timers:</strong> Automatic safe state on agent hang</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Gauge className="w-4 h-4 mt-0.5" />
                      <span><strong>Force/torque limits:</strong> PLC-enforced, not model-dependent</span>
                    </li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">Software Guardrails</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Brain className="w-4 h-4 mt-0.5" />
                      <span><strong>Confidence thresholds:</strong> Reject uncertain predictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowsClockwise className="w-4 h-4 mt-0.5" />
                      <span><strong>Rate limiting:</strong> Max actions per second enforced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 mt-0.5" />
                      <span><strong>Human approval:</strong> HITL for high-risk actions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Edge Observability Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="python">
{`# Edge agent telemetry pattern
from opentelemetry import trace, metrics
from prometheus_client import Counter, Histogram, Gauge

# Metrics for edge agent
inference_latency = Histogram(
    'edge_inference_latency_ms',
    'Inference latency in milliseconds',
    buckets=[1, 2, 5, 10, 20, 50, 100, 200]
)
inference_count = Counter(
    'edge_inference_total',
    'Total inferences',
    ['model_version', 'status']
)
model_confidence = Gauge(
    'edge_model_confidence',
    'Model confidence score'
)
queue_depth = Gauge(
    'edge_offline_queue_depth',
    'Pending items in offline queue'
)

class InstrumentedEdgeAgent:
    def __init__(self, model):
        self.model = model
        self.tracer = trace.get_tracer(__name__)
    
    async def infer(self, input_data: dict) -> Action:
        with self.tracer.start_as_current_span("edge_inference") as span:
            start = time.perf_counter()
            try:
                result = self.model.predict(input_data)
                latency_ms = (time.perf_counter() - start) * 1000
                
                # Record metrics
                inference_latency.observe(latency_ms)
                inference_count.labels(
                    model_version=self.model.version,
                    status="success"
                ).inc()
                model_confidence.set(result.confidence)
                
                # Add span attributes for tracing
                span.set_attribute("latency_ms", latency_ms)
                span.set_attribute("confidence", result.confidence)
                span.set_attribute("action_type", result.action_type)
                
                return result
            except Exception as e:
                inference_count.labels(
                    model_version=self.model.version,
                    status="error"
                ).inc()
                span.record_exception(e)
                raise`}
              </CodeBlock>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4 text-center")}>
                  <ChartBar className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <h4 className="font-semibold">Key Metrics</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Latency P50/P99, throughput, error rate, queue depth
                  </p>
                </div>
                <div className={conceptSurface("p-4 text-center")}>
                  <Eye className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                  <h4 className="font-semibold">Tracing</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    End-to-end spans across edge and cloud
                  </p>
                </div>
                <div className={conceptSurface("p-4 text-center")}>
                  <Warning className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                  <h4 className="font-semibold">Alerting</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Latency spikes, drift detection, safety violations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fleet Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Fleet Management at Scale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold">OTA Update Strategy</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Canary:</strong> Roll to 1% → 10% → 100%</li>
                    <li>• <strong>A/B partitions:</strong> Instant rollback capability</li>
                    <li>• <strong>Delta updates:</strong> Minimize bandwidth</li>
                    <li>• <strong>Offline-safe:</strong> Resume after connectivity loss</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 space-y-3")}>
                  <h4 className="font-semibold">Device Management</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Inventory:</strong> Track all edge devices, versions</li>
                    <li>• <strong>Heartbeat:</strong> Detect offline/unhealthy nodes</li>
                    <li>• <strong>Remote shell:</strong> Debug access (secured)</li>
                    <li>• <strong>Config push:</strong> GitOps for edge config</li>
                  </ul>
                </div>
              </div>
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">Fleet Dashboard KPIs</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-xs text-muted-foreground">Fleet Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">8.2ms</div>
                    <div className="text-xs text-muted-foreground">P50 Latency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">v2.3.1</div>
                    <div className="text-xs text-muted-foreground">Model Version</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">0</div>
                    <div className="text-xs text-muted-foreground">Safety Alerts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "references",
      title: "References",
      description: "Papers, documentation, and further reading",
      icon: <Books className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <ReferenceSection type="concept" itemId="edge-agent" />
          
          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Key Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">Microsoft Rho-Alpha</h4>
                  <a 
                    href="https://www.microsoft.com/en-us/research/story/advancing-ai-for-the-physical-world/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Advancing AI for the Physical World
                  </a>
                  <p className="text-xs text-muted-foreground">
                    VLA+ models with tactile sensing for bimanual manipulation
                  </p>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">Google Gemini ER 1.5</h4>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/robotics-overview" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Gemini Robotics API Overview
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Embodied reasoning with spatial understanding and function calling
                  </p>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">OPC Foundation</h4>
                  <a 
                    href="https://opcfoundation.org/developer-tools/specifications-unified-architecture" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    OPC-UA Specifications
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Industrial interoperability standard for IT/OT integration
                  </p>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold">NVIDIA Isaac</h4>
                  <a 
                    href="https://developer.nvidia.com/isaac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Isaac Robotics Platform
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Simulation, training, and deployment for edge robotics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      title="Edge Agent"
      description="Move agents from cloud to factory floor—master edge inference, IT/OT bridging, and real-time guarantees for physical AI."
      conceptId="edge-agent"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
