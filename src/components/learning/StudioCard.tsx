import React, { useState } from 'react';
import { progressStore } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';

interface StudioCardProps {
  moduleId: import('@/lib/learning/progressStore').ModuleId;
  studioId: string;
  title: string;
  description?: string;
}

export const StudioCard: React.FC<StudioCardProps> = ({ moduleId, studioId, title, description }) => {
  const [score, setScore] = useState<number | undefined>(progressStore.getStudioScore(moduleId, studioId)?.score);

  const grade = (val: number) => {
    const s = Math.max(0, Math.min(100, Math.round(val)));
    progressStore.setStudioScore(moduleId, studioId, s);
    setScore(s);
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">{title}</div>
        {typeof score === 'number' && (
          <span className="text-xs text-muted-foreground">Score: {score}</span>
        )}
      </div>
      {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" variant="outline" onClick={() => grade(80)}>Pass (80)</Button>
        <Button size="sm" variant="outline" onClick={() => grade(100)}>Excellent (100)</Button>
        <Button size="sm" variant="ghost" onClick={() => grade(0)}>Reset</Button>
      </div>
    </div>
  );
};

export default StudioCard;
