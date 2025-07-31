import { StudyModeQuestion, StudyModeCategory, StudyModeProgress, StudyModeSession, StudyModeType } from './types';
import { socraticQuestionLibrary } from './socraticQuestions';
import { scenarioLibrary } from './interactiveScenarios';
import { debugChallengeLibrary } from './debugChallenges';

// Study Mode Categories
export const studyModeCategories: StudyModeCategory[] = [
  {
    id: 'socratic-thinking',
    name: 'Socratic Discovery',
    description: 'Learn through guided questioning that helps you discover concepts yourself',
    icon: 'Brain',
    questions: Object.values(socraticQuestionLibrary).flat(),
    prerequisites: []
  },
  {
    id: 'interactive-scenarios',
    name: 'Hands-On Scenarios',
    description: 'Build systems step-by-step through realistic implementation challenges',
    icon: 'PuzzlePiece',
    questions: Object.values(scenarioLibrary).flat(),
    prerequisites: ['socratic-thinking']
  },
  {
    id: 'debug-challenges',
    name: 'Debug & Fix',
    description: 'Analyze broken systems and learn by fixing real-world problems',
    icon: 'Bug',
    questions: Object.values(debugChallengeLibrary).flat(),
    prerequisites: ['interactive-scenarios']
  }
];

// Get all study mode questions
export function getAllStudyModeQuestions(): StudyModeQuestion[] {
  return [
    ...Object.values(socraticQuestionLibrary).flat(),
    ...Object.values(scenarioLibrary).flat(),
    ...Object.values(debugChallengeLibrary).flat()
  ];
}

// Get questions by concept
export function getStudyModeQuestionsByConceptId(conceptId: string): StudyModeQuestion[] {
  const allQuestions = getAllStudyModeQuestions();
  return allQuestions.filter(q => q.conceptId === conceptId);
}

// Get questions by type
export function getStudyModeQuestionsByType(type: StudyModeType): StudyModeQuestion[] {
  const allQuestions = getAllStudyModeQuestions();
  return allQuestions.filter(q => q.type === type);
}

// Get questions by level
export function getStudyModeQuestionsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): StudyModeQuestion[] {
  const allQuestions = getAllStudyModeQuestions();
  return allQuestions.filter(q => q.level === level);
}

// Generate a personalized study session
export function generateStudySession(
  conceptId: string,
  userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
  preferredTypes: StudyModeType[] = ['socratic']
): StudyModeQuestion[] {
  let questions: StudyModeQuestion[] = [];
  
  // Get questions for the concept
  const conceptQuestions = getStudyModeQuestionsByConceptId(conceptId);
  
  // Filter by user level and preferred types
  questions = conceptQuestions.filter(q => 
    q.level === userLevel && preferredTypes.includes(q.type)
  );
  
  // If no questions match exactly, broaden the search
  if (questions.length === 0) {
    questions = conceptQuestions.filter(q => preferredTypes.includes(q.type));
  }
  
  // If still no questions, get any questions for the concept
  if (questions.length === 0) {
    questions = conceptQuestions;
  }
  
  // Sort by type preference order
  questions.sort((a, b) => {
    const aIndex = preferredTypes.indexOf(a.type);
    const bIndex = preferredTypes.indexOf(b.type);
    return aIndex - bIndex;
  });
  
  return questions.slice(0, 5); // Limit to 5 questions per session
}

// Calculate study mode progress
export function calculateStudyModeProgress(sessions: StudyModeSession[]): StudyModeProgress {
  const completedSessions = sessions.filter(s => s.isComplete);
  const totalScore = completedSessions.reduce((sum, s) => sum + (s.score || 0), 0);
  const averageScore = completedSessions.length > 0 ? totalScore / completedSessions.length : 0;
  
  // Calculate progress by concept
  const conceptProgress: Record<string, number> = {};
  const conceptCounts: Record<string, { total: number; completed: number }> = {};
  
  sessions.forEach(session => {
    if (!conceptCounts[session.conceptId]) {
      conceptCounts[session.conceptId] = { total: 0, completed: 0 };
    }
    conceptCounts[session.conceptId].total++;
    if (session.isComplete) {
      conceptCounts[session.conceptId].completed++;
    }
  });
  
  Object.keys(conceptCounts).forEach(conceptId => {
    const { total, completed } = conceptCounts[conceptId];
    conceptProgress[conceptId] = (completed / total) * 100;
  });
  
  // Calculate progress by type
  const typeProgress: Record<StudyModeType, number> = {
    socratic: 0,
    scenario: 0,
    debug: 0,
    guided: 0
  };
  
  const typeCounts: Record<StudyModeType, { total: number; completed: number }> = {
    socratic: { total: 0, completed: 0 },
    scenario: { total: 0, completed: 0 },
    debug: { total: 0, completed: 0 },
    guided: { total: 0, completed: 0 }
  };
  
  sessions.forEach(session => {
    typeCounts[session.type].total++;
    if (session.isComplete) {
      typeCounts[session.type].completed++;
    }
  });
  
  Object.keys(typeCounts).forEach(type => {
    const { total, completed } = typeCounts[type as StudyModeType];
    if (total > 0) {
      typeProgress[type as StudyModeType] = (completed / total) * 100;
    }
  });
  
  // Extract insights from sessions
  const insights = sessions
    .filter(s => s.isComplete)
    .flatMap(s => s.insights)
    .filter((insight, index, arr) => arr.indexOf(insight) === index); // Remove duplicates
  
  return {
    totalSessions: sessions.length,
    completedSessions: completedSessions.length,
    averageScore,
    conceptProgress,
    typeProgress,
    insights,
    achievements: [] // TODO: Implement achievement calculation
  };
}

// Save study mode progress to localStorage
export function saveStudyModeProgress(session: StudyModeSession): void {
  const existingSessions = getStudyModeProgress();
  const updatedSessions = [...existingSessions, session];
  localStorage.setItem('study-mode-sessions', JSON.stringify(updatedSessions));
}

// Load study mode progress from localStorage
export function getStudyModeProgress(): StudyModeSession[] {
  const saved = localStorage.getItem('study-mode-sessions');
  if (!saved) return [];
  
  try {
    const sessions = JSON.parse(saved);
    // Convert date strings back to Date objects
    return sessions.map((session: any) => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    }));
  } catch (error) {
    console.error('Error loading study mode progress:', error);
    return [];
  }
}

// Get recommended next question based on progress
export function getRecommendedNextQuestion(
  conceptId: string,
  completedQuestionIds: string[]
): StudyModeQuestion | null {
  const conceptQuestions = getStudyModeQuestionsByConceptId(conceptId);
  const remainingQuestions = conceptQuestions.filter(q => 
    !completedQuestionIds.includes(q.id)
  );
  
  if (remainingQuestions.length === 0) return null;
  
  // Recommend questions in order: socratic -> scenario -> debug
  const typeOrder: StudyModeType[] = ['socratic', 'scenario', 'debug', 'guided'];
  
  for (const type of typeOrder) {
    const questionsOfType = remainingQuestions.filter(q => q.type === type);
    if (questionsOfType.length > 0) {
      // Return the first question of this type
      return questionsOfType[0];
    }
  }
  
  return remainingQuestions[0];
}

// Check if user has unlocked a study mode type
export function hasUnlockedStudyModeType(
  type: StudyModeType,
  sessions: StudyModeSession[]
): boolean {
  // For demo purposes, all study mode types are unlocked
  // This allows users to explore all features immediately
  return true;
  
  /* Original progressive unlocking logic:
  // Socratic questions are always unlocked
  if (type === 'socratic') return true;
  
  // Scenarios require completing at least 2 socratic questions
  if (type === 'scenario') {
    const socraticCompleted = sessions.filter(s => 
      s.type === 'socratic' && s.isComplete
    ).length;
    return socraticCompleted >= 2;
  }
  
  // Debug challenges require completing at least 1 scenario
  if (type === 'debug') {
    const scenarioCompleted = sessions.filter(s => 
      s.type === 'scenario' && s.isComplete
    ).length;
    return scenarioCompleted >= 1;
  }
  
  // Guided mode requires experience with other types
  if (type === 'guided') {
    const otherTypesCompleted = sessions.filter(s => 
      s.type !== 'guided' && s.isComplete
    ).length;
    return otherTypesCompleted >= 3;
  }
  
  return false;
  */
}

// Clear progress for a specific question
export function clearQuestionProgress(questionId: string, type: StudyModeType): void {
  try {
    const existingSessions = JSON.parse(localStorage.getItem('study-mode-sessions') || '[]');
    const filteredSessions = existingSessions.filter((session: any) => 
      !(session.questionId === questionId && session.type === type)
    );
    localStorage.setItem('study-mode-sessions', JSON.stringify(filteredSessions));
    console.log(`Cleared progress for ${type} question:`, questionId);
  } catch (error) {
    console.error('Error clearing question progress:', error);
  }
}

// Clear all progress for a specific study mode type
export function clearTypeProgress(type: StudyModeType): void {
  try {
    const existingSessions = JSON.parse(localStorage.getItem('study-mode-sessions') || '[]');
    const filteredSessions = existingSessions.filter((session: any) => session.type !== type);
    localStorage.setItem('study-mode-sessions', JSON.stringify(filteredSessions));
    console.log(`Cleared all progress for ${type} mode`);
  } catch (error) {
    console.error('Error clearing type progress:', error);
  }
}

// Clear all study mode progress
export function clearAllProgress(): void {
  try {
    localStorage.removeItem('study-mode-sessions');
    // Also clear legacy keys
    localStorage.removeItem('studyModeProgress');
    sessionStorage.removeItem('studyModeProgress');
    console.log('Cleared all study mode progress');
  } catch (error) {
    console.error('Error clearing all progress:', error);
  }
}
