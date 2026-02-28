/**
 * ReflectionPrompt — reusable metacognition component
 *
 * WHY: Instructional design principle #6 (Metacognition) shows that
 * "Pause and Reflect" prompts dramatically increase knowledge retention.
 * Learners who self-question before moving to the next section transfer
 * concepts more effectively.
 *
 * USAGE:
 *   <ReflectionPrompt question="How would you apply this pattern to your current project?" />
 *   <ReflectionPrompt question="Before looking at the comparison, predict which approach is cheaper." hint="Think about token costs vs. latency." />
 */
import { Lightbulb } from 'lucide-react';

interface ReflectionPromptProps {
  /** The reflection question learners should consider */
  question: string;
  /** Optional hint or nudge to guide thinking */
  hint?: string;
  /** Optional custom emoji/icon label (default: "🧠 Pause and Reflect") */
  label?: string;
}

export function ReflectionPrompt({ question, hint, label }: ReflectionPromptProps) {
  return (
    <div
      role="note"
      aria-label={label || 'Pause and Reflect'}
      className="my-6 rounded-xl border border-teal-200 bg-teal-50/60 p-5 dark:border-teal-800 dark:bg-teal-950/40"
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        <span>{label || '🧠 Pause and Reflect'}</span>
      </div>
      <p className="text-base leading-relaxed text-foreground/90">{question}</p>
      {hint && (
        <p className="mt-2 text-sm italic text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export default ReflectionPrompt;
