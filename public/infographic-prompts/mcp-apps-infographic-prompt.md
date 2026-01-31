# MCP Apps (Model Context Protocol Apps) - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with subtle gradient to #F0F9FF

---

## Prompt

```text
Create a comprehensive educational infographic titled "MCP Apps: Interactive UI for AI Agents" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White to light blue gradient background (#FFFFFF to #F0F9FF)
- Layered card-based design showing component architecture
- Primary accent color: Electric blue (#0EA5E9) with purple highlights (#8B5CF6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (16px radius) on all cards
- Glass morphism effects on overlay components

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "MCP Apps" in large bold gradient text (blue to purple)
- Subtitle: "SEP-1865 • Interactive UI Extension for Model Context Protocol"
- Version badge: "Stable: January 2026"
- Icon: Abstract app window with AI brain symbol inside
- Decorative: Floating UI component silhouettes

HERO VISUAL - THE PARADIGM SHIFT:
- Split panel comparison:
  LEFT (faded/gray): "Before: Text-Only Agents"
    - Chat bubble with plain text
    - Terminal-style output
    - Label: "Limited interaction"
  
  RIGHT (vibrant/colorful): "After: MCP Apps"
    - Rich interactive dashboard
    - Charts, forms, buttons, maps
    - Label: "Full UI capabilities"
- Arrow connecting left to right: "SEP-1865"

SECTION 1 - CORE ARCHITECTURE:
- Color: Blue gradient (#0EA5E9 to #38BDF8)
- Title: "How MCP Apps Work"
- 4-column flow diagram:

  Column 1 - "LLM Agent":
  - Brain icon
  - "Decides what UI to render"
  - Badge: "Intent Selection"

  Column 2 - "MCP Server":
  - Server rack icon
  - "Hosts registered apps"
  - Badge: "App Registry"

  Column 3 - "MCP App":
  - Component icon (React-style)
  - "Sandboxed UI component"
  - Badge: "Isolated Execution"

  Column 4 - "User Interface":
  - Screen/display icon
  - "Renders in host client"
  - Badge: "Interactive Display"

- Arrows connecting all 4 with data flow labels:
  - "Request UI" → "Lookup App" → "Generate HTML" → "Render"

SECTION 2 - ANATOMY OF AN MCP APP:
- Color: Purple (#8B5CF6)
- Title: "Inside an MCP App"
- Large code/component diagram showing:

  TOP: "App Definition"
  ```
  {
    name: "data-chart",
    description: "Interactive chart visualization",
    mimeType: "application/vnd.mcp-app+html",
    permissions: ["read-data", "user-input"]
  }
  ```

  MIDDLE: Visual representation of app layers:
  - Layer 1: "Sandbox Container" (outermost, gray border)
  - Layer 2: "Security Boundary" (dashed line, red accent)
  - Layer 3: "App Content" (innermost, blue)
    - Contains: HTML + CSS + JS
    - Icons for each: document, paint, gear

  BOTTOM: "Output Rendering"
  - Shows actual UI preview (chart/form mockup)

SECTION 3 - APP TYPES GALLERY:
- Color: Gradient row of cards
- Title: "What Can MCP Apps Do?"
- 6 app type cards in 2 rows of 3:

  Row 1:
  [📊 Data Charts] "Interactive visualizations with D3, Chart.js"
  [📝 Smart Forms] "Dynamic forms with validation"
  [🗺️ Maps] "Geographic data display"

  Row 2:
  [🧮 Calculators] "Domain-specific tools"
  [📅 Calendars] "Scheduling & booking UI"
  [🎨 Canvas] "Drawing & annotation tools"

SECTION 4 - SECURITY MODEL:
- Color: Red/orange gradient (#EF4444 to #F97316)
- Title: "Defense in Depth Security"
- Concentric circle diagram (outside → inside):

  Outer Ring: "Host Isolation"
  - iframe sandbox
  - CSP headers
  - Origin restrictions

  Middle Ring: "Permission System"
  - Capability-based access
  - User consent required
  - Audit logging

  Inner Ring: "App Sandbox"
  - No network access (by default)
  - No localStorage
  - Limited APIs

- Checkmarks showing what's BLOCKED:
  ❌ Cross-origin requests
  ❌ Cookie access
  ❌ Parent frame access
  ❌ Arbitrary code execution

SECTION 5 - INTEGRATION PATTERNS:
- Color: Green (#22C55E)
- Title: "How Agents Use MCP Apps"
- 3 pattern cards:

  Pattern 1: "Data Presentation"
  - Icon: Chart + eye
  - Flow: "Query → Transform → Visualize"
  - Example: "Show sales data as bar chart"

  Pattern 2: "User Input Collection"
  - Icon: Form + hand
  - Flow: "Render Form → Collect → Process"
  - Example: "Book appointment via calendar picker"

  Pattern 3: "Interactive Exploration"
  - Icon: Map + magnifier
  - Flow: "Initial View → User Navigation → Agent Response"
  - Example: "Explore knowledge graph interactively"

SECTION 6 - IMPLEMENTATION GUIDE:
- Color: Indigo (#6366F1)
- Title: "Building Your First MCP App"
- Numbered steps with icons:

  1️⃣ "Define App Manifest"
     - Code snippet showing manifest JSON

  2️⃣ "Implement render_app Tool"
     - Shows function signature

  3️⃣ "Register with MCP Server"
     - Shows registration call

  4️⃣ "Test in Sandbox"
     - Shows test command

  5️⃣ "Deploy to Production"
     - Shows deployment config

BOTTOM SECTION - ECOSYSTEM:
- Title: "MCP Apps Ecosystem (2026)"
- Horizontal strip with partner logos/badges:
  - "Claude Desktop" ✓
  - "VS Code Copilot" ✓
  - "Cursor" ✓
  - "Windsurf" ✓
  - "Custom Clients" ✓

FOOTER:
- "Learn more: openagentschool.org/concepts/data-visualization"
- Open Agent School logo
- "SEP-1865 Specification" link badge
- QR code to specification

DECORATIVE ELEMENTS:
- Floating UI component mockups in margins
- Subtle grid pattern in background
- Connection lines between sections
- Small emoji accents on key points
```

---

## Usage Notes

This infographic should help visual learners understand:
1. What MCP Apps are and why they matter
2. The architectural flow from agent to rendered UI
3. The security model that makes apps safe
4. Common use cases and integration patterns
5. How to get started building MCP Apps

Color coding: Blue (core concepts), Purple (structure), Red/Orange (security), Green (patterns), Indigo (implementation)
