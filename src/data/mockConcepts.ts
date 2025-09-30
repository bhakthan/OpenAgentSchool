// Mock Concepts Data for Testing
// This provides static test data until Knowledge Service concept endpoints are implemented

export interface MockConcept {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  learning_objectives: string[];
  content: string;
  prerequisites: string[];
  estimated_time: number;
}

export const MOCK_CONCEPTS: MockConcept[] = [
  {
    id: "agent-architecture",
    title: "Agent Architecture Patterns",
    description: "Core architectural patterns for building AI agents including ReAct, Chain-of-Thought, and Tool-Using agents. Learn how to structure agent systems for reliability and scalability.",
    category: "architecture",
    difficulty: "intermediate",
    tags: ["architecture", "patterns", "design"],
    learning_objectives: [
      "Understand ReAct and CoT patterns",
      "Design scalable agent systems",
      "Implement tool-using agents"
    ],
    content: "Agent architecture defines how AI agents are structured and organized...",
    prerequisites: ["llm-fundamentals"],
    estimated_time: 45
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Fundamentals",
    description: "Master the art of crafting effective prompts for Large Language Models. Learn techniques for few-shot learning, chain-of-thought prompting, and prompt optimization.",
    category: "fundamentals",
    difficulty: "beginner",
    tags: ["prompts", "llm", "fundamentals"],
    learning_objectives: [
      "Write clear and effective prompts",
      "Use few-shot examples",
      "Apply chain-of-thought techniques"
    ],
    content: "Prompt engineering is the practice of designing inputs to elicit desired outputs from LLMs...",
    prerequisites: [],
    estimated_time: 30
  },
  {
    id: "tool-calling",
    title: "Tool Calling & Function Execution",
    description: "Enable your AI agents to interact with external tools and APIs. Learn function calling patterns, error handling, and orchestration strategies.",
    category: "patterns",
    difficulty: "intermediate",
    tags: ["tools", "functions", "integration"],
    learning_objectives: [
      "Implement function calling",
      "Handle tool execution errors",
      "Orchestrate multi-tool workflows"
    ],
    content: "Tool calling allows agents to extend their capabilities beyond text generation...",
    prerequisites: ["prompt-engineering"],
    estimated_time: 60
  },
  {
    id: "agent-evaluation",
    title: "Agent Evaluation & Testing",
    description: "Comprehensive strategies for evaluating agent performance. Learn about benchmarks, metrics, and testing frameworks for production AI systems.",
    category: "evaluation",
    difficulty: "advanced",
    tags: ["testing", "metrics", "quality"],
    learning_objectives: [
      "Define evaluation metrics",
      "Build test suites",
      "Benchmark agent performance"
    ],
    content: "Evaluating AI agents requires both quantitative metrics and qualitative assessment...",
    prerequisites: ["agent-architecture", "tool-calling"],
    estimated_time: 90
  },
  {
    id: "agent-security",
    title: "AI Agent Security & Safety",
    description: "Protect your AI agents from prompt injection, jailbreaks, and other security threats. Implement safety guardrails and monitoring.",
    category: "security",
    difficulty: "advanced",
    tags: ["security", "safety", "guardrails"],
    learning_objectives: [
      "Prevent prompt injection attacks",
      "Implement safety guardrails",
      "Monitor agent behavior"
    ],
    content: "Security is critical when deploying AI agents in production environments...",
    prerequisites: ["agent-architecture"],
    estimated_time: 75
  },
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Collaboration",
    description: "Build systems where multiple AI agents work together. Learn communication protocols, task distribution, and conflict resolution strategies.",
    category: "architecture",
    difficulty: "advanced",
    tags: ["multi-agent", "collaboration", "distributed"],
    learning_objectives: [
      "Design multi-agent systems",
      "Implement agent communication",
      "Coordinate distributed tasks"
    ],
    content: "Multi-agent systems enable complex problem solving through agent collaboration...",
    prerequisites: ["agent-architecture", "tool-calling"],
    estimated_time: 120
  },
  {
    id: "react-pattern",
    title: "ReAct: Reasoning + Acting",
    description: "Master the ReAct pattern that combines reasoning traces with action execution. Learn to build agents that think step-by-step while taking actions.",
    category: "patterns",
    difficulty: "intermediate",
    tags: ["react", "reasoning", "patterns"],
    learning_objectives: [
      "Understand ReAct framework",
      "Implement reasoning loops",
      "Combine thought and action"
    ],
    content: "ReAct interleaves reasoning and acting, enabling agents to be more transparent and debuggable...",
    prerequisites: ["prompt-engineering"],
    estimated_time: 45
  },
  {
    id: "memory-management",
    title: "Agent Memory Systems",
    description: "Implement short-term and long-term memory for your AI agents. Learn storage strategies, retrieval techniques, and context management.",
    category: "architecture",
    difficulty: "intermediate",
    tags: ["memory", "storage", "context"],
    learning_objectives: [
      "Design memory architectures",
      "Implement context windows",
      "Optimize retrieval systems"
    ],
    content: "Effective memory management allows agents to maintain context across interactions...",
    prerequisites: ["agent-architecture"],
    estimated_time: 60
  },
  {
    id: "fine-tuning",
    title: "Fine-Tuning Fundamentals",
    description: "Stop overtraining—choose the lowest intervention (SFT → DPO → RFT) that proves incremental lift. Learn supervised fine-tuning, preference optimization, and reinforcement techniques.",
    category: "advanced",
    difficulty: "advanced",
    tags: ["fine-tuning", "sft", "dpo", "rft", "training"],
    learning_objectives: [
      "Understand SFT, DPO, and RFT differences",
      "Choose appropriate fine-tuning method",
      "Measure incremental performance lift",
      "Avoid overtraining and overfitting"
    ],
    content: "Fine-tuning adapts pre-trained models to specific tasks. SFT (Supervised Fine-Tuning) uses labeled examples, DPO (Direct Preference Optimization) aligns to human preferences, and RFT (Reinforcement Fine-Tuning) uses reward signals...",
    prerequisites: ["prompt-engineering", "agent-evaluation"],
    estimated_time: 90
  }
];

export const MOCK_RELATED_CONCEPTS: Record<string, string[]> = {
  "agent-architecture": ["react-pattern", "tool-calling", "memory-management"],
  "prompt-engineering": ["react-pattern", "tool-calling"],
  "tool-calling": ["agent-architecture", "react-pattern", "agent-evaluation"],
  "agent-evaluation": ["agent-security", "tool-calling", "fine-tuning"],
  "agent-security": ["agent-evaluation", "multi-agent-systems"],
  "multi-agent-systems": ["agent-architecture", "memory-management", "tool-calling"],
  "react-pattern": ["prompt-engineering", "agent-architecture"],
  "memory-management": ["agent-architecture", "multi-agent-systems"],
  "fine-tuning": ["prompt-engineering", "agent-evaluation", "agent-architecture"]
};

// Helper to get concepts by category
export const getConceptsByCategory = (category: string): MockConcept[] => {
  if (category === '' || category === 'all') {
    return MOCK_CONCEPTS;
  }
  return MOCK_CONCEPTS.filter(c => c.category === category);
};

// Helper to search concepts with improved matching
export const searchConcepts = (query: string): Array<{ concept: MockConcept; similarity: number }> => {
  if (!query || query.length < 3) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  const results = MOCK_CONCEPTS
    .map(concept => {
      let score = 0;
      
      // Title matching (highest weight)
      const lowerTitle = concept.title.toLowerCase();
      if (lowerTitle === lowerQuery) score += 1.0; // Exact match
      else if (lowerTitle.includes(lowerQuery)) score += 0.9; // Partial match
      else if (queryWords.some(word => lowerTitle.includes(word))) score += 0.7; // Word match
      
      // Description matching
      const lowerDesc = concept.description.toLowerCase();
      if (lowerDesc.includes(lowerQuery)) score += 0.6;
      else if (queryWords.some(word => lowerDesc.includes(word))) score += 0.4;
      
      // Tag matching (exact or partial)
      const tagExactMatch = concept.tags.some(tag => tag.toLowerCase() === lowerQuery);
      const tagPartialMatch = concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      if (tagExactMatch) score += 0.8;
      else if (tagPartialMatch) score += 0.5;
      
      // Learning objectives matching
      const objectiveMatch = concept.learning_objectives.some(obj => 
        obj.toLowerCase().includes(lowerQuery) || 
        queryWords.some(word => obj.toLowerCase().includes(word))
      );
      if (objectiveMatch) score += 0.5;
      
      // Category matching
      if (concept.category.toLowerCase().includes(lowerQuery)) score += 0.6;
      
      // Content matching (lowest weight)
      const lowerContent = concept.content.toLowerCase();
      if (lowerContent.includes(lowerQuery)) score += 0.3;
      else if (queryWords.some(word => lowerContent.includes(word))) score += 0.2;
      
      // Normalize similarity to 0-1 range (cap at 1.0)
      const similarity = Math.min(score, 1.0);
      
      return { concept, similarity };
    })
    .filter(r => r.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity);
  
  return results;
};

// Helper to get concept by ID
export const getConceptById = (id: string): MockConcept | undefined => {
  return MOCK_CONCEPTS.find(c => c.id === id);
};

// Helper to get related concepts
export const getRelatedConcepts = (conceptId: string, limit = 5): MockConcept[] => {
  const relatedIds = MOCK_RELATED_CONCEPTS[conceptId] || [];
  return relatedIds
    .map(id => MOCK_CONCEPTS.find(c => c.id === id))
    .filter((c): c is MockConcept => c !== undefined)
    .slice(0, limit);
};
