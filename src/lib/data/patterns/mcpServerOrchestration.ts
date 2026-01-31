import { PatternData } from './types';

export const mcpServerOrchestrationPattern: PatternData = {
  id: 'mcp-server-orchestration',
  name: 'MCP Server Orchestration',
  description: 'Manage multiple Model Context Protocol servers as a unified tool layer, enabling dynamic tool discovery, schema federation, and intelligent routing across heterogeneous MCP tool providers.',
  category: 'Communication',
  
  useCases: [
    'IDE agents connecting to filesystem, database, and API MCP servers',
    'Enterprise agents federating tools from multiple departments',
    'Multi-cloud agents routing to provider-specific MCP servers',
    'Tool marketplaces with dynamic MCP server registration',
    'Hybrid local/remote tool execution with MCP'
  ],
  
  whenToUse: 'Use MCP Server Orchestration when your agent needs to consume tools from multiple MCP servers simultaneously. This pattern excels when tools are distributed across different servers (e.g., filesystem tools locally, database tools remotely), when you need dynamic tool discovery without hardcoding, or when building agent platforms that let users bring their own MCP servers.',

  nodes: [
    {
      id: 'mcp-registry',
      type: 'input',
      data: { label: 'MCP Server Registry', nodeType: 'input', description: 'Catalog of available MCP servers' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'discovery',
      type: 'default',
      data: { label: 'Tool Discovery', nodeType: 'tool', description: 'Queries servers for available tools' },
      position: { x: 280, y: 120 }
    },
    {
      id: 'schema-federation',
      type: 'default',
      data: { label: 'Schema Federation', nodeType: 'aggregator', description: 'Merges tool schemas from all servers' },
      position: { x: 280, y: 280 }
    },
    {
      id: 'unified-catalog',
      type: 'default',
      data: { label: 'Unified Tool Catalog', nodeType: 'aggregator', description: 'Single view of all available tools' },
      position: { x: 460, y: 200 }
    },
    {
      id: 'task-planner',
      type: 'default',
      data: { label: 'Task Planner', nodeType: 'llm', description: 'Plans tool usage for task' },
      position: { x: 640, y: 200 }
    },
    {
      id: 'tool-router',
      type: 'default',
      data: { label: 'MCP Tool Router', nodeType: 'router', description: 'Routes calls to correct server' },
      position: { x: 820, y: 200 }
    },
    {
      id: 'mcp-server-1',
      type: 'default',
      data: { label: 'MCP Server: Filesystem', nodeType: 'tool', description: 'Local file operations' },
      position: { x: 1000, y: 80 }
    },
    {
      id: 'mcp-server-2',
      type: 'default',
      data: { label: 'MCP Server: Database', nodeType: 'tool', description: 'SQL query execution' },
      position: { x: 1000, y: 200 }
    },
    {
      id: 'mcp-server-3',
      type: 'default',
      data: { label: 'MCP Server: API', nodeType: 'tool', description: 'External API calls' },
      position: { x: 1000, y: 320 }
    },
    {
      id: 'result-aggregator',
      type: 'default',
      data: { label: 'Result Aggregator', nodeType: 'aggregator', description: 'Combines results from servers' },
      position: { x: 1180, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Orchestrated Response', nodeType: 'output' },
      position: { x: 1360, y: 200 }
    }
  ],

  edges: [
    { id: 'e1', source: 'mcp-registry', target: 'discovery', animated: true },
    { id: 'e2', source: 'mcp-registry', target: 'schema-federation', animated: true },
    { id: 'e3', source: 'discovery', target: 'unified-catalog', animated: true },
    { id: 'e4', source: 'schema-federation', target: 'unified-catalog', animated: true },
    { id: 'e5', source: 'unified-catalog', target: 'task-planner', animated: true },
    { id: 'e6', source: 'task-planner', target: 'tool-router', animated: true },
    { id: 'e7', source: 'tool-router', target: 'mcp-server-1', label: 'file ops' },
    { id: 'e8', source: 'tool-router', target: 'mcp-server-2', label: 'queries' },
    { id: 'e9', source: 'tool-router', target: 'mcp-server-3', label: 'API calls' },
    { id: 'e10', source: 'mcp-server-1', target: 'result-aggregator' },
    { id: 'e11', source: 'mcp-server-2', target: 'result-aggregator' },
    { id: 'e12', source: 'mcp-server-3', target: 'result-aggregator' },
    { id: 'e13', source: 'result-aggregator', target: 'output', animated: true }
  ],

  evaluation: `Evaluating MCP Server Orchestration requires testing federation and routing quality:
- **Discovery Completeness:** Are all tools from all registered servers correctly discovered and cataloged?
- **Schema Conflict Resolution:** When two servers expose tools with the same name, is disambiguation handled correctly?
- **Routing Accuracy:** Are tool calls routed to the correct server based on tool origin?
- **Latency Overhead:** What is the additional latency from the orchestration layer vs. direct server calls?
- **Failure Isolation:** When one MCP server is down, do other servers continue functioning?
- **Dynamic Registration:** Can new MCP servers be added at runtime without restart?`,

  implementation: [
    '1. Build MCP server registry supporting stdio, SSE, and HTTP transports',
    '2. Implement tool discovery that queries each server for its tool list',
    '3. Create schema federation layer that merges tool schemas with namespacing',
    '4. Build routing table mapping each tool to its origin server',
    '5. Implement parallel tool execution for independent operations',
    '6. Add result aggregation for multi-server responses',
    '7. Create health monitoring and circuit breakers for server failures'
  ],

  advantages: [
    'Single unified tool interface for agents regardless of tool distribution',
    'Dynamic tool discovery without hardcoding tool definitions',
    'Separation of concerns: tool servers can be developed independently',
    'Horizontal scaling by adding more MCP servers',
    'Supports hybrid local/remote tool execution',
    'Enables tool marketplaces and user-provided servers'
  ],

  limitations: [
    'Added latency from orchestration layer',
    'Complexity in handling tool name conflicts across servers',
    'Requires robust error handling for partial server failures',
    'Schema federation can exceed context limits with many servers',
    'Debugging cross-server tool chains is challenging'
  ],

  relatedPatterns: ['model-context-protocol', 'skill-augmented-agent', 'agent-to-agent-communication'],

  codeExample: `// MCP Server Orchestration Pattern - TypeScript Implementation
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

// ============================================
// MCP Server Registry Types
// ============================================

interface MCPServerConfig {
  id: string;
  name: string;
  transport: 'stdio' | 'sse' | 'http';
  command?: string;              // For stdio
  args?: string[];               // For stdio
  url?: string;                  // For sse/http
  namespace?: string;            // Optional namespace prefix for tools
  priority?: number;             // For conflict resolution
  healthCheckInterval?: number;
  enabled: boolean;
}

interface DiscoveredTool {
  serverId: string;
  serverName: string;
  name: string;
  namespacedName: string;        // e.g., "filesystem.read_file"
  description: string;
  inputSchema: object;
}

interface ToolCallResult {
  serverId: string;
  toolName: string;
  result: any;
  error?: string;
  latencyMs: number;
}

// ============================================
// MCP Server Connection Manager
// ============================================

class MCPConnectionManager {
  private clients: Map<string, Client> = new Map();
  private configs: Map<string, MCPServerConfig> = new Map();
  private healthStatus: Map<string, boolean> = new Map();

  async connectServer(config: MCPServerConfig): Promise<void> {
    if (!config.enabled) {
      console.log(\`Server \${config.name} is disabled, skipping\`);
      return;
    }

    this.configs.set(config.id, config);

    try {
      let transport;

      if (config.transport === 'stdio') {
        transport = new StdioClientTransport({
          command: config.command!,
          args: config.args || []
        });
      } else if (config.transport === 'sse') {
        transport = new SSEClientTransport(new URL(config.url!));
      } else {
        throw new Error(\`Unsupported transport: \${config.transport}\`);
      }

      const client = new Client({
        name: \`orchestrator-\${config.id}\`,
        version: '1.0.0'
      }, {
        capabilities: { tools: {} }
      });

      await client.connect(transport);
      this.clients.set(config.id, client);
      this.healthStatus.set(config.id, true);

      console.log(\`Connected to MCP server: \${config.name}\`);

      // Start health monitoring
      if (config.healthCheckInterval) {
        this.startHealthCheck(config.id, config.healthCheckInterval);
      }
    } catch (error) {
      console.error(\`Failed to connect to \${config.name}:\`, error);
      this.healthStatus.set(config.id, false);
    }
  }

  private startHealthCheck(serverId: string, intervalMs: number): void {
    setInterval(async () => {
      const client = this.clients.get(serverId);
      if (!client) return;

      try {
        // Ping by listing tools
        await client.listTools();
        this.healthStatus.set(serverId, true);
      } catch {
        this.healthStatus.set(serverId, false);
        console.warn(\`Health check failed for server \${serverId}\`);
      }
    }, intervalMs);
  }

  getClient(serverId: string): Client | undefined {
    return this.clients.get(serverId);
  }

  getConfig(serverId: string): MCPServerConfig | undefined {
    return this.configs.get(serverId);
  }

  isHealthy(serverId: string): boolean {
    return this.healthStatus.get(serverId) ?? false;
  }

  getHealthyServerIds(): string[] {
    return Array.from(this.healthStatus.entries())
      .filter(([_, healthy]) => healthy)
      .map(([id, _]) => id);
  }
}

// ============================================
// Schema Federation
// ============================================

class SchemaFederator {
  private toolCatalog: Map<string, DiscoveredTool> = new Map();
  private serverToTools: Map<string, string[]> = new Map();

  async discoverTools(
    connectionManager: MCPConnectionManager
  ): Promise<DiscoveredTool[]> {
    const healthyServers = connectionManager.getHealthyServerIds();
    const allTools: DiscoveredTool[] = [];

    await Promise.all(healthyServers.map(async (serverId) => {
      const client = connectionManager.getClient(serverId);
      const config = connectionManager.getConfig(serverId);
      if (!client || !config) return;

      try {
        const response = await client.listTools();
        const serverTools: string[] = [];

        for (const tool of response.tools) {
          const namespace = config.namespace || config.id;
          const namespacedName = \`\${namespace}.\${tool.name}\`;

          const discoveredTool: DiscoveredTool = {
            serverId,
            serverName: config.name,
            name: tool.name,
            namespacedName,
            description: tool.description || '',
            inputSchema: tool.inputSchema as object
          };

          this.toolCatalog.set(namespacedName, discoveredTool);
          serverTools.push(namespacedName);
          allTools.push(discoveredTool);
        }

        this.serverToTools.set(serverId, serverTools);
        console.log(\`Discovered \${serverTools.length} tools from \${config.name}\`);
      } catch (error) {
        console.error(\`Failed to discover tools from \${serverId}:\`, error);
      }
    }));

    return allTools;
  }

  getTool(namespacedName: string): DiscoveredTool | undefined {
    return this.toolCatalog.get(namespacedName);
  }

  getToolsByServer(serverId: string): DiscoveredTool[] {
    const toolNames = this.serverToTools.get(serverId) || [];
    return toolNames.map(name => this.toolCatalog.get(name)!).filter(Boolean);
  }

  getAllTools(): DiscoveredTool[] {
    return Array.from(this.toolCatalog.values());
  }

  /**
   * Build OpenAI-compatible tool definitions for LLM
   */
  buildToolDefinitions(): object[] {
    return this.getAllTools().map(tool => ({
      type: 'function',
      function: {
        name: tool.namespacedName.replace(/\\./g, '_'), // OpenAI doesn't allow dots
        description: \`[\${tool.serverName}] \${tool.description}\`,
        parameters: tool.inputSchema
      }
    }));
  }
}

// ============================================
// MCP Tool Router
// ============================================

class MCPToolRouter {
  constructor(
    private connectionManager: MCPConnectionManager,
    private federator: SchemaFederator
  ) {}

  async callTool(
    namespacedName: string,
    args: Record<string, any>
  ): Promise<ToolCallResult> {
    const startTime = Date.now();

    // Handle OpenAI-style names (underscores instead of dots)
    const normalizedName = namespacedName.replace(/_/g, '.');
    const tool = this.federator.getTool(normalizedName);

    if (!tool) {
      return {
        serverId: 'unknown',
        toolName: namespacedName,
        result: null,
        error: \`Tool not found: \${namespacedName}\`,
        latencyMs: Date.now() - startTime
      };
    }

    const client = this.connectionManager.getClient(tool.serverId);
    if (!client) {
      return {
        serverId: tool.serverId,
        toolName: tool.name,
        result: null,
        error: \`Server not connected: \${tool.serverId}\`,
        latencyMs: Date.now() - startTime
      };
    }

    if (!this.connectionManager.isHealthy(tool.serverId)) {
      return {
        serverId: tool.serverId,
        toolName: tool.name,
        result: null,
        error: \`Server unhealthy: \${tool.serverId}\`,
        latencyMs: Date.now() - startTime
      };
    }

    try {
      const response = await client.callTool({
        name: tool.name,
        arguments: args
      });

      return {
        serverId: tool.serverId,
        toolName: tool.name,
        result: response.content,
        latencyMs: Date.now() - startTime
      };
    } catch (error) {
      return {
        serverId: tool.serverId,
        toolName: tool.name,
        result: null,
        error: String(error),
        latencyMs: Date.now() - startTime
      };
    }
  }

  /**
   * Execute multiple tool calls in parallel
   */
  async callToolsParallel(
    calls: Array<{ name: string; args: Record<string, any> }>
  ): Promise<ToolCallResult[]> {
    return Promise.all(
      calls.map(call => this.callTool(call.name, call.args))
    );
  }
}

// ============================================
// MCP Server Orchestrator
// ============================================

class MCPServerOrchestrator {
  private connectionManager: MCPConnectionManager;
  private federator: SchemaFederator;
  private router: MCPToolRouter;

  constructor() {
    this.connectionManager = new MCPConnectionManager();
    this.federator = new SchemaFederator();
    this.router = new MCPToolRouter(this.connectionManager, this.federator);
  }

  /**
   * Initialize orchestrator with server configurations
   */
  async initialize(configs: MCPServerConfig[]): Promise<void> {
    // Connect to all servers in parallel
    await Promise.all(configs.map(config => 
      this.connectionManager.connectServer(config)
    ));

    // Discover all tools
    await this.federator.discoverTools(this.connectionManager);

    console.log(\`Orchestrator ready with \${this.federator.getAllTools().length} tools\`);
  }

  /**
   * Get unified tool catalog for LLM
   */
  getToolDefinitions(): object[] {
    return this.federator.buildToolDefinitions();
  }

  /**
   * Execute a tool call
   */
  async executeTool(name: string, args: Record<string, any>): Promise<ToolCallResult> {
    return this.router.callTool(name, args);
  }

  /**
   * Execute multiple tool calls in parallel
   */
  async executeToolsParallel(
    calls: Array<{ name: string; args: Record<string, any> }>
  ): Promise<ToolCallResult[]> {
    return this.router.callToolsParallel(calls);
  }

  /**
   * Refresh tool discovery (call when servers change)
   */
  async refreshTools(): Promise<void> {
    await this.federator.discoverTools(this.connectionManager);
  }
}

// ============================================
// Example Usage with OpenAI
// ============================================

import OpenAI from 'openai';

async function main() {
  const orchestrator = new MCPServerOrchestrator();

  // Configure MCP servers
  await orchestrator.initialize([
    {
      id: 'filesystem',
      name: 'Filesystem Server',
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@anthropic/mcp-filesystem'],
      namespace: 'fs',
      enabled: true
    },
    {
      id: 'postgres',
      name: 'PostgreSQL Server',
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres'],
      namespace: 'db',
      enabled: true
    },
    {
      id: 'github',
      name: 'GitHub Server',
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@anthropic/mcp-github'],
      namespace: 'github',
      enabled: true
    }
  ]);

  // Get unified tool definitions for LLM
  const tools = orchestrator.getToolDefinitions();
  console.log(\`Available tools: \${tools.length}\`);

  // Use with OpenAI
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant with access to filesystem, database, and GitHub tools.'
      },
      {
        role: 'user',
        content: 'Read the package.json file and list open issues in the repo'
      }
    ],
    tools: tools as any,
    tool_choice: 'auto'
  });

  // Handle tool calls
  if (response.choices[0].message.tool_calls) {
    const toolResults = await Promise.all(
      response.choices[0].message.tool_calls.map(async (toolCall) => {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await orchestrator.executeTool(toolCall.function.name, args);
        return {
          tool_call_id: toolCall.id,
          output: JSON.stringify(result.result)
        };
      })
    );

    console.log('Tool results:', toolResults);
  }
}

main().catch(console.error);`,

  pythonCodeExample: `# MCP Server Orchestration Pattern - Python Implementation
import asyncio
import json
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any
from mcp import Client, StdioServerParameters
from mcp.client.stdio import stdio_client
from openai import OpenAI

# ============================================
# Data Structures
# ============================================

@dataclass
class MCPServerConfig:
    id: str
    name: str
    transport: str  # 'stdio' or 'sse'
    command: Optional[str] = None
    args: List[str] = field(default_factory=list)
    url: Optional[str] = None
    namespace: Optional[str] = None
    priority: int = 0
    enabled: bool = True

@dataclass
class DiscoveredTool:
    server_id: str
    server_name: str
    name: str
    namespaced_name: str
    description: str
    input_schema: dict

@dataclass
class ToolCallResult:
    server_id: str
    tool_name: str
    result: Any
    error: Optional[str] = None
    latency_ms: float = 0

# ============================================
# MCP Connection Manager
# ============================================

class MCPConnectionManager:
    def __init__(self):
        self.clients: Dict[str, Any] = {}  # Client contexts
        self.configs: Dict[str, MCPServerConfig] = {}
        self.health_status: Dict[str, bool] = {}
    
    async def connect_server(self, config: MCPServerConfig) -> None:
        if not config.enabled:
            print(f"Server {config.name} is disabled, skipping")
            return
        
        self.configs[config.id] = config
        
        try:
            if config.transport == 'stdio':
                server_params = StdioServerParameters(
                    command=config.command,
                    args=config.args
                )
                
                # Store the async context manager for later use
                self.clients[config.id] = {
                    'params': server_params,
                    'session': None
                }
                self.health_status[config.id] = True
                print(f"Configured MCP server: {config.name}")
            else:
                raise ValueError(f"Unsupported transport: {config.transport}")
        except Exception as e:
            print(f"Failed to configure {config.name}: {e}")
            self.health_status[config.id] = False
    
    async def get_client_session(self, server_id: str):
        """Get or create a client session for a server."""
        client_info = self.clients.get(server_id)
        if not client_info:
            return None
        return client_info['params']
    
    def is_healthy(self, server_id: str) -> bool:
        return self.health_status.get(server_id, False)
    
    def get_healthy_server_ids(self) -> List[str]:
        return [sid for sid, healthy in self.health_status.items() if healthy]

# ============================================
# Schema Federator
# ============================================

class SchemaFederator:
    def __init__(self):
        self.tool_catalog: Dict[str, DiscoveredTool] = {}
        self.server_to_tools: Dict[str, List[str]] = {}
    
    async def discover_tools(
        self, 
        connection_manager: MCPConnectionManager
    ) -> List[DiscoveredTool]:
        healthy_servers = connection_manager.get_healthy_server_ids()
        all_tools: List[DiscoveredTool] = []
        
        for server_id in healthy_servers:
            config = connection_manager.configs.get(server_id)
            params = await connection_manager.get_client_session(server_id)
            if not config or not params:
                continue
            
            try:
                async with stdio_client(params) as (read, write):
                    async with Client(read, write) as client:
                        await client.initialize()
                        response = await client.list_tools()
                        
                        server_tools = []
                        for tool in response.tools:
                            namespace = config.namespace or config.id
                            namespaced_name = f"{namespace}.{tool.name}"
                            
                            discovered_tool = DiscoveredTool(
                                server_id=server_id,
                                server_name=config.name,
                                name=tool.name,
                                namespaced_name=namespaced_name,
                                description=tool.description or '',
                                input_schema=tool.inputSchema or {}
                            )
                            
                            self.tool_catalog[namespaced_name] = discovered_tool
                            server_tools.append(namespaced_name)
                            all_tools.append(discovered_tool)
                        
                        self.server_to_tools[server_id] = server_tools
                        print(f"Discovered {len(server_tools)} tools from {config.name}")
            except Exception as e:
                print(f"Failed to discover tools from {server_id}: {e}")
        
        return all_tools
    
    def get_tool(self, namespaced_name: str) -> Optional[DiscoveredTool]:
        return self.tool_catalog.get(namespaced_name)
    
    def get_all_tools(self) -> List[DiscoveredTool]:
        return list(self.tool_catalog.values())
    
    def build_tool_definitions(self) -> List[dict]:
        """Build OpenAI-compatible tool definitions."""
        return [
            {
                "type": "function",
                "function": {
                    "name": tool.namespaced_name.replace(".", "_"),
                    "description": f"[{tool.server_name}] {tool.description}",
                    "parameters": tool.input_schema
                }
            }
            for tool in self.get_all_tools()
        ]

# ============================================
# MCP Tool Router
# ============================================

class MCPToolRouter:
    def __init__(
        self, 
        connection_manager: MCPConnectionManager,
        federator: SchemaFederator
    ):
        self.connection_manager = connection_manager
        self.federator = federator
    
    async def call_tool(
        self, 
        namespaced_name: str, 
        args: Dict[str, Any]
    ) -> ToolCallResult:
        import time
        start_time = time.time()
        
        # Normalize name (OpenAI uses underscores)
        normalized_name = namespaced_name.replace("_", ".")
        tool = self.federator.get_tool(normalized_name)
        
        if not tool:
            return ToolCallResult(
                server_id="unknown",
                tool_name=namespaced_name,
                result=None,
                error=f"Tool not found: {namespaced_name}",
                latency_ms=(time.time() - start_time) * 1000
            )
        
        if not self.connection_manager.is_healthy(tool.server_id):
            return ToolCallResult(
                server_id=tool.server_id,
                tool_name=tool.name,
                result=None,
                error=f"Server unhealthy: {tool.server_id}",
                latency_ms=(time.time() - start_time) * 1000
            )
        
        params = await self.connection_manager.get_client_session(tool.server_id)
        if not params:
            return ToolCallResult(
                server_id=tool.server_id,
                tool_name=tool.name,
                result=None,
                error=f"Server not connected: {tool.server_id}",
                latency_ms=(time.time() - start_time) * 1000
            )
        
        try:
            async with stdio_client(params) as (read, write):
                async with Client(read, write) as client:
                    await client.initialize()
                    response = await client.call_tool(tool.name, args)
                    
                    return ToolCallResult(
                        server_id=tool.server_id,
                        tool_name=tool.name,
                        result=response.content,
                        latency_ms=(time.time() - start_time) * 1000
                    )
        except Exception as e:
            return ToolCallResult(
                server_id=tool.server_id,
                tool_name=tool.name,
                result=None,
                error=str(e),
                latency_ms=(time.time() - start_time) * 1000
            )
    
    async def call_tools_parallel(
        self, 
        calls: List[Dict[str, Any]]
    ) -> List[ToolCallResult]:
        return await asyncio.gather(*[
            self.call_tool(call["name"], call["args"])
            for call in calls
        ])

# ============================================
# MCP Server Orchestrator
# ============================================

class MCPServerOrchestrator:
    def __init__(self):
        self.connection_manager = MCPConnectionManager()
        self.federator = SchemaFederator()
        self.router = MCPToolRouter(self.connection_manager, self.federator)
    
    async def initialize(self, configs: List[MCPServerConfig]) -> None:
        # Connect to all servers
        await asyncio.gather(*[
            self.connection_manager.connect_server(config)
            for config in configs
        ])
        
        # Discover all tools
        await self.federator.discover_tools(self.connection_manager)
        print(f"Orchestrator ready with {len(self.federator.get_all_tools())} tools")
    
    def get_tool_definitions(self) -> List[dict]:
        return self.federator.build_tool_definitions()
    
    async def execute_tool(
        self, 
        name: str, 
        args: Dict[str, Any]
    ) -> ToolCallResult:
        return await self.router.call_tool(name, args)
    
    async def execute_tools_parallel(
        self, 
        calls: List[Dict[str, Any]]
    ) -> List[ToolCallResult]:
        return await self.router.call_tools_parallel(calls)

# ============================================
# Usage with OpenAI
# ============================================

async def main():
    orchestrator = MCPServerOrchestrator()
    
    # Configure MCP servers
    await orchestrator.initialize([
        MCPServerConfig(
            id="filesystem",
            name="Filesystem Server",
            transport="stdio",
            command="npx",
            args=["-y", "@anthropic/mcp-filesystem"],
            namespace="fs",
            enabled=True
        ),
        MCPServerConfig(
            id="postgres",
            name="PostgreSQL Server",
            transport="stdio",
            command="npx",
            args=["-y", "@modelcontextprotocol/server-postgres"],
            namespace="db",
            enabled=True
        )
    ])
    
    # Get unified tool definitions
    tools = orchestrator.get_tool_definitions()
    print(f"Available tools: {len(tools)}")
    
    # Use with OpenAI
    client = OpenAI()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You have access to filesystem and database tools."},
            {"role": "user", "content": "Read the package.json and list all tables in the database"}
        ],
        tools=tools,
        tool_choice="auto"
    )
    
    # Handle tool calls
    if response.choices[0].message.tool_calls:
        for tool_call in response.choices[0].message.tool_calls:
            args = json.loads(tool_call.function.arguments)
            result = await orchestrator.execute_tool(tool_call.function.name, args)
            print(f"Tool {tool_call.function.name}: {result.result}")

if __name__ == "__main__":
    asyncio.run(main())`,

  businessUseCase: {
    industry: 'Enterprise Software',
    description: 'A development platform company deploys MCP Server Orchestration to unify tools across their entire toolchain. Developers get a single agent interface that seamlessly accesses their IDE filesystem, internal APIs, databases, and cloud services through federated MCP servers.',
    visualization: {
      type: 'flow',
      layout: 'horizontal',
      steps: [
        'Developer query → Orchestrator',
        'Tool discovery across 5 MCP servers',
        'Schema federation into unified catalog',
        'LLM plans multi-tool execution',
        'Parallel routing to filesystem, DB, API servers',
        'Result aggregation → Developer response'
      ]
    },
    enlightenMePrompt: 'How would you design an MCP server marketplace where users can discover, install, and use community-created MCP servers with automatic conflict resolution?'
  },

  velocityProfile: {
    timeToFirstToken: 'Low - unified catalog means no per-call discovery',
    totalDuration: 'Medium - adds routing layer but enables parallelism',
    cost: 'Variable - depends on number of servers and tools used'
  }
};
