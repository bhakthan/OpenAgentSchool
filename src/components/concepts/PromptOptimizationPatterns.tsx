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
  // Added 'taxonomy' tab to surface holistic defect categories before diving into specific optimization patterns
  const [activePattern, setActivePattern] = useState<'taxonomy' | 'contradictions' | 'specificity' | 'constraints' | 'examples'>('taxonomy');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Ask AI */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <TrendUp className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Prompt Optimization Patterns
            <EnlightenMeButton
              title="Prompt Optimization Patterns"
              contextDescription="Learn advanced techniques for improving prompt efficiency, clarity, and effectiveness"
              size="xs"
              visual="subtle"
              iconOnly
              hideHotkeyHint
            />
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn systematic approaches to identify and fix common prompting problems for better agent performance
        </p>
        
        {/* Audio Narration Controls */}
        <AudioNarrationControls 
          componentName="PromptOptimizationPatterns"
          position="embedded"
        />
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

      {/* Common Problems & Solutions + Defect Taxonomy */}
      <Tabs value={activePattern} onValueChange={(value: any) => setActivePattern(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="taxonomy">Defect Map</TabsTrigger>
          <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
          <TabsTrigger value="specificity">Specificity</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        {/* Prompt Defect Taxonomy (Visual Map + Narrative) */}
        <TabsContent value="taxonomy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-amber-500" />
                Prompt Defect Taxonomy (Holistic Map)
              </CardTitle>
              <CardDescription>
                A visual systems view of recurring prompt & instruction defects and mitigation strategies—use this to triage before applying specific optimization patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Narrative Explanation of the Six Dimensions */}
              <div className="p-4 rounded-md border bg-background/50 dark:bg-gray-800/40 text-sm leading-relaxed space-y-3">
                <h4 className="font-semibold text-base">Six Prompt Defect Dimensions</h4>
                <p>
                  The taxonomy groups <strong>recurring failure modes</strong> that cause prompts to underperform or drift. Diagnose at the
                  <em> dimension level first</em>—fixing structural or specification issues upstream prevents wasted cycles tweaking individual words.
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    <strong>Specification & Intent:</strong> Goal capture failures—ambiguous targets, missing success criteria, conflicting priorities, underspecified constraints.
                  </li>
                  <li>
                    <strong>Input & Content:</strong> Issues in supplied user / system / retrieval content—irrelevant, malicious (prompt injection), stale, or factually incorrect context.
                  </li>
                  <li>
                    <strong>Structure & Formatting:</strong> Organizational or syntactic weaknesses—unordered sections, missing delimiters, unclear output schema, noisy redundancy.
                  </li>
                  <li>
                    <strong>Context & Memory:</strong> Failure to manage temporal / conversational continuity—context window overflow, forgetting prior constraints, fragmented hand‑offs, stale retrieval.
                  </li>
                  <li>
                    <strong>Performance & Efficiency:</strong> Latency / cost inefficiencies—prompt bloat, unnecessary chain steps, over-specifying examples, redundant reasoning loops.
                  </li>
                  <li>
                    <strong>Maintainability & Engineering:</strong> Operational fragility—hard‑coded blocks, version drift, hidden coupling across chains, untested edits causing regression risk.
                  </li>
                </ol>
                <p className="text-muted-foreground text-xs">Reference adapted from <a href="https://arxiv.org/pdf/2509.14404" target="_blank" rel="noopener noreferrer" className="underline">arXiv:2509.14404</a> with pragmatic engineering-oriented clustering.</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4 flex flex-col items-center gap-4">
                {/* NOTE: Place the exported image file at public/images/prompt-defect-taxonomy.png */}
                <img
                  src="/images/prompt-defect-taxonomy.png"
                  alt="Prompt Defect Taxonomy showing six dimensions: Specification & Intent, Input & Content, Structure & Formatting, Context & Memory, Performance & Efficiency, Maintainability & Engineering, each with sub-defects and mitigations."
                  className="w-full max-w-5xl rounded-md shadow-sm border"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground text-center max-w-3xl">
                  Source adaptation referencing <a href="https://arxiv.org/pdf/2509.14404" target="_blank" rel="noopener noreferrer" className="underline text-primary">arXiv:2509.14404</a>. This map clusters defects you should scan for <em>before</em> micro-optimizing individual instructions. Address upstream category issues first (e.g., missing constraints) to avoid chasing noise at the pattern level.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Specification & Intent</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Ambiguous instruction</li>
                    <li>Underspecified constraints</li>
                    <li>Conflicting directives</li>
                    <li>Poor task alignment</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Often resolved by the Contradictions & Specificity patterns.</p>
                </div>
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Input & Content</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Irrelevant / noisy input</li>
                    <li>Prompt injection attempts</li>
                    <li>Stale or hallucinated facts</li>
                    <li>Toxic / policy-violating text</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Mitigate via retrieval validation, sanitization, and guardrail filters.</p>
                </div>
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Structure & Formatting</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Inconsistent sections</li>
                    <li>Poor example curation</li>
                    <li>Unclear output schema</li>
                    <li>Redundant / noisy prose</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Reinforced by Examples & Constraints tabs.</p>
                </div>
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Context & Memory</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Context overload / drift</li>
                    <li>Stale retrieval</li>
                    <li>Missing grounding facts</li>
                    <li>Fragmented state handoff</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Often discovered during evaluation instrumentation.</p>
                </div>
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Performance & Efficiency</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Excess token churn</li>
                    <li>Irrelevant chain steps</li>
                    <li>Latency amplification</li>
                    <li>Sprawl of nested calls</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Feeds directly into Constraints optimization.</p>
                </div>
                <div className="p-4 border rounded-md bg-background/50 dark:bg-gray-800/40">
                  <h4 className="font-semibold mb-2">Maintainability & Engineering</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Hidden coupling</li>
                    <li>Version drift</li>
                    <li>Hard-coded monoliths</li>
                    <li>Untested prompt edits</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">Introduce versioning & diff tests to prevent silent regressions.</p>
                </div>
              </div>
              <div className="p-4 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm">
                <strong>Usage Flow:</strong> 1) Start with this map to classify failures. 2) Apply targeted pattern tabs (Contradictions → Specificity → Constraints → Examples). 3) Re-evaluate using your agent test harness. 4) Track resolved defect categories to avoid regression.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                  <Badge className="mb-2 ring-1 bg-[var(--badge-red-bg)] ring-[var(--badge-red-ring)] text-[var(--badge-red-text)]">Vague</Badge>
                  <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded mb-2">
                    "Keep it fast and lightweight"
                  </code>
                  <p className="text-sm text-muted-foreground">
                    No measurable criteria
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge className="mb-2 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Better</Badge>
                  <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:bg-slate-800 rounded mb-2">
                    "Optimize for speed and memory usage"
                  </code>
                  <p className="text-sm text-muted-foreground">
                    Clearer intent but still unclear
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <Badge className="mb-2 ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)]">Specific</Badge>
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
                        <Badge className="mb-1 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Instruction</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          "Use only standard library. No external packages."
                        </code>
                      </div>
                      <div>
                        <Badge className="mb-1 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Example</Badge>
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
                        <Badge className="mb-1 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Instruction</Badge>
                        <code className="text-xs block p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">
                          "Use only standard library. No external packages."
                        </code>
                      </div>
                      <div>
                        <Badge className="mb-1 ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Example</Badge>
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











