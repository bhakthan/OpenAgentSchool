/**
 * OAuth Login Buttons
 * Provides Microsoft, Google, and GitHub OAuth login options
 */

import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics/ga';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '@/lib/api/config';
import { authAPI } from '@/lib/api/auth';
import { toast } from 'sonner';

interface OAuthButtonsProps {
  onSuccess?: () => void;
}

export function OAuthButtons({ onSuccess }: OAuthButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider: 'microsoft' | 'google' | 'github') => {
    trackEvent({ action: 'oauth_click', category: 'auth', label: provider });
    setLoading(provider);
    
    try {
      // Get OAuth authorization URL from backend
      const response = await fetch(`${API_CONFIG.core}/api/v1/auth/${provider}/login`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `${provider} OAuth not configured`);
      }
      
      const { auth_url } = await response.json();
      
      // Store the intended destination before redirect
      sessionStorage.setItem('oauth_redirect', window.location.pathname);
      
      // Redirect to OAuth provider
      window.location.href = auth_url;
      
    } catch (error: any) {
      toast.error(error.message || `Failed to initiate ${provider} login`);
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={() => handleOAuthLogin('microsoft')}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === 'microsoft' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 23 23">
              <path fill="#f35325" d="M0 0h11v11H0z"/>
              <path fill="#81bc06" d="M12 0h11v11H12z"/>
              <path fill="#05a6f0" d="M0 12h11v11H0z"/>
              <path fill="#ffba08" d="M12 12h11v11H12z"/>
            </svg>
          )}
          Microsoft
        </Button>

        <Button
          variant="outline"
          onClick={() => handleOAuthLogin('google')}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === 'google' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Google
        </Button>

        <Button
          variant="outline"
          onClick={() => handleOAuthLogin('github')}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === 'github' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          )}
          GitHub
        </Button>
      </div>
    </div>
  );
}
