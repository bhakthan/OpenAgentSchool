import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MagnifyingGlass, 
  Bug, 
  ArrowsOut, 
  File, 
  Camera,
  ArrowRight,
  Star
} from "@phosphor-icons/react"

interface Props {
  onNavigate: () => void
}

export default function CodeUnderstandingSkills({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-xl">Revolutionary Code Understanding & Navigation</CardTitle>
          <CardDescription className="text-base">
            AI-native methods that fundamentally change how developers understand, debug, and navigate codebases
          </CardDescription>
        </CardHeader>
      </Card>

      {/* OpenAI Codex Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <CardTitle>OpenAI Codex: Code Understanding Mastery</CardTitle>
              <CardDescription>Navigate unfamiliar code for onboarding and incident response</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ask Mode Bug Detection */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Ask Mode Bug Detection</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Manual code reading line by line</li>
                  <li>• grep/search for similar patterns</li>
                  <li>• Ask team members about unfamiliar code</li>
                  <li>• Trial and error debugging</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Query across multiple files simultaneously</li>
                  <li>• Semantic understanding of bug patterns</li>
                  <li>• Find bugs in multiple places systematically</li>
                  <li>• Context-aware pattern recognition</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Real-World Impact</h4>
              <p className="text-sm text-muted-foreground">
                "Instead of spending hours tracing through code manually, Ask Mode helps us find 
                similar bug patterns across our entire codebase in minutes, significantly reducing 
                debugging time and preventing recurring issues."
              </p>
            </div>
          </div>

          {/* Stack Trace Navigation */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Stack Trace Navigation</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Copy stack trace manually</li>
                  <li>• Search for file names individually</li>
                  <li>• Navigate to line numbers manually</li>
                  <li>• Lose context during navigation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Jump directly from error to relevant code</li>
                  <li>• Maintain context throughout navigation</li>
                  <li>• Understand error patterns across files</li>
                  <li>• Automatic "jump to file" functionality</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
{`// Example: Stack trace to code navigation
Error: TypeError: Cannot read property 'length' of undefined
    at processArray (utils/dataProcessor.js:23:15)
    at handleRequest (controllers/apiController.js:45:12)
    
→ AI instantly navigates to:
   utils/dataProcessor.js:23 with full context
   + Related function calls
   + Similar error patterns
   + Suggested fixes`}
              </pre>
            </div>
          </div>

          {/* Cross-Language LLM Search */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Cross-Language LLM Search</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• grep for exact string matches</li>
                  <li>• Language-specific search tools</li>
                  <li>• Limited to keyword matching</li>
                  <li>• Separate searches for each language</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Semantic understanding across languages</li>
                  <li>• Find similar concepts, not just keywords</li>
                  <li>• Universal search across Terraform, Python, etc.</li>
                  <li>• Context-aware pattern matching</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Use Cases</h4>
              <ul className="space-y-1 text-sm">
                <li>• Terraform and Python search across repositories</li>
                <li>• Find authentication patterns across microservices</li>
                <li>• Locate data flow implementations regardless of language</li>
                <li>• Identify security patterns across the entire stack</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anthropic Claude Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <CardTitle>Anthropic Claude: Visual & Context-Rich Understanding</CardTitle>
              <CardDescription>Revolutionary approaches to infrastructure and system comprehension</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Screenshot-based Debugging */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Screenshot-Based Kubernetes Diagnosis</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• CLI commands and terminal output</li>
                  <li>• Reading logs line by line</li>
                  <li>• Requires Kubernetes expertise</li>
                  <li>• Text-only interfaces</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Screenshot dashboard interfaces</li>
                  <li>• Visual debugging without CLI expertise</li>
                  <li>• Accessible to non-technical teams</li>
                  <li>• Instant visual pattern recognition</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Revolutionary Impact</h4>
              <p className="text-sm text-muted-foreground">
                "Finance teams can now debug Kubernetes issues by taking screenshots of monitoring 
                dashboards. Claude analyzes the visual patterns and provides actionable insights 
                without requiring terminal access or Kubernetes knowledge."
              </p>
            </div>
          </div>

          {/* Parallel Memory Sessions */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Parallel Sessions with Memory</h3>
              <Badge variant="secondary">Novel Practice</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Multiple concurrent workstreams with context retention across sessions, 
              enabling complex multi-threaded debugging and analysis workflows.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Session A</h4>
                <p className="text-sm text-muted-foreground">
                  Database performance analysis with persistent context
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Session B</h4>
                <p className="text-sm text-muted-foreground">
                  Frontend bug investigation with UI screenshots
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Session C</h4>
                <p className="text-sm text-muted-foreground">
                  Infrastructure monitoring and alerting review
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementing Code Understanding Skills</CardTitle>
          <CardDescription>
            Step-by-step guide to adopting these revolutionary practices in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Getting Started</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Set Up AI Code Assistant</h4>
                    <p className="text-sm text-muted-foreground">Configure GitHub Copilot, Codex, or Claude with your codebase access</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Practice Ask Mode Queries</h4>
                    <p className="text-sm text-muted-foreground">Start with simple bug pattern searches</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Implement Stack Trace Integration</h4>
                    <p className="text-sm text-muted-foreground">Connect error reporting to AI navigation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Advanced Techniques</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Screenshot Debugging</h4>
                    <p className="text-sm text-muted-foreground">Train AI to read dashboard screenshots</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ArrowsOut className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Parallel Session Management</h4>
                    <p className="text-sm text-muted-foreground">Set up multiple AI contexts for complex debugging</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <MagnifyingGlass className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cross-Language Search</h4>
                    <p className="text-sm text-muted-foreground">Implement semantic search across all codebases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Copilot Agent Mode */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <div>
              <CardTitle>GitHub Copilot Agent Mode: Autonomous Code Understanding</CardTitle>
              <CardDescription>Multi-step autonomous coding tasks with contextual workspace awareness</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Autonomous Workspace Analysis */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Autonomous Workspace Analysis</h3>
              <Badge variant="secondary">Agent Mode</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional Method</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Manual file exploration and reading</li>
                  <li>• Linear debugging process</li>
                  <li>• Single-task focus without context</li>
                  <li>• Manual test execution and compilation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">AI-Native Agent Mode</h4>
                <ul className="space-y-2 text-sm">
                  <li>• AI autonomously determines relevant files and context</li>
                  <li>• Iterative analysis with automatic error correction</li>
                  <li>• Multi-step task orchestration with workspace understanding</li>
                  <li>• Automatic compilation, testing, and package installation</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Example Agent Mode Workflow:</p>
              <p className="text-sm text-muted-foreground">
                "Analyze this codebase for security vulnerabilities and create a migration plan to modern framework"
                → Agent autonomously reads files, identifies patterns, runs security tools, creates documentation, and tests changes.
              </p>
            </div>
          </div>

          {/* Multi-Tool Integration */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Multi-Tool Orchestration</h3>
              <Badge variant="secondary">Advanced</Badge>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agent mode coordinates multiple tools autonomously to complete complex tasks:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Workspace Tools</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">📁 Workspace search and file discovery</div>
                    <div className="p-2 bg-muted rounded">📖 Smart file reading with context</div>
                    <div className="p-2 bg-muted rounded">✏️ Multi-file editing and refactoring</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Development Tools</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">⚡ Terminal command execution</div>
                    <div className="p-2 bg-muted rounded">🐛 Compile and lint error monitoring</div>
                    <div className="p-2 bg-muted rounded">🔄 Automatic error correction loops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Agent Capabilities */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Autonomous Development Workflows</h3>
              <Badge variant="secondary">Game-Changing</Badge>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Agent Mode Capabilities</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <File className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cross-File Refactoring</h4>
                    <p className="text-sm text-muted-foreground">Autonomously identify and refactor patterns across multiple files</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Bug className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Error-Driven Development</h4>
                    <p className="text-sm text-muted-foreground">Monitor compilation/lint errors and auto-correct iteratively</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <MagnifyingGlass className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Contextual Code Analysis</h4>
                    <p className="text-sm text-muted-foreground">Answer complex codebase questions with autonomous investigation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ArrowsOut className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Test-Driven Iteration</h4>
                    <p className="text-sm text-muted-foreground">Write tests, run them, and iterate based on results automatically</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-muted-foreground">
                Use agent mode for open-ended tasks like "create a new feature", "migrate to new framework", or "analyze security issues". 
                Use regular edits mode for well-defined, scoped changes.
              </p>
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
              <CardTitle>Google Gemini CLI: Open-Source Terminal Agent</CardTitle>
              <CardDescription>1M token context autonomous AI agent with built-in tools and MCP extensibility</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Terminal-First Agent */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Terminal-Native AI Agent</h3>
              <Badge variant="secondary">Apache 2.0</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Traditional CLI Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Command-specific utilities</li>
                  <li>• Manual process orchestration</li>
                  <li>• Limited context understanding</li>
                  <li>• Separate tools for different tasks</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Gemini CLI Agent</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 1M token context window for deep understanding</li>
                  <li>• Autonomous multi-step task execution</li>
                  <li>• Built-in Google Search grounding</li>
                  <li>• Integrated file operations and shell commands</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Installation & Usage:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">npx https://github.com/google-gemini/gemini-cli</code> - Run instantly</div>
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">npm install -g @google/gemini-cli</code> - Global install</div>
                <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">brew install gemini-cli</code> - macOS/Linux</div>
              </div>
            </div>
          </div>

          {/* Built-in Tools Ecosystem */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Built-in Tools Ecosystem</h3>
              <Badge variant="secondary">Tool-Rich</Badge>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Gemini CLI includes comprehensive built-in tools for complete development workflows:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Core Operations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">📁 File system operations (read, write, edit)</div>
                    <div className="p-2 bg-muted rounded">💻 Shell command execution</div>
                    <div className="p-2 bg-muted rounded">🔍 Multi-file operations and search</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Advanced Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">🌐 Web fetch and Google Search</div>
                    <div className="p-2 bg-muted rounded">💾 Memory management across sessions</div>
                    <div className="p-2 bg-muted rounded">🔐 Sandboxed execution environment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MCP Integration & Extensibility */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">MCP Server Integration</h3>
              <Badge variant="secondary">Extensible</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Model Context Protocol (MCP) support enables custom tool integration:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Custom Integrations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>@github - Pull request management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>@slack - Team communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>@database - SQL queries and analysis</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Transport Mechanisms</h4>
                  <div className="space-y-2 text-sm">
                    <div>• Stdio Transport - subprocess communication</div>
                    <div>• SSE Transport - Server-Sent Events</div>
                    <div>• HTTP Streaming - real-time data flow</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Example MCP Usage:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">@github List my open pull requests</code></div>
                  <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">@slack Send summary to #dev channel</code></div>
                  <div>• <code className="bg-white dark:bg-gray-800 px-1 rounded">@database Find inactive users</code></div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication & Rate Limits */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Free Tier & Authentication</h3>
              <Badge variant="secondary">Developer-Friendly</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Personal Google Account</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• 60 requests/minute</div>
                  <div>• 1,000 requests/day</div>
                  <div>• Free tier access</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Gemini API Key</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• 100 requests/day</div>
                  <div>• Model selection control</div>
                  <div>• Usage-based billing</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Vertex AI Enterprise</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Higher rate limits</div>
                  <div>• Enterprise security</div>
                  <div>• Google Cloud integration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Workflow Capabilities */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Advanced Development Workflows</h3>
              <Badge variant="secondary">Professional</Badge>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Enterprise Features</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <File className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Checkpointing</h4>
                    <p className="text-sm text-muted-foreground">Save and resume complex development sessions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <MagnifyingGlass className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">GEMINI.md Context Files</h4>
                    <p className="text-sm text-muted-foreground">Project-specific AI behavior customization</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ArrowsOut className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Multi-Directory Support</h4>
                    <p className="text-sm text-muted-foreground">Include multiple directories in workspace context</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Bug className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sandboxed Execution</h4>
                    <p className="text-sm text-muted-foreground">Docker/Podman security isolation for tool execution</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">🚀 Professional Workflow Example:</p>
              <p className="text-sm text-muted-foreground">
                "Analyze this multi-repo codebase for security issues, create fixes, run tests in sandbox, 
                and generate documentation" → Gemini CLI autonomously coordinates across directories, 
                executes tools securely, and maintains context throughout the complex workflow.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full" size="lg" onClick={onNavigate}>
              <span>Continue to Development Velocity Skills</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
