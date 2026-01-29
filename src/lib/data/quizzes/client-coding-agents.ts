// Client Coding Agents and Agent Skills quiz questions
import { QuizQuestion } from './types';

export const clientCodingAgentsQuestions: QuizQuestion[] = [
  // Client Coding Agents - Beginner
  {
    id: 'cca-b1',
    text: 'What distinguishes CLI coding agents from IDE-based AI assistants?',
    question: 'What distinguishes CLI coding agents from IDE-based AI assistants?',
    options: [
      'CLI agents are slower and less capable',
      'CLI agents operate directly in the terminal with full filesystem access and can run autonomously',
      'CLI agents only work with Python',
      'CLI agents require internet connection at all times'
    ],
    correctAnswer: 1,
    explanation: 'CLI coding agents like Claude Code and Copilot CLI operate directly in the terminal environment with full filesystem access, enabling autonomous multi-file editing, command execution, and long-running tasks without IDE dependency.',
    difficulty: 'beginner',
    category: 'client-coding-agents',
    subCategory: 'cli-fundamentals',
    relatedTopics: ['terminal-workflows', 'autonomous-agents', 'developer-tools'],
    relatedConcepts: ['terminal-workflows', 'autonomous-agents', 'developer-tools'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },
  {
    id: 'cca-b2',
    text: 'Which context file does Claude Code use for project-specific instructions?',
    question: 'Which context file does Claude Code use for project-specific instructions?',
    options: [
      'AGENTS.md',
      'GEMINI.md',
      'CLAUDE.md',
      '.copilot-instructions'
    ],
    correctAnswer: 2,
    explanation: 'Claude Code reads CLAUDE.md files in the project root or ~/.claude/ for persistent memory and project-specific instructions. AGENTS.md is for GitHub Copilot, and GEMINI.md is for Gemini CLI.',
    difficulty: 'beginner',
    category: 'client-coding-agents',
    subCategory: 'claude-code',
    relatedTopics: ['context-files', 'project-configuration', 'memory'],
    relatedConcepts: ['context-files', 'project-configuration', 'memory'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },
  {
    id: 'cca-b3',
    text: 'What command starts GitHub Copilot CLI for natural language command suggestions?',
    question: 'What command starts GitHub Copilot CLI for natural language command suggestions?',
    options: [
      'copilot start',
      'gh copilot suggest',
      'github-copilot run',
      'copilot-cli init'
    ],
    correctAnswer: 1,
    explanation: 'GitHub Copilot CLI uses `gh copilot suggest` to generate shell commands from natural language descriptions, and `gh copilot explain` to explain existing commands.',
    difficulty: 'beginner',
    category: 'client-coding-agents',
    subCategory: 'copilot-cli',
    relatedTopics: ['github-cli', 'command-generation', 'shell'],
    relatedConcepts: ['github-cli', 'command-generation', 'shell'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },

  // Client Coding Agents - Intermediate
  {
    id: 'cca-i1',
    text: 'What are the three approval modes available in OpenAI Codex CLI?',
    question: 'What are the three approval modes available in OpenAI Codex CLI?',
    options: [
      'manual, automatic, supervised',
      'suggest, auto-edit, full-auto',
      'safe, normal, dangerous',
      'interactive, batch, stream'
    ],
    correctAnswer: 1,
    explanation: 'Codex CLI offers three approval modes: suggest (manual approval for each action), auto-edit (auto-approves file changes but requires approval for commands), and full-auto (executes everything autonomously).',
    difficulty: 'intermediate',
    category: 'client-coding-agents',
    subCategory: 'codex-cli',
    relatedTopics: ['approval-workflows', 'autonomous-execution', 'safety'],
    relatedConcepts: ['approval-workflows', 'autonomous-execution', 'safety'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'cca-i2',
    text: 'How does Claude Code handle tool permissions?',
    question: 'How does Claude Code handle tool permissions?',
    options: [
      'All tools are always enabled',
      'Tools are disabled by default',
      'Uses --allowedTools and --disallowedTools flags or CLAUDE.md settings',
      'Permissions are set globally in system settings'
    ],
    correctAnswer: 2,
    explanation: 'Claude Code uses --allowedTools and --disallowedTools command-line flags, plus settings in CLAUDE.md to control which tools the agent can use. This provides fine-grained permission control.',
    difficulty: 'intermediate',
    category: 'client-coding-agents',
    subCategory: 'claude-code',
    relatedTopics: ['tool-permissions', 'security', 'configuration'],
    relatedConcepts: ['tool-permissions', 'security', 'configuration'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'cca-i3',
    text: 'What unique capability does Gemini CLI offer beyond other CLI agents?',
    question: 'What unique capability does Gemini CLI offer beyond other CLI agents?',
    options: [
      'Faster execution speed',
      'Multimodal input including images and video in prompts',
      'Lower token costs',
      'Better Python support'
    ],
    correctAnswer: 1,
    explanation: 'Gemini CLI leverages Google\'s Gemini models to accept multimodal inputs including images and video directly in prompts, enabling visual understanding tasks alongside code generation.',
    difficulty: 'intermediate',
    category: 'client-coding-agents',
    subCategory: 'gemini-cli',
    relatedTopics: ['multimodal-ai', 'visual-understanding', 'gemini'],
    relatedConcepts: ['multimodal-ai', 'visual-understanding', 'gemini'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },

  // Client Coding Agents - Advanced
  {
    id: 'cca-a1',
    text: 'What is the recommended strategy for combining multiple CLI agents in a workflow?',
    question: 'What is the recommended strategy for combining multiple CLI agents in a workflow?',
    options: [
      'Never use multiple agents',
      'Use one universal context file for all agents',
      'Create agent-specific context files (CLAUDE.md, GEMINI.md, AGENTS.md) with shared conventions',
      'Disable context files entirely'
    ],
    correctAnswer: 2,
    explanation: 'Best practice is to create agent-specific context files while maintaining shared conventions. CLAUDE.md for Claude Code, GEMINI.md for Gemini CLI, and AGENTS.md for Copilot enable consistent behavior while respecting each agent\'s unique capabilities.',
    difficulty: 'advanced',
    category: 'client-coding-agents',
    subCategory: 'best-practices',
    relatedTopics: ['multi-agent', 'context-management', 'workflow-design'],
    relatedConcepts: ['multi-agent', 'context-management', 'workflow-design'],
    timeEstimate: 60,
    persona: ['agent-architect', 'ai-engineer']
  }
];

export const agentSkillsQuestions: QuizQuestion[] = [
  // Agent Skills - Beginner
  {
    id: 'as-b1',
    text: 'What is the primary purpose of Agent Skills?',
    question: 'What is the primary purpose of Agent Skills?',
    options: [
      'To replace the agent\'s core model',
      'To extend agent capabilities with modular, reusable expertise',
      'To speed up inference time',
      'To reduce memory usage'
    ],
    correctAnswer: 1,
    explanation: 'Agent Skills are a lightweight format for extending AI agent capabilities with specialized knowledge and workflows. They allow agents to gain domain-specific expertise without modifying the core model.',
    difficulty: 'beginner',
    category: 'agent-skills',
    subCategory: 'skills-fundamentals',
    relatedTopics: ['modular-design', 'agent-extension', 'specialization'],
    relatedConcepts: ['modular-design', 'agent-extension', 'specialization'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },
  {
    id: 'as-b2',
    text: 'What are the two required fields in a SKILL.md frontmatter?',
    question: 'What are the two required fields in a SKILL.md frontmatter?',
    options: [
      'title and content',
      'name and description',
      'id and version',
      'author and license'
    ],
    correctAnswer: 1,
    explanation: 'A SKILL.md file requires a YAML frontmatter with `name` (identifier for the skill) and `description` (explains what the skill does and when to use it). These enable skill discovery and activation.',
    difficulty: 'beginner',
    category: 'agent-skills',
    subCategory: 'skill-structure',
    relatedTopics: ['yaml-frontmatter', 'skill-discovery', 'metadata'],
    relatedConcepts: ['yaml-frontmatter', 'skill-discovery', 'metadata'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },
  {
    id: 'as-b3',
    text: 'What is "progressive disclosure" in the context of Agent Skills?',
    question: 'What is "progressive disclosure" in the context of Agent Skills?',
    options: [
      'Gradually revealing answers to users',
      'Loading full skill instructions only when the skill is triggered, not at startup',
      'Slowly teaching the agent new concepts',
      'Displaying information in multiple UI panels'
    ],
    correctAnswer: 1,
    explanation: 'Progressive disclosure means agents load only skill metadata (name, description) at startup, then load the full SKILL.md instructions only when a matching task triggers the skill. This keeps agents fast while providing access to deep expertise on demand.',
    difficulty: 'beginner',
    category: 'agent-skills',
    subCategory: 'skills-fundamentals',
    relatedTopics: ['context-efficiency', 'lazy-loading', 'performance'],
    relatedConcepts: ['context-efficiency', 'lazy-loading', 'performance'],
    timeEstimate: 40,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast']
  },

  // Agent Skills - Intermediate
  {
    id: 'as-i1',
    text: 'What pre-built Agent Skills does Anthropic provide for Claude?',
    question: 'What pre-built Agent Skills does Anthropic provide for Claude?',
    options: [
      'Database and API skills',
      'PowerPoint, Excel, Word, and PDF document skills',
      'Video editing skills',
      'Audio transcription skills'
    ],
    correctAnswer: 1,
    explanation: 'Anthropic provides pre-built Agent Skills for common document tasks: PowerPoint (pptx), Excel (xlsx), Word (docx), and PDF (pdf). These enable Claude to work with these file formats automatically.',
    difficulty: 'intermediate',
    category: 'agent-skills',
    subCategory: 'claude-skills',
    relatedTopics: ['document-processing', 'anthropic', 'pre-built-skills'],
    relatedConcepts: ['document-processing', 'anthropic', 'pre-built-skills'],
    timeEstimate: 40,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'as-i2',
    text: 'How do you create a workflow skill that can be invoked directly with arguments?',
    question: 'How do you create a workflow skill that can be invoked directly with arguments?',
    options: [
      'Use the "workflow: true" frontmatter field',
      'Add "disable-model-invocation: true" and reference $ARGUMENTS in the skill body',
      'Create a separate workflow.json file',
      'Use the /workflow command prefix'
    ],
    correctAnswer: 1,
    explanation: 'Workflow skills use "disable-model-invocation: true" in frontmatter to prevent automatic triggering, and reference $ARGUMENTS in the body to accept parameters. Users invoke with /skill-name args.',
    difficulty: 'intermediate',
    category: 'agent-skills',
    subCategory: 'skill-authoring',
    relatedTopics: ['workflow-automation', 'skill-invocation', 'arguments'],
    relatedConcepts: ['workflow-automation', 'skill-invocation', 'arguments'],
    timeEstimate: 50,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'as-i3',
    text: 'What is the recommended maximum length for a SKILL.md body to maintain efficiency?',
    question: 'What is the recommended maximum length for a SKILL.md body to maintain efficiency?',
    options: [
      '100 lines',
      '500 lines',
      '1000 lines',
      'No limit recommended'
    ],
    correctAnswer: 1,
    explanation: 'Best practices recommend keeping SKILL.md under 500 lines to maintain context efficiency. Use progressive disclosure by referencing additional files (REFERENCE.md, EXAMPLES.md) that load only when needed.',
    difficulty: 'intermediate',
    category: 'agent-skills',
    subCategory: 'best-practices',
    relatedTopics: ['context-efficiency', 'progressive-disclosure', 'skill-design'],
    relatedConcepts: ['context-efficiency', 'progressive-disclosure', 'skill-design'],
    timeEstimate: 40,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },

  // Agent Skills - Advanced
  {
    id: 'as-a1',
    text: 'What are the three levels of loading in the Agent Skills specification?',
    question: 'What are the three levels of loading in the Agent Skills specification?',
    options: [
      'fast, normal, deep',
      'metadata (L1), instructions (L2), resources (L3)',
      'header, body, footer',
      'init, run, cleanup'
    ],
    correctAnswer: 1,
    explanation: 'The spec defines three loading levels: L1 (Metadata - always loaded at startup, ~100 tokens), L2 (Instructions - loaded when triggered, recommended <5k tokens), and L3 (Resources - bundled files executed as needed, no context penalty until accessed).',
    difficulty: 'advanced',
    category: 'agent-skills',
    subCategory: 'specification',
    relatedTopics: ['loading-levels', 'context-management', 'agentskills-spec'],
    relatedConcepts: ['loading-levels', 'context-management', 'agentskills-spec'],
    timeEstimate: 60,
    persona: ['agent-architect', 'ai-engineer']
  },
  {
    id: 'as-a2',
    text: 'What security consideration is critical when using third-party Agent Skills?',
    question: 'What security consideration is critical when using third-party Agent Skills?',
    options: [
      'Skills cannot access the filesystem',
      'Skills are sandboxed and cannot execute code',
      'Skills can direct agents to invoke tools harmfully, so only use from trusted sources',
      'Skills automatically scan for malware'
    ],
    correctAnswer: 2,
    explanation: 'Agent Skills provide instructions that guide agent behavior, including tool invocation. A malicious skill can direct agents to perform harmful actions. Treat skills like any software: audit thoroughly and only use from trusted sources.',
    difficulty: 'advanced',
    category: 'agent-skills',
    subCategory: 'security',
    relatedTopics: ['skill-security', 'trust-model', 'code-review'],
    relatedConcepts: ['skill-security', 'trust-model', 'code-review'],
    timeEstimate: 50,
    persona: ['agent-architect', 'ai-engineer', 'security-engineer']
  }
];

// Combined export for easy import
export const clientCodingAgentsAndSkillsQuestions: QuizQuestion[] = [
  ...clientCodingAgentsQuestions,
  ...agentSkillsQuestions
];

// Time calculations
export const clientCodingAgentsTime = clientCodingAgentsQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
export const agentSkillsTime = agentSkillsQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
