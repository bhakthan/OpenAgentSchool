// System design quiz questions for agent patterns
import { QuizQuestion } from './types';

export const systemDesignQuestions: QuizQuestion[] = [
  // Beginner Level - Core System Design Concepts
  {
    id: 'sysdesign-prompt-b1',
    text: 'What is the primary purpose of prompt engineering in agent system design?',
    question: 'What is the primary purpose of prompt engineering in agent system design?',
    options: [
      'To make prompts longer and more detailed',
      'To design effective instructions that guide agent behavior and improve task performance',
      'To reduce the number of prompts needed',
      'To make prompts more creative'
    ],
    correctAnswer: 1,
    explanation: 'Prompt engineering involves designing effective instructions that guide agent behavior, improve task performance, and ensure consistent, reliable outputs from AI systems.',
    difficulty: 'beginner',
    category: 'system-design',
    subCategory: 'prompt-engineering',
    relatedConcepts: ['prompt-design', 'instruction-following', 'agent-behavior'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 30,
    codeExample: `# Example of structured prompt engineering
system_prompt = """
You are a helpful assistant that follows these guidelines:
1. Always provide accurate information
2. Ask clarifying questions if unclear
3. Format responses clearly
4. Cite sources when relevant
"""

task_prompt = "Analyze the following data and provide insights: {data}"`
  },
  {
    id: 'sysdesign-context-b1',
    text: 'What does context management refer to in agent system design?',
    question: 'What does context management refer to in agent system design?',
    options: [
      'Managing file storage systems',
      'Handling conversation history, memory, and relevant information across agent interactions',
      'Managing user interface contexts',
      'Managing code execution contexts only'
    ],
    correctAnswer: 1,
    explanation: 'Context management involves handling conversation history, maintaining memory, and managing relevant information across agent interactions to ensure coherent and informed responses.',
    difficulty: 'beginner',
    category: 'system-design',
    subCategory: 'context-management',
    relatedConcepts: ['memory-systems', 'conversation-history', 'state-management'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer', 'agent-developer'],
    timeEstimate: 30
  },
  {
    id: 'sysdesign-arch-b1',
    text: 'What are the key components of a basic agent architecture?',
    question: 'What are the key components of a basic agent architecture?',
    options: [
      'Only the language model',
      'Input processing, reasoning engine, memory system, and output generation',
      'Just the user interface',
      'Only the database'
    ],
    correctAnswer: 1,
    explanation: 'A basic agent architecture includes input processing (understanding requests), reasoning engine (decision making), memory system (context retention), and output generation (response creation).',
    difficulty: 'beginner',
    category: 'system-design',
    subCategory: 'architecture',
    relatedConcepts: ['agent-components', 'system-architecture', 'information-flow'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer', 'agent-developer'],
    timeEstimate: 45
  },

  // Intermediate Level - Advanced System Design
  {
    id: 'sysdesign-prompt-i1',
    text: 'Which technique is most effective for creating adaptive prompts in complex agent systems?',
    question: 'Which technique is most effective for creating adaptive prompts in complex agent systems?',
    options: [
      'Using only static prompts',
      'Chain-of-thought prompting with dynamic context injection and few-shot examples',
      'Making prompts as short as possible',
      'Using random prompt variations'
    ],
    correctAnswer: 1,
    explanation: 'Chain-of-thought prompting combined with dynamic context injection and few-shot examples allows agents to reason through complex problems while adapting to specific contexts and learning from examples.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'prompt-engineering',
    relatedConcepts: ['chain-of-thought', 'few-shot-learning', 'dynamic-prompts'],
    persona: ['agent-designer', 'agent-developer', 'ai-engineer'],
    timeEstimate: 60,
    codeExample: `# Advanced prompt engineering with chain-of-thought
def create_adaptive_prompt(task, context, examples):
    return f"""
    Context: {context}
    
    Examples:
    {format_few_shot_examples(examples)}
    
    Task: {task}
    
    Think step by step:
    1. Analyze the problem
    2. Consider relevant context
    3. Apply learned patterns
    4. Generate solution
    
    Response:
    """`
  },
  {
    id: 'sysdesign-context-i1',
    text: 'What is the most effective approach for managing long-term memory in agent systems?',
    question: 'What is the most effective approach for managing long-term memory in agent systems?',
    options: [
      'Store everything in a single file',
      'Use hierarchical memory with semantic indexing, relevance scoring, and memory consolidation',
      'Delete old memories regularly',
      'Use only short-term memory'
    ],
    correctAnswer: 1,
    explanation: 'Hierarchical memory systems with semantic indexing allow efficient retrieval, relevance scoring prioritizes important information, and memory consolidation helps maintain useful long-term knowledge.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'context-management',
    relatedConcepts: ['memory-hierarchy', 'semantic-search', 'relevance-scoring'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 75,
    codeExample: `# Hierarchical memory system example
class HierarchicalMemory:
    def __init__(self):
        self.working_memory = {}  # Current context
        self.episodic_memory = []  # Recent interactions
        self.semantic_memory = VectorDB()  # Long-term knowledge
        
    def store(self, information, importance_score):
        if importance_score > 0.8:
            self.semantic_memory.add(information)
        else:
            self.episodic_memory.append(information)
            
    def retrieve(self, query, k=5):
        # Semantic search for relevant memories
        return self.semantic_memory.similarity_search(query, k)`
  },
  {
    id: 'sysdesign-eval-i1',
    text: 'What are the key metrics for evaluating agent system performance?',
    question: 'What are the key metrics for evaluating agent system performance?',
    options: [
      'Only response time',
      'Task completion rate, response quality, user satisfaction, and system reliability',
      'Only cost metrics',
      'Only technical performance'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive agent evaluation includes task completion rate (effectiveness), response quality (accuracy and relevance), user satisfaction (usability), and system reliability (consistency and uptime).',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'evaluation',
    relatedConcepts: ['performance-metrics', 'quality-assessment', 'user-satisfaction'],
    persona: ['agent-developer', 'ai-engineer', 'product-manager'],
    timeEstimate: 60
  },

  // Advanced Level - Complex System Design
  {
    id: 'sysdesign-arch-a1',
    text: 'How should you design a multi-agent system for optimal coordination and performance?',
    question: 'How should you design a multi-agent system for optimal coordination and performance?',
    options: [
      'Use a single central controller for all agents',
      'Implement hierarchical coordination with specialized roles, message passing protocols, and distributed decision-making',
      'Let agents work completely independently',
      'Use only peer-to-peer communication'
    ],
    correctAnswer: 1,
    explanation: 'Optimal multi-agent systems use hierarchical coordination with specialized agent roles, standardized message passing protocols for communication, and distributed decision-making to balance coordination with autonomy.',
    difficulty: 'advanced',
    category: 'system-design',
    subCategory: 'architecture',
    relatedConcepts: ['multi-agent-coordination', 'distributed-systems', 'agent-communication'],
    persona: ['ai-engineer'],
    timeEstimate: 120,
    codeExample: `# Multi-agent coordination system
class AgentCoordinator:
    def __init__(self):
        self.agents = {}
        self.message_queue = MessageQueue()
        self.coordination_protocol = CoordinationProtocol()
        
    def coordinate_task(self, task):
        # Decompose task into subtasks
        subtasks = self.decompose_task(task)
        
        # Assign to appropriate agents
        assignments = self.assign_subtasks(subtasks)
        
        # Monitor and coordinate execution
        return self.execute_coordinated(assignments)
        
    def handle_agent_communication(self, sender, receiver, message):
        # Implement message passing protocol
        validated_message = self.coordination_protocol.validate(message)
        self.message_queue.send(sender, receiver, validated_message)`
  },
  {
    id: 'sysdesign-tools-a1',
    text: 'What is the most sophisticated approach to tool integration in agent systems?',
    question: 'What is the most sophisticated approach to tool integration in agent systems?',
    options: [
      'Hard-code all tool interactions',
      'Dynamic tool discovery with capability matching, composition chains, and adaptive selection',
      'Use only predefined tools',
      'Avoid tool integration entirely'
    ],
    correctAnswer: 1,
    explanation: 'Advanced tool integration involves dynamic discovery of available tools, capability matching to find appropriate tools for tasks, composition chains for complex operations, and adaptive selection based on context and performance.',
    difficulty: 'advanced',
    category: 'system-design',
    subCategory: 'tools',
    relatedConcepts: ['tool-discovery', 'capability-matching', 'tool-composition'],
    persona: ['ai-engineer'],
    timeEstimate: 90,
    codeExample: `# Dynamic tool integration system
class ToolOrchestrator:
    def __init__(self):
        self.tool_registry = ToolRegistry()
        self.capability_matcher = CapabilityMatcher()
        
    def execute_task(self, task_description):
        # Analyze task requirements
        requirements = self.analyze_task(task_description)
        
        # Find matching tools
        candidate_tools = self.capability_matcher.find_tools(requirements)
        
        # Create execution plan
        execution_plan = self.plan_tool_sequence(candidate_tools, requirements)
        
        # Execute with adaptive fallbacks
        return self.execute_with_monitoring(execution_plan)`
  },
  {
    id: 'sysdesign-security-a1',
    text: 'What are the critical security considerations for production agent systems?',
    question: 'What are the critical security considerations for production agent systems?',
    options: [
      'Only user authentication',
      'Input validation, output sanitization, privilege management, audit logging, and secure communication',
      'Only encryption',
      'Only access control'
    ],
    correctAnswer: 1,
    explanation: 'Production agent systems require comprehensive security including input validation (prevent injection attacks), output sanitization (safe responses), privilege management (least privilege access), audit logging (compliance and monitoring), and secure communication (data protection).',
    difficulty: 'advanced',
    category: 'system-design',
    subCategory: 'security',
    relatedConcepts: ['input-validation', 'privilege-management', 'audit-logging', 'secure-communication'],
    persona: ['ai-engineer'],
    timeEstimate: 105
  },

  // Role-based System Design Questions
  {
    id: 'sysdesign-business-b1',
    text: 'From a business perspective, what is the most important factor when designing agent systems?',
    question: 'From a business perspective, what is the most important factor when designing agent systems?',
    options: [
      'Using the latest technology',
      'Alignment with business objectives, user needs, and measurable ROI',
      'Having the most features',
      'Using complex algorithms'
    ],
    correctAnswer: 1,
    explanation: 'Business-focused system design prioritizes alignment with business objectives, meeting actual user needs, and delivering measurable return on investment rather than technical complexity.',
    difficulty: 'beginner',
    category: 'system-design',
    subCategory: 'business-alignment',
    relatedConcepts: ['business-value', 'roi-measurement', 'user-needs'],
    persona: ['business-leader'],
    timeEstimate: 30
  },
  {
    id: 'sysdesign-dev-i1',
    text: 'As a developer, what is the most critical aspect of agent system architecture?',
    question: 'As a developer, what is the most critical aspect of agent system architecture?',
    options: [
      'Using the most popular frameworks',
      'Modular design with clear separation of concerns, testability, and maintainability',
      'Writing the shortest code possible',
      'Using only cutting-edge technologies'
    ],
    correctAnswer: 1,
    explanation: 'Developer-focused architecture emphasizes modular design for flexibility, clear separation of concerns for maintainability, comprehensive testability, and sustainable maintainability over time.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'architecture',
    relatedConcepts: ['modular-design', 'separation-of-concerns', 'testability'],
    persona: ['agent-developer'],
    timeEstimate: 60,
    codeExample: `# Modular agent architecture example
class AgentSystem:
    def __init__(self):
        self.input_processor = InputProcessor()
        self.reasoning_engine = ReasoningEngine()
        self.memory_manager = MemoryManager()
        self.output_generator = OutputGenerator()
        self.tool_manager = ToolManager()
        
    def process_request(self, user_input):
        # Clear separation of concerns
        parsed_input = self.input_processor.process(user_input)
        context = self.memory_manager.get_relevant_context(parsed_input)
        reasoning_result = self.reasoning_engine.reason(parsed_input, context)
        response = self.output_generator.generate(reasoning_result)
        return response`
  },
  {
    id: 'sysdesign-designer-i1',
    text: 'From a UX/UI design perspective, what is most important in agent system design?',
    question: 'From a UX/UI design perspective, what is most important in agent system design?',
    options: [
      'Making the interface look modern',
      'Creating intuitive interactions, clear feedback, and transparent agent capabilities',
      'Using the latest design trends',
      'Making everything customizable'
    ],
    correctAnswer: 1,
    explanation: 'UX-focused agent design prioritizes intuitive interactions that feel natural, clear feedback about agent actions and limitations, and transparent communication of agent capabilities and constraints.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'user-experience',
    relatedConcepts: ['interaction-design', 'user-feedback', 'transparency'],
    persona: ['agent-designer'],
    timeEstimate: 45
  },

  // CodeAct System Design Specific
  {
    id: 'sysdesign-codeact-i1',
    text: 'What are the key components of a CodeAct agent system design?',
    question: 'What are the key components of a CodeAct agent system design?',
    options: [
      'Only code generation',
      'Secure execution environment, code generation, testing framework, and iterative refinement',
      'Only code testing',
      'Only code storage'
    ],
    correctAnswer: 1,
    explanation: 'CodeAct systems require secure execution environments for safety, intelligent code generation, comprehensive testing frameworks for validation, and iterative refinement based on execution feedback.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'codeact-pattern',
    relatedConcepts: ['code-execution', 'security-sandboxing', 'iterative-development'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 75,
    codeExample: `# CodeAct system design example
class CodeActAgent:
    def __init__(self):
        self.code_generator = CodeGenerator()
        self.execution_sandbox = SecureSandbox()
        self.test_framework = TestFramework()
        self.feedback_processor = FeedbackProcessor()
        
    def solve_with_code(self, problem):
        # Generate initial code
        code = self.code_generator.generate(problem)
        
        # Execute safely
        result = self.execution_sandbox.execute(code)
        
        # Test and validate
        test_results = self.test_framework.run_tests(code, result)
        
        # Refine based on feedback
        if not test_results.passed:
            feedback = self.feedback_processor.analyze(test_results)
            return self.solve_with_code(problem + feedback)
            
        return result`
  },

  // Multi-Agent System Design
  {
    id: 'sysdesign-multiagent-a1',
    text: 'What is the most effective pattern for agent-to-agent communication in complex systems?',
    question: 'What is the most effective pattern for agent-to-agent communication in complex systems?',
    options: [
      'Direct function calls between agents',
      'Message-passing with standardized protocols, routing, and conflict resolution',
      'Shared global variables',
      'File-based communication'
    ],
    correctAnswer: 1,
    explanation: 'Effective multi-agent communication uses message-passing with standardized protocols for consistency, intelligent routing for efficiency, and conflict resolution mechanisms for coordination.',
    difficulty: 'advanced',
    category: 'system-design',
    subCategory: 'multi-agent',
    relatedConcepts: ['message-passing', 'agent-protocols', 'conflict-resolution'],
    persona: ['ai-engineer'],
    timeEstimate: 90
  },

  // Voice Agent System Design
  {
    id: 'sysdesign-voice-i1',
    text: 'What are the critical system design considerations for voice-enabled agents?',
    question: 'What are the critical system design considerations for voice-enabled agents?',
    options: [
      'Only speech recognition accuracy',
      'Latency optimization, speech processing pipeline, conversation state management, and multimodal integration',
      'Only text-to-speech quality',
      'Only microphone quality'
    ],
    correctAnswer: 1,
    explanation: 'Voice agent systems require low-latency processing for natural conversations, robust speech processing pipelines, sophisticated conversation state management, and seamless multimodal integration.',
    difficulty: 'intermediate',
    category: 'system-design',
    subCategory: 'voice-agent',
    relatedConcepts: ['speech-processing', 'conversation-management', 'multimodal-interaction'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 60
  }
];
