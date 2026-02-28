---
name: instructional-design
description: |
  Apply research-backed instructional design principles to educational content. Use this skill when:
  - Writing or reviewing concept pages, tutorials, or learning materials
  - Structuring content for progressive complexity (concrete → abstract)
  - Adding critical thinking challenges, reflection prompts, or self-assessment
  - Designing visual layouts for educational infographics or diagrams
  - Ensuring content follows "What, Why, How" structure per section
  - Bridging unfamiliar concepts with analogies, code examples, and juxtaposition
  - Creating study mode questions that test transfer, not just recall
  - Reviewing learning content for cognitive load and spatial organization
---

# Instructional Design Principles

Research-backed principles for creating effective educational content on the OpenAgentSchool platform. Every concept page, visualization, quiz, and tutorial should apply these principles to maximize learner understanding and retention.

## Overview

These seven principles form the foundation of how OpenAgentSchool content should be structured:

```
Component Isolation → Spatial Organization → Abstraction Bridging
         │                    │                       │
         │                    │                       └─ Concrete → Abstract
         │                    └─ Top-down flow, left-right timelines
         └─ One concept per section, clear visual boundaries

Expert Thinking → Juxtaposition → Metacognition → Critical Thinking
      │                │                │                │
      │                │                │                └─ Design challenges, transfer
      │                │                └─ "Think About It" prompts, self-questioning
      │                └─ Wrong vs. Right, Before/After, Sequential vs. Parallel
      └─ Trade-offs, alternative approaches, problem-solving
```

---

## Principle 1: Component Isolation

**Each section focuses on ONE concept** — no mixing of ideas within a single visual or textual block.

### Application

- Each concept page section covers a single idea (queue, agents, teams, security)
- Visual barriers between components: rounded boxes, color zones, section dividers
- Every section follows a **"What, Why, How"** structure:
  - **What** — define the concept in one sentence
  - **Why** — explain why it matters (real-world relevance)
  - **How** — show how it works (code, diagram, example)

### In OpenAgentSchool

```tsx
// Each concept section is self-contained
<section className="rounded-xl border bg-card p-6 space-y-4">
  <h2>What is a Message Queue?</h2>        {/* What */}
  <p>Why agents need asynchronous communication...</p>  {/* Why */}
  <CodeBlock language="python">{exampleCode}</CodeBlock> {/* How */}
</section>
```

---

## Principle 2: Spatial Organization

**Layout mirrors the learner's mental model** — information flows in the direction learners naturally process it.

### Application

- **Top-to-bottom** flow mirrors problem → solution progression
- **Left-to-right** in timelines mirrors Western reading order
- **Vertical layering** (3D diorama style) shows abstraction levels — concrete at bottom, abstract at top
- Group related elements spatially; separate unrelated elements with whitespace

### In OpenAgentSchool

- Concept pages: definition at top → explanation → examples → exercises at bottom
- Learning Atlas: tree flows top-down (foundations → specializations)
- Study mode: question → answer options → feedback → next question

---

## Principle 3: Abstraction Bridging

**Start concrete, then go abstract** — bridge the gap between what learners already know and new concepts.

### Application

- **Concrete examples first**: Show a Discord message before explaining the actor model
- **Code snippets bridge description to implementation**: Verbal explanation → pseudocode → real code
- **Analogies bridge unfamiliar to familiar**: "A message queue is like a theater play's backstage — actors wait for their cue"

### Analogy Patterns

| Concept | Analogy | Why It Works |
|---------|---------|-------------|
| Message queue | Post office mailbox | Physical → digital, ordering preserved |
| Agent orchestration | Theater director | Human coordination → AI coordination |
| Authentication | Lock-and-key | Physical security → digital security |
| RAG (Retrieval) | Librarian finding books | Human knowledge work → AI knowledge work |
| Fine-tuning | Teaching a specialist | Human expertise → model expertise |

### In OpenAgentSchool

Every concept page should open with a concrete, relatable scenario before introducing formal definitions. Learners who encounter `"Think of it like..."` before `"Formally, this is defined as..."` retain better.

---

## Principle 4: Expert Thinking

**Show trade-offs, not just benefits** — expose learners to how experts actually reason about design choices.

### Application

- **"Critical Thinking Challenge" boxes** force problem-solving before revealing the answer
- **Performance graphs** show trade-offs (latency vs. throughput, consistency vs. availability)
- **Alternative approaches** presented with pros/cons, not a single "right way"
- Real metrics and data when possible (e.g., "2.25x speedup with parallel processing")

### In OpenAgentSchool

```markdown
> **🧠 Critical Thinking Challenge**
> 
> You have 3 agents that each take 500ms to respond. Compare:
> - Sequential execution: 3 × 500ms = 1500ms
> - Parallel execution: max(500ms, 500ms, 500ms) = 500ms (3x faster)
> 
> But what are the trade-offs of parallel execution? 
> Think about error handling, resource consumption, and result ordering.
```

---

## Principle 5: Juxtaposition

**Compare and contrast explicitly** — showing wrong vs. right, before vs. after, or two approaches side-by-side creates stronger learning.

### Application

- **Wrong vs. Right**: Show shared workspace approach (bad) next to isolated agent approach (good)
- **Sequential vs. Parallel**: With actual timing data showing the difference
- **Before/After metrics**: Concrete numbers (e.g., "2.25x speedup", "40% reduction in errors")

### In OpenAgentSchool

```tsx
// Side-by-side comparison component pattern
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="rounded-lg border-red-200 bg-red-50 dark:bg-red-950/20 p-4">
    <h4 className="text-red-600 font-medium">❌ Without Tool Use</h4>
    <p>Agent hallucinates current stock prices...</p>
  </div>
  <div className="rounded-lg border-green-200 bg-green-50 dark:bg-green-950/20 p-4">
    <h4 className="text-green-600 font-medium">✅ With Tool Use</h4>
    <p>Agent calls real-time API, returns accurate data...</p>
  </div>
</div>
```

---

## Principle 6: Metacognition

**Encourage learners to think about their own thinking** — self-awareness accelerates learning.

### Application

- **"Think About It" prompts** pause the learner before revealing answers
- **"Why?" callouts** explain the design rationale behind choices, not just the choices themselves
- **"Next Steps" sections** build self-directed learning by suggesting what to explore next
- Prerequisite links make learners aware of knowledge gaps

### In OpenAgentSchool

```markdown
> **💭 Think About It**
> 
> Before reading the next section, ask yourself:
> - What would happen if an agent crashes mid-task?
> - How would you prevent duplicate work across agents?
> - What's the minimum information agents need to share?
```

Study mode Socratic dialog naturally supports metacognition — learners must articulate their reasoning, not just select an answer.

---

## Principle 7: Critical Thinking

**Demand transfer of knowledge** — exercises should require applying concepts to new situations, not just recalling definitions.

### Application

- **Design challenges** require analysis: "What if the orchestrator crashes?"
- **Follow-up questions** push deeper: "How would you prevent duplicate messages?"
- **Real-world application** sections demand transfer: "Design a multi-agent system for [novel scenario]"

### Question Taxonomy (Bloom's Levels)

| Level | Question Type | Example |
|-------|--------------|---------|
| **Remember** | Recall facts | "What is MCP?" |
| **Understand** | Explain concepts | "Why do agents need tool use?" |
| **Apply** | Use in context | "Implement a simple ReAct loop" |
| **Analyze** | Compare/contrast | "Compare orchestrator vs. peer-to-peer patterns" |
| **Evaluate** | Judge trade-offs | "When would you choose RAG over fine-tuning?" |
| **Create** | Design solutions | "Design a multi-agent system for code review" |

**OpenAgentSchool quiz questions should target Analyze, Evaluate, and Create levels** — not just Remember and Understand.

---

## Applying to Content Creation

When writing or reviewing any educational content for OpenAgentSchool:

```
□ Component Isolation: Does each section cover exactly one idea?
□ Spatial Organization: Does the flow match the learner's mental model?
□ Abstraction Bridging: Does it start concrete before going abstract?
□ Expert Thinking: Are trade-offs and alternatives presented?
□ Juxtaposition: Are comparisons shown side-by-side with data?
□ Metacognition: Are there "Think About It" or "Why?" prompts?
□ Critical Thinking: Do exercises require transfer, not just recall?
```

---

## Rules

1. **One concept per section** — if a section covers two ideas, split it
2. **Concrete before abstract** — always lead with a relatable example
3. **Show trade-offs** — never present a technique as purely beneficial
4. **Include reflection prompts** — every concept page should have at least one "Think About It"
5. **Exercises demand transfer** — quiz questions at Analyze level or higher
6. **Use real data** — actual performance numbers, real code, working examples
7. **Visual boundaries matter** — use cards, borders, and color zones to isolate ideas
8. **"What, Why, How" per section** — the universal structure for every teaching block
