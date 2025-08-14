import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioNarrationState {
  isPlaying: boolean;
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  currentComponent: string | null;
  currentContentType: string | null;
  volume: number;
  speechRate: number;
  useLocalTTS: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
}

interface AudioNarrationContextType {
  state: AudioNarrationState;
  playNarration: (componentName: string, level: 'beginner' | 'intermediate' | 'advanced', contentType?: string) => Promise<void>;
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
    currentContentType: null,
    volume: 0.8,
    speechRate: 1.0,
    useLocalTTS: false, // Default to Web Speech API since local TTS is not implemented
    selectedVoice: null,
  });

  const detectBrowser = (): 'chrome' | 'edge' | 'safari' | 'firefox' | 'ios-safari' | 'android-chrome' | 'samsung-internet' | 'other' => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /ipad|iphone|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);
    
    // Mobile device detection
    if (isIOS) {
      if (userAgent.includes('safari/') || userAgent.includes('version/')) {
        return 'ios-safari';
      }
    }
    
    if (isAndroid) {
      if (userAgent.includes('samsungbrowser/')) {
        return 'samsung-internet';
      } else if (userAgent.includes('chrome/')) {
        return 'android-chrome';
      }
    }
    
    // Desktop browser detection (existing logic)
    if (userAgent.includes('edg/') || userAgent.includes('edge/')) {
      return 'edge';
    } else if (userAgent.includes('chrome/') && !userAgent.includes('edg/')) {
      return 'chrome';
    } else if (userAgent.includes('safari/') && !userAgent.includes('chrome/')) {
      return 'safari';
    } else if (userAgent.includes('firefox/')) {
      return 'firefox';
    } else {
      return 'other';
    }
  };

  const selectBestFemaleVoice = (): SpeechSynthesisVoice | null => {
    // Ensure voices are loaded
    let voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Try to trigger voice loading
      speechSynthesis.getVoices();
      voices = speechSynthesis.getVoices();
    }
    
    // console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang, localService: v.localService })));
    // console.log('Available voice names only:', voices.map(v => v.name));
    
    const browser = detectBrowser();
    // console.log(`Detected browser: ${browser}`);
    
    // Browser-specific voice preferences
    let preferredFemaleVoices: string[] = [];
    
    switch (browser) {
      case 'edge':
        preferredFemaleVoices = [
          // Microsoft Edge - prioritize Microsoft voices
          'Microsoft AvaMultilingual',
          'Microsoft Ava',
          'Microsoft Zira Desktop',
          'Microsoft Zira',
          'Microsoft Eva',
          'Microsoft Aria',
          // Fallback to other voices
          'Google US English Female',
          'Google UK English Female',
          'Samantha',
          'Victoria',
        ];
        break;
        
      case 'chrome':
        preferredFemaleVoices = [
          // Google Chrome - prioritize Google voices
          'Google US English Female',
          'Google UK English Female',
          'Google français Female',
          // Fallback to other voices
          'Microsoft AvaMultilingual',
          'Microsoft Ava',
          'Microsoft Zira Desktop',
          'Microsoft Zira',
          'Samantha',
          'Victoria',
        ];
        break;
        
      case 'ios-safari':
        preferredFemaleVoices = [
          // iOS Safari - prioritize iOS native voices
          'Samantha',
          'Ava (Enhanced)', 
          'Ava',
          'Susan',
          'Victoria',
          'Allison',
          'Karen',
          // iOS system voices
          'Siri Female',
          'com.apple.ttsbundle.siri-female_en-US_compact',
          'com.apple.ttsbundle.Samantha-compact',
          // Fallback voices
          'en-US Female',
          'Female',
        ];
        break;
        
      case 'android-chrome':
        preferredFemaleVoices = [
          // Android Chrome - prioritize Google and Android voices
          'Google US English Female',
          'Google UK English Female',
          'Google हिन्दी Female', // Google Hindi Female for multilingual support
          'Google français Female',
          // Android system voices
          'en-us-x-sfg#female_1-local',
          'en-us-x-sfg#female_2-local',
          'en-us-x-sfg#female_3-local',
          'Android TTS Female',
          'Samsung TTS Female',
          // Fallback voices
          'en-US Female',
          'Female',
        ];
        break;
        
      case 'samsung-internet':
        preferredFemaleVoices = [
          // Samsung Internet - prioritize Samsung and Android voices
          'Samsung TTS Female',
          'Samsung Korean Female',
          'Google US English Female',
          'Google UK English Female',
          // Android system voices
          'en-us-x-sfg#female_1-local',
          'en-us-x-sfg#female_2-local',
          'Android TTS Female',
          // Fallback voices
          'en-US Female',
          'Female',
        ];
        break;
        
      case 'safari':
        preferredFemaleVoices = [
          // Safari - prioritize Apple voices
          'Samantha',
          'Victoria',
          'Allison',
          'Ava',
          'Susan',
          'Karen',
          // Fallback to other voices
          'Google US English Female',
          'Microsoft AvaMultilingual',
          'Microsoft Ava',
        ];
        break;
        
      case 'firefox':
      case 'other':
      default:
        // Default fallback for Firefox and other browsers
        preferredFemaleVoices = [
          'Google US English Female',
          'Microsoft AvaMultilingual',
          'Microsoft Ava',
          'Microsoft Zira Desktop',
          'Microsoft Zira',
          'Samantha',
          'Victoria',
          'en-US Female',
          'en-GB Female',
          'Female',
        ];
        break;
    }
    
    // console.log(`Preferred female voices for ${browser}:`, preferredFemaleVoices);
    
    // First, try to find a preferred female voice by name (strict preference order)
    for (const preferredName of preferredFemaleVoices) {
      const voice = voices.find(v => 
        v.name === preferredName || 
        v.name.toLowerCase() === preferredName.toLowerCase()
      );
      if (voice) {
        // console.log(`Browser: ${browser}, Selected voice (exact match):`, voice.name, `(preference: ${preferredName})`);
        return voice;
      }
    }
    
    // Second pass: try partial matches but prioritize US over UK
    for (const preferredName of preferredFemaleVoices) {
      const voice = voices.find(v => v.name.includes(preferredName));
      if (voice) {
        // console.log(`Browser: ${browser}, Selected voice (partial match):`, voice.name);
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
      voice.name.toLowerCase().includes('ava') ||
      // Mobile-specific voice patterns
      voice.name.toLowerCase().includes('siri') ||
      voice.name.toLowerCase().includes('samsung') ||
      voice.name.toLowerCase().includes('android') ||
      voice.name.toLowerCase().includes('enhanced') ||
      voice.name.includes('female_1') ||
      voice.name.includes('female_2') ||
      voice.name.includes('female_3') ||
      voice.name.includes('sfg#female')
    );
    
    if (femaleVoice) {
      // console.log(`Browser: ${browser}, Selected fallback female voice:`, femaleVoice.name);
      return femaleVoice;
    }
    
    // Last resort: pick the first available voice (might be male)
    // console.log(`Browser: ${browser}, No female voice found, using default voice`);
    return voices[0] || null;
  };

  // Ensure voices are loaded when the component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0 && !state.selectedVoice) {
          // Auto-select the best female voice if none is selected
          const bestVoice = selectBestFemaleVoice();
          if (bestVoice) {
            setState(prev => ({ ...prev, selectedVoice: bestVoice }));
          }
        }
      };

      // Load voices immediately if available
      loadVoices();

      // Also listen for the voiceschanged event
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const playNarration = async (componentName: string, level: 'beginner' | 'intermediate' | 'advanced', contentType?: string) => {
    // Stop any current narration
    stopNarration();

    setState(prev => ({
      ...prev,
      isPlaying: true,
      currentLevel: level,
      currentComponent: componentName,
      currentContentType: contentType || null,
    }));

    try {
      // Since local TTS is not implemented, always use Web Speech API
      // This avoids the unnecessary error and fallback
      await playWithWebSpeechAPI(componentName, level, contentType);
      
      // Audio completed successfully - state will be updated by the utterance.onend callback
    } catch (error) {
      console.error('Audio narration failed:', error);
      
      // Reset state on any error
      setState(prev => ({
        ...prev,
        isPlaying: false,
        currentLevel: null,
        currentComponent: null,
        currentContentType: null,
      }));
    }
  };

  const playWithWebSpeechAPI = async (componentName: string, level: string, contentType?: string) => {
    const text = await fetchAudioContent(componentName, level, contentType);
    
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Small delay to ensure any previous speech is fully stopped
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = state.speechRate;
        utterance.volume = state.volume;
        
        // Always refresh voices and select the best female voice available
        // This ensures consistent voice selection across all components
        const voice = state.selectedVoice || selectBestFemaleVoice();
        if (voice) {
          utterance.voice = voice;
          // console.log(`Playing audio for ${componentName} with voice:`, voice.name);
          // console.log(`Audio settings - Rate: ${utterance.rate}, Volume: ${utterance.volume}, Text length: ${text.length} characters`);
          // console.log(`First 100 characters of text:`, text.substring(0, 100));
        } else {
          // console.warn(`No suitable voice found for ${componentName}`);
        }
        
        utterance.onstart = () => {
          // console.log(`🎵 Audio playback started for ${componentName}`);
        };
        
        utterance.onend = () => {
          // console.log(`Audio completed for ${componentName}`);
          // Reset state when audio naturally completes
          setState(prev => ({
            ...prev,
            isPlaying: false,
            currentLevel: null,
            currentComponent: null,
            currentContentType: null,
          }));
          resolve();
        };
        
        utterance.onerror = (event) => {
          const errorType = event.error || 'unknown';
          // console.warn(`Audio error for ${componentName}: ${errorType}`);
          
          // Don't treat "interrupted" as a real error - it's normal when switching audio
          if (errorType === 'interrupted') {
            // console.log(`Audio was interrupted for ${componentName} - this is normal when switching between audio tracks`);
            // Reset state but don't reject the promise for interruptions
            setState(prev => ({
              ...prev,
              isPlaying: false,
              currentLevel: null,
              currentComponent: null,
              currentContentType: null,
            }));
            resolve(); // Resolve instead of reject for interruptions
          } else {
            // For other errors, reset state and reject
            setState(prev => ({
              ...prev,
              isPlaying: false,
              currentLevel: null,
              currentComponent: null,
              currentContentType: null,
            }));
            reject(new Error(`Speech synthesis error: ${errorType}`));
          }
        };
        
        utterance.onstart = () => {
          // console.log(`Audio started for ${componentName}`);
        };
        
        // Handle interruption gracefully
        utterance.onpause = () => {
          // console.log(`Audio paused for ${componentName}`);
        };
        
        utterance.onresume = () => {
          // console.log(`Audio resumed for ${componentName}`);
        };
        
        try {
          // Additional debugging for speech synthesis
          // console.log(`🔊 About to call speechSynthesis.speak()`);
          // console.log(`🔊 speechSynthesis.speaking:`, speechSynthesis.speaking);
          // console.log(`🔊 speechSynthesis.pending:`, speechSynthesis.pending);
          // console.log(`🔊 speechSynthesis.paused:`, speechSynthesis.paused);
          // console.log(`🔊 Utterance ready:`, {
          //   text: text.substring(0, 50) + '...',
          //   voice: utterance.voice?.name || 'default',
          //   rate: utterance.rate,
          //   volume: utterance.volume,
          //   pitch: utterance.pitch
          // });
          
          speechSynthesis.speak(utterance);
          // console.log(`🔊 speechSynthesis.speak() called successfully`);
        } catch (error) {
          console.error(`Failed to start speech synthesis for ${componentName}:`, error);
          setState(prev => ({
            ...prev,
            isPlaying: false,
            currentLevel: null,
            currentComponent: null,
            currentContentType: null,
          }));
          reject(error);
        }
      }, 100); // 100ms delay to ensure clean start
    });
  };

  const fetchAudioContent = async (componentName: string, level: string, contentType?: string): Promise<string> => {
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
      
      // For patterns with 3x3 matrix files, try to use the new granular files first
      const patternsWithGranularFiles = ['ReActPattern', 'ModernToolUse', 'PromptChaining', 'AgenticRAGPattern'];
      const patternFileMap: { [key: string]: string } = {
        'ReActPattern': 'ReAct',
        'ModernToolUse': 'ModernToolUse',
        'PromptChaining': 'PromptChaining',
        'AgenticRAGPattern': 'AgenticRAG'
      };
      
      if (patternsWithGranularFiles.includes(mappedName) && contentType) {
        const patternName = patternFileMap[mappedName];
        const granularFileName = `${patternName}_${contentType}_${level.charAt(0).toUpperCase() + level.slice(1)}_explanation.txt`;
        console.log(`Attempting to load granular file for ${componentName}: ${granularFileName}`);
        try {
          const granularResponse = await fetch(`/audio/${granularFileName}`);
          if (granularResponse.ok) {
            const granularContent = await granularResponse.text();
            console.log(`Successfully loaded granular file: ${granularFileName} (${granularContent.length} characters)`);
            if (granularContent.trim().length === 0) {
              throw new Error(`Granular file ${granularFileName} is empty`);
            }
            // For granular files, return the entire content (no need to extract sections)
            return granularContent;
          } else {
            // console.warn(`Granular file ${granularFileName} returned status: ${granularResponse.status}`);
          }
        } catch (granularError) {
          // console.log(`Granular file error for ${granularFileName}:`, granularError);
        }
      }
      
      // Fallback to the unified format
      // console.log(`Falling back to unified file: ${mappedName}_explanation.txt`);
      const response = await fetch(`/audio/${mappedName}_explanation.txt`);
      if (!response.ok) {
        throw new Error(`Audio file not found: ${mappedName}_explanation.txt (status: ${response.status})`);
      }
      
      const content = await response.text();
      if (content.trim().length === 0) {
        throw new Error(`Unified file ${mappedName}_explanation.txt is empty`);
      }
      
      console.log(`Successfully loaded unified file: ${mappedName}_explanation.txt (${content.length} characters)`);
      return extractLevelContent(content, level);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to fetch audio content for ${componentName} (${level}, ${contentType}):`, errorMessage);
      throw new Error(`Failed to fetch audio content: ${errorMessage}`);
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
      currentContentType: null,
    }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const setSpeechRate = (rate: number) => {
    setState(prev => ({ ...prev, speechRate: rate }));
  };

  const toggleTTSMode = () => {
    // Local TTS is not currently implemented, so this just updates the UI state
    // but doesn't change the actual behavior (always uses Web Speech API)
    setState(prev => ({ ...prev, useLocalTTS: !prev.useLocalTTS }));
  };

  const setSelectedVoice = (voice: SpeechSynthesisVoice | null) => {
    setState(prev => ({ ...prev, selectedVoice: voice }));
  };

  const getAvailableVoices = (): SpeechSynthesisVoice[] => {
    if ('speechSynthesis' in window) {
      let voices = speechSynthesis.getVoices();
      
      // If voices are not loaded yet, try to trigger loading
      if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          voices = speechSynthesis.getVoices();
        });
        return speechSynthesis.getVoices();
      }
      
      return voices;
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
