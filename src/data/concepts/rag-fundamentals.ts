// Retrieval-Augmented Generation (RAG) Concept
import { MockConcept } from '../mockConcepts';

export const ragConcept: MockConcept = {
  id: "rag-fundamentals",
  title: "Retrieval-Augmented Generation (RAG)",
  description: "Extend your AI agents with external knowledge using RAG. Learn how to combine vector databases, embeddings, and LLMs to build agents that access real-time, domain-specific information.",
  category: "patterns",
  difficulty: "intermediate",
  tags: ["rag", "embeddings", "vector-db", "knowledge"],
  learning_objectives: [
    "Understand how RAG solves LLM knowledge limitations",
    "Implement vector embeddings and similarity search",
    "Build a RAG pipeline with chunking and retrieval",
    "Choose between RAG and fine-tuning",
    "Optimize retrieval quality and performance"
  ],
  content: "RAG (Retrieval-Augmented Generation) gives LLMs access to external, up-to-date knowledge. Three-step pipeline: 1) Index (chunk documents, create embeddings, store in vector DB), 2) Retrieve (convert query to embedding, find similar chunks), 3) Generate (LLM answers using retrieved context). Key concepts: embeddings (semantic vectors), chunking (200-500 tokens with overlap), vector databases (Pinecone, Weaviate, Chroma), reranking (improve relevance), RAG vs fine-tuning decision matrix. Optimization: better chunking, hybrid search, prompt engineering, source citations.",
  prerequisites: ["llm-fundamentals", "getting-started-agents"],
  estimated_time: 60,
  videos: [
    {
      id: "rag-architecture-explained",
      title: "RAG Architecture Explained",
      url: "https://www.youtube.com/watch?v=T-D1OfcDW1M",
      platform: "youtube",
      duration: 25,
      difficulty: "intermediate",
      description: "Complete RAG architecture with code examples"
    },
    {
      id: "rag-chunking-strategies",
      title: "Advanced RAG: Chunking & Retrieval Optimization",
      url: "https://www.youtube.com/watch?v=qN_2fnOPY-M",
      platform: "youtube",
      duration: 32,
      difficulty: "advanced",
      description: "Deep dive into chunking strategies, reranking, and hybrid search techniques",
      timestamps: [
        { time: "0:00", label: "Introduction to Advanced RAG" },
        { time: "6:00", label: "Chunking Strategies" },
        { time: "14:00", label: "Hybrid Search (Keywords + Vectors)" },
        { time: "22:00", label: "Reranking for Better Relevance" },
        { time: "28:00", label: "Production Optimization" }
      ]
    }
  ],
  code_examples: [
    {
      id: "simple-rag-pipeline",
      title: "Simple RAG Pipeline",
      language: "typescript",
      code: "async function simpleRAG(question: string): Promise<string> {\n  // 1. Create query embedding\n  const queryEmbedding = await createEmbedding(question);\n  \n  // 2. Search vector database\n  const results = await vectorDB.search(queryEmbedding, { topK: 3 });\n  \n  // 3. Extract context\n  const context = results.map(r => r.metadata.text).join('\\n\\n');\n  \n  // 4. Generate answer with context\n  const response = await openai.chat.completions.create({\n    model: 'gpt-3.5-turbo',\n    messages: [{\n      role: 'user',\n      content: `Context: ${context}\\n\\nQuestion: ${question}`\n    }]\n  });\n  \n  return response.choices[0].message.content;\n}",
      description: "Basic RAG pipeline with embeddings and retrieval"
    }
  ]
};
