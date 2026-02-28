/**
 * User Menu Component
 * Shows user profile and logout option
 */

import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, SignOut, SignIn, ShieldCheck } from '@phosphor-icons/react';
import { trackEvent } from '@/lib/analytics/ga';

// Direct assignment so Vite can statically analyze and bundle the env vars
const CORE_API_URL = import.meta.env.VITE_CORE_API_URL as string | undefined

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Check if backend is configured
  const isBackendConfigured = !!CORE_API_URL;

  // Don't show login button if backend is not configured
  if (!isAuthenticated && !isBackendConfigured) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => { trackEvent({ action: 'nav_click', category: 'user_menu', label: 'login' }); navigate('/auth'); }}
        className="gap-2"
      >
        <SignIn className="w-4 h-4" weight="bold" />
        Login
      </Button>
    );
  }

  const handleLogout = async () => {
    trackEvent({ action: 'auth_action', category: 'user_menu', label: 'logout' });
    await logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" weight="bold" />
          <span className="hidden sm:inline">
            {user?.name || user?.email || 'Account'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { trackEvent({ action: 'nav_click', category: 'user_menu', label: 'bookmarks' }); navigate('/bookmarks'); }}>
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { trackEvent({ action: 'nav_click', category: 'user_menu', label: 'achievements' }); navigate('/achievements'); }}>
          Achievements
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { trackEvent({ action: 'nav_click', category: 'user_menu', label: 'agent_console' }); navigate('/agents'); }}>
          Agent Console
        </DropdownMenuItem>
        {user?.role === 'admin' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { trackEvent({ action: 'nav_click', category: 'user_menu', label: 'admin_dashboard' }); navigate('/admin'); }} className="text-violet-600 dark:text-violet-400">
              <ShieldCheck className="w-4 h-4 mr-2" weight="duotone" />
              Admin Dashboard
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <SignOut className="w-4 h-4 mr-2" weight="bold" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
