---
name: update-to-latest
description: |
  Upgrade dependencies, references, and tooling to the latest stable versions across the project. Use this skill when:
  - Running a periodic dependency refresh (npm packages, Docker images, CI actions)
  - Upgrading a specific library or framework to its latest release
  - Scanning the project for outdated versions and planning upgrades
  - Handling breaking-change migrations after a major version bump
  - Updating documentation links, API endpoints, or CDN references to current versions
  - Modernizing CI/CD workflows, Docker base images, or runtime versions
  - Responding to security advisories that require version bumps
---

# Update to Latest

Systematic approach to discovering, evaluating, and applying version upgrades across the OpenAgentSchool frontend and openagent-backend microservices — npm packages, Python dependencies, Docker images, CI/CD actions, and external references.

## Overview

```
Audit → Evaluate → Plan → Upgrade → Verify → Report
  │        │         │       │         │        │
  │        │         │       │         │        └─ Summary table + rollback notes
  │        │         │       │         └─ npm test, npm build, vitest, lint
  │        │         │       └─ Apply version bumps + code migrations
  │        │         └─ Assess breaking changes, cascade deps
  │        └─ Check latest stable vs current, skip pre-release
  └─ Scan package.json, Dockerfiles, workflows, lock files, docs
```

## When to Use

- **Scheduled refresh**: Monthly or quarterly dependency sweep
- **Security advisory**: CVE requires bumping a specific package
- **Feature unlock**: New library version enables needed functionality
- **Ecosystem alignment**: React, Vite, or Tailwind major release
- **CI/CD modernization**: GitHub Actions versions, Node.js runtime
- **Pre-deploy health check**: Ensure nothing is EOL before a release

---

## Project Topology — Where Versions Live

This project spans **two repositories** with distinct dependency systems.

### Frontend (OpenAgentSchool — this repo)

| File | What It Governs |
|------|-----------------|
| `package.json` | npm dependencies + devDependencies (React 19, Vite, Tailwind 4, Radix UI, D3, etc.) |
| `package-lock.json` | Locked dependency tree — regenerate after any `package.json` change |
| `tsconfig.json` | TypeScript target (`ES2020`), module resolution, path aliases |
| `vite.config.ts` | Build config, plugin versions, PWA manifest, chunk strategy |
| `tailwind.config.js` | Tailwind plugins and theme config |
| `eslint.config.js` | ESLint + typescript-eslint + react-hooks plugin versions |
| `.github/workflows/*.yml` | GitHub Actions — Node.js version, action versions (`actions/checkout`, `@azure/static-web-apps-cli`) |
| `docker-compose.yml` | Postgres, Redis, Qdrant, Nginx, Prometheus, Grafana image tags |
| `index.html` | CDN links, meta tags, font references |
| `src/` components | Inline documentation URLs, external resource links in educational content |

### Backend (openagent-backend — sibling at `C:\code\openagent-backend`)

> **Note**: The backend repo folder is `openagent-backend` at `C:\code\openagent-backend`.

| File | What It Governs |
|------|-----------------|
| `core-api/requirements.txt` | Python packages (FastAPI, Pydantic, DuckDB, etc.) |
| `agent-orchestrator/requirements.txt` | Python packages (LLM providers, Redis, etc.) |
| `knowledge-service/requirements.txt` | Python packages (LangChain, ChromaDB, etc.) |
| `*/Dockerfile` | Python base image tags, system dependencies |
| `*/docker-compose.yml` | Per-service Redis, Postgres, ChromaDB image tags |

---

## Step 1: Audit — Discover What's Outdated

### 1.1 npm Dependencies (Frontend)

```bash
# List outdated packages with current vs latest
npm outdated

# For a machine-readable view
npm outdated --json

# Check for known vulnerabilities
npm audit

# Interactive upgrade (respects semver ranges)
npx npm-check-updates --interactive
```

**Key dependency groups to track:**

| Group | Packages | Upgrade Sensitivity |
|-------|----------|---------------------|
| **React core** | `react`, `react-dom`, `@types/react`, `@types/react-dom` | HIGH — must move together, check `overrides` in package.json |
| **Build tooling** | `vite`, `@vitejs/plugin-react-swc`, `typescript`, `terser` | HIGH — can break build pipeline |
| **Tailwind** | `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss`, `@tailwindcss/container-queries` | MEDIUM — v4 uses new engine, config changes |
| **Radix UI** | `@radix-ui/react-*` (25+ packages) | LOW — patch/minor are safe, major rare |
| **Testing** | `vitest`, `@vitest/*`, `@testing-library/*`, `jsdom`, `happy-dom` | MEDIUM — test API changes |
| **Visualization** | `d3`, `recharts`, `@xyflow/react`, `three`, `mermaid` | MEDIUM — rendering changes |
| **Data/Forms** | `zod`, `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query` | MEDIUM — schema/API changes |
| **Utilities** | `axios`, `date-fns`, `clsx`, `uuid`, `marked` | LOW — typically stable |

### 1.2 Python Dependencies (Backend)

```bash
# Per-service check
cd C:\code\openagent-backend\core-api
pip list --outdated

cd C:\code\openagent-backend\agent-orchestrator
pip list --outdated

cd C:\code\openagent-backend\knowledge-service
pip list --outdated
```

### 1.3 Docker Image Tags

Scan for pinned image tags that may be behind:

```bash
# Find all image references
grep -rn "image:" docker-compose.yml
grep -rn "FROM " C:\code\openagent-backend\*\Dockerfile
```

Current images to track: `postgres:15-alpine`, `redis:7-alpine`, `qdrant/qdrant:latest`, `nginx:alpine`, `prom/prometheus:latest`, `grafana/grafana:latest`.

### 1.4 GitHub Actions Versions

```bash
# Scan workflow files for action versions
grep -rn "uses:" .github/workflows/
```

Check for: `actions/checkout`, `actions/setup-node`, `@azure/static-web-apps-cli`, Node.js setup version (currently hardcoded to `setup_18.x` via curl).

### 1.5 External Links & Documentation URLs

Educational content in `src/components/concepts/` and `src/lib/data/references.ts` contains hundreds of external URLs to docs, papers, and tools. Use the **broken-link-remediation** skill for deep link scanning; here, focus on version-specific URLs (e.g., `docs.example.com/v2/...` when `v3` exists).

---

## Step 2: Evaluate — Assess Each Upgrade

For every outdated reference, determine:

### Version Classification

| Jump Type | Risk | Example | Action |
|-----------|------|---------|--------|
| **Patch** (x.y.Z) | 🟢 Low | `1.2.3` → `1.2.5` | Apply immediately |
| **Minor** (x.Y.z) | 🔵 Low-Med | `1.2.3` → `1.4.0` | Apply, check changelog for new APIs |
| **Major** (X.y.z) | 🟠 Medium-High | `1.2.3` → `2.0.0` | Read migration guide, plan code changes |
| **Ecosystem shift** | 🔴 High | `webpack` → `vite` | Separate project, not part of this flow |

### Decision Rules

1. **Default to latest stable** — never recommend alpha/beta/RC unless explicitly requested
2. **Respect LTS** — for Node.js runtime, prefer current LTS over bleeding edge
3. **Move related packages together** — React core + types + overrides must be in sync
4. **Check peer dependency compatibility** — Radix UI, react-router-dom, testing-library all declare React peer deps
5. **Preserve the `overrides` block** — `package.json` overrides force React version alignment across the tree; update these when bumping React
6. **Respect pinning intent** — if a version is exact-pinned (`"3.2.1"` not `"^3.2.1"`), ask before changing
7. **Flag abandoned packages** — if a package has no commits in 12+ months or is archived, recommend the successor

### Breaking Change Checklist (React/Vite/Tailwind Majors)

When upgrading React, Vite, or Tailwind major versions:

- [ ] Read the official migration guide end-to-end
- [ ] Search codebase for removed/renamed APIs
- [ ] Check `vite.config.ts` plugin compatibility
- [ ] Verify `tsconfig.json` target/module settings still valid
- [ ] Confirm Tailwind config format hasn't changed
- [ ] Run `npm run build` (uses `tsc -b --noCheck && vite build`)
- [ ] Run `npm run test` (vitest full suite)
- [ ] Run `npm run test:evaluation` (agentic eval guardrail)
- [ ] Spot-check D3 visualizations, study-mode, and concept pages

---

## Step 3: Upgrade — Apply Changes

### 3.1 npm Package Upgrades

```bash
# Targeted upgrade (single package)
npm install <package>@latest

# Batch upgrade (all outdated, respecting semver)
npx npm-check-updates -u && npm install

# After any upgrade, always regenerate the lock file
npm install
```

**React ecosystem upgrade sequence** (must be coordinated):

```bash
# 1. Core React (must match overrides)
npm install react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest

# 2. Update overrides in package.json to match
# "overrides": { "react": "^<new>", "react-dom": "^<new>", "@types/react": "^<new>", "@types/react-dom": "^<new>" }

# 3. Update peerDependencies to match
# "peerDependencies": { "react": "^<new>", "react-dom": "^<new>" }

# 4. Reinstall to propagate overrides
npm install
```

### 3.2 Docker Image Upgrades

Update tags in `docker-compose.yml` and any `Dockerfile`:

```yaml
# Example: postgres upgrade
# BEFORE
image: postgres:15-alpine
# AFTER (check LTS status first)
image: postgres:17-alpine
```

### 3.3 GitHub Actions Upgrades

Update action versions in `.github/workflows/*.yml`:

```yaml
# BEFORE
- uses: actions/checkout@v3
# AFTER
- uses: actions/checkout@v4
```

**Node.js CI runtime**: The current workflow uses `curl -fsSL https://deb.nodesource.com/setup_18.x`. When upgrading, update the version number or switch to `actions/setup-node@v4` for better maintainability:

```yaml
# Recommended: replace curl-based setup with official action
- uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
```

### 3.4 Code Migrations

When an upgrade changes APIs, apply migrations file-by-file. For each migration:

1. Identify all affected files (`grep -rn "oldAPI" src/`)
2. Apply the new pattern
3. Preserve the existing code style (functional components, Tailwind utilities, `@/` imports)
4. Do NOT introduce strict TypeScript errors (build uses `--noCheck`)

---

## Step 4: Verify — Confirm Nothing Broke

Run the full verification pipeline after every upgrade batch:

```bash
# 1. TypeScript compilation (non-strict, matches CI)
npx tsc -b --noCheck

# 2. Vite production build
npm run build

# 3. Lint
npm run lint

# 4. Agentic evaluation guardrail (pattern registry)
npm run test:evaluation

# 5. Full test suite
npm run test

# 6. Spot-check (manual or via dev server)
npm run dev
# → Visit http://localhost:5000
# → Check: ConceptsHub loads, Learning Atlas renders, Study Mode works
```

### Backend Verification (if upgrading backend deps)

```bash
cd C:\code\openagent-backend\core-api && pytest -q
cd C:\code\openagent-backend\agent-orchestrator && pytest
cd C:\code\openagent-backend\knowledge-service && pytest --cov
```

### Docker Verification (if upgrading images)

```bash
cd C:\code\openagent-backend\core-api && docker compose up -d --build
curl http://localhost:8000/health
```

---

## Step 5: Report — Document What Changed

For each upgrade applied, produce a summary entry:

```
───────────────────────────────────────────
📦 Package:       [name]
📄 Files:         [package.json, lock file, any migrated source files]
🕐 Version Jump:  [old] → [new] (patch | minor | major)
⚠️  Breaking:     [none | list of changes handled]
🛡️ Security:      [CVEs resolved, if any]
🧪 Tests:         [pass | X failures noted]
💬 Notes:         [anything noteworthy]
───────────────────────────────────────────
```

### Summary Table

```
╔══════════════════════════════════════════════════╗
║           UPDATE TO LATEST SUMMARY               ║
╠══════════════════════════════════════════════════╣
║ Total packages audited:       ___                ║
║ Total packages upgraded:      ___                ║
║ ─────────────────────────────────────            ║
║ 🟢 Patch upgrades:            ___               ║
║ 🔵 Minor upgrades:            ___               ║
║ 🟠 Major upgrades:            ___               ║
║ 🔴 Ecosystem migrations:      ___               ║
║ ─────────────────────────────────────            ║
║ 🐳 Docker images updated:     ___               ║
║ ⚙️  CI/CD actions updated:     ___               ║
║ 🐍 Python packages updated:   ___               ║
║ ─────────────────────────────────────            ║
║ 🛡️ Security vulns resolved:   ___               ║
║ ⚠️  Breaking changes handled:  ___               ║
║ 🧪 Test suite:                 [PASS / FAIL]    ║
║ 📦 Build:                      [PASS / FAIL]    ║
║ 🚩 Flagged for manual review:  ___               ║
╚══════════════════════════════════════════════════╝
```

---

## Rollback

If an upgrade causes issues:

```bash
# Revert package.json + lock file to last known good
git checkout HEAD -- package.json package-lock.json
npm install

# Or revert a specific commit
git revert <commit-hash>

# For Docker image rollback, revert the tag in docker-compose.yml
git checkout HEAD -- docker-compose.yml
docker compose up -d --build
```

---

## Execution Modes

This skill supports different scopes depending on the request:

| Mode | Trigger | Scope |
|------|---------|-------|
| **Single package** | "Upgrade react to latest" | One package + its ecosystem |
| **Category** | "Upgrade all Radix UI packages" | A dependency group |
| **Full audit** | "Upgrade everything to latest" | All deps, Docker, CI, docs |
| **Audit only** | "Show me what's outdated" | Report without applying changes |
| **Specific version** | "Upgrade vite to 6.0" | Target a user-specified version |
| **Security** | "Fix npm audit vulnerabilities" | Only security-relevant bumps |

---

## Rules & Constraints

1. **Never downgrade** — only move forward unless explicitly asked to pin an older version
2. **Skip pre-release** — no alpha/beta/RC unless the user opts in
3. **Preserve overrides** — React overrides in `package.json` must stay in sync with core versions
4. **Don't break the build** — `npm run build` must pass after every upgrade batch
5. **Don't break tests** — `npm run test` must pass; if a test fails due to the upgrade, fix it or flag it
6. **Coordinate React moves** — `react`, `react-dom`, `@types/react`, `@types/react-dom`, overrides, and peerDependencies are a single atomic unit
7. **Respect `--noCheck`** — the build skips strict TS checking; don't introduce changes that only work under strict mode
8. **Update lock files** — always run `npm install` after touching `package.json`
9. **One major at a time** — when multiple majors are available, upgrade them sequentially, verifying after each
10. **Flag uncertainty** — if a migration path is unclear or risky, flag it for manual review rather than guessing
11. **Check EOL dates** — flag if the target version itself approaches end-of-life within 6 months
12. **Update related docs** — if README, AGENTS.md, or copilot-instructions.md reference specific versions, update them too
13. **Commit granularly** — one commit per logical upgrade unit (e.g., "deps: upgrade Radix UI packages" not "upgrade everything")

---

## Quick Start Checklist

```markdown
## Update Checklist

### Audit
- [ ] Run `npm outdated` for frontend
- [ ] Run `npm audit` for security
- [ ] Check Docker image tags against Docker Hub
- [ ] Check GitHub Actions versions in workflows
- [ ] Check Python deps in backend (if in scope)

### Evaluate
- [ ] Classify each upgrade by risk (patch/minor/major)
- [ ] Read changelogs for major bumps
- [ ] Check peer dependency compatibility
- [ ] Identify cascade upgrades (e.g., React → types → overrides)

### Upgrade
- [ ] Apply upgrades by group (React core → build tools → UI → utils)
- [ ] Regenerate lock file after each batch
- [ ] Apply any required code migrations

### Verify
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm run test:evaluation` passes
- [ ] `npm run test` passes
- [ ] Dev server renders correctly (`npm run dev`)

### Report
- [ ] Document each upgrade with version jump and notes
- [ ] Produce summary table
- [ ] Commit with descriptive message per upgrade group
```
