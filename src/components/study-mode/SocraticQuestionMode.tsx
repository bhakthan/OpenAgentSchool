import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TextareaWithVoice } from "@/components/ui/TextareaWithVoice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Brain, ArrowLeft, Lightbulb, CheckCircle, ArrowRight,
  Clock, Target, TrendUp, Copy, Printer, Users
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { StudyModeQuestion, StudyModeSession, StudyModeResponse } from '@/lib/data/studyMode/types';
import { saveStudyModeProgress } from '@/lib/data/studyMode/progress';
import { socraticJudge, LlmJudgeResponse } from '@/lib/llmJudge';
import { emitTelemetry } from '@/lib/data/studyMode/telemetry';
import { misconceptionRefutations } from '@/lib/data/studyMode/misconceptionRefutations';
import LlmConfigurationNotice from './LlmConfigurationNotice';
import EnhancedSocraticElicitation from './EnhancedSocraticElicitation';
import { generateDynamicFollowUps, extractEnhancedInsights, detectMisconceptions, UserContext } from '@/lib/socraticElicitation';
import { orchestratorAPI, SocraticQuestion as OrchestratorSocraticQuestion } from '@/services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SocraticQuestionModeProps {
  question: StudyModeQuestion;
  onComplete: (session: StudyModeSession) => void;
  onBack: () => void;
}

const SocraticQuestionMode: React.FC<SocraticQuestionModeProps> = ({ 
  question, 
  onComplete, 
  onBack 
}) => {
  // Elicitation phase state
  const [showElicitation, setShowElicitation] = useState(true);
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<string[]>([]);
  const [isAdaptive, setIsAdaptive] = useState(false);
  
  // Orchestrator API state
  const [isLoadingOrchestratorQuestions, setIsLoadingOrchestratorQuestions] = useState(false);
  const [orchestratorQuestions, setOrchestratorQuestions] = useState<OrchestratorSocraticQuestion[]>([]);
  const [useOrchestratorQuestions, setUseOrchestratorQuestions] = useState(false);
  
  // Original state
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [responses, setResponses] = useState<StudyModeResponse[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime] = useState(new Date());
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [llmJudgeResponse, setLlmJudgeResponse] = useState<LlmJudgeResponse | null>(null);
  const [isGettingJudgment, setIsGettingJudgment] = useState(false);
  const [showLlmFeedbackModal, setShowLlmFeedbackModal] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showPrintTooltip, setShowPrintTooltip] = useState(false);
  
  // Real-time adaptation state
  const [currentDynamicFollowUps, setCurrentDynamicFollowUps] = useState<string[]>([]);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [hasLlmProvider, setHasLlmProvider] = useState(false);

  // Check for LLM provider on mount
  useEffect(() => {
    const checkLlmProvider = () => {
      const providers = [
        'VITE_OPENAI_API_KEY',
        'VITE_AZURE_OPENAI_API_KEY', 
        'VITE_GEMINI_API_KEY',
        'VITE_HUGGINGFACE_API_KEY',
        'VITE_OPENROUTER_API_KEY',
        'VITE_CLAUDE_API_KEY'
      ];
      
      const hasProvider = providers.some(key => 
        import.meta.env[key] && import.meta.env[key].trim() !== ''
      );
      
      setHasLlmProvider(hasProvider);
    };
    
    checkLlmProvider();
  }, []);

  // Handle context gathering from elicitation
  const handleContextGathered = (context: UserContext) => {
    setUserContext(context);
    setShowElicitation(false);
    
    // Generate adaptive questions if LLM is available
    if (hasLlmProvider) {
      generateAdaptiveQuestions(context);
    }
  };

  // Skip elicitation and use default experience
  const handleSkipElicitation = () => {
    setUserContext({
      experience: 'beginner',
      background: '',
      motivation: '',
      priorKnowledge: '',
      confidenceLevel: 3,
      learningStyle: 'verbal',
      goals: '',
      timeAvailable: 15
    });
    setShowElicitation(false);
  };

  // Generate adaptive questions based on user context
  const generateAdaptiveQuestions = async (context: UserContext) => {
    if (!hasLlmProvider) return;
    
    try {
      setIsAdaptive(true);
      setIsLoadingOrchestratorQuestions(true);
      
      // Try to fetch questions from orchestrator API
      try {
        const orchestratorQs = await orchestratorAPI.generateSocraticQuestions(
          question.title, 
          5 // Generate 5 Socratic questions
        );
        
        if (orchestratorQs && orchestratorQs.length > 0) {
          setOrchestratorQuestions(orchestratorQs);
          setUseOrchestratorQuestions(true);
          setIsLoadingOrchestratorQuestions(false);
          return;
        }
      } catch (apiError) {
        console.log('Orchestrator API not available, using fallback questions:', apiError);
      }
      
      // Fallback: adapt the existing questions based on context
      const adaptedQuestions = adaptQuestionsToContext(question, context);
      setAdaptiveQuestions(adaptedQuestions);
      setIsLoadingOrchestratorQuestions(false);
    } catch (error) {
      console.log('Could not generate adaptive questions, using defaults:', error);
      setIsAdaptive(false);
      setIsLoadingOrchestratorQuestions(false);
    }
  };

  // Adapt questions based on user context (graceful fallback)
  const adaptQuestionsToContext = (originalQuestion: StudyModeQuestion, context: UserContext): string[] => {
    const baseQuestions = [originalQuestion.socratiQuestion!, ...(originalQuestion.followUpQuestions || [])];
    
    // Adapt based on experience level
    if (context.experience === 'beginner') {
      return baseQuestions.map(q => {
        if (context.background) {
          return q.replace(/\bthink about\b/gi, `think about this from your ${context.background} perspective`);
        }
        return q;
      });
    } else if (context.experience === 'advanced') {
      return baseQuestions.map(q => 
        q + " Consider the technical implementation challenges and edge cases."
      );
    }
    
    return baseQuestions;
  };

  // Generate real-time follow-up questions
  const generateRealTimeFollowUp = async (response: string) => {
    if (!hasLlmProvider || !userContext) return [];
    
    try {
      setIsGeneratingFollowUp(true);
      const followUps = generateDynamicFollowUps(response, userContext, question.conceptId);
      const questionTexts = followUps.map(f => f.question);
      setCurrentDynamicFollowUps(questionTexts);
      return questionTexts;
    } catch (error) {
      console.log('Could not generate follow-up questions:', error);
      return [];
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  // Reset function to allow retaking the same question
  const resetToStart = () => {
    // Show confirmation if user has made progress
    if (responses.length > 0 || userResponse.trim()) {
      const confirmed = window.confirm(
        'Are you sure you want to retake this question?\n\n' +
        '• This will clear all your current responses and progress\n' +
        '• For the best experience, refresh the page after retaking to fully reset all modules\n' +
        '• You can continue without refreshing, but some features may not reset completely'
      );
      if (!confirmed) return;
    }
    
    setCurrentStep(0);
    setUserResponse('');
    setResponses([]);
    setInsights([]);
    setHintsUsed(0);
    setShowHint(false);
    setIsComplete(false);
    setLlmJudgeResponse(null);
    setIsGettingJudgment(false);
    setShowLlmFeedbackModal(false);
    
    // Inform user about page refresh for optimal experience (clearing local in-memory state only)
    setTimeout(() => {
      const shouldRefresh = window.confirm(
        'Retake initiated! 🎓\n\n' +
        'For the optimal retake experience, would you like to refresh the page now?\n\n' +
        '✅ Refresh: Ensures all modules are fully reset\n' +
        '⏩ Continue: Proceed without refresh (some features may retain state)'
      );
      if (shouldRefresh) {
        window.location.reload();
      }
    }, 100);
  };

  // All questions for this Socratic sequence (orchestrator -> adaptive -> original)
  const allQuestions = useOrchestratorQuestions && orchestratorQuestions.length > 0
    ? orchestratorQuestions.map(q => q.question)
    : isAdaptive && adaptiveQuestions.length > 0 
      ? adaptiveQuestions
      : [question.socratiQuestion!, ...(question.followUpQuestions || [])];

  const currentQuestion = allQuestions[currentStep];
  const isLastQuestion = currentStep >= allQuestions.length - 1;

  // Track chain depth telemetry on advance (#8)
  useEffect(() => {
    try { emitTelemetry({ kind: 'socratic_chain_depth', patternId: question.conceptId, challengeId: question.id, chainDepth: currentStep + 1 }); } catch {}
  }, [currentStep, question.conceptId, question.id]);

  // Copy LLM feedback to clipboard
  const handleCopyFeedback = () => {
    if (!llmJudgeResponse) return;

    const formattedFeedback = `🎓 Comprehensive AI Assessment - Socratic Journey Complete
Score: ${llmJudgeResponse.score}%

� Learning Journey - Questions & Answers:
${responses.map((response, index) => `
Q${index + 1}: ${allQuestions[index]}
Your Answer: ${response.userAnswer}
${response.insight ? `💡 Insight Gained: ${response.insight}` : ''}
`).join('\n')}

�📝 Complete Journey Assessment:
${llmJudgeResponse.feedback}

${llmJudgeResponse.strengths.length > 0 ? `✅ Strengths:
${llmJudgeResponse.strengths.map(strength => `• ${strength}`).join('\n')}

` : ''}${llmJudgeResponse.suggestions.length > 0 ? `💡 Suggestions for Improvement:
${llmJudgeResponse.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}

` : ''}${llmJudgeResponse.insights && llmJudgeResponse.insights.length > 0 ? `🧠 Key Insights:
${llmJudgeResponse.insights.map(insight => `• ${insight}`).join('\n')}

` : ''}${llmJudgeResponse.improvements.length > 0 ? `📈 Areas for Improvement:
${llmJudgeResponse.improvements.map(improvement => `• ${improvement}`).join('\n')}` : ''}

📖 Study Session Summary:
• Topic: ${question.title}
• Questions Completed: ${responses.length}
• Total Insights Discovered: ${insights.length}
• Session Duration: ${question.timeEstimate || 15} minutes (estimated)
• Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;

    navigator.clipboard.writeText(formattedFeedback);
    
    // Show "Copied!" tooltip for 2 seconds
    setShowCopyTooltip(true);
    setTimeout(() => {
      setShowCopyTooltip(false);
    }, 2000);
  };

  // Print LLM feedback
  const handlePrintFeedback = () => {
    if (!llmJudgeResponse) return;

    const printContent = `
      <html>
        <head>
          <title>Comprehensive AI Assessment - Socratic Journey</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 15px; }
            .score { font-size: 24px; color: #3b82f6; font-weight: bold; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; color: #1f2937; margin-bottom: 10px; font-size: 16px; }
            .feedback { background: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0; }
            .list-item { margin: 5px 0; padding-left: 15px; }
            .qa-item { margin: 15px 0; padding: 15px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }
            .question { font-weight: bold; color: #374151; margin-bottom: 8px; }
            .answer { color: #4b5563; margin-bottom: 8px; }
            .qa-insight { color: #7c3aed; font-style: italic; font-size: 14px; }
            .strength { color: #059669; }
            .suggestion { color: #d97706; }
            .insight { color: #7c3aed; }
            .improvement { color: #dc2626; }
            .summary { background: #f0f9ff; padding: 15px; border: 1px solid #bae6fd; border-radius: 8px; margin: 20px 0; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 Comprehensive AI Assessment - Socratic Journey</h1>
            <div class="score">Score: ${llmJudgeResponse.score}%</div>
            <div>Complete Learning Journey Assessment</div>
          </div>

          <div class="section">
            <div class="section-title">📚 Learning Journey - Questions & Answers</div>
            ${responses.map((response, index) => `
              <div class="qa-item">
                <div class="question">Q${index + 1}: ${allQuestions[index]}</div>
                <div class="answer"><strong>Your Answer:</strong> ${response.userAnswer}</div>
                ${response.insight ? `<div class="qa-insight">💡 Insight Gained: ${response.insight}</div>` : ''}
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">📝 AI Assessment Feedback</div>
            <div class="feedback">${llmJudgeResponse.feedback}</div>
          </div>

          ${llmJudgeResponse.strengths.length > 0 ? `
          <div class="section">
            <div class="section-title strength">✅ Strengths</div>
            ${llmJudgeResponse.strengths.map(strength => `<div class="list-item strength">• ${strength}</div>`).join('')}
          </div>
          ` : ''}

          ${llmJudgeResponse.suggestions.length > 0 ? `
          <div class="section">
            <div class="section-title suggestion">💡 Suggestions for Improvement</div>
            ${llmJudgeResponse.suggestions.map(suggestion => `<div class="list-item suggestion">• ${suggestion}</div>`).join('')}
          </div>
          ` : ''}

          ${llmJudgeResponse.insights && llmJudgeResponse.insights.length > 0 ? `
          <div class="section">
            <div class="section-title insight">🧠 Key Insights</div>
            ${llmJudgeResponse.insights.map(insight => `<div class="list-item insight">• ${insight}</div>`).join('')}
          </div>
          ` : ''}

          ${llmJudgeResponse.improvements.length > 0 ? `
          <div class="section">
            <div class="section-title improvement">📈 Areas for Improvement</div>
            ${llmJudgeResponse.improvements.map(improvement => `<div class="list-item improvement">• ${improvement}</div>`).join('')}
          </div>
          ` : ''}

          <div class="summary">
            <div class="section-title">📖 Study Session Summary</div>
            <div><strong>Topic:</strong> ${question.title}</div>
            <div><strong>Questions Completed:</strong> ${responses.length}</div>
            <div><strong>Total Insights Discovered:</strong> ${insights.length}</div>
            <div><strong>Session Duration:</strong> ${question.timeEstimate || 15} minutes (estimated)</div>
          </div>

          <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
            Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }

    // Show "Printed!" tooltip for 2 seconds
    setShowPrintTooltip(true);
    setTimeout(() => {
      setShowPrintTooltip(false);
    }, 2000);
  };

  // Handle response submission with real-time adaptation
  const handleResponseSubmit = async () => {
    if (!userResponse.trim()) return;

    // Enhanced insight extraction with user context
    const enhancedInsights = userContext 
      ? extractEnhancedInsights(userResponse, userContext, question.conceptId, currentStep)
      : [];

    // Detect misconceptions with gentle correction
    const misconceptions = detectMisconceptions(userResponse, question.conceptId);

    const newResponse: StudyModeResponse = {
      stepId: `step-${currentStep}`,
      userAnswer: userResponse,
      feedback: generateFeedback(userResponse, currentStep),
      hintsUsed: showHint ? 1 : 0,
      timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
      insight: extractInsight(userResponse, currentStep)
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Add enhanced insights if found
    if (enhancedInsights.length > 0) {
      setInsights(prev => [...prev, ...enhancedInsights]);
    }

    // Add original insight if found
    if (newResponse.insight) {
      setInsights(prev => [...prev, newResponse.insight!]);
    }

    // Generate real-time follow-up questions if not the last question
    if (!isLastQuestion && hasLlmProvider) {
      await generateRealTimeFollowUp(userResponse);
    }

    // Move to next question or complete the entire journey
    if (isLastQuestion) {
      // Complete the Socratic journey - get comprehensive LLM feedback for ALL questions
      await completeEntireSocraticJourney(updatedResponses);
    } else {
      setCurrentStep(prev => prev + 1);
      setUserResponse('');
      setShowHint(false);
      setCurrentDynamicFollowUps([]); // Reset follow-ups for next question
    }
  };

  // Complete the entire Socratic journey with comprehensive assessment
  const completeEntireSocraticJourney = async (finalResponses: StudyModeResponse[]) => {
    setIsGettingJudgment(true);
    
    try {
      // Prepare comprehensive data for LLM judge with ALL questions and responses
      const comprehensiveJudgeRequest = {
        question: question.socratiQuestion!,
        userResponses: finalResponses.map((response, index) => ({
          question: allQuestions[index],
          answer: response.userAnswer
        })),
        conceptArea: question.title,
        learningObjectives: [
          "Understand core concepts through guided discovery",
          "Develop critical thinking skills through sequential questioning",
          "Apply Socratic reasoning methods across the entire learning journey",
          "Build insights progressively through guided exploration"
        ],
        // Enhanced context for comprehensive feedback
        followUpQuestions: question.followUpQuestions,
        expectedInsights: question.expectedInsights,
        difficulty: question.level,
        relatedConcepts: question.relatedConcepts,
        fullQuestionContext: {
          title: question.title,
          description: `Complete Socratic journey with ${finalResponses.length} questions`,
          hints: question.hints
        }
      };

      console.log('🎓 Calling comprehensive socraticJudge for entire journey:', comprehensiveJudgeRequest);
      // Get comprehensive LLM judgment for the entire journey
      const judgment = await socraticJudge(comprehensiveJudgeRequest);
      console.log('🎓 Received comprehensive judgment:', judgment);
      
      setLlmJudgeResponse(judgment);
      setShowLlmFeedbackModal(true);

      // Create session with enhanced score and insights
      const session: StudyModeSession = {
        id: `session-${Date.now()}`,
        userId: 'anonymous',
        conceptId: question.conceptId,
        questionId: question.id,
        type: 'socratic',
        startTime,
        endTime: new Date(),
        responses: finalResponses,
        progress: 100,
        score: judgment.score,
        insights: [...insights, ...(judgment.insights || [])],
        isComplete: true
      };

      saveStudyModeProgress(session);
      setIsComplete(true);

    } catch (error) {
      console.error('Error getting comprehensive LLM judgment:', error);
      // Fallback to completion without LLM feedback
      completeSessionWithoutLlm(finalResponses);
    } finally {
      setIsGettingJudgment(false);
    }
  };

  // Fallback completion without LLM feedback
  const completeSessionWithoutLlm = (finalResponses: StudyModeResponse[]) => {
    const session: StudyModeSession = {
      id: `session-${Date.now()}`,
      userId: 'anonymous',
      conceptId: question.conceptId,
      questionId: question.id,
      type: 'socratic',
      startTime,
      endTime: new Date(),
      responses: finalResponses,
      progress: 100,
      score: Math.round((finalResponses.reduce((acc, r) => acc + (r.insight ? 20 : 10), 0) / finalResponses.length) * 5),
      insights,
      isComplete: true
    };

    saveStudyModeProgress(session);
    setIsComplete(true);
    // Misconception refutation injection (#15) – append to insights if pattern match
    try {
      const refs = misconceptionRefutations.filter(m => m.patternId === question.conceptId).slice(0,1);
      if (refs.length) {
        session.insights = (session.insights||[]).concat('Refutation: '+refs[0].misconception+' → '+refs[0].correctModel);
      }
    } catch {}
    onComplete(session);
  };

  // Generate contextual feedback
  const generateFeedback = (response: string, stepIndex: number): string => {
    const lowercaseResponse = response.toLowerCase();
    
    // Check if response contains key concepts
    const conceptsFound = [];
    
    if (stepIndex === 0) {
      // Main Socratic question feedback
      if (lowercaseResponse.includes('communicat') || lowercaseResponse.includes('talk') || lowercaseResponse.includes('coordinat')) {
        conceptsFound.push('communication');
      }
      if (lowercaseResponse.includes('protocol') || lowercaseResponse.includes('standard') || lowercaseResponse.includes('format')) {
        conceptsFound.push('protocols');
      }
      if (lowercaseResponse.includes('confus') || lowercaseResponse.includes('conflict') || lowercaseResponse.includes('duplicat')) {
        conceptsFound.push('coordination challenges');
      }
    }

    // Generate encouraging feedback
    if (conceptsFound.length > 0) {
      return `Excellent insight! You've identified ${conceptsFound.join(' and ')} as key elements. This shows you're thinking about the fundamental challenges of agent collaboration.`;
    } else {
      return "Good thinking! Consider how this relates to the challenges of coordination and avoiding confusion between agents.";
    }
  };

  // Extract insights from responses
  const extractInsight = (response: string, stepIndex: number): string | undefined => {
    const lowercaseResponse = response.toLowerCase();
    
    if (stepIndex === 0) {
      if (lowercaseResponse.includes('communicat')) {
        return "Communication is fundamental to any collaborative system";
      }
      if (lowercaseResponse.includes('protocol')) {
        return "Protocols provide structure and prevent chaos in multi-agent systems";
      }
    }
    
    return undefined;
  };

  // Complete the session with LLM judgment
  const completeSessionWithJudgment = async (finalResponses: StudyModeResponse[]) => {
    console.log('🎓 completeSessionWithJudgment called with responses:', finalResponses);
    setIsGettingJudgment(true);
    
    try {
      // Prepare data for LLM judge with comprehensive context
      const judgeRequest = {
        question: question.socratiQuestion!,
        userResponses: finalResponses.map((response, index) => ({
          question: allQuestions[index],
          answer: response.userAnswer
        })),
        conceptArea: question.title,
        learningObjectives: [
          "Understand core concepts through guided discovery",
          "Develop critical thinking skills",
          "Apply Socratic reasoning methods"
        ],
        // Enhanced context for better LLM feedback (using available properties)
        followUpQuestions: question.followUpQuestions,
        expectedInsights: question.expectedInsights,
        difficulty: question.level, // Use available level property
        relatedConcepts: question.relatedConcepts,
        fullQuestionContext: {
          title: question.title,
          hints: question.hints
        }
      };

      console.log('🎓 Calling socraticJudge with request:', judgeRequest);
      // Get LLM judgment
      const judgment = await socraticJudge(judgeRequest);
      console.log('🎓 Received judgment:', judgment);
      setLlmJudgeResponse(judgment);
      setShowLlmFeedbackModal(true);

      // Create session with enhanced score and insights
      const session: StudyModeSession = {
        id: `session-${Date.now()}`,
        userId: 'anonymous',
        conceptId: question.conceptId,
        questionId: question.id,
        type: 'socratic',
        startTime,
        endTime: new Date(),
        responses: finalResponses,
        progress: 100,
        score: judgment.score,
        insights: [...insights, ...(judgment.insights || [])],
        isComplete: true
      };

      saveStudyModeProgress(session);
      setIsComplete(true);
      console.log('Socratic completion triggered, isComplete set to true');
      onComplete(session);
    } catch (error) {
      console.error('Error getting LLM judgment:', error);
      // Fallback to original completion
      completeSession(finalResponses);
    } finally {
      setIsGettingJudgment(false);
    }
  };

  // Complete the session
  const completeSession = (finalResponses: StudyModeResponse[]) => {
    const session: StudyModeSession = {
      id: `session-${Date.now()}`,
      userId: 'anonymous',
      conceptId: question.conceptId,
      questionId: question.id,
      type: 'socratic',
      startTime,
      endTime: new Date(),
      responses: finalResponses,
      progress: 100,
      score: calculateScore(finalResponses),
      insights,
      isComplete: true
    };

    saveStudyModeProgress(session);
    setIsComplete(true);
    console.log('Socratic fallback completion triggered, isComplete set to true');
    onComplete(session);
  };

  // Calculate score based on insights and engagement
  const calculateScore = (finalResponses: StudyModeResponse[]): number => {
    let score = 50; // Base score
    
    // Add points for insights
    score += insights.length * 20;
    
    // Add points for thoughtful responses (longer, more detailed)
    finalResponses.forEach(response => {
      if (response.userAnswer.length > 100) score += 10;
      if (response.userAnswer.includes('because') || response.userAnswer.includes('therefore')) score += 5;
    });
    
    // Subtract points for excessive hint usage
    const totalHints = finalResponses.reduce((sum, r) => sum + r.hintsUsed, 0);
    score -= totalHints * 5;
    
    return Math.min(100, Math.max(0, score));
  };

  const progress = ((currentStep + 1) / allQuestions.length) * 100;

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-green-200 dark:border-green-800">
        <CardHeader className="text-center bg-green-50 dark:bg-green-950/30">
          <CardTitle className="flex items-center justify-center gap-2 text-green-800 dark:text-green-200">
            <CheckCircle size={24} className="text-green-600" />
            Socratic Discovery Complete!
          </CardTitle>
          <CardDescription>
            You've successfully explored {question.title} through guided questioning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* LLM Judge Results */}
          {llmJudgeResponse ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={20} className="text-blue-500" />
                    AI Learning Assessment
                  </div>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip open={showPrintTooltip} onOpenChange={setShowPrintTooltip}>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handlePrintFeedback}>
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{showPrintTooltip ? "Opening print dialog..." : "Print feedback"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip open={showCopyTooltip} onOpenChange={setShowCopyTooltip}>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleCopyFeedback}>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{showCopyTooltip ? "Copied!" : "Copy feedback"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </h3>
                {/* Score */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">{llmJudgeResponse.score}%</div>
                  <div className="text-sm text-muted-foreground">Learning Effectiveness Score</div>
                </div>
                {/* Feedback (Markdown supported) */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
                  <h4 className="font-medium mb-3 text-blue-800 dark:text-blue-200">Assessment Feedback</h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none pr-4">
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                      {llmJudgeResponse.feedback}
                    </ReactMarkdown>
                  </div>
                </div>
                {/* Strengths */}
                {llmJudgeResponse.strengths.length > 0 && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg mb-3">
                    <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">Your Strengths</h4>
                    <ul className="text-sm text-green-800 dark:text-green-300 space-y-2">
                      {llmJudgeResponse.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">
                            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                              {strength}
                            </ReactMarkdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Suggestions */}
                {llmJudgeResponse.suggestions.length > 0 && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg mb-3">
                    <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-200">Suggestions for Improvement</h4>
                    <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-2">
                      {llmJudgeResponse.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">
                            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                              {suggestion}
                            </ReactMarkdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
              <h4 className="font-medium mb-3 text-yellow-800 dark:text-yellow-200">AI Judge Unavailable</h4>
              <div className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                The AI judge could not be reached or returned no feedback. Please check your network or try again later.
              </div>
            </div>
          )}

          {/* Insights Discovered */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb size={20} className="text-yellow-500" />
              Key Insights Discovered
            </h3>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">{insight}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Summary */}
          <div>
            <h3 className="font-semibold mb-3">What You've Learned</h3>
            <p className="text-muted-foreground">
              {question.explanation}
            </p>
          </div>

          {/* Next Steps */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Study Mode
            </Button>
            {llmJudgeResponse && (
              <Button 
                variant="outline"
                onClick={() => setShowLlmFeedbackModal(true)} 
                className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Target size={16} />
                View AI Assessment
              </Button>
            )}
            <Button 
              onClick={resetToStart} 
              className="bg-primary hover:bg-primary/90 flex items-center gap-2"
            >
              <Brain size={16} />
              Retake This Question
            </Button>
          </div>
          
          {/* Retake explanation */}
          <div className="text-center text-sm text-muted-foreground">
            Want to improve your score or explore different responses? Click "Retake" to start fresh!
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show elicitation phase first
  if (showElicitation) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onBack}>
                  <ArrowLeft size={16} />
                </Button>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={24} className="text-primary" />
                    Personalize Your Learning
                  </CardTitle>
                  <CardDescription>Help us create the best Socratic experience for you</CardDescription>
                </div>
              </div>
              <Badge className="ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)]">
                Setup
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Elicitation Component */}
        <EnhancedSocraticElicitation
          conceptId={question.conceptId}
          onContextGathered={handleContextGathered}
          onSkip={handleSkipElicitation}
        />

        {/* LLM Configuration Notice */}
        <LlmConfigurationNotice mode="socratic" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* User Context Display */}
      {userContext && (
        <Card className="bg-muted text-foreground border">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-muted-foreground" />
                <span className="font-medium">
                  Personalized for {userContext.experience} level
                </span>
                {userContext.background && (
                  <span className="text-muted-foreground">
                    • {userContext.background}
                  </span>
                )}
                {useOrchestratorQuestions && (
                  <Badge variant="secondary" className="ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)] ml-2">
                    AI Orchestrator
                  </Badge>
                )}
                {isAdaptive && !useOrchestratorQuestions && (
                  <Badge variant="secondary" className="ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)] ml-2">
                    AI-Adapted
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {userContext.timeAvailable} min session • {userContext.learningStyle} learner
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft size={16} />
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain size={24} className="text-primary" />
                  {question.title}
                </CardTitle>
                <CardDescription>
                  {userContext ? 'Personalized ' : ''}Socratic Discovery Mode
                </CardDescription>
              </div>
            </div>
            <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">
              {question.level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Question {currentStep + 1} of {allQuestions.length}</span>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{question.timeEstimate || 15} min</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            {/* Insight Progress Indicator */}
            {insights.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Lightbulb size={14} className="text-yellow-600" />
                <span className="text-yellow-700 dark:text-yellow-300">
                  {insights.length} insight{insights.length !== 1 ? 's' : ''} discovered • Building understanding...
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* LLM Configuration Notice */}
      <LlmConfigurationNotice mode="socratic" />

      {/* Loading Orchestrator Questions */}
      {isLoadingOrchestratorQuestions && (
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
              <div className="animate-spin">
                <Brain size={20} />
              </div>
              <span className="font-medium">
                Generating personalized Socratic questions from AI orchestrator...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl leading-relaxed flex-1">
              {currentQuestion}
            </CardTitle>
            {/* Show Retake button next to the question title if not complete */}
            {!isComplete && currentStep > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground flex-shrink-0"
                onClick={resetToStart}
                title="Start over from the beginning"
              >
                <Brain size={16} className="mr-1" />
                Start Over
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Response Area */}
          <div>
            <TextareaWithVoice
              value={userResponse}
              onChange={setUserResponse}
              placeholder="Share your thoughts and reasoning. There's no single right answer - we're exploring ideas together. You can type or use the microphone to speak."
              className="min-h-[120px] resize-none"
              label="Share your thoughts:"
              description="Express your ideas through typing or voice input"
            />
          </div>

          {/* Real-time Follow-up Questions */}
            {hasLlmProvider && currentDynamicFollowUps.length > 0 && userResponse.length > 20 && (
              <div className="p-4 bg-muted text-foreground border rounded-lg">
              <div className="flex items-start gap-2 mb-3">
                  <Brain size={16} className="text-muted-foreground mt-0.5" />
                <div>
                    <p className="text-sm font-medium">
                    Interesting response! Consider these follow-up questions:
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {currentDynamicFollowUps.slice(0, 2).map((followUp, index) => (
                  <div key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-border">
                    {followUp}
                  </div>
                ))}
              </div>
                {isGeneratingFollowUp && (
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-amber-600" />
                  Generating follow-up questions...
                </div>
              )}
            </div>
          )}

          {/* Graceful degradation notice */}
          {!hasLlmProvider && userResponse.length > 50 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb size={14} className="text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-medium">💡 Enhancement available:</span> Configure an LLM provider to unlock personalized follow-up questions and deeper exploration based on your responses.
                </p>
              </div>
            </div>
          )}

          {/* Hint Section */}
          {question.hints && question.hints[currentStep] && (
            <div>
              {!showHint ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowHint(true);
                    setHintsUsed(prev => prev + 1);
                  }}
                >
                  <Lightbulb size={16} className="mr-1" />
                  Need a hint?
                </Button>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={16} className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">Hint:</p>
                      <p className="text-sm text-blue-700">
                        {question.hints![currentStep]}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            <Button 
              onClick={handleResponseSubmit}
              disabled={!userResponse.trim() || isGettingJudgment}
            >
              {isGettingJudgment ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Getting AI Assessment...
                </>
              ) : (
                <>
                  {isLastQuestion ? 'Complete Discovery' : 'Continue Exploring'}
                  <ArrowRight size={16} className="ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Responses */}
      {responses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendUp size={20} />
              Your Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="text-sm font-medium mb-1">
                      Question {index + 1}: {allQuestions[index]}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Your response: "{response.userAnswer}"
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 rounded leading-relaxed">
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {response.feedback}
                      </ReactMarkdown>
                    </div>
                    {response.insight && (
                      <div className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 rounded mt-2 leading-relaxed">
                        💡 Insight: {response.insight}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* LLM Feedback Modal */}
      {llmJudgeResponse && (
        <Dialog open={showLlmFeedbackModal} onOpenChange={(open) => {
          // Prevent accidental closing - require explicit action
          if (!open) {
            const confirmed = window.confirm(
              "Are you sure you want to close your comprehensive AI assessment? You can review this feedback again from the completion screen."
            );
            if (!confirmed) return;
          }
          setShowLlmFeedbackModal(open);
        }}>
          <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-blue-700">
                <div className="flex items-center gap-2">
                  <Target size={20} />
                  Comprehensive AI Assessment - Socratic Journey Complete
                </div>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip open={showPrintTooltip} onOpenChange={setShowPrintTooltip}>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handlePrintFeedback}>
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showPrintTooltip ? "Opening print dialog..." : "Print feedback"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip open={showCopyTooltip} onOpenChange={setShowCopyTooltip}>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleCopyFeedback}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showCopyTooltip ? "Copied!" : "Copy feedback"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </DialogTitle>
              <DialogDescription>
                Comprehensive feedback and analysis for your complete Socratic learning journey
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {llmJudgeResponse.score}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Learning Effectiveness Score
                </div>
              </div>

              {/* Main Feedback */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Assessment Feedback</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {llmJudgeResponse.feedback}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Strengths */}
              {llmJudgeResponse.strengths.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-green-700">
                    <CheckCircle size={18} />
                    Your Strengths
                  </h3>
                  <div className="space-y-3">
                    {llmJudgeResponse.strengths.map((strength, index) => (
                      <div key={index} className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                            {strength}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {llmJudgeResponse.suggestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-amber-700">
                    <Lightbulb size={18} />
                    Suggestions for Improvement
                  </h3>
                  <div className="space-y-3">
                    {llmJudgeResponse.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                            {suggestion}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Insights */}
              {llmJudgeResponse.insights && llmJudgeResponse.insights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-purple-700">
                    <Target size={18} />
                    Key Learning Insights
                  </h3>
                  <div className="space-y-3">
                    {llmJudgeResponse.insights.map((insight, index) => (
                      <div key={index} className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                            {insight}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas for Improvement */}
              {llmJudgeResponse.improvements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-orange-700">
                    <TrendUp size={18} />
                    Areas for Growth
                  </h3>
                  <div className="space-y-3">
                    {llmJudgeResponse.improvements.map((improvement, index) => (
                      <div key={index} className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                            {improvement}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowLlmFeedbackModal(false);
                    // Don't navigate yet - user can review this again
                  }}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Review Later
                </Button>
                <Button 
                  onClick={() => {
                    setShowLlmFeedbackModal(false);
                    // Complete the session and navigate
                    onComplete({
                      id: `session-${Date.now()}`,
                      userId: 'anonymous',
                      conceptId: question.conceptId,
                      questionId: question.id,
                      type: 'socratic',
                      startTime,
                      endTime: new Date(),
                      responses,
                      progress: 100,
                      score: llmJudgeResponse?.score || 75,
                      insights: [...insights, ...(llmJudgeResponse?.insights || [])],
                      isComplete: true
                    });
                  }}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Continue to Study Mode
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-3">
                Take your time to review this feedback. You can access it again from the completion screen.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Enhanced markdown components following EnlightenMe approach
const markdownComponents = {
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    if (!match) {
      // Inline code
      return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>{children}</code>;
    }
    // Block code - simplified for socratic mode
    return (
      <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4">
        <code className="text-sm font-mono text-foreground">{children}</code>
      </pre>
    );
  },
  pre: ({ children }: any) => <>{children}</>, // Use fragment, not <div>
  h1: ({ children }: any) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">{children}</h3>,
  h4: ({ children }: any) => <h4 className="text-base font-medium mt-3 mb-2 text-foreground">{children}</h4>,
  p: ({ children }: any) => <p className="mb-3 text-foreground leading-relaxed">{children}</p>,
  ul: ({ children }: any) => <ul className="list-disc list-inside mb-3 space-y-1 text-foreground">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground">{children}</ol>,
  li: ({ children }: any) => <li className="text-foreground">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => <tr className="border-b border-border">{children}</tr>,
  th: ({ children }: any) => <th className="px-4 py-2 text-left font-semibold text-foreground">{children}</th>,
  td: ({ children }: any) => <td className="px-4 py-2 text-foreground">{children}</td>,
  a: ({ children, href }: any) => (
    <a href={href} className="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
};

export default SocraticQuestionMode;
