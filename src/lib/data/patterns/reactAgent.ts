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
  codeExample: `// ReAct Agent implementation
const executeReAct = async (query: string, maxCycles = 5) => {
  try {
    let currentCycle = 0;
    let done = false;
    let contextHistory = [];
    let finalAnswer = '';

    // Add initial query to context
    contextHistory.push(\`User query: \${query}\`);

    // Available tools
    const tools = {
      search: async (query) => {
        return "Search results for \\"" + query + "\\": [simulated search results]";
      },
      calculate: (expression) => {
        try {
          return "Calculation result: " + eval(expression);
        } catch (error) {
          return "Error in calculation: " + error.message;
        }
      },
      lookup: (entity) => {
        return "Information about " + entity + ": [simulated encyclopedia entry]";
      }
    };

    while (!done && currentCycle < maxCycles) {
      currentCycle++;
      
      // Step 1: Reasoning phase
      console.log(\`Cycle \${currentCycle}: Reasoning...\`);
      
      const reasoningPrompt = \`
        You are a ReAct agent that solves problems through cycles of reasoning and action.
        
        Task: \${query}
        
        Previous steps:
        \${contextHistory.join('\\n')}
        
        Think step by step about the problem. Either:
        1. Use a tool to gather more information by responding with:
           Thought: <your reasoning>
           Action: <tool_name>
           Action Input: <tool input>
           
        2. Or provide the final answer if you have enough information:
           Thought: <your reasoning>
           Final Answer: <your answer>
      \`;
      
      const reasoningResponse = await llm(reasoningPrompt);
      contextHistory.push(reasoningResponse);
      
      // Parse the reasoning response
      if (reasoningResponse.includes('Final Answer:')) {
        // Extract the final answer
        const answerMatch = reasoningResponse.match(/Final Answer:(.*?)$/s);
        if (answerMatch) {
          finalAnswer = answerMatch[1].trim();
          done = true;
        }
      } else {
        // Extract tool call
        const actionMatch = reasoningResponse.match(/Action:(.*?)\\n/);
        const actionInputMatch = reasoningResponse.match(/Action Input:(.*?)(?:\\n|$)/s);
        
        if (actionMatch && actionInputMatch) {
          const toolName = actionMatch[1].trim();
          const toolInput = actionInputMatch[1].trim();
          
          // Step 2: Action phase - call the appropriate tool
          console.log("Cycle " + currentCycle + ": Taking action with tool \\"" + toolName + "\\"...");
          
          if (tools[toolName]) {
            const toolResult = await tools[toolName](toolInput);
            contextHistory.push(\`Observation: \${toolResult}\`);
          } else {
            contextHistory.push(\`Observation: Error - Tool "\${toolName}" not found.\`);
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
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};`,
  pythonCodeExample: `# ReAct Agent implementation
import openai
import json
from typing import Dict, List, Any, Optional, Union

class ReActAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
        
    async def execute(self, query: str, max_cycles: int = 5) -> Dict[str, Any]:
        """Execute the ReAct agent to solve a problem through reasoning and action cycles."""
        try:
            current_cycle = 0
            done = False
            context_history = []
            final_answer = ""
            
            # Add initial query to context
            context_history.append(f"User query: {query}")
            
            # Available tools
            tools = {
                "search": self._search_tool,
                "calculate": self._calculate_tool,
                "lookup": self._lookup_tool
            }
            
            while not done and current_cycle < max_cycles:
                current_cycle += 1
                
                # Step 1: Reasoning phase
                print(f"Cycle {current_cycle}: Reasoning...")
                
                reasoning_prompt = f"""
                You are a ReAct agent that solves problems through cycles of reasoning and action.
                
                Task: {query}
                
                Previous steps:
                {chr(10).join(context_history)}
                
                Think step by step about the problem. Either:
                1. Use a tool to gather more information by responding with:
                   Thought: <your reasoning>
                   Action: <tool_name>
                   Action Input: <tool input>
                   
                2. Or provide the final answer if you have enough information:
                   Thought: <your reasoning>
                   Final Answer: <your answer>
                """
                
                reasoning_response = await self._llm_call(reasoning_prompt)
                context_history.append(reasoning_response)
                
                # Parse the reasoning response
                if "Final Answer:" in reasoning_response:
                    # Extract the final answer
                    answer_parts = reasoning_response.split("Final Answer:")
                    if len(answer_parts) > 1:
                        final_answer = answer_parts[1].strip()
                        done = True
                else:
                    # Extract tool call
                    action_match = None
                    action_input_match = None
                    
                    for line in reasoning_response.split('\\n'):
                        if line.startswith("Action:"):
                            action_match = line.replace("Action:", "").strip()
                        elif line.startswith("Action Input:"):
                            action_input_match = line.replace("Action Input:", "").strip()
                    
                    if action_match and action_input_match:
                        tool_name = action_match
                        tool_input = action_input_match
                        
                        # Step 2: Action phase - call the appropriate tool
                        print(f'Cycle {current_cycle}: Taking action with tool "{tool_name}"...')
                        
                        if tool_name in tools:
                            tool_result = await tools[tool_name](tool_input)
                            context_history.append(f"Observation: {tool_result}")
                        else:
                            context_history.append(f'Observation: Error - Tool "{tool_name}" not found.')
            
            return {
                "status": "success" if done else "max_cycles_reached",
                "cycles": current_cycle,
                "result": final_answer if final_answer else "No final answer reached.",
                "history": context_history
            }
            
        except Exception as error:
            return {"status": "failed", "reason": str(error)}
    
    async def _llm_call(self, prompt: str) -> str:
        """Call the LLM with the given prompt."""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    
    async def _search_tool(self, query: str) -> str:
        """Simulate web search results."""
        return f'Search results for "{query}": [simulated search results]'
    
    async def _calculate_tool(self, expression: str) -> str:
        """Calculate mathematical expressions."""
        try:
            result = eval(expression)
            return "Calculation result: " + str(result)
        except Exception as error:
            return "Error in calculation: " + str(error)
    
    async def _lookup_tool(self, entity: str) -> str:
        """Look up information about an entity."""
        return f"Information about {entity}: [simulated encyclopedia entry]"

# Example usage
async def main():
    client = openai.AsyncOpenAI()  # Initialize with your API key
    agent = ReActAgent(client)
    result = await agent.execute("What is the capital of France and what is its population?")
    print(json.dumps(result, indent=2))

# Run the example
# import asyncio
# asyncio.run(main())
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
  ]
};