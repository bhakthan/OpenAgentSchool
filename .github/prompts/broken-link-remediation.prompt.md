---
name: broken-link-remediation
description: |
  Detect and fix broken links across a codebase. Use this skill when:
  - Auditing a project for dead, misdirected, or malformed links
  - Fixing broken internal navigation routes or concept/prerequisite references
  - Updating external URLs that have moved, expired, or changed domains
  - Validating asset references (images, icons, manifests) point to existing files
  - Running a pre-deploy link health check
  - Remediating 404s, redirect chains, orphan anchors, or missing files
---

# Broken Link Detection & Remediation

Systematic approach to finding, classifying, and fixing every broken link in a project — internal routes, external URLs, asset paths, and cross-reference IDs.

## Overview

```
Scan → Classify → Fix → Verify → Report
  │        │        │       │        │
  │        │        │       │        └─ Summary table + per-link details
  │        │        │       └─ Confirm replacement returns 200 / file exists
  │        │        └─ Apply fix strategy (priority order)
  │        └─ Categorize: 404, redirect, malformed, missing file, orphan anchor
  └─ Crawl every file for link patterns
```

## When to Use

- **Pre-deploy audit**: Catch broken links before they reach production
- **Post-migration**: After renaming routes, restructuring files, or changing domains
- **Periodic health check**: Scheduled weekly/monthly external URL verification
- **Dependency updates**: When upstream docs or APIs change URLs
- **New feature integration**: Ensure new concept/route references are wired correctly

---

## Step 1: Discovery — Scan & Identify All Links

Crawl through **every file** and catalog all links by type.

### Link Types to Scan

| Type | Patterns to Match | Example |
|------|-------------------|---------|
| Internal routes | `navigate('...')`, `to="..."`, `href="/..."` | `navigate('/concepts/agent-architecture')` |
| Concept prerequisites | `prerequisites: ['id-1', 'id-2']` | Concept IDs referencing other concepts |
| External URLs | `https://...`, `http://...` | `https://learn.microsoft.com/azure/...` |
| Asset references | `src="..."`, `url(...)`, icon paths | `/images/og-image.png`, `/icons/icon-192x192.png` |
| Anchor links | `#section-id` | `href="#getting-started"` |
| API endpoints | `fetch('/api/...')`, `axios.get(...)` | `/api/v1/quiz/questions` |
| Markdown links | `[text](url)` | `[docs](https://example.com)` |
| Meta/canonical | `<link rel="canonical">`, `og:url` | `<meta property="og:url" content="...">` |
| Manifest/SW | `manifest.json`, service worker caches | `/icons/badge-72x72.png` |

### File Types to Scan

```
.tsx, .ts, .jsx, .js, .html, .css, .md, .mdx,
.json, .xml, .yaml, .yml, .env, .toml, .config
```

### How to Scan

```bash
# Internal navigation links
grep -rn "navigate\(['\"]" src/ --include="*.tsx" --include="*.ts"
grep -rn 'to="/' src/ --include="*.tsx"
grep -rn "href=\"/" src/ --include="*.tsx" --include="*.html"

# Concept prerequisite references
grep -rn "prerequisites:" src/components/concepts/ConceptsHub.tsx

# External URLs
grep -rnoP "https?://[^\s\"'<>)\]]*" src/ --include="*.tsx" --include="*.ts"

# Asset references
grep -rn 'src="/' src/ --include="*.tsx" --include="*.html"
grep -rn "url\(/" src/ --include="*.css" --include="*.tsx"

# Service worker / manifest references
grep -rn "icons/" src/service-worker.ts public/manifest.json
```

---

## Step 2: Diagnosis — Classify Each Broken Link

For every link found, classify it:

| Status | Icon | Category | Action | Severity |
|--------|------|----------|--------|----------|
| `200 OK` | ✅ | Valid | No action needed | none |
| `404 Not Found` | ❌ | Dead Link | Find new URL or remove | high |
| `301/302 Redirect` | 🔀 | Redirect | Update to final destination URL | medium |
| `403 Forbidden` | 🔒 | Access Denied | Check auth or find public alternative | medium |
| `500/502/503` | 💀 | Server Error | Retry later, may be transient | low |
| Malformed URL | 🔗 | Syntax Error | Fix typo, add protocol, encode chars | high |
| Missing File | 📂 | Missing Asset | Create asset or update reference path | high |
| Deprecated URL | 🏚️ | Deprecated | Find current/canonical URL | high |
| Misdirected | 🔀 | Wrong Target | Route exists but points to wrong place | high |
| Timeout | ⏳ | Unreachable | Verify domain, check DNS | medium |
| Orphan Anchor | 🪝 | Dead Fragment | Fix element ID or remove `#fragment` | medium |

### Validation Commands

```bash
# Check if an internal route is defined in the router
grep -n "path=\"/adoption/canvas\"" src/App.tsx

# Validate concept ID exists in the concept registry
grep -c "id: 'agent-architecture'" src/components/concepts/ConceptsHub.tsx

# Check if an asset file exists
test -f public/images/og-image.png && echo "EXISTS" || echo "MISSING"

# Check external URL (HEAD request, follow redirects)
curl -sI -o /dev/null -w "%{http_code}" -L "https://ollama.com/"
```

---

## Step 3: Remediation — Fix Each Broken Link

Apply fixes in **priority order**. Always prefer finding the correct URL over removing the link.

### Priority 1: Find the Updated URL

If the resource moved, locate its new canonical URL.

- Check HTTP response for redirect `Location` header
- Search the target website for relocated content
- Use Wayback Machine (`web.archive.org`) for archived versions
- Check the site's `sitemap.xml` for current URL structure

### Priority 2: Replace with Equivalent

Find the closest matching content on the same or official domain.

- Same content under restructured URL paths
- Official mirror or alternative source
- Updated version of the same resource (e.g., new API docs version)
- Check GitHub releases for relocated documentation

### Priority 3: Link to Parent/Fallback

When no direct equivalent exists, link to a broader resource.

- Link to the parent category or homepage of the target domain
- Link to a relevant section within the same project
- Use a search URL scoped to the target domain

### Priority 4: Remove Link

Last resort — remove the hyperlink while preserving context.

- Remove the hyperlink but keep the descriptive text
- Add a code comment explaining the removal
- Log the removal in the audit report

### Priority 5: Fix Structural Issues

For malformed links, fix the syntax:

- Correct typos in the URL
- Fix relative path errors (wrong directory level, missing `/`)
- Add missing protocol (`https://`)
- Encode special characters properly
- Fix broken query parameters or fragments

---

## Step 4: Reporting — Document All Changes

For **each** broken link fixed, produce a report entry:

```
───────────────────────────────────────────
📄 File:          [file path and name]
📍 Line:          [line number]
❌ Broken Link:   [original broken URL]
🚨 Issue:         [category from Step 2 + brief description]
✅ Fixed Link:    [new corrected URL]
💬 Rationale:     [why this replacement was chosen]
───────────────────────────────────────────
```

### Example Report Entries

```
───────────────────────────────────────────
📄 File:          src/components/adoption/PortfolioHeatmapCanvasForm.tsx
📍 Line:          118, 360
❌ Broken Link:   /adoption/portfolio
🚨 Issue:         Misdirected — route defined as /adoption/canvas in App.tsx
✅ Fixed Link:    /adoption/canvas
💬 Rationale:     Route was renamed but navigate() calls were not updated.
───────────────────────────────────────────

───────────────────────────────────────────
📄 File:          src/lib/data/references.ts
📍 Line:          422
❌ Broken Link:   https://ollama.ai/
🚨 Issue:         Deprecated URL — Ollama migrated to .com domain
✅ Fixed Link:    https://ollama.com/
💬 Rationale:     ollama.ai is the old domain; canonical site is ollama.com.
───────────────────────────────────────────

───────────────────────────────────────────
📄 File:          src/service-worker.ts
📍 Line:          260
❌ Broken Link:   /icons/badge-72x72.png
🚨 Issue:         Missing File — badge-72x72.png does not exist in public/icons/
✅ Fixed Link:    /icons/icon-72x72.png
💬 Rationale:     badge-72x72.png was never created; icon-72x72.png exists and
                  serves the same purpose for notification badges.
───────────────────────────────────────────

───────────────────────────────────────────
📄 File:          src/service-worker.ts
📍 Line:          166
❌ Broken Link:   /images/offline-placeholder.svg
🚨 Issue:         Missing File — offline fallback image absent from public/images/
✅ Fixed Link:    Created /images/offline-placeholder.svg
💬 Rationale:     Service worker references this for offline image fallback;
                  created a minimal SVG placeholder asset.
───────────────────────────────────────────
```

---

## Step 5: Summary — Audit Report

Provide a summary table after every audit:

```
╔══════════════════════════════════════════════════╗
║           BROKEN LINK AUDIT SUMMARY              ║
╠══════════════════════════════════════════════════╣
║ Total links scanned:          ___                ║
║ Total broken links found:     ___                ║
║ ─────────────────────────────────────            ║
║ 🔧 Fixed (new URL found):     ___               ║
║ 🔄 Fixed (equivalent found):  ___               ║
║ 📂 Fixed (path corrected):    ___               ║
║ 🗑️  Removed (no replacement):  ___               ║
║ ⚠️  Needs manual review:       ___               ║
║ ─────────────────────────────────────            ║
║ Files affected:               ___                ║
╚══════════════════════════════════════════════════╝
```

---

## Concept Prerequisite Validation (Project-Specific)

For projects with concept registries (like OpenAgentSchool's `ConceptsHub.tsx`), validate that:

1. **Every prerequisite ID references an existing concept**
2. **No circular dependencies** exist in the prerequisite graph
3. **Concept components exist** for every registered concept entry

```typescript
// Extract all concept IDs and cross-check prerequisites
const ids = concepts.map(c => c.id);
const idSet = new Set(ids);

for (const concept of concepts) {
  for (const prereq of concept.prerequisites) {
    if (!idSet.has(prereq)) {
      console.error(`${concept.id} → prerequisite "${prereq}" does not exist`);
    }
  }
}

// Detect circular dependencies
function hasCycle(id: string, visited = new Set<string>()): boolean {
  if (visited.has(id)) return true;
  visited.add(id);
  const concept = concepts.find(c => c.id === id);
  return concept?.prerequisites.some(p => hasCycle(p, new Set(visited))) ?? false;
}
```

---

## Rules & Constraints

1. **Do NOT change working links** — If a link returns `200` and points to correct content, leave it alone
2. **Preserve original intent** — Replacement links must be contextually relevant to surrounding content
3. **Prefer HTTPS** over HTTP when both are available
4. **Prefer canonical/official URLs** over third-party mirrors
5. **Do NOT use URL shorteners** (bit.ly, t.co) as replacements
6. **Verify every replacement** actually works before committing the fix
7. **Maintain consistent formatting** — Match the link style used in the file (relative vs absolute, trailing slashes)
8. **Flag uncertain fixes** — If less than 90% confident, flag for manual review rather than guessing
9. **Check anchor links** — Ensure `#fragment` links point to existing element IDs
10. **Preserve link attributes** — Keep `target="_blank"`, `rel="noopener noreferrer"`, and other attributes intact

---

## Prevention Patterns

### Centralized Link Registry
Store external URLs in a single data file instead of scattering across components. Makes bulk updates trivial.

### Route Path Constants
Define route paths as constants and reference them everywhere. When a route changes, update one constant.

```typescript
// routes.ts
export const ROUTES = {
  CONCEPTS: '/concepts',
  ADOPTION_CANVAS: '/adoption/canvas',
  ADOPTION_CHARTER: '/adoption/charter',
} as const;

// Usage — compiler catches invalid paths
navigate(ROUTES.ADOPTION_CANVAS);
```

### Pre-commit Hook
Run lightweight internal link validation before each commit:

```bash
# .husky/pre-commit
node scripts/validate-links.mjs --internal --assets
```

### CI/CD Integration
Run full external URL checks weekly in CI:

```yaml
name: Link Health Check
on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly Monday 6am
  pull_request:
    branches: [main]

jobs:
  link-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node scripts/audit-links.mjs --all --report
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: link-audit-report
          path: link-audit-report.json
```

---

## Quick Start Checklist

```markdown
## Link Audit Checklist

### Discovery
- [ ] Scan internal navigation links (navigate, Link, href)
- [ ] Scan concept/prerequisite cross-references
- [ ] Scan external URLs (https://)
- [ ] Scan asset references (images, icons, manifests)
- [ ] Scan API endpoint URLs
- [ ] Scan markdown links in docs

### Diagnosis
- [ ] Classify each broken link by status type
- [ ] Prioritize by severity (high → low)

### Remediation
- [ ] Apply fix strategy in priority order
- [ ] Verify each replacement works
- [ ] Commit fixes with descriptive messages

### Reporting
- [ ] Document each fix with file, line, old URL, new URL, rationale
- [ ] Produce summary table with totals
- [ ] Flag uncertain fixes for manual review

### Prevention
- [ ] Set up CI link health check
- [ ] Centralize external URLs where possible
- [ ] Use route constants for internal navigation
```
