// ─── Capsule Decomposition ───────────────────────────────────────────────────
// Each concept is decomposed into 3–5 micro-lessons following a repeatable pattern.
// No new content authoring needed — capsules are compositional views over existing
// concept pages, quiz questions, study mode prompts, and pattern visualizations.

import type { Capsule } from './types';

/**
 * Generate a standard 4-capsule decomposition for a concept.
 *
 * Pattern:
 *   1. Core Idea   (read,      3–5 min)
 *   2. See It Work  (visualize, 3–5 min)
 *   3. Quick Check  (quiz,      3–5 min)
 *   4. Think Deeper (apply,     5–10 min)
 *
 * Optionally adds a 5th "Pattern Connect" capsule if a related pattern is provided.
 */
function conceptCapsules(
  conceptId: string,
  title: string,
  opts?: {
    quizCategory?: string;
    patternId?: string;
    /** Override default subtitles */
    readSubtitle?: string;
    visualizeSubtitle?: string;
    quizSubtitle?: string;
    applySubtitle?: string;
    patternSubtitle?: string;
  },
): Capsule[] {
  const caps: Capsule[] = [
    {
      id: `${conceptId}--core-idea`,
      conceptId,
      title: `${title}: Core Idea`,
      subtitle: opts?.readSubtitle ?? `Understand the essential mental model behind ${title}.`,
      estimatedMinutes: 5,
      type: 'read',
      order: 1,
    },
    {
      id: `${conceptId}--see-it-work`,
      conceptId,
      title: `${title}: See It Work`,
      subtitle: opts?.visualizeSubtitle ?? `Watch ${title} in action through an interactive diagram.`,
      estimatedMinutes: 5,
      type: 'visualize',
      order: 2,
    },
    {
      id: `${conceptId}--quick-check`,
      conceptId,
      title: `${title}: Quick Check`,
      subtitle: opts?.quizSubtitle ?? `Test your understanding with 3–5 targeted questions.`,
      estimatedMinutes: 5,
      type: 'quiz-checkpoint',
      quizCategoryId: opts?.quizCategory ?? conceptId,
      order: 3,
    },
    {
      id: `${conceptId}--think-deeper`,
      conceptId,
      title: `${title}: Think Deeper`,
      subtitle: opts?.applySubtitle ?? `Apply what you learned through guided Socratic questioning.`,
      estimatedMinutes: 8,
      type: 'apply',
      studyModeType: 'socratic',
      order: 4,
    },
  ];

  if (opts?.patternId) {
    caps.push({
      id: `${conceptId}--pattern-connect`,
      conceptId,
      title: `${title}: Pattern Connect`,
      subtitle: opts?.patternSubtitle ?? `See how ${title} maps to a real agent pattern.`,
      estimatedMinutes: 5,
      type: 'pattern-connect',
      patternId: opts.patternId,
      order: 5,
    });
  }

  return caps;
}

// ─── Track 1: Zero to Agent ──────────────────────────────────────────────────

const zeroToAgentCapsules: Capsule[] = [
  ...conceptCapsules('learning-how-to-learn', 'Learning How to Learn', {
    quizCategory: 'core-concepts',
    readSubtitle: 'The one skill that makes every other skill easier.',
    applySubtitle: 'Reflect on your own learning patterns using spaced repetition principles.',
  }),
  ...conceptCapsules('what-is-an-llm', 'What Is an LLM?', {
    quizCategory: 'core-concepts',
    readSubtitle: 'How tokens, attention, and generation actually work — no math required.',
    visualizeSubtitle: 'See the transformer architecture in a simplified flow diagram.',
  }),
  ...conceptCapsules('hallucination-grounding', 'Hallucination & Grounding', {
    quizCategory: 'core-concepts',
    patternId: 'agentic-rag',
    readSubtitle: 'Why LLMs make things up and how grounding fixes it.',
    patternSubtitle: 'See how RAG patterns ground LLM outputs in real data.',
  }),
  ...conceptCapsules('rag-basics', 'RAG Basics', {
    quizCategory: 'core-concepts',
    patternId: 'agentic-rag',
    readSubtitle: 'Retrieve → Augment → Generate: the pattern that makes LLMs useful.',
    visualizeSubtitle: 'Walk through a RAG pipeline step by step.',
  }),
  ...conceptCapsules('tool-use-function-calling', 'Tool Use & Function Calling', {
    quizCategory: 'core-concepts',
    patternId: 'modern-tool-use',
    readSubtitle: 'Give agents hands — how function calling extends LLM capabilities.',
    patternSubtitle: 'Explore the Modern Tool Use pattern in the pattern library.',
  }),
  ...conceptCapsules('memory-state', 'Memory & State', {
    quizCategory: 'core-concepts',
    readSubtitle: 'Short-term, long-term, and episodic memory for agents.',
  }),
  ...conceptCapsules('ai-agents', 'AI Agents', {
    quizCategory: 'core-concepts',
    patternId: 'react-agent',
    readSubtitle: 'What makes an agent an agent? Perception → Reasoning → Action.',
    patternSubtitle: 'Meet the ReAct Agent — the foundational agent pattern.',
  }),
];

// ─── Track 2: Prompt Engineering Mastery ─────────────────────────────────────

const promptMasteryCapsules: Capsule[] = [
  ...conceptCapsules('agentic-prompting-fundamentals', 'Agentic Prompting', {
    quizCategory: 'prompting-optimization',
    readSubtitle: 'Move beyond "write me a poem" — design prompts that drive agent behavior.',
  }),
  ...conceptCapsules('prompt-optimization-patterns', 'Prompt Optimization', {
    quizCategory: 'prompting-optimization',
    patternId: 'prompt-chaining',
    readSubtitle: 'Chain-of-thought, few-shot, and self-consistency techniques.',
    patternSubtitle: 'See how Prompt Chaining decomposes complex tasks.',
  }),
  ...conceptCapsules('agent-instruction-design', 'Instruction Design', {
    quizCategory: 'prompting-optimization',
    readSubtitle: 'Write system prompts that agents follow reliably at scale.',
  }),
  ...conceptCapsules('agentic-workflow-control', 'Workflow Control', {
    quizCategory: 'prompting-optimization',
    patternId: 'routing',
    readSubtitle: 'Orchestrate multi-step agent workflows with branching and routing.',
    patternSubtitle: 'Explore the Routing pattern for conditional agent flows.',
  }),
  ...conceptCapsules('context-engineering', 'Context Engineering', {
    quizCategory: 'context-engineering',
    readSubtitle: 'Engineer the context window — what goes in determines what comes out.',
  }),
  ...conceptCapsules('agent-evaluation-methodologies', 'Evaluation Methodologies', {
    quizCategory: 'agent-evaluation',
    patternId: 'evaluator-optimizer',
    readSubtitle: 'Measure agent quality with automated evaluation harnesses.',
    patternSubtitle: 'See how the Evaluator-Optimizer pattern creates feedback loops.',
  }),
];

// ─── Track 3: Secure & Govern ────────────────────────────────────────────────

const secureGovernCapsules: Capsule[] = [
  ...conceptCapsules('agent-security', 'Agent Security', {
    quizCategory: 'agent-security',
    readSubtitle: 'Threat models for AI agents — from data poisoning to privilege escalation.',
  }),
  ...conceptCapsules('agent-ethics', 'Agent Ethics', {
    quizCategory: 'agent-ethics',
    readSubtitle: 'Fairness, transparency, and accountability in autonomous systems.',
  }),
  ...conceptCapsules('ai-safety-governance', 'AI Safety & Governance', {
    quizCategory: 'core-concepts',
    readSubtitle: 'Enterprise governance frameworks for responsible AI deployment.',
  }),
  ...conceptCapsules('responsible-ai-governance', 'Responsible AI Playbooks', {
    quizCategory: 'enterprise-playbook-concepts',
    readSubtitle: 'Turn principles into enforceable policies and audit trails.',
  }),
  ...conceptCapsules('agent-red-teaming', 'Agent Red Teaming', {
    quizCategory: 'agent-red-teaming',
    readSubtitle: 'Break your own agents before attackers do.',
    applySubtitle: 'Practice identifying vulnerabilities through structured red-team scenarios.',
  }),
  ...conceptCapsules('prompt-injection-defense', 'Prompt Injection Defense', {
    quizCategory: 'prompt-injection-defense',
    readSubtitle: 'Detect, prevent, and recover from prompt injection attacks.',
  }),
];

// ─── Track 4: Multi-Agent Architect ──────────────────────────────────────────

const multiAgentCapsules: Capsule[] = [
  ...conceptCapsules('multi-agent-systems', 'Multi-Agent Systems', {
    quizCategory: 'multi-agent-systems',
    patternId: 'multi-agent-collaboration',
    readSubtitle: 'When one agent isn\'t enough — coordination, delegation, competition.',
    patternSubtitle: 'See Multi-Agent Collaboration in action.',
  }),
  ...conceptCapsules('a2a-communication', 'A2A Communication', {
    quizCategory: 'advanced-protocols',
    patternId: 'agent-to-agent-communication',
    readSubtitle: 'Google\'s Agent-to-Agent protocol for inter-agent messaging.',
  }),
  ...conceptCapsules('mcp', 'Model Context Protocol', {
    quizCategory: 'advanced-protocols',
    patternId: 'model-context-protocol',
    readSubtitle: 'Anthropic\'s MCP — the USB-C of AI agent tool connectivity.',
  }),
  ...conceptCapsules('acp', 'Agent Communication Protocol', {
    quizCategory: 'advanced-protocols',
    readSubtitle: 'Cisco\'s ACP for enterprise agent communication at scale.',
  }),
  ...conceptCapsules('mcp-a2a-integration', 'MCP × A2A Integration', {
    quizCategory: 'advanced-protocols',
    readSubtitle: 'Combine MCP and A2A for full-stack agent interoperability.',
  }),
  ...conceptCapsules('xyz-claw', 'XYZ-Claw Orchestration', {
    quizCategory: 'xyz-claw',
    patternId: 'orchestrator-worker',
    readSubtitle: 'Multi-agent orchestration with XYZ-Claw decomposition.',
    patternSubtitle: 'Explore the Orchestrator-Worker coordination pattern.',
  }),
  ...conceptCapsules('agent-integration', 'Integration Patterns', {
    quizCategory: 'agent-integration',
    readSubtitle: 'Connect agents to existing systems, APIs, and data pipelines.',
  }),
];

// ─── Track 5: Deploy & Operate ───────────────────────────────────────────────

const deployOperateCapsules: Capsule[] = [
  ...conceptCapsules('agent-deployment', 'Agent Deployment', {
    quizCategory: 'agent-deployment',
    readSubtitle: 'From dev laptop to production — containerization, scaling, rollback.',
  }),
  ...conceptCapsules('agent-ops', 'Agent Ops', {
    quizCategory: 'agent-ops',
    readSubtitle: 'Operational runbooks, incident response, and SLOs for agents.',
  }),
  ...conceptCapsules('agent-observability', 'Agent Observability', {
    quizCategory: 'agent-observability',
    readSubtitle: 'Traces, metrics, and logs — see what your agents are actually doing.',
  }),
  ...conceptCapsules('agent-cost-optimization', 'Cost Optimization', {
    quizCategory: 'agent-cost-optimization',
    readSubtitle: 'Cut agent costs without cutting capability — routing, caching, batching.',
  }),
  ...conceptCapsules('agent-evaluation', 'Agent Evaluation', {
    quizCategory: 'agent-evaluation',
    patternId: 'agent-evaluation',
    readSubtitle: 'Automated evaluation pipelines for continuous agent quality assurance.',
  }),
  ...conceptCapsules('agent-testing-benchmarks', 'Testing & Benchmarks', {
    quizCategory: 'agent-testing-benchmarks',
    readSubtitle: 'Unit tests, integration tests, and benchmarks for agent systems.',
  }),
];

// ─── Track 6: AI Product Leader ──────────────────────────────────────────────

const aiProductLeaderCapsules: Capsule[] = [
  ...conceptCapsules('product-management', 'AI Product Management', {
    quizCategory: 'business-use-cases',
    readSubtitle: 'Product thinking for AI — discovery, prioritization, and delivery.',
  }),
  ...conceptCapsules('ai-product-framework', '8-Pillar Framework', {
    quizCategory: 'business-use-cases',
    readSubtitle: 'A comprehensive framework for building AI products that ship.',
  }),
  ...conceptCapsules('strategy-portfolio-management', 'Strategy & Portfolio', {
    quizCategory: 'business-use-cases',
    readSubtitle: 'Manage a portfolio of AI initiatives — prioritize, sequence, fund.',
  }),
  ...conceptCapsules('agent-economics', 'Agent Economics', {
    quizCategory: 'agent-economics',
    readSubtitle: 'Cost models, ROI calculation, and economic moats for AI agents.',
  }),
  ...conceptCapsules('program-setup-north-star', 'Program Setup & North Star', {
    quizCategory: 'enterprise-playbook-concepts',
    readSubtitle: 'Align your organization around a shared AI North Star.',
  }),
  ...conceptCapsules('organizational-enablement', 'Organizational Enablement', {
    quizCategory: 'enterprise-playbook-concepts',
    readSubtitle: 'Build AI-native culture — hiring, training, and operating model.',
  }),
];

// ─── Track 7: Edge & Frontier ────────────────────────────────────────────────

const edgeFrontierCapsules: Capsule[] = [
  ...conceptCapsules('edge-agent', 'Edge Agent', {
    quizCategory: 'edge-agent',
    readSubtitle: 'Deploy agents on edge devices — latency, bandwidth, and autonomy.',
  }),
  ...conceptCapsules('agentic-robotics-integration', 'Agentic Robotics', {
    quizCategory: 'agentic-robotics',
    readSubtitle: 'When agents get bodies — perception, planning, and physical action.',
  }),
  ...conceptCapsules('quantum-ai-robotics', 'Quantum AI & Robotics', {
    quizCategory: 'agentic-robotics',
    readSubtitle: 'Quantum computing meets autonomous systems — emerging possibilities.',
  }),
  ...conceptCapsules('agent-learning', 'Agent Learning & Adaptation', {
    quizCategory: 'agent-learning',
    readSubtitle: 'Agents that improve themselves — online learning, reward shaping, meta-learning.',
  }),
  ...conceptCapsules('fine-tuning', 'Fine-Tuning Methods', {
    quizCategory: 'core-concepts',
    readSubtitle: 'SFT, DPO, RFT — choose the lowest intervention that proves lift.',
  }),
];

// ─── Master Capsule Registry ─────────────────────────────────────────────────

/** All capsules indexed by track ID */
export const CAPSULES_BY_TRACK: Record<string, Capsule[]> = {
  'zero-to-agent': zeroToAgentCapsules,
  'prompt-engineering-mastery': promptMasteryCapsules,
  'secure-and-govern': secureGovernCapsules,
  'multi-agent-architect': multiAgentCapsules,
  'deploy-and-operate': deployOperateCapsules,
  'ai-product-leader': aiProductLeaderCapsules,
  'edge-and-frontier': edgeFrontierCapsules,
};

/** Flat array of every capsule across all tracks */
export const ALL_CAPSULES: Capsule[] = Object.values(CAPSULES_BY_TRACK).flat();

/** Look up capsules for a given concept across all tracks */
export function getCapsulesForConcept(conceptId: string): Capsule[] {
  return ALL_CAPSULES.filter((c) => c.conceptId === conceptId);
}

/** Look up a specific capsule by its ID */
export function getCapsuleById(capsuleId: string): Capsule | undefined {
  return ALL_CAPSULES.find((c) => c.id === capsuleId);
}

/** Get capsules for a track, grouped by concept */
export function getCapsulesByTrackGrouped(trackId: string): Map<string, Capsule[]> {
  const capsules = CAPSULES_BY_TRACK[trackId] ?? [];
  const grouped = new Map<string, Capsule[]>();
  for (const cap of capsules) {
    const existing = grouped.get(cap.conceptId) ?? [];
    existing.push(cap);
    grouped.set(cap.conceptId, existing);
  }
  return grouped;
}
