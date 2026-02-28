import React, { useEffect, useState, useRef } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Lightning, GraduationCap, Buildings, Play, X } from '@phosphor-icons/react';
import { PROOF_SIGNALS_COMPACT } from '@/components/marketing/proofSignals';

const CTALandingPageVariant: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const track = (tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
    trackEvent({ action: 'cta_click', category: 'cta', label: `${tier}_${source}` });
  };
  const openExternal = (url: string, tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
    trackEvent({ action: 'cta_open_external', category: 'cta', label: `${tier}_${source}` });
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

  // Handle escape key to close video modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (isVideoOpen && videoRef.current) videoRef.current.play();
  }, [isVideoOpen]);

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

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
            <Button size="lg" variant="outline" onClick={() => openExternal('https://forms.gle/5VsoENWHdBU2XrFa6','enterprise','variant-hero-tertiary')}><Buildings className="mr-2" size={20}/>Enterprise Strategy Form</Button>
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

      {/* Video Preview Section */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-violet-600/10 to-fuchsia-600/10 p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-primary/80 uppercase tracking-wide mb-2">See the Vision</p>
          <h3 className="text-2xl font-bold">Deploying the Agentic Workforce</h3>
        </div>
        <div 
          className="relative mx-auto max-w-3xl rounded-xl overflow-hidden border-2 border-primary/30 cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
          onClick={() => { track('video', 'variant-agentic-workforce'); setIsVideoOpen(true); }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsVideoOpen(true)}
          aria-label="Watch Deploying the Agentic Workforce video"
        >
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-violet-600/20 to-fuchsia-600/20 flex items-center justify-center relative">
            <video 
              src="/video/Deploying_the_Agentic_Workforce_version_1.mp4" 
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="bg-primary/90 rounded-full p-5 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <Play className="h-12 w-12 text-primary-foreground" weight="fill" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium shadow-md">
              <Play className="h-3.5 w-3.5" weight="fill" />
              <span>Watch Overview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseVideo}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
              <video
                ref={videoRef}
                src="/video/Deploying_the_Agentic_Workforce_version_1.mp4"
                controls
                className="w-full aspect-video"
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-white/70 mt-4 text-sm">
              Deploying the Agentic Workforce — Open Agent School
            </p>
          </div>
        </div>
      )}

      {/* Retain rest of standard CTA blocks by reusing the original component sections? For simplicity we link back to main CTA */}
      <section className="text-center pb-8">
        <p className="text-base text-muted-foreground">Prefer the original layout? <a className="underline" href="/cta">View primary version</a></p>
      </section>
    </div>
  );
};

export default CTALandingPageVariant;
