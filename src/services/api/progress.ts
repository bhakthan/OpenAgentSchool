import { apiClient } from './client';
import { Progress, ProgressUpdate } from './types';

export const progressAPI = {
  /**
   * Get overall user progress
   */
  async getProgress(): Promise<Progress[]> {
    return apiClient.get<Progress[]>('/progress/');
  },
  
  /**
   * Get progress for specific concept
   */
  async getConceptProgress(conceptId: string): Promise<Progress> {
    return apiClient.get<Progress>(`/progress/concept/${conceptId}`);
  },
  
  /**
   * Update progress for a concept
   */
  async updateProgress(data: ProgressUpdate): Promise<Progress> {
    return apiClient.post<Progress>('/progress/update', data);
  }
};
