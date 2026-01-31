// @ts-nocheck
// Industry-Specific Agents quiz questions
import { QuizQuestion } from './types';

export const industryAgentsQuestions: QuizQuestion[] = [
  {
    id: 'industry-b1',
    question: 'Which regulation is most critical for Healthcare AI agents in the United States?',
    text: 'Which regulation is most critical for Healthcare AI agents in the United States?',
    options: [
      'PCI-DSS',
      'HIPAA (Health Insurance Portability and Accountability Act)',
      'SOX (Sarbanes-Oxley)',
      'FCC regulations'
    ],
    correctAnswer: 1,
    explanation: 'HIPAA governs the protection of patient health information (PHI). Healthcare agents must implement strict access controls, audit logging, encryption, and cannot store or transmit PHI without proper safeguards.',
    difficulty: 'beginner',
    category: 'industry-agents',
    subCategory: 'healthcare',
    learningObjectives: ['Understand healthcare compliance', 'Identify HIPAA requirements'],
    relatedConcepts: ['agent-security', 'ai-safety-governance', 'data-protection'],
    persona: ['agent-architect', 'business-leader'],
    timeEstimate: 30
  },
  {
    id: 'industry-b2',
    question: 'What is the primary regulatory concern for AI agents in Financial Services?',
    text: 'What is the primary regulatory concern for AI agents in Financial Services?',
    options: [
      'Entertainment value',
      'Explainability, audit trails, and regulatory compliance (SEC, FINRA, Basel III)',
      'Social media engagement',
      'Marketing effectiveness'
    ],
    correctAnswer: 1,
    explanation: 'Financial regulators require AI systems to be explainable (why did the agent make this recommendation?), maintain complete audit trails, and comply with SEC, FINRA, Basel III, and anti-money laundering (AML) regulations.',
    difficulty: 'beginner',
    category: 'industry-agents',
    subCategory: 'finance',
    learningObjectives: ['Understand financial compliance', 'Identify explainability requirements'],
    relatedConcepts: ['agent-ethics', 'responsible-ai-governance', 'audit-logging'],
    persona: ['agent-architect', 'business-leader'],
    timeEstimate: 35
  },
  {
    id: 'industry-i1',
    question: 'What unique challenge do Legal AI agents face regarding confidentiality?',
    text: 'What unique challenge do Legal AI agents face regarding confidentiality?',
    options: [
      'They must publish all information publicly',
      'Attorney-client privilege must be preserved, and agents cannot compromise case confidentiality',
      'They only work with public court records',
      'Confidentiality is not a concern in legal AI'
    ],
    correctAnswer: 1,
    explanation: 'Legal agents must protect attorney-client privilege absolutely. This means no training on client data, no leaking case information across matters, and careful handling of sensitive documents. Breaches can result in disbarment.',
    difficulty: 'intermediate',
    category: 'industry-agents',
    subCategory: 'legal',
    learningObjectives: ['Understand legal confidentiality', 'Design for privilege protection'],
    relatedConcepts: ['agent-security', 'data-protection', 'professional-ethics'],
    persona: ['agent-architect', 'legal-professional'],
    timeEstimate: 45
  },
  {
    id: 'industry-i2',
    question: 'What is FERPA and why does it matter for Education AI agents?',
    text: 'What is FERPA and why does it matter for Education AI agents?',
    options: [
      'A grading algorithm standard',
      'Family Educational Rights and Privacy Act - protects student educational records',
      'A federal exam requirement',
      'A curriculum framework'
    ],
    correctAnswer: 1,
    explanation: 'FERPA protects student educational records. Education agents must: not share student data without consent, provide access to students/parents, and maintain secure records. Agents tutoring students must comply.',
    difficulty: 'intermediate',
    category: 'industry-agents',
    subCategory: 'education',
    learningObjectives: ['Understand FERPA requirements', 'Protect student data'],
    relatedConcepts: ['data-protection', 'ai-safety-governance', 'privacy'],
    persona: ['agent-architect', 'educator'],
    timeEstimate: 40
  },
  {
    id: 'industry-a1',
    question: 'What is the key safety consideration for Manufacturing AI agents controlling physical equipment?',
    text: 'What is the key safety consideration for Manufacturing AI agents controlling physical equipment?',
    options: [
      'Aesthetic design of the interface',
      'Human safety - agents must have fail-safe mechanisms and cannot endanger workers',
      'Marketing the products',
      'Maximizing production speed regardless of safety'
    ],
    correctAnswer: 1,
    explanation: 'Manufacturing agents controlling equipment must prioritize human safety above all. This requires: fail-safe mechanisms (stop on uncertainty), human override capabilities, safety sensor integration, and strict operational boundaries.',
    difficulty: 'advanced',
    category: 'industry-agents',
    subCategory: 'manufacturing',
    learningObjectives: ['Design for physical safety', 'Implement fail-safe mechanisms'],
    relatedConcepts: ['agentic-robotics-integration', 'agent-security', 'safety-engineering'],
    persona: ['agent-architect', 'manufacturing-engineer'],
    timeEstimate: 50
  },
  {
    id: 'industry-a2',
    question: 'What cross-industry pattern is most important for all regulated industries?',
    text: 'What cross-industry pattern is most important for all regulated industries?',
    options: [
      'Maximum automation with minimal oversight',
      'Comprehensive audit logging, explainability, and human-in-the-loop for high-stakes decisions',
      'Hiding AI usage from regulators',
      'Prioritizing speed over compliance'
    ],
    correctAnswer: 1,
    explanation: 'All regulated industries share these requirements: 1) Audit logging (who did what, when), 2) Explainability (why did the agent decide this), 3) Human-in-the-loop for consequential decisions, 4) Compliance documentation.',
    difficulty: 'advanced',
    category: 'industry-agents',
    subCategory: 'cross-industry',
    learningObjectives: ['Apply cross-industry patterns', 'Design for regulatory compliance'],
    relatedConcepts: ['responsible-ai-governance', 'agent-ethics', 'audit-logging'],
    persona: ['agent-architect', 'compliance-officer'],
    timeEstimate: 50
  },
  {
    id: 'industry-i3',
    question: 'What is the primary use case for AI agents in Retail?',
    text: 'What is the primary use case for AI agents in Retail?',
    options: [
      'Manufacturing products',
      'Customer service, personalized recommendations, and inventory management',
      'Regulatory compliance only',
      'Physical store construction'
    ],
    correctAnswer: 1,
    explanation: 'Retail agents excel at: Customer service (24/7 support, returns, FAQs), personalized product recommendations (based on browsing/purchase history), and inventory optimization (demand forecasting, reorder triggers).',
    difficulty: 'intermediate',
    category: 'industry-agents',
    subCategory: 'retail',
    learningObjectives: ['Identify retail use cases', 'Understand retail agent patterns'],
    relatedConcepts: ['agentic-commerce-ap2', 'customer-experience', 'recommendation-systems'],
    persona: ['business-leader', 'product-manager'],
    timeEstimate: 35
  },
  {
    id: 'industry-b3',
    question: 'Which industry requires the strongest audit trails for AI agent decisions?',
    text: 'Which industry requires the strongest audit trails for AI agent decisions?',
    options: [
      'Entertainment',
      'Healthcare and Financial Services (due to regulatory requirements)',
      'Social media',
      'Gaming'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare (HIPAA, FDA) and Financial Services (SEC, FINRA) have the strictest audit requirements. Every agent decision affecting patient care or financial transactions must be logged with full context for potential regulatory review.',
    difficulty: 'beginner',
    category: 'industry-agents',
    subCategory: 'cross-industry',
    learningObjectives: ['Understand audit requirements', 'Prioritize compliance by industry'],
    relatedConcepts: ['agent-ops', 'observability', 'regulatory-compliance'],
    persona: ['agent-architect', 'compliance-officer'],
    timeEstimate: 30
  }
];

export const industryAgentsTime = industryAgentsQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
