import { API_CONFIG, withApiV1 } from './config';

export interface ExecuteTemplateParams {
  template: string; // e.g., 'scl'
  execution_context?: Record<string, unknown>;
  override_input?: Record<string, unknown>;
  created_by?: string;
}

export async function executeTemplateWorkflow(params: ExecuteTemplateParams, signal?: AbortSignal) {
  const base = withApiV1(API_CONFIG.orchestrator);
  // Endpoint uses template as querystring parameter
  const url = `${base}/workflows/execute?template=${encodeURIComponent(params.template)}${
    params.created_by ? `&created_by=${encodeURIComponent(params.created_by)}` : ''
  }`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      execution_context: params.execution_context,
      override_input: params.override_input,
    }),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Orchestrator error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

// Lightweight types for reading workflow status/results
export type OrchestratorWorkflowStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'paused';

export interface OrchestratorTask {
  id: number;
  name: string;
  status: OrchestratorWorkflowStatus | string;
  action?: string;
  parameters?: Record<string, unknown>;
  output_data?: any;
}

export interface OrchestratorWorkflow {
  id: number;
  status: OrchestratorWorkflowStatus;
  started_at?: string | null;
  completed_at?: string | null;
  tasks: OrchestratorTask[];
}

export async function getWorkflow(workflowId: number, signal?: AbortSignal): Promise<OrchestratorWorkflow> {
  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/workflows/${workflowId}`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Orchestrator error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function getWorkflowStatus(workflowId: number, signal?: AbortSignal): Promise<any> {
  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/workflows/${workflowId}/status`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Orchestrator error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function cancelWorkflow(workflowId: number, signal?: AbortSignal): Promise<void> {
  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/workflows/${workflowId}/cancel`, {
    method: 'DELETE',
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Orchestrator cancel error ${res.status}: ${text || res.statusText}`);
  }
}
