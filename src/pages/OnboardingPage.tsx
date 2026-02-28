import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPlans, createTenant, checkSlug, type Plan, type CreateTenantRequest } from '@/lib/api/billing';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63);
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(0)}`;
}

const STEPS = ['Organization', 'Select Plan', 'Confirmation'] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || 'free';

  const [step, setStep] = useState(0);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [orgName, setOrgName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load plans
  useEffect(() => {
    getPlans()
      .then((data) => setPlans(data.sort((a, b) => a.sort_order - b.sort_order)))
      .catch(() => {
        setPlans([
          { id: '1', name: 'free', display_name: 'Free', description: 'Get started for free.', price_monthly: 0, price_annual: 0, max_users: 5, max_storage_gb: 1, features: {}, sort_order: 0 },
          { id: '2', name: 'starter', display_name: 'Starter', description: 'For growing teams.', price_monthly: 2900, price_annual: 29000, max_users: 25, max_storage_gb: 10, features: {}, sort_order: 1 },
          { id: '3', name: 'professional', display_name: 'Professional', description: 'Full-featured.', price_monthly: 9900, price_annual: 99000, max_users: 100, max_storage_gb: 50, features: {}, sort_order: 2 },
          { id: '4', name: 'enterprise', display_name: 'Enterprise', description: 'Unlimited scale.', price_monthly: 29900, price_annual: 299000, max_users: -1, max_storage_gb: 500, features: {}, sort_order: 3 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-generate slug from org name
  useEffect(() => {
    if (!slugManual && orgName) {
      setSlug(slugify(orgName));
    }
  }, [orgName, slugManual]);

  // Debounced slug availability check
  const checkSlugAvailability = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value || value.length < 2) {
      setSlugAvailable(null);
      return;
    }
    setSlugChecking(true);
    debounceRef.current = setTimeout(() => {
      checkSlug(value)
        .then((res) => setSlugAvailable(res.available))
        .catch(() => setSlugAvailable(null))
        .finally(() => setSlugChecking(false));
    }, 500);
  }, []);

  useEffect(() => {
    checkSlugAvailability(slug);
  }, [slug, checkSlugAvailability]);

  // Validation
  const step1Valid = orgName.length >= 2 && slug.length >= 2 && email.includes('@') && password.length >= 8 && slugAvailable !== false;
  const step2Valid = !!selectedPlan;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const payload: CreateTenantRequest = {
        org_name: orgName,
        slug,
        admin_email: email,
        admin_password: password,
        plan_name: selectedPlan,
      };
      const result = await createTenant(payload);
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('tenant_id', result.tenant_id);
      // Move to confirmation step
      setStep(2);
    } catch (err: any) {
      const detail = err?.response?.data?.detail || 'Something went wrong. Please try again.';
      setError(detail);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create your workspace</h1>
        <p className="text-muted-foreground mt-2">
          Set up your team's learning environment in minutes.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                idx < step
                  ? 'bg-emerald-500 text-white'
                  : idx === step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {idx < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                idx + 1
              )}
            </div>
            <span className={`text-sm hidden sm:inline ${idx === step ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
              {label}
            </span>
            {idx < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${idx < step ? 'bg-emerald-500' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Step 1: Organization Details */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme Learning"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Workspace URL
              {slugChecking && <span className="ml-2 text-xs text-muted-foreground">Checking...</span>}
              {!slugChecking && slugAvailable === true && slug.length >= 2 && (
                <span className="ml-2 text-xs text-emerald-600">Available</span>
              )}
              {!slugChecking && slugAvailable === false && (
                <span className="ml-2 text-xs text-destructive">Already taken</span>
              )}
            </label>
            <div className="flex items-center gap-0">
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugManual(true);
                }}
                placeholder="acme-learning"
                className="flex-1 px-3 py-2.5 rounded-l-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="px-3 py-2.5 border border-l-0 border-input bg-muted text-muted-foreground text-sm rounded-r-lg">
                .openagentschool.org
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@acme.com"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={!step1Valid}
            className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <button onClick={() => navigate('/auth')} className="text-primary underline">
              Sign in
            </button>
          </p>
        </div>
      )}

      {/* Step 2: Select Plan */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{plan.display_name || plan.name}</h3>
                    {isSelected && (
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {formatPrice(plan.price_monthly)}
                    {plan.price_monthly > 0 && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.max_users === -1 ? 'Unlimited' : `${plan.max_users}`} users &middot; {plan.max_storage_gb} GB
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm border border-input hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!step2Valid || submitting}
              className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Creating...
                </span>
              ) : (
                'Create Workspace'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 2 && (
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Welcome to Open Agent School!</h2>
            <p className="text-muted-foreground mt-2">
              Your workspace <strong>{slug}.openagentschool.org</strong> is ready.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 text-sm text-left space-y-2 max-w-sm mx-auto">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Organization</span>
              <span className="font-medium">{orgName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium capitalize">{selectedPlan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Admin</span>
              <span className="font-medium">{email}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="py-2.5 px-8 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
