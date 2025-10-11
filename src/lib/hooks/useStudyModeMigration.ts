/**
 * Study Mode Migration Hook
 * Syncs localStorage Study Mode sessions to backend after login
 */

import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { syncStudyModeSessions, StudyModeSessionDTO } from '@/lib/api/studyMode';
import { toast } from 'sonner';

// localStorage keys for Study Mode data
const STORAGE_KEYS = {
  SOCRATIC: 'studyMode_socratic_sessions',
  SCENARIO: 'studyMode_scenario_sessions',
  DEBUG: 'studyMode_debug_sessions',
  CRITICAL: 'studyMode_critical_sessions',
  MIGRATION_SYNCED: 'studyMode_migration_synced', // Track if already synced
};

/**
 * Convert localStorage session format to backend DTO format
 */
function convertLocalSessionToDTO(localSession: any, type: string): StudyModeSessionDTO {
  return {
    session_id: localSession.id || `local-${Date.now()}-${Math.random()}`,
    question_id: localSession.questionId || localSession.question_id || 'unknown',
    concept_id: localSession.conceptId || localSession.concept_id || 'unknown',
    type: type as any,
    title: localSession.title || 'Untitled Session',
    started_at: localSession.startedAt || localSession.started_at || new Date().toISOString(),
    completed_at: localSession.completedAt || localSession.completed_at,
    progress: localSession.progress || 0,
    score: localSession.score,
    is_complete: localSession.isComplete || localSession.is_complete || false,
    responses: localSession.responses || [],
    insights: localSession.insights || {},
    llm_assessment: localSession.llmAssessment || localSession.llm_assessment,
    hints_used: localSession.hintsUsed || localSession.hints_used || 0,
    time_spent: localSession.timeSpent || localSession.time_spent || 0,
  };
}

/**
 * Extract all Study Mode sessions from localStorage
 */
function extractLocalSessions(): StudyModeSessionDTO[] {
  const sessions: StudyModeSessionDTO[] = [];

  // Socratic sessions
  try {
    const socraticData = localStorage.getItem(STORAGE_KEYS.SOCRATIC);
    if (socraticData) {
      const parsed = JSON.parse(socraticData);
      const socraticSessions = Array.isArray(parsed) ? parsed : [parsed];
      sessions.push(...socraticSessions.map(s => convertLocalSessionToDTO(s, 'socratic')));
    }
  } catch (e) {
    console.warn('Failed to parse socratic sessions:', e);
  }

  // Scenario sessions
  try {
    const scenarioData = localStorage.getItem(STORAGE_KEYS.SCENARIO);
    if (scenarioData) {
      const parsed = JSON.parse(scenarioData);
      const scenarioSessions = Array.isArray(parsed) ? parsed : [parsed];
      sessions.push(...scenarioSessions.map(s => convertLocalSessionToDTO(s, 'scenario')));
    }
  } catch (e) {
    console.warn('Failed to parse scenario sessions:', e);
  }

  // Debug sessions
  try {
    const debugData = localStorage.getItem(STORAGE_KEYS.DEBUG);
    if (debugData) {
      const parsed = JSON.parse(debugData);
      const debugSessions = Array.isArray(parsed) ? parsed : [parsed];
      sessions.push(...debugSessions.map(s => convertLocalSessionToDTO(s, 'debug')));
    }
  } catch (e) {
    console.warn('Failed to parse debug sessions:', e);
  }

  // Critical thinking sessions
  try {
    const criticalData = localStorage.getItem(STORAGE_KEYS.CRITICAL);
    if (criticalData) {
      const parsed = JSON.parse(criticalData);
      const criticalSessions = Array.isArray(parsed) ? parsed : [parsed];
      sessions.push(...criticalSessions.map(s => convertLocalSessionToDTO(s, 'critical-thinking')));
    }
  } catch (e) {
    console.warn('Failed to parse critical thinking sessions:', e);
  }

  return sessions;
}

/**
 * Clear localStorage Study Mode data after successful sync
 */
function clearLocalSessions() {
  localStorage.removeItem(STORAGE_KEYS.SOCRATIC);
  localStorage.removeItem(STORAGE_KEYS.SCENARIO);
  localStorage.removeItem(STORAGE_KEYS.DEBUG);
  localStorage.removeItem(STORAGE_KEYS.CRITICAL);
}

/**
 * Mark migration as complete
 */
function markMigrationComplete() {
  localStorage.setItem(STORAGE_KEYS.MIGRATION_SYNCED, 'true');
}

/**
 * Check if migration already completed
 */
function isMigrationComplete(): boolean {
  return localStorage.getItem(STORAGE_KEYS.MIGRATION_SYNCED) === 'true';
}

/**
 * Hook to automatically sync localStorage sessions to backend on login
 */
export function useStudyModeMigration() {
  const { isAuthenticated, user } = useAuth();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    // Only run once per session when user logs in
    if (!isAuthenticated || !user || hasSyncedRef.current) {
      return;
    }

    // Check if migration already completed previously
    if (isMigrationComplete()) {
      hasSyncedRef.current = true;
      return;
    }

    // Extract localStorage sessions
    const localSessions = extractLocalSessions();

    // Nothing to sync
    if (localSessions.length === 0) {
      markMigrationComplete();
      hasSyncedRef.current = true;
      return;
    }

    // Sync to backend
    const syncSessions = async () => {
      try {
        const result = await syncStudyModeSessions(localSessions);
        
        if (result.synced_count > 0) {
          toast.success(`✅ Synced ${result.synced_count} Study Mode session${result.synced_count > 1 ? 's' : ''} to your account!`, {
            description: 'Your progress is now saved across all devices.',
            duration: 5000,
          });
          
          // Clear localStorage after successful sync
          clearLocalSessions();
          markMigrationComplete();
        }

        if (result.errors.length > 0) {
          console.warn('Sync errors:', result.errors);
          toast.warning(`Synced ${result.synced_count} sessions, but ${result.errors.length} failed.`, {
            description: 'Some sessions could not be synced. Check console for details.',
          });
        }

        hasSyncedRef.current = true;
      } catch (error) {
        console.error('Failed to sync Study Mode sessions:', error);
        toast.error('Failed to sync Study Mode sessions', {
          description: 'Your local progress is safe. We\'ll try again next time.',
        });
      }
    };

    // Delay sync slightly to let auth fully initialize
    const timer = setTimeout(syncSessions, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);
}

/**
 * Manual sync trigger (for settings page or manual migration)
 */
export async function manualSyncStudyMode(): Promise<void> {
  const localSessions = extractLocalSessions();

  if (localSessions.length === 0) {
    toast.info('No local Study Mode sessions to sync');
    return;
  }

  try {
    const result = await syncStudyModeSessions(localSessions);
    
    if (result.synced_count > 0) {
      toast.success(`✅ Synced ${result.synced_count} Study Mode session${result.synced_count > 1 ? 's' : ''}!`);
      clearLocalSessions();
      markMigrationComplete();
    }

    if (result.errors.length > 0) {
      console.warn('Sync errors:', result.errors);
      toast.warning(`Synced ${result.synced_count}, but ${result.errors.length} failed`);
    }
  } catch (error) {
    console.error('Failed to sync Study Mode sessions:', error);
    toast.error('Failed to sync Study Mode sessions');
    throw error;
  }
}
