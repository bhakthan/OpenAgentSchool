# Agent Architecture - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with blueprint grid pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "AI Agent Architecture: Building Blocks" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with faint blueprint grid pattern
- Component/block diagram visualization style
- Primary color: Deep blue (#1E40AF) with multi-color component accents
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- LEGO-style building block visual motif

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "AI Agent Architecture" in large bold text
- Subtitle: "The Anatomy of an Intelligent Agent"
- Tagline: "Understanding the core components"
- Icon: Robot blueprint schematic
- Badge: "Foundational Knowledge"

HERO VISUAL - THE AGENT STACK:
- Large vertical stack diagram showing layers:

  TOP LAYER: "User Interface"
  - Chat, voice, API
  - Color: Light blue

  LAYER 2: "Agent Core (Brain)"
  - LLM + Reasoning + Memory
  - Color: Purple (most prominent)
  - Central to everything

  LAYER 3: "Tool Layer"
  - MCP Servers, APIs, Functions
  - Color: Orange

  LAYER 4: "Knowledge Layer"
  - RAG, Vector DBs, Knowledge Graphs
  - Color: Green

  BOTTOM LAYER: "Infrastructure"
  - Compute, Observability, Security
  - Color: Gray

  Arrows showing data flow up and down the stack

SECTION 1 - THE 6 CORE COMPONENTS:
- Color: Gradient per component
- Title: "Agent Building Blocks"
- 6 component cards in 2x3 grid:

  Card 1 - "🧠 LLM (The Reasoner)":
  - Color: Purple
  - Role: "Makes decisions, generates responses"
  - Examples: "GPT-4, Claude, Gemini, Llama"
  - Key insight: "The 'brain' but not the whole agent"

  Card 2 - "🔧 Tools (The Hands)":
  - Color: Orange
  - Role: "Execute actions in the world"
  - Examples: "Search, code execution, APIs"
  - Key insight: "Extends capabilities beyond text"

  Card 3 - "💾 Memory (The Record)":
  - Color: Blue
  - Role: "Stores context across interactions"
  - Types: "Working, episodic, semantic"
  - Key insight: "Enables continuity and learning"

  Card 4 - "📚 Knowledge (The Library)":
  - Color: Green
  - Role: "Provides domain expertise"
  - Examples: "RAG, vector stores, docs"
  - Key insight: "Grounds responses in facts"

  Card 5 - "🎯 Planning (The Strategy)":
  - Color: Indigo
  - Role: "Decomposes goals into steps"
  - Patterns: "ReAct, Plan-and-Execute"
  - Key insight: "Enables complex task completion"

  Card 6 - "🛡️ Guardrails (The Safety)":
  - Color: Red
  - Role: "Prevents harmful actions"
  - Examples: "Content filters, permission checks"
  - Key insight: "Essential for production"

SECTION 2 - THE AGENTIC LOOP:
- Color: Blue (#3B82F6)
- Title: "How Agents Process Requests"
- Horizontal flow diagram:

  Step 1: "📩 Input"
  - User message or trigger
  - Preprocessing/validation

  Step 2: "🔍 Retrieve"
  - Fetch relevant context
  - Memory + Knowledge lookup

  Step 3: "🤔 Reason"
  - LLM processes everything
  - Decides next action

  Step 4: "⚡ Act"
  - Execute tool if needed
  - Generate response

  Step 5: "👁️ Observe"
  - Get action results
  - Update context

  Step 6: "🔄 Iterate"
  - Loop if more work needed
  - Or return final response

  Circular arrow connecting Step 6 back to Step 2

SECTION 3 - ARCHITECTURE PATTERNS:
- Color: Indigo (#6366F1)
- Title: "Common Agent Architectures"
- 4 pattern diagrams:

  Pattern 1 - "Single Agent":
  - Visual: One brain with tools
  - Use case: "Simple tasks"
  - Complexity: ⭐

  Pattern 2 - "Agent + Router":
  - Visual: Router dispatching to specialized agents
  - Use case: "Multi-domain tasks"
  - Complexity: ⭐⭐

  Pattern 3 - "Supervisor Pattern":
  - Visual: Manager agent coordinating workers
  - Use case: "Complex workflows"
  - Complexity: ⭐⭐⭐

  Pattern 4 - "Swarm/Network":
  - Visual: Mesh of interconnected agents
  - Use case: "Emergent collaboration"
  - Complexity: ⭐⭐⭐⭐

SECTION 4 - LLM SELECTION:
- Color: Purple (#8B5CF6)
- Title: "Choosing Your LLM"
- Comparison matrix:

  | Model | Reasoning | Speed | Cost | Context |
  |-------|-----------|-------|------|---------|
  | GPT-4o | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $$$$ | 128K |
  | Claude 3.5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $$$ | 200K |
  | Gemini 2.0 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $$ | 2M |
  | Llama 3 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $ | 128K |

  Callout: "Match model to task requirements"

SECTION 5 - TOOL INTEGRATION:
- Color: Orange (#F97316)
- Title: "Connecting Tools to Agents"
- Integration diagram:

  CENTER: "Agent Core"

  Connected to:
  - "MCP Servers" (left)
    - Local tools
    - Secure access
  - "Direct APIs" (right)
    - External services
    - HTTP calls
  - "Function Calling" (top)
    - LLM-native tools
    - JSON schema
  - "Code Execution" (bottom)
    - Python sandbox
    - Jupyter kernels

  Each with example tools listed

SECTION 6 - MEMORY ARCHITECTURE:
- Color: Blue (#3B82F6)
- Title: "Agent Memory Design"
- Layered memory visualization:

  Layer 1 (Fast): "Context Window"
  - Current conversation
  - ~100K tokens
  - Ephemeral

  Layer 2 (Session): "Conversation Buffer"
  - Session state
  - Summarized
  - Persistent per session

  Layer 3 (Long-term): "Vector Store"
  - Historical context
  - Semantic retrieval
  - Persistent

  Layer 4 (Permanent): "Knowledge Graph"
  - Relationships
  - Facts
  - Structured

  Arrows showing flow between layers

SECTION 7 - DEPLOYMENT CONSIDERATIONS:
- Color: Teal (#14B8A6)
- Title: "Production Agent Checklist"
- Checklist with icons:

  ✅ "Observability"
  - Logging, tracing, metrics

  ✅ "Error Handling"
  - Retries, fallbacks, graceful degradation

  ✅ "Rate Limiting"
  - Token budgets, request caps

  ✅ "Security"
  - Auth, input validation, sandboxing

  ✅ "Testing"
  - Unit, integration, eval suites

  ✅ "Scalability"
  - Horizontal scaling, caching

FOOTER:
- "Learn more: openagentschool.org/concepts/agent-architecture"
- Open Agent School logo
- "Start simple, add complexity as needed"
- QR code to architecture guide

DECORATIVE ELEMENTS:
- Blueprint grid lines
- Component block icons
- Connection arrows and lines
- Stack/layer visual accents
```

---

## Usage Notes

This infographic teaches agent architecture for visual learners:

1. The agent stack from UI to infrastructure
2. The 6 core components (LLM, tools, memory, knowledge, planning, guardrails)
3. The agentic processing loop
4. Common architecture patterns
5. LLM selection considerations
6. Tool integration approaches
7. Memory architecture design
8. Production deployment checklist

Color coding: Purple (LLM), Orange (tools), Blue (memory/loop), Green (knowledge), Indigo (patterns), Red (safety), Teal (deployment)
