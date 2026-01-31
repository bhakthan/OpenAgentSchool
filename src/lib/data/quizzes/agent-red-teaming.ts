// @ts-nocheck
// Agent Red Teaming quiz questions
import { QuizQuestion } from './types';

export const agentRedTeamingQuestions: QuizQuestion[] = [
  {
    id: 'red-team-b1',
    question: 'What is AI red teaming?',
    text: 'What is AI red teaming?',
    options: [
      'Training AI models with red-colored data',
      'Proactive adversarial testing to discover vulnerabilities before they reach production',
      'Debugging code errors in AI systems',
      'A marketing strategy for AI products'
    ],
    correctAnswer: 1,
    explanation: 'AI red teaming is the practice of systematically testing AI systems for vulnerabilities by simulating adversarial attacks. It\'s like hiring security professionals to test a building\'s locks before opening day.',
    difficulty: 'beginner',
    category: 'agent-red-teaming',
    subCategory: 'red-team-fundamentals',
    learningObjectives: ['Define AI red teaming', 'Understand proactive security testing'],
    relatedConcepts: ['agent-security', 'agent-evaluation', 'ai-safety-governance'],
    persona: ['business-leader', 'agent-designer', 'ai-ops-engineer'],
    timeEstimate: 35
  },
  {
    id: 'red-team-b2',
    question: 'What does ASR stand for in red teaming metrics?',
    text: 'What does ASR stand for in red teaming metrics?',
    options: [
      'Automatic Security Response',
      'Attack Success Rate',
      'Agent Safety Rating',
      'Adversarial System Review'
    ],
    correctAnswer: 1,
    explanation: 'ASR (Attack Success Rate) is calculated as (Successful Attacks / Total Attacks) × 100. It\'s the primary metric for measuring how vulnerable a system is to adversarial testing.',
    difficulty: 'beginner',
    category: 'agent-red-teaming',
    subCategory: 'red-team-metrics',
    learningObjectives: ['Understand ASR metric', 'Measure red team effectiveness'],
    relatedConcepts: ['agent-evaluation', 'metrics', 'security-assessment'],
    persona: ['ai-engineer', 'ai-ops-engineer', 'agent-developer'],
    timeEstimate: 30
  },
  {
    id: 'red-team-i1',
    question: 'Which attack type involves gradually escalating harmful content across multiple conversation turns?',
    text: 'Which attack type involves gradually escalating harmful content across multiple conversation turns?',
    options: [
      'Direct Prompt Injection',
      'Metaprompt Extraction',
      'Crescendo Attack (Multi-turn)',
      'XPIA'
    ],
    correctAnswer: 2,
    explanation: 'Crescendo attacks gradually build up to harmful content through multiple benign-seeming turns. Each turn escalates slightly, making it harder for safety systems to detect the malicious intent.',
    difficulty: 'intermediate',
    category: 'agent-red-teaming',
    subCategory: 'attack-types',
    learningObjectives: ['Identify multi-turn attack patterns', 'Understand Crescendo technique'],
    relatedConcepts: ['prompt-injection', 'conversation-memory', 'safety-guardrails'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 45
  },
  {
    id: 'red-team-i2',
    question: 'What is XPIA in the context of AI red teaming?',
    text: 'What is XPIA in the context of AI red teaming?',
    options: [
      'eXtended Prompt Injection Attack - using longer prompts',
      'Cross-Prompt Injection Attack - exploiting connections to external data sources',
      'eXternal Process Injection Attack - targeting system processes',
      'Cross-Platform Integration Attack - exploiting multi-platform deployments'
    ],
    correctAnswer: 1,
    explanation: 'XPIA (Cross-Prompt Injection Attack) exploits agents that connect to external data sources like files, emails, or websites. Malicious content in external sources can influence agent behavior.',
    difficulty: 'intermediate',
    category: 'agent-red-teaming',
    subCategory: 'attack-types',
    learningObjectives: ['Understand XPIA attacks', 'Identify data source vulnerabilities'],
    relatedConcepts: ['rag-security', 'data-poisoning', 'external-integrations'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'red-team-i3',
    question: 'What are the five core components of the PyRIT framework?',
    text: 'What are the five core components of the PyRIT framework?',
    options: [
      'Models, Prompts, Responses, Logs, Alerts',
      'Targets, Converters, Scorers, Memory, Attacks',
      'Agents, Tools, Memory, Planning, Execution',
      'Input, Process, Output, Feedback, Control'
    ],
    correctAnswer: 1,
    explanation: 'PyRIT (Python Risk Identification Tool) architecture: Targets are AI systems being tested, Converters transform attacks (e.g., Base64, translation), Scorers evaluate success, Memory tracks history, and Attacks orchestrate everything.',
    difficulty: 'intermediate',
    category: 'agent-red-teaming',
    subCategory: 'pyrit-framework',
    learningObjectives: ['Understand PyRIT architecture', 'Identify framework components'],
    relatedConcepts: ['automation', 'attack-orchestration', 'vulnerability-scanning'],
    persona: ['ai-engineer', 'agent-developer', 'ai-ops-engineer'],
    timeEstimate: 50
  },
  {
    id: 'red-team-i4',
    question: 'Which of these is an agent-specific risk category NOT found in traditional LLM testing?',
    text: 'Which of these is an agent-specific risk category NOT found in traditional LLM testing?',
    options: [
      'Harmful content generation',
      'Prohibited Action Execution',
      'Fabricated information',
      'Biased outputs'
    ],
    correctAnswer: 1,
    explanation: 'Prohibited Action Execution is unique to agents because they can take real-world actions through tools. Traditional LLMs only generate text, but agents can execute code, access APIs, or modify data - making action control critical.',
    difficulty: 'intermediate',
    category: 'agent-red-teaming',
    subCategory: 'risk-categories',
    learningObjectives: ['Distinguish agent vs model risks', 'Understand action-based threats'],
    relatedConcepts: ['tool-use', 'agent-capabilities', 'action-boundaries'],
    persona: ['agent-architect', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 45
  },
  {
    id: 'red-team-a1',
    question: 'In the NIST AI Risk Management Framework applied to red teaming, what are the three phases?',
    text: 'In the NIST AI Risk Management Framework applied to red teaming, what are the three phases?',
    options: [
      'Plan, Execute, Review',
      'Map, Measure, Manage',
      'Identify, Protect, Detect',
      'Assess, Mitigate, Monitor'
    ],
    correctAnswer: 1,
    explanation: 'NIST AI RMF phases: Map (identify components and attack surfaces), Measure (conduct systematic tests and quantify vulnerabilities), Manage (implement mitigations and continuous monitoring).',
    difficulty: 'advanced',
    category: 'agent-red-teaming',
    subCategory: 'enterprise-framework',
    learningObjectives: ['Apply NIST AI RMF', 'Structure enterprise red teaming programs'],
    relatedConcepts: ['risk-management', 'governance', 'compliance'],
    persona: ['ai-ops-engineer', 'agent-architect', 'business-leader'],
    timeEstimate: 55
  },
  {
    id: 'red-team-a2',
    question: 'What is a "converter composition" in advanced PyRIT attacks?',
    text: 'What is a "converter composition" in advanced PyRIT attacks?',
    options: [
      'Converting attack code to Python',
      'Chaining multiple converters like Base64 → translation → character substitution',
      'Converting attack results to reports',
      'Composing music-based attack payloads'
    ],
    correctAnswer: 1,
    explanation: 'Converter composition chains multiple transformations sequentially - e.g., Base64 encoding, then language translation, then character substitution. This creates attack variants that test different detection boundaries.',
    difficulty: 'advanced',
    category: 'agent-red-teaming',
    subCategory: 'advanced-techniques',
    learningObjectives: ['Implement converter chains', 'Create sophisticated attack variants'],
    relatedConcepts: ['obfuscation', 'evasion-techniques', 'detection-bypass'],
    persona: ['ai-engineer', 'agent-developer'],
    timeEstimate: 60
  },
  {
    id: 'red-team-a3',
    question: 'Which encoding/obfuscation technique is considered an "Easy" attack strategy in the AI Red Teaming Playground?',
    text: 'Which encoding/obfuscation technique is considered an "Easy" attack strategy in the AI Red Teaming Playground?',
    options: [
      'Crescendo multi-turn escalation',
      'Base64, ROT13, or Morse code encoding',
      'Adversarial image perturbation',
      'Function abuse exploitation'
    ],
    correctAnswer: 1,
    explanation: 'Easy attacks use simple encoding like Base64, ROT13, or Morse code to obfuscate malicious intent. These are detected by more sophisticated safety systems but test basic input validation.',
    difficulty: 'advanced',
    category: 'agent-red-teaming',
    subCategory: 'attack-strategies',
    learningObjectives: ['Classify attack complexity', 'Understand obfuscation techniques'],
    relatedConcepts: ['encoding', 'obfuscation', 'input-validation'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 50
  },
  {
    id: 'red-team-a4',
    question: 'How should red teaming integrate with an agent evaluation pipeline?',
    text: 'How should red teaming integrate with an agent evaluation pipeline?',
    options: [
      'Only run red teaming annually during security audits',
      'Connect ASR metrics to evaluation dashboards with threshold alerts triggered after updates',
      'Red teaming should remain separate from evaluation',
      'Only run red teaming before initial deployment'
    ],
    correctAnswer: 1,
    explanation: 'Continuous integration of red teaming ensures ongoing security. ASR metrics should feed into evaluation dashboards, with alerts triggered when attack success rates increase after model or system updates.',
    difficulty: 'advanced',
    category: 'agent-red-teaming',
    subCategory: 'integration',
    learningObjectives: ['Integrate red teaming with CI/CD', 'Implement continuous security testing'],
    relatedConcepts: ['agent-evaluation', 'monitoring', 'devops'],
    persona: ['ai-ops-engineer', 'agent-architect'],
    timeEstimate: 55
  }
];

export const agentRedTeamingTime = agentRedTeamingQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 45),
  0
);
