# Multi-Agent Systems - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with constellation pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Multi-Agent Systems: Orchestrating AI Teams" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background (#FFFFFF) with constellation/network pattern
- Team/organization chart visualization style
- Primary color: Deep blue (#1E40AF) with accent colors for each agent type
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Connection lines showing agent relationships

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Multi-Agent Systems" in large bold text
- Subtitle: "From Solo Agents to Collaborative AI Teams"
- Icon: Multiple robot heads connected in network
- Badge: "Architecture Patterns for 2026"

HERO VISUAL - SINGLE vs MULTI-AGENT:
- Two-panel comparison:

  LEFT: "Single Agent"
  - One large agent icon
  - Many arrows pointing to it (overloaded)
  - Labels: "Jack of all trades"
  - Cons: "Context overload", "Single point of failure", "Limited specialization"

  RIGHT: "Multi-Agent System"
  - Multiple smaller agent icons in organized structure
  - Clean delegation lines
  - Labels: "Specialized experts"
  - Pros: "Focused context", "Parallel execution", "Modular design"

SECTION 1 - ORCHESTRATION PATTERNS:
- Color: Blue (#3B82F6)
- Title: "4 Core Orchestration Patterns"
- 2x2 grid of pattern cards:

  Card 1 - "Supervisor":
  - Visual: Star topology (one center, many spokes)
  - Description: "Central coordinator delegates and synthesizes"
  - Use case: "Task decomposition, result aggregation"
  - Pros: "Clear control", "Easy debugging"
  - Cons: "Bottleneck risk"

  Card 2 - "Hierarchical":
  - Visual: Tree structure (layers of managers)
  - Description: "Multiple levels of supervision"
  - Use case: "Complex enterprises, large teams"
  - Pros: "Scalable", "Departmentalized"
  - Cons: "Communication overhead"

  Card 3 - "Peer-to-Peer":
  - Visual: Mesh network (all connected to all)
  - Description: "Agents communicate directly"
  - Use case: "Collaborative problem-solving"
  - Pros: "No bottleneck", "Resilient"
  - Cons: "Coordination complexity"

  Card 4 - "Pipeline":
  - Visual: Linear chain (A → B → C → D)
  - Description: "Sequential processing stages"
  - Use case: "Document processing, data pipelines"
  - Pros: "Simple flow", "Predictable"
  - Cons: "No parallelism"

SECTION 2 - AGENT SPECIALIZATION:
- Color: Purple (#8B5CF6)
- Title: "Agent Roles in a Team"
- Circular role diagram with 6 roles:

  🎯 ORCHESTRATOR (Center):
  - "Coordinates workflow"
  - "Assigns tasks"
  - "Synthesizes results"

  Surrounding roles (clockwise):

  🔬 RESEARCHER:
  - "Information gathering"
  - "Web search, RAG"
  - Color: Green

  ✍️ WRITER:
  - "Content creation"
  - "Documentation"
  - Color: Blue

  🔍 REVIEWER:
  - "Quality assurance"
  - "Fact-checking"
  - Color: Orange

  💻 CODER:
  - "Implementation"
  - "Code generation"
  - Color: Indigo

  📊 ANALYST:
  - "Data processing"
  - "Insights extraction"
  - Color: Teal

  🛡️ VALIDATOR:
  - "Security checks"
  - "Compliance"
  - Color: Red

SECTION 3 - COMMUNICATION MECHANISMS:
- Color: Teal (#14B8A6)
- Title: "How Agents Communicate"
- 3 mechanism cards:

  Mechanism 1 - "Shared State":
  - Icon: Database/blackboard
  - How: "Agents read/write to common memory"
  - Pros: "Simple, async"
  - Visual: Multiple agents pointing to central store

  Mechanism 2 - "Message Passing":
  - Icon: Envelope/chat bubbles
  - How: "Direct agent-to-agent messages"
  - Pros: "Explicit, traceable"
  - Visual: Arrows between agent pairs

  Mechanism 3 - "Event Bus":
  - Icon: Radio tower/broadcast
  - How: "Publish-subscribe pattern"
  - Pros: "Decoupled, scalable"
  - Visual: Central bus with multiple subscribers

SECTION 4 - WORKFLOW EXAMPLE:
- Color: Green (#22C55E)
- Title: "Multi-Agent Workflow: Research Report"
- Horizontal timeline/swimlane:

  Stage 1: "User Request"
  - "Write a report on quantum computing trends"

  Stage 2: "Orchestrator"
  - Decomposes into tasks
  - Arrows to 3 agents

  Stage 3 (Parallel):
  - Researcher: "Gathers sources"
  - Analyst: "Identifies trends"
  - Writer: "Creates outline"

  Stage 4: "Synthesizer"
  - Combines all inputs
  - Creates draft

  Stage 5: "Reviewer"
  - Quality check
  - Fact verification

  Stage 6: "Final Output"
  - Polished report delivered

SECTION 5 - FRAMEWORKS:
- Color: Indigo (#6366F1)
- Title: "Multi-Agent Frameworks (2026)"
- Framework comparison cards:

  Card 1 - "AutoGen":
  - Logo placeholder
  - "Microsoft Research"
  - "Conversational agents"
  - Key feature: "Flexible conversation patterns"

  Card 2 - "CrewAI":
  - Logo placeholder
  - "Role-based agents"
  - Key feature: "Agent crews with defined roles"

  Card 3 - "LangGraph":
  - Logo placeholder
  - "LangChain"
  - "Graph-based workflows"
  - Key feature: "Stateful, cyclical graphs"

  Card 4 - "Semantic Kernel":
  - Logo placeholder
  - "Microsoft"
  - "Enterprise orchestration"
  - Key feature: "Planner + plugins"

SECTION 6 - CHALLENGES & SOLUTIONS:
- Color: Orange (#F97316)
- Title: "Multi-Agent Challenges"
- Problem/Solution pairs:

  Challenge 1: "Context Explosion"
  - Problem: "Each agent needs context"
  - Solution: "Summarization, selective sharing"
  - Icon: Compression symbol

  Challenge 2: "Coordination Overhead"
  - Problem: "Agents waiting on each other"
  - Solution: "Async execution, timeouts"
  - Icon: Clock with gears

  Challenge 3: "Conflicting Outputs"
  - Problem: "Agents disagree"
  - Solution: "Voting, arbitration agent"
  - Icon: Balance scale

  Challenge 4: "Debugging Complexity"
  - Problem: "Hard to trace issues"
  - Solution: "Structured logging, traces"
  - Icon: Magnifying glass

SECTION 7 - BEST PRACTICES:
- Color: Blue (#3B82F6)
- Title: "Multi-Agent Best Practices"
- Checklist style:

  ✅ Start simple (2-3 agents), scale gradually
  ✅ Define clear agent responsibilities
  ✅ Use structured output formats (JSON)
  ✅ Implement timeout and retry logic
  ✅ Log all inter-agent communication
  ✅ Build in human escalation paths
  ✅ Test agents individually before composing
  ✅ Monitor token usage per agent

FOOTER:
- "Learn more: openagentschool.org/concepts/multi-agent-systems"
- Open Agent School logo
- QR code to multi-agent tutorials

DECORATIVE ELEMENTS:
- Constellation lines connecting sections
- Agent avatar icons in margins
- Gradient backgrounds per section
- Small robot/AI icons as accents
```

---

## Usage Notes

This infographic covers multi-agent systems for visual learners:
1. Why multi-agent over single agent
2. The 4 core orchestration patterns
3. Agent role specialization
4. Communication mechanisms
5. Real workflow example
6. Popular frameworks comparison
7. Common challenges and solutions

Color coding: Blue (patterns), Purple (roles), Teal (communication), Green (workflows), Indigo (frameworks), Orange (challenges)
