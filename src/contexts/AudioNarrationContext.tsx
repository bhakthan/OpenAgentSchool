import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { callLlm } from '@/lib/llm';
import { LANGUAGES, LanguageCode, getLocaleFor } from '@/lib/languages';
import { buildNarrationTranslatePrompt, buildStrictNativeScriptRetry } from '@/prompts/translationPrompts';
import { PREFERRED_VOICES_BY_LANG } from '@/lib/voices';

// Language types and list are sourced from src/lib/languages.ts

interface AudioNarrationState {
  isPlaying: boolean;
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  currentComponent: string | null;
  currentContentType: string | null;
  volume: number;
  speechRate: number;
  useLocalTTS: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  selectedLanguage: LanguageCode;
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
  setSelectedLanguage: (lang: LanguageCode) => void;
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
    selectedLanguage: 'en',
  });

  // getLocaleFor and LANGUAGES come from the shared module

  // Hydrate saved language preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('oas.audio.lang');
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        setState(prev => ({ ...prev, selectedLanguage: saved as LanguageCode }));
      }
    } catch {}
  }, []);

  // Simple in-memory cache for translations by (hash(text), lang)
  const translationCacheRef = useRef<Map<string, string>>(new Map());
  const makeCacheKey = (text: string, lang: LanguageCode) => `${lang}:${text.length}:${text.slice(0,64)}`;

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
      // Microsoft Edge - prioritize Aria Online/Neural first
      'Microsoft Aria Online',
      'AriaNeural',
      'Microsoft Aria',
      'Microsoft AvaMultilingual',
      'Microsoft Ava',
      'Microsoft Zira Desktop',
      'Microsoft Zira',
      'Microsoft Eva',
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

  // ── Split text into sentence-sized chunks for reliable TTS ──────────
  // Network voices (localService: false, e.g. Google Hindi/Chinese) silently
  // fail on text longer than ~200-300 chars. This splits on sentence boundaries
  // (periods, question marks, exclamation marks, and numbered list items)
  // keeping each chunk under a safe limit while preserving natural pauses.
  const splitTextIntoChunks = (text: string, maxChars = 180): string[] => {
    if (text.length <= maxChars) return [text];

    const chunks: string[] = [];
    // Split on sentence-ending punctuation followed by a space or newline,
    // or on newlines (paragraph breaks). Keeps the delimiter with the sentence.
    const sentences = text.split(/(?<=[.!?।।\u3002\uff01\uff1f])\s+|\n+/).filter(s => s.trim());

    let current = '';
    for (const sentence of sentences) {
      if (current.length + sentence.length + 1 > maxChars && current.length > 0) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += (current ? ' ' : '') + sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    // Safety: if any chunk still exceeds maxChars, sub-split on commas/semicolons
    const result: string[] = [];
    for (const chunk of chunks) {
      if (chunk.length <= maxChars) {
        result.push(chunk);
      } else {
        const subParts = chunk.split(/(?<=[,;，；])\s*/).filter(s => s.trim());
        let sub = '';
        for (const part of subParts) {
          if (sub.length + part.length + 1 > maxChars && sub.length > 0) {
            result.push(sub.trim());
            sub = part;
          } else {
            sub += (sub ? ' ' : '') + part;
          }
        }
        if (sub.trim()) result.push(sub.trim());
      }
    }
    return result;
  };

  const playWithWebSpeechAPI = async (componentName: string, level: string, contentType?: string) => {
    const baseText = await fetchAudioContent(componentName, level, contentType);
    const targetLang = state.selectedLanguage || 'en';

    // Optionally translate text before narration
    const text = await translateIfNeeded(baseText, targetLang);
    
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Small delay to ensure any previous speech is fully stopped
      setTimeout(() => {
  // Set utterance language and voice based on selected language
  const bcp47 = getLocaleFor(targetLang);
        
  // Prefer a voice that matches the target language; fall back to user-selected or best female
  const targetLocale = getLocaleFor(targetLang).toLowerCase();
  const targetPrefix = targetLocale.split('-')[0];
  const userVoiceMatches = state.selectedVoice && (state.selectedVoice.lang?.toLowerCase().startsWith(targetPrefix));
  let voice =
    selectVoiceForLanguage(targetLang) ||
    (userVoiceMatches ? state.selectedVoice : null) ||
    selectBestFemaleVoice();
  // If still missing for English, try explicit Google female preference
  if (!voice && (targetLang === 'en')) {
    const candidates = speechSynthesis.getVoices();
    const ua = navigator.userAgent.toLowerCase();
    const isEdge = ua.includes('edg/');
    if (isEdge) {
      voice = candidates.find(v => /aria\s*online|arianeural|microsoft\s+aria/i.test(v.name)) || null;
    } else {
      voice = candidates.find(v => /google\s+us\s+english\s+female/i.test(v.name)) || null;
    }
  }

        // ── Chunk text into sentences for reliable TTS ─────────────────────
        // Network voices (localService: false) silently fail on long text.
        // Splitting into sentence-sized chunks (~200 chars max) fixes this for
        // every language and voice, including Google Hindi, Chinese, etc.
        const chunks = splitTextIntoChunks(text);

        let chunkIndex = 0;

        const speakNextChunk = () => {
          if (chunkIndex >= chunks.length) {
            // All chunks spoken — narration complete
            setState(prev => ({
              ...prev,
              isPlaying: false,
              currentLevel: null,
              currentComponent: null,
              currentContentType: null,
            }));
            resolve();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
          utterance.rate = state.speechRate;
          utterance.volume = state.volume;
          utterance.lang = bcp47;
          if (voice) utterance.voice = voice;

          utterance.onend = () => {
            chunkIndex++;
            speakNextChunk();
          };

          utterance.onerror = (event) => {
            const errorType = event.error || 'unknown';
            if (errorType === 'interrupted') {
              // Normal when user stops or switches — don't reject
              setState(prev => ({
                ...prev,
                isPlaying: false,
                currentLevel: null,
                currentComponent: null,
                currentContentType: null,
              }));
              resolve();
            } else if (errorType === 'canceled') {
              // Canceled by speechSynthesis.cancel() — normal during stop
              resolve();
            } else {
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

          try {
            speechSynthesis.speak(utterance);
          } catch (error) {
            console.error(`Failed to speak chunk ${chunkIndex} for ${componentName}:`, error);
            setState(prev => ({
              ...prev,
              isPlaying: false,
              currentLevel: null,
              currentComponent: null,
              currentContentType: null,
            }));
            reject(error);
          }
        };

        // Start speaking the first chunk
        speakNextChunk();
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
        'agentic-robotics-control-loop': 'AgenticRoboticsControlLoop',
        'agentic-robotics-integration': 'AgenticRoboticsControlLoop',
        
        // Atomic LLM Training (microGPT)
        'atomic-llm-training': 'AtomicLLMTrainingConcept',
        'AtomicLLMTrainingConcept': 'AtomicLLMTrainingConcept',
        
        // CLI Coding Agents & Agent Skills
        'client-coding-agents': 'ClientCodingAgentsConcept',
        'ClientCodingAgentsConcept': 'ClientCodingAgentsConcept',
        'agent-skills': 'AgentSkillsConcept',
        'AgentSkillsConcept': 'AgentSkillsConcept',
        
        // Edge Agent (Physical AI & Industrial)
        'edge-agent': 'EdgeAgentConcept',
        'EdgeAgentConcept': 'EdgeAgentConcept',
        
        // XYZ-Claw Multi-Agent Orchestration
        'xyz-claw': 'XYZClawConcept',
        'XYZClawConcept': 'XYZClawConcept',
        
        // AI-Ready Data
        'ai-ready-data': 'AIReadyDataConcept',
        'AIReadyDataConcept': 'AIReadyDataConcept',
        
        // Core Concepts - 2026 additions
        'agent-reasoning-patterns': 'AgentReasoningPatternsConcept',
        'agent-memory-systems': 'AgentMemorySystemsConcept',
        'agent-observability': 'AgentObservabilityConcept',
        'agent-testing-benchmarks': 'AgentTestingBenchmarksConcept',
        'prompt-injection-defense': 'PromptInjectionDefenseConcept',
        'human-in-the-loop-patterns': 'HumanInTheLoopPatternsConcept',
        
        // Agent Pattern Mappings (kebab-case pattern IDs to PascalCase audio files)
        'react-agent': 'ReActPattern',
        'agentic-rag': 'AgenticRAGPattern',
        'code-act': 'CodeActPattern',
        'codeact-agent': 'CodeActPattern',
        'prompt-chaining': 'PromptChaining',
        'adaptive-lab-technician': 'AdaptiveLabTechnician',
        'inventory-guardian': 'InventoryGuardian',
        'emergency-response-mate': 'EmergencyResponseMate',
        'mobile-manipulator-steward': 'MobileManipulatorSteward',
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
        
        // Quantum & Robotics Agent Patterns (kebab-case IDs to PascalCase audio files)
        'quantum-enhanced-navigator': 'QuantumEnhancedNavigator',
        'embodied-perception-action': 'EmbodiedPerceptionAction',
        'human-robot-collaboration': 'HumanRobotCollaboration',
        'hybrid-quantum-classical-agent': 'HybridQuantumClassical',
        'quantum-sensing-agent': 'QuantumSensing',
        'quantum-accelerated-search': 'QuantumAcceleratedSearch',
        
        // Deep Research Agent Pattern
        'deep-research-agent': 'DeepResearchAgent',
        
        // Educational Agent Patterns (kebab-case IDs to PascalCase audio files)
        'socratic-coach': 'SocraticCoach',
        'concept-to-project-builder': 'ConceptToProjectBuilder',
        'error-whisperer': 'ErrorWhisperer',
        'knowledge-map-navigator': 'KnowledgeMapNavigator',
        'context-curator': 'ContextCurator',
        'rubric-rater': 'RubricRater',
        'self-remediation-loop': 'SelfRemediationLoop',
        'spaced-repetition-planner': 'SpacedRepetitionPlanner',
        'challenge-ladder-generator': 'ChallengeLadderGenerator',
        'peer-review-simulator': 'PeerReviewSimulator',
        'reflection-journaler': 'ReflectionJournaler',
        'handoff-summarizer': 'HandoffSummarizer',
        'misconception-detector': 'MisconceptionDetector',
        'time-box-pair-programmer': 'TimeboxPairProgrammer',
        'tool-use-coach': 'ToolUseCoach',
  'data-quality-feedback-repair-loop': 'DataQualityFeedbackRepairLoop',
  'query-intent-structured-access': 'QueryIntentStructuredAccess',
  'strategy-memory-replay': 'StrategyMemoryReplay',
  'schema-aware-decomposition': 'SchemaAwareDecomposition',
  'policy-gated-tool-invocation': 'PolicyGatedToolInvocation',
  'perception-normalization': 'PerceptionNormalization',
  'budget-constrained-execution': 'BudgetConstrainedExecution',
  'action-grounding-verification': 'ActionGroundingVerification',
        
        // 2026 Frontier Patterns
        'agentic-ide': 'AgenticIDE',
        'skill-augmented-agent': 'SkillAugmentedAgent',
        'mcp-server-orchestration': 'MCPServerOrchestration',
        'multi-llm-routing': 'MultiLLMRouting',
        'guardrails-layer': 'GuardrailsLayer',
        'ignition-stack': 'IgnitionStack',
        
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
  'FineTuningConcept': 'FineTuningConcept',
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
      const patternsWithGranularFiles = ['ReActPattern', 'ModernToolUse', 'PromptChaining', 'AgenticRAGPattern', 'AgenticCommerceAP2Concept', 'DataVisualizationConcept'];
      const patternFileMap: { [key: string]: string } = {
        'ReActPattern': 'ReAct',
        'ModernToolUse': 'ModernToolUse',
        'PromptChaining': 'PromptChaining',
        'AgenticRAGPattern': 'AgenticRAG',
        'AgenticCommerceAP2Concept': 'AgenticCommerceAP2Concept',
        'DataVisualizationConcept': 'MCPApps'
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

  // Translate the given text to the target language if needed; otherwise return original text
  const translateIfNeeded = async (text: string, lang: LanguageCode): Promise<string> => {
    if (lang === 'en') return text;
    const key = makeCacheKey(text, lang);
    const cached = translationCacheRef.current.get(key);
    if (cached) return cached;

    try {
  const prompt = buildNarrationTranslatePrompt(text, lang);
  const { content } = await callLlm(prompt, 'openrouter');
      let output = (content || '').replace(/<[^>]+>/g, '').trim();
  // Strip common wrappers/preambles to guarantee text-only output
  output = output.replace(/^\s*(translation|translated\s*text|result|output)\s*:*/i, '').trim();
  output = output.replace(/^(```+|["']+)|(```+|["']+)$/g, '').trim();
      // If target language uses non-Latin script and output looks ASCII-only, retry once with stronger instruction
      const nonLatinTargets: LanguageCode[] = ['ar','bn','gu','hi','ja','kn','ko','ml','mr','ta','te','th','uk','vi','zh'];
      const isAsciiOnly = /^[\x00-\x7F]*$/.test(output);
      if (nonLatinTargets.includes(lang) && isAsciiOnly) {
        const strictPrompt = buildStrictNativeScriptRetry(text, lang);
        const retry = await callLlm(strictPrompt, 'openrouter');
        const r = (retry.content || '').replace(/<[^>]+>/g, '').trim();
        if (r && !/^[\x00-\x7F]*$/.test(r)) output = r;
      }
      if (output) translationCacheRef.current.set(key, output);
      return output || text;
    } catch (e) {
      console.error('Translation failed, falling back to English:', e);
      return text;
    }
  };

  // Try to pick a voice matching selected language code; fall back gracefully
  const selectVoiceForLanguage = (lang: LanguageCode): SpeechSynthesisVoice | null => {
    try {
      const voices = speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;
      const locale = getLocaleFor(lang);
      const lc = locale.toLowerCase();
      const prefix = lc.split('-')[0];
      // Filter voices matching locale or prefix
      const matching = voices.filter(v => {
        const vl = v.lang?.toLowerCase() || '';
        return vl === lc || vl.startsWith(prefix);
      });
      if (matching.length > 0) {
        // First, try preferred names for this language
        const prefs = PREFERRED_VOICES_BY_LANG[lang] || [];
        for (const pat of prefs) {
          const m = matching.find(v => v.name.toLowerCase().includes(pat.toLowerCase()));
          if (m) return m;
        }
        // Prefer female-sounding voices
        const femaleFirst = matching.find(v => /female|girl|aria|zira|jenny|sara|sona/i.test(v.name));
        if (femaleFirst) return femaleFirst;
        // Prefer Google voices if available
        const google = matching.find(v => /google/i.test(v.name));
        if (google) return google;
        return matching[0];
      }
      // Any voice hinting at the language in the name (fallback)
      const nameMatch = voices.find(v => v.name.toLowerCase().includes(prefix));
      return nameMatch || null;
    } catch {
      return null;
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
    try {
      if (voice?.name) localStorage.setItem('oas.audio.voice', voice.name);
      else localStorage.removeItem('oas.audio.voice');
    } catch {}
  };

  const setSelectedLanguage = (lang: LanguageCode) => {
  setState(prev => ({ ...prev, selectedLanguage: lang }));
  try { localStorage.setItem('oas.audio.lang', lang); } catch {}
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

  // Hydrate a saved preferred voice when voices are available
  useEffect(() => {
    const applySavedVoice = () => {
      try {
        const savedName = localStorage.getItem('oas.audio.voice');
        if (!savedName) return;
        const voices = speechSynthesis.getVoices();
        const match = voices.find(v => v.name === savedName);
        if (match) setState(prev => ({ ...prev, selectedVoice: match }));
      } catch {}
    };
    applySavedVoice();
    if ('speechSynthesis' in window) {
      const handler = () => applySavedVoice();
      speechSynthesis.addEventListener('voiceschanged', handler);
      return () => speechSynthesis.removeEventListener('voiceschanged', handler);
    }
  }, []);

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
  setSelectedLanguage,
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
