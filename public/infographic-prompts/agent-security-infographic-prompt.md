# Agent Security - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "AI Agent Security" using Flat UI Style 2.0.

HEADER SECTION (Red #EF4444):
- Large title: "AI Agent Security"
- Subtitle: "Protecting Autonomous AI Systems from Threats"
- Icon: Shield with AI brain and lock

SECTION 1 - THREAT LANDSCAPE (Dark Red #DC2626):
Title: "The 6 Agent Attack Vectors"
Hexagonal threat diagram:
1. "Prompt Injection" - Syringe icon, malicious prompts hijack behavior
2. "Jailbreaking" - Broken chain, bypassing safety guardrails
3. "Data Poisoning" - Toxic symbol, corrupting training/context
4. "Tool Abuse" - Hammer with warning, misusing agent capabilities
5. "Memory Manipulation" - Brain with bug, corrupting agent memory
6. "Agent Impersonation" - Mask icon, fake agents in multi-agent systems

SECTION 2 - DEFENSE IN DEPTH (Green #22C55E):
Title: "Security Layers"
Concentric circles (onion model):
- Outer: "Perimeter" - Input validation, rate limiting
- Second: "Authentication" - API keys, OAuth, JWT
- Third: "Authorization" - Role-based access, permissions
- Fourth: "Execution" - Sandboxing, tool restrictions
- Core: "Monitoring" - Logging, anomaly detection

SECTION 3 - INPUT VALIDATION (Blue #3B82F6):
Title: "Sanitizing Agent Inputs"
Flow diagram showing:
User Input → [Validation Layer] → [Classification] → [Sanitization] → Safe Input
Validation checks:
- "Length limits" - ✓ Max tokens
- "Content filtering" - ✓ Block dangerous patterns
- "Schema validation" - ✓ Structured inputs only
- "Source verification" - ✓ Trusted origins

SECTION 4 - TOOL SECURITY (Orange #F97316):
Title: "Securing Agent Tools"
Tool permission matrix:
| Tool Type | Risk Level | Mitigation |
|-----------|------------|------------|
| Read-only APIs | Low | Basic auth |
| File System | Medium | Sandboxed paths |
| Code Execution | High | Isolated runtime |
| External APIs | High | Allowlist + audit |
| Database Access | Critical | Query sanitization |

SECTION 5 - GUARDRAILS (Purple #8B5CF6):
Title: "Safety Guardrails"
Layered protection diagram:
1. "System Prompt Hardening" - Unmodifiable instructions
2. "Output Filtering" - Block harmful responses
3. "Action Confirmation" - Human approval for risky actions
4. "Capability Boundaries" - Limit what agent can do
5. "Fallback Behaviors" - Safe defaults on errors

SECTION 6 - MULTI-AGENT SECURITY (Teal #14B8A6):
Title: "Securing Agent-to-Agent Communication"
Network diagram showing:
- "Agent Identity" - Each agent has verified identity
- "Message Signing" - Cryptographic signatures
- "Trust Boundaries" - Agents only trust verified peers
- "Privilege Separation" - Different agents, different permissions
- "Audit Trail" - All inter-agent messages logged

SECTION 7 - MONITORING & DETECTION (Indigo #6366F1):
Title: "Security Observability"
Dashboard mockup showing:
- "Anomaly Detection" - Unusual behavior patterns
- "Prompt Analysis" - Injection attempt detection
- "Tool Usage Audit" - What actions agents take
- "Response Monitoring" - Flagged outputs
- "Alert System" - Real-time security notifications
Metrics: "Blocked attempts: 142 | Flagged responses: 23 | Active monitors: 8"

SECTION 8 - SECURITY CHECKLIST (Green #22C55E):
Title: "Agent Security Checklist"
Checkbox list with icons:
☑ "Input validation on all prompts"
☑ "Tool permissions explicitly defined"
☑ "System prompt hardened against injection"
☑ "Output filtering enabled"
☑ "Logging and monitoring active"
☑ "Rate limiting configured"
☑ "Sandboxed execution environment"
☑ "Regular security audits scheduled"

FOOTER (Dark background):
- Warning callout: "⚠️ Never trust user input—always validate"
- Key principle: "Least Privilege + Defense in Depth"
- Open Agent School logo

DESIGN NOTES:
- Use red/warning colors for threats
- Use green/blue for defenses
- Include lock and shield iconography throughout
- Show attack → defense flow clearly
- Use warning triangles for high-risk items
- Add security badge/seal aesthetics
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #EF4444 | Alert, security focus |
| Threats | #DC2626 | Attack vectors |
| Defense Layers | #22C55E | Protection model |
| Input Validation | #3B82F6 | Sanitization flow |
| Tool Security | #F97316 | Permission matrix |
| Guardrails | #8B5CF6 | Safety mechanisms |
| Multi-Agent | #14B8A6 | A2A security |
| Monitoring | #6366F1 | Observability |
| Checklist | #22C55E | Best practices |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. The six primary attack vectors against AI agents
2. Defense-in-depth security architecture
3. Input validation and sanitization techniques
4. How to secure agent tool access
5. Implementing safety guardrails
6. Multi-agent communication security
7. Security monitoring and detection
8. Essential security checklist for production agents
