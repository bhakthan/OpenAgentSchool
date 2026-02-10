import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Lightning, GraduationCap, Lightbulb, Target, Users, Play, X } from '@phosphor-icons/react';

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
  /**
   * Path to the video file to play on click
   */
  videoSrc?: string;
}

export const LandingRightPanel: React.FC<LandingRightPanelProps> = ({
  imageSrc = '/images/landing/open-agent-school-hero.webp',
  imageAlt = 'Open Agent School hero',
  className = '',
  imageHeightClasses = 'h-56 sm:h-64 md:h-80',
  imageObjectPosition = 'object-center',
  videoSrc = '/video/From_Concept_to_Capability_version_1.mp4',
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle escape key to close modal
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

  const handleImageClick = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero image as its own banner block - clickable for video */}
      <div 
        className="relative overflow-hidden rounded-xl border cursor-pointer group"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
        aria-label="Click to watch the Open Agent School introduction video"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full ${imageHeightClasses} object-cover ${imageObjectPosition} transition-transform duration-300 group-hover:scale-105`}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 rounded-full p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <Play className="h-10 w-10 text-primary-foreground" weight="fill" />
          </div>
        </div>
        {/* Small play indicator always visible */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium shadow-md">
          <Play className="h-3.5 w-3.5" weight="fill" />
          <span>See it in action</span>
        </div>
        {/* bottom gradient overlay to blend into page background (cross-browser) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
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
                src={videoSrc}
                controls
                className="w-full aspect-video"
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video title */}
            <p className="text-center text-white/70 mt-4 text-sm">
              From Concept to Capability — Open Agent School
            </p>
          </div>
        </div>
      )}

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
