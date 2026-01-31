# Tool Use & Function Calling - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with toolbox pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Modern Tool Use: Function Calling for AI Agents" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with subtle gear/tool pattern
- Flow diagram style showing request-response cycles
- Primary color: Orange (#F97316) with blue accents (#3B82F6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Wrench/tool visual motif throughout

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Modern Tool Use" in large bold text
- Subtitle: "Function Calling for AI Agents"
- Tagline: "Giving LLMs the ability to act"
- Icon: Wrench combined with code brackets
- Badge: "Core Agent Capability"

HERO VISUAL - THE TOOL USE PARADIGM:
- Before/After comparison:

  LEFT: "LLM Without Tools"
  - Brain icon with text output only
  - "I can tell you about the weather..."
  - Limited to text generation

  RIGHT: "LLM With Tools"
  - Brain icon connected to multiple tools
  - "Let me check the current weather for you"
  - Can take actions, fetch data

  Arrow: "Tool Use = Actions, not just words"

SECTION 1 - THE FUNCTION CALLING FLOW:
- Color: Blue (#3B82F6)
- Title: "How Function Calling Works"
- 5-step horizontal flow:

  Step 1: "User Query"
  - "What's the weather in Tokyo?"
  - User icon with speech bubble

  Step 2: "LLM Decides to Call Tool"
  - LLM analyzes intent
  - Selects appropriate function
  - Outputs JSON: {"name": "get_weather", "args": {"city": "Tokyo"}}

  Step 3: "Application Executes Function"
  - Your code runs the actual function
  - Calls weather API
  - Gets result

  Step 4: "Result Sent Back to LLM"
  - {"temperature": 22, "conditions": "sunny"}
  - LLM incorporates result

  Step 5: "LLM Generates Response"
  - "It's currently 22°C and sunny in Tokyo!"
  - Natural language response to user

SECTION 2 - TOOL DEFINITION ANATOMY:
- Color: Purple (#8B5CF6)
- Title: "Defining Tools for LLMs"
- Large code block with annotations:

  ```json
  {
    "name": "get_weather",
    "description": "Get current weather for a city",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string",
          "description": "City name"
        },
        "units": {
          "type": "string",
          "enum": ["celsius", "fahrenheit"],
          "default": "celsius"
        }
      },
      "required": ["city"]
    }
  }
  ```

  Callout annotations:
  - name → "Unique identifier LLM will use"
  - description → "CRITICAL: LLM reads this to decide when to call"
  - parameters → "JSON Schema for arguments"
  - required → "Which params are mandatory"

  Pro tip box: "Clear descriptions = better tool selection"

SECTION 3 - TOOL TYPES:
- Color: Green (#22C55E)
- Title: "Categories of Tools"
- 6 category cards:

  Card 1 - "🔍 Information Retrieval":
  - Web search, database queries
  - Examples: "search_web(), query_db()"

  Card 2 - "📁 File Operations":
  - Read, write, list files
  - Examples: "read_file(), save_file()"

  Card 3 - "💻 Code Execution":
  - Run Python, JavaScript
  - Examples: "run_python(), execute_code()"

  Card 4 - "🌐 API Calls":
  - External services
  - Examples: "call_api(), send_email()"

  Card 5 - "🧮 Calculations":
  - Math, conversions
  - Examples: "calculate(), convert_units()"

  Card 6 - "👤 User Interaction":
  - Confirmations, input collection
  - Examples: "ask_user(), confirm_action()"

SECTION 4 - PARALLEL & SEQUENTIAL CALLING:
- Color: Orange (#F97316)
- Title: "Tool Calling Patterns"
- Pattern comparison:

  Pattern 1 - "Sequential Calling":
  - Visual: Tool A → Tool B → Tool C
  - When: "Each tool depends on previous result"
  - Example: "Search → Read → Summarize"
  - Note: "Slower but necessary for dependencies"

  Pattern 2 - "Parallel Calling":
  - Visual: [Tool A, Tool B, Tool C] simultaneous
  - When: "Tools are independent"
  - Example: "Get weather in 3 cities"
  - Note: "Faster, but must be independent"

  Pattern 3 - "Conditional Calling":
  - Visual: Tool A → if/else → [Tool B or Tool C]
  - When: "Next tool depends on result"
  - Example: "Check stock → buy if available"

SECTION 5 - MCP VS NATIVE FUNCTION CALLING:
- Color: Indigo (#6366F1)
- Title: "Tool Integration Approaches"
- Comparison table:

  | Approach | Setup | Security | Portability |
  |----------|-------|----------|-------------|
  | Native Function Calling | ⭐⭐⭐⭐⭐ Easy | ⚠️ In-process | ❌ Model-specific |
  | MCP Tools | ⭐⭐⭐ Medium | ✅ Sandboxed | ✅ Universal |
  | LangChain Tools | ⭐⭐⭐⭐ Easy | ⚠️ Framework | ⚠️ Framework-specific |

  Decision guide:
  - Simple use case → Native function calling
  - Multi-host, secure → MCP
  - Rapid prototyping → LangChain

SECTION 6 - ERROR HANDLING:
- Color: Red (#EF4444)
- Title: "Handling Tool Failures"
- Error handling patterns:

  Error 1 - "Tool Not Found":
  - Symptom: "LLM calls undefined tool"
  - Fix: "Return error, let LLM retry with valid tool"
  - Code: "return {'error': 'Unknown tool: xyz'}"

  Error 2 - "Invalid Arguments":
  - Symptom: "Wrong types or missing required"
  - Fix: "Validate against schema, return helpful error"
  - Code: "return {'error': 'city is required'}"

  Error 3 - "Execution Failure":
  - Symptom: "API timeout, exception"
  - Fix: "Return error message, LLM can try alternative"
  - Code: "return {'error': 'Weather API unavailable'}"

  Error 4 - "Unexpected Result":
  - Symptom: "Empty or malformed data"
  - Fix: "Normalize before returning to LLM"

  Key insight: "Always return errors as data, never crash"

SECTION 7 - BEST PRACTICES:
- Color: Teal (#14B8A6)
- Title: "Tool Use Best Practices"
- Checklist:

  ✅ "Write Clear Descriptions"
  - LLM uses descriptions to decide when to call
  - Be specific about inputs and outputs

  ✅ "Keep Tools Focused"
  - One tool = one action
  - Avoid Swiss-army-knife tools

  ✅ "Validate Inputs"
  - Don't trust LLM-generated arguments
  - Sanitize before execution

  ✅ "Return Structured Data"
  - JSON is best
  - Include success/error status

  ✅ "Log Everything"
  - Tool calls, inputs, outputs, timing
  - Essential for debugging

  ✅ "Set Timeouts"
  - Prevent hanging tools
  - Return timeout errors gracefully

  ✅ "Limit Tool Count"
  - <15 tools per context
  - Too many confuses the LLM

SECTION 8 - CODE EXAMPLE:
- Color: Blue (#3B82F6)
- Title: "Implementing Tool Use"
- Code snippet:

  ```python
  # 1. Define tools
  tools = [
      {
          "name": "get_weather",
          "description": "Get weather for a city",
          "parameters": {...}
      }
  ]

  # 2. Call LLM with tools
  response = llm.chat(
      messages=messages,
      tools=tools
  )

  # 3. Check if LLM wants to call a tool
  if response.tool_calls:
      for call in response.tool_calls:
          result = execute_tool(call.name, call.args)
          messages.append({"role": "tool", "content": result})
      
      # 4. Get final response
      response = llm.chat(messages=messages)
  ```

FOOTER:
- "Learn more: openagentschool.org/patterns/modern-tool-use"
- Open Agent School logo
- "Tools transform LLMs from talkers to doers"
- QR code to tutorial

DECORATIVE ELEMENTS:
- Wrench and gear icons in margins
- JSON brackets as visual accents
- Request/response arrow motifs
- Tool category icons scattered
```

---

## Usage Notes

This infographic teaches tool use for visual learners:

1. The paradigm shift from text-only to tool-enabled LLMs
2. The 5-step function calling flow
3. How to define tools with JSON Schema
4. Categories of tools
5. Sequential vs parallel calling patterns
6. Comparison of integration approaches
7. Error handling strategies
8. Best practices checklist

Color coding: Blue (flow), Purple (definition), Green (types), Orange (patterns), Indigo (comparison), Red (errors), Teal (best practices)
