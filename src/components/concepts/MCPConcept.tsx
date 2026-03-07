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
import { Shield, Plug, Lock, Database, Code, Sparkle, Atom, Scales } from "@phosphor-icons/react"
import { ProtocolMessageDissector, CapabilityNegotiationViz, TransportLayerExplorer, ServerRegistrySimulator } from './MCPAtomicVisuals'
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { ReflectionPrompt } from "@/components/ui/ReflectionPrompt";

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
      id: 'atomic',
      title: '⚛ Atomic',
      description: 'Interactive deep-dives into MCP protocol internals',
      icon: <Atom className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">⚛ Atomic Deep Dive — MCP Internals</h2>
            <p className="text-muted-foreground">Dissect the protocol at the wire level: JSON-RPC messages, capability negotiation, transport layers, and server discovery.</p>
          </div>
          <ProtocolMessageDissector />
          <CapabilityNegotiationViz />
          <TransportLayerExplorer />
          <ServerRegistrySimulator />
          {/* Challenge Ladder */}
          <div className="mt-10 p-6 rounded-xl border bg-muted/40">
            <h3 className="text-lg font-bold mb-3">🧗 Challenge Ladder</h3>
            <div className="space-y-2 text-sm">
              <div><Badge variant="outline" className="mr-2">Beginner</Badge> Step through all 7 handshake messages and explain what each field in the initialize request means.</div>
              <div><Badge variant="outline" className="mr-2">Intermediate</Badge> Disable server "tools" capability — what happens when a client tries to call tools/list? How should the client handle this?</div>
              <div><Badge variant="outline" className="mr-2">Advanced</Badge> Design a custom MCP server that exposes 3 tools for a database. Specify the JSON-RPC messages for initialization, tool discovery, and a tool call with error handling.</div>
            </div>
          </div>
        </div>
      ),
    },
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
                src="/images/MCP.webp" 
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
                  <h4 className="font-semibold text-foreground mb-2">Without MCP</h4>
                  <ul className="space-y-1 text-lg">
                    <li>• Custom integrations for each tool</li>
                    <li>• Inconsistent security practices</li>
                    <li>• No standardized error handling</li>
                    <li>• Difficult to maintain and scale</li>
                    <li>• Limited tool discoverability</li>
                  </ul>
                </div>
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">With MCP</h4>
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

          {/* MCP Protocol Handshake Sequence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="w-5 h-5" />
                MCP Protocol Handshake
              </CardTitle>
              <CardDescription>How a client discovers and connects to an MCP server</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram
                chart={`sequenceDiagram
  participant C as MCP Client
  participant S as MCP Server
  C->>S: Initialize (protocol version, capabilities)
  S-->>C: Initialize Response (server capabilities)
  C->>S: List Tools
  S-->>C: Tool Definitions (name, schema, description)
  C->>S: Call Tool (name, arguments)
  S-->>C: Tool Result (content, isError)
  Note over C,S: JSON-RPC 2.0 over stdio or HTTP+SSE`}
                title="MCP Client-Server Handshake"
              />
            </CardContent>
          </Card>

          <ReflectionPrompt
            question="Before moving to the Architecture tab: how is MCP different from just calling a REST API? What does the handshake buy you that a plain HTTP call doesn't?"
            hint="Think about tool discovery, schema validation, and the ability to swap servers without changing client code."
          />

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
                  <h4 className="font-semibold text-foreground mb-2">
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
                  <h4 className="font-semibold text-foreground mb-2">
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
    },
    {
      id: 'mcp-vs-a2a',
      title: 'MCP vs A2A',
      description: 'When MCP breaks down and A2A takes over — the real architectural tradeoffs',
      icon: <Scales className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Headline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scales className="w-5 h-5" />
                MCP vs A2A — The Honest Architectural Comparison
              </CardTitle>
              <CardDescription>
                MCP and A2A solve fundamentally different problems. Treating them as interchangeable is
                the most common mistake teams make when scaling agent systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">⚠ Key Insight</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Presenting MCP as a permanent replacement for A2A is architecturally shortsighted.
                  As agents move from handling simple 5-minute tasks to complex, multi-day enterprise workflows,
                  the rigid "Agent-as-a-Tool" abstraction breaks down under context window limits,
                  timeout issues, and the lack of true asynchronous task lifecycles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Visual */}
          <figure className="my-6">
            <img
              src="/images/MCP_is_not_equal_to_A2A.webp"
              alt="MCP is not equal to A2A — architectural comparison diagram showing the fundamental differences between tool-calling and agent-to-agent delegation"
              className="w-full rounded-2xl shadow-lg border border-border"
              loading="lazy"
            />
          </figure>

          {/* Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Challenges with the "Agent-as-MCP-Tool" Approach</CardTitle>
              <CardDescription>
                Adopting MCP for everything works at prototype scale. Here's what breaks when your multi-agent system grows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-red-700 dark:text-red-300">1. The "Context Window" Flood</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  MCP's <code className="bg-muted px-1 rounded text-xs">call_tool</code> returns strings (or base64 data) directly
                  into the calling agent's LLM context window. If your Technical Architect agent generates a 5,000-line
                  codebase, that massive text block floods the Orchestrator's prompt.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  A2A solution → Pass references (URIs to shared workspaces or artifact stores) to avoid token exhaustion.
                </p>
              </div>

              <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-red-700 dark:text-red-300">2. Long-Running Tasks &amp; Timeouts</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  MCP is essentially a Remote Procedure Call (RPC). If the "Agent-as-Tool" takes 20 minutes to
                  research, compile a report, and respond, standard HTTP/MCP clients will likely time out.
                  Managing async multi-hour agents behind a synchronous <code className="bg-muted px-1 rounded text-xs">call_tool</code> abstraction
                  requires messy polling loops.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  A2A solution → Async-first lifecycle with webhooks, SSE, or event buses.
                </p>
              </div>

              <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-red-700 dark:text-red-300">3. The "Strict Schema" Mismatch</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  MCP requires the client to know the exact JSON schema of the tool. But autonomous agents work
                  best with <strong>goals</strong>, not strict parameters. Forcing a complex agent behind a rigid
                  function signature reduces the semantic richness of agent-to-agent delegation.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  A2A solution → Goal/intent passing with natural language task delegation + context payloads.
                </p>
              </div>

              <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-red-700 dark:text-red-300">4. Opaque Error Handling</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  If the remote agent fails internally, the MCP orchestrator just receives a tool error string. The
                  LLM must read the string and figure out what to do.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  A2A solution → Structured protocol errors: <code className="bg-muted px-1 rounded text-xs">TaskFailed</code>,{' '}
                  <code className="bg-muted px-1 rounded text-xs">RetryRequested</code>,{' '}
                  <code className="bg-muted px-1 rounded text-xs">NeedsClarification</code>
                  — errors an Orchestrator can systematically manage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Architectural Comparison — MCP vs A2A</CardTitle>
              <CardDescription>The real differences between the two paradigms, dimension by dimension.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 bg-muted/50 w-1/4">Dimension</th>
                      <th className="text-left py-3 px-3 font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/30 w-[37.5%]">MCP</th>
                      <th className="text-left py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 w-[37.5%]">A2A</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Primary Abstraction</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Client-Server Tooling — exposes specific functions and static resources to a single LLM</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Peer-to-Peer Delegation — connects autonomous entities to collaborate on goals</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Invocation Method</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">JSON-RPC via <code className="bg-muted px-1 rounded text-xs">call_tool</code> — requires exact JSON Schema adherence</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Goal/intent passing — natural language task delegation + context payloads</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">State &amp; Memory</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Stateless by default — requires framework workarounds (e.g., session IDs) or passing context back and forth</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Stateful by default — agents maintain independent memory; protocols track shared task state</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Execution Lifecycle</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Synchronous / short-lived — designed for fast tool execution; long tasks require polling</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Async-first — natively supports multi-hour/day lifecycles via webhooks, SSE, or event buses</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Artifact Handover</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Context-heavy — returns raw text/data directly into the calling LLM's context window</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Reference-based — agents pass pointers/URIs to shared workspaces, saving token limits</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Discovery</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Static list — server exposes available tools upon connection</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Dynamic / semantic — Agent Cards; agents discover each other by skills and SLAs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Topology</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Hierarchical / star — the LLM Client is the centre; Tools are spokes</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Mesh / graph — any agent can delegate to any other agent organically</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Human-in-the-Loop</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Handled purely on the Client side before the tool is executed</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Built into the protocol — <code className="bg-muted px-1 rounded text-xs">INPUT_REQUIRED</code> state halts execution across the network</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-gray-100">Error Handling</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Simple string returns (<code className="bg-muted px-1 rounded text-xs">isError: true</code>) — LLM reads the string and decides</td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">Structured protocol errors: <code className="bg-muted px-1 rounded text-xs">RateLimited</code>, <code className="bg-muted px-1 rounded text-xs">DependencyFailed</code>, <code className="bg-muted px-1 rounded text-xs">NeedsClarification</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Decision Framework */}
          <Card>
            <CardHeader>
              <CardTitle>When to Use Which</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">✅ Use MCP When</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                    <li>• Tool calls complete in seconds, not minutes</li>
                    <li>• Responses fit comfortably in a context window</li>
                    <li>• You need one LLM to access structured external resources</li>
                    <li>• The interaction is request → response (no multi-step negotiation)</li>
                    <li>• You want a standardised tool interface across multiple AI clients</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">✅ Use A2A When</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                    <li>• Tasks take minutes to days to complete</li>
                    <li>• Agents produce large artifacts that shouldn't flood context</li>
                    <li>• You need peer-to-peer delegation, not hierarchical tool calls</li>
                    <li>• Human-in-the-loop checkpoints are required mid-workflow</li>
                    <li>• Dynamic agent discovery based on skills and availability matters</li>
                  </ul>
                </div>
              </div>
              <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
                <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">🔗 Best Practice: Use Both</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Production agent systems typically use <strong>MCP at the edges</strong> (connecting agents to databases,
                  APIs, file systems) and <strong>A2A in the middle</strong> (orchestrating multi-agent workflows).
                  They complement each other — MCP gives agents hands; A2A gives agents colleagues.
                </p>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="MCP vs A2A"
            contextDescription="Architectural comparison between MCP and A2A protocols — when each paradigm shines and where it breaks down"
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















