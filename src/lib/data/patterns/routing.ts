import { PatternData } from './types';
import { SupportRouterVisual } from '@/components/visualization/business-use-cases/SupportRouterVisual';

export const routingPattern: PatternData = {
  id: 'routing',
  name: 'Routing',
  description: 'A smart routing system that directs incoming queries to the most appropriate specialized agent based on content analysis.',
  category: 'Multi-Agent',
  useCases: ['Customer Support Automation', 'Task Triage', 'Specialized Q&A Systems'],
  whenToUse: 'Use Routing when you have multiple, specialized agents and need an intelligent way to direct user queries to the correct one. This pattern is essential for building scalable support systems, complex Q&A platforms, or any application where different agents have different skills.',
  businessUseCase: {
    industry: 'Customer Service',
    description: 'A large telecom company builds a "Smart Support Assistant" using the Routing pattern. When a customer starts a chat, their initial query is sent to a "Router Agent." This agent analyzes the query to determine its intent. If the query is "My bill is wrong," the router sends the conversation to the specialized "Billing Agent." If the query is "My internet is down," it\'s routed to the "Technical Support Agent." For general questions, it goes to an "FAQ Agent." This ensures customers are immediately connected with the agent best equipped to solve their specific problem.',
    visualization: SupportRouterVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a "Smart Support Assistant" using the Routing pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: A front-end chat interface (e.g., Power Virtual Agents), an Azure Function to host the "Router Agent," and separate Azure Functions or Container Apps for each specialized agent (Billing, Tech Support, etc.).
      - Show how the initial message flows to the Router, which then passes the conversation to a specialized agent.

      ### 2. Router Agent: Implementation
      - Provide a Python code example for the Router Agent's logic.
      - Show the prompt that takes the user's query and a list of available agents with their descriptions, and asks the LLM to choose the most appropriate agent.
      - Explain how to use "function calling" to make the LLM's output structured and reliable.

      ### 3. Specialized Agents
      - Provide brief descriptions of the system messages for two specialized agents:
        1.  **BillingAgent:** "You are an expert in all things billing. You can access customer invoices and payment history. Be polite and helpful."
        2.  **TechSupportAgent:** "You are a technical support expert for internet and mobile services. You can access network status tools and diagnostic guides."

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for the router's performance.
      - **Routing Accuracy:** Create a test set of 100 user queries, each with a pre-labeled "correct" agent. What percentage of queries does the Router send to the right agent?
      - **End-to-End Success:** What percentage of conversations are successfully resolved without needing to be re-routed or escalated to a human?
      - **Confidence Scoring:** The Router should also output a confidence score for its decision. Low-confidence routes can be flagged for human review to identify areas for improvement.

      ### 5. Handling Ambiguity & Escalation
      - What happens when the Router is unsure where to send a query?
      - Describe a strategy where the Router can ask the user a clarifying question (e.g., "Are you having a problem with your bill or your internet service?") before making a final routing decision.
      - Explain the process for escalating a conversation to a human agent if the specialized bot fails.
    `
  },
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Query Input', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'analyzer',
      type: 'default',
      data: { label: 'Query Analyzer', nodeType: 'llm' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'router',
      type: 'default',
      data: { label: 'Smart Router', nodeType: 'router' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'agent-1',
      type: 'default',
      data: { label: 'Code Agent', nodeType: 'llm' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'agent-2',
      type: 'default',
      data: { label: 'Data Agent', nodeType: 'llm' },
      position: { x: 700, y: 250 }
    },
    {
      id: 'agent-3',
      type: 'default',
      data: { label: 'Research Agent', nodeType: 'llm' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'agent-4',
      type: 'default',
      data: { label: 'General Agent', nodeType: 'llm' },
      position: { x: 700, y: 450 }
    },
    {
      id: 'load-balancer',
      type: 'default',
      data: { label: 'Load Balancer', nodeType: 'aggregator' },
      position: { x: 900, y: 300 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Response', nodeType: 'output' },
      position: { x: 1100, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'analyzer', animated: true },
    { id: 'e2-3', source: 'analyzer', target: 'router', animated: true },
    { id: 'e3-4', source: 'router', target: 'agent-1', animated: true, label: 'Code' },
    { id: 'e3-5', source: 'router', target: 'agent-2', animated: true, label: 'Data' },
    { id: 'e3-6', source: 'router', target: 'agent-3', animated: true, label: 'Research' },
    { id: 'e3-7', source: 'router', target: 'agent-4', animated: true, label: 'General' },
    { id: 'e4-8', source: 'agent-1', target: 'load-balancer', animated: true },
    { id: 'e5-8', source: 'agent-2', target: 'load-balancer', animated: true },
    { id: 'e6-8', source: 'agent-3', target: 'load-balancer', animated: true },
    { id: 'e7-8', source: 'agent-4', target: 'load-balancer', animated: true },
    { id: 'e8-9', source: 'load-balancer', target: 'output' }
  ],
  codeExample: `// Routing Pattern implementation...`,
  pythonCodeExample: `# Smart Routing implementation...`,
  implementation: [
    'Design query analysis and classification system',
    'Create agent registration and capability management',
    'Implement rule-based and ML-based routing logic',
    'Build load balancing and performance monitoring',
    'Add fallback and error handling mechanisms',
    'Create routing metrics and analytics',
    'Implement adaptive routing based on performance',
    'Add A/B testing for routing strategies'
  ],
  advantages: [
    "Efficiently directs users to the agent best equipped to handle their request.",
    "Improves user satisfaction by reducing transfers and providing more accurate answers.",
    "Allows for the creation of a scalable system with many specialized agents.",
    "Simplifies the design of individual agents, as they can focus on a narrow domain."
  ],
  limitations: [
    "The router itself can be a single point of failure.",
    "If the router misclassifies a query, the user experience is poor.",
    "Requires a well-defined set of agent specializations; may struggle with ambiguous or overlapping domains.",
    "Adds an extra step, which can increase latency."
  ],
  relatedPatterns: [
    "orchestrator-worker",
    "prompt-chaining",
    "multi-agent-systems"
  ]
};