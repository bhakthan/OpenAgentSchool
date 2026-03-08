import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TRACKS } from '@/lib/data/microLearning';
import { ALL_CAPSULES } from '@/lib/data/microLearning';
import { trackEvent } from '@/lib/analytics/ga';

interface HeroSectionProps {
  onFindPath: () => void;
  onBrowseAll: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onFindPath, onBrowseAll }) => {
  const totalConcepts = new Set(ALL_CAPSULES.map((c) => c.conceptId)).size;
  const totalCapsules = ALL_CAPSULES.length;
  const totalTracks = TRACKS.length;

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 dark:from-primary/10 dark:via-violet-500/10 dark:to-fuchsia-500/10 text-foreground">
      {/* Subtle animated background dots */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="relative px-6 py-12 md:px-12 md:py-16 lg:py-20 text-center">
        {/* Eyebrow badge */}
        <Badge variant="secondary" className="mb-4 text-xs font-medium px-3 py-1">
          NEW — Bite-Sized Learning
        </Badge>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Master AI Agents in 10 Minutes a Day
        </h1>

        {/* Counter row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6" aria-label="Platform statistics">
          {[
            { value: `${totalConcepts}`, label: 'Concepts' },
            { value: '63', label: 'Patterns' },
            { value: `${totalTracks}`, label: 'Tracks' },
            { value: `${totalCapsules}+`, label: 'Capsules' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-foreground/60 dark:text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-foreground/70 dark:text-muted-foreground leading-relaxed">
          Bite-sized learning backed by Socratic questioning, adaptive quizzes, and hands-on pattern practice.
          No fluff. No hour-long lectures. Just compound capability.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Button
            size="lg"
            onClick={() => { trackEvent({ action: 'micro_hero_find_path', category: 'micro_learning' }); onFindPath(); }}
            className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 px-8"
          >
            Find Your Path
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => { trackEvent({ action: 'micro_hero_browse_all', category: 'micro_learning' }); onBrowseAll(); }}
            className="px-8"
          >
            Browse All Tracks
          </Button>
        </div>

        {/* Blog link */}
        <p className="mt-6 text-sm text-foreground/60 dark:text-muted-foreground">
          Curious why this works?{' '}
          <a href="/blog/the-10-minute-edge" className="text-primary font-medium hover:underline">Read the science behind micro-learning →</a>
        </p>

        {/* Micro proof signals */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-foreground/60 dark:text-muted-foreground">
          {[
            { icon: '⏱️', label: '5–10 min capsules' },
            { icon: '🔄', label: '4 learning modes' },
            { icon: '🎯', label: 'Role-personalized' },
            { icon: '🔥', label: 'Daily streak tracking' },
          ].map((signal) => (
            <div key={signal.label} className="flex items-center gap-1.5">
              <span aria-hidden="true">{signal.icon}</span>
              <span>{signal.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
