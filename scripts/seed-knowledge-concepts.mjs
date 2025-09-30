#!/usr/bin/env node
/**
 * Seed Knowledge Service with AI Agent Concepts
 * Usage: node scripts/seed-knowledge-concepts.mjs
 */

const KNOWLEDGE_SERVICE_URL = 'http://localhost:8003';

const concepts = [
  {
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
    content: "Agent architecture defines how AI agents are structured and organized. The ReAct pattern combines reasoning and acting in iterative loops. Chain-of-Thought prompting breaks down complex problems into sequential steps. Tool-using agents extend LLM capabilities by calling external functions and APIs.",
    prerequisites: ["llm-fundamentals"]
  },
  {
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
    content: "Prompt engineering is the practice of designing inputs to elicit desired outputs from LLMs. Effective prompts are clear, specific, and provide context. Few-shot learning provides examples within the prompt. Chain-of-thought prompting guides the model through reasoning steps.",
    prerequisites: []
  },
  {
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
    content: "Tool calling allows agents to extend their capabilities beyond text generation. Functions are defined with JSON schemas describing parameters and return types. Agents parse natural language into function calls, execute them, and incorporate results into responses. Error handling is critical for production systems.",
    prerequisites: ["prompt-engineering"]
  },
  {
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
    content: "Evaluating AI agents requires both quantitative metrics and qualitative assessment. Key metrics include accuracy, latency, cost, and user satisfaction. Benchmarks like MMLU and HumanEval provide standardized tests. A/B testing compares agent variants in production.",
    prerequisites: ["agent-architecture", "tool-calling"]
  },
  {
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
    content: "Security is critical when deploying AI agents in production environments. Prompt injection attacks manipulate agent behavior through crafted inputs. Jailbreaks bypass safety constraints. Guardrails validate inputs and outputs. Monitoring detects anomalous behavior.",
    prerequisites: ["agent-architecture"]
  },
  {
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
    content: "Multi-agent systems enable complex problem solving through agent collaboration. Agents communicate via message passing or shared memory. Task distribution balances workload across agents. Conflict resolution handles disagreements. AutoGen and CrewAI provide multi-agent frameworks.",
    prerequisites: ["agent-architecture", "tool-calling"]
  },
  {
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
    content: "ReAct interleaves reasoning and acting, enabling agents to be more transparent and debuggable. The pattern alternates between Thought, Action, and Observation steps. Reasoning traces make agent decisions explainable. Action execution grounds reasoning in real-world results.",
    prerequisites: ["prompt-engineering"]
  },
  {
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
    content: "Effective memory management allows agents to maintain context across interactions. Short-term memory uses conversation history within context windows. Long-term memory stores information in vector databases. Retrieval-augmented generation (RAG) combines both approaches.",
    prerequisites: ["agent-architecture"]
  },
  {
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
    content: "Fine-tuning adapts pre-trained models to specific tasks. SFT (Supervised Fine-Tuning) uses labeled examples to teach new behaviors. DPO (Direct Preference Optimization) aligns models to human preferences without reinforcement learning. RFT (Reinforcement Fine-Tuning) uses reward signals for complex objectives. Choose the simplest method that achieves your performance goals.",
    prerequisites: ["prompt-engineering", "agent-evaluation"]
  }
];

async function seedConcepts() {
  console.log('🌱 Seeding Knowledge Service with AI Agent concepts...\n');
  
  let successCount = 0;
  let errorCount = 0;

  for (const concept of concepts) {
    try {
      const response = await fetch(`${KNOWLEDGE_SERVICE_URL}/api/v1/concepts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(concept)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Created: ${concept.title} (ID: ${data.id})`);
        successCount++;
      } else {
        const error = await response.text();
        console.error(`❌ Failed: ${concept.title} - ${response.status} ${error}`);
        errorCount++;
      }
    } catch (err) {
      console.error(`❌ Error creating ${concept.title}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary: ${successCount} created, ${errorCount} failed`);
  
  if (errorCount > 0) {
    console.log('\n⚠️  Note: Some concepts may already exist. Check the Knowledge Service.');
  }
}

// Run seeding
seedConcepts()
  .then(() => {
    console.log('\n✅ Seeding complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Seeding failed:', err);
    process.exit(1);
  });
