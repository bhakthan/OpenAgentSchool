import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioNarrationState {
  isPlaying: boolean;
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  currentComponent: string | null;
  volume: number;
  speechRate: number;
  useLocalTTS: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
}

interface AudioNarrationContextType {
  state: AudioNarrationState;
  playNarration: (componentName: string, level: 'beginner' | 'intermediate' | 'advanced') => Promise<void>;
  stopNarration: () => void;
  setVolume: (volume: number) => void;
  setSpeechRate: (rate: number) => void;
  toggleTTSMode: () => void;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  getAvailableVoices: () => SpeechSynthesisVoice[];
}

const AudioNarrationContext = createContext<AudioNarrationContextType | undefined>(undefined);

export function AudioNarrationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AudioNarrationState>({
    isPlaying: false,
    currentLevel: null,
    currentComponent: null,
    volume: 0.8,
    speechRate: 1.0,
    useLocalTTS: true, // Default to local TTS
    selectedVoice: null,
  });

  const playNarration = async (componentName: string, level: 'beginner' | 'intermediate' | 'advanced') => {
    // Stop any current narration
    stopNarration();

    setState(prev => ({
      ...prev,
      isPlaying: true,
      currentLevel: level,
      currentComponent: componentName,
    }));

    try {
      // Try local TTS first, fallback to Web Speech API
      if (state.useLocalTTS) {
        await playWithLocalTTS(componentName, level);
      } else {
        await playWithWebSpeechAPI(componentName, level);
      }
    } catch (error) {
      console.error('Audio narration failed:', error);
      // Fallback to Web Speech API if local TTS fails
      if (state.useLocalTTS) {
        try {
          await playWithWebSpeechAPI(componentName, level);
        } catch (fallbackError) {
          console.error('Fallback audio narration also failed:', fallbackError);
        }
      }
    } finally {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        currentLevel: null,
        currentComponent: null,
      }));
    }
  };

  const playWithLocalTTS = async (componentName: string, level: string) => {
    // This would integrate with a local TTS service/model
    // For now, we'll simulate with a promise and fallback to Web Speech API
    throw new Error('Local TTS not yet implemented - falling back to Web Speech API');
  };

  const playWithWebSpeechAPI = async (componentName: string, level: string) => {
    const text = await fetchAudioContent(componentName, level);
    
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = state.speechRate;
      utterance.volume = state.volume;
      
      // Select the best female voice available
      const voice = state.selectedVoice || selectBestFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);
      
      speechSynthesis.speak(utterance);
    });
  };

  const selectBestFemaleVoice = (): SpeechSynthesisVoice | null => {
    const voices = speechSynthesis.getVoices();
    
    // Priority order for female voices (Google US English Female prioritized)
    const preferredFemaleVoices = [
      // Google US English Female as top priority
      'Google US English Female',
      
      // Other Google voices
      'Google UK English Female',
      'Google français Female',
      
      // Microsoft voices (Windows)
      'Microsoft Zira Desktop',
      'Microsoft Zira',
      'Microsoft Eva',
      'Microsoft Aria',
      
      // Apple voices (Safari/macOS)
      'Samantha',
      'Victoria',
      'Allison',
      'Ava',
      'Susan',
      'Karen',
      
      // Other common female voices
      'en-US Female',
      'en-GB Female',
      'Female',
    ];
    
    // First, try to find a preferred female voice by name
    for (const preferredName of preferredFemaleVoices) {
      const voice = voices.find(v => 
        v.name === preferredName || 
        v.name.includes(preferredName)
      );
      if (voice) {
        console.log('Selected voice:', voice.name);
        return voice;
      }
    }
    
    // Fallback: find any female voice by checking the name or other indicators
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('eva') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('allison') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('susan') ||
      voice.name.toLowerCase().includes('victoria') ||
      voice.name.toLowerCase().includes('aria') ||
      voice.name.toLowerCase().includes('ava')
    );
    
    if (femaleVoice) {
      console.log('Selected fallback female voice:', femaleVoice.name);
      return femaleVoice;
    }
    
    // Last resort: pick the first available voice (might be male)
    console.log('No female voice found, using default voice');
    return voices[0] || null;
  };

  const fetchAudioContent = async (componentName: string, level: string): Promise<string> => {
    try {
      // Map conceptIds to actual audio file names
      const audioFileMap: { [key: string]: string } = {
        // Kebab-case conceptIds to PascalCase filenames
        'agent-ethics': 'AgentEthicsConcept',
        'agent-security': 'AgentSecurityConcept', 
        'agent-learning': 'AgentLearningConcept',
        'agent-integration': 'AgentIntegrationConcept',
        'agent-architecture': 'AgentArchitectureConcept',
        'agent-deployment': 'AgentDeploymentConcept',
        'multi-agent-systems': 'MultiAgentSystemsConcept',
        'mcp-a2a-integration': 'MCPA2AIntegrationConcept',
        'a2a-communication': 'A2ACommunicationConcept',
        'ai-agents': 'AIAgentsConcept',
        'mcp': 'MCPConcept',
        'acp': 'ACPConcept',
        'data-visualization': 'DataVisualizationConcept',
        'flow-visualization': 'FlowVisualizationConcept',
        
        // Agent Pattern Mappings (kebab-case pattern IDs to PascalCase audio files)
        'react-agent': 'ReActPattern',
        'agentic-rag': 'AgenticRAGPattern',
        'code-act': 'CodeActPattern',
        'codeact-agent': 'CodeActPattern',
        'prompt-chaining': 'PromptChaining',
        'parallelization': 'Parallelization',
        'self-reflection': 'SelfReflection',
        'modern-tool-use': 'ModernToolUse',
        'model-context-protocol': 'MCPConcept',
        'agent-to-agent': 'A2ACommunicationConcept',
        'computer-use': 'CodeActPattern', // Computer use pattern uses similar concepts to CodeAct
        'voice-agent': 'VoiceAgent',
        'routing': 'Routing',
        'orchestrator-worker': 'OrchestratorWorker',
        'evaluator-optimizer': 'AgentEvaluationConcept', // Maps to evaluation concept
        'autonomous-workflow': 'AutonomousWorkflow',
        'deep-researcher': 'DeepResearcher',
        'deep-agents': 'DeepResearcher', // Deep agents uses similar concepts
        'agent-evaluation': 'AgentEvaluationConcept',
        'autogen-multi-agent': 'AutoGenMultiAgent',
        'memory-enhanced': 'MemoryEnhancedAgent',
        'swarm-intelligence': 'SwarmIntelligence',
        'plan-act': 'PlanActPattern',
        
        // Direct component names (already in correct format)
        'A2ACommunicationPatterns': 'A2ACommunicationPatterns',
        'A2AMultiAgentSystem': 'A2AMultiAgentSystem',
        'ACPProtocolStack': 'ACPProtocolStack',
        'Agent2AgentProtocolExplainer': 'Agent2AgentProtocolExplainer',
        'AgentAnalyticsDashboard': 'AgentAnalyticsDashboard',
        'AgentCommunicationPlayground': 'AgentCommunicationPlayground',
        'AgentEvaluationConcept': 'AgentEvaluationConcept',
        'AgentEvaluationMethodologies': 'AgentEvaluationMethodologies',
        'AgenticRAGPattern': 'AgenticRAGPattern',
        'AgenticWorkflowControl': 'AgenticWorkflowControl',
        'Agentic_Prompting_Fundamentals': 'Agentic_Prompting_Fundamentals',
        'AgentInstructionDesign': 'AgentInstructionDesign',
        'AgentLifecycleVisual': 'AgentLifecycleVisual',
        'AgentPersonalityShowcase': 'AgentPersonalityShowcase',
        'AgentTesting': 'AgentTesting',
        'AISystemsThinking': 'AISystemsThinking',
        'AutoGenMultiAgent': 'AutoGenMultiAgent',
        'AutonomousWorkflow': 'AutonomousWorkflow',
        'AzureAISafetyAndGovernance': 'AzureAISafetyAndGovernance',
        'ChatbotToAgentTransition': 'ChatbotToAgentTransition',
        'CodeActPattern': 'CodeActPattern',
        'CodeUnderstandingSkills': 'CodeUnderstandingSkills',
        'CrossTeamCollaborationSkills': 'CrossTeamCollaborationSkills',
        'DeepResearcher': 'DeepResearcher',
        'DevelopmentVelocitySkills': 'DevelopmentVelocitySkills',
        'EnterpriseArchitecturePatterns': 'EnterpriseArchitecturePatterns',
        'FrontierFirmAssessment': 'FrontierFirmAssessment',
        'FutureProofingSkills': 'FutureProofingSkills',
        'HumanAgentRatioCalculator': 'HumanAgentRatioCalculator',
        'LearningAssessment': 'LearningAssessment',
        'MCPArchitectureDiagram': 'MCPArchitectureDiagram',
        'MCPToolCallingAnimation': 'MCPToolCallingAnimation',
        'MCPToolCallingCode': 'MCPToolCallingCode',
        'MCPVisualDemo': 'MCPVisualDemo',
        'MCPxA2AIntegrationConcept': 'MCPxA2AIntegrationConcept',
        'MemoryEnhancedAgent': 'MemoryEnhancedAgent',
        'ModernToolUse': 'ModernToolUse',
        'NovelOrganizationalPatterns': 'NovelOrganizationalPatterns',
        'OrchestratorWorker': 'OrchestratorWorker',
        'Parallelization': 'Parallelization',
        'PlanActPattern': 'PlanActPattern',
        'PromptChaining': 'PromptChaining',
        'PromptEngineeringSkills': 'PromptEngineeringSkills',
        'PromptOptimizationPatterns': 'PromptOptimizationPatterns',
        'ProtocolComparison': 'ProtocolComparison',
        'ReActPattern': 'ReActPattern',
        'ResearchAnalysisSkills': 'ResearchAnalysisSkills',
        'Routing': 'Routing',
        'SelfReflection': 'SelfReflection',
        'StudyMode': 'StudyMode',
        'SwarmIntelligence': 'SwarmIntelligence',
        'VoiceAgent': 'VoiceAgent',
        'WorkspaceOverview': 'WorkspaceOverview',
      };

      const mappedName = audioFileMap[componentName] || componentName;
      const response = await fetch(`/audio/${mappedName}_explanation.txt`);
      if (!response.ok) throw new Error(`Audio file not found: ${mappedName}_explanation.txt`);
      
      const content = await response.text();
      return extractLevelContent(content, level);
    } catch (error) {
      throw new Error(`Failed to fetch audio content: ${error}`);
    }
  };

  const extractLevelContent = (content: string, level: string): string => {
    const sections = content.split('--------------------------------------------------------------------------------');
    
    switch (level) {
      case 'beginner':
        return sections[2]?.trim() || 'Beginner explanation not found.';
      case 'intermediate':
        return sections[4]?.trim() || 'Intermediate explanation not found.';
      case 'advanced':
        return sections[6]?.trim() || 'Advanced explanation not found.';
      default:
        return 'Content not found.';
    }
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentLevel: null,
      currentComponent: null,
    }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const setSpeechRate = (rate: number) => {
    setState(prev => ({ ...prev, speechRate: rate }));
  };

  const toggleTTSMode = () => {
    setState(prev => ({ ...prev, useLocalTTS: !prev.useLocalTTS }));
  };

  const setSelectedVoice = (voice: SpeechSynthesisVoice | null) => {
    setState(prev => ({ ...prev, selectedVoice: voice }));
  };

  const getAvailableVoices = (): SpeechSynthesisVoice[] => {
    if ('speechSynthesis' in window) {
      return speechSynthesis.getVoices();
    }
    return [];
  };

  return (
    <AudioNarrationContext.Provider
      value={{
        state,
        playNarration,
        stopNarration,
        setVolume,
        setSpeechRate,
        toggleTTSMode,
        setSelectedVoice,
        getAvailableVoices,
      }}
    >
      {children}
    </AudioNarrationContext.Provider>
  );
}

export function useAudioNarration() {
  const context = useContext(AudioNarrationContext);
  if (context === undefined) {
    throw new Error('useAudioNarration must be used within an AudioNarrationProvider');
  }
  return context;
}
