/**
 * Multi-tenant localStorage Namespacing
 *
 * Ensures each tenant's data is stored under a unique prefix so that
 * switching between tenants (or subdomains) never leaks state.
 *
 * The current tenant slug is set once by TenantProvider via
 * `setCurrentTenantSlug()` and used by all helper functions.
 */

const PLATFORM_DOMAIN = 'openagentschool.org';

/**
 * Synchronously resolve the tenant slug from the current hostname.
 * This is a pure function so it can run before React mounts.
 */
function resolveSlugFromHostname(): string {
  if (typeof window === 'undefined') return 'platform';
  const hostname = window.location.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1') return 'platform';
  if (hostname.endsWith(`.${PLATFORM_DOMAIN}`)) {
    const sub = hostname.slice(0, -(PLATFORM_DOMAIN.length + 1));
    if (sub === 'www' || sub === '') return 'platform';
    return sub;
  }
  if (hostname === PLATFORM_DOMAIN) return 'platform';
  return hostname;
}

/** Module-level slug — eagerly initialised from hostname, updated by TenantProvider. */
let _currentTenantSlug: string = resolveSlugFromHostname();

/** Called once by TenantProvider after slug resolution. */
export function setCurrentTenantSlug(slug: string) {
  _currentTenantSlug = slug;
}

/** Returns the active tenant slug. */
export function getCurrentTenantSlug(): string {
  return _currentTenantSlug;
}

/** Build a namespaced localStorage key: `{slug}:{key}` */
export function getTenantKey(key: string): string {
  return `${_currentTenantSlug}:${key}`;
}

/** Read a value from tenant-namespaced localStorage. */
export function getTenantStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(getTenantKey(key));
}

/** Write a value to tenant-namespaced localStorage. */
export function setTenantStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getTenantKey(key), value);
}

/** Remove a value from tenant-namespaced localStorage. */
export function removeTenantStorage(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getTenantKey(key));
}
