---
name: webapp-testing
description: |
  End-to-end browser testing with Playwright for the web application. Use this skill when:
  - Testing frontend functionality in a real browser (beyond Vitest unit tests)
  - Verifying user flows like navigating concepts, completing quizzes, using study mode
  - Debugging UI behavior, layout, or interaction issues
  - Capturing screenshots for documentation or regression tracking
  - Validating that the production build renders correctly
  - Checking responsive behavior across viewports
---

# Web Application Testing

End-to-end browser testing with Playwright for OpenAgentSchool, complementing the existing Vitest unit/integration test suite.

## Overview

```
Vitest (unit/integration)     Playwright (E2E/browser)
├── Component rendering        ├── Full user flows
├── Data logic                 ├── Navigation & routing
├── Pattern evaluation         ├── Visual regression
└── Fast, jsdom/happy-dom      └── Real browser, real rendering
```

## When to Use

| Use Vitest (`npm run test`) | Use Playwright (this skill) |
|----------------------------|-----------------------------|
| Component renders correctly | Page loads and looks right in a real browser |
| Data transforms work | User can navigate between concept pages |
| Quiz scoring logic | User can complete a quiz end-to-end |
| Pattern evaluation registry | Study mode Socratic dialog works interactively |
| API mock responses | Real API calls succeed (when backend is running) |

---

## Prerequisites

```bash
# Install Playwright (one-time setup)
npm install -D @playwright/test
npx playwright install chromium

# Ensure dev server is running
npm run dev
# → http://localhost:5000
```

---

## Key User Flows to Test

### 1. Concepts Hub Navigation

```typescript
import { test, expect } from '@playwright/test';

test('ConceptsHub loads and shows concept cards', async ({ page }) => {
  await page.goto('http://localhost:5000/concepts');
  
  // Wait for concept cards to render
  await page.waitForSelector('[data-testid="concept-card"]', { timeout: 10000 });
  
  // Verify cards are visible
  const cards = page.locator('[data-testid="concept-card"]');
  await expect(cards.first()).toBeVisible();
  
  // Click a concept card and verify navigation
  await cards.first().click();
  await expect(page).not.toHaveURL('/concepts');
});
```

### 2. Study Mode Quiz Flow

```typescript
test('User can start and complete a quiz', async ({ page }) => {
  await page.goto('http://localhost:5000/study-mode');
  
  // Start a quiz session
  await page.click('text=Start Quiz');
  
  // Answer questions
  const options = page.locator('[role="radio"], [data-testid="answer-option"]');
  await options.first().click();
  
  // Submit answer
  await page.click('text=Submit');
  
  // Verify feedback appears
  await expect(page.locator('[data-testid="feedback"], [aria-live="polite"]')).toBeVisible();
});
```

### 3. Learning Atlas Visualization

```typescript
test('Learning Atlas renders D3 tree', async ({ page }) => {
  await page.goto('http://localhost:5000/visualization/atlas');
  
  // Wait for SVG to render
  await page.waitForSelector('svg', { timeout: 15000 });
  
  // Verify tree nodes exist
  const nodes = page.locator('svg .node, svg circle, svg rect');
  expect(await nodes.count()).toBeGreaterThan(0);
  
  // Screenshot for visual regression
  await page.screenshot({ path: 'tests/screenshots/atlas.png', fullPage: true });
});
```

### 4. Responsive Layout

```typescript
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const vp of viewports) {
  test(`ConceptsHub renders correctly at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5000/concepts');
    await page.waitForSelector('[data-testid="concept-card"]');
    
    // No horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    
    await page.screenshot({ path: `tests/screenshots/concepts-${vp.name}.png` });
  });
}
```

### 5. Production Build Smoke Test

```typescript
test('Production build loads without errors', async ({ page }) => {
  // Assumes: npm run build && npx vite preview --port 4173
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  await page.goto('http://localhost:4173');
  await page.waitForLoadState('networkidle');
  
  // No console errors
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  
  // App renders
  await expect(page.locator('#root')).not.toBeEmpty();
});
```

---

## Debugging Patterns

### Capture screenshot on failure

```typescript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ 
      path: `tests/screenshots/failure-${testInfo.title.replace(/\s/g, '-')}.png`,
      fullPage: true 
    });
  }
});
```

### Capture browser console logs

```typescript
test.beforeEach(async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type()}] ${msg.text()}`);
    }
  });
});
```

### Wait for lazy-loaded components

OpenAgentSchool uses `React.lazy()` for concept components. Wait for the loaded content, not just the Suspense fallback:

```typescript
// Wait for the actual content, not the loading spinner
await page.waitForSelector('[data-testid="concept-content"]', { 
  state: 'visible',
  timeout: 10000 
});
```

---

## Integration with Existing Test Suite

```bash
# Unit/integration tests (existing — fast, no browser)
npm run test

# E2E tests (this skill — real browser)
npx playwright test

# Full verification pipeline
npm run test && npx playwright test
```

---

## Rules

1. **Don't duplicate Vitest coverage** — Playwright tests user flows, not unit logic
2. **Always wait for content** — lazy-loaded components and D3 visualizations need explicit waits
3. **Screenshot everything** — visual evidence for regression tracking
4. **Test both dev and prod builds** — `npm run dev` and `npm run build && npm run preview`
5. **Clean up** — always close browsers; use `test.afterAll` for cleanup
6. **Use data-testid selectors** — more stable than CSS classes (Tailwind classes change)
7. **Dev server must be running** — Playwright doesn't start the server; use `npm run dev` first
