import { SystemDesignPattern } from './types';

export const mobileManipulatorStewardSystemDesign: SystemDesignPattern = {
  id: 'mobile-manipulator-steward',
  name: 'Mobile Manipulator Steward System Design',
  overview: 'A Gemini Robotics driven concierge that blends autonomous navigation, dexterous manipulation, and human-in-the-loop safeguards for hospitality and healthcare missions.',
  problemStatement: 'How can we deliver consistent guest-facing robotics missions where an autonomous steward navigates elevators, hallways, and rooms while manipulating items safely and keeping operators informed?',
  solution: 'Combine a perception-rich control loop with policy-gated planners, low-latency controllers, and narrated mission telemetry so autonomy and oversight reinforce each other.',
  steps: [
    {
      id: 'steward-prompt-design',
      title: 'Mission Template & Policy Prompting',
      category: 'prompt',
      description: 'Design structured prompts that translate guest intents into policy-checked mission plans.',
      details: 'Capture operator notes, guest preferences, and guardrail clauses inside the mission template so Gemini can reason about tone, speed, and restricted zones before any actuation.',
      considerations: [
        'Distinguish concierge, logistics, or compliance missions with explicit prompt headers',
        'Embed safety clauses (no unattended doors, audio disclaimers) directly in instructions',
        'Surface escalation phrases for quick operator override requests'
      ],
      bestPractices: [
        'Use YAML-like prompt scaffolds with slots for location, item, guest sentiment, and policy references',
        'Attach representative failure examples that the planner must avoid',
        'Route every prompt through Gemini Guard robotics policies for reinforcement'
      ],
      examples: [
        'mission_prompt = formatMission({ intent: "Deliver tea set", floor: 18, guest: "Nguyen", policy: ["avoid_room_service_cart"] })',
        'safety_overlay = "Never enter guest quarters without explicit badge confirmation"'
      ]
    },
    {
      id: 'steward-context-loop',
      title: 'Multimodal Context & Memory Fusion',
      category: 'context',
      description: 'Fuse RGB-D, force, and audio streams with digital twin metadata for situational awareness.',
      details: 'Maintain rolling perception buffers plus episodic mission snapshots so the agent can check waypoints, object poses, and crowd density mid-mission.',
      considerations: [
        'Sensor desync and clock drift between base and manipulator',
        'Privacy-safe retention of audio snippets for after-action review',
        'Handling degraded localization when elevators or mirrors confuse SLAM'
      ],
      bestPractices: [
        'Timestamp all sensor frames with synchronized fleet clock',
        'Persist mission "breadcrumbs" (location, posture, torque) to vector store for retrieval',
        'Run edge inference for obstacle detection before shipping frames upstream'
      ],
      examples: [
        'context_window = MultiModalRingBuffer(size=120, sensors=["rgbd", "force", "mic"] )',
        'digital_twin.snapshot(roomId).merge(perception.occupancyGrid)'
      ]
    },
    {
      id: 'steward-skill-graph',
      title: 'Skill Graph Planning & Sequencing',
      category: 'knowledge',
      description: 'Represent navigation and manipulation primitives as a graph with guardrail metadata.',
      details: 'Gemini selects skill subgraphs (call elevator → ride → hallway traverse → handoff) while checking each edge for clearance, load limits, and required confirmations.',
      considerations: [
        'Handling branching flows when elevators fail or guests are absent',
        'Versioning skill graphs per facility wing',
        'Simulating graph changes inside ER-15 before deployment'
      ],
      bestPractices: [
        'Annotate each skill with expected telemetry signatures',
        'Keep fallback edges that route to teleoperation or staging zones',
        'Use reinforcement fine-tuning on skill transitions with human labels'
      ],
      examples: [
        'skill_graph = loadSkillGraph(["call_elevator", "floor_transition", "precision_align", "handoff_item"])',
        'planner.choosePath(graph, constraints={ maxSlope: 6, occupancy: "<3" })'
      ]
    },
    {
      id: 'steward-guardrail-evaluation',
      title: 'Safety Evaluation & Intervention Loop',
      category: 'evaluation',
      description: 'Run continuous guardrails for force, proximity, and policy compliance with rapid halts.',
      details: 'A dedicated safety guardian reviews every actuation packet, halts motion on anomalies, and composes incident dossiers for operators and auditors.',
      considerations: [
        'Meeting <250 ms halt latency in congested spaces',
        'Coordinating navigation and manipulator halts to avoid tipping payloads',
        'Preventing false positives from reflective surfaces or human escorts'
      ],
      bestPractices: [
        'Keep safety envelope enforcement on-device with direct actuator access',
        'Emit structured halt events (reason, sensor evidence, recommended recovery)',
        'Replay incidents to Gemini Guard to tighten future policies'
      ],
      examples: [
        'if torqueEnvelope.exceeded(): safetyGuardian.halt("over-torque", location=currentPose)',
        'guardian.emitNarration("Pausing near obstacle, requesting operator guidance")'
      ]
    },
    {
      id: 'steward-architecture',
      title: 'Orchestration & Fleet Operations',
      category: 'architecture',
      description: 'Coordinate mission lifecycle, fleet status, and edge-to-cloud deployment controls.',
      details: 'Mission control APIs assign tasks, stream telemetry, rotate credentials, and synchronize OTA updates across the steward fleet.',
      considerations: [
        'Maintaining mission atomicity when connectivity drops',
        'Segregating guest data from fleet diagnostics',
        'Rolling back skill graph changes with minimal downtime'
      ],
      bestPractices: [
        'Use idempotent mission assignment APIs with leasing semantics',
        'Ship delta telemetry summaries every 5 seconds, full dumps every 2 minutes',
        'Integrate fleet metrics with AIOps alerts for slip ratio, halt frequency, and battery health'
      ],
      examples: [
        'missionHub.assign({ agentId: "steward-01", missionId, expiresIn: "15m" })',
        'fleetControl.scheduleUpdate({ skillGraphVersion: "2025.09.1", rollout: "canary" })'
      ]
    },
    {
      id: 'steward-teleop-governance',
      title: 'Human Oversight & Governance',
      category: 'instruction',
      description: 'Define escalation playbooks, logging, and compliance guardrails for shared autonomy.',
      details: 'Operators need crisp handoff cues, narrated playback, and policy sign-offs linked to each mission to maintain guest trust.',
      considerations: [
        'Protecting PII when storing voice narrations',
        'Ensuring supervisors can override within three seconds',
        'Linking incident reviews to next-day policy adjustments'
      ],
      bestPractices: [
        'Use presence lanes (human-supervised vs delegated) to toggle telemetry density',
        'Generate after-action packets with video clips, transcripts, and policy diffs',
        'Mandate daily incident reconciliation meetings feeding retrieval corpora'
      ],
      examples: [
        'presenceLane.switch("delegated", reason="mission_autonomous")',
        'governanceDesk.createDossier({ missionId, incidents, followUps })'
      ]
    }
  ],
  architecture: {
    components: [
      { name: 'Gemini Perception Gateway', type: 'input', description: 'Streams RGB-D, force, and audio signals with on-device preprocessing.' },
      { name: 'Mission Planner & Skill Graph Engine', type: 'control', description: 'Selects mission flows, evaluates policies, and sequences skills.' },
      { name: 'Navigation Controller', type: 'processing', description: 'Generates safe trajectories across facility maps with live obstacle avoidance.' },
      { name: 'Manipulator Controller', type: 'processing', description: 'Executes grasp and placement primitives with compliance control.' },
      { name: 'Safety Guardian', type: 'control', description: 'Monitors envelopes, enforces halts, and records interventions.' },
      { name: 'Telemetry Bus', type: 'processing', description: 'Aggregates mission metrics, video snippets, and narrations for operators.' },
      { name: 'Operator Console & Narrator', type: 'output', description: 'Provides live status, teleop channel, and after-action review packages.' },
      { name: 'Mission Ledger & Policy Store', type: 'storage', description: 'Persists mission manifests, policies, and incident dossiers.' }
    ],
    flows: [
      { from: 'Gemini Perception Gateway', to: 'Mission Planner & Skill Graph Engine', description: 'Perception summaries and context feed planning decisions.' },
      { from: 'Mission Planner & Skill Graph Engine', to: 'Navigation Controller', description: 'Navigation subgraph with constraints is dispatched for execution.' },
      { from: 'Mission Planner & Skill Graph Engine', to: 'Manipulator Controller', description: 'Manipulation steps are parameterized and queued.' },
      { from: 'Navigation Controller', to: 'Safety Guardian', description: 'Motion packets stream through guardrail checks before actuation.' },
      { from: 'Manipulator Controller', to: 'Safety Guardian', description: 'Gripper pose updates are validated against force and proximity envelopes.' },
      { from: 'Safety Guardian', to: 'Telemetry Bus', description: 'Halts, warnings, and policy events are broadcast to operators.' },
      { from: 'Telemetry Bus', to: 'Operator Console & Narrator', description: 'Narrated status, video clips, and alerts reach human supervisors.' },
      { from: 'Operator Console & Narrator', to: 'Mission Planner & Skill Graph Engine', description: 'Manual overrides or adjustments feed back into the mission plan.' },
      { from: 'Telemetry Bus', to: 'Mission Ledger & Policy Store', description: 'Mission artifacts and incident details are persisted for governance.' },
      { from: 'Mission Ledger & Policy Store', to: 'Mission Planner & Skill Graph Engine', description: 'Policy updates and historical insights inform future planning.' }
    ]
  }
};
