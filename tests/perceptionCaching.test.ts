import { describe, it, expect } from 'vitest';
import { buildPerceptionInfoBox, diffInfoBoxes } from '../src/lib/perception/buildInfoBox';

// Lightweight mock clients
function makeCatalog(schemaMap: Record<string, any[]>) {
  return {
    async getSchema(table: string) { return { table, columns: schemaMap[table] }; }
  };
}
function makeProfiler(profileMap: Record<string, any>) {
  return {
    async profile(table: string) { return profileMap[table]; }
  };
}
function makeLineage() { return { async getLineage() { return []; } }; }
function makeGovernance() { return { async getTags(tables: string[]) { return tables.map(t => ({ name: t + '-sensitivity', value: 'low' })); } }; }

describe('Perception InfoBox caching & diff', () => {
  const catalog = makeCatalog({
    users: [{ name: 'id', type: 'int' }, { name: 'email', type: 'string' }],
    orders: [{ name: 'order_id', type: 'int' }, { name: 'amount', type: 'float' }],
    inventory: [{ name: 'sku', type: 'string' }, { name: 'stock', type: 'int' }]
  });
  const profiler = makeProfiler({
    users: { columns: [{ name: 'id', type: 'int' }, { name: 'email', type: 'string' }], rowsSampled: 1000 },
    orders: { columns: [{ name: 'order_id', type: 'int' }, { name: 'amount', type: 'float' }], rowsSampled: 2000 },
    inventory: { columns: [{ name: 'sku', type: 'string' }, { name: 'stock', type: 'int' }], rowsSampled: 500 }
  });
  const lineage = makeLineage();
  const governance = makeGovernance();

  it('produces deterministic hash for identical inputs', async () => {
    const a = await buildPerceptionInfoBox({ tables: ['users','orders'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance });
    const b = await buildPerceptionInfoBox({ tables: ['users','orders'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance });
    expect(a.hash).toEqual(b.hash);
  });

  it('hash changes when schema changes', async () => {
    const base = await buildPerceptionInfoBox({ tables: ['users','orders'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance });
    // Add inventory table
    const expanded = await buildPerceptionInfoBox({ tables: ['users','orders','inventory'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance });
    expect(expanded.hash).not.toEqual(base.hash);
    const diff = diffInfoBoxes(base, expanded);
    expect(diff.addedTables).toContain('inventory');
    expect(diff.hashChanged).toBe(true);
  });

  it('compacts profiles to reduce size while retaining minimum', async () => {
    const unbounded = await buildPerceptionInfoBox({ tables: ['users','orders','inventory'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance });
    const compacted = await buildPerceptionInfoBox({ tables: ['users','orders','inventory'], catalogClient: catalog, profiler, lineageClient: lineage, governanceClient: governance, maxBytes: unbounded.bytes - 50, minRetainProfiles: 2 });
    expect(compacted.profiles.length).toBeGreaterThanOrEqual(2);
    expect(compacted.bytes).toBeLessThan(unbounded.bytes);
  });
});
