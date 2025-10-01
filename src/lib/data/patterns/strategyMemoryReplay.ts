import { PatternData } from './types';
import { StrategyMemoryReplayVisual } from '@/components/visualization/business-use-cases/StrategyMemoryReplayVisual';

export const strategyMemoryReplayPattern: PatternData = {
  id: 'strategy-memory-replay',
  name: 'Strategy Memory Replay',
  description: 'Retrieves & adapts historical execution strategies to guide current decomposition & execution for efficiency.',
  category: 'Data Autonomy',
  relatedPatterns: ['schema-aware-decomposition', 'budget-constrained-execution', 'perception-normalization'],
  businessUseCase: {
    industry: 'Financial Research Automation',
    description: 'A financial analytics team uses Agent Framework Context Providers to maintain a memory of successful investigation strategies. When a new VaR (Value at Risk) anomaly occurs, the StrategyMemory Context Provider retrieves similar past cases from Redis, adapts the proven feature extraction steps, and replays the validated diagnostics workflow. The agent\'s memory includes embedding vectors for strategy matching, execution metrics for quality scoring, and full conversation history for audit trails. This memory-driven approach reduces investigation time by 60% and token costs by 40% while maintaining consistency across analysts.',
    visualization: StrategyMemoryReplayVisual,
    enlightenMePrompt: 'Explain how strategy similarity embedding improves replay relevance.'
  },
  nodes: [
    { id: 'task', type: 'input', data: { label: 'Task Signature', nodeType: 'input' }, position: { x: 60, y: 180 } },
    { id: 'retrieve', type: 'default', data: { label: 'Strategy Retrieve', nodeType: 'tool' }, position: { x: 260, y: 120 } },
    { id: 'embed', type: 'default', data: { label: 'Similarity Embed', nodeType: 'evaluator' }, position: { x: 260, y: 240 } },
    { id: 'adapt', type: 'default', data: { label: 'Adapt & Merge', nodeType: 'planner' }, position: { x: 480, y: 180 } },
    { id: 'score', type: 'default', data: { label: 'Score & Select', nodeType: 'evaluator' }, position: { x: 700, y: 180 } },
    { id: 'output', type: 'output', data: { label: 'Replay Strategy', nodeType: 'output' }, position: { x: 920, y: 180 } }
  ],
  edges: [
    { id: 's1', source: 'task', target: 'retrieve', animated: true },
    { id: 's2', source: 'task', target: 'embed', animated: true },
    { id: 's3', source: 'retrieve', target: 'adapt', animated: true },
    { id: 's4', source: 'embed', target: 'adapt', animated: true },
    { id: 's5', source: 'adapt', target: 'score', animated: true },
    { id: 's6', source: 'score', target: 'output', animated: true },
    { id: 's7', source: 'score', target: 'retrieve', label: 'Explore', animated: true }
  ],
  useCases: [
    'Accelerate recurring analytical investigations',
    'Reduce cost of plan generation for similar tasks',
    'Improve consistency of remediation playbooks'
  ],
  whenToUse: 'Use when tasks exhibit structural recurrence and prior strategies are auditable.',
  advantages: [
    'Reduces token cost by 40-60% through strategy reuse',
    'Lowers latency with cached execution plans',
    'Improves plan quality via proven patterns from successful executions',
    'Enables meta-learning without model fine-tuning',
    'Context Providers provide clean separation between memory and agent logic',
    'Redis persistence maintains strategy knowledge across sessions',
    'Embedding-based retrieval ensures semantic similarity matching',
    'Automatic strategy adaptation reduces manual prompt engineering'
  ],
  limitations: [
    'Cold start problem when no historical strategies exist',
    'Risk of stale strategy reuse if task context shifts significantly',
    'Requires embedding model and vector storage infrastructure',
    'Similarity scoring may miss nuanced differences between tasks',
    'Strategy adaptation logic requires domain expertise'
  ],
  implementation: [
    'Step 1: Create StrategyMemory Context Provider extending ContextProvider base class.',
    'Step 2: Implement invoking() to retrieve similar strategies before agent acts (vector similarity search).',
    'Step 3: Adapt historical strategies to current task context (template mutation, step blending).',
    'Step 4: Calculate confidence scores using embedding similarity (cosine distance).',
    'Step 5: Inject adapted strategy into agent context for guided execution.',
    'Step 6: Implement invoked() to store successful strategies after execution completes.',
    'Step 7: Use Redis for persistent strategy storage with embedding vectors.',
    'Step 8: Configure agent with both conversation memory (RedisChatMessageStore) and strategy memory (Context Provider).',
    'Step 9: Track reuse metrics (success rate, cost reduction, time savings) for continuous improvement.'
  ],
  codeExample: `// Agent Framework with Strategy Memory Context Provider
import { Agent, ContextProvider, Context } from '@azure/ai-agents';
import { RedisChatMessageStore } from '@azure/ai-agents/stores';
import { OpenAIChatClient } from '@azure/ai-agents/clients';

interface Strategy {
  id: string;
  taskSignature: string;
  plan: string[];
  metrics: { coverage: number; cost: number; successRate: number };
  embedding: number[];
  timestamp: Date;
}

class StrategyMemory extends ContextProvider {
  private strategies: Map<string, Strategy> = new Map();
  
  constructor(private redisStore: RedisChatMessageStore) {
    super();
  }
  
  // Called before each agent invocation
  async invoking(messages: any[], kwargs: any): Promise<Context> {
    const taskSignature = this.extractTaskSignature(messages);
    const embedding = await this.embedTask(taskSignature);
    
    // Retrieve top-k similar strategies from memory
    const similarStrategies = await this.retrieveSimilar(embedding, 5);
    
    if (similarStrategies.length > 0) {
      // Adapt best strategy to current task
      const adapted = this.adaptStrategy(similarStrategies[0], taskSignature);
      
      return new Context({
        strategy_replay: {
          source: similarStrategies[0].id,
          adapted_plan: adapted.plan,
          confidence: this.calculateSimilarity(embedding, similarStrategies[0].embedding),
          historical_metrics: similarStrategies[0].metrics
        }
      });
    }
    
    return new Context({ strategy_replay: null });
  }
  
  // Called after agent completes
  async invoked(messages: any[], response: any, kwargs: any): Promise<void> {
    // Store successful strategy for future replay
    if (response.success) {
      const strategy: Strategy = {
        id: crypto.randomUUID(),
        taskSignature: this.extractTaskSignature(messages),
        plan: response.execution_steps,
        metrics: {
          coverage: response.coverage,
          cost: response.token_cost,
          successRate: 1.0
        },
        embedding: await this.embedTask(this.extractTaskSignature(messages)),
        timestamp: new Date()
      };
      
      await this.storeStrategy(strategy);
    }
  }
  
  private async retrieveSimilar(embedding: number[], k: number): Promise<Strategy[]> {
    // Vector similarity search in Redis
    const stored = Array.from(this.strategies.values());
    return stored
      .map(s => ({ strategy: s, score: this.calculateSimilarity(embedding, s.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(x => x.strategy);
  }
  
  private adaptStrategy(strategy: Strategy, newTask: string): Strategy {
    // Mutate plan steps to match new task context
    const adapted = { ...strategy };
    adapted.plan = strategy.plan.map(step => 
      step.replace(/{{task}}/, newTask)
    );
    return adapted;
  }
  
  private calculateSimilarity(a: number[], b: number[]): number {
    // Cosine similarity
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
  }
  
  private async embedTask(task: string): Promise<number[]> {
    // Use OpenAI embeddings (simplified)
    return Array(1536).fill(0).map(() => Math.random());
  }
  
  private extractTaskSignature(messages: any[]): string {
    return messages[messages.length - 1]?.content || '';
  }
  
  private async storeStrategy(strategy: Strategy): Promise<void> {
    this.strategies.set(strategy.id, strategy);
    // Persist to Redis in production
  }
}

// Create agent with strategy memory
const strategyMemory = new StrategyMemory(
  new RedisChatMessageStore({
    redis_url: "redis://localhost:6379",
    thread_id: "strategy_memory",
    max_messages: 100
  })
);

const analyst = new Agent({
  name: "financial_analyst",
  instructions: "Analyze VaR anomalies using historical strategies when available",
  memory: new RedisChatMessageStore({
    thread_id: "analyst_session",
  }),
  context_providers: [strategyMemory]  // Inject strategy memory
});

// Execute with automatic strategy replay
async function investigateAnomaly(anomalyDescription: string) {
  const response = await analyst.run(
    \`Investigate this VaR anomaly: \${anomalyDescription}\`
  );
  
  // Strategy automatically injected via Context Provider
  console.log("Strategy used:", response.context?.strategy_replay);
  return response;
}
`,
  pythonCodeExample: `# Agent Framework Strategy Memory Context Provider
from azure.ai.agents import Agent, ContextProvider, Context
from azure.ai.agents.stores import RedisChatMessageStore
from azure.ai.agents.clients import OpenAIChatClient
from typing import List, Dict, Any, Optional
import numpy as np
from datetime import datetime
import json

class StrategyMemory(ContextProvider):
    """Context Provider for strategy replay with memory."""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        super().__init__()
        self.redis_store = RedisChatMessageStore(
            redis_url=redis_url,
            thread_id="strategy_memory"
        )
        self.strategies: Dict[str, Dict] = {}
    
    async def invoking(self, messages: List[Dict], **kwargs) -> Context:
        """Inject historical strategy before agent acts."""
        task_signature = self._extract_task_signature(messages)
        embedding = await self._embed_task(task_signature)
        
        # Retrieve similar strategies from memory
        similar = await self._retrieve_similar(embedding, k=5)
        
        if similar:
            # Adapt best matching strategy
            best_strategy = similar[0]
            adapted = self._adapt_strategy(best_strategy, task_signature)
            similarity = self._cosine_similarity(embedding, best_strategy['embedding'])
            
            return Context({
                "strategy_replay": {
                    "source_id": best_strategy['id'],
                    "adapted_plan": adapted['plan'],
                    "confidence": float(similarity),
                    "historical_metrics": best_strategy['metrics'],
                    "original_task": best_strategy['taskSignature'],
                    "reuse_count": best_strategy.get('reuse_count', 0) + 1
                }
            })
        
        return Context({"strategy_replay": None})
    
    async def invoked(self, messages: List[Dict], response: Any, **kwargs) -> None:
        """Store successful strategy after execution."""
        if hasattr(response, 'success') and response.success:
            task_sig = self._extract_task_signature(messages)
            strategy = {
                'id': f"strategy_{len(self.strategies)}",
                'taskSignature': task_sig,
                'plan': response.execution_steps,
                'metrics': {
                    'coverage': response.coverage,
                    'cost': response.token_cost,
                    'successRate': 1.0,
                    'execution_time': response.duration
                },
                'embedding': await self._embed_task(task_sig),
                'timestamp': datetime.now().isoformat(),
                'reuse_count': 0
            }
            
            await self._store_strategy(strategy)
            print(f"✓ Strategy {strategy['id']} stored in memory")
    
    async def _retrieve_similar(self, embedding: np.ndarray, k: int) -> List[Dict]:
        """Vector similarity search."""
        stored = list(self.strategies.values())
        if not stored:
            return []
        
        # Calculate similarities
        scored = []
        for strategy in stored:
            sim = self._cosine_similarity(embedding, strategy['embedding'])
            scored.append((strategy, sim))
        
        # Sort by similarity descending
        scored.sort(key=lambda x: x[1], reverse=True)
        return [s[0] for s in scored[:k]]
    
    def _adapt_strategy(self, strategy: Dict, new_task: str) -> Dict:
        """Adapt historical strategy to new task context."""
        adapted = strategy.copy()
        # Mutate plan steps for new context
        adapted['plan'] = [
            step.replace("{{task}}", new_task) 
            for step in strategy['plan']
        ]
        return adapted
    
    def _cosine_similarity(self, a: np.ndarray, b: np.ndarray) -> float:
        """Calculate cosine similarity between embeddings."""
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    async def _embed_task(self, task: str) -> np.ndarray:
        """Generate embedding for task signature."""
        # Use OpenAI embeddings in production
        return np.random.rand(1536)  # Simplified for demo
    
    def _extract_task_signature(self, messages: List[Dict]) -> str:
        """Extract task signature from messages."""
        return messages[-1].get('content', '') if messages else ''
    
    async def _store_strategy(self, strategy: Dict) -> None:
        """Persist strategy to memory."""
        self.strategies[strategy['id']] = strategy
        # Persist to Redis in production


# Create agent with strategy memory
strategy_memory = StrategyMemory(redis_url="redis://localhost:6379")

analyst = Agent(
    name="financial_analyst",
    instructions="Analyze VaR anomalies using historical strategies when available",
    memory=RedisChatMessageStore(
        thread_id="analyst_session",
        max_messages=50
    ),
    context_providers=[strategy_memory]  # Enable strategy replay
)

# Execute with automatic memory replay
async def investigate_anomaly(description: str):
    """Investigate with strategy memory."""
    print(f"\\n=== Investigating: {description} ===")
    
    response = await analyst.run(
        f"Investigate this VaR anomaly: {description}"
    )
    
    # Check if strategy was replayed
    if response.context and response.context.get('strategy_replay'):
        replay = response.context['strategy_replay']
        print(f"📚 Replayed strategy {replay['source_id']}")
        print(f"   Confidence: {replay['confidence']:.2%}")
        print(f"   Historical success rate: {replay['historical_metrics']['successRate']:.2%}")
        print(f"   Adapted plan: {len(replay['adapted_plan'])} steps")
    else:
        print("🆕 No similar strategy found - creating new approach")
    
    return response


# Example usage with memory learning
async def demo_strategy_memory():
    """Demonstrate strategy memory over multiple cases."""
    
    # Case 1: First investigation (no memory)
    await investigate_anomaly("Treasury bond volatility spike")
    
    # Case 2: Similar case (should replay strategy)
    await investigate_anomaly("Government bond volatility increase")
    
    # Case 3: Different case (new strategy)
    await investigate_anomaly("Equity market correlation breakdown")
    
    # Case 4: Similar to Case 3 (replay equity strategy)
    await investigate_anomaly("Stock market correlation anomaly")

# Run demonstration
import asyncio
asyncio.run(demo_strategy_memory())
`,
  completeCode: ''
};
