import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, ChatCircleDots, Brain, Target } from '@phosphor-icons/react';
import { LandingRightPanel } from '@/components/landing/LandingRightPanel';
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
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Logo with QR Code */}
            <div className="flex items-center justify-between lg:justify-start gap-6">
              <Logo size="hero" showText={true} className="justify-start" />
              
              {/* Large QR Code for YouTube Podcast */}
              <div className="flex-shrink-0">
                <div 
                  className="group cursor-pointer bg-white p-2 rounded-xl shadow-lg border hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://www.youtube.com/playlist?list=PL9pA6bW_V_aBCC77nHbPgPJVUXqnLkZ2C', '_blank')}
                  title="Click to open YouTube Podcast playlist"
                >
                  <img 
                    src="/images/youtube-podcast-qr.svg" 
                    alt="YouTube Podcast QR Code" 
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="text-center text-xs text-gray-600 mt-2 mb-2 font-medium">
                    YouTube Podcast
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hero Description */}
            <div className="space-y-4">
              <div className="space-y-6">
                {/* Core Messaging */}
                <div className="text-center lg:text-left">
                  <div className="block w-fit mx-auto lg:mx-0 rounded-full px-3 py-1 mb-2 ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)]">
                    <span className="text-xs sm:text-sm font-semibold">
                      Agentic Learning for Everyone
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 50%, #6366F1 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    lineHeight: '1.2',
                    paddingBottom: '0.1em'
                  }}>
                    Learn AI agents, step by step
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Start with the basics and build real skills. Short lessons, interactive visuals, and practical examples
                    help you make steady progress with confidence.
                  </p>
                </div>
                
                {/* AI as Customer Value Prop */}
                <div className="theme-feature-card rounded-lg p-4 border">
                  <div className="flex items-start gap-3">
                    <div className="theme-feature-icon p-2 rounded-lg">
                      <ChatCircleDots className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Ask AI to check your understanding
                      </h4>
                      <p className="text-sm">
                        Use "Ask AI" whenever you’re unsure. It asks simple, focused questions and helps you explain ideas
                        in clear terms so you know what’s working and what to improve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={handleStartJourney}>
                Start learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleExplorePatterns}>
                Explore Patterns
              </Button>
            </div>

            {/* Executive Track CTA */}
            <div className="mt-8 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">For Business Leaders</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      Executive Track
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Turn AI ambition into operational capability. Get charter templates, portfolio heatmaps, and board-ready briefing packs with AI scoring—institutionalize agent capability in weeks, not quarters.
                  </p>
                  <Button 
                    size="sm" 
                    className="group"
                    onClick={() => {
                      navigate('/adoption-playbook');
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }}
                  >
                    Access Adoption Playbook
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Learning Path Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('foundation')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--level-foundation)' }}></div>
                  <div className="text-xs font-medium text-muted-foreground">Foundation</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('growth')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--level-growth)' }}></div>
                  <div className="text-xs font-medium text-muted-foreground">Growth</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('advanced')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--level-advanced)' }}></div>
                  <div className="text-xs font-medium text-muted-foreground">Advanced</div>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-md transition-all cursor-pointer" onClick={() => handleLevelClick('mastery')}>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--level-mastery)' }}></div>
                  <div className="text-xs font-medium text-muted-foreground">Mastery</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Reusable panel */}
          <LandingRightPanel imageHeightClasses="h-56 sm:h-64 md:h-72 lg:h-80" imageObjectPosition="object-center" />
        </div>
      </div>

      {/* AI as Customer Learning Methodology Section */}
      <div className="container mx-auto px-4 py-12 border-t border-border">
        <div className="text-center mb-10">
          <div className="block w-fit mx-auto rounded-full px-4 py-2 mb-4 ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)]">
            <span className="text-sm font-semibold">
              Agentic learning, made simple
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Learn with feedback from AI</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Practice explaining what you know. The AI asks helpful follow-ups and gives concise feedback so you can see
            progress and build confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-red p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ChatCircleDots className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-text-red">Step 1: Ask a question</h3>
              <p className="text-sm text-muted-foreground">
                Click "Ask AI" to get focused questions that guide your thinking and keep you moving.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-orange p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-text-orange">Step 2: Fill the gaps</h3>
              <p className="text-sm text-muted-foreground">
                Explain in your own words. The AI highlights gaps and suggests the next thing to learn.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-green p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-text-green">Step 3: Teach it back</h3>
              <p className="text-sm text-muted-foreground">
                Summarize what you’ve learned. Teaching back is a simple way to lock in understanding.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <div className="theme-feature-card rounded-xl p-6 border">
            <h4 className="font-bold text-lg mb-2">
              💡 Why this works
            </h4>
            <p className="max-w-2xl mx-auto">
              You learn faster when you explain ideas, get quick feedback, and try again. The built‑in AI gives you gentle,
              specific pointers so you can keep improving without feeling stuck.
            </p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-10">
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
