---
name: accessibility-review
description: |
  Audit and fix accessibility issues across the web application. Use this skill when:
  - Reviewing components for WCAG 2.1 AA compliance
  - Auditing keyboard navigation, focus management, and screen reader support
  - Checking D3/SVG visualizations and interactive elements for a11y
  - Validating color contrast ratios in the teal/dark theme
  - Ensuring educational content is accessible to all learners
  - Running a pre-deploy accessibility audit
  - Fixing issues flagged by axe, Lighthouse, or manual testing
---

# Accessibility Review

Systematic approach to auditing and fixing accessibility across the OpenAgentSchool learning platform — Radix UI components, D3 visualizations, study mode interactions, and educational content.

## Overview

```
Scan → Classify → Fix → Verify → Report
  │        │        │       │        │
  │        │        │       │        └─ Summary of issues found/fixed
  │        │        │       └─ axe-core, Lighthouse, keyboard test
  │        │        └─ Apply ARIA, focus, contrast, semantic fixes
  │        └─ Severity: critical / serious / moderate / minor
  └─ Automated + manual audit of every page type
```

## When to Use

- **Pre-deploy audit**: Before shipping to Azure Static Web Apps
- **New concept page**: Every new concept component should be reviewed
- **Visualization changes**: D3 trees, force graphs, recharts — SVG a11y is tricky
- **Theme changes**: Color contrast can break when theme values change
- **Study mode updates**: Interactive quiz/Socratic dialog must be keyboard-navigable
- **Form components**: Radix UI forms, API key inputs, search, filters

---

## What Radix UI Gives You (and What It Doesn't)

Radix UI primitives (`@radix-ui/react-*`) provide excellent baseline a11y:

**Built-in (don't re-implement):**
- Keyboard navigation within dialogs, dropdowns, menus, tabs, accordions
- Focus trapping in modals/dialogs
- ARIA roles and attributes on primitive components
- Screen reader announcements for state changes

**Still your responsibility:**
- Meaningful labels on every Radix component (`aria-label`, `aria-labelledby`)
- Proper heading hierarchy (`h1` → `h2` → `h3`, no skipping levels)
- Color contrast ratios (4.5:1 for text, 3:1 for large text/UI)
- Alt text on all images, including decorative ones (`alt=""`)
- Focus visible indicators (Tailwind's `focus-visible:` ring)
- SVG/D3 visualization accessibility (roles, descriptions, data tables)
- Skip navigation links for keyboard users
- Live region announcements for dynamic content updates

---

## Audit Checklist by Component Type

### 1. Concept Pages (`src/components/concepts/`)

```
□ Heading hierarchy is correct (h1 for title, h2 for sections)
□ All images have descriptive alt text
□ Code blocks are accessible (syntax highlighting doesn't rely on color alone)
□ Internal links have descriptive text (not "click here")
□ Interactive demos are keyboard-accessible
□ Prerequisite links resolve to valid concept IDs
```

### 2. D3 Visualizations (`src/components/visualization/`)

SVG visualizations are the highest-risk area for a11y:

```
□ SVG has role="img" and aria-label describing the visualization
□ Complex visualizations include a <desc> element or aria-describedby
□ Provide a text/table alternative for data visualizations
□ Interactive nodes are keyboard-focusable (tabindex="0")
□ Zoom/pan controls have accessible labels
□ Color is not the only means of conveying information
□ Export buttons (SVG/PNG/PDF) have accessible labels
```

```tsx
// Good: Accessible SVG visualization
<svg role="img" aria-label="Learning Atlas taxonomy tree showing 45 concepts organized by category">
  <desc>Hierarchical tree visualization of AI agent concepts grouped into Architecture, Patterns, Evaluation, and Tools categories.</desc>
  {/* ... tree nodes ... */}
</svg>
```

### 3. Study Mode (`src/components/study-mode/`)

```
□ Quiz questions announce to screen readers when loaded
□ Answer options are radio buttons or checkboxes (not divs)
□ Correct/incorrect feedback is announced (aria-live="polite")
□ Timer (if any) has accessible state announcements
□ Progress indicators have aria-valuenow/aria-valuemax
□ Socratic dialog messages are in an aria-live region
```

### 4. Navigation & Layout

```
□ Skip-to-content link exists and works
□ Mobile menu is keyboard-accessible
□ Route changes announce new page title to screen readers
□ Breadcrumbs use nav with aria-label="Breadcrumb"
□ Active nav item is indicated with aria-current="page"
```

### 5. Forms & Inputs

```
□ Every input has a visible label (or aria-label for icon-only)
□ Error messages are associated with inputs (aria-describedby)
□ Required fields are marked (aria-required="true")
□ API key inputs in Settings have clear labels
□ Search/filter inputs announce result counts
```

---

## Color Contrast Audit

The project uses a teal theme (`#009c84` primary). Verify contrast against both light and dark backgrounds:

```bash
# Scan for hardcoded colors that may fail contrast
grep -rn "text-\[#" src/ --include="*.tsx" | head -20
grep -rn "bg-\[#" src/ --include="*.tsx" | head -20
```

| Element | Foreground | Background | Ratio Required | Check |
|---------|-----------|------------|----------------|-------|
| Body text | theme text | theme bg | ≥ 4.5:1 | □ |
| Large headings | theme text | theme bg | ≥ 3:1 | □ |
| Buttons | white | teal `#009c84` | ≥ 4.5:1 | □ |
| Links | teal on bg | theme bg | ≥ 4.5:1 | □ |
| Muted text | muted-foreground | theme bg | ≥ 4.5:1 | □ |
| Badge text | badge fg | badge bg | ≥ 4.5:1 | □ |

---

## Automated Testing

### Lighthouse

```bash
# Run Lighthouse accessibility audit
npx lighthouse http://localhost:5000 --only-categories=accessibility --output=json --output-path=./a11y-report.json
```

### axe-core (in Vitest)

```typescript
// Example: axe-core integration in a test
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('ConceptsHub has no a11y violations', async () => {
  const { container } = render(<ConceptsHub />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Keyboard Testing

Test these flows with keyboard only (no mouse):

1. **Tab through ConceptsHub** → every card should be focusable and activatable
2. **Navigate Learning Atlas** → tree nodes, zoom controls, export buttons
3. **Complete a quiz in Study Mode** → select answers, submit, review results
4. **Open Settings dialog** → focus should trap inside, Escape closes
5. **Use concept search/filter** → filter input, results, clear button

---

## Fix Patterns

### Add aria-label to icon-only buttons

```tsx
// BEFORE
<button onClick={handleExport}><DownloadIcon /></button>

// AFTER
<button onClick={handleExport} aria-label="Export visualization as PNG">
  <DownloadIcon aria-hidden="true" />
</button>
```

### Announce dynamic content

```tsx
// For study mode answers, quiz results, loading states
<div aria-live="polite" aria-atomic="true">
  {feedback && <p>{feedback}</p>}
</div>
```

### Make custom components keyboard-accessible

```tsx
// For clickable divs that should be buttons
// BEFORE
<div onClick={handleClick} className="cursor-pointer">...</div>

// AFTER
<button onClick={handleClick} className="cursor-pointer">...</button>
// or if it must be a div:
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>...</div>
```

---

## Rules

1. **Never remove focus outlines** — Use `focus-visible:` for keyboard-only indicators
2. **Color is never the only signal** — Always pair with icons, text, or patterns
3. **Every image needs alt** — Decorative images get `alt=""`, informative ones get descriptions
4. **Heading levels don't skip** — `h1` → `h2` → `h3`, not `h1` → `h3`
5. **Interactive elements are focusable** — If it's clickable, it needs `tabIndex` or be a `<button>`/`<a>`
6. **ARIA is a last resort** — Use semantic HTML first (`<nav>`, `<main>`, `<button>`, `<label>`)
7. **Test with a screen reader** — NVDA (Windows) or VoiceOver (Mac) before shipping
