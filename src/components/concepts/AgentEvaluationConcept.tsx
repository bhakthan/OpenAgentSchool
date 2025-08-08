import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, Trophy, TestTube, Briefcase } from "@phosphor-icons/react";
import { LLMAsJudgeVisual } from "@/components/visualization/evaluation/LLMAsJudgeVisual";
import { RewardModelVisual } from "@/components/visualization/evaluation/RewardModelVisual";
import { MultiAgentEvalVisual } from "@/components/visualization/evaluation/MultiAgentEvalVisual";
import CodeBlock from "@/components/ui/CodeBlock";
import AdvancedArchitectureSimulation from "@/components/visualization/evaluation/AdvancedArchitectureSimulation";

const PersonaBadge = ({ persona, className }: { persona: string, className?: string }) => (
  <Badge variant="secondary" className={className}>
    {persona}
  </Badge>
);

const ARCHITECTURE_CODE = `# Define the multi-agent environment
devops_team = MultiAgentSystem(["planner", "developer", "qa"])
environment = DevOpsEnvironment(task="Implement user login feature")

# Define evaluation criteria
metrics = {
    "time_to_completion": TimeMetric(),
    "code_quality": CodeQualityMetric(linter="pylint"),
    "bug_rate": BugRateMetric(),
    "collaboration_efficiency": CommunicationLogMetric()
}

# Run the simulation and evaluate
results = devops_team.evaluate(environment, metrics)
print(results)
# Output:
# {
#   "time_to_completion": "3.5 hours",
#   "code_quality": "A",
#   "bug_rate": "0.05",
#   "collaboration_efficiency": "0.85"
# }
`;

const AgentEvaluationConcept = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube size={28} /> Advanced AI Agent Evaluation
        </CardTitle>
        <CardDescription>
          A comprehensive guide to evaluating modern AI agents, from single-agent testing to complex multi-agent systems.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="architecture">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="architecture"><Lightbulb size={16} className="mr-1" /> Architecture</TabsTrigger>
            <TabsTrigger value="implementation"><TestTube size={16} className="mr-1" /> Implementation</TabsTrigger>
            <TabsTrigger value="business-use-case"><Briefcase size={16} className="mr-1" /> Business Use Case</TabsTrigger>
            <TabsTrigger value="best-practices"><Trophy size={16} className="mr-1" /> Best Practices</TabsTrigger>
            <TabsTrigger value="simulation"><Users size={16} className="mr-1" /> Simulation</TabsTrigger>
          </TabsList>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Evaluation Architecture</h3>
            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>Automated agent benchmarking</li>
              <li>Multi-metric evaluation (accuracy, robustness, safety, alignment)</li>
              <li>Continuous performance monitoring</li>
              <li>Human-in-the-loop validation</li>
              <li>Scenario-based testing</li>
            </ul>
            <CodeBlock language="python">{ARCHITECTURE_CODE}</CodeBlock>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Implementation Examples</h3>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Azure AI Evaluation SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="python">{`# Install Azure AI Evaluation SDK\n!pip install azure-ai-evaluation\n\nfrom azure.ai.evaluation import AgentEvaluator, BenchmarkSuite\n\nclass MyAgent:\n    def respond(self, prompt):\n        return \"Hello, I am your agent!\"\n\nsuite = BenchmarkSuite([\n    {\"prompt\": \"What is the capital of France?\", \"expected\": \"Paris\"},\n    {\"prompt\": \"Who wrote Hamlet?\", \"expected\": \"Shakespeare\"},\n])\n\nagent = MyAgent()\nevaluator = AgentEvaluator(agent)\nresults = evaluator.run(suite)\nfor r in results:\n    print(f\"Prompt: {r['prompt']}, Response: {r['response']}, Score: {r['score']}\")`}</CodeBlock>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>EvalLM (Open Source)</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="python">{`# Install EvalLM\n!pip install evallm\n\nfrom evallm import evaluate_agent\n\ndef my_agent(prompt):\n    return \"Sample response\"\n\ntasks = [\n    {\"input\": \"Translate 'hello' to French\", \"expected\": \"bonjour\"},\n    {\"input\": \"Sum 2 and 3\", \"expected\": \"5\"},\n]\n\nresults = evaluate_agent(my_agent, tasks)\nprint(results)`}</CodeBlock>
              </CardContent>
            </Card>
            <div className="mt-2 text-xs text-muted-foreground">
              Other frameworks: OpenAGI, RAGAS, HumanEval, AgentBench
            </div>
          </TabsContent>

          {/* Business Use Case Tab */}
          <TabsContent value="business-use-case" className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Business Use Case Example</h3>
            <div className="mb-2">
              <strong>Industry:</strong> Retail
            </div>
            <div className="mb-2">
              <strong>Scenario:</strong> Evaluating a personalized shopping assistant agent for accuracy, safety, and customer satisfaction.
            </div>
            <div className="mb-2">
              <strong>Value:</strong> Ensures reliable recommendations, safe interactions, and improved conversion rates.
            </div>
            <div className="border rounded-md p-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Define evaluation scenarios (e.g., product recommendation accuracy, safety checks)</li>
                <li>Run automated and human-in-the-loop tests</li>
                <li>Aggregate results for continuous improvement</li>
                <li>Monitor with dashboards and alerts</li>
              </ul>
            </div>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="best-practices" className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Define clear evaluation scenarios (task completion, safety, alignment)</li>
              <li>Use both automated and human-in-the-loop tests</li>
              <li>Aggregate results for continuous improvement</li>
              <li>Monitor with dashboards and alerts</li>
              <li>Leverage open source and enterprise frameworks for benchmarking</li>
            </ul>
            <div className="mt-2 text-xs text-muted-foreground">
              References: Azure AI Evaluation SDK, EvalLM, AgentBench, RAGAS, HumanEval
            </div>
          </TabsContent>

          {/* Simulation Tab */}
          <TabsContent value="simulation" className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Advanced Architecture Simulation</h3>
            <AdvancedArchitectureSimulation />
            <MultiAgentEvalVisual />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentEvaluationConcept;




