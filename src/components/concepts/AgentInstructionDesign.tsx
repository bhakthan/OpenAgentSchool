import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  ChatText, 
  Sliders,
  FileText,
  Gear,
  Target,
  ArrowsOut,
  ArrowsIn,
  MagnifyingGlass,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import ReferenceSection from "@/components/references/ReferenceSection";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { cn } from "@/lib/utils";
import { conceptCodeBlock, conceptSurface } from "./conceptStyles";

interface AgentInstructionDesignProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const InstructionHierarchyVisual = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        Instruction Stack Blueprint
      </CardTitle>
      <CardDescription>
        Four layers every steerable instruction set needs—from mission signals down to output templates
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid lg:grid-cols-4 gap-4">
        {[
          {
            icon: <NumberCircleOne className="w-6 h-6" />,
            label: "Mission",
            description: "Purpose, guardrails, success criteria",
            badge: "Why we exist",
            iconBg: "bg-blue-100 dark:bg-blue-900/50",
            iconText: "text-blue-600 dark:text-blue-300",
            borderTone: "border-b-blue-400 dark:border-b-blue-500"
          },
          {
            icon: <NumberCircleTwo className="w-6 h-6" />,
            label: "Guardrails",
            description: "Hard limits, refusal clauses, safety triggers",
            badge: "What never to break",
            iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
            iconText: "text-cyan-600 dark:text-cyan-300",
            borderTone: "border-b-cyan-400 dark:border-b-cyan-500"
          },
          {
            icon: <NumberCircleThree className="w-6 h-6" />,
            label: "Workflow",
            description: "Step order, tool preambles, review cadence",
            badge: "How we operate",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
            iconText: "text-emerald-600 dark:text-emerald-300",
            borderTone: "border-b-emerald-400 dark:border-b-emerald-500"
          },
          {
            icon: <NumberCircleFour className="w-6 h-6" />,
            label: "Output",
            description: "Formats, verbosity settings, delivery style",
            badge: "How we communicate",
            iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
            iconText: "text-indigo-600 dark:text-indigo-300",
            borderTone: "border-b-indigo-400 dark:border-b-indigo-500"
          }
        ].map(layer => (
          <div key={layer.label} className="relative">
            <div className={`rounded-2xl border bg-card shadow-sm h-full flex flex-col`}
              aria-label={`${layer.label} instruction layer`}>
              <div className={`px-4 py-3 border-b ${layer.borderTone} flex items-center gap-3 bg-muted/40 dark:bg-muted/20`}> 
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${layer.iconBg} ${layer.iconText}`}>
                  {layer.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">{layer.label}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{layer.badge}</div>
                </div>
              </div>
              <div className="p-4 text-sm text-muted-foreground flex-1">
                {layer.description}
              </div>
            </div>
            <div className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {layer.label === "Mission" ? "01" : layer.label === "Guardrails" ? "02" : layer.label === "Workflow" ? "03" : "04"}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid lg:grid-cols-3 gap-3 text-sm text-muted-foreground">
        <div className="rounded-lg border border-dashed border-blue-200 dark:border-blue-900/50 p-3 bg-muted/30">
          <span className="font-semibold text-foreground">Inheritance:</span> Lower layers inherit constraints from everyone above—never invert the order.
        </div>
        <div className="rounded-lg border border-dashed border-emerald-200 dark:border-emerald-900/50 p-3 bg-muted/30">
          <span className="font-semibold text-foreground">Tuning knobs:</span> Verbosity sliders and steerability toggles should reference the stack layer they influence.
        </div>
        <div className="rounded-lg border border-dashed border-purple-200 dark:border-purple-900/50 p-3 bg-muted/30">
          <span className="font-semibold text-foreground">Hand-off ready:</span> Share this hierarchy with downstream teams so resilience testing hits the same priorities.
        </div>
      </div>
    </CardContent>
  </Card>
)

const AgentInstructionDesign: React.FC<AgentInstructionDesignProps> = ({
  onMarkComplete,
  onNavigateToNext
}) => {
  const [verbosityLevel, setVerbosityLevel] = useState([3]);
  const [steerabilityExample, setSteerabilityExample] = useState<'low' | 'medium' | 'high'>('medium');

  const getVerbosityExample = (level: number) => {
    if (level <= 2) {
      return "Process data. Output results.";
    } else if (level <= 4) {
      return "Process the input data according to specifications and provide the results in the requested format.";
    } else {
      return "Carefully process the input data according to the detailed specifications provided. Analyze each step of the processing pipeline, validate intermediate results, and provide comprehensive output in the exact format requested, including detailed explanations of any transformations applied.";
    }
  };

  const getSteerabilityContent = () => {
    switch (steerabilityExample) {
      case 'low':
        return {
          instruction: "Help me with this task.",
          issues: ["No clear objective", "No constraints", "No format specification", "Agent chooses approach"],
          color: "red"
        };
      case 'medium':
        return {
          instruction: "Analyze this data and provide insights. Use a structured format with clear headings.",
          issues: ["Better structure", "Some guidance", "Still room for interpretation"],
          color: "yellow"
        };
      case 'high':
        return {
          instruction: `# Objective
Perform statistical analysis on the provided dataset.

# Required Analysis
1. Descriptive statistics (mean, median, std dev)
2. Correlation analysis between numeric variables
3. Identify top 3 outliers with explanations

# Output Format
## Summary Statistics
[Table format with specified columns]

## Correlations
[Heatmap description + interpretation]

## Outliers
[List format: value, reason, impact]

# Constraints
- Use only provided data (no external sources)
- Flag any missing or invalid data
- Include confidence levels for statistical tests`,
          issues: ["Clear objectives", "Specific deliverables", "Exact format requirements", "Defined constraints"],
          color: "green"
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Ask AI */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <ChatText className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Agent Instruction Design
            <EnlightenMeButton
              title="Agent Instruction Design"
              contextDescription="Master the art of creating clear, hierarchical instructions that enable steerable and reliable agent behavior"
              size="xs"
              visual="subtle"
              iconOnly
              hideHotkeyHint
            />
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master the art of creating clear, steerable instructions that guide agent behavior effectively
        </p>
      </div>

  <InstructionHierarchyVisual />

      {/* Instruction Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Instruction Hierarchy Design
          </CardTitle>
          <CardDescription>
            Building a clear priority system for competing instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Behavioral Priorities</strong> should be explicitly ordered to prevent 
                conflicts and ensure consistent agent behavior across scenarios.
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400">❌ Unclear Hierarchy</h4>
                <div className={conceptSurface("p-4 border-2 border-red-200 dark:border-red-800") }>
                  <code className={conceptCodeBlock("text-sm mb-3") }>
{`"Be helpful and provide accurate information.
Be concise in your responses.
If you're unsure, say so.
Provide detailed explanations when needed."`}
                  </code>
                  <div className="text-sm text-red-600 dark:text-red-400">
                    <strong>Problems:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Concise vs detailed conflict</li>
                      <li>No clear priority order</li>
                      <li>Competing objectives</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400">✅ Clear Hierarchy</h4>
                <div className={conceptSurface("p-4 border-2 border-green-200 dark:border-green-800") }>
                  <code className={conceptCodeBlock("text-sm mb-3") }>
{`"Behavioral priorities (in order):
1) Accuracy: Verify all facts from sources
2) Safety: Refuse harmful requests  
3) Clarity: Use requested format/structure
4) Completeness: Address all aspects
5) Conciseness: Minimize unnecessary detail"`}
                  </code>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <strong>Benefits:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Clear precedence rules</li>
                      <li>Conflict resolution guidance</li>
                      <li>Consistent behavior</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steerability Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-primary" />
            Steerability and Control Mechanisms
          </CardTitle>
          <CardDescription>
            Designing instructions that provide appropriate control over agent behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={steerabilityExample === 'low' ? 'destructive' : 'outline'}
                onClick={() => setSteerabilityExample('low')}
                size="sm"
              >
                Low Control
              </Button>
              <Button
                variant={steerabilityExample === 'medium' ? 'secondary' : 'outline'}
                onClick={() => setSteerabilityExample('medium')}
                size="sm"
              >
                Medium Control
              </Button>
              <Button
                variant={steerabilityExample === 'high' ? 'default' : 'outline'}
                onClick={() => setSteerabilityExample('high')}
                size="sm"
              >
                High Control
              </Button>
            </div>

            {(() => {
              const content = getSteerabilityContent();
              return (
                <div
                  className={cn(
                    conceptSurface("p-4 border-2"),
                    content.color === 'red'
                      ? 'border-red-200 dark:border-red-800'
                      : content.color === 'yellow'
                        ? 'border-yellow-200 dark:border-yellow-800'
                        : 'border-green-200 dark:border-green-800'
                  )}
                >
                  <h4 className={`font-semibold mb-3 ${
                    content.color === 'red' ? 'text-red-700 dark:text-red-400' :
                    content.color === 'yellow' ? 'text-yellow-700 dark:text-yellow-400' :
                    'text-green-700 dark:text-green-400'
                  }`}>
                    {steerabilityExample === 'low' ? '❌ Low Steerability' :
                     steerabilityExample === 'medium' ? '⚠️ Medium Steerability' :
                     '✅ High Steerability'}
                  </h4>
                  <code className={conceptCodeBlock("text-sm mb-3 whitespace-pre-wrap")}>
                    {content.instruction}
                  </code>
                  <div className={`text-sm ${
                    content.color === 'red' ? 'text-red-600 dark:text-red-400' :
                    content.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    <ul className="list-disc list-inside space-y-1">
                      {content.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-1">
                  <Target className="w-4 h-4" /> Objective Control
                </h5>
                <ul className="text-sm space-y-1">
                  <li>• Clear primary goal</li>
                  <li>• Success criteria</li>
                  <li>• Priority ordering</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Format Control
                </h5>
                <ul className="text-sm space-y-1">
                  <li>• Output structure</li>
                  <li>• Content organization</li>
                  <li>• Style guidelines</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-1">
                  <Gear className="w-4 h-4" /> Process Control
                </h5>
                <ul className="text-sm space-y-1">
                  <li>• Method constraints</li>
                  <li>• Quality thresholds</li>
                  <li>• Error handling</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verbosity Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowsOut className="w-6 h-6 text-primary" />
            Verbosity and Detail Control
          </CardTitle>
          <CardDescription>
            Controlling the amount of detail and explanation in agent responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium min-w-[80px]">Verbosity:</span>
                <Slider
                  value={verbosityLevel}
                  onValueChange={setVerbosityLevel}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[60px]">
                  Level {verbosityLevel[0]}/5
                </span>
              </div>

              <div className={conceptSurface("p-4 border") }>
                <h4 className="font-semibold mb-2">Example Output (Level {verbosityLevel[0]}):</h4>
                <code className={conceptCodeBlock("text-sm") }>
                  {getVerbosityExample(verbosityLevel[0])}
                </code>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-2 text-center">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold text-sm">Minimal</div>
                <div className="text-xs text-muted-foreground">Level 1</div>
                <div className="text-xs mt-1">Commands only</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold text-sm">Brief</div>
                <div className="text-xs text-muted-foreground">Level 2</div>
                <div className="text-xs mt-1">Essential info</div>
              </div>
              <div className={conceptSurface("p-3 border") }>
                <div className="font-semibold text-sm">Standard</div>
                <div className="text-xs text-muted-foreground">Level 3</div>
                <div className="text-xs mt-1">Balanced detail</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold text-sm">Detailed</div>
                <div className="text-xs text-muted-foreground">Level 4</div>
                <div className="text-xs mt-1">Full context</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold text-sm">Verbose</div>
                <div className="text-xs text-muted-foreground">Level 5</div>
                <div className="text-xs mt-1">Comprehensive</div>
              </div>
            </div>

            <Alert>
              <ArrowsOut className="h-4 w-4" />
              <AlertDescription>
                <strong>Context-Dependent Verbosity:</strong> Consider adjusting verbosity based on 
                user expertise level, task complexity, and available time/space constraints.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Techniques */}
      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="format">Format Templates</TabsTrigger>
          <TabsTrigger value="fallbacks">Fallback Procedures</TabsTrigger>
          <TabsTrigger value="validation">Validation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Output Format Templates
              </CardTitle>
              <CardDescription>
                Providing structured templates for consistent agent outputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Analysis Task Template</h4>
                  <code className={conceptCodeBlock("text-sm whitespace-pre-wrap") }>
{`# Output Format
## Executive Summary
[2-3 sentence overview]

## Key Findings
1. [Finding with supporting data]
2. [Finding with supporting data]
3. [Finding with supporting data]

## Detailed Analysis
### Methodology
[Approach taken]

### Results
[Detailed results with metrics]

## Recommendations
- [Actionable recommendation]
- [Actionable recommendation]

## Confidence Level
[High/Medium/Low] + rationale`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Problem-Solving Template</h4>
                  <code className={conceptCodeBlock("text-sm whitespace-pre-wrap") }>
{`# Output Format
## Problem Statement
[Clear problem definition]

## Analysis
### Root Cause
[Primary cause identification]

### Contributing Factors
- [Factor 1]
- [Factor 2]

## Solution Options
### Option 1: [Name]
- Pros: [Benefits]
- Cons: [Drawbacks]
- Effort: [High/Medium/Low]

### Recommended Solution
[Chosen option with rationale]

## Implementation Plan
1. [Step with timeline]
2. [Step with timeline]`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fallbacks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsIn className="w-5 h-5" />
                Fallback and Error Procedures
              </CardTitle>
              <CardDescription>
                Defining what agents should do when facing uncertainty or errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Uncertainty Handling</h4>
                  <code className={conceptCodeBlock("text-sm whitespace-pre-wrap") }>
{`# When uncertain or lacking information:
1. Acknowledge the uncertainty explicitly
2. State what information you have confidence in
3. Identify what additional information would help
4. Provide qualified recommendations if possible
5. Suggest next steps for gathering missing info

# Format:
"Based on available information, [confident statement]. 
However, I lack [specific missing info] which affects 
[specific aspect]. To improve this analysis, I would 
need [specific requirements]."`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Error Recovery</h4>
                  <code className={conceptCodeBlock("text-sm whitespace-pre-wrap") }>
{`# When encountering errors:
1. Stop the problematic process immediately
2. Explain what went wrong in simple terms
3. Identify the root cause if possible
4. Suggest alternative approaches
5. Ask for clarification if needed

# Format:
"I encountered an error: [simple description]. 
This likely occurred because [cause]. 
Alternative approaches include: [options].
Would you like me to try [specific alternative]?"`}
                  </code>
                </div>
              </div>

              <Alert>
                <ArrowsIn className="h-4 w-4" />
                <AlertDescription>
                  <strong>Graceful Degradation:</strong> Design fallback procedures that maintain 
                  partial functionality rather than complete failure when facing challenges.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagnifyingGlass className="w-5 h-5" />
                Validation and Quality Control
              </CardTitle>
              <CardDescription>
                Building self-checking mechanisms into agent instructions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Self-Validation Framework</h4>
                <code className={conceptCodeBlock("text-sm whitespace-pre-wrap") }>
{`# Before finalizing any response, verify:

## Content Validation
- Are all claims supported by evidence?
- Have I addressed all parts of the request?
- Is the information current and accurate?

## Format Validation  
- Does the output match the specified structure?
- Are all required sections included?
- Is the detail level appropriate?

## Logic Validation
- Are my recommendations logical and feasible?
- Do the conclusions follow from the analysis?
- Are there any internal contradictions?

## Completeness Check
- What questions might the user have after reading this?
- Are there important caveats or limitations to mention?
- Should I suggest follow-up actions?`}
                </code>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Accuracy Checks</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Fact verification</li>
                    <li>• Source credibility</li>
                    <li>• Currency validation</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Completeness Checks</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Requirement coverage</li>
                    <li>• Missing elements</li>
                    <li>• Scope boundaries</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Quality Checks</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Clarity assessment</li>
                    <li>• Logical consistency</li>
                    <li>• Usefulness evaluation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* References */}
      <ReferenceSection type="concept" itemId="agent-instruction-design" />

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
          onClick={() => onNavigateToNext?.('agentic-workflow-control')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next: Agentic Workflow Control
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgentInstructionDesign;










