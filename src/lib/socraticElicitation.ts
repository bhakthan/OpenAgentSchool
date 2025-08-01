export interface UserContext {
  experience: 'beginner' | 'intermediate' | 'advanced';
  background: string;
  motivation: string;
  priorKnowledge: string;
  confidenceLevel: number;
  learningStyle: 'visual' | 'verbal' | 'hands-on' | 'analytical';
  goals: string;
  timeAvailable: number;
}

export interface DynamicFollowUp {
  question: string;
  condition: (response: string, context: UserContext) => boolean;
  priority: number;
  type: 'clarification' | 'deepening' | 'connection' | 'challenge' | 'real-world';
}

export interface ElicitationResponse {
  original: string;
  clarifications: string[];
  connections: string[];
  realWorldExamples: string[];
  misconceptions: string[];
  confidenceLevel: number;
}

// Dynamic follow-up question generators based on user responses
export const generateDynamicFollowUps = (
  originalResponse: string, 
  context: UserContext,
  conceptId: string
): DynamicFollowUp[] => {
  const followUps: DynamicFollowUp[] = [];
  const response = originalResponse.toLowerCase();

  // Generic clarification probes
  if (originalResponse.length < 50) {
    followUps.push({
      question: "That's interesting! Can you elaborate on what you mean? What specific aspects are you thinking about?",
      condition: () => true,
      priority: 8,
      type: 'clarification'
    });
  }

  // Experience-based probes
  if (context.experience === 'beginner' && response.includes('like') || response.includes('similar')) {
    followUps.push({
      question: "You mentioned it's 'like' something else. What specific parallels are you drawing? How are they similar and different?",
      condition: () => true,
      priority: 7,
      type: 'clarification'
    });
  }

  // Prior knowledge connections
  if (context.priorKnowledge && (response.includes('reminds') || response.includes('similar to'))) {
    followUps.push({
      question: `Given your background in ${context.background}, how does this connect to what you already know? What patterns do you recognize?`,
      condition: () => true,
      priority: 9,
      type: 'connection'
    });
  }

  // Confidence-based questioning
  if (context.confidenceLevel <= 2) {
    followUps.push({
      question: "I can sense you're still building confidence with this. What part feels most uncertain to you? Let's explore that together.",
      condition: () => true,
      priority: 6,
      type: 'clarification'
    });
  } else if (context.confidenceLevel >= 4) {
    followUps.push({
      question: "You seem confident about this! What would happen if we pushed this idea further? Can you think of any edge cases or limitations?",
      condition: () => true,
      priority: 5,
      type: 'challenge'
    });
  }

  // Real-world application probes
  if (context.motivation && context.motivation.includes('work') || context.motivation.includes('project')) {
    followUps.push({
      question: "How might you apply this concept in your work context? Can you think of a specific scenario where this would be useful?",
      condition: () => true,
      priority: 8,
      type: 'real-world'
    });
  }

  // Concept-specific elicitations
  const conceptSpecificFollowUps = getConceptSpecificFollowUps(response, context, conceptId);
  followUps.push(...conceptSpecificFollowUps);

  // Sort by priority and return top 3
  return followUps
    .filter(f => f.condition(originalResponse, context))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
};

function getConceptSpecificFollowUps(
  response: string, 
  context: UserContext, 
  conceptId: string
): DynamicFollowUp[] {
  const followUps: DynamicFollowUp[] = [];

  switch (conceptId) {
    case 'a2a-communication':
      if (response.includes('talk') || response.includes('communicat')) {
        followUps.push({
          question: "You mentioned communication - but what happens when the 'conversation' breaks down? How would you detect that?",
          condition: () => true,
          priority: 7,
          type: 'deepening'
        });
      }
      if (response.includes('protocol') || response.includes('standard')) {
        followUps.push({
          question: "Protocols are crucial! But who decides what the protocol should be? How do you handle different 'dialects'?",
          condition: () => true,
          priority: 8,
          type: 'challenge'
        });
      }
      break;

    case 'multi-agent-systems':
      if (response.includes('team') || response.includes('together')) {
        followUps.push({
          question: "Team dynamics are key! What happens when team members have conflicting goals or different priorities?",
          condition: () => true,
          priority: 8,
          type: 'challenge'
        });
      }
      if (response.includes('specialist') || response.includes('expert')) {
        followUps.push({
          question: "Specialization makes sense! But how do you prevent specialists from becoming isolated silos? How do they share knowledge?",
          condition: () => true,
          priority: 7,
          type: 'deepening'
        });
      }
      break;

    case 'mcp':
      if (response.includes('memory') || response.includes('remember')) {
        followUps.push({
          question: "Memory is crucial! But what if memories become contradictory or outdated? How do you manage 'forgetting'?",
          condition: () => true,
          priority: 8,
          type: 'challenge'
        });
      }
      break;

    case 'agentic-rag':
      if (response.includes('search') || response.includes('find')) {
        followUps.push({
          question: "Good thinking about search! But what makes a search 'intelligent' vs just fast? How do you know when to stop searching?",
          condition: () => true,
          priority: 8,
          type: 'deepening'
        });
      }
      break;

    case 'modern-tool-use':
      if (response.includes('tool') || response.includes('use')) {
        followUps.push({
          question: "Tools are essential! But what happens when your favorite tool isn't available? How do you adapt?",
          condition: () => true,
          priority: 7,
          type: 'challenge'
        });
      }
      break;

    case 'computer-use':
      if (response.includes('see') || response.includes('visual')) {
        followUps.push({
          question: "Visual processing is key! But humans use more than just vision when using computers. What other senses help us? How does that affect AI?",
          condition: () => true,
          priority: 8,
          type: 'deepening'
        });
      }
      break;

    case 'voice-agent':
      if (response.includes('voice') || response.includes('speak')) {
        followUps.push({
          question: "Voice interaction is rich! But what makes a conversation feel natural vs robotic? What are the subtle cues we use?",
          condition: () => true,
          priority: 8,
          type: 'deepening'
        });
      }
      break;
  }

  return followUps;
}

// Enhanced insight extraction with dynamic triggers
export const extractEnhancedInsights = (
  response: string,
  context: UserContext,
  conceptId: string,
  questionIndex: number
): string[] => {
  const insights: string[] = [];
  const lowercaseResponse = response.toLowerCase();

  // Generic insight patterns
  if (lowercaseResponse.includes('i see') || lowercaseResponse.includes('i understand') || lowercaseResponse.includes('that makes sense')) {
    insights.push(`Understanding is emerging: Building confidence through guided discovery`);
  }

  if (lowercaseResponse.includes('like') && lowercaseResponse.includes('but')) {
    insights.push(`Analytical comparison: Making distinctions and recognizing nuances`);
  }

  if (lowercaseResponse.includes('what if') || lowercaseResponse.includes('suppose')) {
    insights.push(`Hypothetical thinking: Exploring possibilities and edge cases`);
  }

  // Context-aware insights
  if (context.experience === 'beginner' && response.length > 100) {
    insights.push(`Engaged learning: Demonstrating deep thinking despite being new to the topic`);
  }

  if (context.confidenceLevel >= 4 && lowercaseResponse.includes('but') || lowercaseResponse.includes('however')) {
    insights.push(`Critical thinking: Confident enough to identify limitations and counterpoints`);
  }

  // Concept-specific insights
  const conceptInsights = getConceptSpecificInsights(response, conceptId, questionIndex);
  insights.push(...conceptInsights);

  return insights;
};

function getConceptSpecificInsights(response: string, conceptId: string, questionIndex: number): string[] {
  const insights: string[] = [];
  const lowercaseResponse = response.toLowerCase();

  // Add concept-specific insight extraction logic here
  // This would be similar to the existing insight extraction but more sophisticated

  return insights;
}

// Misconception detection and gentle correction
export const detectMisconceptions = (
  response: string,
  conceptId: string
): Array<{misconception: string, gentleCorrection: string}> => {
  const misconceptions: Array<{misconception: string, gentleCorrection: string}> = [];
  const lowercaseResponse = response.toLowerCase();

  // Common misconceptions by concept
  const commonMisconceptions: Record<string, Array<{pattern: string, correction: string}>> = {
    'a2a-communication': [
      {
        pattern: 'agents.*same language',
        correction: "That's a natural thought! While agents do need to 'speak the same language,' it's more like having a translation layer than requiring identical systems."
      }
    ],
    'multi-agent-systems': [
      {
        pattern: 'faster.*more agents',
        correction: "Great intuition about scaling! While more agents can help, coordination overhead can actually slow things down if not designed well."
      }
    ]
  };

  // Check for misconceptions
  if (commonMisconceptions[conceptId]) {
    for (const {pattern, correction} of commonMisconceptions[conceptId]) {
      if (new RegExp(pattern, 'i').test(response)) {
        misconceptions.push({
          misconception: pattern,
          gentleCorrection: correction
        });
      }
    }
  }

  return misconceptions;
};

export default {
  generateDynamicFollowUps,
  extractEnhancedInsights,
  detectMisconceptions
};
