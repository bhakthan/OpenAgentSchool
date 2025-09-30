// LLM Fundamentals Concept
import { MockConcept } from '../mockConcepts';

export const llmFundamentalsConcept: MockConcept = {
  id: "llm-fundamentals",
  title: "LLM Fundamentals",
  description: "Understand the building blocks of Large Language Models. Learn how they work, their capabilities, limitations, and how to choose the right model for your needs.",
  category: "fundamentals",
  difficulty: "beginner",
  tags: ["llm", "fundamentals", "models", "basics"],
  learning_objectives: [
    "Understand how Large Language Models work",
    "Learn about tokenization, attention mechanisms, and generation",
    "Identify LLM capabilities and limitations",
    "Choose appropriate models for different tasks",
    "Understand context windows and token limits"
  ],
  content: "Large Language Models (LLMs) are neural networks trained on vast text data. Key topics: tokenization (breaking text into tokens), attention mechanisms (understanding word relationships), generation (one token at a time), context windows (token limits), temperature (randomness control), model selection (GPT-4 vs GPT-3.5), capabilities (text generation, Q&A, summarization), and limitations (hallucinations, no real-time data, poor math without tools). Understanding LLMs is essential for building effective AI agents.",
  prerequisites: [],
  estimated_time: 30,
  videos: [
    {
      id: "llm-basics-3b1b",
      title: "How Large Language Models Work",
      url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
      platform: "youtube",
      duration: 15,
      difficulty: "beginner",
      description: "Visual explanation of transformers and attention mechanisms"
    },
    {
      id: "llm-fundamentals-karpathy",
      title: "LLM Fundamentals by Andrej Karpathy",
      url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
      platform: "youtube",
      duration: 45,
      difficulty: "intermediate",
      description: "Deep dive into tokenization and training"
    }
  ],
  code_examples: [
    {
      id: "first-llm-call",
      title: "Your First LLM API Call",
      language: "typescript",
      code: "import OpenAI from 'openai';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nasync function callLLM(prompt: string) {\n  const response = await openai.chat.completions.create({\n    model: 'gpt-3.5-turbo',\n    messages: [\n      { role: 'system', content: 'You are a helpful assistant.' },\n      { role: 'user', content: prompt }\n    ],\n    temperature: 0.7,\n    max_tokens: 500\n  });\n  return response.choices[0].message.content;\n}",
      description: "Basic LLM API call with OpenAI SDK"
    }
  ]
};
