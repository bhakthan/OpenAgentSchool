import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { 
  Brain, ArrowLeft, Lightbulb, CheckCircle, ArrowRight,
  Clock, Target, TrendUp
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { StudyModeQuestion, StudyModeSession, StudyModeResponse } from '@/lib/data/studyMode/types';
import { saveStudyModeProgress, clearQuestionProgress } from '@/lib/data/studyMode';
import { socraticJudge, LlmJudgeResponse } from '@/lib/llmJudge';
import LlmConfigurationNotice from './LlmConfigurationNotice';
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

  // Reset function to allow retaking the same question
  const resetToStart = () => {
    // Show confirmation if user has made progress
    if (responses.length > 0 || userResponse.trim()) {
      const confirmed = window.confirm(
        'Are you sure you want to start over? This will clear all your current responses and progress.'
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
    
    // Clear progress from storage using utility function
    clearQuestionProgress(question.id, 'socratic');
  };

  // All questions for this Socratic sequence
  const allQuestions = [
    question.socratiQuestion!,
    ...(question.followUpQuestions || [])
  ];

  const currentQuestion = allQuestions[currentStep];
  const isLastQuestion = currentStep >= allQuestions.length - 1;

  // Handle response submission
  const handleResponseSubmit = async () => {
    if (!userResponse.trim()) return;

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

    // Add insight if found
    if (newResponse.insight) {
      setInsights(prev => [...prev, newResponse.insight!]);
    }

    // Move to next question or complete
    if (isLastQuestion) {
      await completeSessionWithJudgment(updatedResponses);
    } else {
      setCurrentStep(prev => prev + 1);
      setUserResponse('');
      setShowHint(false);
    }
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

      // Get LLM judgment
      const judgment = await socraticJudge(judgeRequest);
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
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target size={20} className="text-blue-500" />
                  AI Learning Assessment
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
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
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
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
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
              <div className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
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
                  <Brain size={24} className="text-primary" />
                  {question.title}
                </CardTitle>
                <CardDescription>Socratic Discovery Mode</CardDescription>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
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
          </div>
        </CardContent>
      </Card>

      {/* LLM Configuration Notice */}
      <LlmConfigurationNotice mode="socratic" />

      {/* Main Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed flex items-center gap-2">
            {currentQuestion}
            {/* Show Retake button next to the question title if not complete */}
            {!isComplete && currentStep > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 text-muted-foreground hover:text-foreground"
                onClick={resetToStart}
                title="Start over from the beginning"
              >
                <Brain size={16} className="mr-1" />
                Start Over
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Response Area */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Share your thoughts:
            </label>
            <Textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Take your time to think through this question. There's no single right answer - we're exploring ideas together."
              className="min-h-[120px] resize-none"
            />
          </div>

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
