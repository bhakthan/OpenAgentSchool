// Centralized concept identifiers and legacy ID alias resolution.
// Keep this list in sync with ConceptsHub, D3TreeVisualization, and any export pipelines.
// When adding/removing concepts, update tests and any analytics relying on concept counts.

export const CORE_CONCEPT_IDS = [
  'agentic-ai-design-taxonomy',
  'agentic-prompting-fundamentals',
  'prompt-optimization-patterns',
  'agent-instruction-design',
  'agentic-workflow-control',
  'agent-evaluation-methodologies',
  'agent-architecture',
  'agent-security',
  'multi-agent-systems',
  'agent-ethics',
  'ai-agents',
  'ai-safety-governance',
  'program-setup-north-star',
  'responsible-ai-governance',
  'ai-product-framework',
  'a2a-communication',
  'mcp',
  'flow-visualization',
  'agent-evaluation',
  'strategy-portfolio-management',
  'acp',
  'mcp-a2a-integration',
  'data-visualization',
  'data-knowledge-operations',
  'agent-deployment',
  'agent-learning',
  'agent-integration',
  'fine-tuning',
  'agentic-commerce-ap2',
  // Newly elevated initiatives and operations pillars
  'product-management',
  'agent-ops',
  'agentic-robotics-integration',
  'architecture-platform-operations',
  'experimentation-continuous-improvement',
  'ecosystem-partnerships',
  'organizational-enablement'
] as const;

export type CoreConceptId = typeof CORE_CONCEPT_IDS[number];

export const CORE_CONCEPT_COUNT = CORE_CONCEPT_IDS.length; // keep in sync when adding/removing concepts

// Legacy / deprecated IDs mapped to current canonical IDs. Used for inbound deep links & saved states.
export const LEGACY_CONCEPT_ID_ALIASES: Record<string, CoreConceptId> = {
  'model-context-protocol': 'mcp',
  'agent-communication-protocol': 'acp',
  // Product management historical identifiers
  'ai-product-management': 'product-management',
  // Historical variations / typos (add as discovered):
  'agentic-workflow-controls': 'agentic-workflow-control',
  'agent-evaluation-methodology': 'agent-evaluation-methodologies'
};

/**
 * Resolves an inbound concept identifier to the canonical ID.
 * If already canonical (present in CORE_CONCEPT_IDS), returns as-is.
 * If not found and no alias matches, returns the original ID (caller can decide how to handle 404).
 */
export function resolveConceptId(id: string | undefined | null): string | null {
  if (!id) return null;
  if ((CORE_CONCEPT_IDS as readonly string[]).includes(id)) return id;
  if (LEGACY_CONCEPT_ID_ALIASES[id]) return LEGACY_CONCEPT_ID_ALIASES[id];
  return id; // Unknown -> pass through (allows existing 404 / fallback UI to trigger)
}

/** Convenience helper: returns true if the (possibly legacy) id maps to a known concept. */
export function isKnownConceptId(id: string | undefined | null): boolean {
  if (!id) return false;
  const resolved = resolveConceptId(id);
  return (CORE_CONCEPT_IDS as readonly string[]).includes(resolved);
}
