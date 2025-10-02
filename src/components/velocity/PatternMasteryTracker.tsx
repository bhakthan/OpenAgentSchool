import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Filter, Search, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VelocityBadge } from '../patterns/VelocityBadge'

// Simplified pattern data structure (would import from actual pattern files in production)
interface PatternMasteryItem {
  id: string
  name: string
  category: string
  impact: 'high' | 'medium' | 'low'
  timeToImplement: string
  reusabilityScore: number
  velocityPractices: string[]
  completed: boolean
}

// Mock pattern data (in production, this would come from actual pattern files)
const mockPatterns: Omit<PatternMasteryItem, 'completed'>[] = [
  { id: 'prompt-chaining', name: 'Prompt Chaining', category: 'Coordination', impact: 'high', timeToImplement: '1-2 hours', reusabilityScore: 10, velocityPractices: ['Pattern Fluency'] },
  { id: 'routing', name: 'Routing', category: 'Coordination', impact: 'high', timeToImplement: '2-4 hours', reusabilityScore: 10, velocityPractices: ['Pattern Fluency', 'Architecture Templates'] },
  { id: 'parallelization', name: 'Parallelization', category: 'Coordination', impact: 'high', timeToImplement: '3-5 hours', reusabilityScore: 9, velocityPractices: ['Pattern Fluency'] },
  { id: 'orchestrator-workers', name: 'Orchestrator-Workers', category: 'Coordination', impact: 'high', timeToImplement: '4-6 hours', reusabilityScore: 9, velocityPractices: ['Architecture Templates'] },
  { id: 'evaluator-optimizer', name: 'Evaluator-Optimizer', category: 'Coordination', impact: 'high', timeToImplement: '4-6 hours', reusabilityScore: 8, velocityPractices: ['Evaluation Automation'] },
  { id: 'react-agent', name: 'ReAct Agent', category: 'Agentic', impact: 'high', timeToImplement: '3-5 hours', reusabilityScore: 10, velocityPractices: ['Pattern Fluency', 'Architecture Templates'] },
  { id: 'modern-tool-use', name: 'Modern Tool Use', category: 'Agentic', impact: 'high', timeToImplement: '2-4 hours', reusabilityScore: 10, velocityPractices: ['Pattern Fluency'] },
  { id: 'structured-output', name: 'Structured Output', category: 'Data Flow', impact: 'high', timeToImplement: '1-2 hours', reusabilityScore: 10, velocityPractices: ['Pattern Fluency'] },
  // Add more patterns as needed...
]

export default function PatternMasteryTracker() {
  const [patterns, setPatterns] = useState<PatternMasteryItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterImpact, setFilterImpact] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'incomplete'>('all')
  const [filterPractice, setFilterPractice] = useState<'all' | string>('all')

  useEffect(() => {
    loadPatternProgress()
  }, [])

  const loadPatternProgress = () => {
    const storedData = localStorage.getItem('user_velocity_data')
    const completedPatternIds: string[] = storedData 
      ? JSON.parse(storedData).completedPatterns 
      : []

    const patternsWithCompletion = mockPatterns.map(pattern => ({
      ...pattern,
      completed: completedPatternIds.includes(pattern.id)
    }))

    setPatterns(patternsWithCompletion)
  }

  const togglePatternCompletion = (patternId: string) => {
    const storedData = localStorage.getItem('user_velocity_data')
    const velocityData = storedData ? JSON.parse(storedData) : {
      completedPatterns: [],
      implementationTimes: {},
      assessmentScore: 0,
      practiceExperience: {},
      lastUpdated: new Date().toISOString()
    }

    const isCompleted = velocityData.completedPatterns.includes(patternId)
    
    if (isCompleted) {
      velocityData.completedPatterns = velocityData.completedPatterns.filter((id: string) => id !== patternId)
    } else {
      velocityData.completedPatterns.push(patternId)
    }

    velocityData.lastUpdated = new Date().toISOString()
    localStorage.setItem('user_velocity_data', JSON.stringify(velocityData))

    loadPatternProgress()
  }

  // Filter patterns
  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesImpact = filterImpact === 'all' || pattern.impact === filterImpact
    const matchesCompleted = filterCompleted === 'all' ||
                            (filterCompleted === 'completed' && pattern.completed) ||
                            (filterCompleted === 'incomplete' && !pattern.completed)
    const matchesPractice = filterPractice === 'all' || 
                           pattern.velocityPractices.some(p => p.toLowerCase().includes(filterPractice.toLowerCase()))

    return matchesSearch && matchesImpact && matchesCompleted && matchesPractice
  })

  const completedCount = patterns.filter(p => p.completed).length
  const totalCount = patterns.length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const practices = [
    'Pattern Fluency',
    'Architecture Templates',
    'Failure Libraries',
    'Evaluation Automation',
    'Operational Instrumentation'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pattern Mastery Tracker</h1>
        <p className="text-gray-600">
          Track your progress across all 48 agent patterns. Mark patterns as complete to boost your velocity score.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {completedCount}/{totalCount}
            </div>
            <div className="text-gray-600">Patterns Mastered</div>
          </div>
          <div className="w-32 h-32 relative">
            {/* Circular progress */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                className="text-purple-600"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{completionPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Impact Filter */}
          <select
            value={filterImpact}
            onChange={(e) => setFilterImpact(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Impact Levels</option>
            <option value="high">🚀 High Impact</option>
            <option value="medium">⚡ Medium Impact</option>
            <option value="low">📈 Low Impact</option>
          </select>

          {/* Completion Filter */}
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Patterns</option>
            <option value="completed">Completed Only</option>
            <option value="incomplete">Incomplete Only</option>
          </select>

          {/* Practice Filter */}
          <select
            value={filterPractice}
            onChange={(e) => setFilterPractice(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Practices</option>
            {practices.map(practice => (
              <option key={practice} value={practice}>{practice}</option>
            ))}
          </select>
        </div>

        {/* Active filters summary */}
        {(searchQuery || filterImpact !== 'all' || filterCompleted !== 'all' || filterPractice !== 'all') && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPatterns.length} of {totalCount} patterns
          </div>
        )}
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatterns.map((pattern) => (
          <div
            key={pattern.id}
            className={`bg-white rounded-lg border-2 p-4 transition-all ${
              pattern.completed 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <VelocityBadge impact={pattern.impact} />
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {pattern.category}
                  </span>
                </div>
                <Link 
                  to={`/patterns/${pattern.id}`}
                  className="font-semibold text-gray-900 hover:text-purple-700 transition-colors"
                >
                  {pattern.name}
                </Link>
              </div>
              <button
                onClick={() => togglePatternCompletion(pattern.id)}
                className="flex-shrink-0 ml-2 focus:outline-none"
                aria-label={pattern.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {pattern.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 hover:text-purple-600 transition-colors" />
                )}
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Reusability: {pattern.reusabilityScore}/10</span>
              </div>
              <div className="text-xs">
                <span className="font-medium">Time:</span> {pattern.timeToImplement}
              </div>
            </div>

            {pattern.velocityPractices.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {pattern.velocityPractices.slice(0, 2).map((practice, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {practice}
                    </span>
                  ))}
                  {pattern.velocityPractices.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{pattern.velocityPractices.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No patterns match your filters</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setFilterImpact('all')
              setFilterCompleted('all')
              setFilterPractice('all')
            }}
            className="text-purple-700 hover:text-purple-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
