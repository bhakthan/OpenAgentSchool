import { useMemo } from 'react';
import type { AlgorithmStep } from '@/components/visualization/AlgorithmVisualizer';

// Algorithm visualization data type
export interface AlgorithmVisualizationData {
  patternId: string;
  steps: AlgorithmStep[];
}

// Cache for algorithm visualization data
interface AlgorithmVisualizationCache {
  [key: string]: {
    steps: AlgorithmStep[];
    timestamp: number;
  };
}

const visualizationCache: AlgorithmVisualizationCache = {};
const CACHE_TTL = 60 * 1000; // 1 minute cache lifetime

/**
 * Get algorithm visualization steps with memoization
 * @param algorithmId Unique identifier for the algorithm
 * @param patternId Pattern ID to contextualize the algorithm
 */
export function getAlgorithmVisualization(algorithmId: string, patternId: string): AlgorithmVisualizationData {
  const cacheKey = `${patternId}:${algorithmId}`;
  const now = Date.now();
  
  // Return from cache if valid
  if (
    visualizationCache[cacheKey] && 
    now - visualizationCache[cacheKey].timestamp < CACHE_TTL
  ) {
    return {
      patternId,
      steps: visualizationCache[cacheKey].steps
    };
  }
  
  // Generate visualization data based on algorithm type
  const steps = generateAlgorithmSteps(algorithmId, patternId);
  
  // Cache the result
  visualizationCache[cacheKey] = {
    steps,
    timestamp: now
  };
  
  return {
    patternId,
    steps
  };
}

/**
 * React hook for algorithm visualization with memoization
 */
export function useAlgorithmVisualization(algorithmId: string, patternId: string): AlgorithmVisualizationData {
  return useMemo(() => getAlgorithmVisualization(algorithmId, patternId), [algorithmId, patternId]);
}

/**
 * Generate algorithm steps for visualization
 */
function generateAlgorithmSteps(algorithmId: string, patternId: string): AlgorithmStep[] {
  // Customize steps based on algorithm ID
  switch (algorithmId) {
    case 'react-pattern':
      return [
        {
          id: 'step1',
          name: 'User Input Processing',
          description: 'The agent receives and processes the user query',
          data: {
            query: 'What is the average of numbers from 1 to 10?',
            timestamp: Date.now()
          },
          timing: 1000
        },
        {
          id: 'step2',
          name: 'Reasoning Phase',
          description: 'Agent reasons about how to approach the problem',
          code: `// Agent reasoning process
const reasoning = await llm(\`
  You are a ReAct agent solving problems through cycles of reasoning and action.
  
  Task: Calculate the average of numbers from 1 to 10.
  What's the best approach to solve this problem?
\`);`,
          data: {
            reasoning: 'I need to calculate the sum of numbers 1-10, then divide by 10 to get the average'
          },
          timing: 2000
        },
        {
          id: 'step3',
          name: 'Tool Selection',
          description: 'Agent selects appropriate tool for the task',
          code: `// Tool selection logic
const toolChoice = determineToolFromReasoning(reasoning);
console.log(\`Selected tool: \${toolChoice}\`);`,
          data: {
            selected_tool: 'calculator',
            available_tools: ['calculator', 'search', 'database']
          },
          timing: 1500
        },
        {
          id: 'step4',
          name: 'Action Execution',
          description: 'Agent executes the chosen action using the selected tool',
          code: `// Execute calculation tool
const result = await tools.calculator('(1+2+3+4+5+6+7+8+9+10)/10');`,
          data: {
            tool_input: '(1+2+3+4+5+6+7+8+9+10)/10',
            raw_result: 5.5
          },
          timing: 1800
        },
        {
          id: 'step5',
          name: 'Observation Analysis',
          description: 'Agent observes and analyzes the result',
          code: `// Process tool result
const observation = \`Calculator result: \${result}\`;
context.push(observation);`,
          data: {
            observation: 'Calculator result: 5.5'
          },
          timing: 1200
        },
        {
          id: 'step6',
          name: 'Final Reflection',
          description: 'Validate final solution and check completeness',
          data: {
            final_reflection: 'I\'ve verified the code logic is correct: sum = 55, average = 55/10 = 5.5'
          },
          timing: 1500
        },
        {
          id: 'step7',
          name: 'Response Generation',
          description: 'Generate the final response to user query',
          code: `// Format final answer
const finalAnswer = await llm(\`
  Based on the calculations, formulate a clear answer to: "What is the average of numbers from 1 to 10?"
  
  Calculation result: 5.5
\`);`,
          data: {
            final_answer: 'The average of numbers from 1 to 10 is 5.5'
          },
          timing: 1700
        }
      ];
      
    case 'codeact-pattern':
      return [
        {
          id: 'step1',
          name: 'Problem Analysis',
          description: 'Agent analyzes the coding problem',
          data: {
            query: 'Write a function to calculate factorial of a number',
            timestamp: Date.now()
          },
          timing: 1200
        },
        {
          id: 'step2',
          name: 'Code Generation',
          description: 'Agent generates Python code to solve the problem',
          code: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Test with n=5
result = factorial(5)
print(result)`,
          data: {
            language: 'python',
            approach: 'recursive'
          },
          timing: 2200
        },
        {
          id: 'step3',
          name: 'Code Execution',
          description: 'Execute the generated code in a secure environment',
          data: {
            execution_output: '120',
            execution_time: '0.003s'
          },
          timing: 1800
        },
        {
          id: 'step4',
          name: 'Validation',
          description: 'Validate results against expected output',
          code: `# Validation logic
assert factorial(0) == 1
assert factorial(1) == 1
assert factorial(5) == 120
print("All tests passed!")`,
          data: {
            validation_passed: true,
            test_cases: [
              { input: 0, expected: 1, actual: 1 },
              { input: 1, expected: 1, actual: 1 },
              { input: 5, expected: 120, actual: 120 }
            ]
          },
          timing: 1500
        },
        {
          id: 'step5',
          name: 'Optimization',
          description: 'Optimize code for better performance',
          code: `def factorial_optimized(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Test optimized version
result = factorial_optimized(5)
print(result)`,
          data: {
            optimization_reason: 'Iterative approach prevents stack overflow for large inputs',
            performance_gain: '15% faster for n > 10'
          },
          timing: 2000
        },
        {
          id: 'step6',
          name: 'Response Formulation',
          description: 'Format and present the final solution',
          data: {
            final_code: 'def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        result = 1\n        for i in range(2, n + 1):\n            result *= i\n        return result',
            explanation: 'This function calculates factorial using an iterative approach for better performance with large inputs.'
          },
          timing: 1300
        }
      ];
      
    case 'deep-agents':
      return [
        {
          id: 'step1',
          name: 'Task Initialization',
          description: 'Deep agent receives complex multi-step task and initializes planning phase',
          code: `// Initialize deep agent workflow
const mainAgent = createDeepAgent(tools, instructions, { subagents });
const task = { messages: [{ role: "user", content: userQuery }] };`,
          data: {
            task_type: 'research_project',
            complexity: 'high',
            estimated_steps: 12
          },
          timing: 1000
        },
        {
          id: 'step2',
          name: 'Planning Phase',
          description: 'Agent creates detailed plan using built-in planning tool',
          code: `// Use planning tool to create strategy
const plan = await planningTool.createPlan({
  objective: task.content,
  timeframe: "comprehensive",
  quality: "high"
});
await fileSystem.write("research_plan.md", plan);`,
          data: {
            plan_steps: ['Define scope', 'Research phase', 'Analysis', 'Draft creation', 'Review cycle'],
            planning_tool: 'TodoWrite',
            files_created: ['research_plan.md']
          },
          timing: 2000
        },
        {
          id: 'step3',
          name: 'Question Recording',
          description: 'Store original question for reference throughout workflow',
          code: `// Save question for context maintenance
await fileSystem.write("question.txt", originalQuery);
console.log("Question saved for future reference");`,
          data: {
            original_question: 'Research the current state of AI agent frameworks...',
            file_location: 'question.txt'
          },
          timing: 800
        },
        {
          id: 'step4',
          name: 'Research Sub-Agent Activation',
          description: 'Delegate specialized research tasks to research sub-agent',
          code: `// Activate research sub-agent for in-depth investigation
const researchResult = await subAgents.research({
  query: "AI agent frameworks market analysis",
  depth: "comprehensive",
  sources: "academic_and_industry"
});`,
          data: {
            subagent: 'research-agent',
            task_type: 'market_analysis',
            context_quarantine: true
          },
          timing: 3000
        },
        {
          id: 'step5',
          name: 'Data Gathering',
          description: 'Research agent uses external tools to gather information',
          code: `// Research agent gathers data using available tools
const searchResults = await internetSearch({
  query: "enterprise AI agent adoption 2024",
  maxResults: 10,
  topic: "general"
});`,
          data: {
            tools_used: ['internet_search', 'academic_database'],
            sources_found: 25,
            data_quality: 'high'
          },
          timing: 4000
        },
        {
          id: 'step6',
          name: 'Information Synthesis',
          description: 'Research agent synthesizes findings into comprehensive analysis',
          code: `// Synthesize research findings
const synthesis = await researchAgent.synthesize({
  data: gatheredData,
  format: "structured_analysis",
  citations: true
});`,
          data: {
            findings_count: 45,
            key_insights: 8,
            citations: 25
          },
          timing: 2500
        },
        {
          id: 'step7',
          name: 'Draft Creation',
          description: 'Main agent creates initial draft using research findings',
          code: `// Create initial draft report
const draftContent = await mainAgent.createDraft({
  research: synthesizedData,
  structure: "executive_summary_detailed_analysis",
  length: "comprehensive"
});
await fileSystem.write("draft_report.md", draftContent);`,
          data: {
            draft_length: '15 pages',
            sections: 7,
            files_updated: ['draft_report.md']
          },
          timing: 3500
        },
        {
          id: 'step8',
          name: 'Critique Sub-Agent Review',
          description: 'Critique agent reviews draft for quality and completeness',
          code: `// Activate critique sub-agent for quality assurance
const critique = await subAgents.critique({
  document: "draft_report.md",
  criteria: ["completeness", "accuracy", "structure", "citations"],
  standards: "professional_research"
});`,
          data: {
            subagent: 'critique-agent',
            review_areas: ['content', 'structure', 'citations', 'clarity'],
            feedback_points: 12
          },
          timing: 2000
        },
        {
          id: 'step9',
          name: 'Iterative Refinement',
          description: 'Main agent incorporates feedback and refines the draft',
          code: `// Refine draft based on critique feedback
const refinedDraft = await mainAgent.refine({
  original: draftContent,
  feedback: critique,
  improvements: ["add_missing_sections", "strengthen_citations", "improve_clarity"]
});`,
          data: {
            improvements_made: 8,
            quality_score: 'improved',
            iteration: 1
          },
          timing: 2800
        },
        {
          id: 'step10',
          name: 'Final Quality Check',
          description: 'Additional critique cycle for final validation',
          code: `// Final quality assurance check
const finalCritique = await subAgents.critique({
  document: "refined_draft.md",
  final_review: true,
  approval_criteria: "publication_ready"
});`,
          data: {
            final_score: 'approved',
            remaining_issues: 2,
            ready_for_finalization: true
          },
          timing: 1500
        },
        {
          id: 'step11',
          name: 'Final Report Generation',
          description: 'Generate final polished report with all improvements',
          code: `// Create final report
const finalReport = await mainAgent.finalize({
  content: refinedDraft,
  format: "professional_report",
  include: ["executive_summary", "sources", "appendices"]
});
await fileSystem.write("final_report.md", finalReport);`,
          data: {
            final_length: '18 pages',
            total_sources: 28,
            files_created: ['final_report.md']
          },
          timing: 2000
        },
        {
          id: 'step12',
          name: 'Workflow Completion',
          description: 'Return comprehensive results with all generated files',
          code: `// Return complete workflow results
return {
  status: "completed",
  files: fileSystem.getAllFiles(),
  main_output: "final_report.md",
  metadata: workflowMetadata
};`,
          data: {
            total_files: 5,
            execution_time: '24 minutes',
            quality_rating: 'excellent',
            task_completion: '100%'
          },
          timing: 1000
        }
      ];
      
    // Add more algorithm types as needed
    
    default:
      // Default generic algorithm steps
      return [
        {
          id: 'step1',
          name: 'Initialize',
          description: 'Set up initial state and parameters',
          timing: 1000
        },
        {
          id: 'step2',
          name: 'Process Input',
          description: 'Parse and validate user input',
          timing: 1200
        },
        {
          id: 'step3',
          name: 'Execute Core Logic',
          description: 'Run the main algorithm logic',
          timing: 2000
        },
        {
          id: 'step4',
          name: 'Format Results',
          description: 'Prepare and format the output',
          timing: 1000
        }
      ];
  }
}

/**
 * Calculate speed multiplier based on animation settings
 */
// Get animation speed multiplier with a different name to avoid conflicts
export function getAlgorithmSpeedMultiplier(speed: 'slow' | 'normal' | 'fast' | number): number {
  if (typeof speed === 'number') {
    return speed;
  }
  
  switch (speed) {
    case 'slow': return 0.5;
    case 'fast': return 2.0;
    case 'normal':
    default: return 1.0;
  }
}