# AI Infographic Generation Prompts

This folder contains detailed markdown prompts for generating high-fidelity educational infographics using **Nano Banana Pro** with **Flat UI Style 2.0**.

## Purpose

These prompts are designed for AI image generation tools to create visually stunning, educational infographics that explain complex AI agent concepts. Each infographic should be:

- **Resolution**: 8K (7680×4320 for landscape, 4320×7680 for portrait)
- **Style**: Flat UI Style 2.0 (clean vectors, subtle gradients, no 3D effects)
- **Background**: Light/white background with subtle grid or dot patterns
- **Orientation**: Landscape (16:9) or Portrait (9:16) as specified
- **Attribution**: Include "Open Agent School" branding at bottom

## Style Guidelines

### Flat UI Style 2.0 Characteristics
- Clean, geometric shapes with rounded corners
- Subtle drop shadows (2-4px blur, 10-20% opacity)
- Pastel accent colors with strong primary colors
- Thin connecting lines (1-2px) with rounded caps
- Sans-serif typography (Inter, SF Pro, or similar)
- Iconography using outlined/filled icon style
- Minimal gradients (soft linear, no radial bursts)
- White or very light gray (#F8FAFC) backgrounds

### Color Palette
| Usage | Color | Hex |
|-------|-------|-----|
| Primary (Agent/AI) | Purple | #8B5CF6 |
| Success/Positive | Green | #22C55E |
| Warning/Caution | Amber | #F59E0B |
| Error/Critical | Red | #EF4444 |
| Info/Process | Blue | #3B82F6 |
| Neutral | Slate | #64748B |
| Background | White | #FFFFFF |
| Light Gray | Slate-50 | #F8FAFC |

### Layout Principles
- Clear visual hierarchy with headers, sections, and details
- Generous whitespace (minimum 40px margins)
- Consistent alignment grid (8px base unit)
- Flow direction: top-to-bottom or left-to-right
- Section separators using subtle lines or whitespace
- Icon-first approach for quick scanning

## File Naming Convention

```
{concept-id}-infographic-prompt.md
```

## Concepts Covered

### Foundational Concepts
1. **AI Agents (Fundamentals)** - What is an AI agent, core components, agent vs chatbot
2. **Agent Architecture** - Core components and building blocks of AI agents
3. **Prompt Engineering** - Crafting effective prompts for agent behaviors
4. **Tool Use & Function Calling** - Modern tool integration patterns

### Reasoning & Memory
5. **Agent Reasoning Patterns** - CoT, ToT, GoT, Reflexion thinking strategies
6. **ReAct Pattern** - Reasoning + Acting loop for agent decision-making
7. **Agent Memory Systems** - Working, short-term, long-term memory hierarchy
8. **Agentic RAG** - Beyond naive retrieval with intelligent search strategies

### Protocols & Communication
9. **Model Context Protocol (MCP)** - Universal standard for AI tool integration
10. **MCP Apps** - SEP-1865 interactive UI extension for Model Context Protocol
11. **A2A Communication** - Agent-to-Agent protocol for multi-agent collaboration
12. **Agent Communication Protocol (ACP)** - Real-time streaming for multi-agent systems

### Multi-Agent & Skills
13. **Multi-Agent Systems** - Orchestration patterns and agent team architectures
14. **Agent Skills & Capabilities** - Building blocks of intelligent agent behavior
15. **Client Coding Agents** - Copilot, Cursor, Windsurf, and AI development tools

### Security & Safety
16. **Agent Security** - Protecting autonomous AI systems from threats
17. **Prompt Injection Defense** - Security layers and attack mitigation
18. **Agent Red Teaming** - Adversarial testing to strengthen AI agents
19. **Agent Ethics** - Building responsible and trustworthy AI agents
20. **AI Safety & Governance** - Enterprise frameworks for safe and compliant AI

### Operations & Deployment
21. **Agent Ops (AgentOps)** - Operating AI agents in production at scale
22. **Agent Deployment** - From development to production-ready agents
23. **Agent Observability** - Tracing, metrics, logs, alerting pipeline
24. **Agent Testing & Benchmarks** - Evaluation methods and CI/CD integration
25. **Agent Evaluation** - Multi-dimensional quality measurement and benchmarks

### Optimization
26. **Agent Cost Optimization** - Token budgets, caching, model routing
27. **Human-in-the-Loop Patterns** - Approval workflows and escalation
28. **Fine-Tuning LLMs** - SFT, DPO, RFT decision framework and workflows

## Usage

1. Open the desired prompt file
2. Copy the complete prompt content
3. Paste into Nano Banana Pro (or similar AI image generator)
4. Generate at 8K resolution
5. Save to `/public/images/infographics/` folder
6. Reference in concept component

## Attribution

All generated infographics should include the Open Agent School logo and URL at the bottom:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    [INFOGRAPHIC CONTENT]                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  🎓 Open Agent School | www.openagentschool.org              │
└──────────────────────────────────────────────────────────────┘
```
