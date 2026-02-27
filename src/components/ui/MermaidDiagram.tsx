import { useEffect, useRef, useState } from "react"

let mermaidInitialized = false

/**
 * Lazy-renders a Mermaid diagram from a definition string.
 * Mermaid is imported dynamically to avoid blocking the main bundle.
 */
export default function MermaidDiagram({
  chart,
  className = "",
}: {
  chart: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const mermaid = (await import("mermaid")).default

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "neutral",
            fontFamily: "Inter, system-ui, sans-serif",
            securityLevel: "loose",
            flowchart: { htmlLabels: true, curve: "basis" },
          })
          mermaidInitialized = true
        }

        const { svg: rendered } = await mermaid.render(
          idRef.current,
          chart.trim(),
        )

        if (!cancelled) {
          setSvg(rendered)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("MermaidDiagram render error:", err)
          setError("Diagram could not be rendered")
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [chart])

  if (error) {
    return (
      <div className={`text-xs text-muted-foreground italic p-3 ${className}`}>
        {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
