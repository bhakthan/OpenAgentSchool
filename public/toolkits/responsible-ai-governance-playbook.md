# Responsible AI Governance Playbook (Field Edition)

This playbook translates policy statements into operational guardrails, evidence requirements, and governance rhythms for AI agent programs.

## 1. Governance Principles

- Transparency of data lineage, model behavior, and human overrides
- Accountability with explicit owners for each release gate
- Proportionality so oversight effort scales with risk tier
- Continuous learning: incidents and evals update policy

## 2. Risk Tiering Cheat Sheet

| Tier | Example Use Case | Required Controls | Review Cadence | Evidence Artifacts |
| ---- | ---------------- | ----------------- | -------------- | ------------------ |
| Tier 0 (Sandbox) | Internal experimentation with synthetic data | Basic logging, access control | Self-certify | Experiment log |
| Tier 1 (Low Risk) | Internal productivity assistant | Eval harness, policy-as-code checks | Automated gate | Eval report + checklist |
| Tier 2 (Medium Risk) | Customer-facing support assistant | Tier 1 + human QA samples, incident plan | Monthly board | Eval report, QA log, rollback plan |
| Tier 3 (High Risk) | Regulated financial or health workflows | Tier 2 + red team, legal review, audit trail | Release by exception | Full evidence pack |

## 3. Policy-to-Workflow Mapping

For each lifecycle stage, list the controls, owners, and automation used.

| Lifecycle Stage | Required Control | Owner | Tooling / Automation | Evidence Stored |
| ---------------- | ---------------- | ----- | -------------------- | --------------- |
| Data Ingestion | | | | |
| Model Training / Selection | | | | |
| Evaluation & Red-teaming | | | | |
| Deployment & Monitoring | | | | |
| Incident Response | | | | |

## 4. Evidence Pack Checklist

Create a shared folder or dashboard that auto-generates these artifacts per release:

- Evaluation summary (metrics, datasets, pass/fail decisions)
- Risk questionnaire with change log
- Red-team / stress test results and mitigations
- Incident response readiness (runbook link, on-call rotation)
- Attestation log (who signed off, when, on what basis)

## 5. Governance Rituals

| Ritual | Purpose | Participants | Inputs | Outputs |
| ------ | ------- | ------------ | ------ | ------- |
| Experimentation Clinic | Fast review of new ideas and risk tiering | Product, Risk, Legal | Experiment briefs | Tier decision + feedback |
| Release Readiness Review | Validate evidence pack before launch | Product, Engineering, Risk, Support | Evidence pack, gating checklist | Launch decision + action items |
| Incident Postmortem | Learn from issues and update policy | Incident response team, policy owners | Incident report | Updated playbook, backlog items |
| Quarterly Audit | Ensure controls stay effective | Risk, Compliance, Internal Audit | Evidence packs, logs | Findings + remediation plan |

## 6. Continuous Improvement Hooks

- Define telemetry thresholds that auto-create review tickets (e.g., spike in refusals, safety incidents)
- Schedule semi-annual policy refresh using latest regulations and lessons learned
- Maintain a public changelog of governance updates for transparency

> **Usage:** Print this playbook or link it inside your governance portal. Update the tables during workshops and store completed versions alongside program documentation.
