import { Headphones, Clock, Fire, Trophy } from '@phosphor-icons/react';
import type { ListeningProfile } from '@/lib/data/microListening/types';

interface ListeningStatsProps {
  profile: ListeningProfile;
}

export function ListeningStats({ profile }: ListeningStatsProps) {
  const stats = [
    {
      icon: <Headphones size={24} weight="duotone" className="text-indigo-400" />,
      value: profile.totalEpisodesCompleted,
      label: 'Episodes',
    },
    {
      icon: <Clock size={24} weight="duotone" className="text-cyan-400" />,
      value: profile.totalMinutesListened,
      label: 'Minutes Listened',
    },
    {
      icon: <Fire size={24} weight="fill" className="text-orange-400" />,
      value: profile.currentStreak,
      label: 'Day Streak',
    },
    {
      icon: <Trophy size={24} weight="fill" className="text-amber-400" />,
      value: profile.unlockedAchievements.length,
      label: 'Achievements',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon, value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 backdrop-blur"
        >
          {icon}
          <span className="text-2xl font-extrabold text-foreground">{value}</span>
          <span className="text-xs font-medium text-foreground/60 dark:text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
