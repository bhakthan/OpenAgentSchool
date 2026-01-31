# Agent Reasoning Patterns - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (7680×4320)
- **Orientation**: Landscape (16:9)
- **Background**: Light (#F8FAFC) with subtle 8px dot grid pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Reasoning Patterns: How AI Thinks Step-by-Step" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- Light gray background (#F8FAFC) with faint dot grid
- Primary purple (#8B5CF6) for AI/agent elements
- Green (#22C55E) for successful outcomes
- Blue (#3B82F6) for process flows
- Amber (#F59E0B) for decision points
- Red (#EF4444) for error/pruning paths
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (8px radius) on all shapes
- Thin connecting lines (2px) with arrow markers

LAYOUT (Left to Right, 4 Main Sections):

SECTION 1 - CHAIN-OF-THOUGHT (CoT):
- Visual: Linear horizontal chain of 6 connected circles
- Each circle numbered 1→2→3→4→5→6
- Arrows connecting each step
- Color: Blue circles with white numbers
- Label: "Chain-of-Thought (CoT)"
- Subtitle: "Linear Step-by-Step Reasoning"
- Icon: Arrow pointing right
- Key traits in small badges: "Simple", "Interpretable", "Low Cost"
- Example thought bubble: "Step 1: Understand → Step 2: Break down → Step 3: Solve → Step 4: Verify"

SECTION 2 - TREE-OF-THOUGHT (ToT):
- Visual: Branching tree structure starting from single root
- Root expands to 3 branches, each branch to 2 more
- Some branches marked with red X (pruned paths)
- One path highlighted in green (selected solution)
- Color: Purple nodes with connecting branches
- Label: "Tree-of-Thought (ToT)"
- Subtitle: "Explore Multiple Paths, Prune Bad Ones"
- Icon: Tree/branch icon
- Key traits: "Backtracking", "Parallel Exploration", "Self-Evaluation"
- Visual annotation showing "Prune" with scissors icon on bad paths

SECTION 3 - GRAPH-OF-THOUGHT (GoT):
- Visual: Non-linear graph with nodes and crossing connections
- Multiple paths converge at "merge" nodes (diamond shapes)
- Show feedback loops with curved arrows
- Some nodes connect backwards (non-linear flow)
- Color: Teal/cyan nodes with multi-directional edges
- Label: "Graph-of-Thought (GoT)"
- Subtitle: "Non-Linear Reasoning with Merging"
- Icon: Network/graph icon
- Key traits: "Flexible Paths", "Merge Solutions", "Complex Problems"
- Annotation showing "Merge" operation where 2 paths combine

SECTION 4 - REFLEXION:
- Visual: Circular loop with 4 stages
- Stages: "Act" → "Observe" → "Reflect" → "Learn" → back to "Act"
- Center shows iteration counter "Attempt #3"
- Memory bank icon connected to the loop
- Color: Orange/amber for the cycle
- Label: "Reflexion"
- Subtitle: "Learn from Mistakes, Improve Each Try"
- Icon: Refresh/cycle icon
- Key traits: "Self-Correction", "Memory", "Iterative Improvement"
- Show memory snippets: "Previous Error: X", "New Strategy: Y"

COMPARISON TABLE at bottom:
Create a 5-column comparison table:
| Pattern | Complexity | Token Cost | Use Case | Best For |
| CoT | ★☆☆ | Low | Step-by-step | Math, Logic |
| ToT | ★★☆ | Medium | Multi-path | Planning, Strategy |
| GoT | ★★★ | High | Non-linear | Research, Analysis |
| Reflexion | ★★☆ | Medium | Iterative | Code Generation |

HEADER:
- Title: "Agent Reasoning Patterns" in large bold text
- Subtitle: "From Linear Thinking to Self-Correcting Loops"
- Small brain icon with sparkles

FOOTER:
- Open Agent School logo (graduation cap icon)
- URL: www.openagentschool.org
- Tagline: "Master AI Agent Development"
- Light purple gradient bar

VISUAL POLISH:
- Subtle shadows under each section card
- Consistent 40px padding between sections
- Icons should be 32x32px outlined style
- Use connecting dotted lines between related concepts
- Add small "🧠" emoji near AI reasoning elements
- Include arrows showing information flow direction
```

---

## Expected Output

A clean, educational poster showing the four major reasoning patterns used by AI agents:

1. **Chain-of-Thought** - Linear sequential reasoning
2. **Tree-of-Thought** - Branching exploration with pruning
3. **Graph-of-Thought** - Non-linear paths with merging
4. **Reflexion** - Iterative self-improvement loop

The infographic should be immediately understandable by visual learners and serve as a quick reference for choosing the right reasoning pattern.

---

## File Output

Save generated image as:

```text
/public/images/infographics/agent-reasoning-patterns-infographic.png
```
