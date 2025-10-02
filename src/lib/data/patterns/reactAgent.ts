import { PatternData } from './types';
import { FinancialAnalystVisual } from '@/components/visualization/business-use-cases/FinancialAnalystVisual';

export const reactAgentPattern: PatternData = {
  id: 'react-agent',
  name: 'ReAct Agent',
  description: 'A reasoning and acting framework where an agent alternates between reasoning (using LLMs) and acting (using tools like Google or email).',
  category: 'Core',
  useCases: ['Multi-Step Problem Solving', 'Research Tasks', 'Information Gathering'],
  whenToUse: 'Use the ReAct pattern when your task requires the agent to gather external information and reason about it iteratively. It\'s ideal for complex inquiries that need multiple tool interactions, such as research questions, multi-step problem-solving, or scenarios where an agent needs to evaluate its actions and adjust its approach based on new information.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'User Query', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'llm1',
      type: 'default',
      data: { label: 'LLM 1 (Reason)', nodeType: 'llm' },
      position: { x: 300, y: 100 }
    },
    {
      id: 'tools',
      type: 'default',
      data: { label: 'Tools', nodeType: 'tool' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'llm2',
      type: 'default',
      data: { label: 'LLM 2 (Act)', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'llm1', animated: true },
    { id: 'e2-3', source: 'llm1', target: 'tools', animated: true, label: 'Reason' },
    { id: 'e3-4', source: 'tools', target: 'llm2', animated: true },
    { id: 'e4-2', source: 'llm2', target: 'llm1', animated: true, label: 'Action' },
    { id: 'e2-5', source: 'llm1', target: 'output', animated: true }
  ],
  evaluation: `Evaluating a ReAct agent focuses on both the final answer and the process taken to reach it. Key metrics include:
- **Task Success Rate:** Does the agent correctly and completely answer the user's query? This is the primary measure of effectiveness.
- **Reasoning Quality:** Using an "LLM as Judge" approach, a separate LLM can score the agent's "Thought" process at each step. Is the reasoning logical? Does it justify the chosen action?
- **Tool Use Accuracy:** Did the agent call the correct tools with the correct arguments? Incorrect tool use can be penalized.
- **Efficiency:** How many cycles did it take to reach the answer? Fewer cycles are generally better, assuming the answer quality is high. This can be measured in terms of steps, tokens, or time.
- **Robustness:** How does the agent handle errors from tools or ambiguous observations? A good ReAct agent should be able to recover from errors and adjust its plan.`,
  businessUseCase: {
    industry: 'Financial Services',
    description: 'A financial services firm uses a ReAct agent to build a "Financial Analyst Assistant." This agent automates the tedious process of quarterly earnings analysis. When an analyst asks it to analyze a company\'s report, the agent first *reasons* that it needs to fetch the earnings PDF and the latest stock data. It then *acts* by using a tool to retrieve the report from an internal database and another tool to get stock performance from a market data API. It cycles through this process, summarizing text, extracting key figures, and correlating them with market activity. The final output is a concise, synthesized summary that a human analyst can use for decision-making, saving hours of manual work.',
    visualization: FinancialAnalystVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing the "Financial Analyst Assistant" using the ReAct pattern.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components should include: User Interface (Analyst Portal), Orchestration Service, ReAct Agent Core, Tool Library (Internal Document DB, Market Data API, Calculation Toolkit), and a secure Key/Secret Management service.
      - Describe the data flow, starting from the analyst's query.

      ### 2. ReAct Agent Core: Implementation Details
      - Provide a Python code example for the main ReAct loop.
      - The example should show how the agent parses the LLM's output to distinguish between "Thought" and "Action".
      - Show the data structure for the context history (scratchpad) that accumulates observations.

      ### 3. Tool Library & Integration
      - Provide Python stubs for two essential tools: \`get_earnings_report(company_ticker)\` and \`get_stock_performance(company_ticker)\`.
      - Explain the importance of error handling and how the agent should react to a tool failing (e.g., API is down, document not found).

      ### 4. Evaluation Strategy
      - Detail a multi-faceted evaluation plan.
      - **Final Answer Correctness:** How to use an LLM-as-Judge with a rubric to check if the final summary is accurate and faithful to the source documents.
      - **Process Evaluation:** How to score the agent's reasoning steps. Was the choice of tools optimal?
      - **Metrics:** List key metrics to track: Task Success Rate, Tool Call Accuracy, Latency (time-to-summary), and Cost (token usage).

      ### 5. Security & Compliance Considerations
      - Discuss at least two critical security measures for this use case, such as handling Material Nonpublic Information (MNPI) and ensuring API security for financial data providers.
      - Mention the importance of audit trails for regulatory compliance.
    `
  },
  codeExample: `// Financial Analyst Assistant ReAct implementation
const executeFinancialAnalystReAct = async (query: string, maxCycles = 5) => {
  try {
    let currentCycle = 0;
    let done = false;
    let contextHistory: string[] = [];
    let finalAnswer = '';

    // Seed initial request
    contextHistory.push(\`Analyst request: \${query}\`);

    // Domain tools
    const tools = {
      get_earnings_report: async (ticker: string) => {
        return \`Earnings report for \${ticker}: Revenue up 12%, EPS beat by 3%.\`;
      },
      get_stock_performance: async (ticker: string) => {
        return \`Stock performance for \${ticker}: +4.2% today, +18% YTD.\`;
      },
      extract_kpis: (report: string) => {
        return 'KPIs => Revenue Growth: 12%, EPS Surprise: +3%, Margin: 28%';
      },
      summarize: (text: string) => {
        return 'Summary: ' + text.slice(0, 80) + '...';
      }
    } as const;

    while (!done && currentCycle < maxCycles) {
      currentCycle++;

      // Build reasoning prompt with financial analysis context
      const reasoningPrompt = \`
You are a ReAct financial analyst assistant.
Goal: Synthesize a concise earnings insight for the analyst request: \${query}

Tools:
- get_earnings_report(ticker)
- get_stock_performance(ticker)
- extract_kpis(reportText)
- summarize(text)

Provide either:
Thought: <reasoning>
Action: <tool_name>
Action Input: <input>

OR final answer:
Thought: <reasoning>
Final Answer: <your concise insight>

Previous steps:
\${contextHistory.join('\\n')}
\`;

      const reasoningResponse = await llm(reasoningPrompt);
      contextHistory.push(reasoningResponse);

      if (reasoningResponse.includes('Final Answer:')) {
        const answerMatch = reasoningResponse.match(/Final Answer:(.*?)$/s);
        if (answerMatch) {
          finalAnswer = answerMatch[1].trim();
          done = true;
        }
      } else {
        const actionMatch = reasoningResponse.match(/Action:(.*?)\n/);
        const actionInputMatch = reasoningResponse.match(/Action Input:(.*?)(?:\n|$)/s);

        if (actionMatch && actionInputMatch) {
          const toolName = actionMatch[1].trim();
          const toolInput = actionInputMatch[1].trim();

          if ((tools as any)[toolName]) {
            // Execute tool
            const toolResult = await (tools as any)[toolName](toolInput);
            contextHistory.push(\`Observation: \${toolResult}\`);
          } else {
            contextHistory.push(\`Observation: Error - Unknown tool "\${toolName}"\`);
          }
        }
      }
    }

    return {
      status: done ? 'success' : 'max_cycles_reached',
      cycles: currentCycle,
      result: finalAnswer || 'No final answer reached.',
      history: contextHistory
    };
  } catch (error: any) {
    return { status: 'failed', reason: error.message };
  }
};`,
  pythonCodeExample: `# Financial Analyst Assistant ReAct implementation (Python)
import json
from typing import Any, Dict, List

class FinancialAnalystReActAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model

    async def execute(self, query: str, max_cycles: int = 5) -> Dict[str, Any]:
        current_cycle = 0
        done = False
        context_history: List[str] = []
        final_answer = ""

        context_history.append(f"Analyst request: {query}")

        async def get_earnings_report(ticker: str) -> str:
            return f"Earnings report for {ticker}: Revenue up 12%, EPS beat by 3%."

        async def get_stock_performance(ticker: str) -> str:
            return f"Stock performance for {ticker}: +4.2% today, +18% YTD."

        async def extract_kpis(report: str) -> str:
            return "KPIs => Revenue Growth: 12%, EPS Surprise: +3%, Margin: 28%"

        async def summarize(text: str) -> str:
            return "Summary: " + text[:80] + "..."

        tools = {
            "get_earnings_report": get_earnings_report,
            "get_stock_performance": get_stock_performance,
            "extract_kpis": extract_kpis,
            "summarize": summarize,
        }

        while not done and current_cycle < max_cycles:
            current_cycle += 1
            reasoning_prompt = f"""
You are a ReAct financial analyst assistant.
Goal: Synthesize a concise earnings insight for the analyst request: {query}

Tools:
- get_earnings_report(ticker)
- get_stock_performance(ticker)
- extract_kpis(reportText)
- summarize(text)

Provide either:
Thought: <reasoning>
Action: <tool_name>
Action Input: <input>

OR final answer:
Thought: <reasoning>
Final Answer: <your concise insight>

Previous steps:
{chr(10).join(context_history)}
"""
            reasoning_response = await self._llm_call(reasoning_prompt)
            context_history.append(reasoning_response)

            if "Final Answer:" in reasoning_response:
                parts = reasoning_response.split("Final Answer:")
                if len(parts) > 1:
                    final_answer = parts[1].strip()
                    done = True
            else:
                action_line = None
                action_input_line = None
                for line in reasoning_response.split('\n'):
                    if line.startswith("Action:"):
                        action_line = line.replace("Action:", "").strip()
                    elif line.startswith("Action Input:"):
                        action_input_line = line.replace("Action Input:", "").strip()
                if action_line and action_input_line:
                    tool_name = action_line
                    tool_input = action_input_line
                    if tool_name in tools:
                        tool_result = await tools[tool_name](tool_input)
                        context_history.append(f"Observation: {tool_result}")
                    else:
                        context_history.append(f"Observation: Error - Unknown tool '{tool_name}'")
        return {
            "status": "success" if done else "max_cycles_reached",
            "cycles": current_cycle,
            "result": final_answer if final_answer else "No final answer reached.",
            "history": context_history
        }

    async def _llm_call(self, prompt: str) -> str:
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
`,
  implementation: [
    'Import necessary libraries and set up environment',
    'Define available tools that the agent can use (search, calculate, etc.)',
    'Create the main ReAct loop that alternates between reasoning and acting',
    'Implement parsing logic to extract actions from LLM output',
    'Build a context tracking system to maintain conversation history',
    'Add termination conditions to know when the answer is found',
    'Implement error handling and maximum cycle limitations',
    'Format the final response with relevant context'
  ],
  advantages: [
    "Handles complex, multi-step tasks by breaking them down.",
    "Can use external tools to access real-time, proprietary, or external information.",
    "The reasoning steps provide transparency into the agent's decision-making process.",
    "More robust to errors than simpler models, as it can attempt to correct its course."
  ],
  limitations: [
    "Can be slower and more expensive due to multiple LLM calls.",
    "Complex prompt engineering is required to ensure reliable reasoning and action parsing.",
    "May fail if tools are unreliable or produce unexpected output.",
    "Can sometimes get stuck in loops if it fails to converge on an answer."
  ],
  relatedPatterns: [
    "self-reflection",
    "prompt-chaining",
    "modern-tool-use"
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '3-5 hours',
    complexityReduction: 'High - ReAct pattern eliminates complex state machines, replacing 800+ LOC orchestration with iterative reasoning loop',
    reusabilityScore: 10,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Core reasoning pattern applicable to research, customer service, data analysis, diagnostics',
      'Architecture Templates - LangChain/LlamaIndex/AutoGen provide production ReAct implementations',
      'Failure Scenario Libraries - Well-documented failure modes (infinite loops, tool errors) with mitigation strategies',
      'Evaluation Automation - Trajectory evaluation and tool call success rate metrics standard in frameworks'
    ]
  }
};