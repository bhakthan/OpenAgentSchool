import { PatternData } from './types';

const StubVisual = () => null;

export const autogenMultiAgentPattern: PatternData = {
  id: 'autogen-multi-agent',
  name: 'AutoGen Multi-Agent',
  description: 'Uses the AutoGen framework to create a group of collaborating agents that can solve complex tasks.',
  category: 'Multi-Agent',
  useCases: ['Software Development', 'Financial Analysis', 'Content Creation'],
  whenToUse: 'Use this pattern when a task requires the expertise of multiple, specialized agents that need to communicate and collaborate. It is ideal for complex, multi-step problems that can be broken down into smaller sub-tasks.',
  businessUseCase: {
    industry: 'Software Development',
    description: 'A software company uses an AutoGen multi-agent system to automate parts of their development workflow. A "Product Manager" agent writes the user stories, a "Developer" agent writes the code, a "QA" agent writes the tests, and a "DevOps" agent deploys the application. The agents collaborate in a group chat to ensure the final product meets the requirements.',
    enlightenMePrompt: 'Provide a technical guide on implementing a multi-agent system with AutoGen.',
    visualization: StubVisual
  },
  nodes: [],
  edges: [],
  codeExample: `// AutoGen Multi-Agent Pattern (TypeScript)
// Simplified illustrative multi-agent collaboration using an AutoGen-like abstraction.
// Focus: role definition, agent wrappers, group chat orchestration, termination & transcript assembly.

// ---- Types & Utility Stubs -------------------------------------------------
interface AgentMessage { role: string; content: string; from?: string; }

// Pretend LLM call (stub) – replace with real provider integration
async function llm(prompt: string): Promise<string> {
  return Promise.resolve(
    prompt.includes('TERMINATE')
      ? 'TERMINATE ACK'
      : 'Acknowledged. Continuing plan.'
  );
}

// ---- Base Agent -------------------------------------------------------------
abstract class BaseAgent {
  public name: string;
  public systemMessage: string;
  constructor(name: string, systemMessage: string) {
    this.name = name;
    this.systemMessage = systemMessage;
  }
  abstract generateResponse(history: AgentMessage[]): Promise<AgentMessage | null>;
  protected buildPrompt(history: AgentMessage[]): string {
    const last = history.slice(-4).map(m => \`\${m.from||m.role}: \${m.content}\`).join('\\n');
    return \`\${this.systemMessage}\\nRecent:\\n\${last}\`;
  }
}

// ---- Assistant Agents -------------------------------------------------------
class AssistantAgent extends BaseAgent {
  async generateResponse(history: AgentMessage[]): Promise<AgentMessage | null> {
    const prompt = this.buildPrompt(history);
    const raw = await llm(prompt);
    if (raw.trim().toUpperCase().startsWith('TERMINATE')) {
      return { role: 'assistant', from: this.name, content: 'TERMINATE' };
    }
    return { role: 'assistant', from: this.name, content: raw };
  }
}

class UserProxyAgent extends BaseAgent {
  private initialTask: string;
  private injected = false;
  constructor(task: string) {
    super('UserProxy', 'You represent the end user. Provide initial requirement then observe.');
    this.initialTask = task;
  }
  async generateResponse(): Promise<AgentMessage | null> {
    if (this.injected) return null; // only speak once
    this.injected = true;
    return { role: 'user', from: this.name, content: this.initialTask };
  }
}

// ---- Group Chat Container ---------------------------------------------------
class GroupChat {
  public agents: BaseAgent[];
  public messages: AgentMessage[] = [];
  public maxRounds: number;
  constructor(agents: BaseAgent[], maxRounds = 12) {
    this.agents = agents;
    this.maxRounds = maxRounds;
  }
  addMessage(msg: AgentMessage) { this.messages.push(msg); }
  terminated(): boolean {
    return this.messages.some(m => m.content.trim().toUpperCase() === 'TERMINATE');
  }
}

// ---- Manager / Orchestrator -------------------------------------------------
class GroupChatManager {
  private chat: GroupChat;
  constructor(chat: GroupChat) { this.chat = chat; }

  async run(): Promise<{ transcript: AgentMessage[]; rounds: number; terminated: boolean; }> {
    let round = 0;
    while (round < this.chat.maxRounds && !this.chat.terminated()) {
      round++;
      for (const agent of this.chat.agents) {
        if (this.chat.terminated()) break;
        const msg = await agent.generateResponse(this.chat.messages);
        if (msg) {
          this.chat.addMessage(msg);
        }
      }
    }
    return { transcript: this.chat.messages, rounds: round, terminated: this.chat.terminated() };
  }
}

// ---- Example Usage (Commented for Runner) -----------------------------------
// const userTask = 'Design a factorial function and a quick unit test. If done, reply TERMINATE.';
// const user = new UserProxyAgent(userTask);
// const productMgr = new AssistantAgent('ProductManager', 'Role: Product Manager. Break requirements into dev-ready tasks.');
// const dev = new AssistantAgent('Developer', 'Role: Developer. Provide implementation details succinctly.');
// const qa = new AssistantAgent('QAAgent', 'Role: QA. Propose minimal yet effective test coverage.');
// const chat = new GroupChat([user, productMgr, dev, qa], 8);
// const manager = new GroupChatManager(chat);
// manager.run().then(result => {
//   console.log('Rounds:', result.rounds, 'Terminated:', result.terminated);
//   console.log('\\nTranscript:\\n');
//   for (const m of result.transcript) {
//     console.log(\`[\${m.from}] \${m.content}\`);
//   }
// });

// ---- Transcript Formatting Helper (Optional) --------------------------------
function formatTranscript(messages: AgentMessage[]): string {
  return messages.map(m => \`[\${m.from}] \${m.content}\`).join('\\n');
}

// Export selected entities (if this were a real module)
export {
  AssistantAgent,
  UserProxyAgent,
  GroupChat,
  GroupChatManager,
  formatTranscript
};
`,
  implementation: [
    'Install AutoGen framework and configure Azure OpenAI connection.',
    'Define agent roles and system messages for specialized behaviors.',
    'Create conversable agents with appropriate LLM configurations.',
    'Set up group chat or sequential conversation patterns.',
    'Evaluate system performance using collaboration and role-specific metrics.'
  ],
  pythonCodeExample: `import autogen

# Assume config_list is defined with your LLM provider details
config_list = autogen.config_list_from_json(env_or_file="OAI_CONFIG_LIST")

# Define the agents
product_manager = autogen.AssistantAgent(
    name="ProductManager",
    system_message="I am a Product Manager. I will write the user stories and requirements.",
    llm_config={"config_list": config_list},
)
developer = autogen.AssistantAgent(
    name="Developer",
    system_message="I am a Developer. I will write the Python code to implement the user stories.",
    llm_config={"config_list": config_list},
)
qa_agent = autogen.AssistantAgent(
    name="QAAgent",
    system_message="I am a QA Agent. I will write unit tests for the code.",
    llm_config={"config_list": config_list},
)
user_proxy = autogen.UserProxyAgent(
    name="UserProxy",
    human_input_mode="TERMINATE",
    code_execution_config={"work_dir": "coding"},
)

# Create the group chat and manager
groupchat = autogen.GroupChat(
    agents=[user_proxy, product_manager, developer, qa_agent],
    messages=[],
    max_round=12,
)
manager = autogen.GroupChatManager(groupchat=groupchat, llm_config={"config_list": config_list})

# Start the chat
# user_proxy.initiate_chat(
#     manager,
#     message="Create a simple Python function to calculate the factorial of a number and write a test for it.",
# )`,
  advantages: [],
  limitations: [],
  relatedPatterns: []
};
