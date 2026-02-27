import { useEffect, useRef, useState } from 'react';

type ConnectionStatus = 'idle' | 'connecting' | 'open' | 'error' | 'closed';

interface UseEventSourceOptions {
  enabled?: boolean;
  withCredentials?: boolean;
  maxReconnectAttempts?: number;
  reconnectDelayMs?: number;
}

export function useEventSource(
  url: string | null,
  onMessage: (event: MessageEvent) => void,
  options: UseEventSourceOptions = {}
) {
  const {
    enabled = true,
    withCredentials = false,
    maxReconnectAttempts = 5,
    reconnectDelayMs = 1500,
  } = options;

  const sourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimerRef = useRef<number | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('idle');

  useEffect(() => {
    if (!enabled || !url) {
      setStatus('idle');
      return;
    }

    let isMounted = true;

    const connect = () => {
      if (!isMounted) return;
      setStatus('connecting');

      const source = new EventSource(url, { withCredentials });
      sourceRef.current = source;

      source.onopen = () => {
        if (!isMounted) return;
        reconnectAttemptsRef.current = 0;
        setStatus('open');
      };

      source.onmessage = (event) => {
        if (!isMounted) return;
        onMessage(event);
      };

      source.onerror = () => {
        if (!isMounted) return;
        setStatus('error');
        source.close();

        if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setStatus('closed');
          return;
        }

        reconnectAttemptsRef.current += 1;
        reconnectTimerRef.current = window.setTimeout(connect, reconnectDelayMs);
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimerRef.current !== null) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (sourceRef.current) {
        sourceRef.current.close();
      }
      setStatus('closed');
    };
  }, [enabled, maxReconnectAttempts, onMessage, reconnectDelayMs, url, withCredentials]);

  return { status };
}

