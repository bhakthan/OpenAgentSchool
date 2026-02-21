// src/lib/llmJudge.ts
import { callLlm } from './llm';
import { isLlmProviderConfigured, getFirstAvailableProvider } from './config';
import { formatLlmErrorPlain } from './llmErrors';
import { buildSocraticJudgePrompt, buildDebugJudgePrompt, buildScenarioJudgePrompt, buildCriticalThinkingJudgePrompt } from '../prompts/judgePrompts';
import type { LlmProvider } from './llm';

// Use whatever provider the learner has configured — resolved fresh per call
function getStudyModeProvider(): LlmProvider {
  return getFirstAvailableProvider() as LlmProvider;
}

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

export interface CriticalThinkingJudgeRequest {
  challengeTitle: string;
  challengeDescription: string;
  question: string;
  userResponse: string;
  conceptArea: string; // e.g., "Agent Architecture", "Multi-Agent Systems"
  source: 'core-concepts' | 'agent-patterns';
  context?: {
    difficulty?: string;
    expectedApproaches?: string[];
    keyConsiderations?: string[];
    realWorldApplications?: string[];
    commonMisconceptions?: string[];
    evaluationCriteria?: string[];
  };
}

// Change: Always use OpenRouter for Study Mode
export async function socraticJudge(request: SocraticJudgeRequest): Promise<LlmJudgeResponse> {
  // Check if LLM provider is configured
  if (!isLlmProviderConfigured()) {
    return {
      score: 75,
      feedback: "Great engagement with the Socratic learning process! Your thoughtful responses show you're developing critical thinking skills. To unlock personalized AI feedback, open **Settings** (⚙ gear icon in the header) and add your API key — it takes 30 seconds! Your keys stay in your browser and are never sent to our servers.",
      suggestions: [
        "Configure an AI provider in Settings to get detailed, personalized feedback",
        "Continue exploring these concepts through practice", 
        "Ask yourself 'why' and 'how' questions to deepen understanding"
      ],
      insights: ["Self-reflection and questioning lead to deeper learning"],
      strengths: ["Engaged thoughtfully with guided questions", "Demonstrated willingness to explore concepts"],
      improvements: ["Configure an AI provider to receive tailored learning recommendations"]
    };
  }

  const prompt = buildSocraticJudgePrompt(request);

  try {
    const response = await callLlm(prompt, getStudyModeProvider());
    
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
    const hint = !isLlmProviderConfigured()
      ? ' To unlock personalized AI feedback, open Settings (⚙ gear icon) and add your API key — it takes 30 seconds!'
      : ' If this keeps happening, check your API key in Settings (⚙ gear icon).';
    return {
      score: 65,
      feedback: `Thank you for your thoughtful engagement with this Socratic learning journey! Every question you explored and every answer you provided shows you're actively developing critical thinking skills.${hint}`,
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
      score: 70,
      feedback: `Excellent work on the ${request.phase} phase! Your systematic approach to debugging shows you're developing strong problem-solving skills. To unlock personalized AI feedback, open **Settings** (⚙ gear icon in the header) and add your API key — it takes 30 seconds! Your keys stay in your browser and are never sent to our servers.`,
      suggestions: [
        "Configure an AI provider in Settings to get detailed, personalized feedback",
        "Break down complex problems into smaller steps",
        "Document your thought process for future reference"
      ],
      insights: [`Systematic ${request.phase} is key to effective debugging`],
      strengths: ["Applied systematic debugging thinking", "Engaged with the challenge methodically"],
      improvements: ["Configure an AI provider to receive tailored debugging recommendations"]
    };
  }
  const prompt = buildDebugJudgePrompt(request);

  try {
    const response = await callLlm(prompt, getStudyModeProvider());
    
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
    const hint = !isLlmProviderConfigured()
      ? ' To get personalized debugging feedback, open Settings (⚙ gear icon) and configure an AI provider.'
      : ' If this keeps happening, check your API key in Settings (⚙).';
    return {
      score: 65,
      feedback: `Your debugging approach shows genuine problem-solving thinking! Debugging is one of the most valuable skills in technology, and every attempt builds your expertise.${hint}`,
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
      score: 75,
      feedback: `Great work on this ${stepOrFinal}! Your approach shows you're actively engaging with the learning material. To unlock personalized AI feedback, open **Settings** (⚙ gear icon in the header) and add your API key — it takes 30 seconds! Your keys stay in your browser and are never sent to our servers.`,
      suggestions: [
        "Configure an AI provider in Settings to get detailed, personalized feedback",
        "Try to connect concepts to real-world scenarios",
        "Think about how different approaches might yield different results"
      ],
      insights: ["Hands-on practice reinforces conceptual learning"],
      strengths: ["Engaged with the challenge", "Applied learning concepts practically"],
      improvements: ["Configure an AI provider to receive tailored scenario recommendations"]
    };
  }
  const prompt = buildScenarioJudgePrompt(request);

  try {
    const response = await callLlm(prompt, getStudyModeProvider());
    
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
    const hint = !isLlmProviderConfigured()
      ? ' To get personalized scenario feedback, open Settings (⚙ gear icon) and configure an AI provider.'
      : ' If this keeps happening, check your API key in Settings (⚙).';
    return {
      score: 70,
      feedback: `Excellent work engaging with this real-world scenario! Your approach shows you're thinking practically about complex challenges.${hint}`,
      suggestions: ["Think through problems step-by-step to build systematic reasoning", "Consider multiple approaches to strengthen decision-making skills", "Connect these scenarios to situations you might encounter in practice"],
      insights: ["Hands-on scenario practice builds practical problem-solving confidence"],
      strengths: ["Engaged thoughtfully with real-world challenges", "Demonstrated willingness to tackle complex scenarios"],
      improvements: ["Continue building confidence through scenario-based practice"]
    };
  }
}

export async function criticalThinkingJudge(request: CriticalThinkingJudgeRequest): Promise<LlmJudgeResponse> {
  // Check if LLM provider is configured
  if (!isLlmProviderConfigured()) {
    return {
      score: 80,
      feedback: "Excellent critical thinking engagement! Your thoughtful approach demonstrates you're developing the analytical mindset essential for AI agent systems. To unlock personalized AI feedback, open **Settings** (⚙ gear icon in the header) and add your API key — it takes 30 seconds! Your keys stay in your browser and are never sent to our servers.",
      suggestions: [
        "Configure an AI provider in Settings to get detailed, personalized feedback",
        "Connect your insights to practical applications in AI agent systems",
        "Consider both benefits and potential challenges of your proposed approaches"
      ],
      insights: ["Critical thinking is the foundation of innovative AI agent design"],
      strengths: ["Engaged deeply with complex conceptual challenges", "Demonstrated analytical thinking approach"],
      improvements: ["Configure an AI provider to receive tailored critical thinking recommendations"]
    };
  }

  const prompt = buildCriticalThinkingJudgePrompt(request);

  try {
    const response = await callLlm(prompt, getStudyModeProvider());
    
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
      feedback: parsed.feedback || "Great critical thinking effort!",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : []
    };
  } catch (error) {
    console.error('Critical Thinking Judge Error:', error);
    const hint = !isLlmProviderConfigured()
      ? ' To unlock detailed critical thinking feedback, open Settings (⚙ gear icon) and configure an AI provider.'
      : ' If this keeps happening, check your API key in Settings (⚙).';
    return {
      score: 75,
      feedback: `Outstanding engagement with this critical thinking challenge! Your willingness to grapple with complex AI agent concepts shows you're developing the analytical mindset that drives innovation.${hint}`,
      suggestions: ["Break complex problems into smaller, manageable questions to deepen analysis", "Always ask 'What if...?' and 'Why might this be different?' to explore multiple angles", "Connect abstract concepts to concrete examples from your experience"],
      insights: ["Your engagement with challenging questions builds the foundation for innovative thinking"],
      strengths: ["Demonstrated intellectual curiosity by engaging with complex challenges", "Showed willingness to explore difficult conceptual territory"],
      improvements: ["Continue building confidence in analytical reasoning through practice with challenging questions"]
    };
  }
}
