// ============================================================================
// DEPRECATED: This file has been consolidated into autogen.ts
// ============================================================================
// 
// This pattern file previously contained duplicate content with the same ID
// as autogen.ts, causing confusion and maintainability issues.
//
// All content from this file (LiveRunner code, Mem0 visualizer) has been
// merged into autogen.ts for a single, clean pattern definition.
//
// This file is kept temporarily for reference but should be deleted soon.
//
// See: autogen.ts for the consolidated Multi-Agent Collaboration pattern
// ============================================================================

import { PatternData } from './types';

// NOTE: This pattern demonstrates multi-agent conversation concepts that are now part of 
// Microsoft Agent Framework (https://aka.ms/agentframework), which unifies AutoGen (prototyping)
// and Semantic Kernel (production) into a single framework with enhanced capabilities including
// graph-based workflows, built-in observability, and enterprise-ready features.

const StubVisual = () => null;

// Import Mem0 memory visualization component
import { Mem0AgentMemoryVisual } from '@/components/visualization/code-visualizers/Mem0AgentMemoryVisual';

export const autogenMultiAgentPattern: PatternData = {
  id: 'autogen-multi-agent',
  name: 'Multi-Agent Collaboration Pattern',
  description: 'Uses multi-agent frameworks to create a group of collaborating agents that can solve complex tasks through structured conversations and role-based coordination.',
  category: 'Multi-Agent',
  useCases: ['Software Development', 'Financial Analysis', 'Content Creation'],
  whenToUse: 'Use this pattern when a task requires the expertise of multiple, specialized agents that need to communicate and collaborate. It is ideal for complex, multi-step problems that can be broken down into smaller sub-tasks.',
  businessUseCase: {
    industry: 'Software Development',
    description: 'A software company uses a multi-agent system to automate parts of their development workflow. A "Product Manager" agent writes the user stories, a "Developer" agent writes the code, a "QA" agent writes the tests, and a "DevOps" agent deploys the application. The agents collaborate in a group chat to ensure the final product meets the requirements.',
    enlightenMePrompt: 'Provide a technical guide on implementing a multi-agent system with Microsoft Agent Framework.',
    visualization: StubVisual
  },
  nodes: [],
  edges: [],
  codeExample: `# Microsoft Agent Framework - Multi-Agent Collaboration
# LiveRunner: Execute this code to see multi-agent conversation in action
# Requires: pip install agent-framework[all]

import asyncio
from agent_framework.azure import AzureAIAgentClient
from agent_framework.tools import CodeInterpreterTool
from azure.identity import AzureCliCredential

async def multi_agent_software_development():
    """
    Demonstrates multi-agent collaboration for software development.
    Three agents work together: Product Manager, Developer, and QA.
    """
    print("=== Multi-Agent Software Development Example ===\\n")
    
    # Authenticate with Azure (run 'az login' first)
    credential = AzureCliCredential()
    
    async with AzureAIAgentClient(async_credential=credential) as client:
        # Create Product Manager Agent
        pm_agent = await client.create_agent(
            name="ProductManager",
            instructions="""You are a Product Manager. 
            Break down user requirements into clear, actionable development tasks.
            Be concise and focus on what needs to be built.""",
            model="gpt-4"
        )
        
        # Create Developer Agent with code execution capability
        dev_agent = await client.create_agent(
            name="Developer",
            instructions="""You are a Python Developer.
            Write clean, well-documented code based on requirements.
            Use the code interpreter to test your code.""",
            model="gpt-4",
            tools=[CodeInterpreterTool()]
        )
        
        # Create QA Agent
        qa_agent = await client.create_agent(
            name="QAEngineer",
            instructions="""You are a QA Engineer.
            Review code and create comprehensive test cases.
            Identify edge cases and potential issues.""",
            model="gpt-4"
        )
        
        # Initial task from user
        task = "Create a Python function to calculate fibonacci numbers efficiently"
        
        # Step 1: Product Manager breaks down requirements
        print("Step 1: Product Manager analyzing requirements...")
        pm_result = await pm_agent.run(
            f"User request: {task}\\n\\nProvide clear development requirements."
        )
        print(f"PM: {pm_result}\\n")
        
        # Step 2: Developer implements the solution
        print("Step 2: Developer implementing solution...")
        dev_result = await dev_agent.run(
            f"Requirements from PM: {pm_result}\\n\\nImplement the solution and test it."
        )
        print(f"Developer: {dev_result}\\n")
        
        # Step 3: QA reviews and tests
        print("Step 3: QA Engineer reviewing...")
        qa_result = await qa_agent.run(
            f"Code from Developer: {dev_result}\\n\\nReview the code and suggest test cases."
        )
        print(f"QA: {qa_result}\\n")
        
        print("=== Collaboration Complete ===")
        print(f"Total agents involved: 3")
        print(f"Workflow: PM -> Developer -> QA")

# Run the multi-agent workflow
if __name__ == "__main__":
    asyncio.run(multi_agent_software_development())`,
  implementation: [
    'Install Microsoft Agent Framework and configure Azure OpenAI connection',
    'Define agent roles and instructions for specialized behaviors',
    'Create AI agents with appropriate model configurations',
    'Set up workflow graphs for orchestration or sequential conversation patterns',
    'Evaluate system performance using collaboration and observability metrics'
  ],
  pythonCodeExample: `# Microsoft Agent Framework Multi-Agent Implementation
# Demonstrates collaborative agent workflows with graph-based orchestration

from agent_framework.azure import AzureOpenAIResponsesClient
from agent_framework.workflows import Workflow, WorkflowNode
from azure.identity import DefaultAzureCredential

# Initialize Azure OpenAI client
credential = DefaultAzureCredential()
client = AzureOpenAIResponsesClient(
    endpoint="https://your-endpoint.openai.azure.com",
    credential=credential
)

# Create specialized agents
product_manager_agent = client.create_agent(
    name="ProductManager",
    instructions="You are a Product Manager. Write clear user stories and requirements.",
    model="gpt-4"
)

developer_agent = client.create_agent(
    name="Developer",
    instructions="You are a Developer. Implement the user stories in Python code.",
    model="gpt-4"
)

qa_agent = client.create_agent(
    name="QAAgent",
    instructions="You are a QA Engineer. Write comprehensive unit tests for the code.",
    model="gpt-4"
)

# Create a workflow to orchestrate the agents
workflow = Workflow(name="SoftwareDevelopmentWorkflow")

# Define workflow nodes
pm_node = WorkflowNode(
    id="product_manager",
    agent=product_manager_agent,
    next_nodes=["developer"]
)

dev_node = WorkflowNode(
    id="developer",
    agent=developer_agent,
    next_nodes=["qa"]
)

qa_node = WorkflowNode(
    id="qa",
    agent=qa_agent,
    next_nodes=[]  # End of workflow
)

# Add nodes to workflow
workflow.add_node(pm_node)
workflow.add_node(dev_node)
workflow.add_node(qa_node)

# Start the workflow with a prompt
result = workflow.run(
    start_node="product_manager",
    initial_message="Create a Python function to calculate factorial with tests"
)

# Access results with built-in observability
print(f"Workflow completed in {result.duration_ms}ms")
print(f"Agents involved: {result.agents_used}")`,
  advantages: [],
  limitations: [],
  relatedPatterns: [],
  codeVisualizer: Mem0AgentMemoryVisual,

  velocityProfile: {
    impact: 'high',
    timeToImplement: '2-4 days',
    complexityReduction: 'High - Microsoft Agent Framework workflow orchestration eliminates manual agent coordination code',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Multi-agent workflow pattern for software development, content creation, complex analysis',
      'Architecture Templates - Microsoft Agent Framework provides workflow DAGs, sequential/parallel execution',
      'Operational Instrumentation - Workflow duration, agent utilization, and handoff metrics built-in',
      'Evaluation Automation - Workflow success rate and task quality metrics tracked automatically'
    ]
  }
};
