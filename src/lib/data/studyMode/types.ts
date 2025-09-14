// Study Mode types and interfaces
export type StudyModeType = 'socratic' | 'scenario' | 'debug' | 'guided' | 'scl';

export type StudyModeLevel = 'beginner' | 'intermediate' | 'advanced';

export interface StudyModeQuestion {
  id: string;
  type: StudyModeType;
  conceptId: string;
  title: string;
  level: StudyModeLevel;
  
  // Socratic questioning
  socratiQuestion?: string;
  followUpQuestions?: string[];
  expectedInsights?: string[];
  
  // Scenario-based learning
  // Some legacy/simple scenarios stored as raw narrative strings; new rich ones use StudyScenario
  scenario?: StudyScenario | string;
  
  // Debug challenges
  debugChallenge?: DebugChallenge;
  
  // Guided learning
  guidedSteps?: GuidedStep[];
  
  // General properties
  hints?: string[];
  explanation?: string;
  relatedConcepts?: string[];
  timeEstimate?: number;
  successCriteria?: string[];
}

export interface StudyScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  stakeholders: string[];
  challenges: ScenarioChallenge[];
  outcomes: ScenarioOutcome[];
  codeExample?: string;
  resources?: string[];
  conceptId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  learningOutcomes: string[];
}

export interface ScenarioChallenge {
  id: string;
  title: string;
  description: string;
  question: string;
  type: 'multiple-choice' | 'code' | 'design' | 'analysis';
  options?: string[];
  correctAnswer?: string | number;
  feedback: string;
  hints?: string[];
  hint?: string;
  explanation?: string;
  codeContext?: string;
}

export interface ChallengeResult {
  isCorrect: boolean;
  feedback: string;
  insight?: string;
}

export interface ScenarioOutcome {
  id: string;
  condition: string;
  result: string;
  explanation: string;
  nextSteps?: string[];
}

export interface DebugChallenge {
  id: string;
  title: string;
  description: string;
  problemDescription: string;
  brokenCode: string;
  conversationLogs?: DebugLog[];
  agentConfigs?: AgentConfig[];
  expectedBehavior: string;
  commonIssues: DebugIssue[];
  hints?: string[];
  solution: string;
  explanation: string;
}

export interface DebugLog {
  timestamp: string;
  agent: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'debug';
  metadata?: Record<string, any>;
}

export interface AgentConfig {
  name: string;
  role: string;
  systemPrompt: string;
  tools?: string[];
  parameters?: Record<string, any>;
}

export interface DebugIssue {
  issue: string;
  symptoms: string[];
  diagnosis: string;
  fix: string;
}

export interface GuidedStep {
  id: string;
  title: string;
  instruction: string;
  action: 'think' | 'code' | 'analyze' | 'predict' | 'explain';
  content?: string;
  userInput?: string;
  feedback?: string;
  isComplete?: boolean;
}

export interface StudyModeSession {
  id: string;
  userId: string;
  conceptId: string;
  questionId: string;
  type: StudyModeType;
  startTime: Date;
  endTime?: Date;
  responses: StudyModeResponse[];
  progress: number;
  score?: number;
  insights: string[];
  isComplete: boolean;
}

export interface StudyModeResponse {
  stepId: string;
  userAnswer: string;
  isCorrect?: boolean;
  feedback: string;
  hintsUsed: number;
  timeSpent: number;
  insight?: string;
}

export interface StudyModeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: StudyModeQuestion[];
  prerequisites?: string[];
}

export interface StudyModeProgress {
  totalSessions: number;
  completedSessions: number;
  averageScore: number;
  conceptProgress: Record<string, number>;
  typeProgress: Record<StudyModeType, number>;
  insights: string[];
  achievements: StudyModeAchievement[];
}

export interface StudyModeAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'thinking' | 'problem-solving' | 'debugging' | 'understanding';
}
