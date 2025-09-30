// LLM Fundamentals Quiz
import { Quiz } from './types';

export const llmFundamentalsQuiz: Quiz = {
  id: 'llm-fundamentals',
  title: 'LLM Fundamentals',
  description: 'Test your understanding of Large Language Models basics',
  difficulty: 'beginner',
  estimatedTime: 10,
  questions: [
    {
      id: 'llm-fund-1',
      question: 'What is a token in the context of LLMs?',
      options: [
        'A password for API access',
        'A chunk of text (word or sub-word) that the model processes',
        'A unit of currency for paying API costs',
        'A type of neural network layer'
      ],
      correctAnswer: 1,
      explanation: 'Tokens are the fundamental units that LLMs process. Text is broken into tokens before being converted to numbers the model can understand. For example, "Hello world" might be tokenized as ["Hello", " world"].',
      difficulty: 'beginner',
      tags: ['tokens', 'fundamentals']
    },
    {
      id: 'llm-fund-2',
      question: 'What is the purpose of the temperature parameter in LLM generation?',
      options: [
        'To control the computational resources used',
        'To set the maximum response length',
        'To control randomness/creativity in outputs',
        'To adjust the training data temperature'
      ],
      correctAnswer: 2,
      explanation: 'Temperature controls randomness: low values (0.0-0.3) produce deterministic responses, while high values (0.8-1.0) produce more creative, varied outputs. Temperature=0 always picks the most likely next token.',
      difficulty: 'beginner',
      tags: ['temperature', 'generation']
    },
    {
      id: 'llm-fund-3',
      question: 'Which of the following is NOT a current limitation of LLMs?',
      options: [
        'They can hallucinate incorrect information',
        'They cannot perform mathematical calculations reliably',
        'They cannot process text longer than their context window',
        'They cannot understand basic grammar and syntax'
      ],
      correctAnswer: 3,
      explanation: 'LLMs are excellent at understanding grammar and syntax. However, they do hallucinate, struggle with math (without tools), and have context window limits. This is why we build agents with tools and external knowledge.',
      difficulty: 'intermediate',
      tags: ['limitations', 'capabilities']
    },
    {
      id: 'llm-fund-4',
      question: 'What is the primary function of the attention mechanism in Transformers?',
      options: [
        'To make the model process faster',
        'To reduce the model size',
        'To determine relationships between tokens in context',
        'To compress the training data'
      ],
      correctAnswer: 2,
      explanation: 'The attention mechanism allows the model to focus on relevant parts of the input when processing each token. It learns which words are related to each other, enabling the model to understand context and generate coherent responses.',
      difficulty: 'intermediate',
      tags: ['attention', 'architecture']
    },
    {
      id: 'llm-fund-5',
      question: 'When choosing between GPT-4 and GPT-3.5-Turbo, which factor is MOST important?',
      options: [
        'The color scheme of your application',
        'Task complexity and reasoning requirements',
        'The programming language you use',
        'The number of users'
      ],
      correctAnswer: 1,
      explanation: 'Task complexity is the primary decision factor. GPT-4 excels at complex reasoning, coding, and creative tasks, while GPT-3.5-Turbo is faster and cheaper for simpler tasks like basic Q&A or classification.',
      difficulty: 'beginner',
      tags: ['model-selection', 'best-practices']
    },
    {
      id: 'llm-fund-6',
      question: 'What happens when you exceed an LLM\'s context window?',
      options: [
        'The model automatically summarizes the input',
        'You receive an error and the request fails',
        'The model processes only the beginning',
        'The model works slower but still processes everything'
      ],
      correctAnswer: 1,
      explanation: 'If your input + output tokens exceed the context window, the API request will fail with an error. You must implement conversation pruning or summarization to stay within limits.',
      difficulty: 'beginner',
      tags: ['context-window', 'limitations']
    },
    {
      id: 'llm-fund-7',
      question: 'Why do we need AI agents when we have powerful LLMs?',
      options: [
        'Agents are cheaper than LLMs',
        'Agents can access real-time data, execute actions, and use tools that LLMs cannot',
        'Agents don\'t use LLMs',
        'Agents are faster than LLMs'
      ],
      correctAnswer: 1,
      explanation: 'LLMs alone are stateless, can\'t access current information, can\'t perform calculations, and can\'t take actions. Agents extend LLMs with tools (API calls, calculations), memory (conversation history), and external knowledge (RAG, search).',
      difficulty: 'beginner',
      tags: ['agents', 'architecture']
    },
    {
      id: 'llm-fund-8',
      question: 'What is the typical cost difference between GPT-4 and GPT-3.5-Turbo per 1K tokens?',
      options: [
        'They cost the same',
        'GPT-4 is about 2-3x more expensive',
        'GPT-4 is about 10-20x more expensive',
        'GPT-3.5-Turbo is more expensive'
      ],
      correctAnswer: 2,
      explanation: 'GPT-4 typically costs 10-20x more than GPT-3.5-Turbo. For example, GPT-4 might be $0.03/1K tokens while GPT-3.5-Turbo is $0.002/1K tokens. This makes model selection critical for cost optimization.',
      difficulty: 'intermediate',
      tags: ['pricing', 'optimization']
    },
    {
      id: 'llm-fund-9',
      question: 'Which embedding model dimension size generally provides better semantic understanding?',
      options: [
        'Smaller is always better (256 dimensions)',
        'Larger is generally better (1536-3072 dimensions)',
        'Dimension size doesn\'t matter',
        'It should match your database size'
      ],
      correctAnswer: 1,
      explanation: 'Larger embedding dimensions can capture more nuanced semantic relationships. For example, text-embedding-3-large (3072 dimensions) typically provides better quality than text-embedding-3-small (1536 dimensions), though it\'s more expensive and slower.',
      difficulty: 'intermediate',
      tags: ['embeddings', 'rag']
    },
    {
      id: 'llm-fund-10',
      question: 'What is a hallucination in the context of LLMs?',
      options: [
        'When the model takes too long to respond',
        'When the model generates plausible-sounding but incorrect information',
        'When the model refuses to answer',
        'When the model repeats the input'
      ],
      correctAnswer: 1,
      explanation: 'Hallucination occurs when an LLM confidently generates false or nonsensical information that sounds plausible. This is why validation, citations, and RAG (to ground responses in real data) are important in production systems.',
      difficulty: 'beginner',
      tags: ['hallucination', 'limitations']
    }
  ]
};
