# IgnitionStack Agent — Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic — End-to-End Pipeline Visual

---

## Prompt

```
Create an 8K educational infographic titled "IgnitionStack Agent" using Flat UI Style 2.0.

VISUAL DIRECTION:
  The infographic tells ONE story: a PowerPoint file enters at the top and a
  fully deployed Azure production workload exits at the bottom. Every section
  is a stage of that transformation. Use a bold orange-to-amber gradient as
  the primary accent — representing ignition / fire — with blue and purple
  supporting colors for Azure and AI elements.

═══════════════════════════════════════════════════════════════════════════════
HEADER SECTION (Gradient: #F97316 → #F59E0B — Orange/Amber "Fire")
═══════════════════════════════════════════════════════════════════════════════
- Large title: "IgnitionStack Agent"
- Subtitle: "From Use Case to Production Azure Workload in 20 Iterations"
- Tagline in smaller text: "The Ralph Method — One Bash Loop to Ship It All"
- Icon: A stylized rocket built from code brackets {🚀} with flame trail
- Badge: "Advanced Pattern" in orange outline pill
- Small text: "Open Agent School — Patterns Library"

═══════════════════════════════════════════════════════════════════════════════
SECTION 1 — THE PROBLEM (Red #EF4444)
═══════════════════════════════════════════════════════════════════════════════
Title: "The Gap: Use Case → Deployed Code"
Two-column comparison:

LEFT COLUMN — "Traditional" (pale red background):
  📅 Week 1: Requirements workshops, Jira ticket writing
  📅 Week 2: Infrastructure setup (ClickOps in Azure portal)
  📅 Week 3: Scaffold app, wire database, configure CI/CD
  📅 Week 4: First feature code begins
  Total: "4 weeks before a single business feature"

RIGHT COLUMN — "IgnitionStack" (pale green background):
  ⏱️ 90 sec: PPTX → 13 atomic tasks in PRD.json
  ⏱️ 2 min: Full scaffold: Bicep + DB + App + CI/CD
  ⏱️ 2 hrs: 20 Ralph iterations → all tasks implemented
  ⏱️ 3 hrs: Deployed to Azure, CI/CD green, tests passing
  Total: "Under 3 hours, PPTX to production"

Bottom callout: "10× faster. Every commit traceable. Zero ClickOps."

═══════════════════════════════════════════════════════════════════════════════
SECTION 2 — THE FIVE INPUT FORMATS (Blue #3B82F6)
═══════════════════════════════════════════════════════════════════════════════
Title: "Meet Stakeholders Where They Are"
Five input cards in a horizontal row, each with an icon and description:

  📸 Screenshot     — Whiteboard photo, wireframe, napkin sketch
  📄 PDF            — Product briefs, RFPs, architecture docs
  📊 PPTX           — Pitch decks, slide presentations with speaker notes
  📝 Word (DOCX)    — Requirements documents, project charters
  💬 Plain Text     — Slack messages, emails, meeting notes

Arrow from all five cards converging into a single funnel:
  "Vision + NLP Extraction → Structured Requirements"

Insight callout: "Stakeholders don't produce clean specs.
  IgnitionStack parses whatever they have."

═══════════════════════════════════════════════════════════════════════════════
SECTION 3 — THE 7-STAGE PIPELINE (Purple #8B5CF6)
═══════════════════════════════════════════════════════════════════════════════
Title: "The IgnitionStack Pipeline — From Input to Production"

Large vertical flow diagram with 7 connected stages. Each stage has an
icon, label, color, and 1-line description:

  ┌─────────────────────────────────────────────────────┐
  │ 📄 INPUT        (Blue #3B82F6)                      │
  │    PPTX • PDF • Screenshot • Doc • Text             │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ 🔍 PARSE        (Violet #8B5CF6)                    │
  │    Vision + NLP — extract features, entities, flows │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ 🧩 DECOMPOSE    (Purple #A855F7)                    │
  │    30-50 atomic tasks via the Decomposition Test    │
  │    Each task: Testable ✅ Bounded ✅                 │
  │    Independent ✅ Committable ✅                     │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ 📋 PRD.json     (Fuchsia #D946EF)                   │
  │    Prioritized task backlog with acceptance criteria │
  │    Categories: infra · agent · db · app · ci · docs │
  │                                                     │
  │  ╭─ 🔗 DEEP RESEARCH AGENT (sub-agent) ──────────╮ │
  │  │  Runs async: gathers compliance requirements,  │ │
  │  │  API specs, industry standards, best practices  │ │
  │  │  → feeds back into PRD.json task updates        │ │
  │  ╰────────────────────────────────────────────────╯ │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ 🏗️ SCAFFOLD     (Orange #F97316)                    │
  │    Bicep infra · AI Foundry agents · DB schemas     │
  │    App code · GitHub repo · CI/CD pipeline          │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ 🔄 RALPH ×20    (Amber #F59E0B)                     │
  │    20 autonomous iterations with coding agent CLI   │
  │    Each: pick task → implement → test → commit      │
  │  ╭──────────────────────────────────────────────╮   │
  │  │  for i in {1..20}; do                        │   │
  │  │    gh copilot code --model gpt-5.3-codex \   │   │
  │  │      --file PRD.json --file progress.txt \   │   │
  │  │      -m "Pick next task. Implement. Test."   │   │
  │  │  done                                        │   │
  │  ╰──────────────────────────────────────────────╯   │
  │                     ↺ retry loop                    │
  └──────────────────────┬──────────────────────────────┘
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │ ✅ PRODUCTION    (Emerald #10B981)                   │
  │    Deployed to Azure • CI/CD green • Tests passing  │
  │    Every commit = one PRD task                      │
  └─────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECTION 4 — THE ENGINE: CLI CODING AGENTS (Orange #F97316)
═══════════════════════════════════════════════════════════════════════════════
Title: "The Engine That Powers the Ralph Loop"

CENTER SPOTLIGHT — Primary Engine:
  Large card with GitHub Copilot CLI logo:
  ┌──────────────────────────────────────────────────────┐
  │  ⭐ GitHub Copilot CLI (gh copilot)                  │
  │  "The default engine — integrated with GitHub,       │
  │   understands your repo, creates commits, runs CI"   │
  │   Model: gpt-5.3-codex                               │
  └──────────────────────────────────────────────────────┘

BELOW — "Swap the Engine, Keep the Loop" subtitle
Grid of 6 alternative CLI engines (smaller cards):

  ┌────────────────────────┐  ┌────────────────────────┐
  │ 🟠 Claude Code         │  │ 🟢 Codex CLI (OpenAI)  │
  │ claude --model          │  │ codex --model           │
  │ claude-opus-4.6         │  │ gpt-5.2-codex           │
  └────────────────────────┘  └────────────────────────┘
  ┌────────────────────────┐  ┌────────────────────────┐
  │ 🔵 Gemini CLI          │  │ 🟣 Qwen Coder CLI      │
  │ gemini --model          │  │ qwen --model            │
  │ gemini-3-pro            │  │ qwen-32b-coder          │
  └────────────────────────┘  └────────────────────────┘
  ┌────────────────────────┐  ┌────────────────────────┐
  │ 🔴 OpenCode            │  │ ⚪ Aider                │
  │ Community-driven        │  │ aider --model           │
  │ Multi-model support     │  │ Any model via API       │
  └────────────────────────┘  └────────────────────────┘

Callout box:
  "The Ralph loop is model-agnostic. Change ONE variable in ralph.sh
   to swap the engine:  MODEL='claude-opus-4.6'
   The bash for-loop stays the same."

═══════════════════════════════════════════════════════════════════════════════
SECTION 5 — THE MODEL LINEUP (Indigo #6366F1)
═══════════════════════════════════════════════════════════════════════════════
Title: "Recommended Models"

Comparison table with rating stars:

  ┌──────────────────┬──────────┬──────────┬──────────┬──────────┐
  │ Model            │ Code Gen │ Reasoning│ Speed    │ Cost     │
  ├──────────────────┼──────────┼──────────┼──────────┼──────────┤
  │ gpt-5.3-codex    │ ★★★★★   │ ★★★★★   │ ★★★★☆   │ ★★★☆☆   │
  │ (Default)        │          │          │          │          │
  ├──────────────────┼──────────┼──────────┼──────────┼──────────┤
  │ claude-opus-4.6  │ ★★★★★   │ ★★★★★   │ ★★★☆☆   │ ★★★☆☆   │
  │ (Alternate)      │          │          │          │          │
  ├──────────────────┼──────────┼──────────┼──────────┼──────────┤
  │ gpt-5.2-codex    │ ★★★★☆   │ ★★★★☆   │ ★★★★★   │ ★★★★☆   │
  │ (Budget)         │          │          │          │          │
  ├──────────────────┼──────────┼──────────┼──────────┼──────────┤
  │ gemini-3-pro     │ ★★★★☆   │ ★★★★☆   │ ★★★★★   │ ★★★★★   │
  │ (Fast+Cheap)     │          │          │          │          │
  ├──────────────────┼──────────┼──────────┼──────────┼──────────┤
  │ qwen-32b-coder   │ ★★★★☆   │ ★★★☆☆   │ ★★★★★   │ ★★★★★   │
  │ (Open-Weight)    │          │          │          │          │
  └──────────────────┴──────────┴──────────┴──────────┴──────────┘

Insight: "Use the best model for initial scaffold (gpt-5.3-codex or
  claude-opus-4.6), then optionally switch to a faster/cheaper model
  for later iterations that are simpler tasks."

═══════════════════════════════════════════════════════════════════════════════
SECTION 6 — DEEP RESEARCH AGENT CROSS-LINK (Teal #14B8A6)
═══════════════════════════════════════════════════════════════════════════════
Title: "Where Research Fits: The Deep Research Sub-Agent"

Flow diagram showing IgnitionStack calling Deep Research Agent:

  ┌──────────────┐                 ┌──────────────────────┐
  │ IgnitionStack│ ── dispatches → │ Deep Research Agent   │
  │  (main)      │                 │ (async sub-agent)     │
  └──────────────┘                 └──────┬───────────────┘
                                          │ researches:
                                          ▼
                              ┌─────────────────────────┐
                              │ • Compliance reqs (HIPAA,│
                              │   GDPR, SOC2)           │
                              │ • API specs & SDKs      │
                              │ • Industry best practices│
                              │ • Competitor analysis    │
                              │ • Azure service limits   │
                              │ • Security advisories    │
                              └─────────────┬───────────┘
                                            │ returns findings
                                            ▼
                              ┌─────────────────────────┐
                              │   PRD.json updated       │
                              │  with researched tasks   │
                              │  + acceptance criteria    │
                              └─────────────────────────┘

Callout: "The Deep Research Agent runs ASYNCHRONOUSLY. IgnitionStack
  dispatches research queries early, continues scaffolding, and
  merges research findings into PRD.json before the Ralph loop.
  → See Pattern: Deep Research Agent in Open Agent School"

  Use cases for the sub-agent:
  • Compliance requirements gathering (HIPAA, GDPR, PCI-DSS)
  • Third-party API documentation analysis
  • Azure service limits and quota research
  • Security vulnerability advisories for chosen tech stack
  • Competitive feature analysis for the domain

═══════════════════════════════════════════════════════════════════════════════
SECTION 7 — THE RALPH LOOP EXPLAINED (Amber #D97706)
═══════════════════════════════════════════════════════════════════════════════
Title: "The Ralph Method — 30 Lines of Bash That Build a Project"

Visual: Large code block styled as a terminal window:

  ╔═══════════════════════════════════════════════════════════╗
  ║  $ cat ralph.sh                                          ║
  ╠═══════════════════════════════════════════════════════════╣
  ║  for i in $(seq 1 20); do                                ║
  ║    # 1. Find next pending task in PRD.json               ║
  ║    # 2. Implement it — write code + tests                ║
  ║    # 3. Run type-check + test suite                      ║
  ║    # 4. Pass → mark done, commit                         ║
  ║    # 5. Fail → log failure, commit WIP, move on          ║
  ║    gh copilot code --model gpt-5.3-codex \               ║
  ║      --file PRD.json --file progress.txt \               ║
  ║      -m "Pick highest-priority pending task.             ║
  ║          Implement. Test. Commit."                       ║
  ║  done                                                    ║
  ╚═══════════════════════════════════════════════════════════╝

Four pillars below the code block (2×2 grid):

  ┌────────────────────────────┐  ┌────────────────────────────┐
  │ 🧹 Context Window Hygiene │  │ 🔬 Atomic Commits          │
  │ Each iteration starts      │  │ One task = one commit.     │
  │ clean. No accumulated      │  │ git bisect to find any     │
  │ confusion from prior runs. │  │ issue. Fully reviewable.   │
  └────────────────────────────┘  └────────────────────────────┘
  ┌────────────────────────────┐  ┌────────────────────────────┐
  │ 🛡️ Fault Tolerance         │  │ 📝 Persistent Memory       │
  │ If iteration 12 fails,     │  │ progress.txt carries       │
  │ 1-11 are already committed.│  │ what worked and what didn't│
  │ Fix it and re-run from 12. │  │ across all iterations.     │
  └────────────────────────────┘  └────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECTION 8 — THE REAL-WORLD EXAMPLE (Green #22C55E)
═══════════════════════════════════════════════════════════════════════════════
Title: "Case Study: Meridian Health Network"

Visual story flow (left to right):

  📊 INPUT                    🧩 DECOMPOSE               🔄 RALPH LOOP
  ──────────                  ────────────               ────────────
  12-slide PowerPoint    →    13 atomic tasks       →    20 iterations
  from solution architect     across 6 categories        2 hours runtime

  ┌─────────────┐     ┌──────────────────────┐    ┌───────────────────┐
  │ Slide 1:    │     │ INFRA-01: RG + KV    │    │ Iter  1: INFRA-01 │
  │ Patient Reg │     │ INFRA-02: Cosmos DB  │    │ Iter  2: INFRA-02 │
  │ Slide 4:    │     │ INFRA-03: AI Foundry │    │ Iter  3: INFRA-03 │
  │ Scheduling  │     │ DB-01: Patients      │    │ Iter  4: DB-01    │
  │ Slide 7:    │     │ DB-02: Appointments  │    │ ...               │
  │ AI Triage   │     │ APP-01: FastAPI+React│    │ Iter 13: DOCS-01  │
  │ Slide 9:    │     │ AGENT-01: Triage     │    │ Iter 14-20: Done! │
  │ Lab Results │     │ AGENT-02: Lab RAG    │    │ 🎉 Exit early     │
  │ ...8 more   │     │ CI-01, TEST-01,      │    │                   │
  │             │     │ DOCS-01              │    │                   │
  └─────────────┘     └──────────────────────┘    └───────────────────┘

Result callout (large, green background):
  "PPTX → deployed Azure patient portal in under 3 hours.
   13 git commits. $8-15 in tokens. 3 weeks of work avoided."

═══════════════════════════════════════════════════════════════════════════════
SECTION 9 — WHAT GETS GENERATED (Blue #3B82F6)
═══════════════════════════════════════════════════════════════════════════════
Title: "The Full Output — Everything IgnitionStack Produces"

Grid of 9 output cards (3×3):

  ☁️ Bicep Infrastructure        🤖 AI Foundry Agents         🗄️ Database Schema
  main.bicep + modules for       Agent configs + system        Migrations + seed data,
  RG, Key Vault, Cosmos DB,      prompts, tool bindings,       FHIR-aligned schemas,
  App Service, AI Foundry,       evaluation criteria           partition key strategy
  Application Insights

  💻 Application Code            🔄 CI/CD Pipeline             📦 GitHub Repository
  Frontend (React) + Backend     GitHub Actions: build →       Private repo, .gitignore,
  (FastAPI), API routes,         test → Bicep deploy →         branch protection, initial
  auth middleware, error          app deploy on main            commit + scaffold
  handling

  🔄 ralph.sh                    📋 PRD.json                   📝 progress.txt
  The 20-iteration bash loop.    Complete task backlog with     Iteration-by-iteration
  One file. 30 lines.            status tracking + acceptance  diary. The project's
  The heart of IgnitionStack.    criteria for every task.      memory across iterations.

═══════════════════════════════════════════════════════════════════════════════
SECTION 10 — RELATED PATTERNS FROM OPEN AGENT SCHOOL (Purple #8B5CF6)
═══════════════════════════════════════════════════════════════════════════════
Title: "Your Learning Map — Connect the Dots"
Subtitle: "IgnitionStack builds on patterns you already know. Explore each."

Visual: Hub-and-spoke diagram with IgnitionStack at center, connecting to
pattern cards radiating outward. Each card links to its Open Agent School
pattern page.

  CORE PATTERNS (direct dependencies):
  ┌──────────────────────────────────────────────────────────────────────┐
  │ 🔄 Self-Remediation Loop  — The retry logic in the verification    │
  │    gate. When a Ralph iteration fails tests, the loop retries.      │
  │    → /patterns/self-remediation-loop                                │
  │                                                                     │
  │ 💻 Code-Act Pattern       — How the agent generates and executes   │
  │    code in each Ralph iteration.                                    │
  │    → /patterns/code-act                                             │
  │                                                                     │
  │ 🔍 Deep Research Agent    — Async sub-agent that gathers           │
  │    compliance reqs, API specs, best practices before the loop.      │
  │    → /patterns/deep-research-agent                                  │
  │                                                                     │
  │ 🏗️ Concept-to-Project     — Lighter version of IgnitionStack —    │
  │    idea → code without the full Azure infra + Ralph loop.           │
  │    → /patterns/concept-to-project                                   │
  │                                                                     │
  │ 🤖 Autonomous Workflow    — The self-directing execution model     │
  │    that powers the 20-iteration loop.                               │
  │    → /patterns/autonomous-workflow                                  │
  │                                                                     │
  │ 💻 Agentic IDE            — IDE-integrated coding agent that       │
  │    understands your entire repo during each iteration.              │
  │    → /patterns/agentic-ide                                          │
  └──────────────────────────────────────────────────────────────────────┘

  SUPPORTING PATTERNS (enhance the workflow):
  ┌──────────────────────────────────────────────────────────────────────┐
  │ 📊 Evaluator-Optimizer    — Quality gates between Ralph iterations │
  │    → /patterns/evaluator-optimizer                                  │
  │                                                                     │
  │ 🗂️ Schema-Aware Decomposition — How tasks get broken down         │
  │    → /patterns/schema-aware-decomposition                           │
  │                                                                     │
  │ 🛡️ Guardrails Layer       — Safety constraints on generated code   │
  │    → /patterns/guardrails-layer                                     │
  │                                                                     │
  │ 🔀 Multi-LLM Routing      — Route simple tasks to fast models,    │
  │    complex tasks to powerful models within the loop.                │
  │    → /patterns/multi-llm-routing                                    │
  │                                                                     │
  │ 🧪 Agent Evaluation       — Measure output quality and task        │
  │    completion rates across iterations.                              │
  │    → /patterns/agent-evaluation                                     │
  │                                                                     │
  │ 🔌 MCP Server Orchestration — Connect tools, databases, APIs      │
  │    into the coding agent via Model Context Protocol.                │
  │    → /patterns/mcp-server-orchestration                             │
  │                                                                     │
  │ 🤝 Orchestrator-Worker    — Multi-agent delegation model           │
  │    → /patterns/orchestrator-worker                                  │
  │                                                                     │
  │ 📚 Agentic RAG            — Powers the lab-results summarizer     │
  │    and document-aware AI agents in the generated project.           │
  │    → /patterns/agentic-rag                                          │
  │                                                                     │
  │ 🔧 Modern Tool Use        — Function calling and tool integration  │
  │    → /patterns/modern-tool-use                                      │
  └──────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECTION 11 — CORE CONCEPTS CROSS-REFERENCE (Teal #14B8A6)
═══════════════════════════════════════════════════════════════════════════════
Title: "Core Concepts That Power IgnitionStack"
Subtitle: "Deep-dive into the foundations"

Two-column grid of concept cards:

  LEFT COLUMN:                          RIGHT COLUMN:
  ┌──────────────────────────────┐     ┌──────────────────────────────┐
  │ 🤖 AI Agents                 │     │ 🧠 Agent Architecture        │
  │ What agents are and how      │     │ Building blocks: planner,    │
  │ they reason and act.         │     │ executor, memory, tools.     │
  │ → /concepts/ai-agents        │     │ → /concepts/agent-arch       │
  └──────────────────────────────┘     └──────────────────────────────┘
  ┌──────────────────────────────┐     ┌──────────────────────────────┐
  │ 💻 Client Coding Agents      │     │ 🔧 Tool Use & Functions      │
  │ Copilot, Cursor, Claude Code │     │ How agents call tools,       │
  │ — the engines behind ralph.  │     │ databases, APIs, services.   │
  │ → /concepts/coding-agents    │     │ → /concepts/tool-use         │
  └──────────────────────────────┘     └──────────────────────────────┘
  ┌──────────────────────────────┐     ┌──────────────────────────────┐
  │ 🔌 MCP Protocol              │     │ 🔒 Agent Security            │
  │ Universal tool integration   │     │ Securing the generated       │
  │ standard for AI agents.      │     │ code and deployment.         │
  │ → /concepts/mcp              │     │ → /concepts/agent-security   │
  └──────────────────────────────┘     └──────────────────────────────┘
  ┌──────────────────────────────┐     ┌──────────────────────────────┐
  │ 🧪 Agent Evaluation          │     │ 🚀 Agent Deployment          │
  │ How to measure if the output │     │ From dev to production:      │
  │ is good enough for prod.     │     │ containers, CI/CD, Azure.    │
  │ → /concepts/agent-eval       │     │ → /concepts/agent-deploy     │
  └──────────────────────────────┘     └──────────────────────────────┘
  ┌──────────────────────────────┐     ┌──────────────────────────────┐
  │ ✨ Fine-Tuning LLMs          │     │ 📡 Agent Observability       │
  │ SFT / DPO / RFT — when the  │     │ Tracing the Ralph loop:      │
  │ base model isn't enough.     │     │ logs, metrics, alerts.       │
  │ → /concepts/fine-tuning      │     │ → /concepts/observability    │
  └──────────────────────────────┘     └──────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECTION 12 — FRESH PERSPECTIVE: THE NEXT 10 MILLION (Gradient: #6366F1 → #EC4899)
═══════════════════════════════════════════════════════════════════════════════
Title: "Why This Matters for the Next 10 Million Builders"
Subtitle: "A letter to everyone who hasn't built their first agent yet"

Visual: Large, inspiring illustration — a diverse group of people (students,
  professionals, makers, entrepreneurs) on different continents, each
  holding a phone/laptop showing the IgnitionStack pipeline. Dotted lines
  connect them to a central Azure cloud.

THREE KEY MESSAGES (each as a large callout card):

  ┌─────────────────────────────────────────────────────────────────┐
  │ 💡 "THE GREAT EQUALIZER"                                       │
  │                                                                 │
  │ You don't need a platform team. You don't need DevOps           │
  │ experience. You don't need 3 weeks of setup time.               │
  │                                                                 │
  │ A student in Nairobi with a PowerPoint idea and a terminal      │
  │ has the same ignition power as a 50-person engineering team.    │
  │                                                                 │
  │ IgnitionStack democratizes the ability to go from idea          │
  │ to production Azure workload. The bash loop doesn't care        │
  │ about your resume — it cares about your PRD.json.               │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │ 🌍 "LEARN BY READING THE GIT LOG"                              │
  │                                                                 │
  │ The best way to learn how a project is built? Watch it          │
  │ being built, one commit at a time.                              │
  │                                                                 │
  │ Run IgnitionStack in human-in-the-loop mode:                    │
  │   - Read each iteration's diff                                  │
  │   - Understand what the agent chose and why                     │
  │   - See how Bicep modules connect to app code                   │
  │   - Learn the project's architecture by living its history      │
  │                                                                 │
  │ 13 commits = 13 micro-lessons in Azure development.             │
  │ Better than any tutorial. Because it's YOUR project.            │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │ 🚀 "THE COST OF NOT TRYING IS HIGHER"                          │
  │                                                                 │
  │ Total cost of an IgnitionStack run: $8-15 in tokens.            │
  │ Total cost of NOT running it: 3-4 weeks of manual scaffolding.  │
  │                                                                 │
  │ In the time it takes to write "Infrastructure Setup" in Jira,   │
  │ IgnitionStack has already deployed the infrastructure.           │
  │                                                                 │
  │ The next 10 million builders won't ask "should I use agents?"   │
  │ They'll ask "which pattern should I compose?" And IgnitionStack │
  │ will be the FIRST pattern they reach for. Because it ships.     │
  └─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECTION 13 — GETTING STARTED (Green #22C55E)
═══════════════════════════════════════════════════════════════════════════════
Title: "Ignite in 5 Steps"

Numbered step cards (vertical):

  1️⃣  INSTALL THE ENGINE
      gh extension install github/gh-copilot
      az login && gh auth login
      (Or: npm i -g @anthropic/claude-code for Claude engine)

  2️⃣  PREPARE YOUR INPUT
      Any format: PPTX, PDF, screenshot, Word doc, plain text.
      The messier the better — the agent will parse it.

  3️⃣  RUN IGNITIONSTACK
      npx ignition-stack --input pitch-deck.pptx \
        --project my-healthcare-app --region eastus2

  4️⃣  WATCH THE RALPH LOOP
      Terminal 1: bash ralph.sh
      Terminal 2: tail -f progress.txt
      Terminal 3: watch 'jq ".tasks | map(select(.status==\"done\")) | length" PRD.json'

  5️⃣  SHIP IT
      The app is deployed. The CI/CD is green. The git log tells the story.
      Your job: customize, polish, and own it.

═══════════════════════════════════════════════════════════════════════════════
SECTION 14 — STATS & IMPACT (Orange #F97316)
═══════════════════════════════════════════════════════════════════════════════
Title: "By the Numbers"

Large-format statistics:

  ⏱️ "3 hours"      — Average PPTX to deployed Azure workload
  📋 "30-50 tasks"  — Typical project decomposition
  🔄 "20 iterations"— Ralph loop default (adjustable for larger projects)
  💰 "$8-15"        — Estimated token cost per complete run
  📦 "9 artifacts"  — Bicep, agents, DB, app, CI/CD, repo, ralph.sh, PRD, progress.txt
  🏥 "3 weeks saved"— Compared to traditional manual scaffolding
  🔗 "15+ patterns" — Connected to across Open Agent School

═══════════════════════════════════════════════════════════════════════════════
FOOTER (Dark background #0F172A)
═══════════════════════════════════════════════════════════════════════════════
- Left: Open Agent School logo + "www.openagentschool.org"
- Center: "IgnitionStack Agent — Advanced Pattern"
- Right: "Explore all 60+ agent patterns at openagentschool.org/patterns"
- Bottom line: "From use case to production. One input. 20 iterations. Ship it."

═══════════════════════════════════════════════════════════════════════════════
DESIGN NOTES
═══════════════════════════════════════════════════════════════════════════════
- Primary accent: orange-to-amber gradient (fire/ignition theme)
- Use terminal/code aesthetic for ralph.sh sections (dark backgrounds,
  monospace font, green/amber text)
- Show the PPTX → production transformation as a dramatic visual journey
- Include small Azure logo where relevant (Bicep, Foundry, etc.)
- GitHub logo on repo/CI/CD sections
- Every pattern/concept mentioned should feel clickable (underlined or
  card-shaped) — this is a learning map, not just a poster
- The "Next 10 Million" section should feel INSPIRING, not technical.
  Warm colors, diverse representation, aspirational imagery.
- Code blocks should use syntax highlighting colors: green for strings,
  blue for keywords, amber for variables
- The pipeline flow should be the visual centerpiece — largest section
```

---

## Color Palette

| Section | Primary Color | Hex | Usage |
|---------|--------------|-----|-------|
| Header | Orange/Amber | #F97316 → #F59E0B | Ignition branding |
| The Problem | Red | #EF4444 | Pain point contrast |
| Input Formats | Blue | #3B82F6 | Input diversity |
| Pipeline | Purple | #8B5CF6 | Core flow |
| CLI Engines | Orange | #F97316 | Engine showcase |
| Models | Indigo | #6366F1 | Model comparison |
| Deep Research | Teal | #14B8A6 | Sub-agent integration |
| Ralph Loop | Amber | #D97706 | The core mechanism |
| Case Study | Green | #22C55E | Real-world proof |
| Generated Output | Blue | #3B82F6 | Deliverables |
| Related Patterns | Purple | #8B5CF6 | Pattern connections |
| Core Concepts | Teal | #14B8A6 | Concept cross-links |
| 10 Million | Indigo→Pink | #6366F1 → #EC4899 | Inspiration |
| Getting Started | Green | #22C55E | Call to action |
| Stats | Orange | #F97316 | Impact numbers |
| Footer | Slate-900 | #0F172A | Branding |

---

## Learning Objectives

After studying this infographic, learners will be able to:

1. **Explain** what the IgnitionStack Agent does — transform any use-case input into a deployed Azure workload
2. **Describe** the 7-stage pipeline from input parsing to production deployment
3. **Understand** the Ralph Method — why a simple bash for-loop outperforms complex orchestration frameworks for autonomous coding
4. **Identify** which CLI engine to use (GitHub Copilot CLI, Claude Code, Codex, Gemini, etc.) and when to swap
5. **Compare** model options (gpt-5.3-codex, claude-opus-4.6, gemini-3-pro, qwen-32b-coder) for different cost/quality tradeoffs
6. **Articulate** how the Deep Research Agent serves as an async sub-agent for PRD enrichment
7. **Trace** the Meridian Health Network case study from PPTX input to deployed patient portal
8. **Navigate** to 15+ related patterns and concepts in Open Agent School for deeper learning
9. **Get started** with IgnitionStack in 5 steps

---

## Related Patterns (Cross-Links)

These patterns are referenced in the infographic and should be linked in any digital version:

| Pattern | ID | Role in IgnitionStack |
|---------|----|-----------------------|
| Self-Remediation Loop | `self-remediation-loop` | Retry logic in verification gate |
| Code-Act | `code-act` | Code generation in each iteration |
| Deep Research Agent | `deep-research-agent` | Async sub-agent for research tasks |
| Concept-to-Project | `concept-to-project` | Lighter version (no infra/Ralph) |
| Autonomous Workflow | `autonomous-workflow` | Self-directing execution model |
| Agentic IDE | `agentic-ide` | IDE-integrated coding agent |
| Evaluator-Optimizer | `evaluator-optimizer` | Quality gates between iterations |
| Schema-Aware Decomposition | `schema-aware-decomposition` | Task decomposition method |
| Guardrails Layer | `guardrails-layer` | Safety constraints on generated code |
| Multi-LLM Routing | `multi-llm-routing` | Route tasks to appropriate models |
| Agent Evaluation | `agent-evaluation` | Measure output quality |
| MCP Server Orchestration | `mcp-server-orchestration` | Tool/data integration via MCP |
| Orchestrator-Worker | `orchestrator-worker` | Multi-agent delegation |
| Agentic RAG | `agentic-rag` | RAG pipeline in generated projects |
| Modern Tool Use | `modern-tool-use` | Function calling integration |

## Related Concepts (Cross-Links)

| Concept | Page | Relevance |
|---------|------|-----------|
| AI Agents | `/concepts/ai-agents` | What agents are, fundamentals |
| Agent Architecture | `/concepts/agent-architecture` | Building blocks |
| Client Coding Agents | `/concepts/client-coding-agents` | The CLI engines powering Ralph |
| Tool Use & Function Calling | `/concepts/tool-use` | How agents call tools/APIs |
| MCP Protocol | `/concepts/mcp` | Universal tool integration |
| Agent Security | `/concepts/agent-security` | Securing generated code |
| Agent Evaluation | `/concepts/agent-evaluation` | Measuring output quality |
| Agent Deployment | `/concepts/agent-deployment` | Production deployment patterns |
| Fine-Tuning | `/concepts/fine-tuning` | When base model isn't enough |
| Agent Observability | `/concepts/agent-observability` | Tracing the Ralph loop |
| Multi-Agent Systems | `/concepts/multi-agent-systems` | Deep Research sub-agent |
| Prompt Engineering | `/concepts/prompt-engineering` | Crafting the Ralph loop prompt |

---

## CLI Engine Reference

| Engine | Install Command | Ralph Loop Variable | Model Flag |
|--------|----------------|---------------------|------------|
| **GitHub Copilot CLI** ⭐ | `gh extension install github/gh-copilot` | `gh copilot code` | `--model gpt-5.3-codex` |
| Claude Code | `npm i -g @anthropic/claude-code` | `claude` | `--model claude-opus-4.6` |
| Codex CLI | `npm i -g @openai/codex` | `codex` | `--model gpt-5.2-codex` |
| Gemini CLI | `npm i -g @google/gemini-cli` | `gemini` | `--model gemini-3-pro` |
| Qwen Coder | via API / local | `qwen` | `--model qwen-32b-coder` |
| OpenCode | `npm i -g opencode` | `opencode` | Multi-model support |
| Aider | `pip install aider-chat` | `aider` | `--model <any>` |

---

## Attribution

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    [INFOGRAPHIC CONTENT]                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  🎓 Open Agent School | www.openagentschool.org              │
│  Pattern: IgnitionStack Agent (Advanced)                     │
│  "From use case to production. One input. 20 iterations."    │
└──────────────────────────────────────────────────────────────┘
```
