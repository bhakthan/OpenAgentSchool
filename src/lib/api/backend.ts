// Backend API service for Open Agent School
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },
};

// Community API
export const communityAPI = {
  createPost: async (postData: { title: string; content: string; tags?: string[] }) => {
    const response = await api.post('/community/posts', postData);
    return response.data;
  },

  getPosts: async (skip = 0, limit = 10) => {
    const response = await api.get(`/community/posts?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getPost: async (postId: number) => {
    const response = await api.get(`/community/posts/${postId}`);
    return response.data;
  },

  createComment: async (commentData: { content: string; post_id: number; parent_id?: number }) => {
    const response = await api.post('/community/comments', commentData);
    return response.data;
  },
};

// Quiz API
export const quizAPI = {
  getQuestions: async (category: string, limit = 10) => {
    const response = await api.get(`/quiz/questions/${category}?limit=${limit}`);
    return response.data;
  },

  submitQuiz: async (submission: {
    category: string;
    answers: Record<string, string>;
    time_taken?: number;
  }) => {
    const response = await api.post('/quiz/submit', submission);
    return response.data;
  },

  getResults: async (category?: string) => {
    const url = category ? `/quiz/results?category=${category}` : '/quiz/results';
    const response = await api.get(url);
    return response.data;
  },
};

// Progress API
export const progressAPI = {
  updateProgress: async (progressData: {
    concept_id: string;
    concept_type: string;
    status: string;
    progress_percentage: number;
    completed_sections?: string[];
  }) => {
    const response = await api.post('/progress/update', progressData);
    return response.data;
  },

  getProgress: async () => {
    const response = await api.get('/progress/');
    return response.data;
  },

  getConceptProgress: async (conceptId: string) => {
    const response = await api.get(`/progress/concept/${conceptId}`);
    return response.data;
  },
};

// Example usage functions for the frontend
export const useBackendAPI = () => {
  // Community features
  const createCommunityPost = async (title: string, content: string, tags: string[] = []) => {
    try {
      const post = await communityAPI.createPost({ title, content, tags });
      console.log('Post created:', post);
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  // Quiz features
  const takeQuiz = async (category: string) => {
    try {
      const questions = await quizAPI.getQuestions(category, 5);
      console.log('Quiz questions:', questions);
      return questions;
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      throw error;
    }
  };

  const submitQuizAnswers = async (category: string, answers: Record<string, string>, timeSpent: number) => {
    try {
      const result = await quizAPI.submitQuiz({
        category,
        answers,
        time_taken: timeSpent,
      });
      console.log('Quiz submitted:', result);
      return result;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  };

  // Progress tracking
  const updateLearningProgress = async (conceptId: string, conceptType: string, status: string, percentage: number) => {
    try {
      const progress = await progressAPI.updateProgress({
        concept_id: conceptId,
        concept_type: conceptType,
        status,
        progress_percentage: percentage,
      });
      console.log('Progress updated:', progress);
      return progress;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  return {
    createCommunityPost,
    takeQuiz,
    submitQuizAnswers,
    updateLearningProgress,
  };
};

export default api;
