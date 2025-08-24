// src/lib/data/quizzes/agent-evaluation.ts
import { QuizQuestion } from './types';

export const agentEvaluationQuestions: QuizQuestion[] = [
  {
    id: 'eval-i1',
    text: 'What is the primary goal of agent evaluation?',
    question: 'What is the primary goal of agent evaluation?',
    options: [
      'To ensure the agent uses the latest AI models.',
      'To measure the agent\'s performance, reliability, and effectiveness against a set of benchmarks or goals.',
      'To increase the complexity of the agent\'s architecture.',
      'To reduce the operational cost of the agent, regardless of performance.'
    ],
    correctAnswer: 1,
    explanation: 'Agent evaluation is the systematic process of assessing an agent\'s performance to ensure it is effective, reliable, and aligned with its intended objectives. This involves using specific metrics and benchmarks.',
    difficulty: 'intermediate',
    category: 'agent-evaluation',
    subCategory: 'fundamentals',
    relatedTopics: ['benchmarking', 'performance-metrics', 'agent-testing'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'eval-a1',
    text: 'You are evaluating a customer service agent. Which set of metrics is most appropriate?',
    question: 'You are evaluating a customer service agent. Which set of metrics is most appropriate?',
    options: [
      'Code complexity, deployment time, and CPU usage.',
      'Number of programming languages supported and API response time.',
      'Task completion rate, user satisfaction (CSAT), and resolution time.',
      'The agent\'s ability to generate creative text and images.'
    ],
    correctAnswer: 2,
    explanation: 'For a customer service agent, the most important metrics relate to its ability to perform its job effectively. This includes whether it can complete the tasks it\'s designed for, how satisfied users are, and how quickly it can resolve issues.',
    difficulty: 'advanced',
    category: 'agent-evaluation',
    subCategory: 'metrics',
    relatedTopics: ['csat', 'kpis', 'task-completion'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect', 'business-leader'],
    timeEstimate: 50
  },
  {
    id: 'eval-a2',
    text: 'Consider the following Python code for evaluating an agent\'s response. What is this evaluation method called?',
    question: 'Consider the following Python code for evaluating an agent\'s response. What is this evaluation method called?',
    codeExample: "def evaluate_agent(agent_response, ground_truth):\n    # BLEU score is often used for translation quality\n    # but can be adapted for text generation tasks.\n    from nltk.translate.bleu_score import sentence_bleu\n    \n    reference = [ground_truth.split()]\n    candidate = agent_response.split()\n    \n    score = sentence_bleu(reference, candidate, weights=(0.25, 0.25, 0.25, 0.25))\n    return score > 0.75 # Returns True if score is above a threshold",
    options: [
      'Human-in-the-loop evaluation.',
      'A/B testing.',
      'Heuristic-based evaluation.',
      'Model-based evaluation using a similarity metric (BLEU score).'
    ],
    correctAnswer: 3,
    explanation: 'This code uses a pre-defined metric (BLEU score) to automatically evaluate the agent\'s output against a "ground truth" reference. This is a form of model-based or metric-based evaluation, which is automated and scalable.',
    difficulty: 'advanced',
    category: 'agent-evaluation',
    subCategory: 'techniques',
    relatedTopics: ['bleu-score', 'automated-evaluation', 'nlp'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 60
  }
];
