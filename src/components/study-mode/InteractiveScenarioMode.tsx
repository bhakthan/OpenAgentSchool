import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LlmConfigurationNotice from './LlmConfigurationNotice'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { 
  PlayCircle, ArrowLeft, CheckCircle, ArrowRight, X,
  Clock, Target, TrendUp, Code, Monitor, Lightbulb, Copy, Printer
} from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StudyScenario, StudyModeSession, StudyModeResponse, ScenarioChallenge, ChallengeResult } from '@/lib/data/studyMode/types';
import { saveStudyModeProgress } from '@/lib/data/studyMode/progress';
import { scenarioJudge, LlmJudgeResponse } from '@/lib/llmJudge';

interface InteractiveScenarioModeProps {
  scenario: StudyScenario;
  onComplete: (session: StudyModeSession) => void;
  onBack: () => void;
  onRetake?: () => void; // <-- add optional onRetake prop
}

const InteractiveScenarioMode: React.FC<InteractiveScenarioModeProps> = ({ 
  scenario, 
  onComplete, 
  onBack,
  onRetake // <-- accept onRetake
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [responses, setResponses] = useState<StudyModeResponse[]>([]);
  const [challengeResults, setChallengeResults] = useState<ChallengeResult[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string>(''); // For single radio button selection
  const [startTime] = useState(new Date());
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string>('');
  const [llmJudgeResponse, setLlmJudgeResponse] = useState<LlmJudgeResponse | null>(null);
  const [isGettingJudgment, setIsGettingJudgment] = useState(false);
  const [finalLlmJudgment, setFinalLlmJudgment] = useState<LlmJudgeResponse | null>(null);
  const [showLlmFeedbackModal, setShowLlmFeedbackModal] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showPrintTooltip, setShowPrintTooltip] = useState(false);
  // Hold pending finalization so users can read feedback before completing
  const [pendingFinalResponses, setPendingFinalResponses] = useState<StudyModeResponse[] | null>(null);
  const [pendingFinalResults, setPendingFinalResults] = useState<ChallengeResult[] | null>(null);

  // Reset function to allow retaking the same scenario
  const resetToStart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to retake this scenario?\n\n' +
      '• This will reset all your progress for this scenario\n' +
      '• For the best experience, refresh the page after retaking to fully reset all modules\n' +
      '• You can continue without refreshing, but some features may not reset completely'
    );
    
    if (confirmed) {
      // Reset component state
      setCurrentStep(0);
      setUserResponse('');
      setResponses([]);
      setChallengeResults([]);
      setSelectedChoices([]);
      setSelectedChoice('');
      setShowHint(false);
      setIsComplete(false);
      setExecutionOutput('');
      setLlmJudgeResponse(null);
      setIsGettingJudgment(false);
      setFinalLlmJudgment(null);
      setShowLlmFeedbackModal(false);
      
      // Inform user about page refresh for optimal experience
      setTimeout(() => {
        const shouldRefresh = window.confirm(
          'Retake initiated! 🎯\n\n' +
          'For the optimal retake experience, would you like to refresh the page now?\n\n' +
          '✅ Refresh: Ensures all modules are fully reset\n' +
          '⏩ Continue: Proceed without refresh (some features may retain state)'
        );
        if (shouldRefresh) {
          window.location.reload();
        }
      }, 100);
    }
  };

  const currentChallenge = scenario.challenges[currentStep];
  const isLastChallenge = currentStep >= scenario.challenges.length - 1;

  // Copy LLM feedback to clipboard
  const handleCopyFeedback = () => {
    if (!llmJudgeResponse) return;

    const formattedFeedback = `🎯 AI Assessment - Interactive Scenario
${isLastChallenge ? 'Final Results' : `Step ${currentStep + 1}`}
Score: ${llmJudgeResponse.score}%

📝 Assessment Feedback:
${llmJudgeResponse.feedback}

${llmJudgeResponse.strengths.length > 0 ? `✅ Strengths:
${llmJudgeResponse.strengths.map(strength => `• ${strength}`).join('\n')}

` : ''}${llmJudgeResponse.suggestions.length > 0 ? `💡 Suggestions for Improvement:
${llmJudgeResponse.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}

` : ''}${llmJudgeResponse.insights && llmJudgeResponse.insights.length > 0 ? `🧠 Key Insights:
${llmJudgeResponse.insights.map(insight => `• ${insight}`).join('\n')}

` : ''}${llmJudgeResponse.improvements.length > 0 ? `📈 Areas for Improvement:
${llmJudgeResponse.improvements.map(improvement => `• ${improvement}`).join('\n')}` : ''}`;

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
          <title>AI Assessment - Interactive Scenario</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 15px; }
            .score { font-size: 24px; color: #3b82f6; font-weight: bold; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; color: #1f2937; margin-bottom: 10px; font-size: 16px; }
            .feedback { background: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0; }
            .list-item { margin: 5px 0; padding-left: 15px; }
            .strength { color: #059669; }
            .suggestion { color: #d97706; }
            .insight { color: #7c3aed; }
            .improvement { color: #dc2626; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 AI Assessment - Interactive Scenario</h1>
            <div>${isLastChallenge ? 'Final Results' : `Step ${currentStep + 1}`}</div>
            <div class="score">Score: ${llmJudgeResponse.score}%</div>
            <div>Challenge Assessment</div>
          </div>
          
          <div class="section">
            <div class="section-title">📝 Assessment Feedback</div>
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

  // Handle challenge submission
  const handleChallengeSubmit = async () => {
    // Validate input based on challenge type
    if (currentChallenge.type === 'multiple-choice') {
      if (typeof currentChallenge.correctAnswer === 'number' && !selectedChoice) return;
      if (typeof currentChallenge.correctAnswer !== 'number' && selectedChoices.length === 0) return;
    }
    if (currentChallenge.type === 'code' && !userResponse.trim()) return;
    if (currentChallenge.type === 'design' && !userResponse.trim()) return;

    setIsGettingJudgment(true);

    try {
      // Get LLM judgment for current step
      const judgeRequest = {
        scenarioTitle: scenario.title,
        scenarioDescription: scenario.description,
        challenge: {
          type: currentChallenge.type,
          question: currentChallenge.question || currentChallenge.description,
          description: currentChallenge.description,
          context: currentChallenge.codeContext,
          options: currentChallenge.options, // Pass available options
          correctAnswer: currentChallenge.correctAnswer // Pass correct answer for context
        },
        userResponse: currentChallenge.type === 'multiple-choice' 
          ? (selectedChoice || selectedChoices.join(', '))
          : userResponse,
        isStepEvaluation: true,
        previousSteps: responses.map(r => ({
          question: scenario.challenges[responses.indexOf(r)]?.question || scenario.challenges[responses.indexOf(r)]?.description || '',
          userAnswer: r.userAnswer,
          feedback: r.feedback
        }))
      };

      const judgment = await scenarioJudge(judgeRequest);
      setLlmJudgeResponse(judgment);
      // Only auto-open the feedback modal on the last challenge; otherwise let users open it manually
      if (isLastChallenge) {
        setShowLlmFeedbackModal(true);
      }

      // Create response with LLM feedback
      const newResponse: StudyModeResponse = {
        stepId: `step-${currentStep}`,
        userAnswer: currentChallenge.type === 'multiple-choice' ? selectedChoices.join(', ') : userResponse,
        feedback: judgment.feedback,
        hintsUsed: showHint ? 1 : 0,
        timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
        insight: judgment.insights?.[0],
        isCorrect: judgment.score >= 70 // Consider 70+ as correct
      };

      const result: ChallengeResult = {
        isCorrect: judgment.score >= 70,
        feedback: judgment.feedback,
        insight: judgment.insights?.[0]
      };

      const updatedResponses = [...responses, newResponse];
      const updatedResults = [...challengeResults, result];
      
      setResponses(updatedResponses);
      setChallengeResults(updatedResults);

      // Simulate code execution for code challenges
      if (currentChallenge.type === 'code' && result.isCorrect) {
        simulateCodeExecution(userResponse);
      }

      // Move to next challenge, or stage finalization for user confirmation
      if (isLastChallenge) {
        // Keep the modal open so the user can read feedback, and defer completion
        setPendingFinalResponses(updatedResponses);
        setPendingFinalResults(updatedResults);
      } else {
        setCurrentStep(prev => prev + 1);
        setUserResponse('');
        setSelectedChoices([]);
        setSelectedChoice('');
        setShowHint(false);
        setExecutionOutput('');
        setShowLlmFeedbackModal(false);
        // Keep llmJudgeResponse available but modal closed
      }

    } catch (error) {
      console.error('Error getting LLM judgment:', error);
      // Fallback to original evaluation
      const result = evaluateChallenge(currentChallenge, userResponse, selectedChoices);
      
      const newResponse: StudyModeResponse = {
        stepId: `step-${currentStep}`,
        userAnswer: currentChallenge.type === 'multiple-choice' ? selectedChoices.join(', ') : userResponse,
        feedback: result.feedback,
        hintsUsed: showHint ? 1 : 0,
        timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
        insight: result.insight,
        isCorrect: result.isCorrect
      };

      const updatedResponses = [...responses, newResponse];
      const updatedResults = [...challengeResults, result];
      
      setResponses(updatedResponses);
      setChallengeResults(updatedResults);

      // Simulate code execution for code challenges
      if (currentChallenge.type === 'code' && result.isCorrect) {
        simulateCodeExecution(userResponse);
      }

      // Move to next challenge or complete
      if (isLastChallenge) {
        completeSession(updatedResponses, updatedResults);
      } else {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setUserResponse('');
          setSelectedChoices([]);
          setSelectedChoice('');
          setShowHint(false);
          setExecutionOutput('');
        }, 2000);
      }
    } finally {
      setIsGettingJudgment(false);
    }
  };

  // Handle final completion with comprehensive LLM assessment
  const handleFinalCompletion = async (finalResponses: StudyModeResponse[], results: ChallengeResult[]) => {
    try {
      // Get final comprehensive LLM judgment
      const finalJudgeRequest = {
        scenarioTitle: scenario.title,
        scenarioDescription: scenario.description,
        challenge: {
          type: 'analysis' as const,
          question: `Complete scenario analysis: ${scenario.title}`,
          description: `Overall scenario completion and learning assessment`,
          context: `Student completed ${scenario.challenges.length} challenges in this scenario`
        },
        userResponse: `Completed all ${scenario.challenges.length} challenges with responses: ${finalResponses.map(r => r.userAnswer).join('; ')}`,
        isStepEvaluation: false,
        previousSteps: finalResponses.map((r, i) => ({
          question: scenario.challenges[i]?.question || scenario.challenges[i]?.description || '',
          userAnswer: r.userAnswer,
          feedback: r.feedback
        }))
      };

      const finalJudgment = await scenarioJudge(finalJudgeRequest);
      setFinalLlmJudgment(finalJudgment);

      // Complete session with enhanced scoring
      const session: StudyModeSession = {
        id: `session-${Date.now()}`,
        userId: 'anonymous',
        conceptId: scenario.conceptId,
        questionId: scenario.id,
        type: 'scenario',
        startTime,
        endTime: new Date(),
        responses: finalResponses,
        progress: 100,
        score: finalJudgment.score,
        insights: [...results.filter(r => r.insight).map(r => r.insight!), ...(finalJudgment.insights || [])],
        isComplete: true
      };

      saveStudyModeProgress(session);
      setIsComplete(true);
      onComplete(session);
    } catch (error) {
      console.error('Error getting final LLM judgment:', error);
      // Fallback to original completion
      completeSession(finalResponses, results);
    }
  };

  // Evaluate challenge response
  const evaluateChallenge = (
    challenge: ScenarioChallenge, 
    response: string, 
    choices: string[]
  ): ChallengeResult => {
    switch (challenge.type) {
      case 'multiple-choice':
        // Handle numeric correctAnswer (single choice) vs string correctAnswer (multiple choices)
        if (typeof challenge.correctAnswer === 'number') {
          const selectedIndex = challenge.options?.findIndex(option => choices.includes(option)) ?? -1;
          const isCorrect = selectedIndex === challenge.correctAnswer;
          
          return {
            isCorrect,
            feedback: isCorrect 
              ? challenge.feedback || "Excellent! You've identified the correct approach for this scenario."
              : challenge.feedback || `Not quite. ${challenge.explanation}`,
            insight: isCorrect ? extractInsightFromChallenge(challenge) : undefined
          };
        } else {
          // Multiple choice with comma-separated string answers
          const correctChoices = challenge.correctAnswer?.split(',').map(s => s.trim()) || [];
          const isCorrect = correctChoices.every(choice => choices.includes(choice)) && 
                           choices.every(choice => correctChoices.includes(choice));
          
          return {
            isCorrect,
            feedback: isCorrect 
              ? "Excellent! You've identified the correct approach for this scenario."
              : `Not quite. The correct answer includes: ${correctChoices.join(', ')}. ${challenge.explanation}`,
            insight: isCorrect ? extractInsightFromChallenge(challenge) : undefined
          };
        }

      case 'code':
        const hasKeyElements = checkCodeKeyElements(response, challenge);
        return {
          isCorrect: hasKeyElements,
          feedback: hasKeyElements
            ? "Great implementation! Your code demonstrates the key concepts correctly."
            : `Your code is missing some key elements. ${challenge.explanation}`,
          insight: hasKeyElements ? extractInsightFromChallenge(challenge) : undefined
        };

      case 'design':
        const hasDesignElements = checkDesignElements(response, challenge);
        return {
          isCorrect: hasDesignElements,
          feedback: hasDesignElements
            ? "Excellent system design! You've considered the important aspects."
            : `Consider these aspects: ${challenge.explanation}`,
          insight: hasDesignElements ? extractInsightFromChallenge(challenge) : undefined
        };

      default:
        return {
          isCorrect: true,
          feedback: "Response recorded.",
          insight: undefined
        };
    }
  };

  // Check if code contains key elements
  const checkCodeKeyElements = (code: string, challenge: ScenarioChallenge): boolean => {
    const lowercaseCode = code.toLowerCase();
    
    // Look for key patterns based on challenge context
    if (challenge.description.includes('agent communication')) {
      return lowercaseCode.includes('send') || lowercaseCode.includes('message') || lowercaseCode.includes('communicate');
    }
    if (challenge.description.includes('error handling')) {
      return lowercaseCode.includes('try') || lowercaseCode.includes('except') || lowercaseCode.includes('error');
    }
    if (challenge.description.includes('coordination')) {
      return lowercaseCode.includes('wait') || lowercaseCode.includes('sync') || lowercaseCode.includes('coordinate');
    }
    
    return code.length > 50; // Basic length check
  };

  // Check design response elements
  const checkDesignElements = (response: string, challenge: ScenarioChallenge): boolean => {
    const lowercaseResponse = response.toLowerCase();
    
    if (challenge.description.includes('multi-agent')) {
      return lowercaseResponse.includes('agent') && 
             (lowercaseResponse.includes('coordinat') || lowercaseResponse.includes('communicat'));
    }
    
    return response.length > 100; // Basic thoroughness check
  };

  // Extract insights from challenges
  const extractInsightFromChallenge = (challenge: ScenarioChallenge): string | undefined => {
    if (challenge.description.includes('communication')) {
      return "Effective agent communication requires clear protocols and error handling";
    }
    if (challenge.description.includes('coordination')) {
      return "Agent coordination prevents conflicts and ensures system efficiency";
    }
    if (challenge.description.includes('error')) {
      return "Robust error handling is crucial for reliable multi-agent systems";
    }
    return undefined;
  };

  // Simulate code execution
  const simulateCodeExecution = (code: string) => {
    const outputs = [
      "✅ Agent 1: Initialized successfully",
      "✅ Agent 2: Connected to system",
      "📤 Agent 1: Sending message to Agent 2",
      "📥 Agent 2: Message received and processed",
      "🔄 Coordination complete",
      "✅ Task completed successfully!"
    ];

    setExecutionOutput("Running your code...\n\n");
    
    outputs.forEach((output, index) => {
      setTimeout(() => {
        setExecutionOutput(prev => prev + output + "\n");
      }, (index + 1) * 500);
    });
  };

  // Complete the session
  const completeSession = (finalResponses: StudyModeResponse[], results: ChallengeResult[]) => {
    const session: StudyModeSession = {
      id: `session-${Date.now()}`,
      userId: 'anonymous',
      conceptId: scenario.conceptId,
      questionId: scenario.id,
      type: 'scenario',
      startTime,
      endTime: new Date(),
      responses: finalResponses,
      progress: 100,
      score: calculateScore(results),
      insights: results.filter(r => r.insight).map(r => r.insight!),
      isComplete: true
    };

    saveStudyModeProgress(session);
    setIsComplete(true);
    onComplete(session);
  };

  // Calculate score based on correct answers
  const calculateScore = (results: ChallengeResult[]): number => {
    const correctCount = results.filter(r => r.isCorrect).length;
    return Math.round((correctCount / results.length) * 100);
  };

  const progress = ((currentStep + 1) / scenario.challenges.length) * 100;

  if (isComplete) {
    const correctCount = challengeResults.filter(r => r.isCorrect).length;
    const score = calculateScore(challengeResults);
    
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle size={24} className="text-green-600" />
            Scenario Complete!
          </CardTitle>
          <CardDescription>
            {scenario.title} - {scenario.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Summary */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">{score}%</div>
            <div className="text-muted-foreground">
              {correctCount} of {challengeResults.length} challenges completed correctly
            </div>
          </div>

          {/* Final LLM Assessment */}
          {finalLlmJudgment && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target size={20} className="text-blue-500" />
                  Comprehensive AI Learning Assessment
                </h3>
                
                {/* Assessment Score */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">{finalLlmJudgment.score}%</div>
                  <div className="text-sm text-muted-foreground">Overall Learning Effectiveness</div>
                </div>

                {/* Detailed Feedback */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
                  <h4 className="font-medium mb-3 text-blue-800 dark:text-blue-200">Comprehensive Assessment</h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none pr-4">
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                      {finalLlmJudgment.feedback}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Learning Strengths */}
                {finalLlmJudgment.strengths.length > 0 && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg mb-3">
                    <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">Your Learning Strengths</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                      {finalLlmJudgment.strengths.map((strength, index) => (
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

                {/* Growth Opportunities */}
                {finalLlmJudgment.suggestions.length > 0 && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg mb-3">
                    <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-200">Growth Opportunities</h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                      {finalLlmJudgment.suggestions.map((suggestion, index) => (
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

                {/* Additional Insights */}
                {finalLlmJudgment.insights && finalLlmJudgment.insights.length > 0 && (
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-200">Key Learning Insights</h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                      {finalLlmJudgment.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target size={14} className="mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">
                            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                              {insight}
                            </ReactMarkdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Separator />
            </div>
          )}

          {/* Learning Outcomes */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target size={20} className="text-green-500" />
              Learning Outcomes Achieved
            </h3>
            <div className="grid gap-2">
              {scenario.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500" />
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          {challengeResults.some(r => r.insight) && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-500" />
                Key Insights
              </h3>
              <div className="space-y-2">
                {challengeResults
                  .filter(r => r.insight)
                  .map((result, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm">{result.insight}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft size={16} className="mr-1" />
              Back to Study Mode
            </Button>
            <Button onClick={onRetake ? onRetake : resetToStart}>
              <PlayCircle size={16} className="mr-1" />
              Retake This Scenario
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
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
                  <PlayCircle size={24} className="text-primary" />
                  {scenario.title}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </div>
            </div>
            <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
              {scenario.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Challenge {currentStep + 1} of {scenario.challenges.length}</span>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{scenario.estimatedTime}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* LLM Configuration Notice */}
      <LlmConfigurationNotice mode="scenario" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Challenge */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {currentStep + 1}
                </span>
                Challenge: {currentChallenge.title}
              </CardTitle>
              <CardDescription>{currentChallenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Context Code */}
              {currentChallenge.codeContext && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code size={16} />
                    Current System Code
                  </h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">{currentChallenge.codeContext}</pre>
                  </div>
                </div>
              )}

              {/* Challenge Input */}
              {currentChallenge.type === 'multiple-choice' && (
                <div>
                  <h4 className="font-medium mb-3">
                    {typeof currentChallenge.correctAnswer === 'number' 
                      ? 'Select the best approach:' 
                      : 'Select all that apply:'
                    }
                  </h4>
                  <div className="space-y-3">
                    {currentChallenge.options?.map((option, index) => {
                      const isRadio = typeof currentChallenge.correctAnswer === 'number';
                      const isChecked = isRadio ? selectedChoice === option : selectedChoices.includes(option);
                      return (
                        <div 
                          key={index} 
                          className={cn(
                            "flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors",
                            isChecked
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                          onClick={() => {
                            if (isRadio) {
                              setSelectedChoice(option);
                              setSelectedChoices([option]);
                            } else {
                              if (selectedChoices.includes(option)) {
                                setSelectedChoices(prev => prev.filter(c => c !== option));
                              } else {
                                setSelectedChoices(prev => [...prev, option]);
                              }
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              `w-4 h-4 rounded-${isRadio ? 'full' : 'sm'} border-2 flex items-center justify-center`,
                              isChecked
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300 dark:border-gray-600"
                            )}>
                              {isChecked && (
                                <div className={`w-2 h-2 bg-white rounded-${isRadio ? 'full' : 'sm'}`}></div>
                              )}
                            </div>
                          </div>
                          <span className="text-sm flex-1 font-normal text-foreground">
                            {option}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentChallenge.type === 'code' && (
                <div>
                  <h4 className="font-medium mb-2">Write your implementation:</h4>
                  <Textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="# Write your code here..."
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
              )}

              {currentChallenge.type === 'design' && (
                <div>
                  <h4 className="font-medium mb-2">Describe your system design:</h4>
                  <Textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="Explain how you would design this system, including agent roles, communication patterns, and coordination mechanisms..."
                    className="min-h-[150px]"
                  />
                </div>
              )}

              {/* Hint */}
              {currentChallenge.hint && (
                <div>
                  {!showHint ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowHint(true)}
                    >
                      <Lightbulb size={16} className="mr-1" />
                      Need a hint?
                    </Button>
                  ) : (
                    <Alert>
                      <Lightbulb size={16} />
                      <AlertDescription>
                        {currentChallenge.hint}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                {/* View AI Feedback Button */}
                {llmJudgeResponse && (
                  <Dialog open={showLlmFeedbackModal} onOpenChange={setShowLlmFeedbackModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700">
                        <Target size={16} className="mr-2" />
                        View AI Feedback ({llmJudgeResponse.score}%)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between text-blue-700">
                          <div className="flex items-center gap-2">
                            <Target size={20} />
                            AI Assessment - Step {currentStep + 1}
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
                          Comprehensive feedback and analysis for your response
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
                      </div>
                      {/* Footer actions to keep dialog open until user confirms on last step */}
                      <div className="mt-6 flex items-center justify-end gap-2">
                        {!isLastChallenge ? (
                          <Button variant="outline" onClick={() => setShowLlmFeedbackModal(false)}>
                            Close
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" onClick={() => setShowLlmFeedbackModal(false)}>
                              Close
                            </Button>
                            <Button
                              onClick={async () => {
                                if (pendingFinalResponses && pendingFinalResults) {
                                  await handleFinalCompletion(pendingFinalResponses, pendingFinalResults);
                                  setShowLlmFeedbackModal(false);
                                  setPendingFinalResponses(null);
                                  setPendingFinalResults(null);
                                }
                              }}
                              disabled={!pendingFinalResponses || !pendingFinalResults}
                            >
                              Complete Scenario
                            </Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <Button 
                  onClick={handleChallengeSubmit}
                  disabled={
                    isGettingJudgment ||
                    (currentChallenge.type === 'multiple-choice' && 
                     ((typeof currentChallenge.correctAnswer === 'number' && !selectedChoice) ||
                      (typeof currentChallenge.correctAnswer !== 'number' && selectedChoices.length === 0))) ||
                    (currentChallenge.type !== 'multiple-choice' && !userResponse.trim())
                  }
                >
                  {isGettingJudgment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Getting AI Assessment...
                    </>
                  ) : (
                    <>
                      {isLastChallenge ? 'Complete Scenario' : 'Submit & Continue'}
                      <ArrowRight size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Latest Result */}
              {challengeResults[currentStep] && (
                <Alert className={challengeResults[currentStep].isCorrect ? 
                  "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30" : 
                  "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
                }>
                  <div className="flex items-start gap-2">
                    {challengeResults[currentStep].isCorrect ? (
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X size={16} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <AlertDescription className={challengeResults[currentStep].isCorrect ?
                      "text-green-700 dark:text-green-300 leading-relaxed" :
                      "text-red-700 dark:text-red-300 leading-relaxed"
                    }>
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {challengeResults[currentStep].feedback}
                      </ReactMarkdown>
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Execution Output */}
          {executionOutput && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor size={20} />
                  System Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono whitespace-pre-line h-48 overflow-y-auto">
                  {executionOutput}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={20} />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scenario.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index < currentStep ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : index === currentStep ? (
                      <div className="w-4 h-4 border-2 border-primary rounded-full" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    )}
                    <span className={cn(
                      "text-sm",
                      index <= currentStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {challenge.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scenario.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {outcome}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
    // Block code - simplified for scenario mode
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

export default InteractiveScenarioMode;
