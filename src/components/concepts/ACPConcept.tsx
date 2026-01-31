import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ACPProtocolStack from "./ACPProtocolStack"
import ProtocolComparison from "./ProtocolComparison"
import SimpleACPDemo from "../interactive-demos/SimpleACPDemo"
import ACPMCPComparison from "../interactive-demos/ACPMCPComparison"
import ReferenceSection from "../references/ReferenceSection"
import { Stack, Lightning, Rocket, Crown, ArrowRight, Info } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete';
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";
import { conceptSurfaceSoft, conceptCodeBlock } from "./conceptStyles";
import { Link } from "react-router-dom";

interface ACPConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function ACPConcept({ onMarkComplete, onNavigateToNext }: ACPConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('acp');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    {
      id: 'fundamentals',
      title: 'ACP → A2A',
      description: 'ACP has merged into A2A under the Linux Foundation',
      icon: <Stack className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Major Announcement Banner */}
          <div className="p-6 rounded-lg border-2 border-purple-500/40 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Info className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white">August 2025</Badge>
                  <h3 className="text-xl font-bold">ACP Joins Forces with A2A</h3>
                </div>
                <p className="text-base leading-relaxed">
                  IBM's Agent Communication Protocol (ACP) has <strong>officially merged with the Agent2Agent (A2A) Protocol</strong> under 
                  the Linux Foundation. This unification brings together the best of both protocols to create a single, 
                  more powerful standard for AI agent communication.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link 
                    to="/concepts/a2a-communication" 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Learn A2A Protocol <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a 
                    href="https://github.com/orgs/i-am-bee/discussions/5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Read the announcement →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* What This Means */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stack className="w-5 h-5" />
                What This Means for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2 border-l-4 border-green-500")}>
                  <h4 className="font-semibold text-green-600 dark:text-green-400">For New Projects</h4>
                  <p className="text-sm text-muted-foreground">
                    Use A2A Protocol directly. ACP's advanced orchestration, workflow management, and enterprise 
                    features are now integrated into the A2A v1.0 specification.
                  </p>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2 border-l-4 border-amber-500")}>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400">For Existing ACP Users</h4>
                  <p className="text-sm text-muted-foreground">
                    Migration paths are available. BeeAI users can use the <code className="text-xs bg-muted px-1">A2AServer</code> adapter 
                    to make agents A2A-compliant, and <code className="text-xs bg-muted px-1">A2AAgent</code> to integrate external A2A agents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Context */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Context: What Was ACP?</CardTitle>
              <CardDescription>Understanding the protocol that merged into A2A</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent Communication Protocol (ACP) was an advanced protocol stack developed by IBM Research 
                to power the <a href="https://github.com/i-am-bee/beeai-platform" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BeeAI Platform</a>. 
                It provided enterprise-grade features for multi-agent orchestration, workflow management, 
                and advanced coordination patterns.
              </p>
              
              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <h4 className="font-semibold">ACP's Key Contributions to A2A:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Orchestration:</strong> Complex multi-agent workflow coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>State Management:</strong> Agent state tracking and synchronization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Fault Tolerance:</strong> Graceful handling of agent failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Enterprise Scale:</strong> Production-ready deployment patterns</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Migration Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Migration Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="https://github.com/i-am-bee/beeai-platform/blob/main/docs/community-and-support/acp-a2a-migration-guide.mdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <h4 className="font-semibold mb-2">📖 Migration Guide</h4>
                  <p className="text-sm text-muted-foreground">
                    Official BeeAI migration guide from ACP to A2A
                  </p>
                </a>
                <a 
                  href="https://framework.beeai.dev/integrations/a2a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <h4 className="font-semibold mb-2">🔌 A2A Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    BeeAI framework A2A integration documentation
                  </p>
                </a>
                <a 
                  href="https://a2a-protocol.org/latest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <h4 className="font-semibold mb-2">📚 A2A v1.0 Spec</h4>
                  <p className="text-sm text-muted-foreground">
                    Full A2A Protocol v1.0 specification
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="ACP to A2A Migration"
            contextDescription="Understanding the merger of IBM's Agent Communication Protocol (ACP) into the A2A Protocol under Linux Foundation"
          />

          {/* References */}
          <ReferenceSection type="concept" itemId="acp" />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Legacy Architecture',
      description: 'Original ACP protocol architecture (now part of A2A)',
      icon: <Lightning className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Deprecation Notice */}
          <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-sm">
              <strong className="text-amber-700 dark:text-amber-400">⚠️ Historical Reference:</strong>{" "}
              This architecture represents the original ACP design. These concepts are now integrated into A2A v1.0.
            </p>
          </div>
          {/* Protocol Stack Diagram */}
          <ACPProtocolStack />

          {/* Layer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Application Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    High-level agent applications and business logic
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Orchestration Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Workflow management, task coordination, and agent orchestration
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Communication Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Message routing, protocol handling, and agent discovery
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Transport Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Network communication, security, and reliability
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with MCP */}
          <ACPMCPComparison />

          <EnlightenMeButton
            title="Protocol Stack"
            contextDescription="Understand the ACP protocol architecture"
          />
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Enterprise Integration',
      description: 'Implement ACP for enterprise-scale agent systems',
      icon: <Rocket className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Agent Registry</h4>
                  <p className="text-sm text-muted-foreground">
                    Centralized registry for agent discovery and capability management
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Orchestration Engine</h4>
                  <p className="text-sm text-muted-foreground">
                    Workflow engine that coordinates complex multi-agent processes
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Message Broker</h4>
                  <p className="text-sm text-muted-foreground">
                    High-performance message routing and delivery system
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Monitoring & Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time monitoring, logging, and performance analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <h4 className="font-semibold">Design Agent Architecture</h4>
                    <p className="text-sm text-muted-foreground">
                      Plan agent roles, responsibilities, and interaction patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Deploy Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up message brokers, registries, and orchestration services
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Implement Agents</h4>
                    <p className="text-sm text-muted-foreground">
                      Build and deploy individual agents with ACP integration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Configure Workflows</h4>
                    <p className="text-sm text-muted-foreground">
                      Define and deploy multi-agent workflows and processes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">5</Badge>
                  <div>
                    <h4 className="font-semibold">Monitor & Optimize</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement monitoring, logging, and performance optimization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Example */}
          <Card>
            <CardHeader>
              <CardTitle>ACP Configuration Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <pre className={conceptCodeBlock("text-sm p-3 overflow-x-auto")}
                >
{`{
  "agents": [
    {
      "id": "orchestrator",
      "type": "supervisor",
      "capabilities": ["workflow-management", "task-delegation"],
      "endpoints": {
        "control": "https://orchestrator.example.com/acp",
        "monitoring": "https://orchestrator.example.com/metrics"
      }
    },
    {
      "id": "data-processor",
      "type": "worker",
      "capabilities": ["data-analysis", "report-generation"],
      "endpoints": {
        "processing": "https://processor.example.com/acp"
      }
    }
  ],
  "workflows": [
    {
      "id": "data-analysis-workflow",
      "steps": [
        {"agent": "data-processor", "action": "analyze"},
        {"agent": "orchestrator", "action": "review"},
        {"agent": "data-processor", "action": "generate-report"}
      ]
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Enterprise Integration"
            contextDescription="Implement ACP for enterprise-scale agent systems"
          />
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Patterns',
      description: 'Master advanced ACP patterns and enterprise features',
      icon: <Crown className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced ACP Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Circuit Breaker Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Prevent cascading failures in multi-agent systems
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Saga Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage distributed transactions across multiple agents
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Event Sourcing</h4>
                  <p className="text-sm text-muted-foreground">
                    Track all agent interactions and state changes
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">CQRS</h4>
                  <p className="text-sm text-muted-foreground">
                    Separate read and write operations for better performance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Comparison */}
          <ProtocolComparison />

          {/* Production Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Production Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-200">
                    Performance & Scaling
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Implement horizontal scaling for high load</li>
                    <li>• Use caching for frequently accessed data</li>
                    <li>• Optimize message serialization and routing</li>
                    <li>• Monitor system resources and bottlenecks</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-red-600 dark:text-red-200">
                    Security & Compliance
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Implement end-to-end encryption</li>
                    <li>• Use strong authentication and authorization</li>
                    <li>• Maintain audit logs for compliance</li>
                    <li>• Regular security assessments and updates</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2")}
                >
                  <h4 className="font-semibold text-blue-600 dark:text-blue-200">
                    Monitoring & Observability
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Implement distributed tracing</li>
                    <li>• Monitor agent health and performance</li>
                    <li>• Set up alerting for critical issues</li>
                    <li>• Use dashboards for real-time visibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Advanced Patterns"
            contextDescription="Master advanced ACP patterns and enterprise features"
          />
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="acp"
      title="Agent Communication Protocol (ACP)"
      description="Master advanced agent coordination protocols for enterprise-scale multi-agent systems"
      tabs={tabs}
      nextConcept={{
        id: 'mcp-a2a-integration',
        title: 'MCP x A2A Integration',
        description: 'Integrate MCP with A2A communication'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}







