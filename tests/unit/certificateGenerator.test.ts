import { describe, expect, it } from 'vitest';
import { generateCertificateId } from '@/lib/certificateGenerator';

describe('certificateGenerator', () => {
  it('generates a certificate ID with correct format', () => {
    const id = generateCertificateId();
    // Format: XXXX-XXXX-XXXX
    expect(id).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateCertificateId()));
    expect(ids.size).toBe(50);
  });

  it('only uses allowed characters (no ambiguous O/0/I/1/L)', () => {
    const allowed = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    for (let i = 0; i < 20; i++) {
      const id = generateCertificateId();
      for (const ch of id.replace(/-/g, '')) {
        expect(allowed).toContain(ch);
      }
    }
  });
});
