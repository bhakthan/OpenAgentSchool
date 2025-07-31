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

// Interactive Scenarios for Agentic RAG
export const agenticRAGScenarios: StudyModeQuestion[] = [
  {
    id: 'agentic-rag-scenario-1',
    type: 'scenario',
    conceptId: 'agentic-rag',
    title: 'Building a Corporate Policy Assistant',
    level: 'intermediate',
    scenario: {
      id: 'corporate-policy-assistant',
      title: 'HR Policy Q&A System Implementation',
      description: 'Design an Agentic RAG system to help employees quickly find accurate answers to HR policy questions from a large document repository.',
      context: 'Your company has 500+ HR policy documents that employees frequently need to reference. Current manual search is time-consuming and often yields outdated or incorrect information.',
      stakeholders: ['HR Team', 'Employees', 'IT Security', 'Legal Compliance'],
      challenges: [
        {
          id: 'query-understanding',
          title: 'Design Query Intelligence',
          description: 'An employee asks: "Can I take time off for my sister\'s wedding?" How should the system interpret this?',
          question: 'What key information should the Agentic RAG system extract from this query?',
          type: 'multiple-choice',
          options: [
            'Just search for "time off" in all documents',
            'Identify: leave type (personal/family), relationship (sister), event type (wedding), and duration needs',
            'Ask the employee to rephrase the question more specifically',
            'Search for all wedding-related policies'
          ],
          correctAnswer: 1,
          feedback: 'Excellent! Agentic RAG should decompose queries to understand intent, context, and required information types.',
          hints: [
            'Think about what specific policy areas this question touches',
            'Consider what additional context might be needed'
          ]
        },
        {
          id: 'retrieval-strategy',
          title: 'Plan Retrieval Strategy',
          description: 'The system needs to search through policies',
          question: 'What retrieval approach would be most effective for this employee question?',
          type: 'multiple-choice',
          options: [
            'Single vector search for "sister wedding time off"',
            'Multi-stage search: 1) Personal leave policies 2) Family event definitions 3) Time-off procedures',
            'Keyword search only for faster results',
            'Search all documents and let the LLM filter results'
          ],
          correctAnswer: 1,
          feedback: 'Perfect! Multi-stage retrieval allows the agent to build comprehensive understanding by gathering related policy information systematically.',
          hints: [
            'Consider how different policy areas might interact',
            'Think about building complete context for accurate answers'
          ]
        },
        {
          id: 'answer-synthesis',
          title: 'Synthesize Trustworthy Response',
          description: 'How should the system present the final answer?',
          question: 'What elements should the response include for maximum trustworthiness?',
          type: 'code',
          codeContext: 'Design the response structure for the employee query about time off for sister\'s wedding. Include structured response with policy citations, eligibility criteria, and next steps.',
          feedback: 'Good approach! Effective Agentic RAG responses should include: 1) Clear answer to the question, 2) Specific policy citations with document names/sections, 3) Eligibility criteria that apply to the employee, 4) Clear next steps for taking action, 5) Confidence indicators and limitations.',
          hints: [
            'Think about what employees need to take action',
            'Consider how to build trust in automated responses'
          ]
        }
      ],
      outcomes: [
        {
          id: 'robust-implementation',
          condition: 'All challenges completed effectively',
          result: 'You\'ve designed a sophisticated Agentic RAG system that provides reliable, cited policy guidance',
          explanation: 'Your design uses intelligent query decomposition, strategic retrieval, and trustworthy response synthesis.',
          nextSteps: [
            'Implement feedback loops for answer quality',
            'Add policy update notification system',
            'Include escalation to HR for complex cases'
          ]
        }
      ],
      codeExample: `# Agentic RAG Corporate Policy Assistant
class PolicyAssistant:
    def __init__(self, vector_store, policy_docs):
        self.vector_store = vector_store
        self.policy_docs = policy_docs
        self.query_planner = QueryPlanner()
        
    def answer_query(self, employee_question):
        # Agent planning phase
        query_plan = self.query_planner.decompose(employee_question)
        
        # Multi-stage retrieval
        relevant_docs = []
        for subquery in query_plan.subqueries:
            docs = self.vector_store.similarity_search(subquery)
            relevant_docs.extend(docs)
        
        # Synthesis with citations
        answer = self.synthesize_answer(relevant_docs, employee_question)
        return answer`,
      resources: ['HR Policy Database', 'Vector Store', 'Citation System'],
      conceptId: 'agentic-rag',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      learningOutcomes: [
        'Understanding query decomposition in RAG systems',
        'Designing multi-stage retrieval strategies',
        'Building trustworthy AI responses with citations'
      ]
    },
    explanation: 'This scenario demonstrates how Agentic RAG goes beyond simple retrieval to provide intelligent, contextual, and trustworthy information access.',
    relatedConcepts: ['information-retrieval', 'query-planning', 'response-synthesis'],
    timeEstimate: 25,
    successCriteria: [
      'Designs intelligent query interpretation',
      'Implements strategic retrieval approach',
      'Creates trustworthy response structure'
    ]
  }
];

// Interactive Scenarios for Modern Tool Use
export const modernToolUseScenarios: StudyModeQuestion[] = [
  {
    id: 'tool-use-scenario-1',
    type: 'scenario',
    conceptId: 'modern-tool-use',
    title: 'Financial Analysis Automation',
    level: 'advanced',
    scenario: {
      id: 'financial-analysis-automation',
      title: 'Multi-Tool Financial Report Generator',
      description: 'Build an agent that automates financial analysis by intelligently using multiple tools: data APIs, calculation engines, and reporting systems.',
      context: 'A financial services company needs to generate daily market analysis reports that combine data from multiple sources, perform complex calculations, and create formatted reports.',
      stakeholders: ['Financial Analysts', 'Portfolio Managers', 'Compliance Team', 'Clients'],
      challenges: [
        {
          id: 'tool-selection',
          title: 'Dynamic Tool Selection',
          description: 'The agent needs to analyze: "Compare tech sector performance vs market average for Q3"',
          question: 'What sequence of tools should the agent use for this analysis?',
          type: 'multiple-choice',
          options: [
            'Just use a single financial data API to get all information',
            'Market Data API → Sector Filter Tool → Statistical Calculator → Comparison Tool → Report Generator',
            'Ask the user to specify exactly which tools to use',
            'Use all available tools simultaneously for faster results'
          ],
          correctAnswer: 1,
          feedback: 'Excellent! Modern tool use requires intelligent sequencing where each tool\'s output informs the next tool selection.',
          hints: [
            'Think about the logical flow of financial analysis',
            'Consider how each tool\'s output enables the next step'
          ]
        },
        {
          id: 'error-handling',
          title: 'Handle Tool Failures',
          description: 'The primary market data API returns an error during analysis',
          question: 'How should the agent handle this failure?',
          type: 'multiple-choice',
          options: [
            'Stop the entire analysis and report failure',
            'Switch to backup data source, adjust analysis methodology, and note limitations in report',
            'Skip the failed data and continue with incomplete analysis',
            'Retry the same API call multiple times until it works'
          ],
          correctAnswer: 1,
          feedback: 'Perfect! Robust tool use includes graceful degradation and transparent limitation reporting.',
          hints: [
            'Consider how professional analysts handle data source failures',
            'Think about maintaining analysis quality with alternative approaches'
          ]
        },
        {
          id: 'quality-verification',
          title: 'Verify Tool Output Quality',
          description: 'How should the agent ensure the analysis results are accurate?',
          question: 'What quality verification steps should be implemented?',
          type: 'code',
          codeContext: 'Design quality checks for financial analysis tool outputs. Include data validation, cross-source verification, and sanity checks.',
          feedback: 'Excellent quality verification approach! Essential checks include: 1) Data validation (null checks, range validation, format verification), 2) Cross-source verification (comparing results from multiple data sources), 3) Sanity checks (logical consistency, expected ranges), 4) Historical comparison (trend analysis), 5) Statistical outlier detection.',
          hints: [
            'Think about common data quality issues in financial analysis',
            'Consider how to validate calculations and comparisons'
          ]
        }
      ],
      outcomes: [
        {
          id: 'production-ready-system',
          condition: 'All challenges completed successfully',
          result: 'You\'ve designed a robust financial analysis agent with intelligent tool orchestration',
          explanation: 'Your system can handle real-world complexity with proper error handling and quality verification.',
          nextSteps: [
            'Implement monitoring and alerting for tool performance',
            'Add learning mechanisms to improve tool selection',
            'Create audit trails for compliance requirements'
          ]
        }
      ],
      codeExample: `# Modern Tool Use Financial Agent
class FinancialAnalysisAgent:
    def __init__(self):
        self.tools = {
            'market_data': MarketDataAPI(),
            'calculator': AnalysisCalculator(),
            'report_gen': ReportGenerator()
        }
        self.fallback_tools = {
            'market_data': [BackupDataAPI(), CachedDataStore()]
        }
    
    def analyze_sector_performance(self, query):
        try:
            # Tool orchestration with error handling
            data = self.tools['market_data'].get_sector_data(query.sector)
            analysis = self.tools['calculator'].compare_performance(data)
            report = self.tools['report_gen'].create_report(analysis)
            return report
        except ToolError as e:
            return self.handle_tool_failure(e, query)`,
      resources: ['Financial APIs', 'Calculation Libraries', 'Report Templates'],
      conceptId: 'modern-tool-use',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      learningOutcomes: [
        'Designing intelligent tool orchestration',
        'Implementing robust error handling strategies',
        'Building quality verification systems'
      ]
    },
    explanation: 'This scenario demonstrates advanced tool use patterns for production systems requiring reliability and quality assurance.',
    relatedConcepts: ['tool-orchestration', 'error-recovery', 'quality-assurance'],
    timeEstimate: 35,
    successCriteria: [
      'Designs logical tool sequencing',
      'Implements comprehensive error handling',
      'Creates effective quality verification'
    ]
  }
];

// Interactive Scenarios for Computer Use
export const computerUseScenarios: StudyModeQuestion[] = [
  {
    id: 'computer-use-scenario-1',
    type: 'scenario',
    conceptId: 'computer-use',
    title: 'Automated Testing System',
    level: 'advanced',
    scenario: {
      id: 'automated-testing-system',
      title: 'AI Agent Web Application Testing',
      description: 'Design an agent that can autonomously test web applications by interacting with user interfaces like a human tester.',
      context: 'A software company needs to automate regression testing for their web applications. The agent must navigate interfaces, fill forms, and verify functionality.',
      stakeholders: ['QA Team', 'Development Team', 'Product Managers', 'End Users'],
      challenges: [
        {
          id: 'interface-interpretation',
          title: 'Visual Interface Understanding',
          description: 'The agent encounters a login form with username/password fields',
          question: 'How should the agent identify and interact with form elements?',
          type: 'multiple-choice',
          options: [
            'Use hardcoded coordinates for clicking specific screen positions',
            'Computer vision to identify form elements + DOM analysis for precise interaction',
            'Only rely on accessibility labels and ignore visual layout',
            'Take screenshots and ask human operators what to click'
          ],
          correctAnswer: 1,
          feedback: 'Excellent! Combining computer vision with DOM analysis provides robust, adaptable interface interaction.',
          hints: [
            'Consider how to make the system adaptable to UI changes',
            'Think about precision vs flexibility in element identification'
          ]
        },
        {
          id: 'dynamic-adaptation',
          title: 'Handle Dynamic Content',
          description: 'The web page loads content dynamically and layout changes',
          question: 'How should the agent adapt to changing interfaces?',
          type: 'multiple-choice',
          options: [
            'Wait for fixed time periods before interacting',
            'Monitor page state changes and adapt interaction strategy dynamically',
            'Refresh the page and start over when changes occur',
            'Only test static pages to avoid complexity'
          ],
          correctAnswer: 1,
          feedback: 'Perfect! Modern web applications require agents that can understand and adapt to dynamic content changes.',
          hints: [
            'Think about how human testers handle dynamic content',
            'Consider what signals indicate when a page is ready for interaction'
          ]
        },
        {
          id: 'test-verification',
          title: 'Verify Test Results',
          description: 'How should the agent determine if a test passed or failed?',
          question: 'What verification strategy would be most reliable?',
          type: 'code',
          codeContext: 'Design verification logic for web application testing. Include multi-modal verification including visual, text, and behavioral checks.',
          feedback: 'Outstanding verification strategy! Comprehensive testing verification should include: 1) Visual verification (screenshot comparison, UI element presence), 2) Text content verification (expected messages, data accuracy), 3) Behavioral verification (correct navigation, state changes), 4) Performance verification (load times, responsiveness), 5) Error condition testing (graceful failure handling).',
          hints: [
            'Consider different types of test failures',
            'Think about how to capture evidence of test results'
          ]
        }
      ],
      outcomes: [
        {
          id: 'autonomous-testing-system',
          condition: 'All challenges completed effectively',
          result: 'You\'ve designed an intelligent testing agent that can autonomously validate web applications',
          explanation: 'Your system combines computer vision, adaptive interaction, and comprehensive verification.',
          nextSteps: [
            'Implement test case learning from human demonstrations',
            'Add parallel testing across different browsers',
            'Create detailed failure analysis and reporting'
          ]
        }
      ],
      codeExample: `# Computer Use Testing Agent
class WebTestingAgent:
    def __init__(self):
        self.vision_system = ComputerVision()
        self.dom_analyzer = DOMAnalyzer()
        self.interaction_engine = InteractionEngine()
    
    def test_login_flow(self, test_case):
        # Visual + DOM analysis for robust element identification
        username_field = self.find_element("username input field")
        password_field = self.find_element("password input field")
        login_button = self.find_element("login button")
        
        # Adaptive interaction
        self.interaction_engine.type(username_field, test_case.username)
        self.interaction_engine.type(password_field, test_case.password)
        self.interaction_engine.click(login_button)
        
        # Multi-modal verification
        return self.verify_login_success()`,
      resources: ['Computer Vision APIs', 'Browser Automation', 'DOM Analysis Tools'],
      conceptId: 'computer-use',
      difficulty: 'advanced',
      estimatedTime: '40 minutes',
      learningOutcomes: [
        'Understanding visual interface interpretation',
        'Designing adaptive interaction systems',
        'Building comprehensive test verification'
      ]
    },
    explanation: 'This scenario demonstrates how computer use agents can automate complex human-computer interactions while maintaining reliability and adaptability.',
    relatedConcepts: ['computer-vision', 'interface-automation', 'adaptive-systems'],
    timeEstimate: 40,
    successCriteria: [
      'Designs robust interface interpretation',
      'Implements adaptive interaction strategies',
      'Creates comprehensive verification systems'
    ]
  }
];

// Export all scenarios organized by concept
export const scenarioLibrary = {
  'multi-agent-systems': autoGenScenarios,
  'a2a-communication': a2aScenarios,
  'agentic-rag': agenticRAGScenarios,
  'modern-tool-use': modernToolUseScenarios,
  'computer-use': computerUseScenarios
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
