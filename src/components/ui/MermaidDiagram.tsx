import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme/ThemeProvider"

/**
 * Read a CSS custom property from :root / the active theme class and
 * return a hex string that mermaid can consume.
 * Falls back to `fallback` when the property is empty or uses oklch()
 * (mermaid doesn't understand oklch).
 */
function getCssVar(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  if (!raw) return fallback
  // If the value is already a hex or named colour mermaid can use it directly
  if (raw.startsWith("#") || /^[a-z]+$/i.test(raw)) return raw
  // For rgb() values, convert to hex
  if (raw.startsWith("rgb")) {
    const nums = raw.match(/[\d.]+/g)
    if (nums && nums.length >= 3) {
      const [r, g, b] = nums.map((n) => Math.round(Number(n)))
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
    }
  }
  // oklch / hsl / other formats — resolve via a temp element
  try {
    const el = document.createElement("div")
    el.style.color = raw
    document.body.appendChild(el)
    const computed = getComputedStyle(el).color
    document.body.removeChild(el)
    const nums = computed.match(/[\d.]+/g)
    if (nums && nums.length >= 3) {
      const [r, g, b] = nums.map((n) => Math.round(Number(n)))
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
    }
  } catch {
    /* ignore */
  }
  return fallback
}

/** Lighten a hex colour by mixing with white. `amount` 0-1. */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, Math.round(((n >> 16) & 0xff) + (255 - ((n >> 16) & 0xff)) * amount))
  const g = Math.min(255, Math.round(((n >> 8) & 0xff) + (255 - ((n >> 8) & 0xff)) * amount))
  const b = Math.min(255, Math.round((n & 0xff) + (255 - (n & 0xff)) * amount))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/** Darken a hex colour by mixing with black. `amount` 0-1. */
function darken(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16)
  const r = Math.round(((n >> 16) & 0xff) * (1 - amount))
  const g = Math.round(((n >> 8) & 0xff) * (1 - amount))
  const b = Math.round((n & 0xff) * (1 - amount))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/**
 * Relative luminance (WCAG 2.x formula).
 * Returns 0 (black) – 1 (white).
 */
function luminance(hex: string): number {
  const n = parseInt(hex.replace("#", ""), 16)
  const srgb = [((n >> 16) & 0xff) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255]
  const lin = srgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
}

/**
 * Pick a high-contrast text colour for a given background.
 * Uses WCAG contrast-ratio check (>=4.5 preferred).
 * `light` / `dark` are the candidate text colors.
 */
function contrastText(bgHex: string, lightText: string, darkText: string): string {
  const bgL = luminance(bgHex)
  const lightL = luminance(lightText)
  const darkL = luminance(darkText)
  const crLight = (Math.max(bgL, lightL) + 0.05) / (Math.min(bgL, lightL) + 0.05)
  const crDark = (Math.max(bgL, darkL) + 0.05) / (Math.min(bgL, darkL) + 0.05)
  return crLight >= crDark ? lightText : darkText
}

/**
 * Lazy-renders a Mermaid diagram from a definition string.
 * Automatically adapts internal diagram colours to the active app theme.
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
  // Unique id per instance — mermaid needs unique DOM ids
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`)
  const renderCount = useRef(0)

  const { theme, isDarkMode } = useTheme()

  useEffect(() => {
    let cancelled = false
    // Increment render count so each render uses a fresh mermaid id
    renderCount.current += 1
    const renderId = `${idRef.current}-${renderCount.current}`

    ;(async () => {
      try {
        const mermaid = (await import("mermaid")).default

        // Resolve live CSS variables into hex values mermaid understands
        const primary = getCssVar("--primary", isDarkMode ? "#60a5fa" : "#3b82f6")
        const bg = getCssVar("--background", isDarkMode ? "#1a1d23" : "#f8f6f0")
        const fg = getCssVar("--foreground", isDarkMode ? "#d1d5db" : "#2d333a")
        const muted = getCssVar("--muted", isDarkMode ? "#374151" : "#f3f4f6")
        const border = getCssVar("--border", isDarkMode ? "#4b5563" : "#e2e2e2")
        const card = getCssVar("--card", isDarkMode ? "#1f2937" : "#f9fafb")

        // Derived palette for a cohesive diagram look
        // Dark mode: darken the primary so light text stays legible
        // Light mode: lighten the primary so dark text stays legible
        const primaryFill = isDarkMode ? darken(primary, 0.55) : lighten(primary, 0.82)
        const primaryMid = isDarkMode ? darken(primary, 0.45) : lighten(primary, 0.65)
        const secondaryFill = isDarkMode ? lighten(muted, 0.04) : darken(muted, 0.03)
        const tertiaryFill = isDarkMode ? lighten(card, 0.06) : darken(card, 0.05)

        // Contrast-safe text colours per fill
        const lightText = "#f1f5f9" // slate-100
        const darkText = "#1e293b"  // slate-800
        const primaryNodeText = contrastText(primaryFill, lightText, darkText)
        const secondaryNodeText = contrastText(secondaryFill, lightText, darkText)
        const tertiaryNodeText = contrastText(tertiaryFill, lightText, darkText)
        const actorText = contrastText(primaryMid, lightText, darkText)
        const noteText = contrastText(
          isDarkMode ? lighten(muted, 0.06) : lighten(primary, 0.88),
          lightText,
          darkText,
        )

        // Re-initialise mermaid with the current theme's colours.
        // Using "base" theme gives us full control via themeVariables.
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          fontFamily: "Inter, system-ui, sans-serif",
          securityLevel: "loose",
          flowchart: { htmlLabels: true, curve: "basis" },
          themeVariables: {
            // Background & text
            background: bg,
            mainBkg: primaryFill,
            textColor: fg,
            primaryTextColor: primaryNodeText,
            secondaryTextColor: secondaryNodeText,
            tertiaryTextColor: tertiaryNodeText,

            // Node fills & borders
            primaryColor: primaryFill,
            primaryBorderColor: primary,
            secondaryColor: secondaryFill,
            secondaryBorderColor: border,
            tertiaryColor: tertiaryFill,
            tertiaryBorderColor: border,
            nodeBorder: primary,
            nodeTextColor: primaryNodeText,

            // Lines & labels
            lineColor: isDarkMode ? lighten(border, 0.25) : darken(border, 0.3),
            edgeLabelBackground: card,

            // Clusters / subgraphs
            clusterBkg: isDarkMode ? lighten(bg, 0.06) : darken(bg, 0.03),
            clusterBorder: border,
            titleColor: fg,

            // Sequence diagrams
            actorBkg: primaryMid,
            actorBorder: primary,
            actorTextColor: actorText,
            actorLineColor: border,
            signalColor: fg,
            signalTextColor: fg,
            activationBorderColor: primary,
            activationBkgColor: primaryFill,
            sequenceNumberColor: "#ffffff",
            loopTextColor: fg,
            noteBkgColor: isDarkMode ? lighten(muted, 0.06) : lighten(primary, 0.88),
            noteBorderColor: primary,
            noteTextColor: noteText,
            labelBoxBkgColor: card,
            labelBoxBorderColor: border,
            labelTextColor: fg,

            // Pie / other chart types
            pie1: primary,
            pie2: isDarkMode ? lighten(primary, 0.25) : darken(primary, 0.15),
            pie3: muted,
            pie4: secondaryFill,
            pieStrokeColor: border,
            pieOuterStrokeColor: border,
            pieTitleTextColor: fg,
            pieSectionTextColor: contrastText(primary, lightText, darkText),
            pieLegendTextColor: fg,

            // Gantt
            gridColor: border,
            doneTaskBkgColor: primary,
            activeTaskBkgColor: primaryFill,
            taskBkgColor: secondaryFill,
            taskBorderColor: border,
            taskTextColor: secondaryNodeText,
            taskTextDarkColor: primaryNodeText,
            todayLineColor: primary,

            // Requirement
            reqBkgColor: primaryFill,
            reqBorderColor: primary,
            reqTextColor: primaryNodeText,

            // State diagrams
            labelColor: fg,
            altBackground: isDarkMode ? lighten(bg, 0.04) : darken(bg, 0.02),

            // Font size baseline for legibility
            fontSize: "14px",
          },
        })

        const { svg: rendered } = await mermaid.render(renderId, chart.trim())

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
  }, [chart, theme, isDarkMode])

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
      style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

// Named re-export for convenience
export { MermaidDiagram };
