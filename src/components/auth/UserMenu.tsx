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
import { User, SignOut, SignIn } from '@phosphor-icons/react';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Check if backend is configured
  const backendUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_CORE_API_URL;
  const isBackendConfigured = !!backendUrl;

  // Don't show login button if backend is not configured
  if (!isAuthenticated && !isBackendConfigured) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/auth')}
        className="gap-2"
      >
        <SignIn className="w-4 h-4" weight="bold" />
        Login
      </Button>
    );
  }

  const handleLogout = async () => {
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
        <DropdownMenuItem onClick={() => navigate('/bookmarks')}>
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/agents')}>
          Agent Console
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <SignOut className="w-4 h-4 mr-2" weight="bold" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
