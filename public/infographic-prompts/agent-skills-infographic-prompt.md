# Agent Skills & Capabilities - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "Agent Skills & Capabilities" using Flat UI Style 2.0.

HEADER SECTION (Purple #8B5CF6):
- Large title: "Agent Skills & Capabilities"
- Subtitle: "The Building Blocks of Intelligent Agents"
- Icon: Toolbox with AI brain and various skill icons

SECTION 1 - SKILL TAXONOMY (Blue #3B82F6):
Title: "The Agent Skill Stack"
Pyramid diagram from base to top:
- Base: "Core LLM" - Language understanding, generation
- Level 2: "Reasoning" - Chain-of-thought, planning
- Level 3: "Memory" - Context, long-term storage
- Level 4: "Tools" - External capabilities
- Level 5: "Orchestration" - Multi-step workflows
- Top: "Autonomy" - Self-directed behavior

SECTION 2 - TOOL CATEGORIES (Green #22C55E):
Title: "Essential Tool Types"
Icon grid with categories:
🔍 "Search & Retrieval" - Web search, RAG, vector DB
📁 "File Operations" - Read, write, create, delete
💻 "Code Execution" - Python, shell, sandboxed runtime
🌐 "API Calls" - REST, GraphQL, external services
🗄️ "Database" - Query, update, schema operations
📧 "Communication" - Email, Slack, notifications
📊 "Data Analysis" - Charts, statistics, processing
🖼️ "Media" - Image, audio, video processing

SECTION 3 - SKILL COMPOSITION (Orange #F97316):
Title: "Composing Complex Skills"
Flow showing skill composition:
Simple Skills → Compound Skills → Workflows → Autonomous Behaviors
Examples:
- "Search" + "Summarize" = "Research Assistant"
- "Code" + "Test" + "Debug" = "Developer Agent"
- "Analyze" + "Visualize" + "Report" = "Data Analyst"
- "Plan" + "Execute" + "Monitor" = "Project Manager"

SECTION 4 - REASONING SKILLS (Teal #14B8A6):
Title: "Cognitive Capabilities"
Brain diagram with skill regions:
- "Chain-of-Thought" - Step-by-step reasoning
- "ReAct" - Reason + Act loops
- "Reflection" - Self-critique and improvement
- "Planning" - Break down complex tasks
- "Hypothesis Testing" - Form and test theories
- "Analogical Reasoning" - Apply knowledge to new domains

SECTION 5 - MEMORY SKILLS (Purple #8B5CF6):
Title: "Memory Architecture"
Memory types diagram:
| Type | Duration | Use Case |
|------|----------|----------|
| Working Memory | Session | Current conversation |
| Episodic | Long-term | Past interactions |
| Semantic | Permanent | Facts and knowledge |
| Procedural | Permanent | How to do things |
Each with icon: 💭 📝 📚 ⚙️

SECTION 6 - COMMUNICATION SKILLS (Blue #3B82F6):
Title: "Agent Communication"
Communication channels:
- "Human ↔ Agent" - Natural language, structured prompts
- "Agent ↔ Agent" - A2A protocol, message passing
- "Agent ↔ Tool" - Function calls, MCP
- "Agent ↔ Environment" - Observe, act, feedback loop
Bidirectional arrows between each pair

SECTION 7 - SKILL MATURITY MODEL (Indigo #6366F1):
Title: "Skill Development Levels"
Maturity ladder:
Level 1: "Prompted" - Needs explicit instructions
Level 2: "Guided" - Follows patterns with hints
Level 3: "Autonomous" - Self-directs within domain
Level 4: "Adaptive" - Learns and improves
Level 5: "Creative" - Invents new approaches
Star icon on current state: "Most agents are L2-L3"

SECTION 8 - SKILL CONFIGURATION (Green #22C55E):
Title: "Defining Agent Skills"
Code-style skill definition:
```
skill:
  name: "research_topic"
  description: "Research and summarize a topic"
  tools:
    - web_search
    - read_url
    - summarize
  parameters:
    - topic: string
    - depth: "shallow" | "deep"
  output: "markdown_report"
```
Note: "Skills are composable and declarative"

SECTION 9 - SKILL REGISTRY (Orange #F97316):
Title: "Skill Discovery & Sharing"
Registry architecture:
[Skill Registry] ← Register → [Agent Developers]
       ↓
   [Discover]
       ↓
[Runtime Agents] → [Execute Skills]
Features: "Version control, permissions, usage analytics"

FOOTER (Dark background):
- Key insight: "Skills are the atoms—agents are the molecules"
- Callout: "Design skills for reuse and composition"
- Open Agent School logo

DESIGN NOTES:
- Use modular, building-block visual metaphors
- Show skills as Lego-like pieces that connect
- Include icons representing each skill type
- Use layered diagrams to show composition
- Add code/technical elements for skill definitions
- Create sense of modularity and extensibility
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #8B5CF6 | Skills theme |
| Skill Stack | #3B82F6 | Taxonomy pyramid |
| Tool Categories | #22C55E | Tool types |
| Composition | #F97316 | Skill building |
| Reasoning | #14B8A6 | Cognitive skills |
| Memory | #8B5CF6 | Memory types |
| Communication | #3B82F6 | Channels |
| Maturity | #6366F1 | Development levels |
| Configuration | #22C55E | Definition |
| Registry | #F97316 | Discovery |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. The hierarchical skill stack for AI agents
2. Essential categories of agent tools
3. How to compose simple skills into complex capabilities
4. Reasoning skills that enable intelligent behavior
5. Memory architecture for maintaining context
6. Communication patterns between agents, humans, and tools
7. Skill maturity levels and development progression
8. How to define and configure agent skills
9. Skill registries for discovery and sharing
