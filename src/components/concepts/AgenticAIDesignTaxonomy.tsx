import { useEffect, useMemo, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  Brain, 
  Network, 
  Shield, 
  Clock, 
  Users, 
  ArrowsHorizontal, 
  Stack, 
  CheckCircle,
  Warning,
  Graph,
  Code,
  Gear,
  Globe,
  ChartLine,
  Database,
  Robot,
  Lightning,
  TreeStructure,
  Eye,
  Target,
  Cpu,
  CloudArrowUp,
  ShieldCheck,
  Scales,
  Books,
  Wrench,
  Plus,
  Minus
} from "@phosphor-icons/react"
import { ArrowsOutSimple, ArrowsInSimple } from "@phosphor-icons/react"
import { EnlightenMeButton as AskAIButton } from '@/components/enlighten/EnlightenMeButton'
// Deep dive moved to a dedicated page to reduce memory and improve visibility

interface AgenticAIDesignTaxonomyProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

const AgenticAIDesignTaxonomy: React.FC<AgenticAIDesignTaxonomyProps> = ({ 
  onMarkComplete, 
  onNavigateToNext 
}) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [selectedTaxonomyNode, setSelectedTaxonomyNode] = useState<string | null>(null)
  const [isVisualFullscreen, setIsVisualFullscreen] = useState(false)
  const [isTreeFullscreen, setIsTreeFullscreen] = useState(false)
  // Deep dive moved to a dedicated page (opens in new tab)

  const markSectionComplete = (section: string) => {
    const newCompleted = new Set(completedSections)
    newCompleted.add(section)
    setCompletedSections(newCompleted)
  // We have 5 sections with completion buttons: overview, visual, taxonomy, challenges, future
  setProgress((newCompleted.size / 5) * 100)
    
  if (newCompleted.size === 5 && onMarkComplete) {
      onMarkComplete()
    }
  }

  // Enhanced taxonomy data with more comprehensive categories
  const taxonomyData = {
    agent: {
      title: "Agent Patterns",
      icon: <Brain className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      position: { x: 200, y: 150 },
      categories: [
        { 
          name: "Role-based", 
          description: "Agents with specialized roles and domain expertise", 
          examples: ["Developer Agent", "QA Agent", "Manager Agent", "Research Agent", "Customer Service Agent"],
          icon: <Users className="w-4 h-4" />
        },
        { 
          name: "Agent Behaviour", 
          description: "Behavioral patterns and response mechanisms", 
          examples: ["Reactive", "Proactive", "Goal-oriented", "Collaborative", "Autonomous"],
          icon: <Robot className="w-4 h-4" />
        },
        { 
          name: "Planning", 
          description: "Strategic and tactical planning capabilities", 
          examples: ["Hierarchical Planning", "Multi-step Reasoning", "Dynamic Replanning", "Resource Allocation", "Risk Assessment"],
          icon: <Target className="w-4 h-4" />
        },
        { 
          name: "Learning", 
          description: "Continuous improvement and adaptation mechanisms", 
          examples: ["Reinforcement Learning", "Few-shot Learning", "Memory-based Learning", "Transfer Learning", "Meta-Learning"],
          icon: <Brain className="w-4 h-4" />
        }
      ]
    },
    interaction: {
      title: "Interaction Protocols",
  icon: <ArrowsHorizontal className="w-5 h-5" />,
  color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  position: { x: 100, y: 300 },
      categories: [
        { 
          name: "Communication Protocols", 
          description: "Standardized communication frameworks", 
          examples: ["MCP (Model Context Protocol)", "A2A (Agent-to-Agent)", "ACP (Agent Communication Protocol)", "Agora Protocol", "JSON-RPC"],
          icon: <Network className="w-4 h-4" />
        },
        { 
          name: "Task Sharing", 
          description: "Collaborative task distribution and execution", 
          examples: ["Work Queues", "Load Balancing", "Consensus Protocols", "Task Decomposition", "Resource Sharing"],
          icon: <TreeStructure className="w-4 h-4" />
        },
        { 
          name: "Message Passing", 
          description: "Inter-agent communication mechanisms", 
          examples: ["Async Messaging", "Event Streams", "Pub/Sub", "Message Brokers", "Stream Processing"],
          icon: <Lightning className="w-4 h-4" />
        }
      ]
    },
    frameworks: {
      title: "Framework Architectures",
      icon: <Stack className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      position: { x: 400, y: 100 },
      categories: [
        { 
          name: "Graph-based", 
          description: "Graph-structured workflow orchestration", 
          examples: ["LangGraph", "StateGraph", "Workflow DAGs", "Conditional Graphs", "Cyclic Workflows"],
          icon: <Graph className="w-4 h-4" />
        },
        { 
          name: "Workflow Oriented", 
          description: "Sequential and conditional workflows", 
          examples: ["CrewAI", "AutoGen", "Sequential Chains", "Pipeline Orchestration", "Event-Driven Workflows"],
          icon: <ChartLine className="w-4 h-4" />
        },
        { 
          name: "Modular", 
          description: "Component-based modular architectures", 
          examples: ["Plugin Systems", "Microservices", "Composable Agents", "Service Mesh", "Container Orchestration"],
          icon: <Stack className="w-4 h-4" />
        }
      ]
    },
    models: {
      title: "Models & Safety",
      icon: <Cpu className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      position: { x: 450, y: 250 },
      categories: [
        { 
          name: "Language Models", 
          description: "Large Language Model integration patterns", 
          examples: ["GPT-4o", "Claude-3.5", "Gemini-1.5", "Llama-3", "Mistral", "Command-R+"],
          icon: <Brain className="w-4 h-4" />
        },
        { 
          name: "Embedding Models", 
          description: "Vector embeddings for semantic understanding", 
          examples: ["text-embedding-3-large", "BGE-large", "E5-mistral-7b", "Sentence-T5", "Cohere-embed"],
          icon: <Database className="w-4 h-4" />
        },
        { 
          name: "Memory Models", 
          description: "Memory and context management systems", 
          examples: ["Vector Stores", "Knowledge Graphs", "Context Windows", "RAG Systems", "Memory Networks"],
          icon: <Clock className="w-4 h-4" />
        },
        { 
          name: "Safety & Guardrails", 
          description: "Safety and validation mechanisms", 
          examples: ["Input Validation", "Output Filtering", "Ethical Constraints", "Safety Classifiers", "Bias Detection"],
          icon: <Shield className="w-4 h-4" />
        }
      ]
    },
    memory: {
      title: "Memory Systems",
      icon: <Database className="w-5 h-5" />,
      color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
      position: { x: 350, y: 400 },
      categories: [
        { 
          name: "Short-term", 
          description: "Working memory for immediate context", 
          examples: ["Context Buffers", "Session State", "Active Memory", "Working Set", "Attention Mechanisms"],
          icon: <Lightning className="w-4 h-4" />
        },
        { 
          name: "Long-term", 
          description: "Persistent memory across sessions", 
          examples: ["Knowledge Base", "Experience Bank", "Skill Library", "Persistent Storage", "Learning Archives"],
          icon: <Books className="w-4 h-4" />
        },
        { 
          name: "Episodic", 
          description: "Event and experience-based memory", 
          examples: ["Conversation History", "Task Outcomes", "Learning Episodes", "Event Logs", "Experience Replay"],
          icon: <Clock className="w-4 h-4" />
        },
        { 
          name: "Semantic", 
          description: "Structured knowledge representation", 
          examples: ["Concept Maps", "Ontologies", "Fact Databases", "Knowledge Graphs", "Taxonomy Trees"],
          icon: <TreeStructure className="w-4 h-4" />
        }
      ]
    },
    applications: {
      title: "Applications & Use Cases",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
      position: { x: 150, y: 500 },
      categories: [
        { 
          name: "Customer Support", 
          description: "Automated customer service and support", 
          examples: ["Chatbots", "Ticket Routing", "Knowledge Assistance", "Escalation Management", "Sentiment Analysis"],
          icon: <Users className="w-4 h-4" />
        },
        { 
          name: "Content Generation", 
          description: "Automated content creation and curation", 
          examples: ["Writing Assistants", "Code Generation", "Creative Content", "Documentation", "Localization"],
          icon: <Code className="w-4 h-4" />
        },
        { 
          name: "Process Automation", 
          description: "Business process automation and optimization", 
          examples: ["Workflow Automation", "Data Processing", "Task Scheduling", "RPA Integration", "Decision Support"],
          icon: <Gear className="w-4 h-4" />
        },
        { 
          name: "Financial Services", 
          description: "Financial analysis and risk management", 
          examples: ["Risk Assessment", "Fraud Detection", "Portfolio Management", "Compliance Monitoring", "Trading Analysis"],
          icon: <ChartLine className="w-4 h-4" />
        }
      ]
    },
    serviceOriented: {
      title: "Agent Services",
      icon: <CloudArrowUp className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
      position: { x: 250, y: 50 },
      categories: [
        { 
          name: "W3C Specifications", 
          description: "Web standards compliance and interoperability", 
          examples: ["WSDL", "SOAP", "REST", "GraphQL", "OpenAPI"],
          icon: <Globe className="w-4 h-4" />
        },
        { 
          name: "Intelligence Orchestration", 
          description: "Coordinating multiple AI services and agents", 
          examples: ["Service Mesh", "API Gateways", "Load Balancers", "Circuit Breakers", "Service Discovery"],
          icon: <Network className="w-4 h-4" />
        },
        { 
          name: "Standardized APIs", 
          description: "Consistent API interfaces for agent services", 
          examples: ["REST APIs", "HTTP Endpoints", "WebSocket APIs", "gRPC Services", "GraphQL Endpoints"],
          icon: <Code className="w-4 h-4" />
        }
      ]
    },
    openIssues: {
      title: "Challenges & Opportunities",
      icon: <Warning className="w-5 h-5" />,
      color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      position: { x: 50, y: 100 },
      categories: [
        { 
          name: "Scalability", 
          description: "Managing large-scale agent deployments", 
          examples: ["Horizontal Scaling", "Resource Management", "Load Distribution", "Performance Optimization", "Cost Management"],
          icon: <ChartLine className="w-4 h-4" />
        },
        { 
          name: "Interoperability", 
          description: "Cross-framework and cross-platform integration", 
          examples: ["Protocol Standardization", "API Compatibility", "Data Exchange", "Service Integration", "Legacy System Support"],
          icon: <Network className="w-4 h-4" />
        },
        { 
          name: "Code Safety", 
          description: "Security and safety in code generation", 
          examples: ["Sandboxing", "Code Review", "Static Analysis", "Runtime Monitoring", "Vulnerability Detection"],
          icon: <ShieldCheck className="w-4 h-4" />
        },
        { 
          name: "Rigid Architectures", 
          description: "Flexibility and adaptability challenges", 
          examples: ["Dynamic Reconfiguration", "Runtime Adaptation", "Emergent Behavior", "Self-Organization", "Evolutionary Design"],
          icon: <Wrench className="w-4 h-4" />
        }
      ]
    }
  }

  // Visual Taxonomy Component
  const TaxonomyVisualizer: React.FC<{ size?: number }> = ({ size = 480 }) => {
    const stage = Math.max(360, size)
    const center = stage / 2
    const distance = stage * 0.35
    const entries = Object.entries(taxonomyData)

    return (
      <div className="relative w-full bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-visible shadow-inner" style={{ height: stage }}>
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="relative" style={{ width: stage, height: stage }}>
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {entries.map(([key], index) => {
                const angle = (index * 2 * Math.PI) / entries.length - Math.PI / 2
                const x1 = center
                const y1 = center
                const x2 = center + Math.cos(angle) * distance
                const y2 = center + Math.sin(angle) * distance
                return (
                  <line
                    key={key}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-300 dark:text-gray-600"
                    strokeDasharray="6,3"
                  />
                )
              })}
            </svg>

            {/* Central Agentic AI Node */}
            <div className="absolute" style={{ left: center, top: center, transform: 'translate(-50%, -50%)' }}>
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 animate-pulse">
                <div className="text-white text-center">
                  <Brain className="w-8 h-8 mx-auto mb-1" />
                  <span className="text-sm font-bold">Agentic AI</span>
                </div>
              </div>
            </div>

            {/* Taxonomy Nodes */}
            {entries.map(([key, data], index) => {
              const angle = (index * 2 * Math.PI) / entries.length - Math.PI / 2
              const x = center + Math.cos(angle) * distance
              const y = center + Math.sin(angle) * distance
              return (
                <div
                  key={key}
                  className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20 ${selectedTaxonomyNode === key ? 'scale-110 z-10' : ''}`}
                  style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setSelectedTaxonomyNode(selectedTaxonomyNode === key ? null : key)}
                >
                  <div className={`w-20 h-20 rounded-lg shadow-lg border-2 border-white dark:border-gray-700 flex items-center justify-center ${data.color} hover:shadow-xl transition-shadow duration-300`}>
                    {data.icon}
                  </div>
                  <div className="text-sm font-semibold text-center mt-2 max-w-20 text-gray-700 dark:text-gray-300">
                    {data.title.split(' ')[0]}
                  </div>
                </div>
              )
            })}

            {/* Selected Node Details - Right side panel on large screens */}
            {selectedTaxonomyNode && (
              <div className="hidden lg:block absolute top-0 left-full ml-4 w-96 max-h-full overflow-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border-2 border-blue-200 dark:border-gray-600 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].icon}
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTaxonomyNode(null)}
                    className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    aria-label="Close details"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-3">
                  {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].categories.map((cat, idx) => (
                    <div key={idx} className="p-3 rounded-md border border-blue-100 dark:border-gray-700 bg-blue-50/50 dark:bg-gray-900/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        {cat.icon}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{cat.name}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{cat.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {cat.examples.slice(0, 4).map((ex, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-blue-200 dark:border-gray-600">
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Node Details - Bottom overlay on small/medium screens */}
            {selectedTaxonomyNode && (
              <div className="lg:hidden absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border-2 border-blue-200 dark:border-gray-600 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].icon}
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTaxonomyNode(null)}
                    className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    aria-label="Close details"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {taxonomyData[selectedTaxonomyNode as keyof typeof taxonomyData].categories.map((cat, idx) => (
                    <div key={idx} className="p-3 rounded-md border border-blue-100 dark:border-gray-700 bg-blue-50/50 dark:bg-gray-900/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        {cat.icon}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{cat.name}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{cat.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {cat.examples.slice(0, 4).map((ex, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-blue-200 dark:border-gray-600">
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Theme-aware D3 collapsible tree (simplified static expand) for taxonomy
  const D3TaxonomyTree: React.FC<{ height?: number; autoFitOnMount?: boolean }> = ({ height = 420, autoFitOnMount = false }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const rootRef = useRef<any>(null)
    const [version, setVersion] = useState(0)
  const rootGRef = useRef<SVGGElement | null>(null)
  const baseGRef = useRef<SVGGElement | null>(null)
  const zoomRef = useRef<any>(null)
  const didAutoFitRef = useRef(false)

    // Initialize hierarchy with collapsed children beyond depth 1
    useEffect(() => {
      const data: any = {
        name: "Agentic AI",
        children: Object.values(taxonomyData).map((section: any) => ({
          name: section.title,
          children: section.categories.map((c: any) => ({ name: c.name }))
        }))
      }
      const root: any = d3.hierarchy(data)
      root.x0 = 0
      root.y0 = 0
      let i = 0
      root.each((d: any) => (d.id = ++i))
      // collapse beyond depth 1
      root.children?.forEach((d: any) => {
        d._children = d.children
        d.children = null
      })
      rootRef.current = root
      setVersion(v => v + 1) // trigger first render
    }, [])

  // Draw / update on size or version changes
  useEffect(() => {
      if (!svgRef.current || !containerRef.current || !rootRef.current) return

      const root = rootRef.current
      const rect = containerRef.current.getBoundingClientRect()
      const width = Math.max(600, rect.width)
      const dx = 22
      const dy = Math.max(140, Math.min(220, width / 6))
      const tree = d3.tree().nodeSize([dx, dy]) as any
      tree(root)

      let x0 = Infinity
      let x1 = -Infinity
      root.each((d: any) => {
        if (d.x > x1) x1 = d.x
        if (d.x < x0) x0 = d.x
      })
      const innerHeight = x1 - x0 + dx * 2

  const svg = d3.select(svgRef.current as any)
  svg.selectAll('*').remove()
  svg
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', '100%')
        .attr('height', height)

  // zoom/pan group
  const rootG = svg.append('g')
  rootGRef.current = rootG.node() as SVGGElement
  const baseG = rootG.append('g')
  baseGRef.current = baseG.node() as SVGGElement

      // Links
      baseG.append('g')
        .attr('fill', 'none')
        .attr('stroke', 'currentColor')
        .attr('class', 'text-gray-400 dark:text-gray-600')
        .attr('stroke-opacity', 0.7)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', d3.linkHorizontal()
          .x((d: any) => d.y + 40)
          .y((d: any) => d.x - x0 + dx) as any)

      // Nodes
      const node = baseG.append('g')
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', (d: any) => `translate(${d.y + 40},${d.x - x0 + dx})`)
        .attr('cursor', 'pointer')
        .on('click', (_event: any, d: any) => {
          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }
          setVersion(v => v + 1)
        })

      node.append('circle')
        .attr('r', 5)
        .attr('fill', (d: any) => (d._children ? 'currentColor' : 'white'))
        .attr('stroke', 'currentColor')
        .attr('class', 'text-gray-400 dark:text-gray-600 stroke-gray-300 dark:stroke-gray-600')
        .attr('stroke-width', 1.5)

      node.append('text')
        .attr('dy', '0.32em')
        .attr('x', (d: any) => d.children || d._children ? -10 : 10)
        .attr('text-anchor', (d: any) => d.children || d._children ? 'end' : 'start')
        .attr('class', 'fill-gray-800 dark:fill-gray-200')
        .text((d: any) => d.data.name)

      // zoom behavior
  const zoom = d3.zoom().scaleExtent([0.5, 2.5]).on('zoom', (event: any) => {
        rootG.attr('transform', event.transform)
      })
  zoomRef.current = zoom
  svg.call(zoom as any)

      // Auto fit the content when requested (e.g., on fullscreen open)
      if (autoFitOnMount && !didAutoFitRef.current) {
        setTimeout(() => {
          fitToScreen()
          didAutoFitRef.current = true
        }, 100)
      }

      return () => {
        svg.selectAll('*').remove()
      }
  }, [height, version, autoFitOnMount])

    // Resize observer to trigger re-render
    useEffect(() => {
      if (!containerRef.current) return
      const ro = new ResizeObserver(() => setVersion(v => v + 1))
      ro.observe(containerRef.current)
      return () => ro.disconnect()
    }, [])

  // Controls: expand/collapse, fit/reset/zoom, export SVG/PNG
    const expandAll = () => {
      const root = rootRef.current
      const expand = (d: any) => {
        if (d._children) { d.children = d._children; d._children = null }
        if (d.children) d.children.forEach(expand)
      }
      expand(root); 
      setVersion(v => v + 1)
      
      // Auto-fit to screen after expansion with a small delay for DOM update
      setTimeout(() => {
        fitToScreen()
      }, 100)
    }
    const collapseAll = () => {
      const root = rootRef.current
      const collapse = (d: any) => {
        if (d.children) { d._children = d.children; d.children = null }
        if (d._children) d._children.forEach(collapse)
      }
      // keep root expanded
      root.children?.forEach(collapse)
      setVersion(v => v + 1)
    }
    const resetView = () => {
      if (!svgRef.current || !zoomRef.current) return
      const svg = d3.select(svgRef.current as any)
      svg.transition().duration(250).call(zoomRef.current.transform, d3.zoomIdentity)
    }

    const fitToScreen = () => {
      if (!svgRef.current || !zoomRef.current || !baseGRef.current) return
      
      // Wait a bit for any pending DOM updates
      setTimeout(() => {
        if (!svgRef.current || !zoomRef.current || !baseGRef.current) return
        
        const svgEl = svgRef.current
        const bbox = baseGRef.current.getBBox()
        const pad = 40
        const svgW = svgEl.clientWidth || svgEl.getBoundingClientRect().width
        const svgH = height
        
        if (!bbox || bbox.width === 0 || bbox.height === 0 || svgW === 0 || svgH === 0) {
          return
        }
        
        // Calculate scale to fit content with padding
        const scale = Math.min(
          (svgW - 2 * pad) / bbox.width,
          (svgH - 2 * pad) / bbox.height,
          1.5 // Maximum scale to prevent over-zooming on small trees
        )
        
        // Calculate translation to center the content
        const tx = svgW / 2 - scale * (bbox.x + bbox.width / 2)
        const ty = svgH / 2 - scale * (bbox.y + bbox.height / 2)
        
        // Apply the transform
        d3.select(svgEl).transition().duration(500).call(
          zoomRef.current.transform,
          d3.zoomIdentity.translate(tx, ty).scale(scale)
        )
      }, 50)
    }

    const zoomIn = () => {
      if (!svgRef.current || !zoomRef.current) return
      const svg = d3.select(svgRef.current as any)
      svg.transition().duration(150).call(zoomRef.current.scaleBy, 1.2)
    }

    const zoomOut = () => {
      if (!svgRef.current || !zoomRef.current) return
      const svg = d3.select(svgRef.current as any)
      svg.transition().duration(150).call(zoomRef.current.scaleBy, 1 / 1.2)
    }

    const download = (filename: string, blob: Blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }

    const exportSVG = () => {
      if (!svgRef.current) return
      
      // Create a clone to avoid modifying the original
      const svgEl = svgRef.current.cloneNode(true) as SVGSVGElement
      
      // Apply theme-aware inline styles to replace Tailwind classes
      const applyInlineStyles = (element: Element, isDark: boolean = false) => {
        // Handle stroke colors for links and outlines
        if (element.classList.contains('text-gray-400')) {
          (element as SVGElement).setAttribute('stroke', isDark ? '#6b7280' : '#9ca3af')
        }
        if (element.classList.contains('dark:text-gray-600')) {
          if (isDark) (element as SVGElement).setAttribute('stroke', '#4b5563')
        }
        if (element.classList.contains('stroke-gray-300')) {
          (element as SVGElement).setAttribute('stroke', isDark ? '#4b5563' : '#d1d5db')
        }
        if (element.classList.contains('dark:stroke-gray-600')) {
          if (isDark) (element as SVGElement).setAttribute('stroke', '#4b5563')
        }
        
        // Handle fill colors for text and shapes
        if (element.classList.contains('fill-gray-800')) {
          (element as SVGElement).setAttribute('fill', isDark ? '#e5e7eb' : '#1f2937')
        }
        if (element.classList.contains('dark:fill-gray-200')) {
          if (isDark) (element as SVGElement).setAttribute('fill', '#e5e7eb')
        }
        if (element.classList.contains('fill-white')) {
          (element as SVGElement).setAttribute('fill', '#ffffff')
        }
        if (element.classList.contains('dark:fill-gray-800')) {
          (element as SVGElement).setAttribute('fill', isDark ? '#1f2937' : '#ffffff')
        }
        
        // Remove the class attributes since we've applied inline styles
        element.removeAttribute('class')
        
        // Recursively apply to children
        Array.from(element.children).forEach(child => applyInlineStyles(child, isDark))
      }
      
      // Detect current theme from document
      const isDarkMode = document.documentElement.classList.contains('dark')
      applyInlineStyles(svgEl, isDarkMode)
      
      // Set proper bounding box and dimensions
      if (baseGRef.current) {
        const bbox = baseGRef.current.getBBox()
        const pad = 24
        svgEl.setAttribute('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + 2*pad} ${bbox.height + 2*pad}`)
        svgEl.setAttribute('width', String(Math.max(400, Math.floor(bbox.width + 2*pad))))
        svgEl.setAttribute('height', String(Math.max(300, Math.floor(bbox.height + 2*pad))))
      } else {
        // Fallback dimensions if baseGRef is not available
        svgEl.setAttribute('width', '800')
        svgEl.setAttribute('height', '600')
        svgEl.setAttribute('viewBox', '0 0 800 600')
      }
      
      // Ensure proper SVG namespace
      svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      svgEl.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      
      // Add background color based on theme
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      bgRect.setAttribute('width', '100%')
      bgRect.setAttribute('height', '100%')
      bgRect.setAttribute('fill', isDarkMode ? '#111827' : '#ffffff')
      svgEl.insertBefore(bgRect, svgEl.firstChild)
      
      // Serialize and download
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgEl)
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      download('agentic-ai-taxonomy-tree.svg', blob)
    }

    const exportPNG = () => {
      if (!svgRef.current) return
      
      // Create a clone and apply theme-aware styling (same as SVG export)
      const svgEl = svgRef.current.cloneNode(true) as SVGSVGElement
      
      // Apply theme-aware inline styles to replace Tailwind classes
      const applyInlineStyles = (element: Element, isDark: boolean = false) => {
        // Handle stroke colors for links and outlines
        if (element.classList.contains('text-gray-400')) {
          (element as SVGElement).setAttribute('stroke', isDark ? '#6b7280' : '#9ca3af')
        }
        if (element.classList.contains('dark:text-gray-600')) {
          if (isDark) (element as SVGElement).setAttribute('stroke', '#4b5563')
        }
        if (element.classList.contains('stroke-gray-300')) {
          (element as SVGElement).setAttribute('stroke', isDark ? '#4b5563' : '#d1d5db')
        }
        if (element.classList.contains('dark:stroke-gray-600')) {
          if (isDark) (element as SVGElement).setAttribute('stroke', '#4b5563')
        }
        
        // Handle fill colors for text and shapes
        if (element.classList.contains('fill-gray-800')) {
          (element as SVGElement).setAttribute('fill', isDark ? '#e5e7eb' : '#1f2937')
        }
        if (element.classList.contains('dark:fill-gray-200')) {
          if (isDark) (element as SVGElement).setAttribute('fill', '#e5e7eb')
        }
        if (element.classList.contains('fill-white')) {
          (element as SVGElement).setAttribute('fill', '#ffffff')
        }
        if (element.classList.contains('dark:fill-gray-800')) {
          (element as SVGElement).setAttribute('fill', isDark ? '#1f2937' : '#ffffff')
        }
        
        // Remove the class attributes since we've applied inline styles
        element.removeAttribute('class')
        
        // Recursively apply to children
        Array.from(element.children).forEach(child => applyInlineStyles(child, isDark))
      }
      
      // Detect current theme
      const isDarkMode = document.documentElement.classList.contains('dark')
      applyInlineStyles(svgEl, isDarkMode)
      
      // Set dimensions
      if (baseGRef.current) {
        const bbox = baseGRef.current.getBBox()
        const pad = 24
        svgEl.setAttribute('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + 2*pad} ${bbox.height + 2*pad}`)
        svgEl.setAttribute('width', String(Math.max(400, Math.floor(bbox.width + 2*pad))))
        svgEl.setAttribute('height', String(Math.max(300, Math.floor(bbox.height + 2*pad))))
      } else {
        svgEl.setAttribute('width', '800')
        svgEl.setAttribute('height', '600')
        svgEl.setAttribute('viewBox', '0 0 800 600')
      }
      
      svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      
      // Add background
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      bgRect.setAttribute('width', '100%')
      bgRect.setAttribute('height', '100%')
      bgRect.setAttribute('fill', isDarkMode ? '#111827' : '#ffffff')
      svgEl.insertBefore(bgRect, svgEl.firstChild)
      
      const serializer = new XMLSerializer()
      const source = serializer.serializeToString(svgEl)
      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      const img = new Image()
      img.onload = () => {
        try {
          let w = 800
          let h = 600
          if (baseGRef.current) {
            const bbox = baseGRef.current.getBBox()
            const pad = 24
            w = Math.max(400, Math.floor(bbox.width + 2*pad))
            h = Math.max(300, Math.floor(bbox.height + 2*pad))
          }
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d')!
          const isDark = document.documentElement.classList.contains('dark')
          ctx.fillStyle = isDark ? '#111827' : '#ffffff'
          ctx.fillRect(0, 0, w, h)
          ctx.drawImage(img, 0, 0, w, h)
          canvas.toBlob((blob) => { if (blob) download('agentic-ai-taxonomy-tree.png', blob) }, 'image/png')
        } finally {
          URL.revokeObjectURL(url)
        }
      }
      img.onerror = () => URL.revokeObjectURL(url)
      img.src = url
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={exportSVG}>Export SVG</Button>
          <Button variant="outline" size="sm" onClick={exportPNG}>Export PNG</Button>
          <Button variant="outline" size="sm" onClick={expandAll}>Expand all</Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>Collapse all</Button>
          <Button variant="outline" size="sm" onClick={fitToScreen}>Fit to screen</Button>
          <Button variant="outline" size="sm" onClick={resetView}>Reset view</Button>
          <Button variant="outline" size="sm" onClick={zoomOut} aria-label="Zoom out">
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={zoomIn} aria-label="Zoom in">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div ref={containerRef} className="w-full overflow-auto">
          <svg ref={svgRef} className="w-full" style={{ height }} />
        </div>
      </div>
    )
  }

  // Enhanced content sections
  const frameworkComparisons = [
    {
      name: "Semantic Kernel",
      strengths: ["Enterprise integration", "Plugin ecosystem", "Memory management"],
      useCases: ["Enterprise apps", "Skill orchestration", "Knowledge work"],
      architecture: "Plugin-based"
    },
    {
      name: "AutoGen",
      strengths: ["Multi-agent conversations", "Code generation", "Debugging"],
      useCases: ["Software development", "Code review", "Problem solving"],
      architecture: "Conversational"
    },
    {
      name: "OpenAI SDK",
      strengths: ["Native GPT integration", "Function calling", "Assistant API"],
      useCases: ["AI assistants", "Function execution", "Tool integration"],
      architecture: "API-driven"
    },
    {
      name: "Google ADK",
      strengths: ["Gemini integration", "Multi-modal agents", "Google ecosystem"],
      useCases: ["Multi-modal AI", "Google services", "Enterprise solutions"],
      architecture: "Platform-native"
    },
    {
      name: "LangGraph",
      strengths: ["Graph workflows", "State management", "Conditional logic"],
      useCases: ["Complex workflows", "Decision trees", "Multi-step processes"],
      architecture: "Graph-based"
    },
    {
      name: "CrewAI",
      strengths: ["Role-based agents", "Sequential workflows", "Easy setup"],
      useCases: ["Business automation", "Content creation", "Research tasks"],
      architecture: "Workflow-oriented"
    }
  ]

  const communicationProtocols = [
    {
      protocol: "MCP (Model Context Protocol)",
      description: "Secure tool integration with standardized interfaces",
      features: ["Tool discovery", "Secure execution", "Context sharing"],
      status: "Emerging"
    },
    {
      protocol: "A2A (Agent-to-Agent)",
      description: "Direct agent communication with semantic understanding",
      features: ["Goal-oriented messaging", "Semantic protocols", "Task coordination"],
      status: "Development"
    },
    {
      protocol: "ACP (Agent Communication Protocol)",
      description: "Enterprise-grade agent orchestration and management",
      features: ["Orchestration", "Monitoring", "Governance"],
      status: "Specification"
    },
    {
      protocol: "Agora Protocol",
      description: "Decentralized agent marketplace and discovery",
      features: ["Agent discovery", "Capability matching", "Marketplace"],
      status: "Research"
    }
  ]

  const challenges = [
    {
      challenge: "Scalability",
      description: "Managing large numbers of agents efficiently across distributed systems",
      icon: <Graph className="w-4 h-4" />,
      solutions: ["Hierarchical Organization", "Load Balancing", "Resource Pooling", "Horizontal Scaling", "Performance Optimization"],
      impact: "High",
      difficulty: "Complex"
    },
    {
      challenge: "Interoperability", 
      description: "Ensuring agents from different frameworks can collaborate seamlessly",
      icon: <Network className="w-4 h-4" />,
      solutions: ["Standard Protocols", "API Gateways", "Message Brokers", "Service Mesh", "Protocol Translation"],
      impact: "Critical",
      difficulty: "Very Complex"
    },
    {
      challenge: "Code Safety",
      description: "Preventing harmful or malicious code execution in agent-generated code",
      icon: <Shield className="w-4 h-4" />,
      solutions: ["Sandboxing", "Code Review", "Permission Systems", "Static Analysis", "Runtime Monitoring"],
      impact: "Critical",
      difficulty: "Complex"
    },
    {
      challenge: "Rigid Architectures",
      description: "Overcoming inflexible system designs that limit agent adaptability",
      icon: <Code className="w-4 h-4" />,
      solutions: ["Dynamic Workflows", "Plugin Systems", "Adaptive Architectures", "Runtime Reconfiguration", "Emergent Design"],
      impact: "Medium",
      difficulty: "Moderate"
    },
    {
      challenge: "Runtime Discovery",
      description: "Agents cannot dynamically discover and collaborate with peers",
      icon: <Eye className="w-4 h-4" />,
      solutions: ["Service Discovery", "Agent Registries", "Capability Matching", "Dynamic Binding", "Registry Services"],
      impact: "High",
      difficulty: "Complex"
    },
    {
      challenge: "Communication Fragmentation",
      description: "Lack of universally adopted standards limits agent ecosystem growth",
      icon: <ArrowsHorizontal className="w-4 h-4" />,
      solutions: ["Protocol Standardization", "Universal Messaging", "Semantic Interoperability", "Standard APIs", "Common Vocabularies"],
      impact: "High",
      difficulty: "Very Complex"
    }
  ]

  const serviceOrientedFeatures = [
    {
      feature: "W3C Specifications",
      description: "Adherence to web standards for interoperability",
      icon: <Globe className="w-4 h-4" />
    },
    {
      feature: "Intelligence Orchestration",
      description: "Coordinating multiple AI services and agents",
      icon: <Brain className="w-4 h-4" />
    },
    {
      feature: "RESTful Exposure",
      description: "Standard API interfaces for agent services",
      icon: <Network className="w-4 h-4" />
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="relative text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full">
          <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Design Taxonomy</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
          Agentic AI Design Taxonomy
          <AskAIButton 
            title="Agentic AI Design Taxonomy" 
            description="A comprehensive framework for understanding the architectural patterns, design principles, and implementation challenges in Agentic AI systems."
            size="xs"
            visual="subtle"
            iconOnly
            hideHotkeyHint
          />
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A comprehensive framework for understanding the architectural patterns, design principles, and implementation challenges in Agentic AI systems.
        </p>
        <div className="flex items-center gap-4 justify-center">
          <Progress value={progress} className="w-48" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {completedSections.size} / 5 sections completed
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visual">Visual Map</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="future">Future</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                What is Agentic AI?
              </CardTitle>
              <CardDescription>
                Autonomous, goal-driven systems that plan, act, and learn—often through multi-agent collaboration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Robot className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Autonomy</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Agents can make independent decisions based on goals and context
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Multi-Agent Coordination</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Collaborative problem-solving through agent communication
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Contextual Memory</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Persistent memory systems for learning and adaptation
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gear className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Tool Integration</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Seamless integration with external tools, APIs, and services through protocols like MCP
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Framework Landscape</CardTitle>
              <CardDescription>
                Leading Agentic AI frameworks and the architectural patterns they emphasize
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frameworkComparisons.map((framework, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{framework.name}</h3>
                      <Badge variant="outline">{framework.architecture}</Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Strengths</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {framework.strengths.map((strength, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">Use Cases</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {framework.useCases.map((useCase, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={() => markSectionComplete("overview")}
                className="w-full"
                disabled={completedSections.has("overview")}
              >
                {completedSections.has("overview") ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Section Completed
                  </>
                ) : (
                  "Mark Section Complete"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Taxonomy Visualizer</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsVisualFullscreen(true)}>
                <ArrowsOutSimple className="w-4 h-4 mr-2" /> Expand
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <TaxonomyVisualizer size={480} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Collapsible Tree</CardTitle>
                <CardDescription>Theme-aware D3 tree view of the taxonomy</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsTreeFullscreen(true)}>
                <ArrowsOutSimple className="w-4 h-4 mr-2" /> Expand
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <D3TaxonomyTree height={420} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Deep Dive: Full Taxonomy Tree</CardTitle>
                <CardDescription>Opens in a dedicated tab for better performance and full visibility</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href="/deep-dive-taxonomy" target="_blank" rel="noopener noreferrer">
                  <ArrowsOutSimple className="w-4 h-4 mr-2" /> Open in New Tab
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">The deep-dive visualization is heavy and now loads in its own window to avoid memory issues and ensure the entire tree can be fit-to-screen.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={() => markSectionComplete("visual")}
                className="w-full"
                disabled={completedSections.has("visual")}
              >
                {completedSections.has("visual") ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Visual Map Explored
                  </>
                ) : (
                  "Complete Visual Exploration"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxonomy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(taxonomyData).map(([key, data]) => (
              <Card key={key} className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {data.icon}
                    {data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={data.color}>
                          {category.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.examples.map((example, exIndex) => (
                          <Badge key={exIndex} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                      {index < data.categories.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={() => markSectionComplete("taxonomy")}
                className="w-full"
                disabled={completedSections.has("taxonomy")}
              >
                {completedSections.has("taxonomy") ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Taxonomy Reviewed
                  </>
                ) : (
                  "Complete Taxonomy Review"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5" />
                Challenges & Potential Opportunities
              </CardTitle>
              <CardDescription>
                Key friction points today—and opportunity areas where design choices can unlock value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className="font-medium">{item.challenge}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">Solutions:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.solutions.map((solution, sIndex) => (
                          <Badge key={sIndex} variant="secondary" className="text-xs">
                            {solution}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service-Oriented Agent Integration</CardTitle>
              <CardDescription>
                Moving towards standardized, interoperable agent ecosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceOrientedFeatures.map((feature, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center space-y-2">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="font-medium">{feature.feature}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={() => markSectionComplete("challenges")}
                className="w-full"
                disabled={completedSections.has("challenges")}
              >
                {completedSections.has("challenges") ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Challenges Understood
                  </>
                ) : (
                  "Complete Challenges Review"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="future" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Communication Evolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-medium">Next-Generation Protocols</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                    <span><strong>MCP (Model Context Protocol):</strong> Secure tool integration with standardized interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                    <span><strong>A2A (Agent-to-Agent):</strong> Direct agent communication with semantic understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                    <span><strong>ACP (Agent Communication Protocol):</strong> Enterprise-grade agent orchestration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                    <span><strong>Agora Protocol:</strong> Decentralized agent marketplace and discovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stack className="w-5 h-5" />
                  Framework Evolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-medium">Leading Frameworks</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-sm">CrewAI & LangGraph</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Business automation, risk management, workflow orchestration
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-sm">AutoGen & MetaGPT</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Multi-agent collaboration, code generation, software development
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-sm">Semantic Kernel & Google ADK</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Enterprise integration, adaptive assistants, scalable orchestration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Critical Success Factors</CardTitle>
              <CardDescription>
                High-impact areas that will determine the future success of Agentic AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="font-medium">Standardization</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Universal protocols for agent communication and interoperability
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Code className="w-6 h-6 text-green-600" />
                  <h3 className="font-medium">Safety & Ethics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Robust guardrails and ethical frameworks for responsible AI
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Graph className="w-6 h-6 text-purple-600" />
                  <h3 className="font-medium">Scalability</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Efficient orchestration of large-scale multi-agent systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={() => markSectionComplete("future")}
                className="w-full"
                disabled={completedSections.has("future")}
              >
                {completedSections.has("future") ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Future Directions Explored
                  </>
                ) : (
                  "Complete Future Directions"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fullscreen dialogs */}
      <Dialog open={isVisualFullscreen} onOpenChange={setIsVisualFullscreen}>
        <DialogContent className="max-w-[98vw] w-[98vw] h-[92vh] sm:max-w-[98vw] p-4">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Taxonomy Visualizer</DialogTitle>
            <Button variant="outline" size="sm" onClick={() => setIsVisualFullscreen(false)}>
              <ArrowsInSimple className="w-4 h-4 mr-2" /> Close
            </Button>
          </DialogHeader>
          <div className="w-full h-[84vh] overflow-auto">
            <TaxonomyVisualizer size={1000} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTreeFullscreen} onOpenChange={setIsTreeFullscreen}>
        <DialogContent className="max-w-[98vw] w-[98vw] h-[92vh] sm:max-w-[98vw] p-4">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Collapsible Tree</DialogTitle>
            <Button variant="outline" size="sm" onClick={() => setIsTreeFullscreen(false)}>
              <ArrowsInSimple className="w-4 h-4 mr-2" /> Close
            </Button>
          </DialogHeader>
          <div className="w-full h-[84vh] overflow-auto">
            <D3TaxonomyTree height={Math.floor(window.innerHeight * 0.80)} autoFitOnMount />
          </div>
        </DialogContent>
      </Dialog>

  {/* Deep dive moved to its own route: /deep-dive-taxonomy */}

      {/* Navigation */}
      {progress === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                Taxonomy Mastered!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                You've completed the Agentic AI Design Taxonomy. Ready to explore specific implementation patterns?
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => onNavigateToNext?.('ai-agents')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Explore AI Agents →
                </Button>
                <Button 
                  onClick={() => onNavigateToNext?.('multi-agent-systems')}
                  variant="outline"
                >
                  Multi-Agent Systems →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AgenticAIDesignTaxonomy