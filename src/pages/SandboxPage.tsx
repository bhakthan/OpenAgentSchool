/**
 * Multi-Agent Sandbox Page
 * Configure agents, run simulations, view message timelines.
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  runSimulation,
  type AgentConfig,
  type AgentRole,
  type SimulationMessage,
} from '@/lib/simulationEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Robot, Plus, Play, ArrowClockwise, Trash, Eye } from '@phosphor-icons/react';

const ROLE_COLORS: Record<AgentRole, string> = {
  orchestrator: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  worker: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  reviewer: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  critic: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

function generateAgentId(): string {
  return `agent-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
}

// ── Agent Config Panel ───────────────────────────────────────────────────

function AgentConfigPanel({
  agents,
  onAdd,
  onRemove,
}: {
  agents: AgentConfig[];
  onAdd: (agent: AgentConfig) => void;
  onRemove: (id: string) => void;
}) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<AgentRole>('worker');
  const [prompt, setPrompt] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: generateAgentId(),
      name: name.trim(),
      role,
      systemPrompt: prompt.trim() || `Default ${role} agent`,
    });
    setName('');
    setPrompt('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Robot className="w-4 h-4" /> Agent Configuration
        </CardTitle>
        <CardDescription>Add agents with roles to participate in the simulation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleAdd} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Agent name"
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AgentRole)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="orchestrator">Orchestrator</option>
              <option value="worker">Worker</option>
              <option value="reviewer">Reviewer</option>
              <option value="critic">Critic</option>
            </select>
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="System prompt (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          />
          <Button type="submit" size="sm" className="gap-1">
            <Plus className="w-3 h-3" /> Add Agent
          </Button>
        </form>

        {agents.length > 0 && (
          <div className="space-y-2 mt-3">
            {agents.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{a.name}</span>
                  <Badge className={ROLE_COLORS[a.role]} variant="outline">
                    {a.role}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onRemove(a.id)}
                >
                  <Trash className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Message Inspector ────────────────────────────────────────────────────

function MessageInspector({ message }: { message: SimulationMessage }) {
  return (
    <Card className="border-blue-500/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Message Inspector</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p><strong>Agent:</strong> {message.agentName}</p>
        <p><strong>Role:</strong> {message.role}</p>
        <p><strong>Token estimate:</strong> ~{message.tokenEstimate} tokens</p>
        <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleTimeString()}</p>
        <p><strong>Latency (mock):</strong> {Math.floor(Math.random() * 500 + 200)}ms</p>
      </CardContent>
    </Card>
  );
}

// ── Message Timeline ─────────────────────────────────────────────────────

function MessageTimeline({
  messages,
  visibleCount,
  onInspect,
  inspectedId,
}: {
  messages: SimulationMessage[];
  visibleCount: number;
  onInspect: (msg: SimulationMessage) => void;
  inspectedId: string | null;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount]);

  const visible = messages.slice(0, visibleCount);

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {visible.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 border rounded-md transition-colors cursor-pointer ${
            inspectedId === msg.id ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'hover:bg-muted/50'
          }`}
          onClick={() => onInspect(msg)}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {msg.agentName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{msg.agentName}</span>
            <Badge className={ROLE_COLORS[msg.role]} variant="outline">
              {msg.role}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground ml-9">{msg.content}</p>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

// ── Main Sandbox Page ────────────────────────────────────────────────────

const SandboxPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentConfig[]>([
    { id: 'default-orch', name: 'Coordinator', role: 'orchestrator', systemPrompt: 'Lead orchestrator' },
    { id: 'default-worker', name: 'Analyst', role: 'worker', systemPrompt: 'Worker agent' },
    { id: 'default-reviewer', name: 'QA Lead', role: 'reviewer', systemPrompt: 'Review agent' },
  ]);
  const [task, setTask] = useState('Analyze the feasibility of building a RAG pipeline for internal documentation');
  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [inspected, setInspected] = useState<SimulationMessage | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const replayTimer = useRef<number | null>(null);

  const handleRun = useCallback(() => {
    if (!task.trim() || agents.length === 0) return;
    const result = runSimulation(agents, task);
    setMessages(result);
    setVisibleCount(result.length);
    setInspected(null);
    setIsReplaying(false);
  }, [agents, task]);

  const handleReplay = useCallback(() => {
    if (messages.length === 0) return;
    setVisibleCount(0);
    setIsReplaying(true);
    setInspected(null);
    let count = 0;
    const tick = () => {
      count++;
      setVisibleCount(count);
      if (count < messages.length) {
        replayTimer.current = window.setTimeout(tick, 600);
      } else {
        setIsReplaying(false);
      }
    };
    replayTimer.current = window.setTimeout(tick, 300);
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replayTimer.current) clearTimeout(replayTimer.current);
    };
  }, []);

  const addAgent = (agent: AgentConfig) => setAgents((prev) => [...prev, agent]);
  const removeAgent = (id: string) => setAgents((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Robot className="w-6 h-6 text-violet-500" weight="duotone" />
          Multi-Agent Sandbox
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure agents, run simulations, and explore multi-agent collaboration.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <AgentConfigPanel agents={agents} onAdd={addAgent} onRemove={removeAgent} />

          {/* Task input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Describe the task for the agents..."
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm h-20 resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleRun}
                  disabled={agents.length === 0 || !task.trim() || isReplaying}
                  className="gap-1"
                >
                  <Play className="w-4 h-4" /> Run Simulation
                </Button>
                {messages.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleReplay}
                    disabled={isReplaying}
                    className="gap-1"
                  >
                    <ArrowClockwise className="w-4 h-4" /> Replay
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inspector */}
          {inspected && <MessageInspector message={inspected} />}
        </div>

        <div className="lg:col-span-2">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center space-y-3">
                <Robot size={48} className="mx-auto text-muted-foreground" weight="duotone" />
                <h3 className="text-lg font-semibold">No Simulation Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Configure agents and run a simulation to see the message timeline.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Message Timeline
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {visibleCount}/{messages.length} messages
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <MessageTimeline
                  messages={messages}
                  visibleCount={visibleCount}
                  onInspect={setInspected}
                  inspectedId={inspected?.id ?? null}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SandboxPage;
