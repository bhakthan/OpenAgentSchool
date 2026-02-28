/**
 * TenantProvider — resolves the current tenant from the hostname
 * and exposes tenant config to the whole React tree.
 *
 * Placement: above AuthProvider so that auth can read the tenant ID.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPublicTenantConfig, type TenantConfig } from '@/lib/api/tenants';
import { setCurrentTenantSlug } from './storage';
import { setCurrentTenantId } from '@/lib/api/core';

/* ------------------------------------------------------------------ */
/*  Context type                                                       */
/* ------------------------------------------------------------------ */

export interface TenantContextType {
  /** Full tenant config (null while loading or on error). */
  tenant: TenantConfig | null;
  /** The slug resolved from the hostname. */
  tenantSlug: string;
  /** Shortcut for `tenant?.id ?? null`. */
  tenantId: string | null;
  /** True while the initial fetch is in-flight. */
  isLoading: boolean;
  /** True if the fetch failed (e.g. unknown slug). */
  isError: boolean;
  /** Manually re-fetch the tenant config. */
  refetch: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Slug resolution                                                    */
/* ------------------------------------------------------------------ */

const PLATFORM_DOMAIN = 'openagentschool.org';

/**
 * Derive the tenant slug from `window.location.hostname`.
 *
 * - `{slug}.openagentschool.org`    → slug
 * - `openagentschool.org` (bare)    → 'platform'
 * - `www.openagentschool.org`       → 'platform'
 * - `localhost` / `127.0.0.1`       → 'platform'
 * - anything else                   → treat as custom domain; use hostname itself
 */
function resolveSlugFromHostname(): string {
  if (typeof window === 'undefined') return 'platform';

  const hostname = window.location.hostname.toLowerCase();

  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'platform';
  }

  // Matches *.openagentschool.org
  if (hostname.endsWith(`.${PLATFORM_DOMAIN}`)) {
    const sub = hostname.slice(0, -(PLATFORM_DOMAIN.length + 1));
    // www is not a real tenant slug
    if (sub === 'www' || sub === '') return 'platform';
    return sub;
  }

  // Bare domain
  if (hostname === PLATFORM_DOMAIN) {
    return 'platform';
  }

  // Custom domain — use the full hostname as slug so the API can resolve it
  return hostname;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

interface TenantProviderProps {
  children: ReactNode;
}

export function TenantProvider({ children }: TenantProviderProps) {
  const tenantSlug = useMemo(() => resolveSlugFromHostname(), []);

  // Immediately set the slug so storage helpers work before the fetch returns
  useEffect(() => {
    setCurrentTenantSlug(tenantSlug);
  }, [tenantSlug]);

  const {
    data: tenant,
    isLoading,
    isError,
    refetch,
  } = useQuery<TenantConfig>({
    queryKey: ['tenant', 'config', tenantSlug],
    queryFn: ({ signal }) => getPublicTenantConfig(tenantSlug, signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    // If the backend isn't available yet, treat the fetch like a soft failure
    // so the app still renders with no tenant overrides.
  });

  // Push the tenant ID into the core API module (used by the request interceptor)
  useEffect(() => {
    setCurrentTenantId(tenant?.id ?? null);
  }, [tenant?.id]);

  const value: TenantContextType = useMemo(
    () => ({
      tenant: tenant ?? null,
      tenantSlug,
      tenantId: tenant?.id ?? null,
      isLoading,
      isError,
      refetch,
    }),
    [tenant, tenantSlug, isLoading, isError, refetch],
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useTenant(): TenantContextType {
  const ctx = useContext(TenantContext);
  if (ctx === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return ctx;
}
