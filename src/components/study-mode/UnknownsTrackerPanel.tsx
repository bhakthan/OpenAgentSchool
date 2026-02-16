import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Question, Lightning, CheckCircle, CaretDown, CaretUp, Trash
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import {
  getUnresolved,
  getResolved,
  getUnknownsStats,
  resolveUnknown,
  removeUnknown,
  type LearningUnknown,
} from '@/lib/data/studyMode/unknownsTracker';

const confusionLabels: Record<number, { emoji: string; label: string }> = {
  1: { emoji: '😊', label: 'Got it' },
  2: { emoji: '🤔', label: 'Processing' },
  3: { emoji: '😵‍💫', label: 'Confused' },
  4: { emoji: '🧠', label: 'Unknown unknown' },
};

const UnknownsTrackerPanel: React.FC = () => {
  const [unresolved, setUnresolved] = useState<LearningUnknown[]>([]);
  const [resolved, setResolved] = useState<LearningUnknown[]>([]);
  const [stats, setStats] = useState(getUnknownsStats());
  const [breakthroughsOpen, setBreakthroughsOpen] = useState(false);

  const refresh = useCallback(() => {
    setUnresolved(getUnresolved());
    setResolved(getResolved());
    setStats(getUnknownsStats());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleResolve = (id: string) => {
    resolveUnknown(id);
    refresh();
  };

  const handleRemove = (id: string) => {
    removeUnknown(id);
    refresh();
  };

  // Don't show if there's no data yet
  if (stats.totalIdentified === 0) {
    return (
      <Card className="border-amber-200 dark:border-amber-800/50 bg-amber-50/30 dark:bg-amber-950/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <Question className="w-5 h-5" />
            What I Don't Know Yet
          </CardTitle>
          <CardDescription className="text-sm">
            Use the "I don't understand this yet" button on any concept page to start tracking your learning edges.
            Identifying what you don't know is the first step to mastery.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const edgePercentage = stats.totalIdentified > 0 
    ? (stats.activeEdges / stats.totalIdentified) * 100 
    : 0;

  return (
    <Card className="border-amber-200 dark:border-amber-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <Question className="w-5 h-5" />
            What I Don't Know Yet
          </CardTitle>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{stats.activeEdges} active edge{stats.activeEdges !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{stats.breakthroughs} breakthrough{stats.breakthroughs !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Identified {stats.totalIdentified} unknown{stats.totalIdentified !== 1 ? 's' : ''}</span>
            <span>{Math.round(stats.resolutionRate * 100)}% resolved</span>
          </div>
          <Progress value={stats.resolutionRate * 100} className="h-1.5 [&>div]:bg-amber-500" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Active edges */}
        {unresolved.length > 0 && (
          <div className="space-y-2">
            {unresolved.map((u) => {
              const cl = confusionLabels[u.confusionLevel] || confusionLabels[3];
              return (
                <div
                  key={u.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{cl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] py-0 h-4">
                        {u.conceptId}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(u.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      onClick={() => handleResolve(u.id)}
                      title="I get it now!"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs">Got it</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(u.id)}
                      title="Remove"
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Progress framing — the flipped narrative */}
        {stats.activeEdges > 0 && (
          <div className="flex items-start gap-2 p-2 rounded-lg text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-400">
            <Lightning className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>
              {edgePercentage > 60
                ? "You're actively mapping your uncertainty — this is the most productive phase of learning."
                : edgePercentage > 30
                ? "Strong progress — you're resolving unknowns and building deep understanding."
                : "Most of your unknowns are resolved. Time to explore new concepts and find fresh edges."}
            </span>
          </div>
        )}

        {/* Breakthroughs section */}
        {resolved.length > 0 && (
          <Collapsible open={breakthroughsOpen} onOpenChange={setBreakthroughsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lightning className="w-3.5 h-3.5 text-emerald-500" />
                  {resolved.length} Breakthrough{resolved.length !== 1 ? 's' : ''}
                </span>
                {breakthroughsOpen ? <CaretUp className="w-3.5 h-3.5" /> : <CaretDown className="w-3.5 h-3.5" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1.5 mt-1">
              {resolved.map((u) => (
                <div
                  key={u.id}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg text-xs",
                    "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                  )}
                >
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate flex-1">{u.question}</span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {u.resolvedAt ? new Date(u.resolvedAt).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default UnknownsTrackerPanel;
