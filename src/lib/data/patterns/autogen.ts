import { PatternData } from './types';
import { SupplyChainBotVisual } from '@/components/visualization/business-use-cases/SupplyChainBotVisual';

export const autogenPattern: PatternData = {
  id: 'autogen-multi-agent',
  name: 'AutoGen Multi-Agent',
  description: 'Microsoft AutoGen framework for building multi-agent conversational AI systems with role-based collaboration.',
  category: 'Multi-Agent',
  useCases: [
    'Collaborative Problem Solving',
    'Code Generation and Review',
    'Research and Analysis',
    'Complex Workflow Automation'
  ],
  whenToUse: 'Use AutoGen when you need multiple AI agents to collaborate through natural conversation, especially for complex tasks that benefit from different agent specializations, code execution capabilities, and human-in-the-loop interactions.',
  nodes: [
    {
      id: 'user-proxy',
      type: 'input',
      data: { label: 'User Proxy Agent', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'assistant1',
      type: 'default',
      data: { label: 'Assistant Agent 1', nodeType: 'llm' },
      position: { x: 300, y: 100 }
    },
    {
      id: 'assistant2',
      type: 'default',
      data: { label: 'Assistant Agent 2', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'group-chat',
      type: 'default',
      data: { label: 'Group Chat Manager', nodeType: 'planner' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Solution', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-gc', source: 'user-proxy', target: 'group-chat', animated: true },
    { id: 'egc-a1', source: 'group-chat', target: 'assistant1', animated: true },
    { id: 'egc-a2', source: 'group-chat', target: 'assistant2', animated: true },
    { id: 'ea1-gc', source: 'assistant1', target: 'group-chat', animated: true },
    { id: 'ea2-gc', source: 'assistant2', target: 'group-chat', animated: true },
    { id: 'egc-out', source: 'group-chat', target: 'output' }
  ],
  evaluation: `Evaluating an AutoGen system goes beyond individual agent performance and focuses on the system's collective output and collaboration dynamics.
- **System-Level Goal Completion:** Did the group of agents successfully solve the user's high-level task? This is the most critical metric.
- **Collaboration Efficiency:** Analyze the conversation logs. Was the communication efficient? Did agents get stuck in loops? Metrics include the number of rounds to completion and the cost (token usage).
- **Role Adherence:** Did each agent stick to its designated role (e.g., did the Coder only write code, and the Critic only provide feedback)? This can be scored by an "LLM as Judge".
- **Solution Quality:** The final artifact (e.g., code, report) should be evaluated for quality. For code, this involves running tests, static analysis, and checking for bugs (similar to the SWE-bench benchmark).
- **Contribution Analysis:** Assess the impact of each agent on the final solution. Was any agent redundant or counter-productive?`,
  businessUseCase: {
    industry: 'Logistics & Supply Chain',
    description: 'A global logistics company implements a "Supply Chain Disruption Manager" using the AutoGen framework. When a "Monitoring Agent" detects a disruption (e.g., a port closure) from a live data feed, it initiates a group chat. A "Planner Agent" analyzes the situation and proposes alternative routes. A "Logistics Agent" checks the feasibility and cost of the new routes by calling external carrier APIs. Finally, a "Communications Agent" drafts and sends notifications to affected clients. This multi-agent collaboration allows the company to react to disruptions in minutes instead of hours, minimizing delays and improving customer satisfaction.',
    visualization: SupplyChainBotVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a resilient "Supply Chain Disruption Manager" using the AutoGen framework on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure Event Hub to ingest real-time disruption data, an Azure Function App to trigger the AutoGen system, a pool of agents running in Azure Container Apps for scalability, and Azure Service Bus for reliable inter-agent communication.
      - Show how the GroupChatManager orchestrates the conversation flow.

      ### 2. Agent Roles & System Messages
      - Provide the detailed system messages for four key agents:
        1.  **MonitorAgent:** "Your sole job is to parse incoming events and initiate the group chat with a clear summary of the disruption."
        2.  **PlannerAgent:** "You are a logistics expert. Your job is to create and evaluate alternative transportation plans."
        3.  **LogisticsAgent:** "You are a tool-using agent. You must use the provided APIs to check route feasibility, cost, and transit times. Do not speculate."
        4.  **CommunicationsAgent:** "You are a communications specialist. Draft clear, concise notifications for customers based on the final, approved plan."

      ### 3. Inter-Agent Communication & State Management
      - Explain how to manage the shared state of the group chat, potentially using an external Redis cache connected to the Azure Container Apps.
      - Discuss the importance of the \`speaker_selection_method\` in the GroupChat to control the conversation flow (e.g., using a custom function instead of round-robin).

      ### 4. Evaluation Strategy for Multi-Agent Systems
      - Detail the evaluation plan for this collaborative system.
      - **System-Level Success:** Did the system produce a viable and cost-effective new logistics plan? (Binary outcome).
      - **Collaboration Metrics:** Track the number of conversation turns, the sentiment of the conversation (was there confusion?), and the time to resolution.
      - **Role-Specific Metrics:** For the LogisticsAgent, measure its Tool Call Accuracy. For the CommunicationsAgent, use an LLM-as-Judge to score the quality of its final notification.

      ### 5. Reliability and Scalability
      - Discuss how to make the system resilient to individual agent failures.
      - Explain how to use Azure Container Apps to scale the number of agent instances based on the volume of disruption events.
    `
  },
  codeExample: `// AutoGen Multi-Agent System...`,
  pythonCodeExample: `# AutoGen Multi-Agent Implementation...`,
  implementation: [
    'Install AutoGen framework and configure Azure OpenAI connection',
    'Define agent roles and system messages for specialized behaviors',
    'Create conversable agents with appropriate LLM configurations',
    'Set up group chat or sequential conversation patterns',
    'Implement code execution capabilities for user proxy agents',
    'Add human-in-the-loop controls for critical decisions',
    'Configure conversation termination conditions',
    'Implement logging and monitoring for agent interactions',
    'Deploy to Azure Container Apps for scalable execution',
    'Set up CI/CD pipelines for agent system updates'
  ],
  advantages: [
    "Facilitates complex problem-solving by enabling collaboration between specialized agents.",
    "The conversational nature of agent interaction is intuitive and powerful.",
    "Supports human-in-the-loop, allowing for human oversight and intervention.",
    "Can automate complex workflows that require multiple steps and different skills."
  ],
  limitations: [
    "Managing complex multi-agent conversations can be challenging.",
    "The system can be prone to conversational loops or inefficient communication.",
    "Debugging the collective behavior of multiple agents is difficult.",
    "Can be more expensive than single-agent systems due to the high volume of LLM calls."
  ],
  relatedPatterns: [
    "orchestrator-worker",
    "agent-to-agent",
    "multi-agent-systems"
  ]
};