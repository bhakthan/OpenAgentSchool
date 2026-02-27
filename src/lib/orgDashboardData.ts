// Mock data generators for the Organization dashboard tab

export interface OrgTeam {
  id: string;
  name: string;
  memberCount: number;
  avgQuizScore: number;
  activityStatus: 'active' | 'moderate' | 'inactive';
  topPattern: string;
}

export interface PolicyItem {
  id: string;
  name: string;
  description: string;
  compliancePercent: number;
  status: 'compliant' | 'partial' | 'non-compliant';
}

export interface AdoptionMetric {
  week: string;
  activeLearners: number;
  quizCompletionRate: number;
  patternAdoption: number;
}

export function getMockTeams(): OrgTeam[] {
  return [
    {
      id: 'team-eng',
      name: 'Engineering',
      memberCount: 12,
      avgQuizScore: 82,
      activityStatus: 'active',
      topPattern: 'ReAct Loop',
    },
    {
      id: 'team-data',
      name: 'Data Science',
      memberCount: 8,
      avgQuizScore: 91,
      activityStatus: 'active',
      topPattern: 'RAG Pipeline',
    },
    {
      id: 'team-product',
      name: 'Product',
      memberCount: 6,
      avgQuizScore: 74,
      activityStatus: 'moderate',
      topPattern: 'Human-in-the-Loop',
    },
    {
      id: 'team-security',
      name: 'Security',
      memberCount: 4,
      avgQuizScore: 88,
      activityStatus: 'moderate',
      topPattern: 'Guardrails Pattern',
    },
  ];
}

export function getMockPolicies(): PolicyItem[] {
  return [
    {
      id: 'pol-data',
      name: 'Data Handling',
      description: 'PII masking and data classification compliance',
      compliancePercent: 87,
      status: 'partial',
    },
    {
      id: 'pol-apikey',
      name: 'API Key Management',
      description: 'Secrets rotation and vault usage',
      compliancePercent: 95,
      status: 'compliant',
    },
    {
      id: 'pol-model',
      name: 'Model Selection',
      description: 'Approved model list adherence',
      compliancePercent: 92,
      status: 'compliant',
    },
    {
      id: 'pol-audit',
      name: 'Audit Logging',
      description: 'All agent interactions logged',
      compliancePercent: 78,
      status: 'partial',
    },
    {
      id: 'pol-prompt',
      name: 'Prompt Review',
      description: 'System prompts reviewed before production',
      compliancePercent: 65,
      status: 'non-compliant',
    },
  ];
}

export function getMockAdoptionMetrics(): AdoptionMetric[] {
  return [
    { week: 'Week 1', activeLearners: 18, quizCompletionRate: 42, patternAdoption: 15 },
    { week: 'Week 2', activeLearners: 24, quizCompletionRate: 51, patternAdoption: 22 },
    { week: 'Week 3', activeLearners: 31, quizCompletionRate: 58, patternAdoption: 35 },
    { week: 'Week 4', activeLearners: 28, quizCompletionRate: 63, patternAdoption: 41 },
    { week: 'Week 5', activeLearners: 35, quizCompletionRate: 67, patternAdoption: 48 },
    { week: 'Week 6', activeLearners: 42, quizCompletionRate: 72, patternAdoption: 55 },
  ];
}
