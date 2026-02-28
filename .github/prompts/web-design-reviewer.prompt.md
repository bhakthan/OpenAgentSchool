---
name: web-design-reviewer
description: |
  Visually inspect and fix design issues across the web application. Use this skill when:
  - Reviewing UI layout, spacing, and visual consistency across pages
  - Checking responsive behavior on mobile, tablet, and desktop viewports
  - Auditing concept cards, study mode, and visualization pages for design quality
  - Fixing Tailwind utility issues, overflow, or alignment problems
  - Reviewing theme consistency (teal accent, dark mode, Radix UI primitives)
  - Catching visual regressions after dependency upgrades or refactors
---

# Web Design Reviewer

Visual inspection and design quality audit for the OpenAgentSchool learning platform — concept pages, visualizations, study mode, navigation, and responsive layout.

## Overview

```
Capture → Inspect → Classify → Fix → Verify
   │         │          │        │       │
   │         │          │        │       └─ Re-screenshot, confirm fix
   │         │          │        └─ Tailwind/CSS source-level fix
   │         │          └─ Layout | Spacing | Color | Typography | Responsive
   │         └─ Compare against design checklist
   └─ Screenshot key pages at multiple viewports
```

## When to Use

- **After UI changes**: New concept pages, layout refactors, component updates
- **Responsive check**: Verify mobile/tablet experience isn't broken
- **Theme updates**: When modifying teal accent, dark mode, or Radix theme tokens
- **Dependency upgrades**: After Tailwind, Radix UI, or Framer Motion bumps
- **Pre-deploy review**: Visual sanity check before shipping to production

---

## Visual Checklist

### Layout & Structure

```
□ Page has clear visual hierarchy (heading → subheading → content)
□ Content area has consistent max-width and padding
□ No horizontal scrollbar on any viewport (320px–1920px)
□ Cards in grid layouts have consistent heights within rows
□ Sidebar/navigation doesn't overlap content on narrow screens
□ Footer (if present) stays at bottom of page
```

### Spacing & Alignment

```
□ Consistent spacing between sections (Tailwind: space-y-*, gap-*)
□ Cards have uniform internal padding
□ Text is left-aligned (no centered paragraphs of body text)
□ Icons are vertically centered with adjacent text
□ Form labels are aligned with their inputs
□ No orphan text (single word on a line by itself in headings)
```

### Typography

```
□ Heading sizes follow clear hierarchy (text-3xl → text-xl → text-lg)
□ Body text is readable (≥16px / text-base, line-height ≥1.5)
□ Code blocks use monospace font and have visible backgrounds
□ Long text doesn't overflow containers
□ Card descriptions are ≤140 chars (project convention)
□ No text is cut off or hidden without indication
```

### Color & Theme

```
□ Teal accent (#009c84) is used consistently for primary actions
□ Dark mode: text contrasts against dark backgrounds
□ Light mode: no washed-out or invisible elements
□ Status colors are meaningful (green=success, red=error, yellow=warning)
□ Hover/focus states are visually distinct
□ Disabled states are visually clear (opacity or muted color)
```

### Radix UI Components

```
□ Dialogs center correctly and don't exceed viewport on mobile
□ Dropdown menus don't get clipped at viewport edges
□ Tooltips appear in readable positions
□ Tabs content transitions smoothly
□ Accordion expand/collapse animations are smooth
□ Toast notifications are visible and don't overlap content
```

### Visualizations (D3 / Recharts / XYFlow)

```
□ Learning Atlas tree renders without clipping
□ SVG export produces correct bounding box (no cropped labels)
□ Force graph nodes don't pile up in corners
□ Chart legends are readable and positioned correctly
□ Zoom controls are visible and don't overlap visualization
□ Visualizations scale appropriately on smaller screens
```

---

## Key Pages to Review

| Page | Route | What to Check |
|------|-------|---------------|
| **Home / ConceptsHub** | `/concepts` | Card grid, filters, search, category badges |
| **Concept detail** | `/concepts/:id` | Heading hierarchy, content width, code blocks |
| **Learning Atlas** | `/visualization/atlas` | D3 tree, zoom, export buttons, label readability |
| **Study Mode** | `/study-mode` | Quiz layout, answer cards, progress bar, feedback |
| **Adoption forms** | `/adoption/*` | Form layout, validation messages, submit flow |
| **Settings** | Settings dialog | API key inputs, theme toggle, layout |
| **Mobile nav** | Any page < 768px | Hamburger menu, collapsed sidebar, touch targets |

---

## Responsive Breakpoints to Test

| Viewport | Width | What Breaks Often |
|----------|-------|--------------------|
| Mobile S | 320px | Card grids, long titles, nav overflow |
| Mobile L | 425px | Form layouts, dialog sizing |
| Tablet | 768px | Sidebar collapse point, grid column count |
| Laptop | 1024px | Content max-width, visualization sizing |
| Desktop | 1440px | Excessive whitespace, centered content |

```bash
# Quick viewport testing with Playwright
npx playwright screenshot http://localhost:5000/concepts --viewport-size=375,812 mobile.png
npx playwright screenshot http://localhost:5000/concepts --viewport-size=1440,900 desktop.png
```

---

## Common Fix Patterns

### Overflow fix

```tsx
// BEFORE: text overflows container
<div className="w-48">
  <h3>{longTitle}</h3>
</div>

// AFTER: truncate or wrap
<div className="w-48">
  <h3 className="truncate">{longTitle}</h3>
</div>
// or for multi-line:
<h3 className="line-clamp-2">{longTitle}</h3>
```

### Responsive grid

```tsx
// Cards that stack on mobile, 2-col tablet, 3-col desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {concepts.map(c => <ConceptCard key={c.id} {...c} />)}
</div>
```

### Dark mode consistency

```tsx
// Use Tailwind dark: prefix, not hardcoded colors
// BEFORE
<div className="bg-white text-gray-900">

// AFTER
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

### Touch target sizing

```tsx
// Mobile touch targets must be ≥44px
// BEFORE
<button className="p-1 text-sm">

// AFTER
<button className="p-2 min-h-[44px] min-w-[44px] text-sm">
```

---

## Verification

After fixing design issues:

```bash
# 1. Dev server visual check
npm run dev
# → Check at http://localhost:5000 across viewports

# 2. Build check (ensures no Tailwind class purge issues)
npm run build
npm run preview
# → Verify production build looks identical to dev

# 3. Screenshot comparison (if Playwright is available)
npx playwright screenshot http://localhost:5000 --full-page after.png
```

---

## Rules

1. **Use Tailwind utilities** — no inline styles or custom CSS unless absolutely necessary
2. **Utility order**: layout → spacing → color → motion (project convention)
3. **Don't break existing layouts** to fix one issue — surgical fixes only
4. **Verify both themes** — light and dark mode for every change
5. **Test the build** — Tailwind v4 tree-shakes unused classes; verify with `npm run build && npm run preview`
6. **Card descriptions ≤ 140 chars** — learner-facing copy convention
7. **Screenshots are evidence** — capture before/after for every visual fix
