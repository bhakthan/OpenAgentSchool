---
name: generate-release-notes
description: |
  Generate structured release notes from git history. Use this skill when:
  - Preparing release notes for a deployment to Azure Static Web Apps
  - Summarizing changes between two git tags or commits
  - Creating changelog entries for the project
  - Communicating what's new to learners and contributors
  - Drafting GitHub release descriptions
---

# Generate Release Notes

Create structured, learner-friendly release notes from git history for the OpenAgentSchool platform.

## Overview

```
Collect → Categorize → Write → Format → Publish
   │          │          │        │         │
   │          │          │        │         └─ GitHub Release or CHANGELOG.md
   │          │          │        └─ Markdown with sections and highlights
   │          │          └─ Plain-language descriptions per change
   │          └─ Features / Fixes / Concepts / UI / Infra / Docs
   └─ git log between last release and HEAD
```

---

## Collecting Changes

```bash
# Commits since last tag
git --no-pager log $(git describe --tags --abbrev=0)..HEAD --oneline --no-merges

# If no tags exist, use a date or commit range
git --no-pager log --since="2025-01-01" --oneline --no-merges

# With full details (author, date, files changed)
git --no-pager log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s (%an, %ad)" --date=short --no-merges

# Files changed (useful for categorization)
git --no-pager diff --stat $(git describe --tags --abbrev=0)..HEAD
```

---

## Categorization

Group commits by the project's commit convention (`<scope>: <brief>`):

| Category | Commit Scopes | Icon |
|----------|--------------|------|
| **New Concepts** | `concepts:`, `patterns:`, `study-mode:` | 🎓 |
| **Features** | `feat:`, `feature:`, `add:` | ✨ |
| **UI/UX** | `ui:`, `design:`, `layout:`, `theme:` | 🎨 |
| **Bug Fixes** | `fix:`, `bugfix:` | 🐛 |
| **Performance** | `perf:`, `optimize:`, `bundle:` | ⚡ |
| **Testing** | `test:`, `tests:`, `eval:` | 🧪 |
| **Infrastructure** | `ci:`, `deploy:`, `docker:`, `infra:` | 🔧 |
| **Dependencies** | `deps:`, `upgrade:`, `bump:` | 📦 |
| **Documentation** | `docs:`, `readme:` | 📖 |
| **Backend** | `api:`, `backend:`, `core-api:`, `orchestrator:` | 🔌 |

---

## Release Note Template

```markdown
# Release v{version} — {date}

> {one-line summary of the most notable change}

## 🎓 New Learning Content

- **{Concept Name}**: {brief description of what learners can now explore}
- Added {pattern/concept} to the Learning Journey Map

## ✨ Features

- {Feature description in plain language}

## 🎨 UI/UX Improvements

- {Visual or interaction improvement}

## 🐛 Bug Fixes

- Fixed {what was broken} in {where}

## ⚡ Performance

- {What got faster/smaller and by how much}

## 🔧 Infrastructure

- {CI/CD, deployment, Docker changes}

## 📦 Dependencies

- Upgraded {package} from {old} to {new}

---

**Full Changelog**: [{prev_tag}...{new_tag}]({repo_url}/compare/{prev_tag}...{new_tag})
```

---

## Writing Guidelines

1. **Learner-first language** — write for someone using the platform, not just developers
   - ✅ "You can now explore Fine-Tuning concepts with interactive examples"
   - ❌ "Added FineTuningConcept.tsx component with lazy loading"

2. **Lead with impact** — what can users do now that they couldn't before?

3. **Group related changes** — 5 commits touching study-mode become one bullet point

4. **Link to concepts** — when adding new learning content, mention the route or concept ID

5. **Keep it scannable** — bullet points, not paragraphs

6. **Include numbers** — "Reduced bundle size by 14%" is better than "Improved performance"

---

## Automation Helpers

### Extract commit categories

```bash
# Group commits by scope prefix
git --no-pager log $(git describe --tags --abbrev=0)..HEAD --oneline --no-merges | \
  sed 's/^[a-f0-9]* //' | \
  sort | \
  awk -F: '{print $1}' | \
  sort | uniq -c | sort -rn
```

### List new/modified concept files

```bash
git --no-pager diff --name-only $(git describe --tags --abbrev=0)..HEAD | \
  grep "src/components/concepts/" | \
  sort
```

### Count changes by area

```bash
git --no-pager diff --stat $(git describe --tags --abbrev=0)..HEAD | \
  grep -E "src/components/(concepts|study-mode|visualization|patterns)" | \
  wc -l
```

---

## Rules

1. **Don't expose internal details** — release notes are public; no file paths, internal IDs, or debug info
2. **Skip trivial commits** — typo fixes, whitespace, merge commits don't need mention
3. **Credit contributors** — mention authors for significant contributions
4. **Date format**: `YYYY-MM-DD` (ISO 8601)
5. **Version format**: follow semver or date-based (`v2025.02.28`) — be consistent with existing tags
