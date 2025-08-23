import { StudyModeQuestion, StudyModeType, StudyModeLevel } from './types';

// Socratic Questions for A2A Communication
export const a2aSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'a2a-socratic-1',
    type: 'socratic',
    conceptId: 'a2a-communication',
    title: 'Discovering the Need for Agent Communication',
    level: 'beginner',
    socratiQuestion: "Imagine two AI agents need to work together on a task. What is the most fundamental thing they would need to do first? How might they achieve that?",
    followUpQuestions: [
      "What happens if one agent doesn't know what the other is doing?",
      "How would they coordinate who does what?",
      "What if they both try to do the same thing at the same time?"
    ],
    expectedInsights: [
      "Agents need to communicate to avoid duplication of work",
      "Clear protocols prevent confusion and conflicts",
      "Coordination is essential for efficient collaboration"
    ],
    hints: [
      "Think about how humans coordinate on team projects",
      "Consider what happens when there's no communication plan",
      "Reflect on the challenges of distributed systems"
    ],
    explanation: "This exploration leads students to discover that communication protocols like A2A are not just technical requirements, but fundamental necessities for any collaborative system.",
    relatedConcepts: ['multi-agent-systems', 'coordination', 'protocols'],
    timeEstimate: 15,
    successCriteria: [
      "Identifies communication as the fundamental need",
      "Recognizes coordination challenges",
      "Understands the purpose of protocols"
    ]
  },
  {
    id: 'a2a-socratic-2',
    type: 'socratic',
    conceptId: 'a2a-communication',
    title: 'Protocol Design Thinking',
    level: 'intermediate',
    socratiQuestion: "If you were designing a language for agents to talk to each other, what essential elements would you include? What could go wrong if you missed something?",
    followUpQuestions: [
      "How would an agent identify itself to another agent?",
      "What if the message gets corrupted or lost in transit?",
      "How would you handle different types of requests and responses?"
    ],
    expectedInsights: [
      "Message format standardization is crucial",
      "Error handling and retries are necessary",
      "Authentication and identification prevent confusion",
      "Different message types serve different purposes"
    ],
    hints: [
      "Consider the elements of human conversation",
      "Think about what makes communication reliable",
      "Reflect on different conversation purposes"
    ],
    explanation: "This helps students understand why A2A protocols have specific components like message formatting, routing, and error handling.",
    relatedConcepts: ['message-formatting', 'error-handling', 'authentication'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies key protocol components",
      "Understands the importance of reliability",
      "Recognizes security considerations"
    ]
  }
];

// Socratic Questions for MCP
export const mcpSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'mcp-socratic-1',
    type: 'socratic',
    conceptId: 'mcp',
    title: 'Understanding Context in AI Communication',
    level: 'beginner',
    socratiQuestion: "When you're having a long conversation with a friend, how do you both remember what you've talked about? What would happen if you lost track of the conversation context?",
    followUpQuestions: [
      "How would this apply to AI agents working on complex tasks?",
      "What if an agent needed to hand off a conversation to another agent?",
      "How could you preserve the 'memory' of what happened?"
    ],
    expectedInsights: [
      "Context preservation is essential for meaningful conversations",
      "Handoffs require transferring conversation state",
      "Memory and history enable continuity"
    ],
    hints: [
      "Think about conversations that span multiple days",
      "Consider what happens when someone joins a conversation midway",
      "Reflect on how you remember conversation history"
    ],
    explanation: "This exploration helps students understand why MCP focuses on context management and state preservation in agent interactions.",
    relatedConcepts: ['context-management', 'conversation-state', 'handoffs'],
    timeEstimate: 12,
    successCriteria: [
      "Understands the importance of context",
      "Recognizes handoff challenges",
      "Sees the need for state management"
    ]
  }
];

// Socratic Questions for Multi-Agent Systems
export const multiAgentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'mas-socratic-1',
    type: 'socratic',
    conceptId: 'multi-agent-systems',
    title: 'Discovering Specialization Benefits',
    level: 'beginner',
    socratiQuestion: "Why don't companies hire one person to do everything - sales, engineering, marketing, and accounting? What are the benefits of having specialists?",
    followUpQuestions: [
      "How would this principle apply to AI agents?",
      "What challenges arise when specialists need to work together?",
      "How would you organize a team of specialist agents?"
    ],
    expectedInsights: [
      "Specialization leads to better expertise and efficiency",
      "Coordination becomes more important with specialists",
      "Clear roles and responsibilities are essential"
    ],
    hints: [
      "Consider the advantages of expertise vs. generalization",
      "Think about team organization in complex projects",
      "Reflect on communication challenges in large teams"
    ],
    explanation: "This leads students to understand why multi-agent systems with specialized roles often outperform single-agent solutions.",
    relatedConcepts: ['specialization', 'coordination', 'role-definition'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes benefits of specialization",
      "Understands coordination challenges",
      "Sees parallels between human and AI teams"
    ]
  }
];

// Socratic Questions for Agentic RAG
export const agenticRAGSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-rag-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-rag',
    title: 'Understanding the Limits of Memory',
    level: 'beginner',
    socratiQuestion: "Imagine you're a librarian helping someone find information. You have an excellent memory but the library has millions of books. What's the fundamental challenge you face, and how might you solve it?",
    followUpQuestions: [
      "What if the person asks about something very specific that you've never encountered?",
      "How would you verify that the information you found is relevant and accurate?",
      "What if you need to combine information from multiple sources?"
    ],
    expectedInsights: [
      "Even with good memory, you can't remember everything",
      "You need a systematic way to search and retrieve information",
      "Verification and relevance checking are crucial",
      "Combining multiple sources requires careful synthesis"
    ],
    hints: [
      "Think about the difference between what you know and what you can find",
      "Consider how librarians actually help people find information",
      "Reflect on the challenges of information quality and relevance"
    ],
    explanation: "This exploration helps students understand why RAG (Retrieval-Augmented Generation) systems are needed and how adding 'agentic' behavior makes them more intelligent.",
    relatedConcepts: ['information-retrieval', 'knowledge-management', 'verification'],
    timeEstimate: 12,
    successCriteria: [
      "Understands the limitations of memory alone",
      "Recognizes the need for systematic retrieval",
      "Sees the importance of verification and synthesis"
    ]
  },
  {
    id: 'agentic-rag-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-rag',
    title: 'The Art of Asking Better Questions',
    level: 'intermediate',
    socratiQuestion: "When someone asks you a vague question like 'Tell me about dogs,' how do you decide what specific information to provide? What makes some follow-up questions better than others?",
    followUpQuestions: [
      "How would you refine a search query to get more precise results?",
      "What if your first search doesn't yield good results - what would you do differently?",
      "How do you decide when you have enough information to give a complete answer?"
    ],
    expectedInsights: [
      "Good questions are specific and contextual",
      "Query refinement is an iterative process",
      "Multiple search strategies may be needed",
      "Knowing when to stop searching is important"
    ],
    hints: [
      "Think about how you naturally clarify ambiguous requests",
      "Consider the difference between broad and targeted searches",
      "Reflect on how expert researchers approach information gathering"
    ],
    explanation: "This helps students understand the 'agentic' part of Agentic RAG - how an agent can intelligently plan and refine its information retrieval strategy.",
    relatedConcepts: ['query-refinement', 'search-strategy', 'information-planning'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the importance of query refinement",
      "Recognizes iterative search strategies",
      "Sees the value of intelligent planning in information retrieval"
    ]
  }
];

// Socratic Questions for Modern Tool Use
export const modernToolUseSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'tool-use-socratic-1',
    type: 'socratic',
    conceptId: 'modern-tool-use',
    title: 'Tools as Extensions of Intelligence',
    level: 'beginner',
    socratiQuestion: "Think about how a chef uses different tools in a kitchen. Why doesn't a chef use just one tool for everything? How do they decide which tool to use when?",
    followUpQuestions: [
      "What happens when a tool breaks or isn't available?",
      "How would you teach someone to use multiple tools in the right sequence?",
      "What if you needed to use a tool you've never seen before?"
    ],
    expectedInsights: [
      "Different tools are optimized for different tasks",
      "Tool selection requires understanding the task and tool capabilities",
      "Backup plans are needed when tools fail",
      "Learning to use new tools is an ongoing skill"
    ],
    hints: [
      "Consider how experts become efficient with their tools",
      "Think about the relationship between task complexity and tool selection",
      "Reflect on how you learn to use new software or apps"
    ],
    explanation: "This exploration helps students understand why AI agents need sophisticated tool use capabilities and how to design systems that can dynamically select and use appropriate tools.",
    relatedConcepts: ['tool-selection', 'task-optimization', 'adaptability'],
    timeEstimate: 15,
    successCriteria: [
      "Understands the relationship between tasks and tools",
      "Recognizes the need for intelligent tool selection",
      "Sees the importance of adaptability and fallback strategies"
    ]
  }
];

// Socratic Questions for Computer Use
export const computerUseSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'computer-use-socratic-1',
    type: 'socratic',
    conceptId: 'computer-use',
    title: 'Seeing Through Digital Eyes',
    level: 'intermediate',
    socratiQuestion: "Imagine you had to teach someone to use a computer, but they could only see what's on the screen and move the mouse - they can't feel the keyboard or see you. How would you describe what to do?",
    followUpQuestions: [
      "How would you help them find a specific button or menu item?",
      "What if the screen changes unexpectedly or an error appears?",
      "How would you verify they completed the task correctly?"
    ],
    expectedInsights: [
      "Computer interaction requires precise visual interpretation",
      "Instructions must be specific and context-aware",
      "Error handling and verification are essential",
      "Visual feedback is crucial for navigation"
    ],
    hints: [
      "Think about how you describe computer tasks to someone over the phone",
      "Consider what makes interface elements easy or hard to find",
      "Reflect on how you recover when something unexpected happens"
    ],
    explanation: "This helps students understand the challenges AI agents face when interacting with computer interfaces and why computer use patterns need sophisticated visual processing and error handling.",
    relatedConcepts: ['visual-interpretation', 'interface-navigation', 'error-recovery'],
    timeEstimate: 20,
    successCriteria: [
      "Understands the complexity of visual interface interpretation",
      "Recognizes the need for precise and adaptable instructions",
      "Sees the importance of error handling in automated interactions"
    ]
  }
];

// Socratic Questions for Voice Agents
export const voiceAgentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'voice-agent-socratic-1',
    type: 'socratic',
    conceptId: 'voice-agent',
    title: 'The Nuances of Spoken Communication',
    level: 'beginner',
    socratiQuestion: "Think about how you communicate differently when speaking versus writing. What additional information do you get from someone's voice that you miss in text?",
    followUpQuestions: [
      "How do you handle interruptions or when someone speaks over you?",
      "What happens when you can't hear clearly or there's background noise?",
      "How do you know when someone is finished speaking and it's your turn?"
    ],
    expectedInsights: [
      "Voice communication includes tone, pace, and emotional context",
      "Real-time conversation requires managing interruptions and turns",
      "Audio quality and noise affect understanding",
      "Non-verbal cues help with conversation flow"
    ],
    hints: [
      "Consider the difference between phone calls and in-person conversations",
      "Think about how you handle unclear audio in calls",
      "Reflect on natural conversation patterns and timing"
    ],
    explanation: "This exploration helps students understand the unique challenges of voice-based AI agents and why they need specialized capabilities for audio processing, conversation management, and natural interaction.",
    relatedConcepts: ['speech-processing', 'conversation-management', 'natural-interaction'],
    timeEstimate: 12,
    successCriteria: [
      "Recognizes the richness of voice communication",
      "Understands the challenges of real-time audio interaction",
      "Sees the need for sophisticated conversation management"
    ]
  }
];

// Socratic Questions for Deep Agents
export const deepAgentsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'deep-agents-socratic-1',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'Understanding Complex Task Complexity',
    level: 'beginner',
    socratiQuestion: "Think about a complex project you've worked on that took several days or weeks. What made it complex? How did you organize your approach?",
    followUpQuestions: [
      "How did you know if your initial approach was working?",
      "What did you do when you discovered gaps or errors in your work?",
      "How did you coordinate if others were helping you?"
    ],
    expectedInsights: [
      "Complex tasks require planning and organization",
      "Multiple revision cycles are often necessary",
      "Quality checks prevent compounding errors",
      "Coordination becomes critical with multiple contributors"
    ],
    hints: [
      "Consider research projects, business proposals, or software development",
      "Think about how you break down large tasks into smaller pieces",
      "Reflect on the importance of review and feedback cycles"
    ],
    explanation: "This exploration helps students understand why simple AI agents aren't sufficient for complex tasks and introduces the need for sophisticated orchestration, planning, and quality assurance mechanisms.",
    relatedConcepts: ['complex-reasoning', 'task-planning', 'quality-assurance'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the multi-faceted nature of complex tasks",
      "Understands the need for iterative refinement",
      "Sees the value of systematic organization and review"
    ]
  },
  {
    id: 'deep-agents-socratic-2',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'The Virtual File System Insight',
    level: 'intermediate',
    socratiQuestion: "Imagine you're working on a complex research report with a team, but you can only communicate through notes left in a shared folder. How would you organize this folder to ensure smooth collaboration?",
    followUpQuestions: [
      "How would you avoid team members overwriting each other's work?",
      "What happens if someone needs to reference earlier versions of work?",
      "How would you track what's been completed versus what still needs work?"
    ],
    expectedInsights: [
      "Persistent state storage enables continuation across sessions",
      "Version control prevents loss of work and enables iteration",
      "Clear organization prevents confusion and conflicts",
      "Status tracking ensures nothing falls through the cracks"
    ],
    hints: [
      "Think about collaborative document editing tools",
      "Consider how software developers manage code versions",
      "Reflect on project management and work tracking systems"
    ],
    explanation: "This thought experiment reveals why the Virtual File System is crucial for Deep Agents - it provides the persistent memory and organization needed for complex, multi-session workflows.",
    relatedConcepts: ['state-management', 'version-control', 'collaborative-systems'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the need for persistent state management",
      "Recognizes version control and conflict resolution challenges",
      "Sees the importance of systematic organization"
    ]
  },
  {
    id: 'deep-agents-socratic-3',
    type: 'socratic',
    conceptId: 'deep-agents',
    title: 'The Power of Specialized Expertise',
    level: 'advanced',
    socratiQuestion: "Why do successful companies have specialized departments (HR, Finance, Marketing) rather than having everyone do everything? How does this principle apply to AI agent design?",
    followUpQuestions: [
      "What are the advantages and disadvantages of specialization?",
      "How do you ensure specialized teams work together effectively?",
      "When might having generalists be better than specialists?"
    ],
    expectedInsights: [
      "Specialization enables deeper expertise and efficiency",
      "Context isolation prevents contamination between different types of work",
      "Coordination mechanisms are essential for specialized teams",
      "Different tasks require different skills and approaches"
    ],
    hints: [
      "Consider why lawyers don't typically do accounting",
      "Think about how specialized medical teams work in hospitals",
      "Reflect on the coordination challenges in large organizations"
    ],
    explanation: "This exploration reveals the architectural principle behind sub-agents in Deep Agents systems - specialization enables better quality and efficiency, but requires sophisticated coordination.",
    relatedConcepts: ['specialization', 'agent-coordination', 'system-architecture'],
    timeEstimate: 20,
    successCriteria: [
      "Understands the benefits of specialized sub-agents",
      "Recognizes the need for coordination mechanisms",
      "Sees the parallel between organizational and agent design"
    ]
  }
];

// Socratic Questions for Agentic Prompting Fundamentals
export const agenticPromptingFundamentalsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-prompting-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'Discovering the Need for Agent Control',
    level: 'beginner',
    socratiQuestion: "Imagine you're instructing an AI agent to help with a task. What would happen if you gave it a very general instruction like 'help me with my work' versus a specific one? Why might control over the agent's behavior be important?",
    followUpQuestions: [
      "What if the agent starts doing things you didn't want it to do?",
      "How would you guide an agent to think step-by-step rather than rushing to an answer?",
      "What's the difference between an agent that can access tools and one that cannot?"
    ],
    expectedInsights: [
      "Specific instructions lead to more predictable and useful outcomes",
      "Agent behavior needs to be controlled and guided",
      "Tool access fundamentally changes what an agent can accomplish"
    ],
    hints: [
      "Think about how you would instruct a human assistant",
      "Consider what happens when instructions are ambiguous",
      "Reflect on the difference between thinking and acting"
    ],
    explanation: "This exploration helps students discover that agentic prompting is about creating precise, controllable interactions that guide AI behavior toward desired outcomes.",
    relatedConcepts: ['prompt-optimization-patterns', 'agent-instruction-design'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the importance of specific instructions",
      "Understands the need for behavioral control",
      "Grasps the significance of tool integration"
    ]
  },
  {
    id: 'agentic-prompting-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'Eagerness vs Thoughtfulness Trade-off',
    level: 'intermediate',
    socratiQuestion: "If an AI agent is very 'eager' to help and immediately tries to solve your problem versus one that asks clarifying questions first, which approach would be better in different situations? What are the trade-offs?",
    followUpQuestions: [
      "When might you want an agent to act quickly versus think carefully?",
      "How could you control this behavior through your instructions?",
      "What happens if an agent is too eager to use tools when simple reasoning would suffice?"
    ],
    expectedInsights: [
      "Eagerness control allows matching agent behavior to task requirements",
      "Some tasks benefit from immediate action, others from careful consideration",
      "Prompting can influence the reasoning-to-action ratio"
    ],
    hints: [
      "Consider emergency vs planning scenarios",
      "Think about tool usage costs and complexity",
      "Reflect on when you want human assistants to be eager vs cautious"
    ],
    explanation: "Students discover that agentic prompting involves sophisticated control over agent decision-making patterns and tool usage strategies.",
    relatedConcepts: ['agentic-workflow-control', 'agent-evaluation-methodologies'],
    timeEstimate: 20,
    successCriteria: [
      "Understands eagerness as a controllable parameter",
      "Recognizes situational appropriateness of different approaches",
      "Grasps the concept of reasoning-action balance"
    ]
  }
];

// Socratic Questions for Prompt Optimization Patterns
export const promptOptimizationPatternsSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'prompt-optimization-socratic-1',
    type: 'socratic',
    conceptId: 'prompt-optimization-patterns',
    title: 'The Hidden Cost of Inefficient Prompts',
    level: 'beginner',
    socratiQuestion: "If a prompt produces the right answer but uses 10x more tokens than necessary, or takes 5x longer to execute, what's the real cost? Why might optimization matter even when the answer is correct?",
    followUpQuestions: [
      "What happens when you scale this inefficiency across thousands of interactions?",
      "How might prompt length affect the agent's ability to focus on what's important?",
      "What if two prompts give the same accuracy but one is much more efficient?"
    ],
    expectedInsights: [
      "Efficiency matters at scale - costs and performance compound",
      "Clarity helps agents focus on essential information",
      "Optimization is about achieving the same quality with fewer resources"
    ],
    hints: [
      "Think about scalability and real-world usage patterns",
      "Consider the cognitive load analogy for humans",
      "Reflect on the difference between 'works' and 'works well'"
    ],
    explanation: "This exploration reveals that prompt optimization is not just about correctness but about efficiency, clarity, and scalability in production systems.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'agent-evaluation-methodologies'],
    timeEstimate: 18,
    successCriteria: [
      "Recognizes efficiency as distinct from accuracy",
      "Understands scalability implications",
      "Values optimization beyond just getting correct answers"
    ]
  },
  {
    id: 'prompt-optimization-socratic-2',
    type: 'socratic',
    conceptId: 'prompt-optimization-patterns',
    title: 'Discovering Contradiction Elimination',
    level: 'intermediate',
    socratiQuestion: "Imagine you give an agent instructions that say both 'be creative and innovative' and 'follow the exact template provided.' What happens when instructions contradict each other? How would you systematically find and fix such conflicts?",
    followUpQuestions: [
      "What patterns might help you identify contradictory requirements?",
      "How would you prioritize when multiple instructions conflict?",
      "What systematic approach could prevent contradictions in the first place?"
    ],
    expectedInsights: [
      "Contradictory instructions create unpredictable agent behavior",
      "Systematic analysis can identify conflicting requirements",
      "Clear hierarchies and priorities prevent contradiction problems"
    ],
    hints: [
      "Think about how conflicting goals affect human performance",
      "Consider creating a checklist or framework for review",
      "Reflect on the importance of internal consistency"
    ],
    explanation: "Students discover that prompt optimization involves systematic identification and elimination of contradictions that can undermine agent performance.",
    relatedConcepts: ['agent-instruction-design', 'agentic-workflow-control'],
    timeEstimate: 22,
    successCriteria: [
      "Identifies contradiction as a source of problems",
      "Understands systematic approaches to conflict detection",
      "Grasps the importance of instruction hierarchy"
    ]
  }
];

// Socratic Questions for Agent Instruction Design
export const agentInstructionDesignSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-instruction-socratic-1',
    type: 'socratic',
    conceptId: 'agent-instruction-design',
    title: 'The Hierarchy of Agent Priorities',
    level: 'beginner',
    socratiQuestion: "If you tell an agent to 'be helpful, be accurate, and be fast,' but these goals conflict in a specific situation, how should the agent decide what to prioritize? What system would you design to handle such conflicts?",
    followUpQuestions: [
      "What happens if there's no clear priority system?",
      "How would you communicate priority levels to an agent?",
      "What if user instructions conflict with safety instructions?"
    ],
    expectedInsights: [
      "Agents need explicit priority hierarchies to resolve conflicts",
      "Instruction design must anticipate conflicting requirements",
      "Safety and core principles should typically override user preferences"
    ],
    hints: [
      "Think about how humans handle conflicting instructions",
      "Consider emergency protocols and safety overrides",
      "Reflect on the need for explicit vs implicit priorities"
    ],
    explanation: "This exploration leads to understanding that effective agent instruction design requires explicit hierarchies and conflict resolution mechanisms.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Recognizes the need for priority hierarchies",
      "Understands conflict resolution mechanisms",
      "Grasps the importance of safety overrides"
    ]
  },
  {
    id: 'agent-instruction-socratic-2',
    type: 'socratic',
    conceptId: 'agent-instruction-design',
    title: 'Steerability in Action',
    level: 'intermediate',
    socratiQuestion: "If you want an agent to adjust its communication style based on the audience (technical expert vs beginner), how would you design instructions that allow this flexibility while maintaining consistency? What mechanisms would enable real-time adjustment?",
    followUpQuestions: [
      "How would the agent detect what type of audience it's addressing?",
      "What core principles should remain constant regardless of the audience?",
      "How would you validate that the agent is adjusting appropriately?"
    ],
    expectedInsights: [
      "Steerability requires both detection mechanisms and adaptation rules",
      "Core principles should remain stable while style adapts",
      "Validation mechanisms ensure appropriate adaptation"
    ],
    hints: [
      "Think about how skilled human communicators adapt their style",
      "Consider what indicators reveal audience expertise level",
      "Reflect on the balance between flexibility and consistency"
    ],
    explanation: "Students discover that instruction design for steerability involves creating adaptive systems that maintain core integrity while allowing contextual adjustment.",
    relatedConcepts: ['prompt-optimization-patterns', 'agent-evaluation-methodologies'],
    timeEstimate: 25,
    successCriteria: [
      "Understands steerability as controlled adaptation",
      "Recognizes the need for detection and response mechanisms",
      "Grasps the balance between flexibility and consistency"
    ]
  }
];

// Socratic Questions for Agentic Workflow Control
export const agenticWorkflowControlSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-workflow-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-workflow-control',
    title: 'Sequential vs Parallel Workflow Discovery',
    level: 'intermediate',
    socratiQuestion: "Imagine an agent needs to research a topic, write a summary, and create a presentation. Which of these tasks could happen at the same time, and which must happen in sequence? How would you design a system to coordinate this efficiently?",
    followUpQuestions: [
      "What information dependencies exist between these tasks?",
      "How would you handle failures in a parallel workflow?",
      "What if one task takes much longer than expected?"
    ],
    expectedInsights: [
      "Task dependencies determine workflow structure",
      "Parallel execution can improve efficiency but adds complexity",
      "Failure handling and timing management are crucial design considerations"
    ],
    hints: [
      "Think about which tasks require outputs from other tasks",
      "Consider how project managers coordinate team work",
      "Reflect on the trade-offs between speed and complexity"
    ],
    explanation: "This exploration helps students understand that workflow control involves analyzing dependencies and choosing appropriate execution patterns.",
    relatedConcepts: ['agent-instruction-design', 'agent-evaluation-methodologies'],
    timeEstimate: 25,
    successCriteria: [
      "Identifies task dependencies accurately",
      "Understands parallel vs sequential trade-offs",
      "Recognizes the importance of failure handling"
    ]
  },
  {
    id: 'agentic-workflow-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-workflow-control',
    title: 'Multi-Tool Coordination Challenges',
    level: 'advanced',
    socratiQuestion: "If an agent has access to a calculator, a web search tool, and a document editor, and needs to create a financial report, how would you ensure these tools are used in the right order and with appropriate data sharing? What could go wrong?",
    followUpQuestions: [
      "How would you prevent the agent from using the wrong tool for a task?",
      "What if one tool's output needs to be processed before use by another tool?",
      "How would you handle situations where a tool fails or is unavailable?"
    ],
    expectedInsights: [
      "Tool coordination requires careful planning and error handling",
      "Data flow between tools must be managed explicitly",
      "Fallback strategies are essential for robust workflows"
    ],
    hints: [
      "Think about how humans coordinate multiple tools and resources",
      "Consider the importance of data validation between steps",
      "Reflect on what happens when any component in a chain fails"
    ],
    explanation: "Students discover that advanced workflow control involves sophisticated coordination between multiple tools with proper error handling and data flow management.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'prompt-optimization-patterns'],
    timeEstimate: 30,
    successCriteria: [
      "Understands multi-tool coordination complexity",
      "Recognizes the importance of data flow management",
      "Grasps the need for robust error handling strategies"
    ]
  }
];

// Socratic Questions for Agent Evaluation Methodologies
export const agentEvaluationMethodologiesSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-evaluation-socratic-1',
    type: 'socratic',
    conceptId: 'agent-evaluation-methodologies',
    title: 'Beyond Simple Accuracy Metrics',
    level: 'beginner',
    socratiQuestion: "If an agent gets 100% of answers correct but takes 10 minutes per response, costs $50 per query, and gives unhelpful responses that technically answer the question, is this a good agent? What other factors should we measure?",
    followUpQuestions: [
      "How would you measure the 'helpfulness' of an agent's response?",
      "What about consistency - should an agent give different answers to the same question?",
      "How would you evaluate an agent's reasoning process, not just its final answer?"
    ],
    expectedInsights: [
      "Evaluation requires multiple dimensions beyond just accuracy",
      "Performance includes efficiency, cost, and user satisfaction",
      "Process quality matters as much as outcome quality"
    ],
    hints: [
      "Think about how you'd evaluate a human assistant",
      "Consider the full user experience, not just correctness",
      "Reflect on the importance of explanations and reasoning"
    ],
    explanation: "This exploration reveals that comprehensive agent evaluation requires multidimensional assessment frameworks that consider the full spectrum of performance factors.",
    relatedConcepts: ['prompt-optimization-patterns', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Recognizes limitations of single-metric evaluation",
      "Understands the importance of multidimensional assessment",
      "Values process quality alongside outcome quality"
    ]
  },
  {
    id: 'agent-evaluation-socratic-2',
    type: 'socratic',
    conceptId: 'agent-evaluation-methodologies',
    title: 'The LLM-as-Judge Paradigm',
    level: 'advanced',
    socratiQuestion: "If you want to evaluate whether an agent's response is 'creative,' 'professional,' or 'age-appropriate,' how would you create an objective measurement system? What if you used another AI agent as the judge - what could go well or poorly?",
    followUpQuestions: [
      "How would you ensure the judge AI is unbiased and consistent?",
      "What if the judge AI has different values or perspectives than humans?",
      "How would you validate that the judge AI is making good evaluations?"
    ],
    expectedInsights: [
      "Subjective qualities require sophisticated evaluation approaches",
      "LLM judges can provide scalable evaluation but need careful design",
      "Judge validation is crucial to ensure evaluation quality"
    ],
    hints: [
      "Think about how human judges are trained and validated",
      "Consider the challenge of measuring subjective qualities objectively",
      "Reflect on the meta-problem: how do you evaluate the evaluator?"
    ],
    explanation: "Students discover that advanced evaluation methodologies leverage AI systems to assess complex, subjective qualities while addressing the inherent challenges of automated judgment.",
    relatedConcepts: ['agent-instruction-design', 'agentic-prompting-fundamentals'],
    timeEstimate: 28,
    successCriteria: [
      "Understands the challenge of evaluating subjective qualities",
      "Grasps the potential and limitations of LLM judges",
      "Recognizes the importance of judge validation mechanisms"
    ]
  }
];

// Socratic Questions for Swarm Intelligence
export const swarmIntelligenceSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'swarm-socratic-1',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'The Power of Simple Rules',
    level: 'beginner',
    socratiQuestion: "How can a colony of ants, where each ant has very simple instincts, collectively find the shortest path to a food source without any single ant knowing the whole map?",
    followUpQuestions: [
      "What if each ant leaves a small, invisible clue for the others?",
      "How would the strength of these clues change over time?",
      "What does this suggest about solving complex problems with simple, local actions?"
    ],
    expectedInsights: [
      "Complex global behavior can emerge from simple local rules.",
      "Indirect communication (stigmergy) can be very powerful.",
      "Decentralized systems can be highly effective at optimization."
    ],
    hints: [
      "Think about how a trail of breadcrumbs works.",
      "Consider the concept of positive feedback loops.",
      "Reflect on how large-scale patterns can form from small interactions."
    ],
    explanation: "This leads students to understand the core principle of Swarm Intelligence: complex, intelligent, and adaptive behavior can emerge from a population of simple agents following basic rules.",
    relatedConcepts: ['emergent-behavior', 'stigmergy', 'decentralization'],
    timeEstimate: 15,
    successCriteria: [
      "Articulates the concept of emergent behavior.",
      "Explains how simple rules can lead to complex outcomes.",
      "Understands the basics of indirect communication."
    ]
  },
  {
    id: 'swarm-socratic-2',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'Designing for Resilience',
    level: 'intermediate',
    socratiQuestion: "If you have a swarm of delivery drones and a few of them suddenly fail or are taken offline, how does the system continue to function effectively without a central manager re-assigning tasks?",
    followUpQuestions: [
      "What kind of information would the remaining drones need to adapt?",
      "How can the system be designed so that the loss of a few agents is not catastrophic?",
      "What are the trade-offs between a centrally controlled system and a decentralized one in this scenario?"
    ],
    expectedInsights: [
      "Decentralized systems are inherently more robust and fault-tolerant.",
      "Agents must be able to adapt based on local information and the actions of their neighbors.",
      "There is a trade-off between the predictability of central control and the resilience of decentralization."
    ],
    hints: [
      "Think about how a flock of birds reacts if one bird leaves.",
      "Consider the concept of redundancy in system design.",
      "Reflect on the single point of failure problem in centralized systems."
    ],
    explanation: "This helps students grasp one of the key engineering advantages of Swarm Intelligence: its inherent resilience and ability to adapt to unexpected changes or failures.",
    relatedConcepts: ['robustness', 'fault-tolerance', 'decentralized-control'],
    timeEstimate: 20,
    successCriteria: [
      "Explains the link between decentralization and robustness.",
      "Identifies adaptation mechanisms for agents.",
      "Compares the pros and cons of centralized vs. decentralized systems."
    ]
  },
  {
    id: 'swarm-socratic-3',
    type: 'socratic',
    conceptId: 'swarm-intelligence',
    title: 'The Challenge of Control',
    level: 'advanced',
    socratiQuestion: "The emergent behavior of a swarm is powerful but can also be unpredictable. If you are designing a swarm for a critical task, how would you balance letting the desired behavior 'emerge' with the need to guarantee safety and prevent undesirable outcomes?",
    followUpQuestions: [
      "How could you set 'boundaries' or 'rules of engagement' for the swarm without resorting to full central control?",
      "What kind of simulation and testing would be necessary before deploying such a system?",
      "How might you use a 'monitor' or 'guardian' agent to oversee the swarm without directly controlling it?"
    ],
    expectedInsights: [
      "Controlling emergent behavior is a key challenge in swarm engineering.",
      "Hybrid approaches, combining local rules with global constraints, are often necessary.",
      "Extensive simulation is critical for validating the behavior of swarm systems.",
      "Hierarchical or layered control systems can provide safety without sacrificing all the benefits of decentralization."
    ],
    hints: [
      "Think about how traffic laws guide the 'swarm' of cars on a highway.",
      "Consider the role of a referee in a sports game.",
      "Reflect on the concept of 'sandboxing' in software testing."
    ],
    explanation: "This advanced question pushes students to think about the practical engineering challenges of harnessing swarm intelligence, moving from pure theory to the complexities of real-world application and safety.",
    relatedConcepts: ['emergent-behavior-control', 'hybrid-control-systems', 'system-validation'],
    timeEstimate: 25,
    successCriteria: [
      "Articulates the tension between emergence and control.",
      "Proposes methods for constraining swarm behavior.",
      "Recognizes the critical role of simulation and validation."
    ]
  }
];

// Socratic Questions for Agent Deployment (GenAIOps)
export const agentDeploymentSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agent-deployment-socratic-1',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'From Development to Production Reality',
    level: 'beginner',
    socratiQuestion: "You've built an amazing AI agent that works perfectly on your laptop. When you deploy it to production, suddenly users are reporting inconsistent responses and strange behaviors. What could be different between your development environment and the real world?",
    followUpQuestions: [
      "Why might the same agent behave differently with different users?",
      "What happens when thousands of people use your agent simultaneously instead of just you?",
      "How could external factors like time of day or user location affect your agent?"
    ],
    expectedInsights: [
      "Production environments have unpredictable variability",
      "Scale introduces new challenges not present in development",
      "Agent behavior can be influenced by external context",
      "Traditional software deployment practices may not account for AI-specific issues"
    ],
    hints: [
      "Think about the difference between a conversation with one person vs. managing a party",
      "Consider how models might behave with diverse, real-world inputs",
      "Reflect on what makes AI systems different from traditional applications"
    ],
    explanation: "This exploration helps students discover why specialized operational practices (GenAIOps) are needed for AI systems beyond traditional DevOps approaches.",
    relatedConcepts: ['containerization', 'observability', 'genaiopsl'],
    timeEstimate: 15,
    successCriteria: [
      "Recognizes the unpredictability of production environments",
      "Understands that scale changes system behavior",
      "Sees the need for AI-specific operational practices"
    ]
  },
  {
    id: 'agent-deployment-socratic-2',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'The Three Pillars of GenAIOps',
    level: 'intermediate',
    socratiQuestion: "If you were organizing a large hospital, you'd need specialists: doctors for patients, pharmacists for medications, and administrators for operations. How might this specialization principle apply to managing different aspects of AI systems in production?",
    followUpQuestions: [
      "What are the different 'moving parts' of an AI system that need specialized attention?",
      "How would you organize operational responsibilities for agents, prompts, and data retrieval?",
      "What unique challenges does each component bring that might require specialized expertise?"
    ],
    expectedInsights: [
      "AI systems have distinct operational domains requiring specialized practices",
      "Agents, prompts, and RAG systems each have unique operational challenges",
      "Specialization enables deeper expertise and better outcomes",
      "Coordination between specialized domains is crucial"
    ],
    hints: [
      "Consider the different types of problems that arise with agent behavior vs. prompt management",
      "Think about what makes managing a knowledge base different from managing code",
      "Reflect on why you might need different tools and processes for different AI components"
    ],
    explanation: "Students discover the rationale behind GenAIOps' three specialized domains: AgentOps, PromptOps, and RAGOps, each addressing distinct operational challenges.",
    relatedConcepts: ['agentops', 'promptops', 'ragops'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies distinct operational domains in AI systems",
      "Understands the need for specialized practices",
      "Recognizes coordination challenges between domains"
    ]
  },
  {
    id: 'agent-deployment-socratic-3',
    type: 'socratic',
    conceptId: 'agent-deployment',
    title: 'The Feedback Loop Challenge',
    level: 'advanced',
    socratiQuestion: "Traditional software either works or crashes - it's usually obvious when something is wrong. But what if your AI agent gives plausible but subtly incorrect answers, or gradually degrades in quality over time? How would you detect and address these 'silent failures' that users might not even report?",
    followUpQuestions: [
      "How could you measure whether an agent's responses are getting better or worse over time?",
      "What would you need to track to detect when a RAG system starts retrieving less relevant information?",
      "How might you automatically detect when prompts are becoming less effective?"
    ],
    expectedInsights: [
      "AI systems can fail silently in ways traditional monitoring doesn't catch",
      "Quality degradation over time requires continuous evaluation systems",
      "Each AI component needs specialized monitoring and evaluation approaches",
      "Automated detection of subtle quality issues is crucial for production AI"
    ],
    hints: [
      "Think about how you'd notice if a helpful assistant was gradually becoming less helpful",
      "Consider what metrics capture 'helpfulness' vs. just 'functionality'",
      "Reflect on the challenge of measuring subjective quality at scale"
    ],
    explanation: "This exploration reveals why GenAIOps requires sophisticated evaluation and monitoring systems that go beyond traditional application monitoring to detect quality degradation and silent failures.",
    relatedConcepts: ['observability', 'evaluation-methodologies', 'continuous-monitoring'],
    timeEstimate: 25,
    successCriteria: [
      "Understands the concept of silent failures in AI systems",
      "Recognizes the need for quality-focused monitoring",
      "Grasps the complexity of measuring AI system performance"
    ]
  }
];

// Socratic Questions for Agentic AI Design Taxonomy
export const agenticAIDesignTaxonomySocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'agentic-ai-design-socratic-1',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Discovering Agentic vs Traditional AI',
    level: 'beginner',
    socratiQuestion: "Consider a chatbot that always asks for your order versus an AI assistant that remembers you like coffee and suggests your usual. What's the fundamental difference in how they approach helping you?",
    followUpQuestions: [
      "What does the assistant need to 'remember' you beyond just storing data?",
      "How does context change the way it interacts with you?",
      "What would happen if it could also learn your preferences from your behavior?"
    ],
    expectedInsights: [
      "Agentic AI systems demonstrate autonomy and goal-oriented behavior",
      "Context and memory enable more personalized interactions",
      "Learning and adaptation distinguish agents from reactive systems"
    ],
    hints: [
      "Think about the difference between following instructions and making decisions",
      "Consider how humans adapt their behavior based on context",
      "Reflect on what makes an interaction feel intelligent vs scripted"
    ],
    explanation: "This exploration reveals that agentic AI systems are characterized by autonomy, contextual understanding, and adaptive behavior rather than just sophisticated pattern matching.",
    relatedConcepts: ['ai-agents', 'autonomy', 'context-management'],
    timeEstimate: 12,
    successCriteria: [
      "Identifies autonomy as a key differentiator",
      "Recognizes the importance of contextual understanding",
      "Understands adaptive behavior in AI systems"
    ]
  },
  {
    id: 'agentic-ai-design-socratic-2',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Framework Selection Reasoning',
    level: 'intermediate',
    socratiQuestion: "You need to build an AI system where multiple specialists collaborate to solve complex problems. One framework excels at conversations, another at workflows, and a third at enterprise integration. How would you decide which to choose?",
    followUpQuestions: [
      "What if your specialists need to have extended back-and-forth discussions?",
      "What if you need complex decision trees with conditional branching?",
      "What if you need to integrate with existing enterprise systems and security policies?"
    ],
    expectedInsights: [
      "Framework choice depends on architectural requirements",
      "Conversational frameworks suit collaborative problem-solving",
      "Workflow frameworks excel at structured decision processes",
      "Enterprise frameworks prioritize integration and compliance"
    ],
    hints: [
      "Think about AutoGen's strength in multi-agent conversations",
      "Consider LangGraph's graph-based workflow capabilities", 
      "Reflect on Semantic Kernel's enterprise plugin architecture"
    ],
    explanation: "This exploration demonstrates how different frameworks serve different architectural patterns, and the choice should align with your specific use case requirements.",
    relatedConcepts: ['framework-selection', 'multi-agent-systems', 'enterprise-integration'],
    timeEstimate: 15,
    successCriteria: [
      "Maps framework strengths to use cases",
      "Understands architectural implications of choices",
      "Recognizes trade-offs between different approaches"
    ]
  },
  {
    id: 'agentic-ai-design-socratic-3',
    type: 'socratic',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Scaling and Interoperability Challenges',
    level: 'advanced',
    socratiQuestion: "Imagine you have 1000 AI agents running across different frameworks and they need to discover and collaborate with each other dynamically. What fundamental problems would you encounter?",
    followUpQuestions: [
      "How would an agent from Framework A communicate with an agent from Framework B?",
      "How would agents find other agents with the capabilities they need?",
      "What happens when the system grows to 10,000 or 100,000 agents?"
    ],
    expectedInsights: [
      "Interoperability requires standardized communication protocols",
      "Discovery mechanisms are essential for dynamic collaboration",
      "Scalability demands hierarchical organization and load balancing",
      "Performance and resource management become critical at scale"
    ],
    hints: [
      "Consider the role of protocols like MCP and A2A",
      "Think about service discovery patterns in distributed systems",
      "Reflect on how the internet scales through hierarchical organization"
    ],
    explanation: "This exploration reveals the critical challenges of building large-scale agentic systems and why standardization, discovery protocols, and scalable architectures are essential for the future of AI.",
    relatedConcepts: ['scalability', 'interoperability', 'distributed-systems', 'communication-protocols'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies interoperability as a fundamental challenge",
      "Understands the need for discovery mechanisms",
      "Recognizes scalability implications and solutions"
    ]
  }
];

// Socratic Questions for Sensory Reasoning Enhancement
export const sensoryReasoningEnhancementSocraticQuestions: StudyModeQuestion[] = [
  {
    id: 'sensory-reasoning-socratic-1',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Discovering Multi-Sensory Intelligence',
    level: 'beginner',
    socratiQuestion: "When a doctor examines a patient, they look at visual symptoms, listen to breathing sounds, ask about pain levels, and review test results. Why is this multi-sensory approach more effective than relying on just one type of information?",
    followUpQuestions: [
      "What could the doctor miss if they only looked at one type of evidence?",
      "How do different types of sensory information complement each other?",
      "What happens when different sources of information contradict each other?"
    ],
    expectedInsights: [
      "Multiple information sources reduce the risk of missing important details",
      "Different modalities provide unique perspectives on the same situation",
      "Cross-validation between sources improves decision accuracy",
      "Contradictory information reveals complexity that needs investigation"
    ],
    hints: [
      "Think about how your senses work together to understand your environment",
      "Consider what happens when you lose one sense - how do the others compensate?",
      "Reflect on how experienced professionals use multiple information sources"
    ],
    explanation: "This exploration helps students understand why multi-modal AI systems that process visual, auditory, and textual information simultaneously can make more accurate and comprehensive decisions than single-modality systems.",
    relatedConcepts: ['multi-modal-processing', 'evidence-integration', 'decision-making'],
    timeEstimate: 15,
    successCriteria: [
      "Understands the value of multiple information sources",
      "Recognizes how different modalities complement each other",
      "Sees the importance of cross-validation between sources"
    ]
  },
  {
    id: 'sensory-reasoning-socratic-2',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Attention and Focus in Multi-Modal Systems',
    level: 'intermediate',
    socratiQuestion: "Imagine you're at a busy restaurant trying to have a conversation. Your brain automatically focuses on your friend's voice while filtering out background noise and movement. How does this selective attention help you understand the conversation better?",
    followUpQuestions: [
      "What would happen if you couldn't filter out irrelevant information?",
      "How does your brain decide what to pay attention to?",
      "What if multiple important things were happening at the same time?"
    ],
    expectedInsights: [
      "Attention mechanisms help focus on relevant information",
      "Filtering irrelevant information prevents cognitive overload",
      "Context and goals influence what gets attention",
      "Dynamic attention allocation improves processing efficiency"
    ],
    hints: [
      "Think about how you naturally focus during conversations",
      "Consider what happens when you're distracted or overwhelmed",
      "Reflect on how experts quickly identify what's important in their field"
    ],
    explanation: "Students discover that attention mechanisms in AI systems serve a similar function to human selective attention, helping focus computational resources on the most relevant features across different sensory modalities.",
    relatedConcepts: ['attention-mechanisms', 'feature-selection', 'cognitive-processing'],
    timeEstimate: 18,
    successCriteria: [
      "Understands the role of attention in processing multiple inputs",
      "Recognizes the need for relevance filtering",
      "Grasps the concept of dynamic attention allocation"
    ]
  },
  {
    id: 'sensory-reasoning-socratic-3',
    type: 'socratic',
    conceptId: 'sensory-reasoning-enhancement',
    title: 'Handling Conflicting Evidence',
    level: 'advanced',
    socratiQuestion: "A security system gets conflicting signals: the camera shows someone entering, the motion sensor doesn't detect movement, and the access card shows a valid entry. How would you design a system to handle these contradictory pieces of evidence and make a reliable decision?",
    followUpQuestions: [
      "Which piece of evidence should carry more weight and why?",
      "How would you account for the possibility that one sensor is malfunctioning?",
      "What additional information would help resolve the contradiction?"
    ],
    expectedInsights: [
      "Evidence reliability varies and must be weighted appropriately",
      "Sensor failures and environmental factors can create false readings",
      "Confidence levels help quantify uncertainty in decisions",
      "Additional context can resolve apparent contradictions"
    ],
    hints: [
      "Think about how judges weigh different types of evidence in court",
      "Consider how weather might affect different types of sensors",
      "Reflect on how you resolve conflicting information in daily life"
    ],
    explanation: "This exploration reveals the complexity of evidence integration in multi-modal systems and the need for sophisticated reasoning about uncertainty, reliability, and confidence in decision-making.",
    relatedConcepts: ['evidence-integration', 'uncertainty-handling', 'confidence-scoring'],
    timeEstimate: 22,
    successCriteria: [
      "Understands the challenge of conflicting evidence",
      "Recognizes the importance of reliability weighting",
      "Grasps the role of uncertainty quantification in robust systems"
    ]
  }
];

// Export all socratic questions organized by concept
export const socraticQuestionLibrary = {
  'a2a-communication': a2aSocraticQuestions,
  'mcp': mcpSocraticQuestions,
  'multi-agent-systems': multiAgentSocraticQuestions,
  'agentic-rag': agenticRAGSocraticQuestions,
  'modern-tool-use': modernToolUseSocraticQuestions,
  'computer-use': computerUseSocraticQuestions,
  'voice-agent': voiceAgentSocraticQuestions,
  'deep-agents': deepAgentsSocraticQuestions,
  // New Core Concepts
  'agentic-prompting-fundamentals': agenticPromptingFundamentalsSocraticQuestions,
  'prompt-optimization-patterns': promptOptimizationPatternsSocraticQuestions,
  'agent-instruction-design': agentInstructionDesignSocraticQuestions,
  'agentic-workflow-control': agenticWorkflowControlSocraticQuestions,
  'agent-evaluation-methodologies': agentEvaluationMethodologiesSocraticQuestions,
  'agent-deployment': agentDeploymentSocraticQuestions,
  'swarm-intelligence': swarmIntelligenceSocraticQuestions,
  'agentic-ai-design-taxonomy': agenticAIDesignTaxonomySocraticQuestions,
  'sensory-reasoning-enhancement': sensoryReasoningEnhancementSocraticQuestions
};

// Helper function to get socratic questions by concept and level
export function getSocraticQuestions(
  conceptId: string, 
  level?: StudyModeLevel
): StudyModeQuestion[] {
  const questions = socraticQuestionLibrary[conceptId] || [];
  
  if (level) {
    return questions.filter(q => q.level === level);
  }
  
  return questions;
}

// Helper function to get next question in sequence
export function getNextSocraticQuestion(
  conceptId: string, 
  currentQuestionId: string
): StudyModeQuestion | null {
  const questions = socraticQuestionLibrary[conceptId] || [];
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  
  if (currentIndex >= 0 && currentIndex < questions.length - 1) {
    return questions[currentIndex + 1];
  }
  
  return null;
}
