import { PatternData } from './types';
import { CodeVisualizer } from '@/components/visualization/business-use-cases/CodeVisualizer';

export const codeActPattern: PatternData = {
  id: 'codeact-agent',
  name: 'CodeAct Agent',
  description: 'An agent that can autonomously write and execute code to solve complex problems, bridging the gap between reasoning and direct action.',
  category: 'Core',
  useCases: ['Automated Software Development', 'Data Analysis & Visualization', 'Scientific Computing'],
  whenToUse: 'Use the CodeAct pattern for tasks that require dynamic computation, data manipulation, or interaction with systems via code. It is superior to simple tool use when the task logic is too complex for a predefined tool, such as generating a custom data visualization, running a simulation, or automating a software development task.',
  businessUseCase: {
    industry: 'Software Development & DevOps',
    description: 'A software company uses a "CodeAct Agent" to improve developer productivity by automating unit test generation. When a developer commits a new function, the agent is triggered. It first *reads* the function\'s source code to understand its logic and parameters. It then *writes* a new Python script containing a set of unit tests that cover edge cases and common scenarios. Finally, it *executes* the test script in a sandboxed environment to verify the function\'s correctness. This saves developers hours of tedious work and ensures consistent test coverage across the codebase.',
    visualization: () => (
      <div className="flex flex-col items-center p-4">
        <div className="flex flex-row items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">👨‍💻</span>
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">CodeAct Agent</div>
        </div>
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
          <div className="font-bold text-blue-600 dark:text-blue-400 mb-2">Workflow:</div>
          <ol className="list-decimal ml-6 text-gray-700 dark:text-gray-300">
            <li>Developer commits new code</li>
            <li>Agent reads function source code</li>
            <li>Agent writes Python unit tests</li>
            <li>Agent executes tests in sandbox</li>
            <li>Results reported to pull request</li>
          </ol>
        </div>
        <div className="flex flex-row items-center space-x-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl">📥</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Commit</span>
          </div>
          <span className="text-xl text-gray-400 dark:text-gray-500">→</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">🤖</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Agent</span>
          </div>
          <span className="text-xl text-gray-400 dark:text-gray-500">→</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">🧪</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Tests</span>
          </div>
          <span className="text-xl text-gray-400 dark:text-gray-500">→</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">🔒</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Sandbox</span>
          </div>
          <span className="text-xl text-gray-400 dark:text-gray-500">→</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">📊</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Results</span>
          </div>
        </div>
      </div>
    ),
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing an "Automated Unit Test Generation" system using the CodeAct pattern on Azure.
      
      Your response should be structured with the following sections, using Markdown for formatting:
      
      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure DevOps (as the trigger for new commits), an Azure Function (to host the CodeAct agent), and a secure, sandboxed Azure Container App (for code execution).
      - Show the flow: a \`git push\` triggers the agent, which reads the code, writes a test file, executes it in the sandbox, and reports the results back to the pull request.
      
      ### 2. CodeAct Agent: Implementation
      - Provide a Python code example for the agent's main loop.
      - Show the prompt that instructs the agent to read a file path, understand the code, and generate \`pytest\`-compatible unit tests.
      - Detail the "Action" step, where the agent decides to write the generated test code to a new file (e.g., \`test_my_function.py\`).
      
      ### 3. Secure Code Execution Sandbox
      - Explain the importance of the sandboxed execution environment.
      - Describe how to configure the Azure Container App to be secure: no network access, limited file system access, and strict resource limits (CPU, memory) to prevent abuse.
      - Provide a snippet of the Dockerfile for this sandbox environment.
      
      ### 4. Evaluation Strategy
      - Detail the evaluation plan for the generated tests.
      - **Test Coverage:** Use a tool like \`pytest-cov\` to measure the percentage of the source code that is covered by the generated tests.
      - **Test Quality:** Use an LLM-as-Judge with a rubric to assess the quality of the generated tests. Do they check for meaningful edge cases? Are they well-structured?
      - **Bug Detection:** Run the generated tests against a version of the source code with known, injected bugs. How many of the bugs did the tests catch?
      
      ### 5. Feedback Loop
      - Describe how the results of the test execution are fed back to the developer in the Azure DevOps pull request.
      - Explain how a developer could provide feedback (e.g., "This test is incorrect") to help fine-tune the agent's test generation prompts over time.
    `,
  },
  nodes: [
    {
      id: 'user',
      type: 'input',
      data: { label: 'User', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'agent',
      type: 'default',
      data: { label: 'Agent', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'think',
      type: 'default',
      data: { label: 'Think', nodeType: 'llm' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'act',
      type: 'default',
      data: { label: 'Act (Code)', nodeType: 'executor' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'user', target: 'agent', animated: true },
    { id: 'e2-3', source: 'agent', target: 'think', animated: true },
    { id: 'e2-4', source: 'agent', target: 'act', animated: true },
    { id: 'e3-5', source: 'think', target: 'output' },
    { id: 'e4-5', source: 'act', target: 'output' }
  ],
  codeExample: `# CodeAct Agent Implementation - Complete TypeScript/JavaScript Version
import { SandboxedCodeExecutor } from './sandboxedExecutor';
import { OpenAI } from 'openai';

interface CodeActRequest {
  task: string;
  context?: string;
  maxIterations?: number;
}

interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  code: string;
}

class CodeActAgent {
  private client: OpenAI;
  private executor: SandboxedCodeExecutor;
  private maxIterations: number;

  constructor(apiKey: string, maxIterations = 5) {
    this.client = new OpenAI({ apiKey });
    this.executor = new SandboxedCodeExecutor({
      timeout: 30000,
      memoryLimit: '512MB',
      networkAccess: false
    });
    this.maxIterations = maxIterations;
  }

  async solve(request: CodeActRequest): Promise<ExecutionResult> {
    const { task, context = '', maxIterations = this.maxIterations } = request;
    
    let currentContext = context;
    let lastOutput = '';
    let iteration = 0;

    while (iteration < maxIterations) {
      try {
        // Generate code based on task and current context
        const codePrompt = this.buildCodePrompt(task, currentContext, lastOutput);
        const response = await this.client.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: \`You are a CodeAct agent. Your job is to solve tasks by writing and executing Python code.
              
              Rules:
              1. Always write complete, executable Python code
              2. Include error handling and validation
              3. Provide clear comments explaining your approach
              4. If previous attempts failed, analyze the error and adjust
              5. Use only standard libraries unless specified otherwise
              6. Return ONLY the Python code, no explanations outside comments\`
            },
            {
              role: 'user',
              content: codePrompt
            }
          ],
          temperature: 0.1
        });

        const generatedCode = response.choices[0]?.message?.content?.trim() || '';
        
        if (!generatedCode) {
          throw new Error('No code generated');
        }

        // Execute the generated code
        const result = await this.executor.execute(generatedCode);
        
        if (result.success) {
          return {
            success: true,
            output: result.output,
            code: generatedCode
          };
        } else {
          // If execution failed, add error context for next iteration
          lastOutput = result.error || 'Unknown execution error';
          currentContext += \`\\n\\nPrevious attempt failed with error: \${lastOutput}\`;
          iteration++;
        }
      } catch (error) {
        lastOutput = error instanceof Error ? error.message : 'Unknown error';
        currentContext += \`\\n\\nPrevious attempt failed with error: \${lastOutput}\`;
        iteration++;
      }
    }

    return {
      success: false,
      output: '',
      error: \`Failed to solve task after \${maxIterations} iterations. Last error: \${lastOutput}\`,
      code: ''
    };
  }

  private buildCodePrompt(task: string, context: string, lastOutput: string): string {
    let prompt = \`Task: \${task}\`;
    
    if (context) {
      prompt += \`\\n\\nContext: \${context}\`;
    }
    
    if (lastOutput) {
      prompt += \`\\n\\nPrevious execution failed with error: \${lastOutput}\`;
      prompt += \`\\nPlease analyze the error and write corrected code.\`;
    }
    
    prompt += \`\\n\\nWrite Python code to solve this task. The code should be complete and executable.\`;
    
    return prompt;
  }
}

// Example usage
async function example() {
  const agent = new CodeActAgent(process.env.OPENAI_API_KEY!);
  
  const result = await agent.solve({
    task: "Create a function that finds all prime numbers up to n using the Sieve of Eratosthenes algorithm. Then use it to find all primes up to 100 and calculate their sum.",
    maxIterations: 3
  });
  
  if (result.success) {
    console.log('Task completed successfully!');
    console.log('Generated Code:', result.code);
    console.log('Output:', result.output);
  } else {
    console.error('Task failed:', result.error);
  }
}

// Sandboxed executor implementation
class SandboxedCodeExecutor {
  private config: {
    timeout: number;
    memoryLimit: string;
    networkAccess: boolean;
  };

  constructor(config: any) {
    this.config = config;
  }

  async execute(code: string): Promise<{ success: boolean; output: string; error?: string }> {
    try {
      // In production, this would use Docker or similar sandboxing
      // For demo purposes, we'll simulate execution
      console.log('Executing code in sandbox:', code);
      
      // Simulate successful execution
      return {
        success: true,
        output: 'Code executed successfully with expected results'
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}`,
  pythonCodeExample: `# CodeAct Agent Implementation - Complete Python Version
import subprocess
import os
import tempfile
import json
import time
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import openai
from openai import OpenAI

@dataclass
class ExecutionResult:
    success: bool
    output: str
    error: Optional[str] = None
    execution_time: float = 0.0
    code: str = ""

class SecureCodeExecutor:
    """Secure sandboxed code execution environment."""
    
    def __init__(self, timeout: int = 30, memory_limit: str = "512M"):
        self.timeout = timeout
        self.memory_limit = memory_limit
        self.allowed_imports = {
            'math', 'random', 'datetime', 'json', 'collections', 
            'itertools', 'functools', 'operator', 're', 'string',
            'numpy', 'pandas', 'matplotlib', 'seaborn', 'scipy'
        }
    
    def execute(self, code: str) -> ExecutionResult:
        """Execute Python code in a secure sandbox."""
        start_time = time.time()
        
        try:
            # Validate code safety
            if not self._is_code_safe(code):
                return ExecutionResult(
                    success=False,
                    output="",
                    error="Code contains potentially unsafe operations",
                    execution_time=0.0,
                    code=code
                )
            
            # Create temporary file for code execution
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            try:
                # Execute code with resource limits
                result = subprocess.run(
                    ['python', temp_file],
                    capture_output=True,
                    text=True,
                    timeout=self.timeout,
                    cwd=tempfile.gettempdir()
                )
                
                execution_time = time.time() - start_time
                
                if result.returncode == 0:
                    return ExecutionResult(
                        success=True,
                        output=result.stdout,
                        execution_time=execution_time,
                        code=code
                    )
                else:
                    return ExecutionResult(
                        success=False,
                        output=result.stdout,
                        error=result.stderr,
                        execution_time=execution_time,
                        code=code
                    )
                    
            finally:
                # Clean up temporary file
                os.unlink(temp_file)
                
        except subprocess.TimeoutExpired:
            return ExecutionResult(
                success=False,
                output="",
                error=f"Code execution timed out after {self.timeout} seconds",
                execution_time=self.timeout,
                code=code
            )
        except Exception as e:
            return ExecutionResult(
                success=False,
                output="",
                error=f"Execution error: {str(e)}",
                execution_time=time.time() - start_time,
                code=code
            )
    
    def _is_code_safe(self, code: str) -> bool:
        """Basic safety checks for code execution."""
        dangerous_patterns = [
            'import os', 'import sys', 'import subprocess', 'import socket',
            'open(', 'file(', 'eval(', 'exec(', '__import__',
            'globals()', 'locals()', 'vars()', 'dir()',
            'getattr', 'setattr', 'delattr', 'hasattr'
        ]
        
        code_lower = code.lower()
        return not any(pattern in code_lower for pattern in dangerous_patterns)

class CodeActAgent:
    """
    CodeAct Agent: An AI agent that solves problems by iteratively 
    generating and executing code.
    """
    
    def __init__(self, api_key: str, model: str = "gpt-4", max_iterations: int = 5):
        self.client = OpenAI(api_key=api_key)
        self.model = model
        self.max_iterations = max_iterations
        self.executor = SecureCodeExecutor()
        self.conversation_history = []
    
    def solve(self, task: str, context: str = "") -> ExecutionResult:
        """
        Solve a task using the CodeAct pattern: think, generate code, execute, repeat.
        """
        print(f"🎯 Task: {task}")
        print("=" * 60)
        
        current_context = context
        last_error = ""
        iteration = 0
        
        while iteration < self.max_iterations:
            iteration += 1
            print(f"\\n🔄 Iteration {iteration}/{self.max_iterations}")
            
            try:
                # Generate code using the LLM
                generated_code = self._generate_code(task, current_context, last_error)
                print(f"\\n📝 Generated Code:\\n{generated_code}")
                
                # Execute the generated code
                result = self.executor.execute(generated_code)
                
                if result.success:
                    print(f"\\n✅ Success! Output:\\n{result.output}")
                    return result
                else:
                    print(f"\\n❌ Execution failed: {result.error}")
                    last_error = result.error or "Unknown error"
                    current_context += f"\\n\\nAttempt {iteration} failed with error: {last_error}"
                    
            except Exception as e:
                error_msg = str(e)
                print(f"\\n💥 Exception in iteration {iteration}: {error_msg}")
                last_error = error_msg
                current_context += f"\\n\\nAttempt {iteration} failed with exception: {error_msg}"
        
        # If we reach here, all iterations failed
        return ExecutionResult(
            success=False,
            output="",
            error=f"Failed to solve task after {self.max_iterations} iterations. Last error: {last_error}",
            code=""
        )
    
    def _generate_code(self, task: str, context: str, last_error: str) -> str:
        """Generate Python code to solve the given task."""
        
        system_prompt = '''You are a CodeAct agent - an AI that solves problems by writing and executing Python code.

Your capabilities:
- Write complete, executable Python code
- Handle errors and iterate on solutions  
- Use standard libraries (math, random, datetime, json, collections, itertools, etc.)
- Create visualizations with matplotlib/seaborn
- Process data with pandas/numpy

Security constraints:
- No file system access (no open(), file operations)
- No network operations (no requests, urllib)
- No system operations (no os, sys, subprocess)
- No dynamic code execution (no eval, exec)

Response format:
- Return ONLY executable Python code
- Include clear comments explaining your approach
- Handle edge cases and add error checking
- Print results clearly for verification'''

        user_prompt = f"Task: {task}"
        
        if context:
            user_prompt += f"\\n\\nContext: {context}"
            
        if last_error:
            user_prompt += f"\\n\\nPrevious attempt failed with error: {last_error}"
            user_prompt += "\\nAnalyze the error and write corrected code."
            
        user_prompt += "\\n\\nWrite Python code to solve this task:"
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.1,
                max_tokens=1500
            )
            
            generated_code = response.choices[0].message.content.strip()
            
            # Clean up the code (remove markdown formatting if present)
            if generated_code.startswith('\\u0060\\u0060\\u0060python'):
                generated_code = generated_code[9:]
            if generated_code.startswith('\\u0060\\u0060\\u0060'):
                generated_code = generated_code[3:]
            if generated_code.endswith('\\u0060\\u0060\\u0060'):
                generated_code = generated_code[:-3]
                
            return generated_code.strip()
            
        except Exception as e:
            raise Exception(f"Failed to generate code: {str(e)}")

# Example working implementation
def sieve_of_eratosthenes(n):
    """Find all prime numbers up to n using Sieve of Eratosthenes."""
    if n < 2:
        return []
    
    # Initialize boolean array
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    # Sieve algorithm
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    
    # Collect primes
    primes = [i for i in range(2, n + 1) if is_prime[i]]
    return primes

# Find primes up to 100
primes = sieve_of_eratosthenes(100)
prime_sum = sum(primes)

print(f"Prime numbers up to 100: {primes}")
print(f"Count of primes: {len(primes)}")
print(f"Sum of primes: {prime_sum}")
print(f"Largest prime: {max(primes)}")

# Sample Transcript Output:
# 🎯 Task: Create a function to calculate compound interest and show growth over 10 years
# 
# 🔄 Iteration 1/3
# 
# 📝 Generated Code:
# def compound_interest(principal, rate, time, compound_frequency=1):
#     amount = principal * (1 + rate/compound_frequency)**(compound_frequency * time)
#     return amount
# 
# principal = 1000
# rate = 0.05
# time = 10
# 
# for year in range(1, time + 1):
#     amount = compound_interest(principal, rate, year)
#     growth = amount - principal
#     print(f"Year {year}: $\{amount:.2f\} (Growth: $\{growth:.2f\})")
# 
# ✅ Success! Output:
# Year 1: $1050.00 (Growth: $50.00)
# Year 2: $1102.50 (Growth: $102.50)
# ...
# Year 10: $1628.89 (Growth: $628.89)

if __name__ == "__main__":
    print("🚀 CodeAct Agent Demo")
    print("=" * 50)
    
    # Demonstrate prime calculation
    print("Prime numbers up to 100:")
    result = sieve_of_eratosthenes(100)
    print(f"Found {len(result)} primes, sum = {sum(result)}")`,
  implementation: [
    'Set up code execution environment with safety constraints',
    'Create think-act cycle for iterative problem solving',
    'Implement code parsing and execution logic',
    'Add error handling and timeout mechanisms',
    'Build result validation and feedback loops',
    'Create session management for persistent variables',
    'Add code safety checks and sandboxing',
    'Implement logging and debugging capabilities'
  ],
  advantages: [
    "Can solve highly complex, dynamic tasks that cannot be handled by predefined tools.",
    "Enables direct interaction with systems and APIs through code.",
    "Can automate software development, data analysis, and other complex workflows.",
    "The generated code can be inspected, providing transparency."
  ],
  limitations: [
    "Significant security risks if code is not executed in a properly sandboxed environment.",
    "Can be slow and expensive due to the need to generate, execute, and debug code.",
    "May produce inefficient or low-quality code.",
    "Debugging failed code executions can be very challenging."
  ],
  relatedPatterns: [
    "react-agent",
    "agent-evaluation",
    "autonomous-workflow"
  ]
};
