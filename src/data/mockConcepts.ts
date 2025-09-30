// Mock Concepts Data for Testing
// This provides static test data until Knowledge Service concept endpoints are implemented

// Import new foundation concepts
import { llmFundamentalsConcept } from './concepts/llm-fundamentals';
import { gettingStartedConcept } from './concepts/getting-started';
import { ragConcept } from './concepts/rag-fundamentals';
import { orchestrationConcept } from './concepts/agent-orchestration';

export interface VideoResource {
  id: string;
  title: string;
  url: string;
  platform: 'youtube' | 'microsoft' | 'vimeo' | 'other';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  timestamps?: Array<{
    time: string;
    label: string;
  }>;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  runnable?: boolean;
}

export interface MockConcept {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  learning_objectives: string[];
  content: string;
  prerequisites: string[];
  estimated_time: number;
  videos?: VideoResource[];
  code_examples?: CodeExample[];
}

export const MOCK_CONCEPTS: MockConcept[] = [
  // Foundation concepts (new - Phase 1)
  llmFundamentalsConcept,
  gettingStartedConcept,
  ragConcept,
  orchestrationConcept,
  
  // Existing concepts
  {
    id: "agent-architecture",
    title: "Agent Architecture Patterns",
    description: "Core architectural patterns for building AI agents including ReAct, Chain-of-Thought, and Tool-Using agents. Learn how to structure agent systems for reliability and scalability.",
    category: "architecture",
    difficulty: "intermediate",
    tags: ["architecture", "patterns", "design"],
    learning_objectives: [
      "Understand ReAct and CoT patterns",
      "Design scalable agent systems",
      "Implement tool-using agents"
    ],
    content: "Agent architecture defines how AI agents are structured and organized...",
    prerequisites: ["llm-fundamentals"],
    estimated_time: 45,
    videos: [
      {
        id: "agent-architecture-patterns",
        title: "Agent Architecture Patterns & Design Principles",
        url: "https://www.youtube.com/watch?v=Xs-5VZQw_3c",
        platform: "youtube",
        duration: 28,
        difficulty: "intermediate",
        description: "Comprehensive guide to designing robust agent architectures with proven patterns",
        timestamps: [
          { time: "0:00", label: "Introduction to Agent Architecture" },
          { time: "5:30", label: "ReAct Pattern Deep Dive" },
          { time: "12:00", label: "Chain-of-Thought vs ReAct" },
          { time: "18:00", label: "Tool-Using Agent Design" },
          { time: "24:00", label: "Scalability Considerations" }
        ]
      },
      {
        id: "building-production-agents",
        title: "Building Production-Ready AI Agents",
        url: "https://www.youtube.com/watch?v=sgrRwyDUb-M",
        platform: "youtube",
        duration: 35,
        difficulty: "advanced",
        description: "Best practices for deploying agents in production with reliability and monitoring",
        timestamps: [
          { time: "0:00", label: "Production Requirements" },
          { time: "8:00", label: "Error Handling & Retries" },
          { time: "16:30", label: "Monitoring & Observability" },
          { time: "25:00", label: "Performance Optimization" },
          { time: "30:00", label: "Real-World Case Studies" }
        ]
      }
    ]
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Fundamentals",
    description: "Master the art of crafting effective prompts for Large Language Models. Learn techniques for few-shot learning, chain-of-thought prompting, and prompt optimization.",
    category: "fundamentals",
    difficulty: "beginner",
    tags: ["prompts", "llm", "fundamentals"],
    learning_objectives: [
      "Write clear and effective prompts",
      "Use few-shot examples",
      "Apply chain-of-thought techniques",
      "Master advanced prompting patterns (ReAct, Tree-of-Thought, Meta-prompting)",
      "Optimize prompts for cost and performance",
      "Build reusable prompt templates"
    ],
    content: `Prompt engineering is the practice of designing inputs to elicit desired outputs from LLMs. Effective prompts combine clear instructions, relevant context, and formatting that guides the model toward accurate, consistent responses.

**Advanced Techniques:**
- **Chain-of-Thought (CoT)**: Guide models to show reasoning steps before conclusions
- **Few-Shot Learning**: Provide 2-5 examples to establish patterns
- **ReAct Prompting**: Combine reasoning and action steps for complex tasks
- **Tree-of-Thought**: Explore multiple reasoning paths in parallel
- **Meta-Prompting**: Use prompts to generate or refine other prompts

**Optimization Strategies:**
1. Start broad, refine iteratively based on outputs
2. Use delimiters (###, ---) to separate sections
3. Specify format explicitly (JSON, markdown, bullet points)
4. Test with edge cases and ambiguous inputs
5. Balance detail with token efficiency

**Common Pitfalls:**
- Vague instructions leading to inconsistent results
- Over-engineering prompts that confuse the model
- Ignoring model limitations (context window, knowledge cutoff)
- Not validating outputs systematically`,
    prerequisites: [],
    estimated_time: 30,
    videos: [
      {
        id: "prompt-eng-masterclass",
        title: "Prompt Engineering Masterclass",
        url: "https://www.youtube.com/watch?v=dOxUroR57xs",
        platform: "youtube",
        duration: 28,
        difficulty: "beginner",
        description: "Comprehensive introduction to prompt engineering techniques with practical examples",
        timestamps: [
          { time: "0:00", label: "Introduction to Prompt Engineering" },
          { time: "5:30", label: "Few-Shot Learning Examples" },
          { time: "12:00", label: "Chain-of-Thought Prompting" },
          { time: "18:45", label: "Advanced Techniques" }
        ]
      },
      {
        id: "openai-prompt-guide",
        title: "OpenAI Prompt Engineering Guide",
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
        platform: "other",
        duration: 15,
        difficulty: "intermediate",
        description: "Official OpenAI guide covering best practices and advanced techniques"
      }
    ],
    code_examples: [
      {
        id: "basic-prompt-template",
        title: "Basic Prompt Template",
        language: "typescript",
        code: `// Structured prompt template for consistency\nconst createPrompt = (task: string, context: string, examples?: string[]) => {\n  let prompt = \`Task: \${task}\\n\\nContext: \${context}\\n\`;\n  \n  if (examples && examples.length > 0) {\n    prompt += \`\\nExamples:\\n\${examples.map((ex, i) => \`\${i + 1}. \${ex}\`).join('\\n')}\\n\`;\n  }\n  \n  prompt += \`\\nInstructions: Provide a clear, concise response following the examples above.\`;\n  return prompt;\n};\n\n// Usage\nconst prompt = createPrompt(\n  "Classify customer sentiment",\n  "Analyze customer feedback for sentiment",\n  [\n    "Input: 'Great product!' -> Output: Positive",\n    "Input: 'Terrible service.' -> Output: Negative",\n    "Input: 'It works fine.' -> Output: Neutral"\n  ]\n);`,
        description: "Reusable template for creating consistent, structured prompts with optional few-shot examples",
        runnable: true
      },
      {
        id: "chain-of-thought-example",
        title: "Chain-of-Thought Prompting",
        language: "typescript",
        code: `// Chain-of-Thought prompting for complex reasoning\nconst chainOfThoughtPrompt = \`You are a helpful assistant that shows your reasoning step-by-step.\n\nQuestion: If a store has 15 apples and sells 60% of them, then receives a shipment of 8 more apples, how many apples does the store have?\n\nThink through this step-by-step:\n1. Calculate how many apples were sold\n2. Determine remaining apples after sale\n3. Add the new shipment\n4. Provide the final answer\n\nLet's work through this together:\`;\n\n// Advanced: ReAct pattern (Reasoning + Acting)\nconst reactPrompt = (observation: string) => \`You are an agent that can reason and take actions.\n\nObservation: \${observation}\n\nThought: [Your reasoning about what to do next]\nAction: [The specific action to take]\nAction Input: [Parameters for the action]\n\nExample:\nObservation: User asks "What's the weather in Paris?"\nThought: I need to check the current weather for Paris, France\nAction: search_weather\nAction Input: { "city": "Paris", "country": "France" }\`;\n\n// Tree-of-Thought for exploring multiple solutions\nconst treeOfThoughtPrompt = \`Problem: Design a database schema for a social media app.\n\nExplore 3 different approaches:\n\nApproach 1 (Relational):\n- Consider: [List pros/cons]\n- Schema: [Outline structure]\n\nApproach 2 (Document-based):\n- Consider: [List pros/cons]\n- Schema: [Outline structure]\n\nApproach 3 (Graph-based):\n- Consider: [List pros/cons]\n- Schema: [Outline structure]\n\nEvaluate each approach and recommend the best solution.\`;`,
        description: "Advanced prompting patterns including CoT, ReAct, and Tree-of-Thought for complex reasoning tasks",
        runnable: true
      },
      {
        id: "prompt-template-library",
        title: "Reusable Prompt Template Library",
        language: "typescript",
        code: `// Production-ready prompt template library\nclass PromptTemplates {\n  // Classification template\n  static classify(input: string, categories: string[], examples?: Array<{input: string, output: string}>) {\n    let prompt = \`Classify the following input into one of these categories: \${categories.join(', ')}\\n\\n\`;\n    \n    if (examples) {\n      prompt += \`Examples:\\n\${examples.map(ex => \`Input: "\${ex.input}" -> Category: \${ex.output}\`).join('\\n')}\\n\\n\`;\n    }\n    \n    prompt += \`Input: "\${input}"\\nCategory:\`;\n    return prompt;\n  }\n  \n  // Extraction template with JSON output\n  static extractJSON(text: string, schema: Record<string, string>) {\n    return \`Extract information from the text and return it as JSON matching this schema:\n\${JSON.stringify(schema, null, 2)}\n\nText: "\${text}"\n\nJSON output:\`;\n  }\n  \n  // Summarization with constraints\n  static summarize(text: string, maxWords: number, style: 'bullet' | 'paragraph' = 'paragraph') {\n    return \`Summarize the following text in \${maxWords} words or less as a \${style === 'bullet' ? 'bulleted list' : 'single paragraph'}:\n\n\${text}\n\nSummary:\`;\n  }\n  \n  // Code generation with constraints\n  static generateCode(description: string, language: string, constraints?: string[]) {\n    let prompt = \`Generate \${language} code for: \${description}\\n\`;\n    \n    if (constraints && constraints.length > 0) {\n      prompt += \`\\nConstraints:\\n\${constraints.map(c => \`- \${c}\`).join('\\n')}\\n\`;\n    }\n    \n    prompt += \`\\nCode:\`;\n    return prompt;\n  }\n}\n\n// Usage examples\nconst classifyPrompt = PromptTemplates.classify(\n  "The product broke after one week",\n  ["positive", "neutral", "negative"],\n  [\n    { input: "Amazing quality!", output: "positive" },\n    { input: "It's okay", output: "neutral" }\n  ]\n);\n\nconst extractPrompt = PromptTemplates.extractJSON(\n  "John Smith, age 30, lives in New York",\n  { name: "string", age: "number", city: "string" }\n);`,
        description: "Production-grade prompt template library with methods for classification, extraction, summarization, and code generation",
        runnable: true
      }
    ]
  },
  {
    id: "tool-calling",
    title: "Tool Calling & Function Execution",
    description: "Enable your AI agents to interact with external tools and APIs. Learn function calling patterns, error handling, and orchestration strategies.",
    category: "patterns",
    difficulty: "intermediate",
    tags: ["tools", "functions", "integration"],
    learning_objectives: [
      "Implement function calling",
      "Handle tool execution errors",
      "Orchestrate multi-tool workflows",
      "Master retry and fallback patterns",
      "Implement circuit breakers and timeouts",
      "Build tool composition strategies"
    ],
    content: `Tool calling allows agents to extend their capabilities beyond text generation by executing functions, calling APIs, and interacting with external systems. Modern LLMs can decide when and how to use tools based on user requests.

**Core Concepts:**
- **Function Definitions**: Describe tools with JSON schemas the model can understand
- **Tool Selection**: Model chooses appropriate tool(s) based on task
- **Execution**: Agent calls tool with parameters and receives results
- **Result Integration**: Agent incorporates tool output into response

**Error Handling Patterns:**
1. **Retry with Exponential Backoff**: Handle transient failures gracefully
2. **Fallback Tools**: Use alternative tools when primary fails
3. **Circuit Breaker**: Stop calling failing tools temporarily
4. **Timeout Guards**: Prevent hanging on slow tools
5. **Validation**: Check tool outputs before using them

**Tool Composition:**
- **Sequential**: Execute tools one after another
- **Parallel**: Run multiple tools simultaneously
- **Conditional**: Choose tools based on previous results
- **Recursive**: Tools that call other tools

**Real-World Integrations:**
- Weather APIs (OpenWeatherMap, WeatherAPI)
- Email services (SendGrid, Gmail API)
- Databases (PostgreSQL, MongoDB, Redis)
- Calendar systems (Google Calendar, Outlook)
- File operations (cloud storage, local filesystem)`,
    prerequisites: ["prompt-engineering"],
    estimated_time: 60,
    videos: [
      {
        id: "tool-calling-deep-dive",
        title: "Tool Calling Deep Dive with OpenAI",
        url: "https://www.youtube.com/watch?v=V4FZ0_XCR_s",
        platform: "youtube",
        duration: 22,
        difficulty: "intermediate",
        description: "Comprehensive guide to function calling with practical examples and best practices",
        timestamps: [
          { time: "0:00", label: "Introduction to Function Calling" },
          { time: "4:15", label: "Defining Tool Schemas" },
          { time: "9:30", label: "Error Handling Strategies" },
          { time: "16:00", label: "Production Patterns" }
        ]
      },
      {
        id: "openai-function-calling",
        title: "OpenAI Function Calling Masterclass",
        url: "https://www.youtube.com/watch?v=RbgJNyJpqFA",
        platform: "youtube",
        duration: 35,
        difficulty: "intermediate",
        description: "Complete OpenAI function calling tutorial with real-world integrations",
        timestamps: [
          { time: "0:00", label: "Introduction to Function Calling" },
          { time: "8:00", label: "Building Function Definitions" },
          { time: "16:00", label: "Real API Integrations" },
          { time: "25:00", label: "Multi-Tool Workflows" },
          { time: "31:00", label: "Testing & Debugging" }
        ]
      }
    ],
    code_examples: [
      {
        id: "basic-tool-calling",
        title: "Basic Tool Calling Setup",
        language: "typescript",
        code: `import OpenAI from 'openai';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\n// Define tools the agent can use\nconst tools = [\n  {\n    type: "function" as const,\n    function: {\n      name: "get_weather",\n      description: "Get current weather for a location",\n      parameters: {\n        type: "object",\n        properties: {\n          location: {\n            type: "string",\n            description: "City name, e.g. San Francisco"\n          },\n          unit: {\n            type: "string",\n            enum: ["celsius", "fahrenheit"],\n            description: "Temperature unit"\n          }\n        },\n        required: ["location"]\n      }\n    }\n  }\n];\n\n// Tool implementation\nconst executeFunction = async (name: string, args: any) => {\n  if (name === "get_weather") {\n    // In production, call actual weather API\n    return { temperature: 22, unit: args.unit || "celsius", condition: "sunny" };\n  }\n  throw new Error(\`Unknown function: \${name}\`);\n};\n\n// Agent loop\nconst runAgent = async (userMessage: string) => {\n  const messages: any[] = [{ role: "user", content: userMessage }];\n  \n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo-preview",\n    messages,\n    tools,\n    tool_choice: "auto"\n  });\n  \n  const responseMessage = response.choices[0].message;\n  \n  // Check if model wants to call a tool\n  if (responseMessage.tool_calls) {\n    messages.push(responseMessage);\n    \n    for (const toolCall of responseMessage.tool_calls) {\n      const args = JSON.parse(toolCall.function.arguments);\n      const result = await executeFunction(toolCall.function.name, args);\n      \n      messages.push({\n        role: "tool",\n        tool_call_id: toolCall.id,\n        content: JSON.stringify(result)\n      });\n    }\n    \n    // Get final response with tool results\n    const finalResponse = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages\n    });\n    \n    return finalResponse.choices[0].message.content;\n  }\n  \n  return responseMessage.content;\n};`,
        description: "Complete example of tool calling with OpenAI's function calling API",
        runnable: true
      },
      {
        id: "error-handling-patterns",
        title: "Production Error Handling",
        language: "typescript",
        code: `// Retry with exponential backoff\nclass RetryHandler {\n  async executeWithRetry<T>(\n    fn: () => Promise<T>,\n    maxRetries = 3,\n    baseDelay = 1000\n  ): Promise<T> {\n    for (let i = 0; i < maxRetries; i++) {\n      try {\n        return await fn();\n      } catch (error) {\n        if (i === maxRetries - 1) throw error;\n        \n        const delay = baseDelay * Math.pow(2, i);\n        await new Promise(resolve => setTimeout(resolve, delay));\n      }\n    }\n    throw new Error('Max retries exceeded');\n  }\n}\n\n// Circuit breaker pattern\nclass CircuitBreaker {\n  private failures = 0;\n  private lastFailureTime = 0;\n  private state: 'closed' | 'open' | 'half-open' = 'closed';\n  \n  constructor(\n    private threshold = 5,\n    private timeout = 60000 // 1 minute\n  ) {}\n  \n  async execute<T>(fn: () => Promise<T>): Promise<T> {\n    if (this.state === 'open') {\n      if (Date.now() - this.lastFailureTime > this.timeout) {\n        this.state = 'half-open';\n      } else {\n        throw new Error('Circuit breaker is OPEN');\n      }\n    }\n    \n    try {\n      const result = await fn();\n      this.onSuccess();\n      return result;\n    } catch (error) {\n      this.onFailure();\n      throw error;\n    }\n  }\n  \n  private onSuccess() {\n    this.failures = 0;\n    this.state = 'closed';\n  }\n  \n  private onFailure() {\n    this.failures++;\n    this.lastFailureTime = Date.now();\n    \n    if (this.failures >= this.threshold) {\n      this.state = 'open';\n    }\n  }\n}\n\n// Timeout wrapper\nconst withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {\n  return Promise.race([\n    promise,\n    new Promise<T>((_, reject) => \n      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)\n    )\n  ]);\n};\n\n// Usage\nconst retryHandler = new RetryHandler();\nconst circuitBreaker = new CircuitBreaker();\n\nconst safeToolCall = async (toolFn: () => Promise<any>) => {\n  return await circuitBreaker.execute(() =>\n    retryHandler.executeWithRetry(() =>\n      withTimeout(toolFn(), 5000)\n    )\n  );\n};`,
        description: "Production-grade error handling with retry, circuit breaker, and timeout patterns",
        runnable: true
      },
      {
        id: "tool-composition",
        title: "Tool Composition & Orchestration",
        language: "typescript",
        code: `// Tool composition strategies\nclass ToolOrchestrator {\n  // Sequential execution\n  async executeSequential(tools: Array<() => Promise<any>>) {\n    const results = [];\n    for (const tool of tools) {\n      const result = await tool();\n      results.push(result);\n    }\n    return results;\n  }\n  \n  // Parallel execution\n  async executeParallel(tools: Array<() => Promise<any>>) {\n    return await Promise.all(tools.map(tool => tool()));\n  }\n  \n  // Conditional execution\n  async executeConditional(\n    condition: () => Promise<boolean>,\n    trueTool: () => Promise<any>,\n    falseTool: () => Promise<any>\n  ) {\n    const shouldExecuteTrue = await condition();\n    return shouldExecuteTrue ? await trueTool() : await falseTool();\n  }\n  \n  // Fallback chain\n  async executeWithFallback(tools: Array<() => Promise<any>>) {\n    for (const tool of tools) {\n      try {\n        return await tool();\n      } catch (error) {\n        console.log(\`Tool failed, trying next: \${error}\`);\n      }\n    }\n    throw new Error('All tools failed');\n  }\n}\n\n// Real-world example: Multi-step research agent\nclass ResearchAgent {\n  async research(query: string) {\n    const orchestrator = new ToolOrchestrator();\n    \n    // Step 1: Search multiple sources in parallel\n    const searchResults = await orchestrator.executeParallel([\n      () => this.searchWeb(query),\n      () => this.searchDatabase(query),\n      () => this.searchDocuments(query)\n    ]);\n    \n    // Step 2: Analyze results sequentially\n    const analysis = await orchestrator.executeSequential([\n      () => this.extractKeyPoints(searchResults),\n      () => this.validateSources(searchResults),\n      () => this.synthesizeFindings(searchResults)\n    ]);\n    \n    // Step 3: Conditional deep dive if needed\n    return await orchestrator.executeConditional(\n      async () => this.needsMoreDetail(analysis),\n      async () => this.deepDiveResearch(query),\n      async () => analysis\n    );\n  }\n  \n  private async searchWeb(query: string) { /* implementation */ }\n  private async searchDatabase(query: string) { /* implementation */ }\n  private async searchDocuments(query: string) { /* implementation */ }\n  private async extractKeyPoints(results: any) { /* implementation */ }\n  private async validateSources(results: any) { /* implementation */ }\n  private async synthesizeFindings(results: any) { /* implementation */ }\n  private async needsMoreDetail(analysis: any) { return false; }\n  private async deepDiveResearch(query: string) { /* implementation */ }\n}`,
        description: "Advanced tool composition patterns for building complex multi-step agent workflows",
        runnable: true
      },
      {
        id: "real-integration-examples",
        title: "Real API Integrations",
        language: "typescript",
        code: `// Weather API integration\nconst getWeather = async (location: string) => {\n  const response = await fetch(\n    \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=\${process.env.WEATHER_API_KEY}\`\n  );\n  const data = await response.json();\n  return {\n    temperature: Math.round(data.main.temp - 273.15), // Kelvin to Celsius\n    condition: data.weather[0].main,\n    humidity: data.main.humidity\n  };\n};\n\n// Email integration (SendGrid)\nimport sgMail from '@sendgrid/mail';\n\nconst sendEmail = async (to: string, subject: string, body: string) => {\n  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);\n  \n  const msg = {\n    to,\n    from: 'agent@example.com',\n    subject,\n    text: body\n  };\n  \n  await sgMail.send(msg);\n  return { success: true, messageId: 'sent' };\n};\n\n// Database query (PostgreSQL)\nimport { Pool } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL\n});\n\nconst queryDatabase = async (query: string, params: any[] = []) => {\n  const client = await pool.connect();\n  try {\n    const result = await client.query(query, params);\n    return result.rows;\n  } finally {\n    client.release();\n  }\n};\n\n// Calendar integration (Google Calendar)\nimport { google } from 'googleapis';\n\nconst createCalendarEvent = async (summary: string, start: Date, end: Date) => {\n  const auth = new google.auth.GoogleAuth({\n    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,\n    scopes: ['https://www.googleapis.com/auth/calendar']\n  });\n  \n  const calendar = google.calendar({ version: 'v3', auth });\n  \n  const event = {\n    summary,\n    start: { dateTime: start.toISOString() },\n    end: { dateTime: end.toISOString() }\n  };\n  \n  const response = await calendar.events.insert({\n    calendarId: 'primary',\n    requestBody: event\n  });\n  \n  return { eventId: response.data.id, link: response.data.htmlLink };\n};\n\n// Tool registry for agent\nconst toolRegistry = {\n  get_weather: getWeather,\n  send_email: sendEmail,\n  query_database: queryDatabase,\n  create_calendar_event: createCalendarEvent\n};`,
        description: "Production-ready integrations with real external APIs (weather, email, database, calendar)",
        runnable: false
      },
      {
        id: "tool-validation",
        title: "Tool Output Validation",
        language: "typescript",
        code: `import { z } from 'zod';\n\n// Define schemas for tool outputs\nconst WeatherSchema = z.object({\n  temperature: z.number(),\n  condition: z.string(),\n  humidity: z.number().min(0).max(100)\n});\n\nconst EmailResultSchema = z.object({\n  success: z.boolean(),\n  messageId: z.string().optional(),\n  error: z.string().optional()\n});\n\n// Validated tool wrapper\nclass ValidatedTool<T> {\n  constructor(\n    private schema: z.ZodSchema<T>,\n    private executor: (...args: any[]) => Promise<any>\n  ) {}\n  \n  async execute(...args: any[]): Promise<T> {\n    const rawResult = await this.executor(...args);\n    \n    // Validate output\n    const validationResult = this.schema.safeParse(rawResult);\n    \n    if (!validationResult.success) {\n      throw new Error(\n        \`Tool output validation failed: \${validationResult.error.message}\`\n      );\n    }\n    \n    return validationResult.data;\n  }\n}\n\n// Usage\nconst weatherTool = new ValidatedTool(\n  WeatherSchema,\n  async (location: string) => {\n    // Call weather API\n    return { temperature: 22, condition: "sunny", humidity: 65 };\n  }\n);\n\n// Type-safe execution\nconst weather = await weatherTool.execute("San Francisco");\nconsole.log(weather.temperature); // TypeScript knows this is a number`,
        description: "Validate tool outputs with Zod schemas for type safety and error prevention",
        runnable: true
      }
    ]
  },
  {
    id: "agent-evaluation",
    title: "Agent Evaluation & Testing",
    description: "Comprehensive strategies for evaluating agent performance. Learn about benchmarks, metrics, and testing frameworks for production AI systems.",
    category: "evaluation",
    difficulty: "advanced",
    tags: ["testing", "metrics", "quality"],
    learning_objectives: [
      "Define evaluation metrics",
      "Build test suites",
      "Benchmark agent performance"
    ],
    content: "Evaluating AI agents requires both quantitative metrics and qualitative assessment...",
    prerequisites: ["agent-architecture", "tool-calling"],
    estimated_time: 90,
    videos: [
      {
        id: "agent-evaluation-metrics",
        title: "Agent Evaluation: Metrics & Benchmarks",
        url: "https://www.youtube.com/watch?v=7KUn77qFOWA",
        platform: "youtube",
        duration: 26,
        difficulty: "advanced",
        description: "Learn how to measure agent performance with practical metrics and testing strategies",
        timestamps: [
          { time: "0:00", label: "Why Evaluation Matters" },
          { time: "4:00", label: "Key Performance Metrics" },
          { time: "11:00", label: "Building Test Suites" },
          { time: "18:00", label: "Benchmarking Techniques" },
          { time: "22:30", label: "Real-World Examples" }
        ]
      },
      {
        id: "llm-evaluation-frameworks",
        title: "LLM Evaluation Frameworks & Tools",
        url: "https://www.youtube.com/watch?v=7eVqLJhMB9M",
        platform: "youtube",
        duration: 20,
        difficulty: "intermediate",
        description: "Overview of evaluation frameworks like LangSmith, Weights & Biases, and custom solutions",
        timestamps: [
          { time: "0:00", label: "Evaluation Framework Overview" },
          { time: "5:00", label: "LangSmith for Agent Tracing" },
          { time: "11:00", label: "Custom Evaluation Pipelines" },
          { time: "16:00", label: "A/B Testing in Production" }
        ]
      }
    ]
  },
  {
    id: "agent-security",
    title: "AI Agent Security & Safety",
    description: "Protect your AI agents from prompt injection, jailbreaks, and other security threats. Implement safety guardrails and monitoring.",
    category: "security",
    difficulty: "advanced",
    tags: ["security", "safety", "guardrails"],
    learning_objectives: [
      "Prevent prompt injection attacks",
      "Implement safety guardrails",
      "Monitor agent behavior"
    ],
    content: "Security is critical when deploying AI agents in production environments...",
    prerequisites: ["agent-architecture"],
    estimated_time: 75,
    videos: [
      {
        id: "agent-security-threats",
        title: "AI Agent Security: Prompt Injection & Jailbreaks",
        url: "https://www.youtube.com/watch?v=Sx7Z3MgPFQ0",
        platform: "youtube",
        duration: 24,
        difficulty: "advanced",
        description: "Learn about common attack vectors and how to defend against them",
        timestamps: [
          { time: "0:00", label: "Introduction to Agent Security" },
          { time: "6:00", label: "Prompt Injection Attacks" },
          { time: "13:00", label: "Jailbreak Techniques" },
          { time: "18:00", label: "Defense Strategies" },
          { time: "21:00", label: "Safety Guardrails Implementation" }
        ]
      },
      {
        id: "red-teaming-ai-systems",
        title: "Red Teaming AI Systems",
        url: "https://www.youtube.com/watch?v=0MTO_SBwL_Y",
        platform: "youtube",
        duration: 30,
        difficulty: "advanced",
        description: "Practical guide to red teaming your AI agents to find vulnerabilities before attackers do",
        timestamps: [
          { time: "0:00", label: "What is Red Teaming?" },
          { time: "7:00", label: "Attack Simulation Techniques" },
          { time: "15:00", label: "Adversarial Testing" },
          { time: "23:00", label: "Building Defensive Systems" }
        ]
      }
    ]
  },
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Collaboration",
    description: "Build systems where multiple AI agents work together. Learn communication protocols, task distribution, and conflict resolution strategies.",
    category: "architecture",
    difficulty: "advanced",
    tags: ["multi-agent", "collaboration", "distributed"],
    learning_objectives: [
      "Design multi-agent systems",
      "Implement agent communication",
      "Coordinate distributed tasks",
      "Master Model Context Protocol (MCP)",
      "Implement supervisor and worker patterns",
      "Build event-driven agent networks"
    ],
    content: `Multi-agent systems enable complex problem solving through agent collaboration, where specialized agents work together, each focusing on specific tasks or domains.

**Architecture Patterns:**
1. **Supervisor Pattern**: One agent coordinates others
2. **Sequential Workflow**: Agents work in a pipeline
3. **Parallel Workers**: Multiple agents process independently
4. **Hierarchical**: Nested supervision with sub-teams
5. **Event-Driven**: Agents react to messages/events

**Communication Protocols:**
- **Model Context Protocol (MCP)**: Standardized agent-to-agent communication
- **Message Passing**: Async message queues (RabbitMQ, Redis)
- **Shared Memory**: Common data store for state sharing
- **RPC**: Direct remote procedure calls
- **Event Bus**: Pub/sub for loose coupling

**Coordination Strategies:**
- **Task Allocation**: Assign work based on agent capabilities
- **Load Balancing**: Distribute work evenly
- **Conflict Resolution**: Handle disagreements between agents
- **Consensus**: Aggregate multiple agent outputs
- **Fallback Chains**: Retry with different agents on failure

**Real-World Applications:**
- Customer support (router → specialist agents)
- Code review (security, style, logic, testing agents)
- Research (search → analyze → synthesize pipeline)
- Content generation (outline → write → edit → fact-check)`,
    prerequisites: ["agent-architecture", "tool-calling"],
    estimated_time: 120,
    videos: [
      {
        id: "multi-agent-systems-guide",
        title: "Multi-Agent Systems: Architecture & Patterns",
        url: "https://www.youtube.com/watch?v=hvAPnpSfSGo",
        platform: "youtube",
        duration: 32,
        difficulty: "advanced",
        description: "Comprehensive guide to designing and implementing multi-agent systems with real-world examples",
        timestamps: [
          { time: "0:00", label: "Introduction to Multi-Agent Systems" },
          { time: "6:00", label: "Communication Protocols (MCP)" },
          { time: "14:30", label: "Supervisor Pattern" },
          { time: "22:00", label: "Production Architecture" }
        ]
      }
    ],
    code_examples: [
      {
        id: "supervisor-pattern",
        title: "Supervisor Pattern Implementation",
        language: "typescript",
        code: `import OpenAI from 'openai';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\n// Define specialized agents\nconst agents = {\n  router: {\n    name: "Router Agent",\n    role: "Analyze requests and route to appropriate specialist",\n    tools: ["route_to_agent"]\n  },\n  technical: {\n    name: "Technical Support Agent",\n    role: "Handle technical troubleshooting questions",\n    expertise: ["api", "integration", "debugging"]\n  },\n  billing: {\n    name: "Billing Agent",\n    role: "Handle billing and payment questions",\n    expertise: ["invoices", "payments", "subscriptions"]\n  },\n  general: {\n    name: "General Support Agent",\n    role: "Handle general inquiries and account questions",\n    expertise: ["account", "features", "general"]\n  }\n};\n\n// Supervisor that coordinates agents\nclass SupervisorAgent {\n  async handleRequest(userMessage: string): Promise<string> {\n    // Step 1: Router agent decides which specialist to use\n    const routingDecision = await this.route(userMessage);\n    \n    // Step 2: Execute with chosen specialist\n    const response = await this.executeWithAgent(\n      routingDecision.agent,\n      userMessage\n    );\n    \n    // Step 3: Optional validation/review\n    const validated = await this.validate(response);\n    \n    return validated;\n  }\n  \n  private async route(message: string): Promise<{ agent: string; reason: string }> {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: \`You are a routing agent. Analyze the user's message and decide which specialist agent should handle it.\n          \nAvailable agents:\n          - technical: API issues, integration problems, debugging\n          - billing: Invoices, payments, subscriptions\n          - general: Account questions, feature requests\n          \nRespond with JSON: { "agent": "agent_name", "reason": "why this agent" }\`\n        },\n        { role: "user", content: message }\n      ]\n    });\n    \n    return JSON.parse(response.choices[0].message.content || '{}');\n  }\n  \n  private async executeWithAgent(agentType: string, message: string): Promise<string> {\n    const agent = agents[agentType as keyof typeof agents] || agents.general;\n    \n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: \`You are \${agent.name}. \${agent.role}.\nExpertise: \${(agent as any).expertise?.join(', ') || 'general support'}\`\n        },\n        { role: "user", content: message }\n      ]\n    });\n    \n    return response.choices[0].message.content || '';\n  }\n  \n  private async validate(response: string): Promise<string> {\n    // Optional: Another agent validates the response\n    return response;\n  }\n}\n\n// Usage\nconst supervisor = new SupervisorAgent();\nconst response = await supervisor.handleRequest(\n  "My API key isn't working, getting 401 errors"\n);`,
        description: "Supervisor pattern with router agent coordinating specialized workers",
        runnable: true
      },
      {
        id: "sequential-workflow",
        title: "Sequential Multi-Agent Workflow",
        language: "typescript",
        code: `// Sequential workflow: Research → Draft → Edit → Fact-Check\nclass ContentCreationPipeline {\n  async createArticle(topic: string): Promise<string> {\n    console.log('Starting pipeline for:', topic);\n    \n    // Agent 1: Research\n    const research = await this.researchAgent(topic);\n    console.log('Research complete');\n    \n    // Agent 2: Draft (uses research)\n    const draft = await this.draftAgent(topic, research);\n    console.log('Draft complete');\n    \n    // Agent 3: Edit (improves draft)\n    const edited = await this.editAgent(draft);\n    console.log('Editing complete');\n    \n    // Agent 4: Fact-check (validates claims)\n    const factChecked = await this.factCheckAgent(edited, research);\n    console.log('Fact-checking complete');\n    \n    return factChecked;\n  }\n  \n  private async researchAgent(topic: string): Promise<string> {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: "You are a research agent. Gather key facts and sources about the topic."\n        },\n        { role: "user", content: \`Research: \${topic}\` }\n      ]\n    });\n    return response.choices[0].message.content || '';\n  }\n  \n  private async draftAgent(topic: string, research: string): Promise<string> {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: "You are a writing agent. Create an engaging article based on research."\n        },\n        {\n          role: "user",\n          content: \`Topic: \${topic}\\n\\nResearch:\\n\${research}\\n\\nWrite an article:\`\n        }\n      ]\n    });\n    return response.choices[0].message.content || '';\n  }\n  \n  private async editAgent(draft: string): Promise<string> {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: "You are an editor. Improve clarity, grammar, and flow."\n        },\n        { role: "user", content: \`Edit this draft:\\n\\n\${draft}\` }\n      ]\n    });\n    return response.choices[0].message.content || '';\n  }\n  \n  private async factCheckAgent(article: string, research: string): Promise<string> {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: "You are a fact-checker. Verify claims against research and add citations."\n        },\n        {\n          role: "user",\n          content: \`Article:\\n\${article}\\n\\nResearch:\\n\${research}\\n\\nFact-check and add citations:\`\n        }\n      ]\n    });\n    return response.choices[0].message.content || '';\n  }\n}\n\n// Usage\nconst pipeline = new ContentCreationPipeline();\nconst article = await pipeline.createArticle("The Impact of AI on Healthcare");`,
        description: "Sequential workflow where each agent builds on the previous agent's output",
        runnable: true
      },
      {
        id: "parallel-agents",
        title: "Parallel Agent Execution",
        language: "typescript",
        code: `// Parallel execution: Multiple agents analyze the same input\nclass CodeReviewSystem {\n  async reviewCode(code: string): Promise<{ summary: string; issues: any[] }> {\n    // Run all review agents in parallel\n    const [security, style, logic, testing] = await Promise.all([\n      this.securityAgent(code),\n      this.styleAgent(code),\n      this.logicAgent(code),\n      this.testingAgent(code)\n    ]);\n    \n    // Aggregate results\n    const allIssues = [\n      ...security.issues,\n      ...style.issues,\n      ...logic.issues,\n      ...testing.issues\n    ];\n    \n    // Generate summary\n    const summary = await this.summarizeReview({\n      security,\n      style,\n      logic,\n      testing\n    });\n    \n    return { summary, issues: allIssues };\n  }\n  \n  private async securityAgent(code: string) {\n    const response = await openai.chat.completions.create({\n      model: "gpt-4-turbo-preview",\n      messages: [\n        {\n          role: "system",\n          content: "You are a security reviewer. Find SQL injection, XSS, auth issues."\n        },\n        { role: "user", content: code }\n      ]\n    });\n    \n    return {\n      agent: "security",\n      issues: this.parseIssues(response.choices[0].message.content || '')\n    };\n  }\n  \n  private async styleAgent(code: string) {\n    // Check code style, formatting, naming conventions\n    return { agent: "style", issues: [] };\n  }\n  \n  private async logicAgent(code: string) {\n    // Check for logic errors, edge cases, performance\n    return { agent: "logic", issues: [] };\n  }\n  \n  private async testingAgent(code: string) {\n    // Evaluate test coverage, suggest tests\n    return { agent: "testing", issues: [] };\n  }\n  \n  private parseIssues(text: string) {\n    // Parse agent output into structured issues\n    return [];\n  }\n  \n  private async summarizeReview(results: any): Promise<string> {\n    // Aggregate all agent findings into summary\n    return "Code review complete";\n  }\n}`,
        description: "Parallel execution where multiple specialized agents analyze simultaneously",
        runnable: true
      },
      {
        id: "mcp-communication",
        title: "Model Context Protocol (MCP) Communication",
        language: "typescript",
        code: `// Simplified MCP-style communication between agents\ninterface MCPMessage {\n  id: string;\n  from: string;\n  to: string;\n  type: 'request' | 'response' | 'event';\n  payload: any;\n  timestamp: number;\n}\n\nclass MCPAgent {\n  private messageQueue: MCPMessage[] = [];\n  private handlers = new Map<string, (msg: MCPMessage) => Promise<any>>();\n  \n  constructor(public agentId: string) {}\n  \n  // Register message handler\n  on(messageType: string, handler: (msg: MCPMessage) => Promise<any>) {\n    this.handlers.set(messageType, handler);\n  }\n  \n  // Send message to another agent\n  async send(to: string, type: string, payload: any): Promise<string> {\n    const message: MCPMessage = {\n      id: \`\${Date.now()}-\${Math.random()}\`,\n      from: this.agentId,\n      to,\n      type: 'request',\n      payload: { type, ...payload },\n      timestamp: Date.now()\n    };\n    \n    // In production, send via message broker\n    this.messageQueue.push(message);\n    \n    return message.id;\n  }\n  \n  // Process incoming message\n  async handleMessage(message: MCPMessage) {\n    const handler = this.handlers.get(message.payload.type);\n    \n    if (handler) {\n      const result = await handler(message);\n      \n      // Send response\n      await this.send(message.from, 'response', {\n        requestId: message.id,\n        result\n      });\n    }\n  }\n}\n\n// Example: Multi-agent research system\nconst searchAgent = new MCPAgent('searcher');\nconst analyzerAgent = new MCPAgent('analyzer');\nconst summarizerAgent = new MCPAgent('summarizer');\n\n// Set up message handlers\nsearchAgent.on('search_request', async (msg) => {\n  const { query } = msg.payload;\n  // Perform search\n  return { results: ['result1', 'result2'] };\n});\n\nanalyzerAgent.on('analyze_request', async (msg) => {\n  const { results } = msg.payload;\n  // Analyze search results\n  return { insights: ['insight1', 'insight2'] };\n});\n\nsummarizerAgent.on('summarize_request', async (msg) => {\n  const { insights } = msg.payload;\n  // Create summary\n  return { summary: 'Final summary...' };\n});\n\n// Workflow: search → analyze → summarize\nconst query = "AI in healthcare";\n\n// 1. Request search\nawait searchAgent.send('searcher', 'search_request', { query });\n\n// 2. When search completes, request analysis\n// 3. When analysis completes, request summary`,
        description: "MCP-style communication protocol for standardized agent-to-agent messaging",
        runnable: true
      }
    ]
  },
  {
    id: "react-pattern",
    title: "ReAct: Reasoning + Acting",
    description: "Master the ReAct pattern that combines reasoning traces with action execution. Learn to build agents that think step-by-step while taking actions.",
    category: "patterns",
    difficulty: "intermediate",
    tags: ["react", "reasoning", "patterns"],
    learning_objectives: [
      "Understand ReAct framework",
      "Implement reasoning loops",
      "Combine thought and action"
    ],
    content: "ReAct interleaves reasoning and acting, enabling agents to be more transparent and debuggable...",
    prerequisites: ["prompt-engineering"],
    estimated_time: 45,
    videos: [
      {
        id: "react-pattern-explained",
        title: "ReAct Pattern: Reasoning & Acting in AI Agents",
        url: "https://www.youtube.com/watch?v=Eug2clsLtFs",
        platform: "youtube",
        duration: 22,
        difficulty: "intermediate",
        description: "Deep dive into the ReAct pattern with practical implementations",
        timestamps: [
          { time: "0:00", label: "Introduction to ReAct" },
          { time: "5:00", label: "Reasoning Traces" },
          { time: "11:00", label: "Action Execution" },
          { time: "16:00", label: "Building a ReAct Agent" },
          { time: "19:30", label: "Best Practices" }
        ]
      }
    ]
  },
  {
    id: "memory-management",
    title: "Agent Memory Systems",
    description: "Implement short-term and long-term memory for your AI agents. Learn storage strategies, retrieval techniques, and context management.",
    category: "architecture",
    difficulty: "intermediate",
    tags: ["memory", "storage", "context"],
    learning_objectives: [
      "Design memory architectures",
      "Implement context windows",
      "Optimize retrieval systems",
      "Build vector memory for semantic recall",
      "Implement conversation summarization",
      "Master memory optimization techniques"
    ],
    content: `Effective memory management allows agents to maintain context across interactions, recall relevant information, and build long-term understanding. Modern agents use multiple memory types working together.

**Memory Types:**
1. **Working Memory (Short-term)**: Current conversation context within LLM window
2. **Episodic Memory**: Conversation history and interaction logs
3. **Semantic Memory**: Facts, knowledge, and learned information
4. **Vector Memory**: Embeddings for similarity-based retrieval
5. **Procedural Memory**: Learned skills and action sequences

**Storage Strategies:**
- **Sliding Window**: Keep last N messages in context
- **Summarization**: Compress old conversations into summaries
- **Vector DB**: Store embeddings for semantic search (Pinecone, Weaviate, Qdrant)
- **Hybrid**: Combine recency, relevance, and importance

**Retrieval Techniques:**
- **Recency**: Most recent interactions
- **Similarity**: Vector search for semantically related content
- **Importance**: Weight by user preference or explicit tagging
- **Hybrid Fusion**: Combine multiple retrieval strategies

**Optimization Patterns:**
1. **Conversation Pruning**: Remove redundant turns
2. **Hierarchical Summarization**: Multi-level compression
3. **Selective Persistence**: Store only valuable interactions
4. **Lazy Loading**: Retrieve memory on-demand
5. **Memory Indexing**: Fast lookup with metadata`,
    prerequisites: ["agent-architecture"],
    estimated_time: 60,
    videos: [
      {
        id: "building-agent-memory",
        title: "Building Agent Memory Systems",
        url: "https://www.youtube.com/watch?v=oUpEW7fast8",
        platform: "youtube",
        duration: 18,
        difficulty: "intermediate",
        description: "Practical guide to implementing memory systems for conversational AI agents",
        timestamps: [
          { time: "0:00", label: "Memory Architecture Overview" },
          { time: "4:30", label: "Vector Memory Implementation" },
          { time: "10:15", label: "Conversation Management" },
          { time: "14:00", label: "Production Patterns" }
        ]
      }
    ],
    code_examples: [
      {
        id: "complete-memory-system",
        title: "Complete Memory System Implementation",
        language: "typescript",
        code: `import OpenAI from 'openai';\nimport { createClient } from '@supabase/supabase-js';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\nconst supabase = createClient(\n  process.env.SUPABASE_URL!,\n  process.env.SUPABASE_KEY!\n);\n\ninterface Message {\n  role: 'user' | 'assistant' | 'system';\n  content: string;\n  timestamp: number;\n  embedding?: number[];\n}\n\nclass AgentMemory {\n  private workingMemory: Message[] = [];\n  private maxWorkingMemory = 10; // Last 10 messages\n  \n  // Add message to working memory\n  async addMessage(role: Message['role'], content: string) {\n    const message: Message = {\n      role,\n      content,\n      timestamp: Date.now()\n    };\n    \n    this.workingMemory.push(message);\n    \n    // Prune if exceeds limit\n    if (this.workingMemory.length > this.maxWorkingMemory) {\n      const removed = this.workingMemory.shift()!;\n      await this.persistToLongTerm(removed);\n    }\n    \n    return message;\n  }\n  \n  // Store in vector database with embeddings\n  private async persistToLongTerm(message: Message) {\n    // Generate embedding\n    const embedding = await this.generateEmbedding(message.content);\n    \n    await supabase.from('agent_memory').insert({\n      role: message.role,\n      content: message.content,\n      timestamp: message.timestamp,\n      embedding\n    });\n  }\n  \n  // Generate embedding for semantic search\n  private async generateEmbedding(text: string): Promise<number[]> {\n    const response = await openai.embeddings.create({\n      model: 'text-embedding-3-small',\n      input: text\n    });\n    return response.data[0].embedding;\n  }\n  \n  // Retrieve relevant memories using vector similarity\n  async retrieveRelevantMemories(query: string, limit = 5): Promise<Message[]> {\n    const queryEmbedding = await this.generateEmbedding(query);\n    \n    const { data, error } = await supabase.rpc('match_memories', {\n      query_embedding: queryEmbedding,\n      match_threshold: 0.7,\n      match_count: limit\n    });\n    \n    if (error) throw error;\n    return data || [];\n  }\n  \n  // Get conversation summary\n  async getSummary(): Promise<string> {\n    if (this.workingMemory.length === 0) return '';\n    \n    const conversation = this.workingMemory\n      .map(m => \`\${m.role}: \${m.content}\`)\n      .join('\\n');\n    \n    const response = await openai.chat.completions.create({\n      model: 'gpt-3.5-turbo',\n      messages: [\n        {\n          role: 'system',\n          content: 'Summarize the following conversation in 2-3 sentences.'\n        },\n        { role: 'user', content: conversation }\n      ]\n    });\n    \n    return response.choices[0].message.content || '';\n  }\n  \n  // Get messages for current context\n  getWorkingMemory(): Message[] {\n    return this.workingMemory;\n  }\n  \n  // Hybrid retrieval: combine recency + relevance\n  async getContextForQuery(query: string): Promise<Message[]> {\n    // Get recent messages (recency)\n    const recent = this.workingMemory.slice(-5);\n    \n    // Get relevant messages (similarity)\n    const relevant = await this.retrieveRelevantMemories(query, 3);\n    \n    // Deduplicate and combine\n    const combined = [...recent];\n    for (const msg of relevant) {\n      if (!combined.some(m => m.content === msg.content)) {\n        combined.push(msg);\n      }\n    }\n    \n    return combined;\n  }\n}\n\n// Usage\nconst memory = new AgentMemory();\n\nawait memory.addMessage('user', 'What is machine learning?');\nawait memory.addMessage('assistant', 'Machine learning is...');\n\n// Later, retrieve relevant context\nconst context = await memory.getContextForQuery('Tell me more about ML');\nconsole.log('Relevant context:', context);`,
        description: "Production-ready memory system with working memory, vector storage, and hybrid retrieval",
        runnable: true
      },
      {
        id: "conversation-summarization",
        title: "Conversation Summarization Strategies",
        language: "typescript",
        code: `// Sliding window summarization\nclass ConversationManager {\n  private messages: Array<{ role: string; content: string }> = [];\n  private summary = '';\n  private windowSize = 8; // Keep last 8 messages in full\n  \n  async addMessage(role: string, content: string) {\n    this.messages.push({ role, content });\n    \n    // Summarize old messages when window exceeds limit\n    if (this.messages.length > this.windowSize) {\n      await this.summarizeOldMessages();\n    }\n  }\n  \n  private async summarizeOldMessages() {\n    // Take messages beyond the window\n    const toSummarize = this.messages.slice(0, -this.windowSize);\n    \n    if (toSummarize.length === 0) return;\n    \n    // Create summary of old messages\n    const newSummary = await this.createSummary(toSummarize);\n    \n    // Update summary (combine with existing)\n    if (this.summary) {\n      this.summary = await this.combineSummaries(this.summary, newSummary);\n    } else {\n      this.summary = newSummary;\n    }\n    \n    // Keep only recent messages\n    this.messages = this.messages.slice(-this.windowSize);\n  }\n  \n  private async createSummary(messages: Array<{ role: string; content: string }>) {\n    const conversation = messages.map(m => \`\${m.role}: \${m.content}\`).join('\\n');\n    \n    const response = await fetch('/api/summarize', {\n      method: 'POST',\n      body: JSON.stringify({ conversation })\n    });\n    \n    const { summary } = await response.json();\n    return summary;\n  }\n  \n  private async combineSummaries(oldSummary: string, newSummary: string) {\n    const response = await fetch('/api/summarize', {\n      method: 'POST',\n      body: JSON.stringify({\n        conversation: \`Previous summary: \${oldSummary}\\n\\nNew events: \${newSummary}\`\n      })\n    });\n    \n    const { summary } = await response.json();\n    return summary;\n  }\n  \n  // Get full context for LLM\n  getContext(): Array<{ role: string; content: string }> {\n    const context = [];\n    \n    // Add summary as system message if exists\n    if (this.summary) {\n      context.push({\n        role: 'system',\n        content: \`Previous conversation summary: \${this.summary}\`\n      });\n    }\n    \n    // Add recent messages\n    context.push(...this.messages);\n    \n    return context;\n  }\n}\n\n// Hierarchical summarization\nclass HierarchicalMemory {\n  private dailySummaries: Map<string, string> = new Map();\n  private weeklySummaries: Map<string, string> = new Map();\n  \n  async addDailySummary(date: string, summary: string) {\n    this.dailySummaries.set(date, summary);\n    \n    // Check if week is complete\n    if (this.dailySummaries.size >= 7) {\n      await this.createWeeklySummary();\n    }\n  }\n  \n  private async createWeeklySummary() {\n    const dailies = Array.from(this.dailySummaries.values()).join('\\n\\n');\n    \n    // Create week summary from daily summaries\n    const weekSummary = await this.summarize(dailies, 'weekly');\n    \n    const weekKey = new Date().toISOString().split('T')[0];\n    this.weeklySummaries.set(weekKey, weekSummary);\n    \n    // Clear daily summaries\n    this.dailySummaries.clear();\n  }\n  \n  private async summarize(text: string, level: 'daily' | 'weekly') {\n    // Call summarization API\n    return \`Summary (\${level}): ...\`;\n  }\n}`,
        description: "Advanced conversation management with sliding window and hierarchical summarization",
        runnable: true
      },
      {
        id: "memory-optimization",
        title: "Memory Optimization Techniques",
        language: "typescript",
        code: `// Token-aware conversation pruning\nclass TokenOptimizedMemory {\n  private messages: Array<{ role: string; content: string; tokens: number }> = [];\n  private maxTokens = 4000; // Leave room for response\n  \n  async addMessage(role: string, content: string) {\n    const tokens = this.estimateTokens(content);\n    this.messages.push({ role, content, tokens });\n    \n    await this.pruneToFit();\n  }\n  \n  private estimateTokens(text: string): number {\n    // Rough estimate: 1 token ≈ 4 characters\n    return Math.ceil(text.length / 4);\n  }\n  \n  private async pruneToFit() {\n    let totalTokens = this.messages.reduce((sum, m) => sum + m.tokens, 0);\n    \n    // Remove oldest messages until we fit\n    while (totalTokens > this.maxTokens && this.messages.length > 2) {\n      const removed = this.messages.shift()!;\n      totalTokens -= removed.tokens;\n    }\n  }\n  \n  getMessages() {\n    return this.messages.map(({ role, content }) => ({ role, content }));\n  }\n}\n\n// Importance-based memory retention\ninterface ImportantMessage {\n  role: string;\n  content: string;\n  importance: number; // 0-1 score\n  timestamp: number;\n}\n\nclass ImportanceBasedMemory {\n  private messages: ImportantMessage[] = [];\n  \n  async addMessage(role: string, content: string) {\n    const importance = await this.scoreImportance(content);\n    \n    this.messages.push({\n      role,\n      content,\n      importance,\n      timestamp: Date.now()\n    });\n    \n    // Keep top N most important messages\n    if (this.messages.length > 20) {\n      this.messages.sort((a, b) => b.importance - a.importance);\n      this.messages = this.messages.slice(0, 15);\n      // Re-sort by timestamp for context\n      this.messages.sort((a, b) => a.timestamp - b.timestamp);\n    }\n  }\n  \n  private async scoreImportance(content: string): Promise<number> {\n    // Use LLM to score importance\n    const prompt = \`Rate the importance of this message on a scale of 0-1: "\${content}"\`;\n    // ... call LLM\n    return 0.7; // Placeholder\n  }\n}\n\n// Lazy loading memory\nclass LazyMemoryStore {\n  private cache = new Map<string, any>();\n  \n  async getMemory(key: string): Promise<any> {\n    // Check cache first\n    if (this.cache.has(key)) {\n      return this.cache.get(key);\n    }\n    \n    // Load from storage\n    const data = await this.loadFromStorage(key);\n    \n    // Cache for future use\n    this.cache.set(key, data);\n    \n    // Limit cache size\n    if (this.cache.size > 100) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    \n    return data;\n  }\n  \n  private async loadFromStorage(key: string): Promise<any> {\n    // Load from database/file system\n    return {};\n  }\n}`,
        description: "Memory optimization techniques including token management, importance scoring, and lazy loading",
        runnable: true
      }
    ]
  },
  {
    id: "fine-tuning",
    title: "Fine-Tuning Fundamentals",
    description: "Stop overtraining—choose the lowest intervention (SFT → DPO → RFT) that proves incremental lift. Learn supervised fine-tuning, preference optimization, and reinforcement techniques.",
    category: "advanced",
    difficulty: "advanced",
    tags: ["fine-tuning", "sft", "dpo", "rft", "training"],
    learning_objectives: [
      "Understand SFT, DPO, and RFT differences",
      "Choose appropriate fine-tuning method",
      "Measure incremental performance lift",
      "Avoid overtraining and overfitting",
      "Prepare high-quality training datasets",
      "Implement evaluation pipelines"
    ],
    content: `Fine-tuning adapts pre-trained models to specific tasks or behaviors. Choose the minimal intervention that achieves your performance goals—unnecessary training wastes resources and risks degrading general capabilities.

**Fine-Tuning Methods (Ordered by Complexity):**

1. **SFT (Supervised Fine-Tuning)**
   - Use Case: Teach specific task formats, domain knowledge, or output styles
   - Data: Pairs of inputs and desired outputs
   - When to Use: Need consistent formatting, domain adaptation, or task specialization
   - Example: Customer support responses, code generation, JSON output formatting

2. **DPO (Direct Preference Optimization)**
   - Use Case: Align model to human preferences without reward modeling
   - Data: Pairs of responses (preferred vs. rejected)
   - When to Use: Improve response quality, reduce harmful outputs, align to brand voice
   - Example: Making responses more concise, formal, or empathetic

3. **RFT/RLHF (Reinforcement Fine-Tuning with Human Feedback)**
   - Use Case: Complex alignment with reward signals
   - Data: Reward model trained on human rankings
   - When to Use: Complex multi-objective optimization
   - Example: Optimizing for helpfulness + harmlessness + honesty simultaneously

**Decision Framework:**
- Try Prompt Engineering first (zero cost, immediate)
- If prompt engineering plateaus → Try SFT (moderate cost, ~1-2 weeks)
- If SFT insufficient → Consider DPO (higher cost, ~2-4 weeks)
- Only use RLHF for critical alignment needs (highest cost, ~1-3 months)

**Dataset Preparation:**
1. Collect 50-100 examples for SFT pilot (500-1000+ for production)
2. Ensure diversity across edge cases
3. Validate data quality (human review)
4. Split: 80% train / 10% validation / 10% test
5. Format according to model requirements (OpenAI JSONL, HuggingFace dataset)

**Evaluation Strategy:**
- Measure on held-out test set
- Compare against baseline (prompting, previous model)
- Track multiple metrics (accuracy, latency, cost, safety)
- A/B test in production with small traffic percentage
- Monitor for regression on general capabilities

**Cost-Benefit Analysis:**
| Method | Training Time | Data Needed | Cost | Risk of Degradation |
|--------|--------------|-------------|------|---------------------|
| Prompting | Immediate | 0-5 examples | $0 | None |
| SFT | 1-6 hours | 100-10k | $10-500 | Low |
| DPO | 2-12 hours | 1k-50k pairs | $50-2000 | Medium |
| RLHF | Days-Weeks | 10k-100k | $1000-50k+ | High |`,
    prerequisites: ["prompt-engineering", "agent-evaluation"],
    estimated_time: 90,
    videos: [
      {
        id: "fine-tuning-vs-prompting",
        title: "Fine-Tuning vs Prompt Engineering: When to Use Each",
        url: "https://www.youtube.com/watch?v=eC6Hd1hFvos",
        platform: "youtube",
        duration: 25,
        difficulty: "advanced",
        description: "Comprehensive comparison of fine-tuning methods with decision frameworks and practical examples",
        timestamps: [
          { time: "0:00", label: "Introduction: The Fine-Tuning Spectrum" },
          { time: "5:00", label: "SFT Walkthrough & Use Cases" },
          { time: "12:30", label: "DPO Explained with Examples" },
          { time: "18:00", label: "When to Use RLHF" },
          { time: "22:00", label: "Cost-Benefit Decision Tree" }
        ]
      }
    ],
    code_examples: [
      {
        id: "sft-dataset-prep",
        title: "SFT Dataset Preparation",
        language: "typescript",
        code: `// Prepare dataset for OpenAI fine-tuning (JSONL format)\nimport { writeFile } from 'fs/promises';\n\ninterface TrainingExample {\n  messages: Array<{\n    role: 'system' | 'user' | 'assistant';\n    content: string;\n  }>;\n}\n\n// Example: Fine-tune for customer support responses\nconst trainingExamples: TrainingExample[] = [\n  {\n    messages: [\n      {\n        role: 'system',\n        content: 'You are a helpful customer support agent for TechCorp. Be concise, friendly, and always offer next steps.'\n      },\n      {\n        role: 'user',\n        content: 'My order hasn\\'t arrived yet, it\\'s been 5 days.'\n      },\n      {\n        role: 'assistant',\n        content: 'I apologize for the delay! Let me check your order status.\\n\\nCould you provide your order number? I\\'ll track it immediately and provide an update within 2 hours.\\n\\nIn the meantime, I\\'ve noted your concern and will ensure we resolve this today.'\n      }\n    ]\n  },\n  {\n    messages: [\n      {\n        role: 'system',\n        content: 'You are a helpful customer support agent for TechCorp. Be concise, friendly, and always offer next steps.'\n      },\n      {\n        role: 'user',\n        content: 'How do I reset my password?'\n      },\n      {\n        role: 'assistant',\n        content: 'Here\\'s how to reset your password:\\n\\n1. Go to techcorp.com/login\\n2. Click "Forgot Password"\\n3. Enter your email\\n4. Check your inbox for a reset link (arrives in 2-5 minutes)\\n\\nIf you don\\'t receive the email, check your spam folder or let me know and I\\'ll send a manual reset link.'\n      }\n    ]\n  }\n  // ... add 50-1000+ more examples\n];\n\n// Convert to JSONL format (one JSON object per line)\nconst prepareDataset = async (examples: TrainingExample[], outputPath: string) => {\n  const jsonl = examples\n    .map(example => JSON.stringify(example))\n    .join('\\n');\n  \n  await writeFile(outputPath, jsonl);\n  console.log(\`Dataset saved to \${outputPath}\`);\n  console.log(\`Total examples: \${examples.length}\`);\n};\n\n// Split into train/validation\nconst splitDataset = (examples: TrainingExample[], trainRatio = 0.9) => {\n  const shuffled = [...examples].sort(() => Math.random() - 0.5);\n  const splitIndex = Math.floor(shuffled.length * trainRatio);\n  \n  return {\n    train: shuffled.slice(0, splitIndex),\n    validation: shuffled.slice(splitIndex)\n  };\n};\n\n// Usage\nconst { train, validation } = splitDataset(trainingExamples);\nawait prepareDataset(train, 'train.jsonl');\nawait prepareDataset(validation, 'validation.jsonl');`,
        description: "Prepare and format training data for supervised fine-tuning with OpenAI",
        runnable: true
      },
      {
        id: "openai-fine-tune",
        title: "OpenAI Fine-Tuning Pipeline",
        language: "typescript",
        code: `import OpenAI from 'openai';\nimport { createReadStream } from 'fs';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nclass FineTuningPipeline {\n  async uploadDataset(filePath: string) {\n    console.log('Uploading dataset...');\n    \n    const file = await openai.files.create({\n      file: createReadStream(filePath),\n      purpose: 'fine-tune'\n    });\n    \n    console.log('File uploaded:', file.id);\n    return file.id;\n  }\n  \n  async createFineTuneJob(trainingFileId: string, validationFileId?: string) {\n    console.log('Starting fine-tune job...');\n    \n    const fineTune = await openai.fineTuning.jobs.create({\n      training_file: trainingFileId,\n      validation_file: validationFileId,\n      model: 'gpt-3.5-turbo',\n      hyperparameters: {\n        n_epochs: 3,  // Usually 1-4 epochs\n      }\n    });\n    \n    console.log('Fine-tune job created:', fineTune.id);\n    return fineTune.id;\n  }\n  \n  async monitorJob(jobId: string) {\n    console.log('Monitoring fine-tune job:', jobId);\n    \n    while (true) {\n      const job = await openai.fineTuning.jobs.retrieve(jobId);\n      \n      console.log(\`Status: \${job.status}\`);\n      \n      if (job.status === 'succeeded') {\n        console.log('Fine-tune completed!');\n        console.log('Fine-tuned model:', job.fine_tuned_model);\n        return job.fine_tuned_model;\n      }\n      \n      if (job.status === 'failed') {\n        console.error('Fine-tune failed:', job.error);\n        throw new Error('Fine-tuning failed');\n      }\n      \n      // Wait 60 seconds before checking again\n      await new Promise(resolve => setTimeout(resolve, 60000));\n    }\n  }\n  \n  async testFineTunedModel(modelId: string, testPrompt: string) {\n    const response = await openai.chat.completions.create({\n      model: modelId,\n      messages: [{ role: 'user', content: testPrompt }]\n    });\n    \n    return response.choices[0].message.content;\n  }\n  \n  async runFullPipeline() {\n    // 1. Upload training data\n    const trainingFileId = await this.uploadDataset('train.jsonl');\n    const validationFileId = await this.uploadDataset('validation.jsonl');\n    \n    // 2. Start fine-tune job\n    const jobId = await this.createFineTuneJob(trainingFileId, validationFileId);\n    \n    // 3. Monitor until completion\n    const modelId = await this.monitorJob(jobId);\n    \n    // 4. Test the fine-tuned model\n    const testResult = await this.testFineTunedModel(\n      modelId!,\n      'My order hasn\\'t arrived'\n    );\n    \n    console.log('Test result:', testResult);\n    \n    return modelId;\n  }\n}\n\n// Usage\nconst pipeline = new FineTuningPipeline();\nconst fineTunedModel = await pipeline.runFullPipeline();`,
        description: "Complete fine-tuning pipeline with OpenAI: upload, train, monitor, and test",
        runnable: false
      },
      {
        id: "evaluation-comparison",
        title: "Fine-Tuning Evaluation & Comparison",
        language: "typescript",
        code: `import OpenAI from 'openai';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\ninterface EvalResult {\n  modelId: string;\n  accuracy: number;\n  avgLatency: number;\n  avgCost: number;\n  examples: Array<{\n    input: string;\n    expected: string;\n    actual: string;\n    correct: boolean;\n  }>;\n}\n\nclass ModelEvaluator {\n  async evaluateModel(\n    modelId: string,\n    testCases: Array<{ input: string; expected: string }>\n  ): Promise<EvalResult> {\n    const results = [];\n    let totalLatency = 0;\n    let totalCost = 0;\n    let correct = 0;\n    \n    for (const testCase of testCases) {\n      const startTime = Date.now();\n      \n      const response = await openai.chat.completions.create({\n        model: modelId,\n        messages: [{ role: 'user', content: testCase.input }]\n      });\n      \n      const latency = Date.now() - startTime;\n      const actual = response.choices[0].message.content || '';\n      \n      // Simple similarity check (in production, use more sophisticated metrics)\n      const isCorrect = this.checkSimilarity(actual, testCase.expected);\n      \n      if (isCorrect) correct++;\n      \n      results.push({\n        input: testCase.input,\n        expected: testCase.expected,\n        actual,\n        correct: isCorrect\n      });\n      \n      totalLatency += latency;\n      totalCost += this.estimateCost(response.usage!);\n    }\n    \n    return {\n      modelId,\n      accuracy: correct / testCases.length,\n      avgLatency: totalLatency / testCases.length,\n      avgCost: totalCost / testCases.length,\n      examples: results\n    };\n  }\n  \n  private checkSimilarity(actual: string, expected: string): boolean {\n    // Simplified - use semantic similarity in production\n    const actualLower = actual.toLowerCase();\n    const expectedLower = expected.toLowerCase();\n    \n    // Check if key phrases are present\n    return expectedLower.split(' ').some(word => \n      actualLower.includes(word)\n    );\n  }\n  \n  private estimateCost(usage: { prompt_tokens: number; completion_tokens: number }): number {\n    // GPT-3.5-turbo pricing (approximate)\n    const promptCost = (usage.prompt_tokens / 1000) * 0.0015;\n    const completionCost = (usage.completion_tokens / 1000) * 0.002;\n    return promptCost + completionCost;\n  }\n  \n  async compareModels(\n    baselineModelId: string,\n    fineTunedModelId: string,\n    testCases: Array<{ input: string; expected: string }>\n  ) {\n    console.log('Evaluating baseline model...');\n    const baselineResults = await this.evaluateModel(baselineModelId, testCases);\n    \n    console.log('Evaluating fine-tuned model...');\n    const fineTunedResults = await this.evaluateModel(fineTunedModelId, testCases);\n    \n    // Compare results\n    console.log('\\n=== Comparison ===');\n    console.log(\`Baseline Accuracy: \${(baselineResults.accuracy * 100).toFixed(1)}%\`);\n    console.log(\`Fine-tuned Accuracy: \${(fineTunedResults.accuracy * 100).toFixed(1)}%\`);\n    console.log(\`Improvement: +\${((fineTunedResults.accuracy - baselineResults.accuracy) * 100).toFixed(1)}%\`);\n    \n    console.log(\`\\nBaseline Avg Latency: \${baselineResults.avgLatency}ms\`);\n    console.log(\`Fine-tuned Avg Latency: \${fineTunedResults.avgLatency}ms\`);\n    \n    console.log(\`\\nBaseline Avg Cost: $\${baselineResults.avgCost.toFixed(4)}\`);\n    console.log(\`Fine-tuned Avg Cost: $\${fineTunedResults.avgCost.toFixed(4)}\`);\n    \n    return { baseline: baselineResults, fineTuned: fineTunedResults };\n  }\n}\n\n// Usage\nconst evaluator = new ModelEvaluator();\n\nconst testCases = [\n  { input: 'Order delayed 5 days', expected: 'apologize, track, resolve today' },\n  { input: 'Reset password help', expected: 'steps, forgot password link' }\n  // ... more test cases\n];\n\nconst comparison = await evaluator.compareModels(\n  'gpt-3.5-turbo',\n  'ft:gpt-3.5-turbo-0613:company:model-id',\n  testCases\n);`,
        description: "Comprehensive evaluation framework to compare baseline vs fine-tuned models",
        runnable: false
      }
    ]
  }
];

export const MOCK_RELATED_CONCEPTS: Record<string, string[]> = {
  // Foundation concepts
  "llm-fundamentals": ["getting-started-agents", "prompt-engineering", "agent-architecture"],
  "getting-started-agents": ["llm-fundamentals", "prompt-engineering", "tool-calling"],
  "rag-fundamentals": ["llm-fundamentals", "getting-started-agents", "tool-calling"],
  "agent-orchestration": ["agent-architecture", "tool-calling", "multi-agent-systems"],
  
  // Existing concepts
  "agent-architecture": ["react-pattern", "tool-calling", "memory-management"],
  "prompt-engineering": ["react-pattern", "tool-calling"],
  "tool-calling": ["agent-architecture", "react-pattern", "agent-evaluation"],
  "agent-evaluation": ["agent-security", "tool-calling", "fine-tuning"],
  "agent-security": ["agent-evaluation", "multi-agent-systems"],
  "multi-agent-systems": ["agent-architecture", "memory-management", "tool-calling"],
  "react-pattern": ["prompt-engineering", "agent-architecture"],
  "memory-management": ["agent-architecture", "multi-agent-systems"],
  "fine-tuning": ["prompt-engineering", "agent-evaluation", "agent-architecture"]
};

// Helper to get concepts by category
export const getConceptsByCategory = (category: string): MockConcept[] => {
  if (category === '' || category === 'all') {
    return MOCK_CONCEPTS;
  }
  return MOCK_CONCEPTS.filter(c => c.category === category);
};

// Helper to search concepts with improved matching
export const searchConcepts = (query: string): Array<{ concept: MockConcept; similarity: number }> => {
  if (!query || query.length < 3) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  const results = MOCK_CONCEPTS
    .map(concept => {
      let score = 0;
      
      // Title matching (highest weight)
      const lowerTitle = concept.title.toLowerCase();
      if (lowerTitle === lowerQuery) score += 1.0; // Exact match
      else if (lowerTitle.includes(lowerQuery)) score += 0.9; // Partial match
      else if (queryWords.some(word => lowerTitle.includes(word))) score += 0.7; // Word match
      
      // Description matching
      const lowerDesc = concept.description.toLowerCase();
      if (lowerDesc.includes(lowerQuery)) score += 0.6;
      else if (queryWords.some(word => lowerDesc.includes(word))) score += 0.4;
      
      // Tag matching (exact or partial)
      const tagExactMatch = concept.tags.some(tag => tag.toLowerCase() === lowerQuery);
      const tagPartialMatch = concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      if (tagExactMatch) score += 0.8;
      else if (tagPartialMatch) score += 0.5;
      
      // Learning objectives matching
      const objectiveMatch = concept.learning_objectives.some(obj => 
        obj.toLowerCase().includes(lowerQuery) || 
        queryWords.some(word => obj.toLowerCase().includes(word))
      );
      if (objectiveMatch) score += 0.5;
      
      // Category matching
      if (concept.category.toLowerCase().includes(lowerQuery)) score += 0.6;
      
      // Content matching (lowest weight)
      const lowerContent = concept.content.toLowerCase();
      if (lowerContent.includes(lowerQuery)) score += 0.3;
      else if (queryWords.some(word => lowerContent.includes(word))) score += 0.2;
      
      // Normalize similarity to 0-1 range (cap at 1.0)
      const similarity = Math.min(score, 1.0);
      
      return { concept, similarity };
    })
    .filter(r => r.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity);
  
  return results;
};

// Helper to get concept by ID
export const getConceptById = (id: string): MockConcept | undefined => {
  return MOCK_CONCEPTS.find(c => c.id === id);
};

// Helper to get related concepts
export const getRelatedConcepts = (conceptId: string, limit = 5): MockConcept[] => {
  const relatedIds = MOCK_RELATED_CONCEPTS[conceptId] || [];
  return relatedIds
    .map(id => MOCK_CONCEPTS.find(c => c.id === id))
    .filter((c): c is MockConcept => c !== undefined)
    .slice(0, limit);
};
