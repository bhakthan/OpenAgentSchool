import { API_CONFIG, withApiV1 } from './config';
import { apiCache } from '@/lib/cache';
import { io, Socket } from 'socket.io-client';

// Agent execution types
export interface AgentExecutionRequest {
  query: string;
  context?: string;
  agents?: string[];
  mode?: 'critical-thinking' | 'collaborative' | 'sequential';
}

export interface AgentExecutionResponse {
  session_id: string;
  status: 'initiated' | 'running' | 'completed' | 'failed';
  agents_count: number;
  estimated_duration?: number;
}

export interface AgentMessage {
  id: string;
  agent_name: string;
  agent_role: string;
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AgentExecutionStatus {
  session_id: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  current_agent?: string;
  messages: AgentMessage[];
  result?: any;
  error?: string;
}

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
  const cacheKey = `orchestrator:workflow:${workflowId}`;
  
  // Check cache first (short TTL since workflow status changes)
  const cached = apiCache.get<OrchestratorWorkflow>(cacheKey);
  if (cached && cached.status === 'completed') {
    console.log('✅ Using cached workflow data');
    return cached;
  }

  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/workflows/${workflowId}`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Orchestrator error ${res.status}: ${text || res.statusText}`);
  }
  
  const data = await res.json();
  
  // Only cache completed workflows (immutable)
  if (data.status === 'completed') {
    apiCache.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes
    console.log('✅ Fetched and cached completed workflow');
  }
  
  return data;
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

/**
 * Execute multi-agent pipeline
 */
export async function executeAgents(request: AgentExecutionRequest): Promise<AgentExecutionResponse> {
  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/agents/execute`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(getAuthHeader()),
    },
    body: JSON.stringify(request),
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Agent execution error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Get agent execution status
 */
export async function getAgentExecutionStatus(sessionId: string): Promise<AgentExecutionStatus> {
  const base = withApiV1(API_CONFIG.orchestrator);
  const res = await fetch(`${base}/agents/status/${sessionId}`, {
    headers: getAuthHeader(),
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Get status error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * WebSocket Agent Streaming Client
 */
class AgentWebSocketClient {
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Set<Function>> = new Map();

  connect(sessionId: string): void {
    if (this.socket?.connected) {
      this.socket.disconnect();
    }

    const wsUrl = API_CONFIG.orchestrator || 'http://localhost:8002';
    this.socket = io(wsUrl, {
      path: '/ws/socket.io',
      transports: ['websocket', 'polling'],
      auth: {
        token: this.getAccessToken(),
      },
    });

    this.socket.on('connect', () => {
      console.log('🔌 WebSocket connected');
      this.socket?.emit('join_session', { session_id: sessionId });
      this.emit('connected', { sessionId });
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected');
      this.emit('disconnected', { sessionId });
    });

    this.socket.on('agent_message', (message: AgentMessage) => {
      this.emit('message', message);
    });

    this.socket.on('execution_update', (update: Partial<AgentExecutionStatus>) => {
      this.emit('update', update);
    });

    this.socket.on('execution_complete', (result: any) => {
      this.emit('complete', result);
    });

    this.socket.on('execution_error', (error: any) => {
      this.emit('error', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)?.add(handler);
  }

  off(event: string, handler: Function): void {
    this.eventHandlers.get(event)?.delete(handler);
  }

  private emit(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}

// Export singleton WebSocket client
export const agentWebSocket = new AgentWebSocketClient();

// Helper to get auth header
function getAuthHeader(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
