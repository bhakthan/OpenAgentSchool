// Context cues for critical thinking challenges in agent patterns
// These cues help users frame their thinking around key pattern insights

export interface PatternCue {
  id: string;
  cue: string;
  criticalThinkingQuestion: string;
}

export const patternCues: Record<string, PatternCue> = {
  'react': {
    id: 'react',
    cue: "Think, Act, Observe, Reflect - the cycle of intelligent reasoning mirrors human problem-solving",
    criticalThinkingQuestion: "How would you design a ReAct agent that can handle ambiguous situations where initial reasoning might be incorrect, and how would you ensure it learns from failed reasoning attempts?"
  },
  'parallelization': {
    id: 'parallelization',
    cue: "Many streams, one river - parallel processing amplifies intelligence while maintaining coherence",
    criticalThinkingQuestion: "How would you design a parallelization strategy for AI agents that maximizes efficiency while preventing conflicts, race conditions, and inconsistent outputs across parallel streams?"
  },
  'prompt-chaining': {
    id: 'prompt-chaining',
    cue: "Each link strengthens the chain - connected prompts create powerful reasoning sequences",
    criticalThinkingQuestion: "How would you design a prompt chaining system that maintains context fidelity across complex, multi-step reasoning while gracefully handling failures in any individual chain link?"
  },
  'self-reflection': {
    id: 'self-reflection',
    cue: "The mirror of improvement - agents that critique themselves become agents that excel",
    criticalThinkingQuestion: "How would you implement a self-reflection mechanism that enables agents to genuinely improve their performance without falling into recursive loops or over-criticism paralysis?"
  },
  'modern-tool-use': {
    id: 'modern-tool-use',
    cue: "Tools extend capability - intelligent selection and orchestration multiply agent potential",
    criticalThinkingQuestion: "How would you design a tool selection and orchestration system that enables agents to discover, learn, and combine tools dynamically while maintaining security and reliability?"
  },
  'agentic-rag': {
    id: 'agentic-rag',
    cue: "Knowledge meets intelligence - retrieval guided by reasoning creates informed decisions",
    criticalThinkingQuestion: "How would you create an agentic RAG system that not only retrieves relevant information but also evaluates source credibility, handles conflicting information, and synthesizes insights from multiple domains?"
  },
  'codeact': {
    id: 'codeact',
    cue: "Code is action - when agents write and execute code, they bridge thought and reality",
    criticalThinkingQuestion: "How would you design a CodeAct system that enables agents to write, test, and iterate on code safely while learning from execution results and building increasingly sophisticated programs?"
  },
  'orchestrator-worker': {
    id: 'orchestrator-worker',
    cue: "Division multiplies success - coordination unleashes specialized agent capabilities",
    criticalThinkingQuestion: "How would you design an orchestrator-worker system that can dynamically assign tasks based on agent capabilities, handle worker failures gracefully, and scale efficiently under varying workloads?"
  },
  'routing': {
    id: 'routing',
    cue: "Right agent, right task - intelligent routing optimizes the entire system's performance",
    criticalThinkingQuestion: "How would you create an intelligent routing system that learns from past assignments, adapts to changing agent capabilities, and optimizes for both task success and system-wide efficiency?"
  },
  'multi-agent-collaboration': {
    id: 'multi-agent-collaboration',
    cue: "Collaboration creates emergence - together, agents achieve what none could alone",
    criticalThinkingQuestion: "How would you design a multi-agent collaboration framework that enables creative problem-solving while preventing groupthink, managing conflicts, and ensuring collective intelligence emerges?"
  }
};

// Helper function to get pattern cue
export function getPatternCue(patternId: string): PatternCue | undefined {
  return patternCues[patternId];
}

// Helper function to get all pattern cues
export function getAllPatternCues(): PatternCue[] {
  return Object.values(patternCues);
}
