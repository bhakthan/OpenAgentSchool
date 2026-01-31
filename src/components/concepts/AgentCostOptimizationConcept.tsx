import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Zap, Database, GitBranch, TrendingDown, AlertTriangle, Code, Target, Layers, Calculator } from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";

interface OptimizationStrategy {
  id: string;
  name: string;
  icon: React.ReactNode;
  impact: string;
  description: string;
  savingsRange: string;
}

const strategies: OptimizationStrategy[] = [
  {
    id: "token-budget",
    name: "Token Budgeting",
    icon: <Calculator className="w-6 h-6" />,
    impact: "20-50% cost reduction",
    description: "Set hard limits on tokens per request, conversation, and session. Truncate context strategically.",
    savingsRange: "$500-5000/month"
  },
  {
    id: "caching",
    name: "Response Caching",
    icon: <Database className="w-6 h-6" />,
    impact: "30-70% cost reduction",
    description: "Cache responses for identical or similar queries. Use semantic similarity for fuzzy matching.",
    savingsRange: "$1000-10000/month"
  },
  {
    id: "model-routing",
    name: "Model Routing",
    icon: <GitBranch className="w-6 h-6" />,
    impact: "40-80% cost reduction",
    description: "Route simple queries to cheap models, complex ones to expensive models. Use classifier or complexity estimation.",
    savingsRange: "$2000-20000/month"
  },
  {
    id: "batch-processing",
    name: "Batch Processing",
    icon: <Layers className="w-6 h-6" />,
    impact: "50% cost reduction",
    description: "Use batch APIs (50% cheaper) for non-real-time workloads. Process in bulk with 24h SLA.",
    savingsRange: "$500-5000/month"
  }
];

const tokenBudgetCode = `class TokenBudgetManager:
    """Manage token budgets to control costs"""
    
    def __init__(self, limits: dict):
        self.limits = limits  # per_request, per_conversation, per_user_daily
        self.usage = {}
    
    async def check_budget(self, user_id: str, estimated_tokens: int) -> dict:
        """Check if request is within budget"""
        
        user_usage = self.usage.get(user_id, {"daily": 0, "conversation": 0})
        
        # Check limits
        if user_usage["daily"] + estimated_tokens > self.limits["per_user_daily"]:
            return {
                "allowed": False,
                "reason": "Daily budget exceeded",
                "remaining": self.limits["per_user_daily"] - user_usage["daily"]
            }
        
        if estimated_tokens > self.limits["per_request"]:
            return {
                "allowed": False,
                "reason": f"Request too large ({estimated_tokens} tokens)",
                "max_allowed": self.limits["per_request"]
            }
        
        return {"allowed": True, "estimated_cost": self._calculate_cost(estimated_tokens)}
    
    def compress_context(self, messages: list, max_tokens: int) -> list:
        """Compress conversation to fit budget"""
        
        total_tokens = sum(self._count_tokens(m) for m in messages)
        
        if total_tokens <= max_tokens:
            return messages
        
        # Keep system prompt and last N messages
        compressed = []
        
        # Always keep system prompt
        if messages[0]["role"] == "system":
            compressed.append(messages[0])
            messages = messages[1:]
        
        # Summarize older messages
        if len(messages) > 4:
            old_messages = messages[:-4]
            summary = self._summarize_messages(old_messages)
            compressed.append({
                "role": "system",
                "content": f"Previous conversation summary: {summary}"
            })
            messages = messages[-4:]
        
        compressed.extend(messages)
        return compressed

# Usage
budget_manager = TokenBudgetManager({
    "per_request": 8000,
    "per_conversation": 50000,
    "per_user_daily": 200000
})`;

const cachingCode = `import hashlib
import numpy as np

class SemanticCache:
    """Cache with semantic similarity matching"""
    
    def __init__(self, redis_client, embedder, similarity_threshold: float = 0.95):
        self.redis = redis_client
        self.embedder = embedder
        self.similarity_threshold = similarity_threshold
    
    async def get(self, query: str, model: str):
        """Check cache for exact or semantic match"""
        
        # Try exact match first (fast)
        query_hash = self._hash(query)
        exact_hit = await self.redis.get(f"cache:exact:{query_hash}")
        if exact_hit:
            await self._increment_hits(query_hash)
            return exact_hit
        
        # Try semantic match (slower but more flexible)
        query_embedding = await self.embedder.embed(query)
        
        # Get recent cache entries for comparison
        recent_entries = await self._get_recent_entries(model, limit=1000)
        
        for entry in recent_entries:
            similarity = self._cosine_similarity(query_embedding, entry.embedding)
            
            if similarity >= self.similarity_threshold:
                await self._increment_hits(entry.query_hash)
                return entry.response
        
        return None
    
    async def set(self, query: str, response: str, model: str, ttl: int = 3600):
        """Cache a response"""
        
        query_hash = self._hash(query)
        
        # Store for exact match
        await self.redis.setex(f"cache:exact:{query_hash}", ttl, response)
    
    def _cosine_similarity(self, a: list, b: list) -> float:
        a, b = np.array(a), np.array(b)
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def _hash(self, query: str) -> str:
        normalized = query.lower().strip()
        return hashlib.sha256(normalized.encode()).hexdigest()`;

const modelRoutingCode = `from enum import Enum

class ModelTier(Enum):
    FAST = "fast"      # GPT-4o-mini, Claude Haiku
    STANDARD = "standard"  # GPT-4o, Claude Sonnet
    PREMIUM = "premium"  # Claude Opus, GPT-4-turbo

class ModelRouter:
    """Route queries to appropriate model based on complexity"""
    
    def __init__(self, classifier, models_config: dict):
        self.classifier = classifier
        self.models = models_config
        
        # Cost per 1M tokens (input + output averaged)
        self.costs = {
            "gpt-4o-mini": 0.375,
            "gpt-4o": 6.25,
            "claude-3.5-haiku": 1.0,
            "claude-3.5-sonnet": 9.0,
        }
    
    async def route(self, query: str, context: dict = None) -> dict:
        """Determine best model for the query"""
        
        # Classify query complexity
        classification = await self.classifier.classify(query)
        
        # Determine tier
        tier = self._determine_tier(classification)
        
        # Select model
        model = self.models[tier.value]
        
        return {
            "model": model,
            "tier": tier,
            "estimated_cost_1k": self.costs[model],
            "reasoning": classification.reasoning
        }
    
    def _determine_tier(self, classification: dict) -> ModelTier:
        """Map classification to model tier"""
        
        # Simple heuristics
        if classification.task_type in ["faq", "simple_qa", "classification"]:
            return ModelTier.FAST
        
        if classification.task_type in ["coding", "analysis", "creative"]:
            if classification.complexity < 0.5:
                return ModelTier.STANDARD
            return ModelTier.PREMIUM
        
        if classification.requires_reasoning:
            return ModelTier.PREMIUM
        
        return ModelTier.STANDARD

# Simple routing example
SIMPLE_PATTERNS = ["what is", "define", "list", "how many"]

def choose_model(query: str) -> str:
    query_lower = query.lower()
    
    # Simple questions -> cheap model
    if any(p in query_lower for p in SIMPLE_PATTERNS):
        return "gpt-4o-mini"  # 20x cheaper
    
    # Code -> standard model
    if "code" in query_lower:
        return "gpt-4o"
    
    # Default to cheap
    return "gpt-4o-mini"`;

const batchProcessingCode = `class BatchProcessor:
    """Process non-urgent requests in batches for 50% savings"""
    
    def __init__(self, queue, batch_api):
        self.queue = queue
        self.batch_api = batch_api
        self.batch_size = 50000  # Max requests per batch
    
    async def enqueue(self, request: dict, priority: str = "normal") -> str:
        """Add request to batch queue"""
        
        job_id = generate_uuid()
        
        await self.queue.push("batch:" + priority, {
            "id": job_id,
            "request": request,
            "created_at": datetime.now().isoformat()
        })
        
        return job_id
    
    async def process_pending_batches(self):
        """Submit queued requests as batch jobs"""
        
        # Collect pending requests
        pending = await self.queue.pop_many("batch:normal", self.batch_size)
        
        if not pending:
            return
        
        # Format for batch API
        batch_requests = [
            {
                "custom_id": req["id"],
                "method": "POST",
                "url": "/v1/chat/completions",
                "body": req["request"]
            }
            for req in pending
        ]
        
        # Create batch file
        batch_file = await self._upload_batch_file(batch_requests)
        
        # Submit batch (50% cheaper than real-time!)
        batch = await self.batch_api.create(
            input_file_id=batch_file.id,
            endpoint="/v1/chat/completions",
            completion_window="24h"
        )
        
        return batch.id

# Usage for analytics/reports
async def generate_weekly_reports(users):
    """Generate user reports in batch (non-urgent)"""
    
    job_ids = []
    for user_id in users:
        job_id = await batch_processor.enqueue({
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "Generate a weekly report."},
                {"role": "user", "content": "User data: " + str(get_user_data(user_id))}
            ]
        })
        job_ids.append(job_id)
    
    # Submit batch (called by cron job)
    batch_id = await batch_processor.process_pending_batches()
    
    return {"batch_id": batch_id, "jobs": len(job_ids)}`;

// Quick Start code examples - separated to avoid escaping issues
const quickStartTokenCode = `import tiktoken

encoder = tiktoken.encoding_for_model("gpt-4o")

def count_tokens(messages):
    return sum(len(encoder.encode(m["content"])) for m in messages)

# Log token usage for every request
tokens = count_tokens(messages)
cost = tokens * 0.0025 / 1000
print("Request:", tokens, "tokens, Est. cost: $" + str(round(cost, 4)))`;

const quickStartCacheCode = `import hashlib
import redis

cache = redis.Redis()

def cached_completion(query: str, model: str):
    cache_key = hashlib.sha256((model + ":" + query).encode()).hexdigest()
    
    # Check cache
    cached = cache.get(cache_key)
    if cached:
        return cached.decode(), True  # (response, is_cached)
    
    # Call LLM
    response = openai.chat.completions.create(model=model, messages=[...])
    
    # Cache for 1 hour
    cache.setex(cache_key, 3600, response.choices[0].message.content)
    
    return response.choices[0].message.content, False`;

const quickStartRoutingCode = `SIMPLE_PATTERNS = ["what is", "define", "list", "how many"]

def choose_model(query: str) -> str:
    query_lower = query.lower()
    
    # Simple questions -> cheap model (20x cheaper!)
    if any(p in query_lower for p in SIMPLE_PATTERNS):
        return "gpt-4o-mini"
    
    # Code -> standard model
    if "code" in query_lower:
        return "gpt-4o"
    
    # Default to cheap
    return "gpt-4o-mini"

# Use it
model = choose_model(user_query)
response = openai.chat.completions.create(model=model, messages=[...])`;

const modelPricing = [
  { model: "GPT-4o", inputCost: "$2.50", outputCost: "$10.00", bestFor: "Complex reasoning, coding" },
  { model: "GPT-4o-mini", inputCost: "$0.15", outputCost: "$0.60", bestFor: "Simple tasks, high volume" },
  { model: "Claude 3.5 Sonnet", inputCost: "$3.00", outputCost: "$15.00", bestFor: "Long context, analysis" },
  { model: "Claude 3.5 Haiku", inputCost: "$0.25", outputCost: "$1.25", bestFor: "Fast responses" },
  { model: "Gemini 1.5 Pro", inputCost: "$1.25", outputCost: "$5.00", bestFor: "Long documents, multimodal" },
  { model: "Gemini 1.5 Flash", inputCost: "$0.075", outputCost: "$0.30", bestFor: "Ultra-cheap high volume" }
];

const codeExamples: Record<string, string> = {
  "token-budget": tokenBudgetCode,
  "caching": cachingCode,
  "model-routing": modelRoutingCode,
  "batch-processing": batchProcessingCode
};

export default function AgentCostOptimizationConcept() {
  const [selectedStrategy, setSelectedStrategy] = useState<OptimizationStrategy>(strategies[0]);

  return (
    <ConceptLayout
      conceptId="agent-cost-optimization"
      title="Agent Cost Optimization"
      description="Reduce LLM costs by 50-90%: token budgets, caching, model routing, and batch processing"
      icon={<DollarSign className="w-8 h-8" />}
      concepts={["Token Budgeting", "Response Caching", "Model Routing", "Batch Processing"]}
      estimatedTime="40-50 min"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <TrendingDown className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">LLM Costs Add Up Fast</h3>
                <p className="text-muted-foreground">
                  A single agent processing 10,000 queries/day with GPT-4o can cost $15,000+/month. 
                  With the right optimization strategies, you can reduce that to $2,000-3,000 while 
                  maintaining quality. The secret? Use the right model for each task, cache aggressively, 
                  and batch non-urgent work.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-green-500/10">50-90% Savings Possible</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">No Quality Loss</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Production Ready</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="pricing">Model Pricing</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-6">
            {/* Strategy Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {strategies.map((strategy) => (
                <Card
                  key={strategy.id}
                  className={`cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedStrategy.id === strategy.id ? 'border-green-500 bg-green-500/5' : ''
                  }`}
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-green-400">
                      {strategy.icon}
                    </div>
                    <h4 className="font-medium text-sm">{strategy.name}</h4>
                    <Badge variant="secondary" className="mt-1 text-xs">{strategy.impact}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Strategy Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                      {selectedStrategy.icon}
                    </div>
                    <div>
                      <CardTitle>{selectedStrategy.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedStrategy.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">{selectedStrategy.impact}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" /> Typical Savings
                    </h4>
                    <p className="text-2xl font-bold text-green-400">{selectedStrategy.savingsRange}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" /> Best For
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedStrategy.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> Implementation
                  </h4>
                  <CodeBlock language="python">
                    {codeExamples[selectedStrategy.id]}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>LLM Pricing Comparison (per 1M tokens)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Prices as of 2025 - check provider sites for current rates
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Model</th>
                        <th className="text-left p-3">Input</th>
                        <th className="text-left p-3">Output</th>
                        <th className="text-left p-3">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelPricing.map((row, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{row.model}</td>
                          <td className="p-3 text-green-400">{row.inputCost}</td>
                          <td className="p-3 text-orange-400">{row.outputCost}</td>
                          <td className="p-3 text-muted-foreground">{row.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pro Tip: Output tokens cost 3-5x more than input</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Optimize output length first. Use structured output formats to reduce verbosity.
                        A 500-token response vs 2000-token response can save 70% on output costs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quickstart">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Cut Costs Today (30-Minute Setup)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 1: Add Token Counting</h4>
                  <CodeBlock language="python">
                    {quickStartTokenCode}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 2: Add Simple Caching</h4>
                  <CodeBlock language="python">
                    {quickStartCacheCode}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 3: Add Model Routing</h4>
                  <CodeBlock language="python">
                    {quickStartRoutingCode}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
