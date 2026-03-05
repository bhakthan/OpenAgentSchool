import { useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import type { ListeningAchievement } from '@/lib/data/microListening/types';

interface AchievementToastProps {
  achievement: ListeningAchievement | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div
      className="fixed right-4 top-4 z-50 min-w-80 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-900/90 to-orange-900/90 p-4 shadow-2xl backdrop-blur-xl"
      style={{ animation: 'toastSlideIn 0.4s ease-out' }}
    >
      {/* Sparkle particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-300"
            style={{
              top: `${20 + i * 18}%`,
              left: `${10 + i * 22}%`,
              animation: `sparkle 1.5s ease-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes toastSlideIn {
          0%   { transform: translateX(120%); opacity: 0; }
          100% { transform: translateX(0);    opacity: 1; }
        }
        @keyframes sparkle {
          0%   { transform: scale(0) translateY(0);   opacity: 1; }
          50%  { transform: scale(1.5) translateY(-8px); opacity: 0.8; }
          100% { transform: scale(0) translateY(-16px);  opacity: 0; }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={onDismiss}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        aria-label="Dismiss achievement"
      >
        <X size={14} weight="bold" />
      </button>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className="text-3xl" role="img" aria-label="Achievement icon">
          {achievement.icon}
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            Achievement Unlocked!
          </p>
          <p className="mt-0.5 text-base font-bold text-white">{achievement.title}</p>
          <p className="mt-0.5 text-sm text-amber-200/70">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}
