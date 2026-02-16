import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { addCheckpoint } from '@/lib/data/studyMode/unknownsTracker';

interface ConfusionCheckpointProps {
  conceptId: string;
  studyModeType?: string;
  /** Called after user selects an option and sees the reframe */
  onDismiss?: () => void;
  className?: string;
}

interface CheckpointOption {
  level: 1 | 2 | 3 | 4;
  emoji: string;
  label: string;
  reframe: string;
}

const options: CheckpointOption[] = [
  {
    level: 1,
    emoji: '😊',
    label: 'Got it',
    reframe: 'Great — but test yourself: can you explain it without looking? If yes, solid mastery. If not, you just found a desirable difficulty.',
  },
  {
    level: 2,
    emoji: '🤔',
    label: 'Processing',
    reframe: 'Perfect. This feeling means your brain is encoding deeply. The slower it feels, the more durable the learning. Stay with it.',
  },
  {
    level: 3,
    emoji: '😵‍💫',
    label: 'Confused',
    reframe: 'This is the most valuable signal. You\'ve found your learning edge — the exact boundary where growth happens. Stay here a bit longer.',
  },
  {
    level: 4,
    emoji: '🧠',
    label: 'Don\'t know what I don\'t know',
    reframe: 'Awareness of that gap is metacognition in action. Most people don\'t even reach this level of self-awareness. You just leveled up.',
  },
];

const ConfusionCheckpoint: React.FC<ConfusionCheckpointProps> = ({
  conceptId,
  studyModeType,
  onDismiss,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState<CheckpointOption | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const handleSelect = useCallback((option: CheckpointOption) => {
    setSelectedOption(option);
    addCheckpoint(conceptId, option.level, studyModeType);
  }, [conceptId, studyModeType]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  if (dismissed) return null;

  return (
    <Card className={cn(
      'border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20',
      'animate-in fade-in slide-in-from-bottom-2 duration-300',
      className
    )}>
      <CardContent className="pt-5 pb-4">
        {!selectedOption ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Quick check: How are you feeling about this right now?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {options.map((opt) => (
                <Button
                  key={opt.level}
                  variant="outline"
                  size="sm"
                  className="h-auto py-2 px-3 flex flex-col items-center gap-1 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                  onClick={() => handleSelect(opt)}
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="text-xs">{opt.label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{selectedOption.emoji}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedOption.reframe}
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-xs text-muted-foreground"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfusionCheckpoint;
