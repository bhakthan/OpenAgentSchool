---
name: doc-coauthoring
description: |
  Structured workflow for co-authoring documentation and educational content. Use this skill when:
  - Writing new concept page content or learning material
  - Drafting technical specs, design docs, or architecture decisions
  - Creating contributor guides or onboarding documentation
  - Writing blog posts, announcements, or release communications
  - Collaboratively refining any substantial written content
  - Ensuring documentation is clear to readers who weren't part of the conversation
---

# Doc Co-Authoring

A structured three-stage workflow for collaboratively writing documentation — from initial brain dump through polished, reader-tested content. Adapted for OpenAgentSchool's educational content needs.

## Overview

```
Stage 1: Context Gathering → Stage 2: Refinement → Stage 3: Reader Testing
     │                              │                        │
     └─ Dump everything you know    └─ Section-by-section    └─ Would a fresh
        + clarifying questions         brainstorm & edit        reader understand?
```

---

## When to Use

| Document Type | Triggers This Skill |
|---------------|---------------------|
| **Concept page content** | "Write the content for the RAG concept page" |
| **Technical spec** | "Draft a spec for the new quiz scoring system" |
| **Architecture decision** | "Document why we chose Radix UI over Headless UI" |
| **Contributor guide** | "Create a guide for adding new concepts" |
| **Release notes** | Use `generate-release-notes` skill instead |
| **Quick fix/update** | Don't use this — just edit directly |

---

## Stage 1: Context Gathering

**Goal**: Close the gap between what you know and what the agent knows.

### Initial Questions

1. **What type of document?** (concept content, spec, decision doc, guide)
2. **Who reads this?** (learners, contributors, maintainers, general public)
3. **What's the desired impact?** (teach a concept, justify a decision, enable contribution)
4. **Is there a template?** (concept pages follow the ConceptsHub pattern)
5. **Any constraints?** (word count, reading level, must link to specific concepts)

### Context Dump

Provide everything relevant — don't worry about organization:

- Background on the topic
- Related concepts or prerequisites
- Key points that must be covered
- Examples, analogies, or diagrams to include
- What you've seen learners struggle with
- Links to reference material

### Clarifying Questions

After the initial dump, expect 5–10 targeted questions about:
- Edge cases and exceptions
- Audience assumptions (what do readers already know?)
- Scope boundaries (what's in vs. out)
- Tone and style preferences

**Exit condition**: When questions show understanding of the topic — edge cases and trade-offs can be discussed without needing basics explained.

---

## Stage 2: Refinement & Structure

**Goal**: Build the document section by section through brainstorming, curation, and iteration.

### Process per Section

1. **Clarify** — What should this section cover?
2. **Brainstorm** — Generate 5–15 options for content, structure, or framing
3. **Curate** — Pick what works, discard what doesn't
4. **Draft** — Write the section
5. **Refine** — Surgical edits based on feedback

### For Concept Pages

OpenAgentSchool concept pages follow a consistent structure:

```markdown
## What is {Concept}?
Brief, accessible definition. No jargon without explanation.

## Why It Matters
Real-world relevance — why should a learner care?

## How It Works
Technical explanation with increasing depth.
Include diagrams, code examples, or interactive demos.

## Key Patterns
Named patterns or approaches within this concept.

## Hands-On
Interactive exercise, quiz questions, or "try this" prompts.

## Prerequisites
Links to concepts that should be understood first.

## Further Reading
External resources — papers, docs, tutorials.
```

### Writing Style for OpenAgentSchool

| Guideline | Example |
|-----------|---------|
| **Plain language** | "The agent decides what to do next" not "The agent's deliberative process yields an action selection" |
| **Motivational** | "You'll be able to build..." not "This section covers..." |
| **Concise** | Get to the point. Trim filler words. |
| **No unexplained jargon** | First use of any term gets a brief explanation |
| **Active voice** | "The orchestrator routes requests" not "Requests are routed by the orchestrator" |
| **Show, don't tell** | Code examples, diagrams, analogies over abstract descriptions |

---

## Stage 3: Reader Testing

**Goal**: Verify the document works for someone who wasn't part of the writing process.

### Step 1: Predict Reader Questions

What would someone ask after reading this?

- Can they explain the concept back in their own words?
- Do they know what to do next (learn a prerequisite, try an exercise)?
- Are there terms they'd need to look up?
- Is anything ambiguous or assumes too much context?

### Step 2: Self-Test

Read the document fresh and check:

```
□ A learner with listed prerequisites can understand this
□ Every term is defined or linked to a concept that defines it
□ Code examples are complete and runnable (or clearly pseudocode)
□ Diagrams have alt text and descriptive captions
□ Links to other concepts use valid concept IDs
□ The document stands alone — doesn't require conversation context
```

### Step 3: Check for Common Issues

```
□ No "wall of text" — break up long paragraphs
□ Headers create clear sections for scanning
□ Key takeaways are prominent (not buried in prose)
□ Prerequisites are listed at the top, not discovered mid-read
□ No broken internal links or concept ID references
```

### Step 4: Iterate

If issues are found, loop back to Stage 2 for the problematic sections.

**Exit condition**: The document is understandable to its target audience without the context of this conversation.

---

## Quick Reference: Document Types

### Concept Page
- **Template**: See Stage 2 concept page structure above
- **Location**: `src/components/concepts/` (component) + content inline
- **ID format**: kebab-case (e.g., `retrieval-augmented-generation`)
- **Description**: ≤ 140 chars for card display

### Technical Spec
- **Template**: Use `update-specification` skill from awesome-copilot or freeform
- **Location**: `specs/` directory or wiki
- **Audience**: Contributors and maintainers

### Architecture Decision
- **Format**: Context → Decision → Consequences
- **Location**: Wiki (openagent-wiki repo) or `docs/`
- **Audience**: Current and future maintainers

---

## Rules

1. **Gather context before writing** — skipping Stage 1 produces generic content
2. **Section-by-section, not all-at-once** — iterating on sections produces better results
3. **Test from the reader's perspective** — the doc must work without conversation context
4. **Match the project's voice** — motivational, concise, plain-language
5. **Link, don't repeat** — reference existing concepts by ID instead of re-explaining
6. **Show, don't tell** — code examples and diagrams beat prose
7. **Generated docs go to wiki** — per project convention, not `docs/` in this repo
