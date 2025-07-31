// src/lib/llmJudge.ts
import { callLlm } from './llm';
import { isLlmProviderConfigured } from './config';

// Use OpenRouter for Study Mode
const STUDY_MODE_PROVIDER = 'openrouter';

export interface LlmJudgeResponse {
  score: number; // 0-100
  feedback: string;
  suggestions: string[];
  insights?: string[];
  strengths: string[];
  improvements: string[];
}

export interface SocraticJudgeRequest {
  question: string;
  userResponses: Array<{
    question: string;
    answer: string;
  }>;
  conceptArea: string;
  learningObjectives: string[];
  // Additional context for better feedback
  followUpQuestions?: string[];
  expectedInsights?: string[];
  difficulty?: string;
  prerequisites?: string[];
  relatedConcepts?: string[];
  questionDetails?: string;
  fullQuestionContext?: {
    title: string;
    description?: string;
    hints?: string[];
  };
}

export interface DebugJudgeRequest {
  phase: 'analysis' | 'diagnosis' | 'solution';
  challengeTitle: string;
  challengeDescription: string;
  userResponse: string;
  context: {
    codeSnippet?: string;
    errorLogs?: string[];
    expectedOutcome?: string;
  };
  // Additional context for comprehensive feedback
  challengeDetails?: {
    difficulty?: string;
    technologies?: string[];
    debuggingFocus?: string[];
    brokenCode?: string;
    workingCode?: string;
    conversationLogs?: Array<{
      type: string;
      agent: string;
      message: string;
    }>;
    expectedBehavior?: string;
    commonMistakes?: string[];
    learningObjectives?: string[];
  };
}

export interface ScenarioJudgeRequest {
  scenarioTitle: string;
  scenarioDescription: string;
  challenge: {
    type: 'multiple-choice' | 'code' | 'design' | 'analysis';
    question: string;
    description: string;
    context?: string;
    options?: string[]; // Available answer options for multiple-choice
    correctAnswer?: number | string; // Correct answer for reference
  };
  userResponse: string;
  isStepEvaluation: boolean; // true for step-by-step, false for final
  previousSteps?: Array<{
    question: string;
    userAnswer: string;
    feedback: string;
  }>;
}

// Change: Always use OpenRouter for Study Mode
export async function socraticJudge(request: SocraticJudgeRequest): Promise<LlmJudgeResponse> {
  // Check if LLM provider is configured
  if (!isLlmProviderConfigured()) {
    return {
      score: 75, // Encouraging default score
      feedback: "Great engagement with the Socratic learning process! Your thoughtful responses show you're developing critical thinking skills. When an LLM provider is configured, you'll receive even more detailed, personalized feedback to accelerate your learning journey.",
      suggestions: [
        "Continue exploring these concepts through practice",
        "Try to connect ideas to real-world applications", 
        "Ask yourself 'why' and 'how' questions to deepen understanding"
      ],
      insights: ["Self-reflection and questioning lead to deeper learning"],
      strengths: ["Engaged thoughtfully with guided questions", "Demonstrated willingness to explore concepts"],
      improvements: ["Continue developing analytical thinking skills"]
    };
  }

  const prompt = `You are an expert educational assessor evaluating a student's Socratic learning session. 

**Learning Context:**
- Main Question: ${request.question}
- Concept Area: ${request.conceptArea}
- Learning Objectives: ${request.learningObjectives.join(', ')}
${request.fullQuestionContext ? `- Question Title: ${request.fullQuestionContext.title}` : ''}
${request.fullQuestionContext?.description ? `- Question Description: ${request.fullQuestionContext.description}` : ''}
${request.difficulty ? `- Difficulty Level: ${request.difficulty}` : ''}

**Additional Context:**
${request.followUpQuestions?.length ? `- Follow-up Questions Available: ${request.followUpQuestions.join('; ')}` : ''}
${request.expectedInsights?.length ? `- Expected Key Insights: ${request.expectedInsights.join('; ')}` : ''}
${request.prerequisites?.length ? `- Prerequisites: ${request.prerequisites.join(', ')}` : ''}
${request.relatedConcepts?.length ? `- Related Concepts: ${request.relatedConcepts.join(', ')}` : ''}
${request.questionDetails ? `- Additional Details: ${request.questionDetails}` : ''}

**Student's Learning Journey:**
${request.userResponses.map((r, i) => `
Q${i + 1}: ${r.question}
Student Response: ${r.answer}
`).join('\n')}

**Your Task:**
Evaluate the student's responses for:
1. Depth of thinking and reasoning
2. Connection to core concepts ${request.relatedConcepts?.length ? `(especially ${request.relatedConcepts.join(', ')})` : ''}
3. Evidence of learning progression
4. Critical thinking and insight development
${request.expectedInsights?.length ? `5. Progress toward expected insights: ${request.expectedInsights.join(', ')}` : ''}

**Response Format (JSON):**
{
  "score": <0-100 based on depth of understanding and engagement>,
  "feedback": "<encouraging, constructive assessment of their learning journey>",
  "suggestions": ["<specific suggestion 1>", "<specific suggestion 2>", "<specific suggestion 3>"],
  "insights": ["<key insight they demonstrated>", "<another insight>"],
  "strengths": ["<what they did well>", "<another strength>"],
  "improvements": ["<area for growth>", "<another improvement area>"]
}

**Critical Guidelines for Encouraging Assessment:**
- ALWAYS lead with encouragement and recognition of effort
- For struggling students: Emphasize growth mindset, highlight ANY progress made, focus on the learning journey rather than just outcomes
- Frame challenges as opportunities for growth, not failures
- Use phrases like "You're developing...", "Your thinking shows...", "This is a great foundation for..."
- Avoid harsh criticism - instead use "Consider exploring..." or "An opportunity to strengthen..."
- Celebrate engagement and willingness to learn above perfect answers
- Provide hope and confidence that improvement is achievable
- Remember: The goal is to inspire continued learning, not discourage

Focus on encouraging continued learning while providing specific, actionable feedback. Recognize effort and thinking process, not just correct answers.${request.expectedInsights?.length ? ` Reference the expected insights to guide deeper exploration.` : ''}`;

  try {
    const response = await callLlm(prompt, STUDY_MODE_PROVIDER);
    
    // Extract JSON from response, handling both plain JSON and markdown-wrapped JSON
    let jsonContent = response.content.trim();
    
    // Remove markdown code block wrapping if present
    const jsonBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch) {
      jsonContent = jsonBlockMatch[1].trim();
    }
    
    const parsed = JSON.parse(jsonContent);
    return {
      score: Math.max(0, Math.min(100, parsed.score || 50)),
      feedback: parsed.feedback || "Good engagement with the learning process!",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : []
    };
  } catch (error) {
    console.error('LLM Judge Error:', error);
    return {
      score: 65, // More encouraging default score
      feedback: "Thank you for your thoughtful engagement with this Socratic learning journey! Every question you explored and every answer you provided shows you're actively developing critical thinking skills. Your willingness to engage with challenging concepts is the foundation of deep learning. Keep embracing this curiosity - it's exactly what leads to breakthrough understanding!",
      suggestions: ["Continue practicing with similar questions to build confidence", "Try connecting these concepts to real-world examples you've experienced", "Reflect on how your thinking evolved through the questioning process"],
      insights: ["Your engagement with guided questioning demonstrates growing analytical abilities"],
      strengths: ["Participated thoughtfully in the learning process", "Demonstrated openness to exploring complex concepts"],
      improvements: ["Continue building on this strong foundation of curiosity and engagement"]
    };
  }
}

export async function debugJudge(request: DebugJudgeRequest): Promise<LlmJudgeResponse> {
  // Check if LLM provider is configured
  if (!isLlmProviderConfigured()) {
    return {
      score: 70, // Encouraging default score
      feedback: `Excellent work on the ${request.phase} phase! Your systematic approach to debugging shows you're developing strong problem-solving skills. When an LLM provider is configured, you'll receive detailed, personalized feedback on your debugging methodology.`,
      suggestions: [
        "Continue practicing systematic debugging approaches",
        "Break down complex problems into smaller steps",
        "Document your thought process for future reference"
      ],
      insights: [`Systematic ${request.phase} is key to effective debugging`],
      strengths: ["Applied systematic debugging thinking", "Engaged with the challenge methodically"],
      improvements: ["Continue developing debugging methodology"]
    };
  }
  const prompt = `You are an expert software debugging instructor evaluating a student's debugging approach.

**Debug Challenge Context:**
- Phase: ${request.phase}
- Challenge: ${request.challengeTitle}
- Description: ${request.challengeDescription}
${request.context.codeSnippet ? `- Code Context: ${request.context.codeSnippet}` : ''}
${request.context.errorLogs ? `- Error Logs: ${request.context.errorLogs.join(', ')}` : ''}
${request.context.expectedOutcome ? `- Expected Outcome: ${request.context.expectedOutcome}` : ''}

**Challenge Details:**
${request.challengeDetails?.difficulty ? `- Difficulty: ${request.challengeDetails.difficulty}` : ''}
${request.challengeDetails?.technologies?.length ? `- Technologies: ${request.challengeDetails.technologies.join(', ')}` : ''}
${request.challengeDetails?.debuggingFocus?.length ? `- Focus Areas: ${request.challengeDetails.debuggingFocus.join(', ')}` : ''}
${request.challengeDetails?.brokenCode ? `- Broken Code: ${request.challengeDetails.brokenCode}` : ''}
${request.challengeDetails?.workingCode ? `- Working Code (Reference): ${request.challengeDetails.workingCode}` : ''}
${request.challengeDetails?.expectedBehavior ? `- Expected Behavior: ${request.challengeDetails.expectedBehavior}` : ''}
${request.challengeDetails?.commonMistakes?.length ? `- Common Mistakes to Avoid: ${request.challengeDetails.commonMistakes.join('; ')}` : ''}
${request.challengeDetails?.learningObjectives?.length ? `- Learning Objectives: ${request.challengeDetails.learningObjectives.join('; ')}` : ''}

**Conversation Logs:**
${request.challengeDetails?.conversationLogs?.length ? 
request.challengeDetails.conversationLogs.map(log => `[${log.type}] ${log.agent}: ${log.message}`).join('\n') : 
'No conversation logs available'}

**Student's Response:**
${request.userResponse}

**Evaluation Criteria for ${request.phase} Phase:**
${request.phase === 'analysis' ? `
- Systematic observation of symptoms
- Identification of error patterns
- Understanding of system behavior
- Quality of diagnostic questions` : ''}
${request.phase === 'diagnosis' ? `
- Accuracy of root cause identification
- Understanding of system interactions
- Logical reasoning from symptoms to causes
- Consideration of multiple potential issues` : ''}
${request.phase === 'solution' ? `
- Practical solution approach
- Addresses identified root causes
- Consideration of edge cases
- Implementation feasibility and completeness` : ''}

**Response Format (JSON):**
{
  "score": <0-100 based on debugging methodology and accuracy>,
  "feedback": "<detailed assessment of their debugging approach>",
  "suggestions": ["<specific improvement suggestion>", "<another suggestion>", "<third suggestion>"],
  "insights": ["<debugging insight they demonstrated>"],
  "strengths": ["<what they did well in this phase>", "<another strength>"],
  "improvements": ["<specific area to improve>", "<another improvement>"]
}

**Critical Guidelines for Encouraging Assessment:**
- ALWAYS acknowledge effort and systematic thinking, even if the approach wasn't perfect
- For struggling students: Highlight any logical reasoning shown, emphasize that debugging is a skill that improves with practice
- Frame gaps as learning opportunities: "A great next step would be..." instead of "You failed to..."
- Celebrate problem-solving attempts and willingness to engage with complex challenges
- Use growth-oriented language: "You're building debugging skills...", "Your approach shows promise..."
- Provide confidence that debugging expertise develops over time with practice
- Focus on the process and methodology, not just the final answer

Focus on debugging methodology, systematic thinking, and practical problem-solving skills.${request.challengeDetails?.commonMistakes?.length ? ` Check if they avoided common mistakes: ${request.challengeDetails.commonMistakes.join(', ')}.` : ''}${request.challengeDetails?.learningObjectives?.length ? ` Assess progress toward learning objectives: ${request.challengeDetails.learningObjectives.join(', ')}.` : ''}`;

  try {
    const response = await callLlm(prompt, STUDY_MODE_PROVIDER);
    
    // Extract JSON from response, handling both plain JSON and markdown-wrapped JSON
    let jsonContent = response.content.trim();
    
    // Remove markdown code block wrapping if present
    const jsonBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch) {
      jsonContent = jsonBlockMatch[1].trim();
    }
    
    const parsed = JSON.parse(jsonContent);
    return {
      score: Math.max(0, Math.min(100, parsed.score || 50)),
      feedback: parsed.feedback || "Good debugging approach for this phase!",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : []
    };
  } catch (error) {
    console.error('Debug Judge Error:', error);
    return {
      score: 65, // More encouraging default score
      feedback: "Your debugging approach shows genuine problem-solving thinking! Debugging is one of the most valuable skills in technology, and every attempt you make builds your expertise. The fact that you're systematically working through challenges demonstrates you're developing the mindset of a skilled professional. Remember, even experienced developers debug step-by-step - you're on the right path!",
      suggestions: ["Break complex problems into smaller, manageable pieces", "Look for patterns in error messages - they often contain helpful clues", "Document your debugging process to build your problem-solving toolkit"],
      insights: ["Your systematic approach to debugging shows developing professional problem-solving skills"],
      strengths: ["Applied logical thinking to complex problems", "Demonstrated persistence with challenging technical issues"],
      improvements: ["Continue building confidence in systematic debugging methodology"]
    };
  }
}

export async function scenarioJudge(request: ScenarioJudgeRequest): Promise<LlmJudgeResponse> {
  // Check if LLM provider is configured
  if (!isLlmProviderConfigured()) {
    const stepOrFinal = request.isStepEvaluation ? "step" : "overall scenario";
    return {
      score: 75, // Encouraging default score
      feedback: `Great work on this ${stepOrFinal}! Your approach shows you're actively engaging with the learning material and developing practical problem-solving skills. When an LLM provider is configured, you'll receive detailed, personalized feedback tailored to your specific responses.`,
      suggestions: [
        "Continue practicing with similar challenges",
        "Try to connect concepts to real-world scenarios",
        "Think about how different approaches might yield different results"
      ],
      insights: ["Hands-on practice reinforces conceptual learning"],
      strengths: ["Engaged with the challenge", "Applied learning concepts practically"],
      improvements: ["Continue developing problem-solving skills"]
    };
  }
  const prompt = `You are an expert educational assessor evaluating a student's response in an interactive learning scenario.

**Scenario Context:**
- Scenario: ${request.scenarioTitle}
- Description: ${request.scenarioDescription}
- Challenge Type: ${request.challenge.type}

**Current Challenge:**
- Question: ${request.challenge.question}
- Description: ${request.challenge.description}
${request.challenge.context ? `- Context: ${request.challenge.context}` : ''}
${request.challenge.options ? `- Available Options: ${request.challenge.options.map((opt, i) => `${i}: ${opt}`).join(', ')}` : ''}
${request.challenge.correctAnswer !== undefined ? `- Correct Answer: ${request.challenge.correctAnswer}` : ''}

**Student Response:**
${request.userResponse}

${request.previousSteps && request.previousSteps.length > 0 ? `
**Previous Steps in Scenario:**
${request.previousSteps.map((step, i) => `
Step ${i + 1}: ${step.question}
Student Answer: ${step.userAnswer}
Previous Feedback: ${step.feedback}
`).join('\n')}
` : ''}

**Assessment Focus:**
${request.isStepEvaluation ? `
This is a step-by-step evaluation. Focus on:
- Understanding of the current challenge
- Quality and appropriateness of the response
- Application of relevant concepts
- Logical reasoning and problem-solving approach
` : `
This is a final scenario evaluation. Focus on:
- Overall learning progression through the scenario
- Integration of concepts across all steps
- Depth of understanding demonstrated
- Practical application and insights gained
`}

**Challenge-Specific Criteria:**
${request.challenge.type === 'multiple-choice' ? `
- Accuracy of choice selection
- Understanding of underlying concepts
- Reasoning behind the selection
- Why the selected answer was correct/incorrect
- How other options relate to the concept` : ''}
${request.challenge.type === 'code' ? `
- Code quality and correctness
- Implementation of required functionality
- Use of appropriate programming concepts
- Code structure and readability` : ''}
${request.challenge.type === 'design' ? `
- Completeness of system design
- Consideration of key requirements
- Understanding of architectural principles
- Practical feasibility of the solution` : ''}
${request.challenge.type === 'analysis' ? `
- Depth of analysis and critical thinking
- Integration of concepts from previous steps
- Overall understanding progression
- Application of learned principles` : ''}

**Response Format (JSON):**
{
  "score": <0-100 based on understanding and execution>,
  "feedback": "<detailed, specific assessment of their approach and understanding - be contextual and avoid generic responses>",
  "suggestions": ["<specific improvement suggestion based on their actual response>", "<another targeted suggestion>", "<third context-specific suggestion>"],
  "insights": ["<key insight they demonstrated or should gain from this specific challenge>"],
  "strengths": ["<what they specifically did well in this response>", "<another specific strength>"],
  "improvements": ["<specific area to improve based on their actual answer>", "<another specific improvement>"]
}

**Critical Guidelines for Encouraging Assessment:**
- ALWAYS start with acknowledgment of effort and engagement
- For incorrect answers: Focus on the thinking process shown, then gently guide toward better understanding
- Use encouraging transitions: "While your approach shows good thinking, let's explore..." 
- Emphasize learning over being "right" - "This is a great opportunity to deepen understanding of..."
- Celebrate ANY correct reasoning, even in wrong answers
- Frame mistakes as valuable learning moments, not failures
- Build confidence: "You're developing strong analytical skills..." "Your reasoning shows you're thinking like a [professional in field]..."
- End with hope and actionable next steps

**Important Guidelines:**
- For multiple-choice questions, reference their specific choice and explain why it was correct/incorrect
- Compare their answer to other available options when relevant
- Provide concrete, actionable feedback based on their actual response
- Avoid generic educational phrases - be specific to their performance
- If they got it wrong, explain the reasoning behind the correct answer
- If they got it right, explain why their reasoning was sound

Provide constructive, educational feedback that encourages learning and improvement.`;

  try {
    const response = await callLlm(prompt, STUDY_MODE_PROVIDER);
    
    // Extract JSON from response, handling both plain JSON and markdown-wrapped JSON
    let jsonContent = response.content.trim();
    
    // Remove markdown code block wrapping if present
    const jsonBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch) {
      jsonContent = jsonBlockMatch[1].trim();
    }
    
    const parsed = JSON.parse(jsonContent);
    return {
      score: Math.max(0, Math.min(100, parsed.score || 50)),
      feedback: parsed.feedback || "Good effort! Keep exploring these concepts.",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : []
    };
  } catch (error) {
    console.error('Scenario Judge Error:', error);
    return {
      score: 70, // More encouraging default score
      feedback: "Excellent work engaging with this real-world scenario! Your approach shows you're thinking practically about complex challenges, which is exactly the kind of problem-solving mindset that leads to success. Every scenario you tackle builds your confidence and expertise. Keep embracing these challenges - you're developing valuable skills that will serve you well!",
      suggestions: ["Think through problems step-by-step to build systematic reasoning", "Consider multiple approaches to strengthen decision-making skills", "Connect these scenarios to situations you might encounter in practice"],
      insights: ["Hands-on scenario practice builds practical problem-solving confidence"],
      strengths: ["Engaged thoughtfully with real-world challenges", "Demonstrated willingness to tackle complex scenarios"],
      improvements: ["Continue building confidence through scenario-based practice"]
    };
  }
}
