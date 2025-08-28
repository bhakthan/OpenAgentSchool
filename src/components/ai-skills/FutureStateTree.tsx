import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type NodeData = {
  name: string
  color?: string
  children?: NodeData[]
}

type HNode = d3.HierarchyNode<NodeData> & {
  id?: number | undefined
  x0?: number
  y0?: number
  _children?: HNode[] | null
}

const data: NodeData = {
  name: 'Building Products in the Age of AI',
  color: 'black',
  children: [
    {
      name: 'Product as Organism',
      color: 'green',
      children: [
        { name: 'Static → Living Systems' },
        { name: 'Post-training > Pre-training' },
        { name: 'Automated UX Evolution' },
      ],
    },
    {
      name: 'Technology Shifts',
      color: 'blue',
      children: [
        { name: 'Rise of Agentic Society\n(Org chart → Work chart)' },
        { name: 'Shift from GUIs → Code-Native' },
        { name: 'Loop, not the Lane' },
        { name: 'Model Diversity, not One-Size-Fits-All' },
      ],
    },
    {
      name: 'Organization & People',
      color: 'purple',
      children: [
        { name: 'AI Fluency Across Teams' },
        { name: 'Full-stack Builders (Polymaths)' },
        { name: 'Adaptive Planning = “Seasons”' },
        { name: 'Optimism as Renewable Resource' },
      ],
    },
    {
      name: 'Risks & Foundations',
      color: 'red',
      children: [
        { name: 'Platform Reliability & Trust' },
        { name: 'Review Agent Work (Oversight)' },
        { name: 'AI’s Impact on Humanity:\nHealthcare, Workforce' },
        { name: 'Unintended Consequences' },
      ],
    },
  ],
}

// Resolve a CSS color from a token class (e.g., 'text-foreground')
function resolveCssColor(tokenClass: string): string {
  const probe = document.createElement('span')
  probe.style.position = 'absolute'
  probe.style.opacity = '0'
  probe.style.pointerEvents = 'none'
  probe.className = tokenClass
  document.body.appendChild(probe)
  const cs = getComputedStyle(probe)
  // If it's a bg-* token, read backgroundColor; otherwise read color
  const isBg = tokenClass.includes('bg-')
  const value = isBg ? (cs.backgroundColor || cs.color) : cs.color
  document.body.removeChild(probe)
  return value || '#000'
}

const colorForBranch = (name?: string) => {
  switch (name) {
    case 'green':
      return '#16a34a' // green-600
    case 'blue':
      return '#2563eb' // blue-600
    case 'purple':
      return '#7c3aed' // purple-600
    case 'red':
      return '#dc2626' // red-600
    default:
      return '#111827' // gray-900
  }
}

export default function FutureStateTree({ fitToWidth = false }: { fitToWidth?: boolean } = {}) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(ref.current!)
    svg.selectAll('*').remove()

  const width = ref.current?.clientWidth || 900
  const isSmall = width < 640
  const isMedium = width < 900
  // Responsive spacing: spread horizontally a bit more on larger screens, reduce vertical depth on small
  const dx = isSmall ? 36 : isMedium ? 44 : 52
  const baseDy = isSmall ? 220 : isMedium ? 260 : 300
  const dy = baseDy + (fitToWidth ? 40 : 0)

    const getColors = () => ({
  text: resolveCssColor('text-foreground'),
  bg: resolveCssColor('bg-background'),
  link: resolveCssColor('text-muted-foreground'),
    })
    let colors = getColors()

    const g = svg
      .attr('viewBox', [-(width / 2), -40, width, 900] as any)
      .attr('width', '100%')
      .attr('height', 700)
      .append('g')
  .attr('font-family', 'ui-sans-serif, system-ui, -apple-system')
  .attr('font-size', 14)

    const tree = d3
      .tree<NodeData>()
      .nodeSize([dx, dy])
      .separation((a, b) => {
        // Increase sibling separation slightly on small screens
        const sib = a.parent === b.parent
        return sib ? (isSmall ? 1.3 : 1.15) : (isSmall ? 1.8 : 1.6)
      })
    const diagonal = d3
      .linkVertical<any, any>()
      .x((d: any) => d.x)
      .y((d: any) => d.y)

    const root = d3.hierarchy<NodeData>(data) as HNode
    root.x0 = 0
    root.y0 = 0
    root.descendants().forEach((d, i) => {
  const node = d as HNode
  ;(node as any).id = i
      node._children = (node.children as any)
      if (node.depth && node.depth > 1) (node as any).children = null
    })

    const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
      g.attr('transform', (event.transform as any))
      const k = event.transform.k
      g.selectAll<SVGPathElement, unknown>('path.link').attr('stroke-width', Math.max(0.75, 1.5 / k))
    }

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.4, 2.5])
        .on('zoom', zoomed)
    )

    function update(source: HNode) {
      const nodes = (root as HNode).descendants().reverse() as HNode[]
      const links = (root as HNode).links()

      tree(root)

      // Simple collision-avoidance: enforce a minimum horizontal gap between nodes at the same depth
      const minGap = isSmall ? 20 : 16
      const depthGroups = d3.group(nodes as HNode[], (n: HNode) => String((n as any).depth))
      depthGroups.forEach((arr) => {
        arr.sort((a, b) => (a.x as number) - (b.x as number))
        for (let i = 1; i < arr.length; i++) {
          const prev = arr[i - 1] as HNode
          const curr = arr[i] as HNode
          const needed = (prev.x as number) + minGap
          if ((curr.x as number) < needed) {
            const delta = needed - (curr.x as number)
            ;(curr as any).descendants().forEach((m: any) => {
              m.x += delta
            })
          }
        }
      })

      // Stagger leaf depths so connectors vary and labels don't overlap at the bottom
      const leafBasePad = isSmall ? 50 : 80
      const leafStagger = isSmall ? 24 : 32
      const isLeaf = (n: HNode) => !(n as any).children
      const leaves = nodes.filter(isLeaf)
      const byParent = d3.group(leaves, (n: HNode) => String((n.parent as any)?.id ?? 'root'))
      byParent.forEach((arr) => {
        arr.sort((a, b) => a.x - b.x)
        arr.forEach((n, idx) => {
          const lineCount = String((n as any).data.name || '').split('\n').length
          const extraForLines = (lineCount - 1) * 10
          ;(n as any).y += leafBasePad + idx * leafStagger + extraForLines
        })
      })
      // Compute dynamic extents to fit content
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity
      ;(root as any).each((node: HNode) => {
        if (node.x < minX) minX = node.x
        if (node.x > maxX) maxX = node.x
        if (node.y < minY) minY = node.y
        if (node.y > maxY) maxY = node.y
      })
      const marginX = 60
      const marginY = 100
      const vbX = minX - marginX
      const vbY = minY - marginY
      const vbW = (maxX - minX) + marginX * 2
  const vbH = (maxY - minY) + marginY * 2

      // Nodes
  const node = g.selectAll<SVGGElement, HNode>('g.node').data(nodes as any, (d: any) => d.id)

  const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d: HNode) => `translate(${source.x0},${source.y0})`)
        .on('click', (_event, d: HNode) => {
          (d as any).children = (d as any).children ? null : (d as any)._children
          update(d)
        })

      nodeEnter
        .append('circle')
        .attr('r', 1e-6)
  .attr('fill', (d: any) => (d._children ? colors.bg : colors.bg))
        .attr('stroke', colors.text)
        .attr('stroke-width', 2)

      nodeEnter
        .append('text')
        .attr('dy', '0.32em')
        .attr('text-anchor', (d: any) => ((d as HNode)._children ? 'end' : 'start'))
        .attr('fill', colors.text)
        .attr('font-weight', 500)
        .attr('paint-order', 'stroke')
        .attr('stroke', colors.bg)
        .attr('stroke-width', 1.2)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .each(function (d: any) {
          const labelOffsetEnter = isSmall ? 22 : 20
          const x = ((d as HNode)._children ? -labelOffsetEnter : labelOffsetEnter)
          const lines = String((d as any).data.name).split('\n')
          const textSel = d3.select<SVGTextElement, any>(this)
          lines.forEach((line, i) => {
            textSel
              .append('tspan')
              .attr('x', x)
              .attr('dy', i === 0 ? '0em' : '1.3em')
              .text(line)
          })
        })

      const nodeUpdate = nodeEnter.merge(node as any)
      nodeUpdate
        .transition()
        .duration(750)
  .attr('transform', (d: any) => `translate(${(d as any).x},${(d as any).y})`)

      // Update text anchors and tspan x positions after transitions
    nodeUpdate.select('text')
        .attr('text-anchor', (d: any) => ((d as HNode)._children ? 'end' : 'start'))
        .each(function (d: any) {
      const labelOffsetUpdate = isSmall ? 20 : 16
      const x = ((d as HNode)._children ? -labelOffsetUpdate : labelOffsetUpdate)
          d3.select(this).selectAll('tspan').attr('x', x)
        })
      if (fitToWidth) {
        const centerX = (minX + maxX) / 2
        const vbXFit = centerX - (width / 2)
        svg.attr('viewBox', [vbXFit, vbY, width, vbH] as any)
      } else {
        svg.attr('viewBox', [vbX, vbY, vbW, vbH] as any)
      }

  nodeUpdate.select('circle').attr('r', 8).attr('fill', (d: any) => {
        // Slight tinted fill for category nodes; white for others
        if ((d as any).depth === 1) {
          const col = d3.color(colorForBranch((d as any).data.color))
          if (col) {
            col.opacity = 0.12
            return col.formatRgb()
          }
        }
        return colors.bg
      })

      const nodeExit = (node as any)
        .exit()
        .transition()
        .duration(750)
        .attr('transform', (d: any) => `translate(${source.x},${source.y})`)
        .attr('opacity', 0)
        .remove()

      nodeExit.select('circle').attr('r', 1e-6)

      // Links
  const link = g.selectAll<SVGPathElement, any>('path.link').data(links as any, (d: any) => d.target.id)

      const linkEnter = link
        .enter()
        .insert('path', 'g')
  .attr('class', 'link')
  .attr('fill', 'none')
  .attr('stroke', colors.link)
        .attr('stroke-width', 2)
        .attr('d', (_d: any) => {
          const o = { x: source.x0 as number, y: source.y0 as number }
          return diagonal({ source: o, target: o } as any) as string
        })

      link
        .merge(linkEnter)
        .transition()
        .duration(750)
        .attr('d', diagonal as any)

      link
        .exit()
        .transition()
        .duration(750)
        .attr('d', (_d: any) => {
          const o = { x: (source as any).x, y: (source as any).y }
          return diagonal({ source: o, target: o } as any) as string
        })
        .remove()

      ;(root as any).eachBefore((d: any) => {
        d.x0 = d.x
        d.y0 = d.y
      })

      // Apply viewBox after nodes/links for accurate extents
      if (fitToWidth) {
        // Fill the card width and center horizontally
        const centerX = (minX + maxX) / 2
        const vbXFit = centerX - (width / 2)
        svg.attr('viewBox', [vbXFit, vbY, width, vbH] as any)
        svg.attr('preserveAspectRatio', 'xMidYMid meet')
      } else {
        // Show content with extra gutters so it appears smaller than the card dimensions
        const padFactorX = 1.8 // 80% wider viewBox than content width for a clear difference
        const padFactorY = 1.25 // 25% taller viewBox to change height-based scaling too
        const extraW = vbW * (padFactorX - 1)
        const extraH = vbH * (padFactorY - 1)
        const vbXPad = vbX - extraW / 2 // keep centered
        const vbYPad = vbY - extraH / 2
        svg.attr('viewBox', [vbXPad, vbYPad, vbW * padFactorX, vbH * padFactorY] as any)
        svg.attr('preserveAspectRatio', 'xMidYMid meet')
      }
    }

    update(root as HNode)

    // function to re-apply theme colors without rebuilding
    const applyColors = () => {
      colors = getColors()
      g.selectAll<SVGTextElement, unknown>('text')
        .attr('fill', colors.text)
        .attr('stroke', colors.bg)
      g.selectAll<SVGCircleElement, unknown>('circle')
        .attr('stroke', colors.text)
      g.selectAll<SVGPathElement, unknown>('path.link')
        .attr('stroke', colors.link)
    }

    // Re-resolve colors on theme change
    const observer = new MutationObserver(() => {
      applyColors()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [fitToWidth])

  return (
    <svg ref={ref} className="w-full h-[700px] rounded-md border bg-background" role="img" aria-label="Future State concept tree" />
  )
}
