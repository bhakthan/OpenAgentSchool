import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Users, Brain, Calculator, TrendUp, Target } from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

interface TeamFunction {
  id: string
  name: string
  description: string
  currentHumans: number
  suggestedAgents: number
  complexity: 'low' | 'medium' | 'high'
  automationPotential: number
}

const defaultFunctions: TeamFunction[] = [
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Support tickets, inquiries, and basic problem resolution',
    currentHumans: 10,
    suggestedAgents: 15,
    complexity: 'low',
    automationPotential: 70
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Content creation, campaign management, and lead generation',
    currentHumans: 8,
    suggestedAgents: 12,
    complexity: 'medium',
    automationPotential: 60
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Data processing, reporting, and basic insights',
    currentHumans: 5,
    suggestedAgents: 20,
    complexity: 'medium',
    automationPotential: 80
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    description: 'Code generation, testing, and documentation',
    currentHumans: 15,
    suggestedAgents: 10,
    complexity: 'high',
    automationPotential: 45
  },
  {
    id: 'hr-operations',
    name: 'HR Operations',
    description: 'Recruitment screening, policy queries, and onboarding',
    currentHumans: 6,
    suggestedAgents: 8,
    complexity: 'medium',
    automationPotential: 55
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Invoice processing, expense tracking, and basic reporting',
    currentHumans: 7,
    suggestedAgents: 12,
    complexity: 'medium',
    automationPotential: 65
  }
]

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const calculateEfficiency = (humans: number, agents: number, automationPotential: number) => {
  // Efficiency gain calculation based on automation potential and agent multiplication factor
  const agentMultiplier = automationPotential / 100 * 2 // Agents can be 2x more efficient for automatable tasks
  const effectiveCapacity = humans + (agents * agentMultiplier)
  const originalCapacity = humans
  return ((effectiveCapacity - originalCapacity) / originalCapacity) * 100
}

const calculateCapacityGain = (humans: number, agents: number, automationPotential: number) => {
  // Calculate effective additional capacity provided by agents
  const agentCapacityMultiplier = (automationPotential / 100) * 1.8 // Agents provide up to 1.8x capacity for automatable tasks
  const additionalCapacity = agents * agentCapacityMultiplier
  const baseCapacity = humans
  return (additionalCapacity / baseCapacity) * 100 // Return as percentage increase
}

const calculateResourceEfficiency = (humans: number, agents: number, automationPotential: number) => {
  // Calculate how much more work can be done with the same team size
  const effectiveTeamSize = humans + (agents * (automationPotential / 100))
  const resourceMultiplier = effectiveTeamSize / humans
  return (resourceMultiplier - 1) * 100 // Return as percentage improvement
}

export default function HumanAgentRatioCalculator({ onNavigate }: Props) {
  const [functions, setFunctions] = useState<TeamFunction[]>(defaultFunctions)

  const updateFunction = (id: string, field: keyof TeamFunction, value: number) => {
    setFunctions(prev => prev.map(func => 
      func.id === id ? { ...func, [field]: value } : func
    ))
  }

  const totalCurrentHumans = functions.reduce((sum, func) => sum + func.currentHumans, 0)
  const totalSuggestedAgents = functions.reduce((sum, func) => sum + func.suggestedAgents, 0)
  const totalEfficiencyGain = functions.reduce((sum, func) => {
    const efficiency = calculateEfficiency(func.currentHumans, func.suggestedAgents, func.automationPotential)
    return sum + efficiency
  }, 0) / functions.length

  const totalCapacityGain = functions.reduce((sum, func) => {
    return sum + calculateCapacityGain(func.currentHumans, func.suggestedAgents, func.automationPotential)
  }, 0) / functions.length

  return (
    <div className="space-y-6">
      {/* Instructions Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Brain className="w-6 h-6" />
            Human + Agent Collaboration Strategy
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            <strong>Key Insight from Microsoft's 2025 Work Trend Index:</strong> Frontier Firms don't replace humans with AI—they amplify human capabilities through strategic human-agent collaboration. 
            This calculator helps you discover the optimal balance where humans and AI agents work together to <em>increase capacity</em> and <em>enhance creativity</em>, 
            <strong> not replace your workforce</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-blue-200/50">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-blue-700 dark:text-blue-300">Humans Lead</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Strategic thinking, creativity, and complex decision-making</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-purple-200/50">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-400">+</span>
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="font-semibold text-purple-700 dark:text-purple-300">Together</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Amplified productivity and enhanced capabilities</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-purple-200/50">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold text-purple-700 dark:text-purple-300">Agents Support</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Automation, data processing, and routine tasks</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg border border-blue-200/70">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Remember:</strong> The goal is to create "more humans doing more human work" by freeing people from repetitive tasks to focus on strategic, creative, and relationship-driven activities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Human-Agent Collaboration Calculator
          </CardTitle>
          <CardDescription>
            Design your organization's optimal human-agent balance based on Microsoft's Frontier Firm research. 
            Explore how strategic collaboration between humans and AI agents can amplify your team's capacity and creativity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{totalCurrentHumans}</div>
              <div className="text-sm text-muted-foreground">Current Humans</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{totalSuggestedAgents}</div>
              <div className="text-sm text-muted-foreground">Suggested Agents</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <TrendUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{Math.round(totalEfficiencyGain)}%</div>
              <div className="text-sm text-muted-foreground">Efficiency Gain</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Function-by-Function Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Function-by-Function Analysis</CardTitle>
          <CardDescription>
            Adjust the human-agent ratio for each business function
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {functions.map((func) => {
              const efficiency = calculateEfficiency(func.currentHumans, func.suggestedAgents, func.automationPotential)
              const capacityGain = calculateCapacityGain(func.currentHumans, func.suggestedAgents, func.automationPotential)
              const resourceEfficiency = calculateResourceEfficiency(func.currentHumans, func.suggestedAgents, func.automationPotential)
              
              return (
                <div key={func.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{func.name}</h3>
                      <p className="text-sm text-muted-foreground">{func.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getComplexityColor(func.complexity)} variant="secondary">
                        {func.complexity} complexity
                      </Badge>
                      <Badge variant="outline">
                        {func.automationPotential}% automatable
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Current Humans: {func.currentHumans}
                      </div>
                      <Slider
                        value={[func.currentHumans]}
                        onValueChange={([value]) => updateFunction(func.id, 'currentHumans', value)}
                        max={50}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Suggested Agents: {func.suggestedAgents}
                      </div>
                      <Slider
                        value={[func.suggestedAgents]}
                        onValueChange={([value]) => updateFunction(func.id, 'suggestedAgents', value)}
                        max={50}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {func.currentHumans}:{func.suggestedAgents}
                      </div>
                      <div className="text-xs text-muted-foreground">Human:Agent Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        +{Math.round(efficiency)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Efficiency Gain</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">
                        +{Math.round(capacityGain)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Capacity Increase</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Human-Agent Collaboration Strategy
          </CardTitle>
          <CardDescription>
            Overall impact of your optimized human-agent collaboration approach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600">{totalCurrentHumans + totalSuggestedAgents}</div>
              <div className="text-sm text-muted-foreground">Total Team Members</div>
              <div className="text-xs text-blue-600 mt-1">{totalCurrentHumans} humans + {totalSuggestedAgents} agents</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600">+{Math.round(totalEfficiencyGain)}%</div>
              <div className="text-sm text-muted-foreground">Avg Efficiency Gain</div>
              <div className="text-xs text-green-600 mt-1">Across all functions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600">+{Math.round(totalCapacityGain)}%</div>
              <div className="text-sm text-muted-foreground">Capacity Increase</div>
              <div className="text-xs text-purple-600 mt-1">Additional work capacity</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600">{Math.round((totalSuggestedAgents / totalCurrentHumans) * 10) / 10}:1</div>
              <div className="text-sm text-muted-foreground">Agent:Human Ratio</div>
              <div className="text-xs text-orange-600 mt-1">Organization average</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2">🤝 Key Insights for Human-Agent Collaboration</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Your optimal human-agent collaboration varies by function complexity and human creativity requirements</li>
              <li>• Data analysis and customer service show highest potential for agent augmentation</li>
              <li>• Strategic and creative roles benefit most from human leadership with agent support</li>
              <li>• Total capacity increase of ~{Math.round(totalCapacityGain)}% while preserving human judgment and creativity</li>
              <li>• Focus on "humans + agents" collaboration rather than workforce replacement</li>
              <li>• Agents handle routine work so humans can focus on high-value, strategic activities</li>
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button onClick={onNavigate} className="w-full" size="lg">
              <span>Continue to Code Understanding Skills →</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
