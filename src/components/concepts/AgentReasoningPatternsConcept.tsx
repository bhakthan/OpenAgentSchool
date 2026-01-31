import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, GitBranch, Network, RotateCcw, Lightbulb, Code, Target, Layers, ArrowRight, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ReasoningPatternsViz from "@/components/visualization/ReasoningPatternsViz";

interface ReasoningPattern {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  whenToUse: string[];
  strengths: string[];
  limitations: string[];
  codeExample: string;
  realWorld: string;
}

const reasoningPatterns: ReasoningPattern[] = [
  {
    id: "chain-of-thought",
    name: "Chain-of-Thought (CoT)",
    icon: <ArrowRight className="w-6 h-6" />,
    description: "Linear step-by-step reasoning where each thought builds on the previous one. The foundation of structured agent reasoning.",
    whenToUse: [
      "Math and logical problems",
      "Multi-step calculations",
      "Sequential decision making",
      "Debugging and root cause analysis"
    ],
    strengths: [
      "Simple to implement",
      "Highly interpretable trace",
      "Works with any LLM",
      "Low token overhead"
    ],
    limitations: [
      "Can't backtrack on errors",
      "Single path exploration",
      "Prone to error propagation",
      "No parallel exploration"
    ],
    codeExample: `def chain_of_thought(problem: str, llm) -> str:
    """Chain-of-Thought: Linear step-by-step reasoning"""
    
    prompt = f"""
    Problem: {problem}
    
    Let's solve this step by step:
    
    Step 1: First, I need to understand what we're solving...
    Step 2: Next, I'll identify the key variables...
    Step 3: Now I'll apply the relevant formula or logic...
    Step 4: Finally, I'll verify my answer...
    
    Please solve this problem showing your reasoning at each step.
    """
    
    response = llm.generate(prompt)
    
    # Extract steps and final answer
    steps = parse_reasoning_steps(response)
    
    return {
        "reasoning_trace": steps,
        "final_answer": steps[-1] if steps else None,
        "confidence": calculate_step_coherence(steps)
    }

# Usage
result = chain_of_thought(
    "If a train travels 120 miles in 2 hours, then stops for 30 minutes, "
    "then travels 90 more miles in 1.5 hours, what was its average speed?",
    llm=my_llm
)`,
    realWorld: "GPT-4 and Claude use CoT internally. Google's Gemini 'thinking' mode shows explicit CoT traces."
  },
  {
    id: "tree-of-thought",
    name: "Tree-of-Thought (ToT)",
    icon: <GitBranch className="w-6 h-6" />,
    description: "Branching exploration where multiple reasoning paths are explored in parallel, with evaluation and pruning at each step.",
    whenToUse: [
      "Creative problem solving",
      "Game playing and puzzles",
      "Code generation with alternatives",
      "Strategic planning"
    ],
    strengths: [
      "Explores multiple solutions",
      "Can recover from bad paths",
      "Finds optimal solutions",
      "Parallel exploration"
    ],
    limitations: [
      "High token cost (3-10x CoT)",
      "Complex implementation",
      "Requires good evaluator",
      "Slower execution"
    ],
    codeExample: `from typing import List, Tuple
from dataclasses import dataclass

@dataclass
class ThoughtNode:
    content: str
    score: float
    children: List['ThoughtNode']
    depth: int

def tree_of_thought(
    problem: str,
    llm,
    max_depth: int = 3,
    branch_factor: int = 3,
    beam_width: int = 2
) -> ThoughtNode:
    """Tree-of-Thought: Explore multiple reasoning paths with pruning"""
    
    def generate_thoughts(state: str, depth: int) -> List[str]:
        prompt = f"""
        Problem: {problem}
        Current reasoning: {state}
        
        Generate {branch_factor} different next steps to continue this reasoning.
        Each step should explore a different approach or angle.
        """
        return llm.generate_list(prompt, n=branch_factor)
    
    def evaluate_thought(thought: str) -> float:
        prompt = f"""
        Problem: {problem}
        Proposed solution path: {thought}
        
        Rate this reasoning path from 0-10 on:
        1. Logical coherence
        2. Progress toward solution  
        3. Correctness so far
        
        Return a single score 0-10.
        """
        return float(llm.generate(prompt))
    
    def expand_node(node: ThoughtNode) -> List[ThoughtNode]:
        if node.depth >= max_depth:
            return []
        
        thoughts = generate_thoughts(node.content, node.depth)
        children = []
        
        for thought in thoughts:
            full_path = f"{node.content}\\n→ {thought}"
            score = evaluate_thought(full_path)
            children.append(ThoughtNode(
                content=full_path,
                score=score,
                children=[],
                depth=node.depth + 1
            ))
        
        # Beam search: keep top-k paths
        children.sort(key=lambda x: x.score, reverse=True)
        return children[:beam_width]
    
    # BFS expansion with beam search
    root = ThoughtNode(content="", score=0, children=[], depth=0)
    frontier = [root]
    
    for _ in range(max_depth):
        next_frontier = []
        for node in frontier:
            node.children = expand_node(node)
            next_frontier.extend(node.children)
        
        # Keep beam_width best nodes
        next_frontier.sort(key=lambda x: x.score, reverse=True)
        frontier = next_frontier[:beam_width]
    
    # Return best leaf path
    return max(frontier, key=lambda x: x.score)`,
    realWorld: "Used in AlphaCode for code generation, game-playing AI, and complex planning tasks."
  },
  {
    id: "graph-of-thought",
    name: "Graph-of-Thought (GoT)",
    icon: <Network className="w-6 h-6" />,
    description: "Non-linear reasoning with loops, merges, and cross-references. Thoughts can reference and build on any previous thought.",
    whenToUse: [
      "Complex research synthesis",
      "Multi-document analysis",
      "Knowledge integration",
      "Iterative refinement"
    ],
    strengths: [
      "Handles complex dependencies",
      "Merges parallel insights",
      "Iterative refinement",
      "Most flexible structure"
    ],
    limitations: [
      "Highest complexity",
      "Risk of cycles/loops",
      "Hard to trace decisions",
      "Expensive to implement"
    ],
    codeExample: `from typing import Dict, Set
import networkx as nx

class GraphOfThought:
    """Graph-of-Thought: Non-linear reasoning with merges and loops"""
    
    def __init__(self, llm):
        self.llm = llm
        self.graph = nx.DiGraph()
        self.thought_counter = 0
    
    def add_thought(self, content: str, depends_on: List[str] = None) -> str:
        """Add a thought node, optionally linking to predecessors"""
        thought_id = f"T{self.thought_counter}"
        self.thought_counter += 1
        
        self.graph.add_node(thought_id, content=content)
        
        if depends_on:
            for dep in depends_on:
                self.graph.add_edge(dep, thought_id)
        
        return thought_id
    
    def merge_thoughts(self, thought_ids: List[str]) -> str:
        """Synthesize multiple thoughts into a unified insight"""
        contents = [self.graph.nodes[tid]['content'] for tid in thought_ids]
        
        prompt = f"""
        Synthesize these reasoning threads into a unified insight:
        
        {chr(10).join(f'Thread {i+1}: {c}' for i, c in enumerate(contents))}
        
        Identify:
        1. Common themes
        2. Complementary insights
        3. Contradictions to resolve
        4. Unified conclusion
        """
        
        merged = self.llm.generate(prompt)
        return self.add_thought(merged, depends_on=thought_ids)
    
    def refine_thought(self, thought_id: str, critique: str) -> str:
        """Create a refined version of an existing thought"""
        original = self.graph.nodes[thought_id]['content']
        
        prompt = f"""
        Original reasoning: {original}
        Critique: {critique}
        
        Produce an improved version that addresses the critique.
        """
        
        refined = self.llm.generate(prompt)
        return self.add_thought(refined, depends_on=[thought_id])
    
    def solve(self, problem: str) -> Dict:
        """Full GoT reasoning loop"""
        # Initial divergent thinking
        initial_thoughts = []
        for angle in ["analytical", "creative", "practical"]:
            prompt = f"Approach this {angle}ly: {problem}"
            thought = self.llm.generate(prompt)
            tid = self.add_thought(thought)
            initial_thoughts.append(tid)
        
        # Merge phase
        synthesis = self.merge_thoughts(initial_thoughts)
        
        # Refinement loop
        for _ in range(2):
            critique = self.llm.generate(
                f"Critique this reasoning: {self.graph.nodes[synthesis]['content']}"
            )
            synthesis = self.refine_thought(synthesis, critique)
        
        return {
            "final_thought": self.graph.nodes[synthesis]['content'],
            "reasoning_graph": self.graph,
            "total_thoughts": len(self.graph.nodes)
        }`,
    realWorld: "Research AI like Elicit, consensus systems, and multi-source fact-checking."
  },
  {
    id: "self-reflection",
    name: "Reflexion & Self-Critique",
    icon: <RotateCcw className="w-6 h-6" />,
    description: "The agent evaluates its own reasoning, identifies errors, and iteratively improves until confident in the solution.",
    whenToUse: [
      "High-stakes decisions",
      "Code review and debugging",
      "Fact verification",
      "Quality assurance tasks"
    ],
    strengths: [
      "Self-correcting behavior",
      "Catches obvious errors",
      "Improves over iterations",
      "Builds in verification"
    ],
    limitations: [
      "Can hallucinate validation",
      "Multiple LLM calls (2-5x)",
      "May over-correct",
      "Needs good self-awareness"
    ],
    codeExample: `class ReflexionAgent:
    """Reflexion: Self-critique and iterative improvement"""
    
    def __init__(self, llm, max_iterations: int = 3):
        self.llm = llm
        self.max_iterations = max_iterations
        self.memory = []  # Store past attempts and reflections
    
    def solve(self, problem: str) -> Dict:
        attempt = None
        
        for iteration in range(self.max_iterations):
            # Generate or improve solution
            if attempt is None:
                attempt = self._initial_attempt(problem)
            else:
                attempt = self._improve_attempt(problem, attempt, reflection)
            
            # Self-evaluate
            evaluation = self._evaluate(problem, attempt)
            
            if evaluation['is_correct']:
                return {
                    "solution": attempt,
                    "iterations": iteration + 1,
                    "reflections": self.memory
                }
            
            # Reflect on failure
            reflection = self._reflect(problem, attempt, evaluation)
            self.memory.append({
                "attempt": attempt,
                "evaluation": evaluation,
                "reflection": reflection
            })
        
        return {"solution": attempt, "iterations": self.max_iterations, 
                "warning": "Max iterations reached"}
    
    def _initial_attempt(self, problem: str) -> str:
        past_context = ""
        if self.memory:
            past_context = f"""
            Previous attempts that failed:
            {self._format_memory()}
            
            Avoid these mistakes:
            """
        
        return self.llm.generate(f"""
            Problem: {problem}
            {past_context}
            Provide your solution:
        """)
    
    def _evaluate(self, problem: str, attempt: str) -> Dict:
        evaluation = self.llm.generate(f"""
            Problem: {problem}
            Proposed solution: {attempt}
            
            Evaluate this solution:
            1. Is it logically sound? (yes/no)
            2. Does it fully address the problem? (yes/no)
            3. Are there any errors? List them.
            4. Confidence score (0-100)
            
            Format: JSON with keys: is_correct, issues, confidence
        """)
        return parse_json(evaluation)
    
    def _reflect(self, problem: str, attempt: str, evaluation: Dict) -> str:
        return self.llm.generate(f"""
            My attempt: {attempt}
            Issues found: {evaluation.get('issues', [])}
            
            Reflect on what went wrong:
            1. What was the root cause of the error?
            2. What should I do differently next time?
            3. What knowledge was I missing?
        """)`,
    realWorld: "Claude's extended thinking, OpenAI o1/o3 models, and production code review systems."
  }
];

const comparisonMatrix = [
  { pattern: "Chain-of-Thought", tokens: "1x", complexity: "Low", accuracy: "Good", speed: "Fast", bestFor: "Simple reasoning" },
  { pattern: "Tree-of-Thought", tokens: "5-10x", complexity: "Medium", accuracy: "High", speed: "Medium", bestFor: "Exploration needed" },
  { pattern: "Graph-of-Thought", tokens: "10-20x", complexity: "High", accuracy: "Highest", speed: "Slow", bestFor: "Complex synthesis" },
  { pattern: "Reflexion", tokens: "2-5x", complexity: "Low", accuracy: "High", speed: "Medium", bestFor: "Error-prone tasks" }
];

const productionTips = [
  {
    title: "Start with CoT, escalate as needed",
    description: "Use Chain-of-Thought by default. Only move to ToT/GoT when CoT fails consistently.",
    icon: <Target className="w-5 h-5 text-green-500" />
  },
  {
    title: "Budget your reasoning tokens",
    description: "Set max token limits per reasoning phase. GoT can explode costs without guards.",
    icon: <Zap className="w-5 h-5 text-yellow-500" />
  },
  {
    title: "Cache intermediate thoughts",
    description: "Store evaluated thought nodes. Reuse them across similar problems to save LLM calls.",
    icon: <Layers className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Build evaluation metrics",
    description: "Track which reasoning pattern works best for each problem type. Automate pattern selection.",
    icon: <CheckCircle className="w-5 h-5 text-purple-500" />
  }
];

export default function AgentReasoningPatternsConcept() {
  const [selectedPattern, setSelectedPattern] = useState<ReasoningPattern>(reasoningPatterns[0]);

  return (
    <ConceptLayout
      conceptId="agent-reasoning-patterns"
      title="Agent Reasoning Patterns"
      description="Master the cognitive architectures that make AI agents think: Chain-of-Thought, Tree-of-Thought, Graph-of-Thought, and Reflexion"
      icon={<Brain className="w-8 h-8" />}
      concepts={["Chain-of-Thought", "Tree-of-Thought", "Graph-of-Thought", "Reflexion", "Reasoning Evaluation"]}
      estimatedTime="45-55 min"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Reasoning Patterns Matter</h3>
                <p className="text-muted-foreground">
                  The difference between a good agent and a great agent isn't the LLM—it's how the agent 
                  structures its thinking. Reasoning patterns transform raw LLM outputs into reliable, 
                  verifiable, and improvable decision-making systems.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-purple-500/10">o1/o3 Thinking</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Claude Extended Thinking</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Gemini Deep Think</Badge>
                  <Badge variant="outline" className="bg-orange-500/10">DeepSeek R1</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Visualization */}
        <ReasoningPatternsViz autoPlay={true} />

        {/* Reasoning Patterns Infographic */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4" /> Agent Reasoning Patterns Overview
          </h3>
          <img 
            src="/images/Agent_Reasoning_Pattern.png" 
            alt="Agent Reasoning Patterns: Chain-of-Thought, Tree-of-Thought, Graph-of-Thought, and Reflexion" 
            className="w-full rounded-lg shadow-sm border"
            loading="lazy"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            From linear CoT to branching ToT, non-linear GoT, and self-correcting Reflexion patterns
          </p>
        </div>

        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patterns">Reasoning Patterns</TabsTrigger>
            <TabsTrigger value="comparison">Comparison Matrix</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="production">Production Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="space-y-6">
            {/* Pattern Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reasoningPatterns.map((pattern) => (
                <Card
                  key={pattern.id}
                  className={`cursor-pointer transition-all hover:border-purple-500/50 ${
                    selectedPattern.id === pattern.id ? 'border-purple-500 bg-purple-500/5' : ''
                  }`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-purple-400">
                      {pattern.icon}
                    </div>
                    <h4 className="font-medium text-sm">{pattern.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pattern Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    {selectedPattern.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedPattern.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPattern.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" /> When to Use
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {selectedPattern.whenToUse.map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" /> Strengths
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {selectedPattern.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" /> Limitations
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {selectedPattern.limitations.map((limit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          {limit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-400" /> Real-World Usage
                  </h4>
                  <p className="text-sm text-muted-foreground bg-orange-500/5 p-3 rounded-lg border border-orange-500/20">
                    {selectedPattern.realWorld}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> Implementation
                  </h4>
                  <CodeBlock language="python">
                    {selectedPattern.codeExample}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Pattern Comparison Matrix</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose the right reasoning pattern based on your requirements
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Pattern</th>
                        <th className="text-left py-3 px-4 font-medium">Token Cost</th>
                        <th className="text-left py-3 px-4 font-medium">Complexity</th>
                        <th className="text-left py-3 px-4 font-medium">Accuracy</th>
                        <th className="text-left py-3 px-4 font-medium">Speed</th>
                        <th className="text-left py-3 px-4 font-medium">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonMatrix.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">{row.pattern}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{row.tokens}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={row.complexity === 'Low' ? 'default' : row.complexity === 'Medium' ? 'secondary' : 'destructive'}>
                              {row.complexity}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{row.accuracy}</td>
                          <td className="py-3 px-4">{row.speed}</td>
                          <td className="py-3 px-4 text-muted-foreground">{row.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Decision Tree</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">🎯 Step 1: Analyze Your Task</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Is it a single-answer problem? → Start with <strong>CoT</strong></li>
                      <li>• Does it need exploring alternatives? → Consider <strong>ToT</strong></li>
                      <li>• Does it synthesize multiple sources? → Use <strong>GoT</strong></li>
                      <li>• Is accuracy critical? → Add <strong>Reflexion</strong> layer</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">🔄 Step 2: Combine Patterns</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Most production agents combine patterns:
                    </p>
                    <code className="text-xs bg-black/30 p-2 rounded block">
                      CoT (initial reasoning) → ToT (explore alternatives) → Reflexion (verify)
                    </code>
                  </div>

                  <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                    <h4 className="font-medium mb-2">📊 Step 3: Measure & Iterate</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Track accuracy per pattern</li>
                      <li>• Monitor token spend per task type</li>
                      <li>• A/B test pattern combinations</li>
                      <li>• Auto-select based on task classification</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <div className="grid md:grid-cols-2 gap-4">
              {productionTips.map((tip, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-background border">
                        {tip.icon}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
