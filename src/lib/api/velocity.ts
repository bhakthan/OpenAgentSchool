/**
 * Agent Velocity Engineering (AVE) API Client
 * 
 * Handles all API calls for velocity tracking, pattern completions,
 * practice experience, and assessments.
 */

import { API_CONFIG, withApiV1 } from './config';

const baseV1 = withApiV1(API_CONFIG.core);

// Types
export interface PatternCompletion {
  pattern_id: string;
  pattern_name: string | null;
  implementation_time_hours: number | null;
  completed_at: string;
  notes: string | null;
}

export interface VelocityStats {
  total_patterns_completed: number;
  total_patterns_available: number;
  completion_percentage: number;
  average_implementation_time: number | null;
  quick_wins: number;
  assessment_attempts: number;
  best_assessment_score: number | null;
}

export interface VelocityProfile {
  user_id: string;
  velocity_score: number;
  assessment_score: number;
  last_assessment_date: string | null;
  completed_patterns: PatternCompletion[];
  practice_experience: Record<string, string>;
  stats: VelocityStats;
  created_at: string;
  updated_at: string;
}

export interface AssessmentAttempt {
  id: string;
  score: number;
  total_questions: number;
  correct_answers: number | null;
  time_taken_seconds: number | null;
  completed_at: string;
}

export interface AssessmentHistory {
  assessments: AssessmentAttempt[];
  total_count: number;
  best_score: number | null;
  average_score: number | null;
  improvement_trend: string | null;
}

/**
 * Get complete velocity profile for current user
 */
export async function getVelocityProfile(signal?: AbortSignal): Promise<VelocityProfile> {
  const token = localStorage.getItem('auth_token');
  
  const res = await fetch(`${baseV1}/velocity/profile`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Mark a pattern as completed
 */
export async function completePattern(
  patternId: string,
  data: {
    pattern_name: string;
    implementation_time_hours?: number;
    notes?: string;
  },
  signal?: AbortSignal
) {
  const token = localStorage.getItem('auth_token');
  
  const res = await fetch(`${baseV1}/velocity/patterns/${patternId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data),
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Remove pattern completion (undo)
 */
export async function uncompletePattern(
  patternId: string,
  signal?: AbortSignal
) {
  const token = localStorage.getItem('auth_token');
  
  const res = await fetch(`${baseV1}/velocity/patterns/${patternId}/complete`, {
    method: 'DELETE',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Save assessment attempt
 */
export async function saveAssessment(
  data: {
    score: number;
    total_questions?: number;
    correct_answers?: number;
    time_taken_seconds?: number;
    answers?: Record<string, string>;
  },
  signal?: AbortSignal
) {
  const token = localStorage.getItem('auth_token');
  
  const res = await fetch(`${baseV1}/velocity/assessment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data),
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Get assessment history
 */
export async function getAssessmentHistory(
  params?: { limit?: number; offset?: number },
  signal?: AbortSignal
): Promise<AssessmentHistory> {
  const token = localStorage.getItem('auth_token');
  
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.offset) queryParams.set('offset', params.offset.toString());
  
  const url = `${baseV1}/velocity/assessments${queryParams.toString() ? `?${queryParams}` : ''}`;
  
  const res = await fetch(url, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Update practice experience level
 */
export async function updatePracticeExperience(
  practiceName: string,
  experienceLevel: 'none' | 'learning' | 'proficient' | 'expert',
  signal?: AbortSignal
) {
  const token = localStorage.getItem('auth_token');
  
  const res = await fetch(`${baseV1}/velocity/practices/${encodeURIComponent(practiceName)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify({ experience_level: experienceLevel }),
    signal
  });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Velocity API error ${res.status}: ${text || res.statusText}`);
  }
  
  return res.json();
}

/**
 * Migrate localStorage data to backend
 * This is a utility function to help users migrate their existing data
 */
export async function migrateLocalStorageData(): Promise<{
  success: boolean;
  migrated: {
    patterns: number;
    assessment: boolean;
    practices: number;
  };
  errors: string[];
}> {
  const errors: string[] = [];
  let patternsCount = 0;
  let assessmentMigrated = false;
  let practicesCount = 0;

  try {
    // Get localStorage data
    const localData = localStorage.getItem('velocityData');
    if (!localData) {
      return {
        success: true,
        migrated: { patterns: 0, assessment: false, practices: 0 },
        errors: ['No localStorage data found']
      };
    }

    const data = JSON.parse(localData);

    // Migrate completed patterns
    if (data.completedPatterns && Array.isArray(data.completedPatterns)) {
      for (const patternId of data.completedPatterns) {
        try {
          const implTime = data.implementationTimes?.[patternId];
          await completePattern(patternId, {
            pattern_name: patternId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            implementation_time_hours: implTime
          });
          patternsCount++;
        } catch (err) {
          errors.push(`Failed to migrate pattern ${patternId}: ${err}`);
        }
      }
    }

    // Migrate assessment score
    if (data.assessmentScore) {
      try {
        await saveAssessment({
          score: data.assessmentScore,
          total_questions: 5
        });
        assessmentMigrated = true;
      } catch (err) {
        errors.push(`Failed to migrate assessment: ${err}`);
      }
    }

    // Migrate practice experience
    if (data.practiceExperience) {
      for (const [practice, level] of Object.entries(data.practiceExperience)) {
        try {
          await updatePracticeExperience(practice, level as any);
          practicesCount++;
        } catch (err) {
          errors.push(`Failed to migrate practice ${practice}: ${err}`);
        }
      }
    }

    // Clear localStorage after successful migration
    if (errors.length === 0) {
      localStorage.removeItem('velocityData');
    }

    return {
      success: errors.length === 0,
      migrated: {
        patterns: patternsCount,
        assessment: assessmentMigrated,
        practices: practicesCount
      },
      errors
    };
  } catch (err) {
    return {
      success: false,
      migrated: {
        patterns: patternsCount,
        assessment: assessmentMigrated,
        practices: practicesCount
      },
      errors: [`Migration failed: ${err}`]
    };
  }
}
