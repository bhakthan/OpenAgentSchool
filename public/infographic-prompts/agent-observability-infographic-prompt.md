# Agent Observability - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (7680×4320)
- **Orientation**: Landscape (16:9)
- **Background**: Light (#F8FAFC) with subtle grid pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Observability: See Everything Your Agent Does" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle shadows
- Light gray background (#F8FAFC) with 16px grid overlay
- Dashboard/monitoring aesthetic
- Green primary (#22C55E) for observability theme
- Blue (#3B82F6) for metrics/data
- Purple (#8B5CF6) for traces
- Amber (#F59E0B) for alerts
- Red (#EF4444) for errors
- Sans-serif typography (Inter or SF Pro)
- Rounded corners (8px) on all cards
- Thin borders (1px slate-200)

LAYOUT (Dashboard Style with 4 Main Quadrants):

HEADER:
- Title: "Agent Observability" in bold dark text
- Subtitle: "The Three Pillars + Alerting Pipeline"
- Icon: Eye with magnifying glass
- Status indicator: Green dot with "System Healthy"

QUADRANT 1 (Top Left) - DISTRIBUTED TRACING:
- Visual: Waterfall chart showing trace spans
- Show a trace with nested spans:
  ```
  [Agent Coordinator] ████████████████████████ 2.4s
    [Planning] ██████ 0.4s
    [LLM Call] ████████████████ 1.8s
    [Memory Retrieval] ███ 0.2s
    [Tool Execution] ████████ 0.4s
  ```
- Each span different color (purple for LLM, green for tools, blue for memory)
- Labels on each span showing duration
- Icon: Activity/pulse icon
- Title: "🔍 Distributed Tracing"
- Key metrics:
  - "End-to-end latency: 2.4s"
  - "LLM calls: 3"
  - "Tool invocations: 1"
- Tools badges: "LangSmith", "Langfuse", "Phoenix", "OpenTelemetry"

QUADRANT 2 (Top Right) - METRICS DASHBOARD:
- Visual: Grid of metric cards (2x2)
- Metric Card 1: "Latency"
  - Value: "847ms"
  - Sparkline graph showing trend
  - Status: Green (within SLA)
- Metric Card 2: "Token Usage"
  - Value: "2,340 tokens"
  - Pie chart: 60% input, 40% output
  - Status: Blue
- Metric Card 3: "Success Rate"
  - Value: "98.2%"
  - Progress ring nearly full
  - Status: Green
- Metric Card 4: "Cost per Query"
  - Value: "$0.023"
  - Dollar sign icon
  - Status: Amber (↓ trending)
- Icon: Bar chart icon
- Title: "📊 Real-time Metrics"
- Sub-label: "Key Performance Indicators"

QUADRANT 3 (Bottom Left) - STRUCTURED LOGGING:
- Visual: Log viewer with colored entries
- Show log entries:
  ```
  [INFO]  00:00.000  Agent initialized
  [DEBUG] 00:00.124  Retrieved 3 memories
  [INFO]  00:01.847  LLM response received
  [WARN]  00:02.103  Tool retry on timeout
  [INFO]  00:02.401  Task completed successfully
  ```
- Color code levels: Green=INFO, Gray=DEBUG, Amber=WARN, Red=ERROR
- Each line with timestamp and structured data
- Icon: Terminal/console icon
- Title: "📝 Structured Logs"
- Features badges: "JSON Format", "Correlation IDs", "Searchable"
- Show log filter UI element

QUADRANT 4 (Bottom Right) - ALERT PIPELINE:
- Visual: Flow diagram showing alert flow
- Pipeline stages (left to right):
  1. "📈 Metrics" (source)
  2. "📏 Threshold" (rule check)
  3. "🧮 Evaluate" (condition met?)
  4. "🔀 Route" (channel selection)
  5. "📣 Notify" (destination)
- Arrows connecting each stage
- Example alert card at bottom:
  - Red bordered card
  - "🚨 ALERT: Latency exceeded threshold"
  - "847ms > 500ms SLA"
  - "Escalating to PagerDuty"
- Icon: Bell with exclamation
- Title: "🚨 Alert Pipeline"
- Channels: Slack, PagerDuty, Email icons

CENTER ELEMENT - AGENT ICON:
- Large circular agent icon in center
- Radiating lines to each quadrant
- Label: "AI Agent" with robot emoji
- Shows data flowing from agent to observability pillars

BOTTOM SECTION - TOOLS ECOSYSTEM:
- Horizontal bar showing popular tools
- LangSmith logo + description: "Trace LangChain apps"
- Langfuse logo + description: "Open source observability"
- Phoenix logo + description: "ML observability"
- Prometheus logo + description: "Metrics collection"
- Grafana logo + description: "Visualization"
- OpenTelemetry logo + description: "Vendor-neutral instrumentation"

FOOTER:
- Open Agent School logo
- URL: www.openagentschool.org
- Tagline: "Debug and Monitor Like a Pro"
- Green gradient accent bar

VISUAL POLISH:
- Dashboard-like card layout with consistent spacing
- Subtle depth with card shadows
- Connection lines showing data flow from agent to each pillar
- Small status indicators (green/amber/red dots)
- Consistent icon style across all quadrants
- Grid lines in background for dashboard feel
```

---

## Expected Output

A dashboard-style infographic showing the complete observability stack:

1. **Distributed Tracing** - Follow requests through every step
2. **Metrics** - Real-time KPIs and performance data
3. **Structured Logs** - Searchable, correlated log entries
4. **Alerting** - Automated notification pipeline

The layout should feel like a real monitoring dashboard, helping visual learners understand how to instrument their agents.

---

## File Output

Save generated image as:

```text
/public/images/infographics/agent-observability-infographic.png
```
