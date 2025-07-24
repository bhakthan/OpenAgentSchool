import { PatternData } from './types';

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
  },
  nodes: [],
  edges: [],
  codeExample: `// AutoGen Multi-Agent Pattern implementation...`,
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
