import axios from 'axios';

// Knowledge Service API Client
// Base URL for knowledge service (different port from core API)
const KNOWLEDGE_BASE_URL = import.meta.env.VITE_KNOWLEDGE_SERVICE_URL || 'http://localhost:8003';

const knowledgeClient = axios.create({
  baseURL: KNOWLEDGE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API key if needed
knowledgeClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_KNOWLEDGE_API_KEY;
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface Concept {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  prerequisites: string[];
  related_concepts: string[];
  learning_objectives: string[];
  code_examples?: string[];
  references?: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  concept: Concept;
  score: number;
  highlights: string[];
  similarity: number;
}

export interface SearchRequest {
  query: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  limit?: number;
  min_similarity?: number;
  tags?: string[];
}

export interface ConceptCreateRequest {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  prerequisites?: string[];
  learning_objectives?: string[];
  tags?: string[];
}

export interface ConceptUpdateRequest extends Partial<ConceptCreateRequest> {
  id: string;
}

// API Methods
export const knowledgeAPI = {
  /**
   * Semantic search for concepts
   */
  searchConcepts: async (request: SearchRequest): Promise<SearchResult[]> => {
    const params = new URLSearchParams();
    params.append('query', request.query);
    if (request.category) params.append('category', request.category);
    if (request.difficulty) params.append('difficulty', request.difficulty);
    if (request.limit) params.append('limit', request.limit.toString());
    if (request.min_similarity) params.append('min_similarity', request.min_similarity.toString());
    if (request.tags) request.tags.forEach(tag => params.append('tags', tag));

    const response = await knowledgeClient.get(`/api/v1/concepts/search?${params.toString()}`);
    return response.data.results || [];
  },

  /**
   * Get a specific concept by ID
   */
  getConcept: async (id: string): Promise<Concept> => {
    const response = await knowledgeClient.get(`/api/v1/concepts/${id}`);
    return response.data;
  },

  /**
   * Get all concepts (with optional filters)
   */
  getAllConcepts: async (params?: {
    category?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
  }): Promise<Concept[]> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const response = await knowledgeClient.get(`/api/v1/concepts?${queryParams.toString()}`);
    return response.data.concepts || [];
  },

  /**
   * Create a new concept
   */
  createConcept: async (request: ConceptCreateRequest): Promise<Concept> => {
    const response = await knowledgeClient.post('/api/v1/concepts', request);
    return response.data;
  },

  /**
   * Update an existing concept
   */
  updateConcept: async (request: ConceptUpdateRequest): Promise<Concept> => {
    const { id, ...updateData } = request;
    const response = await knowledgeClient.put(`/api/v1/concepts/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a concept
   */
  deleteConcept: async (id: string): Promise<void> => {
    await knowledgeClient.delete(`/api/v1/concepts/${id}`);
  },

  /**
   * Get related concepts
   */
  getRelatedConcepts: async (id: string, limit: number = 5): Promise<Concept[]> => {
    const response = await knowledgeClient.get(`/api/v1/concepts/${id}/related?limit=${limit}`);
    return response.data.concepts || [];
  },

  /**
   * Get concepts by category
   */
  getConceptsByCategory: async (category: string): Promise<Concept[]> => {
    const response = await knowledgeClient.get(`/api/v1/concepts/category/${category}`);
    return response.data.concepts || [];
  },

  /**
   * Get concept prerequisites
   */
  getPrerequisites: async (id: string): Promise<Concept[]> => {
    const response = await knowledgeClient.get(`/api/v1/concepts/${id}/prerequisites`);
    return response.data.concepts || [];
  },

  /**
   * Health check for knowledge service
   */
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await knowledgeClient.get('/health');
    return response.data;
  },
};

export default knowledgeAPI;
