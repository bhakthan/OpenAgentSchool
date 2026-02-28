/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI, User, LoginCredentials, SignupData } from '@/lib/api/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  /** Role names the current user holds for the active tenant. */
  roles: string[];
  /** Permission codenames the current user holds for the active tenant. */
  permissions: string[];
  /** The tenant ID from the user's JWT (if present). */
  currentTenantId: string | null;
  /** Check a single permission codename. */
  hasPermission: (codename: string) => boolean;
  /** Check a single role name. */
  hasRole: (roleName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Decode the JWT payload (without verification — display only). */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

/** Fetch the user's roles for the current tenant from the backend. */
async function fetchUserRoles(): Promise<{ roles: string[]; permissions: string[] }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (!token) return { roles: [], permissions: [] };

  try {
    const baseUrl = (await import('@/lib/api/config')).API_CONFIG.core;
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/v1/roles/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { roles: [], permissions: [] };

    const data: Array<{ name: string; permissions?: Array<{ codename: string }> }> = await res.json();
    const roles = data.map((r) => r.name);
    const permissions = Array.from(
      new Set(data.flatMap((r) => (r.permissions ?? []).map((p) => p.codename))),
    );
    return { roles, permissions };
  } catch {
    return { roles: [], permissions: [] };
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Derive tenant_id from the stored JWT (if present)
  const currentTenantId = (() => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    return (payload?.tenant_id as string) ?? null;
  })();

  // Fetch current user if authenticated
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: Infinity, // User data doesn't change often
  });

  // Fetch roles & permissions after user resolves
  useEffect(() => {
    if (!isAuthenticated) {
      setRoles([]);
      setPermissions([]);
      return;
    }
    fetchUserRoles().then(({ roles: r, permissions: p }) => {
      setRoles(r);
      setPermissions(p);
    });
  }, [isAuthenticated, user]);

  // Stable permission / role checkers
  const hasPermission = useCallback(
    (codename: string) => permissions.includes(codename),
    [permissions],
  );
  const hasRole = useCallback(
    (roleName: string) => roles.includes(roleName),
    [roles],
  );

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      queryClient.setQueryData(['user', 'me'], data.user);
      toast.success(`Welcome back, ${data.user.name || data.user.email}!`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: (signupData: SignupData) => authAPI.signup(signupData),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      queryClient.setQueryData(['user', 'me'], data.user);
      toast.success(`Welcome to Open Agent School, ${data.user.name || data.user.email}!`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Signup failed. Please try again.';
      toast.error(message);
      throw error;
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
    },
    onError: () => {
      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      queryClient.clear();
      toast.success('Logged out successfully');
    },
  });

  // Wrapped functions for cleaner API
  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const signup = async (data: SignupData) => {
    await signupMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Listen for auth changes in other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        const isAuth = authAPI.isAuthenticated();
        setIsAuthenticated(isAuth);
        
        if (!isAuth) {
          queryClient.clear();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [queryClient]);

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    signup,
    logout,
    roles,
    permissions,
    currentTenantId,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
