/**
 * Achievement Tracking Hook
 * 
 * Automatically checks for achievement unlocks after user actions
 * and shows toast notifications when achievements are earned.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '../auth/AuthContext';
import {
  getUserAchievements,
  getAchievementProgress,
  checkAchievements,
  getCertificateAchievements,
} from '../api/achievements';
import type { UserAchievement, AchievementProgress } from '../data/achievements';

/**
 * Hook to get user's unlocked achievements
 */
export function useUserAchievements() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['achievements', 'user'],
    queryFn: getUserAchievements,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get achievement progress
 */
export function useAchievementProgress() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['achievements', 'progress'],
    queryFn: getAchievementProgress,
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get certificate-eligible achievements
 */
export function useCertificateAchievements() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['achievements', 'certificates'],
    queryFn: getCertificateAchievements,
    enabled: isAuthenticated,
  });
}

/**
 * Hook to check and unlock achievements
 */
export function useCheckAchievements() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ trigger, metadata }: { trigger: string; metadata?: Record<string, any> }) =>
      checkAchievements(trigger, metadata),
    onSuccess: (data) => {
      // Invalidate achievement queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      
      // Show toast for each newly unlocked achievement
      if (data.newly_unlocked && data.newly_unlocked.length > 0) {
        data.newly_unlocked.forEach((achievement: any) => {
          toast.success(
            `🎉 Achievement Unlocked: ${achievement.icon} ${achievement.title}`,
            {
              description: achievement.description,
              duration: 5000,
              action: {
                label: 'View All',
                onClick: () => {
                  window.location.href = '/achievements';
                },
              },
            }
          );
          
          // Track analytics
          if (window.gtag) {
            window.gtag('event', 'achievement_unlocked', {
              achievement_id: achievement.achievement_id,
              achievement_title: achievement.title,
              achievement_rarity: achievement.rarity,
              achievement_points: achievement.points,
            });
          }
        });
      }
    },
  });
}

/**
 * Helper: Track Study Mode session completion
 */
export function trackStudySessionComplete(metadata: Record<string, any>) {
  const { mutate } = useCheckAchievements();
  mutate({ trigger: 'study_session_complete', metadata });
}

/**
 * Helper: Track concept view
 */
export function trackConceptView(conceptId: string) {
  const { mutate } = useCheckAchievements();
  mutate({ trigger: 'concept_view', metadata: { concept_id: conceptId } });
}

/**
 * Helper: Track bookmark add
 */
export function trackBookmarkAdd(bookmarkId: string) {
  const { mutate } = useCheckAchievements();
  mutate({ trigger: 'bookmark_add', metadata: { bookmark_id: bookmarkId } });
}

/**
 * Helper: Track template download
 */
export function trackTemplateDownload(templateName: string) {
  const { mutate } = useCheckAchievements();
  mutate({ trigger: 'template_download', metadata: { template_name: templateName } });
}

/**
 * Helper: Track perfect score
 */
export function trackPerfectScore(sessionId: string, sessionType: string) {
  const { mutate } = useCheckAchievements();
  mutate({ 
    trigger: 'perfect_score', 
    metadata: { 
      session_id: sessionId,
      session_type: sessionType,
    } 
  });
}

/**
 * Calculate total points from achievements
 */
export function useTotalPoints() {
  const { data: achievements } = useUserAchievements();
  
  if (!achievements) return 0;
  
  return achievements.reduce((sum, achievement) => sum + achievement.points, 0);
}

/**
 * Calculate achievement completion percentage
 */
export function useAchievementCompletion() {
  const { data: userAchievements } = useUserAchievements();
  const { data: progressData } = useAchievementProgress();
  
  if (!userAchievements || !progressData) {
    return { unlocked: 0, total: 0, percentage: 0 };
  }
  
  // Total achievements in system (from ACHIEVEMENTS constant)
  const total = 16; // Update if more achievements added
  const unlocked = userAchievements.length;
  const percentage = Math.round((unlocked / total) * 100);
  
  return { unlocked, total, percentage };
}
