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
  Robot
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import ReferenceSection from "@/components/references/ReferenceSection";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

interface AgenticPromptingFundamentalsProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

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
                <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">High Eagerness (Problematic)</h4>
                  <code className="text-xs block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded mb-2">
                    "Solve this problem quickly and take immediate action."
                  </code>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    May lead to hasty decisions and suboptimal solutions
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Controlled Eagerness (Better)</h4>
                  <code className="text-xs block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-2 rounded mb-2">
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
                  <Badge variant="secondary" className="mb-2">Low Effort</Badge>
                  <h4 className="font-semibold mb-2">Quick Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast, straightforward answers for simple tasks
                  </p>
                  <code className="text-xs block mt-2 p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
                    "Give a brief answer to this question."
                  </code>
                </div>
                <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <Badge className="mb-2">Medium Effort</Badge>
                  <h4 className="font-semibold mb-2">Balanced Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Thoughtful consideration with appropriate depth
                  </p>
                  <code className="text-xs block mt-2 p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
                    "Think through this step-by-step and provide a reasoned response."
                  </code>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge variant="outline" className="mb-2">High Effort</Badge>
                  <h4 className="font-semibold mb-2">Deep Reasoning</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive analysis for complex problems
                  </p>
                  <code className="text-xs block mt-2 p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
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
                      <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
                        "You are working with a file system API that allows read/write operations..."
                      </code>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">2. Constraints</Badge>
                      <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
                        "Always verify file existence before writing. Never delete system files..."
                      </code>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">3. Expected Behavior</Badge>
                      <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded">
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
              <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Basic Prompt (Problematic)</h4>
                <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded mb-3">
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
              <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">✅ Agentic Prompt (Optimized)</h4>
                <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded mb-3 whitespace-pre-wrap">
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








