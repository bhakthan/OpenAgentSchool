import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Browser, Code, Shield, Sparkle, ArrowsClockwise, ChatCircle, PuzzlePiece, Lightning, Play, Eye, Lock, Check, Monitor, TreeStructure, PlugsConnected } from "@phosphor-icons/react"
import { markNodeComplete } from "@/lib/utils/markComplete"

interface DataVisualizationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function DataVisualizationConcept({ onMarkComplete, onNavigateToNext }: DataVisualizationConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('data-visualization');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    {
      id: 'fundamentals',
      title: 'MCP Apps & Agent UI',
      description: 'The 2026 standard for interactive AI interfaces',
      icon: <Browser className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* MCP Apps Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Browser className="w-5 h-5" />
                MCP Apps: Interactive UI for AI Agents
                <Badge className="ml-2 text-xs ring-1 ring-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">2026</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                <strong>MCP Apps</strong> is the first official Model Context Protocol extension (SEP-1865), 
                released January 2026. It enables MCP servers to return <strong>interactive HTML interfaces</strong> 
                that render directly within AI chat conversations—no more text-only tool responses.
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkle className="w-4 h-4 text-amber-500" />
                  The Paradigm Shift
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                    <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">Before MCP Apps</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• "Show me sales data" → Agent dumps 500 rows of text</li>
                      <li>• "Sort by revenue" → Agent re-lists everything</li>
                      <li>• Back-and-forth ping-pong for every interaction</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-md">
                    <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">With MCP Apps</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Agent shows interactive dashboard in chat</li>
                      <li>• User clicks, filters, drags—agent sees actions</li>
                      <li>• True human-agent collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted text-foreground p-4 rounded-md">
                <h4 className="font-semibold mb-3">What MCP Apps Enables:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Interactive Charts:</strong> Flame graphs, heatmaps, scatter plots users can explore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Form Inputs:</strong> Feature flag selectors, database query builders, config editors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Drag-and-Drop:</strong> List reordering, priority sorting, visual arrangement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Rich Media:</strong> Video players, PDF viewers, 3D models, maps</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Cross-Platform Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlugsConnected className="w-5 h-5" />
                Write Once, Run Everywhere
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                MCP Apps work across any MCP-compatible host. Build one UI, deploy to all major AI assistants.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💬</div>
                  <div className="text-sm font-medium">Claude</div>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🤖</div>
                  <div className="text-sm font-medium">ChatGPT</div>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💻</div>
                  <div className="text-sm font-medium">VS Code</div>
                </div>
                <div className="border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🪿</div>
                  <div className="text-sm font-medium">Goose</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Real-World MCP App Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🔥 Flame Graph Profiler
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Agent renders interactive flame graph. User clicks to zoom, identifies bottlenecks, 
                    then asks agent "What's causing the slowdown in calculateTotals?"
                  </p>
                  <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Click-to-zoom</Badge>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🚩 Feature Flag Selector
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Multi-select picker with environment tabs (prod/staging/dev), 
                    tag filters, and SDK code generation—all interactive in chat.
                  </p>
                  <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Multi-select</Badge>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    📋 List Prioritization
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag-and-drop reordering. User arranges items, saves order, 
                    or clicks "Ask AI to Sort" for agent recommendations.
                  </p>
                  <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Drag-and-drop</Badge>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🗃️ Database Query Builder
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Filter by date range, category, status. Preview data in table format, 
                    export summaries—all without leaving the conversation.
                  </p>
                  <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Interactive filters</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'MCP Apps Architecture',
      description: 'How MCP Apps work under the hood',
      icon: <TreeStructure className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Core Concepts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PuzzlePiece className="w-5 h-5" />
                Core Architecture Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-blue-500/30 bg-blue-500/5 rounded-lg p-4">
                  <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">ui:// Resources</h5>
                  <p className="text-sm text-muted-foreground">
                    HTML templates declared with <code className="text-xs bg-muted px-1 py-0.5 rounded">ui://</code> scheme 
                    and <code className="text-xs bg-muted px-1 py-0.5 rounded">text/html;profile=mcp-app</code> MIME type
                  </p>
                </div>
                <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-4">
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Tool Annotations</h5>
                  <p className="text-sm text-muted-foreground">
                    Tools use <code className="text-xs bg-muted px-1 py-0.5 rounded">_meta.ui.resourceUri</code> to 
                    link to a UI resource that hosts will render
                  </p>
                </div>
                <div className="border border-purple-500/30 bg-purple-500/5 rounded-lg p-4">
                  <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Sandboxed Iframes</h5>
                  <p className="text-sm text-muted-foreground">
                    UIs render in secure iframes with restricted permissions. 
                    Host pre-audits templates before rendering.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Communication Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                Host ↔ App Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted text-foreground p-4 rounded-lg mb-4">
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full">1. User asks agent</div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full">2. Agent calls tool</div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full">3. UI appears in chat</div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full">4. User interacts</div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-pink-500 text-white px-3 py-1 rounded-full">5. Agent sees actions</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium mb-1">ui/initialize</h5>
                  <p className="text-sm text-muted-foreground">
                    App sends handshake request, receives host context (theme, capabilities)
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium mb-1">ui/notifications/tool-input</h5>
                  <p className="text-sm text-muted-foreground">
                    Host sends tool arguments to UI via <code className="text-xs bg-muted px-1 py-0.5 rounded">structuredContent</code>
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium mb-1">ui/message</h5>
                  <p className="text-sm text-muted-foreground">
                    UI sends messages back to chat—user selections, computed values, requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* SDK Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>MCP Apps SDK Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Core SDK
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">@modelcontextprotocol/ext-apps</Badge>
                    <Badge className="text-xs ring-1 ring-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">v1.0.1</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Official MCP Apps extension for building and rendering app UIs
                  </p>
                </div>
                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    React Hooks
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">@modelcontextprotocol/ext-apps/react</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    React bindings: <code className="text-xs bg-background px-1 py-0.5 rounded">AppRenderer</code>, 
                    <code className="text-xs bg-background px-1 py-0.5 rounded">useAppContext</code> hooks
                  </p>
                </div>
                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    MCP-UI Reference Implementation
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">@mcp-ui/client</Badge>
                    <Badge className="text-xs ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">@mcp-ui/server</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Higher-level abstractions: <code className="text-xs bg-background px-1 py-0.5 rounded">registerAppTool</code>, 
                    <code className="text-xs bg-background px-1 py-0.5 rounded">createUIResource</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Building MCP Apps',
      description: 'Implement your own interactive agent UIs',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Step 1: UI Resource */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Step 1</Badge>
                Declare UI Resource
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// Register UI resource with ui:// scheme
server.resource(
  "greeting-ui",
  "ui://my-mcp-server/greeting",
  {
    description: "Interactive greeting UI panel",
    mimeType: "text/html;profile=mcp-app",
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: "text/html;profile=mcp-app",
      text: GREETING_HTML_TEMPLATE(),
      _meta: {
        ui: {
          csp: {},           // Content Security Policy
          prefersBorder: false,
        },
      },
    }],
  })
);`}
              </pre>
            </CardContent>
          </Card>
          
          {/* Step 2: Tool Annotation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Step 2</Badge>
                Annotate Tool with UI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`server.registerTool(
  "hello_world",
  {
    description: "Display a greeting with interactive UI",
    inputSchema: {
      name: z.string().describe("Name to greet"),
    },
    // 🔑 Key: Link tool to UI resource
    _meta: {
      ui: {
        resourceUri: "ui://my-mcp-server/greeting",
        visibility: ["model", "app"],
      },
    },
  },
  async ({ name }) => ({
    content: [{ type: "text", text: \`Hello, \${name}!\` }],
    // 🔑 Data passed to UI via tool-input notification
    structuredContent: {
      name,
      greeting: \`Hello, \${name}!\`,
      timestamp: new Date().toISOString(),
    },
  })
);`}
              </pre>
            </CardContent>
          </Card>
          
          {/* Step 3: UI Communication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Step 3</Badge>
                Implement UI Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// Inside your HTML template's <script>
async function initialize() {
  // Step 1: Send handshake
  const result = await sendRequest('ui/initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'my-app', version: '1.0.0' }
  });
  
  // Apply host theme (dark/light mode)
  const hostContext = result.hostContext || {};
  applyTheme(hostContext);
  
  // Step 2: Signal ready
  sendNotification('ui/notifications/initialized', {});
}

// Listen for tool data
window.addEventListener('message', (event) => {
  const msg = event.data;
  if (msg.method === 'ui/notifications/tool-input') {
    const { arguments: args } = msg.params;
    // Update UI with tool arguments
    document.getElementById('name').textContent = args.name;
  }
});

// Send user selection back to chat
async function submitSelection() {
  const selected = document.getElementById('input').value;
  await sendRequest('ui/message', {
    content: [{ type: 'text', text: \`User selected: \${selected}\` }]
  });
}`}
              </pre>
            </CardContent>
          </Card>
          
          {/* MCP Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">Step 4</Badge>
                Configure MCP Host
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">VS Code (.vscode/mcp.json)</h5>
                <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`{
  "servers": {
    "my-mcp-app": {
      "type": "stdio",
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h5 className="font-medium mb-2">Claude Desktop / Cursor</h5>
                <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`{
  "mcpServers": {
    "my-mcp-app": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Security & Best Practices',
      description: 'Security model and production patterns',
      icon: <Shield className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Security Model */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                MCP Apps Security Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Iframe Sandboxing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    UIs render in sandboxed iframes with restricted permissions. 
                    No access to parent DOM, localStorage, or network without explicit CSP.
                  </p>
                </div>
                <div className="border border-blue-500/30 bg-blue-500/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    Template Pre-Auditing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Hosts pre-fetch and audit HTML templates via <code className="text-xs bg-muted px-1 py-0.5 rounded">resources/read</code> 
                    before rendering. Static templates only.
                  </p>
                </div>
                <div className="border border-purple-500/30 bg-purple-500/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    Auditable Messages
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    All UI↔Host communication uses JSON-RPC over postMessage—fully observable, 
                    loggable, and auditable.
                  </p>
                </div>
                <div className="border border-orange-500/30 bg-orange-500/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    User Consent
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    UI-initiated tool calls require user approval. 
                    Users see and can modify messages before sending.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Production Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">1</Badge>
                  <div>
                    <h4 className="font-semibold">Keep Templates Static</h4>
                    <p className="text-sm text-muted-foreground">
                      HTML templates should be static—no dynamic code generation. 
                      All data comes via <code className="text-xs bg-muted px-1 py-0.5 rounded">tool-input</code> notifications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">2</Badge>
                  <div>
                    <h4 className="font-semibold">Respect Host Theme</h4>
                    <p className="text-sm text-muted-foreground">
                      Use <code className="text-xs bg-muted px-1 py-0.5 rounded">hostContext</code> from 
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">ui/initialize</code> to match host's dark/light mode.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">3</Badge>
                  <div>
                    <h4 className="font-semibold">Handle Standalone Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Gracefully degrade if <code className="text-xs bg-muted px-1 py-0.5 rounded">ui/initialize</code> fails. 
                      Enable UI controls for testing outside MCP hosts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1 ring-1 ring-[var(--badge-gray-ring)] bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]">4</Badge>
                  <div>
                    <h4 className="font-semibold">Use Proper CSP</h4>
                    <p className="text-sm text-muted-foreground">
                      Declare required external resources in <code className="text-xs bg-muted px-1 py-0.5 rounded">_meta.ui.csp</code>. 
                      Hosts may block unlisted domains.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* When to Use MCP Apps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                When to Use MCP Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Great Fit</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Multi-step data exploration</li>
                    <li>• Form inputs with validation</li>
                    <li>• Drag-and-drop interactions</li>
                    <li>• Visual data selection</li>
                    <li>• Real-time previews</li>
                    <li>• Complex configuration UIs</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">✗ Overkill</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Simple yes/no confirmations</li>
                    <li>• Single text responses</li>
                    <li>• File downloads</li>
                    <li>• Basic lists (use markdown)</li>
                    <li>• Static documentation</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ChatCircle className="w-4 h-4" />
                  The Golden Rule
                </h4>
                <p className="text-sm text-muted-foreground italic">
                  "Sometimes showing is better than telling—now agents can do both."
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Resources & References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a 
                  href="https://github.com/modelcontextprotocol/ext-apps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-3 hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">📦</span>
                  <div>
                    <div className="font-medium text-sm">MCP Apps Extension</div>
                    <div className="text-xs text-muted-foreground">Official specification & SDK</div>
                  </div>
                </a>
                <a 
                  href="https://github.com/digitarald/mcp-apps-playground" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-3 hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">🎮</span>
                  <div>
                    <div className="font-medium text-sm">MCP Apps Playground</div>
                    <div className="text-xs text-muted-foreground">Interactive examples & demos</div>
                  </div>
                </a>
                <a 
                  href="https://mcpui.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-3 hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">🎨</span>
                  <div>
                    <div className="font-medium text-sm">MCP-UI</div>
                    <div className="text-xs text-muted-foreground">Reference implementation</div>
                  </div>
                </a>
                <a 
                  href="https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg p-3 hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">💻</span>
                  <div>
                    <div className="font-medium text-sm">VS Code MCP Apps</div>
                    <div className="text-xs text-muted-foreground">VS Code integration guide</div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="data-visualization"
      title="MCP Apps & Agent UI"
      description="Build interactive UIs for AI agents using MCP Apps (2026 standard)"
      tabs={tabs}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}







