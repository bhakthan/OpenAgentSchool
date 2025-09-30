// Authentication Types
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

// Quiz Types
export interface QuizQuestion {
  id: number;
  question: string;
  options: { [key: string]: string }; // e.g., {"A": "answer1", "B": "answer2"}
  difficulty: string;
  category: string;
  // Note: correct_answer and explanation are NOT returned when fetching questions
}

export interface QuizQuestionFull extends QuizQuestion {
  correct_answer: string;
  explanation: string;
}

export interface QuizSubmission {
  category: string;
  answers: { [question_id: string]: string }; // e.g., {"1": "A", "2": "B"}
}

export interface QuizAttemptResponse {
  id: number;
  category: string;
  score: number;
  total_questions: number;
  percentage: number;
  questions_attempted: unknown;
  time_taken?: number;
  completed_at: string;
}

export interface QuizResult {
  id: number;
  category: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
}

// Progress Types
export interface Progress {
  user_id: number;
  concept_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  completed_at?: string;
  last_accessed?: string;
}

export interface ProgressUpdate {
  concept_id: string;
  status: 'in_progress' | 'completed';
  score?: number;
}

// API Error
export interface APIError {
  detail: string;
}
