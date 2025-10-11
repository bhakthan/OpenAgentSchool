/**
 * Study Mode API Client
 * Handles backend sync for Study Mode sessions
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';

// Session type from backend schema
export interface StudyModeSessionDTO {
  session_id: string;
  question_id: string;
  concept_id: string;
  type: 'socratic' | 'scenario' | 'debug' | 'critical-thinking';
  title: string;
  started_at: string; // ISO 8601
  completed_at?: string; // ISO 8601
  progress?: number; // 0-100
  score?: number; // 0-100
  is_complete?: boolean;
  responses?: any[]; // JSONB - array of response objects
  insights?: Record<string, any>; // JSONB - key-value insights
  llm_assessment?: Record<string, any>; // JSONB - assessment data
  hints_used?: number;
  time_spent?: number; // seconds
}

export interface SyncRequest {
  sessions: StudyModeSessionDTO[];
}

export interface SyncResponse {
  synced_count: number;
  skipped_count: number;
  errors: string[];
}

export interface ProgressSummary {
  total_sessions: number;
  completed_sessions: number;
  total_time_spent: number;
  average_score: number;
  concepts: ConceptProgress[];
}

export interface ConceptProgress {
  concept_id: string;
  sessions_count: number;
  completed_count: number;
  average_score: number;
  last_activity: string;
}

/**
 * Get authorization header with current access token
 */
function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Not authenticated');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Sync localStorage Study Mode sessions to backend
 */
export async function syncStudyModeSessions(sessions: StudyModeSessionDTO[]): Promise<SyncResponse> {
  const response = await axios.post<SyncResponse>(
    `${API_BASE_URL}/api/v1/study-mode/sync`,
    { sessions },
    { headers: getAuthHeaders() }
  );
  return response.data;
}

/**
 * Get user's progress summary
 */
export async function getProgressSummary(): Promise<ProgressSummary> {
  const response = await axios.get<ProgressSummary>(
    `${API_BASE_URL}/api/v1/study-mode/progress`,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

/**
 * Create a new Study Mode session
 */
export async function createSession(session: StudyModeSessionDTO): Promise<StudyModeSessionDTO> {
  const response = await axios.post<StudyModeSessionDTO>(
    `${API_BASE_URL}/api/v1/study-mode/sessions`,
    session,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

/**
 * List all user's Study Mode sessions
 */
export async function listSessions(params?: {
  concept_id?: string;
  type?: string;
  is_complete?: boolean;
  skip?: number;
  limit?: number;
}): Promise<StudyModeSessionDTO[]> {
  const response = await axios.get<StudyModeSessionDTO[]>(
    `${API_BASE_URL}/api/v1/study-mode/sessions`,
    { headers: getAuthHeaders(), params }
  );
  return response.data;
}

/**
 * Get a specific session by ID
 */
export async function getSession(sessionId: string): Promise<StudyModeSessionDTO> {
  const response = await axios.get<StudyModeSessionDTO>(
    `${API_BASE_URL}/api/v1/study-mode/sessions/${sessionId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

/**
 * Update an existing session
 */
export async function updateSession(
  sessionId: string,
  updates: Partial<StudyModeSessionDTO>
): Promise<StudyModeSessionDTO> {
  const response = await axios.patch<StudyModeSessionDTO>(
    `${API_BASE_URL}/api/v1/study-mode/sessions/${sessionId}`,
    updates,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

/**
 * Delete a session
 */
export async function deleteSession(sessionId: string): Promise<void> {
  await axios.delete(
    `${API_BASE_URL}/api/v1/study-mode/sessions/${sessionId}`,
    { headers: getAuthHeaders() }
  );
}
