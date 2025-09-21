import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightning, GraduationCap, Users, RocketLaunch, ChartLineUp, HeadCircuit, Buildings, Handshake } from '@phosphor-icons/react';

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
  const track = (tier: string, source: string) => {
    try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { tier, source } })); } catch {}
  };

  const openExternal = (url: string, tier: string, source: string) => {
    track(tier, source);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6 pt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
          Accelerate Your AI-Agent Mastery & Organizational Transformation
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          A rigorous, implementation-first learning platform for builders, engineering leaders, and enterprises
          who are serious about becoming AI-native. Learn the patterns, systems, economics, and operational guardrails
          behind durable agentic ecosystems—not just prompts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button size="lg" onClick={() => { track('individual', 'hero-primary'); openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'hero-primary'); }}>
            <Lightning className="mr-2" size={20} /> Start Free – Explore Concepts
          </Button>
          <Button size="lg" variant="secondary" onClick={() => { track('cohort', 'hero-secondary'); openExternal('https://forms.gle/2M4J7CohortApp', 'cohort', 'hero-secondary'); }}>
            <GraduationCap className="mr-2" size={20} /> Apply for Cohort (Invite Only)
          </Button>
          <Button size="lg" variant="outline" onClick={() => { track('enterprise', 'hero-tertiary'); openExternal('https://cal.com/bhakthan/enterprise-ai', 'enterprise', 'hero-tertiary'); }}>
            <Buildings className="mr-2" size={20} /> Book Enterprise Strategy Call
          </Button>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Open Source + Advanced Applied Curriculum</p>
      </section>

      {/* Audience Segments */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Who This Is For</h2>
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
              points: ['Architecture & reliability practices', 'Agent safety, evaluation, & ops discipline', 'Velocity & cost efficiency frameworks']
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
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground leading-snug">
                {card.points.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Program Paths */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Program Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tier: 'individual',
              label: 'Open Learning',
              desc: 'Explore ~22+ core concepts, 27+ agent patterns, AI-native skill frameworks, and interactive study modes at your own pace.',
              cta: 'Start Free',
              action: () => openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'path-card')
            },
            {
              tier: 'cohort',
              label: 'Applied Cohort',
              desc: 'Structured multi-week deep dive: architecture labs, failure scenario drills, evaluation harness design, ops playbooks.',
              cta: 'Request Invite',
              action: () => openExternal('https://forms.gle/2M4J7CohortApp', 'cohort', 'path-card')
            },
            {
              tier: 'enterprise',
              label: 'Enterprise Enablement',
              desc: 'Custom capability acceleration: maturity assessment, ratio modeling, platform alignment, governance & scaling playbooks.',
              cta: 'Book Strategy Call',
              action: () => openExternal('https://cal.com/bhakthan/enterprise-ai', 'enterprise', 'path-card')
            }
          ].map(card => (
            <div key={card.label} className="p-6 rounded-xl border bg-card flex flex-col shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{card.desc}</p>
              <Button className="mt-4" onClick={() => card.action()}>{card.cta}</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Why Open Agent School</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Systems > Surface Prompts',
              body: 'We focus on modular orchestration, evaluation harnesses, reliability patterns, latency/cost trade-offs, and economic design—so you build resilient agent ecosystems.'
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
              <h3 className="font-semibold mb-2 flex items-center gap-2"><HeadCircuit size={20} className="text-primary" /> {item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
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
          <Button size="lg" variant="secondary" onClick={() => openExternal('https://forms.gle/2M4J7CohortApp', 'cohort', 'cta-strip')}>Apply to Cohort</Button>
          <Button size="lg" variant="outline" onClick={() => openExternal('https://cal.com/bhakthan/enterprise-ai', 'enterprise', 'cta-strip')}>Enterprise Strategy Call</Button>
        </div>
      </section>

      {/* FAQ (minimal) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is the platform really free to start?', a: 'Yes. Core concepts, patterns, visualizations and study modes are openly accessible. Advanced applied guidance is layered progressively.' },
            { q: 'When does the next cohort start?', a: 'Cohorts form based on demand alignment. Apply early; we curate for contribution potential & architectural depth.' },
            { q: 'Do you provide enterprise on-site or internal enablement?', a: 'Yes. We run maturity assessments, platform capability alignment sessions, architectural deep dives, and strategic acceleration workshops.' },
            { q: 'Can I sponsor or partner?', a: 'Reach out via strategy call link—partnerships are evaluated for ecosystem uplift & learner value.' }
          ].map(f => (
            <div key={f.q} className="p-4 rounded-lg border bg-card">
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-8">
        <h2 className="text-3xl font-bold mb-4">Build Durable Agent Capability</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-6">Avoid shallow prompt churn. Invest in architecture, evaluation, operational readiness, and economic design. We help you compress the learning curve.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => openExternal('https://github.com/bhakthan/openagentschool', 'individual', 'final-cta')}>Start Free</Button>
          <Button size="lg" variant="secondary" onClick={() => openExternal('https://forms.gle/2M4J7CohortApp', 'cohort', 'final-cta')}>Apply Cohort</Button>
          <Button size="lg" variant="outline" onClick={() => openExternal('https://cal.com/bhakthan/enterprise-ai', 'enterprise', 'final-cta')}>Enterprise Call</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Signals of depth over hype • Architecture literacy • Operational resilience • Measurable transformation</p>
      </section>
    </div>
  );
};

export default CTALandingPage;
