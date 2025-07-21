import { PatternData } from './types';
import { MediaAnalysisVisual } from '@/components/visualization/business-use-cases/MediaAnalysisVisual';

export const parallelizationPattern: PatternData = {
  id: 'parallelization',
  name: 'Parallelization',
  description: 'Executing multiple agentic tasks concurrently to improve throughput, reduce latency, or aggregate diverse perspectives.',
  category: 'Core',
  useCases: ['High-Throughput Data Processing', 'Content Moderation', 'Ensemble Methods & Voting'],
  whenToUse: 'Use Parallelization when a task can be broken into many identical, independent sub-units. It is perfect for processing large volumes of data (e.g., analyzing thousands of documents), running multiple evaluations simultaneously, or implementing ensemble methods where multiple agents attempt the same task and their outputs are aggregated or voted on to improve accuracy.',
  businessUseCase: {
    industry: 'Media & Entertainment',
    description: 'A social media company uses the Parallelization pattern for real-time content moderation. As thousands of live video streams are broadcast simultaneously, the system spawns a dedicated "Moderator Agent" for each stream. Each agent analyzes its assigned stream in parallel, checking for violations of the platform\'s safety policies. If a violation is detected, the agent can flag the stream for human review or automatically take it down. This parallel approach allows the platform to scale its moderation efforts to handle massive, concurrent workloads that would be impossible for human teams to manage alone.',
    visualization: MediaAnalysisVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a "Live Content Moderation" system using the Parallelization pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed, scalable architecture diagram.
      - Components: Azure Media Services (to ingest live streams), Azure Event Grid (to notify the system of new streams), and Azure Container Apps (to dynamically scale worker agents).
      - Show how a new stream triggers the creation of a new containerized agent instance.

      ### 2. Worker Agent: Implementation
      - Provide a Python code example for the "Moderator Agent".
      - The agent's code should connect to a video stream, capture frames periodically, and send them to a multimodal model (like GPT-4o) for analysis.
      - Show the prompt used to ask the model if a given frame violates any safety policies (e.g., "Does this image contain violence or hate speech?").

      ### 3. Scalability & Orchestration
      - Explain how to configure Azure Container Apps with KEDA (Kubernetes Event-driven Autoscaling) to automatically scale the number of moderator agents up or down based on the number of active video streams in Azure Media Services.
      - Discuss the role of a lightweight orchestrator or "spawner" function that listens to the Event Grid and initiates new agent instances.

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for this real-time system.
      - **Accuracy:** Measure the precision and recall of the moderation agents against a human-labeled dataset of video clips.
      - **Latency:** What is the average time from a policy violation occurring on stream to the agent flagging it?
      - **Cost:** Track the cost per hour of video stream moderation.

      ### 5. Human-in-the-Loop for Appeals
      - Describe the workflow for when a user appeals a moderation decision.
      - The flagged video segment and the agent's reasoning should be queued for review by a human moderation team in a dedicated portal.
    `
  },
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'llm1',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 50 }
    },
    {
      id: 'llm2',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'llm3',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 250 }
    },
    {
      id: 'aggregator',
      type: 'default',
      data: { label: 'Aggregator', nodeType: 'aggregator' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'llm1', animated: true },
    { id: 'e1-3', source: 'input', target: 'llm2', animated: true },
    { id: 'e1-4', source: 'input', target: 'llm3', animated: true },
    { id: 'e2-5', source: 'llm1', target: 'aggregator' },
    { id: 'e3-5', source: 'llm2', target: 'aggregator' },
    { id: 'e4-5', source: 'llm3', target: 'aggregator' },
    { id: 'e5-6', source: 'aggregator', target: 'output' }
  ],
  codeExample: `// Parallelization implementation...`,
  pythonCodeExample: `# Parallelization implementation...`,
  implementation: [
    'Set up parallel task execution framework',
    'Define multiple LLM calls with same input but different perspectives',
    'Implement concurrent execution using Promise.all or asyncio.gather',
    'Create aggregation logic to combine multiple outputs',
    'Add error handling for individual task failures',
    'Implement result validation and quality checks',
    'Design consensus mechanisms for conflicting outputs',
    'Add monitoring and performance tracking'
  ],
  advantages: [
    "Dramatically improves throughput and reduces latency for divisible tasks.",
    "Enables ensemble methods, where aggregating results from multiple agents can improve accuracy and robustness.",
    "Scales well for large-volume data processing tasks.",
    "Can explore multiple solution paths simultaneously."
  ],
  limitations: [
    "Not suitable for tasks that are inherently sequential.",
    "Can be resource-intensive and costly due to running multiple agents at once.",
    "Requires an aggregator or consensus mechanism to combine the results, which can add complexity.",
    "Handling errors and failures in individual parallel tasks can be difficult."
  ],
  relatedPatterns: [
    "orchestrator-worker",
    "agent-evaluation",
    "routing"
  ]
};