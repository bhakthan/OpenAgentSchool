// Agent Orchestration Patterns
import { MockConcept } from '../mockConcepts';

export const orchestrationConcept: MockConcept = {
  id: "agent-orchestration",
  title: "Agent Orchestration Patterns",
  description: "Master the art of coordinating multiple agents and complex workflows. Learn sequential, parallel, and hierarchical orchestration patterns to build sophisticated AI systems.",
  category: "architecture",
  difficulty: "intermediate",
  tags: ["orchestration", "workflows", "multi-agent", "coordination"],
  learning_objectives: [
    "Understand orchestration patterns (sequential, parallel, conditional)",
    "Implement workflow engines for agent coordination",
    "Handle errors and retries in multi-step workflows",
    "Choose the right orchestration pattern for your use case",
    "Monitor and debug complex agent workflows"
  ],
  content: "Agent orchestration coordinates multiple agents and tools for complex tasks. Five core patterns: 1) Sequential (step-by-step), 2) Parallel (simultaneous independent tasks), 3) Conditional (route based on logic), 4) Hierarchical/Supervisor (coordinator delegates to workers), 5) Event-driven (reactive to events). Error handling: retry with exponential backoff, circuit breakers, fallback strategies. State management with workflow state machines. Best practices: observability (metrics, logs), timeout management, idempotency for safe retries. Choose patterns based on task dependencies and requirements.",
  prerequisites: ["agent-architecture", "tool-calling"],
  estimated_time: 75,
  videos: [
    {
      id: "orchestration-patterns",
      title: "Agent Orchestration Patterns",
      url: "https://www.youtube.com/watch?v=orchestration",
      platform: "youtube",
      duration: 30,
      difficulty: "intermediate",
      description: "Guide to coordinating multiple agents"
    },
    {
      id: "workflow-orchestration-langgraph",
      title: "Workflow Orchestration with LangGraph",
      url: "https://www.youtube.com/watch?v=9BPCV5TYPmg",
      platform: "youtube",
      duration: 28,
      difficulty: "advanced",
      description: "Building complex agent workflows with state machines and graph-based orchestration",
      timestamps: [
        { time: "0:00", label: "Introduction to Workflow Orchestration" },
        { time: "5:30", label: "Sequential vs Parallel Patterns" },
        { time: "12:00", label: "State Management" },
        { time: "19:00", label: "Error Handling & Retries" },
        { time: "24:00", label: "Production Monitoring" }
      ]
    }
  ],
  code_examples: [
    {
      id: "sequential-orchestrator",
      title: "Sequential Workflow",
      language: "typescript",
      code: "class SequentialWorkflow {\n  async execute(steps: Array<() => Promise<any>>): Promise<any> {\n    let result;\n    for (const step of steps) {\n      result = await step();\n    }\n    return result;\n  }\n}\n\n// Usage\nconst workflow = new SequentialWorkflow();\nawait workflow.execute([\n  async () => validateInput(data),\n  async () => processData(data),\n  async () => saveResults(data)\n]);",
      description: "Simple sequential workflow orchestrator"
    },
    {
      id: "parallel-orchestrator",
      title: "Parallel Execution",
      language: "typescript",
      code: "class ParallelWorkflow {\n  async execute(steps: Array<() => Promise<any>>): Promise<any[]> {\n    return await Promise.allSettled(\n      steps.map(step => step())\n    );\n  }\n}\n\n// Usage\nconst [res1, res2, res3] = await new ParallelWorkflow().execute([\n  async () => searchDatabase(query),\n  async () => searchAPI(query),\n  async () => searchCache(query)\n]);",
      description: "Parallel execution with error handling"
    }
  ]
};
