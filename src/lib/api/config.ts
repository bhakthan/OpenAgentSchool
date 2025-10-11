// Direct assignment so Vite can statically analyze and bundle the env vars
const CORE_API_URL = import.meta.env.VITE_CORE_API_URL as string | undefined
const ORCHESTRATOR_SERVICE_URL = import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL as string | undefined
const KNOWLEDGE_SERVICE_URL = import.meta.env.VITE_KNOWLEDGE_SERVICE_URL as string | undefined

export const API_CONFIG = {
  core: CORE_API_URL || 'http://localhost:8000',
  orchestrator: ORCHESTRATOR_SERVICE_URL || 'http://localhost:8002',
  knowledge: KNOWLEDGE_SERVICE_URL || 'http://localhost:8003',
};

export function withApiV1(base: string) {
  return `${base.replace(/\/$/, '')}/api/v1`;
}
