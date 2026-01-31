import React, { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Lightning, GraduationCap, Users, RocketLaunch, ChartLineUp, HeadCircuit, Buildings, Handshake, ArrowRight, Play, X } from '@phosphor-icons/react';
import { PROOF_SIGNALS } from '@/components/marketing/proofSignals';

/**
 * Conversion-focused marketing /cta landing page.
 * Sections:
 *  - Hero
 *  - Who It's For (Individuals / Builders / Enterprise)
 *  - Program Paths
 *  - Value / Differentiators
 *  - Call To Action Strip
 *  - FAQ (lightweight)
 *  - Final CTA
 */
const CTALandingPage: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const track = (tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
  };

  const openExternal = (url: string, tier: string, source: string) => {
    // Append tracking query param preserving existing ones
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
    const u = new URL(url);
    if (!u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', 'oas');
    }
    if (tier === 'cohort') {
      try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier: 'cohort', source: source + '-open-form' } })); } catch {}
      try { window.dispatchEvent(new CustomEvent('analytics:cohortFormOpen', { detail: { source, ts: Date.now() } })); } catch {}
    }
    const win = window.open(u.toString(), '_blank');
    if (!win) {
      toast({ title: 'Popup blocked', description: 'Your browser blocked the cohort form. Please allow popups for this site or open the link manually.', variant: 'destructive' as any });
    }
  };

  useEffect(() => {
    // Emit variant event (primary)
    try {
      window.dispatchEvent(new CustomEvent('analytics:abVariant', { detail: { variant: 'primary', source: 'stored', timestamp: Date.now() } }));
    } catch {}
  }, []);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
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
    if (isVideoOpen && videoRef.current) {
      videoRef.current.play();
    }
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
      {/* Hero */}
      <section className="text-center space-y-8 pt-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
          Accelerate Your AI-Agent Mastery & Organizational Transformation
        </h1>
        <p className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
          Build durable agent ecosystems—not prompt toys. Operationalize architecture discipline, Agent Velocity Engineering,
          evaluation rigor, resilience patterns, and AI-native organizational leverage so initiatives ship faster, fail safer, and compound.
        </p>
        <AnchorConfidenceRow />
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button size="lg" onClick={() => { track('individual', 'hero-primary'); openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'hero-primary'); }}>
            <Lightning className="mr-2" size={20} /> Start Free – Explore Concepts
          </Button>
          <Button size="lg" variant="secondary" onClick={() => { track('cohort', 'hero-secondary'); openExternal('https://forms.gle/gpcekkK6KGqTNJGZ8', 'cohort', 'hero-secondary'); }}>
            <GraduationCap className="mr-2" size={20} /> Apply for Cohort (Invite Only)
          </Button>
          <Button size="lg" variant="outline" onClick={() => { track('enterprise', 'hero-tertiary'); openExternal('https://forms.gle/5VsoENWHdBU2XrFa6', 'enterprise', 'hero-tertiary'); }}>
            <Buildings className="mr-2" size={20} /> Enterprise Strategy Form
          </Button>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Open Source + Advanced Applied Curriculum</p>
      </section>

  {/* Audience Segments */}
      <section>
  <h2 className="text-3xl font-bold mb-6 tracking-tight">Who This Is For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Individual Builders',
              icon: <RocketLaunch size={28} className="text-primary" />,
              points: ['Hands-on concept implementation', 'Pattern fluency & reasoning depth', 'Career differentiation through systems thinking']
            },
            {
              title: 'Engineering / Platform Teams',
              icon: <ChartLineUp size={28} className="text-primary" />,
              points: ['Architecture & reliability practices', 'Agent Velocity Engineering: ship faster, fail safer', 'Agent safety, evaluation, & ops discipline']
            },
            {
              title: 'Enterprise & Leadership',
              icon: <Users size={28} className="text-primary" />,
              points: ['Transformation roadmaps & maturity models', 'AI-native operating ratios', 'Risk mitigation & governance patterns']
            }
          ].map(card => (
            <div key={card.title} className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                {card.icon}
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <ul className="text-base md:text-lg space-y-2 text-muted-foreground leading-relaxed">
                {card.points.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Agentic Adoption Playbook - Executive Showcase */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-violet-600/10 to-fuchsia-600/10 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-violet-600/20 border border-primary/30 mb-4">
            <Handshake size={20} className="text-primary" />
            <span className="text-sm font-bold text-primary">Executive Playbook</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            From Pilot Chaos to Production Velocity
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Stop re-learning per project. <strong>Institutionalize agent capability</strong> with interactive charter builders, portfolio heatmaps, and board-ready briefing packs—architected for executives who ship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <ChartLineUp size={32} className="text-primary" />,
              title: 'Discovery Sprint Playbook',
              desc: 'Collapse alignment cycles: executive charter builder with AI-powered stakeholder mapping, risk scoring, and value quantification.',
              metric: '6-week clarity path',
              href: '/adoption/charter'
            },
            {
              icon: <HeadCircuit size={32} className="text-primary" />,
              title: 'Portfolio Heatmap Canvas',
              desc: '3D workflow prioritization (Value × Feasibility × Risk) with quadrant classification and Excel export for roadmap planning.',
              metric: 'Visual prioritization',
              href: '/adoption/canvas'
            },
            {
              icon: <Buildings size={32} className="text-primary" />,
              title: 'Board-Ready Briefing Pack',
              desc: 'Role-specific executive briefs (CEO, CFO, CTO, CISO, COO, Board) with compliance summaries and Word/Excel export.',
              metric: 'C-suite alignment',
              href: '/adoption/briefing'
            }
          ].map(card => (
            <div key={card.title} className="group p-6 rounded-xl border-2 border-border bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer" onClick={() => { track('adoption', `playbook-${card.title}`); window.location.href = card.href; }}>
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary/70 uppercase tracking-wide">{card.metric}</span>
                <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl border bg-card/60 backdrop-blur-sm">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Why This Matters
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Most AI initiatives stall in <strong>pilot purgatory</strong>—endless demos, unclear ROI, fragmented ownership. Our playbook embeds <strong>evaluation harnesses, governance guardrails, and velocity metrics</strong> from day one so expansion doesn't amplify fragility.
            </p>
          </div>
          <div className="p-5 rounded-xl border bg-card/60 backdrop-blur-sm">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Measurable Outcomes
            </h4>
            <ul className="text-muted-foreground space-y-1 leading-relaxed">
              <li>✓ Stakeholder alignment in weeks, not quarters</li>
              <li>✓ Quantified value cases with risk mitigation</li>
              <li>✓ Production-ready architecture blueprints</li>
              <li>✓ Board-level confidence & governance clarity</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="group shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => { track('adoption', 'playbook-cta'); window.location.href = '/adoption'; }}
          >
            <Handshake className="mr-2" size={20} />
            Explore Adoption Playbook
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wide">
            Interactive Templates • AI Scoring • Excel/Word Export • Governance-Ready
          </p>
        </div>

        {/* Video Preview Section */}
        <div className="mt-10 pt-8 border-t border-primary/20">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-primary/80 uppercase tracking-wide mb-2">See the Vision</p>
            <h3 className="text-2xl font-bold">Deploying the Agentic Workforce</h3>
          </div>
          <div 
            className="relative mx-auto max-w-3xl rounded-xl overflow-hidden border-2 border-primary/30 cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
            onClick={() => { track('video', 'agentic-workforce'); setIsVideoOpen(true); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsVideoOpen(true)}
            aria-label="Watch Deploying the Agentic Workforce video"
          >
            {/* Video thumbnail/preview - first frame or poster */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-violet-600/20 to-fuchsia-600/20 flex items-center justify-center relative">
              <video 
                src="/video/Deploying_the_Agentic_Workforce_version_1.mp4" 
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="bg-primary/90 rounded-full p-5 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-12 w-12 text-primary-foreground" weight="fill" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium shadow-md">
                <Play className="h-3.5 w-3.5" weight="fill" />
                <span>Watch Overview</span>
              </div>
            </div>
          </div>
        </div>

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
              {/* Close button */}
              <button
                onClick={handleCloseVideo}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close video"
              >
                <X className="h-8 w-8" />
              </button>
              
              {/* Video container */}
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
              
              {/* Video title */}
              <p className="text-center text-white/70 mt-4 text-sm">
                Deploying the Agentic Workforce — Open Agent School
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Program Paths */}
      <section>
  <h2 className="text-3xl font-bold mb-6 tracking-tight">Program Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tier: 'individual',
              label: 'Open Learning',
              desc: 'Explore 49+ core concepts, 27+ agent patterns, AI-native skill frameworks, and interactive study modes at your own pace.',
              cta: 'Start Free',
              action: () => openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'path-card')
            },
            {
              tier: 'cohort',
              label: 'Applied Cohort',
              desc: 'Structured multi-week deep dive: architecture labs, failure scenario drills, evaluation harness design, ops playbooks.',
              cta: 'Request Invite',
              action: () => openExternal('https://forms.gle/gpcekkK6KGqTNJGZ8', 'cohort', 'path-card')
            },
            {
              tier: 'enterprise',
              label: 'Enterprise Enablement',
              desc: 'Custom capability acceleration: maturity assessment, ratio modeling, platform alignment, governance & scaling playbooks.',
              cta: 'Strategy Form',
              action: () => openExternal('https://forms.gle/5VsoENWHdBU2XrFa6', 'enterprise', 'path-card')
            }
          ].map(card => (
            <div key={card.label} className="p-6 rounded-xl border bg-card flex flex-col shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{card.label}</h3>
              <p className="text-base md:text-lg text-muted-foreground flex-1 leading-relaxed">{card.desc}</p>
              <Button className="mt-4" onClick={() => card.action()}>{card.cta}</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section>
  <h2 className="text-3xl font-bold mb-6 tracking-tight">Why Open Agent School</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Systems > Surface Prompts',
              body: 'We focus on modular orchestration, evaluation harnesses, reliability patterns, latency/cost trade-offs, and economic design—so you build resilient agent ecosystems.'
            },
            {
              title: 'Agent Velocity Engineering',
              body: 'Systematic practices to accelerate agent development cycles: pattern fluency, architecture templates, failure scenario libraries, evaluation automation, and operational instrumentation.'
            },
            {
              title: 'Failure-Informed Curriculum',
              body: 'Debug challenges & scenario drills simulate real production failures (cascading tool errors, degraded reasoning, overload resilience, calibration drift).'
            },
            {
              title: 'AI-Native Organizational Layer',
              body: 'Beyond agents: cultural transformation ratios, collaboration frameworks, capability progression maps, velocity instrumentation, governance models.'
            },
            {
              title: 'Actionable Architecture Patterns',
              body: 'Pattern inventory mapped to reasoning depth, state management strategy, evaluation complexity, and operational safeguards.'
            }
          ].map(item => (
            <div key={item.title} className="p-6 rounded-xl border bg-card shadow-sm">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg md:text-xl"><HeadCircuit size={24} className="text-primary" /> {item.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="rounded-2xl border bg-gradient-to-r from-primary/10 via-violet-600/10 to-fuchsia-600/10 p-10 text-center space-y-4">
        <h2 className="text-3xl font-bold">Choose Your Acceleration Path</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">Start free, go deep with structured cohort immersion, or align your entire org with a measurable transformation path.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'cta-strip')}>Explore Free</Button>
          <Button size="lg" variant="secondary" onClick={() => openExternal('https://forms.gle/gpcekkK6KGqTNJGZ8', 'cohort', 'cta-strip')}>Apply to Cohort</Button>
          <Button size="lg" variant="outline" onClick={() => openExternal('https://forms.gle/5VsoENWHdBU2XrFa6', 'enterprise', 'cta-strip')}>Enterprise Strategy Form</Button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Proof Signals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PROOF_SIGNALS.map(m => (
              <div key={m.metric} className="p-6 rounded-xl border bg-card/70 backdrop-blur-sm flex flex-col gap-3 relative overflow-hidden group">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-violet-500/20 border border-border shadow-inner">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400/25 to-fuchsia-400/25 opacity-0 group-hover:opacity-60 transition-opacity" />
                    <span className="text-primary drop-shadow-sm">
                      {m.icon}
                    </span>
                  </span>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-violet-500 text-transparent bg-clip-text tracking-tight">{m.metric}</div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-fuchsia-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (minimal) */}
      <section>
  <h2 className="text-3xl font-bold mb-6 tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is the platform really free to start?', a: 'Yes. Core concepts, patterns, visualizations and study modes are openly accessible. Advanced applied guidance is layered progressively.' },
            { q: 'When does the next cohort start?', a: 'Cohorts form based on demand alignment. Apply early; we curate for contribution potential & architectural depth.' },
            { q: 'Do you provide enterprise on-site or internal enablement?', a: 'Yes. We run maturity assessments, platform capability alignment sessions, architectural deep dives, and strategic acceleration workshops.' },
            { q: 'Can I sponsor or partner?', a: 'Reach out via strategy call link—partnerships are evaluated for ecosystem uplift & learner value.' }
          ].map(f => (
            <div key={f.q} className="p-5 rounded-lg border bg-card">
              <p className="font-medium">{f.q}</p>
              <p className="text-base md:text-lg text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Build Durable Agent Capability</h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-light">Escape incremental demo loops. Institutionalize Agent Velocity Engineering, architecture clarity, evaluation harnesses, reliability drills, and economic guardrails so each new deployment compounds—not resets.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'final-cta')}>Start Free</Button>
          <Button size="lg" variant="secondary" onClick={() => openExternal('https://forms.gle/gpcekkK6KGqTNJGZ8', 'cohort', 'final-cta')}>Apply Cohort</Button>
          <Button size="lg" variant="outline" onClick={() => openExternal('https://forms.gle/5VsoENWHdBU2XrFa6', 'enterprise', 'final-cta')}>Enterprise Strategy Form</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Signals of depth over hype • Architecture literacy • Operational resilience • Measurable transformation</p>
      </section>
    </div>
  );
};

// Animated anchor row component
const AnchorConfidenceRow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observed = useRef(false);
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.querySelectorAll('.anchor-seq-item')) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('anchor-visible');
        }
      });
    }, { threshold: 0.35 });
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 text-left pt-4">
      {[
        {
          title: 'Executive Confidence Anchor',
          body: 'Collapse ambiguity: get a shared mental model for agent architecture, operating ratios, and capability sequencing in under 6 weeks.',
          accent: true
        },
        {
          title: 'Behavioral Adoption > Hype',
          body: 'We design for sustained usage: measurable velocity uplift, reduced rework, governed experimentation funnels, and reliability baselines.'
        },
        {
          title: 'Risk-Informed Acceleration',
          body: 'Embed evaluation harnesses, safety guardrails, failure drills, and scaling thresholds early—so expansion doesn’t amplify fragility.'
        }
      ].map((card, i) => (
        <div
          key={card.title}
          data-seq={i}
          className={[
            'anchor-seq-item p-5 rounded-xl border bg-card/60 backdrop-blur-sm transition-shadow flex flex-col relative overflow-hidden',
            card.accent ? 'confidence-accent hover:shadow-lg' : 'hover:shadow-md'
          ].join(' ')}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-2 tracking-tight pr-4">{card.title}</h3>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{card.body}</p>
        </div>
      ))}
    </div>
  );
};

// Inject FAQPage structured data for SEO conversion intent
const FAQStructuredData: React.FC<{ faqs: { q: string; a: string }[] }> = ({ faqs }) => {
  useEffect(() => {
    const id = 'faq-schema-cta';
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    const json = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    };
    const serialized = JSON.stringify(json);
    if (existing) {
      if (existing.text !== serialized) existing.text = serialized;
    } else {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.text = serialized;
      document.head.appendChild(s);
    }
  }, [faqs]);
  return null;
};

// Persistent micro-CTA ribbon (funnel reinforcement)
export const MicroCtaRibbon: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  useEffect(() => {
    const hideOnCTA = () => {
      if (window.location.pathname === '/cta') setVisible(false);
    };
    hideOnCTA();
    window.addEventListener('popstate', hideOnCTA);
    return () => window.removeEventListener('popstate', hideOnCTA);
  }, []);
  if (!visible) return null;
  return (
    <div className="micro-cta-ribbon">
      <span className="hidden sm:inline">Agent Velocity Engineering → Architect → Evaluate → Operationalize</span>
      <button className="cta-btn" onClick={() => { try { window.dispatchEvent(new CustomEvent('analytics:ctaClick',{ detail:{ tier:'ribbon', source:'micro-ribbon'} })); } catch {}; window.location.href = '/cta'; }}>Get Clarity</button>
      <button className="dismiss-btn" aria-label="Dismiss" onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default CTALandingPage;
