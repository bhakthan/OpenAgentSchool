import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  PaintBrush, 
  Calculator, 
  Shield,
  Star,
  ArrowRight,
  TrendUp,
  Scales
} from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

export default function CrossTeamCollaborationSkills({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="text-xl">Breaking Down Technical Barriers</CardTitle>
          <CardDescription className="text-base">
            Revolutionary practices enabling non-technical teams to execute technical tasks autonomously
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Cross-Team Empowerment Overview */}
      <Card>
        <CardHeader>
          <CardTitle>The Cross-Functional Revolution</CardTitle>
          <CardDescription>
            How AI is eliminating traditional technical dependencies across departments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center space-y-2">
              <PaintBrush className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold">Design Teams</h3>
              <p className="text-sm text-muted-foreground">Managing state code changes directly</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <TrendUp className="w-8 h-8 mx-auto text-green-600 dark:text-green-400" />
              <h3 className="font-semibold">Marketing Teams</h3>
              <p className="text-sm text-muted-foreground">10x output with 1-person teams</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Calculator className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold">Finance Teams</h3>
              <p className="text-sm text-muted-foreground">Plain text workflow execution</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Scales className="w-8 h-8 mx-auto text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold">Legal Teams</h3>
              <p className="text-sm text-muted-foreground">Technical prototyping without engineers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anthropic's Cross-Team Innovations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <CardTitle>Anthropic's Cross-Functional Breakthroughs</CardTitle>
              <CardDescription>Real-world examples of non-technical teams executing technical work</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Design Team Empowerment */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Designers Managing State Code Changes</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Workflow</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Designer creates mockups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Handoff to developer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Developer implements changes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Back-and-forth iterations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Lost context in translation</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Workflow</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Designer creates functional prototype</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Direct state code management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Real-time implementation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>No context loss</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Immediate user testing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Impact at Anthropic</h4>
              <p className="text-sm text-muted-foreground">
                "Our designers now implement their own design tweaks directly in the codebase. 
                They can see their changes live immediately and iterate without waiting for developer availability. 
                This has accelerated our design cycle by 10x."
              </p>
            </div>
          </div>

          {/* Marketing Team Revolution */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Marketing: 10x Output with 1-Person Teams</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Revolutionary use of AI sub-agents, persistent memory, and automated creative generation 
              to achieve enterprise-scale marketing output with minimal human resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Automated Sub-Agents</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Headlines generation at scale</li>
                  <li>• Description variants</li>
                  <li>• A/B testing coordination</li>
                  <li>• Performance analysis</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Persistent Memory</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Creative iteration loops</li>
                  <li>• Brand voice consistency</li>
                  <li>• Campaign learning retention</li>
                  <li>• Cross-campaign insights</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Visual Automation</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Figma plugin integration</li>
                  <li>• 100+ creatives per second</li>
                  <li>• Automated variations</li>
                  <li>• Format optimization</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Results</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">10x</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Campaign Output</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">1</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Person Team</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">100+</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Creatives/Second</div>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Team Technical Execution */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Finance: Plain Text Workflow Execution</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What Finance Teams Can Now Do</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm">Execute complex data analysis workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm">Automate financial reporting pipelines</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm">Deploy monitoring and alerting systems</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm">Manage database operations</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">How It Works</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <div className="mb-2 font-medium">Plain Text Instruction:</div>
                  <div className="text-muted-foreground italic mb-3">
                    "Create a weekly revenue report that pulls data from our sales database, 
                    calculates month-over-month growth, and sends it to the finance team every Monday morning."
                  </div>
                  <div className="font-medium text-green-600 dark:text-green-400">
                    ✓ AI translates to working automation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Team Innovation */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Legal: Technical Prototyping Without Engineers</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Real-World Applications</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Predictive Accessibility Tools</h5>
                    <p className="text-sm text-muted-foreground">
                      Custom speech prediction apps for personal use cases
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Internal Routing Tools</h5>
                    <p className="text-sm text-muted-foreground">
                      Lawyer routing and case management systems
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">G Suite Automation</h5>
                    <p className="text-sm text-muted-foreground">
                      Workflow automation for legal processes
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Validation Process</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium">AI Prototyping</h5>
                      <p className="text-sm text-muted-foreground">Two-step brainstorming-to-build pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Expert Review</h5>
                      <p className="text-sm text-muted-foreground">External validation (e.g., UCSF experts)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Implementation</h5>
                      <p className="text-sm text-muted-foreground">Production deployment without engineering team</p>
                    </div>
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
          <CardTitle>Enabling Cross-Team Technical Capabilities</CardTitle>
          <CardDescription>
            Framework for empowering non-technical teams with AI-native technical execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Foundation Requirements</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Safe Execution Environment</h4>
                    <p className="text-sm text-muted-foreground">Sandboxed AI execution with proper guardrails</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Plain Language Interfaces</h4>
                    <p className="text-sm text-muted-foreground">Natural language to technical execution bridges</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <TrendUp className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Memory & Context Systems</h4>
                    <p className="text-sm text-muted-foreground">Persistent AI behavior tailored to each team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Success Enablers</h3>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Quality Gates</h4>
                  <p className="text-sm text-muted-foreground">
                    Automated validation ensures non-technical teams can't break systems
                  </p>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Expert Validation Loops</h4>
                  <p className="text-sm text-muted-foreground">
                    External expert review for critical implementations
                  </p>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Rollback Mechanisms</h4>
                  <p className="text-sm text-muted-foreground">
                    Safe experimentation with easy recovery options
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full" size="lg" onClick={onNavigate}>
              <span>Continue to Novel Organizational Patterns</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
