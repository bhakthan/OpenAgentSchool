import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "../references/ReferenceSection"
import SubagentSkillsMCPComparison from "../visualization/SubagentSkillsMCPComparison"
import { PuzzlePiece, FileCode, FolderOpen, Robot, Lightning, Code, BookOpen, ArrowsClockwise, Sparkle, CheckCircle, Warning, Brain, Image } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

interface AgentSkillsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentSkillsConcept({ onMarkComplete, onNavigateToNext }: AgentSkillsConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('agent-skills');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    {
      id: 'overview',
      title: 'What Are Skills?',
      description: 'Extending AI agents with reusable expertise',
      icon: <PuzzlePiece className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PuzzlePiece className="w-5 h-5" />
                Agent Skills: Modular Expertise for AI Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Agent Skills are a lightweight, open format for extending AI agent capabilities 
                with specialized knowledge and workflows. At its core, a skill is a folder 
                containing a <code className="bg-muted px-1 rounded">SKILL.md</code> file 
                with metadata and instructions that tell an agent how to perform a specific task.
              </p>
              
              {/* Hero image */}
              <div className="my-4">
                <img 
                  src="/images/agent_skills.jpg" 
                  alt="Agent Skills architecture diagram showing modular skill components" 
                  className="w-full rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
                />
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-md border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold mb-3 text-foreground">Why Skills?</h4>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Specialize Claude:</strong> Tailor capabilities for domain-specific tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Reduce repetition:</strong> Create once, use automatically across sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Compose capabilities:</strong> Combine skills to build complex workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Progressive disclosure:</strong> Load context on-demand, not upfront</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Skill Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Skill Structure
              </CardTitle>
              <CardDescription>
                A skill is a folder with a SKILL.md file and optional resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm">
                <pre>{`my-skill/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources`}</pre>
              </div>

              {/* SKILL.md Structure */}
              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  The SKILL.md File
                </h4>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                  <code>{`---
name: pdf-processing
description: Extract text and tables from PDF files, 
  fill forms, merge documents. Use when working with 
  PDF files or when the user mentions PDFs.
---

# PDF Processing

## When to use this skill
Use this skill when the user needs to work with PDF files...

## How to extract text
1. Use pdfplumber for text extraction...

## How to fill forms
...`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-3">
                  Required frontmatter: <code>name</code> (identifier) and <code>description</code> (when to use)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How Skills Work */}
          <Card>
            <CardHeader>
              <CardTitle>How Skills Work: Progressive Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Discovery (Startup)</h4>
                    <p className="text-lg text-muted-foreground">
                      Agent loads only the <strong>name</strong> and <strong>description</strong> from 
                      all available skills—just enough to know when each might be relevant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Activation (Triggered)</h4>
                    <p className="text-lg text-muted-foreground">
                      When a task matches a skill's description, the agent reads the full 
                      <strong> SKILL.md</strong> instructions into context.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Execution (As Needed)</h4>
                    <p className="text-lg text-muted-foreground">
                      The agent follows instructions, optionally loading referenced files 
                      or executing bundled scripts as needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                <p className="text-sm text-foreground">
                  <strong>Key insight:</strong> This approach keeps agents fast while giving them 
                  access to more context on demand. Unlike prompts that load every session, 
                  skills only consume tokens when actually needed.
                </p>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="agent-skills" />

          <EnlightenMeButton
            title="What Are Agent Skills?"
            contextDescription="Understanding modular expertise extensions for AI agents"
          />
        </div>
      )
    },
    {
      id: 'comparison',
      title: 'Skills vs Subagents vs Tools vs MCP',
      description: 'Understand how these patterns complement each other',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Interactive Comparison Visualization */}
          <SubagentSkillsMCPComparison autoPlay={false} />

          {/* When to Use Each */}
          <Card>
            <CardHeader>
              <CardTitle>When to Use Each Pattern</CardTitle>
              <CardDescription>
                Choose the right tool for the job
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-amber-200 dark:border-amber-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🤖 Use Subagents When...</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Complex research needs parallel exploration</li>
                    <li>• Task requires separate conversation context</li>
                    <li>• You want to keep main context clean</li>
                    <li>• Multiple independent investigations needed</li>
                  </ul>
                </div>
                <div className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🧩 Use Skills When...</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You have reusable domain expertise</li>
                    <li>• Workflows should trigger automatically</li>
                    <li>• Context should be added on-demand</li>
                    <li>• You want consistent behavior patterns</li>
                  </ul>
                </div>
                <div className="border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <h5 className="font-semibold mb-2 text-foreground">🔧 Use Tools When...</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• A discrete action is needed (read, write, query)</li>
                    <li>• Operation has typed inputs/outputs</li>
                    <li>• Agent needs to interact with external systems</li>
                    <li>• Stateless, one-shot execution is appropriate</li>
                  </ul>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-muted/50">
                  <h5 className="font-semibold mb-2 text-foreground">🔌 Use MCP When...</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You want standardized tool exposure</li>
                    <li>• Multiple agents share the same tools</li>
                    <li>• You need secure, protocol-based access</li>
                    <li>• Tools should be discoverable and typed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Composing Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                Composing Patterns Together
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                These patterns aren't mutually exclusive—they compose beautifully:
              </p>
              
              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm">
                <pre>{`User: "Research competitor APIs and draft integration plan"

┌─────────────────────────────────────────────────────┐
│ Main Agent (with integration-planning SKILL)        │
│   ├── Spawns Subagent for competitor research      │
│   │     └── Calls Tools: search_web, read_docs     │
│   ├── Skill guides structured output format        │
│   └── Calls Tools via MCP: write_file(plan.md)    │
└─────────────────────────────────────────────────────┘`}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Example: Code Review Workflow</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Skill:</strong> code-review SKILL.md defines review criteria</li>
                    <li><strong>Tools:</strong> read_file(), get_diff(), add_comment()</li>
                    <li><strong>MCP:</strong> Git MCP server exposes tools to agent</li>
                    <li><strong>Subagent:</strong> Parallel security analysis in separate context</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Example: Documentation Generation</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Skill:</strong> docs-generator SKILL.md defines format</li>
                    <li><strong>Tools:</strong> read_file(), write_file(), list_dir()</li>
                    <li><strong>MCP:</strong> Filesystem MCP provides the tools</li>
                    <li><strong>Subagent:</strong> Parallel API reference extraction</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infographic Visual */}
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Image size={24} className="text-purple-500" />
              Visual Reference: The Four Powers of AI Agents
            </h3>
            <p className="text-muted-foreground mb-4">
              This quadrant-based infographic summarizes the key differences between Skills, Tools, Subagents, and MCP—helping you remember when to use each pattern.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img 
                src="/images/Agent_Skills_Tool_MCP_SubAgents.webp" 
                alt="Infographic comparing Subagents, Skills, Tools, and MCP - showing their unique capabilities, integration points, and use cases in AI agent architectures"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Decision Framework Image */}
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Image size={24} className="text-blue-500" />
              Decision Framework: Choosing the Right Pattern
            </h3>
            <p className="text-muted-foreground mb-4">
              Use this decision flowchart to quickly determine which agent architecture pattern fits your specific use case.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img 
                src="/images/Agent_Architecture_Decision_Framework.webp" 
                alt="Decision framework flowchart for choosing between Skills, Tools, Subagents, and MCP based on requirements"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <EnlightenMeButton
            title="Skills vs Subagents vs Tools vs MCP"
            contextDescription="Understanding how these four agent extension patterns work together"
          />
        </div>
      )
    },
    {
      id: 'claude-skills',
      title: 'Claude Skills',
      description: 'Skills for Claude Code and Claude API',
      icon: <Robot className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="w-5 h-5 text-amber-600" />
                Claude Skills
              </CardTitle>
              <CardDescription>
                Skills system for Claude Code, Claude.ai, and the Claude API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Anthropic provides both pre-built Agent Skills for common document tasks 
                (PowerPoint, Excel, Word, PDF) and the ability to create custom skills 
                for domain-specific workflows.
              </p>

              {/* Pre-built Skills */}
              <div className="bg-muted/50 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                <h4 className="font-semibold mb-3 text-foreground">📦 Pre-built Agent Skills</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded text-center">
                    <span className="text-2xl">📊</span>
                    <p className="text-sm font-medium mt-1">PowerPoint</p>
                    <code className="text-xs text-muted-foreground">pptx</code>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded text-center">
                    <span className="text-2xl">📈</span>
                    <p className="text-sm font-medium mt-1">Excel</p>
                    <code className="text-xs text-muted-foreground">xlsx</code>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded text-center">
                    <span className="text-2xl">📝</span>
                    <p className="text-sm font-medium mt-1">Word</p>
                    <code className="text-xs text-muted-foreground">docx</code>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded text-center">
                    <span className="text-2xl">📄</span>
                    <p className="text-sm font-medium mt-1">PDF</p>
                    <code className="text-xs text-muted-foreground">pdf</code>
                  </div>
                </div>
              </div>

              {/* Where Skills Work */}
              <h4 className="font-semibold mt-6">Where Claude Skills Work</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Claude Code</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create skills as directories with SKILL.md in <code>.claude/skills/</code>
                  </p>
                  <Badge variant="secondary">Custom Skills</Badge>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Claude.ai</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pre-built skills work automatically. Upload custom skills via Settings.
                  </p>
                  <Badge variant="secondary">Pre-built + Custom</Badge>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Claude API</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Use skill_id in container parameter. Upload via /v1/skills endpoints.
                  </p>
                  <Badge variant="secondary">Pre-built + Custom</Badge>
                </div>
              </div>

              {/* Claude Code Skills */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Creating Skills in Claude Code
                </h4>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Create skill directory
mkdir -p .claude/skills/api-conventions

# Create SKILL.md
cat > .claude/skills/api-conventions/SKILL.md << 'EOF'
---
name: api-conventions
description: REST API design conventions for our services
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON properties
- Always include pagination for list endpoints
- Version APIs in the URL path (/v1/, /v2/)
EOF`}</code>
                </pre>
              </div>

              {/* Workflow Skills */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-3">Workflow Skills with Arguments</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Define repeatable workflows you invoke directly with <code>/skill-name args</code>:
                </p>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                  <code>{`---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---
Analyze and fix the GitHub issue: $ARGUMENTS.

1. Use \`gh issue view\` to get issue details
2. Understand the problem described
3. Search codebase for relevant files
4. Implement necessary changes
5. Write and run tests
6. Create a descriptive commit
7. Push and create a PR`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  Invoke with: <code>/fix-issue 1234</code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Installing from Marketplace */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Marketplace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Install skills from the Anthropic skills repository or community sources:
              </p>
              <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                <code>{`# Add marketplace in Claude Code
/plugin marketplace add anthropics/skills

# Browse and install
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills`}</code>
              </pre>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">anthropics/skills</Badge>
                <Badge variant="outline">Document Skills</Badge>
                <Badge variant="outline">PDF Processing</Badge>
                <Badge variant="outline">Excel Analysis</Badge>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Claude Skills"
            contextDescription="Skills system for Claude Code and Claude API"
          />
        </div>
      )
    },
    {
      id: 'create-skill',
      title: 'Create Your First Skill',
      description: 'Hands-on walkthrough: building a practical skill',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-purple-600" />
                Skill Creation Walkthrough
              </CardTitle>
              <CardDescription>
                Build a "git-commit-messages" skill that writes meaningful commits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Let's create a practical skill from scratch: a <strong>git-commit-messages</strong> skill 
                that helps Claude write consistent, meaningful commit messages following 
                conventional commits format. This walkthrough follows the 6-step process 
                from Anthropic's skill-creator meta-skill.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-md border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold mb-2">The 6-Step Skill Creation Process</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">1</span>
                    <span>Understand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">2</span>
                    <span>Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">3</span>
                    <span>Initialize</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">4</span>
                    <span>Edit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">5</span>
                    <span>Package</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">6</span>
                    <span>Iterate</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Understand */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">1</span>
                Understand the Skill
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                First, deeply understand what the skill should do. List concrete examples 
                of user requests that should trigger this skill.
              </p>

              <div className="bg-muted text-foreground p-4 rounded-lg">
                <h5 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Example User Requests</h5>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">💬</span>
                    <span className="text-sm italic text-foreground/80">"Write a commit message for these changes"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">💬</span>
                    <span className="text-sm italic text-foreground/80">"Help me write a conventional commit for this feature"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">💬</span>
                    <span className="text-sm italic text-foreground/80">"Format my commit message using conventional commits"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">💬</span>
                    <span className="text-sm italic text-foreground/80">"I just finished the auth refactor, what should I commit?"</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h5 className="font-semibold text-foreground mb-2">Key Insight: Description is Primary Trigger</h5>
                <p className="text-sm text-muted-foreground">
                  The skill's <code>description</code> is the main way Claude matches user requests to skills. 
                  Include concrete scenarios and keywords users would actually say.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">2</span>
                Plan the Skill Contents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Decide what resources the skill needs: scripts, references, assets. 
                Remember: progressive disclosure means Claude only loads what's needed.
              </p>

              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm">
                <pre>{`writing-git-commits/
├── SKILL.md              # Instructions + conventional format
├── references/
│   └── EXAMPLES.md       # Real-world commit examples
└── scripts/
    └── analyze_diff.py   # Parse git diff for context`}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border border-green-200 dark:border-green-700 p-3 rounded-lg bg-muted/50">
                  <h5 className="font-semibold text-foreground mb-1">SKILL.md</h5>
                  <p className="text-xs text-muted-foreground">
                    Conventional commits format, commit types, scopes, body guidelines
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 p-3 rounded-lg bg-muted/50">
                  <h5 className="font-semibold text-foreground mb-1">references/</h5>
                  <p className="text-xs text-muted-foreground">
                    Examples of good commits, edge cases, multi-line bodies
                  </p>
                </div>
                <div className="border border-purple-200 dark:border-purple-700 p-3 rounded-lg bg-muted/50">
                  <h5 className="font-semibold text-foreground mb-1">scripts/</h5>
                  <p className="text-xs text-muted-foreground">
                    Optional: parse diffs, extract file names, detect change type
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 & 4: Initialize & Edit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">3</span>
                <span className="mr-2">Initialize</span>
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">4</span>
                <span>Edit the Skill</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Create the skill directory and write the SKILL.md file. This is the heart of your skill.
              </p>

              <div className="bg-muted text-foreground p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  Complete SKILL.md Example
                </h5>
                <pre className="bg-muted text-foreground p-4 rounded text-sm overflow-x-auto whitespace-pre">
                  <code>{`---
name: writing-git-commits
description: >
  Write conventional commit messages for Git. Use when the user asks
  to write a commit message, format a commit, or needs help with
  conventional commits. Analyzes staged changes to suggest appropriate
  commit type, scope, and description.
---

# Writing Git Commit Messages

Generate commit messages using conventional commits format.

## Format

\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
\`\`\`

## Commit Types

| Type | Purpose |
|------|---------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation only |
| style | Formatting, no code change |
| refactor | Restructure without behavior change |
| perf | Performance improvement |
| test | Add or update tests |
| chore | Build, config, dependency updates |

## Process

1. Examine staged changes with \`git diff --staged\`
2. Identify the primary change type
3. Determine scope from changed files/modules
4. Write a concise imperative description (50 chars max)
5. Add body for complex changes (wrap at 72 chars)

## Examples

See [references/EXAMPLES.md](references/EXAMPLES.md) for real-world examples.

## Rules

- Use imperative mood: "add feature" not "added feature"
- No period at end of subject line
- Capitalize first letter of description
- One logical change per commit`}</code>
                </pre>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="flex items-center gap-2 mb-2">
                  <Warning className="w-5 h-5 text-amber-600" />
                  <h5 className="font-semibold text-foreground">Keep It Concise</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  SKILL.md body should stay under 500 lines. Use references/ for detailed 
                  documentation that Claude loads only when needed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Package */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">5</span>
                Package the Skill
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Install the skill where Claude can find it. Location depends on your Claude environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Claude Code (Local)</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                    <code>{`# Copy to project skills folder
cp -r writing-git-commits/ \\
  .claude/skills/

# Or to global skills
cp -r writing-git-commits/ \\
  ~/.claude/skills/`}</code>
                  </pre>
                </div>

                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Claude API</h5>
                  <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                    <code>{`# Zip the skill directory
zip -r commit-skill.zip \\
  writing-git-commits/

# Upload via API
curl -X POST \\
  https://api.anthropic.com/v1/skills \\
  -H "x-api-key: $KEY" \\
  -F "file=@commit-skill.zip"`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h5 className="font-semibold text-foreground">Test Your Skill</h5>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  After installation, test with the trigger phrases you identified in Step 1:
                </p>
                <code className="text-sm bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                  "Help me write a commit message for these changes"
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Step 6: Iterate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">6</span>
                Iterate Based on Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Real usage reveals gaps. Refine your skill based on actual interactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <ArrowsClockwise className="w-4 h-4" />
                    Common Iterations
                  </h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Add missing trigger keywords to description</li>
                    <li>• Include edge cases that came up</li>
                    <li>• Add scripts for automation</li>
                    <li>• Split into multiple skills if scope creeps</li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    For This Skill
                  </h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Added monorepo scope patterns</li>
                    <li>• Script to parse PR descriptions</li>
                    <li>• Breaking change footer examples</li>
                    <li>• Team-specific type prefixes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg mt-4">
                <h5 className="font-semibold mb-2">🎉 You've Created a Skill!</h5>
                <p className="text-sm text-muted-foreground">
                  Your <code>writing-git-commits</code> skill now automatically activates 
                  when users ask for commit message help. Claude will follow your format 
                  guidelines and reference your examples—every time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* More Skill Ideas */}
          <Card>
            <CardHeader>
              <CardTitle>More Skill Ideas to Try</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🔍 reviewing-code</h5>
                  <p className="text-sm text-muted-foreground">
                    Team code review conventions, common anti-patterns, security checks
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📝 writing-api-docs</h5>
                  <p className="text-sm text-muted-foreground">
                    OpenAPI style, request/response examples, error code formatting
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">🧪 generating-tests</h5>
                  <p className="text-sm text-muted-foreground">
                    Test framework conventions, mocking patterns, coverage expectations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Creating Agent Skills"
            contextDescription="Hands-on skill creation walkthrough"
          />
        </div>
      )
    },
    {
      id: 'copilot-skills',
      title: 'Copilot Skills',
      description: 'Skills for GitHub Copilot CLI',
      icon: <Lightning className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                GitHub Copilot Skills
              </CardTitle>
              <CardDescription>
                Extending GitHub Copilot CLI with specialized capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                GitHub Copilot CLI supports the same SKILL.md format, enabling you to create 
                specialized capabilities for your development workflows. The awesome-copilot 
                repository contains a growing collection of community skills.
              </p>

              {/* Available Skills */}
              <div className="bg-muted text-foreground p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Community Skills (github/awesome-copilot)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">agentic-eval</h5>
                    <p className="text-xs text-muted-foreground">Agent evaluation patterns</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">azure-deployment-preflight</h5>
                    <p className="text-xs text-muted-foreground">Azure deployment validation</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">gh-cli</h5>
                    <p className="text-xs text-muted-foreground">GitHub CLI workflows</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">git-commit</h5>
                    <p className="text-xs text-muted-foreground">Commit message generation</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">mcp-cli</h5>
                    <p className="text-xs text-muted-foreground">MCP server workflows</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">webapp-testing</h5>
                    <p className="text-xs text-muted-foreground">Web app testing patterns</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">refactor</h5>
                    <p className="text-xs text-muted-foreground">Code refactoring patterns</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">prd</h5>
                    <p className="text-xs text-muted-foreground">Product requirements docs</p>
                  </div>
                  <div className="border border-border rounded p-3">
                    <h5 className="font-medium text-sm">microsoft-docs</h5>
                    <p className="text-xs text-muted-foreground">MS documentation lookup</p>
                  </div>
                </div>
              </div>

              {/* Creating Copilot Skills */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-3">Creating a Copilot Skill</h4>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Structure
skills/
└── my-skill/
    ├── SKILL.md           # Main instructions
    └── references/        # Optional reference files
        └── patterns.md

# SKILL.md content
---
name: my-custom-skill
description: Describe what this skill does and when to use it
---

# My Custom Skill

## Instructions
[Clear, step-by-step guidance for Copilot to follow]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2`}</code>
                </pre>
              </div>

              {/* Make Skill Template */}
              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                <h4 className="font-semibold mb-2 text-foreground">💡 make-skill-template</h4>
                <p className="text-sm text-muted-foreground">
                  The awesome-copilot repo includes a <code>make-skill-template</code> skill 
                  that helps you create new skills with a guided workflow—pseudo-agentic skill creation!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Azure Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Azure-Focused Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Several community skills focus on Azure development workflows:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">azure-static-web-apps</h5>
                  <p className="text-sm text-muted-foreground">
                    Create, test, deploy, and update Azure Static Web Apps with guided workflows.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">azure-role-selector</h5>
                  <p className="text-sm text-muted-foreground">
                    Select appropriate Azure RBAC roles for your deployment scenarios.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">azure-resource-visualizer</h5>
                  <p className="text-sm text-muted-foreground">
                    Generate visual diagrams of Azure resource architectures.
                  </p>
                </div>
                <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">appinsights-instrumentation</h5>
                  <p className="text-sm text-muted-foreground">
                    Add Application Insights telemetry with language-specific patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Copilot Skills"
            contextDescription="Skills for GitHub Copilot CLI from the community"
          />
        </div>
      )
    },
    {
      id: 'best-practices',
      title: 'Authoring Best Practices',
      description: 'Write effective skills that agents use correctly',
      icon: <BookOpen className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Skill Authoring Best Practices
              </CardTitle>
              <CardDescription>
                Write skills that agents can discover and use effectively
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Core Principles */}
              <h4 className="font-semibold text-lg">Core Principles</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-foreground">Concise is Key</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The context window is a public good. Only add context the agent doesn't 
                    already have. Challenge each piece: "Does the agent really need this?"
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-foreground">Appropriate Degrees of Freedom</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High freedom for flexible tasks (code review). Low freedom for fragile 
                    operations (database migrations). Match specificity to task risk.
                  </p>
                </div>
              </div>

              {/* Good vs Bad Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <h5 className="font-semibold text-foreground mb-2">✅ Concise (~50 tokens)</h5>
                  <pre className="bg-green-100 dark:bg-green-800/50 p-2 rounded text-xs overflow-x-auto">
                    <code>{`## Extract PDF text

Use pdfplumber for text extraction:

\`\`\`python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\``}</code>
                  </pre>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <h5 className="font-semibold text-foreground mb-2">❌ Too Verbose (~150 tokens)</h5>
                  <pre className="bg-red-100 dark:bg-red-800/50 p-2 rounded text-xs overflow-x-auto">
                    <code>{`## Extract PDF text

PDF (Portable Document Format) 
files are a common file format 
that contains text, images, and 
other content. To extract text 
from a PDF, you'll need to use 
a library. There are many 
libraries available...`}</code>
                  </pre>
                </div>
              </div>

              {/* Description Guidelines */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Writing Effective Descriptions</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The description enables skill discovery. Always write in third person. 
                  Include both what the skill does AND when to use it.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">✅ Effective</p>
                    <pre className="bg-green-100 dark:bg-green-800/50 p-2 rounded text-xs">
                      <code>Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs.</code>
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 mb-1">❌ Avoid</p>
                    <pre className="bg-red-100 dark:bg-red-800/50 p-2 rounded text-xs">
                      <code>Helps with documents</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Naming Conventions */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Naming Conventions</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use gerund form (verb + -ing) for skill names. Lowercase letters, numbers, and hyphens only.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50">processing-pdfs ✅</Badge>
                  <Badge variant="outline" className="bg-green-50">analyzing-spreadsheets ✅</Badge>
                  <Badge variant="outline" className="bg-red-50">helper ❌</Badge>
                  <Badge variant="outline" className="bg-red-50">utils ❌</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progressive Disclosure */}
          <Card>
            <CardHeader>
              <CardTitle>Progressive Disclosure Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                SKILL.md serves as an overview that points to detailed materials as needed. 
                Keep the main file under 500 lines.
              </p>

              <div className="bg-muted text-foreground p-4 rounded-lg">
                <h5 className="font-semibold mb-2">Pattern: High-level Guide with References</h5>
                <pre className="bg-muted text-foreground p-3 rounded text-sm overflow-x-auto">
                  <code>{`# PDF Processing

## Quick start
Extract text with pdfplumber: [code example]

## Advanced features
**Form filling**: See [FORMS.md](FORMS.md)
**API reference**: See [REFERENCE.md](REFERENCE.md)
**Examples**: See [EXAMPLES.md](EXAMPLES.md)`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  The agent loads FORMS.md, REFERENCE.md, or EXAMPLES.md only when needed.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-amber-200 dark:border-amber-700 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Warning className="w-5 h-5 text-amber-600" />
                  <h5 className="font-semibold text-foreground">Avoid Deeply Nested References</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep references one level deep from SKILL.md. The agent may only preview 
                  nested references with commands like <code>head -100</code>, resulting in 
                  incomplete information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Quality Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Core Quality</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Description is specific with key terms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      SKILL.md body under 500 lines
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      No time-sensitive information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Consistent terminology throughout
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Concrete examples, not abstract
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Code and Scripts</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Scripts solve problems, don't punt
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      No "voodoo constants" (all justified)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Required packages listed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      No Windows-style paths (use /)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 border border-border rounded"></span>
                      Validation steps for critical ops
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Skill Authoring Best Practices"
            contextDescription="Writing effective skills that agents use correctly"
          />
        </div>
      )
    },
    {
      id: 'specification',
      title: 'Skills Specification',
      description: 'The open Agent Skills standard',
      icon: <FileCode className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                Agent Skills Specification
              </CardTitle>
              <CardDescription>
                The open standard at agentskills.io
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Agent Skills is an open specification designed for interoperability across 
                different AI agents and platforms. The spec defines the structure, metadata, 
                and behaviors that make skills portable and discoverable.
              </p>

              {/* Key Spec Elements */}
              <div className="bg-muted text-foreground p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">SKILL.md Frontmatter Requirements</h4>
                <div className="space-y-3">
                  <div>
                    <code className="text-sm font-semibold">name</code>
                    <ul className="text-sm text-muted-foreground ml-4 mt-1">
                      <li>• Maximum 64 characters</li>
                      <li>• Lowercase letters, numbers, hyphens only</li>
                      <li>• Cannot contain XML tags</li>
                      <li>• Cannot contain reserved words: "anthropic", "claude"</li>
                    </ul>
                  </div>
                  <div>
                    <code className="text-sm font-semibold">description</code>
                    <ul className="text-sm text-muted-foreground ml-4 mt-1">
                      <li>• Must be non-empty</li>
                      <li>• Maximum 1024 characters</li>
                      <li>• Cannot contain XML tags</li>
                      <li>• Should describe what AND when to use</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Three Levels */}
              <h4 className="font-semibold mt-6">Three Levels of Loading</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">L1</Badge>
                  <div>
                    <h5 className="font-semibold">Metadata (Always Loaded)</h5>
                    <p className="text-sm text-muted-foreground">
                      YAML frontmatter loaded at startup. ~100 tokens per skill.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">L2</Badge>
                  <div>
                    <h5 className="font-semibold">Instructions (When Triggered)</h5>
                    <p className="text-sm text-muted-foreground">
                      SKILL.md body loaded when skill matches. Under 5k tokens recommended.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">L3</Badge>
                  <div>
                    <h5 className="font-semibold">Resources (As Needed)</h5>
                    <p className="text-sm text-muted-foreground">
                      Bundled files executed via bash. Effectively unlimited—no context 
                      penalty until accessed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Runtime Environment */}
              <div className="bg-muted/50 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                <h4 className="font-semibold mb-2 text-foreground">Runtime Environment</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Skills run in a code execution environment with filesystem access, 
                  bash commands, and code execution. The agent navigates skill directories 
                  like any filesystem.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Claude.ai:</strong> Varying network access based on settings</li>
                  <li>• <strong>Claude API:</strong> No network access, pre-installed packages only</li>
                  <li>• <strong>Claude Code:</strong> Full network access like any local program</li>
                </ul>
              </div>

              {/* Reference Library */}
              <div className="bg-muted text-foreground p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Reference Implementation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use the reference library to validate skills and generate prompt XML:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">agentskills/agentskills</Badge>
                  <Badge variant="outline">skills-ref library</Badge>
                  <Badge variant="outline">agentskills.io/specification</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-amber-500" />
                Security Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Only use skills from trusted sources. Skills provide agents with new 
                capabilities through instructions and code—a malicious skill can direct 
                agents to invoke tools in harmful ways.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                <h5 className="font-semibold text-foreground mb-2">Key Considerations</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Audit thoroughly:</strong> Review all files including scripts and images</li>
                  <li>• <strong>External sources are risky:</strong> Skills fetching external URLs can be compromised</li>
                  <li>• <strong>Tool misuse:</strong> Malicious skills can invoke tools harmfully</li>
                  <li>• <strong>Treat like software:</strong> Same care as installing unknown packages</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="agent-skills" />

          <EnlightenMeButton
            title="Agent Skills Specification"
            contextDescription="The open standard for portable agent skills"
          />
        </div>
      )
    }
  ];

  return (
    <ConceptLayout
      conceptId="agent-skills"
      title="Agent Skills"
      description="Modular expertise that extends AI agent capabilities with specialized knowledge and workflows"
      tabs={tabs}
      nextConcept={{
        id: 'agent-integration',
        title: 'Agent Integration',
        description: 'Connect agents to external systems and workflows'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}









