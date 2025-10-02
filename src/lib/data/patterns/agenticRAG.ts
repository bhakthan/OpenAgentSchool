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
  codeExample: `// Corporate Policy Assistant - Agentic RAG (TypeScript)
// Simulated implementation for live runner (no real services)
export interface RetrievedChunk { id: string; content: string; score: number; source: string; page?: number; }

export const executeAgenticRAG = async (query: string, maxCycles = 3) => {
  let cycle = 0;
  let done = false;
  let finalAnswer = '';
  const trace: string[] = [];
  const refinedQueries: string[] = [];
  const supportingChunks: RetrievedChunk[] = [];

  // Tools (simulated)
  const tools = {
    reflect: async (q: string) => {
      return \`Reflection: Core intent='parental leave policy length'; Entities=['parental leave','duration']; Refined='parental leave duration eligibility'\`;
    },
    hybridSearch: async (q: string): Promise<RetrievedChunk[]> => {
      return [
        { id: 'p1', content: 'Parental leave: Full-time employees receive 16 weeks paid.', score: 0.89, source: 'HR_Policy.pdf', page: 12 },
        { id: 'p2', content: 'Eligibility: Employees > 1 year tenure qualify for full benefit.', score: 0.82, source: 'HR_Policy.pdf', page: 13 },
        { id: 'p3', content: 'Regional variation: EU adds 2 transition weeks.', score: 0.55, source: 'Regional_Supplement.pdf', page: 4 }
      ];
    },
    rankAndFilter: async (chunks: RetrievedChunk[]) => {
      return chunks.filter(c => c.score > 0.6).sort((a,b)=> b.score - a.score).slice(0,2);
    },
    synthesizeWithCitations: async (q: string, chunks: RetrievedChunk[]) => {
      const base = 'Employees with >1 year tenure receive 16 weeks paid parental leave';
      const citation = chunks.map(c => \`[\${c.source} p.\${c.page}]\`).join(' ');
      return base + ' ' + citation;
    }
  } as const;

  while (!done && cycle < maxCycles) {
    cycle++;
    trace.push(\`--- Cycle \${cycle} ---\`);

    // Reflection
    trace.push('Reflecting on query...');
    const reflection = await tools.reflect(query);
    trace.push(reflection);
    const refined = reflection.match(/Refined='(.*?)'/)?.[1] || query;
    refinedQueries.push(refined);

    // Retrieval
    trace.push(\`Hybrid search with: \${refined}\`);
    const rawChunks = await tools.hybridSearch(refined);
    trace.push(\`Retrieved \${rawChunks.length} chunks.\`);

    // Ranking
    const ranked = await tools.rankAndFilter(rawChunks);
    trace.push(\`Ranked+Filtered => \${ranked.length} chunks retained.\`);
    supportingChunks.push(...ranked);

    // Synthesis
    const draft = await tools.synthesizeWithCitations(query, ranked);
    trace.push('Draft answer: ' + draft);

    // Simple completion heuristic
    if (draft.toLowerCase().includes('weeks')) {
      finalAnswer = draft;
      done = true;
      trace.push('Completion condition met.');
    } else {
      trace.push('Continuing to next cycle for refinement.');
    }
  }

  return {
    status: done ? 'success' : 'incomplete',
    cycles: cycle,
    answer: finalAnswer,
    refinedQueries,
    supportingChunks,
    trace
  };
};`,
  pythonCodeExample: `# Corporate Policy Assistant - Agentic RAG (Python, simulated)
from typing import List, Dict, Any

class AgenticRAGPolicyAssistant:
    def __init__(self, client=None, model: str = "gpt-4"):
        self.client = client
        self.model = model

    async def execute(self, query: str, max_cycles: int = 3) -> Dict[str, Any]:
        cycle = 0
        done = False
        final_answer = ""
        trace: List[str] = []
        refined_queries: List[str] = []
        supporting_chunks: List[Dict[str, Any]] = []

        async def reflect(q: str) -> str:
            return "Reflection: Core intent='parental leave policy length'; Entities=['parental leave','duration']; Refined='parental leave duration eligibility'"

        async def hybrid_search(q: str) -> List[Dict[str, Any]]:
            return [
                {"id": "p1", "content": "Parental leave: Full-time employees receive 16 weeks paid.", "score": 0.89, "source": "HR_Policy.pdf", "page": 12},
                {"id": "p2", "content": "Eligibility: Employees > 1 year tenure qualify for full benefit.", "score": 0.82, "source": "HR_Policy.pdf", "page": 13},
                {"id": "p3", "content": "Regional variation: EU adds 2 transition weeks.", "score": 0.55, "source": "Regional_Supplement.pdf", "page": 4}
            ]

        async def rank_and_filter(chunks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
            kept = [c for c in chunks if c["score"] > 0.6]
            return sorted(kept, key=lambda c: c["score"], reverse=True)[:2]

        async def synthesize_with_citations(q: str, chunks: List[Dict[str, Any]]) -> str:
            base = "Employees with >1 year tenure receive 16 weeks paid parental leave"
            citation = " ".join([f"[{c['source']} p.{c['page']}]" for c in chunks])
            return base + " " + citation

        while not done and cycle < max_cycles:
            cycle += 1
            trace.append(f"--- Cycle {cycle} ---")

            trace.append("Reflecting on query...")
            reflection = await reflect(query)
            trace.append(reflection)
            refined = "parental leave duration eligibility"
            refined_queries.append(refined)

            trace.append(f"Hybrid search with: {refined}")
            raw_chunks = await hybrid_search(refined)
            trace.append(f"Retrieved {len(raw_chunks)} chunks.")

            ranked = await rank_and_filter(raw_chunks)
            trace.append(f"Ranked+Filtered => {len(ranked)} chunks retained.")
            supporting_chunks.extend(ranked)

            draft = await synthesize_with_citations(query, ranked)
            trace.append("Draft answer: " + draft)

            if "weeks" in draft.lower():
                final_answer = draft
                done = True
                trace.append("Completion condition met.")
            else:
                trace.append("Continuing refinement.")

        return {
            "status": "success" if done else "incomplete",
            "cycles": cycle,
            "answer": final_answer,
            "refinedQueries": refined_queries,
            "supportingChunks": supporting_chunks,
            "trace": trace
        }
`,
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
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 days',
    complexityReduction: 'Very High - Azure AI Search and LangChain provide production-ready retrieval, chunking, and vector indexing out-of-box',
    reusabilityScore: 10,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Most widely adopted agent pattern for knowledge retrieval, Q&A, documentation search, customer support',
      'Architecture Templates - Microsoft Agent Framework, LangChain, LlamaIndex provide complete RAG implementations',
      'Operational Instrumentation - Azure AI Search provides retrieval latency, relevance scores, and cache hit rate metrics',
      'Evaluation Automation - Answer correctness, retrieval precision/recall, and hallucination detection metrics standard'
    ]
  }
};