import React, { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Lightning, GraduationCap, Buildings } from '@phosphor-icons/react';
import { PROOF_SIGNALS_COMPACT } from '@/components/marketing/proofSignals';

const CTALandingPageVariant: React.FC = () => {
  const track = (tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
  };
  const openExternal = (url: string, tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
    const u = new URL(url);
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', 'oas');
    if (tier === 'cohort') {
      try { window.dispatchEvent(new CustomEvent('analytics:cohortFormOpen', { detail: { source, ts: Date.now() } })); } catch {}
    }
    const win = window.open(u.toString(), '_blank');
    if (!win) {
      toast({ title: 'Popup blocked', description: 'Enable popups to open the cohort application form.', variant: 'destructive' as any });
    }
  };

  useEffect(() => {
    try { window.dispatchEvent(new CustomEvent('analytics:abVariant', { detail: { variant: 'variant', source: 'stored', timestamp: Date.now() } })); } catch {}
  }, []);

  return (
    <div className="space-y-24">
      <section className="grid md:grid-cols-12 gap-10 items-center py-4">
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Reduce AI Initiative Drift.<br />
              <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-violet-500 text-transparent bg-clip-text">Compound Agent Capability.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl">
              A systemized path to architecture clarity, evaluation harnesses, reliability drills, and operational economics—before entropy sets in.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => openExternal('https://github.com/bhakthan/openagentschool','individual','variant-hero-primary')}><Lightning className="mr-2" size={20}/>Start Free</Button>
            <Button size="lg" variant="secondary" onClick={() => openExternal('https://forms.gle/gpcekkK6KGqTNJGZ8','cohort','variant-hero-secondary')}><GraduationCap className="mr-2" size={20}/>Apply Cohort</Button>
            <Button size="lg" variant="outline" onClick={() => openExternal('https://cal.com/bhakthan/enterprise-ai','enterprise','variant-hero-tertiary')}><Buildings className="mr-2" size={20}/>Enterprise Call</Button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4 pt-4 text-base md:text-lg text-muted-foreground">
            <li className="p-4 rounded-md border bg-card/60">Capability Sequencing Playbooks</li>
            <li className="p-4 rounded-md border bg-card/60">Failure Drill Libraries</li>
            <li className="p-4 rounded-md border bg-card/60">Evaluation Harness Patterns</li>
            <li className="p-4 rounded-md border bg-card/60">Operational Guardrail Frameworks</li>
          </ul>
        </div>
        <div className="md:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {PROOF_SIGNALS_COMPACT.map(m => (
              <div key={m.k} className="p-5 rounded-xl border bg-card/70 backdrop-blur-sm text-center relative overflow-hidden group">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 text-transparent bg-clip-text tracking-tight">{m.k}</div>
                <p className="text-sm mt-2 text-muted-foreground leading-snug">{m.v}</p>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity">
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-tr from-fuchsia-500/10 via-indigo-500/10 to-transparent rounded-full blur-2xl" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border bg-gradient-to-r from-primary/10 via-violet-600/10 to-fuchsia-600/10 text-sm leading-relaxed">
            <p className="font-medium mb-1">Why it works:</p>
            <p className="text-muted-foreground">We compress exploration → adoption by sequencing capability layers, embedding evaluation early, and rehearsing failure before scale.</p>
          </div>
          <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground pt-2 flex-wrap">
            <span className="inline-flex items-center gap-1">⚡ Rapid Alignment</span>
            <span className="inline-flex items-center gap-1">🧪 Evaluation First</span>
            <span className="inline-flex items-center gap-1">🛡️ Risk-Aware Scale</span>
          </div>
        </div>
      </section>

      {/* Retain rest of standard CTA blocks by reusing the original component sections? For simplicity we link back to main CTA */}
      <section className="text-center pb-8">
        <p className="text-base text-muted-foreground">Prefer the original layout? <a className="underline" href="/cta">View primary version</a></p>
      </section>
    </div>
  );
};

export default CTALandingPageVariant;
