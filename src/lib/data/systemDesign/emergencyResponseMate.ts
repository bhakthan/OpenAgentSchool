import { SystemDesignPattern } from './types';

export const emergencyResponseMateSystemDesign: SystemDesignPattern = {
  id: 'emergency-response-mate',
  name: 'Emergency Response Mate System Design',
  overview: 'A situational fluency pattern that triages incidents, synchronizes responders, and produces after-action intelligence.',
  problemStatement: 'Incident commanders need to fuse alerts, maps, SOPs, and communications fast enough to minimize risk while keeping every team aligned.',
  solution: 'Use an LLM-powered triage and planning loop that deduplicates alerts, assembles multi-channel playbooks, tracks acknowledgements, and archives evidence automatically.',
  steps: [
    {
      id: 'intake-design',
      title: 'Incident Intake Prompting',
      category: 'prompt',
      description: 'Shape intake prompts that capture incident class, severity, required disciplines, and policies for notification order.',
      details: 'Prompts must account for local escalation matrices, sensitive comms, and compliance obligations so the planner routes tasks responsibly.',
      considerations: [
        'Aligning severity scales with OSHA / campus policy',
        'Separating internal vs public messaging triggers',
        'Capturing ground truth sources to avoid rumor amplification'
      ],
      bestPractices: [
        'Include structured fields for threat type, location, headcount, and blocking hazards',
        'Attach SOP references and on-call rosters to each prompt',
        'Hardcode embargo clauses for non-public alerts until command validates'
      ],
      examples: [
        'incidentPrompt = formatIncident({ severity: "critical", location, sources, sop })',
        'notificationPolicies = ["sms-first", "radio-bridge", "command-ops"]'
      ]
    },
    {
      id: 'context-orchestration',
      title: 'Context & Knowledge Orchestration',
      category: 'context',
      description: 'Aggregate maps, floor plans, sensor streams, and asset inventories into an incident context hub.',
      details: 'LLM planners need real-time availability of responders, resource caches, and hazard zones to produce feasible routes.',
      considerations: [
        'Offline contingencies when network connectivity fails',
        'Synchronizing location data from indoor positioning and devices',
        'Governance for sensitive facilities or student data'
      ],
      bestPractices: [
        'Cache critical maps locally with periodic sync to cloud source of truth',
        'Establish SLA for telemetry updates (e.g., cameras, badge readers) during incidents',
        'Tag data sources with sensitivity classification for policy enforcement'
      ],
      examples: [
        'contextHub.load({ maps, sop, roster, equipment })',
        'availabilityMatrix = buildAvailability(onCallRoster, realTimeStatus)'
      ]
    },
    {
      id: 'tasking-loop',
      title: 'Tasking & Communication Loop',
      category: 'tools',
      description: 'Expose communication channels, task assignments, and acknowledgement trackers with automation hooks.',
      details: 'Playbooks should spawn tasks by discipline, include deadlines, and record acknowledgements with timestamps.',
      considerations: [
        'Operating across SMS, radio, Teams/Slack, and PA systems',
        'Fallback for device dead zones or noisy environments',
        'Ensuring chain-of-command sign-offs on major escalations'
      ],
      bestPractices: [
        'Use multi-channel fan-out with deduplicated message IDs',
        'Replay acknowledgement timelines live in the command console',
        'Allow manual overrides to pause or reassign tasks instantly'
      ],
      examples: [
        'playbook.broadcast({ channel: "sms", recipients, message, ackTimeout: 45 })',
        'commandConsole.trackAcknowledgement(taskId, responderId, timestamp)'
      ]
    },
    {
      id: 'evaluation-feedback',
      title: 'Evaluation & Feedback',
      category: 'evaluation',
      description: 'Measure alert-to-ack latency, task completion, escalation accuracy, and responder load to refine preparedness.',
      details: 'The system should log each comms exchange, task outcome, and manual override for post-incident review.',
      considerations: [
        'Handling incomplete data when responders go offline',
        'Classifying false alarms vs real incidents for analytics',
        'Privacy of recorded communication transcripts'
      ],
      bestPractices: [
        'Emit incident metrics to dashboards updated in near real-time',
        'Annotate after-action reviews with timeline visualizations and root-cause notes',
        'Feed metrics into readiness drills and tabletop scenario libraries'
      ],
      examples: [
        'metrics.record({ incidentId, ackLatency, tasksCompleted, overrides })',
        'afterAction.generateTimeline({ incidentId, channelLogs })'
      ]
    },
    {
      id: 'architecture-governance',
      title: 'Architecture & Governance',
      category: 'architecture',
      description: 'Deploy resilient services that can survive local disruptions, enforce policy, and integrate with emergency operations systems.',
      details: 'Multi-region command services with local fallbacks ensure incident coordination stays online during outages.',
      considerations: [
        'Failover between on-prem command center and cloud operations',
        'Regulated logging requirements for critical infrastructure',
        'Securely bridging radio, telephony, and IP-based channels'
      ],
      bestPractices: [
        'Use message queues with priority tiers for life-safety alerts',
        'Encrypt transcripts at rest with role-based decryption for investigations',
        'Run periodic chaos drills that simulate service degradation'
      ],
      examples: [
        'commandBus.publish({ priority: "critical", payload })',
        'policyEngine.enforce({ channel: "radio", rule: "command-auth" })'
      ]
    },
    {
      id: 'instruction-loop',
      title: 'Instruction & Training Integration',
      category: 'instruction',
      description: 'Capture lessons learned, update SOPs, and push practice drills that mirror real incidents.',
      details: 'After-action packages should feed training programs and policy updates so teams continuously improve readiness.',
      considerations: [
        'Balancing transparency with sensitive investigation details',
        'Maintaining drill libraries that age out obsolete procedures',
        'Tracking training completion and competency levels'
      ],
      bestPractices: [
        'Auto-generate training scenarios from recent incidents with anonymized data',
        'Link remediation actions to ticketing systems for accountability',
        'Store after-action approvals alongside SOP version history'
      ],
      examples: [
        'trainingPlanner.enqueueScenario({ incidentId, difficulty: "advanced" })',
        'sopRepository.update({ id: sopId, version: nextVersion, approvals })'
      ]
    }
  ],
  architecture: {
    components: [
      { name: 'Incident Intake Gateway', type: 'input', description: 'Collects alerts from sensors, 911 feeds, and human reports.' },
      { name: 'Context Hub', type: 'processing', description: 'Aggregates maps, assets, rosters, and environmental feeds.' },
      { name: 'Response Planner', type: 'control', description: 'Generates playbooks, tasks, and communication plans.' },
      { name: 'Responder Loop', type: 'output', description: 'Delivers multi-channel messaging with acknowledgement tracking.' },
      { name: 'Command Operations Console', type: 'output', description: 'Provides oversight, overrides, and situational dashboards.' },
      { name: 'After-Action Archive', type: 'storage', description: 'Stores timelines, transcripts, and remediation recommendations.' }
    ],
    flows: [
      { from: 'Incident Intake Gateway', to: 'Context Hub', description: 'Enrich incoming alerts with maps, SOPs, and assets.' },
      { from: 'Context Hub', to: 'Response Planner', description: 'Supply situational awareness for plan generation.' },
      { from: 'Response Planner', to: 'Responder Loop', description: 'Send task assignments and messaging payloads.' },
      { from: 'Responder Loop', to: 'Command Operations Console', description: 'Report acknowledgements, completions, and issues.' },
      { from: 'Command Operations Console', to: 'Response Planner', description: 'Inject overrides, escalation decisions, and re-tasking.' },
      { from: 'Responder Loop', to: 'After-Action Archive', description: 'Persist communication logs and field updates.' },
      { from: 'Command Operations Console', to: 'After-Action Archive', description: 'Store decisions, metrics, and remediation notes.' }
    ]
  }
};
