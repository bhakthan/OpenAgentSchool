import { Fire, Check } from '@phosphor-icons/react';

interface StreakFlameProps {
  streak: number;
  dailyGoal: number;
  todayMinutes: number;
}

export function StreakFlame({ streak, dailyGoal, todayMinutes }: StreakFlameProps) {
  const progress = dailyGoal > 0 ? Math.min(todayMinutes / dailyGoal, 1) : 0;
  const goalReached = todayMinutes >= dailyGoal;

  // SVG circle math
  const size = 96;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Progress ring with flame inside */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted dark:text-gray-700"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="text-emerald-500 transition-all duration-700"
          />
        </svg>

        {/* Flame icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Fire
            size={36}
            weight="fill"
            className={streak > 0 ? 'text-orange-400' : 'text-muted-foreground'}
            style={streak > 0 ? { animation: 'flameFlicker 1.5s ease-in-out infinite' } : undefined}
          />
        </div>
      </div>

      <style>{`
        @keyframes flameFlicker {
          0%   { transform: scale(1);    opacity: 1;   }
          25%  { transform: scale(1.08); opacity: 0.9; }
          50%  { transform: scale(1);    opacity: 1;   }
          75%  { transform: scale(1.05); opacity: 0.95;}
          100% { transform: scale(1);    opacity: 1;   }
        }
      `}</style>

      {/* Streak count */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className={`text-3xl font-extrabold ${
            streak > 0
              ? 'bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'
              : 'text-muted-foreground'
          }`}
        >
          {streak}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {streak > 0 ? 'day streak' : 'Start your streak!'}
        </span>
      </div>

      {/* Goal status */}
      {goalReached ? (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <Check size={14} weight="bold" />
          Daily goal reached!
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">
          {todayMinutes}/{dailyGoal} min today
        </span>
      )}
    </div>
  );
}
