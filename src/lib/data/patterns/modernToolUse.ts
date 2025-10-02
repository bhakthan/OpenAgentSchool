import { PatternData } from './types';
import { FinancialAnalystVisual } from '@/components/visualization/business-use-cases/FinancialAnalystVisual';

export const modernToolUsePattern: PatternData = {
  id: 'modern-tool-use',
  name: 'Modern Tool Use',
  description: 'Advanced tool use patterns for AI agents with function calling, tool chaining, and error handling.',
  category: 'Advanced',
  useCases: ['API Integration', 'Multi-Step Workflows', 'Error Recovery', 'Dynamic Tool Selection'],
  whenToUse: 'Use Modern Tool Use when agents need to interact with external APIs, perform complex multi-step operations, or when robust error handling and recovery is required. This pattern is ideal for production systems that require reliable tool integration.',
  advantages: [
    'Enables dynamic and flexible tool integration.',
    'Improves error handling and recovery in workflows.',
    'Facilitates complex multi-step operations with ease.'
  ],
  limitations: [
    'Requires robust planning and execution logic.',
    'Dependent on the availability and reliability of tools.',
    'Increased complexity in managing tool dependencies.'
  ],
  relatedPatterns: [
    'Task Automation',
    'Error Recovery',
    'Dynamic Tool Selection'
  ],
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'planner',
      type: 'default',
      data: { label: 'Tool Planner', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'selector',
      type: 'default',
      data: { label: 'Tool Selector', nodeType: 'router' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'executor',
      type: 'default',
      data: { label: 'Tool Executor', nodeType: 'executor' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'validator',
      type: 'default',
      data: { label: 'Result Validator', nodeType: 'evaluator' },
      position: { x: 900, y: 200 }
    },
    {
      id: 'error-handler',
      type: 'default',
      data: { label: 'Error Handler', nodeType: 'aggregator' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 1100, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'planner', animated: true },
    { id: 'e2-3', source: 'planner', target: 'selector', animated: true },
    { id: 'e3-4', source: 'selector', target: 'executor', animated: true },
    { id: 'e4-5', source: 'executor', target: 'validator', animated: true },
    { id: 'e5-7', source: 'validator', target: 'output' },
    { id: 'e4-6', source: 'executor', target: 'error-handler', animated: true, label: 'On Error' },
    { id: 'e6-3', source: 'error-handler', target: 'selector', animated: true, label: 'Retry' },
    { id: 'e5-3', source: 'validator', target: 'selector', animated: true, label: 'Invalid' }
  ],
  codeExample: `// Modern Tool Use (TypeScript) – Financial Advisory Workflow
// Business Context: Integrate multiple market / portfolio tools to generate an investment report
// with pricing, performance metrics, risk assessment, and narrative outlook. Includes planning,
// dynamic tool selection, error recovery, validation, and report synthesis.

// --- Tool Interfaces & Domain Tool Implementations -------------------------------------------
interface Tool {
  name: string;
  description: string;
  parameters: any; // JSON schema-ish descriptor (simplified here)
  execute: (params: any) => Promise<any>;
}

// Real‑time price fetch (stub)
const getRealTimeQuote: Tool = {
  name: 'get_quote',
  description: 'Fetch latest price & daily change for a ticker.',
  parameters: { ticker: 'string' },
  async execute({ ticker }) {
    // Replace with live market data API call
    return { ticker, price: 123.45, changePct: -0.42 };
  }
};

// Portfolio holdings (stub)
const fetchPortfolioHoldings: Tool = {
  name: 'get_portfolio',
  description: 'Return normalized holdings with weights for a client portfolio.',
  parameters: { portfolioId: 'string' },
  async execute({ portfolioId }) {
    return {
      portfolioId,
      holdings: [
        { ticker: 'AAPL', weight: 0.25 },
        { ticker: 'MSFT', weight: 0.20 },
        { ticker: 'NVDA', weight: 0.15 },
        { ticker: 'TLT', weight: 0.10 },
        { ticker: 'VXUS', weight: 0.30 }
      ]
    };
  }
};

// Risk metrics (stub)
const computeRiskMetrics: Tool = {
  name: 'compute_risk',
  description: 'Compute basic risk / diversification metrics for holdings list.',
  parameters: { holdings: 'array' },
  async execute({ holdings }) {
    return { volatilityAnnual: 0.18, sharpe: 0.92, concentrationTop3: 0.60 };
  }
};

// News & macro summary (stub)
const summarizeMarketOutlook: Tool = {
  name: 'summarize_outlook',
  description: 'Summarize macro & sector themes relevant to given tickers.',
  parameters: { tickers: 'array' },
  async execute({ tickers }) {
    return {
      narrative: 'Macro stable; tech consolidation; fixed income stabilizing; global diversification supportive.'
    };
  }
};

const defaultTools: Tool[] = [
  getRealTimeQuote,
  fetchPortfolioHoldings,
  computeRiskMetrics,
  summarizeMarketOutlook
];

// --- LLM Stub -------------------------------------------------------------------------------
async function llm(prompt: string): Promise<string> {
  // In production: call model w/ JSON mode or strong schema enforcement.
  if (prompt.includes('VALIDATE_RESULTS')) {
    return JSON.stringify({ success: true, reasoning: 'All mandatory sections present and coherent.' });
  }
  if (prompt.includes('RECOVERY')) {
    return 'Try re-fetching holdings then recompute risk with adjusted weights.';
  }
  // Planning response (simplified deterministic plan)
  return JSON.stringify({
    steps: [
      { tool: 'get_portfolio', params: { portfolioId: 'CLIENT123' }, rationale: 'Need base holdings' },
      { tool: 'get_quote', params: { ticker: 'AAPL' }, rationale: 'High weight constituent pricing' },
      { tool: 'get_quote', params: { ticker: 'MSFT' }, rationale: 'Second largest holding pricing' },
      { tool: 'compute_risk', params: { holdings: '__PREV_HOLDINGS__' }, rationale: 'Compute risk metrics' },
      { tool: 'summarize_outlook', params: { tickers: ['AAPL','MSFT'] }, rationale: 'Market narrative for key weights' }
    ]
  });
}

// --- Core Execution Orchestrator ------------------------------------------------------------
interface ExecutionRecord {
  tool: string;
  params: any;
  status: 'success' | 'failed';
  result?: any;
  error?: string;
}

interface FinancialReportResult {
  status: string;
  attempts: number;
  steps: ExecutionRecord[];
  report?: string;
  validation?: any;
  recoveryNotes?: string[];
}

export async function executeFinancialAdvisoryWorkflow(task: string, tools: Tool[] = defaultTools): Promise<FinancialReportResult> {
  const maxRetries = 2;
  let attempt = 0;
  const recoveryNotes: string[] = [];

  while (attempt < maxRetries) {
    attempt++;
    const planPrompt = \`Task: \${task}\nAvailable tools: \${tools.map(t => t.name).join(', ')}\nReturn JSON plan with ordered steps.\`;
    const rawPlan = await llm(planPrompt);
    let parsedPlan: any;
    try { parsedPlan = JSON.parse(rawPlan); } catch { return { status: 'plan_parse_failed', attempts: attempt, steps: [], recoveryNotes }; }

    const steps: ExecutionRecord[] = [];
    let holdingsCache: any = null;

    for (const step of parsedPlan.steps) {
      const tool = tools.find(t => t.name === step.tool);
      if (!tool) {
        steps.push({ tool: step.tool, params: step.params, status: 'failed', error: 'tool_not_found' });
        continue;
      }
      // Parameter substitution for dependency placeholder
      if (step.tool === 'compute_risk' && step.params.holdings === '__PREV_HOLDINGS__') {
        step.params.holdings = holdingsCache?.holdings || [];
      }
      try {
        const result = await tool.execute(step.params);
        if (step.tool === 'get_portfolio') holdingsCache = result;
        steps.push({ tool: step.tool, params: step.params, status: 'success', result });
      } catch (err: any) {
        steps.push({ tool: step.tool, params: step.params, status: 'failed', error: err.message });
        const recoveryPrompt = \`RECOVERY\nTool \${step.tool} failed with \${err.message}. Prior: \${JSON.stringify(steps)}\`;
        const recovery = await llm(recoveryPrompt);
        recoveryNotes.push(recovery);
      }
    }

    // Validation Phase
    const validationPrompt = \`VALIDATE_RESULTS\nTask: \${task}\nSteps: \${JSON.stringify(steps.map(s => ({ tool: s.tool, status: s.status })))}\nCriteria: report coherence, mandatory sections.\`;
    const rawValidation = await llm(validationPrompt);
    let validation: any = {};
    try { validation = JSON.parse(rawValidation); } catch { validation = { success: false, reasoning: 'Unparseable validation JSON' }; }

    if (validation.success) {
      // Report synthesis
      const reportLines: string[] = [];
      const priceLines = steps.filter(s => s.tool === 'get_quote' && s.status === 'success');
      const risk = steps.find(s => s.tool === 'compute_risk' && s.status === 'success')?.result;
      const outlook = steps.find(s => s.tool === 'summarize_outlook' && s.status === 'success')?.result?.narrative;
      reportLines.push('# Investment Report');
      reportLines.push(\`Task: \${task}\`);
      reportLines.push('## Holdings');
      reportLines.push(JSON.stringify(holdingsCache, null, 2));
      reportLines.push('## Prices');
      priceLines.forEach(p => reportLines.push(\`\${p.params.ticker}: $\${p.result.price} (\$\${p.result.changePct}%)\`));
      if (risk) {
        reportLines.push('## Risk Metrics');
        reportLines.push(JSON.stringify(risk));
      }
      if (outlook) {
        reportLines.push('## Market Outlook');
        reportLines.push(outlook);
      }
      reportLines.push('## Validation');
      reportLines.push(validation.reasoning);
      if (recoveryNotes.length) {
        reportLines.push('## Recovery Notes');
        recoveryNotes.forEach(r => reportLines.push('- ' + r));
      }
      return { status: 'success', attempts: attempt, steps, validation, report: reportLines.join('\n'), recoveryNotes };
    }
  }

  return { status: 'max_attempts_exhausted', attempts: attempt, steps: [], recoveryNotes };
}
// ---------------------------------------------------------------------------------------------`,
  pythonCodeExample: `# Modern Tool Use Agent implementation
import json
import asyncio
from typing import Dict, List, Any, Callable
from dataclasses import dataclass

@dataclass
class Tool:
    name: str
    description: str
    parameters: Dict[str, Any]
    execute: Callable[[Dict[str, Any]], Any]

class ModernToolUseAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, task: str, tools: List[Tool]) -> Dict[str, Any]:
        """Execute modern tool use with planning and error recovery."""
        try:
            max_retries = 3
            attempt = 0
            
            while attempt < max_retries:
                attempt += 1
                
                # Plan tool usage
                plan_prompt = f"""
                Task: {task}
                Available tools: {', '.join([f"{t.name}: {t.description}" for t in tools])}
                
                Create a step-by-step plan for using tools to complete this task.
                Return as JSON: {{"steps": [{{"tool": "tool_name", "params": {{}}, "rationale": "why"}}]}}
                """
                
                plan = await self._llm_call(plan_prompt);
                parsed_plan = json.loads(plan);
                
                # Execute tools sequentially
                results = [];
                for step in parsed_plan["steps"]:
                    try:
                        tool = next((t for t in tools if t.name == step["tool"]), None);
                        if not tool:
                            raise ValueError(f"Tool {step['tool']} not found");
                        
                        result = await tool.execute(step["params"]);
                        results.append({
                            "tool": step["tool"],
                            "params": step["params"],
                            "result": result,
                            "status": "success"
                        });
                    except Exception as error:
                        results.append({
                            "tool": step["tool"],
                            "params": step["params"],
                            "error": str(error),
                            "status": "failed"
                        });
                        
                        # Error recovery
                        recovery_prompt = f"""
                        Tool {step['tool']} failed with error: {str(error)}
                        Previous results: {json.dumps(results)}
                        
                        Suggest an alternative approach or different tool to achieve the goal.
                        """
                        
                        recovery = await self._llm_call(recovery_prompt);
                        # Implement recovery logic...
                
                # Validate results
                validation_prompt = f"""
                Task: {task}
                Results: {json.dumps(results)}
                
                Evaluate if these results successfully complete the task.
                Return: {{"success": true/false, "reasoning": "explanation"}}
                """
                
                validation = await self._llm_call(validation_prompt);
                validation_result = json.loads(validation);
                
                if validation_result["success"]:
                    return {
                        "status": "success",
                        "results": results,
                        "attempts": attempt
                    };
            
            return {
                "status": "max_attempts_reached",
                "attempts": attempt
            };
        except Exception as error:
            return {"status": "failed", "reason": str(error)};
    
    async def _llm_call(self, prompt: str) -> str:
        """Call the LLM with the given prompt."""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        );
        return response.choices[0].message.content
`,
  businessUseCase: {
    industry: 'Financial Services',
    description: 'A financial advisory firm uses Modern Tool Use agents to analyze market data, access real-time stock prices, calculate portfolio metrics, and generate comprehensive investment reports by seamlessly integrating multiple financial APIs and tools.',
    enlightenMePrompt: 'Explain how to implement a Modern Tool Use agent for financial analysis with API integration and error handling.',
    visualization: FinancialAnalystVisual
  },
  implementation: [
    'Define tool interface with parameters and execution',
    'Create tool planning and selection logic',
    'Implement sequential and parallel tool execution',
    'Add comprehensive error handling and recovery',
    'Build result validation and quality checking',
    'Create tool chaining and dependency management',
    'Add logging and monitoring capabilities',
    'Implement adaptive tool selection based on context'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '4-8 hours',
    complexityReduction: 'Very High - OpenAI function calling, Anthropic tool use, and Microsoft Agent Framework eliminate manual JSON parsing and tool orchestration',
    reusabilityScore: 10,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Universal pattern for extending LLM capabilities with APIs, databases, calculators, search engines',
      'Architecture Templates - Microsoft Agent Framework, LangChain, and major LLM providers offer native tool calling support',
      'Failure Scenario Libraries - Tool timeout, invalid parameters, API errors well-documented with retry strategies',
      'Evaluation Automation - Tool call success rate, parameter validation accuracy, execution latency metrics standard'
    ]
  }
};
