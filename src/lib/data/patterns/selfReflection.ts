import { PatternData } from './types';
import { HealthcareScribeVisual } from '@/components/visualization/business-use-cases/HealthcareScribeVisual';

export const selfReflectionPattern: PatternData = {
  id: 'self-reflection',
  name: 'Self-Reflection',
  description: 'Agents that can reflect on their own outputs and improve them through self-critique and iteration.',
  category: 'Advanced',
  useCases: ['Content Quality Improvement', 'Error Correction', 'Iterative Refinement'],
  whenToUse: 'Use Self-Reflection when output quality is critical and can benefit from iterative improvement. This pattern is ideal for content creation, code review, academic writing, or any scenario where the agent should evaluate and refine its own work to meet higher standards.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'generator',
      type: 'default',
      data: { label: 'Generator', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'critic',
      type: 'default',
      data: { label: 'Critic', nodeType: 'evaluator' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'refiner',
      type: 'default',
      data: { label: 'Refiner', nodeType: 'llm' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'generator', animated: true },
    { id: 'e2-3', source: 'generator', target: 'critic', animated: true },
    { id: 'e2-4', source: 'generator', target: 'refiner', animated: true },
    { id: 'e3-4', source: 'critic', target: 'refiner', animated: true },
    { id: 'e4-2', source: 'refiner', target: 'generator', animated: true, label: 'Iterate' },
    { id: 'e4-5', source: 'refiner', target: 'output' }
  ],
  evaluation: `Evaluation of a Self-Reflection agent is multi-faceted. The quality of the final output is paramount, but the reflection process itself is also key.
- **Final Output Quality:** Use an "LLM as Judge" to score the final, refined output against the initial output. The score improvement is a direct measure of the reflection process's value.
- **Critique Quality:** How effective is the self-critique? A good critique is specific, actionable, and correctly identifies flaws. This can be evaluated by humans or a high-capability "judge" LLM.
- **Convergence Rate:** How many iterations does it take to reach an "APPROVED" state? Faster convergence is a sign of an efficient reflection process.
- **Score Accuracy:** If the agent self-scores, how well does its internal score correlate with an external evaluator's score? This measures the agent's self-awareness.`,
  businessUseCase: {
    industry: 'Healthcare',
    description: 'An AI-powered clinical scribe uses the Self-Reflection pattern to improve the quality of medical notes. After transcribing a doctor-patient conversation, the agent generates an initial draft. Then, its "Critic" persona reviews the draft against a rubric checking for clinical accuracy, use of proper medical terminology, and completeness. The "Refiner" persona then rewrites the note to address the critique. This cycle repeats until the note is deemed accurate and compliant, significantly reducing the administrative workload on physicians and improving the quality of patient records.',
    visualization: HealthcareScribeVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a HIPAA-compliant "AI Clinical Scribe" using the Self-Reflection pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram for a HIPAA-compliant solution on Azure.
      - Components: Azure AI Speech for transcription, a secure Azure Function App to host the agent, Azure Key Vault for secrets, and Azure Cosmos DB for storing notes with encryption at rest and in transit.
      - Emphasize the network security, including private endpoints and VNet integration.

      ### 2. Self-Reflection Agent: Implementation
      - Provide a Python code example for the core self-reflection loop (Generate, Critique, Refine).
      - Show the structure of the "Critique" prompt, including specific checks for medical accuracy, billing codes (e.g., ICD-10), and clarity.
      - Detail how to manage the iteration history.

      ### 3. Data Handling & Compliance
      - Explain how to de-identify Protected Health Information (PHI) using Azure AI Language's PII detection before sending data to the LLM, and how to re-identify it in the secure environment.
      - Discuss logging and audit trails for HIPAA compliance.

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for this high-stakes environment.
      - **Clinical Accuracy:** Use a panel of medical experts to review a sample of final notes and compare them to the source transcript (gold standard).
      - **Metric:** Define a "Note Quality Score" (NQS) based on a rubric, and measure the score improvement from the initial draft to the final version.
      - **Efficiency:** Track the number of iterations and time required to produce a final note.

      ### 5. Fine-Tuning & Customization
      - Discuss the strategy for fine-tuning a base model (like GPT-4) on a private, curated dataset of high-quality medical notes to improve its performance and reduce reflection cycles.
      - Explain the importance of using a private Azure OpenAI endpoint for this process.
    `
  },
  codeExample: `// Self-Reflection implementation...`,
  pythonCodeExample: `# Self-Reflection implementation...`,
  implementation: [
    'Create generation-critique-refinement cycle',
    'Implement quality scoring and approval criteria',
    'Build feedback integration and improvement logic',
    'Add iteration tracking and history management',
    'Create termination conditions for quality thresholds',
    'Implement different critique perspectives',
    'Add meta-cognitive reasoning capabilities',
    'Build learning from previous iterations'
  ],
  advantages: [
    "Significantly improves the quality and accuracy of the final output.",
    "Can correct its own errors without human intervention.",
    "The critique process provides transparency into how the agent is improving its work.",
    "Can be adapted to meet very high or specific quality standards."
  ],
  limitations: [
    "Increases latency and cost due to the iterative, multi-step process.",
    "The quality of the self-critique is crucial; a poor critic cannot lead to good refinement.",
    "May get stuck in refinement loops if the criteria for completion are not well-defined.",
    "Requires sophisticated prompt engineering to create effective generator and critic personas."
  ],
  relatedPatterns: [
    "react-agent",
    "agent-evaluation",
    "prompt-chaining"
  ]
};