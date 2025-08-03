import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Clock, 
  ArrowsClockwise, 
  GitMerge,
  Star,
  ArrowRight,
  CheckCircle,
  Timer
} from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

export default function DevelopmentVelocitySkills({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-xl">Exponential Development Velocity</CardTitle>
          <CardDescription className="text-base">
            AI-native practices that dramatically accelerate development speed while maintaining quality
          </CardDescription>
        </CardHeader>
      </Card>

      {/* OpenAI Velocity Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <CardTitle>OpenAI Codex: Velocity Acceleration</CardTitle>
              <CardDescription>More output under time pressure through intelligent automation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Request to Prototype */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">User Request to Prototype in One Prompt</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Requirements gathering meetings</li>
                  <li>• Technical specification writing</li>
                  <li>• Architecture planning sessions</li>
                  <li>• Step-by-step development</li>
                  <li>• Multiple iteration cycles</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Direct requirement-to-code translation</li>
                  <li>• Instant architecture generation</li>
                  <li>• Working prototype in single prompt</li>
                  <li>• Immediate user feedback integration</li>
                  <li>• Rapid iteration cycles</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Example Transformation</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Traditional: 2-3 weeks</p>
                  <p className="text-sm text-red-600 dark:text-red-400">Requirements → Design → Code → Test → Deploy</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">AI-Native: 2-3 hours</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Prompt → Working Prototype → User Feedback → Iterate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Async AI Work */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Async AI Work During Meetings</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              AI continues development work while humans are in meetings, ensuring continuous progress 
              without human bottlenecks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">9:00 AM - Meeting Starts</h4>
                <p className="text-sm text-muted-foreground">Human joins standup meeting</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">AI: Starting feature implementation</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Timer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h4 className="font-semibold">9:30 AM - Meeting Continues</h4>
                <p className="text-sm text-muted-foreground">Human discusses project updates</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">AI: Completed API endpoints, testing started</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold">10:00 AM - Meeting Ends</h4>
                <p className="text-sm text-muted-foreground">Human returns to development</p>
                <p className="text-xs text-green-600 dark:text-green-400">AI: Feature complete, PR ready for review</p>
              </div>
            </div>
          </div>

          {/* Mass Code Changes */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Mass Code Changes + PR Automation</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-3">Traditional Approach</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Manual find-and-replace across files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Individual file updates and testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Manual PR creation and documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Sequential processing of changes</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-950/30 rounded text-sm text-red-700 dark:text-red-300">
                  <strong>Time:</strong> Days to weeks for large refactors
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">AI-Native Approach</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Intelligent pattern recognition across codebase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Automatic PR generation with context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Generated markdown impact summaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Parallel processing of multiple changes</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-950/30 rounded text-sm text-green-700 dark:text-green-300">
                  <strong>Time:</strong> Hours for complex migrations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anthropic Velocity Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <CardTitle>Anthropic Claude: Autonomous Development</CardTitle>
              <CardDescription>70% feature development by AI through auto-accept workflows</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto-Accept Loops */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Auto-Accept Loops for Autonomous Development</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              AI works autonomously with minimal human oversight, automatically accepting and implementing 
              changes while maintaining quality standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">How Auto-Accept Works</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium">AI Proposes Change</h5>
                      <p className="text-sm text-muted-foreground">Analyzes requirements and suggests implementation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Quality Gates Check</h5>
                      <p className="text-sm text-muted-foreground">Automated validation against standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Auto-Accept & Deploy</h5>
                      <p className="text-sm text-muted-foreground">Automatic implementation if quality gates pass</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Success Metrics</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">70%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Features developed autonomously</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Auto-accept approval rate</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5x</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Development speed increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Autonomous Feature Building */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Autonomous Feature Building (Example: Vim Mode)</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Real-World Case Study</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Anthropic's AI autonomously developed a complete Vim mode feature for their editor, 
                including all keybindings, modes, and behaviors.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <strong>Planning:</strong> 30 minutes
                  <br />
                  <span className="text-muted-foreground">AI analyzed Vim specifications</span>
                </div>
                <div>
                  <strong>Development:</strong> 4 hours
                  <br />
                  <span className="text-muted-foreground">Autonomous implementation</span>
                </div>
                <div>
                  <strong>Testing:</strong> 1 hour
                  <br />
                  <span className="text-muted-foreground">Automated validation</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Success Factors</h4>
              <ul className="space-y-1 text-sm">
                <li>• Clear specification and requirements documentation</li>
                <li>• Robust testing framework for validation</li>
                <li>• Incremental development with checkpoints</li>
                <li>• Human oversight at critical decision points</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Building Your Velocity Acceleration System</CardTitle>
          <CardDescription>
            Practical steps to implement AI-native development velocity practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Foundation Setup</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Rapid Prototyping Pipeline</h4>
                    <p className="text-sm text-muted-foreground">Set up one-prompt-to-prototype workflows</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Async Work Queues</h4>
                    <p className="text-sm text-muted-foreground">Configure AI to work during human downtime</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <GitMerge className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Automated PR Generation</h4>
                    <p className="text-sm text-muted-foreground">Set up mass change automation with documentation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Advanced Automation</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ArrowsClockwise className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Auto-Accept Workflows</h4>
                    <p className="text-sm text-muted-foreground">Implement quality gates for autonomous development</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Quality Assurance Integration</h4>
                    <p className="text-sm text-muted-foreground">Automated testing and validation pipelines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Timer className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Performance Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Track velocity metrics and optimization opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full" size="lg" onClick={onNavigate}>
              <span>Continue to Cross-Team Collaboration</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
