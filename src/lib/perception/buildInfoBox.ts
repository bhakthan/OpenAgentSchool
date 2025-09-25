import crypto from 'crypto';

export interface TableProfile { table: string; columns: Array<{ name: string; type: string; nullPct?: number; distinctPct?: number }>; rowsSampled: number; }
export interface GovernanceTag { name: string; value: string; }
export interface InfoBox {
  schema: any;
  profiles: TableProfile[];
  constraints: any[];
  lineage: any[];
  governance: GovernanceTag[];
  generatedAt: string;
  version: string;
  hash: string;
  bytes: number;
}

export interface BuildPerceptionInputs {
  tables: string[];
  catalogClient: any;
  profiler: any;
  lineageClient: any;
  governanceClient: any;
  maxBytes?: number; // soft budget
  minRetainProfiles?: number; // ensure at least this many profiles remain after compaction
}

/**
 * buildPerceptionInfoBox
 * Deterministically builds a compact InfoBox with stable field ordering for hash reproducibility.
 * Applies size-aware compaction while preserving a minimum number of table profiles.
 */
export async function buildPerceptionInfoBox(inputs: BuildPerceptionInputs): Promise<InfoBox> {
  const profiles: TableProfile[] = [];
  for (const table of inputs.tables) {
    const meta = await inputs.catalogClient.getSchema(table);
    const prof = await inputs.profiler.profile(table, { sample: 5000 });
    // Normalize column ordering
    const cols = [...prof.columns].sort((a: any, b: any) => a.name.localeCompare(b.name));
    profiles.push({ table, columns: cols, rowsSampled: prof.rowsSampled });
  }
  // Deterministic ordering of profiles by table name
  profiles.sort((a, b) => a.table.localeCompare(b.table));
  const lineage = await inputs.lineageClient.getLineage(inputs.tables);
  const governance = await inputs.governanceClient.getTags(inputs.tables);
  governance.sort((a: any, b: any) => a.name.localeCompare(b.name));

  const timestamp = new Date().toISOString();
  const base: Omit<InfoBox, 'hash' | 'bytes'> = {
    schema: profiles.map(p => ({ table: p.table, columns: p.columns.map(c => ({ name: c.name, type: c.type })) })),
    profiles,
    constraints: [],
    lineage,
    governance,
    generatedAt: timestamp,
    version: 'v1'
  } as any;

  // Compaction loop (semantic: drop least recently added profile) - here last entries
  const minRetain = inputs.minRetainProfiles ?? 1;
  let raw = Buffer.from(JSON.stringify(base));
  if (inputs.maxBytes) {
    while (raw.byteLength > inputs.maxBytes && base.profiles.length > minRetain) {
      base.profiles.pop();
      base.schema.pop();
      raw = Buffer.from(JSON.stringify(base));
    }
    // If still too large, strip optional stats if present
    if (raw.byteLength > inputs.maxBytes) {
      for (const prof of base.profiles) {
        for (const col of prof.columns) {
          delete (col as any).nullPct;
          delete (col as any).distinctPct;
        }
      }
      raw = Buffer.from(JSON.stringify(base));
    }
    if (raw.byteLength > inputs.maxBytes) {
      base.governance = base.governance.map(g => ({ name: g.name, value: '' }));
      raw = Buffer.from(JSON.stringify(base));
    }
    if (raw.byteLength > inputs.maxBytes) {
      base.lineage = [];
      raw = Buffer.from(JSON.stringify(base));
    }
    if (raw.byteLength > inputs.maxBytes) {
      base.constraints = [];
      raw = Buffer.from(JSON.stringify(base));
    }
    if (raw.byteLength > inputs.maxBytes) {
      while (raw.byteLength > inputs.maxBytes && base.profiles.length > minRetain) {
        base.profiles.pop();
        base.schema.pop();
        raw = Buffer.from(JSON.stringify(base));
      }
    }
    if (raw.byteLength > inputs.maxBytes && base.profiles.length === minRetain) {
      // Last resort: keep only table names (drop columns detail) in schema for remaining profiles
      base.schema = base.schema.map((s: any) => ({ table: s.table, columns: [] }));
      raw = Buffer.from(JSON.stringify(base));
    }
  }

  const stableForHash = { ...base, generatedAt: 'STABLE_TS' };
  const hash = contentHash(stableForHash);
  return { ...(base as any), hash, bytes: raw.byteLength };
}

// Stable JSON hashing (stringify then sha256 -> first 16 hex chars)
export function contentHash(obj: any): string {
  const json = JSON.stringify(obj);
  return crypto.createHash('sha256').update(json).digest('hex').slice(0, 16);
}

/**
 * diffInfoBoxes
 * Returns structural + profile deltas and whether a hash change is expected.
 */
export function diffInfoBoxes(a: InfoBox, b: InfoBox) {
  const removedTables = a.profiles.map(p => p.table).filter(t => !b.profiles.find(p => p.table === t));
  const addedTables = b.profiles.map(p => p.table).filter(t => !a.profiles.find(p => p.table === t));
  const changedColumns: Record<string, { before: number; after: number }> = {};
  for (const ap of a.profiles) {
    const bp = b.profiles.find(p => p.table === ap.table);
    if (bp && bp.columns.length !== ap.columns.length) {
      changedColumns[ap.table] = { before: ap.columns.length, after: bp.columns.length };
    }
  }
  return {
    removedTables,
    addedTables,
    changedColumns,
    hashChanged: a.hash !== b.hash
  };
}
