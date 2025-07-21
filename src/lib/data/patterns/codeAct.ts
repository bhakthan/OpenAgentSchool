import { PatternData } from './types';
import { TestGenerationVisual } from '@/components/visualization/business-use-cases/TestGenerationVisual';

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
    visualization: TestGenerationVisual,
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
    `
  },
  evaluation: `Evaluating a CodeAct agent requires a focus on the functional correctness and quality of the code it produces.
- **Execution Success Rate:** What percentage of the time does the generated code run without errors?
- **Task Completion:** Does the executed code actually solve the user's task? This can be verified by running assertions against the output. For example, if the task was "sort this list," the evaluation would assert that the final list is sorted.
- **Code Quality:** Use static analysis tools (linters, complexity checkers) to score the quality of the generated code. Is it efficient? Is it readable?
- **Test Coverage:** For tasks involving code generation, a CodeAct agent can also be prompted to generate its own unit tests. The coverage of these tests becomes a key evaluation metric, as seen in benchmarks like SWE-bench.`,
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
  codeExample: `// CodeAct Agent implementation...`,
  pythonCodeExample: `# CodeAct Agent implementation...`,
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