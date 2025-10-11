/**
 * Achievements Page
 * View all achievements, track progress, and download certificates
 */

import { useState } from 'react';
import { useUserAchievements, useAchievementProgress, useCertificateAchievements } from '@/lib/hooks/useAchievements';
import { ACHIEVEMENTS } from '@/lib/data/achievements';
import type { Achievement, AchievementRarity } from '@/lib/data/achievements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Certificate, Download, Share, Lock } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics/ga';
import { useAuth } from '@/lib/auth/AuthContext';
import { Link } from 'react-router-dom';

const RARITY_COLORS: Record<AchievementRarity, string> = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500',
};

const RARITY_LABELS: Record<AchievementRarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export default function AchievementsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked' | 'certificates'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: userAchievements = [], isLoading: achievementsLoading } = useUserAchievements();
  const { data: progressData = [], isLoading: progressLoading } = useAchievementProgress();
  const { data: certificates = [], isLoading: certificatesLoading } = useCertificateAchievements();

  const unlockedIds = new Set(userAchievements.map((a) => a.achievement_id));
  const progressMap = new Map(progressData.map((p) => [p.achievement_id, p]));

  const handleDownloadCertificate = async (achievementId: string, title: string) => {
    try {
      // TODO: Implement certificate download from backend
      const response = await fetch(`/api/v1/achievements/certificates/${achievementId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to download certificate');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${achievementId}-certificate.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('Certificate downloaded');
      trackEvent({
        action: 'certificate_downloaded',
        category: 'achievements',
        label: title,
      });
    } catch (error) {
      toast.error('Failed to download certificate');
    }
  };

  const handleShareLinkedIn = (achievement: Achievement) => {
    const text = `I just earned the "${achievement.title}" achievement on Open Agent School! 🎉`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=600');

    toast.success('Opening LinkedIn share...');
    trackEvent({
      action: 'achievement_shared_linkedin',
      category: 'achievements',
      label: achievement.title,
    });
  };

  const filteredAchievements = ACHIEVEMENTS.filter((achievement) => {
    // Filter by category
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) {
      return false;
    }

    // Filter by tab
    const isUnlocked = unlockedIds.has(achievement.id);
    if (activeTab === 'unlocked' && !isUnlocked) return false;
    if (activeTab === 'locked' && isUnlocked) return false;
    if (activeTab === 'certificates' && !achievement.certificate_eligible) return false;

    return true;
  });

  const stats = {
    total: ACHIEVEMENTS.length,
    unlocked: unlockedIds.size,
    progress: Math.round((unlockedIds.size / ACHIEVEMENTS.length) * 100),
    points: userAchievements.reduce((sum, a) => {
      const achievement = ACHIEVEMENTS.find((ach) => ach.id === a.achievement_id);
      return sum + (achievement?.points || 0);
    }, 0),
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="text-center p-12">
          <Trophy size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Sign In to View Achievements</h2>
          <p className="text-gray-600 mb-6">
            Track your learning journey and earn achievements as you master AI agent concepts.
          </p>
          <Link to="/auth">
            <Button size="lg">Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Trophy size={40} className="text-amber-500" />
          Achievements
        </h1>
        <p className="text-gray-600">
          Track your progress and celebrate your learning milestones
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Achievements</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unlocked</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.unlocked}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Progress</CardDescription>
            <CardTitle className="text-3xl">{stats.progress}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={stats.progress} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Points</CardDescription>
            <CardTitle className="text-3xl text-amber-600">{stats.points}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Categories
        </Button>
        {Array.from(new Set(ACHIEVEMENTS.map((a) => a.category))).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All ({ACHIEVEMENTS.length})
          </TabsTrigger>
          <TabsTrigger value="unlocked">
            Unlocked ({stats.unlocked})
          </TabsTrigger>
          <TabsTrigger value="locked">
            Locked ({ACHIEVEMENTS.length - stats.unlocked})
          </TabsTrigger>
          <TabsTrigger value="certificates">
            Certificates ({certificates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {achievementsLoading || progressLoading ? (
            <div className="text-center py-12 text-gray-500">Loading achievements...</div>
          ) : filteredAchievements.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No achievements found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => {
                const isUnlocked = unlockedIds.has(achievement.id);
                const progress = progressMap.get(achievement.id);
                const userAchievement = userAchievements.find((ua) => ua.achievement_id === achievement.id);

                return (
                  <Card
                    key={achievement.id}
                    className={`${isUnlocked ? 'border-green-500 bg-green-50/50' : 'opacity-60'}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={RARITY_COLORS[achievement.rarity]}>
                            {RARITY_LABELS[achievement.rarity]}
                          </Badge>
                          {isUnlocked ? (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                              Unlocked
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-600">
                              <Lock size={12} className="mr-1" />
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Progress Bar */}
                      {!isUnlocked && progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {progress.current_value} / {progress.target_value}
                            </span>
                          </div>
                          <Progress value={progress.percentage} className="h-2" />
                        </div>
                      )}

                      {/* Unlocked Date */}
                      {isUnlocked && userAchievement && (
                        <div className="text-sm text-gray-600 mb-4">
                          Unlocked on {new Date(userAchievement.unlocked_at).toLocaleDateString()}
                        </div>
                      )}

                      {/* Points */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-amber-600">
                          {achievement.points} points
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {achievement.category}
                        </span>
                      </div>

                      {/* Actions */}
                      {isUnlocked && (
                        <div className="flex gap-2">
                          {achievement.certificate_eligible && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleDownloadCertificate(achievement.id, achievement.title)}
                            >
                              <Certificate size={16} className="mr-1" />
                              Certificate
                            </Button>
                          )}
                          {achievement.linkedin_shareable && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleShareLinkedIn(achievement)}
                            >
                              <Share size={16} className="mr-1" />
                              Share
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
