#  Open Agent School

[![Static Web Apps CI/CD](https://github.com/bhakthan/OpenAgentSchool/actions/workflows/azure-static-web-apps-gray-pond-041017f10.yml/badge.svg?branch=main)](https://github.com/bhakthan/OpenAgentSchool/actions/workflows/azure-static-web-apps-gray-pond-041017f10.yml)
[![Latest release](https://img.shields.io/github/v/release/bhakthan/OpenAgentSchool?include_prereleases&sort=semver)](https://github.com/bhakthan/OpenAgentSchool/releases)
[![License](https://img.shields.io/github/license/bhakthan/OpenAgentSchool.svg)](LICENSE)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bhakthan/OpenAgentSchool)
[![Follow on LinkedIn](https://img.shields.io/badge/Follow%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=bhakthan)

> **Where AI Agent Concepts Come to Life**  
> _An interactive learning platform for mastering AI agents, patterns, and production architectures_

<p align="center">
  <img src="public/images/OpenAgentSchool_at_a_Glance.webp" alt="Open Agent School at a Glance" width="800" />
</p>

**Live Platform:** [openagentschool.org](https://openagentschool.org)

---

## What's Inside

| | Question | Answer |
|---|----------|--------|
| **Why** | Why does this exist? | Most AI agent resources are scattered blog posts or vendor docs. Open Agent School brings concepts, patterns, and production practices into one interactive platform — so you learn the *why* behind each pattern, not just the API call. |
| **What** | What does it cover? | 65+ agent patterns, 200+ quiz questions, interactive D3 visualizations, Socratic study mode, critical thinking challenges, exportable diagrams (SVG/PNG/PDF), and downloadable strategy toolkits — from fundamentals to production ops. |
| **Where** | Where does it run? | **Web** — live at [openagentschool.org](https://openagentschool.org). **PWA** — install on mobile or desktop for offline access. **Local dev** — clone the repo and `npm run dev` on localhost:5000. |
| **When** | When should I use it? | When you're learning AI agents for the first time, evaluating patterns for a production system, preparing for a technical interview, or onboarding a team to agentic architecture — from first concept to org-wide adoption. |
| **Who** | Who is it for? | Developers building AI agents, architects designing multi-agent systems, product managers evaluating agentic capabilities, and teams adopting AI — from individual learners to enterprise adoption programs. |
| **How** | How is it built? | React 18 + TypeScript + Vite frontend with TailwindCSS and Radix UI. Optional Python FastAPI backend for study sessions and AI-powered assessments. Deployed on Azure Static Web Apps with GitHub Actions CI/CD. |
| **Best For** | What's the sweet spot? | Engineers who learn by doing — interactive visualizations, hands-on scenarios, and Socratic questioning beat passive reading. Also ideal for teams using the [Adoption Playbook](https://openagentschool.org) to drive org-wide AI transformation. |
| **Keys?** | Do I need API keys? | **No keys required to learn.** The entire platform works without any API keys. When you're ready for AI-powered features (study assessments, voice narration, cloud speech), bring your own keys — they stay in your browser's localStorage and never leave your device. |

---

## What is Open Agent School?

Open Agent School is a **comprehensive educational platform** designed to help developers, architects, and product managers master AI agents — from foundational concepts to advanced production patterns.

###  What You'll Learn

**Core Foundations**
-  **AI Agent Fundamentals** - Architecture, reasoning, tool use, and memory systems
-  **Agent Communication Protocols** - MCP (Model Context Protocol) and ACP (Agent Communication Protocol)
-  **AI Safety & Governance** - Responsible AI practices, security, and compliance frameworks
-  **Evaluation Methods** - Testing, benchmarking, and quality assurance for agents

**Developer Tools & Security**
-  **CLI Coding Agents** - Copilot CLI, Claude Code, Codex CLI, Gemini CLI for terminal-native development
-  **Agent Skills** - Modular SKILL.md files for extending agent capabilities with domain expertise
-  **Agent Red Teaming** - Proactive security testing with PyRIT, attack taxonomies, and ASR metrics

**Advanced Patterns**
-  **Multi-Agent Systems** - Coordination, orchestration, and swarm intelligence
-  **Data Autonomy Patterns** - Perception normalization, schema decomposition, action grounding
-  **2026 Agent Patterns** - Skill-Augmented Agent, MCP Server Orchestration, Multi-LLM Routing, Agentic IDE, Guardrails Layer, IgnitionStack Agent
-  **Business Use Cases** - Commerce, robotics, healthcare, and enterprise applications
-  **Educational Frameworks** - Socratic learning, adaptive tutoring, and skill assessment

**Production Practices**
-  **Deployment & Operations** - Platform ops, monitoring, and continuous improvement
-  **Cost & Value Engineering** - Optimization strategies and ROI frameworks
-  **Human-Centric Adoption** - Change management, HITL workflows, and recovery design
-  **Ecosystem & Partnerships** - Vendor evaluation and integration stewardship

---

##  Key Features

### 🔑 Bring Your Own Keys (BYOK) — Zero-Trust Local Configuration

> **Your keys never leave your browser.** All credentials are stored in `localStorage` under `oas.user.apiSettings`. Nothing is sent to analytics, telemetry, or any third-party service.

- **6 LLM Providers** — OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, Hugging Face, OpenRouter
- **Per-Provider Config** — API key, endpoint URL, and model for each provider with smart defaults and format hints
- **Cloud Speech Services** — OpenAI Whisper, Azure Speech, Deepgram (STT) + OpenAI TTS, Azure Speech, ElevenLabs (TTS)
- **Self-Hosted Backends** — Override Core API, Orchestrator, and Knowledge Service URLs for local or private deployments
- **Quick Configuration Guide** — 4-step accordion walkthrough that auto-expands when no keys are configured
- **Export / Import** — Share workshop configurations as JSON; merge with existing settings
- **Security-First Design** — Clear trust messaging, amber required-field indicators for Azure, privacy notes front-and-center

Access settings from **Tools → API Settings** in the navigation menu or through the ⚙ gear icon in the top bar.

###  Interactive Learning Experience

- **58 Core Concepts** across fundamentals, architecture, production, and advanced topics
- **67+ Agent Patterns** with code examples and visualizations
- **Learning Atlas** — Interactive D3 taxonomy tree with exportable diagrams (SVG/PNG/PDF)
- **Study Mode** — Socratic questioning and discovery-based learning
- **Critical Thinking Challenges** — Real-world scenarios with AI-powered assessment
- **Knowledge Quiz** — 200+ questions across 15+ categories

### 🎤 Voice Input & Audio Narration

- **Voice Input** — Speak commands and answers using Web Speech API, Whisper WASM (offline), or cloud STT
- **Audio Narrations** — Step-by-step concept narrations at Beginner / Intermediate / Advanced levels
- **29 Languages** — Auto-translated narrations with voice selection, speed, and volume controls
- **Cloud or Local** — Browser-native TTS (free, offline) or premium cloud voices (OpenAI, Azure, ElevenLabs)

###  Visual Learning Tools

- **D3 Visualizations** — Dynamic, interactive diagrams for complex concepts
- **40+ Atomic Deep-Dive Visualizers** — Slider-driven interactive explorations inside concept tabs
- **Algorithm Walkthroughs** — Step-by-step execution visualizations
- **Export Suite** — SVG, PNG (2x/3x), and PDF export for presentations
- **Dual-Mode Views** — Simple and technical modes for different learning levels

###  Hands-On Practice

- **Code Playbooks** — Runnable code examples in Python and TypeScript
- **Interactive Scenarios** — Debug challenges and failure recovery exercises
- **Live Pattern Runners** — Execute patterns in-browser with real output
- **Strategy Toolkits** — Downloadable canvases and frameworks (XLSX format)

###  Progressive Web App

- **Offline Access** — Content available without internet
- **Install App** — Native app experience on mobile and desktop (menu: Install App)
- **Responsive Design** — Optimized for all screen sizes
- **Dark/Light Themes** — Comfortable reading in any environment

---

##  Quick Start

### For Learners

1. **Visit**: [openagentschool.org](https://openagentschool.org)
2. **Explore**: Browse Core Concepts or Agent Patterns
3. **Learn**: Use Study Mode for guided discovery
4. **Practice**: Try interactive scenarios and quizzes

### For Developers

```bash
# Clone the repository
git clone https://github.com/bhakthan/OpenAgentSchool.git
cd OpenAgentSchool

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

### With Backend Services (Optional)

```powershell
# Start all three microservices
.\start-backend.ps1

# Services:
# - Core API (8000): User management, quiz, progress
# - Agent Orchestrator (8002): AI agents, critical thinking
# - Knowledge Service (8003): Document processing, semantic search
```

> **Note**: The frontend works standalone. Backend services enable advanced features like user progress tracking and AI-powered assessments.

---

##  Documentation

- **[Detailed Documentation](./docs/DETAILED_README.md)** - Comprehensive feature list and architecture
- **[Backend Quick Reference](./BACKEND_QUICK_REF.md)** - Microservices setup and API reference
- **[Agent Guide](./AGENTS.md)** - Guide for AI coding agents contributing to the project
- **[Architecture Overview](./docs/backend/ARCHITECTURE_OVERVIEW.md)** - System design and service dependencies

---

##  Recent Updates (February 21, 2026)

### 🔑 BYOK Configuration & Local Storage Settings (NEW)

Learners who clone the repo or use the live platform can now **bring their own API keys** — stored entirely in the browser's `localStorage`, never transmitted anywhere.

| Feature | Details |
|---------|--------|
| **LLM Providers** | OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, Hugging Face, OpenRouter — with per-provider API key, endpoint URL, and model |
| **Smart Defaults** | Provider-specific placeholders (key format hints like `sk-…`, `AIza…`), default URLs, suggested models |
| **Required Fields** | Azure OpenAI URL and deployment model show red asterisk indicators with amber warning messages |
| **Cloud STT** | OpenAI Whisper API, Azure Cognitive Speech, Deepgram — beyond the free browser Web Speech API and offline Whisper WASM |
| **Cloud TTS** | OpenAI TTS, Azure Speech, ElevenLabs — premium voices alongside free browser-native narration |
| **Self-Hosted Backends** | Override Core API, Orchestrator, Knowledge Service URLs for private deployments |
| **Export / Import** | Share workshop configs as JSON; import merges with existing settings |
| **Security** | Privacy notes at the top of settings, clear trust banner, no telemetry |

**How to use:** Navigate to **Tools → API Settings** or click the ⚙ gear icon. A 4-step Quick Configuration Guide auto-expands when no keys are configured.

### 🎤 Voice Input — Speak to the Platform

All text inputs now accept **voice dictation** with a microphone button. Engine priority:

1. **Web Speech API** (free, real-time, browser-native)
2. **Whisper WASM** (offline fallback, lazy-loaded ~40 MB model)
3. **Cloud STT** (OpenAI Whisper, Azure Speech, Deepgram) when configured in BYOK settings

Voice also powers **navigation**: say "go to patterns" or "open study mode" to navigate hands-free.

### 🗂 Mega-Menu Navigation Redesign

The top navigation has been reorganized into **four color-coded categories** with a dropdown mega-menu:

| Category | Color | Contains |
|----------|-------|----------|
| **Learn** | Blue → Cyan | Core Concepts, Agent Patterns, Learning Atlas, References |
| **Apply** | Amber → Orange | Agents for Science, Adoption Playbook, Applied AI Skills, Azure Services |
| **Practice** | Emerald → Teal | Study Mode, Knowledge Quiz, Knowledge Search, Community |
| **Tools** | Violet → Purple | API Docs, Agents Console, API Settings |

New items show a pulsing gold badge. Mobile gets a grouped dropdown menu with the same color scheme.

---

##  Previous Updates (February 16, 2026)

### 🔊 XYZ-Claw: Multi-Agent Orchestration — Audio Narrations

Step-by-step audio narrations at three levels (Beginner ~4 min, Intermediate ~6 min, Advanced ~7 min), powered by Web Speech API or cloud TTS. Supports **29 languages** with auto-translation, voice selection, speed control, and volume adjustment.

### ⚛ Atomic Deep-Dive Tabs — Interactive Concept Visualizers

40+ slider-driven, interactive visualizations across 10 concept pages (Reasoning, Memory, Fine-Tuning, Multi-Agent, Prompt Injection, Architecture, MCP, Evaluation, Observability, Cost Optimization). Each gains an **⚛ Atomic** tab with a Challenge Ladder (Observe → Predict → Experiment → Synthesize).

---

##  Previous Updates (February 14, 2026)

### Atomic LLM Training (microGPT)
- Build a dependency-free GPT in ~200 lines of pure Python
- 5 progressive tabs, 10 embedded interactive visuals, 10 quiz questions
- Tier 1 Fundamentals concept — no prerequisites

---

##  Previous Updates (February 5, 2026)

### New Concepts

🆕 **AI-Ready Data: From Data to Decisions**
- Comprehensive 8-part framework for enterprise AI data readiness
- Visible Cracks: Data constraints (semantic drift, ownership, lineage)
- The Trust Trap: Trust erosion mechanisms and automation risks
- Shadow Forces: Organizational dynamics (hoarding, gaming, blame avoidance)
- Decision DNA: Systematic decision capture methodology
- Trust Architecture: Six dimensions of data quality contracts
- The Ladder: 5-stage maturity progression (Raw → Autonomous)
- The Flywheel: Implementation strategy and momentum building
- The Imperative: Strategic positioning and competitive urgency
- 8 Socratic questions for discovery-based learning
- Prerequisite concept for Data & Knowledge Operations

---

##  Previous Updates (January 31, 2026)

### New Concepts
- **MCP Apps & Agent UI** — Interactive UI standard for AI agents (`ui://` pattern, sandboxed iframes, cross-platform SDKs)
- **CLI Coding Agents** — Copilot CLI, Claude Code, Codex CLI, Gemini CLI with AGENTS.md/CLAUDE.md patterns
- **Agent Skills** — SKILL.md specification for modular agent expertise
- **Agent Red Teaming** — PyRIT framework, 5 attack types, 10 risk categories, ASR metrics
- **Agent Troubleshooting Playbook** — Failure taxonomy, diagnostic decision trees, emergency runbooks
- **Agent Economics** — Cost modeling, pricing strategies, ROI framework, Make vs Buy
- **Agent Career Paths** — 7 roles ($80K–$300K), 4-level skill progression, 6 certifications
- **Industry-Specific Agents** — 6 verticals (Healthcare, Finance, Legal, Education, Manufacturing, Retail)
- **Agent Templates Hub** — 5 starter templates (Basic → Production-Ready), quickstart guides

### 2026 Agent Patterns
- Skill-Augmented Agent, MCP Server Orchestration, Multi-LLM Routing, Agentic IDE, Guardrails Layer

### Production Foundations
- Agent Reasoning Patterns (CoT, ToT, GoT, ReAct)
- Agent Memory Systems (short/long-term, episodic, semantic)
- Agent Observability (OpenTelemetry, LangSmith)
- Agent Testing & Benchmarks (SWE-Bench, GAIA, WebArena)
- Prompt Injection Defense
- Human-in-the-Loop Patterns
- Agent Cost Optimization (50–90% cost reduction strategies)

---

##  Previous Updates (September 30, 2025)

- PWA install experience: "Install App" menu item, platform-specific dialogs, one-click install
- Console cleanup: suppressed CORS errors, Workbox debug logs, ref warnings
- Documentation restructure: simplified main README, details moved to docs/

---

##  Learning Paths

### **Navigation Design Philosophy**

The top navigation uses a **four-category mega-menu** that mirrors the learning lifecycle:

| Category | Purpose |
|----------|--------|
| **Learn** | Foundation — Core Concepts, Agent Patterns, Learning Atlas, References |
| **Apply** | Real-world — Agents for Science, Adoption Playbook, Applied AI Skills, Azure Services |
| **Practice** | Hands-on — Study Mode, Knowledge Quiz, Knowledge Search, Community |
| **Tools** | Config — API Docs, Agents Console, **API Settings (BYOK)** |

**Rationale**: Learners progress from **Learn** (concepts) → **Apply** (real-world use) → **Practice** (exercises) → **Tools** (configure your own environment). The BYOK settings are in Tools so learners can get started immediately without keys and configure providers when they're ready for AI-powered features.

###  **Beginner Path** (Start Here)
1. Core Concepts → Agent Fundamentals
2. Learning Journey Map (interactive progression)
3. Knowledge Quiz (assess comprehension)
4. Study Mode: Socratic Questions

###  **Intermediate Path**
1. Agent Patterns → Educational Patterns
2. Multi-Agent Systems
3. Data Strategy Visualization
4. Code Playbooks & Examples

###  **Advanced Path**
1. Data Autonomy Patterns (8 foundational patterns)
2. Critical Thinking Challenges
3. Production Operations & Monitoring
4. Strategy Toolkits (downloadable canvases)

### 🔑 **Self-Hosted / BYOK Path**
1. Clone the repo and `npm run dev`
2. Open **Tools → API Settings** — configure your preferred LLM provider
3. Enable cloud STT/TTS if desired (optional — browser-native works out of the box)
4. Override backend URLs to point at your own Core API, Orchestrator, or Knowledge Service
5. Export your config as JSON for teammates or workshop participants

### **🆕 Organizational Adoption Path**
1. Adoption Playbook → Mission Brief (discovery questions)
2. Transformation Journey (5-phase roadmap)
3. Operating System Design (governance, platform, culture)
4. Activation Plan (first 90 days)
5. Study Mode: Adoption Strategy challenges

---

##  Contributing

We welcome contributions! Whether it's:

-  **Bug Reports** - Found an issue? [Open an issue](https://github.com/bhakthan/OpenAgentSchool/issues)
-  **Feature Requests** - Have an idea? We'd love to hear it!
-  **Documentation** - Help improve our guides
-  **Code Contributions** - Submit a pull request

See **[AGENTS.md](./AGENTS.md)** for guidance on contributing code.

---

##  Platform Stats

- **58 Core Concepts** across 8 learning tiers
- **67+ Agent Patterns** (Core + Educational + Data Autonomy + Quantum/Robotics + Deep Research + 2026 Patterns)
- **200+ Quiz Questions** across 15+ categories
- **90+ Interactive Visualizations** (D3, React Flow, custom diagrams, 40+ atomic deep-dive visualizers)
- **10 Atomic Deep-Dive Tabs** with slider-driven interactive concept explorers
- **8 Strategy Toolkits** (downloadable XLSX canvases)
- **6 LLM Providers** supported in BYOK settings (OpenAI, Azure, Gemini, Claude, Hugging Face, OpenRouter)
- **6 Cloud Speech Services** (3 STT + 3 TTS) alongside free browser-native options
- **29 Languages** for audio narration with auto-translation
- **5 Learning Modes** (Concepts, Study, Critical Thinking, Interactive Scenarios, Debug Challenges)

---

##  Technology Stack

**Frontend**
- React 18 + TypeScript + Vite
- TailwindCSS 4 + Radix UI (Sheet, Accordion, RadioGroup, Alert, Navigation Menu, …)
- D3.js for visualizations
- React Flow for agent workflows
- Web Speech API + Whisper WASM for voice input
- localStorage BYOK for zero-server key management

**Backend (Optional)**
- Python 3.12 + FastAPI
- PostgreSQL + DuckDB
- OpenAI/Anthropic/Azure OpenAI
- Docker Compose

**Infrastructure**
- Azure Static Web Apps
- GitHub Actions CI/CD
- Progressive Web App (PWA)
- Service Worker caching

---

##  License

MIT License - see [LICENSE](LICENSE) for details.

---

##  Acknowledgments

Built with  by the Open Agent School community, powered by AI assistance and lots of human expertise.

**Special Thanks:**
- Microsoft Learn AI documentation
- OpenAI, Anthropic, Google, and Azure AI teams
- Open source community (React, D3, Vite, and countless libraries)

---

##  Contact & Community

- **Website**: [openagentschool.org](https://openagentschool.org)
- **GitHub**: [github.com/bhakthan/OpenAgentSchool](https://github.com/bhakthan/OpenAgentSchool)
- **Issues**: [Report bugs or request features](https://github.com/bhakthan/OpenAgentSchool/issues)

---

<div align="center">

**Start your AI agent learning journey today!** 

[Visit Open Agent School ](https://openagentschool.org)

</div>
