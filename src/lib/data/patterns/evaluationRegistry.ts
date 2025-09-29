import { PatternEvaluationProfile, EvaluationCohortId } from './types';

export interface EvaluationJourneyStep {
  id: string;
  title: string;
  summary: string;
  checklist: string[];
}

export interface EvaluationMetricDescriptor {
  dimension: string;
  description: string;
  target?: string;
}

export interface EvaluationPrinciple {
  title: string;
  description: string;
}

export interface CohortGuidance {
  primaryOutcome: string;
  keyMetrics: string[];
  evaluationApproach: string[];
  specialChecks: string[];
}

export const evaluationJourneySteps: EvaluationJourneyStep[] = [
  {
    id: 'intake',
    title: 'Pattern Intake & Goal Definition',
    summary: 'Establish the business outcome, user context, and accountable owners for the pattern before any scoring begins.',
    checklist: [
      'Capture the problem statement, target user, desired business outcome, and success narrative.',
      'Document the pattern maturity (prototype, pilot, GA) and the deployment surface (chat, workflow API, embedded tool, etc.).',
      'Assign a pattern steward (PM or Design) and a technical owner (Engineering or ML) to drive evaluation readiness.'
    ]
  },
  {
    id: 'scenario-design',
    title: 'Scenario & Data Design',
    summary: 'Translate goals into concrete evaluation scenarios with representative data and personas.',
    checklist: [
      'Design happy path, edge case, and abuse case task scenarios that reflect real usage.',
      'Identify grounding corpus, tool integrations, and whether they are stubs or production systems.',
      'Annotate personas (end user, reviewer, compliance auditor) to inform rubric design.'
    ]
  },
  {
    id: 'metric-mapping',
    title: 'Metric Mapping & Target Setting',
    summary: 'Select metrics that connect portfolio guardrails with pattern-specific probes and thresholds.',
    checklist: [
      'Map portfolio metrics such as task success, safety, latency, cost, reliability, human effort, and business impact.',
      'Define pattern-specific probes (e.g. swarm convergence, sensory fidelity) with minimum acceptable targets.',
      'Document guardrail policies and measurable triggers for fallback or escalation.'
    ]
  },
  {
    id: 'instrumentation',
    title: 'Harness & Instrumentation Setup',
    summary: 'Stand up automated rigs, telemetry, and observability across every dependency.',
    checklist: [
      'Build synthetic suites, simulation loops, or LLM-as-judge pipelines with reproducible configs.',
      'Wire OpenTelemetry traces, cost meters, and safety events into the shared analytics workspace.',
      'Verify observability for tool APIs, knowledge stores, orchestrators, and other external dependencies.'
    ]
  },
  {
    id: 'calibration',
    title: 'Dry Runs & Calibration',
    summary: 'Pilot the evaluation, align rubrics, and reconcile human and automated graders.',
    checklist: [
      'Run pilot batches with human review to calibrate rubrics, prompts, and agent parameters.',
      'Analyze disagreement between human labels and automated graders; update instructions or weighting.',
      'Validate reproducibility by re-running the same batch and comparing drift.'
    ]
  },
  {
    id: 'execution',
    title: 'Full Evaluation Execution',
    summary: 'Execute the complete scenario matrix, gathering quantitative metrics and qualitative artifacts.',
    checklist: [
      'Run the full evaluation suite and capture transcripts, traces, and screenshots for failure exemplars.',
      'Summarize metric deltas versus baseline and flag readiness recommendation (Ship / Hold / Iterate).',
      'Archive raw outputs and telemetry for downstream diagnosis and replay.'
    ]
  },
  {
    id: 'decision',
    title: 'Decision & Remediation Loop',
    summary: 'Convert results into decisions, remediation backlogs, and scheduled follow-ups.',
    checklist: [
      'Review outcomes with PM, Engineering, Operations, and Compliance stakeholders.',
      'Prioritize remediation items with owners and SLAs, logging them in the shared backlog.',
      'Update the evaluation registry with status, learnings, and next planned re-run.'
    ]
  },
  {
    id: 'continuous-monitoring',
    title: 'Continuous Monitoring',
    summary: 'Automate regressions, canaries, and longitudinal reviews so production stays within guardrails.',
    checklist: [
      'Schedule nightly/weekly regression suites and production canaries.',
      'Track longitudinal trends such as latency drift, cost creep, and safety events.',
      'Trigger re-evaluations and knowledge sharing when thresholds are breached.'
    ]
  }
];

export const coreEvaluationMetrics: EvaluationMetricDescriptor[] = [
  {
    dimension: 'Task Success Rate',
    description: '% of tasks completed according to rubric (binary or graded).',
    target: '≥ 85% for pilot, ≥ 95% for GA critical flows'
  },
  {
    dimension: 'Safety Violations',
    description: 'Incidents per 1K tasks that breach policy or cause harm.',
    target: '≤ 0 — hard gate'
  },
  {
    dimension: 'Hallucination Rate',
    description: '% of responses containing unsupported claims.',
    target: '≤ 2%'
  },
  {
    dimension: 'Latency (P95)',
    description: 'End-to-end response time for the pattern.',
    target: '≤ 5s (chat) / ≤ 60s (complex workflows)'
  },
  {
    dimension: 'Cost per Task',
    description: 'Total model + tool cost per evaluation run.',
    target: 'Within budget envelope defined by Product'
  },
  {
    dimension: 'Reliability / Completion',
    description: 'Agent finishes without errors or manual intervention.',
    target: '≥ 97%'
  },
  {
    dimension: 'Human Effort',
    description: 'Amount of human review or intervention required.',
    target: '≤ 5% of total workload'
  },
  {
    dimension: 'Business KPI Proxy',
    description: 'Metric that ties directly to the desired business outcome (e.g., learner mastery, lead quality).',
    target: 'Maintains or improves baseline'
  }
];

export const supportingEvaluationMetrics: EvaluationMetricDescriptor[] = [
  { dimension: 'Explainability', description: 'Presence of citations, justification quality, and completeness of traces.' },
  { dimension: 'Groundedness / Retrieval Quality', description: 'Faithfulness to sources and coverage of top-k references.' },
  { dimension: 'Collaboration Quality', description: 'Message efficiency, conflict resolution latency, and convergence for multi-agent flows.' },
  { dimension: 'Learning Outcomes', description: 'Post-task assessment lift and knowledge retention for education patterns.' },
  { dimension: 'Tool Success Rate', description: 'Successful execution of tool/API calls and effectiveness of fallbacks.' },
  { dimension: 'User Experience', description: 'SUS/CSAT scores, tone safety, and modality-specific quality (e.g., MOS for voice).' },
  { dimension: 'Operational Metrics', description: 'Incident mean time to detect (MTTD) and mean time to repair (MTTR).' }
];

export const evaluationPrinciples: EvaluationPrinciple[] = [
  { title: 'Outcome-First', description: 'Anchor evaluation to measurable business impact before refining technical metrics.' },
  { title: 'Defense in Depth', description: 'Combine automated graders, deterministic checks, and human reviews to avoid single points of failure.' },
  { title: 'Representative Data', description: 'Mirror production distributions while synthesizing edge cases and abuse flows.' },
  { title: 'Transparent Criteria', description: 'Document rubrics, thresholds, and triage rules to eliminate ambiguity.' },
  { title: 'Safety as a Hard Gate', description: 'Block launches until safety-critical metrics meet policy thresholds.' },
  { title: 'Cost & Latency Awareness', description: 'Track economics and responsiveness as first-class citizens alongside quality.' },
  { title: 'Feedback Loop', description: 'Translate every evaluation into actionable remediation items.' },
  { title: 'Version Control', description: 'Version prompts, datasets, configs, and model baselines so runs are reproducible.' },
  { title: 'Automation with Human Oversight', description: 'Automate repetitive checks but schedule human spot checks to catch blind spots.' },
  { title: 'Cross-Pattern Learning', description: 'Share insights across similar patterns to accelerate improvements.' }
];

export const evaluationCohortGuidance: Record<EvaluationCohortId, CohortGuidance> = {
  education: {
    primaryOutcome: 'Learning gains, mastery checks, and learner confidence.',
    keyMetrics: ['Post-assessment lift', 'Rubric agreement with SMEs', 'Personalization accuracy', 'Qualitative cognitive load signals'],
    evaluationApproach: [
      'Use pre/post quizzes with statistically significant samples.',
      'Compare AI feedback against SME-designed gold responses.',
      'Track longitudinal retention for spaced repetition and remediation loops.'
    ],
    specialChecks: ['Bias in feedback', 'Accessibility compliance', 'Adherence to learning standards']
  },
  'multi-agent': {
    primaryOutcome: 'Coordination efficiency and high-quality task decomposition across agents.',
    keyMetrics: ['Convergence rate', 'Message rounds to completion', 'Deadlock incidence', 'Delegation accuracy'],
    evaluationApproach: [
      'Simulate complex tasks requiring multi-step collaboration (research + coding + QA, etc.).',
      'Instrument inter-agent messages, tool usage, and final artifact quality.',
      'Stress-test with adversarial roles or noisy information to assess robustness.'
    ],
    specialChecks: ['Token or cost blow-ups', 'Loop detection and escape hatches', 'Escalation logic to humans']
  },
  'advanced-automation': {
    primaryOutcome: 'Autonomous task completion with minimal supervision while staying within guardrails.',
    keyMetrics: ['End-to-end success', 'Recovery from failure', 'Self-corrections per task', 'Policy compliance'],
    evaluationApproach: [
      'Run end-to-end simulations with realistic toolchains (file systems, APIs, UI automation).',
      'Track self-diagnostics quality and retrospectives for accuracy.',
      'Measure incident handling speed when encountering unknown states.'
    ],
    specialChecks: ['Security posture (no secret leakage)', 'Audit logging completeness', 'Fallback and rollback strategies']
  },
  'communication-interface': {
    primaryOutcome: 'Natural, compliant user interactions across modalities and channels.',
    keyMetrics: ['Mean opinion score (MOS)', 'ASR accuracy', 'Context fidelity', 'Error recovery success'],
    evaluationApproach: [
      'Run multimodal test suites with varied accents, noise, and interruptions.',
      'Validate context synchronization between clients and servers (e.g., MCP).',
      'Collect subjective pilot feedback and analyze NLU error clusters.'
    ],
    specialChecks: ['Latency budgets for real-time interactions', 'Document-level access controls', 'Data privacy compliance']
  },
  'cognitive-sensing': {
    primaryOutcome: 'Enhance cognitive tasks via multi-sensory inputs without hallucinations.',
    keyMetrics: ['Multimodal grounding accuracy', 'Sensor fusion correctness', 'Hallucination avoidance'],
    evaluationApproach: [
      'Provide paired sensory inputs (text + visual/audio) with gold-standard reasoning outputs.',
      'Evaluate robustness under missing or noisy modalities.',
      'Benchmark against curated sensory reasoning datasets.'
    ],
    specialChecks: ['Ethical boundaries (no unauthorized surveillance)', 'User consent logs', 'Secure handling of sensitive modalities']
  }
};

export const patternEvaluationRegistry: Record<string, PatternEvaluationProfile> = {
  'action-grounding-verification': {
    scenarioFocus: 'Preflight validation of generated tool or code actions before production execution.',
    criticalMetrics: ['Grounded action approval rate', 'Dry-run policy violation rate', 'Rollback recovery latency'],
    evaluationNotes: [
      'Replay historical automation incidents to confirm the gating pipeline blocks unsafe actions.',
      'Compare dry-run telemetry against production traces to verify parity and provenance capture.'
    ],
    readinessSignals: [
      '≥95% of grounded actions include signed schema and policy evidence on first pass.',
      'Rollback workflows restore state within target MTTR across evaluation fixtures.',
      'Policy lattice emits human-auditable explanations for every rejection.'
    ],
    dataNeeds: [
      'Catalog of tool schemas annotated with risk tiers and governance policies.',
      'Golden incident library covering prior unsafe action scenarios.'
    ],
    cohort: 'advanced-automation'
  },
  'adaptive-lab-technician': {
    scenarioFocus: 'Orchestrating assay workflows across lab instruments with telemetry-driven adaptation and compliance guardrails.',
    criticalMetrics: ['Autonomous assay completion rate', 'Calibration drift detection latency', 'Policy halt precision', 'Human intervention frequency'],
    evaluationNotes: [
      'Run digital-twin simulations with seeded sensor drift and reagent issues to verify adaptive tuning and halt logic.',
      'Validate that every run produces complete provenance artifacts (plan version, telemetry timeline, approvals).',
      'Stress-test changeover scenarios (new assay recipes, instrument maintenance) for safe plan regeneration.'
    ],
    readinessSignals: [
      '≥ 95% of assays complete within tolerance bands without manual correction across evaluation batches.',
      'Safety halts triggered during seeded faults are acknowledged by scientists within the target SLA.',
      'Compliance exports satisfy ISO 17025/CLIA evidence requirements without manual patching.'
    ],
    dataNeeds: [
      'Digital twin datasets covering instrument telemetry, reagent metadata, and historical deviations.',
      'Annotated policy library defining halt criteria and escalation paths for each assay class.'
    ],
    cohort: 'cognitive-sensing'
  },
  'agent-evaluation': {
    scenarioFocus: 'Automated QA/QC of agents',
    criticalMetrics: ['Evaluation accuracy', 'Recall on bugs', 'Mean time to remediation (MTTR)'],
    evaluationNotes: ['Maintain a golden incident library for regression testing.', 'Calibrate and debias LLM-as-judge pipelines.'],
    cohort: 'advanced-automation'
  },
  'agentic-rag': {
    scenarioFocus: 'Retrieval-augmented agent workflows',
    criticalMetrics: ['Faithfulness', 'Retrieval precision@k', 'Grounding coverage'],
    evaluationNotes: ['Benchmark against document QA datasets.', 'Penalize unsupported claims or missing citations.'],
    cohort: 'advanced-automation'
  },
  'agent-to-agent': {
    scenarioFocus: 'Collaborative multi-agent dialogue',
    criticalMetrics: ['Convergence rate', 'Message efficiency', 'Safety compliance'],
    evaluationNotes: ['Introduce conflicting goals to test negotiation and escalation.', 'Track governance for shared context.'],
    cohort: 'multi-agent'
  },
  'autogen-multi-agent': {
    scenarioFocus: 'AutoGen-driven orchestration',
    criticalMetrics: ['Task success rate', 'Tooling cost', 'Coordination overhead'],
    evaluationNotes: ['Stress-test longer planning horizons.', 'Monitor token explosion and conversation drift.'],
    cohort: 'multi-agent'
  },
  'autonomous-workflow': {
    scenarioFocus: 'End-to-end autonomous operations',
    criticalMetrics: ['Completion rate', 'Human handoff frequency', 'Latency'],
    evaluationNotes: ['Execute workflows in sandboxed environments.', 'Verify audit logs and rollback safety.'],
    cohort: 'advanced-automation'
  },
  'budget-constrained-execution': {
    scenarioFocus: 'Adaptive execution loops that enforce cost, latency, and retry ceilings.',
    criticalMetrics: ['Budget adherence', 'Completion rate within allocation', 'Early stop precision'],
    evaluationNotes: [
      'Simulate long-horizon workloads with varying budgets to surface runaway retry behaviour.',
      'Audit budget ledger telemetry for drift between estimated and actual cost or latency.'
    ],
    readinessSignals: [
      'Ledger variance between forecast and actual remains below 5% across evaluation suites.',
      'Loop exits due to early success occur in at least 30% of pilot scenarios.',
      'Budget alarms trigger deterministic fallbacks without orphaned work items.'
    ],
    dataNeeds: ['Synthetic workloads with known optimal budget envelopes.', 'Historical plan graphs annotated with token and latency spend.'],
    cohort: 'advanced-automation'
  },
  'challenge-ladder-generator': {
    scenarioFocus: 'Progressive learning challenges',
    criticalMetrics: ['Learning gain', 'Difficulty calibration accuracy'],
    evaluationNotes: ['Compare against SME-designed ladders.', 'Track frustration or drop-off signals from learners.'],
    cohort: 'education'
  },
  'codeact-agent': {
    scenarioFocus: 'Code editing and execution loop',
    criticalMetrics: ['Test pass rate', 'Execution safety', 'Rollback reliability'],
    evaluationNotes: ['Run unit and integration suites on generated code.', 'Sandbox execution with resource guards.'],
    cohort: 'advanced-automation'
  },
  'computer-use': {
    scenarioFocus: 'UI automation through agents',
    criticalMetrics: ['Task success on target UI', 'Error recovery rate'],
    evaluationNotes: ['Evaluate across varied layouts and resolutions.', 'Enforce safety prompts for sensitive actions.'],
    cohort: 'advanced-automation'
  },
  'emergency-response-mate': {
    scenarioFocus: 'Coordinating multi-channel emergency response with shared situational awareness and audit-ready timelines.',
    criticalMetrics: ['Alert-to-acknowledgement latency', 'Task completion rate within SLA', 'Escalation accuracy', 'After-action fidelity'],
    evaluationNotes: [
      'Simulate concurrent incidents and degraded networks to ensure the agent maintains synchronized comms across channels.',
      'Review generated tasking against human gold playbooks for correctness and tone appropriateness.',
      'Cross-check after-action packages against ground-truth incident logs to verify completeness and provenance.'
    ],
    readinessSignals: [
      'Critical alerts acknowledged within target SLA in ≥ 95% of evaluation drills.',
      'Escalations route to the correct command tier with zero misrouted cases across stress scenarios.',
      'After-action reports capture mandatory regulatory fields without manual editing.'
    ],
    dataNeeds: [
      'Historical incident transcripts with timing metadata and responder roles.',
      'SOP and communication policy corpus tagged by severity, location, and responsible unit.'
    ],
    cohort: 'communication-interface'
  },
  'concept-to-project': {
    scenarioFocus: 'Education project scaffolding',
    criticalMetrics: ['Project completeness', 'Alignment to brief', 'Skill coverage'],
    evaluationNotes: ['Peer review outputs for quality.', 'Track plagiarism or hallucination risk.'],
    cohort: 'education'
  },
  'context-curator': {
    scenarioFocus: 'Context assembly and compression',
    criticalMetrics: ['Relevance score', 'Context compression fidelity'],
    evaluationNotes: ['Validate deduplication accuracy.', 'Audit summaries for hallucination leakage.'],
    cohort: 'education'
  },
  'data-quality-feedback-repair-loop': {
    scenarioFocus: 'Closed-loop detection, profiling, repair, and validation for data quality regressions.',
    criticalMetrics: ['Detection precision', 'Repair success rate', 'Post-repair KPI stability'],
    evaluationNotes: [
      'Inject synthetic anomalies to benchmark detection sensitivity across severity bands.',
      'Validate repaired datasets against downstream KPI baselines and shadow dashboards.'
    ],
    readinessSignals: [
      'Autonomous repairs pass validation in at least 90% of seeded incidents.',
      'Post-repair KPI deltas stay within agreed guardrails across three consecutive runs.',
      'Incident timelines capture anomaly, repair, and validation events with full telemetry.'
    ],
    dataNeeds: ['Labeled anomaly corpora with expected remediation outcomes.', 'Shadow KPI dashboards for regression comparison.'],
    cohort: 'advanced-automation'
  },
  'deep-agents': {
    scenarioFocus: 'Hierarchical orchestration',
    criticalMetrics: ['Plan quality', 'Delegation accuracy', 'Escalation success'],
    evaluationNotes: ['Simulate escalations across tiers.', 'Monitor resource utilization and runtime variance.'],
    cohort: 'multi-agent'
  },
  'deep-researcher': {
    scenarioFocus: 'Long-form research synthesis',
    criticalMetrics: ['Citation accuracy', 'Synthesis quality', 'Safety'],
    evaluationNotes: ['Score against SME reference sets.', 'Check for outdated or low-trust sources.'],
    cohort: 'advanced-automation'
  },
  'error-whisperer': {
    scenarioFocus: 'Debugging tutor interactions',
    criticalMetrics: ['Error diagnosis accuracy', 'Remediation clarity'],
    evaluationNotes: ['Use curated bug corpora.', 'Measure learner time-to-fix improvement.'],
    cohort: 'education'
  },
  'evaluator-optimizer': {
    scenarioFocus: 'Evaluation + optimization loop',
    criticalMetrics: ['Evaluation precision', 'Optimization gain', 'Iteration cost'],
    evaluationNotes: ['Verify that optimizations generalize beyond the evaluation set.', 'Monitor for overfitting or mode collapse.'],
    cohort: 'advanced-automation'
  },
  'handoff-summarizer': {
    scenarioFocus: 'Workflow handoff generation',
    criticalMetrics: ['Summary quality', 'Actionability', 'Leakage risk'],
    evaluationNotes: ['Score summaries with SME rubric.', 'Ensure sensitive data redaction policies are met.'],
    cohort: 'education'
  },
  'knowledge-map-navigator': {
    scenarioFocus: 'Concept navigation guidance',
    criticalMetrics: ['Path relevance', 'Coverage', 'User comprehension'],
    evaluationNotes: ['Track clickstreams for behavioral analytics.', 'Run comprehension quizzes after navigation.'],
    cohort: 'education'
  },
  'misconception-detector': {
    scenarioFocus: 'Identifying learner misconceptions',
    criticalMetrics: ['Detection recall', 'Precision', 'False positive rate'],
    evaluationNotes: ['Stress test with subtle error patterns.', 'Ensure constructive, bias-free feedback tone.'],
    cohort: 'education'
  },
  'model-context-protocol': {
    scenarioFocus: 'MCP client and server coordination',
    criticalMetrics: ['Context synchronization accuracy', 'Latency', 'Error handling robustness'],
    evaluationNotes: ['Run cross-client compliance suites.', 'Validate authentication and authorization flows.'],
    cohort: 'communication-interface'
  },
  'modern-tool-use': {
    scenarioFocus: 'General tool orchestration',
    criticalMetrics: ['Tool success rate', 'Fallback efficiency', 'Latency'],
    evaluationNotes: ['Simulate tool outages to test resilience.', 'Ensure graceful degradation paths exist.'],
    cohort: 'advanced-automation'
  },
  'mobile-manipulator-steward': {
    scenarioFocus: 'Embodied concierge navigating dynamic facilities, performing light manipulation, and coordinating with humans.',
    criticalMetrics: ['Autonomous task success rate', 'Safety intervention frequency', 'Teleoperation-to-autonomy ratio', 'Guest CSAT proxy'],
    evaluationNotes: [
      'Exercise skill graphs in ER-15 or digital twin sandboxes with seeded obstructions before live pilots.',
      'Stress-test proximity, torque, and geo-fence guardrails with human actors and moving obstacles.',
      'Archive narrated status updates, telemetry clips, and halt events for after-action review.'
    ],
    readinessSignals: [
      '≥90% of pilot runs complete without takeover across representative delivery routes.',
      'Safety guardrails halt or slow the platform within policy thresholds (≤ 1s reaction) in seeded incidents.',
      'Telemetry packets (video, narration, metrics) deliver within target latency for operator audits.'
    ],
    dataNeeds: ['Semantic facility maps', 'Synthetic obstacle libraries for simulation', 'Guest feedback or CSAT collection hooks'],
    cohort: 'advanced-automation'
  },
  'inventory-guardian': {
    scenarioFocus: 'Continuous inventory reconciliation that pairs sensor fusion with LLM reasoning and replenishment automation.',
    criticalMetrics: ['Variance detection precision', 'Recovery time to stock accuracy', 'Auto-action success rate', 'Shrinkage reduction'],
    evaluationNotes: [
      'Inject synthetic variance scenarios (mis-scans, spoilage, mis-shipments) to benchmark detection and recommended actions.',
      'Replay historical replenishment incidents to confirm guardrails prevent duplicate or conflicting orders.',
      'Audit operator console logs to ensure hypotheses and actions are explainable and traceable.'
    ],
    readinessSignals: [
      'Net shrinkage delta improves versus baseline over a full evaluation cycle.',
      'Auto-generated tasks close successfully without manual correction ≥ 90% of the time.',
      'Operators rate explanations as “actionable” in calibration sessions at least 4/5 on average.'
    ],
    dataNeeds: [
      'Sensor and WMS event logs with labelled variance root causes.',
      'Procurement and workforce management connectors for closed-loop task execution.'
    ],
    cohort: 'advanced-automation'
  },
  'orchestrator-worker': {
    scenarioFocus: 'Hierarchical multi-agent execution',
    criticalMetrics: ['Task decomposition accuracy', 'Worker utilization'],
    evaluationNotes: ['Evaluate load balancing across workers.', 'Guard against worker starvation or thrash.'],
    cohort: 'multi-agent'
  },
  'parallelization': {
    scenarioFocus: 'Parallel task execution',
    criticalMetrics: ['Speedup factor', 'Race condition rate'],
    evaluationNotes: ['Compare against sequential baselines.', 'Monitor data consistency and merge correctness.'],
    cohort: 'multi-agent'
  },
  'peer-review-simulator': {
    scenarioFocus: 'Simulated peer feedback cycles',
    criticalMetrics: ['Feedback helpfulness', 'Rubric alignment', 'Bias'],
    evaluationNotes: ['Benchmark against human peer reviews.', 'Audit language for harmful or discouraging tone.'],
    cohort: 'education'
  },
  'perception-normalization': {
    scenarioFocus: 'Generating canonical InfoBoxes that compress schema, governance, and profile signals.',
    criticalMetrics: ['Schema coverage score', 'Governance tag accuracy', 'Compression fidelity'],
    evaluationNotes: [
      'Compare emitted InfoBoxes against authoritative catalog snapshots for coverage gaps.',
      'Measure compression ratio while ensuring downstream planners retain required context.'
    ],
    readinessSignals: [
      'Coverage score meets or exceeds 0.9 across critical tables in evaluation corpora.',
      'Governance annotations match policy source-of-truth within tolerance thresholds.',
      'Size budgets are respected without losing mandatory columns or constraints.'
    ],
    dataNeeds: ['Up-to-date catalog metadata with golden governance tags.', 'Evaluation suites of representative schemas including edge-case columns.'],
    cohort: 'advanced-automation'
  },
  'prompt-chaining': {
    scenarioFocus: 'Sequential prompting pipelines',
    criticalMetrics: ['Chain stability', 'State carryover accuracy'],
    evaluationNotes: ['Test long chains for drift.', 'Detect prompt injection and state poisoning vulnerabilities.'],
    cohort: 'multi-agent'
  },
  'policy-gated-tool-invocation': {
    scenarioFocus: 'Policy lattice gating for agent tool invocations before execution.',
    criticalMetrics: ['High-risk block rate', 'False positive rate', 'Audit trace completeness'],
    evaluationNotes: [
      'Replay risky intents with varied parameters to calibrate risk thresholds and gating decisions.',
      'Measure decision explainability quality with human reviewers across deny cases.'
    ],
    readinessSignals: [
      'Escalation paths engage human approvers inside target SLA for red-line scenarios.',
      'False positive rate stays below agreed threshold during regression sweeps.',
      'Signed invocation logs replicate to the audit store within seconds of execution.'
    ],
    dataNeeds: ['Policy lattice definitions with labeled allow and deny cases.', 'Sample transcripts of approved and rejected invocations for training judges.'],
    cohort: 'advanced-automation'
  },
  'query-intent-structured-access': {
    scenarioFocus: 'Mapping natural language analytics queries into safe structured access plans.',
    criticalMetrics: ['Entity binding accuracy', 'Policy compliance rate', 'Plan approval latency'],
    evaluationNotes: [
      'Benchmark classifier and binder against curated NL-to-schema pairs.',
      'Verify row-level policy filters propagate correctly using hold-out compliance cases.'
    ],
    readinessSignals: [
      'Binding accuracy reaches at least 95% on top decile entities within evaluation suites.',
      'Unauthorized joins are blocked in 100% of abuse scenarios.',
      'Plan generation latency stays within SLA under spike load conditions.'
    ],
    dataNeeds: ['Annotated NL query corpora with golden structured plans.', 'Access policy fixtures containing sensitive entity combinations.'],
    cohort: 'advanced-automation'
  },
  'react-agent': {
    scenarioFocus: 'Reason + act loop',
    criticalMetrics: ['Tool accuracy', 'Reasoning transparency', 'Hallucination rate'],
    evaluationNotes: ['Inspect intermediate reasoning traces.', 'Enforce self-check and verification steps.'],
    cohort: 'advanced-automation'
  },
  'reflection-journaler': {
    scenarioFocus: 'Reflective journaling support',
    criticalMetrics: ['Insight depth', 'Emotional safety', 'Privacy adherence'],
    evaluationNotes: ['Conduct user studies for qualitative depth.', 'Ensure no harmful or invasive advice is provided.'],
    cohort: 'education'
  },
  'routing': {
    scenarioFocus: 'Dynamic agent routing',
    criticalMetrics: ['Routing accuracy', 'Latency overhead', 'Load balance'],
    evaluationNotes: ['Validate on multi-task benchmarks.', 'Track misroutes and recovery behavior.'],
    cohort: 'multi-agent'
  },
  'rubric-rater': {
    scenarioFocus: 'Rubric-driven grading',
    criticalMetrics: ['Agreement with SMEs', 'Consistency', 'Bias indicators'],
    evaluationNotes: ['Calibrate with anchor papers.', 'Monitor drift and fairness across cohorts.'],
    cohort: 'education'
  },
  'self-reflection': {
    scenarioFocus: 'Self-correcting agent loops',
    criticalMetrics: ['Self-evaluation accuracy', 'Improvement delta'],
    evaluationNotes: ['Test against known error cases.', 'Guard against infinite optimization loops.'],
    cohort: 'advanced-automation'
  },
  'self-remediation-loop': {
    scenarioFocus: 'Automated remediation workflows',
    criticalMetrics: ['Fix rate', 'Regression prevention', 'Guardrail adherence'],
    evaluationNotes: ['Validate code or content fixes via test suites.', 'Ensure approvals are recorded before deployment.'],
    cohort: 'education'
  },
  'sensory-reasoning-enhancement': {
    scenarioFocus: 'Multimodal reasoning augmentation',
    criticalMetrics: ['Modality fusion accuracy', 'Hallucination rate'],
    evaluationNotes: ['Test with occluded or noisy data.', 'Enforce privacy and consent for sensor inputs.'],
    cohort: 'cognitive-sensing'
  },
  'schema-aware-decomposition': {
    scenarioFocus: 'Generating schema-validated plan graphs from natural language requests.',
    criticalMetrics: ['Schema validation pass rate', 'Coverage score', 'Redundancy reduction'],
    evaluationNotes: [
      'Run decomposition against historical analyst tasks with gold plan graphs.',
      'Measure downstream execution lift versus naive decomposition baselines.'
    ],
    readinessSignals: [
      'Validated nodes cover at least 90% of gold task requirements.',
      'Hallucinated entity rate stays below 1% across evaluation sets.',
      'Optimization reduces redundant subtasks by 20% or more in regression suites.'
    ],
    dataNeeds: ['Library of gold-standard decompositions with entity annotations.', 'Schema drift scenarios to exercise refresh and fallback logic.'],
    cohort: 'advanced-automation'
  },
  'socratic-coach': {
    scenarioFocus: 'Guided questioning dialogues',
    criticalMetrics: ['Question quality', 'Learner engagement', 'Safety'],
    evaluationNotes: ['Measure conversation depth and learner reflection.', 'Avoid leading harmful reasoning paths.'],
    cohort: 'education'
  },
  'spaced-repetition-planner': {
    scenarioFocus: 'Adaptive study scheduling',
    criticalMetrics: ['Retention uplift', 'Schedule accuracy'],
    evaluationNotes: ['Run longitudinal retention studies.', 'Align spacing with forgetting curves.'],
    cohort: 'education'
  },
  'strategy-memory-replay': {
    scenarioFocus: 'Replaying and adapting historical strategies for similar tasks.',
    criticalMetrics: ['Replay success rate', 'Cost savings versus baseline', 'Strategy freshness score'],
    evaluationNotes: [
      'Evaluate embedding retrieval quality using annotated similarity judgements.',
      'Compare execution cost and latency against de novo planning baselines.'
    ],
    readinessSignals: [
      'Replay candidates are selected in at least 70% of recurrent tasks with improved metrics.',
      'Cost savings exceed 25% relative to baseline runs on synthetic repeats.',
      'Stale strategy detection retires outdated playbooks within the defined SLA.'
    ],
    dataNeeds: ['Embedded strategy memory store with quality labels.', 'Benchmark tasks containing both historical strategies and baseline runs.'],
    cohort: 'advanced-automation'
  },
  'swarm-intelligence': {
    scenarioFocus: 'Collective agent swarms',
    criticalMetrics: ['Consensus accuracy', 'System stability', 'Resource usage'],
    evaluationNotes: ['Stress with adversarial nodes.', 'Track token and cost blowups over time.'],
    cohort: 'multi-agent'
  },
  'timebox-pair-programmer': {
    scenarioFocus: 'Pair programming copilot',
    criticalMetrics: ['Guidance relevance', 'Timeboxing adherence'],
    evaluationNotes: ['Compare guidance quality to human pair baseline.', 'Ensure suggestions remain safe and compliant.'],
    cohort: 'education'
  },
  'tool-use-coach': {
    scenarioFocus: 'Tool adoption coaching',
    criticalMetrics: ['Instruction quality', 'User success rate'],
    evaluationNotes: ['Track completion metrics for onboarding flows.', 'Ensure instructions match latest UI or tool versions.'],
    cohort: 'education'
  },
  'voice-agent': {
    scenarioFocus: 'Voice interaction flows',
    criticalMetrics: ['Mean opinion score (MOS)', 'ASR accuracy', 'Latency', 'Compliance'],
    evaluationNotes: ['Run multilingual and noisy environment tests.', 'Ensure call recordings are stored securely with correct retention.'],
    cohort: 'communication-interface'
  }
};
