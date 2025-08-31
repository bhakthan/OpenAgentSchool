import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Lightning, GraduationCap, Lightbulb, Target, Users } from '@phosphor-icons/react';

export interface LandingRightPanelProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  /**
   * Tailwind height classes for responsive breakpoints, e.g., h-56, sm:h-64, md:h-80
   */
  imageHeightClasses?: string;
  /**
   * Tailwind object-position class, e.g., 'object-center' or 'object-top'
   */
  imageObjectPosition?: string;
}

export const LandingRightPanel: React.FC<LandingRightPanelProps> = ({
  imageSrc = '/images/landing/open-agent-school-hero.png',
  imageAlt = 'Open Agent School hero',
  className = '',
  imageHeightClasses = 'h-56 sm:h-64 md:h-80',
  imageObjectPosition = 'object-center',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero image as its own banner block */}
      <div className="relative overflow-hidden rounded-xl border">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full ${imageHeightClasses} object-cover ${imageObjectPosition}`}
        />
        {/* bottom gradient overlay to blend into page background (cross-browser) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
      </div>

      {/* Feature cards on a translucent panel for readability */}
      <div className="rounded-xl border bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* AI as Customer Feature */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 theme-feature-card col-span-1 sm:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="theme-feature-icon p-3 rounded-lg">
                  <Brain className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Learn with feedback from AI</h3>
                  <p className="text-sm mb-3">
                    Explain your ideas in your own words. The AI points out what’s clear and what needs work, and suggests
                    simple next steps.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Lightning className="h-3 w-3" />
                    <span>Real-time, supportive feedback</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--level-growth)', opacity: 0.1 }}>
                  <GraduationCap className="h-6 w-6" style={{ color: 'var(--level-growth)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Progressive Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Master AI Agents with our structured ladder approach.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--level-advanced)', opacity: 0.1 }}>
                  <Lightbulb className="h-6 w-6" style={{ color: 'var(--level-advanced)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Interactive Concepts</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore agent patterns through hands-on visualizations and simulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--level-mastery)', opacity: 0.1 }}>
                  <Target className="h-6 w-6" style={{ color: 'var(--level-mastery)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-World Applications</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply knowledge through practical scenarios and case studies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--level-foundation)', opacity: 0.1 }}>
                  <Users className="h-6 w-6" style={{ color: 'var(--level-foundation)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Share knowledge and learn from a growing community of practitioners.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingRightPanel;
