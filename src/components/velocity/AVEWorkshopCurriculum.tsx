import { useState } from 'react'
import { BookOpen, Download, Users, Clock, Target, CheckCircle2, Award, FileText, Table, FileCode } from 'lucide-react'

interface Module {
  id: string
  title: string
  duration: string
  description: string
  learningObjectives: string[]
  exercises: {
    title: string
    type: 'lecture' | 'hands-on' | 'group' | 'assessment'
    duration: string
    description: string
  }[]
  materials: string[]
}

const workshopModules: Module[] = [
  {
    id: 'module-1',
    title: 'AVE Principles Overview',
    duration: '30 minutes',
    description: 'Foundation understanding of the 5 Agent Velocity Engineering practices and their business impact',
    learningObjectives: [
      'Understand the ROI of velocity-focused agent development',
      'Identify which practices deliver the highest impact for your team',
      'Complete velocity maturity self-assessment',
      'Set personalized velocity improvement goals'
    ],
    exercises: [
      {
        title: 'Welcome & Introductions',
        type: 'group',
        duration: '5 min',
        description: 'Share current agent development challenges and velocity pain points'
      },
      {
        title: 'AVE Framework Presentation',
        type: 'lecture',
        duration: '15 min',
        description: 'Introduction to 5 practices with case study examples (168x faster, 3x velocity)'
      },
      {
        title: 'Live Group Assessment',
        type: 'assessment',
        duration: '10 min',
        description: 'Complete 5-question velocity maturity quiz, discuss results as group'
      }
    ],
    materials: [
      'AVE Framework Slide Deck (PDF)',
      'Velocity Maturity Assessment (Google Form)',
      'Case Studies Reference Sheet (PDF)'
    ]
  },
  {
    id: 'module-2',
    title: 'Pattern Fluency Bootcamp',
    duration: '2 hours',
    description: 'Hands-on mastery of the 12 highest-velocity agent patterns through recognition games and implementation exercises',
    learningObjectives: [
      'Recognize 12 core patterns instantly from use case descriptions',
      'Implement Prompt Chaining pattern from scratch in under 15 minutes',
      'Combine patterns to solve complex multi-step workflows',
      'Build personal pattern cheat sheet for daily reference'
    ],
    exercises: [
      {
        title: 'Pattern Recognition Game',
        type: 'group',
        duration: '20 min',
        description: 'Match 20 real-world use cases to appropriate patterns. Fastest team wins!'
      },
      {
        title: 'Prompt Chaining Implementation',
        type: 'hands-on',
        duration: '45 min',
        description: 'Step-by-step guided coding: Build a 3-step chaining agent (research → draft → review)'
      },
      {
        title: 'Pattern Combination Challenge',
        type: 'hands-on',
        duration: '30 min',
        description: 'Design agent for complex workflow using 3+ patterns (Routing + Parallelization + Tool Use)'
      },
      {
        title: 'Build Your Cheat Sheet',
        type: 'hands-on',
        duration: '25 min',
        description: 'Create personalized 1-page reference with patterns most relevant to your domain'
      }
    ],
    materials: [
      'Pattern Recognition Quiz Deck (PDF)',
      'Prompt Chaining Starter Code (Python)',
      'Pattern Combination Templates (Jupyter Notebook)',
      'Blank Cheat Sheet Template (Figma/PDF)'
    ]
  },
  {
    id: 'module-3',
    title: 'Architecture Templates Lab',
    duration: '2 hours',
    description: 'Deploy and customize production-ready templates using Microsoft Agent Framework',
    learningObjectives: [
      'Deploy a ReAct Agent template in under 5 minutes',
      'Customize template for business-specific use case',
      'Add comprehensive error handling and logging',
      'Create team-specific template with governance policies'
    ],
    exercises: [
      {
        title: 'Environment Setup',
        type: 'hands-on',
        duration: '15 min',
        description: 'Install Microsoft Agent Framework, set up Azure OpenAI connection'
      },
      {
        title: 'Deploy ReAct Template',
        type: 'hands-on',
        duration: '30 min',
        description: 'Clone template, configure tools, test with sample queries'
      },
      {
        title: 'Customize for Your Domain',
        type: 'hands-on',
        duration: '45 min',
        description: 'Adapt template for specific use case (e.g., customer support, financial analysis)'
      },
      {
        title: 'Add Production-Grade Features',
        type: 'hands-on',
        duration: '30 min',
        description: 'Implement retry logic, structured logging, cost tracking, rate limiting'
      }
    ],
    materials: [
      'Microsoft Agent Framework Quickstart Guide (PDF)',
      'ReAct Agent Template (GitHub repo)',
      'Error Handling Best Practices (Markdown)',
      'Production Checklist (Google Sheets)'
    ]
  },
  {
    id: 'module-4',
    title: 'Evaluation Automation Workshop',
    duration: '1.5 hours',
    description: 'Set up automated testing pipelines using Azure AI Evaluation SDK',
    learningObjectives: [
      'Create golden dataset with 10-20 high-quality examples',
      'Define custom evaluation metrics for domain-specific quality',
      'Run A/B tests comparing two prompt variants',
      'Integrate evaluation into CI/CD pipeline for regression detection'
    ],
    exercises: [
      {
        title: 'Azure AI Eval SDK Setup',
        type: 'hands-on',
        duration: '15 min',
        description: 'Install SDK, authenticate, connect to Azure AI project'
      },
      {
        title: 'Build Golden Dataset',
        type: 'hands-on',
        duration: '30 min',
        description: 'Curate 10-20 examples with expected outputs, edge cases, failure scenarios'
      },
      {
        title: 'Define Custom Metrics',
        type: 'hands-on',
        duration: '25 min',
        description: 'Write evaluators for accuracy, completeness, tone, cost, latency'
      },
      {
        title: 'A/B Testing Lab',
        type: 'hands-on',
        duration: '20 min',
        description: 'Compare two prompt variants, analyze results, pick winner with statistical confidence'
      }
    ],
    materials: [
      'Azure AI Evaluation SDK Docs (Link)',
      'Golden Dataset Template (CSV)',
      'Custom Metric Examples (Python)',
      'CI/CD Integration Script (YAML)'
    ]
  },
  {
    id: 'module-5',
    title: 'Velocity Audit of Existing Project',
    duration: '1 hour',
    description: 'Systematic assessment of current agent project against 50-point velocity checklist',
    learningObjectives: [
      'Score existing project across 5 AVE practices (0-10 each)',
      'Identify top 3 velocity bottlenecks',
      'Generate prioritized action plan with quick wins',
      'Present findings and recommendations to team'
    ],
    exercises: [
      {
        title: 'Velocity Audit Introduction',
        type: 'lecture',
        duration: '10 min',
        description: 'Review 50-point checklist, scoring rubric, example audit reports'
      },
      {
        title: 'Team Project Audit',
        type: 'group',
        duration: '30 min',
        description: 'Apply checklist to real project, score each practice area, document findings'
      },
      {
        title: 'Action Plan Workshop',
        type: 'group',
        duration: '15 min',
        description: 'Prioritize improvements by impact vs effort, identify 3 quick wins (this sprint)'
      },
      {
        title: 'Share & Discuss',
        type: 'group',
        duration: '5 min',
        description: 'Each team presents top finding and #1 quick win'
      }
    ],
    materials: [
      'Velocity Audit Checklist (Google Sheets)',
      'Scoring Rubric (PDF)',
      'Action Plan Template (Miro board)',
      'Example Audit Reports (PDF)'
    ]
  }
]

export default function AVEWorkshopCurriculum() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const totalDuration = workshopModules.reduce((total, module) => {
    const hours = parseFloat(module.duration.match(/(\d+\.?\d*)\s*hour/)?.[1] || '0')
    const minutes = parseFloat(module.duration.match(/(\d+)\s*min/)?.[1] || '0')
    return total + hours * 60 + minutes
  }, 0)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins} minutes`
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
    return `${hours}h ${mins}m`
  }

  const downloadMaterial = (materialName: string) => {
    // In production, this would trigger actual file downloads
    alert(`Downloading: ${materialName}\n\n(In production, this would download the actual file)`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Agent Velocity Engineering Workshop
        </h1>
        <p className="text-gray-600 mb-4">
          Comprehensive cohort-based curriculum designed to 10x your team's agent development speed through hands-on practice
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4" />
            <span><strong>Total Duration:</strong> {formatDuration(totalDuration)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4" />
            <span><strong>Format:</strong> Cohort-based (8-15 participants)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Target className="w-4 h-4" />
            <span><strong>Outcome:</strong> AVE Certification + Personal Velocity Audit</span>
          </div>
        </div>
      </div>

      {/* Workshop Overview Card */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Pattern Fluency</h3>
              <p className="text-sm text-gray-600">Master 12 high-velocity patterns through recognition games and hands-on coding</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileCode className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Architecture Templates</h3>
              <p className="text-sm text-gray-600">Deploy and customize production-ready templates with Microsoft Agent Framework</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Evaluation Automation</h3>
              <p className="text-sm text-gray-600">Set up Azure AI Eval SDK with golden datasets and custom metrics</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Velocity Audit</h3>
              <p className="text-sm text-gray-600">Apply 50-point checklist to real project, get prioritized action plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshop Modules</h2>
        <div className="space-y-4">
          {workshopModules.map((module, index) => (
            <div
              key={module.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-purple-700">{index + 1}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{module.exercises.length} exercises</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedModule === module.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Module Details (Expandable) */}
              {expandedModule === module.id && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-4">
                    <p className="text-gray-700 mb-4">{module.description}</p>

                    {/* Learning Objectives */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Learning Objectives
                      </h4>
                      <ul className="space-y-2">
                        {module.learningObjectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercises */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Exercises</h4>
                      <div className="space-y-3">
                        {module.exercises.map((exercise, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              exercise.type === 'hands-on' ? 'bg-blue-100 text-blue-700' :
                              exercise.type === 'lecture' ? 'bg-purple-100 text-purple-700' :
                              exercise.type === 'group' ? 'bg-green-100 text-green-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {exercise.type}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900 text-sm">{exercise.title}</h5>
                                <span className="text-xs text-gray-500">{exercise.duration}</span>
                              </div>
                              <p className="text-sm text-gray-600">{exercise.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Materials Provided
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.materials.map((material, idx) => (
                          <button
                            key={idx}
                            onClick={() => downloadMaterial(material)}
                            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left text-sm"
                          >
                            {material.includes('PDF') ? <FileText className="w-4 h-4 text-red-600" /> :
                             material.includes('Sheets') || material.includes('CSV') ? <Table className="w-4 h-4 text-green-600" /> :
                             material.includes('Python') || material.includes('Notebook') ? <FileCode className="w-4 h-4 text-blue-600" /> :
                             <FileText className="w-4 h-4 text-gray-600" />}
                            <span className="text-gray-700">{material}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Section */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-8 text-white mb-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">AVE Certification</h2>
            <p className="text-purple-200 mb-4">
              Complete all 5 modules and achieve 80%+ on velocity audit to earn your Agent Velocity Engineering certification. 
              Shareable on LinkedIn with digital badge and certificate PDF.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>All modules completed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>80%+ velocity audit score</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Personal action plan submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Transform Your Team's Velocity?</h3>
        <p className="text-gray-600 mb-6">
          Join the next cohort and master the 5 practices that leading teams use to ship agents 10x faster
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => alert('Coming soon! Workshop cohorts launching Q1 2026')}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
          >
            Register for Next Cohort
          </button>
          <button
            onClick={() => downloadMaterial('Full Workshop Package (Materials + Slides + Templates)')}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Workshop Materials
          </button>
        </div>
      </div>
    </div>
  )
}
