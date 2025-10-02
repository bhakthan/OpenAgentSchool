#  Open Agent School

[![Static Web Apps CI/CD](https://github.com/bhakthan/OpenAgentSchool/actions/workflows/azure-static-web-apps-delightful-flower-04ec3a31e.yml/badge.svg?branch=main)](https://github.com/bhakthan/OpenAgentSchool/actions/workflows/azure-static-web-apps-delightful-flower-04ec3a31e.yml)
[![Latest release](https://img.shields.io/github/v/release/bhakthan/OpenAgentSchool?include_prereleases&sort=semver)](https://github.com/bhakthan/OpenAgentSchool/releases)
[![License](https://img.shields.io/github/license/bhakthan/OpenAgentSchool.svg)](LICENSE)

> **Where AI Agent Concepts Come to Life**  
> _An interactive learning platform for mastering AI agents, patterns, and production architectures_

** Live Platform:** [openagentschool.org](https://openagentschool.org)

---

## What is Open Agent School?

Open Agent School is a **comprehensive educational platform** designed to help developers, architects, and product managers master AI agentsfrom foundational concepts to advanced production patterns.

###  What You'll Learn

**Core Foundations**
-  **AI Agent Fundamentals** - Architecture, reasoning, tool use, and memory systems
-  **Agent Communication Protocols** - MCP (Model Context Protocol) and ACP (Agent Communication Protocol)
-  **AI Safety & Governance** - Responsible AI practices, security, and compliance frameworks
-  **Evaluation Methods** - Testing, benchmarking, and quality assurance for agents

**Advanced Patterns**
-  **Multi-Agent Systems** - Coordination, orchestration, and swarm intelligence
-  **Data Autonomy Patterns** - Perception normalization, schema decomposition, action grounding
-  **Business Use Cases** - Commerce, robotics, healthcare, and enterprise applications
-  **Educational Frameworks** - Socratic learning, adaptive tutoring, and skill assessment

**Production Practices**
-  **Deployment & Operations** - Platform ops, monitoring, and continuous improvement
-  **Cost & Value Engineering** - Optimization strategies and ROI frameworks
-  **Human-Centric Adoption** - Change management, HITL workflows, and recovery design
-  **Ecosystem & Partnerships** - Vendor evaluation and integration stewardship

---

##  Key Features

###  Interactive Learning Experience

- **52+ Agent Patterns** with code examples and visualizations
- **Learning Atlas** - Interactive taxonomy tree with exportable diagrams
- **Study Mode** - Socratic questioning and discovery-based learning
- **Critical Thinking Challenges** - Real-world scenarios with AI-powered assessment
- **Knowledge Quiz** - Test comprehension across all topics

###  Visual Learning Tools

- **D3 Visualizations** - Dynamic, interactive diagrams for complex concepts
- **Algorithm Walkthroughs** - Step-by-step execution visualizations
- **Export Suite** - SVG, PNG (2x/3x), and PDF export for presentations
- **Dual-Mode Views** - Simple and technical modes for different learning levels

###  Hands-On Practice

- **Code Playbooks** - Runnable code examples in Python and TypeScript
- **Interactive Scenarios** - Debug challenges and failure recovery exercises
- **Live Pattern Runners** - Execute patterns in-browser with real output
- **Strategy Toolkits** - Downloadable canvases and frameworks (XLSX format)

###  Progressive Web App

- **Offline Access** - Content available without internet
- **Install App** - Native app experience on mobile and desktop (menu: Install App)
- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Themes** - Comfortable reading in any environment

---

##  Quick Start

### For Learners

1. **Visit**: [openagentschool.org](https://openagentschool.org)
2. **Explore**: Browse Core Concepts or Agent Patterns
3. **Learn**: Use Study Mode for guided discovery
4. **Practice**: Try interactive scenarios and quizzes

### For Developers

`ash
# Clone the repository
git clone https://github.com/bhakthan/OpenAgentSchool.git
cd OpenAgentSchool

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
`

### With Backend Services (Optional)

`powershell
# Start all three microservices
.\start-backend.ps1

# Services:
# - Core API (8000): User management, quiz, progress
# - Agent Orchestrator (8002): AI agents, critical thinking
# - Knowledge Service (8003): Document processing, semantic search
`

> **Note**: The frontend works standalone. Backend services enable advanced features like user progress tracking and AI-powered assessments.

---

##  Documentation

- **[Detailed Documentation](./docs/DETAILED_README.md)** - Comprehensive feature list and architecture
- **[Backend Integration](./BACKEND_INTEGRATION.md)** - Microservices setup and API reference
- **[Agent Guide](./AGENTS.md)** - Guide for AI coding agents contributing to the project
- **[Architecture Overview](./docs/backend/ARCHITECTURE_OVERVIEW.md)** - System design and service dependencies

---

##  Recent Updates (September 30, 2025)

### UX Improvements

 **PWA Install Experience**
- Disabled auto-popup installation prompt (was appearing after 3-5 seconds)
- Added "Install App" menu item in top navigation
- Platform-specific installation dialogs (iOS vs Android/Desktop)
- One-click install for supported browsers

 **Console Cleanup**
- Disabled backend health checks to prevent CORS errors when services aren't running
- Suppressed Workbox debug logs in development mode
- Fixed React ref forwarding warnings in FutureStateTrends component

 **PWA Manifest Enhancement**
- Added all 8 icon sizes (72x72 through 512x512) to eliminate browser warnings
- Proper support for different device screen densities
- Consistent manifest across dev and production

### Developer Experience

 **Code Quality**
- Fixed component ref handling to follow React best practices
- Improved error handling in OfflineBanner component
- Enhanced Vite configuration for cleaner development logs

 **Documentation Restructure**
- Moved comprehensive README to docs/DETAILED_README.md
- Created simplified main README for better first impression
- Preserved all technical details in dedicated documentation

---

##  Learning Paths

###  **Beginner Path** (Start Here)
1. Core Concepts  Agent Fundamentals
2. Learning Journey Map (interactive progression)
3. Knowledge Quiz (assess comprehension)
4. Study Mode: Socratic Questions

###  **Intermediate Path**
1. Agent Patterns  Educational Patterns
2. Multi-Agent Systems
3. Data Strategy Visualization
4. Code Playbooks & Examples

###  **Advanced Path**
1. Data Autonomy Patterns (8 foundational patterns)
2. Critical Thinking Challenges
3. Production Operations & Monitoring
4. Strategy Toolkits (downloadable canvases)

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

- **35+ Agent Patterns** (Educational + Data Autonomy + Business Use Cases)
- **150+ Quiz Questions** across 12 categories
- **40+ Interactive Visualizations** (D3, React Flow, custom diagrams)
- **8 Strategy Toolkits** (downloadable XLSX canvases)
- **4 Learning Modes** (Concepts, Study, Critical Thinking, Interactive Scenarios)

---

##  Technology Stack

**Frontend**
- React 18 + TypeScript + Vite
- TailwindCSS 4 + Radix UI
- D3.js for visualizations
- React Flow for agent workflows

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
