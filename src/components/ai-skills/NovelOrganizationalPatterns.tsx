import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Brain, 
  Users, 
  Target,
  Lightning,
  ArrowRight,
  TrendUp,
  Sparkle,
  Crown,
  Atom,
  Network,
  Shield
} from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

export default function NovelOrganizationalPatterns({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 border-violet-200 dark:border-violet-800">
        <CardHeader>
          <CardTitle className="text-xl">Revolutionary Organizational Patterns</CardTitle>
          <CardDescription className="text-base">
            Expert-level practices that are fundamentally reshaping how companies operate with AI
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Revolutionary Pattern Overview */}
      <Card>
        <CardHeader>
          <CardTitle>The Organizational Revolution</CardTitle>
          <CardDescription>
            Unprecedented patterns emerging from AI-first companies that challenge traditional business structures
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Crown className="w-8 h-8 mx-auto text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-semibold">AI-First Hierarchies</h3>
              <p className="text-sm text-muted-foreground">New management structures</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Atom className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold">Capability Fusion</h3>
              <p className="text-sm text-muted-foreground">Role boundary dissolution</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Network className="w-8 h-8 mx-auto text-green-600 dark:text-green-400" />
              <h3 className="font-semibold">Autonomous Networks</h3>
              <p className="text-sm text-muted-foreground">Self-organizing AI teams</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Lightning className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold">Instant Scaling</h3>
              <p className="text-sm text-muted-foreground">Real-time capability expansion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OpenAI's Revolutionary Patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <CardTitle>OpenAI's Unprecedented Organizational Innovations</CardTitle>
              <CardDescription>Revolutionary patterns that are breaking traditional business paradigms</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI-Enhanced Decision Making */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">AI-Enhanced Strategic Decision Making</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Leadership teams augmented with AI for real-time strategic analysis and decision acceleration,
              enabling complex strategic decisions in minutes instead of months.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Traditional Strategic Process</h4>
                <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
                  <li>• Weeks of data gathering</li>
                  <li>• Multiple committee reviews</li>
                  <li>• Consultant reports</li>
                  <li>• Lengthy stakeholder alignment</li>
                  <li>• 3-6 month decision cycles</li>
                </ul>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">AI-Enhanced Process</h4>
                <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                  <li>• Real-time data synthesis</li>
                  <li>• AI scenario modeling</li>
                  <li>• Instant impact analysis</li>
                  <li>• Automated stakeholder prep</li>
                  <li>• Same-day strategic decisions</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Revolutionary Impact</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                "We're making strategic pivots in real-time based on market changes. Our competitive response time 
                has gone from quarters to hours. AI doesn't just help us think faster—it helps us think better."
              </p>
            </div>
          </div>

          {/* Autonomous Product Development */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Autonomous Product Development Teams</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Self-organizing product teams that use AI to coordinate development, testing, and deployment
              without traditional project management oversight.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">AI Project Coordination</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Autonomous sprint planning</li>
                  <li>• Real-time dependency resolution</li>
                  <li>• Predictive bottleneck detection</li>
                  <li>• Self-optimizing workflows</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Intelligent Quality Gates</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Autonomous testing strategies</li>
                  <li>• AI-driven code review</li>
                  <li>• Predictive failure detection</li>
                  <li>• Self-healing deployments</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Market-Responsive Development</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Real-time user feedback integration</li>
                  <li>• Autonomous feature prioritization</li>
                  <li>• Market trend adaptation</li>
                  <li>• Competitive response automation</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3x</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Faster Releases</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Less Management Overhead</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Autonomous Operation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Competitive Intelligence */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Real-Time Competitive Intelligence Networks</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              AI-powered competitive intelligence that enables instant market response and
              strategic positioning adjustments in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Autonomous Intelligence Gathering</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Continuous competitor monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Patent filing analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Job posting intelligence</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Technology trend detection</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Instant Strategic Response</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Automated threat assessment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Response strategy generation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Resource reallocation triggers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Competitive positioning updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anthropic's Revolutionary Patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <CardTitle>Anthropic's Radical Organizational Experiments</CardTitle>
              <CardDescription>Cutting-edge patterns pushing the boundaries of traditional business models</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fluid Role Architecture */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Fluid Role Architecture</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Dynamic role definitions that adapt in real-time based on project needs and individual AI-enhanced capabilities,
              completely eliminating traditional job boundaries.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Structure</h4>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-500 bg-red-100 dark:bg-red-900">
                    <h5 className="font-semibold">Fixed Roles</h5>
                    <p className="text-sm text-muted-foreground">Engineer, Designer, PM, QA</p>
                  </div>
                  <div className="p-3 border-l-4 border-red-500 bg-red-100 dark:bg-red-900">
                    <h5 className="font-semibold">Static Responsibilities</h5>
                    <p className="text-sm text-muted-foreground">Rigid job descriptions</p>
                  </div>
                  <div className="p-3 border-l-4 border-red-500 bg-red-100 dark:bg-red-900">
                    <h5 className="font-semibold">Hierarchical Reporting</h5>
                    <p className="text-sm text-muted-foreground">Fixed management chains</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Fluid Architecture</h4>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-green-500 bg-green-100 dark:bg-green-900">
                    <h5 className="font-semibold">Capability Clusters</h5>
                    <p className="text-sm text-muted-foreground">AI-enhanced skill combinations</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-100 dark:bg-green-900">
                    <h5 className="font-semibold">Dynamic Allocation</h5>
                    <p className="text-sm text-muted-foreground">Real-time role evolution</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-100 dark:bg-green-900">
                    <h5 className="font-semibold">Context-Driven Authority</h5>
                    <p className="text-sm text-muted-foreground">Expertise-based leadership</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Real Example</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                "Sarah started the day as a UX designer, pivoted to data analysis for a critical insight at noon, 
                led a technical architecture discussion in the afternoon, and finished by managing a cross-functional sprint. 
                Her AI tools adapted to each context, making her equally effective in all roles."
              </p>
            </div>
          </div>

          {/* Continuous Organizational Learning */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Continuous Organizational Learning</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              AI-powered organizational evolution that continuously optimizes team structures, processes, 
              and decision-making patterns based on real-time performance data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Pattern Recognition</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Communication bottlenecks</li>
                  <li>• Decision delays</li>
                  <li>• Collaboration friction</li>
                  <li>• Productivity patterns</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Adaptive Restructuring</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Team composition optimization</li>
                  <li>• Process refinement</li>
                  <li>• Authority redistribution</li>
                  <li>• Workflow evolution</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Performance Acceleration</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Predictive scaling</li>
                  <li>• Preemptive solutions</li>
                  <li>• Continuous optimization</li>
                  <li>• Learning acceleration</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2x</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Quarterly Performance Improvement</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Real-time</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Organizational Adaptation</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Human Symbiotic Teams */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">AI-Human Symbiotic Teams</h3>
              <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">Revolutionary</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Integrated teams where AI agents are formal team members with defined roles, responsibilities, 
              and decision-making authority alongside human colleagues.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">AI Team Members</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Research AI</h5>
                    <p className="text-sm text-muted-foreground">
                      Autonomous competitive analysis and market research
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Strategy AI</h5>
                    <p className="text-sm text-muted-foreground">
                      Long-term planning and scenario modeling
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Execution AI</h5>
                    <p className="text-sm text-muted-foreground">
                      Project coordination and delivery management
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Human-AI Collaboration</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Shared Decision Authority</h5>
                    <p className="text-sm text-muted-foreground">
                      AI agents vote on strategic decisions
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Complementary Strengths</h5>
                    <p className="text-sm text-muted-foreground">
                      AI precision + human creativity
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Continuous Learning</h5>
                    <p className="text-sm text-muted-foreground">
                      Both AI and humans evolve together
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Framework */}
      <Card>
        <CardHeader>
          <CardTitle>Adopting Revolutionary Organizational Patterns</CardTitle>
          <CardDescription>
            Strategic framework for implementing next-generation organizational structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transformation Prerequisites</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cultural Readiness</h4>
                    <p className="text-sm text-muted-foreground">Organization prepared for radical change</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Brain className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">AI Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">Enterprise-grade AI capabilities</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Leadership Commitment</h4>
                    <p className="text-sm text-muted-foreground">Executive sponsorship for experimentation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Implementation Strategy</h3>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Pilot Programs</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with small, isolated teams for pattern validation
                  </p>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Gradual Scaling</h4>
                  <p className="text-sm text-muted-foreground">
                    Expand successful patterns across organization
                  </p>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Continuous Measurement</h4>
                  <p className="text-sm text-muted-foreground">
                    Data-driven validation of organizational improvements
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
              <h3 className="text-lg font-semibold mb-3">Ready to Transform Your Organization?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These revolutionary patterns represent the cutting edge of organizational evolution. 
                Implementation requires careful planning, cultural preparation, and iterative experimentation.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Continue exploring the AI-Native Skills learning path to build your foundation for implementing these advanced patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
