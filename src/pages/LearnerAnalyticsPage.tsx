import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { buildLearnerSnapshot } from '@/lib/phase1/phase1Lab';
import { getDeckStats, getDueCards } from '@/lib/spaced-repetition/store';
import { MOCK_CONCEPTS } from '@/data/mockConcepts';
import { ChartLine, Trophy, Clock, Fire, Brain, ArrowRight } from '@phosphor-icons/react';

export default function LearnerAnalyticsPage() {
  const snapshot = useMemo(() => buildLearnerSnapshot(), []);
  const srStats = useMemo(() => getDeckStats(), []);
  const dueConceptIds = useMemo(
    () => getDueCards(MOCK_CONCEPTS.map(c => c.id)).slice(0, 5),
    []
  );
  const dueConcepts = useMemo(
    () => dueConceptIds.map(id => MOCK_CONCEPTS.find(c => c.id === id)).filter(Boolean),
    [dueConceptIds]
  );

  const levelColor = snapshot.level === 'advanced' ? 'text-emerald-500' : snapshot.level === 'intermediate' ? 'text-amber-500' : 'text-blue-500';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ChartLine size={28} className="text-primary" /> Learning Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Self-serve view of your quiz trends, study streaks, and spaced repetition progress.
        </p>
      </div>

      {/* Hero stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground">Level</div>
          <div className={`text-xl font-bold capitalize ${levelColor}`}>{snapshot.level}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Trophy size={12} /> Best Score</div>
          <div className="text-xl font-bold">{snapshot.quiz.bestScore}%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><ChartLine size={12} /> Average</div>
          <div className="text-xl font-bold">{snapshot.quiz.averageScore}%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Fire size={12} /> Streak</div>
          <div className="text-xl font-bold">{snapshot.streak} day{snapshot.streak !== 1 ? 's' : ''}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Clock size={12} /> Time</div>
          <div className="text-xl font-bold">{Math.round(snapshot.quiz.totalTimeSpent / 60)}m</div>
        </Card>
      </div>

      {/* Quiz & Study breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quiz Progress</CardTitle>
            <CardDescription>{snapshot.quiz.totalQuizzes} quizzes across {snapshot.quiz.categoriesCompleted.length} categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Score trend</span>
                <span>{snapshot.quiz.averageScore}%</span>
              </div>
              <Progress value={snapshot.quiz.averageScore} />
            </div>
            <div className="flex flex-wrap gap-1">
              {snapshot.quiz.categoriesCompleted.map(cat => (
                <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
              ))}
              {snapshot.quiz.categoriesCompleted.length === 0 && (
                <span className="text-xs text-muted-foreground">No categories completed yet</span>
              )}
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to="/quiz">Take a quiz <ArrowRight size={14} className="ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Study Sessions</CardTitle>
            <CardDescription>{snapshot.studyCompleted} of {snapshot.studySessions} sessions completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completion rate</span>
                <span>{snapshot.studySessions > 0 ? Math.round((snapshot.studyCompleted / snapshot.studySessions) * 100) : 0}%</span>
              </div>
              <Progress value={snapshot.studySessions > 0 ? (snapshot.studyCompleted / snapshot.studySessions) * 100 : 0} />
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to="/study-mode">Open Study Mode <ArrowRight size={14} className="ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Spaced Repetition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Brain size={18} /> Spaced Repetition</CardTitle>
          <CardDescription>
            {srStats.total} concepts tracked · {srStats.due} due for review · {srStats.mastered} mastered
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {dueConcepts.length > 0 ? (
            <>
              <div className="text-sm font-medium">Due for review now:</div>
              <div className="flex flex-wrap gap-2">
                {dueConcepts.map(concept => (
                  <Badge key={concept!.id} variant="outline" className="text-xs">
                    {concept!.title}
                  </Badge>
                ))}
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              {srStats.total === 0
                ? 'Complete quizzes or study sessions to populate your review deck.'
                : 'All caught up! No concepts due for review right now. 🎉'}
            </div>
          )}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Mastery</span>
              <span>{srStats.total > 0 ? Math.round((srStats.mastered / srStats.total) * 100) : 0}%</span>
            </div>
            <Progress value={srStats.total > 0 ? (srStats.mastered / srStats.total) * 100 : 0} />
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/phase1-lab">Open Phase 1 Lab</Link></Button>
        <Button asChild variant="outline"><Link to="/quiz">Take a Quiz</Link></Button>
        <Button asChild variant="outline"><Link to="/study-mode">Study Mode</Link></Button>
        <Button asChild variant="outline"><Link to="/patterns">Explore Patterns</Link></Button>
      </div>
    </div>
  );
}
