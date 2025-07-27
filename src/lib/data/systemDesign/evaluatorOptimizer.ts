import { SystemDesignPattern } from './types';

export const evaluatorOptimizerSystemDesign: SystemDesignPattern = {
  id: 'evaluator-optimizer',
  name: 'Evaluator-Optimizer Agent System Design',
  overview: 'A comprehensive system design for building intelligent agents that can continuously evaluate performance, identify optimization opportunities, and implement improvements across systems, processes, and other agents.',
  problemStatement: 'How to design agents that can systematically evaluate performance across multiple dimensions, identify bottlenecks and optimization opportunities, and autonomously implement improvements while maintaining system stability and quality.',
  solution: 'Implement a continuous optimization architecture with performance monitoring, intelligent analysis, optimization strategy generation, safe implementation, and feedback-driven improvement cycles.',
  steps: [
    {
      id: 'evaluator-optimizer-prompt-design',
      title: 'Performance-Aware Prompt Engineering',
      category: 'prompt',
      description: 'Design prompting strategies that enable comprehensive performance evaluation and optimization strategy generation',
      details: 'Create sophisticated evaluation and optimization prompts that can assess performance across multiple dimensions, identify improvement opportunities, and generate actionable optimization strategies.',
      considerations: [
        'Multi-dimensional performance assessment and analysis',
        'Optimization opportunity identification and prioritization',
        'Trade-off analysis and constraint consideration',
        'Implementation risk assessment and mitigation planning'
      ],
      bestPractices: [
        'Use structured performance evaluation frameworks',
        'Implement systematic optimization opportunity analysis',
        'Design risk-aware optimization strategy prompts',
        'Create iterative improvement and validation prompts',
        'Use data-driven optimization decision prompts'
      ],
      examples: [
        'eval_prompt = PerformanceEvaluationPrompt(metrics=["speed", "accuracy", "cost"], baseline=current_performance)',
        'optimization_prompt = OptimizationStrategyPrompt(bottlenecks=identified_issues, constraints=system_limits)',
        'risk_prompt = ImplementationRiskPrompt(strategy=optimization_plan, safety_requirements=safety_criteria)'
      ]
    },
    {
      id: 'evaluator-optimizer-context-monitoring',
      title: 'Continuous Performance Context & Monitoring',
      category: 'context',
      description: 'Implement comprehensive performance monitoring and context tracking for continuous evaluation and optimization',
      details: 'Design monitoring systems that continuously track performance metrics, maintain historical context, and provide real-time insights for optimization decisions.',
      considerations: [
        'Real-time performance monitoring and alerting',
        'Historical performance trend analysis and comparison',
        'Multi-system context correlation and analysis',
        'Performance baseline establishment and drift detection'
      ],
      bestPractices: [
        'Implement comprehensive metric collection and aggregation',
        'Use time-series analysis for performance trend detection',
        'Design anomaly detection and alert systems',
        'Create performance baseline and benchmark management',
        'Implement cross-system performance correlation'
      ],
      examples: [
        'performance_monitor = ContinuousPerformanceMonitor(metrics=metric_config, frequency="real_time")',
        'context_tracker = OptimizationContext(historical_data=performance_history, current_state=system_state)',
        'baseline_manager = PerformanceBaselineManager(benchmarks=standard_benchmarks, custom_metrics=domain_metrics)'
      ]
    },
    {
      id: 'evaluator-optimizer-analysis-engine',
      title: 'Intelligent Performance Analysis & Bottleneck Detection',
      category: 'knowledge',
      description: 'Build sophisticated analysis engines that can identify performance bottlenecks, root causes, and optimization opportunities',
      details: 'Implement advanced analytics systems that can analyze performance data, identify bottlenecks, detect patterns, and generate insights for optimization strategies.',
      considerations: [
        'Root cause analysis and bottleneck identification',
        'Performance pattern recognition and trend analysis',
        'Multi-variable correlation and dependency analysis',
        'Predictive performance modeling and forecasting'
      ],
      bestPractices: [
        'Use machine learning for pattern recognition and anomaly detection',
        'Implement statistical analysis for performance correlation',
        'Design causal analysis for root cause identification',
        'Create predictive models for performance forecasting',
        'Use multi-dimensional analysis for comprehensive insights'
      ],
      examples: [
        'bottleneck_detector = BottleneckDetector(algorithms=["statistical", "ml_based"], correlation_analysis=True)',
        'pattern_analyzer = PerformancePatternAnalyzer(time_series=True, seasonal_analysis=True)',
        'root_cause_analyzer = RootCauseAnalyzer(causal_inference=True, dependency_graph=system_dependencies)'
      ]
    },
    {
      id: 'evaluator-optimizer-strategy-generation',
      title: 'Optimization Strategy Generation & Planning',
      category: 'evaluation',
      description: 'Implement intelligent systems that can generate, evaluate, and prioritize optimization strategies based on analysis results',
      details: 'Design strategy generation systems that can create comprehensive optimization plans, evaluate trade-offs, and prioritize improvements based on impact and feasibility.',
      considerations: [
        'Multi-objective optimization strategy generation',
        'Trade-off analysis and constraint satisfaction',
        'Implementation feasibility and risk assessment',
        'Impact prediction and ROI estimation'
      ],
      bestPractices: [
        'Use multi-objective optimization algorithms',
        'Implement comprehensive trade-off analysis frameworks',
        'Design impact prediction and simulation models',
        'Create risk-aware optimization planning',
        'Use constraint satisfaction for feasible solutions'
      ],
      examples: [
        'strategy_generator = OptimizationStrategyGenerator(objectives=["performance", "cost", "reliability"])',
        'trade_off_analyzer = TradeOffAnalyzer(constraints=system_constraints, preferences=optimization_goals)',
        'impact_predictor = ImpactPredictor(models=performance_models, simulation=True)'
      ]
    },
    {
      id: 'evaluator-optimizer-architecture',
      title: 'Scalable Optimization Architecture',
      category: 'architecture',
      description: 'Design robust architectures for continuous evaluation and optimization with safety and reliability guarantees',
      details: 'Create modular optimization architectures that support safe implementation, rollback capabilities, A/B testing, and continuous improvement cycles.',
      considerations: [
        'Safe optimization implementation with rollback capabilities',
        'A/B testing and gradual rollout strategies',
        'Multi-system optimization coordination',
        'Continuous improvement and feedback loops'
      ],
      bestPractices: [
        'Design safe optimization with canary releases and rollback',
        'Implement A/B testing infrastructure for optimization validation',
        'Use event-driven architecture for real-time optimization',
        'Design distributed optimization coordination',
        'Implement comprehensive optimization audit trails'
      ],
      examples: [
        'class EvaluatorOptimizerAgent:\n    def __init__(self, monitor, analyzer, strategy_generator, implementer):',
        'optimization_controller = SafeOptimizationController(rollback=True, validation=True)',
        'ab_testing_framework = OptimizationABTesting(control_groups=True, statistical_significance=True)'
      ]
    },
    {
      id: 'evaluator-optimizer-implementation-tools',
      title: 'Optimization Implementation & Automation Tools',
      category: 'tools',
      description: 'Integrate with system management tools, deployment platforms, and automation frameworks for optimization implementation',
      details: 'Build comprehensive tool integration that can safely implement optimizations across different systems, platforms, and environments with proper validation and monitoring.',
      considerations: [
        'Multi-platform optimization implementation',
        'Automated deployment and configuration management',
        'System integration and API connectivity',
        'Monitoring and validation tool integration'
      ],
      bestPractices: [
        'Design unified interfaces for different optimization targets',
        'Implement automated deployment with validation gates',
        'Use infrastructure-as-code for optimization implementation',
        'Create comprehensive monitoring and alerting integration',
        'Implement optimization change management workflows'
      ],
      examples: [
        '@optimization_tool_registry.register\ndef system_optimizer(target: str, optimization: dict) -> OptimizationResult:',
        'deployment_manager = AutomatedDeploymentManager(platforms=["cloud", "on_premise"], validation=True)',
        'monitoring_integration = OptimizationMonitoringIntegration(tools=["prometheus", "grafana", "datadog"])'
      ]
    },
    {
      id: 'evaluator-optimizer-feedback-control',
      title: 'Feedback Control & Continuous Improvement',
      category: 'instruction',
      description: 'Implement sophisticated feedback control systems for continuous optimization and improvement cycles',
      details: 'Design feedback control systems that monitor optimization results, learn from outcomes, adapt strategies, and continuously improve optimization effectiveness.',
      considerations: [
        'Optimization outcome measurement and validation',
        'Feedback loop design and learning mechanisms',
        'Adaptive optimization strategy refinement',
        'Long-term optimization effectiveness tracking'
      ],
      bestPractices: [
        'Implement closed-loop feedback control systems',
        'Use machine learning for optimization strategy improvement',
        'Design adaptive optimization based on historical outcomes',
        'Create comprehensive optimization effectiveness metrics',
        'Implement continuous learning and strategy evolution'
      ],
      examples: [
        'feedback_controller = OptimizationFeedbackController(learning=True, adaptation=True)',
        'outcome_evaluator = OptimizationOutcomeEvaluator(metrics=success_criteria, time_horizon="long_term")',
        'strategy_learner = OptimizationStrategyLearner(ml_models=["reinforcement_learning", "bayesian_optimization"])'
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Performance Monitoring Engine',
        type: 'processing',
        description: 'Continuously monitors performance metrics across systems and processes'
      },
      {
        name: 'Analysis & Bottleneck Detector',
        type: 'processing',
        description: 'Analyzes performance data to identify bottlenecks and optimization opportunities'
      },
      {
        name: 'Optimization Strategy Generator',
        type: 'processing',
        description: 'Generates comprehensive optimization strategies based on analysis results'
      },
      {
        name: 'Implementation Controller',
        type: 'control',
        description: 'Safely implements optimizations with validation and rollback capabilities'
      },
      {
        name: 'A/B Testing Framework',
        type: 'processing',
        description: 'Validates optimization effectiveness through controlled testing'
      },
      {
        name: 'Feedback Control System',
        type: 'control',
        description: 'Monitors optimization outcomes and adapts strategies based on results'
      },
      {
        name: 'Optimization Repository',
        type: 'storage',
        description: 'Stores optimization strategies, results, and learning outcomes'
      },
      {
        name: 'Risk Assessment Engine',
        type: 'processing',
        description: 'Evaluates implementation risks and safety considerations'
      },
      {
        name: 'Impact Predictor',
        type: 'processing',
        description: 'Predicts optimization impact and ROI before implementation'
      },
      {
        name: 'Optimization Orchestrator',
        type: 'control',
        description: 'Coordinates optimization workflows and ensures system stability'
      }
    ],
    flows: [
      {
        from: 'Performance Monitoring Engine',
        to: 'Analysis & Bottleneck Detector',
        description: 'Performance metrics are analyzed to identify optimization opportunities'
      },
      {
        from: 'Analysis & Bottleneck Detector',
        to: 'Optimization Strategy Generator',
        description: 'Identified bottlenecks inform optimization strategy generation'
      },
      {
        from: 'Optimization Strategy Generator',
        to: 'Risk Assessment Engine',
        description: 'Generated strategies undergo risk assessment and safety evaluation'
      },
      {
        from: 'Risk Assessment Engine',
        to: 'Impact Predictor',
        description: 'Risk-assessed strategies are evaluated for potential impact'
      },
      {
        from: 'Impact Predictor',
        to: 'Implementation Controller',
        description: 'Impact predictions guide safe optimization implementation'
      },
      {
        from: 'Implementation Controller',
        to: 'A/B Testing Framework',
        description: 'Optimizations are validated through controlled testing'
      },
      {
        from: 'A/B Testing Framework',
        to: 'Feedback Control System',
        description: 'Testing results provide feedback for strategy adaptation'
      },
      {
        from: 'Feedback Control System',
        to: 'Optimization Repository',
        description: 'Learning outcomes and results are stored for future reference'
      },
      {
        from: 'Optimization Orchestrator',
        to: 'Implementation Controller',
        description: 'Orchestrates optimization workflow and ensures system coordination'
      },
      {
        from: 'Optimization Repository',
        to: 'Optimization Strategy Generator',
        description: 'Historical data improves future optimization strategy generation'
      }
    ]
  }
};
