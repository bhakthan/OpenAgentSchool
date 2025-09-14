import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, PuzzlePiece, Bug, Lightbulb, Target, TrendUp,
  CheckCircle, Clock, Star, ArrowRight, Play, BookOpen
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Import Study Mode components
import SocraticQuestionMode from './SocraticQuestionMode.tsx';
import InteractiveScenarioMode from './InteractiveScenarioMode.tsx';
import DebugChallengeMode from './DebugChallengeMode.tsx';
import { SuperCriticalLearning } from '../study/supercritical/SuperCriticalLearning';

// Import Study Mode data
import {
  studyModeCategories,
  getStudyModeProgress,
  calculateStudyModeProgress,
  getRecommendedNextQuestion,
  hasUnlockedStudyModeType,
  getAllStudyModeQuestions,
  clearTypeProgress,
  getStudyModeQuestionsByConceptId
} from '@/lib/data/studyMode';
import { StudyModeType, StudyModeQuestion, StudyModeSession } from '@/lib/data/studyMode/types';
import { toast } from '@/components/ui/use-toast';
interface StudyModeProps {
  conceptId?: string;
  onComplete?: (session: StudyModeSession) => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ conceptId, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'overview' | StudyModeType>('overview');
  const [selectedQuestion, setSelectedQuestion] = useState<StudyModeQuestion | null>(null);
  const [sessions, setSessions] = useState<StudyModeSession[]>([]);
  const [progress, setProgress] = useState(calculateStudyModeProgress([]));

  // Load progress on mount and honor hash deep-linking to a specific tab (e.g., #scl)
  useEffect(() => {
    const loadedSessions = getStudyModeProgress();
    setSessions(loadedSessions);
    setProgress(calculateStudyModeProgress(loadedSessions));

    try {
      // Support hash-based tab deep links
      const hash = (typeof window !== 'undefined' ? window.location.hash : '').toLowerCase();
      if (hash === '#scl') {
        setActiveTab('scl');
      } else if (hash === '#socratic') {
        setActiveTab('socratic');
      } else if (hash === '#scenario') {
        setActiveTab('scenario');
      } else if (hash === '#debug') {
        setActiveTab('debug');
      }

      // Support query params to auto-launch a specific question
      const search = (typeof window !== 'undefined' ? window.location.search : '');
      if (search) {
        const params = new URLSearchParams(search);
        const qid = params.get('qid');
        const concept = params.get('concept');
        const preferredType = (params.get('type') as StudyModeType | null);

        // If qid provided, select exact question
        if (qid) {
          const question = getAllStudyModeQuestions().find(q => q.id === qid);
          if (question) {
            setSelectedQuestion(question);
            setActiveTab(question.type);
            return; // done
          }
        }

        // Else if concept provided, pick first question (optionally by type)
        if (concept) {
          let conceptQuestions = getStudyModeQuestionsByConceptId(concept);
          if (preferredType) {
            conceptQuestions = conceptQuestions.filter(q => q.type === preferredType);
          }
          const question = conceptQuestions[0];
          if (question) {
            setSelectedQuestion(question);
            setActiveTab(question.type);
            return;
          }
        }
      }
    } catch {}
    // In-app event-driven launcher (no full page reload)
    const handler = (event: Event) => {
      try {
        const custom = event as CustomEvent<{ qid?: string; concept?: string; type?: StudyModeType }>;
        const { qid, concept, type } = custom.detail || {};
        if (qid) {
          const question = getAllStudyModeQuestions().find(q => q.id === qid);
          if (question) {
            setSelectedQuestion(question);
            setActiveTab(question.type);
            toast({ title: 'Loaded Study Challenge', description: question.title });
            return;
          }
        }
        if (concept) {
          let conceptQuestions = getStudyModeQuestionsByConceptId(concept);
          if (type) conceptQuestions = conceptQuestions.filter(q => q.type === type);
          const question = conceptQuestions[0];
          if (question) {
            setSelectedQuestion(question);
            setActiveTab(question.type);
            toast({ title: 'Loaded Concept Challenge', description: question.title });
          }
        }
      } catch {}
    };
    window.addEventListener('studyMode:launchQuestion', handler as EventListener);
    return () => window.removeEventListener('studyMode:launchQuestion', handler as EventListener);
  }, []);

  // Get all questions from all concepts
  const allQuestions = getAllStudyModeQuestions();
  
  const completedQuestionIds = sessions
    .filter(s => s.isComplete)
    .map(s => s.questionId);

  // Get recommended next question (from any concept)
  const recommendedQuestion = allQuestions.find(q => !completedQuestionIds.includes(q.id));

  // Helper functions
  const getTypeIcon = (type: StudyModeType) => {
    switch (type) {
      case 'socratic': return <Brain size={20} />;
      case 'scenario': return <PuzzlePiece size={20} />;
      case 'debug': return <Bug size={20} />;
      case 'guided': return <Lightbulb size={20} />;
      case 'scl': return <TrendUp size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const getTypeColor = (type: StudyModeType) => {
    switch (type) {
  case 'socratic': return 'bg-blue-100 text-black border-blue-200 dark:text-blue-200 dark:bg-blue-900';
  case 'scenario': return 'bg-green-100 text-black border-green-200 dark:text-green-200 dark:bg-green-900';
  case 'debug': return 'bg-red-100 text-black border-red-200 dark:text-red-200 dark:bg-red-900';
  case 'guided': return 'bg-purple-100 text-black border-purple-200 dark:text-purple-200 dark:bg-purple-900';
  case 'scl': return 'bg-orange-100 text-black border-orange-200 dark:text-orange-200 dark:bg-orange-900';
  default: return 'bg-gray-100 text-black border-gray-200 dark:text-gray-200 dark:bg-gray-900';
    }
  };

  const handleQuestionStart = (question: StudyModeQuestion) => {
    setSelectedQuestion(question);
    setActiveTab(question.type);
  };

  const handleSessionComplete = (session: StudyModeSession) => {
    const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    setProgress(calculateStudyModeProgress(updatedSessions));
    setSelectedQuestion(null);
    setActiveTab('overview');
    
    if (onComplete) {
      onComplete(session);
    }
  };

  const handleRetakeSocratic = () => {
    setSelectedQuestion(null);
    setActiveTab('socratic');
    
    // Clear all Socratic mode progress using utility function
    clearTypeProgress('socratic');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };
  const handleRetakeScenario = () => {
    setSelectedQuestion(null);
    setActiveTab('scenario');
    
    // Clear all Scenario mode progress using utility function
    clearTypeProgress('scenario');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };

  const handleRetakeDebug = () => {
    setSelectedQuestion(null);
    setActiveTab('debug');
    
    // Clear all Debug mode progress using utility function
    clearTypeProgress('debug');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };

  const renderQuestionCard = (question: StudyModeQuestion, isCompleted: boolean = false) => (
    <Card 
      key={question.id}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isCompleted ? "border-green-200 bg-green-50" : "hover:border-primary"
      )}
      onClick={() => !isCompleted && handleQuestionStart(question)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getTypeIcon(question.type)}
            <Badge className={cn("text-xs", getTypeColor(question.type))}>
              {question.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.level}
            </Badge>
          </div>
          {isCompleted && <CheckCircle size={20} className="text-green-600" />}
        </div>
        
        <h3 className="font-medium mb-1">{question.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{question.timeEstimate || 15} min</span>
          </div>
          {question.relatedConcepts && (
            <div className="flex items-center gap-1">
              <Target size={14} />
              <span>{question.relatedConcepts.length} concepts</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // If a question is selected, show the specific mode component
  if (selectedQuestion) {
    const commonProps = {
      question: selectedQuestion,
      onComplete: handleSessionComplete,
      onBack: () => setSelectedQuestion(null)
    };

    switch (selectedQuestion.type) {
      case 'socratic':
        return (
          <SocraticQuestionMode {...commonProps} />
        );
      case 'scenario':
        if (!selectedQuestion.scenario) {
          return <div>Scenario data not found</div>;
        }
        return (
          <InteractiveScenarioMode 
            scenario={selectedQuestion.scenario} 
            onComplete={handleSessionComplete}
            onBack={() => setSelectedQuestion(null)}
          />
        );
      case 'debug':
        if (!selectedQuestion.debugChallenge) {
          return <div>Debug challenge data not found</div>;
        }
        return (
          <DebugChallengeMode 
            challenge={selectedQuestion.debugChallenge}
            onComplete={handleSessionComplete}
            onBack={() => setSelectedQuestion(null)}
          />
        );
      default:
        return <div>Question type not implemented yet</div>;
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <Lightbulb size={32} className="text-primary" />
          Study Mode
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn through Socratic questioning, interactive scenarios, debugging and super critical learning challenges
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socratic" disabled={!hasUnlockedStudyModeType('socratic', sessions)}>
            Socratic
          </TabsTrigger>
          <TabsTrigger value="scenario" disabled={!hasUnlockedStudyModeType('scenario', sessions)}>
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="debug" disabled={!hasUnlockedStudyModeType('debug', sessions)}>
            Debug
          </TabsTrigger>
          <TabsTrigger value="scl" disabled={!hasUnlockedStudyModeType('scl', sessions)}>
            SCL
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={24} className="text-primary" />
                Your Study Progress
              </CardTitle>
              <CardDescription>
                Track your learning journey across different study modes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {progress.completedSessions}
                  </div>
                  <div className="text-sm text-muted-foreground">Sessions Completed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {Math.round(progress.averageScore)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {progress.insights.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Key Insights</div>
                </div>
              </div>

              {/* Progress by Type */}
              <div className="space-y-3">
                <h4 className="font-medium">Progress by Study Mode</h4>
                {Object.entries(progress.typeProgress).map(([type, percentage]) => (
                  <div key={type} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-24">
                      {getTypeIcon(type as StudyModeType)}
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                    <div className="flex-1">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Next */}
          {recommendedQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star size={24} className="text-primary" />
                  Recommended Next
                </CardTitle>
                <CardDescription>
                  Continue your learning journey with this recommended activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(recommendedQuestion.type)}
                    <div>
                      <h3 className="font-medium">{recommendedQuestion.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {recommendedQuestion.type === 'socratic' && 'Discover concepts through guided questioning'}
                        {recommendedQuestion.type === 'scenario' && 'Build systems through realistic challenges'}
                        {recommendedQuestion.type === 'debug' && 'Learn by fixing broken implementations'}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => handleQuestionStart(recommendedQuestion)}>
                    <Play size={16} className="mr-1" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Study Mode Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studyModeCategories.map((category) => {
              // Map category IDs to tab values
              const getTabValue = (categoryId: string): StudyModeType => {
                switch (categoryId) {
                  case 'socratic-thinking': return 'socratic';
                  case 'interactive-scenarios': return 'scenario';
                  case 'debug-challenges': return 'debug';
                  case 'super-critical-learning': return 'scl';
                  default: return 'socratic';
                }
              };

              const tabValue = getTabValue(category.id);
              const categoryQuestions = allQuestions.filter(q => q.type === tabValue);
              const completedCount = categoryQuestions.filter(q => 
                completedQuestionIds.includes(q.id)
              ).length;
              const isUnlocked = hasUnlockedStudyModeType(tabValue, sessions);

              return (
                <Card 
                  key={category.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    isUnlocked ? "hover:shadow-md hover:border-primary" : "opacity-60"
                  )}
                  onClick={() => isUnlocked && setActiveTab(tabValue)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        {getTypeIcon(tabValue)}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span>{completedCount}/{categoryQuestions.length} completed</span>
                      {!isUnlocked && <span className="text-yellow-600">🔒</span>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Socratic Questions Tab */}
        <TabsContent value="socratic" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeSocratic} title="Retake Socratic Mode">
              <Brain size={16} className="mr-1" />
              Retake Socratic
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={24} className="text-primary" />
                Socratic Discovery
              </CardTitle>
              <CardDescription>
                Learn by discovering concepts through guided questioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'socratic')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Scenarios Tab */}
        <TabsContent value="scenario" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeScenario} title="Retake Scenario Mode">
              <PuzzlePiece size={16} className="mr-1" />
              Retake Scenario
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PuzzlePiece size={24} className="text-primary" />
                Interactive Scenarios
              </CardTitle>
              <CardDescription>
                Build systems step-by-step through realistic implementation challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'scenario')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debug Challenges Tab */}
        <TabsContent value="debug" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeDebug} title="Retake Debug Mode">
              <Bug size={16} className="mr-1" />
              Retake Debug
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug size={24} className="text-primary" />
                Debug Challenges
              </CardTitle>
              <CardDescription>
                Analyze broken systems and learn by fixing real-world problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'debug')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Super Critical Learning Tab */}
        <TabsContent value="scl" className="space-y-6">
          <SuperCriticalLearning
            concept={conceptId}
            onBack={() => setActiveTab('overview')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyMode;
