// Getting Started with AI Agents
import { MockConcept } from '../mockConcepts';

export const gettingStartedConcept: MockConcept = {
  id: "getting-started-agents",
  title: "Getting Started with AI Agents",
  description: "Build your first AI agent from scratch. Learn the essential components, set up your development environment, and create a working agent in under an hour.",
  category: "fundamentals",
  difficulty: "beginner",
  tags: ["getting-started", "tutorial", "basics", "first-agent"],
  learning_objectives: [
    "Set up a development environment for AI agents",
    "Understand the core components of an agent",
    "Build and test your first working agent",
    "Avoid common beginner mistakes",
    "Know where to go next in your learning journey"
  ],
  content: "Learn to build your first AI agent with three core components: LLM (brain for processing), Tools (hands for actions), and Memory (context for state). Step-by-step: environment setup, understanding agent architecture, implementing a simple support agent with function calling, testing, and common pitfalls (unbounded history, no error handling, trusting LLM outputs, ignoring costs). Includes practical code examples and best practices for production readiness.",
  prerequisites: ["llm-fundamentals"],
  estimated_time: 45,
  videos: [
    {
      id: "build-first-agent-ms",
      title: "Build Your First AI Agent",
      url: "https://learn.microsoft.com/shows/ai-agents-quickstart",
      platform: "microsoft",
      duration: 25,
      difficulty: "beginner",
      description: "Step-by-step tutorial for building your first agent"
    },
    {
      id: "agent-fundamentals-tutorial",
      title: "AI Agents Fundamentals: From Zero to Production",
      url: "https://www.youtube.com/watch?v=F8NKVhkZZWI",
      platform: "youtube",
      duration: 38,
      difficulty: "beginner",
      description: "Complete beginner tutorial covering environment setup, first agent, and deployment",
      timestamps: [
        { time: "0:00", label: "Introduction & Setup" },
        { time: "8:00", label: "Agent Architecture Basics" },
        { time: "16:00", label: "Building Your First Agent" },
        { time: "27:00", label: "Adding Tools & Memory" },
        { time: "34:00", label: "Testing & Debugging" }
      ]
    }
  ],
  code_examples: [
    {
      id: "simple-support-agent",
      title: "Simple Support Agent",
      language: "typescript",
      code: "import OpenAI from 'openai';\n\nclass SupportAgent {\n  private openai: OpenAI;\n  private history: Array<{role: string, content: string}> = [];\n  \n  constructor(apiKey: string) {\n    this.openai = new OpenAI({ apiKey });\n    this.history.push({\n      role: 'system',\n      content: 'You are a helpful customer support agent.'\n    });\n  }\n  \n  async chat(message: string): Promise<string> {\n    this.history.push({ role: 'user', content: message });\n    \n    const response = await this.openai.chat.completions.create({\n      model: 'gpt-3.5-turbo',\n      messages: this.history\n    });\n    \n    const reply = response.choices[0].message.content || '';\n    this.history.push({ role: 'assistant', content: reply });\n    \n    return reply;\n  }\n}",
      description: "Basic agent with conversation memory"
    }
  ]
};
