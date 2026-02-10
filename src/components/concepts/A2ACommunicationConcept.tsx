import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import A2ACommunicationPatterns from "./A2ACommunicationPatterns"
import A2AMultiAgentSystem from "./A2AMultiAgentSystem"
import Agent2AgentProtocolExplainer from "./Agent2AgentProtocolExplainer"
import ReferenceSection from "../references/ReferenceSection"
import { ArrowsHorizontal, Network, GitBranch, Sparkle, CloudArrowUp, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowSquareOut } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import CodeBlock from "@/components/ui/CodeBlock";
import { useState } from "react";
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles";

interface A2ACommunicationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function A2ACommunicationConcept({ onMarkComplete, onNavigateToNext }: A2ACommunicationConceptProps) {
  const [imageZoom, setImageZoom] = useState(1);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleMarkComplete = () => {
    markNodeComplete('a2a-communication');
    if (onMarkComplete) onMarkComplete();
  };

  const handleZoomIn = () => setImageZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setImageZoom(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setImageZoom(1);

  const tabs = [
    {
      id: 'fundamentals',
      title: 'A2A Basics',
      description: 'Learn how agents communicate with each other',
      icon: <ArrowsHorizontal className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Basic Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsHorizontal className="w-5 h-5" />
                What is Agent-to-Agent (A2A) Communication?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Agent-to-Agent (A2A) communication is an open protocol, now under the Linux Foundation, 
                that enables AI agents to communicate, coordinate, and collaborate with each other. 
                Instead of working in isolation, agents can share information, delegate tasks, and 
                combine their capabilities to solve complex problems.
              </p>

              {/* v1.0 RC Banner */}
              <div className="p-3 rounded-md border border-blue-500/30 bg-blue-500/5">
                <p className="text-sm">
                  <strong className="text-blue-700 dark:text-blue-400">🚀 A2A v1.0 Release Candidate:</strong>{" "}
                  The protocol is now governed by the Linux Foundation with IBM's ACP merged in. 
                  Features 3-layer architecture (Protocol Buffers, Abstract Operations, Protocol Bindings).
                </p>
              </div>
              
              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <h4 className="font-semibold">Why A2A Communication Matters:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Specialization:</strong> Each agent can focus on what it does best</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Scalability:</strong> Distribute workload across multiple agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Resilience:</strong> If one agent fails, others can continue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Efficiency:</strong> Parallel processing and task distribution</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* A2A Communication Diagram */}
          <Card>
            <CardContent className="pt-6">
              <img 
                src="/images/a2a_communication.webp" 
                alt="Agent-to-Agent Communication Architecture - How agents discover, connect, and collaborate"
                className="w-full rounded-lg border border-border/50"
              />
            </CardContent>
          </Card>

          {/* A2A Protocol Mindmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Agent2Agent Protocol Mindmap
              </CardTitle>
              <CardDescription>
                Comprehensive visual overview of the A2A communication protocol and its components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={conceptSurface("relative overflow-hidden")}
              >
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={imageZoom <= 0.5}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <MagnifyingGlassMinus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetZoom}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={imageZoom >= 3}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <MagnifyingGlassPlus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullImage(true)}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <ArrowSquareOut className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="overflow-auto max-h-96 p-4">
                  <img
                    src="/images/screenshots/Agent2Agent_mindmap.jpg"
                    alt="Agent2Agent Protocol Mindmap - Comprehensive overview of A2A communication architecture, protocols, and patterns"
                    className="w-full transition-transform duration-300 cursor-zoom-in"
                    style={{ transform: `scale(${imageZoom})`, transformOrigin: 'top left' }}
                    onClick={() => setShowFullImage(true)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Click and drag to pan • Use zoom controls for detail view • Click expand for full size
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://bhakthan.substack.com/p/agent2agent-protocol-a2a', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ArrowSquareOut className="w-4 h-4" />
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Image Modal */}
          {showFullImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setShowFullImage(false)}
            >
              <div className="relative max-w-7xl max-h-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFullImage(false)}
                  className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm"
                >
                  ✕ Close
                </Button>
                <img
                  src="/images/screenshots/Agent2Agent_mindmap.jpg"
                  alt="Agent2Agent Protocol Mindmap - Full Size View"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Communication Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Communication Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Request-Response</h4>
                  <p className="text-lg text-muted-foreground">
                    Agent A sends a request to Agent B and waits for a response
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Publish-Subscribe</h4>
                  <p className="text-lg text-muted-foreground">
                    Agents publish events and others subscribe to relevant updates
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Delegation</h4>
                  <p className="text-lg text-muted-foreground">
                    A supervisor agent delegates tasks to specialized worker agents
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Collaboration</h4>
                  <p className="text-lg text-muted-foreground">
                    Multiple agents work together on a shared task or goal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Explainer */}
          <Agent2AgentProtocolExplainer />

          {/* References */}
          <ReferenceSection type="concept" itemId="a2a" />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Communication Architecture',
      description: 'Understand the technical architecture of A2A systems',
      icon: <Network className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle>A2A Architecture Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Message Broker</h5>
                  <p className="text-lg text-muted-foreground">
                    Handles message routing, queuing, and delivery between agents
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Agent Registry</h5>
                  <p className="text-lg text-muted-foreground">
                    Maintains directory of available agents and their capabilities
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Protocol Handler</h5>
                  <p className="text-lg text-muted-foreground">
                    Manages message format, serialization, and protocol compliance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Patterns Detail */}
          <A2ACommunicationPatterns />

          {/* Security Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Security & Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-red-600 dark:text-red-200">
                    Security Challenges
                  </h4>
                  <ul className="space-y-1 text-lg text-muted-foreground">
                    <li>• Agent authentication and authorization</li>
                    <li>• Message encryption and integrity</li>
                    <li>• Preventing malicious agent behavior</li>
                    <li>• Audit trails and monitoring</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-green-600 dark:text-green-200">
                    Best Practices
                  </h4>
                  <ul className="space-y-1 text-lg text-muted-foreground">
                    <li>• Use secure protocols (TLS/SSL)</li>
                    <li>• Implement agent identity verification</li>
                    <li>• Monitor inter-agent communications</li>
                    <li>• Use structured message formats</li>
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
      title: 'Multi-Agent Systems',
      description: 'Build systems with multiple cooperating agents',
      icon: <GitBranch className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Multi-Agent System Demo */}
          <A2AMultiAgentSystem />

          {/* Implementation Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Design Agent Roles</h4>
                    <p className="text-lg text-muted-foreground">
                      Define what each agent will be responsible for and how they'll interact
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Choose Communication Protocol</h4>
                    <p className="text-lg text-muted-foreground">
                      Select message format, transport mechanism, and coordination patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Implement Message Handling</h4>
                    <p className="text-lg text-muted-foreground">
                      Create message parsers, handlers, and response generators
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Test & Monitor</h4>
                    <p className="text-lg text-muted-foreground">
                      Validate communication flows and add monitoring for production
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced A2A Patterns',
      description: 'Explore sophisticated multi-agent coordination patterns',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Coordination Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Consensus Mechanisms</h4>
                  <p className="text-lg text-muted-foreground">
                    Agents reach agreement on decisions through voting or consensus protocols
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Auction-Based Coordination</h4>
                  <p className="text-lg text-muted-foreground">
                    Agents bid for tasks based on their capabilities and current workload
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Hierarchical Coordination</h4>
                  <p className="text-lg text-muted-foreground">
                    Multi-level agent hierarchies with supervisors and workers
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Emergent Behavior</h4>
                  <p className="text-lg text-muted-foreground">
                    Complex behaviors emerge from simple agent interactions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Performance & Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-blue-600 dark:text-blue-200">
                    Scaling Challenges
                  </h4>
                  <ul className="space-y-1 text-lg text-muted-foreground">
                    <li>• Message volume and network congestion</li>
                    <li>• Agent discovery and registration</li>
                    <li>• Fault tolerance and recovery</li>
                    <li>• Load balancing across agents</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-green-600 dark:text-green-200">
                    Optimization Strategies
                  </h4>
                  <ul className="space-y-1 text-lg text-muted-foreground">
                    <li>• Use efficient message serialization</li>
                    <li>• Implement message batching and compression</li>
                    <li>• Add caching and result memoization</li>
                    <li>• Monitor and optimize agent workloads</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'agent-framework-integration',
      title: 'Microsoft Agent Framework Integration',
      description: 'Integrating Microsoft Agent Framework with Azure AI Services',
      icon: <CloudArrowUp className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Agent Framework + Azure Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudArrowUp className="w-5 h-5" />
                Microsoft Agent Framework with Azure AI Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                <a 
                  href="https://aka.ms/agentframework" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                >
                  Microsoft Agent Framework
                </a>
                {" "}seamlessly integrates with Azure AI Services, combining the best of Semantic Kernel 
                (production workloads) and AutoGen (rapid prototyping) into a unified framework. It leverages 
                Azure OpenAI, Azure AI Search, and other Azure cognitive services for enhanced multi-agent capabilities.
              </p>

              <div className={conceptSurfaceSoft("p-4 space-y-4")}>
                <div className="flex items-center gap-2">
                  <CloudArrowUp className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Azure Integration Benefits</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium">Azure OpenAI Integration</h5>
                    <p className="text-lg text-muted-foreground">Direct access to GPT-4, GPT-3.5, and other models</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure AI Search</h5>
                    <p className="text-lg text-muted-foreground">Enhanced RAG capabilities for agents</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure Container Apps</h5>
                    <p className="text-lg text-muted-foreground">Scalable deployment for multi-agent systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure Functions</h5>
                    <p className="text-lg text-muted-foreground">Serverless execution for agent workflows</p>
                  </div>
                </div>
              </div>

              <CodeBlock language="python">{`from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import DefaultAzureCredential

# Azure OpenAI configuration
endpoint = "https://your-resource.openai.azure.com/"
deployment_name = "gpt-4"

# Create agent with Azure OpenAI
agent = AzureOpenAIResponsesClient(
    credential=DefaultAzureCredential()
).create_agent(
    name="azure_assistant",
    instructions="You are an AI assistant powered by Azure OpenAI.",
    model=deployment_name
)

# Run agent task
result = await agent.run("Analyze this data using Azure AI services")

# Multi-agent workflow with graph orchestration
from agent_framework.workflows import Workflow

workflow = Workflow()

# Define agents
researcher = workflow.add_agent(
    "researcher",
    instructions="Research specialist using Azure AI Search",
    model=deployment_name
)

analyst = workflow.add_agent(
    "analyst", 
    instructions="Data analysis specialist",
    model=deployment_name
)

# Connect agents in workflow
workflow.connect(researcher, analyst)
result = await workflow.run("Research and analyze market trends")`}</CodeBlock>
            </CardContent>
          </Card>

          {/* Agent Framework Enterprise Deployment */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Deployment with Azure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Deployment Options</h4>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                      <span><strong>Azure Container Apps:</strong> Scalable containerized deployment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                      <span><strong>Azure Functions:</strong> Serverless agent execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                      <span><strong>Azure Kubernetes Service:</strong> Advanced orchestration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                      <span><strong>Azure App Service:</strong> Web-based agent interfaces</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600">Security & Compliance</h4>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                      <span><strong>Azure Key Vault:</strong> Secure credential management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></span>
                      <span><strong>Azure Active Directory:</strong> Identity and access control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500 mt-2"></span>
                      <span><strong>Azure Monitor:</strong> Comprehensive logging and monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500 mt-2"></span>
                      <span><strong>Private Endpoints:</strong> Secure network connectivity</span>
                    </li>
                  </ul>
                </div>
              </div>

              <CodeBlock language="yaml">{`# Azure Container Apps deployment configuration
apiVersion: app/v1
kind: ContainerApp
metadata:
  name: agent-framework-multi-agent
spec:
  configuration:
    ingress:
      external: true
      targetPort: 8000
    secrets:
    - name: azure-openai-key
      value: "your-secret-key"
  template:
    containers:
    - image: your-registry/agent-framework:latest
      name: agent-framework-service
      env:
      - name: AZURE_OPENAI_ENDPOINT
        value: "https://your-resource.openai.azure.com/"
      - name: AZURE_OPENAI_KEY
        secretRef: azure-openai-key
      resources:
        cpu: 1.0
        memory: 2Gi
    scale:
      minReplicas: 1
      maxReplicas: 10`}</CodeBlock>
            </CardContent>
          </Card>

          {/* Agent Framework Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Microsoft Agent Framework Best Practices with Azure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-green-200/60 dark:border-green-400/40")}
                >
                  <h4 className="font-semibold text-green-600">Performance</h4>
                  <ul className="text-lg space-y-1">
                    <li>• Use connection pooling</li>
                    <li>• Implement caching strategies</li>
                    <li>• Monitor token usage</li>
                    <li>• Optimize conversation length</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-blue-200/60 dark:border-blue-400/40")}>
                  <h4 className="font-semibold text-blue-600">Security</h4>
                  <ul className="text-lg space-y-1">
                    <li>• Use managed identities</li>
                    <li>• Implement rate limiting</li>
                    <li>• Validate all inputs</li>
                    <li>• Encrypt sensitive data</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2 border border-purple-200/60 dark:border-purple-400/40")}>
                  <h4 className="font-semibold text-purple-600">Monitoring</h4>
                  <ul className="text-lg space-y-1">
                    <li>• Track conversation metrics</li>
                    <li>• Monitor error rates</li>
                    <li>• Log agent interactions</li>
                    <li>• Set up alerting</li>
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
      conceptId="a2a-communication"
      title="A2A Communication"
      description="Learn how AI agents communicate and coordinate with each other to solve complex problems"
      tabs={tabs}
      nextConcept={{
        id: 'mcp',
        title: 'Model Context Protocol',
        description: 'Secure tool integration for AI agents'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}


















