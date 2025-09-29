import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  Lightning, 
  Gear,
  FlowArrow,
  Clock,
  Brain,
  Wrench,
  Circuitry,
  Pause,
  Play,
  FastForward,
  HourglassMedium,
  Gauge
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReferenceSection from "@/components/references/ReferenceSection";
import { Slider } from "@/components/ui/slider";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { cn } from "@/lib/utils";
import { conceptCodeBlock, conceptSurface, conceptSurfaceSoft } from "./conceptStyles";

interface AgenticWorkflowControlProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const WorkflowControlBoard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Gauge className="w-5 h-5 text-primary" />
        Workflow Control Board
      </CardTitle>
      <CardDescription>
        Compare sequencing choices, eagerness bands, and reasoning depth for each orchestration style at a glance
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            name: "Sequential",
            icon: <Pause className="w-6 h-6" />,
            cadence: "Plan → Execute → Validate",
            eagerness: "1-2",
            reasoning: "High",
            risks: ["Bottlenecks slow total cycle", "Over-planning can delay action"],
            bestFor: ["Complex analysis", "Compliance gates", "Learning moments"],
            headerBorder: "border-b-blue-400 dark:border-b-blue-500",
            iconBg: "bg-blue-100 dark:bg-blue-900/50",
            iconText: "text-blue-600 dark:text-blue-300"
          },
          {
            name: "Parallel",
            icon: <FastForward className="w-6 h-6" />,
            cadence: "Split → Execute → Merge",
            eagerness: "3-4",
            reasoning: "Medium",
            risks: ["Coordination overhead", "Race conditions"],
            bestFor: ["Independent subtasks", "Speed obsessed teams", "Large backlogs"],
            headerBorder: "border-b-emerald-400 dark:border-b-emerald-500",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
            iconText: "text-emerald-600 dark:text-emerald-300"
          },
          {
            name: "Adaptive",
            icon: <Lightning className="w-6 h-6" />,
            cadence: "Probe → Sense → Switch",
            eagerness: "Variable",
            reasoning: "Dynamic",
            risks: ["Inconsistent timings", "Needs good telemetry"],
            bestFor: ["Unknown complexity", "Exploratory pilots", "Volatile domains"],
            headerBorder: "border-b-purple-400 dark:border-b-purple-500",
            iconBg: "bg-purple-100 dark:bg-purple-900/50",
            iconText: "text-purple-600 dark:text-purple-300"
          }
        ].map(mode => (
          <div key={mode.name} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className={`px-4 py-3 border-b flex items-center justify-between bg-muted/40 dark:bg-muted/20 ${mode.headerBorder}`}
              aria-label={`${mode.name} workflow summary`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mode.iconBg} ${mode.iconText}`}>
                  {mode.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">{mode.name}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Cadence: {mode.cadence}</div>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground space-y-1">
                <div>Eagerness Band <span className="font-semibold text-foreground">{mode.eagerness}</span></div>
                <div>Reasoning Effort <span className="font-semibold text-foreground">{mode.reasoning}</span></div>
              </div>
            </div>
            <div className="p-4 text-sm space-y-3">
              <div>
                <div className="font-semibold text-foreground mb-1">Best When</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {mode.bestFor.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Watch for</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {mode.risks.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-dashed border-muted p-3 flex items-center gap-3 text-xs text-muted-foreground bg-muted/30">
                <HourglassMedium className="w-5 h-5 text-primary" />
                <span>Set telemetry alerts when eagerness or reasoning stray outside this band to trigger adaptive responses.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const AgenticWorkflowControl: React.FC<AgenticWorkflowControlProps> = ({
  onMarkComplete,
  onNavigateToNext
}) => {
  const [eagernessSetting, setEagernessSetting] = useState([3]);
  const [reasoningEffort, setReasoningEffort] = useState([2]);
  const [workflowType, setWorkflowType] = useState<'sequential' | 'parallel' | 'adaptive'>('sequential');

  const getEagernessDescription = (level: number) => {
    if (level <= 2) return "High reflection, delayed action";
    if (level <= 4) return "Balanced planning and execution";
    return "Quick action, minimal hesitation";
  };

  const getReasoningDescription = (level: number) => {
    if (level <= 1) return "Fast, surface-level analysis";
    if (level <= 2) return "Standard reasoning depth";
    return "Deep, comprehensive analysis";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Ask AI */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <FlowArrow className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Agentic Workflow Control
            <EnlightenMeButton 
              title="Agentic Workflow Control"
              contextDescription="Get insights on workflow orchestration, multi-agent coordination, and dynamic control flow patterns for complex agentic systems"
              size="xs"
              visual="subtle"
              iconOnly
              hideHotkeyHint
            />
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master advanced techniques for controlling agent execution patterns, timing, and decision-making processes
        </p>
      </div>

  <WorkflowControlBoard />

      {/* Workflow Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Circuitry className="w-6 h-6 text-primary" />
            Workflow Execution Patterns
          </CardTitle>
          <CardDescription>
            Understanding different approaches to agent task execution and coordination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={workflowType === 'sequential' ? 'default' : 'outline'}
                onClick={() => setWorkflowType('sequential')}
                size="sm"
              >
                Sequential
              </Button>
              <Button
                variant={workflowType === 'parallel' ? 'default' : 'outline'}
                onClick={() => setWorkflowType('parallel')}
                size="sm"
              >
                Parallel
              </Button>
              <Button
                variant={workflowType === 'adaptive' ? 'default' : 'outline'}
                onClick={() => setWorkflowType('adaptive')}
                size="sm"
              >
                Adaptive
              </Button>
            </div>

            {workflowType === 'sequential' && (
              <div className={conceptSurface("p-4 border")}>
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">
                  🔄 Sequential Workflow
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <code className={conceptCodeBlock("text-sm mb-3 whitespace-pre-wrap") }>
{`# Sequential Execution Pattern
1. Analyze requirements thoroughly
2. Create detailed plan  
3. Execute plan step-by-step
4. Validate each step before proceeding
5. Compile final results

# Control Instructions:
"Work through this systematically. Complete each 
phase fully before moving to the next. Validate 
your progress at each checkpoint."`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Best for:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Complex problem-solving</li>
                      <li>• High-stakes decisions</li>
                      <li>• Quality-critical tasks</li>
                      <li>• Learning scenarios</li>
                    </ul>
                    <Badge className="mt-2 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Trade-offs:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Slower execution</li>
                      <li>• Higher computational cost</li>
                      <li>• More thorough results</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {workflowType === 'parallel' && (
              <div className={conceptSurface("p-4 border")}>
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                  ⚡ Parallel Workflow
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <code className={conceptCodeBlock("text-sm mb-3 whitespace-pre-wrap") }>
{`# Parallel Execution Pattern
1. Break down into independent tasks
2. Execute multiple tracks simultaneously
3. Monitor progress across all tracks
4. Synchronize and merge results
5. Handle conflicts and dependencies

# Control Instructions:
"Identify independent sub-tasks that can run 
in parallel. Start all viable tasks immediately. 
Coordinate results as they complete."`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Best for:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Time-sensitive tasks</li>
                      <li>• Independent sub-problems</li>
                      <li>• Resource optimization</li>
                      <li>• Scalable processing</li>
                    </ul>
                    <Badge className="mt-2 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Trade-offs:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Coordination complexity</li>
                      <li>• Resource contention</li>
                      <li>• Faster overall completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {workflowType === 'adaptive' && (
              <div className={conceptSurface("p-4 border")}>
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">
                  🧠 Adaptive Workflow
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <code className={conceptCodeBlock("text-sm mb-3 whitespace-pre-wrap") }>
{`# Adaptive Execution Pattern
1. Start with lightweight exploration
2. Assess complexity and resources
3. Choose optimal execution strategy
4. Adjust approach based on interim results
5. Scale effort up/down as needed

# Control Instructions:
"Begin with a quick assessment. Adapt your 
approach based on what you discover. Be 
prepared to switch strategies if needed."`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Best for:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Unknown problem complexity</li>
                      <li>• Variable resource availability</li>
                      <li>• Exploratory tasks</li>
                      <li>• Dynamic environments</li>
                    </ul>
                    <Badge className="mt-2 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Trade-offs:</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Strategy overhead</li>
                      <li>• Less predictable timing</li>
                      <li>• Optimal resource usage</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Eagerness and Timing Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightning className="w-6 h-6 text-primary" />
            Eagerness and Timing Control
          </CardTitle>
          <CardDescription>
            Fine-tuning the balance between planning and action in agent behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Eagerness Control</strong> determines how quickly agents move from analysis 
                to action. Different tasks require different eagerness levels for optimal results.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium min-w-[80px]">Eagerness:</span>
                <Slider
                  value={eagernessSetting}
                  onValueChange={setEagernessSetting}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[180px]">
                  {getEagernessDescription(eagernessSetting[0])}
                </span>
              </div>

              <div className="grid md:grid-cols-5 gap-2">
                <div
                  className={conceptSurface(
                    cn(
                      "text-center p-3 transition-all",
                      eagernessSetting[0] === 1 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <Pause className="w-6 h-6 mx-auto mb-1 text-red-500" />
                  <div className="text-xs font-semibold">Deliberate</div>
                  <div className="text-xs text-muted-foreground">Level 1</div>
                </div>
                <div
                  className={conceptSurface(
                    cn(
                      "text-center p-3 transition-all",
                      eagernessSetting[0] === 2 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <Clock className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                  <div className="text-xs font-semibold">Cautious</div>
                  <div className="text-xs text-muted-foreground">Level 2</div>
                </div>
                <div
                  className={conceptSurface(
                    cn(
                      "text-center p-3 transition-all",
                      eagernessSetting[0] === 3 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <Play className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                  <div className="text-xs font-semibold">Balanced</div>
                  <div className="text-xs text-muted-foreground">Level 3</div>
                </div>
                <div
                  className={conceptSurface(
                    cn(
                      "text-center p-3 transition-all",
                      eagernessSetting[0] === 4 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <FastForward className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <div className="text-xs font-semibold">Proactive</div>
                  <div className="text-xs text-muted-foreground">Level 4</div>
                </div>
                <div
                  className={conceptSurface(
                    cn(
                      "text-center p-3 transition-all",
                      eagernessSetting[0] === 5 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <Lightning className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                  <div className="text-xs font-semibold">Immediate</div>
                  <div className="text-xs text-muted-foreground">Level 5</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Low Eagerness (Deliberate)</h4>
                <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                >
{`# Deliberate Approach
"Before taking any action:
1. Analyze the full context
2. Consider multiple approaches  
3. Evaluate potential risks
4. Create a detailed plan
5. Only then begin execution

Think through each step carefully before 
proceeding to the next."`}
                </code>
                <div className="text-sm">
                  <Badge className="mb-1 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Use cases:</Badge>
                  <ul className="list-disc list-inside space-y-1">
                    <li>High-stakes decisions</li>
                    <li>Complex problem-solving</li>
                    <li>Safety-critical tasks</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">High Eagerness (Immediate)</h4>
                <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                >
{`# Immediate Approach  
"Act quickly on clear opportunities:
1. Identify the core requirement
2. Take the most direct action
3. Adjust course if needed
4. Maintain momentum

Favor rapid iteration over extensive 
upfront planning."`}
                </code>
                <div className="text-sm">
                  <Badge className="mb-1 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Use cases:</Badge>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Time-sensitive tasks</li>
                    <li>Simple, clear objectives</li>
                    <li>Rapid prototyping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reasoning Effort Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Reasoning Effort Configuration
          </CardTitle>
          <CardDescription>
            Controlling the depth and thoroughness of agent analysis and reasoning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium min-w-[100px]">Reasoning Effort:</span>
                <Slider
                  value={reasoningEffort}
                  onValueChange={setReasoningEffort}
                  max={3}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[200px]">
                  {getReasoningDescription(reasoningEffort[0])}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className={conceptSurface(
                    cn(
                      "p-4 space-y-3 transition-all",
                      reasoningEffort[0] === 1 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <h5 className="font-semibold mb-2">Low Effort</h5>
                  <code className={conceptCodeBlock("text-xs p-2 mb-2 whitespace-pre-wrap")}
                  >
                    "Provide a quick, straightforward response based on immediate analysis."
                  </code>
                  <div className="text-sm">
                    <Badge variant="outline" className="mb-1">Characteristics:</Badge>
                    <ul className="text-xs space-y-1">
                      <li>• Fast response time</li>
                      <li>• Surface-level analysis</li>
                      <li>• Direct answers</li>
                      <li>• Minimal elaboration</li>
                    </ul>
                  </div>
                </div>

                <div
                  className={conceptSurface(
                    cn(
                      "p-4 space-y-3 transition-all",
                      reasoningEffort[0] === 2 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <h5 className="font-semibold mb-2">Medium Effort</h5>
                  <code className={conceptCodeBlock("text-xs p-2 mb-2 whitespace-pre-wrap")}
                  >
                    "Think through this step-by-step, considering key factors and implications."
                  </code>
                  <div className="text-sm">
                    <Badge variant="outline" className="mb-1">Characteristics:</Badge>
                    <ul className="text-xs space-y-1">
                      <li>• Balanced analysis</li>
                      <li>• Consider alternatives</li>
                      <li>• Structured reasoning</li>
                      <li>• Practical depth</li>
                    </ul>
                  </div>
                </div>

                <div
                  className={conceptSurface(
                    cn(
                      "p-4 space-y-3 transition-all",
                      reasoningEffort[0] === 3 && "ring-2 ring-primary/60 bg-primary/10 shadow-sm"
                    )
                  )}
                >
                  <h5 className="font-semibold mb-2">High Effort</h5>
                  <code className={conceptCodeBlock("text-xs p-2 mb-2 whitespace-pre-wrap")}
                  >
                    "Analyze this comprehensively from multiple angles, considering edge cases and implications."
                  </code>
                  <div className="text-sm">
                    <Badge variant="outline" className="mb-1">Characteristics:</Badge>
                    <ul className="text-xs space-y-1">
                      <li>• Deep analysis</li>
                      <li>• Multiple perspectives</li>
                      <li>• Edge case consideration</li>
                      <li>• Comprehensive coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tool Integration Control */}
      <Tabs defaultValue="preambles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preambles">Tool Preambles</TabsTrigger>
          <TabsTrigger value="context">Context Management</TabsTrigger>
          <TabsTrigger value="coordination">Multi-Tool Coordination</TabsTrigger>
        </TabsList>

        <TabsContent value="preambles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Tool Integration Preambles
              </CardTitle>
              <CardDescription>
                Setting up proper context and expectations for tool usage in workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">File System Tool Preamble</h4>
                  <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                  >
{`# File System Tool Context
You have access to file system operations with the following capabilities:
- Read/write text files
- List directory contents  
- Create/delete files and folders
- Check file existence and properties

## Constraints
- Never delete system files or folders
- Always verify file existence before operations
- Use relative paths when possible
- Handle permissions errors gracefully

## Expected Behavior
- Confirm destructive operations before executing
- Provide clear feedback on operation success/failure
- Suggest alternatives when operations fail
- Maintain data integrity throughout operations`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Web Search Tool Preamble</h4>
                  <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                  >
{`# Web Search Tool Context
You can search the web for current information with these capabilities:
- Real-time web search
- Access to recent information
- Multiple search strategies
- Result filtering and ranking

## Constraints  
- Verify information from multiple sources when possible
- Be aware of potential bias in search results
- Respect rate limits and usage policies
- Don't access restricted or private content

## Expected Behavior
- Use targeted search queries for better results
- Synthesize information from multiple sources
- Indicate when information might be outdated
- Provide source attribution for factual claims`}
                  </code>
                </div>
              </div>

              <Alert>
                <Wrench className="h-4 w-4" />
                <AlertDescription>
                  <strong>Preamble Design Principle:</strong> Each tool preamble should establish 
                  context, define constraints, and set behavioral expectations to ensure consistent 
                  and safe tool usage across different scenarios.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="w-5 h-5" />
                Context Management Strategies
              </CardTitle>
              <CardDescription>
                Maintaining relevant context throughout multi-step agentic workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Context Preservation</h4>
                    <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                    >
{`# Context Management Protocol
## State Tracking
- Maintain running summary of key decisions
- Track dependencies between steps
- Record assumptions and constraints
- Note any changes in requirements

## Information Prioritization
- Keep critical context readily accessible
- Archive detailed history for reference
- Surface relevant context for current task
- Highlight conflicts or inconsistencies

## Context Updates
- Update context after each major step
- Validate context relevance periodically
- Merge new information systematically
- Prune outdated or irrelevant details`}
                    </code>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Context Transitions</h4>
                    <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                    >
{`# Context Handoff Protocol
## Between Workflow Steps
- Summarize current state and progress
- Identify next step requirements
- Carry forward relevant constraints
- Note any context dependencies

## Between Tool Invocations  
- Preserve tool output in context
- Link outputs to workflow objectives
- Track cumulative information gathering
- Maintain tool interaction history

## Error Recovery
- Preserve context during error handling
- Identify what context is still valid
- Restart with minimal context loss
- Learn from context-related failures`}
                    </code>
                  </div>
                </div>

                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-primary mb-2">Context Management Best Practices</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Use structured context formats for consistency</li>
                    <li>• Implement context checkpoints at key workflow stages</li>
                    <li>• Design context recovery mechanisms for failures</li>
                    <li>• Balance context richness with processing efficiency</li>
                    <li>• Test context preservation across workflow boundaries</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circuitry className="w-5 h-5" />
                Multi-Tool Coordination Patterns
              </CardTitle>
              <CardDescription>
                Orchestrating multiple tools effectively in complex agentic workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Sequential Tool Chain</h4>
                  <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
                  >
{`# Sequential Coordination Pattern
Tool_A → Tool_B → Tool_C → Result

Example: Research Pipeline
1. Web_Search("topic overview")
   → Extract key concepts
2. File_Read("related_docs/") 
   → Gather existing knowledge
3. Analysis_Tool(combined_data)
   → Generate insights
4. File_Write("research_summary.md")
   → Save results

# Coordination Rules
- Pass relevant output between tools
- Validate each step before proceeding  
- Handle tool failures gracefully
- Maintain audit trail of tool usage`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Parallel Tool Orchestration</h4>
      <code className={conceptCodeBlock("text-sm p-3 whitespace-pre-wrap")}
      >
{`# Parallel Coordination Pattern
Tool_A ↘
        → Merge → Result  
Tool_B ↗

Example: Multi-Source Analysis
Parallel Execution:
1a. Web_Search("recent_trends")
1b. Database_Query("historical_data")  
1c. File_Read("expert_opinions/")

2. Data_Fusion(all_sources)
   → Synthesize findings
3. Report_Generator(fused_data)
   → Create comprehensive report

# Coordination Rules
- Start independent tools simultaneously
- Monitor progress of all parallel tracks
- Implement timeout and retry logic
- Synchronize results before merging`}
                  </code>
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-4 space-y-3")}
              >
                <h4 className="font-semibold text-emerald-600 dark:text-emerald-300 mb-3">
                  Advanced Coordination Strategies
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <Badge variant="outline" className="mb-2">Adaptive Routing</Badge>
                    <ul className="space-y-1">
                      <li>• Choose tools based on data characteristics</li>
                      <li>• Route to backup tools on failure</li>
                      <li>• Optimize tool selection for performance</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Result Validation</Badge>
                    <ul className="space-y-1">
                      <li>• Cross-validate results between tools</li>
                      <li>• Implement consistency checks</li>
                      <li>• Handle conflicting tool outputs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* References */}
      <ReferenceSection type="concept" itemId="agentic-workflow-control" />

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
          onClick={() => onNavigateToNext?.('agent-evaluation-methodologies')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next: Agent Evaluation Methodologies
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgenticWorkflowControl;











