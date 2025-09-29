import { SystemDesignPattern } from './types';

export const adaptiveLabTechnicianSystemDesign: SystemDesignPattern = {
  id: 'adaptive-lab-technician',
  name: 'Adaptive Lab Technician System Design',
  overview: 'An assay orchestration loop that blends LIMS context, robotic tooling, telemetry guardrails, and scientist oversight to keep wet labs compliant and efficient.',
  problemStatement: 'Labs need to execute complex assay queues with calibrated instruments, responsive scheduling, and auditable provenance without bottlenecking scientists.',
  solution: 'Represent each assay as a policy-aware mission plan that continuously fuses telemetry, adapts parameters, and raises guardrailed escalations to human reviewers when anomalies surface.',
  steps: [
    {
      id: 'assay-prompting',
      title: 'Mission Prompting & Policy Overlay',
      category: 'prompt',
      description: 'Translate LIMS orders into structured prompts that capture assay goals, compliance rules, and instrumentation guardrails.',
      details: 'Mission templates must include calibration tolerances, reagent chain-of-custody, and pause phrases for safety teams so the planner stays compliant.',
      considerations: [
        'Instrument-specific tolerances and warm-up windows',
        'Batch vs single-sample execution tradeoffs',
        'Differentiating simulation, dry-run, and production prompts'
      ],
      bestPractices: [
        'Use YAML slots for assay goal, instrument ID, calibration baseline, and audit tags',
        'Attach prohibited actions list (e.g., no reagent reheating) per assay type',
        'Version prompts alongside policy revisions and LIMS schema changes'
      ],
      examples: [
        'assayPrompt = formatAssayMission({ queueId, sampleId, policy: "iso-17025" })',
        'haltPhrases = ["temperature drift", "unexpected reagent", "manual override"]'
      ]
    },
    {
      id: 'context-fusion',
      title: 'Context & Knowledge Fusion',
      category: 'context',
      description: 'Blend LIMS metadata, calibration baselines, historical runs, and current telemetry buffers for planning and evaluation.',
      details: 'The agent needs rolling buffers of temperature, vibration, and reagent usage to decide when to auto-adjust parameters or escalate.',
      considerations: [
        'Clock skew between sensors, robotics controllers, and LIMS events',
        'Retention windows for sensitive assay data',
        'Fallback context sources when sensors fail mid-run'
      ],
      bestPractices: [
        'Synchronize telemetry with fleet-wide NTP and include offsets in payloads',
        'Persist run breadcrumbs (plan version, operator overrides) to vector stores for retrieval',
        'Mirror key telemetry streams to local edge storage for offline reasoning'
      ],
      examples: [
        'telemetryBuffer = createRingBuffer({ size: 180, signals: ["temp", "vibration", "ph"] })',
        'context = mergeContext(lims.fetchSample(sampleId), telemetryBuffer.snapshot())'
      ]
    },
    {
      id: 'instrument-tooling',
      title: 'Tool & Skill Orchestration',
      category: 'tools',
      description: 'Expose robotic controllers, reagent handlers, and simulators as callable skills with dry-run and policy metadata.',
      details: 'Every instrument interface must advertise capabilities, safe operating envelopes, and calibration checkpoints to the planner.',
      considerations: [
        'Vendor API heterogeneity and authentication',
        'Latency between command issuance and instrument acknowledgement',
        'Supporting dry-run or shadow modes before the real execution'
      ],
      bestPractices: [
        'Wrap instruments with adapters that emit canonical status events',
        'Annotate skill graph nodes with guardrails (max temperature change, linear velocity)',
        'Keep simulators in sync with firmware revisions for safe experimentation'
      ],
      examples: [
        'pipettor = createRoboticsController({ deviceId, dryRun: true })',
        'skillGraph.register("incubate_sample", { duration, targetTemp, guardrails })'
      ]
    },
    {
      id: 'evaluation-loop',
      title: 'Evaluation & Guardrails',
      category: 'evaluation',
      description: 'Continuously evaluate telemetry against calibration envelopes and trigger halts or retunes under ISO-17025 policies.',
      details: 'Guardrail policies must specify halt behavior, notification recipients, and acceptable recovery actions.',
      considerations: [
        'Balancing sensitivity of drift detection vs false positives',
        'Coordinating halts across multi-instrument assay steps',
        'Recording evidence packets that satisfy compliance audits'
      ],
      bestPractices: [
        'Emit structured guardrail events with root-cause hypotheses and suggested next steps',
        'Provide multi-channel notifications (console, SMS, email) with acknowledgement tracking',
        'Replay guardrail incidents in simulation to tune thresholds before production rollout'
      ],
      examples: [
        'if tempDelta > policy.maxDrift: guardian.halt("temperature", payload)',
        'notifyScientist({ assayId, metric: "temp", observed: tempDelta })'
      ]
    },
    {
      id: 'architecture-ops',
      title: 'Architecture & Operations',
      category: 'architecture',
      description: 'Manage mission lifecycle, provenance storage, and rollout controls across lab shifts.',
      details: 'Mission controllers allocate instruments, manage retries, and persist telemetry and human interventions for traceability.',
      considerations: [
        'Coordinating mission scheduling across limited instrumentation',
        'Resuming paused runs after maintenance or manual overrides',
        'Versioning firmware and assay recipes with rollback capability'
      ],
      bestPractices: [
        'Use leasing semantics so only one mission controls an instrument at a time',
        'Emit mission state changes to an audit ledger with operator signatures',
        'Provide canary slots for new assay recipes before broad rollout'
      ],
      examples: [
        'missionHub.assign({ instrumentId, sampleId, leaseSeconds: 900 })',
        'ledger.record({ missionId, state: "completed", artifacts })'
      ]
    },
    {
      id: 'instruction-loop',
      title: 'Instruction & Human Collaboration',
      category: 'instruction',
      description: 'Equip scientists with consoles for approvals, overrides, and knowledge capture to improve future runs.',
      details: 'Consoles need context panes, anomaly timelines, and quick intervention buttons that sync with compliance logs.',
      considerations: [
        'Ensuring acknowledgement SLAs are met for regulatory coverage',
        'Capturing operator annotations without slowing throughput',
        'Respecting privacy when sharing assay footage or narratives'
      ],
      bestPractices: [
        'Auto-populate intervention tickets with telemetry snapshots and recommended actions',
        'Allow operators to flag steps for retrospective review and training data updates',
        'Link console actions directly to audit signatures with tamper-evident seals'
      ],
      examples: [
        'console.showAlert({ severity: "warning", metric: "temp", action: "approve_retune" })',
        'captureAnnotation({ missionId, note, userId, timestamp })'
      ]
    }
  ],
  architecture: {
    components: [
      { name: 'Mission Planner', type: 'control', description: 'Generates assay plans using LIMS context, telemetry history, and policies.' },
      { name: 'Instrument Gateway', type: 'processing', description: 'Standardizes robotics and sensor APIs with dry-run support.' },
      { name: 'Telemetry Guardian', type: 'processing', description: 'Evaluates telemetry streams against calibration envelopes and guardrails.' },
      { name: 'Scientist Console', type: 'output', description: 'Presents anomalies, approvals, and intervention controls.' },
      { name: 'Audit Ledger', type: 'storage', description: 'Stores mission plans, telemetry, and operator signatures for compliance.' },
      { name: 'Context Cache', type: 'storage', description: 'Caches sample metadata, calibration baselines, and historical run embeddings.' }
    ],
    flows: [
      { from: 'Context Cache', to: 'Mission Planner', description: 'Fetch assay metadata, calibrations, and historical runs for planning.' },
      { from: 'Mission Planner', to: 'Instrument Gateway', description: 'Dispatch stepwise commands with skill metadata and tolerances.' },
      { from: 'Instrument Gateway', to: 'Telemetry Guardian', description: 'Stream telemetry events for compliance evaluation.' },
      { from: 'Telemetry Guardian', to: 'Scientist Console', description: 'Send anomalies, halt requests, and recommended interventions.' },
      { from: 'Scientist Console', to: 'Mission Planner', description: 'Apply operator overrides or approvals that adjust the active plan.' },
      { from: 'Telemetry Guardian', to: 'Audit Ledger', description: 'Persist telemetry, anomalies, and guardrail decisions for audits.' },
      { from: 'Mission Planner', to: 'Audit Ledger', description: 'Record plan versions and execution summaries.' }
    ]
  }
};
