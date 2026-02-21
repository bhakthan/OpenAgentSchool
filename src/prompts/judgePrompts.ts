// Centralized prompt builders for Study Mode judges
import type {
  SocraticJudgeRequest,
  DebugJudgeRequest,
  ScenarioJudgeRequest,
  CriticalThinkingJudgeRequest,
} from '../lib/llmJudge';

// ── Shared helpers ──────────────────────────────────────────────────────────

/** Filter out empty/undefined lines and join with newlines */
function ctx(lines: (string | false | null | undefined | 0 | '')[]): string {
  return lines.filter(Boolean).join('\n');
}

/**
 * Shared scoring rubric used by all judge prompts.
 * Giving the LLM explicit score bands improves calibration consistency.
 */
const SCORING_RUBRIC = `
**Scoring Rubric (calibrate your score to these bands):**
- 90-100  Exceptional — deep conceptual mastery; connects ideas across domains; demonstrates original insight or creative transfer
- 75-89   Proficient — solid understanding of core concepts; clear reasoning with minor gaps; good application to context
- 60-74   Developing — partial understanding; some correct reasoning mixed with misconceptions; surface-level engagement
- 40-59   Beginning — minimal conceptual grasp; mostly surface recall or vague statements; limited reasoning shown
- 0-39    Needs support — significant misconceptions, off-topic, or near-empty response
Apply the rubric honestly — encouraging tone does NOT mean inflating the score. A student who writes two vague sentences should not score 75+.`.trim();

/**
 * Shared tone & output rules appended to every judge prompt.
 * Growth-mindset encouragement + strict JSON output.
 */
const SHARED_GUIDELINES = `
**Tone & Feedback Principles:**
- Lead with what the student did well before addressing gaps.
- Frame gaps as growth opportunities: "A strong next step would be…" not "You failed to…"
- Credit metacognitive signals — expressing confusion, doubt, or "I'm not sure" is a sophisticated skill, not weakness.
- Wrong answers are high-information moments: acknowledge the thinking behind them before correcting.
- Keep feedback actionable: every suggestion should be something the student can concretely try.
- Feedback should be 2-4 sentences. Suggestions, strengths, and improvements should each have 2-3 items.
- Base your assessment ONLY on what the student actually wrote. Do not infer knowledge they did not demonstrate.

**Output Rules — READ CAREFULLY:**
You MUST respond with ONLY a single valid JSON object. No preamble, no markdown fences, no explanation before or after the JSON. The first character of your response must be \`{\` and the last must be \`}\`.`.trim();

// ── Socratic Judge ──────────────────────────────────────────────────────────

export function buildSocraticJudgePrompt(request: SocraticJudgeRequest): string {
  const responses = request.userResponses.map((r, i) =>
    `Q${i + 1}: ${r.question}\nStudent: ${r.answer}`
  ).join('\n\n');

  return ctx([
    `You are a senior instructional designer assessing a Socratic learning session on "${request.conceptArea}".`,
    ``,
    `**Learning Context:**`,
    `- Main Question: ${request.question}`,
    `- Concept Area: ${request.conceptArea}`,
    `- Learning Objectives: ${request.learningObjectives.join('; ')}`,
    request.fullQuestionContext && `- Question Title: ${request.fullQuestionContext.title}`,
    request.fullQuestionContext?.description && `- Description: ${request.fullQuestionContext.description}`,
    request.difficulty && `- Difficulty: ${request.difficulty}`,
    (request.followUpQuestions?.length || request.expectedInsights?.length || request.prerequisites?.length || request.relatedConcepts?.length || request.questionDetails) && ``,
    request.followUpQuestions?.length && `- Follow-up Questions: ${request.followUpQuestions.join('; ')}`,
    request.expectedInsights?.length && `- Expected Key Insights: ${request.expectedInsights.join('; ')}`,
    request.prerequisites?.length && `- Prerequisites: ${request.prerequisites.join(', ')}`,
    request.relatedConcepts?.length && `- Related Concepts: ${request.relatedConcepts.join(', ')}`,
    request.questionDetails && `- Additional Details: ${request.questionDetails}`,
    ``,
    `**Student's Responses:**`,
    responses,
    ``,
    `**Your Task:**`,
    `Before producing your JSON, mentally consider: (a) what depth of reasoning did the student show? (b) which learning objectives did they address? (c) what misconceptions or gaps are visible?`,
    ``,
    `Evaluate for:`,
    `1. Depth of reasoning — did they go beyond surface definitions?`,
    `2. Concept connections${request.relatedConcepts?.length ? ` — especially to ${request.relatedConcepts.join(', ')}` : ''}`,
    `3. Learning progression — do later answers build on earlier ones?`,
    `4. Critical thinking — do they question assumptions or consider alternatives?`,
    request.expectedInsights?.length && `5. Progress toward expected insights: ${request.expectedInsights.join('; ')}`,
    ``,
    SCORING_RUBRIC,
    ``,
    `**Response Format (JSON only):**`,
    `{`,
    `  "score": <integer 0-100 per rubric>,`,
    `  "feedback": "<2-4 sentence assessment of their learning journey>",`,
    `  "suggestions": ["<specific, actionable suggestion>", "...2-3 total"],`,
    `  "insights": ["<key insight they demonstrated or should explore>", "...1-2 total"],`,
    `  "strengths": ["<specific strength shown>", "...2-3 total"],`,
    `  "improvements": ["<specific growth area>", "...1-2 total"]`,
    `}`,
    ``,
    SHARED_GUIDELINES,
  ]);
}

// ── Debug Judge ─────────────────────────────────────────────────────────────

export function buildDebugJudgePrompt(request: DebugJudgeRequest): string {
  const phaseCriteria: Record<string, string> = {
    analysis: [
      `- Systematic observation of symptoms and error patterns`,
      `- Quality of diagnostic questions asked`,
      `- Ability to distinguish relevant signals from noise`,
    ].join('\n'),
    diagnosis: [
      `- Accuracy of root-cause identification`,
      `- Logical reasoning from symptoms → cause`,
      `- Consideration of multiple hypotheses before concluding`,
    ].join('\n'),
    solution: [
      `- Addresses the identified root cause (not just symptoms)`,
      `- Implementation feasibility and completeness`,
      `- Consideration of edge cases and regression risks`,
    ].join('\n'),
  };

  return ctx([
    `You are a senior software engineer and debugging mentor evaluating a student's "${request.phase}" phase response.`,
    ``,
    `**Challenge:** ${request.challengeTitle}`,
    `${request.challengeDescription}`,
    ``,
    request.context.codeSnippet && `**Code Context:**\n\`\`\`\n${request.context.codeSnippet}\n\`\`\``,
    request.context.errorLogs?.length && `**Error Logs:** ${request.context.errorLogs.join(' | ')}`,
    request.context.expectedOutcome && `**Expected Outcome:** ${request.context.expectedOutcome}`,
    ``,
    // Optional rich details
    request.challengeDetails?.difficulty && `- Difficulty: ${request.challengeDetails.difficulty}`,
    request.challengeDetails?.technologies?.length && `- Technologies: ${request.challengeDetails.technologies.join(', ')}`,
    request.challengeDetails?.debuggingFocus?.length && `- Focus Areas: ${request.challengeDetails.debuggingFocus.join(', ')}`,
    request.challengeDetails?.brokenCode && `**Broken Code:**\n\`\`\`\n${request.challengeDetails.brokenCode}\n\`\`\``,
    request.challengeDetails?.workingCode && `**Working Code (reference):**\n\`\`\`\n${request.challengeDetails.workingCode}\n\`\`\``,
    request.challengeDetails?.expectedBehavior && `- Expected Behavior: ${request.challengeDetails.expectedBehavior}`,
    request.challengeDetails?.commonMistakes?.length && `- Common Mistakes: ${request.challengeDetails.commonMistakes.join('; ')}`,
    request.challengeDetails?.learningObjectives?.length && `- Learning Objectives: ${request.challengeDetails.learningObjectives.join('; ')}`,
    request.challengeDetails?.conversationLogs?.length && `**Conversation Logs:**\n${request.challengeDetails.conversationLogs.map(l => `[${l.type}] ${l.agent}: ${l.message}`).join('\n')}`,
    ``,
    `**Student's Response:**`,
    request.userResponse,
    ``,
    `**Phase-specific criteria for "${request.phase}":**`,
    phaseCriteria[request.phase] || '',
    ``,
    `Before producing JSON, mentally compare the student's response against (a) the criteria above, (b) the working code / expected behavior if provided, and (c) common mistakes.`,
    ``,
    SCORING_RUBRIC,
    ``,
    `**Response Format (JSON only):**`,
    `{`,
    `  "score": <integer 0-100 per rubric>,`,
    `  "feedback": "<2-4 sentence assessment of their debugging approach for this phase>",`,
    `  "suggestions": ["<actionable debugging suggestion>", "...2-3 total"],`,
    `  "insights": ["<debugging insight demonstrated or to explore>"],`,
    `  "strengths": ["<specific strength>", "...2-3 total"],`,
    `  "improvements": ["<specific growth area>", "...1-2 total"]`,
    `}`,
    ``,
    SHARED_GUIDELINES,
  ]);
}

// ── Scenario Judge ──────────────────────────────────────────────────────────

export function buildScenarioJudgePrompt(request: ScenarioJudgeRequest): string {
  const typeCriteria: Record<string, string> = {
    'multiple-choice': [
      `- Was the correct option selected?`,
      `- Does the reasoning match the concept behind the correct answer?`,
      `- Can the student explain why the other options are weaker?`,
    ].join('\n'),
    code: [
      `- Correctness and completeness of the implementation`,
      `- Appropriate use of language/framework idioms`,
      `- Code clarity and structure`,
    ].join('\n'),
    design: [
      `- Completeness of the design (covers key requirements)`,
      `- Sound architectural reasoning`,
      `- Practical feasibility and trade-off awareness`,
    ].join('\n'),
    analysis: [
      `- Depth and specificity of the analysis`,
      `- Integration of concepts from earlier steps`,
      `- Evidence of critical reasoning, not just recall`,
    ].join('\n'),
  };

  const previousStepsSummary = request.previousSteps?.length
    ? `**Previous Steps:**\n${request.previousSteps.map((s, i) =>
        `Step ${i + 1} — Q: ${s.question}\nA: ${s.userAnswer}\nFeedback: ${s.feedback}`
      ).join('\n\n')}`
    : '';

  return ctx([
    `You are an AI education specialist evaluating a student's ${request.isStepEvaluation ? 'step-level' : 'overall scenario'} response.`,
    ``,
    `**Scenario:** ${request.scenarioTitle}`,
    `${request.scenarioDescription}`,
    ``,
    `**Current Challenge (${request.challenge.type}):**`,
    `- Question: ${request.challenge.question}`,
    `- Description: ${request.challenge.description}`,
    request.challenge.context && `- Context: ${request.challenge.context}`,
    request.challenge.options && `- Options: ${request.challenge.options.map((o, i) => `[${i}] ${o}`).join(' | ')}`,
    request.challenge.correctAnswer !== undefined && `- Correct Answer: ${request.challenge.correctAnswer}`,
    ``,
    `**Student's Response:**`,
    request.userResponse,
    ``,
    previousStepsSummary,
    ``,
    `**Assessment Focus (${request.isStepEvaluation ? 'step' : 'final'}):**`,
    request.isStepEvaluation
      ? `Evaluate the quality of this single response: conceptual accuracy, reasoning shown, and appropriate application.`
      : `Evaluate the student's learning arc across all steps: progression, concept integration, and depth of understanding gained.`,
    ``,
    `**Challenge-type criteria:**`,
    typeCriteria[request.challenge.type] || '',
    ``,
    `Before producing JSON, mentally note: (a) is the answer correct? (b) what reasoning does the student show? (c) what specific concept gaps remain?`,
    ``,
    SCORING_RUBRIC,
    ``,
    `**Response Format (JSON only):**`,
    `{`,
    `  "score": <integer 0-100 per rubric>,`,
    `  "feedback": "<2-4 sentence assessment — reference their specific answer and the correct answer when relevant>",`,
    `  "suggestions": ["<actionable suggestion tied to their actual response>", "...2-3 total"],`,
    `  "insights": ["<concept insight demonstrated or to explore>"],`,
    `  "strengths": ["<specific strength>", "...2-3 total"],`,
    `  "improvements": ["<specific improvement>", "...1-2 total"]`,
    `}`,
    ``,
    `**Scenario-specific rules:**`,
    `- For multiple-choice: explicitly state which option they chose and why it was right/wrong. Compare to the correct answer.`,
    `- For code: comment on correctness first, then structure/style.`,
    `- For design/analysis: assess depth and trade-off awareness.`,
    `- Wrong answers are learning opportunities — explain the correct reasoning clearly so the student gains from the mistake.`,
    ``,
    SHARED_GUIDELINES,
  ]);
}

// ── Critical Thinking Judge ─────────────────────────────────────────────────

export function buildCriticalThinkingJudgePrompt(request: CriticalThinkingJudgeRequest): string {
  return ctx([
    `You are a critical-thinking coach and AI education specialist evaluating a student's response about "${request.conceptArea}".`,
    ``,
    `**Challenge:** ${request.challengeTitle}`,
    `${request.challengeDescription}`,
    ``,
    `**Question posed to the student:**`,
    request.question,
    ``,
    `**Source:** ${request.source === 'core-concepts' ? 'Core Concepts' : 'Agent Patterns'}`,
    request.context?.difficulty && `- Difficulty: ${request.context.difficulty}`,
    request.context?.expectedApproaches?.length && `- Expected Approaches: ${request.context.expectedApproaches.join('; ')}`,
    request.context?.keyConsiderations?.length && `- Key Considerations: ${request.context.keyConsiderations.join('; ')}`,
    request.context?.realWorldApplications?.length && `- Real-World Applications: ${request.context.realWorldApplications.join('; ')}`,
    request.context?.commonMisconceptions?.length && `- Common Misconceptions: ${request.context.commonMisconceptions.join('; ')}`,
    request.context?.evaluationCriteria?.length && `- Evaluation Criteria: ${request.context.evaluationCriteria.join('; ')}`,
    ``,
    `**Student's Response:**`,
    request.userResponse,
    ``,
    `**Critical Thinking Dimensions (weight these roughly equally):**`,
    `1. Depth of Analysis — did they go beyond a surface answer?`,
    `2. Multiple Perspectives — did they consider alternatives or trade-offs?`,
    `3. Evidence & Reasoning — did they support claims with logic, examples, or principles?`,
    `4. Concept Connection — did they tie the answer back to ${request.conceptArea}?`,
    `5. Originality — any creative insight, novel framing, or real-world analogy?`,
    `6. Assumption Awareness — did they identify or question hidden assumptions?`,
    ``,
    `Before producing JSON, ask yourself: (a) which dimensions did the student address well? (b) which are absent or shallow? (c) did they avoid common misconceptions${request.context?.commonMisconceptions?.length ? ` (${request.context.commonMisconceptions.join(', ')})` : ''}?`,
    ``,
    SCORING_RUBRIC,
    ``,
    `**Response Format (JSON only):**`,
    `{`,
    `  "score": <integer 0-100 per rubric>,`,
    `  "feedback": "<2-4 sentence assessment focused on reasoning quality and analytical depth>",`,
    `  "suggestions": ["<specific critical-thinking suggestion>", "...2-3 total"],`,
    `  "insights": ["<analytical strength demonstrated>", "...1-2 total"],`,
    `  "strengths": ["<specific critical-thinking strength>", "...2-3 total"],`,
    `  "improvements": ["<specific analytical growth area>", "...1-2 total"]`,
    `}`,
    ``,
    SHARED_GUIDELINES,
  ]);
}
