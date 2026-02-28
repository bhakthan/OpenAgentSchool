const TRANSPORT_HASH_PREFIX = 'sha256:';

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPasswordForTransport(password: string, _identifier?: string): Promise<string> {
  if (!password) {
    return '';
  }

  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure password transport is not available in this browser. Please use OAuth sign-in.');
  }

  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return `${TRANSPORT_HASH_PREFIX}${toHex(digest)}`;
}
