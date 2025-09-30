import axios from 'axios';

// Agent Orchestrator API Client
// Base URL for orchestrator service (different port from core API)
const ORCHESTRATOR_BASE_URL = import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL || 'http://localhost:8002';

const orchestratorClient = axios.create({
  baseURL: ORCHESTRATOR_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API key if needed
orchestratorClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_ORCHESTRATOR_API_KEY;
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface CriticalThinkingAnalysis {
  question: string;
  analysis: {
    assumptions: string[];
    perspectives: string[];
    evidence_needed: string[];
    logical_flaws: string[];
    alternative_conclusions: string[];
  };
  socratic_questions: string[];
  bloom_level: string;
  recommended_actions: string[];
}

export interface BloomsFrameworkResponse {
  level: string;
  description: string;
  action_verbs: string[];
  sample_questions: string[];
  assessment_criteria: string[];
}

export interface SocraticQuestion {
  question: string;
  purpose: string;
  expected_thinking: string;
  follow_up_questions: string[];
}

export interface CriticalThinkingRequest {
  topic: string;
  context?: string;
  user_level?: 'beginner' | 'intermediate' | 'advanced';
  focus_areas?: string[];
}

export interface EducationalFrameworkRequest {
  topic: string;
  target_level?: string;
  learning_objectives?: string[];
}

// API Methods
export const orchestratorAPI = {
  /**
   * Analyze a topic for critical thinking insights
   */
  analyzeCriticalThinking: async (request: CriticalThinkingRequest): Promise<CriticalThinkingAnalysis> => {
    const response = await orchestratorClient.post('/api/v1/critical-thinking/analyze', request);
    return response.data;
  },

  /**
   * Get Bloom's taxonomy framework guidance for a topic
   */
  getBloomsFramework: async (request: EducationalFrameworkRequest): Promise<BloomsFrameworkResponse> => {
    const response = await orchestratorClient.post('/api/v1/educational-frameworks/blooms', request);
    return response.data;
  },

  /**
   * Generate Socratic questions for a topic
   */
  generateSocraticQuestions: async (topic: string, count: number = 5): Promise<SocraticQuestion[]> => {
    const response = await orchestratorClient.post('/api/v1/critical-thinking/socratic-questions', {
      topic,
      count,
    });
    return response.data.questions || [];
  },

  /**
   * Get educational framework recommendations
   */
  getFrameworkRecommendations: async (topic: string, userLevel: string = 'intermediate'): Promise<any> => {
    const response = await orchestratorClient.post('/api/v1/educational-frameworks/recommend', {
      topic,
      user_level: userLevel,
    });
    return response.data;
  },

  /**
   * Health check for orchestrator service
   */
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await orchestratorClient.get('/health');
    return response.data;
  },
};

export default orchestratorAPI;
