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

// Export all socratic questions organized by concept
export const socraticQuestionLibrary = {
  'a2a-communication': a2aSocraticQuestions,
  'mcp': mcpSocraticQuestions,
  'multi-agent-systems': multiAgentSocraticQuestions,
  'agentic-rag': agenticRAGSocraticQuestions,
  'modern-tool-use': modernToolUseSocraticQuestions,
  'computer-use': computerUseSocraticQuestions,
  'voice-agent': voiceAgentSocraticQuestions,
  'deep-agents': deepAgentsSocraticQuestions
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
