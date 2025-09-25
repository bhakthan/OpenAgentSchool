import { AdaptiveRule, adaptiveRules } from './adaptiveRules';
import { StudyModeSession } from './types';

// Runtime evaluation: inspect recent responses for triggers instead of raw score threshold (# refine adaptive rule triggers)
export function evaluateAdaptiveRules(session: StudyModeSession, recentSessions: StudyModeSession[]): AdaptiveRule[] {
  const matches: AdaptiveRule[] = [];
  const recentSamePattern = recentSessions.filter(s => s.conceptId === session.conceptId).slice(-5);
  adaptiveRules.forEach(rule => {
    if (rule.trigger.patternId !== session.conceptId) return;
    // Count failures / missteps by interpreting isCorrect flags
    const failures = recentSamePattern.reduce((acc,s) => acc + s.responses.filter(r => r.isCorrect === false).length, 0);
    const threshold = rule.trigger.threshold ?? 1;
    if (failures >= threshold) matches.push(rule);
  });
  return matches;
}
