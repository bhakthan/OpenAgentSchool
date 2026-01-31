// Quiz questions for Agent Testing & Benchmarks concept
// Covers: SWE-Bench, GAIA, evaluation frameworks, testing strategies

import type { QuizQuestion } from '../quizzes';

export const agentTestingBenchmarksQuestions: QuizQuestion[] = [
  {
    id: 'testing-1',
    conceptId: 'agent-testing-benchmarks',
    question: 'What does SWE-Bench evaluate?',
    options: [
      'Language translation quality',
      'Agent ability to solve real-world GitHub issues',
      'Image generation',
      'Speech recognition'
    ],
    correctAnswer: 1,
    explanation: 'SWE-Bench tests agents on their ability to fix real bugs from GitHub repositories, requiring code understanding, localization, and patch generation.',
    difficulty: 'beginner',
    category: 'benchmarks'
  },
  {
    id: 'testing-2',
    conceptId: 'agent-testing-benchmarks',
    question: 'Why is deterministic evaluation important for agent benchmarks?',
    options: [
      'It makes tests run faster',
      'It ensures reproducible results for meaningful comparisons',
      'It reduces API costs',
      'It improves model training'
    ],
    correctAnswer: 1,
    explanation: 'Non-deterministic evaluation (high temperature, no seeding) produces inconsistent scores. Deterministic settings enable reliable comparison between model versions.',
    difficulty: 'intermediate',
    category: 'benchmarks'
  },
  {
    id: 'testing-3',
    conceptId: 'agent-testing-benchmarks',
    question: 'What is the purpose of GAIA benchmark?',
    options: [
      'Testing basic arithmetic',
      'Evaluating multi-step reasoning with real-world tool use',
      'Measuring response speed',
      'Assessing creative writing'
    ],
    correctAnswer: 1,
    explanation: 'GAIA (General AI Assistants) tests complex tasks requiring multiple steps, tool usage, and reasoning—like researching, calculating, and synthesizing information.',
    difficulty: 'intermediate',
    category: 'benchmarks'
  },
  {
    id: 'testing-4',
    conceptId: 'agent-testing-benchmarks',
    question: 'What is "task success rate" in agent evaluation?',
    options: [
      'How fast tasks complete',
      'The percentage of tasks completed correctly according to success criteria',
      'User satisfaction score',
      'The number of API calls'
    ],
    correctAnswer: 1,
    explanation: 'Task success rate measures what percentage of test tasks the agent completes correctly. It\'s a primary metric but should be combined with efficiency and safety metrics.',
    difficulty: 'beginner',
    category: 'benchmarks'
  },
  {
    id: 'testing-5',
    conceptId: 'agent-testing-benchmarks',
    question: 'Why should you test agents with adversarial inputs?',
    options: [
      'To improve training data',
      'To discover failure modes and security vulnerabilities',
      'To make benchmarks harder',
      'To reduce costs'
    ],
    correctAnswer: 1,
    explanation: 'Adversarial testing reveals how agents handle malicious inputs, edge cases, and attempts to break the system—essential for production safety.',
    difficulty: 'intermediate',
    category: 'benchmarks'
  },
  {
    id: 'testing-6',
    conceptId: 'agent-testing-benchmarks',
    question: 'What is a "golden dataset" in agent evaluation?',
    options: [
      'A dataset with gold-colored labels',
      'A curated set of test cases with verified correct answers',
      'The most expensive dataset',
      'A training dataset'
    ],
    correctAnswer: 1,
    explanation: 'Golden datasets contain test inputs paired with verified correct outputs. They enable automated scoring and regression detection.',
    difficulty: 'beginner',
    category: 'benchmarks'
  },
  {
    id: 'testing-7',
    conceptId: 'agent-testing-benchmarks',
    question: 'What does "pass@k" measure in code generation benchmarks?',
    options: [
      'Password strength',
      'Probability that at least one of k generated solutions is correct',
      'Number of test passes',
      'Keyboard shortcuts'
    ],
    correctAnswer: 1,
    explanation: 'pass@k measures if the agent can produce at least one correct solution when given k attempts. Higher k values show the model\'s capability ceiling; pass@1 shows practical performance.',
    difficulty: 'advanced',
    category: 'benchmarks'
  },
  {
    id: 'testing-8',
    conceptId: 'agent-testing-benchmarks',
    question: 'How should you handle flaky tests in agent evaluation?',
    options: [
      'Remove them from the test suite',
      'Run multiple times and use statistical analysis (mean, CI)',
      'Ignore the results',
      'Always use the best score'
    ],
    correctAnswer: 1,
    explanation: 'Flaky tests should be run multiple times. Report mean scores with confidence intervals. Only flag regressions when differences exceed statistical significance.',
    difficulty: 'intermediate',
    category: 'benchmarks'
  },
  {
    id: 'testing-9',
    conceptId: 'agent-testing-benchmarks',
    question: 'What is "contamination" in benchmark evaluation?',
    options: [
      'Security vulnerabilities in tests',
      'Test data appearing in the model\'s training set',
      'Bugs in the evaluation code',
      'Corrupted test files'
    ],
    correctAnswer: 1,
    explanation: 'Contamination occurs when benchmark examples leak into training data, leading to inflated scores that don\'t reflect real capability. Use held-out or dynamically generated tests.',
    difficulty: 'advanced',
    category: 'benchmarks'
  },
  {
    id: 'testing-10',
    conceptId: 'agent-testing-benchmarks',
    question: 'What should a comprehensive agent test suite include?',
    options: [
      'Only success rate metrics',
      'Functional tests, safety tests, performance tests, and regression tests',
      'Only manual testing',
      'Only unit tests'
    ],
    correctAnswer: 1,
    explanation: 'Complete test suites cover functionality (does it work?), safety (can it be exploited?), performance (is it fast/cheap enough?), and regression (did new changes break old functionality?).',
    difficulty: 'intermediate',
    category: 'benchmarks'
  }
];

export const agentTestingBenchmarksTimeEstimate = 12; // minutes
