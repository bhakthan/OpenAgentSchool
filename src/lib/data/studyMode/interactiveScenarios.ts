import { StudyModeQuestion, StudyScenario, ScenarioChallenge, ScenarioOutcome } from './types';

// Interactive Scenarios for AutoGen Multi-Agent System
export const autoGenScenarios: StudyModeQuestion[] = [
  {
    id: 'autogen-scenario-1',
    type: 'scenario',
    conceptId: 'multi-agent-systems',
    title: 'Building a Code Review System',
    level: 'intermediate',
    scenario: {
      id: 'code-review-system',
      title: 'Two-Agent Code Review Workflow',
      description: 'You need to build a system where one agent writes code and another reviews it. Let\'s build this step by step.',
      context: 'Your team wants to automate code generation and review using AutoGen. You have two agent types available: AssistantAgent and UserProxyAgent.',
      stakeholders: ['Development Team', 'Code Quality Team', 'Project Manager'],
      challenges: [
        {
          id: 'agent-selection',
          title: 'Choose the Right Agent Types',
          description: 'For the code writer role',
          question: 'Which agent type from the AutoGen framework would be best for writing code, and why?',
          type: 'multiple-choice',
          options: [
            'AssistantAgent - because it can generate content and code',
            'UserProxyAgent - because it executes code',
            'Both agents can write code equally well',
            'Neither, you need a custom agent'
          ],
          correctAnswer: 0,
          feedback: 'Correct! AssistantAgent is designed for content generation including code, while UserProxyAgent is better for execution and human interaction.',
          hints: [
            'Think about which agent type is designed for generation vs execution',
            'Consider the primary capabilities of each agent type'
          ]
        },
        {
          id: 'role-definition',
          title: 'Define Agent Roles',
          description: 'For the code reviewer role',
          question: 'How would you set up the reviewer agent to provide constructive feedback?',
          type: 'multiple-choice',
          options: [
            'Use another AssistantAgent with a system prompt focused on code review',
            'Use a UserProxyAgent to manually review each piece of code',
            'Let the code writer agent review its own code',
            'Use an external code analysis tool only'
          ],
          correctAnswer: 0,
          feedback: 'Excellent! A second AssistantAgent with a specialized system prompt for code review creates a dedicated reviewer with consistent standards.',
          hints: [
            'Consider how to create specialized behavior through prompts',
            'Think about consistency in review standards'
          ]
        },
        {
          id: 'conversation-flow',
          title: 'Design the Workflow',
          description: 'Planning the interaction pattern',
          question: 'What would be the most effective conversation termination condition for this system?',
          type: 'multiple-choice',
          options: [
            'Stop after exactly 5 exchanges',
            'Stop when the reviewer says "APPROVED" or "REJECTED"',
            'Stop when the code writer stops responding',
            'Never stop, keep iterating forever'
          ],
          correctAnswer: 1,
          feedback: 'Perfect! A clear termination condition based on reviewer decision ensures the conversation reaches a definitive conclusion.',
          hints: [
            'Think about what constitutes a completed review process',
            'Consider how to ensure conversations don\'t run indefinitely'
          ]
        }
      ],
      outcomes: [
        {
          id: 'successful-implementation',
          condition: 'All challenges completed correctly',
          result: 'You\'ve successfully designed a robust code review system',
          explanation: 'Your design uses specialized AssistantAgents with clear roles and termination conditions, creating an efficient automated workflow.',
          nextSteps: [
            'Add error handling for code compilation issues',
            'Implement iterative improvement loops',
            'Add metrics tracking for review quality'
          ]
        },
        {
          id: 'partial-implementation',
          condition: 'Some challenges completed incorrectly',
          result: 'Your system has some design flaws that could cause issues',
          explanation: 'Review the feedback on incorrect answers to understand the implications of different design choices.',
          nextSteps: [
            'Revisit agent role assignments',
            'Clarify conversation termination strategy',
            'Test with example scenarios'
          ]
        }
      ],
      codeExample: `# Your AutoGen Code Review System
import autogen

# Code Writer Agent
code_writer = autogen.AssistantAgent(
    name="CodeWriter",
    system_message="You are an expert Python developer. Write clean, well-documented code based on requirements.",
    llm_config={"config_list": config_list}
)

# Code Reviewer Agent  
code_reviewer = autogen.AssistantAgent(
    name="CodeReviewer", 
    system_message="You are a senior code reviewer. Analyze code for bugs, style, and best practices. End with APPROVED or REJECTED.",
    llm_config={"config_list": config_list}
)

# Human proxy for oversight
user_proxy = autogen.UserProxyAgent(
    name="Manager",
    human_input_mode="TERMINATE",
    is_termination_msg=lambda x: "APPROVED" in x.get("content", "") or "REJECTED" in x.get("content", "")
)`,
      resources: [
        'AutoGen Framework Documentation',
        'Multi-Agent Design Patterns',
        'Code Review Best Practices'
      ],
      conceptId: 'multi-agent-systems',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      learningOutcomes: [
        'Understanding agent role specialization',
        'Designing conversation termination conditions',
        'Creating effective multi-agent workflows'
      ]
    },
    explanation: 'This scenario helps you understand how to design multi-agent systems by making practical decisions about agent roles, interaction patterns, and termination conditions.',
    relatedConcepts: ['autogen', 'agent-roles', 'conversation-design'],
    timeEstimate: 25,
    successCriteria: [
      'Correctly identifies agent types for different roles',
      'Understands the importance of specialized system prompts',
      'Designs appropriate termination conditions'
    ]
  },
  {
    id: 'autogen-scenario-2',
    type: 'scenario',
    conceptId: 'multi-agent-systems',
    title: 'Group Chat Orchestration Challenge',
    level: 'advanced',
    scenario: {
      id: 'group-chat-coordination',
      title: 'Multi-Agent Business Analysis Team',
      description: 'Design a group chat system with multiple specialized agents working together on business analysis.',
      context: 'You need to create a team of 4 agents: Data Analyst, Market Researcher, Financial Analyst, and Report Writer. They need to collaborate on comprehensive business reports.',
      stakeholders: ['Business Stakeholders', 'Executive Team', 'Analysis Team'],
      challenges: [
        {
          id: 'speaker-selection',
          title: 'Agent Coordination Strategy',
          description: 'Managing conversation flow in group chats',
          question: 'What\'s the best speaker selection method for this business analysis team?',
          type: 'multiple-choice',
          options: [
            'Round-robin - each agent speaks in turn',
            'Random selection - let AutoGen choose randomly',
            'Custom function based on conversation context and agent expertise',
            'Manual selection - human chooses each speaker'
          ],
          correctAnswer: 2,
          feedback: 'Excellent! A context-aware selection function ensures the most relevant expert speaks at each stage of the analysis.',
          hints: [
            'Consider which agent should respond based on the current topic',
            'Think about expertise-driven conversation flow'
          ]
        },
        {
          id: 'conversation-memory',
          title: 'Managing Shared State',
          description: 'Keeping track of analysis progress',
          question: 'How should you handle shared state and memory across this multi-agent conversation?',
          type: 'multiple-choice',
          options: [
            'Each agent maintains its own separate memory',
            'Use the GroupChat message history as the shared memory',
            'Implement external Redis cache for shared state with conversation summaries',
            'Don\'t worry about memory, let each exchange be independent'
          ],
          correctAnswer: 2,
          feedback: 'Perfect! External state management with conversation summaries provides scalable shared memory for complex business analysis workflows.',
          hints: [
            'Consider what happens as conversations get very long',
            'Think about how agents can build on each other\'s work'
          ]
        },
        {
          id: 'quality-control',
          title: 'Ensuring Analysis Quality',
          description: 'Maintaining high standards across the team',
          question: 'What evaluation strategy would best ensure quality collaborative analysis?',
          type: 'multiple-choice',
          options: [
            'Only measure the final report quality',
            'Track individual agent performance separately',
            'System-level success metrics plus collaboration quality indicators',
            'Let the human manager evaluate everything manually'
          ],
          correctAnswer: 2,
          feedback: 'Excellent! Combining system-level outcomes with collaboration metrics gives you both quality assurance and process improvement insights.',
          hints: [
            'Think about both the final result and the collaboration process',
            'Consider metrics that help improve the system over time'
          ]
        }
      ],
      outcomes: [
        {
          id: 'enterprise-ready',
          condition: 'All challenges mastered',
          result: 'You\'ve designed an enterprise-grade multi-agent analysis system',
          explanation: 'Your system uses intelligent coordination, scalable state management, and comprehensive evaluation - ready for production deployment.',
          nextSteps: [
            'Implement robust error handling and agent failure recovery',
            'Add real-time performance monitoring and alerts',
            'Create automated quality gates and approval workflows'
          ]
        }
      ],
      codeExample: `# Enterprise Multi-Agent Business Analysis System
import autogen
import redis

# Shared state management
shared_cache = redis.Redis(host='localhost', port=6379, db=0)

# Specialized agents with clear expertise
data_analyst = autogen.AssistantAgent(
    name="DataAnalyst",
    system_message="You are a data analyst expert. Focus on data patterns, statistics, and quantitative insights.",
    llm_config={"config_list": config_list}
)

market_researcher = autogen.AssistantAgent(
    name="MarketResearcher", 
    system_message="You are a market research expert. Focus on market trends, competitive analysis, and customer insights.",
    llm_config={"config_list": config_list}
)

# Custom speaker selection based on conversation context
def custom_speaker_selection(last_speaker, group_chat):
    last_message = group_chat.messages[-1]["content"].lower()
    
    if "data" in last_message or "statistics" in last_message:
        return data_analyst
    elif "market" in last_message or "competition" in last_message:
        return market_researcher
    # ... additional logic
    
    return None  # Let AutoGen decide

# GroupChat with intelligent coordination
group_chat = autogen.GroupChat(
    agents=[data_analyst, market_researcher, financial_analyst, report_writer],
    messages=[],
    max_round=20,
    speaker_selection_method=custom_speaker_selection
)`,
      resources: [
        'AutoGen GroupChat Documentation',
        'Enterprise Multi-Agent Architecture',
        'Business Analysis Workflows'
      ],
      conceptId: 'multi-agent-systems',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      learningOutcomes: [
        'Understanding intelligent speaker selection',
        'Implementing scalable state management', 
        'Creating comprehensive evaluation strategies'
      ]
    },
    explanation: 'This advanced scenario teaches you to design sophisticated multi-agent systems with intelligent coordination, shared state management, and quality evaluation.',
    relatedConcepts: ['group-chat', 'speaker-selection', 'state-management', 'evaluation'],
    timeEstimate: 35,
    successCriteria: [
      'Designs context-aware speaker selection',
      'Implements scalable state management',
      'Creates comprehensive evaluation strategy'
    ]
  }
];

// Interactive Scenarios for A2A Communication
export const a2aScenarios: StudyModeQuestion[] = [
  {
    id: 'a2a-scenario-1',
    type: 'scenario',
    conceptId: 'a2a-communication',
    title: 'E-commerce Order Processing System',
    level: 'intermediate',
    scenario: {
      id: 'ecommerce-a2a',
      title: 'Multi-Agent Order Processing',
      description: 'Design an A2A communication system for handling e-commerce orders from receipt to fulfillment.',
      context: 'Your e-commerce platform needs to process orders through multiple specialized agents: Order Validator, Inventory Manager, Payment Processor, and Shipping Coordinator.',
      stakeholders: ['Customers', 'Warehouse Team', 'Customer Service', 'Finance Team'],
      challenges: [
        {
          id: 'message-routing',
          title: 'Design Message Routing',
          description: 'How orders flow between agents',
          question: 'What routing pattern would be most efficient for this order processing system?',
          type: 'multiple-choice',
          options: [
            'Direct peer-to-peer communication between all agents',
            'Hub-and-spoke with Order Validator as the central coordinator',
            'Sequential pipeline: Validator → Inventory → Payment → Shipping',
            'Broadcast all messages to all agents'
          ],
          correctAnswer: 2,
          feedback: 'Correct! A sequential pipeline ensures proper order validation and prevents issues like payment processing before inventory confirmation.',
          hints: [
            'Consider the logical dependencies between processing steps',
            'Think about what needs to happen before payment can be processed'
          ]
        },
        {
          id: 'error-handling',
          title: 'Handle Processing Failures',
          description: 'What happens when an agent fails?',
          question: 'If the Payment Processor fails after inventory is reserved, what should happen?',
          type: 'multiple-choice',
          options: [
            'Continue processing and hope payment works later',
            'Cancel the order immediately and notify the customer',
            'Release inventory reservation and implement retry with exponential backoff',
            'Transfer the order to manual processing'
          ],
          correctAnswer: 2,
          feedback: 'Excellent! Releasing reserved inventory prevents stock issues, while retry logic handles temporary payment service outages.',
          hints: [
            'Consider the impact on inventory availability',
            'Think about temporary vs permanent failures'
          ]
        }
      ],
      outcomes: [
        {
          id: 'robust-system',
          condition: 'All challenges completed correctly',
          result: 'You\'ve designed a robust, fault-tolerant order processing system',
          explanation: 'Your design handles the complex dependencies in e-commerce processing while gracefully managing failures.',
          nextSteps: [
            'Add monitoring and alerting for failed orders',
            'Implement order status tracking for customers',
            'Add load balancing for high-volume periods'
          ]
        }
      ],
      codeExample: `# A2A E-commerce Order Processing System
class OrderProcessingSystem:
    def __init__(self):
        self.agents = {
            'validator': OrderValidatorAgent(),
            'inventory': InventoryManagerAgent(),
            'payment': PaymentProcessorAgent(),
            'shipping': ShippingCoordinatorAgent()
        }
    
    async def process_order(self, order):
        try:
            # Sequential pipeline with error handling
            validated_order = await self.agents['validator'].validate(order)
            reserved_inventory = await self.agents['inventory'].reserve(validated_order)
            processed_payment = await self.agents['payment'].process(reserved_inventory)
            shipping_info = await self.agents['shipping'].arrange(processed_payment)
            
            return shipping_info
            
        except PaymentFailedException:
            # Release inventory and implement retry logic
            await self.agents['inventory'].release(reserved_inventory)
            await self.schedule_retry(order)
            
        except Exception as e:
            await self.handle_system_error(order, e)`,
      resources: [
        'A2A Communication Patterns',
        'E-commerce System Design',
        'Error Handling Best Practices'
      ],
      conceptId: 'a2a-communication',
      difficulty: 'intermediate',
      estimatedTime: '30 minutes',
      learningOutcomes: [
        'Understanding A2A message routing patterns',
        'Implementing robust error handling',
        'Designing fault-tolerant workflows'
      ]
    },
    explanation: 'This scenario demonstrates how to design A2A communication patterns that handle real-world complexity and failure scenarios.',
    relatedConcepts: ['message-routing', 'error-handling', 'workflow-design'],
    timeEstimate: 30,
    successCriteria: [
      'Designs appropriate routing patterns',
      'Implements proper error handling',
      'Considers system dependencies'
    ]
  }
];

// Export all scenarios organized by concept
export const scenarioLibrary = {
  'multi-agent-systems': autoGenScenarios,
  'a2a-communication': a2aScenarios
};

// Helper function to get scenarios by concept and level
export function getScenarios(
  conceptId: string, 
  level?: 'beginner' | 'intermediate' | 'advanced'
): StudyModeQuestion[] {
  const scenarios = scenarioLibrary[conceptId] || [];
  
  if (level) {
    return scenarios.filter(s => s.level === level);
  }
  
  return scenarios;
}
