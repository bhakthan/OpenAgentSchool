import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Users, Code, Lightning, ArrowSquareOut, ChartBar } from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
  navigateToTab?: (tabId: string) => void
}

export default function AISkillsFundamentals({ onNavigate, navigateToTab }: Props) {
  return (
    <div className="space-y-6">
      {/* What are AI-Native Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            What are AI-Native Practices?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg leading-relaxed">
            AI-Native practices represent a fundamental shift from using AI as a tool to restructuring 
            entire workflows around AI's unique capabilities. These practices emerged from organizations 
            like OpenAI and Anthropic that have deeply integrated AI into their development processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Traditional Approach</h3>
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>AI as an occasional helper tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Human-centric workflows with AI assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Sequential, single-purpose interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span>Context switching between AI and manual work</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">AI-Native Approach</h3>
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span>AI as autonomous collaborative partner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span>AI-centric workflows with human oversight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span>Continuous, multi-step AI workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span>Seamless human-AI collaboration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Principles */}
      <Card>
        <CardHeader>
          <CardTitle>Core AI-Native Principles</CardTitle>
          <CardDescription>
            Fundamental principles that guide AI-native organizational transformation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold">Autonomous Collaboration</h4>
              <p className="text-sm text-muted-foreground">
                AI agents work independently with minimal human oversight, making decisions and taking actions
              </p>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold">Cross-Functional Enablement</h4>
              <p className="text-sm text-muted-foreground">
                Non-technical teams directly execute technical tasks through AI interfaces
              </p>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold">Context Persistence</h4>
              <p className="text-sm text-muted-foreground">
                AI maintains long-term memory and context across sessions and tasks
              </p>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Lightning className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold">Parallel Processing</h4>
              <p className="text-sm text-muted-foreground">
                Multiple AI workflows run simultaneously with coordinated outcomes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Leaders Setting the Standard</CardTitle>
          <CardDescription>
            How OpenAI and Anthropic are pioneering AI-native organizational practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">OpenAI Codex</h3>
                  <p className="text-sm text-muted-foreground">Augmenting engineering velocity and creativity</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">Ask Mode Bug Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">Stack Trace Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">AGENTS.md Personalization</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Focus on developer productivity through intelligent code understanding, 
                automated refactoring, and seamless workflow integration.
              </p>

              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/posts/openai-for-business_how-openai-uses-codex-ugcPost-7357104973643468801-XCro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>How OpenAI uses Codex</span>
                  <ArrowSquareOut className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Anthropic Claude Code</h3>
                  <p className="text-sm text-muted-foreground">Revolutionizing cross-functional workflows</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">Screenshot-based Debugging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">70% AI Feature Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Novel Practice</Badge>
                  <span className="text-sm">Non-Coder Workflow Execution</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Emphasis on cross-team empowerment, autonomous development, 
                and breaking down technical barriers for all departments.
              </p>

              <div className="pt-2">
                <a
                  href="https://www.anthropic.com/news/how-anthropic-teams-use-claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>How Anthropic uses Claude Code</span>
                  <ArrowSquareOut className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Visualizations Notice */}
      <Card className="border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ChartBar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Ready to Explore?</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 max-w-lg mx-auto">
                Now that you understand the fundamentals, dive into interactive visualizations that show 
                exactly how OpenAI and Anthropic implement these practices in their organizations.
              </p>
            </div>
            {navigateToTab && (
              <Button 
                onClick={() => navigateToTab("interactive-visualizations")} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explore Interactive Visualizations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with AI-Native Practices</CardTitle>
          <CardDescription>
            Essential steps to begin your AI-native transformation journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Mindset Shift</h4>
                <p className="text-sm text-muted-foreground">
                  Move from "AI as tool" to "AI as collaborative partner" - design workflows around AI capabilities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Start Small</h4>
                <p className="text-sm text-muted-foreground">
                  Begin with single-task automation, then gradually expand to multi-step workflows
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Build Context Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Implement memory and context persistence (like AGENTS.md) for consistent AI behavior
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">4</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Enable Cross-Team Access</h4>
                <p className="text-sm text-muted-foreground">
                  Create interfaces that allow non-technical teams to execute technical tasks safely
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full" size="lg" onClick={onNavigate}>
              <span>Continue to Code Understanding Skills</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
