// ─── Micro-Learning Track Definitions ────────────────────────────────────────
// Skill-based learning paths that compose existing concepts into curated bundles.

import type { Track } from './types';

export const TRACKS: Track[] = [
  // ─── Track 1: Zero to Agent ────────────────────────────────────────────────
  {
    id: 'zero-to-agent',
    title: 'Zero to Agent',
    tagline: 'Go from "what is an LLM?" to building your first autonomous agent.',
    icon: 'RocketLaunch',
    gradient: 'from-blue-500 to-cyan-500',
    estimatedHours: 3.5,
    capsuleCount: 28,
    roles: ['developer', 'product-manager', 'business-leader', 'ai-engineer'],
    difficulty: 'beginner',
    conceptIds: [
      'learning-how-to-learn',
      'what-is-an-llm',
      'hallucination-grounding',
      'rag-basics',
      'tool-use-function-calling',
      'memory-state',
      'ai-agents',
      'agent-architecture',
    ],
    outcomeStatement:
      'Understand the foundational building blocks of AI agents and confidently explain how LLMs, RAG, tool use, and memory combine into autonomous systems.',
    proofSignal: '14d',
  },

  // ─── Track 2: Prompt Engineering Mastery ────────────────────────────────────
  {
    id: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery',
    tagline: 'Craft prompts that steer agents with surgical precision.',
    icon: 'PencilLine',
    gradient: 'from-amber-500 to-orange-500',
    estimatedHours: 3,
    capsuleCount: 24,
    roles: ['developer', 'ai-engineer'],
    difficulty: 'intermediate',
    conceptIds: [
      'agentic-prompting-fundamentals',
      'prompt-optimization-patterns',
      'agent-instruction-design',
      'agentic-workflow-control',
      'context-engineering',
      'agent-evaluation-methodologies',
    ],
    outcomeStatement:
      'Design production-grade prompt chains, optimization loops, and evaluation harnesses that turn unreliable LLM calls into deterministic agent behaviors.',
    proofSignal: '28%',
  },

  // ─── Track 3: Secure & Govern ──────────────────────────────────────────────
  {
    id: 'secure-and-govern',
    title: 'Secure & Govern',
    tagline: 'Ship agents your security team will actually approve.',
    icon: 'ShieldCheck',
    gradient: 'from-rose-500 to-pink-500',
    estimatedHours: 3.5,
    capsuleCount: 24,
    roles: ['developer', 'product-manager', 'business-leader', 'ai-engineer'],
    difficulty: 'intermediate',
    conceptIds: [
      'agent-security',
      'agent-ethics',
      'ai-safety-governance',
      'responsible-ai-governance',
      'agent-red-teaming',
      'prompt-injection-defense',
    ],
    outcomeStatement:
      'Implement defense-in-depth security for agents — from prompt injection defenses to red-teaming playbooks and governance frameworks that satisfy enterprise compliance.',
    proofSignal: 'Sev1-Free',
  },

  // ─── Track 4: Multi-Agent Architect ────────────────────────────────────────
  {
    id: 'multi-agent-architect',
    title: 'Multi-Agent Architect',
    tagline: 'Orchestrate fleets of agents that talk, delegate, and scale.',
    icon: 'GitBranch',
    gradient: 'from-violet-500 to-purple-500',
    estimatedHours: 4,
    capsuleCount: 28,
    roles: ['developer', 'ai-engineer'],
    difficulty: 'advanced',
    conceptIds: [
      'multi-agent-systems',
      'a2a-communication',
      'mcp',
      'acp',
      'mcp-a2a-integration',
      'xyz-claw',
      'agent-integration',
    ],
    outcomeStatement:
      'Design and implement multi-agent systems using MCP, A2A, and orchestration patterns — from two-agent handoffs to enterprise-scale agent fleets.',
  },

  // ─── Track 5: Deploy & Operate ─────────────────────────────────────────────
  {
    id: 'deploy-and-operate',
    title: 'Deploy & Operate',
    tagline: 'Get agents into production — and keep them running.',
    icon: 'Gauge',
    gradient: 'from-emerald-500 to-teal-500',
    estimatedHours: 3.5,
    capsuleCount: 24,
    roles: ['developer', 'ai-engineer'],
    difficulty: 'advanced',
    conceptIds: [
      'agent-deployment',
      'agent-ops',
      'agent-observability',
      'agent-cost-optimization',
      'agent-evaluation',
      'agent-testing-benchmarks',
    ],
    outcomeStatement:
      'Stand up production agent infrastructure with observability, cost controls, evaluation automation, and operational runbooks that prevent Sev-1 incidents.',
  },

  // ─── Track 6: AI Product Leader ────────────────────────────────────────────
  {
    id: 'ai-product-leader',
    title: 'AI Product Leader',
    tagline: 'Lead AI initiatives that ship value instead of slide decks.',
    icon: 'Briefcase',
    gradient: 'from-indigo-500 to-blue-500',
    estimatedHours: 3.5,
    capsuleCount: 24,
    roles: ['product-manager', 'business-leader'],
    difficulty: 'intermediate',
    conceptIds: [
      'product-management',
      'ai-product-framework',
      'strategy-portfolio-management',
      'agent-economics',
      'program-setup-north-star',
      'organizational-enablement',
    ],
    outcomeStatement:
      'Build a business case for AI agents, prioritize agent investments, and lead cross-functional teams from pilot to scaled deployment with measurable ROI.',
    proofSignal: '6w',
  },

  // ─── Track 7: Edge & Frontier ──────────────────────────────────────────────
  {
    id: 'edge-and-frontier',
    title: 'Edge & Frontier',
    tagline: 'Push agents to the physical edge — robotics, quantum, and beyond.',
    icon: 'Cpu',
    gradient: 'from-fuchsia-500 to-rose-500',
    estimatedHours: 3,
    capsuleCount: 20,
    roles: ['ai-engineer'],
    difficulty: 'expert',
    conceptIds: [
      'edge-agent',
      'agentic-robotics-integration',
      'quantum-ai-robotics',
      'agent-learning',
      'fine-tuning',
    ],
    outcomeStatement:
      'Deploy agents on edge devices and integrate them with robotics, real-time sensor systems, and emerging quantum-enhanced architectures.',
  },
];

/** Look up a track by its ID */
export function getTrackById(trackId: string): Track | undefined {
  return TRACKS.find((t) => t.id === trackId);
}

/** Get tracks recommended for a given role */
export function getTracksForRole(role: string): Track[] {
  return TRACKS.filter((t) => t.roles.includes(role as any));
}

/** Get tracks by difficulty */
export function getTracksByDifficulty(difficulty: string): Track[] {
  return TRACKS.filter((t) => t.difficulty === difficulty);
}
