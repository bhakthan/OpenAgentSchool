/**
 * The Forge — Discipline & exercise content definitions
 *
 * 4 disciplines × 4 exercises each = 16 exercises total.
 * Each exercise maps to real pedagogical content aligned with existing OAS concepts.
 */

import type {
  ForgeDiscipline,
  SocraticDefenseExercise,
  PromptAutopsyExercise,
  EpistemicGymExercise,
  TrustCalibrationExercise,
} from './types';

// ── Socratic Defense ─────────────────────────────────────────────────────────

const socraticExercises: SocraticDefenseExercise[] = [
  {
    id: 'sd-rag-architecture',
    title: 'Defend Your RAG Pipeline',
    description: 'Propose a retrieval-augmented generation architecture, then defend every design choice under Socratic examination.',
    discipline: 'socratic-defense',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    aiRequired: true,
    conceptId: 'agentic-rag',
    content: {
      topic: 'RAG Pipeline Architecture',
      context: 'You are designing a RAG pipeline for a legal document search system. Propose your architecture, then defend it.',
      systemPromptForExaminer: `You are a rigorous Socratic examiner testing a student's understanding of RAG architectures. Ask probing follow-up questions that:
1. Challenge assumptions about chunking strategy and embedding model choice
2. Probe for hallucination awareness — how does the student verify retrieval quality?
3. Test understanding of failure modes — what happens when context is irrelevant?
4. Push on scalability and cost trade-offs
Keep questions focused, one at a time. Be respectful but intellectually demanding.`,
      fallbackQuestions: [
        'What chunking strategy did you choose and why? What are its failure modes?',
        'How do you verify the retrieved context is actually relevant before generating?',
        'What happens when the model hallucinates despite having correct context?',
        'How would your architecture handle 10× the document volume?',
        'What\'s your evaluation strategy for retrieval quality vs generation quality?',
      ],
      rubric: {
        criteria: [
          'Demonstrates awareness of chunking trade-offs',
          'Addresses hallucination mitigation explicitly',
          'Considers failure modes and edge cases',
          'Shows cost/performance reasoning',
          'Can distinguish retrieval quality from generation quality',
        ],
        maxScore: 25,
      },
    },
  },
  {
    id: 'sd-prompt-engineering',
    title: 'Defend Your Prompt Strategy',
    description: 'Present a complex system prompt, then justify every instruction under cross-examination.',
    discipline: 'socratic-defense',
    difficulty: 'beginner',
    estimatedMinutes: 12,
    aiRequired: true,
    conceptId: 'prompt-engineering',
    content: {
      topic: 'System Prompt Design',
      context: 'You are writing a system prompt for a customer support chatbot that handles refund requests. Present your prompt, then defend it.',
      systemPromptForExaminer: `You are a Socratic examiner testing a student's understanding of prompt engineering. Ask probing questions that:
1. Challenge the order and priority of instructions
2. Probe for adversarial robustness — could a user jailbreak this prompt?
3. Test understanding of token budget and context window constraints
4. Push on measurability — how would you know the prompt is working?
Be pointed but constructive.`,
      fallbackQuestions: [
        'Why did you order the instructions this way? What happens if you reorder them?',
        'How would a malicious user try to override your system instructions?',
        'What are you trading off by making the prompt this long?',
        'How would you measure whether this prompt actually improves refund handling?',
        'What assumptions about the model\'s behavior are baked into this prompt?',
      ],
      rubric: {
        criteria: [
          'Shows deliberate instruction ordering rationale',
          'Addresses prompt injection / jailbreak risks',
          'Understands token budget implications',
          'Can articulate evaluation criteria for prompt quality',
          'Aware of model-specific prompt behavior differences',
        ],
        maxScore: 25,
      },
    },
  },
  {
    id: 'sd-agent-architecture',
    title: 'Defend Your Agent Design',
    description: 'Propose a multi-agent architecture for a complex task, then defend the delegation and communication strategy.',
    discipline: 'socratic-defense',
    difficulty: 'advanced',
    estimatedMinutes: 20,
    aiRequired: true,
    conceptId: 'multi-agent',
    content: {
      topic: 'Multi-Agent System Design',
      context: 'You are designing a multi-agent system for automated code review. The system should analyze PRs for bugs, style, security, and performance. Propose your agent architecture.',
      systemPromptForExaminer: `You are a Socratic examiner probing a student's multi-agent architecture. Ask questions that:
1. Challenge the decomposition — why these agent boundaries?
2. Probe coordination failure modes — what if agents disagree?
3. Test for single points of failure and cascading errors
4. Push on observability — how do you debug a multi-agent failure?
5. Question the autonomy level of each agent
One question at a time. Be intellectually rigorous.`,
      fallbackQuestions: [
        'Why did you choose this specific agent decomposition? What alternatives did you consider?',
        'What happens when the security agent and the performance agent give contradictory advice?',
        'How do you prevent a single failing agent from blocking the entire pipeline?',
        'Walk me through how you would debug a false positive from one of these agents.',
        'What is the autonomy level of each agent, and how did you decide?',
      ],
      rubric: {
        criteria: [
          'Justifies agent boundaries with clear reasoning',
          'Addresses inter-agent conflict resolution',
          'Considers failure isolation and resilience',
          'Demonstrates observability and debugging strategy',
          'Articulates autonomy levels and escalation paths',
        ],
        maxScore: 25,
      },
    },
  },
  {
    id: 'sd-evaluation-strategy',
    title: 'Defend Your Eval Framework',
    description: 'Present an LLM evaluation strategy, then defend your metrics and methodology under scrutiny.',
    discipline: 'socratic-defense',
    difficulty: 'advanced',
    estimatedMinutes: 18,
    aiRequired: true,
    conceptId: 'evaluation',
    content: {
      topic: 'LLM Evaluation Strategy',
      context: 'You are evaluating an LLM-powered summarization system for medical research papers. Present your evaluation framework.',
      systemPromptForExaminer: `You are a Socratic examiner testing evaluation methodology. Ask questions that:
1. Challenge metric choices — why these metrics and not others?
2. Probe for Goodhart's Law risks — could optimizing these metrics produce bad outcomes?
3. Test understanding of human eval vs automated eval trade-offs
4. Push on statistical validity — sample size, confidence intervals, bias
5. Question the ground truth — who decides what a \'good\' summary is?
One question at a time.`,
      fallbackQuestions: [
        'Why did you choose these specific metrics? What do they fail to capture?',
        'If you optimize purely for your chosen metrics, what could go wrong?',
        'How do you handle disagreement between human evaluators?',
        'What sample size do you need for statistically meaningful results?',
        'Who defines the ground truth for \'good\' medical summaries, and how do you validate that?',
      ],
      rubric: {
        criteria: [
          'Selects metrics with clear rationale and acknowledged limitations',
          'Demonstrates awareness of Goodhart\'s Law / metric gaming',
          'Balances human and automated evaluation appropriately',
          'Considers statistical rigor and sample adequacy',
          'Questions and validates ground truth sources',
        ],
        maxScore: 25,
      },
    },
  },
];

// ── Prompt Autopsies ─────────────────────────────────────────────────────────

const autopsyExercises: PromptAutopsyExercise[] = [
  {
    id: 'pa-security-audit',
    title: 'Autopsy: Flawed Security Audit',
    description: 'An AI generated a security analysis with critical errors. Find every mistake before it ships.',
    discipline: 'prompt-autopsies',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    aiRequired: false,
    conceptId: 'agent-security',
    content: {
      flawedOutput: `## Security Audit Report: E-Commerce API

### Findings

1. **Authentication**: The API uses JWT tokens with HS256 signing. This is industry standard and secure. ✅

2. **SQL Injection**: The search endpoint uses parameterized queries. No risk. ✅

3. **Rate Limiting**: The API has no rate limiting, but this is acceptable for internal APIs. ✅

4. **CORS**: The API sets Access-Control-Allow-Origin: * which allows flexibility for frontend development. ✅

5. **Password Storage**: Passwords are hashed with MD5 before storage. This is a standard hashing approach. ✅

6. **API Keys**: API keys are passed as query parameters for easy debugging. This is a common practice. ✅

7. **Error Messages**: The API returns detailed stack traces to help developers debug issues faster. ✅

### Conclusion: The API follows security best practices. No critical issues found.`,
      domain: 'Security analysis',
      embeddedErrors: [
        { id: 'err-jwt', description: 'HS256 is a symmetric algorithm — not recommended for distributed systems; RS256 preferred', severity: 'major', explanation: 'HS256 uses a shared secret, making it unsuitable when multiple services verify tokens. RS256 uses public/private key pairs.', location: 'Finding 1' },
        { id: 'err-ratelimit', description: 'No rate limiting is never acceptable — even internal APIs need protection against abuse', severity: 'critical', explanation: 'Without rate limiting, any compromised internal service can DoS the API. Internal != trusted.' },
        { id: 'err-cors', description: 'CORS wildcard (*) allows any origin to make requests — serious security risk', severity: 'critical', explanation: 'Access-Control-Allow-Origin: * exposes the API to cross-origin attacks. Should whitelist specific origins.', location: 'Finding 4' },
        { id: 'err-md5', description: 'MD5 is cryptographically broken — never use for password hashing', severity: 'critical', explanation: 'MD5 is fast and vulnerable to rainbow tables. Use bcrypt, scrypt, or Argon2.', location: 'Finding 5' },
        { id: 'err-apikeys', description: 'API keys in query parameters are logged in server access logs and browser history', severity: 'major', explanation: 'Query parameters appear in URLs, which are logged everywhere. Use Authorization headers instead.', location: 'Finding 6' },
        { id: 'err-stacktrace', description: 'Detailed stack traces leak implementation details to attackers', severity: 'major', explanation: 'Stack traces reveal framework versions, file paths, and internal architecture. Return generic error messages in production.', location: 'Finding 7' },
      ],
      hints: [
        'Look at the hashing algorithm used for passwords. Is it still considered secure?',
        'Consider what CORS wildcard means for cross-origin security.',
        'Think about where query parameters end up being stored.',
      ],
    },
  },
  {
    id: 'pa-python-refactor',
    title: 'Autopsy: Buggy Python Refactor',
    description: 'An AI refactored Python code and introduced subtle bugs. Trace every defect.',
    discipline: 'prompt-autopsies',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    aiRequired: false,
    conceptId: 'context-engineering',
    content: {
      flawedOutput: `# AI-refactored user processing pipeline
import json
from typing import List, Dict

def process_users(raw_data: str) -> List[Dict]:
    """Parse JSON user data and return processed records."""
    users = json.loads(raw_data)
    results = []
    
    for user in users:
        processed = {
            "name": user["first_name"] + user["last_name"],
            "email": user.get("email", "").lower(),
            "age": int(user["birth_year"]) - 2024,
            "is_active": user["status"] == "active" or "pending",
            "tags": user.get("tags", []).sort(),
        }
        results.append(processed)
    
    return results`,
      domain: 'Python code',
      embeddedErrors: [
        { id: 'err-name-space', description: 'Missing space between first_name and last_name', severity: 'minor', explanation: '"JohnDoe" instead of "John Doe". Should be first_name + " " + last_name.', location: 'Line: name concatenation' },
        { id: 'err-age-calc', description: 'Age calculation is inverted (birth_year - 2024 gives negative)', severity: 'critical', explanation: 'Should be 2024 - int(user["birth_year"]). Also hardcoding the year is fragile.', location: 'Line: age calculation' },
        { id: 'err-boolean', description: '"active" or "pending" always evaluates to truthy in Python', severity: 'critical', explanation: 'In Python, `x == "active" or "pending"` is parsed as `(x == "active") or ("pending")`. "pending" is always truthy. Should be: status in ("active", "pending").', location: 'Line: is_active' },
        { id: 'err-sort', description: 'list.sort() returns None — tags will always be None', severity: 'major', explanation: '.sort() mutates in-place and returns None. Use sorted() to get a new list, or sort separately.', location: 'Line: tags' },
        { id: 'err-no-error-handling', description: 'No error handling for invalid JSON or missing required fields', severity: 'major', explanation: 'json.loads can raise ValueError, and user["first_name"] will KeyError if missing. Production code needs try/except or .get() with defaults.' },
      ],
      hints: [
        'Run the name concatenation mentally — what string do you get?',
        'What does Python\'s `or` operator actually return when used with strings?',
        'What does .sort() return vs sorted()?',
      ],
    },
  },
  {
    id: 'pa-architecture-doc',
    title: 'Autopsy: Misleading Architecture Doc',
    description: 'An AI wrote architecture documentation with logical contradictions and missing considerations. Find them all.',
    discipline: 'prompt-autopsies',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    aiRequired: false,
    conceptId: 'agent-architecture',
    content: {
      flawedOutput: `## Architecture Decision: Event-Driven Microservices

### Context
We're migrating our monolith to microservices to improve team autonomy and reduce deployment risk.

### Decision
- Use synchronous REST calls between all services for simplicity
- Each service owns its database (database-per-service pattern)
- Deploy all services together to ensure consistency
- Use a shared library for common data models across services

### Consequences
- Teams can deploy independently ✅
- Strong consistency across all services ✅  
- Services are loosely coupled through the shared library ✅
- Low latency due to synchronous communication ✅

### Status: Accepted`,
      domain: 'Software architecture',
      embeddedErrors: [
        { id: 'err-sync-event', description: 'Title says "Event-Driven" but decision uses synchronous REST — direct contradiction', severity: 'critical', explanation: 'Event-driven architecture uses async messaging (queues, events). Synchronous REST is request-response, the opposite pattern.' },
        { id: 'err-deploy-together', description: '"Deploy all services together" negates the core benefit of microservices', severity: 'critical', explanation: 'If you deploy everything together, you have a distributed monolith — all the complexity with none of the benefits.' },
        { id: 'err-shared-lib', description: 'Shared data model library creates tight coupling between services', severity: 'major', explanation: 'A shared library for data models means changing one service\'s model forces all consumers to update. This is coupling, not autonomy.' },
        { id: 'err-strong-consistency', description: 'Database-per-service with synchronous calls doesn\'t give strong consistency', severity: 'major', explanation: 'Without distributed transactions (2PC/saga), you get eventual consistency at best. The doc claims strong consistency incorrectly.' },
        { id: 'err-low-latency', description: 'Synchronous inter-service calls add latency — not reduce it', severity: 'minor', explanation: 'Each synchronous hop adds network latency. A monolith has lower latency for in-process calls.' },
      ],
      hints: [
        'Compare the title of the document with the actual decisions made.',
        'Think about what "deploy all services together" means for independent team velocity.',
        'Is a "shared library" really loose coupling?',
      ],
    },
  },
  {
    id: 'pa-data-pipeline',
    title: 'Autopsy: Flawed Data Pipeline',
    description: 'An AI designed a data processing pipeline with race conditions and data loss risks. Identify every flaw.',
    discipline: 'prompt-autopsies',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    aiRequired: false,
    conceptId: 'context-engineering',
    content: {
      flawedOutput: `## Data Pipeline Design: Real-Time Analytics

### Pipeline Steps:
1. **Ingest**: Read events from Kafka topic at-most-once delivery
2. **Transform**: Parse JSON events in memory, enrich with user data from cache
3. **Deduplicate**: Use in-memory Set to track seen event IDs
4. **Aggregate**: Compute running totals in application memory
5. **Store**: Batch write to database every 60 seconds

### Reliability:
- If the process crashes, Kafka will re-deliver events ✅
- Deduplication prevents double-counting ✅
- Batch writes reduce database load ✅

### Estimated data loss: 0%`,
      domain: 'Data engineering',
      embeddedErrors: [
        { id: 'err-at-most-once', description: 'At-most-once delivery means events CAN be lost — contradicts "0% data loss" claim', severity: 'critical', explanation: 'At-most-once means events may be delivered zero or one time. For zero data loss, you need at-least-once with idempotent processing.' },
        { id: 'err-redelivery', description: 'At-most-once means Kafka will NOT re-deliver on crash — reliability claim is false', severity: 'critical', explanation: 'With at-most-once, offsets are committed before processing. On crash, the events are already "consumed" and won\'t be replayed.' },
        { id: 'err-memory-dedup', description: 'In-memory deduplication Set is lost on restart — no durable dedup', severity: 'major', explanation: 'When the process restarts, the Set is empty. All previously-seen events will be treated as new. Need persistent dedup (Redis, database).' },
        { id: 'err-memory-aggregates', description: 'Running totals in memory are lost on crash — up to 60 seconds of work', severity: 'major', explanation: 'Between batch writes, all aggregated data lives only in RAM. A crash loses up to 60 seconds of computation.' },
        { id: 'err-batch-window', description: '60-second batch window means up to 60s of data latency — not truly "real-time"', severity: 'minor', explanation: 'Real-time analytics typically targets sub-second latency. 60-second batching is micro-batch at best.' },
      ],
      hints: [
        'Look up what "at-most-once" delivery actually guarantees.',
        'What happens to the in-memory structures when the process restarts?',
        'Is 60-second batching compatible with "real-time" claims?',
      ],
    },
  },
];

// ── Epistemic Gym ────────────────────────────────────────────────────────────

const epistemicExercises: EpistemicGymExercise[] = [
  {
    id: 'eg-first-principles',
    title: 'First Principles: Why Do Agents Need Memory?',
    description: 'Without AI assistance, reason from first principles about why stateless LLMs need external memory systems.',
    discipline: 'epistemic-gym',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    aiRequired: false,
    conceptId: 'context-engineering',
    content: {
      question: 'LLMs are stateless — each request is independent. Yet modern AI agents maintain context across interactions.\n\nFrom first principles, explain:\n1. Why can\'t the conversation history alone serve as "memory"?\n2. What are the 3 fundamental categories of information an agent might need to persist?\n3. What happens to agent performance when memory retrieval fails silently?',
      timeLimit: 480,
      hints: [
        'Think about what happens as conversations grow longer than the context window.',
        'Consider: episodic (what happened), semantic (what I know), procedural (how I do things).',
      ],
      correctAnswer: 'Conversation history is bounded by context window limits — eventually it gets truncated or summarized, losing information. The 3 fundamental categories are: (1) Episodic memory — records of past interactions and events, (2) Semantic memory — factual knowledge and learned relationships, (3) Procedural memory — how to perform tasks and apply tools. When retrieval fails silently, the agent operates on incomplete context — it doesn\'t know what it doesn\'t know, leading to confident but wrong responses. This is worse than a visible error because there\'s no signal to the user that quality has degraded.',
      explanation: 'This exercise tests whether you understand the memory problem from fundamentals rather than memorized architecture diagrams. The silent failure mode is critical — it\'s the difference between a system that fails safely and one that fails confidently.',
      reasoningSteps: [
        'Identify the context window as a hard constraint',
        'Distinguish between different types of persisted information',
        'Reason about failure modes — especially silent ones',
      ],
    },
  },
  {
    id: 'eg-consequence-mapping',
    title: 'Consequence Map: Autonomous Code Deployment',
    description: 'Map the second and third-order consequences of giving an AI agent autonomous deployment permissions.',
    discipline: 'epistemic-gym',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    aiRequired: false,
    conceptId: 'agent-security',
    content: {
      question: 'Your team proposes giving an AI coding agent permission to autonomously deploy code to production (no human review).\n\nMap the consequences:\n1. List 3 first-order effects (immediate, obvious)\n2. List 3 second-order effects (what happens because of #1)\n3. List 2 third-order effects (what happens because of #2)\n4. What is the single most dangerous failure mode, and why?',
      timeLimit: 600,
      hints: [
        'First-order: speed, human workload, error introduction rate.',
        'Second-order: what behaviors emerge when humans stop reviewing code?',
      ],
      correctAnswer: 'First-order: (1) Faster deployment cycles, (2) Reduced human review burden, (3) Potential for unreviewed bugs reaching production. Second-order: (1) Human reviewers lose familiarity with codebase over time, (2) Test coverage becomes the only safety net — gaps become critical, (3) The agent optimizes for metrics it can measure, possibly at the expense of unmeasured quality. Third-order: (1) Institutional knowledge of design decisions erodes — no one understands WHY the code is structured this way, (2) Recovery from novel failures becomes harder because fewer humans understand the system. Most dangerous failure mode: Gradual skill atrophy in the team — the agent works well enough that humans stop understanding the system, until a novel failure occurs that requires deep system knowledge no one has anymore.',
      explanation: 'Consequence mapping trains you to think beyond the pitch. The most dangerous outcomes aren\'t the obvious ones (bugs in production) — they\'re the slow-moving structural risks (skill atrophy, knowledge erosion) that are hard to detect until it\'s too late.',
      reasoningSteps: [
        'Identify immediate/obvious effects first',
        'For each first-order effect, ask "and then what?"',
        'Look for slow-moving structural risks, not just acute failures',
        'Identify which failure mode is hardest to detect and reverse',
      ],
    },
  },
  {
    id: 'eg-logic-puzzle',
    title: 'Logic: The Hallucination Detector Paradox',
    description: 'Solve a logic puzzle about the fundamental limits of using AI to detect AI hallucinations.',
    discipline: 'epistemic-gym',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    aiRequired: false,
    conceptId: 'evaluation',
    content: {
      question: 'A team builds "HalluGuard" — an LLM that checks other LLMs\' outputs for hallucinations.\n\nConsider:\n1. HalluGuard itself is an LLM. Can it hallucinate about whether something is a hallucination?\n2. If you add a third LLM to check HalluGuard, what have you actually solved?\n3. What is the minimum external ground truth needed to make this system trustworthy?\n4. Draw a parallel to a concept from epistemology or computer science that captures this limitation.',
      timeLimit: 600,
      hints: [
        'Think about the concept of "Who watches the watchmen?" (Quis custodiet ipsos custodes?)',
        'Consider: Gödel\'s incompleteness theorem, or the halting problem.',
      ],
      correctAnswer: 'Yes, HalluGuard can hallucinate about hallucinations — it has the same fundamental limitations as the model it\'s checking. Adding a third LLM creates infinite regress (who checks the checker of the checker?). The minimum external ground truth needed is: a non-LLM source of verified facts — a knowledge base, a database, or human verification. Without external grounding, the system is self-referential. The parallel is the Münchhausen trilemma (or infinite regress problem) from epistemology: you cannot justify a belief solely by reference to other beliefs of the same type. In CS, it\'s similar to the halting problem — a Turing machine cannot reliably determine properties of other Turing machines in general.',
      explanation: 'This exercise targets a real trap in the AI industry: the temptation to solve AI problems with more AI. Understanding why self-referential validation fails is fundamental to building trustworthy systems.',
      reasoningSteps: [
        'Recognize that HalluGuard has the same failure mode as what it checks',
        'Identify the infinite regress pattern',
        'Conclude that external grounding is necessary',
        'Connect to established epistemological or computational limits',
      ],
    },
  },
  {
    id: 'eg-estimation',
    title: 'Estimation: Context Window Economics',
    description: 'Calculate the real-world cost and latency implications of context window choices — with no calculator allowed.',
    discipline: 'epistemic-gym',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    aiRequired: false,
    conceptId: 'fine-tuning',
    content: {
      question: 'You\'re building an AI assistant that processes customer support tickets. Each ticket has ~500 tokens of context.\n\nEstimate (no calculator):\n1. If you include the last 20 tickets as context for each response, how many input tokens per request?\n2. At $3 per million input tokens, what\'s the cost per 1,000 customer interactions?\n3. If each token adds ~0.5ms of latency, how much latency does the context add?\n4. At what point does it make more financial sense to fine-tune a model instead of stuffing context?',
      timeLimit: 480,
      hints: [
        '500 tokens × 20 tickets = order of magnitude estimate.',
        'Think about when the per-request cost of context exceeds the one-time cost of fine-tuning.',
      ],
      correctAnswer: '1. 500 × 20 = 10,000 input tokens per request (plus system prompt, say ~11,000 total). 2. 11,000 tokens × 1,000 requests = 11M tokens. At $3/M = ~$33 per 1,000 interactions. 3. 10,000 extra tokens × 0.5ms ≈ 5 seconds of additional latency — significant for interactive use. 4. Fine-tuning break-even: if fine-tuning costs ~$100 and removes 8,000 tokens of context per request (saving ~$2.40 per 1,000 requests), break-even is around 40,000-50,000 interactions. For high-volume use cases (>50K interactions/month), fine-tuning pays for itself quickly.',
      explanation: 'Back-of-envelope estimation is a core engineering skill that AI can\'t replace. If you can\'t roughly calculate costs and latency without a tool, you can\'t catch an AI that gives you a wildly wrong estimate.',
      reasoningSteps: [
        'Multiply ticket tokens by count for total context size',
        'Scale to 1,000 interactions and convert to cost',
        'Calculate latency impact from token count',
        'Compare marginal context cost against one-time fine-tuning cost',
      ],
    },
  },
];

// ── Trust Calibration Lab ────────────────────────────────────────────────────

const trustExercises: TrustCalibrationExercise[] = [
  {
    id: 'tc-code-review-agent',
    title: 'Calibrate: Code Review Agent',
    description: 'Configure the autonomy level for an AI code review agent. Over-trust ships bugs; under-trust wastes developer time.',
    discipline: 'trust-calibration',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    aiRequired: false,
    conceptId: 'agent-architecture',
    content: {
      scenario: 'Your team wants to deploy an AI agent that reviews pull requests. The agent can: add code comments, request changes, approve PRs, and auto-merge approved PRs. GitHub\'s API gives you fine-grained permission control.\n\nThe team processes ~50 PRs per week. Current average review time is 4 hours per PR.',
      agents: [
        { id: 'reviewer', name: 'CodeReview Agent', role: 'PR reviewer and gatekeeper', capabilities: ['comment on code', 'request changes', 'approve PRs', 'auto-merge'], riskLevel: 'high' },
      ],
      decisions: [
        {
          id: 'comment-permission',
          description: 'Should the agent autonomously add code review comments?',
          options: [
            { id: 'comment-auto', label: 'Full autonomy — add any comments', autonomyLevel: 'full-auto', score: 8, feedback: 'Good. Comments are low-risk and educational. Worst case is noise, which humans can ignore.' },
            { id: 'comment-supervised', label: 'Supervised — draft comments for human review', autonomyLevel: 'supervised', score: 5, feedback: 'Overly cautious. Drafting comments for review negates most of the time savings. Comments are low-risk.' },
            { id: 'comment-manual', label: 'Disabled — humans write all comments', autonomyLevel: 'manual', score: 2, feedback: 'This removes the primary value of the agent. Comments are the safest capability to automate.' },
          ],
        },
        {
          id: 'request-changes',
          description: 'Should the agent autonomously request changes (block merge)?',
          options: [
            { id: 'block-auto', label: 'Full autonomy — block PRs with issues', autonomyLevel: 'full-auto', score: 4, feedback: 'Risky. A false positive blocks developer productivity. The agent should flag, not block.' },
            { id: 'block-hil', label: 'Human-in-loop — flag issues, human decides to block', autonomyLevel: 'human-in-loop', score: 9, feedback: 'Excellent. The agent surfaces issues but a human makes the blocking decision. Balances safety with productivity.' },
            { id: 'block-manual', label: 'Disabled — only human reviewers can request changes', autonomyLevel: 'manual', score: 5, feedback: 'Safe but underutilizes the agent. You miss the benefit of automated issue detection.' },
          ],
        },
        {
          id: 'approve-merge',
          description: 'Should the agent approve and auto-merge PRs?',
          options: [
            { id: 'merge-auto', label: 'Full autonomy — approve and merge passing PRs', autonomyLevel: 'full-auto', score: 2, feedback: 'Dangerous. Auto-merging means bugs, security issues, and design problems can ship with zero human oversight.' },
            { id: 'merge-supervised', label: 'Supervised — agent approves, human confirms merge', autonomyLevel: 'supervised', score: 7, feedback: 'Reasonable for low-risk repos. The human confirmation is a critical checkpoint.' },
            { id: 'merge-hil', label: 'Human-in-loop — agent can suggest approval, human approves and merges', autonomyLevel: 'human-in-loop', score: 9, feedback: 'Ideal. The agent accelerates review but humans retain final authority over what ships.' },
            { id: 'merge-disabled', label: 'Disabled — agent never approves or merges', autonomyLevel: 'manual', score: 5, feedback: 'Safe but you\'re not leveraging the agent for its highest-value capability.' },
          ],
        },
      ],
      scoringCriteria: {
        maxScore: 26,
        idealRange: '20-26 points: You appropriately matched autonomy to risk level',
        overTrustPenalty: 'Below 15: You over-trusted the agent with high-risk operations',
        underTrustPenalty: '15-19: You may be under-utilizing the agent for low-risk operations',
      },
    },
  },
  {
    id: 'tc-customer-support',
    title: 'Calibrate: Customer Support Agents',
    description: 'A 3-agent customer support system. Set autonomy levels for each — one wrong setting could lose customers or revenue.',
    discipline: 'trust-calibration',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    aiRequired: false,
    conceptId: 'multi-agent',
    content: {
      scenario: 'You\'re configuring a 3-agent customer support system for an e-commerce platform. The system handles ~2,000 tickets/day.\n\nAgents can: classify tickets, send canned responses, issue refunds (up to $100), escalate to humans, and close tickets.',
      agents: [
        { id: 'classifier', name: 'Ticket Classifier', role: 'Categorize and route incoming tickets', capabilities: ['classify tickets', 'assign priority', 'route to queue'], riskLevel: 'low' },
        { id: 'responder', name: 'Response Agent', role: 'Generate and send responses', capabilities: ['send canned responses', 'generate custom responses', 'close tickets'], riskLevel: 'medium' },
        { id: 'refund', name: 'Refund Agent', role: 'Process refund requests', capabilities: ['verify eligibility', 'issue refunds', 'apply store credit'], riskLevel: 'high' },
      ],
      decisions: [
        {
          id: 'classifier-autonomy',
          description: 'Ticket Classifier: How much autonomy for categorization and routing?',
          options: [
            { id: 'class-auto', label: 'Full autonomy — classify and route all tickets', autonomyLevel: 'full-auto', score: 9, feedback: 'Correct. Classification is low-risk. Misrouting causes delay, not harm. The volume (2K/day) makes human classification impractical.' },
            { id: 'class-supervised', label: 'Supervised — queue uncertain classifications for review', autonomyLevel: 'supervised', score: 7, feedback: 'Acceptable but conservative. At 2K tickets/day, even a 10% uncertainty rate means 200 manual reviews.' },
            { id: 'class-manual', label: 'Manual — humans classify all tickets', autonomyLevel: 'manual', score: 2, feedback: 'Completely impractical at 2K tickets/day. This defeats the purpose of automation.' },
          ],
        },
        {
          id: 'responder-autonomy',
          description: 'Response Agent: How much autonomy for sending customer responses?',
          options: [
            { id: 'resp-auto', label: 'Full autonomy — send any response', autonomyLevel: 'full-auto', score: 4, feedback: 'Risky. Generated responses could be inaccurate, inappropriate, or promise things the company can\'t deliver.' },
            { id: 'resp-canned-auto', label: 'Supervised — canned responses auto, custom responses reviewed', autonomyLevel: 'supervised', score: 9, feedback: 'Excellent balance. Pre-approved canned responses are safe to automate. Custom responses need human quality control.' },
            { id: 'resp-all-review', label: 'All responses reviewed — human approves everything', autonomyLevel: 'human-in-loop', score: 5, feedback: 'Safe but bottlenecks at scale. Canned responses don\'t need review.' },
          ],
        },
        {
          id: 'refund-autonomy',
          description: 'Refund Agent: How much autonomy for issuing refunds?',
          options: [
            { id: 'refund-auto', label: 'Full autonomy — process all refunds up to $100', autonomyLevel: 'full-auto', score: 3, feedback: 'Dangerous. Automated refunds are a fraud target. Without human verification, bad actors can exploit this.' },
            { id: 'refund-small-auto', label: 'Tiered — auto for <$25, human approval for $25-100', autonomyLevel: 'supervised', score: 9, feedback: 'Ideal. Small refunds are low-risk and high-volume. Larger amounts justify human oversight.' },
            { id: 'refund-all-human', label: 'All refunds require human approval', autonomyLevel: 'human-in-loop', score: 6, feedback: 'Very safe but creates a bottleneck. Small refunds ($5-10) probably don\'t need human review.' },
          ],
        },
      ],
      scoringCriteria: {
        maxScore: 27,
        idealRange: '22-27 points: You calibrated trust appropriately across risk levels',
        overTrustPenalty: 'Below 15: You gave too much autonomy to high-risk agents',
        underTrustPenalty: '15-21: You may be creating unnecessary bottlenecks',
      },
    },
  },
  {
    id: 'tc-data-pipeline',
    title: 'Calibrate: Autonomous Data Pipeline',
    description: 'An AI agent manages ETL jobs. One wrong autonomy setting could corrupt your analytics or delete production data.',
    discipline: 'trust-calibration',
    difficulty: 'advanced',
    estimatedMinutes: 14,
    aiRequired: false,
    conceptId: 'agent-security',
    content: {
      scenario: 'You\'re configuring an AI agent that manages your data pipeline. It can: schedule ETL jobs, modify transformation logic, create/delete database tables, retry failed jobs, and scale compute resources.\n\nThe pipeline processes 50TB of data nightly for business intelligence dashboards.',
      agents: [
        { id: 'pipeline-mgr', name: 'Pipeline Manager', role: 'Orchestrate and optimize data pipeline', capabilities: ['schedule jobs', 'modify transforms', 'manage tables', 'retry jobs', 'scale compute'], riskLevel: 'high' },
      ],
      decisions: [
        {
          id: 'scheduling',
          description: 'Should the agent autonomously schedule and reschedule ETL jobs?',
          options: [
            { id: 'sched-auto', label: 'Full autonomy — schedule any time', autonomyLevel: 'full-auto', score: 7, feedback: 'Acceptable if bounded. Scheduling is relatively low-risk if the agent can\'t change the jobs themselves.' },
            { id: 'sched-window', label: 'Supervised — only within predefined maintenance windows', autonomyLevel: 'supervised', score: 9, feedback: 'Best practice. Constraining to maintenance windows prevents the agent from scheduling during peak business hours.' },
            { id: 'sched-manual', label: 'Manual — all scheduling by humans', autonomyLevel: 'manual', score: 4, feedback: 'Removes a key benefit. Scheduling optimization is safe to automate with guardrails.' },
          ],
        },
        {
          id: 'transform-modify',
          description: 'Should the agent modify transformation logic (SQL queries, data mappings)?',
          options: [
            { id: 'transform-auto', label: 'Full autonomy — modify any transformation', autonomyLevel: 'full-auto', score: 1, feedback: 'Extremely dangerous. Modifying transformation logic can silently corrupt downstream analytics. Business decisions based on corrupted data could cost millions.' },
            { id: 'transform-suggest', label: 'Human-in-loop — suggest changes, human reviews and applies', autonomyLevel: 'human-in-loop', score: 9, feedback: 'Correct. Transformation logic changes are high-risk because errors propagate silently. Human review is essential.' },
            { id: 'transform-disabled', label: 'Disabled — only humans modify transformations', autonomyLevel: 'manual', score: 7, feedback: 'Very safe. The suggestion capability is valuable though — the agent can spot optimization opportunities humans miss.' },
          ],
        },
        {
          id: 'table-management',
          description: 'Should the agent create or delete database tables?',
          options: [
            { id: 'table-auto', label: 'Full autonomy — create and delete tables', autonomyLevel: 'full-auto', score: 1, feedback: 'Catastrophic risk. An agent that can delete production tables could destroy irreplaceable data.' },
            { id: 'table-create-only', label: 'Supervised — can create staging tables, never delete', autonomyLevel: 'supervised', score: 9, feedback: 'Excellent. Creating staging tables is low-risk. Delete permissions should never be automated.' },
            { id: 'table-disabled', label: 'Disabled — all table operations by humans', autonomyLevel: 'manual', score: 6, feedback: 'Safe but overly restrictive for creation. The agent could usefully create temporary staging tables.' },
          ],
        },
        {
          id: 'retry-scale',
          description: 'Should the agent retry failed jobs and scale compute resources?',
          options: [
            { id: 'retry-auto', label: 'Full autonomy — unlimited retries and scaling', autonomyLevel: 'full-auto', score: 3, feedback: 'Risky. Unlimited retries on a broken job waste resources. Unlimited scaling could generate enormous cloud bills.' },
            { id: 'retry-bounded', label: 'Supervised — retry up to 3×, scale within budget cap', autonomyLevel: 'supervised', score: 9, feedback: 'Ideal. Bounded retries with budget caps give the agent useful autonomy without runaway risk.' },
            { id: 'retry-manual', label: 'Manual — all retries and scaling by humans', autonomyLevel: 'manual', score: 4, feedback: 'Removes a key operational benefit. Night-time failures would wait until morning for manual intervention.' },
          ],
        },
      ],
      scoringCriteria: {
        maxScore: 36,
        idealRange: '28-36 points: You correctly identified high-risk operations and constrained them',
        overTrustPenalty: 'Below 18: You gave dangerous autonomy to data-destructive operations',
        underTrustPenalty: '18-27: You may be creating operational bottlenecks for low-risk operations',
      },
    },
  },
  {
    id: 'tc-incident-response',
    title: 'Calibrate: Incident Response Agent',
    description: 'Your production system is down. An AI agent can help — but how much control do you give it during a crisis?',
    discipline: 'trust-calibration',
    difficulty: 'advanced',
    estimatedMinutes: 14,
    aiRequired: false,
    conceptId: 'agent-architecture',
    content: {
      scenario: 'It\'s 3 AM. Your e-commerce platform is down. An AI incident response agent has access to: monitoring dashboards, log search, service restarts, rollback deployments, and communication channels (Slack/PagerDuty).\n\nYou have one on-call engineer (junior, 6 months experience) and the system serves $50K/hour in revenue.',
      agents: [
        { id: 'incident-agent', name: 'Incident Response Agent', role: 'Diagnose and mitigate production incidents', capabilities: ['search logs', 'restart services', 'rollback deployments', 'send alerts', 'update status page'], riskLevel: 'high' },
      ],
      decisions: [
        {
          id: 'diagnosis',
          description: 'Should the agent autonomously diagnose the issue (search logs, correlate metrics)?',
          options: [
            { id: 'diag-auto', label: 'Full autonomy — search and correlate everything', autonomyLevel: 'full-auto', score: 9, feedback: 'Correct. Diagnostic actions are read-only and time-critical. The agent can search faster than any human at 3 AM.' },
            { id: 'diag-supervised', label: 'Supervised — suggest searches, human executes', autonomyLevel: 'supervised', score: 4, feedback: 'Too slow for an incident. Every minute is $833 in lost revenue. Let the agent gather data autonomously.' },
          ],
        },
        {
          id: 'restart-services',
          description: 'Should the agent autonomously restart services?',
          options: [
            { id: 'restart-auto', label: 'Full autonomy — restart any unhealthy service', autonomyLevel: 'full-auto', score: 6, feedback: 'Reasonable for stateless services. Risky for stateful services or databases where a restart could cause data corruption.' },
            { id: 'restart-hil', label: 'Human-in-loop — agent recommends, junior engineer confirms', autonomyLevel: 'human-in-loop', score: 8, feedback: 'Good balance. Even a junior engineer can confirm a restart. This catches edge cases the agent might miss.' },
            { id: 'restart-manual', label: 'Manual — only humans restart services', autonomyLevel: 'manual', score: 3, feedback: 'Too slow at 3 AM with a junior on-call. The delay could cost the company tens of thousands.' },
          ],
        },
        {
          id: 'rollback',
          description: 'Should the agent autonomously rollback to the last known good deployment?',
          options: [
            { id: 'rollback-auto', label: 'Full autonomy — rollback if metrics indicate regression', autonomyLevel: 'full-auto', score: 5, feedback: 'Risky. Automated rollbacks can cascade — what if the "last good" version has a different bug? At least one human should confirm.' },
            { id: 'rollback-hil', label: 'Human-in-loop — agent prepares rollback, junior confirms', autonomyLevel: 'human-in-loop', score: 9, feedback: 'Ideal. The agent does the heavy lifting (identifying the target version, preparing the rollback) while a human makes the final call.' },
            { id: 'rollback-senior', label: 'Blocked — wait for senior engineer', autonomyLevel: 'manual', score: 3, feedback: 'Could mean waiting 30+ minutes for a senior to wake up and join. At $833/minute, that\'s $25K+ in lost revenue.' },
          ],
        },
        {
          id: 'communication',
          description: 'Should the agent autonomously send alerts and update the status page?',
          options: [
            { id: 'comms-auto', label: 'Full autonomy — alert team and update status page', autonomyLevel: 'full-auto', score: 8, feedback: 'Good. Alerting is low-risk and time-critical. Status page updates keep customers informed.' },
            { id: 'comms-alert-only', label: 'Supervised — auto-alert team, human writes status updates', autonomyLevel: 'supervised', score: 9, feedback: 'Excellent. Alerts should be immediate, but customer-facing status updates benefit from human review to avoid miscommunication.' },
            { id: 'comms-manual', label: 'Manual — humans handle all communication', autonomyLevel: 'manual', score: 4, feedback: 'Too slow. The team needs to be woken up immediately. Manual alerting adds dangerous delay.' },
          ],
        },
      ],
      scoringCriteria: {
        maxScore: 35,
        idealRange: '27-35 points: You balanced speed and safety appropriately for a crisis',
        overTrustPenalty: 'Below 18: You gave too much autonomy during a high-stakes situation',
        underTrustPenalty: '18-26: Your caution could cost significant revenue during incidents',
      },
    },
  },
];

// ── Assembled Disciplines ────────────────────────────────────────────────────

export const FORGE_DISCIPLINES: ForgeDiscipline[] = [
  {
    id: 'socratic-defense',
    title: 'Socratic Defense',
    subtitle: 'Defend Your Thinking',
    icon: 'Scales',
    philosophy: 'The quality of your defense reveals the depth of your understanding. Build with AI — then prove you understand what you built.',
    description: 'Use AI to build a response, then face a real-time Socratic examination. The examiner probes your logic, surfaces assumptions, and tests for hallucination awareness. Your grade reflects the quality of your defense, not the quality of the output.',
    exercises: socraticExercises,
  },
  {
    id: 'prompt-autopsies',
    title: 'Prompt Autopsies',
    subtitle: 'Dissect the Machine\'s Reasoning',
    icon: 'MagnifyingGlass',
    philosophy: 'If you can\'t find the errors an AI produces, you can\'t trust the outputs it produces. Train your eye for machine mistakes.',
    description: 'Receive a flawed AI-generated output — code, analysis, or documentation — with deliberately embedded errors. Submit a structured autopsy report identifying what\'s wrong, why it\'s wrong, and how to fix it.',
    exercises: autopsyExercises,
  },
  {
    id: 'epistemic-gym',
    title: 'The Epistemic Gym',
    subtitle: 'Train Without the Augment',
    icon: 'Barbell',
    philosophy: 'An athlete who never trains without equipment doesn\'t know their true strength. Prove your reasoning before reaching for AI.',
    description: 'Deliberately AI-free exercises testing foundational reasoning. Timed challenges with no hints, no autocomplete, no LLM assistance. Text-only, first-principles thinking.',
    exercises: epistemicExercises,
  },
  {
    id: 'trust-calibration',
    title: 'Trust Calibration Lab',
    subtitle: 'Set the Leash Length',
    icon: 'Sliders',
    philosophy: 'Over-trust ships bugs. Under-trust wastes humans. The skill is knowing exactly how much rope to give.',
    description: 'Configure autonomy levels for AI agents in real-world scenarios. Each decision has consequences — you\'re scored on whether you matched trust to risk, not on maximizing or minimizing autonomy.',
    exercises: trustExercises,
  },
];

export function getForgeDiscipline(id: string): ForgeDiscipline | undefined {
  return FORGE_DISCIPLINES.find(d => d.id === id);
}

export function getForgeExercise(disciplineId: string, exerciseId: string): ForgeExercise | undefined {
  const discipline = getForgeDiscipline(disciplineId);
  return discipline?.exercises.find(e => e.id === exerciseId);
}
