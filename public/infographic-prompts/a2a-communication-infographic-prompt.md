# Agent-to-Agent Communication (A2A) - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with subtle network mesh pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "A2A Protocol: Agent-to-Agent Communication" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background (#FFFFFF) with faint network mesh overlay
- Multi-agent network visualization style
- Primary color: Google blue (#4285F4) with green accents (#34A853)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Animated-style connection lines between agents

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "A2A Protocol" in large bold text
- Subtitle: "Agent-to-Agent Communication Standard"
- Tagline: "Agents talking to agents, not just tools"
- Icon: Two AI brains with bidirectional arrows
- Badge: "Google DeepMind • 2025"
- Decorative: Network nodes pattern

HERO VISUAL - MCP vs A2A COMPARISON:
- Side-by-side panels:

  LEFT PANEL - "MCP: Agent → Tool":
  - Single agent icon at top
  - Arrow pointing down to tools
  - Tools shown as passive icons (database, file, API)
  - Label: "Agent controls tools"
  - Color: Blue tinted
  - Caption: "Tools execute, don't decide"

  RIGHT PANEL - "A2A: Agent ↔ Agent":
  - Two agent icons side by side
  - Bidirectional arrows between them
  - Agents shown as active/thinking
  - Label: "Agents collaborate"
  - Color: Green tinted
  - Caption: "Each agent reasons independently"

  BOTTOM: Arrow showing "MCP + A2A = Complete Ecosystem"

SECTION 1 - THE A2A HANDSHAKE:
- Color: Blue (#4285F4)
- Title: "How Agents Discover Each Other"
- Vertical timeline/flow:

  Step 1: "Agent Card Discovery"
  - Icon: ID card
  - Description: "Agents publish their capabilities"
  - Visual: JSON card preview showing name, skills, endpoint

  Step 2: "Capability Matching"
  - Icon: Puzzle pieces connecting
  - Description: "Client finds agents with needed skills"
  - Visual: Search query matching agent skills

  Step 3: "Session Establishment"
  - Icon: Handshake
  - Description: "Secure channel created"
  - Visual: Two agents connected by encrypted tunnel

  Step 4: "Task Delegation"
  - Icon: Task assignment
  - Description: "Work begins with context sharing"
  - Visual: Message being passed between agents

SECTION 2 - AGENT CARD ANATOMY:
- Color: Purple (#8B5CF6)
- Title: "The Agent Card: Your Agent's Identity"
- Large card visualization:

  ```json
  {
    "name": "Research Agent",
    "description": "Deep web research & synthesis",
    "endpoint": "https://research.example.com/a2a",
    "capabilities": [
      "web_search",
      "document_analysis", 
      "citation_generation"
    ],
    "inputSchema": { ... },
    "outputSchema": { ... },
    "authMethods": ["oauth2", "api_key"]
  }
  ```

  Callout annotations pointing to each field:
  - name → "Human-readable identifier"
  - capabilities → "What the agent can do"
  - endpoint → "Where to reach it"
  - schemas → "Expected I/O formats"

SECTION 3 - COMMUNICATION PATTERNS:
- Color: Orange (#F97316)
- Title: "A2A Communication Patterns"
- 4 pattern cards:

  Pattern 1 - "Request-Response":
  - Icon: Single arrow right, single arrow left
  - Description: "Simple ask-and-answer"
  - Use case: "Quick queries, fact lookup"
  - Visual: A → B → A

  Pattern 2 - "Streaming":
  - Icon: Multiple arrows flowing
  - Description: "Continuous data flow"
  - Use case: "Long-running tasks, progress updates"
  - Visual: A → → → B (stream indicator)

  Pattern 3 - "Multi-Turn Dialog":
  - Icon: Conversation bubbles
  - Description: "Back-and-forth reasoning"
  - Use case: "Complex negotiations, clarifications"
  - Visual: A ↔ B ↔ A ↔ B

  Pattern 4 - "Broadcast":
  - Icon: One to many arrows
  - Description: "One agent to many"
  - Use case: "Coordination, announcements"
  - Visual: A → [B, C, D]

SECTION 4 - MULTI-AGENT WORKFLOWS:
- Color: Green (#22C55E)
- Title: "Building Agent Teams"
- Large workflow diagram:

  TOP: "User Request" bubble
  - "Plan my trip to Japan"

  MIDDLE: Orchestrator agent (larger icon)
  - Label: "Planning Orchestrator"
  - Connected to 4 specialist agents:

    Agent 1: "Flight Agent" (airplane icon)
    - "Search flights, compare prices"
    
    Agent 2: "Hotel Agent" (building icon)
    - "Find accommodations"
    
    Agent 3: "Activity Agent" (ticket icon)
    - "Discover experiences"
    
    Agent 4: "Budget Agent" (calculator icon)
    - "Track costs, optimize spend"

  Arrows showing delegation and results flowing back

  BOTTOM: "Complete Itinerary" result
  - Shows synthesized output from all agents

SECTION 5 - A2A vs ALTERNATIVES:
- Color: Indigo (#6366F1)
- Title: "A2A Compared"
- Comparison table:

  | Feature | A2A | Direct API | Message Queue |
  |---------|-----|------------|---------------|
  | Discovery | ✅ Agent Cards | ❌ Manual | ❌ Manual |
  | Semantics | ✅ Rich context | ❌ Raw data | ❌ Raw data |
  | Reasoning | ✅ Both sides | ❌ Server only | ❌ Neither |
  | State | ✅ Conversational | ❌ Stateless | ⚠️ Limited |
  | Security | ✅ Built-in | ⚠️ Custom | ⚠️ Custom |

SECTION 6 - SECURITY & TRUST:
- Color: Red (#EF4444)
- Title: "A2A Security Model"
- Trust hierarchy pyramid:

  TOP (Highest Trust): "Verified Agents"
  - Cryptographic identity
  - Audit trail
  - Reputation scores

  MIDDLE: "Authenticated Agents"
  - OAuth2 / API key
  - Known endpoints
  - Capability verification

  BOTTOM (Base): "Discovery Layer"
  - Agent registries
  - Capability advertisements
  - Initial handshake

  Side panel - "Security Features":
  🔐 End-to-end encryption
  🔑 Mutual authentication
  📝 Request signing
  🛡️ Rate limiting
  📊 Audit logging

SECTION 7 - MCP + A2A INTEGRATION:
- Color: Teal (#14B8A6)
- Title: "The Complete Picture: MCP + A2A"
- Unified architecture diagram:

  TOP: "User / Application"

  MIDDLE LAYER: "Primary Agent"
  - Uses MCP for tools (database, files, APIs)
  - Uses A2A for agent collaboration

  LEFT BRANCH (MCP):
  - Arrow to: Database, File System, External APIs
  - Label: "Tool Integration"

  RIGHT BRANCH (A2A):
  - Arrow to: Research Agent, Code Agent, Analysis Agent
  - Label: "Agent Collaboration"

  BOTTOM: Combined outputs merge into final response

  Key insight callout: "MCP = Tools, A2A = Teammates"

SECTION 8 - GETTING STARTED:
- Color: Purple (#8B5CF6)
- Title: "Implement A2A in Your Agent"
- 3-step guide:

  Step 1: "Create Agent Card"
  - Small JSON snippet
  
  Step 2: "Implement A2A Endpoint"
  - Small code snippet (Python/TypeScript)
  
  Step 3: "Register & Discover"
  - Registry URL and command

FOOTER:
- "A2A Specification: github.com/google/a2a-protocol"
- "Open Agent School: openagentschool.org/concepts/a2a"
- Logos: Google DeepMind, Open Agent School
- QR code to A2A docs

DECORATIVE ELEMENTS:
- Agent avatar icons scattered in margins
- Connection lines forming network pattern
- Gradient overlays on section transitions
- Small conversation bubble accents
```

---

## Usage Notes

This infographic helps visual learners understand:
1. How A2A differs from MCP (agents vs tools)
2. The discovery and handshake process
3. Agent Card structure
4. Communication patterns (request-response, streaming, etc.)
5. Multi-agent workflow orchestration
6. How A2A and MCP complement each other

Color coding: Blue (discovery), Purple (structure), Orange (patterns), Green (workflows), Red (security), Teal (integration)
