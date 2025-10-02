import { PatternData } from './types';
import { SupportRouterVisual } from '@/components/visualization/business-use-cases/SupportRouterVisual';

export const orchestratorWorkerPattern: PatternData = {
  id: 'orchestrator-worker',
  name: 'Orchestrator-Worker',
  description: 'A central orchestrator agent manages and delegates tasks to a pool of specialized worker agents.',
  category: 'Multi-Agent',
  useCases: ['Customer Support', 'Data Processing Pipelines', 'Workflow Automation'],
  whenToUse: 'Use this pattern for tasks that can be broken down into a series of steps, where each step can be handled by a specialized agent. It is ideal for creating robust, scalable, and maintainable multi-agent systems.',
  businessUseCase: {
    industry: 'Customer Support',
    description: 'A customer support center uses an Orchestrator-Worker system. The Orchestrator agent receives all incoming customer queries. It then routes the query to the appropriate worker agent: a "Billing" agent for payment issues, a "Technical" agent for product problems, or a "General" agent for other questions. This ensures that each query is handled by the most qualified agent.',
    visualization: SupportRouterVisual,
    enlightenMePrompt: 'Provide a technical guide on implementing the Orchestrator-Worker pattern for AI agents.',
  },
  nodes: [
    { id: 'orchestrator', type: 'input', data: { label: 'Orchestrator' }, position: { x: 100, y: 200 } },
    { id: 'worker1', type: 'default', data: { label: 'Worker 1' }, position: { x: 300, y: 150 } },
    { id: 'worker2', type: 'default', data: { label: 'Worker 2' }, position: { x: 300, y: 250 } },
    { id: 'output', type: 'output', data: { label: 'Task Result' }, position: { x: 500, y: 200 } }
  ],
  edges: [
    { id: 'e1-2', source: 'orchestrator', target: 'worker1', animated: true, label: 'Task A' },
    { id: 'e1-3', source: 'orchestrator', target: 'worker2', animated: true, label: 'Task B' },
    { id: 'e2-4', source: 'worker1', target: 'output', animated: true },
    { id: 'e3-4', source: 'worker2', target: 'output', animated: true }
  ],
  codeExample: `// Orchestrator-Worker Pattern implementation...`,
  pythonCodeExample: `import asyncio

# Assume llm_call is an async function that calls a language model
class OrchestratorAgent:
    def __init__(self, workers: dict):
        self.workers = workers

    async def route_task(self, task: str) -> str:
        """Routes a task to the appropriate worker agent."""
        prompt = f"""
        Based on the task "{task}", which of the following workers should handle it?
        Workers: {list(self.workers.keys())}
        Return only the name of the worker.
        """
        worker_name = await llm_call(prompt)
        worker_name = worker_name.strip()

        if worker_name in self.workers:
            return await self.workers[worker_name].execute_task(task)
        else:
            return "Error: Could not find an appropriate worker for the task."

class WorkerAgent:
    def __init__(self, name: str, specialty: str):
        self.name = name
        self.specialty = specialty

    async def execute_task(self, task: str) -> str:
        """Executes a task based on the worker's specialty."""
        prompt = f"""
        You are a {self.name} agent specializing in {self.specialty}.
        Execute the following task: "{task}"
        """
        return await llm_call(prompt)

# Example Usage
# async def main():
#     # Create worker agents
#     billing_agent = WorkerAgent("BillingAgent", "handling payment and subscription issues")
#     tech_support_agent = WorkerAgent("TechSupportAgent", "troubleshooting technical product problems")
#     general_agent = WorkerAgent("GeneralAgent", "answering general questions")

#     # Create the orchestrator
#     orchestrator = OrchestratorAgent({
#         "Billing": billing_agent,
#         "Technical": tech_support_agent,
#         "General": general_agent,
#     })

#     # Route tasks
#     task1 = "I want to upgrade my subscription."
#     response1 = await orchestrator.route_task(task1)
#     print(f"Task: {task1}\nResponse: {response1}\n---")

#     task2 = "My device won't turn on."
#     response2 = await orchestrator.route_task(task2)
#     print(f"Task: {task2}\nResponse: {response2}\n---")
`,
  implementation: [],
  advantages: [
    'Facilitates clear separation of concerns between orchestration and execution.',
    'Improves scalability by distributing tasks to workers.',
    'Enhances fault tolerance through isolated task execution.'
  ],
  limitations: [
    'Requires robust communication and coordination mechanisms.',
    'Increased complexity in managing worker states and dependencies.',
    'Potential bottlenecks at the orchestrator level.'
  ],
  relatedPatterns: [
    'Task Decomposition',
    'Parallelization',
    'Feedback Loops'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 days',
    complexityReduction: 'High - Microsoft Agent Framework group chat pattern handles orchestration and worker coordination out-of-box',
    reusabilityScore: 9,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Core multi-agent coordination pattern for complex workflows, data pipelines, report generation',
      'Architecture Templates - Microsoft Agent Framework and LangGraph provide production orchestration',
      'Operational Instrumentation - Built-in task queuing, progress tracking, and worker health monitoring',
      'Evaluation Automation - Worker success rates and orchestration latency metrics standard'
    ]
  }
};