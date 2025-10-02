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
    <Card className="bg-card border">
        <CardHeader>
      <CardTitle className="text-xl">Agent Velocity Engineering</CardTitle>
      <CardDescription className="text-base">
            Systematic practices to accelerate agent development cycles through pattern fluency, architecture templates, failure scenario libraries, evaluation automation, and operational instrumentation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* AVE Principles Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Agent Velocity Engineering: Core Principles
          </CardTitle>
          <CardDescription>
            Five systematic practices that compound to deliver exponential development acceleration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              {
                icon: <Star className="w-5 h-5 text-yellow-500" />,
                title: 'Pattern Fluency',
                desc: 'Master 27+ proven agent patterns to recognize and apply architectural solutions instantly'
              },
              {
                icon: <GitMerge className="w-5 h-5 text-blue-500" />,
                title: 'Architecture Templates',
                desc: 'Pre-validated scaffolds for common agent workflows reduce setup time from days to hours'
              },
              {
                icon: <ArrowsClockwise className="w-5 h-5 text-purple-500" />,
                title: 'Failure Scenario Libraries',
                desc: 'Curated catalog of edge cases and failure modes enables proactive resilience design'
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                title: 'Evaluation Automation',
                desc: 'Continuous testing harnesses catch regressions early and enable confident iteration'
              },
              {
                icon: <Timer className="w-5 h-5 text-orange-500" />,
                title: 'Operational Instrumentation',
                desc: 'Real-time observability and metrics dashboards surface performance bottlenecks instantly'
              }
            ].map((principle, idx) => (
              <div key={idx} className="flex gap-3 p-4 rounded-lg border bg-card/60 hover:bg-card transition-colors">
                <div className="flex-shrink-0 mt-1">{principle.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* OpenAI Velocity Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <CardTitle>OpenAI Codex: Velocity Acceleration in Practice</CardTitle>
              <CardDescription>Real-world examples of Agent Velocity Engineering principles</CardDescription>
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

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Example Transformation</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Traditional: 2-3 weeks</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Requirements → Design → Code → Test → Deploy</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">AI-Native: 2-3 hours</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Prompt → Working Prototype → User Feedback → Iterate</p>
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
                <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 rounded text-sm text-red-800 dark:text-red-200">
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
                <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-sm text-green-800 dark:text-green-200">
                  <strong>Time:</strong> Hours for complex migrations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Copilot Agentic Workflows */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <div>
              <CardTitle>GitHub Copilot: Agentic Workflows</CardTitle>
              <CardDescription>Complete idea-to-PR automation with coding agent, custom chat modes, and MCP integration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Coding Agent: Issue to PR */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Coding Agent: Issue to PR Automation</h3>
              <Badge variant="secondary">Agentic Workflow</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Manual issue analysis and scoping</li>
                  <li>• Developer creates branch and implementation</li>
                  <li>• Manual testing and debugging</li>
                  <li>• Step-by-step PR creation</li>
                  <li>• Multiple back-and-forth review cycles</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Agentic Workflow</h4>
                <ul className="space-y-2 text-sm">
                  <li>• AI creates well-structured issues from prompts</li>
                  <li>• Coding agent autonomously develops solution</li>
                  <li>• Automatic testing and environment setup</li>
                  <li>• Draft PR with complete implementation</li>
                  <li>• Responds to PR feedback iteratively</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">
                Real-World Example: Internationalization
              </h4>
              <p className="text-sm mb-2 text-purple-600 dark:text-purple-400">
                Prompt: "Create i18n capability supporting English, French, and Spanish with user language selection"
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Creates detailed GitHub issue with acceptance criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Coding agent implements complete solution asynchronously</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Runs tests and ensures lint checks pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Opens draft PR ready for review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Chat Modes */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Custom Chat Modes for Repeatable Workflows</h3>
              <Badge variant="secondary">VS Code 1.101+</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Script repeatable AI workflows that appear alongside Ask/Edit/Agent modes, 
              enabling consistent team conventions and specialized tooling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Planning Mode</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Generates implementation plans with requirements, steps, and testing strategies
                </p>
                <div className="text-xs bg-muted p-2 rounded">
                  Tools: codebase, search, github, create_issue
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Refactor Mode</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Specialized for cross-cutting refactoring tasks
                </p>
                <div className="text-xs bg-muted p-2 rounded">
                  Tools: usages, findTestFiles, codebase
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Test-Writer Mode</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Focused on test generation and coverage
                </p>
                <div className="text-xs bg-muted p-2 rounded">
                  Tools: findTestFiles, search, codebase
                </div>
              </div>
            </div>
          </div>

          {/* Remote MCP Integration */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Remote MCP Server Integration</h3>
              <Badge variant="secondary">No Local Setup</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional MCP</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Local npm packages or Docker containers</li>
                  <li>• Manual server management</li>
                  <li>• Personal Access Token authentication</li>
                  <li>• Environment setup overhead</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Remote MCP Server</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Hosted GitHub MCP server</li>
                  <li>• Zero local management overhead</li>
                  <li>• OAuth 2.0 authentication</li>
                  <li>• Instant access to GitHub context</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">GitHub MCP Capabilities</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1">
                    <li>• Live issue and PR access</li>
                    <li>• Repository code reading</li>
                    <li>• Workflow automation</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>• Security triage assistance</li>
                    <li>• CI/CD integration</li>
                    <li>• Cross-repo workflows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* End-to-End Workflow */}
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Complete Agentic Workflow</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-sm">Natural Language Request</h4>
                  <p className="text-xs text-muted-foreground mt-1">Describe feature or fix needed</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-sm">Issue Creation</h4>
                  <p className="text-xs text-muted-foreground mt-1">AI generates structured issue</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-sm">Autonomous Development</h4>
                  <p className="text-xs text-muted-foreground mt-1">Coding agent implements solution</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
                  </div>
                  <h4 className="font-medium text-sm">Review & Iterate</h4>
                  <p className="text-xs text-muted-foreground mt-1">Human review with AI refinements</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">Development Time Impact</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-red-600 dark:text-red-400">Traditional: Days to Weeks</p>
                    <p className="text-muted-foreground">Manual issue creation, development, testing, PR</p>
                  </div>
                  <div>
                    <p className="font-medium text-green-600 dark:text-green-400">Agentic: Hours with Background Work</p>
                    <p className="text-muted-foreground">AI handles boilerplate while you focus on review</p>
                  </div>
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
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium">AI Proposes Change</h5>
                      <p className="text-sm text-muted-foreground">Analyzes requirements and suggests implementation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Quality Gates Check</h5>
                      <p className="text-sm text-muted-foreground">Automated validation against standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
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
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">70%</div>
                    <div className="text-sm text-green-800 dark:text-green-200">Features developed autonomously</div>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">Auto-accept approval rate</div>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5x</div>
                    <div className="text-sm text-purple-800 dark:text-purple-200">Development speed increase</div>
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

            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
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

      {/* Google Gemini CLI */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <div>
              <CardTitle>Google Gemini CLI: Lightning-Fast Development Automation</CardTitle>
              <CardDescription>60 requests/minute with non-interactive scripting for maximum development velocity</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Non-Interactive Velocity */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Non-Interactive Scripting for Velocity</h3>
              <Badge variant="secondary">Pipeline-Ready</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional CLI Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Interactive prompts slow automation</li>
                  <li>• Manual intervention required</li>
                  <li>• Difficult to chain commands</li>
                  <li>• Limited scriptability</li>
                  <li>• Sequential processing bottlenecks</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Gemini CLI Automation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Pipeline-ready non-interactive mode</li>
                  <li>• Direct stdin/stdout for chaining</li>
                  <li>• Scriptable with bash/PowerShell</li>
                  <li>• Parallel processing capabilities</li>
                  <li>• 60 requests/minute burst capacity</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">High-Velocity Examples</h4>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">echo "Generate API docs" | gemini</code> - Instant documentation</div>
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">gemini -p "Fix all TypeScript errors"</code> - Automated error resolution</div>
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">find . -name "*.js" | xargs gemini</code> - Batch processing</div>
              </div>
            </div>
          </div>

          {/* Background Processing Workflows */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Background Processing & Checkpointing</h3>
              <Badge variant="secondary">Long-Running</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Gemini CLI's checkpointing enables complex multi-hour tasks to run in background 
              while preserving state across interruptions and system restarts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Start Complex Task</h4>
                <p className="text-sm text-muted-foreground">Initiate migration or refactoring</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Checkpoint: Analysis phase saved</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Timer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h4 className="font-semibold">Background Processing</h4>
                <p className="text-sm text-muted-foreground">AI continues during meetings/lunch</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Checkpoint: Implementation 60% complete</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold">Resume & Complete</h4>
                <p className="text-sm text-muted-foreground">Pick up exactly where left off</p>
                <p className="text-xs text-green-600 dark:text-green-400">Checkpoint: Task completed successfully</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">⚡ Real-World Velocity Impact:</p>
              <p className="text-sm text-muted-foreground">
                "Migrate 50+ files to new framework" → Start before lunch, AI works autonomously, 
                resume after lunch with 80% complete and full context preserved.
              </p>
            </div>
          </div>

          {/* Multi-Directory Velocity */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Multi-Directory Bulk Operations</h3>
              <Badge variant="secondary">Repo-Scale</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-3">Single Repository Focus</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Limited to current directory context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Manual navigation between projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Lose context when switching repos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Sequential processing across projects</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 rounded text-sm text-red-800 dark:text-red-200">
                  <strong>Time:</strong> Hours to days for cross-repo changes
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">Multi-Directory Intelligence</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Include multiple directories with --include-directories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Cross-repository pattern analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Consistent changes across all projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Parallel processing with context sharing</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-sm text-green-800 dark:text-green-200">
                  <strong>Time:</strong> Minutes for enterprise-wide refactors
                </div>
              </div>
            </div>

      <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Enterprise Velocity Example</h4>
              <div className="text-sm space-y-1">
        <p><code className="bg-card px-1 rounded">gemini --include-directories ../frontend,../backend,../mobile</code></p>
                <p className="text-muted-foreground">→ "Update authentication to use OAuth 2.0 across all services"</p>
                <p className="text-muted-foreground">→ AI analyzes patterns in all three repos simultaneously</p>
                <p className="text-muted-foreground">→ Generates consistent implementation across entire stack</p>
              </div>
            </div>
          </div>

          {/* Sandboxed Velocity with Safety */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Sandboxed High-Velocity Execution</h3>
              <Badge variant="secondary">Safe Automation</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Execute high-velocity automation with built-in safety through Docker/Podman sandboxing, 
                enabling aggressive optimization without system risk.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Velocity Operations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">🔄 Mass file transformations</div>
                    <div className="p-2 bg-muted rounded">⚡ Aggressive refactoring</div>
                    <div className="p-2 bg-muted rounded">🧪 Experimental optimizations</div>
                    <div className="p-2 bg-muted rounded">🔍 Deep dependency analysis</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Safety Guarantees</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">🛡️ Isolated execution environment</div>
                    <div className="p-2 bg-muted rounded">📦 Container-based boundaries</div>
                    <div className="p-2 bg-muted rounded">🔒 No host system access</div>
                    <div className="p-2 bg-muted rounded">♻️ Clean state for each operation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">High-Velocity + High-Safety</h4>
              <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <p>• <code className="bg-white dark:bg-gray-800 px-1 rounded">gemini --sandbox -p "Optimize entire codebase for performance"</code></p>
                <p>• AI can be maximally aggressive with changes</p>
                <p>• Zero risk to host development environment</p>
                <p>• Review sandbox results before applying to real codebase</p>
              </div>
            </div>
          </div>

          {/* CI/CD Pipeline Integration */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">CI/CD Pipeline Automation</h3>
              <Badge variant="secondary">DevOps Ready</Badge>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Automated Development Pipelines</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Automated Code Generation</h4>
                    <p className="text-sm text-muted-foreground">Generate boilerplate, tests, and documentation in CI</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <GitMerge className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Automated PR Optimization</h4>
                    <p className="text-sm text-muted-foreground">AI reviews and optimizes PRs before human review</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ArrowsClockwise className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Continuous Refactoring</h4>
                    <p className="text-sm text-muted-foreground">Scheduled AI-driven code quality improvements</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Automated Issue Resolution</h4>
                    <p className="text-sm text-muted-foreground">AI detects and fixes issues before they reach humans</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">🚀 Pipeline Velocity Example:</p>
              <p className="text-sm text-muted-foreground">
                GitHub Action triggers → Gemini CLI analyzes PR → Generates optimization suggestions → 
                Auto-applies safe improvements → Creates summary comment → 90% faster review cycle
              </p>
            </div>
          </div>

          {/* Rate Limit Velocity Optimization */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Rate Limit Optimization for Maximum Throughput</h3>
              <Badge variant="secondary">60 req/min</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Free Tier Strategy</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• 60 requests/minute burst</div>
                  <div>• 1,000 requests/day total</div>
                  <div>• Optimize for high-impact tasks</div>
                  <div>• Batch operations efficiently</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">API Key Scaling</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• 100 requests/day baseline</div>
                  <div>• Pay-per-use scaling</div>
                  <div>• Higher burst rates available</div>
                  <div>• Model selection control</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Enterprise Vertex AI</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Unlimited rate scaling</div>
                  <div>• Enterprise security</div>
                  <div>• Custom model access</div>
                  <div>• Advanced billing controls</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Velocity Optimization Tips</h4>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>• Use 1M token context to reduce round trips</li>
                <li>• Batch related operations in single requests</li>
                <li>• Leverage checkpointing for long-running tasks</li>
                <li>• Use non-interactive mode for automation</li>
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
              <span>Next: Cross-Team Collaboration</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
