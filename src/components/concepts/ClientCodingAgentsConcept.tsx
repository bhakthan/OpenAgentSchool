import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "../references/ReferenceSection"
import { Terminal, Code, GithubLogo, Lightning, CloudArrowUp, Robot, Command, BookOpen, ArrowsClockwise, Key, Sparkle, Plugs } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

interface ClientCodingAgentsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function ClientCodingAgentsConcept({ onMarkComplete, onNavigateToNext }: ClientCodingAgentsConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('client-coding-agents');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    {
      id: 'overview',
      title: 'CLI Agents Overview',
      description: 'The shift from IDE vibe-coding to terminal-native agents',
      icon: <Terminal className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                The Rise of CLI Coding Agents (2026)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                CLI (Command Line Interface) Coding Agents represent a paradigm shift from the 2025 era of 
                "vibe coding" in IDEs. These terminal-native agents bring agentic AI directly to your 
                command line, enabling developers to build, debug, and understand code through natural 
                language conversations while maintaining full control over their workflow.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-200">Why CLI Agents in 2026?</h4>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Terminal-first:</strong> Meet developers where they already work—no context switching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Hybrid local+cloud:</strong> Long-running autonomous tasks with local control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Scriptable & composable:</strong> Unix philosophy—pipe, chain, automate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>MCP-powered:</strong> Extensible via Model Context Protocol servers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* The Four Providers */}
          <Card>
            <CardHeader>
              <CardTitle>The Four Major CLI Coding Agents</CardTitle>
              <CardDescription>Each with distinct strengths, all sharing core CLI-native patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub Copilot CLI */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <GithubLogo className="w-5 h-5" />
                    <h5 className="font-semibold">GitHub Copilot CLI</h5>
                    <Badge variant="secondary" className="text-xs">GitHub Native</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deep GitHub integration, agentic harness powered by Copilot coding agent. 
                    Honors AGENTS.md, CLAUDE.md, GEMINI.md for context.
                  </p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">brew install copilot-cli</code>
                </div>

                {/* Claude Code */}
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4 hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Robot className="w-5 h-5 text-amber-600" />
                    <h5 className="font-semibold">Claude Code</h5>
                    <Badge variant="secondary" className="text-xs">Anthropic</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Agentic coding in your terminal. Plan Mode, subagents, skills system, 
                    hooks, and sandboxed execution. CLAUDE.md for persistent context.
                  </p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">curl -fsSL https://claude.ai/install.sh | bash</code>
                </div>

                {/* OpenAI Codex CLI */}
                <div className="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-semibold">OpenAI Codex CLI</h5>
                    <Badge variant="secondary" className="text-xs">OpenAI</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Open-source, built in Rust for speed. Web search, image inputs, 
                    approval modes, and Azure OpenAI integration. AGENTS.md support.
                  </p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">npm i -g @openai/codex</code>
                </div>

                {/* Gemini CLI */}
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightning className="w-5 h-5 text-blue-600" />
                    <h5 className="font-semibold">Gemini CLI</h5>
                    <Badge variant="secondary" className="text-xs">Google</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Open-source (Apache 2.0), 1M token context, Google Search grounding, 
                    built-in tools, MCP support. GEMINI.md for project context.
                  </p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">npm install -g @google/gemini-cli</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3">Feature</th>
                      <th className="text-center py-2 px-3">Copilot CLI</th>
                      <th className="text-center py-2 px-3">Claude Code</th>
                      <th className="text-center py-2 px-3">Codex CLI</th>
                      <th className="text-center py-2 px-3">Gemini CLI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 px-3 font-medium">License</td>
                      <td className="text-center py-2 px-3">Proprietary</td>
                      <td className="text-center py-2 px-3">Proprietary</td>
                      <td className="text-center py-2 px-3">Open Source</td>
                      <td className="text-center py-2 px-3">Apache 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Context File</td>
                      <td className="text-center py-2 px-3">AGENTS.md</td>
                      <td className="text-center py-2 px-3">CLAUDE.md</td>
                      <td className="text-center py-2 px-3">AGENTS.md</td>
                      <td className="text-center py-2 px-3">GEMINI.md</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">MCP Support</td>
                      <td className="text-center py-2 px-3">✅ Built-in</td>
                      <td className="text-center py-2 px-3">✅ Full</td>
                      <td className="text-center py-2 px-3">✅ Full</td>
                      <td className="text-center py-2 px-3">✅ Full</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Skills System</td>
                      <td className="text-center py-2 px-3">✅ SKILL.md</td>
                      <td className="text-center py-2 px-3">✅ SKILL.md</td>
                      <td className="text-center py-2 px-3">⏳ Planned</td>
                      <td className="text-center py-2 px-3">✅ Skills</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Sandboxing</td>
                      <td className="text-center py-2 px-3">⚠️ Limited</td>
                      <td className="text-center py-2 px-3">✅ OS-level</td>
                      <td className="text-center py-2 px-3">⚠️ WSL rec.</td>
                      <td className="text-center py-2 px-3">⚠️ Manual</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Free Tier</td>
                      <td className="text-center py-2 px-3">❌ Subscription</td>
                      <td className="text-center py-2 px-3">❌ Pro/Max</td>
                      <td className="text-center py-2 px-3">✅ Plus plan</td>
                      <td className="text-center py-2 px-3">✅ 1000 req/day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" />

          <EnlightenMeButton
            title="CLI Coding Agents Overview"
            contextDescription="Understanding the shift to terminal-native AI coding agents"
          />
        </div>
      )
    },
    {
      id: 'copilot-cli',
      title: 'GitHub Copilot CLI',
      description: 'GitHub-native coding agent in your terminal',
      icon: <GithubLogo className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GithubLogo className="w-5 h-5" />
                GitHub Copilot CLI
              </CardTitle>
              <CardDescription>
                The power of GitHub Copilot coding agent directly in your terminal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                GitHub Copilot CLI brings the agentic harness powering GitHub's Copilot coding agent 
                to your command line. It provides terminal-native development with deep GitHub 
                integration—access repositories, issues, and pull requests using natural language.
              </p>

              {/* Installation */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Windows (WinGet):</span>
                    <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded mt-1 text-sm overflow-x-auto">
                      <code>winget install GitHub.Copilot</code>
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">macOS/Linux (Homebrew):</span>
                    <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded mt-1 text-sm overflow-x-auto">
                      <code>brew install copilot-cli</code>
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">npm (cross-platform):</span>
                    <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded mt-1 text-sm overflow-x-auto">
                      <code>npm install -g @github/copilot</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔌 GitHub Integration</h5>
                  <p className="text-sm text-muted-foreground">
                    Ships with GitHub's MCP server by default. Access repos, issues, 
                    PRs with natural language.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🤖 Agentic Capabilities</h5>
                  <p className="text-sm text-muted-foreground">
                    Build, edit, debug, and refactor code with an AI that plans 
                    and executes complex tasks.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🛡️ Full Control</h5>
                  <p className="text-sm text-muted-foreground">
                    Preview every action before execution—nothing happens without 
                    your explicit approval.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📋 Context Files</h5>
                  <p className="text-sm text-muted-foreground">
                    Honors AGENTS.md, CLAUDE.md, and GEMINI.md for project context 
                    and instructions.
                  </p>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700 mt-4">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">💡 Pro Tips</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">/model</code> to switch between Claude Sonnet 4.5, Sonnet 4, and GPT-5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Build agentic memory using the SDK—see the GitHub blog on building memory systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">/feedback</code> from CLI to submit confidential feedback to GitHub</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* SDK & Advanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Copilot SDK: From CLI to Programmable Infrastructure
              </CardTitle>
              <CardDescription>
                Six production patterns every developer should know in 2026
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                The Copilot SDK transforms terminal AI into <strong>programmable infrastructure</strong>. 
                While the CLI is perfect for interactive sessions, the SDK enables building production 
                applications: chatbots, automation pipelines, and multi-agent systems that run reliably 
                at scale.
              </p>

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">CLI vs SDK: When to Use Each</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-blue-600 dark:text-blue-400">CLI (Interactive)</strong>
                    <ul className="mt-1 space-y-1 text-muted-foreground">
                      <li>• One-off coding tasks</li>
                      <li>• Exploratory development</li>
                      <li>• Quick prototyping</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-green-600 dark:text-green-400">SDK (Production)</strong>
                    <ul className="mt-1 space-y-1 text-muted-foreground">
                      <li>• Error handling & retries</li>
                      <li>• Session persistence</li>
                      <li>• Parallel orchestration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pattern 1: Error Handling */}
              <div className="border border-red-200 dark:border-red-800 rounded-lg overflow-hidden">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b border-red-200 dark:border-red-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-red-600">1.</span> Error Handling
                    <Badge variant="outline" className="text-xs">Production Essential</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Production apps need graceful failures, not crashes. The SDK provides structured 
                    error types, retry logic, and fallback patterns.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK_Error_Handling.jpg" 
                  alt="Error Handling pattern with try-catch, retries, and fallback strategies" 
                  className="w-full"
                />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-red-200 dark:border-red-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

# Context manager for automatic cleanup
with CopilotClient() as client:
    try:
        client.start()
        session = client.create_session(model="gpt-5")
        
        response = None
        def handle_message(event):
            nonlocal response
            if event["type"] == "assistant.message":
                response = event["data"]["content"]
        
        session.on(handle_message)
        session.send(prompt="Hello!")
        session.wait_for_idle()
        
    except FileNotFoundError:
        print("Copilot CLI not found. Install it first.")
    except ConnectionError:
        print("Could not connect to Copilot CLI server.")
    except TimeoutError:
        print("Request timed out")
    # client.stop() is called automatically`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Best practices:</strong> Always use try-finally or context managers to ensure cleanup. 
                    Handle connection errors gracefully. Set appropriate timeouts.
                  </p>
                </div>
              </div>

              {/* Pattern 2: Multiple Sessions */}
              <div className="border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-blue-600">2.</span> Multiple Sessions
                    <Badge variant="outline" className="text-xs">Model Comparison</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Run parallel AI conversations with different models. Compare Claude Sonnet vs GPT-5 
                    responses, or specialize sessions for different tasks.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK_Multiple_Sessions.jpg" 
                  alt="Multiple Sessions pattern showing parallel model conversations" 
                  className="w-full"
                />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

client = CopilotClient()
client.start()

# Create multiple independent sessions with different models
session1 = client.create_session(model="gpt-5")
session2 = client.create_session(model="gpt-5")
session3 = client.create_session(model="claude-sonnet-4.5")

# Each session maintains its own conversation history
session1.send(prompt="You are helping with a Python project")
session2.send(prompt="You are helping with a TypeScript project")
session3.send(prompt="You are helping with a Go project")

# Follow-up messages stay in their respective contexts
session1.send(prompt="How do I create a virtual environment?")
session2.send(prompt="How do I set up tsconfig?")
session3.send(prompt="How do I initialize a module?")

# Clean up all sessions
session1.destroy()
session2.destroy()
session3.destroy()
client.stop()`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Use cases:</strong> Multi-user applications (one session per user), multi-task workflows, 
                    A/B testing (compare responses from different models).
                  </p>
                </div>
              </div>

              {/* Pattern 3: File Management */}
              <div className="border border-green-200 dark:border-green-800 rounded-lg overflow-hidden">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 border-b border-green-200 dark:border-green-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-green-600">3.</span> File Management
                    <Badge variant="outline" className="text-xs">Semantic Organization</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Let AI organize files by content, not just names. The SDK enables intelligent 
                    file operations that understand context and relationships.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK_File_Management.jpg" 
                  alt="File Management pattern with AI-powered organization" 
                  className="w-full"
                />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-green-200 dark:border-green-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient
import os

client = CopilotClient()
client.start()
session = client.create_session(model="gpt-5")

# Event handler for real-time feedback
def handle_event(event):
    if event["type"] == "assistant.message":
        print(f"\\nCopilot: {event['data']['content']}")
    elif event["type"] == "tool.execution_start":
        print(f"  → Running: {event['data']['toolName']}")

session.on(handle_event)

# Ask Copilot to organize files semantically
target_folder = os.path.expanduser("~/Downloads")

session.send(prompt=f"""
Analyze the files in "{target_folder}" and organize them:

1. First, list all files and their metadata
2. Preview grouping by file extension
3. Create subfolders (e.g., "images", "documents", "videos")
4. Move each file to its appropriate subfolder

Please confirm before moving any files.
""")

session.wait_for_idle()
client.stop()`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Grouping strategies:</strong> By extension (images/documents/videos), 
                    by date (2024-01/, 2024-02/), by size (tiny/small/medium/large).
                  </p>
                </div>
              </div>

              {/* Pattern 4: PR Visualization */}
              <div className="border border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 border-b border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-purple-600">4.</span> PR Visualization
                    <Badge variant="outline" className="text-xs">GitHub MCP</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect to GitHub MCP, generate charts from live data. Visualize PR velocity, 
                    review bottlenecks, and contributor patterns.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK__PR_Visualization.jpg" 
                  alt="PR Visualization pattern with GitHub MCP integration" 
                  className="w-full"
                />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-purple-200 dark:border-purple-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient
import os

client = CopilotClient(log_level="error")
client.start()

owner, repo_name = "github", "copilot-sdk"

session = client.create_session(
    model="gpt-5",
    system_message={
        "content": f"""
<context>
Analyzing PRs for: {owner}/{repo_name}
Working directory: {os.getcwd()}
</context>
<instructions>
- Use GitHub MCP Server tools to fetch PR data
- Use file and code execution tools to generate charts
- Save generated images to current directory
</instructions>
"""
    }
)

def handle_event(event):
    if event["type"] == "assistant.message":
        print(f"🤖 {event['data']['content']}")
    elif event["type"] == "tool.execution_start":
        print(f"  ⚙️  {event['data']['toolName']}")

session.on(handle_event)

# Let Copilot fetch data and generate charts
session.send(prompt=f"""
Fetch open PRs for {owner}/{repo_name} from the last week.
Calculate age in days. Generate a bar chart showing PR age 
distribution. Save as "pr-age-chart.png".
""")`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>No custom tools needed:</strong> Copilot uses GitHub MCP Server, file tools, 
                    and code execution to fetch data and generate charts automatically.
                  </p>
                </div>
              </div>

              {/* Pattern 5: Session Persistence */}
              <div className="border border-amber-200 dark:border-amber-800 rounded-lg overflow-hidden">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 border-b border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-amber-600">5.</span> Session Persistence
                    <Badge variant="outline" className="text-xs">Chatbot Ready</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Save conversations, resume later. Build real chatbots with memory that persists 
                    across sessions and deployments.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK_Session_Persistence.jpg" 
                  alt="Session Persistence pattern for building chatbots with memory" 
                  className="w-full"
                />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-amber-200 dark:border-amber-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

# === First run: Create session ===
client = CopilotClient()
client.start()

# Create session with a memorable ID
session = client.create_session(
    session_id="user-123-conversation",
    model="gpt-5",
)

session.send(prompt="Let's discuss TypeScript generics")
session.destroy()  # Destroy but keep data on disk
client.stop()

# === Later: Resume session ===
client = CopilotClient()
client.start()

# Resume the previous session
session = client.resume_session("user-123-conversation")

# Previous context is restored!
session.send(prompt="What were we discussing?")

# Get full conversation history
messages = session.get_messages()
for msg in messages:
    print(f"[{msg['type']}] {msg['data']}")

# Clean up when done
client.delete_session("user-123-conversation")`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Best practices:</strong> Use meaningful session IDs (include user ID), 
                    check if session exists before resuming, periodically clean up old sessions.
                  </p>
                </div>
              </div>

              {/* Pattern 6: Parallel Multi-Stack */}
              <div className="border border-gradient-to-r from-pink-200 to-cyan-200 dark:from-pink-800 dark:to-cyan-800 rounded-lg overflow-hidden bg-gradient-to-r from-pink-50 to-cyan-50 dark:from-pink-900/20 dark:to-cyan-900/20">
                <div className="p-4 border-b border-pink-200 dark:border-pink-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">6.</span> Parallel Multi-Stack
                    <Badge className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">⚡ Showstopper</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The showstopper: orchestrate 3 sessions in parallel to build React + Python + Go 
                    simultaneously. <strong>3x speedup</strong> for polyglot projects.
                  </p>
                </div>
                <img 
                  src="/images/Github_Copilot_SDK_Parallel_Multi_Stack.jpg" 
                  alt="Parallel Multi-Stack pattern orchestrating React, Python, and Go" 
                  className="w-full"
                />
                
                {/* Visual Simulation: Sequential vs Parallel */}
                <div className="p-4 bg-white dark:bg-slate-950 border-t border-pink-200 dark:border-pink-800">
                  <h5 className="font-semibold text-sm mb-3">⏱️ Sequential vs Parallel Execution</h5>
                  
                  <div className="space-y-4">
                    {/* Sequential */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-red-600 dark:text-red-400 w-20">Sequential</span>
                        <span className="text-xs text-muted-foreground">~45 min total</span>
                      </div>
                      <div className="flex gap-1 h-8">
                        <div className="bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                          React 15m
                        </div>
                        <div className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                          Python 15m
                        </div>
                        <div className="bg-purple-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                          Go 15m
                        </div>
                      </div>
                    </div>
                    
                    {/* Parallel */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 w-20">Parallel</span>
                        <span className="text-xs text-muted-foreground">~15 min total (3x faster!)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-1 h-6">
                          <div className="bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                            React 15m
                          </div>
                        </div>
                        <div className="flex gap-1 h-6">
                          <div className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                            Python 15m
                          </div>
                        </div>
                        <div className="flex gap-1 h-6">
                          <div className="bg-purple-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{width: '33%'}}>
                            Go 15m
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Architecture Diagram */}
                  <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <h5 className="font-semibold text-xs mb-3 text-center">Architecture: Parallel Session Orchestration</h5>
                    <div className="flex flex-col items-center space-y-2">
                      {/* Orchestrator */}
                      <div className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                        🎭 Orchestrator (asyncio.gather)
                      </div>
                      
                      {/* Arrows down */}
                      <div className="flex justify-center gap-8 text-slate-400">
                        <span>↓</span>
                        <span>↓</span>
                        <span>↓</span>
                      </div>
                      
                      {/* Three sessions */}
                      <div className="flex gap-3 flex-wrap justify-center">
                        <div className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 p-3 rounded-lg text-center min-w-[100px]">
                          <div className="text-blue-600 dark:text-blue-400 text-lg mb-1">⚛️</div>
                          <div className="text-xs font-semibold">Session 1</div>
                          <div className="text-xs text-muted-foreground">React + TS</div>
                          <div className="text-xs text-blue-500 mt-1">claude-sonnet-4.5</div>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700 p-3 rounded-lg text-center min-w-[100px]">
                          <div className="text-green-600 dark:text-green-400 text-lg mb-1">🐍</div>
                          <div className="text-xs font-semibold">Session 2</div>
                          <div className="text-xs text-muted-foreground">Python API</div>
                          <div className="text-xs text-green-500 mt-1">gpt-5</div>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 p-3 rounded-lg text-center min-w-[100px]">
                          <div className="text-purple-600 dark:text-purple-400 text-lg mb-1">🔷</div>
                          <div className="text-xs font-semibold">Session 3</div>
                          <div className="text-xs text-muted-foreground">Go Service</div>
                          <div className="text-xs text-purple-500 mt-1">gpt-5</div>
                        </div>
                      </div>
                      
                      {/* Arrows down */}
                      <div className="flex justify-center gap-8 text-slate-400">
                        <span>↓</span>
                        <span>↓</span>
                        <span>↓</span>
                      </div>
                      
                      {/* Output */}
                      <div className="flex gap-3 flex-wrap justify-center">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs">dashboard.tsx</div>
                        <div className="bg-green-500 text-white px-3 py-1 rounded text-xs">auth_api.py</div>
                        <div className="bg-purple-500 text-white px-3 py-1 rounded text-xs">notifier.go</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-t border-pink-200 dark:border-pink-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto"><code>{`import asyncio
from copilot import CopilotClient

async def build_stack(session, stack_name: str, prompt: str):
    """Build a specific stack component"""
    print(f"🚀 Starting {stack_name}...")
    session.send(prompt=prompt)
    session.wait_for_idle()
    print(f"✅ {stack_name} complete!")

async def parallel_multi_stack():
    client = CopilotClient()
    client.start()
    
    # Create 3 specialized sessions - different models for different tasks
    react_session = client.create_session(model="claude-sonnet-4.5")
    python_session = client.create_session(model="gpt-5")
    go_session = client.create_session(model="gpt-5")
    
    # Run all 3 in parallel - 3x speedup!
    await asyncio.gather(
        build_stack(react_session, "React Frontend",
            "Create a React component with TypeScript for user dashboard"),
        build_stack(python_session, "Python API",
            "Create a FastAPI endpoint for user authentication"),
        build_stack(go_session, "Go Service",
            "Create a Go microservice for real-time notifications")
    )
    
    # Clean up
    react_session.destroy()
    python_session.destroy()
    go_session.destroy()
    client.stop()
    
asyncio.run(parallel_multi_stack())`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Why this works:</strong> Each session runs independently with its own context. 
                    Combine with session persistence to checkpoint progress. Use different models for 
                    tasks they excel at (Claude for React, GPT for Python/Go).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">github/copilot-sdk</Badge>
                <Badge variant="outline">Cookbook Examples</Badge>
                <Badge variant="outline">Memory Systems</Badge>
                <Badge variant="outline">Desktop Assistants</Badge>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="GitHub Copilot CLI"
            contextDescription="Deep dive into GitHub's terminal-native coding agent"
          />
        </div>
      )
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      description: 'Anthropic\'s agentic coding tool for your terminal',
      icon: <Robot className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="w-5 h-5 text-amber-600" />
                Claude Code
              </CardTitle>
              <CardDescription>
                Anthropic's agentic coding environment that lives in your terminal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Claude Code is an agentic coding environment. Unlike a chatbot that answers 
                questions and waits, Claude Code can read your files, run commands, make changes, 
                and autonomously work through problems while you watch, redirect, or step away entirely.
              </p>

              {/* Installation */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Get Started in 30 Seconds
                </h4>
                <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-sm overflow-x-auto">
                  <code>{`# macOS/Linux/WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Then start
cd your-project
claude`}</code>
                </pre>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🎯 Plan Mode</h5>
                  <p className="text-sm text-muted-foreground">
                    Separate research and planning from execution. Claude reads files 
                    and answers questions without making changes.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🤖 Subagents</h5>
                  <p className="text-sm text-muted-foreground">
                    Delegate research to subagents running in separate contexts. 
                    Keep your main conversation clean for implementation.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔧 Skills System</h5>
                  <p className="text-sm text-muted-foreground">
                    Create SKILL.md files in .claude/skills/ for domain knowledge 
                    and reusable workflows. Claude applies them automatically.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🪝 Hooks</h5>
                  <p className="text-sm text-muted-foreground">
                    Run scripts automatically at specific points. Unlike CLAUDE.md 
                    instructions which are advisory, hooks are deterministic.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔒 Sandboxing</h5>
                  <p className="text-sm text-muted-foreground">
                    OS-level isolation via /sandbox. Define upfront boundaries 
                    rather than bypassing all checks.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">⏪ Checkpoints</h5>
                  <p className="text-sm text-muted-foreground">
                    Every action creates a checkpoint. Rewind conversation, 
                    code, or both with Esc+Esc or /rewind.
                  </p>
                </div>
              </div>

              {/* Subagents vs Skills vs MCP Callout */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-lg">🧠</span>
                  Subagents vs Skills vs MCP
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  These three patterns complement each other: <strong>Subagents</strong> spawn 
                  parallel LLM instances for research, <strong>Skills</strong> add reusable 
                  expertise on-demand, and <strong>MCP</strong> provides standardized tool access.
                </p>
                <p className="text-sm text-muted-foreground">
                  See the interactive comparison in the <a href="/concepts/agent-skills" className="text-primary underline font-medium">Agent Skills</a> concept 
                  for an animated walkthrough of how these patterns work together.
                </p>
              </div>

              {/* CLAUDE.md */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">📋 CLAUDE.md Context File</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  CLAUDE.md is loaded at the start of every conversation. Include Bash commands, 
                  code style, and workflow rules. Run /init to generate a starter file.
                </p>
                <pre className="bg-blue-100 dark:bg-blue-800 p-2 rounded text-xs overflow-x-auto">
                  <code>{`# Code style
- Use ES modules syntax, not CommonJS

# Workflow
- Typecheck after code changes
- Prefer single tests for performance`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Headless & Automation */}
          <Card>
            <CardHeader>
              <CardTitle>Automation & Scaling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Claude Code scales horizontally with headless mode, parallel sessions, 
                and fan-out patterns.
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# Headless mode for CI/scripts
claude -p "Explain what this project does"

# Structured output
claude -p "List all API endpoints" --output-format json

# Fan out across files
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue" \\
    --allowedTools "Edit,Bash(git commit *)"
done`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Local Intelligence vs RAG Embeddings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-purple-500" />
                Local Intelligence vs RAG Embeddings
              </CardTitle>
              <CardDescription>
                Why Claude Code prefers on-the-fly file reading over pre-computed vector embeddings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <img 
                  src="/images/Claude_Code_Local_Intelligence_Approach_vs_RAG_Embeddings.png" 
                  alt="Claude Code Local Intelligence Approach vs RAG Embeddings comparison diagram"
                  className="rounded-lg border border-slate-200 dark:border-slate-700 max-w-full h-auto shadow-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10">
                  <h5 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">🎯 Local Intelligence (Claude Code)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>On-demand file reading:</strong> Reads actual source files when needed</li>
                    <li>• <strong>Always fresh:</strong> Never stale—sees your latest uncommitted changes</li>
                    <li>• <strong>Full context:</strong> Semantic understanding of entire file structure</li>
                    <li>• <strong>Zero setup:</strong> No indexing, no vector DB, no chunking strategy</li>
                    <li>• <strong>Precise edits:</strong> Direct manipulation of source files</li>
                  </ul>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/10">
                  <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">📊 RAG with Embeddings</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Pre-computed vectors:</strong> Requires upfront indexing of codebase</li>
                    <li>• <strong>Can get stale:</strong> Embeddings may not reflect latest changes</li>
                    <li>• <strong>Chunked context:</strong> Limited by chunk size and similarity thresholds</li>
                    <li>• <strong>Setup overhead:</strong> Vector DB, chunking config, embedding model</li>
                    <li>• <strong>Semantic search:</strong> Great for large doc retrieval, less for editing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">💡 When to Use Each</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Local Intelligence</strong> excels for active coding sessions where you're editing, 
                  refactoring, and debugging—the context is always current and Claude can make precise changes. 
                  <strong>RAG embeddings</strong> shine for searching across massive documentation sets, 
                  knowledge bases, or archived codebases where semantic search trumps real-time accuracy.
                </p>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Claude Code"
            contextDescription="Anthropic's terminal-native agentic coding environment"
          />
        </div>
      )
    },
    {
      id: 'codex-cli',
      title: 'OpenAI Codex CLI',
      description: 'Open-source, Rust-powered coding agent',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-600" />
                OpenAI Codex CLI
              </CardTitle>
              <CardDescription>
                Pair with Codex in your terminal—open source, built in Rust
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Codex CLI is OpenAI's coding agent that runs locally from your terminal. 
                It can read, change, and run code on your machine in the selected directory. 
                Built in Rust for speed and efficiency, it's fully open source.
              </p>

              {/* Installation */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded text-sm overflow-x-auto">
                    <code>{`# Install via npm
npm i -g @openai/codex

# Or with Homebrew
brew install codex

# Then run
codex`}</code>
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    First run prompts for authentication via ChatGPT account or API key.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🌐 Web Search</h5>
                  <p className="text-sm text-muted-foreground">
                    Built-in web search for real-time information. Ground responses 
                    in up-to-date documentation and resources.
                  </p>
                </div>
                <div className="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🖼️ Image Inputs</h5>
                  <p className="text-sm text-muted-foreground">
                    Process and understand images. Debug from screenshots, 
                    implement designs, analyze visual content.
                  </p>
                </div>
                <div className="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">✅ Approval Modes</h5>
                  <p className="text-sm text-muted-foreground">
                    Configurable approval levels for different operations. 
                    Balance autonomy with control.
                  </p>
                </div>
                <div className="border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">☁️ Azure Integration</h5>
                  <p className="text-sm text-muted-foreground">
                    Works with Azure OpenAI for enterprise deployments. 
                    Use existing cloud infrastructure.
                  </p>
                </div>
              </div>

              {/* Agent Loop */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700 mt-4">
                <h4 className="font-semibold mb-2 text-emerald-800 dark:text-emerald-200">🔄 The Agent Loop</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Codex unrolls an agent loop that iteratively reads, reasons, and acts. 
                  Understanding this loop helps you work more effectively with the agent.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Read Context</Badge>
                  <Badge variant="outline">Plan Actions</Badge>
                  <Badge variant="outline">Execute Changes</Badge>
                  <Badge variant="outline">Verify Results</Badge>
                  <Badge variant="outline">Iterate</Badge>
                </div>
              </div>

              {/* AGENTS.md */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">📋 AGENTS.md Support</h4>
                <p className="text-sm text-muted-foreground">
                  Codex honors AGENTS.md files for project context and coding guidelines. 
                  Add build commands, code style rules, and architectural decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Action & SDK */}
          <Card>
            <CardHeader>
              <CardTitle>Codex in CI/CD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Codex integrates with GitHub Actions for automated code review, 
                issue triage, and workflow automation.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">GitHub Action</Badge>
                <Badge variant="secondary">Non-interactive Mode</Badge>
                <Badge variant="secondary">Codex SDK</Badge>
                <Badge variant="secondary">App Server</Badge>
                <Badge variant="secondary">MCP Server</Badge>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="OpenAI Codex CLI"
            contextDescription="Open-source Rust-based terminal coding agent"
          />
        </div>
      )
    },
    {
      id: 'gemini-cli',
      title: 'Gemini CLI',
      description: 'Open-source, 1M context, Google Search grounding',
      icon: <Lightning className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5 text-blue-600" />
                Gemini CLI
              </CardTitle>
              <CardDescription>
                Open-source AI agent with Gemini 3 models and 1M token context
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Gemini CLI is an open-source AI agent (Apache 2.0) that brings the power of 
                Gemini directly into your terminal. It provides the most direct path from 
                your prompt to Google's Gemini models with a generous free tier.
              </p>

              {/* Installation */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded text-sm overflow-x-auto">
                    <code>{`# Run instantly with npx (no install)
npx @google/gemini-cli

# Or install globally
npm install -g @google/gemini-cli

# macOS/Linux via Homebrew
brew install gemini-cli

# Then just run
gemini`}</code>
                  </pre>
                </div>
              </div>

              {/* Why Gemini CLI */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">🚀 Why Gemini CLI?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span className="text-sm"><strong>Free tier:</strong> 60 req/min, 1000 req/day</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span className="text-sm"><strong>1M token context</strong> window</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span className="text-sm"><strong>Google Search</strong> grounding</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span className="text-sm"><strong>Apache 2.0</strong> open source</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔧 Built-in Tools</h5>
                  <p className="text-sm text-muted-foreground">
                    File operations, shell commands, web fetching included. 
                    No configuration required.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔌 MCP Support</h5>
                  <p className="text-sm text-muted-foreground">
                    Connect custom MCP servers for GitHub, Slack, databases, 
                    and more via settings.json.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">💾 Checkpointing</h5>
                  <p className="text-sm text-muted-foreground">
                    Save and resume complex sessions. Conversation 
                    checkpointing for long workflows.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🤖 GitHub Action</h5>
                  <p className="text-sm text-muted-foreground">
                    Integrate via google-github-actions/run-gemini-cli for 
                    PR reviews, issue triage, @gemini-cli mentions.
                  </p>
                </div>
              </div>

              {/* GEMINI.md */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">📋 GEMINI.md Context File</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Custom context files to tailor behavior for your projects. 
                  Similar to CLAUDE.md and AGENTS.md patterns.
                </p>
                <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`# Project: My App
- Use TypeScript strict mode
- Run tests with: npm test
- Deploy command: npm run deploy`}</code>
                </pre>
              </div>

              {/* Authentication */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="border border-border rounded-lg p-3 text-center">
                  <Key className="w-5 h-5 mx-auto mb-2 text-blue-500" />
                  <h5 className="font-medium text-sm">Google OAuth</h5>
                  <p className="text-xs text-muted-foreground">Free tier, 60 req/min</p>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <Key className="w-5 h-5 mx-auto mb-2 text-green-500" />
                  <h5 className="font-medium text-sm">API Key</h5>
                  <p className="text-xs text-muted-foreground">Model selection</p>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <CloudArrowUp className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                  <h5 className="font-medium text-sm">Vertex AI</h5>
                  <p className="text-xs text-muted-foreground">Enterprise, scalable</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-sm overflow-x-auto">
                <code>{`# Start interactive session
gemini

# Non-interactive for scripts
gemini -p "Explain the architecture of this codebase"

# JSON output for parsing
gemini -p "List endpoints" --output-format json

# Stream JSON events
gemini -p "Run tests and deploy" --output-format stream-json

# Use specific model
gemini -m gemini-2.5-flash`}</code>
              </pre>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Gemini CLI"
            contextDescription="Google's open-source terminal AI agent with 1M context"
          />
        </div>
      )
    },
    {
      id: 'opencode',
      title: 'OpenCode',
      description: '100% open source, provider-agnostic, TUI-focused',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-600" />
                OpenCode
              </CardTitle>
              <CardDescription>
                The open source AI coding agent — provider-agnostic, TUI-native
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                OpenCode is a 100% open source (MIT) AI coding agent with 90k+ stars. 
                Unlike vendor-locked alternatives, OpenCode works with any provider—Claude, 
                OpenAI, Google, or local models. Built by neovim users with a focus on 
                terminal UI excellence and a client/server architecture.
              </p>

              {/* Installation */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 p-2 rounded text-sm overflow-x-auto">
                    <code>{`# YOLO install
curl -fsSL https://opencode.ai/install | bash

# npm / bun / pnpm / yarn
npm i -g opencode-ai@latest

# macOS/Linux (Homebrew)
brew install anomalyco/tap/opencode

# Windows (Scoop / Chocolatey)
scoop install opencode
choco install opencode

# Arch Linux
paru -S opencode-bin`}</code>
                  </pre>
                </div>
              </div>

              {/* Key Differentiators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-cyan-200 dark:border-cyan-700 rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/20">
                  <h5 className="font-semibold mb-2">🔓 100% Open Source</h5>
                  <p className="text-sm text-muted-foreground">
                    MIT licensed, 660+ contributors, fully auditable. 
                    No vendor lock-in, no telemetry concerns.
                  </p>
                </div>
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                  <h5 className="font-semibold mb-2">🔀 Provider Agnostic</h5>
                  <p className="text-sm text-muted-foreground">
                    Use Claude, OpenAI, Google, or local models. 
                    Switch providers as pricing and capabilities evolve.
                  </p>
                </div>
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                  <h5 className="font-semibold mb-2">🔧 Built-in LSP</h5>
                  <p className="text-sm text-muted-foreground">
                    Out-of-the-box Language Server Protocol support. 
                    Better code intelligence than competitors.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20">
                  <h5 className="font-semibold mb-2">📱 Client/Server</h5>
                  <p className="text-sm text-muted-foreground">
                    Run on your machine, control remotely from mobile. 
                    TUI is just one possible frontend.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Built-in Agents */}
          <Card>
            <CardHeader>
              <CardTitle>Built-in Agents</CardTitle>
              <CardDescription>
                Switch between agents with Tab key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">build</Badge>
                    <span className="text-sm font-medium">Default Agent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full access agent for development work. Can read, write, 
                    and execute—the workhorse for getting things done.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">plan</Badge>
                    <span className="text-sm font-medium">Read-Only Agent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Read-only for analysis and exploration. Denies file edits, 
                    asks permission for bash. Perfect for unfamiliar codebases.
                  </p>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg mt-4">
                <h5 className="font-semibold mb-2">@general Subagent</h5>
                <p className="text-sm text-muted-foreground">
                  Invoke with <code>@general</code> for complex searches and multi-step 
                  tasks. Used internally by the main agents for delegation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Desktop App */}
          <Card>
            <CardHeader>
              <CardTitle>Desktop App (Beta)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                OpenCode is also available as a native desktop application:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-border rounded-lg p-3 text-center">
                  <span className="text-2xl">🍎</span>
                  <p className="text-sm font-medium mt-1">macOS</p>
                  <code className="text-xs text-muted-foreground">.dmg</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <span className="text-2xl">🪟</span>
                  <p className="text-sm font-medium mt-1">Windows</p>
                  <code className="text-xs text-muted-foreground">.exe</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <span className="text-2xl">🐧</span>
                  <p className="text-sm font-medium mt-1">Linux</p>
                  <code className="text-xs text-muted-foreground">.deb/.rpm</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <span className="text-2xl">📦</span>
                  <p className="text-sm font-medium mt-1">AppImage</p>
                  <code className="text-xs text-muted-foreground">portable</code>
                </div>
              </div>
              <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-sm overflow-x-auto">
                <code>{`# macOS (Homebrew Cask)
brew install --cask opencode-desktop

# Windows (Scoop)
scoop bucket add extras
scoop install extras/opencode-desktop`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* OpenCode Zen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-purple-500" />
                OpenCode Zen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Optional managed service at <code>opencode.ai/zen</code> for those 
                who want curated models without managing API keys.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Curated Models</Badge>
                <Badge variant="secondary">No API Key Needed</Badge>
                <Badge variant="secondary">Usage-Based Pricing</Badge>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" />

          <EnlightenMeButton
            title="OpenCode"
            contextDescription="100% open source provider-agnostic AI coding agent"
          />
        </div>
      )
    },
    {
      id: 'agent-client-protocol',
      title: 'Agent Client Protocol (ACP)',
      description: 'Standardizing editor-to-agent communication',
      icon: <Plugs className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plugs className="w-5 h-5 text-indigo-600" />
                Agent Client Protocol (ACP)
              </CardTitle>
              <CardDescription>
                The open standard for connecting any editor to any coding agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                The <strong>Agent Client Protocol (ACP)</strong> standardizes communication between code 
                editors/IDEs and coding agents. Think of it as the <strong>Language Server Protocol (LSP) 
                for AI agents</strong>—enabling any ACP-compatible agent to work with any ACP-compatible editor.
              </p>

              {/* Infographic */}
              <div className="my-6">
                <img 
                  src="/images/Agent_Client_Protocol_Any_Editor_Any_Agent.png" 
                  alt="Agent Client Protocol: Any Editor, Any Agent - Infographic showing how ACP standardizes communication between code editors and coding agents"
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  ACP enables seamless integration between any compatible editor and any compatible agent
                </p>
              </div>

              {/* Why ACP? */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-md border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold mb-3 text-indigo-900 dark:text-indigo-200">Why ACP?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span><strong>Integration Overhead:</strong> Without ACP, every new agent-editor combination requires custom work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Limited Compatibility:</strong> Agents only work with a subset of available editors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></span>
                    <span><strong>Developer Lock-in:</strong> Choosing an agent often means accepting limited interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>ACP Solution:</strong> Standardized protocol lets both sides innovate independently</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>Architecture</CardTitle>
              <CardDescription>
                How ACP connects editors to agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Design Principles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <h5 className="font-semibold mb-2 text-indigo-800 dark:text-indigo-200">🔗 MCP-Friendly</h5>
                  <p className="text-sm text-muted-foreground">
                    Built on JSON-RPC, reuses MCP types where possible. Integrators don't need 
                    to build yet-another representation for common data types.
                  </p>
                </div>
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                  <h5 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">🎨 UX-First</h5>
                  <p className="text-sm text-muted-foreground">
                    Designed to solve UX challenges of interacting with AI agents. Includes 
                    custom types for agentic UX elements like displaying diffs.
                  </p>
                </div>
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                  <h5 className="font-semibold mb-2 text-green-800 dark:text-green-200">🔐 Trusted</h5>
                  <p className="text-sm text-muted-foreground">
                    Works when using a code editor to talk to a trusted model. Agent gets access 
                    to local files and MCP servers with controlled tool calls.
                  </p>
                </div>
              </div>

              {/* Setup Diagram */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg font-mono text-sm">
                <h5 className="font-semibold mb-3">Local Agent Setup</h5>
                <pre className="overflow-x-auto">{`┌─────────────────┐    JSON-RPC     ┌─────────────────┐
│   Code Editor   │ ◄──────────────► │   Agent Process │
│  (VS Code, Zed, │    (stdin/out)   │  (Local/Remote) │
│   JetBrains)    │                  │                 │
└────────┬────────┘                  └────────┬────────┘
         │                                    │
         │  MCP Config                        │  MCP Client
         ▼                                    ▼
┌─────────────────┐                  ┌─────────────────┐
│   MCP Servers   │ ◄─────────────── │   Tool Calls    │
│  (User Config)  │                  │                 │
└─────────────────┘                  └─────────────────┘`}</pre>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Key insight:</strong> ACP makes heavy use of JSON-RPC notifications to stream 
                updates to the UI in real-time. It also uses bidirectional requests to allow agents 
                to request permissions from the editor (e.g., for tool calls).
              </div>
            </CardContent>
          </Card>

          {/* Local vs Remote */}
          <Card>
            <CardHeader>
              <CardTitle>Local & Remote Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                  <h5 className="font-semibold mb-2 text-green-800 dark:text-green-200">🖥️ Local Agents</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Run as sub-processes of the code editor, communicating via JSON-RPC over stdio.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Low latency, direct file access</li>
                    <li>• No network dependencies</li>
                    <li>• Editor manages agent lifecycle</li>
                  </ul>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">☁️ Remote Agents</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosted in the cloud or on separate infrastructure, communicating over HTTP/WebSocket.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Team-shared agents</li>
                    <li>• Persistent context across sessions</li>
                    <li>• Heavy compute offloading</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> Full support for remote agents is a work in progress. 
                  The protocol team is actively collaborating with agentic platforms to address 
                  cloud-hosted and remote deployment scenarios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SDKs */}
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>Implement ACP in your preferred language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-border rounded-lg p-3 text-center hover:border-indigo-400 transition-colors">
                  <span className="text-2xl">🦀</span>
                  <p className="text-sm font-medium mt-1">Rust</p>
                  <code className="text-xs text-muted-foreground">crates.io</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center hover:border-indigo-400 transition-colors">
                  <span className="text-2xl">🐍</span>
                  <p className="text-sm font-medium mt-1">Python</p>
                  <code className="text-xs text-muted-foreground">python-sdk</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center hover:border-indigo-400 transition-colors">
                  <span className="text-2xl">📘</span>
                  <p className="text-sm font-medium mt-1">TypeScript</p>
                  <code className="text-xs text-muted-foreground">npm</code>
                </div>
                <div className="border border-border rounded-lg p-3 text-center hover:border-indigo-400 transition-colors">
                  <span className="text-2xl">☕</span>
                  <p className="text-sm font-medium mt-1">Kotlin</p>
                  <code className="text-xs text-muted-foreground">JVM</code>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">TypeScript Example</h5>
                <pre className="text-sm overflow-x-auto"><code>{`import { ACPServer } from '@agentclientprotocol/sdk';

const server = new ACPServer({
  name: 'my-coding-agent',
  version: '1.0.0'
});

server.onSession(async (session) => {
  // Handle incoming prompts from editor
  session.onPrompt(async (prompt) => {
    // Process and stream responses back
    await session.streamText("Analyzing your code...");
    // Request tool permissions
    const approved = await session.requestToolCall({
      name: 'edit_file',
      params: { path: 'src/index.ts' }
    });
  });
});

server.listen();`}</code></pre>
              </div>
            </CardContent>
          </Card>

          {/* MCP Integration */}
          <Card>
            <CardHeader>
              <CardTitle>MCP Integration</CardTitle>
              <CardDescription>
                How ACP works with Model Context Protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Editors typically have user-configured MCP servers. When forwarding prompts, 
                the editor passes MCP configuration to the agent, allowing direct connections.
              </p>

              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg font-mono text-sm">
                <pre className="overflow-x-auto">{`┌─────────────┐                    ┌─────────────┐
│   Editor    │ ─── ACP ───────► │    Agent    │
│             │                    │             │
│  MCP Config │                    │ MCP Client  │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │ (optional proxy)                 │ (direct connect)
       ▼                                  ▼
┌─────────────────────────────────────────────────┐
│                  MCP Servers                    │
│  (filesystem, git, database, custom tools...)  │
└─────────────────────────────────────────────────┘`}</pre>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Editor-provided tools:</strong> The editor can also export its own MCP-based tools. 
                Since agents may only support MCP over stdio, the editor can provide a small proxy 
                that tunnels requests back to itself.
              </div>
            </CardContent>
          </Card>

          {/* Agents & Clients Registry */}
          <Card>
            <CardHeader>
              <CardTitle>Ecosystem</CardTitle>
              <CardDescription>ACP-compatible agents and clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🤖 Compatible Agents</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Agents that implement the ACP specification:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Zed AI Agent (built-in)</li>
                    <li>• Claude Code (via ACP adapter)</li>
                    <li>• Community agents (growing)</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📝 Compatible Clients</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Editors/IDEs with ACP support:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Zed (native support)</li>
                    <li>• JetBrains IDEs (plugin)</li>
                    <li>• VS Code (community extension)</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <a 
                  href="https://agentclientprotocol.com/overview/agents" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                >
                  View full registry at agentclientprotocol.com →
                </a>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" categoryFilter="acp-protocol" />

          <EnlightenMeButton
            title="Agent Client Protocol"
            contextDescription="Standardized protocol for connecting code editors to AI coding agents"
          />
        </div>
      )
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      description: 'Maximize effectiveness with CLI coding agents',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                CLI Agent Best Practices
              </CardTitle>
              <CardDescription>
                Patterns that work across all five major CLI coding agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Universal Patterns */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Universal Patterns</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Give Verification Criteria</h5>
                    <p className="text-sm text-muted-foreground">
                      Include tests, screenshots, or expected outputs so the agent can check itself. 
                      This is the single highest-leverage practice.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Explore → Plan → Code</h5>
                    <p className="text-sm text-muted-foreground">
                      Separate research and planning from implementation. Use Plan Mode 
                      (Claude Code) or ask to "make a plan first" before coding.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Provide Specific Context</h5>
                    <p className="text-sm text-muted-foreground">
                      Reference specific files, mention constraints, point to example patterns. 
                      The more precise, the fewer corrections needed.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Clear Context Between Tasks</h5>
                    <p className="text-sm text-muted-foreground">
                      Long sessions with irrelevant context reduce performance. 
                      Start fresh for unrelated tasks.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Over-specified Context Files</h5>
                    <p className="text-sm text-muted-foreground">
                      If your CLAUDE.md/AGENTS.md is too long, important rules get lost. 
                      Ruthlessly prune—if the agent already does it correctly, delete the instruction.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Correcting Over and Over</h5>
                    <p className="text-sm text-muted-foreground">
                      After two failed corrections, context is polluted with failed approaches. 
                      Clear and restart with a better initial prompt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Context File Patterns */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-lg">Context File Patterns</h4>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">
                    All four agents honor markdown context files. Use consistent patterns:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                    <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded">AGENTS.md</div>
                    <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded">CLAUDE.md</div>
                    <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded">GEMINI.md</div>
                    <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded">COPILOT.md</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Copilot CLI honors all three: AGENTS.md, CLAUDE.md, and GEMINI.md
                  </p>
                </div>
              </div>

              {/* Headless Mode */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-lg">Headless/Non-Interactive Mode</h4>
                <p className="text-sm text-muted-foreground">
                  All agents support non-interactive mode for CI, pre-commit hooks, and scripts:
                </p>
                <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded text-sm overflow-x-auto">
                  <code>{`# Claude Code
claude -p "Fix lint errors" --output-format json

# Codex CLI
codex -p "Generate changelog" --output-format json

# Gemini CLI
gemini -p "Review code" --output-format stream-json

# Copilot CLI (with GitHub Actions)
uses: github/copilot-cli-action@v1`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📚 Claude Code</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="https://code.claude.com/docs" className="underline">Official Docs</a></li>
                    <li>• <a href="https://anthropic.skilljar.com/claude-code-in-action" className="underline">Skilljar Training (Free)</a></li>
                    <li>• Best Practices Guide</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📚 Gemini CLI</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="https://geminicli.com/docs" className="underline">Official Docs</a></li>
                    <li>• <a href="https://www.deeplearning.ai/short-courses/gemini-cli-code-and-create-with-an-open-source-agent/" className="underline">DeepLearning.AI Course</a></li>
                    <li>• GitHub Samples</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" />

          <EnlightenMeButton
            title="CLI Agent Best Practices"
            contextDescription="Patterns for effective CLI coding agent usage"
          />
        </div>
      )
    }
  ];

  return (
    <ConceptLayout
      conceptId="client-coding-agents"
      title="Client Coding Agents"
      description="Master the CLI-native AI coding agents reshaping development in 2026"
      tabs={tabs}
      nextConcept={{
        id: 'agent-skills',
        title: 'Agent Skills',
        description: 'Extend agents with modular SKILL.md expertise'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
