// @ts-nocheck
// Agent Career Paths quiz questions
import { QuizQuestion } from './types';

export const agentCareerPathsQuestions: QuizQuestion[] = [
  {
    id: 'careers-b1',
    question: 'What is the primary role of an Agent Developer?',
    text: 'What is the primary role of an Agent Developer?',
    options: [
      'Managing AI budgets and vendor relationships',
      'Building and integrating AI agents, tool implementations, and memory systems',
      'Creating marketing materials for AI products',
      'Hiring and managing AI teams'
    ],
    correctAnswer: 1,
    explanation: 'Agent Developers build the actual agent systems—implementing tool integrations, setting up memory and context management, and connecting agents to production environments. They bridge the gap between LLM capabilities and real-world applications.',
    difficulty: 'beginner',
    category: 'agent-career-paths',
    subCategory: 'career-roles',
    learningObjectives: ['Understand Agent Developer role', 'Identify key responsibilities'],
    relatedConcepts: ['agent-architecture', 'agent-integration', 'tool-use'],
    persona: ['agent-developer', 'career-seeker'],
    timeEstimate: 30
  },
  {
    id: 'careers-b2',
    question: 'What salary range is typical for an Agent Architect in 2026?',
    text: 'What salary range is typical for an Agent Architect in 2026?',
    options: [
      '$60,000 - $90,000',
      '$80,000 - $120,000',
      '$150,000 - $250,000',
      '$300,000 - $500,000'
    ],
    correctAnswer: 2,
    explanation: 'Agent Architects, who design multi-agent systems and enterprise architectures, typically earn $150K-$250K. This reflects the strategic importance of the role and the deep expertise required in both AI and systems design.',
    difficulty: 'beginner',
    category: 'agent-career-paths',
    subCategory: 'job-market',
    learningObjectives: ['Understand market compensation', 'Set career expectations'],
    relatedConcepts: ['organizational-enablement', 'talent-development'],
    persona: ['career-seeker', 'business-leader'],
    timeEstimate: 25
  },
  {
    id: 'careers-i1',
    question: 'Which skill progression path leads from Prompt Engineer to Agent Architect?',
    text: 'Which skill progression path leads from Prompt Engineer to Agent Architect?',
    options: [
      'Prompt Engineering → Sales → Management → Architecture',
      'Prompt Engineering → Agent Development → Multi-Agent Systems → Architecture',
      'Prompt Engineering → Marketing → Product → Architecture',
      'Prompt Engineering → Data Science → Research → Architecture'
    ],
    correctAnswer: 1,
    explanation: 'The typical path: 1) Master prompt engineering fundamentals, 2) Learn agent development (tools, memory, integration), 3) Understand multi-agent coordination, 4) Design enterprise-scale architectures. Each level builds on the previous.',
    difficulty: 'intermediate',
    category: 'agent-career-paths',
    subCategory: 'skill-progression',
    learningObjectives: ['Plan career progression', 'Identify skill gaps'],
    relatedConcepts: ['organizational-enablement', 'learning-paths'],
    persona: ['career-seeker', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'careers-i2',
    question: 'What distinguishes an AI Safety Specialist from a traditional security engineer?',
    text: 'What distinguishes an AI Safety Specialist from a traditional security engineer?',
    options: [
      'They only focus on physical security',
      'They specialize in AI-specific risks: prompt injection, hallucination, alignment, and adversarial attacks',
      'They have the same responsibilities',
      'They focus exclusively on data privacy'
    ],
    correctAnswer: 1,
    explanation: 'AI Safety Specialists handle AI-specific threats that traditional security doesn\'t cover: prompt injection attacks, hallucination mitigation, alignment verification, red teaming, and guardrail design. They bridge AI and security domains.',
    difficulty: 'intermediate',
    category: 'agent-career-paths',
    subCategory: 'career-roles',
    learningObjectives: ['Understand AI Safety role', 'Identify unique AI security challenges'],
    relatedConcepts: ['agent-security', 'agent-red-teaming', 'ai-safety-governance'],
    persona: ['career-seeker', 'security-engineer'],
    timeEstimate: 40
  },
  {
    id: 'careers-a1',
    question: 'Which certification path is most valuable for someone targeting Agent Architect roles?',
    text: 'Which certification path is most valuable for someone targeting Agent Architect roles?',
    options: [
      'Project Management Professional (PMP) only',
      'Cloud certifications (AWS/Azure/GCP) + AI/ML certifications + Architecture certifications',
      'Marketing certifications only',
      'General IT certifications only'
    ],
    correctAnswer: 1,
    explanation: 'Agent Architects need a combination: Cloud platforms (for deployment), AI/ML (for understanding models), and architecture certifications (for systems design). Example path: Azure AI Engineer + AWS Solutions Architect + DeepLearning.AI courses.',
    difficulty: 'advanced',
    category: 'agent-career-paths',
    subCategory: 'certifications',
    learningObjectives: ['Plan certification path', 'Invest in valuable credentials'],
    relatedConcepts: ['organizational-enablement', 'professional-development'],
    persona: ['career-seeker', 'agent-developer'],
    timeEstimate: 45
  },
  {
    id: 'careers-a2',
    question: 'What is the key differentiator for AI Product Managers compared to traditional PMs?',
    text: 'What is the key differentiator for AI Product Managers compared to traditional PMs?',
    options: [
      'They only work on AI startups',
      'They must understand probabilistic outputs, evaluation metrics, and the unique UX of AI uncertainty',
      'They focus only on technical implementation',
      'They don\'t need to understand the business side'
    ],
    correctAnswer: 1,
    explanation: 'AI PMs must understand that AI products have probabilistic (not deterministic) outputs, require different success metrics (accuracy, hallucination rate), and need UX that handles uncertainty gracefully. Traditional PM skills aren\'t sufficient.',
    difficulty: 'advanced',
    category: 'agent-career-paths',
    subCategory: 'career-roles',
    learningObjectives: ['Understand AI PM requirements', 'Identify unique AI product challenges'],
    relatedConcepts: ['product-management', 'agent-evaluation', 'ai-product-framework'],
    persona: ['product-manager', 'career-seeker'],
    timeEstimate: 45
  },
  {
    id: 'careers-i3',
    question: 'What is the "Foundation" level in the skill progression framework?',
    text: 'What is the "Foundation" level in the skill progression framework?',
    options: [
      'Leading AI teams of 10+ people',
      'Understanding LLM basics, prompt engineering fundamentals, and basic tool use',
      'Designing enterprise-scale multi-agent systems',
      'Publishing AI research papers'
    ],
    correctAnswer: 1,
    explanation: 'Foundation level covers: Understanding how LLMs work, basic prompt engineering, simple tool calling, and foundational agent concepts. This is the entry point before progressing to Practitioner, Expert, and Leader levels.',
    difficulty: 'intermediate',
    category: 'agent-career-paths',
    subCategory: 'skill-progression',
    learningObjectives: ['Identify foundation skills', 'Assess current skill level'],
    relatedConcepts: ['agentic-prompting-fundamentals', 'agent-architecture'],
    persona: ['career-seeker', 'agent-developer'],
    timeEstimate: 35
  },
  {
    id: 'careers-b3',
    question: 'Which role focuses on monitoring, reliability, and operational excellence for AI agents?',
    text: 'Which role focuses on monitoring, reliability, and operational excellence for AI agents?',
    options: [
      'Prompt Engineer',
      'Agent Ops Engineer',
      'AI Product Manager',
      'Solutions Architect'
    ],
    correctAnswer: 1,
    explanation: 'Agent Ops Engineers own the operational side: monitoring, alerting, reliability engineering, incident response, and capacity planning. They ensure agents run smoothly in production and respond to issues quickly.',
    difficulty: 'beginner',
    category: 'agent-career-paths',
    subCategory: 'career-roles',
    learningObjectives: ['Understand Agent Ops role', 'Identify operational responsibilities'],
    relatedConcepts: ['agent-ops', 'agent-deployment', 'observability'],
    persona: ['career-seeker', 'ai-ops-engineer'],
    timeEstimate: 30
  }
];

export const agentCareerPathsTime = agentCareerPathsQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
