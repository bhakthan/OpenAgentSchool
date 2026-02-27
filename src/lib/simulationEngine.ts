// Multi-agent simulation engine (client-side, no LLM)

export type AgentRole = 'orchestrator' | 'worker' | 'reviewer' | 'critic';

export interface AgentConfig {
  id: string;
  name: string;
  role: AgentRole;
  systemPrompt: string;
}

export interface SimulationMessage {
  id: string;
  agentId: string;
  agentName: string;
  role: AgentRole;
  content: string;
  timestamp: number;
  tokenEstimate: number;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const ORCHESTRATOR_TEMPLATES = [
  (task: string) =>
    `I'll coordinate this task: "${task}". Let me assign work to the team and establish our approach.`,
  (task: string) =>
    `Team, we have a new objective: "${task}". I'll break this down into sub-tasks and delegate accordingly.`,
];

const WORKER_TEMPLATES = [
  (task: string, name: string) =>
    `Got it. I'm ${name} and I'll start working on my portion of "${task}". Analyzing the requirements now.`,
  (task: string, name: string) =>
    `${name} reporting in. I've reviewed the task "${task}" and here's my initial analysis and proposed approach.`,
  (_task: string, name: string) =>
    `${name} here with my deliverable. I've completed the analysis and prepared the results for review.`,
];

const REVIEWER_TEMPLATES = [
  (_task: string, name: string) =>
    `${name} reviewing the submissions. I'll check for completeness, accuracy, and alignment with the original objectives.`,
  (_task: string, name: string) =>
    `After careful review, ${name} has identified a few areas for improvement. The core approach is sound but could benefit from additional detail.`,
];

const CRITIC_TEMPLATES = [
  (_task: string, name: string) =>
    `${name} here with a critical assessment. I want to highlight potential risks and assumptions that haven't been addressed.`,
  (_task: string, name: string) =>
    `From a critical perspective, ${name} notes that while the work is competent, we should consider edge cases and failure modes.`,
];

const WRAP_UP_TEMPLATES = [
  (task: string) =>
    `Excellent work, team. Based on the reviews and critiques, here's our final consolidated output for "${task}". All feedback has been incorporated.`,
  (task: string) =>
    `Wrapping up: the team has delivered a solid result for "${task}". I'm marking this task as complete with the integrated revisions.`,
];

function pickTemplate<T>(templates: T[]): T {
  return templates[Math.floor(Math.random() * templates.length)];
}

export function runSimulation(
  agents: AgentConfig[],
  task: string
): SimulationMessage[] {
  if (agents.length === 0) return [];

  const messages: SimulationMessage[] = [];
  let ts = Date.now();
  const step = 2000;

  const orchestrators = agents.filter((a) => a.role === 'orchestrator');
  const workers = agents.filter((a) => a.role === 'worker');
  const reviewers = agents.filter((a) => a.role === 'reviewer');
  const critics = agents.filter((a) => a.role === 'critic');

  // Orchestrator speaks first
  const lead = orchestrators[0] ?? agents[0];
  const openContent = pickTemplate(ORCHESTRATOR_TEMPLATES)(task);
  messages.push({
    id: generateId(),
    agentId: lead.id,
    agentName: lead.name,
    role: lead.role,
    content: openContent,
    timestamp: ts,
    tokenEstimate: estimateTokens(openContent),
  });
  ts += step;

  // Workers do the task
  for (const w of workers) {
    for (let i = 0; i < 2; i++) {
      const tpl = WORKER_TEMPLATES[Math.min(i, WORKER_TEMPLATES.length - 1)];
      const content = tpl(task, w.name);
      messages.push({
        id: generateId(),
        agentId: w.id,
        agentName: w.name,
        role: w.role,
        content,
        timestamp: ts,
        tokenEstimate: estimateTokens(content),
      });
      ts += step;
    }
  }

  // Reviewers critique
  for (const r of reviewers) {
    for (const tpl of REVIEWER_TEMPLATES) {
      const content = tpl(task, r.name);
      messages.push({
        id: generateId(),
        agentId: r.id,
        agentName: r.name,
        role: r.role,
        content,
        timestamp: ts,
        tokenEstimate: estimateTokens(content),
      });
      ts += step;
    }
  }

  // Critics assess
  for (const c of critics) {
    const content = pickTemplate(CRITIC_TEMPLATES)(task, c.name);
    messages.push({
      id: generateId(),
      agentId: c.id,
      agentName: c.name,
      role: c.role,
      content,
      timestamp: ts,
      tokenEstimate: estimateTokens(content),
    });
    ts += step;
  }

  // Orchestrator wraps up (always speaks last)
  const wrapContent = pickTemplate(WRAP_UP_TEMPLATES)(task);
  messages.push({
    id: generateId(),
    agentId: lead.id,
    agentName: lead.name,
    role: lead.role,
    content: wrapContent,
    timestamp: ts,
    tokenEstimate: estimateTokens(wrapContent),
  });

  return messages;
}
