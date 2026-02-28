---
name: brand-guidelines
description: |
  Apply OpenAgentSchool's visual identity and design tokens consistently. Use this skill when:
  - Creating new UI components that need to match the design system
  - Styling exported assets (PDFs, PNGs, infographics) with brand colors
  - Building slides, social media graphics, or marketing materials
  - Reviewing color, typography, and spacing consistency across pages
  - Onboarding a designer or contributor to the project's visual language
  - Choosing colors for new concept categories, badges, or chart series
---

# OpenAgentSchool Brand Guidelines

Visual identity reference for the OpenAgentSchool learning platform — colors, typography, spacing, and component patterns.

## Brand Overview

**Open Agent School** is an educational platform for mastering AI agent architecture. The visual identity communicates:

- **Trustworthiness** — clean, professional design signals quality content
- **Approachability** — warm tones and clear hierarchy welcome all learners
- **Intelligence** — teal accent evokes technology without cold sterility
- **Focus** — generous whitespace and clear typography aid concentration

---

## Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Teal** (Primary) | `#009c84` | `--primary` | CTAs, active states, links, highlights |
| **Dark** | `#0a0a0a` | `--background` (dark) | Dark mode background |
| **Light** | `#ffffff` | `--background` (light) | Light mode background |

### Theme Colors (CSS Variables)

The project uses Tailwind CSS v4 with CSS custom properties. These are the semantic tokens:

```css
/* Core semantic tokens — defined in theme.css / index.css */
--background       /* Page background */
--foreground       /* Primary text */
--card             /* Card background */
--card-foreground  /* Card text */
--popover          /* Popover/dropdown background */
--primary          /* Teal accent — buttons, links, active states */
--primary-foreground /* Text on primary background */
--secondary        /* Secondary actions */
--muted            /* Subdued backgrounds */
--muted-foreground /* Subdued text (descriptions, timestamps) */
--accent           /* Hover/focus backgrounds */
--destructive      /* Error/danger states */
--border           /* Borders and dividers */
--ring             /* Focus ring color */
```

### Status Colors

| Status | Color | Tailwind Class | Usage |
|--------|-------|---------------|-------|
| Success | Green | `text-green-500` | Quiz correct, progress complete |
| Error | Red | `text-red-500` | Quiz incorrect, validation errors |
| Warning | Amber | `text-amber-500` | Deprecation notices, cautions |
| Info | Blue | `text-blue-500` | Tips, additional context |

### Concept Category Colors

When assigning colors to concept categories or chart series, use this palette to maintain visual distinction:

```
Architecture  → Teal (#009c84)
Patterns      → Indigo (#6366f1)
Evaluation    → Amber (#f59e0b)
Tools         → Sky (#0ea5e9)
Safety        → Rose (#f43f5e)
Data          → Emerald (#10b981)
Deployment    → Violet (#8b5cf6)
```

---

## Typography

### Font Stack

The project uses the system font stack via Tailwind CSS defaults — no custom web fonts loaded:

```css
font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

### Scale

| Element | Tailwind Class | Size | Weight | Usage |
|---------|---------------|------|--------|-------|
| Page title | `text-3xl font-bold` | 30px | 700 | Main page headings |
| Section heading | `text-xl font-semibold` | 20px | 600 | Section dividers |
| Subsection | `text-lg font-medium` | 18px | 500 | Sub-headings |
| Body text | `text-base` | 16px | 400 | Paragraphs, descriptions |
| Small text | `text-sm` | 14px | 400 | Timestamps, metadata |
| Caption | `text-xs` | 12px | 400 | Labels, badges |
| Code | `font-mono text-sm` | 14px | 400 | Code blocks, inline code |

### Rules

- **Heading hierarchy**: `h1` → `h2` → `h3` — never skip levels
- **Body line-height**: ≥ 1.5 (`leading-relaxed` or `leading-normal`)
- **Max prose width**: ~65–75 characters for readability
- **Card descriptions**: ≤ 140 characters (project convention)

---

## Spacing System

Use Tailwind's spacing scale consistently:

| Context | Spacing | Tailwind |
|---------|---------|----------|
| Between cards in grid | 16px | `gap-4` |
| Card internal padding | 24px | `p-6` |
| Section spacing | 32–48px | `space-y-8` or `space-y-12` |
| Page padding (mobile) | 16px | `px-4` |
| Page padding (desktop) | 32–64px | `px-8` or `container mx-auto` |
| Icon-to-text gap | 8–12px | `gap-2` or `gap-3` |

---

## Component Patterns

### Buttons

```tsx
// Primary action (teal)
<Button variant="default">Start Learning</Button>

// Secondary action
<Button variant="outline">View Details</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Ghost (for toolbars, icon buttons)
<Button variant="ghost" size="icon">
  <DownloadIcon className="h-4 w-4" />
</Button>
```

### Cards

```tsx
<Card className="rounded-xl border bg-card p-6 shadow-sm">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription className="line-clamp-2">{description}</CardDescription>
  </CardHeader>
  <CardContent>{children}</CardContent>
</Card>
```

### Badges / Pills

```tsx
// Category badge
<span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
  {category}
</span>
```

---

## Logo & Identity

- **Logo**: SVG at `public/images/openagentschool-logo.svg`
- **Favicon**: `public/favicon.ico`
- **PWA Icons**: `public/icons/icon-{size}.png` (72 through 512px)
- **Theme color**: `#009c84` (set in PWA manifest and meta tags)
- **Site name**: "Open Agent School" (with space) or "OpenAgentSchool" (one word in code)

---

## Dark Mode

The project supports dark/light mode via CSS class strategy:

```
□ Every component must work in both themes
□ Use Tailwind dark: prefix for theme-specific styles
□ Never hardcode white (#fff) or black (#000) — use semantic tokens
□ Test both themes after every visual change
□ Cards should have subtle borders in dark mode for visual separation
```

---

## Export & External Assets

When creating assets for use outside the web app (slides, social graphics, PDFs):

| Element | Value |
|---------|-------|
| Primary brand color | `#009c84` (teal) |
| Dark background | `#0a0a0a` |
| Light background | `#ffffff` |
| Accent for highlights | `#009c84` at 10% opacity for backgrounds |
| Font (if available) | System sans-serif; use Inter or SF Pro as fallback |
| Logo | `public/images/openagentschool-logo.svg` |

---

## Rules

1. **Use semantic tokens** — `bg-primary` not `bg-[#009c84]`
2. **Both themes must work** — test dark and light after every change
3. **Consistent spacing** — use Tailwind scale, don't invent custom values
4. **Heading hierarchy** — never skip heading levels
5. **Card descriptions ≤ 140 chars** — learner-facing copy convention
6. **Teal is primary** — don't introduce competing accent colors
7. **Accessibility first** — 4.5:1 contrast ratio minimum for text
8. **System fonts** — don't add custom web fonts without discussion
