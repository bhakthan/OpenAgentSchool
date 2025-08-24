import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSpeechSynthesisOptions {
  volume?: number;
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice | null;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string, options?: UseSpeechSynthesisOptions) => Promise<void>;
  cancel: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load available voices
  useEffect(() => {
    if (!supported) return;

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    
    // Some browsers load voices asynchronously
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback(async (text: string, options: UseSpeechSynthesisOptions = {}): Promise<void> => {
    if (!supported) {
      throw new Error('Speech synthesis is not supported in this browser');
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set options with defaults
      utterance.volume = options.volume ?? 0.8;
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      
      if (options.voice) {
        utterance.voice = options.voice;
      }

      utterance.onstart = () => {
        setSpeaking(true);
      };

      utterance.onend = () => {
        setSpeaking(false);
        utteranceRef.current = null;
        resolve();
      };

      utterance.onerror = (event) => {
        setSpeaking(false);
        utteranceRef.current = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      utterance.onpause = () => {
        setSpeaking(false);
      };

      utterance.onresume = () => {
        setSpeaking(true);
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    });
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    
    speechSynthesis.cancel();
    setSpeaking(false);
    utteranceRef.current = null;
  }, [supported]);

  const pause = useCallback(() => {
    if (!supported || !speaking) return;
    
    speechSynthesis.pause();
    setSpeaking(false);
  }, [supported, speaking]);

  const resume = useCallback(() => {
    if (!supported || speaking) return;
    
    speechSynthesis.resume();
    setSpeaking(true);
  }, [supported, speaking]);

  return {
    speak,
    cancel,
    pause,
    resume,
    speaking,
    supported,
    voices,
  };
}

// Utility hook for local TTS (placeholder for future implementation)
export function useLocalTTS() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const speak = useCallback(async (text: string, options?: { voice?: string; speed?: number }) => {
    // Placeholder for local TTS implementation
    // This could integrate with services like:
    // - Coqui TTS
    // - Mozilla TTS
    // - Local TTS models via WebAssembly
    // - Desktop TTS APIs via Tauri/Electron
    
    throw new Error('Local TTS not yet implemented');
  }, []);

  const cancel = useCallback(() => {
    // Cancel local TTS
  }, []);

  return {
    speak,
    cancel,
    isAvailable,
    isLoading,
  };
}

// Audio content parsing utilities
export function parseAudioContent(content: string) {
  const sections = content.split('--------------------------------------------------------------------------------');
  
  return {
    title: sections[0]?.trim() || '',
    beginner: sections[2]?.trim() || 'Beginner explanation not available.',
    intermediate: sections[4]?.trim() || 'Intermediate explanation not available.',
    advanced: sections[6]?.trim() || 'Advanced explanation not available.',
  };
}

export function getComponentAudioFile(componentName: string): string {
  // Map component names to audio file names
  const audioFileMap: Record<string, string> = {
    // Core Concepts (both component names and conceptIds)
    'AIAgentsConcept': 'AIAgentsConcept_explanation',
    'ai-agents': 'AIAgentsConcept_explanation',
    'AgentArchitectureConcept': 'AgentArchitectureConcept_explanation',
    'agent-architecture': 'AgentArchitectureConcept_explanation',
    'MCPConcept': 'MCPConcept_explanation',
    'mcp-concept': 'MCPConcept_explanation',
    'mcp': 'MCPConcept_explanation',
    
    // Visualizations and Demos
    'MCPToolCallingAnimation': 'MCPToolCallingAnimation_explanation',
    'mcp-tool-calling': 'MCPToolCallingAnimation_explanation',
    'AgentLifecycleVisual': 'AgentLifecycleVisual_explanation',
    'agent-lifecycle': 'AgentLifecycleVisual_explanation',
    'AgentPersonalityShowcase': 'AgentPersonalityShowcase_explanation',
    'agent-personality': 'AgentPersonalityShowcase_explanation',
    'MCPArchitectureDiagram': 'MCPArchitectureDiagram_explanation',
    'mcp-architecture': 'MCPArchitectureDiagram_explanation',
    'MCPVisualDemo': 'MCPVisualDemo_explanation',
    'mcp-demo': 'MCPVisualDemo_explanation',
    'MCPToolCallingCode': 'MCPToolCallingCode_explanation',
    'mcp-code': 'MCPToolCallingCode_explanation',
    
    // Multi-Agent Systems
    'A2AMultiAgentSystem': 'A2AMultiAgentSystem_explanation',
    'a2a-communication': 'A2AMultiAgentSystem_explanation',
    'multi-agent-systems': 'A2AMultiAgentSystem_explanation',
    'ChatbotToAgentTransition': 'ChatbotToAgentTransition_explanation',
    'chatbot-transition': 'ChatbotToAgentTransition_explanation',
    
    // Agent Patterns
    'ReActPattern': 'ReActPattern_explanation',
    'react-pattern': 'ReActPattern_explanation',
    'PlanActPattern': 'PlanActPattern_explanation',
    'plan-act-pattern': 'PlanActPattern_explanation',
    'CodeActPattern': 'CodeActPattern_explanation',
    'code-act-pattern': 'CodeActPattern_explanation',
    'AgenticRAGPattern': 'AgenticRAGPattern_explanation',
    'agentic-rag': 'AgenticRAGPattern_explanation',
    
    // Skills and Development
    'DevelopmentVelocitySkills': 'DevelopmentVelocitySkills_explanation',
    'development-velocity': 'DevelopmentVelocitySkills_explanation',
    'CrossTeamCollaborationSkills': 'CrossTeamCollaborationSkills_explanation',
    'collaboration-skills': 'CrossTeamCollaborationSkills_explanation',
    'CodeUnderstandingSkills': 'CodeUnderstandingSkills_explanation',
    'code-understanding': 'CodeUnderstandingSkills_explanation',
    'PromptEngineeringSkills': 'PromptEngineeringSkills_explanation',
    'prompt-engineering': 'PromptEngineeringSkills_explanation',
    'AISystemsThinking': 'AISystemsThinking_explanation',
    'systems-thinking': 'AISystemsThinking_explanation',
    'FutureProofingSkills': 'FutureProofingSkills_explanation',
    'future-proofing': 'FutureProofingSkills_explanation',
    'ResearchAnalysisSkills': 'ResearchAnalysisSkills_explanation',
    'research-analysis': 'ResearchAnalysisSkills_explanation',
    
    // Organizational and Assessment
    'NovelOrganizationalPatterns': 'NovelOrganizationalPatterns_explanation',
    'organizational-patterns': 'NovelOrganizationalPatterns_explanation',
    'FrontierFirmAssessment': 'FrontierFirmAssessment_explanation',
    'frontier-assessment': 'FrontierFirmAssessment_explanation',
    'HumanAgentRatioCalculator': 'HumanAgentRatioCalculator_explanation',
    'human-agent-ratio': 'HumanAgentRatioCalculator_explanation',
    'LearningAssessment': 'LearningAssessment_explanation',
    'learning-assessment': 'LearningAssessment_explanation',
    
    // Architecture and Enterprise
    'EnterpriseArchitecturePatterns': 'EnterpriseArchitecturePatterns_explanation',
    'enterprise-architecture': 'EnterpriseArchitecturePatterns_explanation',
    'AgentTesting': 'AgentTesting_explanation',
    'agent-testing': 'AgentTesting_explanation',
    'WorkspaceOverview': 'WorkspaceOverview_explanation',
    'workspace-overview': 'WorkspaceOverview_explanation',
    'StudyMode': 'StudyMode_explanation',
    'study-mode': 'StudyMode_explanation',
    
    // Educational Agent Patterns
    'socratic-coach': 'SocraticCoach_explanation',
    'SocraticCoach': 'SocraticCoach_explanation',
    'concept-to-project-builder': 'ConceptToProjectBuilder_explanation',
    'ConceptToProjectBuilder': 'ConceptToProjectBuilder_explanation',
    'error-whisperer': 'ErrorWhisperer_explanation',
    'ErrorWhisperer': 'ErrorWhisperer_explanation',
    'knowledge-map-navigator': 'KnowledgeMapNavigator_explanation',
    'KnowledgeMapNavigator': 'KnowledgeMapNavigator_explanation',
    'context-curator': 'ContextCurator_explanation',
    'ContextCurator': 'ContextCurator_explanation',
    'rubric-rater': 'RubricRater_explanation',
    'RubricRater': 'RubricRater_explanation',
    'self-remediation-loop': 'SelfRemediationLoop_explanation',
    'SelfRemediationLoop': 'SelfRemediationLoop_explanation',
    'spaced-repetition-planner': 'SpacedRepetitionPlanner_explanation',
    'SpacedRepetitionPlanner': 'SpacedRepetitionPlanner_explanation',
    'challenge-ladder-generator': 'ChallengeLadderGenerator_explanation',
    'ChallengeLadderGenerator': 'ChallengeLadderGenerator_explanation',
    'peer-review-simulator': 'PeerReviewSimulator_explanation',
    'PeerReviewSimulator': 'PeerReviewSimulator_explanation',
    'reflection-journaler': 'ReflectionJournaler_explanation',
    'ReflectionJournaler': 'ReflectionJournaler_explanation',
    'handoff-summarizer': 'HandoffSummarizer_explanation',
    'HandoffSummarizer': 'HandoffSummarizer_explanation',
    'misconception-detector': 'MisconceptionDetector_explanation',
    'MisconceptionDetector': 'MisconceptionDetector_explanation',
    'time-box-pair-programmer': 'TimeboxPairProgrammer_explanation',
    'TimeboxPairProgrammer': 'TimeboxPairProgrammer_explanation',
    'tool-use-coach': 'ToolUseCoach_explanation',
    'ToolUseCoach': 'ToolUseCoach_explanation',
    
    // Add more mappings as needed
  };

  return audioFileMap[componentName] || `${componentName}_explanation`;
}
