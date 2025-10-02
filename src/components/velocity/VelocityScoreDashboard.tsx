import { useState, useEffect } from 'react'
import { TrendingUp, Target, Zap, BookOpen, Activity, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Type definitions
interface VelocityData {
  completedPatterns: string[]
  implementationTimes: Record<string, number>
  assessmentScore: number
  practiceExperience: Record<string, 'none' | 'learning' | 'proficient' | 'expert'>
  lastUpdated: string
}

interface MetricCard {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface Activity {
  id: string
  type: 'pattern_complete' | 'assessment' | 'practice_learned'
  description: string
  timestamp: string
}

export default function VelocityScoreDashboard() {
  const [velocityData, setVelocityData] = useState<VelocityData | null>(null)
  const [velocityScore, setVelocityScore] = useState(0)

  // Load velocity data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('user_velocity_data')
    if (storedData) {
      const data: VelocityData = JSON.parse(storedData)
      setVelocityData(data)
      calculateVelocityScore(data)
    } else {
      // Initialize empty data structure
      const emptyData: VelocityData = {
        completedPatterns: [],
        implementationTimes: {},
        assessmentScore: 0,
        practiceExperience: {
          'pattern-fluency': 'none',
          'architecture-templates': 'none',
          'failure-libraries': 'none',
          'evaluation-automation': 'none',
          'operational-instrumentation': 'none'
        },
        lastUpdated: new Date().toISOString()
      }
      setVelocityData(emptyData)
      localStorage.setItem('user_velocity_data', JSON.stringify(emptyData))
    }
  }, [])

  // Calculate overall velocity score (0-100)
  const calculateVelocityScore = (data: VelocityData) => {
    const patternScore = (data.completedPatterns.length / 48) * 40 // 40% weight
    const assessmentContribution = (data.assessmentScore / 100) * 30 // 30% weight
    
    // Practice experience score (30% weight)
    const experienceLevels = { none: 0, learning: 0.33, proficient: 0.66, expert: 1 }
    const practiceSum = Object.values(data.practiceExperience)
      .reduce((sum, level) => sum + experienceLevels[level], 0)
    const practiceScore = (practiceSum / 5) * 30
    
    const totalScore = Math.round(patternScore + assessmentContribution + practiceScore)
    setVelocityScore(totalScore)
  }

  // Get velocity level and color
  const getVelocityLevel = (score: number): { level: string; color: string; bg: string } => {
    if (score >= 80) return { level: 'Expert', color: 'text-green-700', bg: 'bg-green-50' }
    if (score >= 60) return { level: 'Proficient', color: 'text-blue-700', bg: 'bg-blue-50' }
    if (score >= 40) return { level: 'Developing', color: 'text-yellow-700', bg: 'bg-yellow-50' }
    return { level: 'Beginning', color: 'text-gray-700', bg: 'bg-gray-50' }
  }

  // Count quick win patterns (high impact + gentle learning curve)
  const getQuickWinCount = () => {
    if (!velocityData) return 0
    // This would ideally check against pattern metadata
    // For now, we'll use a simplified calculation
    return Math.min(velocityData.completedPatterns.length, 12)
  }

  // Get average implementation time
  const getAvgImplementationTime = () => {
    if (!velocityData || Object.keys(velocityData.implementationTimes).length === 0) {
      return 'No data yet'
    }
    const times = Object.values(velocityData.implementationTimes)
    const avgHours = times.reduce((sum, t) => sum + t, 0) / times.length
    return `${avgHours.toFixed(1)} hours`
  }

  // Get practice coverage count
  const getPracticeCoverage = () => {
    if (!velocityData) return 0
    return Object.values(velocityData.practiceExperience)
      .filter(level => level !== 'none').length
  }

  // Recent activity (mock data for now)
  const recentActivity: Activity[] = velocityData ? [
    {
      id: '1',
      type: 'pattern_complete',
      description: 'Completed Routing pattern',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      type: 'assessment',
      description: 'Improved assessment score by 15%',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'practice_learned',
      description: 'Mastered Evaluation Automation practice',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ] : []

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (!velocityData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading velocity data...</p>
        </div>
      </div>
    )
  }

  const { level, color, bg } = getVelocityLevel(velocityScore)

  const metrics: MetricCard[] = [
    {
      title: 'Pattern Mastery',
      value: `${velocityData.completedPatterns.length}/48`,
      subtitle: `${Math.round((velocityData.completedPatterns.length / 48) * 100)}% complete`,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Quick Win Patterns',
      value: getQuickWinCount(),
      subtitle: 'High impact, gentle curve',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Avg Implementation Time',
      value: getAvgImplementationTime(),
      subtitle: 'Per pattern',
      icon: <Target className="w-5 h-5" />,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'AVE Practice Coverage',
      value: `${getPracticeCoverage()}/5`,
      subtitle: 'Practices experienced',
      icon: <Award className="w-5 h-5" />,
      color: 'text-green-700',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Velocity Score Dashboard</h1>
        <p className="text-gray-600">
          Track your agent development velocity and mastery across 48 patterns and 5 AVE practices
        </p>
      </div>

      {/* Velocity Score Hero Card */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Velocity Score</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Overall agent development velocity based on patterns mastered, assessment results, and practice experience
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg} ${color} font-medium`}>
              {level} Level
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">{velocityScore}</div>
            <div className="text-gray-600 font-medium">out of 100</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${velocityScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Beginning</span>
            <span>Developing</span>
            <span>Proficient</span>
            <span>Expert</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <div className={metric.color}>{metric.icon}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">{metric.title}</div>
            <div className="text-sm text-gray-600">{metric.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'pattern_complete' ? 'bg-green-100' :
                  activity.type === 'assessment' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'pattern_complete' ? <BookOpen className="w-4 h-4 text-green-700" /> :
                   activity.type === 'assessment' ? <TrendingUp className="w-4 h-4 text-blue-700" /> :
                   <Award className="w-4 h-4 text-purple-700" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatTimestamp(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No activity yet. Start by exploring patterns or taking the velocity assessment!
          </p>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Keep Building Velocity</h3>
        <p className="text-purple-200 mb-6">
          Explore more patterns, take the assessment, and track your progress toward expert-level velocity
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/patterns"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Explore 48 Patterns
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/ai-skills"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors border border-purple-600"
          >
            Take Velocity Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
