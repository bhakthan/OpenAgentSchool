import { describe, it, expect } from 'vitest';
import { patternMasteryBands, allMasteryPatternIds } from '../src/lib/data/studyMode/patternMastery';
import { debugChallenges } from '../src/lib/data/studyMode/debugChallenges';
import { scenarioLibrary } from '../src/lib/data/studyMode/interactiveScenarios';
import { a2aSocraticQuestions, mcpSocraticQuestions, multiAgentSocraticQuestions } from '../src/lib/data/studyMode/socraticQuestions';

// Content Ops Guardrails (#20)
describe('Study Mode content guardrails', () => {
  const socraticByPattern = new Set([...a2aSocraticQuestions, ...mcpSocraticQuestions, ...multiAgentSocraticQuestions].map(q => q.conceptId));
  const debugByPattern = new Set(debugChallenges.map(c => c.conceptId));
  const scenarioByPattern = new Set<string>();
  Object.values(scenarioLibrary).forEach((arr: any) => {
    (arr as any[]).forEach(q => { if (q?.conceptId) scenarioByPattern.add(q.conceptId); });
  });
  const masteryByPattern = new Set(allMasteryPatternIds);

  it('reports patterns lacking any learning asset (non-fatal)', () => {
    const missing: string[] = [];
    for (const pid of allMasteryPatternIds) {
      const hasScenario = scenarioByPattern.has(pid);
      const hasDebug = debugByPattern.has(pid);
      const hasSocratic = socraticByPattern.has(pid);
      if (!(hasScenario || hasDebug || hasSocratic)) missing.push(pid);
    }
    // Non-fatal assertion: ensure no more than 5 missing to allow incremental build out
    expect(missing.length).toBeLessThanOrEqual(5);
  });

  it('each mastery pattern has 4 tiers (redundant safety)', () => {
    const grouped: Record<string, number> = {};
    for (const band of patternMasteryBands) grouped[band.patternId] = (grouped[band.patternId]||0)+1;
    for (const pid of allMasteryPatternIds) expect(grouped[pid]).toBe(4);
  });
});
