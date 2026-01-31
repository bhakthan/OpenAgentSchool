import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MCPArchitectureDiagram from "./MCPArchitectureDiagram"
import MCPDemo from "../interactive-demos/MCPDemo"
import MCPVisualDemo from "../interactive-demos/MCPVisualDemo"
import MCPToolCallingAnimation from "./MCPToolCallingAnimation"
import MCPToolCallingCode from "./MCPToolCallingCode"
import ClaudeSkillsMCPFlow from "../visualization/ClaudeSkillsMCPFlow"
import ReferenceSection from "../references/ReferenceSection"
import { Shield, Plug, Lock, Database, Code, Sparkle } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

interface MCPConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function MCPConcept({ onMarkComplete, onNavigateToNext }: MCPConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('mcp');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    {
      id: 'fundamentals',
      title: 'MCP Basics',
      description: 'Learn about the Model Context Protocol',
      icon: <Shield className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Basic Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                What is Model Context Protocol (MCP)?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Model Context Protocol (MCP) is a standardized protocol that enables AI agents to 
                securely access and interact with external tools, databases, and services. It acts 
                as a bridge between AI models and the real world, allowing agents to perform actions 
                beyond text generation.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Security:</strong> Controlled access to external resources with authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Standardization:</strong> Consistent interface across different tools and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Extensibility:</strong> Easy integration of new tools and capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Reliability:</strong> Error handling and validation for robust operations</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* MCP Architecture Infographic */}
          <Card>
            <CardContent className="pt-6">
              <img 
                src="/images/MCP.png" 
                alt="Model Context Protocol Architecture - The USB-C for AI Agents showing tool integration and data flow"
                className="w-full rounded-lg border border-border/50"
              />
            </CardContent>
          </Card>

          {/* Problem it Solves */}
          <Card>
            <CardHeader>
              <CardTitle>Problem & Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Without MCP</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Custom integrations for each tool</li>
                    <li>• Inconsistent security practices</li>
                    <li>• No standardized error handling</li>
                    <li>• Difficult to maintain and scale</li>
                    <li>• Limited tool discoverability</li>
                  </ul>
                </div>
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">With MCP</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Standardized protocol for all tools</li>
                    <li>• Built-in authentication and authorization</li>
                    <li>• Consistent error handling and validation</li>
                    <li>• Easy to add new tools and services</li>
                    <li>• Automatic tool discovery and documentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <MCPDemo />

          {/* References */}
          <ReferenceSection type="concept" itemId="mcp" />

          <EnlightenMeButton
            title="MCP Basics"
            contextDescription="Learn about the Model Context Protocol"
          />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'MCP Architecture',
      description: 'Understand the technical components of MCP',
      icon: <Plug className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Components */}
          <Card>
            <CardHeader>
              <CardTitle>MCP Architecture Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">MCP Client</h5>
                  <p className="text-lg text-muted-foreground">
                    The AI agent that needs to access external tools and services
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">MCP Server</h5>
                  <p className="text-lg text-muted-foreground">
                    Provides access to specific tools or services through standardized endpoints
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Protocol Layer</h5>
                  <p className="text-lg text-muted-foreground">
                    Handles message formatting, authentication, and communication between client and server
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Diagram */}
          <MCPArchitectureDiagram />

          {/* Message Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Message Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Discovery</h4>
                    <p className="text-lg text-muted-foreground">
                      Client discovers available tools and their capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Authentication</h4>
                    <p className="text-lg text-muted-foreground">
                      Client authenticates with the MCP server
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Tool Invocation</h4>
                    <p className="text-lg text-muted-foreground">
                      Client sends tool requests with structured parameters
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Response</h4>
                    <p className="text-lg text-muted-foreground">
                      Server processes request and returns structured response
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="MCP Architecture"
            contextDescription="Understand the technical components of MCP"
          />
        </div>
      )
    },
    {
      id: 'claude-skills',
      title: 'Claude Skills + MCP',
      description: 'See how Claude Skills layer on MCP for context-rich workflows',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Claude Skills Flow Visualization */}
          <ClaudeSkillsMCPFlow autoPlay={false} />

          {/* Explanation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Claude Skills</CardTitle>
              <CardDescription>
                How Anthropic's Skills extend MCP capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Claude Skills represent the next evolution of MCP, providing a higher-level 
                abstraction that enables context-rich, multi-step workflows. While MCP provides 
                the standardized protocol for tool access, Skills add intelligence and context 
                engineering capabilities.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-primary">MCP Foundation</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                      <span>Standardized protocol for tool access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                      <span>Resource discovery and authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                      <span>Secure communication channel</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-primary">Skills Enhancement</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                      <span>Context engineering from resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                      <span>Natural language workflow orchestration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                      <span>Context persistence across interactions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                <h4 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">
                  Key Insight: Context Engineering
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  The power of Claude Skills lies in <strong>context engineering</strong> – 
                  the ability to automatically gather, synthesize, and maintain relevant context 
                  from multiple resources before executing tools. This means Claude can make 
                  more informed decisions and execute multi-step workflows with minimal human 
                  intervention.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Skills Components</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Resources</Badge>
                    <p className="text-sm text-muted-foreground">
                      Data sources (files, databases, APIs) that provide context for decision-making
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Tools</Badge>
                    <p className="text-sm text-muted-foreground">
                      Functions that perform actions on external systems via MCP protocol
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Prompts</Badge>
                    <p className="text-sm text-muted-foreground">
                      Pre-engineered templates that guide Claude's reasoning and tool selection
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Sampling</Badge>
                    <p className="text-sm text-muted-foreground">
                      Claude's decision-making process for selecting and orchestrating tools
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Example: Research Assistant Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  See how a Research Assistant Skill uses MCP + context engineering:
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <h5 className="font-semibold text-sm">User Request</h5>
                      <p className="text-sm text-muted-foreground">
                        "Summarize recent papers on transformer architectures"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <h5 className="font-semibold text-sm">Context Building (via MCP)</h5>
                      <p className="text-sm text-muted-foreground">
                        Accesses academic databases, personal research library, and citation networks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <h5 className="font-semibold text-sm">Skill Orchestration</h5>
                      <p className="text-sm text-muted-foreground">
                        Identifies relevant papers, extracts key findings, synthesizes insights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">4️⃣</span>
                    <div>
                      <h5 className="font-semibold text-sm">Context-Rich Response</h5>
                      <p className="text-sm text-muted-foreground">
                        Delivers comprehensive summary with citations and personalized recommendations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Claude Skills + MCP"
            contextDescription="Master context engineering and Skills-based workflows with MCP"
          />
        </div>
      )
    },
    {
      id: 'tool-calling',
      title: 'Tool Calling',
      description: 'Interactive visualization of the MCP tool calling flow',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Interactive Animation */}
          <MCPToolCallingAnimation />

          {/* Code Examples */}
          <MCPToolCallingCode />

          <EnlightenMeButton
            title="MCP Tool Calling"
            contextDescription="Master the tool calling flow in Model Context Protocol"
          />
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Tool Integration',
      description: 'Learn how to integrate tools using MCP',
      icon: <Database className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Visual Demo */}
          <MCPVisualDemo />

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Define Tool Schema</h4>
                    <p className="text-lg text-muted-foreground">
                      Create JSON schema defining tool inputs, outputs, and capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Implement MCP Server</h4>
                    <p className="text-lg text-muted-foreground">
                      Create server that exposes tools through MCP protocol
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Add Authentication</h4>
                    <p className="text-lg text-muted-foreground">
                      Implement secure authentication and authorization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Test & Deploy</h4>
                    <p className="text-lg text-muted-foreground">
                      Validate integration and deploy with monitoring
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Example MCP Tool Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md">
                <pre className="text-lg">
{`{
  "name": "search_database",
  "description": "Search a database for records",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query"
      },
      "limit": {
        "type": "integer",
        "description": "Max results",
        "default": 10
      }
    },
    "required": ["query"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "results": {
        "type": "array",
        "items": { "type": "object" }
      },
      "total": { "type": "integer" }
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Tool Integration"
            contextDescription="Learn how to integrate tools using MCP"
          />
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced MCP',
      description: 'Explore advanced MCP patterns and best practices',
      icon: <Lock className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced MCP Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Composite Tools</h4>
                  <p className="text-lg text-muted-foreground">
                    Tools that orchestrate multiple sub-tools for complex operations
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Streaming Responses</h4>
                  <p className="text-lg text-muted-foreground">
                    Handle long-running operations with streaming or chunked responses
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tool Chaining</h4>
                  <p className="text-lg text-muted-foreground">
                    Automatically chain tool outputs as inputs to subsequent tools
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Context Preservation</h4>
                  <p className="text-lg text-muted-foreground">
                    Maintain state and context across multiple tool invocations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Security & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Security Considerations
                  </h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Validate all inputs and sanitize outputs</li>
                    <li>• Implement rate limiting and access controls</li>
                    <li>• Use secure communication protocols (HTTPS)</li>
                    <li>• Audit and log all tool interactions</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Performance Optimization
                  </h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Cache frequently accessed data</li>
                    <li>• Use connection pooling for databases</li>
                    <li>• Implement timeout and retry policies</li>
                    <li>• Monitor tool performance and usage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Advanced MCP"
            contextDescription="Explore advanced MCP patterns and best practices"
          />
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="mcp"
      title="Model Context Protocol (MCP)"
      description="Learn about secure tool integration protocol that enables AI agents to access external resources"
      tabs={tabs}
      nextConcept={{
        id: 'acp',
        title: 'Agent Communication Protocol',
        description: 'Advanced protocols for agent coordination'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}






