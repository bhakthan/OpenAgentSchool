# Prompt Engineering for Agents - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with chat bubble pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Prompt Engineering for AI Agents" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with faint chat bubble pattern
- Template/blueprint visualization style
- Primary color: Purple (#8B5CF6) with orange accents (#F97316)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Speech bubble and template visual motifs

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Prompt Engineering for Agents" in large bold text
- Subtitle: "Crafting Instructions That Work"
- Tagline: "Better prompts = Better agents"
- Icon: Chat bubble with code/template inside
- Badge: "Foundation Skill"

HERO VISUAL - THE PROMPT ANATOMY:
- Large dissected prompt showing sections:

  ```
  [ROLE] You are an expert research assistant...
  
  [CONTEXT] The user is researching...
  
  [INSTRUCTIONS] Your task is to...
  
  [CONSTRAINTS] You must NOT...
  
  [OUTPUT FORMAT] Respond in JSON...
  
  [EXAMPLES] Example input: ... Example output: ...
  ```

  Callout annotations explaining each section's purpose

SECTION 1 - THE 6 COMPONENTS OF AGENT PROMPTS:
- Color: Purple (#8B5CF6)
- Title: "Agent Prompt Anatomy"
- 6 component cards:

  Card 1 - "👤 Role/Persona":
  - What: "Define who the agent is"
  - Example: "You are a senior software engineer..."
  - Impact: "Sets expertise level and perspective"

  Card 2 - "📋 Context":
  - What: "Provide background information"
  - Example: "The user is debugging a React app..."
  - Impact: "Grounds responses in situation"

  Card 3 - "🎯 Task Instructions":
  - What: "What the agent should do"
  - Example: "Analyze the code and identify bugs..."
  - Impact: "Defines success criteria"

  Card 4 - "🚫 Constraints":
  - What: "What the agent must NOT do"
  - Example: "Do not execute code without confirmation..."
  - Impact: "Safety and scope limits"

  Card 5 - "📐 Output Format":
  - What: "How to structure responses"
  - Example: "Respond in JSON: {analysis, fixes, confidence}"
  - Impact: "Enables parsing and consistency"

  Card 6 - "📝 Examples (Few-Shot)":
  - What: "Show correct input-output pairs"
  - Example: "Input: X → Output: Y"
  - Impact: "Demonstrates desired behavior"

SECTION 2 - SYSTEM vs USER vs ASSISTANT:
- Color: Blue (#3B82F6)
- Title: "Message Roles Explained"
- 3-lane diagram:

  Lane 1 - "SYSTEM":
  - Color: Gray
  - Purpose: "Agent personality, capabilities, rules"
  - Visibility: "Hidden from end users"
  - When to use: "Set once, rarely changes"
  - Example: "You are a helpful coding assistant..."

  Lane 2 - "USER":
  - Color: Blue
  - Purpose: "Human input, questions, requests"
  - Visibility: "Visible to everyone"
  - When to use: "Every human message"
  - Example: "Help me fix this bug"

  Lane 3 - "ASSISTANT":
  - Color: Green
  - Purpose: "Agent's responses, tool calls"
  - Visibility: "Visible to everyone"
  - When to use: "Agent responses, few-shot examples"
  - Example: "I found the issue. Here's the fix..."

  Arrow showing conversation flow: System → [User ↔ Assistant loop]

SECTION 3 - PROMPTING TECHNIQUES:
- Color: Orange (#F97316)
- Title: "Advanced Prompting Techniques"
- Technique cards:

  Technique 1 - "Chain-of-Thought (CoT)":
  - What: "Ask agent to show reasoning steps"
  - Prompt: "Think step by step before answering"
  - Best for: "Complex reasoning tasks"

  Technique 2 - "Few-Shot Learning":
  - What: "Provide examples of desired behavior"
  - Prompt: "Here are examples: [Input→Output]..."
  - Best for: "Format and style consistency"

  Technique 3 - "ReAct Prompting":
  - What: "Interleave reasoning and actions"
  - Prompt: "For each step: Thought, Action, Observation"
  - Best for: "Tool-using agents"

  Technique 4 - "Self-Consistency":
  - What: "Generate multiple paths, vote on answer"
  - Prompt: "Provide 3 different approaches..."
  - Best for: "High-stakes decisions"

  Technique 5 - "Structured Output":
  - What: "Constrain output to JSON/XML"
  - Prompt: "Respond with valid JSON: {schema}"
  - Best for: "Programmatic parsing"

SECTION 4 - AGENT-SPECIFIC PROMPTING:
- Color: Green (#22C55E)
- Title: "Prompts for Agentic Behaviors"
- Agentic prompt patterns:

  Pattern 1 - "Tool Selection":
  - "You have access to these tools: [list]"
  - "Choose the appropriate tool for each step"
  - Tip: "Include clear tool descriptions"

  Pattern 2 - "Error Recovery":
  - "If a tool fails, try an alternative approach"
  - "Explain what went wrong and your recovery strategy"
  - Tip: "Anticipate common failures"

  Pattern 3 - "Goal Decomposition":
  - "Break complex tasks into subtasks"
  - "Complete each subtask before moving on"
  - Tip: "Set checkpoints and validation"

  Pattern 4 - "Human Escalation":
  - "If unsure or high-risk, ask for confirmation"
  - "Never proceed with destructive actions without approval"
  - Tip: "Define escalation triggers"

SECTION 5 - COMMON MISTAKES:
- Color: Red (#EF4444)
- Title: "Prompt Anti-Patterns"
- Warning cards:

  ❌ "Vague Instructions":
  - Bad: "Help the user"
  - Good: "Answer coding questions with explained solutions"

  ❌ "Missing Constraints":
  - Bad: (no limits)
  - Good: "Do not access external URLs without permission"

  ❌ "Overloaded Context":
  - Bad: 50,000 token system prompt
  - Good: Concise, focused instructions

  ❌ "Conflicting Instructions":
  - Bad: "Be brief" + "Explain in detail"
  - Good: Clear priority when conflicts arise

  ❌ "No Error Handling":
  - Bad: (assumes everything works)
  - Good: "If you encounter X, do Y"

SECTION 6 - PROMPT TEMPLATES:
- Color: Indigo (#6366F1)
- Title: "Ready-to-Use Templates"
- Template cards:

  Template 1 - "Research Agent":
  ```
  You are a research analyst.
  Given a topic, search for information,
  synthesize findings, and cite sources.
  Format: {summary, key_findings[], sources[]}
  ```

  Template 2 - "Code Assistant":
  ```
  You are a senior developer.
  Help with code questions.
  Always explain your reasoning.
  Format code with syntax highlighting.
  ```

  Template 3 - "Task Manager":
  ```
  You help break down projects.
  Create actionable task lists.
  Estimate time for each task.
  Flag dependencies and blockers.
  ```

SECTION 7 - TESTING & ITERATION:
- Color: Teal (#14B8A6)
- Title: "Prompt Development Workflow"
- Iterative cycle:

  Step 1: "Draft"
  - Write initial prompt
  - Include all 6 components

  Step 2: "Test"
  - Run on diverse inputs
  - Edge cases and adversarial

  Step 3: "Evaluate"
  - Score outputs
  - Identify failure modes

  Step 4: "Refine"
  - Fix failure patterns
  - Add constraints/examples

  Step 5: "Version"
  - Track prompt versions
  - A/B test in production

  Arrow connecting Step 5 back to Step 2

  Tip: "Keep a prompt changelog"

FOOTER:
- "Learn more: openagentschool.org/concepts/prompt-engineering"
- Open Agent School logo
- "Good prompts are iterated, not written"
- QR code to prompt library

DECORATIVE ELEMENTS:
- Chat bubble icons in margins
- Template/document motifs
- Before/after comparison snippets
- Technique icons scattered
```

---

## Usage Notes

This infographic teaches prompt engineering for agents:

1. The 6 essential components of agent prompts
2. System vs User vs Assistant message roles
3. Advanced prompting techniques (CoT, few-shot, ReAct)
4. Agent-specific prompt patterns
5. Common mistakes to avoid
6. Ready-to-use templates
7. Prompt development workflow

Color coding: Purple (anatomy), Blue (roles), Orange (techniques), Green (agentic), Red (mistakes), Indigo (templates), Teal (workflow)
