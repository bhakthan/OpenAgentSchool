import { PatternData } from './types';
import { SwarmLogisticsVisual } from '@/components/visualization/business-use-cases/SwarmLogisticsVisual';
import { SwarmIntelligenceCodeVisualizer } from '@/components/visualization/business-use-cases/SwarmIntelligenceCodeVisualizer';

export const swarmIntelligencePattern: PatternData = {
  id: 'swarm-intelligence',
  name: 'Swarm Intelligence',
  description: 'A decentralized system of multiple agents that coordinate to achieve a collective goal.',
  category: 'Multi-Agent',
  useCases: [
    'Supply Chain Optimization',
    'Drone Swarms for Surveillance',
    'Robotics and Automation',
    'Financial Market Prediction',
  ],
  whenToUse: 'Use this pattern when a problem is too complex for a single agent to solve and can be broken down into smaller, independent tasks that require coordination.',
  
  businessUseCase: {
    industry: 'Logistics and Supply Chain',
    description: 'A fleet of delivery drones uses swarm intelligence with Agent Framework Context Providers for collective memory. Each drone accesses shared discoveries (optimal routes, obstacle locations) through SwarmMemory, while Redis persistence maintains knowledge across sessions. The drones deposit pheromone-like signals when discovering efficient paths, creating stigmergy-based coordination. This memory-enhanced swarm adapts to changing weather and traffic conditions without central control, achieving emergent route optimization through collective learning.',
    visualization: SwarmLogisticsVisual,
    enlightenMePrompt: `
      Provide a comprehensive technical guide for implementing a swarm intelligence-based drone delivery system.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Swarm Intelligence Architecture
      - Decentralized agent design principles
      - Local rule sets for individual drones
      - Stigmergy-based communication mechanisms
      - Emergent behavior optimization

      ### 2. Technical Implementation
      - Python code for swarm agent coordination
      - Route optimization algorithms (Ant Colony Optimization)
      - Real-time collision avoidance systems
      - Environmental signal processing (weather, traffic)

      ### 3. Scalability and Performance
      - Horizontal scaling strategies for large drone fleets
      - Performance metrics and monitoring
      - Fault tolerance and self-healing mechanisms
      - Load balancing and resource allocation

      ### 4. Real-world Deployment Considerations
      - Regulatory compliance and safety protocols
      - Integration with existing logistics systems
      - Cost-benefit analysis and ROI projections
      - Maintenance and operational challenges

      Focus on the technical aspects of how simple local interactions between autonomous agents can lead to complex, optimized global behaviors without centralized control.
    `,
  },
  
  nodes: [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
    { id: '2', type: 'llm', data: { label: 'Decentralized Agents' }, position: { x: 100, y: 100 } },
    { id: '3', type: 'tool', data: { label: 'Shared Environment' }, position: { x: 400, y: 100 } },
    { id: '4', type: 'aggregator', data: { label: 'Collective Goal' }, position: { x: 250, y: 200 } },
    { id: '5', type: 'output', data: { label: 'Emergent Behavior' }, position: { x: 250, y: 300 } },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
  ],
  
  codeExample: `# Microsoft Agent Framework - Swarm Intelligence with Shared Memory
# LiveRunner: Execute this code to see swarm agents learning collectively
# Requires: pip install agent-framework[all]

import asyncio
from agent_framework.azure import AzureAIAgentClient
from agent_framework.redis import RedisChatMessageStore
from agent_framework import ContextProvider, Context
from azure.identity import AzureCliCredential
import random

class SwarmMemory(ContextProvider):
    """
    Shared memory for swarm agents - tracks collective discoveries.
    Agents can learn from each other's experiences.
    """
    def __init__(self):
        self.discovered_routes = {}  # Shared knowledge base
        self.obstacle_locations = set()
        self.best_performers = {}

    async def invoking(self, messages, **kwargs) -> Context:
        """Inject swarm knowledge before each agent action."""
        if self.discovered_routes:
            best_route = min(self.discovered_routes.items(), key=lambda x: x[1])
            knowledge = f"Swarm Knowledge: Best route found by agent {best_route[0][0]} to {best_route[0][1]} in {best_route[1]} steps."
            if self.obstacle_locations:
                knowledge += f" Known obstacles: {list(self.obstacle_locations)[:5]}"
            return Context(instructions=knowledge)
        return Context()

    def share_discovery(self, agent_id: str, destination: str, steps: int):
        """Agent shares its discovery with the swarm."""
        self.discovered_routes[(agent_id, destination)] = steps

async def swarm_delivery_system():
    """
    Drone delivery swarm with collective memory.
    Agents learn optimal routes and share knowledge.
    """
    print("=== Swarm Intelligence with Collective Memory ===\\n")
    
    credential = AzureCliCredential()
    swarm_memory = SwarmMemory()
    
    # Redis for persistent swarm coordination
    def create_redis_store(agent_id: str):
        return RedisChatMessageStore(
            redis_url="redis://localhost:6379",
            thread_id=f"swarm_{agent_id}",
            max_messages=50
        )
    
    async with AzureAIAgentClient(async_credential=credential) as client:
        # Create swarm of 5 delivery drones
        swarm_agents = []
        for i in range(5):
            agent = await client.create_agent(
                name=f"DroneAgent_{i}",
                instructions=f"""You are Drone {i} in a delivery swarm.
                Learn from other drones' experiences. Optimize routes.
                Report discoveries: optimal paths, obstacles, delivery times.
                Coordinate with swarm memory to improve collective performance.""",
                model="gpt-4",
                context_providers=swarm_memory,  # Shared memory
                chat_message_store_factory=lambda: create_redis_store(f"drone_{i}")
            )
            swarm_agents.append((f"Drone_{i}", agent))
        
        # Simulation: Each drone attempts delivery
        destinations = ["Downtown", "Airport", "Harbor", "Suburbs", "Industrial"]
        
        print("=== Round 1: Initial Exploration ===")
        for drone_name, drone_agent in swarm_agents[:3]:  # First 3 drones
            dest = random.choice(destinations)
            print(f"\\n{drone_name} attempting delivery to {dest}...")
            response = await drone_agent.run(
                f"Find optimal route to {dest}. Report obstacles and estimated time."
            )
            print(f"{drone_name}: {response[:200]}...")
            
            # Simulate learning and sharing
            steps = random.randint(50, 150)
            swarm_memory.share_discovery(drone_name, dest, steps)
        
        print("\\n\\n=== Round 2: Learning from Swarm Memory ===")
        for drone_name, drone_agent in swarm_agents[3:]:  # Remaining drones
            dest = random.choice(destinations)
            print(f"\\n{drone_name} attempting delivery to {dest}...")
            print(f"  (Has access to {len(swarm_memory.discovered_routes)} shared routes)")
            response = await drone_agent.run(
                f"Find optimal route to {dest}. Use swarm knowledge to improve."
            )
            print(f"{drone_name}: {response[:200]}...")
        
        print("\\n\\n=== Swarm Intelligence Benefits ===")
        print("✓ Agents learn from collective experiences")
        print("✓ Redis persists coordination across sessions")
        print("✓ Shared memory enables emergent optimization")
        print(f"✓ {len(swarm_memory.discovered_routes)} routes discovered collectively")

asyncio.run(swarm_delivery_system())
  `,
  pythonCodeExample: `# Microsoft Agent Framework - Advanced Swarm with Memory
# Shows how swarm agents use Context Providers for collective learning

import asyncio
from agent_framework import ChatAgent, ContextProvider, Context, ChatMessage
from agent_framework.openai import OpenAIChatClient
from agent_framework.redis import RedisChatMessageStore
from collections.abc import MutableSequence, Sequence
from typing import Any
import random

class PheromoneTrails(ContextProvider):
    """
    Mimics ant colony pheromone trails using memory.
    Agents deposit 'pheromones' about good routes.
    """
    def __init__(self):
        self.trails = {}  # {(start, end): strength}
        self.evaporation_rate = 0.95
    
    async def invoking(self, messages: ChatMessage | MutableSequence[ChatMessage], **kwargs: Any) -> Context:
        # Provide strongest pheromone trails to agent
        if self.trails:
            sorted_trails = sorted(self.trails.items(), key=lambda x: x[1], reverse=True)[:3]
            trail_info = "; ".join([f"{k[0]}→{k[1]}: strength {v:.2f}" for k, v in sorted_trails])
            return Context(instructions=f"Strongest trails: {trail_info}")
        return Context()
    
    async def invoked(
        self,
        request_messages: ChatMessage | Sequence[ChatMessage],
        response_messages: ChatMessage | Sequence[ChatMessage] | None = None,
        invoke_exception: Exception | None = None,
        **kwargs: Any,
    ) -> None:
        # Evaporate all pheromones
        for key in self.trails:
            self.trails[key] *= self.evaporation_rate
    
    def deposit_pheromone(self, start: str, end: str, quality: float):
        """Agent deposits pheromone on successful route."""
        key = (start, end)
        self.trails[key] = self.trails.get(key, 0) + quality

class SwarmAgent:
    """Individual agent with memory and coordination."""
    def __init__(self, agent_id: int, chat_agent: ChatAgent, pheromones: PheromoneTrails):
        self.id = agent_id
        self.agent = chat_agent
        self.pheromones = pheromones
        self.position = (random.uniform(0, 100), random.uniform(0, 100))
        self.discoveries = []
    
    async def explore(self, target_location: str) -> dict:
        """Agent explores and learns from swarm memory."""
        response = await self.agent.run(
            f"Navigate from {self.position} to {target_location}. "
            f"Consider pheromone trails from other agents."
        )
        
        # Simulate route quality
        quality = random.uniform(0.5, 1.0)
        self.pheromones.deposit_pheromone(
            str(self.position), target_location, quality
        )
        
        return {
            "agent_id": self.id,
            "route_quality": quality,
            "response": response
        }

async def run_swarm_simulation():
    """Run swarm with collective memory."""
    print("=== Swarm Intelligence Simulation ===\\n")
    
    # Shared pheromone memory
    pheromones = PheromoneTrails()
    
    # Create swarm
    swarm = []
    for i in range(5):
        agent = ChatAgent(
            chat_client=OpenAIChatClient(),
            instructions=f"You are Agent {i} in a swarm. Learn from collective trails.",
            context_providers=pheromones  # Shared memory
        )
        swarm.append(SwarmAgent(i, agent, pheromones))
    
    # Simulate exploration
    targets = ["Target_A", "Target_B", "Target_C"]
    for round_num in range(3):
        print(f"\\n--- Round {round_num + 1} ---")
        for agent in swarm:
            target = random.choice(targets)
            result = await agent.explore(target)
            print(f"Agent {result['agent_id']}: quality {result['route_quality']:.2f} to {target}")
        
        print(f"Pheromone trails: {len(pheromones.trails)} routes discovered")

asyncio.run(run_swarm_simulation())
  `,
  implementation: [
    'Define the agent\'s behavior and rules for interaction.',
    'Create a shared environment for agents to operate in.',
    'Implement Context Providers for collective memory (pheromone trails, shared discoveries).',
    'Configure Redis or other persistent storage for swarm coordination.',
    'Instantiate multiple agents to form the swarm with shared memory access.',
    'Enable agents to deposit and read from collective memory (stigmergy pattern).',
    'Run the simulation and observe the emergent collective behavior.',
    'Monitor memory usage and optimize pheromone evaporation rates.',
  ],
  
  advantages: [
    'Scalable and robust to individual agent failures.',
    'Adaptable to dynamic and unpredictable environments.',
    'Can solve complex problems that are difficult to model centrally.',
    'Shared memory enables collective learning and optimization.',
    'Context Providers allow stigmergy (indirect coordination through environment).',
    'Redis persistence maintains swarm knowledge across sessions.',
  ],
  limitations: [
    'Difficult to predict and control the emergent behavior.',
    'Requires careful design of agent interactions to achieve the desired outcome.',
    'Can be computationally expensive to simulate large swarms.',
  ],
  relatedPatterns: [
    'multi-agent-systems',
    'decentralized-autonomy',
    'emergent-behavior',
  ],
  codeVisualizer: SwarmIntelligenceCodeVisualizer,

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '1-2 weeks',
    complexityReduction: 'Medium - Requires distributed state management and emergent behavior design, but LangChain Context Providers simplify coordination',
    reusabilityScore: 6,
    learningCurve: 'steep',
    velocityPractices: [
      'Pattern Fluency - Specialized swarm pattern for logistics, fleet management, distributed optimization, parallel task allocation',
      'Architecture Templates - LangChain Context Providers + Redis enable stigmergy and shared memory',
      'Failure Scenario Libraries - Swarm convergence failures, memory consistency issues, emergent behavior unpredictability',
      'Operational Instrumentation - Swarm metrics (agent utilization, collective progress, memory churn) critical for debugging'
    ]
  }
};
