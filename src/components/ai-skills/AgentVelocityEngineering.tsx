import { useState } from 'react';
import { Zap, Target, BookOpen, TrendingUp, Activity, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface VelocityPractice {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  benefits: string[];
  quickWins: string[];
  deepDivePoints: string[];
}

const velocityPractices: VelocityPractice[] = [
  {
    id: 'pattern-fluency',
    name: '1. Pattern Fluency',
    icon: BookOpen,
    description: 'Master proven agent patterns for instant recognition and rapid application',
    benefits: [
      'Recognize solutions in seconds vs hours',
      'Skip trial-and-error with battle-tested architectures',
      'Communicate design decisions with shared vocabulary'
    ],
    quickWins: [
      'Study 5 high-velocity patterns (Prompt Chaining, ReAct, Routing, Parallelization, Tool Use)',
      'Build pattern recognition muscle: match use cases to patterns',
      'Create personal pattern cheat sheet with when/why/how'
    ],
    deepDivePoints: [
      'All 48 patterns in Pattern Explorer with velocity profiles',
      'Pattern combinations for complex workflows',
      'Anti-patterns and failure modes to avoid'
    ]
  },
  {
    id: 'architecture-templates',
    name: '2. Architecture Templates',
    icon: Target,
    description: 'Pre-validated scaffolds and frameworks eliminate setup time',
    benefits: [
      'Reduce "blank page to running agent" from days to hours',
      'Inherit best practices (error handling, logging, retries)',
      'Focus creativity on business logic, not boilerplate'
    ],
    quickWins: [
      'Use Microsoft Agent Framework starter templates',
      'Clone proven architectures from Code Playbook',
      'Build your own team template library'
    ],
    deepDivePoints: [
      'Framework comparison: Microsoft Agent Framework vs LangChain vs LlamaIndex',
      'When to use templates vs build from scratch',
      'Template customization patterns'
    ]
  },
  {
    id: 'failure-libraries',
    name: '3. Failure Scenario Libraries',
    icon: Activity,
    description: 'Curated edge cases and failure modes enable proactive design',
    benefits: [
      'Design for failure upfront vs debug in production',
      'Prevent 80% of common issues with known mitigations',
      'Faster incident resolution with documented remediation'
    ],
    quickWins: [
      'Review failure scenarios in velocity profiles',
      'Add error handling for top 3 failure modes in your domain',
      'Create runbook for your agent\'s failure patterns'
    ],
    deepDivePoints: [
      'Systematic failure mode enumeration',
      'Graceful degradation strategies',
      'Chaos engineering for agents'
    ]
  },
  {
    id: 'evaluation-automation',
    name: '4. Evaluation Automation',
    icon: TrendingUp,
    description: 'Continuous testing catches regressions early and proves improvements',
    benefits: [
      'Ship with confidence - know exactly what broke',
      'Quantify velocity gains with before/after metrics',
      'A/B test prompts and architectures scientifically'
    ],
    quickWins: [
      'Set up Azure AI Evaluation SDK with 3 core metrics',
      'Create golden dataset (10-20 examples) for regression testing',
      'Automate eval in CI/CD pipeline'
    ],
    deepDivePoints: [
      'Custom metric design for your domain',
      'LLM-as-judge patterns and pitfalls',
      'Evaluation cost optimization'
    ]
  },
  {
    id: 'operational-instrumentation',
    name: '5. Operational Instrumentation',
    icon: Sparkles,
    description: 'Real-time metrics surface bottlenecks and optimization opportunities',
    benefits: [
      'Identify slow steps and optimize surgically',
      'Track token usage and cost per task',
      'Monitor quality drift before users complain'
    ],
    quickWins: [
      'Add Azure Application Insights for latency + error tracking',
      'Log token counts and model calls per request',
      'Create dashboard with P95 latency and cost/day'
    ],
    deepDivePoints: [
      'Distributed tracing for multi-agent systems',
      'Cost attribution and chargeback',
      'Quality monitoring and alerting'
    ]
  }
];

interface AssessmentQuestion {
  id: string;
  practice: string;
  question: string;
  options: { text: string; score: number }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    practice: 'pattern-fluency',
    question: 'When starting a new agent project, I...',
    options: [
      { text: 'Start coding immediately and figure it out as I go', score: 1 },
      { text: 'Research similar projects but don\'t use a systematic pattern', score: 2 },
      { text: 'Identify the core pattern (ReAct, Routing, etc.) and adapt proven architecture', score: 3 }
    ]
  },
  {
    id: 'q2',
    practice: 'architecture-templates',
    question: 'My typical setup time for a new agent is...',
    options: [
      { text: '2+ days building from scratch each time', score: 1 },
      { text: '1 day - I copy-paste from previous projects', score: 2 },
      { text: '2-4 hours - I use framework templates with error handling built-in', score: 3 }
    ]
  },
  {
    id: 'q3',
    practice: 'failure-libraries',
    question: 'When my agent fails in production, I...',
    options: [
      { text: 'Debug reactively - troubleshoot each unique issue as it arises', score: 1 },
      { text: 'Have some error handling but encounter many edge cases', score: 2 },
      { text: 'Rarely surprised - designed for known failure modes with graceful degradation', score: 3 }
    ]
  },
  {
    id: 'q4',
    practice: 'evaluation-automation',
    question: 'I validate agent changes by...',
    options: [
      { text: 'Manual spot-checking with a few examples', score: 1 },
      { text: 'Running test suite occasionally before major releases', score: 2 },
      { text: 'Automated eval suite in CI/CD with regression detection', score: 3 }
    ]
  },
  {
    id: 'q5',
    practice: 'operational-instrumentation',
    question: 'I track agent performance using...',
    options: [
      { text: 'Logs when something breaks', score: 1 },
      { text: 'Basic metrics like request count and errors', score: 2 },
      { text: 'Comprehensive metrics: latency P95, token cost, quality scores, bottleneck identification', score: 3 }
    ]
  }
];

export function AgentVelocityEngineering() {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [showAssessment, setShowAssessment] = useState(false);

  const handleAssessmentAnswer = (questionId: string, score: number) => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    const total = Object.values(assessmentAnswers).reduce((sum, score) => sum + score, 0);
    const maxScore = assessmentQuestions.length * 3;
    return Math.round((total / maxScore) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Expert', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 60) return { level: 'Proficient', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 40) return { level: 'Developing', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Beginning', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const isAssessmentComplete = Object.keys(assessmentAnswers).length === assessmentQuestions.length;
  const score = isAssessmentComplete ? calculateScore() : 0;
  const scoreLevel = getScoreLevel(score);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Agent Velocity Engineering
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              The 5 practices that 10x your agent development speed
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                2 hours → 20 minutes
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">
                500 LOC → 5 prompts
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                60% less debugging
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment CTA */}
      {!showAssessment && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Assess Your Velocity Maturity
              </h3>
              <p className="text-gray-600">
                5 questions · 2 minutes · Get personalized recommendations
              </p>
            </div>
            <button
              onClick={() => setShowAssessment(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Assessment Section */}
      {showAssessment && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Velocity Maturity Assessment</h2>
          
          <div className="space-y-6 mb-8">
            {assessmentQuestions.map((q, idx) => (
              <div key={q.id} className="border border-gray-200 rounded-lg p-6">
                <p className="font-medium text-gray-900 mb-4">
                  {idx + 1}. {q.question}
                </p>
                <div className="space-y-3">
                  {q.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        assessmentAnswers[q.id] === option.score
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={assessmentAnswers[q.id] === option.score}
                        onChange={() => handleAssessmentAnswer(q.id, option.score)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isAssessmentComplete && (
            <div className={`${scoreLevel.bg} rounded-xl p-6 border-2 border-${scoreLevel.color.replace('text-', '')}`}>
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className={`w-8 h-8 ${scoreLevel.color}`} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Velocity Score: {score}%
                  </h3>
                  <p className={`text-lg font-medium ${scoreLevel.color}`}>
                    Level: {scoreLevel.level}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {score >= 80 && "Excellent! You're operating at high velocity. Focus on optimizing and sharing your practices with the team."}
                {score >= 60 && score < 80 && "Great progress! You have solid foundations. Deepen your practice in weaker areas to reach expert level."}
                {score >= 40 && score < 60 && "Good start! Focus on the practices where you scored 1-2 to unlock significant velocity gains."}
                {score < 40 && "Huge opportunity! Start with Pattern Fluency and Architecture Templates - these deliver the fastest ROI."}
              </p>
              <div className="text-sm text-gray-600">
                Scroll down to explore each practice and build your velocity toolkit.
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5 Practices Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The 5 Velocity Practices</h2>
        <div className="grid gap-6">
          {velocityPractices.map((practice) => {
            const Icon = practice.icon;
            const isExpanded = selectedPractice === practice.id;
            
            return (
              <div
                key={practice.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => setSelectedPractice(isExpanded ? null : practice.id)}
                  className="w-full p-6 text-left flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {practice.name}
                    </h3>
                    <p className="text-gray-600">{practice.description}</p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {practice.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Wins */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        Quick Wins (This Week)
                      </h4>
                      <ul className="space-y-2">
                        {practice.quickWins.map((win, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deep Dive */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        Deep Dive Topics
                      </h4>
                      <ul className="space-y-2">
                        {practice.deepDivePoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to 10x Your Agent Velocity?</h2>
        <p className="text-purple-100 mb-6 text-lg">
          Start with Pattern Fluency: Explore our 48 patterns with velocity profiles in the Pattern Explorer.
          Each pattern shows impact level, time-to-implement, and velocity practice mappings.
        </p>
        <div className="flex gap-4">
          <a
            href="/patterns"
            className="px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Explore Patterns
          </a>
          <a
            href="/code-playbook"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors border border-purple-500"
          >
            View Code Templates
          </a>
        </div>
      </div>
    </div>
  );
}
