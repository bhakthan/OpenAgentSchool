#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs/promises';
import XLSX from 'xlsx';

const projectRoot = path.resolve(process.cwd());
const outputDir = path.join(projectRoot, 'public', 'toolkits');

const headerWidths = (...columns) => columns.map((wch) => ({ wch }));

const canvases = [
  {
    file: 'partnership-evaluation-canvas.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Partnership Evaluation Canvas'],
          ['Compare potential partners for AI agent capabilities using a single, transparent framework.'],
          [],
          ['Section', 'Focus'],
          ['1. Opportunity Overview', 'Frame the business problem, timeline, and internal alternatives.'],
          ['2. Capability Fit', 'Score partner offerings across technical and delivery dimensions.'],
          ['3. Responsible AI Alignment', 'Validate governance posture and safety practices.'],
          ['4. Commercial & Legal', 'Collect pricing, licensing, risk, and exit considerations.'],
          ['5. Joint Success Metrics', 'Define how both parties measure program impact.'],
          ['6. Risk & Contingency', 'Document mitigation owners before signing.'],
          ['7. Recommendation', 'Summarize preferred partner, preconditions, and follow-up plan.'],
        ],
        widths: headerWidths(40, 60),
      },
      {
        name: 'Opportunity Overview',
        data: [
          ['Prompt'],
          ['Problem / use case the partnership addresses'],
          ['Time-to-impact required'],
          ['Internal build alternative and estimated cost'],
        ],
        widths: headerWidths(70),
      },
      {
        name: 'Capability Fit',
        data: [
          ['Dimension', 'Partner A', 'Partner B', 'Questions to Clarify'],
          ['Functional Coverage', '', '', ''],
          ['Roadmap Alignment', '', '', ''],
          ['Integration Difficulty', '', '', ''],
          ['Customization Flexibility', '', '', ''],
        ],
        widths: headerWidths(30, 20, 20, 40),
      },
      {
        name: 'Responsible AI',
        data: [
          ['Criterion', 'Evidence Needed', 'Partner A', 'Partner B'],
          ['Data sourcing transparency', 'Audit report, documentation', '', ''],
          ['Model lineage disclosure', 'Version history', '', ''],
          ['Safety / bias controls', 'Eval reports, certifications', '', ''],
          ['Incident response process', 'Playbooks, SLAs', '', ''],
        ],
        widths: headerWidths(35, 35, 15, 15),
      },
      {
        name: 'Commercial Terms',
        data: [
          ['Item', 'Partner A', 'Partner B', 'Notes'],
          ['Pricing Structure', '', '', ''],
          ['Usage Caps / Overage', '', '', ''],
          ['Data Retention Policy', '', '', ''],
          ['Termination & Exit Rights', '', '', ''],
        ],
        widths: headerWidths(30, 15, 15, 40),
      },
      {
        name: 'Success Metrics',
        data: [
          ['Metric Theme', 'Details'],
          ['Outcome', 'e.g., reduced support volume, revenue growth'],
          ['Quality', 'accuracy, satisfaction, trust measures'],
          ['Compliance', 'incident rate, audit findings'],
          ['Enablement', 'time to onboard teams, training completion'],
        ],
        widths: headerWidths(20, 60),
      },
      {
        name: 'Risk & Contingency',
        data: [
          ['Risk Scenario', 'Impact', 'Mitigation', 'Owner', 'Trigger'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(30, 15, 30, 20, 20),
      },
      {
        name: 'Recommendation',
        data: [
          ['Consideration'],
          ['Preferred partner and rationale'],
          ['Preconditions before signing (POC results, reference checks)'],
          ['Transition / exit plan if conditions change'],
          ['Storage reminder: archive alongside procurement records'],
        ],
        widths: headerWidths(80),
      },
    ],
  },
  {
    file: 'continuous-improvement-flywheel.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Continuous Improvement Flywheel Canvas'],
          ['Design a socio-technical loop that converts signals into prioritized improvements for AI agents.'],
          [],
          ['Sections', 'Focus'],
          ['1. Signal Inputs', 'Catalog telemetry, eval, and human feedback sources.'],
          ['2. Normalization Pipeline', 'Describe processing, labeling, and alert thresholds.'],
          ['3. Triage Ritual', 'Define decision cadence, participants, and outputs.'],
          ['4. Backlog Conversion', 'Document ticket template and SLAs.'],
          ['5. Feedback & Celebration', 'Share wins and close the loop with contributors.'],
          ['6. Governance Hooks', 'Automate guardrails and retrospectives.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Signal Inputs',
        data: [
          ['Signal Source', 'Owner', 'Refresh Cadence', 'Quality Gate', 'Notes'],
          ['Production Telemetry', '', '', '', ''],
          ['Synthetic Eval Harness', '', '', '', ''],
          ['Human QA / Red Team', '', '', '', ''],
          ['Support Tickets', '', '', '', ''],
          ['Voice of Customer', '', '', '', ''],
        ],
        widths: headerWidths(30, 20, 20, 20, 25),
      },
      {
        name: 'Normalization',
        data: [
          ['Prompt'],
          ['Data Lake / Warehouse Tables'],
          ['Labeling or Topic Modeling Steps'],
          ['Aggregation Windows (e.g., daily, weekly)'],
          ['Alert Thresholds'],
        ],
        widths: headerWidths(60),
      },
      {
        name: 'Triage Ritual',
        data: [
          ['Meeting', 'Cadence', 'Participants', 'Inputs', 'Outputs'],
          ['Improvement Council', 'Weekly', 'Product, Ops, EvalOps, Support', 'Signal dashboard, backlog status', 'Prioritized actions, owners, due dates'],
        ],
        widths: headerWidths(25, 15, 35, 35, 35),
      },
      {
        name: 'Backlog Conversion',
        data: [
          ['Reminder'],
          ['Template for improvement tickets (hypothesis, evidence, impact, experiment design)'],
          ['SLA for moving items from triage to backlog (e.g., 48 hours)'],
          ['Definition of done for improvements (metrics, documentation, communication)'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Feedback Plan',
        data: [
          ['Channel', 'Audience', 'Update Frequency', 'Content', 'Owner'],
          ['Release Notes', 'All stakeholders', 'Bi-weekly', 'Improvements shipped, metrics', 'Product Comms'],
          ['Win Stories', 'Leadership', 'Monthly', 'Before/after impact snapshots', 'Program Lead'],
          ['Contributor Shout-outs', 'Guild / Community', 'Weekly', 'Recognize signal contributors', 'Enablement'],
        ],
        widths: headerWidths(25, 20, 20, 30, 20),
      },
      {
        name: 'Governance Hooks',
        data: [
          ['Automation Idea'],
          ['Automatic incident tickets for threshold breaches'],
          ['Policy updates triggered by recurring issues'],
          ['Quarterly flywheel retrospective (signal review)'],
          ['Track cycle time from signal to shipped improvement'],
        ],
        widths: headerWidths(70),
      },
    ],
  },
  {
    file: 'platform-operating-model.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Platform Operating Model Canvas'],
          ['Clarify how the shared agent platform serves product teams and enforces guardrails.'],
          [],
          ['Section', 'Purpose'],
          ['1. Platform Vision', 'Capture the promise, differentiators, and default guardrails.'],
          ['2. Service Tier Catalog', 'Define support tiers and included capabilities.'],
          ['3. Paved Roads & Tooling', 'List reference assets provided out of the box.'],
          ['4. Guardrails & Compliance', 'Document policy automation and owners.'],
          ['5. Funding & Cost', 'Explain funding model and reinvestment plans.'],
          ['6. Governance Forums', 'Outline cross-functional forums and cadences.'],
          ['7. Success Metrics', 'Track platform health and adoption.'],
          ['8. Next Quarter Initiatives', 'Plan upcoming improvements.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Platform Vision',
        data: [
          ['Prompt'],
          ['Core promise to consuming teams'],
          ['Differentiators versus DIY solutions'],
          ['Guardrails that come "for free" with the platform'],
        ],
        widths: headerWidths(70),
      },
      {
        name: 'Service Tiers',
        data: [
          ['Tier', 'Description', 'Ideal Consumers', 'Included Capabilities', 'SLA / Support Model'],
          ['Self-Serve', '', '', '', ''],
          ['Guided', '', '', '', ''],
          ['Managed', '', '', '', ''],
        ],
        widths: headerWidths(15, 35, 25, 35, 25),
      },
      {
        name: 'Paved Roads',
        data: [
          ['Asset Type', 'Details'],
          ['Reference implementations / starter kits available', ''],
          ['Policy-as-code modules provided by default', ''],
          ['Sandbox environments and validation suites', ''],
        ],
        widths: headerWidths(45, 45),
      },
      {
        name: 'Guardrails',
        data: [
          ['Control', 'Trigger', 'Enforcement Mechanism', 'Telemetry / Alerts', 'Owner'],
          ['Tool usage quota', 'Excess tool calls', 'Rate limiter + alert', 'PagerDuty alert', 'Platform SRE'],
          ['Safety eval gating', 'Release pipeline', 'CI job + dashboard', 'Quality score drop', 'EvalOps'],
          ['Sensitive data routing', 'Data tag detection', 'Proxy with policy check', 'Data breach alert', 'Security'],
        ],
        widths: headerWidths(25, 20, 35, 25, 20),
      },
      {
        name: 'Funding & Cost',
        data: [
          ['Prompt'],
          ['Budget allocation method (e.g., base funding + consumption-based recharge)'],
          ['Pricing signals for each tier'],
          ['Reinvestment commitments per revenue band'],
        ],
        widths: headerWidths(70),
      },
      {
        name: 'Governance Forums',
        data: [
          ['Forum', 'Cadence', 'Participants', 'Purpose', 'Inputs'],
          ['Adopter Council', 'Monthly', 'Top consuming teams + platform leadership', 'Roadmap feedback, blockers', 'Usage dashboard, roadmap draft'],
          ['Executive Steering', 'Quarterly', 'CIO, Finance, Risk, Platform Director', 'Strategic bets & funding decisions', 'KPI scorecard, investment cases'],
          ['Incident Review', 'As needed', 'Platform SRE, Security, Product reps', 'Post-incident analysis', 'Incident log, mitigation plan'],
        ],
        widths: headerWidths(25, 15, 35, 35, 35),
      },
      {
        name: 'Success Metrics',
        data: [
          ['Metric', 'Target', 'Current', 'Owner', 'Notes'],
          ['Time-to-onboard new team', '', '', '', ''],
          ['% of traffic on paved roads', '', '', '', ''],
          ['Platform NPS', '', '', '', ''],
          ['Guardrail breach rate', '', '', '', ''],
        ],
        widths: headerWidths(35, 15, 15, 20, 25),
      },
      {
        name: 'Next Quarter',
        data: [
          ['Initiative Idea'],
          ['Capability improvements to unlock more autonomy'],
          ['Reliability or guardrail upgrades'],
          ['Enablement programs for new cohorts'],
        ],
        widths: headerWidths(70),
      },
    ],
  },
  {
    file: 'enablement-roadmap-canvas.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Enablement Roadmap Canvas'],
          ['Plan people-first adoption waves that build durable AI agent capability.'],
          [],
          ['Section', 'Focus'],
          ['1. Persona Inventory', 'Identify audiences, maturity, and motivators.'],
          ['2. Readiness Signals', 'Collect evidence before launching enablement.'],
          ['3. Learning Pathways', 'Design the curriculum and reinforcement.'],
          ['4. Enablement Sprints', 'Plan weekly focus, owners, and indicators.'],
          ['5. Incentives & Recognition', 'Align rewards and storytelling.'],
          ['6. Support Infrastructure', 'Catalog assets that keep teams supported.'],
          ['7. Measurement & Feedback', 'Define success metrics and cadence.'],
          ['8. Sustainability Checklist', 'Ensure change sticks over time.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Persona Inventory',
        data: [
          ['Persona', 'Current Maturity', 'Desired Outcomes', 'Key Motivators', 'Top Concerns'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(20, 20, 25, 25, 25),
      },
      {
        name: 'Readiness Signals',
        data: [
          ['Signal Idea'],
          ['Usage telemetry trends (volume, depth)'],
          ['Survey / interview insights (quotes, themes)'],
          ['Process blockers (policy gaps, tooling gaps)'],
          ['Success stories to amplify'],
        ],
        widths: headerWidths(65),
      },
      {
        name: 'Learning Pathways',
        data: [
          ['Persona', 'Modality Mix (workshop, lab, peer circle)', 'Duration', 'Practice Project', 'Reinforcement Mechanism'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(20, 35, 15, 25, 25),
      },
      {
        name: 'Enablement Sprints',
        data: [
          ['Sprint Week', 'Focus', 'Activities', 'Owners', 'Success Indicators'],
          ['Week 1', '', '', '', ''],
          ['Week 2', '', '', '', ''],
          ['Week 3', '', '', '', ''],
          ['Week 4', '', '', '', ''],
        ],
        widths: headerWidths(15, 20, 30, 20, 25),
      },
      {
        name: 'Incentives',
        data: [
          ['Consideration'],
          ['Performance review adjustments or badges'],
          ['Budget for experiments or team tooling'],
          ['Storytelling channels (town hall demos, newsletters)'],
        ],
        widths: headerWidths(70),
      },
      {
        name: 'Support Infrastructure',
        data: [
          ['Asset', 'Purpose', 'Owner', 'Refresh Cadence'],
          ['Office hours', '', '', ''],
          ['Community of practice', '', '', ''],
          ['Documentation hub', '', '', ''],
        ],
        widths: headerWidths(25, 30, 20, 20),
      },
      {
        name: 'Measurement',
        data: [
          ['Metric', 'Target', 'Current', 'Measurement Method', 'Review Cadence'],
          ['Adoption rate', '', '', '', ''],
          ['Task uplift / productivity', '', '', '', ''],
          ['Confidence score', '', '', '', ''],
          ['Satisfaction (NPS/CSAT)', '', '', '', ''],
        ],
        widths: headerWidths(30, 15, 15, 30, 20),
      },
      {
        name: 'Sustainability',
        data: [
          ['Checklist Item'],
          ['Leaders model new behaviors in operating rhythms'],
          ['Enablement artifacts stored in a central, versioned repository'],
          ['Feedback loops push insights into backlog + program roadmap'],
        ],
        widths: headerWidths(80),
      },
    ],
  },
  {
    file: 'north-star-alignment-canvas.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['North Star Alignment Canvas'],
          ['Align executives, product, and operations leaders on a single narrative for the AI agent program.'],
          [],
          ['Section', 'Focus'],
          ['1. Mission Statement', 'Capture beneficiary, problem, transformation, and guardrails.'],
          ['2. Outcomes & Metrics', 'Define leading and lagging indicators with owners.'],
          ['3. Trust & Safety', 'List required guardrails, evidence, and escalation paths.'],
          ['4. Stakeholder Map', 'Clarify roles, success criteria, and concerns.'],
          ['5. Maturity Snapshot', 'Describe ladder stages and exit criteria.'],
          ['6. Communication Narrative', 'Craft messaging, proof points, and channels.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Mission Statement',
        data: [
          ['Prompt'],
          ['Who is the primary beneficiary?'],
          ['What problem are we solving?'],
          ['What transformation or value will they feel?'],
          ['Guardrails / non-negotiables'],
        ],
        widths: headerWidths(70),
      },
      {
        name: 'Outcomes & Metrics',
        data: [
          ['Outcome Theme', 'Leading Indicator', 'Lagging Indicator', 'Owner', 'Review Cadence'],
          ['Example: Productivity lift for agent-assisted workflows', '% of tasks completed with agent partner', 'Hours saved per workflow / quarter', 'Ops Lead', 'Monthly'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(35, 30, 30, 20, 20),
      },
      {
        name: 'Trust & Safety',
        data: [
          ['Reminder'],
          ['Required guardrails / policies enforced'],
          ['Evidence artifacts needed per release (eval reports, red-team results, decision logs)'],
          ['Escalation path & accountable roles'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Stakeholder Map',
        data: [
          ['Stakeholder', 'Role in Program', 'Success Criteria', 'Key Concerns', 'Engagement Cadence'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(25, 30, 30, 30, 25),
      },
      {
        name: 'Maturity Ladder',
        data: [
          ['Stage', 'Capability Focus', 'Exit Criteria (Evidence)', 'Enablers Needed'],
          ['Pilot', '', '', ''],
          ['Production', '', '', ''],
          ['Scale', '', '', ''],
        ],
        widths: headerWidths(20, 30, 35, 30),
      },
      {
        name: 'Narrative',
        data: [
          ['Prompt'],
          ['One-line elevator pitch for the program'],
          ['Proof points / case studies to share'],
          ['Channels & rituals to reinforce the message'],
        ],
        widths: headerWidths(70),
      },
    ],
  },
  {
    file: 'portfolio-balance-canvas.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Portfolio Balance Canvas'],
          ['Use during quarterly portfolio reviews to surface trade-offs, evidence, and sequencing decisions.'],
          [],
          ['Section', 'Focus'],
          ['1. Portfolio Snapshot', 'Summarize initiatives with stage, value, risk, and capacity needs.'],
          ['2. Value vs Risk', 'Capture narrative on value drivers and risk mitigations.'],
          ['3. Option Bets', 'Document discovery experiments with time-box and kill criteria.'],
          ['4. Capacity Allocation', 'Quantify available capacity and proposed mix.'],
          ['5. Communication Plan', 'Outline stakeholder messaging and actions.'],
          ['6. Action Log', 'Record decisions, owners, and review dates.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Snapshot',
        data: [
          ['Initiative', 'Stage', 'Business Value (1-5)', 'Risk Level (L/M/H)', 'Evidence Strength', 'Capacity Required'],
          ['', '', '', '', '', ''],
        ],
        widths: headerWidths(25, 15, 20, 20, 20, 20),
      },
      {
        name: 'Value vs Risk',
        data: [
          ['Prompt'],
          ['Initiative A — Value driver / Risk mitigated?'],
          ['Initiative B — Value driver / Risk mitigated?'],
          ['Initiative C — Value driver / Risk mitigated?'],
          ['Notes: Encourage quantitative and qualitative evidence.'],
        ],
        widths: headerWidths(75),
      },
      {
        name: 'Option Bets',
        data: [
          ['Hypothesis', 'Evidence Needed', 'Time-Box (weeks)', 'Decision Owner', 'Kill Criteria'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(30, 35, 20, 20, 25),
      },
      {
        name: 'Capacity Allocation',
        data: [
          ['Prompt'],
          ['Current total capacity available (FTEs / pods)'],
          ['Capacity already committed to run-the-business work'],
          ['Capacity available for new bets'],
          ['Proposed allocation mix (Run / Grow / Transform)'],
        ],
        widths: headerWidths(75),
      },
      {
        name: 'Communication Plan',
        data: [
          ['Stakeholder Group', 'Decision Impact', 'Narrative Summary', 'Follow-up Actions', 'Owner'],
          ['', '', '', '', ''],
        ],
        widths: headerWidths(25, 20, 30, 30, 20),
      },
      {
        name: 'Action Log',
        data: [
          ['Decision', 'Owner', 'Support Needed', 'Review Date'],
          ['', '', '', ''],
        ],
        widths: headerWidths(35, 20, 30, 20),
      },
    ],
  },
  {
    file: 'responsible-ai-governance-playbook.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Responsible AI Governance Playbook'],
          ['Translate policy statements into operational guardrails, evidence requirements, and governance rhythms.'],
          [],
          ['Section', 'Purpose'],
          ['1. Governance Principles', 'List the behaviors and commitments the program upholds.'],
          ['2. Risk Tiering', 'Define tiers, required controls, cadence, and evidence.'],
          ['3. Policy-to-Workflow', 'Map lifecycle stages to controls, owners, and automation.'],
          ['4. Evidence Checklist', 'Track required artifacts per release.'],
          ['5. Governance Rituals', 'Outline recurring reviews and participants.'],
          ['6. Continuous Improvement', 'Plan updates triggered by data and regulation changes.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Principles',
        data: [
          ['Principle'],
          ['Transparency of data lineage, model behavior, and human overrides'],
          ['Accountability with explicit owners for each release gate'],
          ['Proportionality so oversight effort scales with risk tier'],
          ['Continuous learning: incidents and evals update policy'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Risk Tiering',
        data: [
          ['Tier', 'Example Use Case', 'Required Controls', 'Review Cadence', 'Evidence Artifacts'],
          ['Tier 0 (Sandbox)', 'Internal experimentation with synthetic data', 'Basic logging, access control', 'Self-certify', 'Experiment log'],
          ['Tier 1 (Low Risk)', 'Internal productivity assistant', 'Eval harness, policy-as-code checks', 'Automated gate', 'Eval report + checklist'],
          ['Tier 2 (Medium Risk)', 'Customer-facing support assistant', 'Tier 1 + human QA samples, incident plan', 'Monthly board', 'Eval report, QA log, rollback plan'],
          ['Tier 3 (High Risk)', 'Regulated financial or health workflows', 'Tier 2 + red team, legal review, audit trail', 'Release by exception', 'Full evidence pack'],
        ],
        widths: headerWidths(18, 35, 35, 20, 30),
      },
      {
        name: 'Policy Workflow',
        data: [
          ['Lifecycle Stage', 'Required Control', 'Owner', 'Tooling / Automation', 'Evidence Stored'],
          ['Data Ingestion', '', '', '', ''],
          ['Model Training / Selection', '', '', '', ''],
          ['Evaluation & Red-teaming', '', '', '', ''],
          ['Deployment & Monitoring', '', '', '', ''],
          ['Incident Response', '', '', '', ''],
        ],
        widths: headerWidths(30, 30, 20, 30, 30),
      },
      {
        name: 'Evidence Checklist',
        data: [
          ['Artifact'],
          ['Evaluation summary (metrics, datasets, pass/fail decisions)'],
          ['Risk questionnaire with change log'],
          ['Red-team / stress test results and mitigations'],
          ['Incident response readiness (runbook link, on-call rotation)'],
          ['Attestation log (who signed off, when, on what basis)'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Governance Rituals',
        data: [
          ['Ritual', 'Purpose', 'Participants', 'Inputs', 'Outputs'],
          ['Experimentation Clinic', 'Fast review of new ideas and risk tiering', 'Product, Risk, Legal', 'Experiment briefs', 'Tier decision + feedback'],
          ['Release Readiness Review', 'Validate evidence pack before launch', 'Product, Engineering, Risk, Support', 'Evidence pack, gating checklist', 'Launch decision + action items'],
          ['Incident Postmortem', 'Learn from issues and update policy', 'Incident response team, policy owners', 'Incident report', 'Updated playbook, backlog items'],
          ['Quarterly Audit', 'Ensure controls stay effective', 'Risk, Compliance, Internal Audit', 'Evidence packs, logs', 'Findings + remediation plan'],
        ],
        widths: headerWidths(25, 35, 35, 30, 30),
      },
      {
        name: 'Continuous Improve',
        data: [
          ['Hook'],
          ['Telemetry thresholds that auto-create review tickets (refusals, safety incidents)'],
          ['Semi-annual policy refresh using latest regulations and lessons learned'],
          ['Maintain a public changelog of governance updates for transparency'],
        ],
        widths: headerWidths(80),
      },
    ],
  },
  {
    file: 'knowledge-ops-runbook.xlsx',
    sheets: [
      {
        name: 'Overview',
        data: [
          ['Knowledge Operations Refresh Runbook'],
          ['Keep retrieval-augmented systems current, compliant, and trustworthy with a repeatable refresh playbook.'],
          [],
          ['Section', 'Focus'],
          ['1. Scope & Objectives', 'Document refresh window, domains, and success metrics.'],
          ['2. Source Intake', 'Track owners, SLAs, and delta detection.'],
          ['3. Curation Workflow', 'Outline triage, labeling, review, and publication steps.'],
          ['4. Access Controls', 'Capture policies, enforcement, and audit locations.'],
          ['5. Quality Verification', 'Assign checks, tooling, and pass criteria.'],
          ['6. Release & Communication', 'Share updates with dependent teams.'],
          ['7. Post-Refresh Monitoring', 'Watch telemetry and schedule drift checks.'],
        ],
        widths: headerWidths(35, 60),
      },
      {
        name: 'Scope',
        data: [
          ['Prompt'],
          ['Refresh window (e.g., Q3 compliance updates)'],
          ['Critical domains / regions'],
          ['Success metrics (hallucinations, policy adherence, ticket volume)'],
        ],
        widths: headerWidths(75),
      },
      {
        name: 'Source Intake',
        data: [
          ['Source', 'Owner', 'Intake Method', 'Freshness SLA', 'Delta Detection Approach'],
          ['Policy Repository', '', 'API webhook', '24h', 'Hash diff on sections'],
          ['Product Docs', '', 'Git repo', '48h', 'Commit diff'],
          ['Market Data', '', 'S3 feed', '6h', 'Timestamp check'],
        ],
        widths: headerWidths(25, 20, 25, 20, 30),
      },
      {
        name: 'Curation Workflow',
        data: [
          ['Step'],
          ['Triage: Identify high-risk changes (regulatory, pricing, legal)'],
          ['Labeling: Tag documents with region, sensitivity, expiration'],
          ['Review: Dual approval for Tier 2+ risk content'],
          ['Publication: Push to vector store / knowledge graph with lineage metadata'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Access Controls',
        data: [
          ['Segment', 'Access Policy', 'Runtime Enforcement', 'Audit Log Location'],
          ['Region EU', 'Need-to-know + GDPR consent', 'Policy-aware connector filters', 'audit/eu-access.log'],
          ['Internal Only', 'Employee SSO + NDA', 'Tool sandbox denies export', 'audit/internal.log'],
        ],
        widths: headerWidths(20, 35, 30, 25),
      },
      {
        name: 'Quality Verification',
        data: [
          ['Check', 'Responsible', 'Tooling', 'Pass Criteria'],
          ['Targeted eval suite', 'EvalOps', 'Regression harness', 'Drift < 2% on golden set'],
          ['Manual spot-check', 'Domain expert', 'Review app', '95% acceptance'],
          ['Safety scan', 'Risk', 'Policy scanner', 'Zero critical violations'],
        ],
        widths: headerWidths(25, 20, 20, 30),
      },
      {
        name: 'Release & Comms',
        data: [
          ['Reminder'],
          ['Publish refresh summary (what changed, who approved, next review date)'],
          ['Notify dependent teams (Support, Product, Ops)'],
          ['Update incident runbooks and FAQs'],
        ],
        widths: headerWidths(80),
      },
      {
        name: 'Monitoring',
        data: [
          ['Action'],
          ['Watch telemetry for refusal rates, fallback frequency, or policy violations'],
          ['Schedule mid-cycle drift check'],
          ['Log lessons learned in the Knowledge Ops journal'],
        ],
        widths: headerWidths(80),
      },
    ],
  },
];

function buildWorksheet({ data, widths }) {
  const sheet = XLSX.utils.aoa_to_sheet(data);
  if (widths) {
    sheet['!cols'] = widths;
  }
  return sheet;
}

await fs.mkdir(outputDir, { recursive: true });

for (const canvas of canvases) {
  const workbook = XLSX.utils.book_new();
  for (const sheetDef of canvas.sheets) {
    const worksheet = buildWorksheet(sheetDef);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetDef.name);
  }
  const targetPath = path.join(outputDir, canvas.file);
  XLSX.writeFile(workbook, targetPath, { bookType: 'xlsx' });
  console.log(`Generated ${canvas.file}`);
}
