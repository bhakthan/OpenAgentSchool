/**
 * TenantPickerPage — stub UI for users who belong to multiple tenants.
 *
 * In a future iteration the backend will return the list of tenants
 * the signed-in user belongs to. For now this page renders a static
 * placeholder and handles the redirect-on-click contract.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/AuthContext';

/* ------------------------------------------------------------------ */
/*  Stub tenant list (will come from the backend later)                */
/* ------------------------------------------------------------------ */

interface TenantEntry {
  slug: string;
  name: string;
  logoUrl: string | null;
}

const STUB_TENANTS: TenantEntry[] = [
  {
    slug: 'platform',
    name: 'Open Agent School',
    logoUrl: '/images/logo.svg',
  },
  {
    slug: 'acme-corp',
    name: 'Acme Corp (demo)',
    logoUrl: null,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TenantPickerPage() {
  const { isAuthenticated, user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (slug: string) => {
    setSelected(slug);

    // In production, redirect to the tenant's subdomain.
    // On localhost, just stay on the same origin.
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocal) {
      // nothing to redirect — stay here
      window.location.href = '/';
    } else {
      window.location.href = `https://${slug}.openagentschool.org`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Choose your workspace
          </h1>
          {isAuthenticated && user && (
            <p className="text-sm text-muted-foreground">
              Signed in as{' '}
              <span className="font-medium text-foreground">
                {user.name || user.email}
              </span>
            </p>
          )}
        </div>

        {/* Tenant cards */}
        <ul className="space-y-3">
          {STUB_TENANTS.map((t) => (
            <li key={t.slug}>
              <button
                onClick={() => handleSelect(t.slug)}
                disabled={selected === t.slug}
                className={`
                  w-full flex items-center gap-4 rounded-lg border border-border p-4
                  transition-all duration-150
                  hover:bg-accent hover:shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  ${selected === t.slug ? 'opacity-60 cursor-wait' : 'cursor-pointer'}
                `}
              >
                {/* Logo / initial */}
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                  {t.logoUrl ? (
                    <img
                      src={t.logoUrl}
                      alt={`${t.name} logo`}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-muted-foreground">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name + slug */}
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.slug}.openagentschool.org
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <p className="text-center text-xs text-muted-foreground">
          More workspaces will appear here once the backend supports
          multi-tenant user associations.
        </p>

        {!isAuthenticated && (
          <div className="text-center">
            <Button variant="outline" size="sm" asChild>
              <a href="/auth">Sign in to see your workspaces</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
