import { SystemDesignPattern } from './types';

export const autonomousWorkflowSystemDesign: SystemDesignPattern = {
  id: 'autonomous-workflow',
  name: 'Autonomous Workflow System Design',
  overview: 'A comprehensive system design for building autonomous workflow agents that can independently plan, execute, and adapt complex multi-step processes with minimal human intervention.',
  problemStatement: 'How to design intelligent workflow systems that can autonomously decompose complex tasks, manage dependencies, handle exceptions, and adapt to changing conditions while maintaining reliability and governance.',
  solution: 'Implement an intelligent workflow orchestration architecture with autonomous planning, adaptive execution, exception handling, dependency management, and continuous optimization capabilities.',
  steps: [
    {
      id: 'autonomous-workflow-prompt-design',
      title: 'Workflow-Aware Prompt Engineering',
      category: 'prompt',
      description: 'Design prompting strategies that enable autonomous workflow understanding, planning, and execution control',
      details: 'Create sophisticated workflow-oriented prompts that can understand complex process requirements, decompose tasks into executable steps, and maintain workflow context throughout execution.',
      considerations: [
        'Complex workflow decomposition and task analysis',
        'Dependency identification and sequencing logic',
        'Exception handling and error recovery strategies',
        'Workflow adaptation and dynamic replanning capabilities'
      ],
      bestPractices: [
        'Use structured workflow description templates',
        'Implement hierarchical task decomposition prompts',
        'Design context-aware execution control prompts',
        'Create adaptive replanning and exception handling prompts',
        'Use workflow state tracking and progress monitoring'
      ],
      examples: [
        'workflow_prompt = WorkflowPrompt(template="decompose_complex_task", context="business_process")',
        'execution_prompt = ExecutionControlPrompt(step="current", dependencies="resolved")',
        'exception_prompt = ExceptionHandlingPrompt(error_type="dependency_failure", recovery_strategy="adaptive")'
      ]
    },
    {
      id: 'autonomous-workflow-context-state',
      title: 'Workflow State & Context Management',
      category: 'context',
      description: 'Implement comprehensive workflow state tracking, context preservation, and execution history management',
      details: 'Design state management systems that track workflow progress, maintain execution context, handle state transitions, and preserve workflow history for analysis and recovery.',
      considerations: [
        'Complex workflow state tracking and persistence',
        'Multi-level context management and inheritance',
        'State transition validation and consistency',
        'Workflow history and audit trail maintenance'
      ],
      bestPractices: [
        'Implement hierarchical state management with checkpointing',
        'Use immutable state transitions for consistency',
        'Design comprehensive workflow event logging',
        'Create state recovery and rollback mechanisms',
        'Implement distributed state synchronization'
      ],
      examples: [
        'workflow_state = WorkflowState(id="wf_001", status="executing", checkpoint="step_5")',
        'context_manager = WorkflowContextManager(global_context, local_contexts)',
        'state_tracker = WorkflowStateTracker(persistence="database", versioning=True)'
      ]
    },
    {
      id: 'autonomous-workflow-planning-engine',
      title: 'Intelligent Workflow Planning & Optimization',
      category: 'knowledge',
      description: 'Build sophisticated planning engines that can autonomously design optimal workflow execution strategies',
      details: 'Implement intelligent planning systems that analyze workflow requirements, optimize execution paths, manage resource allocation, and adapt plans based on real-time conditions.',
      considerations: [
        'Multi-objective workflow optimization and planning',
        'Resource constraint awareness and allocation',
        'Dynamic replanning and adaptation capabilities',
        'Risk assessment and mitigation planning'
      ],
      bestPractices: [
        'Use graph-based workflow planning algorithms',
        'Implement constraint satisfaction for resource management',
        'Design adaptive planning with real-time optimization',
        'Create risk-aware planning and mitigation strategies',
        'Use machine learning for workflow pattern optimization'
      ],
      examples: [
        'planner = WorkflowPlanner(algorithm="graph_search", optimization="multi_objective")',
        'optimizer = WorkflowOptimizer(constraints=["time", "cost", "quality"])',
        'adaptive_planner = AdaptivePlanner(replan_triggers=["failure", "delay", "resource_change"])'
      ]
    },
    {
      id: 'autonomous-workflow-execution-engine',
      title: 'Autonomous Execution & Monitoring',
      category: 'evaluation',
      description: 'Implement sophisticated execution engines that can autonomously run workflows with real-time monitoring and control',
      details: 'Design execution systems that can autonomously execute workflow steps, monitor progress, handle exceptions, and make real-time decisions about workflow continuation.',
      considerations: [
        'Autonomous step execution and decision making',
        'Real-time progress monitoring and adjustment',
        'Exception detection and autonomous recovery',
        'Performance optimization and resource management'
      ],
      bestPractices: [
        'Implement event-driven execution with real-time monitoring',
        'Use autonomous decision trees for execution control',
        'Design predictive exception handling',
        'Create self-healing execution mechanisms',
        'Implement performance-based execution optimization'
      ],
      examples: [
        'executor = AutonomousExecutor(decision_engine="ml_based", monitoring="real_time")',
        'monitor = WorkflowMonitor(metrics=["progress", "performance", "quality"])',
        'recovery_engine = AutonomousRecovery(strategies=["retry", "alternative", "escalate"])'
      ]
    },
    {
      id: 'autonomous-workflow-architecture',
      title: 'Scalable Workflow Architecture',
      category: 'architecture',
      description: 'Design robust, scalable architectures for autonomous workflow orchestration and execution',
      details: 'Create modular workflow architectures that support distributed execution, microservices integration, event-driven coordination, and scalable resource management.',
      considerations: [
        'Distributed workflow execution and coordination',
        'Microservices integration and orchestration',
        'Event-driven architecture and messaging',
        'Scalable resource management and allocation'
      ],
      bestPractices: [
        'Design microservices-based workflow architecture',
        'Use event-driven coordination for loose coupling',
        'Implement distributed workflow execution',
        'Design for horizontal scaling and fault tolerance',
        'Use cloud-native orchestration platforms'
      ],
      examples: [
        'class WorkflowOrchestrator:\n    def __init__(self, execution_engine, state_manager):',
        'workflow_cluster = DistributedWorkflowCluster(nodes=10, load_balancer=True)',
        'event_bus = WorkflowEventBus(messaging="kafka", routing="topic_based")'
      ]
    },
    {
      id: 'autonomous-workflow-integration',
      title: 'Workflow Integration & Tool Connectivity',
      category: 'tools',
      description: 'Integrate with external systems, APIs, and tools for comprehensive workflow automation',
      details: 'Build comprehensive integration systems that can connect workflows with external APIs, databases, cloud services, and business systems.',
      considerations: [
        'API integration and external system connectivity',
        'Data transformation and format adaptation',
        'Authentication and security management',
        'Error handling and retry mechanisms for external calls'
      ],
      bestPractices: [
        'Design unified interfaces for diverse system integration',
        'Implement robust API client libraries with retry logic',
        'Use adapter patterns for system compatibility',
        'Design secure credential management',
        'Implement comprehensive integration testing'
      ],
      examples: [
        '@workflow_integration.register\ndef api_connector(endpoint: str, auth: dict) -> Response:',
        'integration_manager = WorkflowIntegrationManager(connectors=["rest", "graphql", "database"])',
        'auth_manager = SecureCredentialManager(vault="hashicorp", rotation=True)'
      ]
    },
    {
      id: 'autonomous-workflow-governance',
      title: 'Workflow Governance & Quality Control',
      category: 'instruction',
      description: 'Implement comprehensive governance frameworks for autonomous workflow management and compliance',
      details: 'Design governance systems that ensure workflow compliance, quality control, audit trails, and risk management while maintaining autonomous operation.',
      considerations: [
        'Compliance framework integration and validation',
        'Quality control and approval mechanisms',
        'Risk assessment and mitigation protocols',
        'Audit trail and governance reporting'
      ],
      bestPractices: [
        'Implement policy-driven governance frameworks',
        'Use automated compliance checking and validation',
        'Design risk-based approval workflows',
        'Create comprehensive audit and reporting systems',
        'Implement continuous governance monitoring'
      ],
      examples: [
        'governance_engine = WorkflowGovernance(policies=["compliance", "security", "quality"])',
        'compliance_checker = AutomatedComplianceValidator(frameworks=["SOX", "GDPR"])',
        'audit_system = WorkflowAuditSystem(trail_retention="7_years", reporting="automated")'
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Workflow Planning Engine',
        type: 'control',
        description: 'Autonomously plans and optimizes complex workflow execution strategies'
      },
      {
        name: 'Autonomous Execution Engine',
        type: 'processing',
        description: 'Executes workflow steps autonomously with real-time decision making'
      },
      {
        name: 'Workflow State Manager',
        type: 'control',
        description: 'Manages workflow state, context, and execution history'
      },
      {
        name: 'Dependency Resolver',
        type: 'processing',
        description: 'Manages task dependencies and execution sequencing'
      },
      {
        name: 'Exception Handler',
        type: 'processing',
        description: 'Detects, analyzes, and autonomously recovers from workflow exceptions'
      },
      {
        name: 'Resource Manager',
        type: 'control',
        description: 'Manages and allocates computational and external resources'
      },
      {
        name: 'Integration Gateway',
        type: 'processing',
        description: 'Connects workflows with external systems, APIs, and services'
      },
      {
        name: 'Monitoring & Analytics',
        type: 'processing',
        description: 'Monitors workflow performance and provides analytics insights'
      },
      {
        name: 'Governance Controller',
        type: 'control',
        description: 'Ensures compliance, quality control, and governance policies'
      },
      {
        name: 'Workflow Repository',
        type: 'storage',
        description: 'Stores workflow definitions, templates, and execution history'
      }
    ],
    flows: [
      {
        from: 'Workflow Planning Engine',
        to: 'Dependency Resolver',
        description: 'Planned workflows are analyzed for dependencies and sequencing'
      },
      {
        from: 'Dependency Resolver',
        to: 'Autonomous Execution Engine',
        description: 'Resolved execution sequence is provided to the execution engine'
      },
      {
        from: 'Autonomous Execution Engine',
        to: 'Workflow State Manager',
        description: 'Execution progress and state changes are tracked'
      },
      {
        from: 'Autonomous Execution Engine',
        to: 'Integration Gateway',
        description: 'External system interactions are routed through integration layer'
      },
      {
        from: 'Exception Handler',
        to: 'Autonomous Execution Engine',
        description: 'Exception recovery strategies are applied to execution flow'
      },
      {
        from: 'Resource Manager',
        to: 'Autonomous Execution Engine',
        description: 'Resource allocation and constraints guide execution decisions'
      },
      {
        from: 'Monitoring & Analytics',
        to: 'Workflow Planning Engine',
        description: 'Performance insights inform future workflow planning'
      },
      {
        from: 'Governance Controller',
        to: 'Autonomous Execution Engine',
        description: 'Governance policies constrain and validate execution decisions'
      },
      {
        from: 'Workflow State Manager',
        to: 'Workflow Repository',
        description: 'Workflow state and history are persisted for analysis'
      },
      {
        from: 'Integration Gateway',
        to: 'Exception Handler',
        description: 'External system failures trigger exception handling protocols'
      }
    ]
  }
};
