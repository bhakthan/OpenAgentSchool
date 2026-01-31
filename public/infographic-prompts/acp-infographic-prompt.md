# Agent Communication Protocol (ACP) - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "Agent Communication Protocol (ACP)" using Flat UI Style 2.0.

HEADER SECTION (Indigo #6366F1):
- Large title: "Agent Communication Protocol (ACP)"
- Subtitle: "Real-Time Streaming for Multi-Agent Systems"
- Icon: Two agent avatars with streaming data connection

SECTION 1 - WHAT IS ACP (Blue #3B82F6):
Title: "ACP at a Glance"
Key differentiator box:
"Unlike A2A (request-response), ACP enables:"
- ✓ Real-time bidirectional streaming
- ✓ Multimodal data (text, images, audio)
- ✓ Continuous collaboration sessions
- ✓ Built-in context synchronization
IBM logo note: "Developed by IBM Research"

SECTION 2 - A2A vs ACP (Orange #F97316):
Title: "A2A vs ACP Comparison"
Side-by-side comparison:
| Feature | A2A (Google) | ACP (IBM) |
|---------|--------------|-----------|
| Communication | Request-Response | Streaming |
| Data Flow | Discrete messages | Continuous |
| Multimodal | Limited | Native support |
| Session State | Per-request | Persistent |
| Latency | Higher | Real-time |
| Use Case | Task delegation | Collaboration |
Visual: Message packets vs flowing stream

SECTION 3 - ARCHITECTURE (Purple #8B5CF6):
Title: "ACP Architecture"
Layered architecture diagram:
[Agent A] ←──── ACP Channel ────→ [Agent B]
     ↓                                  ↓
[Session Manager]              [Session Manager]
     ↓                                  ↓
[Context Store]                [Context Store]
     ↓                                  ↓
[Tool Registry]                [Tool Registry]
Bidirectional arrows showing: "Events, Data, Commands"

SECTION 4 - MESSAGE TYPES (Green #22C55E):
Title: "ACP Message Taxonomy"
Message type hierarchy:
📨 "Control Messages"
  - session_start, session_end
  - capability_query, capability_response
📝 "Content Messages"  
  - text_chunk, image_data, audio_stream
  - structured_data, file_transfer
🔧 "Action Messages"
  - tool_request, tool_result
  - context_update, state_sync
📊 "Meta Messages"
  - heartbeat, ack, error

SECTION 5 - STREAMING PATTERNS (Teal #14B8A6):
Title: "Real-Time Streaming"
Streaming flow visualization:
Agent A: [Token] [Token] [Token] → → →
Agent B: ← ← ← [Token] [Token] [Token]
         ↑ Bidirectional ↓
Features:
- "Chunk-level streaming" - Character by character
- "Backpressure handling" - Flow control
- "Partial result processing" - Act on incomplete data
- "Stream interruption" - Cancel mid-stream

SECTION 6 - MULTIMODAL SUPPORT (Purple #8B5CF6):
Title: "Beyond Text"
Multimodal data types:
🔤 "Text" - Natural language, code, structured
🖼️ "Images" - Screenshots, diagrams, photos
🎵 "Audio" - Voice, sound, music
🎥 "Video" - Screen recordings, live feeds
📁 "Files" - Documents, data files
🔢 "Structured" - JSON, tables, graphs
Data encoding note: "Base64, streaming chunks, references"

SECTION 7 - SESSION MANAGEMENT (Blue #3B82F6):
Title: "Collaborative Sessions"
Session lifecycle:
[Create] → [Join] → [Collaborate] → [Suspend] → [Resume] → [Close]
Session features:
- "Persistent context" - Remembers conversation history
- "Participant management" - Add/remove agents
- "Role assignment" - Leader, participant, observer
- "State checkpoints" - Save and restore

SECTION 8 - USE CASES (Orange #F97316):
Title: "When to Use ACP"
Use case cards:
🤝 "Pair Programming" - Two coding agents collaborating in real-time
🎯 "Brainstorming" - Multiple agents generating ideas together  
🔍 "Distributed Analysis" - Agents analyzing data streams
🎮 "Interactive Simulations" - Agents in shared environments
📞 "Voice Agents" - Real-time speech-to-speech
🎨 "Creative Collaboration" - Agents co-creating content

SECTION 9 - IMPLEMENTATION (Green #22C55E):
Title: "Implementing ACP"
Code-style snippet:
```
# ACP Session Setup
session = acp.create_session(
    agents=["analyst", "writer"],
    mode="collaborative",
    streaming=True
)

# Send streaming message
async for chunk in agent.stream():
    session.broadcast(chunk)
    
# Receive from peers
async for msg in session.receive():
    process(msg)
```
Frameworks: "BeeAI, LangGraph, Custom SDKs"

SECTION 10 - MCP + ACP + A2A (Indigo #6366F1):
Title: "The Protocol Ecosystem"
Venn diagram showing:
- "MCP" - Agent ↔ Tool/Context
- "A2A" - Agent ↔ Agent (tasks)
- "ACP" - Agent ↔ Agent (streaming)
Overlap: "Complete multi-agent infrastructure"
Note: "Complementary, not competing"

FOOTER (Dark background):
- Key insight: "ACP = Real-time collaboration between AI agents"
- Callout: "The future of agents is collaborative and streaming"
- Open Agent School logo

DESIGN NOTES:
- Show streaming/flow visually (lines, waves)
- Use connection/network iconography
- Contrast with A2A discrete messages
- Include audio/video icons for multimodal
- Show bidirectional data flows
- Create modern, IBM-influenced design aesthetic
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #6366F1 | ACP branding |
| Overview | #3B82F6 | Introduction |
| Comparison | #F97316 | A2A vs ACP |
| Architecture | #8B5CF6 | System design |
| Messages | #22C55E | Taxonomy |
| Streaming | #14B8A6 | Real-time patterns |
| Multimodal | #8B5CF6 | Data types |
| Sessions | #3B82F6 | Lifecycle |
| Use Cases | #F97316 | Applications |
| Implementation | #22C55E | Code |
| Ecosystem | #6366F1 | Protocol relationship |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. What ACP is and how it differs from A2A
2. Key comparison between request-response vs streaming
3. ACP architecture and components
4. Message types in the ACP protocol
5. Real-time streaming patterns and features
6. Multimodal data support
7. Session management for persistent collaboration
8. Ideal use cases for ACP
9. How to implement ACP in agent systems
10. How ACP fits with MCP and A2A
