/**
 * Permission & Role Utilities
 *
 * Hooks and gate components that consume the auth context to check
 * the current user's RBAC roles and permissions (populated from the
 * Phase-3 backend APIs).
 */

import { type ReactNode } from 'react';
import { useAuth } from './AuthContext';

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

/**
 * Returns `true` if the authenticated user holds the given permission
 * codename (e.g. `"content.create"`).
 */
export function usePermission(codename: string): boolean {
  const { permissions } = useAuth();
  return permissions.includes(codename);
}

/**
 * Returns `true` if the authenticated user holds the given role name
 * (e.g. `"org_admin"`).
 */
export function useHasRole(roleName: string): boolean {
  const { roles } = useAuth();
  return roles.includes(roleName);
}

/* ------------------------------------------------------------------ */
/*  Gate Components                                                    */
/* ------------------------------------------------------------------ */

interface PermissionGateProps {
  /** Permission codename required (e.g. `"content.create"`). */
  permission: string;
  /** Rendered when the user lacks the permission. Defaults to `null`. */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Renders children only when the current user has the specified permission.
 *
 * ```tsx
 * <PermissionGate permission="content.create" fallback={<UpgradeBanner />}>
 *   <CreatePostButton />
 * </PermissionGate>
 * ```
 */
export function PermissionGate({
  permission,
  fallback = null,
  children,
}: PermissionGateProps) {
  const allowed = usePermission(permission);
  return <>{allowed ? children : fallback}</>;
}

interface RoleGateProps {
  /** Role name required (e.g. `"org_admin"`). */
  role: string;
  /** Rendered when the user lacks the role. Defaults to `null`. */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Renders children only when the current user holds the specified role.
 *
 * ```tsx
 * <RoleGate role="org_admin">
 *   <AdminDashboard />
 * </RoleGate>
 * ```
 */
export function RoleGate({ role, fallback = null, children }: RoleGateProps) {
  const allowed = useHasRole(role);
  return <>{allowed ? children : fallback}</>;
}
