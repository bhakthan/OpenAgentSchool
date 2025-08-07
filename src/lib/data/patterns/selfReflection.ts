import { PatternData } from './types';
import { HealthcareScribeVisual } from '@/components/visualization/business-use-cases/HealthcareScribeVisual';

export const selfReflectionPattern: PatternData = {
  id: 'self-reflection',
  name: 'Self-Reflection',
  description: 'Agents that can reflect on their own outputs and improve them through self-critique and iteration.',
  category: 'Advanced',
  useCases: ['Content Quality Improvement', 'Error Correction', 'Iterative Refinement'],
  whenToUse: 'Use Self-Reflection when output quality is critical and can benefit from iterative improvement. This pattern is ideal for content creation, code review, academic writing, or any scenario where the agent should evaluate and refine its own work to meet higher standards.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'generator',
      type: 'default',
      data: { label: 'Generator', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'critic',
      type: 'default',
      data: { label: 'Critic', nodeType: 'evaluator' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'refiner',
      type: 'default',
      data: { label: 'Refiner', nodeType: 'llm' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'generator', animated: true },
    { id: 'e2-3', source: 'generator', target: 'critic', animated: true },
    { id: 'e2-4', source: 'generator', target: 'refiner', animated: true },
    { id: 'e3-4', source: 'critic', target: 'refiner', animated: true },
    { id: 'e4-2', source: 'refiner', target: 'generator', animated: true, label: 'Iterate' },
    { id: 'e4-5', source: 'refiner', target: 'output' }
  ],
  evaluation: `Evaluation of a Self-Reflection agent is multi-faceted. The quality of the final output is paramount, but the reflection process itself is also key.
- **Final Output Quality:** Use an "LLM as Judge" to score the final, refined output against the initial output. The score improvement is a direct measure of the reflection process's value.
- **Critique Quality:** How effective is the self-critique? A good critique is specific, actionable, and correctly identifies flaws. This can be evaluated by humans or a high-capability "judge" LLM.
- **Convergence Rate:** How many iterations does it take to reach an "APPROVED" state? Faster convergence is a sign of an efficient reflection process.
- **Score Accuracy:** If the agent self-scores, how well does its internal score correlate with an external evaluator's score? This measures the agent's self-awareness.`,
  businessUseCase: {
    industry: 'Healthcare',
    description: 'An AI-powered clinical scribe uses the Self-Reflection pattern to improve the quality of medical notes. After transcribing a doctor-patient conversation, the agent generates an initial draft. Then, its "Critic" persona reviews the draft against a rubric checking for clinical accuracy, use of proper medical terminology, and completeness. The "Refiner" persona then rewrites the note to address the critique. This cycle repeats until the note is deemed accurate and compliant, significantly reducing the administrative workload on physicians and improving the quality of patient records.',
    visualization: HealthcareScribeVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing a HIPAA-compliant "AI Clinical Scribe" using the Self-Reflection pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram for a HIPAA-compliant solution on Azure.
      - Components: Azure AI Speech for transcription, a secure Azure Function App to host the agent, Azure Key Vault for secrets, and Azure Cosmos DB for storing notes with encryption at rest and in transit.
      - Emphasize the network security, including private endpoints and VNet integration.

      ### 2. Self-Reflection Agent: Implementation
      - Provide a Python code example for the core self-reflection loop (Generate, Critique, Refine).
      - Show the structure of the "Critique" prompt, including specific checks for medical accuracy, billing codes (e.g., ICD-10), and clarity.
      - Detail how to manage the iteration history.

      ### 3. Data Handling & Compliance
      - Explain how to de-identify Protected Health Information (PHI) using Azure AI Language's PII detection before sending data to the LLM, and how to re-identify it in the secure environment.
      - Discuss logging and audit trails for HIPAA compliance.

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for this high-stakes environment.
      - **Clinical Accuracy:** Use a panel of medical experts to review a sample of final notes and compare them to the source transcript (gold standard).
      - **Metric:** Define a "Note Quality Score" (NQS) based on a rubric, and measure the score improvement from the initial draft to the final version.
      - **Efficiency:** Track the number of iterations and time required to produce a final note.

      ### 5. Fine-Tuning & Customization
      - Discuss the strategy for fine-tuning a base model (like GPT-4) on a private, curated dataset of high-quality medical notes to improve its performance and reduce reflection cycles.
      - Explain the importance of using a private Azure OpenAI endpoint for this process.
    `
  },
  codeExample: `// Clinical Scribe Self-Reflection implementation (TypeScript)
// Goal: Generate -> Critique -> Refine loop with convergence on quality.

interface ReflectionIteration { draft: string; critique: string; score: number; refined: string; }
interface CritiqueResult { issues: string[]; suggestions: string[]; score: number; approved: boolean; }

async function llm(prompt: string): Promise<string> {
  if (prompt.includes('CRITIQUE')) return 'ISSUES: missing allergy section; suggestions: add vitals summary; SCORE:0.72';
  if (prompt.includes('REFINE')) return 'Refined clinical note with allergy section and vitals.';
  return 'Initial draft clinical note capturing chief complaint and assessment.';
}

async function generateDraft(transcript: string): Promise<string> {
  const prompt = 'Draft a concise, structured clinical note from the transcript. Focus on Chief Complaint, HPI, Assessment.\nTRANSCRIPT:\n' + transcript;
  return llm(prompt);
}

function buildCritiquePrompt(draft: string): string {
  return 'CRITIQUE MODE\nEvaluate the draft clinical note against: correctness, completeness, terminology, structure.\nReturn format: ISSUES:<comma list>; suggestions:<semicolon separated>; SCORE:<0-1 float>.\nDRAFT:\n' + draft;
}

function parseCritique(raw: string): CritiqueResult {
  const issuesMatch = raw.match(/ISSUES:(.*?)(?:suggestions:|SCORE:|$)/i);
  const suggestionsMatch = raw.match(/suggestions:(.*?)(?:SCORE:|$)/i);
  const scoreMatch = raw.match(/SCORE:(0?\.\d+|1\.0+)/i);
  const issues = issuesMatch ? issuesMatch[1].split(/[,;]+/).map(s => s.trim()).filter(Boolean) : [];
  const suggestions = suggestionsMatch ? suggestionsMatch[1].split(/[,;]+/).map(s => s.trim()).filter(Boolean) : [];
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
  return { issues, suggestions, score, approved: score >= 0.9 };
}

function buildRefinementPrompt(draft: string, critique: CritiqueResult): string {
  return 'REFINE MODE\nYou are improving a clinical note. Address issues and suggestions precisely. Preserve factual content.\nISSUES:' + critique.issues.join('; ') + '\nSUGGESTIONS:' + critique.suggestions.join('; ') + '\nCURRENT DRAFT:\n' + draft + '\nReturn only the improved draft.';
}

export async function runSelfReflectingClinicalScribe(transcript: string, maxIterations = 5, targetScore = 0.9) {
  const history: ReflectionIteration[] = [];
  let currentDraft = await generateDraft(transcript);
  for (let i = 1; i <= maxIterations; i++) {
    const critiquePrompt = buildCritiquePrompt(currentDraft);
    const rawCritique = await llm(critiquePrompt);
    const critique = parseCritique(rawCritique);
    const refinementPrompt = buildRefinementPrompt(currentDraft, critique);
    const refined = await llm(refinementPrompt);
    history.push({ draft: currentDraft, critique: rawCritique, score: critique.score, refined });
    currentDraft = refined;
    if (critique.approved || critique.score >= targetScore) {
      return { status: 'approved', iterations: i, finalNote: currentDraft, history };
    }
  }
  return { status: 'max_iterations', iterations: maxIterations, finalNote: currentDraft, history };
}
`,
  pythonCodeExample: `# Clinical Scribe Self-Reflection implementation (Python)\nfrom typing import List, Dict, Any\nimport re\n\nasync def llm(prompt: str) -> str:\n    if 'CRITIQUE' in prompt: return 'ISSUES: missing allergy section; suggestions: add vitals summary; SCORE:0.72'\n    if 'REFINE' in prompt: return 'Refined clinical note with allergy section and vitals.'\n    return 'Initial draft clinical note capturing chief complaint and assessment.'\n\nasync def generate_draft(transcript: str) -> str:\n    prompt = 'Draft a concise, structured clinical note from the transcript. Focus on Chief Complaint, HPI, Assessment.\nTRANSCRIPT:\n' + transcript\n    return await llm(prompt)\n\ndef build_critique_prompt(draft: str) -> str:\n    return ('CRITIQUE MODE\nEvaluate the draft clinical note against: correctness, completeness, terminology, structure.\n'\n            'Return format: ISSUES:<comma list>; suggestions:<semicolon separated>; SCORE:<0-1 float>.\nDRAFT:\n' + draft)\n\ndef parse_critique(raw: str) -> Dict[str, Any]:\n    issues_match = re.search(r'ISSUES:(.*?)(suggestions:|SCORE:|$)', raw, re.I)\n    suggestions_match = re.search(r'suggestions:(.*?)(SCORE:|$)', raw, re.I)\n    score_match = re.search(r'SCORE:(0?\\.\\d+|1\\.0+)', raw)\n    issues = [s.strip() for s in re.split(r'[,;]+', issues_match.group(1)) if s.strip()] if issues_match else []\n    suggestions = [s.strip() for s in re.split(r'[,;]+', suggestions_match.group(1)) if s.strip()] if suggestions_match else []\n    score = float(score_match.group(1)) if score_match else 0.0\n    return { 'issues': issues, 'suggestions': suggestions, 'score': score, 'approved': score >= 0.9 }\n\ndef build_refinement_prompt(draft: str, critique: Dict[str, Any]) -> str:\n    return ('REFINE MODE\nYou are improving a clinical note. Address issues and suggestions precisely. Preserve factual content.\n'\n            + 'ISSUES:' + '; '.join(critique['issues']) + '\nSUGGESTIONS:' + '; '.join(critique['suggestions']) + '\nCURRENT DRAFT:\n' + draft + '\nReturn only the improved draft.')\n\nasync def run_self_reflecting_clinical_scribe(transcript: str, max_iterations: int = 5, target_score: float = 0.9):\n    history: List[Dict[str, Any]] = []\n    current_draft = await generate_draft(transcript)\n    for i in range(1, max_iterations + 1):\n        critique_prompt = build_critique_prompt(current_draft)\n        raw_critique = await llm(critique_prompt)\n        critique = parse_critique(raw_critique)\n        refinement_prompt = build_refinement_prompt(current_draft, critique)\n        refined = await llm(refinement_prompt)\n        history.append({'draft': current_draft, 'critique': raw_critique, 'score': critique['score'], 'refined': refined})\n        current_draft = refined\n        if critique['approved'] or critique['score'] >= target_score:\n            return { 'status': 'approved', 'iterations': i, 'finalNote': current_draft, 'history': history }\n    return { 'status': 'max_iterations', 'iterations': max_iterations, 'finalNote': current_draft, 'history': history }\n`,
  implementation: [
    'Create generation-critique-refinement cycle',
    'Implement quality scoring and approval criteria',
    'Build feedback integration and improvement logic',
    'Add iteration tracking and history management',
    'Create termination conditions for quality thresholds',
    'Implement different critique perspectives',
    'Add meta-cognitive reasoning capabilities',
    'Build learning from previous iterations'
  ],
  advantages: [
    'Significantly improves the quality and accuracy of the final output.',
    'Can correct its own errors without human intervention.',
    'The critique process provides transparency into how the agent is improving its work.',
    'Can be adapted to meet very high or specific quality standards.'
  ],
  limitations: [
    'Increases latency and cost due to the iterative, multi-step process.',
    'The quality of the self-critique is crucial; a poor critic cannot lead to good refinement.',
    'May get stuck in refinement loops if the criteria for completion are not well-defined.',
    'Requires sophisticated prompt engineering to create effective generator and critic personas.'
  ],
  relatedPatterns: [
    'react-agent',
    'agent-evaluation',
    'prompt-chaining'
  ]
};