/**
 * Cognitive Lab — Exercise content for all 7 paradigms
 * 5 exercises per paradigm = 35 total (Bio-Sync has stubs).
 */

import type {
  BurstGraftingExercise,
  VoidMappingExercise,
  BioSyncExercise,
  GlitchResolutionExercise,
  HemisphericWeavingExercise,
  GlyphCognitionExercise,
  EphemeralSparksExercise,
} from './types';

// ── Burst Grafting ───────────────────────────────────────────────────────────

export const BURST_GRAFTING_EXERCISES: BurstGraftingExercise[] = [
  {
    id: 'bg-rag',
    title: 'RAG Burst',
    description: '400ms multi-sensory encoding of Retrieval-Augmented Generation',
    paradigm: 'burst-grafting',
    estimatedSeconds: 15,
    conceptId: 'agentic-rag',
    content: {
      conceptLabel: 'RAG',
      nanoDef: 'Retrieve Augment',
      geometricShape: 'triangle',
      chordFrequencies: [261.6, 329.6, 392.0],
      colorFlash: '#3B82F6',
    },
  },
  {
    id: 'bg-mcp',
    title: 'MCP Burst',
    description: '400ms multi-sensory encoding of Model Context Protocol',
    paradigm: 'burst-grafting',
    estimatedSeconds: 15,
    conceptId: 'model-context-protocol',
    content: {
      conceptLabel: 'MCP',
      nanoDef: 'Tool Bridge',
      geometricShape: 'hexagon',
      chordFrequencies: [293.7, 370.0, 440.0],
      colorFlash: '#8B5CF6',
    },
  },
  {
    id: 'bg-embedding',
    title: 'Embedding Burst',
    description: '400ms multi-sensory encoding of vector embeddings',
    paradigm: 'burst-grafting',
    estimatedSeconds: 15,
    content: {
      conceptLabel: 'Embedding',
      nanoDef: 'Meaning Vector',
      geometricShape: 'diamond',
      chordFrequencies: [329.6, 415.3, 523.3],
      colorFlash: '#06B6D4',
    },
  },
  {
    id: 'bg-fine-tuning',
    title: 'Fine-Tuning Burst',
    description: '400ms multi-sensory encoding of model fine-tuning',
    paradigm: 'burst-grafting',
    estimatedSeconds: 15,
    conceptId: 'fine-tuning',
    content: {
      conceptLabel: 'Fine-Tuning',
      nanoDef: 'Weight Sculpt',
      geometricShape: 'circle',
      chordFrequencies: [349.2, 440.0, 523.3],
      colorFlash: '#F59E0B',
    },
  },
  {
    id: 'bg-agent-loop',
    title: 'Agent Loop Burst',
    description: '400ms multi-sensory encoding of the agent reasoning loop',
    paradigm: 'burst-grafting',
    estimatedSeconds: 15,
    conceptId: 'agent-architecture',
    content: {
      conceptLabel: 'Agent Loop',
      nanoDef: 'Sense Act',
      geometricShape: 'square',
      chordFrequencies: [392.0, 493.9, 587.3],
      colorFlash: '#10B981',
    },
  },
];

// ── Void Mapping ─────────────────────────────────────────────────────────────

export const VOID_MAPPING_EXERCISES: VoidMappingExercise[] = [
  {
    id: 'vm-agent-vs-chatbot',
    title: 'Agent ≠ Chatbot',
    description: 'Define "AI Agent" by what it is NOT',
    paradigm: 'void-mapping',
    estimatedSeconds: 30,
    conceptId: 'agent-architecture',
    content: {
      concept: 'AI Agent',
      antiFlashes: [
        'NOT a chat widget that only responds',
        'NOT a search engine that retrieves pages',
        'NOT a rule-based decision tree',
        'NOT a single API call with no memory',
        'NOT a human with a headset',
      ],
      definition: 'An autonomous system that perceives its environment, reasons about goals, and takes actions in a loop — persisting state across steps.',
      decoyDefinitions: [
        'A chatbot with a nicer interface',
        'An API endpoint that answers questions',
        'A script that automates mouse clicks',
      ],
    },
  },
  {
    id: 'vm-rag-vs-finetune',
    title: 'RAG ≠ Fine-Tuning',
    description: 'Define "RAG" by what it is NOT',
    paradigm: 'void-mapping',
    estimatedSeconds: 30,
    content: {
      concept: 'Retrieval-Augmented Generation',
      antiFlashes: [
        'NOT changing the model\'s weights',
        'NOT training on new data offline',
        'NOT memorizing all documents permanently',
        'NOT a vector database by itself',
        'NOT keyword search with extra steps',
      ],
      definition: 'Dynamically fetching relevant external documents at query time and injecting them into the model\'s context window to ground its response in facts.',
      decoyDefinitions: [
        'A special type of model training that uses retrieval',
        'Storing all knowledge inside the model weights',
        'A database query language for AI',
      ],
    },
  },
  {
    id: 'vm-prompt-vs-code',
    title: 'Prompting ≠ Programming',
    description: 'Define "Prompt Engineering" by what it is NOT',
    paradigm: 'void-mapping',
    estimatedSeconds: 30,
    content: {
      concept: 'Prompt Engineering',
      antiFlashes: [
        'NOT writing executable code',
        'NOT a deterministic algorithm',
        'NOT guaranteed to produce identical output',
        'NOT compiling instructions into binary',
        'NOT traditional software engineering',
      ],
      definition: 'Crafting natural language instructions that steer a probabilistic model toward desired behavior through context, examples, and constraints.',
      decoyDefinitions: [
        'Writing Python code that calls an API',
        'A new programming language for AI',
        'Debugging syntax errors in model output',
      ],
    },
  },
  {
    id: 'vm-vector-vs-relational',
    title: 'Vector DB ≠ SQL DB',
    description: 'Define "Vector Database" by what it is NOT',
    paradigm: 'void-mapping',
    estimatedSeconds: 30,
    content: {
      concept: 'Vector Database',
      antiFlashes: [
        'NOT tables with rows and columns',
        'NOT exact-match keyword lookups',
        'NOT SQL queries with JOINs',
        'NOT structured schema enforcement',
        'NOT storing data as human-readable text',
      ],
      definition: 'A database that stores high-dimensional numerical vectors and retrieves them by semantic similarity — finding concepts that mean similar things, not strings that match exactly.',
      decoyDefinitions: [
        'A NoSQL database that stores JSON documents',
        'A faster version of PostgreSQL',
        'A graph database for relationships',
      ],
    },
  },
  {
    id: 'vm-guardrails-vs-censorship',
    title: 'Guardrails ≠ Censorship',
    description: 'Define "AI Guardrails" by what they are NOT',
    paradigm: 'void-mapping',
    estimatedSeconds: 30,
    content: {
      concept: 'AI Guardrails',
      antiFlashes: [
        'NOT silencing inconvenient truths',
        'NOT blocking all controversial topics',
        'NOT limiting the model\'s intelligence',
        'NOT political filtering of outputs',
        'NOT making AI less useful',
      ],
      definition: 'Programmatic validators that check inputs and outputs against safety policies — preventing harmful actions while preserving helpful functionality.',
      decoyDefinitions: [
        'Content filters that block everything risky',
        'Management rules to limit AI adoption',
        'Legal disclaimers added to model output',
      ],
    },
  },
];

// ── Bio-Sync (Stubs — webcam deferred to Phase 2) ───────────────────────────

export const BIO_SYNC_EXERCISES: BioSyncExercise[] = [
  { id: 'bs-breathing', title: 'Breath-Paced RAG', description: 'Learn RAG concepts synced to your breathing rhythm', paradigm: 'bio-sync', estimatedSeconds: 60, content: { concept: 'RAG', targetBPM: 12 } },
  { id: 'bs-heartbeat', title: 'Heartbeat Embeddings', description: 'Embed concepts at cardiac rhythm', paradigm: 'bio-sync', estimatedSeconds: 60, content: { concept: 'Embeddings', targetBPM: 72 } },
  { id: 'bs-attention', title: 'Attention Breathing', description: 'Attention mechanism synced to breath', paradigm: 'bio-sync', estimatedSeconds: 60, content: { concept: 'Attention', targetBPM: 12 } },
  { id: 'bs-agent', title: 'Agent Loop Pulse', description: 'Agent loop synced to your pulse', paradigm: 'bio-sync', estimatedSeconds: 60, content: { concept: 'Agent Loop', targetBPM: 60 } },
  { id: 'bs-token', title: 'Token Rhythm', description: 'Token processing at your tempo', paradigm: 'bio-sync', estimatedSeconds: 60, content: { concept: 'Tokens', targetBPM: 80 } },
];

// ── Glitch Resolution ────────────────────────────────────────────────────────

export const GLITCH_RESOLUTION_EXERCISES: GlitchResolutionExercise[] = [
  {
    id: 'gr-stats-vs-creative',
    title: 'Stats vs. Creativity',
    description: 'Resolve: "AI is just statistics" vs "AI can be creative"',
    paradigm: 'glitch-resolution',
    estimatedSeconds: 45,
    content: {
      concept: 'AI Creativity',
      statementA: 'AI is just statistics — it computes probabilities over tokens and has no understanding.',
      statementB: 'AI can be genuinely creative — it combines concepts in novel ways that surprise even experts.',
      resolution: 'Statistical processes CAN produce emergent creativity. The mechanism is probabilistic, but the outcomes can be genuinely novel — just as human creativity emerges from neural electrochemistry.',
      explanation: 'This is a false dichotomy. "Just statistics" describes the mechanism, while "creative" describes the output. Water is "just molecules" but still drowns you. The level of description matters.',
    },
  },
  {
    id: 'gr-big-vs-small',
    title: 'Bigger vs. Smaller Models',
    description: 'Resolve: "Bigger models are always better" vs "Small models beat large ones"',
    paradigm: 'glitch-resolution',
    estimatedSeconds: 45,
    content: {
      concept: 'Model Scaling',
      statementA: 'Bigger models are always better — more parameters means more capability and fewer errors.',
      statementB: 'Smaller, specialized models frequently outperform larger general models on domain-specific tasks.',
      resolution: 'Model quality is task-dependent. Large models have broader capability, but distilled or fine-tuned small models can surpass them in narrow domains — at a fraction of the cost and latency.',
      explanation: 'The key insight is that "better" depends on your evaluation criteria. For general reasoning, scale helps. For specific production tasks, a well-tuned 7B model often beats a general 70B model.',
    },
  },
  {
    id: 'gr-autonomous-vs-oversight',
    title: 'Autonomy vs. Oversight',
    description: 'Resolve: "Agents should be fully autonomous" vs "Agents need human oversight"',
    paradigm: 'glitch-resolution',
    estimatedSeconds: 45,
    content: {
      concept: 'Agent Autonomy',
      statementA: 'Agents should be fully autonomous — the whole point is removing human bottlenecks from workflows.',
      statementB: 'Agents need tight human oversight — an unsupervised agent is an accident waiting to happen.',
      resolution: 'Autonomy should be graduated. Start with human-in-the-loop, prove reliability on low-stakes tasks, then progressively expand the agent\'s authority boundary. Full autonomy is earned, not assumed.',
      explanation: 'This maps to the "trust calibration" principle. Neither extreme is correct. The answer is a trust escalation ladder: observe → approve → audit → autonomous — based on demonstrated competence.',
    },
  },
  {
    id: 'gr-rag-hallucination',
    title: 'RAG vs. Hallucinations',
    description: 'Resolve: "RAG eliminates hallucinations" vs "RAG introduces new errors"',
    paradigm: 'glitch-resolution',
    estimatedSeconds: 45,
    content: {
      concept: 'RAG Reliability',
      statementA: 'RAG eliminates hallucinations by grounding the model in factual documents — problem solved.',
      statementB: 'RAG introduces new failure modes: wrong retrieval, context overflow, stale data, and faithfulness errors.',
      resolution: 'RAG reduces hallucination probability but creates new error categories. The net effect depends on retrieval quality, chunking strategy, and whether the model actually follows the retrieved context.',
      explanation: 'RAG shifts the error distribution rather than eliminating it. You trade "making things up" for "retrieving the wrong things" or "ignoring what you retrieved." Evaluation must cover both.',
    },
  },
  {
    id: 'gr-replace-vs-amplify',
    title: 'Replace vs. Amplify',
    description: 'Resolve: "AI will replace developers" vs "AI amplifies developer productivity"',
    paradigm: 'glitch-resolution',
    estimatedSeconds: 45,
    content: {
      concept: 'AI & Developer Roles',
      statementA: 'AI will replace developers — code generation is already automating away most programming tasks.',
      statementB: 'AI amplifies developers — it handles boilerplate while humans focus on architecture, design, and judgment.',
      resolution: 'AI replaces tasks, not roles. The developer role evolves: less typing, more thinking. The developers who thrive will be those who learn to direct AI effectively — becoming architects of AI-assisted systems.',
      explanation: 'Every wave of automation has shifted work from execution to judgment. AI coding tools eliminate routine work but increase demand for people who can verify, integrate, and architect AI outputs.',
    },
  },
];

// ── Hemispheric Weaving ──────────────────────────────────────────────────────

export const HEMISPHERIC_WEAVING_EXERCISES: HemisphericWeavingExercise[] = [
  {
    id: 'hw-attention',
    title: 'Attention Mechanism',
    description: 'Hemispheric split: metaphor ↔ technical definition of attention',
    paradigm: 'hemispheric-weaving',
    estimatedSeconds: 30,
    content: {
      concept: 'Attention Mechanism',
      leftChannel: 'A spotlight sweeping a crowded room, brightening the faces that matter to your question and dimming the rest to shadow.',
      rightChannel: 'Scaled dot-product of Query, Key, and Value matrices — softmax(QK^T/√d)V — assigning learned weights to each token\'s contribution.',
      synthesis: 'Attention is the model\'s way of deciding what to focus on. The math creates the spotlight; the spotlight creates understanding.',
    },
  },
  {
    id: 'hw-embedding',
    title: 'Embedding Space',
    description: 'Hemispheric split: metaphor ↔ technical definition of embeddings',
    paradigm: 'hemispheric-weaving',
    estimatedSeconds: 30,
    content: {
      concept: 'Embedding Space',
      leftChannel: 'A galaxy where meaning creates gravity — similar ideas orbit close together, while opposites drift to distant arms of the spiral.',
      rightChannel: 'A high-dimensional vector space where tokens are projected to dense float arrays. Cosine similarity between vectors measures semantic closeness.',
      synthesis: 'Embeddings convert language into geometry. Words that mean similar things end up near each other — making "closeness in space" equal "closeness in meaning."',
    },
  },
  {
    id: 'hw-agent-arch',
    title: 'Agent Architecture',
    description: 'Hemispheric split: metaphor ↔ technical definition of agents',
    paradigm: 'hemispheric-weaving',
    estimatedSeconds: 30,
    conceptId: 'agent-architecture',
    content: {
      concept: 'Agent Architecture',
      leftChannel: 'A mind that perceives the world through sensors, deliberates in an inner theater, then reaches out with hands to change reality — in an endless loop.',
      rightChannel: 'An observe → plan → act loop: the agent reads state, calls an LLM for reasoning, selects tools, executes actions, and appends results to its scratchpad.',
      synthesis: 'An agent is a reasoning loop with hands. The architecture gives the LLM the ability to take real actions — turning passive knowledge into active capability.',
    },
  },
  {
    id: 'hw-guardrails',
    title: 'Guardrails',
    description: 'Hemispheric split: metaphor ↔ technical definition of guardrails',
    paradigm: 'hemispheric-weaving',
    estimatedSeconds: 30,
    content: {
      concept: 'AI Guardrails',
      leftChannel: 'Bumper rails on a bowling lane — they don\'t change how you throw the ball, but they prevent gutter balls from ruining the game.',
      rightChannel: 'Input/output validator chains: content classifiers, PII detectors, SQL injection filters, and policy-compliance checks executed before and after each LLM call.',
      synthesis: 'Guardrails are safety validators wrapping the model. They don\'t limit intelligence — they channel it safely, catching harmful patterns without blocking useful ones.',
    },
  },
  {
    id: 'hw-token',
    title: 'Tokens',
    description: 'Hemispheric split: metaphor ↔ technical definition of tokens',
    paradigm: 'hemispheric-weaving',
    estimatedSeconds: 30,
    content: {
      concept: 'Tokens',
      leftChannel: 'A syllable the model can taste — each word broken into bite-sized pieces that the model chews one at a time, each flavor shaping the next.',
      rightChannel: 'Sub-word units from BPE tokenization. "understanding" → ["under", "stand", "ing"]. Each token has an integer ID mapping to a position in the vocabulary.',
      synthesis: 'Tokens are how models see text — not as whole words, but as learned sub-word chunks. Everything the model reads and writes passes through this atomic layer.',
    },
  },
];

// ── Glyph Cognition ──────────────────────────────────────────────────────────

export const GLYPH_COGNITION_EXERCISES: GlyphCognitionExercise[] = [
  {
    id: 'gc-agent-loop',
    title: 'Glyph: Agent Loop',
    description: 'Encode the agent loop symbol into memory',
    paradigm: 'glyph-cognition',
    estimatedSeconds: 20,
    content: {
      glyphId: 'agent-loop',
      concept: 'Agent Loop',
      seedSyllable: 'AH',
      recallPrompt: 'What does the concentric circle glyph represent?',
      correctAnswer: 'The observe-plan-act cycle of an autonomous agent',
    },
  },
  {
    id: 'gc-embedding',
    title: 'Glyph: Embedding',
    description: 'Encode the embedding symbol into memory',
    paradigm: 'glyph-cognition',
    estimatedSeconds: 20,
    content: {
      glyphId: 'embedding',
      concept: 'Embedding',
      seedSyllable: 'EM',
      recallPrompt: 'What does the crystal lattice glyph represent?',
      correctAnswer: 'Vector embeddings — meaning compressed into geometric space',
    },
  },
  {
    id: 'gc-guardrail',
    title: 'Glyph: Guardrail',
    description: 'Encode the guardrail symbol into memory',
    paradigm: 'glyph-cognition',
    estimatedSeconds: 20,
    content: {
      glyphId: 'guardrail',
      concept: 'AI Guardrails',
      seedSyllable: 'GA',
      recallPrompt: 'What does the shield-with-checkmark glyph represent?',
      correctAnswer: 'Safety guardrails that validate AI inputs and outputs',
    },
  },
  {
    id: 'gc-attention',
    title: 'Glyph: Attention',
    description: 'Encode the attention symbol into memory',
    paradigm: 'glyph-cognition',
    estimatedSeconds: 20,
    content: {
      glyphId: 'attention',
      concept: 'Attention Mechanism',
      seedSyllable: 'AT',
      recallPrompt: 'What does the concentric rings glyph with inner focus represent?',
      correctAnswer: 'The attention mechanism — focusing on relevant tokens',
    },
  },
  {
    id: 'gc-chain-of-thought',
    title: 'Glyph: Chain of Thought',
    description: 'Encode the chain-of-thought symbol into memory',
    paradigm: 'glyph-cognition',
    estimatedSeconds: 20,
    content: {
      glyphId: 'chain-of-thought',
      concept: 'Chain of Thought',
      seedSyllable: 'CH',
      recallPrompt: 'What does the connected nodes glyph represent?',
      correctAnswer: 'Chain-of-thought reasoning — making thinking steps visible',
    },
  },
];

// ── Ephemeral Sparks ─────────────────────────────────────────────────────────

export const EPHEMERAL_SPARKS_EXERCISES: EphemeralSparksExercise[] = [
  {
    id: 'es-context-window',
    title: 'Context Window Flash',
    description: 'One-shot: memorize the context window definition before it burns away',
    paradigm: 'ephemeral-sparks',
    estimatedSeconds: 20,
    content: {
      concept: 'Context Window',
      flashContent: 'The context window is the maximum number of tokens an LLM can process in a single call — both input and output combined. Exceeding it causes truncation of earlier content. GPT-4 Turbo: 128K tokens. Claude 3: 200K tokens.',
      decayDurationMs: 4000,
      recallPrompt: 'What happens when you exceed the context window limit?',
      correctAnswer: 'Earlier content gets truncated — the model loses access to the beginning of the conversation',
    },
  },
  {
    id: 'es-temperature',
    title: 'Temperature Flash',
    description: 'One-shot: memorize the temperature parameter before it burns away',
    paradigm: 'ephemeral-sparks',
    estimatedSeconds: 20,
    content: {
      concept: 'Temperature',
      flashContent: 'Temperature controls randomness in token sampling. T=0: greedy/deterministic, picks highest probability. T=0.7: balanced creativity. T=1.0+: wild, surprising, potentially incoherent. It scales the logits before softmax.',
      decayDurationMs: 4000,
      recallPrompt: 'What does temperature=0 mean for model output?',
      correctAnswer: 'Greedy/deterministic — the model always picks the highest probability token',
    },
  },
  {
    id: 'es-hallucination',
    title: 'Hallucination Flash',
    description: 'One-shot: memorize the hallucination typology before it burns away',
    paradigm: 'ephemeral-sparks',
    estimatedSeconds: 20,
    content: {
      concept: 'Hallucination',
      flashContent: 'Three types: INTRINSIC (contradicts source material), EXTRINSIC (fabricates info not in source), FAITHFULNESS (ignores retrieved context). RAG reduces extrinsic but can increase faithfulness errors.',
      decayDurationMs: 4000,
      recallPrompt: 'Name the three types of LLM hallucination.',
      correctAnswer: 'Intrinsic (contradicts source), Extrinsic (fabricates), Faithfulness (ignores retrieved context)',
    },
  },
  {
    id: 'es-rlhf',
    title: 'RLHF Flash',
    description: 'One-shot: memorize the RLHF pipeline before it burns away',
    paradigm: 'ephemeral-sparks',
    estimatedSeconds: 20,
    content: {
      concept: 'RLHF',
      flashContent: 'RLHF: Reinforcement Learning from Human Feedback. Three stages: 1) Train a reward model on human preference rankings. 2) Use PPO to optimize the language model against the reward model. 3) Iterate with fresh human feedback to correct reward model drift.',
      decayDurationMs: 4000,
      recallPrompt: 'What are the three stages of the RLHF pipeline?',
      correctAnswer: 'Train reward model on human preferences → Optimize LM with PPO against reward model → Iterate with fresh human feedback',
    },
  },
  {
    id: 'es-tool-use',
    title: 'Tool Use Flash',
    description: 'One-shot: memorize the tool-use protocol before it burns away',
    paradigm: 'ephemeral-sparks',
    estimatedSeconds: 20,
    content: {
      concept: 'Tool Use',
      flashContent: 'Tool use protocol: 1) Model receives tool schemas as JSON. 2) Model emits a tool_call with name + arguments. 3) Runtime executes the tool. 4) Tool result is appended to context. 5) Model generates final response incorporating the result.',
      decayDurationMs: 4000,
      recallPrompt: 'What are the 5 steps of the LLM tool use protocol?',
      correctAnswer: 'Receive schemas → Emit tool_call → Runtime executes → Result appended to context → Model generates final response',
    },
  },
];
