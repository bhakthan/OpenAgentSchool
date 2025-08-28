import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Target, TrendUp, Users, Brain, Sparkle, Crown } from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

interface AssessmentQuestion {
  id: string
  question: string
  description: string
  answers: { value: number; label: string; description: string }[]
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "ai-deployment",
    question: "What is your organization's current AI deployment status?",
    description: "Organization-wide AI deployment is a key characteristic of Frontier Firms",
    answers: [
      { value: 0, label: "No AI deployment", description: "We haven't started using AI in our organization" },
      { value: 1, label: "Pilot projects only", description: "We have a few AI pilot projects in specific departments" },
      { value: 2, label: "Department-level deployment", description: "AI is deployed across several departments" },
      { value: 3, label: "Organization-wide deployment", description: "AI is deployed across the entire organization" }
    ]
  },
  {
    id: "agent-familiarity",
    question: "How familiar are you and your team with AI agents?",
    description: "67% of Frontier Firm leaders are familiar with agents vs. 40% of employees globally",
    answers: [
      { value: 0, label: "Not familiar", description: "We don't know what AI agents are" },
      { value: 1, label: "Basic awareness", description: "We've heard of AI agents but don't use them" },
      { value: 2, label: "Familiar", description: "We understand AI agents and are experimenting" },
      { value: 3, label: "Expert level", description: "We actively use and manage AI agents" }
    ]
  },
  {
    id: "digital-labor",
    question: "How confident are you about using digital labor to expand workforce capacity?",
    description: "82% of leaders are confident they'll use digital labor in the next 12-18 months",
    answers: [
      { value: 0, label: "Not confident", description: "We don't see digital labor as viable" },
      { value: 1, label: "Somewhat confident", description: "We're cautious but open to digital labor" },
      { value: 2, label: "Confident", description: "We plan to use digital labor within 12-18 months" },
      { value: 3, label: "Extremely confident", description: "We're already implementing digital labor strategies" }
    ]
  },
  {
    id: "roi-measurement",
    question: "How well does your organization measure ROI on AI investments?",
    description: "Frontier Firms actively measure and see ROI from AI implementations",
    answers: [
      { value: 0, label: "No measurement", description: "We don't measure AI ROI" },
      { value: 1, label: "Basic tracking", description: "We track some basic AI metrics" },
      { value: 2, label: "Structured measurement", description: "We have formal processes to measure AI ROI" },
      { value: 3, label: "Advanced analytics", description: "We have sophisticated AI ROI measurement and optimization" }
    ]
  },
  {
    id: "workflow-automation",
    question: "What percentage of your workflows are automated with AI?",
    description: "46% of Frontier Firm leaders use agents to fully automate workflows",
    answers: [
      { value: 0, label: "0-10%", description: "Minimal workflow automation" },
      { value: 1, label: "11-30%", description: "Some processes are automated" },
      { value: 2, label: "31-60%", description: "Significant automation across workflows" },
      { value: 3, label: "61%+", description: "Majority of workflows are AI-automated" }
    ]
  },
  {
    id: "agent-integration",
    question: "How extensively do you plan to integrate agents into your AI strategy?",
    description: "Frontier Firms plan moderate to extensive agent integration",
    answers: [
      { value: 0, label: "No plans", description: "We don't plan to use agents" },
      { value: 1, label: "Limited integration", description: "Agents for specific, narrow tasks only" },
      { value: 2, label: "Moderate integration", description: "Agents across multiple functions and processes" },
      { value: 3, label: "Extensive integration", description: "Agents as core part of business operations" }
    ]
  }
]

const getScoreLevel = (score: number) => {
  if (score >= 15) return { level: "Frontier Firm", color: "text-green-600", bgColor: "bg-green-50 border-green-200" }
  if (score >= 12) return { level: "Advanced Adopter", color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" }
  if (score >= 8) return { level: "Early Adopter", color: "text-orange-600", bgColor: "bg-orange-50 border-orange-200" }
  return { level: "Traditional Organization", color: "text-gray-600", bgColor: "bg-gray-50 border-gray-200" }
}

const getRecommendations = (score: number, level: string) => {
  if (level === "Frontier Firm") {
    return [
      "Continue optimizing your human-agent ratio across all functions",
      "Focus on advanced multi-agent systems for complex workflows",
      "Develop Intelligence Resources department for human-AI management",
      "Scale successful AI patterns across the entire organization",
      "Invest in agent boss training for all employees"
    ]
  } else if (level === "Advanced Adopter") {
    return [
      "Expand AI deployment from departments to organization-wide",
      "Implement formal ROI measurement for all AI initiatives",
      "Begin training employees in agent management skills",
      "Start automating end-to-end workflows with agents",
      "Develop cross-functional AI integration strategies"
    ]
  } else if (level === "Early Adopter") {
    return [
      "Scale successful pilot projects to departmental level",
      "Invest in AI literacy training for leadership and employees",
      "Begin experimenting with simple AI agents for routine tasks",
      "Establish AI governance and measurement frameworks",
      "Identify high-impact use cases for workflow automation"
    ]
  } else {
    return [
      "Start with AI pilot projects in high-impact areas",
      "Invest in basic AI education for leadership team",
      "Assess current workflows for automation opportunities",
      "Establish AI strategy and governance foundation",
      "Begin with simple AI tools before advancing to agents"
    ]
  }
}

export default function FrontierFirmAssessment({ onNavigate }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
  const maxScore = assessmentQuestions.length * 3
  const scorePercentage = (totalScore / maxScore) * 100
  const { level, color, bgColor } = getScoreLevel(totalScore)
  const recommendations = getRecommendations(totalScore, level)

  const currentQ = assessmentQuestions[currentQuestion]
  const isAnswered = answers[currentQ?.id] !== undefined

  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className={`${bgColor} border-2`}>
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/50 flex items-center justify-center mb-4">
              {level === "Frontier Firm" ? (
                <Crown className="w-10 h-10 text-green-600" />
              ) : level === "Advanced Adopter" ? (
                <TrendUp className="w-10 h-10 text-blue-600" />
              ) : level === "Early Adopter" ? (
                <Target className="w-10 h-10 text-orange-600" />
              ) : (
                <Users className="w-10 h-10 text-gray-600" />
              )}
            </div>
            <CardTitle className={`text-2xl ${color}`}>
              Your Organization: {level}
            </CardTitle>
            <CardDescription className="text-lg">
              Score: {totalScore}/{maxScore} ({Math.round(scorePercentage)}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={scorePercentage} className="w-full h-3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-white/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600">71%</div>
                <div className="text-sm text-muted-foreground">Frontier Firms thriving</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">55%</div>
                <div className="text-sm text-muted-foreground">Can take on more work</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">93%</div>
                <div className="text-sm text-muted-foreground">Optimistic about future</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">21%</div>
                <div className="text-sm text-muted-foreground">Fear AI will take jobs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Disclaimer */}
        <div className="bg-muted text-foreground border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">📋 Remember:</span> This assessment provides directional insights for educational purposes. 
            Consult with professionals for comprehensive AI strategy development.
          </p>
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Your Assessment Breakdown</CardTitle>
            <CardDescription>
              See how your organization compares across key Frontier Firm characteristics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessmentQuestions.map((question) => {
                const userAnswer = answers[question.id] || 0
                const answerLabel = question.answers.find(a => a.value === userAnswer)?.label || "Not answered"
                const percentage = (userAnswer / 3) * 100
                
                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{question.question}</h4>
                      <Badge variant="outline">{answerLabel}</Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkle className="w-5 h-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your assessment, here's your path to becoming a Frontier Firm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={resetAssessment} variant="outline" className="flex-1">
            Retake Assessment
          </Button>
          <Button onClick={onNavigate} className="flex-1">
            Next: Ratio Calculator
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Legal Disclaimer */}
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <span className="text-xl text-amber-600">⚠️</span>
            Important Assessment Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-foreground">
              <strong>Educational Assessment Only:</strong> This assessment is designed for educational and self-evaluation purposes to help understand your organization's AI readiness.
            </p>
            <div className="bg-muted/50 p-3 rounded-lg border">
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Self-Evaluation Tool:</strong> Results are based on self-reported responses and are directional, not definitive organizational assessments</li>
                <li>• <strong>No Benchmarking Guarantee:</strong> Assessment does not guarantee comparison accuracy with actual Frontier Firms</li>
                <li>• <strong>Context-Dependent:</strong> Actual AI readiness depends on industry, regulatory requirements, organizational culture, and specific business context</li>
                <li>• <strong>Professional Guidance:</strong> Consult with AI strategy experts, IT professionals, and business consultants for comprehensive AI transformation planning</li>
                <li>• <strong>Continuous Learning:</strong> AI readiness is an ongoing journey—this assessment captures a moment in time, not a final determination</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground italic">
              This assessment is based on insights from Microsoft's 2025 Work Trend Index research and is intended to promote thoughtful AI strategy development.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Frontier Firm Assessment
          </CardTitle>
          <CardDescription>
            Evaluate your organization's readiness for AI-native transformation based on Microsoft's 2025 Work Trend Index research.
            <br />
            <a 
              href="https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              📊 Read the full Microsoft Work Trend Index 2025 report
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} className="mb-6" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          <CardDescription>{currentQ.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQ.answers.map((answer) => (
              <button
                key={answer.value}
                onClick={() => handleAnswer(currentQ.id, answer.value)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-primary/50 ${
                  answers[currentQ.id] === answer.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="font-medium mb-1">{answer.label}</div>
                <div className="text-sm text-muted-foreground">{answer.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentQuestion === assessmentQuestions.length - 1 ? "View Results" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
