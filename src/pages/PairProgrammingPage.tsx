import { useState, useCallback, useMemo } from 'react';
import { PAIR_PROGRAMMING_EXERCISES, type PairProgrammingExercise, type CodeCheck } from '@/lib/data/pairProgrammingExercises';
import { trackEvent } from '@/lib/analytics/ga';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Play, Lightbulb, Eye, EyeSlash } from '@phosphor-icons/react';

interface CheckResult {
  label: string;
  passed: boolean;
  feedback: string;
}

function ExerciseSelector({
  exercises,
  selectedId,
  onSelect,
}: {
  exercises: PairProgrammingExercise[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <select
      value={selectedId}
      onChange={e => onSelect(e.target.value)}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {exercises.map(ex => (
        <option key={ex.id} value={ex.id}>
          {ex.title}
        </option>
      ))}
    </select>
  );
}

function ResultsPanel({ results }: { results: CheckResult[] }) {
  const passed = results.filter(r => r.passed).length;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={passed === results.length ? 'default' : 'secondary'}>
          {passed}/{results.length} checks passed
        </Badge>
      </div>
      {results.map((r, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 p-2 rounded-md text-sm ${
            r.passed
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300'
          }`}
        >
          {r.passed ? (
            <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
          ) : (
            <XCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-medium">{r.label}</span>
            {!r.passed && <p className="text-xs mt-0.5 opacity-80">{r.feedback}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PairProgrammingPage() {
  const [selectedId, setSelectedId] = useState(PAIR_PROGRAMMING_EXERCISES[0].id);
  const exercise = useMemo(
    () => PAIR_PROGRAMMING_EXERCISES.find(e => e.id === selectedId)!,
    [selectedId]
  );
  const [code, setCode] = useState(exercise.starterCode);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleSelectExercise = useCallback((id: string) => {
    trackEvent({ action: 'select_exercise', category: 'pair_programming', label: id });
    setSelectedId(id);
    const ex = PAIR_PROGRAMMING_EXERCISES.find(e => e.id === id)!;
    setCode(ex.starterCode);
    setResults(null);
    setShowHints(false);
  }, []);

  const runChecks = useCallback(() => {
    trackEvent({ action: 'run_checks', category: 'pair_programming', label: exercise.id });
    const checkResults: CheckResult[] = exercise.checks.map((check: CodeCheck) => ({
      label: check.label,
      passed: check.pattern.test(code),
      feedback: check.feedback,
    }));
    setResults(checkResults);
  }, [code, exercise]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">AI Pair Programming Studio</h1>
      <p className="text-muted-foreground mb-6">
        Practice writing agent code with guided exercises and instant feedback.
      </p>

      <div className="mb-4 max-w-xs">
        <ExerciseSelector
          exercises={PAIR_PROGRAMMING_EXERCISES}
          selectedId={selectedId}
          onSelect={handleSelectExercise}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left pane — instructions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{exercise.title}</CardTitle>
            <CardDescription>{exercise.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">Pattern: {exercise.solutionPattern}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHints(h => !h)}
              >
                {showHints ? <EyeSlash size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                {showHints ? 'Hide hints' : 'Show hints'}
              </Button>
            </div>
            {showHints && (
              <ul className="space-y-1 text-sm text-muted-foreground">
                {exercise.hints.map((hint, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Lightbulb size={14} className="shrink-0 mt-0.5 text-amber-500" />
                    {hint}
                  </li>
                ))}
              </ul>
            )}

            {results && (
              <div className="mt-4">
                <ResultsPanel results={results} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right pane — code editor */}
        <Card>
          <CardContent className="pt-6">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-72 rounded-md border border-input bg-muted/50 p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex items-center gap-2 mt-3">
              <Button onClick={runChecks}>
                <Play size={16} weight="fill" className="mr-1" /> Check My Code
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCode(exercise.starterCode);
                  setResults(null);
                }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
