import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Folder, Code, Rocket, Lightning, Package, GitBranch, Copy, CheckCircle, Terminal, Brain, Wrench, Shield, Database, Globe, Download, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/ui/CodeBlock";

interface AgentTemplatesHubProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const STARTER_TEMPLATES = [
  {
    id: "basic-agent",
    name: "Basic Agent Starter",
    description: "Minimal agent with tool calling, single conversation flow",
    difficulty: "Beginner",
    timeToStart: "5 minutes",
    framework: "LangChain / Python",
    includes: ["Basic prompt template", "Tool calling setup", "Simple memory", "Health endpoint"],
    code: `# basic_agent.py
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from langchain.prompts import ChatPromptTemplate

# Define a simple tool
@tool
def get_weather(location: str) -> str:
    """Get the current weather for a location."""
    # In production, call a real weather API
    return f"The weather in {location} is sunny, 72°F"

# Create the agent
llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = [get_weather]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])

agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run the agent
result = executor.invoke({"input": "What's the weather in Seattle?"})
print(result["output"])`
  },
  {
    id: "rag-agent",
    name: "RAG Agent Starter",
    description: "Retrieval-augmented agent with vector search and citations",
    difficulty: "Intermediate",
    timeToStart: "15 minutes",
    framework: "LangChain / ChromaDB",
    includes: ["Document ingestion", "Vector store setup", "Retrieval chain", "Citation formatting"],
    code: `# rag_agent.py
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader

# Load and chunk documents
loader = TextLoader("knowledge_base.txt")
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = text_splitter.split_documents(documents)

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")

# Create RAG chain
llm = ChatOpenAI(model="gpt-4o", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)

# Query with citations
result = qa_chain.invoke({"query": "What is our return policy?"})
print(f"Answer: {result['result']}")
print(f"Sources: {[doc.metadata for doc in result['source_documents']]}")`
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Starter",
    description: "Coordinator + specialist agents with structured handoffs",
    difficulty: "Advanced",
    timeToStart: "30 minutes",
    framework: "AutoGen / Microsoft Agent Framework",
    includes: ["Agent definitions", "Conversation routing", "State management", "Error handling"],
    code: `# multi_agent.py
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# Define specialist agents
researcher = AssistantAgent(
    name="Researcher",
    system_message="""You are a research specialist. You search for 
    information and provide well-sourced answers. Always cite sources.""",
    llm_config={"model": "gpt-4o"}
)

analyst = AssistantAgent(
    name="Analyst", 
    system_message="""You are a data analyst. You analyze information
    provided by the researcher and extract key insights.""",
    llm_config={"model": "gpt-4o"}
)

writer = AssistantAgent(
    name="Writer",
    system_message="""You are a technical writer. You take insights
    and create clear, user-friendly summaries.""",
    llm_config={"model": "gpt-4o"}
)

# Create group chat with coordinator
user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10
)

group_chat = GroupChat(
    agents=[user_proxy, researcher, analyst, writer],
    messages=[],
    max_round=10
)

manager = GroupChatManager(groupchat=group_chat, llm_config={"model": "gpt-4o"})

# Start conversation
user_proxy.initiate_chat(manager, message="Research AI agents in healthcare")`
  },
  {
    id: "mcp-server",
    name: "MCP Server Starter",
    description: "Model Context Protocol server exposing tools to AI clients",
    difficulty: "Intermediate",
    timeToStart: "20 minutes",
    framework: "MCP SDK / TypeScript",
    includes: ["MCP server setup", "Tool definitions", "Resource exposure", "Client integration"],
    code: `// mcp_server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_database",
      description: "Search the internal database for records",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          limit: { type: "number", description: "Max results", default: 10 }
        },
        required: ["query"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "search_database") {
    const { query, limit = 10 } = request.params.arguments;
    // Implement your search logic here
    const results = await searchDatabase(query, limit);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);`
  },
  {
    id: "production-agent",
    name: "Production-Ready Agent",
    description: "Full-featured agent with observability, error handling, and deployment config",
    difficulty: "Advanced",
    timeToStart: "45 minutes",
    framework: "FastAPI / LangChain",
    includes: ["API endpoints", "OpenTelemetry tracing", "Circuit breakers", "Docker + K8s configs"],
    code: `# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from opentelemetry import trace
from tenacity import retry, stop_after_attempt, wait_exponential
import structlog

app = FastAPI(title="Production Agent API")
tracer = trace.get_tracer(__name__)
logger = structlog.get_logger()

class AgentRequest(BaseModel):
    message: str
    session_id: str = None

class AgentResponse(BaseModel):
    response: str
    session_id: str
    tool_calls: list[str] = []

@app.post("/chat", response_model=AgentResponse)
async def chat(request: AgentRequest):
    with tracer.start_as_current_span("agent_chat") as span:
        span.set_attribute("session_id", request.session_id or "new")
        
        try:
            result = await run_agent_with_retry(request.message)
            logger.info("agent_success", session_id=request.session_id)
            return AgentResponse(
                response=result["output"],
                session_id=request.session_id or generate_session_id(),
                tool_calls=result.get("tool_calls", [])
            )
        except Exception as e:
            logger.error("agent_error", error=str(e))
            span.record_exception(e)
            raise HTTPException(status_code=500, detail="Agent processing failed")

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, max=10))
async def run_agent_with_retry(message: str):
    # Your agent execution logic here
    return await executor.ainvoke({"input": message})

@app.get("/health")
async def health():
    return {"status": "healthy"}`
  }
];

const QUICKSTART_GUIDES = [
  {
    title: "Your First Agent in 5 Minutes",
    steps: [
      "Install dependencies: `pip install langchain langchain-openai`",
      "Set your API key: `export OPENAI_API_KEY=your-key`",
      "Copy the Basic Agent Starter template",
      "Run: `python basic_agent.py`",
      "Test with: 'What's the weather in Seattle?'"
    ]
  },
  {
    title: "Add RAG to Your Agent",
    steps: [
      "Install: `pip install chromadb langchain-chroma`",
      "Create a `knowledge_base.txt` with your content",
      "Copy the RAG Agent Starter template",
      "Run: `python rag_agent.py`",
      "Test with questions about your content"
    ]
  },
  {
    title: "Deploy to Production",
    steps: [
      "Copy the Production-Ready Agent template",
      "Install: `pip install fastapi uvicorn opentelemetry-sdk structlog tenacity`",
      "Run locally: `uvicorn app.main:app --reload`",
      "Test: `curl -X POST localhost:8000/chat -d '{\"message\": \"Hello\"}'`",
      "Deploy with Docker: `docker build -t my-agent . && docker run -p 8000:8000 my-agent`"
    ]
  }
];

const PROJECT_STRUCTURE = `my-agent-project/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base.py       # Base agent class
│   │   └── specialist.py # Domain-specific agents
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── search.py     # Search tools
│   │   └── database.py   # Database tools
│   ├── prompts/
│   │   ├── system.txt    # System prompts
│   │   └── templates.py  # Prompt templates
│   └── config.py         # Configuration
├── tests/
│   ├── test_agents.py
│   └── test_tools.py
├── evals/
│   ├── golden_set.json   # Test cases
│   └── run_evals.py      # Evaluation script
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md`;

const BEST_PRACTICES = [
  {
    category: "Structure",
    practices: [
      "Separate agents, tools, and prompts into their own modules",
      "Use configuration files for model settings and API keys",
      "Keep prompts in text files for easy editing without code changes",
      "Create an `evals/` directory for golden test sets"
    ]
  },
  {
    category: "Error Handling",
    practices: [
      "Implement retry logic with exponential backoff for API calls",
      "Use circuit breakers for external tool dependencies",
      "Add timeout limits on all async operations",
      "Log errors with structured logging (correlation IDs)"
    ]
  },
  {
    category: "Observability",
    practices: [
      "Add OpenTelemetry tracing from day one",
      "Log input/output at agent boundaries",
      "Track token usage and costs per request",
      "Set up alerting on error rates and latency"
    ]
  },
  {
    category: "Testing",
    practices: [
      "Create a golden test set of 50+ expected Q&A pairs",
      "Run evals on every PR before merge",
      "Test edge cases: empty input, very long input, malicious input",
      "Mock external services in unit tests"
    ]
  }
];

export default function AgentTemplatesHub({ onMarkComplete, onNavigateToNext }: AgentTemplatesHubProps) {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(STARTER_TEMPLATES[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const tabs = [
    { id: "templates", label: "Starter Templates", icon: <Folder className="w-4 h-4" /> },
    { id: "quickstart", label: "Quickstart", icon: <Rocket className="w-4 h-4" /> },
    { id: "structure", label: "Project Structure", icon: <GitBranch className="w-4 h-4" /> },
    { id: "best-practices", label: "Best Practices", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Agent Templates Hub
          </CardTitle>
          <CardDescription>
            Ready-to-use starter templates, boilerplates, and quickstart guides—reduce time-to-value from days to hours.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {/* Template Selector */}
          <div className="grid md:grid-cols-5 gap-2">
            {STARTER_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={cn(
                  "p-3 rounded-lg border text-left transition-all",
                  selectedTemplate.id === template.id
                    ? "bg-primary/10 border-primary"
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <div className="font-medium text-sm truncate">{template.name.split(" ")[0]}</div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {template.difficulty}
                </Badge>
              </button>
            ))}
          </div>

          {/* Selected Template */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {selectedTemplate.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{selectedTemplate.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedTemplate.framework}</Badge>
                  <Badge variant="secondary">
                    <Lightning className="w-3 h-3 mr-1" />
                    {selectedTemplate.timeToStart}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Includes */}
              <div>
                <h4 className="text-sm font-medium mb-2">What's Included</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.includes.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Code */}
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(selectedTemplate.code, selectedTemplate.id)}
                  className="absolute top-2 right-2 z-10 p-2 bg-muted/80 rounded-lg hover:bg-muted transition-colors"
                >
                  {copied === selectedTemplate.id ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <CodeBlock language={selectedTemplate.framework.includes("TypeScript") ? "typescript" : "python"} showLineNumbers>
                  {selectedTemplate.code}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quickstart Tab */}
        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Quickstart Guides
              </CardTitle>
              <CardDescription>
                Step-by-step guides to get you from zero to running agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {QUICKSTART_GUIDES.map((guide, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      {guide.title}
                    </h4>
                  </div>
                  <div className="p-4">
                    <ol className="space-y-3">
                      {guide.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                            {stepIdx + 1}
                          </span>
                          <span className="text-sm pt-0.5" dangerouslySetInnerHTML={{ 
                            __html: step.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-muted rounded text-xs font-mono">$1</code>') 
                          }} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Recommended Project Structure
              </CardTitle>
              <CardDescription>
                A production-ready folder layout for agent projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(PROJECT_STRUCTURE, "structure")}
                  className="absolute top-2 right-2 z-10 p-2 bg-muted/80 rounded-lg hover:bg-muted transition-colors"
                >
                  {copied === "structure" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <CodeBlock language="text" showLineNumbers>{PROJECT_STRUCTURE}</CodeBlock>
              </div>

              {/* Directory Explanations */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { dir: "app/agents/", desc: "Agent definitions and orchestration logic", icon: <Brain className="w-4 h-4" /> },
                  { dir: "app/tools/", desc: "Tool implementations and external integrations", icon: <Wrench className="w-4 h-4" /> },
                  { dir: "app/prompts/", desc: "System prompts and templates (easy to edit)", icon: <Code className="w-4 h-4" /> },
                  { dir: "evals/", desc: "Golden test sets and evaluation scripts", icon: <CheckCircle className="w-4 h-4" /> },
                  { dir: "tests/", desc: "Unit and integration tests", icon: <Shield className="w-4 h-4" /> },
                  { dir: ".env.example", desc: "Template for environment variables", icon: <Database className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 border rounded-lg flex items-start gap-3">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <div className="font-mono text-sm font-medium">{item.dir}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Agent Development Best Practices
              </CardTitle>
              <CardDescription>
                Patterns that successful agent teams follow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {BEST_PRACTICES.map((category, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.practices.map((practice, pIdx) => (
                      <div key={pIdx} className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold">Ready to Build?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start with a template, follow the quickstart, and ship your first agent today.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("templates")}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}









