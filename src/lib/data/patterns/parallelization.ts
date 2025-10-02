import { MediaAnalysisVisual } from '@/components/visualization/business-use-cases/MediaAnalysisVisual';
import { PatternData } from './types';

export const parallelizationPattern: PatternData = {
  id: 'parallelization',
  name: 'Parallelization',
  description: 'Executes multiple independent tasks concurrently to improve speed and efficiency.',
  category: 'Execution',
  useCases: ['Batch Data Processing', 'Multiple API Calls', 'Simultaneous Simulations'],
  whenToUse: 'Use this pattern when you have multiple tasks that do not depend on each other and can be executed at the same time. It is ideal for I/O-bound or computationally intensive tasks that can be run in parallel.',
  businessUseCase: {
    industry: 'Data Analytics',
    description: 'A data analytics company needs to process thousands of customer reviews daily to extract sentiment, identify key topics, and check for compliance violations. A single sequential process is too slow. By using the Parallelization pattern, they can process hundreds of reviews simultaneously, reducing the total processing time from hours to minutes.',
    enlightenMePrompt: 'Provide a technical guide on implementing parallel processing for AI agents using Python.',
    visualization: MediaAnalysisVisual,
  },
  nodes: [
    { id: 'task1', type: 'input', data: { label: 'Analyze Review 1' }, position: { x: 100, y: 100 } },
    { id: 'task2', type: 'default', data: { label: 'Analyze Review 2' }, position: { x: 300, y: 100 } },
    { id: 'task3', type: 'default', data: { label: 'Analyze Review 3' }, position: { x: 500, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Aggregate Results' }, position: { x: 700, y: 100 } }
  ],
  edges: [
    { id: 'e1-out', source: 'task1', target: 'output', animated: true },
    { id: 'e2-out', source: 'task2', target: 'output', animated: true },
    { id: 'e3-out', source: 'task3', target: 'output', animated: true }
  ],
  codeExample: `// Parallelization Pattern (TypeScript)
// Business Use Case: Analyze large batches of customer reviews concurrently to extract
// sentiment, topics, and compliance issues, dramatically reducing end-to-end latency.

interface ReviewAnalysis {
  sentiment: string;
  topics: string[];
  compliance_issues: string[];
  raw?: any;
}

// Stubbed LLM/tool call. Replace with real provider or vector service.
async function llmAnalyze(review: string): Promise<ReviewAnalysis> {
  // In real implementation, craft structured prompt & parse JSON.
  return Promise.resolve({
    sentiment: review.includes('love') ? 'positive' : review.includes('late') ? 'negative' : 'neutral',
    topics: ['shipping', 'value'].filter(t => review.toLowerCase().includes(t)),
    compliance_issues: [],
    raw: 'stub'
  });
}

// Analyze a single review.
async function analyzeReview(review: string): Promise<ReviewAnalysis> {
  return llmAnalyze(review);
}

// Concurrency controller (simple pool) to avoid overloading upstream APIs.
async function processReviewsInParallel(
  reviews: string[],
  maxConcurrency = 10
): Promise<ReviewAnalysis[]> {
  const results: ReviewAnalysis[] = [];
  let index = 0;
  let active = 0;

  return new Promise((resolve, reject) => {
    const launchNext = () => {
      if (index >= reviews.length && active === 0) {
        resolve(results);
        return;
      }
      while (active < maxConcurrency && index < reviews.length) {
        const current = reviews[index++];
        active++;
        analyzeReview(current)
          .then(r => results.push(r))
          .catch(err => results.push({ sentiment: 'unknown', topics: [], compliance_issues: ['analysis_error'], raw: err }))
          .finally(() => {
            active--;
            launchNext();
          });
      }
    };
    launchNext();
  });
}

// Aggregate sentiment & topic distribution across all analyses.
function aggregateAnalytics(analyses: ReviewAnalysis[]) {
  const sentimentCounts: Record<string, number> = {};
  const topicCounts: Record<string, number> = {};
  for (const a of analyses) {
    sentimentCounts[a.sentiment] = (sentimentCounts[a.sentiment] || 0) + 1;
    for (const t of a.topics) {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    }
  }
  return { sentimentCounts, topicCounts, total: analyses.length };
}

// Example (commented) showing how batch processing integrates with business workflow.
// async function runBatch() {
//   const customerReviews = [
//     'The product is amazing, I love it!',
//     'The shipping was late and the box was damaged.',
//     'Great value for the price, highly recommend.',
//     // ... thousands more
//   ];
//   const analyses = await processReviewsInParallel(customerReviews, 25);
//   const summary = aggregateAnalytics(analyses);
//   console.log('Summary:', summary);
// }
// runBatch();
`,
  implementation: [
    'Identify tasks that can be executed independently.',
    'Design a mechanism to distribute tasks across multiple workers or threads.',
    'Implement parallel execution using frameworks like asyncio or multiprocessing in Python.',
    'Aggregate results from all tasks after execution.',
    'Test and optimize for resource contention and performance.'
  ],
  advantages: [
    'Significantly reduces processing time for independent tasks.',
    'Optimizes resource utilization by running tasks concurrently.',
    'Improves scalability for large-scale operations.'
  ],
  limitations: [
    'Requires tasks to be independent and non-blocking.',
    'Increased complexity in managing parallel execution.',
    'Potential for resource contention if not managed properly.'
  ],
  relatedPatterns: [
    'Task Decomposition',
    'Pipeline Processing',
    'Load Balancing'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '2-4 hours',
    complexityReduction: 'Very High - async/await and Promise.all() in JavaScript eliminate threading complexity, 300+ LOC → 20 LOC',
    reusabilityScore: 10,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Parallel execution pattern ubiquitous in data processing, API aggregation, batch operations',
      'Architecture Templates - Built into all modern frameworks (asyncio, Promise.all, parallel mapping)',
      'Evaluation Automation - Latency P50/P95/P99 metrics standard for performance validation'
    ]
  }
};