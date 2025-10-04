import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Mem0AgentMemoryVisual - Interactive visualization of Agent Framework with Mem0 memory
 * Demonstrates persistent memory across conversations and threads
 */
export function Mem0AgentMemoryVisual() {
  const [step, setStep] = useState(0);
  const [memories, setMemories] = useState<string[]>([]);

  const steps = [
    {
      title: "Setup: Initialize Agent with Mem0",
      code: `from agent_framework.azure import AzureAIAgentClient
from agent_framework.context import Mem0Provider
from azure.identity import AzureCliCredential
import uuid

user_id = str(uuid.uuid4())

async with (
    AzureCliCredential() as credential,
    AzureAIAgentClient(async_credential=credential).create_agent(
        name="FriendlyAssistant",
        instructions="You are a friendly assistant.",
        tools=retrieve_company_report,
        context_providers=Mem0Provider(user_id=user_id),
    ) as agent,
):`,
      explanation: "Create an agent with Mem0 context provider. Memory records are associated with user_id.",
      memory: []
    },
    {
      title: "Step 1: First Query (No Context)",
      code: `query = "Please retrieve my company report"
print(f"User: {query}")
result = await agent.run(query)
print(f"Agent: {result}")`,
      explanation: "Agent asks for clarification since no company code is stored in memory yet.",
      agentResponse: "I'd be happy to help retrieve your company report. Could you please provide the company code and your preferred report format?",
      memory: []
    },
    {
      title: "Step 2: Teach the Agent",
      code: `query = "I always work with CNTS and I always want a detailed report format. Please remember and retrieve it."
print(f"User: {query}")
result = await agent.run(query)
print(f"Agent: {result}")`,
      explanation: "Agent stores preferences in Mem0 and retrieves the report.",
      agentResponse: "Got it! I'll remember that you work with company code CNTS and prefer detailed report format. Retrieving your report now...",
      memory: ["Company: CNTS", "Report Format: Detailed"]
    },
    {
      title: "Step 3: New Thread with Memory",
      code: `print("\\nRequest within a new thread:")
thread = agent.get_new_thread()

query = "Please retrieve my company report"
print(f"User: {query}")
result = await agent.run(query, thread=thread)
print(f"Agent: {result}")`,
      explanation: "In a NEW thread, agent remembers preferences from Mem0 and doesn't need to ask again!",
      agentResponse: "Retrieving your detailed report for company CNTS...",
      memory: ["Company: CNTS", "Report Format: Detailed"]
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      if (currentStep.memory) {
        setMemories(currentStep.memory);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setMemories(steps[step - 1].memory || []);
    }
  };

  const handleReset = () => {
    setStep(0);
    setMemories([]);
  };

  return (
    <div className="w-full space-y-4 p-4">
      {/* Business Use Case Context */}
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 p-6 lg:flex-row">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-2xl">
            🧠
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold">
              Why Mem0 Matters for Multi-Agent Systems
            </h3>
            <p className="text-sm text-muted-foreground">
              In the Supply Chain Disruption Manager example, imagine if every time a new disruption occurs, the system had to re-learn your shipping preferences, carrier priorities, and notification requirements. Mem0 solves this by giving agents persistent memory across conversations.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-3">
                <span className="text-sm font-semibold text-emerald-500">✓</span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Business Value</p>
                  <p className="text-xs text-muted-foreground">Reduce repetitive questions, faster response times, personalized service</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-3">
                <span className="text-sm font-semibold text-emerald-500">✓</span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Technical Benefit</p>
                  <p className="text-xs text-muted-foreground">Context persists across threads, sessions, and agent restarts</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-3">
                <span className="text-sm font-semibold text-emerald-500">✓</span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Real-World Example</p>
                  <p className="text-xs text-muted-foreground">Logistics team's preferences remembered: priority carriers, cost thresholds, notification rules</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-3">
                <span className="text-sm font-semibold text-emerald-500">✓</span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">User Experience</p>
                  <p className="text-xs text-muted-foreground">"Just like I taught you last time" - agents remember without re-prompting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          Interactive Demo: Agent Framework + Mem0
        </h3>
        <p className="text-sm text-muted-foreground">
          Step through this example to see how agents remember preferences across conversations
        </p>
      </div>

      {/* Navigation Controls - Moved to Top */}
      <Card className="border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={handlePrev}
            disabled={step === 0}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            ← Previous Step
          </Button>
          <div className="flex flex-col items-center gap-2">
            <div className="text-base font-semibold">
              Step {step + 1} of {steps.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep.title}
            </div>
          </div>
          {step < steps.length - 1 ? (
            <Button 
              onClick={handleNext}
              size="lg"
              className="w-full sm:w-auto"
            >
              Next Step →
            </Button>
          ) : (
            <Button 
              onClick={handleReset} 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              🔄 Reset Demo
            </Button>
          )}
        </div>
      </Card>

      {/* Progress indicator */}
      <div className="flex justify-between items-center">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`mx-1 h-2 flex-1 rounded transition-colors ${
              idx <= step ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Code Panel */}
        <Card className="lg:col-span-2 border border-border bg-card p-4 shadow-sm">
          <h4 className="mb-2 font-semibold text-foreground">{currentStep.title}</h4>
          <pre className="overflow-x-auto rounded border border-border/60 bg-muted/60 p-4 text-sm text-muted-foreground">
            <code>{currentStep.code}</code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            {currentStep.explanation}
          </p>
          {currentStep.agentResponse && (
            <div className="mt-4 rounded border border-primary/30 bg-primary/10 p-3">
              <p className="text-sm font-semibold text-primary">
                Agent Response:
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentStep.agentResponse}
              </p>
            </div>
          )}
        </Card>

        {/* Memory State Panel */}
        <Card className="border border-border bg-card p-4 shadow-sm">
          <h4 className="mb-3 font-semibold text-foreground">Mem0 Memory State</h4>
          {memories.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p className="text-sm">No memories stored yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {memories.map((memory, idx) => (
                <div
                  key={idx}
                  className="rounded border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-300"
                >
                  <p className="text-sm">✓ {memory}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 border-t border-border/60 pt-4">
            <p className="text-xs text-muted-foreground">
              💡 Memories persist across threads and conversations
            </p>
          </div>
        </Card>
      </div>

      {/* Key Features */}
      {step === steps.length - 1 && (
        <Card className="mt-4 border border-border bg-card p-4 shadow-sm">
          <h4 className="mb-2 font-semibold text-foreground">✨ Key Features</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Persistent memory across threads using Mem0</li>
            <li>✓ User-specific context (user_id association)</li>
            <li>✓ No need to repeat preferences</li>
            <li>✓ Works with any Agent Framework agent</li>
            <li>✓ Install: <code className="rounded bg-muted px-1 text-xs">pip install agent-framework[all]</code></li>
          </ul>
        </Card>
      )}
    </div>
  );
}
