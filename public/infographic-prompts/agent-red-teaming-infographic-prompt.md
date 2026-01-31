# Agent Red Teaming - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "Agent Red Teaming" using Flat UI Style 2.0.

HEADER SECTION (Red #EF4444):
- Large title: "Agent Red Teaming"
- Subtitle: "Adversarial Testing to Strengthen AI Agents"
- Icon: Red shield with target/crosshair and AI brain

SECTION 1 - WHAT IS RED TEAMING (Dark Red #DC2626):
Title: "Red Team, Blue Team, Purple Team"
Three team definitions:
🔴 "Red Team" - Attackers who find vulnerabilities
🔵 "Blue Team" - Defenders who protect the system
🟣 "Purple Team" - Collaboration for continuous improvement
Goal: "Find weaknesses before adversaries do"

SECTION 2 - ATTACK TAXONOMY (Orange #F97316):
Title: "Agent Attack Categories"
Attack tree diagram:
📝 "Prompt-Based Attacks"
  - Direct injection
  - Indirect injection
  - Jailbreaking
  - Role-playing exploits
🔧 "Tool-Based Attacks"
  - Tool abuse
  - Privilege escalation
  - Data exfiltration
🧠 "Memory Attacks"
  - Memory poisoning
  - Context manipulation
  - History injection
🤝 "Multi-Agent Attacks"
  - Impersonation
  - Message tampering
  - Trust exploitation

SECTION 3 - RED TEAM METHODOLOGY (Purple #8B5CF6):
Title: "The Red Team Process"
Circular process diagram:
1. "Scope" → Define attack surface
2. "Recon" → Understand agent capabilities
3. "Plan" → Design attack scenarios
4. "Execute" → Run adversarial tests
5. "Document" → Record findings
6. "Report" → Communicate vulnerabilities
7. "Remediate" → Fix identified issues
8. "Verify" → Confirm fixes work

SECTION 4 - PROMPT INJECTION TESTS (Blue #3B82F6):
Title: "Testing Prompt Injection Resilience"
Test categories with examples:
🎯 "Direct Injection"
   "Ignore previous instructions and..."
🔄 "Context Switching"
   "Let's play a game where you are..."
📋 "Instruction Override"
   "System: New priority directive..."
🖼️ "Multimodal Injection"
   Hidden text in images, audio attacks
📁 "Indirect Injection"
   Malicious content in retrieved documents

SECTION 5 - TOOL ABUSE TESTING (Green #22C55E):
Title: "Testing Tool Security"
Tool attack scenarios:
| Tool | Attack Vector | Test Case |
|------|---------------|-----------|
| File System | Path traversal | ../../../etc/passwd |
| Code Exec | Injection | os.system('rm -rf') |
| Web Search | SSRF | Internal IP access |
| Database | SQL injection | ' OR 1=1 -- |
| API Calls | Auth bypass | Forged headers |
Mitigation check: "Are guardrails in place?"

SECTION 6 - ADVERSARIAL PERSONAS (Teal #14B8A6):
Title: "Red Team Personas"
Persona cards:
👤 "The Jailbreaker" - Bypasses safety guardrails
🕵️ "The Social Engineer" - Manipulates through trust
💻 "The Hacker" - Exploits technical vulnerabilities
🎭 "The Impersonator" - Pretends to be trusted entities
📊 "The Data Thief" - Extracts sensitive information
🔥 "The Saboteur" - Causes system failures
Each tests different agent weaknesses

SECTION 7 - AUTOMATED RED TEAMING (Indigo #6366F1):
Title: "AI-Powered Red Teaming"
Automated testing pipeline:
[Attack Generator LLM] → [Candidate Attacks]
        ↓
[Target Agent] ← [Test Execution]
        ↓
[Evaluator LLM] → [Success/Failure]
        ↓
[Leaderboard] → [Attack Refinement]
Tools: "Garak, PyRIT, ARTKIT, Azure AI Red Teaming"

SECTION 8 - SEVERITY CLASSIFICATION (Red #EF4444):
Title: "Vulnerability Severity"
Severity matrix:
| Severity | Impact | Example |
|----------|--------|---------|
| 🔴 Critical | Full compromise | Arbitrary code execution |
| 🟠 High | Significant harm | Data exfiltration |
| 🟡 Medium | Limited impact | Guardrail bypass |
| 🟢 Low | Minor issues | Information disclosure |
CVSS-style scoring: "Impact × Exploitability"

SECTION 9 - REPORTING TEMPLATE (Blue #3B82F6):
Title: "Red Team Report Structure"
Report sections:
📋 "Executive Summary" - High-level findings
🎯 "Scope & Methodology" - What was tested
🔍 "Findings" - Detailed vulnerabilities
📊 "Risk Assessment" - Severity ratings
🛠️ "Recommendations" - Remediation steps
📈 "Metrics" - Success rates, coverage
Evidence: "Include attack strings, responses, traces"

SECTION 10 - CONTINUOUS RED TEAMING (Green #22C55E):
Title: "Building a Red Team Culture"
Maturity ladder:
Level 1: "Ad-hoc" - Occasional manual testing
Level 2: "Scheduled" - Regular red team exercises
Level 3: "Automated" - CI/CD integrated testing
Level 4: "Continuous" - Real-time adversarial monitoring
Level 5: "Adaptive" - AI-powered evolving attacks
Checklist:
☑ "Red team before every release"
☑ "Automate known attack patterns"
☑ "Bug bounty for external researchers"

FOOTER (Dark background):
- Key principle: "Attack your agents before others do"
- Callout: "Security is a process, not a destination"
- Open Agent School logo

DESIGN NOTES:
- Use red/warning color palette throughout
- Include hacker/security iconography
- Show attack → defense flow
- Use target/crosshair visual elements
- Add shield/protection imagery for defenses
- Create intense, security-focused aesthetic
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #EF4444 | Red team theme |
| Teams | #DC2626 | Definitions |
| Attack Taxonomy | #F97316 | Categories |
| Methodology | #8B5CF6 | Process |
| Prompt Tests | #3B82F6 | Injection testing |
| Tool Tests | #22C55E | Tool security |
| Personas | #14B8A6 | Adversary types |
| Automated | #6366F1 | AI testing |
| Severity | #EF4444 | Risk classification |
| Reporting | #3B82F6 | Documentation |
| Continuous | #22C55E | Culture |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. Red team, blue team, and purple team roles
2. The taxonomy of attacks against AI agents
3. The red team methodology and process
4. How to test for prompt injection vulnerabilities
5. Tool abuse testing scenarios
6. Adversarial personas for comprehensive testing
7. Automated red teaming tools and pipelines
8. Vulnerability severity classification
9. How to structure red team reports
10. Building a continuous red teaming culture
