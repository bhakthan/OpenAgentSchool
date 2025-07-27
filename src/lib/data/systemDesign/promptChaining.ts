import { SystemDesignPattern } from './types';

export const promptChainingAgentSystemDesign: SystemDesignPattern = {
  id: 'prompt-chaining',
  name: 'Prompt Chaining Agent System Design',
  overview: 'A comprehensive system design for building agents that can create and execute sophisticated chains of prompts to solve complex multi-step problems through sequential reasoning and intermediate result processing.',
  problemStatement: 'How to design AI agent systems that can break down complex problems into sequential reasoning steps, maintain context across prompt chains, and intelligently adapt the chain based on intermediate results.',
  solution: 'Implement a prompt chaining architecture with intelligent chain planning, dynamic prompt generation, context flow management, and adaptive chain modification based on intermediate outputs and feedback.',
  steps: [
    {
      id: 'prompt-chaining-chain-design',
      title: 'Intelligent Chain Design & Planning',
      category: 'prompt',
      description: 'Design sophisticated strategies for creating optimal prompt chains that break down complex problems systematically',
      details: 'Create intelligent chain planning systems that can analyze complex problems, identify optimal decomposition strategies, design prompt sequences, and plan context flow between chain steps.',
      considerations: [
        'Problem decomposition strategies and methodologies',
        'Optimal chain length and step granularity',
        'Context preservation and information flow planning',
        'Chain branching and conditional logic requirements'
      ],
      bestPractices: [
        'Use hierarchical decomposition for complex multi-domain problems',
        'Design prompts with clear input/output specifications',
        'Implement chain validation and coherence checking',
        'Create reusable chain templates for common problem patterns',
        'Design adaptive chain modification based on intermediate results'
      ],
      examples: [
        'chain_planner = ChainPlanner(strategy="hierarchical_decomposition")',
        'prompt_chain = [\n  "Analyze problem: {problem}",\n  "Generate solution approach: {analysis}",\n  "Implement solution: {approach}"\n]',
        'chain_validator = ChainCoherenceValidator(check_context_flow=True)'
      ]
    },
    {
      id: 'prompt-chaining-context-flow',
      title: 'Dynamic Context Flow Management',
      category: 'context',
      description: 'Implement sophisticated context management that maintains information flow and coherence across prompt chain steps',
      details: 'Design context management systems that can track information flow between chain steps, maintain relevant context, filter and transform intermediate results, and ensure coherence across the entire chain.',
      considerations: [
        'Context transformation and filtering between steps',
        'Information preservation and loss prevention',
        'Context window optimization and management',
        'Intermediate result validation and error propagation'
      ],
      bestPractices: [
        'Implement context summarization for long chains',
        'Use structured data formats for intermediate results',
        'Design context validation at each chain step',
        'Implement smart context filtering to prevent information overload',
        'Create context checkpoints for error recovery'
      ],
      examples: [
        'context_flow = ContextFlowManager(max_context_length=4000)',
        'intermediate_result = context_flow.transform_and_filter(step_output)',
        'context_checkpoint = context_flow.create_checkpoint(step_id="analysis_complete")'
      ]
    },
    {
      id: 'prompt-chaining-adaptive-execution',
      title: 'Adaptive Chain Execution & Modification',
      category: 'knowledge',
      description: 'Build intelligent execution systems that can adapt prompt chains dynamically based on intermediate results and feedback',
      details: 'Implement adaptive execution engines that can modify chain structure, add or remove steps, branch into parallel paths, and optimize chain performance based on real-time analysis of intermediate outputs.',
      considerations: [
        'Dynamic chain modification and restructuring',
        'Branching logic and conditional chain execution',
        'Performance optimization and step elimination',
        'Error recovery and alternative path exploration'
      ],
      bestPractices: [
        'Implement chain performance monitoring and optimization',
        'Use decision trees for adaptive chain modification',
        'Design fallback strategies for failed chain steps',
        'Implement parallel chain exploration for complex problems',
        'Create learning mechanisms for chain improvement'
      ],
      examples: [
        'adaptive_executor = AdaptiveChainExecutor(modification_strategy="dynamic")',
        'if step_confidence < threshold:\n    chain.add_verification_step()',
        'parallel_chains = chain.branch_on_uncertainty(alternatives=3)'
      ]
    },
    {
      id: 'prompt-chaining-quality-validation',
      title: 'Chain Quality Assessment & Validation',
      category: 'evaluation',
      description: 'Implement comprehensive quality assessment systems that validate chain outputs and intermediate results',
      details: 'Design validation systems that can assess the quality of each chain step, validate logical consistency across the chain, measure overall chain effectiveness, and provide feedback for improvement.',
      considerations: [
        'Step-wise quality assessment and validation',
        'Logical consistency checking across chain steps',
        'Overall chain effectiveness measurement',
        'Quality degradation detection and prevention'
      ],
      bestPractices: [
        'Implement multi-dimensional quality metrics for each step',
        'Use consistency checking algorithms for logical validation',
        'Design quality gates with automatic chain modification',
        'Implement human-in-the-loop validation for critical chains',
        'Create quality feedback loops for chain improvement'
      ],
      examples: [
        'quality_assessor = ChainQualityAssessor(metrics=["coherence", "accuracy", "completeness"])',
        'consistency_score = logical_consistency_checker.validate_chain(chain_results)',
        'if quality_score < threshold:\n    chain.request_human_review()'
      ]
    },
    {
      id: 'prompt-chaining-system-architecture',
      title: 'Scalable Chain Processing Architecture',
      category: 'architecture',
      description: 'Design robust, scalable architectures for processing complex prompt chains at scale',
      details: 'Create modular architectures that support concurrent chain execution, chain caching and reuse, distributed processing, and integration with various LLM providers and processing backends.',
      considerations: [
        'Concurrent chain execution and resource management',
        'Chain caching and template reuse strategies',
        'Multi-provider LLM integration and failover',
        'Distributed processing and load balancing'
      ],
      bestPractices: [
        'Design stateless chain execution for scalability',
        'Implement chain result caching and memoization',
        'Use async processing for non-blocking chain execution',
        'Design provider-agnostic interfaces for LLM integration',
        'Implement comprehensive chain execution monitoring'
      ],
      examples: [
        'class PromptChainPipeline:\n    def __init__(self, planner, executor, validator):',
        'async def execute_chain(self, problem: Problem) -> ChainResult:',
        'chain_cache = ChainResultCache(backend="redis", ttl=3600)'
      ]
    },
    {
      id: 'prompt-chaining-llm-integration',
      title: 'Multi-Provider LLM Integration & Optimization',
      category: 'tools',
      description: 'Integrate with multiple LLM providers and optimize prompt execution across different models and APIs',
      details: 'Build comprehensive LLM integration systems that can work with multiple providers, optimize prompt formatting for different models, handle rate limiting, and provide intelligent model selection.',
      considerations: [
        'Multi-provider API integration and management',
        'Model-specific prompt optimization and formatting',
        'Rate limiting and cost optimization strategies',
        'Provider failover and reliability management'
      ],
      bestPractices: [
        'Design unified interfaces for different LLM providers',
        'Implement intelligent model selection based on task requirements',
        'Use provider rotation and load balancing for reliability',
        'Implement cost optimization and budget management',
        'Design comprehensive error handling and retry logic'
      ],
      examples: [
        '@llm_provider_registry.register\ndef openai_provider(prompt: str, model: str) -> str:',
        'model_selector = ModelSelector(criteria=["cost", "performance", "availability"])',
        'provider_manager = LLMProviderManager(providers=["openai", "anthropic", "cohere"])'
      ]
    },
    {
      id: 'prompt-chaining-workflow-orchestration',
      title: 'Chain Workflow Orchestration & Control',
      category: 'instruction',
      description: 'Implement sophisticated workflow control for managing complex prompt chain execution lifecycles',
      details: 'Design workflow orchestration systems that can manage chain execution graphs, handle conditional branching, coordinate parallel chain execution, and provide real-time monitoring and control.',
      considerations: [
        'Chain execution graph management and visualization',
        'Conditional branching and decision point handling',
        'Parallel chain coordination and synchronization',
        'Real-time monitoring and intervention capabilities'
      ],
      bestPractices: [
        'Use directed acyclic graphs (DAGs) for chain representation',
        'Implement real-time chain execution monitoring',
        'Design intervention points for human oversight',
        'Use event-driven coordination for complex workflows',
        'Implement comprehensive chain execution logging'
      ],
      examples: [
        'chain_workflow = ChainWorkflowDAG(nodes=chain_steps, edges=dependencies)',
        'orchestrator = ChainOrchestrator(execution_strategy="parallel_where_possible")',
        'monitor = RealTimeChainMonitor(alert_conditions=["timeout", "quality_degradation"])'
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Chain Planning Engine',
        type: 'processing',
        description: 'Analyzes complex problems and designs optimal prompt chain strategies'
      },
      {
        name: 'Dynamic Prompt Generator',
        type: 'processing',
        description: 'Generates contextually appropriate prompts for each step in the chain'
      },
      {
        name: 'Context Flow Manager',
        type: 'storage',
        description: 'Manages information flow and context preservation across chain steps'
      },
      {
        name: 'Adaptive Chain Executor',
        type: 'processing',
        description: 'Executes prompt chains with dynamic modification capabilities'
      },
      {
        name: 'Multi-Provider LLM Gateway',
        type: 'processing',
        description: 'Manages integration with multiple LLM providers and model selection'
      },
      {
        name: 'Chain Quality Validator',
        type: 'control',
        description: 'Validates chain outputs and ensures quality across all steps'
      },
      {
        name: 'Result Aggregation Engine',
        type: 'processing',
        description: 'Combines and synthesizes results from chain execution'
      },
      {
        name: 'Workflow Orchestrator',
        type: 'control',
        description: 'Coordinates complex chain workflows and manages execution flow'
      },
      {
        name: 'Problem Input Interface',
        type: 'input',
        description: 'Handles complex problem specifications and chain requirements'
      },
      {
        name: 'Solution Output System',
        type: 'output',
        description: 'Delivers final solutions and detailed chain execution reports'
      }
    ],
    flows: [
      {
        from: 'Problem Input Interface',
        to: 'Chain Planning Engine',
        description: 'Complex problems are analyzed and decomposed into chain strategies'
      },
      {
        from: 'Chain Planning Engine',
        to: 'Dynamic Prompt Generator',
        description: 'Chain plans are used to generate specific prompts for each step'
      },
      {
        from: 'Dynamic Prompt Generator',
        to: 'Multi-Provider LLM Gateway',
        description: 'Generated prompts are sent to appropriate LLM providers'
      },
      {
        from: 'Multi-Provider LLM Gateway',
        to: 'Adaptive Chain Executor',
        description: 'LLM responses are processed and fed into chain execution logic'
      },
      {
        from: 'Adaptive Chain Executor',
        to: 'Context Flow Manager',
        description: 'Intermediate results are stored and context is updated'
      },
      {
        from: 'Context Flow Manager',
        to: 'Chain Quality Validator',
        description: 'Chain context and results are validated for quality and consistency'
      },
      {
        from: 'Chain Quality Validator',
        to: 'Result Aggregation Engine',
        description: 'Validated results are aggregated into final solutions'
      },
      {
        from: 'Workflow Orchestrator',
        to: 'Adaptive Chain Executor',
        description: 'Orchestrates chain execution flow and manages branching logic'
      },
      {
        from: 'Result Aggregation Engine',
        to: 'Solution Output System',
        description: 'Final aggregated solutions are prepared for delivery'
      },
      {
        from: 'Adaptive Chain Executor',
        to: 'Dynamic Prompt Generator',
        description: 'Feedback loop for dynamic chain modification and prompt adaptation'
      }
    ]
  }
};
