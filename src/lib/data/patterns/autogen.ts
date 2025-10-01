import { PatternData } from './types';
import { SupplyChainBotVisual } from '@/components/visualization/business-use-cases/SupplyChainBotVisual';
import { Mem0AgentMemoryVisual } from '@/components/visualization/code-visualizers/Mem0AgentMemoryVisual';

// NOTE: This pattern demonstrates multi-agent conversation concepts that are now part of 
// Microsoft Agent Framework (https://aka.ms/agentframework), which unifies AutoGen (prototyping)
// and Semantic Kernel (production) into a single framework.

export const autogenPattern: PatternData = {
  id: 'autogen-multi-agent',
  name: 'Multi-Agent Collaboration',
  description: 'Multi-agent framework for building conversational AI systems with role-based collaboration, now unified in Microsoft Agent Framework.',
  category: 'Multi-Agent',
  useCases: [
    'Collaborative Problem Solving',
    'Code Generation and Review',
    'Research and Analysis',
    'Complex Workflow Automation'
  ],
  whenToUse: 'Use multi-agent frameworks when you need multiple AI agents to collaborate through natural conversation, especially for complex tasks that benefit from different agent specializations, code execution capabilities, and human-in-the-loop interactions.',
  nodes: [
    { id: 'user-proxy', type: 'input', data: { label: 'User Proxy Agent', nodeType: 'input' }, position: { x: 100, y: 150 } },
    { id: 'assistant1', type: 'default', data: { label: 'Assistant Agent 1', nodeType: 'llm' }, position: { x: 300, y: 100 } },
    { id: 'assistant2', type: 'default', data: { label: 'Assistant Agent 2', nodeType: 'llm' }, position: { x: 300, y: 200 } },
    { id: 'group-chat', type: 'default', data: { label: 'Group Chat Manager', nodeType: 'planner' }, position: { x: 500, y: 150 } },
    { id: 'output', type: 'output', data: { label: 'Solution', nodeType: 'output' }, position: { x: 700, y: 150 } }
  ],
  edges: [
    { id: 'e1-gc', source: 'user-proxy', target: 'group-chat', animated: true },
    { id: 'egc-a1', source: 'group-chat', target: 'assistant1', animated: true },
    { id: 'egc-a2', source: 'group-chat', target: 'assistant2', animated: true },
    { id: 'ea1-gc', source: 'assistant1', target: 'group-chat', animated: true },
    { id: 'ea2-gc', source: 'assistant2', target: 'group-chat', animated: true },
    { id: 'egc-out', source: 'group-chat', target: 'output' }
  ],
  evaluation: `Evaluating an AutoGen system goes beyond individual agent performance and focuses on the system's collective output and collaboration dynamics.
- **System-Level Goal Completion:** Did the group of agents successfully solve the user's high-level task? This is the most critical metric.
- **Collaboration Efficiency:** Analyze the conversation logs. Was the communication efficient? Did agents get stuck in loops? Metrics include the number of rounds to completion and the cost (token usage).
- **Role Adherence:** Did each agent stick to its designated role (e.g., did the Coder only write code, and the Critic only provide feedback)? This can be scored by an "LLM as Judge".
- **Solution Quality:** The final artifact (e.g., code, report) should be evaluated for quality. For code, this involves running tests, static analysis, and checking for bugs (similar to the SWE-bench benchmark).
- **Contribution Analysis:** Assess the impact of each agent on the final solution. Was any agent redundant or counter-productive?`,
  businessUseCase: {
    industry: 'Logistics & Supply Chain',
    description: 'A global logistics company implements a "Supply Chain Disruption Manager" using a multi-agent framework. When a "Monitoring Agent" detects a disruption (e.g., a port closure) from a live data feed, it initiates a group chat. A "Planner Agent" analyzes the situation and proposes alternative routes. A "Logistics Agent" checks the feasibility and cost of the new routes by calling external carrier APIs. Finally, a "Communications Agent" drafts and sends notifications to affected clients. This multi-agent collaboration allows the company to react to disruptions in minutes instead of hours, minimizing delays and improving customer satisfaction.',
    visualization: SupplyChainBotVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a resilient "Supply Chain Disruption Manager" using Microsoft Agent Framework on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure Event Hub to ingest real-time disruption data, an Azure Function App to trigger the AutoGen system, a pool of agents running in Azure Container Apps for scalability, and Azure Service Bus for reliable inter-agent communication.
      - Show how the GroupChatManager orchestrates the conversation flow.

      ### 2. Agent Roles & System Messages
      - Provide the detailed system messages for four key agents:
        1.  **MonitorAgent:** "Your sole job is to parse incoming events and initiate the group chat with a clear summary of the disruption."
        2.  **PlannerAgent:** "You are a logistics expert. Your job is to create and evaluate alternative transportation plans."
        3.  **LogisticsAgent:** "You are a tool-using agent. You must use the provided APIs to check route feasibility, cost, and transit times. Do not speculate."
        4.  **CommunicationsAgent:** "You are a communications specialist. Draft clear, concise notifications for customers based on the final, approved plan."

      ### 3. Inter-Agent Communication & State Management
      - Explain how to manage the shared state of the group chat, potentially using an external Redis cache connected to the Azure Container Apps.
      - Discuss the importance of the \`speaker_selection_method\` in the GroupChat to control the conversation flow (e.g., using a custom function instead of round-robin).

      ### 4. Evaluation Strategy for Multi-Agent Systems
      - Detail the evaluation plan for this collaborative system.
      - **System-Level Success:** Did the system produce a viable and cost-effective new logistics plan? (Binary outcome).
      - **Collaboration Metrics:** Track the number of conversation turns, the sentiment of the conversation (was there confusion?), and the time to resolution.
      - **Role-Specific Metrics:** For the LogisticsAgent, measure its Tool Call Accuracy. For the CommunicationsAgent, use an LLM-as-Judge to score the quality of its final notification.

      ### 5. Reliability and Scalability
      - Discuss how to make the system resilient to individual agent failures.
      - Explain how to use Azure Container Apps to scale the number of agent instances based on the volume of disruption events.
    `
  },
  codeExample: `# Microsoft Agent Framework + Mem0 - Supply Chain with Persistent Memory
# LiveRunner: Execute this code to see agents remembering preferences across conversations
# Requires: pip install agent-framework agent-framework-mem0

import asyncio
from agent_framework.azure import AzureAIAgentClient
from agent_framework_mem0 import Mem0MemoryProvider
from azure.identity import AzureCliCredential

async def supply_chain_with_memory():
    """
    Supply Chain Disruption Manager with persistent memory.
    Agent remembers user preferences across conversations using Mem0.
    """
    print("=== Supply Chain Agent with Mem0 Memory ===\\n")
    
    # Authenticate with Azure
    credential = AzureCliCredential()
    
    # Initialize Mem0 memory provider
    memory = Mem0MemoryProvider(
        api_key="your-mem0-api-key",
        user_id="logistics_team_001"
    )
    
    async with AzureAIAgentClient(async_credential=credential) as client:
        # Create Supply Chain Agent with Mem0 memory
        agent = await client.create_agent(
            name="SupplyChainManager",
            instructions="""You are a Supply Chain Disruption Manager.
            Help logistics teams handle shipping delays and disruptions.
            Remember user preferences and provide personalized recommendations.""",
            model="gpt-4",
            memory=memory  # Attach Mem0 memory provider
        )
        
        print("=== First Conversation (Teaching Preferences) ===")
        
        # User teaches their preferences
        response1 = await agent.run(
            "We have a shipment delay from Shanghai. "
            "For future reference, always prioritize air freight for urgent orders, "
            "and notify our warehouse team immediately."
        )
        print(f"Agent: {response1}\\n")
        
        print("=== Second Conversation (Same Thread) ===")
        
        # Agent uses memory from same conversation
        response2 = await agent.run(
            "Another delay from Hong Kong. What should we do?"
        )
        print(f"Agent: {response2}\\n")
        
        print("=== Third Conversation (New Thread - Memory Persists!) ===")
        
        # Create a NEW thread to demonstrate cross-thread memory
        agent2 = await client.create_agent(
            name="SupplyChainManager",
            instructions="""You are a Supply Chain Disruption Manager.
            Help logistics teams handle shipping delays and disruptions.
            Remember user preferences and provide personalized recommendations.""",
            model="gpt-4",
            memory=memory  # Same Mem0 memory provider
        )
        
        response3 = await agent2.run(
            "We have a shipment delay from Tokyo. What's our procedure?"
        )
        print(f"Agent (New Thread): {response3}\\n")
        
        print("=== Memory Demo Complete ===")
        print("✓ Agent remembered: Air freight preference")
        print("✓ Agent remembered: Warehouse notification requirement")
        print("✓ Memory persisted across different conversation threads")
        print("✓ No need to repeat preferences!")

# Run the memory demo
if __name__ == "__main__":
    asyncio.run(supply_chain_with_memory())`,
  pythonCodeExample: `# Microsoft Agent Framework + Mem0 - Supply Chain with Persistent Memory
# LiveRunner: Execute this code to see agents remembering preferences across conversations
# Requires: pip install agent-framework agent-framework-mem0

import asyncio
from agent_framework.azure import AzureAIAgentClient
from agent_framework_mem0 import Mem0MemoryProvider
from azure.identity import AzureCliCredential

async def supply_chain_with_memory():
    """
    Supply Chain Disruption Manager with persistent memory.
    Agent remembers user preferences across conversations using Mem0.
    """
    print("=== Supply Chain Agent with Mem0 Memory ===\\n")
    
    # Authenticate with Azure
    credential = AzureCliCredential()
    
    # Initialize Mem0 memory provider
    memory = Mem0MemoryProvider(
        api_key="your-mem0-api-key",
        user_id="logistics_team_001"
    )
    
    async with AzureAIAgentClient(async_credential=credential) as client:
        # Create Supply Chain Agent with Mem0 memory
        agent = await client.create_agent(
            name="SupplyChainManager",
            instructions="""You are a Supply Chain Disruption Manager.
            Help logistics teams handle shipping delays and disruptions.
            Remember user preferences and provide personalized recommendations.""",
            model="gpt-4",
            memory=memory  # Attach Mem0 memory provider
        )
        
        print("=== First Conversation (Teaching Preferences) ===")
        
        # User teaches their preferences
        response1 = await agent.run(
            "We have a shipment delay from Shanghai. "
            "For future reference, always prioritize air freight for urgent orders, "
            "and notify our warehouse team immediately."
        )
        print(f"Agent: {response1}\\n")
        
        print("=== Second Conversation (Same Thread) ===")
        
        # Agent uses memory from same conversation
        response2 = await agent.run(
            "Another delay from Hong Kong. What should we do?"
        )
        print(f"Agent: {response2}\\n")
        
        print("=== Third Conversation (New Thread - Memory Persists!) ===")
        
        # Create a NEW thread to demonstrate cross-thread memory
        agent2 = await client.create_agent(
            name="SupplyChainManager",
            instructions="""You are a Supply Chain Disruption Manager.
            Help logistics teams handle shipping delays and disruptions.
            Remember user preferences and provide personalized recommendations.""",
            model="gpt-4",
            memory=memory  # Same Mem0 memory provider
        )
        
        response3 = await agent2.run(
            "We have a shipment delay from Tokyo. What's our procedure?"
        )
        print(f"Agent (New Thread): {response3}\\n")
        
        print("=== Memory Demo Complete ===")
        print("✓ Agent remembered: Air freight preference")
        print("✓ Agent remembered: Warehouse notification requirement")
        print("✓ Memory persisted across different conversation threads")
        print("✓ No need to repeat preferences!")

# Run the memory demo
if __name__ == "__main__":
    asyncio.run(supply_chain_with_memory())`,
  implementation: [
    'Install Microsoft Agent Framework and configure Azure OpenAI connection',
    'Define agent roles and instructions for specialized behaviors',
    'Create AI agents with appropriate model configurations',
    'Set up workflow graphs or sequential conversation patterns',
    'Implement tool execution capabilities and function calling',
    'Add human-in-the-loop controls for critical decisions',
    'Configure workflow termination conditions',
    'Implement observability and monitoring for agent interactions',
    'Deploy to Azure Container Apps for scalable execution',
    'Set up CI/CD pipelines for agent system updates'
  ],
  advantages: [
    "Facilitates complex problem-solving by enabling collaboration between specialized agents.",
    "The conversational nature of agent interaction is intuitive and powerful.",
    "Supports human-in-the-loop, allowing for human oversight and intervention.",
    "Can automate complex workflows that require multiple steps and different skills."
  ],
  limitations: [
    "Managing complex multi-agent conversations can be challenging.",
    "The system can be prone to conversational loops or inefficient communication.",
    "Debugging the collective behavior of multiple agents is difficult.",
    "Can be more expensive than single-agent systems due to the high volume of LLM calls."
  ],
  relatedPatterns: [
    "orchestrator-worker",
    "agent-to-agent",
    "multi-agent-systems"
  ],
  completeCode: `# Complete Microsoft Agent Framework Multi-Agent Example
# Supply Chain Disruption Manager - Production-Ready Implementation

from agent_framework.azure import AzureOpenAIResponsesClient
from agent_framework.workflows import Workflow, WorkflowNode, WorkflowDecision
from agent_framework.memory import AgentThread
from azure.identity import DefaultAzureCredential
from azure.eventhub import EventHubConsumerClient
import logging

# Configure logging and observability
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SupplyChainDisruptionManager:
    """
    Production multi-agent system for handling supply chain disruptions.
    Uses Microsoft Agent Framework with Azure OpenAI.
    """
    
    def __init__(self, azure_openai_endpoint: str):
        # Initialize Azure OpenAI client with managed identity
        self.credential = DefaultAzureCredential()
        self.client = AzureOpenAIResponsesClient(
            endpoint=azure_openai_endpoint,
            credential=self.credential
        )
        
        # Create specialized agents
        self.monitor_agent = self.client.create_agent(
            name="MonitorAgent",
            instructions="""You are a Monitoring Agent. Parse incoming disruption events 
            and provide a clear, structured summary including: event type, location, 
            severity, and immediate impact.""",
            model="gpt-4"
        )
        
        self.planner_agent = self.client.create_agent(
            name="PlannerAgent",
            instructions="""You are a Logistics Planning Expert. Analyze disruption data 
            and propose 2-3 alternative transportation routes with estimated costs, 
            transit times, and risk assessments.""",
            model="gpt-4"
        )
        
        self.logistics_agent = self.client.create_agent(
            name="LogisticsAgent",
            instructions="""You are a Logistics Operations Agent. Use the provided tools 
            to check route feasibility, get real carrier costs, and verify transit times. 
            Always use tools - never speculate.""",
            model="gpt-4",
            tools=[
                self._get_route_feasibility_tool(),
                self._get_carrier_costs_tool(),
                self._get_transit_times_tool()
            ]
        )
        
        self.communications_agent = self.client.create_agent(
            name="CommunicationsAgent",
            instructions="""You are a Customer Communications Specialist. Draft clear, 
            professional notifications for affected customers based on the approved plan. 
            Include: what happened, how we're addressing it, new timeline, and contact info.""",
            model="gpt-4"
        )
        
        # Create workflow
        self.workflow = self._build_workflow()
        
    def _build_workflow(self) -> Workflow:
        """Build the agent workflow graph."""
        workflow = Workflow(name="DisruptionResponseWorkflow")
        
        # Monitor -> Planner -> Logistics -> Communications
        monitor_node = WorkflowNode(
            id="monitor",
            agent=self.monitor_agent,
            next_nodes=["planner"]
        )
        
        planner_node = WorkflowNode(
            id="planner",
            agent=self.planner_agent,
            next_nodes=["logistics"]
        )
        
        logistics_node = WorkflowNode(
            id="logistics",
            agent=self.logistics_agent,
            next_nodes=["decision"]
        )
        
        # Decision point: approve plan or re-plan
        decision_node = WorkflowDecision(
            id="decision",
            condition=lambda context: context.get("plan_approved", False),
            true_node="communications",
            false_node="planner"  # Loop back if plan not viable
        )
        
        communications_node = WorkflowNode(
            id="communications",
            agent=self.communications_agent,
            next_nodes=[]  # End of workflow
        )
        
        workflow.add_node(monitor_node)
        workflow.add_node(planner_node)
        workflow.add_node(logistics_node)
        workflow.add_node(decision_node)
        workflow.add_node(communications_node)
        
        return workflow
    
    def _get_route_feasibility_tool(self):
        """Tool for checking route feasibility via carrier APIs."""
        def check_route_feasibility(origin: str, destination: str, cargo_type: str):
            # In production: call real carrier API
            logger.info(f"Checking feasibility: {origin} -> {destination}")
            return {"feasible": True, "restrictions": []}
        
        return check_route_feasibility
    
    def _get_carrier_costs_tool(self):
        """Tool for getting real-time carrier costs."""
        def get_carrier_costs(origin: str, destination: str, weight_kg: float):
            # In production: call pricing APIs
            logger.info(f"Getting costs for {weight_kg}kg: {origin} -> {destination}")
            return {"cost_usd": 2500, "carrier": "GlobalShip"}
        
        return get_carrier_costs
    
    def _get_transit_times_tool(self):
        """Tool for estimating transit times."""
        def get_transit_times(origin: str, destination: str, mode: str):
            # In production: call routing APIs
            logger.info(f"Getting transit time: {origin} -> {destination} via {mode}")
            return {"transit_days": 5, "confidence": 0.9}
        
        return get_transit_times
    
    def handle_disruption(self, event_data: dict):
        """
        Handle a supply chain disruption event.
        
        Args:
            event_data: Disruption event details (port closure, delay, etc.)
        """
        logger.info(f"Processing disruption: {event_data.get('type')}")
        
        # Create conversation thread for this disruption
        thread = AgentThread(name=f"Disruption-{event_data.get('id')}")
        
        # Run workflow with observability
        try:
            result = self.workflow.run(
                start_node="monitor",
                initial_message=f"New disruption event: {event_data}",
                thread=thread,
                max_iterations=10
            )
            
            logger.info(f"Workflow completed in {result.duration_ms}ms")
            logger.info(f"Agents involved: {result.agents_used}")
            logger.info(f"Total cost: {result.total_cost_usd} USD")
            
            return {
                "success": True,
                "customer_notification": result.final_output,
                "execution_time_ms": result.duration_ms
            }
            
        except Exception as e:
            logger.error(f"Workflow failed: {e}")
            return {"success": False, "error": str(e)}

# Usage Example
if __name__ == "__main__":
    manager = SupplyChainDisruptionManager(
        azure_openai_endpoint="https://your-endpoint.openai.azure.com"
    )
    
    # Simulate disruption event
    event = {
        "id": "DISRUPT-2025-001",
        "type": "port_closure",
        "location": "Port of Los Angeles",
        "severity": "high",
        "affected_shipments": 15
    }
    
    result = manager.handle_disruption(event)
    print(f"Response: {result}")


# ============================================================================
# BONUS: Agent Framework with Mem0 Persistent Memory
# ============================================================================
# Demonstrates how agents remember user preferences across conversations

import asyncio
import uuid
from agent_framework.azure import AzureAIAgentClient
from agent_framework.context import Mem0Provider
from azure.identity import AzureCliCredential

async def agent_with_memory_example():
    """
    Example of memory usage with Mem0 context provider.
    Agent remembers user preferences across threads and sessions.
    """
    print("=== Mem0 Context Provider Example ===\\n")

    # Each record in Mem0 should be associated with user_id
    # This enables user-specific memory across all conversations
    user_id = str(uuid.uuid4())

    # For Azure authentication, run 'az login' in terminal
    # For Mem0 authentication, set MEM0_API_KEY environment variable
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentClient(async_credential=credential).create_agent(
            name="FriendlyAssistant",
            instructions="You are a friendly assistant.",
            tools=retrieve_company_report,  # Your custom tool function
            context_providers=Mem0Provider(user_id=user_id),
        ) as agent,
    ):
        # First ask the agent to retrieve a company report with no previous context
        query = "Please retrieve my company report"
        print(f"User: {query}")
        result = await agent.run(query)
        print(f"Agent: {result}\\n")
        # Agent will ask for company code and format since nothing is stored yet

        # Now tell the agent your preferences - it will store them in Mem0
        query = "I always work with CNTS and I always want a detailed report format. Please remember and retrieve it."
        print(f"User: {query}")
        result = await agent.run(query)
        print(f"Agent: {result}\\n")
        # Agent stores: company=CNTS, format=detailed

        print("\\nRequest within a new thread:")
        # Create a new thread for the agent
        thread = agent.get_new_thread()

        # Since we have the Mem0 component in the thread, the agent should be able to
        # retrieve the company report without asking for clarification, as it will
        # be able to remember the user preferences from Mem0 component
        query = "Please retrieve my company report"
        print(f"User: {query}")
        result = await agent.run(query, thread=thread)
        print(f"Agent: {result}\\n")
        # Agent remembers company=CNTS and format=detailed from Mem0!
        # No need to ask again - memory persists across threads

# How it works:
# 1. Agent with Mem0 context provider associates memory with user_id
# 2. User teaches the agent preferences (company code, report format)
# 3. Agent retrieves info using remembered context across NEW threads
# 4. Persistent memory survives across sessions

# Quick Start:
# Install: pip install agent-framework-mem0
# Set environment: export MEM0_API_KEY=your_key
# Run: asyncio.run(agent_with_memory_example())

# Other Mem0 Examples in GitHub:
# - mem0_oss.py: Open source Mem0 usage
# - mem0_threads.py: Advanced thread management
# See: https://github.com/microsoft/agent-framework/tree/main/examples/mem0

if __name__ == "__main__":
    asyncio.run(agent_with_memory_example())`,
  codeVisualizer: Mem0AgentMemoryVisual,
};
