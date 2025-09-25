export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const challengeLadderGeneratorExecutionSteps: ExecutionStep[] = [
  { id: 'types', title: 'Define Task Type', description: 'Declare Task structure for ladder entries.', startLine: 1, endLine: 1 },
  { id: 'scaffold', title: 'Seed Ladder', description: 'Return beginner and intermediate tasks with prerequisites.', startLine: 2, endLine: 6 },
  { id: 'extend', title: 'Extend Levels', description: 'Placeholder for higher tiers—extend array for mastery tasks.', startLine: 2, endLine: 6 }
];
