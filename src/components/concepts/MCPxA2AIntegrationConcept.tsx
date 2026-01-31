import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MCPxA2AIntegrationFlow from "../visualization/MCPxA2AIntegrationFlow"
import { ArrowsHorizontal, Shield, LinkSimple, Sparkle, Info, Lightbulb, ChefHat, Toolbox, CheckCircle, XCircle, ArrowRight, Question, Users, Database, Brain } from "@phosphor-icons/react"

interface MCPxA2AIntegrationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function MCPxA2AIntegrationConcept({ onMarkComplete, onNavigateToNext }: MCPxA2AIntegrationConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'MCP x A2A Basics',
      description: 'Understanding the integration between MCP and A2A systems',
      icon: <LinkSimple className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* THE BIG PICTURE - Restaurant Kitchen Analogy */}
          <div className="p-6 rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-emerald-500/10">
                <Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" weight="duotone" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">🍳 The Restaurant Kitchen Analogy</h3>
                  <p className="text-sm text-muted-foreground mt-1">Understanding when to use A2A vs MCP</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-2">
                      <ChefHat className="w-5 h-5 text-orange-500" weight="duotone" />
                      <h4 className="font-semibold text-sm text-orange-700 dark:text-orange-300">A2A = Chef-to-Chef</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Sous chef, I need you to prepare the appetizers while I focus on the main course."
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Peer collaboration</li>
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Task delegation</li>
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Autonomous decisions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Toolbox className="w-5 h-5 text-blue-500" weight="duotone" />
                      <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">MCP = Chef-to-Tool</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Oven, preheat to 400°F. Timer, set for 20 minutes."
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Tool invocation</li>
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Data access</li>
                      <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> API calls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WHEN TO USE WHICH - Decision Guide */}
          <Card className="border-2 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <Question className="w-5 h-5" weight="duotone" />
                When to Use Which? (Decision Guide)
              </CardTitle>
              <CardDescription>Ask yourself these questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Use A2A */}
                <div className="p-4 rounded-lg border-2 border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Use A2A When...
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>You need <strong>another agent's expertise</strong> (research, analysis, specialized knowledge)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>The task requires <strong>autonomous decision-making</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>You want to <strong>delegate and forget</strong> (async, long-running)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>The other party can <strong>reason and adapt</strong> to unexpected situations</span>
                    </li>
                  </ul>
                  <div className="mt-3 p-2 rounded bg-orange-100 dark:bg-orange-800/30 text-xs">
                    <strong>Example:</strong> "Research Agent, analyze market trends for Q4 and give me recommendations"
                  </div>
                </div>

                {/* Use MCP */}
                <div className="p-4 rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" /> Use MCP When...
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>You need <strong>data from a database</strong> or API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>The operation is <strong>deterministic</strong> (same input → same output)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>You need to <strong>call a function/tool</strong> with specific parameters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>The tool <strong>can't think</strong> - it just executes commands</span>
                    </li>
                  </ul>
                  <div className="mt-3 p-2 rounded bg-blue-100 dark:bg-blue-800/30 text-xs">
                    <strong>Example:</strong> "Database, SELECT * FROM orders WHERE date {'>'} '2024-01-01'"
                  </div>
                </div>
              </div>

              {/* The Key Insight */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-300 dark:border-purple-700">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-purple-600 flex-shrink-0" weight="duotone" />
                  <div>
                    <h4 className="font-bold text-purple-800 dark:text-purple-200">💡 The Key Insight</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Can the other party THINK?</strong> If yes → A2A. If no → MCP.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      An A2A agent often uses MCP internally. When Research Agent analyzes market trends (A2A task), 
                      it might query databases, call APIs, and search the web (MCP tools) to complete the work.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Relationship Clarification */}
          <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Complementary Protocols (Not Competing)</p>
                <p className="text-sm text-muted-foreground">
                  <strong>A2A</strong> = Agent-to-Agent (peer collaboration between autonomous agents)<br/>
                  <strong>MCP</strong> = Agent-to-Tool (connecting agents to tools, APIs, data sources)<br/>
                  An A2A agent may use MCP internally to access tools needed to complete tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Integration Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkSimple className="w-5 h-5" />
                MCP x A2A Integration Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                The integration of Model Context Protocol (MCP) with Agent-to-Agent (A2A) communication 
                creates a powerful framework where agents can collaborate with peers (A2A) while 
                securely accessing external tools and resources (MCP).
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Integration Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Layered Architecture:</strong> A2A for agent coordination, MCP for tool access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Secure Tool Sharing:</strong> Agents can expose MCP tools to A2A peers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Capability Discovery:</strong> Agent Cards advertise available MCP tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Unified Security:</strong> Consistent auth across both protocol layers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Components */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    MCP Server Bridge
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Exposes MCP tools through A2A communication protocols
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ArrowsHorizontal className="w-4 h-4" />
                    A2A Tool Proxy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Allows A2A agents to discover and invoke remote MCP tools
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Integration Flow',
      description: 'Visualize how MCP and A2A work together',
      icon: <ArrowsHorizontal className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Interactive Flow Visualization */}
          <MCPxA2AIntegrationFlow />

          {/* Protocol Mapping */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    MCP to A2A Message Translation
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• MCP tool calls → A2A service requests</li>
                    <li>• MCP resources → A2A capability advertisements</li>
                    <li>• MCP notifications → A2A event broadcasts</li>
                    <li>• MCP errors → A2A exception handling</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Security Considerations
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Authentication between MCP and A2A layers</li>
                    <li>• Authorization for tool access</li>
                    <li>• Encryption of sensitive data</li>
                    <li>• Audit logging for compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Implementation Guide',
      description: 'Build MCP x A2A integration systems',
      icon: <Shield className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Set Up MCP Server</h4>
                    <p className="text-sm text-muted-foreground">
                      Create an MCP server that exposes tools and resources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Implement A2A Bridge</h4>
                    <p className="text-sm text-muted-foreground">
                      Build a bridge that translates between MCP and A2A protocols
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Configure Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up authentication, authorization, and encryption
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Test Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate tool discovery, invocation, and error handling
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Example Integration Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// MCP to A2A Bridge
class MCPToA2ABridge {
  constructor(mcpServer, a2aClient) {
    this.mcpServer = mcpServer;
    this.a2aClient = a2aClient;
  }

  async discoverTools() {
    const mcpTools = await this.mcpServer.listTools();
    
    // Register tools with A2A system
    for (const tool of mcpTools) {
      await this.a2aClient.registerCapability({
        name: tool.name,
        description: tool.description,
        handler: (params) => this.invokeMCPTool(tool.name, params)
      });
    }
  }

  async invokeMCPTool(toolName, params) {
    try {
      const result = await this.mcpServer.callTool(toolName, params);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Patterns',
      description: 'Explore sophisticated integration patterns',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Integration Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Distributed Tool Registry</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain a distributed registry of available MCP tools across A2A network
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tool Composition</h4>
                  <p className="text-sm text-muted-foreground">
                    Combine multiple MCP tools into complex A2A workflows
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Capability Negotiation</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents negotiate tool access and resource sharing dynamically
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Federated Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement federated authentication and authorization across systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Performance Optimization
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Cache tool discovery results</li>
                    <li>• Use connection pooling for MCP servers</li>
                    <li>• Implement circuit breakers for reliability</li>
                    <li>• Monitor latency and throughput</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Scalability Patterns
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Load balance across multiple MCP servers</li>
                    <li>• Implement horizontal scaling for bridges</li>
                    <li>• Use event-driven architecture</li>
                    <li>• Design for graceful degradation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="mcp-a2a-integration"
      title="MCP x A2A Integration"
      description="Learn how to integrate Model Context Protocol with Agent-to-Agent communication"
      tabs={tabs}
      nextConcept={{
        id: 'flow-visualization',
        title: 'Flow Visualization',
        description: 'Interactive visualization of agent flows'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}







