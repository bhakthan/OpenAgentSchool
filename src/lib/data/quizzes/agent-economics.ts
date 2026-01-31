// @ts-nocheck
// Agent Economics quiz questions
import { QuizQuestion } from './types';

export const agentEconomicsQuestions: QuizQuestion[] = [
  {
    id: 'economics-b1',
    question: 'What is typically the largest cost component in running production AI agents?',
    text: 'What is typically the largest cost component in running production AI agents?',
    options: [
      'Hardware infrastructure',
      'LLM API tokens (input and output)',
      'Developer salaries',
      'Cloud storage'
    ],
    correctAnswer: 1,
    explanation: 'LLM tokens typically represent 40-70% of agent operating costs, especially for agents handling many requests. Input tokens (prompts + context) and output tokens (responses) are billed separately, with output tokens usually more expensive.',
    difficulty: 'beginner',
    category: 'agent-economics',
    subCategory: 'cost-breakdown',
    learningObjectives: ['Identify major cost drivers', 'Understand token pricing'],
    relatedConcepts: ['agent-deployment', 'cost-optimization', 'llm-selection'],
    persona: ['business-leader', 'product-manager', 'agent-architect'],
    timeEstimate: 30
  },
  {
    id: 'economics-b2',
    question: 'What is Agent ROI?',
    text: 'What is Agent ROI?',
    options: [
      'Return on Investment - the ratio of net benefits to total agent costs',
      'Rate of Integration - how fast agents integrate with systems',
      'Risk of Implementation - the likelihood of project failure',
      'Range of Intelligence - the cognitive capabilities of agents'
    ],
    correctAnswer: 0,
    explanation: 'Agent ROI = (Business Value Generated - Total Costs) / Total Costs × 100%. It measures whether your agent investment is paying off. A positive ROI means the agent is generating more value than it costs to build and operate.',
    difficulty: 'beginner',
    category: 'agent-economics',
    subCategory: 'roi-framework',
    learningObjectives: ['Calculate agent ROI', 'Quantify business value'],
    relatedConcepts: ['strategy-portfolio-management', 'business-value', 'cost-benefit'],
    persona: ['business-leader', 'product-manager'],
    timeEstimate: 30
  },
  {
    id: 'economics-i1',
    question: 'In outcome-based pricing, what determines the cost?',
    text: 'In outcome-based pricing, what determines the cost?',
    options: [
      'Number of API calls made',
      'Amount of compute resources used',
      'Successful business outcomes achieved (e.g., resolved tickets, completed sales)',
      'Monthly subscription fee'
    ],
    correctAnswer: 2,
    explanation: 'Outcome-based pricing charges based on results, not activity. Examples: $5 per resolved support ticket, 2% of completed sales. This aligns incentives—you only pay when the agent delivers real value.',
    difficulty: 'intermediate',
    category: 'agent-economics',
    subCategory: 'pricing-models',
    learningObjectives: ['Understand outcome-based pricing', 'Align costs with value'],
    relatedConcepts: ['product-management', 'business-models', 'value-pricing'],
    persona: ['business-leader', 'product-manager', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'economics-i2',
    question: 'What is Cost per Resolution (CPR) in agent unit economics?',
    text: 'What is Cost per Resolution (CPR) in agent unit economics?',
    options: [
      'The price of the LLM API per request',
      'Total operating costs divided by number of successfully completed tasks',
      'The cost of hiring a human to do the same task',
      'The monthly infrastructure bill'
    ],
    correctAnswer: 1,
    explanation: 'CPR = Total Agent Costs / Successful Resolutions. It tells you how much each completed task actually costs. Compare CPR to human costs and revenue per task to understand agent profitability.',
    difficulty: 'intermediate',
    category: 'agent-economics',
    subCategory: 'unit-economics',
    learningObjectives: ['Calculate CPR', 'Compare agent vs human costs'],
    relatedConcepts: ['agent-evaluation', 'metrics', 'cost-analysis'],
    persona: ['business-leader', 'ai-ops-engineer', 'product-manager'],
    timeEstimate: 45
  },
  {
    id: 'economics-a1',
    question: 'When should you BUILD an agent in-house vs BUY a commercial solution?',
    text: 'When should you BUILD an agent in-house vs BUY a commercial solution?',
    options: [
      'Always build to have full control',
      'Always buy to minimize development costs',
      'Build when you have unique requirements, proprietary data advantages, or core competency needs; Buy for standard use cases',
      'Build for small projects, Buy for large projects'
    ],
    correctAnswer: 2,
    explanation: 'Build when: 1) Unique requirements not met by vendors, 2) Proprietary data creates competitive advantage, 3) Agent is core to your business. Buy when: Standard use case, faster time-to-value needed, limited AI team.',
    difficulty: 'advanced',
    category: 'agent-economics',
    subCategory: 'make-vs-buy',
    learningObjectives: ['Apply make vs buy framework', 'Evaluate build vs buy tradeoffs'],
    relatedConcepts: ['strategy-portfolio-management', 'ecosystem-partnerships', 'competitive-advantage'],
    persona: ['business-leader', 'agent-architect', 'product-manager'],
    timeEstimate: 50
  },
  {
    id: 'economics-a2',
    question: 'What is Contribution Margin in agent economics?',
    text: 'What is Contribution Margin in agent economics?',
    options: [
      'The total revenue generated by the agent',
      'Revenue per task minus variable costs per task',
      'The percentage of tasks the agent contributes to',
      'The agent\'s share of the total system workload'
    ],
    correctAnswer: 1,
    explanation: 'Contribution Margin = Revenue per Task - Variable Costs per Task. A positive margin means each task contributes to covering fixed costs. Target >60% margin for sustainable agent economics.',
    difficulty: 'advanced',
    category: 'agent-economics',
    subCategory: 'unit-economics',
    learningObjectives: ['Calculate contribution margin', 'Set margin targets'],
    relatedConcepts: ['product-management', 'financial-planning', 'profitability'],
    persona: ['business-leader', 'product-manager'],
    timeEstimate: 50
  },
  {
    id: 'economics-i3',
    question: 'Which pricing model best aligns vendor and customer incentives for agent value?',
    text: 'Which pricing model best aligns vendor and customer incentives for agent value?',
    options: [
      'Per-seat licensing',
      'Flat monthly subscription',
      'Outcome-based or hybrid (base + outcome bonus)',
      'Pay-per-API-call'
    ],
    correctAnswer: 2,
    explanation: 'Outcome-based pricing (or hybrid models) align incentives best: the vendor only makes money when the agent delivers real results. This motivates vendors to optimize for quality, not just volume.',
    difficulty: 'intermediate',
    category: 'agent-economics',
    subCategory: 'pricing-models',
    learningObjectives: ['Choose appropriate pricing model', 'Align vendor incentives'],
    relatedConcepts: ['product-management', 'vendor-selection', 'contract-negotiation'],
    persona: ['business-leader', 'product-manager'],
    timeEstimate: 40
  },
  {
    id: 'economics-b3',
    question: 'What hidden costs are often overlooked when budgeting for agents?',
    text: 'What hidden costs are often overlooked when budgeting for agents?',
    options: [
      'Only LLM API costs matter',
      'Observability, human escalation, ongoing evaluation, and prompt engineering time',
      'Hardware is the only hidden cost',
      'There are no hidden costs in cloud deployments'
    ],
    correctAnswer: 1,
    explanation: 'Hidden costs include: Observability tools (10-20% of infra), human escalation for failures (10-30% handling rate), ongoing evaluation and testing, prompt engineering iterations, and security/compliance overhead.',
    difficulty: 'beginner',
    category: 'agent-economics',
    subCategory: 'cost-breakdown',
    learningObjectives: ['Identify hidden costs', 'Budget realistically'],
    relatedConcepts: ['agent-ops', 'agent-evaluation', 'project-planning'],
    persona: ['business-leader', 'product-manager', 'ai-ops-engineer'],
    timeEstimate: 35
  }
];

export const agentEconomicsTime = agentEconomicsQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
