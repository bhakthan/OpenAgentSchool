import { loadSettings } from '@/lib/userSettings';

// Direct assignment so Vite can statically analyze and bundle the env vars
const CORE_API_URL = import.meta.env.VITE_CORE_API_URL as string | undefined
const ORCHESTRATOR_SERVICE_URL = import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL as string | undefined
const KNOWLEDGE_SERVICE_URL = import.meta.env.VITE_KNOWLEDGE_SERVICE_URL as string | undefined

/** Resolve backend URLs: user settings → env vars → localhost defaults */
function resolveBackends() {
  const s = loadSettings().backends;
  return {
    core: s.coreApi || CORE_API_URL || 'http://localhost:8000',
    orchestrator: s.orchestrator || ORCHESTRATOR_SERVICE_URL || 'http://localhost:8002',
    knowledge: s.knowledgeService || KNOWLEDGE_SERVICE_URL || 'http://localhost:8003',
  };
}

export const API_CONFIG = resolveBackends();

export function withApiV1(base: string) {
  return `${base.replace(/\/$/, '')}/api/v1`;
}
