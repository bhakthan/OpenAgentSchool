import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, GraduationCap, Users, Lightbulb, Target, ChatCircleDots, Brain, Lightning } from '@phosphor-icons/react';
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
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 theme-gradient">
                    Agentic Learning for Everyone
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Master AI agents through progressive, hands-on learning. From core concepts to advanced patterns, 
                    climb the ladder of agentic intelligence with interactive tools and real-world applications.
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
                        🎯 Revolutionary Learning: AI as Your Customer
                      </h4>
                      <p className="text-sm">
                        <strong>Can you explain it well enough to satisfy AI?</strong> Our "Ask AI" feature doesn't just help you learn—it <em>challenges</em> you to prove your understanding. Think of AI as your most demanding stakeholder who won't accept vague answers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* Right Column - Feature Highlights */}
          <div className="space-y-6">
            {/* AI as Customer Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 theme-feature-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="theme-feature-icon p-3 rounded-lg">
                    <Brain className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">AI as Your Learning Customer</h3>
                    <p className="text-sm mb-3">
                      <strong>Your toughest customer is now your AI teacher.</strong> Explain concepts clearly enough to satisfy our demanding AI—it won't accept "I think I know" as an answer.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Lightning className="h-3 w-3" />
                      <span>Real-time knowledge validation</span>
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

      {/* AI as Customer Learning Methodology Section */}
      <div className="container mx-auto px-4 py-12 border-t border-border">
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-semibold theme-gradient">
              ✨ AGENTIC LEARNING FOR EVERYONE ✨
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Revolutionary Learning: AI as Your Customer</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform passive learning into active mastery. Our AI doesn't just answer your questions—it challenges you to prove your understanding like a demanding customer.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-red p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ChatCircleDots className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-red">Step 1: AI Challenges You</h3>
              <p className="text-sm text-muted-foreground">
                Click "Ask AI" and face intelligent questioning. AI acts like a skeptical customer who demands clear, precise explanations.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-orange p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-orange">Step 2: Prove Your Understanding</h3>
              <p className="text-sm text-muted-foreground">
                Explain concepts in your own words. The AI validates your knowledge and identifies gaps, just like presenting to a demanding client.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="theme-learning-icon-green p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-3 theme-learning-green">Step 3: Master Through Teaching</h3>
              <p className="text-sm text-muted-foreground">
                Achieve deep understanding by successfully explaining concepts to your AI "customer." True mastery comes from teaching others.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <div className="theme-feature-card rounded-xl p-6 border">
            <h4 className="font-bold text-lg mb-2">
              💡 Why This Works: The Customer Validation Method
            </h4>
            <p className="max-w-2xl mx-auto">
              In business, you must explain complex concepts to customers, stakeholders, and executives who won't accept vague answers. 
              Our AI simulates this demanding environment, preparing you for real-world scenarios where clarity and precision matter.
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
