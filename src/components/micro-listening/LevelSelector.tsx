import type { ListeningLevel } from '@/lib/data/microListening/types';

interface LevelSelectorProps {
  activeLevel: ListeningLevel;
  onSelect: (level: ListeningLevel) => void;
  availableLevels?: ListeningLevel[];
}

const levels: { key: ListeningLevel; label: string; dot: string; activeBg: string }[] = [
  { key: 'beginner', label: 'Beginner', dot: 'bg-emerald-500', activeBg: 'bg-emerald-500' },
  { key: 'intermediate', label: 'Intermediate', dot: 'bg-blue-500', activeBg: 'bg-blue-500' },
  { key: 'advanced', label: 'Advanced', dot: 'bg-purple-500', activeBg: 'bg-purple-500' },
  { key: 'expert', label: 'Expert', dot: 'bg-amber-500', activeBg: 'bg-amber-500' },
];

export function LevelSelector({ activeLevel, onSelect, availableLevels }: LevelSelectorProps) {
  return (
    <div className="inline-flex gap-1.5 rounded-full bg-muted/50 p-1 dark:bg-white/5" role="tablist">
      {levels.map(({ key, label, dot, activeBg }) => {
        const isActive = activeLevel === key;
        const isDisabled = availableLevels ? !availableLevels.includes(key) : false;

        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            disabled={isDisabled}
            onClick={() => onSelect(key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200
              ${
                isActive
                  ? `${activeBg} text-white shadow-lg`
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/10'
              }
              ${isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
            `}
          >
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
