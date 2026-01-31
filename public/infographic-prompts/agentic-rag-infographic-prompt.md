# Agentic RAG - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with document/knowledge pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agentic RAG: Beyond Basic Retrieval" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with document pattern overlay
- Flow diagram style showing retrieval pipeline
- Primary color: Green (#22C55E) with blue accents (#3B82F6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Connecting arrows showing data flow

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Agentic RAG" in large bold text
- Subtitle: "Retrieval-Augmented Generation with Agent Intelligence"
- Tagline: "Retrieve smarter, not just harder"
- Icon: Magnifying glass with brain overlay
- Badge: "Beyond Naive RAG"

HERO VISUAL - NAIVE vs AGENTIC RAG:
- Side-by-side comparison:

  LEFT: "Naive RAG" (grayed out)
  - Query → Embed → Search → Retrieve → Generate
  - Linear, single-pass
  - Problems: "Returns noise", "Misses context", "Can't reason about gaps"

  RIGHT: "Agentic RAG" (highlighted)
  - Query → AGENT → (multiple retrieval cycles) → Generate
  - Iterative, intelligent
  - Benefits: "Refines queries", "Validates sources", "Fills knowledge gaps"

SECTION 1 - THE AGENTIC RAG LOOP:
- Color: Blue (#3B82F6)
- Title: "The Agentic RAG Cycle"
- Circular flow diagram:

  Step 1: "🤔 Query Analysis"
  - "Agent understands user intent"
  - "Identifies knowledge gaps"

  Step 2: "🔍 Strategic Retrieval"
  - "Chooses optimal search strategy"
  - "May decompose into sub-queries"

  Step 3: "📊 Result Evaluation"
  - "Assesses relevance of retrieved docs"
  - "Identifies missing information"

  Step 4: "🔄 Query Refinement"
  - "Reformulates if results are poor"
  - "Drills down or broadens scope"

  Step 5: "✅ Answer Synthesis"
  - "Combines relevant chunks"
  - "Cites sources"

  Center: "Agent Intelligence" (brain icon)
  - Arrows connecting all steps in cycle

SECTION 2 - AGENTIC CAPABILITIES:
- Color: Purple (#8B5CF6)
- Title: "What Makes RAG 'Agentic'?"
- 6 capability cards:

  Card 1 - "Query Decomposition":
  - Icon: Puzzle breaking apart
  - "Complex query → multiple sub-queries"
  - Example: "What's the market size for AI agents in healthcare?"
  - → "AI agent market size" + "Healthcare AI adoption" + "Intersection analysis"

  Card 2 - "Iterative Retrieval":
  - Icon: Refresh arrows
  - "Retrieve → Evaluate → Retrieve again"
  - "Agent decides when enough info gathered"

  Card 3 - "Source Validation":
  - Icon: Checkmark with magnifier
  - "Evaluates credibility, recency, relevance"
  - "Filters out noise and contradictions"

  Card 4 - "Gap Detection":
  - Icon: Missing puzzle piece
  - "Identifies what's still unknown"
  - "Formulates follow-up queries"

  Card 5 - "Multi-Index Search":
  - Icon: Multiple databases
  - "Searches across different knowledge bases"
  - "Vector + keyword + graph"

  Card 6 - "Context Assembly":
  - Icon: Building blocks
  - "Intelligently orders and combines chunks"
  - "Handles contradictions"

SECTION 3 - RETRIEVAL STRATEGIES:
- Color: Green (#22C55E)
- Title: "Agentic Retrieval Strategies"
- Strategy comparison:

  Strategy 1 - "Semantic Search":
  - Icon: Vector arrows
  - When: "Conceptual similarity needed"
  - How: "Embed query, find nearest neighbors"
  - Pros: "Handles synonyms, concepts"

  Strategy 2 - "Keyword/Hybrid":
  - Icon: Keyword tag
  - When: "Specific terms matter"
  - How: "BM25 + semantic fusion"
  - Pros: "Handles exact matches"

  Strategy 3 - "Graph Traversal":
  - Icon: Network nodes
  - When: "Relationships matter"
  - How: "Follow entity connections"
  - Pros: "Multi-hop reasoning"

  Strategy 4 - "Self-Query":
  - Icon: Filter funnel
  - When: "Structured metadata available"
  - How: "Generate SQL/filter from NL"
  - Pros: "Precise filtering"

  Agent callout: "Agent chooses strategy based on query type"

SECTION 4 - ARCHITECTURE DIAGRAM:
- Color: Indigo (#6366F1)
- Title: "Agentic RAG Architecture"
- Detailed system diagram:

  TOP: "User Query"

  MIDDLE (Agent Core):
  - Large agent box containing:
    - Query Analyzer
    - Retrieval Planner
    - Result Evaluator
    - Answer Synthesizer

  BOTTOM LEFT (Knowledge Sources):
  - Vector Store (embeddings)
  - Document Store (full text)
  - Knowledge Graph (relationships)
  - SQL Database (structured data)

  BOTTOM RIGHT (External):
  - Web Search API
  - Domain APIs

  Bidirectional arrows between agent and all sources
  Final arrow from Agent → Response

SECTION 5 - IMPLEMENTATION PATTERNS:
- Color: Orange (#F97316)
- Title: "Agentic RAG Patterns"
- Pattern cards:

  Pattern 1 - "Router Pattern":
  - "Agent decides which index to query"
  - Visual: Query → Router → [Index A | Index B | Index C]
  - Use case: "Multi-domain knowledge bases"

  Pattern 2 - "Recursive Retrieval":
  - "Summarize → Drill down → Retrieve details"
  - Visual: Document → Summaries → Chunks
  - Use case: "Large documents"

  Pattern 3 - "HyDE (Hypothetical Document)":
  - "Generate hypothetical answer → Use as query"
  - Visual: Query → Generate → Embed → Search
  - Use case: "Abstract questions"

  Pattern 4 - "Sub-Question Engine":
  - "Break complex query into sub-questions"
  - Visual: Query → [Q1, Q2, Q3] → Synthesize
  - Use case: "Multi-part questions"

SECTION 6 - QUALITY METRICS:
- Color: Teal (#14B8A6)
- Title: "Measuring Agentic RAG Quality"
- Metrics with visuals:

  📊 "Retrieval Precision"
  - "% of retrieved chunks that are relevant"
  - Target: >80%

  📊 "Retrieval Recall"
  - "% of relevant chunks that were retrieved"
  - Target: >90%

  📊 "Answer Faithfulness"
  - "Is answer grounded in retrieved docs?"
  - Target: 100% (no hallucination)

  📊 "Answer Completeness"
  - "Does answer address all aspects?"
  - Target: >90%

  📊 "Latency"
  - "Time to final answer"
  - Target: <5s for most queries

SECTION 7 - TOOLS & FRAMEWORKS:
- Color: Blue (#3B82F6)
- Title: "Agentic RAG Stack (2026)"
- Tool categories:

  Vector Stores:
  - Pinecone, Weaviate, Chroma, Qdrant

  Orchestration:
  - LangChain, LlamaIndex, Semantic Kernel

  Embeddings:
  - OpenAI, Cohere, Voyage AI

  Evaluation:
  - RAGAS, TruLens, LangSmith

FOOTER:
- "Learn more: openagentschool.org/patterns/agentic-rag"
- Open Agent School logo
- QR code to tutorial

DECORATIVE ELEMENTS:
- Document icons floating in margins
- Vector arrow patterns
- Search result mockups
- Gradient backgrounds per section
```

---

## Usage Notes

This infographic teaches Agentic RAG for visual learners:

1. The difference between naive and agentic RAG
2. The agentic retrieval cycle
3. Key agentic capabilities (decomposition, iteration, validation)
4. Retrieval strategy options
5. System architecture
6. Implementation patterns
7. Quality metrics and tooling

Color coding: Blue (core loop), Purple (capabilities), Green (strategies), Indigo (architecture), Orange (patterns), Teal (metrics)
