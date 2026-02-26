/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
  const queryClient = useQueryClient();

  // Fetch current user if authenticated
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: Infinity, // User data doesn't change often
  });

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
