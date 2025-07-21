import { PatternData } from './types';
import { InsuranceClaimVisual } from '@/components/visualization/business-use-cases/InsuranceClaimVisual';

export const orchestratorWorkerPattern: PatternData = {
  id: 'orchestrator-worker',
  name: 'Orchestrator-Worker',
  description: 'A hierarchical pattern where an orchestrator agent coordinates multiple specialized worker agents to execute a complex workflow.',
  category: 'Multi-Agent',
  useCases: ['Parallel Processing', 'Task Decomposition', 'Complex Workflow Automation'],
  whenToUse: 'Use Orchestrator-Worker when a complex task can be decomposed into independent sub-tasks that can be handled by specialized agents. It is ideal for automating structured business processes, parallel data processing, or any scenario requiring a "divide and conquer" approach.',
  businessUseCase: {
    industry: 'Insurance',
    description: 'An insurance company automates its claims processing using the Orchestrator-Worker pattern. When a new claim is submitted, an "Orchestrator Agent" receives it and breaks down the process. It then assigns sub-tasks to specialized "Worker Agents" in parallel: one worker validates the claimant\'s policy, another analyzes the submitted damage photos, and a third runs a background check for potential fraud. Once all workers have completed their tasks, the Orchestrator aggregates their findings and makes a final decision to approve, deny, or flag the claim for human review.',
    visualization: InsuranceClaimVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing an "Automated Insurance Claim Processing" system using the Orchestrator-Worker pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure Service Bus (for the main claims queue), an "Orchestrator" Azure Function, multiple "Worker" Azure Functions (each a specialized agent), Azure AI Vision (for damage analysis), and Azure Cosmos DB (to store claim status).
      - Illustrate how the Orchestrator distributes tasks and aggregates results.

      ### 2. Orchestrator Agent: Implementation
      - Provide a Python code example for the Orchestrator Azure Function.
      - Show how the Orchestrator receives a claim, decomposes it into sub-tasks (ValidatePolicy, AssessDamage, CheckFraud), and sends messages to the respective worker queues on Azure Service Bus.
      - Include logic for tracking the status of all sub-tasks.

      ### 3. Worker Agents: Implementation
      - Provide Python code stubs for two of the Worker Azure Functions:
        1.  **DamageAnalysisWorker:** Receives a task, calls Azure AI Vision to analyze images, and returns a structured damage report.
        2.  **FraudDetectionWorker:** Receives a task, queries internal and external databases, and returns a fraud risk score.

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for this system.
      - **System Accuracy:** What percentage of claims does the system process correctly (i.e., its decision matches that of a human expert panel)?
      - **Worker Accuracy:** Measure the individual accuracy of each worker agent (e.g., Did the vision model correctly identify the type of damage?).
      - **Efficiency Metrics:** Track the end-to-end processing time per claim and the cost per claim.

      ### 5. Human-in-the-Loop (HITL)
      - Explain the workflow for escalating complex or low-confidence claims to a human expert.
      - Describe how to build a simple UI (e.g., in Power Apps) where a human reviewer can see the aggregated worker results and make the final call.
    `
  },
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Task Input', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'orchestrator',
      type: 'default',
      data: { label: 'Orchestrator', nodeType: 'planner' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'task-decomposer',
      type: 'default',
      data: { label: 'Task Decomposer', nodeType: 'router' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'worker-1',
      type: 'default',
      data: { label: 'Worker 1', nodeType: 'executor' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'worker-2',
      type: 'default',
      data: { label: 'Worker 2', nodeType: 'executor' },
      position: { x: 700, y: 300 }
    },
    {
      id: 'worker-3',
      type: 'default',
      data: { label: 'Worker 3', nodeType: 'executor' },
      position: { x: 700, y: 400 }
    },
    {
      id: 'result-aggregator',
      type: 'default',
      data: { label: 'Result Aggregator', nodeType: 'aggregator' },
      position: { x: 900, y: 300 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Final Result', nodeType: 'output' },
      position: { x: 1100, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'orchestrator', animated: true },
    { id: 'e2-3', source: 'orchestrator', target: 'task-decomposer', animated: true },
    { id: 'e3-4', source: 'task-decomposer', target: 'worker-1', animated: true },
    { id: 'e3-5', source: 'task-decomposer', target: 'worker-2', animated: true },
    { id: 'e3-6', source: 'task-decomposer', target: 'worker-3', animated: true },
    { id: 'e4-7', source: 'worker-1', target: 'result-aggregator', animated: true },
    { id: 'e5-7', source: 'worker-2', target: 'result-aggregator', animated: true },
    { id: 'e6-7', source: 'worker-3', target: 'result-aggregator', animated: true },
    { id: 'e7-8', source: 'result-aggregator', target: 'output' },
    { id: 'e2-7', source: 'orchestrator', target: 'result-aggregator', animated: true, label: 'Monitor' }
  ],
  codeExample: `// Orchestrator-Worker Pattern implementation...`,
  pythonCodeExample: `# Orchestrator-Worker Pattern implementation...`,
  implementation: [
    'Design task decomposition and dependency analysis',
    'Create worker registration and capability management',
    'Implement parallel task execution with dependency resolution',
    'Build result aggregation and synthesis logic',
    'Add load balancing and worker selection',
    'Create monitoring and status reporting',
    'Implement error handling and recovery',
    'Add performance optimization and scaling'
  ]
};