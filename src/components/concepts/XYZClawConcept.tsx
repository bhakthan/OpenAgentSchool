import { useState } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Robot,
  Lightning,
  Network,
  ArrowRight,
  ArrowsClockwise,
  TreeStructure,
  PlugsConnected,
  Warning,
  Books,
  ChartBar,
  Cpu,
  Queue,
  Folder,
  Terminal,
  Shield,
  Users,
  Eye,
  Play,
  Code,
  Gear,
  Chat,
  Clock,
  Database,
  FileCode,
  ListChecks,
  Sparkle,
  Path,
  Graph
} from "@phosphor-icons/react"
import { conceptSurface, conceptSurfaceSoft, conceptPill } from "./conceptStyles"
import ReferenceSection from "@/components/references/ReferenceSection"
import CodeBlock from "@/components/ui/CodeBlock"
import ArchitectureViz from "./xyz-claw/ArchitectureViz"
import SequenceDiagram from "./xyz-claw/SequenceDiagram"

interface XYZClawConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

// ── Architecture layer data ─────────────────────────────────────────────
const architectureLayers = [
  {
    id: "channels",
    label: "Channel Clients",
    subtitle: "The Ears & Mouth",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    icon: <Chat className="w-5 h-5" />,
    description: "Platform connectors (Discord, Telegram, WhatsApp) that blindly write incoming messages as JSON files to the queue and poll outgoing replies to deliver back. They have zero AI logic — pure I/O.",
    designPrinciple: "Decoupling",
    whyItMatters: "If the AI crashes, channels keep accepting messages. When the AI restarts, it crunches the backlog. Zero message loss."
  },
  {
    id: "queue",
    label: "File-Based Queue",
    subtitle: "The Nervous System",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    icon: <Queue className="w-5 h-5" />,
    description: "Three directories — incoming/, processing/, outgoing/ — form the entire message bus. Files move atomically via renameSync. No database, no Redis, no race conditions.",
    designPrinciple: "Simplicity over scale",
    whyItMatters: "You can debug the entire system with 'ls'. Crash recovery is free — if it's in processing/, an agent was working on it."
  },
  {
    id: "processor",
    label: "Queue Processor",
    subtitle: "The Brain",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/30",
    icon: <Cpu className="w-5 h-5" />,
    description: "A continuous loop that polls incoming/ every second, routes messages to the correct agent via @mentions, spawns AI processes in isolated workspaces, and writes responses to outgoing/.",
    designPrinciple: "Single responsibility",
    whyItMatters: "Every message flows through one component. This makes the system predictable, debuggable, and auditable."
  },
  {
    id: "agents",
    label: "Agent Workers",
    subtitle: "The Specialists",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/30",
    icon: <Robot className="w-5 h-5" />,
    description: "Each agent (@coder, @writer, @reviewer) has its own isolated folder, conversation history, system prompt, and AI model. They communicate only by passing messages through the queue.",
    designPrinciple: "Actor model isolation",
    whyItMatters: "Different projects, different prompts, independent histories. One agent's failure never corrupts another."
  }
]

// ── Message flow steps ──────────────────────────────────────────────────
const messageFlowSteps = [
  { step: 1, title: "Arrival", actor: "Discord Client", detail: 'User sends "fix the auth bug" on Discord', color: "text-blue-400" },
  { step: 2, title: "Ingestion", actor: "discord-client.ts", detail: "Downloads attachments, creates JSON payload, writes to incoming/", color: "text-blue-400" },
  { step: 3, title: "Detection", actor: "Queue Processor", detail: "Polls incoming/ every 1 second, finds new JSON file", color: "text-purple-400" },
  { step: 4, title: "Routing", actor: "Queue Processor", detail: 'Parses @prefix → routes to "default" agent (no prefix found)', color: "text-purple-400" },
  { step: 5, title: "Execution", actor: "AI Agent", detail: "Spawns Claude/GPT in isolated workspace, reads context, generates fix", color: "text-orange-400" },
  { step: 6, title: "Response", actor: "Queue Processor", detail: "Receives AI output, extracts file attachments, writes to outgoing/", color: "text-purple-400" },
  { step: 7, title: "Delivery", actor: "Discord Client", detail: "Polls outgoing/, sends reply + attachments to Discord channel", color: "text-emerald-400" }
]

// ── Design patterns ─────────────────────────────────────────────────────
const designPatterns = [
  {
    name: "File-Based Queue",
    vsAlternative: "vs Redis/RabbitMQ",
    pros: ["No external dependencies", "Atomic filesystem ops", "Debug with 'ls'", "Crash recovery built-in"],
    cons: ["Single-machine only", "No cross-operation transactions", "I/O overhead at scale"],
    verdict: "Simplicity > Scale — perfect for personal/team agents"
  },
  {
    name: "Per-Agent Promise Chains",
    vsAlternative: "vs Global Lock",
    pros: ["Same agent = sequential (preserves conversation)", "Different agents = parallel (3x throughput)", "No blocking across agents"],
    cons: ["Complex chain management", "Memory grows with concurrent agents"],
    verdict: "Erlang-style actor model without the runtime"
  },
  {
    name: "Channel Decoupling",
    vsAlternative: "vs Monolith Bot",
    pros: ["Channels survive AI crashes", "Add new platforms without touching core", "Independent scaling"],
    cons: ["Polling latency (1 second)", "File I/O per message"],
    verdict: "Resilience and extensibility over sub-second latency"
  }
]

// ── Real-world scenarios ────────────────────────────────────────────────
const scenarios = [
  {
    id: "support",
    title: "Enterprise Support Swarm",
    domain: "Customer Service",
    icon: <Users className="w-5 h-5" />,
    agents: ["Triage Agent → classifies intent", "Policy Agent → checks refund rules", "Action Agent → executes DB update", "Response Agent → drafts confirmation email"],
    keyInsight: "Each agent has one job. The 'intelligence' emerges from their interaction — not from a single God Brain."
  },
  {
    id: "newsroom",
    title: "24/7 Autonomous Newsroom",
    domain: "Media & Content",
    icon: <Eye className="w-5 h-5" />,
    agents: ["Monitor Agent → polls RSS feeds", "Reader Agent → scrapes & extracts text", "Writer Agent → summarizes for LinkedIn/Twitter", "Compliance Agent → checks for bias & sensitive content"],
    keyInsight: "The pipeline handles failures gracefully — paywall? Skip. Rate limit? Back off 15 min. File stays in queue."
  },
  {
    id: "devops",
    title: "Incident Commander",
    domain: "Infrastructure",
    icon: <Warning className="w-5 h-5" />,
    agents: ["Watchdog → receives alert webhooks", "Investigator → greps logs, correlates timestamps", "Medic → runs whitelisted remediation scripts", "Scribe → posts to Slack, drafts post-mortem"],
    keyInsight: "The Medic agent can only run commands from a whitelist — 'systemctl restart nginx' yes, 'rm -rf' never."
  },
  {
    id: "research",
    title: "Academic Research Assistant",
    domain: "Education",
    icon: <Books className="w-5 h-5" />,
    agents: ["Librarian → searches ArXiv/PubMed", "Reader → parses PDFs, extracts methodology", "Synthesizer → writes comparative summary", "Biblio → formats BibTeX/APA citations"],
    keyInsight: "Turns a 10-hour literature search into a 5-minute reading. The Reviewer agent rejects generic summaries."
  }
]

// ── System thinking concepts ────────────────────────────────────────────
const systemConcepts = [
  {
    title: "Feedback Loops",
    icon: <ArrowsClockwise className="w-5 h-5 text-emerald-400" />,
    description: "Outputs circle back as inputs to correct errors or improve quality.",
    analogy: "Like a thermostat: measure temperature → turn on heat → measure again → turn off.",
    application: "If an agent generates broken code, a Test Agent picks it up, fails the test, and sends an error report back. The loop closes when the test passes."
  },
  {
    title: "Emergent Properties",
    icon: <Sparkle className="w-5 h-5 text-purple-400" />,
    description: "Complex behaviors that arise from the interaction of simple parts.",
    analogy: "A single ant is simple, but an ant colony builds bridges and wages war. The 'intelligence' is in the interaction.",
    application: "There is no central 'God Brain'. The 'Support System' emerges from a Router (regex), a Database Agent (SQL), and a Response Writer (LLM) working together."
  },
  {
    title: "Interconnected Resilience",
    icon: <Network className="w-5 h-5 text-blue-400" />,
    description: "Components influence one another, but buffers (queues) prevent cascading failures.",
    analogy: "A restaurant kitchen and waiters — if the kitchen is slow, waiters don't stop taking orders; they queue tickets.",
    application: "The Discord Client and AI Engine are interconnected but decoupled. If the AI crashes, Discord keeps accepting messages. When the AI restarts, it crunches the backlog."
  }
]

// ── Code samples ────────────────────────────────────────────────────────
const queueProcessorCode = `// The Heart of the System: queue-processor.ts
// Runs infinitely — the only component that executes agent logic.

import fs from 'fs';
import path from 'path';

const QUEUE_INCOMING = '~/.tinyclaw/queue/incoming';
const QUEUE_PROCESSING = '~/.tinyclaw/queue/processing';
const QUEUE_OUTGOING = '~/.tinyclaw/queue/outgoing';

// 1. The Pulse: Check for new work every 1000ms
setInterval(processQueue, 1000);

async function processQueue() {
  const files = fs.readdirSync(QUEUE_INCOMING)
    .filter(f => f.endsWith('.json'))
    .sort((a, b) => /* oldest first */ a.localeCompare(b));

  for (const file of files) {
    await processMessage(path.join(QUEUE_INCOMING, file));
  }
}

async function processMessage(filePath: string) {
  const processingPath = filePath.replace('incoming', 'processing');

  // 2. Atomicity: rename = move. No partial reads.
  //    If system crashes here, file stays in processing/ (debuggable!)
  fs.renameSync(filePath, processingPath);

  // 3. Routing: who is this message for?
  const message = JSON.parse(fs.readFileSync(processingPath, 'utf-8'));
  const agentConfig = parseAgentRouting(message.content);
  // "@coder fix bug" → agent: "coder"
  // "@dev help"      → team: "dev" → leader: "coder"
  // "hello"          → agent: "default"

  // 4. Isolation: invoke AI in agent-specific folder
  const response = await invokeAI({
    model: agentConfig.model,        // claude-sonnet-4-5 or gpt-5.3-codex
    cwd: agentConfig.workingDirectory, // ~/workspace/coder/
    prompt: message.content
  });

  // 5. Write response to outgoing queue
  fs.writeFileSync(
    path.join(QUEUE_OUTGOING, \`\${message.channel}_\${message.messageId}.json\`),
    JSON.stringify({ ...message, response })
  );
}`

const channelClientCode = `// The Ears & Mouth: discord-client.ts
// NOTE: This file imports ZERO AI libraries. Pure I/O.

import { Client } from 'discord.js';
import fs from 'fs';

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

// THE EARS — Listen and write to queue
client.on('messageCreate', (msg) => {
  // Don't process logic here. Just save the raw data.
  const payload = {
    channel: 'discord',
    sender: msg.author.username,
    content: msg.content,
    channelId: msg.channelId,
    messageId: \`\${msg.id}_\${Date.now()}\`,
    timestamp: Date.now()
  };

  // Fire and forget — write JSON, go back to listening
  fs.writeFileSync(
    \`~/.tinyclaw/queue/incoming/discord_\${payload.messageId}.json\`,
    JSON.stringify(payload)
  );
});

// THE MOUTH — Poll outgoing queue for replies
setInterval(() => {
  const replies = fs.readdirSync('~/.tinyclaw/queue/outgoing')
    .filter(f => f.startsWith('discord_'));

  for (const reply of replies) {
    const data = JSON.parse(fs.readFileSync(reply, 'utf-8'));
    const channel = client.channels.cache.get(data.channelId);
    channel?.send(data.response);
    fs.unlinkSync(reply); // Consumed — delete
  }
}, 1000);`

const parallelProcessingCode = `// Per-agent promise chains — the Actor Model in JavaScript
// Same agent = sequential | Different agents = parallel

const agentProcessingChains = new Map<string, Promise<void>>();

function enqueueForAgent(agentId: string, message: QueueMessage) {
  // Get (or create) the chain for this agent
  const currentChain = agentProcessingChains.get(agentId)
    ?? Promise.resolve();

  // Append this message to the agent's chain
  const newChain = currentChain.then(() => processMessage(agentId, message));
  agentProcessingChains.set(agentId, newChain);
}

// Performance comparison:
// ┌──────────────┬─────────────────────────────────────────┐
// │ Sequential   │ 3 messages × 20s each = 60s total      │
// │ Parallel     │ 3 agents × 1 message  = 20s total (3x) │
// └──────────────┴─────────────────────────────────────────┘`

const teamCollaborationCode = `// Team Collaboration — Actor Model message passing

// User sends: "@dev fix the auth bug"
// Team: @dev → Leader: @coder

// 1. @coder processes the message
const coderResponse = await invokeAgent('coder', message);
// → "Fixed! [@reviewer: please check my changes]"

// 2. Queue processor detects inter-agent mentions
const mentions = extractTeammateMentions(coderResponse);
// → [{ target: 'reviewer', message: 'please check my changes' }]

// 3. Enqueue messages for each mentioned teammate
for (const mention of mentions) {
  enqueueInternalMessage({
    conversationId,
    from: 'coder',
    target: mention.target,  // 'reviewer'
    message: mention.message
  });
}

// 4. @reviewer processes, responds: "LGTM!"

// 5. All branches complete → aggregate responses
// User receives:
// ┌──────────────────────────────────────────────┐
// │ @coder:    Fixed the bug in auth.ts...       │
// │ ──────────────────────────────────────        │
// │ @reviewer: Changes look good, approved!      │
// └──────────────────────────────────────────────┘`

const settingsJsonCode = `// .tinyclaw/settings.json — Agent Configuration
{
  "system": {
    "tickRate": 1000,           // Queue poll interval (ms)
    "maxConcurrentAgents": 5,   // Parallel execution limit
    "logLevel": "info"
  },
  "agents": {
    "coder": {
      "model": "claude-sonnet-4-5",
      "cwd": "./workspace/coder",      // Isolated folder
      "capabilities": ["code_edit", "test_run"],
      "systemPrompt": "You are an expert software engineer."
    },
    "writer": {
      "model": "gemini-1.5-pro",
      "cwd": "./workspace/writer",
      "capabilities": ["draft_doc", "edit_markdown"],
      "temperature": 0.7
    },
    "reviewer": {
      "model": "claude-sonnet-4-5",
      "cwd": "./workspace/reviewer",
      "capabilities": ["code_review", "security_audit"],
      "access": ["read_only"]          // Can't modify files
    }
  },
  "teams": {
    "dev": {
      "leader": "coder",
      "members": ["coder", "reviewer"],
      "goal": "Develop and review code collaboratively"
    }
  }
}`

// ── Learning outcomes ───────────────────────────────────────────────────
const learningOutcomes = [
  { icon: <TreeStructure className="w-5 h-5" />, label: "Building distributed systems with message queues" },
  { icon: <Folder className="w-5 h-5" />, label: "Managing multiple AI agents with isolated contexts" },
  { icon: <PlugsConnected className="w-5 h-5" />, label: "Implementing real-time multi-platform communication" },
  { icon: <Robot className="w-5 h-5" />, label: "Designing actor-model architectures for AI collaboration" },
  { icon: <Database className="w-5 h-5" />, label: "File-based persistence and crash recovery patterns" }
]

export default function XYZClawConcept({ onMarkComplete, onNavigateToNext }: XYZClawConceptProps) {
  const [activeLayer, setActiveLayer] = useState<string>("channels")
  const [activeScenario, setActiveScenario] = useState<string>("support")

  return (
    <ConceptLayout
      conceptId="xyz-claw"
      title="XYZ-Claw: Multi-Agent Orchestration End-to-End"
      description="Learn production-ready multi-agent architecture by building a real system — from message queues and agent isolation to team collaboration and real-world scenarios."
      icon={<Robot className="w-8 h-8" />}
      estimatedTime="60-90 min"
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
      tabs={[
        {
          id: "overview",
          title: "Big Picture",
          description: "Architecture overview and learning outcomes",
          icon: <Network className="w-4 h-4" />,
          level: "fundamentals",
          content: (
            <div className="space-y-8">
              {/* Educational disclaimer */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-4 text-sm text-amber-900 dark:text-amber-200">
                <Warning className="w-5 h-5 mt-0.5 shrink-0" weight="fill" />
                <div>
                  <strong>Educational purpose only.</strong>{" "}
                  The architectures and code explored here are learning tools, not production-hardened software.
                  If you experiment with the reference implementations, run them in an <strong>isolated environment</strong> (container, VM, or sandbox) and never expose them to untrusted traffic without additional security review.
                </div>
              </div>

              {/* Hero */}
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-3">What is XYZ-Claw?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  XYZ-Claw is an educational framework for understanding <strong>production-ready, multi-agent AI orchestration</strong>.
                  Instead of a single monolithic bot, you build a system of specialist agents that communicate through a simple file-based queue —
                  each with its own workspace, conversation history, and AI model.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Think of it as a <strong>"backend for AI agents"</strong> that handles messaging, routing, persistence, and team collaboration,
                  running 24/7 with crash recovery built in. This concept uses{" "}
                  <a href="https://github.com/jlia0/tinyclaw" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    TinyClaw
                  </a>{" "}
                  as the reference implementation — a real, open-source project you can run today.
                </p>

                {/* Learning Outcomes */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {learningOutcomes.map((outcome, i) => (
                    <div key={i} className={conceptSurfaceSoft("flex items-center gap-3 p-3")}>
                      <span className="text-primary">{outcome.icon}</span>
                      <span className="text-sm">{outcome.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram — converted from teach-tinyclaw-architecture */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" /> Architecture at a Glance
                </h3>
                <img
                  src="/images/TinyClaw_Architecture.webp"
                  alt="XYZ-Claw / TinyClaw architecture diagram showing supervisor, queue, agent workers, and pipeline stages"
                  className="w-full rounded-lg border border-border/40"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Full architecture diagram from the{" "}
                  <a href="https://github.com/jlia0/tinyclaw" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    TinyClaw
                  </a>{" "}reference implementation.
                </p>
              </div>

              {/* Architecture Layers */}
              <div>
                <h3 className="text-xl font-bold mb-4">Architecture Layers</h3>
                <p className="text-muted-foreground mb-6">
                  Click each layer to understand its role. Every production multi-agent system needs these four components — XYZ-Claw shows the simplest possible implementation of each.
                </p>

                <div className="grid md:grid-cols-4 gap-3 mb-6">
                  {architectureLayers.map(layer => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayer(layer.id)}
                      className={`text-left p-4 rounded-lg border transition-all ${
                        activeLayer === layer.id
                          ? layer.bgColor + " ring-1 ring-primary/30"
                          : "border-border/40 bg-muted/20 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={layer.color}>{layer.icon}</span>
                        <span className="font-semibold text-sm">{layer.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{layer.subtitle}</p>
                    </button>
                  ))}
                </div>

                {/* Active layer detail */}
                {architectureLayers.filter(l => l.id === activeLayer).map(layer => (
                  <Card key={layer.id} className={layer.bgColor}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className={layer.color}>{layer.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{layer.label}</CardTitle>
                          <CardDescription>{layer.subtitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground/80">{layer.description}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className={conceptSurfaceSoft("p-4")}>
                          <Badge variant="outline" className="mb-2">Design Principle</Badge>
                          <p className="text-sm font-medium">{layer.designPrinciple}</p>
                        </div>
                        <div className={conceptSurfaceSoft("p-4")}>
                          <Badge variant="outline" className="mb-2">Why It Matters</Badge>
                          <p className="text-sm text-muted-foreground">{layer.whyItMatters}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ASCII Architecture Diagram */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Graph className="w-5 h-5 text-primary" /> System Architecture
                </h3>
                <CodeBlock
                  language="text"
                >{`┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACES                          │
│    Discord    │    Telegram    │    WhatsApp    │  Heartbeat  │
└──────────────────────────┬──────────────────────────────────┘
                           │  JSON files
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 FILE-BASED QUEUE SYSTEM                       │
│                                                               │
│   incoming/  ──→  processing/  ──→  outgoing/                │
│   (new msgs)     (in flight)       (ready to send)           │
└──────────────────────────┬──────────────────────────────────┘
                           │  route by @prefix
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              QUEUE PROCESSOR  (The Brain)                     │
│                                                               │
│   • Routes messages to agents via @mentions                  │
│   • Manages team conversations & branching                   │
│   • Handles parallel processing per agent                    │
└──────────────────────────┬──────────────────────────────────┘
                           │  isolated contexts
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AGENT WORKERS                              │
│                                                               │
│   @coder    │   @writer    │   @reviewer   │   @assistant    │
│   ──────────────────────────────────────────────────         │
│   Each has: isolated workspace · own history · custom model  │
└─────────────────────────────────────────────────────────────┘`}</CodeBlock>
              </div>

              {/* Interactive Architecture Visualization */}
              <div className="mt-6">
                <ArchitectureViz />
              </div>
            </div>
          )
        },
        {
          id: "message-flow",
          title: "Message Flow",
          description: "End-to-end message journey and team collaboration",
          icon: <ArrowRight className="w-4 h-4" />,
          level: "architecture",
          content: (
            <div className="space-y-8">
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-2">End-to-End Message Journey</h2>
                <p className="text-muted-foreground mb-6">
                  Trace how a single user message travels through the entire system — from arrival on Discord to AI-generated response delivery.
                </p>

                {/* Visual flow */}
                <div className="space-y-1">
                  {messageFlowSteps.map((step, i) => (
                    <div key={step.step} className="flex gap-4 items-start group">
                      {/* Step number */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm
                          ${step.color} border-current bg-current/10`}
                        >
                          {step.step}
                        </div>
                        {i < messageFlowSteps.length - 1 && (
                          <div className="w-0.5 h-8 bg-border/40" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{step.title}</span>
                          <Badge variant="outline" className="text-xs">{step.actor}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={conceptSurfaceSoft("p-4 mt-4")}>
                  <p className="text-sm">
                    <strong>Total latency:</strong> ~1-3 seconds (queue polling) + AI inference time (5-30 seconds depending on complexity)
                  </p>
                </div>
              </div>

              {/* Team collaboration flow */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Team Collaboration (Actor Model)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Teams use message passing — like Erlang/Akka actors. Agents talk to each other by writing to each other's queues.
                </p>

                <CodeBlock language="text">{`User: "@dev fix the auth bug"
       ↓
[Team: @dev, Leader: @coder]
       ↓
@coder processes message
       ↓
@coder responds: "Fixed! [@reviewer: please check my changes]"
       ↓
Queue processor detects [@reviewer: ...] mention
       ↓
Creates new internal message for @reviewer
       ↓
@reviewer processes, responds: "LGTM!"
       ↓
All branches complete → aggregate responses
       ↓
User receives combined response from all agents`}</CodeBlock>
              </div>

              {/* Interactive Sequence Diagram */}
              <div className="mt-6">
                <SequenceDiagram />
              </div>
            </div>
          )
        },
        {
          id: "code-walkthrough",
          title: "Code Walkthrough",
          description: "Annotated source code for every component",
          icon: <Code className="w-4 h-4" />,
          level: "implementation",
          content: (
            <div className="space-y-8">
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-2">Inside the Codebase</h2>
                <p className="text-muted-foreground mb-6">
                  Walk through the actual implementation. Each component is designed to be as simple as possible — complexity emerges from their interaction.
                </p>
              </div>

              <Tabs defaultValue="processor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                  <TabsTrigger value="processor">Queue Processor</TabsTrigger>
                  <TabsTrigger value="channel">Channel Client</TabsTrigger>
                  <TabsTrigger value="parallel">Parallel Processing</TabsTrigger>
                  <TabsTrigger value="teams">Team Collaboration</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                </TabsList>

                <TabsContent value="processor" className="space-y-4 mt-4">
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-400" /> queue-processor.ts — The Brain
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The only component that executes agent logic. Five steps: poll → move (atomic) → route → invoke → respond.
                    </p>
                    <CodeBlock language="typescript">{queueProcessorCode}</CodeBlock>
                  </div>
                </TabsContent>

                <TabsContent value="channel" className="space-y-4 mt-4">
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Chat className="w-4 h-4 text-blue-400" /> discord-client.ts — The Ears & Mouth
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This file imports zero AI libraries. It just copies text from Discord to JSON and polls for replies. That's the power of decoupling.
                    </p>
                    <CodeBlock language="typescript">{channelClientCode}</CodeBlock>
                  </div>
                </TabsContent>

                <TabsContent value="parallel" className="space-y-4 mt-4">
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightning className="w-4 h-4 text-yellow-400" /> Parallel Processing — Actor Model
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Messages to the same agent run sequentially (preserving conversation context). Messages to different agents run in parallel (3x throughput).
                    </p>
                    <CodeBlock language="typescript">{parallelProcessingCode}</CodeBlock>
                  </div>
                </TabsContent>

                <TabsContent value="teams" className="space-y-4 mt-4">
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" /> Team Collaboration — Message Passing
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Agents collaborate by embedding mentions in their responses. The queue processor detects these and creates new internal messages.
                    </p>
                    <CodeBlock language="typescript">{teamCollaborationCode}</CodeBlock>
                  </div>
                </TabsContent>

                <TabsContent value="config" className="space-y-4 mt-4">
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Gear className="w-4 h-4 text-muted-foreground" /> settings.json — Agent Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Each agent is defined with its model, workspace directory, capabilities, and optional constraints. Teams group agents with a designated leader.
                    </p>
                    <CodeBlock language="json">{settingsJsonCode}</CodeBlock>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Project structure */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" /> Project Structure
                </h3>
                <CodeBlock
                  language="text"
                >{`tinyclaw/
├── tinyclaw.sh              # CLI entry point — command router
├── package.json             # Node.js dependencies
│
├── lib/                     # Bash utilities
│   ├── daemon.sh            # tmux session management (24/7)
│   ├── agents.sh            # Agent CRUD operations
│   ├── teams.sh             # Team management
│   └── setup-wizard.sh      # Interactive first-run setup
│
├── src/                     # TypeScript core logic
│   ├── queue-processor.ts   # ⭐ THE BRAIN — routes & processes all messages
│   ├── channels/            # Platform integrations (zero AI logic)
│   │   ├── discord-client.ts
│   │   ├── telegram-client.ts
│   │   └── whatsapp-client.ts
│   └── lib/                 # Shared modules
│       ├── config.ts        # Settings loader
│       ├── invoke.ts        # AI provider spawner
│       ├── routing.ts       # @agent and @team parsing
│       └── types.ts         # TypeScript interfaces
│
└── .tinyclaw/               # Runtime data (created at startup)
    ├── settings.json        # Configuration
    ├── queue/               # The nervous system
    │   ├── incoming/        # New messages land here
    │   ├── processing/      # In-flight (atomic move guarantees)
    │   └── outgoing/        # Ready to send back
    ├── logs/                # Audit trail
    └── pairing.json         # Approved senders (anti-spam)`}</CodeBlock>
              </div>
            </div>
          )
        },
        {
          id: "design-patterns",
          title: "Design Patterns",
          description: "Trade-offs, isolation, and architectural decisions",
          icon: <TreeStructure className="w-4 h-4" />,
          level: "architecture",
          content: (
            <div className="space-y-8">
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-2">Key Design Decisions</h2>
                <p className="text-muted-foreground">
                  Every architecture involves trade-offs. Understanding <em>why</em> each decision was made teaches you more than memorizing the pattern.
                </p>
              </div>

              {/* Pattern cards */}
              <div className="space-y-6">
                {designPatterns.map((pattern) => (
                  <Card key={pattern.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-lg">{pattern.name}</CardTitle>
                        <Badge variant="outline">{pattern.vsAlternative}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className={conceptSurfaceSoft("p-4")}>
                          <h5 className="text-sm font-semibold text-emerald-500 mb-2">Pros</h5>
                          <ul className="space-y-1">
                            {pattern.pros.map((pro, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">✓</span> {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={conceptSurfaceSoft("p-4")}>
                          <h5 className="text-sm font-semibold text-red-400 mb-2">Cons</h5>
                          <ul className="space-y-1">
                            {pattern.cons.map((con, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">✗</span> {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="text-sm font-medium">
                          <span className="text-primary">Verdict:</span> {pattern.verdict}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Agent isolation comparison */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-lg font-bold mb-4">Agent Isolation: Why It Matters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5">
                    <h5 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <Warning className="w-4 h-4" /> Wrong: Shared Workspace
                    </h5>
                    <CodeBlock language="text">{`/workspace/
├── all_agents_here/    # Who wrote what?
├── project1/           # Agents overwrite each other
└── confusion/          # Conversations mix`}</CodeBlock>
                    <p className="text-xs text-red-300 mt-2">Agents overwrite files, conversations mix, impossible to debug</p>
                  </div>
                  <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                    <h5 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Right: Isolated Workspaces
                    </h5>
                    <CodeBlock language="text">{`/workspace/
├── coder/              # Own .config, history, files
│   ├── .claude/
│   └── AGENTS.md
├── writer/             # Separate context entirely
│   └── docs/
└── reviewer/           # Read-only access configured`}</CodeBlock>
                    <p className="text-xs text-emerald-300 mt-2">Different projects, prompts, histories — one failure never corrupts another</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "systems-thinking",
          title: "Systems Thinking",
          description: "Feedback loops, emergence, and resilience",
          icon: <Brain className="w-4 h-4" />,
          level: "advanced",
          content: (
            <div className="space-y-8">
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-3">Thinking in Systems</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Building AI orchestration isn't just about prompting models. It's about designing a living system where multiple agents, queues, and data streams interact.
                  To succeed, we move from linear thinking (<em>"A calls B"</em>) to holistic thinking (<em>"A influences the environment of B"</em>).
                </p>
              </div>

              <div className="space-y-6">
                {systemConcepts.map((concept, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={conceptSurface("p-3 shrink-0")}>
                          {concept.icon}
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="text-lg font-bold mb-1">{concept.title}</h4>
                            <p className="text-muted-foreground">{concept.description}</p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className={conceptSurfaceSoft("p-4")}>
                              <Badge variant="outline" className="mb-2 text-emerald-500 border-emerald-500/30">Real-World Analogy</Badge>
                              <p className="text-sm italic text-muted-foreground">"{concept.analogy}"</p>
                            </div>
                            <div className={conceptSurfaceSoft("p-4")}>
                              <Badge variant="outline" className="mb-2 text-blue-500 border-blue-500/30">Applied to XYZ-Claw</Badge>
                              <p className="text-sm text-muted-foreground">{concept.application}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        },
        {
          id: "scenarios",
          title: "Real-World Scenarios",
          description: "Domain applications across industries",
          icon: <Lightning className="w-4 h-4" />,
          level: "advanced",
          content: (
            <div className="space-y-8">
              <div className={conceptSurface("p-6")}>
                <h2 className="text-2xl font-bold mb-2">Domain Applications</h2>
                <p className="text-muted-foreground">
                  The same architecture pattern applies across industries. Each scenario shows how specialist agents collaborate to solve real problems.
                </p>
              </div>

              {/* Scenario selector */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {scenarios.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScenario(s.id)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      activeScenario === s.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border/40 bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">{s.icon}</span>
                      <span className="font-semibold text-sm">{s.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{s.domain}</Badge>
                  </button>
                ))}
              </div>

              {/* Active scenario */}
              {scenarios.filter(s => s.id === activeScenario).map(s => (
                <Card key={s.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{s.icon}</span>
                      <div>
                        <CardTitle>{s.title}</CardTitle>
                        <CardDescription>{s.domain}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Agent pipeline */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <ListChecks className="w-4 h-4" /> Agent Pipeline
                      </h4>
                      <div className="space-y-2">
                        {s.agents.map((agent, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                              {i + 1}
                            </div>
                            <span className="text-sm">{agent}</span>
                            {i < s.agents.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-muted-foreground hidden sm:block" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key insight */}
                    <div className={conceptSurface("p-4")}>
                      <h5 className="text-sm font-semibold mb-1 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" /> Key Insight
                      </h5>
                      <p className="text-sm text-muted-foreground">{s.keyInsight}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Cross-scenario lesson */}
              <div className={conceptSurface("p-6")}>
                <h3 className="text-lg font-bold mb-3">The Pattern Across Scenarios</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className={conceptSurfaceSoft("p-4")}>
                    <h5 className="text-sm font-semibold mb-2">What stays the same</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• File-based queue for message passing</li>
                      <li>• Isolated agent workspaces</li>
                      <li>• Queue processor as central router</li>
                      <li>• Crash recovery via filesystem</li>
                    </ul>
                  </div>
                  <div className={conceptSurfaceSoft("p-4")}>
                    <h5 className="text-sm font-semibold mb-2">What changes per domain</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Agent specializations & system prompts</li>
                      <li>• Compliance requirements (HIPAA, copyright)</li>
                      <li>• Safety guardrails & whitelists</li>
                      <li>• Integration channels (SMS, MQTT, webhooks)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "references",
          title: "References",
          description: "Source material and further reading",
          icon: <Books className="w-4 h-4" />,
          level: "fundamentals",
          content: (
            <ReferenceSection type="concept" itemId="xyz-claw" />
          )
        }
      ]}
    />
  )
}
