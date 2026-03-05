/**
 * Project Track Definitions for Phase 2 — Practice & Proof-of-Skill
 */

export type CheckType = 'quiz' | 'code' | 'reflection';
export type TrackDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  checkType: CheckType;
  requiredScore: number;
}

export interface ProjectTrack {
  id: string;
  title: string;
  description: string;
  difficulty: TrackDifficulty;
  estimatedHours: number;
  milestones: Milestone[];
}

export const PROJECT_TRACKS: ProjectTrack[] = [
  {
    id: 'support-bot-builder',
    title: 'Support Bot Builder',
    description: 'Build a customer-support chatbot that routes queries, retrieves docs, and escalates to humans.',
    difficulty: 'beginner',
    estimatedHours: 12,
    milestones: [
      { id: 'sbb-1', title: 'Design the conversation flow', description: 'Map user intents, fallback paths, and escalation triggers.', checkType: 'reflection', requiredScore: 70 },
      { id: 'sbb-2', title: 'Implement intent classifier', description: 'Write a keyword-based intent classifier that routes to the correct handler.', checkType: 'code', requiredScore: 80 },
      { id: 'sbb-3', title: 'Add document retrieval', description: 'Connect FAQ docs so the bot can answer common questions with sources.', checkType: 'code', requiredScore: 80 },
      { id: 'sbb-4', title: 'Human escalation & guardrails', description: 'Add safety checks and a handoff mechanism when confidence is low.', checkType: 'quiz', requiredScore: 75 },
      { id: 'sbb-5', title: 'End-to-end demo', description: 'Run a live conversation and reflect on what the bot handled well.', checkType: 'reflection', requiredScore: 70 },
    ],
  },
  {
    id: 'rag-tutor-pipeline',
    title: 'RAG Tutor Pipeline',
    description: 'Create a retrieval-augmented generation tutor that answers questions from your own study materials.',
    difficulty: 'intermediate',
    estimatedHours: 18,
    milestones: [
      { id: 'rtp-1', title: 'Chunk & embed documents', description: 'Split markdown notes into chunks and generate embeddings with a local model.', checkType: 'code', requiredScore: 80 },
      { id: 'rtp-2', title: 'Build a vector search index', description: 'Store embeddings and implement cosine-similarity retrieval.', checkType: 'code', requiredScore: 85 },
      { id: 'rtp-3', title: 'Prompt engineering for tutoring', description: 'Craft system prompts that make the LLM teach rather than just answer.', checkType: 'reflection', requiredScore: 70 },
      { id: 'rtp-4', title: 'Evaluate retrieval quality', description: 'Quiz on precision, recall, and hallucination detection in RAG systems.', checkType: 'quiz', requiredScore: 80 },
      { id: 'rtp-5', title: 'Add citation grounding', description: 'Ensure every answer cites the source chunk so learners can verify.', checkType: 'code', requiredScore: 85 },
    ],
  },
  {
    id: 'commerce-agent',
    title: 'Commerce Agent',
    description: 'Design an agent that browses a product catalogue, compares items, and recommends purchases.',
    difficulty: 'advanced',
    estimatedHours: 24,
    milestones: [
      { id: 'ca-1', title: 'Model the product domain', description: 'Define product, cart, and order schemas the agent will operate on.', checkType: 'code', requiredScore: 80 },
      { id: 'ca-2', title: 'Implement tool-use actions', description: 'Create search, compare, and add-to-cart tools the agent can invoke.', checkType: 'code', requiredScore: 85 },
      { id: 'ca-3', title: 'ReAct reasoning loop', description: 'Build a Reason-Act loop that plans multi-step shopping tasks.', checkType: 'code', requiredScore: 85 },
      { id: 'ca-4', title: 'Safety & budget constraints', description: 'Quiz on agentic guardrails: budget caps, PII handling, and confirmation gates.', checkType: 'quiz', requiredScore: 80 },
      { id: 'ca-5', title: 'Observability & tracing', description: 'Add structured logging so every agent decision can be audited.', checkType: 'code', requiredScore: 80 },
      { id: 'ca-6', title: 'Capstone reflection', description: 'Write a post-mortem on what went well and what you would change.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Agentic RAG ────────────────────────────────────────────────────────────
  {
    id: 'agentic-rag-research-assistant',
    title: 'Agentic RAG Research Assistant',
    description: 'Build an agent that plans multi-hop queries, retrieves documents, verifies facts, and synthesises grounded answers.',
    difficulty: 'intermediate',
    estimatedHours: 20,
    milestones: [
      { id: 'arr-1', title: 'Design the query planner', description: 'Decompose a complex user question into sub-queries the retriever can answer independently.', checkType: 'reflection', requiredScore: 70 },
      { id: 'arr-2', title: 'Build adaptive retrieval', description: 'Implement a retriever that dynamically picks vector search vs. keyword search per sub-query.', checkType: 'code', requiredScore: 80 },
      { id: 'arr-3', title: 'Add fact-verification loop', description: 'Create a self-check step that compares generated claims against the retrieved chunks.', checkType: 'code', requiredScore: 85 },
      { id: 'arr-4', title: 'Citation grounding & source cards', description: 'Attach inline citations so every claim links back to the source document and chunk.', checkType: 'code', requiredScore: 85 },
      { id: 'arr-5', title: 'Evaluate retrieval & answer quality', description: 'Quiz on precision, recall, faithfulness, and relevancy metrics for agentic RAG.', checkType: 'quiz', requiredScore: 80 },
      { id: 'arr-6', title: 'Capstone: research report generation', description: 'Run the full pipeline on a new topic and reflect on retrieval gaps and hallucination rates.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Knowledge & Context Graph ──────────────────────────────────────────────
  {
    id: 'knowledge-context-graph',
    title: 'Knowledge & Context Graph',
    description: 'Construct a knowledge graph from unstructured documents and let an agent reason over entity relationships.',
    difficulty: 'advanced',
    estimatedHours: 26,
    milestones: [
      { id: 'kcg-1', title: 'Entity & relation extraction', description: 'Use an LLM to extract named entities and relationships from a document corpus.', checkType: 'code', requiredScore: 80 },
      { id: 'kcg-2', title: 'Build the graph store', description: 'Store triples (subject → predicate → object) in a graph DB or in-memory adjacency structure.', checkType: 'code', requiredScore: 85 },
      { id: 'kcg-3', title: 'Graph-aware context window', description: 'Implement context engineering that injects relevant subgraph context into the LLM prompt.', checkType: 'code', requiredScore: 85 },
      { id: 'kcg-4', title: 'Multi-hop graph traversal', description: 'Enable the agent to follow relationship chains to answer questions requiring 2–3 reasoning hops.', checkType: 'code', requiredScore: 85 },
      { id: 'kcg-5', title: 'Quiz: graph reasoning patterns', description: 'Test your understanding of knowledge graphs, ontologies, and context engineering trade-offs.', checkType: 'quiz', requiredScore: 80 },
      { id: 'kcg-6', title: 'Visualise & explain the graph', description: 'Render the graph and write a reflection on what the agent can and cannot reason about.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Multi-Agent Orchestration ──────────────────────────────────────────────
  {
    id: 'multi-agent-task-force',
    title: 'Multi-Agent Task Force',
    description: 'Orchestrate a team of specialised agents — planner, researcher, coder, reviewer — to collaboratively solve tasks.',
    difficulty: 'advanced',
    estimatedHours: 28,
    milestones: [
      { id: 'mat-1', title: 'Define agent roles & capabilities', description: 'Design system prompts and tool-sets for each specialist agent in the team.', checkType: 'reflection', requiredScore: 70 },
      { id: 'mat-2', title: 'Build the orchestrator', description: 'Implement a coordinator that decomposes tasks and delegates sub-tasks to the right agent.', checkType: 'code', requiredScore: 85 },
      { id: 'mat-3', title: 'Implement handoff protocol', description: 'Create a structured message format so agents can pass context, results, and status to each other.', checkType: 'code', requiredScore: 85 },
      { id: 'mat-4', title: 'Add conflict resolution', description: 'Handle disagreements between agents by implementing a voting or escalation mechanism.', checkType: 'code', requiredScore: 80 },
      { id: 'mat-5', title: 'Quiz: multi-agent patterns', description: 'Test knowledge of orchestrator–worker, debate, consensus, and fan-out/fan-in patterns.', checkType: 'quiz', requiredScore: 80 },
      { id: 'mat-6', title: 'Observability dashboard', description: 'Build a trace view that shows the full conversation flow across all agents.', checkType: 'code', requiredScore: 80 },
      { id: 'mat-7', title: 'Capstone reflection', description: 'Reflect on coordination overhead, token costs, and where single-agent would have sufficed.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── MCP Tool-Server Integration ────────────────────────────────────────────
  {
    id: 'mcp-tool-server',
    title: 'MCP Tool-Server Integration',
    description: 'Build a Model Context Protocol server that exposes real tools (file system, database, API) to any MCP-compatible agent.',
    difficulty: 'intermediate',
    estimatedHours: 16,
    milestones: [
      { id: 'mts-1', title: 'Scaffold the MCP server', description: 'Set up a TypeScript or Python MCP server with the official SDK and register a health tool.', checkType: 'code', requiredScore: 80 },
      { id: 'mts-2', title: 'Implement read & write tools', description: 'Expose file-read, file-write, and list-directory as MCP tool definitions with JSON schemas.', checkType: 'code', requiredScore: 85 },
      { id: 'mts-3', title: 'Add a database query tool', description: 'Register a tool that accepts SQL (read-only) and returns structured results.', checkType: 'code', requiredScore: 85 },
      { id: 'mts-4', title: 'Security & permission scoping', description: 'Quiz on sandboxing, allowlists, input validation, and least-privilege for MCP tools.', checkType: 'quiz', requiredScore: 80 },
      { id: 'mts-5', title: 'End-to-end agent test', description: 'Connect your MCP server to an agent host and complete a multi-step task using the tools.', checkType: 'code', requiredScore: 80 },
      { id: 'mts-6', title: 'Reflection: protocol trade-offs', description: 'Reflect on MCP vs direct function-calling and when each approach is appropriate.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Agent Red-Teaming & Safety Lab ─────────────────────────────────────────
  {
    id: 'agent-safety-lab',
    title: 'Agent Red-Teaming & Safety Lab',
    description: 'Systematically probe an agent for prompt injection, jailbreaks, and unsafe behaviour — then harden it.',
    difficulty: 'intermediate',
    estimatedHours: 14,
    milestones: [
      { id: 'asl-1', title: 'Threat-model the target agent', description: 'Identify attack surfaces: system prompt leakage, tool misuse, data exfiltration, and goal hijacking.', checkType: 'reflection', requiredScore: 70 },
      { id: 'asl-2', title: 'Craft adversarial test cases', description: 'Write 10 prompt-injection and jailbreak attempts covering direct, indirect, and multi-turn attacks.', checkType: 'code', requiredScore: 80 },
      { id: 'asl-3', title: 'Run automated red-team sweep', description: 'Build a harness that fires attack prompts and measures the Attack Success Rate (ASR).', checkType: 'code', requiredScore: 85 },
      { id: 'asl-4', title: 'Implement guardrails', description: 'Add input/output filters, system-prompt anchoring, and tool-call confirmation gates.', checkType: 'code', requiredScore: 85 },
      { id: 'asl-5', title: 'Quiz: AI safety principles', description: 'Test knowledge of OWASP Top 10 for LLMs, responsible AI governance, and defence-in-depth.', checkType: 'quiz', requiredScore: 80 },
      { id: 'asl-6', title: 'Before & after report', description: 'Compare ASR before and after hardening and reflect on remaining risks.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Observability & EvalOps Pipeline ───────────────────────────────────────
  {
    id: 'evalops-pipeline',
    title: 'Observability & EvalOps Pipeline',
    description: 'Instrument an agent with structured traces, build evaluation datasets, and set up regression testing for quality.',
    difficulty: 'intermediate',
    estimatedHours: 18,
    milestones: [
      { id: 'eop-1', title: 'Add structured tracing', description: 'Instrument every LLM call, tool invocation, and decision point with span-based traces.', checkType: 'code', requiredScore: 80 },
      { id: 'eop-2', title: 'Build an evaluation dataset', description: 'Curate 20+ input/expected-output pairs covering happy paths and edge cases.', checkType: 'code', requiredScore: 80 },
      { id: 'eop-3', title: 'Implement LLM-as-judge scoring', description: 'Create a grader prompt that scores agent responses on accuracy, helpfulness, and safety.', checkType: 'code', requiredScore: 85 },
      { id: 'eop-4', title: 'Set up regression harness', description: 'Wire the eval dataset into a CI-friendly test runner that fails on quality regressions.', checkType: 'code', requiredScore: 85 },
      { id: 'eop-5', title: 'Quiz: evaluation metrics', description: 'Test understanding of faithfulness, relevancy, toxicity, latency P95, and cost-per-query.', checkType: 'quiz', requiredScore: 80 },
      { id: 'eop-6', title: 'Reflection: eval-driven iteration', description: 'Reflect on how evaluation results guided prompt and architecture changes.', checkType: 'reflection', requiredScore: 70 },
    ],
  },

  // ── Edge Agent (offline-capable) ───────────────────────────────────────────
  {
    id: 'edge-agent-offline',
    title: 'Edge Agent — Offline-Capable Assistant',
    description: 'Deploy a lightweight agent that runs on-device with a small language model, local tools, and sync-when-connected.',
    difficulty: 'advanced',
    estimatedHours: 22,
    milestones: [
      { id: 'eao-1', title: 'Select & quantise a small model', description: 'Choose a ≤ 3B parameter model and quantise it to 4-bit for edge deployment.', checkType: 'code', requiredScore: 80 },
      { id: 'eao-2', title: 'Build local tool integration', description: 'Expose on-device tools (file access, local DB, sensor data) the model can call.', checkType: 'code', requiredScore: 85 },
      { id: 'eao-3', title: 'Implement offline queue', description: 'Queue user requests and tool results when connectivity is unavailable; sync when back online.', checkType: 'code', requiredScore: 85 },
      { id: 'eao-4', title: 'Quiz: edge AI trade-offs', description: 'Test knowledge of model distillation, latency budgets, memory limits, and privacy benefits.', checkType: 'quiz', requiredScore: 80 },
      { id: 'eao-5', title: 'Benchmark latency & quality', description: 'Measure tokens-per-second, first-token latency, and answer quality vs. a cloud-hosted baseline.', checkType: 'code', requiredScore: 80 },
      { id: 'eao-6', title: 'Capstone reflection', description: 'Reflect on where edge agents shine and where cloud fallback is still essential.', checkType: 'reflection', requiredScore: 70 },
    ],
  },
];

export function getTrackById(id: string): ProjectTrack | undefined {
  return PROJECT_TRACKS.find(t => t.id === id);
}
