import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TextareaWithVoice } from "@/components/ui/TextareaWithVoice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bug, ArrowLeft, CheckCircle, ArrowRight, X, Warning,
  Clock, Target, TrendUp, Code, Terminal, FileText, Lightbulb,
  Play, Eye, Copy, Printer
} from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DebugChallenge, StudyModeSession, StudyModeResponse, DebugLog, DebugIssue } from '@/lib/data/studyMode/types';
import { saveStudyModeProgress } from '@/lib/data/studyMode/progress';
import { debugJudge, LlmJudgeResponse } from '@/lib/llmJudge';
import { useAuth } from '@/lib/auth/AuthContext';
import LlmConfigurationNotice from './LlmConfigurationNotice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DebugChallengeModeProps {
  challenge: DebugChallenge;
  onComplete: (session: StudyModeSession) => void;
  onBack: () => void;
}

const DebugChallengeMode: React.FC<DebugChallengeModeProps> = ({ 
  challenge, 
  onComplete, 
  onBack 
}) => {
  // Auth hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [currentPhase, setCurrentPhase] = useState<'analysis' | 'diagnosis' | 'solution'>('analysis');
  const [analysisResponse, setAnalysisResponse] = useState('');
  const [diagnosisResponse, setDiagnosisResponse] = useState('');
  const [solutionResponse, setSolutionResponse] = useState('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [responses, setResponses] = useState<StudyModeResponse[]>([]);
  const [startTime] = useState(new Date());
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [debugOutput, setDebugOutput] = useState<string>('');
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [llmJudgeResponse, setLlmJudgeResponse] = useState<LlmJudgeResponse | null>(null);
  const [isGettingJudgment, setIsGettingJudgment] = useState(false);
  const [showLlmFeedbackModal, setShowLlmFeedbackModal] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showPrintTooltip, setShowPrintTooltip] = useState(false);

  // Auto-open assessment modal if returning from authentication
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shouldShowAssessment = searchParams.get('showAssessment') === 'true';
    
    if (shouldShowAssessment && isAuthenticated && llmJudgeResponse) {
      // User returned from auth and assessment is ready
      setShowLlmFeedbackModal(true);
      
      // Clear the parameter (handled by parent StudyMode component, but belt-and-suspenders)
      searchParams.delete('showAssessment');
      const newSearch = searchParams.toString();
      const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [location.search, isAuthenticated, llmJudgeResponse, navigate]);

  // Enhanced markdown components following EnlightenMe approach
  const markdownComponents = {
    code: ({ children, className, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (!match) {
        // Inline code
        return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>{children}</code>;
      }
      // Block code - simplified for debug mode
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

  // Reset function to allow retaking the same challenge
  const resetToStart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to retake this debug challenge?\n\n' +
      '• This will reset all your progress for this challenge\n' +
      '• For the best experience, refresh the page after retaking to fully reset all modules\n' +
      '• You can continue without refreshing, but some features may not reset completely'
    );
    
    if (confirmed) {
      // Reset component state
      setCurrentPhase('analysis');
      setAnalysisResponse('');
      setDiagnosisResponse('');
      setSolutionResponse('');
      setSelectedIssues([]);
      setResponses([]);
      setUsedHints([]);
      setIsComplete(false);
      setDebugOutput('');
      setTestResults([]);
      setLlmJudgeResponse(null);
      setIsGettingJudgment(false);
      setShowLlmFeedbackModal(false);
      
      // Inform user about page refresh for optimal experience
      setTimeout(() => {
        const shouldRefresh = window.confirm(
          'Retake initiated! 🐛\n\n' +
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

  // Copy LLM feedback to clipboard
  const handleCopyFeedback = () => {
    if (!llmJudgeResponse) return;

    const formattedFeedback = `🐛 AI Assessment - Debug Challenge
Phase: ${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
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
          <title>Open Agent School - AI Assessment</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .branding { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
            .branding-title { font-size: 20px; font-weight: bold; color: #3b82f6; margin-bottom: 5px; }
            .branding-url { font-size: 12px; color: #6b7280; }
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
          <div class="branding">
            <div class="branding-title">Open Agent School</div>
            <div class="branding-url">openagentschool.org</div>
          </div>
          <div class="header">
            <h1>🐛 AI Assessment - Debug Challenge</h1>
            <div>Phase: ${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}</div>
            <div class="score">Score: ${llmJudgeResponse.score}%</div>
            <div>Debugging Assessment</div>
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
            Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}<br/>
            Open Agent School - openagentschool.org
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

  // Handle phase completion
  const handlePhaseComplete = async () => {
    const currentResponse = getCurrentPhaseResponse();
    if (!currentResponse.trim() && currentPhase !== 'diagnosis') return;
    if (currentPhase === 'diagnosis' && selectedIssues.length === 0) return;

    setIsGettingJudgment(true);
    
    try {
      // Auth gate for AI assessment - premium feature
      if (!isAuthenticated) {
        setIsGettingJudgment(false);
        
        // Track analytics for gated feature
        window.dispatchEvent(new CustomEvent('analytics:llmAssessmentAuthGate', {
          detail: {
            questionId: challenge.id,
            conceptId: 'debug-challenge',
            type: 'debug',
            phase: currentPhase,
            timestamp: new Date().toISOString()
          }
        }));

        toast({
          title: "Sign in to view AI assessment",
          description: "Get personalized debugging insights powered by AI. It's free!",
          duration: 5000,
        });

        const returnUrl = `/study-mode?qid=${challenge.id}&showAssessment=true`;
        navigate(`/auth?return=${encodeURIComponent(returnUrl)}`);
        return;
      }

      // Get LLM judgment for current phase with comprehensive context
      const judgeRequest = {
        phase: currentPhase,
        challengeTitle: challenge.title,
        challengeDescription: challenge.description,
        userResponse: currentPhase === 'diagnosis' ? selectedIssues.join(', ') : currentResponse,
        context: {
          codeSnippet: challenge.brokenCode,
          errorLogs: challenge.conversationLogs?.map(log => `[${log.type}] ${log.agent}: ${log.message}`) || [],
          expectedOutcome: challenge.expectedBehavior
        },
        // Enhanced challenge context for better LLM feedback
        challengeDetails: {
          brokenCode: challenge.brokenCode,
          workingCode: challenge.solution,
          conversationLogs: challenge.conversationLogs,
          expectedBehavior: challenge.expectedBehavior,
          commonMistakes: challenge.commonIssues?.map(issue => issue.issue) || [],
          learningObjectives: [
            `Master ${currentPhase} phase of debugging`,
            "Develop systematic debugging methodology",
            "Understand error pattern recognition"
          ],
          debuggingFocus: challenge.commonIssues?.map(issue => issue.diagnosis) || [],
          technologies: challenge.agentConfigs?.map(config => config.name) || []
        }
      };

      const judgment = await debugJudge(judgeRequest);
      setLlmJudgeResponse(judgment);
      setShowLlmFeedbackModal(true);

      // Track analytics for successful assessment view
      window.dispatchEvent(new CustomEvent('analytics:llmAssessmentViewed', {
        detail: {
          questionId: challenge.id,
          conceptId: 'debug-challenge',
          type: 'debug',
          phase: currentPhase,
          score: judgment.score,
          userEmail: user?.email || 'unknown',
          timestamp: new Date().toISOString()
        }
      }));

      // Create response with LLM feedback
      const newResponse: StudyModeResponse = {
        stepId: `${currentPhase}-phase`,
        userAnswer: currentPhase === 'diagnosis' ? selectedIssues.join(', ') : currentResponse,
        feedback: judgment.feedback,
        hintsUsed: usedHints.length,
        timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
        insight: judgment.insights?.[0],
        isCorrect: judgment.score >= 70 // Consider 70+ as correct
      };

      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);

      // Move to next phase or complete immediately after getting judgment
      if (currentPhase === 'analysis') {
        setCurrentPhase('diagnosis');
      } else if (currentPhase === 'diagnosis') {
        setCurrentPhase('solution');
      } else {
        // Run solution test
        if (judgment.score >= 70) {
          runSolutionTest();
        }
        completeSession(updatedResponses);
      }
      // Keep llmJudgeResponse visible for user to see and manually close

    } catch (error) {
      console.error('Error getting LLM judgment:', error);
      // Fallback to original evaluation
      const evaluation = evaluatePhase(currentPhase, currentResponse, selectedIssues);
      
      const newResponse: StudyModeResponse = {
        stepId: `${currentPhase}-phase`,
        userAnswer: currentPhase === 'diagnosis' ? selectedIssues.join(', ') : currentResponse,
        feedback: evaluation.feedback,
        hintsUsed: usedHints.length,
        timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
        insight: evaluation.insight,
        isCorrect: evaluation.isCorrect
      };

      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);

      // Move to next phase or complete
      if (currentPhase === 'analysis') {
        setCurrentPhase('diagnosis');
      } else if (currentPhase === 'diagnosis') {
        setCurrentPhase('solution');
      } else {
        if (evaluation.isCorrect) {
          runSolutionTest();
        }
        completeSession(updatedResponses);
      }
    } finally {
      setIsGettingJudgment(false);
    }
  };

  // Get current phase response
  const getCurrentPhaseResponse = (): string => {
    switch (currentPhase) {
      case 'analysis': return analysisResponse;
      case 'diagnosis': return diagnosisResponse;
      case 'solution': return solutionResponse;
      default: return '';
    }
  };

  // Evaluate phase response
  const evaluatePhase = (
    phase: 'analysis' | 'diagnosis' | 'solution',
    response: string,
    issues: string[]
  ) => {
    const lowercaseResponse = response.toLowerCase();
    
    switch (phase) {
      case 'analysis':
        const hasKeyObservations = checkAnalysisQuality(lowercaseResponse);
        return {
          isCorrect: hasKeyObservations,
          feedback: hasKeyObservations
            ? "Good analysis! You've identified key patterns in the system behavior."
            : "Try to look more closely at the error patterns and agent interactions.",
          insight: hasKeyObservations ? "Thorough analysis reveals hidden system issues" : undefined
        };

      case 'diagnosis':
        const correctIssues = challenge.commonIssues.map(issue => issue.issue);
        const hasCorrectDiagnosis = issues.some(selected => 
          correctIssues.some(correct => 
            correct.toLowerCase().includes(selected.toLowerCase()) ||
            selected.toLowerCase().includes(correct.toLowerCase())
          )
        );
        
        return {
          isCorrect: hasCorrectDiagnosis,
          feedback: hasCorrectDiagnosis
            ? "Excellent diagnosis! You've identified the core issues."
            : "Consider reviewing the symptoms more carefully to identify the root cause.",
          insight: hasCorrectDiagnosis ? "Accurate diagnosis is crucial for effective debugging" : undefined
        };

      case 'solution':
        const hasSolutionElements = checkSolutionQuality(lowercaseResponse);
        return {
          isCorrect: hasSolutionElements,
          feedback: hasSolutionElements
            ? "Great solution! Your approach addresses the core issues effectively."
            : "Your solution could be more comprehensive. Consider all the identified issues.",
          insight: hasSolutionElements ? "Systematic solutions prevent recurring issues" : undefined
        };

      default:
        return { isCorrect: true, feedback: "Response recorded." };
    }
  };

  // Check analysis quality
  const checkAnalysisQuality = (analysis: string): boolean => {
    const keyTerms = ['error', 'loop', 'infinite', 'timeout', 'message', 'agent', 'communication', 'stuck'];
    const foundTerms = keyTerms.filter(term => analysis.includes(term));
    return foundTerms.length >= 3 && analysis.length > 100;
  };

  // Check solution quality
  const checkSolutionQuality = (solution: string): boolean => {
    const solutionTerms = ['timeout', 'limit', 'break', 'condition', 'validation', 'error handling', 'check'];
    const foundTerms = solutionTerms.filter(term => solution.includes(term));
    return foundTerms.length >= 2 && solution.length > 150;
  };

  // Run solution test simulation
  const runSolutionTest = () => {
    setDebugOutput("Testing your solution...\n\n");
    
    const testSteps = [
      "🔧 Applying timeout configuration...",
      "🔧 Adding loop break condition...",
      "🔧 Implementing error handling...",
      "🧪 Running test case 1: Basic agent communication",
      "✅ Test 1 passed: Agents communicate successfully",
      "🧪 Running test case 2: Edge case handling",
      "✅ Test 2 passed: Error conditions handled properly",
      "🧪 Running test case 3: Performance under load",
      "✅ Test 3 passed: System stable under stress",
      "🎉 All tests passed! Solution is working correctly."
    ];

    testSteps.forEach((step, index) => {
      setTimeout(() => {
        setDebugOutput(prev => prev + step + "\n");
        
        if (step.includes("✅")) {
          setTestResults(prev => [...prev, { passed: true, message: step }]);
        }
      }, (index + 1) * 800);
    });
  };

  // Complete the session
  const completeSession = (finalResponses: StudyModeResponse[]) => {
    const session: StudyModeSession = {
      id: `session-${Date.now()}`,
      userId: 'anonymous',
      conceptId: 'debug-challenge',
      questionId: challenge.id,
      type: 'debug',
      startTime,
      endTime: new Date(),
      responses: finalResponses,
      progress: 100,
      score: calculateScore(finalResponses),
      insights: finalResponses.filter(r => r.insight).map(r => r.insight!),
      isComplete: true
    };

    saveStudyModeProgress(session);
    
    setTimeout(() => {
      setIsComplete(true);
      onComplete(session);
    }, 5000); // Show test results for 5 seconds
  };

  // Calculate score
  const calculateScore = (finalResponses: StudyModeResponse[]): number => {
    const correctCount = finalResponses.filter(r => r.isCorrect).length;
    const baseScore = (correctCount / finalResponses.length) * 80;
    const hintPenalty = usedHints.length * 5;
    return Math.max(0, Math.min(100, baseScore - hintPenalty + 20)); // +20 for completion
  };

  const phaseProgress = ((currentPhase === 'analysis' ? 1 : currentPhase === 'diagnosis' ? 2 : 3) / 3) * 100;

  if (isComplete) {
    const score = calculateScore(responses);
    
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle size={24} className="text-green-600" />
            Debug Challenge Complete!
          </CardTitle>
          <CardDescription>
            {challenge.title} - System debugging completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">{score}%</div>
            <div className="text-muted-foreground">Debugging Effectiveness Score</div>
          </div>

          {/* Solution Summary */}
          <div>
            <h3 className="font-semibold mb-3">Correct Solution</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{challenge.solution}</pre>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <h3 className="font-semibold mb-3">Why This Solution Works</h3>
            <p className="text-muted-foreground">{challenge.explanation}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft size={16} className="mr-1" />
              Back to Study Mode
            </Button>
            <Button onClick={resetToStart}>
              <Code size={16} className="mr-1" />
              Retake This Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
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
                  <Bug size={24} className="text-red-600" />
                  {challenge.title}
                </CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </div>
            </div>
            <Badge className="ring-1 bg-[var(--badge-red-bg)] ring-[var(--badge-red-ring)] text-[var(--badge-red-text)] dark:text-[var(--badge-red-text)]">
              Debug Challenge
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Phase: {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}</span>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>~30 min</span>
              </div>
            </div>
            <Progress value={phaseProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* LLM Configuration Notice */}
      <LlmConfigurationNotice mode="debug" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - System Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning size={20} className="text-yellow-600" />
                Problem Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {challenge.problemDescription}
              </p>
              <div className="text-sm">
                <strong>Expected Behavior:</strong> {challenge.expectedBehavior}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="code">
                <Code size={16} className="mr-1" />
                Code
              </TabsTrigger>
              <TabsTrigger value="logs">
                <Terminal size={16} className="mr-1" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="config">
                <FileText size={16} className="mr-1" />
                Config
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Broken System Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs whitespace-pre-wrap">{challenge.brokenCode}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">System Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {challenge.conversationLogs?.map((log, index) => (
                        <div key={index} className={cn(
                          "p-2 rounded text-xs font-mono",
                          log.type === 'error' && "bg-red-50 text-red-800 border border-red-200",
                          log.type === 'warning' && "bg-yellow-50 text-yellow-800 border border-yellow-200",
                          log.type === 'info' && "bg-blue-50 text-blue-800 border border-blue-200",
                          log.type === 'debug' && "bg-gray-50 text-gray-800 border border-gray-200"
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">[{log.agent}]</span>
                            <span className="text-xs opacity-70">{log.timestamp}</span>
                            <Badge variant={log.type === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                              {log.type}
                            </Badge>
                          </div>
                          <div>{log.message}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="config" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Agent Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {challenge.agentConfigs?.map((config, index) => (
                      <div key={index} className="border rounded p-3">
                        <div className="font-medium text-sm mb-2">{config.name} ({config.role})</div>
                        <div className="text-xs text-muted-foreground">
                          Tools: {config.tools?.join(', ') || 'None'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Debug Process */}
        <div className="space-y-6">
          {/* Current Phase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} />
                {currentPhase === 'analysis' && 'Phase 1: Analysis'}
                {currentPhase === 'diagnosis' && 'Phase 2: Diagnosis'}
                {currentPhase === 'solution' && 'Phase 3: Solution'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Analysis Phase */}
              {currentPhase === 'analysis' && (
                <div>
                  <TextareaWithVoice
                    value={analysisResponse}
                    onChange={setAnalysisResponse}
                    placeholder="Describe what you observe in the system. Look for error patterns, infinite loops, communication issues, or configuration problems..."
                    className="min-h-[120px]"
                    label="Your Analysis"
                    description="Examine the code, logs, and configuration. What patterns do you notice? You can type or speak your observations."
                  />
                </div>
              )}

              {/* Diagnosis Phase */}
              {currentPhase === 'diagnosis' && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your analysis, what are the root causes? Select all that apply:
                  </p>
                  <div className="space-y-2">
                    {challenge.commonIssues.map((issue, index) => (
                      <label key={index} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedIssues.includes(issue.issue)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIssues(prev => [...prev, issue.issue]);
                            } else {
                              setSelectedIssues(prev => prev.filter(i => i !== issue.issue));
                            }
                          }}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium">{issue.issue}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Symptoms: {issue.symptoms.join(', ')}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution Phase */}
              {currentPhase === 'solution' && (
                <div>
                  <TextareaWithVoice
                    value={solutionResponse}
                    onChange={setSolutionResponse}
                    placeholder="Describe how you would fix each identified issue. Include specific code changes, configuration updates, or architectural improvements..."
                    className="min-h-[150px]"
                    label="Your Solution"
                    description="Provide a comprehensive solution to fix the identified issues. You can type or speak your solution."
                  />
                </div>
              )}

              {/* Hints */}
              {challenge.hints && challenge.hints.length > 0 && (
                <div>
                  {!usedHints.includes(currentPhase) ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setUsedHints(prev => [...prev, currentPhase])}
                    >
                      <Lightbulb size={16} className="mr-1" />
                      Need a hint for {currentPhase}?
                    </Button>
                  ) : (
                    <Alert>
                      <Lightbulb size={16} />
                      <AlertDescription>
                        {challenge.hints[0]} {/* Simplified - could be phase-specific */}
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
                            AI Assessment - {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase
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
                          Comprehensive feedback and analysis for your debugging approach
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Score Display */}
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {llmJudgeResponse.score}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Debugging Effectiveness Score
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
                              Your Debugging Strengths
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
                              Debugging Improvements
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
                              <Bug size={18} />
                              Debugging Insights
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
                    </DialogContent>
                  </Dialog>
                )}

                <Button 
                  onClick={handlePhaseComplete}
                  disabled={
                    isGettingJudgment ||
                    (currentPhase === 'analysis' && !analysisResponse.trim()) ||
                    (currentPhase === 'diagnosis' && selectedIssues.length === 0) ||
                    (currentPhase === 'solution' && !solutionResponse.trim())
                  }
                >
                  {isGettingJudgment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Getting AI Assessment...
                    </>
                  ) : (
                    <>
                      {currentPhase === 'solution' ? 'Test Solution' : 'Continue to Next Phase'}
                      <ArrowRight size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Latest Response Feedback */}
              {responses[responses.length - 1] && responses[responses.length - 1].stepId.includes(currentPhase) && (
                <Alert className={responses[responses.length - 1].isCorrect ? 
                  "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30" : 
                  "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30"
                }>
                  <div className="flex items-start gap-2">
                    {responses[responses.length - 1].isCorrect ? (
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Eye size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    )}
                    <AlertDescription className={responses[responses.length - 1].isCorrect ?
                      "text-green-700 dark:text-green-300" :
                      "text-yellow-700 dark:text-yellow-300"
                    }>
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {responses[responses.length - 1].feedback}
                      </ReactMarkdown>
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Test Output */}
          {debugOutput && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play size={20} />
                  Solution Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono whitespace-pre-line h-64 overflow-y-auto">
                  {debugOutput}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugChallengeMode;
