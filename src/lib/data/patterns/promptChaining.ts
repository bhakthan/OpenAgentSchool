import { PatternData } from './types';
import { MarketingCampaignVisual } from '@/components/visualization/business-use-cases/MarketingCampaignVisual';

export const promptChainingPattern: PatternData = {
  id: 'prompt-chaining',
  name: 'Prompt Chaining',
  description: 'A simple and powerful pattern that decomposes a task into a sequence of steps, where the output of one LLM call becomes the input for the next.',
  category: 'Core',
  useCases: ['Structured Content Generation', 'Data Transformation Pipelines', 'Step-by-Step Reasoning'],
  whenToUse: 'Employ Prompt Chaining when a complex task can be broken down into a clear, linear sequence of sub-tasks. This pattern is excellent for structured workflows like transforming data from one format to another, generating a report from raw data, or any process where each step builds directly on the previous one.',
  businessUseCase: {
    industry: 'E-commerce & Marketing',
    description: 'An e-commerce company uses Prompt Chaining to generate personalized marketing emails. The process starts with a customer\'s profile and purchase history. The first prompt in the chain analyzes this data to infer the customer\'s style preferences. The second prompt takes these preferences and suggests specific products from the catalog. The final prompt takes the product suggestions and drafts a compelling, personalized email. This simple, sequential workflow transforms raw customer data into a ready-to-send marketing campaign.',
    visualization: MarketingCampaignVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a "Personalized Marketing Campaign Generator" using the Prompt Chaining pattern with Azure services.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure Logic Apps (to orchestrate the chain), Azure Functions (to wrap each LLM call), and Azure OpenAI Service (for the LLM).
      - Show the linear flow of data from the initial customer profile to the final email content.

      ### 2. Prompt Chain Implementation
      - Provide the specific prompts for each of the three steps in the chain:
        1.  **StyleAnalysisPrompt:** Takes customer data (JSON) as input and outputs a summary of their style preferences (e.g., "prefers hiking gear, brand-conscious").
        2.  **ProductSuggestionPrompt:** Takes the style preferences as input and outputs a list of product SKUs from a provided catalog snippet.
        3.  **EmailDraftingPrompt:** Takes the product list and customer name as input and outputs the final, ready-to-send email copy.

      ### 3. State Management & Error Handling
      - Explain how Azure Logic Apps manages the state (the output of each step) and passes it to the next step in the chain.
      - Describe a simple error handling strategy. For example, if the "ProductSuggestionPrompt" returns no products, how does the chain terminate gracefully?

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for this sequential pipeline.
      - **End-to-End Quality:** Use an LLM-as-Judge to score the final email based on a rubric (e.g., "Is it personalized? Is the tone appropriate? Is it grammatically correct?").
      - **Per-Step Validation:** For each step, define a simple validation rule. For example, the output of the "ProductSuggestionPrompt" should be valid JSON containing existing SKUs.
      - **Business Metrics:** The ultimate measure of success is the email\'s open rate and click-through rate (CTR).

      ### 5. Cost & Performance
      - Discuss the trade-offs of this pattern. While simple, it can be slower and more expensive than a single, complex prompt.
      - Provide guidance on when to use Prompt Chaining versus a single, more complex prompt.
    `
  },
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 100 }
    },
    {
      id: 'llm1',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 250, y: 100 }
    },
    {
      id: 'gate',
      type: 'default',
      data: { label: 'Gate', nodeType: 'router' },
      position: { x: 400, y: 100 }
    },
    {
      id: 'llm2',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 550, y: 50 }
    },
    {
      id: 'llm3',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 700, y: 50 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 850, y: 50 }
    },
    {
      id: 'fail',
      type: 'output',
      data: { label: 'Fail', nodeType: 'output' },
      position: { x: 550, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'llm1', animated: true },
    { id: 'e2-3', source: 'llm1', target: 'gate', animated: true },
    { id: 'e3-4', source: 'gate', target: 'llm2' },
    { id: 'e4-5', source: 'llm2', target: 'llm3' },
    { id: 'e5-6', source: 'llm3', target: 'output' },
    { id: 'e3-7', source: 'gate', target: 'fail' }
  ],
  codeExample: `// Prompt Chaining implementation...`,
  pythonCodeExample: `# Prompt Chaining implementation...`,
  implementation: [
    'Design sequential step workflow with clear dependencies',
    'Create individual prompt templates for each step',
    'Implement output validation and quality gates',
    'Build error handling and retry mechanisms',
    'Add step tracking and progress monitoring',
    'Create conditional branching based on intermediate results',
    'Implement rollback mechanisms for failed steps',
    'Add logging and debugging capabilities'
  ],
  advantages: [
    "Simple to implement and debug, as each step is isolated.",
    "Breaks down complex tasks into manageable, logical sub-problems.",
    "Allows for easy modification or replacement of individual steps in the chain.",
    "Provides a clear, transparent workflow that is easy to understand."
  ],
  limitations: [
    "Can be slow due to the sequential nature and multiple LLM calls.",
    "Errors in early steps can propagate and ruin the entire chain.",
    "Not suitable for tasks that require parallel processing or complex, non-linear reasoning.",
    "Can be more expensive than a single, well-crafted prompt for simpler tasks."
  ],
  relatedPatterns: [
    "react-agent",
    "routing",
    "orchestrator-worker"
  ]
};