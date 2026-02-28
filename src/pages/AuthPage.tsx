/**
 * Authentication Page
 * Login and signup interface
 */

import { useState } from 'react';
import { trackEvent, setUserProperties } from '@/lib/analytics/ga';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain } from '@phosphor-icons/react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleSuccess = () => {
    trackEvent({ action: 'login', category: 'auth', label: activeTab, method: 'email' });
    setUserProperties({ auth_method: 'email', user_tier: 'registered' });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400" weight="bold" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Open Agent School
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Learn to build intelligent AI agents
          </p>
        </div>

        {/* Auth Forms */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              {activeTab === 'login' 
                ? 'Login to access your learning progress and agent features' 
                : 'Create an account to start your AI agent journey (OAuth providers are preferred)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val as 'login' | 'signup'); trackEvent({ action: 'tab_switch', category: 'auth', label: val }); }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm 
                  onSuccess={handleSuccess}
                  onSwitchToSignup={() => setActiveTab('signup')}
                />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm
                  onSuccess={handleSuccess}
                  onSwitchToLogin={() => setActiveTab('login')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Skip for now option */}
        <div className="mt-6 text-center">
          <button
            onClick={() => { trackEvent({ action: 'skip_auth', category: 'auth', label: 'continue_without_account' }); navigate('/'); }}
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Continue without account
          </button>
        </div>
      </div>
    </div>
  );
}
