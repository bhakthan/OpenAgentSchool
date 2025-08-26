import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

/**
 * SystemsThinkingTree (theme-aware)
 * - Dark/Light mode colors
 * - Toolbar: Expand/Collapse/Fit/Reset + Export SVG/PNG + Print
 * - Exposes window.__ST_TREE__ for programmatic control
 */
export default function SystemsThinkingTree() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const gRef = useRef<SVGGElement | null>(null)

  // Cleaner palette function based on Tailwind-like themes
  function getTheme() {
    const isDark = document.documentElement.classList.contains("dark")
    return isDark
      ? {
          bg: "#0b1220", // dark background
          link: "#94a3b8", // slate-400
          rectFill: "#0f172a", // slate-900
          rectStroke: "#e5e7eb", // gray-200
          text: "#e5e7eb", // gray-200
          header: "#ffffff",
        }
      : {
          bg: "#ffffff",
          link: "#111827", // gray-900
          rectFill: "#ffffff",
          rectStroke: "#111827",
          text: "#111827",
          header: "#111827",
        }
  }

  // Export helpers
  function exportCurrentSVG(filename = "systems-thinking.svg") {
    const svgEl = svgRef.current
    if (!svgEl) return
    const clone = svgEl.cloneNode(true) as SVGSVGElement
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(clone)
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function exportPNG(filename = "systems-thinking.png") {
    const svgEl = svgRef.current
    if (!svgEl) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgEl)
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const bbox = gRef.current?.getBBox()
      const padding = 32
      const w = Math.max(svgEl.clientWidth || 1200, (bbox?.width || 1200) + padding * 2)
      const h = Math.max(svgEl.clientHeight || 800, (bbox?.height || 800) + padding * 2)
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")!
      const theme = getTheme()
      ctx.fillStyle = theme.bg
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement("a")
        const pngUrl = URL.createObjectURL(blob)
        a.href = pngUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(pngUrl)
      })
      URL.revokeObjectURL(url)
    }
    img.onerror = () => URL.revokeObjectURL(url)
    img.src = url
  }

  function printSVG() {
    const svgEl = svgRef.current
    if (!svgEl) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgEl)
    const html = `<!doctype html><html><head><meta charset="utf-8"/>
      <title>Systems Thinking Tree</title>
      <style>
        html,body{margin:0;padding:0;background:#fff}
        @page { size: A4 landscape; margin: 10mm; }
        svg { width: 100vw; height: 100vh; }
      </style>
    </head><body>${svgStr}</body></html>`
    const win = window.open("", "_blank")
    if (!win) return
    win.document.open()
    win.document.write(html)
    win.document.close()
    win.focus()
    setTimeout(() => {
      win.print()
      setTimeout(() => win.close(), 250)
    }, 250)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    d3.select(container).selectAll("svg").remove()

    const width = container.clientWidth || 1024
    const height = Math.max(container.clientHeight || 0, 700)

    const svg = d3
      .select(container)
      .append("svg")
      .attr("class", "w-full h-full")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet") as d3.Selection<SVGSVGElement, unknown, null, undefined>

    svgRef.current = svg.node() as SVGSVGElement
    const g = svg.append("g")
    gRef.current = g.node() as SVGGElement

    // Zoom/Pan
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2.5])
      .on("zoom", (event) => g.attr("transform", event.transform))
    svg.call(zoom as any)

    // Data
    const data = {
      name: "Building Product",
      children: [
        {
          name: "Design Thinking — Start with Customer Problem",
          children: [
            { name: "Focus: Empathize → Define → Ideate → Prototype → Test" },
            { name: "Strength: Desirability, usability, adoption" },
            { name: "Artifacts", children: [{ name: "Personas" }, { name: "Journey maps" }, { name: "Usability tests" }] },
            { name: "Risks", children: [{ name: "Solution myopia" }, { name: "Local optima" }, { name: "Missed externalities" }] },
          ],
        },
        {
          name: "Breakthrough Thinking — Start with the Idea",
          children: [
            { name: "Focus: Technology push / novel concept" },
            { name: "Strength: Disruption, step-change performance" },
            { name: "Risks", children: [{ name: "Market misfit" }, { name: "Scaling blind spots" }, { name: "Negative externalities" }] },
            { name: "Historical examples", children: [{ name: "Plastics → pollution" }, { name: "Fracking → water/air impacts" }, { name: "CDS → systemic risk" }] },
          ],
        },
        {
          name: "Systems Thinking — Zoom Out First",
          children: [
            { name: "Step 1: Define desired future state" },
            { name: "Step 2: Reframe with multi‑stakeholder perspectives" },
            { name: "Step 3: Map flows & relationships", children: [
              { name: "Environment" },
              { name: "Business & economics" },
              { name: "Society & policy" },
              { name: "Supply chain" },
              { name: "Technology & data" },
            ]},
            { name: "Step 4: Small nudges → system shifts" },
            { name: "Benefits", children: [
              { name: "Anticipate unintended consequences" },
              { name: "Coalitions & governance" },
              { name: "Resilience & sustainability" },
            ]},
          ],
        },
      ],
    }

    const root: any = d3.hierarchy(data)

    // Collapse grandchildren initially
    function collapse(node: any) {
      if (node.children) {
        node._children = node.children
        node._children.forEach(collapse)
        node.children = null
      }
    }
    root.children?.forEach((c: any) => c.children?.forEach((gc: any) => collapse(gc)))

    const dx = 26
    const dy = 180
    const tree = d3.tree().nodeSize([dx, dy]) as any

    function measureText(text: string) {
      const avg = 7.1
      return Math.max(90, text.length * avg)
    }

    let link = g
      .append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2.25)
      .selectAll("path")

    let node = g
      .append("g")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")

    function update() {
      tree(root)

      link = link
        .data(root.links())
        .join("path")
        .attr(
          "d",
          d3
            .linkVertical()
            .x((d: any) => d.y)
            .y((d: any) => d.x) as any
        )

      node = node
        .data(root.descendants(), (d: any) => d.data.name as string)
        .join(
          (enter) => {
            const gEnter = enter
              .append("g")
              .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
              .style("cursor", "pointer")
              .on("click", (_event: any, d: any) => {
                if (d.children) {
                  d._children = d.children
                  d.children = null
                } else {
                  d.children = d._children
                  d._children = null
                }
                update()
              })

            gEnter
              .append("rect")
              .attr("x", -6)
              .attr("y", -12)
              .attr("rx", 8)
              .attr("ry", 8)
              .attr("width", (d: any) => 12 + measureText(d.data.name))
              .attr("height", 24)
              .attr("stroke-width", 2.5)
              .attr("opacity", 1)

            gEnter
              .append("text")
              .attr("dy", "0.32em")
              .attr("x", 0)
              .attr("text-anchor", "start")
              .attr("font-family", "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial")
              .attr("font-size", 13)
              .attr("font-weight", (d: any) => (d.depth === 0 ? 800 : d.depth === 1 ? 700 : 500))
              .text((d: any) => d.data.name)

            return gEnter
          },
          (updateSel) => updateSel
            .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
            .call((sel) => sel.select("rect").attr("width", (d: any) => 12 + measureText(d.data.name)))
            .call((sel) => sel.select("text").text((d: any) => d.data.name)),
          (exit) => exit.remove()
        )

      applyThemeColors()
      fitToScreen()
    }

    function fitToScreen() {
      const bounds = (g.node() as SVGGElement).getBBox()
      const fullWidth = width
      const fullHeight = height
      const midX = bounds.x + bounds.width / 2
      const midY = bounds.y + bounds.height / 2
      if (!(isFinite(midX) && isFinite(midY))) return
      const scale = 0.92 / Math.max(bounds.width / fullWidth, bounds.height / (fullHeight - 60))
      const translate = [fullWidth / 2 - scale * midX, (fullHeight + 40) / 2 - scale * midY]
      svg.transition().duration(450).call((d3.zoom() as any).transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
    }

    function applyThemeColors() {
      const theme = getTheme()
      d3.select(svgRef.current).style("background", theme.bg)
      d3.select(svgRef.current).selectAll("g path").attr("stroke", theme.link).attr("stroke-opacity", 0.9)
      d3.select(svgRef.current).selectAll("g rect").attr("fill", theme.rectFill).attr("stroke", theme.rectStroke)
      d3.select(svgRef.current).selectAll("text").attr("fill", theme.text)
      const texts = d3.select(svgRef.current).selectAll("text")
      texts.filter((_, i, n) => {
        const el = n[i] as SVGTextElement
        return el.getAttribute("y") === "28" || el.getAttribute("y") === "52"
      }).attr("fill", theme.header)
    }

    // Header + title
    svg
      .append("text")
      .attr("x", 16)
      .attr("y", 28)
      .attr("font-size", 18)
      .attr("font-weight", 800)
      .attr("font-family", "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial")
      .text("\"Design thinkers start with the customer’s problem. Breakthrough thinkers start with the idea. Systems thinkers zoom out before zooming in.\"")

    svg
      .append("text")
      .attr("x", 16)
      .attr("y", 52)
      .attr("font-size", 14)
      .attr("font-weight", 600)
      .attr("opacity", 0.8)
      .text("Vertical Tree • Building Product → Design | Breakthrough | Systems Thinking")

    // Initial draw
    update()

    // Expose controls
    ;(window as any).__ST_TREE__ = {
      expandAll: () => {
        root.each((d: any) => {
          if (d._children) {
            d.children = d._children
            d._children = null
          }
        })
        update()
      },
      collapseAll: () => {
        root.children?.forEach((c: any) => c.children?.forEach((gc: any) => collapse(gc)))
        update()
      },
      fitToScreen,
      resetZoom: () => svg.transition().duration(300).call((d3.zoom() as any).transform, d3.zoomIdentity),
      exportSVG: () => exportCurrentSVG(),
      exportPNG: () => exportPNG(),
      print: () => printSVG(),
    }

    const observer = new MutationObserver((mut) => {
      for (const m of mut) {
        if (m.type === "attributes" && m.attributeName === "class") {
          applyThemeColors()
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true })

    return () => {
      d3.select(container).selectAll("svg").remove()
      ;(window as any).__ST_TREE__ = undefined
      observer.disconnect()
    }
  }, [])

  return (
    <div className="w-full h-[85vh] bg-background text-foreground">
      <div className="flex items-center gap-2 px-3 py-2 border-b sticky top-0 bg-background z-10">
        <span className="font-semibold">Controls:</span>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.expandAll?.()}>
          Expand All
        </button>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.collapseAll?.()}>
          Collapse All
        </button>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.fitToScreen?.()}>
          Fit to Screen
        </button>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.resetZoom?.()}>
          Reset Zoom
        </button>
        <span className="mx-2 text-gray-300">•</span>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.exportSVG?.()}>
          Export SVG
        </button>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.exportPNG?.()}>
          Export PNG
        </button>
        <button className="px-3 py-1 rounded-2xl border shadow-sm hover:bg-accent" onClick={() => (window as any).__ST_TREE__?.print?.()}>
          Print
        </button>
        <span className="ml-auto text-sm text-gray-500">Pan/Zoom: mouse drag + wheel</span>
        <span className="text-gray-300">•</span>
        <a
          href="https://hbr.org/2025/09/why-you-need-systems-thinking-now"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline whitespace-nowrap"
        >
          HBR: Why you need systems thinking now
        </a>
      </div>
      <div ref={containerRef} className="w-full h-[calc(85vh-44px)]" />
    </div>
  )
}
