// Educational content for Azure AI Agent concepts
export interface ConceptContent {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  applicationAreas: string[];
  technicalDetails: string;
  implementationConsiderations: string[];
  examples: {
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
}

export const conceptContents: ConceptContent[] = [
  {
    id: 'agents',
    name: 'Azure AI Agents',
    description: `
      Azure AI Agents are autonomous software entities that leverage Large Language Models (LLMs) to perform complex tasks
      through reasoning, planning, and tool interaction. They go beyond simple prompt-response patterns by maintaining state,
      planning multi-step actions, and adapting to new information.
      
      Agents operate with varying degrees of autonomy, from simple reactive behaviors to sophisticated planning and self-improvement.
      They can be integrated into applications using the Azure AI SDK, providing a framework for building intelligent systems that
      can solve problems with minimal human supervision.
    `,
    keyFeatures: [
      "Goal-directed behavior that maintains focus on completing specified objectives",
      "Agentic planning with the ability to break complex problems into manageable steps",
      "Tool use capabilities to interact with external systems, APIs, and data sources",
      "Memory and context tracking to maintain state throughout multi-step processes",
      "Reasoning capabilities to handle ambiguous or complex situations",
      "Error recovery with the ability to detect issues and adapt plans",
      "Communication in natural language with humans and other agents"
    ],
    applicationAreas: [
      "Customer service automation",
      "Content creation and editing",
      "Data analysis and insights generation",
      "Process automation and workflow management",
      "Research and information synthesis",
      "Personal assistance and productivity",
      "Software development assistance",
      "Educational tutoring and guidance"
    ],
    technicalDetails: `
      Azure AI Agents are built on Azure OpenAI Service models like GPT-4, with added components for planning,
      tool usage, and state management. Typical implementation approaches include:
      
      1. Function calling with structured outputs - Using Azure OpenAI function calling to enable agents to interact with tools
      2. ReAct (Reasoning + Acting) - Interleaving reasoning steps with actions
      3. Tool-augmented agents - Integrating with external APIs and services
      4. Planning frameworks - Adding explicit planning capabilities (like Plan-and-Execute pattern)
      
      The Azure AI SDK provides abstractions that simplify agent implementation, including prompt templates,
      tool definitions, and state management utilities.
    `,
    implementationConsiderations: [
      "Prompt engineering is crucial for guiding agent behavior and reasoning",
      "Tool design should include clear descriptions, input validation, and error handling",
      "Consider security implications of giving agents access to external systems",
      "Implement appropriate guardrails and safety mechanisms",
      "Plan for handling failures, edge cases, and unexpected situations",
      "Balance autonomy with appropriate human oversight",
      "Consider computational costs and latency requirements"
    ],
    examples: [
      {
        title: "Basic Agent Definition",
        description: "Defining a simple agent with tool access",
        codeSnippet: `
import { Agent } from "@azure/ai-agent";

// Define tools the agent can use
const tools = [
  {
    name: "search",
    description: "Search for information on the internet",
    parameters: {
      query: {
        type: "string",
        description: "Search query"
      }
    },
    execute: async ({ query }) => {
      // Implementation of search functionality
      return { results: [...] };
    }
  }
];

// Create the agent
const agent = new Agent({
  model: "gpt-4",
  tools,
  instructions: "You are a helpful assistant that can search for information."
});

// Run the agent with a user query
const result = await agent.run("What's the weather like in Seattle?");
        `
      },
      {
        title: "Agent with Planning",
        description: "Agent that creates and executes plans",
        codeSnippet: `
// Define a planning agent
const planningAgent = new PlanningAgent({
  model: "gpt-4",
  tools,
  instructions: \`
    You are an assistant that creates and executes plans.
    1. Analyze the user's request
    2. Break it down into steps
    3. Execute each step using available tools
    4. Provide a complete solution
  \`
});

// Run the agent with a complex task
const result = await planningAgent.run(
  "Research the latest AI trends, summarize them, and create a presentation outline"
);
        `
      }
    ]
  },
  {
    id: 'a2a',
    name: 'Agent-to-Agent (A2A) Communication',
    description: `
      Agent-to-Agent (A2A) communication enables multiple AI agents to work together, sharing information,
      delegating tasks, and coordinating actions. This approach allows complex systems to be built from
      simpler, specialized agents that each handle specific aspects of a problem.
      
      A2A systems can be organized in various topologies, from hierarchical structures with manager and
      worker agents to peer networks where agents communicate directly with each other. These communication
      patterns enable more sophisticated behaviors than any single agent could achieve alone.
    `,
    keyFeatures: [
      "Message passing with structured formats for reliable information exchange",
      "Role specialization allowing agents to focus on specific capabilities",
      "Task delegation from manager agents to specialized worker agents",
      "Collaborative problem-solving through agent teams",
      "Shared memory and knowledge bases for collective intelligence",
      "Communication protocols for standardized interactions",
      "Conflict resolution mechanisms for handling disagreements"
    ],
    applicationAreas: [
      "Complex workflow automation",
      "Multi-domain question answering",
      "Collaborative content creation",
      "Simulated organizations and systems",
      "Distributed problem-solving",
      "Decision support with multiple perspectives",
      "Competitive or adversarial simulations"
    ],
    technicalDetails: `
      A2A communication typically involves:
      
      1. Message formats - Structured data formats for exchanging information
      2. Routing mechanisms - Determining which agent(s) should receive messages
      3. State tracking - Maintaining conversation and task state across multiple agents
      4. Role definitions - Clear specifications of each agent's responsibilities
      5. Coordination protocols - Rules for how agents interact and collaborate
      
      Modern A2A systems often use JSON for message passing, with each message containing metadata about the
      sender, recipient, purpose, and conversation context. More sophisticated systems may implement formal
      communication protocols like ModelContextProtocol (MCP).
    `,
    implementationConsiderations: [
      "Design clear communication interfaces between agents",
      "Consider message size limitations due to context windows",
      "Implement error handling for failed communications",
      "Plan for efficiency in multi-agent architectures",
      "Design effective coordination strategies",
      "Consider security implications of agent-to-agent communication",
      "Implement debugging tools for tracking inter-agent messages"
    ],
    examples: [
      {
        title: "Basic A2A Communication",
        description: "Simple message passing between two agents",
        codeSnippet: `
// Define two agents
const researchAgent = new Agent({
  model: "gpt-4",
  instructions: "You research information and provide detailed facts."
});

const summarizerAgent = new Agent({
  model: "gpt-4",
  instructions: "You summarize detailed information into concise points."
});

// Implement communication between agents
async function processInformation(query) {
  // First agent researches
  const researchResult = await researchAgent.run(query);
  
  // Format message for the second agent
  const message = {
    from: "researchAgent",
    content: researchResult,
    instruction: "Summarize this research into 3-5 key points"
  };
  
  // Second agent summarizes
  const summary = await summarizerAgent.run(JSON.stringify(message));
  
  return summary;
}
        `
      },
      {
        title: "Multi-Agent Team",
        description: "A team of specialized agents coordinated by a manager",
        codeSnippet: `
// Create specialized worker agents
const agents = {
  researcher: new Agent({ instructions: "Research facts about topics" }),
  analyst: new Agent({ instructions: "Analyze data and identify patterns" }),
  writer: new Agent({ instructions: "Create well-written content" })
};

// Create a coordinator agent
const coordinator = new Agent({
  instructions: \`
    You coordinate a team of specialized agents.
    - researcher: Good at finding information
    - analyst: Good at analyzing data
    - writer: Good at creating content
    Decide which agent(s) to use for each task.
  \`
});

// Implement the coordination flow
async function teamProcess(request) {
  // Coordinator plans the workflow
  const plan = await coordinator.run(\`
    Request: "\${request}"
    Create a plan specifying which agents should handle which parts.
  \`);
  
  // Parse the plan and execute steps
  const parsedPlan = parsePlan(plan);
  const results = {};
  
  for (const step of parsedPlan.steps) {
    const agentName = step.agent;
    const instruction = step.instruction;
    
    // Include previous results in context
    const context = JSON.stringify(results);
    const agentInput = \`
      Instruction: \${instruction}
      Previous results: \${context}
    \`;
    
    // Execute step with appropriate agent
    results[step.id] = await agents[agentName].run(agentInput);
  }
  
  // Final synthesis by coordinator
  return coordinator.run(\`
    Synthesize these results into a final response:
    \${JSON.stringify(results)}
  \`);
}
        `
      }
    ]
  },
  {
    id: 'mcp',
    name: 'ModelContextProtocol (MCP)',
    description: `
      ModelContextProtocol (MCP) is a standardized framework for structured communication between AI agents.
      It defines how agents exchange messages, maintain shared context, and manage conversational state.
      MCP provides conventions that enable more reliable and consistent agent interactions.
      
      At its core, MCP addresses the challenges of context management, message formatting, and state tracking
      in multi-agent systems. It ensures that agents can effectively collaborate across different implementations
      and platforms, maintaining coherent conversations and workflows.

      The protocol was designed to solve common problems in AI systems related to context retention, message history management,
      and effective agent collaboration. MCP is transport-agnostic, focusing on message structure and context handling
      rather than the specific communication channels used.
    `,
    keyFeatures: [
      "Standardized message format with metadata for tracking and routing",
      "Context management to maintain conversation history across interactions",
      "Role specification for defining agent capabilities and responsibilities",
      "Control flow mechanisms for handling handoffs between agents",
      "Error handling and recovery procedures",
      "Interoperability between different agent implementations",
      "Extension mechanisms for domain-specific requirements",
      "Transport-agnostic design that works with various communication protocols"
    ],
    applicationAreas: [
      "Enterprise systems with multiple specialized agents",
      "Open agent ecosystems with third-party contributions",
      "Long-running conversations with agent transitions",
      "Systems requiring auditability of agent interactions",
      "Cross-platform agent integration",
      "Collaborative agent teams with complex workflows",
      "Multi-turn complex reasoning tasks"
    ],
    technicalDetails: `
      A typical MCP message includes:
      
      1. Message ID and thread ID for tracking
      2. Sender and recipient information
      3. Role specifications
      4. Content (the actual message payload)
      5. Metadata (timestamps, version info, etc.)
      6. Context references (links to previous messages or external context)
      
      MCP implementations often include libraries for message construction, validation, and processing.
      The protocol can be implemented at various levels of completeness depending on the application's needs,
      from simple message formatting to full context management systems.
    `,
    implementationConsiderations: [
      "Choose an appropriate level of protocol complexity for your needs",
      "Implement robust message validation and error handling",
      "Consider storage requirements for maintaining conversation history",
      "Design for graceful handling of context window limitations",
      "Ensure security of sensitive information in message contexts",
      "Plan for version compatibility as the protocol evolves",
      "Consider performance implications of context tracking"
    ],
    examples: [
      {
        title: "Basic MCP Message Structure",
        description: "Example of a simple MCP message following the specification",
        codeSnippet: `
// Example MCP message format
const mcpMessage = {
  // Core protocol information
  protocol: "mcp-0.1",
  
  // Message metadata
  message_id: "msg_123456789",
  parent_id: "msg_previous_id",
  trace_id: "trace_abc123",
  
  // Message content
  role: "assistant",
  content: "Here are the key facts about the topic you requested...",
  
  // Context handling
  context: {
    current: {
      conversation_id: "conv_xyz789",
      turn: 3
    },
    references: [
      { id: "msg_previous_id", role: "user" }
    ]
  },
  
  // Message properties
  properties: {
    created_at: "2023-06-25T14:35:12Z",
    model: "gpt-4",
    temperature: 0.7,
    intent: "information_retrieval"
  }
};

// Sending the message to another agent
await sendMcpMessage(recipientAgent, mcpMessage);
        `
      },
      {
        title: "MCP Context Management",
        description: "Implementing an MCP context manager for conversation tracking",
        codeSnippet: `
// MCP context manager implementation
class McpContextManager {
  private contexts = new Map();
  
  // Store context for a conversation
  storeContext(conversationId, contextData) {
    const existingContext = this.contexts.get(conversationId) || {
      messages: [],
      turn: 0,
      metadata: {}
    };
    
    this.contexts.set(conversationId, {
      ...existingContext,
      ...contextData,
      lastUpdated: Date.now()
    });
  }
  
  // Add message to context history
  addMessage(conversationId, message) {
    const context = this.contexts.get(conversationId) || {
      messages: [],
      turn: 0,
      metadata: {}
    };
    
    // Add message to history and increment turn counter
    const updatedContext = {
      ...context,
      messages: [...context.messages, message],
      turn: context.turn + 1,
      lastUpdated: Date.now()
    };
    
    this.contexts.set(conversationId, updatedContext);
    return updatedContext;
  }
  
  // Get context for a conversation
  getContext(conversationId) {
    return this.contexts.get(conversationId) || {
      messages: [],
      turn: 0,
      metadata: {}
    };
  }
  
  // Create a new MCP message with appropriate context
  createMessage(conversationId, role, content, properties = {}) {
    const context = this.getContext(conversationId);
    const messageId = \`msg_\${Date.now()}_\${Math.random().toString(36).substring(2, 7)}\`;
    
    // Get parent message ID if available
    const parentId = context.messages.length > 0 
      ? context.messages[context.messages.length - 1].message_id
      : null;
    
    // Create message following MCP specification
    const message = {
      protocol: "mcp-0.1",
      message_id: messageId,
      parent_id: parentId,
      trace_id: \`trace_\${conversationId}\`,
      role,
      content,
      context: {
        current: {
          conversation_id: conversationId,
          turn: context.turn
        },
        references: parentId ? [{ id: parentId }] : []
      },
      properties: {
        created_at: new Date().toISOString(),
        ...properties
      }
    };
    
    // Store the message in context
    this.addMessage(conversationId, message);
    
    return message;
  }
}
        `
      }
    ]
  },
  {
    id: 'acp',
    name: 'Agent Communication Protocol (ACP)',
    description: `
      The Agent Communication Protocol (ACP) is an open standard for agent interoperability that solves the 
      growing challenge of connecting AI agents, applications, and humans. It addresses the fragmentation that 
      occurs when agents are built in isolation across different frameworks, teams, and infrastructures.
      
      ACP provides a standardized RESTful API for agent communication that supports multiple modalities, both 
      synchronous and asynchronous communication patterns, streaming interactions, stateful and stateless 
    `,
    keyFeatures: [
      "Open protocol design for universal agent connectivity",
      "RESTful API for standardized communication endpoints",
      "Multi-modal support for text, images, audio, and more",
      "Synchronous and asynchronous communication patterns",
      "Streaming capability for real-time responses",
      "Stateful and stateless operational models",
      "Agent discovery mechanisms for finding available agents"
    ],
    applicationAreas: [
      "Enterprise agent ecosystems with multiple specialized agents",
      "Cross-platform agent interoperability",
      "Multi-agent systems that span organizational boundaries",
      "Agent marketplaces for discoverable agent services",
      "Hybrid human-AI collaborative systems",
      "Long-running agent tasks with persistent state",
      "Distributed agent networks with central coordination"
    ],
    technicalDetails: `
      ACP is implemented as a RESTful API with standard endpoints for agent operations. The primary patterns include:

      1. Single-Agent Pattern: A client connects directly to a single agent via REST interface over HTTP. This is ideal for direct communication with specialized agents, lightweight setups, development environments, and proof-of-concept implementations.

      2. Multi-Agent Single Server Pattern: An ACP Server hosts multiple agents behind a single HTTP endpoint. Each agent is individually addressable through the server's routing mechanism using agent metadata.

      The protocol's message format includes:
      - Agent identification and metadata
      - Request parameters and context
      - Response data with multiple modality support
      - State tracking for multi-turn interactions
      - Error handling and status reporting
    `,
    implementationConsiderations: [
      "Determine whether a single-agent or multi-agent pattern best fits your use case",
      "Consider authentication and authorization mechanisms for agent access",
      "Plan for logging and monitoring of agent interactions",
      "Implement appropriate error handling and retry strategies",
      "Decide on stateful vs. stateless operation based on requirements",
      "Consider deployment options: serverless functions, containers, or dedicated servers",
      "Plan for scaling with increasing agent load and complexity"
    ],
    examples: [
      {
        title: "Basic ACP Client-Server Interaction",
        description: "Simple client-server interaction using ACP",
        codeSnippet: `
// Client-side code to communicate with an ACP server
async function callAgent(query) {
  // Standard ACP endpoint for agent invocation
  const response = await fetch('https://acp-server.example.com/agent/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: query,
      parameters: {
        temperature: 0.7,
        max_tokens: 500
      }
    })
  });
  const result = await response.json();
  return result.output;
}
const result = await callAgent("Analyze the quarterly sales data");
console.log(result);
        `
      },
      {
        title: "Multi-Agent ACP Server Configuration",
        description: "Setting up an ACP server with multiple agents",
        codeSnippet: `
import express from 'express';
import { ACPServer } from 'acp-server';
const app = express();
app.use(express.json());
const acpServer = new ACPServer({
  agents: [
    { id: 'research-agent', name: 'Research Specialist', description: 'Agent specialized in data research and analysis', handler: async (request) => ({ output: 'Research results: ...', metadata: { process_time: 1.2, confidence: 0.95 } }) },
    { id: 'content-agent', name: 'Content Creator', description: 'Agent specialized in content generation', handler: async (request) => ({ output: 'Generated content: ...', metadata: { word_count: 250, tone: 'informative' } }) }
  ]
});
app.post('/agent/invoke', (req, res) => {
  const { agent_id } = req.body;
  acpServer.handleRequest(agent_id, req.body)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }));
});
app.listen(3000, () => console.log('ACP Server running on port 3000'));
        `
      }
    ]
  },
  {
  id: 'fine-tuning',
  name: 'Fine-Tuning Methods (SFT, DPO, RFT)',
  description: `Fine-tuning adapts a pretrained base model to embed domain, formatting, preference and safety behaviors directly in model weights rather than relying on every prompt to restate them. A pragmatic progression is:
1. SFT (Supervised Fine-Tuning) – imitate high-quality input→output pairs (establish structure & style)
2. DPO (Direct Preference Optimization) – optimize policy to favor preferred completions over rejects without an explicit reward model
3. RFT / RLHF (Reinforcement Fine-Tuning) – policy optimization against a learned or programmatic reward with KL constraints for fine control.

Exit early if marginal alignment gain flattens or capability regression rises. Each stage increases variance, infrastructure cost, and monitoring burden.`,
    keyFeatures: [
      'Progressive alignment: stability (SFT) → preference shaping (DPO) → precision (RFT)',
      'Bakes recurring format & style tokens into weights (lower prompt overhead)',
      'Supports safety & refusal calibration earlier in lifecycle',
      'DPO avoids training an explicit reward model (lower ops)',
      'RFT enables targeted refinement (reasoning, refusal nuance)',
      'Maintains a reference checkpoint for KL / regression tracking',
      'Improves consistency vs purely prompt-engineered approaches',
      'Allows hybrid datasets (human + synthetic + programmatic checks)'
    ],
    applicationAreas: [
      'Domain specialized assistants (legal / medical style enforcement)',
      'Preference & tone alignment (brand voice, politeness)',
      'Code / structured output normalization',
      'Reasoning or verification‑heavy tasks (math, tooling, tests)',
      'Safety refusal / sensitive content handling',
      'Latency & cost reduction via shorter prompts'
    ],
    technicalDetails: `SFT: Minimize cross-entropy on curated (prompt, response) pairs. Focus on diversity, schema adherence, leakage prevention.

DPO: Given preference pairs (prompt, chosen, rejected) and frozen reference π_ref:
  advantage = (log πθ(chosen) - log π_ref(chosen)) - (log πθ(rejected) - log π_ref(rejected))
  loss = - log σ(β * advantage)
  β controls sharpness; monitor KL(πθ || π_ref) and preference win-rate.

RFT / RLHF: Train reward model r_φ on preference pairs; optimize policy with PPO-like objective:
  L = E[ r_φ(x,y) ] - λ * KL(πθ || π_ref)
Adaptive λ keeps divergence bounded. Insert safety / regression eval every N steps. Stop when reward plateaus or baseline capability degrades.

Key Metrics: validation loss (SFT), preference win-rate (DPO), reward + KL trend (RFT), benchmark retention, safety refusal accuracy, hallucination / factual probes.`,
    implementationConsiderations: [
      'Deduplicate & stratify SFT dataset; hold out evaluation early',
      'Track KL divergence vs base at each stage',
      'Automate red-team & safety probe regression before promotion',
      'Use semantic + exact duplicate filters to reduce overfitting',
      'Log preference pair coverage & diversity (length, domain buckets)',
      'Apply small learning rates & early stopping to preserve base competence',
      'For RFT, design low-noise reward (verifier tests, deterministic graders)',
      'Maintain model lineage: base → sft → dpo → rft with hashes'
    ],
    examples: [
      {
        title: 'SFT JSONL Sample',
        description: 'Minimal lines for supervised task & formatting alignment',
        codeSnippet: `{"prompt":"Summarize: 'Transformers enable parallelism'","response":"Transformers process tokens in parallel, improving training efficiency."}
{"prompt":"Generate JSON list of 3 project stages","response":"{\"stages\":[\"Design\",\"Build\",\"Deploy\"]}"}`
      },
      {
        title: 'DPO Loss (Simplified)',
        description: 'Illustrative PyTorch style pseudo implementation',
        codeSnippet: `def dpo_step(policy, ref, batch, beta=0.1):
    ch = policy.log_prob(batch.prompts, batch.chosen)
    rj = policy.log_prob(batch.prompts, batch.rejected)
    ref_ch = ref.log_prob(batch.prompts, batch.chosen).detach()
    ref_rj = ref.log_prob(batch.prompts, batch.rejected).detach()
    advantage = (ch - ref_ch) - (rj - ref_rj)
    loss = -torch.nn.functional.logsigmoid(beta * advantage).mean()
    loss.backward(); optimizer.step(); optimizer.zero_grad()`
      },
      {
        title: 'RFT Loop Sketch',
        description: 'High-level PPO style reinforcement fine-tuning flow',
        codeSnippet: `for it in range(iters):
    prompts = sample(prompts_pool)
    gens, logp_old = policy.generate_with_logprobs(prompts)
    with torch.no_grad():
        rewards = reward_model.score(prompts, gens) - kl_coef * kl_div(policy, ref, prompts, gens)
    adv = compute_advantage(rewards)
    loss = ppo_objective(policy, prompts, gens, logp_old, adv)
    loss.backward(); optimizer.step(); optimizer.zero_grad()
    adjust_kl(kl_target)
    run_regression_eval(policy)`
      }
    ]
  },
  {
    id: 'tri-system-paradigm',
    name: 'The Tri-System Paradigm',
    description: `The Tri-System Paradigm extends Kahneman's dual-process theory into a Triadic Cognitive Ecology:
- System 1 (fast, intuitive, low glucose) — pattern matching, heuristics, autopilot
- System 2 (slow, deliberate, high glucose) — effortful reasoning, verification, analysis
- System 3 (AI-externalised reasoning) — LLMs performing the cognitive labour System 2 used to own

When System 3 offers fluent, confident, instant answers, the brain's Law of Least Mental Effort drives cognitive surrender: users stop verifying because checking feels harder than trusting. The result is confidence inflation (hallucinated answers that sound authoritative), attribute substitution ("does it feel right?" replaces "is it right?"), and epistemic dependence (System 2 atrophies from disuse).

The antidote is Beneficial Friction — deliberate design patterns that structurally require System 2 engagement at high-stakes decision points.`,
    keyFeatures: [
      'System 3 = AI as externalised slow thinking',
      'Cognitive surrender driven by glucose conservation bias',
      'Confidence inflation: hallucinations wrapped in authoritative prose',
      'Attribute substitution: ease-of-processing replaces verification',
      'Law of Least Mental Effort as evolutionary optimisation',
      'Three evolutionary trajectories: Epistemic Dependent, Calibrated Collaborator, Automated Loop',
      'Six beneficial friction design patterns',
      'Predict-First Protocol gates AI output behind user hypothesis'
    ],
    applicationAreas: [
      'AI-augmented decision workflows',
      'Healthcare clinical decision support',
      'Legal analysis and contract review',
      'Financial risk assessment',
      'Educational technology design',
      'Enterprise AI governance and policy',
      'Critical infrastructure operations',
      'Any domain where wrong-but-confident AI output has consequences'
    ],
    technicalDetails: `Kahneman Dual-Process → Triadic Cognitive Ecology

System 1: Automatic, fast, low effort, always on. Handles ~95% of daily cognition.
System 2: Controlled, slow, high glucose cost. Activated for novel or high-stakes tasks.
System 3: AI layer. Zero glucose cost to the user. Produces System-2-quality output at System-1 speed.

Failure cascade:
1. User encounters hard question → System 2 would normally engage
2. System 3 offers fluent answer instantly → brain detects easy path available
3. Law of Least Mental Effort triggers → System 1 accepts the shortcut
4. Attribute substitution: "does it feel right?" replaces "is it right?"
5. Confidence inflation: LLM calibration ≠ factual accuracy; prose fluency ≠ truth
6. Repeated surrender → neural pathway strengthening → epistemic dependence

Six Beneficial Friction Patterns:
1. Predict-First Protocol — user records hypothesis before seeing AI output
2. Confidence Calibration Overlay — token-level uncertainty visualisation
3. Adversarial Verification Checkpoint — second AI attacks first AI's output
4. Reasoning Trace Exposure — show chain-of-thought, not just final answer
5. Periodic Competence Verification — tasks without AI at regular intervals
6. Decision Journaling + Retrospective — document reasoning for audit`,
    implementationConsiderations: [
      'Place friction at irreversible decision points, not everywhere',
      'Measure System 2 atrophy via periodic unaided competence checks',
      'Set escape velocity: max consecutive AI-accepted decisions before forced checkpoint',
      'Test for attribute substitution with deliberately plausible-but-wrong outputs',
      'Track verification rate: proportion of AI outputs independently checked',
      'Design AI to present options, not single answers, at high-stakes junctures',
      'Avoid friction fatigue: too much friction causes users to circumvent the system',
      'Pair Predict-First Protocol with retrospective analysis to close the feedback loop'
    ],
    examples: [
      {
        title: 'Predict-First Protocol',
        description: 'Gate AI output behind a user hypothesis to activate System 2',
        codeSnippet: `// Before showing AI analysis, require user prediction\nconst userPrediction = await promptUser(\n  "What do you expect the root cause to be?"\n);\nconst aiAnalysis = await llm.analyze(incidentData);\nshowComparison(userPrediction, aiAnalysis);\n// Divergence triggers deeper review`
      },
      {
        title: 'Confidence Calibration Overlay',
        description: 'Display uncertainty alongside AI output to counteract confidence inflation',
        codeSnippet: `// Render token-level confidence bands\nfunction ConfidenceOverlay({ tokens }) {\n  return tokens.map(t => (\n    <span\n      key={t.id}\n      style={{ opacity: Math.max(0.3, t.confidence) }}\n      title={\`Confidence: \${(t.confidence * 100).toFixed(0)}%\`}\n    >\n      {t.text}\n    </span>\n  ));\n}`
      },
      {
        title: 'Escape Velocity Check',
        description: 'Force a manual checkpoint after N consecutive AI-accepted decisions',
        codeSnippet: `let consecutiveAccepts = 0;\nconst ESCAPE_VELOCITY = 5;\n\nfunction onDecision(accepted: boolean) {\n  if (accepted) {\n    consecutiveAccepts++;\n    if (consecutiveAccepts >= ESCAPE_VELOCITY) {\n      requireManualVerification();\n      consecutiveAccepts = 0;\n    }\n  } else {\n    consecutiveAccepts = 0;\n  }\n}`
      }
    ]
  }
];