# Agent Cost Optimization - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (7680×4320)
- **Orientation**: Landscape (16:9)
- **Background**: Light (#F0FDF4) with subtle green tint

---

## Prompt

```text
Create a comprehensive educational infographic titled "Agent Cost Optimization: Save 50-90% on LLM Costs" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle shadows
- Light green-tinted background (#F0FDF4) 
- Green primary (#22C55E) for savings/success
- Red (#EF4444) for high costs
- Blue (#3B82F6) for routing/data
- Amber (#F59E0B) for caching
- Purple (#8B5CF6) for premium/expensive
- Sans-serif typography (Inter or SF Pro)
- Rounded corners (10px) on cards
- Dollar sign and arrow iconography
- Money-saving theme throughout

LAYOUT (Flow Diagram Style):

HEADER:
- Title: "Agent Cost Optimization" in bold dark text
- Subtitle: "From $15,000/month to $2,000/month - Same Quality"
- Icon: Dollar sign with downward arrow
- Before/After badge: "$15K → $2K" with green arrow
- Savings callout: "💰 Save 87%"

MAIN FLOW DIAGRAM (Left to Right):

INPUT SECTION (Left):
- Large icon: "📥 Requests"
- Label: "10,000 queries/day"
- Visual: Multiple request cards stacking
- Color: Blue

ROUTER NODE (Center-Left):
- Diamond decision shape
- Label: "🔀 Intelligent Router"
- Question: "Classify & Route"
- Three outgoing paths with percentages

PATH 1 (Top) - CACHE HIT:
- Color: Green (#22C55E)
- Percentage: "40% of requests"
- Visual: Database with lightning bolt
- Label: "💾 Cache Hit"
- Cost: "$0.00"
- Description: "Instant response from cache"
- Savings badge: "100% saved"

PATH 2 (Middle) - CHEAP MODEL:
- Color: Blue (#3B82F6)
- Percentage: "35% of requests"
- Visual: Small robot icon
- Label: "⚡ GPT-3.5 / Claude Haiku"
- Cost: "$0.002/query"
- Description: "Simple queries, fast model"
- Savings badge: "95% cheaper than GPT-4"

PATH 3 (Bottom) - EXPENSIVE MODEL:
- Color: Purple/Red (#8B5CF6)
- Percentage: "25% of requests"
- Visual: Large brain icon
- Label: "🧠 GPT-4 / Claude Opus"
- Cost: "$0.06/query"
- Description: "Complex reasoning tasks"
- Note: "Only when needed"

OUTPUT SECTION (Right):
- Large icon: "✅ Response"
- Label: "Optimized Output"
- Visual: Checkmark in circle
- Stats: "Avg cost: $0.012/query"

MIDDLE SECTION - 4 STRATEGY CARDS:

Card 1: "📊 Token Budgeting"
- Icon: Calculator/meter
- Savings: "20-50%"
- Description: "Set limits per request/session"
- Visual: Progress bar at 80%
- Tactics:
  - "Hard token limits"
  - "Context summarization"
  - "Prompt optimization"

Card 2: "💾 Response Caching"
- Icon: Database with cache symbol
- Savings: "30-70%"
- Description: "Cache identical & similar queries"
- Visual: Cache hit/miss diagram
- Types:
  - "Exact match cache"
  - "Semantic similarity cache"
  - "TTL-based expiration"

Card 3: "🔀 Model Routing"
- Icon: Split path arrows
- Savings: "40-80%"
- Description: "Route by complexity"
- Visual: Complexity spectrum
- Logic:
  - "Simple → GPT-3.5"
  - "Medium → GPT-4o-mini"
  - "Complex → GPT-4o"

Card 4: "📦 Batch Processing"
- Icon: Stacked boxes
- Savings: "50%"
- Description: "Bulk APIs for non-urgent work"
- Visual: Queue of requests
- Use cases:
  - "Analytics reports"
  - "Content generation"
  - "24h SLA acceptable"

BOTTOM LEFT - COST BREAKDOWN PIE CHART:
- Title: "Where Your Token Budget Goes"
- Segments:
  - Input Tokens: 35% (blue)
  - Output Tokens: 45% (purple)
  - Tool Calls: 12% (amber)
  - Embeddings: 8% (green)
- Center label: "Cost Distribution"

BOTTOM CENTER - TOKEN BUDGET METER:
- Visual: Horizontal gauge/meter
- Current usage: 70% of budget
- Labels: "0K" → "50K" → "100K tokens"
- Warning threshold at 80% (amber line)
- Alert: "⚠️ Approaching limit"
- Suggestion: "Consider summarizing context"

BOTTOM RIGHT - ROI CALCULATOR:
- Title: "Monthly Savings Calculator"
- Input: "Daily queries: 10,000"
- Before: "$15,000/month (naive)"
- After: "$2,000/month (optimized)"
- Savings: "$13,000/month"
- Percentage: "↓ 87% cost reduction"
- Visual: Money bags icon

SIDEBAR - QUICK WINS:
- Vertical list of tips:
  1. "🎯 Use GPT-4o-mini for 80% of queries"
  2. "📝 Cache common system prompts"
  3. "📊 Batch analytics overnight"
  4. "✂️ Truncate long contexts"
  5. "🔍 Use embeddings for retrieval"

FOOTER:
- Open Agent School logo
- URL: www.openagentschool.org
- Tagline: "Cut Costs, Keep Quality"
- Green gradient accent bar

VISUAL POLISH:
- Money/savings theme with dollar icons
- Green arrows showing cost reduction
- Red strike-through on high costs
- Gradient from red (expensive) to green (cheap)
- Flow lines showing request routing
- Percentage badges on each optimization
- Before/after comparison callouts
```

---

## Expected Output

A cost-focused infographic showing how to dramatically reduce LLM costs:

1. **Request Routing Flow** - Cache → Cheap Model → Expensive Model
2. **Four Optimization Strategies** - Token budgets, caching, routing, batching
3. **Cost Breakdown & ROI Calculator** - Visualize where money goes

Visual learners should immediately understand the routing strategy and potential savings.

---

## File Output

Save generated image as:

```text
/public/images/infographics/agent-cost-optimization-infographic.png
```
