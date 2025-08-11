# Color Scheme Reference Guide

## Overview
This document provides standardized color schemes for consistent UI components across light and dark modes in the OpenAgentSchool application.

## Definition Cards Pattern

### Template
```tsx
<div className="p-4 border rounded-lg bg-[color]-100 dark:bg-[color]-900 border-[color]-200 dark:border-[color]-700">
  <h4 className="font-semibold text-[color]-800 dark:text-[color]-200 mb-2">🎯 Title</h4>
  <p className="text-sm text-[color]-700 dark:text-gray-300">
    Description content here.
  </p>
</div>
```

### Color Breakdown
| Element | Light Mode | Dark Mode | Purpose |
|---------|------------|-----------|---------|
| Background | `bg-[color]-100` | `dark:bg-[color]-900` | Subtle colored background |
| Border | `border-[color]-200` | `dark:border-[color]-700` | Defined card boundaries |
| Heading | `text-[color]-800` | `dark:text-[color]-200` | High contrast titles |
| Body Text | `text-[color]-700` | `dark:text-gray-300` | Readable content |

### Specific Color Applications

#### GenAIOps (Indigo)
```tsx
className="bg-indigo-100 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700"
// Heading: "text-indigo-800 dark:text-indigo-200"
// Body: "text-indigo-700 dark:text-gray-300"
```

#### AgentOps (Violet)
```tsx
className="bg-violet-100 dark:bg-violet-900 border-violet-200 dark:border-violet-700"
// Heading: "text-violet-800 dark:text-violet-200"
// Body: "text-violet-700 dark:text-gray-300"
```

#### PromptOps (Cyan)
```tsx
className="bg-cyan-100 dark:bg-cyan-900 border-cyan-200 dark:border-cyan-700"
// Heading: "text-cyan-800 dark:text-cyan-200"
// Body: "text-cyan-700 dark:text-gray-300"
```

#### RAGOps (Emerald)
```tsx
className="bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-700"
// Heading: "text-emerald-800 dark:text-emerald-200"
// Body: "text-emerald-700 dark:text-gray-300"
```

## D3 Visualization Colors

### Tree Nodes
```javascript
const colors = {
  0: "#4f46e5", // indigo-600 - Root/GenAIOps
  1: "#7c3aed", // violet-600 - Main categories
  2: "#0891b2", // cyan-600 - Subcategories
  3: "#059669"  // emerald-600 - Leaf nodes
};

const strokeColors = {
  0: "#312e81", // indigo-900
  1: "#581c87", // violet-900
  2: "#155e75", // cyan-900
  3: "#064e3b"  // emerald-900
};
```

### Text Labels
```javascript
// Light mode: Clean dark text without shadows
.style("fill", "#1f2937") // gray-800
.style("text-shadow", "none")

// Dark mode: Light gray text
.style("fill", "#e2e8f0") // gray-200
.style("text-shadow", "none")
```

## Standard UI Component Colors

### Primary Actions
- **Light**: `bg-blue-600 text-white hover:bg-blue-700`
- **Dark**: `dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600`

### Secondary Actions
- **Light**: `bg-gray-200 text-gray-800 hover:bg-gray-300`
- **Dark**: `dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`

### Muted Text
- **Light**: `text-gray-600`
- **Dark**: `dark:text-gray-400`

### Success States
- **Light**: `bg-green-100 text-green-800 border-green-200`
- **Dark**: `dark:bg-green-900 dark:text-green-200 dark:border-green-700`

### Warning States
- **Light**: `bg-yellow-100 text-yellow-800 border-yellow-200`
- **Dark**: `dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700`

### Error States
- **Light**: `bg-red-100 text-red-800 border-red-200`
- **Dark**: `dark:bg-red-900 dark:text-red-200 dark:border-red-700`

## Best Practices

### Accessibility
1. **Contrast Ratios**: Always ensure WCAG AA compliance (4.5:1 for normal text)
2. **Color Blindness**: Don't rely on color alone for meaning
3. **Focus States**: Ensure visible focus indicators

### Consistency Rules
1. **Background Shades**: Use `-100` for light mode, `-900` for dark mode
2. **Border Shades**: Use `-200` for light mode, `-700` for dark mode
3. **Text Contrast**: Use `-800` for headings in light mode, `-200` in dark mode
4. **Body Text**: Use `-700` in light mode, `gray-300` in dark mode for consistency

### Color Hierarchy
1. **Indigo**: Primary/umbrella concepts (GenAIOps)
2. **Violet**: AI agents and automation
3. **Cyan**: Communication and protocols
4. **Emerald**: Data and retrieval operations
5. **Blue**: General actions and links
6. **Gray**: Neutral content and backgrounds

## Usage Examples

### Alert Components
```tsx
// Success Alert
<div className="bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200">
  Success message
</div>

// Info Alert  
<div className="bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200">
  Info message
</div>
```

### Button Variants
```tsx
// Primary Button
<button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
  Primary Action
</button>

// Secondary Button
<button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
  Secondary Action
</button>
```

## Theme Transitions
All color changes should include smooth transitions:
```css
transition: background-color 0.3s ease, 
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
```

---

*Last updated: August 11, 2025*
*Location: /docs/COLOR_SCHEME_REFERENCE.md*
