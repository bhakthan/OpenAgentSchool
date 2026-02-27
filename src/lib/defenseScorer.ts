import type { RubricCheck } from '@/lib/data/attackLibrary';

export interface ScoringResult {
  score: number;
  feedback: string[];
  checkResults: { checkId: string; passed: boolean; points: number }[];
}

function checkKeywords(defense: string, keywords: string[]): boolean {
  const lower = defense.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

function checkMaxLength(defense: string, maxLength: number): boolean {
  return defense.length <= maxLength;
}

function checkPolicyStatement(defense: string, keywords: string[]): boolean {
  const lower = defense.toLowerCase();
  const hasKeyword = keywords.some((kw) => lower.includes(kw.toLowerCase()));
  const hasDirective = /\b(must|shall|will|should|always|never)\b/i.test(defense);
  return hasKeyword && hasDirective;
}

export function scoreDefense(
  userDefense: string,
  rubricChecks: RubricCheck[]
): ScoringResult {
  if (!userDefense.trim()) {
    return {
      score: 0,
      feedback: ['Defense is empty. Write a guardrail or system prompt to protect the agent.'],
      checkResults: rubricChecks.map((c) => ({
        checkId: c.id,
        passed: false,
        points: 0,
      })),
    };
  }

  const totalWeight = rubricChecks.reduce((sum, c) => sum + c.weight, 0);
  const feedback: string[] = [];
  const checkResults: { checkId: string; passed: boolean; points: number }[] = [];
  let earnedWeight = 0;

  for (const rc of rubricChecks) {
    let passed = false;

    switch (rc.check) {
      case 'keyword':
        passed = checkKeywords(userDefense, rc.keywords ?? []);
        break;
      case 'max-length':
        passed = checkMaxLength(userDefense, rc.maxLength ?? 2000);
        break;
      case 'policy-statement':
        passed = checkPolicyStatement(userDefense, rc.keywords ?? []);
        break;
    }

    if (passed) {
      earnedWeight += rc.weight;
      feedback.push(`✅ ${rc.label}`);
    } else {
      feedback.push(`❌ ${rc.label}`);
    }

    checkResults.push({
      checkId: rc.id,
      passed,
      points: passed ? rc.weight : 0,
    });
  }

  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return { score, feedback, checkResults };
}
