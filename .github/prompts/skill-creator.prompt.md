---
name: skill-creator
description: |
  Create, improve, and test .prompt.md skill files for this project. Use this skill when:
  - Creating a new skill from scratch for the project
  - Improving an existing skill based on usage feedback
  - Evaluating whether a skill triggers correctly and produces good results
  - Optimizing a skill's description for better discoverability
  - Adapting a skill from awesome-copilot or anthropics/skills for this project
---

# Skill Creator

A meta-skill for creating, improving, and maintaining the `.prompt.md` skill files in `.github/prompts/`.

## Overview

OpenAgentSchool uses GitHub Copilot skills as `.prompt.md` files in `.github/prompts/`. Each skill follows the same format:

```markdown
---
name: skill-name-in-kebab-case
description: |
  Brief description of what the skill does. Use this skill when:
  - Trigger condition 1
  - Trigger condition 2
---

# Skill Title

Body content with instructions, examples, checklists, and rules.
```

---

## Creating a New Skill

### Step 1: Define the Skill

Answer these questions before writing:

1. **What does this skill enable?** (one sentence)
2. **When should it trigger?** (list of user phrases/contexts)
3. **What's the expected output?** (code changes, report, documentation, etc.)
4. **What project-specific knowledge does it need?** (file paths, conventions, stack details)
5. **Does a similar skill already exist?** (check `.github/prompts/` for overlap)

### Step 2: Write the SKILL.md

#### Frontmatter

```yaml
---
name: kebab-case-name        # Must be unique across all skills
description: |                # Multi-line YAML string
  One sentence summary.       # First line: what it does
  Use this skill when:        # Then: trigger conditions
  - Condition 1
  - Condition 2
---
```

**Description guidelines:**
- First sentence: what the skill does (action-oriented)
- "Use this skill when:" followed by 4–8 trigger conditions
- Trigger conditions should be natural phrases a user might say
- Include both specific ("upgrading React to latest") and general ("updating dependencies")

#### Body Structure

Every skill should include these sections (adapt as needed):

```markdown
# Title

Overview paragraph — what this skill does and why.

## Overview
ASCII flow diagram showing the process.

## When to Use
Table or list of scenarios where this skill applies.

## [Process Steps]
Numbered steps with checklists, code examples, and commands.
Tuned for OpenAgentSchool's specific stack and conventions.

## Verification
How to confirm the skill's output is correct.

## Rules
Numbered list of constraints and non-negotiables.
```

### Step 3: Tune for OpenAgentSchool

Every skill should reference project-specific details:

| What to Include | Example |
|----------------|---------|
| **File paths** | `src/components/concepts/ConceptsHub.tsx`, `package.json` |
| **Commands** | `npm run build`, `npm run test`, `npm run test:evaluation` |
| **Conventions** | `--noCheck` build, kebab-case IDs, ≤140 char descriptions |
| **Stack details** | React 19, Vite 7, Tailwind v4, Radix UI, Vitest |
| **Architecture** | Dual-repo (frontend + backend at `C:\code\openagent-backend`) |
| **Verification** | Always include how to verify the skill's output works |

### Step 4: Place the File

```
.github/prompts/{skill-name}.prompt.md
```

File naming: same kebab-case as the `name` field in frontmatter.

---

## Improving an Existing Skill

### When to Improve

- Skill triggers but produces low-quality output
- Skill doesn't trigger when it should (description needs better keywords)
- Project conventions changed (new stack version, new file locations)
- Feedback from usage indicates missing steps or edge cases

### Improvement Process

1. **Read the current skill** — understand what it covers
2. **Identify the gap** — what's missing, wrong, or unclear?
3. **Edit surgically** — don't rewrite; fix the specific issue
4. **Verify** — the skill still reads clearly and covers the use case

### Description Optimization

The `description` field determines when the skill triggers. Optimize it by:

- Including keywords users actually say ("upgrade", "update", "bump", "latest")
- Covering synonyms ("test" → "test", "verify", "check", "validate")
- Being specific about the domain ("React components" not just "components")
- Starting with an action verb ("Audit", "Create", "Generate", "Fix")

---

## Adapting External Skills

When bringing in skills from `github/awesome-copilot` or `anthropics/skills`:

### Adaptation Checklist

```
□ Change format from SKILL.md to .prompt.md (if needed)
□ Rewrite frontmatter description with project-specific triggers
□ Replace generic examples with OpenAgentSchool-specific ones
□ Add project file paths, commands, and conventions
□ Remove references to tools/frameworks not in our stack
□ Add verification steps using our test/build commands
□ Add rules that reflect our project conventions
□ Remove any bundled assets that don't apply (or recreate them)
```

### What to Keep vs. Rewrite

| Keep | Rewrite |
|------|---------|
| Core methodology and process steps | Examples and code snippets |
| Universal best practices | Tool/framework-specific instructions |
| Checklist structure | File paths and commands |
| Rule format | Rules that reference our conventions |

---

## Current Skill Inventory

To see all skills in the project:

```bash
ls .github/prompts/*.prompt.md
```

Before creating a new skill, check for overlap with existing ones.

---

## Quality Checklist

```
□ Name is unique and descriptive (kebab-case)
□ Description starts with action verb
□ Description includes 4-8 trigger conditions
□ Body has Overview, process steps, Verification, and Rules
□ Examples use actual project file paths and commands
□ Verification section includes npm test/build commands
□ Rules are numbered and actionable
□ No references to tools/frameworks outside our stack
□ File is at .github/prompts/{name}.prompt.md
```

---

## Rules

1. **One skill per concern** — don't merge unrelated capabilities
2. **Tune for this project** — generic skills are less useful than project-specific ones
3. **Description drives discoverability** — invest time in trigger keywords
4. **Include verification** — every skill should say how to confirm it worked
5. **Keep skills maintainable** — if project conventions change, skills need updating
6. **Don't duplicate** — check existing skills before creating a new one
7. **Surgical edits over rewrites** — when improving, change only what's needed
