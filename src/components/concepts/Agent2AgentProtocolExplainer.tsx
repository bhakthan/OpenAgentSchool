import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, PuzzlePiece, Wrench, Gear, BracketsCurly, Code, Lightbulb, Users, CookingPot, Phone, ChefHat, Toolbox, ArrowsLeftRight } from "@phosphor-icons/react";
import BusinessUseCaseSection from "./BusinessUseCaseSection";
import { Clipboard } from "@phosphor-icons/react";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles";
import { cn } from "@/lib/utils";

const Agent2AgentProtocolExplainer = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>A Beginner's Guide to Agent2Agent (A2A) Protocol</CardTitle>
          <CardDescription>Understanding how AI agents communicate and collaborate</CardDescription>
          
          {/* Audio Narration Controls */}
          <AudioNarrationControls 
            componentName="Agent2AgentProtocolExplainer"
            position="embedded"
          />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* v1.0 Release Candidate Notice */}
          <div className="p-4 rounded-lg border-2 border-blue-500/30 bg-blue-500/5">
            <div className="flex items-start gap-3">
              <Badge className="ring-1 bg-blue-100 ring-blue-300 text-blue-800 dark:bg-blue-900/30 dark:ring-blue-700 dark:text-blue-300">v1.0 RC</Badge>
              <div className="space-y-1">
                <p className="font-semibold text-sm">A2A Protocol v1.0 Release Candidate - Now Under Linux Foundation</p>
                <p className="text-sm text-muted-foreground">
                  The A2A Protocol is now governed by the Linux Foundation with a Technical Steering Committee including 
                  representatives from Google, Microsoft, IBM, AWS, Cisco, Salesforce, ServiceNow, and SAP. 
                  <strong className="text-foreground"> IBM's Agent Communication Protocol (ACP) has officially merged into A2A</strong>, 
                  bringing together the best of both protocols for unified agent interoperability.
                </p>
              </div>
            </div>
          </div>

          {/* THE BIG PICTURE - New Section for Beginners */}
          <div className="p-6 rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-emerald-500/10">
                <Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" weight="duotone" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-foreground">🍳 The Restaurant Kitchen Analogy</h3>
                  <p className="text-sm text-muted-foreground mt-1">The simplest way to understand A2A and MCP</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-2">
                      <ChefHat className="w-5 h-5 text-orange-500" weight="duotone" />
                      <h4 className="font-semibold text-sm">A2A = Chefs Talking</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The <strong>head chef</strong> delegates to the <strong>sous chef</strong>, who coordinates with the <strong>pastry chef</strong>. 
                      They communicate using professional kitchen language ("Fire table 5!", "Behind you!").
                    </p>
                    <div className="mt-2 text-xs bg-orange-100 dark:bg-orange-900/30 text-foreground px-2 py-1 rounded">
                      Agent → Agent collaboration
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Toolbox className="w-5 h-5 text-blue-500" weight="duotone" />
                      <h4 className="font-semibold text-sm">MCP = Chefs Using Tools</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Each chef uses their <strong>specific tools</strong>: the grill, the mixer, the oven. 
                      They know how to operate their equipment safely and efficiently.
                    </p>
                    <div className="mt-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-foreground px-2 py-1 rounded">
                      Agent → Tool connection
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-700">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowsLeftRight className="w-5 h-5 text-purple-600" weight="duotone" />
                    <h4 className="font-semibold text-sm text-foreground">Together: A Functioning Kitchen</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The <strong>head chef (coordinator agent)</strong> receives an order and uses <strong>A2A</strong> to delegate: 
                    "Sous chef, prepare the steak. Pastry chef, make the dessert." Each chef then uses <strong>MCP</strong> to access 
                    their tools: the grill, the oven, the mixer. The result? A complete meal prepared by specialists working together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Mental Model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Users className="w-8 h-8 mx-auto text-orange-600" weight="duotone" />
                  <h4 className="font-bold text-foreground">A2A</h4>
                  <p className="text-xs text-muted-foreground">Agent ↔ Agent</p>
                  <p className="text-sm">"Hey Research Agent, can you look this up for me?"</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Toolbox className="w-8 h-8 mx-auto text-blue-600" weight="duotone" />
                  <h4 className="font-bold text-foreground">MCP</h4>
                  <p className="text-xs text-muted-foreground">Agent → Tool</p>
                  <p className="text-sm">"Database, give me all orders from last week"</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <ArrowsLeftRight className="w-8 h-8 mx-auto text-purple-600" weight="duotone" />
                  <h4 className="font-bold text-foreground">Together</h4>
                  <p className="text-xs text-muted-foreground">Complementary</p>
                  <p className="text-sm">A2A agent uses MCP to access its tools internally</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="prose max-w-none">
            <p>
              The Agent2Agent (A2A) Protocol is a framework that enables different AI agents to communicate, delegate tasks, 
              and collaborate, even when built by different teams with different technologies. It solves the critical challenge 
              of agent interoperability.
            </p>

            <p>
              Think of A2A as the standardized language and rules that allow agents to work together effectively - 
              similar to how HTTP enables different websites to communicate across the internet.
            </p>
          </div>
          
          <Separator />
          
          <Tabs defaultValue="core-principles">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="core-principles">Core Principles</TabsTrigger>
              <TabsTrigger value="building-blocks">Building Blocks</TabsTrigger>
              <TabsTrigger value="protocol-bindings">Protocol Bindings</TabsTrigger>
              <TabsTrigger value="a2a-vs-mcp">A2A vs MCP</TabsTrigger>
              <TabsTrigger value="workflow">Complete Workflow</TabsTrigger>
              <TabsTrigger value="business-use-case">Business Use Case</TabsTrigger>
            </TabsList>
            
            <TabsContent value="core-principles" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">The Five Core Principles of A2A</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-primary">
                        <Wrench size={18} weight="duotone" />
                      </div>
                      <CardTitle className="text-base">Simple</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>
                      Built on familiar web standards like HTTP, making it easy for developers to implement without 
                      learning entirely new technologies. This reduces the barrier to entry for creating interoperable agents.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-primary">
                        <Gear size={18} weight="duotone" />
                      </div>
                      <CardTitle className="text-base">Enterprise Ready</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>
                      Includes built-in solutions for security, privacy, and audit logging. A2A addresses real-world 
                      business requirements from the start rather than treating them as afterthoughts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-primary">
                        <ArrowRight size={18} weight="duotone" />
                      </div>
                      <CardTitle className="text-base">Async First</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>
                      Designed for asynchronous communication where agents can submit tasks without waiting for 
                      immediate responses. This is ideal for long-running jobs or workflows requiring human approval.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-primary">
                        <BracketsCurly size={18} weight="duotone" />
                      </div>
                      <CardTitle className="text-base">Modality Agnostic</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>
                      Supports various communication formats beyond text, including interactive forms, 
                      audio streams, and embedded content. Agents can use the best format for each specific task.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-primary">
                        <PuzzlePiece size={18} weight="duotone" />
                      </div>
                      <CardTitle className="text-base">Opaque Execution</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>
                      A critical concept where an agent using another agent's services doesn't need to know <em>how</em> it works 
                      internally - only <em>what</em> it can do and how to ask. This preserves each agent's autonomy and privacy, 
                      keeping internal logic protected while enabling collaboration.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="building-blocks" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Core Building Blocks of A2A</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">The Agent Card</CardTitle>
                    <CardDescription>An agent's digital business card (v1.0 Schema)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      The Agent Card is a standardized metadata file (usually JSON) that an agent publishes to advertise its capabilities.
                      It tells other agents who it is, what it does, how to contact it, and what protocols it supports.
                    </p>
                    
                    <div className={conceptSurfaceSoft("p-4 space-y-2")}
                    >
                      <p className="text-xs font-medium text-muted-foreground">Example Agent Card (v1.0 Schema):</p>
                      <pre className={conceptCodeBlock("text-xs p-3 overflow-x-auto")}> 
{`{
  "name": "StockInfoAgent",
  "description": "Provides current stock price information.",
  "url": "https://stock-info.example.com/a2a",
  "provider": { "organization": "ABCorp" },
  "version": "1.0.0",
  "supportedInterfaces": [{
    "protocolBinding": "jsonrpc",
    "protocolVersion": "1.0"
  }],
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "extendedAgentCard": true
  },
  "defaultInputModes": ["text/plain", "application/json"],
  "defaultOutputModes": ["text/plain", "application/json"],
  "securitySchemes": [{
    "type": "oauth2",
    "flows": { "clientCredentials": { "tokenUrl": "/oauth/token" } }
  }],
  "skills": [{
    "id": "get_stock_price_skill",
    "name": "Get Stock Price",
    "description": "Retrieves current stock price for a company",
    "inputModes": ["text/plain"],
    "outputModes": ["application/json"]
  }]
}`}
                      </pre>
                    </div>

                    {/* v1.0 Breaking Changes Callout */}
                    <div className="p-3 rounded-md border border-amber-500/30 bg-amber-500/5">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">⚠️ v1.0 Breaking Changes</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <strong>Kind discriminator removed:</strong> Union types now use wrapper objects with field names as discriminators</li>
                        <li>• <strong>extendedAgentCard relocated:</strong> Moved from <code>supportsExtendedAgentCard</code> to <code>capabilities.extendedAgentCard</code></li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">A2A Workflow Components</CardTitle>
                    <CardDescription>Tasks, Messages, Artifacts, and Context</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className={conceptSurface("p-4 space-y-2")}
                      >
                        <h4 className="font-medium mb-2">Tasks</h4>
                        <p className="text-sm">
                          The fundamental unit of work with a unique ID and lifecycle states: 
                          <code className="text-xs bg-muted px-1 mx-1">submitted</code>
                          <code className="text-xs bg-muted px-1 mx-1">working</code>
                          <code className="text-xs bg-muted px-1 mx-1">completed</code>
                          <code className="text-xs bg-muted px-1 mx-1">failed</code>
                          <code className="text-xs bg-muted px-1 mx-1">canceled</code>
                          <code className="text-xs bg-muted px-1 mx-1">input_required</code>
                          <code className="text-xs bg-muted px-1 mx-1">auth_required</code>
                          <code className="text-xs bg-muted px-1 mx-1">rejected</code>
                        </p>
                      </div>
                      
                      <div className={conceptSurface("p-4 space-y-2")}
                      >
                        <h4 className="font-medium mb-2">Messages</h4>
                        <p className="text-sm">
                          Communication turns with role (<code className="text-xs bg-muted px-1">user</code> or <code className="text-xs bg-muted px-1">agent</code>) 
                          containing Parts (TextPart, FilePart, DataPart). Enables complex back-and-forth collaboration.
                        </p>
                      </div>
                      
                      <div className={conceptSurface("p-4 space-y-2")}
                      >
                        <h4 className="font-medium mb-2">Artifacts</h4>
                        <p className="text-sm">
                          Output generated by an agent during task processing. Can be text, files, or structured data 
                          delivered as the final result.
                        </p>
                      </div>

                      <div className={conceptSurface("p-4 space-y-2")}
                      >
                        <h4 className="font-medium mb-2">Context (contextId)</h4>
                        <p className="text-sm">
                          Server-generated ID to group related tasks. Enables multi-turn interactions and 
                          maintains conversational continuity across task boundaries.
                        </p>
                      </div>
                    </div>

                    {/* Core Operations */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-3">Core Operations</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="p-2 rounded border text-xs"><strong>SendMessage</strong> - Initiate interaction</div>
                        <div className="p-2 rounded border text-xs"><strong>SendStreamingMessage</strong> - Stream responses</div>
                        <div className="p-2 rounded border text-xs"><strong>GetTask</strong> - Retrieve task state</div>
                        <div className="p-2 rounded border text-xs"><strong>ListTasks</strong> - List all tasks</div>
                        <div className="p-2 rounded border text-xs"><strong>CancelTask</strong> - Request cancellation</div>
                        <div className="p-2 rounded border text-xs"><strong>SubscribeToTask</strong> - Stream task updates</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* NEW: Protocol Bindings Tab */}
            <TabsContent value="protocol-bindings" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Protocol Bindings (3-Layer Model)</h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                A2A v1.0 uses a 3-layer architecture: Canonical Data Model (Protocol Buffers), Abstract Operations, 
                and Protocol Bindings. Here are the three official bindings:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">JSON-RPC 2.0</CardTitle>
                    <CardDescription>Over HTTP(S) with SSE for streaming</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className={conceptCodeBlock("text-xs p-3 overflow-x-auto")}>
{`// JSON-RPC Request
{
  "jsonrpc": "2.0",
  "method": "a2a.sendMessage",
  "params": {
    "message": {
      "role": "user",
      "parts": [{
        "text": "Get stock price"
      }]
    }
  },
  "id": "req-123"
}`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">gRPC</CardTitle>
                    <CardDescription>Using Protocol Buffers, server streaming</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className={conceptCodeBlock("text-xs p-3 overflow-x-auto")}>
{`// gRPC service definition
service A2AService {
  rpc SendMessage(
    SendMessageRequest
  ) returns (
    SendMessageResponse
  );
  
  rpc SubscribeToTask(
    SubscribeRequest
  ) returns (
    stream TaskUpdate
  );
}`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">HTTP+JSON/REST</CardTitle>
                    <CardDescription>RESTful endpoints with SSE streaming</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className={conceptCodeBlock("text-xs p-3 overflow-x-auto")}>
{`// RESTful endpoints
POST /tasks
  → Create new task

GET /tasks/{taskId}
  → Get task status

DELETE /tasks/{taskId}
  → Cancel task

GET /tasks/{taskId}/subscribe
  → SSE stream for updates

// Headers
A2A-Version: 1.0
Content-Type: application/a2a+json`}
                    </pre>
                  </CardContent>
                </Card>
              </div>

              {/* Official SDKs */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Official SDKs</CardTitle>
                  <CardDescription>Available under the a2aproject GitHub organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      <a href="https://github.com/a2aproject/a2a-python" target="_blank" rel="noopener noreferrer">🐍 Python</a>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <a href="https://github.com/a2aproject/a2a-js" target="_blank" rel="noopener noreferrer">📦 JavaScript</a>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <a href="https://github.com/a2aproject/a2a-java" target="_blank" rel="noopener noreferrer">☕ Java</a>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <a href="https://github.com/a2aproject/a2a-dotnet" target="_blank" rel="noopener noreferrer">🔷 C#/.NET</a>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <a href="https://github.com/a2aproject/a2a-go" target="_blank" rel="noopener noreferrer">🐹 Go</a>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="a2a-vs-mcp" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Understanding A2A vs. MCP</h3>
              
              {/* ACP Merger Note */}
              <div className="p-3 rounded-md border border-purple-500/30 bg-purple-500/5 mb-4">
                <p className="text-sm">
                  <strong className="text-purple-700 dark:text-purple-400">📢 ACP Merged into A2A:</strong>{" "}
                  IBM's Agent Communication Protocol (ACP) officially merged with A2A under the Linux Foundation in August 2025. 
                  ACP technology and expertise are now part of the unified A2A standard. BeeAI users can use{" "}
                  <a href="https://framework.beeai.dev/integrations/a2a" target="_blank" rel="noopener noreferrer" className="underline">A2AServer</a> and{" "}
                  <a href="https://framework.beeai.dev/integrations/a2a#a2a-agent-client" target="_blank" rel="noopener noreferrer" className="underline">A2AAgent</a>{" "}
                  adapters for migration.
                </p>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">A2A Protocol</Badge>
                        <span className="text-sm font-medium">Agent-to-Agent Communication</span>
                      </div>
                      
                      <div className="p-4 rounded-md bg-primary/5 border border-primary/10 text-sm">
                        <p>
                          <strong>Purpose:</strong> Enables collaboration between autonomous agents (peer-to-peer).
                        </p>
                        <p className="mt-2">
                          <strong>Analogy:</strong> Like a manager delegating a complex project to a team member.
                          The communication is about the goal and the progress.
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Focuses on agent discovery and collaboration</li>
                          <li>Handles task delegation and status tracking</li>
                          <li>Provides a framework for agent coordination</li>
                          <li>Now includes ACP enterprise orchestration features</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)]">MCP Protocol</Badge>
                        <span className="text-sm font-medium">Agent-to-Tool Interaction</span>
                      </div>
                      
                      <div className="p-4 rounded-md bg-secondary/5 border border-secondary/10 text-sm">
                        <p>
                          <strong>Purpose:</strong> Standardizes how an agent connects to tools, APIs, and data sources.
                        </p>
                        <p className="mt-2">
                          <strong>Analogy:</strong> Like a mechanic using a standardized wrench to turn a bolt.
                          The interaction is a direct, predictable function call.
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Defines function calling formats</li>
                          <li>Standardizes tool interfaces</li>
                          <li>Creates consistency across model providers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className={conceptSurfaceSoft("mt-6 p-4 space-y-3")}>
                    <h4 className="font-medium">Complementary Protocols</h4>
                    <p className="text-sm text-muted-foreground">
                      A2A and MCP are not competitors; they are complementary. An agent might use A2A to coordinate 
                      with another agent, and then that second agent might use MCP to call a specific tool it needs 
                      to complete its task.
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code size={16} className="text-primary" />
                      <p className="font-medium">Example: A2A delegates to agent, agent uses MCP to call tool</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workflow" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">Complete A2A Workflow Example</h3>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                                        <p className="text-sm">
                      Let's see how A2A and MCP work together in a real-world scenario when a user asks:
                      <span className={conceptSurfaceSoft("block mt-1 px-3 py-1 font-medium text-sm")}
                      >
                        "What's Google's stock price right now?"
                      </span>
                    </p>
                    
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        <div className={conceptSurface("p-4 space-y-3")}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Step 1</Badge>
                            <h4 className="font-medium">User Query to Host Agent</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The user asks their personal Host Agent for Google's current stock price.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">User:</div>
                            <div>What's Google's stock price today?</div>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Step 2</Badge>
                            <h4 className="font-medium">Host Agent Analysis</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Host Agent analyzes the query and realizes it doesn't have direct access to stock data.
                            It needs to delegate this task to a specialized agent.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Host Agent:</div>
                            <div>Hold on a sec, I know someone who can help with stock information...</div>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Step 3: A2A</Badge>
                            <h4 className="font-medium">A2A Delegation to Specialist</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Host Agent consults its agent registry and delegates the task to a specialized Stock Info Agent using the A2A protocol.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Host Agent:</div>
                            <div className="flex items-center gap-1">
                              <ArrowRight size={16} />
                              <div>Stock Info Agent: "Please get Google's current stock price!"</div>
                            </div>
                          </div>
                          <div className={conceptSurfaceSoft("p-2 mt-2 text-xs space-y-2")}>
                            <pre className={conceptCodeBlock("text-xs whitespace-pre-wrap p-2")}>
{`// A2A Task Creation
{
  "taskId": "task-123456",
  "instruction": "Get current stock price for ticker GOOGL",
  "options": {
    "priority": "normal",
    "timeout": 30
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Step 4</Badge>
                            <h4 className="font-medium">Stock Agent Analysis</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Stock Info Agent receives the task and determines it needs to call an external service
                            to get the current stock price.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Stock Info Agent:</div>
                            <div>Hold on a sec, I know a place to get this information...</div>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)]">Step 5: MCP</Badge>
                            <h4 className="font-medium">MCP Tool Call</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Stock Info Agent uses the ModelContextProtocol (MCP) to make a direct function call to a stock price tool.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Stock Info Agent:</div>
                            <div className="flex items-center gap-1">
                              <ArrowRight size={16} />
                              <div>MCP Stock Price Server: Function_call: "get_stock_price", args: {"{'symbol': 'GOOGL'}"}</div>
                            </div>
                          </div>
                          <div className={conceptSurfaceSoft("p-2 mt-2 text-xs space-y-2")}>
                            <pre className={conceptCodeBlock("text-xs whitespace-pre-wrap p-2")}>
{`// MCP Function Call
{
  "function": "get_stock_price",
  "parameters": {
    "symbol": "GOOGL"
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)]">Step 6: MCP</Badge>
                            <h4 className="font-medium">MCP Data Return</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The MCP server fetches the price and returns structured data to the Stock Info Agent.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">MCP Server:</div>
                            <div className="flex items-center gap-1">
                              <ArrowRight size={16} />
                              <div>Stock Info Agent: Response: {"{'price': '174.92', 'currency': 'USD'}"}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">Step 7: A2A</Badge>
                            <h4 className="font-medium">A2A Response to Host</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Stock Info Agent marks the A2A task as complete and returns the result to the Host Agent.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Stock Info Agent:</div>
                            <div className="flex items-center gap-1">
                              <ArrowRight size={16} />
                              <div>Host Agent: "Google stock is 174.92 USD"</div>
                            </div>
                          </div>
                          <div className={conceptSurfaceSoft("p-2 mt-2 text-xs space-y-2")}>
                            <pre className={conceptCodeBlock("text-xs whitespace-pre-wrap p-2")}>
{`// A2A Task Completion
{
  "taskId": "task-123456",
  "status": "completed",
  "result": "Google stock is 174.92 USD",
  "metadata": {
    "dataSource": "financial_api",
    "timestamp": "2023-06-15T14:32:45Z"
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className={conceptSurface("p-4 space-y-3")}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Step 8</Badge>
                            <h4 className="font-medium">Host Response to User</h4>
                          </div>
                          <p className="text-sm mb-2">
                            The Host Agent receives the A2A artifact and presents the information to the user.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Host Agent:</div>
                            <div className="flex items-center gap-1">
                              <ArrowRight size={16} />
                              <div>User: "Google's stock price today is 174.92 USD"</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    <div className="p-4 border border-dashed border-primary/30 rounded-md bg-primary/5">
                      <h4 className="font-medium mb-2">Key Takeaways</h4>
                      <ul className="text-sm space-y-1">
                        <li>A2A handled the high-level agent coordination and task delegation</li>
                        <li>MCP handled the specific function call to get the stock data</li>
                        <li>Both protocols worked together to solve the user's request</li>
                        <li>Each agent maintained its autonomy while collaborating effectively</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="business-use-case" className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold mb-3">A2A Communication Business Use Case</h3>
              <TabsContent value="business-use-case" className="space-y-4 pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">A2A Communication Business Use Case</h3>
                  <EnlightenMeButton
                    title="Google Agent2Agent Protocol"
                    contextDescription="The Agent2Agent (A2A) protocol enables secure, scalable, and interoperable communication between autonomous agents. It is designed for multi-agent systems, allowing agents to delegate tasks, exchange messages, and collaborate across domains such as supply chain, finance, and IoT. The protocol focuses on agent discovery, task delegation, status tracking, and privacy-preserving opaque execution."
                    className="ml-2"
                  />
                  {/* Optionally add a label: */}
                  {/* <span className="text-sm text-muted-foreground">Learn More with AI</span> */}
                </div>
              <BusinessUseCaseSection
                industry="Retail"
                scenario="Personalized Shopping Assistant: React agents interact with customer profiles and inventory systems to recommend products, answer queries, and streamline checkout."
                value="Increases conversion rates, enhances customer satisfaction, and optimizes inventory turnover."
              />
              <EnlightenMeButton
                title="Google Agent2Agent Protocol"
                contextDescription="The Agent2Agent (A2A) protocol enables secure, scalable, and interoperable communication between autonomous agents. It is designed for multi-agent systems, allowing agents to delegate tasks, exchange messages, and collaborate across domains such as supply chain, finance, and IoT. The protocol focuses on agent discovery, task delegation, status tracking, and privacy-preserving opaque execution."
                className="mb-4"
              />
              </TabsContent>
              <Card className="mt-6">
                <CardHeader className="flex items-center justify-between pb-2">
                  <span className="font-semibold text-base">Business Use Case Deep Dive</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={cn(
                        "p-2 rounded transition-colors text-muted-foreground hover:text-foreground",
                        "hover:bg-muted"
                      )}
                      onClick={() => {
                        navigator.clipboard.writeText(`React Agent Pattern in Retail\n\nIndustry: Retail\n\nScenario: Personalized Shopping Assistant\n\nReact agents interact with customer profiles and inventory systems to recommend products, answer queries, and streamline checkout.\n\nImplementation Path:\n1. Identify customer pain points (e.g., product discovery, checkout friction).\n2. Integrate React agents with customer data and inventory APIs.\n3. Design agent workflows for product recommendations and real-time support.\n4. Measure success via conversion rates and customer feedback.\n\nExpected Outcomes:\n- Higher sales conversion\n- Improved customer retention\n- Efficient inventory management\n\nKey Metrics:\n- Conversion rate\n- Customer satisfaction score\n- Inventory turnover\n\nNext Steps for Business Users:\n- Map current workflows to agent capabilities\n- Pilot the agent in a specific product category\n- Collect feedback and iterate`);
                      }}
                      title="Copy to clipboard"
                    >
                      <Clipboard size={20} />
                    </button>
                    <EnlightenMeButton
                      title="React Agent Pattern in Retail"
                      contextDescription={
                        "A React agent that acts as a personalized shopping assistant in retail. The agent interacts with customer profiles and inventory systems to recommend products, answer queries, and streamline checkout."
                      }
                      className="px-2 h-8 w-8 rounded-full hover:bg-yellow-100 hover:text-yellow-900 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400 transition-colors"
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-2 py-2">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-lg font-semibold mb-1">React Agent Pattern in Retail</span>
                      <div className="mb-2"><strong>Industry:</strong> Retail</div>
                      <div className="mb-2"><strong>Scenario:</strong> Personalized Shopping Assistant</div>
                      <div className="mb-2">React agents interact with customer profiles and inventory systems to recommend products, answer queries, and streamline checkout.</div>
                    </div>
                    <div>
                      <span className="font-semibold">Implementation Path</span>
                      <ol className="list-decimal list-inside ml-4 mt-1">
                        <li>Identify customer pain points (e.g., product discovery, checkout friction).</li>
                        <li>Integrate React agents with customer data and inventory APIs.</li>
                        <li>Design agent workflows for product recommendations and real-time support.</li>
                        <li>Measure success via conversion rates and customer feedback.</li>
                      </ol>
                    </div>
                    <div>
                      <span className="font-semibold">Expected Outcomes</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>Higher sales conversion</li>
                        <li>Improved customer retention</li>
                        <li>Efficient inventory management</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Key Metrics</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>Conversion rate</li>
                        <li>Customer satisfaction score</li>
                        <li>Inventory turnover</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Next Steps for Business Users</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>Map current workflows to agent capabilities</li>
                        <li>Pilot the agent in a specific product category</li>
                        <li>Collect feedback and iterate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agent2AgentProtocolExplainer;














