---
name: security-review
description: |
  Audit and fix security vulnerabilities across the frontend and backend. Use this skill when:
  - Reviewing client-side API key handling (BYOK localStorage pattern)
  - Auditing JWT authentication flow between frontend and core-api
  - Checking CORS configuration across microservices
  - Scanning for XSS, injection, or prototype pollution risks
  - Reviewing Content Security Policy and HTTP security headers
  - Auditing npm/pip dependencies for known CVEs
  - Validating that secrets are not leaked into the production JS bundle
  - Reviewing service-to-service authentication in the backend
---

# Security Review

Systematic security audit for OpenAgentSchool — a React SPA with BYOK API key management, JWT auth, and a Python microservices backend deployed on Azure.

## Overview

```
Scan → Classify → Fix → Verify → Report
  │        │        │       │        │
  │        │        │       │        └─ Findings table with severity
  │        │        │       └─ npm audit, grep for patterns, test
  │        │        └─ Apply fix (code, config, or dependency)
  │        └─ Critical / High / Medium / Low / Informational
  └─ Automated + manual review of key attack surfaces
```

---

## Attack Surface Map

### Frontend (OpenAgentSchool)

| Surface | Risk | Details |
|---------|------|---------|
| **BYOK API keys in localStorage** | HIGH | Users store OpenRouter/OpenAI keys in browser; JS can read them |
| **Client-side LLM calls** | MEDIUM | API keys sent in fetch headers from browser |
| **Vite env vars** | HIGH | `VITE_*` vars are baked into the JS bundle — visible to anyone |
| **React Markdown rendering** | MEDIUM | `react-markdown` + `remark-gfm` parses user/AI content |
| **User-generated content** | MEDIUM | Community posts, quiz submissions |
| **Service worker cache** | LOW | Cached API responses in Workbox |
| **Third-party scripts** | LOW | Google Analytics (`react-ga4`) |

### Backend (openagent-backend at `C:\code\openagent-backend`)

| Surface | Risk | Details |
|---------|------|---------|
| **JWT authentication** | HIGH | Token generation, validation, expiry in core-api |
| **CORS configuration** | HIGH | Must allow frontend origin without being overly permissive |
| **API key storage** | HIGH | Service-to-service keys (OpenRouter, Azure OpenAI) |
| **SQL injection** | MEDIUM | DuckDB/PostgreSQL queries in core-api |
| **File upload** | MEDIUM | Document upload in knowledge-service |
| **Docker secrets** | MEDIUM | Environment variables in docker-compose.yml |
| **OAuth flow** | HIGH | Microsoft/Google OAuth in core-api |

---

## Audit Procedures

### 1. Secret Leak Detection

```bash
# Check that no VITE_ secrets are actual secrets (they're public in the bundle)
grep -rn "VITE_" .env* src/ --include="*.ts" --include="*.tsx" --include="*.env*"

# Verify the build comment in the CI workflow is accurate
grep -A5 "LLM API keys" .github/workflows/*.yml

# Scan for hardcoded secrets, tokens, keys
grep -rni "api.key\|apikey\|secret\|password\|token" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | grep -v ".test."

# Check that .env.local is gitignored
grep ".env.local" .gitignore
```

### 2. BYOK Key Security Audit

The project uses a Bring Your Own Key pattern — users paste their API keys into a Settings dialog, stored in `localStorage`:

```
□ Keys are NEVER sent to our backend (only to the LLM provider directly)
□ Keys are NEVER logged to console in production (terser drops console.log)
□ Keys are NEVER included in error reports or analytics
□ localStorage key names don't hint at the content (e.g., not "openai_api_key")
□ Settings dialog masks key input (type="password")
□ Clear key button exists and works
□ Keys are not persisted in React state beyond the Settings component
```

### 3. XSS Prevention

```bash
# Find dangerouslySetInnerHTML usage
grep -rn "dangerouslySetInnerHTML" src/ --include="*.tsx" --include="*.ts"

# Find raw HTML insertion
grep -rn "innerHTML" src/ --include="*.tsx" --include="*.ts"

# Check react-markdown is configured safely (no raw HTML by default)
grep -rn "react-markdown" src/ --include="*.tsx" -A3
```

**Safe pattern for markdown rendering:**
```tsx
// react-markdown is safe by default (doesn't render raw HTML)
// Ensure rehypeRaw is NOT enabled unless sanitized
<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>
```

### 4. Dependency Vulnerability Scan

```bash
# Frontend
npm audit
npm audit --json | jq '.vulnerabilities | to_entries[] | select(.value.severity == "critical" or .value.severity == "high")'

# Backend (per service)
cd C:\code\openagent-backend\core-api
pip audit  # or: safety check -r requirements.txt
```

### 5. CORS Configuration

```bash
# Frontend proxy config
grep -A5 "proxy" vite.config.ts

# Backend CORS origins
grep -rn "CORS\|cors\|CORSMiddleware" C:\code\openagent-backend\ --include="*.py" -A5
```

**Verify:**
```
□ CORS allows only specific origins (not "*" in production)
□ Credentials mode is correct for JWT cookie/header strategy
□ Preflight caching is reasonable (Access-Control-Max-Age)
```

### 6. JWT Authentication

```bash
# Find JWT implementation
grep -rn "jwt\|JWT\|token" C:\code\openagent-backend\core-api\app\ --include="*.py" -l
```

**Verify:**
```
□ Tokens have reasonable expiry (not > 24h for access tokens)
□ Refresh token rotation is implemented
□ Secret key is from environment variable, not hardcoded
□ Token validation checks signature, expiry, and issuer
□ Failed auth returns 401, not 200 with error body
□ Password hashing uses bcrypt with sufficient rounds (≥12)
```

### 7. HTTP Security Headers

Check Azure Static Web Apps config and `staticwebapp.config.json`:

```bash
cat staticwebapp.config.json | grep -A20 "headers"
```

**Required headers:**
```
□ Content-Security-Policy (restricts script sources)
□ X-Content-Type-Options: nosniff
□ X-Frame-Options: DENY (or SAMEORIGIN)
□ Strict-Transport-Security (HSTS)
□ Referrer-Policy: strict-origin-when-cross-origin
```

### 8. Docker Security (Backend)

```bash
# Check for root user in Dockerfiles
grep -rn "USER" C:\code\openagent-backend\*\Dockerfile

# Check for secrets in docker-compose
grep -rn "password\|secret\|key" C:\code\openagent-backend\*\docker-compose.yml
```

**Verify:**
```
□ Containers don't run as root
□ Secrets use environment variables, not hardcoded values
□ Base images are pinned to specific versions (not :latest for prod)
□ .dockerignore excludes .env, .git, __pycache__
```

---

## Severity Classification

| Severity | Description | Example |
|----------|-------------|---------|
| **Critical** | Exploitable now, data exposure | API key leaked in bundle, SQL injection |
| **High** | Significant risk, needs prompt fix | Weak JWT secret, permissive CORS |
| **Medium** | Elevated risk, fix in next cycle | Missing CSP header, no rate limiting |
| **Low** | Minor concern, best-practice gap | Verbose error messages, no HSTS |
| **Info** | Observation, no immediate risk | Dependency has minor CVE with no exploit path |

---

## Report Format

```
───────────────────────────────────────────
🔒 Finding:       [title]
🚨 Severity:      [Critical / High / Medium / Low / Info]
📄 File:          [file path]
📍 Line:          [line number(s)]
🔎 Description:   [what the issue is]
💥 Impact:        [what could go wrong]
✅ Fix:           [how to fix it]
───────────────────────────────────────────
```

---

## Rules

1. **Never commit secrets** — not even in comments or test fixtures
2. **VITE_ vars are public** — anything prefixed `VITE_` ends up in the client bundle
3. **Sanitize all rendered content** — especially markdown from AI responses
4. **Don't trust localStorage** — it's readable by any JS on the same origin
5. **Pin dependency versions** in CI — use `npm ci`, not `npm install`
6. **Audit before deploy** — `npm audit` should be part of the CI pipeline
7. **Principle of least privilege** — backend services should only expose needed endpoints
8. **Log findings, not fixes** — if unsure about a fix, flag it for human review
