# Model Context Protocol (MCP) - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with subtle circuit board pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Model Context Protocol: The USB-C for AI Agents" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background (#FFFFFF) with faint circuit pattern overlay
- Hub-and-spoke architecture visualization
- Primary color: Anthropic orange (#D97706) with blue accents (#3B82F6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Connection lines with animated-style dashes

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Model Context Protocol (MCP)" in large bold text
- Subtitle: "Universal Standard for AI Tool Integration"
- Tagline: "The USB-C for AI Agents"
- Icon: Plug/connector symbol with AI brain
- Badge: "Open Standard • Anthropic 2024"
- Decorative: Abstract connection lines radiating outward

HERO VISUAL - THE PROBLEM/SOLUTION:
- Split comparison:

  LEFT (Problem - Red tinted):
  - Title: "Before MCP: N×M Integration Hell"
  - Visual: Tangled spaghetti of connections
  - 4 LLM icons connected to 4 tool icons = 16 lines
  - Labels: "Every LLM → Every Tool"
  - Pain points in red badges:
    - "Custom adapters per tool"
    - "Inconsistent interfaces"
    - "Maintenance nightmare"

  RIGHT (Solution - Green tinted):
  - Title: "With MCP: Universal Protocol"
  - Visual: Clean hub architecture
  - 4 LLM icons → single MCP hub → 4 tools
  - Labels: "Standard interface"
  - Benefits in green badges:
    - "Write once, use everywhere"
    - "Consistent behavior"
    - "Easy maintenance"

SECTION 1 - CORE ARCHITECTURE:
- Color: Blue (#3B82F6)
- Title: "MCP Architecture: Client-Server Model"
- Large architectural diagram:

  LEFT SIDE - "MCP Hosts" (Clients):
  - Claude Desktop icon
  - VS Code icon
  - Custom App icon
  - Label: "Any LLM-powered application"
  - Arrow pointing right: "Requests"

  CENTER - "MCP Protocol":
  - Large bidirectional arrow
  - Labels on arrow:
    - "JSON-RPC 2.0"
    - "Stdio / SSE Transport"
  - Small icons: request/response symbols

  RIGHT SIDE - "MCP Servers":
  - Database icon (labeled "PostgreSQL")
  - Cloud icon (labeled "APIs")
  - File icon (labeled "Local Files")
  - Code icon (labeled "Git Repos")
  - Label: "Any data source or tool"
  - Arrow pointing left: "Responses"

SECTION 2 - THE THREE PRIMITIVES:
- Color: Orange gradient (#D97706 to #F59E0B)
- Title: "MCP's Three Building Blocks"
- 3 large cards in a row:

  Card 1 - TOOLS:
  - Icon: Wrench/hammer
  - Color accent: Blue
  - Definition: "Functions the LLM can call"
  - Examples in small tags:
    - "read_file()"
    - "query_database()"
    - "send_email()"
  - Analogy: "Like API endpoints"
  - Direction arrow: "LLM → Server"

  Card 2 - RESOURCES:
  - Icon: Folder/document
  - Color accent: Green
  - Definition: "Data the LLM can access"
  - Examples in small tags:
    - "file://docs/readme.md"
    - "db://users/profile"
    - "api://weather/current"
  - Analogy: "Like REST resources"
  - Direction arrow: "Server → LLM (on demand)"

  Card 3 - PROMPTS:
  - Icon: Chat bubble with template
  - Color accent: Purple
  - Definition: "Reusable prompt templates"
  - Examples in small tags:
    - "summarize_code"
    - "explain_error"
    - "generate_tests"
  - Analogy: "Like stored procedures"
  - Direction arrow: "User → LLM (guided)"

SECTION 3 - TOOL CALLING FLOW:
- Color: Indigo (#6366F1)
- Title: "How MCP Tool Calling Works"
- Horizontal swim lane diagram:

  Lane 1 - "User":
  - Message: "What's the weather in Tokyo?"

  Lane 2 - "LLM Host":
  - Step 1: "Parse intent"
  - Step 2: "Select tool: get_weather"
  - Step 3: "Format arguments"

  Lane 3 - "MCP Server":
  - Step 4: "Receive tool call"
  - Step 5: "Execute: fetch weather API"
  - Step 6: "Return result"

  Lane 4 - "LLM Host":
  - Step 7: "Incorporate result"
  - Step 8: "Generate response"

  Lane 5 - "User":
  - Message: "It's 22°C and sunny in Tokyo"

  Arrows connecting all steps sequentially

SECTION 4 - TRANSPORT LAYERS:
- Color: Teal (#14B8A6)
- Title: "MCP Transport Options"
- 2-column comparison:

  Column 1 - "Stdio (Local)":
  - Icon: Terminal
  - Description: "For local MCP servers"
  - How it works: "Stdin/stdout pipes"
  - Use case: "Local tools, file access"
  - Pros: "Simple, fast, secure"
  - Visual: Process diagram showing pipes

  Column 2 - "SSE (Remote)":
  - Icon: Cloud with arrows
  - Description: "For remote MCP servers"
  - How it works: "HTTP + Server-Sent Events"
  - Use case: "Cloud APIs, shared servers"
  - Pros: "Networked, scalable"
  - Visual: Client-server with HTTP arrows

SECTION 5 - SECURITY MODEL:
- Color: Red (#EF4444)
- Title: "MCP Security Architecture"
- Layered security diagram:

  Layer 1 (Outer): "User Consent"
  - "Explicit tool approval required"
  - Checkbox icon

  Layer 2: "Capability-Based Access"
  - "Servers declare what they can do"
  - Key icon

  Layer 3: "Transport Security"
  - "TLS for remote, process isolation for local"
  - Lock icon

  Layer 4 (Inner): "Input Validation"
  - "Schema-validated parameters"
  - Shield icon

  Side panel - "Security Best Practices":
  ✅ Always validate tool inputs
  ✅ Use least-privilege permissions
  ✅ Log all tool invocations
  ✅ Sandbox untrusted servers

SECTION 6 - ECOSYSTEM MAP:
- Color: Green (#22C55E)
- Title: "MCP Ecosystem (2026)"
- Circular ecosystem diagram:

  CENTER: "MCP Standard"

  INNER RING - "Hosts":
  - Claude Desktop
  - VS Code + Copilot
  - Cursor IDE
  - Windsurf
  - Continue.dev

  OUTER RING - "Servers":
  - Databases (Postgres, Supabase)
  - Cloud (AWS, Azure, GCP)
  - Dev Tools (Git, GitHub, Jira)
  - Search (Brave, Exa)
  - Files (Local FS, Google Drive)
  - Custom (Your Server Here)

SECTION 7 - GETTING STARTED:
- Color: Purple (#8B5CF6)
- Title: "Build Your First MCP Server"
- Code walkthrough with 4 numbered steps:

  Step 1: "Install SDK"
  ```
  npm install @modelcontextprotocol/sdk
  ```

  Step 2: "Define Tools"
  - Small code snippet showing tool definition

  Step 3: "Handle Requests"
  - Small code snippet showing handler

  Step 4: "Register & Test"
  - Command to run and test

FOOTER:
- "MCP Specification: modelcontextprotocol.io"
- "Open Agent School: openagentschool.org/concepts/mcp"
- Logos: Anthropic, Open Agent School
- QR code to MCP docs

DECORATIVE ELEMENTS:
- Subtle plug/connector motifs in corners
- Connection dots and lines pattern
- USB-C cable illustration as visual metaphor
- Gradient backgrounds on section headers
```

---

## Usage Notes

This infographic explains MCP for visual learners by showing:
1. The N×M integration problem MCP solves
2. Core architecture (client-server model)
3. The three primitives (Tools, Resources, Prompts)
4. How tool calling actually flows
5. Security architecture
6. The ecosystem of hosts and servers

Color coding: Blue (architecture), Orange (primitives), Indigo (flow), Red (security), Green (ecosystem), Purple (implementation)
