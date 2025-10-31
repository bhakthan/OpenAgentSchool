import { useState, useEffect } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Atom, Brain, Cpu, FlowArrow, ChartBar, Lightbulb, Target, Rocket, Eye, GearSix, Graph, Lightning, Gear } from "@phosphor-icons/react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock, conceptPill } from "./conceptStyles"
import ReferenceSection from "@/components/references/ReferenceSection"
import BlochSphereVisualizer from "../visualization/BlochSphereVisualizer"
import QuantumCircuitBuilder from "../visualization/QuantumCircuitBuilder"
import QuantumVsClassicalDashboard from "../visualization/QuantumVsClassicalDashboard"
import AudioNarrationControls from "@/components/audio/AudioNarrationControls"

interface QuantumAIRoboticsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const capabilityPill = (label: string) => (
  <span className={conceptPill("text-xs font-semibold uppercase tracking-wide")}>{label}</span>
)

export default function QuantumAIRoboticsConcept({ onMarkComplete, onNavigateToNext }: QuantumAIRoboticsConceptProps) {
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>('qaoa')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTab, setActiveTab] = useState<string>('foundation')

  // Tab-specific animation sequences
  const tabAnimations: Record<string, Array<{id: string; title: string; description: string; duration: number; highlight: string[]}>> = {
    foundation: [
      {
        id: 'qubit-intro',
        title: 'Understanding Qubits',
        description: 'Unlike classical bits (0 or 1), qubits exist in superposition',
        duration: 3000,
        highlight: ['qubit-section']
      },
      {
        id: 'superposition',
        title: 'Superposition Principle',
        description: 'Qubits can be 0 AND 1 simultaneously until measured',
        duration: 3500,
        highlight: ['superposition-visual']
      },
      {
        id: 'entanglement',
        title: 'Quantum Entanglement',
        description: 'Qubits become correlated: measuring one affects the other instantly',
        duration: 3500,
        highlight: ['entanglement-section']
      },
      {
        id: 'quantum-gates',
        title: 'Quantum Gates',
        description: 'Operations that manipulate qubit states (like classical logic gates)',
        duration: 3000,
        highlight: ['gates-section']
      }
    ],
    algorithms: [
      { id: 'qaoa-step', title: 'QAOA Algorithm', description: 'Quantum approximate optimization for combinatorial problems', duration: 3000, highlight: ['qaoa'] },
      { id: 'vqe-step', title: 'VQE Algorithm', description: 'Variational quantum eigensolver for ground state energy', duration: 3000, highlight: ['vqe'] },
      { id: 'grover-step', title: "Grover's Algorithm", description: 'Quantum search with quadratic speedup', duration: 3000, highlight: ['grover'] }
    ],
    sensing: [
      { id: 'quantum-sensors', title: 'Quantum Sensors', description: 'Ultra-precise measurements using quantum states', duration: 3000, highlight: ['sensors'] },
      { id: 'slam-integration', title: 'Quantum-Enhanced SLAM', description: 'Simultaneous localization and mapping with quantum precision', duration: 3500, highlight: ['slam'] }
    ],
    optimization: [
      { id: 'path-planning', title: 'Path Planning', description: 'Quantum algorithms for optimal route finding', duration: 3000, highlight: ['path'] },
      { id: 'resource-allocation', title: 'Resource Allocation', description: 'Optimize fleet and task distribution', duration: 3000, highlight: ['resources'] }
    ],
    'hybrid-architectures': [
      { id: 'classical-quantum', title: 'Classical-Quantum Bridge', description: 'Seamless integration between processing paradigms', duration: 3000, highlight: ['bridge'] },
      { id: 'error-mitigation', title: 'Error Mitigation', description: 'Strategies to handle quantum noise', duration: 3500, highlight: ['errors'] }
    ],
    'research-frontier': [
      { id: 'quantum-ml', title: 'Quantum Machine Learning', description: 'ML algorithms accelerated by quantum computing', duration: 3000, highlight: ['qml'] },
      { id: 'quantum-rl', title: 'Quantum Reinforcement Learning', description: 'RL with quantum-enhanced exploration', duration: 3500, highlight: ['qrl'] }
    ]
  }

  const animationSteps = tabAnimations[activeTab] || tabAnimations.foundation

  // Step-by-step animation controller
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && currentStep < animationSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, animationSteps[currentStep].duration)
    } else if (currentStep >= animationSteps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, animationSteps])

  const handlePlayPause = () => {
    if (currentStep >= animationSteps.length - 1 && !isPlaying) {
      setCurrentStep(0)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  // Reset animation when tab changes
  useEffect(() => {
    handleReset()
  }, [activeTab])

  const tabs = [
    {
      id: "foundation",
      title: "Quantum Basics",
      description: "Quantum computing fundamentals for AI/Robotics practitioners",
      icon: <Atom className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Step-by-Step Animation Controls */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handlePlayPause}
                    size="sm"
                    className="gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause Animation' : 'Start Learning'}
                  </Button>
                  <Button
                    onClick={handleReset}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Step {currentStep + 1} of {animationSteps.length}
                  </Badge>
                  {currentStep < animationSteps.length && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {animationSteps[currentStep].title}
                    </Badge>
                  )}
                </div>
              </div>
              {currentStep < animationSteps.length && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{animationSteps[currentStep].title}:</strong>{' '}
                    {animationSteps[currentStep].description}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Quantum Computing Primer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                Quantum Computing Primer
              </CardTitle>
              <CardDescription>
                Essential quantum concepts without requiring a physics degree—focused on what matters for AI and robotics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div 
                    className={conceptSurface(`p-4 space-y-2 transition-all ${
                      currentStep === 0 ? 'ring-2 ring-blue-500 shadow-lg' : ''
                    }`)}
                  >
                    <h4 className="font-semibold flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Qubits vs. Classical Bits
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Classical bits are binary: 0 or 1. Qubits exist in <strong>superposition</strong>—simultaneously 
                      representing both states until measured. This allows quantum computers to explore multiple solution 
                      paths in parallel.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capabilityPill("Superposition")}
                      {capabilityPill("Parallelism")}
                      {capabilityPill("Interference")}
                    </div>
                  </div>

                  <div 
                    className={conceptSurface(`p-4 space-y-2 transition-all ${
                      currentStep === 2 ? 'ring-2 ring-purple-500 shadow-lg' : ''
                    }`)}
                  >
                    <h4 className="font-semibold flex items-center gap-2">
                      <FlowArrow className="w-4 h-4" />
                      Entanglement
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Qubits can become <strong>entangled</strong>—measuring one instantly affects the state of another, 
                      regardless of distance. This correlation enables quantum algorithms to solve problems classical 
                      computers find intractable.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capabilityPill("Correlation")}
                      {capabilityPill("Non-locality")}
                      {capabilityPill("Quantum Gates")}
                    </div>
                  </div>

                  <div className={conceptSurface("p-4 space-y-2")}>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Measurement & Decoherence
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Measuring a qubit collapses its superposition to a definite 0 or 1. <strong>Decoherence</strong> 
                      (environmental noise) causes qubits to lose quantum properties—the main challenge in building 
                      practical quantum computers.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capabilityPill("Probabilistic")}
                      {capabilityPill("Fragile States")}
                      {capabilityPill("Error Correction")}
                    </div>
                  </div>

                  <div 
                    className={conceptSurface(`p-4 space-y-2 transition-all ${
                      currentStep === 3 ? 'ring-2 ring-green-500 shadow-lg' : ''
                    }`)}
                  >
                    <h4 className="font-semibold flex items-center gap-2">
                      <GearSix className="w-4 h-4" />
                      Quantum Gates & Circuits
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Quantum gates manipulate qubit states (like Hadamard for superposition, CNOT for entanglement). 
                      Circuits chain gates to implement algorithms—analogous to classical logic gates but reversible.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capabilityPill("Hadamard")}
                      {capabilityPill("CNOT")}
                      {capabilityPill("Parametric")}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Bloch Sphere */}
              <div 
                className={conceptSurfaceSoft(`p-6 transition-all ${
                  currentStep === 1 ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`)}
              >
                <h4 className="font-semibold mb-4">Interactive: Qubit State Visualization</h4>
                <BlochSphereVisualizer />
                <p className="text-xs text-muted-foreground mt-4">
                  The Bloch sphere represents a single qubit's state. North pole = |0⟩, South pole = |1⟩, 
                  equator = superposition states. Click gates to see transformations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why Quantum for AI/Robotics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Why Quantum for AI/Robotics?
              </CardTitle>
              <CardDescription>
                Not every problem benefits from quantum—only specific computational structures see speedup.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  ⚡ Key Insight
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Quantum doesn't make everything faster—it reshapes specific problem structures. The advantage appears 
                  in combinatorial optimization, high-dimensional search, and complex sampling tasks common in robotics.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold mb-2">Problem Classes with Quantum Advantage</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                      <div>
                        <strong className="text-foreground">Combinatorial Optimization:</strong> Path planning, 
                        task allocation, resource scheduling. Quantum explores exponentially large solution spaces 
                        via superposition.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 dark:text-green-400 font-bold">→</span>
                      <div>
                        <strong className="text-foreground">High-Dimensional Search:</strong> Configuration space 
                        exploration for manipulation, multi-modal sensor fusion. Quantum algorithms can amplify 
                        correct solutions.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">→</span>
                      <div>
                        <strong className="text-foreground">Pattern Matching:</strong> Quantum-enhanced similarity 
                        search for object recognition, anomaly detection in sensor streams.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">→</span>
                      <div>
                        <strong className="text-foreground">Sampling from Complex Distributions:</strong> Quantum 
                        generative models for synthetic training data, uncertainty quantification in perception.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold mb-2">Robotics-Specific Use Cases</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border border-border rounded p-3">
                      <Badge variant="outline" className="mb-2">Navigation</Badge>
                      <p className="text-xs text-muted-foreground">
                        Multi-waypoint path planning with dynamic obstacles (QAOA for TSP variants)
                      </p>
                    </div>
                    <div className="border border-border rounded p-3">
                      <Badge variant="outline" className="mb-2">Manipulation</Badge>
                      <p className="text-xs text-muted-foreground">
                        Grasp pose optimization over continuous configuration spaces (quantum annealing)
                      </p>
                    </div>
                    <div className="border border-border rounded p-3">
                      <Badge variant="outline" className="mb-2">Perception</Badge>
                      <p className="text-xs text-muted-foreground">
                        Quantum kernel methods for tactile feedback classification (VQC)
                      </p>
                    </div>
                    <div className="border border-border rounded p-3">
                      <Badge variant="outline" className="mb-2">Multi-Robot</Badge>
                      <p className="text-xs text-muted-foreground">
                        Task allocation across heterogeneous fleets (D-Wave hybrid solvers)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Computing Landscape */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Graph className="w-5 h-5" />
                Quantum Computing Landscape
              </CardTitle>
              <CardDescription>
                Navigating hardware platforms, cloud access, and current limitations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold">Platform</th>
                      <th className="text-left p-2 font-semibold">Technology</th>
                      <th className="text-left p-2 font-semibold">Qubits</th>
                      <th className="text-left p-2 font-semibold">Best For</th>
                      <th className="text-left p-2 font-semibold">Access</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">IBM Quantum</td>
                      <td className="p-2">Superconducting</td>
                      <td className="p-2">127-433</td>
                      <td className="p-2">QAOA, VQE, research</td>
                      <td className="p-2">Cloud (free tier)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Google Quantum AI</td>
                      <td className="p-2">Superconducting</td>
                      <td className="p-2">70+ (Sycamore)</td>
                      <td className="p-2">Quantum supremacy demos</td>
                      <td className="p-2">Research partnerships</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">IonQ</td>
                      <td className="p-2">Trapped Ion</td>
                      <td className="p-2">32 (high fidelity)</td>
                      <td className="p-2">Precise quantum circuits</td>
                      <td className="p-2">AWS Braket, Azure</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">D-Wave</td>
                      <td className="p-2">Quantum Annealing</td>
                      <td className="p-2">5000+</td>
                      <td className="p-2">Optimization problems</td>
                      <td className="p-2">Leap cloud, AWS</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Rigetti</td>
                      <td className="p-2">Superconducting</td>
                      <td className="p-2">80+</td>
                      <td className="p-2">Hybrid algorithms</td>
                      <td className="p-2">Quantum Cloud Services</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-foreground">Xanadu</td>
                      <td className="p-2">Photonic</td>
                      <td className="p-2">216 (modes)</td>
                      <td className="p-2">Continuous-variable QC</td>
                      <td className="p-2">Xanadu Cloud</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-2">Cloud Access</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• IBM Quantum Experience (free)</li>
                    <li>• AWS Braket (pay-per-shot)</li>
                    <li>• Azure Quantum (credits available)</li>
                    <li>• Google Quantum AI (research access)</li>
                  </ul>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-2">Simulators vs. Hardware</h4>
                  <p className="text-xs text-muted-foreground">
                    Simulators (Qiskit Aer, Cirq) run on classical computers—perfect for algorithm development. 
                    Real hardware has noise and limited qubits but shows true quantum behavior.
                  </p>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-2">Current Limitations</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Error rates: 0.1-1% per gate</li>
                    <li>• Coherence time: μs to ms</li>
                    <li>• Qubit count: &lt;500 (gate-based)</li>
                    <li>• No general fault tolerance yet</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Code Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Your First Quantum Circuit
              </CardTitle>
              <CardDescription>
                A simple quantum circuit demonstrating superposition and entanglement using Qiskit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className={conceptCodeBlock("text-xs md:text-sm p-4")}>
{`# Install: pip install qiskit qiskit-aer matplotlib
from qiskit import QuantumCircuit, execute, Aer
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt

# Create a quantum circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Apply Hadamard gate to qubit 0 (creates superposition)
qc.h(0)

# Apply CNOT gate (entangles qubits 0 and 1)
qc.cx(0, 1)

# Measure both qubits
qc.measure([0, 1], [0, 1])

# Execute on simulator
simulator = Aer.get_backend('qasm_simulator')
job = execute(qc, simulator, shots=1000)
result = job.result()
counts = result.get_counts(qc)

# Results: ~50% |00⟩ and ~50% |11⟩ (never |01⟩ or |10⟩ due to entanglement)
print(counts)  # {'00': 503, '11': 497}

# Visualize circuit
print(qc.draw())
#      ┌───┐     ┌─┐   
# q_0: ┤ H ├──■──┤M├───
#      └───┘┌─┴─┐└╥┘┌─┐
# q_1: ─────┤ X ├─╫─┤M├
#           └───┘ ║ └╥┘
# c: 2/═══════════╩══╩═
#                 0  1`}
              </pre>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm">
                  What's Happening?
                </h4>
                <ul className="space-y-2 text-xs text-blue-800 dark:text-blue-300">
                  <li>
                    <strong>Hadamard (H):</strong> Puts qubit 0 into superposition: (|0⟩ + |1⟩)/√2
                  </li>
                  <li>
                    <strong>CNOT (CX):</strong> Flips qubit 1 if qubit 0 is |1⟩, creating entanglement
                  </li>
                  <li>
                    <strong>Result:</strong> Measurement always yields correlated outcomes (00 or 11, never 01 or 10)
                  </li>
                  <li>
                    <strong>Robotics Connection:</strong> This entanglement structure underlies quantum algorithms 
                    for multi-robot coordination and distributed sensing
                  </li>
                </ul>
              </div>

              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold text-sm mb-2">Try It Yourself</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Run this code in Google Colab or locally. Experiment with different gates (X, Y, Z, RX) 
                  and observe how measurements change.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Qiskit</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Beginner-Friendly</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },

    // Tab 2: Quantum Algorithms for AI
    {
      id: "algorithms",
      title: "Quantum Algorithms for AI",
      description: "Deep dive into quantum ML and optimization algorithms",
      icon: <Brain className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Quantum Optimization Algorithms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="w-5 h-5" />
                Quantum Optimization Algorithms
              </CardTitle>
              <CardDescription>
                Leverage quantum superposition to explore solution spaces exponentially faster than classical methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* QAOA Section */}
                <div className={conceptSurface("p-6")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Graph className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">QAOA (Quantum Approximate Optimization Algorithm)</h3>
                      <p className="text-xs text-muted-foreground">Hybrid quantum-classical for combinatorial problems</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">How It Works</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Encode problem as Hamiltonian (energy function)</li>
                          <li>• Prepare quantum superposition of all solutions</li>
                          <li>• Apply alternating mixing & cost operators</li>
                          <li>• Measure to sample solution candidates</li>
                          <li>• Classical optimizer tunes circuit parameters</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Robotics Use Case: Path Planning</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Warehouse robot visits 10 stations—find shortest tour:
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-xs">
                          <strong>Classical:</strong> 10! = 3.6M paths to check<br/>
                          <strong>QAOA:</strong> Quantum parallelism explores superposition of all paths, 
                          converges to near-optimal in O(log N) depth
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">Performance Benchmarks</h4>
                      <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        <div>
                          <div className="font-bold text-lg text-blue-600 dark:text-blue-400">10-20</div>
                          <div className="text-muted-foreground">Nodes (sweet spot)</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-green-600 dark:text-green-400">80-95%</div>
                          <div className="text-muted-foreground">Optimal quality</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-orange-600 dark:text-orange-400">100-500ms</div>
                          <div className="text-muted-foreground">Cloud latency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantum Annealing Section */}
                <div className={conceptSurface("p-6")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Lightning className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quantum Annealing (D-Wave)</h3>
                      <p className="text-xs text-muted-foreground">Specialized hardware for discrete optimization</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Unlike gate-based quantum computers, D-Wave annealers use quantum tunneling to find 
                      low-energy states of Ising models—directly solving QUBO problems.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-4">
                        <Badge variant="outline" className="mb-3">Multi-Robot Task Allocation</Badge>
                        <p className="text-xs text-muted-foreground mb-2">
                          Assign 50 tasks to 10 robots minimizing travel + battery constraints:
                        </p>
                        <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto">
{`# D-Wave Ocean SDK
from dwave.system import DWaveSampler
bqm = dimod.BinaryQuadraticModel(...)
sampler = DWaveSampler()
result = sampler.sample(bqm)
# Returns task assignment in ~20ms`}
                        </pre>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <Badge variant="outline" className="mb-3">When to Use</Badge>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                          <li>✓ Large discrete search spaces (100+ variables)</li>
                          <li>✓ Binary decision problems</li>
                          <li>✓ Need fast sampling (real-time re-planning)</li>
                          <li>✗ Continuous optimization</li>
                          <li>✗ Require provable optimality</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Machine Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Quantum Machine Learning
              </CardTitle>
              <CardDescription>
                Quantum circuits as learnable layers—potentially exponential feature spaces for classification and learning.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* VQC Section */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">Variational Quantum Circuits (VQC)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Architecture</h4>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex gap-3">
                        <span className="text-blue-600 dark:text-blue-400">1.</span>
                        <div><strong className="text-foreground">Data Encoding:</strong> Classical sensor data → quantum states via feature map</div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-green-600 dark:text-green-400">2.</span>
                        <div><strong className="text-foreground">Variational Layer:</strong> Parametric quantum gates (trainable)</div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-600 dark:text-purple-400">3.</span>
                        <div><strong className="text-foreground">Measurement:</strong> Expectation values → classical output</div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-orange-600 dark:text-orange-400">4.</span>
                        <div><strong className="text-foreground">Training:</strong> Classical optimizer (Adam) updates parameters</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Robotics Application: Tactile Classification</h4>
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <p className="text-xs text-green-900 dark:text-green-100 mb-3">
                        <strong>Challenge:</strong> Classify object texture from high-dimensional tactile sensor array (256 sensors)
                      </p>
                      <p className="text-xs text-green-800 dark:text-green-300 mb-2">
                        <strong>VQC Advantage:</strong> Quantum feature space can represent 2^n correlations with n qubits
                      </p>
                      <div className="text-xs space-y-1 text-green-700 dark:text-green-400">
                        <div>• Classical NN: 256 → 128 → 64 → 10 classes</div>
                        <div>• VQC: 8 qubits access 2^8 = 256D feature space</div>
                        <div>• Result: 15% better accuracy on small datasets</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <pre className={conceptCodeBlock("text-xs p-4")}>
{`# PennyLane: Hybrid Quantum-Classical ML
import pennylane as qml
import torch

# Define quantum device
dev = qml.device('default.qubit', wires=4)

# Variational quantum circuit
@qml.qnode(dev, interface='torch')
def quantum_net(inputs, weights):
    # Encode classical data
    for i, x in enumerate(inputs):
        qml.RY(x, wires=i)
    
    # Variational layers (trainable)
    for W in weights:
        for i in range(4):
            qml.RX(W[i, 0], wires=i)
            qml.RY(W[i, 1], wires=i)
        for i in range(3):
            qml.CNOT(wires=[i, i+1])
    
    # Measure expectation
    return qml.expval(qml.PauliZ(0))

# Training loop (standard PyTorch)
weights = torch.randn(3, 4, 2, requires_grad=True)
opt = torch.optim.Adam([weights], lr=0.01)

for epoch in range(100):
    loss = ...  # Compute loss
    loss.backward()
    opt.step()`}
                  </pre>
                </div>
              </div>

              {/* Quantum Kernel Methods */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">Quantum Kernel Methods</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use quantum computers to compute kernel functions that are classically intractable, 
                      enabling SVM and other kernel methods to operate in exponentially large feature spaces.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">Key Idea</h4>
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        Quantum feature map: x → |φ(x)⟩<br/>
                        Kernel: K(x,y) = |⟨φ(x)|φ(y)⟩|²<br/>
                        Computed via quantum circuit overlap measurement
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Vision-Based Object Recognition</h4>
                    <div className="border border-border rounded-lg p-3 text-xs space-y-2">
                      <div><strong>Input:</strong> 64x64 grayscale image → 4096D vector</div>
                      <div><strong>Classical SVM:</strong> RBF kernel, 85% accuracy</div>
                      <div><strong>Quantum Kernel SVM:</strong> 12-qubit feature map, <strong>91% accuracy</strong></div>
                      <div className="text-green-600 dark:text-green-400">
                        <strong>+6% gain</strong> on small training sets (100 samples)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantum Reinforcement Learning */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">Quantum Reinforcement Learning</h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Quantum circuits can represent value functions or policies in exponentially compressed form, 
                  potentially accelerating exploration and credit assignment.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-2">Quantum Q-Learning</Badge>
                    <p className="text-xs text-muted-foreground">
                      Q-table → Quantum state superposition. Update via amplitude amplification.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-2">VQC Policy Networks</Badge>
                    <p className="text-xs text-muted-foreground">
                      Policy π(s) represented by parametric quantum circuit, trained via policy gradient.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-2">Use Case</Badge>
                    <p className="text-xs text-muted-foreground">
                      Adaptive robot control with high-dimensional continuous state spaces.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Algorithm Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Selection Guide</CardTitle>
              <CardDescription>Choose the right quantum approach for your robotics problem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Algorithm</th>
                      <th className="text-left p-3 font-semibold">Problem Class</th>
                      <th className="text-left p-3 font-semibold">Quantum Advantage</th>
                      <th className="text-left p-3 font-semibold">Robotics Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">QAOA</td>
                      <td className="p-3">Combinatorial optimization</td>
                      <td className="p-3">Exponential search space</td>
                      <td className="p-3">Multi-waypoint path planning</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">VQC</td>
                      <td className="p-3">Pattern classification</td>
                      <td className="p-3">High-dimensional features</td>
                      <td className="p-3">Tactile feedback classification</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">Quantum Annealing</td>
                      <td className="p-3">Constraint satisfaction</td>
                      <td className="p-3">Large discrete spaces</td>
                      <td className="p-3">Warehouse task scheduling</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">Quantum Kernels</td>
                      <td className="p-3">SVM / kernel methods</td>
                      <td className="p-3">Intractable kernels</td>
                      <td className="p-3">Vision-based object recognition</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Quantum RL</td>
                      <td className="p-3">Sequential decision-making</td>
                      <td className="p-3">Compressed value functions</td>
                      <td className="p-3">Adaptive manipulation policies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },

    // Tab 3: Quantum Sensing for Robotics
    {
      id: "sensing",
      title: "Quantum Sensing",
      description: "Revolutionary perception via quantum sensors",
      icon: <Eye className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Quantum Sensing Fundamentals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Quantum Sensing Fundamentals
              </CardTitle>
              <CardDescription>
                Sensors that exploit quantum phenomena to achieve sensitivity beyond classical limits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Why Quantum Sensors?
                </h4>
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  Classical sensors are limited by shot noise and thermal fluctuations. Quantum sensors use 
                  superposition and entanglement to achieve sensitivity approaching the <strong>Heisenberg limit</strong>—
                  surpassing the standard quantum limit by orders of magnitude.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Quantum Magnetometers
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    NV-diamond centers, SQUIDs, atomic vapor cells—measure magnetic fields with fT (femtoTesla) sensitivity.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sensitivity:</span>
                      <span className="font-semibold">10 fT/√Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Range:</span>
                      <span className="font-semibold">nT to mT</span>
                    </div>
                  </div>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Quantum Gyroscopes
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Atom interferometers measure rotation with 1000× better precision than mechanical MEMS gyros.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bias stability:</span>
                      <span className="font-semibold">&lt;0.001 °/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ARW:</span>
                      <span className="font-semibold">0.0001 °/√hr</span>
                    </div>
                  </div>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    Quantum Imaging
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Ghost imaging, quantum radar—see through obscurants (fog, smoke) with entangled photons.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SNR boost:</span>
                      <span className="font-semibold">6-10 dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Range:</span>
                      <span className="font-semibold">10-100m</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Robotics Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="w-5 h-5" />
                Robotics Applications
              </CardTitle>
              <CardDescription>
                Where quantum sensing delivers transformational capabilities for autonomous systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Navigation */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">GPS-Denied Navigation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Robots operating underground, indoors, or in jamming environments lose GPS. 
                      Classical IMUs accumulate drift (1% of distance traveled).
                    </p>
                    <h4 className="font-semibold text-sm mb-2">Quantum Solution</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong className="text-foreground">Quantum IMU:</strong> Atom interferometry for acceleration/rotation</li>
                      <li>• <strong className="text-foreground">Magnetic Gradiometry:</strong> NV-diamond maps underground pipes/structures</li>
                      <li>• <strong className="text-foreground">Result:</strong> 10× position accuracy over 1 hour = 10m error vs 100m</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 text-blue-900 dark:text-blue-100">
                      Case Study: Mining Robot
                    </h4>
                    <div className="space-y-3 text-xs text-blue-800 dark:text-blue-300">
                      <div>
                        <strong>Scenario:</strong> Navigate 2km tunnel, no GPS/comms
                      </div>
                      <div>
                        <strong>Classical:</strong> MEMS IMU + wheel odometry<br/>
                        → 20m drift after 2km (1% error)
                      </div>
                      <div>
                        <strong>Quantum:</strong> Atom interferometer IMU<br/>
                        → <strong>2m drift</strong> (0.1% error)
                      </div>
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-700">
                        <strong>Impact:</strong> Enables autonomous return without beacon infrastructure
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Object Detection */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">All-Weather Object Detection</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Problem: Sensor Degradation</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• LiDAR fails in fog/rain (scattering)</li>
                      <li>• Cameras blind in low light</li>
                      <li>• Radar poor angular resolution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Quantum Radar</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Entangled photon pairs (signal + idler)</li>
                      <li>• 6dB SNR boost vs. classical radar</li>
                      <li>• Works through fog, smoke, dust</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2">Autonomous Vehicle Application</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Quantum lidar detects pedestrians at 100m range in heavy fog where classical lidar fails at 20m.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded p-2 text-xs">
                      <div className="font-semibold text-red-900 dark:text-red-100">Classical LiDAR</div>
                      <div className="text-red-700 dark:text-red-300">Range: 20m (fog)</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded p-2 text-xs">
                      <div className="font-semibold text-green-900 dark:text-green-100">Quantum LiDAR</div>
                      <div className="text-green-700 dark:text-green-300">Range: 100m (fog)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Sensing */}
              <div className={conceptSurface("p-6")}>
                <h3 className="font-semibold text-lg mb-4">Environmental & Hazmat Detection</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-3">Magnetic Anomaly Detection</Badge>
                    <p className="text-xs text-muted-foreground mb-2">
                      SQUID magnetometers detect buried ordnance, pipes, or ore deposits from 10m away.
                    </p>
                    <div className="text-xs">
                      <strong>Use:</strong> Search & rescue, mine detection
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-3">Quantum Gas Sensors</Badge>
                    <p className="text-xs text-muted-foreground mb-2">
                      Cavity ring-down spectroscopy detects ppb (parts per billion) chemical signatures.
                    </p>
                    <div className="text-xs">
                      <strong>Use:</strong> Hazmat robots, leak detection
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <Badge variant="outline" className="mb-3">Gravitometers</Badge>
                    <p className="text-xs text-muted-foreground mb-2">
                      Atom interferometry measures gravity gradients for underground void detection.
                    </p>
                    <div className="text-xs">
                      <strong>Use:</strong> Tunnel inspection, archaeology
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GearSix className="w-5 h-5" />
                Sensor Fusion Architecture
              </CardTitle>
              <CardDescription>
                Integrating quantum sensors into classical robotics stacks requires careful calibration and fusion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={conceptSurfaceSoft("p-6")}>
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold">
                    Hybrid Perception Pipeline
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">Classical Sensors</h4>
                    <ul className="text-xs space-y-1">
                      <li>• LiDAR</li>
                      <li>• RGB-D cameras</li>
                      <li>• MEMS IMU</li>
                      <li>• Wheel encoders</li>
                    </ul>
                  </div>

                  <div className="border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2 text-purple-600 dark:text-purple-400">Quantum Sensors</h4>
                    <ul className="text-xs space-y-1">
                      <li>• NV-diamond magnetometer</li>
                      <li>• Atom interferometer gyro</li>
                      <li>• Quantum lidar</li>
                    </ul>
                  </div>

                  <div className="border-2 border-green-300 dark:border-green-700 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">Fusion Layer</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Extended Kalman Filter</li>
                      <li>• Multi-modal calibration</li>
                      <li>• Adaptive weighting</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="text-2xl">↓</div>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 border-2 border-green-500 px-6 py-3 rounded-lg">
                    <div className="font-semibold text-green-900 dark:text-green-100">State Estimate</div>
                    <div className="text-xs text-green-700 dark:text-green-300">Position, velocity, orientation + uncertainties</div>
                  </div>
                </div>

                <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">
                    Integration Challenges
                  </h4>
                  <ul className="space-y-2 text-xs text-amber-800 dark:text-amber-300">
                    <li>• <strong>Calibration:</strong> Cross-calibrate quantum and classical sensor frames</li>
                    <li>• <strong>Timing:</strong> Synchronize sensors with different sampling rates (quantum: kHz, LiDAR: 10Hz)</li>
                    <li>• <strong>Noise Models:</strong> Quantum sensors have different noise characteristics (shot noise vs. thermal)</li>
                    <li>• <strong>Fallback:</strong> Design graceful degradation if quantum sensor fails</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },
    // Tab 4: Quantum Optimization for Robot Planning
    {
      id: "optimization",
      title: "Quantum Optimization for Planning",
      description: "Practical quantum solvers for robotics planning problems",
      icon: <Target className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quantum Optimization for Planning
              </CardTitle>
              <CardDescription>
                Map robotics planning problems to quantum-native formats and solve with QAOA or annealing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">QUBO Formulation</h4>
                <p className="text-sm text-muted-foreground mb-2">Quadratic Unconstrained Binary Optimization (QUBO) is the standard input for quantum annealers. Many robotics problems can be encoded as QUBO:</p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Path planning (TSP, multi-robot coordination)</li>
                  <li>• Grasp pose optimization</li>
                  <li>• Task allocation</li>
                </ul>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`# Qiskit Optimization\nfrom qiskit_optimization import QuadraticProgram\nqp = QuadraticProgram()\n# ... define variables and constraints ...\n`}</pre>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Hands-On: Path Planning with QAOA</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`# QAOA for TSP\nfrom qiskit.algorithms import QAOA\n# ... setup problem ...\nqaoa = QAOA()\nresult = qaoa.compute_minimum_eigenvalue(qp)\n`}</pre>
                <div className="text-xs text-muted-foreground mt-2">Compare solution quality and runtime to classical solvers.</div>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Multi-Robot Task Allocation</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`# D-Wave Ocean SDK\nfrom dwave.system import DWaveSampler\nbqm = ... # define QUBO\nsampler = DWaveSampler()\nresult = sampler.sample(bqm)\n`}</pre>
                <div className="text-xs text-muted-foreground mt-2">Use quantum annealing for large-scale allocation problems.</div>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Practical Considerations</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Quantum advantage for 10-100 variable problems</li>
                  <li>• Hybrid solvers: quantum for subproblems, classical for coordination</li>
                  <li>• Error mitigation: measurement averaging, zero-noise extrapolation</li>
                  <li>• Fallback to classical if quantum unavailable</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },
    // Tab 5: Hybrid Classical-Quantum Architectures
    {
      id: "hybrid-architectures",
      title: "Hybrid Classical-Quantum Architectures",
      description: "Design patterns for integrating quantum into robotics stacks",
      icon: <FlowArrow className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlowArrow className="w-5 h-5" />
                Hybrid Architecture Patterns
              </CardTitle>
              <CardDescription>
                Combine classical and quantum modules for scalable, robust robotics systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Pattern 1: Quantum Co-Processor</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`Perception (Classical) → State Estimation (Classical)\n                              ↓\n                      Planning Problem Formulation\n                              ↓\n                        Quantum Solver (QAOA/Annealing)\n                              ↓\n                        Solution Decoding\n                              ↓\n                       Control (Classical)`}</pre>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Pattern 2: Quantum-Enhanced Perception</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`Quantum Sensors → Hybrid Fusion Layer → Classical ML → Planning\nClassical Sensors ↗`}</pre>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Pattern 3: Quantum Learning Layer</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`Classical CNN (Feature Extraction) → Quantum Kernel Classifier → Action Selection`}</pre>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">System Design Checklist</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Identify quantum-suitable subproblem</li>
                  <li>• Benchmark problem size vs. qubit availability</li>
                  <li>• Design classical pre/post-processing</li>
                  <li>• Plan error mitigation</li>
                  <li>• Define fallback to classical</li>
                  <li>• Implement telemetry for quantum circuit metrics</li>
                </ul>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Reference Implementation</h4>
                <pre className={conceptCodeBlock("text-xs p-4")}>{`Autonomous forklift:\n- Classical: LiDAR SLAM + object detection (YOLO)\n- Quantum: Task sequencing optimization (D-Wave)\n- Hybrid: Re-plan every 30s using quantum solution`}</pre>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Deployment Considerations</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Latency: Quantum cloud API calls (100-500ms typical)</li>
                  <li>• Cost: Cloud quantum compute pricing models</li>
                  <li>• Reliability: Handling quantum hardware downtime</li>
                  <li>• Hybrid scheduling: When to invoke quantum vs. heuristic</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },
    // Tab 6: Research Frontier & Tools
    {
      id: "research-frontier",
      title: "Research Frontier & Tools",
      description: "Explore cutting-edge research and quantum robotics tools",
      icon: <Rocket className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Research Frontier & Tools
              </CardTitle>
              <CardDescription>
                Stay ahead with the latest research, frameworks, and hardware for quantum-enhanced robotics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Emerging Research Areas</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Quantum simulators for robot training</li>
                  <li>• Quantum communication for multi-robot swarms</li>
                  <li>• Quantum-inspired classical algorithms</li>
                  <li>• Quantum sensors for environmental monitoring</li>
                </ul>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Tool Ecosystem</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Qiskit (IBM) - Python SDK for gate-based quantum computing</li>
                  <li>• Ocean (D-Wave) - Quantum annealing optimization</li>
                  <li>• Cirq (Google) - Research quantum algorithms</li>
                  <li>• PennyLane (Xanadu) - Quantum ML and differentiable programming</li>
                  <li>• Azure Quantum (Microsoft) - Hybrid workflows, Q#</li>
                  <li>• Qnami, AOSense - Quantum sensing SDKs</li>
                </ul>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Getting Started Roadmap</h4>
                <ol className="space-y-2 text-xs text-muted-foreground list-decimal ml-4">
                  <li>Complete IBM Quantum Learning tutorials</li>
                  <li>Implement QAOA for simple TSP</li>
                  <li>Integrate with robotics simulator (Gazebo + Qiskit)</li>
                  <li>Benchmark quantum vs. classical on real problem</li>
                  <li>Explore quantum sensing hardware</li>
                </ol>
              </div>
              <div className={conceptSurface("p-6")}> 
                <h4 className="font-semibold mb-2">Community & Resources</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Google Quantum AI, IBM Quantum, Zapata research groups</li>
                  <li>• Academic conferences: QIP, QCE, Quantum Techniques in ML</li>
                  <li>• Open-source: TensorFlow Quantum, PyQuil, Strawberry Fields</li>
                  <li>• Robotics + Quantum workshops at ICRA/IROS</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },
    // Tab 7: Interactive Tools & Comparisons
    {
      id: "interactive-tools",
      title: "Interactive Tools & Comparisons",
      description: "Hands-on circuit builder and algorithm performance dashboard",
      icon: <GearSix className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Quantum Circuit Builder */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Build Your First Quantum Circuit</h3>
            <QuantumCircuitBuilder />
            <p className="text-sm text-muted-foreground mt-4">
              Experiment with quantum gates to build circuits for simple algorithms. The generated Qiskit code can be run on IBM Quantum simulators or hardware.
            </p>
          </div>

          {/* Algorithm Comparison Dashboard */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quantum vs. Classical Performance</h3>
            <QuantumVsClassicalDashboard />
            <p className="text-sm text-muted-foreground mt-4">
              Click any algorithm to see detailed complexity analysis and robotics applications. Use this dashboard to identify where quantum offers practical speedup.
            </p>
          </div>

          <ReferenceSection type="concept" itemId="quantum-ai-robotics" />
        </div>
      )
    },
  ]

  return (
    <ConceptLayout
      conceptId="quantum-ai-robotics"
      title="Quantum-Enhanced AI & Robotics"
      description="Harness quantum phenomena for next-gen perception, planning, and learning in embodied AI systems."
      tabs={tabs}
      nextConcept={{
        id: "agent-ops",
        title: "Agent Ops & Reliability",
        description: "Operationalize quantum-hybrid systems with monitoring and deployment best practices."
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
