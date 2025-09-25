import { StudyModeQuestion } from './types';

export const compositeScenarioQuestions: StudyModeQuestion[] = [
  {
    id: 'fusion-replay-perception',
    type: 'scenario',
    conceptId: 'strategy-memory-replay',
    title: 'Replay Decision Under Partial Perception Drift',
    level: 'advanced',
    scenario: {
      id: 'fusion-replay-perception-s',
      title: 'Selective Adaptation Challenge',
      description: 'Evaluate which sub-plan segments to adapt when 2/6 perception hashes changed.',
      context: 'Historical plan segments: ingestion, normalization, join, aggregate, summarize, export. Hash deltas on normalization & join due to upstream format tweak.',
      stakeholders: ['platform','analytics'],
      challenges: [
        {
          id: 'segment-identification',
          title: 'Identify Impacted Segments',
          description: 'Choose which segments require adaptation.',
          question: 'Which segments MUST be adapted?',
          type: 'multiple-choice',
          options: [
            'Only normalization',
            'Normalization and join',
            'All segments',
            'Aggregate only'
          ],
          correctAnswer: 1,
          feedback: 'Normalization and join depend on changed upstream formats; others remain stable.',
          hints: ['Look at direct data shape dependencies.']
        },
        {
          id: 'reuse-vs-rebuild',
          title: 'Reuse Strategy',
          description: 'Decide reuse scope.',
          question: 'Best approach for plan reuse?',
          type: 'multiple-choice',
          options: [
            'Full rebuild to be safe',
            'Selective adaptation of changed segments',
            'Blind reuse of full plan',
            'Discard history and start new baseline'
          ],
          correctAnswer: 1,
          feedback: 'Selective adaptation preserves efficiency while managing drift.',
          hints: ['Avoid unnecessary rebuild cost.']
        }
      ],
      outcomes: [
        { id: 'optimal', condition: 'All challenges correct', result: 'Efficient targeted adaptation chosen', explanation: 'You minimized cost while ensuring correctness.' },
        { id: 'suboptimal', condition: 'Any incorrect', result: 'Over- or under-adaptation risk', explanation: 'Review which segments depend on drifted data.' }
      ],
      conceptId: 'strategy-memory-replay',
      difficulty: 'advanced',
      estimatedTime: '7 minutes',
      learningOutcomes: ['Assess drift impact', 'Optimize reuse vs rebuild']
    },
    explanation: 'Evaluates combining perception drift analysis with strategic reuse decisions.',
    relatedConcepts: ['perception-normalization','strategy-memory-replay'],
    successCriteria: ['Correct impacted segment identification','Selective adaptation chosen']
  }
];
