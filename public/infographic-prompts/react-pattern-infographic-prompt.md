# ReAct Pattern - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with subtle loop pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "ReAct: Reasoning + Acting in AI Agents" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with subtle loop/cycle pattern
- Circular flow visualization style
- Primary color: Blue (#3B82F6) with orange accents (#F97316)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Thought bubble + action arrow visual motif

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "ReAct Pattern" in large bold text
- Subtitle: "Reasoning + Acting = Better Decisions"
- Tagline: "Think before you act, learn from what you observe"
- Icon: Brain with lightning bolt and wrench
- Citation: "Yao et al., 2022"
- Badge: "Foundation Agent Pattern"

HERO VISUAL - THE REACT LOOP:
- Large circular diagram with 3 segments:

  Segment 1 (Top, Blue): "THOUGHT 💭"
  - "Agent reasons about the situation"
  - "Plans next action"
  - "Reflects on observations"

  Segment 2 (Right, Orange): "ACTION ⚡"
  - "Agent executes a tool/action"
  - "Interacts with environment"
  - "Queries information"

  Segment 3 (Left, Green): "OBSERVATION 👁️"
  - "Agent receives feedback"
  - "Sees action results"
  - "Gathers new information"

  Center: "ReAct Cycle"
  Arrows connecting: Thought → Action → Observation → Thought

SECTION 1 - BEFORE vs AFTER REACT:
- Color: Gray/Blue comparison
- Title: "Why ReAct?"
- Side-by-side:

  LEFT: "Without ReAct"
  - Action → Action → Action → (failure)
  - "Acts blindly without thinking"
  - "Can't course-correct"
  - Result: "Gets stuck in loops"

  RIGHT: "With ReAct"
  - Thought → Action → Observe → Thought → Action
  - "Reasons at each step"
  - "Adapts to observations"
  - Result: "Recovers from errors"

SECTION 2 - THE ANATOMY OF A REACT STEP:
- Color: Purple (#8B5CF6)
- Title: "Inside a ReAct Iteration"
- Vertical flow with example:

  CONTEXT: "User asks: What's the population of Tokyo?"

  STEP 1 - THOUGHT:
  - "I need to find Tokyo's population"
  - "I should search for current statistics"
  - Visual: Thought bubble

  STEP 2 - ACTION:
  - "search('Tokyo population 2024')"
  - Visual: Function call with arrow

  STEP 3 - OBSERVATION:
  - "Results: Tokyo population is 13.96 million (2024)"
  - Visual: Return data card

  STEP 4 - THOUGHT:
  - "I found the answer"
  - "I can now respond to the user"

  FINAL: Response generated

SECTION 3 - REACT PROMPTING STRUCTURE:
- Color: Blue (#3B82F6)
- Title: "ReAct Prompt Template"
- Code/template visualization:

  ```
  You are an AI assistant that reasons step-by-step.

  Available tools:
  - search(query): Search the web
  - calculate(expression): Perform math
  - lookup(term): Look up a definition

  For each step, use this format:
  Thought: [Your reasoning about what to do next]
  Action: [tool_name(arguments)]
  Observation: [Result from the tool]
  ... (repeat as needed)
  Thought: [Final reasoning]
  Answer: [Your final response]
  ```

  Callouts pointing to each section explaining purpose

SECTION 4 - WHEN TO USE REACT:
- Color: Green (#22C55E)
- Title: "ReAct Use Cases"
- Use case cards:

  ✅ "Multi-Step Research"
  - "Finding information across sources"
  - Example: "Compare prices across websites"

  ✅ "Complex Calculations"
  - "Breaking down math problems"
  - Example: "Calculate compound interest"

  ✅ "Fact Verification"
  - "Checking claims against sources"
  - Example: "Verify a news headline"

  ✅ "API Orchestration"
  - "Chaining multiple API calls"
  - Example: "Book flight + hotel + car"

  ⚠️ "Not ideal for:"
  - Simple one-shot queries
  - Creative writing
  - Pure conversation

SECTION 5 - REACT vs OTHER PATTERNS:
- Color: Indigo (#6366F1)
- Title: "ReAct Compared"
- Comparison table:

  | Pattern | Reasoning | Acting | Best For |
  |---------|-----------|--------|----------|
  | Chain-of-Thought | ✅ | ❌ | Reasoning-only tasks |
  | Function Calling | ❌ | ✅ | Simple tool use |
  | ReAct | ✅ | ✅ | Complex multi-step |
  | Plan-and-Execute | ✅ (upfront) | ✅ | Long-horizon tasks |

SECTION 6 - IMPLEMENTATION TIPS:
- Color: Orange (#F97316)
- Title: "Implementing ReAct Effectively"
- Tip cards:

  Tip 1 - "Explicit Tool Descriptions":
  - "Give clear descriptions of what each tool does"
  - "Include expected inputs and outputs"

  Tip 2 - "Limit Iterations":
  - "Set max steps (5-10 typical)"
  - "Prevent infinite loops"

  Tip 3 - "Parse Actions Reliably":
  - "Use structured output (JSON) when possible"
  - "Fallback regex for text format"

  Tip 4 - "Handle Tool Errors":
  - "Return error messages as observations"
  - "Let agent reason about recovery"

  Tip 5 - "Log Everything":
  - "Record full Thought-Action-Observation chain"
  - "Essential for debugging"

SECTION 7 - CODE EXAMPLE:
- Color: Teal (#14B8A6)
- Title: "ReAct in Code"
- Simplified code block:

  ```python
  while not done and steps < max_steps:
      # 1. Generate thought + action
      response = llm(format_prompt(context))
      thought, action = parse_response(response)
      
      # 2. Execute action
      observation = execute_tool(action)
      
      # 3. Add to context
      context += f"Thought: {thought}\n"
      context += f"Action: {action}\n"
      context += f"Observation: {observation}\n"
      
      # 4. Check for final answer
      if is_final_answer(response):
          done = True
  ```

SECTION 8 - COMMON MISTAKES:
- Color: Red (#EF4444)
- Title: "ReAct Pitfalls"
- Warning cards:

  ❌ "Repetitive Actions"
  - Problem: "Agent tries same failing action"
  - Fix: "Track action history, detect loops"

  ❌ "Reasoning Drift"
  - Problem: "Thoughts become irrelevant"
  - Fix: "Periodically restate goal"

  ❌ "Over-Reasoning"
  - Problem: "Too much thought, no action"
  - Fix: "Encourage action when enough info"

  ❌ "Ignoring Observations"
  - Problem: "Agent doesn't use tool results"
  - Fix: "Prompt to reflect on observations"

FOOTER:
- "Learn more: openagentschool.org/patterns/react-agent"
- Open Agent School logo
- Paper citation: "ReAct: Synergizing Reasoning and Acting in Language Models"
- QR code to tutorial

DECORATIVE ELEMENTS:
- Thought bubbles floating in margins
- Lightning bolt action icons
- Eye observation symbols
- Cycle arrows connecting sections
```

---

## Usage Notes

This infographic teaches the ReAct pattern for visual learners:

1. The core Thought-Action-Observation cycle
2. Before/after comparison showing benefits
3. Anatomy of a single ReAct step with example
4. The prompt template structure
5. When to use (and when not to use) ReAct
6. Comparison with other patterns
7. Implementation tips and common mistakes

Color coding: Blue (core pattern), Purple (anatomy), Green (use cases), Indigo (comparison), Orange (tips), Teal (code), Red (pitfalls)
