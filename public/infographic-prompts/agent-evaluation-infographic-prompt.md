# Agent Evaluation - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with measurement grid pattern

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Evaluation: Measuring What Matters" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White background with faint measurement grid pattern
- Dashboard/metrics visualization style
- Primary color: Teal (#14B8A6) with purple accents (#8B5CF6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Chart/graph visual motifs throughout

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Agent Evaluation" in large bold text
- Subtitle: "Measuring Agent Performance Beyond Accuracy"
- Tagline: "What gets measured gets improved"
- Icon: Clipboard with checkmarks and star ratings
- Badge: "Essential for Production Agents"

HERO VISUAL - THE EVALUATION CHALLENGE:
- Visual metaphor:

  LEFT: "Traditional ML Evaluation"
  - Simple accuracy meter
  - Single number: "92% accurate"
  - Limited insight

  RIGHT: "Agent Evaluation"
  - Multi-dimensional dashboard
  - Task completion, reasoning, safety, cost, latency
  - Holistic assessment

  Center arrow: "Agents need multi-dimensional evaluation"

SECTION 1 - THE 5 EVALUATION DIMENSIONS:
- Color: Purple (#8B5CF6)
- Title: "5 Dimensions of Agent Quality"
- Pentagon/radar chart with 5 axes:

  Axis 1 - "Task Completion 🎯":
  - "Did the agent achieve the goal?"
  - Metrics: Success rate, partial completion

  Axis 2 - "Reasoning Quality 🧠":
  - "Was the thinking process sound?"
  - Metrics: Logical consistency, relevance

  Axis 3 - "Efficiency ⚡":
  - "How many steps/tokens used?"
  - Metrics: Latency, token count, API calls

  Axis 4 - "Safety 🛡️":
  - "Did it avoid harmful outputs?"
  - Metrics: Refusal rate, guardrail triggers

  Axis 5 - "User Satisfaction 👍":
  - "Would humans approve?"
  - Metrics: Thumbs up/down, NPS

SECTION 2 - EVALUATION METHODS:
- Color: Blue (#3B82F6)
- Title: "How to Evaluate Agents"
- 4 method cards in 2x2 grid:

  Card 1 - "Automated Benchmarks":
  - Icon: Robot with checklist
  - What: "Pre-built test suites"
  - Examples: "GAIA, AgentBench, SWE-Bench"
  - Pros: "Reproducible, scalable"
  - Cons: "May not match your use case"

  Card 2 - "LLM-as-Judge":
  - Icon: Judge gavel with AI
  - What: "Another LLM grades the agent"
  - Examples: "GPT-4 evaluating GPT-3.5"
  - Pros: "Flexible, cheap"
  - Cons: "Bias, consistency issues"

  Card 3 - "Human Evaluation":
  - Icon: Human reviewer
  - What: "Domain experts assess outputs"
  - Examples: "Turing test, blind review"
  - Pros: "Ground truth, nuanced"
  - Cons: "Slow, expensive"

  Card 4 - "Execution-Based":
  - Icon: Code running
  - What: "Run code, check outcomes"
  - Examples: "Unit tests, sandbox execution"
  - Pros: "Objective, verifiable"
  - Cons: "Only for code/structured output"

SECTION 3 - KEY METRICS DASHBOARD:
- Color: Green (#22C55E)
- Title: "Essential Agent Metrics"
- Dashboard-style visualization:

  Metric Panel 1 - "Success Rate":
  - Definition: "% of tasks fully completed"
  - Target: ">90%"
  - Visual: Progress bar

  Metric Panel 2 - "Steps to Completion":
  - Definition: "Average actions per task"
  - Target: "Lower is better"
  - Visual: Bar chart comparison

  Metric Panel 3 - "Token Efficiency":
  - Definition: "Tokens per successful task"
  - Target: "Minimize while maintaining quality"
  - Visual: Cost graph

  Metric Panel 4 - "Error Recovery Rate":
  - Definition: "% of errors agent recovers from"
  - Target: ">70%"
  - Visual: Recovery funnel

  Metric Panel 5 - "Hallucination Rate":
  - Definition: "% of outputs with false claims"
  - Target: "<5%"
  - Visual: Warning gauge

  Metric Panel 6 - "Latency P95":
  - Definition: "95th percentile response time"
  - Target: "Task-dependent"
  - Visual: Histogram

SECTION 4 - BENCHMARK LANDSCAPE:
- Color: Indigo (#6366F1)
- Title: "2026 Agent Benchmark Landscape"
- Benchmark comparison:

  GAIA:
  - Focus: "Real-world assistant tasks"
  - Tasks: 466
  - Difficulty: Multi-level

  AgentBench:
  - Focus: "Diverse environment interaction"
  - Tasks: 8 environments
  - Difficulty: Comprehensive

  SWE-Bench:
  - Focus: "Software engineering"
  - Tasks: Real GitHub issues
  - Difficulty: Expert-level

  WebArena:
  - Focus: "Web navigation"
  - Tasks: Browser-based
  - Difficulty: Real websites

  MINT-Bench:
  - Focus: "Multi-turn interaction"
  - Tasks: Tool use
  - Difficulty: Varied

  Callout: "No single benchmark covers everything - use multiple"

SECTION 5 - BUILDING YOUR EVALUATION SUITE:
- Color: Orange (#F97316)
- Title: "Custom Evaluation Workflow"
- Step-by-step process:

  Step 1: "Define Success Criteria"
  - "What does 'good' look like for your use case?"
  - Checkbox: "Task-specific rubric"

  Step 2: "Create Test Cases"
  - "Cover edge cases, happy paths, adversarial inputs"
  - Checkbox: "50+ diverse examples"

  Step 3: "Implement Automated Checks"
  - "JSON schema validation, regex, assertions"
  - Checkbox: "CI/CD integration"

  Step 4: "Add LLM Judge"
  - "Use GPT-4 or Claude to grade subjective quality"
  - Checkbox: "Calibrated prompts"

  Step 5: "Sample for Human Review"
  - "Spot check 5-10% of outputs"
  - Checkbox: "Expert annotators"

  Step 6: "Track Over Time"
  - "Regression detection, trend analysis"
  - Checkbox: "Dashboards & alerts"

SECTION 6 - EVALUATION PITFALLS:
- Color: Red (#EF4444)
- Title: "Common Evaluation Mistakes"
- Warning cards:

  ❌ "Overfitting to Benchmarks"
  - Problem: "Great on tests, poor in production"
  - Fix: "Use held-out, evolving test sets"

  ❌ "Ignoring Edge Cases"
  - Problem: "Works on happy path only"
  - Fix: "Adversarial testing"

  ❌ "Single Metric Focus"
  - Problem: "Optimizing one thing breaks others"
  - Fix: "Multi-dimensional scorecards"

  ❌ "Static Evaluation"
  - Problem: "Tests get stale"
  - Fix: "Regular test refresh"

  ❌ "Ignoring Cost"
  - Problem: "10x accuracy but 100x cost"
  - Fix: "Include efficiency metrics"

SECTION 7 - TOOLS & FRAMEWORKS:
- Color: Teal (#14B8A6)
- Title: "Evaluation Tooling (2026)"
- Tool categories:

  Tracing & Observability:
  - LangSmith, Phoenix, Langfuse

  LLM-as-Judge Frameworks:
  - RAGAS, TruLens, DeepEval

  Benchmark Suites:
  - GAIA, AgentBench, HumanEval

  Human Annotation:
  - Scale AI, Surge AI, Argilla

  A/B Testing:
  - Custom pipelines, feature flags

FOOTER:
- "Learn more: openagentschool.org/concepts/agent-evaluation"
- Open Agent School logo
- "Evaluation is not optional for production agents"
- QR code to evaluation guide

DECORATIVE ELEMENTS:
- Graph/chart icons in margins
- Checkmark and rating star motifs
- Dashboard widget mockups
- Gradient backgrounds per section
```

---

## Usage Notes

This infographic teaches agent evaluation for visual learners:

1. Why agents need multi-dimensional evaluation
2. The 5 key dimensions (task, reasoning, efficiency, safety, satisfaction)
3. Evaluation methods (benchmarks, LLM-judge, human, execution)
4. Essential metrics with targets
5. Benchmark landscape overview
6. Building custom evaluation suites
7. Common evaluation mistakes

Color coding: Purple (dimensions), Blue (methods), Green (metrics), Indigo (benchmarks), Orange (workflow), Red (pitfalls), Teal (tools)
