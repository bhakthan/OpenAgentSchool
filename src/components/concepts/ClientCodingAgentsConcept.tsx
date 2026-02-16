import { useState, useCallback } from 'react'
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "../references/ReferenceSection"
import { Terminal, Code, GithubLogo, Lightning, CloudArrowUp, Robot, Command, BookOpen, ArrowsClockwise, ArrowsCounterClockwise, Key, Sparkle, Plugs, FilePdf, ChartBarHorizontal, CaretLeft, CaretRight } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

/* ─── Visual Guide Carousel (30 pages from PDF) ──────────────────────────── */
const GUIDE_PAGES = 30;
const guideSrc = (n: number) => `/images/client-coding-agents-guide/page-${String(n).padStart(2, '0')}.webp`;

function VisualGuideCarousel() {
  const [page, setPage] = useState(1);
  const prev = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const next = useCallback(() => setPage(p => Math.min(GUIDE_PAGES, p + 1)), []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This visual guide covers the core concepts of CLI coding agents in a printable format.
        Use it as a quick reference while learning or as a study companion.
      </p>

      {/* Image viewer */}
      <div className="border border-border rounded-lg overflow-hidden bg-muted/30 relative">
        <img
          src={guideSrc(page)}
          alt={`CLI Coding Agents Visual Guide — Page ${page} of ${GUIDE_PAGES}`}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={page === 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <CaretLeft size={16} weight="bold" /> Prev
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tabular-nums">
            Page {page} of {GUIDE_PAGES}
          </span>
          <input
            type="range"
            min={1}
            max={GUIDE_PAGES}
            value={page}
            onChange={e => setPage(Number(e.target.value))}
            className="w-32 sm:w-48 accent-primary"
            aria-label="Page slider"
          />
        </div>

        <button
          onClick={next}
          disabled={page === GUIDE_PAGES}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next <CaretRight size={16} weight="bold" />
        </button>
      </div>

      {/* Page count indicator */}
      <p className="text-xs text-muted-foreground text-center">
        30-page visual guide — use the slider or arrows to browse all pages
      </p>
    </div>
  );
}

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
                <h4 className="font-semibold mb-3 text-foreground">Why CLI Agents in 2026?</h4>
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

          {/* Anatomy of a CLI Coding Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="w-5 h-5" />
                Anatomy of a CLI Coding Agent
              </CardTitle>
              <CardDescription>
                End-to-end view of what happens behind the terminal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  When you type a prompt in a CLI coding agent, a sophisticated pipeline activates. 
                  This diagram shows the full architecture—from your terminal input through the agentic 
                  loop to code execution and back.
                </p>
                <div className="border border-border rounded-lg overflow-hidden">
                  <img 
                    src="/images/Anatomy_of_a_CLI_Coding_Agent.webp" 
                    alt="Anatomy of a CLI Coding Agent - showing the end-to-end flow from terminal input through the agentic loop, tool execution, and response generation" 
                    className="w-full"
                  />
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold mb-2">Key Components</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                      <span><strong>CLI Interface:</strong> Your terminal entry point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                      <span><strong>Agentic Loop:</strong> Plan → Execute → Observe → Reflect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                      <span><strong>Tool System:</strong> MCP servers, file ops, shell commands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                      <span><strong>LLM Backend:</strong> Cloud or local model inference</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Local Intelligence vs Cloud RAG */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Local Intelligence Beats Cloud RAG
              </CardTitle>
              <CardDescription>
                HOW beats WHAT — Why local agentic search outperforms cloud embeddings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Imagine working on a huge coding project with thousands of files. You need AI help, 
                but you don't want to upload your entire codebase to the cloud. <strong>Local Agentic Search</strong> to 
                the rescue—everything happens on your own machine.
              </p>

              {/* Three Techniques */}
              <div className="space-y-4">
                {/* Grep */}
                <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <span className="text-blue-600 dark:text-blue-400">1.</span> Grep (The Speed Reader)
                    <Badge variant="secondary" className="text-xs">Since 1970s</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Super-fast text search on steroids. Instantly searches thousands of files for exact text matches.
                  </p>
                  <div className="bg-muted/50 p-3 rounded text-sm">
                    <strong>Example:</strong> Ask "Where do we handle user login?" → grep searches for "login", 
                    "authenticate", "signin" across your entire project in milliseconds. No preprocessing, 
                    no embeddings, no cloud uploads.
                  </div>
                </div>

                {/* AST */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <span className="text-purple-600 dark:text-purple-400">2.</span> AST (The Code Understander)
                    <Badge variant="secondary" className="text-xs">Structure-Aware</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Abstract Syntax Tree parsing understands code structure—it knows what's a function, class, or variable.
                  </p>
                  <div className="bg-muted/50 p-3 rounded text-sm">
                    <strong>Think of it:</strong> If code was a sentence, grep looks at individual words, 
                    but AST understands grammar—it knows which words are nouns, verbs, subjects, and objects.
                  </div>
                </div>

                {/* Agentic Search */}
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <span className="text-green-600 dark:text-green-400">3.</span> Agentic Search (The Smart Explorer)
                    <Badge variant="secondary" className="text-xs">Multi-Step</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    "Agentic" means it makes decisions and takes actions on its own, step-by-step:
                  </p>
                  <div className="bg-muted/50 p-3 rounded text-sm space-y-1">
                    <p>"Let me first grep for 'payment' to find relevant files"</p>
                    <p>"Found 15 files. Let me use AST to understand PaymentProcessor class"</p>
                    <p>"I see this calls another module. Let me search that too"</p>
                    <p>"Now let me trace through the function calls to understand the flow"</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Like having a detective who follows clues—each search result informs what to search next.
                  </p>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-3">Why This Matters (The Big Picture)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <strong className="text-amber-700 dark:text-amber-400">🔒 Privacy</strong>
                    <p className="text-sm text-muted-foreground mt-1">Your code never leaves your computer. Period.</p>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-400">⚡ Speed</strong>
                    <p className="text-sm text-muted-foreground mt-1">No network latency—runs at the speed of your local drive and CPU.</p>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-400">🎯 Precision</strong>
                    <p className="text-sm text-muted-foreground mt-1">AST understands structure, fewer false positives than "sounds similar" embeddings.</p>
                  </div>
                </div>
              </div>

              {/* Technical Reason */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">Technical Insight: "Aboutness" vs Structure</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Embeddings encode semantics, not relationships.</strong> They tell you WHAT something is about, 
                  but not HOW it connects. RAG retrieves the top-K "similar" chunks (O(K) relevance), while 
                  agentic search can trace exact call graphs, imports, and dependencies (O(1) precision). 
                  For code understanding, structure beats similarity.
                </p>
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
                  <code className="text-xs bg-muted text-foreground px-2 py-1 rounded">brew install copilot-cli</code>
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
                  <code className="text-xs bg-muted text-foreground px-2 py-1 rounded">curl -fsSL https://claude.ai/install.sh | bash</code>
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
                  <code className="text-xs bg-muted text-foreground px-2 py-1 rounded">npm i -g @openai/codex</code>
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
                  <code className="text-xs bg-muted text-foreground px-2 py-1 rounded">npm install -g @google/gemini-cli</code>
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

          {/* Visual Guide — Page Image Carousel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePdf className="w-5 h-5" />
                Visual Guide: CLI Coding Agents Core Concepts
              </CardTitle>
              <CardDescription>
                A comprehensive visual reference for understanding CLI coding agents architecture and workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VisualGuideCarousel />
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
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Windows (WinGet):</span>
                    <pre className="bg-muted text-foreground p-2 rounded mt-1 text-sm overflow-x-auto">
                      <code>winget install GitHub.Copilot</code>
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">macOS/Linux (Homebrew):</span>
                    <pre className="bg-muted text-foreground p-2 rounded mt-1 text-sm overflow-x-auto">
                      <code>brew install copilot-cli</code>
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">npm (cross-platform):</span>
                    <pre className="bg-muted text-foreground p-2 rounded mt-1 text-sm overflow-x-auto">
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
              <div className="bg-muted/50 p-4 rounded-lg border border-amber-200 dark:border-amber-700 mt-4">
                <h4 className="font-semibold mb-2 text-foreground">💡 Pro Tips</h4>
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
                <div className="p-4 bg-muted text-foreground border-t border-red-200 dark:border-red-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

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
                <div className="bg-muted/50 p-4 border-b border-blue-200 dark:border-blue-800">
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
                <div className="p-4 bg-muted text-foreground border-t border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

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
                <div className="bg-muted/50 p-4 border-b border-green-200 dark:border-green-800">
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
                <div className="p-4 bg-muted text-foreground border-t border-green-200 dark:border-green-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient
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
                <div className="bg-muted/50 p-4 border-b border-purple-200 dark:border-purple-800">
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
                <div className="p-4 bg-muted text-foreground border-t border-purple-200 dark:border-purple-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient
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
                <div className="bg-muted/50 p-4 border-b border-amber-200 dark:border-amber-800">
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
                <div className="p-4 bg-muted text-foreground border-t border-amber-200 dark:border-amber-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`from copilot import CopilotClient

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
                  <div className="mt-6 p-4 bg-muted rounded-lg">
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
                
                <div className="p-4 bg-muted text-foreground border-t border-pink-200 dark:border-pink-800">
                  <h5 className="font-semibold text-sm mb-2">Code Example</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-xs overflow-x-auto"><code>{`import asyncio
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
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Get Started in 30 Seconds
                </h4>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
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
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                  <span className="text-lg">🧠</span>
                  Subagents vs Skills vs MCP
                </h4>
                <p className="text-sm text-foreground/80 mb-2">
                  These three patterns complement each other: <strong>Subagents</strong> spawn 
                  parallel LLM instances for research, <strong>Skills</strong> add reusable 
                  expertise on-demand, and <strong>MCP</strong> provides standardized tool access.
                </p>
                <p className="text-sm text-foreground/80">
                  See the interactive comparison in the <a href="/concepts/agent-skills" className="text-primary underline font-medium">Agent Skills</a> concept 
                  for an animated walkthrough of how these patterns work together.
                </p>
              </div>

              {/* CLAUDE.md */}
              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                <h4 className="font-semibold mb-2 text-foreground">📋 CLAUDE.md Context File</h4>
                <p className="text-sm text-foreground/80 mb-2">
                  CLAUDE.md is loaded at the start of every conversation. Include Bash commands, 
                  code style, and workflow rules. Run /init to generate a starter file.
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
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
              <div className="bg-muted text-foreground p-4 rounded-lg">
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
                  src="/images/Claude_Code_Local_Intelligence_Approach_vs_RAG_Embeddings.webp" 
                  alt="Claude Code Local Intelligence Approach vs RAG Embeddings comparison diagram"
                  className="rounded-lg border border-slate-200 dark:border-slate-700 max-w-full h-auto shadow-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10">
                  <h5 className="font-semibold mb-2 text-foreground">🎯 Local Intelligence (Claude Code)</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• <strong>On-demand file reading:</strong> Reads actual source files when needed</li>
                    <li>• <strong>Always fresh:</strong> Never stale—sees your latest uncommitted changes</li>
                    <li>• <strong>Full context:</strong> Semantic understanding of entire file structure</li>
                    <li>• <strong>Zero setup:</strong> No indexing, no vector DB, no chunking strategy</li>
                    <li>• <strong>Precise edits:</strong> Direct manipulation of source files</li>
                  </ul>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/10">
                  <h5 className="font-semibold mb-2 text-foreground">📊 RAG with Embeddings</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• <strong>Pre-computed vectors:</strong> Requires upfront indexing of codebase</li>
                    <li>• <strong>Can get stale:</strong> Embeddings may not reflect latest changes</li>
                    <li>• <strong>Chunked context:</strong> Limited by chunk size and similarity thresholds</li>
                    <li>• <strong>Setup overhead:</strong> Vector DB, chunking config, embedding model</li>
                    <li>• <strong>Semantic search:</strong> Great for large doc retrieval, less for editing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2 text-foreground">💡 When to Use Each</h4>
                <p className="text-sm text-foreground/80">
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
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-muted text-foreground p-2 rounded text-sm overflow-x-auto">
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
                <h4 className="font-semibold mb-2 text-foreground">🔄 The Agent Loop</h4>
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
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
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
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-muted text-foreground p-2 rounded text-sm overflow-x-auto">
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
              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold mb-3 text-foreground">🚀 Why Gemini CLI?</h4>
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
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">📋 GEMINI.md Context File</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Custom context files to tailor behavior for your projects. 
                  Similar to CLAUDE.md and AGENTS.md patterns.
                </p>
                <pre className="bg-muted text-foreground p-2 rounded text-xs overflow-x-auto">
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
              <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
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
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  Installation
                </h4>
                <div className="space-y-2">
                  <pre className="bg-slate-200 dark:bg-slate-700 text-foreground p-2 rounded text-sm overflow-x-auto">
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
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2">🔀 Provider Agnostic</h5>
                  <p className="text-sm text-muted-foreground">
                    Use Claude, OpenAI, Google, or local models. 
                    Switch providers as pricing and capabilities evolve.
                  </p>
                </div>
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2">🔧 Built-in LSP</h5>
                  <p className="text-sm text-muted-foreground">
                    Out-of-the-box Language Server Protocol support. 
                    Better code intelligence than competitors.
                  </p>
                </div>
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4 bg-muted/50">
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
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
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
              <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
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
                  src="/images/Agent_Client_Protocol_Any_Editor_Any_Agent.webp" 
                  alt="Agent Client Protocol: Any Editor, Any Agent - Infographic showing how ACP standardizes communication between code editors and coding agents"
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  ACP enables seamless integration between any compatible editor and any compatible agent
                </p>
              </div>

              {/* Why ACP? */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-md border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold mb-3 text-foreground">Why ACP?</h4>
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
                  <h5 className="font-semibold mb-2 text-foreground">🔗 MCP-Friendly</h5>
                  <p className="text-sm text-muted-foreground">
                    Built on JSON-RPC, reuses MCP types where possible. Integrators don't need 
                    to build yet-another representation for common data types.
                  </p>
                </div>
                <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🎨 UX-First</h5>
                  <p className="text-sm text-muted-foreground">
                    Designed to solve UX challenges of interacting with AI agents. Includes 
                    custom types for agentic UX elements like displaying diffs.
                  </p>
                </div>
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🔐 Trusted</h5>
                  <p className="text-sm text-muted-foreground">
                    Works when using a code editor to talk to a trusted model. Agent gets access 
                    to local files and MCP servers with controlled tool calls.
                  </p>
                </div>
              </div>

              {/* Setup Diagram */}
              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm">
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
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🖥️ Local Agents</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Run as sub-processes of the code editor, communicating via JSON-RPC over stdio.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Low latency, direct file access</li>
                    <li>• No network dependencies</li>
                    <li>• Editor manages agent lifecycle</li>
                  </ul>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">☁️ Remote Agents</h5>
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
              <div className="bg-muted/50 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-foreground">
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
              <div className="bg-muted text-foreground p-4 rounded-lg">
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

              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm">
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
                  <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-foreground mb-2">✅ Give Verification Criteria</h5>
                    <p className="text-sm text-muted-foreground">
                      Include tests, screenshots, or expected outputs so the agent can check itself. 
                      This is the single highest-leverage practice.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-foreground mb-2">✅ Explore → Plan → Code</h5>
                    <p className="text-sm text-muted-foreground">
                      Separate research and planning from implementation. Use Plan Mode 
                      (Claude Code) or ask to "make a plan first" before coding.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-foreground mb-2">✅ Provide Specific Context</h5>
                    <p className="text-sm text-muted-foreground">
                      Reference specific files, mention constraints, point to example patterns. 
                      The more precise, the fewer corrections needed.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-semibold text-foreground mb-2">✅ Clear Context Between Tasks</h5>
                    <p className="text-sm text-muted-foreground">
                      Long sessions with irrelevant context reduce performance. 
                      Start fresh for unrelated tasks.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h5 className="font-semibold text-foreground mb-2">❌ Over-specified Context Files</h5>
                    <p className="text-sm text-muted-foreground">
                      If your CLAUDE.md/AGENTS.md is too long, important rules get lost. 
                      Ruthlessly prune—if the agent already does it correctly, delete the instruction.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h5 className="font-semibold text-foreground mb-2">❌ Correcting Over and Over</h5>
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
                <div className="bg-muted text-foreground p-4 rounded-lg">
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
                <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
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
    },
    {
      id: 'ralph-method',
      title: 'The Ralph Method',
      description: 'Bash loop orchestration: a for-loop that runs a CLI agent against a task list',
      icon: <ArrowsCounterClockwise className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Learning Objectives */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsCounterClockwise className="w-5 h-5" />
                The Ralph Method: Bash Loop Orchestration
              </CardTitle>
              <CardDescription>
                The simplest pattern that actually works for long-running autonomous coding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-foreground">🎯 What You'll Learn</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Why a simple for-loop outperforms complex agent orchestrators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>The three-file architecture that drives the entire pattern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>How to design tasks that LLMs can reliably complete in one pass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Why feedback loops determine success or failure</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* The Core Insight */}
          <Card>
            <CardHeader>
              <CardTitle>The Core Insight: Work Like a Human Engineer</CardTitle>
              <CardDescription>
                The most effective agent pattern is also the most obvious one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Imagine a senior engineer joining your team mid-sprint. They don't try to rewrite 
                everything at once. They open the task board, pick the highest-priority ticket, 
                implement it, run the tests, commit, and move to the next one. If they get stuck, 
                they leave notes for tomorrow and start fresh.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>The Ralph Method is exactly this — but the engineer is an LLM, the task board is a JSON file, 
                and "starting fresh tomorrow" means resetting the context window.</strong>
              </p>

              <div className="bg-muted text-foreground p-5 rounded-lg border">
                <p className="text-sm font-mono text-center mb-1">
                  {`for i in {1..N}; do run_coding_agent "Pick a task, do it, commit it"; done`}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  No orchestrators. No swarms. No multi-phase plans. Just a loop, a task list, and a capable LLM.
                </p>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <img
                  src="/images/The_Ralph_Method.webp"
                  alt="The Ralph Method — overview diagram showing the bash loop orchestration pattern for CLI coding agents"
                  className="w-full"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h5 className="font-semibold text-foreground mb-2">📄 From the Source</h5>
                <p className="text-sm text-muted-foreground">
                  Anthropic's engineering team demonstrated this pattern by{" "}
                  <a href="https://www.anthropic.com/engineering/building-c-compiler" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
                    building an entire C compiler
                  </a>{" "}
                  using a bash loop driving Claude Code against a task backlog. The result: a working compiler 
                  built autonomously, one feature at a time, with each iteration starting from a clean context window.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why It Works — The Five Design Principles */}
          <Card>
            <CardHeader>
              <CardTitle>Why It Works: Five Design Principles</CardTitle>
              <CardDescription>
                Each principle solves a specific failure mode of long-running agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Anthropic's research on{" "}
                <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
                  effective harnesses for long-running agents
                </a>{" "}
                identifies core principles that make agent orchestration reliable. Ralph embodies all of them:
              </p>

              <div className="space-y-3">
                {[
                  {
                    num: "1",
                    title: "Context Window Hygiene",
                    problem: "Long conversations degrade LLM reasoning — attention drifts, instructions get buried, failed approaches pollute future attempts.",
                    solution: "Each Ralph iteration starts with a fresh context window. The only carry-over is what the agent deliberately wrote to progress.txt.",
                    color: "bg-amber-500"
                  },
                  {
                    num: "2",
                    title: "Task-Scoped Autonomy",
                    problem: "Agents given large goals produce sprawling, half-finished work across many files.",
                    solution: "Each iteration works on exactly ONE task from the PRD. The agent can't wander — it has a bounded objective with clear acceptance criteria.",
                    color: "bg-orange-500"
                  },
                  {
                    num: "3",
                    title: "Feedback-Driven Verification",
                    problem: "Without automated checks, agents silently produce broken code and mark tasks as complete.",
                    solution: "The prompt requires running type checks and tests before marking anything done. The agent's own output becomes its verification signal.",
                    color: "bg-red-500"
                  },
                  {
                    num: "4",
                    title: "Persistent Memory Without Context Cost",
                    problem: "Starting fresh means losing learnings. But keeping everything means overloading context.",
                    solution: "progress.txt acts as external memory — the agent appends what it learned, and future iterations read it. This is selective memory, not total recall.",
                    color: "bg-rose-500"
                  },
                  {
                    num: "5",
                    title: "Atomic Git Commits as Checkpoints",
                    problem: "If an iteration fails, how do you recover without losing all progress?",
                    solution: "Each completed task is a git commit. You can revert the last iteration, adjust the PRD, and re-run. Git history also helps the agent understand what was already built.",
                    color: "bg-yellow-600"
                  }
                ].map((principle) => (
                  <div key={principle.num} className="bg-muted/30 p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <span className={`${principle.color} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
                        {principle.num}
                      </span>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">{principle.title}</h5>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          <strong>Problem:</strong> {principle.problem}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          <strong>Solution:</strong> {principle.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
                <h5 className="font-semibold text-foreground mb-2">💡 The Deeper Pattern</h5>
                <p className="text-sm text-muted-foreground">
                  Notice what all five principles share: <strong>they trade sophistication for reliability</strong>. 
                  Ralph doesn't try to be clever. It doesn't plan 10 steps ahead. It just exhaustively, repeatedly 
                  does one thing well — the same way <code className="text-xs bg-muted px-1 rounded">make</code>, 
                  <code className="text-xs bg-muted px-1 rounded">cron</code>, and Unix pipelines have worked for decades. 
                  The most robust systems are often the most boring ones.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sprint-to-Task Structural Relationship */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                The Architecture: Sprint-to-Task Mapping
              </CardTitle>
              <CardDescription>
                How a flat JSON backlog becomes a series of autonomous sprints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden">
                <img
                  src="/images/Bash_loop_Sprint_to_Task_Structural_Relationship.webp"
                  alt="Bash loop Sprint to Task Structural Relationship — showing how iterations map to PRD tasks"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg border text-center">
                  <p className="text-2xl font-bold text-foreground">PRD.json</p>
                  <p className="text-xs text-muted-foreground mt-1">The task board — persists across iterations</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg border text-center">
                  <p className="text-2xl font-bold text-foreground">progress.txt</p>
                  <p className="text-xs text-muted-foreground mt-1">The memory — learnings survive context resets</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg border text-center">
                  <p className="text-2xl font-bold text-foreground">ralph.sh</p>
                  <p className="text-xs text-muted-foreground mt-1">The loop — the only orchestration you need</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Each loop iteration is a self-contained sprint: read the backlog → pick the highest-priority 
                incomplete item → implement with tests → mark done → commit → advance. The PRD.json acts as 
                a living Kanban board that persists state across context window resets. When all items show{" "}
                <code className="text-xs bg-muted px-1 rounded">passes: true</code>, the sentinel{" "}
                <code className="text-xs bg-muted px-1 rounded">RALPH_COMPLETE</code> triggers the loop to exit.
              </p>
            </CardContent>
          </Card>

          {/* Compositional Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="w-5 h-5" />
                The Feedback System: What Makes or Breaks Ralph
              </CardTitle>
              <CardDescription>
                An autonomous loop without verification is just an autonomous bug factory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden">
                <img
                  src="/images/Compositional_Balance_of_Task_Loop+Architecture.webp"
                  alt="Compositional Balance of Task Loop plus Architecture — showing the interplay between the Ralph loop and project feedback systems"
                  className="w-full"
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Ralph's quality is <strong>exactly proportional</strong> to the quality of your feedback loops. 
                The tighter the loop — how fast the agent gets a pass/fail signal — the more reliably it converges on correct implementations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <h5 className="font-semibold text-foreground mb-2">🟢 Fast & Essential</h5>
                  <p className="font-medium text-sm">Type Checking</p>
                  <pre className="text-xs bg-muted p-2 rounded mt-2"><code>{`pnpm typecheck
# or: npx tsc --noEmit`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">Sub-second feedback. Catches structural errors before execution. Non-negotiable for TypeScript projects.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h5 className="font-semibold text-foreground mb-2">🔵 Core Verification</h5>
                  <p className="font-medium text-sm">Unit Tests</p>
                  <pre className="text-xs bg-muted p-2 rounded mt-2"><code>{`pnpm test
# or: npx vitest run`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">The agent runs tests to verify its work. <strong>Non-flaky tests are critical</strong> — a flaky test confuses every iteration.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h5 className="font-semibold text-foreground mb-2">🟣 High-Fidelity (Optional)</h5>
                  <p className="font-medium text-sm">E2E via MCP</p>
                  <pre className="text-xs bg-muted p-2 rounded mt-2"><code>{`# Playwright MCP server
npx @anthropic/mcp-playwright`}</code></pre>
                  <p className="text-xs text-muted-foreground mt-2">The agent verifies features as a user would. Context-expensive — keep tasks small if using this.</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h5 className="font-semibold text-foreground mb-2">⚠️ The Iron Rule of Feedback</h5>
                <p className="text-sm text-muted-foreground">
                  If the agent can't verify its work programmatically, it <strong>will</strong> mark incomplete tasks as done. 
                  This is the #1 failure mode. Before running Ralph on any project, ask: 
                  <em>"Can a script tell me if this feature works?"</em> If the answer is no, add a test first.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reflection 1 */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-foreground mb-2">🧠 Pause and Reflect</h4>
            <p className="text-sm text-muted-foreground">
              Think about your current project. What percentage of your features have automated tests? 
              That percentage is roughly the upper bound on Ralph's reliability for your codebase. 
              If it's below 60%, consider writing tests first — Ralph can help with that too, 
              by making "write test for feature X" one of the PRD tasks.
            </p>
          </div>

          {/* Building It: Step by Step */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Build It: The Three-File Architecture
              </CardTitle>
              <CardDescription>
                Everything you need fits in a single directory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prerequisites */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• A CLI coding agent with headless/non-interactive mode (Claude Code, OpenCode, Codex, Gemini CLI)</li>
                  <li>• A codebase with type checking + tests (the feedback loops)</li>
                  <li>• Bash shell environment</li>
                  <li>• Git initialized in your project</li>
                </ul>
              </div>

              {/* File 1: PRD */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Badge variant="outline" className="text-base px-3">1</Badge>
                  <span>plans/prd.json — The Task Board</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your backlog as structured data. Each item is a user story with testable acceptance criteria. 
                  The <code className="text-xs bg-muted px-1 rounded">passes</code> flag is the only mutable field — 
                  the agent flips it to <code className="text-xs bg-muted px-1 rounded">true</code> when its work verifies.
                </p>
                <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                  <code>{`[
  {
    "id": 1,
    "story": "Delete video shows confirmation dialog",
    "acceptance_criteria": [
      "Clicking delete shows a modal confirmation",
      "User must confirm before video is removed",
      "Cancel button closes dialog without deleting"
    ],
    "passes": false
  },
  {
    "id": 2,
    "story": "Beat indicator shows as three orange dots",
    "acceptance_criteria": [
      "Add a beat to a clip",
      "Verify three orange dots appear below the clip"
    ],
    "passes": false
  }
]`}</code>
                </pre>
                <div className="bg-muted/50 p-3 rounded-lg border text-sm text-muted-foreground">
                  <strong>Design tip:</strong> Write acceptance criteria as if you're writing test assertions. 
                  "Verify X appears" is better than "X should work." The more concrete, the more reliable the agent's self-check.
                </div>
              </div>

              {/* File 2: Progress */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Badge variant="outline" className="text-base px-3">2</Badge>
                  <span>plans/progress.txt — The Agent's Memory</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  A free-text log where each iteration appends what it learned. This solves a fundamental tension: 
                  you want fresh context (clean reasoning) but also continuity (don't repeat mistakes). 
                  The progress file gives you both — <strong>selective memory, not total recall</strong>.
                </p>
                <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                  <code>{`# Sprint Progress Log

This file tracks learnings and context across loop iterations.
The LLM should APPEND to this file, not overwrite it.

---`}</code>
                </pre>
                <div className="bg-muted/50 p-3 rounded-lg border text-sm text-muted-foreground">
                  <strong>Anti-pattern:</strong> Don't seed progress.txt with pages of instructions. 
                  Keep it lean — the prompt has the instructions. This file is for <em>discoveries</em>: 
                  "The auth module uses a custom middleware at line 42" or "Don't touch shared/types.ts — it breaks the build."
                </div>
              </div>

              {/* File 3: The Script */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Badge variant="outline" className="text-base px-3">3</Badge>
                  <span>plans/ralph.sh — The Loop</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  The orchestrator — remarkably, it's just a bash for-loop. It feeds the PRD and progress file 
                  to the agent, captures output, checks for the completion sentinel, and either loops or exits.
                </p>
                <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                  <code>{`#!/bin/bash
set -e

MAX_ITERATIONS=$1

for ((i=1; i<=MAX_ITERATIONS; i++)); do
  echo "=== Ralph Loop Iteration $i of $MAX_ITERATIONS ==="

  OUTPUT=$(claude --print \\
    plans/prd.json \\
    plans/progress.txt \\
    --prompt "You are working through a PRD.

1. Find the highest priority incomplete task
2. Implement it with proper tests
3. Mark it as passes: true in prd.json
4. APPEND progress to progress.txt
5. Git commit the work

If ALL items pass, output: RALPH_COMPLETE")

  echo "$OUTPUT"

  if echo "$OUTPUT" | grep -q "RALPH_COMPLETE"; then
    echo "All PRD items complete after $i iterations!"
    exit 0
  fi
done

echo "Reached max iterations ($MAX_ITERATIONS)"}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* The Prompt: Design Matters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="w-5 h-5" />
                The Prompt: Why Every Word Matters
              </CardTitle>
              <CardDescription>
                The inner prompt is the soul of Ralph — it shapes every autonomous decision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The prompt you pass to the agent on each iteration is the most leveraged piece of text in the system. 
                A small wording change can dramatically affect behavior across dozens of iterations. Here are the critical elements:
              </p>

              <div className="space-y-3">
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h5 className="font-semibold text-foreground text-sm mb-1">"Find the highest priority feature to work on"</h5>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why it works:</strong> Saying "highest priority <em>YOU decide</em>" prevents the agent from always picking task #1. 
                    It forces the LLM to reason about dependencies and logical ordering — task 3 might depend on task 2, 
                    so the agent learns to sequence correctly.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h5 className="font-semibold text-foreground text-sm mb-1">"Work only on that ONE feature"</h5>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why it works:</strong> Without this constraint, agents tend to "helpfully" touch adjacent tasks. 
                    Bounding scope to one task keeps changes small, reviewable, and revertible.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h5 className="font-semibold text-foreground text-sm mb-1">"Check that types pass / tests pass"</h5>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why it works:</strong> This turns the prompt into a contract — the agent must prove its work before marking done. 
                    Without this line, you get "trust me" completions instead of "I verified" completions.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h5 className="font-semibold text-foreground text-sm mb-1">"APPEND your progress to progress.txt"</h5>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why it works:</strong> This creates institutional memory. The next iteration reads these notes. 
                    Over time, progress.txt becomes a rich engineering log of decisions, gotchas, and code structure.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h5 className="font-semibold text-foreground text-sm mb-1">"If ALL PRD items pass, output: RALPH_COMPLETE"</h5>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why it works:</strong> A deterministic sentinel lets the bash script know when to stop. 
                    Without it, you'd need complex output parsing. With it, a simple <code className="text-xs bg-muted px-1 rounded">grep</code> handles termination.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Operating Modes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Two Modes: AFK and Supervised
              </CardTitle>
              <CardDescription>
                Choose your level of trust — and adjust as the agent proves itself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-lg border border-green-200 dark:border-green-700">
                  <h4 className="font-semibold text-foreground mb-2">🌙 AFK Mode</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set it running and walk away. Come back to completed features, committed and tested.
                  </p>
                  <pre className="bg-muted text-foreground p-3 rounded text-sm">
                    <code>{`plans/ralph.sh 20`}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    Up to 20 iterations. Stops early on <code className="text-xs bg-muted/50 px-1 rounded">RALPH_COMPLETE</code>.
                  </p>
                  <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                    <p className="text-xs text-muted-foreground"><strong>Best for:</strong> Well-tested codebases, clear PRDs, overnight runs. Start with 5 iterations until you trust the results.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-foreground mb-2">👀 Human-in-Loop Mode</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Run one iteration interactively. Review, steer, then run the next.
                  </p>
                  <pre className="bg-muted text-foreground p-3 rounded text-sm">
                    <code>{`plans/ralph_once.sh`}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    No <code className="text-xs bg-muted/50 px-1 rounded">--print</code> flag — you can intervene mid-task.
                  </p>
                  <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                    <p className="text-xs text-muted-foreground"><strong>Best for:</strong> New projects, complex domains, first-time Ralph users. Graduate to AFK mode as confidence builds.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                <h5 className="font-semibold text-foreground mb-2">💡 The Trust Ladder</h5>
                <p className="text-sm text-muted-foreground">
                  Start supervised. Once 3-4 iterations complete cleanly, switch to AFK mode with a low iteration cap (5). 
                  Once a full sprint completes autonomously, increase to 10-20. This is how you calibrate trust — 
                  the same way you'd gradually give a new team member more autonomy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Task Sizing — The Make or Break */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Task Design: The #1 Success Factor
              </CardTitle>
              <CardDescription>
                If you get task sizing wrong, nothing else matters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The quality of your PRD tasks determines everything. A well-decomposed backlog with 20 small tasks 
                will outperform 5 large tasks every time — because each small task fits cleanly in one context window 
                and produces a single, reviewable commit.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <h5 className="font-semibold text-foreground mb-2">❌ Tasks That Fail</h5>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>"Build the entire authentication system" <em className="text-xs">(too many moving parts)</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>"Refactor the database layer" <em className="text-xs">(scope is unbounded)</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>"Make the app faster" <em className="text-xs">(no acceptance criteria possible)</em></span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <h5 className="font-semibold text-foreground mb-2">✅ Tasks That Succeed</h5>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>"Login form validates email format" <em className="text-xs">(one behavior, testable)</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>"Login button shows loading spinner during API call" <em className="text-xs">(visual, verifiable)</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>"Failed login displays error message from API" <em className="text-xs">(clear input/output)</em></span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-amber-50 dark:from-slate-900 dark:to-amber-900/20 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3">The Decomposition Test</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  For each PRD item, ask these four questions. If any answer is "no," decompose further:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                    <span><strong>Testable?</strong> Can a script verify this works?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                    <span><strong>Bounded?</strong> Can one engineer finish this in an hour?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                    <span><strong>Independent?</strong> Does it work without completing other tasks first?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                    <span><strong>Committable?</strong> Will the codebase be stable after just this change?</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* When NOT to Use Ralph */}
          <Card>
            <CardHeader>
              <CardTitle>When Ralph Is Not the Right Tool</CardTitle>
              <CardDescription>
                Knowing when to reach for a different approach is as important as the technique itself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">🚫 Poor Fit</h5>
                  <div className="space-y-2">
                    {[
                      { scenario: "Exploratory prototyping", why: "You don't know what \"done\" looks like yet — interactive mode is better" },
                      { scenario: "Tasks requiring human judgment", why: "UI polish, copy editing, design decisions need human eyes" },
                      { scenario: "Zero test coverage", why: "The agent can't verify its work — you'll get false completions" },
                      { scenario: "Tightly coupled changes", why: "If task B requires the exact output of task A, serial dependency breaks the pattern" }
                    ].map((item, i) => (
                      <div key={i} className="bg-red-50/50 dark:bg-red-900/10 p-3 rounded-lg text-sm">
                        <p className="font-medium text-foreground">{item.scenario}</p>
                        <p className="text-xs text-muted-foreground">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">✅ Excellent Fit</h5>
                  <div className="space-y-2">
                    {[
                      { scenario: "Feature backlogs with clear specs", why: "The classic Ralph use case — known tasks, testable criteria" },
                      { scenario: "Test suite expansion", why: "\"Write test for X\" tasks are perfectly bounded and verifiable" },
                      { scenario: "Migration work", why: "\"Convert component X from class to function\" — repetitive, mechanical, verifiable" },
                      { scenario: "Bug fix backlogs", why: "Each bug has a reproduction case that becomes the acceptance criteria" }
                    ].map((item, i) => (
                      <div key={i} className="bg-green-50/50 dark:bg-green-900/10 p-3 rounded-lg text-sm">
                        <p className="font-medium text-foreground">{item.scenario}</p>
                        <p className="text-xs text-muted-foreground">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adapting for Other Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plugs className="w-5 h-5" />
                Agent-Agnostic: Swap the Inner Command
              </CardTitle>
              <CardDescription>
                Ralph is the pattern, not the agent — any CLI tool with headless mode works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The only requirement is that your agent supports non-interactive mode so the bash loop can capture output 
                and check for the <code className="text-xs bg-muted px-1 rounded">RALPH_COMPLETE</code> sentinel:
              </p>
              <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                <code>{`# Claude Code (the original Ralph agent)
claude --print plans/prd.json plans/progress.txt --prompt "..."

# OpenCode
opencode --non-interactive --prompt "..."

# Codex CLI
codex --approval-mode full-auto -q "..."

# Gemini CLI
gemini -p "..." --output-format stream-json

# GitHub Copilot CLI (via gh extension)
gh copilot suggest "..."`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting: When Ralph Misbehaves</CardTitle>
              <CardDescription>Diagnose and fix the most common failure modes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { problem: 'Agent always picks the first task', solution: 'Reword prompt: "Pick the highest priority task — use YOUR judgment on ordering, not list position."', severity: 'low' },
                  { problem: 'Agent marks incomplete work as done', solution: 'Add explicit verification: "You MUST run tests and include the pass/fail output before marking any task complete."', severity: 'high' },
                  { problem: 'Context window exhausted mid-task', solution: 'The task is too large. Decompose it into 2-3 smaller tasks in the PRD. If a single task needs more than ~50% of the context window, it\'s too big.', severity: 'high' },
                  { problem: 'Merge conflicts between iterations', solution: 'Ralph must be the only writer. Never run two Ralph instances in parallel. Serial execution is the design.', severity: 'medium' },
                  { problem: 'Agent produces poor code quality', solution: 'Add linting to the verification step: "Run pnpm lint and fix any issues before committing." Consider adding a .cursorrules or CLAUDE.md with style guidelines.', severity: 'medium' },
                  { problem: 'progress.txt grows too large', solution: 'Clear it between sprints (keep a backup). Or add to the prompt: "Keep your progress entry under 10 lines — focus on discoveries, not summaries."', severity: 'low' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                    <Badge 
                      variant="outline" 
                      className={`mt-0.5 shrink-0 ${
                        item.severity === 'high' ? 'text-red-600 border-red-300' : 
                        item.severity === 'medium' ? 'text-amber-600 border-amber-300' : 
                        'text-blue-600 border-blue-300'
                      }`}
                    >
                      {item.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.problem}</p>
                      <p className="text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reflection 2 */}
          <Card>
            <CardHeader>
              <CardTitle>🤔 A Question to Carry Forward</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="text-center space-y-4">
                  <p className="text-lg leading-relaxed text-foreground">
                    Ralph works because it <strong>trades sophistication for reliability</strong>. 
                    A for-loop is less impressive than a multi-agent swarm — but it ships working code overnight.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    What other problems in your workflow could be solved not by building something more complex, 
                    but by building something more boring?
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-muted-foreground pt-2">
                    <Badge variant="outline">No orchestrators</Badge>
                    <Badge variant="outline">No swarms</Badge>
                    <Badge variant="outline">No multi-phase plans</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Just a loop, a task list, and a capable LLM. Elegance through simplicity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" />

          <EnlightenMeButton
            title="The Ralph Method"
            contextDescription="Bash loop orchestration pattern for CLI coding agents — design principles, task sizing, feedback loops, and when to use it"
          />
        </div>
      )
    },
    {
      id: 'research-insights',
      title: 'Research Insights',
      description: 'What real-world data reveals about AI coding challenges',
      icon: <ChartBarHorizontal className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBarHorizontal className="w-5 h-5" />
                The Hidden Architecture of AI Coding Agents
              </CardTitle>
              <CardDescription>
                What Stack Overflow and GitHub data reveals about real-world challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                As we move from Copilot's autocomplete to Claude Code's autonomous workflows, 
                research analyzing Stack Overflow and GitHub data reveals a crucial pattern: 
                <strong>master the foundation before building skyscrapers</strong>.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-muted-foreground">
                  📄 <strong>Source:</strong>{" "}
                  <a 
                    href="https://arxiv.org/pdf/2510.25423" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                  >
                    arxiv.org/pdf/2510.25423
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Three Phases */}
          <Card>
            <CardHeader>
              <CardTitle>Three Phases of Escalating Complexity</CardTitle>
              <CardDescription>
                How developer challenges evolve as they adopt AI coding tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Phase 1 */}
                <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">Phase 1</Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Foundation Issues</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manual debugging and runtime problems dominate
                  </p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    46%
                  </div>
                  <p className="text-xs text-muted-foreground">of reported problems</p>
                </div>

                {/* Phase 2 */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500">Phase 2</Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Prompt Engineering</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Getting the AI to do what you actually want
                  </p>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    56%
                  </div>
                  <p className="text-xs text-muted-foreground">of issues involve prompts</p>
                </div>

                {/* Phase 3 */}
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">Phase 3</Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Orchestration & RAG</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Vector stores, retrieval, multi-agent systems
                  </p>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    30%+
                  </div>
                  <p className="text-xs text-muted-foreground">of advanced challenges</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
                <h5 className="font-semibold text-foreground mb-2">🎯 Key Insight</h5>
                <p className="text-sm text-muted-foreground">
                  While code generation has become more automated, we're seeing the emergence of 
                  three new specializations: <strong>prompt engineers</strong>, <strong>embedding architects</strong>, 
                  and <strong>orchestration designers</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* The Skyscraper Analogy */}
          <Card>
            <CardHeader>
              <CardTitle>🏗️ The Skyscraper Analogy</CardTitle>
              <CardDescription>
                GitHub taxonomy research maps AI coding issues to building construction layers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Flowchart Image */}
              <div className="border border-border rounded-lg overflow-hidden">
                <img 
                  src="/images/Github_issues_taxonomy_analogy_flowchart.jpg" 
                  alt="GitHub Issues Taxonomy Analogy Flowchart - mapping AI coding challenges to building construction layers" 
                  className="w-full"
                />
              </div>

              {/* Layers Breakdown */}
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Foundation</h5>
                    <p className="text-sm text-muted-foreground">Platform integrations, dependencies, runtime failures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Core Structure</h5>
                    <p className="text-sm text-muted-foreground">Embeddings, model inconsistencies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Building Management</h5>
                    <p className="text-sm text-muted-foreground">Agent orchestration, invocation logic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Safety & Compliance</h5>
                    <p className="text-sm text-muted-foreground">Error handling, policy enforcement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">5</div>
                  <div>
                    <h5 className="font-semibold text-foreground">User Experience</h5>
                    <p className="text-sm text-muted-foreground">Workflow UI, configurability</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-4">
                <h5 className="font-semibold text-foreground mb-2">⚠️ Worth Considering</h5>
                <p className="text-sm text-muted-foreground">
                  Many teams are implementing advanced features (multi-agent RAG) while foundational 
                  challenges remain active. <strong>Dependency conflicts account for 20-49% across all phases</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stack Overflow Data Lens */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Stack Overflow Data Lens</CardTitle>
              <CardDescription>
                What developers actually struggle with, measured by questions asked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Lens Image */}
              <div className="border border-border rounded-lg overflow-hidden">
                <img 
                  src="/images/Stackoverflow_Data_lens.jpg" 
                  alt="Stack Overflow Data Lens - visualization of developer questions and challenges with AI coding tools" 
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">🔧 42% Correctness Concerns</h5>
                  <p className="text-sm text-muted-foreground">
                    Nearly half of questions relate to verifying that AI-generated code actually works correctly.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">📦 18% Vector Store Management</h5>
                  <p className="text-sm text-muted-foreground">
                    Phase 3 developers juggle database management, DevOps, prompt engineering, and coding simultaneously.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thoughtful Path Forward */}
          <Card>
            <CardHeader>
              <CardTitle>🛤️ A Thoughtful Path Forward</CardTitle>
              <CardDescription>
                Data-driven approach to building your AI coding skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Start with Prompt Engineering</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      56% of Phase 2 issues are prompt-related. Think of this as your <strong>architectural blueprint</strong>—master 
                      it before building anything complex.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Develop Robust Evaluation</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      With 42% correctness concerns, automated verification isn't optional—it's essential for scaling effectively.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-amber-50 dark:from-green-900/20 dark:to-amber-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Then Build Upward</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Orchestration and RAG become much more manageable when you have solid prompting and evaluation foundations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Systematize Operations</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automate recurring issues rather than repeatedly addressing them manually. Build once, benefit forever.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflection Question */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle>🤔 A Question to Reflect On</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-foreground border-l-4 border-primary pl-4 py-2">
                "Are we building on solid ground, or might we benefit from strengthening each layer before adding the next?"
              </blockquote>
              <p className="text-sm text-muted-foreground mt-4">
                The organizations finding success aren't necessarily those adopting autonomous agents fastest—they're often 
                those recognizing that <strong>AI coding infrastructure shares principles with construction engineering</strong>.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                The evolution from Copilot to autonomous agents represents more than a feature upgrade—it's an 
                <strong>architectural transformation</strong> that invites us to rethink our entire development stack from the ground up.
              </p>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <h5 className="font-semibold text-foreground mb-2">💭 What layer is your organization focused on?</h5>
                <p className="text-sm text-muted-foreground">
                  Consider where your team spends most of its time: Foundation (dependencies, runtime), 
                  Structure (embeddings, models), Management (orchestration), Safety (error handling), 
                  or Experience (workflows, UI)?
                </p>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="client-coding-agents" />

          <EnlightenMeButton
            title="Research Insights"
            contextDescription="Data-driven insights about AI coding agent adoption challenges"
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









