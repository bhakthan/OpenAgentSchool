/**
 * Unit tests for the multi-agent simulation engine.
 */
import { describe, it, expect } from 'vitest';
import { runSimulation, type AgentConfig } from '@/lib/simulationEngine';

const makeAgent = (
  role: AgentConfig['role'],
  name: string
): AgentConfig => ({
  id: `test-${role}-${name}`,
  name,
  role,
  systemPrompt: `Test ${role}`,
});

describe('runSimulation', () => {
  it('returns empty array for empty agents', () => {
    const messages = runSimulation([], 'do something');
    expect(messages).toEqual([]);
  });

  it('generates messages for a basic team', () => {
    const agents = [
      makeAgent('orchestrator', 'Lead'),
      makeAgent('worker', 'Dev'),
      makeAgent('reviewer', 'QA'),
    ];
    const messages = runSimulation(agents, 'Build a feature');
    expect(messages.length).toBeGreaterThan(0);
  });

  it('orchestrator always speaks first', () => {
    const agents = [
      makeAgent('worker', 'Dev'),
      makeAgent('orchestrator', 'Lead'),
      makeAgent('reviewer', 'QA'),
    ];
    const messages = runSimulation(agents, 'Test task');
    expect(messages[0].role).toBe('orchestrator');
    expect(messages[0].agentName).toBe('Lead');
  });

  it('orchestrator always speaks last', () => {
    const agents = [
      makeAgent('orchestrator', 'Lead'),
      makeAgent('worker', 'Dev'),
      makeAgent('critic', 'Critic'),
    ];
    const messages = runSimulation(agents, 'Test task');
    const last = messages[messages.length - 1];
    expect(last.role).toBe('orchestrator');
    expect(last.agentName).toBe('Lead');
  });

  it('includes all agent roles in output', () => {
    const agents = [
      makeAgent('orchestrator', 'Lead'),
      makeAgent('worker', 'Dev'),
      makeAgent('reviewer', 'QA'),
      makeAgent('critic', 'Critic'),
    ];
    const messages = runSimulation(agents, 'Full team task');
    const roles = new Set(messages.map((m) => m.role));
    expect(roles.has('orchestrator')).toBe(true);
    expect(roles.has('worker')).toBe(true);
    expect(roles.has('reviewer')).toBe(true);
    expect(roles.has('critic')).toBe(true);
  });

  it('messages have increasing timestamps', () => {
    const agents = [
      makeAgent('orchestrator', 'Lead'),
      makeAgent('worker', 'Dev'),
    ];
    const messages = runSimulation(agents, 'Time test');
    for (let i = 1; i < messages.length; i++) {
      expect(messages[i].timestamp).toBeGreaterThanOrEqual(messages[i - 1].timestamp);
    }
  });

  it('messages include token estimates', () => {
    const agents = [makeAgent('orchestrator', 'Lead')];
    const messages = runSimulation(agents, 'Token test');
    for (const msg of messages) {
      expect(msg.tokenEstimate).toBeGreaterThan(0);
    }
  });

  it('each message has a unique id', () => {
    const agents = [
      makeAgent('orchestrator', 'Lead'),
      makeAgent('worker', 'Dev1'),
      makeAgent('worker', 'Dev2'),
    ];
    const messages = runSimulation(agents, 'ID test');
    const ids = messages.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('falls back to first agent when no orchestrator present', () => {
    const agents = [
      makeAgent('worker', 'Dev'),
      makeAgent('reviewer', 'QA'),
    ];
    const messages = runSimulation(agents, 'No orchestrator');
    expect(messages[0].agentName).toBe('Dev');
    expect(messages[messages.length - 1].agentName).toBe('Dev');
  });

  it('includes task text in orchestrator messages', () => {
    const agents = [makeAgent('orchestrator', 'Lead')];
    const task = 'Analyze documentation quality';
    const messages = runSimulation(agents, task);
    const orchMessages = messages.filter((m) => m.role === 'orchestrator');
    expect(orchMessages.some((m) => m.content.includes(task))).toBe(true);
  });
});
