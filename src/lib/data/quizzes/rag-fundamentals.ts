// RAG Fundamentals Quiz
import { Quiz } from './types';

export const ragFundamentalsQuiz: Quiz = {
  id: 'rag-fundamentals',
  title: 'RAG Fundamentals',
  description: 'Test your understanding of Retrieval-Augmented Generation',
  difficulty: 'intermediate',
  estimatedTime: 12,
  questions: [
    {
      id: 'rag-1',
      question: 'What problem does RAG (Retrieval-Augmented Generation) primarily solve?',
      options: [
        'Making LLMs faster',
        'Giving LLMs access to external, up-to-date knowledge beyond training data',
        'Reducing LLM costs',
        'Improving LLM grammar'
      ],
      correctAnswer: 1,
      explanation: 'RAG solves the knowledge limitation problem by retrieving relevant information from external sources and providing it as context to the LLM, allowing it to answer questions about current or proprietary data.',
      difficulty: 'beginner',
      tags: ['rag', 'fundamentals']
    },
    {
      id: 'rag-2',
      question: 'What is the correct order of steps in a RAG pipeline?',
      options: [
        'Generate → Retrieve → Index',
        'Index → Retrieve → Generate',
        'Retrieve → Generate → Index',
        'Generate → Index → Retrieve'
      ],
      correctAnswer: 1,
      explanation: 'RAG workflow: 1) Index documents (chunk → embed → store), 2) Retrieve relevant chunks for query, 3) Generate answer using retrieved context. Indexing is typically done once, while retrieve→generate happens per query.',
      difficulty: 'beginner',
      tags: ['rag', 'pipeline']
    },
    {
      id: 'rag-3',
      question: 'What is an embedding in the context of RAG?',
      options: [
        'A compressed version of the document',
        'A numerical vector representation capturing semantic meaning of text',
        'A summary of the document',
        'A database index'
      ],
      correctAnswer: 1,
      explanation: 'Embeddings are high-dimensional vectors (e.g., 1536 numbers) that represent text semantically. Similar meanings produce similar vectors, enabling semantic search even when exact words don\'t match.',
      difficulty: 'intermediate',
      tags: ['embeddings', 'vectors']
    },
    {
      id: 'rag-4',
      question: 'When should you use RAG instead of fine-tuning?',
      options: [
        'When you need a specific writing style',
        'When knowledge changes frequently or you need citations',
        'When you have unlimited budget',
        'Never, fine-tuning is always better'
      ],
      correctAnswer: 1,
      explanation: 'Use RAG when: knowledge changes frequently, you need source citations, working with large knowledge bases, or budget is limited. Use fine-tuning for: specific style/tone, stable knowledge, or domain-specific terminology.',
      difficulty: 'intermediate',
      tags: ['rag-vs-finetuning', 'decision-making']
    },
    {
      id: 'rag-5',
      question: 'What is the recommended chunk size for RAG document chunking?',
      options: [
        '10-50 tokens (very small)',
        '200-500 tokens with overlap',
        '5000+ tokens (entire documents)',
        'Chunk size doesn\'t matter'
      ],
      correctAnswer: 1,
      explanation: 'Optimal chunk size is typically 200-500 tokens with 50-100 token overlap. This balances: capturing enough context, precise retrieval, staying within LLM limits, and avoiding information overload.',
      difficulty: 'intermediate',
      tags: ['chunking', 'optimization']
    },
    {
      id: 'rag-6',
      question: 'Why is chunk overlap important in RAG systems?',
      options: [
        'To increase storage costs',
        'To ensure context isn\'t lost at chunk boundaries',
        'To make retrieval slower',
        'Overlap is not recommended'
      ],
      correctAnswer: 1,
      explanation: 'Chunk overlap (e.g., 50-100 tokens) prevents losing important context that might be split across chunk boundaries. Without overlap, a relevant passage split between two chunks might not be retrieved.',
      difficulty: 'intermediate',
      tags: ['chunking', 'best-practices']
    },
    {
      id: 'rag-7',
      question: 'What is reranking and why is it useful?',
      options: [
        'Sorting documents alphabetically',
        'Re-scoring retrieved chunks with a specialized model for better relevance',
        'Randomizing results for diversity',
        'Removing duplicate results'
      ],
      correctAnswer: 1,
      explanation: 'Reranking uses a specialized model (like Cohere\'s reranker) to re-score initially retrieved chunks for better relevance. Vector search finds candidates quickly; reranking refines quality.',
      difficulty: 'advanced',
      tags: ['reranking', 'optimization']
    },
    {
      id: 'rag-8',
      question: 'What is a common pitfall when implementing RAG?',
      options: [
        'Retrieving too much irrelevant context that overwhelms the LLM',
        'Making the system too fast',
        'Using too few tokens',
        'Having too many citations'
      ],
      correctAnswer: 0,
      explanation: 'Retrieving too much context (e.g., top-10 chunks when top-3 would suffice) can overwhelm the LLM with noise, reduce answer quality, and waste tokens. Start with top-3 and increase only if needed.',
      difficulty: 'intermediate',
      tags: ['pitfalls', 'optimization']
    },
    {
      id: 'rag-9',
      question: 'Which vector database feature is most important for production RAG systems?',
      options: [
        'The color of the dashboard',
        'Scalability, fast similarity search, and metadata filtering',
        'The number of supported programming languages',
        'The logo design'
      ],
      correctAnswer: 1,
      explanation: 'Production RAG needs: fast similarity search (ANN algorithms), scalability (millions of vectors), metadata filtering (date, source, category), and reliable uptime. Performance and reliability matter most.',
      difficulty: 'advanced',
      tags: ['vector-databases', 'production']
    },
    {
      id: 'rag-10',
      question: 'How should you handle stale embeddings when documents are updated?',
      options: [
        'Ignore it, embeddings never expire',
        'Delete old embeddings and create new ones for updated documents',
        'Keep both old and new embeddings',
        'Manually update each embedding'
      ],
      correctAnswer: 1,
      explanation: 'When documents are updated, delete the old embeddings and create new ones. Implement incremental indexing to update only changed documents. Stale embeddings will return outdated information to users.',
      difficulty: 'intermediate',
      tags: ['maintenance', 'updates']
    }
  ]
};
