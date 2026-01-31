# Agent Memory Systems - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with subtle horizontal lines

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Memory Systems: The 5-Layer Memory Hierarchy" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background (#FFFFFF) with faint horizontal ruled lines
- Layered vertical design showing memory hierarchy
- Primary colors per layer (see below)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Gradient fade between layers showing depth

LAYOUT (Top to Bottom, 5 Memory Layers):

HEADER:
- Title: "Agent Memory Systems" in large bold navy text
- Subtitle: "From Milliseconds to Permanent Storage"
- Icon: Brain with database symbol
- Decorative: Small memory chip illustrations

LAYER 1 - WORKING MEMORY (Top, Fastest):
- Color: Red/coral (#EF4444) with light red background
- Visual: Lightning bolt icon + "Context Window" label
- Capacity: "128K-200K tokens"
- Persistence: "⚡ Milliseconds"
- Description card: "In-context conversation history and scratchpad"
- Use cases badges: "Current Task", "Reasoning Scratchpad", "Immediate Context"
- Visual metaphor: RAM chip icon or sticky note
- Width: Narrowest layer (shows limited capacity)

LAYER 2 - SHORT-TERM MEMORY:
- Color: Amber (#F59E0B) with light orange background
- Visual: Chat bubble icon + "Conversation State" label
- Capacity: "Session-scoped"
- Persistence: "💬 Minutes to Hours"
- Description: "Maintains context across conversation turns"
- Use cases: "Multi-turn Dialogue", "Task Tracking", "Session State"
- Visual metaphor: Notepad or whiteboard
- Width: Slightly wider than Layer 1

LAYER 3 - LONG-TERM MEMORY:
- Color: Green (#22C55E) with light green background
- Visual: Database icon + "Vector Store / Database" label
- Capacity: "Millions of records"
- Persistence: "💾 Days to Months"
- Description: "Persistent storage with semantic retrieval (RAG)"
- Use cases: "User Preferences", "Historical Context", "Knowledge Base"
- Technologies: Small logos/badges for "Pinecone", "Chroma", "Weaviate"
- Visual metaphor: Filing cabinet or hard drive
- Width: Wide layer

LAYER 4 - EPISODIC MEMORY:
- Color: Blue (#3B82F6) with light blue background
- Visual: Book/diary icon + "Past Experiences" label
- Capacity: "Unlimited experiences"
- Persistence: "📖 Permanent"
- Description: "Remembers specific interactions and their outcomes"
- Use cases: "What worked before?", "Similar Problems", "User History"
- Visual metaphor: Photo album or journal
- Width: Same as Layer 3

LAYER 5 - SEMANTIC MEMORY (Bottom, Most Persistent):
- Color: Purple (#8B5CF6) with light purple background
- Visual: Brain network icon + "Knowledge & Facts" label
- Capacity: "Domain knowledge graphs"
- Persistence: "🧠 Permanent"
- Description: "Abstract knowledge, concepts, and relationships"
- Use cases: "Domain Expertise", "Ontologies", "Concept Relationships"
- Technologies: Badges for "Neo4j", "Knowledge Graphs"
- Visual metaphor: Neural network or concept map
- Width: Widest layer (foundational)

BIDIRECTIONAL ARROWS between layers:
- Left side: "↓ Store" arrows going down (purple)
- Right side: "↑ Retrieve" arrows going up (green)
- Labels: "Consolidation" (store), "Recall" (retrieve)

SIDE PANEL - MEMORY OPERATIONS:
- Box showing key operations:
  - 📥 Encode: Transform input to storable format
  - 🔍 Retrieve: Find relevant memories
  - 🔄 Consolidate: Move from short to long-term
  - 🗑️ Forget: Prune irrelevant memories
  - 📊 Summarize: Compress for efficiency

BOTTOM SECTION - IMPLEMENTATION PATTERNS:
- 3 architecture cards side by side:

Card 1: "Sliding Window"
- Icon: Window frame
- Description: "Keep last N messages in context"
- Best for: "Simple chatbots"

Card 2: "RAG Pipeline"
- Icon: Search + database
- Description: "Retrieve relevant context on demand"
- Best for: "Knowledge-intensive tasks"

Card 3: "Memory Graph"
- Icon: Network nodes
- Description: "Store relationships between entities"
- Best for: "Complex reasoning"

FOOTER:
- Open Agent School logo (graduation cap)
- URL: www.openagentschool.org
- Tagline: "Build Agents That Remember"
- Subtle purple gradient bar

VISUAL POLISH:
- Each layer should have a subtle 3D depth effect (layered cards)
- Soft shadows between layers
- Consistent iconography style (outlined, 2px stroke)
- Add small data packet animations flowing between layers
- Time indicators on right edge showing persistence duration
- Color gradient from warm (top/fast) to cool (bottom/persistent)
```

---

## Expected Output

A tall, layered infographic showing the complete memory hierarchy:

1. **Working Memory** - Fast, limited, in-context
2. **Short-Term Memory** - Session-scoped conversation state
3. **Long-Term Memory** - Persistent vector/database storage
4. **Episodic Memory** - Experience-based recall
5. **Semantic Memory** - Abstract knowledge and relationships

Visual learners should immediately understand the trade-offs between speed, capacity, and persistence.

---

## File Output

Save generated image as:

```text
/public/images/infographics/agent-memory-systems-infographic.png
```
