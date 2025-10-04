import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  RotateCcw,
  Loader2,
  Workflow,
  MessageSquare,
  CreditCard,
  Wrench,
  Users,
  CheckCircle2,
  ArrowRight,
  Timer,
} from 'lucide-react';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

 type WorkerKey = 'billing' | 'technical' | 'general';

type TaskStatus = 'pending' | 'routing' | 'assigned' | 'complete';

interface TaskBlueprint {
  id: string;
  summary: string;
  channel: 'Email' | 'Chat' | 'Phone';
  domain: WorkerKey;
  priority: 'Standard' | 'Urgent';
  resolutionMs: number;
}

interface Task extends TaskBlueprint {
  status: TaskStatus;
  assignedWorker?: WorkerKey;
}

interface WorkerMetric {
  processed: number;
  totalLatency: number;
}

const TASK_QUEUE: TaskBlueprint[] = [
  {
    id: 'REQ-4821',
    summary: 'Refund request for invoice #5541',
    channel: 'Email',
    domain: 'billing',
    priority: 'Standard',
    resolutionMs: 900,
  },
  {
    id: 'REQ-4822',
    summary: 'Device fails to pair with mobile app',
    channel: 'Chat',
    domain: 'technical',
    priority: 'Urgent',
    resolutionMs: 1200,
  },
  {
    id: 'REQ-4823',
    summary: 'Add teammate to workspace subscription',
    channel: 'Email',
    domain: 'billing',
    priority: 'Standard',
    resolutionMs: 700,
  },
  {
    id: 'REQ-4824',
    summary: 'Clarify onboarding checklist for new agent',
    channel: 'Chat',
    domain: 'general',
    priority: 'Standard',
    resolutionMs: 800,
  },
  {
    id: 'REQ-4825',
    summary: 'Escalate service outage affecting Region EU-West',
    channel: 'Phone',
    domain: 'technical',
    priority: 'Urgent',
    resolutionMs: 1400,
  },
];

const createInitialTasks = (): Task[] =>
  TASK_QUEUE.map((task) => ({
    ...task,
    status: 'pending' as TaskStatus,
  }));

const baseWorkerMetrics = (): Record<WorkerKey, WorkerMetric> => ({
  billing: { processed: 0, totalLatency: 0 },
  technical: { processed: 0, totalLatency: 0 },
  general: { processed: 0, totalLatency: 0 },
});

const WORKER_META: Record<WorkerKey, {
  name: string;
  specialty: string;
  accent: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  billing: {
    name: 'Billing Specialist',
    specialty: 'Subscriptions • Refunds • Usage limits',
    accent: 'text-emerald-600',
    badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: CreditCard,
  },
  technical: {
    name: 'Technical Diagnostic Agent',
    specialty: 'Integrations • API faults • Reliability',
    accent: 'text-sky-600',
    badge: 'border border-sky-200 bg-sky-50 text-sky-700',
    icon: Wrench,
  },
  general: {
    name: 'Success Concierge',
    specialty: 'Onboarding • Playbooks • Navigation',
    accent: 'text-amber-600',
    badge: 'border border-amber-200 bg-amber-50 text-amber-700',
    icon: Users,
  },
};

const statusLabels: Record<TaskStatus, { label: string; style: string }> = {
  pending: { label: 'Waiting', style: 'border border-border bg-muted/40 text-muted-foreground' },
  routing: { label: 'Routing', style: 'border border-blue-200 bg-blue-50 text-blue-700' },
  assigned: { label: 'In Flight', style: 'border border-amber-200 bg-amber-50 text-amber-700' },
  complete: { label: 'Resolved', style: 'border border-emerald-200 bg-emerald-50 text-emerald-700' },
};

const channelBadge: Record<TaskBlueprint['channel'], string> = {
  Email: 'border border-slate-200 bg-slate-50 text-slate-600',
  Chat: 'border border-purple-200 bg-purple-50 text-purple-700',
  Phone: 'border border-orange-200 bg-orange-50 text-orange-700',
};

const priorityBadge: Record<TaskBlueprint['priority'], string> = {
  Standard: 'border border-slate-200 bg-slate-50 text-slate-600',
  Urgent: 'border border-rose-200 bg-rose-50 text-rose-700',
};

const routeTask = (task: TaskBlueprint): WorkerKey => {
  return task.domain;
};

const OrchestratorWorkerLiveRunner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => createInitialTasks());
  const [isRunning, setIsRunning] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [workerStats, setWorkerStats] = useState<Record<WorkerKey, WorkerMetric>>(
    () => baseWorkerMetrics()
  );

  const appendLog = (entries: string | string[]) => {
    const updates = Array.isArray(entries) ? entries : [entries];
    setLog((prev) => {
      const next = [...prev, ...updates];
      return next.slice(-24);
    });
  };

  const reset = () => {
    setIsRunning(false);
    setActiveTaskId(null);
    setTasks(createInitialTasks());
    setWorkerStats(baseWorkerMetrics());
    setLog([]);
  };

  const runSimulation = async () => {
    if (isRunning) return;

    reset();
  setIsRunning(true);
  appendLog('🚦 Orchestrator online — routing queue to worker agents...');

    for (const task of TASK_QUEUE) {
      setActiveTaskId(task.id);
      setTasks((prev) =>
        prev.map((item) => (item.id === task.id ? { ...item, status: 'routing' } : item))
      );
      appendLog([
        `📨 Task ${task.id} received (${task.summary})`,
        '🤔 Selecting optimal worker based on domain + load...'
      ]);

      await wait(600);

      const workerKey = routeTask(task);
      const worker = WORKER_META[workerKey];

      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? { ...item, status: 'assigned', assignedWorker: workerKey }
            : item
        )
      );
      appendLog([
        `🤝 Assigned to ${worker.name}`,
        '⚙️ Worker generating response...'
      ]);

      await wait(task.resolutionMs);

      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id ? { ...item, status: 'complete' } : item
        )
      );
      setWorkerStats((prev) => ({
        ...prev,
        [workerKey]: {
          processed: prev[workerKey].processed + 1,
          totalLatency: prev[workerKey].totalLatency + task.resolutionMs,
        },
      }));
      appendLog(`✅ ${worker.name} resolved ${task.id} in ${(task.resolutionMs / 1000).toFixed(1)}s`);

      await wait(250);
    }

    setActiveTaskId(null);
    setIsRunning(false);
  appendLog('🏁 Queue empty — orchestrator standing by.');
  };

  const completed = tasks.filter((task) => task.status === 'complete').length;
  const progress = tasks.length ? (completed / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center gap-2 font-semibold">
              <Workflow className="h-5 w-5 text-primary" />
              Orchestrator Pipeline Monitor
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={runSimulation} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Routing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Queue
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={reset}
                disabled={isRunning && completed !== tasks.length}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <span>{completed}/{tasks.length} tasks resolved</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="mt-2 h-2" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-background/80 p-3">
              <p className="text-xs uppercase text-muted-foreground">Active Task</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {activeTaskId ? activeTaskId : 'Idle'}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/80 p-3">
              <p className="text-xs uppercase text-muted-foreground">Longest Resolution</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {tasks.length ? `${Math.max(...tasks.map((task) => task.resolutionMs)) / 1000}s` : '—'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Incoming Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => {
              const workerKey = task.assignedWorker;
              const worker = workerKey ? WORKER_META[workerKey] : null;
              return (
                <div
                  key={task.id}
                  className={`rounded-xl border ${
                    activeTaskId === task.id
                      ? 'border-primary shadow-md shadow-primary/10'
                      : 'border-border'
                  } bg-background/80 p-4 transition-shadow`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{task.summary}</p>
                      <p className="text-xs text-muted-foreground">{task.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={`text-xs ${channelBadge[task.channel]}`}>
                        {task.channel}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${priorityBadge[task.priority]}`}>
                        {task.priority}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusLabels[task.status].style}`}
                      >
                        {statusLabels[task.status].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                      {(task.resolutionMs / 1000).toFixed(1)}s SLA window
                    </span>
                    {worker && (
                      <span className="inline-flex items-center gap-1">
                        <ArrowRight className={`h-3.5 w-3.5 ${worker.accent}`} />
                        {worker.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Worker Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(WORKER_META).map(([key, meta]) => {
              const workerKey = key as WorkerKey;
              const stats = workerStats[workerKey];
              const avgLatency = stats.processed
                ? `${(stats.totalLatency / stats.processed / 1000).toFixed(1)}s`
                : '—';
              return (
                <div
                  key={workerKey}
                  className="rounded-xl border border-border/80 bg-background/80 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${meta.badge}`}>
                        <meta.icon className={`h-5 w-5 ${meta.accent}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{meta.name}</p>
                        <p className="text-xs text-muted-foreground">{meta.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{stats.processed}</p>
                      <p className="text-xs text-muted-foreground">Tasks resolved · Avg {avgLatency}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Orchestrator Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground max-h-64 overflow-y-auto pr-1">
          {log.length === 0 ? (
            <p className="text-xs text-muted-foreground">Run the queue to view orchestration events.</p>
          ) : (
            log.map((entry, index) => (
              <div key={index} className="rounded-lg border border-border/60 bg-background/80 p-2">
                {entry}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrchestratorWorkerLiveRunner;
