import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  TrendUp, 
  Warning,
  ArrowsClockwise,
  ChartBar,
  Code,
  Target,
  Lightning
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import ReferenceSection from "@/components/references/ReferenceSection";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';

interface PromptOptimizationPatternsProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const PromptOptimizationPatterns: React.FC<PromptOptimizationPatternsProps> = ({
  onMarkComplete,
  onNavigateToNext
}) => {
  const [activePattern, setActivePattern] = useState<'contradictions' | 'specificity' | 'constraints' | 'examples'>('contradictions');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <TrendUp className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold">Prompt Optimization Patterns</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn systematic approaches to identify and fix common prompting problems for better agent performance
        </p>
        
        {/* Audio Narration Controls */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <AudioNarrationControls 
            componentName="PromptOptimizationPatterns"
            position="embedded"
            className="justify-center"
          />
        </div>
      </div>

      {/* Optimization Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowsClockwise className="w-6 h-6 text-primary" />
            The Optimization Process
          </CardTitle>
          <CardDescription>
            A systematic approach to analyzing and improving agent prompts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-1">Identify Issues</h4>
              <p className="text-sm text-muted-foreground">
                Find contradictions, ambiguity, and gaps
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-1">Apply Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Use proven optimization techniques
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-1">Test & Measure</h4>
              <p className="text-sm text-muted-foreground">
                Evaluate performance improvements
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-1">Iterate</h4>
              <p className="text-sm text-muted-foreground">
                Refine based on results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Problems & Solutions */}
      <Tabs value={activePattern} onValueChange={(value: any) => setActivePattern(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
          <TabsTrigger value="specificity">Specificity</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="contradictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-red-500" />
                Eliminating Contradictions
              </CardTitle>
              <CardDescription>
                Identifying and resolving conflicting instructions that confuse agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Warning className="h-4 w-4" />
                <AlertDescription>
                  Contradictory instructions force agents to make arbitrary choices, leading to 
                  inconsistent behavior and reduced performance.
                </AlertDescription>
              </Alert>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border-2 border-red-200 dark:border-red-800 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Problematic (Before)</h4>
                    <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded mb-3 whitespace-pre-wrap">
{`"Prefer the standard library; use external packages if they make things simpler.

Stream input in one pass to keep memory low; reread or cache if that makes the solution clearer.

Aim for exact results; approximate methods are fine when they don't change the outcome in practice."`}
                    </code>
                    <div className="text-sm">
                      <strong className="text-red-600 dark:text-red-400">Issues:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-red-600 dark:text-red-400">
                        <li>Standard library vs external packages</li>
                        <li>Single-pass vs reread/cache</li>
                        <li>Exact vs approximate results</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border-2 border-green-200 dark:border-green-800 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">✅ Optimized (After)</h4>
                    <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded mb-3 whitespace-pre-wrap">
{`"Use only Python stdlib. No external dependencies.

Do NOT materialize the entire token stream. Process data in a single pass using generators.

Compute exact Top-K results using bounded min-heap. No approximate algorithms."`}
                    </code>
                    <div className="text-sm">
                      <strong className="text-green-600 dark:text-green-400">Improvements:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-green-600 dark:text-green-400">
                        <li>Clear, unambiguous requirements</li>
                        <li>Specific implementation constraints</li>
                        <li>Exact algorithmic specifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Contradiction Detection Checklist</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Look for "prefer X, but Y is also fine" patterns</li>
                  <li>• Identify competing priorities without clear hierarchy</li>
                  <li>• Check for contradictory performance vs. quality trade-offs</li>
                  <li>• Ensure constraints don't conflict with objectives</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specificity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Increasing Specificity
              </CardTitle>
              <CardDescription>
                Moving from vague instructions to precise, actionable requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Badge variant="destructive" className="mb-2">Vague</Badge>
                  <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded mb-2">
                    "Keep it fast and lightweight"
                  </code>
                  <p className="text-sm text-muted-foreground">
                    No measurable criteria
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge variant="secondary" className="mb-2">Better</Badge>
                  <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded mb-2">
                    "Optimize for speed and memory usage"
                  </code>
                  <p className="text-sm text-muted-foreground">
                    Clearer intent but still unclear
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <Badge className="mb-2">Specific</Badge>
                  <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded mb-2">
                    "Target peak memory O(k), runtime O(N + U log k)"
                  </code>
                  <p className="text-sm text-muted-foreground">
                    Measurable performance criteria
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Before: Vague Requirements</h4>
                  <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 p-3 rounded">
                    "Sort results in a natural, human-friendly way; follow strict tie rules when applicable."
                  </code>
                  <div className="text-sm text-red-600 dark:text-red-400">
                    <strong>Problems:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>What is "natural" and "human-friendly"?</li>
                      <li>When are tie rules "applicable"?</li>
                      <li>What are the "strict tie rules"?</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">After: Precise Specifications</h4>
                  <code className="text-sm block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 p-3 rounded">
                    "Sort by count desc, then token asc. Use key=lambda kv: (-kv[1], kv[0]) for exact ordering."
                  </code>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <strong>Improvements:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Exact sorting specification</li>
                      <li>Code-level implementation guidance</li>
                      <li>Unambiguous tie-breaking rules</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constraints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5 text-purple-500" />
                Performance Constraints
              </CardTitle>
              <CardDescription>
                Defining clear boundaries for memory, time, and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">❌ Weak Constraints</h4>
                  <div className="space-y-3">
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Keep memory usage reasonable"
                    </code>
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Make it reasonably fast"
                    </code>
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Don't use too much memory"
                    </code>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    These constraints provide no actionable guidance and leave too much interpretation to the agent.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">✅ Strong Constraints</h4>
                  <div className="space-y-3">
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Target peak additional memory O(k) beyond counts dict"
                    </code>
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Do NOT sort all items unless k &gt;= 0.3 * unique_tokens"
                    </code>
                    <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded">
                      "Use heapq.nsmallest for exact selection with O(U log k)"
                    </code>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Specific algorithmic and complexity constraints provide clear implementation guidance.
                  </p>
                </div>
              </div>

              <Alert>
                <Lightning className="h-4 w-4" />
                <AlertDescription>
                  <strong>Best Practice:</strong> Frame constraints in terms of Big O notation, 
                  specific algorithms, or measurable thresholds rather than subjective descriptors.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Memory Constraints</h5>
                  <ul className="text-sm space-y-1">
                    <li>• O(k) additional memory</li>
                    <li>• No full materialization</li>
                    <li>• Streaming processing only</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Time Constraints</h5>
                  <ul className="text-sm space-y-1">
                    <li>• O(N) tokenization pass</li>
                    <li>• O(U log k) selection</li>
                    <li>• Avoid O(U log U) sorts</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2">Algorithm Constraints</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Use heapq.nsmallest</li>
                    <li>• Avoid Counter.most_common</li>
                    <li>• Generator-based processing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-orange-500" />
                Example Consistency
              </CardTitle>
              <CardDescription>
                Ensuring examples align with instructions and demonstrate best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Code className="h-4 w-4" />
                <AlertDescription>
                  Inconsistencies between instructions and examples create confusion. 
                  Examples should perfectly demonstrate the specified requirements.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-4 border-2 border-red-200 dark:border-red-800 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Inconsistent Example</h4>
                    <div className="space-y-2">
                      <div>
                        <Badge variant="outline" className="mb-1">Instruction</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          "Use only standard library. No external packages."
                        </code>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-1">Example</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          import pandas as pd  # External dependency!
                        </code>
                      </div>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      Example contradicts the "standard library only" requirement
                    </p>
                  </div>

                  <div className="p-4 border-2 border-green-200 dark:border-green-800 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">✅ Consistent Example</h4>
                    <div className="space-y-2">
                      <div>
                        <Badge variant="outline" className="mb-1">Instruction</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          "Use only standard library. No external packages."
                        </code>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-1">Example</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          import re, heapq
                          from collections import Counter
                        </code>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Example demonstrates standard library usage only
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Example Quality Checklist</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1">
                      <li>✓ Follows all specified constraints</li>
                      <li>✓ Uses recommended algorithms/approaches</li>
                      <li>✓ Demonstrates proper error handling</li>
                      <li>✓ Shows expected input/output format</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>✓ Includes performance considerations</li>
                      <li>✓ Matches complexity requirements</li>
                      <li>✓ Uses consistent naming conventions</li>
                      <li>✓ Provides complete, runnable code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Optimization Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="w-6 h-6 text-primary" />
            Measuring Optimization Impact
          </CardTitle>
          <CardDescription>
            Quantifying the improvements from prompt optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">-84%</div>
              <div className="text-sm text-muted-foreground">Memory Usage</div>
              <Progress value={84} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">3626KB → 577KB</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">-12%</div>
              <div className="text-sm text-muted-foreground">Execution Time</div>
              <Progress value={12} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">7.9s → 7.0s</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+11%</div>
              <div className="text-sm text-muted-foreground">Code Quality</div>
              <Progress value={11} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">4.73 → 4.90/5</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded-lg text-sm">
            <strong>Key Insight:</strong> Even when baseline performance is good (100% accuracy), 
            optimization can significantly improve efficiency and code quality through clearer constraints and examples.
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <ReferenceSection type="concept" itemId="prompt-optimization-patterns" />

      <EnlightenMeButton
        title="Prompt Optimization Patterns"
        contextDescription="Learn advanced techniques for improving prompt efficiency, clarity, and effectiveness"
      />

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
          onClick={() => onNavigateToNext?.('agent-instruction-design')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next: Agent Instruction Design
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PromptOptimizationPatterns;











