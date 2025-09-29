import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DeepDiveProps = {
  height?: number
  autoFitOnMount?: boolean
}

// Theme-aware palette using Tailwind-like hexes
function getPalette(isDark: boolean) {
  if (isDark) {
    return [
      "#334155", // slate-700
      "#4338ca", // indigo-700
      "#65a30d", // lime-600
      "#b91c1c", // red-700
      "#b45309", // amber-700
      "#0ea5e9", // sky-500
      "#7c3aed", // violet-600
    ]
  }
  return [
    "#e2e8f0", // slate-200
    "#c7d2fe", // indigo-200
    "#bef264", // lime-300
    "#fca5a5", // red-300
    "#fcd34d", // amber-300
    "#a5f3fc", // sky-300
    "#d8b4fe", // violet-300
  ]
}

// Deeper Agentic AI taxonomy (based on provided JSX), trimmed to essentials
const taxonomy = {
  name: "Agentic AI",
  children: [
    {
      name: "Agent Patterns",
      children: [
        { name: "Role-based agents", children: [
          { name: "Planner" },
          { name: "Executor" },
          { name: "Critic / Reviewer" },
          { name: "Tool Operator" },
        ]},
        { name: "Behavior patterns", children: [
          { name: "Reactive" },
          { name: "Proactive" },
          { name: "Goal-oriented" },
        ]},
        { name: "Planning", children: [
          { name: "Hierarchical planning" },
          { name: "Multi-step reasoning" },
          { name: "Tree / Graph search" },
        ]},
        { name: "Learning mechanisms", children: [
          { name: "Reinforcement learning" },
          { name: "Few/Zero-shot learning" },
          { name: "Meta-learning" },
        ]},
      ],
    },
    {
      name: "Interaction Protocols",
      children: [
        { name: "Communication standards", children: [
          { name: "JSON-RPC" },
          { name: "REST APIs" },
          { name: "WebSocket" },
          { name: "GraphQL" },
        ]},
        { name: "Task sharing", children: [
          { name: "Work queues" },
          { name: "Load balancing" },
          { name: "Consensus (RAFT/Paxos)" },
        ]},
        { name: "Message passing", children: [
          { name: "Async messaging" },
          { name: "Event streams" },
          { name: "Pub/Sub" },
          { name: "Kafka pipelines" },
        ]},
        { name: "Collaboration models", children: [
          { name: "Negotiation" },
          { name: "Voting" },
          { name: "Coalitions" },
        ]},
      ],
    },
    {
      name: "Framework Architectures",
      children: [
        { name: "Graph-based", children: [
          { name: "LangGraph" },
          { name: "StateGraph" },
          { name: "Workflow DAGs" },
        ]},
        { name: "Workflow oriented", children: [
          { name: "CrewAI" },
          { name: "AutoGen" },
          { name: "Sequential Chains" },
        ]},
        { name: "Modular", children: [
          { name: "Plugin systems" },
          { name: "Microservices" },
          { name: "Composable agents" },
        ]},
        { name: "Hybrid models", children: [
          { name: "Symbolic + LLM" },
        ]},
        { name: "Execution environments", children: [
          { name: "Serverless agents" },
          { name: "Docker/K8s" },
        ]},
      ],
    },
    {
      name: "Models & Safety",
      children: [
        { name: "Language models", children: [
          { name: "GPT-4 / o-series" },
          { name: "Claude" },
          { name: "Gemini" },
          { name: "LLaMA 3" },
        ]},
        { name: "Embedding models", children: [
          { name: "text-embedding-3-large" },
          { name: "Sentence Transformers" },
          { name: "Cohere Embeddings" },
        ]},
        { name: "Memory models", children: [
          { name: "Vector stores (FAISS/Pinecone/Weaviate)" },
          { name: "Knowledge graphs" },
        ]},
        { name: "Safety & Guardrails", children: [
          { name: "Input validation" },
          { name: "Output filtering" },
          { name: "Fact-checking" },
          { name: "Ethical constraints" },
          { name: "Constitutional AI" },
        ]},
        { name: "Tool integration", children: [
          { name: "Retrieval (RAG)" },
          { name: "Code execution" },
          { name: "External APIs" },
        ]},
      ],
    },
    {
      name: "Memory Systems",
      children: [
        { name: "Short-term", children: [
          { name: "Context buffers" },
          { name: "Session state" },
        ]},
        { name: "Long-term", children: [
          { name: "Knowledge base" },
          { name: "Experience bank" },
          { name: "User profiles" },
        ]},
        { name: "Episodic", children: [
          { name: "Conversation history" },
          { name: "Decision logs" },
          { name: "Task outcomes" },
        ]},
        { name: "Semantic", children: [
          { name: "Concept maps" },
          { name: "Ontologies" },
          { name: "Fact databases" },
        ]},
        { name: "Working memory augmentation", children: [
          { name: "Scratchpads" },
          { name: "Vector-DB prompts" },
        ]},
      ],
    },
    {
      name: "Applications & Use Cases",
      children: [
        { name: "Customer support", children: [
          { name: "Chatbots" },
          { name: "Ticket triage" },
          { name: "Troubleshooting" },
        ]},
        { name: "Content generation", children: [
          { name: "Writing assistants" },
          { name: "Code generation" },
          { name: "Design co-pilots" },
        ]},
        { name: "Process automation", children: [
          { name: "Workflow automation" },
          { name: "Document processing" },
          { name: "Data pipelines" },
        ]},
        { name: "Research & analysis", children: [
          { name: "Market research" },
          { name: "Financial analysis" },
          { name: "Legal assistants" },
        ]},
        { name: "Healthcare", children: [
          { name: "Virtual health assistants" },
          { name: "Diagnostic support" },
          { name: "Personalized care" },
        ]},
        { name: "Education", children: [
          { name: "AI tutors" },
          { name: "Adaptive learning" },
          { name: "Curriculum agents" },
        ]},
      ],
    },
    {
      name: "Challenges & Opportunities",
      children: [
        { name: "Scalability" },
        { name: "Interoperability (open agent protocols)" },
        { name: "Code safety & reliability" },
        { name: "Composable ecosystems" },
        { name: "Ethical governance & auditability" },
        { name: "Human–AI collaboration" },
      ],
    },
  ],
} as const

// Helper: collapse all children of a node
function collapseNode(d: any) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapseNode)
    d.children = null
  }
}

export default function DeepDiveAgenticAITaxonomyTree({ height = 800, autoFitOnMount = false }: DeepDiveProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [version, setVersion] = useState(0)
  const baseGRef = useRef<SVGGElement | null>(null)
  const rootGRef = useRef<SVGGElement | null>(null)
  const zoomRef = useRef<d3.ZoomBehavior<Element, unknown> | null>(null)
  const didAutoFitRef = useRef(false)
  const rootRef = useRef<any>(null)
  const matchedNamesRef = useRef<Set<string>>(new Set())
  const [query, setQuery] = useState("")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isDark = document.documentElement.classList.contains('dark')
    const palette = getPalette(isDark)

    // cleanup
    d3.select(container).selectAll('svg').remove()
    d3.select(container).selectAll('div.tooltip').remove()

  const margin = { top: 20, right: 40, bottom: 20, left: 40 }
  const width = container.clientWidth || 1200
  const svg = d3
      .select(container)
      .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')
  .style('max-height', `${height}px`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .classed('rounded-xl bg-white dark:bg-neutral-900', true)
  svgRef.current = svg.node() as SVGSVGElement

    // An invisible overlay to improve panning behavior anywhere in the canvas
    svg
      .append('rect')
      .attr('class', 'pan-overlay')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .style('cursor', 'grab')

    const gRoot = svg.append('g')
  rootGRef.current = gRoot.node() as SVGGElement
    const g = gRoot.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    baseGRef.current = g.node() as SVGGElement

    // zoom/pan
    const zoomed = (event: any) => {
      gRoot.attr('transform', event.transform)
    }
  const zoom = d3.zoom().scaleExtent([0.5, 2.5]).on('zoom', zoomed)
    zoomRef.current = zoom as any
  svg.call(zoom as any)
  ;(zoom as any).on('start', () => d3.select(container).select('.pan-overlay').style('cursor', 'grabbing'))
          .on('end',   () => d3.select(container).select('.pan-overlay').style('cursor', 'grab'))

    // tooltip
    const tooltip = d3
      .select(container)
      .append('div')
      .attr('class', 'tooltip pointer-events-none absolute p-2 text-xs bg-black/80 text-white rounded-md hidden z-50')

    // hierarchy
  const root: any = d3.hierarchy(taxonomy as any)
  root.x0 = height / 2
  root.y0 = 0
    // Collapse all but root children for nicer first view
    root.children?.forEach((d: any) => {
      // expand one level by default
      if (d.children) {
        d.children.forEach((child: any) => collapseNode(child))
      }
    })
  rootRef.current = root

    const treeLayout = d3.tree().nodeSize([36, 240]) as any
    const linkPath: any = d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x)

    function colorByDepth(depth: number) {
      return palette[depth % palette.length]
    }

  function update(source: any) {
      treeLayout(root)
      const nodes = root.descendants()
      const links = root.links()

      nodes.forEach((d: any) => (d.y = d.depth * 220))

      // nodes
      const node = g.selectAll('g.node').data(nodes, (d: any) => d.id || (d.id = crypto.randomUUID()))
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('cursor', 'pointer')
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .on('click', (_event: any, d: any) => {
          d.children = d.children ? null : d._children
          d._children = d.children ? null : d._children // toggle
          update(d)
        })
        .on('mousemove', (event: any, d: any) => {
          (tooltip as any)
            .style('left', event.offsetX + 16 + 'px')
            .style('top', event.offsetY + 16 + 'px')
            .classed('hidden', false)
            .text(d.data.description || d.data.name)
        })
        .on('mouseleave', () => (tooltip as any).classed('hidden', true))

      nodeEnter
        .append('rect')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('width', (d: any) => (d.children || d._children ? 220 : 200))
        .attr('height', 28)
        .attr('x', -8)
        .attr('y', -14)
        .attr('fill', (d: any) => colorByDepth(d.depth))
        .attr('stroke', (d: any) => (matchedNamesRef.current.has(String(d.data.name).toLowerCase()) ? '#22c55e' : (d3.color(colorByDepth(d.depth))?.darker(0.6) as any)))
        .attr('stroke-width', (d: any) => (matchedNamesRef.current.has(String(d.data.name).toLowerCase()) ? 2 : 1.2))
        .attr('opacity', 0.92)

      nodeEnter
        .append('text')
        .attr('dy', '0.32em')
        .attr('x', 6)
        .attr('class', 'font-medium text-xs fill-gray-900 dark:fill-gray-100')
        .text((d: any) => d.data.name)
        .call(wrapText as any, 200)

      const nodeUpdate = nodeEnter.merge(node as any)
      nodeUpdate
        .transition()
        .duration(450)
        .attr('transform', (d: any) => `translate(${d.y},${d.x})`)

      // re-apply highlight on update
      nodeUpdate.select('rect')
        .attr('stroke', (d: any) => (matchedNamesRef.current.has(String(d.data.name).toLowerCase()) ? '#22c55e' : (d3.color(colorByDepth(d.depth))?.darker(0.6) as any)))
        .attr('stroke-width', (d: any) => (matchedNamesRef.current.has(String(d.data.name).toLowerCase()) ? 2 : 1.2))

      // EXIT
      node
        .exit()
        .transition()
        .duration(400)
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove()

      // links
      const link = g.selectAll('path.link').data(links, (d: any) => d.target.id)
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link text-gray-400 dark:text-gray-600')
        .attr('d', linkPath)
        .attr('fill', 'none')
        .attr('stroke', 'currentColor')
        .attr('stroke-opacity', 0.7)
        .attr('stroke-width', 1.2)

      linkEnter.merge(link as any).transition().duration(450).attr('d', linkPath)

      link
        .exit()
        .transition()
        .duration(400)
        .attr('d', () => linkPath({ source: { x: source.x, y: source.y }, target: { x: source.x, y: source.y } }))
        .remove()

      nodes.forEach((d: any) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    function wrapText(textSelection: any, width: number) {
      textSelection.each(function () {
        const text = d3.select(this)
        const words = (text.text() as string).split(/\s+/).reverse()
        let line: string[] = []
        let lineNumber = 0
        const lineHeight = 1.2
        const y = text.attr('y')
        const x = text.attr('x')
        const dy = parseFloat(text.attr('dy'))
        let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em')
        let word: string | undefined
        while ((word = words.pop())) {
          line.push(word)
          tspan.text(line.join(' '))
          if ((tspan.node() as SVGTextContentElement).getComputedTextLength() > width) {
            line.pop()
            tspan.text(line.join(' '))
            line = [word]
            tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
          }
        }
      })
    }

    function collapse(d: any) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

  update(root)

    // Always center the tree properly after initial render
    setTimeout(() => {
      if (!rootGRef.current || !svgRef.current || !zoomRef.current) return
      
      const svgEl = svgRef.current
      const bbox = rootGRef.current.getBBox()
      const svgW = svgEl.clientWidth || svgEl.getBoundingClientRect().width
      const svgH = height
      
      if (bbox && bbox.width > 0 && bbox.height > 0 && svgW > 0 && svgH > 0) {
        if (autoFitOnMount) {
          // Auto-fit with proper scaling
          const pad = 60
          const scale = Math.min((svgW - 2 * pad) / bbox.width, (svgH - 2 * pad) / bbox.height)
          const tx = svgW / 2 - scale * (bbox.x + bbox.width / 2)
          const ty = svgH / 2 - scale * (bbox.y + bbox.height / 2)
          d3.select(svgEl).transition().duration(300).call((zoomRef.current as any).transform, d3.zoomIdentity.translate(tx, ty).scale(scale))
        } else {
          // Just center without scaling
          const tx = svgW / 2 - (bbox.x + bbox.width / 2)
          const ty = svgH / 2 - (bbox.y + bbox.height / 2)
          d3.select(svgEl).call((zoomRef.current as any).transform, d3.zoomIdentity.translate(tx, ty))
        }
        didAutoFitRef.current = true
      }
    }, 150)

    const ro = new ResizeObserver(() => setVersion(v => v + 1))
    ro.observe(container)
    return () => {
      ro.disconnect()
      d3.select(container).selectAll('svg').remove()
      d3.select(container).selectAll('div.tooltip').remove()
    }
  }, [height, version, autoFitOnMount])

  // Controls
  const expandAll = () => {
    const root = rootRef.current
    if (!root) return
    const expand = (d: any) => {
      if (d._children) { d.children = d._children; d._children = null }
      if (d.children) d.children.forEach(expand)
    }
    expand(root)
    setVersion(v => v + 1)
  }

  const collapseAll = () => {
    const root = rootRef.current
    if (!root) return
    const collapse = (d: any) => {
      if (d.children) { d._children = d.children; d.children = null }
      if (d._children) d._children.forEach(collapse)
    }
    root.children?.forEach(collapse) // keep root visible
    setVersion(v => v + 1)
  }

  const resetView = () => {
    if (!svgRef.current || !zoomRef.current) return
    const svg = d3.select(svgRef.current as any)
    svg.transition().duration(250).call((zoomRef.current as any).transform, d3.zoomIdentity)
  }

  const fitToScreen = () => {
    if (!svgRef.current || !zoomRef.current || !rootGRef.current) return
    const svgEl = svgRef.current
    const bbox = rootGRef.current.getBBox()
    const pad = 60  // Increased padding to ensure content doesn't touch edges
    const svgW = svgEl.clientWidth || svgEl.getBoundingClientRect().width
    const svgH = svgEl.clientHeight || height
    if (!bbox || bbox.width === 0 || bbox.height === 0 || svgW === 0 || svgH === 0) return
    const scale = Math.min((svgW - 2 * pad) / bbox.width, (svgH - 2 * pad) / bbox.height)
    const tx = svgW / 2 - scale * (bbox.x + bbox.width / 2)
    const ty = svgH / 2 - scale * (bbox.y + bbox.height / 2)
    d3.select(svgEl).transition().duration(300).call((zoomRef.current as any).transform, d3.zoomIdentity.translate(tx, ty).scale(scale))
  }

  const zoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return
    const svg = d3.select(svgRef.current as any)
    svg.transition().duration(150).call((zoomRef.current as any).scaleBy, 1.2)
  }

  const zoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return
    const svg = d3.select(svgRef.current as any)
    svg.transition().duration(150).call((zoomRef.current as any).scaleBy, 1 / 1.2)
  }

  const centerRoot = () => {
    if (!svgRef.current || !zoomRef.current) return
    const svgEl = svgRef.current
    const svgW = svgEl.clientWidth || svgEl.getBoundingClientRect().width
    const svgH = svgEl.clientHeight || height
    const current = (d3.zoomTransform(svgEl as any) as any).k || 1
    // Root logical coords after margin translation are roughly x = height/2, y = 0; use bbox center as safer target
    const bbox = rootGRef.current?.getBBox()
    const cx = bbox ? (bbox.x + bbox.width / 2) : 0
    const cy = bbox ? (bbox.y + bbox.height / 2) : (height / 2)
    const tx = svgW / 2 - current * cx
    const ty = svgH / 2 - current * cy
    d3.select(svgEl).transition().duration(250).call((zoomRef.current as any).transform, d3.zoomIdentity.translate(tx, ty).scale(current))
  }

  // Export helpers
  function download(filename: string, blob: Blob) {
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
    const svgEl = svgRef.current.cloneNode(true) as SVGSVGElement
    // Fit export to content bbox (use root group for margins included)
    if (rootGRef.current) {
      const bbox = rootGRef.current.getBBox()
      const pad = 24
      svgEl.setAttribute('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + 2*pad} ${bbox.height + 2*pad}`)
      svgEl.setAttribute('width', String(Math.max(1, Math.floor(bbox.width + 2*pad))))
      svgEl.setAttribute('height', String(Math.max(1, Math.floor(bbox.height + 2*pad))))
    }
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgEl)
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    download('agentic-ai-taxonomy-deep-dive.svg', blob)
  }

  const exportPNG = () => {
    if (!svgRef.current) return
    // Clone and crop to content bbox like SVG export
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement
    let w = svgRef.current.clientWidth
    let h = svgRef.current.clientHeight
    if (rootGRef.current) {
      const bbox = rootGRef.current.getBBox()
      const pad = 24
      svgClone.setAttribute('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + 2*pad} ${bbox.height + 2*pad}`)
      w = Math.max(1, Math.floor(bbox.width + 2*pad))
      h = Math.max(1, Math.floor(bbox.height + 2*pad))
      svgClone.setAttribute('width', String(w))
      svgClone.setAttribute('height', String(h))
    }
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svgClone)
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')!
        // background to improve readability in dark mode
        const isDark = document.documentElement.classList.contains('dark')
        ctx.fillStyle = isDark ? '#111827' : '#ffffff'
        ctx.fillRect(0, 0, w, h)
        // draw cloned, cropped SVG to canvas 1:1
        ctx.drawImage(img, 0, 0, w, h)
        canvas.toBlob((blob) => {
          if (blob) download('agentic-ai-taxonomy-deep-dive.png', blob)
        }, 'image/png')
      } finally {
        URL.revokeObjectURL(url)
      }
    }
    img.onerror = () => URL.revokeObjectURL(url)
    img.src = url
  }

  const executeSearch = () => {
    const q = query.trim().toLowerCase()
    matchedNamesRef.current = new Set()
    if (!q) { setVersion(v => v + 1); return }
    const root = rootRef.current
    if (!root) return
    const matches: any[] = []
    root.each((d: any) => {
      if (String(d.data.name).toLowerCase().includes(q)) {
        matchedNamesRef.current.add(String(d.data.name).toLowerCase())
        matches.push(d)
      }
    })
    // Reveal the path to the first match so it becomes visible
    if (matches.length) {
      let node: any = matches[0]
      while (node) {
        if (node._children) {
          node.children = node._children
          node._children = null
        }
        node = node.parent
      }
    }
    setVersion(v => v + 1)
    if (matches.length && svgRef.current && zoomRef.current) {
      const target = matches[0]
      const svgEl = svgRef.current
      const svgW = svgEl.clientWidth || svgEl.getBoundingClientRect().width
      const svgH = svgEl.clientHeight || height
      const current = (d3.zoomTransform(svgEl as any) as any).k || 1
      const x = target.y
      const y = target.x
      const tx = svgW / 2 - current * (x)
      const ty = svgH / 2 - current * (y)
      d3.select(svgEl).transition().duration(300).call((zoomRef.current as any).transform, d3.zoomIdentity.translate(tx, ty).scale(current))
    }
  }

  const clearSearch = () => {
    matchedNamesRef.current = new Set()
    setQuery("")
    setVersion(v => v + 1)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-2">
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={(e) => { if (e.key === 'Enter') executeSearch() }}
          placeholder="Search nodes" 
          className="w-48" 
        />
  <Button variant="outline" size="sm" onClick={exportSVG}>Export SVG</Button>
  <Button variant="outline" size="sm" onClick={exportPNG}>Export PNG</Button>
  <Button variant="outline" size="sm" onClick={centerRoot}>Center</Button>
        <Button variant="outline" size="sm" onClick={executeSearch}>Search</Button>
        <Button variant="outline" size="sm" onClick={clearSearch}>Clear</Button>
        <Button variant="outline" size="sm" onClick={expandAll}>Expand all</Button>
        <Button variant="outline" size="sm" onClick={collapseAll}>Collapse all</Button>
        <Button variant="outline" size="sm" onClick={fitToScreen}>Fit</Button>
        <Button variant="outline" size="sm" onClick={resetView}>Reset</Button>
        <Button variant="outline" size="sm" onClick={zoomOut}>−</Button>
        <Button variant="outline" size="sm" onClick={zoomIn}>+</Button>
      </div>
  <div ref={containerRef} className="w-full h-full overflow-hidden">
        {/* svg injected here */}
      </div>
    </div>
  )
}
