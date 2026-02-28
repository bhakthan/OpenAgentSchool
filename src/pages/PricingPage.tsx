import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans, type Plan } from '@/lib/api/billing';

const CHECK_ICON = (
  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(0)}`;
}

/** Feature display labels */
const FEATURE_LABELS: Record<string, string> = {
  study_mode: 'Study Mode',
  community: 'Community Access',
  quiz: 'Quiz & Assessments',
  knowledge_search: 'Knowledge Search',
  api_access: 'API Access',
  custom_branding: 'Custom Branding',
  analytics: 'Advanced Analytics',
  sso: 'SSO / SAML',
  dedicated_support: 'Dedicated Support',
};

export default function PricingPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [annual, setAnnual] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlans()
      .then((data) => {
        setPlans(data.sort((a, b) => a.sort_order - b.sort_order));
      })
      .catch(() => {
        // Fallback plans for when backend is unavailable
        setPlans([
          { id: '1', name: 'free', display_name: 'Free', description: 'Get started with the basics — perfect for individuals and small teams.', price_monthly: 0, price_annual: 0, max_users: 5, max_storage_gb: 1, features: { study_mode: true, community: true, quiz: true, knowledge_search: false, api_access: false }, sort_order: 0 },
          { id: '2', name: 'starter', display_name: 'Starter', description: 'For growing teams that need more power and flexibility.', price_monthly: 2900, price_annual: 29000, max_users: 25, max_storage_gb: 10, features: { study_mode: true, community: true, quiz: true, knowledge_search: true, api_access: false, custom_branding: false }, sort_order: 1 },
          { id: '3', name: 'professional', display_name: 'Professional', description: 'Full-featured plan for professional teams and departments.', price_monthly: 9900, price_annual: 99000, max_users: 100, max_storage_gb: 50, features: { study_mode: true, community: true, quiz: true, knowledge_search: true, api_access: true, custom_branding: true, analytics: true }, sort_order: 2 },
          { id: '4', name: 'enterprise', display_name: 'Enterprise', description: 'Unlimited scale with dedicated support and custom integrations.', price_monthly: 29900, price_annual: 299000, max_users: -1, max_storage_gb: 500, features: { study_mode: true, community: true, quiz: true, knowledge_search: true, api_access: true, custom_branding: true, analytics: true, sso: true, dedicated_support: true }, sort_order: 3 },
        ]);
        setError(null); // Silently use fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCTA = (plan: Plan) => {
    if (plan.name === 'free') {
      navigate('/onboarding');
    } else if (plan.name === 'enterprise') {
      window.location.href = 'mailto:sales@openagentschool.org?subject=Enterprise Plan Inquiry';
    } else {
      navigate(`/onboarding?plan=${plan.name}`);
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start free and scale as your team grows. Every plan includes core learning features.
        </p>

        {/* Monthly / Annual toggle */}
        <div className="mt-8 inline-flex items-center gap-3 bg-muted rounded-full p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !annual ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              annual ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
            <span className="ml-1.5 text-xs text-emerald-600 font-semibold">Save ~17%</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-center text-sm text-amber-600 mb-6">{error}</p>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isPopular = plan.name === 'professional';
          const price = annual ? plan.price_annual : plan.price_monthly;
          const period = annual ? '/yr' : '/mo';
          const isEnterprise = plan.name === 'enterprise';

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                isPopular
                  ? 'border-primary ring-2 ring-primary/20 shadow-md'
                  : 'border-border'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.display_name || plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(price)}
                </span>
                {price > 0 && (
                  <span className="text-muted-foreground ml-1">{period}</span>
                )}
              </div>

              <button
                onClick={() => handleCTA(plan)}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors mb-6 ${
                  isPopular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : plan.name === 'free'
                      ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                }`}
              >
                {plan.name === 'free'
                  ? 'Get Started'
                  : isEnterprise
                    ? 'Contact Sales'
                    : 'Start Free Trial'}
              </button>

              {/* Limits */}
              <div className="text-sm text-muted-foreground mb-4 space-y-1">
                <p>
                  {plan.max_users === -1 ? 'Unlimited' : `Up to ${plan.max_users}`} users
                </p>
                <p>{plan.max_storage_gb} GB storage</p>
              </div>

              {/* Features */}
              <div className="border-t pt-4 space-y-3 flex-1">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Features
                </p>
                {Object.entries(plan.features).map(([key, enabled]) => (
                  <div key={key} className="flex items-center gap-2">
                    {enabled ? (
                      CHECK_ICON
                    ) : (
                      <svg className="w-5 h-5 text-muted-foreground/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    )}
                    <span className={`text-sm ${enabled ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                      {FEATURE_LABELS[key] || key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground text-sm">
          All paid plans include a 14-day free trial. No credit card required to start.
        </p>
        <p className="text-muted-foreground text-xs mt-2">
          Need a custom plan? <a href="mailto:sales@openagentschool.org" className="text-primary underline">Contact our team</a>.
        </p>
      </div>
    </div>
  );
}
