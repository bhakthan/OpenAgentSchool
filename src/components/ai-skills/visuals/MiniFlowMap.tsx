import React from 'react'

type MiniFlowMapProps = {
  steps: string[]
  title?: string
  highlightIndices?: number[]
}

// Theme-aware mini flow visualization for modules
export default function MiniFlowMap({ steps, title, highlightIndices = [] }: MiniFlowMapProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = React.useState<number>(720)

  // Observe container size for responsiveness
  React.useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = Math.max(320, Math.floor(entry.contentRect.width))
        setContainerWidth(cw)
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Use CSS variables directly for theme safety

  // Layout math
  const pad = 16
  const height = 124
  const baseBoxW = 150
  const boxH = 40
  const minGap = 24

  // Computed theme colors to avoid var() usage inside SVG attributes
  const [colors, setColors] = React.useState({
    rectFill: '#ffffff',
    rectStroke: '#e5e7eb',
    text: '#111827',
    primary: '#2563eb'
  })
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const styles = getComputedStyle(document.documentElement)
    const get = (name: string, fb: string) => {
      const v = styles.getPropertyValue(name)?.trim()
      return v && v.length > 0 ? v : fb
    }
    setColors({
      rectFill: get('--card', get('--background', '#ffffff')),
      rectStroke: get('--border', '#e5e7eb'),
      text: get('--card-foreground', get('--foreground', '#111827')),
      primary: get('--primary', '#2563eb')
    })
  }, [])

  // Compute ideal content width (boxes + minimal gaps) then stretch gaps to fill container when possible
  const contentMinWidth = steps.length * baseBoxW + (steps.length - 1) * minGap
  const viewport = Math.max(containerWidth, contentMinWidth + pad * 2 + 16) // +16 to avoid arrow clipping
  const availableGapSpace = Math.max(0, viewport - pad * 2 - steps.length * baseBoxW)
  const gap = steps.length > 1 ? availableGapSpace / (steps.length - 1) : 0

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto -mx-2 px-2"
      data-visualization="mini-flow"
      aria-label={title || 'Process map container'}
      role="region"
    >
      {title && <div className="text-sm font-medium mb-2 opacity-80">{title}</div>}
      <svg
        width={viewport}
        height={height}
        viewBox={`0 0 ${viewport} ${height}`}
        role="img"
        aria-label={title || 'Process map'}
        style={{ display: 'block' }}
      >
        <rect x={0} y={0} width={viewport} height={height} fill="transparent" />
        {steps.map((s, i) => {
          const x = pad + i * (baseBoxW + gap)
          const y = height / 2 - boxH / 2
          const isHi = highlightIndices.includes(i)
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <rect
                x={0}
                y={0}
                width={baseBoxW}
                height={boxH}
                rx={8}
                ry={8}
                fill={colors.rectFill}
                stroke={isHi ? colors.primary : colors.rectStroke}
                strokeWidth={isHi ? 2 : 1.25}
              />
              <text
                x={baseBoxW / 2}
                y={boxH / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                style={{ fill: colors.text, fontSize: 12, fontWeight: 600 }}
              >
                {s}
              </text>
              {i < steps.length - 1 && (
                <g transform={`translate(${baseBoxW + 6},${boxH / 2})`}>
                  <line x1={0} y1={0} x2={gap - 12} y2={0} stroke={colors.rectStroke} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                  <polygon
                    points={`${gap - 12},0 ${gap - 18},-4 ${gap - 18},4`}
                    fill={colors.rectStroke}
                  />
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
