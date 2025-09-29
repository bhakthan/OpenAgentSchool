import { SystemDesignPattern } from './types';

export const inventoryGuardianSystemDesign: SystemDesignPattern = {
  id: 'inventory-guardian',
  name: 'Inventory Guardian System Design',
  overview: 'A telemetry-fused inventory assurance pattern that maintains truthful digital twins, explains variance, and executes recovery playbooks.',
  problemStatement: 'Warehouses suffer from shrinkage, stale stock counts, and siloed replenishment signals that cause missed SLAs and waste.',
  solution: 'Continuously ingest sensor and system events into an inventory twin, reason about drift with LLM analysts, and coordinate human-verified recovery actions.',
  steps: [
    {
      id: 'variance-prompting',
      title: 'Variance Prompt Templates',
      category: 'prompt',
      description: 'Craft prompts that guide the guardian analyst to explain variance with telemetry-backed hypotheses and recommended actions.',
      details: 'Prompts must reference warehouse policies, SLA thresholds, and sensor confidence so the agent prioritizes impactful anomalies.',
      considerations: [
        'Differentiate shrinkage, spoilage, and reconciliation delays',
        'Incorporate vendor-specific reorder policies',
        'Respect compliance rules for regulated goods'
      ],
      bestPractices: [
        'Include inventory snapshot diffs and variance magnitude in every prompt',
        'Provide exemplar hypotheses with supporting telemetry snippets',
        'Append policy reminders (e.g., freeze actions without human approval)'
      ],
      examples: [
        'guardianPrompt = buildVariancePrompt({ sku, variancePct, telemetrySummary })',
        'policyClauses = ["no auto-replenishment >10% variance", "flag if cold-chain"]'
      ]
    },
    {
      id: 'context-normalization',
      title: 'Context Normalization & Fusion',
      category: 'context',
      description: 'Normalize sensor packets, WMS events, and ERP orders into a single inventory twin with freshness SLAs.',
      details: 'An ingestion pipeline enriches events with location, SKU metadata, and traceability tags to keep the twin consistent.',
      considerations: [
        'Handling late-arriving telemetry and deduping duped RFID hits',
        'Scaling ingestion for peak seasons without dropping packets',
        'Detecting sensor outages and switching to predictive fills'
      ],
      bestPractices: [
        'Stamp every event with source, latency, and confidence metadata',
        'Apply schema evolution policies for new device firmware quickly',
        'Continuously validate twin accuracy against manual cycle counts'
      ],
      examples: [
        'stream.upsert({ sku, location, quantity, confidence })',
        'twin.mergeSensorPacket(packet, { applySmoothing: true })'
      ]
    },
    {
      id: 'tooling-exposure',
      title: 'Action Tooling & Playbooks',
      category: 'tools',
      description: 'Expose replenishment, cycle count, and vendor escalation playbooks with approval and fallback metadata.',
      details: 'Each playbook should declare preconditions, automation coverage, and human-in-the-loop checkpoints.',
      considerations: [
        'Multi-warehouse prioritization logic for shared suppliers',
        'SLA-aware tasks (pickers, drivers, auditors)',
        'Ensuring security for vendor-managed inventory actions'
      ],
      bestPractices: [
        'Version playbooks with semantic tags (e.g., perishables, high-value)',
        'Emit structured task payloads to existing workforce systems',
        'Allow partial automation where bots prepare drafts for human confirmation'
      ],
      examples: [
        'playbooks.create({ id: "cycle_count", approvals: ["ops-manager"], steps })',
        'guardian.executePlan({ planId: "auto-reorder", fallback: "route-to-human" })'
      ]
    },
    {
      id: 'evaluation-metrics',
      title: 'Variance Evaluation & Metrics',
      category: 'evaluation',
      description: 'Measure detection precision/recall, time-to-recovery, and SLA adherence for variance incidents.',
      details: 'The guardian should emit detection confidence and tracked outcomes so analytics teams can tune thresholds.',
      considerations: [
        'Avoiding alert fatigue by clustering related anomalies',
        'Capturing ground-truth outcomes for frequent retraining',
        'Balancing automated actions with audit risk'
      ],
      bestPractices: [
        'Log every anomaly with hypothesis ranking, action taken, and resolution time',
        'Reconcile automation outcomes with manual verification daily',
        'Publish dashboards segmented by site, SKU class, and supplier'
      ],
      examples: [
        'metrics.record({ sku, variancePct, detectionConfidence, resolvedInMinutes })',
        'guardian.emitVarianceReport({ incidentId, hypotheses })'
      ]
    },
    {
      id: 'architecture-ops',
      title: 'Architecture & Operational Controls',
      category: 'architecture',
      description: 'Operate ingestion, reasoning, and recovery services with resilience, cost controls, and rollout governance.',
      details: 'Mission control services manage worker queueing, fallback routing, and compliance logging across regions.',
      considerations: [
        'Back-pressure strategies when telemetry floods the system',
        'Failover between regional twins to handle outages',
        'Role-based access for vendor visibility and approvals'
      ],
      bestPractices: [
        'Use partitioned streams per site with priority lanes for high-value SKUs',
        'Apply feature flags for new playbooks and anomaly detectors',
        'Continuously reconcile identity and access policies across tooling'
      ],
      examples: [
        'ingestionPipeline.configure({ partitionKey: locationId, retries: 5 })',
        'opsConsole.flagIncident({ incidentId, severity, assignedTo })'
      ]
    },
    {
      id: 'instruction-loop',
      title: 'Instruction & Human Collaboration',
      category: 'instruction',
      description: 'Provide operators with explainable insights, evidence attachments, and quick decision pathways.',
      details: 'Dashboards should show ranked hypotheses, supporting telemetry, and recommended actions with one-click approvals.',
      considerations: [
        'Ensuring evidence packets are audit-ready',
        'Supporting mobile devices for floor associates',
        'Capturing operator feedback to refine models'
      ],
      bestPractices: [
        'Bundle photos, sensor graphs, and historical notes in each variance ticket',
        'Allow operators to mark false positives and suggest training data',
        'Sync decisions back to supplier portals where applicable'
      ],
      examples: [
        'console.renderHypotheses({ incidentId, ranked: hypotheses })',
        'feedbackCollector.capture({ incidentId, disposition, notes })'
      ]
    }
  ],
  architecture: {
    components: [
      { name: 'Telemetry Ingestion Pipeline', type: 'input', description: 'Aggregates RFID, weight, environmental sensors, and WMS events.' },
      { name: 'Inventory Twin Store', type: 'storage', description: 'Maintains canonical stock levels and metadata with freshness timestamps.' },
      { name: 'Guardian Analyst', type: 'processing', description: 'LLM reasoning layer that explains variance and proposes recovery plans.' },
      { name: 'Recovery Orchestrator', type: 'control', description: 'Executes replenishment and reconciliation playbooks with policy gates.' },
      { name: 'Operator Console', type: 'output', description: 'Surfaces evidence, approvals, and task tracking for humans.' },
      { name: 'Analytics & Metrics Platform', type: 'processing', description: 'Captures incidents, outcomes, and performance dashboards.' }
    ],
    flows: [
      { from: 'Telemetry Ingestion Pipeline', to: 'Inventory Twin Store', description: 'Normalize telemetry into the live digital twin.' },
      { from: 'Inventory Twin Store', to: 'Guardian Analyst', description: 'Provide stock snapshots and variance deltas for reasoning.' },
      { from: 'Guardian Analyst', to: 'Recovery Orchestrator', description: 'Send recommended playbooks with confidence scores.' },
      { from: 'Guardian Analyst', to: 'Operator Console', description: 'Deliver explainable hypotheses and evidence packets.' },
      { from: 'Recovery Orchestrator', to: 'Operator Console', description: 'Post task assignments and collect approvals.' },
      { from: 'Operator Console', to: 'Recovery Orchestrator', description: 'Return approvals, overrides, and feedback for execution.' },
      { from: 'Recovery Orchestrator', to: 'Analytics & Metrics Platform', description: 'Log outcomes, timings, and SLA performance.' },
      { from: 'Guardian Analyst', to: 'Analytics & Metrics Platform', description: 'Record detection confidence and hypothesis accuracy.' }
    ]
  }
};
