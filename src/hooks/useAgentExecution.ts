/**
 * useAgentExecution Hook
 * Manages agent execution state and WebSocket streaming
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  executeAgents, 
  getAgentExecutionStatus,
  agentWebSocket,
  AgentExecutionRequest,
  AgentExecutionStatus,
  AgentMessage 
} from '@/lib/api/orchestrator';
import { toast } from 'sonner';

interface UseAgentExecutionReturn {
  execute: (request: AgentExecutionRequest) => Promise<void>;
  status: AgentExecutionStatus | null;
  messages: AgentMessage[];
  isExecuting: boolean;
  isConnected: boolean;
  error: string | null;
  reset: () => void;
}

export function useAgentExecution(): UseAgentExecutionReturn {
  const [status, setStatus] = useState<AgentExecutionStatus | null>(null);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Execute agent pipeline
  const execute = useCallback(async (request: AgentExecutionRequest) => {
    try {
      setIsExecuting(true);
      setError(null);
      setMessages([]);
      setStatus(null);

      // Start execution
      const response = await executeAgents(request);
      sessionIdRef.current = response.session_id;

      // Connect WebSocket for real-time updates
      agentWebSocket.connect(response.session_id);

      toast.success('Agent execution started');
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to execute agents';
      setError(errorMsg);
      setIsExecuting(false);
      toast.error(errorMsg);
    }
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setStatus(null);
    setMessages([]);
    setIsExecuting(false);
    setIsConnected(false);
    setError(null);
    sessionIdRef.current = null;
    agentWebSocket.disconnect();
  }, []);

  // Setup WebSocket event listeners
  useEffect(() => {
    const handleConnected = () => {
      setIsConnected(true);
      console.log('✅ Agent WebSocket connected');
    };

    const handleDisconnected = () => {
      setIsConnected(false);
      console.log('❌ Agent WebSocket disconnected');
    };

    const handleMessage = (message: AgentMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUpdate = (update: Partial<AgentExecutionStatus>) => {
      setStatus((prev) => (prev ? { ...prev, ...update } : null));
    };

    const handleComplete = (result: any) => {
      setIsExecuting(false);
      setStatus((prev) => (prev ? { ...prev, status: 'completed', result } : null));
      toast.success('Agent execution completed');
    };

    const handleError = (err: any) => {
      setIsExecuting(false);
      const errorMsg = err.message || 'Agent execution failed';
      setError(errorMsg);
      toast.error(errorMsg);
    };

    agentWebSocket.on('connected', handleConnected);
    agentWebSocket.on('disconnected', handleDisconnected);
    agentWebSocket.on('message', handleMessage);
    agentWebSocket.on('update', handleUpdate);
    agentWebSocket.on('complete', handleComplete);
    agentWebSocket.on('error', handleError);

    return () => {
      agentWebSocket.off('connected', handleConnected);
      agentWebSocket.off('disconnected', handleDisconnected);
      agentWebSocket.off('message', handleMessage);
      agentWebSocket.off('update', handleUpdate);
      agentWebSocket.off('complete', handleComplete);
      agentWebSocket.off('error', handleError);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      agentWebSocket.disconnect();
    };
  }, []);

  return {
    execute,
    status,
    messages,
    isExecuting,
    isConnected,
    error,
    reset,
  };
}
