/**
 * Barrel re-exports for the tenant module.
 */

export { TenantProvider, useTenant, type TenantContextType } from './TenantContext';
export { TenantBranding } from './TenantBranding';
export {
  setCurrentTenantSlug,
  getCurrentTenantSlug,
  getTenantKey,
  getTenantStorage,
  setTenantStorage,
  removeTenantStorage,
} from './storage';
