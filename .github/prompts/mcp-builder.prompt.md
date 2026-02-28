---
name: mcp-builder
description: |
  Build MCP (Model Context Protocol) servers that enable LLMs to interact with external services. Use this skill when:
  - Creating a new MCP server for integration with the platform or external APIs
  - Building educational MCP server examples for concept pages
  - Adding MCP server capabilities to the backend microservices
  - Implementing tools, resources, or prompts per the MCP specification
  - Testing MCP servers with the MCP Inspector
  - Building TypeScript or Python MCP servers
---

# MCP Server Builder

Guide for creating high-quality MCP (Model Context Protocol) servers — both as educational examples for the learning platform and as real integrations for the OpenAgentSchool ecosystem.

## Overview

OpenAgentSchool teaches MCP as a core concept (see `src/components/concepts/MCPConcept.tsx`). This skill serves dual purposes:

1. **Educational**: Build example MCP servers that learners can study and run
2. **Practical**: Build MCP servers that integrate with the platform's backend services

```
Plan → Implement → Test → Document → (Optional: Evaluate)
  │        │          │        │              │
  │        │          │        │              └─ Create eval questions
  │        │          │        └─ README + concept page integration
  │        │          └─ MCP Inspector + integration tests
  │        └─ Tools, resources, prompts per MCP spec
  └─ API research, schema design, tool selection
```

---

## Recommended Stack

| Language | Framework | When to Use |
|----------|-----------|-------------|
| **TypeScript** (recommended) | `@modelcontextprotocol/sdk` | New standalone MCP servers, broad compatibility |
| **Python** | `mcp` (FastMCP) | Backend integration with existing FastAPI services |

---

## Phase 1: Plan

### 1.1 Understand the MCP Spec

Key resources:
- **Spec**: `https://modelcontextprotocol.io/specification/draft`
- **TypeScript SDK**: `https://github.com/modelcontextprotocol/typescript-sdk`
- **Python SDK**: `https://github.com/modelcontextprotocol/python-sdk`

### 1.2 Design Tools

For each tool, define:

```typescript
// Tool design template
{
  name: "descriptive_action_name",    // e.g., "search_concepts", "get_quiz_questions"
  description: "What this tool does",  // Clear, concise — LLMs read this
  inputSchema: { /* Zod or JSON Schema */ },
  outputSchema: { /* structured response */ },
  annotations: {
    readOnlyHint: true,               // Does it only read data?
    destructiveHint: false,           // Can it delete/modify data?
    idempotentHint: true,             // Safe to retry?
  }
}
```

### 1.3 Tool Naming Convention

Use consistent prefixes scoped to the service:

```
openagent_search_concepts      // Knowledge/discovery
openagent_get_quiz_questions   // Quiz API
openagent_submit_quiz          // Quiz submission
openagent_get_progress         // Progress tracking
orchestrator_analyze_thinking  // Critical thinking
knowledge_semantic_search      // Semantic search
```

---

## Phase 2: Implement

### TypeScript MCP Server (Standalone)

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "openagent-school",
  version: "1.0.0",
});

// Example: Search concepts tool
server.registerTool(
  "search_concepts",
  {
    description: "Search learning concepts by keyword, category, or prerequisite",
    inputSchema: {
      keyword: z.string().optional().describe("Search term"),
      category: z.string().optional().describe("Concept category filter"),
    },
    outputSchema: {
      concepts: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
      })),
    },
  },
  async ({ keyword, category }) => {
    // Implementation: query ConceptsHub data or core-api
    const results = await searchConcepts(keyword, category);
    return {
      structuredContent: { concepts: results },
      content: [{ type: "text", text: `Found ${results.length} concepts` }],
    };
  }
);
```

### Python MCP Server (FastAPI Integration)

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("openagent-school")

@mcp.tool()
async def search_concepts(keyword: str = "", category: str = "") -> list[dict]:
    """Search learning concepts by keyword or category.
    
    Args:
        keyword: Search term to match against concept titles and descriptions
        category: Filter by concept category (e.g., 'architecture', 'patterns')
    """
    # Implementation: query the concept registry
    results = await concept_service.search(keyword=keyword, category=category)
    return [{"id": c.id, "title": c.title, "description": c.description} for c in results]
```

---

## Phase 3: Test

### MCP Inspector

```bash
# TypeScript
npx @modelcontextprotocol/inspector node dist/index.js

# Python
npx @modelcontextprotocol/inspector python server.py
```

### Integration Test Pattern

```typescript
import { describe, it, expect } from 'vitest';

describe('MCP Server', () => {
  it('search_concepts returns results for valid keyword', async () => {
    const result = await callTool('search_concepts', { keyword: 'agent' });
    expect(result.concepts.length).toBeGreaterThan(0);
    expect(result.concepts[0]).toHaveProperty('id');
    expect(result.concepts[0]).toHaveProperty('title');
  });

  it('search_concepts returns empty for nonexistent term', async () => {
    const result = await callTool('search_concepts', { keyword: 'xyznonexistent' });
    expect(result.concepts).toHaveLength(0);
  });
});
```

---

## Phase 4: Document

Every MCP server should include:

1. **README.md** — what it does, how to install, how to configure
2. **Tool reference** — table of all tools with descriptions and schemas
3. **Configuration example** — VS Code MCP settings JSON snippet
4. **Educational notes** — if this server is a learning example, explain the patterns

### VS Code Configuration Snippet

```json
{
  "mcp": {
    "servers": {
      "openagent-school": {
        "command": "node",
        "args": ["path/to/dist/index.js"],
        "env": {
          "CORE_API_URL": "http://localhost:8000"
        }
      }
    }
  }
}
```

---

## MCP Servers Relevant to OpenAgentSchool

### Already Configured (in copilot-instructions.md)

| Server | Purpose |
|--------|---------|
| Playwright MCP | Browser testing and visual regression |
| PostgreSQL MCP | Knowledge-service database queries |
| Redis MCP | Agent-orchestrator cache inspection |

### Potential New Servers

| Server | Tools It Would Expose | Integration Point |
|--------|----------------------|-------------------|
| **Concept Explorer** | `search_concepts`, `get_prerequisites`, `get_learning_path` | ConceptsHub data |
| **Quiz Engine** | `get_questions`, `submit_answer`, `get_score` | Core API quiz endpoints |
| **Knowledge Search** | `semantic_search`, `upload_document`, `get_similar` | Knowledge Service |
| **Progress Tracker** | `get_progress`, `update_progress`, `get_achievements` | Core API progress endpoints |

---

## Quality Checklist

```
□ Every tool has a clear, descriptive name and description
□ Input schemas use Zod (TS) or Pydantic (Python) with field descriptions
□ Output schemas are defined for structured responses
□ Error messages are actionable ("API key missing — set OPENAI_API_KEY env var")
□ Read-only tools are annotated as readOnlyHint: true
□ Destructive operations require confirmation patterns
□ Pagination is supported for list operations
□ README includes VS Code MCP config snippet
□ Tests cover happy path and error cases
```

---

## Rules

1. **Clear tool descriptions** — LLMs read them to decide which tool to use
2. **Structured output** — prefer JSON schemas over free-text responses
3. **Actionable errors** — "Missing API key" not "Internal error"
4. **Read-only by default** — annotate tools correctly; destructive operations need care
5. **Test with Inspector** — always verify tools work before integrating
6. **Document the config** — users need to know how to add your server to their editor
7. **Educational value** — if the MCP server is a learning example, explain the design choices
