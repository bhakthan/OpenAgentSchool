import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';

export const socraticCoachPattern: PatternData = {
  id: 'socratic-coach',
  name: 'Socratic Coach',
  description: 'Guides learners via questions rather than answers to build reasoning and recall.',
  category: 'Education',
  useCases: [
    'Concept mastery through questioning',
    'Exam prep without revealing answers',
    'Debugging guidance via prompts'
  ],
  whenToUse: 'Use when the learner is close to the solution and needs conceptual nudges, not direct answers.',
  nodes: [
    { id: 'input', type: 'input', data: { label: 'Learner Goal/Attempt', nodeType: 'input' }, position: { x: 50, y: 120 } },
    { id: 'llm1', type: 'default', data: { label: 'Coach (LLM)', nodeType: 'llm' }, position: { x: 280, y: 100 } },
    { id: 'hint', type: 'default', data: { label: 'Question/Hints', nodeType: 'output' }, position: { x: 520, y: 100 } },
    { id: 'reflection', type: 'default', data: { label: 'Learner Reflection', nodeType: 'input' }, position: { x: 750, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Next Step Unblocked', nodeType: 'output' }, position: { x: 1000, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'input', target: 'llm1', animated: true },
    { id: 'e2', source: 'llm1', target: 'hint', animated: true, label: 'Socratic Qs' },
    { id: 'e3', source: 'hint', target: 'reflection', animated: true },
    { id: 'e4', source: 'reflection', target: 'llm1', animated: true, label: 'Follow-up' },
    { id: 'e5', source: 'llm1', target: 'output', animated: true }
  ],
  implementation: [
    'Capture learner goal and current attempt',
    'Generate 1–3 targeted questions without revealing the answer',
    'Iterate based on learner reflections',
    'Stop when learner states they can proceed or shows understanding'
  ],
  advantages: [
    'Builds durable understanding and recall',
    'Avoids answer over-reliance',
    'Encourages metacognition'
  ],
  limitations: [
    'Slower than giving answers',
    'Needs good question design',
    'May frustrate in time-critical contexts'
  ],
  relatedPatterns: ['Evaluator-Optimizer', 'Self-Reflection'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '3-6 hours',
    complexityReduction: 'Low - Shifts from answer delivery to question scaffolding, requires careful prompt engineering',
    reusabilityScore: 8,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Pedagogical pattern for coding labs, tutoring systems, interview prep, professional development',
      'Architecture Templates - Azure OpenAI + conversation history for progressive hint scaffolding',
      'Evaluation Automation - Student mastery improvement, hint effectiveness, engagement metrics, pass rate changes'
    ]
  },

  businessUseCase: {
    industry: 'EdTech',
    description: 'A university LMS integrates Socratic Coach in coding labs to nudge students with targeted questions instead of solutions. This reduces plagiarism, increases conceptual mastery, and improves pass rates in intro CS courses.',
    visualization: LearningVisualization,
    enlightenMePrompt: `Propose a safe Socratic coaching service for a programming course.

Requirements:
- Prompt policy: never reveal full answers; generate 1–3 questions tied to rubric competencies
- Context ingestion: student attempt, unit objectives, recent errors
- Telemetry: hint efficacy and time-to-unblock
- Abuse prevention: limit frequency, escalate to TA when stuck
Provide API routes and a minimal TypeScript/Python sketch.`
  },
  codeExample: '// Minimal Socratic Coach loop (TypeScript)\n' +
    'type CoachTurn = { questions: string[]; hint?: string };\n\n' +
    'export async function socraticCoach(goal: string, attempt: string): Promise<CoachTurn> {\n' +
    '  // Generate 1–3 questions that target the gap; do not reveal the answer\n' +
    "  const prompt = 'You are a Socratic coach. ' +\n" +
    "                  'Goal: ' + goal + '\\n' + 'Attempt: ' + attempt + '\\n' +\n" +
    "                  'Ask 1–3 concise questions to guide the learner. Avoid giving the answer. Optionally include a small hint.';\n" +
    '  const response = await llm(prompt); // assume llm(text) => string\n' +
    "  const questions = response.split('\\n').filter(Boolean).slice(0, 3);\n" +
    '  return { questions };\n' +
    '}\n\n' +
    'async function llm(input: string): Promise<string> {\n' +
    "  // placeholder for actual LLM call\n" +
    "  return 'What is the invariant?\\nWhich assumption might be false?\\nCan you restate the goal in your own words?';\n" +
    '}\n',
  pythonCodeExample: "# Minimal Socratic Coach loop (Python)\n" +
    "from typing import List, Dict\n\n" +
    "def llm(prompt: str) -> str:\n" +
    "    # placeholder for actual LLM call\n" +
    "    return (\"What is the invariant?\\n\"\n" +
    "            \"Which assumption might be false?\\n\"\n" +
    "            \"Can you restate the goal in your own words?\")\n\n" +
    "def socratic_coach(goal: str, attempt: str) -> Dict[str, List[str]]:\n" +
    "    prompt = (\"You are a Socratic coach. \"\n" +
    "              f\"Goal: {goal}\\n\"\n" +
    "              f\"Attempt: {attempt}\\n\"\n" +
    "              \"Ask 1–3 concise questions to guide the learner. Avoid giving the answer.\")\n" +
    "    response = llm(prompt)\n" +
    "    questions = [q for q in response.split('\\n') if q][:3]\n" +
    "    return { 'questions': questions }\n",
};
