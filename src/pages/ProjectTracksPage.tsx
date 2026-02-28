import { useState, useMemo } from 'react';
import { PROJECT_TRACKS, type ProjectTrack } from '@/lib/data/projectTracks';
import { getTrackProgress, completeMilestone, uncompleteMilestone } from '@/lib/trackProgress';
import { trackEvent } from '@/lib/analytics/ga';
import { buildLearnerSnapshot } from '@/lib/phase1/phase1Lab';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, ArrowLeft, CheckCircle, Circle, Lightbulb, Code, ChatCircle } from '@phosphor-icons/react';

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const checkTypeIcons: Record<string, React.ReactNode> = {
  quiz: <Lightbulb size={16} weight="duotone" />,
  code: <Code size={16} weight="duotone" />,
  reflection: <ChatCircle size={16} weight="duotone" />,
};

function ReadinessBar() {
  const snapshot = useMemo(() => buildLearnerSnapshot(), []);
  const readiness = Math.min(
    100,
    Math.round(
      snapshot.quiz.averageScore * 0.4 +
      (snapshot.studyCompleted / Math.max(1, snapshot.studySessions)) * 100 * 0.3 +
      Math.min(snapshot.streak, 7) / 7 * 100 * 0.3
    )
  );
  return (
    <div className="mb-6 p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Your Readiness Score</span>
        <span className="text-sm font-bold">{readiness}%</span>
      </div>
      <Progress value={readiness} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">
        Based on quizzes ({snapshot.quiz.totalQuizzes}), study sessions ({snapshot.studyCompleted}/{snapshot.studySessions}), and {snapshot.streak}-day streak.
      </p>
    </div>
  );
}

function TrackCard({ track, onSelect }: { track: ProjectTrack; onSelect: () => void }) {
  const completed = getTrackProgress(track.id);
  const pct = Math.round((completed.length / track.milestones.length) * 100);
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onSelect}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{track.title}</CardTitle>
          <Badge className={difficultyColors[track.difficulty]}>{track.difficulty}</Badge>
        </div>
        <CardDescription>{track.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>~{track.estimatedHours}h</span>
          <span>{completed.length}/{track.milestones.length} milestones</span>
        </div>
        <Progress value={pct} className="h-2" />
        {pct === 100 && (
          <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <Trophy size={16} weight="fill" /> Completed!
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrackDetail({ track, onBack }: { track: ProjectTrack; onBack: () => void }) {
  const [completed, setCompleted] = useState<string[]>(getTrackProgress(track.id));

  const toggle = (milestoneId: string) => {
    trackEvent({ action: completed.includes(milestoneId) ? 'uncomplete_milestone' : 'complete_milestone', category: 'project_tracks', label: track.id + '/' + milestoneId });
    if (completed.includes(milestoneId)) {
      setCompleted(uncompleteMilestone(track.id, milestoneId));
    } else {
      setCompleted(completeMilestone(track.id, milestoneId));
    }
  };

  const pct = Math.round((completed.length / track.milestones.length) * 100);

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <ArrowLeft size={16} className="mr-1" /> Back to tracks
      </Button>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-bold">{track.title}</h2>
        <Badge className={difficultyColors[track.difficulty]}>{track.difficulty}</Badge>
      </div>
      <p className="text-muted-foreground mb-4">{track.description}</p>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <span>~{track.estimatedHours} hours</span>
        <span>•</span>
        <span>{completed.length}/{track.milestones.length} complete</span>
      </div>
      <Progress value={pct} className="h-2 mb-6" />

      <div className="space-y-3">
        {track.milestones.map((m) => {
          const done = completed.includes(m.id);
          return (
            <Card
              key={m.id}
              className={`cursor-pointer transition-colors ${done ? 'border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20' : ''}`}
              onClick={() => toggle(m.id)}
            >
              <CardContent className="flex items-start gap-3 py-4">
                {done ? (
                  <CheckCircle size={22} weight="fill" className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <Circle size={22} className="text-muted-foreground mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${done ? 'line-through text-muted-foreground' : ''}`}>{m.title}</span>
                    <span className="text-muted-foreground">{checkTypeIcons[m.checkType]}</span>
                    <Badge variant="outline" className="text-xs">{m.checkType}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectTracksPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTrack = PROJECT_TRACKS.find(t => t.id === selectedId);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Real-World Project Tracks</h1>
      <p className="text-muted-foreground mb-6">
        Apply what you've learned by building real agent projects from start to finish.
      </p>

      <ReadinessBar />

      {selectedTrack ? (
        <TrackDetail track={selectedTrack} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECT_TRACKS.map(track => (
            <TrackCard key={track.id} track={track} onSelect={() => setSelectedId(track.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
