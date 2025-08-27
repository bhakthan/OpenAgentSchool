export const API_CONFIG = {
  core: (import.meta.env.VITE_CORE_API_URL as string) || 'http://localhost:8000',
  orchestrator: (import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL as string) || 'http://localhost:8002',
  knowledge: (import.meta.env.VITE_KNOWLEDGE_SERVICE_URL as string) || 'http://localhost:8003',
};

export function withApiV1(base: string) {
  return `${base.replace(/\/$/, '')}/api/v1`;
}
