import { PatternData } from './types';
import { InventoryGuardianVisual } from '@/components/visualization/business-use-cases/InventoryGuardianVisual';

export const inventoryGuardianPattern: PatternData = {
  id: 'inventory-guardian',
  name: 'Inventory Guardian',
  description: 'Fusion of IoT signals, digital twins, and LLM reasoning to keep warehouse stock accurate and proactively trigger replenishment and recovery actions.',
  category: 'Advanced',
  useCases: [
    'Cycle counting across mixed-automation warehouses',
    'Vendor-managed inventory with SLA alerts',
    'Cold chain monitoring with spoilage prevention'
  ],
  whenToUse: 'Deploy when manual counts lag behind demand, shrinkage erodes margins, or replenishment signals are trapped in siloed systems.',
  nodes: [
    {
      id: 'sensor-network',
      type: 'input',
      data: { label: 'Sensor Network', nodeType: 'input', description: 'RFID, weight pads, environmental monitors' },
      position: { x: 40, y: 220 }
    },
    {
      id: 'ingestion-pipeline',
      type: 'default',
      data: { label: 'Streaming Ingestion', nodeType: 'tool', description: 'Streams + normalization' },
      position: { x: 260, y: 220 }
    },
    {
      id: 'inventory-twin',
      type: 'default',
      data: { label: 'Inventory Twin', nodeType: 'aggregator', description: 'Unified stock model' },
      position: { x: 480, y: 220 }
    },
    {
      id: 'guardian-analyst',
      type: 'default',
      data: { label: 'Guardian Analyst', nodeType: 'llm', description: 'LLM detects drift + root cause' },
      position: { x: 700, y: 160 }
    },
    {
      id: 'recovery-orchestrator',
      type: 'default',
      data: { label: 'Recovery Orchestrator', nodeType: 'planner', description: 'Plans replenishment + tasks' },
      position: { x: 700, y: 320 }
    },
    {
      id: 'ops-console',
      type: 'default',
      data: { label: 'Ops Console', nodeType: 'aggregator', description: 'Human validation + notes' },
      position: { x: 920, y: 220 }
    },
    {
      id: 'action-center',
      type: 'output',
      data: { label: 'Action Center', nodeType: 'output', description: 'Tasks, purchase orders, alerts' },
      position: { x: 1140, y: 220 }
    }
  ],
  edges: [
    { id: 'edge-sensor-ingest', source: 'sensor-network', target: 'ingestion-pipeline', animated: true },
    { id: 'edge-ingest-twin', source: 'ingestion-pipeline', target: 'inventory-twin', animated: true },
    { id: 'edge-twin-analyst', source: 'inventory-twin', target: 'guardian-analyst', animated: true },
    { id: 'edge-analyst-orchestrator', source: 'guardian-analyst', target: 'recovery-orchestrator', animated: true, label: 'Playbooks' },
    { id: 'edge-orchestrator-ops', source: 'recovery-orchestrator', target: 'ops-console', animated: true },
    { id: 'edge-analyst-ops', source: 'guardian-analyst', target: 'ops-console', animated: true, label: 'Assumptions' },
    { id: 'edge-ops-action', source: 'ops-console', target: 'action-center', animated: true },
    { id: 'edge-orchestrator-action', source: 'recovery-orchestrator', target: 'action-center', animated: true, label: 'Auto-exec tasks' }
  ],
  codeExample: `// Inventory Guardian anomaly triage (TypeScript)
import { createAgent } from '@openagentschool/operations';
import { InventoryTwin } from '@openagentschool/digital-twin';

const twin = new InventoryTwin();
const guardian = createAgent({
  id: 'inventory-guardian',
  planner: 'gemini-1.5-pro',
  memory: { episodic: 'vertex-vector-store://inventory/events' },
  tools: {
    workOrders: createWorkOrderClient(),
    messaging: createNotificationClient()
  }
});

guardian.on('anomaly', insight => {
  guardian.tools.messaging.notifyTeam('inventory-ops', insight.summary);
});

export async function reconcileReading(reading: SensorPacket) {
  await twin.update(reading);
  const insight = await guardian.reason({
    prompt: 'Investigate stock variance',
    context: twin.snapshot(reading.location)
  });

  if (insight.requiresAction) {
    return guardian.executePlan({
      plan: insight.recoveryPlan,
      fallback: 'route-to-human'
    });
  }

  return insight;
}
`,
  implementation: [
    'Collect telemetry feeds (RFID, PLCs, WMS events) and normalize into a continuously updated inventory twin.',
    'Define variance heuristics and LLM prompts that explain anomalies with evidence instead of raw deltas.',
    'Automate replenishment playbooks (PO drafts, cycle count tasks) with policy gates before execution.',
    'Surface ranked hypotheses and recommended actions in an operator console for quick adjudication.',
    'Log every intervention and auto-action to improve future drift detection and trust.'
  ],
  advantages: [
    'Reduces manual counts and shrinkage through continuous sensing.',
    'Provides explainable recommendations tied to telemetry and policy.',
    'Closes the loop from detection to action with human-confirmed guardrails.'
  ],
  limitations: [
    'Sensor gaps or unreliable data feeds can erode detection confidence.',
    'High-volume facilities require cost-aware streaming infrastructure.',
    'Needs tight integration with procurement and workforce management systems.'
  ],
  relatedPatterns: ['data-quality-feedback-loop', 'strategy-memory-replay', 'policy-gated-tool-invocation'],
  evaluation: 'Track variance detection precision/recall, time-to-recovery, SLA breach avoidance, and the percentage of auto-executed tasks that complete without manual correction.',
  completeCode: `import { createAgent } from '@openagentschool/operations';
import { InventoryTwin } from '@openagentschool/digital-twin';

const twin = new InventoryTwin();

const guardian = createAgent({
  id: 'inventory-guardian-main',
  planner: 'gemini-1.5-pro',
  memory: {
    episodic: 'vertex-vector-store://inventory/events',
    policies: 'vertex-vector-store://inventory/policies'
  },
  tools: {
    workOrders: createWorkOrderClient(),
    messaging: createNotificationClient(),
    analytics: createAnalyticsClient()
  }
});

guardian.on('anomaly', insight => {
  guardian.tools.messaging.notifyTeam('inventory-ops', insight.summary);
  guardian.tools.analytics.record('inventory/anomaly', insight);
});

export async function reconcileSensorPacket(reading: SensorPacket) {
  await twin.update(reading);
  const context = twin.snapshot(reading.location);

  const insight = await guardian.reason({
    prompt: 'Investigate stock variance',
    context,
    policies: ['halt-if-spoilage-risk', 'notify-on-cycle-miss']
  });

  if (!insight.requiresAction) {
    return guardian.tools.analytics.record('inventory/stable', { location: reading.location });
  }

  const result = await guardian.executePlan({
    plan: insight.recoveryPlan,
    fallback: 'route-to-human'
  });

  await guardian.tools.workOrders.logCompletion({
    readingId: reading.id,
    planId: insight.recoveryPlan?.id,
    result
  });

  return result;
}

export async function refreshTwin(locationId: string) {
  const telemetry = await collectTelemetry(locationId);
  await Promise.all(telemetry.map(packet => twin.update(packet)));
  return twin.snapshot(locationId);
}

async function collectTelemetry(locationId: string) {
  return guardian.tools.analytics.fetchStream('telemetry', { locationId });
}
`,
  businessUseCase: {
    industry: 'Omnichannel Fulfillment',
    description: 'A retailer uses the guardian to reconcile stock across automated DCs and micro-fulfillment stores. Sensor drift, shrinkage anomalies, and supplier delays feed recovery actions, while operators adjudicate edge cases from a unified console.',
    visualization: InventoryGuardianVisual,
    enlightenMePrompt: `
Outline the architecture for Inventory Guardian across three regional distribution centers.

Include:
- Telemetry ingestion, normalization, and digital twin refresh cadence.
- LLM Guardian analyst prompts that explain variance with rank-ordered hypotheses.
- Auto-recovery playbooks for replenishment, cycle counts, and spoilage prevention with human approval gates.
- Metrics + dashboards used by operations leads to accept or iterate on the pattern.
`
  }
};
