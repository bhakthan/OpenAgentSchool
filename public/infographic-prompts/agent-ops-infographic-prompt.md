# Agent Ops (AgentOps) - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "AgentOps: Operating AI Agents at Scale" using Flat UI Style 2.0.

HEADER SECTION (Indigo #6366F1):
- Large title: "AgentOps"
- Subtitle: "Operating AI Agents in Production at Scale"
- Icon: Gears with AI brain and monitoring dashboard

SECTION 1 - THE AGENTOPS LIFECYCLE (Blue #3B82F6):
Title: "The Agent Operations Lifecycle"
Circular lifecycle diagram:
1. "Build" → Develop and test agents
2. "Deploy" → Push to production
3. "Monitor" → Track performance and health
4. "Analyze" → Understand behavior patterns
5. "Optimize" → Improve cost and quality
6. "Iterate" → Update and redeploy
Center: "Continuous Agent Operations"

SECTION 2 - KEY METRICS (Green #22C55E):
Title: "Essential AgentOps Metrics"
Metrics dashboard mockup:
| Metric | Description | Target |
|--------|-------------|--------|
| Latency (P95) | Response time | < 2s |
| Success Rate | Completed tasks | > 95% |
| Token Usage | LLM consumption | Budget |
| Error Rate | Failed operations | < 1% |
| Tool Reliability | Tool success rate | > 99% |
| User Satisfaction | Feedback scores | > 4.5/5 |

SECTION 3 - OBSERVABILITY STACK (Purple #8B5CF6):
Title: "Agent Observability"
Three pillars diagram:
📊 "Metrics" - Quantitative measurements
  - Latency, throughput, costs
📜 "Logs" - Event records
  - Prompts, responses, tool calls
🔗 "Traces" - End-to-end flows
  - Full agent execution paths
Connected by: "Correlation IDs"

SECTION 4 - TRACING AGENT RUNS (Orange #F97316):
Title: "Agent Trace Anatomy"
Trace waterfall diagram:
[User Request] ─────────────────────────────→
  └─ [Agent Start] ────────────────────────→
       └─ [LLM Call 1] ─────→ (reasoning)
       └─ [Tool: Search] ────→ (retrieval)
       └─ [LLM Call 2] ─────→ (synthesis)
       └─ [Tool: Execute] ──→ (action)
  └─ [Agent Complete] ─────────────────────→
[Response] ────────────────────────────────→
Labels: "Span duration, tokens, cost per step"

SECTION 5 - COST MANAGEMENT (Teal #14B8A6):
Title: "Controlling Agent Costs"
Cost breakdown pie chart:
- "LLM Tokens" - 60% (largest slice)
- "Embeddings" - 15%
- "Tool Calls" - 10%
- "Infrastructure" - 10%
- "Storage" - 5%
Cost optimization tactics:
💡 "Cache repeated queries"
💡 "Use cheaper models for routing"
💡 "Batch similar requests"
💡 "Set token budgets per task"

SECTION 6 - ALERTING & INCIDENTS (Red #EF4444):
Title: "When Things Go Wrong"
Alert hierarchy:
🟢 "Info" - Normal variance
🟡 "Warning" - Approaching thresholds
🟠 "Error" - Task failures
🔴 "Critical" - System outages
Incident response flow:
Detect → Alert → Triage → Mitigate → RCA → Prevent

SECTION 7 - AGENTOPS PLATFORMS (Blue #3B82F6):
Title: "Popular AgentOps Tools"
Platform grid with logos:
- "LangSmith" - LangChain observability
- "AgentOps" - Open-source agent monitoring
- "Weights & Biases" - ML experiment tracking
- "Datadog" - Infrastructure + LLM monitoring
- "Arize Phoenix" - LLM observability
- "OpenLIT" - OpenTelemetry for LLMs
- "Azure AI Foundry" - Microsoft agent platform

SECTION 8 - DEPLOYMENT PATTERNS (Green #22C55E):
Title: "Agent Deployment Strategies"
Deployment options:
🚀 "Blue/Green" - Switch between versions
🔄 "Canary" - Gradual rollout (5% → 25% → 100%)
🎛️ "Feature Flags" - Toggle agent capabilities
📊 "A/B Testing" - Compare agent versions
🔙 "Rollback Ready" - Quick revert on issues

SECTION 9 - BEST PRACTICES (Indigo #6366F1):
Title: "AgentOps Checklist"
Checkbox list:
☑ "Structured logging with trace IDs"
☑ "Dashboards for key metrics"
☑ "Alerts for error rate spikes"
☑ "Token budget enforcement"
☑ "Replay capability for debugging"
☑ "Version control for prompts"
☑ "Automated regression testing"
☑ "Cost attribution per workflow"

FOOTER (Dark background):
- Key principle: "You can't improve what you can't measure"
- Callout: "AgentOps = DevOps + MLOps + LLMOps"
- Open Agent School logo

DESIGN NOTES:
- Use DevOps-inspired visual language
- Include monitoring dashboards and graphs
- Show infrastructure/cloud iconography
- Use timeline/waterfall for traces
- Add green/red indicators for health
- Create professional operations aesthetic
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #6366F1 | Operations theme |
| Lifecycle | #3B82F6 | Process flow |
| Metrics | #22C55E | Performance data |
| Observability | #8B5CF6 | Three pillars |
| Tracing | #F97316 | Execution traces |
| Cost | #14B8A6 | Financial |
| Alerting | #EF4444 | Incidents |
| Platforms | #3B82F6 | Tools |
| Deployment | #22C55E | Strategies |
| Best Practices | #6366F1 | Checklist |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. The AgentOps lifecycle for production agents
2. Essential metrics to track for agent health
3. The three pillars of agent observability
4. How to trace and debug agent runs
5. Cost management and optimization strategies
6. Alerting and incident response for agents
7. Popular AgentOps platforms and tools
8. Deployment strategies for agent rollouts
9. Best practices checklist for production operations
