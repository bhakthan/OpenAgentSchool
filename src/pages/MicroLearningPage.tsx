import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics/ga';
import { HeroSection } from '@/components/micro-learning/HeroSection';
import { RoleSorter } from '@/components/micro-learning/RoleSorter';
import { TrackBrowser } from '@/components/micro-learning/TrackBrowser';
import { TrackDetailView } from '@/components/micro-learning/TrackDetailView';
import { CapsuleView } from '@/components/micro-learning/CapsuleView';
import { Dashboard } from '@/components/micro-learning/Dashboard';
import { StreakXPOverlay } from '@/components/micro-learning/StreakXPOverlay';
import {
  CAPSULES_BY_TRACK,
  getTrackById,
} from '@/lib/data/microLearning';
import type { RoleProfile } from '@/lib/data/microLearning';
import { useMicroLearningProgress } from '@/lib/hooks/useMicroLearningProgress';
import { clearMicroLearningReturnSession } from '@/lib/hooks/useMicroLearningReturn';
import type { MicroAchievement } from '@/lib/hooks/microLearningAchievements';

/**
 * Top-level page for /micro-learning/:trackId?
 *
 * Views:
 *  1. Landing (first visit) → Hero + RoleSorter + TrackBrowser
 *  2. Dashboard (returning learner with progress) → Dashboard + TrackBrowser
 *  3. Track detail → TrackDetailView
 *  4. Capsule → CapsuleView (overlay within track)
 */
const MicroLearningPage: React.FC = () => {
  const { trackId } = useParams<{ trackId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const capsuleId = searchParams.get('capsule');
  const navigate = useNavigate();

  const [showSorter, setShowSorter] = useState(false);

  // Centralized progress hook (replaces inline loadProgress/getStats)
  const {
    progress,
    stats,
    roleProfile,
    isReturning,
    saveRoleProfile,
  } = useMicroLearningProgress();

  // GA: track which view the learner is on
  useEffect(() => {
    // Clear any pending return session — user is back on micro-learning
    clearMicroLearningReturnSession();

    if (trackId && capsuleId) {
      trackEvent({ action: 'micro_capsule_view', category: 'micro_learning', label: `${trackId}/${capsuleId}` });
    } else if (trackId) {
      trackEvent({ action: 'micro_track_view', category: 'micro_learning', label: trackId });
    } else {
      trackEvent({ action: 'micro_landing_view', category: 'micro_learning', label: isReturning ? 'dashboard' : 'hero' });
    }
  }, [trackId, capsuleId, isReturning]);

  const [localRoleProfile, setLocalRoleProfile] = useState<RoleProfile | null>(() => roleProfile);

  // XP overlay state — now includes achievement unlocks
  const [xpOverlay, setXpOverlay] = useState<{
    xp: number;
    streak: number;
    milestone: string | null;
    newAchievements: MicroAchievement[];
  } | null>(null);

  /* ─── Navigation callbacks ──────────────────────── */

  const handleOpenSorter = useCallback(() => setShowSorter(true), []);
  const handleCloseSorter = useCallback(() => setShowSorter(false), []);

  const handleSorterComplete = useCallback((profile: RoleProfile) => {
    saveRoleProfile(profile);
    setLocalRoleProfile(profile);
    setShowSorter(false);
  }, [saveRoleProfile]);

  const handleSelectTrack = useCallback(
    (id: string) => navigate(`/micro-learning/${id}`),
    [navigate],
  );

  const handleBackToTracks = useCallback(() => {
    navigate('/micro-learning');
  }, [navigate]);

  const handleCapsuleSelect = useCallback(
    (id: string) => {
      setSearchParams({ capsule: id });
    },
    [setSearchParams],
  );

  const handleCapsuleBack = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  /* ─── Capsule completion ────────────────────────── */

  const handleCapsuleComplete = useCallback(
    (xpEarned: number) => {
      const freshStats = stats;
      const totalCapsules = progress.completions.length;

      let milestone: string | null = null;
      if (totalCapsules === 1) milestone = '🎉 First Capsule Complete!';
      else if (totalCapsules === 10) milestone = '🏆 10 Capsules Mastered!';
      else if (totalCapsules === 50) milestone = '💎 50 Capsules — You\'re Unstoppable!';
      else if (freshStats.streak === 7) milestone = '🔥 7-Day Streak!';
      else if (freshStats.streak === 30) milestone = '🌟 30-Day Streak Legend!';

      setXpOverlay({ xp: xpEarned, streak: freshStats.streak, milestone, newAchievements: [] });
    },
    [stats, progress],
  );

  const handleOverlayDone = useCallback(() => setXpOverlay(null), []);

  /* ─── Capsule prev/next ─────────────────────────── */

  const capsuleNavigation = useMemo(() => {
    if (!trackId || !capsuleId) return { hasNext: false, hasPrevious: false, nextId: null, prevId: null };
    const trackCapsules = CAPSULES_BY_TRACK[trackId] ?? [];
    const idx = trackCapsules.findIndex((c) => c.id === capsuleId);
    return {
      hasPrevious: idx > 0,
      hasNext: idx < trackCapsules.length - 1,
      prevId: idx > 0 ? trackCapsules[idx - 1].id : null,
      nextId: idx < trackCapsules.length - 1 ? trackCapsules[idx + 1].id : null,
    };
  }, [trackId, capsuleId]);

  const handleNextCapsule = useCallback(() => {
    if (capsuleNavigation.nextId) setSearchParams({ capsule: capsuleNavigation.nextId });
  }, [capsuleNavigation.nextId, setSearchParams]);

  const handlePrevCapsule = useCallback(() => {
    if (capsuleNavigation.prevId) setSearchParams({ capsule: capsuleNavigation.prevId });
  }, [capsuleNavigation.prevId, setSearchParams]);

  /* ─── Render ────────────────────────────────────── */

  return (
    <div className="min-h-[80vh] pb-16">
      {/* XP overlay */}
      {xpOverlay && (
        <StreakXPOverlay
          xpEarned={xpOverlay.xp}
          streak={xpOverlay.streak}
          milestone={xpOverlay.milestone}
          newAchievements={xpOverlay.newAchievements}
          onDone={handleOverlayDone}
        />
      )}

      {/* Role sorter modal */}
      {showSorter && (
        <RoleSorter open={showSorter} onComplete={handleSorterComplete} onClose={handleCloseSorter} />
      )}

      {/* ─── VIEW: Capsule ───────────────────────── */}
      {trackId && capsuleId && (
        <div className="container mx-auto px-4 py-6">
          <CapsuleView
            capsuleId={capsuleId}
            trackId={trackId}
            onComplete={handleCapsuleComplete}
            onNext={handleNextCapsule}
            onPrevious={handlePrevCapsule}
            onBack={handleCapsuleBack}
            hasNext={capsuleNavigation.hasNext}
            hasPrevious={capsuleNavigation.hasPrevious}
          />
        </div>
      )}

      {/* ─── VIEW: Track Detail ──────────────────── */}
      {trackId && !capsuleId && (
        <div className="container mx-auto px-4 py-6">
          <TrackDetailView
            trackId={trackId}
            onCapsuleSelect={handleCapsuleSelect}
            onBack={handleBackToTracks}
          />
        </div>
      )}

      {/* ─── VIEW: Landing / Dashboard + Browser ─── */}
      {!trackId && (
        <div className="space-y-12">
          {isReturning ? (
            <div className="container mx-auto px-4 py-6">
              <Dashboard onOpenRoleSorter={handleOpenSorter} />
            </div>
          ) : (
            <HeroSection
              onFindPath={handleOpenSorter}
              onBrowseAll={() => {
                document.getElementById('track-browser')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          <div id="track-browser" className="container mx-auto px-4">
            <TrackBrowser
              recommendedTrackIds={localRoleProfile?.recommendedTrackIds}
              onSelectTrack={handleSelectTrack}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroLearningPage;
