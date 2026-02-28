---
name: frontend-design
description: |
  Create distinctive, polished frontend interfaces for the learning platform. Use this skill when:
  - Building new concept pages, visualizations, or interactive components
  - Designing landing pages, dashboards, or feature showcases
  - Styling or beautifying existing UI to be more engaging and memorable
  - Creating components that feel intentionally designed, not generically AI-generated
  - Building educational demos or interactive examples within concept pages
  - Ensuring visual consistency with the teal/dark theme and Radix UI system
---

# Frontend Design

Create distinctive, production-grade frontend interfaces for OpenAgentSchool that are visually engaging, learner-friendly, and avoid generic "AI slop" aesthetics — while respecting the existing design system.

## Design Context

OpenAgentSchool is an **educational platform about AI agents**. Every interface should feel:
- **Approachable** — learners of all levels should feel welcome, not intimidated
- **Trustworthy** — clean, professional design signals quality educational content
- **Engaging** — interactive elements and visual polish encourage exploration
- **Distinctive** — not another cookie-cutter React template

### Existing Design System Constraints

| Element | Convention | Details |
|---------|-----------|---------|
| **Framework** | React 19 + TypeScript | Functional components, hooks |
| **Styling** | Tailwind CSS v4 | Utility-first; order: layout → spacing → color → motion |
| **Components** | Radix UI primitives | 25+ packages — Dialog, Tabs, Accordion, etc. |
| **Icons** | Lucide React, Phosphor Icons, Heroicons | Mix of icon sets |
| **Animation** | Framer Motion | Page transitions, micro-interactions |
| **Theme** | Teal accent `#009c84` | Dark/light mode via CSS variables |
| **Path alias** | `@/` → `src/` | Standard import alias |

---

## Design Thinking (Before Coding)

Before writing any component, answer:

1. **Purpose**: What does this page/component help the learner accomplish?
2. **Context**: Where does it sit in the learning journey? (discovery, deep-dive, practice, review)
3. **Tone**: Educational platform tone — motivational, clear, not condescending
4. **Differentiation**: What makes this memorable? A striking visualization? A clever interaction? An unexpected layout?

---

## Visual Quality Guidelines

### Typography

```
□ Headings create clear hierarchy (text-3xl → text-xl → text-lg → text-base)
□ Body text is ≥ 16px (text-base) with ≥ 1.5 line-height
□ Code blocks use monospace with visible background and padding
□ Card descriptions are ≤ 140 characters (project convention)
□ Don't stack multiple font sizes without clear hierarchy purpose
```

### Color & Theme

```
□ Primary accent: teal (#009c84) for CTAs, active states, highlights
□ Use CSS variables / Tailwind theme tokens, not hardcoded hex
□ Both dark and light modes look intentional (not just inverted)
□ Status colors are semantic: green=success, red=error, amber=warning
□ Backgrounds create depth: subtle gradients, layered cards, shadows
□ Color is never the only differentiator (accessibility rule)
```

### Layout & Composition

```
□ Generous whitespace — educational content needs room to breathe
□ Content max-width keeps long text readable (~65-75ch for prose)
□ Cards in grids have consistent heights and visual weight
□ Important actions are visually prominent (size, color, position)
□ Mobile layout is a first-class experience, not an afterthought
□ Consider asymmetric layouts for feature highlights and hero sections
```

### Motion & Interaction

```
□ Page transitions use Framer Motion (consistent with existing pages)
□ Stagger reveals for lists/grids (animation-delay) create delight
□ Hover states are visually distinct and feel responsive
□ Loading states use skeleton screens or subtle animations, not spinners
□ Animations serve a purpose (guide attention, show state) — not just decoration
□ Keep transitions under 300ms for interactive elements
```

### Backgrounds & Visual Details

```
□ Avoid flat white/black backgrounds — add subtle texture or gradient
□ Cards benefit from subtle borders, shadows, or glass-morphism
□ Concept category badges use color-coded pill designs
□ Code examples should feel "embedded" with proper background treatment
□ Hero sections can use gradient meshes, geometric patterns, or illustrations
```

---

## Anti-Patterns (What to Avoid)

These make interfaces feel generic and AI-generated:

| ❌ Avoid | ✅ Instead |
|----------|-----------|
| Inter/Roboto/Arial as display font | Use the project's font stack; add character with weight/size variation |
| Purple gradient on white background | Teal accent on warm/cool neutrals; gradients should be subtle |
| Identical card sizes in a flat grid | Vary card prominence; feature cards, compact cards, list views |
| Stock-photo hero with generic tagline | Data visualization, animated concept diagram, or interactive demo |
| Every section centered with same spacing | Vary rhythm — tight sections, breathing sections, full-bleed sections |
| Default Radix UI unstyled appearance | Style Radix primitives with Tailwind to match the design system |

---

## Component Patterns for Educational UI

### Concept Card (Discovery)

```tsx
// Concept cards should invite exploration
<Card className="group relative overflow-hidden rounded-xl border border-border/50 
                 bg-card p-6 transition-all duration-200 
                 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
  <div className="flex items-start gap-4">
    <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
      <ConceptIcon className="h-5 w-5" />
    </div>
    <div className="flex-1 space-y-1.5">
      <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
        {concept.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {concept.description}
      </p>
    </div>
  </div>
  {/* Subtle gradient highlight on hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
</Card>
```

### Interactive Demo (Learning)

```tsx
// Demos should be "try it yourself" — not just read
<div className="rounded-xl border bg-card overflow-hidden">
  <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/30">
    <span className="text-sm font-medium">Live Demo</span>
    <Button variant="ghost" size="sm" onClick={resetDemo}>
      <RotateCcw className="h-3.5 w-3.5 mr-1" />
      Reset
    </Button>
  </div>
  <div className="p-6">
    {/* Interactive content here */}
  </div>
</div>
```

### Progress Indicator (Motivation)

```tsx
// Progress should feel rewarding, not clinical
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">Your progress</span>
    <span className="font-medium text-primary">{completed}/{total} concepts</span>
  </div>
  <Progress value={(completed / total) * 100} className="h-2" />
</div>
```

---

## Verification

After creating or updating UI:

```bash
# 1. Visual check in dev
npm run dev  # → http://localhost:5000

# 2. Check both themes
# Toggle dark/light mode in the app

# 3. Responsive check
# Resize browser to 375px, 768px, 1440px

# 4. Build check (Tailwind class purging)
npm run build && npm run preview

# 5. Lint
npm run lint
```

---

## Rules

1. **Respect the design system** — use Tailwind tokens and Radix primitives, don't introduce new CSS frameworks
2. **Both themes must work** — never design only for light or dark mode
3. **Mobile is a first-class citizen** — 60%+ of learners may be on phones/tablets
4. **Performance matters** — lazy-load heavy components, optimize images, keep bundles small
5. **Accessibility is non-negotiable** — see the `accessibility-review` skill
6. **Card descriptions ≤ 140 chars** — learner-facing copy convention
7. **Be bold but consistent** — creative flourishes should enhance, not clash with, the existing aesthetic
