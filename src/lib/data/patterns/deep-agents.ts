import { PatternData } from './index'
// Import business use case visual component for Deep Agents
import { LegalResearchVisual } from '@/components/visualization/business-use-cases/LegalResearchVisual';

export const deepAgentsPattern: PatternData = {
  id: "deep-agents",
  name: "Deep Agents",
  description: "A comprehensive agent architecture that combines planning tools, sub-agents, virtual file systems, and detailed prompts to handle complex, long-form tasks that require deep thinking and execution.",
  category: "orchestrator-worker",
  
  useCases: [
    "Deep research projects requiring comprehensive analysis and report generation",
    "Complex software development tasks spanning multiple files and components", 
    "Multi-step content creation with research, drafting, and refinement phases",
    "Business analysis requiring data gathering, processing, and strategic recommendations",
    "Technical documentation creation with code examples and detailed explanations",
    "Academic research with literature review, analysis, and synthesis"
  ],
  
  whenToUse: "Use Deep Agents when you need to handle complex, multi-step tasks that require planning, research, iterative refinement, and the ability to maintain context across extended interactions. This pattern is ideal for tasks that would benefit from breaking down into specialized sub-tasks handled by different agents with specific expertise.",
  
  advantages: [
    "Handles complex, long-form tasks that simple agents cannot complete",
    "Built-in planning capabilities keep agents focused on multi-step objectives", 
    "Sub-agent architecture enables specialization and context quarantine",
    "Virtual file system maintains persistent state across interactions",
    "Iterative refinement through critique and improvement cycles",
    "Scalable architecture that can handle increasingly complex workflows"
  ],

  businessUseCase: {
    industry: 'Management Consulting',
    description: 'A top-tier consulting firm uses Deep Agents to automate comprehensive market research for enterprise clients. When a client requests analysis of the "Enterprise AI Adoption Market," the system deploys a Main Agent that coordinates specialized sub-agents: a Research Agent conducts primary and secondary research across multiple databases, an Analysis Agent processes data and identifies patterns, and a Critique Agent ensures quality and completeness. The Virtual File System maintains context across the multi-day process, while planning tools organize the complex workflow. The result is a publication-ready 50-page report with executive summary, detailed analysis, competitive landscape, and strategic recommendations - delivered in 48 hours instead of 2-3 weeks.',
    enlightenMePrompt: 'Explain how to implement Deep Agents for automated comprehensive market research and strategic analysis in enterprise consulting.',
    visualization: LegalResearchVisual
  },
  
  implementation: [
    "Define the main agent with comprehensive instructions and available tools",
    "Create specialized sub-agents for specific tasks (research, critique, analysis)",
    "Implement virtual file system for persistent state management",
    "Configure planning tools to help agent organize complex workflows", 
    "Set up critique and refinement loops for quality assurance",
    "Integrate with external tools and APIs for research and data gathering"
  ],
  
  codeExample: `// TypeScript implementation using LangGraph and Azure OpenAI
import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent, SubAgent } from "./deep-agents";

// Research tool for web search
async function internetSearch(
  query: string,
  maxResults: number = 5,
  topic: "general" | "news" | "finance" = "general"
): Promise<any> {
  // Implementation using Azure Cognitive Search or Bing Search API
  const searchClient = new SearchClient(
    process.env.AZURE_SEARCH_ENDPOINT!,
    process.env.AZURE_SEARCH_INDEX!,
    new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY!)
  );
  
  const searchResults = await searchClient.search(query, {
    top: maxResults,
    select: ["title", "content", "url"]
  });
  
  return searchResults.results.map(result => ({
    title: result.document.title,
    content: result.document.content,
    url: result.document.url
  }));
}

// Sub-agent for specialized research
const researchSubAgent: SubAgent = {
  name: "research-agent",
  description: "Conducts in-depth research on specific topics. Provide one focused question at a time.",
  prompt: \`You are a dedicated researcher. Conduct thorough research and provide detailed answers.
  
  Your final response will be passed to the main agent, so ensure it's comprehensive and well-structured.
  Focus on accuracy, cite sources, and provide actionable insights.\`,
  tools: ["internetSearch"]
};

// Sub-agent for critique and quality assurance
const critiqueSubAgent: SubAgent = {
  name: "critique-agent", 
  description: "Reviews and critiques reports for quality, completeness, and accuracy.",
  prompt: \`You are an expert editor and critic. Review reports for:
  - Completeness and comprehensiveness
  - Accuracy and factual correctness
  - Clear structure and organization
  - Proper citations and sources
  - Writing quality and clarity
  
  Provide specific, actionable feedback for improvement.\`
};

// Main deep agent instructions
const researchInstructions = \`You are an expert researcher and analyst. Your job is to conduct thorough research and produce high-quality reports.

**Workflow:**
1. Save the user's question to \`question.txt\` for reference
2. Create a research plan and save it to \`plan.md\`
3. Use the research-agent for in-depth investigation of specific topics
4. Write your findings to \`draft_report.md\`
5. Use the critique-agent to review your draft
6. Iterate and improve based on feedback
7. Produce the final report in \`final_report.md\`

**Report Requirements:**
- Well-structured with clear headings
- Comprehensive analysis with specific facts
- Proper source citations [Title](URL)
- Professional tone without self-reference
- Include a Sources section at the end

You have access to file system tools and sub-agents. Use them strategically to produce exceptional results.\`;

// Create the deep agent
const agent = createDeepAgent(
  [internetSearch],
  researchInstructions,
  {
    subagents: [researchSubAgent, critiqueSubAgent],
    model: new ChatOpenAI({
      model: "gpt-4",
      temperature: 0.1,
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      azureOpenAIApiVersion: "2024-02-01"
    })
  }
);

// Usage example
async function runDeepAgent() {
  const result = await agent.invoke({
    messages: [{
      role: "user",
      content: "Research the current state of AI agent frameworks and their applications in enterprise software development. Include market trends, key players, and future outlook."
    }]
  });
  
  console.log("Generated files:", result.files);
  console.log("Final report:", result.files["final_report.md"]);
}

runDeepAgent().catch(console.error);`,

  pythonCodeExample: `# Python implementation using deepagents library
import os
from typing import Literal
from deepagents import create_deep_agent, SubAgent
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential

# Search tool for research
def internet_search(
    query: str,
    max_results: int = 5,
    topic: Literal["general", "news", "finance"] = "general",
    include_raw_content: bool = False,
) -> dict:
    """Research tool using Azure Cognitive Search"""
    search_client = SearchClient(
        endpoint=os.environ["AZURE_SEARCH_ENDPOINT"],
        index_name=os.environ["AZURE_SEARCH_INDEX"],
        credential=AzureKeyCredential(os.environ["AZURE_SEARCH_API_KEY"])
    )
    
    search_results = search_client.search(
        search_text=query,
        top=max_results,
        select=["title", "content", "url"]
    )
    
    return {
        "results": [
            {
                "title": result["title"],
                "content": result["content"] if include_raw_content else result["content"][:500],
                "url": result["url"]
            }
            for result in search_results
        ]
    }

# Sub-agent for specialized research
research_sub_agent = {
    "name": "research-agent",
    "description": """Conducts in-depth research on specific topics. 
    Provide one focused question at a time for best results.""",
    "prompt": """You are a dedicated researcher. Your job is to conduct thorough research 
    based on the user's questions.

    Conduct comprehensive research and reply with a detailed answer to their question.
    
    Only your FINAL answer will be passed to the main agent, so ensure it's complete 
    and well-structured. Include specific facts, data, and cite all sources.""",
    "tools": ["internet_search"]
}

# Sub-agent for quality critique
critique_sub_agent = {
    "name": "critique-agent",
    "description": """Reviews and critiques reports for quality, accuracy, and completeness.
    Helps improve the final output through detailed feedback.""",
    "prompt": """You are a dedicated editor and quality assurance specialist.
    
    Review the report in \`final_report.md\` against the original question in \`question.txt\`.
    
    Provide detailed critique focusing on:
    - Content completeness and accuracy
    - Structure and organization  
    - Source quality and citations
    - Writing clarity and professionalism
    - Missing information or gaps
    
    Give specific, actionable recommendations for improvement."""
}

# Main agent instructions for research tasks
research_instructions = """You are an expert researcher and analyst. Your mission is to conduct 
thorough research and create comprehensive, high-quality reports.

**Your Process:**
1. First, save the user's question to \`question.txt\` for reference
2. Create a detailed research plan and save to \`research_plan.md\`
3. Use the research-agent to investigate specific topics and questions
4. Compile findings into a draft report in \`draft_report.md\`
5. Use the critique-agent to review and provide feedback
6. Iterate and improve based on critique
7. Finalize the report in \`final_report.md\`

**Report Standards:**
- Professional structure with clear headings (# ## ###)
- Comprehensive analysis with specific facts and insights
- Proper source citations using [Title](URL) format
- Balanced perspective with multiple viewpoints
- Detailed Sources section at the end
- Written in the same language as the user's question

**Tools Available:**
- \`internet_search\`: For web research and data gathering
- File system tools: For organizing and storing information
- Sub-agents: For specialized research and quality assurance

Focus on creating exceptional, in-depth reports that provide real value."""

# Create the deep agent with Azure OpenAI
agent = create_deep_agent(
    tools=[internet_search],
    instructions=research_instructions,
    subagents=[research_sub_agent, critique_sub_agent],
    model="gpt-4"  # Will use Azure OpenAI if configured
).with_config({"recursion_limit": 1000})

# Usage example
if __name__ == "__main__":
    # Example research task
    result = agent.invoke({
        "messages": [
            {
                "role": "user", 
                "content": """Research the current landscape of AI agent frameworks 
                and their adoption in enterprise environments. Include market analysis, 
                key technologies, major players, and future trends."""
            }
        ]
    })
    
    # Access generated files
    print("Files created:", list(result["files"].keys()))
    
    # Display final report
    if "final_report.md" in result["files"]:
        print("\\n=== FINAL REPORT ===")
        print(result["files"]["final_report.md"])`,

  completeCode: `// Complete Deep Agents implementation with Azure integration
// This combines the planning tools, sub-agents, virtual file system, and detailed prompts
// to create a comprehensive agent capable of handling complex, multi-step tasks

import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent, SubAgent } from "./deep-agents";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

// Implementation follows the four key components:
// 1. Planning tool (built-in todo/planning capabilities)
// 2. Sub-agents (specialized agents for different tasks)  
// 3. Virtual file system (state persistence across interactions)
// 4. Detailed prompts (comprehensive instructions for complex tasks)

export class DeepAgentOrchestrator {
  private agent: any;
  
  constructor() {
    this.agent = this.createAgent();
  }
  
  private createAgent() {
    return createDeepAgent(
      [this.internetSearch],
      this.getMainInstructions(),
      {
        subagents: [
          this.getResearchAgent(),
          this.getCritiqueAgent(),
          this.getAnalysisAgent()
        ],
        model: new ChatOpenAI({
          model: "gpt-4",
          temperature: 0.1,
          azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
          azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_INSTANCE_NAME,
          azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME
        })
      }
    );
  }
  
  async execute(task: string, context?: any) {
    return await this.agent.invoke({
      messages: [{ role: "user", content: task }],
      files: context?.files || {}
    });
  }
}`,

  // Add nodes and edges for pattern visualization  
  nodes: [
    {
      id: "user-input",
      type: "input",
      data: { label: "User Request", nodeType: "input" },
      position: { x: 50, y: 50 }
    },
    {
      id: "main-agent",
      type: "agent", 
      data: { label: "Deep Agent\n(Main Orchestrator)", nodeType: "llm" },
      position: { x: 300, y: 50 }
    },
    {
      id: "planning-tool",
      type: "tool",
      data: { label: "Planning Tool\n(Todo/Strategy)", nodeType: "planner" },
      position: { x: 200, y: 200 }
    },
    {
      id: "file-system",
      type: "tool", 
      data: { label: "Virtual File System\n(State Management)", nodeType: "tool" },
      position: { x: 400, y: 200 }
    },
    {
      id: "research-agent",
      type: "agent",
      data: { label: "Research Agent\n(Sub-agent)", nodeType: "llm" },
      position: { x: 100, y: 350 }
    },
    {
      id: "critique-agent", 
      type: "agent",
      data: { label: "Critique Agent\n(Sub-agent)", nodeType: "evaluator" },
      position: { x: 300, y: 350 }
    },
    {
      id: "analysis-agent",
      type: "agent",
      data: { label: "Analysis Agent\n(Sub-agent)", nodeType: "llm" },
      position: { x: 500, y: 350 }
    },
    {
      id: "external-tools",
      type: "tool",
      data: { label: "External Tools\n(Search, APIs)", nodeType: "tool" },
      position: { x: 600, y: 200 }
    },
    {
      id: "final-output",
      type: "output",
      data: { label: "Comprehensive Report\n& Generated Files", nodeType: "output" },
      position: { x: 300, y: 500 }
    }
  ],

  edges: [
    { id: "e1", source: "user-input", target: "main-agent", label: "Complex Task" },
    { id: "e2", source: "main-agent", target: "planning-tool", label: "Create Plan" },
    { id: "e3", source: "main-agent", target: "file-system", label: "Store State" },
    { id: "e4", source: "main-agent", target: "research-agent", label: "Research Tasks" },
    { id: "e5", source: "main-agent", target: "critique-agent", label: "Quality Review" },
    { id: "e6", source: "main-agent", target: "analysis-agent", label: "Analysis Tasks" },
    { id: "e7", source: "research-agent", target: "external-tools", label: "Data Gathering" },
    { id: "e8", source: "critique-agent", target: "file-system", label: "Review Files" },
    { id: "e9", source: "file-system", target: "main-agent", label: "Retrieved State" },
    { id: "e10", source: "main-agent", target: "final-output", label: "Generated Report" }
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 weeks',
    complexityReduction: 'Very High - LangGraph provides hierarchical agent orchestration, persistent state, and sub-agent coordination out-of-box',
    reusabilityScore: 8,
    learningCurve: 'steep',
    velocityPractices: [
      'Pattern Fluency - Advanced hierarchical pattern for research, enterprise workflows, complex analysis requiring specialized sub-tasks',
      'Architecture Templates - LangGraph and Microsoft Agent Framework provide deep agent scaffolding with state persistence',
      'Failure Scenario Libraries - State management failures, sub-agent coordination issues, recursion limit problems documented',
      'Evaluation Automation - Task completion quality, sub-agent efficiency, and overall workflow metrics standard'
    ]
  }
}

export default deepAgentsPattern;
