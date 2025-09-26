# Knowledge Operations Refresh Runbook

Keep retrieval-augmented generation (RAG) systems current, compliant, and trustworthy with this repeatable refresh playbook.

## 1. Scope & Objectives

- **Refresh Window:** (e.g., Q3 compliance updates)
- **Critical Domains / Regions:**
- **Success Metrics:** Reduced hallucinations, policy adherence, support ticket volume

## 2. Source Intake & Delta Detection

| Source | Owner | Intake Method | Freshness SLA | Delta Detection Approach |
| ------ | ----- | ------------- | ------------- | ----------------------- |
| Policy Repository | | API webhook | 24h | Hash diff on sections |
| Product Docs | | Git repo | 48h | Commit diff |
| Market Data | | S3 feed | 6h | Timestamp check |

- Quarantine rules for unverified documents
- Auto-notifications for curators when deltas exceed threshold

## 3. Curation Workflow

1. **Triage:** Identify high-risk changes (regulatory, pricing, legal)
2. **Labeling:** Tag documents with region, sensitivity, expiration
3. **Review:** Dual approval for Tier 2+ risk content
4. **Publication:** Push to vector store / knowledge graph with lineage metadata

## 4. Access & Enforcement Controls

| Segment | Access Policy | Runtime Enforcement | Audit Log Location |
| ------- | ------------- | ------------------- | ------------------ |
| Region EU | Need-to-know + GDPR consent | Policy-aware connector filters | `audit/eu-access.log` |
| Internal Only | Employee SSO + NDA | Tool sandbox denies export | `audit/internal.log` |

- Rotate API keys and credentials per refresh cycle
- Validate policy-as-code rules in staging before production

## 5. Quality Verification

| Check | Responsible | Tooling | Pass Criteria |
| ----- | ----------- | ------- | ------------- |
| Targeted eval suite | EvalOps | Regression harness | Drift < 2% on golden set |
| Manual spot-check | Domain expert | Review app | 95% acceptance |
| Safety scan | Risk | Policy scanner | Zero critical violations |

- Record curator sign-off with timestamp and scope
- Capture evaluation artifacts alongside deployment record

## 6. Release & Communication

- Publish refresh summary (what changed, who approved, next review date)
- Notify dependent teams (Support, Product, Ops)
- Update incident runbooks and FAQs

## 7. Post-Refresh Monitoring

- Watch telemetry for refusal rates, fallback frequency, or policy violations
- Schedule mid-cycle drift check
- Log lessons learned in the Knowledge Ops journal for continuous improvement

> **Checklist:** Attach this completed runbook to your release ticket. During audits, provide runbooks plus associated evidence artifacts.
