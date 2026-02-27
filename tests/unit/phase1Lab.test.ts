import { describe, expect, it } from 'vitest';
import { buildKnowledgeGraph, buildLearnerSnapshot, createWeeklyPlan, parseQuizProgressFromStorage, scorePattern } from '@/lib/phase1/phase1Lab';
import type { PatternData } from '@/lib/data/patterns';

const basePattern = (id: string, name: string, description: string, nodeCount: number): PatternData => ({
  id,
  name,
  description,
  nodes: Array.from({ length: nodeCount }, (_, i) => ({
    id: `${id}-${i}`,
    type: 'default',
    data: { label: `${name}-${i}` },
    position: { x: 0, y: 0 },
  })),
  edges: [],
  useCases: [],
  codeExample: '',
  implementation: [],
});

describe('phase1Lab helpers', () => {
  it('parses stored quiz progress', () => {
    const parsed = parseQuizProgressFromStorage('{"totalQuizzes":4,"averageScore":72,"bestScore":90,"totalTimeSpent":600,"categoriesCompleted":["patterns"]}');
    expect(parsed.totalQuizzes).toBe(4);
    expect(parsed.averageScore).toBe(72);
    expect(parsed.categoriesCompleted).toEqual(['patterns']);
  });

  it('creates weekly plan from snapshot with profile', () => {
    const snapshot = buildLearnerSnapshot();
    const plan = createWeeklyPlan(snapshot, { role: 'developer', level: 'intermediate', lenses: [] });
    expect(plan.length).toBeGreaterThanOrEqual(4);
    expect(plan[0].toLowerCase()).toContain('developer');
  });

  it('creates weekly plan from snapshot without profile', () => {
    const snapshot = buildLearnerSnapshot();
    const plan = createWeeklyPlan(snapshot);
    expect(plan.length).toBeGreaterThanOrEqual(4);
  });

  it('builds concept-pattern edges with keyword overlap', () => {
    const concepts = [{ id: 'c1', title: 'Prompting', tags: ['prompt'] }];
    const patterns = [basePattern('prompt-chaining', 'Prompt Chaining', 'prompt optimization workflow', 4)];
    const graph = buildKnowledgeGraph(concepts, patterns);
    expect(graph.edges.length).toBeGreaterThan(0);
    expect(graph.edges[0].to).toBe('prompt-chaining');
  });

  it('builds prerequisite edges between concepts', () => {
    const concepts = [
      { id: 'c1', title: 'Basics', tags: ['basics'] },
      { id: 'c2', title: 'Advanced', tags: ['advanced'], prerequisites: ['c1'] },
    ];
    const patterns = [basePattern('p1', 'Some Pattern', 'basics helper', 2)];
    const graph = buildKnowledgeGraph(concepts, patterns);
    const prereqEdges = graph.edges.filter(e => e.reason === 'prerequisite');
    expect(prereqEdges.length).toBe(1);
    expect(prereqEdges[0].from).toBe('c1');
    expect(prereqEdges[0].to).toBe('c2');
  });

  it('knowledge graph includes nodes for concepts and patterns', () => {
    const concepts = [{ id: 'c1', title: 'Prompting', tags: ['prompt'] }];
    const patterns = [basePattern('prompt-chaining', 'Prompt Chaining', 'prompt optimization workflow', 4)];
    const graph = buildKnowledgeGraph(concepts, patterns);
    expect(graph.nodes.find(n => n.id === 'c1' && n.type === 'concept')).toBeTruthy();
    expect(graph.nodes.find(n => n.id === 'prompt-chaining' && n.type === 'pattern')).toBeTruthy();
  });

  it('scores simpler patterns higher for speed profile', () => {
    const complex = basePattern('complex', 'Complex Pattern', 'heavy orchestration', 12);
    const simple = basePattern('simple', 'Simple Pattern', 'quick and lightweight', 3);
    const speedWeights = { quality: 0.2, speed: 0.5, simplicity: 0.3 };
    const complexScore = scorePattern(complex, speedWeights);
    const simpleScore = scorePattern(simple, speedWeights);
    expect(simpleScore.overall).toBeGreaterThan(complexScore.overall);
  });

  it('scorePattern returns pattern name', () => {
    const p = basePattern('test', 'Test Pattern', 'testing', 3);
    const score = scorePattern(p, { quality: 0.4, speed: 0.3, simplicity: 0.3 });
    expect(score.patternName).toBe('Test Pattern');
  });
});

