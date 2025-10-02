import { PatternData } from './types';
import { MobileManipulatorStewardVisual } from '@/components/visualization/business-use-cases/MobileManipulatorStewardVisual';
import { MobileManipulatorStewardCodeVisualizer } from '@/components/visualization/business-use-cases/MobileManipulatorStewardCodeVisualizer';

export const mobileManipulatorStewardPattern: PatternData = {
  id: 'mobile-manipulator-steward',
  name: 'Mobile Manipulator Steward',
  description: 'Gemini Robotics-powered concierge that navigates dynamic spaces, performs light manipulation, and keeps humans in the loop.',
  category: 'Advanced',
  useCases: [
    'Hotel amenity delivery and guest support',
    'Hospital supply runs with safety validation',
    'Campus reception and guided tours'
  ],
  whenToUse: 'Adopt when you need semi-autonomous mobile manipulation with natural-language supervision, consistent safety guardrails, and telemetry-rich audit trails.',
  businessUseCase: {
    industry: 'Hospitality & Care Robotics',
    description: 'A guest services operations team deploys a mobile manipulator steward to deliver amenities, escort visitors, and replenish supplies across a hotel tower. Gemini grounds perception across cameras, force sensors, and facility maps, while operators receive narrated status updates, safety interventions, and override controls so every mission stays auditable and on-policy.',
    visualization: MobileManipulatorStewardVisual,
    enlightenMePrompt: `
Outline the technical design for launching the Mobile Manipulator Steward in a hospitality tower.

Provide:
- Core services and data plane required to orchestrate perception, skill-graph planning, and navigation/manipulation controllers.
- Gemini Guard robotics policy configuration, halt/replan behaviors, and telemetry retention plan.
- Human-in-the-loop console flows for safety interventions, overrides, and after-action review packages.
- A staged rollout plan covering simulation, shadow trials, and guest-facing pilots with success metrics.
`
  },
  nodes: [
    {
      id: 'guest-intent',
      type: 'input',
      data: { label: 'Guest Intent', nodeType: 'input', description: 'Voice/text request or operator command' },
      position: { x: 100, y: 260 }
    },
    {
      id: 'scene-perception',
      type: 'default',
      data: { label: 'Scene Perception', nodeType: 'llm', description: 'Gemini vision-language grounding of environment' },
      position: { x: 320, y: 140 }
    },
    {
      id: 'task-planner',
      type: 'default',
      data: { label: 'Task Planner', nodeType: 'planner', description: 'Skill graph sequencing & policy selection' },
      position: { x: 320, y: 360 }
    },
    {
      id: 'nav-controller',
      type: 'default',
      data: { label: 'Navigation Controller', nodeType: 'executor', description: 'Trajectory generation with safety bubble' },
      position: { x: 560, y: 200 }
    },
    {
      id: 'manipulator-controller',
      type: 'default',
      data: { label: 'Manipulator Controller', nodeType: 'executor', description: 'Gripper + arm motion primitives' },
      position: { x: 560, y: 380 }
    },
    {
      id: 'safety-guardian',
      type: 'default',
      data: { label: 'Safety Guardian', nodeType: 'evaluator', description: 'Gemini Guard + proximity and torque checks' },
      position: { x: 780, y: 260 }
    },
    {
      id: 'status-reporter',
      type: 'default',
      data: { label: 'Status Reporter', nodeType: 'aggregator', description: 'Narrated updates to operator & guest' },
      position: { x: 980, y: 260 }
    },
    {
      id: 'task-complete',
      type: 'output',
      data: { label: 'Fulfillment Complete', nodeType: 'output', description: 'Delivery confirmation + telemetry archive' },
      position: { x: 1180, y: 260 }
    }
  ],
  edges: [
    { id: 'edge-intent-perception', source: 'guest-intent', target: 'scene-perception', animated: true },
    { id: 'edge-intent-planner', source: 'guest-intent', target: 'task-planner', animated: true },
    { id: 'edge-perception-planner', source: 'scene-perception', target: 'task-planner', animated: true, label: 'Context memory' },
    { id: 'edge-planner-nav', source: 'task-planner', target: 'nav-controller', animated: true },
    { id: 'edge-planner-manipulator', source: 'task-planner', target: 'manipulator-controller', animated: true },
    { id: 'edge-nav-safety', source: 'nav-controller', target: 'safety-guardian', animated: true },
    { id: 'edge-manipulator-safety', source: 'manipulator-controller', target: 'safety-guardian', animated: true },
    { id: 'edge-safety-nav', source: 'safety-guardian', target: 'nav-controller', animated: true, label: 'Halt / reroute' },
    { id: 'edge-safety-manipulator', source: 'safety-guardian', target: 'manipulator-controller', animated: true, label: 'Adjust grip' },
    { id: 'edge-safety-status', source: 'safety-guardian', target: 'status-reporter', animated: true },
    { id: 'edge-status-complete', source: 'status-reporter', target: 'task-complete', animated: true }
  ],
  codeExample: `// Pseudo-code for mobile manipulator steward workflow
const steward = createEmbodiedAgent({
  perception: new GeminiPerception({ streams: ['rgbd', 'force', 'audio'] }),
  planner: new SkillGraphPlanner(['navigate_to_room', 'call_elevator', 'handoff_item']),
  executors: {
    navigation: new FleetNavigator({ map: 'hotel_digital_twin' }),
    manipulation: new ManipulatorController({ robot: 'rise-torso-arm' })
  },
  safety: new SafetyGuardian({
    policy: 'gemini-guard-robotics',
    envelopes: ['human-proximity', 'torque-limit', 'geo-fence']
  }),
  reporter: new LiveNarrator({ channel: 'ops-slack' })
});

export async function fulfillAmenity(request: GuestRequest) {
  const context = await steward.perception.observeScene(request.origin);
  const plan = await steward.planner.composePlan({ request, context });
  await steward.reporter.broadcastStart(plan.summary);

  for (const step of plan.steps) {
    await steward.execute(step, {
      onSafetyIntervention: (event) => steward.reporter.broadcastAlert(event),
      onHumanOverride: (directive) => steward.handleOverride(directive)
    });
  }

  const proof = await steward.reporter.collectArtifacts();
  return steward.reporter.broadcastCompletion({ requestId: request.id, proof });
}`,
  implementation: [
    'Instrument indoor maps and digital twin data for Gemini perception grounding.',
    'Catalog manipulation skills (open doors, press elevator buttons, place trays) and store as reusable graphs.',
    'Wire Gemini Guard robotics policies to runtime controllers with configurable halt actions.',
    'Stream status, video snippets, and telemetry for human validation and after-action review.',
    'Define task success rubrics spanning task completion, guest satisfaction, and safety interventions.'
  ],
  advantages: [
    'Blends autonomy with human-in-the-loop oversight for high-trust environments.',
    'Reusable across hospitality, healthcare, and corporate campuses with minimal skill tweaks.',
    'Creates auditable telemetry that feeds reliability and training loops.'
  ],
  limitations: [
    'Requires high-fidelity facility maps and reliable connectivity for telemetry.',
    'Physical skill libraries demand calibration per robot platform.',
    'Policy tuning needed to avoid over-cautious halts in crowded spaces.'
  ],
  relatedPatterns: ['autonomous-workflow', 'agent-ops', 'architecture-platform-operations'],

  velocityProfile: {
    impact: 'low',
    timeToImplement: '3-6 months',
    complexityReduction: 'Low - Requires extensive robotics infrastructure (ROS, navigation stacks, manipulation libraries) and domain-specific calibration',
    reusabilityScore: 4,
    learningCurve: 'steep',
    velocityPractices: [
      'Pattern Fluency - Specialized embodied AI pattern for hospitality, healthcare, warehousing, facility services',
      'Architecture Templates - ROS 2 + Azure IoT Edge + Gemini multimodal provide sensor fusion and task planning',
      'Failure Scenario Libraries - Navigation failures, manipulation errors, safety stop triggers, human-robot interaction edge cases',
      'Operational Instrumentation - Task success rate, teleop ratio, safety stop frequency, guest satisfaction metrics critical'
    ]
  },

  evaluation: 'Track task success (autonomous vs assisted), safety stop frequency, teleop ratio, and guest satisfaction follow-up scores.',
  completeCode: `import { createEmbodiedAgent, registerMissionWatcher } from '@openagentschool/robotics';
import { GeminiGuardPolicy } from '@openagentschool/robotics/safety';
import { publishOpsEvent } from '@openagentschool/telemetry';

const steward = createEmbodiedAgent({
  id: 'mobile-steward-01',
  perception: {
    inputs: ['rgb_camera_fov120', 'depth_camera', 'force_torque_wrist', 'mic_array'],
    fusion: {
      pipeline: 'gemini-1.5-pro-vision',
      samplingRateHz: 15,
      digitalTwin: 'hospitality-tower'
    }
  },
  cognition: {
    planner: 'gemini-1.5-pro',
    memory: {
      episodic: 'vertex-vector-store://robotics/amenities',
      spatial: 'warehouse-digital-twin/hotel-tower'
    },
    skillGraph: {
      entrySkill: 'amenity_delivery',
      nodes: [
        'navigate_to_room',
        'call_elevator',
        'align_with_door',
        'handoff_item',
        'return_to_base'
      ]
    }
  },
  actuation: {
    navigation: {
      controller: 'diff_drive_mpc',
      safetyEnvelope: {
        minClearanceMeters: 0.6,
        humanOverrideChannel: 'ops-console://steward'
      }
    },
    manipulation: {
      controller: 'ros2_moveit',
      arms: ['torso-lift', '7dof-gripper'],
      graspLibrary: ['tray_pick', 'bottle_grip', 'envelope_slide']
    }
  },
  safety: new GeminiGuardPolicy({
    policyId: 'gemini-guard-robotics',
    envelopes: ['human_proximity', 'force_limit', 'geo_fence'],
    haltActions: ['drop_to_safe_pose', 'notify_operator']
  }),
  telemetry: {
    stream: event => publishOpsEvent('robotics/steward', event),
    capture: ['video_thumbnail', 'mission_summary', 'intervention_log']
  }
});

registerMissionWatcher({
  agent: steward,
  onMissionStart(mission) {
    publishOpsEvent('robotics/steward', {
      type: 'mission.start',
      missionId: mission.id,
      guest: mission.metadata.guestName,
      destination: mission.destination
    });
  },
  onIntervention(event) {
    publishOpsEvent('robotics/steward', {
      type: 'mission.intervention',
      severity: event.severity,
      reason: event.reason,
      action: event.action
    });
  },
  onComplete(result) {
    publishOpsEvent('robotics/steward', {
      type: 'mission.complete',
      missionId: result.missionId,
      success: result.status === 'success',
      durationSeconds: result.durationSeconds,
      interventions: result.interventions
    });
  }
});

export async function dispatchAmenityMission(request: AmenityRequest) {
  const context = await steward.observe({ location: request.origin });
  const plan = await steward.plan({
    goal: \`Deliver \${request.item} to room \${request.roomNumber}\`,
    constraints: {
      priority: request.priority,
      guestPreference: request.preferences?.tone ?? 'warm'
    },
    context
  });

  for (const step of plan.steps) {
    await steward.execute(step, {
      onSafetyHalt: async halt => {
        await steward.requestHumanReview({ halt, plan, request });
      },
      onLiveNarration: payload => publishOpsEvent('robotics/steward', payload)
    });
  }

  const proofs = await steward.collectMissionArtifacts(plan.id);
  return {
    missionId: plan.id,
    status: 'delivered',
    proofs
  };
}
`,
  codeVisualizer: MobileManipulatorStewardCodeVisualizer
};
