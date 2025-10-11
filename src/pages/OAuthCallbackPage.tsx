/**
 * OAuth Callback Handler
 * Handles OAuth redirects from Microsoft and Google
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { API_CONFIG } from '@/lib/api/config';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
        toast.error(`Authentication failed: ${errorParam}`);
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }

      if (!code) {
        setError('No authorization code received');
        toast.error('No authorization code received');
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }

      if (!provider || (provider !== 'microsoft' && provider !== 'google')) {
        setError('Invalid OAuth provider');
        toast.error('Invalid OAuth provider');
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }

      try {
        // Send code to backend for token exchange
        const response = await fetch(`${API_CONFIG.core}/api/v1/auth/${provider}/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, provider }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'OAuth authentication failed');
        }

        const data = await response.json();

        // Store token and user data
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        toast.success(`Welcome, ${data.user.name || data.user.email}!`);

        // Redirect to original destination or home
        const redirectTo = sessionStorage.getItem('oauth_redirect') || '/';
        sessionStorage.removeItem('oauth_redirect');
        
        // Reload to update auth context
        window.location.href = redirectTo;

      } catch (error: any) {
        setError(error.message || 'OAuth authentication failed');
        toast.error(error.message || 'OAuth authentication failed');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, provider, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <div className="text-red-500 text-lg font-semibold">{error}</div>
            <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
          </>
        ) : (
          <>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-lg font-semibold">Completing {provider} sign-in...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </>
        )}
      </div>
    </div>
  );
}
