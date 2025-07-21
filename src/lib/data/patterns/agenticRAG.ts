import { PatternData } from './types';
import { CorporatePolicyBotVisual } from '@/components/visualization/business-use-cases/CorporatePolicyBotVisual';

export const agenticRAGPattern: PatternData = {
  id: 'agentic-rag',
  name: 'Agentic RAG',
  description: 'An advanced form of Retrieval-Augmented Generation where an agent intelligently plans, refines queries, and verifies information against a knowledge base.',
  category: 'Core',
  useCases: ['Corporate Knowledge Systems', 'Technical Support Bots', 'Compliance & Legal Queries'],
  whenToUse: 'Use Agentic RAG when you need highly reliable, verifiable answers from a specific set of documents. It excels over basic RAG by actively reasoning about the query, refining its search strategy, and reducing hallucinations by grounding its response in retrieved facts.',
  businessUseCase: {
    industry: 'Corporate / Human Resources',
    description: 'A large enterprise deploys a "Corporate Policy Assistant" to help employees with HR and compliance questions. When an employee asks about parental leave, the Agentic RAG system first *reflects* on the query, identifying key terms like "parental leave," "eligibility," and "duration." It then *refines* its search query and retrieves relevant sections from the company\'s HR policy documents stored in a vector database. Finally, it synthesizes a clear, concise answer, citing the specific document and page number, ensuring the information is accurate and trustworthy.',
    visualization: CorporatePolicyBotVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a "Corporate Policy Assistant" using the Agentic RAG pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure AI Search (as the vector and text search index), Azure Blob Storage (for the source policy documents), an Azure Function App (to host the agent logic), and Azure AI Language (for PII detection).
      - Show the data flow: from an employee's question in Microsoft Teams to the final, cited answer.

      ### 2. Agentic RAG Core: Implementation
      - Provide a Python code example for the agent's core logic.
      - Show the "reflection" step where the agent breaks down the user's query.
      - Show the "search" step where the agent formulates a query for Azure AI Search, possibly using a hybrid search (vector + keyword).
      - Show the "synthesis" step where the agent combines the retrieved chunks into a coherent answer, including citations.

      ### 3. Indexing Pipeline
      - Describe the process for ingesting and chunking the HR policy documents.
      - Explain how to use Azure Document Intelligence to parse PDFs and maintain their structure (e.g., tables, headers).
      - Provide a code snippet for generating embeddings using an Azure OpenAI model and indexing the chunks into Azure AI Search.

      ### 4. Evaluation Strategy (RAG Triad)
      - Detail an evaluation plan based on the "RAG Triad":
        1.  **Context Relevance:** How relevant are the retrieved document chunks to the user's query?
        2.  **Groundedness:** Does the final answer stay faithful to the retrieved context? (i.e., no hallucinations).
        3.  **Answer Relevance:** How well does the final answer address the user's actual question?
      - Explain how to use an LLM-as-Judge to automate the scoring of these three aspects.

      ### 5. Security & Access Control
      - Discuss how to implement document-level security in Azure AI Search to ensure employees can only query policies relevant to their role or region.
      - Explain how to use Azure Active Directory for authenticating users and passing their identity to the search index.
    `
  },
  nodes: [
    {
      id: 'query',
      type: 'input',
      data: { label: 'Query', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'agent',
      type: 'default',
      data: { label: 'Agent', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'retriever',
      type: 'default',
      data: { label: 'Retriever', nodeType: 'tool' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'ranker',
      type: 'default',
      data: { label: 'Ranker', nodeType: 'evaluator' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'synthesizer',
      type: 'default',
      data: { label: 'Synthesizer', nodeType: 'aggregator' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 900, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'query', target: 'agent', animated: true },
    { id: 'e2-3', source: 'agent', target: 'retriever', animated: true },
    { id: 'e2-4', source: 'agent', target: 'ranker', animated: true },
    { id: 'e3-5', source: 'retriever', target: 'synthesizer' },
    { id: 'e4-5', source: 'ranker', target: 'synthesizer' },
    { id: 'e5-6', source: 'synthesizer', target: 'output' }
  ],
  codeExample: `// Agentic RAG implementation...`,
  pythonCodeExample: `# Agentic RAG implementation...`,
  implementation: [
    'Set up query analysis and intent detection',
    'Implement query refinement based on analysis',
    'Create multi-stage document retrieval system',
    'Build intelligent document ranking mechanism',
    'Develop response synthesis with source attribution',
    'Add relevance scoring and filtering',
    'Implement feedback loops for query improvement',
    'Add caching for frequently accessed documents'
  ],
  advantages: [
    "Reduces hallucinations by grounding responses in retrieved facts.",
    "Provides more accurate and trustworthy answers by verifying against a knowledge base.",
    "Can answer questions about proprietary or very recent information not in the LLM's training data.",
    "The agentic approach allows for more complex reasoning and query strategies."
  ],
  limitations: [
    "Performance is highly dependent on the quality of the knowledge base.",
    "Can be more complex and costly to implement than standard RAG.",
    "May struggle if the answer requires synthesizing information from many different documents.",
    "Retrieval can be slow, increasing latency."
  ],
  relatedPatterns: [
    "react-agent",
    "deep-researcher",
    "self-reflection"
  ]
};