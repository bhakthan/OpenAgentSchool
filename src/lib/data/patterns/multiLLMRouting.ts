import { PatternData } from './types';

export const multiLLMRoutingPattern: PatternData = {
  id: 'multi-llm-routing',
  name: 'Multi-LLM Routing',
  description: 'Intelligently route tasks to the optimal LLM based on task complexity, cost constraints, latency requirements, and model capabilities—inspired by OpenRouter-style model selection for maximum efficiency and quality.',
  category: 'Advanced',
  
  useCases: [
    'Cost optimization by routing simple tasks to cheaper models',
    'Quality optimization by routing complex reasoning to frontier models',
    'Latency-sensitive applications needing fastest available model',
    'Fallback chains when primary model is unavailable',
    'Multi-modal routing (text to GPT, vision to Claude, code to Codex)',
    'Budget-aware enterprise deployments'
  ],
  
  whenToUse: 'Use Multi-LLM Routing when you have access to multiple LLMs and want to optimize across cost, quality, and latency. This pattern shines in production systems where simple queries (FAQ, formatting) shouldn\'t incur frontier model costs, while complex reasoning tasks need the best available model. Also essential for resilience: if one provider is down, route to alternatives.',

  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'User Query', nodeType: 'input', description: 'Incoming task or query' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'task-classifier',
      type: 'default',
      data: { label: 'Task Classifier', nodeType: 'llm', description: 'Classifies task complexity & type' },
      position: { x: 280, y: 200 }
    },
    {
      id: 'constraint-evaluator',
      type: 'default',
      data: { label: 'Constraint Evaluator', nodeType: 'evaluator', description: 'Evaluates cost/latency constraints' },
      position: { x: 460, y: 120 }
    },
    {
      id: 'model-registry',
      type: 'default',
      data: { label: 'Model Registry', nodeType: 'aggregator', description: 'Available models with capabilities' },
      position: { x: 460, y: 280 }
    },
    {
      id: 'router',
      type: 'default',
      data: { label: 'LLM Router', nodeType: 'router', description: 'Selects optimal model' },
      position: { x: 640, y: 200 }
    },
    {
      id: 'llm-fast',
      type: 'default',
      data: { label: 'Fast Model (GPT-4o-mini)', nodeType: 'llm', description: 'Low latency, low cost' },
      position: { x: 820, y: 80 }
    },
    {
      id: 'llm-balanced',
      type: 'default',
      data: { label: 'Balanced (Claude Sonnet)', nodeType: 'llm', description: 'Good quality, moderate cost' },
      position: { x: 820, y: 200 }
    },
    {
      id: 'llm-frontier',
      type: 'default',
      data: { label: 'Frontier (Claude Opus)', nodeType: 'llm', description: 'Best quality, higher cost' },
      position: { x: 820, y: 320 }
    },
    {
      id: 'response-validator',
      type: 'default',
      data: { label: 'Response Validator', nodeType: 'evaluator', description: 'Validates response quality' },
      position: { x: 1000, y: 200 }
    },
    {
      id: 'fallback-handler',
      type: 'default',
      data: { label: 'Fallback Handler', nodeType: 'router', description: 'Escalates to better model if needed' },
      position: { x: 1180, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Optimized Response', nodeType: 'output' },
      position: { x: 1360, y: 200 }
    }
  ],

  edges: [
    { id: 'e1', source: 'input', target: 'task-classifier', animated: true },
    { id: 'e2', source: 'task-classifier', target: 'constraint-evaluator' },
    { id: 'e3', source: 'task-classifier', target: 'model-registry' },
    { id: 'e4', source: 'constraint-evaluator', target: 'router', animated: true },
    { id: 'e5', source: 'model-registry', target: 'router', animated: true },
    { id: 'e6', source: 'router', target: 'llm-fast', label: 'simple' },
    { id: 'e7', source: 'router', target: 'llm-balanced', label: 'moderate' },
    { id: 'e8', source: 'router', target: 'llm-frontier', label: 'complex' },
    { id: 'e9', source: 'llm-fast', target: 'response-validator' },
    { id: 'e10', source: 'llm-balanced', target: 'response-validator' },
    { id: 'e11', source: 'llm-frontier', target: 'response-validator' },
    { id: 'e12', source: 'response-validator', target: 'fallback-handler' },
    { id: 'e13', source: 'fallback-handler', target: 'router', label: 'escalate', style: { strokeDasharray: '5,5' } },
    { id: 'e14', source: 'fallback-handler', target: 'output', animated: true }
  ],

  evaluation: `Evaluating Multi-LLM Routing focuses on optimization quality and routing accuracy:
- **Routing Accuracy:** Does the classifier correctly identify task complexity? Are simple tasks routed to cheap models and complex tasks to frontier models?
- **Cost Efficiency:** What is the average cost per query compared to always using the frontier model?
- **Quality Maintenance:** Does routing to cheaper models degrade response quality beyond acceptable thresholds?
- **Latency Performance:** How does end-to-end latency compare to single-model approaches?
- **Fallback Effectiveness:** When the initial model fails, does escalation improve outcomes?
- **Provider Resilience:** When a provider is down, does failover work seamlessly?`,

  implementation: [
    '1. Build task classifier that categorizes queries by complexity (simple/moderate/complex)',
    '2. Create model registry with capabilities, costs, latency, and availability status',
    '3. Implement constraint evaluator that applies budget, latency, and quality requirements',
    '4. Build routing logic that matches task requirements to model capabilities',
    '5. Add response validation to detect low-quality or failed responses',
    '6. Implement fallback/escalation logic to retry with better models when needed',
    '7. Add observability for cost tracking, latency monitoring, and routing decisions'
  ],

  advantages: [
    'Significant cost reduction by using appropriate models for each task',
    'Quality optimization for complex tasks that need frontier models',
    'Latency optimization for time-sensitive simple queries',
    'Resilience through automatic failover between providers',
    'Flexibility to add new models without code changes',
    'Budget management with cost caps and alerts'
  ],

  limitations: [
    'Classification adds latency overhead (mitigated by using fast classifier)',
    'Misclassification can route complex tasks to weak models',
    'Requires maintaining model capability metadata',
    'Cross-provider authentication adds complexity',
    'Response format differences between models need normalization'
  ],

  relatedPatterns: ['agent-escalation', 'fallback-chain', 'evaluator-optimizer'],

  codeExample: `// Multi-LLM Routing Pattern - TypeScript Implementation
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// ============================================
// Model Registry Types
// ============================================

interface ModelConfig {
  id: string;
  provider: 'openai' | 'anthropic' | 'openrouter' | 'azure';
  name: string;
  capabilities: ModelCapabilities;
  pricing: ModelPricing;
  limits: ModelLimits;
  status: 'available' | 'degraded' | 'unavailable';
}

interface ModelCapabilities {
  reasoning: 1 | 2 | 3 | 4 | 5;      // 1=basic, 5=frontier
  coding: 1 | 2 | 3 | 4 | 5;
  creativity: 1 | 2 | 3 | 4 | 5;
  vision: boolean;
  functionCalling: boolean;
  contextWindow: number;
}

interface ModelPricing {
  inputPer1k: number;   // USD per 1K input tokens
  outputPer1k: number;  // USD per 1K output tokens
}

interface ModelLimits {
  maxTokens: number;
  requestsPerMinute: number;
  tokensPerMinute: number;
}

// ============================================
// Task Classification
// ============================================

type TaskComplexity = 'simple' | 'moderate' | 'complex' | 'frontier';
type TaskType = 'chat' | 'reasoning' | 'coding' | 'creative' | 'analysis' | 'vision';

interface TaskClassification {
  complexity: TaskComplexity;
  type: TaskType;
  estimatedTokens: number;
  requiresVision: boolean;
  requiresFunctionCalling: boolean;
  confidence: number;
}

class TaskClassifier {
  private classifierModel: string = 'gpt-4o-mini'; // Fast, cheap classifier
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async classify(query: string, hasImages: boolean = false): Promise<TaskClassification> {
    // Fast heuristics for obvious cases
    if (this.isSimpleQuery(query)) {
      return {
        complexity: 'simple',
        type: 'chat',
        estimatedTokens: query.length / 4,
        requiresVision: hasImages,
        requiresFunctionCalling: false,
        confidence: 0.9
      };
    }

    // Use LLM for ambiguous cases
    const response = await this.openai.chat.completions.create({
      model: this.classifierModel,
      messages: [
        {
          role: 'system',
          content: \`Classify the task complexity and type. Respond with JSON only.
{
  "complexity": "simple|moderate|complex|frontier",
  "type": "chat|reasoning|coding|creative|analysis|vision",
  "reasoning": "brief explanation"
}

Complexity guide:
- simple: greetings, simple facts, formatting, translations
- moderate: summarization, basic analysis, standard coding
- complex: multi-step reasoning, complex coding, detailed analysis
- frontier: novel research, advanced math, creative synthesis\`
        },
        { role: 'user', content: query }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 100
    });

    const result = JSON.parse(response.choices[0].message.content!);
    
    return {
      complexity: result.complexity,
      type: result.type,
      estimatedTokens: query.length / 4 + 500, // Rough estimate
      requiresVision: hasImages,
      requiresFunctionCalling: query.toLowerCase().includes('search') || 
                               query.toLowerCase().includes('calculate'),
      confidence: 0.8
    };
  }

  private isSimpleQuery(query: string): boolean {
    const simplePatterns = [
      /^(hi|hello|hey|thanks|thank you|bye|goodbye)/i,
      /^what (is|are) (the )?(date|time|weather)/i,
      /^(translate|convert|format)/i
    ];
    return simplePatterns.some(p => p.test(query.trim()));
  }
}

// ============================================
// Model Registry
// ============================================

class ModelRegistry {
  private models: Map<string, ModelConfig> = new Map();

  constructor() {
    this.registerDefaultModels();
  }

  private registerDefaultModels(): void {
    // Fast, cheap models
    this.register({
      id: 'gpt-4o-mini',
      provider: 'openai',
      name: 'GPT-4o Mini',
      capabilities: {
        reasoning: 2, coding: 2, creativity: 2,
        vision: true, functionCalling: true, contextWindow: 128000
      },
      pricing: { inputPer1k: 0.00015, outputPer1k: 0.0006 },
      limits: { maxTokens: 16384, requestsPerMinute: 500, tokensPerMinute: 200000 },
      status: 'available'
    });

    // Balanced models
    this.register({
      id: 'gpt-4o',
      provider: 'openai',
      name: 'GPT-4o',
      capabilities: {
        reasoning: 4, coding: 4, creativity: 4,
        vision: true, functionCalling: true, contextWindow: 128000
      },
      pricing: { inputPer1k: 0.005, outputPer1k: 0.015 },
      limits: { maxTokens: 16384, requestsPerMinute: 500, tokensPerMinute: 150000 },
      status: 'available'
    });

    this.register({
      id: 'claude-3-5-sonnet-20241022',
      provider: 'anthropic',
      name: 'Claude 3.5 Sonnet',
      capabilities: {
        reasoning: 4, coding: 5, creativity: 4,
        vision: true, functionCalling: true, contextWindow: 200000
      },
      pricing: { inputPer1k: 0.003, outputPer1k: 0.015 },
      limits: { maxTokens: 8192, requestsPerMinute: 50, tokensPerMinute: 80000 },
      status: 'available'
    });

    // Frontier models
    this.register({
      id: 'claude-opus-4-20250514',
      provider: 'anthropic',
      name: 'Claude Opus 4',
      capabilities: {
        reasoning: 5, coding: 5, creativity: 5,
        vision: true, functionCalling: true, contextWindow: 200000
      },
      pricing: { inputPer1k: 0.015, outputPer1k: 0.075 },
      limits: { maxTokens: 32000, requestsPerMinute: 50, tokensPerMinute: 40000 },
      status: 'available'
    });

    this.register({
      id: 'o1',
      provider: 'openai',
      name: 'OpenAI o1',
      capabilities: {
        reasoning: 5, coding: 5, creativity: 4,
        vision: false, functionCalling: false, contextWindow: 128000
      },
      pricing: { inputPer1k: 0.015, outputPer1k: 0.06 },
      limits: { maxTokens: 32768, requestsPerMinute: 20, tokensPerMinute: 30000 },
      status: 'available'
    });
  }

  register(config: ModelConfig): void {
    this.models.set(config.id, config);
  }

  get(modelId: string): ModelConfig | undefined {
    return this.models.get(modelId);
  }

  findByCapability(
    minCapability: keyof ModelCapabilities,
    minLevel: number
  ): ModelConfig[] {
    return Array.from(this.models.values())
      .filter(m => {
        const cap = m.capabilities[minCapability];
        return typeof cap === 'number' && cap >= minLevel;
      })
      .filter(m => m.status === 'available');
  }

  getAvailable(): ModelConfig[] {
    return Array.from(this.models.values())
      .filter(m => m.status === 'available');
  }

  updateStatus(modelId: string, status: ModelConfig['status']): void {
    const model = this.models.get(modelId);
    if (model) {
      model.status = status;
    }
  }
}

// ============================================
// Routing Constraints
// ============================================

interface RoutingConstraints {
  maxCostPerRequest?: number;     // Max USD per request
  maxLatencyMs?: number;          // Max acceptable latency
  minQuality?: TaskComplexity;    // Minimum model capability
  preferredProvider?: string;     // Prefer specific provider
  requiredCapabilities?: (keyof ModelCapabilities)[];
  excludeModels?: string[];       // Blacklist specific models
}

// ============================================
// LLM Router
// ============================================

class LLMRouter {
  private registry: ModelRegistry;

  constructor(registry: ModelRegistry) {
    this.registry = registry;
  }

  selectModel(
    classification: TaskClassification,
    constraints: RoutingConstraints = {}
  ): ModelConfig | null {
    let candidates = this.registry.getAvailable();

    // Filter by required capabilities
    if (classification.requiresVision) {
      candidates = candidates.filter(m => m.capabilities.vision);
    }
    if (classification.requiresFunctionCalling) {
      candidates = candidates.filter(m => m.capabilities.functionCalling);
    }
    if (constraints.requiredCapabilities) {
      for (const cap of constraints.requiredCapabilities) {
        candidates = candidates.filter(m => {
          const val = m.capabilities[cap];
          return val === true || (typeof val === 'number' && val >= 3);
        });
      }
    }

    // Filter by exclusions
    if (constraints.excludeModels) {
      candidates = candidates.filter(m => !constraints.excludeModels!.includes(m.id));
    }

    // Filter by provider preference
    if (constraints.preferredProvider) {
      const preferred = candidates.filter(m => m.provider === constraints.preferredProvider);
      if (preferred.length > 0) {
        candidates = preferred;
      }
    }

    // Map complexity to minimum capability level
    const complexityToLevel: Record<TaskComplexity, number> = {
      simple: 1,
      moderate: 3,
      complex: 4,
      frontier: 5
    };
    const minLevel = complexityToLevel[classification.complexity];

    // Filter by capability level (use reasoning as primary indicator)
    candidates = candidates.filter(m => m.capabilities.reasoning >= minLevel);

    // If no candidates meet requirements, relax and find best available
    if (candidates.length === 0) {
      candidates = this.registry.getAvailable();
    }

    // Filter by cost constraint
    if (constraints.maxCostPerRequest) {
      const maxCost = constraints.maxCostPerRequest;
      candidates = candidates.filter(m => {
        const estimatedCost = this.estimateCost(m, classification.estimatedTokens);
        return estimatedCost <= maxCost;
      });
    }

    // Sort by cost (prefer cheaper for same capability level)
    candidates.sort((a, b) => {
      // First, sort by capability match (don't overshoot too much)
      const aDiff = Math.abs(a.capabilities.reasoning - minLevel);
      const bDiff = Math.abs(b.capabilities.reasoning - minLevel);
      if (aDiff !== bDiff) return aDiff - bDiff;

      // Then by cost
      return this.estimateCost(a, 1000) - this.estimateCost(b, 1000);
    });

    return candidates[0] || null;
  }

  private estimateCost(model: ModelConfig, tokens: number): number {
    // Assume 1:1 input:output ratio
    return (tokens / 1000) * model.pricing.inputPer1k +
           (tokens / 1000) * model.pricing.outputPer1k;
  }
}

// ============================================
// Multi-LLM Client
// ============================================

interface LLMResponse {
  content: string;
  model: string;
  provider: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
    cost: number;
  };
  latencyMs: number;
}

class MultiLLMClient {
  private openai: OpenAI;
  private anthropic: Anthropic;
  private classifier: TaskClassifier;
  private registry: ModelRegistry;
  private router: LLMRouter;

  constructor() {
    this.openai = new OpenAI();
    this.anthropic = new Anthropic();
    this.registry = new ModelRegistry();
    this.classifier = new TaskClassifier(this.openai);
    this.router = new LLMRouter(this.registry);
  }

  async chat(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    constraints: RoutingConstraints = {}
  ): Promise<LLMResponse> {
    const startTime = Date.now();

    // Classify the task
    const userMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    const classification = await this.classifier.classify(userMessage);
    
    console.log(\`Task classified as: \${classification.complexity} / \${classification.type}\`);

    // Select optimal model
    const model = this.router.selectModel(classification, constraints);
    if (!model) {
      throw new Error('No suitable model available');
    }

    console.log(\`Routing to: \${model.name} (\${model.provider})\`);

    // Execute with selected model
    let response: LLMResponse;

    try {
      if (model.provider === 'openai') {
        response = await this.callOpenAI(model, messages, startTime);
      } else if (model.provider === 'anthropic') {
        response = await this.callAnthropic(model, messages, startTime);
      } else {
        throw new Error(\`Unsupported provider: \${model.provider}\`);
      }
    } catch (error) {
      // Mark model as degraded and retry with fallback
      this.registry.updateStatus(model.id, 'degraded');
      console.warn(\`Model \${model.id} failed, trying fallback\`);
      
      const fallback = this.router.selectModel(classification, {
        ...constraints,
        excludeModels: [...(constraints.excludeModels || []), model.id]
      });

      if (!fallback) {
        throw error;
      }

      if (fallback.provider === 'openai') {
        response = await this.callOpenAI(fallback, messages, startTime);
      } else {
        response = await this.callAnthropic(fallback, messages, startTime);
      }
    }

    return response;
  }

  private async callOpenAI(
    model: ModelConfig,
    messages: Array<{ role: string; content: string }>,
    startTime: number
  ): Promise<LLMResponse> {
    const response = await this.openai.chat.completions.create({
      model: model.id,
      messages: messages as any
    });

    const usage = response.usage!;
    const cost = (usage.prompt_tokens / 1000) * model.pricing.inputPer1k +
                 (usage.completion_tokens / 1000) * model.pricing.outputPer1k;

    return {
      content: response.choices[0].message.content || '',
      model: model.id,
      provider: 'openai',
      usage: {
        inputTokens: usage.prompt_tokens,
        outputTokens: usage.completion_tokens,
        cost
      },
      latencyMs: Date.now() - startTime
    };
  }

  private async callAnthropic(
    model: ModelConfig,
    messages: Array<{ role: string; content: string }>,
    startTime: number
  ): Promise<LLMResponse> {
    const systemMessage = messages.find(m => m.role === 'system');
    const otherMessages = messages.filter(m => m.role !== 'system');

    const response = await this.anthropic.messages.create({
      model: model.id,
      max_tokens: model.limits.maxTokens,
      system: systemMessage?.content,
      messages: otherMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
    });

    const cost = (response.usage.input_tokens / 1000) * model.pricing.inputPer1k +
                 (response.usage.output_tokens / 1000) * model.pricing.outputPer1k;

    return {
      content: response.content[0].type === 'text' ? response.content[0].text : '',
      model: model.id,
      provider: 'anthropic',
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        cost
      },
      latencyMs: Date.now() - startTime
    };
  }
}

// ============================================
// Usage Example
// ============================================

async function main() {
  const client = new MultiLLMClient();

  // Simple query -> routes to cheap model
  const simple = await client.chat([
    { role: 'user', content: 'Hi, how are you?' }
  ]);
  console.log(\`Simple query used \${simple.model}, cost: $\${simple.usage.cost.toFixed(6)}\`);

  // Complex reasoning -> routes to frontier model
  const complex = await client.chat([
    { role: 'user', content: 'Analyze the trade-offs between microservices and monolithic architectures for a fintech startup with 10 engineers, considering regulatory compliance, development velocity, and operational complexity.' }
  ]);
  console.log(\`Complex query used \${complex.model}, cost: $\${complex.usage.cost.toFixed(6)}\`);

  // Cost-constrained
  const budgeted = await client.chat([
    { role: 'user', content: 'Explain quantum computing' }
  ], {
    maxCostPerRequest: 0.001 // Max 0.1 cents
  });
  console.log(\`Budgeted query used \${budgeted.model}, cost: $\${budgeted.usage.cost.toFixed(6)}\`);
}

main().catch(console.error);`,

  pythonCodeExample: `# Multi-LLM Routing Pattern - Python Implementation
import os
import time
import json
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Literal, Any
from enum import Enum
from openai import OpenAI
from anthropic import Anthropic

# ============================================
# Types
# ============================================

class TaskComplexity(Enum):
    SIMPLE = "simple"
    MODERATE = "moderate"
    COMPLEX = "complex"
    FRONTIER = "frontier"

class TaskType(Enum):
    CHAT = "chat"
    REASONING = "reasoning"
    CODING = "coding"
    CREATIVE = "creative"
    ANALYSIS = "analysis"
    VISION = "vision"

@dataclass
class ModelCapabilities:
    reasoning: int  # 1-5
    coding: int
    creativity: int
    vision: bool
    function_calling: bool
    context_window: int

@dataclass
class ModelPricing:
    input_per_1k: float  # USD
    output_per_1k: float

@dataclass
class ModelConfig:
    id: str
    provider: str  # 'openai', 'anthropic', 'openrouter'
    name: str
    capabilities: ModelCapabilities
    pricing: ModelPricing
    status: str = "available"

@dataclass
class TaskClassification:
    complexity: TaskComplexity
    type: TaskType
    estimated_tokens: int
    requires_vision: bool
    requires_function_calling: bool
    confidence: float

@dataclass
class RoutingConstraints:
    max_cost_per_request: Optional[float] = None
    max_latency_ms: Optional[int] = None
    preferred_provider: Optional[str] = None
    exclude_models: List[str] = field(default_factory=list)

@dataclass
class LLMResponse:
    content: str
    model: str
    provider: str
    input_tokens: int
    output_tokens: int
    cost: float
    latency_ms: float

# ============================================
# Task Classifier
# ============================================

class TaskClassifier:
    def __init__(self, openai_client: OpenAI):
        self.client = openai_client
        self.classifier_model = "gpt-4o-mini"
    
    def classify(self, query: str, has_images: bool = False) -> TaskClassification:
        # Fast heuristics for simple queries
        if self._is_simple_query(query):
            return TaskClassification(
                complexity=TaskComplexity.SIMPLE,
                type=TaskType.CHAT,
                estimated_tokens=len(query) // 4,
                requires_vision=has_images,
                requires_function_calling=False,
                confidence=0.9
            )
        
        # Use LLM for classification
        response = self.client.chat.completions.create(
            model=self.classifier_model,
            messages=[
                {
                    "role": "system",
                    "content": """Classify task complexity and type. Respond with JSON:
{
  "complexity": "simple|moderate|complex|frontier",
  "type": "chat|reasoning|coding|creative|analysis|vision"
}

Complexity:
- simple: greetings, facts, formatting
- moderate: summarization, basic analysis
- complex: multi-step reasoning, detailed analysis
- frontier: novel research, advanced math"""
                },
                {"role": "user", "content": query}
            ],
            response_format={"type": "json_object"},
            max_tokens=100
        )
        
        result = json.loads(response.choices[0].message.content)
        
        return TaskClassification(
            complexity=TaskComplexity(result["complexity"]),
            type=TaskType(result["type"]),
            estimated_tokens=len(query) // 4 + 500,
            requires_vision=has_images,
            requires_function_calling="search" in query.lower() or "calculate" in query.lower(),
            confidence=0.8
        )
    
    def _is_simple_query(self, query: str) -> bool:
        import re
        simple_patterns = [
            r"^(hi|hello|hey|thanks|thank you|bye)",
            r"^what (is|are) (the )?(date|time|weather)",
            r"^(translate|convert|format)"
        ]
        return any(re.match(p, query.strip(), re.IGNORECASE) for p in simple_patterns)

# ============================================
# Model Registry
# ============================================

class ModelRegistry:
    def __init__(self):
        self.models: Dict[str, ModelConfig] = {}
        self._register_default_models()
    
    def _register_default_models(self):
        # Fast, cheap
        self.register(ModelConfig(
            id="gpt-4o-mini",
            provider="openai",
            name="GPT-4o Mini",
            capabilities=ModelCapabilities(
                reasoning=2, coding=2, creativity=2,
                vision=True, function_calling=True, context_window=128000
            ),
            pricing=ModelPricing(input_per_1k=0.00015, output_per_1k=0.0006)
        ))
        
        # Balanced
        self.register(ModelConfig(
            id="gpt-4o",
            provider="openai",
            name="GPT-4o",
            capabilities=ModelCapabilities(
                reasoning=4, coding=4, creativity=4,
                vision=True, function_calling=True, context_window=128000
            ),
            pricing=ModelPricing(input_per_1k=0.005, output_per_1k=0.015)
        ))
        
        self.register(ModelConfig(
            id="claude-3-5-sonnet-20241022",
            provider="anthropic",
            name="Claude 3.5 Sonnet",
            capabilities=ModelCapabilities(
                reasoning=4, coding=5, creativity=4,
                vision=True, function_calling=True, context_window=200000
            ),
            pricing=ModelPricing(input_per_1k=0.003, output_per_1k=0.015)
        ))
        
        # Frontier
        self.register(ModelConfig(
            id="claude-opus-4-20250514",
            provider="anthropic",
            name="Claude Opus 4",
            capabilities=ModelCapabilities(
                reasoning=5, coding=5, creativity=5,
                vision=True, function_calling=True, context_window=200000
            ),
            pricing=ModelPricing(input_per_1k=0.015, output_per_1k=0.075)
        ))
    
    def register(self, config: ModelConfig):
        self.models[config.id] = config
    
    def get_available(self) -> List[ModelConfig]:
        return [m for m in self.models.values() if m.status == "available"]
    
    def update_status(self, model_id: str, status: str):
        if model_id in self.models:
            self.models[model_id].status = status

# ============================================
# LLM Router
# ============================================

class LLMRouter:
    def __init__(self, registry: ModelRegistry):
        self.registry = registry
    
    def select_model(
        self,
        classification: TaskClassification,
        constraints: RoutingConstraints = None
    ) -> Optional[ModelConfig]:
        constraints = constraints or RoutingConstraints()
        candidates = self.registry.get_available()
        
        # Filter by vision requirement
        if classification.requires_vision:
            candidates = [m for m in candidates if m.capabilities.vision]
        
        # Filter by function calling
        if classification.requires_function_calling:
            candidates = [m for m in candidates if m.capabilities.function_calling]
        
        # Filter exclusions
        candidates = [m for m in candidates if m.id not in constraints.exclude_models]
        
        # Provider preference
        if constraints.preferred_provider:
            preferred = [m for m in candidates if m.provider == constraints.preferred_provider]
            if preferred:
                candidates = preferred
        
        # Complexity to capability level
        complexity_to_level = {
            TaskComplexity.SIMPLE: 1,
            TaskComplexity.MODERATE: 3,
            TaskComplexity.COMPLEX: 4,
            TaskComplexity.FRONTIER: 5
        }
        min_level = complexity_to_level[classification.complexity]
        
        # Filter by capability
        candidates = [m for m in candidates if m.capabilities.reasoning >= min_level]
        
        if not candidates:
            candidates = self.registry.get_available()
        
        # Cost constraint
        if constraints.max_cost_per_request:
            candidates = [
                m for m in candidates
                if self._estimate_cost(m, classification.estimated_tokens) <= constraints.max_cost_per_request
            ]
        
        # Sort by cost
        candidates.sort(key=lambda m: self._estimate_cost(m, 1000))
        
        return candidates[0] if candidates else None
    
    def _estimate_cost(self, model: ModelConfig, tokens: int) -> float:
        return (tokens / 1000) * (model.pricing.input_per_1k + model.pricing.output_per_1k)

# ============================================
# Multi-LLM Client
# ============================================

class MultiLLMClient:
    def __init__(self):
        self.openai = OpenAI()
        self.anthropic = Anthropic()
        self.registry = ModelRegistry()
        self.classifier = TaskClassifier(self.openai)
        self.router = LLMRouter(self.registry)
    
    def chat(
        self,
        messages: List[Dict[str, str]],
        constraints: RoutingConstraints = None
    ) -> LLMResponse:
        start_time = time.time()
        
        # Classify task
        user_message = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
        classification = self.classifier.classify(user_message)
        print(f"Task: {classification.complexity.value} / {classification.type.value}")
        
        # Select model
        model = self.router.select_model(classification, constraints)
        if not model:
            raise ValueError("No suitable model available")
        
        print(f"Routing to: {model.name} ({model.provider})")
        
        # Execute
        try:
            if model.provider == "openai":
                return self._call_openai(model, messages, start_time)
            elif model.provider == "anthropic":
                return self._call_anthropic(model, messages, start_time)
            else:
                raise ValueError(f"Unsupported provider: {model.provider}")
        except Exception as e:
            # Fallback
            self.registry.update_status(model.id, "degraded")
            print(f"Model {model.id} failed, trying fallback")
            
            constraints = constraints or RoutingConstraints()
            constraints.exclude_models.append(model.id)
            fallback = self.router.select_model(classification, constraints)
            
            if not fallback:
                raise e
            
            if fallback.provider == "openai":
                return self._call_openai(fallback, messages, start_time)
            else:
                return self._call_anthropic(fallback, messages, start_time)
    
    def _call_openai(self, model: ModelConfig, messages: List[Dict], start_time: float) -> LLMResponse:
        response = self.openai.chat.completions.create(
            model=model.id,
            messages=messages
        )
        
        usage = response.usage
        cost = (usage.prompt_tokens / 1000) * model.pricing.input_per_1k + \\
               (usage.completion_tokens / 1000) * model.pricing.output_per_1k
        
        return LLMResponse(
            content=response.choices[0].message.content or "",
            model=model.id,
            provider="openai",
            input_tokens=usage.prompt_tokens,
            output_tokens=usage.completion_tokens,
            cost=cost,
            latency_ms=(time.time() - start_time) * 1000
        )
    
    def _call_anthropic(self, model: ModelConfig, messages: List[Dict], start_time: float) -> LLMResponse:
        system = next((m["content"] for m in messages if m["role"] == "system"), None)
        other_messages = [m for m in messages if m["role"] != "system"]
        
        response = self.anthropic.messages.create(
            model=model.id,
            max_tokens=8192,
            system=system,
            messages=[{"role": m["role"], "content": m["content"]} for m in other_messages]
        )
        
        cost = (response.usage.input_tokens / 1000) * model.pricing.input_per_1k + \\
               (response.usage.output_tokens / 1000) * model.pricing.output_per_1k
        
        return LLMResponse(
            content=response.content[0].text if response.content else "",
            model=model.id,
            provider="anthropic",
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
            cost=cost,
            latency_ms=(time.time() - start_time) * 1000
        )

# ============================================
# Usage
# ============================================

if __name__ == "__main__":
    client = MultiLLMClient()
    
    # Simple -> cheap model
    simple = client.chat([{"role": "user", "content": "Hi, how are you?"}])
    print("Simple: %s, cost: $%.6f" % (simple.model, simple.cost))
    
    # Complex -> frontier model
    complex_q = client.chat([{
        "role": "user",
        "content": "Analyze microservices vs monolith trade-offs for a fintech startup"
    }])
    print("Complex: %s, cost: $%.6f" % (complex_q.model, complex_q.cost))
    
    # Budget-constrained
    budgeted = client.chat(
        [{"role": "user", "content": "Explain quantum computing"}],
        constraints=RoutingConstraints(max_cost_per_request=0.001)
    )
    print("Budgeted: %s, cost: $%.6f" % (budgeted.model, budgeted.cost))`,

  businessUseCase: {
    industry: 'SaaS Platform',
    description: 'A customer support platform processes 1M queries/day. Using Multi-LLM Routing, simple FAQ queries (70%) route to GPT-4o-mini at $0.0006/query, moderate queries (25%) to Claude Sonnet at $0.02/query, and complex escalations (5%) to Claude Opus at $0.10/query. Monthly savings: $450K vs. using frontier model for everything.',
    visualization: {
      type: 'flow',
      layout: 'horizontal',
      steps: [
        'Query arrives → Fast classifier',
        '70% simple → GPT-4o-mini (\$0.0006)',
        '25% moderate → Claude Sonnet (\$0.02)',
        '5% complex → Claude Opus (\$0.10)',
        'Failed responses → Automatic escalation',
        'All responses normalized → User'
      ]
    },
    enlightenMePrompt: 'How would you implement a learning routing system that improves model selection over time based on user satisfaction signals?'
  },

  velocityProfile: {
    timeToFirstToken: 'Variable - depends on routed model',
    totalDuration: 'Optimized - simple queries 10x faster via cheap models',
    cost: 'Low - significant savings by matching model to task complexity'
  }
};
