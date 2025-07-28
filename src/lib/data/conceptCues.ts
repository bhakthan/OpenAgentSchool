// Context cues for critical thinking challenges in core concepts
// These cues help users frame their thinking around key insights

export interface ConceptCue {
  id: string;
  cue: string;
  criticalThinkingQuestion: string;
}

export const conceptCues: Record<string, ConceptCue> = {
  // Tier 1: Foundational Concepts
  'agent-architecture': {
    id: 'agent-architecture',
    cue: "Architecture shapes behavior - good design creates intelligent systems that think, act, and evolve",
    criticalThinkingQuestion: "How would you design an agent architecture that balances autonomy with control, ensuring reliable goal achievement while maintaining flexibility for complex, dynamic environments?"
  },
  'agent-security': {
    id: 'agent-security',
    cue: "Trust is earned through design - security isn't added, it's built into every layer",
    criticalThinkingQuestion: "In a multi-agent system handling sensitive data, how would you implement a security framework that maintains both agent autonomy and enterprise-grade protection without hindering performance?"
  },
  'multi-agent-systems': {
    id: 'multi-agent-systems',
    cue: "Many minds, one goal - coordination creates emergent intelligence beyond individual capability",
    criticalThinkingQuestion: "How would you design a multi-agent system where agents can dynamically form teams, negotiate responsibilities, and resolve conflicts while maintaining system-wide coherence and goal alignment?"
  },
  'agent-ethics': {
    id: 'agent-ethics',
    cue: "With great intelligence comes great responsibility - ethical AI is sustainable AI",
    criticalThinkingQuestion: "How would you create an ethical framework for AI agents that can adapt to different cultural contexts while maintaining core principles of fairness, transparency, and accountability?"
  },
  'ai-agents': {
    id: 'ai-agents',
    cue: "Autonomy with purpose - true intelligence combines perception, reasoning, and purposeful action",
    criticalThinkingQuestion: "What distinguishes a truly intelligent agent from a sophisticated chatbot, and how would you design an agent that demonstrates genuine understanding rather than pattern matching?"
  },
  'ai-safety-governance': {
    id: 'ai-safety-governance',
    cue: "Safety by design, governance by principle - responsible AI protects both users and society",
    criticalThinkingQuestion: "How would you implement a comprehensive AI safety and governance framework that scales from individual agents to enterprise-wide AI ecosystems while maintaining innovation velocity?"
  },

  // Tier 2: Architecture Concepts  
  'a2a-communication': {
    id: 'a2a-communication',
    cue: "Agents collaborating as humans do - through clear, purposeful dialogue and shared understanding",
    criticalThinkingQuestion: "How would you design an agent communication protocol that enables nuanced collaboration while preventing misunderstandings, conflicts, and communication breakdowns in high-stakes scenarios?"
  },
  'mcp': {
    id: 'mcp',
    cue: "Standardized communication unlocks infinite tool possibilities - consistency enables creativity",
    criticalThinkingQuestion: "How would you extend the Model Context Protocol to handle real-time, multi-modal tool interactions while maintaining security, reliability, and backward compatibility?"
  },
  'flow-visualization': {
    id: 'flow-visualization',
    cue: "Seeing is understanding - visualized flows reveal hidden patterns and optimization opportunities",
    criticalThinkingQuestion: "How would you design an interactive visualization system that helps users understand complex agent workflows while providing actionable insights for optimization and debugging?"
  },

  // Tier 3: Implementation Concepts
  'acp': {
    id: 'acp',
    cue: "Universal language for agent cooperation - protocols enable scalable, interoperable intelligence",
    criticalThinkingQuestion: "How would you design an Agent Communication Protocol that works seamlessly across different AI frameworks, cloud providers, and organizational boundaries while maintaining performance and security?"
  },
  'mcp-a2a-integration': {
    id: 'mcp-a2a-integration',
    cue: "Integration amplifies capability - when protocols unite, possibilities multiply exponentially",
    criticalThinkingQuestion: "How would you architect a system that seamlessly combines MCP tool integration with A2A communication to create a unified agent ecosystem that's both powerful and maintainable?"
  },
  'data-visualization': {
    id: 'data-visualization',
    cue: "Data tells stories - visualization transforms metrics into insights and insights into action",
    criticalThinkingQuestion: "How would you create a data visualization platform for AI agents that not only shows what happened but predicts what will happen and recommends what should happen next?"
  },

  // Tier 4: Advanced Concepts
  'agent-deployment': {
    id: 'agent-deployment',
    cue: "From prototype to production - deployment excellence ensures agents serve reliably at scale",
    criticalThinkingQuestion: "How would you design a deployment pipeline for AI agents that handles everything from development to retirement while ensuring zero-downtime updates, scalability, and compliance in regulated industries?"
  },
  'agent-learning': {
    id: 'agent-learning',
    cue: "Learning never stops - adaptive agents grow smarter through experience and reflection",
    criticalThinkingQuestion: "How would you design a learning system for AI agents that balances stability with adaptability, ensuring agents improve over time without catastrophic forgetting or harmful drift?"
  },
  'agent-integration': {
    id: 'agent-integration',
    cue: "Integration bridges worlds - legacy systems and modern agents working in harmony",
    criticalThinkingQuestion: "How would you integrate AI agents into a complex enterprise environment with decades of legacy systems while ensuring data consistency, security, and minimal disruption to existing workflows?"
  },
  'agent-evaluation': {
    id: 'agent-evaluation',
    cue: "Measurement drives improvement - you can't optimize what you can't quantify effectively",
    criticalThinkingQuestion: "How would you design a comprehensive evaluation framework for AI agents that measures not just performance metrics but also ethical behavior, user satisfaction, and long-term value creation?"
  }
};

// Helper function to get concept cue
export function getConceptCue(conceptId: string): ConceptCue | undefined {
  return conceptCues[conceptId];
}

// Helper function to get all concept cues
export function getAllConceptCues(): ConceptCue[] {
  return Object.values(conceptCues);
}
