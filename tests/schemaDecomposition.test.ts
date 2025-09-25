import { describe, it, expect } from 'vitest';
import { decomposeTask, DecompositionLLM } from '../src/lib/algorithms/schemaDecomposition';

const mockLLM: DecompositionLLM = {
  async generateSubtasks(task: string) {
    return [
      { goal: 'Extract churn features', outputs: ['features'], entities: ['customers', 'transactions'] },
      { goal: 'Train model', inputs: ['features'], outputs: ['model'], entities: ['customers', 'models'] },
      { goal: 'Evaluate model', inputs: ['model'], outputs: ['metrics'], entities: ['customers', 'metrics_table_fake'] } // contains one fake entity
    ];
  }
};

describe('Schema-Aware Decomposition', () => {
  it('computes coverage correctly filtering invalid entities', async () => {
    const schema = new Set(['customers', 'transactions', 'models']);
    const result = await decomposeTask('Churn modeling', {}, mockLLM, schema);
    expect(result.nodes.length).toBe(3);
    // Last subtask references an invalid entity so its valid flag should be false
  const validity = result.nodes.map((n: any) => n.valid);
    expect(validity).toEqual([true, true, false]);
    expect(result.quality.coverage).toBeCloseTo(2/3, 5);
  });
});
