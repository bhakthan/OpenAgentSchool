# Agent Testing & Benchmarks - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (7680×4320)
- **Orientation**: Landscape (16:9)
- **Background**: Light (#FFFBEB) with subtle amber tint

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Testing & Benchmarks: The Complete Evaluation Pipeline" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle shadows
- Light warm background (#FFFBEB) with subtle texture
- Amber/orange primary (#F59E0B) for testing theme
- Green (#22C55E) for passed tests
- Red (#EF4444) for failed tests
- Blue (#3B82F6) for metrics/data
- Purple (#8B5CF6) for benchmarks
- Sans-serif typography (Inter or SF Pro)
- Rounded corners (10px) on cards
- Test tube and checkmark iconography

LAYOUT (Pipeline Flow from Left to Right):

HEADER:
- Title: "Agent Testing & Benchmarks" in bold dark text
- Subtitle: "From Unit Tests to Production A/B Testing"
- Icon: Test tube with checkmark
- Badge: "Quality at Every Stage"

MAIN SECTION - CI/CD PIPELINE (Horizontal Flow):

Stage 1: "⚙️ SETUP"
- Icon: Gear/cog
- Color: Gray (#6B7280)
- Description: "Initialize test environment"
- Duration badge: "< 1s"
- Visual: Small terminal window

Stage 2: "🧪 UNIT TESTS"
- Icon: Test tube
- Color: Blue (#3B82F6)
- Description: "Fast, deterministic assertions"
- Duration badge: "< 30s"
- Example tests:
  - ✅ test_tool_selection
  - ✅ test_output_format
  - ✅ test_error_handling
- Metrics: "Coverage: 87%"

Stage 3: "🔗 INTEGRATION"
- Icon: Chain link
- Color: Purple (#8B5CF6)
- Description: "End-to-end scenario tests"
- Duration badge: "< 5min"
- Example tests:
  - ✅ test_full_conversation
  - ✅ test_tool_chain
  - ⚠️ test_edge_case (flaky)

Stage 4: "📊 BENCHMARKS"
- Icon: Bar chart
- Color: Amber (#F59E0B)
- Description: "Performance & quality metrics"
- Duration badge: "1-2 hours"
- Metrics cards:
  - "Accuracy: 94.2%"
  - "Latency: 847ms"
  - "Cost: $0.023/query"
  - "Safety: 99.1%"

Stage 5: "🛡️ SAFETY"
- Icon: Shield
- Color: Red (#EF4444)
- Description: "Security & compliance checks"
- Duration badge: "< 30min"
- Checks:
  - ✅ No harmful outputs
  - ✅ PII filtering active
  - ✅ Jailbreak resistant

Stage 6: "📋 REPORT"
- Icon: Clipboard
- Color: Green (#22C55E)
- Description: "Aggregate results"
- Duration badge: "< 1s"
- Output: "Ready for deploy ✓"

Connecting arrows between each stage with labels:
"Every Commit" → "Every PR" → "Nightly" → "Weekly" → "Continuous"

MIDDLE SECTION - EVALUATION METHODS (5 Cards):

Card 1: "Unit Evaluations"
- Icon: Checkbox
- Color: Blue outline
- Description: "Test specific capabilities with assertions"
- When: "Every commit"
- Example: `assert response.tool == "weather_api"`

Card 2: "Regression Tests"
- Icon: Refresh with arrow
- Color: Purple outline
- Description: "Compare against golden set of expected outputs"
- When: "Every PR"
- Visual: Before/after comparison

Card 3: "LLM-as-Judge"
- Icon: Gavel/judge
- Color: Amber outline
- Description: "Use LLM to score quality (1-5 scale)"
- When: "Nightly"
- Visual: Star rating (★★★★☆)

Card 4: "Benchmarks"
- Icon: Trophy
- Color: Gold outline
- Description: "Standardized test suites (GSM8K, HumanEval)"
- When: "Weekly"
- Visual: Progress bars

Card 5: "A/B Testing"
- Icon: Split arrow
- Color: Green outline
- Description: "Production traffic split, real user metrics"
- When: "Continuous"
- Visual: 50/50 split diagram

BOTTOM LEFT - TEST METRICS DASHBOARD:
- Grid showing key metrics:
  - Tests Passed: "47/50" (green)
  - Tests Failed: "3/50" (red)
  - Coverage: "87%" (blue bar)
  - Flaky Tests: "2" (amber warning)
- Visual: Pie chart showing pass/fail ratio

BOTTOM CENTER - EVALUATION DIMENSIONS:
- 4 dimension cards in a row:

Dimension 1: "✓ Task Success"
- "Did the agent complete the objective?"

Dimension 2: "⭐ Response Quality"
- "Accuracy, relevance, coherence"

Dimension 3: "⚡ Efficiency"
- "Token usage, latency, cost"

Dimension 4: "🛡️ Safety & Alignment"
- "No harmful outputs, follows guidelines"

BOTTOM RIGHT - OVERALL STATUS:
- Large status card:
  - Header: "Overall Status"
  - Status: "✅ PASSED" or "❌ FAILED"
  - Timestamp: "Last run: 5 min ago"
  - Button: "Deploy to Staging →"
- CI/CD badges (GitHub Actions, CircleCI style)

FOOTER:
- Open Agent School logo
- URL: www.openagentschool.org
- Tagline: "Ship Reliable Agents with Confidence"
- Amber gradient accent bar

VISUAL POLISH:
- Pipeline should look like a Gantt chart or CI/CD view
- Use connecting lines to show dependencies
- Green checkmarks for passing, red X for failing
- Progress bars for coverage and benchmark scores
- Status dots (green/amber/red) throughout
- Test tube icons scattered decoratively
```

---

## Expected Output

A pipeline-style infographic showing the complete agent evaluation workflow:

1. **Setup** → **Unit Tests** → **Integration** → **Benchmarks** → **Safety** → **Report**
2. Five evaluation methods: Unit, Regression, LLM-as-Judge, Benchmarks, A/B
3. Key metrics and overall status dashboard

Visual learners should understand how to build a comprehensive testing strategy for their agents.

---

## File Output

Save generated image as:

```text
/public/images/infographics/agent-testing-benchmarks-infographic.png
```
