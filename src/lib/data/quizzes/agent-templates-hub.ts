// @ts-nocheck
// Agent Templates Hub quiz questions
import { QuizQuestion } from './types';

export const agentTemplatesHubQuestions: QuizQuestion[] = [
  {
    id: 'templates-b1',
    question: 'What is the primary benefit of using agent starter templates?',
    text: 'What is the primary benefit of using agent starter templates?',
    options: [
      'They guarantee perfect agent behavior',
      'They reduce time-to-first-agent from days to hours with pre-built patterns',
      'They eliminate the need for testing',
      'They work without any API keys'
    ],
    correctAnswer: 1,
    explanation: 'Starter templates provide working code structures with best practices already implemented. Instead of starting from scratch, developers can focus on customization, reducing initial development time from days to hours.',
    difficulty: 'beginner',
    category: 'agent-templates-hub',
    subCategory: 'starter-templates',
    learningObjectives: ['Understand template value', 'Accelerate development'],
    relatedConcepts: ['agent-architecture', 'developer-experience', 'best-practices'],
    persona: ['agent-developer', 'career-seeker'],
    timeEstimate: 25
  },
  {
    id: 'templates-b2',
    question: 'What are the essential components of a Basic Agent Starter template?',
    text: 'What are the essential components of a Basic Agent Starter template?',
    options: [
      'Only the LLM API call',
      'Prompt template, tool calling setup, simple memory, and health endpoint',
      'A complete production deployment system',
      'Marketing materials and documentation'
    ],
    correctAnswer: 1,
    explanation: 'A basic agent starter includes: 1) Prompt template (system + user prompts), 2) Tool calling setup (at least one example tool), 3) Simple memory (conversation history), 4) Health endpoint (for monitoring). This is the minimal viable agent.',
    difficulty: 'beginner',
    category: 'agent-templates-hub',
    subCategory: 'starter-templates',
    learningObjectives: ['Identify essential components', 'Build minimal agents'],
    relatedConcepts: ['agent-architecture', 'tool-use', 'memory-systems'],
    persona: ['agent-developer', 'career-seeker'],
    timeEstimate: 30
  },
  {
    id: 'templates-i1',
    question: 'What distinguishes a RAG Agent template from a Basic Agent template?',
    text: 'What distinguishes a RAG Agent template from a Basic Agent template?',
    options: [
      'RAG agents don\'t use LLMs',
      'RAG agents include document ingestion, vector store setup, and retrieval chain with citations',
      'RAG agents only work offline',
      'RAG agents are simpler than basic agents'
    ],
    correctAnswer: 1,
    explanation: 'RAG (Retrieval-Augmented Generation) templates add: Document loading and chunking, vector store initialization (ChromaDB, Pinecone, etc.), retrieval chain that fetches relevant context, and citation formatting to trace answers to sources.',
    difficulty: 'intermediate',
    category: 'agent-templates-hub',
    subCategory: 'rag-template',
    learningObjectives: ['Understand RAG components', 'Build knowledge-grounded agents'],
    relatedConcepts: ['rag-fundamentals', 'vector-databases', 'document-processing'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 40
  },
  {
    id: 'templates-i2',
    question: 'What is the recommended project structure for production agent projects?',
    text: 'What is the recommended project structure for production agent projects?',
    options: [
      'All code in a single file',
      'Separate directories for agents, tools, prompts, tests, and evals with configuration files',
      'Only frontend code with inline prompts',
      'No structure needed for small projects'
    ],
    correctAnswer: 1,
    explanation: 'Production structure: app/agents/ (agent definitions), app/tools/ (tool implementations), app/prompts/ (text files for easy editing), tests/ (unit/integration), evals/ (golden test sets), plus config files, Dockerfile, and requirements.txt.',
    difficulty: 'intermediate',
    category: 'agent-templates-hub',
    subCategory: 'project-structure',
    learningObjectives: ['Organize agent projects', 'Follow best practices'],
    relatedConcepts: ['agent-deployment', 'software-engineering', 'maintainability'],
    persona: ['agent-developer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'templates-a1',
    question: 'What observability components should be included in a Production-Ready Agent template?',
    text: 'What observability components should be included in a Production-Ready Agent template?',
    options: [
      'No observability needed for MVP',
      'OpenTelemetry tracing, structured logging, error handling, and retry logic from day one',
      'Only error logging',
      'Just console.log statements'
    ],
    correctAnswer: 1,
    explanation: 'Production templates include observability from the start: OpenTelemetry for distributed tracing, structured logging (JSON) with correlation IDs, proper error handling with context, and retry logic with backoff. Adding these later is much harder.',
    difficulty: 'advanced',
    category: 'agent-templates-hub',
    subCategory: 'production-template',
    learningObjectives: ['Build observable agents', 'Implement production patterns'],
    relatedConcepts: ['agent-ops', 'observability', 'reliability'],
    persona: ['agent-architect', 'ai-ops-engineer'],
    timeEstimate: 50
  },
  {
    id: 'templates-a2',
    question: 'What are the five core components of an MCP Server template?',
    text: 'What are the five core components of an MCP Server template?',
    options: [
      'HTML, CSS, JavaScript, Images, Videos',
      'Server initialization, tool definitions, request handlers, transport setup, and resource exposure',
      'Database, Cache, Queue, API, UI',
      'Login, Dashboard, Settings, Profile, Logout'
    ],
    correctAnswer: 1,
    explanation: 'MCP Server templates include: 1) Server initialization with capabilities, 2) Tool definitions with input schemas, 3) Request handlers (ListTools, CallTool), 4) Transport setup (stdio, HTTP), 5) Optional resource exposure for context.',
    difficulty: 'advanced',
    category: 'agent-templates-hub',
    subCategory: 'mcp-template',
    learningObjectives: ['Build MCP servers', 'Understand MCP architecture'],
    relatedConcepts: ['mcp', 'tool-use', 'agent-integration'],
    persona: ['agent-developer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'templates-i3',
    question: 'What is the recommended approach for handling prompts in agent projects?',
    text: 'What is the recommended approach for handling prompts in agent projects?',
    options: [
      'Hardcode prompts directly in the code',
      'Store prompts in separate text files or a prompts directory for easy editing without code changes',
      'Let users write all prompts at runtime',
      'Use only the LLM\'s default behavior'
    ],
    correctAnswer: 1,
    explanation: 'Storing prompts in separate files (app/prompts/system.txt, templates.py) allows: 1) Non-developers to edit prompts, 2) A/B testing different versions, 3) Version control for prompt history, 4) No code deployment for prompt updates.',
    difficulty: 'intermediate',
    category: 'agent-templates-hub',
    subCategory: 'best-practices',
    learningObjectives: ['Manage prompts effectively', 'Enable prompt iteration'],
    relatedConcepts: ['agentic-prompting-fundamentals', 'software-engineering'],
    persona: ['agent-developer', 'product-manager'],
    timeEstimate: 35
  },
  {
    id: 'templates-b3',
    question: 'What is the fastest way to get a basic agent running?',
    text: 'What is the fastest way to get a basic agent running?',
    options: [
      'Build everything from scratch',
      'Follow a quickstart guide: install dependencies, set API key, copy template, run',
      'Wait for complete documentation',
      'Hire a consulting firm'
    ],
    correctAnswer: 1,
    explanation: 'Quickstart guides provide the fastest path: 1) pip install dependencies, 2) export API key, 3) Copy template code, 4) Run python script. A basic agent can be running in 5 minutes with the right template and guide.',
    difficulty: 'beginner',
    category: 'agent-templates-hub',
    subCategory: 'quickstart',
    learningObjectives: ['Get started quickly', 'Follow quickstart guides'],
    relatedConcepts: ['developer-experience', 'onboarding'],
    persona: ['agent-developer', 'career-seeker'],
    timeEstimate: 25
  }
];

export const agentTemplatesHubTime = agentTemplatesHubQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
