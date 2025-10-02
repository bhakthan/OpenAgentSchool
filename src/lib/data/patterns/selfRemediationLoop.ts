import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import { TestGenerationVisual } from '@/components/visualization/business-use-cases/TestGenerationVisual';

export const selfRemediationLoopPattern: PatternData = {
  id: 'self-remediation-loop',
  name: 'Self‑Remediation Loop',
  description: 'Agent generates tests/checks, runs them, and proposes corrections until green.',
  category: 'Education',
  useCases: ['Student submissions', 'CI preflight checks'],
  whenToUse: 'Use when code “works on my machine” but lacks tests or reliability.',
  nodes: [
    { id: 'spec', type: 'input', data: { label: 'Task Spec + Code', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'tester', type: 'default', data: { label: 'Test Generator/Runner', nodeType: 'executor' }, position: { x: 320, y: 100 } },
    { id: 'patcher', type: 'default', data: { label: 'Patch Proposer', nodeType: 'llm' }, position: { x: 620, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Green Tests + Explanation', nodeType: 'output' }, position: { x: 920, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'spec', target: 'tester', animated: true },
    { id: 'e2', source: 'tester', target: 'patcher', animated: true },
    { id: 'e3', source: 'patcher', target: 'tester', animated: true, label: 'Iterate' },
    { id: 'e4', source: 'tester', target: 'output', animated: true },
  ],
  implementation: [
    'Generate failing tests from spec and code',
    'Propose minimal patches to address failures',
    'Loop until tests pass or max iterations reached',
    'Explain root cause and fix applied',
  ],
  advantages: ['Improves reliability', 'Teaches testing discipline'],
  limitations: ['Sandbox required to run tests safely'],
  relatedPatterns: ['Evaluator-Optimizer', 'Self-Reflection'],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '4-8 hours',
    complexityReduction: 'High - Automates test-driven debugging, reduces manual test writing by 60-80%',
    reusabilityScore: 9,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Testing pattern for code generation, educational platforms, CI/CD pipelines, automated grading',
      'Architecture Templates - GitHub Actions + Azure OpenAI provide test generation and fix application',
      'Evaluation Automation - Test pass rate, fix validity, student learning outcomes, code quality improvement metrics',
      'Failure Scenario Libraries - Infinite loops, unsafe fixes, sandbox escapes documented with mitigation'
    ]
  },

  businessUseCase: {
    industry: 'EdTech',
    description: 'University autograders adopt Self‑Remediation Loop to generate failing tests from specs and guide students to green via minimal patches, improving test literacy and code robustness.',
    visualization: TestGenerationVisual,
    enlightenMePrompt: `Propose a safe test-and-fix loop for student repos.

Cover:
- Test generation policy and mutation safety
- Sandboxed execution (containers) with resource limits
- Patch suggestions with diffs and rationales
- Limits and escalation to instructor after N failed loops`
  },
  codeExample: `// Loop skeleton (TypeScript)
export async function remediate(spec: string, code: string) {
  for (let i = 0; i < 3; i++) {
    const failing = ['should handle null']; // placeholder
    if (!failing.length) break;
    // propose patch
    // apply patch (omitted)
  }
  return { ok: true };
}
`,
  pythonCodeExample: `# Loop skeleton (Python)
def remediate(spec: str, code: str):
    for _ in range(3):
        failing = ['should handle null']  # placeholder
        if not failing:
            break
        # propose and apply patch (omitted)
    return { 'ok': True }
`,
};
