import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Lightning, 
  Target,
  Gear,
  ChatText,
  Robot,
  ArrowArcRight,
  ArrowsClockwise
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import ReferenceSection from "@/components/references/ReferenceSection";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { conceptCodeBlock, conceptSurface } from "./conceptStyles";

interface AgenticPromptingFundamentalsProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const PromptLifecycleDiagram = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ArrowsClockwise className="w-5 h-5 text-primary" />
        Agentic Prompt Lifecycle
      </CardTitle>
      <CardDescription>
        How intent, scaffolding, tool use, and review reinforce each other in a single agent task
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between gap-4">
          {[
            {
              label: "Intent",
              icon: <Target className="w-5 h-5" />, 
              detail: "Clarify goal, success signals, guardrails",
              iconBg: "bg-blue-100 dark:bg-blue-900/50",
              iconText: "text-blue-600 dark:text-blue-300",
              borderTone: "border-l-blue-400 dark:border-l-blue-500"
            },
            {
              label: "Scaffold",
              icon: <Gear className="w-5 h-5" />, 
              detail: "Layer instructions, preambles, format cues",
              iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
              iconText: "text-cyan-600 dark:text-cyan-300",
              borderTone: "border-l-cyan-400 dark:border-l-cyan-500"
            },
            {
              label: "Invoke Tools",
              icon: <Code className="w-5 h-5" />, 
              detail: "Route calls, manage permissions, capture outputs",
              iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
              iconText: "text-emerald-600 dark:text-emerald-300",
              borderTone: "border-l-emerald-400 dark:border-l-emerald-500"
            },
            {
              label: "Review & Iterate",
              icon: <ArrowArcRight className="w-5 h-5" />, 
              detail: "Check reasoning effort, adjust eagerness, escalate",
              iconBg: "bg-orange-100 dark:bg-orange-900/50",
              iconText: "text-orange-600 dark:text-orange-300",
              borderTone: "border-l-orange-400 dark:border-l-orange-500"
            }
          ].map((stage, index) => (
            <div key={stage.label} className="relative flex-1 min-w-[220px]">
              <div
                className={`rounded-xl border bg-card shadow-sm h-full px-4 py-5 border-l-4 ${stage.borderTone}`}
                aria-label={`${stage.label} stage`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`rounded-full w-9 h-9 flex items-center justify-center font-semibold text-sm ${stage.iconBg} ${stage.iconText}`}>
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    {stage.icon}
                    <span>{stage.label}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stage.detail}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                  <ArrowRight className="w-10 h-10" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-muted p-4 bg-muted/40 text-sm text-muted-foreground">
          <div className="font-semibold mb-2 text-foreground">Feedback Loop</div>
          <p>
            Each review cycle tunes the four control levers: lower eagerness when outputs are rushed, raise reasoning effort for
            ambiguous steps, tighten tool preambles if context drifts, and reinforce steerability instructions after failures.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const AgenticPromptingFundamentals: React.FC<AgenticPromptingFundamentalsProps> = ({
  onMarkComplete,
  onNavigateToNext
}) => {
  const [activeExample, setActiveExample] = useState<'basic' | 'improved'>('basic');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Ask AI */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Agentic Prompting Fundamentals
            <EnlightenMeButton
              title="Agentic Prompting Fundamentals"
              contextDescription="Master the core principles of controlling AI agent behavior through effective prompting techniques"
              size="xs"
              visual="subtle"
              iconOnly
              hideHotkeyHint
            />
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master the core principles of prompting AI agents for optimal performance, predictability, and control
        </p>
      </div>

      {/* Prompt Engineering Diagram */}
      <Card>
        <CardContent className="pt-6">
          <img 
            src="/images/Prompt_Engineering_for_Agents.webp" 
            alt="Prompt Engineering for AI Agents - Core principles, techniques, and best practices for crafting effective agent prompts"
            className="w-full rounded-lg border border-border/50"
          />
        </CardContent>
      </Card>
      
  <PromptLifecycleDiagram />

      {/* Core Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Core Principles of Agentic Prompting
          </CardTitle>
          <CardDescription>
            Understanding the fundamental differences between traditional prompting and agentic workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                ✓ Traditional Prompting
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Single turn interactions</li>
                <li>• Direct input-output mapping</li>
                <li>• Limited context awareness</li>
                <li>• Static instructions</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                ⚡ Agentic Prompting
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Multi-turn conversations</li>
                <li>• Tool integration capabilities</li>
                <li>• Dynamic context management</li>
                <li>• Adaptive instruction following</li>
                <li>• Self-reflection and iteration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Tabs defaultValue="eagerness" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="eagerness">Eagerness Control</TabsTrigger>
          <TabsTrigger value="reasoning">Reasoning Effort</TabsTrigger>
          <TabsTrigger value="preambles">Tool Preambles</TabsTrigger>
          <TabsTrigger value="steerability">Steerability</TabsTrigger>
        </TabsList>

        <TabsContent value="eagerness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Controlling Agent Eagerness
              </CardTitle>
              <CardDescription>
                Managing how quickly agents take action vs. planning and reflection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Eagerness</strong> refers to how quickly an agent moves from planning to action. 
                  High eagerness means immediate action; low eagerness encourages more planning and reflection.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">High Eagerness (Problematic)</h4>
                  <code className={conceptCodeBlock("text-xs mb-2")}>
                    "Solve this problem quickly and take immediate action."
                  </code>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    May lead to hasty decisions and suboptimal solutions
                  </p>
                </div>
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Controlled Eagerness (Better)</h4>
                  <code className={conceptCodeBlock("text-xs mb-2")}>
                    "First analyze the problem thoroughly, consider alternatives, 
                    then propose your approach before taking action."
                  </code>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Encourages thoughtful planning and better outcomes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reasoning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="w-5 h-5" />
                Reasoning Effort Configuration
              </CardTitle>
              <CardDescription>
                Adjusting the depth and thoroughness of agent reasoning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Badge className="mb-2 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Low Effort</Badge>
                  <h4 className="font-semibold mb-2">Quick Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast, straightforward answers for simple tasks
                  </p>
                  <code className={conceptCodeBlock("text-xs mt-2 p-2") }>
                    "Give a brief answer to this question."
                  </code>
                </div>
                <div className={conceptSurface("p-4")}>
                  <Badge className="mb-2 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Medium Effort</Badge>
                  <h4 className="font-semibold mb-2">Balanced Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Thoughtful consideration with appropriate depth
                  </p>
                  <code className={conceptCodeBlock("text-xs mt-2") }>
                    "Think through this step-by-step and provide a reasoned response."
                  </code>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge className="mb-2 ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)]">High Effort</Badge>
                  <h4 className="font-semibold mb-2">Deep Reasoning</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive analysis for complex problems
                  </p>
                  <code className={conceptCodeBlock("text-xs mt-2 p-2") }>
                    "Analyze this thoroughly from multiple angles before responding."
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preambles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Tool Preambles and Context
              </CardTitle>
              <CardDescription>
                Setting up proper context and expectations for tool usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Code className="h-4 w-4" />
                <AlertDescription>
                  Tool preambles prepare the agent for tool usage by establishing context, 
                  constraints, and expected behavior patterns.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Effective Tool Preamble Structure</h4>
                  <div className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-1">1. Context Setting</Badge>
                      <code className={conceptCodeBlock("text-xs p-2")}>
                        "You are working with a file system API that allows read/write operations..."
                      </code>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">2. Constraints</Badge>
                      <code className={conceptCodeBlock("text-xs p-2")}>
                        "Always verify file existence before writing. Never delete system files..."
                      </code>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">3. Expected Behavior</Badge>
                      <code className={conceptCodeBlock("text-xs p-2")}>
                        "When errors occur, explain what went wrong and suggest alternatives..."
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steerability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChatText className="w-5 h-5" />
                Agent Steerability and Control
              </CardTitle>
              <CardDescription>
                Techniques for maintaining control over agent behavior and outputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Behavioral Controls</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Explicit instruction hierarchies
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Format specifications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Constraint boundaries
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Fallback procedures
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Output Controls</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Verbosity settings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Format templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Content filtering
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Response structure
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Practical Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Robot className="w-6 h-6 text-primary" />
            Before & After: Agentic Prompt Transformation
          </CardTitle>
          <CardDescription>
            See how proper agentic prompting principles transform a basic prompt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={activeExample === 'basic' ? 'default' : 'outline'}
                onClick={() => setActiveExample('basic')}
                size="sm"
              >
                Basic Prompt
              </Button>
              <Button
                variant={activeExample === 'improved' ? 'default' : 'outline'}
                onClick={() => setActiveExample('improved')}
                size="sm"
              >
                Agentic Prompt
              </Button>
            </div>

            {activeExample === 'basic' && (
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Basic Prompt (Problematic)</h4>
                <code className={conceptCodeBlock("text-sm mb-3")}>
                  "Help me with my coding problem. Write a Python function that processes data."
                </code>
                <div className="text-sm text-red-600 dark:text-red-400">
                  <strong>Issues:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Vague requirements</li>
                    <li>No context provided</li>
                    <li>No constraints specified</li>
                    <li>No success criteria</li>
                  </ul>
                </div>
              </div>
            )}

            {activeExample === 'improved' && (
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">✅ Agentic Prompt (Optimized)</h4>
                <code className={conceptCodeBlock("text-sm mb-3 whitespace-pre-wrap") }>
{`# Objective
You are a Python coding assistant specializing in data processing optimization.

# Context
I need to process streaming financial data with the following requirements:
- Handle 10,000+ records per second
- Maintain data integrity and error handling
- Use only standard library (no external dependencies)

# Task
Before writing code, first analyze the requirements and ask clarifying questions if needed.
Then provide a step-by-step approach, followed by the implementation.

# Constraints
- Memory efficient (streaming, not batch processing)
- Include comprehensive error handling
- Add performance monitoring hooks
- Follow PEP 8 standards

# Output Format
1. Analysis and clarification questions (if any)
2. Approach outline
3. Complete implementation with comments
4. Usage example and performance notes`}
                </code>
                <div className="text-sm text-green-600 dark:text-green-400">
                  <strong>Improvements:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Clear role and context definition</li>
                    <li>Specific requirements and constraints</li>
                    <li>Structured output format</li>
                    <li>Encourages clarification and planning</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Agentic Prompting Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 dark:text-green-400">✓ Do</h4>
              <ul className="space-y-2 text-sm">
                <li>• Set clear context and role definitions</li>
                <li>• Specify constraints and boundaries</li>
                <li>• Use structured output formats</li>
                <li>• Encourage planning before action</li>
                <li>• Provide error handling guidance</li>
                <li>• Include success criteria</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600 dark:text-red-400">✗ Don't</h4>
              <ul className="space-y-2 text-sm">
                <li>• Use vague or ambiguous instructions</li>
                <li>• Mix contradictory requirements</li>
                <li>• Ignore tool integration needs</li>
                <li>• Forget about error scenarios</li>
                <li>• Skip context setting</li>
                <li>• Assume implicit understanding</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <ReferenceSection type="concept" itemId="agentic-prompting-fundamentals" />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          onClick={onMarkComplete}
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Mark Complete
        </Button>
        <Button
          onClick={() => onNavigateToNext?.('prompt-optimization-patterns')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next: Prompt Optimization Patterns
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgenticPromptingFundamentals;

















