import { SystemDesignPattern } from './types';

export const orchestratorWorkerSystemDesign: SystemDesignPattern = {
  id: 'orchestrator-worker',
  name: 'Orchestrator-Worker System Design',
  overview: 'A comprehensive system design for building scalable orchestrator-worker architectures that coordinate complex multi-agent workflows through centralized orchestration, distributed task execution, and sophisticated resource management.',
  problemStatement: 'How to design systems that efficiently coordinate large-scale agent workflows through centralized orchestration while enabling autonomous worker execution, load balancing, fault tolerance, and optimal resource utilization.',
  solution: 'Implement a hierarchical orchestrator-worker architecture with intelligent task distribution, worker specialization, dynamic scaling, and comprehensive workflow management capabilities.',
  steps: [
    {
      id: 'orchestrator-prompt-engineering',
      title: 'Orchestrator Coordination Prompt Engineering',
      category: 'prompt',
      description: 'Design sophisticated prompting strategies for orchestrator decision-making and worker coordination',
      details: 'Create specialized prompts that enable orchestrators to analyze complex workflows, make optimal task distribution decisions, coordinate worker activities, and adapt to changing conditions.',
      considerations: [
        'Workflow analysis and decomposition prompt strategies',
        'Task distribution optimization and worker assignment',
        'Coordination and synchronization prompt patterns',
        'Dynamic adaptation and rebalancing decision-making'
      ],
      bestPractices: [
        'Use workflow decomposition prompts for complex task breakdown',
        'Implement optimization prompts for efficient worker assignment',
        'Design coordination prompts for multi-worker synchronization',
        'Create adaptive prompts for dynamic workflow adjustment',
        'Use monitoring prompts for performance optimization'
      ],
      examples: [
        'orchestrator_prompt = OrchestratorPrompt(workflow=complex_workflow, workers=available_workers)',
        'task_distribution_prompt = TaskDistributionPrompt(tasks=workflow_tasks, worker_capabilities=capabilities)',
        'coordination_prompt = CoordinationPrompt(synchronization_points=sync_tasks, dependencies=task_deps)'
      ]
    },
    {
      id: 'orchestrator-workflow-context',
      title: 'Workflow Context & State Management',
      category: 'context',
      description: 'Implement comprehensive workflow context tracking and distributed state management across orchestrator-worker systems',
      details: 'Design context systems that maintain workflow state, track worker progress, manage dependencies, and provide comprehensive visibility into distributed execution.',
      considerations: [
        'Workflow state tracking and progress monitoring',
        'Worker status and capability context management',
        'Task dependency tracking and resolution',
        'Distributed state consistency and synchronization'
      ],
      bestPractices: [
        'Implement hierarchical workflow state with orchestrator oversight',
        'Use distributed state management with consistency guarantees',
        'Design comprehensive worker context tracking',
        'Create dependency resolution with deadlock prevention',
        'Implement real-time workflow progress monitoring'
      ],
      examples: [
        'workflow_context = OrchestratorWorkflowContext(state=workflow_state, workers=worker_status)',
        'worker_context = WorkerExecutionContext(assigned_tasks=task_queue, capabilities=worker_skills)',
        'dependency_graph = WorkflowDependencyGraph(tasks=all_tasks, dependencies=task_dependencies)'
      ]
    },
    {
      id: 'orchestrator-task-distribution',
      title: 'Intelligent Task Distribution & Load Balancing',
      category: 'knowledge',
      description: 'Build sophisticated task distribution systems that optimize worker utilization and workflow efficiency',
      details: 'Implement intelligent task assignment algorithms that consider worker capabilities, current load, task requirements, and optimization objectives.',
      considerations: [
        'Worker capability matching and skill assessment',
        'Load balancing and resource optimization',
        'Task priority and deadline management',
        'Dynamic rebalancing and fault tolerance'
      ],
      bestPractices: [
        'Use capability-based task assignment with skill matching',
        'Implement dynamic load balancing with performance monitoring',
        'Design priority-based scheduling with deadline awareness',
        'Create fault-tolerant assignment with automatic recovery',
        'Use predictive modeling for optimal resource allocation'
      ],
      examples: [
        'task_distributor = OrchestratorTaskDistributor(algorithm="capability_weighted", optimization="throughput")',
        'load_balancer = WorkerLoadBalancer(strategy="dynamic", rebalancing_threshold=0.8)',
        'scheduler = WorkflowScheduler(priority_algorithm="deadline_aware", preemption=True)'
      ]
    },
    {
      id: 'orchestrator-performance-monitoring',
      title: 'Workflow Performance Monitoring & Optimization',
      category: 'evaluation',
      description: 'Implement comprehensive performance monitoring and optimization systems for orchestrator-worker workflows',
      details: 'Design monitoring systems that track workflow performance, identify bottlenecks, measure efficiency, and enable continuous optimization.',
      considerations: [
        'Real-time performance monitoring and metrics collection',
        'Bottleneck detection and performance analysis',
        'Workflow efficiency measurement and optimization',
        'Worker performance tracking and feedback'
      ],
      bestPractices: [
        'Implement real-time performance monitoring with alerting',
        'Use automated bottleneck detection and resolution',
        'Design efficiency metrics with optimization feedback loops',
        'Create worker performance analytics with improvement recommendations',
        'Use predictive analytics for proactive optimization'
      ],
      examples: [
        'performance_monitor = OrchestratorPerformanceMonitor(metrics=workflow_metrics, alerts=alert_rules)',
        'bottleneck_detector = WorkflowBottleneckDetector(analysis_window="5min", sensitivity=0.7)',
        'optimizer = WorkflowOptimizer(objectives=efficiency_goals, adaptation_rate=0.1)'
      ]
    },
    {
      id: 'orchestrator-system-architecture',
      title: 'Scalable Orchestrator-Worker Architecture',
      category: 'architecture',
      description: 'Design highly scalable, fault-tolerant architectures for orchestrator-worker systems',
      details: 'Create system architectures that support massive scale, high availability, efficient communication, and dynamic scaling capabilities.',
      considerations: [
        'Hierarchical orchestration with scalable coordination',
        'Distributed worker management and communication',
        'Fault tolerance and high availability design',
        'Dynamic scaling and resource management'
      ],
      bestPractices: [
        'Design hierarchical orchestration for scalable coordination',
        'Implement efficient worker communication with minimal overhead',
        'Use fault-tolerant design with redundancy and failover',
        'Create auto-scaling capabilities with demand prediction',
        'Design for elastic resource allocation and deallocation'
      ],
      examples: [
        'class ScalableOrchestrator:\n    def __init__(self, max_workers=1000, scaling_policy="demand_based"):',
        'worker_pool = DynamicWorkerPool(min_size=10, max_size=500, scaling_factor=2)',
        'fault_tolerance = OrchestratorFaultTolerance(redundancy=3, failover_time="30s")'
      ]
    },
    {
      id: 'orchestrator-worker-tools',
      title: 'Worker Tool Management & Resource Coordination',
      category: 'tools',
      description: 'Integrate sophisticated tool management and resource coordination capabilities for worker efficiency',
      details: 'Build comprehensive tool and resource management systems that enable efficient worker operations, tool sharing, and resource optimization.',
      considerations: [
        'Tool allocation and sharing between workers',
        'Resource pooling and optimization',
        'Tool capability management and discovery',
        'Resource contention resolution and fairness'
      ],
      bestPractices: [
        'Design centralized tool management with distributed access',
        'Implement efficient resource pooling and sharing',
        'Use tool capability discovery and optimal assignment',
        'Create fair resource allocation with contention resolution',
        'Design tool lifecycle management with maintenance scheduling'
      ],
      examples: [
        '@orchestrator_tool_registry.register\ndef allocate_worker_tools(worker_id: str, task_requirements: Dict) -> ToolAllocation:',
        'resource_pool = OrchestratorResourcePool(tools=available_tools, sharing_policy="fair")',
        'tool_manager = WorkerToolManager(discovery=True, capability_matching=True)'
      ]
    },
    {
      id: 'orchestrator-workflow-control',
      title: 'Workflow Execution Control & Quality Assurance',
      category: 'instruction',
      description: 'Implement sophisticated workflow control mechanisms to ensure quality execution and goal achievement',
      details: 'Design control systems that manage workflow execution, ensure quality standards, handle exceptions, and guarantee successful completion.',
      considerations: [
        'Workflow execution control and exception handling',
        'Quality assurance and validation mechanisms',
        'Deadline management and SLA compliance',
        'Error recovery and workflow resilience'
      ],
      bestPractices: [
        'Implement comprehensive workflow execution control',
        'Use quality gates and validation checkpoints',
        'Design deadline management with early warning systems',
        'Create robust error recovery and retry mechanisms',
        'Use workflow resilience patterns for fault tolerance'
      ],
      examples: [
        'workflow_controller = OrchestratorWorkflowController(execution_policy=control_policy, quality_gates=validation_rules)',
        'quality_assurance = WorkflowQualityAssurance(checkpoints=quality_checkpoints, validation=output_validation)',
        'exception_handler = WorkflowExceptionHandler(recovery_strategies=recovery_patterns, escalation=human_intervention)'
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Master Orchestrator',
        type: 'control',
        description: 'Central coordination engine that manages overall workflow execution and worker coordination'
      },
      {
        name: 'Task Scheduler',
        type: 'control',
        description: 'Intelligent scheduler that assigns tasks to workers based on capabilities and load'
      },
      {
        name: 'Worker Pool Manager',
        type: 'control',
        description: 'Manages dynamic worker pools, scaling, and worker lifecycle'
      },
      {
        name: 'Workflow State Engine',
        type: 'storage',
        description: 'Maintains comprehensive workflow state and execution progress'
      },
      {
        name: 'Load Balancer',
        type: 'control',
        description: 'Distributes workload across workers and manages resource utilization'
      },
      {
        name: 'Performance Monitor',
        type: 'processing',
        description: 'Monitors workflow and worker performance in real-time'
      },
      {
        name: 'Dependency Resolver',
        type: 'processing',
        description: 'Manages task dependencies and ensures proper execution order'
      },
      {
        name: 'Resource Coordinator',
        type: 'control',
        description: 'Coordinates access to shared resources and tools across workers'
      },
      {
        name: 'Quality Controller',
        type: 'processing',
        description: 'Ensures output quality and validates task completion'
      },
      {
        name: 'Exception Handler',
        type: 'processing',
        description: 'Handles workflow exceptions, errors, and recovery scenarios'
      }
    ],
    flows: [
      {
        from: 'Master Orchestrator',
        to: 'Task Scheduler',
        description: 'Orchestrator sends workflow tasks to scheduler for assignment'
      },
      {
        from: 'Task Scheduler',
        to: 'Worker Pool Manager',
        description: 'Scheduler requests appropriate workers for task execution'
      },
      {
        from: 'Worker Pool Manager',
        to: 'Load Balancer',
        description: 'Worker availability information guides load distribution'
      },
      {
        from: 'Load Balancer',
        to: 'Task Scheduler',
        description: 'Load information influences task assignment decisions'
      },
      {
        from: 'Workflow State Engine',
        to: 'Dependency Resolver',
        description: 'Current workflow state enables dependency analysis and resolution'
      },
      {
        from: 'Dependency Resolver',
        to: 'Task Scheduler',
        description: 'Dependency information guides task scheduling and ordering'
      },
      {
        from: 'Performance Monitor',
        to: 'Master Orchestrator',
        description: 'Performance metrics inform orchestration decisions and optimizations'
      },
      {
        from: 'Resource Coordinator',
        to: 'Task Scheduler',
        description: 'Resource availability affects task assignment and timing'
      },
      {
        from: 'Quality Controller',
        to: 'Workflow State Engine',
        description: 'Quality validation results update workflow progress state'
      },
      {
        from: 'Exception Handler',
        to: 'Master Orchestrator',
        description: 'Exception information triggers workflow recovery and adaptation'
      }
    ]
  }
};
