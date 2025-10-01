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
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
            🧠
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Why Mem0 Matters for Multi-Agent Systems
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              In the Supply Chain Disruption Manager example, imagine if every time a new disruption occurs, the system had to re-learn your shipping preferences, carrier priorities, and notification requirements. Mem0 solves this by giving agents persistent memory across conversations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Business Value</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Reduce repetitive questions, faster response times, personalized service</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Technical Benefit</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Context persists across threads, sessions, and agent restarts</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Real-World Example</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Logistics team's preferences remembered: priority carriers, cost thresholds, notification rules</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">User Experience</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">"Just like I taught you last time" - agents remember without re-prompting</p>
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
      <Card className="p-4 bg-white dark:bg-gray-900">
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
            className={`flex-1 h-2 mx-1 rounded transition-colors ${
              idx <= step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Code Panel */}
        <Card className="lg:col-span-2 p-4">
          <h4 className="font-semibold mb-2">{currentStep.title}</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{currentStep.code}</code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            {currentStep.explanation}
          </p>
          {currentStep.agentResponse && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Agent Response:
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                {currentStep.agentResponse}
              </p>
            </div>
          )}
        </Card>

        {/* Memory State Panel */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Mem0 Memory State</h4>
          {memories.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">No memories stored yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {memories.map((memory, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800"
                >
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✓ {memory}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              💡 Memories persist across threads and conversations
            </p>
          </div>
        </Card>
      </div>

      {/* Key Features */}
      {step === steps.length - 1 && (
        <Card className="p-4 mt-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <h4 className="font-semibold mb-2">✨ Key Features</h4>
          <ul className="text-sm space-y-1">
            <li>✓ Persistent memory across threads using Mem0</li>
            <li>✓ User-specific context (user_id association)</li>
            <li>✓ No need to repeat preferences</li>
            <li>✓ Works with any Agent Framework agent</li>
            <li>✓ Install: <code className="text-xs bg-white dark:bg-gray-800 px-1 rounded">pip install agent-framework-mem0</code></li>
          </ul>
        </Card>
      )}
    </div>
  );
}
