import { apiClient } from './client';
import {
  QuizQuestion,
  QuizSubmission,
  QuizAttemptResponse,
  QuizResult
} from './types';

export const quizAPI = {
  /**
   * Get quiz questions for a category
   */
  async getQuestions(category: string, limit: number = 10): Promise<QuizQuestion[]> {
    return apiClient.get<QuizQuestion[]>(`/quiz/questions/${category}`, {
      params: { limit }
    });
  },
  
  /**
   * Submit quiz answers
   */
  async submitQuiz(submission: QuizSubmission): Promise<QuizAttemptResponse> {
    return apiClient.post<QuizAttemptResponse>('/quiz/submit', submission);
  },
  
  /**
   * Get quiz results history
   */
  async getResults(): Promise<QuizResult[]> {
    return apiClient.get<QuizResult[]>('/quiz/results');
  }
};
