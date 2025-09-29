import { PatternData } from './types';
import { EmergencyResponseMateVisual } from '@/components/visualization/business-use-cases/EmergencyResponseMateVisual';

export const emergencyResponseMatePattern: PatternData = {
  id: 'emergency-response-mate',
  name: 'Emergency Response Mate',
  description: 'Incident co-pilot that fuses alerts, situational intelligence, and multi-channel messaging to coordinate responders under pressure.',
  category: 'Advanced',
  useCases: [
    'Manufacturing floor incidents with hazmat escalation',
    'Campus security alert routing and triage',
    'Critical infrastructure outage response war-rooms'
  ],
  whenToUse: 'Use when responders juggle fragmented telemetry and communication channels, and every minute of delay increases risk.',
  nodes: [
    {
      id: 'incident-alert',
      type: 'input',
      data: { label: 'Incident Alert', nodeType: 'input', description: 'IoT / human-reported signal' },
      position: { x: 40, y: 200 }
    },
    {
      id: 'signal-triage',
      type: 'default',
      data: { label: 'Signal Triage', nodeType: 'llm', description: 'Deduplicate + classify incident' },
      position: { x: 260, y: 140 }
    },
    {
      id: 'context-hub',
      type: 'default',
      data: { label: 'Context Hub', nodeType: 'aggregator', description: 'Maps, floor plans, SOPs' },
      position: { x: 260, y: 260 }
    },
    {
      id: 'response-planner',
      type: 'default',
      data: { label: 'Response Planner', nodeType: 'planner', description: 'Generates playbooks + tasks' },
      position: { x: 520, y: 200 }
    },
    {
      id: 'responder-loop',
      type: 'default',
      data: { label: 'Responder Loop', nodeType: 'aggregator', description: 'Chat + acknowledgement tracking' },
      position: { x: 780, y: 160 }
    },
    {
      id: 'command-ops',
      type: 'default',
      data: { label: 'Command Ops', nodeType: 'aggregator', description: 'Command center oversight' },
      position: { x: 780, y: 320 }
    },
    {
      id: 'after-action',
      type: 'output',
      data: { label: 'After Action Package', nodeType: 'output', description: 'Timeline + follow-ups' },
      position: { x: 1040, y: 220 }
    }
  ],
  edges: [
    { id: 'edge-alert-triage', source: 'incident-alert', target: 'signal-triage', animated: true },
    { id: 'edge-alert-context', source: 'incident-alert', target: 'context-hub', animated: true },
    { id: 'edge-triage-planner', source: 'signal-triage', target: 'response-planner', animated: true, label: 'Severity + type' },
    { id: 'edge-context-planner', source: 'context-hub', target: 'response-planner', animated: true, label: 'Operating picture' },
    { id: 'edge-planner-responder', source: 'response-planner', target: 'responder-loop', animated: true, label: 'Tasking' },
    { id: 'edge-planner-command', source: 'response-planner', target: 'command-ops', animated: true, label: 'Escalation brief' },
    { id: 'edge-responder-command', source: 'responder-loop', target: 'command-ops', animated: true, label: 'Acknowledgements' },
    { id: 'edge-responder-after', source: 'responder-loop', target: 'after-action', animated: true, label: 'Field logs' },
    { id: 'edge-command-after', source: 'command-ops', target: 'after-action', animated: true, label: 'Decisions + metrics' }
  ],
  codeExample: `// Emergency Response Mate orchestrator (TypeScript)
import { createCrisisAgent } from '@openagentschool/response';

const responseMate = createCrisisAgent({
  id: 'response-mate',
  planner: 'gemini-1.5-pro',
  channels: ['sms', 'radio-bridge', 'slack'],
  knowledgeBases: ['sop://safety', 'map://campus', 'inventory://ppe']
});

export async function handleIncident(alert: IncidentSignal) {
  const classification = await responseMate.triage(alert);
  const playbook = await responseMate.composePlan({
    incident: classification,
    context: await responseMate.loadContext(alert.location)
  });

  await responseMate.broadcast(playbook.assignment);
  return responseMate.captureAfterAction(playbook.id);
}
`,
  implementation: [
    'Aggregate IoT sensors, camera analytics, 911 feeds, and manual reports into a single incident intake queue.',
    'Classify incidents by severity and required disciplines, attaching SOP references and evacuation maps.',
    'Auto-generate responder task lists with acknowledgement tracking and escalation timers.',
    'Maintain multi-channel comms (SMS, radio transcripts, Teams/Slack) and synchronize updates to command dashboards.',
    'Compile after-action reports with timeline, interventions, and recommended remediations.'
  ],
  advantages: [
    'Shrinks response time by eliminating manual triage and routing.',
    'Keeps responders and command in sync with a living operating picture.',
    'Delivers auditable after-action packages for compliance and learning.'
  ],
  limitations: [
    'Reliant on resilient connectivity; degraded networks require offline fallbacks.',
    'Policy guardrails must prevent premature public alerts or sensitive data leakage.',
    'Needs rigorous incident simulation to calibrate severity thresholds.'
  ],
  relatedPatterns: ['routing', 'autonomous-workflow', 'strategy-memory-replay'],
  evaluation: 'Measure alert-to-ack latency, completion rate of critical tasks, escalation accuracy, and fidelity of after-action reconstructions compared to ground truth logs.',
  completeCode: `import { createCrisisAgent } from '@openagentschool/response';
import type { IncidentSignal, IncidentClassification } from './types';

const responseMate = createCrisisAgent({
  id: 'response-mate-global',
  planner: 'gemini-1.5-pro',
  channels: ['sms', 'radio-bridge', 'teams'],
  knowledgeBases: ['sop://safety', 'map://campus', 'inventory://ppe'],
  guardrails: ['policy:critical-incident']
});

export async function handleIncident(alert: IncidentSignal) {
  const classification = await classifyIncident(alert);
  const playbook = await composePlaybook(classification);

  await responseMate.broadcast(playbook.assignment, {
    acknowledgementTimeoutSeconds: 45,
    escalationChannel: 'command-ops'
  });

  const afterAction = await responseMate.captureAfterAction(playbook.id);
  await archiveIncident({ classification, playbook, afterAction });

  return afterAction.summary;
}

async function classifyIncident(alert: IncidentSignal): Promise<IncidentClassification> {
  return responseMate.triage(alert, {
    attachContext: true,
    enrichments: ['weather', 'on-call-roster']
  });
}

async function composePlaybook(classification: IncidentClassification) {
  return responseMate.composePlan({
    incident: classification,
    context: await responseMate.loadContext(classification.location),
    policies: ['sms-before-radio', 'ack-required']
  });
}

async function archiveIncident(payload: { classification: IncidentClassification; playbook: any; afterAction: any }) {
  await responseMate.storeIncident({
    ...payload,
    storedAt: new Date().toISOString()
  });
}
`,
  businessUseCase: {
    industry: 'Campus & Industrial Safety',
    description: 'A university emergency operations center deploys the response mate to triage alarms, coordinate facilities/security teams, and assemble evidence-rich after-action packets for compliance and learning loops.',
    visualization: EmergencyResponseMateVisual,
    enlightenMePrompt: `
Create an incident response blueprint using Emergency Response Mate for a chemical lab spill.

Detail:
- Intake channels and data needed to classify severity within 60 seconds.
- Playbook generation that assigns tasks to facilities, security, and comms teams.
- Multi-channel messaging plan (radio, SMS, Teams) with acknowledgement tracking.
- After-action package structure fed to compliance and safety training programs.
`
  }
};
