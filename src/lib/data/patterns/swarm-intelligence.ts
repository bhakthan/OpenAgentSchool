import { PatternData } from './types';
import { SwarmLogisticsVisual } from '@/components/visualization/business-use-cases/SwarmLogisticsVisual';
import { SwarmIntelligenceCodeVisualizer } from '@/components/visualization/business-use-cases/SwarmIntelligenceCodeVisualizer';

export const swarmIntelligencePattern: PatternData = {
  id: 'swarm-intelligence',
  name: 'Swarm Intelligence',
  description: 'A decentralized system of multiple agents that coordinate to achieve a collective goal.',
  category: 'MultiAgent',
  useCases: [
    'Supply Chain Optimization',
    'Drone Swarms for Surveillance',
    'Robotics and Automation',
    'Financial Market Prediction',
  ],
  whenToUse: 'Use this pattern when a problem is too complex for a single agent to solve and can be broken down into smaller, independent tasks that require coordination.',
  
  businessUseCase: {
    industry: 'Logistics and Supply Chain',
    description: 'A fleet of delivery drones uses swarm intelligence to optimize routes and delivery times in real-time, responding to changing weather and traffic conditions. Each drone follows simple local rules but collectively creates efficient, adaptive delivery networks without central coordination.',
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
  
  codeExample: `
    class Agent:
        def __init__(self, environment):
            self.env = environment

        def update(self):
            # Agent senses the environment and acts
            pass

    class Swarm:
        def __init__(self, num_agents):
            self.agents = [Agent(self) for _ in range(num_agents)]

        def run(self):
            for agent in self.agents:
                agent.update()
  `,
  pythonCodeExample: `
    import random

    class Agent:
        def __init__(self, swarm, agent_id):
            self.swarm = swarm
            self.id = agent_id
            self.position = (random.uniform(0, 100), random.uniform(0, 100))

        def update(self):
            # Simple movement rule: move towards the center of the swarm
            avg_x = sum(a.position[0] for a in self.swarm.agents) / len(self.swarm.agents)
            avg_y = sum(a.position[1] for a in self.swarm.agents) / len(self.swarm.agents)
            
            # Move a small step towards the average position
            step_x = (avg_x - self.position[0]) * 0.1
            step_y = (avg_y - self.position[1]) * 0.1
            self.position = (self.position[0] + step_x, self.position[1] + step_y)
            print(f"Agent {self.id} moved to {self.position}")

    class Swarm:
        def __init__(self, num_agents):
            self.agents = [Agent(self, i) for i in range(num_agents)]

        def run_simulation(self, steps):
            for step in range(steps):
                print(f"--- Step {step + 1} ---")
                for agent in self.agents:
                    agent.update()

    # Example usage
    swarm = Swarm(num_agents=5)
    swarm.run_simulation(steps=3)
  `,
  implementation: [
    'Define the agent\'s behavior and rules for interaction.',
    'Create a shared environment for agents to operate in.',
    'Instantiate multiple agents to form the swarm.',
    'Run the simulation and observe the emergent collective behavior.',
  ],
  
  advantages: [
    'Scalable and robust to individual agent failures.',
    'Adaptable to dynamic and unpredictable environments.',
    'Can solve complex problems that are difficult to model centrally.',
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
};
