import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, GraduationCap, Users, Lightbulb, Target } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    // Navigate to the first core concept or study mode
    navigate('/study-mode');
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleExplorePatterns = () => {
    // Navigate to patterns section
    navigate('/patterns');
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLevelClick = (level: string) => {
    // Navigate to core concepts with the appropriate difficulty level
    switch (level) {
      case 'foundation':
        navigate('/concepts/agent-architecture');
        break;
      case 'growth':
        navigate('/concepts/ai-agents');
        break;
      case 'advanced':
        navigate('/concepts/multi-agent-systems');
        break;
      case 'mastery':
        navigate('/ai-skills');
        break;
      default:
        navigate('/');
    }
    
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Logo */}
            <Logo size="hero" showText={true} className="justify-start" />
            
            {/* Hero Description */}
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master AI agents through progressive, hands-on learning. From core concepts to advanced patterns, 
                climb the ladder of agentic intelligence with interactive tools and real-world applications.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={handleStartJourney}>
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleExplorePatterns}>
                Explore Patterns
              </Button>
            </div>

            {/* Learning Path Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('foundation')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 bg-[#FFB900] rounded-full mx-auto mb-2"></div>
                  <div className="text-xs font-medium text-muted-foreground">Foundation</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('growth')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 bg-[#00A4EF] rounded-full mx-auto mb-2"></div>
                  <div className="text-xs font-medium text-muted-foreground">Growth</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('advanced')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 bg-[#7FBA00] rounded-full mx-auto mb-2"></div>
                  <div className="text-xs font-medium text-muted-foreground">Advanced</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('mastery')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 bg-[#F25022] rounded-full mx-auto mb-2"></div>
                  <div className="text-xs font-medium text-muted-foreground">Mastery</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Feature Highlights */}
          <div className="space-y-6">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#00A4EF]/10">
                    <GraduationCap className="h-6 w-6 text-[#00A4EF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Progressive Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Climb from basics to mastery with our structured ladder approach.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#7FBA00]/10">
                    <Lightbulb className="h-6 w-6 text-[#7FBA00]" />
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
                  <div className="p-2 rounded-lg bg-[#F25022]/10">
                    <Target className="h-6 w-6 text-[#F25022]" />
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
                  <div className="p-2 rounded-lg bg-[#FFB900]/10">
                    <Users className="h-6 w-6 text-[#FFB900]" />
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

      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-5">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <defs>
            <pattern id="ladder-pattern" x="0" y="0" width="40" height="48" patternUnits="userSpaceOnUse">
              <rect x="8" y="0" width="2" height="48" fill="currentColor"/>
              <rect x="30" y="0" width="2" height="48" fill="currentColor"/>
              <rect x="8" y="8" width="24" height="2" fill="currentColor"/>
              <rect x="8" y="20" width="24" height="2" fill="currentColor"/>
              <rect x="8" y="32" width="24" height="2" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#ladder-pattern)"/>
        </svg>
      </div>
    </div>
  );
};

export default LandingHero;
