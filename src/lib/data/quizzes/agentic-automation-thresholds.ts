// Quiz questions for Agentic Automation Thresholds concept
// Covers: Cost collapse, boring middle, hidden overhead, diagnostic loops, chain multiplier

import type { QuizQuestion } from './types';

export const agenticAutomationThresholdsQuestions: QuizQuestion[] = [
  {
    id: 'automation-thresholds-1',
    question: 'Why does the traditional "ROI gate" for automation fail in the agentic era?',
    options: [
      'Because agents are unreliable',
      'Because setup cost collapses to near-zero, making frequency irrelevant',
      'Because management no longer approves automation projects',
      'Because agents can only automate simple tasks'
    ],
    correctAnswer: 1,
    explanation: 'Traditional ROI math compares setup cost vs. time saved × frequency. When agents make setup cost ≈ 0 (a natural-language prompt), any task becomes in-scope regardless of how often it occurs.',
    difficulty: 'beginner',
    category: 'cost'
  },
  {
    id: 'automation-thresholds-2',
    question: 'What is the "boring middle" in the automation spectrum?',
    options: [
      'Tasks that are too boring for anyone to do',
      'Medium-priority backlog items',
      'Tasks too nuanced for scripts but too simple for a dedicated hire — describable but not scriptable',
      'The middle tier of model pricing'
    ],
    correctAnswer: 2,
    explanation: 'The boring middle (~55% of work) consists of tasks that require judgment beyond if/else logic but are routine enough that hiring specifically for them is unjustified. Agents unlock this zone because they accept intent descriptions, not specifications.',
    difficulty: 'beginner',
    category: 'architecture'
  },
  {
    id: 'automation-thresholds-3',
    question: 'A developer says a task takes 15 minutes. What is the typical REAL cost including hidden overhead?',
    options: [
      '15 minutes exactly',
      '20 minutes (minor overhead)',
      '45-50 minutes (context switching, coordination, tool lookup, error recovery)',
      '2 hours (including meetings)'
    ],
    correctAnswer: 2,
    explanation: 'The "15-minute task iceberg" reveals hidden costs: context switch in (~8 min), tool/doc lookup (~3 min), coordination/Slack (~12 min), context switch out (~5 min), error recovery (~7 min). Total: ~50 min. Agents eliminate the 35 min of overhead.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'automation-thresholds-4',
    question: 'Why does a 5-step agent chain provide 13× speedup instead of just 5×?',
    options: [
      'Agents run steps in parallel',
      'Coordination overhead compounds at every handoff — agents eliminate the overhead between steps',
      'Each agent step is optimized separately',
      'The comparison uses different measurement units'
    ],
    correctAnswer: 1,
    explanation: 'For humans, each step in a chain adds ~25 min of overhead (context switch, find docs, find tools, coordinate). In a 5-step chain: 41 min of task time + 125 min of overhead = 166 min human vs. 12 min agent. The multiplier grows with chain length.',
    difficulty: 'intermediate',
    category: 'architecture'
  },
  {
    id: 'automation-thresholds-5',
    question: 'What is the "diagnostic loop" insight from Tier 4 of automation thresholds?',
    options: [
      'Agents should self-diagnose errors',
      'Logging is essential for debugging',
      'Agent failure points map exactly where human judgment is genuinely needed — everything else was habit',
      'Agents need health check endpoints'
    ],
    correctAnswer: 2,
    explanation: 'The meta-level insight: by delegating workflows to agents, the places where agents fail or need human intervention reveal where your expertise truly lives. Everything they handle successfully was judgment that was merely habit, not genuine reasoning.',
    difficulty: 'advanced',
    category: 'architecture'
  },
  {
    id: 'automation-thresholds-6',
    question: 'In the agentic model, what is the ONLY gate for whether to delegate a task?',
    options: [
      'Whether it runs more than 10 times per year',
      'Whether there is budget approval',
      'Whether you can describe the intent clearly',
      'Whether there is an existing API for it'
    ],
    correctAnswer: 2,
    explanation: 'The new decision function: should_delegate(task) returns can_describe_intent(task). Setup cost ≈ 0, failure cost ≈ 0 (recoverable state), coordination cost eliminated. The only requirement is describable intent.',
    difficulty: 'beginner',
    category: 'cost'
  },
  {
    id: 'automation-thresholds-7',
    question: 'Which common misreading leads teams to miss the largest automation surface area?',
    options: [
      'Over-investing in expensive models',
      'Treating "describe" as insufficient — waiting to fully specify before delegating',
      'Using too many agents',
      'Not having enough test coverage'
    ],
    correctAnswer: 1,
    explanation: 'The Tier 2 misreading: teams wait to produce full specifications before delegating. But the 55% boring middle doesn\'t need specs — it needs intent descriptions. "I\'ll do it myself" is the most expensive sentence in engineering.',
    difficulty: 'intermediate',
    category: 'architecture'
  },
  {
    id: 'automation-thresholds-8',
    question: 'What is the correct sequence for adopting agentic automation thresholds?',
    options: [
      'Build tools → write specs → deploy agents → measure ROI',
      'Drop the ROI gate → Describe, don\'t decompose → Count coordination, not tasks → Read the edges as your map',
      'Start with the hardest tasks → work down to easy ones',
      'Automate everything → roll back failures'
    ],
    correctAnswer: 1,
    explanation: 'The four tiers build on each other: (1) accept that setup cost is zero, (2) delegate by description not specification, (3) realize overhead > task time, (4) use agent boundaries to map genuine judgment needs.',
    difficulty: 'advanced',
    category: 'architecture'
  },
  {
    id: 'automation-thresholds-9',
    question: 'An engineer has a one-off task to rename 400 files. Under the old ROI model, they wouldn\'t automate it. Under the agentic model, what changes?',
    options: [
      'Nothing — one-off tasks still aren\'t worth it',
      'They should hire a contractor',
      'A natural-language prompt costs ~$0.02 and takes 90 seconds — frequency is irrelevant when setup cost ≈ 0',
      'They should write a bash script for future use'
    ],
    correctAnswer: 2,
    explanation: 'This is the Tier 1 insight in action. Traditional ROI: 2 hours of scripting for a one-off = not worth it. Agentic model: "Rename all *.log files with ISO date prefix" → 90 seconds, $0.02. The cost equation collapses entirely.',
    difficulty: 'beginner',
    category: 'cost'
  },
  {
    id: 'automation-thresholds-10',
    question: 'What does "cheap failure" change about automation strategy?',
    options: [
      'Nothing — failure should always be avoided',
      'It enables experimentation: when failure is recoverable and low-cost, the range of tasks worth attempting expands dramatically',
      'It means you should accept lower quality',
      'It eliminates the need for testing'
    ],
    correctAnswer: 1,
    explanation: 'Cheap failure (recoverable state + low token cost) replaces the traditional "project the ROI before attempting" approach. Teams can try agent delegation on uncertain tasks because the downside is a few cents and seconds, not days of wasted engineering.',
    difficulty: 'intermediate',
    category: 'cost'
  }
];

export const agenticAutomationThresholdsTimeEstimate = 15; // minutes
